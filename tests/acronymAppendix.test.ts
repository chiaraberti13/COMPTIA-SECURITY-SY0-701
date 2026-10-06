import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { acronymsOf, buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";

beforeAll(loadEnglishOverlay);

describe("roadmap acronym appendix additions", () => {
  it.each(["it", "en"] as const)("makes each added acronym discoverable with a definition and example (%s)", (lang) => {
    const topics = Object.values(getAllTopics(lang)).flat().flatMap((g) => g.subtopics);
    const index = buildGlossaryIndex(topics);
    for (const acronym of ["LEAP", "EAP-FAST", "WPS", "WTLS", "NTLM", "PAP", "PEM", "DER", "P12", "PFX"]) {
      const hint = index.byAcronym.get(acronym);
      expect(hint, acronym).toBeDefined();
      expect(hint!.definition.length).toBeGreaterThan(30);
      expect(findGlossaryTerms([`Read ${acronym}.`], index)[0]?.id).toBe(hint!.id);
      const concept = topics.find((s) => s.checklistKey === hint!.id)!;
      expect(concept.details).toMatch(lang === "it" ? /Piccolo Esempio Concentrato/ : /Focused Mini-Example/);
      expect(concept.examTip).toBeTruthy();
    }
    for (const acronym of ["LEAP", "WTLS", "NTLM", "PAP"]) {
      expect(index.byAcronym.get(acronym)!.definition).toMatch(/legacy/i);
    }
    const der = topics.find((s) => s.checklistKey === "CertificateDER")!;
    expect(der.details).toContain(".cer");
    expect(der.details).toContain("CER");
    expect(der.details).toContain("PEM");
  });

  it("recognizes hyphenated acronyms and the official P12 label without matching fragments", () => {
    expect(acronymsOf("Flexible Authentication via Secure Tunneling (EAP-FAST)")).toEqual(["EAP-FAST"]);
    expect(acronymsOf("PKCS #12 (P12) / Personal Information Exchange (PFX)")).toEqual(["P12", "PFX"]);
    expect(acronymsOf("Q3")).toEqual([]);
    const index = buildGlossaryIndex([{ name: "EAP-FAST", checklistKey: "fast", definition: "tunnel", details: "", examTip: "" }]);
    expect(findGlossaryTerms(["XEAP-FAST EAP-FASTX"], index)).toEqual([]);
    expect(findGlossaryTerms(["EAP-FAST"], index)).toHaveLength(1);
  });
});
