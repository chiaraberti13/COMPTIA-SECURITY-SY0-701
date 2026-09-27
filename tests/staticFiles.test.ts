import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { request, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { brotliDecompressSync } from "node:zlib";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createDailyBudget } from "../server/aiGuard";
import { acceptsEncoding, createApp } from "../server/app";
import { precompress } from "../scripts/precompress";

/*
 * The production front end is served precompressed: scripts/precompress.ts
 * writes .br and .gz copies at build time, server/app.ts picks the one the
 * browser accepts. Checked here on a small fake build folder.
 */

let dist: string;
let server: Server;
let port: number;
const script = `export const data = ${JSON.stringify("SY0-701 ".repeat(2_000))};\n`;

/** A raw GET, so that paths such as "/../x" reach the server unnormalised. */
function get(rawPath: string, acceptEncoding?: string) {
  return new Promise<{ status: number; headers: Record<string, string | string[] | undefined>; body: Buffer }>((resolve, reject) => {
    const req = request({ host: "127.0.0.1", port, path: rawPath, headers: acceptEncoding ? { "accept-encoding": acceptEncoding } : {} }, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks) }));
    });
    req.on("error", reject);
    req.end();
  });
}

beforeAll(async () => {
  dist = mkdtempSync(path.join(tmpdir(), "sy0701-dist-"));
  mkdirSync(path.join(dist, "assets"));
  writeFileSync(path.join(dist, "index.html"), '<!doctype html><div id="root"></div>');
  writeFileSync(path.join(dist, "assets", "app-1234abcd.js"), script);
  writeFileSync(path.join(dist, "assets", "tiny-1234abcd.js"), "export {};\n");
  writeFileSync(path.join(dist, "server.cjs"), "x".repeat(4_000));
  precompress(dist);

  const app = createApp({
    isProduction: true,
    distPath: dist,
    model: "test-model",
    timeoutMs: 5_000,
    budget: createDailyBudget(1),
    getApiKey: () => undefined,
    logger: { log: () => {} },
    createClient: () => ({ models: { generateContent: async () => ({ text: "" }) } }),
  });
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  port = (server.address() as AddressInfo).port;
});

afterAll(() => {
  server?.close();
  rmSync(dist, { recursive: true, force: true });
});

describe("precompress", () => {
  it("writes Brotli and gzip copies of text files large enough to gain, never of the server bundle", () => {
    expect(brotliDecompressSync(readFileSync(path.join(dist, "assets", "app-1234abcd.js.br"))).toString()).toBe(script);
    expect(() => readFileSync(path.join(dist, "assets", "tiny-1234abcd.js.br"))).toThrow();
    expect(() => readFileSync(path.join(dist, "server.cjs.br"))).toThrow();
  });
});

describe("precompressed static files", () => {
  it("sends Brotli when accepted, with the original type and a year of caching", async () => {
    const res = await get("/assets/app-1234abcd.js", "gzip, deflate, br");
    expect(res.status).toBe(200);
    expect(res.headers["content-encoding"]).toBe("br");
    expect(res.headers["content-type"]).toMatch(/javascript/);
    expect(res.headers["cache-control"]).toBe("public, max-age=31536000, immutable");
    expect(res.headers.vary).toMatch(/Accept-Encoding/);
    expect(brotliDecompressSync(res.body).toString()).toBe(script);
    // The security headers still apply.
    expect(res.headers["x-content-type-options"]).toBe("nosniff");
  });

  it("falls back to gzip, then to the plain file, and honours q=0", async () => {
    expect((await get("/assets/app-1234abcd.js", "gzip")).headers["content-encoding"]).toBe("gzip");
    expect((await get("/assets/app-1234abcd.js", "br;q=0, gzip")).headers["content-encoding"]).toBe("gzip");
    const plain = await get("/assets/app-1234abcd.js");
    expect(plain.headers["content-encoding"]).toBeUndefined();
    expect(plain.body.toString()).toBe(script);
  });

  it("cannot be steered outside the build folder", async () => {
    for (const p of ["/assets/../../package.json", "/..%2f..%2fpackage.json", "/assets/%2e%2e/%2e%2e/package.json"]) {
      const res = await get(p, "br, gzip");
      expect(res.headers["content-encoding"], p).toBeUndefined();
      expect(res.body.toString(), p).not.toContain('"name"');
    }
  });

  it("reads Accept-Encoding by token and weight", () => {
    expect(acceptsEncoding("gzip, deflate, br", "br")).toBe(true);
    expect(acceptsEncoding("br;q=0", "br")).toBe(false);
    expect(acceptsEncoding("br;q=0.5", "br")).toBe(true);
    expect(acceptsEncoding("brotli", "br")).toBe(false);
    expect(acceptsEncoding(undefined, "gzip")).toBe(false);
  });
});
