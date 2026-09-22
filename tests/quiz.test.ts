import { describe, expect, it } from "vitest";
import {
  PASS_RATIO,
  HISTORY_LIMIT,
  formatClock,
  shuffle,
  hasPassedRun,
  scorePercent,
  appendHistory,
  unansweredIds,
  correctIndexes,
  requiredSelections,
  isMultiResponse,
  toggleSelection,
  isSelectionComplete,
  isSelectionCorrect,
  updateQuestionProgress,
  selectDueReviewQuestions,
} from "../src/quiz";
import type { Question, QuestionProgress, QuizResult } from "../src/types";

const question = (id: number): Question => ({
  id,
  topic: "t",
  level: "ANALISI",
  scenario: "s",
  question: "q",
  options: ["a", "b", "c", "d"],
  answerIndex: 0,
  explanation: "e",
});

describe("formatClock", () => {
  it("formats as mm:ss", () => {
    expect(formatClock(0)).toBe("00:00");
    expect(formatClock(59)).toBe("00:59");
    expect(formatClock(60)).toBe("01:00");
    expect(formatClock(1205)).toBe("20:05");
  });

  it("clamps negatives instead of showing -1:-1", () => {
    expect(formatClock(-30)).toBe("00:00");
  });
});

describe("shuffle", () => {
  it("returns a permutation and leaves the input untouched", () => {
    const input = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8]);
    const out = shuffle(input);
    expect(out).toHaveLength(input.length);
    expect([...out].sort((a, b) => a - b)).toEqual([...input]);
  });

  it("is close to uniform: every element reaches the first slot", () => {
    // The sort()-with-random-comparator version fails this: element 0 lands
    // first far more often than 1/n.
    const n = 6;
    const source = Array.from({ length: n }, (_, i) => i);
    const firstSlotCounts = new Array(n).fill(0);
    for (let i = 0; i < 6000; i++) firstSlotCounts[shuffle(source)[0]]++;
    const expected = 6000 / n;
    for (const count of firstSlotCounts) {
      expect(count).toBeGreaterThan(expected * 0.7);
      expect(count).toBeLessThan(expected * 1.3);
    }
  });
});

describe("passing threshold", () => {
  it("passes at exactly the threshold", () => {
    expect(hasPassedRun(8, 10)).toBe(true);
    expect(hasPassedRun(7, 10)).toBe(false);
    expect(PASS_RATIO).toBe(0.8);
  });

  it("scales with the size of the run, not a fixed score", () => {
    // The old `score >= 8` check called a 9/100 run a pass.
    expect(hasPassedRun(9, 100)).toBe(false);
    expect(hasPassedRun(80, 100)).toBe(true);
  });

  it("treats an empty run as not passed", () => {
    expect(hasPassedRun(0, 0)).toBe(false);
  });
});

describe("scorePercent", () => {
  it("rounds and survives an empty run", () => {
    expect(scorePercent(1, 3)).toBe(33);
    expect(scorePercent(0, 0)).toBe(0);
  });
});

describe("appendHistory", () => {
  const entry = (at: number): QuizResult => ({ at, score: 1, total: 2, domains: [1], passed: false });

  it("puts the newest run first", () => {
    expect(appendHistory([entry(1)], entry(2))[0].at).toBe(2);
  });

  it("caps the stored history", () => {
    let history: QuizResult[] = [];
    for (let i = 0; i < HISTORY_LIMIT + 10; i++) history = appendHistory(history, entry(i));
    expect(history).toHaveLength(HISTORY_LIMIT);
    expect(history[0].at).toBe(HISTORY_LIMIT + 9);
  });
});

