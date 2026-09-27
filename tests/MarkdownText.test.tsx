// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import MarkdownText from "../src/components/MarkdownText";
import { LABEL_CALLOUTS } from "../src/components/Callout";
import { DOMAIN_1_QUESTIONS } from "../src/data";
import { QUESTION_EN } from "../src/data.en";

afterEach(cleanup);

describe("MarkdownText callouts", () => {
  it("turns a bullet that opens with a standard label into a titled callout", () => {
    render(<MarkdownText text={"* **Why it's correct:** plain bullet.\n* **Exam trap:** read the **verb** of the question."} />);
    const note = screen.getByRole("note");
    expect(note.getAttribute("data-callout")).toBe("exam");
    // The meaning is written, not only coloured.
    expect(within(note).getByText("Exam trap")).toBeTruthy();
    expect(within(note).getByText("verb").tagName).toBe("STRONG");
    // A label that is not a callout stays an ordinary bullet.
    expect(screen.getByText("Why it's correct:").closest("[role=note]")).toBeNull();
  });

  it("gives each kind its own callout, in both languages", () => {
    render(
      <MarkdownText
        text={"* **Piccolo Esempio Concentrato:** a.\n* **Focused Mini-Example:** b.\n* **Pericolo:** c.\n* **Da ricordare:** d."}
      />
    );
    const kinds = screen.getAllByRole("note").map((n) => n.getAttribute("data-callout"));
    expect(kinds).toEqual(["practice", "practice", "warning", "note"]);
  });

  it("keeps markup in a labelled line as text, as for any AI answer", () => {
    const { container } = render(<MarkdownText text={"* **Exam trap:** <img src=x onerror=alert(1)> <script>alert(1)</script>"} />);
    expect(container.querySelector("img, script")).toBeNull();
    expect(screen.getByRole("note").textContent).toContain("<script>alert(1)</script>");
  });

  it("maps labels that the explanations actually use, in Italian and in English", () => {
    const italian = DOMAIN_1_QUESTIONS.map((q) => q.explanation).join("\n");
    const english = Object.values(QUESTION_EN[1]).map((q) => q.explanation ?? "").join("\n");
    for (const label of ["Trappola d'esame", "Piccolo Esempio Concentrato"]) {
      expect(LABEL_CALLOUTS[label]).toBeDefined();
      expect(italian).toContain(`**${label}:**`);
    }
    for (const label of ["Exam trap", "Focused Mini-Example"]) {
      expect(LABEL_CALLOUTS[label]).toBeDefined();
      expect(english).toContain(`**${label}:**`);
    }
  });
});
