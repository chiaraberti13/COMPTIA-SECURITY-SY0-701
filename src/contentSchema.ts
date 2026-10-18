/**
 * The schema of the study content, checked at run time (ROADMAP: "Valutare
 * l'estrazione dei dataset in JSON/YAML con schema", docs/adr/0005).
 *
 * TypeScript already checks the datasets at build time, but only while they
 * are TypeScript: a JSON or YAML file, or data arriving from anywhere else,
 * would bypass `tsc`. This schema states the same contract, plus the rules the
 * types cannot express (an answer index inside the options, no unknown field,
 * a deprecation with a date), so the datasets can move to another format
 * without losing a single check. tests/contentSchema.test.ts applies it to
 * every dataset.
 *
 * Not imported by the app: it is used by the tests and would be used by a
 * loader for JSON files, so it adds nothing to the browser bundle.
 * Docs: https://zod.dev/api
 */
import * as z from "zod";

const Text = z.string().trim().min(1);

const Deprecation = z.strictObject({
  since: z.iso.date(),
  reason: z.string().trim().min(20),
});

const ComparativeTable = z
  .strictObject({
    headers: z.array(Text).min(2),
    rows: z.array(z.array(Text)).min(1),
  })
  .refine((t) => t.rows.every((row) => row.length === t.headers.length), "every row has as many cells as there are headers");

export const SubtopicSchema = z.strictObject({
  name: Text,
  checklistKey: z.string().regex(/^[A-Za-z][A-Za-z0-9_]*$/, "letters, digits and underscores, starting with a letter"),
  // Empty only for a concept defined in another domain (src/canonicalTerms.ts).
  definition: z.string(),
  details: Text,
  keyFormulas: z.array(Text).min(1).optional(),
  comparativeTable: ComparativeTable.optional(),
  examTip: Text,
  deprecated: Deprecation.optional(),
});

export const TopicGroupSchema = z.strictObject({
  title: Text,
  description: Text,
  icon: Text,
  subtopics: z.array(SubtopicSchema).min(1),
});

export const QuestionSchema = z
  .strictObject({
    id: z.int().positive(),
    topic: Text,
    level: z.enum(["RICORDO", "COMPRENSIONE", "APPLICAZIONE", "ANALISI"]),
    scenario: z.string(),
    question: Text,
    options: z.array(Text).min(2).max(6),
    answerIndex: z.int().nonnegative(),
    answerIndexes: z.array(z.int().nonnegative()).min(2).optional(),
    explanation: Text,
    deprecated: Deprecation.optional(),
  })
  .refine((q) => q.answerIndex < q.options.length, { message: "the answer is one of the options", path: ["answerIndex"] })
  .refine(
    (q) =>
      !q.answerIndexes ||
      (new Set(q.answerIndexes).size === q.answerIndexes.length &&
        q.answerIndexes.every((i) => i < q.options.length) &&
        Math.min(...q.answerIndexes) === q.answerIndex),
    { message: "distinct answers among the options, the lowest one repeated in answerIndex", path: ["answerIndexes"] }
  );

/** The English overlay: every field optional, none unknown. */
export const GroupOverrideSchema = z.strictObject({ title: Text.optional(), description: Text.optional() });

export const SubtopicOverrideSchema = z.strictObject({
  name: Text.optional(),
  definition: Text.optional(),
  details: Text.optional(),
  examTip: Text.optional(),
  keyFormulas: z.array(Text).min(1).optional(),
  comparativeTable: ComparativeTable.optional(),
});

export const QuestionOverrideSchema = z.strictObject({
  topic: Text.optional(),
  scenario: z.string().optional(),
  question: Text.optional(),
  options: z.array(Text).min(2).max(6).optional(),
  explanation: Text.optional(),
});

const DomainKey = z.enum(["1", "2", "3", "4", "5"]);

export const EnglishOverlaySchema = z.strictObject({
  GROUP_EN: z.record(Text, GroupOverrideSchema),
  SUBTOPIC_EN: z.record(DomainKey, z.record(z.string(), SubtopicOverrideSchema)),
  QUESTION_EN: z.record(DomainKey, z.record(z.string().regex(/^\d+$/), QuestionOverrideSchema)),
});
