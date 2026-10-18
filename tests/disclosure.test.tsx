// @vitest-environment jsdom
import { readFileSync, readdirSync } from "node:fs";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Disclosure, { DeepenTag } from "../src/components/Disclosure";

/*
 * One pattern of progressive disclosure for the whole app. Whole panels are
 * the first level; inside them, deepenings and answers use <Disclosure>, so
 * they look and behave the same everywhere (docs/style-guide.md).
 */

afterEach(cleanup);

/** The components allowed to write <details> themselves: Disclosure, and the first-level panels. */
const OWN_DETAILS: Record<string, number> = {
  "Disclosure.tsx": 2,
  "DomainGuidePanel.tsx": 1,
  "ReadinessPanel.tsx": 1,
  "StudyPathsPanel.tsx": 1,
  "PortfolioPanel.tsx": 1,
};

describe("Disclosure", () => {
  it("starts folded and shows its content once the summary is activated", () => {
    render(
      <Disclosure variant="deepen" id="x" summary={<><DeepenTag>Approfondimento</DeepenTag><h3>Fonti</h3></>}>
        <p>content</p>
      </Disclosure>
    );
    const details = document.getElementById("x") as HTMLDetailsElement;
    expect(details.open).toBe(false);
    fireEvent.click(screen.getByText("Fonti"));
    expect(details.open).toBe(true);
    expect(screen.getByText("content")).toBeTruthy();
  });

  it("keeps the summary valid HTML: phrasing content and a heading, no wrapper", () => {
    render(
      <Disclosure variant="deepen" summary={<><DeepenTag>Approfondimento</DeepenTag><h3>Fonti</h3></>}>
        <p>content</p>
      </Disclosure>
    );
    const summary = document.querySelector("summary")!;
    expect(summary.querySelector(":scope > h3")).not.toBeNull();
    expect(summary.querySelector("div, p, section")).toBeNull();
  });

  it("folds an answer behind its own toggle", () => {
    render(
      <Disclosure variant="answer" summary="Mostra il ragionamento">
        <p>reasoning</p>
      </Disclosure>
    );
    const details = document.querySelector("details")!;
    expect(details.open).toBe(false);
    fireEvent.click(screen.getByText("Mostra il ragionamento"));
    expect(details.open).toBe(true);
  });
});

describe("progressive disclosure across the app", () => {
  it("goes through <Disclosure> everywhere but in the first-level panels", () => {
    const dir = "src/components";
    const found: Record<string, number> = {};
    for (const file of readdirSync(dir)) {
      // Comments may mention <details>; only the markup counts.
      const code = readFileSync(`${dir}/${file}`, "utf8").replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
      const count = (code.match(/<details\b/g) ?? []).length;
      if (count > 0) found[file] = count;
    }
    expect(found).toEqual(OWN_DETAILS);
  });
});
