// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { GlossarySection } from "../src/components/GlossarySection";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, getDomainQuestions, loadEnglishOverlay, sourceQuestionId } from "../src/localizedData";
import { buildAcronymDeck } from "../src/flashcards";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { getDomainGuide } from "../src/domainGuides";
import { CONCEPT_CITATIONS } from "../src/citations";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);
const roles = [
  ["PolicyEngineZTA", "Policy Engine", "PE"],
  ["PolicyAdministratorZTA", "Policy Administrator", "PA"],
  ["PolicyEnforcementPointZTA", "Policy Enforcement Point", "PEP"],
] as const;

describe.each(["it", "en"] as const)("Zero Trust logical roles (%s)", (lang) => {
  it.each(roles)("finds %s by its acronym in the rendered glossary", async (_key, name, acronym) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    const search = await screen.findByRole("textbox");
    const domainFilter = screen.getAllByText("Dom 1", { exact: true }).map((label) => label.closest("button")).find(Boolean);
    expect(domainFilter).toBeTruthy();
    fireEvent.click(domainFilter!);
    fireEvent.change(search, { target: { value: acronym } });
    expect(screen.getByRole("heading", { level: 3, name: `${name} (${acronym})` })).toBeDefined();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: name } });
    expect(screen.getByRole("heading", { level: 3, name: `${name} (${acronym})` })).toBeDefined();
  }, 15000);

  it("connects canonical definitions, glossary hints, flashcards and the guide", () => {
    const topics = getAllTopics(lang);
    const concepts = Object.values(topics).flat().flatMap((group) => group.subtopics);
    const index = buildGlossaryIndex(concepts);
    const deck = buildAcronymDeck(topics);
    const oldControlPlane = concepts.find((c) => c.checklistKey === "ControlPlaneZTA")!;
    const links = findGlossaryTerms([oldControlPlane.details], index, 20).map((hint) => hint.id);
    for (const [key, name, acronym] of roles) {
      const matches = concepts.filter((c) => c.checklistKey === key);
      expect(matches).toHaveLength(1);
      expect(matches[0].details).toContain("NIST SP 800-207");
      expect(CONCEPT_CITATIONS[`1:${key}`]?.[0].source).toBe("nist800207");
      expect(index.byAcronym.get(acronym)?.id).toBe(key);
      expect(links).toContain(key);
      expect(findGlossaryTerms([matches[0].details], index, 20).map((hint) => hint.id)).toContain("PolicyDrivenAccessControl");
      const cards = deck.filter((card) => card.conceptKey === key);
      expect(cards).toHaveLength(1);
      expect(cards[0].expansion).toBe(name);
    }
    const guide = getDomainGuide(1, lang);
    const flow = guide.practiceScenarios?.find((s) => /authorization and revocation|autorizzazione e revoca/.test(s.title));
    expect(flow?.objective).toBe("1.2");
    for (const [,name,acronym] of roles) {
      expect(flow?.reasoning).toContain(`${name} (${acronym})`);
    }
    expect(flow?.prompt).toContain("subject");
    expect(flow?.prompt).toContain("system");
    expect(flow?.reasoning).toMatch(/rivaluta e revoca|reevaluates and revokes/);
    expect(guide.comparisons?.find((c) => c.title.includes("PE, PA"))?.rows).toHaveLength(3);
    expect(guide.commonTraps?.some((t) => t.correction.includes("Policy Decision Point (PDP)"))).toBe(true);
    const question = getDomainQuestions(1, lang).find((q) => sourceQuestionId(q.id) === 188)!;
    expect(question.answerIndex).toBe(3);
    expect(question.question).toContain("PEP");
    expect(question.explanation).toMatch(/Non è definito|It is not defined/);
  });
});
