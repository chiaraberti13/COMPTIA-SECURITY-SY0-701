import { X } from "lucide-react";
import type { Question } from "../types";
import { useLang } from "../i18n";
import { correctIndexes } from "../quiz";

/**
 * The texts of the ten questions added last to Domain 1, with their answers
 * and explanations, and a button to take them as a short test.
 */
export default function NewQuestionsModal({ questions, onClose, onStart }: {
  questions: Question[];
  onClose: () => void;
  onStart: () => void;
}) {
  const { t } = useLang();
  return (
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
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/50" id="new_questions_modal_content">
          {questions.map((q, idx) => (
            <div key={q.id} className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-lg space-y-3" id={`modal_q_${q.id}`}>
              <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-1.5">
                <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase">{t("modal.questionN", { i: idx + 1, id: q.id })}</span>
                <span className="text-[10px] font-mono text-slate-400">{t("modal.topic", { topic: q.topic })}</span>
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
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold transition-colors"
          >
            {t("modal.close")}
          </button>
          <button
            type="button"
            onClick={onStart}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded text-xs font-bold transition-colors shadow-md shadow-cyan-600/10"
          >
            {t("modal.startDirect")}
          </button>
        </div>
      </div>
    </div>
  );
}
