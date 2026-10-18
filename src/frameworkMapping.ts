/**
 * Complementary framework mapping for every SY0-701 objective: NIST CSF 2.0
 * functions, CIS Controls v8 and MITRE ATT&CK tactics. It never replaces the
 * CompTIA objectives; it only shows where the same concept lives in the
 * frameworks used in real security work. The mapping is approximate by nature
 * (one objective often spans several controls), so it points at the closest fit.
 */

export const CSF_FUNCTIONS = {
  GV: "Govern",
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
} as const;
export type CsfFunction = keyof typeof CSF_FUNCTIONS;

export const CIS_CONTROLS: Record<number, string> = {
  1: "Inventory and Control of Enterprise Assets",
  2: "Inventory and Control of Software Assets",
  3: "Data Protection",
  4: "Secure Configuration of Enterprise Assets and Software",
  5: "Account Management",
  6: "Access Control Management",
  7: "Continuous Vulnerability Management",
  8: "Audit Log Management",
  9: "Email and Web Browser Protections",
  10: "Malware Defenses",
  11: "Data Recovery",
  12: "Network Infrastructure Management",
  13: "Network Monitoring and Defense",
  14: "Security Awareness and Skills Training",
  15: "Service Provider Management",
  16: "Application Software Security",
  17: "Incident Response Management",
  18: "Penetration Testing",
};

export const ATTACK_TACTICS = [
  "Reconnaissance",
  "Resource Development",
  "Initial Access",
  "Execution",
  "Persistence",
  "Privilege Escalation",
  "Defense Evasion",
  "Credential Access",
  "Discovery",
  "Lateral Movement",
  "Collection",
  "Command and Control",
  "Exfiltration",
  "Impact",
] as const;
export type AttackTactic = (typeof ATTACK_TACTICS)[number];

export interface FrameworkMapping {
  csf: readonly CsfFunction[];
  /** CIS Controls v8 control numbers (empty where no control fits). */
  cis: readonly number[];
  /** ATT&CK tactics the objective helps to counter (empty for governance topics). */
  attack: readonly AttackTactic[];
}

export const FRAMEWORK_MAPPING: Record<string, FrameworkMapping> = {
  "1.1": { csf: ["GV", "PR"], cis: [3, 4], attack: [] },
  "1.2": { csf: ["PR"], cis: [5, 6, 12], attack: ["Lateral Movement"] },
  "1.3": { csf: ["PR", "DE"], cis: [4, 13], attack: ["Initial Access"] },
  "1.4": { csf: ["PR"], cis: [3], attack: ["Credential Access", "Collection"] },
  "2.1": { csf: ["ID"], cis: [], attack: ["Reconnaissance", "Resource Development", "Initial Access"] },
  "2.2": { csf: ["ID"], cis: [9, 15], attack: ["Initial Access", "Resource Development"] },
  "2.3": { csf: ["ID"], cis: [7, 16], attack: ["Initial Access", "Execution"] },
  "2.4": { csf: ["DE"], cis: [8, 10, 13], attack: ["Execution", "Persistence", "Credential Access", "Impact"] },
  "2.5": { csf: ["PR"], cis: [4, 5, 6, 12], attack: ["Privilege Escalation", "Lateral Movement"] },
  "3.1": { csf: ["PR"], cis: [4, 12], attack: [] },
  "3.2": { csf: ["PR"], cis: [4, 12, 13], attack: ["Lateral Movement", "Command and Control"] },
  "3.3": { csf: ["PR"], cis: [3], attack: ["Collection", "Exfiltration"] },
  "3.4": { csf: ["PR", "RC"], cis: [11], attack: ["Impact"] },
  "4.1": { csf: ["PR"], cis: [1, 2, 4], attack: [] },
  "4.2": { csf: ["ID", "PR"], cis: [1, 2, 3], attack: [] },
  "4.3": { csf: ["ID"], cis: [7], attack: ["Initial Access"] },
  "4.4": { csf: ["DE"], cis: [8, 13], attack: [] },
  "4.5": { csf: ["PR", "DE"], cis: [9, 10, 12, 13], attack: ["Initial Access", "Command and Control"] },
  "4.6": { csf: ["PR"], cis: [5, 6], attack: ["Credential Access", "Privilege Escalation"] },
  "4.7": { csf: ["PR", "RS"], cis: [4, 7], attack: [] },
  "4.8": { csf: ["RS", "RC"], cis: [17], attack: [] },
  "4.9": { csf: ["DE", "RS"], cis: [8, 13], attack: [] },
  "5.1": { csf: ["GV"], cis: [], attack: [] },
  "5.2": { csf: ["GV", "ID"], cis: [], attack: [] },
  "5.3": { csf: ["GV"], cis: [15], attack: ["Initial Access"] },
  "5.4": { csf: ["GV"], cis: [3], attack: [] },
  "5.5": { csf: ["GV", "ID"], cis: [7, 18], attack: [] },
  "5.6": { csf: ["GV", "PR"], cis: [14], attack: ["Initial Access"] },
};
