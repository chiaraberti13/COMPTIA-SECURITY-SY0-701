import { describe, expect, it } from "vitest";
import {
  DOMAIN_1_TOPICS,
  DOMAIN_2_TOPICS,
  DOMAIN_3_TOPICS,
  DOMAIN_4_TOPICS,
  DOMAIN_5_TOPICS,
  DOMAIN_1_QUESTIONS,
  DOMAIN_2_QUESTIONS,
  DOMAIN_3_QUESTIONS,
  DOMAIN_4_QUESTIONS,
  DOMAIN_5_QUESTIONS,
} from "../src/data";
import { SUBTOPIC_EN, QUESTION_EN } from "../src/data.en";
import { SUBGROUP_MAP } from "../src/subgroups";
import { getDomainQuestions, questionUid, domainOfQuestion } from "../src/localizedData";

const TOPICS_BY_DOMAIN = {
  1: DOMAIN_1_TOPICS,
  2: DOMAIN_2_TOPICS,
  3: DOMAIN_3_TOPICS,
  4: DOMAIN_4_TOPICS,
  5: DOMAIN_5_TOPICS,
} as const;

const QUESTIONS_BY_DOMAIN = {
  1: DOMAIN_1_QUESTIONS,
  2: DOMAIN_2_QUESTIONS,
  3: DOMAIN_3_QUESTIONS,
  4: DOMAIN_4_QUESTIONS,
  5: DOMAIN_5_QUESTIONS,
} as const;

const DOMAIN_IDS = [1, 2, 3, 4, 5] as const;

/** Values appearing more than once in `values`. */
function duplicates<T>(values: readonly T[]): T[] {
  const seen = new Set<T>();
  const dupes = new Set<T>();
  for (const v of values) {
    if (seen.has(v)) dupes.add(v);
    seen.add(v);
  }
  return [...dupes];
}

const allSubtopics = DOMAIN_IDS.flatMap((d) =>
  TOPICS_BY_DOMAIN[d].flatMap((g) => g.subtopics.map((s) => ({ domain: d, sub: s })))
);

describe("question ids", () => {
  it.each(DOMAIN_IDS)("domain %i has no duplicate source ids", (d) => {
    expect(duplicates(QUESTIONS_BY_DOMAIN[d].map((q) => q.id))).toEqual([]);
  });

  it("namespaced ids are unique across every domain", () => {
    const uids = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d].map((q) => questionUid(d, q.id))
    );
    expect(duplicates(uids)).toEqual([]);
    expect(uids.length).toBeGreaterThan(600);
  });

  it("questions exposed by getDomainQuestions carry their domain in the id", () => {
    for (const d of DOMAIN_IDS) {
      for (const q of getDomainQuestions(d, "it")) {
        expect(domainOfQuestion(q.id)).toBe(d);
      }
    }
  });

  it("the English dataset keeps the same ids as the Italian source", () => {
    for (const d of DOMAIN_IDS) {
      const it = getDomainQuestions(d, "it").map((q) => q.id);
      const en = getDomainQuestions(d, "en").map((q) => q.id);
      expect(en).toEqual(it);
    }
  });
});

describe("question shape", () => {
  // Most questions offer four options; a handful of Domain 4 items are
  // deliberately six-option questions, which the UI renders fine.
  it("every question offers between two and six options", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter((q) => q.options.length < 2 || q.options.length > 6)
        .map((q) => `D${d}#${q.id} (${q.options.length})`)
    );
    expect(broken).toEqual([]);
  });

  it("every answerIndex points at an existing option", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter((q) => q.answerIndex < 0 || q.answerIndex >= q.options.length)
        .map((q) => `D${d}#${q.id}`)
    );
    expect(broken).toEqual([]);
  });

  it("answerIndexes, where present, is a valid multi-response set", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter((q) => q.answerIndexes !== undefined)
        .filter(
          (q) =>
            // At least two options, or it should not be multi-response at all.
            q.answerIndexes!.length < 2 ||
            // Every index must address a real option.
            q.answerIndexes!.some((i) => i < 0 || i >= q.options.length) ||
            // No duplicates, which would inflate the required pick count.
            new Set(q.answerIndexes!).size !== q.answerIndexes!.length ||
            // answerIndex must be the lowest correct index, so code reading
            // only that field points at a correct option, never a distractor.
            Math.min(...q.answerIndexes!) !== q.answerIndex
        )
        .map((q) => `D${d}#${q.id}`)
    );
    expect(broken).toEqual([]);
  });

  it("a multi-response question announces itself in its own text", () => {
    // The learner must be told two options are expected. The UI shows a
    // badge, but the question text has to say so too, so the wording still
    // makes sense wherever it is read on its own.
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter((q) => (q.answerIndexes?.length ?? 0) > 1)
        .filter((q) => !/\(scegli(ne)? due\)|\(choose two\)/i.test(q.question))
        .map((q) => `D${d}#${q.id}`)
    );
    expect(broken).toEqual([]);
  });

  it("every question carries text and an explanation", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter((q) => !q.question.trim() || !q.explanation.trim() || !q.topic.trim())
        .map((q) => `D${d}#${q.id}`)
    );
    expect(broken).toEqual([]);
  });

  it("no option inside a question is empty or duplicated", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d]
        .filter(
          (q) =>
            q.options.some((o) => !o.trim()) ||
            new Set(q.options.map((o) => o.trim())).size !== q.options.length
        )
        .map((q) => `D${d}#${q.id}`)
    );
    expect(broken).toEqual([]);
  });
});

describe("checklist keys", () => {
  it("are unique across all domains", () => {
    expect(duplicates(allSubtopics.map((s) => s.sub.checklistKey))).toEqual([]);
  });

  it("are non-empty", () => {
    expect(allSubtopics.filter((s) => !s.sub.checklistKey.trim())).toEqual([]);
  });
});

describe("subgroup map", () => {
  it("every mapped key exists in the dataset", () => {
    const known = new Set(allSubtopics.map((s) => s.sub.checklistKey));
    const orphans = Object.keys(SUBGROUP_MAP).filter((k) => !known.has(k));
    expect(orphans).toEqual([]);
  });
});

describe("English overlay", () => {
  it("subtopic overrides target existing checklist keys in their domain", () => {
    const orphans: string[] = [];
    for (const d of DOMAIN_IDS) {
      const known = new Set(TOPICS_BY_DOMAIN[d].flatMap((g) => g.subtopics.map((s) => s.checklistKey)));
      for (const key of Object.keys(SUBTOPIC_EN[d] ?? {})) {
        if (!known.has(key)) orphans.push(`D${d}:${key}`);
      }
    }
    expect(orphans).toEqual([]);
  });

  it("question overrides target existing source ids in their domain", () => {
    const orphans: string[] = [];
    for (const d of DOMAIN_IDS) {
      const known = new Set(QUESTIONS_BY_DOMAIN[d].map((q) => q.id));
      for (const key of Object.keys(QUESTION_EN[d] ?? {})) {
        if (!known.has(Number(key))) orphans.push(`D${d}:${key}`);
      }
    }
    expect(orphans).toEqual([]);
  });
});
