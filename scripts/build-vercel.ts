/** Assemble Build Output API v3 without adding a deployment CLI dependency. */
import { mkdirSync, writeFileSync } from "node:fs";
import { build } from "esbuild";

const output = ".vercel/output";
const functionDir = `${output}/functions/api.func`;
mkdirSync(functionDir, { recursive: true });
await build({
  entryPoints: ["api/index.ts"],
  outfile: `${functionDir}/index.cjs`,
  bundle: true,
  platform: "node",
  format: "cjs",
  target: "node24",
});
writeFileSync(`${functionDir}/.vc-config.json`, JSON.stringify({
  runtime: "nodejs24.x",
  handler: "index.cjs",
  launcherType: "Nodejs",
  maxDuration: 35,
}, null, 2) + "\n");
const securityHeaders = {
  "Cache-Control": "no-cache",
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "no-referrer",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};
writeFileSync(`${output}/config.json`, JSON.stringify({
  version: 3,
  routes: [
    { src: "/.*", headers: securityHeaders, continue: true },
    { src: "/sw\\.js", headers: { "Cache-Control": "no-cache", "Service-Worker-Allowed": "/" }, continue: true },
    { src: "/assets/.*", headers: { "Cache-Control": "public, max-age=31536000, immutable" }, continue: true },
    { src: "/(?:api(?:/.*)?|healthz)", headers: { "Cache-Control": "no-store" }, dest: "/api" },
    { handle: "filesystem" },
    // A missing asset is an error, never a successful HTML response.
    { src: "/assets/.*", status: 404, headers: { "Cache-Control": "no-store" } },
    { src: "/.*", headers: { "Cache-Control": "no-cache" }, dest: "/index.html" },
  ],
}, null, 2) + "\n");
console.log("Vercel build ready: static CDN files + isolated Node 24 API function.");
