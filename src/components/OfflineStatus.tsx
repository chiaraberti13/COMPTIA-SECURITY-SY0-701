import { CloudCheck, CloudOff, Download } from "lucide-react";
import { useLang } from "../i18n";
import { useOnline } from "../network";
import type { OfflineStudy } from "../hooks/useOfflineStudy";

/**
 * The offline-study indicator (the "ready to study offline" flag). Presentational:
 * the service worker lifecycle is owned by `useOfflineStudy`, mounted once at the
 * app root, so this can be rendered inside the collapsible AI Trainer panel
 * without stopping offline preparation when the panel is closed.
 */
export default function OfflineStatus({ offline }: { offline: OfflineStudy }) {
  const { t } = useLang();
  const online = useOnline();
  const { state, update } = offline;

  if (state.phase === "disabled") return null;
  const message = !online ? state.phase === "ready" ? "offline.active" : "offline.notReady"
    : state.phase === "ready" ? "offline.ready" : state.phase === "unavailable" ? "offline.unavailable" : "offline.preparing";
  const Icon = online ? state.phase === "ready" ? CloudCheck : Download : CloudOff;
  return (
    <div id="offline_status" role="status" aria-live="polite" aria-atomic="true" className="shrink-0 border-b border-slate-800 bg-slate-950/60 px-4 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] leading-snug text-slate-300">
      <Icon className="w-4 h-4 shrink-0 text-cyan-400" aria-hidden="true" />
      <span>{t(message)}</span>
      {state.updateAvailable && (
        <span className="flex flex-wrap items-center gap-2">
          <span>{t("offline.updateReady")}</span>
          <button type="button" id="offline_update_btn" disabled={!online} onClick={() => update()} onKeyDown={event => event.stopPropagation()} className="px-2 py-1 min-h-6 rounded bg-cyan-700 text-white disabled:opacity-60">
            {t("offline.update")}
          </button>
        </span>
      )}
    </div>
  );
}
