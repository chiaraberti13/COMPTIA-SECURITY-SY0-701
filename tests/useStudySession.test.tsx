// @vitest-environment jsdom
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useStudySession } from "../src/hooks/useStudySession";
import { LanguageProvider, useLang } from "../src/i18n";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { STORAGE_KEYS } from "../src/storage";

/*
 * The study area state on its own: domain, selected concept across a language
 * switch, and the checklist saved in localStorage.
 */

beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
});
afterEach(cleanup);

const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;
const renderStudy = () => renderHook(() => ({ study: useStudySession(), lang: useLang() }), { wrapper });
const saved = () => JSON.parse(localStorage.getItem(STORAGE_KEYS.checklist) ?? "{}");

describe("useStudySession", () => {
  it("starts on the first concept of Domain 1 and opens each domain on its first concept", () => {
    const { result } = renderStudy();
    expect(result.current.study.activeDomain).toBe(1);
    expect(result.current.study.selectedSubtopic).toBe(getDomainTopics(1, "it")[0].subtopics[0]);

    act(() => result.current.study.switchDomain(4));
    expect(result.current.study.activeDomain).toBe(4);
    expect(result.current.study.selectedSubtopic).toBe(getDomainTopics(4, "it")[0].subtopics[0]);
  });

  it("keeps the same concept selected when the language changes", async () => {
    await loadEnglishOverlay();
    const { result } = renderStudy();
    // A concept of Domain 1 whose name differs between the two languages.
    const english = new Map(getDomainTopics(1, "en").flatMap(g => g.subtopics).map(s => [s.checklistKey, s.name]));
    const concept = getDomainTopics(1, "it")
      .flatMap(g => g.subtopics)
      .find(s => english.get(s.checklistKey) !== s.name)!;
    act(() => result.current.study.selectSubtopic(concept));
    act(() => result.current.lang.setLang("en"));
    await waitFor(() => expect(result.current.study.selectedSubtopic.name).toBe(english.get(concept.checklistKey)));
    expect(result.current.study.selectedSubtopic.checklistKey).toBe(concept.checklistKey);
  });

  it("saves every tick, and a group tick fills the group or empties it when full", () => {
    const { result } = renderStudy();
    act(() => result.current.study.toggleCheck("A"));
    expect(saved()).toEqual({ A: true });

    act(() => result.current.study.toggleGroupCheck(["A", "B"]));
    expect(saved()).toEqual({ A: true, B: true });
    act(() => result.current.study.toggleGroupCheck(["A", "B"]));
    expect(saved()).toEqual({ A: false, B: false });
  });

  it("reads the saved checklist on the first render, dropping values that are not booleans", () => {
    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify({ A: true, B: "yes", C: false }));
    const { result } = renderStudy();
    expect(result.current.study.checkedItems.A).toBe(true);
    expect(result.current.study.checkedItems).not.toHaveProperty("B");
  });
});
