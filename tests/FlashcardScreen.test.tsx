// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import FlashcardScreen from "../src/components/FlashcardScreen";
import { useFlashcards } from "../src/hooks/useFlashcards";
import { LanguageProvider } from "../src/i18n";
import type { AcronymCard } from "../src/flashcards";

/*
 * The acronym flashcard drill as the learner uses it: pick a deck, flip a card,
 * self-assess with worded buttons that feed the spaced-repetition schedule, and
 * read a summary. Operable from the keyboard; the answer is announced politely;
 * nothing relies on colour alone (WCAG 1.4.1).
 */

const DECK: AcronymCard[] = [
  {
    id: "SIEM",
    acronym: "SIEM",
    expansion: "Security Information and Event Management",
    definition: "Platform that collects and correlates logs.",
    examTip: "Remember event correlation.",
    conceptKey: "SIEM",
    domainId: 1,
    objectives: ["1.4"],
  },
  {
    id: "MFA",
    acronym: "MFA",
    expansion: "Multi-Factor Authentication",
    definition: "Two or more independent factors.",
    conceptKey: "MFAConcept_New",
    domainId: 4,
    objectives: ["4.6"],
  },
];

function Harness({ deck }: { deck: AcronymCard[] }) {
  const session = useFlashcards();
  return <FlashcardScreen session={session} deck={deck} />;
}

function renderHarness(deck: AcronymCard[] = DECK) {
  localStorage.setItem("comptia_sy0701_lang", "it");
  render(
    <LanguageProvider>
      <Harness deck={deck} />
    </LanguageProvider>
  );
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("Flashcard chooser", () => {
  it("shows the deck stats and both start buttons", () => {
    renderHarness();
    expect(document.getElementById("flash_start_review")!.textContent).toContain("2");
    expect(document.getElementById("flash_start_all")!.textContent).toContain("2");
    // 4 stat tiles rendered.
    expect(document.querySelectorAll("#flash_stats > div").length).toBe(4);
  });

  it("filters the deck by domain", () => {
    renderHarness();
    fireEvent.change(screen.getByLabelText("Dominio"), { target: { value: "4" } });
    // Only the one domain-4 card remains.
    expect(document.getElementById("flash_start_all")!.textContent).toContain("1");
  });
});

describe("Flashcard run", () => {
  it("reveals the answer, announces it, and advances on 'I knew it'", () => {
    renderHarness();
    fireEvent.click(document.getElementById("flash_start_all")!);

    // First card prompts with the acronym; the answer is hidden until revealed.
    expect(document.getElementById("flash_prompt")!.textContent).toBe("SIEM");
    expect(document.getElementById("flash_answer")).toBeNull();
    expect(document.getElementById("flash_answer_announcer")!.textContent).toBe("");

    fireEvent.click(document.getElementById("flash_reveal")!);
    expect(document.getElementById("flash_answer_text")!.textContent).toBe("Security Information and Event Management");
    // Definition and exam tip provide context on the reveal.
    expect(screen.getByText("Platform that collects and correlates logs.")).toBeTruthy();
    expect(screen.getByText("Remember event correlation.")).toBeTruthy();
    // The reveal is announced through the polite live region.
    expect(document.getElementById("flash_answer_announcer")!.textContent).toContain("Security Information and Event Management");

    // Worded self-assessment (not colour alone) advances to the next card.
    fireEvent.click(document.getElementById("flash_knew")!);
    expect(document.getElementById("flash_prompt")!.textContent).toBe("MFA");
  });

  it("quizzes meaning → acronym when that direction is chosen", () => {
    renderHarness();
    fireEvent.click(document.getElementById("flash_dir_expansionToAcronym")!);
    fireEvent.click(document.getElementById("flash_start_all")!);
    expect(document.getElementById("flash_prompt")!.textContent).toBe("Security Information and Event Management");
    fireEvent.click(document.getElementById("flash_reveal")!);
    expect(document.getElementById("flash_answer_text")!.textContent).toBe("SIEM");
  });

  it("is operable from the keyboard: space reveals, 2 marks it known", () => {
    renderHarness();
    fireEvent.click(document.getElementById("flash_start_all")!);
    fireEvent.keyDown(window, { key: " " });
    expect(document.getElementById("flash_answer_text")).toBeTruthy();
    fireEvent.keyDown(window, { key: "2" });
    // Advanced to the second card.
    expect(document.getElementById("flash_prompt")!.textContent).toBe("MFA");
  });

  it("summarises the run and lists the missed cards with their expansion", () => {
    renderHarness();
    fireEvent.click(document.getElementById("flash_start_all")!);

    // Miss the first, know the second.
    fireEvent.click(document.getElementById("flash_reveal")!);
    fireEvent.click(document.getElementById("flash_didnt_know")!);
    fireEvent.click(document.getElementById("flash_reveal")!);
    fireEvent.click(document.getElementById("flash_knew")!);

    expect(document.getElementById("flash_summary_score")!.textContent).toContain("1/2");
    const missed = document.getElementById("flash_missed")!;
    expect(within(missed).getByText("SIEM")).toBeTruthy();
    expect(within(missed).getByText("Security Information and Event Management")).toBeTruthy();
  });

  it("persists the schedule so a missed card is due and a known one is not", () => {
    renderHarness();
    fireEvent.click(document.getElementById("flash_start_all")!);
    fireEvent.click(document.getElementById("flash_reveal")!);
    fireEvent.click(document.getElementById("flash_knew")!); // SIEM known -> scheduled ahead
    fireEvent.click(document.getElementById("flash_reveal")!);
    fireEvent.click(document.getElementById("flash_didnt_know")!); // MFA missed -> due now

    const saved = JSON.parse(localStorage.getItem("comptia_sy0701_acronym_progress")!);
    expect(saved.SIEM.streak).toBe(1);
    expect(saved.SIEM.dueAt).toBeGreaterThan(Date.now());
    expect(saved.MFA.streak).toBe(0);
    expect(saved.MFA.dueAt).toBeLessThanOrEqual(Date.now());
  });
});
