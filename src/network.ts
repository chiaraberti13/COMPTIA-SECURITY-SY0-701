import { useSyncExternalStore } from "react";

/** Browser connection hint; API failures are still handled independently. */
export const isOnline = () => typeof navigator === "undefined" || navigator.onLine !== false;
const subscribe = (notify: () => void) => {
  window.addEventListener("online", notify);
  window.addEventListener("offline", notify);
  return () => {
    window.removeEventListener("online", notify);
    window.removeEventListener("offline", notify);
  };
};
export const useOnline = () => useSyncExternalStore(subscribe, isOnline, () => true);
