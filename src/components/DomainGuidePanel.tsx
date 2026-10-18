import type { MouseEvent, ReactNode } from "react";
import { Activity, ArrowRight, BookMarked, CheckSquare, ChevronRight, ExternalLink, Flag, GraduationCap, Sparkles } from "lucide-react";
import { sourcesOf, type Source } from "../contentReview";
import type { AttackChain, DomainGuide, GuideFlow } from "../domainGuides";
import type { DomainRoute, RouteStep } from "../domainRoutes";
import { useLang } from "../i18n";
import { actionLabel, type StudyAction } from "../studyPaths";
import Callout from "./Callout";
import Disclosure, { DeepenTag } from "./Disclosure";
import GlossaryHints from "./GlossaryHints";
import ModuleSummary from "./ModuleSummary";
import type { GlossaryIndex } from "../glossaryIndex";

const ISSUES_URL = "https://github.com/chiaraberti13/CompTIA-Security-SY0-701/issues";

/** Numbered nodes and connectors reflow vertically on small screens. */
export function GuideFlowDiagram({ flow, id }: { flow: GuideFlow; id: string }) {
  return (
    <figure aria-labelledby={`${id}_title`} className="space-y-3 min-w-0">
      <h4 id={`${id}_title`} className="text-sm font-semibold text-cyan-300">{flow.title}</h4>
      <ol role="list" className="grid grid-cols-1 lg:grid-cols-4 gap-5 list-none">
        {flow.steps.map((step, index) => (
          <li key={step.title} className="relative min-w-0 rounded-lg border border-cyan-900 bg-slate-950/70 p-3">
            <span aria-hidden="true" className="text-xs font-mono text-cyan-400">{index + 1}</span>
            <p className="text-xs font-semibold text-slate-200 break-words">{step.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-300 break-words">{step.detail}</p>
            {index < flow.steps.length - 1 && <ArrowRight aria-hidden="true" className="absolute -bottom-5 left-1/2 -translate-x-1/2 rotate-90 lg:rotate-0 lg:bottom-auto lg:top-1/2 lg:left-auto lg:-right-5 lg:translate-x-0 w-5 h-5 text-cyan-400" />}
          </li>
        ))}
      </ol>
      <figcaption className="text-xs leading-relaxed text-slate-300">{flow.textEquivalent}</figcaption>
    </figure>
  );
}

/** The summary of a guide section folded as a deepening: the tag, then the section heading. */
function DeepenSummary({ title }: { title: string }) {
  const { t } = useLang();
  return (
    <>
      <DeepenTag>{t("study.deepen")}</DeepenTag>
      <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{title}</h3>
    </>
  );
}

/** The attack in a scenario, read from the defender's side: five labelled steps. */
function AttackChainList({ chain }: { chain: AttackChain }) {
  const { t } = useLang();
  const steps = [
    ["study.chainVector", chain.vector],
    ["study.chainImpact", chain.impact],
    ["study.chainMitigation", chain.mitigation],
    ["study.chainEvidence", chain.evidence],
    ["study.chainLimit", chain.limit],
  ] as const;
  return (
    <div className="mt-3 space-y-1.5">
      <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">{t("study.attackChain")}</div>
      <dl className="grid sm:grid-cols-[10rem_1fr] gap-x-3 gap-y-1.5 text-xs leading-relaxed">
        {steps.map(([label, text]) => (
          <div key={label} className="contents">
            <dt className="font-bold text-slate-300">{t(label)}</dt>
            <dd className="text-slate-400">{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

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

/** Sources of the domain's objectives. */
function SourcesSection({ guide }: { guide: DomainGuide }) {
  const { t } = useLang();
  const codes = guide.objectives.map((o) => o.code);
  const sources = sourcesOf(codes);
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
    <Disclosure
      variant="deepen"
      id={`guide_sources_${guide.domainId}`}
      summary={
        <>
          <DeepenTag>{t("study.deepen")}</DeepenTag>
          <h3 className="flex items-center gap-2 text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
            {t("study.sourcesTitle")}
          </h3>
        </>
      }
    >
        <p className="text-xs text-slate-400 leading-relaxed">{t("study.sourcesNote")}</p>
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-cyan-300">{t("study.primarySources")}</h4>
          {list(sources.filter((s) => s.kind !== "reference"))}
        </div>
        <div className="space-y-2">
          <h4 className="text-[11px] font-bold text-cyan-300">{t("study.secondarySources")}</h4>
          {list(sources.filter((s) => s.kind === "reference"))}
        </div>
        <p className="text-xs"><ExternalAnchor href={ISSUES_URL}>{t("study.reportError")}</ExternalAnchor></p>
    </Disclosure>
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
  glossaryIndex,
}: {
  guide: DomainGuide;
  route: DomainRoute;
  onAction: (action: StudyAction) => void;
  glossaryIndex: GlossaryIndex;
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
    { target: `guide_h_summary_${d}`, label: t("study.moduleSummary") },
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
          {/* Glossary terms named by the official sub-topics, explained in place. */}
          <GlossaryHints
            idPrefix={`guide_objectives_${d}`}
            index={glossaryIndex}
            texts={guide.objectives.flatMap((o) => [o.outcome, ...(o.keyTopics ?? [])])}
          />
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

        <Disclosure variant="deepen" id={`guide_h_connections_${d}`} summary={<DeepenSummary title={t("study.connections")} />}>
          <ul className="space-y-2">
            {guide.connections.map((connection) => (
              <li key={connection} className="flex gap-2 text-xs text-slate-300 leading-relaxed">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span>{connection}</span>
              </li>
            ))}
          </ul>
        </Disclosure>

        {guide.comparisons && guide.comparisons.length > 0 && (
          <Disclosure variant="deepen" id={`guide_h_comparisons_${d}`} summary={<DeepenSummary title={t("study.comparisons")} />}>
            <div className="space-y-4">
              {guide.flows?.map((flow, index) => <GuideFlowDiagram key={flow.title} flow={flow} id={`guide_flow_${d}_${index}`} />)}
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
                            <td key={cellIdx} className="px-3 py-2 text-slate-400 leading-relaxed min-w-[12rem] max-w-[24rem] whitespace-normal break-words">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </Disclosure>
        )}

        {guide.commonTraps && guide.commonTraps.length > 0 && (
          <section className="space-y-3">
            <h3 {...headingProps("traps")} className="focus:outline-none text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">{t("study.commonTraps")}</h3>
            <ul className="grid sm:grid-cols-2 gap-3">
              {guide.commonTraps.map((trap) => (
                <li key={trap.misconception}>
                  <Callout kind="mistake" title={t("study.commonMistake")}>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <span className="font-bold text-rose-300">{t("study.trapWrong")}:</span> {trap.misconception}
                    </p>
                    <p className="flex gap-2 mt-2 text-xs text-slate-400 leading-relaxed">
                      <CheckSquare className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" aria-hidden="true" />
                      <span><span className="font-bold text-cyan-300">{t("study.trapRight")}:</span> {trap.correction}</span>
                    </p>
                  </Callout>
                </li>
              ))}
            </ul>
          </section>
        )}

        {has(guide.examVsPractice) && (
          <Disclosure variant="deepen" id={`guide_h_practice_gap_${d}`} summary={<DeepenSummary title={t("study.examVsPractice")} />}>
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
          </Disclosure>
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
            {guide.appliedScenario.attackChain && <AttackChainList chain={guide.appliedScenario.attackChain} />}
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
                  <Disclosure variant="answer" summary={t("study.showReasoning")}>
                    <p className="text-xs text-slate-400 leading-relaxed">{scenario.reasoning}</p>
                    {scenario.attackChain && <AttackChainList chain={scenario.attackChain} />}
                  </Disclosure>
                </div>
              ))}
            </div>
          </section>
        )}

        <ModuleSummary guide={guide} headingProps={headingProps("summary")} />

        <SourcesSection guide={guide} />

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
