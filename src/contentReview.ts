/** Authoritative source catalogue and mapping for all SY0-701 objectives. */

export type SourceKind = "exam" | "standard" | "reference";

export interface Source {
  title: string;
  publisher: string;
  url: string;
  kind: SourceKind;
}

export const SOURCES = {
  icannHijacking: {"title": "ICANN Domain Name Registration Hijacking", "publisher": "ICANN", "url": "https://www.icann.org/en/icann-acronyms-and-terms/domain-name-registration-hijacking-en", "kind": "reference"},
  icannProtection: {"title": "ICANN Protect Your Domain Name", "publisher": "ICANN", "url": "https://www.icann.org/en/blogs/details/do-you-have-a-domain-name-heres-what-you-need-to-know-26-3-2018-en", "kind": "reference"},
  icannLocks: {"title": "ICANN EPP Status Codes", "publisher": "ICANN", "url": "https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en", "kind": "reference"},
  rfc4033: {"title": "RFC 4033 — DNS Security Introduction and Requirements", "publisher": "IETF", "url": "https://www.rfc-editor.org/rfc/rfc4033", "kind": "standard"},
  ieee80211: {"title": "IEEE Std 802.11-2020 — Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications", "publisher": "IEEE", "url": "https://standards.ieee.org/ieee/802.11/7028/", "kind": "standard"},
  wifiAlliance: {"title": "Wi-Fi Alliance — WPA3 Specification and security", "publisher": "Wi-Fi Alliance", "url": "https://www.wi-fi.org/discover-wi-fi/security", "kind": "reference"},

  owaspSession: { title: "Session Management Cheat Sheet", publisher: "OWASP Foundation", url: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html", kind: "reference" },
  mdnCookies: { title: "MDN Set-Cookie", publisher: "MDN", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie", kind: "reference" },
  owaspXss: {"title": "XSS Prevention Cheat Sheet", "publisher": "OWASP Foundation", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html", "kind": "reference"},
  owaspCsrf: {"title": "CSRF Prevention Cheat Sheet", "publisher": "OWASP Foundation", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html", "kind": "reference"},
  owaspSsrf: {"title": "SSRF Prevention Cheat Sheet", "publisher": "OWASP Foundation", "url": "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html", "kind": "reference"},

  nistSteganography: { title: "CSRC Glossary — Steganography", publisher: "NIST", url: "https://csrc.nist.gov/glossary/term/steganography", kind: "reference" },
  comptiaSecurityPlus: { title: "CompTIA Security+ (SY0-701) — exam objectives", publisher: "CompTIA", url: "https://www.comptia.org/certifications/security", kind: "exam" },
  nist80053: { title: "SP 800-53 Rev. 5 — Security and Privacy Controls", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final", kind: "standard" },
  nist800207: { title: "SP 800-207 — Zero Trust Architecture", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/207/final", kind: "standard" },
  nist80056a: { title: "SP 800-56A Rev. 3 — Pair-Wise Key-Establishment Schemes Using Discrete Logarithm Cryptography", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/56/a/r3/final", kind: "standard" },
  nist80063b: { title: "SP 800-63B — Digital Identity Guidelines: Authentication and Authenticator Management", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/63/b/4/final", kind: "standard" },
  nist80037: { title: "SP 800-37 Rev. 2 — Risk Management Framework for Information Systems and Organizations", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/37/r2/final", kind: "standard" },
  nist80088: { title: "SP 800-88 Rev. 2 — Guidelines for Media Sanitization", publisher: "NIST", url: "https://csrc.nist.gov/pubs/sp/800/88/r2/final", kind: "standard" },
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
  hipaa: { title: "HIPAA — Health Insurance Portability and Accountability Act", publisher: "U.S. Department of Health and Human Services", url: "https://www.hhs.gov/hipaa/index.html", kind: "standard" },
  soc2: { title: "SOC 2 — Trust Services Criteria", publisher: "AICPA", url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2", kind: "standard" },
  pciDss: { title: "PCI Data Security Standard", publisher: "PCI Security Standards Council", url: "https://www.pcisecuritystandards.org/", kind: "standard" },
  owaspTop10: { title: "OWASP Top 10", publisher: "OWASP Foundation", url: "https://owasp.org/www-project-top-ten/", kind: "reference" },
  cisControls: { title: "CIS Critical Security Controls", publisher: "Center for Internet Security", url: "https://www.cisecurity.org/controls", kind: "reference" },
  mitreAttack: { title: "MITRE ATT&CK", publisher: "MITRE", url: "https://attack.mitre.org/", kind: "reference" },
  cisaKev: { title: "Known Exploited Vulnerabilities Catalog", publisher: "CISA", url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", kind: "reference" },
  firstCvss: { title: "Common Vulnerability Scoring System (CVSS)", publisher: "FIRST", url: "https://www.first.org/cvss/", kind: "reference" },
} as const satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

export interface ObjectiveSources {
  /** Primary sources first, then secondary ones. */
  sources: SourceId[];
}

/** When the sources below were assigned to the objectives. */
export const SOURCES_MAPPED_ON = "2026-10-06";

const mapped = (...sources: SourceId[]): ObjectiveSources => ({
  sources: ["comptiaSecurityPlus", ...sources],
});

export const OBJECTIVE_SOURCES: Record<string, ObjectiveSources> = {
  "1.1": mapped("nist80053"),
  "1.2": mapped("nist800207", "nist80053"),
  "1.3": mapped("nist80053", "cisControls"),
  "1.4": mapped("nist80057", "nist80056a", "rfc8446", "nistSteganography"),
  "2.1": mapped("nist80030", "mitreAttack"),
  "2.2": mapped("icannProtection", "nist800161", "mitreAttack"),
  "2.3": mapped("nist80053", "owaspTop10", "cisaKev"),
  "2.4": mapped("icannHijacking", "icannProtection", "icannLocks", "rfc4033", "ieee80211", "wifiAlliance", "nist80061", "mitreAttack", "owaspXss", "owaspCsrf", "owaspSsrf", "owaspSession", "mdnCookies", "nist80063b"),
  "2.5": mapped("nist80053", "cisControls"),
  "3.1": mapped("nist800145", "nist800207"),
  "3.2": mapped("nist800207", "ieee80211", "wifiAlliance", "cisControls"),
  "3.3": mapped("nist80057", "gdpr"),
  "3.4": mapped("nist80034"),
  "4.1": mapped("nist80053", "ieee80211", "wifiAlliance", "cisControls", "owaspSession", "mdnCookies"),
  "4.2": mapped("nist80053", "nist80088", "cisControls"),
  "4.3": mapped("nist80040", "firstCvss", "cisaKev"),
  "4.4": mapped("nist80092", "mitreAttack"),
  "4.5": mapped("nist80053", "cisControls"),
  "4.6": mapped("nist800207", "nist80053", "nist80063b"),
  "4.7": mapped("nist80053", "cisControls"),
  "4.8": mapped("nist80061"),
  "4.9": mapped("nist80061", "nist80092"),
  "5.1": mapped("nistCsf", "iso27001", "nist80037"),
  "5.2": mapped("nist80030"),
  "5.3": mapped("nist800161", "soc2"),
  "5.4": mapped("gdpr", "pciDss", "iso27001", "hipaa"),
  "5.5": mapped("nist800115", "soc2"),
  "5.6": mapped("nist80050"),
};

/** The sources of a set of objectives, each once, primary ones first. */
export function sourcesOf(codes: readonly string[]): Source[] {
  const ids = [...new Set(codes.flatMap(code => OBJECTIVE_SOURCES[code]?.sources ?? []))];
  const rank = (id: SourceId) => (SOURCES[id].kind === "reference" ? 1 : 0);
  return ids.sort((a, b) => rank(a) - rank(b)).map(id => SOURCES[id]);
}
