/**
 * Guided study paths for the "Where do I start?" panel. Each path is a short
 * ordered plan; a step can carry an action that takes the learner straight to
 * the part of the app it talks about. The two languages must describe the same
 * steps with the same actions (tests/studyPaths.test.ts).
 */
import type { Lang } from "./i18n";

export type StudyAction =
  | { kind: "guide"; domain: 1 | 2 | 3 | 4 | 5; /** Scroll to this objective, e.g. "4.3". */ objective?: string }
  | { kind: "glossary" }
  | { kind: "quiz"; preset: "mini" | "balanced" }
  | { kind: "exam" }
  | { kind: "review" }
  | { kind: "objective" }
  | { kind: "ai" };

export interface StudyStep {
  text: string;
  action?: StudyAction;
}

export type StudyPathId = "beginner" | "refresh" | "exam" | "practice";

export interface StudyPath {
  id: StudyPathId;
  title: string;
  /** Who the path is for, in one line. */
  forWhom: string;
  steps: StudyStep[];
}

const IT: StudyPath[] = [
  {
    id: "beginner",
    title: "Principiante",
    forWhom: "Parti da zero o non conosci ancora il syllabus SY0-701.",
    steps: [
      { text: "Apri la guida del Dominio 1: leggi scopo, obiettivi e percorso consigliato prima delle singole sottovoci.", action: { kind: "guide", domain: 1 } },
      { text: "Studia le sottovoci della checklist e spunta solo quelle che sapresti spiegare a un collega." },
      { text: "Quando incontri un acronimo che non conosci, cercalo nel glossario.", action: { kind: "glossary" } },
      { text: "Verifica subito con un quiz Mini da 10 domande e leggi la spiegazione di ogni opzione, anche quando rispondi bene.", action: { kind: "quiz", preset: "mini" } },
      { text: "Passa al Dominio 2 e procedi allo stesso modo, un dominio alla volta, fino al Dominio 5.", action: { kind: "guide", domain: 2 } },
      { text: "Ogni giorno, fai il ripasso intelligente delle domande in scadenza: bastano pochi minuti.", action: { kind: "review" } },
    ],
  },
  {
    id: "refresh",
    title: "Ripasso rapido",
    forWhom: "Hai già studiato tutto il materiale e vuoi rinfrescarlo.",
    steps: [
      { text: "Comincia dal ripasso intelligente: ripropone le domande che hai sbagliato o che stai per dimenticare.", action: { kind: "review" } },
      { text: "Per ogni dominio rileggi solo le tabelle comparative e gli errori comuni della guida.", action: { kind: "guide", domain: 1 } },
      { text: "Fai un quiz Bilanciato da 25 domande, 5 per dominio, per vedere dove sei più debole.", action: { kind: "quiz", preset: "balanced" } },
      { text: "Allena gli obiettivi dove sbagli di più con il quiz per singolo obiettivo.", action: { kind: "objective" } },
    ],
  },
  {
    id: "exam",
    title: "Preparazione all'esame",
    forWhom: "L'esame è vicino e vuoi provarti in condizioni realistiche.",
    steps: [
      { text: "Fai una simulazione di 90 domande, ripartite secondo i pesi ufficiali dei domini, con il timer attivo.", action: { kind: "exam" } },
      { text: "Alla fine rivedi tutte le risposte sbagliate e rifai subito gli errori." },
      { text: "Allena gli obiettivi che hanno dato più errori con il quiz per singolo obiettivo.", action: { kind: "objective" } },
      { text: "Rileggi le verifiche di padronanza della guida di ogni dominio: se non sai rispondere, torna a quella parte.", action: { kind: "guide", domain: 1 } },
      { text: "Negli ultimi giorni fai solo ripasso intelligente e una seconda simulazione, senza studiare argomenti nuovi.", action: { kind: "review" } },
    ],
  },
  {
    id: "practice",
    title: "Consolidamento pratico",
    forWhom: "Conosci la teoria e vuoi capire come si applica in un'azienda.",
    steps: [
      { text: "Risolvi gli esercizi guidati delle guide: decidi la tua risposta prima di aprire il ragionamento.", action: { kind: "guide", domain: 1 } },
      { text: "Usa il quiz per obiettivo sugli obiettivi basati su scenari: 2.4, 3.2, 4.1, 4.5, 4.6, 4.9 e 5.6.", action: { kind: "objective" } },
      { text: "Chiedi al Trainer AI uno scenario aziendale su un argomento e confronta la sua soluzione con la tua. Le risposte AI possono contenere errori.", action: { kind: "ai" } },
      { text: "Dopo un quiz, usa la remediation adattiva per ricevere nuove domande sugli argomenti sbagliati." },
    ],
  },
];

