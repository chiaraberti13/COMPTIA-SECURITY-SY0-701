import { describe, expect, it } from "vitest";
import {
  OBJECTIVE_SOURCES,
  SOURCES,
  SOURCES_MAPPED_ON,
  sourcesOf,
  type SourceId,
} from "../src/contentReview";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("content source registry", () => {
  it("covers exactly the 28 official objectives", () => {
    expect(Object.keys(OBJECTIVE_SOURCES).sort()).toEqual([...ALL_OBJECTIVES].sort());
  });

  it("gives every objective the exam objectives and at least one more primary source", () => {
    for (const [code, review] of Object.entries(OBJECTIVE_SOURCES)) {
      expect(review.sources[0], code).toBe("comptiaSecurityPlus");
      const primary = review.sources.filter(id => SOURCES[id].kind !== "reference");
      expect(primary.length, `${code} has no standard besides the exam objectives`).toBeGreaterThanOrEqual(2);
      expect(new Set(review.sources).size, `${code} repeats a source`).toBe(review.sources.length);
    }
  });

  it("records when sources were mapped", () => {
    expect(SOURCES_MAPPED_ON).toMatch(ISO_DATE);
  });

  it("lists only HTTPS sources, every one of them used by some objective", () => {
    const used = new Set(Object.values(OBJECTIVE_SOURCES).flatMap(r => r.sources));
    for (const [id, source] of Object.entries(SOURCES)) {
      expect(source.url, id).toMatch(/^https:\/\/[^\s]+$/);
      expect(used.has(id as SourceId), `${id} is never used`).toBe(true);
    }
  });

  it("merges the sources of several objectives once each, primary ones first", () => {
    const merged = sourcesOf(["2.3", "4.3"]);
    expect(merged.map(s => s.publisher)).toEqual(["CompTIA", "NIST", "NIST", "OWASP Foundation", "CISA", "FIRST", "Tenable", "Tenable"]);
    expect(merged.map(s => s.title).filter(t => t.startsWith("SP 800-"))).toEqual(["SP 800-53 Rev. 5 — Security and Privacy Controls", "SP 800-40 Rev. 4 — Enterprise Patch Management Planning"]);
  });
});
