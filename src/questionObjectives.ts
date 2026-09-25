/**
 * Links every exam question to the official SY0-701 objectives it trains.
 *
 * Questions carry a `topic` label; within one domain a topic maps to one or
 * more objectives. The mapping lives here instead of on each of the ~660
 * questions in src/data.ts so that it can be reviewed in one place and changed
 * without rewriting the large dataset files. Where a single question does not
 * fit its topic, an override names its objectives explicitly.
 *
 * tests/questionObjectives.test.ts keeps this map complete: every topic in the
 * dataset is mapped, every code is an official objective, no entry is stale.
 */
import type { Question } from "./types";

/** Official SY0-701 objective codes, per domain. */
export const OFFICIAL_OBJECTIVES: Record<number, readonly string[]> = {
  1: ["1.1", "1.2", "1.3", "1.4"],
  2: ["2.1", "2.2", "2.3", "2.4", "2.5"],
  3: ["3.1", "3.2", "3.3", "3.4"],
  4: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9"],
  5: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6"],
};

/** Objectives trained by each topic, per question-bank domain. */
export const TOPIC_OBJECTIVES: Record<number, Record<string, readonly string[]>> = {
  1: {
    "Security Controls": ["1.1"],
    "The CIA Triad & Non-Repudiation": ["1.2"],
    "Security Principles": ["1.2"],
    "Authentication Methods": ["1.2"],
    "Zero Trust Architecture": ["1.2"],
    "Physical Security Controls": ["1.2"],
    "Deception Technologies": ["1.2"],
    "Change Management": ["1.3"],
    "Cryptography": ["1.4"],
    "Public Key Infrastructure": ["1.4"],
    "Identity & Access Control Models": ["4.6"],
    // A lesson that teaches recognition of a threat: awareness training.
    "Social Engineering": ["5.6"],
    // SRTP for voice traffic: implementation of secure protocols.
    "Secure Network Protocols": ["4.5"],
  },
  2: {
    "Threat Actors & Motivations": ["2.1"],
    "Threat Vectors & Attack Surfaces": ["2.2"],
    "Vulnerability Types": ["2.3"],
    "Indicators of Malicious Activity": ["2.4"],
    "Mitigation Techniques & Controls": ["2.5"],
    "Deception Technologies": ["1.2"],
  },
  3: {
    "Architecture Models & Shared Responsibility": ["3.1"],
    "Virtualization, Containers & Cloud Technologies": ["3.1"],
    "ICS/OT Security": ["3.1"],
    // Physical/logical segmentation (3.1) and security zones (3.2).
    "Infrastructure Segmentations & Topologies": ["3.1", "3.2"],
    "Network Security Devices": ["3.2"],
    "Secure Network Protocols": ["3.2"],
    "Network Authentication Protocols": ["3.2"],
    "Fail-Safe vs. Fail-Secure Design": ["3.2"],
    "OSI Model & Traffic Filtering": ["3.2"],
    "Data Classification & Security": ["3.3"],
    // Password storage and combined confidentiality/integrity: crypto choices applied to data.
    "Cryptography": ["1.4", "3.3"],
    "Cloud Resilience & Fault Tolerance": ["3.4"],
    "Backup & Recovery": ["3.4"],
    "Business Continuity & Disaster Recovery": ["3.4"],
    // Tabletop and simulation exercises: resilience testing (3.4) and IR testing (4.8).
    "Incident Response": ["3.4", "4.8"],
    "Zero Trust Architecture": ["1.2"],
    "Public Key Infrastructure": ["1.4"],
    "Hardware, Firmware & UEFI Security": ["4.1"],
    "Vulnerability Management": ["4.3"],
    "Identity & Access Control Models": ["4.6"],
    "Governance, Boards & Committees": ["5.1"],
    "Compliance, Privacy, Due Diligence & Due Care": ["5.4"],
  },
  4: {
    "Baselines & Configuration": ["4.1"],
    "System & Device Hardening": ["4.1"],
    "Wireless Security": ["4.1"],
    "Mobile Device Security": ["4.1"],
    "ICS/OT Security": ["4.1"],
    "Application Security": ["4.1"],
    "Code Signing": ["4.1"],
    "Asset Management": ["4.2"],
    "Data Sanitization & Destruction": ["4.2"],
    // Retention at decommissioning (4.2) and log archiving (4.4).
    "Data Retention & Archiving": ["4.2", "4.4"],
    "Vulnerability Management": ["4.3"],
    "Vulnerability Scanning": ["4.3"],
    "Threat Intelligence": ["4.3"],
    "Security Monitoring & Alerting": ["4.4"],
    // NetFlow and SNMP are monitoring tools (4.4); packet captures are a data source (4.9).
    "Network Monitoring & Analysis": ["4.4", "4.9"],
    "Network Security Devices": ["4.5"],
    "Web Content Filtering": ["4.5"],
    "Email Security": ["4.5"],
    "Data Loss Prevention": ["4.5"],
    "Network Access Control": ["4.5"],
    "Group Policy & Active Directory": ["4.5"],
    "Secure Network Protocols": ["4.5"],
    "Identity & Access Management": ["4.6"],
    "Identity & Access Control Models": ["4.6"],
    "Password Security": ["4.6"],
    "Multi-Factor Authentication": ["4.6"],
    "Authentication Methods": ["4.6"],
    "Privileged Access Management": ["4.6"],
    "Automation & Orchestration": ["4.7"],
    "Technical Debt in Security": ["4.7"],
    // Continuous integration and testing is an automation use case.
    "DevSecOps": ["4.7"],
    "Incident Response": ["4.8"],
    "Digital Forensics": ["4.8"],
    "Log Analysis": ["4.9"],
    "Security Principles": ["1.2"],
    "Physical Security Controls": ["1.2"],
    "Mitigation Techniques & Controls": ["2.5"],
    "Backup & Recovery": ["3.4"],
    "Infrastructure Segmentations & Topologies": ["3.2"],
    "Security Policies & Lifecycle": ["5.1"],
    "Personnel Security & Onboarding": ["5.1"],
    "Risk Management & Analysis": ["5.2"],
    "Third-Party Risk & Assessments": ["5.3"],
    "Security Assessment / Penetration Testing": ["5.5"],
  },
  5: {
    "Governance, Boards & Committees": ["5.1"],
    "Security Policies & Lifecycle": ["5.1"],
    "Personnel Security & Onboarding": ["5.1"],
    "Risk Management & Analysis": ["5.2"],
    // MTBF and RTO belong to the business impact analysis.
    "Business Continuity & Disaster Recovery": ["5.2"],
    "Third-Party Risk & Assessments": ["5.3"],
    "Agreements & Contracts": ["5.3"],
    "Compliance, Privacy, Due Diligence & Due Care": ["5.4"],
    "Security Assessment / Penetration Testing": ["5.5"],
    "Security Awareness": ["5.6"],
    // Recognising the technique (2.2) is what awareness training builds (5.6).
    "Social Engineering": ["2.2", "5.6"],
    "Identity & Access Management": ["4.6"],
    "Cryptography & Key Management": ["1.4"],
    "Architecture Models & Shared Responsibility": ["3.1"],
  },
};

