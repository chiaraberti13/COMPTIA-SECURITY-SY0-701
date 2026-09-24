import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  DOMAIN_1_QUESTIONS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_5_QUESTIONS,
} from "../src/data";
import {
  OFFICIAL_OBJECTIVES,
  QUESTION_OBJECTIVE_OVERRIDES,
  TOPIC_OBJECTIVES,
  objectivesOfQuestion,
} from "../src/questionObjectives";
import { COVERAGE_MATRIX_PATH, renderCoverageMatrix } from "../scripts/coverage-matrix";
import type { Question } from "../src/types";

const BANKS: Record<number, Question[]> = {
  1: DOMAIN_1_QUESTIONS,
  2: DOMAIN_2_QUESTIONS,
  3: DOMAIN_3_QUESTIONS,
  4: DOMAIN_4_QUESTIONS,
  5: DOMAIN_5_QUESTIONS,
};
const DOMAINS = [1, 2, 3, 4, 5] as const;
const ALL_CODES = new Set(DOMAINS.flatMap((d) => [...OFFICIAL_OBJECTIVES[d]]));

/** No official objective may be trained by fewer questions than this. */
const MIN_QUESTIONS_PER_OBJECTIVE = 10;

describe("question-to-objective links", () => {
  it("link every question to at least one objective", () => {
    const unlinked = DOMAINS.flatMap((d) =>
      BANKS[d].filter((q) => objectivesOfQuestion(d, q).length === 0).map((q) => `D${d}#${q.id} "${q.topic}"`)
    );
    expect(unlinked).toEqual([]);
  });

  it("use only official objective codes", () => {
    const codes = [
      ...DOMAINS.flatMap((d) => Object.values(TOPIC_OBJECTIVES[d] ?? {}).flat()),
      ...DOMAINS.flatMap((d) => Object.values(QUESTION_OBJECTIVE_OVERRIDES[d] ?? {}).flatMap((o) => [...o.objectives])),
    ];
    expect(codes.filter((code) => !ALL_CODES.has(code))).toEqual([]);
  });

  it("keep no topic entry that no question uses any more", () => {
    const stale = DOMAINS.flatMap((d) => {
      const used = new Set(BANKS[d].map((q) => q.topic));
      return Object.keys(TOPIC_OBJECTIVES[d] ?? {}).filter((topic) => !used.has(topic)).map((t) => `D${d} "${t}"`);
    });
    expect(stale).toEqual([]);
  });

  it("override only existing questions, each with a reason", () => {
    const broken = DOMAINS.flatMap((d) =>
      Object.entries(QUESTION_OBJECTIVE_OVERRIDES[d] ?? {})
        .filter(([id, o]) => !BANKS[d].some((q) => q.id === Number(id)) || o.reason.trim().length < 20)
        .map(([id]) => `D${d}#${id}`)
    );
    expect(broken).toEqual([]);
  });

  it(`train every official objective with at least ${MIN_QUESTIONS_PER_OBJECTIVE} questions`, () => {
    const count = new Map<string, number>();
    for (const d of DOMAINS) {
      for (const q of BANKS[d]) for (const code of objectivesOfQuestion(d, q)) count.set(code, (count.get(code) ?? 0) + 1);
    }
    const thin = [...ALL_CODES].filter((code) => (count.get(code) ?? 0) < MIN_QUESTIONS_PER_OBJECTIVE).map((c) => `${c}: ${count.get(c) ?? 0}`);
    expect(thin).toEqual([]);
  });
});

describe("docs/coverage-matrix.md", () => {
  it("is up to date: run `npm run coverage-matrix` after changing questions, guides or links", () => {
    expect(readFileSync(COVERAGE_MATRIX_PATH, "utf8")).toBe(renderCoverageMatrix());
  });
});
