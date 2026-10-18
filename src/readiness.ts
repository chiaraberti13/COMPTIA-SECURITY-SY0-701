/**
 * Exam readiness: how much of each domain and official objective the learner
 * has practised, and how well, from the progress already saved in the browser
 * (per-question attempts, correct answers and next review date).
 *
 * The two headline figures are kept apart on purpose. Accuracy says how well
 * the practised questions went; coverage says how much of the bank has been
 * seen. A high accuracy on a small coverage is not readiness, so the view
 * shows both and never merges them into one invented score.
 */
import { OFFICIAL_DOMAIN_WEIGHTS } from "./domainGuides";
import { domainOfQuestion } from "./localizedData";
import type { Question, QuestionProgress } from "./types";

/** Below this many answers an accuracy is too thin to call something weak. */
export const MIN_ATTEMPTS_FOR_SIGNAL = 3;

export interface AreaReadiness {
  /** Questions in the bank for this area. */
  total: number;
  /** Questions answered at least once. */
  seen: number;
  /** Answers given, counting repeats. */
  attempts: number;
  correct: number;
  /** Questions whose review is due now. */
  due: number;
  /** seen / total, 0-100. */
  coverage: number;
  /** correct / attempts, 0-100; null when nothing was answered. */
  accuracy: number | null;
}

export interface DomainReadiness extends AreaReadiness {
  domain: number;
  /** Official weight of the domain on the exam, in percent. */
  weight: number;
}

export interface ObjectiveReadiness extends AreaReadiness {
  code: string;
}

export interface Readiness {
  domains: DomainReadiness[];
  objectives: ObjectiveReadiness[];
  /** Accuracy of each practised domain, weighted by the official weights. */
  weightedAccuracy: number | null;
  /** Coverage of each domain, weighted by the official weights. */
  weightedCoverage: number;
  /** Practised objectives with enough answers, weakest first. */
  weakestObjectives: ObjectiveReadiness[];
  /** Objectives never practised, in syllabus order. */
  untouchedObjectives: string[];
  practisedQuestions: number;
  dueQuestions: number;
}

const percent = (part: number, whole: number) => (whole > 0 ? Math.round((part / whole) * 100) : 0);

/** How one objective went within a single finished simulation. */
export interface RunObjectiveResult {
  code: string;
  /** Questions of the run that train this objective. */
  total: number;
  correct: number;
  /** correct / total, 0-100. */
  accuracy: number;
}

/**
 * Per-objective breakdown of one finished run, for the post-session analysis:
 * how many of the run's questions trained each objective and how many were
 * answered correctly. A question that trains several objectives counts in each.
 * The result lists only the objectives the run actually touched, weakest first
 * (then by objective code), so the learner sees where this sitting went worst.
 */
