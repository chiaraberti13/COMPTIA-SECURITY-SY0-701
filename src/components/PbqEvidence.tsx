import type { Pbq } from "../pbq";
import { SOURCES } from "../contentReview";
import { useLang } from "../i18n";

/** Compact comparison without a page-wide overflow; identical in practice and exam. */
export default function PbqEvidence({ pbq }: { pbq: Pbq }) {
  const { t } = useLang();
  if (!pbq.evidenceTable) return null;
  const { caption, headers, rows } = pbq.evidenceTable;
  return (
    <div className="min-w-0 space-y-3" id={`pbq_evidence_${pbq.id}`}>
      <div className="max-w-full overflow-x-auto rounded border border-slate-700 focus-visible:outline focus-visible:outline-cyan-400"
        role="region" aria-label={caption} tabIndex={0}>
        <table className="w-full min-w-[640px] text-xs text-slate-300">
          <caption className="p-3 text-left font-semibold text-cyan-300">{caption}</caption>
          <thead><tr>{headers.map(header => <th key={header} scope="col" className="p-3 text-left border-b border-slate-700">{header}</th>)}</tr></thead>
          <tbody>{rows.map(row => <tr key={row[0]}>
            <th scope="row" className="p-3 text-left font-medium border-b border-slate-800">{row[0]}</th>
            {row.slice(1).map((cell, index) => <td key={headers[index + 1]} className="p-3 border-b border-slate-800">{cell}</td>)}
          </tr>)}</tbody>
        </table>
      </div>
      {pbq.sources?.length ? <nav aria-label={t("study.sources")} className="flex flex-wrap gap-x-4 gap-y-2">
        {pbq.sources.map(source => <a key={source} href={SOURCES[source].url} target="_blank" rel="noopener noreferrer"
          className="text-xs text-cyan-300 underline underline-offset-4 break-words">{SOURCES[source].title}</a>)}
      </nav> : null}
    </div>
  );
}
