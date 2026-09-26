// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AiTrainerPanel from "../src/components/AiTrainerPanel";
import { useAiChat } from "../src/hooks/useAiChat";
import { LanguageProvider } from "../src/i18n";

/*
 * The AI Trainer panel with its real conversation hook, against a fake
 * /api/chat. Checks what the learner sees and what is sent to the server.
 */

const fetchMock = vi.fn();

beforeEach(() => {
  localStorage.setItem("comptia_sy0701_lang", "it");
  sessionStorage.clear();
  vi.stubGlobal("fetch", fetchMock);
  // jsdom does not implement scrolling.
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(() => {
  cleanup();
  fetchMock.mockReset();
  vi.unstubAllGlobals();
});

const reply = (status: number, body: unknown) =>
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body), { status }));

function Harness({ onClose = () => {} }: { onClose?: () => void }) {
  const chat = useAiChat();
  return <AiTrainerPanel open onClose={onClose} chat={chat} />;
}

function renderPanel(onClose?: () => void) {
  render(
    <LanguageProvider>
      <Harness onClose={onClose} />
    </LanguageProvider>
  );
  return screen.getByRole("log", { name: /conversazione|chat/i });
}

const sentBody = (call = 0) => JSON.parse(fetchMock.mock.calls[call][1].body as string);

describe("AiTrainerPanel", () => {
  it("opens with the welcome message and the transparency notice", () => {
    const log = renderPanel();
    expect(within(log).getByText(/Sono il tuo Cybersecurity Trainer/)).toBeTruthy();
    expect(document.getElementById("ai_disclaimer")?.textContent).toMatch(/errori/);
  });

  it("sends a typed question, clears the input and renders the answer's Markdown", async () => {
    reply(200, { reply: "Risposta con **grassetto**" });
    const log = renderPanel();
    const input = screen.getByRole("textbox", { name: "Domanda per il Trainer AI" }) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Cos'è ZTA?" } });
    fireEvent.click(screen.getByRole("button", { name: "Invia la domanda al Trainer AI" }));

    expect(input.value).toBe("");
    expect(await within(log).findByText("grassetto")).toBeTruthy();
    expect(within(log).getByText("grassetto").tagName).toBe("STRONG");
    expect(sentBody()).toEqual({ message: "Cos'è ZTA?", history: [], lang: "it" });
  });

  it("replays the earlier turns, but never the welcome or system messages", async () => {
    reply(500, { error: "Guasto" });
    reply(200, { reply: "seconda risposta" });
    const log = renderPanel();
    fireEvent.click(document.getElementById("chip_threats")!);
    expect(await within(log).findByText(/Guasto/)).toBeTruthy();
    fireEvent.click(document.getElementById("chip_edr")!);
    await within(log).findByText("seconda risposta");

    const { history } = sentBody(1);
    expect(history).toHaveLength(1);
    expect(history[0].role).toBe("user");
  });

  it("does not send a blank question", () => {
    renderPanel();
    const submit = screen.getByRole("button", { name: "Invia la domanda al Trainer AI" }) as HTMLButtonElement;
    fireEvent.change(screen.getByRole("textbox", { name: "Domanda per il Trainer AI" }), { target: { value: "   " } });
    expect(submit.disabled).toBe(true);
    fireEvent.submit(document.getElementById("chat_form")!);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("asks for the access code when the server requires one, then confirms it is saved", async () => {
    reply(401, { error: "x", code: "access_token_required" });
    const log = renderPanel();
    fireEvent.click(document.getElementById("chip_rto")!);
    expect(await within(log).findByText(/richiedono un codice di accesso/)).toBeTruthy();

    fireEvent.change(document.getElementById("ai_access_input")!, { target: { value: "codice-segreto-123" } });
    fireEvent.submit(document.getElementById("ai_access_form")!);
    expect(within(log).getByText(/Codice salvato per questa scheda/)).toBeTruthy();
    await waitFor(() => expect(document.getElementById("ai_access_form")).toBeNull());
  });

  it("refuses an answer of the wrong shape", async () => {
    reply(200, { reply: { html: "<b>x</b>" } });
    const log = renderPanel();
    fireEvent.click(document.getElementById("chip_sle")!);
    expect(await within(log).findByText(/risposta del server non valida/)).toBeTruthy();
  });

  it("closes from its own button", () => {
    const onClose = vi.fn();
    renderPanel(onClose);
    fireEvent.click(screen.getByRole("button", { name: /Chiudi/ }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
