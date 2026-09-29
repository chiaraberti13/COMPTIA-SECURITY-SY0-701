/**
 * Spell checks the English study content with cspell (ROADMAP: "Spell checking
 * tecnico"): the English overlay of concepts and questions, the English domain
 * guides, the interface strings and the study paths.
 *
 * The TypeScript files mix both languages (the overlay is keyed by Italian
 * titles), so this script extracts the English texts, one unit per line with
 * its identifier in front ("concept 2:CVEVuln\t..."), writes them to
 * .spellcheck/content-en.txt and runs cspell on that file with cspell.json.
 * An unknown word is reported with the unit it belongs to, so it can be fixed
 * at the source or, if it is a real term, added to cspell/project-words.txt.
 *
 * The Italian source is not checked: the only Italian dictionaries for cspell
 * are GPL-licensed, which the project does not accept (ROADMAP).
 *
 * Usage: npm run spellcheck
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DOMAIN_GUIDES_EN } from "../src/domainGuides";
import { UI } from "../src/i18n";
import { getAllTopics, getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { STUDY_PATHS } from "../src/studyPaths";

export const SPELLCHECK_FILE = path.join(".spellcheck", "content-en.txt");

/** Every string inside a value, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

/** The English texts, as [identifier, text] pairs. */
export async function englishUnits(): Promise<[string, string][]> {
  await loadEnglishOverlay();
  const units: [string, string][] = [];
  for (const d of [1, 2, 3, 4, 5]) {
    for (const group of getAllTopics("en")[d]) {
      units.push([`group ${d}:${group.title}`, `${group.title} ${group.description}`]);
      for (const s of group.subtopics) units.push([`concept ${d}:${s.checklistKey}`, strings([s.name, s.definition, s.details, s.examTip, s.keyFormulas, s.comparativeTable]).join(" ")]);
    }
    for (const q of getDomainQuestions(d, "en")) units.push([`question ${q.id}`, strings([q.topic, q.scenario, q.question, q.options, q.explanation]).join(" ")]);
    for (const [field, value] of Object.entries(DOMAIN_GUIDES_EN[d])) units.push([`guide ${d}:${field}`, strings(value).join(" ")]);
  }
  for (const [key, text] of Object.entries(UI.en)) units.push([`ui ${key}`, text]);
  STUDY_PATHS.en.forEach((p) => units.push([`path ${p.id}`, strings(p).join(" ")]));
  return units.map(([id, text]) => [id.replace(/\s+/g, "_"), text.replace(/\s+/g, " ")]);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const units = await englishUnits();
  mkdirSync(path.dirname(SPELLCHECK_FILE), { recursive: true });
  writeFileSync(SPELLCHECK_FILE, units.map(([id, text]) => `${id}\t${text}`).join("\n") + "\n");
  const run = spawnSync("npx", ["cspell", "lint", "--no-progress", "--no-summary", "--config", "cspell.json", SPELLCHECK_FILE], { encoding: "utf8" });
  // cspell reports "file:line:column - Unknown word (word)": name the unit instead of the line.
  const problems = (run.stdout ?? "")
    .split("\n")
    .map((line) => /:(\d+):\d+ - Unknown word \((.+?)\)/.exec(line))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => `${units[Number(m[1]) - 1][0]}: ${m[2]}`);
  if (run.status !== 0 && problems.length === 0) {
    console.error(run.stdout, run.stderr);
    process.exit(run.status ?? 1);
  }
  if (problems.length > 0) {
    console.error(problems.join("\n"));
    console.error(`\n${problems.length} unknown word(s): fix the text, or add a real term to cspell/project-words.txt.`);
    process.exit(1);
  }
  console.log(`Spell check passed: ${units.length} English texts.`);
}
