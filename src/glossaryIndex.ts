/**
 * Links study text to the glossary through acronyms. Acronyms are the one
 * kind of term that can be matched reliably in free text ("SIEM", "ZTA",
 * "TACACS+"); full names vary too much with grammar and translation.
 *
 * An acronym that names two different glossary entries (MAC: mandatory access
 * control, media access control, message authentication code) is left out
 * rather than guessed: a wrong definition would teach the wrong thing.
 */
import type { Subtopic } from "./types";

export interface GlossaryHint {
  /** Glossary entry id (the subtopic's checklistKey). */
  id: string;
  acronym: string;
  term: string;
  definition: string;
  examTip?: string;
}

const ACRONYM = /^[A-Z][A-Z0-9]{1,7}\+?$/;
const IN_PARENTHESES = /\(([A-Z][A-Z0-9]{1,7}\+?)\)/g;
/** Candidate acronyms in running text; a trailing "+" is part of the token. */
const IN_TEXT = /(?<![A-Za-z0-9])[A-Z][A-Z0-9]{1,7}\+?(?![A-Za-z0-9+])/g;

/** Needs at least two capital letters: "A1" or "Q3" are not acronyms. */
const isAcronym = (value: string) => ACRONYM.test(value) && (value.match(/[A-Z]/g) ?? []).length >= 2;

/** The acronyms a glossary term stands for: the term itself, or any in parentheses. */
export function acronymsOf(term: string): string[] {
  const clean = term.trim();
  const found = new Set<string>();
  if (isAcronym(clean)) found.add(clean);
  for (const match of clean.matchAll(IN_PARENTHESES)) if (isAcronym(match[1])) found.add(match[1]);
  return [...found];
}

const normalize = (term: string) => term.toLowerCase().replace(/\s+/g, " ").trim();

/** Acronym → glossary entry, keeping only acronyms that name a single term. */
export function buildAcronymIndex(subtopics: readonly Subtopic[]): Map<string, GlossaryHint> {
  const byAcronym = new Map<string, GlossaryHint>();
  const ambiguous = new Set<string>();
  for (const sub of subtopics) {
    for (const acronym of acronymsOf(sub.name)) {
      const existing = byAcronym.get(acronym);
      if (existing && normalize(existing.term) !== normalize(sub.name)) ambiguous.add(acronym);
      if (!existing) {
        byAcronym.set(acronym, {
          id: sub.checklistKey,
          acronym,
          term: sub.name,
          definition: sub.definition,
          examTip: sub.examTip,
        });
      }
    }
  }
  for (const acronym of ambiguous) byAcronym.delete(acronym);
  return byAcronym;
}

/**
 * Glossary entries whose acronym appears in the given texts, in order of first
 * appearance, without repeats, at most `limit`. `exclude` drops an entry, e.g.
 * the subtopic being read.
 */
export function findGlossaryTerms(
  texts: readonly string[],
  index: ReadonlyMap<string, GlossaryHint>,
  limit = 6,
  exclude?: string
): GlossaryHint[] {
  const found: GlossaryHint[] = [];
  const seen = new Set<string>();
  for (const text of texts) {
    for (const [token] of text.matchAll(IN_TEXT)) {
      const hint = index.get(token);
      if (!hint || seen.has(hint.id) || hint.id === exclude) continue;
      seen.add(hint.id);
      found.push(hint);
      if (found.length >= limit) return found;
    }
  }
  return found;
}
