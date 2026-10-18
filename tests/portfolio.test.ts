import { describe, expect, it } from "vitest";
import {
  PORTFOLIO_ARTIFACTS,
  portfolioArtifact,
  renderPortfolioMarkdown,
  type PortfolioArtifact,
} from "../src/portfolio";
import { ALL_OBJECTIVES } from "../src/questionObjectives";
import { factDrift } from "./helpers/languageFacts";

const { it: IT, en: EN } = PORTFOLIO_ARTIFACTS;

/** Text pairs (IT, EN) that must say the same facts, for one artifact index. */
function pairs(i: number): [string, string][] {
  const a = IT[i];
  const b = EN[i];
  const out: [string, string][] = [
    [a.title, b.title],
    [a.summary, b.summary],
    [a.skills.join(" "), b.skills.join(" ")],
  ];
  a.sections.forEach((section, s) => {
    out.push([section.heading, b.sections[s].heading]);
    section.body.forEach((block, bi) => {
      const other = b.sections[s].body[bi];
      if (block.type === "p" && other.type === "p") out.push([block.text, other.text]);
      if (block.type === "list" && other.type === "list") {
        block.items.forEach((item, k) => out.push([item, other.items[k]]));
      }
    });
  });
  return out;
}

describe("portfolio artifacts", () => {
  it("offer the same artifacts, kinds and order in both languages", () => {
    expect(IT.map((a) => a.id)).toEqual(["incident-ssh-credential-attack", "runbook-soc-alert-triage", "report-http-security-headers"]);
    expect(EN.map((a) => a.id)).toEqual(IT.map((a) => a.id));
    expect(EN.map((a) => a.kind)).toEqual(IT.map((a) => a.kind));
  });

  it("cover all three deliverable kinds", () => {
    expect(new Set(IT.map((a) => a.kind))).toEqual(new Set(["report", "runbook", "writeup"]));
  });

  it("keep ids in kebab-case and unique", () => {
    const ids = IT.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
  });

  it("cite only official objectives, consistent with the objective domain, and matching across languages", () => {
    IT.forEach((a, i) => {
      expect(a.objectives.length).toBeGreaterThan(0);
      for (const code of a.objectives) {
        expect(ALL_OBJECTIVES).toContain(code);
        // The objective's domain is the first digit; it must be a real domain.
        expect([1, 2, 3, 4, 5]).toContain(Number(code.split(".")[0]));
      }
      expect(EN[i].objectives).toEqual(a.objectives);
      // Objectives are listed sorted and without duplicates.
      expect(a.objectives).toEqual([...new Set(a.objectives)].sort());
    });
  });

  it("point every artifact at an existing lab folder", () => {
    const labs = new Set([
      "01-security-headers",
      "02-prompt-injection",
      "03-log-analysis",
      "04-certificates",
      "05-backup-restore",
      "06-incident-triage",
      "07-linux-hardening",
      "08-linux-iam",
      "09-network-segmentation",
      "10-attack-to-defense",
      "11-telemetry-views",
    ]);
    IT.forEach((a, i) => {
      expect(labs).toContain(a.lab);
      expect(EN[i].lab).toBe(a.lab);
    });
  });

  it("keep numbers, acronyms and objective codes identical across languages", () => {
    const drift: string[] = [];
    IT.forEach((_, i) => {
      for (const [itText, enText] of pairs(i)) {
        const diff = factDrift(itText, enText);
        if (diff) drift.push(`${IT[i].id}: ${diff}`);
      }
    });
    expect(drift).toEqual([]);
  });
});

/** Every IPv4 address in the text, as [a, b, c, d] tuples. */
function ipv4s(text: string): number[][] {
  return (text.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g) ?? []).map((ip) => ip.split(".").map(Number));
}

/** Addresses safe to publish: loopback, RFC 1918 private, RFC 5737 documentation. */
function isSanitizedIp([a, b]: number[]): boolean {
  if (a === 127) return true; // loopback
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 203 && b === 0) return true; // 203.0.113.0/24 doc
  if (a === 198 && b === 51) return true; // 198.51.100.0/24 doc
  return false;
}

describe("portfolio sanitization", () => {
  const all: [PortfolioArtifact, "it" | "en"][] = [
    ...IT.map((a): [PortfolioArtifact, "it" | "en"] => [a, "it"]),
    ...EN.map((a): [PortfolioArtifact, "it" | "en"] => [a, "en"]),
  ];

  it("use only publishable IP addresses", () => {
    for (const [a, lang] of all) {
      const md = renderPortfolioMarkdown(a, lang);
      for (const ip of ipv4s(md)) {
        expect(isSanitizedIp(ip), `${a.id} (${lang}): ${ip.join(".")}`).toBe(true);
      }
    }
  });

  it("use only reserved example domains for any email", () => {
    for (const [a, lang] of all) {
      const md = renderPortfolioMarkdown(a, lang);
      const emails = md.match(/[\w.+-]+@[\w.-]+/g) ?? [];
      for (const email of emails) {
        const domain = email.split("@")[1];
        expect(/(\.example|example\.(com|org))$/.test(domain), `${a.id} (${lang}): ${email}`).toBe(true);
      }
    }
  });

  it("contain no secrets, keys or real credentials", () => {
    const forbidden = [/BEGIN [A-Z ]*PRIVATE KEY/, /AKIA[0-9A-Z]{16}/, /ghp_[0-9A-Za-z]{20}/, /password\s*[:=]\s*\S{6,}/i, /api[_-]?key\s*[:=]/i];
    for (const [a, lang] of all) {
      const md = renderPortfolioMarkdown(a, lang);
      for (const pattern of forbidden) {
        expect(pattern.test(md), `${a.id} (${lang}): ${pattern}`).toBe(false);
      }
    }
  });

  it("name only the fictional company Kestrelia", () => {
    for (const [a, lang] of all) {
      const md = renderPortfolioMarkdown(a, lang);
      // Any mention of a company in these write-ups must be the fictional one.
      if (/company|azienda|corporate|aziendale/i.test(md)) {
        expect(md).toContain("Kestrelia");
      }
    }
  });
});

describe("renderPortfolioMarkdown", () => {
  it("is deterministic", () => {
    for (const lang of ["it", "en"] as const) {
      for (const a of PORTFOLIO_ARTIFACTS[lang]) {
        expect(renderPortfolioMarkdown(a, lang)).toBe(renderPortfolioMarkdown(a, lang));
      }
    }
  });

  it("includes the title, every objective, every heading and the confidentiality note", () => {
    for (const lang of ["it", "en"] as const) {
      const note = lang === "it" ? "Nota di riservatezza" : "Confidentiality note";
      for (const a of PORTFOLIO_ARTIFACTS[lang]) {
        const md = renderPortfolioMarkdown(a, lang);
        expect(md).toContain(`# ${a.title}`);
        expect(md).toContain(`labs/${a.lab}`);
        for (const code of a.objectives) expect(md).toContain(code);
        for (const section of a.sections) expect(md).toContain(`## ${section.heading}`);
        expect(md).toContain(note);
      }
    }
  });

  it("renders list items as Markdown bullets", () => {
    const md = renderPortfolioMarkdown(EN[0], "en");
    expect(md).toMatch(/\n- /);
  });
});

describe("portfolioArtifact", () => {
  it("finds an artifact by id and returns undefined otherwise", () => {
    expect(portfolioArtifact("en", "report-http-security-headers")?.kind).toBe("report");
    expect(portfolioArtifact("it", "does-not-exist")).toBeUndefined();
  });
});
