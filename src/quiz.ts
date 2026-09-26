import type { Question, QuestionProgress, QuizResult } from "./types";

/** Passing threshold for the exam simulator, as a fraction of the total. */
export const PASS_RATIO = 0.8;

/**
 * Seconds allotted per question when the exam timer is enabled: the pace of the
 * real SY0-701 exam, 90 minutes for at most 90 questions.
 */
export const SECONDS_PER_QUESTION = 60;

/** How many past runs to keep in the local history. */
export const HISTORY_LIMIT = 20;

const DAY_MS = 24 * 60 * 60 * 1000;
const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

export interface WeakTopicSummary {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number;
  due: number;
}

/**
 * localStorage is user-controlled and survives application upgrades.  Keep
 * malformed or legacy values from reaching rendering and review arithmetic.
 */
export function sanitizeQuizHistory(value: unknown): QuizResult[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((entry): entry is QuizResult => {
      if (!entry || typeof entry !== "object") return false;
      const item = entry as Partial<QuizResult>;
      return (
        Number.isFinite(item.at) && Number(item.at) > 0 &&
        Number.isInteger(item.score) && Number(item.score) >= 0 &&
        Number.isInteger(item.total) && Number(item.total) > 0 &&
        Number(item.score) <= Number(item.total) &&
        Array.isArray(item.domains) &&
        item.domains.every(domain => Number.isInteger(domain) && domain >= 1 && domain <= 5) &&
        typeof item.passed === "boolean"
      );
    })
    .slice(0, HISTORY_LIMIT);
}

export function sanitizeQuestionProgress(value: unknown): Record<number, QuestionProgress> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const safe: Record<number, QuestionProgress> = {};
  for (const [rawId, rawProgress] of Object.entries(value)) {
    const id = Number(rawId);
    if (!Number.isSafeInteger(id) || id <= 0 || !rawProgress || typeof rawProgress !== "object") {
      continue;
    }

    const item = rawProgress as Partial<QuestionProgress>;
    if (
      !Number.isInteger(item.attempts) || Number(item.attempts) <= 0 ||
      !Number.isInteger(item.correct) || Number(item.correct) < 0 ||
      Number(item.correct) > Number(item.attempts) ||
      !Number.isInteger(item.streak) || Number(item.streak) < 0 ||
      Number(item.streak) > Number(item.attempts) ||
      !Number.isFinite(item.lastSeenAt) || Number(item.lastSeenAt) <= 0 ||
      !Number.isFinite(item.dueAt) || Number(item.dueAt) <= 0
    ) continue;

    safe[id] = {
      attempts: Number(item.attempts),
      correct: Number(item.correct),
      streak: Number(item.streak),
      lastSeenAt: Number(item.lastSeenAt),
      dueAt: Number(item.dueAt),
    };
  }
  return safe;
}

/** Formats a number of seconds as mm:ss, clamped at zero. */
export function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/**
 * Fisher-Yates shuffle.
 *
 * `[...arr].sort(() => Math.random() - 0.5)` is the tempting one-liner, but
 * `Array.prototype.sort` assumes a consistent, transitive comparator. A random
 * one is neither, so the result is not a uniform permutation: elements stay
 * close to where they started and an exam simulator keeps asking the same
 * questions.
 */
