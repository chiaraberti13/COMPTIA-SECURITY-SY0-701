// @vitest-environment jsdom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import OptionVerdict from "../src/components/OptionVerdict";
import { LanguageProvider } from "../src/i18n";

beforeEach(() => localStorage.setItem("comptia_sy0701_lang", "it"));
afterEach(cleanup);

const textOf = (isCorrect: boolean, isSelected: boolean) =>
  render(
    <LanguageProvider>
      <OptionVerdict isCorrect={isCorrect} isSelected={isSelected} />
    </LanguageProvider>
  ).container.textContent;

describe("OptionVerdict", () => {
  it("names the right option and the learner's choice in words", () => {
    expect(textOf(true, false)).toBe("Risposta corretta");
    expect(textOf(false, true)).toBe("La tua risposta");
    expect(textOf(true, true)).toBe("Risposta correttaLa tua risposta");
  });

  it("adds nothing to options that are neither right nor chosen", () => {
    expect(textOf(false, false)).toBe("");
  });
});
