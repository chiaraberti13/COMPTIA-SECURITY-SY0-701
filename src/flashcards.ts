/**
 * Acronym flashcards: a focused sigla↔significato drill built from the glossary
 * content, reusing the same local spaced-repetition schedule as the quiz
 * (1-3-7-14-30 days). Nothing is sent anywhere; progress lives in localStorage.
 *
 * A card pairs an acronym (its stable, language-independent id, e.g. "SIEM")
 * with its expansion (the "scioglimento", e.g. "Security Information and Event
 * Management") plus the glossary definition and exam tip for context. Cards are
 * derived from the study content so the deck never drifts from the dataset.
 */
import type { TopicGroup } from "./types";
import { acronymsOf, fullNameOf } from "./glossaryIndex";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Spaced-review steps, identical to the quiz schedule (quiz.ts). */
export const FLASHCARD_INTERVAL_DAYS = [1, 3, 7, 14, 30] as const;

/** Which way a card is quizzed. */
export type FlashcardDirection = "acronymToExpansion" | "expansionToAcronym";

export interface AcronymCard {
  /** Stable id: the acronym token itself, the same in both languages. */
  id: string;
  /** The acronym (sigla), e.g. "SIEM". */
  acronym: string;
  /** The expansion (scioglimento), e.g. "Security Information and Event Management". */
  expansion: string;
  /** Short glossary definition, shown as context on the reveal. */
  definition: string;
  /** Exam tip, when the concept has one. */
  examTip?: string;
  /** checklistKey of the backing concept, for a link into the glossary/study view. */
  conceptKey: string;
  /** Domain the concept is studied in (1..5). */
  domainId: number;
  /** Official objective codes the concept's group maps to, e.g. ["4.6"]. */
  objectives: string[];
}

/** Local, per-card spaced-repetition state. */
export interface CardProgress {
  /** Total reviews. */
  seen: number;
  /** Times answered "I knew it". */
  known: number;
  /** Consecutive "I knew it" answers; drives the interval. */
  streak: number;
  /** Last review, epoch ms. */
  lastSeenAt: number;
  /** When the card is next due, epoch ms. */
  dueAt: number;
}

/* ------------------------------------------------------------------ *
 * Deck construction
 * ------------------------------------------------------------------ */

/** The objective codes referenced by a group title such as "… (Obj 4.4 e 4.5)". */
export function objectivesFromGroupTitle(title: string): string[] {
  const block = title.match(/\(Obj([^)]*)\)/i);
  if (!block) return [];
  const codes = new Set<string>();
  const body = block[1];
  // Expand ranges like "3.1-3.4" into every objective they cover.
  for (const range of body.matchAll(/(\d+)\.(\d+)\s*-\s*(\d+)\.(\d+)/g)) {
    const [, d1, n1, d2, n2] = range;
    if (d1 === d2) {
      for (let n = Number(n1); n <= Number(n2); n++) codes.add(`${d1}.${n}`);
    } else {
      codes.add(`${d1}.${n1}`);
      codes.add(`${d2}.${n2}`);
    }
  }
  // Then the plain "X.Y" codes (ranges are already handled above).
  const withoutRanges = body.replace(/\d+\.\d+\s*-\s*\d+\.\d+/g, " ");
  for (const code of withoutRanges.matchAll(/\d+\.\d+/g)) codes.add(code[0]);
  return [...codes].sort();
}

/**
 * The expansion of an acronym, derived from the concept.
 *
 * Three reliable shapes carry it:
 *  - a named hyphenated compound, "Diffie-Hellman (DH)";
 *  - the name itself, "Standard Operating Procedure (SOP)", where stripping the
 *    parenthetical acronym leaves the expansion;
 *  - a bare-acronym name ("SIEM") whose definition opens with the expansion
 *    before a colon: "Security Information and Event Management: …".
 *
 * Anything else returns null, so the card is dropped rather than guessed: a
 * wrong expansion would teach the wrong thing.
 */
