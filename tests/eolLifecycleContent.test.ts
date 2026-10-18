import { beforeAll, describe, expect, it } from "vitest";
import { CONCEPT_CITATIONS } from "../src/citations";
import { SOURCES } from "../src/contentReview";
import { getAllTopics, getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";

beforeAll(loadEnglishOverlay);

const concept = (lang: "it" | "en") => Object.values(getAllTopics(lang)).flat().flatMap(group => group.subtopics)
  .find(item => item.checklistKey === "LegacyEOLVuln")!;

describe.each(["it", "en"] as const)("EOL lifecycle terminology (%s)", lang => {
  it("makes EOL, EOS and EOSL searchable while preserving the stable concept", () => {
    const item = concept(lang);
    expect(item.name).toContain("EOL");
    expect(item.name).toContain("EOS");
    expect(item.name).toContain("EOSL");
    expect(item.details).toContain("LDOS");
    expect(item.details).toMatch(lang === "it" ? /sigle non sono universali/ : /acronyms are not universal/i);
  });

  it("separates legacy, end of sale, maintenance end and final support", () => {
    const item = concept(lang);
    expect(item.comparativeTable?.rows).toHaveLength(4);
    expect(item.comparativeTable?.rows.map(row => row[0])).toEqual([
      "Legacy", "EOS — 01/07/2027",
      lang === "it" ? "Fine manutenzione — 01/07/2028" : "Maintenance end — 01/07/2028",
      "EOSL / LDOS — 01/07/2030",
    ]);
    expect(item.examTip).toMatch(lang === "it" ? /fine vendita non implica automaticamente fine patch/ : /end of sale does not automatically mean end of patches/i);
  });

  it("uses a synthetic schedule without promising that exceptional patches are impossible", () => {
    const item = concept(lang);
    expect(item.details).toContain("01/07/2028");
    expect(item.details).toContain("01/07/2030");
    expect(item.details).toMatch(lang === "it" ? /eventuale aggiornamento eccezionale/ : /exceptional update/);
    expect(item.details).toContain(lang === "it" ? "segmentazione" : "segmentation");
    expect(item.details).toContain("virtual patching");
  });

  it("keeps question 468 aligned with vendor-policy milestones", () => {
    const question = getDomainQuestions(2, lang).find(item => sourceQuestionId(item.id) === 468)!;
    expect(question.scenario).toMatch(lang === "it" ? /policy del vendor/ : /vendor policy/);
    expect(question.scenario).toMatch(lang === "it" ? /eccezionali non sono garantiti/ : /exceptional action is not guaranteed/);
    expect(question.explanation).toContain(lang === "it" ? "fine vendita" : "End of sale");
  });
});

describe("official lifecycle source", () => {
  it("links the concept and objective to Cisco's policy", () => {
    expect(SOURCES.ciscoEolPolicy).toMatchObject({ publisher: "Cisco", kind: "reference" });
    expect(SOURCES.ciscoEolPolicy.url).toBe("https://www.cisco.com/c/en/us/products/eos-eol-policy.html");
    expect(CONCEPT_CITATIONS["2:LegacyEOLVuln"]).toEqual([{ source: "ciscoEolPolicy" }]);
  });
});
