import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { getDomainGuide } from "../src/domainGuides";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import { buildAcronymDeck } from "../src/flashcards";
import { CONCEPT_CITATIONS } from "../src/citations";

/*
 * Roadmap task 8: TLS termination / SSL offload and trust boundaries (Obj 3.2).
 * A referenceable, source-backed glossary entry that separates traffic
 * distribution from cryptographic protection, with two explicit legs
 * (client-balancer, balancer-backend), plus a guide trap on the trust boundary.
 */

beforeAll(loadEnglishOverlay);

const MARKERS = {
  it: {
    example: "Piccolo Esempio Concentrato",
    modes: ["Pass-through", "Terminazione", "ri-cifratura"],
    legs: ["client-bilanciatore", "bilanciatore-backend"],
    trustBoundary: "confine di fiducia",
    wholePath: "non garantisce l'intero percorso",
    trap: "intero percorso fino al backend è cifrato",
  },
  en: {
    example: "Focused Mini-Example",
    modes: ["Pass-through", "Termination", "re-encryption"],
    legs: ["client-balancer", "balancer-backend"],
    trustBoundary: "trust boundary",
    wholePath: "does not guarantee the whole path",
    trap: "whole path to the backend is encrypted",
  },
} as const;

describe.each(["it", "en"] as const)("TLS termination / SSL offload (%s)", (lang) => {
  const concepts = () => Object.values(getAllTopics(lang)).flat().flatMap((g) => g.subtopics);
  const entry = () => concepts().find((c) => c.checklistKey === "TLSTerminationOffload")!;

  it("is a single, source-backed entry with the three modes and both legs", () => {
    const matches = concepts().filter((c) => c.checklistKey === "TLSTerminationOffload");
    expect(matches).toHaveLength(1);
    const c = matches[0];
    expect(c.definition.length).toBeGreaterThan(30);
    expect(c.details).toContain("RFC 8446");
    expect(c.details).toContain(MARKERS[lang].example);
    for (const mode of MARKERS[lang].modes) expect(c.details).toContain(mode);
    for (const leg of MARKERS[lang].legs) expect(c.details).toContain(leg);
    expect(c.details).toContain("SSL offload");
    expect(CONCEPT_CITATIONS["3:TLSTerminationOffload"]?.map((x) => x.source)).toEqual(["rfc8446"]);
  });

  it("teaches the trust boundary: HTTPS on the first leg is not the whole path", () => {
    const c = entry();
    expect(c.examTip).toContain(MARKERS[lang].trustBoundary);
    expect(c.examTip).toContain(MARKERS[lang].wholePath);
  });

  it("compares the modes in a three-row table by where cleartext and the key live", () => {
    const table = entry().comparativeTable!;
    expect(table.headers).toHaveLength(4);
    expect(table.rows).toHaveLength(3);
    for (const row of table.rows) expect(row).toHaveLength(4);
  });

  it("is indexed in the glossary by its full name", () => {
    const index = buildGlossaryIndex(concepts());
    expect(index.byName.get("tls termination & ssl offload")?.id).toBe("TLSTerminationOffload");
    // And the full-name phrase resolves to this entry in running text.
    const hits = findGlossaryTerms(["Approfondimento: TLS Termination & SSL Offload nel reverse proxy."], index, 30);
    expect(hits.map((h) => h.id)).toContain("TLSTerminationOffload");
  });

  it("does not invent an acronym flashcard for the entry", () => {
    const deck = buildAcronymDeck(getAllTopics(lang));
    expect(deck.some((card) => card.conceptKey === "TLSTerminationOffload")).toBe(false);
  });

  it("warns about the trust boundary in the Domain 3 guide", () => {
    const guide = getDomainGuide(3, lang);
    expect(guide.commonTraps?.some((t) => t.misconception.includes(MARKERS[lang].trap))).toBe(true);
  });
});
