// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLang } from "../src/i18n";
import { getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { getPbqScenarios } from "../src/localizedPbq";
import { useExamSession } from "../src/hooks/useExamSession";
import { useQuizSession } from "../src/hooks/useQuizSession";
import type { ExamItem } from "../src/exam";
import { correctIndexes, sanitizeQuizHistory } from "../src/quiz";
import { STORAGE_KEYS } from "../src/storage";

beforeEach(() => { localStorage.clear(); localStorage.setItem(STORAGE_KEYS.lang, "it"); });
afterEach(() => { cleanup(); vi.useRealTimers(); });
const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;
const question = getDomainQuestions(1, "it").find(q => !q.answerIndexes)!;
const matching = getPbqScenarios("it").find(p => p.mechanic === "matching")!;
const ordering = getPbqScenarios("it").find(p => p.mechanic === "ordering")!;
const items: ExamItem[] = [
  { kind: "pbq", key: `pbq:${matching.id}`, domain: matching.domain, objectives: [matching.objective], pbq: matching },
  { kind: "question", key: `question:${question.id}`, domain: 1, objectives: ["1.1"], question },
];
function renderExam() {
  const record = vi.fn();
  const hook = renderHook(() => ({ exam: useExamSession(record), lang: useLang() }), { wrapper });
  return { ...hook, record };
}

describe("exam session", () => {
  it("keeps editable answers and flags when skipping and returning, then records only once", () => {
    const { result, record } = renderExam();
    act(() => result.current.exam.begin(items, false));
    act(() => result.current.exam.toggleFlag());
    if (matching.mechanic !== "matching") throw new Error("fixture");
    for (const p of matching.prompts) act(() => result.current.exam.setMatch(p.id, p.correctOptionId));
    act(() => result.current.exam.goTo(1));
    act(() => result.current.exam.select(correctIndexes(question)[0]));
    act(() => result.current.exam.goTo(0));
    expect(result.current.exam.response.matches).toEqual(Object.fromEntries(matching.prompts.map(p => [p.id, p.correctOptionId])));
    expect(result.current.exam.flagged).toEqual([items[0].key]);
    expect(result.current.exam.report.score).toBe(2);
    act(() => result.current.exam.finish());
    act(() => result.current.exam.finish());
    expect(record).toHaveBeenCalledTimes(1);
    expect(record.mock.calls[0][0]).toMatchObject({ score: 2, total: 2, passed: true });
    act(() => result.current.exam.goTo(1));
    act(() => result.current.exam.select((correctIndexes(question)[0] + 1) % 4));
    expect(result.current.exam.report.score).toBe(2);
  });
  it("scrambles ordering and preserves an edited order on navigation", () => {
    const { result } = renderExam();
    const orderItem: ExamItem = { kind: "pbq", key: `pbq:${ordering.id}`, domain: ordering.domain, objectives: [ordering.objective], pbq: ordering };
    act(() => result.current.exam.begin([orderItem, items[1]], false));
    if (ordering.mechanic !== "ordering") throw new Error("fixture");
    expect(result.current.exam.response.order).not.toEqual(ordering.steps.map(s => s.id));
    expect(result.current.exam.report.unanswered).toBe(2);
    const initial = result.current.exam.response.order!;
    act(() => result.current.exam.moveStepAt(0, 1));
    expect(result.current.exam.response.order![1]).toBe(initial[0]);
    act(() => result.current.exam.goTo(1));
    act(() => result.current.exam.goTo(0));
    expect(result.current.exam.response.order![1]).toBe(initial[0]);
  });
  it("uses a real deadline, including background time, and submits unanswered items", () => {
    vi.useFakeTimers();
    const { result, record } = renderExam();
    act(() => result.current.exam.begin(items, true));
    expect(result.current.exam.secondsLeft).toBe(120);
    act(() => vi.setSystemTime(Date.now() + 180_000));
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current.exam).toMatchObject({ completed: true, timeUp: true, secondsLeft: null });
    expect(record).toHaveBeenCalledTimes(1);
    expect(record.mock.calls[0][0]).toMatchObject({ score: 0, total: 2 });
    act(() => vi.advanceTimersByTime(5000));
    expect(record).toHaveBeenCalledTimes(1);
  });
  it("does not run a timer when untimed and resets all state for a repeat", () => {
    const { result } = renderExam();
    act(() => result.current.exam.begin(items, false));
    act(() => result.current.exam.toggleFlag());
    act(() => result.current.exam.finish());
    act(() => result.current.exam.begin(items, true));
    expect(result.current.exam).toMatchObject({ index: 0, answers: {}, completed: false, flagged: [], timeUp: false, secondsLeft: 120 });
    act(() => result.current.exam.exit());
    expect(result.current.exam.items).toHaveLength(0);
    expect(result.current.exam.secondsLeft).toBeNull();
  });
  it("switches PBQ and MCQ language without losing responses or resetting the timer", async () => {
    await loadEnglishOverlay();
    const { result } = renderExam();
    act(() => result.current.exam.begin(items, true));
    if (matching.mechanic !== "matching") throw new Error("fixture");
    act(() => result.current.exam.setMatch(matching.prompts[0].id, matching.prompts[0].correctOptionId));
    const answers = result.current.exam.answers;
    act(() => result.current.lang.setLang("en"));
    await waitFor(() => expect(result.current.lang.lang).toBe("en"));
    expect(result.current.exam.items[0]).toMatchObject({ kind: "pbq", pbq: { title: getPbqScenarios("en").find(p => p.id === matching.id)!.title } });
    expect(result.current.exam.items[1]).toMatchObject({ kind: "question", question: { question: getDomainQuestions(1, "en").find(q => q.id === question.id)!.question } });
    expect(result.current.exam.answers).toEqual(answers);
    expect(result.current.exam.secondsLeft).toBe(120);
  });
  it("persists compatible history and MCQ progress without mixing PBQ ids into spaced review", () => {
    const { result } = renderHook(() => {
      const quiz = useQuizSession({ paused: false });
      return { exam: useExamSession(quiz.recordExam), quiz };
    }, { wrapper });
    act(() => result.current.exam.begin(items, false));
    act(() => result.current.exam.goTo(1));
    act(() => result.current.exam.select(correctIndexes(question)[0]));
    act(() => result.current.exam.finish());
    expect(result.current.quiz.quizHistory[0]).toMatchObject({ score: 1, total: 2 });
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.quizHistory)!);
    expect(sanitizeQuizHistory(saved)).toEqual(saved);
    expect(Object.keys(result.current.quiz.questionProgress)).toEqual([String(question.id)]);
  });
});


