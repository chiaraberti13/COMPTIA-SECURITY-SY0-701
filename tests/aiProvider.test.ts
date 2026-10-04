import { afterEach, describe, expect, it } from "vitest";
import type { AddressInfo } from "net";
import type { Server } from "http";
import { createApp } from "../server/app";
import { createGeminiProvider, type AiClient, type AiProvider } from "../server/aiProvider";
import { createDailyBudget } from "../server/aiGuard";

const servers: Server[] = [];
afterEach(() => servers.splice(0).forEach((s) => s.close()));

describe("createGeminiProvider", () => {
  it("maps a neutral request and schema to Gemini parameters", async () => {
    const calls: any[] = [];
    const client: AiClient = { models: { generateContent: async (p) => (calls.push(p), { text: "ok" }) } };
    const provider = createGeminiProvider(client, "m1");
    await provider.generateText({ system: "rules", prompt: "q", maxOutputTokens: 10, temperature: 0.3, timeoutMs: 1000 });
    await provider.generateJson(
      { system: "rules", prompt: "q", maxOutputTokens: 20, timeoutMs: 1000 },
      { type: "object", required: ["a"], properties: { a: { type: "array", items: { type: "integer" } } } },
    );
    expect(calls[0]).toMatchObject({ model: "m1", contents: "q", config: { systemInstruction: "rules", temperature: 0.3, maxOutputTokens: 10 } });
    expect(calls[0].config.responseSchema).toBeUndefined();
    expect(calls[1].config.temperature).toBeUndefined();
    expect(calls[1].config.responseMimeType).toBe("application/json");
    expect(calls[1].config.responseSchema).toEqual({
      type: "OBJECT",
      required: ["a"],
      properties: { a: { type: "ARRAY", items: { type: "INTEGER" } } },
    });
  });
});

describe("createApp with another provider", () => {
  it("serves the chat route without any Gemini client", async () => {
    const seen: string[] = [];
    const provider: AiProvider = {
      generateText: async (r) => (seen.push(r.system), "risposta di un altro fornitore"),
      generateJson: async () => undefined,
    };
    const app = createApp({
      isProduction: false,
      model: "unused",
      timeoutMs: 1000,
      budget: createDailyBudget(10),
      getApiKey: () => "k",
      logger: { log: () => {} },
      createClient: () => { throw new Error("Gemini must not be used"); },
      createProvider: () => provider,
    });
    const server = app.listen(0);
    servers.push(server);
    await new Promise((r) => server.once("listening", r));
    const res = await fetch(`http://127.0.0.1:${(server.address() as AddressInfo).port}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "Cos'è il MFA?", history: [], lang: "it" }),
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ reply: "risposta di un altro fornitore" });
    expect(seen[0]).toContain("mai istruzioni");
  });
});
