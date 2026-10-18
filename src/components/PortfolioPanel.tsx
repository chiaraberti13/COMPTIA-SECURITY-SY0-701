import { useState } from "react";
import { ChevronRight, FileText, Copy, Download, Check } from "lucide-react";
import { useLang, type UIKey } from "../i18n";
import { PORTFOLIO_ARTIFACTS, renderPortfolioMarkdown } from "../portfolio";
import type { StudyAction } from "../studyPaths";

/**
 * Portfolio mode: sanitized, professionally reusable write-ups built from the
 * labs. The learner picks a report, runbook or write-up, reads it, and exports
 * it as Markdown (copy or download) to adapt for a real portfolio. Objective
 * chips jump to the matching objective in the domain guide through `onAction`.
 */
export default function PortfolioPanel({ onAction }: { onAction: (action: StudyAction) => void }) {
  const { t, lang } = useLang();
  const artifacts = PORTFOLIO_ARTIFACTS[lang];
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(artifacts[0].id);
  const [copied, setCopied] = useState(false);
  const artifact = artifacts.find((a) => a.id === selectedId) ?? artifacts[0];

  const fileName = `${artifact.id}.md`;

  const copyMarkdown = async () => {
    const markdown = renderPortfolioMarkdown(artifact, lang);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context): download stays available.
    }
  };

  const downloadMarkdown = () => {
    const markdown = renderPortfolioMarkdown(artifact, lang);
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const openObjective = (code: string) => {
    const domain = Number(code.split(".")[0]) as 1 | 2 | 3 | 4 | 5;
    onAction({ kind: "guide", domain, objective: code });
  };

  return (
    <details
      id="portfolio_mode"
      open={open}
      onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
      className="group bg-slate-900 border border-slate-800 rounded-lg shadow-md overflow-hidden"
    >
      <summary className="cursor-pointer list-none p-5 flex items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <FileText className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-100">{t("portfolio.title")}</h2>
            <p className="text-xs text-slate-400">{t("portfolio.subtitle")}</p>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-90" aria-hidden="true" />
      </summary>

      <div className="border-t border-slate-800 p-5 sm:p-6 space-y-5">
        <div role="group" aria-label={t("portfolio.choose")} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {artifacts.map((a) => (
            <button
              key={a.id}
              type="button"
              id={`portfolio_artifact_${a.id}`}
              aria-pressed={a.id === selectedId}
              onClick={() => {
                setSelectedId(a.id);
                setCopied(false);
              }}
              className={`min-h-[44px] px-3 py-2 rounded border text-xs font-semibold text-left transition-colors ${
                a.id === selectedId
                  ? "border-cyan-500 bg-cyan-500/10 text-cyan-300"
                  : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <span className="block uppercase tracking-wide text-[10px] text-cyan-400/80">
                {t(`portfolio.kind.${a.kind}` as UIKey)}
              </span>
              {a.title}
            </button>
          ))}
        </div>

        <article className="space-y-4" aria-label={t("portfolio.preview")}>
          <header className="space-y-2">
            <p className="text-sm text-slate-300">{artifact.summary}</p>
            <PortfolioMeta label={t("portfolio.objectives")}>
              {artifact.objectives.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => openObjective(code)}
                  aria-label={t("portfolio.openGuide", { code })}
                  className="min-h-[32px] px-2 py-1 rounded border border-slate-700 bg-slate-950/40 text-xs font-mono text-cyan-300 hover:border-cyan-500 hover:text-cyan-200 transition-colors"
                >
                  {code}
                </button>
              ))}
            </PortfolioMeta>
            <PortfolioMeta label={t("portfolio.skills")}>
              {artifact.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 rounded border border-slate-800 bg-slate-950/40 text-xs text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </PortfolioMeta>
          </header>

          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 sm:p-5 space-y-4">
            {artifact.sections.map((section) => (
              <section key={section.heading}>
                <h3 className="text-sm font-bold text-slate-100 mb-1">{section.heading}</h3>
                {section.body.map((block, i) =>
                  block.type === "p" ? (
                    <p key={i} className="text-sm text-slate-300 leading-relaxed">
                      {block.text}
                    </p>
                  ) : (
                    <ul key={i} className="list-disc pl-5 space-y-1 text-sm text-slate-300">
                      {block.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </section>
            ))}
          </div>

          <p className="text-xs text-slate-400 border-l-2 border-amber-500/60 pl-3">{t("portfolio.note")}</p>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              id="portfolio_copy"
              onClick={copyMarkdown}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded border border-cyan-500/40 bg-cyan-500/10 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              {copied ? t("portfolio.copied") : t("portfolio.copy")}
            </button>
            <button
              type="button"
              id="portfolio_download"
              onClick={downloadMarkdown}
              className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded border border-slate-700 bg-slate-950/40 text-sm font-semibold text-slate-200 hover:border-slate-600 transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              {t("portfolio.download")}
            </button>
          </div>
        </article>
      </div>
    </details>
  );
}

function PortfolioMeta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-slate-400">{label}:</span>
      {children}
    </div>
  );
}
