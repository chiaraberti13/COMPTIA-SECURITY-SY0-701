/**
 * Generates docs/coverage-matrix.md: for every official SY0-701 objective, how
 * many questions train it (by cognitive level) and how the domain guide covers
 * it. The output is deterministic (no dates), so tests/questionObjectives.test.ts
 * can fail CI when the committed file is out of date.
 *
 * Usage: npm run coverage-matrix
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  DOMAIN_1_QUESTIONS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_5_QUESTIONS,
} from "../src/data";
import { DOMAIN_GUIDES_IT, OFFICIAL_DOMAIN_WEIGHTS } from "../src/domainGuides";
import { OFFICIAL_OBJECTIVES, objectivesOfQuestion } from "../src/questionObjectives";
import type { Question } from "../src/types";

export const COVERAGE_MATRIX_PATH = path.join("docs", "coverage-matrix.md");

const BANKS: Record<number, Question[]> = {
  1: DOMAIN_1_QUESTIONS,
  2: DOMAIN_2_QUESTIONS,
  3: DOMAIN_3_QUESTIONS,
  4: DOMAIN_4_QUESTIONS,
  5: DOMAIN_5_QUESTIONS,
};

const LEVELS: Question["level"][] = ["RICORDO", "COMPRENSIONE", "APPLICAZIONE", "ANALISI"];

/** How many of the thinnest objectives to list as priorities for new questions. */
const WEAKEST = 5;

export function renderCoverageMatrix(): string {
  const byObjective = new Map<string, Question[]>();
  for (const [domain, questions] of Object.entries(BANKS)) {
    for (const q of questions) {
      for (const code of objectivesOfQuestion(Number(domain), q)) {
        byObjective.set(code, [...(byObjective.get(code) ?? []), q]);
      }
    }
  }
  const count = (code: string) => byObjective.get(code)?.length ?? 0;

  const lines: string[] = [
    "# Matrice di copertura SY0-701",
    "",
    "> File generato da `npm run coverage-matrix` (`scripts/coverage-matrix.ts`): non modificarlo a mano.",
    "> La CI fallisce se non è aggiornato rispetto a domande, guide e collegamenti in `src/questionObjectives.ts`.",
    "",
    "Una domanda può allenare più obiettivi, anche di un dominio diverso da quello del suo banco:",
    "per questo la somma per obiettivo può superare il numero di domande del dominio.",
    "",
    "Livelli cognitivi: **R** ricordo · **C** comprensione · **Ap** applicazione · **An** analisi.",
    "",
  ];

  for (const domain of [1, 2, 3, 4, 5]) {
    const guide = DOMAIN_GUIDES_IT[domain];
    lines.push(
      `## Dominio ${domain} — ${guide.title}`,
      "",
      `Peso d'esame ${OFFICIAL_DOMAIN_WEIGHTS[domain - 1]}% · ${BANKS[domain].length} domande nel banco del dominio.`,
      "",
      "| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati |",
      "|---|---|---|---|---|---|---|---|"
    );
    for (const code of OFFICIAL_OBJECTIVES[domain]) {
      const questions = byObjective.get(code) ?? [];
      const perLevel = LEVELS.map((level) => questions.filter((q) => q.level === level).length);
      const outcome = guide.objectives.find((o) => o.code === code)?.outcome ?? "";
      const exercises = (guide.practiceScenarios ?? []).filter((s) => s.objective === code).length;
      lines.push(`| ${code} | ${outcome} | ${questions.length} | ${perLevel.join(" | ")} | ${exercises} |`);
    }
    lines.push("");
  }

  const allCodes = [1, 2, 3, 4, 5].flatMap((d) => [...OFFICIAL_OBJECTIVES[d]]);
  const weakest = [...allCodes].sort((a, b) => count(a) - count(b) || a.localeCompare(b)).slice(0, WEAKEST);
  lines.push(
    "## Priorità per nuove domande",
    "",
    `I ${WEAKEST} obiettivi con meno domande, da rinforzare per primi:`,
    "",
    ...weakest.map((code) => `- **${code}**: ${count(code)} domande`),
    ""
  );
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  writeFileSync(COVERAGE_MATRIX_PATH, renderCoverageMatrix());
  console.log(`Written ${COVERAGE_MATRIX_PATH}`);
}
