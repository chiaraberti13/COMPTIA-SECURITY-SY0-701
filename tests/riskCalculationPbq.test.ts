import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { factDrift } from "./helpers/languageFacts";

const answer = {
  ef_before: "ef_025", sle_before: "sle_200k", ale_before: "ale_80k", sle_after: "sle_80k",
  ale_after: "ale_8k", benefit: "benefit_72k", net: "net_54k", treatment: "mitigate_review",
};
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 308) as MatchingPbq;

describe("quantitative risk PBQ 308", () => {
  for (const lang of ["it", "en"] as const) {
    it(`${lang}: derives the complete AV-EF-SLE-ALE chain independently`, () => {
      const p = scenario(lang);
      const av = 800_000, efBefore = 25 / 100, aroBefore = 0.4, efAfter = 10 / 100, aroAfter = 0.1, cost = 18_000;
      const sleBefore = av * efBefore, aleBefore = sleBefore * aroBefore;
      const sleAfter = av * efAfter, aleAfter = sleAfter * aroAfter;
      expect({ sleBefore, aleBefore, sleAfter, aleAfter, reduction: aleBefore - aleAfter, net: aleBefore - aleAfter - cost })
        .toEqual({ sleBefore: 200_000, aleBefore: 80_000, sleAfter: 80_000, aleAfter: 8_000, reduction: 72_000, net: 54_000 });
      expect(p).toMatchObject({ objective: "5.2", domain: 5, sources: ["nist80030"] });
      expect(isResponseComplete(p, { matches: answer })).toBe(true);
      expect(isResponseComplete(p, {})).toBe(false);
      expect(gradePbq(p, { matches: answer })).toMatchObject({ correct: 8, total: 8, passed: true });
    });
    it(`${lang}: rejects unit, percentage and governance misconceptions`, () => {
      for (const [id, wrong] of [["ef_before", "ef_25"], ["ale_before", "ale_200k"], ["net", "net_72k"], ["treatment", "auto_accept"]]) {
        const result = gradePbq(scenario(lang), { matches: { ...answer, [id]: wrong } });
        expect(result).toMatchObject({ correct: 7, total: 8, passed: false });
        expect(result.perItem[id]).toBe(false);
      }
    });
  }
  it("preserves technical facts and evidence across IT/EN", () => {
    const it = scenario("it"), en = scenario("en");
    for (const field of ["title", "scenario", "prompt", "explanation"] as const) expect(factDrift(it[field], en[field]), field).toBeNull();
    for (const field of ["prompts", "options"] as const) for (const row of it[field])
      expect(factDrift(row.text, en[field].find(candidate => candidate.id === row.id)!.text), row.id).toBeNull();
    expect(it.evidenceTable!.rows).toHaveLength(4);
    it.evidenceTable!.rows.forEach((row, index) => row.forEach((cell, column) =>
      expect(factDrift(cell, en.evidenceTable!.rows[index][column])).toBeNull()));
  });
});
