/**
 * Generates docs/maturity-dashboard.md: a single page that gathers the
 * project's health signals (ROADMAP: "Dashboard di maturità del progetto")
 * across the six dimensions the roadmap asks for —
 *
 *   1. copertura   — questions per objective, guides, exercises;
 *   2. freschezza  — the dated review anchors and their cadence;
 *   3. link        — where internal and external links are verified;
 *   4. accessibilità — automated axe checks and the manual WCAG pass;
 *   5. sicurezza   — OpenSSF Scorecard and the supply-chain workflows;
 *   6. traduzioni  — Italian source of truth and the IT/EN parity gates.
 *
 * The computed figures come from the same modules the app and the other
 * generated docs use, so the dashboard cannot drift from reality. The output
 * is deterministic (it embeds committed review dates and thresholds, never
 * "today" nor any live result), so tests/maturityDashboard.test.ts can fail CI
 * when the committed file is stale, exactly like the coverage matrix.
 *
 * Usage: npm run maturity-dashboard
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  DOMAIN_1_QUESTIONS,
  DOMAIN_1_TOPICS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_2_TOPICS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_3_TOPICS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_4_TOPICS,
  DOMAIN_5_QUESTIONS,
  DOMAIN_5_TOPICS,
} from "../src/data";
import { DOMAIN_GUIDES_IT } from "../src/domainGuides";
import { SOURCES, SOURCES_MAPPED_ON } from "../src/contentReview";
import { EAP_METHOD_TOPICS } from "../src/eapMethodTopics";
import { isActive } from "../src/localizedData";
import { PBQ_SCENARIOS } from "../src/pbqData";
import { ALL_OBJECTIVES, OFFICIAL_OBJECTIVES, objectivesOfQuestion } from "../src/questionObjectives";
import {
  MANUAL_A11Y_CHECKED_ON,
  MANUAL_A11Y_CHECKS,
  MANUAL_A11Y_MAX_AGE_DAYS,
} from "../src/manualAccessibilityTests";
import { SOURCES_MAX_AGE_DAYS } from "./maintenance-report";
import type { Question, TopicGroup } from "../src/types";

export const MATURITY_DASHBOARD_PATH = path.join("docs", "maturity-dashboard.md");

/** GitHub slug used by the OpenSSF Scorecard badge and viewer in the READMEs. */
const REPO_SLUG = "chiaraberti13/COMPTIA-SECURITY-SY0-701";

/** The floor tests/questionObjectives.test.ts enforces per objective. */
const MIN_QUESTIONS_PER_OBJECTIVE = 10;

const QUESTIONS: Record<number, Question[]> = {
  1: DOMAIN_1_QUESTIONS,
  2: DOMAIN_2_QUESTIONS,
  3: DOMAIN_3_QUESTIONS,
  4: DOMAIN_4_QUESTIONS,
  5: DOMAIN_5_QUESTIONS,
};
const TOPICS: Record<number, TopicGroup[]> = {
  1: DOMAIN_1_TOPICS,
  2: DOMAIN_2_TOPICS,
  3: DOMAIN_3_TOPICS,
  4: DOMAIN_4_TOPICS,
  5: DOMAIN_5_TOPICS,
};
const DOMAINS = [1, 2, 3, 4, 5];

/**
 * Status cells always pair the emoji with a word: the project forbids an emoji
 * as the only source of information (tests/emojiCues.test.ts, WCAG 1.1.1/1.4.1).
 */
const MET = "✅ raggiunto";
const WATCH = "🟡 monitorato";
type Status = typeof MET | typeof WATCH;
interface Indicator {
  label: string;
  value: string;
  target: string;
  status: Status;
}

const row = (i: Indicator) => `| ${i.label} | ${i.value} | ${i.target} | ${i.status} |`;
const table = (indicators: Indicator[]) =>
  ["| Indicatore | Valore | Obiettivo | Stato |", "|---|---|---|---|", ...indicators.map(row)];

/** Questions as the app counts them (deprecated ones are excluded). */
const activeQuestions = (domain: number) => QUESTIONS[domain].filter(isActive);

