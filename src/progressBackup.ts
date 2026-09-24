/**
 * Export, import and sanitising of the study progress kept in the browser.
 *
 * Everything the app remembers lives in localStorage and never reaches the
 * server. A backup file lets the learner move it to another browser or keep a
 * copy; the same sanitisers guard both the import and the everyday reads,
 * because a file (or a tampered localStorage entry) is untrusted input.
 */
import { sanitizeQuestionProgress, sanitizeQuizHistory } from "./quiz";
import type { QuestionProgress, QuizResult } from "./types";

export const BACKUP_APP_ID = "comptia-security-sy0-701";
/** Bump when the shape of `data` changes, and teach parseBackup the old one. */
export const BACKUP_SCHEMA_VERSION = 1;
/** A real backup is a few hundred kB at most; anything larger is rejected unread. */
export const MAX_BACKUP_BYTES = 1_000_000;

const MAX_BOOKMARKS = 2_000;
const MAX_CHECKLIST_ITEMS = 5_000;
/** Checklist keys and glossary ids are short identifiers such as "WPA3EnterpriseRes". */
const IDENTIFIER = /^[A-Za-z0-9_.:-]{1,120}$/;

export interface ProgressData {
  checklist: Record<string, true>;
  bookmarks: string[];
  quizHistory: QuizResult[];
  questionProgress: Record<number, QuestionProgress>;
}

export interface ProgressBackup {
  app: typeof BACKUP_APP_ID;
  schema: number;
  exportedAt: string;
  data: ProgressData;
}

export type ParseResult =
  | { ok: true; data: ProgressData; exportedAt: string }
  | { ok: false; error: "too-large" | "invalid-json" | "wrong-app" | "unsupported-schema" };

/** Keeps only completed items with a well-formed key. */
export function sanitizeChecklist(value: unknown): Record<string, true> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const safe: Record<string, true> = {};
  for (const [key, done] of Object.entries(value).slice(0, MAX_CHECKLIST_ITEMS)) {
    if (done === true && IDENTIFIER.test(key)) safe[key] = true;
  }
  return safe;
}

/** Keeps unique, well-formed bookmark ids. */
export function sanitizeBookmarks(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  const ids = value.filter((id): id is string => typeof id === "string" && IDENTIFIER.test(id));
  return [...new Set(ids)].slice(0, MAX_BOOKMARKS);
}

export function sanitizeProgress(raw: Partial<Record<keyof ProgressData, unknown>>): ProgressData {
  return {
    checklist: sanitizeChecklist(raw.checklist),
    bookmarks: sanitizeBookmarks(raw.bookmarks),
    quizHistory: sanitizeQuizHistory(raw.quizHistory),
    questionProgress: sanitizeQuestionProgress(raw.questionProgress),
  };
}

export function buildBackup(data: ProgressData, now: Date = new Date()): string {
  const backup: ProgressBackup = {
    app: BACKUP_APP_ID,
    schema: BACKUP_SCHEMA_VERSION,
    exportedAt: now.toISOString(),
    data: sanitizeProgress(data),
  };
  return JSON.stringify(backup, null, 2);
}

/** Reads a backup file's text. Every field is sanitised; nothing is trusted. */
export function parseBackup(text: string): ParseResult {
  if (new Blob([text]).size > MAX_BACKUP_BYTES) return { ok: false, error: "too-large" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, error: "invalid-json" };
  }
  if (!parsed || typeof parsed !== "object") return { ok: false, error: "invalid-json" };
  const backup = parsed as Partial<ProgressBackup>;
  if (backup.app !== BACKUP_APP_ID) return { ok: false, error: "wrong-app" };
  if (backup.schema !== BACKUP_SCHEMA_VERSION) return { ok: false, error: "unsupported-schema" };
  const data = backup.data && typeof backup.data === "object" ? backup.data : {};
  return {
    ok: true,
    data: sanitizeProgress(data),
    exportedAt: typeof backup.exportedAt === "string" ? backup.exportedAt.slice(0, 40) : "",
  };
}

/** A file name such as "security-plus-progress-2026-09-24.json". */
export function backupFileName(now: Date = new Date()): string {
  return `security-plus-progress-${now.toISOString().slice(0, 10)}.json`;
}
