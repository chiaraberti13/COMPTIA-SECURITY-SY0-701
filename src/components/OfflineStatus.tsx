import { useEffect, useRef, useState } from "react";
import { CloudCheck, CloudOff, Download } from "lucide-react";
import { useLang } from "../i18n";
import { useOnline } from "../network";
import { startOfflineStudy, type OfflineState } from "../offlineStudy";

export default function OfflineStatus() {
  const { t } = useLang();
  const online = useOnline();
  const [state, setState] = useState<OfflineState>({ phase: "preparing", updateAvailable: false });
  const update = useRef<() => void>(() => {});
  useEffect(() => {
    const support = startOfflineStudy(setState, {
      enabled: import.meta.env.PROD,
      secure: window.isSecureContext,
      workers: navigator.serviceWorker,
      reload: () => window.location.reload(),
    });
    update.current = support.update;
    return support.stop;
  }, []);

  if (state.phase === "disabled") return null;
  const message = !online ? state.phase === "ready" ? "offline.active" : "offline.notReady"
    : state.phase === "ready" ? "offline.ready" : state.phase === "unavailable" ? "offline.unavailable" : "offline.preparing";
  const Icon = online ? state.phase === "ready" ? CloudCheck : Download : CloudOff;
  return (
    <div id="offline_status" role="status" aria-live="polite" aria-atomic="true" className="shrink-0 border-t border-slate-800 bg-slate-900 px-3 py-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>{t(message)}</span>
      {state.updateAvailable && (
        <span className="flex flex-wrap items-center gap-2">
          <span>{t("offline.updateReady")}</span>
          <button type="button" id="offline_update_btn" disabled={!online} onClick={() => update.current()} className="px-2 py-1 min-h-6 rounded bg-cyan-700 text-white disabled:opacity-60">
            {t("offline.update")}
          </button>
        </span>
      )}
    </div>
  );
}
