// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useRemediation } from "../src/hooks/useRemediation";
import { LanguageProvider } from "../src/i18n";
import type { Question } from "../src/types";

/*
 * The adaptive remediation hook against a fake /api/quiz/remediation: what it
 * asks for, what it accepts and how the three questions are answered.
 */

const fetchMock = vi.fn();
beforeEach(() => {
  localStorage.setItem("comptia_sy0701_lang", "it");
  vi.stubGlobal("fetch", fetchMock);
});
afterEach(() => {
  cleanup();
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

const reply = (status: number, body: unknown) =>
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body), { status }));
const sentBody = () => JSON.parse(fetchMock.mock.calls[0][1].body as string);

const aiQuestion = (i: number) => ({
  id: 9_000_000 + i, topic: `Topic ${i}`, level: "ANALISI", scenario: `Scenario ${i}.`,
  question: `Question ${i}?`, options: ["A", "B", "C", "D"], answerIndex: 0, explanation: `Why ${i}.`,
});
const runQuestion = (id: number, topic: string) => ({ ...aiQuestion(id), id, topic }) as Question;

function renderRemediation(onLocked = vi.fn()) {
  const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;
  return renderHook(() => useRemediation({ onLocked }), { wrapper });
}

describe("useRemediation", () => {
  it("asks once for each topic of the wrong answers and opens the three questions", async () => {
    reply(200, { questions: [0, 1, 2].map(aiQuestion) });
    const { result } = renderRemediation();
    const run = [runQuestion(1, "PKI"), runQuestion(2, "PKI"), runQuestion(3, "SIEM"), runQuestion(4, "IAM")];
    await act(() => result.current.start(run, [1, 2, 3]));

    expect(sentBody()).toEqual({ weakTopics: ["PKI", "SIEM"], lang: "it" });
    expect(result.current).toMatchObject({ remediationActive: true, remediationIndex: 0, remediationError: null });
    expect(result.current.remediationQuestions).toHaveLength(3);
  });

  it("falls back to core topics when the run had no wrong answer", async () => {
    reply(200, { questions: [0, 1, 2].map(aiQuestion) });
    const { result } = renderRemediation();
    await act(() => result.current.start([runQuestion(1, "PKI")], []));
    expect(sentBody().weakTopics).toHaveLength(3);
  });

  it("scores the answers and ends after the third question", async () => {
    reply(200, { questions: [0, 1, 2].map(aiQuestion) });
    const { result } = renderRemediation();
    await act(() => result.current.start([runQuestion(1, "PKI")], [1]));
    for (const option of [0, 1, 0]) {
      act(() => result.current.select(option));
      act(() => result.current.confirm());
      act(() => result.current.next());
    }
    expect(result.current.remediationCompleted).toBe(true);
    expect(result.current.remediationScore).toBe(2);

    act(() => result.current.exit());
    expect(result.current).toMatchObject({ remediationActive: false, remediationCompleted: false });
  });

  it("asks for the access code when the server requires it", async () => {
    reply(401, { error: "x", code: "access_token_required" });
    const onLocked = vi.fn();
    const { result } = renderRemediation(onLocked);
    await act(() => result.current.start([runQuestion(1, "PKI")], [1]));
    expect(onLocked).toHaveBeenCalledOnce();
    expect(result.current.remediationActive).toBe(false);
    expect(result.current.remediationError).toMatch(/codice di accesso/);
  });

  it("shows the server's error and refuses questions of the wrong shape", async () => {
    reply(500, { error: "Guasto temporaneo" });
    reply(200, { questions: [{ ...aiQuestion(0), options: ["solo una"] }] });
    const { result } = renderRemediation();
    await act(() => result.current.start([runQuestion(1, "PKI")], [1]));
    expect(result.current.remediationError).toBe("Guasto temporaneo");
    await act(() => result.current.start([runQuestion(1, "PKI")], [1]));
    expect(result.current.remediationError).toMatch(/domande di recupero valide/);
    expect(result.current.remediationActive).toBe(false);
    expect(result.current.isGeneratingRemediation).toBe(false);
  });
});
