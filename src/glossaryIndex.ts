/**
 * Links study text to the glossary. Two kinds of term are matched reliably in
 * running text:
 *
 *  - acronyms ("SIEM", "ZTA", "TACACS+"), matched as whole tokens;
 *  - full names that are **multi-word phrases** ("Zero Trust", "Public Key",
 *    "Logic Bomb"), matched as whole phrases.
 *
 * Single-word full names ("Audit", "Patch", "Latency") are left out on
 * purpose: they collide with ordinary prose and would teach a tangential term;
 * the acronym path carries far less risk of a wrong match. A phrase or acronym
 * that names two different glossary entries (MAC: mandatory access control,
 * media access control, message authentication code) is dropped rather than
 * guessed: a wrong definition would teach the wrong thing.
 */
import type { Subtopic } from "./types";

export interface GlossaryHint {
  /** Glossary entry id (the subtopic's checklistKey). */
  id: string;
  /** What the chip shows: an acronym ("SIEM") or a full name ("Zero Trust"). */
  label: string;
  term: string;
  definition: string;
  examTip?: string;
}

/** Acronyms and full names of a glossary, ready for matching against text. */
export interface GlossaryIndex {
  /** Acronym token → entry, keeping only acronyms that name a single term. */
  byAcronym: ReadonlyMap<string, GlossaryHint>;
  /** Normalised full-name phrase → entry, keeping only unambiguous names. */
  byName: ReadonlyMap<string, GlossaryHint>;
  /** One alternation of every indexed name, longest first; null if none. */
  namePattern: RegExp | null;
}

const SPECIAL_ACRONYMS = "(?:2FA|3DES|PCI DSS|SE Linux|USB OTG)";
const ACRONYM_CORE = "[A-Z][A-Za-z0-9]{0,7}(?:[-/&][A-Z0-9][A-Za-z0-9]{1,8})?\\+?";
const ACRONYM = new RegExp(`^(?:${SPECIAL_ACRONYMS}|${ACRONYM_CORE})$`);
const IN_PARENTHESES = new RegExp(`\\((${SPECIAL_ACRONYMS}|${ACRONYM_CORE})\\)`, "g");
/** Candidate acronyms in running text; a trailing "+" is part of the token. */
const IN_TEXT = new RegExp(`(?<![A-Za-z0-9-])(?:${SPECIAL_ACRONYMS}|${ACRONYM_CORE})(?![A-Za-z0-9+-])`, "g");
/** A trailing "(ACRONYM)" is the acronym, not part of the full name. */
const PAREN_SUFFIX = /\s*\([^)]*\)\s*$/;

/** Needs at least two capital letters: "A1" or "Q3" are not acronyms. */
export const isAcronym = (value: string) => value === "P12" || ACRONYM.test(value) && (value.match(/[A-Z]/g) ?? []).length >= 2;

/** The acronyms a glossary term stands for: the term itself, or any in parentheses. */
export function acronymsOf(term: string): string[] {
  const clean = term.trim();
  const found = new Set<string>();
  if (isAcronym(clean)) found.add(clean);
  if (clean.startsWith("GDPR (")) found.add("GDPR");
  for (const match of clean.matchAll(IN_PARENTHESES)) if (isAcronym(match[1])) found.add(match[1]);
  // CompTIA prints the official token with a space, while the established
  // industry spelling and the existing glossary entry use a hyphen.
  if (found.has("PCI-DSS")) found.add("PCI DSS");
  return [...found];
}

/**
 * The full-name phrase a glossary term can be matched by, or null when the
 * term has no distinctive phrase (a single word or a bare acronym).
 */
export function fullNameOf(term: string): string | null {
  const phrase = term.replace(PAREN_SUFFIX, "").trim();
  // Only multi-word phrases are distinctive enough to match without false
  // positives; a single word (even a technical one) is left to the acronym.
  if (!/\s/.test(phrase)) return null;
  if (phrase.length < 4) return null;
  return phrase;
}

