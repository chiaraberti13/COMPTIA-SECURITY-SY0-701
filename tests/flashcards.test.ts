import { beforeAll, describe, expect, it } from "vitest";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { buildGlossaryIndex, findGlossaryTerms } from "../src/glossaryIndex";
import {
  FLASHCARD_INTERVAL_DAYS,
  buildAcronymDeck,
  deckStats,
  deriveExpansion,
  filterDeck,
  gradeCard,
  objectivesFromGroupTitle,
  objectivesOf,
  sanitizeCardProgress,
  selectDueCards,
  type AcronymCard,
  type CardProgress,
} from "../src/flashcards";

const DAY_MS = 24 * 60 * 60 * 1000;

describe("objectivesFromGroupTitle", () => {
  it("reads a single objective", () => {
    expect(objectivesFromGroupTitle("8. Identity & Access Control Models (Obj 4.6)")).toEqual(["4.6"]);
  });
  it("reads several objectives", () => {
    expect(objectivesFromGroupTitle("10. Threat Intelligence (Obj 2.1, 2.2 & 4.3)")).toEqual(["2.1", "2.2", "4.3"]);
    expect(objectivesFromGroupTitle("4. Monitoring & Enterprise Controls (Obj 4.4 e 4.5)")).toEqual(["4.4", "4.5"]);
  });
  it("expands a same-domain range", () => {
    expect(objectivesFromGroupTitle("7. PBQ Dominio 3 Scenarios (Obj 3.1-3.4)")).toEqual(["3.1", "3.2", "3.3", "3.4"]);
  });
  it("returns nothing when there is no objective block", () => {
    expect(objectivesFromGroupTitle("Fondamentali")).toEqual([]);
  });
});

describe("deriveExpansion", () => {
  it("recognizes a named hyphenated compound without guessing a bare acronym", () => {
    expect(deriveExpansion("Diffie-Hellman (DH)", "Accordo delle chiavi.")).toBe("Diffie-Hellman");
    expect(deriveExpansion("DH", "Accordo delle chiavi.")).toBeNull();
  });
  it("takes the expansion from a 'Full Name (ACR)' style name", () => {
    expect(deriveExpansion("Standard Operating Procedure (SOP)", "ignored")).toBe("Standard Operating Procedure");
  });
  it("takes the expansion from the lead of the definition before the colon", () => {
    expect(deriveExpansion("SIEM", "Security Information and Event Management: piattaforma di raccolta log.")).toBe(
      "Security Information and Event Management"
    );
  });
  it("strips an inline parenthetical acronym from the expansion", () => {
    expect(deriveExpansion("MFA", "Multi-Factor Authentication (MFA): processo di sicurezza.")).toBe(
      "Multi-Factor Authentication"
    );
  });
  it("refuses a single word, a sentence, or a far-away colon", () => {
    expect(deriveExpansion("API", "Interfaccia.")).toBeNull();
    expect(deriveExpansion("API", "Application Programming Interface è un'interfaccia tra programmi che espone funzioni molto utili per comporre sistemi complessi: eccetera.")).toBeNull();
    expect(deriveExpansion("X", "Oneword: x")).toBeNull();
  });
});

const groups = (title: string, subs: { name: string; checklistKey: string; definition: string; examTip?: string; canonical?: AcronymCard["conceptKey"] }[]) => [
  {
    title,
    description: "",
    icon: "",
    subtopics: subs.map((s) => ({
      name: s.name,
      checklistKey: s.checklistKey,
      definition: s.definition,
      details: "",
      examTip: s.examTip ?? "tip",
      ...(s.canonical ? { canonical: { domainId: 9, checklistKey: "x", name: "x" } } : {}),
    })),
  },
];

