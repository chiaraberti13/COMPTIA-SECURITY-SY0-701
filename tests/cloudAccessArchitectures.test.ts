import { beforeAll, describe, expect, it } from "vitest";
import { DOMAIN_3_TOPICS } from "../src/data";
import { SOURCES, sourcesOf } from "../src/contentReview";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";

beforeAll(loadEnglishOverlay);

const keys = ["SDWANArchitecture", "SASEArchitecture", "CASBArchitecture", "SWGArchitecture", "FWaaSArchitecture"];
const active = (lang: "it" | "en") => Object.values(getAllTopics(lang)).flat().flatMap(group => group.subtopics);

describe.each(["it", "en"] as const)("cloud access architecture concepts (%s)", lang => {
  it("exposes one autonomous searchable entry per acronym and no composite duplicate", () => {
    const concepts = active(lang);
    for (const key of keys) {
      const matches = concepts.filter(item => item.checklistKey === key);
      expect(matches, key).toHaveLength(1);
      expect(matches[0].name).toMatch(/SD-WAN|SASE|CASB|SWG|FWaaS/);
      expect(matches[0].details).toMatch(lang === "it" ? /Piccolo Esempio Concentrato/ : /Focused Mini-Example/);
    }
    expect(concepts.some(item => item.checklistKey === "ModernCloudNetArchitectures")).toBe(false);
  });

  it("distinguishes connectivity, converged architecture and security services", () => {
    const byKey = Object.fromEntries(active(lang).map(item => [item.checklistKey, item]));
    expect(byKey.SDWANArchitecture.definition.toLowerCase()).toMatch(lang === "it" ? /connettività/ : /connectivity/);
    expect(byKey.SASEArchitecture.details).toContain("SD-WAN");
    expect(byKey.SASEArchitecture.details).toMatch(lang === "it" ? /non dimostra/ : /does not prove/);
    expect(byKey.CASBArchitecture.details).toContain("SaaS");
    expect(byKey.CASBArchitecture.details).toContain("SWG");
    expect(byKey.SWGArchitecture.details).toContain("CASB");
    expect(byKey.FWaaSArchitecture.details).toContain("SASE");
  });

  it("does not claim that every implementation contains every capability", () => {
    const concepts = active(lang).filter(item => keys.includes(item.checklistKey));
    const corpus = concepts.map(item => `${item.definition} ${item.details} ${item.examTip}`).join(" ");
    expect(corpus).toMatch(lang === "it" ? /funzioni effettivamente acquistate|funzioni acquistate/ : /functions actually purchased|purchased flows and functions/);
    expect(corpus).toMatch(lang === "it" ? /non garantisce|non dimostra/ : /does not guarantee|does not prove/);
  });
});

describe("migration and primary sources", () => {
  it("retains the old stable ID only as a deprecated source record", () => {
    const old = DOMAIN_3_TOPICS.flatMap(group => group.subtopics).find(item => item.checklistKey === "ModernCloudNetArchitectures")!;
    expect(old.deprecated).toMatchObject({ since: "2026-10-09" });
  });

  it("maps objective 3.2 to Cisco architecture and Microsoft CASB documentation", () => {
    expect(SOURCES.ciscoSase.url).toContain("cisco.com");
    expect(SOURCES.microsoftDefenderCloudApps.url).toContain("learn.microsoft.com");
    expect(sourcesOf(["3.2"]).map(source => source.title)).toEqual(expect.arrayContaining([
      "Cisco — What Is SASE?", "Microsoft Defender for Cloud Apps overview",
    ]));
  });
});
