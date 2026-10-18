import { useState } from "react";
import { readinessCheckId, type DomainGuide } from "../domainGuides";
import { useLang } from "../i18n";
import { sanitizeChecklist } from "../progressBackup";
import { STORAGE_KEYS, readJSON, writeJSON } from "../storage";

/**
 * The end of a domain guide: the ideas to keep, the acronyms of the domain,
 * the correct reading of the frequent mistakes and a self-assessment the
 * learner ticks. Ticks stay in this browser and travel with the progress
 * backup; they are the learner's own judgement, not a score.
 */
export default function ModuleSummary({ guide, headingProps }: { guide: DomainGuide; headingProps: { id: string; tabIndex: number } }) {
  const { t } = useLang();
  const d = guide.domainId;
  const [ticked, setTicked] = useState<Record<string, true>>(() =>
    sanitizeChecklist(readJSON<unknown>(STORAGE_KEYS.selfAssessment, {}))
  );
  const ids = guide.readinessChecks.map((_, i) => readinessCheckId(d, i));
  const done = ids.filter((id) => ticked[id]).length;

  const toggle = (id: string) => {
    // Re-read first: another open guide may have ticked its own points.
    const next = { ...sanitizeChecklist(readJSON<unknown>(STORAGE_KEYS.selfAssessment, {})) };
    if (ticked[id]) delete next[id];
    else next[id] = true;
    writeJSON(STORAGE_KEYS.selfAssessment, next);
    setTicked(next);
  };

  const subheading = "text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider";
  return (
    <section aria-labelledby={headingProps.id} className="bg-cyan-950/20 border border-cyan-900/40 rounded-lg p-4 space-y-5">
      <h3 {...headingProps} className="focus:outline-none text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
        {t("study.moduleSummary")}
      </h3>

      <div className="space-y-2">
        <h4 className={subheading}>{t("study.keyPoints")}</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed marker:text-cyan-600">
          {guide.keyPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <h4 className={subheading}>{t("study.acronyms")}</h4>
        <dl className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_1fr] gap-x-3 gap-y-1 text-xs leading-relaxed">
          {guide.acronyms.map(({ acronym, expansion }) => (
            <div key={acronym} className="contents">
              <dt className="font-mono font-bold text-slate-200">{acronym}</dt>
              <dd lang="en" className="text-slate-400">{expansion}</dd>
            </div>
          ))}
        </dl>
      </div>

      {guide.commonTraps && guide.commonTraps.length > 0 && (
        <div className="space-y-2">
          <h4 className={subheading}>{t("study.summaryTraps")}</h4>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300 leading-relaxed marker:text-cyan-600">
            {guide.commonTraps.map((trap) => (
              <li key={trap.correction}>{trap.correction}</li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="space-y-2">
        <legend className={subheading}>{t("study.readiness")}</legend>
        <p className="text-xs text-slate-400 leading-relaxed">{t("study.selfAssessmentIntro")}</p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {guide.readinessChecks.map((check, i) => (
            <li key={ids[i]}>
              <label className="flex gap-2 text-xs text-slate-300 leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(ticked[ids[i]])}
                  onChange={() => toggle(ids[i])}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-cyan-500"
                />
                <span>{check}</span>
              </label>
            </li>
          ))}
        </ul>
        <p role="status" className="text-xs font-bold text-cyan-300">
          {done === ids.length ? t("study.selfAssessmentDone") : t("study.selfAssessmentStatus", { done, total: ids.length })}
        </p>
      </fieldset>
    </section>
  );
}
