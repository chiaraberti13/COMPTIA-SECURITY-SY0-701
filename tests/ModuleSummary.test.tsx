// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import ModuleSummary from "../src/components/ModuleSummary";
import { DOMAIN_GUIDES_IT, readinessCheckId } from "../src/domainGuides";
import { LanguageProvider } from "../src/i18n";
import { STORAGE_KEYS } from "../src/storage";

/*
 * The end-of-module summary as the learner uses it: key points, acronyms and
 * the correct reading of the frequent mistakes, then a self-assessment whose
 * ticks survive a reload and stay separate for each domain.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem(STORAGE_KEYS.lang, "it");
});
afterEach(cleanup);

const guide = DOMAIN_GUIDES_IT[1];
const saved = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.selfAssessment) ?? "{}");

function renderSummary(g = guide) {
  return render(
    <LanguageProvider>
      <ModuleSummary guide={g} headingProps={{ id: `guide_h_summary_${g.domainId}`, tabIndex: -1 }} />
    </LanguageProvider>
  );
}

describe("ModuleSummary", () => {
  it("is a region named by its heading, with key points, acronyms and mistakes", () => {
    renderSummary();
    const region = screen.getByRole("region", { name: "Riepilogo di fine modulo" });
    for (const point of guide.keyPoints) expect(within(region).getByText(point)).toBeTruthy();
    const terms = Array.from(region.querySelectorAll("dt")).map((dt) => dt.textContent);
    expect(terms).toEqual(guide.acronyms.map((a) => a.acronym));
    // Expansions are English in both languages, and said so to screen readers.
    for (const dd of region.querySelectorAll("dd")) expect(dd.getAttribute("lang")).toBe("en");
    for (const trap of guide.commonTraps!) expect(within(region).getByText(trap.correction)).toBeTruthy();
  });

  it("offers each self-assessment point as a labelled checkbox of one group", () => {
    renderSummary();
    const group = screen.getByRole("group", { name: "Autovalutazione" });
    const boxes = within(group).getAllByRole("checkbox");
    expect(boxes).toHaveLength(guide.readinessChecks.length);
    expect(within(group).getByRole("checkbox", { name: guide.readinessChecks[0] })).toBe(boxes[0]);
    expect(screen.getByRole("status").textContent).toBe(`Punti spuntati: 0 su ${guide.readinessChecks.length}.`);
  });

  it("remembers the ticks after a reload and unticks on a second click", () => {
    renderSummary();
    fireEvent.click(screen.getAllByRole("checkbox")[1]);
    expect(saved()).toEqual({ [readinessCheckId(1, 1)]: true });
    expect(screen.getByRole("status").textContent).toBe(`Punti spuntati: 1 su ${guide.readinessChecks.length}.`);

    cleanup();
    renderSummary();
    const boxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
    expect(boxes.map((b) => b.checked)).toEqual(guide.readinessChecks.map((_, i) => i === 1));
    fireEvent.click(boxes[1]);
    expect(saved()).toEqual({});
  });

  it("keeps the ticks of another domain and says when every point is ticked", () => {
    localStorage.setItem(STORAGE_KEYS.selfAssessment, JSON.stringify({ [readinessCheckId(2, 0)]: true }));
    renderSummary();
    for (const box of screen.getAllByRole("checkbox")) fireEvent.click(box);
    expect(Object.keys(saved())).toHaveLength(guide.readinessChecks.length + 1);
    expect(saved()[readinessCheckId(2, 0)]).toBe(true);
    expect(screen.getByRole("status").textContent).toMatch(/^Tutti i punti spuntati/);
  });

  it("ignores a tampered stored value instead of breaking the guide", () => {
    localStorage.setItem(STORAGE_KEYS.selfAssessment, JSON.stringify(["<img src=x>", 3]));
    renderSummary();
    expect((screen.getAllByRole("checkbox") as HTMLInputElement[]).every((b) => !b.checked)).toBe(true);
  });
});
