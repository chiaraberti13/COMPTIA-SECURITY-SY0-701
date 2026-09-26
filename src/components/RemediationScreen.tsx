import type { QuizSession } from "../hooks/useQuizSession";
import type { Remediation } from "../hooks/useRemediation";
import { Check, X, ChevronRight, RefreshCw, Award, Sparkles } from "lucide-react";
import { useLang } from "../i18n";
import OptionVerdict from "./OptionVerdict";
import MarkdownText from "./MarkdownText";
import {
  correctIndexes,
  requiredSelections,
  isMultiResponse,
  isSelectionComplete,
  isSelectionCorrect,
} from "../quiz";

/**
 * The adaptive remediation in the simulator: the three AI questions, answered
 * like the main run, then the score with "generate again" and "back to the
 * results".
 */
export default function RemediationScreen({ remediation, quiz, onRegenerate, levelLabel }: {
  remediation: Remediation;
  quiz: QuizSession;
  onRegenerate: () => void;
  levelLabel: (level: string) => string;
}) {
  const { t } = useLang();
  const { remediationCompleted, remediationIndex, remediationQuestions, remediationScore, remediationSelected, remediationShowFeedback } = remediation;
  const handleRemediationSelect = remediation.select;
  const handleRemediationConfirm = remediation.confirm;
  const handleRemediationNext = remediation.next;
  const handleStartRemediation = onRegenerate;
  return (
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
              remediation.exit();
              quiz.showResults();
            }}
            className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-5 py-2.5 rounded text-sm transition-all"
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
        {/* Generated questions are never reviewed: say so next to each one. */}
        <p className="flex gap-2 text-[11px] text-slate-400 leading-snug" id="remediation_ai_notice">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{t("rem.aiGenerated")}</span>
        </p>

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
                optionStyle = "border-slate-800/50 bg-slate-950/10 text-slate-400 opacity-60";
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
                <span className="font-mono text-[10px] text-slate-400 mr-2 select-none">{oIdx + 1}</span>
                {opt}
                {remediationShowFeedback && <OptionVerdict isCorrect={isCorrect} isSelected={isSelected} />}
              </button>
            );
          })}
        </div>

        <p className="sr-only" role="status" aria-live="polite" id="remediation_feedback_announcer">
          {remediationShowFeedback
            ? isSelectionCorrect(remediationQuestions[remediationIndex], remediationSelected)
              ? t("quiz.bestChoice")
              : t("quiz.distractor")
            : ""}
        </p>

        {/* Feedback and next actions */}
        {remediationShowFeedback ? (
          <div className="space-y-4" id="remediation_feedback_box">
            <div className={`p-4 rounded border ${isSelectionCorrect(remediationQuestions[remediationIndex], remediationSelected) ? "bg-emerald-500/[0.02] border-emerald-500/20 text-slate-300" : "bg-rose-500/[0.02] border-rose-500/20 text-slate-300"}`} id="remediation_feedback_details">
              <h4 className="text-xs font-mono font-bold uppercase mb-2 tracking-wider flex items-center gap-1.5 text-slate-200">
                {isSelectionCorrect(remediationQuestions[remediationIndex], remediationSelected) ? (
                  <><Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> <span className="text-emerald-400">{t("quiz.bestChoice")}</span></>
                ) : (
                  <><X className="w-4 h-4 text-rose-400" aria-hidden="true" /> <span className="text-rose-400">{t("quiz.distractor")}</span></>
                )}
              </h4>
              <div className="text-xs text-slate-400 leading-relaxed">
                <MarkdownText text={remediationQuestions[remediationIndex].explanation} />
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
  );
}
