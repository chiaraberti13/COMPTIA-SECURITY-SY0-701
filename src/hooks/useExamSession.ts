import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import { useLang } from "../i18n";
import { getInitialQuestions } from "../localizedData";
import { getPbqById } from "../localizedPbq";
import { moveStep } from "../pbq";
import { examReport, type ExamAnswers, type ExamItem } from "../exam";
import { hasPassedRun, shuffle, toggleSelection } from "../quiz";
import type { Question, QuizResult } from "../types";

export function useExamSession(onRecord: (entry: QuizResult, questions: Question[], answers: Record<number, number[]>) => void) {
  const { lang } = useLang();
  const [run, setRun] = useState<ExamItem[]>([]);
  const [answers, setAnswers] = useState<ExamAnswers>({});
  // Starting arrangements are drafts, not learner answers until a step is moved.
  const [initialOrders, setInitialOrders] = useState<Record<string, string[]>>({});
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [flagged, setFlagged] = useState<string[]>([]);
  const recorded = useRef(false);
  const items = useMemo(() => {
    const questions = new Map(getInitialQuestions(lang).map(q => [q.id, q]));
    return run.map(item => item.kind === "question"
      ? { ...item, question: questions.get(item.question.id) ?? item.question }
      : { ...item, pbq: getPbqById(item.pbq.id, lang) ?? item.pbq });
  }, [run, lang]);
  const current = items[index];
  const report = useMemo(() => examReport(items, answers), [items, answers]);

  const begin = (list: ExamItem[], timed: boolean) => {
    if (!list.length) return;
    recorded.current = false;
    const orders: Record<string, string[]> = {};
    for (const item of list) {
      if (item.kind === "pbq" && item.pbq.mechanic === "ordering") {
        const solution = item.pbq.steps.map(s => s.id);
        let order = shuffle(solution);
        if (order.every((id, i) => id === solution[i])) order = moveStep(order, 0, 1);
        orders[item.key] = order;
      }
    }
    setRun(list);
    setInitialOrders(orders);
    setAnswers({});
    setIndex(0);
    setCompleted(false);
    setTimeUp(false);
    setFlagged([]);
    setDeadline(timed ? Date.now() + list.length * 60_000 : null);
    setSecondsLeft(timed ? list.length * 60 : null);
  };
  const finish = (expired = false) => {
    if (!items.length || recorded.current) return;
    recorded.current = true;
    setCompleted(true);
    setTimeUp(expired || (deadline !== null && Date.now() >= deadline));
    setSecondsLeft(null);
    setDeadline(null);
    const questions = items.filter(i => i.kind === "question").map(i => i.question);
    const selected: Record<number, number[]> = {};
    for (const item of items) {
      const answer = answers[item.key];
      if (item.kind === "question" && answer?.kind === "question") selected[item.question.id] = answer.selected;
    }
    onRecord({ at: Date.now(), score: report.score, total: report.total,
      domains: report.domains.map(d => Number(d.code)), passed: hasPassedRun(report.score, report.total) }, questions, selected);
  };
  const tick = useEffectEvent(() => {
    if (deadline === null || completed) return;
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (!seconds) finish(true);
    else setSecondsLeft(seconds);
  });
  useEffect(() => {
    if (deadline === null || completed) return;
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, [deadline, completed]);

  const select = (option: number) => {
    if (completed || current?.kind !== "question") return;
    setAnswers(prev => {
      const prior = prev[current.key];
      return { ...prev, [current.key]: { kind: "question", selected: toggleSelection(current.question, prior?.kind === "question" ? prior.selected : [], option) } };
    });
  };
  const currentAnswer = current ? answers[current.key] : undefined;
  const response = currentAnswer?.kind === "pbq" ? currentAnswer.response
    : !completed && current?.kind === "pbq" ? { order: initialOrders[current.key] ?? [] } : {};
  const setMatch = (promptId: string, optionId: string) => {
    if (completed || current?.kind !== "pbq") return;
    setAnswers(prev => {
      const prior = prev[current.key];
      const value = prior?.kind === "pbq" ? prior.response : {};
      return { ...prev, [current.key]: { kind: "pbq", response: { ...value, matches: { ...value.matches, [promptId]: optionId } } } };
    });
  };
  const moveStepAt = (i: number, direction: -1 | 1) => {
    if (completed || current?.kind !== "pbq") return;
    setAnswers(prev => {
      const prior = prev[current.key];
      const value = prior?.kind === "pbq" ? prior.response : {};
      return { ...prev, [current.key]: { kind: "pbq", response: { ...value, order: moveStep(value.order ?? initialOrders[current.key] ?? [], i, direction) } } };
    });
  };
  return { items, current, index, answers, response, report, completed, timeUp, secondsLeft, flagged, begin, finish, select, setMatch, moveStepAt,
    goTo: (i: number) => { if (i >= 0 && i < items.length) setIndex(i); },
    toggleFlag: () => { if (current && !completed) setFlagged(prev => prev.includes(current.key) ? prev.filter(k => k !== current.key) : [...prev, current.key]); },
    exit: () => { setRun([]); setDeadline(null); setSecondsLeft(null); },
  };
}
export type ExamSession = ReturnType<typeof useExamSession>;
