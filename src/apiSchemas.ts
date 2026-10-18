/**
 * The contract of the two AI endpoints, written once and shared by the server
 * (which validates what the browser sends and what the model returns) and by
 * the browser (which validates what the server answers).
 *
 * Requests are normalised rather than rejected where the old manual checks
 * normalised them (history turns, topic labels), so a well-behaved client
 * never sees a new error; everything that reaches the prompt stays bounded.
 *
 * Written with `zod/mini`, the tree-shakable API of the same library: the
 * browser bundle only carries the checks used here (about 7 kB gzipped instead
 * of the 22 kB of the classic API, measured on the production build).
 * Docs: https://zod.dev/packages/mini
 */
import * as z from "zod/mini";
import type { Question } from "./types";

/** Upper bound on a single chat message, in characters. */
export const MAX_MESSAGE_CHARS = 2000;
/** How many previous turns are replayed to the model. */
export const MAX_HISTORY_TURNS = 8;
/** At most this many weak topics reach the remediation prompt... */
export const MAX_TOPICS = 10;
/** ...each one cut to this many characters. */
export const MAX_TOPIC_CHARS = 120;

const Lang = z.catch(z.enum(["it", "en"]), "it");

/**
 * One turn of the replayed dialogue. Anything but "user" becomes the trainer's
 * turn, so a client cannot invent a "system" role; a malformed turn becomes
 * an empty one instead of failing the whole request.
 */
const HistoryTurn = z.catch(
  z.object({
    role: z.pipe(z.unknown(), z.transform((role): "user" | "trainer" => (role === "user" ? "user" : "trainer"))),
    content: z.pipe(z.catch(z.string(), ""), z.transform((text) => text.slice(0, MAX_MESSAGE_CHARS))),
  }),
  { role: "trainer" as const, content: "" },
);

export const ChatRequestSchema = z.object({
  message: z.string().check(
    z.maxLength(MAX_MESSAGE_CHARS),
    z.refine((text) => text.trim().length > 0, "empty"),
  ),
  history: z.pipe(
    z.pipe(
      z._default(z.catch(z.array(z.unknown()), []), []),
      z.transform((turns) => turns.slice(-MAX_HISTORY_TURNS)),
    ),
    z.array(HistoryTurn),
  ),
  lang: Lang,
});
export type ChatRequest = z.input<typeof ChatRequestSchema>;

export const RemediationRequestSchema = z.object({
  weakTopics: z.pipe(
    z.pipe(
      z.array(z.string()).check(z.minLength(1)),
      z.transform((topics) =>
        topics
          .slice(0, MAX_TOPICS)
          .map((topic) => topic.slice(0, MAX_TOPIC_CHARS).trim())
          .filter(Boolean),
      ),
    ),
    z.array(z.string()).check(z.minLength(1)),
  ),
  lang: Lang,
});
export type RemediationRequest = z.input<typeof RemediationRequestSchema>;

/** A non-empty string, trimmed, of at most `max` characters. */
const text = (max: number) => z.string().check(z.trim(), z.minLength(1), z.maxLength(max));

/**
 * One question as the model writes it. The provider's response schema improves
 * the shape but is not a trust boundary: every field is checked again here.
 */
const ModelQuestion = z.object({
  topic: text(160),
  scenario: text(6000),
  question: text(1200),
  options: z.array(text(1200)).check(z.length(4)),
  answerIndex: z.int().check(z.gte(0), z.lte(3)),
  explanation: text(6000),
});

/** The model's JSON: exactly three questions, turned into app questions. */
export const RemediationPayloadSchema = z.pipe(
  z.object({ questions: z.array(ModelQuestion).check(z.length(3)) }),
  z.transform(({ questions }): Question[] =>
    questions.map((q, index) => ({
      // Server-owned ids prevent collisions and duplicate model ids.
      id: 9_000_000 + index,
      topic: q.topic,
      level: "ANALISI",
      scenario: q.scenario,
      question: q.question,
      options: q.options,
      answerIndex: q.answerIndex,
      explanation: q.explanation,
    })),
  ),
);

/** Every error body of the API, with the optional machine-readable code. */
export const ApiErrorSchema = z.object({ error: z.string(), code: z.optional(z.string()) });

export const ChatResponseSchema = z.object({ reply: z.string() });

/** What the browser accepts from /api/quiz/remediation. */
export const RemediationResponseSchema = z.object({
  questions: z
    .array(z.extend(ModelQuestion, { id: z.int(), level: z.literal("ANALISI") }))
    .check(z.minLength(1)),
});
