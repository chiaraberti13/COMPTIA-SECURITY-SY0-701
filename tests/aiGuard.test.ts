import { describe, expect, it } from "vitest";
import { createDailyBudget, readLimit } from "../server/aiGuard";

const DAY = 24 * 60 * 60 * 1000;
const MONDAY = Date.UTC(2026, 8, 21, 10, 0, 0);

describe("readLimit", () => {
  it("uses the default when the variable is missing or empty", () => {
    expect(readLimit(undefined, 500)).toBe(500);
    expect(readLimit("", 500)).toBe(500);
    expect(readLimit("   ", 500)).toBe(500);
  });

  it("accepts whole non-negative numbers, including 0", () => {
    expect(readLimit("1200", 500)).toBe(1200);
    expect(readLimit("0", 500)).toBe(0);
  });

  it("never lets a typo remove the limit", () => {
    for (const value of ["-1", "abc", "1.5", "Infinity", "1e999", "NaN"]) {
      expect(readLimit(value, 500)).toBe(500);
    }
  });
});

describe("createDailyBudget", () => {
  it("allows exactly `limit` calls in a day", () => {
    const budget = createDailyBudget(3);
    expect([1, 2, 3, 4].map(() => budget.tryConsume(MONDAY))).toEqual([true, true, true, false]);
    expect(budget.remaining(MONDAY)).toBe(0);
  });

  it("resets at the next UTC day", () => {
    const budget = createDailyBudget(1);
    expect(budget.tryConsume(MONDAY)).toBe(true);
    expect(budget.tryConsume(MONDAY + 60_000)).toBe(false);
    expect(budget.tryConsume(MONDAY + DAY)).toBe(true);
  });

  it("switches the AI off when the limit is 0", () => {
    const budget = createDailyBudget(0);
    expect(budget.tryConsume(MONDAY)).toBe(false);
    expect(budget.remaining(MONDAY)).toBe(0);
  });

  it("reports what is left without consuming it", () => {
    const budget = createDailyBudget(5);
    budget.tryConsume(MONDAY);
    expect(budget.remaining(MONDAY)).toBe(4);
    expect(budget.remaining(MONDAY)).toBe(4);
  });
});
