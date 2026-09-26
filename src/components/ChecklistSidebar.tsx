import type { StudySession } from "../hooks/useStudySession";
import type { TopicGroup } from "../types";
import {
  ShieldAlert,
  FileText,
  Calculator,
  TrendingUp,
  Lock,
  Users,
  Handshake,
  CheckSquare,
  GraduationCap,
  Check,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import type { Subtopic } from "../types";
import { useLang, localizeSubgroup } from "../i18n";
import { getSubgroupForSubtopic } from "../subgroups";

/**
 * The left pane of the study area: the five domains, their topic groups and
 * the units of each group, with a tick box per unit and the progress bars.
 */
export default function ChecklistSidebar({ study, domainTopics }: {
  study: StudySession;
  domainTopics: TopicGroup[];
}) {
  const { t, lang } = useLang();
  const { activeDomain, selectedSubtopic, checkedItems } = study;
  const handleSwitchDomain = study.switchDomain;
  const handleToggleGroupCheck = study.toggleGroupCheck;
  const setSelectedSubtopic = study.selectSubtopic;

  // Get matching icon for each topic group
  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
      case "FileText": return <FileText className="w-5 h-5 text-cyan-400" />;
      case "Calculator": return <Calculator className="w-5 h-5 text-cyan-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case "Lock": return <Lock className="w-5 h-5 text-cyan-400" />;
      case "Users": return <Users className="w-5 h-5 text-cyan-400" />;
      case "Handshake": return <Handshake className="w-5 h-5 text-cyan-400" />;
      case "CheckSquare": return <CheckSquare className="w-5 h-5 text-cyan-400" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <aside className="w-full md:w-80 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900/30 p-4 flex flex-col shrink-0" id="checklist_sidebar">
      <div className="mb-4 pb-2 border-b border-slate-800/60" id="checklist_header">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("sidebar.browseChecklist")}</h2>
        <p className="text-[11px] text-slate-400 mt-1 mb-3">{t("sidebar.selectAndCheck")}</p>
        <div className="grid grid-cols-5 gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
          <button
            onClick={() => handleSwitchDomain(1)}
            className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 1 ? "bg-cyan-700 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
          >
            {t("sidebar.domShort", { n: 1 })}
          </button>
          <button
            onClick={() => handleSwitchDomain(2)}
            className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 2 ? "bg-cyan-700 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
          >
            {t("sidebar.domShort", { n: 2 })}
          </button>
          <button
            onClick={() => handleSwitchDomain(3)}
            className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 3 ? "bg-cyan-700 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
          >
            {t("sidebar.domShort", { n: 3 })}
          </button>
          <button
            onClick={() => handleSwitchDomain(4)}
            className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 4 ? "bg-cyan-700 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
          >
            {t("sidebar.domShort", { n: 4 })}
          </button>
          <button
            onClick={() => handleSwitchDomain(5)}
            className={`py-1.5 text-[9px] font-bold rounded uppercase tracking-wider transition-all ${activeDomain === 5 ? "bg-cyan-700 text-white shadow-sm font-bold" : "text-slate-400 hover:text-slate-200"}`}
          >
            {t("sidebar.domShort", { n: 5 })}
          </button>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-1 select-none scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent" id="checklist_topics_list">
        {domainTopics.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1.5" id={`group_${groupIdx}`}>
            <div className="flex items-center gap-2 px-2 py-0.5" id={`group_title_${groupIdx}`}>
              {getTopicIcon(group.icon)}
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider truncate">{group.title}</span>
            </div>

            <div className="space-y-3 pl-1" id={`group_subtopics_${groupIdx}`}>
              {(() => {
                const orderedUnits: { type: "subgroup" | "standalone"; name: string; key: string; subtopics: Subtopic[] }[] = [];
                const seenSubgroups = new Set<string>();

                group.subtopics.forEach((sub) => {
                  const sg = getSubgroupForSubtopic(sub.checklistKey);
                  if (sg) {
                    if (!seenSubgroups.has(sg)) {
                      seenSubgroups.add(sg);
                      orderedUnits.push({
                        type: "subgroup",
                        // `key` stays the canonical Italian name: it identifies the
                        // unit in stored progress. Only the label is localized.
                        name: localizeSubgroup(sg, lang),
                        key: sg,
                        subtopics: group.subtopics.filter(s => getSubgroupForSubtopic(s.checklistKey) === sg)
                      });
                    }
                  } else {
                    orderedUnits.push({
                      type: "standalone",
                      name: sub.name,
                      key: sub.checklistKey,
                      subtopics: [sub]
                    });
                  }
                });

                return (
                  <div className="space-y-0.5 pl-1" id={`units_list_${groupIdx}`}>
                    {orderedUnits.map((unit, unitIdx) => {
                      const isSelected = unit.subtopics.some(s => s.checklistKey === selectedSubtopic.checklistKey);
                      const isAllChecked = unit.subtopics.every(s => !!checkedItems[s.checklistKey]);
                      const isSomeChecked = unit.subtopics.some(s => !!checkedItems[s.checklistKey]) && !isAllChecked;
                      const completedCount = unit.subtopics.filter(s => !!checkedItems[s.checklistKey]).length;
                      const totalCount = unit.subtopics.length;

                      return (
                        // Checkbox and topic link are siblings, not nested: a control inside
                        // another interactive element is unreachable for assistive tech.
                        <div 
                          key={unit.key} 
                          id={`unit_${groupIdx}_${unitIdx}`}
                          className={`group flex items-center gap-1 p-1 rounded border border-transparent transition-all ${isSelected ? "bg-cyan-500/10 border-l-2 border-l-cyan-500 text-cyan-50 font-medium" : "text-xs text-slate-400 hover:text-slate-300 hover:bg-slate-900/30"}`}
                        >
                          {/* Checklist checkbox for bulk selection of all subtopics in subgroup.
                              The button is 24px (WCAG 2.2 target size); the visible box stays 16px. */}
                          <button 
                            id={`unit_check_box_${groupIdx}_${unit.key}`}
                            type="button"
                            role="checkbox"
                            aria-checked={isAllChecked ? true : isSomeChecked ? "mixed" : false}
                            aria-label={t("a11y.toggleCheck", { name: unit.name })}
                            onClick={() => handleToggleGroupCheck(unit.subtopics.map(s => s.checklistKey))}
                            className="w-6 h-6 flex items-center justify-center shrink-0 rounded focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500"
                          >
                            <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isAllChecked ? "bg-cyan-500 border-cyan-500 text-slate-950" : isSomeChecked ? "border-cyan-600 bg-cyan-950/40 text-cyan-400" : "border-slate-700 hover:border-slate-500 bg-slate-950"}`}>
                              {isAllChecked ? (
                                <Check className="w-3 h-3 stroke-[3]" />
                              ) : isSomeChecked ? (
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
                              ) : null}
                            </span>
                          </button>

                          <button
                            type="button"
                            id={`unit_label_${groupIdx}_${unit.key}`}
                            aria-current={isSelected}
                            aria-label={t("a11y.selectTopic", { name: unit.name })}
                            onClick={() => setSelectedSubtopic(unit.subtopics[0])}
                            className="flex items-center justify-between gap-2 min-w-0 flex-1 p-1 text-left rounded cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500"
                          >
                            <span className="flex flex-col min-w-0" id={`unit_text_${unit.key}`}>
                              <span className="truncate text-xs text-slate-300 group-hover:text-cyan-200 transition-colors font-medium leading-tight">
                                {unit.name}
                              </span>
                              {totalCount > 1 && (
                                <span className="text-[9px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors leading-none mt-0.5">
                                  {t("common.completedOf", { done: completedCount, total: totalCount })}
                                </span>
                              )}
                            </span>
                            <ChevronRight className={`w-3 h-3 shrink-0 transition-transform ${isSelected ? "text-cyan-400 translate-x-0.5" : "text-slate-600"}`} aria-hidden="true" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Tracker Widget inspired by Design HTML */}
      <div className="mt-4 p-4 rounded-lg bg-slate-900 border border-slate-800" id="checklist_progress_box">
        <div className="flex justify-between text-[10px] text-slate-400 mb-2">
          <span className="uppercase font-semibold font-mono tracking-wider">{t("sidebar.domainProgress", { n: activeDomain })}</span>
          <span className="font-mono font-bold text-cyan-400">
            {(() => {
              const subs = domainTopics.flatMap(g => g.subtopics);
              const checkedCount = subs.filter(sub => !!checkedItems[sub.checklistKey]).length;
              return `${checkedCount} / ${subs.length}`;
            })()}
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-300" 
            style={{ 
              width: `${(() => {
                const subs = domainTopics.flatMap(g => g.subtopics);
                const checkedCount = subs.filter(sub => !!checkedItems[sub.checklistKey]).length;
                return subs.length ? (checkedCount / subs.length) * 100 : 0;
              })()}%` 
            }}
          ></div>
        </div>
        <p className="text-[10px] text-slate-400 mt-2.5 italic">{t("sidebar.passingScore")}</p>
      </div>
    </aside>
  );
}
