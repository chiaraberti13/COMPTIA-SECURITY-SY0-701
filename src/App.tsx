import React, { useState, useEffect, useMemo } from "react";
import {
  X,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  getDomainTopics,
  getDomainQuestions,
  questionUid,
  sourceQuestionId,
} from "./localizedData";
import { questionIdsByObjective } from "./questionObjectives";
import { Question } from "./types";
import { MotionConfig } from "motion/react";
import { GlossarySection } from "./components/GlossarySection";
import { useLang, type UIKey } from "./i18n";
import { getDomainGuide } from "./domainGuides";
import { STORAGE_KEYS, readJSON } from "./storage";
import { sanitizeChecklist } from "./progressBackup";
import { buildAcronymIndex } from "./glossaryIndex";
import AiTrainerPanel from "./components/AiTrainerPanel";
import { useAiChat } from "./hooks/useAiChat";
import { useQuizSession } from "./hooks/useQuizSession";
import { useRemediation } from "./hooks/useRemediation";
import { useStudySession } from "./hooks/useStudySession";
import { useQuizSetup } from "./hooks/useQuizSetup";
import QuizSetupScreen from "./components/QuizSetupScreen";
import QuizResultsScreen from "./components/QuizResultsScreen";
import RemediationScreen from "./components/RemediationScreen";
import QuizQuestionScreen from "./components/QuizQuestionScreen";
import NewQuestionsModal from "./components/NewQuestionsModal";
import AppHeader, { type AppTab } from "./components/AppHeader";
import ChecklistSidebar from "./components/ChecklistSidebar";
import StudyContent from "./components/StudyContent";
import { computeReadiness } from "./readiness";
import {
  shuffle,
  selectDueReviewQuestions,
  summarizeWeakTopics,
  examBlueprint,
} from "./quiz";
import type { StudyAction } from "./studyPaths";

