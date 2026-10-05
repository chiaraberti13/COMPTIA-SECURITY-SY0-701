/**
 * Performance-based questions (PBQ): the interactive, task-shaped exercises the
 * real SY0-701 exam opens with, where the learner arranges or matches items
 * instead of picking one of four options.
 *
 * The roadmap names five original scenario themes:
 *   ordinamento, abbinamento, interpretazione di log, risposta a incidente,
 *   scelta del controllo.
 *
 * They reduce to two interaction mechanics, so the UI and the grading only ever
 * branch on the mechanic, never on the theme:
 *   - ordering  : put a list of steps in the one correct sequence
 *                 (themes: ordering, incident response).
 *   - matching  : pair each left-hand item with the right option from a pool
 *                 (themes: matching, log interpretation, control selection).
 *
 * All content is pure, serialisable data (src/pbqData.ts is the Italian source
 * of truth, src/pbqData.en.ts the English overlay); the logic here never
 * touches the DOM or localStorage, so it is unit-tested in isolation
 * (tests/pbq.test.ts) and the content is validated separately
 * (tests/pbqData.test.ts).
 */

/** The five original performance-based scenario themes required by the roadmap. */
export type PbqKind = "ordering" | "matching" | "log" | "incident" | "control";

/** The two interaction mechanics every theme reduces to. */
export type PbqMechanic = "ordering" | "matching";

/**
 * Which mechanic drives each theme. A single source of truth so the data, the
 * UI and tests stay consistent (tests/pbqData.test.ts checks every scenario's
 * `mechanic` against this map).
 */
export const KIND_MECHANIC: Record<PbqKind, PbqMechanic> = {
  ordering: "ordering",
  incident: "ordering",
  matching: "matching",
  log: "matching",
  control: "matching",
};

interface PbqBase {
  /** Globally unique, stable id (saved progress and anchors may point at it). */
  id: number;
  kind: PbqKind;
  mechanic: PbqMechanic;
  /** Official SY0-701 objective code the scenario trains, e.g. "4.8". */
  objective: string;
  /** Exam domain 1-5. */
  domain: number;
  title: string;
  /** The situation the learner is dropped into. */
  scenario: string;
  /** What to do: the task instruction. */
  prompt: string;
  /** Shown after grading, in both languages. */
  explanation: string;
}

/** One orderable step. `id` is stable and language-independent. */
export interface PbqStep {
  id: string;
  text: string;
}

/** A left-column item to be matched to exactly one option. */
export interface PbqPrompt {
  id: string;
  text: string;
  /** The id of the correct option in `options`. */
  correctOptionId: string;
}

/** A right-column option in the shared matching pool. */
export interface PbqOption {
  id: string;
  text: string;
}

export interface OrderingPbq extends PbqBase {
  mechanic: "ordering";
  /** The steps in the one correct order; the UI presents them scrambled. */
  steps: PbqStep[];
}

export interface MatchingPbq extends PbqBase {
  mechanic: "matching";
  prompts: PbqPrompt[];
  /** The option pool; may hold distractors not used by any prompt. */
  options: PbqOption[];
}

export type Pbq = OrderingPbq | MatchingPbq;

/** The learner's answer. Shape depends on the scenario's mechanic. */
export interface PbqResponse {
  /** Ordering: the step ids in the chosen order. */
  order?: readonly string[];
  /** Matching: prompt id -> chosen option id (unanswered prompts omitted). */
  matches?: Readonly<Record<string, string>>;
}

export interface PbqGrade {
  /** Items placed/matched correctly. */
  correct: number;
  /** Items to place/match in total. */
  total: number;
  /** True only when every item is correct (CompTIA scores PBQ parts). */
  passed: boolean;
  /**
   * Per-item correctness keyed by the item id (step id for ordering, prompt id
   * for matching), so the UI can mark each row without re-deriving it.
   */
  perItem: Record<string, boolean>;
}

