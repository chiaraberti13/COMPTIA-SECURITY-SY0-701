/**
 * Thin, always-safe wrapper around localStorage.
 *
 * Access throws in a few real situations — Safari private mode, browsers with
 * site data blocked, a full quota — and a study app must never lose its UI to
 * a storage error, so every read and write is guarded and degrades to memory.
 */

export const STORAGE_KEYS = {
  checklist: "comptia_sy0701_checklist",
  bookmarks: "comptia_glossary_bookmarks",
  quizHistory: "comptia_sy0701_quiz_history",
  questionProgress: "comptia_sy0701_question_progress_v1",
  lang: "comptia_sy0701_lang",
  /** Format version of everything above, see migrateStorage(). */
  schema: "comptia_sy0701_schema",
} as const;

/** Reads and parses a JSON value, returning `fallback` on any failure. */
export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    return (parsed ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/** Serialises and stores a value. Returns false if storage was unavailable. */
export function writeJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Removes a key, ignoring storage errors. */
export function removeKey(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/** Version of the format of the data this app keeps in localStorage. */
export const STORAGE_SCHEMA_VERSION = 1;

/** Upgrades the stored data from version `n` (its key) to `n + 1`. */
export type StorageMigration = () => void;

/**
 * Steps that upgrade data saved by older versions of the app. To change a
 * stored format: bump STORAGE_SCHEMA_VERSION, add the step from the previous
 * version here and a test for it in tests/storage.test.ts. For example:
 *
 *   1: () => {
 *     const old = readJSON<Record<string, boolean>>(STORAGE_KEYS.checklist, {});
 *     writeJSON(STORAGE_KEYS.checklist, { version: 2, items: old });
 *   },
 */
export const STORAGE_MIGRATIONS: Record<number, StorageMigration> = {};

export type MigrationOutcome = "current" | "migrated" | "newer" | "failed";

/**
 * Brings the saved data up to STORAGE_SCHEMA_VERSION, once, at start-up.
 *
 * Data saved before versioning existed is version 1, the format this function
 * was introduced with. Each step is recorded as soon as it succeeds, so a
 * failure half way is resumed from the right place next time instead of being
 * applied twice. Data written by a newer app (after a rollback, for example)
 * is left untouched: the readers sanitise what they load, which is safer than
 * guessing a downgrade.
 */
export function migrateStorage(
  migrations: Record<number, StorageMigration> = STORAGE_MIGRATIONS,
  target: number = STORAGE_SCHEMA_VERSION
): MigrationOutcome {
  const stored = readJSON<unknown>(STORAGE_KEYS.schema, null);
  let version = Number.isInteger(stored) && (stored as number) >= 1 ? (stored as number) : 1;
  if (version > target) return "newer";
  const start = version;
  while (version < target) {
    const step = migrations[version];
    if (!step) return "failed";
    try {
      step();
    } catch {
      return "failed";
    }
    version += 1;
    writeJSON(STORAGE_KEYS.schema, version);
  }
  writeJSON(STORAGE_KEYS.schema, version);
  return version === start ? "current" : "migrated";
}
