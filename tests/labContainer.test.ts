import { spawnSync } from "node:child_process";
import { chmodSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";

/*
 * labs/container (ROADMAP: "Lab containerizzati riproducibili"). The image and
 * the launcher are checked statically, and run.sh is executed with a stand-in
 * engine that prints its arguments, so the test needs no Docker. The CI job
 * "labs-container" builds the real image and runs the labs inside it.
 */

const DOCKERFILE = readFileSync("labs/container/Dockerfile", "utf8");
const RUN = "labs/container/run.sh";
const PREFLIGHT = readFileSync("labs/preflight.sh", "utf8");

// Tools the Ubuntu base image already ships (coreutils, grep, mawk, tar).
const BASE_TOOLS = ["grep", "awk", "sort", "uniq", "sha256sum", "tar"];
const packages = [...DOCKERFILE.matchAll(/^\s+([a-z0-9.+-]+)=(\S+?)\s*\\?$/gm)].map((m) => ({ name: m[1], version: m[2] }));
const supported = readFileSync(RUN, "utf8").match(/^supported="([0-9 ]+)"$/m)![1].split(" ");
const labDirs = readdirSync("labs", { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d{2}-/.test(d.name)).map((d) => d.name);

const engineDir = mkdtempSync(join(tmpdir(), "lab-engine-"));
const engine = join(engineDir, "engine");
writeFileSync(engine, '#!/bin/sh\nprintf "%s\\n" "$@"\n');
chmodSync(engine, 0o755);
afterAll(() => rmSync(engineDir, { recursive: true, force: true }));

function run(...args: string[]) {
  const result = spawnSync("bash", [RUN, ...args], { encoding: "utf8", env: { ...process.env, LAB_ENGINE: engine } });
  return { code: result.status, out: result.stdout, err: result.stderr };
}

describe("labs/container/Dockerfile", () => {
  it("pins the base image by digest to a dated tag", () => {
    const from = DOCKERFILE.match(/^FROM (\S+)$/gm)!;
    expect(from).toHaveLength(1);
    expect(from[0]).toMatch(/^FROM ubuntu:noble-\d{8}@sha256:[0-9a-f]{64}$/);
  });

  it("installs only exact package versions, without recommends, and drops the apt lists", () => {
    const install = DOCKERFILE.match(/apt-get install([^&]*)/)![1];
    const named = install.split(/\s+/).filter((w) => w && w !== "\\" && !w.startsWith("-"));
    expect(named.length).toBeGreaterThan(0);
    for (const word of named) expect(word, word).toMatch(/^[a-z0-9.+-]+=\S+$/);
    expect(install).toContain("--no-install-recommends");
    expect(DOCKERFILE).toContain("rm -rf /var/lib/apt/lists/*");
  });

  it("runs as an unprivileged numeric user", () => {
    const user = DOCKERFILE.match(/^USER (\d+):(\d+)$/m)!;
    expect(Number(user[1])).toBeGreaterThanOrEqual(1000);
    expect(Number(user[2])).toBeGreaterThanOrEqual(1000);
    expect(DOCKERFILE).not.toMatch(/^COPY|^ADD/m);
  });

  it("ships every tool the supported labs ask the preflight for", () => {
    const provided = new Set([...BASE_TOOLS, ...packages.map((p) => p.name)]);
    for (const nn of supported) {
      const cmds = PREFLIGHT.match(new RegExp(`^  ${nn}\\) risk=\\w+;\\s+cmds="([^"]*)"`, "m"))![1].split(" ");
      for (const cmd of cmds) expect(provided.has(cmd), `lab ${nn}: ${cmd}`).toBe(true);
    }
  });
});

describe("labs/container/run.sh", () => {
  it("offers only existing labs at risk level low", () => {
    for (const nn of supported) {
      const lab = labDirs.find((d) => d.startsWith(`${nn}-`));
      expect(lab, nn).toBeDefined();
      expect(readFileSync(join("labs", lab!, "README.md"), "utf8"), nn).toContain("| Rischio | `low` |");
    }
  });

  it("refuses the other labs and points to the virtual machine", () => {
    for (const nn of ["01", "07", "09", "99", ""]) {
      const { code, out, err } = run(nn);
      expect(code, nn).toBe(2);
      expect(out).toBe("");
      expect(err).toContain("richiedono una VM");
    }
  });

  it("starts a throwaway, offline, unprivileged, read-only container", () => {
    const { code, out } = run("11", "jq", "--version");
    expect(code).toBe(0);
    const args = out.trim().split("\n");
    const pairs = args.slice(0, -2).join(" ");
    expect(args[0]).toBe("run");
    for (const flag of ["--rm", "--network none", "--cap-drop ALL", "--security-opt no-new-privileges", "--read-only",
      "--user 10001:10001", "--pids-limit 256", "--memory 512m", "--name comptia-lab11"]) {
      expect(pairs, flag).toContain(flag);
    }
    expect(pairs).toMatch(/--tmpfs \/home\/lab:rw,nosuid,nodev,size=2g,uid=10001,gid=10001,mode=0700/);
    expect(pairs).toMatch(/--mount type=bind,source=\S+\/labs,target=\/repo\/labs,readonly/);
    expect(pairs).not.toMatch(/--privileged|--cap-add|--publish|-p |docker\.sock|--network host/);
    expect(args.slice(-3)).toEqual(["comptia-labs", "jq", "--version"]);
  });

  it("opens a shell when no command is given", () => {
    expect(run("03").out.trim().split("\n").slice(-2)).toEqual(["comptia-labs", "bash"]);
  });
});