export default function App() {
  // Localization
  const { lang, t } = useLang();
  const DOMAIN_1_TOPICS = useMemo(() => getDomainTopics(1, lang), [lang]);
  const DOMAIN_2_TOPICS = useMemo(() => getDomainTopics(2, lang), [lang]);
  const DOMAIN_3_TOPICS = useMemo(() => getDomainTopics(3, lang), [lang]);
  const DOMAIN_4_TOPICS = useMemo(() => getDomainTopics(4, lang), [lang]);
  const DOMAIN_5_TOPICS = useMemo(() => getDomainTopics(5, lang), [lang]);
  const DOMAIN_1_QUESTIONS = useMemo(() => getDomainQuestions(1, lang), [lang]);
  const DOMAIN_2_QUESTIONS = useMemo(() => getDomainQuestions(2, lang), [lang]);
  const DOMAIN_3_QUESTIONS = useMemo(() => getDomainQuestions(3, lang), [lang]);
  const DOMAIN_4_QUESTIONS = useMemo(() => getDomainQuestions(4, lang), [lang]);
  const DOMAIN_5_QUESTIONS = useMemo(() => getDomainQuestions(5, lang), [lang]);
  // Glossary acronyms (SIEM, ZTA, ...) linked from questions and concepts.
  const GLOSSARY_INDEX = useMemo(
    () =>
      buildAcronymIndex(
        [DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS].flatMap(groups =>
          groups.flatMap(g => g.subtopics)
        )
      ),
    [DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS]
  );

  const ALL_QUESTIONS = useMemo(
    () => [
      ...DOMAIN_1_QUESTIONS,
      ...DOMAIN_2_QUESTIONS,
      ...DOMAIN_3_QUESTIONS,
      ...DOMAIN_4_QUESTIONS,
      ...DOMAIN_5_QUESTIONS,
    ],
    [DOMAIN_1_QUESTIONS, DOMAIN_2_QUESTIONS, DOMAIN_3_QUESTIONS, DOMAIN_4_QUESTIONS, DOMAIN_5_QUESTIONS]
  );

  // Navigation & General App State
  const [activeTab, setActiveTab] = useState<AppTab>("studio");
  // The study area: domain, selected concept and ticked checklist.
  const study = useStudySession();
  const { activeDomain } = study;
  const handleSwitchDomain = study.switchDomain;
  // Read once at start-up:
  // the "Where do I start?" panel opens only for a learner with no progress.
  const [isNewLearner] = useState(
    () =>
      Object.keys(sanitizeChecklist(readJSON<unknown>(STORAGE_KEYS.checklist, {}))).length === 0 &&
      readJSON<unknown[]>(STORAGE_KEYS.quizHistory, []).length === 0
  );
  const DOMAIN_GUIDE = useMemo(() => getDomainGuide(activeDomain, lang), [activeDomain, lang]);
  // The AI panel is 380px wide: opening it by default on a phone would leave
  // no room for the content it is supposed to comment on.
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1024
  );

  // The AI Trainer conversation, shared by the panel, the study view and the glossary.
  const chat = useAiChat();

  // Inline notification, replacing window.alert().
  const [toast, setToast] = useState<string | null>(null);

  // Quiz state
  // Objective of the run in progress, when it is an objective quiz.
  const [activeObjective, setActiveObjective] = useState<string | null>(null);
  // The adaptive remediation; a 401 from the server opens the access-code form.
  const remediation = useRemediation({ onLocked: chat.lock });
  const {
    remediationActive, remediationQuestions, remediationIndex, remediationSelected,
    remediationShowFeedback, remediationCompleted,
  } = remediation;
  const handleRemediationSelect = remediation.select;
  const handleRemediationConfirm = remediation.confirm;
  const handleRemediationNext = remediation.next;
  const handleStartRemediation = () => remediation.start(activeQuestions, wrongQuestions);
  const [showNewQuestionsModal, setShowNewQuestionsModal] = useState(false);

  // The simulator run and the progress it saves; the timer pauses during the remediation.
  const quiz = useQuizSession({ paused: remediationActive });
  const {
    activeQuestions, quizStarted, currentQuestionIndex, selectedOptions,
    quizCompleted, showFeedback, wrongQuestions,
    setTimerEnabled, questionProgress,
  } = quiz;
  const handleSelectOption = quiz.select;
  const handleConfirmAnswer = quiz.confirm;
  const handleNextQuestion = quiz.next;
  const handleClearHistory = quiz.clearHistory;

  // Topics of the domain on screen, and a question for the AI Trainer from anywhere.
  const STUDY_TOPICS = [DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS][activeDomain - 1];
  const askTrainer = (prompt: string) => {
    setSidebarOpen(true);
    chat.send(prompt);
  };

  // Auto-dismiss the inline notification.
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Localized label for a question difficulty level. Falls back to the raw
  // value for levels not in the dictionary (e.g. AI-generated English levels).
  const levelLabel = (lvl: string): string => {
    const key = `level.${lvl}` as UIKey;
    const label = t(key);
    return label === key ? lvl : label;
  };

  // Render markdown helper
  // Quiz Handling

  /**
   * Starts a simulator run on the given set. Every entry point into a run
   * goes through here, so the session (useQuizSession) and the state kept in
   * App (objective, remediation) are always reset together.
   */
  const beginQuizRun = (questions: Question[]) => {
    quiz.begin(questions);
    setActiveObjective(null);
    remediation.exit();
  };

  const handleStartQuiz = () => {
    const questionsToUse = setup.draw({
      1: DOMAIN_1_QUESTIONS,
      2: DOMAIN_2_QUESTIONS,
      3: DOMAIN_3_QUESTIONS,
      4: DOMAIN_4_QUESTIONS,
      5: DOMAIN_5_QUESTIONS,
    });

    if (questionsToUse.length === 0) {
      setToast(t("quiz.selectAtLeastOne"));
      return;
    }

    beginQuizRun(questionsToUse);
  };

  const dueReviewQuestions = useMemo(
    () => selectDueReviewQuestions(ALL_QUESTIONS, questionProgress),
    [ALL_QUESTIONS, questionProgress]
  );

  const weakTopicSummary = useMemo(
    () => summarizeWeakTopics(ALL_QUESTIONS, questionProgress),
    [ALL_QUESTIONS, questionProgress]
  );

  // Question ids per official objective. Built once from the Italian source,
  // whose topics key the mapping; the ids are the same in both languages.
  const questionsByObjective = useMemo(
    () =>
      questionIdsByObjective(
        Object.fromEntries([1, 2, 3, 4, 5].map(d => [d, getDomainQuestions(d, "it")])),
        sourceQuestionId
      ),
    []
  );

  // The ten questions added last to Domain 1, offered as a short test.
  const NEW_QUESTIONS = DOMAIN_1_QUESTIONS.filter(q => q.id >= questionUid(1, 141) && q.id <= questionUid(1, 150));
  const handleStartNewQuestions = () => beginQuizRun(NEW_QUESTIONS);

  const handleStartObjectiveQuiz = (code: string = objectiveChoice) => {
    const ids = new Set(questionsByObjective.get(code) ?? []);
    const questions = ALL_QUESTIONS.filter(q => ids.has(q.id));
    if (questions.length === 0) return;
    setQuizFocus("objective");
    beginQuizRun(shuffle(questions));
    setActiveObjective(code);
  };

  // "Train objective X" from the readiness view: the same run as choosing it in the list.
  const handleTrainObjective = (code: string) => {
    setObjectiveChoice(code);
    handleStartObjectiveQuiz(code);
  };

  const readiness = useMemo(
    () => computeReadiness({ questions: ALL_QUESTIONS, progress: questionProgress, questionsByObjective }),
    [ALL_QUESTIONS, questionProgress, questionsByObjective]
  );

  const handleStartSmartReview = () => {
    if (dueReviewQuestions.length === 0) return;
    setQuizFocus("review");
    beginQuizRun(shuffle(dueReviewQuestions));
  };

  const handleRetryMistakes = () => {
    const mistakes = activeQuestions.filter(question => wrongQuestions.includes(question.id));
    if (mistakes.length === 0) return;
    setQuizFocus("review");
    beginQuizRun(shuffle(mistakes));
  };

  /* ---------------------------------------------------------------- *
   * Keyboard shortcuts for the question screens: 1-4 to pick an option,
   * Enter to confirm and to move on. Typing in the chat must not trigger them.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    // After the run, the keys still drive the remediation questions.
    if (activeTab !== "quiz" || !quizStarted || (quizCompleted && !remediationActive)) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;

      const inRemediation = remediationActive && !remediationCompleted;
      const current = inRemediation
        ? remediationQuestions[remediationIndex]
        : activeQuestions[currentQuestionIndex];
      if (!current) return;

      const digit = Number(e.key);
      if (Number.isInteger(digit) && digit >= 1 && digit <= current.options.length) {
        e.preventDefault();
        if (inRemediation) handleRemediationSelect(digit - 1);
        else handleSelectOption(digit - 1);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (inRemediation) {
          if (remediationShowFeedback) handleRemediationNext();
          else handleRemediationConfirm();
        } else if (showFeedback) {
          handleNextQuestion();
        } else {
          handleConfirmAnswer();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeTab, quizStarted, quizCompleted, remediationActive, remediationCompleted,
    remediationIndex, remediationShowFeedback, remediationSelected,
    currentQuestionIndex, showFeedback, selectedOptions, activeQuestions, remediationQuestions,
  ]);

  const maxQuestionsByDomain: Record<number, number> = {
    1: DOMAIN_1_QUESTIONS.length,
    2: DOMAIN_2_QUESTIONS.length,
    3: DOMAIN_3_QUESTIONS.length,
    4: DOMAIN_4_QUESTIONS.length,
    5: DOMAIN_5_QUESTIONS.length,
  };

  // The set-up screen: preset, questions per domain, chosen objective.
  const setup = useQuizSetup({ maxByDomain: maxQuestionsByDomain });
  const { setQuizFocus, objectiveChoice, setObjectiveChoice } = setup;
  const applyPreset = setup.applyPreset;

  /**
   * Brings an element into view once it is rendered (a tab switch mounts it on
   * the next frames) and moves keyboard focus to it or to `focusId`.
   */
  const revealElement = (id: string, focusId = id) => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let frames = 0;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
        document.getElementById(focusId)?.focus({ preventScroll: true });
      } else if (++frames < 60) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  /** Performs the jump behind a step of the "Where do I start?" paths. */
  const runStudyAction = (action: StudyAction) => {
    switch (action.kind) {
      case "guide": {
        handleSwitchDomain(action.domain);
        setActiveTab("studio");
        const openGuide = () => {
          const guide = document.getElementById(`domain_guide_${action.domain}`) as HTMLDetailsElement | null;
          if (!guide) return requestAnimationFrame(openGuide);
          guide.open = true;
          if (action.objective) {
            const target = `guide_objective_${action.objective.replace(".", "_")}`;
            revealElement(target, target);
          } else {
            revealElement(`domain_guide_${action.domain}`, `domain_guide_${action.domain}_summary`);
          }
        };
        requestAnimationFrame(openGuide);
        break;
      }
      case "glossary":
        setActiveTab("glossary");
        break;
      case "quiz":
        setActiveTab("quiz");
        applyPreset(action.preset);
        revealElement("custom_quiz_summary_box", "start_quiz_btn");
        break;
      case "exam": {
        setActiveTab("quiz");
        const weights = Object.fromEntries([1, 2, 3, 4, 5].map(d => [d, getDomainGuide(d, lang).weight]));
        setup.applyCounts(examBlueprint(weights, maxQuestionsByDomain));
        setTimerEnabled(true);
        revealElement("custom_quiz_summary_box", "start_quiz_btn");
        break;
      }
      case "review":
        setActiveTab("quiz");
        revealElement("smart_review_box", "smart_review_start_btn");
        break;
      case "objective":
        setActiveTab("quiz");
        revealElement("objective_quiz_box", "objective_select");
        break;
      case "ai":
        setSidebarOpen(true);
        revealElement("chat_text_input");
        break;
    }
  };

  return (
    // reducedMotion="user": animations follow the operating-system setting
    // "reduce motion" (WCAG 2.3.3), transforms are skipped and only opacity fades.
    <MotionConfig reducedMotion="user">
    <div className="h-screen overflow-hidden bg-slate-950 flex flex-col font-sans text-slate-100" id="app_root">
      {/* Top Professional Header - Sleek Interface Style */}
      {/* Phones and tablets: brand and language on the first row, the four
          sections as equal columns on the second, all visible without
          scrolling. From lg up everything sits on one row. */}
      <AppHeader activeTab={activeTab} onTabChange={setActiveTab} sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area Grid */}
      <div className="flex-1 flex overflow-hidden relative" id="main_split_layout">
        
        {/* TAB 1: STUDIO & CHECKLIST */}
        {activeTab === "studio" && (
          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden w-full md:h-full" id="studio_layout">
            
            {/* Left Sidebar Checklist Tree - Sleek Interface Style */}
            <ChecklistSidebar study={study} domainTopics={STUDY_TOPICS} />

            {/* Right Pane Study Core - Sleek Interface Style */}
            {/* On phones the layout stacks and scrolls: flex-none keeps the panel a
                full screen tall below the checklist instead of letting flex-1 shrink
                it to zero height. From md up the two panes sit side by side. */}
            <StudyContent study={study} domainTopics={STUDY_TOPICS} domainGuide={DOMAIN_GUIDE} glossaryIndex={GLOSSARY_INDEX} isNewLearner={isNewLearner} onStudyAction={runStudyAction} onAskTrainer={askTrainer} />
        </div>
      )}

        {/* TAB 2: HIGH-STAKES SIMULATOR - Sleek Interface Style */}
        {/* Centred with my-auto, not items-center: in a scrolling flex container
            items-center pushes the top of a tall panel out of reach (above the
            scroll origin), which hid the quiz set-up on phones. Auto margins
            centre when there is room and collapse to 0 when not. */}
        {activeTab === "quiz" && (
          <main className="flex-1 overflow-y-auto bg-slate-950 p-3 sm:p-8 flex items-start justify-center" id="quiz_layout">
            <div className="w-full max-w-2xl my-auto bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-8 relative overflow-hidden shadow-2xl" id="quiz_panel_container">
              
              {/* Animated subtle backdrop blur blobs */}
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />

              {!quizStarted ? (
                <QuizSetupScreen quiz={quiz} setup={setup} maxQuestionsByDomain={maxQuestionsByDomain} dueReviewQuestions={dueReviewQuestions} weakTopicSummary={weakTopicSummary} questionsByObjective={questionsByObjective} onStartQuiz={handleStartQuiz} onStartObjectiveQuiz={() => handleStartObjectiveQuiz()} onStartSmartReview={handleStartSmartReview} onClearHistory={handleClearHistory} onStartNewQuestions={handleStartNewQuestions} onShowNewQuestions={() => setShowNewQuestionsModal(true)} readiness={readiness} onTrainObjective={handleTrainObjective} />
              ) : quizCompleted && !remediationActive ? (
                /* Completed Screen. The remediation starts from here, so while
                   it runs its questions are shown instead (next branch). */
                <QuizResultsScreen quiz={quiz} remediation={remediation} activeObjective={activeObjective} onRestart={handleStartQuiz} onRetryMistakes={handleRetryMistakes} onStartRemediation={handleStartRemediation} onStudyAction={runStudyAction} onBackToStudio={() => setActiveTab("studio")} />
              ) : remediationActive ? (
                /* REMEDIATION ACTIVE SCREEN */
                <RemediationScreen remediation={remediation} quiz={quiz} onRegenerate={handleStartRemediation} levelLabel={levelLabel} />
              ) : (
                /* ACTIVE MAIN QUIZ QUESTION SCREEN */
                <QuizQuestionScreen quiz={quiz} glossaryIndex={GLOSSARY_INDEX} levelLabel={levelLabel} />
              )}

            </div>
          </main>
        )}

        {/* TAB 3: GLOSSARIO SY0-701 */}
        {activeTab === "glossary" && (
          <GlossarySection 
            onAskAI={(prompt) => {
              setSidebarOpen(true);
              chat.send(prompt);
            }}
          />
        )}

        {/* PERSISTENT COLLAPSIBLE AI SIDEBAR */}
        <AiTrainerPanel open={sidebarOpen} onClose={() => setSidebarOpen(false)} chat={chat} />

        {/* Modal per visualizzare i testi delle nuove domande tradotte */}
        {showNewQuestionsModal && (
          <NewQuestionsModal questions={NEW_QUESTIONS} onClose={() => setShowNewQuestionsModal(false)} onStart={() => {
            handleStartNewQuestions();
            setShowNewQuestionsModal(false);
          }} />
        )}

      </div>

      {/*
        Study-notes disclaimer.
        The READMEs already say this, but nobody using the app reads the
        README, so the statement has to live where the study happens.
      */}
      <footer
        className="shrink-0 border-t border-slate-800 bg-slate-900/50 px-3 sm:px-6 py-1.5 flex items-start gap-2 text-[10px] leading-snug text-slate-400"
        id="app_disclaimer"
      >
        <Info className="w-3 h-3 shrink-0 mt-[1px] text-slate-600" aria-hidden="true" />
        <p className="min-w-0">
          <span className="font-semibold text-slate-400">{t("disclaimer.notOfficial")}</span>{" "}
          {t("disclaimer.verify")}
        </p>
      </footer>

      {/* Inline notification (replaces window.alert) */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-[calc(100%-3rem)] bg-slate-900 border border-amber-500/40 text-amber-200 rounded-lg shadow-2xl px-4 py-3 flex items-start gap-3"
          id="app_toast"
          role="alert"
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
          <p className="text-xs leading-relaxed flex-1">{toast}</p>
          <button
            type="button"
            onClick={() => setToast(null)}
            aria-label={t("toast.dismiss")}
            className="p-0.5 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
    </MotionConfig>
  );
}
