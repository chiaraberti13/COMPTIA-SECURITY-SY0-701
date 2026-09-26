import { ChevronRight, Gauge, Target } from "lucide-react";
import { useLang, type UIKey } from "../i18n";
import { PASS_RATIO } from "../quiz";
import { MIN_ATTEMPTS_FOR_SIGNAL, type AreaReadiness, type Readiness } from "../readiness";

/** A horizontal bar with the value also written as text next to it. */
function Bar({ value, tone }: { value: number; tone: "cyan" | "amber" | "rose" }) {
  const colour = tone === "cyan" ? "bg-cyan-500" : tone === "amber" ? "bg-amber-400" : "bg-rose-500";
  return (
    <span className="block h-1.5 w-full rounded-full bg-slate-800 overflow-hidden" aria-hidden="true">
      <span className={`block h-full ${colour}`} style={{ width: `${value}%` }} />
    </span>
  );
}

/** Colour of an accuracy compared with the pass mark: never the only cue, the number is always written. */
const toneOf = (accuracy: number | null): "cyan" | "amber" | "rose" =>
  accuracy === null ? "amber" : accuracy >= PASS_RATIO * 100 ? "cyan" : accuracy >= 60 ? "amber" : "rose";

/**
 * "Exam readiness": accuracy and coverage by domain, weighted by the official
 * exam weights, the weakest objectives with a button to train them, and the
 * questions available for each of the 28 objectives (the bank's coverage).
 */
