import type { ReactNode } from "react";
import Callout, { LABEL_CALLOUTS } from "./Callout";

/** Bold spans of a piece of text: plain text and **bold**. */
function bold(text: string, keyBase: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const boldRegex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;
  while ((match = boldRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.substring(lastIndex, match.index));
    parts.push(
      <strong key={`${keyBase}b${match.index}`} className="font-semibold text-cyan-400">
        {match[1]}
      </strong>
    );
    lastIndex = boldRegex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.substring(lastIndex));
  return parts;
}

/**
 * Inline Markdown of one line: `code` spans, then **bold** in the rest. Code
 * is shown verbatim in a monospace box, so a command such as `ssh admin@host`
 * reads as a command and not as prose with stray backticks.
 */
function inline(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const codeRegex = /`([^`\n]+)`/g;
  let lastIndex = 0;
  let match;
  while ((match = codeRegex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(...bold(text.substring(lastIndex, match.index), `t${lastIndex}`));
    parts.push(
      <code key={`c${match.index}`} className="font-mono text-[0.85em] text-cyan-200 bg-slate-950 border border-slate-800 rounded px-1 py-0.5 break-words">
        {match[1]}
      </code>
    );
    lastIndex = codeRegex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(...bold(text.substring(lastIndex), `t${lastIndex}`));
  return parts.length > 0 ? parts : text;
}

/** One line of text with `code` and **bold**, for fields shown inline (options, scenarios, tips). */
export function InlineText({ text }: { text: string }) {
  return <>{inline(text)}</>;
}

/**
 * Renders the small Markdown subset used by the study texts and by the AI
 * Trainer: paragraphs, "*" or "-" bullets, **bold** and `code`. A bullet that opens
 * with one of the standard lead-in labels ("**Exam trap:**", "**Focused
 * Mini-Example:**", see LABEL_CALLOUTS) becomes the matching callout.
 * Everything is built as React elements, never as HTML, so a tag in the text
 * (for example in an AI answer) is shown literally and cannot run (see the
 * "AI output is untrusted" end-to-end test).
 */
export default function MarkdownText({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n");
  return (
    <div className="space-y-2">
      {lines.map((line, idx) => {
        let trimmed = line.trim();
        if (trimmed === "") return <div key={idx} className="h-2" />;

        const isBullet = trimmed.startsWith("*") || trimmed.startsWith("-");
        if (isBullet) {
          trimmed = trimmed.substring(1).trim();
          const labelled = /^\*\*([^*]+?):\*\*\s*(.*)$/.exec(trimmed);
          const kind = labelled ? LABEL_CALLOUTS[labelled[1]] : undefined;
          if (labelled && kind) {
            return (
              <Callout key={idx} kind={kind} title={labelled[1]}>
                {inline(labelled[2])}
              </Callout>
            );
          }
          return (
            <div key={idx} className="flex items-start gap-2 pl-4 text-slate-300">
              <span className="text-cyan-500 mt-1.5 text-xs">●</span>
              <span className="text-sm leading-relaxed">{inline(trimmed)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-sm leading-relaxed text-slate-300">
            {inline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}
