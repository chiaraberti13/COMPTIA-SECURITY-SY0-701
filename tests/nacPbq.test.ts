import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { SOURCES } from "../src/contentReview";
import { factDrift } from "./helpers/languageFacts";

const solution = {
  p_device_a: "ordinary", p_device_b: "patch_remediation", p_device_c: "encryption_remediation",
  p_device_d: "block_identity", p_device_e: "unknown_posture", p_reassessment: "fresh_authorization",
  p_network_scope: "remediation_services", p_compliance_limits: "no_safety_guarantee",
};
const mistakes = [
  ["p_device_a", "antimalware_trust"], ["p_device_b", "ordinary"],
  ["p_device_c", "ordinary"], ["p_device_d", "patch_remediation"],
  ["p_device_e", "unknown_compliant"], ["p_reassessment", "automatic_promotion"],
  ["p_network_scope", "broad_remediation"], ["p_compliance_limits", "antimalware_trust"],
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 503) as MatchingPbq;

describe("NAC posture PBQ 503", () => {
  it("links admission decisions to 4.5, endpoint hardening and official NAC sources", () => {
    const p = scenario("it");
    expect(p).toMatchObject({ id: 503, kind: "control", mechanic: "matching", domain: 4, objective: "4.5", relatedObjectives: ["4.1"] });
    expect(p.prompts.map(row => row.id)).toEqual(Object.keys(solution));
    expect(p.sources).toEqual(["ciscoIsePosture", "ciscoIseAgentless", "nist800207"]);
    expect(SOURCES.ciscoIsePosture.url).toMatch(/^https:\/\/www\.cisco\.com\//);
    expect(SOURCES.ciscoIseAgentless.url).toMatch(/^https:\/\/www\.cisco\.com\//);
    expect(p.evidenceTable!.rows).toHaveLength(5);
    for (const row of p.evidenceTable!.rows) expect(row).toHaveLength(p.evidenceTable!.headers.length);
  });
  for (const lang of ["it", "en"] as const) {
    it(`${lang}: grades the independent policy-based solution and rejects incomplete work`, () => {
      const p = scenario(lang);
      expect(isResponseComplete(p, { matches: solution })).toBe(true);
      expect(gradePbq(p, { matches: solution })).toMatchObject({ correct: 8, total: 8, passed: true });
      expect(isResponseComplete(p, { matches: { p_device_a: "ordinary" } })).toBe(false);
      expect(gradePbq(p, {}).correct).toBe(0);
    });
    it.each(mistakes)(`${lang}: diagnoses the misconception at %s`, (id, wrong) => {
      const grade = gradePbq(scenario(lang), { matches: { ...solution, [id]: wrong } });
      expect(grade).toMatchObject({ correct: 7, total: 8, passed: false });
      expect(grade.perItem[id]).toBe(false);
    });
    it(`${lang}: distinguishes posture, identity, agent capabilities and remediation scope`, () => {
      const p = scenario(lang);
      expect(p.scenario).toContain("Dissolvable Agent");
      expect(p.scenario).toContain("Agentless");
      expect(p.explanation).toContain(lang === "it" ? "report di postura conforme" : "compliant posture report");
      expect(p.explanation).toContain(lang === "it" ? "quarantena antimalware isola un file" : "antimalware quarantine isolates a file");
      const scope = p.options.find(o => o.id === "remediation_services")!.text;
      expect(scope).toContain("DNS/DHCP");
      expect(scope).toContain("NAC");
      expect(scope).toContain(lang === "it" ? "niente Internet generale" : "no general Internet");
      expect(p.explanation).toContain(lang === "it" ? "nuova valutazione riuscita" : "successful fresh assessment");
    });
  }
  it("preserves technical facts, IDs and table row identity across IT/EN", () => {
    const it = scenario("it"), en = scenario("en");
    for (const field of ["title", "scenario", "prompt", "explanation"] as const) expect(factDrift(it[field], en[field]), field).toBeNull();
    for (const field of ["prompts", "options"] as const) {
      for (const row of it[field]) expect(factDrift(row.text, en[field].find(x => x.id === row.id)!.text), row.id).toBeNull();
    }
    expect(it.evidenceTable!.rows.map(row => row[0])).toEqual(en.evidenceTable!.rows.map(row => row[0]));
    expect(it.evidenceTable!.headers).toHaveLength(en.evidenceTable!.headers.length);
  });
});
