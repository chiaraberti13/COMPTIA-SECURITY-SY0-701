import { describe, expect, it } from "vitest";
import { getDomainQuestions, getDomainTopics } from "../src/localizedData";
import { acronymsOf, buildAcronymIndex, buildGlossaryIndex, findGlossaryTerms, fullNameOf } from "../src/glossaryIndex";
import { DOMAIN_GUIDES_IT } from "../src/domainGuides";
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

describe("fullNameOf", () => {
  it("keeps the multi-word phrase and drops the trailing acronym", () => {
    expect(fullNameOf("Zero Trust Architecture (ZTA)")).toBe("Zero Trust Architecture");
    expect(fullNameOf("Public Key")).toBe("Public Key");
  });

  it("returns null for a single word or a bare acronym, which the acronym path covers", () => {
    for (const term of ["Firewall", "Hashing", "SIEM", "TACACS+", "Worm"]) expect(fullNameOf(term)).toBeNull();
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

describe("buildGlossaryIndex", () => {
  it("indexes multi-word names but not single words or bare acronyms", () => {
    const index = buildGlossaryIndex([sub("Zero Trust", "zt"), sub("Hashing", "hash"), sub("SIEM", "siem")]);
    expect(index.byName.has("zero trust")).toBe(true);
    expect(index.byName.has("hashing")).toBe(false);
    expect(index.byAcronym.has("SIEM")).toBe(true);
  });

  it("drops a full name that points at two different concepts", () => {
    const index = buildGlossaryIndex([sub("Access Control", "ac1"), sub("Access Control", "ac2")]);
    expect(index.byName.has("access control")).toBe(false);
  });
});

describe("findGlossaryTerms", () => {
  const index = buildGlossaryIndex([
    sub("SIEM", "siem"),
    sub("Zero Trust Architecture (ZTA)", "zta"),
    sub("TACACS+", "tac"),
    sub("Logic Bomb", "bomb"),
  ]);

  it("finds acronyms and full names in order of appearance, once each", () => {
    const found = findGlossaryTerms(
      ["Plant a Logic Bomb, then use a SIEM with ZTA.", "SIEM again, and TACACS+ too; SIEMs or XSIEM are not matches"],
      index
    );
    expect(found.map((h) => h.id)).toEqual(["bomb", "siem", "zta", "tac"]);
  });

  it("matches a full name as a whole phrase, case-insensitively, not inside a word", () => {
    expect(findGlossaryTerms(["a logic bomb detonates"], index).map((h) => h.id)).toEqual(["bomb"]);
    expect(findGlossaryTerms(["the logicbomber script"], index)).toEqual([]);
  });

  it("shows the full name on the chip, not an acronym", () => {
    expect(findGlossaryTerms(["Logic Bomb"], index)[0].label).toBe("Logic Bomb");
  });

  it("respects the limit and the excluded entry", () => {
    expect(findGlossaryTerms(["SIEM ZTA TACACS+"], index, 2).map((h) => h.id)).toEqual(["siem", "zta"]);
    expect(findGlossaryTerms(["SIEM ZTA"], index, 6, "siem").map((h) => h.id)).toEqual(["zta"]);
  });
});

describe("on the real content", () => {
  const DOMAINS = [1, 2, 3, 4, 5];
  const subtopics = DOMAINS.flatMap((d) => getDomainTopics(d, "it").flatMap((g) => g.subtopics));
  const index = buildGlossaryIndex(subtopics);

  it("indexes dozens of acronyms and full names, each with a definition", () => {
    expect(index.byAcronym.size).toBeGreaterThan(50);
    expect(index.byName.size).toBeGreaterThan(100);
    for (const hint of [...index.byAcronym.values(), ...index.byName.values()]) {
      expect(hint.definition.trim().length).toBeGreaterThan(20);
    }
  });

  it("links a glossary term to a large share of the questions", () => {
    const questions = DOMAINS.flatMap((d) => getDomainQuestions(d, "it"));
    const linked = questions.filter((q) => findGlossaryTerms([q.question, q.explanation], index).length > 0);
    expect(linked.length / questions.length).toBeGreaterThan(0.3);
  });

  it("links a glossary term from the official sub-topics of every domain guide", () => {
    for (const d of DOMAINS) {
      const texts = DOMAIN_GUIDES_IT[d].objectives.flatMap((o) => [o.outcome, ...(o.keyTopics ?? [])]);
      expect(findGlossaryTerms(texts, index, 8).length).toBeGreaterThan(0);
    }
  });
});
