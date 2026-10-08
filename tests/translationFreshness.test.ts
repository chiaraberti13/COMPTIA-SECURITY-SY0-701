import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import * as data from "../src/data";
import { DOMAIN_GUIDES_IT } from "../src/domainGuides";
import { EAP_METHOD_GUIDE_COMPARISON } from "../src/eapMethodGuide";
import { EAP_METHOD_TOPICS } from "../src/eapMethodTopics";
import type { Question, TopicGroup } from "../src/types";

/**
 * Translations to review after a change (ROADMAP: "Traduzioni da rivedere
 * dopo una modifica"). tests/languageParity.test.ts catches a number or an
 * acronym that differs between the two languages, not a change of meaning:
 * if a sentence of the Italian source is rewritten, the English one stays as
 * it was and nothing notices.
 *
 * tests/fixtures/translation-sources.json records a fingerprint of the
 * Italian text each English translation was made (or last checked) from.
 * When the Italian text changes, this test lists the English translations to
 * reread. After updating or confirming them, record the new fingerprints:
 *
 *   UPDATE_TRANSLATION_SOURCES=1 npx vitest run tests/translationFreshness.test.ts
 *
 * and commit the fixture with the translation, so the review is visible.
 */

const FIXTURE = "tests/fixtures/translation-sources.json";
const DOMAINS = [1, 2, 3, 4, 5];

const fingerprint = (value: unknown) => createHash("sha256").update(JSON.stringify(value)).digest("hex").slice(0, 16);

const questions = (d: number) => (data as unknown as Record<string, Question[]>)[`DOMAIN_${d}_QUESTIONS`];
const topics = (d: number) => (data as unknown as Record<string, TopicGroup[]>)[`DOMAIN_${d}_TOPICS`];

/** Every translated unit, keyed as its English counterpart is, with the Italian text it translates. */
function italianSources(): Record<string, string> {
  const units: Record<string, string> = {};
  for (const d of DOMAINS) {
    for (const q of questions(d)) {
      units[`question D${d}#${q.id}`] = fingerprint([q.topic, q.scenario, q.question, q.options, q.explanation]);
    }
    for (const group of topics(d)) {
      units[`group "${group.title}"`] = fingerprint([group.title, group.description]);
      for (const s of group.subtopics) {
        units[`concept D${d} ${s.checklistKey}`] = fingerprint([s.name, s.definition, s.details, s.examTip, s.keyFormulas, s.comparativeTable]);
      }
    }
    // Guides are translated field by field, so a change points to one section.
    for (const [field, value] of Object.entries(DOMAIN_GUIDES_IT[d])) {
      if (field === "domainId" || field === "weight") continue;
      units[`guide D${d} ${field}`] = fingerprint(value);
    }
  }
  for (const s of EAP_METHOD_TOPICS.it.subtopics) {
    units[`concept D3 ${s.checklistKey}`] = fingerprint([s.name, s.definition, s.details, s.examTip, s.keyFormulas, s.comparativeTable]);
  }
  units["guide D4 EAP method comparison"] = fingerprint(EAP_METHOD_GUIDE_COMPARISON.it);
  return Object.fromEntries(Object.entries(units).sort(([a], [b]) => a.localeCompare(b)));
}

describe("translations to review", () => {
  const current = italianSources();

  if (process.env.UPDATE_TRANSLATION_SOURCES) {
    it("records the Italian sources the translations now match", () => {
      writeFileSync(FIXTURE, JSON.stringify(current, null, 2) + "\n");
    });
    return;
  }

  const recorded: Record<string, string> = existsSync(FIXTURE) ? JSON.parse(readFileSync(FIXTURE, "utf8")) : {};

  it("have none pending: every English text matches the Italian it was translated from", () => {
    const changed = Object.keys(current).filter((unit) => unit in recorded && recorded[unit] !== current[unit]);
    expect(changed, "the Italian text changed: reread the English translation, then UPDATE_TRANSLATION_SOURCES=1").toEqual([]);
  });

  it("know every translated unit, and no unit that no longer exists", () => {
    const unrecorded = Object.keys(current).filter((unit) => !(unit in recorded));
    const stale = Object.keys(recorded).filter((unit) => !(unit in current));
    expect({ unrecorded, stale }, "run UPDATE_TRANSLATION_SOURCES=1 once the translations are in place").toEqual({ unrecorded: [], stale: [] });
  });
});
