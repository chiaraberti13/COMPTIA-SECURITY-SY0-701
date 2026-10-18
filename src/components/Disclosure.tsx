import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Progressive disclosure inside study content, one look for the whole app
 * (docs/style-guide.md, "Divulgazione progressiva"):
 *
 * - `deepen`: material beyond the core of a concept or guide (cross-domain
 *   links, extra comparisons, exam vs practice, sources). The summary says it
 *   is a deepening and what it holds, so nothing is hidden by surprise.
 * - `answer`: the solution of an exercise, folded so the learner commits to an
 *   answer first.
 *
 * Whole panels (a domain guide, "Where do I start?") are the first level and
 * keep their own larger summary. Native <details> keeps the content in the
 * page, reachable by find-in-page and without JavaScript.
 */
export default function Disclosure({
  variant,
  summary,
  children,
  id,
  className = "",
}: {
  variant: "deepen" | "answer";
  /** The visible toggle text; for `deepen`, may hold a heading for the outline. */
  summary: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  if (variant === "answer") {
    return (
      <details id={id} className={`group/answer border-t border-slate-800 pt-2 ${className}`}>
        <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded">
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-open/answer:rotate-90" aria-hidden="true" />
          {summary}
        </summary>
        <div className="mt-2">{children}</div>
      </details>
    );
  }
  return (
    <details id={id} className={`group/deepen border border-slate-800 rounded-lg scroll-mt-4 ${className}`}>
      {/* A summary holds phrasing content and at most a heading, so no wrapper element. */}
      <summary className="cursor-pointer list-none p-3 flex flex-wrap items-center gap-x-2 gap-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500 rounded-lg hover:bg-slate-900/60">
        {summary}
        <ChevronRight className="w-3.5 h-3.5 shrink-0 ml-auto text-slate-400 transition-transform group-open/deepen:rotate-90" aria-hidden="true" />
      </summary>
      <div className="border-t border-slate-800 p-4 space-y-4">{children}</div>
    </details>
  );
}

/** The "Deepening" tag that opens every `deepen` summary. */
export function DeepenTag({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-900 px-2 py-0.5 rounded-full uppercase tracking-wider">
      {children}
    </span>
  );
}
