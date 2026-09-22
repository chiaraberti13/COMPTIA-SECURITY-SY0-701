import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loadEnglishOverlay, isEnglishOverlayReady } from "./localizedData";
import { STORAGE_KEYS } from "./storage";

export type Lang = "it" | "en";

const STORAGE_KEY = STORAGE_KEYS.lang;

/* ------------------------------------------------------------------ *
 * Language context
 * ------------------------------------------------------------------ */

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** True while the English dataset chunk is being downloaded. */
  isLoadingLang: boolean;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "it" || saved === "en") return saved;
    const nav = (typeof navigator !== "undefined" && navigator.language) || "";
    return nav.toLowerCase().startsWith("it") ? "it" : "en";
  } catch {
    return "it";
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [initialLang] = useState<Lang>(() => detectInitialLang());
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [isLoadingLang, setIsLoadingLang] = useState(false);
  // The English dataset lives in a lazily-loaded chunk. Italian users never
  // download it; English users wait for it once, before the first render.
  const [datasetReady, setDatasetReady] = useState(initialLang === "it");

  useEffect(() => {
    if (initialLang !== "en") return;
    let cancelled = false;
    loadEnglishOverlay()
      .catch(() => {
        // Network failure on the overlay chunk: fall back to Italian rather
        // than leaving the user on a splash screen forever.
        if (!cancelled) setLangState("it");
      })
      .finally(() => {
        if (!cancelled) setDatasetReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [initialLang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    try {
      document.documentElement.lang = lang;
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    if (l === "it" || isEnglishOverlayReady()) {
      setLangState(l);
      return;
    }
    // Switching to English for the first time: fetch the overlay chunk before
    // flipping the language, so the UI never renders half-translated content.
    setIsLoadingLang(true);
    loadEnglishOverlay()
      .then(() => setLangState("en"))
      .catch(() => {
        /* stay on the current language */
      })
      .finally(() => setIsLoadingLang(false));
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === "it" ? "en" : "it"),
    [lang, setLang]
  );

  const t = useCallback(
    (key: UIKey, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang]
  );

  if (!datasetReady) {
    return (
      <div
        className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-slate-950 text-slate-400"
        role="status"
        aria-live="polite"
      >
        <div className="w-10 h-10 rounded border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
        <p className="text-xs font-mono uppercase tracking-widest">
          {translate(initialLang, "lang.loadingDataset")}
        </p>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, isLoadingLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return ctx;
}

/* ------------------------------------------------------------------ *
 * String interpolation helper: replaces {name} tokens
 * ------------------------------------------------------------------ */

function fmt(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    vars[k] !== undefined ? String(vars[k]) : `{${k}}`
  );
}

export function translate(lang: Lang, key: UIKey, vars?: Record<string, string | number>): string {
  const dict = UI[lang] || UI.it;
  const template = dict[key] ?? UI.it[key] ?? key;
  return fmt(template, vars);
}

/* ------------------------------------------------------------------ *
 * UI dictionary
 * ------------------------------------------------------------------ */

const it = {
  // Header
  "header.subtitle": "Senior Cybersecurity Trainer Interface v4.2",
  "tab.studio": "Checklist & Studio",
  "tab.glossary": "Glossario SY0-701",
  "tab.quiz": "High-Stakes Simulator",
  "tab.aiTrainer": "AI Trainer",
  "lang.switchTo": "English",
  "lang.label": "Lingua",
  "lang.loadingDataset": "Caricamento contenuti...",
  "lang.loadingEn": "Caricamento inglese...",

  // Sidebar checklist
  "sidebar.browseChecklist": "Sfoglia Checklist",
  "sidebar.selectAndCheck": "Seleziona e spunta gli argomenti completati.",
  "sidebar.domShort": "Dom {n}",
  "sidebar.domainProgress": "PROGRESSO DOMINIO {n}",
  "sidebar.passingScore": "Passing Score: 80% (Analysis focus)",
  "common.completedOf": "{done} di {total} completati",

  // Study panel
  "study.domain": "DOMINIO",
  "study.unifiedCard": 'Questa scheda unificata contiene {n} concetti fondamentali appartenenti alla categoria "{name}".',
  "study.categoryProgress": "Progresso in questa categoria",
  "study.completedPercent": "{done} di {total} completati ({percent}%)",
  "study.conceptOf": "CONCETTO {i} DI {n}",
  "study.detailedAnalysis": "Analisi Dettagliata",
  "study.keyFormulas": "Metriche e Formule Chiave CompTIA",
  "study.comparativeTable": "Tabella Comparativa",
  "study.examTipTitle": "CONSIGLIO COMPTIA EXAM +",
  "study.completed": "Completato",
  "study.doubtsAbout": "Hai dubbi su {name}? Chiedi subito al Trainer!",
  "study.askExplanation": "Chiedi Spiegazione",
  "study.askPrompt": 'Spiegami approfonditamente l\'argomento "{name}" con un esempio pratico aziendale e consigli d\'esame.',
  "study.scrollTop": "Torna all'inizio",
  "study.scrollBottom": "Vai in fondo",
  "study.domainGuide": "Guida ragionata al dominio",
  "study.officialWeight": "Peso esame: {weight}%",
  "study.guidePurpose": "Perché conta",
  "study.objectiveMap": "Obiettivi e risultati attesi",
  "study.studyPath": "Percorso di studio consigliato",
  "study.decisionPatterns": "Pattern decisionali d'esame",
  "study.connections": "Collegamenti tra domini",
  "study.readiness": "Verifica di padronanza",

  // Quiz start
  "quiz.title": "High-Stakes Exam Simulator",
  "quiz.subtitle": "Configura il tuo simulatore d'esame. Seleziona quanti quesiti affrontare per ciascun dominio di competenza o scegli un preset rapido.",
  "quiz.newBadge": "Nuovo Caricamento 100% Completo",
  "quiz.newTitle": "10 Nuove Domande nel Dominio 1 (Domande 141-150)",
  "quiz.newDesc": "Abbiamo caricato le 10 domande d'esame (ID 141-150). Sono ora integrate nel Dominio 1!",
  "quiz.startTest10": "Avvia Test (10 domande)",
  "quiz.readTexts": "Leggi i Testi",
  "quiz.selectPreset": "Seleziona Configurazione Rapida (Presets)",
  "quiz.presetMini": "Mini (10 Totali)",
  "quiz.presetBalanced": "Bilanciato (25 Totali)",
  "quiz.presetAll": "Completo (Tutte)",
  "quiz.presetCustom": "Personalizzato",
  "quiz.onlyDomain": "SOLO DOMINIO:",
  "quiz.customizePerDomain": "Personalizza Numero Domande per ciascun Dominio",
  "quiz.configSummary": "RIEPILOGO CONFIGURAZIONE",
  "quiz.highStakesSelected": "domande ad alto rischio selezionate",
  "quiz.thresholdTime": "Soglia di sbarramento: 80% • Tempo stimato: ~{min} min",
  "quiz.startSimulator": "Avvia Simulatore di Esame",
  "quiz.rulesTitle": "REGOLE DI IDONEITÀ",
  "quiz.rule1": "● Domande ad alto rischio d'esame (Ricordo, Comprensione, Applicazione, Analisi).",
  "quiz.rule2": "● Soglia di Sbarramento: 80% per superare il modulo.",
  "quiz.rule3": "● Se fallisci, si attiverà un quiz di recupero con domande adattive basate sulle tue debolezze.",
  "quiz.selectAtLeastOne": "Seleziona almeno una domanda per avviare il simulatore!",
  "quiz.smartReviewTitle": "Ripasso intelligente",
  "quiz.smartReviewReady": "{n} domande sono pronte: prima gli errori e poi i concetti in scadenza.",
  "quiz.smartReviewEmpty": "Completa un test: gli errori compariranno subito, le risposte corrette torneranno a intervalli crescenti.",
  "quiz.smartReviewStart": "Avvia ripasso",
  "quiz.weakTopicsTitle": "Argomenti da consolidare",
  "quiz.weakTopicsDesc": "Calcolati dai tuoi risultati reali: gli argomenti con accuratezza più bassa hanno la priorità.",
  "quiz.weakTopicsAccuracy": "{percent}% · {n} tentativi",
  "quiz.weakTopicsDue": "{n} domande pronte per il ripasso",

  // Quiz completed
  "quiz.completedTitle": "Simulazione Completata",
  "quiz.resultFor": "Esito del test",
  "quiz.passed": "IDONEITÀ CONSEGUITA",
  "quiz.failed": "REMEDIATION NECESSARIA (FALLITO)",
  "quiz.weaknessAnalysis": "ANALISI DELLE DEBOLEZZE",
  "quiz.weaknessDesc": "Il sistema ha tracciato gli errori commessi e isolato i concetti da consolidare, anche se hai superato la soglia dell’80%:",
  "quiz.remediationOffer": "Ripeti subito gli errori oppure chiedi al Trainer AI 3 nuovi scenari di livello ANALISI sugli stessi argomenti.",
  "quiz.generating": "Generazione...",
  "quiz.startAdaptive": "Avvia Recupero Adattivo",
  "quiz.retryMistakes": "Ripeti gli errori",
  "quiz.excellentTitle": "ECCELLENTE PREPARAZIONE!",
  "quiz.excellentDesc": "Hai superato brillantemente lo sbarramento. Dimostri una conoscenza di livello professionale sulla governance, le politiche di rischio e la conformità di terze parti. Continua così!",
  "quiz.repeatMain": "Ripeti Test Principale",
  "quiz.backToStudio": "Ritorna allo Studio",

  // Remediation
  "rem.completedTitle": "Sessione di Recupero Completata",
  "rem.completedDesc": "Hai completato le 3 domande adattive generate al volo sull'analisi dei tuoi punti deboli.",
  "rem.adaptiveLevel": "RECUPERO ADATTIVO (LIVELLO ANALISI)",
  "rem.regenerate": "Rigenera Domande Nuove",
  "rem.seeMainResult": "Vedi Risultato Principale",
  "rem.headerLevel": "RECUPERO ADATTIVO · LIVELLO: {level}",
  "rem.questionOf": "DOMANDA {i} DI {n}",
  "rem.analysisScenario": "Scenario Tecnico di Analisi",
  "rem.seeOutcome": "Vedi Esito Recupero",
  "rem.nextQuestion": "Prossima Domanda di Recupero",
  "rem.unknownError": "Errore sconosciuto.",
  "rem.cannotRetrieve": "Impossibile recuperare domande adattive.",
  "rem.noValidQuestions": "Il server non ha restituito domande di recupero valide.",

  // Quiz active
  "quiz.level": "LIVELLO:",
  "quiz.questionCounter": "{i} DI {n}",
  "quiz.businessScenario": "Scenario Aziendale",
  "quiz.finishExam": "Concludi Esame",
  "quiz.nextQuestion": "Prossima Domanda",
  "quiz.confirmAnswer": "Conferma Risposta",
  "quiz.selectN": "Seleziona {n} risposte",
  "quiz.selectNRemaining": "Ancora {n} da selezionare",
  "quiz.bestChoice": "BEST CHOICE SELEZIONATA",
  "quiz.distractor": "DISTRATTORE RILEVATO",

  // Quiz: timer d'esame
  "quiz.timerLabel": "Tempo",
  "quiz.timerEnable": "Timer d'esame (~2 min/domanda)",
  "quiz.timerHint": "Allo scadere del tempo l'esame viene consegnato automaticamente.",
  "quiz.timeUpTitle": "TEMPO SCADUTO",
  "quiz.timeUpDesc": "Il tempo a disposizione è terminato: l'esame è stato consegnato automaticamente. Le domande senza risposta contano come errate.",

  // Quiz: ripasso delle risposte
  "quiz.reviewTitle": "Ripasso delle risposte",
  "quiz.reviewShow": "Rivedi le risposte",
  "quiz.reviewHide": "Chiudi il ripasso",
  "quiz.reviewFilterWrong": "Solo errate ({n})",
  "quiz.reviewFilterAll": "Tutte ({n})",
  "quiz.reviewYourAnswer": "La tua risposta",
  "quiz.reviewCorrectAnswer": "Risposta corretta",
  "quiz.reviewNoAnswer": "Nessuna risposta data",
  "quiz.reviewAllCorrect": "Nessun errore da ripassare: hai risposto correttamente a tutte le domande.",
  "quiz.reviewQuestionN": "Domanda {i}",

  // Quiz: storico dei risultati
  "quiz.historyTitle": "I tuoi risultati precedenti",
  "quiz.historyEmpty": "Nessun test completato finora. Il tuo storico comparirà qui.",
  "quiz.historyClear": "Cancella storico",
  "quiz.historyBest": "Miglior punteggio: {percent}%",
  "quiz.historyAvg": "Media ultimi {n}: {percent}%",

  // Notifiche inline (sostituiscono alert())
  "toast.dismiss": "Chiudi la notifica",

  // Accessibilità
  "a11y.selectTopic": "Apri l'argomento {name}",
  "a11y.toggleCheck": "Segna {name} come completato",
  "a11y.optionsGroup": "Opzioni di risposta",
  "a11y.optionsGroupMulti": "Opzioni di risposta, scelta multipla",
  "a11y.keyboardHint": "Suggerimento: premi 1-4 per selezionare, Invio per confermare.",
  "a11y.mainNavigation": "Navigazione principale",
  "a11y.decreaseDomainQuestions": "Riduci le domande del dominio {n}",
  "a11y.increaseDomainQuestions": "Aumenta le domande del dominio {n}",
  "a11y.domainQuestionCount": "Numero di domande del dominio {n}",
  "a11y.closeTrainer": "Chiudi il Trainer AI",
  "a11y.chatInput": "Domanda per il Trainer AI",


  // Chat sidebar
  "chat.title": "ASSISTENTE AI TRAINER",
  "chat.processing": "Il Trainer sta elaborando...",
  "chat.askTrainer": "Chiedi al Trainer:",
  "chat.placeholder": "Chiedi spiegazioni o scenari...",
  "chat.connectionError": "⚠️ Errore di connessione con il Trainer AI: {msg}.",
  "chat.welcome": "Salve! Sono il tuo Cybersecurity Trainer certificato CompTIA. Sono qui per guidarti nello studio dei **Domini 1 (General Security Concepts)**, **2 (Threats, Vulnerabilities, and Mitigations)**, **3 (Security Architecture)**, **4 (Security Operations)** e **5 (Security Program Management and Oversight)** del Security+ SY0-701.\n\nPuoi pormi qualsiasi domanda teorica, chiedermi spiegazioni su concetti di sicurezza generali, attori delle minacce, vulnerabilità, mitigazioni, architetture, protocolli sicuri o formule di rischio, o farmi generare scenari ad-hoc. Cosa desideri approfondire oggi?",
  "chat.chipThreats": "Attori delle Minacce (Dom 2)",
  "chat.chipThreatsPrompt": "Quali sono le principali categorie di Threat Actors (Nation-State, Hacktivist, Insider) e le loro motivazioni secondo il syllabus di Domain 2?",
  "chat.chipEdr": "EDR vs Antivirus (Dom 2)",
  "chat.chipEdrPrompt": "Qual è la differenza tra EDR, MDR e un Antivirus tradizionale basato su firme nel Dominio 2?",
  "chat.chipRto": "RTO vs RPO vs MTD",
  "chat.chipRtoPrompt": "Spiegami la differenza e gli impatti aziendali tra RTO, RPO e MTD con un esempio pratico.",
  "chat.chipSle": "Calcolo Rischio SLE/ALE",
  "chat.chipSlePrompt": "Come si calcolano SLE, ALE e ARO? Dammi un problema d'esame numerico da risolvere per esercitarmi.",
  "chat.chipDue": "Due Care vs Due Diligence",
  "chat.chipDuePrompt": "Qual è la differenza fondamentale tra Due Diligence e Due Care secondo CompTIA? Fammi degli esempi pratici.",
  "chat.chipAgreements": "Confronto Accordi",
  "chat.chipAgreementsPrompt": "Fornisci un riepilogo delle differenze tra SLA, MOU, BPA, MOA, SOW e BAA.",

  // New-questions modal
  "modal.title": "Banca Dati: 10 Domande (Dominio 1)",
  "modal.subtitle": "Scenari reali e spiegazioni dettagliate d'esame (CompTIA Security+ SY0-701)",
  "modal.questionN": "Domanda {i} (CompTIA ID: {id})",
  "modal.topic": "Argomento: {topic}",
  "modal.scenario": "Scenario:",
  "modal.detailedExplanation": "Spiegazione Dettagliata:",
  "modal.close": "Chiudi",
  "modal.startDirect": "Avvia Test Diretto",

  // Domain crumbs (uppercase in study header)
  "domainCrumb.1": "GENERAL SECURITY CONCEPTS",
  "domainCrumb.2": "THREATS, VULNERABILITIES & MITIGATIONS",
  "domainCrumb.3": "SECURITY ARCHITECTURE",
  "domainCrumb.4": "SECURITY OPERATIONS",
  "domainCrumb.5": "SECURITY PROGRAM MANAGEMENT",

  // Domain metadata (quiz config)
  "domainMeta.1.name": "Dominio 1: General Security Concepts",
  "domainMeta.1.desc": "Concetti generali, attori delle minacce, intelligence e controlli base",
  "domainMeta.2.name": "Dominio 2: Threats, Vulnerabilities, and Mitigations",
  "domainMeta.2.desc": "Vulnerabilità software, attacchi social engineering, minacce e mitigazioni",
  "domainMeta.3.name": "Dominio 3: Security Architecture",
  "domainMeta.3.desc": "Architettura di rete sicura, cloud, crittografia avanzata e resilienza",
  "domainMeta.4.name": "Dominio 4: Security Operations",
  "domainMeta.4.desc": "Monitoraggio, incident response, log, digital forensics e backup",
  "domainMeta.5.name": "Dominio 5: Security Program Management & Oversight",
  "domainMeta.5.desc": "Governance, conformità normativa, gestione del rischio (ALE/SLE) e contratti",

  // Level labels
  "level.RICORDO": "RICORDO",
  "level.COMPRENSIONE": "COMPRENSIONE",
  "level.APPLICAZIONE": "APPLICAZIONE",
  "level.ANALISI": "ANALISI",

  // Glossary
  "gloss.badge": "Glossario Ufficiale SY0-701",
  "gloss.termsCount": "{n} Termini & Acronimi",
  "gloss.heroTitle": "Glossario & Dizionario di Cybersecurity",
  "gloss.heroSubtitle": "Consulta definizioni dettagliate, acronimi ufficiali, protocolli e consigli d'esame per padroneggiare tutti i concetti chiave richiesti dalla certificazione CompTIA Security+.",
  "gloss.savedTerms": "Termini Salvati",
  "gloss.inBookmarks": "nei preferiti",
  "gloss.searchPlaceholder": "Cerca acronimo, termine, protocollo o formula (es. SIEM, Zero Trust, ALE, AES, MFA)...",
  "gloss.clearSearch": "Pulisci ricerca",
  "gloss.showingOf": "Mostrando {shown} di {total} termini",
  "gloss.resetFilters": "Ripristina Filtri",
  "gloss.filterByDomain": "Filtra per Dominio CompTIA",
  "gloss.allDomains": "Tutti i Domini ({n})",
  "gloss.filterByCategory": "Filtra per Categoria",
  "gloss.allCategories": "Tutte le Categorie",
  "gloss.azIndex": "Indice A-Z:",
  "gloss.examTipsToggle": "Consigli d'Esame",
  "gloss.onlyAcronyms": "Solo Acronimi",
  "gloss.savedToggle": "Salvati ({n})",
  "gloss.noTermsTitle": "Nessun termine trovato",
  "gloss.noTermsDesc": 'Nessun termine o acronimo soddisfa i filtri o la ricerca corrente ("{query}").',
  "gloss.resetAll": "Ripristina Tutti i Filtri",
  "gloss.acronym": "ACRONIMO",
  "gloss.removeBookmark": "Rimuovi dai preferiti",
  "gloss.addBookmark": "Salva nei preferiti",
  "gloss.group": "Gruppo: {title}",
  "gloss.detailsHeading": "Dettagli & Funzionamento:",
  "gloss.keyFormulasShort": "Formule Chiave:",
  "gloss.examTipShort": "Exam Tip SY0-701:",
  "gloss.reduce": "Riduci",
  "gloss.showDetails": "Mostra Dettagli",
  "gloss.copy": "Copia",
  "gloss.copied": "Copiato!",
  "gloss.copyDefinition": "Copia definizione",
  "gloss.askAI": "Chiedi AI",
  "gloss.askAITitle": "Chiedi spiegazioni all'AI Trainer",
  "gloss.copyTemplate": "{term} ({domain})\nDefinizione: {definition}\n{tip}",
  "gloss.copyTip": "Suggerimento d'Esame: {tip}",
  "gloss.askAIPrompt": 'Spiegami in dettaglio per l\'esame CompTIA Security+ SY0-701 il termine: "{term}". Contestualizzalo nel {domain} ed evidenzia gli aspetti chiave per risolvere le domande d\'esame.',

  // Glossary domain info
  "glossDom.1.title": "Dominio 1: General Security Concepts (12%)",
  "glossDom.1.short": "Dominio 1: Concetti Generali",
  "glossDom.2.title": "Dominio 2: Threats, Vulnerabilities & Mitigations (22%)",
  "glossDom.2.short": "Dominio 2: Minacce e Vulnerabilità",
  "glossDom.3.title": "Dominio 3: Security Architecture (18%)",
  "glossDom.3.short": "Dominio 3: Architettura di Sicurezza",
  "glossDom.4.title": "Dominio 4: Security Operations (28%)",
  "glossDom.4.short": "Dominio 4: Operazioni di Sicurezza",
  "glossDom.5.title": "Dominio 5: Security Program Management & Oversight (20%)",
  "glossDom.5.short": "Dominio 5: Governance e Conformità",

  // Study-notes disclaimer (footer)
  "disclaimer.notOfficial": "Note di studio personali e originali, non materiale ufficiale CompTIA.",
  "disclaimer.verify": "Verifica obiettivi d'esame, costi e policy sulle fonti ufficiali CompTIA.",

  // Glossary categories
  "cat.acronyms": "Acronimi & Protocolli",
  "cat.core": "Concetti Cardine",
  "cat.controls": "Controlli & Architetture",
  "cat.attacks": "Attacchi & Minacce",
  "cat.metrics": "Metriche & Formule",
  "cat.governance": "Governance & Normative",
};

export type UIKey = keyof typeof it;

const en: Record<UIKey, string> = {
  // Header
  "header.subtitle": "Senior Cybersecurity Trainer Interface v4.2",
  "tab.studio": "Checklist & Study",
  "tab.glossary": "SY0-701 Glossary",
  "tab.quiz": "High-Stakes Simulator",
  "tab.aiTrainer": "AI Trainer",
  "lang.switchTo": "Italiano",
  "lang.label": "Language",
  "lang.loadingDataset": "Loading content...",
  "lang.loadingEn": "Loading English...",

  // Sidebar checklist
  "sidebar.browseChecklist": "Browse Checklist",
  "sidebar.selectAndCheck": "Select and check off the topics you have completed.",
  "sidebar.domShort": "Dom {n}",
  "sidebar.domainProgress": "DOMAIN {n} PROGRESS",
  "sidebar.passingScore": "Passing Score: 80% (Analysis focus)",
  "common.completedOf": "{done} of {total} completed",

  // Study panel
  "study.domain": "DOMAIN",
  "study.unifiedCard": 'This unified card contains {n} fundamental concepts belonging to the "{name}" category.',
  "study.categoryProgress": "Progress in this category",
  "study.completedPercent": "{done} of {total} completed ({percent}%)",
  "study.conceptOf": "CONCEPT {i} OF {n}",
  "study.detailedAnalysis": "Detailed Analysis",
  "study.keyFormulas": "Key CompTIA Metrics & Formulas",
  "study.comparativeTable": "Comparison Table",
  "study.examTipTitle": "COMPTIA EXAM TIP +",
  "study.completed": "Completed",
  "study.doubtsAbout": "Questions about {name}? Ask the Trainer now!",
  "study.askExplanation": "Ask for Explanation",
  "study.askPrompt": 'Explain the topic "{name}" in depth with a practical business example and exam tips.',
  "study.scrollTop": "Back to top",
  "study.scrollBottom": "Go to bottom",
  "study.domainGuide": "Reasoned domain guide",
  "study.officialWeight": "Exam weight: {weight}%",
  "study.guidePurpose": "Why it matters",
  "study.objectiveMap": "Objectives and expected outcomes",
  "study.studyPath": "Recommended study path",
  "study.decisionPatterns": "Exam decision patterns",
  "study.connections": "Cross-domain connections",
  "study.readiness": "Mastery check",

  // Quiz start
  "quiz.title": "High-Stakes Exam Simulator",
  "quiz.subtitle": "Configure your exam simulator. Select how many questions to tackle for each competency domain or choose a quick preset.",
  "quiz.newBadge": "New 100% Complete Load",
  "quiz.newTitle": "10 New Questions in Domain 1 (Questions 141-150)",
  "quiz.newDesc": "We loaded the 10 exam questions (IDs 141-150). They are now integrated into Domain 1!",
  "quiz.startTest10": "Start Test (10 questions)",
  "quiz.readTexts": "Read the Texts",
  "quiz.selectPreset": "Select Quick Configuration (Presets)",
  "quiz.presetMini": "Mini (10 Total)",
  "quiz.presetBalanced": "Balanced (25 Total)",
  "quiz.presetAll": "Complete (All)",
  "quiz.presetCustom": "Custom",
  "quiz.onlyDomain": "DOMAIN ONLY:",
  "quiz.customizePerDomain": "Customize the Number of Questions for Each Domain",
  "quiz.configSummary": "CONFIGURATION SUMMARY",
  "quiz.highStakesSelected": "high-stakes questions selected",
  "quiz.thresholdTime": "Passing threshold: 80% • Estimated time: ~{min} min",
  "quiz.startSimulator": "Start Exam Simulator",
  "quiz.rulesTitle": "ELIGIBILITY RULES",
  "quiz.rule1": "● High-stakes exam questions (Recall, Understanding, Application, Analysis).",
  "quiz.rule2": "● Passing Threshold: 80% to pass the module.",
  "quiz.rule3": "● If you fail, a remediation quiz with adaptive questions based on your weaknesses will start.",
  "quiz.selectAtLeastOne": "Select at least one question to start the simulator!",
  "quiz.smartReviewTitle": "Smart review",
  "quiz.smartReviewReady": "{n} questions are ready: mistakes first, then concepts due for review.",
  "quiz.smartReviewEmpty": "Complete a test: mistakes appear immediately and correct answers return at increasing intervals.",
  "quiz.smartReviewStart": "Start review",
  "quiz.weakTopicsTitle": "Topics to strengthen",
  "quiz.weakTopicsDesc": "Calculated from your actual results: lower-accuracy topics receive priority.",
  "quiz.weakTopicsAccuracy": "{percent}% · {n} attempts",
  "quiz.weakTopicsDue": "{n} questions ready for review",

  // Quiz completed
  "quiz.completedTitle": "Simulation Completed",
  "quiz.resultFor": "Test result",
  "quiz.passed": "ELIGIBILITY ACHIEVED",
  "quiz.failed": "REMEDIATION REQUIRED (FAILED)",
  "quiz.weaknessAnalysis": "WEAKNESS ANALYSIS",
  "quiz.weaknessDesc": "The system tracked your mistakes and isolated the concepts to strengthen, even if you cleared the 80% threshold:",
  "quiz.remediationOffer": "Retry the mistakes now or ask the AI Trainer for 3 new ANALYSIS-level scenarios on the same topics.",
  "quiz.generating": "Generating...",
  "quiz.startAdaptive": "Start Adaptive Remediation",
  "quiz.retryMistakes": "Retry mistakes",
  "quiz.excellentTitle": "EXCELLENT PREPARATION!",
  "quiz.excellentDesc": "You cleared the threshold brilliantly. You demonstrate professional-level knowledge of governance, risk policies and third-party compliance. Keep it up!",
  "quiz.repeatMain": "Repeat Main Test",
  "quiz.backToStudio": "Return to Study",

  // Remediation
  "rem.completedTitle": "Remediation Session Completed",
  "rem.completedDesc": "You completed the 3 adaptive questions generated on the fly from the analysis of your weak points.",
  "rem.adaptiveLevel": "ADAPTIVE REMEDIATION (ANALYSIS LEVEL)",
  "rem.regenerate": "Regenerate New Questions",
  "rem.seeMainResult": "See Main Result",
  "rem.headerLevel": "ADAPTIVE REMEDIATION · LEVEL: {level}",
  "rem.questionOf": "QUESTION {i} OF {n}",
  "rem.analysisScenario": "Technical Analysis Scenario",
  "rem.seeOutcome": "See Remediation Outcome",
  "rem.nextQuestion": "Next Remediation Question",
  "rem.unknownError": "Unknown error.",
  "rem.cannotRetrieve": "Unable to retrieve adaptive questions.",
  "rem.noValidQuestions": "The server did not return valid remediation questions.",

  // Quiz active
  "quiz.level": "LEVEL:",
  "quiz.questionCounter": "{i} OF {n}",
  "quiz.businessScenario": "Business Scenario",
  "quiz.finishExam": "Finish Exam",
  "quiz.nextQuestion": "Next Question",
  "quiz.confirmAnswer": "Confirm Answer",
  "quiz.selectN": "Select {n} answers",
  "quiz.selectNRemaining": "{n} still to select",
  "quiz.bestChoice": "BEST CHOICE SELECTED",
  "quiz.distractor": "DISTRACTOR DETECTED",

  // Quiz: exam timer
  "quiz.timerLabel": "Time",
  "quiz.timerEnable": "Exam timer (~2 min/question)",
  "quiz.timerHint": "When the time runs out the exam is submitted automatically.",
  "quiz.timeUpTitle": "TIME IS UP",
  "quiz.timeUpDesc": "Your time has run out and the exam was submitted automatically. Unanswered questions count as wrong.",

  // Quiz: answer review
  "quiz.reviewTitle": "Answer review",
  "quiz.reviewShow": "Review your answers",
  "quiz.reviewHide": "Close the review",
  "quiz.reviewFilterWrong": "Wrong only ({n})",
  "quiz.reviewFilterAll": "All ({n})",
  "quiz.reviewYourAnswer": "Your answer",
  "quiz.reviewCorrectAnswer": "Correct answer",
  "quiz.reviewNoAnswer": "Not answered",
  "quiz.reviewAllCorrect": "Nothing to review: you answered every question correctly.",
  "quiz.reviewQuestionN": "Question {i}",

  // Quiz: results history
  "quiz.historyTitle": "Your previous results",
  "quiz.historyEmpty": "No test completed yet. Your history will show up here.",
  "quiz.historyClear": "Clear history",
  "quiz.historyBest": "Best score: {percent}%",
  "quiz.historyAvg": "Average of last {n}: {percent}%",

  // Inline notifications (replacing alert())
  "toast.dismiss": "Dismiss notification",

  // Accessibility
  "a11y.selectTopic": "Open topic {name}",
  "a11y.toggleCheck": "Mark {name} as completed",
  "a11y.optionsGroup": "Answer options",
  "a11y.optionsGroupMulti": "Answer options, multiple choice",
  "a11y.keyboardHint": "Tip: press 1-4 to select, Enter to confirm.",
  "a11y.mainNavigation": "Main navigation",
  "a11y.decreaseDomainQuestions": "Decrease Domain {n} questions",
  "a11y.increaseDomainQuestions": "Increase Domain {n} questions",
  "a11y.domainQuestionCount": "Number of Domain {n} questions",
  "a11y.closeTrainer": "Close the AI Trainer",
  "a11y.chatInput": "Question for the AI Trainer",


  // Chat sidebar
  "chat.title": "AI TRAINER ASSISTANT",
  "chat.processing": "The Trainer is thinking...",
  "chat.askTrainer": "Ask the Trainer:",
  "chat.placeholder": "Ask for explanations or scenarios...",
  "chat.connectionError": "⚠️ Connection error with the AI Trainer: {msg}.",
  "chat.welcome": "Hello! I'm your CompTIA-certified Cybersecurity Trainer. I'm here to guide you through **Domains 1 (General Security Concepts)**, **2 (Threats, Vulnerabilities, and Mitigations)**, **3 (Security Architecture)**, **4 (Security Operations)** and **5 (Security Program Management and Oversight)** of Security+ SY0-701.\n\nYou can ask me any theoretical question, request explanations of general security concepts, threat actors, vulnerabilities, mitigations, architectures, secure protocols or risk formulas, or have me generate ad-hoc scenarios. What would you like to explore today?",
  "chat.chipThreats": "Threat Actors (Dom 2)",
  "chat.chipThreatsPrompt": "What are the main categories of Threat Actors (Nation-State, Hacktivist, Insider) and their motivations according to the Domain 2 syllabus?",
  "chat.chipEdr": "EDR vs Antivirus (Dom 2)",
  "chat.chipEdrPrompt": "What is the difference between EDR, MDR and a traditional signature-based Antivirus in Domain 2?",
  "chat.chipRto": "RTO vs RPO vs MTD",
  "chat.chipRtoPrompt": "Explain the difference and the business impacts between RTO, RPO and MTD with a practical example.",
  "chat.chipSle": "SLE/ALE Risk Calculation",
  "chat.chipSlePrompt": "How are SLE, ALE and ARO calculated? Give me a numeric exam problem to solve for practice.",
  "chat.chipDue": "Due Care vs Due Diligence",
  "chat.chipDuePrompt": "What is the fundamental difference between Due Diligence and Due Care according to CompTIA? Give me practical examples.",
  "chat.chipAgreements": "Agreements Comparison",
  "chat.chipAgreementsPrompt": "Provide a summary of the differences between SLA, MOU, BPA, MOA, SOW and BAA.",

  // New-questions modal
  "modal.title": "Question Bank: 10 Questions (Domain 1)",
  "modal.subtitle": "Real scenarios and detailed exam explanations (CompTIA Security+ SY0-701)",
  "modal.questionN": "Question {i} (CompTIA ID: {id})",
  "modal.topic": "Topic: {topic}",
  "modal.scenario": "Scenario:",
  "modal.detailedExplanation": "Detailed Explanation:",
  "modal.close": "Close",
  "modal.startDirect": "Start Test Directly",

  // Domain crumbs
  "domainCrumb.1": "GENERAL SECURITY CONCEPTS",
  "domainCrumb.2": "THREATS, VULNERABILITIES & MITIGATIONS",
  "domainCrumb.3": "SECURITY ARCHITECTURE",
  "domainCrumb.4": "SECURITY OPERATIONS",
  "domainCrumb.5": "SECURITY PROGRAM MANAGEMENT",

  // Domain metadata
  "domainMeta.1.name": "Domain 1: General Security Concepts",
  "domainMeta.1.desc": "General concepts, threat actors, intelligence and basic controls",
  "domainMeta.2.name": "Domain 2: Threats, Vulnerabilities, and Mitigations",
  "domainMeta.2.desc": "Software vulnerabilities, social engineering attacks, threats and mitigations",
  "domainMeta.3.name": "Domain 3: Security Architecture",
  "domainMeta.3.desc": "Secure network architecture, cloud, advanced cryptography and resilience",
  "domainMeta.4.name": "Domain 4: Security Operations",
  "domainMeta.4.desc": "Monitoring, incident response, logs, digital forensics and backups",
  "domainMeta.5.name": "Domain 5: Security Program Management & Oversight",
  "domainMeta.5.desc": "Governance, regulatory compliance, risk management (ALE/SLE) and contracts",

  // Level labels
  "level.RICORDO": "RECALL",
  "level.COMPRENSIONE": "UNDERSTANDING",
  "level.APPLICAZIONE": "APPLICATION",
  "level.ANALISI": "ANALYSIS",

  // Glossary
  "gloss.badge": "Official SY0-701 Glossary",
  "gloss.termsCount": "{n} Terms & Acronyms",
  "gloss.heroTitle": "Cybersecurity Glossary & Dictionary",
  "gloss.heroSubtitle": "Browse detailed definitions, official acronyms, protocols and exam tips to master all the key concepts required by the CompTIA Security+ certification.",
  "gloss.savedTerms": "Saved Terms",
  "gloss.inBookmarks": "bookmarked",
  "gloss.searchPlaceholder": "Search an acronym, term, protocol or formula (e.g. SIEM, Zero Trust, ALE, AES, MFA)...",
  "gloss.clearSearch": "Clear search",
  "gloss.showingOf": "Showing {shown} of {total} terms",
  "gloss.resetFilters": "Reset Filters",
  "gloss.filterByDomain": "Filter by CompTIA Domain",
  "gloss.allDomains": "All Domains ({n})",
  "gloss.filterByCategory": "Filter by Category",
  "gloss.allCategories": "All Categories",
  "gloss.azIndex": "A-Z Index:",
  "gloss.examTipsToggle": "Exam Tips",
  "gloss.onlyAcronyms": "Acronyms Only",
  "gloss.savedToggle": "Saved ({n})",
  "gloss.noTermsTitle": "No term found",
  "gloss.noTermsDesc": 'No term or acronym matches the current filters or search ("{query}").',
  "gloss.resetAll": "Reset All Filters",
  "gloss.acronym": "ACRONYM",
  "gloss.removeBookmark": "Remove from bookmarks",
  "gloss.addBookmark": "Save to bookmarks",
  "gloss.group": "Group: {title}",
  "gloss.detailsHeading": "Details & How It Works:",
  "gloss.keyFormulasShort": "Key Formulas:",
  "gloss.examTipShort": "Exam Tip SY0-701:",
  "gloss.reduce": "Collapse",
  "gloss.showDetails": "Show Details",
  "gloss.copy": "Copy",
  "gloss.copied": "Copied!",
  "gloss.copyDefinition": "Copy definition",
  "gloss.askAI": "Ask AI",
  "gloss.askAITitle": "Ask the AI Trainer for explanations",
  "gloss.copyTemplate": "{term} ({domain})\nDefinition: {definition}\n{tip}",
  "gloss.copyTip": "Exam Tip: {tip}",
  "gloss.askAIPrompt": 'Explain in detail, for the CompTIA Security+ SY0-701 exam, the term: "{term}". Contextualize it within {domain} and highlight the key aspects for answering exam questions.',

  // Glossary domain info
  "glossDom.1.title": "Domain 1: General Security Concepts (12%)",
  "glossDom.1.short": "Domain 1: General Concepts",
  "glossDom.2.title": "Domain 2: Threats, Vulnerabilities & Mitigations (22%)",
  "glossDom.2.short": "Domain 2: Threats and Vulnerabilities",
  "glossDom.3.title": "Domain 3: Security Architecture (18%)",
  "glossDom.3.short": "Domain 3: Security Architecture",
  "glossDom.4.title": "Domain 4: Security Operations (28%)",
  "glossDom.4.short": "Domain 4: Security Operations",
  "glossDom.5.title": "Domain 5: Security Program Management & Oversight (20%)",
  "glossDom.5.short": "Domain 5: Governance and Compliance",

  // Study-notes disclaimer (footer)
  "disclaimer.notOfficial": "Original personal study notes, not official CompTIA material.",
  "disclaimer.verify": "Verify exam objectives, pricing and policies against official CompTIA sources.",

  // Glossary categories
  "cat.acronyms": "Acronyms & Protocols",
  "cat.core": "Core Concepts",
  "cat.controls": "Controls & Architectures",
  "cat.attacks": "Attacks & Threats",
  "cat.metrics": "Metrics & Formulas",
  "cat.governance": "Governance & Regulations",
};

export const UI: Record<Lang, Record<UIKey, string>> = { it, en };

/* ------------------------------------------------------------------ *
 * Subgroup display-name translations (Italian source -> English)
 * ------------------------------------------------------------------ */

export const SUBGROUP_NAME_EN: Record<string, string> = {
  "Accordi e Contratti di Servizio": "Service Agreements & Contracts",
  "Analisi Postura e Gap": "Posture & Gap Analysis",
  "Analisi dei Punti di Guasto Singoli": "Single Point of Failure Analysis",
  "Analisi delle Tipologie di Log": "Log Types Analysis",
  "Analisi di Vulnerabilità": "Vulnerability Analysis",
  "Architetture VPN": "VPN Architectures",
  "Attacchi Infrastrutturali & Web": "Infrastructure & Web Attacks",
  "Attacchi alle Credenziali": "Credential Attacks",
  "Autenticazione di Rete Centralizzata (AAA)": "Centralized Network Authentication (AAA)",
  "Automazione e Orchestrazione di Sicurezza": "Security Automation & Orchestration",
  "Categorie di Controlli (Implementazione)": "Control Categories (Implementation)",
  "Classificazione e Tipologia dei Dati": "Data Classification & Types",
  "Comportamenti di Sicurezza e Controllo Rate": "Security Behaviors & Rate Control",
  "Configurazione Regole Firewall": "Firewall Rule Configuration",
  "Conformità Normativa e Obblighi Legali": "Regulatory Compliance & Legal Obligations",
  "Consapevolezza e Addestramento Personale": "Personnel Awareness & Training",
  "Crittografia": "Cryptography",
  "Dispositivi Mobili ed Enterprise (MDM)": "Mobile & Enterprise Devices (MDM)",
  "Dispositivi Speciali e IoT": "Specialized Devices & IoT",
  "Dispositivi di Connettività e Relay": "Connectivity & Relay Devices",
  "Esercitazioni e Procedure di Risposta": "Response Exercises & Procedures",
  "Fasi del Ciclo di Incident Response": "Incident Response Lifecycle Phases",
  "Fasi di Digital Forensics": "Digital Forensics Phases",
  "Hardening di Sistemi e Dispositivi": "System & Device Hardening",
  "Infrastruttura PKI": "PKI Infrastructure",
  "Ingegneria Sociale & Phishing": "Social Engineering & Phishing",
  "Metodologie di Analisi del Rischio": "Risk Analysis Methodologies",
  "Tipi di Vulnerabilità": "Vulnerability Types",
  "Metodologie di Vulnerability Assessment": "Vulnerability Assessment Methodologies",
  "Misure di Sicurezza Fisica": "Physical Security Measures",
  "Modelli Architetturali Tradizionali": "Traditional Architecture Models",
  "Modelli d'Identità e Federazione": "Identity & Federation Models",
  "Modelli di Controllo Accessi (IAM)": "Access Control Models (IAM)",
  "Modelli di Servizio Cloud & Responsabilità": "Cloud Service Models & Responsibility",
  "Modello ISO/OSI (7 Livelli)": "ISO/OSI Model (7 Layers)",
  "Motivazioni degli Attaccanti": "Attacker Motivations",
  "Performance e Metriche di Rete": "Network Performance & Metrics",
  "Politiche di Sicurezza e Standard di Sviluppo": "Security Policies & Development Standards",
  "Principi Fondamentali (CIA, AAA, Non-Repudio)": "Fundamental Principles (CIA, AAA, Non-Repudiation)",
  "Processi di Change Management": "Change Management Processes",
  "Profili e Attori delle Minacce": "Threat Actor Profiles",
  "Protocolli di Crittografia in Transito": "Encryption-in-Transit Protocols",
  "Quadro di Riferimento del Rischio (Framework)": "Risk Reference Framework",
  "Resilienza Alimentazione Fisica": "Physical Power Resilience",
  "Scenari Pratici di Analisi Incidenti (PBQ)": "Practical Incident Analysis Scenarios (PBQ)",
  "Scenari Pratici di Laboratorio (PBQ)": "Practical Lab Scenarios (PBQ)",
  "Segmentazione e Isolamento di Rete": "Network Segmentation & Isolation",
  "Sicurezza & Monitoraggio degli Accessi di Rete": "Network Access Security & Monitoring",
  "Sicurezza E-Mail": "Email Security",
  "Sicurezza Reti Wireless (Wi-Fi)": "Wireless Network Security (Wi-Fi)",
  "Sistemi di Alta Disponibilità (HA)": "High Availability Systems (HA)",
  "Siti di Disaster Recovery": "Disaster Recovery Sites",
  "Smaltimento e Declassificazione Asset": "Asset Disposal & Decommissioning",
  "Software-Defined Networking (SDN)": "Software-Defined Networking (SDN)",
  "Soluzioni di Sicurezza Integrate": "Integrated Security Solutions",
  "Stati del Ciclo di Vita del Dato": "Data Lifecycle States",
  "Strategie di Backup e Replica": "Backup & Replication Strategies",
  "Strategie di Trattamento del Rischio": "Risk Treatment Strategies",
  "Strumenti di Monitoraggio e Telemetria": "Monitoring & Telemetry Tools",
  "Controlli di Filtraggio e Integrità": "Filtering & Integrity Controls",
  "Fonti Dati per le Indagini": "Data Sources for Investigations",
  "Strutture di Governance e Ruoli dei Dati": "Governance Structures & Data Roles",
  "Tecniche di Mitigazione (Hardening)": "Mitigation Techniques (Hardening)",
  "Tecniche di Protezione del Dato": "Data Protection Techniques",
  "Tecniche di Reconnaissance e Testing": "Reconnaissance & Testing Techniques",
  "Tecnologie di Inganno (Deception)": "Deception Technologies",
  "Tipi di Architetture Firewall": "Firewall Architecture Types",
  "Tipi di Controlli (In base alla Funzione)": "Control Types (By Function)",
  "Tipologie di Malware": "Malware Types",
  "Valutazione Quantitativa del Rischio (Metrics)": "Quantitative Risk Assessment (Metrics)",
  "Valutazione del Rischio Fornitori (Third Party)": "Third-Party Vendor Risk Assessment",
  "Valutazioni e Audit di Sicurezza": "Security Assessments & Audits",
  "Vettori e Superfici di Attacco": "Attack Vectors & Surfaces",
  "Zero Trust Architecture (ZTA)": "Zero Trust Architecture (ZTA)",
};

/** Localize a subgroup display name (source names are Italian). */
export function localizeSubgroup(name: string, lang: Lang): string {
  if (lang === "it") return name;
  return SUBGROUP_NAME_EN[name] || name;
}
