/**
 * One definition per concept (ROADMAP: "Eliminare duplicazioni").
 *
 * Some concepts are studied in more than one domain: least privilege is a
 * principle in Domain 1 and a mitigation in Domain 2, CVE and CVSS belong to
 * the vulnerabilities of Domain 2 and to vulnerability management in Domain 4.
 * Each domain keeps its own subtopic, with its own analysis and exam tip,
 * because the angle differs; the definition, though, is written once, in the
 * canonical entry, and the other subtopic points to it by id.
 *
 * - A duplicate has `definition: ""` in src/data.ts and no definition in
 *   src/data.en.ts; src/localizedData.ts fills it from the canonical entry in
 *   the reader's language and records the link in `Subtopic.canonical`.
 * - The glossary lists the canonical entry once, with the other domains where
 *   the concept appears.
 * - Subtopics that share a name but not a meaning (Recovery of a site, Recovery
 *   phase of incident response) are homonyms: they keep their definitions and
 *   are listed below, so that tests/canonicalTerms.test.ts can tell a forgotten
 *   duplicate from a deliberate homonym.
 *
 * checklistKeys are unique only within a domain, so a concept is referred to
 * as "domain:checklistKey".
 */

export type ConceptRef = `${1 | 2 | 3 | 4 | 5}:${string}`;

export const conceptRef = (domainId: number, checklistKey: string) => `${domainId}:${checklistKey}` as ConceptRef;

export function parseConceptRef(ref: ConceptRef): { domainId: number; checklistKey: string } {
  const colon = ref.indexOf(":");
  return { domainId: Number(ref.slice(0, colon)), checklistKey: ref.slice(colon + 1) };
}

/** Duplicate → canonical entry. A canonical entry is never itself a duplicate. */
export const CANONICAL_TERMS: Record<ConceptRef, ConceptRef> = {
  // Least privilege: the principle (1.2) is canonical; Domain 2 applies it as a mitigation (2.5).
  "2:LeastPrivilegeMiti": "1:LeastPrivilegeConcept",
  // Hashing: introduced with cryptography (1.4); Domain 3 uses it to protect data (3.3).
  "3:HashingSec": "1:HashingConcept",
  // Encryption: defined with the methods to secure data (3.3); Domain 2 lists it as a mitigation (2.5).
  "2:EncryptionMiti": "3:EncryptionSec",
  // CVE, CVSS and false results: defined in vulnerability management (4.3), referred to from 2.3.
  "2:CVEVuln": "4:CVE",
  "2:CVSSVuln": "4:CVSS",
  "2:FalsePositiveVuln": "4:FalsePositiveRes",
  "2:FalseNegativeVuln": "4:FalseNegativeRes",
  // Insider threat: a threat actor (2.1); Domain 5 trains people to recognize it (5.6).
  "5:InsiderThreat": "2:InsiderThreatActor",
  // Penetration testing: defined with vulnerability analysis (4.3); Domain 5 places it among audits (5.5).
  "5:PenetrationTestAudit": "4:PenetrationTest",
  // Rules of engagement: the agreement belongs with third-party and testing agreements (5.3, 5.5).
  "4:RulesOfEngagementRes": "5:RulesOfEngagement",
};

/** Subtopics that share a name but not a meaning, each with the reason. */
export const HOMONYMS: { refs: ConceptRef[]; reason: string }[] = [
  { refs: ["1:ControlPlaneZTA", "3:ControlPlaneConcept"], reason: "The Zero Trust control plane (policy engine and administrator) is not the control plane of a network device or SDN." },
  { refs: ["1:DataPlaneZTA", "3:DataPlaneConcept"], reason: "The Zero Trust data plane (subjects, policy enforcement point) is not the forwarding plane of a network device or SDN." },
  { refs: ["3:RecoveryRes", "4:RecoveryPhase"], reason: "Recovery of data and systems after a disaster (resilience) is not the recovery phase of incident response." },
  { refs: ["4:ReportingForensics", "5:ReportingRes"], reason: "The report of a forensic investigation is not the report of an audit or assessment." },
  { refs: ["3:SSHNet", "3:SSHPBQ"], reason: "The protocol and the performance-based scenario that practices it." },
  { refs: ["3:WPA3Net", "3:WPA3PBQ"], reason: "The protocol and the performance-based scenario that practices it." },
  { refs: ["3:RADIUSNet", "3:RADIUSPBQ"], reason: "The protocol and the performance-based scenario that practices it." },
  { refs: ["4:FirewallLogs", "4:PBQFirewallLogs"], reason: "The log source and the performance-based scenario that analyzes it." },
];

/**
 * Glossary bookmarks store only a checklistKey. A bookmark on a duplicate
 * concept, which the glossary no longer lists, becomes a bookmark on its
 * canonical entry. tests/canonicalTerms.test.ts checks that no other domain
 * uses a duplicate's key, so the mapping is unambiguous.
 */
const BOOKMARK_TO_CANONICAL = new Map(
  Object.entries(CANONICAL_TERMS).map(([duplicate, canonical]) => [
    parseConceptRef(duplicate as ConceptRef).checklistKey,
    parseConceptRef(canonical).checklistKey,
  ])
);

export const canonicalBookmark = (checklistKey: string): string => BOOKMARK_TO_CANONICAL.get(checklistKey) ?? checklistKey;

/** How two subtopic names are compared: case, spacing and a parenthetical acronym do not matter. */
export const sameNameKey = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();
