import { describe, expect, it } from "vitest";
import * as data from "../src/data";
import { getDomainQuestions, getDomainTopics, isActive } from "../src/localizedData";
import type { Deprecation, Question, TopicGroup } from "../src/types";

/*
 * Out-of-date content is marked `deprecated: { since, reason }` instead of
 * being deleted, so the ids learners' progress points to keep existing
 * (tests/conventions.test.ts). CONTRIBUTING.md describes the process.
 */

const DOMAINS = [1, 2, 3, 4, 5];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const today = new Date().toISOString().slice(0, 10);

const sourceQuestions = (d: number) => (data as unknown as Record<string, Question[]>)[`DOMAIN_${d}_QUESTIONS`];
const sourceTopics = (d: number) => (data as unknown as Record<string, TopicGroup[]>)[`DOMAIN_${d}_TOPICS`];

/** Every deprecation in the Italian source, with where it is. */
function deprecations(): [string, Deprecation][] {
  return DOMAINS.flatMap((d) => [
    ...sourceQuestions(d).filter((q) => q.deprecated).map((q): [string, Deprecation] => [`D${d}#${q.id}`, q.deprecated!]),
    ...sourceTopics(d)
      .flatMap((g) => g.subtopics)
      .filter((s) => s.deprecated)
      .map((s): [string, Deprecation] => [s.checklistKey, s.deprecated!]),
  ]);
}

describe("deprecated content", () => {
  it("states since when and why", () => {
    const broken = deprecations().filter(
      ([, dep]) => !ISO_DATE.test(dep.since) || dep.since > today || dep.reason.trim().length < 20
    );
    expect(broken.map(([where]) => where)).toEqual([]);
  });

  it("is never shown, drawn in a quiz or counted", () => {
    for (const d of DOMAINS) {
      for (const lang of ["it", "en"] as const) {
        expect(getDomainQuestions(d, lang).every(isActive), `D${d} questions (${lang})`).toBe(true);
        const subtopics = getDomainTopics(d, lang).flatMap((g) => g.subtopics);
        expect(subtopics.every(isActive), `D${d} concepts (${lang})`).toBe(true);
      }
    }
  });

  it("leaves active content untouched", () => {
    const source = DOMAINS.reduce((n, d) => n + sourceQuestions(d).length, 0);
    const shown = DOMAINS.reduce((n, d) => n + getDomainQuestions(d, "it").length, 0);
    const deprecatedQuestions = deprecations().filter(([where]) => /^D\d#/.test(where)).length;
    expect(shown).toBe(source - deprecatedQuestions);
    expect(isActive({})).toBe(true);
    expect(isActive({ deprecated: { since: "2026-09-27", reason: "Replaced by a clearer question on the same topic." } })).toBe(false);
  });
});
