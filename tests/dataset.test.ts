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
import {
  DOMAIN_GUIDES_EN,
  DOMAIN_GUIDES_IT,
  OFFICIAL_DOMAIN_WEIGHTS,
} from "../src/domainGuides";
import type { Question } from "../src/types";

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

  /**
   * Every question opens with a business scenario, in both languages.
   *
   * 46 questions carried `scenario: null` and the UI, which had no guard on the
   * field, drew the "business scenario" card with its label and nothing under
   * it. `strictNullChecks` is off, so the null went through the compiler
   * unnoticed. Pinning it here is what turns a silent blank card into a
   * failing test the next time an entry is added without one.
   */
  it("every question opens with a scenario, in Italian and in English", () => {
    const broken = DOMAIN_IDS.flatMap((d) =>
      QUESTIONS_BY_DOMAIN[d].flatMap((q) => {
        const found: string[] = [];
        if (!q.scenario?.trim()) found.push(`it D${d}#${q.id}`);
        const en = QUESTION_EN[d]?.[q.id];
        // An override that translates the question must translate its scenario
        // too: a half-translated item reads as a language glitch to the learner.
        if (en && !en.scenario?.trim()) found.push(`en D${d}#${q.id}`);
        return found;
      })
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

/**
 * Subtopics deliberately left out of SUBGROUP_MAP, and therefore rendered as
 * standalone cards.
 *
 * The map is allowed to be partial by design, but an unmapped key is invisible:
 * a new glossary entry that nobody remembers to map is simply rendered on its
 * own, with no error anywhere. Pinning the exceptions here turns that silence
 * into a failing test, so adding an entry forces a deliberate choice — map it,
 * or add it below.
 */
const STANDALONE_SUBTOPICS = new Set([
  "HVACPhysical",
  "ThreatIntelligenceRes",
  "OSINTRes",
  "ProprietaryIntelligenceRes",
  "InformationSharingRes",
  "DarkWebIntelligenceRes",
  "MonolithicArchitecture",
  "MicroservicesArchitecture",
  "APIArchitecture",
  "ServerlessArchitecture",
  "HypervisorConcept",
  "VirtualMachineConcept",
  "GuestOSConcept",
  "HostOSConcept",
  "ContainerConcept",
  "DockerConcept",
  "CostCloud",
  "CAPEXCloud",
  "OPEXCloud",
  "IaCArchitecture",
  "VPNConcentratorConcept",
  "SSLTLSTunnelVPNConcept",
  "IPSecTunnelTransportModes",
  "FalsePositiveRes",
  "FalseNegativeRes",
]);

describe("subgroup map", () => {
  it("every mapped key exists in the dataset", () => {
    const known = new Set(allSubtopics.map((s) => s.sub.checklistKey));
    const orphans = Object.keys(SUBGROUP_MAP).filter((k) => !known.has(k));
    expect(orphans).toEqual([]);
  });

  it("every subtopic is either mapped to a subgroup or listed as standalone", () => {
    const unaccounted = allSubtopics
      .filter((s) => !(s.sub.checklistKey in SUBGROUP_MAP))
      .filter((s) => !STANDALONE_SUBTOPICS.has(s.sub.checklistKey))
      .map((s) => `D${s.domain}:${s.sub.checklistKey}`);
    expect(unaccounted).toEqual([]);
  });

  it("the standalone list carries no key that has since been mapped", () => {
    const stale = [...STANDALONE_SUBTOPICS].filter((k) => k in SUBGROUP_MAP);
    expect(stale).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Explanations
 *
 * Every explanation opens by naming the option it is about, and then works
 * through the others. Two ways that can go wrong survive a careful read but
 * not a regular expression: the opening can name a letter that is not the
 * correct one, and the distractor section can discuss a letter that is in
 * fact the answer. Both mislead the learner in the worst possible place, and
 * both have happened — the second one in the English overlay only, where the
 * letters were translated out of step with the Italian source.
 * ------------------------------------------------------------------ */

const LETTERS = "ABCDEFGH";

/** The sentence an explanation opens with, in either language. */
const OPENING = /(?:rispost[ae] corrett[ae] (?:sono|è)|correct answers? (?:are|is))[^\n]*/i;

/** The heading after which an explanation discusses the wrong options. */
const DISTRACTOR_HEADING =
  /Analisi dei distrattori|Perché le altre non sono corrette|Distractor analysis|Analysis of the distractors|Why the others are not correct/i;

/** Option letters called out in bold, as `**B)`, in ascending order. */
function citedLetters(text: string): number[] {
  const found = [...text.matchAll(/\*\*\s*([A-H])\)/g)].map((m) => LETTERS.indexOf(m[1]));
  return [...new Set(found)].sort((a, b) => a - b);
}

/** Every correct option index, ascending — single- and multi-response alike. */
function correctLetters(q: { answerIndex: number; answerIndexes?: number[] }): number[] {
  const many = q.answerIndexes;
  const all = many && many.length > 0 ? many : [q.answerIndex];
  return [...new Set(all)].sort((a, b) => a - b);
}

/** Italian source and English overlay for one question, as (label, text) pairs. */
function bothLanguages(domain: number, q: Question): [string, string][] {
  const en = QUESTION_EN[domain]?.[q.id]?.explanation;
  const pairs: [string, string][] = [["it", q.explanation]];
  if (en) pairs.push(["en", en]);
  return pairs;
}

describe("explanations", () => {
  it("open by naming exactly the correct options", () => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        const correct = correctLetters(q);
        for (const [lang, text] of bothLanguages(d, q)) {
          const opening = text.match(OPENING);
          if (!opening) {
            broken.push(`${lang} D${d}#${q.id}: no opening sentence`);
            continue;
          }
          const cited = citedLetters(opening[0]);
          if (cited.length === 0) {
            broken.push(`${lang} D${d}#${q.id}: opening names no option`);
            continue;
          }
          if (cited.join() !== correct.join()) {
            broken.push(
              `${lang} D${d}#${q.id}: opening says ${cited.map((i) => LETTERS[i])}, answer is ${correct.map((i) => LETTERS[i])}`
            );
          }
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("never discuss a correct option among the distractors", () => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        const correct = correctLetters(q);
        for (const [lang, text] of bothLanguages(d, q)) {
          const sections = text.split(DISTRACTOR_HEADING);
          // No distractor section: the "every distractor is discussed" test
          // below is the one that has something to say about it.
          if (sections.length < 2) continue;
          const distractors = sections[sections.length - 1];
          for (const i of correct) {
            if (new RegExp(`\\*\\*\\s*${LETTERS[i]}\\)`).test(distractors)) {
              broken.push(`${lang} D${d}#${q.id}: ${LETTERS[i]} is the answer but is listed as a distractor`);
            }
          }
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("discuss every wrong option", () => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        const correct = new Set(correctLetters(q));
        const wrong = q.options.map((_, i) => i).filter((i) => !correct.has(i));
        for (const [lang, text] of bothLanguages(d, q)) {
          const missing = wrong.filter((i) => !new RegExp(`\\*\\*\\s*${LETTERS[i]}[)*]`).test(text));
          if (missing.length > 0) {
            broken.push(
              `${lang} D${d}#${q.id}: no analysis of ${missing.map((i) => LETTERS[i]).join(", ")}`
            );
          }
        }
      }
    }
    expect(broken).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Near-duplicate questions
 *
 * Two questions can be worded completely differently and still ask the same
 * thing. Comparing the question text misses that: what gives a twin away is
 * the *correct answer*, because two questions testing one concept converge on
 * the same option however their scenarios are dressed up.
 *
 * So this compares the correct option of every pair inside a domain and flags
 * the ones that overlap. A hit is not automatically a defect — the same term
 * legitimately answers a definition question and an application question, and
 * one word ("brute force") can name two different attacks. Pairs that have
 * been read and judged deliberate are pinned below; anything else fails, so a
 * new question that restates an existing one cannot land unnoticed.
 */
const ANSWER_SIMILARITY_LIMIT = 0.55;

const REVIEWED_ANSWER_TWINS = new Set([
  // "chiave pubblica" answers both a scenario (which key encrypts for the
  // recipient) and a definition (what the freely distributable key is called).
  "D1#147/#210",
  // Brute force against a safe keypad (a physical attack) and against a login
  // portal (a password attack). Same word, two objectives; the explanations
  // now point at each other.
  "D2#444/#495",
  // "Quantitative risk analysis" names the method; "risk analysis" names the
  // stage of the process. Different options, different questions.
  "D5#76/#158",
]);

/**
 * The correct option(s) of a question, as a bag of meaningful words. Short
 * words are dropped as noise, but bare numbers are kept: "Layer 7" and
 * "Layer 4" are different answers, and throwing the digit away would make
 * them look identical.
 */
function answerTokens(q: Question): Set<string> {
  const text = correctLetters(q)
    .map((i) => q.options[i].replace(/^\s*[A-H]\)\s*/, ""))
    .join(" ");
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-zà-ÿ0-9]+/)
      .filter((w) => w.length >= 4 || /^\d+$/.test(w))
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let shared = 0;
  for (const token of a) if (b.has(token)) shared += 1;
  const union = a.size + b.size - shared;
  return union === 0 ? 0 : shared / union;
}

/** Every same-domain pair whose correct answers overlap past the limit. */
function answerTwins(): { pair: string; score: number }[] {
  const found: { pair: string; score: number }[] = [];
  for (const d of DOMAIN_IDS) {
    const scored = QUESTIONS_BY_DOMAIN[d].map((q) => ({ id: q.id, tokens: answerTokens(q) }));
    for (let a = 0; a < scored.length; a += 1) {
      for (let b = a + 1; b < scored.length; b += 1) {
        const score = jaccard(scored[a].tokens, scored[b].tokens);
        if (score >= ANSWER_SIMILARITY_LIMIT) {
          found.push({ pair: `D${d}#${scored[a].id}/#${scored[b].id}`, score });
        }
      }
    }
  }
  return found;
}

describe("near-duplicate questions", () => {
  it("no unreviewed pair of questions shares a correct answer", () => {
    const unreviewed = answerTwins()
      .filter(({ pair }) => !REVIEWED_ANSWER_TWINS.has(pair))
      .map(({ pair, score }) => `${pair} (${score.toFixed(2)})`);
    expect(unreviewed).toEqual([]);
  });

  it("the reviewed list carries no pair that has since diverged", () => {
    const live = new Set(answerTwins().map((t) => t.pair));
    const stale = [...REVIEWED_ANSWER_TWINS].filter((pair) => !live.has(pair));
    expect(stale).toEqual([]);
  });
});

describe("English overlay", () => {
  it("provides a complete translation for every question field", () => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        const en = QUESTION_EN[d]?.[q.id];
        if (!en) {
          broken.push(`D${d}#${q.id}: missing override`);
          continue;
        }
        if (!en.topic?.trim()) broken.push(`D${d}#${q.id}: missing topic`);
        if (!en.scenario?.trim()) broken.push(`D${d}#${q.id}: missing scenario`);
        if (!en.question?.trim()) broken.push(`D${d}#${q.id}: missing question`);
        if (!en.explanation?.trim()) broken.push(`D${d}#${q.id}: missing explanation`);
        if (!en.options || en.options.length !== q.options.length) {
          broken.push(`D${d}#${q.id}: option count differs from Italian`);
        } else if (
          en.options.some((option) => !option.trim()) ||
          new Set(en.options.map((option) => option.trim())).size !== en.options.length
        ) {
          broken.push(`D${d}#${q.id}: empty or duplicate option`);
        }
      }
    }
    expect(broken).toEqual([]);
  });

  it("announces multi-response questions in both languages", () => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        if ((q.answerIndexes?.length ?? 0) < 2) continue;
        const en = QUESTION_EN[d]?.[q.id];
        if (!/\(scegli(?:ne)? due\)/i.test(q.question)) broken.push(`it D${d}#${q.id}`);
        if (!/\(choose two\)/i.test(en?.question ?? "")) broken.push(`en D${d}#${q.id}`);
      }
    }
    expect(broken).toEqual([]);
  });

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

  /**
   * One Italian section heading, one English rendering. The explanations were
   * written over many passes and drifted into two English wordings for the
   * same Italian heading ("Distractor analysis" next to "Analysis of the
   * distractors"), which reads as two different products.
   */
  it("render each Italian section heading with a single English wording", () => {
    const HEADINGS: [string, string][] = [
      ["Perché è la corretta:", "Why it's correct:"],
      ["Perché è la BEST:", "Why it's the BEST:"],
      ["Analisi dei distrattori:", "Analysis of the distractors:"],
      ["Perché le altre non sono corrette:", "Why the others are not correct:"],
      ["Piccolo Esempio Concentrato:", "Focused Mini-Example:"],
      ["Trappola d'esame:", "Exam trap:"],
    ];
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      for (const q of QUESTIONS_BY_DOMAIN[d]) {
        const en = QUESTION_EN[d]?.[q.id]?.explanation;
        if (!en) continue;
        for (const [it, expected] of HEADINGS) {
          const inSource = q.explanation.includes(`**${it}`);
          if (inSource !== en.includes(`**${expected}`)) {
            broken.push(`D${d}#${q.id}: «${it}» ${inSource ? "in" : "not in"} the source, «${expected}» ${inSource ? "missing from" : "present in"} the overlay`);
          }
        }
      }
    }
    expect(broken).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Blueprint and cognitive-level coverage
 * ------------------------------------------------------------------ */

/** Expand objective labels such as `3.1-3.4` and `4.4 e 4.5`. */
function objectiveTags(title: string): string[] {
  const objectivePart = title.match(/\bObj\s+(.+?)\)/i)?.[1] ?? "";
  const tags = new Set<string>();
  for (const match of objectivePart.matchAll(/(\d)\.(\d)(?:\s*-\s*(?:(\d)\.)?(\d))?/g)) {
    const domain = Number(match[1]);
    const start = Number(match[2]);
    const endDomain = match[3] ? Number(match[3]) : domain;
    const end = match[4] ? Number(match[4]) : start;
    if (domain === endDomain) {
      for (let objective = start; objective <= end; objective += 1) {
        tags.add(`${domain}.${objective}`);
      }
    }
  }
  return [...tags];
}

describe("SY0-701 blueprint coverage", () => {
  it("covers every numbered objective in the five official domains", () => {
    const expected = [
      "1.1", "1.2", "1.3", "1.4",
      "2.1", "2.2", "2.3", "2.4", "2.5",
      "3.1", "3.2", "3.3", "3.4",
      "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9",
      "5.1", "5.2", "5.3", "5.4", "5.5", "5.6",
    ];
    const covered = new Set(
      DOMAIN_IDS.flatMap((d) => TOPICS_BY_DOMAIN[d].flatMap((group) => objectiveTags(group.title)))
    );
    expect(expected.filter((objective) => !covered.has(objective))).toEqual([]);
  });

  it("keeps every domain majority higher-order", () => {
    const broken = DOMAIN_IDS.flatMap((d) => {
      const questions = QUESTIONS_BY_DOMAIN[d];
      const higherOrder = questions.filter(
        (q) => q.level === "APPLICAZIONE" || q.level === "ANALISI"
      ).length;
      return higherOrder / questions.length >= 0.5
        ? []
        : [`D${d}: ${higherOrder}/${questions.length}`];
    });
    expect(broken).toEqual([]);
  });

  it("keeps question coverage close to the official domain weighting", () => {
    const weights: Record<(typeof DOMAIN_IDS)[number], number> = {
      1: 0.12,
      2: 0.22,
      3: 0.18,
      4: 0.28,
      5: 0.20,
    };
    const total = DOMAIN_IDS.reduce((sum, d) => sum + QUESTIONS_BY_DOMAIN[d].length, 0);
    const broken = DOMAIN_IDS.flatMap((d) => {
      const actual = QUESTIONS_BY_DOMAIN[d].length / total;
      return Math.abs(actual - weights[d]) <= 0.05
        ? []
        : [`D${d}: ${(actual * 100).toFixed(1)}% vs ${(weights[d] * 100).toFixed(0)}%`];
    });
    expect(broken).toEqual([]);
  });
});

/* ------------------------------------------------------------------ *
 * Domain learning-guide integrity
 * ------------------------------------------------------------------ */

describe("domain learning guides", () => {
  const EXPECTED_OBJECTIVES: Record<(typeof DOMAIN_IDS)[number], string[]> = {
    1: ["1.1", "1.2", "1.3", "1.4"],
    2: ["2.1", "2.2", "2.3", "2.4", "2.5"],
    3: ["3.1", "3.2", "3.3", "3.4"],
    4: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9"],
    5: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"],
  };

  it("provides exactly one guide for every domain in both languages", () => {
    expect(Object.keys(DOMAIN_GUIDES_IT).map(Number).sort()).toEqual([...DOMAIN_IDS]);
    expect(Object.keys(DOMAIN_GUIDES_EN).map(Number).sort()).toEqual([...DOMAIN_IDS]);
    for (const d of DOMAIN_IDS) {
      expect(DOMAIN_GUIDES_IT[d].domainId).toBe(d);
      expect(DOMAIN_GUIDES_EN[d].domainId).toBe(d);
    }
  });

  it("uses the official weights and covers every objective exactly once", () => {
    for (const d of DOMAIN_IDS) {
      expect(DOMAIN_GUIDES_IT[d].weight).toBe(OFFICIAL_DOMAIN_WEIGHTS[d - 1]);
      expect(DOMAIN_GUIDES_IT[d].objectives.map((o) => o.code)).toEqual(EXPECTED_OBJECTIVES[d]);
      expect(duplicates(DOMAIN_GUIDES_IT[d].objectives.map((o) => o.code))).toEqual([]);
    }
    expect(OFFICIAL_DOMAIN_WEIGHTS.reduce((sum, weight) => sum + weight, 0)).toBe(100);
  });

  it("keeps the Italian source and English guide structurally aligned", () => {
    for (const d of DOMAIN_IDS) {
      const itGuide = DOMAIN_GUIDES_IT[d];
      const enGuide = DOMAIN_GUIDES_EN[d];
      expect(enGuide.weight).toBe(itGuide.weight);
      expect(enGuide.objectives.map((o) => o.code)).toEqual(itGuide.objectives.map((o) => o.code));
      expect(enGuide.studyPath).toHaveLength(itGuide.studyPath.length);
      expect(enGuide.decisionPatterns).toHaveLength(itGuide.decisionPatterns.length);
      expect(enGuide.connections).toHaveLength(itGuide.connections.length);
      expect(enGuide.readinessChecks).toHaveLength(itGuide.readinessChecks.length);
    }
  });

  it.each(["it", "en"] as const)("contains complete, substantive %s guide sections", (lang) => {
    const guides = lang === "it" ? DOMAIN_GUIDES_IT : DOMAIN_GUIDES_EN;
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      const guide = guides[d];
      if (!guide.title.trim() || guide.purpose.trim().length < 120) broken.push(`D${d}: title/purpose`);
      if (guide.studyPath.length < 4) broken.push(`D${d}: study path`);
      if (guide.decisionPatterns.length < 3) broken.push(`D${d}: decision patterns`);
      if (guide.connections.length < 3) broken.push(`D${d}: connections`);
      if (guide.readinessChecks.length < 3) broken.push(`D${d}: readiness checks`);
      if (guide.objectives.some((o) => !o.outcome.trim())) broken.push(`D${d}: objective outcome`);
      if (guide.studyPath.some((step) => !step.title.trim() || !step.rationale.trim())) broken.push(`D${d}: empty study step`);
      if ([...guide.decisionPatterns, ...guide.connections, ...guide.readinessChecks].some((text) => !text.trim())) broken.push(`D${d}: empty list item`);
    }
    expect(broken).toEqual([]);
  });
});
