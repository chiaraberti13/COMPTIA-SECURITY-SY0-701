/**
 * Writes a Brotli (.br) and a gzip (.gz) copy next to every text file of the
 * built front end, once, at build time. The server (server/app.ts) sends the
 * compressed copy to browsers that accept it, so the ~2.4 MB dataset bundle
 * travels as a few hundred kilobytes, with no compression work per request
 * and no extra dependency: zlib is part of Node.
 *
 * Usage: tsx scripts/precompress.ts [dir]   (default: dist)
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { brotliCompressSync, constants, gzipSync } from "node:zlib";

/** Text formats the browser downloads; images and fonts are already compressed. */
export const COMPRESSIBLE = /\.(js|css|html|svg|json|webmanifest|txt)$/;
/** Below this size compression saves less than the header it costs. */
const MIN_BYTES = 1024;

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

export function precompress(dir: string): { files: number; before: number; brotli: number } {
  let files = 0;
  let before = 0;
  let brotli = 0;
  for (const file of walk(dir)) {
    // The server bundle and its source map never reach a browser.
    if (!COMPRESSIBLE.test(file) || /server\.cjs/.test(file) || statSync(file).size < MIN_BYTES) continue;
    const data = readFileSync(file);
    const br = brotliCompressSync(data, {
      params: { [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY, [constants.BROTLI_PARAM_SIZE_HINT]: data.length },
    });
    writeFileSync(`${file}.br`, br);
    writeFileSync(`${file}.gz`, gzipSync(data, { level: 9 }));
    files += 1;
    before += data.length;
    brotli += br.length;
  }
  return { files, before, brotli };
}

if (process.argv[1] && path.basename(process.argv[1]).startsWith("precompress")) {
  const dir = process.argv[2] ?? "dist";
  const { files, before, brotli } = precompress(dir);
  const kb = (n: number) => `${Math.round(n / 1024)} KB`;
  console.log(`precompress: ${files} files in ${dir}, ${kb(before)} → ${kb(brotli)} with Brotli`);
}
