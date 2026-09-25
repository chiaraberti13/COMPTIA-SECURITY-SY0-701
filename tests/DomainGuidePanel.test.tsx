// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import DomainGuidePanel from "../src/components/DomainGuidePanel";
import { DOMAIN_GUIDES_IT, type DomainGuide } from "../src/domainGuides";
import { LanguageProvider } from "../src/i18n";

/*
 * Component tests for the domain guide, rendered in a simulated DOM. They check
 * what a learner and a screen reader get, not implementation details.
 */

beforeEach(() => localStorage.setItem("comptia_sy0701_lang", "it"));
afterEach(cleanup);

function renderGuide(guide: DomainGuide) {
  const view = render(
    <LanguageProvider>
      <DomainGuidePanel guide={guide} />
    </LanguageProvider>
  );
  return view.container.querySelector(`#domain_guide_${guide.domainId}`) as HTMLDetailsElement;
}

describe("DomainGuidePanel", () => {
  const guide = DOMAIN_GUIDES_IT[1];

  it("starts folded and opens from its summary", () => {
    const panel = renderGuide(guide);
    expect(panel.open).toBe(false);
    fireEvent.click(panel.querySelector(":scope > summary")!);
    expect(panel.open).toBe(true);
    expect(within(panel).getByRole("heading", { level: 2, name: guide.title })).toBeTruthy();
  });

  it("lists every objective with its official sub-topics as a labelled list", () => {
    renderGuide(guide);
    for (const objective of guide.objectives) {
      const list = screen.getByRole("list", { name: `Argomenti ufficiali dell'obiettivo ${objective.code}` });
      expect(within(list).getAllByRole("listitem")).toHaveLength(objective.keyTopics!.length);
    }
  });

  it("renders each comparison as a captioned table in a keyboard-reachable region", () => {
    renderGuide(guide);
    for (const comparison of guide.comparisons!) {
      const region = screen.getByRole("region", { name: `Tabella scorrevole: ${comparison.title}` });
      expect(region.getAttribute("tabindex")).toBe("0");
      const table = within(region).getByRole("table", { name: comparison.title });
      expect(within(table).getAllByRole("columnheader")).toHaveLength(comparison.headers.length);
      expect(within(table).getAllByRole("rowheader")).toHaveLength(comparison.rows.length);
    }
  });

  it("labels each common trap in words, not only with colour", () => {
    renderGuide(guide);
    expect(screen.getAllByText("Errato:")).toHaveLength(guide.commonTraps!.length);
    expect(screen.getAllByText("Corretto:")).toHaveLength(guide.commonTraps!.length);
  });

  it("keeps each exercise's reasoning folded until the learner asks for it", () => {
    const panel = renderGuide(guide);
    const exercises = Array.from(panel.querySelectorAll<HTMLDetailsElement>("details details"));
    expect(exercises).toHaveLength(guide.practiceScenarios!.length);
    const first = exercises[0];
    expect(first.open).toBe(false);
    fireEvent.click(within(first).getByText("Mostra il ragionamento"));
    expect(first.open).toBe(true);
    expect(within(first).getByText(guide.practiceScenarios![0].reasoning)).toBeTruthy();
  });

  it("omits the optional sections when a guide does not provide them", () => {
    const minimal: DomainGuide = {
      ...guide,
      objectives: guide.objectives.map(({ code, outcome }) => ({ code, outcome })),
      comparisons: undefined,
      commonTraps: undefined,
      practiceScenarios: undefined,
    };
    const panel = renderGuide(minimal);
    expect(panel.querySelector("table")).toBeNull();
    expect(within(panel).queryByText("Errori comuni")).toBeNull();
    expect(within(panel).queryByText("Esercizi guidati")).toBeNull();
    expect(within(panel).queryByRole("list", { name: /Argomenti ufficiali/ })).toBeNull();
    // The mandatory sections are still there.
    expect(within(panel).getByText(minimal.appliedScenario.title, { exact: false })).toBeTruthy();
  });
});