describe("buildAcronymDeck", () => {
  it("builds cards with expansion, domain and objectives, dropping ambiguous and canonical entries", () => {
    const deck = buildAcronymDeck({
      1: groups("A (Obj 1.4)", [
        { name: "SIEM", checklistKey: "SIEM", definition: "Security Information and Event Management: x" },
        { name: "DUP", checklistKey: "dupA", definition: "Duplicate Concept: shared", canonical: "y" },
      ]),
      2: groups("B (Obj 2.4)", [
        { name: "MAC", checklistKey: "macA", definition: "Mandatory Access Control: one" },
      ]),
      3: groups("C (Obj 3.2)", [
        { name: "MAC", checklistKey: "macB", definition: "Media Access Control: another" },
      ]),
    });
    const ids = deck.map((c) => c.id);
    expect(ids).toContain("SIEM");
    expect(ids).not.toContain("DUP"); // canonical duplicate skipped
    expect(ids).not.toContain("MAC"); // ambiguous (two meanings) dropped
    const siem = deck.find((c) => c.id === "SIEM")!;
    expect(siem.expansion).toBe("Security Information and Event Management");
    expect(siem.domainId).toBe(1);
    expect(siem.objectives).toEqual(["1.4"]);
  });
});

describe("filterDeck and objectivesOf", () => {
  const deck: AcronymCard[] = [
    { id: "A", acronym: "A", expansion: "Alpha One", definition: "d", conceptKey: "A", domainId: 1, objectives: ["1.1"] },
    { id: "B", acronym: "B", expansion: "Beta Two", definition: "d", conceptKey: "B", domainId: 1, objectives: ["1.2"] },
    { id: "C", acronym: "C", expansion: "Gamma Three", definition: "d", conceptKey: "C", domainId: 2, objectives: ["2.1"] },
  ];
  it("filters by domain and objective", () => {
    expect(filterDeck(deck, { domain: 1, objective: "all" }).map((c) => c.id)).toEqual(["A", "B"]);
    expect(filterDeck(deck, { domain: "all", objective: "2.1" }).map((c) => c.id)).toEqual(["C"]);
    expect(filterDeck(deck, { domain: 1, objective: "1.2" }).map((c) => c.id)).toEqual(["B"]);
  });
  it("lists the objectives present, optionally scoped to a domain", () => {
    expect(objectivesOf(deck)).toEqual(["1.1", "1.2", "2.1"]);
    expect(objectivesOf(deck, 1)).toEqual(["1.1", "1.2"]);
  });
});

describe("sanitizeCardProgress", () => {
  it("keeps well-formed entries and drops the rest", () => {
    const ok: CardProgress = { seen: 3, known: 2, streak: 1, lastSeenAt: 10, dueAt: 20 };
    expect(
      sanitizeCardProgress({
        SIEM: ok,
        "lower": { ...ok }, // bad key
        MFA: { seen: 1, known: 5, streak: 0, lastSeenAt: 1, dueAt: 2 }, // known > seen
        TLS: "nope",
      })
    ).toEqual({ SIEM: ok });
  });
  it("returns empty for non-objects", () => {
    for (const v of [null, undefined, 3, ["a"], "x"]) expect(sanitizeCardProgress(v)).toEqual({});
  });
});

describe("gradeCard", () => {
  const now = 1_000_000_000_000;
  it("lengthens the streak and pushes the next review on 'knew it'", () => {
    const first = gradeCard({}, "SIEM", true, now);
    expect(first.SIEM).toMatchObject({ seen: 1, known: 1, streak: 1 });
    expect(first.SIEM.dueAt).toBe(now + FLASHCARD_INTERVAL_DAYS[0] * DAY_MS);

    let p = first;
    for (let i = 0; i < 6; i++) p = gradeCard(p, "SIEM", true, now);
    // Streak is capped at the last interval (30 days).
    expect(p.SIEM.dueAt).toBe(now + FLASHCARD_INTERVAL_DAYS[FLASHCARD_INTERVAL_DAYS.length - 1] * DAY_MS);
  });
  it("resets the streak and makes the card due now on 'didn't know'", () => {
    const after = gradeCard({ SIEM: { seen: 4, known: 4, streak: 4, lastSeenAt: 1, dueAt: now + DAY_MS } }, "SIEM", false, now);
    expect(after.SIEM).toMatchObject({ seen: 5, known: 4, streak: 0, dueAt: now });
  });
});

