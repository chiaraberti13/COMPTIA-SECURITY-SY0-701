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
