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
