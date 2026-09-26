import { useState } from "react";
import { KeyRound } from "lucide-react";
import { useLang } from "../i18n";
import { setAiAccessCode } from "../aiAccess";

/**
 * Shown in the AI Trainer when the server answered that an access code is
 * required. The code is kept for this tab only (see aiAccess.ts).
 */
export default function AiAccessForm({ onSaved }: { onSaved: () => void }) {
  const { t } = useLang();
  const [code, setCode] = useState("");
  return (
    <form
      id="ai_access_form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return;
        setAiAccessCode(code.trim());
        setCode("");
        onSaved();
      }}
      className="p-3 border-t border-amber-900/50 bg-amber-950/20 space-y-2"
    >
      <label htmlFor="ai_access_input" className="flex items-center gap-1.5 text-[11px] font-bold text-amber-200">
        <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
        {t("chat.accessLabel")}
      </label>
      <p id="ai_access_hint" className="text-[10px] text-slate-400 leading-relaxed">{t("chat.accessHint")}</p>
      <div className="flex gap-2">
        <input
          id="ai_access_input"
          type="password"
          autoComplete="off"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          aria-describedby="ai_access_hint"
          className="flex-1 min-w-0 bg-slate-900 border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs outline-none text-slate-100"
        />
        <button
          type="submit"
          id="ai_access_submit"
          disabled={!code.trim()}
          className="shrink-0 bg-amber-700 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-400 text-white font-bold px-3 py-2 rounded text-[11px] transition-colors"
        >
          {t("chat.accessSave")}
        </button>
      </div>
    </form>
  );
}
