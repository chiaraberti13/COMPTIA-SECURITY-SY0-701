import { describe, expect, it } from "vitest";
import {
  OBJECTIVE_REVIEW,
  SOURCES,
  SOURCES_MAPPED_ON,
  reviewSummary,
  sourcesOf,
  type SourceId,
} from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const today = new Date().toISOString().slice(0, 10);

describe("content review registry", () => {
  it("covers exactly the 28 official objectives", () => {
    expect(Object.keys(OBJECTIVE_REVIEW).sort()).toEqual([...ALL_OBJECTIVES].sort());
  });

  it("gives every objective the exam objectives and at least one more primary source", () => {
    for (const [code, review] of Object.entries(OBJECTIVE_REVIEW)) {
      expect(review.sources[0], code).toBe("comptiaSecurityPlus");
      const primary = review.sources.filter(id => SOURCES[id].kind !== "reference");
      expect(primary.length, `${code} has no standard besides the exam objectives`).toBeGreaterThanOrEqual(2);
      expect(new Set(review.sources).size, `${code} repeats a source`).toBe(review.sources.length);
    }
  });

  it("counts as reviewed only what a person reviewed, with the date and who", () => {
    for (const [code, review] of Object.entries(OBJECTIVE_REVIEW)) {
      if (review.status === "reviewed") {
        expect(review.lastReviewed, code).toMatch(ISO_DATE);
        expect(review.lastReviewed! <= today, `${code} is reviewed in the future`).toBe(true);
        expect(review.reviewer, code).toMatch(/^[A-Za-z0-9-]+$/);
      } else {
        // A pending objective must not look reviewed.
        expect(review.lastReviewed === null || review.status === "deprecated", code).toBe(true);
      }
    }
    expect(SOURCES_MAPPED_ON).toMatch(ISO_DATE);
  });

  it("lists only HTTPS sources, every one of them used by some objective", () => {
    const used = new Set(Object.values(OBJECTIVE_REVIEW).flatMap(r => r.sources));
    for (const [id, source] of Object.entries(SOURCES)) {
      expect(source.url, id).toMatch(/^https:\/\/[^\s]+$/);
      expect(used.has(id as SourceId), `${id} is never used`).toBe(true);
    }
  });

  it("merges the sources of several objectives once each, primary ones first", () => {
    const merged = sourcesOf(["2.3", "4.3"]);
    expect(merged.map(s => s.publisher)).toEqual(["CompTIA", "NIST", "NIST", "OWASP Foundation", "CISA", "FIRST"]);
    expect(merged.map(s => s.title).filter(t => t.startsWith("SP 800-"))).toEqual(["SP 800-53 Rev. 5 — Security and Privacy Controls", "SP 800-40 Rev. 4 — Enterprise Patch Management Planning"]);
    expect(reviewSummary(["1.1", "1.2", "9.9"])).toEqual({ reviewed: 0, "needs-review": 2, deprecated: 0 });
  });
});
