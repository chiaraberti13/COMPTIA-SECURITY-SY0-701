import { describe, expect, it } from "vitest";
import { UI, translate } from "../src/i18n";
import { SUBGROUP_MAP } from "../src/subgroups";
import { localizeSubgroup } from "../src/i18n";

describe("UI dictionaries", () => {
  it("Italian and English cover exactly the same keys", () => {
    const itKeys = Object.keys(UI.it).sort();
    const enKeys = Object.keys(UI.en).sort();
    expect(enKeys).toEqual(itKeys);
  });

  it("has no empty string anywhere", () => {
    for (const lang of ["it", "en"] as const) {
      const empty = Object.entries(UI[lang])
        .filter(([, value]) => !value.trim())
        .map(([key]) => `${lang}:${key}`);
      expect(empty).toEqual([]);
    }
  });

  it("uses the same placeholders in both languages", () => {
    const placeholders = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort();
    const mismatched = Object.keys(UI.it).filter(
      (key) =>
        JSON.stringify(placeholders(UI.it[key as keyof typeof UI.it])) !==
        JSON.stringify(placeholders(UI.en[key as keyof typeof UI.en]))
    );
    expect(mismatched).toEqual([]);
  });
});

describe("translate", () => {
  it("interpolates variables", () => {
    expect(translate("it", "sidebar.domShort", { n: 3 })).toContain("3");
  });

  it("falls back to Italian for a key missing in the other language", () => {
    expect(translate("en", "quiz.reviewTitle")).toBe(UI.en["quiz.reviewTitle"]);
  });
});

describe("subgroup names", () => {
  it("every subgroup used by the map has an English translation", () => {
    const untranslated = [...new Set(Object.values(SUBGROUP_MAP))].filter(
      (name) => localizeSubgroup(name, "en") === name && /[àèéìòù]/i.test(name)
    );
    expect(untranslated).toEqual([]);
  });
});
