import { useState } from "react";
import { examBlueprint, shuffle } from "../quiz";
import type { Question } from "../types";

/** What the simulator is set up for: a preset, one domain, or a special run. */
export type QuizFocus =
  | "domain1" | "domain2" | "domain3" | "domain4" | "domain5"
  | "mini" | "balanced" | "all" | "custom" | "review" | "objective" | "blueprint";

export type QuizPreset = Exclude<QuizFocus, "review" | "objective" | "blueprint">;

/** Questions per domain, keyed 1-5. */
export type DomainCounts = Record<number, number>;

/**
 * Lengths offered for an exam simulation, from a short diagnostic to the full
 * SY0-701 maximum of 90. Each is split across the domains by the official
 * weights (see `applyBlueprint`), so the learner sets only the total.
 */
export const SIMULATION_LENGTHS = [20, 45, 65, 90] as const;

const DOMAINS = [1, 2, 3, 4, 5] as const;
const each = (n: number): DomainCounts => Object.fromEntries(DOMAINS.map(d => [d, n]));

/**
 * The simulator set-up screen: the chosen preset, how many questions to draw
 * from each domain and the objective picked for the objective quiz.
 * `maxByDomain` is how many questions each domain has.
 */
export function useQuizSetup({ maxByDomain }: { maxByDomain: DomainCounts }) {
  const [quizFocus, setQuizFocus] = useState<QuizFocus>("all");
  // Exam objective chosen for the "objective only" quiz ("" = none yet).
  const [objectiveChoice, setObjectiveChoice] = useState("");
  const [customCounts, setCustomCounts] = useState<DomainCounts>(() => each(5));
  // The total of the exam-simulation blueprint in use, so the set-up screen can
  // show which length is selected (null = no blueprint applied).
  const [blueprintTotal, setBlueprintTotal] = useState<number | null>(null);

  const applyPreset = (preset: QuizPreset) => {
    setQuizFocus(preset);
    setBlueprintTotal(null);
    const only = /^domain([1-5])$/.exec(preset);
    if (only) {
      const domain = Number(only[1]);
      setCustomCounts(Object.fromEntries(DOMAINS.map(d => [d, d === domain ? maxByDomain[d] : 0])));
    } else if (preset === "mini") {
      setCustomCounts(each(2));
    } else if (preset === "balanced") {
      setCustomCounts(each(5));
    } else if (preset === "all") {
      setCustomCounts({ ...maxByDomain });
    }
  };

  /** Sets one domain's count from the steppers or the slider (a custom set-up). */
  const setDomainCount = (domain: number, count: number) => {
    setQuizFocus("custom");
    setBlueprintTotal(null);
    setCustomCounts(prev => ({ ...prev, [domain]: count }));
  };

  /** Uses given counts as a custom set-up. */
  const applyCounts = (counts: DomainCounts) => {
    setQuizFocus("custom");
    setBlueprintTotal(null);
    setCustomCounts(counts);
  };

  /**
   * Configures a timed exam simulation of `total` questions, split across the
   * domains in proportion to the official SY0-701 weights (largest-remainder,
   * never exceeding a domain's bank). The learner chooses only the length.
   */
  const applyBlueprint = (total: number, weights: Record<number, number>) => {
    setQuizFocus("blueprint");
    setBlueprintTotal(total);
    setCustomCounts(examBlueprint(weights, maxByDomain, total));
  };

  const totalQuestionsSelected = (Object.values(customCounts) as number[]).reduce((sum, val) => sum + val, 0);

  /** Draws the configured number of random questions from each domain, in domain order. */
  const draw = (questionsByDomain: Record<number, Question[]>): Question[] =>
    DOMAINS.flatMap(d => shuffle(questionsByDomain[d] ?? []).slice(0, customCounts[d]));

  return {
    quizFocus,
    setQuizFocus,
    objectiveChoice,
    setObjectiveChoice,
    customCounts,
    blueprintTotal,
    applyPreset,
    setDomainCount,
    applyCounts,
    applyBlueprint,
    totalQuestionsSelected,
    draw,
  };
}

export type QuizSetup = ReturnType<typeof useQuizSetup>;
