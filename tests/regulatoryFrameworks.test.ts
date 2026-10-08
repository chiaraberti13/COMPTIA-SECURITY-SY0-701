import { beforeAll, describe, expect, it } from "vitest";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { getDomainGuide } from "../src/domainGuides";
import { buildAcronymDeck } from "../src/flashcards";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { CONCEPT_CITATIONS } from "../src/citations";

const entries = [
  ["SOX", "SarbanesOxleyAct", "Sarbanes-Oxley Act"],
  ["GLBA", "GrammLeachBlileyAct", "Gramm-Leach-Bliley Act"],
  ["HIPAA", "HIPAAComplianceConcept", "Health Insurance Portability and Accountability Act"],
  ["PCI-DSS", "PCIDSSComplianceConcept", "Payment Card Industry Data Security Standard"],
] as const;

describe("Regulatory scope and compliance reporting", () => {
  beforeAll(async () => { await loadEnglishOverlay(); });
  for (const lang of ["it", "en"] as const) {
    it(`publishes searchable definitions, dated sources and correct cards in ${lang}`, () => {
      const groups = getDomainTopics(5, lang);
      const topics = groups.flatMap(group => group.subtopics);
      const index = buildGlossaryIndex(topics);
      const deck = buildAcronymDeck({ 5: groups });
      for (const [acronym, key, expansion] of entries) {
        const topic = topics.find(entry => entry.checklistKey === key)!;
        expect(topic).toBeDefined();
        expect(topic.definition.length).toBeGreaterThan(50);
        expect(topic.details).toContain("2026-10-08");
        expect(topic.details).toContain("Kestrelia");
        expect(CONCEPT_CITATIONS[`5:${key}`]?.length).toBeGreaterThan(0);
        for (const query of [acronym, expansion]) {
          expect(findGlossaryTerms([query], index).map(hint => hint.id)).toContain(key);
        }
        expect(deck.find(card => card.acronym === acronym)?.expansion).toBe(expansion);
      }
      // Both spellings used by learners are present in the actual glossary search text.
      const pci = topics.find(entry => entry.checklistKey === "PCIDSSComplianceConcept")!;
      expect(pci.name).toContain("PCI-DSS");
      expect(pci.details).toContain("PCI DSS");
    });

    it(`distinguishes U.S./EU law from a global payment standard in ${lang}`, () => {
      const topics = getDomainTopics(5, lang).flatMap(group => group.subtopics);
      const details = (key: string) => topics.find(entry => entry.checklistKey === key)!.details;
      expect(details("SarbanesOxleyAct")).toContain("SEC");
      expect(details("GrammLeachBlileyAct")).toContain("FTC Safeguards Rule");
      expect(details("HIPAAComplianceConcept")).toContain("ePHI");
      expect(details("HIPAAComplianceConcept")).toContain("business associates");
      expect(details("PCIDSSComplianceConcept")).toMatch(/non è di per sé una legge|is not itself a law/);
      expect(details("Compliance")).toMatch(/contrattuali|contractual/);
      expect(details("Compliance")).toContain("Reporting");
      for (const [, key] of entries) {
        expect(details(key)).not.toMatch(/\b\d+\s*(?:euro|dollars|%)/i);
      }
      const guide = getDomainGuide(5, lang);
      const comparison = guide.comparisons?.find(entry => entry.title.includes("(5.1/5.4)"));
      expect(comparison?.rows).toHaveLength(5);
      expect(JSON.stringify(comparison)).toContain("GDPR");
      expect(guide.practiceScenarios?.find(entry => entry.title === (lang === "it" ? "Obblighi diversi nello stesso gruppo" : "Different obligations within one group"))?.objective).toBe("5.4");
    });
  }
});
