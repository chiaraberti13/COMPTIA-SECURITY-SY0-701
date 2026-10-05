// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
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
