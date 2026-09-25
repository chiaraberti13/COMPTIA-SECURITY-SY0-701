import { Activity, AlertTriangle, ArrowRight, CheckSquare, ChevronRight, GraduationCap, Sparkles } from "lucide-react";
import type { DomainGuide } from "../domainGuides";
import { useLang } from "../i18n";

/**
 * The reasoned guide shown above a domain's study content: purpose, objectives
 * with their official sub-topics, study path, decision patterns, comparison
 * tables, common traps, applied scenario, guided exercises and mastery checks.
 * Optional sections render only when the guide provides them.
 */
export default function DomainGuidePanel({ guide }: { guide: DomainGuide }) {
  const { t } = useLang();
  return (
    <details className="group bg-slate-900 border border-cyan-900/50 rounded-lg shadow-md overflow-hidden" id={`domain_guide_${guide.domainId}`}>
      <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest">{t("study.domainGuide")}</div>
            <h2 className="text-base font-bold text-slate-100 truncate">{guide.title}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-flex text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-900 px-2.5 py-1 rounded-full">
            {t("study.officialWeight", { weight: guide.weight })}
          </span>
          <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-90" />
        </div>
      </summary>

      <div className="border-t border-slate-800 p-5 sm:p-6 space-y-7">
        <section className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.guidePurpose")}</h3>
          <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-4">{guide.purpose}</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.objectiveMap")}</h3>
          <div className="grid gap-2">
            {guide.objectives.map((objective) => (
              <div key={objective.code} className="flex gap-3 bg-slate-950/70 border border-slate-800 rounded-md p-3">
                <span className="font-mono font-bold text-cyan-400 text-xs shrink-0">{objective.code}</span>
                <div className="min-w-0 space-y-2">
                  <p className="text-xs text-slate-300 leading-relaxed">{objective.outcome}</p>
                  {objective.keyTopics && objective.keyTopics.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5" aria-label={t("study.keyTopics", { code: objective.code })}>
                      {objective.keyTopics.map((topic) => (
                        <li key={topic} className="text-[11px] text-slate-400 bg-slate-900 border border-slate-800 rounded px-2 py-0.5 leading-snug">{topic}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.studyPath")}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {guide.studyPath.map((step) => (
              <div key={step.title} className="bg-slate-950/40 border border-slate-800 rounded-md p-3.5">
                <h4 className="text-xs font-bold text-cyan-300 mb-1.5">{step.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{step.rationale}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-5">
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.decisionPatterns")}</h3>
            <ul className="space-y-2">
              {guide.decisionPatterns.map((pattern) => (
                <li key={pattern} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{pattern}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.connections")}</h3>
            <ul className="space-y-2">
              {guide.connections.map((connection) => (
                <li key={connection} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                  <span>{connection}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {guide.comparisons && guide.comparisons.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.comparisons")}</h3>
            <div className="space-y-4">
              {guide.comparisons.map((comparison) => (
                // A scrollable region must be reachable from the keyboard to scroll it.
                <div key={comparison.title} className="overflow-x-auto border border-slate-800 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" tabIndex={0} role="region" aria-label={t("a11y.scrollableTable", { title: comparison.title })}>
                  <table className="w-full text-left text-xs">
                    <caption className="text-left text-xs font-bold text-cyan-300 bg-slate-950/70 px-3 py-2 border-b border-slate-800">{comparison.title}</caption>
                    <thead>
                      <tr className="bg-slate-900">
                        {comparison.headers.map((header) => (
                          <th key={header} scope="col" className="px-3 py-2 font-semibold text-slate-300">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.rows.map((row) => (
                        <tr key={row[0]} className="border-t border-slate-800 align-top">
                          <th scope="row" className="px-3 py-2 font-semibold text-slate-200 min-w-[6rem]">{row[0]}</th>
                          {row.slice(1).map((cell, cellIdx) => (
                            <td key={cellIdx} className="px-3 py-2 text-slate-400 leading-relaxed min-w-[7rem]">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </section>
        )}

        {guide.commonTraps && guide.commonTraps.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.commonTraps")}</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {guide.commonTraps.map((trap) => (
                <li key={trap.misconception} className="bg-slate-950/40 border border-slate-800 rounded-md p-3.5 space-y-2">
                  <p className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <span><span className="font-bold text-amber-300">{t("study.trapWrong")}:</span> {trap.misconception}</span>
                  </p>
                  <p className="flex gap-2 text-xs text-slate-400 leading-relaxed">
                    <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
                    <span><span className="font-bold text-cyan-300">{t("study.trapRight")}:</span> {trap.correction}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-slate-950/70 border border-slate-700 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{t("study.appliedScenario")} · {guide.appliedScenario.title}</h3>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{t("study.scenarioChallenge")}</div>
            <p className="text-xs text-slate-300 leading-relaxed">{guide.appliedScenario.prompt}</p>
          </div>
          <div className="space-y-1 border-t border-slate-800 pt-3">
            <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{t("study.scenarioReasoning")}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{guide.appliedScenario.reasoning}</p>
          </div>
        </section>

        {guide.practiceScenarios && guide.practiceScenarios.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.practiceScenarios")}</h3>
            <div className="space-y-3">
              {guide.practiceScenarios.map((scenario) => (
                <div key={scenario.title} className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-[10px] text-cyan-300 bg-cyan-950/40 border border-cyan-900 px-2 py-0.5 rounded-full">{t("study.objectiveTag", { code: scenario.objective })}</span>
                    <h4 className="text-xs font-bold text-slate-200">{scenario.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{scenario.prompt}</p>
                  {/* The reasoning stays folded so the learner commits to an answer first. */}
                  <details className="group/answer border-t border-slate-800 pt-2">
                    <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded">
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-open/answer:rotate-90" aria-hidden="true" />
                      {t("study.showReasoning")}
                    </summary>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">{scenario.reasoning}</p>
                  </details>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-4 space-y-3">
          <h3 className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">{t("study.readiness")}</h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {guide.readinessChecks.map((check) => (
              <li key={check} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </details>
  );
}
