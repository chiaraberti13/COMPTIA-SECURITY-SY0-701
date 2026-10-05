/** Local, single-owner on-demand lab sessions. Never loaded by the web server. */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { realpathSync } from "node:fs";
import { userInfo } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const SUPPORTED_LABS = ["03", "04", "05", "06", "10", "11"] as const;
export type LabNumber = typeof SUPPORTED_LABS[number];
export const SESSION_LIMITS = { seconds: 3600, maxSeconds: 7200, memory: "512m", cpus: "0.5", pids: 256, slots: 6 } as const;
const LABEL = "org.comptia-sy0701.session";
const OWNER = `${LABEL}.owner`;
const LAB = `${LABEL}.lab`;
const EXPIRES = `${LABEL}.expires`;
const TTL = `${LABEL}.ttl`;
const root = realpathSync(fileURLToPath(new URL("../", import.meta.url)));

export function labNumber(value: string): LabNumber {
  if (!SUPPORTED_LABS.includes(value as LabNumber)) throw new Error("unsupported-lab");
  return value as LabNumber;
}
export function durationSeconds(value: string): number {
  if (!/^\d+$/.test(value)) throw new Error("invalid-duration");
  const minutes = Number(value);
  if (minutes < 1 || minutes > 120) throw new Error("invalid-duration");
  return minutes * 60;
}
export interface SessionScope { labs: string; owner: string }
export function sessionScope(repoRoot = root, identity = String(process.getuid?.() ?? userInfo().username)): SessionScope {
  const labs = join(realpathSync(repoRoot), "labs");
  // Docker's --mount CSV syntax cannot safely represent a comma in the source.
  if (labs.includes(",")) throw new Error("invalid-path");
  return { labs, owner: createHash("sha256").update(`${labs}\0${identity}`).digest("hex").slice(0, 16) };
}
export function sessionName(scope: SessionScope, lab: LabNumber): string {
  return `comptia-session-${scope.owner}-${labNumber(lab)}`;
}
export function sessionRunArgs(scope: SessionScope, lab: LabNumber, image: string, seconds: number, now: number): string[] {
  labNumber(lab);
  if (!/^sha256:[a-f0-9]{64}$/.test(image)) throw new Error("invalid-image");
  if (!Number.isInteger(seconds) || seconds < 1 || seconds > SESSION_LIMITS.maxSeconds) throw new Error("invalid-duration");
  return ["run", "--detach", "--rm", "--init", "--pull", "never", "--name", sessionName(scope, lab),
    "--label", `${LABEL}=1`, "--label", `${OWNER}=${scope.owner}`, "--label", `${LAB}=${lab}`,
    "--label", `${TTL}=${seconds}`, "--label", `${EXPIRES}=${now + seconds * 1000}`,
    "--network", "none", "--cap-drop", "ALL", "--security-opt", "no-new-privileges",
    "--read-only", "--user", "10001:10001", "--cpus", SESSION_LIMITS.cpus,
    "--memory", SESSION_LIMITS.memory, "--memory-swap", SESSION_LIMITS.memory, "--pids-limit", String(SESSION_LIMITS.pids),
    "--tmpfs", "/tmp:rw,nosuid,nodev,noexec,size=64m",
    "--tmpfs", "/home/lab:rw,nosuid,nodev,size=2g,uid=10001,gid=10001,mode=0700",
    "--shm-size", "16m", "--log-driver", "local", "--log-opt", "max-size=1m", "--log-opt", "max-file=1",
    "--mount", `type=bind,source=${scope.labs},target=/repo/labs,readonly`,
    "--workdir", "/repo", "--entrypoint", "/usr/bin/sleep", image, String(seconds)];
}

export type DockerRunner = (args: string[], interactive?: boolean) => Promise<string>;
export const docker: DockerRunner = (args, interactive = false) => new Promise((done, fail) => {
  const child = spawn("docker", args, { stdio: interactive ? "inherit" : ["ignore", "pipe", "pipe"], shell: false });
  let out = "";
  let err = "";
  child.stdout?.on("data", chunk => { out += chunk; });
  child.stderr?.on("data", chunk => { err += chunk; });
  child.on("error", error => fail(new Error(error.message)));
  child.on("close", code => code === 0 ? done(out.trim()) : fail(new Error(`Docker (${code}): ${err.trim()}`)));
});

