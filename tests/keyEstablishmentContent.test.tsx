// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import DomainGuidePanel, { GuideFlowDiagram } from "../src/components/DomainGuidePanel";
import { GlossarySection } from "../src/components/GlossarySection";
import { getDomainGuide } from "../src/domainGuides";
import { getDomainRoute } from "../src/domainRoutes";
import { LanguageProvider } from "../src/i18n";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildAcronymDeck } from "../src/flashcards";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { CONCEPT_CITATIONS } from "../src/citations";

beforeAll(loadEnglishOverlay);
afterEach(cleanup);
const keys = ["SessionKeyConcept", "KeyTransportConcept", "KeyAgreementConcept", "DiffieHellmanConcept", "ECDHConcept", "EphemeralKeyConcept", "ForwardSecrecyConcept"];

describe.each(["it", "en"] as const)("Key establishment learning path (%s)", (lang) => {
  const concepts = () => Object.values(getAllTopics(lang)).flat().flatMap((g) => g.subtopics);

  it("preserves DH/ECDH distinctions and connects seven canonical, source-backed entries", () => {
    const all = concepts();
    const index = buildGlossaryIndex(all);
    const asymmetric = all.find((c) => c.checklistKey === "AsymmetricEncryption")!;
    const links = findGlossaryTerms([asymmetric.details], index, 30).map((h) => h.id);
    for (const key of keys) {
      const matches = all.filter((c) => c.checklistKey === key);
      expect(matches).toHaveLength(1);
      expect(matches[0].details).toContain("RFC 8446");
      expect(CONCEPT_CITATIONS[`1:${key}`]?.map((c) => c.source)).toEqual([key === "KeyTransportConcept" ? "nist80056b" : "nist80056a", "rfc8446"]);
      if (key !== "SessionKeyConcept") expect(links).toContain(key);
    }
    expect(asymmetric.details).toMatch(/non cifrano|encrypt nothing/);
    const pfs = all.find((c) => c.checklistKey === "ForwardSecrecyConcept")!;
    expect(pfs.details).toContain("psk_ke");
    expect(pfs.details).toContain("0-RTT");
    expect(pfs.details).toContain("post-compromise security");
    expect(all.find((c) => c.checklistKey === "SAEConcept")!.details).toMatch(/chiave di sessione rubata|stolen session key/);
    const deck = buildAcronymDeck(getAllTopics(lang));
    for (const [key, acronym, expansion] of [["DiffieHellmanConcept", "DH", "Diffie-Hellman"], ["ECDHConcept", "ECDH", "Elliptic Curve Diffie-Hellman"], ["ForwardSecrecyConcept", "PFS", "Perfect Forward Secrecy"]]) {
      const cards = deck.filter((c) => c.conceptKey === key);
      expect(cards).toHaveLength(1);
      expect(cards[0]).toMatchObject({ acronym, expansion });
    }
  });

  it("finds acronym and full-name aliases in the real glossary", async () => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    const search = await screen.findByRole("textbox");
    for (const [query, key] of [["PFS", "ForwardSecrecyConcept"], ["ECDH", "ECDHConcept"], [lang === "it" ? "Chiave effimera" : "Ephemeral key", "EphemeralKeyConcept"], ["Key transport", "KeyTransportConcept"]]) {
      fireEvent.change(search, { target: { value: query } });
      expect(screen.getByRole("heading", { level: 3, name: concepts().find((c) => c.checklistKey === key)!.name })).toBeTruthy();
    }
  }, 15000);

  it("renders the original four-node diagram and its complete text equivalent", () => {
    const guide = getDomainGuide(1, lang);
    const flow = guide.flows![0];
    render(<GuideFlowDiagram flow={flow} id="key_flow_test" />);
    const figure = screen.getByRole("figure", { name: flow.title });
    expect(within(figure).getAllByRole("listitem")).toHaveLength(4);
    expect(figure.querySelector("figcaption")?.textContent).toBe(flow.textEquivalent);
    expect(flow.textEquivalent).toContain("ECDHE");
    expect(flow.textEquivalent).toContain("AES-GCM");
    expect(flow.steps[2].detail).toContain("TLS 1.3");
    const scenario = guide.practiceScenarios?.find((s) => /stolen key|chiave rubata/.test(s.title));
    expect(scenario?.objective).toBe("1.4");
    expect(scenario?.reasoning).toMatch(/chiave di sessione|session key/);
    expect(guide.commonTraps?.some((t) => t.correction.includes("psk_ke"))).toBe(true);
  });

  it("includes the diagram in the guide's keyboard-navigable comparison disclosure", async () => {
    localStorage.setItem("comptia_sy0701_lang", lang);
    const guide = getDomainGuide(1, lang);
    const view = render(<LanguageProvider><DomainGuidePanel guide={guide} route={getDomainRoute(1, lang)} onAction={() => {}} glossaryIndex={buildGlossaryIndex(concepts())} /></LanguageProvider>);
    await screen.findByText(guide.flows![0].title);
    const disclosure = view.container.querySelector<HTMLDetailsElement>("#guide_h_comparisons_1")!;
    fireEvent.click(disclosure.querySelector("summary")!);
    expect(disclosure.open).toBe(true);
    expect(within(disclosure).getByRole("figure", { name: guide.flows![0].title })).toBeTruthy();
  });
});
