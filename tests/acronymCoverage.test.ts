import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import {
  ACRONYM_COVERAGE_PATH,
  SY0701_ACRONYMS,
  acronymCoverage,
  missingAcronyms,
  renderAcronymCoverage,
} from "../scripts/acronym-coverage";
import { loadEnglishOverlay } from "../src/localizedData";

/*
 * The SY0-701 acronym coverage, kept current and one-way: the acronyms of the
 * official Acronym List that the app does not yet make findable may only
 * decrease. When the fixture is empty, every acronym is covered (100%).
 *
 * "Findable" = the acronym appears in the glossary search surface (entry name,
 * definition, details, exam tip, group title) or in a domain guide shown in the
 * app, in at least one language — the same signal scripts/acronym-coverage.ts
 * reports and tests/acronymAppendix.test.ts relies on.
 */

const FIXTURE = "tests/fixtures/acronyms-missing.json";
const baseline: string[] = JSON.parse(readFileSync(FIXTURE, "utf8"));

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("acronym coverage", () => {
  it("docs/acronym-coverage.md is up to date: run `npm run acronym-coverage` after changing content", () => {
    expect(readFileSync(ACRONYM_COVERAGE_PATH, "utf8")).toBe(renderAcronymCoverage());
  });

  it("adds no acronym that the app fails to make findable", () => {
    const added = missingAcronyms().filter((a) => !baseline.includes(a));
    expect(added, "add a glossary entry or alias for the new acronym, in Italian and English").toEqual([]);
  });

  it("only shrinks: an acronym that became findable leaves the list", () => {
    const current = new Set(missingAcronyms());
    const fixed = baseline.filter((a) => !current.has(a));
    expect(fixed, `remove these from ${FIXTURE}`).toEqual([]);
  });

  it("covers every acronym listed in the fixture or in the content, with no overlap", () => {
    const cov = acronymCoverage();
    const missing = new Set(missingAcronyms());
    // Every acronym is either searchable or missing, never both or neither.
    for (const acronym of Object.keys(SY0701_ACRONYMS)) {
      expect(cov.searchable.includes(acronym) !== missing.has(acronym), acronym).toBe(true);
    }
    expect(cov.total).toBe(Object.keys(SY0701_ACRONYMS).length);
  });
});
