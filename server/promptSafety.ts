/**
 * Spotlighting for prompt injection (OWASP LLM01): every piece of text that
 * comes from the browser enters the prompt inside an explicit tag, and the
 * system prompt says that tagged text is data, never instructions.
 *
 * The tags only help if the user cannot close them. neutralize() removes any
 * reserved tag the text contains, also when it is disguised with other case,
 * spaces, full-width brackets (＜＞) or invisible characters inside the name.
 * No filter makes a model immune to injection; this one makes the boundary
 * between rules and data unambiguous, and the tests in
 * tests/promptInjection.test.ts keep it that way.
 */

/** Tags that frame untrusted text in the prompts. */
export const DATA_TAGS = ["student_message", "trainer_message", "topic"] as const;
export type DataTag = (typeof DATA_TAGS)[number];

/** Zero-width and other invisible format characters used to split words. */
const INVISIBLE = /[\u00AD\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/g;

/** Any opening or closing reserved tag, tolerating spaces, attributes and case. */
const RESERVED_TAG = new RegExp(`<\\s*/?\\s*(?:${DATA_TAGS.join("|")})\\b[^>]*>`, "gi");

/**
 * Makes text safe to place inside a data tag: canonical Unicode form (so
 * full-width brackets become ASCII ones), no invisible characters, and no
 * reserved tags left that could end the data block early.
 */
export function neutralize(text: string): string {
  let out = text.normalize("NFKC").replace(INVISIBLE, "");
  // Repeat: removing one tag must not join two fragments into a new one.
  for (let previous = ""; previous !== out; ) {
    previous = out;
    out = out.replace(RESERVED_TAG, "");
  }
  return out;
}

/** Text framed as data: `<tag>…</tag>`. */
export function asData(tag: DataTag, text: string): string {
  return `<${tag}>${neutralize(text)}</${tag}>`;
}
