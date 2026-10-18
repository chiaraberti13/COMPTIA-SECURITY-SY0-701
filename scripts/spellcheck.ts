/**
 * Extracts study text by language and checks it with cspell.
 * Italian uses the validated project vocabulary (MIT), without GPL dictionaries.
 * Unknown words are reported with their content identifier. No vocabulary is
 * automatically accepted or added; see docs/italian-spelling.md.
 */
import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { DOMAIN_GUIDES_EN, DOMAIN_GUIDES_IT } from "../src/domainGuides";
import { UI } from "../src/i18n";
import { getAllTopics, getDomainQuestions, loadEnglishOverlay } from "../src/localizedData";
import { STUDY_PATHS } from "../src/studyPaths";
import { getPbqScenarios } from "../src/localizedPbq";

export const SPELLCHECK_FILE = path.join(".spellcheck", "content-en.txt");

/** Every string inside a value, however deeply nested. */
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

/** Study texts as [identifier, text] pairs, without internal identifiers. */
export async function contentUnits(language: "it" | "en"): Promise<[string, string][]> {
  if (language === "en") await loadEnglishOverlay();
  const units: [string, string][] = [];
  for (const d of [1, 2, 3, 4, 5]) {
    for (const group of getAllTopics(language)[d]) {
      units.push([`group ${d}:${group.title}`, `${group.title} ${group.description}`]);
      for (const s of group.subtopics) units.push([`concept ${d}:${s.checklistKey}`, strings([s.name, s.definition, s.details, s.examTip, s.keyFormulas, s.comparativeTable]).join(" ")]);
    }
    for (const q of getDomainQuestions(d, language)) units.push([`question ${q.id}`, strings([q.topic, q.scenario, q.question, q.options, q.explanation]).join(" ")]);
    for (const [field, value] of Object.entries((language === "en" ? DOMAIN_GUIDES_EN : DOMAIN_GUIDES_IT)[d])) units.push([`guide ${d}:${field}`, strings(value).join(" ")]);
  }
  for (const [key, text] of Object.entries(UI[language])) units.push([`ui ${key}`, text]);
  STUDY_PATHS[language].forEach((p) => units.push([`path ${p.id}`, strings(p).join(" ")]));
  for (const pbq of getPbqScenarios(language)) {
    const parts = [pbq.title, pbq.scenario, pbq.prompt, pbq.explanation];
    if (pbq.mechanic === "ordering") parts.push(...pbq.steps.map((s) => s.text));
    else parts.push(...pbq.prompts.map((x) => x.text), ...pbq.options.map((o) => o.text));
    units.push([`pbq ${pbq.id}`, strings(parts).join(" ")]);
  }
  return units.map(([id, text]) => [id.replace(/\s+/g, "_"), text.replace(/\s+/g, " ")]);
}

export const englishUnits = () => contentUnits("en");

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  for (const language of ["it", "en"] as const) {
    const units = await contentUnits(language);
    const file = path.join(".spellcheck", `content-${language}.txt`);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, units.map(([id, text]) => `${id}\t${text}`).join("\n") + "\n");
    const run = spawnSync("npx", ["cspell", "lint", "--no-progress", "--no-summary", "--config", language === "it" ? "cspell.it.json" : "cspell.json", file], { encoding: "utf8" });
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
    console.log(`Spell check passed: ${units.length} ${language} texts.`);
  }
}
