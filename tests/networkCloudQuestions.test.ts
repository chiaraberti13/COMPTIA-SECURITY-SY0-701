import { beforeAll, describe, expect, it } from "vitest";
import { getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { objectivesOfQuestion } from "../src/questionObjectives";

beforeAll(async () => loadEnglishOverlay());

describe("Roadmap task 29 network, cloud, and authentication questions", () => {
  const ids = [9015, 9016, 9017, 9018];

  it.each([3, 4])("adds four original applied questions to Domain %i in both languages", (domain) => {
    const italian = getDomainQuestions(domain, "it").filter((q) => ids.includes(sourceQuestionId(q.id)));
    const english = getDomainQuestions(domain, "en").filter((q) => ids.includes(sourceQuestionId(q.id)));
    expect(italian).toHaveLength(4);
    expect(english).toHaveLength(4);
    for (const q of italian) {
      const translated = english.find((item) => item.id === q.id);
      expect(q.scenario.length).toBeGreaterThan(80);
      expect(q.options).toHaveLength(4);
      expect(q.explanation.length).toBeGreaterThan(200);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(4);
      expect(translated).toBeDefined();
      expect(translated?.scenario).not.toBe(q.scenario);
      expect(translated?.question).not.toBe(q.question);
      expect(translated?.explanation).not.toBe(q.explanation);
      expect(objectivesOfQuestion(domain, { ...q, id: sourceQuestionId(q.id) })).toContain(domain === 3 ? "3.2" : "4.1");
    }
  });

  it("tests PMF limits, Wi-Fi suites, server validation, TLS trust boundaries, and cloud roles", () => {
    const d3 = getDomainQuestions(3, "it").filter((q) => ids.includes(sourceQuestionId(q.id))).map((q) => `${q.scenario} ${q.explanation}`).join(" ");
    const d4 = getDomainQuestions(4, "it").filter((q) => ids.includes(sourceQuestionId(q.id))).map((q) => `${q.scenario} ${q.explanation}`).join(" ");
    expect(d3).toMatch(/ri-cifr|seconda sessione TLS/i);
    expect(d3).toMatch(/SD-WAN/);
    expect(d3).toMatch(/CASB/);
    expect(d3).toMatch(/SWG/);
    expect(d3).toMatch(/SASE/);
    expect(d4).toMatch(/PMF/);
    expect(d4).toMatch(/jamming/i);
    expect(d4).toMatch(/192 bit/);
    expect(d4).toMatch(/CA attendibile|identità attesa/i);
    expect(d4).toMatch(/PEAP/);
    expect(d4).toMatch(/EAP-TLS/);
  });
});
