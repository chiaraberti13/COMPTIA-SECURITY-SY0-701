import { describe, expect, it } from "vitest";
import { DOMAIN_GUIDES_EN, DOMAIN_GUIDES_IT, type DomainGuide } from "../src/domainGuides";

/*
 * Rules for the optional, richer guide sections (key topics, comparisons,
 * common traps, practice scenarios). The mandatory sections are covered in
 * dataset.test.ts. Domains are enriched one at a time: ENRICHED_DOMAINS lists
 * those that must carry every optional section, and grows with each domain.
 */

const DOMAIN_IDS = [1, 2, 3, 4, 5] as const;
const ENRICHED_DOMAINS = [1] as const;

/**
 * Official SY0-701 sub-topics per objective. Each must be named in the English
 * key topics of that objective, so the guide stays a complete syllabus map.
 */
const OFFICIAL_SUBTOPICS: Record<string, string[]> = {
  "1.1": [
    "technical", "managerial", "operational", "physical",
    "preventive", "deterrent", "detective", "corrective", "compensating", "directive",
  ],
  "1.2": [
    "CIA", "non-repudiation", "authenticating people", "systems", "authorization models", "accounting",
    "gap analysis", "adaptive identity", "threat scope reduction", "policy-driven access control",
    "Policy Engine", "Policy Administrator", "implicit trust zones", "subject/system",
    "Policy Enforcement Point", "bollards", "access control vestibule", "fencing", "video surveillance",
    "security guard", "access badge", "lighting", "infrared", "pressure", "microwave", "ultrasonic",
    "honeypot", "honeynet", "honeyfile", "honeytoken",
  ],
  "1.3": [
    "approval process", "ownership", "stakeholders", "impact analysis", "test results", "backout plan",
    "maintenance window", "standard operating procedure", "allow lists", "deny lists",
    "restricted activities", "downtime", "service restart", "application restart",
    "legacy applications", "dependencies", "diagrams", "policies", "procedures", "version control",
  ],
  "1.4": [
    "public key", "private key", "key escrow", "full-disk", "partition", "file", "volume", "database",
    "record", "transport", "asymmetric", "symmetric", "key exchange", "algorithms", "key length",
    "TPM", "HSM", "key management system", "secure enclave", "steganography", "tokenization",
    "data masking", "hashing", "salting", "digital signatures", "key stretching", "blockchain",
    "open public ledger", "certificate authorities", "CRL", "OCSP", "self-signed", "third-party",
    "root of trust", "CSR", "wildcard",
  ],
};

const pairs = DOMAIN_IDS.map((d) => [d, DOMAIN_GUIDES_IT[d], DOMAIN_GUIDES_EN[d]] as const);

const shape = (guide: DomainGuide) => ({
  keyTopics: guide.objectives.map((o) => o.keyTopics?.length ?? 0),
  comparisons: (guide.comparisons ?? []).map((c) => [c.headers.length, c.rows.length]),
  commonTraps: guide.commonTraps?.length ?? 0,
  practice: (guide.practiceScenarios ?? []).map((s) => s.objective),
});

describe("domain guide optional sections", () => {
  it("keep Italian and English structurally aligned", () => {
    for (const [, itGuide, enGuide] of pairs) {
      expect(shape(enGuide)).toEqual(shape(itGuide));
    }
  });

  it.each(["it", "en"] as const)("contain no empty or malformed %s entries", (lang) => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      const guide = (lang === "it" ? DOMAIN_GUIDES_IT : DOMAIN_GUIDES_EN)[d];
      const codes = guide.objectives.map((o) => o.code);
      for (const o of guide.objectives) {
        if (o.keyTopics?.some((topic) => !topic.trim())) broken.push(`D${d} ${o.code}: empty key topic`);
      }
      for (const c of guide.comparisons ?? []) {
        if (!c.title.trim() || c.headers.length < 2 || c.rows.length < 2) broken.push(`D${d} "${c.title}": too small`);
        if (c.rows.some((row) => row.length !== c.headers.length)) broken.push(`D${d} "${c.title}": row width`);
        if ([...c.headers, ...c.rows.flat()].some((cell) => !cell.trim())) broken.push(`D${d} "${c.title}": empty cell`);
        const firstCells = c.rows.map((row) => row[0]);
        if (new Set(firstCells).size !== firstCells.length) broken.push(`D${d} "${c.title}": duplicate row`);
      }
      for (const trap of guide.commonTraps ?? []) {
        if (!trap.misconception.trim() || trap.correction.trim().length < 60) broken.push(`D${d}: thin trap`);
      }
      for (const s of guide.practiceScenarios ?? []) {
        if (!codes.includes(s.objective)) broken.push(`D${d} "${s.title}": unknown objective ${s.objective}`);
        if (!s.title.trim() || s.prompt.trim().length < 80 || s.reasoning.trim().length < 180) {
          broken.push(`D${d} "${s.title}": thin scenario`);
        }
      }
      const titles = (guide.practiceScenarios ?? []).map((s) => s.title);
      if (new Set(titles).size !== titles.length) broken.push(`D${d}: duplicate scenario title`);
    }
    expect(broken).toEqual([]);
  });

  it.each(ENRICHED_DOMAINS)("are complete for enriched domain %i", (d) => {
    for (const guide of [DOMAIN_GUIDES_IT[d], DOMAIN_GUIDES_EN[d]]) {
      expect(guide.objectives.every((o) => (o.keyTopics?.length ?? 0) > 0)).toBe(true);
      expect(guide.comparisons?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(guide.commonTraps?.length ?? 0).toBeGreaterThanOrEqual(5);
      const trained = new Set((guide.practiceScenarios ?? []).map((s) => s.objective));
      expect(guide.objectives.filter((o) => !trained.has(o.code)).map((o) => o.code)).toEqual([]);
    }
  });

  it("name every official sub-topic of the enriched objectives", () => {
    const missing: string[] = [];
    for (const [code, subtopics] of Object.entries(OFFICIAL_SUBTOPICS)) {
      const d = Number(code.split(".")[0]) as (typeof DOMAIN_IDS)[number];
      const objective = DOMAIN_GUIDES_EN[d].objectives.find((o) => o.code === code);
      const text = (objective?.keyTopics ?? []).join(" | ").toLowerCase();
      for (const subtopic of subtopics) {
        if (!text.includes(subtopic.toLowerCase())) missing.push(`${code}: ${subtopic}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