export function deriveExpansion(name: string, definition: string): string | null {
  // A named compound such as Diffie-Hellman (DH) is a real expansion even
  // though the glossary intentionally indexes it only by acronym.
  const compound = name.match(/^([A-Za-z]{3,}(?:-[A-Za-z]{3,})+)\s+\([A-Z][A-Z0-9]{1,7}\)$/)?.[1];
  if (compound && compound.length <= 90) return compound;
  const fromName = cleanExpansion(fullNameOf(name) ?? "");
  if (isPlausibleExpansion(fromName)) return fromName;

  const colon = definition.indexOf(":");
  if (colon <= 0 || colon > 95) return null;
  const head = cleanExpansion(definition.slice(0, colon));
  return isPlausibleExpansion(head) ? head : null;
}

/** Drops parentheticals (e.g. an inline "(P12)") and collapses whitespace. */
function cleanExpansion(value: string): string {
  return value.replace(/\([^)]*\)/g, " ").replace(/\s+/g, " ").trim();
}

/** A plausible expansion is a short multi-word phrase, not a whole sentence. */
function isPlausibleExpansion(value: string): boolean {
  if (value.length < 4 || value.length > 90) return false;
  if (!/\s/.test(value)) return false; // must be more than one word
  if (/[.;:!?]/.test(value)) return false; // not a sentence fragment
  const words = value.split(/\s+/).length;
  return words >= 2 && words <= 12;
}

/**
 * Builds the acronym deck from localized topic groups (one domain per key).
 * An acronym that names two different concepts (e.g. MAC) is dropped, like the
 * glossary index does, rather than pairing it with an arbitrary expansion.
 */
export function buildAcronymDeck(topicsByDomain: Record<number, TopicGroup[]>): AcronymCard[] {
  const byAcronym = new Map<string, AcronymCard>();
  const ambiguous = new Set<string>();

  for (const domainId of Object.keys(topicsByDomain).map(Number).sort((a, b) => a - b)) {
    for (const group of topicsByDomain[domainId]) {
      const objectives = objectivesFromGroupTitle(group.title);
      for (const sub of group.subtopics) {
        // A duplicate concept is represented once, under its canonical entry.
        if (sub.canonical) continue;
        const expansion = deriveExpansion(sub.name, sub.definition);
        if (!expansion) continue;
        for (const acronym of acronymsOf(sub.name)) {
          const existing = byAcronym.get(acronym);
          if (existing) {
            if (existing.expansion !== expansion) ambiguous.add(acronym);
            continue;
          }
          byAcronym.set(acronym, {
            id: acronym,
            acronym,
            expansion,
            definition: sub.definition,
            examTip: sub.examTip || undefined,
            conceptKey: sub.checklistKey,
            domainId,
            objectives,
          });
        }
      }
    }
  }

  for (const acronym of ambiguous) byAcronym.delete(acronym);
  return [...byAcronym.values()].sort((a, b) => a.acronym.localeCompare(b.acronym));
}

/* ------------------------------------------------------------------ *
 * Filtering
 * ------------------------------------------------------------------ */

export interface DeckFilter {
  /** Domain id, or "all". */
  domain: number | "all";
  /** Objective code (e.g. "4.6"), or "all". */
  objective: string | "all";
}

/** Cards that match the chosen domain and objective. */
export function filterDeck(deck: readonly AcronymCard[], filter: DeckFilter): AcronymCard[] {
  return deck.filter(
    (card) =>
      (filter.domain === "all" || card.domainId === filter.domain) &&
      (filter.objective === "all" || card.objectives.includes(filter.objective))
  );
}

/** The objective codes present in a deck (or a domain-scoped slice of it), sorted. */
export function objectivesOf(deck: readonly AcronymCard[], domain: number | "all" = "all"): string[] {
  const codes = new Set<string>();
  for (const card of deck) {
    if (domain !== "all" && card.domainId !== domain) continue;
    for (const code of card.objectives) codes.add(code);
  }
  return [...codes].sort((a, b) => {
    const [ad, an] = a.split(".").map(Number);
    const [bd, bn] = b.split(".").map(Number);
    return ad - bd || an - bn;
  });
}

/* ------------------------------------------------------------------ *
 * Spaced repetition
 * ------------------------------------------------------------------ */

