// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useQuizSetup } from "../src/hooks/useQuizSetup";
import type { Question } from "../src/types";

/* The simulator set-up screen: presets, per-domain counts and the draw. */

afterEach(cleanup);

const maxByDomain = { 1: 30, 2: 40, 3: 35, 4: 50, 5: 45 };
const renderSetup = () => renderHook(() => useQuizSetup({ maxByDomain }));
const questionsOf = (domain: number, n: number) =>
  Array.from({ length: n }, (_, i) => ({ id: domain * 1000 + i }) as Question);

describe("useQuizSetup", () => {
  it("starts on the full set with the Balanced counts", () => {
    const { result } = renderSetup();
    expect(result.current.quizFocus).toBe("all");
    expect(result.current.customCounts).toEqual({ 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 });
    expect(result.current.totalQuestionsSelected).toBe(25);
  });

  it("applies each preset", () => {
    const { result } = renderSetup();
    act(() => result.current.applyPreset("mini"));
    expect(result.current.totalQuestionsSelected).toBe(10);
    act(() => result.current.applyPreset("all"));
    expect(result.current.customCounts).toEqual(maxByDomain);
    act(() => result.current.applyPreset("domain3"));
    expect(result.current.customCounts).toEqual({ 1: 0, 2: 0, 3: 35, 4: 0, 5: 0 });
    expect(result.current.quizFocus).toBe("domain3");
  });

  it("turns any change of a single domain into a custom set-up", () => {
    const { result } = renderSetup();
    act(() => result.current.applyPreset("mini"));
    act(() => result.current.setDomainCount(4, 7));
    expect(result.current.quizFocus).toBe("custom");
    expect(result.current.customCounts[4]).toBe(7);
    expect(result.current.totalQuestionsSelected).toBe(15);

    act(() => result.current.applyCounts({ 1: 11, 2: 20, 3: 16, 4: 25, 5: 18 }));
    expect(result.current.totalQuestionsSelected).toBe(90);
  });

  it("draws the configured number from each domain, in domain order", () => {
    const { result } = renderSetup();
    act(() => result.current.applyCounts({ 1: 2, 2: 0, 3: 1, 4: 3, 5: 1 }));
    const drawn = result.current.draw({
      1: questionsOf(1, 10), 2: questionsOf(2, 10), 3: questionsOf(3, 10), 4: questionsOf(4, 2), 5: [],
    });
    // Domain 4 has only 2 questions and domain 5 none: the draw never invents any.
    expect(drawn.map(q => Math.floor(q.id / 1000))).toEqual([1, 1, 3, 4, 4]);
    expect(new Set(drawn.map(q => q.id)).size).toBe(drawn.length);
  });
});
