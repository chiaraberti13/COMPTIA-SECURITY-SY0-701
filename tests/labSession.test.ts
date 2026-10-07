import { describe, expect, it, vi, afterEach } from "vitest";
import { LabSessions, durationSeconds, labNumber, main, parseSessionCommand, sessionName, sessionRunArgs, sessionScope, type DockerRunner } from "../scripts/lab-session";

const scope = sessionScope(process.cwd(), "unit-test");
const image = `sha256:${"a".repeat(64)}`;
const label = "org.comptia-sy0701.session";
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); process.exitCode = 0; });

function engine() {
  let now = 1_800_000_000_000;
  let serial = 0;
  let beforeInspect = () => {};
  const containers = new Map<string, { Id: string; Image: string; Config: { Labels: Record<string, string> }; State: { Running: boolean; Paused: boolean } }>();
  const calls: string[][] = [];
  const run: DockerRunner = async args => {
    calls.push([...args]);
    if (args[0] === "context") return JSON.stringify("unix:///var/run/docker.sock");
    if (args[0] === "image") return JSON.stringify(image);
    if (args[0] === "run") {
      const name = args[args.indexOf("--name") + 1];
      if (containers.has(name)) throw new Error("name already in use");
      const labels: Record<string, string> = {};
      args.forEach((arg, i) => { if (arg === "--label") { const [key, value] = args[i + 1].split("="); labels[key] = value; } });
      containers.set(name, { Id: `container-${++serial}`, Image: args.at(-2)!, Config: { Labels: labels }, State: { Running: true, Paused: false } });
      return `container-${serial}`;
    }
    if (args[0] === "inspect") {
      beforeInspect();
      const container = containers.get(args[1]);
      if (!container) throw new Error("No such container");
      return JSON.stringify([container]);
    }
    if (args[0] === "ps") return [...containers.keys()].join("\n");
    if (args[0] === "rm") {
      const entry = [...containers].find(([, c]) => c.Id === args.at(-1));
      if (!entry) throw new Error("No such container");
      containers.delete(entry[0]);
      return args.at(-1)!;
    }
    if (args[0] === "exec") return "command output";
    throw new Error(`unhandled ${args}`);
  };
  return { manager: new LabSessions(scope, run, () => now), containers, calls, onInspect: (callback: () => void) => { beforeInspect = callback; }, advance: (ms: number) => { now += ms; } };
}

describe("on-demand session inputs and boundaries", () => {
  it.each(["03", "04", "05", "06", "10", "11"])("accepts file-based lab %s", n => expect(labNumber(n)).toBe(n));
  it.each(["", "01", "02", "07", "08", "09", "--privileged", "03;id", "3"])("rejects lab %s", n => expect(() => labNumber(n)).toThrow("unsupported-lab"));
  it.each(["0", "121", "-1", "1.5", "NaN", "Infinity", "2;id"])("rejects duration %s", n => expect(() => durationSeconds(n)).toThrow("invalid-duration"));
  it("accepts the exact duration boundaries and bilingual CLI", () => {
    expect(durationSeconds("1")).toBe(60);
    expect(durationSeconds("120")).toBe(7200);
    expect(parseSessionCommand(["--lang", "en", "start", "03", "--minutes", "45"])).toMatchObject({ lang: "en", lab: "03", seconds: 2700 });
    expect(parseSessionCommand(["exec", "03", "bash", "-c", "echo '$HOME; $(id)'"])).toMatchObject({ command: ["bash", "-c", "echo '$HOME; $(id)'"] });
    expect(parseSessionCommand(["status"])).toMatchObject({ action: "status", lab: undefined });
  });
  it.each([["--lang", "fr", "status"], ["start", "03", "--privileged"], ["stop", "03", "other"], ["exec", "03"], ["exec", "03", "--privileged"], ["status", "03"], ["start", "03", "--minutes", "60", "extra"]].map(args => ({ args })))("rejects ambiguous CLI arguments $args", ({ args }) => {
    expect(() => parseSessionCommand(args)).toThrow();
  });
  it("separates users/checkouts and produces a deterministic reservation per lab", () => {
    expect(scope.owner).toMatch(/^[a-f0-9]{16}$/);
    expect(scope.owner).not.toBe(sessionScope(process.cwd(), "other-user").owner);
    expect(sessionName(scope, "03")).not.toBe(sessionName(scope, "04"));
    expect(sessionName(scope, "03")).toBe(sessionName(scope, "03"));
  });
  it("builds bounded, non-root, offline, read-only sessions with an independent lifetime process", () => {
    const args = sessionRunArgs(scope, "03", image, 60, 1000);
    for (const [flag, value] of [["--network", "none"], ["--cap-drop", "ALL"], ["--security-opt", "no-new-privileges"], ["--user", "10001:10001"], ["--memory", "512m"], ["--memory-swap", "512m"], ["--cpus", "0.5"], ["--pids-limit", "256"], ["--entrypoint", "/usr/bin/sleep"], ["--pull", "never"]]) {
      expect(args[args.indexOf(flag) + 1]).toBe(value);
    }
    // The local driver rejects its default compression with a single log file.
    const logOptions = args.flatMap((arg, i) => arg === "--log-opt" ? [args[i + 1]] : []);
    expect(logOptions).toEqual(["max-size=1m", "max-file=1", "compress=false"]);
    expect(args).toContain("--rm"); expect(args).toContain("--init"); expect(args).toContain("--read-only");
    expect(args).toContain(`${label}.expires=61000`);
    expect(args).toContain(`type=bind,source=${scope.labs},target=/repo/labs,readonly`);
    expect(args.slice(-2)).toEqual([image, "60"]);
    for (const forbidden of ["--privileged", "--publish", "--device", "--volume", "--restart", "/var/run/docker.sock"]) expect(args).not.toContain(forbidden);
    expect(() => sessionRunArgs(scope, "03", "ubuntu:latest", 60, 0)).toThrow("invalid-image");
    expect(() => sessionRunArgs(scope, "03", image, 7201, 0)).toThrow("invalid-duration");
  });
});

