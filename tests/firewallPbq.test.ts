import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { SOURCES } from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { factDrift } from "./helpers/languageFacts";

// Independent, stable acceptance key: changing the authored solution must not
// silently change the expected firewall policy in these regression checks.
const solution = {
  p_public_https: "wan_https", p_proxy_api: "dmz_api",
  p_admin_ssh: "mgmt_ssh", p_firewall_gui: "mgmt_gui",
  p_shadowed: "remove_broad", p_reply: "state_reply", p_unmatched: "implicit_deny",
};
const mistakes = [
  ["p_public_https", "internet_admin"], ["p_proxy_api", "wide_dmz"],
  ["p_admin_ssh", "internet_admin"], ["p_firewall_gui", "nat_only"],
  ["p_shadowed", "late_block"], ["p_reply", "wide_dmz"], ["p_unmatched", "mgmt_ssh"],
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 303) as MatchingPbq;

describe("firewall segmentation PBQ 303", () => {
  it("keeps stable identifiers, objective links and primary documentation", () => {
    const p = scenario("it");
    expect(p).toMatchObject({ id: 303, domain: 4, kind: "matching", mechanic: "matching", objective: "4.5", relatedObjectives: ["2.5", "3.2"] });
    expect(p.prompts.map(x => x.id)).toEqual(Object.keys(solution));
    expect(p.options.map(x => x.id)).toEqual([...Object.values(solution), "wide_dmz", "internet_admin", "late_block", "nat_only"]);
    for (const code of p.relatedObjectives!) expect(ALL_OBJECTIVES).toContain(code);
    expect(p.sources).toEqual(["netgateRuleMethodology", "netgateFirewallFundamentals"]);
    for (const id of p.sources!) expect(SOURCES[id].url).toMatch(/^https:\/\/docs\.netgate\.com\/pfsense\//);
  });

  for (const lang of ["it", "en"] as const) {
    it(`${lang}: accepts exactly the least privilege solution`, () => {
      expect(isResponseComplete(scenario(lang), { matches: solution })).toBe(true);
      expect(gradePbq(scenario(lang), { matches: solution })).toEqual({
        correct: 7, total: 7, passed: true,
        perItem: Object.fromEntries(Object.keys(solution).map(id => [id, true])),
      });
      expect(isResponseComplete(scenario(lang), { matches: { p_public_https: "wan_https" } })).toBe(false);
      expect(gradePbq(scenario(lang), {}).correct).toBe(0);
    });
    it.each(mistakes)(`${lang}: diagnoses %s without awarding a pass`, (prompt, wrong) => {
      const grade = gradePbq(scenario(lang), { matches: { ...solution, [prompt]: wrong } });
      expect(grade).toMatchObject({ correct: 6, total: 7, passed: false });
      expect(grade.perItem[prompt]).toBe(false);
    });
  }

  it("preserves addresses, ports, rule numbers and protocol facts in each translated field", () => {
    const it = scenario("it"), en = scenario("en");
    for (const field of ["title", "scenario", "prompt", "explanation"] as const) {
      expect(factDrift(it[field], en[field]), field).toBeNull();
    }
    for (const field of ["prompts", "options"] as const) {
      for (const row of it[field]) {
        expect(factDrift(row.text, en[field].find(x => x.id === row.id)!.text), row.id).toBeNull();
      }
    }
  });
});
