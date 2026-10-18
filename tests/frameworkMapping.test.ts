import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { FRAMEWORK_MAPPING_PATH, renderFrameworkMapping } from "../scripts/framework-mapping";
import { ATTACK_TACTICS, CIS_CONTROLS, CSF_FUNCTIONS, FRAMEWORK_MAPPING } from "../src/frameworkMapping";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

describe("framework mapping", () => {
  it("maps every official objective and nothing else", () => {
    expect(Object.keys(FRAMEWORK_MAPPING).sort()).toEqual([...ALL_OBJECTIVES].sort());
  });

  it("gives every objective at least one CSF function and uses only known values", () => {
    for (const [code, m] of Object.entries(FRAMEWORK_MAPPING)) {
      expect(m.csf.length, code).toBeGreaterThan(0);
      for (const f of m.csf) expect(Object.keys(CSF_FUNCTIONS), code).toContain(f);
      for (const n of m.cis) expect(Object.keys(CIS_CONTROLS), code).toContain(String(n));
      for (const t of m.attack) expect(ATTACK_TACTICS, code).toContain(t);
    }
  });

  it("is up to date: run `npm run framework-mapping` after changing the mapping", () => {
    expect(readFileSync(FRAMEWORK_MAPPING_PATH, "utf8")).toBe(renderFrameworkMapping());
  });
});
