import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createDailyBudget, readLimit } from "./server/aiGuard";
import { createApp } from "./server/app";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

/**
 * Gemini model used by both AI endpoints. Overridable without a code change so
 * a deployment can move to a newer model, or roll back, from the environment.
 * See https://ai.google.dev/gemini-api/docs/models for the current list.
 */
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

/**
 * Longest a Gemini call may take before the request is abandoned, in ms. The
 * abort is client-side only: Gemini may still bill the call, which is why the
 * daily budget below exists as well.
 */
const GEMINI_TIMEOUT_MS = readLimit(process.env.GEMINI_TIMEOUT_MS, 30_000) || 30_000;

/**
 * Total AI calls per UTC day across all clients ("denial of wallet" cap).
 * AI_DAILY_LIMIT=0 switches the AI features off for this deployment.
 */
const aiBudget = createDailyBudget(readLimit(process.env.AI_DAILY_LIMIT, 500));

/**
 * Reverse proxies in front of the server (Cloud Run, Vercel, nginx...). Set 0
 * when clients connect directly, or the rate limit can be bypassed with a
 * forged X-Forwarded-For header.
 */
const TRUST_PROXY_HOPS = readLimit(process.env.TRUST_PROXY, 1);

async function startServer() {
  // PaaS platforms (Cloud Run, Render, Railway, Heroku) impose the port through
  // the environment and health-check the container on it.
  const PORT = Number(process.env.PORT) || 3000;

  const app: express.Express = createApp({
    isProduction,
    model: GEMINI_MODEL,
    timeoutMs: GEMINI_TIMEOUT_MS,
    budget: aiBudget,
    trustProxyHops: TRUST_PROXY_HOPS,
    getApiKey: () => process.env.GEMINI_API_KEY,
    createClient: (apiKey) => new GoogleGenAI({ apiKey }),
  });

  // Vite development integration (production static files are in createApp).
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });

  // Graceful shutdown: PaaS platforms send SIGTERM before stopping a container.
  // Stop accepting connections, let in-flight requests finish, and force the
  // exit if they do not within the grace period.
  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), GEMINI_TIMEOUT_MS + 5_000).unref();
  };
  process.once("SIGTERM", () => shutdown("SIGTERM"));
  process.once("SIGINT", () => shutdown("SIGINT"));
}

startServer();
