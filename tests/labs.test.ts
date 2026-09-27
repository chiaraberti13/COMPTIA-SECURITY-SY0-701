import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

/**
 * Keeps every lab in labs/ on the shared template (labs/TEMPLATE.md) and within
 * the rules of engagement of labs/README.md: official objectives, a declared
 * risk level, the same sections in both languages, and commands that only ever
 * reach the learner's own machine.
 */

const LABS_DIR = "labs";
const RISK_LEVELS = ["low", "moderate", "advanced-controlled"];

const SECTIONS = {
  it: ["Scenario", "Prerequisiti", "Topologia", "Setup", "Esercizio", "Evidenze", "Cleanup", "Domande finali"],
  en: ["Scenario", "Prerequisites", "Topology", "Setup", "Exercise", "Evidence", "Cleanup", "Final questions"],
};
const FIELDS = {
  it: { objectives: "Obiettivi SY0-701", risk: "Rischio", duration: "Durata" },
  en: { objectives: "SY0-701 objectives", risk: "Risk", duration: "Duration" },
};
const FILES = { it: "README.md", en: "README.en.md" } as const;
type Lang = keyof typeof FILES;

const labs = readdirSync(LABS_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const read = (lab: string, lang: Lang) => readFileSync(join(LABS_DIR, lab, FILES[lang]), "utf8");

/** Value of a row of the metadata table at the top of a lab. */
function field(text: string, name: string): string | undefined {
  const row = text.split("\n").find((line) => line.startsWith(`| ${name} |`));
  return row?.split("|")[2]?.trim();
}

/** Hosts of the URLs inside the fenced code blocks of a text. */
function commandHosts(text: string): string[] {
  const blocks = [...text.matchAll(/```[a-z]*\n([\s\S]*?)```/g)].map((m) => m[1]);
  return blocks.flatMap((block) => [...block.matchAll(/https?:\/\/([^/:\s'"]+)/g)].map((m) => m[1]));
}

describe("labs", () => {
  it("each live in a folder named NN-short-name, in Italian and English", () => {
    expect(labs.length).toBeGreaterThan(0);
    for (const lab of labs) {
      expect(lab).toMatch(/^\d{2}-[a-z0-9]+(-[a-z0-9]+)*$/);
      for (const lang of Object.keys(FILES) as Lang[]) {
        expect(existsSync(join(LABS_DIR, lab, FILES[lang])), `${lab}/${FILES[lang]}`).toBe(true);
      }
    }
  });

  it("declare official objectives, a known risk level and a duration, the same in both languages", () => {
    for (const lab of labs) {
      const values = (Object.keys(FILES) as Lang[]).map((lang) => {
        const text = read(lab, lang);
        const objectives = field(text, FIELDS[lang].objectives)?.split(/,\s*/) ?? [];
        const risk = field(text, FIELDS[lang].risk)?.replace(/`/g, "");
        const duration = field(text, FIELDS[lang].duration);
        expect(objectives.length, `${lab} ${lang}: objectives`).toBeGreaterThan(0);
        for (const code of objectives) expect(ALL_OBJECTIVES, `${lab} ${lang}: ${code}`).toContain(code);
        expect(RISK_LEVELS, `${lab} ${lang}: risk`).toContain(risk);
        expect(duration, `${lab} ${lang}: duration`).toMatch(/^\d+ /);
        return { objectives, risk, minutes: duration?.split(" ")[0] };
      });
      expect(values[1], lab).toEqual(values[0]);
    }
  });

  it("follow the template's sections, in order", () => {
    for (const lab of labs) {
      for (const lang of Object.keys(FILES) as Lang[]) {
        const headings = [...read(lab, lang).matchAll(/^## (.+)$/gm)].map((m) => m[1]);
        expect(headings, `${lab}/${FILES[lang]}`).toEqual(SECTIONS[lang]);
      }
    }
  });

  it("never point a command at a host other than the learner's own machine", () => {
    for (const lab of labs) {
      for (const lang of Object.keys(FILES) as Lang[]) {
        const foreign = commandHosts(read(lab, lang)).filter((host) => host !== "127.0.0.1" && host !== "localhost");
        expect(foreign, `${lab}/${FILES[lang]}`).toEqual([]);
      }
    }
  });

  it("warn before sensitive steps whenever the risk is above low", () => {
    for (const lab of labs) {
      for (const lang of Object.keys(FILES) as Lang[]) {
        const text = read(lab, lang);
        if (field(text, FIELDS[lang].risk)?.replace(/`/g, "") === "low") continue;
        expect(text, `${lab}/${FILES[lang]}`).toMatch(/^> ⚠️/m);
      }
    }
  });

  it("are all listed in labs/README.md, in both languages", () => {
    const index = readFileSync(join(LABS_DIR, "README.md"), "utf8");
    for (const lab of labs) {
      expect(index, lab).toContain(`](${lab}/README.md)`);
      expect(index, lab).toContain(`](${lab}/README.en.md)`);
    }
  });
});
