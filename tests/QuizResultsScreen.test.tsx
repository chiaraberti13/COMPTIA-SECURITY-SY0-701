// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuizResultsScreen from "../src/components/QuizResultsScreen";
import type { QuizSession } from "../src/hooks/useQuizSession";
import type { Remediation } from "../src/hooks/useRemediation";
import type { RunObjectiveResult } from "../src/readiness";
import { LanguageProvider } from "../src/i18n";
import type { Question } from "../src/types";

/*
 * The post-session, per-objective analysis on the results screen: a labelled
 * region with each objective's score in words (not colour alone) and a link to
 * its guide; hidden for a single-objective quiz or a one-objective run.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

const quiz = {
  activeQuestions: [{ id: 1 }, { id: 2 }, { id: 3 }] as Question[],
  quizAnswers: {},
  quizScore: 3,
  reviewWrongOnly: true,
  setReviewWrongOnly: () => {},
  setShowReview: () => {},
  showReview: false,
  timeUp: false,
  wrongQuestions: [],
} as unknown as QuizSession;

const remediation = { isGeneratingRemediation: false, remediationError: null } as unknown as Remediation;

const runObjectives: RunObjectiveResult[] = [
  { code: "1.1", total: 2, correct: 1, accuracy: 50 },
  { code: "4.6", total: 1, correct: 1, accuracy: 100 },
];

function renderResults(props: Partial<Parameters<typeof QuizResultsScreen>[0]> = {}) {
  const onStudyAction = vi.fn();
  render(
    <LanguageProvider>
      <QuizResultsScreen
        quiz={quiz}
        remediation={remediation}
        activeObjective={null}
        runObjectives={runObjectives}
        onRestart={() => {}}
        onRetryMistakes={() => {}}
        onStartRemediation={() => {}}
        onStudyAction={onStudyAction}
        onBackToStudio={() => {}}
        {...props}
      />
    </LanguageProvider>
  );
  return { onStudyAction };
}

describe("QuizResultsScreen per-objective analysis", () => {
  it("lists each objective of the run with its score in words", () => {
    renderResults();
    const region = screen.getByRole("region", { name: /Risultati per obiettivo/ });
    expect(region).toBeTruthy();
    // Score stated in words, not by the coloured bar alone.
    expect(screen.getByText("1/2 · 50%")).toBeTruthy();
    expect(screen.getByText("1/1 · 100%")).toBeTruthy();
    // The objective name is shown next to its code.
    expect(screen.getByText(/Tipi di controlli di sicurezza/)).toBeTruthy();
  });

  it("links each objective to its guide", () => {
    const { onStudyAction } = renderResults();
    fireEvent.click(screen.getByRole("button", { name: /Apri la guida di 1\.1/ }));
    expect(onStudyAction).toHaveBeenCalledWith({ kind: "guide", domain: 1, objective: "1.1" });
  });

  it("stays hidden for a single-objective quiz", () => {
    renderResults({ activeObjective: "1.1" });
    expect(screen.queryByRole("region", { name: /Risultati per obiettivo/ })).toBeNull();
  });

  it("stays hidden when the run touched only one objective", () => {
    renderResults({ runObjectives: [{ code: "1.1", total: 3, correct: 2, accuracy: 67 }] });
    expect(screen.queryByRole("region", { name: /Risultati per obiettivo/ })).toBeNull();
  });
});