describe("CLI language parity", () => {
  it("renders help in IT/EN without Docker and rejects unsupported labs in both languages", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    await main(["--help"]);
    expect(log.mock.calls[0][0]).toContain("Lab su richiesta");
    await main(["--lang", "en", "help"]);
    expect(log.mock.calls[1][0]).toContain("On-demand labs");
    await main(["start", "08"]);
    expect(error.mock.calls[0][0]).toContain("Laboratorio non supportato");
    await main(["--lang", "en", "start", "08"]);
    expect(error.mock.calls[1][0]).toContain("Unsupported lab");
    expect(process.exitCode).toBe(1);
  });
});

describe("on-demand session lifecycle", () => {
  it("starts from an immutable image and rejects a duplicate slot without altering it", async () => {
    const e = engine();
    const status = await e.manager.start("03", 60);
    expect(status).toMatchObject({ lab: "03", running: true, secondsLeft: 60, image });
    await expect(e.manager.start("03", 60)).rejects.toThrow("name already in use");
    expect(e.containers.size).toBe(1);
    expect(await e.manager.list()).toEqual([status]);
  });
  it("resets with the exact image and duration, removes only the immutable owned id, then stops", async () => {
    const e = engine();
    await e.manager.start("03", 60);
    e.advance(30_000);
    expect((await e.manager.list())[0].secondsLeft).toBe(30);
    await e.manager.reset("03");
    expect((await e.manager.list())[0].secondsLeft).toBe(60);
    expect(e.calls.filter(a => a[0] === "image")).toHaveLength(1);
    expect(e.calls.filter(a => a[0] === "rm")[0]).toEqual(["rm", "--force", "container-1"]);
    await e.manager.stop("03");
    expect(await e.manager.list()).toEqual([]);
  });
  it("executes argv without host-shell interpolation and refuses expired or paused sessions", async () => {
    const e = engine();
    await e.manager.start("03", 60);
    expect(await e.manager.exec("03", ["echo", "$(touch /host-file); hi"])).toBe("command output");
    expect(e.calls.at(-1)).toEqual(["exec", "--user", "10001:10001", "--workdir", "/repo", "container-1", "echo", "$(touch /host-file); hi"]);
    e.containers.get(sessionName(scope, "03"))!.State.Paused = true;
    await expect(e.manager.exec("03", ["id"])).rejects.toThrow("session-expired");
    e.containers.get(sessionName(scope, "03"))!.State.Paused = false;
    e.advance(60_000);
    await expect(e.manager.exec("03", ["id"])).rejects.toThrow("session-expired");
  });
  it("cleans expired sessions only, keeping unexpired sessions", async () => {
    const e = engine();
    await e.manager.start("03", 10);
    await e.manager.start("04", 60);
    e.advance(10_000);
    expect(await e.manager.clean()).toEqual(["03"]);
    expect((await e.manager.list()).map(s => s.lab)).toEqual(["04"]);
  });
  it("does not clean a new unexpired session that replaced an expired slot after listing", async () => {
    const e = engine();
    await e.manager.start("03", 60);
    e.advance(60_000);
    let inspections = 0;
    e.onInspect(() => {
      if (++inspections === 2) {
        const replacement = e.containers.get(sessionName(scope, "03"))!;
        replacement.Id = "replacement-container";
        replacement.Config.Labels[`${label}.expires`] = String(Number(replacement.Config.Labels[`${label}.expires`]) + 60_000);
      }
    });
    expect(await e.manager.clean()).toEqual([]);
    expect(e.containers.size).toBe(1);
    expect(e.calls.filter(args => args[0] === "rm")).toHaveLength(0);
    expect((await e.manager.list())[0].secondsLeft).toBe(60);
  });

  it.each(["exec", "stop", "reset"] as const)("refuses %s on a foreign container before executing or deleting", async action => {
    const e = engine();
    await e.manager.start("03", 60);
    e.containers.get(sessionName(scope, "03"))!.Config.Labels[`${label}.owner`] = "someone-else";
    const before = e.calls.length;
    await expect(action === "exec" ? e.manager.exec("03", ["id"]) : e.manager[action]("03")).rejects.toThrow("foreign-session");
    expect(e.calls.slice(before).map(a => a[0])).toEqual(["inspect"]);
    expect(e.containers.size).toBe(1);
  });
  it("refuses a reset with invalid metadata before deleting data", async () => {
    const e = engine(); await e.manager.start("03", 60);
    e.containers.get(sessionName(scope, "03"))!.Config.Labels[`${label}.ttl`] = "9999999";
    await expect(e.manager.reset("03")).rejects.toThrow("invalid-session");
    expect(e.containers.size).toBe(1);
  });
  it("permits local Unix Docker only and refuses network/SSH daemons", async () => {
    vi.stubEnv("DOCKER_HOST", "");
    await engine().manager.localDaemon();
    vi.stubEnv("DOCKER_HOST", "tcp://localhost:2375");
    await expect(engine().manager.localDaemon()).rejects.toThrow("local-docker-only");
    vi.stubEnv("DOCKER_HOST", "");
    const remote = new LabSessions(scope, async () => JSON.stringify("ssh://remote"));
    await expect(remote.localDaemon()).rejects.toThrow("local-docker-only");
  });
});
