import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { SOURCES } from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { factDrift } from "./helpers/languageFacts";

// Independent, stable acceptance key: changing the authored solution must not
// silently change the expected 802.1X roles and profiles in these regression checks.
const solution = {
  p_supplicant: "client", p_authenticator: "ap", p_auth_server: "server",
  p_eap_tls: "eap_tls", p_peap: "peap_mschap", p_ttls: "ttls_pap",
  p_server_validation: "validate_server", p_radius: "radius_transport", p_factors: "one_factor",
};
const mistakes = [
  ["p_supplicant", "swapped_roles"], ["p_authenticator", "client"],
  ["p_auth_server", "ap"], ["p_eap_tls", "peap_mschap"],
  ["p_peap", "ttls_pap"], ["p_ttls", "peap_mschap"],
  ["p_server_validation", "accept_any"], ["p_radius", "radius_method"], ["p_factors", "two_factors"],
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 305) as MatchingPbq;

describe("enterprise Wi-Fi PBQ 305", () => {
  it("keeps stable identifiers, objective links and primary documentation", () => {
    const p = scenario("it");
    expect(p).toMatchObject({ id: 305, domain: 4, kind: "matching", mechanic: "matching", objective: "4.1", relatedObjectives: ["3.2"] });
    expect(p.prompts.map(x => x.id)).toEqual(Object.keys(solution));
    expect(p.options.map(x => x.id)).toEqual([...Object.values(solution), "swapped_roles", "radius_method", "accept_any", "two_factors"]);
    for (const code of p.relatedObjectives!) expect(ALL_OBJECTIVES).toContain(code);
    expect(p.sources).toEqual(["ieee8021x", "rfc3748", "rfc9190", "rfc5281", "microsoftPeap"]);
    for (const id of p.sources!) expect(SOURCES[id].url).toMatch(/^https:\/\/(www\.rfc-editor\.org|datatracker\.ietf\.org|1\.ieee802\.org|learn\.microsoft\.com)\//);
  });

  for (const lang of ["it", "en"] as const) {
    it(`${lang}: accepts exactly the stated Wi-Fi solution`, () => {
      expect(isResponseComplete(scenario(lang), { matches: solution })).toBe(true);
      expect(gradePbq(scenario(lang), { matches: solution })).toEqual({
        correct: 9, total: 9, passed: true,
        perItem: Object.fromEntries(Object.keys(solution).map(id => [id, true])),
      });
      expect(isResponseComplete(scenario(lang), { matches: { p_supplicant: "client" } })).toBe(false);
      expect(gradePbq(scenario(lang), {}).correct).toBe(0);
    });
    it.each(mistakes)(`${lang}: diagnoses %s without awarding a pass`, (prompt, wrong) => {
      const grade = gradePbq(scenario(lang), { matches: { ...solution, [prompt]: wrong } });
      expect(grade).toMatchObject({ correct: 8, total: 9, passed: false });
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


it("keeps question 40199 consistent with certificate validation and WPA3 modes in both languages", async () => {
  await loadEnglishOverlay();
  for (const lang of ["it", "en"] as const) {
    const q = getDomainQuestions(4, lang).find(q => q.id === 40199)!;
    expect(q.answerIndex).toBe(0);
    expect(q.explanation).toContain("PMF");
    expect(q.explanation).toContain(lang === "it" ? "192 bit è distinta" : "192-bit mode is distinct");
    expect(q.explanation).toContain(lang === "it" ? "valida correttamente" : "correctly validates");
    expect(q.explanation).not.toMatch(/più robusta|strongest EAP/);
  }
});
