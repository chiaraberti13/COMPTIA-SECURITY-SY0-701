import { useState } from "react";
import { BookOpen } from "lucide-react";
import { useLang } from "../i18n";
import { findGlossaryTerms, type GlossaryHint } from "../glossaryIndex";

/**
 * "Glossary terms in this text": the glossary acronyms found in the given
 * texts, as toggle buttons that show the definition in place, so the learner
 * does not have to leave a question or a concept to look a term up.
 */
export default function GlossaryHints({
  texts,
  index,
  idPrefix,
  exclude,
}: {
  texts: readonly string[];
  index: ReadonlyMap<string, GlossaryHint>;
  /** Unique per instance: the ids of the definition panels derive from it. */
  idPrefix: string;
  /** Glossary entry not to list, e.g. the concept being read. */
  exclude?: string;
}) {
  const { t } = useLang();
  // Cheap (a regex over a few paragraphs), so no memoisation is needed.
  const hints = findGlossaryTerms(texts, index, 6, exclude);
  const [openId, setOpenId] = useState<string | null>(null);
  if (hints.length === 0) return null;
  const open = hints.find((h) => h.id === openId);

  return (
    <section className="space-y-2" aria-label={t("gloss.hintsTitle")} id={`${idPrefix}_glossary_hints`}>
      <h4 className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
        <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
        {t("gloss.hintsTitle")}
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {hints.map((hint) => (
          <button
            key={hint.id}
            type="button"
            aria-expanded={hint.id === openId}
            aria-controls={`${idPrefix}_glossary_definition`}
            onClick={() => setOpenId(hint.id === openId ? null : hint.id)}
            className={`min-h-[28px] px-2.5 py-1 rounded border text-[11px] font-mono font-semibold transition-colors ${
              hint.id === openId
                ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-600"
            }`}
          >
            {hint.acronym}
          </button>
        ))}
      </div>
      <div id={`${idPrefix}_glossary_definition`} role="region" aria-live="polite" aria-label={t("gloss.hintsTitle")}>
        {open && (
          <div className="bg-slate-950 border border-slate-800 rounded p-3 space-y-1.5">
            <p className="text-xs font-bold text-slate-200">{open.term}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{open.definition}</p>
            {open.examTip && (
              <p className="text-[11px] text-cyan-300 leading-relaxed">
                <span className="font-bold">{t("study.examTipTitle")}:</span> {open.examTip}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
