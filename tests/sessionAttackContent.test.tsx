// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymDeck } from "../src/flashcards";
import { getDomainGuide } from "../src/domainGuides";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);

const terms = [
  ["sidejacking", "SessionHijackingAttack", "Session hijacking (Sidejacking)"],
  ["replay attack", "ReplayAttack", "Replay attack"],
  ["header tampering", "CookieHeaderTampering", "Cookie & Header Tampering"],
] as const;

describe.each(["it", "en"] as const)("session attack learning integration (%s)", (lang) => {
  it.each(terms)("finds %s in the rendered glossary", async (query, _key, name) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: query } });
    expect(screen.getByRole("heading", { level: 3, name }).textContent).toBe(name);
  });

  it("connects canonical concepts to session defenses and original practice", () => {
    const concepts = Object.values(getAllTopics(lang)).flat().flatMap((group) => group.subtopics);
    for (const [, key] of terms) {
      const matches = concepts.filter((concept) => concept.checklistKey === key);
      expect(matches).toHaveLength(1);
      expect(matches[0].details).toContain("Session Management Cheat Sheet");
    }
    const deck = buildAcronymDeck(getAllTopics(lang));
    expect(deck.filter((card) => terms.some(([, key]) => card.conceptKey === key))).toHaveLength(0);
    const guide = getDomainGuide(2, lang);
    const scenario = guide.practiceScenarios?.find((item) => item.prompt.includes("SESSION-DEMO-A"));
    expect(scenario?.objective).toBe("2.4");
    expect(scenario?.reasoning).toContain("MFA");
    expect(getDomainGuide(4, lang).connections.some((item) => item.includes("Session hijacking"))).toBe(true);
    const hardening = concepts.find((item) => item.checklistKey === "ApplicationSecurityHardening");
    expect(hardening?.details).toContain("Cookie & Header Tampering");
  });
});
