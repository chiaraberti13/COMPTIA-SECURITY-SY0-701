import { describe, expect, it } from "vitest";
import { PBQ_SCENARIOS } from "../src/pbqData";
import { PBQ_EN } from "../src/pbqData.en";
import { getPbqScenarios } from "../src/localizedPbq";
import { KIND_MECHANIC, type MatchingPbq, type OrderingPbq, type PbqKind } from "../src/pbq";
import { ALL_OBJECTIVES, OFFICIAL_OBJECTIVES } from "../src/questionObjectives";

/**
 * Keeps the performance-based scenarios well-formed and the two languages in
 * lock-step. Encodes the content rules the roadmap item depends on, so a broken
 * or half-translated scenario fails CI instead of reaching a learner.
 */

const orderingOf = PBQ_SCENARIOS.filter((p): p is OrderingPbq => p.mechanic === "ordering");
const matchingOf = PBQ_SCENARIOS.filter((p): p is MatchingPbq => p.mechanic === "matching");

describe("PBQ scenarios — structure", () => {
  it("has globally unique ids", () => {
    const ids = PBQ_SCENARIOS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every scenario the mechanic its theme requires", () => {
    for (const p of PBQ_SCENARIOS) {
      expect(p.mechanic, `scenario ${p.id}`).toBe(KIND_MECHANIC[p.kind]);
    }
  });

  it("covers all five roadmap themes", () => {
    const kinds = new Set<PbqKind>(PBQ_SCENARIOS.map((p) => p.kind));
    expect([...kinds].sort()).toEqual(["control", "incident", "log", "matching", "ordering"]);
  });

  it("ties each scenario to an official objective in its own domain", () => {
    for (const p of PBQ_SCENARIOS) {
      expect(ALL_OBJECTIVES, `scenario ${p.id}`).toContain(p.objective);
      expect(OFFICIAL_OBJECTIVES[p.domain], `scenario ${p.id} domain`).toContain(p.objective);
    }
  });

  it("has non-empty title, scenario, prompt and explanation", () => {
    for (const p of PBQ_SCENARIOS) {
      for (const field of ["title", "scenario", "prompt", "explanation"] as const) {
        expect(p[field].trim(), `scenario ${p.id} ${field}`).not.toBe("");
      }
    }
  });
});

describe("PBQ scenarios — ordering tasks", () => {
  it("have at least three steps with unique, non-empty ids and text", () => {
    for (const p of orderingOf) {
      expect(p.steps.length, `scenario ${p.id}`).toBeGreaterThanOrEqual(3);
      const ids = p.steps.map((s) => s.id);
      expect(new Set(ids).size, `scenario ${p.id} unique step ids`).toBe(ids.length);
      for (const s of p.steps) {
        expect(s.id.trim(), `scenario ${p.id} step id`).not.toBe("");
        expect(s.text.trim(), `scenario ${p.id} step text`).not.toBe("");
      }
    }
  });
});

describe("PBQ scenarios — matching tasks", () => {
  it("have at least three prompts, each pointing at a real option", () => {
    for (const p of matchingOf) {
      expect(p.prompts.length, `scenario ${p.id}`).toBeGreaterThanOrEqual(3);
      const promptIds = p.prompts.map((x) => x.id);
      expect(new Set(promptIds).size, `scenario ${p.id} unique prompt ids`).toBe(promptIds.length);
      const optionIds = p.options.map((o) => o.id);
      expect(new Set(optionIds).size, `scenario ${p.id} unique option ids`).toBe(optionIds.length);
      for (const prompt of p.prompts) {
        expect(optionIds, `scenario ${p.id} prompt ${prompt.id} target`).toContain(prompt.correctOptionId);
        expect(prompt.text.trim(), `scenario ${p.id} prompt text`).not.toBe("");
      }
      for (const o of p.options) {
        expect(o.text.trim(), `scenario ${p.id} option ${o.id} text`).not.toBe("");
      }
    }
  });
});

describe("PBQ scenarios — English overlay parity", () => {
  it("translates exactly the Italian scenarios, no more and no fewer", () => {
    const itIds = PBQ_SCENARIOS.map((p) => p.id).sort((a, b) => a - b);
    const enIds = Object.keys(PBQ_EN).map(Number).sort((a, b) => a - b);
    expect(enIds).toEqual(itIds);
  });

  it("keeps every scenario's step / prompt / option ids identical in both languages", () => {
    for (const p of PBQ_SCENARIOS) {
      const o = PBQ_EN[p.id];
      expect(o, `scenario ${p.id} override`).toBeDefined();
      for (const field of ["title", "scenario", "prompt", "explanation"] as const) {
        expect(o[field]?.trim(), `scenario ${p.id} ${field} EN`).not.toBe("");
      }
      if (p.mechanic === "ordering") {
        expect(Object.keys(o.steps ?? {}).sort(), `scenario ${p.id} step ids`).toEqual(
          p.steps.map((s) => s.id).sort()
        );
        for (const text of Object.values(o.steps ?? {})) {
          expect(text.trim(), `scenario ${p.id} EN step text`).not.toBe("");
        }
      } else {
        expect(Object.keys(o.prompts ?? {}).sort(), `scenario ${p.id} prompt ids`).toEqual(
          p.prompts.map((x) => x.id).sort()
        );
        expect(Object.keys(o.options ?? {}).sort(), `scenario ${p.id} option ids`).toEqual(
          p.options.map((x) => x.id).sort()
        );
        for (const text of [...Object.values(o.prompts ?? {}), ...Object.values(o.options ?? {})]) {
          expect(text.trim(), `scenario ${p.id} EN text`).not.toBe("");
        }
      }
    }
  });

  it("returns fully localized scenarios in English", () => {
    const en = getPbqScenarios("en");
    expect(en.length).toBe(PBQ_SCENARIOS.length);
    const first = en.find((p) => p.id === 101) as OrderingPbq;
    expect(first.title).toBe("Lifecycle of a TLS certificate");
    expect(first.steps[0].text).toContain("key pair");
  });
});
