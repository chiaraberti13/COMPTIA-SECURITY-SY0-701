import type { ReactNode } from "react";

/**
 * Renders the small Markdown subset used by the study texts and by the AI
 * Trainer: paragraphs, "*" or "-" bullets and **bold**. Everything is built as
 * React elements, never as HTML, so a tag in the text (for example in an AI
 * answer) is shown literally and cannot run (see the "AI output is untrusted"
 * end-to-end test).
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
        }

        const parts: ReactNode[] = [];
        const boldRegex = /\*\*(.*?)\*\*/g;
        let lastIndex = 0;
        let match;

        while ((match = boldRegex.exec(trimmed)) !== null) {
          if (match.index > lastIndex) {
            parts.push(trimmed.substring(lastIndex, match.index));
          }
          parts.push(
            <strong key={match.index} className="font-semibold text-cyan-400">
              {match[1]}
            </strong>
          );
          lastIndex = boldRegex.lastIndex;
        }

        if (lastIndex < trimmed.length) {
          parts.push(trimmed.substring(lastIndex));
        }

        const content = parts.length > 0 ? parts : trimmed;

        if (isBullet) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-4 text-slate-300">
              <span className="text-cyan-500 mt-1.5 text-xs">●</span>
              <span className="text-sm leading-relaxed">{content}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="text-sm leading-relaxed text-slate-300">
            {content}
          </p>
        );
      })}
    </div>
  );
}
