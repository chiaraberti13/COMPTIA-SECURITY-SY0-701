/** Generative checks run in the normal CI test suite, with shrinking/replay. */
import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { ChatRequestSchema, MAX_HISTORY_TURNS, MAX_MESSAGE_CHARS, MAX_TOPICS, MAX_TOPIC_CHARS, RemediationRequestSchema } from "../src/apiSchemas";
import { BACKUP_APP_ID, BACKUP_SCHEMA_VERSION, buildBackup, parseBackup, sanitizeProgress } from "../src/progressBackup";
import { tokenMatches } from "../server/aiGuard";
import { asData, DATA_TAGS, neutralize } from "../server/promptSafety";

// fast-check reports the seed and shrink path on failure for an exact replay.
const options = { numRuns: 1000 };
const json = fc.jsonValue({ maxDepth: 4 });

describe("security fuzzing", () => {
  it("handles arbitrary backup text and JSON envelopes without crashing", () => {
    fc.assert(fc.property(fc.oneof(fc.string({ maxLength: 4000 }), json.map(value => JSON.stringify(value))), text => {
      const result = parseBackup(text);
      if (result.ok) expect(sanitizeProgress(result.data)).toEqual(result.data);
      else expect(["invalid-json", "wrong-app", "unsupported-schema"]).toContain(result.error);
    }), options);
  });

  it("sanitizes hostile progress fields and preserves the sanitized data across export/import", () => {
    const progress = fc.record({
      checklist: fc.dictionary(fc.string({ maxLength: 130 }), fc.oneof(fc.constant(true), json)),
      bookmarks: fc.array(fc.oneof(fc.string({ maxLength: 130 }), json), { maxLength: 40 }),
      quizHistory: json, questionProgress: json, selfAssessment: json, acronymProgress: json,
    });
    fc.assert(fc.property(progress, raw => {
      const imported = parseBackup(JSON.stringify({ app: BACKUP_APP_ID, schema: BACKUP_SCHEMA_VERSION, data: raw }));
      expect(imported.ok).toBe(true);
      if (!imported.ok) return;
      const copy = parseBackup(buildBackup(imported.data));
      expect(copy.ok).toBe(true);
      if (copy.ok) expect(copy.data).toEqual(imported.data);
      expect(new Set(imported.data.bookmarks).size).toBe(imported.data.bookmarks.length);
      expect(Object.values(imported.data.checklist).every(value => value === true)).toBe(true);
    }), options);
  });

  it("bounds replayed chat text and prevents callers from introducing a system role", () => {
    fc.assert(fc.property(fc.string({ maxLength: 3000 }), fc.array(fc.oneof(json, fc.record({ role: json, content: fc.string({ maxLength: 3000 }) })), { maxLength: 20 }), (message, history) => {
      const result = ChatRequestSchema.safeParse({ message, history, lang: "en" });
      if (!result.success) return;
      expect(result.data.message.trim().length).toBeGreaterThan(0);
      expect(result.data.message.length).toBeLessThanOrEqual(MAX_MESSAGE_CHARS);
      expect(result.data.history.length).toBeLessThanOrEqual(MAX_HISTORY_TURNS);
      for (const turn of result.data.history) {
        expect(["user", "trainer"]).toContain(turn.role);
        expect(turn.content.length).toBeLessThanOrEqual(MAX_MESSAGE_CHARS);
      }
    }), options);
  });

  it("keeps remediation topic count and text within the prompt budget", () => {
    fc.assert(fc.property(fc.array(fc.string({ maxLength: 250 }), { maxLength: 30 }), weakTopics => {
      const result = RemediationRequestSchema.safeParse({ weakTopics, lang: "it" });
      if (!result.success) return;
      expect(result.data.weakTopics.length).toBeGreaterThan(0);
      expect(result.data.weakTopics.length).toBeLessThanOrEqual(MAX_TOPICS);
      for (const topic of result.data.weakTopics) {
        expect(topic).toBe(topic.trim());
        expect(topic.length).toBeGreaterThan(0);
        expect(topic.length).toBeLessThanOrEqual(MAX_TOPIC_CHARS);
      }
    }), options);
  });

  it("cannot close a prompt data block with reserved tags or Unicode disguises", () => {
    const attack = fc.tuple(fc.constantFrom(...DATA_TAGS), fc.boolean(), fc.boolean(), fc.constantFrom("", "\u200B", "\uFEFF"))
      .map(([tag, wide, upper, invisible]) => {
        const name = (upper ? tag.toUpperCase() : tag).split("").join(invisible);
        return `${wide ? "＜" : "<"}/${name}${wide ? "＞" : ">"}`;
      });
    fc.assert(fc.property(fc.array(fc.oneof(attack, fc.string({ maxLength: 80 })), { maxLength: 30 }), parts => {
      const text = parts.join("");
      const inner = neutralize(text);
      for (const tag of DATA_TAGS) {
        expect(inner.toLowerCase()).not.toContain(`</${tag}>`);
        expect(asData(tag, text)).toBe(`<${tag}>${inner}</${tag}>`);
      }
    }), options);
  });

  it("accepts the exact access token and rejects a modified token", () => {
    fc.assert(fc.property(fc.string({ minLength: 1, maxLength: 128 }), token => {
      expect(tokenMatches(token, token)).toBe(true);
      expect(tokenMatches(`${token}!`, token)).toBe(false);
      expect(tokenMatches({ token }, token)).toBe(false);
    }), options);
  });
});
