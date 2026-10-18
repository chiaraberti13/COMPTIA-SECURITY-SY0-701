import { describe, expect, it } from "vitest";
import { smokeLive } from "../scripts/smoke-live";

const shell = '<div id="root"></div><script type="module" src="/assets/app-123.js"></script>';
const secure = {
  "content-security-policy": "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'",
  "x-content-type-options": "nosniff",
};
const json = { "content-type": "application/json", "cache-control": "no-store" };
function deployment(override?: (path: string) => Response | undefined) {
  const requests: { url: URL; init: RequestInit }[] = [];
  const fetcher: typeof fetch = async (input, init = {}) => {
    const url = new URL(String(input));
    requests.push({ url, init });
    const replacement = override?.(url.pathname);
    if (replacement) return replacement;
    if (url.pathname === "/" || url.pathname === "/studio/domain/3") return new Response(shell, { headers: secure });
    if (url.pathname === "/assets/app-123.js") return new Response("console.log('app');", {
      headers: { "content-type": "application/javascript", "cache-control": "public, max-age=31536000, immutable" },
    });
    if (url.pathname === "/healthz") return new Response('{"status":"ok"}', { headers: json });
    if (url.pathname === "/api/chat" || url.pathname === "/api/quiz/remediation") {
      return new Response('{"error":"Missing input"}', { status: 400, headers: json });
    }
    return new Response('{"error":"Not found"}', { status: 404, headers: json });
  };
  return { fetcher, requests };
}

describe("live deployment smoke", () => {
  it("checks the deployed router without submitting a valid AI request or following redirects", async () => {
    const { fetcher, requests } = deployment();
    const checks = await smokeLive("https://training.example", fetcher, { "x-vercel-protection-bypass": "synthetic-test-only" });
    expect(checks).toHaveLength(5);
    expect(requests.every(r => r.url.origin === "https://training.example" && r.init.redirect === "manual")).toBe(true);
    const posts = requests.filter(r => r.init.method === "POST");
    expect(posts).toHaveLength(4);
    expect(posts.map(r => JSON.parse(String(r.init.body)))).toEqual([
      { language: "it" }, { language: "en" }, { language: "it" }, { language: "en" },
    ]);
  });

  it.each([
    "http://training.example", "https://user:secret@training.example",
    "https://training.example/?token=secret", "https://training.example/#token", "https://training.example/study",
  ])("rejects an unsafe or ambiguous origin before sending requests: %s", async origin => {
    const { fetcher, requests } = deployment();
    await expect(smokeLive(origin, fetcher)).rejects.toThrow("HTTPS origin");
    expect(requests).toHaveLength(0);
  });

  it("does not mistake a Vercel login redirect for a working deployment", async () => {
    const { fetcher } = deployment(path => path === "/" ? new Response(null, { status: 302 }) : undefined);
    await expect(smokeLive("https://training.example", fetcher)).rejects.toThrow("received 302");
  });

  it("never sends a protection bypass code to a script on another origin", async () => {
    const { fetcher, requests } = deployment(path => path === "/" ? new Response(
      shell.replace("/assets/app-123.js", "https://outside.example/assets/app.js"), { headers: secure },
    ) : undefined);
    await expect(smokeLive("https://training.example", fetcher, { "x-vercel-protection-bypass": "synthetic-test-only" }))
      .rejects.toThrow("same-origin");
    expect(requests).toHaveLength(1);
  });

  it.each(["/assets/deployment-smoke-missing.js", "/api/deployment-smoke-missing", "/api/chat", "/healthz"])(
    "catches an overbroad SPA fallback at %s", async path => {
      const { fetcher } = deployment(candidate => candidate === path ? new Response(shell, { headers: secure }) : undefined);
      await expect(smokeLive("https://training.example", fetcher)).rejects.toThrow();
    },
  );

  it("rejects a cached health endpoint even when its JSON is correct", async () => {
    const { fetcher } = deployment(path => path === "/healthz" ? new Response('{"status":"ok"}', {
      headers: { ...json, "cache-control": "public, max-age=60" },
    }) : undefined);
    await expect(smokeLive("https://training.example", fetcher)).rejects.toThrow("missing no-store");
  });
});
