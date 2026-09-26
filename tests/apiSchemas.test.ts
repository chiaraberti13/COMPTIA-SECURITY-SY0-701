import { describe, expect, it } from "vitest";
import {
  ChatRequestSchema,
  MAX_HISTORY_TURNS,
  MAX_MESSAGE_CHARS,
  MAX_TOPICS,
  MAX_TOPIC_CHARS,
  RemediationPayloadSchema,
  RemediationRequestSchema,
  RemediationResponseSchema,
} from "../src/apiSchemas";

/*
 * The shared API contract (src/apiSchemas.ts), tested on its own: what is
 * accepted, what is normalised and what is refused. tests/api.test.ts checks
 * the same rules through the real HTTP endpoints.
 */

const modelQuestion = (overrides: Record<string, unknown> = {}) => ({
  topic: "Zero Trust",
  scenario: "A business scenario with conflicting constraints.",
  question: "Which is the BEST option?",
  options: ["A", "B", "C", "D"],
  answerIndex: 2,
  explanation: "C is best because...",
  ...overrides,
});

describe("chat request", () => {
  it("accepts a message and defaults the rest", () => {
    const parsed = ChatRequestSchema.parse({ message: "What is ZTA?" });
    expect(parsed).toEqual({ message: "What is ZTA?", history: [], lang: "it" });
  });

  it("refuses a missing, blank or non-string message", () => {
    for (const body of [{}, { message: "  \n " }, { message: 42 }, { message: ["x"] }]) {
      expect(ChatRequestSchema.safeParse(body).success, JSON.stringify(body)).toBe(false);
    }
  });

  it("reports an over-long message as too_big, which the server maps to 413", () => {
    const result = ChatRequestSchema.safeParse({ message: "x".repeat(MAX_MESSAGE_CHARS + 1) });
    expect(result.success).toBe(false);
    expect(result.error!.issues.map((i) => [i.path[0], i.code])).toContainEqual(["message", "too_big"]);
    expect(ChatRequestSchema.safeParse({ message: "x".repeat(MAX_MESSAGE_CHARS) }).success).toBe(true);
  });

  it("keeps only the last turns, caps each one and never passes an unknown role through", () => {
    const history = [
      ...Array.from({ length: MAX_HISTORY_TURNS }, (_, i) => ({ role: "user", content: `old-${i}` })),
      { role: "system", content: "y".repeat(MAX_MESSAGE_CHARS + 10) },
      null,
      { role: "user", content: { not: "a string" } },
    ];
    const parsed = ChatRequestSchema.parse({ message: "next", history });
    expect(parsed.history).toHaveLength(MAX_HISTORY_TURNS);
    expect(parsed.history.map((h) => h.content)).not.toContain("old-0");
    expect(parsed.history.at(-3)).toEqual({ role: "trainer", content: "y".repeat(MAX_MESSAGE_CHARS) });
    expect(parsed.history.at(-2)).toEqual({ role: "trainer", content: "" });
    expect(parsed.history.at(-1)).toEqual({ role: "user", content: "" });
  });

  it("ignores a history that is not a list and a language it does not know", () => {
    expect(ChatRequestSchema.parse({ message: "x", history: "oops", lang: "fr" })).toMatchObject({ history: [], lang: "it" });
    expect(ChatRequestSchema.parse({ message: "x", lang: "en" }).lang).toBe("en");
  });
});

describe("remediation request", () => {
  it("keeps at most the first topics, each cut and trimmed, dropping empty ones", () => {
    const weakTopics = ["  ", ...Array.from({ length: MAX_TOPICS + 3 }, (_, i) => ` t${i}-${"z".repeat(200)}`)];
    const { weakTopics: safe } = RemediationRequestSchema.parse({ weakTopics });
    expect(safe).toHaveLength(MAX_TOPICS - 1);
    expect(safe.every((t) => t.length <= MAX_TOPIC_CHARS && t === t.trim())).toBe(true);
  });

  it("refuses a missing, empty, all-blank or non-string list", () => {
    for (const body of [{}, { weakTopics: [] }, { weakTopics: ["", "  "] }, { weakTopics: "Zero Trust" }, { weakTopics: [{ topic: "x" }] }]) {
      expect(RemediationRequestSchema.safeParse(body).success, JSON.stringify(body)).toBe(false);
    }
  });
});

describe("remediation payload from the model", () => {
  const valid = { questions: [modelQuestion(), modelQuestion(), modelQuestion()] };

  it("turns three valid questions into app questions with server-owned ids", () => {
    const questions = RemediationPayloadSchema.parse(valid);
    expect(questions.map((q) => q.id)).toEqual([9_000_000, 9_000_001, 9_000_002]);
    expect(questions[0]).toMatchObject({ level: "ANALISI", answerIndex: 2, options: ["A", "B", "C", "D"] });
  });

  it("refuses anything outside the contract", () => {
    const broken = [
      null,
      { questions: [modelQuestion(), modelQuestion()] },
      { questions: [modelQuestion({ options: ["A", "B", "C"] }), modelQuestion(), modelQuestion()] },
      { questions: [modelQuestion({ answerIndex: 4 }), modelQuestion(), modelQuestion()] },
      { questions: [modelQuestion({ answerIndex: 1.5 }), modelQuestion(), modelQuestion()] },
      { questions: [modelQuestion({ topic: "   " }), modelQuestion(), modelQuestion()] },
      { questions: [modelQuestion({ question: "q".repeat(1201) }), modelQuestion(), modelQuestion()] },
    ];
    for (const payload of broken) expect(RemediationPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("produces exactly what the browser accepts", () => {
    const questions = RemediationPayloadSchema.parse(valid);
    expect(RemediationResponseSchema.safeParse({ questions }).success).toBe(true);
    expect(RemediationResponseSchema.safeParse({ questions: [] }).success).toBe(false);
  });
});
