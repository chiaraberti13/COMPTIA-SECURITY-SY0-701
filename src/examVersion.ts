/**
 * Single source of truth for the certification this project trains.
 *
 * Every other place that names the exam (the header, the package name, the
 * objective codes, the docs) is downstream of this declaration. When CompTIA
 * announces a successor to SY0-701, the migration starts here: update
 * `CURRENT_EXAM`, declare the `SUCCESSOR`, and `tests/examVersion.test.ts`
 * then forces the rest of the repository back into agreement.
 *
 * The migration strategy itself lives in docs/exam-update-migration.md
 * (ROADMAP: "Release per aggiornamenti d'esame"); `MIGRATION_STEPS` are the
 * ordered, test-enforced steps that document must keep covering.
 */
import { OFFICIAL_OBJECTIVES } from "./questionObjectives";
import { OFFICIAL_DOMAIN_WEIGHTS } from "./domainGuides";

/** Lifecycle of an exam version in this repository. */
export type ExamStatus =
  /** The exam the app currently trains; its objectives are the source of truth. */
  | "active"
  /** Announced successor whose content is being built behind the active one. */
  | "preparing"
  /** Replaced by a successor but kept available during the overlap window. */
  | "deprecated"
  /** Retired by CompTIA; kept only for learners mid-transition, never promoted. */
  | "retired";

/** A certification version and how this repository treats it. */
export interface ExamVersion {
  /** Certification family, e.g. "CompTIA Security+". */
  readonly family: string;
  /** Official exam code, e.g. "SY0-701". */
  readonly code: string;
  /** Lifecycle stage in this repository. */
  readonly status: ExamStatus;
  /**
   * Number of official domains. Must equal the domains declared in
   * `OFFICIAL_OBJECTIVES` and the weights in `OFFICIAL_DOMAIN_WEIGHTS`; the
   * test enforces this so the identity and the content cannot drift apart.
   */
  readonly domainCount: number;
  /**
   * Date CompTIA retires the exam (ISO `YYYY-MM-DD`), or `null` while no
   * retirement has been announced. Drives the overlap window in the strategy.
   */
  readonly retiresOn: string | null;
  /** Code of the announced successor, or `null` while none exists. */
  readonly successorCode: string | null;
}

/** The exam the project currently trains. */
export const CURRENT_EXAM: ExamVersion = {
  family: "CompTIA Security+",
  code: "SY0-701",
  status: "active",
  domainCount: Object.keys(OFFICIAL_OBJECTIVES).length,
  retiresOn: null,
  successorCode: null,
};

/**
 * The announced successor, once CompTIA publishes one. It stays `null` until
 * then: the strategy in docs/exam-update-migration.md explains how to fill it
 * in and run the migration. No successor to SY0-701 is published as of the
 * review date in that document.
 */
export const SUCCESSOR: ExamVersion | null = null;

/**
 * Ordered migration steps. Each id must be documented, in both languages, in
 * docs/exam-update-migration.md; the test checks every id appears there, so a
 * step can never be quietly dropped from the playbook.
 */
export const MIGRATION_STEPS = [
  "watch", // Track CompTIA's announcement and the overlap window.
  "inventory", // Locate every place the exam identity lives (this file is the root).
  "map-objectives", // Map old objective codes to new ones; mark dropped ones deprecated.
  "content", // Add, revise or deprecate questions, guides and examples per the new blueprint.
  "translate", // Keep the Italian source and English overlay in parity.
  "compatibility", // Preserve saved-progress IDs; deprecate, never delete, retired content.
  "release", // Ship as a major version with a dual-maintenance overlap window.
] as const;

export type MigrationStep = (typeof MIGRATION_STEPS)[number];

/**
 * Convenience re-export so callers and tests can assert the identity and the
 * content agree without importing from several modules.
 */
export const EXAM_DOMAIN_WEIGHTS = OFFICIAL_DOMAIN_WEIGHTS;
