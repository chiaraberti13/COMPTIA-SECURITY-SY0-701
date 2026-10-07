import { mkdirSync, mkdtempSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { lintMarkdown, markdownFiles } from "../scripts/lint-markdown";

const roots: string[] = [];
function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "sy0701-markdown-"));
  roots.push(root);
  writeFileSync(path.join(root, ".markdownlint.json"), JSON.stringify({ default: true }));
  return root;
}
afterEach(() => roots.splice(0).forEach(root => rmSync(root, { recursive: true, force: true })));

describe("Markdown lint", () => {
  it("covers root documents and all four document trees, excluding dependencies and symlinks", () => {
    const root = fixture();
    writeFileSync(path.join(root, "README.md"), "# Documentation\n");
    const dirs = ["docs/nested", "datasets", "labs/example", ".github", "node_modules", "dist", "src", "labs/example/node_modules"];
    for (const dir of dirs) {
      mkdirSync(path.join(root, dir), { recursive: true });
      writeFileSync(path.join(root, dir, "README.md"), "# Documentation\n");
    }
    symlinkSync(path.join(root, "src"), path.join(root, "docs", "linked"), "dir");
    expect(markdownFiles(root).map(file => path.relative(root, file))).toEqual([
      ".github/README.md", "README.md", "datasets/README.md", "docs/nested/README.md", "labs/example/README.md",
    ]);
  });

  it("reports rule and location for invalid Markdown while valid documents pass", async () => {
    const root = fixture();
    const file = path.join(root, "README.md");
    writeFileSync(file, "# Documentation\n");
    expect((await lintMarkdown(root)).issues).toBe("");
    writeFileSync(file, "#Missing space\n");
    expect((await lintMarkdown(root)).issues).toContain("MD018");
    expect((await lintMarkdown(root)).issues).toContain("README.md: 1");
  });

  it("fails when there are no documents instead of silently skipping lint", async () => {
    await expect(lintMarkdown(fixture())).rejects.toThrow("No Markdown documents found");
  });
});
