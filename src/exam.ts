/** Original practice exam assembly and diagnostics; no official scaled scoring. */
import type { Pbq, PbqResponse } from "./pbq";
import { gradePbq, isResponseComplete } from "./pbq";
import { isSelectionComplete, isSelectionCorrect, shuffle } from "./quiz";
import type { Question } from "./types";

export type ExamItem =
  | { kind: "question"; key: string; domain: number; objectives: readonly string[]; question: Question }
  | { kind: "pbq"; key: string; domain: number; objectives: readonly string[]; pbq: Pbq };
export type ExamAnswer = { kind: "question"; selected: number[] } | { kind: "pbq"; response: PbqResponse };
export type ExamAnswers = Record<string, ExamAnswer>;
export interface ExamMetric { code: string; correct: number; total: number; accuracy: number }

/** PBQs replace MCQs within each selected domain: total and distribution never drift. */
export function availableExamPbqs(counts: Record<number, number>, scenarios: readonly Pbq[]): number {
  return [1, 2, 3, 4, 5].reduce((n, d) => n + Math.min(counts[d] ?? 0, scenarios.filter(p => p.domain === d).length), 0);
}

export function assembleExam(
  counts: Record<number, number>, pbqCount: number,
  bank: Record<number, Question[]>, scenarios: readonly Pbq[],
  objectives: ReadonlyMap<string, readonly number[]>,
): ExamItem[] {
  for (const d of [1, 2, 3, 4, 5]) {
    if (!Number.isInteger(counts[d]) || counts[d] < 0 || counts[d] > (bank[d]?.length ?? 0)) throw new Error("Invalid domain count");
  }
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  if (total < 1 || total > 90 || !Number.isInteger(pbqCount) || pbqCount < 0 || pbqCount > availableExamPbqs(counts, scenarios)) throw new Error("Invalid exam size");
  const remaining = { ...counts };
  const pbqs: ExamItem[] = [];
  for (const p of shuffle([...scenarios])) {
    if (pbqs.length === pbqCount) break;
    if (remaining[p.domain] > 0) {
      pbqs.push({ kind: "pbq", key: `pbq:${p.id}`, domain: p.domain, objectives: [p.objective], pbq: p });
      remaining[p.domain]--;
    }
  }
  const questions = [1, 2, 3, 4, 5].flatMap(d => shuffle(bank[d]).slice(0, remaining[d]).map(q => ({
    kind: "question" as const, key: `question:${q.id}`, domain: d,
    objectives: [...objectives].filter(([, ids]) => ids.includes(q.id)).map(([code]) => code), question: q,
  })));
  return [...pbqs, ...shuffle(questions)];
}

export function examAnswerComplete(item: ExamItem, answer: ExamAnswer | undefined): boolean {
  if (item.kind === "question") return answer?.kind === "question" && isSelectionComplete(item.question, answer.selected);
  return answer?.kind === "pbq" && isResponseComplete(item.pbq, answer.response);
}

export function examAnswerCorrect(item: ExamItem, answer: ExamAnswer | undefined): boolean {
  if (!examAnswerComplete(item, answer)) return false;
  if (item.kind === "question") return answer?.kind === "question" && isSelectionCorrect(item.question, answer.selected);
  return answer?.kind === "pbq" && gradePbq(item.pbq, answer.response).passed;
}

/** A fully correct task earns one practice point. Partial PBQ items are diagnostic only. */
export function examReport(items: readonly ExamItem[], answers: ExamAnswers) {
  const domains = new Map<string, ExamMetric>();
  const objectives = new Map<string, ExamMetric>();
  let score = 0;
  let unanswered = 0;
  for (const item of items) {
    const correct = Number(examAnswerCorrect(item, answers[item.key]));
    score += correct;
    if (!examAnswerComplete(item, answers[item.key])) unanswered++;
    for (const [map, codes] of [[domains, [String(item.domain)]], [objectives, item.objectives]] as const) {
      for (const code of codes) {
        const m = map.get(code) ?? { code, correct: 0, total: 0, accuracy: 0 };
        m.correct += correct;
        m.total++;
        m.accuracy = Math.round(m.correct / m.total * 100);
        map.set(code, m);
      }
    }
  }
  return { score, total: items.length, unanswered,
    domains: [...domains.values()].sort((a, b) => a.code.localeCompare(b.code)),
    objectives: [...objectives.values()].sort((a, b) => a.accuracy - b.accuracy || a.code.localeCompare(b.code)),
  };
}
