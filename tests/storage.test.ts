// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEYS, STORAGE_SCHEMA_VERSION, migrateStorage, readJSON, removeKey, writeJSON } from "../src/storage";

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe("storage helpers", () => {
  it("round-trips a value and removes it", () => {
    expect(writeJSON("k", { a: 1 })).toBe(true);
    expect(readJSON("k", {})).toEqual({ a: 1 });
    removeKey("k");
    expect(readJSON("k", "fallback")).toBe("fallback");
  });

  it("falls back on malformed JSON or a stored null", () => {
    localStorage.setItem("bad", "{not json");
    expect(readJSON("bad", [])).toEqual([]);
    localStorage.setItem("null", "null");
    expect(readJSON("null", 7)).toBe(7);
  });

  it("never throws when the browser blocks storage (private mode, quota)", () => {
    const denied = () => {
      throw new DOMException("denied", "SecurityError");
    };
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(denied);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(denied);
    vi.spyOn(Storage.prototype, "removeItem").mockImplementation(denied);
    expect(readJSON("k", "fallback")).toBe("fallback");
    expect(writeJSON("k", 1)).toBe(false);
    expect(() => removeKey("k")).not.toThrow();
  });

  it("keeps every key under the app's comptia_ prefix", () => {
    for (const key of Object.values(STORAGE_KEYS)) expect(key).toMatch(/^comptia_/);
  });
});

describe("migrateStorage", () => {
  const schema = () => readJSON<unknown>(STORAGE_KEYS.schema, null);

  it("marks existing unversioned data, and a fresh browser, as the current version", () => {
    localStorage.setItem(STORAGE_KEYS.checklist, JSON.stringify({ a: true }));
    expect(migrateStorage()).toBe("current");
    expect(schema()).toBe(STORAGE_SCHEMA_VERSION);
    expect(readJSON(STORAGE_KEYS.checklist, {})).toEqual({ a: true });
  });

  it("runs every missing step once, in order", () => {
    const ran: string[] = [];
    const steps = { 1: () => ran.push("1→2"), 2: () => ran.push("2→3") };
    expect(migrateStorage(steps, 3)).toBe("migrated");
    expect(ran).toEqual(["1→2", "2→3"]);
    expect(schema()).toBe(3);
    expect(migrateStorage(steps, 3)).toBe("current");
    expect(ran).toHaveLength(2);
  });

  it("starts from the stored version", () => {
    writeJSON(STORAGE_KEYS.schema, 2);
    const ran: number[] = [];
    expect(migrateStorage({ 1: () => ran.push(1), 2: () => ran.push(2) }, 3)).toBe("migrated");
    expect(ran).toEqual([2]);
  });

  it("stops at a failing step, keeps the steps already done and retries from there", () => {
    let attempts = 0;
    const steps = {
      1: () => writeJSON("step1", true),
      2: () => {
        attempts++;
        if (attempts === 1) throw new Error("quota");
      },
    };
    expect(migrateStorage(steps, 3)).toBe("failed");
    expect(schema()).toBe(2);
    expect(readJSON("step1", false)).toBe(true);
    expect(migrateStorage(steps, 3)).toBe("migrated");
    expect(schema()).toBe(3);
  });

  it("reports a missing step instead of skipping it", () => {
    expect(migrateStorage({}, 2)).toBe("failed");
  });

  it("leaves data from a newer app untouched", () => {
    writeJSON(STORAGE_KEYS.schema, 9);
    localStorage.setItem(STORAGE_KEYS.checklist, "{\"x\":true}");
    expect(migrateStorage()).toBe("newer");
    expect(schema()).toBe(9);
    expect(localStorage.getItem(STORAGE_KEYS.checklist)).toBe("{\"x\":true}");
  });

  it("treats a corrupted version as the first one", () => {
    localStorage.setItem(STORAGE_KEYS.schema, "\"abc\"");
    const ran: number[] = [];
    expect(migrateStorage({ 1: () => ran.push(1) }, 2)).toBe("migrated");
    expect(ran).toEqual([1]);
  });
});
