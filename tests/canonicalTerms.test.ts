import { beforeAll, describe, expect, it } from "vitest";
import * as data from "../src/data";
import { SUBTOPIC_EN } from "../src/data.en";
import {
  CANONICAL_TERMS,
  HOMONYMS,
  canonicalBookmark,
  conceptRef,
  parseConceptRef,
  sameNameKey,
  type ConceptRef,
} from "../src/canonicalTerms";
import { getDomainTopics, isActive, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymIndex } from "../src/glossaryIndex";
import type { Subtopic, TopicGroup } from "../src/types";

/*
 * One definition per concept (ROADMAP: "Eliminare duplicazioni"): a concept
 * studied in two domains is defined once, in its canonical entry, and the other
 * subtopic points to it by id. src/canonicalTerms.ts explains the model.
 */

const DOMAINS = [1, 2, 3, 4, 5];
const sourceTopics = (d: number) => (data as unknown as Record<string, TopicGroup[]>)[`DOMAIN_${d}_TOPICS`];

/** Every subtopic of the Italian source, with its domain. */
const SOURCE: { ref: ConceptRef; domainId: number; sub: Subtopic }[] = DOMAINS.flatMap((d) =>
  sourceTopics(d).flatMap((g) => g.subtopics.map((sub) => ({ ref: conceptRef(d, sub.checklistKey), domainId: d, sub })))
);
const byRef = new Map(SOURCE.map((entry) => [entry.ref, entry]));
const DUPLICATES = Object.keys(CANONICAL_TERMS) as ConceptRef[];

beforeAll(async () => {
  await loadEnglishOverlay();
});

describe("canonical concepts", () => {
  it("link existing, active concepts, and a canonical entry is never itself a duplicate", () => {
    for (const [duplicate, canonical] of Object.entries(CANONICAL_TERMS) as [ConceptRef, ConceptRef][]) {
      expect(byRef.get(duplicate), duplicate).toBeDefined();
      expect(byRef.get(canonical), canonical).toBeDefined();
      expect(isActive(byRef.get(duplicate)!.sub) && isActive(byRef.get(canonical)!.sub), `${duplicate} → ${canonical}`).toBe(true);
      expect(duplicate, "a concept cannot be its own canonical entry").not.toBe(canonical);
      expect(CANONICAL_TERMS[canonical], `${canonical} is canonical and a duplicate`).toBeUndefined();
    }
  });

  it("write each definition once: a duplicate has none, in either language", () => {
    for (const duplicate of DUPLICATES) {
      const { domainId, checklistKey } = parseConceptRef(duplicate);
      expect(byRef.get(duplicate)!.sub.definition, duplicate).toBe("");
      expect(SUBTOPIC_EN[domainId]?.[checklistKey]?.definition, `${duplicate} (EN)`).toBeUndefined();
    }
    const canonicals = new Set(Object.values(CANONICAL_TERMS));
    for (const canonical of canonicals) expect(byRef.get(canonical)!.sub.definition.trim().length, canonical).toBeGreaterThan(20);
    // Only duplicates may have an empty definition.
    const empty = SOURCE.filter(({ ref, sub }) => !sub.definition.trim() && !CANONICAL_TERMS[ref]).map(({ ref }) => ref);
    expect(empty).toEqual([]);
  });

  it.each(["it", "en"] as const)("show the canonical definition, in the reader's language (%s)", (lang) => {
    for (const [duplicate, canonical] of Object.entries(CANONICAL_TERMS) as [ConceptRef, ConceptRef][]) {
      const find = (ref: ConceptRef) => {
        const { domainId, checklistKey } = parseConceptRef(ref);
        return getDomainTopics(domainId, lang).flatMap((g) => g.subtopics).find((s) => s.checklistKey === checklistKey)!;
      };
      const [dup, can] = [find(duplicate), find(canonical)];
      expect(dup.definition, duplicate).toBe(can.definition);
      expect(dup.canonical, duplicate).toEqual({ ...parseConceptRef(canonical), name: can.name });
      expect(can.canonical, canonical).toBeUndefined();
    }
  });

  it("leave no duplicate unlinked: concepts with the same name are linked or declared homonyms", () => {
    const groups = new Map<string, ConceptRef[]>();
    for (const { ref, sub } of SOURCE.filter(({ sub }) => isActive(sub))) {
      groups.set(sameNameKey(sub.name), [...(groups.get(sameNameKey(sub.name)) ?? []), ref]);
    }
    const homonymSets = HOMONYMS.map((h) => [...h.refs].sort().join(" "));
    const unexplained = [...groups.values()]
      .filter((refs) => refs.length > 1)
      .filter((refs) => {
        if (homonymSets.includes([...refs].sort().join(" "))) return false;
        const linked = refs.filter((r) => CANONICAL_TERMS[r]);
        const targets = new Set(linked.map((r) => CANONICAL_TERMS[r]));
        // All but one are duplicates of the remaining one.
        return !(linked.length === refs.length - 1 && targets.size === 1 && refs.includes([...targets][0]));
      })
      .map((refs) => refs.join(" = "));
    expect(unexplained, "add them to CANONICAL_TERMS or HOMONYMS in src/canonicalTerms.ts").toEqual([]);
  });

  it("declare homonyms that exist, with a reason, and never link them", () => {
    for (const { refs, reason } of HOMONYMS) {
      expect(refs.length, reason).toBeGreaterThanOrEqual(2);
      expect(reason.length).toBeGreaterThan(20);
      for (const ref of refs) {
        expect(byRef.get(ref), ref).toBeDefined();
        expect(CANONICAL_TERMS[ref], ref).toBeUndefined();
      }
      expect(new Set(refs.map((r) => sameNameKey(byRef.get(r)!.sub.name))).size, refs.join(" ")).toBe(1);
    }
  });

  it("move a glossary bookmark on a duplicate to its canonical entry, unambiguously", () => {
    for (const duplicate of DUPLICATES) {
      const { checklistKey } = parseConceptRef(duplicate);
      // No other concept, in any domain, uses a duplicate's key.
      expect(SOURCE.filter(({ sub }) => sub.checklistKey === checklistKey).length, checklistKey).toBe(1);
      expect(canonicalBookmark(checklistKey)).toBe(parseConceptRef(CANONICAL_TERMS[duplicate]).checklistKey);
    }
    expect(canonicalBookmark("CIATriadKey-that-is-not-a-duplicate")).toBe("CIATriadKey-that-is-not-a-duplicate");
  });

  it("give the glossary hints of a duplicate the canonical id", () => {
    const subtopics = DOMAINS.flatMap((d) => getDomainTopics(d, "it").flatMap((g) => g.subtopics));
    const index = buildAcronymIndex(subtopics);
    expect(index.get("CVE")?.id).toBe("CVE");
    expect(index.get("CVSS")?.id).toBe("CVSS");
  });
});