export function summarizeRunByObjective(
  run: readonly { id: number; correct: boolean }[],
  questionsByObjective: ReadonlyMap<string, readonly number[]>,
): RunObjectiveResult[] {
  const objectivesOfId = new Map<number, string[]>();
  for (const [code, ids] of questionsByObjective) {
    for (const id of ids) {
      const list = objectivesOfId.get(id);
      if (list) list.push(code);
      else objectivesOfId.set(id, [code]);
    }
  }

  const tally = new Map<string, { total: number; correct: number }>();
  for (const { id, correct } of run) {
    for (const code of objectivesOfId.get(id) ?? []) {
      const entry = tally.get(code) ?? { total: 0, correct: 0 };
      entry.total += 1;
      if (correct) entry.correct += 1;
      tally.set(code, entry);
    }
  }

  return [...tally.entries()]
    .map(([code, { total, correct }]) => ({ code, total, correct, accuracy: percent(correct, total) }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total || a.code.localeCompare(b.code));
}

/** One official objective with questions due for spaced review. */
export interface ReviewObjective {
  code: string;
  /** Domain the objective belongs to (1-5). */
  domain: number;
  /** Questions of the objective whose review is due now. */
  due: number;
  /** Ids of those due questions, in within-objective review priority. */
  dueIds: number[];
  /** Answers given on the objective's questions, counting repeats. */
  attempts: number;
  correct: number;
  /** correct / attempts, 0-100; null when none answered. */
  accuracy: number | null;
}

/**
 * Spaced repetition lifted from the single question to the official objective:
 * the per-question queue (quiz.ts) already knows when each answer falls due; this
 * rolls those dates up so the learner can review a whole weak objective at once
 * and knows which sub-topics to re-read.
 *
 * An objective is due when at least one of its questions is due. The list is
 * ordered adaptively — weakest first (lowest accuracy), then the most questions
 * due, then the most overdue — so a short, targeted review lands where it helps
 * most. Only answered questions count toward accuracy: a never-seen objective is
 * not a weakness and is left out. `dueIds` keeps the same within-objective
 * priority as selectDueReviewQuestions (lowest accuracy and streak, then most
 * overdue), so a review run starts with the shakiest questions.
 */
export function selectReviewObjectives({
  questions,
  progress,
  questionsByObjective,
  now = Date.now(),
  limit = 5,
}: {
  questions: readonly Question[];
  progress: Record<number, QuestionProgress>;
  questionsByObjective: ReadonlyMap<string, readonly number[]>;
  now?: number;
  limit?: number;
}): ReviewObjective[] {
  const known = new Set(questions.map((q) => q.id));
  const result: (ReviewObjective & { earliestDue: number })[] = [];

  for (const [code, ids] of questionsByObjective) {
    let attempts = 0;
    let correct = 0;
    const dueEntries: { id: number; acc: number; streak: number; dueAt: number }[] = [];
    for (const id of ids) {
      if (!known.has(id)) continue;
      const item = progress[id];
      if (!item || item.attempts <= 0) continue;
      attempts += item.attempts;
      correct += item.correct;
      if (item.dueAt <= now) {
        dueEntries.push({ id, acc: item.correct / item.attempts, streak: item.streak, dueAt: item.dueAt });
      }
    }
    if (dueEntries.length === 0) continue;
    dueEntries.sort((a, b) => a.acc - b.acc || a.streak - b.streak || a.dueAt - b.dueAt || a.id - b.id);
    result.push({
      code,
      domain: Number(code[0]),
      due: dueEntries.length,
      dueIds: dueEntries.map((e) => e.id),
      attempts,
      correct,
      accuracy: attempts > 0 ? percent(correct, attempts) : null,
      earliestDue: Math.min(...dueEntries.map((e) => e.dueAt)),
    });
  }

  return result
    .sort((a, b) =>
      (a.accuracy ?? 0) - (b.accuracy ?? 0) ||
      b.due - a.due ||
      a.earliestDue - b.earliestDue ||
      a.code.localeCompare(b.code)
    )
    .slice(0, Math.max(0, limit))
    .map(({ earliestDue: _earliestDue, ...objective }) => objective);
}

function summarize(questions: readonly Question[], progress: Record<number, QuestionProgress>, now: number): AreaReadiness {
  let seen = 0, attempts = 0, correct = 0, due = 0;
  for (const question of questions) {
    const item = progress[question.id];
    if (!item || item.attempts <= 0) continue;
    seen += 1;
    attempts += item.attempts;
    correct += item.correct;
    if (item.dueAt <= now) due += 1;
  }
  return {
    total: questions.length,
    seen,
    attempts,
    correct,
    due,
    coverage: percent(seen, questions.length),
    accuracy: attempts > 0 ? percent(correct, attempts) : null,
  };
}

/** A weighted mean over the areas that have a value; null when none has. */
function weightedMean(items: { weight: number; value: number | null }[]): number | null {
  const counted = items.filter((i): i is { weight: number; value: number } => i.value !== null);
  const weights = counted.reduce((sum, i) => sum + i.weight, 0);
  return weights > 0 ? Math.round(counted.reduce((sum, i) => sum + i.weight * i.value, 0) / weights) : null;
}

export function computeReadiness({
  questions,
  progress,
  questionsByObjective,
  now = Date.now(),
  limit = 5,
}: {
  /** Every question of the bank, with the app ids used by `progress`. */
  questions: readonly Question[];
  progress: Record<number, QuestionProgress>;
  /** Question ids per official objective, in syllabus order. */
  questionsByObjective: ReadonlyMap<string, readonly number[]>;
  now?: number;
  limit?: number;
}): Readiness {
  const domains: DomainReadiness[] = OFFICIAL_DOMAIN_WEIGHTS.map((weight, index) => ({
    domain: index + 1,
    weight,
    ...summarize(questions.filter(q => domainOfQuestion(q.id) === index + 1), progress, now),
  }));

  const byId = new Map(questions.map(q => [q.id, q]));
  const objectives: ObjectiveReadiness[] = [...questionsByObjective.entries()].map(([code, ids]) => ({
    code,
    ...summarize(ids.map(id => byId.get(id)).filter((q): q is Question => q !== undefined), progress, now),
  }));

  const weakestObjectives = objectives
    .filter(o => o.attempts >= MIN_ATTEMPTS_FOR_SIGNAL)
    .sort((a, b) => (a.accuracy ?? 0) - (b.accuracy ?? 0) || b.due - a.due || b.attempts - a.attempts)
    .slice(0, Math.max(0, limit));

  const all = summarize(questions, progress, now);
  return {
    domains,
    objectives,
    weightedAccuracy: weightedMean(domains.map(d => ({ weight: d.weight, value: d.accuracy }))),
    weightedCoverage: weightedMean(domains.map(d => ({ weight: d.weight, value: d.coverage }))) ?? 0,
    weakestObjectives,
    untouchedObjectives: objectives.filter(o => o.seen === 0).map(o => o.code),
    practisedQuestions: all.seen,
    dueQuestions: all.due,
  };
}
