import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * The terminology of docs/style-guide.md (ROADMAP: "Style guide"). The rules
 * live in the document's tables, read here, so there is one place to change
 * them:
 *
 * - "Terminologia": the terms of the SY0-701 objectives. An older term (mantrap,
 *   whitelist…) may appear only near the current one ("access control
 *   vestibule (the older *mantrap*)"), to help learners who meet it at work.
 * - "Ortografia inglese": the English study content uses American spelling,
 *   as the CompTIA objectives do.
 */

const GUIDE = readFileSync("docs/style-guide.md", "utf8");
/** How far, in characters, the current term may be from the older one it explains. */
const NEAR = 300;

/** The rows of the first table under a "## heading", cells split on unescaped pipes. */
function table(heading: string): string[][] {
  const section = GUIDE.split(/^## /m).find((s) => s.startsWith(heading));
  if (!section) throw new Error(`docs/style-guide.md has no "## ${heading}" section`);
  return section
    .split("\n")
    .filter((line) => line.startsWith("|"))
    .slice(2)
    .map((line) =>
      line
        .slice(1, -1)
        .split(/(?<!\\)\|/)
        .map((cell) => cell.trim().replace(/\\\|/g, "|"))
    );
}

/** The regular expression written between backticks in a cell, or none for "—". */
const pattern = (cell: string) => {
  const source = /^`(.+)`$/.exec(cell)?.[1];
  return source ? new RegExp(source, "gi") : null;
};

const read = (file: string) => readFileSync(file, "utf8");
/** The part of a file between two markers: where a mixed file keeps its English text. */
const between = (file: string, start: string, end: string) => {
  const text = read(file);
  return text.slice(text.indexOf(start), text.indexOf(end));
};

const ITALIAN = { "src/data.ts": read("src/data.ts"), "src/domainGuides.ts": between("src/domainGuides.ts", "const IT_DOMAIN_GUIDES", "const EN_DOMAIN_GUIDES"), "src/i18n.tsx": between("src/i18n.tsx", "const it = {", "const en: Record<UIKey"), "src/studyPaths.ts": between("src/studyPaths.ts", "const IT: StudyPath[]", "const EN: StudyPath[]") };
const ENGLISH = { "src/data.en.ts": read("src/data.en.ts"), "src/domainGuides.ts (EN)": between("src/domainGuides.ts", "const EN_DOMAIN_GUIDES", "export const OFFICIAL_DOMAIN_WEIGHTS"), "src/i18n.tsx (EN)": between("src/i18n.tsx", "const en: Record<UIKey", "export const UI:"), "src/studyPaths.ts (EN)": between("src/studyPaths.ts", "const EN: StudyPath[]", "export const STUDY_PATHS") };
const CONTENT = { ...ITALIAN, ...ENGLISH };

describe("style guide", () => {
  it("has its tables in place, each cell a valid rule", () => {
    const terms = table("Terminologia");
    const spelling = table("Ortografia inglese");
    expect(terms.length).toBeGreaterThanOrEqual(4);
    expect(spelling.length).toBeGreaterThanOrEqual(5);
    for (const [, avoid] of [...terms, ...spelling]) expect(pattern(avoid), avoid).not.toBeNull();
    // Every mixed file was split where expected: an empty region would pass anything.
    for (const [file, text] of Object.entries(CONTENT)) expect(text.length, file).toBeGreaterThan(1000);
  });

  it("uses the terms of the SY0-701 objectives; older terms only next to them", () => {
    const misuses: string[] = [];
    for (const [preferred, avoid, near] of table("Terminologia")) {
      const allowedNear = pattern(near);
      for (const [file, text] of Object.entries(CONTENT)) {
        for (const m of text.matchAll(pattern(avoid)!)) {
          const around = text.slice(Math.max(0, m.index - NEAR), m.index + m[0].length + NEAR);
          if (allowedNear && new RegExp(allowedNear.source, "i").test(around)) continue;
          misuses.push(`${file}: "${m[0]}" (use: ${preferred})`);
        }
      }
    }
    expect(misuses).toEqual([]);
  });

  it("spells the English study content the American way, as the CompTIA objectives do", () => {
    const british: string[] = [];
    for (const [preferred, avoid] of table("Ortografia inglese")) {
      for (const [file, text] of Object.entries(ENGLISH)) {
        for (const m of text.matchAll(pattern(avoid)!)) british.push(`${file}: "${m[0]}" (use: ${preferred})`);
      }
    }
    expect(british).toEqual([]);
  });

  it("recognises what it should, and nothing else", () => {
    const spelling = table("Ortografia inglese").map(([, avoid]) => pattern(avoid)!);
    const flagged = (word: string) => spelling.some((re) => new RegExp(re.source, "i").test(word));
    for (const word of ["organisation", "recognised", "behaviour", "defence", "catalogued", "labelled", "analyse"]) expect(flagged(word), word).toBe(true);
    for (const word of ["organization", "promise", "enterprise", "exercise", "compromise", "otherwise", "analysis", "analyses", "channel"]) {
      expect(flagged(word), word).toBe(false);
    }
  });
});
