import type { QuizSession } from "../hooks/useQuizSession";
import type { DomainCounts, QuizSetup } from "../hooks/useQuizSetup";
import React from "react";
import { TrendingUp, Check, ChevronRight, RefreshCw, Activity } from "lucide-react";
import { ALL_OBJECTIVES } from "../questionObjectives";
import type { Question } from "../types";
import { useLang, type UIKey } from "../i18n";
import DataControls from "./DataControls";
import type { QuizPreset } from "../hooks/useQuizSetup";
import { SECONDS_PER_QUESTION, scorePercent, summarizeWeakTopics } from "../quiz";

/**
 * The simulator set-up: smart review, weak topics, the objective quiz, the new
 * questions, presets and questions per domain, the exam timer, the start
 * button, the local history and "Your data".
 */
export default function QuizSetupScreen({ quiz, setup, maxQuestionsByDomain, dueReviewQuestions, weakTopicSummary, questionsByObjective, onStartQuiz, onStartObjectiveQuiz, onStartSmartReview, onClearHistory, onStartNewQuestions, onShowNewQuestions }: {
  quiz: QuizSession;
  setup: QuizSetup;
  maxQuestionsByDomain: DomainCounts;
  dueReviewQuestions: Question[];
  weakTopicSummary: ReturnType<typeof summarizeWeakTopics>;
  questionsByObjective: Map<string, number[]>;
  onStartQuiz: () => void;
  onStartObjectiveQuiz: () => void;
  onStartSmartReview: () => void;
  onClearHistory: () => void;
  onStartNewQuestions: () => void;
  onShowNewQuestions: () => void;
}) {
  const { t, lang } = useLang();
  const { quizHistory, timerEnabled, setTimerEnabled } = quiz;
  const { quizFocus, setQuizFocus, objectiveChoice, setObjectiveChoice, customCounts, totalQuestionsSelected, applyPreset } = setup;
  const handleStartQuiz = onStartQuiz;
  const handleStartObjectiveQuiz = onStartObjectiveQuiz;
  const handleStartSmartReview = onStartSmartReview;
  const handleClearHistory = onClearHistory;

  const domainMetadata = [
    { id: 1, name: t("domainMeta.1.name"), desc: t("domainMeta.1.desc") },
    { id: 2, name: t("domainMeta.2.name"), desc: t("domainMeta.2.desc") },
    { id: 3, name: t("domainMeta.3.name"), desc: t("domainMeta.3.desc") },
    { id: 4, name: t("domainMeta.4.name"), desc: t("domainMeta.4.desc") },
    { id: 5, name: t("domainMeta.5.name"), desc: t("domainMeta.5.desc") }
  ];

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

  return (
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
            id="smart_review_start_btn"
            onClick={handleStartSmartReview}
            disabled={dueReviewQuestions.length === 0}
            className="w-full sm:w-auto shrink-0 bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold px-4 py-2 rounded text-[11px] transition-colors"
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
            <p className="text-[11px] text-slate-400 leading-relaxed">
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
              onClick={onStartNewQuestions}
              className="flex-1 sm:flex-initial bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-3 py-2 rounded text-[11px] transition-colors shadow-md shadow-cyan-600/10 text-center"
            >
              {t("quiz.startTest10")}
            </button>
            <button
              type="button"
              onClick={onShowNewQuestions}
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
          <span className="text-[9px] text-slate-400 font-mono flex items-center mr-1">{t("quiz.onlyDomain")}</span>
          {[1, 2, 3, 4, 5].map(domNum => (
            <button
              key={domNum}
              type="button"
              onClick={() => applyPreset(`domain${domNum}` as QuizPreset)}
              className={`px-2 py-1 rounded text-[10px] font-mono border transition-all ${quizFocus === `domain${domNum}` ? "border-cyan-500 bg-cyan-500/10 text-cyan-300" : "border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700 hover:text-slate-300"}`}
            >
              DOM {domNum}
            </button>
          ))}
        </div>

        {/* Drill one official objective, e.g. after a weak score on it. */}
        <div className="mt-2 pt-2 border-t border-slate-800/40 space-y-2" id="objective_quiz_box">
          <label htmlFor="objective_select" className="text-[9px] text-slate-400 font-mono block">
            {t("quiz.onlyObjective")}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              id="objective_select"
              value={objectiveChoice}
              onChange={(e) => setObjectiveChoice(e.target.value)}
              aria-describedby="objective_hint"
              className="flex-1 min-w-0 min-h-[36px] bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="">{t("quiz.objectivePlaceholder")}</option>
              {[1, 2, 3, 4, 5].map(domNum => (
                <optgroup key={domNum} label={t("sidebar.domShort", { n: domNum })}>
                  {ALL_OBJECTIVES.filter(code => code.startsWith(`${domNum}.`)).map(code => (
                    <option key={code} value={code}>
                      {t("quiz.objectiveOption", {
                        code,
                        name: t(`objective.${code}` as UIKey),
                        n: questionsByObjective.get(code)?.length ?? 0,
                      })}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <button
              type="button"
              id="objective_start_btn"
              onClick={handleStartObjectiveQuiz}
              disabled={!objectiveChoice}
              className="shrink-0 min-h-[36px] bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold px-3 py-1.5 rounded text-[11px] transition-colors"
            >
              {t("quiz.startObjective")}
            </button>
          </div>
          <p id="objective_hint" className="text-[10px] text-slate-400">{t("quiz.objectiveHint")}</p>
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
              setup.setDomainCount(dom.id, Math.max(0, currentVal - 1));
            };

            const handleIncrement = () => {
              setup.setDomainCount(dom.id, Math.min(maxVal, currentVal + 1));
            };

            const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              setup.setDomainCount(dom.id, parseInt(e.target.value) || 0);
            };

            return (
              <div key={dom.id} className="bg-slate-950/40 border border-slate-800 p-3.5 rounded-lg space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-200 block">{dom.name}</span>
                    <span className="text-[10px] text-slate-400 block leading-relaxed">{dom.desc}</span>
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
            <span className="text-[10px] text-slate-400 block leading-relaxed">{t("quiz.timerHint")}</span>
          </span>
        </label>
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4" id="custom_quiz_summary_box">
        <div className="text-left space-y-1">
          <div className="text-xs font-mono text-slate-400">{t("quiz.configSummary")}</div>
          <div className="text-sm font-bold text-slate-100 font-sans">
            <span className="text-cyan-400 font-mono text-lg">{totalQuestionsSelected}</span> {t("quiz.highStakesSelected")}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {t("quiz.thresholdTime", { min: Math.ceil((totalQuestionsSelected * SECONDS_PER_QUESTION) / 60) })}
          </div>
        </div>

        <button 
          id="start_quiz_btn"
          disabled={totalQuestionsSelected <= 0}
          onClick={handleStartQuiz}
          className="w-full md:w-auto bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:border-slate-800 disabled:shadow-none text-white font-bold px-6 py-3 rounded hover:shadow-lg hover:shadow-cyan-500/10 transition-all inline-flex items-center justify-center gap-2 border border-cyan-500/30"
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
              className="text-[10px] text-slate-400 hover:text-rose-400 underline underline-offset-2 transition-colors"
            >
              {t("quiz.historyClear")}
            </button>
          )}
        </div>

        {quizHistory.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic">{t("quiz.historyEmpty")}</p>
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
                    <span className="text-slate-400">
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

      <DataControls />
    </div>
  );
}
