/**
 * Structured logs: one JSON object per line on stdout, which Cloud Run, Render,
 * Railway, Docker and journald all parse and filter by field.
 *
 * What is logged is deliberately narrow. A log line never contains the
 * learner's messages or topics, the request body, query strings, cookies, IP
 * addresses or API keys: only what is needed to see that the service is
 * healthy and to reconstruct an abuse of the AI endpoints (how many requests,
 * which route, which outcome, how long).
 */

import type { RequestHandler } from "express";

export type LogLevel = "info" | "warn" | "error";

export type LogFields = Record<string, string | number | boolean | undefined>;

export interface Logger {
  log(level: LogLevel, event: string, fields?: LogFields): void;
}

/** Writes each entry as a single JSON line (default: to stdout). */
export function createJsonLogger(write: (line: string) => void = (line) => process.stdout.write(line + "\n")): Logger {
  return {
    log(level, event, fields = {}) {
      write(JSON.stringify({ time: new Date().toISOString(), level, event, ...fields }));
    },
  };
}

/** Google API keys ("AIza" + 35 characters), wherever they appear. */
const GOOGLE_API_KEY = /AIza[0-9A-Za-z_-]{35}/g;

/**
 * Removes secrets from a text before it is logged: the configured key itself
 * and anything shaped like a Google API key. Also caps the length, so a huge
 * provider message cannot flood the log.
 */
export function redact(text: string, secrets: Array<string | undefined> = []): string {
  let out = text.replace(GOOGLE_API_KEY, "[REDACTED]");
  for (const secret of secrets) {
    if (secret && secret.length >= 8) out = out.split(secret).join("[REDACTED]");
  }
  return out.length > 500 ? `${out.slice(0, 500)}…` : out;
}

/**
 * Logs every finished request under the given prefix: method, path (without
 * the query string), status and duration. 5xx are errors, 4xx warnings.
 */
export function requestLogger(logger: Logger): RequestHandler {
  return (req, res, next) => {
    const started = process.hrtime.bigint();
    res.on("finish", () => {
      const level: LogLevel = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
      logger.log(level, "http_request", {
        method: req.method,
        path: req.originalUrl.split("?")[0],
        status: res.statusCode,
        ms: Math.round(Number(process.hrtime.bigint() - started) / 1e6),
      });
    });
    next();
  };
}
