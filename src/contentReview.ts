/**
 * Where the study content of each SY0-701 objective can be checked, and
 * whether a person has checked it.
 *
 * - `SOURCES` is the catalogue. Primary sources are the exam objectives and
 *   the standards, laws and specifications they refer to; secondary sources
 *   are community and agency references that explain or apply them.
 * - `OBJECTIVE_REVIEW` gives every official objective its sources and its
 *   review state. A state becomes "reviewed" only when a person has compared
 *   the questions, glossary entries and guide of that objective with the
 *   listed sources: then the date and the reviewer are mandatory
 *   (tests/contentReview.test.ts). Automated checks never count as a review.
 *
 * The URLs are also written to docs/coverage-matrix.md, where the weekly
 * external-link check of the Docs workflow (lychee) verifies them.
 */

export type SourceKind = "exam" | "standard" | "reference";

export interface Source {
  title: string;
  publisher: string;
  url: string;
  kind: SourceKind;
}

export const SOURCES = {
  comptiaSecurityPlus: { title: "CompTIA Security+ (SY0-701) — exam objectives", publisher: "CompTIA", url: "https://www.comptia.org/certifications/security", kind: "exam" },
  nist80053: { title: "SP 800-53 Rev. 5 — Security and Privacy Controls", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", kind: "standard" },
  nist800207: { title: "SP 800-207 — Zero Trust Architecture", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/207/final", kind: "standard" },
  nist80057: { title: "SP 800-57 Part 1 Rev. 5 — Recommendation for Key Management", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final", kind: "standard" },
  nist800145: { title: "SP 800-145 — The NIST Definition of Cloud Computing", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/145/final", kind: "standard" },
  nist80034: { title: "SP 800-34 Rev. 1 — Contingency Planning Guide", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final", kind: "standard" },
  nist80040: { title: "SP 800-40 Rev. 4 — Enterprise Patch Management Planning", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/40/r4/final", kind: "standard" },
  nist80092: { title: "SP 800-92 — Guide to Computer Security Log Management", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/92/final", kind: "standard" },
  nist80061: { title: "SP 800-61 Rev. 3 — Incident Response Recommendations", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/61/r3/final", kind: "standard" },
  nist80030: { title: "SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/30/r1/final", kind: "standard" },
  nist800161: { title: "SP 800-161 Rev. 1 — Cybersecurity Supply Chain Risk Management", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final", kind: "standard" },
  nist800115: { title: "SP 800-115 — Technical Guide to Information Security Testing", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/115/final", kind: "standard" },
  nist80050: { title: "SP 800-50 Rev. 1 — Building a Cybersecurity and Privacy Learning Program", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/50/r1/final", kind: "standard" },
  nistCsf: { title: "Cybersecurity Framework (CSF) 2.0", publisher: "NIST", url: "https://www.nist.gov/cyberframework", kind: "standard" },
  rfc8446: { title: "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3", publisher: "IETF", url: "https://www.rfc-editor.org/rfc/rfc8446", kind: "standard" },
  iso27001: { title: "ISO/IEC 27001 — Information security management systems", publisher: "ISO", url: "https://www.iso.org/standard/27001", kind: "standard" },
  gdpr: { title: "Regulation (EU) 2016/679 — General Data Protection Regulation", publisher: "EUR-Lex", url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", kind: "standard" },
  pciDss: { title: "PCI Data Security Standard", publisher: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/", kind: "standard" },
  owaspTop10: { title: "OWASP Top 10", publisher: "OWASP Foundation", url: "https://owasp.org/www-project-top-ten/", kind: "reference" },
  cisControls: { title: "CIS Critical Security Controls", publisher: "Center for Internet Security", url: "https://www.cisecurity.org/controls", kind: "reference" },
  mitreAttack: { title: "MITRE ATT&CK", publisher: "MITRE", url: "https://attack.mitre.org/", kind: "reference" },
  cisaKev: { title: "Known Exploited Vulnerabilities Catalog", publisher: "CISA", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", kind: "reference" },
  firstCvss: { title: "Common Vulnerability Scoring System (CVSS)", publisher: "FIRST", url: "https://www.first.org/cvss/", kind: "reference" },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export type ReviewStatus = "reviewed" | "needs-review" | "deprecated";

export interface ObjectiveReview {
  status: ReviewStatus;
  /** ISO date (YYYY-MM-DD) of the last human review; null until one happens. */
  lastReviewed: string | null;
  /** GitHub handle of who reviewed it; null until one happens. */
  reviewer: string | null;
  /** Primary sources first, then secondary ones. */
  sources: SourceId[];
}

/** When the sources below were assigned to the objectives. */
export const SOURCES_MAPPED_ON = "2026-09-26";

const pending = (...sources: SourceId[]): ObjectiveReview => ({
  status: "needs-review",
  lastReviewed: null,
  reviewer: null,
  sources: ["comptiaSecurityPlus", ...sources],
});

export const OBJECTIVE_REVIEW: Record<string, ObjectiveReview> = {
  "1.1": pending("nist80053"),
  "1.2": pending("nist800207", "nist80053"),
  "1.3": pending("nist80053", "cisControls"),
  "1.4": pending("nist80057", "rfc8446"),
  "2.1": pending("nist80030", "mitreAttack"),
  "2.2": pending("nist800161", "mitreAttack"),
  "2.3": pending("nist80053", "owaspTop10", "cisaKev"),
  "2.4": pending("nist80061", "mitreAttack"),
  "2.5": pending("nist80053", "cisControls"),
  "3.1": pending("nist800145", "nist800207"),
  "3.2": pending("nist800207", "cisControls"),
  "3.3": pending("nist80057", "gdpr"),
  "3.4": pending("nist80034"),
  "4.1": pending("nist80053", "cisControls"),
  "4.2": pending("nist80053", "cisControls"),
  "4.3": pending("nist80040", "firstCvss", "cisaKev"),
  "4.4": pending("nist80092", "mitreAttack"),
  "4.5": pending("nist80053", "cisControls"),
  "4.6": pending("nist800207", "nist80053"),
  "4.7": pending("nist80053", "cisControls"),
  "4.8": pending("nist80061"),
  "4.9": pending("nist80061", "nist80092"),
  "5.1": pending("nistCsf", "iso27001"),
  "5.2": pending("nist80030"),
  "5.3": pending("nist800161"),
  "5.4": pending("gdpr", "pciDss", "iso27001"),
  "5.5": pending("nist800115"),
  "5.6": pending("nist80050"),
};

/** The sources of a set of objectives, each once, primary ones first. */
export function sourcesOf(codes: readonly string[]): Source[] {
  const ids = [...new Set(codes.flatMap(code => OBJECTIVE_REVIEW[code]?.sources ?? []))];
  const rank = (id: SourceId) => (SOURCES[id].kind === "reference" ? 1 : 0);
  return ids.sort((a, b) => rank(a) - rank(b)).map(id => SOURCES[id]);
}

/** How many of the given objectives are in each review state. */
export function reviewSummary(codes: readonly string[]): Record<ReviewStatus, number> {
  const summary: Record<ReviewStatus, number> = { reviewed: 0, "needs-review": 0, deprecated: 0 };
  for (const code of codes) {
    const review = OBJECTIVE_REVIEW[code];
    if (review) summary[review.status] += 1;
  }
  return summary;
}
