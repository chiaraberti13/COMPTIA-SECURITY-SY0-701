import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SOURCES, SOURCES_MAPPED_ON } from "../src/contentReview";
import { buildReport, languagePairs, linkErrors, SOURCES_MAX_AGE_DAYS, type ReportInput } from "../scripts/maintenance-report";

/*
 * scripts/maintenance-report.ts (ROADMAP: "Automatizzare le issue
 * ricorrenti"), the body of the monthly maintenance issue opened by
 * .github/workflows/maintenance.yml.
 */

// The summary table lychee 0.24 writes with --format markdown, as it printed it.
const LYCHEE_FAILED = `# Summary

| Status         | Count |
|----------------|-------|
| 🔍 Total       | 3     |
| ✅ Successful  | 1     |
| ⏳ Timeouts    | 1     |
| 🚫 Errors      | 1     |

## Errors per input

### Errors in docs/x.md

* [ERROR] <https://example.com/gone> (at 1:1) | 404 Not Found
`;
const LYCHEE_CLEAN = LYCHEE_FAILED.replace("| ⏳ Timeouts    | 1     |", "| ⏳ Timeouts    | 0     |").replace("| 🚫 Errors      | 1     |", "| 🚫 Errors      | 0     |");

const base: ReportInput = {
  date: SOURCES_MAPPED_ON,
  audit: { metadata: { vulnerabilities: { critical: 0, high: 0, moderate: 0, low: 0, info: 0, total: 0 } }, vulnerabilities: {} },
  outdated: {},
  links: LYCHEE_CLEAN,
  pairs: [{ files: ["README.md", "README.it.md"], ahead: [0, 0] }],
};

describe("maintenance report", () => {
  it("reports a clean month as clean, in four sections", () => {
    const report = buildReport(base);
    expect(report.match(/^## \d\. /gm)).toEqual(["## 1. ", "## 2. ", "## 3. ", "## 4. "]);
    expect(report).toContain("✅ Tutti i link esterni rispondono.");
    expect(report).toContain("✅ `npm audit`: nessuna vulnerabilità nota.");
    expect(report).toContain("✅ Tutte le dipendenze dirette sono all'ultima versione.");
    expect(report).toContain("✅ In ogni coppia le due lingue sono state aggiornate insieme.");
  });

  it("counts lychee errors and timeouts and keeps its detail", () => {
    expect(linkErrors(LYCHEE_FAILED)).toBe(2);
    expect(linkErrors(LYCHEE_CLEAN)).toBe(0);
    const report = buildReport({ ...base, links: LYCHEE_FAILED });
    expect(report).toContain("**2** link non raggiungibili");
    expect(report).toContain("<https://example.com/gone>");
    expect(buildReport({ ...base, links: undefined })).toContain("non è stato eseguito");
  });

  it("lists every non-exam source to confirm, and flags an old mapping", () => {
    const report = buildReport(base);
    for (const source of Object.values(SOURCES)) expect(report).toContain(source.url);
    expect(report).not.toContain("⚠️ L'associazione");
    const late = new Date(Date.parse(SOURCES_MAPPED_ON) + (SOURCES_MAX_AGE_DAYS + 1) * 86_400_000).toISOString().slice(0, 10);
    expect(buildReport({ ...base, date: late })).toContain(`⚠️ L'associazione fra obiettivi e fonti`);
  });

  it("lists the vulnerable packages and the major updates to plan", () => {
    const report = buildReport({
      ...base,
      audit: {
        metadata: { vulnerabilities: { high: 1, moderate: 1, total: 2 } },
        vulnerabilities: {
          "ip-address": { severity: "moderate", isDirect: false, fixAvailable: true },
          braces: { severity: "high", isDirect: false, fixAvailable: false },
        },
      },
      outdated: { typescript: { current: "5.8.3", wanted: "5.8.3", latest: "7.0.2" }, vite: { current: "8.3.1", wanted: "8.3.2", latest: "8.3.2" } },
    });
    expect(report).toContain("⚠️ `npm audit`: 1 high, 1 moderate.");
    expect(report).toContain("- [ ] `braces` (high, indiretta, nessuna correzione)");
    expect(report).toContain("- [ ] `ip-address` (moderate, indiretta, correzione disponibile)");
    expect(report).toContain("2 dipendenze dirette non sono all'ultima versione");
    expect(report).toContain("| `typescript` | 5.8.3 | 7.0.2 |");
    expect(report).not.toContain("| `vite` |");
  });

  it("names the language that moved ahead in a drifted pair", () => {
    const report = buildReport({ ...base, pairs: [{ files: ["labs/03/README.md", "labs/03/README.en.md"], ahead: [2, 0] }] });
    expect(report).toContain("- [ ] `labs/03/README.md`: 2 commit dopo l'ultimo di `labs/03/README.en.md`");
  });

  it("pairs every translated Markdown document of the repository", () => {
    const files = ["README.md", "README.it.md", "labs/01-x/README.md", "labs/01-x/README.en.md", "CHANGELOG.md", "labs/DATI.md"];
    expect(languagePairs(files)).toEqual([
      ["labs/01-x/README.md", "labs/01-x/README.en.md"],
      ["README.md", "README.it.md"],
    ]);
  });
});

describe("maintenance workflow", () => {
  const workflow = readFileSync(".github/workflows/maintenance.yml", "utf8");

  it("runs monthly and on demand, and may only write issues", () => {
    expect(workflow).toMatch(/^ {4}- cron: "\d+ \d+ 1 \* \*"$/m);
    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toMatch(/^permissions:\n {2}contents: read$/m);
    expect(workflow).toMatch(/permissions:\n {6}contents: read\n {6}issues: write/);
    expect(workflow).not.toMatch(/contents: write|pull-requests: write/);
  });

  it("updates the issue of the month instead of opening a second one", () => {
    expect(workflow).toContain("gh issue list");
    expect(workflow).toContain("gh issue edit");
    expect(workflow).toContain("gh issue create");
  });
});
