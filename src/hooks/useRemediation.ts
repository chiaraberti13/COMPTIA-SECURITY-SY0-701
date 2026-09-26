import { useState } from "react";
import { ACCESS_REQUIRED, aiRequestHeaders } from "../aiAccess";
import { ApiErrorSchema, RemediationResponseSchema, type RemediationRequest } from "../apiSchemas";
import { useLang } from "../i18n";
import { isSelectionComplete, isSelectionCorrect, toggleSelection } from "../quiz";
import type { Question } from "../types";

/** Topics used when a run had no wrong answer to learn from. */
const DEFAULT_TOPICS = ["Quantitative Risk Calculation", "Risk Appetite vs Risk Tolerance", "Compliance & Privacy"];

/**
 * The adaptive remediation: three AI questions on the topics of the wrong
 * answers, requested from /api/quiz/remediation and answered like the main
 * run. The answer is validated with the shared schema before it is shown.
 *
 * `onLocked` is called when the server asks for the AI access code, so the AI
 * Trainer panel can show its form.
 */
export function useRemediation({ onLocked }: { onLocked: () => void }) {
  const { t, lang } = useLang();
  const [remediationActive, setRemediationActive] = useState(false);
  const [remediationQuestions, setRemediationQuestions] = useState<Question[]>([]);
  const [remediationIndex, setRemediationIndex] = useState(0);
  const [remediationSelected, setRemediationSelected] = useState<number[]>([]);
  const [remediationShowFeedback, setRemediationShowFeedback] = useState(false);
  const [remediationCompleted, setRemediationCompleted] = useState(false);
  const [remediationScore, setRemediationScore] = useState(0);
  const [isGeneratingRemediation, setIsGeneratingRemediation] = useState(false);
  const [remediationError, setRemediationError] = useState<string | null>(null);

  /** Asks for new questions on the topics of the wrong answers of a run. */
  const start = async (runQuestions: Question[], wrongIds: number[]) => {
    const weakTopics = runQuestions
      .filter(q => wrongIds.includes(q.id))
      .map(q => q.topic);
    const uniqueWeakTopics = Array.from(new Set(weakTopics));
    if (uniqueWeakTopics.length === 0) uniqueWeakTopics.push(...DEFAULT_TOPICS);

    setIsGeneratingRemediation(true);
    setRemediationError(null);
    setRemediationQuestions([]);

    try {
      const request: RemediationRequest = { weakTopics: uniqueWeakTopics, lang };
      const res = await fetch("/api/quiz/remediation", {
        method: "POST",
        headers: aiRequestHeaders(),
        body: JSON.stringify(request)
      });

      const data: unknown = await res.json().catch(() => null);
      const failure = ApiErrorSchema.safeParse(data);
      if (res.status === 401 && failure.success && failure.data.code === ACCESS_REQUIRED) {
        onLocked();
        throw new Error(t("rem.accessRequired"));
      }
      if (res.status !== 200 || failure.success) {
        throw new Error(failure.success ? failure.data.error : t("rem.cannotRetrieve"));
      }

      // Validated again in the browser: only well-formed questions are shown.
      const payload = RemediationResponseSchema.safeParse(data);
      if (payload.success) {
        setRemediationQuestions(payload.data.questions);
        setRemediationActive(true);
        setRemediationIndex(0);
        setRemediationSelected([]);
        setRemediationShowFeedback(false);
        setRemediationCompleted(false);
        setRemediationScore(0);
      } else {
        throw new Error(t("rem.noValidQuestions"));
      }
    } catch (err: any) {
      setRemediationError(err.message || t("rem.unknownError"));
    } finally {
      setIsGeneratingRemediation(false);
    }
  };

  const select = (index: number) => {
    if (remediationShowFeedback) return;
    const current = remediationQuestions[remediationIndex];
    if (!current) return;
    setRemediationSelected(prev => toggleSelection(current, prev, index));
  };

  const confirm = () => {
    if (remediationShowFeedback) return;

    const currentQuestion = remediationQuestions[remediationIndex];
    if (!isSelectionComplete(currentQuestion, remediationSelected)) return;
    const isCorrect = isSelectionCorrect(currentQuestion, remediationSelected);

    setRemediationShowFeedback(true);

    if (isCorrect) {
      setRemediationScore(prev => prev + 1);
    }
  };

  const next = () => {
    if (remediationIndex < remediationQuestions.length - 1) {
      setRemediationIndex(prev => prev + 1);
      setRemediationSelected([]);
      setRemediationShowFeedback(false);
    } else {
      setRemediationCompleted(true);
    }
  };

  /** Leaves the remediation (a new run starts, or back to the results). */
  const exit = () => {
    setRemediationActive(false);
    setRemediationCompleted(false);
  };

  return {
    remediationActive,
    remediationQuestions,
    remediationIndex,
    remediationSelected,
    remediationShowFeedback,
    remediationCompleted,
    remediationScore,
    isGeneratingRemediation,
    remediationError,
    start,
    select,
    confirm,
    next,
    exit,
  };
}
