// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getPbqScenarios } from "../src/localizedPbq";
import PbqScreen from "../src/components/PbqScreen";
import { usePbqSession } from "../src/hooks/usePbqSession";
import { LanguageProvider } from "../src/i18n";
import type { MatchingPbq, OrderingPbq, Pbq } from "../src/pbq";

/*
 * The practice area as the learner drives it: picking a scenario, matching with
 * accessible <select> controls, reordering steps from the keyboard-operable
 * arrow buttons, and reading a worded verdict (never colour alone).
 */

const matching: MatchingPbq = {
  id: 301,
  kind: "matching",
  mechanic: "matching",
  objective: "2.2",
  domain: 2,
  title: "Matching sample",
  scenario: "A sample situation.",
  prompt: "Match each item.",
  explanation: "Because reasons.",
  prompts: [
    { id: "p1", text: "clue one", correctOptionId: "o1" },
    { id: "p2", text: "clue two", correctOptionId: "o2" },
  ],
  options: [
    { id: "o1", text: "Answer A" },
    { id: "o2", text: "Answer B" },
    { id: "o3", text: "Distractor" },
  ],
};

const ordering: OrderingPbq = {
  id: 101,
  kind: "ordering",
  mechanic: "ordering",
  objective: "1.3",
  domain: 1,
  title: "Ordering sample",
  scenario: "A sample situation.",
  prompt: "Put the steps in order.",
  explanation: "Because reasons.",
  steps: [
    { id: "a", text: "step alpha" },
    { id: "b", text: "step beta" },
    { id: "c", text: "step gamma" },
  ],
};

function Harness({ scenarios }: { scenarios: Pbq[] }) {
  const session = usePbqSession();
  return <PbqScreen session={session} scenarios={scenarios} />;
}

