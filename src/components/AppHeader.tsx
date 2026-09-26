import { FileText, RefreshCw, BookOpen, Activity, MessageSquare, ShieldCheck } from "lucide-react";
import { useLang } from "../i18n";

export type AppTab = "studio" | "quiz" | "glossary";

/**
 * The top bar: logo and title, the three sections as tabs, the AI Trainer
 * toggle and the language switch. On phones and tablets the sections are equal
 * columns on a second row, all visible without scrolling.
 */
export default function AppHeader({ activeTab, onTabChange, sidebarOpen, onToggleSidebar }: {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}) {
  const { t } = useLang();
  const { lang, setLang, isLoadingLang } = useLang();
  const setActiveTab = onTabChange;
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 px-3 sm:px-6 py-2 lg:py-0 lg:h-16 shrink-0 sticky top-0 z-40 backdrop-blur" id="app_header">
      <div className="flex items-center gap-3 min-w-0 flex-1 lg:flex-none order-1">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-cyan-700 rounded-lg flex items-center justify-center text-white shadow-md shadow-cyan-500/10 shrink-0" id="logo_icon_box">
          <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xs sm:text-sm font-bold tracking-tight text-cyan-400 uppercase truncate" id="header_title"><span className="hidden sm:inline">CompTIA </span>Security+ SY0-701</h1>
          <p className="text-xs text-slate-400 hidden sm:block truncate" id="header_subtitle">{t("header.subtitle")}</p>
        </div>
      </div>

      <nav className="order-3 lg:order-2 w-full lg:w-auto lg:ml-auto flex items-stretch lg:items-center gap-1 lg:gap-3" id="navigation_tabs">
        {/* Only the three tabs belong to the tablist: the AI toggle is an
            ordinary button next to it. */}
        <div className="flex-[3] lg:flex-none grid grid-cols-3 lg:flex lg:items-center gap-1 lg:gap-3" role="tablist" aria-label={t("a11y.mainNavigation")}>
          <button
            id="tab_btn_studio"
            role="tab"
            aria-selected={activeTab === "studio"}
            onClick={() => { setActiveTab("studio"); }}
            className={`min-h-[44px] lg:min-h-0 px-1 lg:px-3 py-1.5 rounded-md text-[11px] lg:text-xs font-semibold lg:uppercase tracking-wide lg:tracking-wider transition-all duration-200 flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 min-w-0 lg:shrink-0 whitespace-nowrap ${activeTab === "studio" ? "bg-cyan-700 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <BookOpen className="w-4 h-4 lg:w-3.5 lg:h-3.5 shrink-0" aria-hidden="true" />
            <span className="lg:hidden truncate max-w-full">{t("tab.studioShort")}</span>
            <span className="hidden lg:inline">{t("tab.studio")}</span>
          </button>
          <button
            id="tab_btn_glossary"
            role="tab"
            aria-selected={activeTab === "glossary"}
            onClick={() => { setActiveTab("glossary"); }}
            className={`min-h-[44px] lg:min-h-0 px-1 lg:px-3 py-1.5 rounded-md text-[11px] lg:text-xs font-semibold lg:uppercase tracking-wide lg:tracking-wider transition-all duration-200 flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 min-w-0 lg:shrink-0 whitespace-nowrap ${activeTab === "glossary" ? "bg-cyan-700 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <FileText className="w-4 h-4 lg:w-3.5 lg:h-3.5 shrink-0" aria-hidden="true" />
            <span className="lg:hidden truncate max-w-full">{t("tab.glossaryShort")}</span>
            <span className="hidden lg:inline">{t("tab.glossary")}</span>
          </button>
          <button
            id="tab_btn_quiz"
            role="tab"
            aria-selected={activeTab === "quiz"}
            onClick={() => { setActiveTab("quiz"); }}
            className={`min-h-[44px] lg:min-h-0 px-1 lg:px-3 py-1.5 rounded-md text-[11px] lg:text-xs font-semibold lg:uppercase tracking-wide lg:tracking-wider transition-all duration-200 flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 min-w-0 lg:shrink-0 whitespace-nowrap ${activeTab === "quiz" ? "bg-cyan-700 text-white font-bold shadow-md shadow-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            <Activity className="w-4 h-4 lg:w-3.5 lg:h-3.5 shrink-0" aria-hidden="true" />
            <span className="lg:hidden truncate max-w-full">{t("tab.quizShort")}</span>
            <span className="hidden lg:inline">{t("tab.quiz")}</span>
          </button>
        </div>

        <div className="hidden lg:block h-6 w-[1px] bg-slate-700 mx-1 shrink-0" aria-hidden="true"></div>

        <button
          id="toggle_sidebar_btn"
          type="button"
          aria-pressed={sidebarOpen}
          onClick={onToggleSidebar}
          className={`flex-1 lg:flex-none min-h-[44px] lg:min-h-0 px-1 lg:px-3 py-1.5 rounded-md border text-[11px] lg:text-xs font-semibold lg:uppercase tracking-wide lg:tracking-wider transition-all duration-200 flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 min-w-0 lg:shrink-0 whitespace-nowrap ${sidebarOpen ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/30" : "border-slate-800 text-slate-400 hover:bg-slate-800/30"}`}
        >
          <MessageSquare className="w-4 h-4 lg:w-3.5 lg:h-3.5 shrink-0" aria-hidden="true" />
          <span className="lg:hidden truncate max-w-full">{t("tab.aiShort")}</span>
          <span className="hidden lg:inline">{t("tab.aiTrainer")}</span>
        </button>
      </nav>

      <div className="order-2 lg:order-3 flex items-center gap-3 shrink-0">
        <div className="hidden lg:block h-6 w-[1px] bg-slate-700 shrink-0" aria-hidden="true"></div>

        {/* Language toggle IT / EN */}
        <div className="flex items-center rounded-md border border-slate-800 overflow-hidden shrink-0" id="lang_toggle" title={t("lang.label")}>
          <button
            id="lang_btn_it"
            type="button"
            aria-pressed={lang === "it"}
            onClick={() => setLang("it")}
            className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all ${lang === "it" ? "bg-cyan-700 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            IT
          </button>
          <button
            id="lang_btn_en"
            type="button"
            aria-pressed={lang === "en"}
            onClick={() => setLang("en")}
            disabled={isLoadingLang}
            title={isLoadingLang ? t("lang.loadingEn") : undefined}
            className={`px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 disabled:opacity-60 ${lang === "en" ? "bg-cyan-700 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"}`}
          >
            {isLoadingLang && <RefreshCw className="w-3 h-3 animate-spin" />}
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
