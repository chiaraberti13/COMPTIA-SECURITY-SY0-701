import type { Question } from "./types";

const MAX_TEXT_LENGTH = 6000;

function boundedString(value: unknown, max = MAX_TEXT_LENGTH): string | null {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length > 0 && text.length <= max ? text : null;
}

/**
 * Treats model output as untrusted input. The provider schema improves the
 * response shape but is not a runtime trust boundary, so every field used by
 * the client is checked before it leaves the server.
 */
export function validateRemediationPayload(payload: unknown): Question[] | null {
  if (!payload || typeof payload !== "object") return null;
  const questions = (payload as { questions?: unknown }).questions;
  if (!Array.isArray(questions) || questions.length !== 3) return null;

  const parsed: Question[] = [];
  for (let index = 0; index < questions.length; index++) {
    const raw = questions[index];
    if (!raw || typeof raw !== "object") return null;
    const item = raw as Record<string, unknown>;
    const topic = boundedString(item.topic, 160);
    const scenario = boundedString(item.scenario);
    const prompt = boundedString(item.question, 1200);
    const explanation = boundedString(item.explanation);
    const options = item.options;
    const answerIndex = item.answerIndex;

    if (
      !topic || !scenario || !prompt || !explanation ||
      !Array.isArray(options) || options.length !== 4 ||
      !Number.isInteger(answerIndex) || Number(answerIndex) < 0 || Number(answerIndex) > 3
    ) return null;

    const safeOptions = options.map(option => boundedString(option, 1200));
    if (safeOptions.some(option => option === null)) return null;

    parsed.push({
      // Server-owned ids prevent collisions and duplicate model ids.
      id: 9_000_000 + index,
      topic,
      level: "ANALISI",
      scenario,
      question: prompt,
      options: safeOptions as string[],
      answerIndex: Number(answerIndex),
      explanation,
    });
  }

  return parsed;
}
