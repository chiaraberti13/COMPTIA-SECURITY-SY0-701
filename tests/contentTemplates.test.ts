import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import type { Subtopic } from "../src/types";

/*
 * The concept template (docs/content-templates.md), in both languages. The
 * question template is enforced by tests/dataset.test.ts, the guide sections
 * by tests/domainGuides.test.ts and the lab template by tests/labs.test.ts.
 */

/** A definition is one or two sentences; the analysis goes in `details`. */
const MAX_DEFINITION_CHARS = 400;
const ENDS_A_SENTENCE = /[.!?)»”]$/;
/** Short sections (ROADMAP: "Gerarchia dei titoli corretta"): about two minutes of reading. */
const MAX_DETAILS_WORDS = 400;

beforeAll(async () => {
  await loadEnglishOverlay();
});

function concepts(lang: "it" | "en"): Subtopic[] {
  return Object.values(getAllTopics(lang)).flat().flatMap((group) => group.subtopics);
}

describe.each(["it", "en"] as const)("concept template (%s)", (lang) => {
  it("has a name, a short definition, an analysis and an exam tip", () => {
    const broken = concepts(lang).flatMap((s) => {
      const problems: string[] = [];
      if (!s.name.trim()) problems.push("name");
      if (!s.definition.trim() || s.definition.length > MAX_DEFINITION_CHARS) problems.push("definition");
      if (!ENDS_A_SENTENCE.test(s.definition.trim())) problems.push("definition ends mid-sentence");
      if (!s.details.trim()) problems.push("details");
      if (!s.examTip.trim() || !ENDS_A_SENTENCE.test(s.examTip.trim())) problems.push("examTip");
      return problems.map((p) => `${s.checklistKey}: ${p}`);
    });
    expect(broken).toEqual([]);
  });

  it("keeps each analysis short enough to read in about two minutes", () => {
    // Longest on 2026-09-28: 366 words (InabilityToPatchConcept, Italian).
    const long = concepts(lang)
      .map((s) => ({ key: s.checklistKey, words: s.details.split(/\s+/).filter(Boolean).length }))
      .filter((s) => s.words > MAX_DETAILS_WORDS)
      .map((s) => `${s.key}: ${s.words} words`);
    expect(long, "split the concept, or move the extra into a deep dive").toEqual([]);
  });

  it("keeps comparison tables rectangular, with no empty cell", () => {
    const broken = concepts(lang)
      .filter((s) => s.comparativeTable)
      .filter(({ comparativeTable: t }) =>
        t!.headers.length < 2 ||
        t!.rows.length < 1 ||
        t!.rows.some((row) => row.length !== t!.headers.length) ||
        [...t!.headers, ...t!.rows.flat()].some((cell) => !cell.trim())
      )
      .map((s) => s.checklistKey);
    expect(broken).toEqual([]);
  });

  it("lists formulas only when there are some, each written out", () => {
    const broken = concepts(lang)
      .filter((s) => s.keyFormulas && (s.keyFormulas.length === 0 || s.keyFormulas.some((f) => !f.trim())))
      .map((s) => s.checklistKey);
    expect(broken).toEqual([]);
  });
});
