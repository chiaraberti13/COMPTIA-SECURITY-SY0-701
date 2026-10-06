// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymDeck } from "../src/flashcards";
import { getDomainGuide } from "../src/domainGuides";
import { CONCEPT_CITATIONS } from "../src/citations";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);

describe.each(["it", "en"] as const)("domain hijacking learning integration (%s)", (lang) => {
  const name = lang === "it" ? "Domain hijacking (Dirottamento del dominio)" : "Domain hijacking (Domain takeover)";
  it.each(lang === "it" ? ["domain hijacking", "dirottamento del dominio"] : ["domain hijacking", "domain takeover"])("finds %s in the rendered glossary", async (query) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: query } });
    expect(screen.getByRole("heading", { level: 3, name }).textContent).toBe(name);
  });

  it("connects one canonical concept, comparisons, phishing and source-backed practice", () => {
    const topics = getAllTopics(lang);
    const concepts = Object.values(topics).flat().flatMap((group) => group.subtopics);
    const hijacking = concepts.filter((concept) => concept.checklistKey === "DomainHijackingAttack");
    expect(hijacking).toHaveLength(1);
    expect(hijacking[0].details).toContain("clientTransferProhibited");
    expect(hijacking[0].details).toContain("RFC 4033");
    expect(CONCEPT_CITATIONS["2:DomainHijackingAttack"]?.map((item) => item.source)).toContain("icannLocks");
    expect(buildAcronymDeck(topics).filter((card) => card.conceptKey === "DomainHijackingAttack")).toHaveLength(0);
    for (const key of ["TyposquattingSE", "NetworkWirelessAttacks"]) {
      expect(concepts.find((item) => item.checklistKey === key)?.details + " " + concepts.find((item) => item.checklistKey === key)?.examTip).toContain("Domain hijacking");
    }
    const guide = getDomainGuide(2, lang);
    const scenario = guide.practiceScenarios?.find((item) => item.prompt.includes("kestrelia.example"));
    expect(scenario?.objective).toBe("2.4");
    expect(scenario?.reasoning).toContain("2.2");
    expect(guide.comparisons?.some((table) => table.title.includes("Domain hijacking"))).toBe(true);
  });
});
