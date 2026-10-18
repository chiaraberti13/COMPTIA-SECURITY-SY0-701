import { beforeAll, describe, expect, it } from "vitest";
import { getDomainQuestions, getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { factDrift, strings } from "./helpers/languageFacts";

/*
 * Content parity between the Italian source and the English overlay, as the
 * app renders them (subtopics feed the glossary too). Every translated
 * sentence must carry the same numbers, acronyms and literal tokens.
 */

const DOMAIN_IDS = [1, 2, 3, 4, 5] as const;

/** Fields that are identifiers or enums, not prose. */
const NOT_PROSE = /\.(icon|checklistKey|level)$/;

/**
 * Sentence pairs reviewed by hand whose wording differs idiomatically while the
 * content is the same. Key: "D<domain> <topics|questions> <path>".
 */
const REVIEWED: Record<string, string> = {
  "D2 questions .126.scenario": "«collegate al PC» is rendered as «plugged them in»: same action, no fact lost.",
  "D5 topics .8.subtopics.4.details": "«puntualissimo nell'uscire alle 18» is rendered as «out of the door at six on the dot».",
};

function driftReport(): Map<string, string> {
  const drift = new Map<string, string>();
  for (const d of DOMAIN_IDS) {
    const sources = [
      ["topics", getDomainTopics(d, "it"), getDomainTopics(d, "en")],
      ["questions", getDomainQuestions(d, "it"), getDomainQuestions(d, "en")],
    ] as const;
    for (const [kind, itData, enData] of sources) {
      const en = new Map(strings(enData));
      for (const [path, itText] of strings(itData)) {
        if (NOT_PROSE.test(path)) continue;
        const diff = factDrift(itText, en.get(path) ?? "");
        if (diff) drift.set(`D${d} ${kind} ${path}`, diff);
      }
    }
  }
  return drift;
}

describe("Italian and English study content", () => {
  let drift: Map<string, string>;
  beforeAll(async () => {
    await loadEnglishOverlay();
    drift = driftReport();
  });

  it("carry the same numbers, acronyms and literal tokens in every sentence", () => {
    const unreviewed = [...drift].filter(([key]) => !(key in REVIEWED)).map(([key, diff]) => `${key}: ${diff}`);
    expect(unreviewed).toEqual([]);
  });

  it("keep no reviewed exception that no longer differs", () => {
    expect(Object.keys(REVIEWED).filter((key) => !drift.has(key))).toEqual([]);
  });
});
