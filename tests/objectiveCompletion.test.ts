import { beforeAll, describe, expect, it } from "vitest";
import { CONCEPT_CITATIONS } from "../src/citations";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { getAllTopics, getInitialQuestions, loadEnglishOverlay } from "../src/localizedData";
import { OBJECTIVE_COMPLETION_ENTRIES } from "../src/objectiveCompletionTopics";

beforeAll(loadEnglishOverlay);

describe("objective coverage completion entries", () => {
  const appliedTerms: Record<"it" | "en", Record<string, string>> = {
    it: {
      ThreatScopeReduction: "threat scope reduction", RecordLevelEncryption: "cifratura a livello di record",
      ConfigurationEnforcement: "configuration enforcement", PasswordVaulting: "password vaulting",
      WorkforceMultiplier: "workforce multiplier", KeyRiskIndicators: "indicatori chiave di rischio",
    },
    en: {
      ThreatScopeReduction: "threat scope reduction", RecordLevelEncryption: "record-level encryption",
      ConfigurationEnforcement: "configuration enforcement", PasswordVaulting: "password vaulting",
      WorkforceMultiplier: "workforce multiplier", KeyRiskIndicators: "key risk indicators",
    },
  };

  it.each(["it", "en"] as const)("publishes complete, searchable and applied content in %s", (lang) => {
    const byDomain = getAllTopics(lang);
    const all = Object.values(byDomain).flat().flatMap((group) => group.subtopics);
    const index = buildGlossaryIndex(all);
    const quiz = getInitialQuestions(lang).map((question) => `${question.question}\n${question.explanation}`).join("\n").toLowerCase();

    for (const entry of OBJECTIVE_COMPLETION_ENTRIES) {
      const topic = byDomain[entry.domain].flatMap((group) => group.subtopics).find((sub) => sub.checklistKey === entry.key);
      expect(topic, entry.key).toBeDefined();
      expect(topic!.definition.length).toBeGreaterThan(80);
      expect(topic!.details).toMatch(lang === "it" ? /Piccolo Esempio Concentrato/ : /Focused Mini-Example/);
      expect(topic!.examTip.length).toBeGreaterThan(40);
      expect(findGlossaryTerms([entry.name[lang]], index).map((hint) => hint.id)).toContain(entry.key);

      expect(quiz, `${entry.key} has an applied quiz reference`).toContain(appliedTerms[lang][entry.key]);
    }
  });

  it("links every standards-based entry to its primary source", () => {
    for (const [domain, key] of [[1, "ThreatScopeReduction"], [1, "RecordLevelEncryption"], [2, "ConfigurationEnforcement"], [4, "PasswordVaulting"], [5, "KeyRiskIndicators"]] as const) {
      expect(CONCEPT_CITATIONS[`${domain}:${key}`]?.length, key).toBeGreaterThan(0);
    }
  });
});
