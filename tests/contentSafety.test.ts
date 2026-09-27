import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

/**
 * Examples in the study content must not teach bad habits or involve real
 * third parties (ROADMAP: "Revisionare gli esempi per evitare cattive pratiche").
 *
 * - Hostnames in scenarios are reserved names (RFC 2606, RFC 6761), so that an
 *   attack example never points at, or casts as victim, a real organisation, and
 *   a learner who copies one reaches nothing. The few real names left are facts,
 *   listed below with the reason.
 * - No copy-and-paste command that disables a protection or destroys data.
 * - Nothing shaped like a real credential.
 */

const CONTENT_FILES = ["src/data.ts", "src/data.en.ts", "src/domainGuides.ts", "src/i18n.tsx", "src/studyPaths.ts"];
const content = CONTENT_FILES.map((file) => ({ file, text: readFileSync(file, "utf8") }));

/** Real hostnames that stay because the sentence is about them. */
const FACTUAL_HOSTS = new Set([
  // The PKI example describes the real certificate chain of google.com.
  "google.com",
]);

const RESERVED = /(^|\.)(example\.(com|net|org)|example|test|invalid|localhost)$/;

/**
 * Hostnames written in the content, e.g. `portale.example.com`. Lower case only:
 * hostnames in the text are, while code such as `UI.it` is not a hostname.
 */
function hostnames(text: string): string[] {
  const found = text.match(/\b[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.(?:com|net|org|it|edu|gov|io|eu|de|uk|info|biz|example|test|invalid)\b/g) ?? [];
  return [...new Set(found)];
}

const DANGEROUS_COMMANDS: [string, RegExp][] = [
  ["recursive forced delete of a root path", /rm\s+-(rf|fr)\s+\/(\s|$|\*)/],
  ["world-writable permissions", /chmod\s+(-R\s+)?0?777\b/],
  ["piping a download straight into a shell", /(curl|wget)\b[^\n"`]*\|\s*(sudo\s+)?(ba|z)?sh\b/],
  ["TLS verification switched off", /--no-check-certificate|curl\s+(-\w*k\b|--insecure)|verify\s*=\s*False|NODE_TLS_REJECT_UNAUTHORIZED\s*=\s*['"]?0/],
  ["SSH host key checking switched off", /StrictHostKeyChecking\s*=?\s*no/],
  ["host firewall or SELinux switched off", /setenforce\s+0|ufw\s+disable|iptables\s+-F\b|systemctl\s+(stop|disable)\s+firewalld/],
  ["reverse shell", /\b(nc|ncat)\s+[^\n"`]*-e\s+\/bin\/(ba)?sh/],
];

const CREDENTIAL_SHAPES: [string, RegExp][] = [
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{36}\b/],
  ["private key block", /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{35}\b/],
];

describe("study content examples", () => {
  it("use reserved hostnames instead of real third parties", () => {
    const real = content.flatMap(({ file, text }) =>
      hostnames(text)
        .filter((host) => !RESERVED.test(host) && !FACTUAL_HOSTS.has(host))
        .map((host) => `${file}: ${host}`)
    );
    expect(real).toEqual([]);
  });

  it("do not cast a real training company as the organisation in the scenarios", () => {
    const named = content.filter(({ text }) => /\bDion(\s|Training)/.test(text)).map(({ file }) => file);
    expect(named).toEqual([]);
  });

  it("contain no command that disables a protection or destroys data", () => {
    const found = content.flatMap(({ file, text }) =>
      DANGEROUS_COMMANDS.filter(([, rx]) => rx.test(text)).map(([name]) => `${file}: ${name}`)
    );
    expect(found).toEqual([]);
  });

  it("contain nothing shaped like a real credential", () => {
    const found = content.flatMap(({ file, text }) =>
      CREDENTIAL_SHAPES.filter(([, rx]) => rx.test(text)).map(([name]) => `${file}: ${name}`)
    );
    expect(found).toEqual([]);
  });
});
