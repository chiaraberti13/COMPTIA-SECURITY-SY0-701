// @vitest-environment jsdom
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { STORAGE_KEYS } from "../src/storage";

/**
 * Glossary search must be accent-insensitive. Many core Italian terms carry a
 * diacritic ("Integrità", "Disponibilità", "Autenticità"); a learner who types
 * them without the accent — a common habit — used to get zero results, which
 * read as a broken search. This pins the fix (src/components/GlossarySection.tsx,
 * foldText) so it cannot regress.
 */

const countCards = () => document.querySelectorAll('[id^="glossary_card_"]').length;

beforeEach(() => {
  // Force the Italian dataset: it is the source of truth and holds the accents.
  localStorage.setItem(STORAGE_KEYS.lang, "it");
});

afterEach(cleanup);

async function renderGlossary() {
  render(
    <LanguageProvider>
      <GlossarySection />
    </LanguageProvider>
  );
  await waitFor(() => expect(document.getElementById("glossary_search_input")).not.toBeNull());
  return document.getElementById("glossary_search_input") as HTMLInputElement;
}

const search = (input: HTMLInputElement, value: string) =>
  fireEvent.change(input, { target: { value } });

describe("glossary search", () => {
  it("finds an accented term typed without its accent", async () => {
    const input = await renderGlossary();

    search(input, "integrità");
    const withAccent = countCards();
    expect(withAccent).toBeGreaterThan(0);

    search(input, "integrita");
    expect(countCards()).toBe(withAccent);
  });

  it("matches diacritics in both directions for a second core term", async () => {
    const input = await renderGlossary();

    search(input, "disponibilità");
    const withAccent = countCards();
    expect(withAccent).toBeGreaterThan(0);

    search(input, "disponibilita");
    expect(countCards()).toBe(withAccent);
  });

  it("Enter in the search box scrolls to the results and leaves the filter intact", async () => {
    const input = await renderGlossary();
    // jsdom has no layout engine: stub scrollIntoView to observe the call.
    const scrolled: Element[] = [];
    Element.prototype.scrollIntoView = function (this: Element) {
      scrolled.push(this);
    };

    search(input, "backup");
    const filtered = countCards();
    expect(filtered).toBeGreaterThan(0);

    input.focus();
    fireEvent.keyDown(input, { key: "Enter" });

    expect(scrolled.map((el) => el.id)).toEqual(["glossary_results"]);
    expect(document.activeElement).not.toBe(input);
    expect(countCards()).toBe(filtered);
  });

  it("a short query matches word starts only and lists the exact term first", async () => {
    const input = await renderGlossary();
    const total = countCards();

    search(input, "RTO");
    const cards = [...document.querySelectorAll('[id^="glossary_card_"]')];
    // "rto" used to match inside "supporto", "report", "importante"...: ~150 of 850.
    expect(cards.length).toBeGreaterThan(0);
    expect(cards.length).toBeLessThan(total / 5);
    // The RTO entry itself comes first.
    expect(cards[0].querySelector("h3")?.textContent?.toUpperCase()).toContain("RTO");

    // Partial words still work from their start: "integr" finds "Integrità".
    search(input, "integr");
    expect(countCards()).toBeGreaterThan(0);
  });

  it("still matches plain terms and returns nothing for a non-existent one", async () => {
    const input = await renderGlossary();

    search(input, "backup");
    expect(countCards()).toBeGreaterThan(0);

    search(input, "zzzznotaterm");
    expect(countCards()).toBe(0);
  });
});
