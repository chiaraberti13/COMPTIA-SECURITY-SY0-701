/** Check the deployed router as well as Express; never make a paid AI call. */
import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

export async function smokeLive(
  input: string,
  fetcher: typeof fetch = fetch,
  headers: Record<string, string> = {},
): Promise<string[]> {
  const base = new URL(input);
  assert(base.protocol === "https:" && !base.username && !base.password
    && !base.search && !base.hash && base.pathname === "/",
  "Use an HTTPS origin without credentials, path, query or fragment.");
  const checks: string[] = [];
  const request = (path: string, init: RequestInit = {}) => fetcher(new URL(path, base), {
    ...init,
    headers: { ...headers, ...init.headers },
    // Do not send an automation bypass code to a redirected origin.
    redirect: "manual",
    signal: AbortSignal.timeout(30_000),
  });
  const status = (response: Response, expected: number, path: string) => {
    assert.equal(response.status, expected, `${path}: expected HTTP ${expected}, received ${response.status}`);
  };
  const uncached = (response: Response, path: string) => {
    assert(response.headers.get("cache-control")?.includes("no-store"), `${path}: missing no-store`);
  };

  const home = await request("/");
  status(home, 200, "/");
  const html = await home.text();
  assert(html.includes('id="root"'), "/: missing app shell");
  const csp = home.headers.get("content-security-policy") ?? "";
  for (const directive of ["default-src 'self'", "script-src 'self'", "object-src 'none'", "frame-ancestors 'self'"]) {
    assert(csp.includes(directive), `/: missing CSP directive ${directive}`);
  }
  assert(!csp.includes("'unsafe-inline'"), "/: inline scripts or styles allowed");
  assert.equal(home.headers.get("x-content-type-options"), "nosniff", "/: missing nosniff");
  checks.push("public app shell and security headers");

  const assetPath = html.match(/<script\b[^>]*\bsrc=["']([^"']+)["']/i)?.[1];
  assert(assetPath, "/: no application script");
  const assetUrl = new URL(assetPath, base);
  assert(assetUrl.origin === base.origin && assetUrl.pathname.startsWith("/assets/")
    && !assetUrl.search && !assetUrl.hash, "/: application script is outside same-origin /assets/");
  const asset = await request(assetUrl.pathname);
  status(asset, 200, assetUrl.pathname);
  assert(/javascript/.test(asset.headers.get("content-type") ?? ""), "asset: HTML instead of JavaScript");
  assert(asset.headers.get("cache-control")?.includes("immutable"), "asset: missing immutable cache");
  await asset.body?.cancel();
  checks.push("real JavaScript asset and immutable cache");

  const deepLink = await request("/studio/domain/3");
  status(deepLink, 200, "SPA deep link");
  assert((await deepLink.text()).includes('id="root"'), "SPA deep link: missing app shell");
  const missingAsset = await request("/assets/deployment-smoke-missing.js");
  status(missingAsset, 404, "missing asset");
  uncached(missingAsset, "missing asset");
  checks.push("SPA fallback and missing asset HTTP 404");

  const health = await request("/healthz");
  status(health, 200, "/healthz");
  uncached(health, "/healthz");
  assert(health.headers.get("content-type")?.includes("application/json"), "/healthz: not JSON");
  assert.deepEqual(await health.json(), { status: "ok" }, "/healthz: invalid response");
  checks.push("uncached JSON health endpoint");

  const unknownApi = await request("/api/deployment-smoke-missing");
  status(unknownApi, 404, "unknown API");
  uncached(unknownApi, "unknown API");
  assert(!(await unknownApi.text()).includes('id="root"'), "unknown API fell back to HTML");
  for (const path of ["/api/chat", "/api/quiz/remediation"]) {
    for (const language of ["it", "en"]) {
      // Deliberately invalid input: validation runs before the provider or budget.
      const response = await request(path, {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ language }),
      });
      status(response, 400, `${path} (${language})`);
      uncached(response, path);
      const body = await response.json();
      assert(typeof body.error === "string" && body.error.length > 0, `${path}: missing validation error`);
    }
  }
  checks.push("API routing and invalid input in IT/EN (no AI calls)");
  return checks;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const headers: Record<string, string> = {};
  if (process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
    headers["x-vercel-protection-bypass"] = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  }
  if (process.env.SMOKE_AI_ACCESS_TOKEN) headers["x-access-token"] = process.env.SMOKE_AI_ACCESS_TOKEN;
  try {
    assert(process.argv[2] && process.argv.length === 3, "Usage: npm run smoke:live -- https://your-deployment.vercel.app");
    for (const check of await smokeLive(process.argv[2], fetch, headers)) console.log(`ok  ${check}`);
    console.log("Live deployment smoke passed.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Live deployment smoke failed.");
    process.exitCode = 1;
  }
}
