import { describe, expect, it } from "vitest";
import { conceptAnchor, guideAnchor, parseStudyAnchor, type DomainId } from "../src/studyAnchors";
import { getDomainTopics } from "../src/localizedData";
import { ALL_OBJECTIVES } from "../src/questionObjectives";

/* Stable links to concepts and guides (src/studyAnchors.ts). */

const conceptExists = (domain: DomainId, key: string) => getDomainTopics(domain, "it").some((g) => g.subtopics.some((s) => s.checklistKey === key));
const objectiveExists = (objective: string) => ALL_OBJECTIVES.includes(objective);
const parse = (hash: string) => parseStudyAnchor(hash, conceptExists, objectiveExists);

describe("stable study anchors", () => {
  it("open every concept of every domain", () => {
    for (const domain of [1, 2, 3, 4, 5] as DomainId[]) {
      for (const sub of getDomainTopics(domain, "it").flatMap((g) => g.subtopics)) {
        expect(parse(conceptAnchor(domain, sub.checklistKey)), sub.checklistKey).toEqual({ kind: "concept", domain, checklistKey: sub.checklistKey });
      }
    }
  });

  it("open a guide and each objective in its own domain", () => {
    expect(parse(guideAnchor(3))).toEqual({ kind: "guide", domain: 3 });
    for (const objective of ALL_OBJECTIVES) {
      const domain = Number(objective[0]) as DomainId;
      expect(parse(guideAnchor(domain, objective)), objective).toEqual({ kind: "guide", domain, objective });
    }
  });

  it("do nothing for a link that names nothing real", () => {
    for (const hash of [
      "",
      "#",
      "#studio/4/NoSuchConcept",
      "#studio/6/CVE", // no Domain 6
      "#studio/2/CVE", // CVE is a Domain 4 key
      "#guida/2/1.4", // objective of another domain
      "#guida/5/5.9", // no such objective
      "#quiz",
    ]) {
      expect(parse(hash), hash).toBeNull();
    }
  });

  it("reject hostile input instead of passing it on", () => {
    for (const hash of [
      "#studio/1/<img src=x onerror=alert(1)>",
      "#studio/1/%3Cscript%3E",
      "#studio/1/CIATriad/../../etc",
      "#studio/1/" + "A".repeat(200),
      "#studio/1/%E0%A4%A", // malformed percent-encoding
      "#guida/1/javascript:alert(1)",
    ]) {
      expect(parse(hash), hash).toBeNull();
    }
  });
});
