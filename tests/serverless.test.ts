import type { AddressInfo } from "node:net";
import type { Server } from "node:http";
import { afterEach, describe, expect, it } from "vitest";
import { createServerlessApp } from "../server/serverless";

const servers: Server[] = [];
afterEach(() => { for (const server of servers.splice(0)) server.close(); });
const token = "test-only-access-code-123456";
const key = "fake-serverless-key";
async function start(env: NodeJS.ProcessEnv) {
  let calls = 0;
  const app = createServerlessApp(env, () => ({ models: { generateContent: async () => {
    calls++;
    return { text: "test response" };
  } } }));
  const server = app.listen(0);
  servers.push(server);
  await new Promise(resolve => server.once("listening", resolve));
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  const chat = (access = token) => fetch(`${base}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json", "X-Access-Token": access },
    body: JSON.stringify({ message: "Explain Zero Trust", history: [] }),
  });
  return { base, chat, calls: () => calls };
}

describe("serverless deployment boundaries", () => {
  it.each(["preview", "development", undefined])("never calls the AI in %s, even with copied production secrets", async VERCEL_ENV => {
    const { chat, calls } = await start({ VERCEL_ENV, GEMINI_API_KEY: key, AI_ACCESS_TOKEN: token, AI_DAILY_LIMIT: "50" });
    expect((await chat()).status).toBe(503);
    expect(calls()).toBe(0);
  });
  it.each([undefined, "", "short"])("keeps production AI off without a strong access code (%s)", async AI_ACCESS_TOKEN => {
    const { chat, calls } = await start({ VERCEL_ENV: "production", GEMINI_API_KEY: key, AI_ACCESS_TOKEN, AI_DAILY_LIMIT: "50" });
    const response = await chat(AI_ACCESS_TOKEN);
    expect([401, 503]).toContain(response.status);
    expect(calls()).toBe(0);
  });
  it("requires explicit production quota, validates access and enforces the warm-instance cap", async () => {
    const { chat, calls } = await start({ VERCEL_ENV: "production", GEMINI_API_KEY: key, AI_ACCESS_TOKEN: token, AI_DAILY_LIMIT: "1" });
    expect((await chat("wrong-access-code")).status).toBe(401);
    expect((await chat()).status).toBe(200);
    expect((await chat()).status).toBe(503);
    expect(calls()).toBe(1);
  });
  it("defaults production AI off even with a key and access code", async () => {
    const { chat, calls } = await start({ VERCEL_ENV: "production", GEMINI_API_KEY: key, AI_ACCESS_TOKEN: token });
    expect((await chat()).status).toBe(503);
    expect(calls()).toBe(0);
  });
  it("serves secure uncached health and never serves the frontend from the function", async () => {
    const { base } = await start({});
    const health = await fetch(`${base}/healthz`);
    expect(health.status).toBe(200);
    expect(health.headers.get("cache-control")).toBe("no-store");
    expect(health.headers.get("content-security-policy")).toContain("default-src 'self'");
    for (const path of ["/", "/assets/example.js", "/api/unknown"]) {
      const response = await fetch(`${base}${path}`);
      expect(response.status).toBe(404);
      expect(await response.text()).not.toContain('id="root"');
    }
  });
});
