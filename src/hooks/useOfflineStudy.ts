import { useEffect, useRef, useState } from "react";
import { startOfflineStudy, type OfflineState } from "../offlineStudy";

export interface OfflineStudy {
  state: OfflineState;
  update: () => void;
}

/**
 * Drives the offline-study service worker and tracks its phase, independent of
 * where the indicator is shown. Kept as a hook mounted once at the app root so
 * that registration and update detection keep running even when the visible
 * indicator lives inside a collapsible panel (the AI Trainer) that can be
 * closed — notably on phones, where that panel starts closed.
 */
export function useOfflineStudy(): OfflineStudy {
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
  return { state, update: () => update.current() };
}
