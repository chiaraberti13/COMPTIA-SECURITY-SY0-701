// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DomainGuidePanel from "../src/components/DomainGuidePanel";
import { DOMAIN_GUIDES_IT, type DomainGuide } from "../src/domainGuides";
import { getDomainRoute } from "../src/domainRoutes";
import { buildGlossaryIndex } from "../src/glossaryIndex";
import { getDomainTopics } from "../src/localizedData";
import { LanguageProvider } from "../src/i18n";

const GLOSSARY = buildGlossaryIndex([1, 2, 3, 4, 5].flatMap((d) => getDomainTopics(d, "it").flatMap((g) => g.subtopics)));

/*
 * Component tests for the domain guide, rendered in a simulated DOM. They check
 * what a learner and a screen reader get, not implementation details.
 */

beforeEach(() => localStorage.setItem("comptia_sy0701_lang", "it"));
afterEach(cleanup);

function renderGuide(guide: DomainGuide, onAction = vi.fn()) {
  const view = render(
    <LanguageProvider>
      <DomainGuidePanel guide={guide} route={getDomainRoute(guide.domainId, "it")} onAction={onAction} glossaryIndex={GLOSSARY} />
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

  it("shows each common trap as a \"common mistake\" callout", () => {
    const panel = renderGuide(guide);
    const mistakes = panel.querySelectorAll('[data-callout="mistake"]');
    expect(mistakes).toHaveLength(guide.commonTraps!.length);
    for (const box of mistakes) expect(within(box as HTMLElement).getByText("Errore comune")).toBeTruthy();
  });

  it("keeps each exercise's reasoning folded until the learner asks for it", () => {
    const panel = renderGuide(guide);
    // The folded answers, told apart from the deepenings by their summary.
    const exercises = Array.from(panel.querySelectorAll<HTMLDetailsElement>("details details")).filter(
      (d) => d.querySelector("summary")?.textContent === "Mostra il ragionamento"
    );
    expect(exercises).toHaveLength(guide.practiceScenarios!.length);
    const first = exercises[0];
    expect(first.open).toBe(false);
    fireEvent.click(within(first).getByText("Mostra il ragionamento"));
    expect(first.open).toBe(true);
    expect(within(first).getByText(guide.practiceScenarios![0].reasoning)).toBeTruthy();
  });

  it("shows the attack chain of an exercise inside its folded reasoning, each step labelled", () => {
    const panel = renderGuide(guide);
    const scenario = guide.practiceScenarios!.find((s) => s.attackChain)!;
    const exercise = Array.from(panel.querySelectorAll<HTMLDetailsElement>("details details")).find((d) =>
      d.textContent?.includes(scenario.attackChain!.limit)
    )!;
    expect(exercise.open).toBe(false);
    fireEvent.click(within(exercise).getByText("Mostra il ragionamento"));
    expect(within(exercise).getByText("Attacco, controlli e rilevazione")).toBeTruthy();
    const labels = Array.from(exercise.querySelectorAll("dt")).map((dt) => dt.textContent);
    expect(labels).toEqual(["Vettore", "Impatto", "Mitigazione", "Evidenza", "Limite del controllo"]);
    const values = Array.from(exercise.querySelectorAll("dd")).map((dd) => dd.textContent);
    const { vector, impact, mitigation, evidence, limit } = scenario.attackChain!;
    expect(values).toEqual([vector, impact, mitigation, evidence, limit]);
  });

  it("shows the attack chain of the applied scenario after its reasoning", () => {
    renderGuide(guide);
    expect(screen.getByText(guide.appliedScenario.attackChain!.mitigation)).toBeTruthy();
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

  it("lists the sources of the domain, primary before secondary, with accessible external links", () => {
    const panel = renderGuide(guide);
    const section = panel.querySelector<HTMLDetailsElement>("#guide_sources_1")!;
    expect(section.open).toBe(false);
    const primary = within(section).getByText(/^Fonti primarie/).nextElementSibling!;
    expect(within(primary as HTMLElement).getByRole("link", { name: /CompTIA Security\+/ })).toBeTruthy();
    for (const link of within(section).getAllByRole("link")) {
      expect(link.getAttribute("href")).toMatch(/^https:\/\//);
      expect(link.getAttribute("rel")).toBe("noopener noreferrer");
      expect(link.textContent).toMatch(/si apre in una nuova scheda/);
    }
  });

  it("opens with a table of contents whose every entry points at a section of this guide", () => {
    const panel = renderGuide(guide);
    const nav = within(panel).getByRole("navigation", { name: "In questa guida" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Prima di iniziare",
      "Obiettivi e risultati attesi",
      "Percorso di studio consigliato",
      "Pattern decisionali d'esame",
      "Collegamenti tra domini",
      "Confronti chiave",
      "Errori comuni",
      "Esame e realtà",
      "Scenario applicativo",
      "Esercizi guidati",
      "Riepilogo di fine modulo",
      "Fonti",
      "Dove proseguire",
    ]);
    for (const link of links) {
      const target = link.getAttribute("href")!.slice(1);
      expect(panel.querySelector(`#${target}`), target).not.toBeNull();
    }
  });

  it("lists only the sections a guide has", () => {
    const minimal: DomainGuide = { ...guide, comparisons: undefined, commonTraps: undefined, practiceScenarios: undefined };
    const nav = within(renderGuide(minimal)).getByRole("navigation", { name: "In questa guida" });
    const labels = within(nav).getAllByRole("link").map((a) => a.textContent);
    expect(labels).not.toContain("Confronti chiave");
    expect(labels).not.toContain("Errori comuni");
    expect(labels).not.toContain("Esercizi guidati");
    expect(labels).toHaveLength(10);
  });

  it("keeps the core open and folds the deepenings, each tagged as such", () => {
    const panel = renderGuide(guide);
    const folded = ["connections", "comparisons", "practice_gap"].map(
      (key) => panel.querySelector(`#guide_h_${key}_${guide.domainId}`) as HTMLDetailsElement
    );
    folded.push(panel.querySelector(`#guide_sources_${guide.domainId}`) as HTMLDetailsElement);
    for (const section of folded) {
      expect(section.tagName).toBe("DETAILS");
      expect(section.open).toBe(false);
      // The summary says it is a deepening and names the section with a heading.
      const summary = section.querySelector(":scope > summary")!;
      expect(summary.textContent).toMatch(/^Approfondimento/);
      expect(summary.querySelector("h3")).not.toBeNull();
    }
    // The core sections are plain headings, never folded.
    for (const key of ["objectives", "path", "patterns", "traps", "scenario", "practice", "summary"]) {
      const heading = panel.querySelector(`#guide_h_${key}_${guide.domainId}`)!;
      expect(heading.tagName, key).toBe("H3");
      expect(heading.closest("details")?.id, key).toBe(`domain_guide_${guide.domainId}`);
    }
  });

  it("moves focus to the chosen section, opening the sources when they are folded", () => {
    // jsdom does not lay out the page, so it has no scrollIntoView.
    Element.prototype.scrollIntoView = vi.fn();
    const panel = renderGuide(guide);
    panel.open = true;
    const nav = within(panel).getByRole("navigation", { name: "In questa guida" });

    fireEvent.click(within(nav).getByRole("link", { name: "Errori comuni" }));
    expect(document.activeElement?.textContent).toBe("Errori comuni");
    expect(document.activeElement?.tagName).toBe("H3");

    const sources = panel.querySelector(`#guide_sources_${guide.domainId}`) as HTMLDetailsElement;
    expect(sources.open).toBe(false);
    fireEvent.click(within(nav).getByRole("link", { name: "Fonti" }));
    expect(sources.open).toBe(true);
    expect(document.activeElement).toBe(sources.querySelector("summary"));

    // A folded deepening opens the same way.
    const comparisons = panel.querySelector(`#guide_h_comparisons_${guide.domainId}`) as HTMLDetailsElement;
    fireEvent.click(within(nav).getByRole("link", { name: "Confronti chiave" }));
    expect(comparisons.open).toBe(true);
    expect(document.activeElement).toBe(comparisons.querySelector("summary"));
  });

  it("sets what the exam expects beside how it works in practice, each labelled in words", () => {
    const panel = renderGuide(guide);
    const list = panel.querySelector(`#guide_exam_vs_practice_${guide.domainId}`)!;
    const items = within(list as HTMLElement).getAllByRole("listitem");
    expect(items).toHaveLength(guide.examVsPractice!.length);
    for (const [i, item] of items.entries()) {
      const notes = within(item).getAllByRole("note");
      expect(notes.map((n) => n.getAttribute("data-callout"))).toEqual(["exam", "practice"]);
      expect(within(notes[0]).getByText("All'esame")).toBeTruthy();
      expect(within(notes[1]).getByText("Nella pratica")).toBeTruthy();
      expect(notes[1].textContent).toContain(guide.examVsPractice![i].practice);
    }
  });
});
