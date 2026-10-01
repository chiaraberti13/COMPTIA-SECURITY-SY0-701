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

/** Text of a "## heading" section, up to the next one. */
function section(text: string, heading: string): string {
  const lines = `\n${text}`;
  const start = lines.indexOf(`\n## ${heading}\n`);
  if (start < 0) return "";
  const next = lines.indexOf("\n## ", start + heading.length + 4);
  return lines.slice(start, next < 0 ? undefined : next);
}

/** The snapshot restore commands of labs/README.md: VirtualBox, libvirt/KVM, Hyper-V. */
const RESTORE_COMMANDS = ["snapshot \"lab-vm\" restore", "virsh snapshot-revert", "Restore-VMCheckpoint"];

/**
 * What a lab above the low risk level is missing from the isolation rules of
 * labs/README.md ("Isolamento e ripristino"): a snapshot in the Setup; for
 * advanced-controlled also the check that no default route leaves the lab
 * network, and the restore of the snapshot in the Cleanup.
 */
function isolationProblems(text: string, risk: string): string[] {
  if (risk === "low") return [];
  // "Setup" and "Cleanup" are the same words in both templates.
  const setup = section(text, "Setup");
  const cleanup = section(text, "Cleanup");
  const problems: string[] = [];
  if (!/snapshot|Checkpoint-VM/i.test(setup)) problems.push("Setup: no snapshot");
  if (risk === "advanced-controlled") {
    if (!setup.includes("ip route show default")) problems.push("Setup: no check that the default route is gone");
    if (!RESTORE_COMMANDS.some((c) => cleanup.includes(c))) problems.push("Cleanup: snapshot not restored");
  } else if (!/snapshot|ripristin|restore|revert|annull|undo/i.test(cleanup)) {
    problems.push("Cleanup: changes neither restored nor undone");
  }
  return problems;
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

  it("above the low risk level, take a snapshot and isolate the network as labs/README.md prescribes", () => {
    for (const lab of labs) {
      for (const lang of Object.keys(FILES) as Lang[]) {
        const text = read(lab, lang);
        const risk = field(text, FIELDS[lang].risk)?.replace(/`/g, "") ?? "";
        expect(isolationProblems(text, risk), `${lab}/${FILES[lang]}`).toEqual([]);
      }
    }
  });

  it("check isolation the way a real lab would be written", () => {
    const lab = (setup: string, cleanup: string) =>
      `## Setup\n\n${setup}\n\n## Esercizio\n\n...\n\n## Cleanup\n\n${cleanup}\n\n## Domande finali\n`;
    const snapshot = 'VBoxManage snapshot "lab-vm" take "prima-del-lab"';
    const restore = 'VBoxManage snapshot "lab-vm" restore "prima-del-lab"';
    expect(isolationProblems(lab("", ""), "low")).toEqual([]);
    expect(isolationProblems(lab("", restore), "moderate")).toEqual(["Setup: no snapshot"]);
    expect(isolationProblems(lab(snapshot, restore), "moderate")).toEqual([]);
    expect(isolationProblems(lab(snapshot, restore), "advanced-controlled")).toEqual(["Setup: no check that the default route is gone"]);
    expect(isolationProblems(lab(`${snapshot}\nip route show default`, "fatto"), "advanced-controlled")).toEqual(["Cleanup: snapshot not restored"]);
    expect(isolationProblems(lab(`${snapshot}\nip route show default`, restore), "advanced-controlled")).toEqual([]);
  });

  it("have the isolation procedures in labs/README.md for the three hypervisors", () => {
    const index = readFileSync(join(LABS_DIR, "README.md"), "utf8");
    for (const command of ["--nic1 intnet", "virsh net-define", "New-VMSwitch", "ip route show default"]) expect(index).toContain(command);
    for (const command of RESTORE_COMMANDS) expect(index).toContain(command);
  });

  it("ship every data file they use, and version it (CI checks out only what git tracks)", () => {
    const missing: string[] = [];
    for (const lab of labs) {
      for (const lang of Object.keys(FILES) as Lang[]) {
        for (const [path] of read(lab, lang).matchAll(/labs\/[a-z0-9-]+\/data\/[\w.-]+/g)) {
          if (!existsSync(path)) missing.push(`${lab}/${FILES[lang]}: ${path}`);
        }
      }
    }
    expect(missing).toEqual([]);
  });

  it("are all listed in labs/README.md, in both languages", () => {
    const index = readFileSync(join(LABS_DIR, "README.md"), "utf8");
    for (const lab of labs) {
      expect(index, lab).toContain(`](${lab}/README.md)`);
      expect(index, lab).toContain(`](${lab}/README.en.md)`);
    }
  });
});
