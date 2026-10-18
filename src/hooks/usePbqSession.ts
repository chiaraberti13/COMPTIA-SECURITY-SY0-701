import { useState } from "react";
import { shuffle } from "../quiz";
import {
  gradePbq,
  isResponseComplete,
  moveStep,
  type OrderingPbq,
  type Pbq,
  type PbqGrade,
} from "../pbq";

/**
 * Drives a run through a chosen set of performance-based scenarios: the current
 * scenario, the learner's in-progress response (a step order or a set of
 * matches), grading one scenario at a time, and the per-scenario results kept
 * for the end-of-run summary.
 *
 * Nothing is persisted: a PBQ run lives only in memory, so it adds no
 * localStorage key and needs no storage migration (ROADMAP: do not change the
 * persisted format without a tested migration).
 */

/** A scrambled starting order that differs from the solution when it can. */
function scrambleOrder(pbq: OrderingPbq): string[] {
  const solution = pbq.steps.map((s) => s.id);
  if (solution.length < 2) return solution;
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = shuffle(solution);
    if (candidate.some((id, i) => id !== solution[i])) return candidate;
  }
  // Degenerate fallback: swap the first two so the learner has something to do.
  return moveStep(solution, 0, 1);
}

interface PbqResult {
  id: number;
  grade: PbqGrade;
}

export function usePbqSession() {
  const [scenarios, setScenarios] = useState<Pbq[]>([]);
  const [index, setIndex] = useState(0);
  const [order, setOrder] = useState<string[]>([]);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState(false);
  const [grade, setGrade] = useState<PbqGrade | null>(null);
  const [results, setResults] = useState<PbqResult[]>([]);

  const current: Pbq | undefined = scenarios[index];
  const started = scenarios.length > 0;
  // The run is over once the index has moved past the last scenario.
  const finished = started && index >= scenarios.length;

  /** Resets the in-progress response to the start state for `scenario`. */
  const resetResponse = (scenario: Pbq | undefined) => {
    setGraded(false);
    setGrade(null);
    if (!scenario) {
      setOrder([]);
      setMatches({});
      return;
    }
    if (scenario.mechanic === "ordering") {
      setOrder(scrambleOrder(scenario));
      setMatches({});
    } else {
      setOrder([]);
      setMatches({});
    }
  };

  /** Starts a run through `list` from the first scenario. */
  const begin = (list: Pbq[]) => {
    setScenarios(list);
    setIndex(0);
    setResults([]);
    resetResponse(list[0]);
  };

  /** Moves the step at `i` up (-1) or down (+1). Ignored once graded. */
  const moveStepAt = (i: number, direction: -1 | 1) => {
    if (graded) return;
    setOrder((prev) => moveStep(prev, i, direction));
  };

  /** Assigns `optionId` to a matching prompt. Ignored once graded. */
  const setMatch = (promptId: string, optionId: string) => {
    if (graded) return;
    setMatches((prev) => ({ ...prev, [promptId]: optionId }));
  };

  const response = { order, matches };
  const canSubmit = !!current && !graded && isResponseComplete(current, response);

  /** Grades the current scenario and records the result. */
  const submit = () => {
    if (!current || graded || !isResponseComplete(current, response)) return;
    const result = gradePbq(current, response);
    setGrade(result);
    setGraded(true);
    setResults((prev) => [...prev, { id: current.id, grade: result }]);
  };

  /** Advances to the next scenario (or to the summary after the last one). */
  const next = () => {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    resetResponse(scenarios[nextIndex]);
  };

  /** Leaves the run and returns to the scenario chooser. */
  const exit = () => {
    setScenarios([]);
    setIndex(0);
    setResults([]);
    resetResponse(undefined);
  };

  return {
    scenarios,
    index,
    current,
    started,
    finished,
    order,
    matches,
    graded,
    grade,
    results,
    canSubmit,
    begin,
    moveStepAt,
    setMatch,
    submit,
    next,
    exit,
  };
}

export type PbqSession = ReturnType<typeof usePbqSession>;