describe("selectDueCards", () => {
  const deck: AcronymCard[] = [
    { id: "A", acronym: "A", expansion: "Alpha", definition: "d", conceptKey: "A", domainId: 1, objectives: [] },
    { id: "B", acronym: "B", expansion: "Beta", definition: "d", conceptKey: "B", domainId: 1, objectives: [] },
    { id: "C", acronym: "C", expansion: "Gamma", definition: "d", conceptKey: "C", domainId: 1, objectives: [] },
  ];
  const now = 2_000_000_000_000;
  it("puts never-seen cards first, then due seen cards, and hides cards not yet due", () => {
    const progress = {
      B: { seen: 2, known: 1, streak: 0, lastSeenAt: 1, dueAt: now - DAY_MS }, // due, weak
      C: { seen: 2, known: 2, streak: 2, lastSeenAt: 1, dueAt: now + DAY_MS }, // not due
    };
    const due = selectDueCards(deck, progress, now).map((c) => c.id);
    expect(due).toEqual(["A", "B"]); // A never seen (first), B due; C hidden
  });
});

describe("deckStats", () => {
  const deck: AcronymCard[] = [
    { id: "A", acronym: "A", expansion: "Alpha", definition: "d", conceptKey: "A", domainId: 1, objectives: [] },
    { id: "B", acronym: "B", expansion: "Beta", definition: "d", conceptKey: "B", domainId: 1, objectives: [] },
  ];
  const now = 3_000_000_000_000;
  it("counts total, started, mastered and due", () => {
    const progress = {
      A: { seen: 6, known: 6, streak: 5, lastSeenAt: 1, dueAt: now + DAY_MS }, // mastered, not due
    };
    expect(deckStats(deck, progress, now)).toEqual({ total: 2, started: 1, mastered: 1, due: 1 });
  });
});

/* ------------------------------------------------------------------ *
 * The deck built from the real study content, in both languages.
 * ------------------------------------------------------------------ */

describe("acronym deck over the real content", () => {
  beforeAll(loadEnglishOverlay);

  it("is identical in Italian and English (same cards, same expansions)", () => {
    const it = buildAcronymDeck(getAllTopics("it"));
    const en = buildAcronymDeck(getAllTopics("en"));
    expect(it.length).toBeGreaterThanOrEqual(50);
    expect(it.map((c) => c.id)).toEqual(en.map((c) => c.id));
    const enById = new Map(en.map((c) => [c.id, c]));
    for (const card of it) expect(enById.get(card.id)!.expansion, card.id).toBe(card.expansion);
  });

  it("gives every card an expansion, a definition and the acronym as its stable id", () => {
    for (const lang of ["it", "en"] as const) {
      for (const card of buildAcronymDeck(getAllTopics(lang))) {
        expect(card.expansion.length, `${card.id} expansion`).toBeGreaterThan(3);
        expect(/[A-Za-z]{3,}/.test(card.expansion), `${card.id} meaningful expansion`).toBe(true);
        expect(card.definition.length, `${card.id} definition`).toBeGreaterThan(10);
        expect(card.id).toBe(card.acronym);
        expect(card.domainId).toBeGreaterThanOrEqual(1);
      }
    }
  });

  it("only uses acronyms the glossary itself recognizes", () => {
    const topics = Object.values(getAllTopics("it")).flat().flatMap((g) => g.subtopics);
    const index = buildGlossaryIndex(topics);
    for (const card of buildAcronymDeck(getAllTopics("it"))) {
      expect(findGlossaryTerms([`Read ${card.acronym}.`], index)[0]?.label, card.id).toBe(card.acronym);
    }
  });
});