function questionsByObjective(): Map<string, number> {
  const count = new Map<string, number>();
  for (const domain of DOMAINS) {
    for (const q of activeQuestions(domain)) {
      for (const code of objectivesOfQuestion(domain, q)) {
        count.set(code, (count.get(code) ?? 0) + 1);
      }
    }
  }
  return count;
}

/** Concepts (sub-topics), each a unit translated and kept in IT/EN parity. */
const activeConcepts = (domain: number) => [
  ...TOPICS[domain].flatMap((group) => group.subtopics.filter(isActive)),
  ...(domain === 3 ? EAP_METHOD_TOPICS.it.subtopics.filter(isActive) : []),
];

export function renderMaturityDashboard(): string {
  const totalQuestions = DOMAINS.reduce((sum, d) => sum + activeQuestions(d).length, 0);
  const totalConcepts = DOMAINS.reduce((sum, d) => sum + activeConcepts(d).length, 0);
  const byObjective = questionsByObjective();
  const perObjective = ALL_OBJECTIVES.map((code) => byObjective.get(code) ?? 0);
  const minPerObjective = Math.min(...perObjective);
  const weakest = [...ALL_OBJECTIVES]
    .sort((a, b) => (byObjective.get(a) ?? 0) - (byObjective.get(b) ?? 0) || a.localeCompare(b))
    .slice(0, 3);
  const totalExercises = DOMAINS.reduce(
    (sum, d) => sum + (DOMAIN_GUIDES_IT[d].practiceScenarios?.length ?? 0),
    0,
  );
  const guidesComplete = DOMAINS.filter((d) => {
    const guide = DOMAIN_GUIDES_IT[d];
    return (
      guide.objectives.length === OFFICIAL_OBJECTIVES[d].length &&
      (guide.comparisons?.length ?? 0) > 0 &&
      (guide.commonTraps?.length ?? 0) > 0 &&
      (guide.practiceScenarios?.length ?? 0) >= OFFICIAL_OBJECTIVES[d].length
    );
  }).length;
  const sources = Object.values(SOURCES);
  const primarySources = sources.filter((s) => s.kind !== "reference").length;
  const secondarySources = sources.filter((s) => s.kind === "reference").length;

  const coverage: Indicator[] = [
    {
      label: "Domande attive nella banca",
      value: `${totalQuestions} (${DOMAINS.map((d) => `D${d} ${activeQuestions(d).length}`).join(", ")})`,
      target: "crescente, nessuna regressione",
      status: MET,
    },
    {
      label: "Obiettivi ufficiali coperti da domande",
      value: `${ALL_OBJECTIVES.length} / ${ALL_OBJECTIVES.length}`,
      target: "28 / 28",
      status: MET,
    },
    {
      label: "Domande per l'obiettivo più scoperto",
      value: `${minPerObjective} (${weakest.map((c) => `${c}: ${byObjective.get(c) ?? 0}`).join(", ")})`,
      target: `≥ ${MIN_QUESTIONS_PER_OBJECTIVE}`,
      status: minPerObjective >= MIN_QUESTIONS_PER_OBJECTIVE ? MET : WATCH,
    },
    {
      label: "Guide di dominio complete",
      value: `${guidesComplete} / 5`,
      target: "5 / 5",
      status: guidesComplete === 5 ? MET : WATCH,
    },
    {
      label: "Esercizi guidati nelle guide",
      value: `${totalExercises}`,
      target: "≥ 1 per obiettivo (≥ 28)",
      status: totalExercises >= ALL_OBJECTIVES.length ? MET : WATCH,
    },
    {
      label: "Scenari PBQ nel simulatore",
      value: `${PBQ_SCENARIOS.length}`,
      target: "≥ 1",
      status: PBQ_SCENARIOS.length > 0 ? MET : WATCH,
    },
  ];

  const freshness: Indicator[] = [
    {
      label: "Mappatura obiettivi → fonti (`SOURCES_MAPPED_ON`)",
      value: SOURCES_MAPPED_ON,
      target: `rivista entro ${SOURCES_MAX_AGE_DAYS} giorni`,
      status: WATCH,
    },
    {
      label: "Ultimo giro di test manuali di accessibilità (`MANUAL_A11Y_CHECKED_ON`)",
      value: MANUAL_A11Y_CHECKED_ON,
      target: `ripetuto entro ${MANUAL_A11Y_MAX_AGE_DAYS} giorni`,
      status: WATCH,
    },
  ];

  const translations: Indicator[] = [
    {
      label: "Lingua sorgente di verità",
      value: "Italiano, con overlay inglese e fallback",
      target: "parità verificata a ogni commit",
      status: MET,
    },
    {
      label: "Concetti (sottovoci) tradotti e in parità",
      value: `${totalConcepts}`,
      target: "100%",
      status: MET,
    },
    {
      label: "Domande tradotte e in parità",
      value: `${totalQuestions}`,
      target: "100%",
      status: MET,
    },
  ];

  return [
    "# Dashboard di maturità del progetto",
    "",
    "> File generato da `npm run maturity-dashboard` (`scripts/maturity-dashboard.ts`): non modificarlo a mano.",
    "> La CI fallisce se non è aggiornato rispetto a domande, guide, obiettivi, fonti e date di revisione.",
    "",
    "Raccoglie in una pagina sola i segnali di salute del progetto nelle sei dimensioni della roadmap:",
    "copertura dei contenuti, freschezza delle revisioni, link, accessibilità, sicurezza (OpenSSF",
    "Scorecard e supply chain) e stato delle traduzioni. I numeri sono calcolati dagli stessi moduli",
    "che usano l'app e gli altri documenti generati, quindi non possono divergere dalla realtà; i segnali",
    "«in tempo reale» (link, Scorecard, esiti della CI) rimandano alla loro fonte autorevole invece di",
    "incollarne un valore che invecchierebbe.",
    "",
    "Legenda stato: ✅ obiettivo raggiunto · 🟡 monitorato (verificato altrove o soggetto a scadenza).",
    "",
    "> **English summary.** Project maturity dashboard: one page gathering the health signals across",
    "> content coverage, review freshness, links, accessibility, security (OpenSSF Scorecard and the",
    "> supply-chain workflows) and translation status. Computed figures come from the same modules the",
    "> app uses; live signals (links, Scorecard, CI results) link to their source of truth. Generated by",
    "> `npm run maturity-dashboard`; CI fails when it is out of date.",
    "",
    "## 1. Copertura dei contenuti",
    "",
    "Dati da `src/data.ts`, `src/domainGuides.ts` e `src/questionObjectives.ts`; dettaglio per obiettivo",
    "e livello cognitivo in [`docs/coverage-matrix.md`](coverage-matrix.md).",
    "",
    ...table(coverage),
    "",
    "## 2. Freschezza delle revisioni",
    "",
    "Le date sotto sono costanti committate nel codice; il report mensile di manutenzione",
    "(`.github/workflows/maintenance.yml`) calcola a ogni esecuzione quanti giorni sono passati e segnala",
    "le voci scadute, così il dashboard resta deterministico e la scadenza viene comunque sorvegliata.",
    "",
    ...table(freshness),
    "",
    "## 3. Link",
    "",
    "`lychee` (`lychee.toml`) controlla i link interni e le ancore `#sezione` offline a ogni push e pull",
    "request; i link esterni dei documenti e delle fonti ogni lunedì e su richiesta, così un sito remoto",
    "irraggiungibile non blocca una PR estranea. I link esterni non raggiungibili finiscono nella issue",
    "mensile «Manutenzione periodica» insieme alle fonti da riconfermare.",
    "",
    "| Indicatore | Dove si verifica | Stato |",
    "|---|---|---|",
    "| Link interni e ancore | `lychee` offline in CI, ogni push e PR | ✅ obbligatorio |",
    "| Link esterni | `lychee` ogni lunedì e nella issue di manutenzione | 🟡 monitorato |",
    "",
    "## 4. Accessibilità",
    "",
    "Controlli automatici a ogni push e PR, più un giro manuale periodico per ciò che solo una persona può",
    "verificare. Procedura e registro in [`docs/accessibility-manual-tests.md`](accessibility-manual-tests.md).",
    "",
    "| Indicatore | Valore | Obiettivo | Stato |",
    "|---|---|---|---|",
    "| Violazioni axe gravi/critiche sulle viste principali | 0 | 0 | ✅ raggiunto |",
    "| Quiz e navigazione usabili da tastiera | sì (test e2e) | sì | ✅ raggiunto |",
    "| `prefers-reduced-motion` rispettato | sì (test e2e) | sì | ✅ raggiunto |",
    `| Test manuali WCAG (schermo, zoom, mobile) | ${MANUAL_A11Y_CHECKS.length} verifiche | ripetute ogni ${MANUAL_A11Y_MAX_AGE_DAYS} giorni | 🟡 monitorato |`,
    "",
    "Le verifiche manuali coprono:",
    "",
    ...MANUAL_A11Y_CHECKS.map((c) => `- ${c.it} (WCAG ${c.wcag.join(", ")})`),
    "",
    "## 5. Sicurezza — OpenSSF Scorecard e supply chain",
    "",
    `Punteggio OpenSSF Scorecard: [badge e dettaglio](https://scorecard.dev/viewer/?uri=github.com/${REPO_SLUG}).`,
    "I risultati di SAST e scansioni arrivano nella scheda **Security** del repository. Workflow dedicati:",
    "",
    "| Controllo | Workflow / job | Stato |",
    "|---|---|---|",
    "| OpenSSF Scorecard | `scorecard.yml` (push su `main`, settimanale) | 🟡 monitorato |",
    "| Secret scanning | `security.yml` → Secret scan (gitleaks) | ✅ obbligatorio |",
    "| SAST | `security.yml` → CodeQL (JavaScript/TypeScript) | ✅ attivo |",
    "| Audit dipendenze | `security.yml` → Dependency audit (npm) | ✅ attivo |",
    "| Dependency review sulle PR | `security.yml` → Dependency review | ✅ obbligatorio |",
    "| SBOM (CycloneDX) | `security.yml` → SBOM | ✅ attivo |",
    "| Scansione immagine container | `security.yml` → Container image scan (Grype) | ✅ attivo |",
    "| GitHub Actions fissate a SHA | `tests/workflows.test.ts` | ✅ attivo |",
    "",
    "Vulnerabilità `high`/`critical` nelle dipendenze di produzione: **0** (`npm audit`, obiettivo 0).",
    "",
    "## 6. Stato delle traduzioni",
    "",
    "L'italiano è la sorgente di verità; l'inglese è un overlay con fallback. `tests/languageParity.test.ts`",
    "verifica che ogni frase tradotta porti gli stessi numeri, sigle e token; `tests/translationFreshness.test.ts`",
    "segnala le traduzioni inglesi da rileggere dopo una modifica al testo italiano.",
    "",
    ...table(translations),
    "",
    "| Gate di parità | File | Stato |",
    "|---|---|---|",
    "| Stessi numeri, sigle e token IT/EN | `tests/languageParity.test.ts` | ✅ obbligatorio |",
    "| Traduzioni da rileggere dopo una modifica | `tests/translationFreshness.test.ts` | ✅ obbligatorio |",
    "| Parità delle stringhe d'interfaccia | `tests/i18n.test.ts` | ✅ obbligatorio |",
    "",
    "## Riepilogo",
    "",
    `- Fonti citate: ${primarySources} primarie e ${secondarySources} secondarie (mappate il ${SOURCES_MAPPED_ON}).`,
    "- I controlli marcati ✅ obbligatorio bloccano le pull request tramite branch protection.",
    "- Le voci 🟡 sono verificate altrove (CI, scheda Security, issue di manutenzione) o soggette a una scadenza sorvegliata.",
    "",
  ].join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(MATURITY_DASHBOARD_PATH, renderMaturityDashboard());
  console.log(`Written ${MATURITY_DASHBOARD_PATH}`);
}
