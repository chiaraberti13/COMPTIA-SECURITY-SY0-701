import { describe, expect, it } from "vitest";
import * as z from "zod";
import * as data from "../src/data";
import { GROUP_EN, QUESTION_EN, SUBTOPIC_EN } from "../src/data.en";
import { EnglishOverlaySchema, QuestionSchema, TopicGroupSchema } from "../src/contentSchema";

/*
 * Every dataset against the run-time schema (src/contentSchema.ts). This is
 * the precondition set by the roadmap before moving the content to JSON or
 * YAML: the same checks must hold whatever the format. docs/adr/0005 records
 * the decision.
 */

const DOMAINS = [1, 2, 3, 4, 5];
const dataset = data as unknown as Record<string, unknown>;

/** The first problems found, as "path: message", so a failure says where to look. */
function problems(schema: z.ZodType, value: unknown, label: string): string[] {
  const result = schema.safeParse(value);
  return result.success ? [] : result.error.issues.slice(0, 10).map((i) => `${label}.${i.path.join(".")}: ${i.message}`);
}

describe("content schema", () => {
  it.each(DOMAINS)("accepts the topics of domain %i", (d) => {
    expect(problems(z.array(TopicGroupSchema).min(1), dataset[`DOMAIN_${d}_TOPICS`], `DOMAIN_${d}_TOPICS`)).toEqual([]);
  });

  it.each(DOMAINS)("accepts the questions of domain %i", (d) => {
    expect(problems(z.array(QuestionSchema).min(1), dataset[`DOMAIN_${d}_QUESTIONS`], `DOMAIN_${d}_QUESTIONS`)).toEqual([]);
  });

  it("accepts the English overlay", () => {
    expect(problems(EnglishOverlaySchema, { GROUP_EN, SUBTOPIC_EN, QUESTION_EN }, "EN")).toEqual([]);
  });

  it("finds the mistakes a hand-edited file would contain", () => {
    const question = {
      id: 1,
      topic: "Controlli",
      level: "APPLICAZIONE",
      scenario: "",
      question: "Quale controllo?",
      options: ["A) Uno", "B) Due"],
      answerIndex: 0,
      explanation: "La risposta corretta è la **A) Uno**.",
    };
    expect(QuestionSchema.safeParse(question).success).toBe(true);
    const broken = (patch: object) => QuestionSchema.safeParse({ ...question, ...patch }).success;
    expect(broken({ answerIndex: 2 }), "answer outside the options").toBe(false);
    expect(broken({ level: "FACILE" }), "unknown level").toBe(false);
    expect(broken({ answerIndexes: [1, 1] }), "repeated answer").toBe(false);
    expect(broken({ answerIndexes: [0, 1], answerIndex: 1 }), "answerIndex not the lowest").toBe(false);
    expect(broken({ explaination: "typo" }), "unknown field (a typo)").toBe(false);
    expect(broken({ deprecated: { since: "27/09/2026", reason: "Replaced by a clearer question." } }), "date not ISO").toBe(false);
  });

  it("finds datasets that are plain data, so they could be written as JSON unchanged", () => {
    // No function, undefined value, Date or class instance: a JSON round trip
    // gives back exactly the same content.
    const all = { ...dataset, GROUP_EN, SUBTOPIC_EN, QUESTION_EN };
    expect(JSON.parse(JSON.stringify(all))).toEqual(all);
  });
});
