import type { ReactNode } from "react";
import { AlertTriangle, BookOpen, FlaskConical, Info, Target, XCircle } from "lucide-react";

/**
 * The six standard callouts of the study content. Each one has its own icon
 * and colour, but the title is always written out, so the meaning never rests
 * on colour alone (WCAG 1.4.1).
 */
export type CalloutKind = "note" | "exam" | "practice" | "warning" | "mistake" | "deepDive";

const STYLE: Record<CalloutKind, { icon: typeof Info; box: string; title: string }> = {
  note: { icon: Info, box: "border-sky-800/60 bg-sky-950/20", title: "text-sky-300" },
  exam: { icon: Target, box: "border-cyan-800/60 bg-cyan-950/20", title: "text-cyan-300" },
  practice: { icon: FlaskConical, box: "border-emerald-800/60 bg-emerald-950/20", title: "text-emerald-300" },
  warning: { icon: AlertTriangle, box: "border-amber-800/60 bg-amber-950/20", title: "text-amber-300" },
  mistake: { icon: XCircle, box: "border-rose-800/60 bg-rose-950/20", title: "text-rose-300" },
  deepDive: { icon: BookOpen, box: "border-violet-800/60 bg-violet-950/20", title: "text-violet-300" },
};

export default function Callout({
  kind,
  title,
  children,
  id,
  heading,
}: {
  kind: CalloutKind;
  title: string;
  children: ReactNode;
  id?: string;
  /** Makes the title a heading, where the callout is a section of its own. */
  heading?: "h3" | "h4";
}) {
  const { icon: Icon, box, title: titleColour } = STYLE[kind];
  const Title = heading ?? "p";
  return (
    <div role="note" id={id} data-callout={kind} className={`border-l-2 rounded-r-md px-3 py-2.5 ${box}`}>
      <Title className={`flex items-center gap-1.5 text-xs font-bold ${titleColour}`}>
        <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        {title}
      </Title>
      <div className="mt-1 text-sm leading-relaxed text-slate-300">{children}</div>
    </div>
  );
}

/**
 * Lead-in labels the explanations already use, in both languages, and the
 * callout each one becomes. A label not listed here stays ordinary bold text.
 */
export const LABEL_CALLOUTS: Record<string, CalloutKind> = {
  "Trappola d'esame": "exam",
  "Exam trap": "exam",
  "Terminologia d'esame": "exam",
  "Exam terminology": "exam",
  "Piccolo Esempio Concentrato": "practice",
  "Focused Mini-Example": "practice",
  "Nota pratica": "practice",
  "Pericolo": "warning",
  "Danger": "warning",
  "Attenzione": "warning",
  "Warning": "warning",
  "Da ricordare": "note",
  "Remember": "note",
};
