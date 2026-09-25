import { describe, expect, it } from "vitest";
import { getDomainQuestions, questionUid, sourceQuestionId } from "../src/localizedData";
import { ALL_OBJECTIVES, OFFICIAL_OBJECTIVES, objectivesOfQuestion, questionIdsByObjective } from "../src/questionObjectives";
import * as data from "../src/data";

const DOMAINS = [1, 2, 3, 4, 5];
const ITALIAN = Object.fromEntries(DOMAINS.map((d) => [d, getDomainQuestions(d, "it")]));
const index = questionIdsByObjective(ITALIAN, sourceQuestionId);

describe("questions by objective", () => {
  it("lists all 28 official objectives in syllabus order", () => {
    expect(ALL_OBJECTIVES).toHaveLength(28);
    expect(ALL_OBJECTIVES[0]).toBe("1.1");
    expect(ALL_OBJECTIVES.at(-1)).toBe("5.6");
    expect([...index.keys()]).toEqual(ALL_OBJECTIVES);
  });

  it("gives every objective at least 10 questions to practise", () => {
    const thin = [...index].filter(([, ids]) => ids.length < 10).map(([code, ids]) => `${code}: ${ids.length}`);
    expect(thin).toEqual([]);
  });

  it("agrees with the source mapping used by the coverage matrix", () => {
    const banks: Record<number, { id: number; topic: string }[]> = {
      1: data.DOMAIN_1_QUESTIONS, 2: data.DOMAIN_2_QUESTIONS, 3: data.DOMAIN_3_QUESTIONS,
      4: data.DOMAIN_4_QUESTIONS, 5: data.DOMAIN_5_QUESTIONS,
    };
    for (const d of DOMAINS) {
      for (const q of banks[d]) {
        for (const code of objectivesOfQuestion(d, q)) expect(index.get(code)).toContain(questionUid(d, q.id));
      }
    }
  });

  it("uses app ids that exist in the English bank too, whose topics are translated", () => {
    const englishIds = new Set(DOMAINS.flatMap((d) => getDomainQuestions(d, "en").map((q) => q.id)));
    for (const ids of index.values()) for (const id of ids) expect(englishIds.has(id)).toBe(true);
    for (const d of DOMAINS) expect(OFFICIAL_OBJECTIVES[d].length).toBeGreaterThan(0);
  });
});