export default function ReadinessPanel({ readiness, onTrainObjective }: {
  readiness: Readiness;
  onTrainObjective: (code: string) => void;
}) {
  const { t } = useLang();
  const { domains, objectives, weightedAccuracy, weightedCoverage, weakestObjectives, untouchedObjectives, practisedQuestions } = readiness;
  const pct = (v: number | null) => (v === null ? t("ready.noData") : `${v}%`);
  const seenOf = (a: AreaReadiness) => t("ready.seenOf", { seen: a.seen, total: a.total, pct: a.coverage });
  const objectiveName = (code: string) => t(`objective.${code}` as UIKey);

  return (
    <details
      className="group bg-slate-950/60 border border-slate-800 rounded-lg overflow-hidden"
      id="readiness_panel"
      open={practisedQuestions > 0}
    >
      <summary className="cursor-pointer list-none p-4 flex flex-wrap items-center justify-between gap-3 hover:bg-slate-900/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500">
        <span className="flex items-center gap-2 min-w-0">
          <Gauge className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-sm font-bold text-slate-100">{t("ready.title")}</span>
            <span className="block text-[11px] text-slate-400">{t("ready.subtitle")}</span>
          </span>
        </span>
        <span className="flex items-center gap-2 text-[11px] font-mono">
          <span className="px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-200" id="readiness_accuracy">
            {t("ready.accuracy")}: <strong>{pct(weightedAccuracy)}</strong>
          </span>
          <span className="px-2 py-1 rounded border border-slate-700 bg-slate-900 text-slate-200" id="readiness_coverage">
            {t("ready.coverage")}: <strong>{weightedCoverage}%</strong>
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-90" aria-hidden="true" />
        </span>
      </summary>

      <div className="border-t border-slate-800 p-4 space-y-5">
        <p className="text-[11px] text-slate-400 leading-relaxed">{t("ready.explain", { pass: Math.round(PASS_RATIO * 100) })}</p>

        {practisedQuestions === 0 && (
          <p className="text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded p-3" id="readiness_empty">{t("ready.empty")}</p>
        )}

        {/* Phones: one card per domain, the same figures as the table below. */}
        <ul className="sm:hidden space-y-2" id="readiness_domain_cards" aria-label={t("ready.domainsCaption")}>
          {domains.map(d => (
            <li key={d.domain} className="bg-slate-900 border border-slate-800 rounded-md p-3 space-y-2">
              <p className="text-xs font-semibold text-slate-200">{t(`domainMeta.${d.domain}.name` as UIKey)}</p>
              <p className="text-[11px] text-slate-400">
                {t("ready.colWeight")}: <span className="font-mono">{d.weight}%</span> · {t("ready.colDue")}: <span className="font-mono">{d.due}</span>
              </p>
              <div className="space-y-1 text-[11px] text-slate-300">
                <p>{t("ready.colSeen")}: {seenOf(d)}</p>
                <Bar value={d.coverage} tone="cyan" />
              </div>
              <div className="space-y-1 text-[11px] text-slate-300">
                <p>{t("ready.colAccuracy")}: <span className="font-mono">{pct(d.accuracy)}</span></p>
                <Bar value={d.accuracy ?? 0} tone={toneOf(d.accuracy)} />
              </div>
            </li>
          ))}
        </ul>

        <div className="hidden sm:block overflow-x-auto border border-slate-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" tabIndex={0} role="region" aria-label={t("a11y.scrollableTable", { title: t("ready.domainsCaption") })}>
          <table className="w-full text-left text-xs" id="readiness_domains">
            <caption className="text-left text-xs font-bold text-cyan-300 bg-slate-950/70 px-3 py-2 border-b border-slate-800">{t("ready.domainsCaption")}</caption>
            <thead>
              <tr className="bg-slate-900 text-slate-300">
                <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colDomain")}</th>
                <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colWeight")}</th>
                <th scope="col" className="px-3 py-2 font-semibold min-w-[8rem]">{t("ready.colSeen")}</th>
                <th scope="col" className="px-3 py-2 font-semibold min-w-[6rem]">{t("ready.colAccuracy")}</th>
                <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colDue")}</th>
              </tr>
            </thead>
            <tbody>
              {domains.map(d => (
                <tr key={d.domain} className="border-t border-slate-800 align-top">
                  <th scope="row" className="px-3 py-2 font-semibold text-slate-200">{t(`domainMeta.${d.domain}.name` as UIKey)}</th>
                  <td className="px-3 py-2 font-mono text-slate-400">{d.weight}%</td>
                  <td className="px-3 py-2 space-y-1 text-slate-300"><span className="block">{seenOf(d)}</span><Bar value={d.coverage} tone="cyan" /></td>
                  <td className="px-3 py-2 space-y-1 text-slate-300"><span className="block font-mono">{pct(d.accuracy)}</span><Bar value={d.accuracy ?? 0} tone={toneOf(d.accuracy)} /></td>
                  <td className="px-3 py-2 font-mono text-slate-400">{d.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="space-y-2" aria-labelledby="readiness_weak_title">
          <h4 id="readiness_weak_title" className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Target className="w-3.5 h-3.5 text-rose-400" aria-hidden="true" />
            {t("ready.weakTitle")}
          </h4>
          <p className="text-[11px] text-slate-400">{t("ready.weakHint", { n: MIN_ATTEMPTS_FOR_SIGNAL })}</p>
          {weakestObjectives.length === 0 ? (
            <p className="text-xs text-slate-400" id="readiness_weak_none">{t("ready.weakNone")}</p>
          ) : (
            <ul className="space-y-2" id="readiness_weak_list">
              {weakestObjectives.map(o => (
                <li key={o.code} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-900 border border-slate-800 rounded p-2.5">
                  <span className="text-xs text-slate-300">
                    {t("ready.weakItem", { code: o.code, name: objectiveName(o.code), acc: o.accuracy ?? 0, attempts: o.attempts })}
                  </span>
                  <button
                    type="button"
                    onClick={() => onTrainObjective(o.code)}
                    className="self-start sm:self-auto shrink-0 min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded border border-cyan-800 bg-cyan-950/40 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors"
                  >
                    {t("ready.train", { code: o.code })}
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
          <p className="text-[11px] text-slate-400" id="readiness_untouched">
            {t("ready.untouched", { n: untouchedObjectives.length, total: objectives.length })}
          </p>
        </section>

        <details className="group/objectives border-t border-slate-800 pt-3" id="readiness_objectives">
          <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded">
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-open/objectives:rotate-90" aria-hidden="true" />
            {t("ready.allObjectives", { n: objectives.length })}
          </summary>
          <div className="mt-3 overflow-x-auto border border-slate-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" tabIndex={0} role="region" aria-label={t("a11y.scrollableTable", { title: t("ready.objectivesCaption") })}>
            <table className="w-full text-left text-xs">
              <caption className="text-left text-xs font-bold text-cyan-300 bg-slate-950/70 px-3 py-2 border-b border-slate-800">{t("ready.objectivesCaption")}</caption>
              <thead>
                <tr className="bg-slate-900 text-slate-300">
                  <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colObjective")}</th>
                  <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colQuestions")}</th>
                  <th scope="col" className="px-3 py-2 font-semibold min-w-[7rem]">{t("ready.colSeen")}</th>
                  <th scope="col" className="px-3 py-2 font-semibold">{t("ready.colAccuracy")}</th>
                </tr>
              </thead>
              <tbody>
                {objectives.map(o => (
                  <tr key={o.code} className="border-t border-slate-800 align-top">
                    <th scope="row" className="px-3 py-2 font-normal text-slate-300"><span className="font-mono font-bold text-cyan-400 mr-1.5">{o.code}</span>{objectiveName(o.code)}</th>
                    <td className="px-3 py-2 font-mono text-slate-400">{o.total}</td>
                    <td className="px-3 py-2 font-mono text-slate-400">{o.seen} ({o.coverage}%)</td>
                    <td className="px-3 py-2 font-mono text-slate-400">{pct(o.accuracy)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </details>
  );
}
