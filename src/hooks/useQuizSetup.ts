import { useState } from "react";
import { shuffle } from "../quiz";
import type { Question } from "../types";

/** What the simulator is set up for: a preset, one domain, or a special run. */
export type QuizFocus =
  | "domain1" | "domain2" | "domain3" | "domain4" | "domain5"
  | "mini" | "balanced" | "all" | "custom" | "review" | "objective";

export type QuizPreset = Exclude<QuizFocus, "review" | "objective">;

/** Questions per domain, keyed 1-5. */
export type DomainCounts = Record<number, number>;

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

  const applyPreset = (preset: QuizPreset) => {
    setQuizFocus(preset);
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
    setCustomCounts(prev => ({ ...prev, [domain]: count }));
  };

  /** Uses given counts as a custom set-up, e.g. the official exam blueprint. */
  const applyCounts = (counts: DomainCounts) => {
    setQuizFocus("custom");
    setCustomCounts(counts);
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
    applyPreset,
    setDomainCount,
    applyCounts,
    totalQuestionsSelected,
    draw,
  };
}
