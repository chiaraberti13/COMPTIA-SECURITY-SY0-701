import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, 
  X, 
  BookOpen, 
  Bookmark, 
  BookmarkCheck, 
  GraduationCap, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  MessageSquare, 
  Tag, 
  Layers
} from "lucide-react";
import { getDomainTopics } from "../localizedData";
import { TopicGroup, Subtopic } from "../types";
import { useLang, translate, type Lang, type UIKey } from "../i18n";
import { STORAGE_KEYS, readJSON, writeJSON } from "../storage";
import { sanitizeBookmarks } from "../progressBackup";

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  details: string;
  examTip?: string;
  domainId: 1 | 2 | 3 | 4 | 5;
  domainName: string;
  domainShort: string;
  groupTitle: string;
  category: "Acronimi & Protocolli" | "Concetti Cardine" | "Controlli & Architetture" | "Attacchi & Minacce" | "Metriche & Formule" | "Governance & Normative";
  isAcronym: boolean;
  firstLetter: string;
  keyFormulas?: string[];
}

/**
 * Per-domain accent colours for badges and filter pills.
 * Domain names are not stored here: they come from the i18n dictionary
 * (`glossDom.<id>.title` / `.short`) so they follow the active language.
 */
const DOMAIN_INFO: Record<number, { color: string; bg: string; border: string }> = {
  1: { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30" },
  2: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  3: { color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/30" },
  4: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  5: { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30" },
};

const CATEGORY_COLORS: Record<string, { badge: string; text: string }> = {
  "Acronimi & Protocolli": { badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", text: "text-purple-400" },
  "Concetti Cardine": { badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30", text: "text-cyan-400" },
  "Controlli & Architetture": { badge: "bg-blue-500/10 text-blue-400 border-blue-500/30", text: "text-blue-400" },
  "Attacchi & Minacce": { badge: "bg-amber-500/10 text-amber-400 border-amber-500/30", text: "text-amber-400" },
  "Metriche & Formule": { badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", text: "text-emerald-400" },
  "Governance & Normative": { badge: "bg-rose-500/10 text-rose-400 border-rose-500/30", text: "text-rose-400" }
};

// Helper function to categorize subtopics automatically
function determineCategory(sub: Subtopic, groupTitle: string): GlossaryTerm["category"] {
  // Acronimi e Protocolli
  if (
    /^(AAA|CIA|MFA|SSO|SAML|OIDC|LDAP|RADIUS|TACACS\+|DNSSEC|DKIM|SPF|DMARC|IPSEC|TLS|SSH|HTTPS|SNMP|BGP|OSPF|EAP|GCMP|SAE|TKIP|MIC|WPA\d?|RBAC|ABAC|MAC|DAC|RuBAC|PKI|CRL|OCSP|CSR|CA|HSM|TPM|CVE|CVSS|SIEM|SOAR|XDR|EDR|NDR|EPP|NIDS|NIPS|HIDS|HIPS|NGFW|WAF|UTM|SWG|CASB|SASE|ZTNA|DLP|SAST|DAST|IAST|RAID|UPS|SLA|MOU|MOA|ISA|NDA|DPA|GDPR|HIPAA|PCI|NIST|CIS|ISO|BIA|BCP|DRP|RTO|RPO|ALE|SLE|ARO|AV|EF|MTTR|MTTD|MTBF|MTTF)$/.test(sub.name) ||
    /protocollo|protocol|acronimo|standard/i.test(groupTitle) ||
    /protocollo|algoritmo/i.test(sub.definition)
  ) {
    return "Acronimi & Protocolli";
  }

  // Metriche e Formule
  if (
    /ALE|SLE|ARO|MTTR|MTTD|MTBF|MTTF|RTO|RPO|BIA|CVSS|EF|AV|CALCOLO|FORMULA|METRICA/i.test(sub.name) ||
    /metriche|calcoli|quantitativ/i.test(groupTitle) ||
    sub.keyFormulas && sub.keyFormulas.length > 0
  ) {
    return "Metriche & Formule";
  }

  // Attacchi e Minacce
  if (
    /attacc|minacc|malware|phishing|ransomware|vulnerability|vulnerabil|exploit|vector|surface|injection|overflow|spoofing|social engineering|threat/i.test(sub.name) ||
    /minacc|vulnerabil|attacchi|malware/i.test(groupTitle)
  ) {
    return "Attacchi & Minacce";
  }

  // Governance e Normative
  if (
    /governance|policy|politica|normativ|compliance|gdpr|hipaa|pci|iso|nist|cis|audit|framework|risk management|dpo|owner|custodian|controller|processor|sla|mou|nda/i.test(sub.name) ||
    /governance|conformità|policy|rischio/i.test(groupTitle)
  ) {
    return "Governance & Normative";
  }

  // Controlli e Architetture
  if (
    /firewall|proxy|waf|ngfw|vpn|segmentat|vlan|sdn|zero trust|cloud|hsm|tpm|bastion|air gap|honeypot|siem|soar|edr|xdr|dlp|backup|raid|ups|cctv|badge/i.test(sub.name) ||
    /architettur|controll|rete|dispositiv|soluzioni/i.test(groupTitle)
  ) {
    return "Controlli & Architetture";
  }

  return "Concetti Cardine";
}

// Check if term is an acronym (mostly uppercase short word or contains uppercase brackets)
function checkIfAcronym(term: string): boolean {
  const clean = term.trim();
  if (clean.length <= 6 && clean === clean.toUpperCase() && /[A-Z]/.test(clean)) return true;
  if (/^[A-Z0-9\-+/]{2,8}$/.test(clean)) return true;
  if (/\([A-Z0-9\-+]{2,8}\)/.test(clean)) return true;
  return false;
}

// Maps the canonical (Italian) category identifier to its UI translation key.
const CATEGORY_LABEL_KEY: Record<string, UIKey> = {
  "Acronimi & Protocolli": "cat.acronyms",
  "Concetti Cardine": "cat.core",
  "Controlli & Architetture": "cat.controls",
  "Attacchi & Minacce": "cat.attacks",
  "Metriche & Formule": "cat.metrics",
  "Governance & Normative": "cat.governance",
};

/**
 * Build the unified glossary dataset for the given language.
 *
 * Display strings come from the localized dataset, but the category is derived
 * from the ITALIAN source: `determineCategory()` matches Italian keywords
 * ("attacc", "minacc", "normativ", ...), so running it on translated names
 * dropped nearly every English term into the "Concetti Cardine" fallback and
 * made the category filter useless in English.
 */
function buildGlossaryDataset(lang: Lang): GlossaryTerm[] {
  const domains: { id: 1 | 2 | 3 | 4 | 5; groups: TopicGroup[]; source: TopicGroup[] }[] = [
    { id: 1, groups: getDomainTopics(1, lang), source: getDomainTopics(1, "it") },
    { id: 2, groups: getDomainTopics(2, lang), source: getDomainTopics(2, "it") },
    { id: 3, groups: getDomainTopics(3, lang), source: getDomainTopics(3, "it") },
    { id: 4, groups: getDomainTopics(4, lang), source: getDomainTopics(4, "it") },
    { id: 5, groups: getDomainTopics(5, lang), source: getDomainTopics(5, "it") },
  ];

  const termsMap = new Map<string, GlossaryTerm>();

  domains.forEach(({ id, groups, source }) => {
    // checklistKey -> Italian subtopic and its Italian group title.
    const sourceByKey = new Map<string, { sub: Subtopic; groupTitle: string }>();
    source.forEach((g) => {
      g.subtopics.forEach((sub) => sourceByKey.set(sub.checklistKey, { sub, groupTitle: g.title }));
    });

    groups.forEach((group) => {
      group.subtopics.forEach((sub) => {
        const key = `${id}_${sub.name.toLowerCase().trim()}`;
        if (!termsMap.has(key)) {
          const isAcr = checkIfAcronym(sub.name);
          const src = sourceByKey.get(sub.checklistKey);
          const cat = determineCategory(src?.sub ?? sub, src?.groupTitle ?? group.title);
          const letterMatch = sub.name.trim().match(/^[A-Za-z]/);
          const firstLetter = letterMatch ? letterMatch[0].toUpperCase() : "#";

          termsMap.set(key, {
            id: sub.checklistKey || key,
            term: sub.name,
            definition: sub.definition,
            details: sub.details,
            examTip: sub.examTip,
            domainId: id,
            domainName: translate(lang, `glossDom.${id}.title` as UIKey),
            domainShort: translate(lang, `glossDom.${id}.short` as UIKey),
            groupTitle: group.title,
            category: cat,
            isAcronym: isAcr,
            firstLetter,
            keyFormulas: sub.keyFormulas
          });
        }
      });
    });
  });

  return Array.from(termsMap.values()).sort((a, b) => a.term.localeCompare(b.term, lang, { sensitivity: "base" }));
}

interface GlossarySectionProps {
  onAskAI?: (prompt: string) => void;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({ onAskAI }) => {
  const { lang, t } = useLang();
  const allTerms = useMemo(() => buildGlossaryDataset(lang), [lang]);

  // Localized label for a (canonical, Italian) category identifier.
  const catLabel = (cat: string): string => {
    const key = CATEGORY_LABEL_KEY[cat];
    return key ? t(key) : cat;
  };

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<number | "ALL">("ALL");
  const [selectedCategory, setSelectedCategory] = useState<string | "ALL">("ALL");
  const [selectedLetter, setSelectedLetter] = useState<string | "ALL">("ALL");
  const [onlyExamTips, setOnlyExamTips] = useState(false);
  const [onlyAcronyms, setOnlyAcronyms] = useState(false);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  // UI States
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    // Sanitised: a non-array value here would crash the glossary on .includes().
    () => sanitizeBookmarks(readJSON<unknown>(STORAGE_KEYS.bookmarks, []))
  );

  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);

  // Save bookmarks to localStorage
  useEffect(() => {
    writeJSON(STORAGE_KEYS.bookmarks, bookmarkedIds);
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCopyTerm = (term: GlossaryTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    const tip = term.examTip ? t("gloss.copyTip", { tip: term.examTip }) : "";
    const textToCopy = t("gloss.copyTemplate", {
      term: term.term,
      domain: term.domainShort,
      definition: term.definition,
      tip,
    });
    // The Clipboard API is unavailable on insecure origins and can reject.
    void navigator.clipboard?.writeText(textToCopy).catch(() => undefined);
    setCopiedTermId(term.id);
    setTimeout(() => setCopiedTermId(null), 2000);
  };

  const handleAskAIAboutTerm = (term: GlossaryTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAskAI) {
      onAskAI(t("gloss.askAIPrompt", { term: term.term, domain: term.domainShort }));
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDomain("ALL");
    setSelectedCategory("ALL");
    setSelectedLetter("ALL");
    setOnlyExamTips(false);
    setOnlyAcronyms(false);
    setOnlyBookmarks(false);
  };

  // Available Alphabet Letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    allTerms.forEach((t) => letters.add(t.firstLetter));
    return ["ALL", ...Array.from(letters).sort()];
  }, [allTerms]);

  // Filtered dataset
  const filteredTerms = useMemo(() => {
    return allTerms.filter((item) => {
      // Domain filter
      if (selectedDomain !== "ALL" && item.domainId !== selectedDomain) return false;

      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) return false;

      // Letter filter
      if (selectedLetter !== "ALL" && item.firstLetter !== selectedLetter) return false;

      // Toggle filters
      if (onlyExamTips && !item.examTip) return false;
      if (onlyAcronyms && !item.isAcronym) return false;
      if (onlyBookmarks && !bookmarkedIds.includes(item.id)) return false;

      // Search term
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase().trim();
        const matchName = item.term.toLowerCase().includes(query);
        const matchDef = item.definition.toLowerCase().includes(query);
        const matchDet = item.details.toLowerCase().includes(query);
        const matchGroup = item.groupTitle.toLowerCase().includes(query);
        const matchTip = item.examTip ? item.examTip.toLowerCase().includes(query) : false;

        return matchName || matchDef || matchDet || matchGroup || matchTip;
      }

      return true;
    });
  }, [allTerms, selectedDomain, selectedCategory, selectedLetter, onlyExamTips, onlyAcronyms, onlyBookmarks, bookmarkedIds, searchTerm]);

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-y-auto custom-scrollbar p-4 md:p-6" id="glossary_root">
      <div className="max-w-7xl w-full mx-auto space-y-6">
        
        {/* TOP HERO HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden" id="glossary_hero">
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  {t("gloss.badge")}
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {t("gloss.termsCount", { n: allTerms.length })}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
                {t("gloss.heroTitle")}
              </h2>
              <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-3xl">
                {t("gloss.heroSubtitle")}
              </p>
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 p-3 rounded-lg shrink-0">
              <div className="p-2.5 bg-cyan-700/20 text-cyan-400 rounded-md border border-cyan-500/30">
                <BookmarkCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-400">{t("gloss.savedTerms")}</div>
                <div className="text-base font-bold text-white">{bookmarkedIds.length} <span className="text-xs font-normal text-slate-400">{t("gloss.inBookmarks")}</span></div>
              </div>
            </div>
          </div>

          {/* MAIN SEARCH BAR */}
          <div className="mt-6 relative" id="glossary_search_container">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t("gloss.searchPlaceholder")}
                className="w-full bg-slate-950/80 border border-slate-700/80 focus:border-cyan-500 text-slate-100 placeholder-slate-500 text-sm pl-11 pr-10 py-3.5 rounded-lg shadow-inner focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                id="glossary_search_input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
                  title={t("gloss.clearSearch")}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 px-1">
              <span>{t("gloss.showingOf", { shown: filteredTerms.length, total: allTerms.length })}</span>
              {(searchTerm || selectedDomain !== "ALL" || selectedCategory !== "ALL" || selectedLetter !== "ALL" || onlyExamTips || onlyAcronyms || onlyBookmarks) && (
                <button
                  onClick={resetFilters}
                  className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t("gloss.resetFilters")}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FILTER CONTROLS PANEL */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 md:p-5 space-y-4" id="glossary_filters_panel">
          
          {/* DOMAIN FILTER PILLS */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              {t("gloss.filterByDomain")}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDomain("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedDomain === "ALL" 
                    ? "bg-cyan-700 text-white font-bold shadow-md shadow-cyan-500/20" 
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                }`}
              >
                {t("gloss.allDomains", { n: allTerms.length })}
              </button>

              {[1, 2, 3, 4, 5].map((domNum) => {
                const info = DOMAIN_INFO[domNum];
                const count = allTerms.filter(t => t.domainId === domNum).length;
                const isSelected = selectedDomain === domNum;

                return (
                  <button
                    key={domNum}
                    onClick={() => setSelectedDomain(isSelected ? "ALL" : (domNum as 1|2|3|4|5))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? `${info.bg} ${info.color} ${info.border} font-bold ring-1 ring-cyan-500`
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border-slate-700/50"
                    }`}
                  >
                    <span>{t("sidebar.domShort", { n: domNum })}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              {t("gloss.filterByCategory")}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === "ALL" 
                    ? "bg-purple-600 text-white font-bold shadow-md shadow-purple-500/20" 
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border border-slate-700/50"
                }`}
              >
                {t("gloss.allCategories")}
              </button>

              {Object.keys(CATEGORY_COLORS).map((catName) => {
                const colorInfo = CATEGORY_COLORS[catName];
                const isSelected = selectedCategory === catName;
                const count = allTerms.filter(t => t.category === catName).length;

                return (
                  <button
                    key={catName}
                    onClick={() => setSelectedCategory(isSelected ? "ALL" : catName)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                      isSelected
                        ? `${colorInfo.badge} font-bold ring-1 ring-purple-500`
                        : "bg-slate-800/80 text-slate-300 hover:bg-slate-800 border-slate-700/50"
                    }`}
                  >
                    <span>{catLabel(catName)}</span>
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ALPHABETICAL JUMP BAR & TOGGLE BADGES */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Alphabet Bar */}
            <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1 max-w-full">
              <span className="text-xs font-semibold text-slate-400 mr-1 shrink-0">{t("gloss.azIndex")}</span>
              {availableLetters.map((letter) => {
                const isSelected = selectedLetter === letter;
                return (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(isSelected ? "ALL" : letter)}
                    className={`w-7 h-7 rounded text-xs font-bold shrink-0 transition-all ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30"
                        : "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                    }`}
                  >
                    {letter === "ALL" ? "*" : letter}
                  </button>
                );
              })}
            </div>

            {/* Quick Toggle Switches */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setOnlyExamTips(!onlyExamTips)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  onlyExamTips
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm"
                    : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t("gloss.examTipsToggle")}</span>
              </button>

              <button
                onClick={() => setOnlyAcronyms(!onlyAcronyms)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  onlyAcronyms
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-sm"
                    : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                <span>{t("gloss.onlyAcronyms")}</span>
              </button>

              <button
                onClick={() => setOnlyBookmarks(!onlyBookmarks)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  onlyBookmarks
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm"
                    : "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-800 hover:text-slate-200"
                }`}
              >
                <BookmarkCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t("gloss.savedToggle", { n: bookmarkedIds.length })}</span>
              </button>
            </div>

          </div>

        </div>

        {/* GLOSSARY CARDS GRID */}
        {filteredTerms.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center my-8">
            <div className="w-12 h-12 bg-slate-800/80 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-200">{t("gloss.noTermsTitle")}</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {t("gloss.noTermsDesc", { query: searchTerm })}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-lg bg-cyan-700 hover:bg-cyan-600 text-white font-semibold text-xs transition-all shadow-md shadow-cyan-600/20"
            >
              {t("gloss.resetAll")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="glossary_grid">
            {filteredTerms.map((item) => {
              const domStyle = DOMAIN_INFO[item.domainId];
              const catStyle = CATEGORY_COLORS[item.category] || CATEGORY_COLORS["Concetti Cardine"];
              const isBookmarked = bookmarkedIds.includes(item.id);
              const isExpanded = expandedTermId === item.id;
              const isCopied = copiedTermId === item.id;

              return (
                <div
                  key={`${item.domainId}_${item.id}`}
                  className={`bg-slate-900/70 border hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 group relative ${
                    isBookmarked ? "border-cyan-500/40 shadow-lg shadow-cyan-500/5" : "border-slate-800/80"
                  }`}
                  id={`glossary_card_${item.id}`}
                >
                  <div>
                    {/* CARD HEADER: BADGES & BOOKMARK */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {/* Domain Badge */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${domStyle.bg} ${domStyle.color} ${domStyle.border}`}>
                          {t("sidebar.domShort", { n: item.domainId })}
                        </span>

                        {/* Category Badge */}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${catStyle.badge}`}>
                          {catLabel(item.category)}
                        </span>

                        {/* Acronym Pill */}
                        {item.isAcronym && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-950 text-purple-300 border border-purple-800/80">
                            {t("gloss.acronym")}
                          </span>
                        )}
                      </div>

                      {/* Bookmark Button */}
                      <button
                        onClick={(e) => toggleBookmark(item.id, e)}
                        className={`p-1.5 rounded-md transition-colors ${
                          isBookmarked 
                            ? "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30" 
                            : "text-slate-400 hover:text-slate-300 hover:bg-slate-800"
                        }`}
                        title={isBookmarked ? t("gloss.removeBookmark") : t("gloss.addBookmark")}
                        aria-label={isBookmarked ? t("gloss.removeBookmark") : t("gloss.addBookmark")}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-cyan-400" : ""}`} />
                      </button>
                    </div>

                    {/* TERM TITLE */}
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                      <span>{item.term}</span>
                    </h3>

                    <div className="text-[11px] text-slate-400 font-medium mt-0.5 mb-2">
                      {t("gloss.group", { title: item.groupTitle })}
                    </div>

                    {/* SHORT DEFINITION */}
                    <div className="text-xs text-slate-300 leading-relaxed font-normal bg-slate-950/60 p-3 rounded-lg border border-slate-800/60 my-2">
                      {item.definition}
                    </div>

                    {/* EXPANDABLE DETAILS */}
                    {isExpanded && (
                      <div className="mt-3 text-xs text-slate-300 space-y-2 border-t border-slate-800 pt-3 animate-fade-in">
                        <div className="font-semibold text-slate-200 text-[11px] uppercase tracking-wider text-cyan-400">
                          {t("gloss.detailsHeading")}
                        </div>
                        <div className="text-slate-300 whitespace-pre-line leading-relaxed text-[11px] bg-slate-950/40 p-2.5 rounded border border-slate-800/40">
                          {item.details}
                        </div>

                        {item.keyFormulas && item.keyFormulas.length > 0 && (
                          <div className="bg-emerald-950/30 border border-emerald-500/30 p-2.5 rounded text-[11px] text-emerald-300 space-y-1">
                            <span className="font-bold text-emerald-400">{t("gloss.keyFormulasShort")}</span>
                            {item.keyFormulas.map((f, idx) => (
                              <div key={idx} className="font-mono text-[10px] bg-slate-950/80 p-1 rounded border border-emerald-500/20">
                                {f}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* EXAM TIP BOX */}
                    {item.examTip && (
                      <div className="mt-3 bg-amber-950/20 border border-amber-500/20 rounded-lg p-2.5 text-[11px] text-amber-300/90 flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-amber-400 font-semibold block text-[10px] uppercase tracking-wider">{t("gloss.examTipShort")}</strong>
                          <span>{item.examTip}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CARD FOOTER ACTIONS */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <button
                      onClick={() => setExpandedTermId(isExpanded ? null : item.id)}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      {isExpanded ? (
                        <>
                          <span>{t("gloss.reduce")}</span>
                          <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>{t("gloss.showDetails")}</span>
                          <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleCopyTerm(item, e)}
                        className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px]"
                        title={t("gloss.copyDefinition")}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? t("gloss.copied") : t("gloss.copy")}</span>
                      </button>

                      {onAskAI && (
                        <button
                          onClick={(e) => handleAskAIAboutTerm(item, e)}
                          className="p-1.5 rounded text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors flex items-center gap-1 text-[11px] font-medium"
                          title={t("gloss.askAITitle")}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{t("gloss.askAI")}</span>
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
