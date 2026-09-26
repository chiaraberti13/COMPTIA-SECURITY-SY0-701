import type { QuizSession } from "../hooks/useQuizSession";
import type { GlossaryHint } from "../glossaryIndex";
import { Check, X, ChevronRight } from "lucide-react";
import { useLang } from "../i18n";
import OptionVerdict from "./OptionVerdict";
import GlossaryHints from "./GlossaryHints";
import MarkdownText from "./MarkdownText";
import {
  formatClock,
  correctIndexes,
  requiredSelections,
  isMultiResponse,
  isSelectionComplete,
  isSelectionCorrect,
} from "../quiz";

/**
 * One question of a simulator run: scenario, options, the exam timer, the
 * verdict after confirming and the glossary terms it mentions. Keyboard
 * shortcuts are handled by App for every question screen.
 */
export default function QuizQuestionScreen({ quiz, glossaryIndex, levelLabel }: {
  quiz: QuizSession;
  glossaryIndex: Map<string, GlossaryHint>;
  levelLabel: (level: string) => string;
}) {
  const { t } = useLang();
  const { activeQuestions, currentQuestionIndex, secondsLeft, selectedOptions, showFeedback } = quiz;
  const handleSelectOption = quiz.select;
  const handleConfirmAnswer = quiz.confirm;
  const handleNextQuestion = quiz.next;
  const GLOSSARY_INDEX = glossaryIndex;
  return (
    <div className="space-y-6" id="main_quiz_question_screen">

      {/* Progress Header */}
      <div className="space-y-2" id="quiz_progress_container">
        <div className="flex justify-between items-center gap-2 text-xs font-mono text-slate-400" id="quiz_progress_text">
          <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold truncate">{activeQuestions[currentQuestionIndex].topic}</span>
          <span className="flex items-center gap-2 shrink-0">
            {secondsLeft !== null && (
              <>
                <span
                  id="quiz_timer"
                  role="timer"
                  aria-live="off"
                  className={`px-2 py-0.5 rounded text-[10px] font-bold tabular-nums border ${secondsLeft <= 60 ? "border-rose-500/40 bg-rose-500/10 text-rose-300" : "border-slate-700 bg-slate-900 text-slate-300"}`}
                  title={t("quiz.timerLabel")}
                >
                  {formatClock(secondsLeft)}
                </span>
                {/* The visible clock is not announced every second; one warning is. */}
                <span className="sr-only" role="status" aria-live="polite" id="quiz_timer_warning">
                  {secondsLeft > 0 && secondsLeft <= 60 ? t("quiz.oneMinuteLeft") : ""}
                </span>
              </>
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
              optionStyle = "border-slate-800/50 bg-slate-950/10 text-slate-400 opacity-60";
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
              <span className="font-mono text-[10px] text-slate-400 mr-2 select-none">{oIdx + 1}</span>
              {opt}
              {showFeedback && <OptionVerdict isCorrect={isCorrect} isSelected={isSelected} />}
            </button>
          );
        })}
      </div>

      {/* Always mounted, so screen readers announce the verdict as soon as
          the answer is confirmed (a live region added later is often missed). */}
      <p className="sr-only" role="status" aria-live="polite" id="quiz_feedback_announcer">
        {showFeedback
          ? isSelectionCorrect(activeQuestions[currentQuestionIndex], selectedOptions)
            ? t("quiz.bestChoice")
            : t("quiz.distractor")
          : ""}
      </p>

      {/* Feedback Box & Next Actions */}
      {showFeedback ? (
        <div className="space-y-4" id="quiz_feedback_box">
          <div className={`p-4 rounded border ${isSelectionCorrect(activeQuestions[currentQuestionIndex], selectedOptions) ? "bg-emerald-500/[0.02] border-emerald-500/20 text-slate-300" : "bg-rose-500/[0.02] border-rose-500/20 text-slate-300"}`} id="quiz_feedback_details">
            <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-wider flex items-center gap-1.5 text-slate-200">
              {isSelectionCorrect(activeQuestions[currentQuestionIndex], selectedOptions) ? (
                <><Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> <span className="text-emerald-400">{t("quiz.bestChoice")}</span></>
              ) : (
                <><X className="w-4 h-4 text-rose-400" aria-hidden="true" /> <span className="text-rose-400">{t("quiz.distractor")}</span></>
              )}
            </h4>
            <div className="text-xs text-slate-400 leading-relaxed">
              <MarkdownText text={activeQuestions[currentQuestionIndex].explanation} />
            </div>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <GlossaryHints
                key={activeQuestions[currentQuestionIndex].id}
                idPrefix="quiz"
                index={GLOSSARY_INDEX}
                texts={[
                  activeQuestions[currentQuestionIndex].scenario ?? "",
                  activeQuestions[currentQuestionIndex].question,
                  activeQuestions[currentQuestionIndex].explanation,
                ]}
              />
            </div>
          </div>

          <button 
            id="quiz_next_btn"
            onClick={handleNextQuestion}
            className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 rounded hover:shadow-lg hover:shadow-cyan-500/10 transition-all text-xs flex items-center justify-center gap-1"
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
          <p className="text-[10px] text-slate-400 text-center font-mono">{t("a11y.keyboardHint")}</p>
        </div>
      )}

    </div>
  );
}
