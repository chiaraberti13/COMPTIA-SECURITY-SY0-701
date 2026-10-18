import { describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import { gradePbq, isResponseComplete, type MatchingPbq } from "../src/pbq";
import { SOURCES } from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { factDrift } from "./helpers/languageFacts";

// Independent, stable acceptance key: changing the authored solution must not
// silently change the expected DMARC decisions in these regression checks.
const solution = {
  p_message_a: "fail_spf_unaligned", p_message_b: "pass_dkim", p_message_c: "fail_dkim_unaligned",
  p_message_d: "pass_relaxed_spf", p_message_e: "fail_strict", p_message_f: "pass_strict_spf",
  p_disposition: "reject_request", p_limits: "pass_not_safety",
};
const mistakes = [
  ["p_message_a", "spf_always_pass"], ["p_message_b", "both_required"],
  ["p_message_c", "pass_dkim"], ["p_message_d", "both_required"],
  ["p_message_e", "related_is_strict"], ["p_message_f", "both_required"],
  ["p_disposition", "guaranteed_reject"], ["p_limits", "guaranteed_safe"],
];
const scenario = (lang: "it" | "en") => getPbqScenarios(lang).find(p => p.id === 403) as MatchingPbq;

describe("DMARC headers PBQ 403", () => {
  it("keeps stable identifiers, objective links and primary documentation", () => {
    const p = scenario("it");
    expect(p).toMatchObject({ id: 403, domain: 4, kind: "log", mechanic: "matching", objective: "4.5", relatedObjectives: ["2.2"] });
    expect(p.prompts.map(x => x.id)).toEqual(Object.keys(solution));
    expect(p.options.map(x => x.id)).toEqual([...Object.values(solution), "spf_always_pass", "both_required", "related_is_strict", "guaranteed_reject", "guaranteed_safe"]);
    for (const code of p.relatedObjectives!) expect(ALL_OBJECTIVES).toContain(code);
    expect(p.sources).toEqual(["rfc9989", "rfc7208", "rfc6376"]);
    for (const id of p.sources!) expect(SOURCES[id].url).toMatch(/^https:\/\/datatracker\.ietf\.org\//);
  });

  for (const lang of ["it", "en"] as const) {
    it(`${lang}: accepts exactly the stated DMARC solution`, () => {
      expect(isResponseComplete(scenario(lang), { matches: solution })).toBe(true);
      expect(gradePbq(scenario(lang), { matches: solution })).toEqual({
        correct: 8, total: 8, passed: true,
        perItem: Object.fromEntries(Object.keys(solution).map(id => [id, true])),
      });
      expect(isResponseComplete(scenario(lang), { matches: { p_message_a: "fail_spf_unaligned" } })).toBe(false);
      expect(gradePbq(scenario(lang), {}).correct).toBe(0);
    });
    it.each(mistakes)(`${lang}: diagnoses %s without awarding a pass`, (prompt, wrong) => {
      const grade = gradePbq(scenario(lang), { matches: { ...solution, [prompt]: wrong } });
      expect(grade).toMatchObject({ correct: 7, total: 8, passed: false });
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


it("keeps actual header evidence consistent with independent DMARC outcomes", () => {
  const expected = [false, true, false, true, false, true];
  for (const lang of ["it", "en"] as const) {
    const p = scenario(lang);
    p.prompts.slice(0, 6).forEach((row, index) => {
      const from = row.text.match(/From: [^@]+@([^ |]+)/)![1];
      const envelope = row.text.match(/MAIL FROM: [^@]+@([^ |]+)/)![1];
      const signing = row.text.match(/DKIM d=([^,]+)/)![1];
      // Only the two already-established documentation Organizational Domains
      // in this exercise; this is not a production DNS discovery algorithm.
      const aligned = (domain: string, relaxed: boolean) => relaxed
        ? domain.split(".").slice(-2).join(".") === from.split(".").slice(-2).join(".")
        : domain === from;
      const spf = row.text.includes("SPF=pass") && aligned(envelope, row.text.includes("aspf=r"));
      const dkim = row.text.includes("result=pass") && aligned(signing, row.text.includes("adkim=r"));
      expect(spf || dkim, row.id).toBe(expected[index]);
      expect(p.options.find(o => o.id === row.correctOptionId)!.text)
        .toMatch(new RegExp(`^DMARC=${expected[index] ? "pass" : "fail"}:?`));
    });
  }
});


it("keeps the existing email questions consistent with alignment and receiver discretion", async () => {
  await loadEnglishOverlay();
  for (const lang of ["it", "en"] as const) {
    for (const id of [40190, 40406, 40200]) {
      const q = getDomainQuestions(4, lang).find(q => q.id === id)!;
      expect(q.explanation).toContain(lang === "it" ? "policy locale" : "local policy");
      if (id !== 40190) {
        expect(q.explanation).toContain("Strict");
        expect(q.explanation).toContain("relaxed");
      }
    }
  }
});
