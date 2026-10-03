/**
 * Monthly maintenance report (ROADMAP: "Automatizzare le issue ricorrenti"),
 * published as a GitHub issue by .github/workflows/maintenance.yml. Four
 * checks a person still has to judge, collected here so nobody has to
 * remember them:
 *
 * 1. links: the external links lychee could not reach (its Markdown output);
 * 2. sources: the standards the objectives cite, to confirm each is still the
 *    current revision, with the age of the mapping;
 * 3. dependencies: `npm audit --json` and `npm outdated --json`;
 * 4. language parity: the Italian/English document pairs where one side
 *    changed after the last change of the other (the content itself is
 *    checked on every commit by tests/languageParity.test.ts and
 *    tests/translationFreshness.test.ts; Markdown documents are not).
 *
 * Usage: npx tsx scripts/maintenance-report.ts --source-links > sources.md
 *        npx tsx scripts/maintenance-report.ts [--audit audit.json]
 *          [--outdated outdated.json] [--links lychee.md] [--date YYYY-MM-DD]
 * Prints the issue body (Markdown) on stdout.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { SOURCES, SOURCES_MAPPED_ON } from "../src/contentReview";

/** After this many days the source mapping is flagged for a full review. */
export const SOURCES_MAX_AGE_DAYS = 180;
/** Room left for lychee's detail in the issue body. */
export const LINK_DETAIL_MAX = 40_000;

const SEVERITIES = ["critical", "high", "moderate", "low", "info"] as const;
type Severity = (typeof SEVERITIES)[number];

export interface AuditJson {
  metadata?: { vulnerabilities?: Partial<Record<Severity | "total", number>> };
  vulnerabilities?: Record<string, { severity: Severity; isDirect?: boolean; fixAvailable?: unknown }>;
}
export type OutdatedJson = Record<string, { current?: string; wanted?: string; latest?: string }>;

export interface LanguagePair {
  /** The two files, source language first. */
  files: [string, string];
  /** Commits that changed each file after the last commit that changed the other. */
  ahead: [number, number];
}

export interface ReportInput {
  date: string;
  audit?: AuditJson;
  outdated?: OutdatedJson;
  /** lychee's Markdown output, or undefined when the link check did not run. */
  links?: string;
  pairs: LanguagePair[];
}

const daysBetween = (from: string, to: string) => Math.round((Date.parse(to) - Date.parse(from)) / 86_400_000);
const major = (version = "") => Number(version.split(".")[0]);

/** Errors plus timeouts from the summary table of lychee's Markdown output; the failing links follow under "## Errors". */
export function linkErrors(markdown: string): number {
  const row = (label: string) => Number(markdown.match(new RegExp(`\\|[^|\\n]*${label}\\s*\\|\\s*(\\d+)\\s*\\|`))?.[1] ?? 0);
  return row("Errors") + row("Timeouts");
}

