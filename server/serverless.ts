/** Serverless adapter: static files live on the CDN, secrets stay at runtime. */
import { GoogleGenAI } from "@google/genai";
import { createApp, type AiClient } from "./app";
import { createDailyBudget, readLimit } from "./aiGuard";

export function createServerlessApp(
  env: NodeJS.ProcessEnv,
  createClient: (key: string) => AiClient = key => new GoogleGenAI({ apiKey: key }),
) {
  const accessToken = env.AI_ACCESS_TOKEN?.trim();
  // A preview cannot spend the production AI quota, even if secrets are copied.
  // Serverless counters are per warm instance, not a shared global spending cap.
  const limit = env.VERCEL_ENV === "production" && (accessToken?.length ?? 0) >= 16
    ? readLimit(env.AI_DAILY_LIMIT, 0)
    : 0;
  return createApp({
    isProduction: true,
    serveStatic: false,
    model: env.GEMINI_MODEL || "gemini-2.5-flash",
    timeoutMs: Math.min(readLimit(env.GEMINI_TIMEOUT_MS, 30_000) || 30_000, 30_000),
    budget: createDailyBudget(limit),
    trustProxyHops: 1,
    accessToken,
    getApiKey: () => env.GEMINI_API_KEY,
    createClient,
  });
}
