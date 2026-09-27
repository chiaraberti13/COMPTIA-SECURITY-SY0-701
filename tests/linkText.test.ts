import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Descriptive links and text versions of images and diagrams (ROADMAP:
 * "Versioni testuali dei diagrammi e link descrittivi"; WCAG 1.1.1 and 2.4.4).
 *
 * Screen reader users often move through a page by its list of links, out of
 * context: "click here", "EN" or "0001" say nothing there. Images need an
 * alternative that says what they show, and a diagram needs a text version
 * (a list or a table) for anyone who cannot see it or zoom into it.
 */

const IGNORED_DIRS = new Set(["node_modules", "dist", "coverage", "playwright-report", "test-results", ".git"]);

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    IGNORED_DIRS.has(e.name) ? [] : e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]
  );

const files = walk(".");
const markdown = files.filter((f) => f.endsWith(".md"));
const read = (f: string) => readFileSync(f, "utf8");

/** Link texts that make no sense in a list of links. */
const VAGUE = /^(qui|here|click here|clicca qui|link|questo link|this link|leggi (di più|qui)|read more|more|di più|en|it|\d+)$/i;

/** Markdown with inline code removed: `<img>` in a sentence about images is not an image. */
const prose = (text: string) => text.replace(/`[^`\n]*`/g, "");

/**
 * The visible text of every link in a Markdown file, Markdown and HTML syntax.
 * A commit id linking to its commit is the name of what it points to (the
 * errata log lists the fixing commit), so it is not counted.
 */
function linkTexts(text: string): string[] {
  const md = [...prose(text).matchAll(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g)]
    .filter((m) => !(/^[0-9a-f]{7,40}$/.test(m[1]) && /\/commit\/[0-9a-f]{7,40}$/.test(m[2])))
    .map((m) => m[1]);
  const html = [...prose(text).matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1].replace(/<[^>]+>/g, ""));
  return [...md, ...html].map((t) => t.trim()).filter(Boolean);
}

/** Alternatives of every image in a Markdown file, Markdown and HTML syntax. */
function imageAlts(text: string): string[] {
  const md = [...prose(text).matchAll(/!\[([^\]]*)\]\(/g)].map((m) => m[1]);
  const html = [...prose(text).matchAll(/<img\b[^>]*>/g)].map((m) => /\balt="([^"]*)"/.exec(m[0])?.[1] ?? "");
  return [...md, ...html];
}

/** Badges (shields.io, Scorecard) state a fact in their alt; anything else drawn is a figure. */
const isBadge = (line: string) => /img\.shields\.io|api\.scorecard\.dev|\/badge\b/.test(line);

describe("links and images", () => {
  it("have link texts that make sense out of context", () => {
    const vague = markdown.flatMap((f) => linkTexts(read(f)).filter((t) => VAGUE.test(t)).map((t) => `${f}: "${t}"`));
    expect(vague).toEqual([]);
  });

  it("have images with an alternative that says what they show", () => {
    // A single word is a label ("MIT", "LEARNING"), not a description.
    const poor = markdown.flatMap((f) => imageAlts(read(f)).filter((alt) => !/\S+\s+\S+/.test(alt)).map((alt) => `${f}: "${alt}"`));
    expect(poor).toEqual([]);
  });

  it("have SVG files that name themselves to assistive technology", () => {
    const svgs = files.filter((f) => f.endsWith(".svg"));
    expect(svgs.length).toBeGreaterThan(0);
    const unnamed = svgs.filter((f) => {
      const root = /<svg\b[^>]*>/.exec(read(f))?.[0] ?? "";
      return !/role="img"/.test(root) || !/aria-label="[^"]{3,}"/.test(root);
    });
    expect(unnamed).toEqual([]);
  });

  it("have a text version under every diagram in the documentation", () => {
    const missing = markdown.flatMap((f) => {
      const lines = prose(read(f)).split("\n");
      return lines.flatMap((line, i) => {
        const figure = /^```mermaid/.test(line) || ((/!\[[^\]]*\]\(/.test(line) || /<img\b/.test(line)) && !isBadge(line) && !/banner\.svg/.test(line));
        if (!figure) return [];
        const after = lines.slice(i + 1, i + 40).join("\n");
        return /Versione testuale|Text version/.test(after) ? [] : [`${f}:${i + 1}`];
      });
    });
    expect(missing).toEqual([]);
  });

  it("are recognised by the checks above", () => {
    expect(linkTexts("Apri [qui](https://example.com) o <a href='x'>click here</a>").filter((t) => VAGUE.test(t))).toEqual(["qui", "click here"]);
    expect(linkTexts("[Contenuti di studio come dataset](0001.md)").filter((t) => VAGUE.test(t))).toEqual([]);
    expect(imageAlts('<img src="x.svg" alt="MIT"> ![](diagram.png) `<img>`')).toEqual(["", "MIT"]);
    expect(linkTexts("[549aa0b](https://github.com/o/r/commit/549aa0b) [1234](https://example.com)")).toEqual(["1234"]);
  });
});
