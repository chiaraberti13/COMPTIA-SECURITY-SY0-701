import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { acronymsOf, buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { ACRONYM_APPENDIX, acronymObjective } from "../src/acronymAppendixTopics";
import { buildAcronymDeck } from "../src/flashcards";
import { SY0701_ACRONYMS } from "../scripts/acronym-coverage";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

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

  it("keeps every appendix expansion exact and its IT/EN flashcard in parity", () => {
    expect(ACRONYM_APPENDIX).toHaveLength(236);
    for (const [acronym, expansion] of ACRONYM_APPENDIX) {
      expect(expansion, acronym).toBe(SY0701_ACRONYMS[acronym]);
    }
    const it = new Map(buildAcronymDeck(getAllTopics("it")).map((card) => [card.acronym, card]));
    const en = new Map(buildAcronymDeck(getAllTopics("en")).map((card) => [card.acronym, card]));
    for (const [acronym, expansion] of ACRONYM_APPENDIX) {
      expect(it.get(acronym)?.expansion, `${acronym} IT`).toBe(expansion);
      expect(en.get(acronym)?.expansion, `${acronym} EN`).toBe(expansion);
    }
  });

  it.each(["ATT&CK", "PCI DSS", "S/MIME", "SE Linux", "TCP/IP", "USB OTG", "MaaS", "SoC"])("indexes the official special token %s", (acronym) => {
    expect(acronymsOf(`${SY0701_ACRONYMS[acronym]} (${acronym})`)).toContain(acronym);
  });

  it("gives every appendix acronym a valid, per-entry SY0-701 objective (issue #102)", () => {
    const objectives = new Set(ALL_OBJECTIVES);
    const broken = ACRONYM_APPENDIX
      .map(([acronym]) => [acronym, acronymObjective(acronym)] as const)
      .filter(([, obj]) => !objectives.has(obj))
      .map(([acronym, obj]) => `${acronym} → ${obj}`);
    expect(broken, "add the acronym to ACRONYM_META with a real objective").toEqual([]);
    // The authentication acronyms the review flagged belong to IAM, not to 1.4.
    for (const iam of ["CHAP", "MSCHAP", "2FA", "PIV"]) expect(acronymObjective(iam), iam).toBe("4.6");
  });
});
