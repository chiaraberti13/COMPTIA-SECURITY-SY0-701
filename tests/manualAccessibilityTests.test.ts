import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  MANUAL_A11Y_CHECKED_ON,
  MANUAL_A11Y_CHECKS,
  MANUAL_A11Y_MAX_AGE_DAYS,
  type ManualAccessibilityCheck,
} from "../src/manualAccessibilityTests";

/**
 * Periodic manual accessibility tests (ROADMAP: "Test manuali periodici").
 *
 * The checklist and the cadence live in src/manualAccessibilityTests.ts, the
 * step-by-step procedure and the results log in docs/accessibility-manual-tests.md.
 * This test keeps the two in sync: every check has an Italian and an English
 * label and a WCAG reference, the date is a real past date, and the document
 * documents each check and the next due date.
 */

const DOC = "docs/accessibility-manual-tests.md";
const doc = readFileSync(DOC, "utf8");
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const nextCheck = new Date(Date.parse(MANUAL_A11Y_CHECKED_ON) + MANUAL_A11Y_MAX_AGE_DAYS * 86_400_000)
  .toISOString()
  .slice(0, 10);

describe("manual accessibility checklist (src)", () => {
  it("records a real, past review date and a positive cadence", () => {
    expect(MANUAL_A11Y_CHECKED_ON).toMatch(ISO_DATE);
    expect(Number.isNaN(Date.parse(MANUAL_A11Y_CHECKED_ON))).toBe(false);
    expect(Date.parse(MANUAL_A11Y_CHECKED_ON)).toBeLessThanOrEqual(Date.now());
    expect(MANUAL_A11Y_MAX_AGE_DAYS).toBeGreaterThan(0);
  });

  it("covers screen readers, 200% zoom and the mobile viewport, with unique ids", () => {
    expect(MANUAL_A11Y_CHECKS.map((c) => c.id)).toEqual(["nvda", "voiceover", "zoom-200", "mobile-viewport"]);
    expect(new Set(MANUAL_A11Y_CHECKS.map((c) => c.id)).size).toBe(MANUAL_A11Y_CHECKS.length);
  });

  it("gives every check an Italian and an English label and valid WCAG criteria", () => {
    for (const check of MANUAL_A11Y_CHECKS) {
      const labelled = check as ManualAccessibilityCheck;
      expect(labelled.it.trim().length, labelled.id).toBeGreaterThan(0);
      expect(labelled.en.trim().length, labelled.id).toBeGreaterThan(0);
      expect(labelled.it, labelled.id).not.toBe(labelled.en);
      expect(labelled.wcag.length, labelled.id).toBeGreaterThan(0);
      for (const sc of labelled.wcag) expect(sc, `${labelled.id} ${sc}`).toMatch(/^\d+\.\d+\.\d+$/);
    }
  });
});

describe("manual accessibility procedure (doc)", () => {
  it("states the owner, the last review and the next check derived from the cadence", () => {
    expect(doc).toContain("**Responsabile:**");
    expect(doc).toContain(`**Ultima revisione:** ${MANUAL_A11Y_CHECKED_ON}`);
    expect(doc).toContain(nextCheck);
    expect(doc).toContain(String(MANUAL_A11Y_MAX_AGE_DAYS));
    expect(doc).toContain("src/manualAccessibilityTests.ts");
  });

  it("has an English summary and names each manual check", () => {
    expect(doc).toContain("English summary");
    expect(doc).toMatch(/NVDA/);
    expect(doc).toMatch(/VoiceOver/);
    expect(doc).toMatch(/200%/);
    expect(doc).toMatch(/[Vv]iewport mobile/);
  });

  it("records the current pass in the results log", () => {
    expect(doc).toContain("## Registro degli esiti");
    expect(doc).toContain(`| ${MANUAL_A11Y_CHECKED_ON} |`);
  });
});
