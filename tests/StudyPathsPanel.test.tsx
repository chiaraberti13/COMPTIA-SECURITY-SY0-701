// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LanguageProvider } from "../src/i18n";
import StudyPathsPanel from "../src/components/StudyPathsPanel";
import AppHeader from "../src/components/AppHeader";

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

it("keeps the selected ethical path across languages and opens its objective guides", { timeout: 20000 }, async () => {
  const onAction = vi.fn();
  render(<LanguageProvider>
    <AppHeader activeTab="studio" onTabChange={vi.fn()} sidebarOpen={false} onToggleSidebar={vi.fn()} />
    <StudyPathsPanel defaultOpen onAction={onAction} />
  </LanguageProvider>);
  for (const name of ["Blue Team", "Red Team"]) {
    fireEvent.click(screen.getByRole("button", { name }));
    expect(screen.getByRole("button", { name }).getAttribute("aria-pressed")).toBe("true");
    fireEvent.click(screen.getByRole("button", { name: /5\.5/ }));
    expect(onAction).toHaveBeenLastCalledWith({ kind: "guide", domain: 5, objective: "5.5" });
    expect(screen.getByRole("link", { name: "Apri laboratori e criteri di verifica" }).getAttribute("href")).toContain("#italiano");
  }
  fireEvent.click(screen.getByRole("button", { name: "EN" }));
  await waitFor(() => expect(screen.getByRole("link", { name: "Open labs and verification criteria" }).getAttribute("href")).toContain("#english"), { timeout: 15000 });
  expect(screen.getByRole("button", { name: "Red Team" }).getAttribute("aria-pressed")).toBe("true");
  expect(screen.getByText(/Define written authorization/)).toBeTruthy();
});
