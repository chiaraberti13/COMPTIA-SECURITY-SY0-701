import { ArrowUp, ArrowDown, Check, X, ChevronRight, ClipboardList, RotateCcw } from "lucide-react";
import { useLang } from "../i18n";
import { InlineText } from "./MarkdownText";
import type { PbqSession } from "../hooks/usePbqSession";
import type { MatchingPbq, OrderingPbq, Pbq, PbqKind } from "../pbq";
import { pbqItemCount } from "../pbq";
import type { UIKey } from "../i18n";

/**
 * The practice area for original performance-based scenarios: a chooser that
 * lists every scenario, then one scenario at a time (reorder the steps, or
 * match each item to an option), graded with a worded verdict and an
 * explanation, and a summary at the end.
 *
 * Accessibility: ordering is driven by up/down buttons (operable from the
 * keyboard, no drag), matching by native <select> controls with real labels.
 * Every verdict is written in words with an icon, never colour alone
 * (WCAG 1.4.1).
 */

const KIND_LABEL: Record<PbqKind, UIKey> = {
  ordering: "pbq.kind.ordering",
  incident: "pbq.kind.incident",
  matching: "pbq.kind.matching",
  log: "pbq.kind.log",
  control: "pbq.kind.control",
};

export default function PbqScreen({ session, scenarios }: { session: PbqSession; scenarios: Pbq[] }) {
  const { t } = useLang();

  if (!session.started) {
    return <PbqSetup scenarios={scenarios} onStart={session.begin} />;
  }
  if (session.finished) {
    return <PbqSummary session={session} scenarios={scenarios} />;
  }
  if (!session.current) return null;

  return (
    <div className="space-y-6" id="pbq_active">
      <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-400" id="pbq_progress">
        <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold truncate">
          {t(KIND_LABEL[session.current.kind])}
        </span>
        <span className="shrink-0">
          {t("pbq.objective", { code: session.current.objective })} ·{" "}
          {t("pbq.progress", { i: session.index + 1, n: session.scenarios.length })}
        </span>
      </div>

      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden" aria-hidden="true">
        <div
          className="h-full bg-cyan-500 transition-all duration-300"
          style={{ width: `${((session.index + 1) / session.scenarios.length) * 100}%` }}
        />
      </div>

      <div className="bg-slate-950/80 p-4 border-l-2 border-cyan-500 rounded-r space-y-2" id="pbq_scenario_box">
        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded uppercase font-semibold">
          {t("pbq.scenarioLabel")}
        </span>
        <p className="text-xs text-slate-400 leading-relaxed italic">
          <InlineText text={session.current.scenario} />
        </p>
      </div>

      <h2 className="font-bold text-sm text-slate-200 leading-relaxed" id="pbq_prompt">
        {session.current.prompt}
      </h2>

      {session.current.mechanic === "ordering" ? (
        <OrderingTask session={session} pbq={session.current as OrderingPbq} />
      ) : (
        <MatchingTask session={session} pbq={session.current as MatchingPbq} />
      )}

      {session.graded && session.grade ? (
        <Feedback session={session} />
      ) : (
        <div className="space-y-2">
          <button
            id="pbq_submit"
            onClick={session.submit}
            disabled={!session.canSubmit}
            className="w-full bg-slate-800 disabled:bg-slate-900 border border-slate-700 disabled:border-slate-800 text-slate-300 disabled:text-slate-600 font-bold py-3 rounded transition-all text-xs"
          >
            {t("pbq.submit")}
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Chooser
 * ------------------------------------------------------------------ */

function PbqSetup({ scenarios, onStart }: { scenarios: Pbq[]; onStart: (list: Pbq[]) => void }) {
  const { t } = useLang();
  return (
    <div className="space-y-5" id="pbq_setup">
      <div className="flex items-center gap-2">
        <ClipboardList className="w-5 h-5 text-cyan-400" aria-hidden="true" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200" id="pbq_setup_title">
          {t("pbq.title")}
        </h2>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed" id="pbq_intro">
        {t("pbq.intro")}
      </p>

      <button
        id="pbq_start_all"
        onClick={() => onStart(scenarios)}
        disabled={scenarios.length === 0}
        className="w-full bg-cyan-700 hover:bg-cyan-600 disabled:bg-slate-900 disabled:text-slate-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1.5"
      >
        <span>{t("pbq.startAll", { n: scenarios.length })}</span>
        <ChevronRight className="w-4 h-4 stroke-[3]" />
      </button>

      <ul className="space-y-2.5" id="pbq_list">
        {scenarios.map((pbq) => (
          <li key={pbq.id}>
            <div
              className="w-full text-left p-3.5 rounded border border-slate-800 bg-slate-950/40 flex items-start justify-between gap-3"
              id={`pbq_card_${pbq.id}`}
            >
              <div className="min-w-0 space-y-1">
                <p className="text-xs font-semibold text-slate-200">{pbq.title}</p>
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {t(KIND_LABEL[pbq.kind])} · {t("pbq.objective", { code: pbq.objective })} ·{" "}
                  {t("pbq.items", { n: pbqItemCount(pbq) })}
                </p>
              </div>
              <button
                id={`pbq_start_${pbq.id}`}
                onClick={() => onStart([pbq])}
                className="shrink-0 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded border border-slate-700 transition-all"
              >
                {t("pbq.startOne")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Ordering task
 * ------------------------------------------------------------------ */

function OrderingTask({ session, pbq }: { session: PbqSession; pbq: OrderingPbq }) {
  const { t } = useLang();
  const byId = new Map(pbq.steps.map((s) => [s.id, s]));
  return (
    <div className="space-y-3">
      {!session.graded && (
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400" id="pbq_order_hint">
          {t("pbq.orderingHint")}
        </p>
      )}
      <ol className="space-y-2" id="pbq_order_list">
        {session.order.map((stepId, i) => {
          const step = byId.get(stepId);
          if (!step) return null;
          const correct = session.grade?.perItem[stepId];
          let style = "border-slate-800 bg-slate-950/40 text-slate-300";
          if (session.graded) {
            style = correct
              ? "border-emerald-500/60 bg-emerald-500/10 text-slate-200"
              : "border-rose-500/60 bg-rose-500/10 text-slate-200";
          }
          return (
            <li
              key={stepId}
              id={`pbq_step_${stepId}`}
              className={`flex items-center gap-2 p-2.5 rounded border text-xs transition-all ${style}`}
            >
              <span className="font-mono text-[10px] text-slate-400 w-5 shrink-0 text-center select-none">{i + 1}</span>
              <span className="flex-1 min-w-0 leading-relaxed">
                <InlineText text={step.text} />
                {session.graded && (
                  <span
                    className={`ml-2 inline-flex items-center gap-0.5 align-middle text-[10px] font-mono uppercase tracking-wider ${correct ? "text-emerald-300" : "text-rose-300"}`}
                  >
                    {correct ? <Check className="w-3 h-3" aria-hidden="true" /> : <X className="w-3 h-3" aria-hidden="true" />}
                    {correct ? t("pbq.inPlace") : t("pbq.outOfPlace")}
                  </span>
                )}
              </span>
              {!session.graded && (
                <span className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    id={`pbq_up_${stepId}`}
                    onClick={() => session.moveStepAt(i, -1)}
                    disabled={i === 0}
                    aria-label={t("pbq.moveUp", { item: step.text })}
                    className="p-1 rounded border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    id={`pbq_down_${stepId}`}
                    onClick={() => session.moveStepAt(i, 1)}
                    disabled={i === session.order.length - 1}
                    aria-label={t("pbq.moveDown", { item: step.text })}
                    className="p-1 rounded border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>

      {session.graded && !session.grade?.passed && (
        <div className="text-[11px] text-slate-400 leading-relaxed" id="pbq_correct_order">
          <p className="font-semibold text-slate-300 mb-1">{t("pbq.correctOrderTitle")}</p>
          <ol className="list-decimal list-inside space-y-0.5">
            {pbq.steps.map((s) => (
              <li key={s.id}>
                <InlineText text={s.text} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Matching task
 * ------------------------------------------------------------------ */

function MatchingTask({ session, pbq }: { session: PbqSession; pbq: MatchingPbq }) {
  const { t } = useLang();
  const optionText = new Map(pbq.options.map((o) => [o.id, o.text]));
  return (
    <div className="space-y-3" id="pbq_match_list">
      {!session.graded && (
        <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400" id="pbq_match_hint">
          {t("pbq.matchingHint")}
        </p>
      )}
      {pbq.prompts.map((p) => {
        const chosen = session.matches[p.id] ?? "";
        const correct = session.grade?.perItem[p.id];
        let style = "border-slate-800 bg-slate-950/40";
        if (session.graded) {
          style = correct ? "border-emerald-500/60 bg-emerald-500/10" : "border-rose-500/60 bg-rose-500/10";
        }
        return (
          <div key={p.id} className={`p-3 rounded border text-xs space-y-2 transition-all ${style}`} id={`pbq_match_row_${p.id}`}>
            <label htmlFor={`pbq_match_${p.id}`} className="block text-slate-300 leading-relaxed">
              <InlineText text={p.text} />
            </label>
            <select
              id={`pbq_match_${p.id}`}
              value={chosen}
              disabled={session.graded}
              onChange={(e) => session.setMatch(p.id, e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded px-2.5 py-2 text-xs disabled:opacity-80"
            >
              <option value="">{t("pbq.choosePlaceholder")}</option>
              {pbq.options.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.text}
                </option>
              ))}
            </select>
            {session.graded && (
              <p className={`flex flex-wrap items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${correct ? "text-emerald-300" : "text-rose-300"}`}>
                {correct ? <Check className="w-3 h-3" aria-hidden="true" /> : <X className="w-3 h-3" aria-hidden="true" />}
                <span>{correct ? t("pbq.correct") : t("pbq.incorrect")}</span>
                {!correct && (
                  <span className="text-slate-400 normal-case">
                    {t("pbq.correctAnswerIs", { answer: optionText.get(p.correctOptionId) ?? "" })}
                  </span>
                )}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Feedback after grading one scenario
 * ------------------------------------------------------------------ */

function Feedback({ session }: { session: PbqSession }) {
  const { t } = useLang();
  const grade = session.grade!;
  const last = session.index === session.scenarios.length - 1;
  return (
    <div className="space-y-4" id="pbq_feedback">
      <p className="sr-only" role="status" aria-live="polite" id="pbq_feedback_announcer">
        {grade.passed ? t("pbq.allCorrect") : t("pbq.scoreLine", { correct: grade.correct, total: grade.total })}
      </p>
      <div
        className={`p-4 rounded border ${grade.passed ? "bg-emerald-500/[0.02] border-emerald-500/20" : "bg-rose-500/[0.02] border-rose-500/20"}`}
        id="pbq_explanation_box"
      >
        <h3 className="text-xs font-mono font-bold uppercase mb-2 tracking-wider flex items-center gap-1.5">
          {grade.passed ? (
            <><Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> <span className="text-emerald-400">{t("pbq.allCorrect")}</span></>
          ) : (
            <><X className="w-4 h-4 text-rose-400" aria-hidden="true" /> <span className="text-rose-400">{t("pbq.scoreLine", { correct: grade.correct, total: grade.total })}</span></>
          )}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed" id="pbq_explanation">
          <InlineText text={session.current!.explanation} />
        </p>
      </div>
      <button
        id="pbq_next"
        onClick={session.next}
        className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1"
      >
        <span>{last ? t("pbq.finish") : t("pbq.next")}</span>
        <ChevronRight className="w-4 h-4 stroke-[3]" />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * End-of-run summary
 * ------------------------------------------------------------------ */

function PbqSummary({ session, scenarios }: { session: PbqSession; scenarios: Pbq[] }) {
  const { t } = useLang();
  const titleById = new Map(scenarios.map((p) => [p.id, p.title]));
  const totalItems = session.results.reduce((sum, r) => sum + r.grade.total, 0);
  const correctItems = session.results.reduce((sum, r) => sum + r.grade.correct, 0);
  const perfect = session.results.filter((r) => r.grade.passed).length;
  return (
    <div className="space-y-5" id="pbq_summary">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200" id="pbq_summary_title">
        {t("pbq.summaryTitle")}
      </h2>
      <div className="p-4 rounded border border-slate-800 bg-slate-950/40 text-center space-y-1" id="pbq_summary_score">
        <p className="text-2xl font-bold text-cyan-400 tabular-nums">
          {t("pbq.summaryScore", { correct: correctItems, total: totalItems })}
        </p>
        <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
          {t("pbq.summaryScenarios", { perfect, total: session.results.length })}
        </p>
      </div>

      <ul className="space-y-2" id="pbq_summary_list">
        {session.results.map((r) => (
          <li
            key={r.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded border border-slate-800 bg-slate-950/40 text-xs"
          >
            <span className="min-w-0 truncate text-slate-300">{titleById.get(r.id) ?? `#${r.id}`}</span>
            <span className={`shrink-0 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider ${r.grade.passed ? "text-emerald-300" : "text-amber-300"}`}>
              {r.grade.passed ? <Check className="w-3 h-3" aria-hidden="true" /> : <X className="w-3 h-3" aria-hidden="true" />}
              {t("pbq.scoreLine", { correct: r.grade.correct, total: r.grade.total })}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2">
        <button
          id="pbq_restart"
          onClick={() => session.begin(scenarios)}
          className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 rounded transition-all text-xs flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{t("pbq.restart")}</span>
        </button>
        <button
          id="pbq_exit"
          onClick={session.exit}
          className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 rounded transition-all text-xs"
        >
          {t("pbq.backToList")}
        </button>
      </div>
    </div>
  );
}
