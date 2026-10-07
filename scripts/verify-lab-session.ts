/** Real Docker lifecycle/isolation checks. Runs in the lab-container CI job. */
import assert from "node:assert/strict";
import { LabSessions, docker, sessionScope } from "./lab-session";

// Isolated verification scope; never touches the learner's normal sessions.
const scope = sessionScope(undefined, `verification-${process.pid}-${Date.now()}`);
const sessions = new LabSessions(scope);
const started = new Set<"03" | "04">();
try {
  await sessions.localDaemon();
  const first = await sessions.start("03", 120);
  started.add("03");
  assert.match(first.image, /^sha256:[a-f0-9]{64}$/);
  await assert.rejects(() => sessions.start("03", 120));
  assert.equal((await sessions.list()).length, 1);
  const [inspect] = JSON.parse(await docker(["inspect", first.name]));
  assert.equal(inspect.HostConfig.NetworkMode, "none");
  assert.equal(inspect.HostConfig.ReadonlyRootfs, true);
  assert.equal(inspect.HostConfig.Memory, 512 * 1024 * 1024);
  assert.equal(inspect.HostConfig.MemorySwap, inspect.HostConfig.Memory);
  assert.equal(inspect.HostConfig.NanoCpus, 500_000_000);
  assert.equal(inspect.HostConfig.PidsLimit, 256);
  assert.equal(inspect.HostConfig.AutoRemove, true);
  assert.equal(inspect.HostConfig.LogConfig.Type, "local");
  assert.deepEqual(inspect.HostConfig.LogConfig.Config, { "max-size": "1m", "max-file": "1", compress: "false" });
  assert.equal(inspect.Config.User, "10001:10001");
  assert.equal(inspect.HostConfig.RestartPolicy.Name, "no");
  assert.deepEqual(inspect.HostConfig.PortBindings ?? {}, {});
  assert.equal(await sessions.exec("03", ["id", "-u"]), "10001");
  assert.equal(await sessions.exec("03", ["ls", "/sys/class/net"]), "lo");
  assert.equal(await sessions.exec("03", ["awk", "/^CapEff:/ {print $2}", "/proc/self/status"]), "0000000000000000");
  assert.equal(await sessions.exec("03", ["awk", "/^NoNewPrivs:/ {print $2}", "/proc/self/status"]), "1");
  await assert.rejects(() => sessions.exec("03", ["touch", "/repo/labs/session-write-probe"]));
  assert.match(await sessions.exec("03", ["bash", "labs/preflight.sh", "03"]), /Esito: pronto/);
  await sessions.exec("03", ["bash", "-c", "printf original > /home/lab/proof"]);
  assert.equal(await sessions.exec("03", ["cat", "/home/lab/proof"]), "original");
  const reset = await sessions.reset("03");
  assert.equal(reset.image, first.image);
  assert.notEqual((JSON.parse(await docker(["inspect", reset.name])))[0].Id, inspect.Id);
  assert.equal(await sessions.exec("03", ["bash", "-c", "test ! -e /home/lab/proof && echo clean"]), "clean");
  await sessions.stop("03");
  assert.deepEqual(await sessions.list(), []);
  started.delete("03");
  console.log("on-demand: isolation, resource limits, duplicate reservation, re-entry, reset and stop passed");

  const expiring = await sessions.start("04", 5);
  started.add("04");
  await sessions.exec("04", ["touch", "/home/lab/temporary"]);
  const until = Date.now() + 20_000;
  while ((await sessions.list()).length && Date.now() < until) await new Promise(done => setTimeout(done, 250));
  assert.deepEqual(await sessions.list(), [], "expiry must remove the container without a running CLI or external scheduler");
  assert.equal(await docker(["ps", "--all", "--filter", `name=^/${expiring.name}$`, "--format", "{{.Names}}"]), "");
  started.delete("04");
  console.log("on-demand: automatic deadline removal and temporary-data teardown passed");
} finally {
  // Only this verification's owned containers; no global docker prune/rm.
  for (const lab of started) {
    const remaining = await sessions.list();
    if (remaining.some(s => s.lab === lab)) await sessions.stop(lab);
  }
}