function renderHarness(scenarios: Pbq[]) {
  localStorage.setItem("comptia_sy0701_lang", "it");
  render(
    <LanguageProvider>
      <Harness scenarios={scenarios} />
    </LanguageProvider>
  );
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

describe("PbqScreen chooser", () => {
  it("lists the scenarios with a start-all and a per-scenario start", () => {
    renderHarness([matching, ordering]);
    expect(screen.getByText("Matching sample")).toBeTruthy();
    expect(screen.getByText("Ordering sample")).toBeTruthy();
    expect(document.getElementById("pbq_start_all")).toBeTruthy();
    expect(document.getElementById("pbq_start_301")).toBeTruthy();
    expect(document.getElementById("pbq_start_101")).toBeTruthy();
  });
});

describe("PbqScreen matching", () => {
  it("grades a correct set of matches as all correct", () => {
    renderHarness([matching]);
    fireEvent.click(document.getElementById("pbq_start_301")!);

    // The selects are labelled by the prompt text (accessible name).
    fireEvent.change(screen.getByLabelText("clue one"), { target: { value: "o1" } });
    const submit = document.getElementById("pbq_submit") as HTMLButtonElement;
    expect(submit.disabled).toBe(true); // not every prompt assigned yet
    fireEvent.change(screen.getByLabelText("clue two"), { target: { value: "o2" } });
    expect(submit.disabled).toBe(false);

    fireEvent.click(submit);
    // Shown in the live-region announcer and in the visible heading.
    expect(screen.getAllByText("Tutto corretto").length).toBeGreaterThan(0);
    expect(screen.getByText("Because reasons.")).toBeTruthy();
  });

  it("names the correct option in words when a match is wrong", () => {
    renderHarness([matching]);
    fireEvent.click(document.getElementById("pbq_start_301")!);
    fireEvent.change(screen.getByLabelText("clue one"), { target: { value: "o3" } });
    fireEvent.change(screen.getByLabelText("clue two"), { target: { value: "o2" } });
    fireEvent.click(document.getElementById("pbq_submit")!);

    expect(screen.getAllByText("1 su 2 corretti").length).toBeGreaterThan(0);
    const wrongRow = document.getElementById("pbq_match_row_p1")!;
    expect(within(wrongRow).getByText("Da rivedere")).toBeTruthy();
    // The verdict names the correct option in words (not the <option> in the select).
    expect(within(wrongRow).getByText("Corretto: Answer A")).toBeTruthy();
  });
});

describe("PbqScreen ordering", () => {
  it("reorders steps from the arrow buttons and grades on submit", () => {
    renderHarness([ordering]);
    fireEvent.click(document.getElementById("pbq_start_101")!);

    const rowOrder = () =>
      [...document.querySelectorAll("#pbq_order_list > li")].map((li) => li.id);
    const before = rowOrder();
    expect(before.length).toBe(3);

    // Move the first row down: it swaps with the second.
    const firstId = before[0].replace("pbq_step_", "");
    fireEvent.click(document.getElementById(`pbq_down_${firstId}`)!);
    const after = rowOrder();
    expect(after[1]).toBe(`pbq_step_${firstId}`);

    // Submitting grades the scenario; a scrambled order shows the correct one.
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_feedback")).toBeTruthy();
  });

  it("gives the move buttons descriptive accessible names", () => {
    renderHarness([ordering]);
    fireEvent.click(document.getElementById("pbq_start_101")!);
    // Each arrow button's aria-label carries the step text it moves.
    expect(screen.getAllByRole("button", { name: /Sposta su:|Sposta giù:/ }).length).toBeGreaterThan(0);
  });
});


describe("firewall PBQ reset", () => {
  it("shows the authored feedback and clears all answers on restart", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 303)! as MatchingPbq;
    renderHarness([matching, pbq]);
    fireEvent.click(document.getElementById("pbq_start_303")!);
    for (const p of pbq.prompts) {
      fireEvent.change(screen.getByLabelText(p.text), { target: { value: p.correctOptionId } });
    }
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("NAT traduce indirizzi");
    fireEvent.click(document.getElementById("pbq_next")!);
    expect(document.getElementById("pbq_summary")).toBeTruthy();
    fireEvent.click(document.getElementById("pbq_restart")!);
    expect(document.getElementById("pbq_feedback")).toBeNull();
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("VPN PBQ reset", () => {
  it("shows the authored feedback and clears all answers on restart", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 304)! as MatchingPbq;
    renderHarness([matching, pbq]);
    fireEvent.click(document.getElementById("pbq_start_304")!);
    for (const p of pbq.prompts) {
      fireEvent.change(screen.getByLabelText(p.text), { target: { value: p.correctOptionId } });
    }
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("Transport mode protegge");
    fireEvent.click(document.getElementById("pbq_next")!);
    expect(document.getElementById("pbq_summary")).toBeTruthy();
    fireEvent.click(document.getElementById("pbq_restart")!);
    expect(document.getElementById("pbq_feedback")).toBeNull();
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("Wi-Fi PBQ reset", () => {
  it("shows the authored feedback and clears all answers on restart", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 305)! as MatchingPbq;
    renderHarness([matching, pbq]);
    fireEvent.click(document.getElementById("pbq_start_305")!);
    for (const p of pbq.prompts) {
      fireEvent.change(screen.getByLabelText(p.text), { target: { value: p.correctOptionId } });
    }
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("non è un metodo EAP");
    fireEvent.click(document.getElementById("pbq_next")!);
    expect(document.getElementById("pbq_summary")).toBeTruthy();
    fireEvent.click(document.getElementById("pbq_restart")!);
    expect(document.getElementById("pbq_feedback")).toBeNull();
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("DMARC PBQ reset", () => {
  it("shows the authored feedback and clears all answers on restart", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 403)! as MatchingPbq;
    renderHarness([matching, pbq]);
    fireEvent.click(document.getElementById("pbq_start_403")!);
    for (const p of pbq.prompts) {
      fireEvent.change(screen.getByLabelText(p.text), { target: { value: p.correctOptionId } });
    }
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("non garantiscono l’azione");
    fireEvent.click(document.getElementById("pbq_next")!);
    expect(document.getElementById("pbq_summary")).toBeTruthy();
    fireEvent.click(document.getElementById("pbq_restart")!);
    expect(document.getElementById("pbq_feedback")).toBeNull();
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("vulnerability PBQ reset", () => {
  it("renders evidence, rejects score-only triage and clears answers on restart", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 306)! as MatchingPbq;
    renderHarness([pbq]);
    fireEvent.click(document.getElementById("pbq_start_306")!);
    const table = screen.getByRole("table", { name: "Evidenze sintetiche dei finding A–D" });
    expect(within(table).getAllByRole("row")).toHaveLength(5);
    expect(screen.getByRole("region", { name: "Evidenze sintetiche dei finding A–D" }).tabIndex).toBe(0);
    expect(screen.getByRole("link", { name: "Tenable Nessus Credentialed Checks" }).getAttribute("href")).toContain("docs.tenable.com");
    for (const p of pbq.prompts) {
      fireEvent.change(screen.getByLabelText(p.text), { target: { value: p.id === "p_finding_a" ? "score_only" : p.correctOptionId } });
    }
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_match_row_p_finding_a")!.textContent).toContain("Corretto: P1:");
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("autenticazione fallita è inconcludente");
    fireEvent.click(document.getElementById("pbq_next")!);
    fireEvent.click(document.getElementById("pbq_restart")!);
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});

describe("NAC posture PBQ", () => {
  it("shows posture evidence, diagnoses unknown-state trust and resets all answers", () => {
    const pbq = getPbqScenarios("it").find(p => p.id === 503)! as MatchingPbq;
    renderHarness([pbq]);
    fireEvent.click(document.getElementById("pbq_start_503")!);
    const table = screen.getByRole("table", { name: "Postura e identità dei dispositivi A–E" });
    expect(within(table).getAllByRole("row")).toHaveLength(6);
    expect(screen.getByRole("region", { name: "Postura e identità dei dispositivi A–E" }).tabIndex).toBe(0);
    expect(screen.getByRole("link", { name: "Cisco ISE 3.4 — Compliance" }).getAttribute("href")).toContain("www.cisco.com");
    for (const p of pbq.prompts) fireEvent.change(screen.getByLabelText(p.text), {
      target: { value: p.id === "p_device_e" ? "unknown_compliant" : p.correctOptionId },
    });
    fireEvent.click(document.getElementById("pbq_submit")!);
    expect(document.getElementById("pbq_match_row_p_device_e")!.textContent).toContain("Corretto: Accesso limitato");
    expect(document.getElementById("pbq_feedback")!.textContent).toContain("nuova valutazione riuscita");
    fireEvent.click(document.getElementById("pbq_next")!);
    fireEvent.click(document.getElementById("pbq_restart")!);
    for (const p of pbq.prompts) expect((screen.getByLabelText(p.text) as HTMLSelectElement).value).toBe("");
    expect((document.getElementById("pbq_submit") as HTMLButtonElement).disabled).toBe(true);
  });
});
