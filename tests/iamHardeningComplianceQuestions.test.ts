import { beforeAll, describe, expect, it } from "vitest";
import { getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { objectivesOfQuestion } from "../src/questionObjectives";
import { sourcesOf } from "../src/contentReview";

beforeAll(async () => loadEnglishOverlay());

describe("Roadmap task 30 IAM, hardening, lifecycle, and compliance questions", () => {
  const idsByDomain = { 4: [9020, 9021, 9022, 9023, 9024, 9025], 5: [9020, 9021] } as const;

  for (const domain of [4, 5] as const) {
    it(`adds the required original Domain ${domain} scenarios in both languages`, () => {
      const ids = idsByDomain[domain];
      const italian = getDomainQuestions(domain, "it").filter((q) => ids.includes(sourceQuestionId(q.id) as never));
      const english = getDomainQuestions(domain, "en").filter((q) => ids.includes(sourceQuestionId(q.id) as never));
      expect(italian).toHaveLength(ids.length);
      expect(english).toHaveLength(ids.length);
      for (const q of italian) {
        const translated = english.find((item) => item.id === q.id);
        expect(q.scenario.length).toBeGreaterThan(100);
        expect(q.options).toHaveLength(4);
        expect(q.explanation.length).toBeGreaterThan(250);
        expect(q.answerIndex).toBeGreaterThanOrEqual(0);
        expect(q.answerIndex).toBeLessThan(4);
        expect(translated).toBeDefined();
        expect(translated?.scenario).not.toBe(q.scenario);
        expect(translated?.question).not.toBe(q.question);
        expect(translated?.explanation).not.toBe(q.explanation);
        expect(objectivesOfQuestion(domain, { ...q, id: sourceQuestionId(q.id) })).not.toHaveLength(0);
      }
    });
  }

  it("keeps authorization, elevation, lifecycle policy, and regulatory scope distinct", () => {
    const d4 = getDomainQuestions(4, "it").filter((q) => idsByDomain[4].includes(sourceQuestionId(q.id) as never)).map((q) => `${q.scenario} ${q.explanation}`).join(" ");
    const d5 = getDomainQuestions(5, "it").filter((q) => idsByDomain[5].includes(sourceQuestionId(q.id) as never)).map((q) => `${q.scenario} ${q.explanation}`).join(" ");
    expect(d4).toMatch(/OAuth 2\.0.*autorizzazione delegata/is);
    expect(d4).toMatch(/ID token.*access token/is);
    expect(d4).toMatch(/UAC.*non.*sandbox/is);
    expect(d4).toMatch(/Mandatory Access Control/i);
    expect(d4).toMatch(/DAC/);
    expect(d4).toMatch(/policy.*produttore/is);
    expect(d4).toMatch(/supporto esteso.*non garantisce/is);
    expect(d5).toMatch(/SOX.*GLBA/is);
    expect(d5).toMatch(/HIPAA.*PCI DSS/is);
    expect(d5).toMatch(/standard di settore.*non una legge/is);
  });

  it("links objective 5.4 to current primary SEC, FTC, HHS, and PCI SSC sources", () => {
    const sources = sourcesOf(["5.4"]);
    for (const publisher of ["SEC", "FTC", "HHS", "PCI SSC"]) {
      expect(sources.some((source) => source.publisher === publisher)).toBe(true);
    }
  });
});