const EN: StudyPath[] = [
  {
    id: "beginner",
    title: "Beginner",
    forWhom: "You are starting from scratch or do not know the SY0-701 syllabus yet.",
    steps: [
      { text: "Open the Domain 1 guide: read its purpose, objectives and suggested path before the individual topics.", action: { kind: "guide", domain: 1 } },
      { text: "Study the topics in the checklist and tick only those you could explain to a colleague." },
      { text: "When you meet an acronym you do not know, look it up in the glossary.", action: { kind: "glossary" } },
      { text: "Check yourself straight away with a Mini quiz of 10 questions and read the explanation of every option, even when you answer correctly.", action: { kind: "quiz", preset: "mini" } },
      { text: "Move on to Domain 2 and work the same way, one domain at a time, up to Domain 5.", action: { kind: "guide", domain: 2 } },
      { text: "Every day, run the smart review of the questions that are due: a few minutes are enough.", action: { kind: "review" } },
    ],
  },
  {
    id: "refresh",
    title: "Quick refresh",
    forWhom: "You have already studied all the material and want to refresh it.",
    steps: [
      { text: "Start with the smart review: it brings back the questions you got wrong or are about to forget.", action: { kind: "review" } },
      { text: "For each domain, reread only the comparison tables and common traps of the guide.", action: { kind: "guide", domain: 1 } },
      { text: "Take a Balanced quiz of 25 questions, 5 per domain, to see where you are weakest.", action: { kind: "quiz", preset: "balanced" } },
      { text: "Train the objectives where you make the most mistakes with the single-objective quiz.", action: { kind: "objective" } },
    ],
  },
  {
    id: "exam",
    title: "Exam preparation",
    forWhom: "The exam is close and you want to test yourself in realistic conditions.",
    steps: [
      { text: "Take a simulation of 90 questions, split according to the official domain weights, with the timer on.", action: { kind: "exam" } },
      { text: "At the end, review every wrong answer and retry the mistakes straight away." },
      { text: "Train the objectives that caused the most mistakes with the single-objective quiz.", action: { kind: "objective" } },
      { text: "Reread the mastery checks of each domain guide: if you cannot answer one, go back to that part.", action: { kind: "guide", domain: 1 } },
      { text: "In the last days, do only the smart review and a second simulation, without studying new topics.", action: { kind: "review" } },
    ],
  },
  {
    id: "practice",
    title: "Hands-on consolidation",
    forWhom: "You know the theory and want to understand how it applies in a company.",
    steps: [
      { text: "Solve the guided exercises of the guides: decide your answer before opening the reasoning.", action: { kind: "guide", domain: 1 } },
      { text: "Use the objective quiz on the scenario-based objectives: 2.4, 3.2, 4.1, 4.5, 4.6, 4.9 and 5.6.", action: { kind: "objective" } },
      { text: "Ask the AI Trainer for a business scenario on a topic and compare its solution with yours. AI answers can contain errors.", action: { kind: "ai" } },
      { text: "After a quiz, use the adaptive remediation to get new questions on the topics you got wrong." },
    ],
  },
];

export const STUDY_PATHS: Record<Lang, StudyPath[]> = { it: IT, en: EN };
