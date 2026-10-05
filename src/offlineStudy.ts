export type OfflinePhase = "preparing" | "ready" | "unavailable" | "disabled";
export interface OfflineState { phase: OfflinePhase; updateAvailable: boolean }
export interface OfflineEnvironment {
  enabled: boolean;
  secure: boolean;
  workers?: ServiceWorkerContainer;
  reload: () => void;
}

/** Registration and updates, without React or changes to saved progress. */
export function startOfflineStudy(notify: (state: OfflineState) => void, environment: OfflineEnvironment) {
  const { workers, enabled, secure, reload } = environment;
  let stopped = false;
  let applying = false;
  let registration: ServiceWorkerRegistration | undefined;
  let state: OfflineState = { phase: "preparing", updateAvailable: false };
  const cleanups: (() => void)[] = [];
  const change = (next: Partial<OfflineState>) => {
    if (stopped) return;
    state = { ...state, ...next };
    notify(state);
  };
  const listen = (target: EventTarget, name: string, listener: EventListener) => {
    target.addEventListener(name, listener);
    cleanups.push(() => target.removeEventListener(name, listener));
  };
  const check = () => {
    if (registration?.waiting) change({ updateAvailable: true });
    registration?.active?.postMessage({ type: "offline-status" });
  };

  if (!enabled || !secure || !workers) {
    queueMicrotask(() => change({ phase: enabled ? "unavailable" : "disabled" }));
  } else {
    listen(workers, "controllerchange", () => {
      if (applying && !stopped) { applying = false; reload(); }
      else check();
    });
    listen(workers, "message", event => {
      const data = (event as MessageEvent).data;
      if (data?.type === "offline-ready" && typeof data.ready === "boolean") {
        change({ phase: data.ready ? "ready" : "unavailable" });
      }
    });
    void workers.register("/sw.js", { scope: "/", updateViaCache: "none" }).then(result => {
      if (stopped) return;
      registration = result;
      const watch = () => {
        const worker = result.installing;
        if (!worker) return;
        listen(worker, "statechange", () => {
          if (worker.state === "installed" || worker.state === "activated") check();
          if (worker.state === "redundant" && !result.active) change({ phase: "unavailable" });
        });
      };
      listen(result, "updatefound", watch);
      watch();
      check();
      void workers.ready.then(() => { if (!stopped) check(); });
    }).catch(() => change({ phase: "unavailable" }));
  }

  return {
    stop() { stopped = true; cleanups.forEach(cleanup => cleanup()); },
    update() {
      if (stopped || !registration?.waiting || applying) return;
      applying = true;
      registration.waiting.postMessage({ type: "activate-update" });
    },
  };
}
