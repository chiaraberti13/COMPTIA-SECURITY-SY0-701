import { describe, expect, it } from "vitest";
import { assembleExam, availableExamPbqs, examAnswerComplete, examReport, type ExamAnswers, type ExamItem } from "../src/exam";
import { getDomainQuestions } from "../src/localizedData";
import { PBQ_SCENARIOS } from "../src/pbqData";
import { questionIdsByObjective } from "../src/questionObjectives";
import { sourceQuestionId } from "../src/localizedData";
import { correctIndexes, examBlueprint } from "../src/quiz";

const bank = Object.fromEntries([1, 2, 3, 4, 5].map(d => [d, getDomainQuestions(d, "it")]));
const objectives = questionIdsByObjective(bank, sourceQuestionId);
const counts = { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2 };
function right(item: ExamItem): ExamAnswers[string] {
  if (item.kind === "question") return { kind: "question", selected: correctIndexes(item.question) };
  return { kind: "pbq", response: item.pbq.mechanic === "ordering"
    ? { order: item.pbq.steps.map(s => s.id) }
    : { matches: Object.fromEntries(item.pbq.prompts.map(p => [p.id, p.correctOptionId])) } };
}

describe("configurable mixed exams", () => {
  it.each([0, 2, 8])("draws %i PBQs without changing domain counts or duplicating items", (n) => {
    for (let i = 0; i < 10; i++) {
      const items = assembleExam(counts, n, bank, PBQ_SCENARIOS, objectives);
      expect(items).toHaveLength(10);
      expect(new Set(items.map(i => i.key)).size).toBe(10);
      expect(items.filter(i => i.kind === "pbq")).toHaveLength(n);
      for (const d of [1, 2, 3, 4, 5]) expect(items.filter(i => i.domain === d)).toHaveLength(2);
      expect(items.slice(0, n).every(i => i.kind === "pbq")).toBe(true);
      expect(items.every(i => i.objectives.length > 0)).toBe(true);
    }
  });
  it("preserves the official blueprint at the 90-item maximum", () => {
    const weights = { 1: 12, 2: 22, 3: 18, 4: 28, 5: 20 };
    const split = examBlueprint(weights, Object.fromEntries([1, 2, 3, 4, 5].map(d => [d, bank[d].length])), 90);
    const items = assembleExam(split, 10, bank, PBQ_SCENARIOS, objectives);
    expect(items).toHaveLength(90);
    for (const d of [1, 2, 3, 4, 5]) expect(items.filter(i => i.domain === d)).toHaveLength(split[d]);
  });
  it("limits PBQs to the selected domains and slots", () => {
    expect(availableExamPbqs({ 1: 0, 2: 0, 3: 1, 4: 0, 5: 0 }, PBQ_SCENARIOS)).toBe(1);
    const run = assembleExam({ 1: 0, 2: 0, 3: 1, 4: 0, 5: 0 }, 1, bank, PBQ_SCENARIOS, objectives);
    expect(run[0]).toMatchObject({ kind: "pbq", domain: 3 });
  });
  it.each([
    [{ ...counts, 1: -1 }, 0], [{ ...counts, 1: 0.5 }, 0], [{ ...counts, 1: NaN }, 0],
    [{ ...counts, 1: 9999 }, 0], [{ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, 0],
    [{ ...counts, 1: 90 }, 0], [counts, availableExamPbqs(counts, PBQ_SCENARIOS) + 1], [counts, -1], [counts, 0.5],
  ])("rejects impossible configurations %j / %i", (split, n) => {
    expect(() => assembleExam(split, n, bank, PBQ_SCENARIOS, objectives)).toThrow();
  });
  it("grades MCQ and PBQ together and includes all objectives, including PBQ-only runs", () => {
    const items = assembleExam(counts, 8, bank, PBQ_SCENARIOS, objectives);
    const answers = Object.fromEntries(items.map(item => [item.key, right(item)]));
    const report = examReport(items, answers);
    expect(report).toMatchObject({ score: 10, total: 10, unanswered: 0 });
    expect(report.objectives.every(o => o.accuracy === 100)).toBe(true);
    expect(report.domains.every(d => d.total === 2 && d.correct === 2)).toBe(true);
  });
  it("counts missing and partial responses as incorrect, but exposes PBQ part diagnostics separately", () => {
    const items = assembleExam(counts, 8, bank, PBQ_SCENARIOS, objectives);
    expect(examReport(items, {})).toMatchObject({ score: 0, total: 10, unanswered: 10 });
    const item = items.find(i => i.kind === "pbq" && i.pbq.mechanic === "matching")!;
    expect(examAnswerComplete(item, { kind: "question", selected: [0] })).toBe(false);
    if (item.kind !== "pbq" || item.pbq.mechanic !== "matching") throw new Error("fixture");
    const p = item.pbq.prompts[0];
    expect(examReport([item], { [item.key]: { kind: "pbq", response: { matches: { [p.id]: p.correctOptionId } } } })).toMatchObject({ score: 0, unanswered: 1 });
  });
});
