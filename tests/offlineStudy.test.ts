import { describe, expect, it, vi } from "vitest";
import { startOfflineStudy, type OfflineState } from "../src/offlineStudy";

function environment() {
  const active = { postMessage: vi.fn() };
  const waiting = { postMessage: vi.fn() };
  const registration = Object.assign(new EventTarget(), { active, waiting: null as typeof waiting | null, installing: null });
  const workers = Object.assign(new EventTarget(), { register: vi.fn(async () => registration), ready: Promise.resolve(registration) });
  const changes: OfflineState[] = [];
  const reload = vi.fn();
  const control = startOfflineStudy(state => changes.push(state), { enabled: true, secure: true, workers: workers as unknown as ServiceWorkerContainer, reload });
  return { active, waiting, registration, workers, changes, reload, control };
}
const tick = async () => { await Promise.resolve(); await Promise.resolve(); };

describe("offline registration", () => {
  it("checks readiness, listens for cache confirmation and does not reload the first install", async () => {
    const e = environment();
    await tick();
    expect(e.workers.register).toHaveBeenCalledWith("/sw.js", { scope: "/", updateViaCache: "none" });
    expect(e.active.postMessage).toHaveBeenCalledWith({ type: "offline-status" });
    expect(e.changes).toEqual([]);
    e.workers.dispatchEvent(new MessageEvent("message", { data: { type: "offline-ready", ready: true } }));
    expect(e.changes.at(-1)?.phase).toBe("ready");
    e.workers.dispatchEvent(new Event("controllerchange"));
    expect(e.reload).not.toHaveBeenCalled();
    e.control.stop();
  });
  it("offers a waiting update, activates only on request and reloads once", async () => {
    const e = environment();
    e.registration.waiting = e.waiting;
    await tick();
    expect(e.changes.at(-1)?.updateAvailable).toBe(true);
    expect(e.waiting.postMessage).not.toHaveBeenCalled();
    e.control.update();
    e.control.update();
    expect(e.waiting.postMessage).toHaveBeenCalledOnce();
    expect(e.waiting.postMessage).toHaveBeenCalledWith({ type: "activate-update" });
    e.workers.dispatchEvent(new Event("controllerchange"));
    e.workers.dispatchEvent(new Event("controllerchange"));
    expect(e.reload).toHaveBeenCalledOnce();
    e.control.stop();
  });
  it("records unavailability honestly and cleans up listeners after unmount", async () => {
    const e = environment();
    await tick();
    e.workers.dispatchEvent(new MessageEvent("message", { data: { type: "offline-ready", ready: false } }));
    expect(e.changes.at(-1)?.phase).toBe("unavailable");
    e.control.stop();
    const count = e.changes.length;
    e.workers.dispatchEvent(new MessageEvent("message", { data: { type: "offline-ready", ready: true } }));
    expect(e.changes).toHaveLength(count);
  });
  it("keeps development, unsupported and insecure browsers usable", async () => {
    for (const [enabled, secure, phase] of [[false, true, "disabled"], [true, false, "unavailable"], [true, true, "unavailable"]] as const) {
      const notify = vi.fn();
      const control = startOfflineStudy(notify, { enabled, secure, reload: vi.fn() });
      await tick();
      expect(notify).toHaveBeenCalledWith({ phase, updateAvailable: false });
      control.update();
      control.stop();
    }
  });
  it("handles registration failures without an uncaught rejection", async () => {
    const workers = Object.assign(new EventTarget(), { register: vi.fn(async () => { throw new Error("Denied"); }) });
    const notify = vi.fn();
    const control = startOfflineStudy(notify, { enabled: true, secure: true, workers: workers as unknown as ServiceWorkerContainer, reload: vi.fn() });
    await tick();
    expect(notify).toHaveBeenCalledWith({ phase: "unavailable", updateAvailable: false });
    control.stop();
  });
});
