import { describe, expect, it } from "vitest";
import { STUDY_PATHS } from "../src/studyPaths";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { factDrift } from "./helpers/languageFacts";

const { it: IT, en: EN } = STUDY_PATHS;

describe("study paths", () => {
  it("offer the four paths of the roadmap, in the same order in both languages", () => {
    expect(IT.map((p) => p.id)).toEqual(["beginner", "refresh", "exam", "practice"]);
    expect(EN.map((p) => p.id)).toEqual(IT.map((p) => p.id));
  });

  it("have the same steps and actions in Italian and English", () => {
    IT.forEach((path, i) => {
      expect(EN[i].steps.map((s) => s.action)).toEqual(path.steps.map((s) => s.action));
    });
  });

  it("keep numbers, acronyms and objective codes identical across languages", () => {
    const drift: string[] = [];
    IT.forEach((path, i) => {
      const pairs: [string, string][] = [
        [path.title, EN[i].title],
        [path.forWhom, EN[i].forWhom],
        ...path.steps.map((s, j): [string, string] => [s.text, EN[i].steps[j].text]),
      ];
      for (const [itText, enText] of pairs) {
        const diff = factDrift(itText, enText);
        if (diff) drift.push(`${path.id}: ${diff}`);
      }
    });
    expect(drift).toEqual([]);
  });

  it("cite only official objectives and give every path at least one action", () => {
    for (const path of [...IT, ...EN]) {
      for (const step of path.steps) {
        for (const code of step.text.match(/\b[1-5]\.[1-9]\b/g) ?? []) expect(ALL_OBJECTIVES).toContain(code);
        expect(step.text.trim().length).toBeGreaterThan(20);
      }
      expect(path.steps.some((s) => s.action)).toBe(true);
    }
  });
});
