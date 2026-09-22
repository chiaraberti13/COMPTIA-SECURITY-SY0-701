import { describe, expect, it } from "vitest";
import { validateRemediationPayload } from "../src/remediation";

const validQuestion = (id: number) => ({
  id,
  topic: "Incident response",
  level: "ANALYSIS",
  scenario: "A company detects suspicious activity while a critical service is running.",
  question: "What should the analyst do FIRST?",
  options: ["A", "B", "C", "D"],
  answerIndex: 1,
  explanation: "B preserves evidence while containing the immediate risk.",
});

describe("validateRemediationPayload", () => {
  it("accepts exactly three complete questions and assigns server-owned ids", () => {
    const result = validateRemediationPayload({ questions: [validQuestion(1), validQuestion(1), validQuestion(1)] });
    expect(result).toHaveLength(3);
    expect(result?.map(question => question.id)).toEqual([9_000_000, 9_000_001, 9_000_002]);
  });

  it("rejects an invalid answer index", () => {
    const invalid = { ...validQuestion(1), answerIndex: 4 };
    expect(validateRemediationPayload({ questions: [invalid, validQuestion(2), validQuestion(3)] })).toBeNull();
  });

  it("rejects incomplete and oversized model output", () => {
    expect(validateRemediationPayload({ questions: [validQuestion(1)] })).toBeNull();
    const oversized = { ...validQuestion(1), explanation: "x".repeat(6001) };
    expect(validateRemediationPayload({ questions: [oversized, validQuestion(2), validQuestion(3)] })).toBeNull();
  });
});
