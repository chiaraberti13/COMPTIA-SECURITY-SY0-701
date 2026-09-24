import { describe, expect, it } from "vitest";
import {
  BACKUP_APP_ID,
  MAX_BACKUP_BYTES,
  backupFileName,
  buildBackup,
  parseBackup,
  sanitizeBookmarks,
  sanitizeChecklist,
  type ProgressData,
} from "../src/progressBackup";

const SAMPLE: ProgressData = {
  checklist: { WPA3EnterpriseRes: true, HoneynetDeception: true },
  bookmarks: ["term-1", "term-2"],
  quizHistory: [{ at: 1_758_700_000_000, score: 20, total: 25, domains: [1, 2], passed: true }],
  questionProgress: { 10_001: { attempts: 2, correct: 1, streak: 0, lastSeenAt: 1_758_700_000_000, dueAt: 1_758_786_400_000 } },
};

describe("sanitizeChecklist", () => {
  it("keeps only completed items with a well-formed key", () => {
    expect(sanitizeChecklist({ ok: true, notDone: false, "<script>": true, num: 1 })).toEqual({ ok: true });
  });

  it("returns an empty checklist for anything that is not an object", () => {
    for (const value of [null, undefined, "x", 3, ["a"], true]) expect(sanitizeChecklist(value)).toEqual({});
  });
});

describe("sanitizeBookmarks", () => {
  it("keeps unique, well-formed ids", () => {
    expect(sanitizeBookmarks(["a", "a", "b", 3, null, "bad id with spaces"])).toEqual(["a", "b"]);
  });

  it("turns a non-array into an empty list instead of crashing the glossary", () => {
    expect(sanitizeBookmarks({ includes: "not a function" })).toEqual([]);
  });
});

describe("backup round trip", () => {
  it("exports and imports the same progress", () => {
    const text = buildBackup(SAMPLE, new Date("2026-09-24T10:00:00Z"));
    const result = parseBackup(text);
    expect(result).toEqual({ ok: true, data: SAMPLE, exportedAt: "2026-09-24T10:00:00.000Z" });
  });

  it("names the file after the export date", () => {
    expect(backupFileName(new Date("2026-09-24T10:00:00Z"))).toBe("security-plus-progress-2026-09-24.json");
  });
});

describe("parseBackup rejects untrusted files", () => {
  it("rejects text that is not JSON", () => {
    expect(parseBackup("not json")).toEqual({ ok: false, error: "invalid-json" });
    expect(parseBackup("null")).toEqual({ ok: false, error: "invalid-json" });
  });

  it("rejects a JSON file from another application", () => {
    expect(parseBackup(JSON.stringify({ app: "other", schema: 1, data: {} }))).toEqual({ ok: false, error: "wrong-app" });
  });

  it("rejects an unknown schema version", () => {
    expect(parseBackup(JSON.stringify({ app: BACKUP_APP_ID, schema: 99, data: {} }))).toEqual({
      ok: false,
      error: "unsupported-schema",
    });
  });

  it("rejects an oversized file before parsing it", () => {
    expect(parseBackup(" ".repeat(MAX_BACKUP_BYTES + 1))).toEqual({ ok: false, error: "too-large" });
  });

  it("drops malformed entries instead of importing them", () => {
    const text = JSON.stringify({
      app: BACKUP_APP_ID,
      schema: 1,
      data: {
        checklist: { good: true, "</script><img src=x onerror=alert(1)>": true },
        bookmarks: "not-an-array",
        quizHistory: [{ at: -1, score: 99, total: 1 }],
        questionProgress: { "-5": {}, abc: { attempts: 1 } },
        __proto__: { polluted: true },
      },
    });
    const result = parseBackup(text);
    expect(result).toEqual({
      ok: true,
      data: { checklist: { good: true }, bookmarks: [], quizHistory: [], questionProgress: {} },
      exportedAt: "",
    });
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });
});