interface Container {
  Id: string; Image: string;
  Config: { Labels: Record<string, string> };
  State: { Running: boolean; Paused: boolean };
}
export interface SessionStatus { lab: LabNumber; name: string; running: boolean; paused: boolean; expiresAt: string; secondsLeft: number; image: string }
export class LabSessions {
  constructor(readonly scope = sessionScope(), private run: DockerRunner = docker, private now = Date.now) {}
  async localDaemon() {
    const host = process.env.DOCKER_HOST;
    if (host && !/^(unix:\/\/|npipe:\/\/)/.test(host)) throw new Error("local-docker-only");
    const endpoint: unknown = JSON.parse(await this.run(["context", "inspect", "--format", "{{json .Endpoints.docker.Host}}"]));
    if (typeof endpoint !== "string" || !/^(unix:\/\/|npipe:\/\/)/.test(endpoint)) throw new Error("local-docker-only");
  }
  private async inspect(lab: LabNumber): Promise<Container> {
    const [container] = JSON.parse(await this.run(["inspect", sessionName(this.scope, lab)])) as Container[];
    const labels = container?.Config?.Labels;
    if (!container || !labels || labels[LABEL] !== "1" || labels[OWNER] !== this.scope.owner || labels[LAB] !== lab) throw new Error("foreign-session");
    if (!/^\d+$/.test(labels[TTL]) || Number(labels[TTL]) < 1 || Number(labels[TTL]) > SESSION_LIMITS.maxSeconds || !/^\d+$/.test(labels[EXPIRES]) || !Number.isSafeInteger(Number(labels[EXPIRES]))) throw new Error("invalid-session");
    return container;
  }
  private describe(lab: LabNumber, container: Container): SessionStatus {
    const expires = Number(container.Config.Labels[EXPIRES]);
    return { lab, name: sessionName(this.scope, lab), running: container.State.Running, paused: container.State.Paused,
      expiresAt: new Date(expires).toISOString(), secondsLeft: Math.max(0, Math.ceil((expires - this.now()) / 1000)), image: container.Image };
  }
  async start(lab: LabNumber, seconds: number = SESSION_LIMITS.seconds, image?: string) {
    labNumber(lab);
    const imageId = image ?? JSON.parse(await this.run(["image", "inspect", "comptia-labs", "--format", "{{json .Id}}"]));
    // Docker reserves the deterministic slot atomically: concurrent starts cannot exceed six slots per scope.
    await this.run(sessionRunArgs(this.scope, lab, imageId, seconds, this.now()));
    return this.describe(lab, await this.inspect(lab));
  }
  async list(): Promise<SessionStatus[]> {
    const names = (await this.run(["ps", "--all", "--filter", `label=${LABEL}=1`, "--filter", `label=${OWNER}=${this.scope.owner}`, "--format", "{{.Names}}"])).split("\n").filter(Boolean);
    const sessions: SessionStatus[] = [];
    for (const lab of SUPPORTED_LABS) {
      if (names.includes(sessionName(this.scope, lab))) {
        // A session can expire between listing and inspecting. Re-list to distinguish expiry from an inspection error.
        try { sessions.push(this.describe(lab, await this.inspect(lab))); }
        catch (error) {
          const stillThere = await this.run(["ps", "--all", "--filter", `name=^/${sessionName(this.scope, lab)}$`, "--format", "{{.Names}}"]);
          if (stillThere) throw error;
        }
      }
    }
    return sessions;
  }
  async exec(lab: LabNumber, command: string[], interactive = false) {
    const container = await this.inspect(lab);
    if (!container.State.Running || container.State.Paused || Number(container.Config.Labels[EXPIRES]) <= this.now()) throw new Error("session-expired");
    // Pass the immutable id after ownership checks: a replaced name must never redirect an exec.
    return this.run(["exec", ...(interactive ? ["--interactive", ...(process.stdin.isTTY && process.stdout.isTTY ? ["--tty"] : [])] : []),
      "--user", "10001:10001", "--workdir", "/repo", container.Id, ...command], interactive);
  }
  async stop(lab: LabNumber) {
    const container = await this.inspect(lab);
    await this.run(["rm", "--force", container.Id]);
  }
  async reset(lab: LabNumber) {
    const container = await this.inspect(lab);
    const seconds = Number(container.Config.Labels[TTL]);
    // Validate the replacement before deleting the owned session; preserve the exact image, not a moving tag.
    sessionRunArgs(this.scope, lab, container.Image, seconds, this.now());
    await this.run(["rm", "--force", container.Id]);
    return this.start(lab, seconds, container.Image);
  }
  async clean() {
    const removed: LabNumber[] = [];
    for (const session of await this.list()) {
      if (!session.running || session.secondsLeft === 0) { await this.stop(session.lab); removed.push(session.lab); }
    }
    return removed;
  }
}

