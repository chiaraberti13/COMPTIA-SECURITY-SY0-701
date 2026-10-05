import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";
import { renderOfflineWorker } from "../scripts/offline-build";

const ORIGIN = "https://study.example";
const PREFIX = "comptia-sy0701-offline-v1-";
const FILES = ["/index.html", "/assets/dataset-it-abcd.js", "/assets/dataset-en-efgh.js"];

function worker(revision = "current") {
  const stores = new Map<string, Map<string, Response>>();
  const listeners: Record<string, (event: any) => void> = {};
  const key = (request: string | Request) => new URL(typeof request === "string" ? request : request.url, ORIGIN).href;
  const fetchMock = vi.fn(async (request: Request) => new Response(request.url.endsWith("index.html") ? "APP SHELL" : "ASSET", { headers: { "content-security-policy": "default-src 'self'" } }));
  const caches = {
    async open(name: string) {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name)!;
      return {
        async match(request: string | Request) { return entries.get(key(request))?.clone(); },
        async addAll(requests: Request[]) {
          const responses = await Promise.all(requests.map(request => fetchMock(request)));
          if (responses.some(response => !response.ok)) throw new Error("Missing precache resource");
          requests.forEach((request, index) => entries.set(key(request), responses[index].clone()));
        },
      };
    },
    async keys() { return [...stores.keys()]; },
    async delete(name: string) { return stores.delete(name); },
  };
  const claim = vi.fn(async () => {});
  const skipWaiting = vi.fn(async () => {});
  runInNewContext(renderOfflineWorker(FILES, revision), {
    self: { location: { origin: ORIGIN }, clients: { claim }, skipWaiting, addEventListener: (name: string, handler: any) => { listeners[name] = handler; } },
    caches, fetch: fetchMock, URL, Request, Response,
  });
  const dispatch = async (name: string, data: Record<string, unknown> = {}) => {
    let response: Promise<Response> | undefined;
    const tasks: Promise<unknown>[] = [];
    listeners[name]({ ...data, waitUntil: (task: Promise<unknown>) => tasks.push(task), respondWith: (task: Promise<Response>) => { response = task; } });
    await Promise.all(tasks);
    return response ? await response : undefined;
  };
  const request = (path: string, overrides = {}) => ({ url: new URL(path, ORIGIN).href, method: "GET", mode: "cors", ...overrides });
  return { stores, fetchMock, caches, claim, skipWaiting, dispatch, request };
}

describe("offline service worker", () => {
  it("prepares both languages atomically and waits before replacing an active worker", async () => {
    const w = worker();
    await w.dispatch("install");
    expect(w.stores.get(PREFIX + "current")?.size).toBe(FILES.length);
    expect(w.fetchMock.mock.calls.every(([request]) => request.cache === "reload")).toBe(true);
    expect(w.skipWaiting).not.toHaveBeenCalled();
    await w.dispatch("activate");
    expect(w.claim).toHaveBeenCalledOnce();
  });

  it("removes a failed install while preserving the previously working copy", async () => {
    const w = worker();
    await w.caches.open(PREFIX + "previous");
    w.fetchMock.mockImplementation(async request => new Response("missing", { status: request.url.includes("dataset-en") ? 404 : 200 }));
    await expect(w.dispatch("install")).rejects.toThrow("Missing precache resource");
    expect([...w.stores.keys()]).toEqual([PREFIX + "previous"]);
    expect(w.claim).not.toHaveBeenCalled();
  });

  it("serves offline navigation and cached resources, retaining their security headers", async () => {
    const w = worker();
    await w.dispatch("install");
    w.fetchMock.mockRejectedValue(new Error("Offline"));
    const before = w.fetchMock.mock.calls.length;
    const shell = await w.dispatch("fetch", { request: w.request("/studio/deep-link?review=1", { mode: "navigate" }) });
    expect(await shell?.text()).toBe("APP SHELL");
    expect(shell?.headers.get("content-security-policy")).toBe("default-src 'self'");
    expect(await (await w.dispatch("fetch", { request: w.request(FILES[2]) }))?.text()).toBe("ASSET");
    expect(w.fetchMock.mock.calls.length).toBe(before);
  });

  it("never intercepts API, health, POST or cross-origin requests", async () => {
    const w = worker();
    for (const request of [w.request("/api"), w.request("/api/chat"), w.request("/api/quiz/remediation", { method: "POST" }),
      w.request("/healthz", { mode: "navigate" }), w.request("/healthz/", { mode: "navigate" }), w.request("/%61pi/chat", { mode: "navigate" }),
      w.request("/api%2fchat", { mode: "navigate" }), w.request("/he%61lthz", { mode: "navigate" }),
      w.request("/bad%path", { mode: "navigate" }), w.request("/index.html", { method: "POST" }), w.request("https://other.example/asset.js")]) {
      expect(await w.dispatch("fetch", { request })).toBeUndefined();
    }
    expect(w.fetchMock).not.toHaveBeenCalled();
    expect(w.stores.size).toBe(0);
  });

  it("does not return HTML or add runtime responses for missing/queried assets", async () => {
    const w = worker();
    await w.dispatch("install");
    w.fetchMock.mockResolvedValue(new Response("missing", { status: 404 }));
    const response = await w.dispatch("fetch", { request: w.request("/assets/unknown.js") });
    expect(response?.status).toBe(404);
    expect(await response?.text()).toBe("missing");
    expect(w.stores.get(PREFIX + "current")?.size).toBe(FILES.length);
    await w.dispatch("fetch", { request: w.request(`${FILES[1]}?private=text`) });
    expect(w.stores.get(PREFIX + "current")?.size).toBe(FILES.length);
  });

  it("bounds app caches, leaves unrelated caches alone and serves the previous lazy chunk", async () => {
    const w = worker();
    await w.caches.open("another-app");
    await w.caches.open(PREFIX + "oldest");
    await w.caches.open(PREFIX + "previous");
    w.stores.get(PREFIX + "previous")!.set(ORIGIN + "/assets/old-en.js", new Response("OLD EN"));
    await w.dispatch("install");
    await w.dispatch("activate");
    expect([...w.stores.keys()]).toEqual(["another-app", PREFIX + "previous", PREFIX + "current"]);
    expect(await (await w.dispatch("fetch", { request: w.request("/assets/old-en.js") }))?.text()).toBe("OLD EN");
  });

  it("reports readiness from actual cache contents and repairs an evicted copy", async () => {
    const w = worker();
    const postMessage = vi.fn();
    await w.dispatch("install");
    await w.dispatch("message", { data: { type: "offline-status" }, source: { postMessage } });
    expect(postMessage).toHaveBeenLastCalledWith({ type: "offline-ready", ready: true });
    await w.caches.delete(PREFIX + "current");
    w.fetchMock.mockRejectedValueOnce(new Error("Offline"));
    await w.dispatch("message", { data: { type: "offline-status" }, source: { postMessage } });
    expect(postMessage).toHaveBeenLastCalledWith({ type: "offline-ready", ready: false });
    await w.dispatch("message", { data: { type: "offline-status" }, source: { postMessage } });
    expect(postMessage).toHaveBeenLastCalledWith({ type: "offline-ready", ready: true });
    await w.dispatch("message", { data: { type: "unknown" } });
    expect(w.skipWaiting).not.toHaveBeenCalled();
    await w.dispatch("message", { data: { type: "activate-update" } });
    expect(w.skipWaiting).toHaveBeenCalledOnce();
  });
});
