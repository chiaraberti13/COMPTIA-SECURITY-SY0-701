import { describe, expect, it } from "vitest";
import { createJsonLogger, redact } from "../server/log";

describe("createJsonLogger", () => {
  it("writes one JSON object per line with time, level and event", () => {
    const lines: string[] = [];
    createJsonLogger((line) => lines.push(line)).log("warn", "http_request", { status: 429, path: "/api/chat" });
    expect(lines).toHaveLength(1);
    expect(lines[0]).not.toContain("\n");
    const entry = JSON.parse(lines[0]);
    expect(entry).toMatchObject({ level: "warn", event: "http_request", status: 429, path: "/api/chat" });
    expect(new Date(entry.time).toString()).not.toBe("Invalid Date");
  });
});

describe("redact", () => {
  it("removes anything shaped like a Google API key", () => {
    const key = "AIza" + "B".repeat(35);
    expect(redact(`request failed for key=${key}&alt=json`)).toBe("request failed for key=[REDACTED]&alt=json");
  });

  it("removes the configured secret even if it has another shape", () => {
    expect(redact("token s3cr3t-value-123 rejected", ["s3cr3t-value-123"])).toBe("token [REDACTED] rejected");
  });

  it("ignores missing or very short secrets instead of redacting common words", () => {
    expect(redact("the key is fine", [undefined, "key"])).toBe("the key is fine");
  });

  it("caps very long messages", () => {
    const out = redact("x".repeat(10_000));
    expect(out.length).toBeLessThanOrEqual(501);
  });
});