const messages = {
  it: {
    help: "Lab su richiesta: npm run lab:session -- [--lang it|en] start NN [--minutes 1..120] | status | shell NN | exec NN comando... | reset NN | stop NN | clean\nNN: 03 04 05 06 10 11. Default: 60 minuti. 6 sessioni per utente/checkout; ciascuna 0,5 CPU, 512 MiB RAM senza swap, 256 processi. Nessun servizio cloud o costo di sessione; strumenti/host restano a carico tuo. Shell/exec mantengono la sessione fino a stop o scadenza. I dati di lavoro spariscono a stop, reset e scadenza.",
    "unsupported-lab": "Laboratorio non supportato. Usa 03, 04, 05, 06, 10 o 11; gli altri richiedono app o VM.",
    "invalid-duration": "Durata non valida: scegli da 1 a 120 minuti.",
    "local-docker-only": "Serve un Docker locale (unix/npipe). I daemon remoti non sono supportati.",
    "foreign-session": "Il container non appartiene a queste sessioni: operazione rifiutata.",
    "session-expired": "Sessione scaduta, sospesa o ferma: controlla status e avvia una nuova sessione.",
    "invalid-path": "Il percorso del repository non può contenere virgole.",
    "invalid-image": "Immagine non valida. Costruisci comptia-labs seguendo la documentazione.",
    "invalid-session": "Metadati della sessione non validi: operazione rifiutata.",
  },
  en: {
    help: "On-demand labs: npm run lab:session -- [--lang it|en] start NN [--minutes 1..120] | status | shell NN | exec NN command... | reset NN | stop NN | clean\nNN: 03 04 05 06 10 11. Default: 60 minutes. 6 sessions per user/checkout; each 0.5 CPU, 512 MiB RAM with no swap, 256 processes. No cloud service or session fee; you provide the tools/host. Shell/exec keep the session until stop or expiry. Work data disappears on stop, reset and expiry.",
    "unsupported-lab": "Unsupported lab. Use 03, 04, 05, 06, 10 or 11; other labs require the app or a VM.",
    "invalid-duration": "Invalid duration: choose from 1 to 120 minutes.",
    "local-docker-only": "Local Docker (unix/npipe) required. Remote daemons are not supported.",
    "foreign-session": "This container does not belong to these sessions: operation refused.",
    "session-expired": "Session expired, paused or stopped: check status and start a new session.",
    "invalid-path": "The repository path cannot contain commas.",
    "invalid-image": "Invalid image. Build comptia-labs as documented.",
    "invalid-session": "Invalid session metadata: operation refused.",
  },
};

export function parseSessionCommand(args: string[]) {
  const argv = [...args];
  let lang: "it" | "en" = "it";
  if (argv[0] === "--lang") {
    argv.shift();
    const value = argv.shift();
    if (value !== "it" && value !== "en") throw new Error("usage");
    lang = value;
  }
  const requested = argv.shift() ?? "help";
  const action = requested === "--help" ? "help" : requested;
  if (["help", "status", "clean"].includes(action)) {
    if (argv.length) throw new Error("usage");
    return { action, lang, lab: undefined, seconds: SESSION_LIMITS.seconds, command: [] };
  }
  if (!["start", "shell", "exec", "reset", "stop"].includes(action)) throw new Error("usage");
  const lab = labNumber(argv.shift() ?? "");
  let seconds: number = SESSION_LIMITS.seconds;
  if (action === "start" && argv.length) {
    if (argv.shift() !== "--minutes") throw new Error("usage");
    seconds = durationSeconds(argv.shift() ?? "");
  }
  if (action === "exec") {
    if (argv[0] === "--") argv.shift();
    if (!argv.length || argv[0].startsWith("-")) throw new Error("usage");
  } else if (argv.length) throw new Error("usage");
  return { action, lang, lab, seconds, command: argv };
}
export async function main(args: string[]) {
  let lang: "it" | "en" = args[0] === "--lang" && args[1] === "en" ? "en" : "it";
  try {
    const input = parseSessionCommand(args);
    lang = input.lang;
    if (input.action === "help") { console.log(messages[lang].help); return; }
    const sessions = new LabSessions();
    await sessions.localDaemon();
    let result: unknown;
    switch (input.action) {
      case "start": result = await sessions.start(input.lab!, input.seconds); break;
      case "status": result = await sessions.list(); break;
      case "shell": await sessions.exec(input.lab!, ["bash"], true); return;
      case "exec": await sessions.exec(input.lab!, input.command, true); return;
      case "reset": result = await sessions.reset(input.lab!); break;
      case "stop": await sessions.stop(input.lab!); result = { stopped: input.lab }; break;
      case "clean": result = { removed: await sessions.clean() }; break;
    }
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    const key = error instanceof Error ? error.message : String(error);
    console.error(messages[lang][key as keyof typeof messages.it] ?? (key === "usage" ? messages[lang].help : key));
    process.exitCode = 1;
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main(process.argv.slice(2));
