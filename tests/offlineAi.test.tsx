// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { LanguageProvider } from "../src/i18n";
import { useAiChat } from "../src/hooks/useAiChat";
import { useRemediation } from "../src/hooks/useRemediation";
import AiTrainerPanel from "../src/components/AiTrainerPanel";

const wrapper = ({ children }: { children: ReactNode }) => <LanguageProvider>{children}</LanguageProvider>;
beforeEach(() => {
  localStorage.clear();
  localStorage.setItem("comptia_sy0701_lang", "it");
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("AI offline", () => {
  it("blocks direct chat and remediation calls before fetch", async () => {
    vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => ({ chat: useAiChat(), remediation: useRemediation({ onLocked: vi.fn() }) }), { wrapper });
    await act(async () => {
      await result.current.chat.send("Explain SIEM");
      await result.current.remediation.start([], []);
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.chat.messages.at(-1)?.text).toContain("connessione Internet");
    expect(result.current.chat.messages.some(message => message.sender === "user")).toBe(false);
    expect(result.current.remediation.remediationActive).toBe(false);
    expect(result.current.remediation.remediationError).toContain("connessione Internet");
  });
  it("disables AI actions offline, keeps the draft and enables them on reconnection", () => {
    const connected = vi.spyOn(navigator, "onLine", "get").mockReturnValue(false);
    function Panel() { return <AiTrainerPanel open chat={useAiChat()} onClose={() => {}} />; }
    render(<LanguageProvider><Panel /></LanguageProvider>);
    const input = screen.getByRole("textbox", { name: "Domanda per il Trainer AI" }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Explain Zero Trust" } });
    const send = screen.getByRole("button", { name: "Invia la domanda al Trainer AI" }) as HTMLButtonElement;
    expect(send.disabled).toBe(true);
    expect((document.getElementById("chip_threats") as HTMLButtonElement).disabled).toBe(true);
    expect(document.getElementById("ai_offline_notice")?.getAttribute("role")).toBe("status");
    connected.mockReturnValue(true);
    act(() => window.dispatchEvent(new Event("online")));
    expect(send.disabled).toBe(false);
    expect(input.value).toBe("Explain Zero Trust");
    expect(document.getElementById("ai_offline_notice")).toBeNull();
  });
});
