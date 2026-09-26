import { describe, expect, it } from "vitest";
import { OFFICIAL_DOMAIN_WEIGHTS } from "../src/domainGuides";
import { getDomainQuestions, sourceQuestionId } from "../src/localizedData";
import { questionIdsByObjective } from "../src/questionObjectives";
import { MIN_ATTEMPTS_FOR_SIGNAL, computeReadiness } from "../src/readiness";
import type { Question, QuestionProgress } from "../src/types";

const NOW = Date.UTC(2026, 8, 26);
const DAY = 24 * 60 * 60 * 1000;

const question = (domain: number, n: number) => ({ id: domain * 10000 + n }) as Question;
const answered = (attempts: number, correct: number, dueInDays = 1): QuestionProgress => ({
  attempts, correct, streak: 0, lastSeenAt: NOW, dueAt: NOW + dueInDays * DAY,
});

describe("computeReadiness", () => {
  const questions = [question(1, 1), question(1, 2), question(4, 1), question(4, 2), question(4, 3), question(4, 4)];
  const objectives = new Map([["1.1", [10001, 10002]], ["4.3", [40001, 40002]], ["4.6", [40003, 40004]]]);

  it("with no progress, reports no accuracy and every objective as untouched", () => {
    const r = computeReadiness({ questions, progress: {}, questionsByObjective: objectives, now: NOW });
    expect(r.weightedAccuracy).toBeNull();
    expect(r.weightedCoverage).toBe(0);
    expect(r.untouchedObjectives).toEqual(["1.1", "4.3", "4.6"]);
    expect(r.domains.map(d => d.weight)).toEqual([...OFFICIAL_DOMAIN_WEIGHTS]);
  });

  it("counts coverage per question and accuracy per answer, with due reviews", () => {
    const progress = { 10001: answered(2, 1), 40001: answered(4, 4, -1), 40002: answered(2, 0, 0) };
    const r = computeReadiness({ questions, progress, questionsByObjective: objectives, now: NOW });
    const d1 = r.domains[0], d4 = r.domains[3];
    expect(d1).toMatchObject({ total: 2, seen: 1, coverage: 50, accuracy: 50, due: 0 });
    expect(d4).toMatchObject({ total: 4, seen: 2, coverage: 50, accuracy: 67, due: 2 });
    expect(r.practisedQuestions).toBe(3);
    expect(r.dueQuestions).toBe(2);
  });

  it("weights accuracy and coverage with the official weights of the practised domains only", () => {
    const progress = { 10001: answered(1, 1), 40001: answered(1, 0) };
    const r = computeReadiness({ questions, progress, questionsByObjective: objectives, now: NOW });
    const [w1, , , w4] = OFFICIAL_DOMAIN_WEIGHTS;
    expect(r.weightedAccuracy).toBe(Math.round((w1 * 100 + w4 * 0) / (w1 + w4)));
    // Coverage counts every domain: unpractised ones pull it down.
    expect(r.weightedCoverage).toBe(Math.round((w1 * 50 + w4 * 25) / 100));
  });

  it(`calls an objective weak only after ${MIN_ATTEMPTS_FOR_SIGNAL} answers, weakest first`, () => {
    const progress = { 10001: answered(1, 0), 40001: answered(3, 1), 40003: answered(4, 3) };
    const r = computeReadiness({ questions, progress, questionsByObjective: objectives, now: NOW });
    expect(r.weakestObjectives.map(o => o.code)).toEqual(["4.3", "4.6"]);
    expect(r.untouchedObjectives).toEqual([]);
  });

  it("covers all 28 official objectives of the real bank, each with questions", () => {
    const banks = Object.fromEntries([1, 2, 3, 4, 5].map(d => [d, getDomainQuestions(d, "it")]));
    const all = Object.values(banks).flat();
    const r = computeReadiness({ questions: all, progress: {}, questionsByObjective: questionIdsByObjective(banks, sourceQuestionId), now: NOW });
    expect(r.objectives).toHaveLength(28);
    expect(r.objectives.every(o => o.total >= 10)).toBe(true);
    expect(r.domains.reduce((sum, d) => sum + d.total, 0)).toBe(all.length);
  });
});
