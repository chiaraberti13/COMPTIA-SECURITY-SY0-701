import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  ShieldAlert, 
  FileText, 
  Calculator, 
  TrendingUp, 
  Lock, 
  Users, 
  Handshake, 
  CheckSquare, 
  GraduationCap, 
  Check, 
  X, 
  ChevronRight, 
  Send, 
  RefreshCw, 
  AlertTriangle, 
  Award, 
  BookOpen, 
  HelpCircle,
  Activity,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Info,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  getDomainTopics,
  getDomainQuestions,
  getInitialQuestions,
  questionUid,
  domainOfQuestion,
} from "./localizedData";
import { Subtopic, Question, ChatMessage, QuizResult, QuestionProgress } from "./types";
import { motion, AnimatePresence } from "motion/react";
import { GlossarySection } from "./components/GlossarySection";
import { useLang, localizeSubgroup, type UIKey } from "./i18n";
import { getSubgroupForSubtopic } from "./subgroups";
import { STORAGE_KEYS, readJSON, writeJSON, removeKey } from "./storage";
import {
  SECONDS_PER_QUESTION,
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
  sanitizeQuizHistory,
  sanitizeQuestionProgress,
  summarizeWeakTopics,
} from "./quiz";


export default function App() {
  // Localization
  const { lang, setLang, isLoadingLang, t } = useLang();
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
  const INITIAL_QUESTIONS = useMemo(() => getInitialQuestions(lang), [lang]);
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
  const [activeTab, setActiveTab] = useState<"studio" | "quiz" | "glossary">("studio");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeDomain, setActiveDomain] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedSubtopic, setSelectedSubtopic] = useState<Subtopic>(DOMAIN_1_TOPICS[0].subtopics[0]);
  // The AI panel is 380px wide: opening it by default on a phone would leave
  // no room for the content it is supposed to comment on.
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1024
  );

  // Inline notification, replacing window.alert().
  const [toast, setToast] = useState<string | null>(null);

  // Switch domain in Studio and update selection
  const handleSwitchDomain = (domain: 1 | 2 | 3 | 4 | 5) => {
    setActiveDomain(domain);
    const topics = 
      domain === 1 ? DOMAIN_1_TOPICS :
      domain === 2 ? DOMAIN_2_TOPICS :
      domain === 3 ? DOMAIN_3_TOPICS :
      domain === 4 ? DOMAIN_4_TOPICS :
      DOMAIN_5_TOPICS;
    setSelectedSubtopic(topics[0].subtopics[0]);
  };

  // Quiz state
  const [quizFocus, setQuizFocus] = useState<"domain1" | "domain2" | "domain3" | "domain4" | "domain5" | "mini" | "balanced" | "all" | "custom" | "review">("all");
  const [customCounts, setCustomCounts] = useState<Record<number, number>>({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5
  });
  const [activeQuestions, setActiveQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
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

  // Exam timer (opt-in): ~2 minutes per question, auto-submit on expiry.
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [timeUp, setTimeUp] = useState(false);

  // End-of-quiz answer review, driven by the answers already collected.
  const [showReview, setShowReview] = useState(false);
  const [reviewWrongOnly, setReviewWrongOnly] = useState(true);

  // Locally persisted history of completed runs.
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(
    () => sanitizeQuizHistory(readJSON<unknown>(STORAGE_KEYS.quizHistory, []))
  );
  const [questionProgress, setQuestionProgress] = useState<Record<number, QuestionProgress>>(
    () => sanitizeQuestionProgress(readJSON<unknown>(STORAGE_KEYS.questionProgress, {}))
  );

  // Remediation / Recovery State
  const [remediationActive, setRemediationActive] = useState(false);
  const [remediationQuestions, setRemediationQuestions] = useState<Question[]>([]);
  const [remediationIndex, setRemediationIndex] = useState(0);
  const [remediationSelected, setRemediationSelected] = useState<number[]>([]);
  const [remediationShowFeedback, setRemediationShowFeedback] = useState(false);
  const [remediationCompleted, setRemediationCompleted] = useState(false);
  const [remediationScore, setRemediationScore] = useState(0);
  const [isGeneratingRemediation, setIsGeneratingRemediation] = useState(false);
  const [remediationError, setRemediationError] = useState<string | null>(null);
  const [showNewQuestionsModal, setShowNewQuestionsModal] = useState(false);

  // Chat with Trainer State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "trainer",
      text: t("chat.welcome"),
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const studyPanelRef = useRef<HTMLElement>(null);
  const studyTopRef = useRef<HTMLDivElement>(null);

  // Sync scroll on chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatLoading]);

  const isFirstMount = useRef(true);

  // Scroll study panel to top when subtopic changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (studyTopRef.current) {
      try {
        studyTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {
        // Fallback for older browsers
      }
    }
    if (studyPanelRef.current) {
      studyPanelRef.current.scrollTop = 0;
      try {
        studyPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        // Fallback for older environments
      }
    }
  }, [selectedSubtopic]);

  // Scroll study panel to top/bottom
  const scrollToPanelTop = () => {
    if (studyPanelRef.current) {
      try {
        studyPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        studyPanelRef.current.scrollTop = 0;
      }
    }
  };

  const scrollToPanelBottom = () => {
    if (studyPanelRef.current) {
      try {
        studyPanelRef.current.scrollTo({ top: studyPanelRef.current.scrollHeight, behavior: "smooth" });
      } catch (e) {
        studyPanelRef.current.scrollTop = studyPanelRef.current.scrollHeight;
      }
    }
  };

  // Load checklist progress from localStorage
  useEffect(() => {
    setCheckedItems(readJSON<Record<string, boolean>>(STORAGE_KEYS.checklist, {}));
  }, []);

  // Auto-dismiss the inline notification.
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 4000);
    return () => window.clearTimeout(id);
  }, [toast]);

  // Re-resolve the selected subtopic in the active language (by checklistKey)
  // so the study panel updates instantly when the user switches language.
  useEffect(() => {
    const topics = getDomainTopics(activeDomain, lang);
    for (const g of topics) {
      const found = g.subtopics.find(s => s.checklistKey === selectedSubtopic.checklistKey);
      if (found) {
        setSelectedSubtopic(found);
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Re-map dataset-backed quiz questions to the active language (by id).
  // Remediation questions come from the AI and are left untouched.
  useEffect(() => {
    const byId = new Map(getInitialQuestions(lang).map(q => [q.id, q]));
    setActiveQuestions(prev => prev.map(q => byId.get(q.id) ?? q));
  }, [lang]);

  // Keep the trainer welcome message in sync with the active language.
  useEffect(() => {
    setChatMessages(prev =>
      prev.map(m => (m.id === "welcome" ? { ...m, text: t("chat.welcome") } : m))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Localized label for a question difficulty level. Falls back to the raw
  // value for levels not in the dictionary (e.g. AI-generated English levels).
  const levelLabel = (lvl: string): string => {
    const key = `level.${lvl}` as UIKey;
    const label = t(key);
    return label === key ? lvl : label;
  };

  // Toggle checklist checkbox
  const handleToggleCheck = (key: string) => {
    const updated = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(updated);
    writeJSON(STORAGE_KEYS.checklist, updated);
  };

  // Bulk toggle for a group of keys
  const handleToggleGroupCheck = (keys: string[]) => {
    const allChecked = keys.every(k => !!checkedItems[k]);
    const targetState = !allChecked;
    const updated = { ...checkedItems };
    keys.forEach(k => {
      updated[k] = targetState;
    });
    setCheckedItems(updated);
    writeJSON(STORAGE_KEYS.checklist, updated);
  };

  // Get matching icon for each topic group
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case "FileText": return <FileText className="w-5 h-5 text-cyan-400" />;
      case "Calculator": return <Calculator className="w-5 h-5 text-cyan-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case "Lock": return <Lock className="w-5 h-5 text-cyan-400" />;
      case "Users": return <Users className="w-5 h-5 text-cyan-400" />;
      case "Handshake": return <Handshake className="w-5 h-5 text-cyan-400" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5 text-cyan-400" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  // Render markdown helper
  const renderMarkdownToJSX = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return (
      <div className="space-y-2">
        {lines.map((line, idx) => {
          let trimmed = line.trim();
          if (trimmed === "") return <div key={idx} className="h-2" />;

          const isBullet = trimmed.startsWith("*") || trimmed.startsWith("-");
          if (isBullet) {
            trimmed = trimmed.substring(1).trim();
          }

          const parts: React.ReactNode[] = [];
          const boldRegex = /\*\*(.*?)\*\*/g;
          let lastIndex = 0;
          let match;

          while ((match = boldRegex.exec(trimmed)) !== null) {
            if (match.index > lastIndex) {
              parts.push(trimmed.substring(lastIndex, match.index));
            }
            parts.push(
              <strong key={match.index} className="font-semibold text-cyan-400">
                {match[1]}
              </strong>
            );
            lastIndex = boldRegex.lastIndex;
          }

          if (lastIndex < trimmed.length) {
            parts.push(trimmed.substring(lastIndex));
          }

          const content = parts.length > 0 ? parts : trimmed;

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-4 text-slate-300">
                <span className="text-cyan-500 mt-1.5 text-xs">●</span>
                <span className="text-sm leading-relaxed">{content}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-sm leading-relaxed text-slate-300">
              {content}
            </p>
          );
        })}
      </div>
    );
  };

  // Submit message to AI Trainer
  const handleSendChat = async (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    if (!textToSend) setChatInput("");

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const history = chatMessages
        .filter(m => m.id !== "welcome" && m.sender !== "system")
        .slice(-8)
        .map(m => ({ role: m.sender, content: m.text }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, lang })
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "trainer",
        text: data.reply,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: "system",
        text: t("chat.connectionError", { msg: err.message }),
        timestamp: new Date()
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Quiz Handling

  /**
   * Puts the simulator into a clean "question 1" state for the given set.
   * Every entry point into a run goes through here so the twelve pieces of
   * quiz state can never be reset only partially.
   */
  const beginQuizRun = (questions: Question[]) => {
    setActiveQuestions(questions);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setQuizAnswers({});
    setSelectedOptions([]);
    setShowFeedback(false);
    setQuizCompleted(false);
    setQuizScore(0);
    setWrongQuestions([]);
    setRemediationActive(false);
    setRemediationCompleted(false);
    setShowReview(false);
    setReviewWrongOnly(true);
    setTimeUp(false);
    setSecondsLeft(timerEnabled ? questions.length * SECONDS_PER_QUESTION : null);
  };

  const handleStartQuiz = () => {
    // Dynamically retrieve all questions for each domain
    const d1All = DOMAIN_1_QUESTIONS;
    const d2All = DOMAIN_2_QUESTIONS;
    const d3All = DOMAIN_3_QUESTIONS;
    const d4All = DOMAIN_4_QUESTIONS;
    const d5All = DOMAIN_5_QUESTIONS;

    const d1Selected = shuffle(d1All).slice(0, customCounts[1]);
    const d2Selected = shuffle(d2All).slice(0, customCounts[2]);
    const d3Selected = shuffle(d3All).slice(0, customCounts[3]);
    const d4Selected = shuffle(d4All).slice(0, customCounts[4]);
    const d5Selected = shuffle(d5All).slice(0, customCounts[5]);

    const questionsToUse = [
      ...d1Selected,
      ...d2Selected,
      ...d3Selected,
      ...d4Selected,
      ...d5Selected
    ];

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

  const handleSelectOption = (index: number) => {
    if (showFeedback) return;
    const current = activeQuestions[currentQuestionIndex];
    if (!current) return;
    setSelectedOptions(prev => toggleSelection(current, prev, index));
  };

  const handleConfirmAnswer = () => {
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
   * count as wrong but were never pushed by handleConfirmAnswer.
   */
  const finishQuiz = (extraWrong: number[] = []) => {
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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptions([]);
      setShowFeedback(false);
    } else {
      finishQuiz();
    }
  };

  const handleClearHistory = () => {
    setQuizHistory([]);
    removeKey(STORAGE_KEYS.quizHistory);
  };

  // Remediation Generation
  const handleStartRemediation = async () => {
    // Determine weak topics based on wrong answers
    const weakTopics = activeQuestions
      .filter(q => wrongQuestions.includes(q.id))
      .map(q => q.topic);

    // Filter duplicates
    const uniqueWeakTopics = Array.from(new Set(weakTopics));
    if (uniqueWeakTopics.length === 0) {
      // If none, default to some core topics
      uniqueWeakTopics.push("Quantitative Risk Calculation", "Risk Appetite vs Risk Tolerance", "Compliance & Privacy");
    }

    setIsGeneratingRemediation(true);
    setRemediationError(null);
    setRemediationQuestions([]);

    try {
      const res = await fetch("/api/quiz/remediation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weakTopics: uniqueWeakTopics, lang })
      });

      const data = await res.json();
      if (res.status !== 200 || data.error) {
        throw new Error(data.error || t("rem.cannotRetrieve"));
      }

      if (data.questions && data.questions.length > 0) {
        setRemediationQuestions(data.questions);
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

  const handleRemediationSelect = (index: number) => {
    if (remediationShowFeedback) return;
    const current = remediationQuestions[remediationIndex];
    if (!current) return;
    setRemediationSelected(prev => toggleSelection(current, prev, index));
  };

  const handleRemediationConfirm = () => {
    if (remediationShowFeedback) return;

    const currentQuestion = remediationQuestions[remediationIndex];
    if (!isSelectionComplete(currentQuestion, remediationSelected)) return;
    const isCorrect = isSelectionCorrect(currentQuestion, remediationSelected);

    setRemediationShowFeedback(true);

    if (isCorrect) {
      setRemediationScore(prev => prev + 1);
    }
  };

  const handleRemediationNext = () => {
    if (remediationIndex < remediationQuestions.length - 1) {
      setRemediationIndex(prev => prev + 1);
      setRemediationSelected([]);
      setRemediationShowFeedback(false);
    } else {
      setRemediationCompleted(true);
    }
  };

  /* ---------------------------------------------------------------- *
   * Exam timer
   * ---------------------------------------------------------------- */

  // Ticks once per second while a main-quiz question is on screen.
  useEffect(() => {
    if (secondsLeft === null || secondsLeft <= 0) return;
    if (!quizStarted || quizCompleted || remediationActive) return;
    const id = window.setTimeout(
      () => setSecondsLeft(prev => (prev === null ? null : prev - 1)),
      1000
    );
    return () => window.clearTimeout(id);
  }, [secondsLeft, quizStarted, quizCompleted, remediationActive]);

  // Expiry: submit whatever has been answered; the rest counts as wrong.
  useEffect(() => {
    if (secondsLeft !== 0 || !quizStarted || quizCompleted) return;
    setTimeUp(true);
    finishQuiz(unansweredIds(activeQuestions, quizAnswers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft, quizStarted, quizCompleted]);

  /* ---------------------------------------------------------------- *
   * Keyboard shortcuts for the question screens: 1-4 to pick an option,
   * Enter to confirm and to move on. Typing in the chat must not trigger them.
   * ---------------------------------------------------------------- */
  useEffect(() => {
    if (activeTab !== "quiz" || !quizStarted || quizCompleted) return;

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

  const domainMetadata = [
    { id: 1, name: t("domainMeta.1.name"), desc: t("domainMeta.1.desc") },
    { id: 2, name: t("domainMeta.2.name"), desc: t("domainMeta.2.desc") },
    { id: 3, name: t("domainMeta.3.name"), desc: t("domainMeta.3.desc") },
    { id: 4, name: t("domainMeta.4.name"), desc: t("domainMeta.4.desc") },
    { id: 5, name: t("domainMeta.5.name"), desc: t("domainMeta.5.desc") }
  ];

  const totalQuestionsSelected = (Object.values(customCounts) as number[]).reduce((sum, val) => sum + val, 0);

  // Single source of truth for "did this run pass?", used by the icon, the
  // badge and the remediation branch alike.
  const hasPassed = hasPassedRun(quizScore, activeQuestions.length);

  // Questions answered wrongly, in the order they were asked, for the review.
  const reviewQuestions = reviewWrongOnly
    ? activeQuestions.filter(q => wrongQuestions.includes(q.id))
    : activeQuestions;

  const bestHistoryPercent = quizHistory.length
    ? Math.max(...quizHistory.map(r => scorePercent(r.score, r.total)))
    : 0;
  const recentHistory = quizHistory.slice(0, 5);
  const avgHistoryPercent = recentHistory.length
    ? Math.round(
        recentHistory.reduce((sum, r) => sum + scorePercent(r.score, r.total), 0) /
          recentHistory.length
      )
    : 0;

  const applyPreset = (preset: "domain1" | "domain2" | "domain3" | "domain4" | "domain5" | "mini" | "balanced" | "all" | "custom") => {
    setQuizFocus(preset);
    if (preset === "domain1") {
      setCustomCounts({ 1: maxQuestionsByDomain[1], 2: 0, 3: 0, 4: 0, 5: 0 });
    } else if (preset === "domain2") {
      setCustomCounts({ 1: 0, 2: maxQuestionsByDomain[2], 3: 0, 4: 0, 5: 0 });
    } else if (preset === "domain3") {
      setCustomCounts({ 1: 0, 2: 0, 3: maxQuestionsByDomain[3], 4: 0, 5: 0 });
    } else if (preset === "domain4") {
      setCustomCounts({ 1: 0, 2: 0, 3: 0, 4: maxQuestionsByDomain[4], 5: 0 });
    } else if (preset === "domain5") {
      setCustomCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: maxQuestionsByDomain[5] });
    } else if (preset === "mini") {
      setCustomCounts({ 1: 2, 2: 2, 3: 2, 4: 2, 5: 2 });
    } else if (preset === "balanced") {
      setCustomCounts({ 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 });
    } else if (preset === "all") {
      setCustomCounts({
        1: maxQuestionsByDomain[1],
        2: maxQuestionsByDomain[2],
        3: maxQuestionsByDomain[3],
        4: maxQuestionsByDomain[4],
        5: maxQuestionsByDomain[5]
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-950 flex flex-col font-sans text-slate-100" id="app_root">
      {/* Top Professional Header - Sleek Interface Style */}
      <header className="min-h-16 border-b border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-3 sm:px-6 py-2 lg:py-0 lg:h-16 shrink-0 sticky top-0 z-40 backdrop-blur" id="app_header">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-600 rounded flex items-center justify-center font-bold text-lg sm:text-xl text-slate-50 shadow-md shadow-cyan-500/10 shrink-0" id="logo_icon_box">S+</div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold tracking-tight text-cyan-400 uppercase truncate" id="header_title">CompTIA Security+ SY0-701</h1>
            <p className="text-xs text-slate-400 hidden sm:block truncate" id="header_subtitle">{t("header.subtitle")}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-3 overflow-x-auto max-w-full pb-1 lg:pb-0 scrollbar-thin" id="navigation_tabs" role="tablist" aria-label={t("a11y.mainNavigation")}>
          <button 
            id="tab_btn_studio"
            role="tab"
            aria-selected={activeTab === "studio"}
            onClick={() => { setActiveTab("studio"); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "studio" ? "bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {t("tab.studio")}
          </button>
          <button 
            id="tab_btn_glossary"
            role="tab"
            aria-selected={activeTab === "glossary"}
            onClick={() => { setActiveTab("glossary"); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "glossary" ? "bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <FileText className="w-3.5 h-3.5" />
            {t("tab.glossary")}
          </button>
          <button 
            id="tab_btn_quiz"
            role="tab"
            aria-selected={activeTab === "quiz"}
            onClick={() => { setActiveTab("quiz"); }}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "quiz" ? "bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <Activity className="w-3.5 h-3.5" />
            {t("tab.quiz")}
          </button>

          <div className="h-6 w-[1px] bg-slate-700 mx-1 shrink-0"></div>

          <button 
            id="toggle_sidebar_btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-all ${sidebarOpen ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30" : "border border-slate-800 text-slate-400 hover:bg-slate-800/30"}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t("tab.aiTrainer")}</span>
          </button>

          <div className="h-6 w-[1px] bg-slate-700 mx-1 shrink-0"></div>

          {/* Language toggle IT / EN */}
          <div className="flex items-center rounded-md border border-slate-800 overflow-hidden shrink-0" id="lang_toggle" title={t("lang.label")}>
            <button
              id="lang_btn_it"
              onClick={() => setLang("it")}
              className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${lang === "it" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
            >
              IT
            </button>
            <button
              id="lang_btn_en"
              onClick={() => setLang("en")}
              disabled={isLoadingLang}
              title={isLoadingLang ? t("lang.loadingEn") : undefined}
              className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 disabled:opacity-60 ${lang === "en" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
            >
              {isLoadingLang && <RefreshCw className="w-3 h-3 animate-spin" />}
              EN
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area Grid */}
      <div className="flex-1 flex overflow-hidden relative" id="main_split_layout">
        
        {/* TAB 1: STUDIO & CHECKLIST */}
        {activeTab === "studio" && (
          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden w-full md:h-full" id="studio_layout">
            
            {/* Left Sidebar Checklist Tree - Sleek Interface Style */}
            <aside className="w-full md:w-80 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/30 p-4 flex flex-col shrink-0" id="checklist_sidebar">
              <div className="mb-4 pb-2 border-b border-slate-800/60" id="checklist_header">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("sidebar.browseChecklist")}</h2>
                <p className="text-[11px] text-slate-500 mt-1 mb-3">{t("sidebar.selectAndCheck")}</p>
                <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
                  <button
                    onClick={() => handleSwitchDomain(1)}
                    className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 1 ? "bg-cyan-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t("sidebar.domShort", { n: 1 })}
                  </button>
                  <button
                    onClick={() => handleSwitchDomain(2)}
                    className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 2 ? "bg-cyan-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t("sidebar.domShort", { n: 2 })}
                  </button>
                  <button
                    onClick={() => handleSwitchDomain(3)}
                    className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 3 ? "bg-cyan-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t("sidebar.domShort", { n: 3 })}
                  </button>
                  <button
                    onClick={() => handleSwitchDomain(4)}
                    className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 4 ? "bg-cyan-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t("sidebar.domShort", { n: 4 })}
                  </button>
                  <button
                    onClick={() => handleSwitchDomain(5)}
                    className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 5 ? "bg-cyan-600 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
                  >
                    {t("sidebar.domShort", { n: 5 })}
                  </button>
                </div>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent" id="checklist_topics_list">
                {(activeDomain === 1 ? DOMAIN_1_TOPICS : activeDomain === 2 ? DOMAIN_2_TOPICS : activeDomain === 3 ? DOMAIN_3_TOPICS : activeDomain === 4 ? DOMAIN_4_TOPICS : DOMAIN_5_TOPICS).map((group, groupIdx) => (
                  <div key={groupIdx} className="space-y-1.5" id={`group_${groupIdx}`}>
                    <div className="flex items-center gap-2 px-2 py-0.5" id={`group_title_${groupIdx}`}>
                      {getTopicIcon(group.icon)}
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">{group.title}</span>
                    </div>

                    <div className="space-y-3 pl-1" id={`group_subtopics_${groupIdx}`}>
                      {(() => {
                        const orderedUnits: { type: "subgroup" | "standalone"; name: string; key: string; subtopics: Subtopic[] }[] = [];
                        const seenSubgroups = new Set<string>();

                        group.subtopics.forEach((sub) => {
                          const sg = getSubgroupForSubtopic(sub.checklistKey);
                          if (sg) {
                            if (!seenSubgroups.has(sg)) {
                              seenSubgroups.add(sg);
                              orderedUnits.push({
                                type: "subgroup",
                                // `key` stays the canonical Italian name: it identifies the
                                // unit in stored progress. Only the label is localized.
                                name: localizeSubgroup(sg, lang),
                                key: sg,
                                subtopics: group.subtopics.filter(s => getSubgroupForSubtopic(s.checklistKey) === sg)
                              });
                            }
                          } else {
                            orderedUnits.push({
                              type: "standalone",
                              name: sub.name,
                              key: sub.checklistKey,
                              subtopics: [sub]
                            });
                          }
                        });

                        return (
                          <div className="space-y-0.5 pl-1" id={`units_list_${groupIdx}`}>
                            {orderedUnits.map((unit, unitIdx) => {
                              const isSelected = unit.subtopics.some(s => s.checklistKey === selectedSubtopic.checklistKey);
                              const isAllChecked = unit.subtopics.every(s => !!checkedItems[s.checklistKey]);
                              const isSomeChecked = unit.subtopics.some(s => !!checkedItems[s.checklistKey]) && !isAllChecked;
                              const completedCount = unit.subtopics.filter(s => !!checkedItems[s.checklistKey]).length;
                              const totalCount = unit.subtopics.length;

                              return (
                                <div 
                                  key={unit.key} 
                                  id={`unit_${groupIdx}_${unitIdx}`}
                                  role="button"
                                  tabIndex={0}
                                  aria-current={isSelected}
                                  aria-label={t("a11y.selectTopic", { name: unit.name })}
                                  className={`group flex items-center justify-between p-2 rounded border border-transparent transition-all cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500 ${isSelected ? "bg-cyan-500/10 border-l-2 border-l-cyan-500 text-cyan-50 font-medium" : "text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-900/30"}`}
                                  onClick={() => setSelectedSubtopic(unit.subtopics[0])}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                      e.preventDefault();
                                      setSelectedSubtopic(unit.subtopics[0]);
                                    }
                                  }}
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1" id={`unit_label_${groupIdx}_${unit.key}`}>
                                    {/* Checklist checkbox for bulk selection of all subtopics in subgroup */}
                                    <button 
                                      id={`unit_check_box_${groupIdx}_${unit.key}`}
                                      role="checkbox"
                                      aria-checked={isAllChecked ? true : isSomeChecked ? "mixed" : false}
                                      aria-label={t("a11y.toggleCheck", { name: unit.name })}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleGroupCheck(unit.subtopics.map(s => s.checklistKey));
                                      }}
                                      className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${isAllChecked ? "bg-cyan-500 border-cyan-500 text-slate-950" : isSomeChecked ? "border-cyan-600 bg-cyan-950/40 text-cyan-400" : "border-slate-700 hover:border-slate-500 bg-slate-950"}`}
                                    >
                                      {isAllChecked ? (
                                        <Check className="w-3 h-3 stroke-[3]" />
                                      ) : isSomeChecked ? (
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
                                      ) : null}
                                    </button>
                                    
                                    <div className="flex flex-col min-w-0" id={`unit_text_${unit.key}`}>
                                      <span className="truncate text-xs text-slate-300 group-hover:text-cyan-200 transition-colors font-medium leading-tight">
                                        {unit.name}
                                      </span>
                                      {totalCount > 1 && (
                                        <span className="text-[9px] font-mono text-slate-500 group-hover:text-slate-400 transition-colors leading-none mt-0.5">
                                          {t("common.completedOf", { done: completedCount, total: totalCount })}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${isSelected ? "text-cyan-400 translate-x-0.5" : "text-slate-600"}`} />
                                </div>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Tracker Widget inspired by Design HTML */}
              <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-800" id="checklist_progress_box">
                <div className="flex justify-between text-[10px] text-slate-500 mb-2">
                  <span className="uppercase font-semibold font-mono tracking-wider">{t("sidebar.domainProgress", { n: activeDomain })}</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {(() => {
                      const subs = (activeDomain === 1 ? DOMAIN_1_TOPICS : activeDomain === 2 ? DOMAIN_2_TOPICS : activeDomain === 3 ? DOMAIN_3_TOPICS : activeDomain === 4 ? DOMAIN_4_TOPICS : DOMAIN_5_TOPICS).flatMap(g => g.subtopics);
                      const checkedCount = subs.filter(sub => !!checkedItems[sub.checklistKey]).length;
                      return `${checkedCount} / ${subs.length}`;
                    })()}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-cyan-500 transition-all duration-300" 
                    style={{ 
                      width: `${(() => {
                        const subs = (activeDomain === 1 ? DOMAIN_1_TOPICS : activeDomain === 2 ? DOMAIN_2_TOPICS : activeDomain === 3 ? DOMAIN_3_TOPICS : activeDomain === 4 ? DOMAIN_4_TOPICS : DOMAIN_5_TOPICS).flatMap(g => g.subtopics);
                        const checkedCount = subs.filter(sub => !!checkedItems[sub.checklistKey]).length;
                        return subs.length ? (checkedCount / subs.length) * 100 : 0;
                      })()}%` 
                    }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-500 mt-2.5 italic">{t("sidebar.passingScore")}</p>
              </div>
            </aside>

            {/* Right Pane Study Core - Sleek Interface Style */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative" id="study_panel_wrapper">
              <main ref={studyPanelRef} className="flex-1 overflow-y-auto bg-slate-950 p-8 pb-24" id="study_panel">
              <div ref={studyTopRef} className="h-0 w-full pointer-events-none opacity-0" id="study_top_anchor" />
              {(() => {
                const subgroupName = getSubgroupForSubtopic(selectedSubtopic.checklistKey);
                const currentSubgroupSubtopics = (() => {
                  if (!subgroupName) return [selectedSubtopic];
                  const domainTopics = activeDomain === 1 ? DOMAIN_1_TOPICS : activeDomain === 2 ? DOMAIN_2_TOPICS : activeDomain === 3 ? DOMAIN_3_TOPICS : activeDomain === 4 ? DOMAIN_4_TOPICS : DOMAIN_5_TOPICS;
                  const list: Subtopic[] = [];
                  domainTopics.forEach(g => {
                    g.subtopics.forEach(sub => {
                      if (getSubgroupForSubtopic(sub.checklistKey) === subgroupName) {
                        list.push(sub);
                      }
                    });
                  });
                  return list.length > 0 ? list : [selectedSubtopic];
                })();

                const completedInGroup = currentSubgroupSubtopics.filter(s => !!checkedItems[s.checklistKey]).length;
                const totalInGroup = currentSubgroupSubtopics.length;
                const percentComplete = totalInGroup > 0 ? Math.round((completedInGroup / totalInGroup) * 100) : 0;

                return (
                  <div className="max-w-3xl mx-auto space-y-8" id="study_content_container">
                    
                    {/* Topic Header Card */}
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg relative overflow-hidden shadow-md" id="topic_hero_card">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest mb-3" id="topic_crumbs">
                        <span>{t("study.domain")} {activeDomain}</span>
                        <span>·</span>
                        <span>{t(`domainCrumb.${activeDomain}` as UIKey)}</span>
                        {subgroupName && (
                          <>
                            <span>·</span>
                            <span className="text-slate-400">{localizeSubgroup(subgroupName, lang)}</span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl font-bold text-slate-100 mb-3" id="topic_title">
                        {subgroupName ? localizeSubgroup(subgroupName, lang) : selectedSubtopic.name}
                      </h2>

                      <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-cyan-500 pl-4 bg-cyan-500/[0.03] py-2 rounded-r mb-4" id="topic_definition">
                        {subgroupName
                          ? t("study.unifiedCard", { n: totalInGroup, name: localizeSubgroup(subgroupName, lang) })
                          : selectedSubtopic.definition}
                      </p>

                      {/* Unified Category Progress bar */}
                      {totalInGroup > 1 && (
                        <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg space-y-2 mt-4" id="category_progress_wrapper">
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400 font-medium">{t("study.categoryProgress")}</span>
                            <span className="font-mono font-bold text-cyan-400">{t("study.completedPercent", { done: completedInGroup, total: totalInGroup, percent: percentComplete })}</span>
                          </div>
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-cyan-500 transition-all duration-300" 
                              style={{ width: `${percentComplete}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Render each subtopic of this category/subgroup as a beautiful structured card */}
                    <div className="space-y-8" id="concepts_cards_list">
                      {currentSubgroupSubtopics.map((sub, idx) => {
                        const isChecked = !!checkedItems[sub.checklistKey];
                        return (
                          <div key={sub.checklistKey} className="bg-slate-900 border border-slate-800/80 rounded-lg p-6 space-y-6 relative shadow-lg hover:border-slate-700/65 transition-all" id={`concept_card_${sub.checklistKey}`}>
                            {/* Card Header with Name and its own checkbox */}
                            <div className="flex justify-between items-start gap-4 border-b border-slate-800/80 pb-3" id={`concept_hdr_${sub.checklistKey}`}>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-1 border border-cyan-900 rounded select-none">
                                  {t("study.conceptOf", { i: idx + 1, n: totalInGroup })}
                                </span>
                                <h3 className="text-lg font-bold text-slate-100">{sub.name}</h3>
                              </div>
                              
                              {/* Individual checklist checkbox */}
                              <div className="flex items-center gap-2" id={`concept_check_wrapper_${sub.checklistKey}`}>
                                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">{t("study.completed")}</span>
                                <button 
                                  id={`concept_check_${sub.checklistKey}`}
                                  role="checkbox"
                                  aria-checked={isChecked}
                                  aria-label={t("a11y.toggleCheck", { name: sub.name })}
                                  onClick={() => handleToggleCheck(sub.checklistKey)}
                                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${isChecked ? "bg-cyan-500 border-cyan-500 text-slate-950" : "border-slate-700 hover:border-slate-500 bg-slate-950"}`}
                                >
                                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>
                              </div>
                            </div>

                            {/* Definition */}
                            <div className="bg-cyan-500/[0.02] border-l-2 border-cyan-500 pl-4 py-2.5 rounded-r" id={`concept_def_${sub.checklistKey}`}>
                              <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                {sub.definition}
                              </p>
                            </div>

                            {/* Detailed Analysis */}
                            <div className="space-y-3" id={`concept_details_${sub.checklistKey}`}>
                              <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                                <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{t("study.detailedAnalysis")}</span>
                              </div>
                              <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                                {renderMarkdownToJSX(sub.details)}
                              </div>
                            </div>

                            {/* Key Formulas (if any) */}
                            {sub.keyFormulas && sub.keyFormulas.length > 0 && (
                              <div className="bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-4 space-y-2.5" id={`concept_formulas_${sub.checklistKey}`}>
                                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-wider">
                                  <Calculator className="w-3.5 h-3.5" />
                                  <span>{t("study.keyFormulas")}</span>
                                </div>
                                <ul className="space-y-1.5">
                                  {sub.keyFormulas.map((f, fIdx) => (
                                    <li key={fIdx} className="text-xs font-mono text-slate-300 flex items-start gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                                      <span className="text-cyan-400 font-bold select-none">{fIdx + 1}.</span>
                                      <span>{f}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Comparative Table (if any) */}
                            {sub.comparativeTable && (
                              <div className="space-y-2.5" id={`concept_table_${sub.checklistKey}`}>
                                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{t("study.comparativeTable")}</span>
                                </div>
                                <div className="overflow-x-auto border border-slate-800 rounded bg-slate-950">
                                  <table className="w-full text-left border-collapse text-xs">
                                    <thead>
                                      <tr className="border-b border-slate-800 bg-slate-900/60 font-bold tracking-wider">
                                        {sub.comparativeTable.headers.map((h, hIdx) => (
                                          <th key={hIdx} className="px-3 py-2.5 text-slate-400 uppercase font-mono text-[9px]">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {sub.comparativeTable.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="border-b border-slate-800/50 hover:bg-slate-900/20">
                                          {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="px-3 py-2 text-slate-300 leading-normal">{cell}</td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}

                            {/* Exam Tip */}
                            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3.5 items-start" id={`concept_tip_${sub.checklistKey}`}>
                              <div className="p-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 shrink-0">
                                <Sparkles className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="text-slate-200 font-semibold text-xs mb-1">{t("study.examTipTitle")}</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">{sub.examTip}</p>
                              </div>
                            </div>

                            {/* Pre-filled Chat Helper for this sub-concept */}
                            <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg" id={`concept_chat_trigger_${sub.checklistKey}`}>
                              <div className="flex items-center gap-2">
                                <Info className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-xs text-slate-400">{t("study.doubtsAbout", { name: sub.name })}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setSidebarOpen(true);
                                  handleSendChat(t("study.askPrompt", { name: sub.name }));
                                }}
                                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold px-3 py-1.5 rounded transition-colors flex items-center gap-1 border border-slate-700"
                              >
                                {t("study.askExplanation")}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                  </div>
                );
              })()}
            </main>

            {/* Pulsanti di scorrimento rapido (Su/Giù) */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2.5 z-30" id="scroll_controls">
              <button
                onClick={scrollToPanelTop}
                className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 shadow-xl shadow-black/60 transition-all duration-200 group flex items-center justify-center backdrop-blur-sm"
                title={t("study.scrollTop")}
                aria-label={t("study.scrollTop")}
              >
                <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              </button>
              <button
                onClick={scrollToPanelBottom}
                className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 shadow-xl shadow-black/60 transition-all duration-200 group flex items-center justify-center backdrop-blur-sm"
                title={t("study.scrollBottom")}
                aria-label={t("study.scrollBottom")}
              >
                <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>

          </div>
        </div>
      )}

        {/* TAB 2: HIGH-STAKES SIMULATOR - Sleek Interface Style */}
        {activeTab === "quiz" && (
          <main className="flex-1 overflow-y-auto bg-slate-950 p-3 sm:p-8 flex items-center justify-center" id="quiz_layout">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-8 relative overflow-hidden shadow-2xl" id="quiz_panel_container">
              
              {/* Animated subtle backdrop blur blobs */}
              <div className="absolute -top-16 -left-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl" />

              {!quizStarted ? (
                /* Start Quiz Panel */
                <div className="text-left space-y-6" id="quiz_start_screen">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto shadow-inner" id="start_icon_box">
                      <Activity className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-slate-100" id="start_screen_title">{t("quiz.title")}</h2>
                      <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                        {t("quiz.subtitle")}
                      </p>
                    </div>
                  </div>

                  {/* Local, privacy-first spaced repetition queue. */}
                  <div className="bg-cyan-950/20 border border-cyan-500/25 p-4 rounded-lg" id="smart_review_box">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                          <h3 className="text-xs font-bold text-cyan-300">{t("quiz.smartReviewTitle")}</h3>
                          <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                            {dueReviewQuestions.length}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {dueReviewQuestions.length > 0
                            ? t("quiz.smartReviewReady", { n: dueReviewQuestions.length })
                            : t("quiz.smartReviewEmpty")}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleStartSmartReview}
                        disabled={dueReviewQuestions.length === 0}
                        className="w-full sm:w-auto shrink-0 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold px-4 py-2 rounded text-[11px] transition-colors"
                      >
                        {t("quiz.smartReviewStart")}
                      </button>
                    </div>
                  </div>

                  {weakTopicSummary.length > 0 && (
                    <section
                      className="bg-slate-950/60 border border-slate-800 p-4 rounded-lg space-y-3"
                      id="weak_topics_summary"
                      aria-labelledby="weak_topics_summary_title"
                    >
                      <div className="space-y-1">
                        <h3 id="weak_topics_summary_title" className="text-xs font-bold text-slate-200">
                          {t("quiz.weakTopicsTitle")}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {t("quiz.weakTopicsDesc")}
                        </p>
                      </div>
                      <ul className="space-y-2">
                        {weakTopicSummary.map(item => (
                          <li key={item.topic} className="space-y-1.5">
                            <div className="flex items-center justify-between gap-3 text-[11px]">
                              <span className="text-slate-300 truncate" title={item.topic}>{item.topic}</span>
                              <span className="font-mono text-slate-400 shrink-0">
                                {t("quiz.weakTopicsAccuracy", { percent: item.accuracy, n: item.attempts })}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden" aria-hidden="true">
                              <div
                                className={`h-full rounded-full ${item.accuracy >= 80 ? "bg-cyan-500" : item.accuracy >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                                style={{ width: `${item.accuracy}%` }}
                              />
                            </div>
                            {item.due > 0 && (
                              <span className="block text-[10px] font-mono text-cyan-400">
                                {t("quiz.weakTopicsDue", { n: item.due })}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {/* Highlight: Nuove Domande Caricate */}
                  <div className="bg-slate-950/60 border border-cyan-500/20 p-4 rounded-lg space-y-3 shadow-inner" id="new_questions_highlight_box">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-extrabold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2 py-0.5 rounded uppercase tracking-wider">{t("quiz.newBadge")}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-200">{t("quiz.newTitle")}</h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {t("quiz.newDesc")}
                        </p>
                      </div>
                      <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => {
                            beginQuizRun(
                              DOMAIN_1_QUESTIONS.filter(
                                q => q.id >= questionUid(1, 141) && q.id <= questionUid(1, 150)
                              )
                            );
                          }}
                          className="flex-1 sm:flex-initial bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-2 rounded text-[11px] transition-colors shadow-md shadow-cyan-600/10 text-center"
                        >
                          {t("quiz.startTest10")}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNewQuestionsModal(true)}
                          className="flex-1 sm:flex-initial border border-slate-800 hover:border-slate-700 hover:text-slate-200 text-slate-400 font-bold px-3 py-2 rounded text-[11px] bg-slate-900 transition-colors text-center"
                        >
                          {t("quiz.readTexts")}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preset Configurations */}
                  <div className="space-y-2 bg-slate-950/40 border border-slate-800/60 p-4 rounded-md" id="presets_container">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-2">{t("quiz.selectPreset")}</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => applyPreset("mini")}
                        className={`px-3 py-2 rounded text-xs font-semibold border transition-all ${quizFocus === "mini" ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"}`}
                      >
                        {t("quiz.presetMini")}
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("balanced")}
                        className={`px-3 py-2 rounded text-xs font-semibold border transition-all ${quizFocus === "balanced" ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"}`}
                      >
                        {t("quiz.presetBalanced")}
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPreset("all")}
                        className={`px-3 py-2 rounded text-xs font-semibold border transition-all ${quizFocus === "all" ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"}`}
                      >
                        {t("quiz.presetAll")}
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuizFocus("custom")}
                        className={`px-3 py-2 rounded text-xs font-semibold border transition-all ${quizFocus === "custom" ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-200"}`}
                      >
                        {t("quiz.presetCustom")}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-slate-800/40">
                      <span className="text-[9px] text-slate-500 font-mono flex items-center mr-1">{t("quiz.onlyDomain")}</span>
                      {[1, 2, 3, 4, 5].map(domNum => (
                        <button
                          key={domNum}
                          type="button"
                          onClick={() => applyPreset(`domain${domNum}` as any)}
                          className={`px-2 py-1 rounded text-[10px] font-mono border transition-all ${quizFocus === `domain${domNum}` ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-500 hover:border-slate-700 hover:text-slate-300"}`}
                        >
                          DOM {domNum}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Domain-specific Question Count Sliders */}
                  <div className="space-y-4" id="domain_sliders_list">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">{t("quiz.customizePerDomain")}</label>
                    <div className="space-y-3">
                      {domainMetadata.map((dom) => {
                        const maxVal = maxQuestionsByDomain[dom.id] || 0;
                        const currentVal = customCounts[dom.id] || 0;

                        const handleDecrement = () => {
                          setQuizFocus("custom");
                          setCustomCounts(prev => ({
                            ...prev,
                            [dom.id]: Math.max(0, currentVal - 1)
                          }));
                        };

                        const handleIncrement = () => {
                          setQuizFocus("custom");
                          setCustomCounts(prev => ({
                            ...prev,
                            [dom.id]: Math.min(maxVal, currentVal + 1)
                          }));
                        };

                        const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                          setQuizFocus("custom");
                          const val = parseInt(e.target.value) || 0;
                          setCustomCounts(prev => ({
                            ...prev,
                            [dom.id]: val
                          }));
                        };

                        return (
                          <div key={dom.id} className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg space-y-2 hover:border-slate-700 transition-colors">
                            <div className="flex justify-between items-start gap-2">
                              <div className="space-y-0.5">
                                <span className="text-xs font-bold text-slate-200 block">{dom.name}</span>
                                <span className="text-[10px] text-slate-500 block leading-relaxed">{dom.desc}</span>
                              </div>
                              <div className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-cyan-400 whitespace-nowrap">
                                {currentVal} / {maxVal}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                aria-label={t("a11y.decreaseDomainQuestions", { n: dom.id })}
                                onClick={handleDecrement}
                                disabled={currentVal <= 0}
                                className="w-7 h-7 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors text-slate-400 text-xs font-mono font-bold"
                              >
                                -
                              </button>
                              
                              <input
                                type="range"
                                aria-label={t("a11y.domainQuestionCount", { n: dom.id })}
                                min={0}
                                max={maxVal}
                                value={currentVal}
                                onChange={handleSliderChange}
                                className="flex-1 accent-cyan-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                              />

                              <button
                                type="button"
                                aria-label={t("a11y.increaseDomainQuestions", { n: dom.id })}
                                onClick={handleIncrement}
                                disabled={currentVal >= maxVal}
                                className="w-7 h-7 flex items-center justify-center bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:pointer-events-none transition-colors text-slate-400 text-xs font-mono font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary & Run constraints */}
                  {/* Exam timer opt-in */}
                  <div className="bg-slate-950/40 border border-slate-800/60 p-4 rounded-md" id="timer_toggle_box">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        id="timer_toggle_input"
                        checked={timerEnabled}
                        onChange={(e) => setTimerEnabled(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                      <span className="space-y-0.5">
                        <span className="text-xs font-bold text-slate-200 block">{t("quiz.timerEnable")}</span>
                        <span className="text-[10px] text-slate-500 block leading-relaxed">{t("quiz.timerHint")}</span>
                      </span>
                    </label>
                  </div>

                  <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4" id="custom_quiz_summary_box">
                    <div className="text-left space-y-1">
                      <div className="text-xs font-mono text-slate-400">{t("quiz.configSummary")}</div>
                      <div className="text-sm font-bold text-slate-100 font-sans">
                        <span className="text-cyan-400 font-mono text-lg">{totalQuestionsSelected}</span> {t("quiz.highStakesSelected")}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {t("quiz.thresholdTime", { min: totalQuestionsSelected * 2 })}
                      </div>
                    </div>

                    <button 
                      id="start_quiz_btn"
                      disabled={totalQuestionsSelected <= 0}
                      onClick={handleStartQuiz}
                      className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-800 disabled:shadow-none text-white font-bold px-6 py-3 rounded hover:shadow-lg hover:shadow-cyan-500/10 transition-all inline-flex items-center justify-center gap-2 border border-cyan-500/30"
                    >
                      {t("quiz.startSimulator")}
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded border border-slate-800 max-w-md mx-auto text-left space-y-2 text-xs font-mono" id="quiz_rules_box">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <Check className="w-4 h-4" />
                      <span>{t("quiz.rulesTitle")}</span>
                    </div>
                    <p className="text-slate-400">{t("quiz.rule1")}</p>
                    <p className="text-slate-400">{t("quiz.rule2")}</p>
                    <p className="text-slate-400">{t("quiz.rule3")}</p>
                  </div>

                  {/* Locally stored history of past runs */}
                  <div className="bg-slate-950 p-4 rounded border border-slate-800 max-w-md mx-auto text-left space-y-3" id="quiz_history_box">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4" />
                        <span>{t("quiz.historyTitle")}</span>
                      </div>
                      {quizHistory.length > 0 && (
                        <button
                          type="button"
                          id="clear_history_btn"
                          onClick={handleClearHistory}
                          className="text-[10px] text-slate-500 hover:text-rose-400 underline underline-offset-2 transition-colors"
                        >
                          {t("quiz.historyClear")}
                        </button>
                      )}
                    </div>

                    {quizHistory.length === 0 ? (
                      <p className="text-[11px] text-slate-500 italic">{t("quiz.historyEmpty")}</p>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-slate-400">
                          <span>{t("quiz.historyBest", { percent: bestHistoryPercent })}</span>
                          <span>{t("quiz.historyAvg", { n: recentHistory.length, percent: avgHistoryPercent })}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {recentHistory.map((r) => {
                            const percent = scorePercent(r.score, r.total);
                            return (
                              <li
                                key={r.at}
                                className="flex items-center justify-between gap-3 text-[11px] font-mono bg-slate-900/60 border border-slate-800 rounded px-2.5 py-1.5"
                              >
                                <span className="text-slate-500">
                                  {new Date(r.at).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                  })}
                                  {" · "}
                                  {t("sidebar.domShort", { n: r.domains.join("/") })}
                                </span>
                                <span className="flex items-center gap-2">
                                  <span className="text-slate-300">{r.score}/{r.total}</span>
                                  <span className={r.passed ? "text-cyan-400 font-bold" : "text-rose-400 font-bold"}>
                                    {percent}%
                                  </span>
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              ) : quizCompleted ? (
                /* Completed Screen */
                <div className="space-y-6" id="quiz_completed_screen">
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${hasPassed ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" : "bg-rose-500/10 border border-rose-500/30 text-rose-400"}`} id="completed_icon_box">
                      {hasPassed ? <Award className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-slate-100" id="completed_title">{t("quiz.completedTitle")}</h2>
                      <p className="text-slate-400 font-mono text-xs">{t("quiz.resultFor")}</p>
                    </div>

                    <div className="inline-block bg-slate-950 px-6 py-4 rounded border border-slate-800 shadow-inner" id="score_badge_box">
                      <div className="text-3xl font-extrabold text-slate-100 font-mono" id="score_digits">{quizScore} / {activeQuestions.length}</div>
                      <div className={`text-xs font-mono font-bold uppercase mt-1 tracking-wider ${hasPassed ? "text-cyan-400" : "text-rose-400"}`} id="score_status">
                        {hasPassed ? t("quiz.passed") : t("quiz.failed")}
                      </div>
                    </div>
                  </div>

                  {timeUp && (
                    <div
                      className="bg-amber-500/5 border border-amber-500/25 p-4 rounded flex gap-3 items-start"
                      id="time_up_box"
                      role="status"
                    >
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-amber-400 font-mono">{t("quiz.timeUpTitle")}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{t("quiz.timeUpDesc")}</p>
                      </div>
                    </div>
                  )}

                  {wrongQuestions.length > 0 ? (
                    /* Remediation Prompt */
                    <div className="bg-slate-950 border border-rose-500/20 p-5 rounded space-y-4" id="remediation_box">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 flex-shrink-0" />
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-rose-400 font-mono" id="remediation_title">{t("quiz.weaknessAnalysis")}</h4>
                          <p className="text-xs text-slate-400 leading-relaxed" id="remediation_desc">
                            {t("quiz.weaknessDesc")}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2" id="weak_topics_chips">
                        {Array.from(new Set(wrongQuestions.map(id => activeQuestions.find(q => q.id === id)?.topic))).map((t, idx) => (
                          <span key={idx} className="bg-rose-500/5 text-rose-300 border border-rose-500/20 px-2.5 py-1 rounded text-xs font-mono" id={`weak_chip_${idx}`}>
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-4" id="remediation_actions">
                        <p className="text-xs text-slate-400 max-w-[340px]">
                          {t("quiz.remediationOffer")}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                          <button
                            type="button"
                            id="retry_mistakes_btn"
                            onClick={handleRetryMistakes}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2 text-xs rounded transition-all flex items-center justify-center gap-1"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            {t("quiz.retryMistakes")}
                          </button>
                          <button
                            type="button"
                            id="trigger_remediation_btn"
                            disabled={isGeneratingRemediation}
                            onClick={handleStartRemediation}
                            className="bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 text-white font-bold px-4 py-2 text-xs rounded transition-all flex items-center justify-center gap-1 shadow-md shadow-rose-600/10"
                          >
                            {isGeneratingRemediation ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                {t("quiz.generating")}
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5" />
                                {t("quiz.startAdaptive")}
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {remediationError && (
                        <p className="text-xs text-rose-400 font-mono mt-1" id="remediation_err_text">⚠️ {remediationError}</p>
                      )}
                    </div>
                  ) : (
                    /* Passed Message */
                    <div className="bg-cyan-950/20 border border-cyan-900/50 p-5 rounded flex gap-3 shadow-md" id="passed_box">
                      <Award className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-cyan-400 font-mono" id="passed_title">{t("quiz.excellentTitle")}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed" id="passed_desc">
                          {t("quiz.excellentDesc")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Answer review: every answer given is already in quizAnswers. */}
                  <div className="border-t border-slate-800 pt-5 space-y-4" id="quiz_review_section">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        {t("quiz.reviewTitle")}
                      </h4>
                      <button
                        type="button"
                        id="toggle_review_btn"
                        aria-expanded={showReview}
                        aria-controls="quiz_review_list"
                        onClick={() => setShowReview(prev => !prev)}
                        className="text-[11px] font-bold px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                      >
                        {showReview ? t("quiz.reviewHide") : t("quiz.reviewShow")}
                      </button>
                    </div>

                    {showReview && (
                      <div className="space-y-4" id="quiz_review_list">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setReviewWrongOnly(true)}
                            aria-pressed={reviewWrongOnly}
                            className={`px-3 py-1.5 rounded text-[11px] font-semibold border transition-all ${reviewWrongOnly ? "border-rose-500 bg-rose-500/10 text-rose-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"}`}
                          >
                            {t("quiz.reviewFilterWrong", { n: wrongQuestions.length })}
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewWrongOnly(false)}
                            aria-pressed={!reviewWrongOnly}
                            className={`px-3 py-1.5 rounded text-[11px] font-semibold border transition-all ${!reviewWrongOnly ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700"}`}
                          >
                            {t("quiz.reviewFilterAll", { n: activeQuestions.length })}
                          </button>
                        </div>

                        {reviewQuestions.length === 0 ? (
                          <p className="text-xs text-slate-400 bg-slate-950 border border-slate-800 rounded p-4">
                            {t("quiz.reviewAllCorrect")}
                          </p>
                        ) : (
                          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                            {reviewQuestions.map(q => {
                              const given = quizAnswers[q.id];
                              const answered = given !== undefined;
                              const correct = answered && isSelectionCorrect(q, given);
                              const position = activeQuestions.findIndex(a => a.id === q.id) + 1;

                              return (
                                <div
                                  key={q.id}
                                  id={`review_q_${q.id}`}
                                  className={`p-4 rounded border space-y-2.5 ${correct ? "border-emerald-500/25 bg-emerald-500/[0.02]" : "border-rose-500/25 bg-rose-500/[0.02]"}`}
                                >
                                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                                    <span className="text-slate-400 uppercase tracking-wider">
                                      {t("quiz.reviewQuestionN", { i: position })} · {q.topic}
                                    </span>
                                    {correct ? (
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                    ) : (
                                      <X className="w-3.5 h-3.5 text-rose-400" />
                                    )}
                                  </div>

                                  <p className="text-xs font-semibold text-slate-200 leading-relaxed">{q.question}</p>

                                  <div className="space-y-1 text-[11px]">
                                    <p className={correct ? "text-emerald-300" : "text-rose-300"}>
                                      <span className="text-slate-500 font-mono uppercase mr-1">{t("quiz.reviewYourAnswer")}:</span>
                                      {answered ? given.map(i => q.options[i]).join(" · ") : t("quiz.reviewNoAnswer")}
                                    </p>
                                    {!correct && (
                                      <p className="text-emerald-300">
                                        <span className="text-slate-500 font-mono uppercase mr-1">{t("quiz.reviewCorrectAnswer")}:</span>
                                        {correctIndexes(q).map(i => q.options[i]).join(" · ")}
                                      </p>
                                    )}
                                  </div>

                                  <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/70 pt-2">
                                    {renderMarkdownToJSX(q.explanation)}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 justify-center" id="recompleted_buttons">
                    <button 
                      id="restart_quiz_btn"
                      onClick={handleStartQuiz}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-2.5 rounded text-sm transition-all"
                    >
                      {t("quiz.repeatMain")}
                    </button>
                    <button 
                      id="back_to_studio_btn"
                      onClick={() => setActiveTab("studio")}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded text-sm transition-all shadow-md shadow-cyan-600/15"
                    >
                      {t("quiz.backToStudio")}
                    </button>
                  </div>
                </div>
              ) : remediationActive ? (
                /* REMEDIATION ACTIVE SCREEN */
                remediationCompleted ? (
                  /* Remediation Ended */
                  <div className="text-center space-y-6" id="remediation_ended_screen">
                    <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-full flex items-center justify-center mx-auto" id="remediation_ended_icon">
                      <Award className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold text-slate-100" id="remediation_ended_title">{t("rem.completedTitle")}</h2>
                      <p className="text-sm text-slate-400 max-w-md mx-auto">
                        {t("rem.completedDesc")}
                      </p>
                    </div>

                    <div className="inline-block bg-slate-950 px-6 py-4 rounded border border-slate-800" id="remediation_score_box">
                      <div className="text-2xl font-extrabold text-slate-100 font-mono" id="remediation_score_digits">{remediationScore} / 3</div>
                      <div className="text-xs font-mono font-bold text-rose-300 mt-1 uppercase tracking-wider" id="remediation_score_status">
                        {t("rem.adaptiveLevel")}
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center" id="remediation_completed_buttons">
                      <button 
                        id="remediation_retry_btn"
                        onClick={handleStartRemediation}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-5 py-2.5 rounded text-sm transition-all flex items-center gap-1"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {t("rem.regenerate")}
                      </button>
                      <button 
                        id="remediation_end_btn"
                        onClick={() => {
                          setRemediationActive(false);
                          setQuizCompleted(true);
                        }}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-2.5 rounded text-sm transition-all"
                      >
                        {t("rem.seeMainResult")}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Remediation Question Active */
                  <div className="space-y-6" id="remediation_question_screen">
                    <div className="flex justify-between items-center text-xs font-mono text-rose-400 pb-2 border-b border-slate-800" id="remediation_q_header">
                      <span>{t("rem.headerLevel", { level: levelLabel(remediationQuestions[remediationIndex].level) })}</span>
                      <span>{t("rem.questionOf", { i: remediationIndex + 1, n: remediationQuestions.length })}</span>
                    </div>

                    {/* Scenario card. Remediation questions come back from the
                        model, so the scenario can legitimately be absent: without
                        this guard the card renders as a labelled empty box. */}
                    {remediationQuestions[remediationIndex].scenario?.trim() && (
                      <div className="bg-slate-950/80 p-4 border-l-2 border-rose-500 rounded-r space-y-2" id="remediation_scenario_box">
                        <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded uppercase font-semibold">{t("rem.analysisScenario")}</span>
                        <p className="text-xs text-slate-400 leading-relaxed italic">{remediationQuestions[remediationIndex].scenario}</p>
                      </div>
                    )}

                    {/* Question text */}
                    <h3 className="font-bold text-sm text-slate-200 leading-relaxed" id="remediation_q_text">
                      {remediationQuestions[remediationIndex].question}
                    </h3>

                    {isMultiResponse(remediationQuestions[remediationIndex]) && (
                      <p
                        id="remediation_multi_hint"
                        className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded px-2.5 py-1.5"
                      >
                        {t("quiz.selectN", { n: requiredSelections(remediationQuestions[remediationIndex]) })}
                      </p>
                    )}

                    {/* Options list */}
                    <div
                      className="space-y-2.5"
                      id="remediation_options_list"
                      role={isMultiResponse(remediationQuestions[remediationIndex]) ? "group" : "radiogroup"}
                      aria-label={isMultiResponse(remediationQuestions[remediationIndex]) ? t("a11y.optionsGroupMulti") : t("a11y.optionsGroup")}
                    >
                      {remediationQuestions[remediationIndex].options.map((opt, oIdx) => {
                        const isSelected = remediationSelected.includes(oIdx);
                        const isCorrect = correctIndexes(remediationQuestions[remediationIndex]).includes(oIdx);
                        let optionStyle = "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40 text-slate-400";

                        if (remediationShowFeedback) {
                          if (isCorrect) {
                            optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-emerald-500/5 shadow-sm";
                          } else if (isSelected) {
                            optionStyle = "border-rose-500 bg-rose-500/10 text-rose-400";
                          } else {
                            optionStyle = "border-slate-800/50 bg-slate-950/10 text-slate-500 opacity-60";
                          }
                        } else if (isSelected) {
                          optionStyle = "border-rose-400 bg-rose-500/5 text-rose-300 font-medium shadow-rose-500/5 shadow-sm";
                        }

                        return (
                          <button
                            key={oIdx}
                            id={`remediation_opt_${oIdx}`}
                            role={isMultiResponse(remediationQuestions[remediationIndex]) ? "checkbox" : "radio"}
                            aria-checked={isSelected}
                            disabled={remediationShowFeedback}
                            onClick={() => handleRemediationSelect(oIdx)}
                            className={`w-full text-left p-3.5 rounded border text-xs transition-all duration-200 ${optionStyle}`}
                          >
                            <span className="font-mono text-[10px] text-slate-500 mr-2 select-none">{oIdx + 1}</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback and next actions */}
                    {remediationShowFeedback ? (
                      <div className="space-y-4" id="remediation_feedback_box">
                        <div className={`p-4 rounded border ${isSelectionCorrect(remediationQuestions[remediationIndex], remediationSelected) ? "bg-emerald-500/[0.02] border-emerald-500/20 text-slate-300" : "bg-rose-500/[0.02] border-rose-500/20 text-slate-300"}`} id="remediation_feedback_details">
                          <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-wider flex items-center gap-1.5 text-slate-200">
                            {isSelectionCorrect(remediationQuestions[remediationIndex], remediationSelected) ? (
                              <><Check className="w-4 h-4 text-emerald-400" /> <span className="text-emerald-400">{t("quiz.bestChoice")}</span></>
                            ) : (
                              <><X className="w-4 h-4 text-rose-400" /> <span className="text-rose-400">{t("quiz.distractor")}</span></>
                            )}
                          </h4>
                          <div className="text-xs text-slate-400 leading-relaxed">
                            {renderMarkdownToJSX(remediationQuestions[remediationIndex].explanation)}
                          </div>
                        </div>

                        <button 
                          id="remediation_next_btn"
                          onClick={handleRemediationNext}
                          className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3 rounded hover:bg-rose-500 transition-all text-xs flex items-center justify-center gap-1"
                        >
                          <span>{remediationIndex === remediationQuestions.length - 1 ? t("rem.seeOutcome") : t("rem.nextQuestion")}</span>
                          <ChevronRight className="w-4 h-4 stroke-[3]" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        id="remediation_confirm_btn"
                        onClick={handleRemediationConfirm}
                        disabled={!isSelectionComplete(remediationQuestions[remediationIndex], remediationSelected)}
                        className="w-full bg-slate-800 disabled:bg-slate-900 border border-slate-700 disabled:border-slate-800 text-slate-300 disabled:text-slate-600 font-bold py-3 rounded transition-all text-xs"
                      >
                        {t("quiz.confirmAnswer")}
                      </button>
                    )}
                  </div>
                )
              ) : (
                /* ACTIVE MAIN QUIZ QUESTION SCREEN */
                <div className="space-y-6" id="main_quiz_question_screen">
                  
                  {/* Progress Header */}
                  <div className="space-y-2" id="quiz_progress_container">
                    <div className="flex justify-between items-center gap-2 text-xs font-mono text-slate-400" id="quiz_progress_text">
                      <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold truncate">{activeQuestions[currentQuestionIndex].topic}</span>
                      <span className="flex items-center gap-2 shrink-0">
                        {secondsLeft !== null && (
                          <span
                            id="quiz_timer"
                            role="timer"
                            aria-live="off"
                            className={`px-2 py-0.5 rounded text-[10px] font-bold tabular-nums border ${secondsLeft <= 60 ? "border-rose-500/40 bg-rose-500/10 text-rose-300" : "border-slate-700 bg-slate-900 text-slate-300"}`}
                            title={t("quiz.timerLabel")}
                          >
                            {formatClock(secondsLeft)}
                          </span>
                        )}
                        <span>{t("quiz.level")} <strong className="text-cyan-400">{levelLabel(activeQuestions[currentQuestionIndex].level)}</strong> · {t("quiz.questionCounter", { i: currentQuestionIndex + 1, n: activeQuestions.length })}</span>
                      </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden" id="quiz_bar">
                      <div 
                        id="quiz_bar_fill"
                        className="h-full bg-cyan-500 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Scenario box */}
                  {activeQuestions[currentQuestionIndex].scenario?.trim() && (
                    <div className="bg-slate-950/80 p-4 border-l-2 border-cyan-500 rounded-r space-y-2" id="quiz_scenario_box">
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase font-semibold">{t("quiz.businessScenario")}</span>
                      <p className="text-xs text-slate-400 leading-relaxed italic">{activeQuestions[currentQuestionIndex].scenario}</p>
                    </div>
                  )}

                  {/* Question text */}
                  <h3 className="font-bold text-sm text-slate-200 leading-relaxed" id="quiz_q_text">
                    {activeQuestions[currentQuestionIndex].question}
                  </h3>

                  {/* A multi-response question says so up front: the learner
                      must know two picks are expected before choosing one. */}
                  {isMultiResponse(activeQuestions[currentQuestionIndex]) && (
                    <p
                      id="quiz_multi_hint"
                      className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/25 rounded px-2.5 py-1.5"
                    >
                      {t("quiz.selectN", { n: requiredSelections(activeQuestions[currentQuestionIndex]) })}
                    </p>
                  )}

                  {/* Options buttons */}
                  <div
                    className="space-y-2.5"
                    id="quiz_options_list"
                    role={isMultiResponse(activeQuestions[currentQuestionIndex]) ? "group" : "radiogroup"}
                    aria-label={isMultiResponse(activeQuestions[currentQuestionIndex]) ? t("a11y.optionsGroupMulti") : t("a11y.optionsGroup")}
                  >
                    {activeQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedOptions.includes(oIdx);
                      const isCorrect = correctIndexes(activeQuestions[currentQuestionIndex]).includes(oIdx);
                      let optionStyle = "border-slate-800 hover:border-slate-700 bg-slate-950/40 hover:bg-slate-900/40 text-slate-400";

                      if (showFeedback) {
                        if (isCorrect) {
                          optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-emerald-500/5 shadow-sm";
                        } else if (isSelected) {
                          optionStyle = "border-rose-500 bg-rose-500/10 text-rose-400";
                        } else {
                          optionStyle = "border-slate-800/50 bg-slate-950/10 text-slate-500 opacity-60";
                        }
                      } else if (isSelected) {
                        optionStyle = "border-cyan-400 bg-cyan-500/5 text-cyan-300 font-medium shadow-cyan-500/5 shadow-sm";
                      }

                      return (
                        <button
                          key={oIdx}
                          id={`quiz_opt_${oIdx}`}
                          role={isMultiResponse(activeQuestions[currentQuestionIndex]) ? "checkbox" : "radio"}
                          aria-checked={isSelected}
                          disabled={showFeedback}
                          onClick={() => handleSelectOption(oIdx)}
                          className={`w-full text-left p-3.5 rounded border text-xs transition-all duration-200 ${optionStyle}`}
                        >
                          <span className="font-mono text-[10px] text-slate-500 mr-2 select-none">{oIdx + 1}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box & Next Actions */}
                  {showFeedback ? (
                    <div className="space-y-4" id="quiz_feedback_box">
                      <div className={`p-4 rounded border ${isSelectionCorrect(activeQuestions[currentQuestionIndex], selectedOptions) ? "bg-emerald-500/[0.02] border-emerald-500/20 text-slate-300" : "bg-rose-500/[0.02] border-rose-500/20 text-slate-300"}`} id="quiz_feedback_details">
                        <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-wider flex items-center gap-1.5 text-slate-200">
                          {isSelectionCorrect(activeQuestions[currentQuestionIndex], selectedOptions) ? (
                            <><Check className="w-4 h-4 text-emerald-400" /> <span className="text-emerald-400">{t("quiz.bestChoice")}</span></>
                          ) : (
                            <><X className="w-4 h-4 text-rose-400" /> <span className="text-rose-400">{t("quiz.distractor")}</span></>
                          )}
                        </h4>
                        <div className="text-xs text-slate-400 leading-relaxed">
                          {renderMarkdownToJSX(activeQuestions[currentQuestionIndex].explanation)}
                        </div>
                      </div>

                      <button 
                        id="quiz_next_btn"
                        onClick={handleNextQuestion}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded hover:shadow-lg hover:shadow-cyan-500/10 transition-all text-xs flex items-center justify-center gap-1"
                      >
                        <span>{currentQuestionIndex === activeQuestions.length - 1 ? t("quiz.finishExam") : t("quiz.nextQuestion")}</span>
                        <ChevronRight className="w-4 h-4 stroke-[3]" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button 
                        id="quiz_confirm_btn"
                        onClick={handleConfirmAnswer}
                        disabled={!isSelectionComplete(activeQuestions[currentQuestionIndex], selectedOptions)}
                        className="w-full bg-slate-800 disabled:bg-slate-900 border border-slate-700 disabled:border-slate-800 text-slate-300 disabled:text-slate-600 font-bold py-3 rounded transition-all text-xs"
                      >
                        {t("quiz.confirmAnswer")}
                      </button>
                      <p className="text-[10px] text-slate-500 text-center font-mono">{t("a11y.keyboardHint")}</p>
                    </div>
                  )}

                </div>
              )}

            </div>
          </main>
        )}

        {/* TAB 3: GLOSSARIO SY0-701 */}
        {activeTab === "glossary" && (
          <GlossarySection 
            onAskAI={(prompt) => {
              setSidebarOpen(true);
              handleSendChat(prompt);
            }}
          />
        )}

        {/* PERSISTENT COLLAPSIBLE AI SIDEBAR - Sleek Interface Style */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              id="ai_sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: typeof window !== "undefined" && window.innerWidth < 640 ? Math.min(380, window.innerWidth - 32) : 380, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="border-l border-slate-800 bg-slate-900/65 flex-shrink-0 flex flex-col overflow-hidden h-full z-10"
            >
              {/* Sidebar Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950" id="sidebar_header">
                <div className="flex items-center gap-2">
                  <div className="bg-cyan-500/10 p-1.5 rounded text-cyan-400" id="sidebar_header_icon">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs font-mono text-cyan-400 tracking-wider uppercase">{t("chat.title")}</h3>
                </div>
                <button 
                  id="close_sidebar_icon_btn"
                  type="button"
                  aria-label={t("a11y.closeTrainer")}
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat_messages_area">
                {chatMessages.map((msg, i) => {
                  const isTrainer = msg.sender === "trainer";
                  const isSystem = msg.sender === "system";

                  return (
                    <div 
                      key={msg.id} 
                      id={`msg_${i}`}
                      className={`flex ${isTrainer ? "justify-start" : isSystem ? "justify-center" : "justify-end"}`}
                    >
                      <div 
                        id={`msg_bubble_${i}`}
                        className={`max-w-[85%] rounded p-3 text-xs leading-relaxed ${isTrainer ? "bg-slate-950 text-slate-300 border border-slate-800" : isSystem ? "bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-center" : "bg-cyan-600 text-white font-medium shadow-md shadow-cyan-600/10"}`}
                      >
                        {isTrainer ? (
                          renderMarkdownToJSX(msg.text)
                        ) : (
                          <p>{msg.text}</p>
                        )}
                        <span className="block text-[9px] text-slate-500 mt-1 text-right font-mono select-none">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {isChatLoading && (
                  <div className="flex justify-start" id="chat_loading_indicator">
                    <div className="bg-slate-950 border border-slate-800 rounded p-3 flex items-center gap-2" id="chat_loading_bubble">
                      <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span className="text-xs text-slate-400 font-mono">{t("chat.processing")}</span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Suggested chips based on context */}
              <div className="px-3 py-2 border-t border-slate-800/60 bg-slate-950/40" id="suggested_chips_box">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1.5 pl-1">{t("chat.askTrainer")}</span>
                <div className="flex flex-wrap gap-1.5" id="suggested_chips_list">
                  <button 
                    id="chip_threats"
                    onClick={() => handleSendChat(t("chat.chipThreatsPrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipThreats")}
                  </button>
                  <button 
                    id="chip_edr"
                    onClick={() => handleSendChat(t("chat.chipEdrPrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipEdr")}
                  </button>
                  <button 
                    id="chip_rto"
                    onClick={() => handleSendChat(t("chat.chipRtoPrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipRto")}
                  </button>
                  <button 
                    id="chip_sle"
                    onClick={() => handleSendChat(t("chat.chipSlePrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipSle")}
                  </button>
                  <button 
                    id="chip_due"
                    onClick={() => handleSendChat(t("chat.chipDuePrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipDue")}
                  </button>
                  <button 
                    id="chip_agreements"
                    onClick={() => handleSendChat(t("chat.chipAgreementsPrompt"))}
                    className="bg-slate-800 hover:bg-slate-700 hover:text-cyan-400 border border-slate-700 hover:border-cyan-900/30 rounded px-2 py-1 text-[10px] text-slate-300 transition-colors"
                  >
                    {t("chat.chipAgreements")}
                  </button>
                </div>
              </div>

              {/* Chat Input form */}
              <div className="p-3 border-t border-slate-800 bg-slate-950" id="chat_input_panel">
                <form 
                  id="chat_form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendChat();
                  }}
                  className="flex gap-2"
                >
                  <input 
                    id="chat_text_input"
                    type="text"
                    aria-label={t("a11y.chatInput")}
                    value={chatInput}
                    disabled={isChatLoading}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    className="flex-1 bg-slate-900 border border-slate-800 focus:border-cyan-500/50 rounded px-3 py-2 text-xs outline-none text-slate-100 placeholder-slate-500 transition-colors"
                  />
                  <button 
                    id="chat_submit_btn"
                    type="submit"
                    disabled={isChatLoading || !chatInput.trim()}
                    className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white disabled:text-slate-600 font-bold p-2 rounded transition-colors"
                  >
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal per visualizzare i testi delle nuove domande tradotte */}
        {showNewQuestionsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" id="new_questions_modal_overlay">
            <div className="w-full max-w-3xl h-[85vh] bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden shadow-2xl" id="new_questions_modal" role="dialog" aria-modal="true" aria-labelledby="new_questions_modal_title">
              {/* Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950" id="new_questions_modal_header">
                <div>
                  <h3 className="text-sm font-bold text-slate-100" id="new_questions_modal_title">{t("modal.title")}</h3>
                  <p className="text-[10px] text-slate-400">{t("modal.subtitle")}</p>
                </div>
                <button
                  type="button"
                  aria-label={t("modal.close")}
                  onClick={() => setShowNewQuestionsModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50" id="new_questions_modal_content">
                {DOMAIN_1_QUESTIONS.filter(q => q.id >= questionUid(1, 141) && q.id <= questionUid(1, 150)).map((q, idx) => (
                  <div key={q.id} className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-lg space-y-3" id={`modal_q_${q.id}`}>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-1.5">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase">{t("modal.questionN", { i: idx + 1, id: q.id })}</span>
                      <span className="text-[10px] font-mono text-slate-500">{t("modal.topic", { topic: q.topic })}</span>
                    </div>
                    <div className="space-y-2">
                      {q.scenario?.trim() && (
                        <p className="text-xs text-slate-400 italic bg-slate-950/30 p-2.5 rounded border-l border-cyan-500/30 leading-relaxed"><strong>{t("modal.scenario")}</strong> {q.scenario}</p>
                      )}
                      <p className="text-xs font-semibold text-slate-200">{q.question}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-2 rounded border ${correctIndexes(q).includes(optIdx) ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium" : "bg-slate-900/50 border-slate-800 text-slate-400"}`}
                        >
                          {opt} {correctIndexes(q).includes(optIdx) && "✓"}
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] bg-slate-950/80 p-3 rounded border border-slate-800/60 text-slate-300 leading-relaxed space-y-1">
                      <strong className="text-cyan-400 block text-xs">{t("modal.detailedExplanation")}</strong>
                      <div className="whitespace-pre-line text-slate-400">{q.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end gap-2" id="new_questions_modal_footer">
                <button
                  type="button"
                  onClick={() => setShowNewQuestionsModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold transition-colors"
                >
                  {t("modal.close")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    beginQuizRun(
                      DOMAIN_1_QUESTIONS.filter(
                        q => q.id >= questionUid(1, 141) && q.id <= questionUid(1, 150)
                      )
                    );
                    setShowNewQuestionsModal(false);
                  }}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold transition-colors shadow-md shadow-cyan-600/10"
                >
                  {t("modal.startDirect")}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/*
        Study-notes disclaimer.
        The READMEs already say this, but nobody using the app reads the
        README, so the statement has to live where the study happens.
      */}
      <footer
        className="shrink-0 border-t border-slate-800 bg-slate-900/50 px-3 sm:px-6 py-1.5 flex items-start gap-2 text-[10px] leading-snug text-slate-500"
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
  );
}
