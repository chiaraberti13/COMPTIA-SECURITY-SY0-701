import { describe, expect, it } from "vitest";
import { getDomainQuestions, getDomainTopics } from "../src/localizedData";
import { acronymsOf, buildAcronymIndex, findGlossaryTerms } from "../src/glossaryIndex";
import type { Subtopic } from "../src/types";

const sub = (name: string, checklistKey: string): Subtopic =>
  ({ name, checklistKey, definition: `def of ${name}`, details: "", examTip: "" }) as Subtopic;

describe("acronymsOf", () => {
  it("reads an acronym term and acronyms in parentheses", () => {
    expect(acronymsOf("SIEM")).toEqual(["SIEM"]);
    expect(acronymsOf("TACACS+")).toEqual(["TACACS+"]);
    expect(acronymsOf("Zero Trust Architecture (ZTA)")).toEqual(["ZTA"]);
    expect(acronymsOf("Security Orchestration (SOAR) and SIEM")).toEqual(["SOAR"]);
  });

  it("ignores words, single letters and codes that are not acronyms", () => {
    for (const term of ["Firewall", "A", "Q3", "802.1X", "Option (B)"]) expect(acronymsOf(term)).toEqual([]);
  });
});

describe("buildAcronymIndex", () => {
  it("drops an acronym that names two different terms instead of guessing", () => {
    const index = buildAcronymIndex([
      sub("Mandatory Access Control (MAC)", "mac1"),
      sub("Media Access Control (MAC)", "mac2"),
      sub("SIEM", "siem"),
      sub("SIEM", "siem-dup"),
    ]);
    expect(index.has("MAC")).toBe(false);
    expect(index.get("SIEM")?.id).toBe("siem");
  });
});

describe("findGlossaryTerms", () => {
  const index = buildAcronymIndex([sub("SIEM", "siem"), sub("Zero Trust Architecture (ZTA)", "zta"), sub("TACACS+", "tac")]);

  it("finds acronyms as whole tokens, in order, once each", () => {
    const found = findGlossaryTerms(["Use a SIEM with ZTA.", "SIEM again, and TACACS+ too; SIEMs or XSIEM are not matches"], index);
    expect(found.map((h) => h.id)).toEqual(["siem", "zta", "tac"]);
  });

  it("respects the limit and the excluded entry", () => {
    expect(findGlossaryTerms(["SIEM ZTA TACACS+"], index, 2).map((h) => h.id)).toEqual(["siem", "zta"]);
    expect(findGlossaryTerms(["SIEM ZTA"], index, 6, "siem").map((h) => h.id)).toEqual(["zta"]);
  });
});

describe("on the real content", () => {
  const DOMAINS = [1, 2, 3, 4, 5];
  const subtopics = DOMAINS.flatMap((d) => getDomainTopics(d, "it").flatMap((g) => g.subtopics));
  const index = buildAcronymIndex(subtopics);

  it("indexes dozens of acronyms, each with a definition", () => {
    expect(index.size).toBeGreaterThan(50);
    for (const hint of index.values()) expect(hint.definition.trim().length).toBeGreaterThan(20);
  });

  it("links a glossary term to a large share of the questions", () => {
    const questions = DOMAINS.flatMap((d) => getDomainQuestions(d, "it"));
    const linked = questions.filter((q) => findGlossaryTerms([q.question, q.explanation], index).length > 0);
    expect(linked.length / questions.length).toBeGreaterThan(0.3);
  });
});
