/** Original synthetic evidence. No live capture, network access or random input. */
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export function studyDataset(): Record<string, Buffer> {
  const jsonl = (rows: unknown[]) => Buffer.from(rows.map(x => JSON.stringify(x)).join("\n") + "\n");
  const events = [
    { id: "E1", timestamp: "2026-10-01T09:00:00Z", source: "auth", host: "workstation-01", user: "student-01", action: "login", outcome: "failure", src: "192.0.2.10" },
    { id: "E2", timestamp: "2026-10-01T09:00:10Z", source: "auth", host: "workstation-01", user: "student-01", action: "login", outcome: "failure", src: "192.0.2.10" },
    { id: "E3", timestamp: "2026-10-01T09:00:20Z", source: "auth", host: "workstation-01", user: "student-01", action: "login", outcome: "failure", src: "192.0.2.10" },
    { id: "E4", timestamp: "2026-10-01T09:00:30Z", source: "auth", host: "workstation-01", user: "student-01", action: "login", outcome: "success", src: "192.0.2.10" },
    { id: "E5", timestamp: "2026-10-01T09:01:00Z", source: "dns", host: "workstation-01", action: "query", src: "192.0.2.10", dst: "192.0.2.53", query: "updates.training.invalid", type: "A", packet: 1 },
    { id: "E6", timestamp: "2026-10-01T09:02:00Z", source: "dns", host: "workstation-01", action: "query", src: "192.0.2.10", dst: "192.0.2.53", query: "updates.training.invalid", type: "A", packet: 2 },
    { id: "E7", timestamp: "2026-10-01T09:03:00Z", source: "dns", host: "workstation-01", action: "query", src: "192.0.2.10", dst: "192.0.2.53", query: "updates.training.invalid", type: "A", packet: 3 },
  ];
  // PCAP little endian, microseconds, LINKTYPE_RAW (101), complete IPv4/UDP/DNS queries.
  const header = Buffer.alloc(24);
  header.writeUInt32LE(0xa1b2c3d4); header.writeUInt16LE(2, 4); header.writeUInt16LE(4, 6);
  header.writeUInt32LE(65535, 16); header.writeUInt32LE(101, 20);
  const records = events.filter(e => e.source === "dns").map((e, i) => {
    const name = Buffer.concat("updates.training.invalid".split(".").map(s => Buffer.concat([Buffer.from([s.length]), Buffer.from(s)])));
    const dns = Buffer.alloc(12); dns.writeUInt16BE(i + 1); dns.writeUInt16BE(0x0100, 2); dns.writeUInt16BE(1, 4);
    const payload = Buffer.concat([dns, name, Buffer.from([0, 0, 1, 0, 1])]);
    const udp = Buffer.alloc(8); udp.writeUInt16BE(53000 + i); udp.writeUInt16BE(53, 2); udp.writeUInt16BE(8 + payload.length, 4);
    // UDP checksum 0 is permitted for IPv4; IP checksum is calculated below.
    const ip = Buffer.alloc(20); ip[0] = 0x45; ip.writeUInt16BE(28 + payload.length, 2); ip.writeUInt16BE(i + 1, 4); ip[8] = 64; ip[9] = 17;
    Buffer.from([192, 0, 2, 10, 192, 0, 2, 53]).copy(ip, 12);
    let sum = 0; for (let j = 0; j < 20; j += 2) sum += ip.readUInt16BE(j);
    while (sum >>> 16) sum = (sum & 65535) + (sum >>> 16);
    ip.writeUInt16BE((~sum) & 65535, 10);
    const packet = Buffer.concat([ip, udp, payload]); const record = Buffer.alloc(16);
    record.writeUInt32LE(Date.parse(e.timestamp) / 1000); record.writeUInt32LE(packet.length, 8); record.writeUInt32LE(packet.length, 12);
    return Buffer.concat([record, packet]);
  });
  return {
    "events.jsonl": jsonl(events),
    "traffic.pcap": Buffer.concat([header, ...records]),
    "alerts.jsonl": jsonl([
      { id: "A1", rule: "failures-followed-by-success", severity: "medium", evidence: ["E1", "E2", "E3", "E4"], hypothesis: { it: "Possibile tentativo di indovinare una password; verificare con l’utente.", en: "Possible password guessing; verify with the user." } },
      { id: "A2", rule: "periodic-dns", severity: "low", evidence: ["E5", "E6", "E7"], hypothesis: { it: "Periodicità DNS: possibile automazione lecita o beaconing, non prova di compromissione.", en: "Periodic DNS: possible legitimate automation or beaconing, not proof of compromise." } },
    ]),
    "timeline.csv": Buffer.from("timestamp,event_id,source\n" + events.map(e => `${e.timestamp},${e.id},${e.source}`).join("\n") + "\n"),
    "iocs.json": Buffer.from(JSON.stringify({ synthetic: true, operationalUse: false, indicators: [
      { type: "domain", value: "updates.training.invalid", evidence: ["E5", "E6", "E7"], confidence: "low" },
      { type: "ipv4", value: "192.0.2.10", evidence: ["E1", "E4"], confidence: "low" },
    ] }, null, 2) + "\n"),
  };
}

export function generateStudyDataset(root: string) {
  mkdirSync(root, { recursive: true });
  const files = studyDataset();
  for (const [name, data] of Object.entries(files)) writeFileSync(path.join(root, name), data);
  writeFileSync(path.join(root, "manifest.json"), JSON.stringify({
    id: "auth-dns", version: 1, synthetic: true, license: "GPL-3.0", owner: "chiaraberti13",
    reviewed: "2026-10-05", nextReview: "2027-01-05", objectives: ["2.4", "4.4", "4.8", "4.9"],
    files: Object.entries(files).map(([name, data]) => ({ name, bytes: data.length, sha256: createHash("sha256").update(data).digest("hex") })),
  }, null, 2) + "\n");
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) generateStudyDataset("datasets/auth-dns");
