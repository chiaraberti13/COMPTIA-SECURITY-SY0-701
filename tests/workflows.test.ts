import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const WORKFLOW_DIR = join(process.cwd(), ".github", "workflows");

const workflows = readdirSync(WORKFLOW_DIR)
  .filter((name) => /\.ya?ml$/.test(name))
  .map((name) => ({ name, text: readFileSync(join(WORKFLOW_DIR, name), "utf8") }));

/** Every `uses:` reference in a workflow, with the file and line it sits on. */
const references = workflows.flatMap(({ name, text }) =>
  text.split("\n").flatMap((line, index) => {
    const match = line.match(/^\s*(?:-\s*)?uses:\s*(\S+)(.*)$/);
    return match ? [{ where: `${name}:${index + 1}`, ref: match[1], rest: match[2] }] : [];
  })
);

describe("GitHub Actions workflows", () => {
  it("exist and reference at least one action", () => {
    expect(workflows.length).toBeGreaterThan(0);
    expect(references.length).toBeGreaterThan(0);
  });

  it("pin every third-party action to a full commit SHA", () => {
    // Local actions (./path) and container images (docker://) are not tags.
    const unpinned = references
      .filter(({ ref }) => !ref.startsWith("./") && !ref.startsWith("docker://"))
      .filter(({ ref }) => !/^[\w.-]+\/[\w./-]+@[0-9a-f]{40}$/.test(ref))
      .map(({ where, ref }) => `${where} ${ref}`);
    expect(unpinned).toEqual([]);
  });

  it("record the pinned release next to every SHA", () => {
    const undocumented = references
      .filter(({ ref }) => /@[0-9a-f]{40}$/.test(ref))
      .filter(({ rest }) => !/#\s*v\d+(\.\d+){0,2}\b/.test(rest))
      .map(({ where, ref }) => `${where} ${ref}`);
    expect(undocumented).toEqual([]);
  });

  it("declare explicit permissions", () => {
    const missing = workflows
      .filter(({ text }) => !/^permissions:/m.test(text))
      .map(({ name }) => name);
    expect(missing).toEqual([]);
  });
});
