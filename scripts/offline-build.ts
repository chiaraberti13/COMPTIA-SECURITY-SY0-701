import { createHash } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type { Plugin } from "vite";

const TEMPLATE = new URL("../src/offline/service-worker.js", import.meta.url);
const ROOT_FILES = ["/index.html", "/manifest.webmanifest", "/favicon.svg", "/favicon.ico", "/apple-touch-icon.png"];

/** Only public app resources; never APIs, backend files, source maps or data entered by a learner. */
export function offlineFiles(directory: string): string[] {
  const walk = (relative: string): string[] => readdirSync(join(directory, relative), { withFileTypes: true }).flatMap(entry => {
    const path = `${relative}/${entry.name}`;
    return entry.isDirectory() ? walk(path) : /\.(?:js|css|woff2?|ttf|png|svg|ico)$/.test(path) ? [path] : [];
  });
  const manifest = JSON.parse(readFileSync(join(directory, "manifest.webmanifest"), "utf8"));
  const icons = manifest.icons.map((icon: { src: string }) => {
    if (!/^\/[^?#]+\.(?:png|svg|ico)$/.test(icon.src) || icon.src.includes("..") || icon.src.startsWith("//")) {
      throw new Error("Offline manifest icons must be local absolute paths");
    }
    return icon.src as string;
  });
  const files = [...new Set([...ROOT_FILES, ...icons, ...walk("/assets")])].sort();
  // Fail the build rather than promise offline support with half a language.
  for (const language of ["it", "en"]) {
    if (!files.some(file => new RegExp(`/assets/dataset-${language}-[^/]+\\.js$`).test(file))) {
      throw new Error(`Offline build is missing the ${language} dataset`);
    }
  }
  for (const file of files) readFileSync(join(directory, file));
  return files;
}

export function renderOfflineWorker(files: string[], revision: string): string {
  return readFileSync(TEMPLATE, "utf8")
    .replace("__OFFLINE_REVISION__", JSON.stringify(revision))
    .replace("__OFFLINE_FILES__", JSON.stringify(files));
}

export function buildOfflineWorker(directory: string): { revision: string; files: string[] } {
  const files = offlineFiles(directory);
  const hash = createHash("sha256").update(readFileSync(TEMPLATE));
  for (const file of files) hash.update(file).update(readFileSync(join(directory, file)));
  const revision = hash.digest("hex").slice(0, 24);
  writeFileSync(join(directory, "sw.js"), renderOfflineWorker(files, revision));
  return { revision, files };
}

/** Runs for both dist/ and the Vercel static build, after Vite writes/copies every resource. */
export function offlineBuildPlugin(): Plugin {
  let directory: string;
  return {
    name: "offline-study",
    apply: "build",
    configResolved(config) { directory = resolve(config.root, config.build.outDir); },
    writeBundle() { buildOfflineWorker(directory); },
  };
}
