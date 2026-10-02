/** Exercise the compiled deployment artifact without credentials or paid calls. */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import type { AddressInfo } from "node:net";
import type express from "express";

const root = resolve(".vercel/output");
const staticRoot = join(root, "static");
const routes = JSON.parse(readFileSync(join(root, "config.json"), "utf8")).routes;
const files = (dir: string): string[] => readdirSync(dir, { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? files(join(dir, entry.name)) : [join(dir, entry.name)],
);
assert(readFileSync(join(staticRoot, "index.html"), "utf8").includes('id="root"'));
for (const file of files(staticRoot)) {
  assert(!/\.(?:cjs|map|ts)$/.test(file), `private build file in CDN: ${file}`);
  assert(!/\/(?:server|\.env)/.test(file), `server file in CDN: ${file}`);
  // CI builds with a synthetic key; production keys must never enter static output.
  if (process.env.GEMINI_API_KEY && /\.(?:js|html|json)$/.test(file)) {
    assert(!readFileSync(file, "utf8").includes(process.env.GEMINI_API_KEY), `key leaked in ${file}`);
  }
}
const api = routes.find((r: { dest?: string }) => r.dest === "/api");
assert(api, "no backend route");
for (const path of ["/api", "/api/chat", "/api/quiz/remediation", "/api/missing", "/healthz"]) {
  assert(new RegExp(`^${api.src}$`).test(path), `backend path missed: ${path}`);
}
for (const path of ["/", "/studio/domain/3", "/healthz-spoof", "/api-spoof"]) {
  assert(!new RegExp(`^${api.src}$`).test(path), `backend path too broad: ${path}`);
}
assert(routes.indexOf(api) < routes.findIndex((r: { handle?: string }) => r.handle === "filesystem"));
assert(routes.findIndex((r: { status?: number }) => r.status === 404) < routes.findIndex((r: { dest?: string }) => r.dest === "/index.html"));
const functionConfig = JSON.parse(readFileSync(join(root, "functions/api.func/.vc-config.json"), "utf8"));
assert.equal(functionConfig.runtime, "nodejs24.x");
assert(!functionConfig.environment, "secrets must come from managed runtime variables");
process.env.VERCEL_ENV = "preview";
process.env.GEMINI_API_KEY = "fake-deployment-smoke-key";
process.env.AI_DAILY_LIMIT = "100";
process.env.AI_ACCESS_TOKEN = "fake-deployment-access-code";
const require = createRequire(import.meta.url);
const app: express.Express = require(join(root, "functions/api.func/index.cjs")).default;
const server = app.listen(0, "127.0.0.1");
try {
  await new Promise(resolve => server.once("listening", resolve));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const health = await fetch(`${base}/healthz`);
  assert.equal(health.status, 200);
  assert.equal(health.headers.get("cache-control"), "no-store");
  assert.equal(health.headers.get("x-content-type-options"), "nosniff");
  for (const path of ["/", "/api/unknown", "/assets/private.js"]) {
    assert.equal((await fetch(`${base}${path}`, { headers: { "X-Access-Token": process.env.AI_ACCESS_TOKEN } })).status, 404);
  }
  const chat = await fetch(`${base}/api/chat`, {
    method: "POST", headers: { "content-type": "application/json", "X-Access-Token": process.env.AI_ACCESS_TOKEN },
    body: JSON.stringify({ message: "Explain Zero Trust", history: [] }),
  });
  assert.equal(chat.status, 503, "preview spent the AI quota");
  const invalid = await fetch(`${base}/api/quiz/remediation`, {
    method: "POST", headers: { "content-type": "application/json", "X-Access-Token": process.env.AI_ACCESS_TOKEN }, body: "{}",
  });
  assert.equal(invalid.status, 400);
  console.log("Vercel smoke passed: static isolation, secret isolation, routes, compiled API, preview AI off.");
} finally {
  server.close();
}
