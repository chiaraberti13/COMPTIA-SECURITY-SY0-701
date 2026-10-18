import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  CURRENT_EXAM,
  EXAM_DOMAIN_WEIGHTS,
  MIGRATION_STEPS,
  SUCCESSOR,
} from "../src/examVersion";
import { OFFICIAL_OBJECTIVES } from "../src/questionObjectives";

/**
 * Keeps the single source of truth for the certification identity
 * (src/examVersion.ts) consistent with the rest of the repository, and keeps
 * the migration strategy (docs/exam-update-migration.md) in step with the
 * declared steps. ROADMAP: "Release per aggiornamenti d'esame".
 */
const DOC = "docs/exam-update-migration.md";
const doc = readFileSync(DOC, "utf8");
const header = readFileSync("src/components/AppHeader.tsx", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8")) as { name: string };

describe("exam version source of truth", () => {
  it("declares a well-formed CompTIA exam code", () => {
    expect(CURRENT_EXAM.family).toContain("CompTIA");
    // e.g. SY0-701: two letters, a digit, a hyphen and three digits.
    expect(CURRENT_EXAM.code).toMatch(/^[A-Z]{2}\d-\d{3}$/);
  });

  it("agrees with the objectives and domain weights on the domain count", () => {
    const fromObjectives = Object.keys(OFFICIAL_OBJECTIVES).length;
    expect(CURRENT_EXAM.domainCount).toBe(fromObjectives);
    expect(EXAM_DOMAIN_WEIGHTS.length).toBe(fromObjectives);
  });

  it("keeps the declared status consistent with the successor fields", () => {
    if (SUCCESSOR === null) {
      expect(CURRENT_EXAM.successorCode).toBeNull();
    } else {
      expect(CURRENT_EXAM.successorCode).toBe(SUCCESSOR.code);
    }
    if (CURRENT_EXAM.status === "active") {
      expect(CURRENT_EXAM.successorCode).toBeNull();
      expect(CURRENT_EXAM.retiresOn).toBeNull();
    }
  });

  it("matches the exam code shown in the UI header and the package name", () => {
    expect(header).toContain(CURRENT_EXAM.code);
    // Package name is the kebab-case identity: it carries the exam code.
    expect(pkg.name).toContain(CURRENT_EXAM.code.toLowerCase());
  });

  it("has unique, non-empty migration steps", () => {
    expect(MIGRATION_STEPS.length).toBeGreaterThanOrEqual(5);
    expect(new Set(MIGRATION_STEPS).size).toBe(MIGRATION_STEPS.length);
    for (const step of MIGRATION_STEPS) expect(step).toMatch(/^[a-z][a-z-]*$/);
  });
});

describe("exam-update migration strategy document", () => {
  it("is bilingual and carries review metadata", () => {
    expect(doc).toMatch(/^## Italiano$/m);
    expect(doc).toMatch(/^## English$/m);
    expect(doc).toContain("Responsabile:");
    expect(doc).toContain("Ultima revisione:");
    expect(doc).toContain("Prossimo controllo:");
  });

  it("points back to the source-of-truth module", () => {
    expect(doc).toContain("src/examVersion.ts");
  });

  it("documents every migration step in both languages", () => {
    for (const step of MIGRATION_STEPS) {
      const occurrences = doc.split(`\`${step}\``).length - 1;
      // Once under Italiano, once under English, at least.
      expect(occurrences, step).toBeGreaterThanOrEqual(2);
    }
  });
});
