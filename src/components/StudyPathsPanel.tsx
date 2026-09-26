import { useState } from "react";
import { ChevronRight, Compass } from "lucide-react";
import { useLang } from "../i18n";
import { STUDY_PATHS, actionLabel, type StudyAction, type StudyPathId } from "../studyPaths";

/**
 * "Where do I start?": four guided study paths. Each step can jump to the part
 * of the app it describes; the parent performs the jump through `onAction`.
 * Open by default for a learner with no progress yet.
 */
export default function StudyPathsPanel({
  defaultOpen,
  onAction,
}: {
  defaultOpen: boolean;
  onAction: (action: StudyAction) => void;
}) {
  const { t, lang } = useLang();
  const paths = STUDY_PATHS[lang];
  const [open, setOpen] = useState(defaultOpen);
  const [selected, setSelected] = useState<StudyPathId>("beginner");
  const path = paths.find((p) => p.id === selected) ?? paths[0];

  return (
    <details
      id="study_paths"
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="group bg-slate-900 border border-slate-800 rounded-lg shadow-md overflow-hidden"
    >
      <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <Compass className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-100">{t("paths.title")}</h2>
            <p className="text-xs text-slate-400">{t("paths.subtitle")}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
      </summary>

      <div className="border-t border-slate-800 p-5 sm:p-6 space-y-5">
        <div role="group" aria-label={t("paths.choose")} className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {paths.map((p) => (
            <button
              key={p.id}
              type="button"
              id={`study_path_${p.id}`}
              aria-pressed={p.id === selected}
              onClick={() => setSelected(p.id)}
              className={`min-h-[44px] px-3 py-2 rounded border text-xs font-semibold text-left transition-colors ${
                p.id === selected
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                  : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-300 border-l-2 border-cyan-500 pl-4">{path.forWhom}</p>

        <ol className="space-y-3" aria-label={t("paths.stepsFor", { name: path.title })} id="study_path_steps">
          {path.steps.map((step, i) => (
            <li key={`${path.id}-${i}`} className="flex gap-3">
              <span
                className="shrink-0 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono font-bold text-cyan-300 flex items-center justify-center"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="space-y-2 min-w-0">
                <p className="text-sm text-slate-300 leading-relaxed">{step.text}</p>
                {step.action && (
                  <button
                    type="button"
                    onClick={() => onAction(step.action!)}
                    className="min-h-[32px] inline-flex items-center gap-1 px-3 py-1.5 rounded border border-cyan-800 bg-cyan-950/40 text-[11px] font-semibold text-cyan-300 hover:bg-cyan-900/40 transition-colors"
                  >
                    {actionLabel(step.action, t)}
                    <ChevronRight className="w-3 h-3" aria-hidden="true" />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </details>
  );
}
