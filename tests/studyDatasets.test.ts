import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { generateStudyDataset, studyDataset } from "../scripts/generate-study-datasets";

const root = "datasets/auth-dns";
const read = (name: string) => readFileSync(path.join(root, name));
const events = read("events.jsonl").toString().trim().split("\n").map(x => JSON.parse(x));
describe("synthetic study evidence", () => {
  it("reproduces every artifact and manifest byte for byte and verifies hashes", () => {
    const temporary = mkdtempSync(path.join(tmpdir(), "study-evidence-"));
    try {
      generateStudyDataset(temporary);
      for (const name of readdirSync(temporary)) expect(readFileSync(path.join(temporary, name))).toEqual(read(name));
      const manifest = JSON.parse(read("manifest.json").toString());
      expect(manifest.synthetic).toBe(true);
      expect(manifest.license).toBe("GPL-3.0");
      expect(manifest.objectives).toEqual(["2.4", "4.4", "4.8", "4.9"]);
      expect(manifest.files.map((x: { name: string }) => x.name).sort()).toEqual(Object.keys(studyDataset()).sort());
      for (const file of manifest.files) {
        expect(read(file.name).length).toBe(file.bytes);
        expect(createHash("sha256").update(read(file.name)).digest("hex")).toBe(file.sha256);
      }
      const license = readFileSync("datasets/LICENSE", "utf8");
      expect(license).toContain("GNU GENERAL PUBLIC LICENSE");
      expect(license).toContain("Version 3, 29 June 2007");
    } finally { rmSync(temporary, { recursive: true, force: true }); }
  });

  it("uses only reserved addresses/domains and explicitly non-operational IOCs", () => {
    const text = Object.entries(studyDataset()).filter(([name]) => name !== "traffic.pcap").map(([, data]) => data.toString()).join("\n");
    expect(text.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g)?.every(ip => /^192\.0\.2\.(10|53)$/.test(ip))).toBe(true);
    expect(events.filter(e => e.query).every(e => e.query === "updates.training.invalid")).toBe(true);
    const iocs = JSON.parse(read("iocs.json").toString());
    expect(iocs.synthetic).toBe(true); expect(iocs.operationalUse).toBe(false);
    for (const indicator of iocs.indicators) expect(text).toContain(indicator.value);
    expect(text).not.toMatch(/password"|token"|secret"|@/);
  });

  it("correlates alerts and timeline with original events and worked answers", () => {
    expect(new Set(events.map(e => e.id)).size).toBe(7);
    const alerts = read("alerts.jsonl").toString().trim().split("\n").map(x => JSON.parse(x));
    for (const alert of alerts) {
      expect(alert.hypothesis.it).toBeTruthy(); expect(alert.hypothesis.en).toBeTruthy();
      for (const id of alert.evidence) expect(events.some(e => e.id === id)).toBe(true);
    }
    expect(read("timeline.csv").toString().trim().split("\n").slice(1)).toEqual(events.map(e => `${e.timestamp},${e.id},${e.source}`));
    expect(events.filter(e => e.outcome === "failure")).toHaveLength(3);
    expect(events.filter(e => e.outcome === "success")).toHaveLength(1);
    const guide = read("README.md").toString();
    for (const phrase of ["60 secondi", "60-second", "non dimostra brute force", "does not prove brute force", "ripristino", "cleanup"]) expect(guide).toContain(phrase);
  });

  it("decodes complete PCAP IPv4/UDP/DNS packets with correct checksum and log timestamps", () => {
    const pcap = read("traffic.pcap");
    expect(pcap.readUInt32LE(0)).toBe(0xa1b2c3d4);
    expect(pcap.readUInt16LE(4)).toBe(2); expect(pcap.readUInt16LE(6)).toBe(4);
    expect(pcap.readUInt32LE(20)).toBe(101);
    let offset = 24; let count = 0;
    const dnsEvents = events.filter(e => e.source === "dns");
    while (offset < pcap.length) {
      const time = pcap.readUInt32LE(offset); const length = pcap.readUInt32LE(offset + 8);
      expect(pcap.readUInt32LE(offset + 12)).toBe(length);
      const packet = pcap.subarray(offset + 16, offset + 16 + length);
      expect(packet.length).toBe(length); expect(packet[0]).toBe(0x45); expect(packet[9]).toBe(17);
      expect(packet.readUInt16BE(2)).toBe(length);
      expect([...packet.subarray(12, 16)].join(".")).toBe(dnsEvents[count].src);
      expect([...packet.subarray(16, 20)].join(".")).toBe(dnsEvents[count].dst);
      let sum = 0; for (let i = 0; i < 20; i += 2) sum += packet.readUInt16BE(i);
      while (sum >>> 16) sum = (sum & 65535) + (sum >>> 16);
      expect(sum).toBe(65535);
      expect(packet.readUInt16BE(22)).toBe(53); expect(packet.readUInt16BE(24)).toBe(length - 20);
      expect(packet.readUInt16BE(30)).toBe(0x0100); expect(packet.readUInt16BE(32)).toBe(1);
      let cursor = 40; const labels: string[] = [];
      while (packet[cursor]) { const size = packet[cursor++]; labels.push(packet.subarray(cursor, cursor + size).toString()); cursor += size; }
      cursor++;
      expect(labels.join(".")).toBe(dnsEvents[count].query);
      expect(packet.readUInt16BE(cursor)).toBe(1); expect(packet.readUInt16BE(cursor + 2)).toBe(1);
      expect(cursor + 4).toBe(length);
      expect(time * 1000).toBe(Date.parse(dnsEvents[count].timestamp));
      if (count) expect(time * 1000 - Date.parse(dnsEvents[count - 1].timestamp)).toBe(60000);
      count++; offset += 16 + length;
    }
    expect(count).toBe(3); expect(offset).toBe(pcap.length);
  });
});
