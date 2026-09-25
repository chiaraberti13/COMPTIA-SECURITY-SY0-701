import { describe, expect, it } from "vitest";
import { EXAM_QUESTION_COUNT, examBlueprint } from "../src/quiz";

const WEIGHTS = { 1: 12, 2: 22, 3: 18, 4: 28, 5: 20 };
const PLENTY = { 1: 100, 2: 100, 3: 100, 4: 100, 5: 100 };
const sum = (r: Record<number, number>) => Object.values(r).reduce((a, b) => a + b, 0);

describe("examBlueprint", () => {
  it("splits 90 questions by the official SY0-701 weights", () => {
    expect(examBlueprint(WEIGHTS, PLENTY)).toEqual({ 1: 11, 2: 20, 3: 16, 4: 25, 5: 18 });
    expect(EXAM_QUESTION_COUNT).toBe(90);
  });

  it("always adds up to the total when enough questions exist", () => {
    for (let total = 1; total <= 200; total++) expect(sum(examBlueprint(WEIGHTS, PLENTY, total))).toBe(total);
  });

  it("never asks a domain for more questions than its bank holds", () => {
    const scarce = { 1: 3, 2: 100, 3: 100, 4: 100, 5: 100 };
    const counts = examBlueprint(WEIGHTS, scarce);
    expect(counts[1]).toBe(3);
    expect(sum(counts)).toBe(90);
  });

  it("returns what exists when the banks are too small", () => {
    expect(sum(examBlueprint(WEIGHTS, { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }))).toBe(5);
  });
});
