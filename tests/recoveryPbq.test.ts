import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { factDrift } from "./helpers/languageFacts";
const solution = { payments: "a", orders: "b", archive: "c", limits: "limits", point: "loss", copies: "copies", sites: "capacity" };
const plans = [
  { id: "a", cost: 9, last: "11:57", restore: 20 },
  { id: "b", cost: 5, last: "11:45", restore: 90 },
  { id: "c", cost: 2, last: "11:00", restore: 360 },
  { id: "d", cost: 1, last: "11:59", restore: 600 },
  { id: "e", cost: 3, last: "09:00", restore: 10 },
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 307) as MatchingPbq;
const loss = (clock: string) => { const [h, m] = clock.split(":").map(Number); return 12 * 60 - (h * 60 + m); };
describe("BIA recovery PBQ 307", () => {
  for (const lang of ["it", "en"] as const) {
    it(`${lang}: validates measured evidence and minimum-cost feasible choices`, () => {
      const p = scenario(lang);
      expect(p).toMatchObject({ kind: "matching", objective: "3.4", relatedObjectives: ["5.2"], sources: ["nist80034"] });
      for (const [id, rto, rpo] of [["payments", 30, 5], ["orders", 120, 30], ["archive", 480, 120]] as const) {
        const feasible = plans.filter(plan => plan.restore <= rto && loss(plan.last) <= rpo).sort((a, b) => a.cost - b.cost);
        expect(p.prompts.find(row => row.id === id)!.correctOptionId).toBe(feasible[0].id);
      }
      for (const [index, plan] of plans.entries()) {
        const row = p.evidenceTable!.rows[index];
        expect(row[0]).toBe(`${plan.id.toUpperCase()} / ${plan.cost}`);
        expect(row[2]).toContain(plan.last);
        expect(row[3]).toContain(String(plan.restore));
        expect(row).toHaveLength(p.evidenceTable!.headers.length);
      }
      expect(isResponseComplete(p, { matches: solution })).toBe(true);
      expect(isResponseComplete(p, {})).toBe(false);
      expect(gradePbq(p, { matches: solution })).toMatchObject({ correct: 7, total: 7, passed: true });
      expect(loss(plans[4].last)).toBe(180);
    });
    for (const [id, wrong] of [["payments", "d"], ["orders", "e"], ["archive", "a"], ["limits", "swapped"], ["point", "frequency"], ["copies", "replica"], ["sites", "hot"]]) {
      it(`${lang}: rejects misconception ${id}`, () => {
        const result = gradePbq(scenario(lang), { matches: { ...solution, [id]: wrong } });
        expect(result).toMatchObject({ correct: 6, total: 7, passed: false });
        expect(result.perItem[id]).toBe(false);
      });
    }
  }
  it("keeps IT/EN facts and measured evidence identical", () => {
    const a = scenario("it"), b = scenario("en");
    for (const field of ["title", "scenario", "prompt", "explanation"] as const) expect(factDrift(a[field], b[field]), field).toBeNull();
    for (const field of ["prompts", "options"] as const) for (const row of a[field]) expect(factDrift(row.text, b[field].find(x => x.id === row.id)!.text), row.id).toBeNull();
    a.evidenceTable!.rows.forEach((row, index) => row.forEach((cell, col) => expect(factDrift(cell, b.evidenceTable!.rows[index][col])).toBeNull()));
  });
});
