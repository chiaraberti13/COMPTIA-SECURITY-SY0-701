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

const names = {
  it: {
    WiFiJammingAttack: "Jamming e interferenza wireless (Radio jamming)",
    WiFiDeauthAttack: "Deautenticazione e disassociazione (Deauthentication/Disassociation)",
    ProtectedManagementFrames: "Protected Management Frames (PMF)",
  },
  en: {
    WiFiJammingAttack: "Wireless jamming and interference (Radio jamming)",
    WiFiDeauthAttack: "Deauthentication and disassociation (Deauthentication/Disassociation)",
    ProtectedManagementFrames: "Protected Management Frames (PMF)",
  },
} as const;

type ConceptKey = keyof typeof names["it"];

const queries: Record<"it" | "en", [string, ConceptKey][]> = {
  it: [
    ["jamming", "WiFiJammingAttack"],
    ["disassociazione", "WiFiDeauthAttack"],
    ["protezione dei frame di gestione", "ProtectedManagementFrames"],
  ],
  en: [
    ["radio jamming", "WiFiJammingAttack"],
    ["disassociation", "WiFiDeauthAttack"],
    ["protected management frames", "ProtectedManagementFrames"],
  ],
};

describe.each(["it", "en"] as const)("Wi-Fi availability learning integration (%s)", (lang) => {
  it.each(queries[lang])("finds %s in the rendered glossary", async (query, key) => {
    localStorage.clear();
    localStorage.setItem("comptia_sy0701_lang", lang);
    render(<LanguageProvider><GlossarySection /></LanguageProvider>);
    fireEvent.change(await screen.findByRole("textbox"), { target: { value: query } });
    const name = names[lang][key];
    expect(screen.getByRole("heading", { level: 3, name }).textContent).toBe(name);
  });

  it("adds source-backed canonical concepts and corrects the PMF generalization", () => {
    const topics = getAllTopics(lang);
    const concepts = Object.values(topics).flat().flatMap((group) => group.subtopics);
    const byKey = (key: string) => concepts.filter((concept) => concept.checklistKey === key);

    for (const key of ["WiFiJammingAttack", "WiFiDeauthAttack", "ProtectedManagementFrames"] as const) {
      expect(byKey(key)).toHaveLength(1);
      expect(byKey(key)[0].details).toContain("IEEE Std 802.11-2020");
      expect(byKey(key)[0].details).toContain("Wi-Fi Alliance");
    }

    // Jamming is a physical-layer attack that encryption/PMF cannot stop.
    expect(byKey("WiFiJammingAttack")[0].details).toMatch(/livello fisico|physical layer/);
    // Deauthentication is management-frame spoofing, mitigated by 802.11w/PMF.
    expect(byKey("WiFiDeauthAttack")[0].details).toContain("802.11w");
    // PMF scope: robust management frames and BIP, not "every management frame".
    expect(byKey("ProtectedManagementFrames")[0].details).toContain("BIP");
    expect(byKey("ProtectedManagementFrames")[0].examTip).toContain("802.11ac");

    // The old WPA3-Enterprise over-generalization ("encrypts ... management frames") is gone.
    const wpa3 = byKey("WPA3EnterpriseRes")[0];
    expect(wpa3.details).toMatch(/robusti|robust/);
    expect(wpa3.details).not.toMatch(/Cifra e protegge i frame di gestione|encrypts and protects the wireless management frames/);

    for (const ref of ["2:WiFiJammingAttack", "2:WiFiDeauthAttack", "3:ProtectedManagementFrames"] as const) {
      expect(CONCEPT_CITATIONS[ref]?.map((item) => item.source)).toEqual(["ieee80211", "wifiAlliance"]);
    }

    // The two attacks carry no acronym, so they generate no flashcards; PMF is a
    // real acronym and yields one card with its correct expansion.
    const deck = buildAcronymDeck(topics);
    expect(deck.filter((card) => card.conceptKey === "WiFiJammingAttack" || card.conceptKey === "WiFiDeauthAttack")).toHaveLength(0);
    const pmf = deck.filter((card) => card.conceptKey === "ProtectedManagementFrames");
    expect(pmf).toHaveLength(1);
    expect(pmf[0].acronym).toBe("PMF");
    expect(pmf[0].expansion).toBe("Protected Management Frames");

    // The Domain 2 guide practices the jamming-vs-deauthentication distinction and
    // links objectives 3.2 and 4.1; Domains 3 and 4 carry the PMF-scope trap.
    const guide2 = getDomainGuide(2, lang);
    const scenario = guide2.practiceScenarios?.find((item) => /jamming/i.test(item.title) && item.objective === "2.4");
    expect(scenario?.objective).toBe("2.4");
    expect(scenario?.reasoning).toContain("3.2");
    expect(scenario?.reasoning).toContain("4.1");
    expect(guide2.comparisons?.some((table) => /jamming/i.test(table.title))).toBe(true);

    for (const d of [3, 4]) {
      const traps = getDomainGuide(d, lang).commonTraps ?? [];
      expect(traps.some((trap) => /PMF/.test(trap.misconception + trap.correction) && /jamming/i.test(trap.correction))).toBe(true);
    }
  });
});
