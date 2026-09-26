import type { QuizSession } from "../hooks/useQuizSession";
import type { Remediation } from "../hooks/useRemediation";
import { Check, X, ChevronRight, RefreshCw, AlertTriangle, Award, BookOpen, Sparkles } from "lucide-react";
import { useLang, type UIKey } from "../i18n";
import MarkdownText from "./MarkdownText";
import { hasPassedRun, correctIndexes, isSelectionCorrect } from "../quiz";
import type { StudyAction } from "../studyPaths";

/**
 * The end of a simulator run: score and pass mark, the objective follow-up,
 * retry and AI remediation, the answer review and the way back.
 */
export default function QuizResultsScreen({ quiz, remediation, activeObjective, onRestart, onRetryMistakes, onStartRemediation, onStudyAction, onBackToStudio }: {
  quiz: QuizSession;
  remediation: Remediation;
  activeObjective: string | null;
  onRestart: () => void;
  onRetryMistakes: () => void;
  onStartRemediation: () => void;
  onStudyAction: (action: StudyAction) => void;
  onBackToStudio: () => void;
}) {
  const { t } = useLang();
  const { activeQuestions, quizAnswers, quizScore, reviewWrongOnly, setReviewWrongOnly, setShowReview, showReview, timeUp, wrongQuestions } = quiz;
  const { isGeneratingRemediation, remediationError } = remediation;
  const handleStartQuiz = onRestart;
  const handleRetryMistakes = onRetryMistakes;
  const handleStartRemediation = onStartRemediation;
  const runStudyAction = onStudyAction;

  // Single source of truth for "did this run pass?", used by the icon, the
  // badge and the remediation branch alike.
  const hasPassed = hasPassedRun(quizScore, activeQuestions.length);

  // Questions answered wrongly, in the order they were asked, for the review.
  const reviewQuestions = reviewWrongOnly
    ? activeQuestions.filter(q => wrongQuestions.includes(q.id))
    : activeQuestions;

  return (
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
                          <span className="inline-flex items-center gap-1 text-emerald-300 uppercase">
                            <Check className="w-3.5 h-3.5" aria-hidden="true" />
                            {t("quiz.verdictCorrect")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-300 uppercase">
                            <X className="w-3.5 h-3.5" aria-hidden="true" />
                            {answered ? t("quiz.verdictWrong") : t("quiz.reviewNoAnswer")}
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-semibold text-slate-200 leading-relaxed">{q.question}</p>

                      <div className="space-y-1 text-[11px]">
                        <p className={correct ? "text-emerald-300" : "text-rose-300"}>
                          <span className="text-slate-400 font-mono uppercase mr-1">{t("quiz.reviewYourAnswer")}:</span>
                          {answered ? given.map(i => q.options[i]).join(" · ") : t("quiz.reviewNoAnswer")}
                        </p>
                        {!correct && (
                          <p className="text-emerald-300">
                            <span className="text-slate-400 font-mono uppercase mr-1">{t("quiz.reviewCorrectAnswer")}:</span>
                            {correctIndexes(q).map(i => q.options[i]).join(" · ")}
                          </p>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/70 pt-2">
                        <MarkdownText text={q.explanation} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* After an objective quiz: back to the guide on that objective. */}
      {activeObjective && (
        <div className="bg-cyan-950/20 border border-cyan-500/25 p-4 rounded-lg space-y-2 text-left" id="objective_followup_box">
          <h3 className="text-xs font-bold text-cyan-300">
            {t("quiz.objectiveDoneTitle", { code: activeObjective, name: t(`objective.${activeObjective}` as UIKey) })}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {t("quiz.objectiveDoneText", { n: Number(activeObjective[0]) })}
          </p>
          <button
            type="button"
            id="objective_followup_btn"
            onClick={() =>
              runStudyAction({
                kind: "guide",
                domain: Number(activeObjective[0]) as 1 | 2 | 3 | 4 | 5,
                objective: activeObjective,
              })
            }
            className="min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded border border-cyan-800 bg-cyan-950/40 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors"
          >
            {t("quiz.objectiveDoneBtn", { code: activeObjective })}
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
          </button>
        </div>
      )}

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
          onClick={onBackToStudio}
          className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold px-5 py-2.5 rounded text-sm transition-all shadow-md shadow-cyan-600/15"
        >
          {t("quiz.backToStudio")}
        </button>
      </div>
    </div>
  );
}