/* ------------------------------------------------------------------ *
 * Ordering
 * ------------------------------------------------------------------ */

/** The correct order of a scenario's step ids, as authored. */
export function correctOrder(pbq: OrderingPbq): string[] {
  return pbq.steps.map((s) => s.id);
}

/**
 * Moves the step at `index` one place up (-1) or down (+1), returning a new
 * array. Out-of-range moves return the order unchanged, so the UI can call it
 * without first checking the bounds of the first and last rows. This is how the
 * list is reordered from the keyboard, so it stays operable without drag.
 */
export function moveStep(
  order: readonly string[],
  index: number,
  direction: -1 | 1
): string[] {
  const target = index + direction;
  if (index < 0 || index >= order.length || target < 0 || target >= order.length) {
    return [...order];
  }
  const next = [...order];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

/** How many steps sit in their correct position. */
export function orderingCorrectCount(pbq: OrderingPbq, order: readonly string[]): number {
  const solution = correctOrder(pbq);
  let count = 0;
  for (let i = 0; i < solution.length; i++) {
    if (order[i] === solution[i]) count++;
  }
  return count;
}

/** Whether the order is exactly the correct sequence. */
export function isOrderingCorrect(pbq: OrderingPbq, order: readonly string[]): boolean {
  const solution = correctOrder(pbq);
  return order.length === solution.length && solution.every((id, i) => order[i] === id);
}

/* ------------------------------------------------------------------ *
 * Matching
 * ------------------------------------------------------------------ */

/** How many prompts are matched to their correct option. */
export function matchingCorrectCount(
  pbq: MatchingPbq,
  matches: Readonly<Record<string, string>>
): number {
  return pbq.prompts.reduce(
    (count, p) => count + (matches[p.id] === p.correctOptionId ? 1 : 0),
    0
  );
}

/** Whether every prompt is matched to its correct option. */
export function isMatchingCorrect(
  pbq: MatchingPbq,
  matches: Readonly<Record<string, string>>
): boolean {
  return pbq.prompts.every((p) => matches[p.id] === p.correctOptionId);
}

/* ------------------------------------------------------------------ *
 * Unified grading and answer-completeness
 * ------------------------------------------------------------------ */

/** Grades any scenario against a response, dispatching on the mechanic. */
export function gradePbq(pbq: Pbq, response: PbqResponse): PbqGrade {
  if (pbq.mechanic === "ordering") {
    const order = response.order ?? [];
    const solution = correctOrder(pbq);
    const perItem: Record<string, boolean> = {};
    for (let i = 0; i < solution.length; i++) {
      perItem[solution[i]] = order[i] === solution[i];
    }
    const correct = orderingCorrectCount(pbq, order);
    return { correct, total: solution.length, passed: correct === solution.length, perItem };
  }

  const matches = response.matches ?? {};
  const perItem: Record<string, boolean> = {};
  for (const p of pbq.prompts) {
    perItem[p.id] = matches[p.id] === p.correctOptionId;
  }
  const correct = matchingCorrectCount(pbq, matches);
  return { correct, total: pbq.prompts.length, passed: correct === pbq.prompts.length, perItem };
}

/**
 * Whether the learner has supplied enough of an answer to be allowed to submit.
 * Ordering is always complete (the list is pre-filled); matching needs every
 * prompt assigned an option.
 */
export function isResponseComplete(pbq: Pbq, response: PbqResponse): boolean {
  if (pbq.mechanic === "ordering") {
    const order = response.order ?? [];
    return order.length === pbq.steps.length;
  }
  const matches = response.matches ?? {};
  return pbq.prompts.every((p) => typeof matches[p.id] === "string" && matches[p.id] !== "");
}

/** How many items a scenario is graded on (steps or prompts). */
export function pbqItemCount(pbq: Pbq): number {
  return pbq.mechanic === "ordering" ? pbq.steps.length : pbq.prompts.length;
}
