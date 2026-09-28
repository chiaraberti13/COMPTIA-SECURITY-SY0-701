import { ExternalLink, ScrollText } from "lucide-react";
import { useLang } from "../i18n";
import { CONCEPT_CITATIONS } from "../citations";
import { conceptRef } from "../canonicalTerms";
import { SOURCES } from "../contentReview";

/**
 * The documents a concept names, each linked, with the article when the text
 * states a specific rule (src/citations.ts). Nothing is shown for a concept
 * that names no law or standard.
 */
export default function ConceptSources({ domainId, checklistKey }: { domainId: number; checklistKey: string }) {
  const { lang, t } = useLang();
  const citations = CONCEPT_CITATIONS[conceptRef(domainId, checklistKey)];
  if (!citations?.length) return null;
  return (
    <section className="space-y-1.5" aria-label={t("study.sources")} id={`concept_sources_${checklistKey}`}>
      <h4 className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
        <ScrollText className="w-3.5 h-3.5" aria-hidden="true" />
        {t("study.sources")}
      </h4>
      <ul className="space-y-1 text-xs text-slate-400">
        {citations.map(({ source, locator }) => (
          <li key={source}>
            <a
              href={SOURCES[source].url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 underline decoration-cyan-800 underline-offset-2"
            >
              {SOURCES[source].title}
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
              <span className="sr-only">{t("a11y.newTab")}</span>
            </a>
            {locator && <span className="text-slate-400">, {locator[lang]}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
