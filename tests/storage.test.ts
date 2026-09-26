// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEYS, readJSON, removeKey, writeJSON } from "../src/storage";

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
