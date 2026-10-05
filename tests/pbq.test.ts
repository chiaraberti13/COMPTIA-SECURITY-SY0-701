import { describe, expect, it } from "vitest";
import {
  KIND_MECHANIC,
  correctOrder,
  gradePbq,
  isMatchingCorrect,
  isOrderingCorrect,
  isResponseComplete,
  matchingCorrectCount,
  moveStep,
  orderingCorrectCount,
  pbqItemCount,
  type MatchingPbq,
  type OrderingPbq,
} from "../src/pbq";

const ordering: OrderingPbq = {
  id: 1,
  kind: "ordering",
  mechanic: "ordering",
  objective: "1.3",
  domain: 1,
  title: "t",
  scenario: "s",
  prompt: "p",
  explanation: "e",
  steps: [
    { id: "a", text: "first" },
    { id: "b", text: "second" },
    { id: "c", text: "third" },
  ],
};

const matching: MatchingPbq = {
  id: 2,
  kind: "matching",
  mechanic: "matching",
  objective: "2.2",
  domain: 2,
  title: "t",
  scenario: "s",
  prompt: "p",
  explanation: "e",
  prompts: [
    { id: "p1", text: "one", correctOptionId: "o1" },
    { id: "p2", text: "two", correctOptionId: "o2" },
  ],
  options: [
    { id: "o1", text: "A" },
    { id: "o2", text: "B" },
    { id: "o3", text: "distractor" },
  ],
};

describe("KIND_MECHANIC", () => {
  it("maps the five themes onto the two mechanics", () => {
    expect(KIND_MECHANIC).toEqual({
      ordering: "ordering",
      incident: "ordering",
      matching: "matching",
      log: "matching",
      control: "matching",
    });
  });
});

describe("moveStep", () => {
  it("moves an item down and up", () => {
    expect(moveStep(["a", "b", "c"], 0, 1)).toEqual(["b", "a", "c"]);
    expect(moveStep(["a", "b", "c"], 2, -1)).toEqual(["a", "c", "b"]);
  });

  it("is a no-op past the ends and returns a new array", () => {
    const order = ["a", "b", "c"];
    expect(moveStep(order, 0, -1)).toEqual(["a", "b", "c"]);
    expect(moveStep(order, 2, 1)).toEqual(["a", "b", "c"]);
    expect(moveStep(order, 0, -1)).not.toBe(order);
  });
});

describe("ordering grading", () => {
  it("knows the authored order", () => {
    expect(correctOrder(ordering)).toEqual(["a", "b", "c"]);
  });

  it("counts items in their correct position", () => {
    expect(orderingCorrectCount(ordering, ["a", "b", "c"])).toBe(3);
    expect(orderingCorrectCount(ordering, ["a", "c", "b"])).toBe(1);
    expect(orderingCorrectCount(ordering, ["c", "b", "a"])).toBe(1);
  });

  it("passes only on the exact sequence", () => {
    expect(isOrderingCorrect(ordering, ["a", "b", "c"])).toBe(true);
    expect(isOrderingCorrect(ordering, ["b", "a", "c"])).toBe(false);
    expect(isOrderingCorrect(ordering, ["a", "b"])).toBe(false);
  });

  it("grades with per-item correctness", () => {
    const grade = gradePbq(ordering, { order: ["a", "c", "b"] });
    expect(grade).toMatchObject({ correct: 1, total: 3, passed: false });
    expect(grade.perItem).toEqual({ a: true, b: false, c: false });
  });
});

describe("matching grading", () => {
  it("counts correctly matched prompts", () => {
    expect(matchingCorrectCount(matching, { p1: "o1", p2: "o2" })).toBe(2);
    expect(matchingCorrectCount(matching, { p1: "o1", p2: "o3" })).toBe(1);
    expect(matchingCorrectCount(matching, {})).toBe(0);
  });

  it("passes only when every prompt is right", () => {
    expect(isMatchingCorrect(matching, { p1: "o1", p2: "o2" })).toBe(true);
    expect(isMatchingCorrect(matching, { p1: "o2", p2: "o1" })).toBe(false);
  });

  it("grades with per-item correctness", () => {
    const grade = gradePbq(matching, { matches: { p1: "o1", p2: "o3" } });
    expect(grade).toMatchObject({ correct: 1, total: 2, passed: false });
    expect(grade.perItem).toEqual({ p1: true, p2: false });
  });
});

describe("isResponseComplete", () => {
  it("treats a full ordering as complete and a short one as not", () => {
    expect(isResponseComplete(ordering, { order: ["a", "b", "c"] })).toBe(true);
    expect(isResponseComplete(ordering, { order: ["a", "b"] })).toBe(false);
  });

  it("requires every matching prompt to be assigned", () => {
    expect(isResponseComplete(matching, { matches: { p1: "o1", p2: "o2" } })).toBe(true);
    expect(isResponseComplete(matching, { matches: { p1: "o1" } })).toBe(false);
    expect(isResponseComplete(matching, { matches: { p1: "o1", p2: "" } })).toBe(false);
  });
});

describe("pbqItemCount", () => {
  it("counts steps for ordering and prompts for matching", () => {
    expect(pbqItemCount(ordering)).toBe(3);
    expect(pbqItemCount(matching)).toBe(2);
  });
});
