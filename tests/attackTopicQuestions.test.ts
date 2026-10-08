import { beforeAll, describe, expect, it } from "vitest";
import { getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { objectivesOfQuestion } from "../src/questionObjectives";

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("Roadmap task 28 attack concept questions", () => {
  it("provides one original scenario question for each of the eight listed themes in both languages", () => {
    const domain1Ids = [9005, 9006, 9007];
    const domain2Ids = [9010, 9011, 9012, 9013, 9014];
    const italian = [
      ...getDomainQuestions(1, "it").filter((q) => domain1Ids.includes(sourceQuestionId(q.id))),
      ...getDomainQuestions(2, "it").filter((q) => domain2Ids.includes(sourceQuestionId(q.id))),
    ];
    expect(italian).toHaveLength(8);

    for (const q of italian) {
      expect(q.scenario.length).toBeGreaterThan(30);
      expect(q.options).toHaveLength(4);
      expect(q.answerIndex).toBeGreaterThanOrEqual(0);
      expect(q.answerIndex).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(100);
      const domain = Math.floor(q.id / 10000);
      const sourceId = sourceQuestionId(q.id);
      expect(objectivesOfQuestion(domain, { ...q, id: sourceId })).not.toHaveLength(0);

      const english = getDomainQuestions(domain, "en").find((item) => item.id === q.id);
      expect(english).toBeDefined();
      expect(english?.question).not.toBe(q.question);
      expect(english?.options).not.toEqual(q.options);
    }
  });

  it("links the questions to the intended official objectives", () => {
    const expected = new Map<number, [number, string]>([
      [9005, [1, "1.4"]], [9006, [1, "1.2"]], [9007, [1, "1.4"]],
      [9010, [2, "2.3"]], [9011, [2, "2.3"]], [9012, [2, "2.2"]],
      [9013, [2, "2.2"]], [9014, [2, "2.2"]],
    ]);
    for (const [id, [domain, objective]] of expected) {
      const q = getDomainQuestions(domain, "it").find((item) => sourceQuestionId(item.id) === id);
      expect(q).toBeDefined();
      expect(objectivesOfQuestion(domain, { ...q!, id })).toContain(objective);
    }
  });
});
