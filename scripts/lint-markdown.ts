/** Markdown checks without a glob CLI or its vulnerable pattern parser. */
import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { lint, readConfig } from "markdownlint/promise";

const DOCUMENT_DIRS = new Set(["docs", "datasets", "labs", ".github"]);

/** Same document scope as before; never follow symlinks or scan dependencies. */
export function markdownFiles(root: string): string[] {
  const files: string[] = [];
  function walk(dir: string, topLevel = false) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name);
      if (entry.isFile() && entry.name.endsWith(".md")) files.push(file);
      else if (entry.isDirectory() && !["node_modules", "dist"].includes(entry.name) && (!topLevel || DOCUMENT_DIRS.has(entry.name))) walk(file);
    }
  }
  walk(root, true);
  return files.sort();
}

export async function lintMarkdown(root: string) {
  const files = markdownFiles(root);
  if (files.length === 0) throw new Error("No Markdown documents found");
  const config = await readConfig(path.join(root, ".markdownlint.json"));
  const results = await lint({ files, config });
  const issues = Object.entries(results).flatMap(([file, errors]) => errors.map(error =>
    `${path.relative(root, file)}: ${error.lineNumber}: ${error.ruleNames.join("/")} ${error.ruleDescription}${error.errorDetail ? ` (${error.errorDetail})` : ""}`,
  )).join("\n");
  return { files, issues };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  const { files, issues } = await lintMarkdown(process.cwd());
  console.log(`Markdown lint: ${files.length} files`);
  if (issues) {
    console.error(issues);
    process.exitCode = 1;
  } else console.log("Markdown lint passed");
}
