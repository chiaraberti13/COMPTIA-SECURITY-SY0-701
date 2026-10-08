import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";

/*
 * Roadmap task 23 (KMS & secure enclave, Obj 1.4), task 25 (CCMP & GMAC, Obj 4.1)
 * and task 27 (dissolvable NAC agent, Obj 4.5): autonomous, source-consistent
 * glossary entries that reuse TPM/HSM, GCMP and Agent/Agentless content without
 * duplicating it, keeping the distinctions the exam tests.
 */

beforeAll(loadEnglishOverlay);

const EXAMPLE = { it: /Piccolo Esempio Concentrato/, en: /Focused Mini-Example/ } as const;

describe.each(["it", "en"] as const)("KMS / enclave / CCMP / GMAC / dissolvable agent (%s)", (lang) => {
  const byKey = (k: string) => Object.values(getAllTopics(lang)).flat().flatMap((g) => g.subtopics).find((s) => s.checklistKey === k);

  it("adds five autonomous entries with a definition and a worked example", () => {
    for (const key of ["KMSConcept", "SecureEnclaveConcept", "CCMPConcept", "GMACConcept", "DissolvableAgentNAC"]) {
      const c = byKey(key);
      expect(c, key).toBeTruthy();
      expect(c!.definition.length).toBeGreaterThan(30);
      expect(c!.details).toMatch(EXAMPLE[lang]);
    }
  });

  it("separates KMS lifecycle from HSM hardware protection", () => {
    const c = byKey("KMSConcept")!;
    expect(c.details).toContain("HSM");
    expect(c.examTip.toLowerCase()).toMatch(lang === "it" ? /ciclo di vita/ : /lifecycle/);
  });

  it("ties secure enclave to a TEE whose guarantees depend on the implementation", () => {
    const c = byKey("SecureEnclaveConcept")!;
    expect(c.definition).toContain("TEE");
    expect(c.details.toLowerCase()).toMatch(lang === "it" ? /dipende dall'implementazione|implementazione/ : /depends on the implementation|implementation/);
  });

  it("keeps CCMP (WPA2/baseline WPA3) distinct from the 192-bit GCMP suite", () => {
    const c = byKey("CCMPConcept")!;
    expect(c.details).toContain("CCMP-128");
    expect(c.details).toContain("GCMP-256");
    expect(c.details).toContain("WPA2");
  });

  it("explains GMAC as integrity-only, not encryption and not GCMP", () => {
    const c = byKey("GMACConcept")!;
    expect(c.details).toContain("GCM");
    expect(c.details).toContain("GCMP");
    expect(c.examTip.toLowerCase()).toMatch(lang === "it" ? /solo integrità|riservatezza/ : /integrity|confidentiality/);
  });

  it("distinguishes dissolvable, persistent and agentless, and NAC quarantine from file quarantine", () => {
    const c = byKey("DissolvableAgentNAC")!;
    expect(c.details).toContain("NAC");
    expect(c.details.toLowerCase()).toContain("agentless");
    expect(c.examTip.toLowerCase()).toMatch(lang === "it" ? /quarantena/ : /quarantine/);
  });
});
