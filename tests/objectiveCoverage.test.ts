import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import {
  OBJECTIVE_COVERAGE_PATH,
  OBJECTIVE_TERMS,
  missingObjectiveTerms,
  objectiveCoverage,
  renderObjectiveCoverage,
} from "../scripts/objective-coverage";
import { loadEnglishOverlay } from "../src/localizedData";

/*
 * Objective sub-topic coverage, kept current and one-way: the curated SY0-701
 * sub-topics that have no referenceable glossary/guide entry (they are only
 * explained in a quiz, or absent) may only decrease. When the fixture is empty,
 * every curated sub-topic is explained as its own searchable entry.
 */

const FIXTURE = "tests/fixtures/objectives-uncovered.json";
const baseline: string[] = JSON.parse(readFileSync(FIXTURE, "utf8"));

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("objective coverage", () => {
  it("docs/objective-coverage.md is up to date: run `npm run objective-coverage` after changing content", () => {
    expect(readFileSync(OBJECTIVE_COVERAGE_PATH, "utf8")).toBe(renderObjectiveCoverage());
  });

  it("adds no sub-topic without a referenceable entry", () => {
    const added = missingObjectiveTerms().filter((t) => !baseline.includes(t));
    expect(added, "add a glossary entry or guide passage for the new sub-topic, in Italian and English").toEqual([]);
  });

  it("only shrinks: a sub-topic that gained an entry leaves the list", () => {
    const current = new Set(missingObjectiveTerms());
    const fixed = baseline.filter((t) => !current.has(t));
    expect(fixed, `remove these from ${FIXTURE}`).toEqual([]);
  });

  it("never regresses to a true content gap: nothing is 'absent'", () => {
    const absent = objectiveCoverage().missing.filter((m) => m.where === "absent");
    expect(absent, "every curated sub-topic must be explained at least in a quiz").toEqual([]);
  });

  it("counts every curated term exactly once", () => {
    const cov = objectiveCoverage();
    const curated = Object.values(OBJECTIVE_TERMS).reduce((n, terms) => n + terms.length, 0);
    expect(cov.total).toBe(curated);
    expect(cov.covered + cov.missing.length).toBe(cov.total);
  });
});
