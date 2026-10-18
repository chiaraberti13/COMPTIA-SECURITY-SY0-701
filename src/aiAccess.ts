/**
 * Access code for the AI endpoints, when the server requires one
 * (AI_ACCESS_TOKEN). Kept in sessionStorage: it lasts only as long as the tab,
 * is never sent anywhere but this app's own /api, and is not part of the
 * study progress (backup, import or "delete all data").
 */
const KEY = "comptia_sy0701_ai_access";

/** Error code the server returns with 401 when the code is missing or wrong. */
export const ACCESS_REQUIRED = "access_token_required";

export function getAiAccessCode(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/** Stores the code for this tab; an empty value forgets it. */
export function setAiAccessCode(code: string): void {
  try {
    if (code) sessionStorage.setItem(KEY, code);
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the code simply is not remembered */
  }
}

/** Headers for a JSON call to the AI endpoints, with the code when there is one. */
export function aiRequestHeaders(): Record<string, string> {
  const code = getAiAccessCode();
  return { "Content-Type": "application/json", ...(code ? { "X-Access-Token": code } : {}) };
}
