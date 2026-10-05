import { describe, expect, it } from "vitest";
import { OFFICIAL_DOMAIN_WEIGHTS } from "../src/domainGuides";
import { getDomainQuestions, sourceQuestionId } from "../src/localizedData";
import { questionIdsByObjective } from "../src/questionObjectives";
import { MIN_ATTEMPTS_FOR_SIGNAL, computeReadiness, selectReviewObjectives, summarizeRunByObjective } from "../src/readiness";
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

describe("summarizeRunByObjective", () => {
  // Id 3 trains both 1.1 and 4.6, so it is counted in each.
  const byObjective = new Map<string, readonly number[]>([
    ["1.1", [1, 2, 3]],
    ["2.1", [4]],
    ["4.6", [3, 5, 6]],
    ["5.1", [99]], // not in the run
  ]);
  const run = [
    { id: 1, correct: true },
    { id: 2, correct: false },
    { id: 3, correct: true },
    { id: 4, correct: false },
    { id: 5, correct: true },
    { id: 6, correct: false },
  ];

  it("tallies each touched objective, counting multi-objective questions in each, weakest first", () => {
    const result = summarizeRunByObjective(run, byObjective);
    expect(result).toEqual([
      { code: "2.1", total: 1, correct: 0, accuracy: 0 },
      { code: "1.1", total: 3, correct: 2, accuracy: 67 },
      { code: "4.6", total: 3, correct: 2, accuracy: 67 },
    ]);
  });

  it("omits objectives the run never touched and returns nothing for an empty run", () => {
    expect(summarizeRunByObjective(run, byObjective).some(o => o.code === "5.1")).toBe(false);
    expect(summarizeRunByObjective([], byObjective)).toEqual([]);
  });

  it("ignores a run question that belongs to no objective", () => {
    const result = summarizeRunByObjective([{ id: 777, correct: true }], byObjective);
    expect(result).toEqual([]);
  });
});

describe("selectReviewObjectives", () => {
  const questions = [question(1, 1), question(1, 2), question(4, 1), question(4, 2), question(4, 3), question(4, 4)];
  const objectives = new Map<string, readonly number[]>([
    ["1.1", [10001, 10002]],
    ["4.3", [40001, 40002]],
    ["4.6", [40003, 40004]],
  ]);

  it("returns only objectives with a question due now", () => {
    // 1.1 due (-1 day), 4.3 not due (+5 days), 4.6 untouched.
    const progress = { 10001: answered(2, 1, -1), 40001: answered(2, 2, 5) };
    const r = selectReviewObjectives({ questions, progress, questionsByObjective: objectives, now: NOW });
    expect(r.map(o => o.code)).toEqual(["1.1"]);
    expect(r[0]).toMatchObject({ domain: 1, due: 1, dueIds: [10001], attempts: 2, correct: 1, accuracy: 50 });
  });

  it("orders due objectives by accuracy, then by how many are due, weakest first", () => {
    const progress = {
      10001: answered(4, 3, -1), // 1.1: 75%
      40001: answered(4, 1, -1), // 4.3: 25%, one due
      40002: answered(4, 1, -2), // 4.3: another due -> two due, 25% overall
      40003: answered(2, 1, -1), // 4.6: 50%
    };
    const r = selectReviewObjectives({ questions, progress, questionsByObjective: objectives, now: NOW });
    expect(r.map(o => o.code)).toEqual(["4.3", "4.6", "1.1"]);
    expect(r.find(o => o.code === "4.3")).toMatchObject({ due: 2, accuracy: 25 });
  });

  it("lists a due objective's questions weakest and most overdue first", () => {
    const progress = {
      40001: answered(4, 3, -1), // 75%, due yesterday
      40002: answered(4, 1, -5), // 25%, due five days ago
    };
    const r = selectReviewObjectives({ questions, progress, questionsByObjective: objectives, now: NOW });
    // The shakier question (lower accuracy) leads, regardless of due date.
    expect(r[0].dueIds).toEqual([40002, 40001]);
  });

  it("ignores unknown ids and never-answered questions, and caps the list", () => {
    const many = new Map<string, readonly number[]>(
      Array.from({ length: 8 }, (_, i) => [`4.${i + 1}`, [40000 + i]] as const)
    );
    const manyQuestions = Array.from({ length: 8 }, (_, i) => question(4, i));
    const progress = Object.fromEntries(manyQuestions.map(q => [q.id, answered(1, 0, -1)]));
    progress[99999] = answered(1, 0, -1); // not in the bank
    const r = selectReviewObjectives({ questions: manyQuestions, progress, questionsByObjective: many, now: NOW, limit: 5 });
    expect(r).toHaveLength(5);
    expect(r.every(o => o.dueIds.every(id => id !== 99999))).toBe(true);
  });

  it("returns nothing when no question is due", () => {
    const progress = { 10001: answered(3, 2, 3), 40001: answered(2, 2, 10) };
    expect(selectReviewObjectives({ questions, progress, questionsByObjective: objectives, now: NOW })).toEqual([]);
  });
});
