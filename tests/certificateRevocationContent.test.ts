import { beforeAll, describe, expect, it } from "vitest";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymIndex, buildGlossaryIndex } from "../src/glossaryIndex";
import { DOMAIN_GUIDES_EN, DOMAIN_GUIDES_IT } from "../src/domainGuides";

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("certificate revocation and trust glossary", () => {
  for (const lang of ["it", "en"] as const) {
    it(`exposes standalone searchable CRL, OCSP, stapling, and self-signed entries in ${lang}`, () => {
      const topics = getDomainTopics(1, lang);
      const entries = topics.flatMap((group) => group.subtopics);
      const keys = [
        "CertificateRevocationCRL",
        "CertificateRevocationOCSP",
        "CertificateRevocationStapling",
        "SelfSignedCertificateTrust",
      ];
      for (const key of keys) expect(entries.some((entry) => entry.checklistKey === key)).toBe(true);

      const acronymIndex = buildAcronymIndex(entries);
      expect(acronymIndex.get("CRL")?.id).toBe("CertificateRevocationCRL");
      expect(acronymIndex.get("OCSP")?.id).toBe("CertificateRevocationOCSP");

      const glossary = buildGlossaryIndex(entries);
      expect(glossary.byName.has("ocsp stapling")).toBe(true);
      expect(glossary.byName.has(lang === "it" ? "certificato autofirmato" : "self-signed certificate")).toBe(true);
    });
  }

  it("links the glossary entries to the Domain 1 guide and objective 1.4", () => {
    for (const lang of ["it", "en"] as const) {
      const group = getDomainTopics(1, lang).find((item) =>
        item.subtopics.some((entry) => entry.checklistKey === "CertificateRevocationCRL")
      );
      expect(group?.description).toContain(lang === "it" ? "guida D1, obiettivo 1.4" : "Domain 1 guide, objective 1.4");
      const guide = lang === "it" ? DOMAIN_GUIDES_IT[1] : DOMAIN_GUIDES_EN[1];
      expect(guide.objectives.some((objective) => objective.code === "1.4")).toBe(true);
    }
  });

  it("teaches that OCSP good is only a revocation result, not full certificate validation", () => {
    const entries = getDomainTopics(1, "it").flatMap((group) => group.subtopics);
    const ocsp = entries.find((entry) => entry.checklistKey === "CertificateRevocationOCSP");
    expect(ocsp?.details).toContain("non dimostra da sola");
    expect(ocsp?.examTip).toContain("OCSP good non equivale");
  });

  it("distinguishes cryptographic self-signing from trust deployment in both languages", () => {
    for (const lang of ["it", "en"] as const) {
      const entries = getDomainTopics(1, lang).flatMap((group) => group.subtopics);
      const selfSigned = entries.find((entry) => entry.checklistKey === "SelfSignedCertificateTrust");
      expect(selfSigned?.details.toLowerCase()).toContain(lang === "it" ? "trust anchor" : "trust anchor");
      expect(selfSigned?.details.toLowerCase()).toContain(lang === "it" ? "ca interna" : "internal ca");
    }
  });
});