describe("firewall PBQ persisted result", () => {
  it("records the fully correct task once and restores its history after remount", () => {
    const firewall = getPbqScenarios("it").find(p => p.id === 303)!;
    if (firewall.mechanic !== "matching") throw new Error("firewall fixture");
    const item: ExamItem = { kind: "pbq", key: "pbq:303", domain: 4, objectives: ["4.5"], pbq: firewall };
    const hook = renderHook(() => {
      const quiz = useQuizSession({ paused: false });
      return { exam: useExamSession(quiz.recordExam), quiz };
    }, { wrapper });
    act(() => hook.result.current.exam.begin([item], false));
    for (const p of firewall.prompts) act(() => hook.result.current.exam.setMatch(p.id, p.correctOptionId));
    act(() => hook.result.current.exam.finish());
    act(() => hook.result.current.exam.finish());
    expect(hook.result.current.quiz.quizHistory).toHaveLength(1);
    expect(hook.result.current.quiz.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [4] });
    expect(hook.result.current.quiz.questionProgress).toEqual({});
    hook.unmount();
    const restored = renderHook(() => useQuizSession({ paused: false }), { wrapper });
    expect(restored.result.current.quizHistory).toHaveLength(1);
    expect(restored.result.current.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [4] });
  });
});

describe("vpn PBQ persisted result", () => {
  it("records the fully correct task once and restores its history after remount", () => {
    const vpn = getPbqScenarios("it").find(p => p.id === 304)!;
    if (vpn.mechanic !== "matching") throw new Error("vpn fixture");
    const item: ExamItem = { kind: "pbq", key: "pbq:304", domain: 3, objectives: ["3.2"], pbq: vpn };
    const hook = renderHook(() => {
      const quiz = useQuizSession({ paused: false });
      return { exam: useExamSession(quiz.recordExam), quiz };
    }, { wrapper });
    act(() => hook.result.current.exam.begin([item], false));
    for (const p of vpn.prompts) act(() => hook.result.current.exam.setMatch(p.id, p.correctOptionId));
    act(() => hook.result.current.exam.finish());
    act(() => hook.result.current.exam.finish());
    expect(hook.result.current.quiz.quizHistory).toHaveLength(1);
    expect(hook.result.current.quiz.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [3] });
    expect(hook.result.current.quiz.questionProgress).toEqual({});
    hook.unmount();
    const restored = renderHook(() => useQuizSession({ paused: false }), { wrapper });
    expect(restored.result.current.quizHistory).toHaveLength(1);
    expect(restored.result.current.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [3] });
  });
});

describe("wifi PBQ persisted result", () => {
  it("records the fully correct task once and restores its history after remount", () => {
    const wifi = getPbqScenarios("it").find(p => p.id === 305)!;
    if (wifi.mechanic !== "matching") throw new Error("wifi fixture");
    const item: ExamItem = { kind: "pbq", key: "pbq:305", domain: 4, objectives: ["4.1"], pbq: wifi };
    const hook = renderHook(() => {
      const quiz = useQuizSession({ paused: false });
      return { exam: useExamSession(quiz.recordExam), quiz };
    }, { wrapper });
    act(() => hook.result.current.exam.begin([item], false));
    for (const p of wifi.prompts) act(() => hook.result.current.exam.setMatch(p.id, p.correctOptionId));
    act(() => hook.result.current.exam.finish());
    act(() => hook.result.current.exam.finish());
    expect(hook.result.current.quiz.quizHistory).toHaveLength(1);
    expect(hook.result.current.quiz.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [4] });
    expect(hook.result.current.quiz.questionProgress).toEqual({});
    hook.unmount();
    const restored = renderHook(() => useQuizSession({ paused: false }), { wrapper });
    expect(restored.result.current.quizHistory).toHaveLength(1);
    expect(restored.result.current.quizHistory[0]).toMatchObject({ score: 1, total: 1, domains: [4] });
  });
});
