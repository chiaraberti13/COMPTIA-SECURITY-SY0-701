import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { basename } from "node:path";
import { describe, expect, it } from "vitest";
import * as data from "../src/data";
import { getDomainQuestions, questionUid, sourceQuestionId } from "../src/localizedData";
import type { Question, TopicGroup } from "../src/types";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { CERTIFICATE_REVOCATION_TOPICS_IT } from "../src/certificateRevocationTopics";
import { EAP_METHOD_TOPICS } from "../src/eapMethodTopics";

/**
 * Naming conventions and stable identifiers (ROADMAP: "Stabilire convenzioni
 * di naming"). The rules are written in CONTRIBUTING.md.
 *
 * Identifiers are the keys of what learners save in their browser: progress
 * and reviews by namespaced question id, the checklist and bookmarks by
 * checklistKey. Renaming or deleting one silently drops that learner's data,
 * so tests/fixtures/stable-ids.json records every identifier ever published
 * and this test refuses to lose one. A content that is out of date is marked
 * deprecated, not removed.
 *
 * After adding questions, concepts or labs, record the new identifiers with:
 *   UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts
 */

const DOMAINS = [1, 2, 3, 4, 5];
const FIXTURE = "tests/fixtures/stable-ids.json";

interface StableIds {
  questions: number[];
  concepts: string[];
  objectives: string[];
  labs: string[];
}

/** The whole dataset, deprecated content included: its ids must stay too. */
const sourceQuestions = (d: number) => (data as unknown as Record<string, Question[]>)[`DOMAIN_${d}_QUESTIONS`];
const sourceTopics = (d: number) => (data as unknown as Record<string, TopicGroup[]>)[`DOMAIN_${d}_TOPICS`];

function currentIds(): StableIds {
  return {
    questions: DOMAINS.flatMap((d) => sourceQuestions(d).map((q) => questionUid(d, q.id))).sort((a, b) => a - b),
    concepts: [
      ...DOMAINS.flatMap((d) => sourceTopics(d).flatMap((g) => g.subtopics.map((s) => s.checklistKey))),
      ...CERTIFICATE_REVOCATION_TOPICS_IT.flatMap((g) => g.subtopics.map((s) => s.checklistKey)),
      ...EAP_METHOD_TOPICS.it.subtopics.map((s) => s.checklistKey),
    ].sort(),
    objectives: [...ALL_OBJECTIVES],
    labs: readdirSync("labs", { withFileTypes: true }).filter((e) => e.isDirectory() && /^\d{2}-/.test(e.name)).map((e) => e.name).sort(),
  };
}

const files = (dir: string, ext: RegExp) =>
  existsSync(dir) ? readdirSync(dir).filter((f) => ext.test(f)) : [];

describe("repository layout", () => {
  it("keeps the community and governance files of the reference structure", () => {
    const required = [
      "README.md", "README.it.md", "LICENSE", "CHANGELOG.md", "CONTRIBUTING.md", "CODE_OF_CONDUCT.md",
      "SECURITY.md", "ROADMAP.md", ".github/CODEOWNERS", ".github/pull_request_template.md",
      ".github/dependabot.yml", ".github/ISSUE_TEMPLATE", "docs/adr", "docs/threat-model.md",
      "docs/coverage-matrix.md", "docs/framework-mapping.md", "docs/content-templates.md", "docs/style-guide.md", "docs/gap-analysis.md", "docs/quality-baseline.md", "labs/TEMPLATE.md",
    ];
    expect(required.filter((p) => !existsSync(p))).toEqual([]);
  });
});

describe("naming conventions", () => {
  it("names documents in kebab-case, ADRs with their number", () => {
    const docs = files("docs", /\.md$/).map((f) => basename(f, ".md"));
    for (const name of docs) expect(name, name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    const adrs = files("docs/adr", /\.md$/).filter((f) => f !== "README.md");
    for (const name of adrs) expect(name, name).toMatch(/^\d{4}-[a-z0-9]+(-[a-z0-9]+)*\.md$/);
  });

  it("names React components in PascalCase and hooks as useSomething", () => {
    for (const f of files("src/components", /\.tsx$/)) expect(f, f).toMatch(/^[A-Z][A-Za-z0-9]*\.tsx$/);
    for (const f of files("src/hooks", /\.tsx?$/)) expect(f, f).toMatch(/^use[A-Z][A-Za-z0-9]*\.tsx?$/);
  });

  it("names modules in camelCase and scripts in kebab-case", () => {
    for (const f of files("src", /\.tsx?$/).filter((f) => f !== "App.tsx")) {
      expect(f, f).toMatch(/^[a-z][A-Za-z0-9]*(\.en)?\.tsx?$/);
    }
    for (const f of [...files("server", /\.ts$/), ...files("tests", /\.test\.tsx?$/).filter((f) => !/^use|^[A-Z]/.test(f))]) {
      expect(f, f).toMatch(/^[a-z][A-Za-z0-9]*(\.test)?\.tsx?$/);
    }
    for (const f of files("scripts", /\.ts$/)) expect(f, f).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.ts$/);
  });
});

describe("stable identifiers", () => {
  const current = currentIds();

  it("keeps question ids within their domain's namespace", () => {
    for (const d of DOMAINS) {
      for (const q of getDomainQuestions(d, "it")) {
        expect(Math.floor(q.id / 10000), `D${d}#${q.id}`).toBe(d);
        expect(sourceQuestionId(q.id), `D${d}#${q.id}`).toBeGreaterThan(0);
      }
    }
  });

  if (process.env.UPDATE_STABLE_IDS) {
    it("records the identifiers in use", () => {
      let recorded: StableIds;
      try {
        recorded = JSON.parse(readFileSync(FIXTURE, "utf8"));
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        recorded = { questions: [], concepts: [], objectives: [], labs: [] };
      }
      // Only ever adds: an identifier that disappeared stays recorded, so the
      // next run without UPDATE_STABLE_IDS still reports it.
      const merged: StableIds = {
        questions: [...new Set([...recorded.questions, ...current.questions])].sort((a, b) => a - b),
        concepts: [...new Set([...recorded.concepts, ...current.concepts])].sort(),
        objectives: [...new Set([...recorded.objectives, ...current.objectives])],
        labs: [...new Set([...recorded.labs, ...current.labs])].sort(),
      };
      writeFileSync(FIXTURE, JSON.stringify(merged, null, 2) + "\n");
    });
    return;
  }

  const recorded: StableIds = JSON.parse(readFileSync(FIXTURE, "utf8"));

  it("never loses an identifier a learner's saved data may point to", () => {
    const lost = {
      questions: recorded.questions.filter((id) => !current.questions.includes(id)),
      concepts: recorded.concepts.filter((key) => !current.concepts.includes(key)),
      objectives: recorded.objectives.filter((code) => !current.objectives.includes(code)),
      labs: recorded.labs.filter((lab) => !current.labs.includes(lab)),
    };
    expect(lost, "mark outdated content as deprecated instead of removing or renaming it").toEqual({ questions: [], concepts: [], objectives: [], labs: [] });
  });

  it("has every identifier in use recorded (UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts)", () => {
    const unrecorded = {
      questions: current.questions.filter((id) => !recorded.questions.includes(id)),
      concepts: current.concepts.filter((key) => !recorded.concepts.includes(key)),
      objectives: current.objectives.filter((code) => !recorded.objectives.includes(code)),
      labs: current.labs.filter((lab) => !recorded.labs.includes(lab)),
    };
    expect(unrecorded).toEqual({ questions: [], concepts: [], objectives: [], labs: [] });
  });
});
