/**
 * Periodic manual accessibility tests (ROADMAP: "Test manuali periodici";
 * WCAG 2.2 AA).
 *
 * Automated checks already catch a great deal — axe on every view, keyboard
 * walk-throughs, the heading outline and the mobile (Pixel 7) project in
 * `e2e/app.spec.ts` — but three things only a person can confirm: how a real
 * screen reader announces the app (NVDA, VoiceOver), whether the layout still
 * works when the browser is zoomed to 200%, and whether touch targets and
 * reflow hold on a real phone.
 *
 * This module is the single source of truth for the checklist and the cadence.
 * The step-by-step procedure, the pass criteria and the results log live in
 * `docs/accessibility-manual-tests.md`. The monthly maintenance report
 * (`scripts/maintenance-report.ts`) flags the round as overdue once it is older
 * than MANUAL_A11Y_MAX_AGE_DAYS, so nobody has to remember it.
 *
 * After running a manual session, record the date here
 * (MANUAL_A11Y_CHECKED_ON) and append the outcome to the log in the document.
 */

/** Date of the last full manual accessibility pass (ISO 8601, UTC). */
export const MANUAL_A11Y_CHECKED_ON = "2026-10-05";

/**
 * A manual pass is due again after this many days — in practice before every
 * release, or at least twice a year. Matches the sources cadence in
 * `src/contentReview.ts` so both surface together in the maintenance issue.
 */
export const MANUAL_A11Y_MAX_AGE_DAYS = 180;

export interface ManualAccessibilityCheck {
  /** Stable id, also the slug of the check's section in the document. */
  readonly id: string;
  /** What is exercised, in Italian and English (kept in parity by the test). */
  readonly it: string;
  readonly en: string;
  /** The WCAG 2.2 success criteria the check mainly covers. */
  readonly wcag: readonly string[];
}

/** The four manual checks, in the order they appear in the document. */
export const MANUAL_A11Y_CHECKS: readonly ManualAccessibilityCheck[] = [
  {
    id: "nvda",
    it: "Lettore di schermo NVDA (Windows, con Firefox e Chrome)",
    en: "NVDA screen reader (Windows, with Firefox and Chrome)",
    wcag: ["1.3.1", "2.4.3", "4.1.2", "4.1.3"],
  },
  {
    id: "voiceover",
    it: "Lettore di schermo VoiceOver (macOS con Safari e iOS)",
    en: "VoiceOver screen reader (macOS with Safari and iOS)",
    wcag: ["1.3.1", "2.4.3", "4.1.2"],
  },
  {
    id: "zoom-200",
    it: "Zoom del browser al 200% (e reflow al 400%)",
    en: "Browser zoom at 200% (and reflow at 400%)",
    wcag: ["1.4.4", "1.4.10"],
  },
  {
    id: "mobile-viewport",
    it: "Viewport mobile e tocco su un dispositivo reale",
    en: "Mobile viewport and touch on a real device",
    wcag: ["1.4.10", "2.5.8"],
  },
] as const;
