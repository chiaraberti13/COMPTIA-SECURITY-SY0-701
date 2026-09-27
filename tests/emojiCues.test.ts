import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Emoji and badges are never the only source of information (ROADMAP:
 * "Limitare emoji decorative e badge"; WCAG 1.1.1 and 1.4.1). A screen reader
 * reads "⚠️" as "warning sign" or skips it, a colour badge says nothing to
 * someone who cannot tell green from red, and the same emoji renders
 * differently on every system.
 *
 * - The app (components, interface strings, study content) uses no emoji:
 *   an icon from lucide-react with aria-hidden, next to words, instead.
 *   Arrows such as "↔" stay, because they are typography, not pictures.
 * - In the documentation a status emoji is followed by words that say the
 *   same thing ("✅ mitigato"), never alone in a table cell or at the end of
 *   a sentence.
 */

const PICTOGRAPH = /(?![\u2190-\u21FF])\p{Extended_Pictographic}/u;
/** An emoji followed by nothing but a cell border, punctuation or the end of the line. */
const EMOJI_WITHOUT_WORDS = /(?![\u2190-\u21FF])\p{Extended_Pictographic}\uFE0F?(?=\s*(?:[|.,;:!?)]|$))/u;

const walk = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));

/** Lines matching `pattern`, as "file:line". */
function offending(files: string[], pattern: RegExp): string[] {
  return files.flatMap((file) =>
    readFileSync(file, "utf8")
      .split("\n")
      .flatMap((line, i) => (pattern.test(line) ? [`${file}:${i + 1}`] : []))
  );
}

describe("emoji and badges", () => {
  it("are not used in the app: icons and words instead", () => {
    const sources = walk("src").filter((f) => /\.(ts|tsx|css)$/.test(f));
    expect(offending(sources, PICTOGRAPH)).toEqual([]);
  });

  it("are followed by words in the documentation", () => {
    const docs = [...walk("docs"), ...walk("labs"), "README.md", "README.it.md", "CONTRIBUTING.md", "SECURITY.md", "CODE_OF_CONDUCT.md"].filter((f) =>
      f.endsWith(".md")
    );
    expect(offending(docs, EMOJI_WITHOUT_WORDS)).toEqual([]);
  });

  it("are recognised by the checks above", () => {
    expect(PICTOGRAPH.test("⚠️ Errore")).toBe(true);
    expect(PICTOGRAPH.test("A ↔ B")).toBe(false);
    expect(EMOJI_WITHOUT_WORDS.test("| Spoofing | Rate limit | ✅ |")).toBe(true);
    expect(EMOJI_WITHOUT_WORDS.test("lo stato è 🟡 e non ✅.")).toBe(true);
    expect(EMOJI_WITHOUT_WORDS.test("| ✅ mitigato |")).toBe(false);
    expect(EMOJI_WITHOUT_WORDS.test("> ⚠️ **Attenzione:** solo su 127.0.0.1")).toBe(false);
  });
});
