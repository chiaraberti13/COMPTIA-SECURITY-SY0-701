import { useRef, type KeyboardEvent } from "react";
import { FileText, RefreshCw, BookOpen, Activity, MessageSquare, ShieldCheck, ClipboardList } from "lucide-react";
import { useLang, type UIKey } from "../i18n";

export type AppTab = "studio" | "quiz" | "glossary" | "pbq";

const TABS: { id: AppTab; label: UIKey; shortLabel: UIKey; icon: typeof BookOpen }[] = [
  { id: "studio", label: "tab.studio", shortLabel: "tab.studioShort", icon: BookOpen },
  { id: "glossary", label: "tab.glossary", shortLabel: "tab.glossaryShort", icon: FileText },
  { id: "quiz", label: "tab.quiz", shortLabel: "tab.quizShort", icon: Activity },
  { id: "pbq", label: "tab.pbq", shortLabel: "tab.pbqShort", icon: ClipboardList },
];

/** A stable two-row notebook header; a single row only where all controls fit. */
export default function AppHeader({ activeTab, onTabChange, sidebarOpen, onToggleSidebar }: {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { t, lang, setLang, isLoadingLang } = useLang();
  const tabButtons = useRef<Partial<Record<AppTab, HTMLButtonElement | null>>>({});

  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % TABS.length; break;
      case "ArrowLeft": next = (index + TABS.length - 1) % TABS.length; break;
      case "Home": next = 0; break;
      case "End": next = TABS.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onTabChange(TABS[next].id);
    tabButtons.current[TABS[next].id]?.focus();
  };
  const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

  return (
    <header className="shrink-0 sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur" id="app_header">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-3 py-2 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_auto_auto] 2xl:gap-x-6 2xl:py-3">
        <div className="flex items-center gap-2.5 min-w-0" id="header_brand">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-cyan-500/10 shrink-0" id="logo_icon_box">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold tracking-tight text-cyan-400 truncate" id="header_title"><span className="hidden sm:inline">CompTIA </span>Security+ SY0-701</h1>
            <p className="text-xs text-slate-400 hidden sm:block truncate" id="header_subtitle">{t("header.subtitle")}</p>
          </div>
        </div>

        <nav className="row-start-2 col-span-2 min-w-0 border-t border-slate-800/70 pt-2 2xl:row-start-1 2xl:col-start-2 2xl:col-span-1 2xl:border-0 2xl:pt-0" id="navigation_tabs" aria-label={t("a11y.mainNavigation")}>
          <div className="grid grid-cols-4 gap-1 sm:gap-2 rounded-xl bg-slate-900/70 p-1" role="tablist" aria-label={t("a11y.mainNavigation")}>
            {TABS.map(({ id, label, shortLabel, icon: Icon }, index) => (
              <button
                key={id}
                ref={(node) => { tabButtons.current[id] = node; }}
                id={`tab_btn_${id}`}
                type="button"
                role="tab"
                aria-label={t(label)}
                aria-selected={activeTab === id}
                tabIndex={activeTab === id ? 0 : -1}
                onClick={() => onTabChange(id)}
                onKeyDown={(event) => navigateTabs(event, index)}
                className={`min-w-0 min-h-11 px-0 sm:px-4 py-1.5 rounded-lg text-[10px] min-[360px]:text-[11px] sm:text-sm font-semibold transition-colors flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${focusRing} ${activeTab === id ? "bg-cyan-700 text-white shadow-sm" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t(shortLabel)}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="row-start-1 col-start-2 flex items-center gap-2 sm:gap-3 2xl:col-start-3" id="header_utilities">
          <button
            id="toggle_sidebar_btn"
            type="button"
            aria-label={t("tab.aiTrainer")}
            aria-pressed={sidebarOpen}
            onClick={onToggleSidebar}
            className={`min-h-11 min-w-11 px-2.5 sm:px-3 rounded-lg border text-xs font-semibold transition-colors flex items-center justify-center gap-2 ${focusRing} ${sidebarOpen ? "bg-cyan-950/70 text-cyan-300 border-cyan-700" : "border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"}`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">{t("tab.aiShort")}</span>
          </button>
          <div className="flex items-center rounded-lg border border-slate-700 p-0.5 shrink-0 gap-0.5" id="lang_toggle" role="group" aria-label={t("lang.label")}>
            {(["it", "en"] as const).map((language) => (
              <button
                key={language}
                id={`lang_btn_${language}`}
                type="button"
                aria-pressed={lang === language}
                onClick={() => setLang(language)}
                disabled={language === "en" && isLoadingLang}
                title={language === "en" && isLoadingLang ? t("lang.loadingEn") : undefined}
                className={`min-h-10 min-w-9 sm:min-w-10 rounded-md px-2 text-[11px] font-bold transition-colors flex items-center justify-center gap-1 disabled:opacity-60 ${focusRing} ${lang === language ? "bg-cyan-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800"}`}
              >
                {language === "en" && isLoadingLang && <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />}
                {language.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
