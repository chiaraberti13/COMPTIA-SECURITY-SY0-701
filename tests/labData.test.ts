import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";

/*
 * The synthetic datasets of the labs (labs/DATI.md, ROADMAP: "Dati sintetici
 * versionati"): every file is catalogued with its hash, generated files are
 * reproduced by their generator, the data holds no real address, domain or
 * email, and the figures each lab prints are recomputed from the data, so the
 * expected output in the text cannot drift from the file it describes.
 */

const LABS = "labs";
const CATALOG = readFileSync(join(LABS, "DATI.md"), "utf8");
const LANGS = ["README.md", "README.en.md"];

const dataFiles = readdirSync(LABS, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name))
  .flatMap((d) => {
    try {
      return readdirSync(join(LABS, d.name, "data")).map((f) => `${d.name}/data/${f}`);
    } catch {
      return [];
    }
  })
  .sort();

const sha256 = (text: string | Buffer) => createHash("sha256").update(text).digest("hex");
const read = (path: string) => readFileSync(join(LABS, path), "utf8");
const readme = (lab: string, file: string) => read(`${lab}/${file}`);

/** The SHA-256 column of the catalog, by file. */
const catalogued = new Map(
  [...CATALOG.matchAll(/^\| `([^`]+)` \|.*\| `([0-9a-f]{64})` \|$/gm)].map((m) => [m[1], m[2]])
);

const PRIVATE_OR_DOC = [
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^192\.0\.2\./,
  /^198\.51\.100\./,
  /^203\.0\.113\./,
];
const RESERVED_DOMAIN = /(\.test|\.example|\.invalid|\.localhost|(^|\.)example\.(com|net|org))$/;

describe("lab datasets", () => {
  it("are all in the catalog, with the hash of the file", () => {
    expect([...catalogued.keys()].sort()).toEqual(dataFiles);
    for (const file of dataFiles) {
      expect(sha256(readFileSync(join(LABS, file))), file).toBe(catalogued.get(file));
    }
  });

  it("match the hash each lab tells the learner to check", () => {
    for (const file of dataFiles.filter((f) => !f.endsWith(".py"))) {
      const [lab, , name] = file.split("/");
      for (const lang of LANGS) {
        expect(readme(lab, lang), `${lab}/${lang}`).toContain(`${catalogued.get(file)}  ${name}`);
      }
    }
  });

  it("are reproduced byte for byte by their generator", () => {
    const generated = execFileSync("python3", [join(LABS, "03-log-analysis/data/genera_auth_log.py")]);
    expect(sha256(generated)).toBe(catalogued.get("03-log-analysis/data/auth.log"));
    // The Lab 10 generator writes its two files into the current folder: run it in a scratch one.
    const scratch = mkdtempSync(join(tmpdir(), "lab10-"));
    execFileSync("python3", [resolve(LABS, "10-attack-to-defense/data/genera_tracce.py")], { cwd: scratch });
    for (const name of ["access.log", "auth-events.jsonl"]) {
      expect(sha256(readFileSync(join(scratch, name))), name).toBe(catalogued.get(`10-attack-to-defense/data/${name}`));
    }
    execFileSync("python3", [resolve(LABS, "11-telemetry-views/data/genera_telemetria.py")], { cwd: scratch });
    for (const name of ["rete.jsonl", "identita.jsonl", "endpoint.jsonl"]) {
      expect(sha256(readFileSync(join(scratch, name))), name).toBe(catalogued.get(`11-telemetry-views/data/${name}`));
    }
    rmSync(scratch, { recursive: true, force: true });
  });

  it("use only private or documentation addresses, reserved domains and no email", () => {
    const problems: string[] = [];
    for (const file of dataFiles.filter((f) => !f.endsWith(".py"))) {
      const text = read(file);
      for (const [ip] of text.matchAll(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g)) {
        if (!PRIVATE_OR_DOC.some((range) => range.test(ip))) problems.push(`${file}: address ${ip}`);
      }
      for (const match of text.matchAll(/\b(?:[a-z0-9-]+\.)+[a-z]{2,}\b/gi)) {
        const domain = match[0];
        if (/\.(json|log|exe|docm|txt)$/i.test(domain)) continue; // file names, not hosts
        // User names such as l.bianchi look like domains: skip the fields that hold people.
        if (/(user=|"owner": "|"user": ")$/.test(text.slice(Math.max(0, match.index - 10), match.index))) continue;
        // URL paths (/app.js, /backup.zip) and user agents (Firefox/131.0) are not hosts.
        if (/[/(]$/.test(text.slice(match.index - 1, match.index))) continue;
        if (!RESERVED_DOMAIN.test(domain.toLowerCase())) problems.push(`${file}: domain ${domain}`);
      }
      for (const [email] of text.matchAll(/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g)) problems.push(`${file}: email ${email}`);
    }
    expect(problems).toEqual([]);
  });
});

describe("expected output of Lab 03, recomputed from auth.log", () => {
  const lines = read("03-log-analysis/data/auth.log").trim().split("\n");
  const failed = lines.filter((l) => l.includes("Failed password"));
  const ipOf = (l: string) => l.split(" ").at(-4)!;
  const count = (values: string[]) =>
    [...values.reduce((m, v) => m.set(v, (m.get(v) ?? 0) + 1), new Map<string, number>())].sort((a, b) => b[1] - a[1]);

  it("prints the failed sign-ins per address", () => {
    const rows = count(failed.map(ipOf)).map(([ip, n]) => `${String(n).padStart(7)} ${ip}`);
    expect(rows).toEqual(["     24 203.0.113.45", "     12 198.51.100.23", "      1 10.0.0.34"]);
    for (const lang of LANGS) for (const row of rows) expect(readme("03-log-analysis", lang)).toContain(`   ${row}`);
  });

  it("prints how many different accounts each address tried", () => {
    const users = new Map<string, Set<string>>();
    for (const l of failed) {
      const f = l.split(" ");
      const user = f[6] === "invalid" ? f[8] : f[6];
      users.set(ipOf(l), (users.get(ipOf(l)) ?? new Set()).add(user));
    }
    expect(users.get("198.51.100.23")?.size).toBe(12);
    expect(users.get("203.0.113.45")?.size).toBe(1);
    for (const lang of LANGS) {
      expect(readme("03-log-analysis", lang)).toContain("   12 198.51.100.23\n   1 203.0.113.45\n   1 10.0.0.34");
    }
  });

  it("prints the successful sign-ins and the brute force window", () => {
    expect(lines.filter((l) => l.includes("Accepted"))).toHaveLength(6);
    const brute = failed.filter((l) => l.includes("203.0.113.45")).map((l) => l.split(" ")[0]);
    const summary = `${brute.length} ${brute[0]} ${brute.at(-1)}`;
    expect(summary).toBe("24 2026-09-29T02:10:01+00:00 2026-09-29T02:11:56+00:00");
    for (const lang of LANGS) expect(readme("03-log-analysis", lang)).toContain(summary);
  });
});

describe("expected output of Lab 06, recomputed from alerts.json", () => {
  const alerts: { id: string; time: string; source: string; severity: string; host: string; rule: string; detail: string }[] =
    JSON.parse(read("06-incident-triage/data/alerts.json"));

  it("prints twelve alerts and their severities", () => {
    expect(alerts).toHaveLength(12);
    const bySeverity = new Map<string, number>();
    for (const a of alerts) bySeverity.set(a.severity, (bySeverity.get(a.severity) ?? 0) + 1);
    for (const lang of LANGS) {
      const text = readme("06-incident-triage", lang);
      for (const [severity, n] of bySeverity) expect(text, severity).toContain(`${String(n).padStart(7)} ${severity}`);
    }
  });

  it("prints the six correlated alerts of WS-042, in order", () => {
    const story = alerts
      .filter((a) => a.host === "WS-042" || a.detail.includes("WS-042") || a.detail.includes("l.bianchi"))
      .sort((a, b) => a.time.localeCompare(b.time))
      .map((a) => `${a.time.slice(11, 19)} ${a.source} ${a.rule}`);
    expect(story).toHaveLength(6);
    for (const lang of LANGS) expect(readme("06-incident-triage", lang)).toContain(story.map((s) => `   ${s}`).join("\n"));
  });
});

describe("expected output of Lab 10, recomputed from the traces", () => {
  const access = read("10-attack-to-defense/data/access.log").trim().split("\n").map((l) => l.split(" "));
  const events: { time: string; ip: string; user: string; result: string }[] = read("10-attack-to-defense/data/auth-events.jsonl")
    .trim().split("\n").map((l) => JSON.parse(l));

  it("prints the requests per address and status", () => {
    const counts = new Map<string, number>();
    for (const f of access) counts.set(`${f[0]} ${f[8]}`, (counts.get(`${f[0]} ${f[8]}`) ?? 0) + 1);
    for (const lang of LANGS) {
      const text = readme("10-attack-to-defense", lang);
      for (const [key, n] of counts) expect(text, key).toContain(`${String(n).padStart(7)} ${key}`);
    }
  });

  it("prints forty accounts tried once each, one of them taken over", () => {
    const stuffing = events.filter((e) => e.ip === "198.51.100.50");
    expect(stuffing).toHaveLength(40);
    expect(new Set(stuffing.map((e) => e.user)).size).toBe(40);
    expect(stuffing.filter((e) => e.result === "success").map((e) => e.user)).toEqual(["m.conti"]);
  });

  it("raises the sign-in alert at the time the lab states, before the takeover", () => {
    const failures = events.filter((e) => e.result === "failure" && e.ip === "198.51.100.50").map((e) => Date.parse(e.time));
    const index = failures.findIndex((t, i) => failures.filter((u, j) => j <= i && t - u < 60_000).length >= 10);
    const alert = new Date(failures[index]).toISOString().replace(".000", "");
    const takeover = events.find((e) => e.result === "success" && e.ip === "198.51.100.50")!.time;
    expect(alert).toBe("2026-09-29T10:31:09Z");
    expect(alert < takeover).toBe(true);
    for (const lang of LANGS) expect(readme("10-attack-to-defense", lang)).toContain(`ALLARME ${alert} 198.51.100.50 10 login`);
  });
});

describe("expected output of Lab 11, recomputed from the telemetry", () => {
  const jsonl = (name: string): Record<string, string | number>[] =>
    read(`11-telemetry-views/data/${name}`).trim().split("\n").map((l) => JSON.parse(l));
  const rete = jsonl("rete.jsonl");
  const identita = jsonl("identita.jsonl");
  const endpoint = jsonl("endpoint.jsonl");

  it("prints the flows per source and duration", () => {
    const counts = new Map<string, number>();
    for (const f of rete) counts.set(`${f.src} ${f.duration_s}s`, (counts.get(`${f.src} ${f.duration_s}s`) ?? 0) + 1);
    expect(counts.size).toBe(4);
    for (const lang of LANGS) {
      const text = readme("11-telemetry-views", lang);
      for (const [key, n] of counts) expect(text, key).toContain(`${String(n).padStart(7)} ${key}`);
    }
    // The network sensor carries no usernames: the lab draws its first lesson from that.
    expect(rete.every((f) => !("user" in f))).toBe(true);
  });

  it("prints the failures per source and the accounts tried", () => {
    const failures = identita.filter((e) => e.result === "failure");
    for (const src of new Set(failures.map((e) => e.src))) {
      const mine = failures.filter((e) => e.src === src);
      const line = `{"src":"${src}","falliti":${mine.length},"account":${new Set(mine.map((e) => e.user)).size}}`;
      for (const lang of LANGS) expect(readme("11-telemetry-views", lang), line).toContain(line);
    }
  });

  it("raises one correlated alert with the sudo commands that followed", () => {
    const ok = identita.find((e) => e.result === "success" && e.src === "203.0.113.45")!;
    const failed = identita.filter((e) => e.result === "failure" && e.user === ok.user && e.src === ok.src && e.time < ok.time).length;
    const after = endpoint
      .filter((e) => e.parent === "sudo" && Date.parse(String(e.time)) - Date.parse(String(ok.time)) >= 0 && Date.parse(String(e.time)) - Date.parse(String(ok.time)) <= 300_000)
      .map((e) => e.command);
    const alert = `ALLARME ${String(ok.time).slice(11, 19)} ${ok.user} da ${ok.src}: accesso dopo ${failed} falliti, poi con sudo: ${after.join("; ")}`;
    expect(failed).toBe(24);
    expect(after).toHaveLength(2);
    for (const lang of LANGS) expect(readme("11-telemetry-views", lang)).toContain(alert);
  });
});