describe("unansweredIds", () => {
  it("lists only the questions with no recorded answer", () => {
    const questions = [question(1), question(2), question(3)];
    expect(unansweredIds(questions, { 2: [0] })).toEqual([1, 3]);
  });

  it("counts an answer of index 0 as answered", () => {
    expect(unansweredIds([question(1)], { 1: [0] })).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Multi-response answers
 * ------------------------------------------------------------------ */

/** A "choose TWO" question whose correct options are B and D. */
const multi = (): Question => ({ ...question(1), answerIndex: 1, answerIndexes: [1, 3] });

describe("correctIndexes", () => {
  it("wraps a single answerIndex in a list", () => {
    expect(correctIndexes(question(1))).toEqual([0]);
  });

  it("returns every correct option of a multi-response question, sorted", () => {
    expect(correctIndexes({ ...multi(), answerIndexes: [3, 1] })).toEqual([1, 3]);
  });

  it("drops duplicates rather than inflating the required count", () => {
    expect(correctIndexes({ ...multi(), answerIndexes: [1, 1, 3] })).toEqual([1, 3]);
  });

  it("falls back to answerIndex when answerIndexes is present but empty", () => {
    expect(correctIndexes({ ...question(1), answerIndex: 2, answerIndexes: [] })).toEqual([2]);
  });
});

describe("requiredSelections / isMultiResponse", () => {
  it("treats a plain question as single-answer", () => {
    expect(requiredSelections(question(1))).toBe(1);
    expect(isMultiResponse(question(1))).toBe(false);
  });

  it("treats a two-answer question as multi-response", () => {
    expect(requiredSelections(multi())).toBe(2);
    expect(isMultiResponse(multi())).toBe(true);
  });
});

describe("toggleSelection", () => {
  it("replaces the selection on a single-answer question", () => {
    expect(toggleSelection(question(1), [2], 0)).toEqual([0]);
  });

  it("keeps a single-answer pick selected when clicked again", () => {
    expect(toggleSelection(question(1), [2], 2)).toEqual([2]);
  });

  it("accumulates picks on a multi-response question, sorted", () => {
    expect(toggleSelection(multi(), [3], 1)).toEqual([1, 3]);
  });

  it("deselects an already picked option", () => {
    expect(toggleSelection(multi(), [1, 3], 1)).toEqual([3]);
  });

  it("ignores a pick beyond the required count instead of dropping an earlier one", () => {
    expect(toggleSelection(multi(), [1, 3], 0)).toEqual([1, 3]);
  });

  it("does not mutate the selection it is given", () => {
    const selection = Object.freeze([1]) as readonly number[];
    expect(toggleSelection(multi(), selection, 3)).toEqual([1, 3]);
    expect(selection).toEqual([1]);
  });
});

describe("isSelectionComplete", () => {
  it("needs one pick on a single-answer question", () => {
    expect(isSelectionComplete(question(1), [])).toBe(false);
    expect(isSelectionComplete(question(1), [2])).toBe(true);
  });

  it("needs both picks on a two-answer question", () => {
    expect(isSelectionComplete(multi(), [1])).toBe(false);
    expect(isSelectionComplete(multi(), [1, 3])).toBe(true);
  });
});

describe("isSelectionCorrect", () => {
  it("scores a single-answer question against answerIndex", () => {
    expect(isSelectionCorrect(question(1), [0])).toBe(true);
    expect(isSelectionCorrect(question(1), [1])).toBe(false);
  });

  it("accepts the correct set in any order", () => {
    expect(isSelectionCorrect(multi(), [3, 1])).toBe(true);
  });

  it("scores a partially correct multi-response answer as wrong", () => {
    expect(isSelectionCorrect(multi(), [1])).toBe(false);
  });

  it("rejects a selection that adds a distractor to the correct pair", () => {
    expect(isSelectionCorrect(multi(), [1, 3, 0])).toBe(false);
  });

  it("rejects an empty selection", () => {
    expect(isSelectionCorrect(multi(), [])).toBe(false);
  });
});

describe("spaced repetition progress", () => {
  const now = Date.UTC(2026, 8, 22, 10);
  const day = 24 * 60 * 60 * 1000;

  it("makes wrong and unanswered questions due immediately", () => {
    const result = updateQuestionProgress({}, [question(1), question(2)], { 1: [2] }, now);
    expect(result[1]).toMatchObject({ attempts: 1, correct: 0, streak: 0, dueAt: now });
    expect(result[2]).toMatchObject({ attempts: 1, correct: 0, streak: 0, dueAt: now });
  });

  it("expands the interval after consecutive correct answers", () => {
    const first = updateQuestionProgress({}, [question(1)], { 1: [0] }, now);
    const second = updateQuestionProgress(first, [question(1)], { 1: [0] }, now + day);
    expect(first[1].dueAt).toBe(now + day);
    expect(second[1]).toMatchObject({ attempts: 2, correct: 2, streak: 2 });
    expect(second[1].dueAt).toBe(now + 4 * day);
  });

  it("prioritizes lower accuracy before how overdue a question is", () => {
    const progress: Record<number, QuestionProgress> = {
      1: { attempts: 4, correct: 4, streak: 4, lastSeenAt: now, dueAt: now - 2 * day },
      2: { attempts: 4, correct: 1, streak: 0, lastSeenAt: now, dueAt: now - day },
      3: { attempts: 1, correct: 0, streak: 0, lastSeenAt: now, dueAt: now + day },
    };
    expect(selectDueReviewQuestions([question(1), question(2), question(3)], progress, now).map(q => q.id))
      .toEqual([2, 1]);
  });

  it("ignores stale ids and respects the session limit", () => {
    const progress: Record<number, QuestionProgress> = {
      1: { attempts: 1, correct: 0, streak: 0, lastSeenAt: now, dueAt: now },
      2: { attempts: 1, correct: 0, streak: 0, lastSeenAt: now, dueAt: now },
      999: { attempts: 1, correct: 0, streak: 0, lastSeenAt: now, dueAt: now },
    };
    expect(selectDueReviewQuestions([question(1), question(2)], progress, now, 1)).toHaveLength(1);
  });
});
