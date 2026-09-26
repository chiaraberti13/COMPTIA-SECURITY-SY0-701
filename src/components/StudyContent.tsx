import type { StudySession } from "../hooks/useStudySession";
import type { DomainGuide } from "../domainGuides";
import type { GlossaryHint } from "../glossaryIndex";
import type { TopicGroup } from "../types";
import { useEffect, useRef } from "react";
import {
  Calculator,
  Check,
  BookOpen,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Info,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import type { Subtopic } from "../types";
import { useLang, localizeSubgroup, type UIKey } from "../i18n";
import { getSubgroupForSubtopic } from "../subgroups";
import GlossaryHints from "./GlossaryHints";
import DomainGuidePanel from "./DomainGuidePanel";
import MarkdownText from "./MarkdownText";
import { getDomainRoute } from "../domainRoutes";
import StudyPathsPanel from "./StudyPathsPanel";
import type { StudyAction } from "../studyPaths";

/**
 * The right pane of the study area: "Where do I start?", the domain guide,
 * the selected concept with its details, glossary terms and a question for
 * the AI Trainer, plus the quick scroll buttons.
 */
export default function StudyContent({ study, domainTopics, domainGuide, glossaryIndex, isNewLearner, onStudyAction, onAskTrainer }: {
  study: StudySession;
  domainTopics: TopicGroup[];
  domainGuide: DomainGuide;
  glossaryIndex: Map<string, GlossaryHint>;
  isNewLearner: boolean;
  onStudyAction: (action: StudyAction) => void;
  onAskTrainer: (prompt: string) => void;
}) {
  const { t, lang } = useLang();
  const { activeDomain, selectedSubtopic, checkedItems } = study;
  const handleToggleCheck = study.toggleCheck;
  const runStudyAction = onStudyAction;
  const DOMAIN_GUIDE = domainGuide;
  const GLOSSARY_INDEX = glossaryIndex;

  const studyPanelRef = useRef<HTMLElement>(null);
  const studyTopRef = useRef<HTMLDivElement>(null);

  const isFirstMount = useRef(true);

  // Scroll study panel to top when subtopic changes
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (studyTopRef.current) {
      try {
        studyTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } catch (e) {
        // Fallback for older browsers
      }
    }
    if (studyPanelRef.current) {
      studyPanelRef.current.scrollTop = 0;
      try {
        studyPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        // Fallback for older environments
      }
    }
  }, [selectedSubtopic]);

  // Scroll study panel to top/bottom
  const scrollToPanelTop = () => {
    if (studyPanelRef.current) {
      try {
        studyPanelRef.current.scrollTo({ top: 0, behavior: "smooth" });
      } catch (e) {
        studyPanelRef.current.scrollTop = 0;
      }
    }
  };

  const scrollToPanelBottom = () => {
    if (studyPanelRef.current) {
      try {
        studyPanelRef.current.scrollTo({ top: studyPanelRef.current.scrollHeight, behavior: "smooth" });
      } catch (e) {
        studyPanelRef.current.scrollTop = studyPanelRef.current.scrollHeight;
      }
    }
  };

  return (
    <div className="flex-none h-full md:flex-1 md:min-w-0 flex flex-col overflow-hidden relative" id="study_panel_wrapper">
      <main ref={studyPanelRef} className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-8 pb-24" id="study_panel">
      <div ref={studyTopRef} className="h-0 w-full pointer-events-none opacity-0" id="study_top_anchor" />
      {(() => {
        const subgroupName = getSubgroupForSubtopic(selectedSubtopic.checklistKey);
        const currentSubgroupSubtopics = (() => {
          if (!subgroupName) return [selectedSubtopic];
          const list: Subtopic[] = [];
          domainTopics.forEach(g => {
            g.subtopics.forEach(sub => {
              if (getSubgroupForSubtopic(sub.checklistKey) === subgroupName) {
                list.push(sub);
              }
            });
          });
          return list.length > 0 ? list : [selectedSubtopic];
        })();

        const completedInGroup = currentSubgroupSubtopics.filter(s => !!checkedItems[s.checklistKey]).length;
        const totalInGroup = currentSubgroupSubtopics.length;
        const percentComplete = totalInGroup > 0 ? Math.round((completedInGroup / totalInGroup) * 100) : 0;

        return (
          <div className="max-w-3xl mx-auto space-y-8" id="study_content_container">

            {/* "Where do I start?": open until the learner has any progress. */}
            <StudyPathsPanel
              defaultOpen={isNewLearner}
              onAction={runStudyAction}
            />

            {/* Domain-level learning guide: orientation before individual concepts. */}
            <DomainGuidePanel guide={DOMAIN_GUIDE} route={getDomainRoute(activeDomain, lang)} onAction={runStudyAction} />

            {/* Topic Header Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg relative overflow-hidden shadow-md" id="topic_hero_card">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-widest mb-3" id="topic_crumbs">
                <span>{t("study.domain")} {activeDomain}</span>
                <span>·</span>
                <span>{t(`domainCrumb.${activeDomain}` as UIKey)}</span>
                {subgroupName && (
                  <>
                    <span>·</span>
                    <span className="text-slate-400">{localizeSubgroup(subgroupName, lang)}</span>
                  </>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-100 mb-3" id="topic_title">
                {subgroupName ? localizeSubgroup(subgroupName, lang) : selectedSubtopic.name}
              </h2>

              <p className="text-slate-300 leading-relaxed text-sm border-l-2 border-cyan-500 pl-4 bg-cyan-500/[0.03] py-2 rounded-r mb-4" id="topic_definition">
                {subgroupName
                  ? t("study.unifiedCard", { n: totalInGroup, name: localizeSubgroup(subgroupName, lang) })
                  : selectedSubtopic.definition}
              </p>

              {/* Unified Category Progress bar */}
              {totalInGroup > 1 && (
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg space-y-2 mt-4" id="category_progress_wrapper">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium">{t("study.categoryProgress")}</span>
                    <span className="font-mono font-bold text-cyan-400">{t("study.completedPercent", { done: completedInGroup, total: totalInGroup, percent: percentComplete })}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-cyan-500 transition-all duration-300" 
                      style={{ width: `${percentComplete}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Render each subtopic of this category/subgroup as a beautiful structured card */}
            <div className="space-y-8" id="concepts_cards_list">
              {currentSubgroupSubtopics.map((sub, idx) => {
                const isChecked = !!checkedItems[sub.checklistKey];
                return (
                  <div key={sub.checklistKey} className="bg-slate-900 border border-slate-800/80 rounded-lg p-6 space-y-6 relative shadow-lg hover:border-slate-700/65 transition-all" id={`concept_card_${sub.checklistKey}`}>
                    {/* Card Header with Name and its own checkbox */}
                    <div className="flex justify-between items-start gap-4 border-b border-slate-800/80 pb-3" id={`concept_hdr_${sub.checklistKey}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-1 border border-cyan-900 rounded select-none">
                          {t("study.conceptOf", { i: idx + 1, n: totalInGroup })}
                        </span>
                        <h3 className="text-lg font-bold text-slate-100">{sub.name}</h3>
                      </div>

                      {/* Individual checklist checkbox */}
                      <div className="flex items-center gap-2" id={`concept_check_wrapper_${sub.checklistKey}`}>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">{t("study.completed")}</span>
                        <button 
                          id={`concept_check_${sub.checklistKey}`}
                          role="checkbox"
                          aria-checked={isChecked}
                          aria-label={t("a11y.toggleCheck", { name: sub.name })}
                          onClick={() => handleToggleCheck(sub.checklistKey)}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0 ${isChecked ? "bg-cyan-500 border-cyan-500 text-slate-950" : "border-slate-700 hover:border-slate-500 bg-slate-950"}`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </div>
                    </div>

                    {/* Definition */}
                    <div className="bg-cyan-500/[0.02] border-l-2 border-cyan-500 pl-4 py-2.5 rounded-r" id={`concept_def_${sub.checklistKey}`}>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        {sub.definition}
                      </p>
                    </div>

                    {/* Detailed Analysis */}
                    <div className="space-y-3" id={`concept_details_${sub.checklistKey}`}>
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{t("study.detailedAnalysis")}</span>
                      </div>
                      <div className="text-sm text-slate-300 leading-relaxed space-y-3">
                        <MarkdownText text={sub.details} />
                      </div>
                    </div>

                    {/* Key Formulas (if any) */}
                    {sub.keyFormulas && sub.keyFormulas.length > 0 && (
                      <div className="bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-4 space-y-2.5" id={`concept_formulas_${sub.checklistKey}`}>
                        <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-wider">
                          <Calculator className="w-3.5 h-3.5" />
                          <span>{t("study.keyFormulas")}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {sub.keyFormulas.map((f, fIdx) => (
                            <li key={fIdx} className="text-xs font-mono text-slate-300 flex items-start gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                              <span className="text-cyan-400 font-bold select-none">{fIdx + 1}.</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Comparative Table (if any) */}
                    {sub.comparativeTable && (
                      <div className="space-y-2.5" id={`concept_table_${sub.checklistKey}`}>
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{t("study.comparativeTable")}</span>
                        </div>
                        <div className="overflow-x-auto border border-slate-800 rounded bg-slate-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500" tabIndex={0} role="region" aria-label={t("a11y.scrollableTable", { title: sub.name })}>
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b border-slate-800 bg-slate-900/60 font-bold tracking-wider">
                                {sub.comparativeTable.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="px-3 py-2.5 text-slate-400 uppercase font-mono text-[9px]">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sub.comparativeTable.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="border-b border-slate-800/50 hover:bg-slate-900/20">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="px-3 py-2 text-slate-300 leading-normal">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Exam Tip */}
                    <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex gap-3.5 items-start" id={`concept_tip_${sub.checklistKey}`}>
                      <div className="p-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-slate-200 font-semibold text-xs mb-1">{t("study.examTipTitle")}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{sub.examTip}</p>
                      </div>
                    </div>

                    <GlossaryHints
                      idPrefix={`concept_${sub.checklistKey}`}
                      index={GLOSSARY_INDEX}
                      exclude={sub.checklistKey}
                      texts={[sub.definition, sub.details, sub.examTip ?? ""]}
                    />

                    {/* Pre-filled Chat Helper for this sub-concept */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-950/60 border border-slate-800 rounded-lg" id={`concept_chat_trigger_${sub.checklistKey}`}>
                      <div className="flex items-center gap-2">
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs text-slate-400">{t("study.doubtsAbout", { name: sub.name })}</span>
                      </div>
                      <button
                        onClick={() => onAskTrainer(t("study.askPrompt", { name: sub.name }))}
                        className="text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold px-3 py-1.5 rounded transition-colors flex items-center gap-1 border border-slate-700"
                      >
                        {t("study.askExplanation")}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        );
      })()}
    </main>

    {/* Pulsanti di scorrimento rapido (Su/Giù) */}
    <div className="absolute bottom-6 right-6 flex flex-col gap-2.5 z-30" id="scroll_controls">
      <button
        onClick={scrollToPanelTop}
        className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 shadow-xl shadow-black/60 transition-all duration-200 group flex items-center justify-center backdrop-blur-sm"
        title={t("study.scrollTop")}
        aria-label={t("study.scrollTop")}
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
      </button>
      <button
        onClick={scrollToPanelBottom}
        className="p-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 shadow-xl shadow-black/60 transition-all duration-200 group flex items-center justify-center backdrop-blur-sm"
        title={t("study.scrollBottom")}
        aria-label={t("study.scrollBottom")}
      >
        <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
      </button>
    </div>

    </div>
  );
}