/**
 * localStorage is user-controlled and survives upgrades, so progress is
 * sanitized on the way in: anything malformed is dropped rather than trusted.
 * Keys are acronym tokens; values are per-card review state.
 */
export function sanitizeCardProgress(value: unknown): Record<string, CardProgress> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const safe: Record<string, CardProgress> = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!/^[A-Z][A-Z0-9]{1,7}(?:-[A-Z0-9]{2,7})?\+?$/.test(key) && key !== "P12") continue;
    if (!raw || typeof raw !== "object") continue;
    const item = raw as Partial<CardProgress>;
    if (
      !Number.isInteger(item.seen) || Number(item.seen) <= 0 ||
      !Number.isInteger(item.known) || Number(item.known) < 0 ||
      Number(item.known) > Number(item.seen) ||
      !Number.isInteger(item.streak) || Number(item.streak) < 0 ||
      Number(item.streak) > Number(item.seen) ||
      !Number.isFinite(item.lastSeenAt) || Number(item.lastSeenAt) <= 0 ||
      !Number.isFinite(item.dueAt) || Number(item.dueAt) <= 0
    ) continue;
    safe[key] = {
      seen: Number(item.seen),
      known: Number(item.known),
      streak: Number(item.streak),
      lastSeenAt: Number(item.lastSeenAt),
      dueAt: Number(item.dueAt),
    };
  }
  return safe;
}

/**
 * Records one self-assessment. "Knew it" lengthens the streak and pushes the
 * next review from one day up to a month; "didn't know" resets the streak and
 * makes the card due immediately.
 */
export function gradeCard(
  progress: Record<string, CardProgress>,
  id: string,
  knew: boolean,
  now = Date.now()
): Record<string, CardProgress> {
  const previous = progress[id];
  const streak = knew ? (previous?.streak ?? 0) + 1 : 0;
  const intervalIndex = Math.min(Math.max(streak - 1, 0), FLASHCARD_INTERVAL_DAYS.length - 1);
  return {
    ...progress,
    [id]: {
      seen: (previous?.seen ?? 0) + 1,
      known: (previous?.known ?? 0) + (knew ? 1 : 0),
      streak,
      lastSeenAt: now,
      dueAt: knew ? now + FLASHCARD_INTERVAL_DAYS[intervalIndex] * DAY_MS : now,
    },
  };
}

/** Cards due now (never seen counts as due), weakest and most overdue first. */
export function selectDueCards(
  deck: readonly AcronymCard[],
  progress: Record<string, CardProgress>,
  now = Date.now()
): AcronymCard[] {
  return deck
    .filter((card) => {
      const item = progress[card.id];
      return !item || item.dueAt <= now;
    })
    .sort((a, b) => {
      const left = progress[a.id];
      const right = progress[b.id];
      // Never-seen cards first, then lower accuracy, shorter streak, more overdue.
      const seenA = left ? 1 : 0;
      const seenB = right ? 1 : 0;
      if (seenA !== seenB) return seenA - seenB;
      if (!left || !right) return a.acronym.localeCompare(b.acronym);
      return (
        left.known / left.seen - right.known / right.seen ||
        left.streak - right.streak ||
        left.dueAt - right.dueAt ||
        a.acronym.localeCompare(b.acronym)
      );
    });
}

export interface DeckStats {
  total: number;
  /** Cards with at least one review. */
  started: number;
  /** Cards whose latest schedule puts them a full month out (mastered). */
  mastered: number;
  /** Cards due now. */
  due: number;
}

/** Headline counts for the chooser, over a (already filtered) deck. */
export function deckStats(
  deck: readonly AcronymCard[],
  progress: Record<string, CardProgress>,
  now = Date.now()
): DeckStats {
  let started = 0;
  let mastered = 0;
  let due = 0;
  for (const card of deck) {
    const item = progress[card.id];
    if (item) {
      started++;
      if (item.streak >= FLASHCARD_INTERVAL_DAYS.length) mastered++;
    }
    if (!item || item.dueAt <= now) due++;
  }
  return { total: deck.length, started, mastered, due };
}