function linksSection(links: string | undefined): string[] {
  if (links === undefined) return ["Il controllo dei link non è stato eseguito: rilancia il workflow."];
  const errors = linkErrors(links);
  if (errors === 0) return ["✅ Tutti i link esterni rispondono."];
  let details = links.slice(Math.max(0, links.search(/^##+ Errors/m))).trim();
  // A GitHub issue body holds at most 65,536 characters.
  if (details.length > LINK_DETAIL_MAX) details = `${details.slice(0, LINK_DETAIL_MAX)}\n\n… (dettaglio troncato: l'elenco completo è nel log del workflow)`;
  return [
    `⚠️ **${errors}** link non raggiungibili. Per ognuno: correggi l'indirizzo, sostituiscilo con una fonte equivalente o, se il sito è solo lento, aggiungilo con un commento a \`lychee.toml\`.`,
    "",
    "<details><summary>Dettaglio di lychee</summary>",
    "",
    details,
    "",
    "</details>",
  ];
}

function sourcesSection(date: string): string[] {
  const age = daysBetween(SOURCES_MAPPED_ON, date);
  const head =
    age > SOURCES_MAX_AGE_DAYS
      ? `⚠️ L'associazione fra obiettivi e fonti (\`SOURCES_MAPPED_ON\` in \`src/contentReview.ts\`) risale al ${SOURCES_MAPPED_ON}, ${age} giorni fa: oltre i ${SOURCES_MAX_AGE_DAYS} previsti, va rivista per intero e la data aggiornata.`
      : `L'associazione fra obiettivi e fonti risale al ${SOURCES_MAPPED_ON} (${age} giorni fa, limite ${SOURCES_MAX_AGE_DAYS}).`;
  const rows = Object.values(SOURCES)
    .filter((s) => s.kind !== "exam")
    .map((s) => `- [ ] [${s.title}](${s.url}) — ${s.publisher}`);
  return [
    head,
    "",
    "Conferma che ogni fonte citata sia ancora la revisione in vigore (per i NIST, la pagina indica se esiste una revisione successiva o una bozza). Se cambia, aggiorna titolo e URL in `src/contentReview.ts` e rileggi le sottovoci collegate.",
    "",
    `- [ ] [CompTIA Security+ (SY0-701) — exam objectives](${SOURCES.comptiaSecurityPlus.url}): l'esame è ancora SY0-701 e non è stato annunciato il ritiro.`,
    ...rows,
  ];
}

function dependenciesSection(audit: AuditJson | undefined, outdated: OutdatedJson | undefined): string[] {
  const lines: string[] = [];
  if (!audit) lines.push("`npm audit` non è stato eseguito.");
  else {
    const counts = audit.metadata?.vulnerabilities ?? {};
    const found = SEVERITIES.filter((s) => (counts[s] ?? 0) > 0);
    if (found.length === 0) lines.push("✅ `npm audit`: nessuna vulnerabilità nota.");
    else {
      lines.push(`⚠️ \`npm audit\`: ${found.map((s) => `${counts[s]} ${s}`).join(", ")}.`, "");
      for (const [name, v] of Object.entries(audit.vulnerabilities ?? {}).sort(([a], [b]) => a.localeCompare(b))) {
        lines.push(`- [ ] \`${name}\` (${v.severity}${v.isDirect ? ", diretta" : ", indiretta"}${v.fixAvailable ? ", correzione disponibile" : ", nessuna correzione"})`);
      }
    }
  }
  lines.push("");
  if (!outdated) lines.push("`npm outdated` non è stato eseguito.");
  else {
    const entries = Object.entries(outdated).sort(([a], [b]) => a.localeCompare(b));
    const majors = entries.filter(([, v]) => major(v.latest) > major(v.current));
    if (entries.length === 0) lines.push("✅ Tutte le dipendenze dirette sono all'ultima versione.");
    else {
      lines.push(
        `${entries.length} dipendenze dirette non sono all'ultima versione. Dependabot propone da solo minor e patch (dopo 7 giorni) e le unisce quando la CI è verde; le major qui sotto vanno pianificate come indicato in \`CONTRIBUTING.md\`.`
      );
      if (majors.length > 0) {
        lines.push("", "| Pacchetto | In uso | Ultima |", "|---|---|---|");
        for (const [name, v] of majors) lines.push(`| \`${name}\` | ${v.current ?? "—"} | ${v.latest ?? "—"} |`);
      }
    }
  }
  return lines;
}

function paritySection(pairs: LanguagePair[]): string[] {
  const drift = pairs.filter((p) => p.ahead[0] > 0 || p.ahead[1] > 0);
  const lines = [
    `Il contenuto dell'app (domande, sottovoci, guide) è verificato a ogni commit da \`tests/languageParity.test.ts\` e \`tests/translationFreshness.test.ts\`. Qui i documenti Markdown tradotti: ${pairs.length} ${pairs.length === 1 ? "coppia" : "coppie"}.`,
    "",
  ];
  if (drift.length === 0) return [...lines, "✅ In ogni coppia le due lingue sono state aggiornate insieme."];
  lines.push("Coppie in cui una lingua è cambiata dopo l'ultima modifica dell'altra: rileggi la traduzione e allineala, o conferma che la modifica non la riguarda.", "");
  for (const { files, ahead } of drift) {
    const [newer, older, n] = ahead[0] > 0 ? [files[0], files[1], ahead[0]] : [files[1], files[0], ahead[1]];
    lines.push(`- [ ] \`${newer}\`: ${n} commit dopo l'ultimo di \`${older}\``);
  }
  return lines;
}

export function buildReport(input: ReportInput): string {
  return [
    `Controllo periodico generato il ${input.date} da \`.github/workflows/maintenance.yml\` (\`scripts/maintenance-report.ts\`). Spunta le voci man mano; chiudi la issue quando sono tutte risolte o motivate in un commento.`,
    "",
    "> **English summary.** Monthly maintenance report: unreachable external links, sources to confirm as current, dependency audit and outdated packages, and Italian/English document pairs that drifted apart.",
    "",
    "## 1. Link esterni",
    "",
    ...linksSection(input.links),
    "",
    "## 2. Fonti",
    "",
    ...sourcesSection(input.date),
    "",
    "## 3. Dipendenze",
    "",
    ...dependenciesSection(input.audit, input.outdated),
    "",
    "## 4. Parità linguistica",
    "",
    ...paritySection(input.pairs),
    "",
  ].join("\n");
}

/** Italian/English Markdown pairs: README.md (English) with README.it.md, every lab README.md (Italian) with README.en.md. */
export function languagePairs(files: string[]): [string, string][] {
  const set = new Set(files);
  const pairs: [string, string][] = [];
  for (const file of files) {
    if (file.endsWith(".it.md") && set.has(file.replace(/\.it\.md$/, ".md"))) pairs.push([file.replace(/\.it\.md$/, ".md"), file]);
    if (file.endsWith(".en.md") && set.has(file.replace(/\.en\.md$/, ".md"))) pairs.push([file.replace(/\.en\.md$/, ".md"), file]);
  }
  return pairs.sort(([a], [b]) => a.localeCompare(b));
}

const git = (...args: string[]) => execFileSync("git", args, { encoding: "utf8" }).trim();

function measurePair([a, b]: [string, string]): LanguagePair {
  const after = (file: string, other: string) => {
    const last = git("log", "-1", "--format=%H", "--", other);
    return last ? Number(git("rev-list", "--count", `${last}..HEAD`, "--", file)) : 0;
  };
  return { files: [a, b], ahead: [after(a, b), after(b, a)] };
}

function main(argv: string[]) {
  const arg = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    return i >= 0 ? argv[i + 1] : undefined;
  };
  const json = <T>(file: string | undefined): T | undefined => {
    if (!file || !existsSync(file)) return undefined;
    const text = readFileSync(file, "utf8").trim();
    return text ? (JSON.parse(text) as T) : ({} as T);
  };
  // The source URLs as a Markdown list, for lychee to check with the documents.
  if (argv.includes("--source-links")) {
    process.stdout.write(Object.values(SOURCES).map((s) => `- <${s.url}>`).join("\n") + "\n");
    return;
  }
  const linksFile = arg("links");
  const pairs = languagePairs(git("ls-files", "*.md").split("\n")).map(measurePair);
  process.stdout.write(
    buildReport({
      date: arg("date") ?? new Date().toISOString().slice(0, 10),
      audit: json<AuditJson>(arg("audit")),
      outdated: json<OutdatedJson>(arg("outdated")),
      links: linksFile && existsSync(linksFile) ? readFileSync(linksFile, "utf8") : undefined,
      pairs,
    })
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) main(process.argv.slice(2));
