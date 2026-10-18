import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { SOURCES } from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { factDrift } from "./helpers/languageFacts";

// Independent, stable acceptance key: changing the authored solution must not
// silently change the expected VPN policy in these regression checks.
const solution = {
  p_remote: "remote_tls", p_sites: "site_ipsec", p_mode: "esp_tunnel",
  p_boundary: "beyond_gateway", p_remote_auth: "remote_auth",
  p_peer_auth: "ike_auth", p_scope: "selected_traffic",
};
const mistakes = [
  ["p_remote", "remote_always_tls"], ["p_sites", "remote_tls"],
  ["p_mode", "transport"], ["p_boundary", "all_segments"],
  ["p_remote_auth", "no_validation"], ["p_peer_auth", "remote_auth"],
  ["p_scope", "all_segments"],
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 304) as MatchingPbq;

describe("VPN paths PBQ 304", () => {
  it("keeps stable identifiers, objective links and primary documentation", () => {
    const p = scenario("it");
    expect(p).toMatchObject({ id: 304, domain: 3, kind: "matching", mechanic: "matching", objective: "3.2", relatedObjectives: ["1.4", "4.6"] });
    expect(p.prompts.map(x => x.id)).toEqual(Object.keys(solution));
    expect(p.options.map(x => x.id)).toEqual([...Object.values(solution), "transport", "all_segments", "no_validation", "remote_always_tls"]);
    for (const code of p.relatedObjectives!) expect(ALL_OBJECTIVES).toContain(code);
    expect(p.sources).toEqual(["rfc4301", "rfc7296", "netgateOpenvpnMode"]);
    for (const id of p.sources!) expect(SOURCES[id].url).toMatch(/^https:\/\/(www\.rfc-editor\.org|docs\.netgate\.com)\//);
  });

  for (const lang of ["it", "en"] as const) {
    it(`${lang}: accepts exactly the stated VPN solution`, () => {
      expect(isResponseComplete(scenario(lang), { matches: solution })).toBe(true);
      expect(gradePbq(scenario(lang), { matches: solution })).toEqual({
        correct: 7, total: 7, passed: true,
        perItem: Object.fromEntries(Object.keys(solution).map(id => [id, true])),
      });
      expect(isResponseComplete(scenario(lang), { matches: { p_remote: "remote_tls" } })).toBe(false);
      expect(gradePbq(scenario(lang), {}).correct).toBe(0);
    });
    it.each(mistakes)(`${lang}: diagnoses %s without awarding a pass`, (prompt, wrong) => {
      const grade = gradePbq(scenario(lang), { matches: { ...solution, [prompt]: wrong } });
      expect(grade).toMatchObject({ correct: 6, total: 7, passed: false });
      expect(grade.perItem[prompt]).toBe(false);
    });
  }

  it("preserves addresses, objective codes and protocol facts in each translated field", () => {
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
