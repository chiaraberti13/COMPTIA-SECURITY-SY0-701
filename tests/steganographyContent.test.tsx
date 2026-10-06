// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymDeck } from "../src/flashcards";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);

describe.each(["it", "en"] as const)("steganography in the glossary (%s)", (lang) => {
  it.each(["steganografia", "steganography"])("finds the same canonical entry using %s", async (query) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: query } });
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toMatch(/Steganograf|Steganograph/);
  });

  it("does not invent an acronym flashcard for a full-name concept", () => {
    const topics = getAllTopics(lang);
    const entries = Object.values(topics).flat().flatMap((g) => g.subtopics)
      .filter((s) => s.checklistKey === "SteganographyConcept");
    expect(entries).toHaveLength(1);
    expect(buildAcronymDeck(topics).some((card) => card.conceptKey === "SteganographyConcept")).toBe(false);
  });
});
