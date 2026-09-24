import { useRef, useState } from "react";
import { Download, HardDrive, Trash2, Upload } from "lucide-react";
import { useLang } from "../i18n";
import { STORAGE_KEYS, readJSON, removeKey, writeJSON } from "../storage";
import { backupFileName, buildBackup, parseBackup, sanitizeProgress, type ProgressData } from "../progressBackup";

type Pending =
  | { kind: "import"; data: ProgressData; exportedAt: string }
  | { kind: "delete" }
  | null;

/**
 * Export, import and deletion of the study progress stored in this browser.
 * Nothing here talks to the server: the file is built and read locally.
 */
export default function DataControls() {
  const { lang, t } = useLang();
  const fileInput = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<Pending>(null);
  const [message, setMessage] = useState<{ text: string; error: boolean } | null>(null);

  const currentProgress = (): ProgressData =>
    sanitizeProgress({
      checklist: readJSON<unknown>(STORAGE_KEYS.checklist, {}),
      bookmarks: readJSON<unknown>(STORAGE_KEYS.bookmarks, []),
      quizHistory: readJSON<unknown>(STORAGE_KEYS.quizHistory, []),
      questionProgress: readJSON<unknown>(STORAGE_KEYS.questionProgress, {}),
    });

  const handleExport = () => {
    const fileName = backupFileName();
    const blob = new Blob([buildBackup(currentProgress())], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    setMessage({ text: t("data.exported", { file: fileName }), error: false });
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    const result = parseBackup(await file.text());
    if (fileInput.current) fileInput.current.value = "";
    if (!result.ok) {
      const key = {
        "too-large": "data.errorTooLarge",
        "invalid-json": "data.errorInvalid",
        "wrong-app": "data.errorWrongApp",
        "unsupported-schema": "data.errorSchema",
      } as const;
      setMessage({ text: t(key[result.error]), error: true });
      return;
    }
    setMessage(null);
    setPending({ kind: "import", data: result.data, exportedAt: result.exportedAt });
  };

  const applyImport = (data: ProgressData) => {
    const saved =
      writeJSON(STORAGE_KEYS.checklist, data.checklist) &&
      writeJSON(STORAGE_KEYS.bookmarks, data.bookmarks) &&
      writeJSON(STORAGE_KEYS.quizHistory, data.quizHistory) &&
      writeJSON(STORAGE_KEYS.questionProgress, data.questionProgress);
    if (!saved) {
      setPending(null);
      setMessage({ text: t("data.errorStorage"), error: true });
      return;
    }
    // Every section reads its state at start-up: a reload is the simplest way
    // to show the imported progress everywhere at once.
    window.location.reload();
  };

  const deleteAll = () => {
    for (const key of Object.values(STORAGE_KEYS)) removeKey(key);
    window.location.reload();
  };

  const summaryDate = (iso: string) => {
    const date = new Date(iso);
    return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(lang === "it" ? "it-IT" : "en-GB");
  };

  const buttonClass =
    "inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500";

  return (
    <section className="bg-slate-950 p-4 rounded border border-slate-800 max-w-md mx-auto text-left space-y-3" id="data_controls" aria-labelledby="data_controls_title">
      <h3 id="data_controls_title" className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase tracking-wider">
        <HardDrive className="w-4 h-4" aria-hidden="true" />
        {t("data.title")}
      </h3>
      <p className="text-[11px] text-slate-400 leading-relaxed">{t("data.intro")}</p>

      <div className="flex flex-wrap gap-2">
        <button type="button" id="data_export_btn" onClick={handleExport} className={`${buttonClass} border-slate-700 text-slate-200 hover:border-cyan-600 hover:text-cyan-300`}>
          <Download className="w-3.5 h-3.5" aria-hidden="true" />
          {t("data.export")}
        </button>
        <button type="button" id="data_import_btn" onClick={() => fileInput.current?.click()} className={`${buttonClass} border-slate-700 text-slate-200 hover:border-cyan-600 hover:text-cyan-300`}>
          <Upload className="w-3.5 h-3.5" aria-hidden="true" />
          {t("data.import")}
        </button>
        <input
          ref={fileInput}
          id="data_import_input"
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <button type="button" id="data_delete_btn" onClick={() => { setMessage(null); setPending({ kind: "delete" }); }} className={`${buttonClass} border-slate-700 text-slate-300 hover:border-rose-500 hover:text-rose-300`}>
          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
          {t("data.deleteAll")}
        </button>
      </div>

      {pending && (
        <div className="border border-slate-700 rounded p-3 space-y-2 bg-slate-900/60" id="data_confirm_box">
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {pending.kind === "import"
              ? t("data.importSummary", {
                  date: summaryDate(pending.exportedAt),
                  topics: Object.keys(pending.data.checklist).length,
                  bookmarks: pending.data.bookmarks.length,
                  runs: pending.data.quizHistory.length,
                })
              : t("data.confirmDelete")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              id="data_confirm_btn"
              onClick={() => (pending.kind === "import" ? applyImport(pending.data) : deleteAll())}
              className={`${buttonClass} ${pending.kind === "delete" ? "border-rose-500/60 text-rose-200 bg-rose-500/10" : "border-cyan-600 text-white bg-cyan-700"}`}
            >
              {pending.kind === "import" ? t("data.confirmImport") : t("data.confirmDeleteBtn")}
            </button>
            <button type="button" id="data_cancel_btn" onClick={() => setPending(null)} className={`${buttonClass} border-slate-700 text-slate-300`}>
              {t("data.cancel")}
            </button>
          </div>
        </div>
      )}

      <p role="status" aria-live="polite" id="data_status" className={`text-[11px] ${message?.error ? "text-rose-300" : "text-slate-400"}`}>
        {message?.text ?? ""}
      </p>
    </section>
  );
}
