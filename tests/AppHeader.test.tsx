// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AppHeader from "../src/components/AppHeader";
import { LanguageProvider } from "../src/i18n";

/*
 * The language switch as the learner uses it, in the header: the pressed
 * state that screen readers announce, the document language that sets their
 * pronunciation, and the choice remembered for the next visit.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

function renderHeader(onTabChange = vi.fn()) {
  render(
    <LanguageProvider>
      <AppHeader activeTab="studio" onTabChange={onTabChange} sidebarOpen={false} onToggleSidebar={vi.fn()} />
    </LanguageProvider>
  );
  return { it: screen.getByRole("button", { name: "IT" }), en: screen.getByRole("button", { name: "EN" }) };
}

describe("AppHeader language switch", () => {
  it("marks the active language as pressed, and switches to English and back", { timeout: 20000 }, async () => {
    const { it: itButton, en } = renderHeader();
    expect(itButton.getAttribute("aria-pressed")).toBe("true");
    expect(en.getAttribute("aria-pressed")).toBe("false");
    expect(document.documentElement.lang).toBe("it");

    fireEvent.click(en);
    // The English dataset is a separate chunk: the switch waits for it.
    // The first load of that chunk (about 2 MB of source) can take a few seconds in jsdom.
    await waitFor(() => expect(en.getAttribute("aria-pressed")).toBe("true"), { timeout: 15000 });
    expect(itButton.getAttribute("aria-pressed")).toBe("false");
    expect(document.documentElement.lang).toBe("en");
    expect(localStorage.getItem("comptia_sy0701_lang")).toBe("en");

    fireEvent.click(itButton);
    await waitFor(() => expect(itButton.getAttribute("aria-pressed")).toBe("true"));
    expect(document.documentElement.lang).toBe("it");
    expect(localStorage.getItem("comptia_sy0701_lang")).toBe("it");
  });

  it("translates the interface in place", async () => {
    const onTabChange = vi.fn();
    const { en } = renderHeader(onTabChange);
    const tabs = () => screen.getAllByRole("button").map((b) => b.textContent?.trim() ?? "");
    const italian = tabs();
    fireEvent.click(en);
    await waitFor(() => expect(en.getAttribute("aria-pressed")).toBe("true"));
    expect(tabs()).not.toEqual(italian);
    expect(tabs()).toContain("EN");
  });
});
