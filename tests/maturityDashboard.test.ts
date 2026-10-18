import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MATURITY_DASHBOARD_PATH, renderMaturityDashboard } from "../scripts/maturity-dashboard";

/*
 * Project maturity dashboard (ROADMAP: "Dashboard di maturità del progetto").
 * docs/maturity-dashboard.md is generated from the same modules the app uses,
 * so it cannot drift from reality, and the file-up-to-date check fails CI when
 * someone changes questions, guides, objectives, sources or review dates
 * without regenerating it with `npm run maturity-dashboard`.
 */
describe("docs/maturity-dashboard.md", () => {
  const rendered = renderMaturityDashboard();

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is up to date: run `npm run maturity-dashboard` after changing content or review dates", () => {
    expect(readFileSync(MATURITY_DASHBOARD_PATH, "utf8")).toBe(rendered);
  });

  it("covers the six roadmap dimensions as sections", () => {
    for (const heading of [
      "## 1. Copertura dei contenuti",
      "## 2. Freschezza delle revisioni",
      "## 3. Link",
      "## 4. Accessibilità",
      "## 5. Sicurezza — OpenSSF Scorecard e supply chain",
      "## 6. Stato delle traduzioni",
    ]) {
      expect(rendered).toContain(heading);
    }
  });

  it("is deterministic: the output never depends on the current clock", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-01-01T00:00:00Z"));
    expect(renderMaturityDashboard()).toBe(rendered);
    expect(rendered).not.toContain("2030-01-01");
  });

  it("documents every objective as covered and shows no uncovered objective", () => {
    expect(rendered).toContain("28 / 28");
  });
});
