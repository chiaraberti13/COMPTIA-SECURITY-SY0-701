// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DomainGuidePanel from "../src/components/DomainGuidePanel";
import { DOMAIN_GUIDES_IT, type DomainGuide } from "../src/domainGuides";
import { getDomainRoute } from "../src/domainRoutes";
import { LanguageProvider } from "../src/i18n";

/*
 * Component tests for the domain guide, rendered in a simulated DOM. They check
 * what a learner and a screen reader get, not implementation details.
 */

beforeEach(() => localStorage.setItem("comptia_sy0701_lang", "it"));
afterEach(cleanup);

function renderGuide(guide: DomainGuide, onAction = vi.fn()) {
  const view = render(
    <LanguageProvider>
      <DomainGuidePanel guide={guide} route={getDomainRoute(guide.domainId, "it")} onAction={onAction} />
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
    const exercises = Array.from(panel.querySelectorAll<HTMLDetailsElement>("details details")).filter(
      (d) => !d.id.startsWith("guide_sources_")
    );
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

  it("frames the guide with what to know before and where to go next, each link a named button", () => {
    const onAction = vi.fn();
    renderGuide(guide, onAction);
    const before = screen.getByRole("region", { name: "Prima di iniziare" });
    const next = screen.getByRole("region", { name: "Dove proseguire" });
    const route = getDomainRoute(1, "it");
    expect(within(before).getAllByRole("listitem")).toHaveLength(route.before.length);
    expect(within(next).getAllByRole("listitem")).toHaveLength(route.next.length);

    fireEvent.click(within(next).getByRole("button", { name: "Vai all'obiettivo 3.3" }));
    expect(onAction).toHaveBeenCalledWith({ kind: "guide", domain: 3, objective: "3.3" });
  });

  it("lists the sources of the domain, primary before secondary, and says how many objectives a person reviewed", () => {
    const panel = renderGuide(guide);
    const section = panel.querySelector<HTMLDetailsElement>("#guide_sources_1")!;
    expect(section.open).toBe(false);
    expect(within(section).getByText(/revisionati da una persona: 0 su 4/)).toBeTruthy();
    const primary = within(section).getByText(/^Fonti primarie/).nextElementSibling!;
    expect(within(primary as HTMLElement).getByRole("link", { name: /CompTIA Security\+/ })).toBeTruthy();
    for (const link of within(section).getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link.textContent).toMatch(/si apre in una nuova scheda/);
    }
  });
});