export function shuffle<T>(arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Whether a score clears the passing threshold for a run of `total` questions. */
export function hasPassedRun(score: number, total: number): boolean {
  return total > 0 && score >= total * PASS_RATIO;
}

/** Score as a rounded percentage; 0 for an empty run. */
export function scorePercent(score: number, total: number): number {
  return total > 0 ? Math.round((score / total) * 100) : 0;
}

/** Prepends a run to the history, keeping it capped at HISTORY_LIMIT entries. */
export function appendHistory(history: QuizResult[], entry: QuizResult): QuizResult[] {
  return [entry, ...history].slice(0, HISTORY_LIMIT);
}

/** Ids of questions in `questions` that have no entry in `answers`. */
export function unansweredIds(
  questions: readonly Question[],
  answers: Record<number, number[]>
): number[] {
  return questions.filter((q) => !(q.id in answers)).map((q) => q.id);
}

/* ------------------------------------------------------------------ *
 * Answers
 *
 * A question is single-answer or multi-response ("choose TWO"), and the
 * difference lives entirely in the data: `answerIndexes` present means
 * multi-response. The helpers below collapse both shapes to one list so
 * the UI never has to branch on which field a question happens to use.
 * ------------------------------------------------------------------ */

/** Every correct option index, ascending, for single- and multi-response alike. */
export function correctIndexes(question: Question): number[] {
  const many = question.answerIndexes;
  if (many && many.length > 0) return [...new Set(many)].sort((a, b) => a - b);
  return [question.answerIndex];
}

/** How many options the learner must pick before the answer can be confirmed. */
export function requiredSelections(question: Question): number {
  return correctIndexes(question).length;
}

/** Whether the question expects more than one option. */
export function isMultiResponse(question: Question): boolean {
  return requiredSelections(question) > 1;
}

/**
 * Applies a click on `index` to the current selection.
 *
 * Single-answer questions replace the selection, which keeps the familiar
 * radio-button feel. Multi-response ones toggle, and once the required
 * number of options is picked a further click on a new option is ignored:
 * refusing the extra pick is clearer than silently dropping an earlier
 * choice the learner still believes is selected.
 */
export function toggleSelection(
  question: Question,
  selection: readonly number[],
  index: number
): number[] {
  if (!isMultiResponse(question)) return [index];
  if (selection.includes(index)) return selection.filter((i) => i !== index);
  if (selection.length >= requiredSelections(question)) return [...selection];
  return [...selection, index].sort((a, b) => a - b);
}

/** Whether enough options are selected for the answer to be confirmed. */
export function isSelectionComplete(
  question: Question,
  selection: readonly number[]
): boolean {
  return selection.length === requiredSelections(question);
}

/**
 * Whether the selection is exactly the correct set.
 *
 * Multi-response questions are scored all-or-nothing, as CompTIA scores
 * them: picking one of two correct options earns nothing.
 */
export function isSelectionCorrect(
  question: Question,
  selection: readonly number[]
): boolean {
  const correct = correctIndexes(question);
  if (selection.length !== correct.length) return false;
  const picked = new Set(selection);
  return correct.every((i) => picked.has(i));
}

/**
 * Updates per-question mastery after a completed run. Incorrect and unanswered
 * questions become due immediately; consecutive correct answers progressively
 * move the next review from one day up to one month away.
 */
export function updateQuestionProgress(
  progress: Record<number, QuestionProgress>,
  questions: readonly Question[],
  answers: Record<number, number[]>,
  now = Date.now()
): Record<number, QuestionProgress> {
  const next = { ...progress };

  for (const question of questions) {
    const previous = progress[question.id];
    const selection = answers[question.id];
    const correct = selection !== undefined && isSelectionCorrect(question, selection);
    const streak = correct ? (previous?.streak ?? 0) + 1 : 0;
    const intervalIndex = Math.min(Math.max(streak - 1, 0), REVIEW_INTERVAL_DAYS.length - 1);

    next[question.id] = {
      attempts: (previous?.attempts ?? 0) + 1,
      correct: (previous?.correct ?? 0) + (correct ? 1 : 0),
      streak,
      lastSeenAt: now,
      dueAt: correct ? now + REVIEW_INTERVAL_DAYS[intervalIndex] * DAY_MS : now,
    };
  }

  return next;
}

/**
 * Returns due questions in learning priority: lower accuracy and shorter
 * correct streaks first, then how overdue they are. Unknown/deleted ids are
 * ignored.
 */
export function selectDueReviewQuestions(
  questions: readonly Question[],
  progress: Record<number, QuestionProgress>,
  now = Date.now(),
  limit = 20
): Question[] {
  return questions
    .filter(question => {
      const item = progress[question.id];
      return item && item.attempts > 0 && item.dueAt <= now;
    })
    .sort((a, b) => {
      const left = progress[a.id];
      const right = progress[b.id];
      return (
        left.correct / left.attempts - right.correct / right.attempts ||
        left.streak - right.streak ||
        left.dueAt - right.dueAt ||
        a.id - b.id
      );
    })
    .slice(0, Math.max(0, limit));
}

/**
 * Aggregates question-level mastery into learner-facing topic signals.
 * Only attempted questions participate: an untouched topic is unknown, not a
 * weakness. Lower accuracy wins; more evidence and more due questions break
 * ties so one accidental miss does not outrank a repeatedly weak concept.
 */
export function summarizeWeakTopics(
  questions: readonly Question[],
  progress: Record<number, QuestionProgress>,
  now = Date.now(),
  limit = 5
): WeakTopicSummary[] {
  const topics = new Map<string, Omit<WeakTopicSummary, "topic" | "accuracy">>();

  for (const question of questions) {
    const item = progress[question.id];
    if (!item || item.attempts <= 0) continue;
    const current = topics.get(question.topic) ?? { attempts: 0, correct: 0, due: 0 };
    current.attempts += item.attempts;
    current.correct += item.correct;
    current.due += item.dueAt <= now ? 1 : 0;
    topics.set(question.topic, current);
  }

  return [...topics.entries()]
    .map(([topic, item]) => ({
      topic,
      ...item,
      accuracy: Math.round((item.correct / item.attempts) * 100),
    }))
    .sort((a, b) =>
      a.accuracy - b.accuracy ||
      b.attempts - a.attempts ||
      b.due - a.due ||
      a.topic.localeCompare(b.topic)
    )
    .slice(0, Math.max(0, limit));
}

/** Questions in a full exam simulation: the maximum of the real SY0-701 exam. */
export const EXAM_QUESTION_COUNT = 90;

/**
 * Splits `total` questions across domains in proportion to their exam weights
 * (percentages), without exceeding what each domain's bank holds. Uses the
 * largest-remainder method, so the parts always add up to `total` when enough
 * questions exist: 90 at 12/22/18/28/20 % gives 11/20/16/25/18.
 */
export function examBlueprint(
  weights: Record<number, number>,
  available: Record<number, number>,
  total = EXAM_QUESTION_COUNT
): Record<number, number> {
  const domains = Object.keys(weights).map(Number);
  const weightSum = domains.reduce((sum, d) => sum + weights[d], 0) || 1;
  const exact = domains.map((d) => ({ d, share: (total * weights[d]) / weightSum }));
  const counts: Record<number, number> = {};
  for (const { d, share } of exact) counts[d] = Math.min(Math.floor(share), available[d] ?? 0);
  let missing = total - domains.reduce((sum, d) => sum + counts[d], 0);
  // Hand out the remaining questions by largest remainder, skipping full banks.
  const byRemainder = [...exact].sort((a, b) => (b.share % 1) - (a.share % 1));
  while (missing > 0) {
    const next = byRemainder.find(({ d }) => counts[d] < (available[d] ?? 0));
    if (!next) break;
    counts[next.d]++;
    missing--;
    byRemainder.push(byRemainder.splice(byRemainder.indexOf(next), 1)[0]);
  }
  return counts;
}
