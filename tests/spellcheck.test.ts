import path from "node:path";
import { pathToFileURL } from "node:url";
import { describe, expect, it } from "vitest";
import { spellCheckDocument } from "cspell-lib";
import { contentUnits } from "../scripts/spellcheck";

describe("bilingual spelling", () => {
  it("extracts the same study units in both languages, including questions and guides", async () => {
    const itUnits = await contentUnits("it");
    const enUnits = await contentUnits("en");
    expect(itUnits.length).toBe(enUnits.length);
    for (const units of [itUnits, enUnits]) {
      expect(units.some(([id]) => id === "question_10221")).toBe(true);
      expect(units.some(([id]) => id === "guide_1:objectives")).toBe(true);
      expect(units.some(([id]) => id.startsWith("ui_"))).toBe(true);
      expect(units.some(([id]) => id.startsWith("path_"))).toBe(true);
    }
    expect(itUnits.find(([id]) => id === "question_10221")![1]).toContain("numero di serie");
    expect(enUnits.find(([id]) => id === "question_10221")![1]).toContain("serial number");
  });

  it("rejects new Italian typos while accepting accents, elisions and technical words", async () => {
    const result = await spellCheckDocument(
      { uri: pathToFileURL(path.resolve(".spellcheck/probe-it.txt")).href,
        text: "Integrità disponibilità dell'identità microsegmentazione sicurezzza contraffando vida" },
      { configFile: path.resolve("cspell.it.json"), generateSuggestions: false },
      {},
    );
    expect(result.errors ?? []).toEqual([]);
    expect(result.issues.map(i => i.text)).toEqual(["sicurezzza", "contraffando", "vida"]);
  });

  it("does not let the Italian vocabulary mask an English typo", async () => {
    const result = await spellCheckDocument(
      { uri: pathToFileURL(path.resolve(".spellcheck/probe-en.txt")).href,
        text: "Security integrity disponibilità" },
      { configFile: path.resolve("cspell.json"), generateSuggestions: false }, {},
    );
    expect(result.issues.length).toBeGreaterThan(0);
  });
});