const normalize = (term: string) => term.toLowerCase().replace(/\s+/g, " ").trim();
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const hintOf = (sub: Subtopic, label: string): GlossaryHint => ({
  // A duplicate concept is one glossary entry with its canonical one.
  id: sub.canonical?.checklistKey ?? sub.checklistKey,
  label,
  term: sub.name,
  definition: sub.definition,
  examTip: sub.examTip,
});

/** Acronym → glossary entry, keeping only acronyms that name a single term. */
export function buildAcronymIndex(subtopics: readonly Subtopic[]): Map<string, GlossaryHint> {
  const byAcronym = new Map<string, GlossaryHint>();
  const ambiguous = new Set<string>();
  for (const sub of subtopics) {
    for (const acronym of acronymsOf(sub.name)) {
      const existing = byAcronym.get(acronym);
      if (existing && normalize(existing.term) !== normalize(sub.name)) ambiguous.add(acronym);
      if (!existing) byAcronym.set(acronym, hintOf(sub, acronym));
    }
  }
  for (const acronym of ambiguous) byAcronym.delete(acronym);
  return byAcronym;
}

/** Normalised full-name phrase → glossary entry, dropping ambiguous phrases. */
function buildNameIndex(subtopics: readonly Subtopic[]): Map<string, GlossaryHint> {
  const byName = new Map<string, GlossaryHint>();
  const ambiguous = new Set<string>();
  for (const sub of subtopics) {
    const name = fullNameOf(sub.name);
    if (!name) continue;
    const key = normalize(name);
    const hint = hintOf(sub, name);
    const existing = byName.get(key);
    if (existing && existing.id !== hint.id) ambiguous.add(key);
    if (!existing) byName.set(key, hint);
  }
  for (const key of ambiguous) byName.delete(key);
  return byName;
}

/** One alternation of every name, longest first so the specific phrase wins. */
function buildNamePattern(byName: ReadonlyMap<string, GlossaryHint>): RegExp | null {
  const names = [...byName.values()].map((h) => h.label).sort((a, b) => b.length - a.length);
  if (names.length === 0) return null;
  const alternation = names.map(escapeRegExp).join("|");
  // Unicode boundaries so accented Italian words ("difesa") are whole words.
  return new RegExp(`(?<![\\p{L}\\p{N}])(?:${alternation})(?![\\p{L}\\p{N}])`, "giu");
}

/** Builds the full glossary index (acronyms and multi-word names). */
export function buildGlossaryIndex(subtopics: readonly Subtopic[]): GlossaryIndex {
  const byName = buildNameIndex(subtopics);
  return {
    byAcronym: buildAcronymIndex(subtopics),
    byName,
    namePattern: buildNamePattern(byName),
  };
}

/**
 * Glossary entries whose acronym or full name appears in the given texts, in
 * order of first appearance, without repeats, at most `limit`. `exclude` drops
 * an entry, e.g. the subtopic being read.
 */
export function findGlossaryTerms(
  texts: readonly string[],
  index: GlossaryIndex,
  limit = 6,
  exclude?: string
): GlossaryHint[] {
  const found: GlossaryHint[] = [];
  const seen = new Set<string>();
  for (const text of texts) {
    // Collect acronym and name matches, then read them left to right so the
    // chips follow the order a learner meets the terms in the text.
    const matches: { pos: number; hint: GlossaryHint }[] = [];
    for (const match of text.matchAll(IN_TEXT)) {
      const hint = index.byAcronym.get(match[0]);
      if (hint && match.index !== undefined) matches.push({ pos: match.index, hint });
    }
    if (index.namePattern) {
      for (const match of text.matchAll(index.namePattern)) {
        const hint = index.byName.get(normalize(match[0]));
        if (hint && match.index !== undefined) matches.push({ pos: match.index, hint });
      }
    }
    matches.sort((a, b) => a.pos - b.pos);
    for (const { hint } of matches) {
      if (seen.has(hint.id) || hint.id === exclude) continue;
      seen.add(hint.id);
      found.push(hint);
      if (found.length >= limit) return found;
    }
  }
  return found;
}
