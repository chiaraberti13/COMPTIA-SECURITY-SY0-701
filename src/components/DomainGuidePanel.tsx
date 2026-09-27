import type { MouseEvent, ReactNode } from "react";
import { Activity, AlertTriangle, ArrowRight, BookMarked, CheckSquare, ChevronRight, ExternalLink, Flag, GraduationCap, Sparkles } from "lucide-react";
import { reviewSummary, sourcesOf, type Source } from "../contentReview";
import type { DomainGuide } from "../domainGuides";
import type { DomainRoute, RouteStep } from "../domainRoutes";
import { useLang } from "../i18n";
import { actionLabel, type StudyAction } from "../studyPaths";
import Callout from "./Callout";

const ISSUES_URL = "https://github.com/chiaraberti13/CompTIA-Security-SY0-701/issues";

/** A link that leaves the app: new tab, no referrer, said aloud to screen readers. */
function ExternalAnchor({ href, children }: { href: string; children: ReactNode }) {
  const { t } = useLang();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline decoration-cyan-800 underline-offset-2">
      {children}
      <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
      <span className="sr-only">{t("a11y.newTab")}</span>
    </a>
  );
}

/** Sources of the domain's objectives and how many of them a person reviewed. */
function SourcesAndReview({ guide }: { guide: DomainGuide }) {
  const { t } = useLang();
  const codes = guide.objectives.map((o) => o.code);
  const sources = sourcesOf(codes);
  const summary = reviewSummary(codes);
  const list = (items: Source[]) => (
    <ul className="space-y-1">
      {items.map((source) => (
        <li key={source.url} className="text-xs text-slate-300 leading-relaxed">
          <ExternalAnchor href={source.url}>{source.title}</ExternalAnchor>
          <span className="text-slate-400"> — {source.publisher}</span>
        </li>
      ))}
    </ul>
  );
  return (
    <details className="group/sources border border-slate-800 rounded-lg" id={`guide_sources_${guide.domainId}`}>
      <summary className="cursor-pointer list-none p-3 flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 rounded-lg">
        <BookMarked className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
        {t("study.sourcesTitle")}
        <ChevronRight className="w-3.5 h-3.5 ml-auto transition-transform group-open/sources:rotate-90" aria-hidden="true" />
      </summary>
      <div className="border-t border-slate-800 p-4 space-y-4">
        <p className="text-xs text-slate-400 leading-relaxed">{t("study.sourcesNote")}</p>
        <p className="text-xs text-slate-200 font-semibold" id={`guide_review_status_${guide.domainId}`}>
          {t("study.reviewStatus", { reviewed: summary.reviewed, total: codes.length })}
        </p>
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-cyan-300">{t("study.primarySources")}</h4>
          {list(sources.filter((s) => s.kind !== "reference"))}
        </div>
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-cyan-300">{t("study.secondarySources")}</h4>
          {list(sources.filter((s) => s.kind === "reference"))}
        </div>
        <p className="text-xs"><ExternalAnchor href={ISSUES_URL}>{t("study.reportError")}</ExternalAnchor></p>
      </div>
    </details>
  );
}

