import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, readdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";

/*
 * labs/preflight.sh (ROADMAP: "Validazione automatica dell'ambiente"), run as
 * the learner would. The tools a lab needs are stand-in executables on PATH and
 * the readings of the system come from the script's PREFLIGHT_* variables, so
 * every scenario is the same on any machine, CI included.
 */

const SCRIPT = "labs/preflight.sh";
const BASH = spawnSync("bash", ["-c", "command -v bash"], { encoding: "utf8" }).stdout.trim();
const source = readFileSync(SCRIPT, "utf8");

const stubs = mkdtempSync(join(tmpdir(), "preflight-"));
for (const command of ["node", "npm", "curl", "git", "grep", "awk", "sort", "uniq", "sha256sum", "openssl", "tar", "jq",
  "sshd", "nft", "ip", "ss", "nc", "python3", "dpkg-statoverride", "setfacl", "getfacl", "useradd", "visudo", "chage", "ping", "nginx"]) {
  // Real tools the script itself uses (awk, grep, sort, head, sed, df) must keep working.
  if (["awk", "grep", "sort"].includes(command)) continue;
  writeFileSync(join(stubs, command), "#!/bin/sh\nexit 0\n");
  chmodSync(join(stubs, command), 0o755);
}
afterAll(() => rmSync(stubs, { recursive: true, force: true }));

/** A healthy, isolated lab machine; each test changes one reading. */
const HEALTHY = {
  PREFLIGHT_VIRT: "kvm",
  PREFLIGHT_ROUTE: "",
  PREFLIGHT_LISTEN: "LISTEN 0 128 127.0.0.1:22 0.0.0.0:*",
  PREFLIGHT_DISK_KB: String(20 * 1024 * 1024),
  PREFLIGHT_MEM_KB: String(4 * 1024 * 1024),
};

function run(lab: string, overrides: Record<string, string> = {}, extra: string[] = []) {
  const result = spawnSync("bash", [SCRIPT, lab, ...extra], {
    encoding: "utf8",
    env: { ...process.env, ...HEALTHY, ...overrides, PATH: `${stubs}:${process.env.PATH}` },
  });
  return { code: result.status, out: result.stdout + result.stderr };
}

const labs = readdirSync("labs", { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);

describe("labs/preflight.sh", () => {
  it("knows every lab, with the risk level the lab declares", () => {
    for (const lab of labs) {
      const nn = lab.slice(0, 2);
      const declared = readFileSync(join("labs", lab, "README.md"), "utf8").match(/\| Rischio \| `([a-z-]+)` \|/)?.[1];
      expect(source, lab).toMatch(new RegExp(`^  ${nn}\\) risk=${declared};`, "m"));
    }
  });

  it("passes on a healthy isolated virtual machine, for every lab", () => {
    for (const lab of labs) {
      const { code, out } = run(lab.slice(0, 2));
      expect(code, `${lab}\n${out}`).toBe(0);
      expect(out).toContain("Esito: pronto (avvisi: 0).");
    }
  });

  it("refuses a moderate lab outside a virtual machine, or with a default route", () => {
    const host = run("07", { PREFLIGHT_VIRT: "none" });
    expect(host.code).toBe(1);
    expect(host.out).toContain("[ERRORE ] non sei in una macchina virtuale");
    const routed = run("09", { PREFLIGHT_ROUTE: "default via 192.0.2.1 dev eth0 " });
    expect(routed.code).toBe(1);
    expect(routed.out).toContain("esiste una rotta predefinita (default via 192.0.2.1 dev eth0):");
  });

  it("only warns about a container, since the snapshot needs other means", () => {
    const { code, out } = run("08", { PREFLIGHT_VIRT: "docker" });
    expect(code).toBe(0);
    expect(out).toContain("[AVVISO ] ambiente docker");
  });

  it("does not check isolation for low-risk labs, which run on the learner's machine", () => {
    const { code, out } = run("03", { PREFLIGHT_VIRT: "none", PREFLIGHT_ROUTE: "default via 192.0.2.1 dev eth0" });
    expect(code).toBe(0);
    expect(out).not.toContain("rotta");
  });

  it("fails when a port the lab needs is taken, and warns about services exposed outside loopback", () => {
    const taken = run("01", { PREFLIGHT_LISTEN: "LISTEN 0 511 *:4190 *:*" });
    expect(taken.code).toBe(1);
    expect(taken.out).toContain("la porta 4190 è già in uso");
    const exposed = run("03", { PREFLIGHT_LISTEN: "LISTEN 0 128 0.0.0.0:22 0.0.0.0:*\nLISTEN 0 128 [::1]:631 [::]:*" });
    expect(exposed.code).toBe(0);
    expect(exposed.out).toContain("servizi in ascolto fuori dal loopback: 0.0.0.0:22 —");
  });

  it("fails on missing tools, little disk or little memory", () => {
    // A PATH holding only the basic tools the script itself uses, and no openssl.
    const bare = mkdtempSync(join(tmpdir(), "preflight-bare-"));
    for (const tool of ["awk", "grep", "sort", "sed", "head", "tr", "df"]) {
      const real = spawnSync("bash", ["-c", `command -v ${tool}`], { encoding: "utf8" }).stdout.trim();
      symlinkSync(real, join(bare, tool));
    }
    const noTool = spawnSync(BASH, [SCRIPT, "04"], { encoding: "utf8", env: { ...HEALTHY, HOME: process.env.HOME, PATH: bare } });
    rmSync(bare, { recursive: true, force: true });
    expect(noTool.status).toBe(1);
    expect(noTool.stdout).toContain("[ERRORE ] manca il comando openssl");
    expect(run("03", { PREFLIGHT_DISK_KB: "1000" }).out).toContain("meno di 2 GB liberi");
    expect(run("03", { PREFLIGHT_MEM_KB: "1000" }).out).toContain("meno di 1 GB di memoria");
  });

  it("speaks English on request and rejects an unknown lab", () => {
    expect(run("03", {}, ["--en"]).out).toContain("Result: ready (warnings: 0).");
    const unknown = run("99");
    expect(unknown.code).toBe(2);
    expect(unknown.out).toContain("Uso: bash labs/preflight.sh NN");
  });

  it("only reads local state: no network client is ever invoked", () => {
    const code = source.split("\n").filter((line) => !line.trimStart().startsWith("#"));
    const invoked = code.filter((line) => /\b(curl|wget|ping|nc)\s+-/.test(line));
    expect(invoked).toEqual([]);
  });
});
