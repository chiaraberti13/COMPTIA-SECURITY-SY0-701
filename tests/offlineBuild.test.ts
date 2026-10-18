import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { buildOfflineWorker, offlineFiles } from "../scripts/offline-build";

const directories: string[] = [];
afterEach(() => directories.splice(0).forEach(dir => rmSync(dir, { recursive: true, force: true })));
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), "offline-build-"));
  directories.push(dir);
  const write = (file: string, value = "public") => writeFileSync(join(dir, file), value);
  mkdirSync(join(dir, "assets"));
  for (const file of ["index.html", "favicon.svg", "favicon.ico", "apple-touch-icon.png", "icon-192.png", "assets/dataset-it-123.js", "assets/dataset-en-456.js", "assets/lazy-pbq-789.js", "assets/font.woff2", "assets/app.css"]) write(file);
  write("manifest.webmanifest", JSON.stringify({ icons: [{ src: "/icon-192.png" }] }));
  return { dir, write };
}

describe("offline build", () => {
  it("includes shell, both languages, lazy chunks, fonts, styles and icons, without private/compressed files", () => {
    const { dir, write } = fixture();
    for (const file of ["server.cjs", ".env", "assets/app.js.map", "assets/font.woff2.br", "assets/private.ts"]) write(file);
    const files = offlineFiles(dir);
    expect(files).toContain("/index.html");
    expect(files).toContain("/assets/dataset-en-456.js");
    expect(files).toContain("/assets/lazy-pbq-789.js");
    expect(files).toContain("/assets/font.woff2");
    expect(files).toContain("/assets/app.css");
    expect(files).toContain("/icon-192.png");
    expect(files.some(file => /server|\.env|\.map$|\.br$|\.ts$/.test(file))).toBe(false);
  });
  it("changes the revision for shell, asset and public icon changes", () => {
    const { dir, write } = fixture();
    const revision = buildOfflineWorker(dir).revision;
    expect(buildOfflineWorker(dir).revision).toBe(revision);
    const worker = readFileSync(join(dir, "sw.js"), "utf8");
    expect(worker).not.toContain("__OFFLINE_");
    expect(worker).toContain(revision);
    write("index.html", "changed shell");
    const next = buildOfflineWorker(dir).revision;
    expect(next).not.toBe(revision);
    write("assets/lazy-pbq-789.js", "changed PBQ");
    const last = buildOfflineWorker(dir).revision;
    expect(last).not.toBe(next);
    write("icon-192.png", "changed icon");
    expect(buildOfflineWorker(dir).revision).not.toBe(last);
  });
  it("refuses a missing language or a remote manifest icon", () => {
    const { dir, write } = fixture();
    rmSync(join(dir, "assets/dataset-en-456.js"));
    expect(() => offlineFiles(dir)).toThrow("missing the en dataset");
    write("assets/dataset-en-456.js");
    write("manifest.webmanifest", JSON.stringify({ icons: [{ src: "https://other.example/icon.png" }] }));
    expect(() => offlineFiles(dir)).toThrow("local absolute paths");
  });
});
