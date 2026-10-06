// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { buildAcronymDeck } from "../src/flashcards";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);

const aliases = [
  ["XSS", "XSSAttack", "Cross-Site Scripting (XSS)"],
  ["CSRF", "CSRFAttack", "Cross-Site Request Forgery (CSRF) (XSRF)"],
  ["XSRF", "CSRFAttack", "Cross-Site Request Forgery (CSRF) (XSRF)"],
  ["SSRF", "SSRFAttack", "Server-Side Request Forgery (SSRF)"],
] as const;

describe.each(["it", "en"] as const)("web attack glossary integration (%s)", (lang) => {
  it.each(aliases)("finds %s in the rendered glossary", async (query, _key, name) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: query } });
    expect(screen.getByRole("heading", { level: 3, name }).textContent).toBe(name);
  });

  it("resolves XSRF and CSRF to one definition in text and flashcards", () => {
    const topics = getAllTopics(lang);
    const index = buildGlossaryIndex(Object.values(topics).flat().flatMap((g) => g.subtopics));
    for (const [alias, key] of aliases) {
      expect(index.byAcronym.get(alias)?.id).toBe(key);
      expect(findGlossaryTerms([alias], index)[0]?.id).toBe(key);
    }
    const deck = buildAcronymDeck(topics);
    const csrf = deck.find((card) => card.acronym === "CSRF");
    const xsrf = deck.find((card) => card.acronym === "XSRF");
    expect(csrf?.conceptKey).toBe("CSRFAttack");
    expect(xsrf?.conceptKey).toBe(csrf?.conceptKey);
    expect(xsrf?.definition).toBe(csrf?.definition);
  });
});
