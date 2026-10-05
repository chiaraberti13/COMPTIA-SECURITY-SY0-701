// The build replaces these two tokens with a content revision and all public
// app files, including both language datasets and lazy-loaded PBQ chunks.
const PREFIX = "comptia-sy0701-offline-v1-";
const CACHE = PREFIX + __OFFLINE_REVISION__;
const FILES = __OFFLINE_FILES__;

async function prepareCache() {
  const cache = await caches.open(CACHE);
  await cache.addAll(FILES.map(file => new Request(new URL(file, self.location.origin), { cache: "reload" })));
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    try {
      await prepareCache();
    } catch (error) {
      // A quota error or missing resource must not leave a "ready" partial
      // version, or damage the previously installed, working copy.
      await caches.delete(CACHE);
      throw error;
    }
    // No automatic skipWaiting: an update must not interrupt an exam run.
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    // Keep the previous generation for lazy chunks requested by an older tab.
    // At most two app caches; unrelated caches and learner progress are untouched.
    const previous = (await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE);
    await Promise.all(previous.slice(0, -1).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("message", event => {
  // Activation is a lifecycle request, not work that must finish before this
  // message event can settle (the standard skipWaiting message pattern).
  if (event.data?.type === "activate-update") void self.skipWaiting();
  if (event.data?.type === "offline-status") event.waitUntil((async () => {
    let ready = false;
    try {
      const cache = await caches.open(CACHE);
      const complete = (await Promise.all(FILES.map(file => cache.match(file)))).every(Boolean);
      // Browsers can evict CacheStorage independently of the registration.
      // Repair an incomplete copy when network is available; never claim ready
      // just because an old worker remains registered.
      if (!complete) await prepareCache();
      ready = true;
    } catch { /* A denied cache or failed download keeps online study usable. */ }
    event.source?.postMessage({ type: "offline-ready", ready });
  })());
});

async function cachedFile(request) {
  const current = await caches.open(CACHE);
  const hit = await current.match(request);
  if (hit) return hit;
  // A newly activated worker can still serve a retained old hashed chunk.
  if (new URL(request.url).pathname.startsWith("/assets/")) {
    const keys = (await caches.keys()).filter(key => key.startsWith(PREFIX) && key !== CACHE);
    for (const key of keys) {
      const response = await (await caches.open(key)).match(request);
      if (response) return response;
    }
  }
  return fetch(request);
}

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch { return; }
  if (request.method !== "GET" || url.origin !== self.location.origin || /^\/(?:api|healthz)(?:\/|$)/.test(pathname)) return;
  if (request.mode === "navigate") {
    // The shell and hashed resources stay in the same build generation.
    // An online update installs separately and is offered by the UI.
    event.respondWith(caches.open(CACHE).then(async cache => (await cache.match("/index.html")) ?? fetch(request)));
  } else if (FILES.includes(url.pathname) || url.pathname.startsWith("/assets/")) {
    // No runtime writes: unknown URLs, API replies and user text never enter
    // CacheStorage. A missing asset stays an error, never the HTML shell.
    event.respondWith(cachedFile(request));
  }
});
