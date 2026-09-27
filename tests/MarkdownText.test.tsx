// @vitest-environment jsdom
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import MarkdownText, { InlineText } from "../src/components/MarkdownText";
import { LABEL_CALLOUTS } from "../src/components/Callout";
import { DOMAIN_1_QUESTIONS, DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS, INITIAL_QUESTIONS } from "../src/data";
import { QUESTION_EN, SUBTOPIC_EN } from "../src/data.en";

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

describe("MarkdownText inline code", () => {
  it("shows `code` verbatim in a code element, without the backticks", () => {
    const { container } = render(<MarkdownText text={"Run `nmap -sV **host**` then **read** the output."} />);
    const code = container.querySelector("code")!;
    expect(code.textContent).toBe("nmap -sV **host**");
    expect(code.querySelector("strong")).toBeNull();
    expect(container.textContent).not.toContain("`");
    expect(screen.getByText("read").tagName).toBe("STRONG");
  });

  it("keeps markup inside code as text", () => {
    const { container } = render(<InlineText text={"Try `<script>alert(1)</script>` in the field"} />);
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("code")!.textContent).toBe("<script>alert(1)</script>");
  });

  it("finds every backtick of the study content in a pair, so none is shown stray", () => {
    const topics = [DOMAIN_1_TOPICS, DOMAIN_2_TOPICS, DOMAIN_3_TOPICS, DOMAIN_4_TOPICS, DOMAIN_5_TOPICS].flat();
    const texts: [string, string][] = [
      ...INITIAL_QUESTIONS.flatMap((q) => [q.scenario, q.question, q.explanation, ...q.options].map((t): [string, string] => [`Q${q.id}`, t ?? ""])),
      ...topics.flatMap((g) => g.subtopics.flatMap((s) => [s.definition, s.details, s.examTip].map((t): [string, string] => [s.checklistKey, t]))),
      ...Object.values(QUESTION_EN).flatMap((d) =>
        Object.entries(d).flatMap(([id, q]) => [q.scenario, q.question, q.explanation, ...(q.options ?? [])].map((t): [string, string] => [`EN Q${id}`, t ?? ""]))
      ),
      ...Object.values(SUBTOPIC_EN).flatMap((d) =>
        Object.entries(d).flatMap(([key, s]) => [s.definition, s.details, s.examTip].map((t): [string, string] => [`EN ${key}`, t ?? ""]))
      ),
    ];
    // Line by line, as MarkdownText renders them.
    const odd = texts.filter(([, t]) => t.split("\n").some((line) => (line.match(/`/g) ?? []).length % 2 === 1)).map(([where]) => where);
    expect(odd).toEqual([]);
  });
});
