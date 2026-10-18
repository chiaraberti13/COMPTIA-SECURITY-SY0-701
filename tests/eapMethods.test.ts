import { beforeAll, describe, expect, it } from "vitest";
import { getDomainGuide } from "../src/domainGuides";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { CONCEPT_CITATIONS } from "../src/citations";

const methods = ["EAP-TLS", "EAP-TTLS", "PEAP"];

describe("EAP method glossary and server validation", () => {
  beforeAll(async () => { await loadEnglishOverlay(); });

  it("publishes three independent glossary entries in both languages", () => {
    for (const lang of ["it", "en"] as const) {
      const topics = getDomainTopics(3, lang).flatMap((group) => group.subtopics);
      for (const key of methods) {
        const topic = topics.find((entry) => entry.checklistKey === key);
        expect(topic, key).toBeDefined();
        expect(topic!.name).toContain(key);
        expect(topic!.definition.length).toBeGreaterThan(40);
        expect(topic!.details).toMatch(/CA|certificat|certificate/i);
        expect(topic!.examTip).toMatch(/MFA|fattore|factor/i);
        expect(CONCEPT_CITATIONS[`3:${key}` as keyof typeof CONCEPT_CITATIONS]).toBeDefined();
      }
      const parent = topics.find((entry) => entry.checklistKey === "EAPProtocol_New");
      expect(parent?.definition).not.toMatch(/il più sicuro|most secure|the most secure/i);
      expect(parent?.details).toMatch(/802\.1X/);
      expect(parent?.details).not.toMatch(/WPA3-PSK/);
    }
  });

  it("covers client authentication, server identity, profiles, and key custody", () => {
    const italian = getDomainTopics(3, "it").flatMap((group) => group.subtopics);
    const english = getDomainTopics(3, "en").flatMap((group) => group.subtopics);
    for (const key of methods) {
      const it = italian.find((entry) => entry.checklistKey === key)!;
      const en = english.find((entry) => entry.checklistKey === key)!;
      expect(it.details).toMatch(/profilo|certificat|credenzial/i);
      expect(en.details).toMatch(/profile|certificate|credential/i);
      expect(it.examTip).toMatch(/MFA|fattore/i);
      expect(en.examTip).toMatch(/MFA|factor/i);
    }
    expect(italian.find((entry) => entry.checklistKey === "EAP-TLS")?.details).toMatch(/chiave privata/i);
    expect(english.find((entry) => entry.checklistKey === "EAP-TLS")?.details).toMatch(/private key/i);
  });

  it("compares the methods in objective 4.1 without a universal security ranking", () => {
    for (const lang of ["it", "en"] as const) {
      const comparison = getDomainGuide(4, lang).comparisons?.find((entry) => entry.title.includes(lang === "it" ? "Metodi EAP" : "EAP methods"));
      expect(comparison?.rows).toHaveLength(3);
      expect(comparison?.headers).toHaveLength(4);
      expect(JSON.stringify(comparison)).toMatch(/CA|certificate|certificat/i);
      expect(JSON.stringify(comparison)).not.toMatch(/WPA3-PSK|most secure|il più sicuro/i);
    }
  });
});
