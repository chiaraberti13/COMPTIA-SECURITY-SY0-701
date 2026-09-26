/**
 * Guards for the paid AI endpoints, kept free of Express and of the Gemini SDK
 * so they can be unit-tested.
 *
 * The per-IP rate limit stops one client from draining the Gemini quota, but a
 * public deployment can still be abused from many addresses ("denial of
 * wallet"). The daily budget caps the total number of AI calls the server makes
 * per UTC day, whoever asks.
 */

import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Reads a non-negative integer from an environment value. Anything missing,
 * empty, negative or not a whole number falls back to the default, so a typo in
 * the configuration never disables a limit by accident.
 */
export function readLimit(value: string | undefined, fallback: number): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

export interface DailyBudget {
  /** Calls allowed per UTC day; 0 means the AI features are switched off. */
  readonly limit: number;
  /** Reserves one call. Returns false once today's budget is spent. */
  tryConsume(now?: number): boolean;
  /** Calls still available today. */
  remaining(now?: number): number;
}

const utcDay = (epochMs: number): string => new Date(epochMs).toISOString().slice(0, 10);

/**
 * An in-memory counter that resets when the UTC date changes. It is per server
 * process: with several instances the effective cap is limit × instances, which
 * is still bounded. A shared store would be needed for an exact global cap.
 */
export function createDailyBudget(limit: number): DailyBudget {
  let day = "";
  let used = 0;

  const roll = (now: number) => {
    const today = utcDay(now);
    if (today !== day) {
      day = today;
      used = 0;
    }
  };

  return {
    limit,
    tryConsume(now = Date.now()) {
      roll(now);
      if (used >= limit) return false;
      used++;
      return true;
    },
    remaining(now = Date.now()) {
      roll(now);
      return Math.max(0, limit - used);
    },
  };
}

/**
 * Compares a presented access token with the configured one in constant time,
 * so response timing does not reveal how many leading characters matched.
 * Both sides are hashed first: timingSafeEqual needs equal lengths, and the
 * length of the real token must not leak either.
 */
export function tokenMatches(presented: unknown, expected: string): boolean {
  if (typeof presented !== "string" || presented.length === 0 || presented.length > 256) return false;
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(presented), digest(expected));
}
