import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import { GAP_ANALYSIS_PATH, conceptsWithoutExample, renderGapAnalysis, unsourcedFigures } from "../scripts/gap-analysis";
import { loadEnglishOverlay } from "../src/localizedData";

/*
 * The gap analysis (ROADMAP: "Analisi dei gap"), kept current and one-way:
 * the concepts without a practical example may only decrease, and no figure
 * set by a law or regulator may appear without its source.
 */

const FIXTURE = "tests/fixtures/concepts-without-example.json";
const baseline: string[] = JSON.parse(readFileSync(FIXTURE, "utf8"));

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("gap analysis", () => {
  it("docs/gap-analysis.md is up to date: run `npm run gap-analysis` after changing concepts", () => {
    expect(readFileSync(GAP_ANALYSIS_PATH, "utf8")).toBe(renderGapAnalysis());
  });

  it("adds no concept without an example", () => {
    const added = conceptsWithoutExample("it")
      .map((c) => c.ref)
      .filter((ref) => !baseline.includes(ref));
    expect(added, "write a «Piccolo Esempio Concentrato» for the new concept, in Italian and English").toEqual([]);
  });

  it("only shrinks: a concept that gained an example leaves the list", () => {
    const current = new Set(conceptsWithoutExample("it").map((c) => c.ref));
    const fixed = baseline.filter((ref) => !current.has(ref));
    expect(fixed, `remove these from ${FIXTURE}`).toEqual([]);
  });

  it("finds the same gaps in both languages", () => {
    expect(conceptsWithoutExample("en").map((c) => c.ref)).toEqual(conceptsWithoutExample("it").map((c) => c.ref));
  });

  it("leaves no legal figure without its source", () => {
    expect(unsourcedFigures(), "cite the article (e.g. «GDPR, art. 83, par. 5») or drop the figure").toEqual([]);
  });
});
