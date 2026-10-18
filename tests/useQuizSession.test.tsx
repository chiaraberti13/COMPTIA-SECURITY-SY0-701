// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useQuizSession } from "../src/hooks/useQuizSession";
import { LanguageProvider, useLang } from "../src/i18n";
import { getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { SECONDS_PER_QUESTION, correctIndexes } from "../src/quiz";
import { STORAGE_KEYS } from "../src/storage";

/*
 * The simulator session on its own: a run from the first question to the
 * saved result, the exam timer and the language switch, with the same
 * localStorage the app uses.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;

function renderSession(paused = false) {
  return renderHook(
    ({ paused }) => ({ quiz: useQuizSession({ paused }), lang: useLang() }),
    { wrapper, initialProps: { paused } }
  );
}

// Three single-answer questions, so every answer takes one pick.
const questions = getDomainQuestions(1, "it").filter(q => !q.answerIndexes).slice(0, 3);
const right = (i: number) => correctIndexes(questions[i])[0];
const wrong = (i: number) => (right(i) + 1) % 4;

function answer(result: ReturnType<typeof renderSession>["result"], option: number) {
  act(() => result.current.quiz.select(option));
  act(() => result.current.quiz.confirm());
  act(() => result.current.quiz.next());
}

describe("useQuizSession", () => {
  it("runs from the first question to a saved result", () => {
    const { result } = renderSession();
    act(() => result.current.quiz.begin(questions));
    expect(result.current.quiz).toMatchObject({ quizStarted: true, currentQuestionIndex: 0, quizCompleted: false });

    answer(result, right(0));
    answer(result, wrong(1));
    answer(result, right(2));

    const quiz = result.current.quiz;
    expect(quiz.quizCompleted).toBe(true);
    expect(quiz.quizScore).toBe(2);
    expect(quiz.wrongQuestions).toEqual([questions[1].id]);
    expect(quiz.quizHistory[0]).toMatchObject({ score: 2, total: 3, domains: [1] });
    // Both kinds of progress are saved for the next visit.
    expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.quizHistory)!)).toHaveLength(1);
    expect(Object.keys(JSON.parse(localStorage.getItem(STORAGE_KEYS.questionProgress)!))).toHaveLength(3);
  });

  it("ignores a second pick or confirm once the answer is shown", () => {
    const { result } = renderSession();
    act(() => result.current.quiz.begin(questions));
    act(() => result.current.quiz.select(right(0)));
    act(() => result.current.quiz.confirm());
    act(() => result.current.quiz.select(wrong(0)));
    act(() => result.current.quiz.confirm());
    expect(result.current.quiz.selectedOptions).toEqual([right(0)]);
    expect(result.current.quiz.quizScore).toBe(1);
  });

  it("starts every run from a clean state", () => {
    const { result } = renderSession();
    act(() => result.current.quiz.begin(questions));
    answer(result, wrong(0));
    act(() => result.current.quiz.setShowReview(true));
    act(() => result.current.quiz.begin(questions.slice(0, 2)));
    expect(result.current.quiz).toMatchObject({
      currentQuestionIndex: 0, quizScore: 0, wrongQuestions: [], quizAnswers: {},
      showReview: false, reviewWrongOnly: true, timeUp: false, secondsLeft: null,
    });
    expect(result.current.quiz.activeQuestions).toHaveLength(2);
  });

  it("with the timer on, ends the run when time is up and counts the unanswered questions as wrong", () => {
    vi.useFakeTimers();
    const { result } = renderSession();
    act(() => result.current.quiz.setTimerEnabled(true));
    act(() => result.current.quiz.begin(questions));
    expect(result.current.quiz.secondsLeft).toBe(3 * SECONDS_PER_QUESTION);

    answer(result, right(0));
    for (let s = 0; s < 3 * SECONDS_PER_QUESTION; s++) act(() => vi.advanceTimersByTime(1000));

    const quiz = result.current.quiz;
    expect(quiz.timeUp).toBe(true);
    expect(quiz.quizCompleted).toBe(true);
    expect(quiz.secondsLeft).toBeNull();
    expect(quiz.quizScore).toBe(1);
    expect(quiz.wrongQuestions).toEqual([questions[1].id, questions[2].id]);
    expect(quiz.quizHistory[0]).toMatchObject({ score: 1, total: 3 });
  });

  it("pauses the timer while paused (the AI remediation)", () => {
    vi.useFakeTimers();
    const { result, rerender } = renderSession();
    act(() => result.current.quiz.setTimerEnabled(true));
    act(() => result.current.quiz.begin(questions));
    act(() => vi.advanceTimersByTime(1000));
    const left = result.current.quiz.secondsLeft;
    rerender({ paused: true });
    for (let s = 0; s < 5; s++) act(() => vi.advanceTimersByTime(1000));
    expect(result.current.quiz.secondsLeft).toBe(left);
  });

  it("shows the questions of the run in the language chosen afterwards", async () => {
    // The English dataset is a lazy chunk: load it first, so the test measures
    // the session and not how fast the chunk arrives.
    await loadEnglishOverlay();
    const { result } = renderSession();
    act(() => result.current.quiz.begin(questions));
    const italian = result.current.quiz.activeQuestions[0].question;
    act(() => result.current.lang.setLang("en"));
    await waitFor(() => expect(result.current.quiz.activeQuestions[0].question).not.toBe(italian));
    expect(result.current.quiz.activeQuestions.map(q => q.id)).toEqual(questions.map(q => q.id));
  });
});
