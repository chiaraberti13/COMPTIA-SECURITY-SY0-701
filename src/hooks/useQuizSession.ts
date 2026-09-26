import { useEffect, useEffectEvent, useMemo, useState } from "react";
import { useLang } from "../i18n";
import { domainOfQuestion, getInitialQuestions } from "../localizedData";
import {
  SECONDS_PER_QUESTION,
  appendHistory,
  hasPassedRun,
  isSelectionComplete,
  isSelectionCorrect,
  sanitizeQuestionProgress,
  sanitizeQuizHistory,
  toggleSelection,
  unansweredIds,
  updateQuestionProgress,
} from "../quiz";
import { STORAGE_KEYS, readJSON, removeKey, writeJSON } from "../storage";
import type { Question, QuestionProgress, QuizResult } from "../types";

/**
 * One run of the exam simulator and the progress it leaves behind: the
 * questions of the run, the answers, the score, the optional exam timer, the
 * end-of-run review and the locally saved history and per-question progress.
 *
 * `paused` stops the timer while the learner is in the AI remediation.
 */
export function useQuizSession({ paused }: { paused: boolean }) {
  const { lang } = useLang();

  // The questions of the run as they were drawn. What is shown is derived from
  // them in the active language (by id), so a language switch never needs an
  // effect; questions that are not in the dataset stay as they are.
  const [runQuestions, setRunQuestions] = useState<Question[]>(() => getInitialQuestions(lang));
  const activeQuestions = useMemo(() => {
    const byId = new Map(getInitialQuestions(lang).map(q => [q.id, q]));
    return runQuestions.map(q => byId.get(q.id) ?? q);
  }, [runQuestions, lang]);

  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Options picked for the question on screen. A single-answer question
  // holds at most one entry; a multi-response one holds up to the number of
  // correct options it declares.
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number[]>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState<number[]>([]);

  // Exam timer (opt-in): SECONDS_PER_QUESTION per question, auto-submit on expiry.
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);

  // End-of-quiz answer review, driven by the answers already collected.
  const [showReview, setShowReview] = useState(false);
  const [reviewWrongOnly, setReviewWrongOnly] = useState(true);

  // Locally persisted history of completed runs and per-question progress.
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(
    () => sanitizeQuizHistory(readJSON<unknown>(STORAGE_KEYS.quizHistory, []))
  );
  const [questionProgress, setQuestionProgress] = useState<Record<number, QuestionProgress>>(
    () => sanitizeQuestionProgress(readJSON<unknown>(STORAGE_KEYS.questionProgress, {}))
  );

  /** Puts the simulator into a clean "question 1" state for the given set. */
  const begin = (questions: Question[]) => {
    setRunQuestions(questions);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setSelectedOptions([]);
    setShowFeedback(false);
    setQuizCompleted(false);
    setQuizScore(0);
    setWrongQuestions([]);
    setShowReview(false);
    setReviewWrongOnly(true);
    setTimeUp(false);
    setSecondsLeft(timerEnabled ? questions.length * SECONDS_PER_QUESTION : null);
  };

  const select = (index: number) => {
    if (showFeedback) return;
    const current = activeQuestions[currentQuestionIndex];
    if (!current) return;
    setSelectedOptions(prev => toggleSelection(current, prev, index));
  };

  const confirm = () => {
    if (showFeedback) return;

    const currentQuestion = activeQuestions[currentQuestionIndex];
    if (!isSelectionComplete(currentQuestion, selectedOptions)) return;
    const isCorrect = isSelectionCorrect(currentQuestion, selectedOptions);

    setQuizAnswers(prev => ({ ...prev, [currentQuestion.id]: [...selectedOptions] }));
    setShowFeedback(true);

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    } else {
      setWrongQuestions(prev => [...prev, currentQuestion.id]);
    }
  };

  /**
   * Closes the run and records it in the local history.
   * `extraWrong` carries the questions never answered (timer expiry), which
   * count as wrong but were never pushed by confirm().
   */
  const finish = (extraWrong: number[] = []) => {
    if (extraWrong.length > 0) {
      setWrongQuestions(prev => Array.from(new Set([...prev, ...extraWrong])));
    }
    setQuizCompleted(true);
    setSecondsLeft(null);

    const total = activeQuestions.length;
    const entry: QuizResult = {
      at: Date.now(),
      score: quizScore,
      total,
      domains: Array.from(new Set(activeQuestions.map(q => domainOfQuestion(q.id)))).sort(),
      passed: hasPassedRun(quizScore, total),
    };
    setQuizHistory(prev => {
      const next = appendHistory(prev, entry);
      writeJSON(STORAGE_KEYS.quizHistory, next);
      return next;
    });
    setQuestionProgress(prev => {
      const next = updateQuestionProgress(prev, activeQuestions, quizAnswers);
      writeJSON(STORAGE_KEYS.questionProgress, next);
      return next;
    });
  };

  const next = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptions([]);
      setShowFeedback(false);
    } else {
      finish();
    }
  };

  const clearHistory = () => {
    setQuizHistory([]);
    removeKey(STORAGE_KEYS.quizHistory);
  };

  // Expiry: submit whatever has been answered; the rest counts as wrong. An
  // effect event, so it always sees the latest answers and score.
  const expire = useEffectEvent(() => {
    setTimeUp(true);
    finish(unansweredIds(activeQuestions, quizAnswers));
  });

  // Ticks once per second while a main-quiz question is on screen; the last
  // tick ends the run from the timer callback, not from a second effect.
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    if (!quizStarted || quizCompleted || paused) return;
    const id = window.setTimeout(() => {
      if (secondsLeft === 1) {
        setSecondsLeft(0);
        expire();
      } else {
        setSecondsLeft(prev => (prev === null ? null : prev - 1));
      }
    }, 1000);
    return () => window.clearTimeout(id);
  }, [secondsLeft, quizStarted, quizCompleted, paused]);

  return {
    activeQuestions,
    quizStarted,
    currentQuestionIndex,
    selectedOptions,
    quizAnswers,
    quizCompleted,
    showFeedback,
    quizScore,
    wrongQuestions,
    timerEnabled,
    setTimerEnabled,
    secondsLeft,
    timeUp,
    showReview,
    setShowReview,
    reviewWrongOnly,
    setReviewWrongOnly,
    quizHistory,
    questionProgress,
    begin,
    select,
    confirm,
    next,
    /** Shows the results of the run again, e.g. when leaving the remediation. */
    showResults: () => setQuizCompleted(true),
    clearHistory,
  };
}

export type QuizSession = ReturnType<typeof useQuizSession>;
