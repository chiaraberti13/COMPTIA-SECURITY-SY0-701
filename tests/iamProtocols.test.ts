import { beforeAll, describe, expect, it } from "vitest";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { getDomainGuide } from "../src/domainGuides";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { buildAcronymDeck } from "../src/flashcards";
import { CONCEPT_CITATIONS } from "../src/citations";

const keys = ["SingleSignOn", "SAML", "OAuth2", "OpenIDConnect", "Kerberos"];

describe("IAM protocols and token boundaries", () => {
  beforeAll(async () => { await loadEnglishOverlay(); });

  for (const lang of ["it", "en"] as const) {
    it(`provides searchable concepts, sources and accurate flashcards in ${lang}`, () => {
      const groups = getDomainTopics(1, lang);
      const topics = groups.flatMap(group => group.subtopics);
      for (const key of keys) {
        const entry = topics.find(topic => topic.checklistKey === key)!;
        expect(entry, key).toBeDefined();
        expect(entry.definition.length).toBeGreaterThan(40);
        expect(entry.details).toContain("Kestrelia");
        expect(CONCEPT_CITATIONS[`1:${key}`]).toBeDefined();
      }
      const index = buildGlossaryIndex(topics);
      for (const [query, key] of [["SSO", "SingleSignOn"], ["SAML", "SAML"], ["OAuth 2.0", "OAuth2"], ["OIDC", "OpenIDConnect"], ["OpenID Connect", "OpenIDConnect"]]) {
        expect(findGlossaryTerms([query], index).map(hint => hint.id)).toContain(key);
      }
      const deck = buildAcronymDeck({ 1: groups });
      for (const [acronym, expansion] of [["SSO", "Single Sign-On"], ["SAML", "Security Assertion Markup Language"], ["OIDC", "OpenID Connect"]]) {
        expect(deck.find(card => card.acronym === acronym)?.expansion).toBe(expansion);
      }
      expect(deck.some(card => card.conceptKey === "OAuth2" || card.conceptKey === "Kerberos")).toBe(false);
    });

    it(`distinguishes evidence, purposes and original scenarios in ${lang}`, () => {
      const topics = getDomainTopics(1, lang).flatMap(group => group.subtopics);
      const oauth = topics.find(topic => topic.checklistKey === "OAuth2")!;
      const oidc = topics.find(topic => topic.checklistKey === "OpenIDConnect")!;
      const kerberos = topics.find(topic => topic.checklistKey === "Kerberos")!;
      expect(oauth.details).toMatch(/opaco|opaque/);
      expect(oauth.examTip).toMatch(/non un protocollo di autenticazione|not an authentication protocol/);
      expect(oidc.details).toContain("ID token JWT");
      expect(oidc.examTip).toContain("access token");
      expect(kerberos.details).toContain("Ticket Granting Ticket (TGT)");
      expect(kerberos.details).toContain("service ticket");
      const guide = getDomainGuide(4, lang);
      expect(guide.comparisons?.find(comparison => comparison.title.includes("IAM protocols") || comparison.title.includes("protocolli IAM"))?.rows).toHaveLength(5);
      expect(JSON.stringify(guide)).toContain(lang === "it" ? "Identità o accesso ai dati?" : "Identity or data access?");
    });
  }
});
