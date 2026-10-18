import { beforeAll, describe, expect, it } from "vitest";
import { getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { objectivesOfQuestion } from "../src/questionObjectives";
import { correctIndexes } from "../src/quiz";

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("physical sensor and non-human vector practice questions", () => {
  it("adds four original, answerable, bilingual questions to the study bank", () => {
    const additions = [
      ...getDomainQuestions(1, "it").filter((q) => [9001, 9002].includes(sourceQuestionId(q.id))),
      ...getDomainQuestions(2, "it").filter((q) => [9003, 9004].includes(sourceQuestionId(q.id))),
    ];
    expect(additions).toHaveLength(4);

    for (const q of additions) {
      expect(q.scenario.length).toBeGreaterThan(30);
      expect(q.options).toHaveLength(4);
      expect(q.explanation.length).toBeGreaterThan(100);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(q.options.length);
      expect(correctIndexes(q)).toContain(q.answerIndex);
      expect(objectivesOfQuestion(Math.floor(q.id / 10000), { ...q, id: sourceQuestionId(q.id) })).not.toHaveLength(0);

      const domain = Math.floor(q.id / 10000);
      const en = getDomainQuestions(domain, "en").find((item) => item.id === q.id);
      expect(en).toBeDefined();
      expect(en?.question).not.toBe(q.question);
      expect(en?.options).not.toEqual(q.options);
    }
  });

  it("maps the sensor questions to objective 1.2 and the vector questions to 2.2", () => {
    const physical = getDomainQuestions(1, "it").filter((q) => [9001, 9002].includes(sourceQuestionId(q.id)));
    const vectors = getDomainQuestions(2, "it").filter((q) => [9003, 9004].includes(sourceQuestionId(q.id)));
    expect(physical.every((q) => objectivesOfQuestion(1, { ...q, id: sourceQuestionId(q.id) }).includes("1.2"))).toBe(true);
    expect(vectors.every((q) => objectivesOfQuestion(2, { ...q, id: sourceQuestionId(q.id) }).includes("2.2"))).toBe(true);
  });
});
