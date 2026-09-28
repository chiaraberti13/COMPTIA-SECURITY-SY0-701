import { beforeAll, describe, expect, it } from "vitest";
import { CONCEPT_CITATIONS, MENTIONS } from "../src/citations";
import { SOURCES, type SourceId } from "../src/contentReview";
import { getAllTopics, isActive, loadEnglishOverlay } from "../src/localizedData";
import type { ConceptRef } from "../src/canonicalTerms";

/*
 * Verifiable citations (ROADMAP: "Citazioni verificabili"): every concept that
 * names a law, a standard or a scoring system cites it (src/citations.ts), and
 * the article when the text states a specific rule.
 */

const DOMAINS = [1, 2, 3, 4, 5];

beforeAll(async () => {
  await loadEnglishOverlay();
});

/** Every active concept of a language, with its full text. */
function concepts(lang: "it" | "en") {
  return DOMAINS.flatMap((d) =>
    getAllTopics(lang)[d]
      .flatMap((g) => g.subtopics)
      .filter(isActive)
      .map((s) => ({ ref: `${d}:${s.checklistKey}` as ConceptRef, text: [s.name, s.definition, s.details, s.examTip].join("\n") }))
  );
}

const cited = (ref: ConceptRef): SourceId[] => (CONCEPT_CITATIONS[ref] ?? []).map((c) => c.source);

describe("citations", () => {
  it.each(["it", "en"] as const)("cover every document a concept names (%s)", (lang) => {
    const missing = concepts(lang).flatMap(({ ref, text }) =>
      MENTIONS.filter(([source, re]) => re.test(text) && !cited(ref).includes(source)).map(([source]) => `${ref} → ${source}`)
    );
    expect(missing, "add the citation to src/citations.ts").toEqual([]);
  });

  it("cite only documents the concept actually names, from the catalogue", () => {
    const text = new Map(concepts("it").map((c) => [c.ref, c.text]));
    const stray = Object.entries(CONCEPT_CITATIONS).flatMap(([ref, citations]) =>
      citations!.flatMap(({ source }) => {
        if (!(source in SOURCES)) return [`${ref}: unknown source ${source}`];
        if (!text.has(ref as ConceptRef)) return [`${ref}: no such active concept`];
        const pattern = MENTIONS.find(([id]) => id === source)?.[1];
        return pattern && pattern.test(text.get(ref as ConceptRef)!) ? [] : [`${ref}: does not name ${source}`];
      })
    );
    expect(stray).toEqual([]);
  });

  it("give the article of every GDPR rule the text states", () => {
    // "72 ore", "art. 83": a precise rule must say where it is written.
    const rule = /\b\d+\s+ore\b|\bart\.\s?\d+|\bsanzion/i;
    const unlocated = concepts("it")
      .filter(({ text }) => /\bGDPR\b/.test(text))
      .filter(({ text }) => text.split(/(?<=[.;])\s+|\n/).some((s) => /\bGDPR\b/.test(s) && rule.test(s)))
      .filter(({ ref }) => !CONCEPT_CITATIONS[ref]?.some((c) => c.source === "gdpr" && c.locator))
      .map(({ ref }) => ref);
    expect(unlocated).toEqual([]);
  });

  it("write each locator in both languages, naming the same articles", () => {
    for (const [ref, citations] of Object.entries(CONCEPT_CITATIONS)) {
      for (const { locator } of citations!) {
        if (!locator) continue;
        const numbers = (s: string) => (s.match(/\d+/g) ?? []).join(",");
        expect(numbers(locator.en), ref).toBe(numbers(locator.it));
      }
    }
  });
});
