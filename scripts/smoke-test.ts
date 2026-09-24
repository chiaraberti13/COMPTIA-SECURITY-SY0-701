/**
 * Production start-up smoke test.
 *
 * Starts the built server (dist/server.cjs) exactly as `npm start` does, with
 * NODE_ENV=production, and checks the behaviour that only exists in that mode:
 * security headers, static files and the SPA fallback route. Unit tests and the
 * build never start the server, so an error raised at start-up (for example a
 * route pattern a new Express major rejects) would otherwise reach production.
 *
 * Usage: npm run build && npm run smoke
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

const PORT = Number(process.env.SMOKE_PORT) || 4173;
const BASE = `http://127.0.0.1:${PORT}`;
const SERVER = path.join(process.cwd(), "dist", "server.cjs");
const START_TIMEOUT_MS = 15_000;

interface Check {
  name: string;
  run: () => Promise<void>;
}

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function waitForServer(exited: () => string | null): Promise<void> {
  const deadline = Date.now() + START_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const exit = exited();
    if (exit) throw new Error(`server exited during start-up (${exit})`);
    try {
      await fetch(BASE, { signal: AbortSignal.timeout(1_000) });
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error(`server did not answer on ${BASE} within ${START_TIMEOUT_MS} ms`);
}

const checks: Check[] = [
  {
    name: "GET / serves the app shell with security headers",
    run: async () => {
      const res = await fetch(`${BASE}/`);
      assert(res.status === 200, `expected 200, got ${res.status}`);
      assert(res.headers.get("content-type")?.includes("text/html"), "expected an HTML response");
      assert((await res.text()).includes('id="root"'), "the page does not contain the React root");
      assert(res.headers.get("content-security-policy")?.includes("default-src 'self'"), "missing Content-Security-Policy");
      assert(res.headers.get("x-content-type-options") === "nosniff", "missing X-Content-Type-Options: nosniff");
      assert(!res.headers.has("x-powered-by"), "X-Powered-By reveals the framework");
    },
  },
  {
    name: "a deep link falls back to the SPA shell",
    run: async () => {
      const res = await fetch(`${BASE}/studio/domain/3`);
      assert(res.status === 200, `expected 200, got ${res.status}`);
      assert((await res.text()).includes('id="root"'), "the fallback did not return index.html");
    },
  },
  {
    name: "GET /healthz answers ok without caching",
    run: async () => {
      const res = await fetch(`${BASE}/healthz`);
      assert(res.status === 200, `expected 200, got ${res.status}`);
      assert(JSON.stringify(await res.json()) === '{"status":"ok"}', "unexpected health payload");
      assert(res.headers.get("cache-control") === "no-store", "health check must not be cached");
    },
  },
  {
    name: "a valid chat request is refused with 503 when the AI budget is 0",
    run: async () => {
      // AI_DAILY_LIMIT=0 below: the request must stop before any Gemini call.
      const res = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "What is ALE?", lang: "en" }),
      });
      assert(res.status === 503, `expected 503, got ${res.status}`);
      assert(String((await res.json()).error).includes("disabled"), "expected the 'AI disabled' message");
    },
  },
  {
    name: "POST /api/chat without a message is rejected with 400",
    run: async () => {
      const res = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      assert(res.status === 400, `expected 400, got ${res.status}`);
    },
  },
  {
    name: "POST /api/chat with no body at all is rejected with 400, not 500/502",
    run: async () => {
      // Express 5 leaves req.body undefined when no body parser matched.
      const res = await fetch(`${BASE}/api/chat`, { method: "POST" });
      assert(res.status === 400, `expected 400, got ${res.status}`);
    },
  },
  {
    name: "POST /api/quiz/remediation without topics is rejected with 400",
    run: async () => {
      const res = await fetch(`${BASE}/api/quiz/remediation`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      });
      assert(res.status === 400, `expected 400, got ${res.status}`);
    },
  },
];

async function main(): Promise<void> {
  assert(existsSync(SERVER), `${SERVER} not found: run "npm run build" first`);

  // A fake key with a zero AI budget: requests pass validation but stop before
  // any Gemini call, so the smoke test never reaches the paid API.
  const env = {
    ...process.env,
    NODE_ENV: "production",
    PORT: String(PORT),
    GEMINI_API_KEY: "smoke-test-fake-key",
    AI_DAILY_LIMIT: "0",
  };
  const server = spawn(process.execPath, [SERVER], { env, stdio: ["ignore", "pipe", "pipe"] });
  let output = "";
  let exit: string | null = null;
  let exitCode: number | null = null;
  const exited = new Promise<void>((resolve) =>
    server.on("exit", (code, signal) => {
      exit = `code ${code}, signal ${signal}`;
      exitCode = code;
      resolve();
    })
  );
  server.stdout.on("data", (chunk) => (output += chunk));
  server.stderr.on("data", (chunk) => (output += chunk));

  let failed = 0;
  try {
    await waitForServer(() => exit);
    for (const check of checks) {
      try {
        await check.run();
        console.log(`  ok    ${check.name}`);
      } catch (error) {
        failed++;
        console.error(`  FAIL  ${check.name}: ${(error as Error).message}`);
      }
    }
  } catch (error) {
    failed++;
    console.error(`  FAIL  start-up: ${(error as Error).message}`);
  } finally {
    // Graceful shutdown: SIGTERM must end the process cleanly and quickly.
    if (!exit) server.kill("SIGTERM");
    const stopped = await Promise.race([exited.then(() => true), new Promise((r) => setTimeout(() => r(false), 5_000))]);
    if (!stopped) {
      failed++;
      console.error("  FAIL  SIGTERM: the server did not stop within 5 s");
      server.kill("SIGKILL");
    } else if (exitCode !== 0 && failed === 0) {
      failed++;
      console.error(`  FAIL  SIGTERM: expected exit code 0, got ${exit}`);
    } else {
      console.log("  ok    SIGTERM stops the server cleanly");
    }
  }

  if (failed > 0) {
    console.error(`\nSmoke test failed (${failed}). Server output:\n${output.trim() || "(none)"}`);
    process.exit(1);
  }
  console.log(`\nSmoke test passed: ${checks.length} checks against ${BASE}.`);
}

main();