/**
 * Questions whose objective differs from their topic's, by domain and source id
 * (the id in src/data.ts), each with the reason.
 */
export const QUESTION_OBJECTIVE_OVERRIDES: Record<number, Record<number, { objectives: readonly string[]; reason: string }>> = {
  4: {
    20: { objectives: ["4.3"], reason: "Labelled physical security, but asks about STIX/TAXII threat-intelligence sharing." },
    253: { objectives: ["4.8"], reason: "Threat hunting is an incident-response activity (4.8), not a threat feed." },
    276: { objectives: ["4.3"], reason: "Static and dynamic analysis are vulnerability identification methods." },
  },
  5: {
    110: { objectives: ["5.1"], reason: "Asks which policy governs business continuity: a governance document." },
  },
};

/** The objectives trained by one question of a domain's bank. */
export function objectivesOf(domainId: number, sourceId: number, topic: string): readonly string[] {
  return QUESTION_OBJECTIVE_OVERRIDES[domainId]?.[sourceId]?.objectives ?? TOPIC_OBJECTIVES[domainId]?.[topic] ?? [];
}

/** Convenience overload for a question read from the source dataset. */
export function objectivesOfQuestion(domainId: number, question: Pick<Question, "id" | "topic">): readonly string[] {
  return objectivesOf(domainId, question.id, question.topic);
}

/** Every official objective code, in syllabus order. */
export const ALL_OBJECTIVES: readonly string[] = Object.values(OFFICIAL_OBJECTIVES).flat();

/**
 * Groups the app's questions by the objectives they train, for the
 * "objective only" quiz. `banks` must be the Italian source questions (their
 * topics are the keys of TOPIC_OBJECTIVES) with app-wide ids, and `sourceIdOf`
 * turns such an id back into the dataset id. The result lists app ids, which
 * are the same in both languages, so the quiz can then be run in English too.
 */
export function questionIdsByObjective(
  banks: Record<number, readonly Pick<Question, "id" | "topic">[]>,
  sourceIdOf: (appId: number) => number
): Map<string, number[]> {
  const index = new Map<string, number[]>(ALL_OBJECTIVES.map((code) => [code, []]));
  for (const [domain, questions] of Object.entries(banks)) {
    for (const q of questions) {
      for (const code of objectivesOf(Number(domain), sourceIdOf(q.id), q.topic)) index.get(code)?.push(q.id);
    }
  }
  return index;
}
