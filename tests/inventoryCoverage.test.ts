import { readFileSync } from "node:fs";
import { beforeAll, describe, expect, it } from "vitest";
import {
  INVENTORY_COVERAGE_PATH,
  inventoryCoverage,
  notYetBilingual,
  renderInventoryCoverage,
} from "../scripts/inventory-coverage";
import { SY0701_INVENTORY } from "../scripts/sy0701-inventory";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { loadEnglishOverlay } from "../src/localizedData";

/*
 * Full official SY0-701 objective inventory (issue #103, Phase A). The complete
 * enumeration of the objectives document is the denominator; this guards that
 * the inventory is well-formed, the report is current, and the list of leaves
 * not yet covered in both languages only shrinks (closed one domain at a time
 * in later reviews).
 */

const FIXTURE = "tests/fixtures/inventory-not-bilingual.json";
const baseline: string[] = JSON.parse(readFileSync(FIXTURE, "utf8"));

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("SY0-701 official inventory coverage", () => {
  it("gives every leaf a valid objective code and a label", () => {
    const objectives = new Set(ALL_OBJECTIVES);
    const broken = SY0701_INVENTORY.filter(
      (e) => !objectives.has(e.code) || !e.item.trim() || !e.group.trim()
    ).map((e) => `${e.code} — ${e.item}`);
    expect(broken).toEqual([]);
  });

  it("has no duplicate code+item pairs", () => {
    const seen = new Set<string>();
    const dupes: string[] = [];
    for (const e of SY0701_INVENTORY) {
      const key = `${e.code}::${e.item}`;
      if (seen.has(key)) dupes.push(key);
      seen.add(key);
    }
    expect(dupes).toEqual([]);
  });

  it("covers the full breadth of the objectives (654 leaves across 1.1–5.6)", () => {
    const cov = inventoryCoverage();
    expect(cov.total).toBe(SY0701_INVENTORY.length);
    expect(cov.total).toBeGreaterThan(600);
    // Phase A guard: breadth coverage must stay high.
    expect(cov.anyLanguage / cov.total).toBeGreaterThan(0.95);
  });

  it("docs/inventory-coverage.md is up to date: run `npm run inventory-coverage`", () => {
    expect(readFileSync(INVENTORY_COVERAGE_PATH, "utf8")).toBe(renderInventoryCoverage());
  });

  it("only shrinks: adds no leaf that is not yet bilingual", () => {
    const added = notYetBilingual().filter((t) => !baseline.includes(t));
    expect(added, "a new official leaf lost bilingual coverage — add it in IT and EN").toEqual([]);
  });

  it("only shrinks: a leaf that became bilingual leaves the baseline fixture", () => {
    const current = new Set(notYetBilingual());
    const closed = baseline.filter((t) => !current.has(t));
    expect(closed, `remove these from ${FIXTURE}`).toEqual([]);
  });
});