/** One list of the route: what to know before the domain, or where to go next. */
function RouteList({
  id,
  title,
  steps,
  onAction,
}: {
  id: string;
  title: string;
  steps: RouteStep[];
  onAction: (action: StudyAction) => void;
}) {
  const { t } = useLang();
  return (
    <section className="space-y-3" aria-labelledby={`${id}_title`} id={id}>
      <h3 id={`${id}_title`} tabIndex={-1} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
      <ul className="space-y-2">
        {steps.map((step) => (
          <li key={step.text} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-950/40 border border-slate-800 rounded-md p-3">
            <p className="flex-1 text-xs text-slate-300 leading-relaxed">{step.text}</p>
            {step.action && (
              <button
                type="button"
                onClick={() => onAction(step.action!)}
                className="self-start sm:self-auto shrink-0 min-h-[36px] inline-flex items-center gap-1 px-3 py-1.5 rounded border border-cyan-800 bg-cyan-950/40 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                {actionLabel(step.action, t)}
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** One entry of the guide's table of contents. */
interface ContentsEntry {
  /** The heading, or the <details>, the entry jumps to. */
  target: string;
  label: string;
}

/**
 * "In this guide": links to every section the guide actually has. A jump
 * moves focus to the section heading, so keyboard and screen-reader users
 * carry on reading from there; a folded section (the sources) opens first.
 */
function GuideContents({ domainId, entries }: { domainId: number; entries: ContentsEntry[] }) {
  const { t } = useLang();
  const jump = (event: MouseEvent, target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    event.preventDefault();
    if (el instanceof HTMLDetailsElement) el.open = true;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ block: "start", behavior: reduceMotion ? "auto" : "smooth" });
    const focusable = el instanceof HTMLDetailsElement ? el.querySelector("summary") : el;
    focusable?.focus({ preventScroll: true });
  };
  return (
    <nav aria-labelledby={`guide_contents_${domainId}_title`} id={`guide_contents_${domainId}`} className="bg-slate-950/40 border border-slate-800 rounded-lg p-4 space-y-2">
      <h3 id={`guide_contents_${domainId}_title`} className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.contents")}</h3>
      <ol className="grid sm:grid-cols-2 gap-x-4 gap-y-1 list-decimal list-inside text-xs text-slate-300">
        {entries.map((entry) => (
          <li key={entry.target}>
            <a
              href={`#${entry.target}`}
              onClick={(event) => jump(event, entry.target)}
              className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-900 underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * The reasoned guide shown above a domain's study content: purpose, objectives
 * with their official sub-topics, study path, decision patterns, comparison
 * tables, common traps, applied scenario, guided exercises and mastery checks.
 * Optional sections render only when the guide provides them. The route
 * frames the guide: what to know before it and where to continue after it.
 */
export default function DomainGuidePanel({
  guide,
  route,
  onAction,
}: {
  guide: DomainGuide;
  route: DomainRoute;
  onAction: (action: StudyAction) => void;
}) {
  const { t } = useLang();
  const d = guide.domainId;
  /** Id and focusability of a section heading, the target of the table of contents. */
  const headingProps = (key: string) => ({ id: `guide_h_${key}_${d}`, tabIndex: -1 });
  const has = (list?: unknown[]) => Boolean(list && list.length > 0);
  const contents: ContentsEntry[] = [
    { target: `guide_before_${d}_title`, label: t("study.routeBefore") },
    { target: `guide_h_objectives_${d}`, label: t("study.objectiveMap") },
    { target: `guide_h_path_${d}`, label: t("study.studyPath") },
    { target: `guide_h_patterns_${d}`, label: t("study.decisionPatterns") },
    { target: `guide_h_connections_${d}`, label: t("study.connections") },
    ...(has(guide.comparisons) ? [{ target: `guide_h_comparisons_${d}`, label: t("study.comparisons") }] : []),
    ...(has(guide.commonTraps) ? [{ target: `guide_h_traps_${d}`, label: t("study.commonTraps") }] : []),
    ...(has(guide.examVsPractice) ? [{ target: `guide_h_practice_gap_${d}`, label: t("study.examVsPractice") }] : []),
    { target: `guide_h_scenario_${d}`, label: t("study.appliedScenario") },
    ...(has(guide.practiceScenarios) ? [{ target: `guide_h_practice_${d}`, label: t("study.practiceScenarios") }] : []),
    { target: `guide_h_readiness_${d}`, label: t("study.readiness") },
    { target: `guide_sources_${d}`, label: t("study.sourcesTitle") },
    { target: `guide_next_${d}_title`, label: t("study.routeNext") },
  ];
  return (
    <details className="group bg-slate-900 border border-cyan-900/50 rounded-lg shadow-md overflow-hidden" id={`domain_guide_${guide.domainId}`}>
      <summary id={`domain_guide_${guide.domainId}_summary`} className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500">
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
          <h3 {...headingProps("purpose")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.guidePurpose")}</h3>
          <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-cyan-500 pl-4">{guide.purpose}</p>
        </section>

        <GuideContents domainId={d} entries={contents} />

        <RouteList id={`guide_before_${guide.domainId}`} title={t("study.routeBefore")} steps={route.before} onAction={onAction} />

        <section className="space-y-3">
          <h3 {...headingProps("objectives")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.objectiveMap")}</h3>
          <div className="grid gap-2">
            {guide.objectives.map((objective) => (
              <div
                key={objective.code}
                id={`guide_objective_${objective.code.replace(".", "_")}`}
                tabIndex={-1}
                className="flex gap-3 bg-slate-950/70 border border-slate-800 rounded-md p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
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
          <h3 {...headingProps("path")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.studyPath")}</h3>
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
            <h3 {...headingProps("patterns")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.decisionPatterns")}</h3>
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
            <h3 {...headingProps("connections")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.connections")}</h3>
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
            <h3 {...headingProps("comparisons")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.comparisons")}</h3>
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
            <h3 {...headingProps("traps")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.commonTraps")}</h3>
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

        {has(guide.examVsPractice) && (
          <section className="space-y-3">
            <h3 {...headingProps("practice_gap")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.examVsPractice")}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{t("study.examVsPracticeIntro")}</p>
            <ul className="space-y-4" id={`guide_exam_vs_practice_${d}`}>
              {guide.examVsPractice!.map((item) => (
                <li key={item.topic} className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-200">{item.topic}</h4>
                  <div className="space-y-2">
                    <Callout kind="exam" title={t("study.onTheExam")}>{item.exam}</Callout>
                    <Callout kind="practice" title={t("study.inPractice")}>{item.practice}</Callout>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="bg-slate-950/70 border border-slate-700 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 {...headingProps("scenario")} className="focus:outline-none text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{t("study.appliedScenario")} · {guide.appliedScenario.title}</h3>
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
            <h3 {...headingProps("practice")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.practiceScenarios")}</h3>
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
          <h3 {...headingProps("readiness")} className="focus:outline-none text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">{t("study.readiness")}</h3>
          <ul className="grid sm:grid-cols-2 gap-2">
            {guide.readinessChecks.map((check) => (
              <li key={check} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>{check}</span>
              </li>
            ))}
          </ul>
        </section>

        <SourcesAndReview guide={guide} />

        <div className="border-t border-slate-800 pt-6 flex gap-3">
          <Flag className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <RouteList id={`guide_next_${guide.domainId}`} title={t("study.routeNext")} steps={route.next} onAction={onAction} />
          </div>
        </div>
      </div>
    </details>
  );
}
