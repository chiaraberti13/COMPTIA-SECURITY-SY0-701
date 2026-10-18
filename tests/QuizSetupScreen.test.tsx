// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import QuizSetupScreen from "../src/components/QuizSetupScreen";
import type { QuizSession } from "../src/hooks/useQuizSession";
import type { QuizSetup } from "../src/hooks/useQuizSetup";
import type { Readiness, ReviewObjective } from "../src/readiness";
import { LanguageProvider } from "../src/i18n";

/*
 * The adaptive "Review by objective" section: spaced repetition rolled up to the
 * official objectives, each reviewable on its own, with the official sub-topics
 * to re-read linked into the domain guide.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

const quiz = {
  quizHistory: [],
  timerEnabled: false,
  setTimerEnabled: () => {},
} as unknown as QuizSession;

const setup = {
  quizFocus: "all",
  setQuizFocus: () => {},
  objectiveChoice: "",
  setObjectiveChoice: () => {},
  customCounts: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
  blueprintTotal: null,
  totalQuestionsSelected: 25,
  applyPreset: () => {},
  setDomainCount: () => {},
  examPbqCount: 2,
  setExamPbqCount: vi.fn(),
} as unknown as QuizSetup;

const emptyArea = { total: 0, seen: 0, attempts: 0, correct: 0, due: 0, coverage: 0, accuracy: null };
const readiness: Readiness = {
  domains: [1, 2, 3, 4, 5].map((domain) => ({ domain, weight: 20, ...emptyArea })),
  objectives: [],
  weightedAccuracy: null,
  weightedCoverage: 0,
  weakestObjectives: [],
  untouchedObjectives: [],
  practisedQuestions: 0,
  dueQuestions: 0,
};

const reviewObjectives: ReviewObjective[] = [
  { code: "4.3", domain: 4, due: 2, dueIds: [40001, 40002], attempts: 4, correct: 1, accuracy: 25 },
  { code: "1.1", domain: 1, due: 1, dueIds: [10001], attempts: 3, correct: 2, accuracy: 67 },
];

const objectiveSubtopics = {
  "4.3": ["Identificazione: vulnerability scan", "Analisi: CVSS, CVE"],
  "1.1": ["Controlli tecnici, gestionali, operativi e fisici"],
};

function renderSetup(props: Partial<Parameters<typeof QuizSetupScreen>[0]> = {}) {
  const onReviewObjective = vi.fn();
  const onStudyAction = vi.fn();
  render(
    <LanguageProvider>
      <QuizSetupScreen
        onStartExam={vi.fn()}
        examPbqAvailable={2}
        quiz={quiz}
        setup={setup}
        maxQuestionsByDomain={{ 1: 10, 2: 10, 3: 10, 4: 10, 5: 10 }}
        dueReviewQuestions={[]}
        weakTopicSummary={[]}
        reviewObjectives={reviewObjectives}
        objectiveSubtopics={objectiveSubtopics}
        onReviewObjective={onReviewObjective}
        onStudyAction={onStudyAction}
        questionsByObjective={new Map()}
        simulationLengths={[20, 45, 65, 90]}
        onApplyBlueprint={() => {}}
        onStartQuiz={() => {}}
        onStartObjectiveQuiz={() => {}}
        onStartSmartReview={() => {}}
        onClearHistory={() => {}}
        onStartNewQuestions={() => {}}
        onShowNewQuestions={() => {}}
        readiness={readiness}
        onTrainObjective={() => {}}
        {...props}
      />
    </LanguageProvider>
  );
  return { onReviewObjective, onStudyAction };
}

describe("QuizSetupScreen review by objective", () => {
  it("lists the due objectives, weakest first, with the counts stated in words", () => {
    renderSetup();
    const region = screen.getByRole("region", { name: /Ripasso per obiettivo/ });
    const rows = Array.from(region.querySelectorAll<HTMLLIElement>("#objective_review_list > li"));
    // 4.3 (25%) before 1.1 (67%): the order it is given in, weakest first.
    expect(rows.map((li) => li.textContent?.slice(0, 3))).toEqual(["4.3", "1.1"]);
    // Due count and accuracy are written, never signalled by colour alone.
    expect(within(region).getByText("2 da ripassare · 25% di accuratezza")).toBeTruthy();
  });

  it("reviews one objective's due questions when its button is pressed", () => {
    const { onReviewObjective } = renderSetup();
    fireEvent.click(document.getElementById("objective_review_start_4_3")!);
    expect(onReviewObjective).toHaveBeenCalledWith("4.3");
  });

  it("opens the objective in the guide to re-read its sub-topics", () => {
    const { onStudyAction } = renderSetup();
    fireEvent.click(document.getElementById("objective_review_reread_4_3")!);
    expect(onStudyAction).toHaveBeenCalledWith({ kind: "guide", domain: 4, objective: "4.3" });
  });

  it("offers the official sub-topics to re-read for each objective", () => {
    renderSetup();
    expect(screen.getAllByText("Sotto-argomenti da rileggere")).toHaveLength(reviewObjectives.length);
    expect(screen.getByText("Analisi: CVSS, CVE")).toBeTruthy();
  });

  it("hides the section when nothing is due", () => {
    renderSetup({ reviewObjectives: [] });
    expect(screen.queryByRole("region", { name: /Ripasso per obiettivo/ })).toBeNull();
  });
});
