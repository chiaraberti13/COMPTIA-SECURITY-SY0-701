/**
 * Generates docs/acronym-coverage.md: every acronym of the official CompTIA
 * Security+ SY0-701 Acronym List, and whether the app covers it — findable in
 * the glossary search (term/definition/details/examTip/group title, as
 * GlossarySection does) and, ideally, with its own searchable entry and
 * flashcard (the acronym appears in a glossary entry's name, the signal
 * src/glossaryIndex.ts and src/flashcards.ts use).
 *
 * The output is deterministic (no dates), so tests/acronymCoverage.test.ts can
 * fail CI when the committed file is stale or coverage regresses. The list of
 * not-yet-findable acronyms can only shrink: the goal is 100%.
 *
 * Usage: npm run acronym-coverage
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getAllTopics, loadEnglishOverlay } from "../src/localizedData";
import { DOMAIN_GUIDES_IT, DOMAIN_GUIDES_EN } from "../src/domainGuides";
import { acronymsOf } from "../src/glossaryIndex";
import type { Lang } from "../src/i18n";
import type { TopicGroup } from "../src/types";

const GUIDES: Record<Lang, typeof DOMAIN_GUIDES_IT> = { it: DOMAIN_GUIDES_IT, en: DOMAIN_GUIDES_EN };

export const ACRONYM_COVERAGE_PATH = path.join("docs", "acronym-coverage.md");

/** The official SY0-701 Acronym List (acronym → expansion), transcribed from the PDF. */
export const SY0701_ACRONYMS: Readonly<Record<string, string>> = {
  "2FA": "Two-factor Authentication",
  "3DES": "Triple Data Encryption Standard",
  "AAA": "Authentication, Authorization, and Accounting",
  "ACL": "Access Control List",
  "AES": "Advanced Encryption Standard",
  "AES-256": "Advanced Encryption Standards 256-bit",
  "AH": "Authentication Header",
  "AI": "Artificial Intelligence",
  "AIS": "Automated Indicator Sharing",
  "ALE": "Annualized Loss Expectancy",
  "AP": "Access Point",
  "API": "Application Programming Interface",
  "APT": "Advanced Persistent Threat",
  "ARO": "Annualized Rate of Occurrence",
  "ARP": "Address Resolution Protocol",
  "ASLR": "Address Space Layout Randomization",
  "ATT&CK": "Adversarial Tactics, Techniques, and Common Knowledge",
  "AUP": "Acceptable Use Policy",
  "AV": "Antivirus",
  "BASH": "Bourne Again Shell",
  "BCP": "Business Continuity Planning",
  "BGP": "Border Gateway Protocol",
  "BIA": "Business Impact Analysis",
  "BIOS": "Basic Input/Output System",
  "BPA": "Business Partners Agreement",
  "BPDU": "Bridge Protocol Data Unit",
  "BYOD": "Bring Your Own Device",
  "CA": "Certificate Authority",
  "CAPTCHA": "Completely Automated Public Turing Test to Tell Computers and Humans Apart",
  "CAR": "Corrective Action Report",
  "CASB": "Cloud Access Security Broker",
  "CBC": "Cipher Block Chaining",
  "CCMP": "Counter Mode/CBC-MAC Protocol",
  "CCTV": "Closed-circuit Television",
  "CERT": "Computer Emergency Response Team",
  "CFB": "Cipher Feedback",
  "CHAP": "Challenge Handshake Authentication Protocol",
  "CIA": "Confidentiality, Integrity, Availability",
  "CIO": "Chief Information Officer",
  "CIRT": "Computer Incident Response Team",
  "CMS": "Content Management System",
  "COBO": "Corporate-owned, Business-only",
  "COOP": "Continuity of Operation Planning",
  "COPE": "Corporate Owned, Personally Enabled",
  "CP": "Contingency Planning",
  "CRC": "Cyclical Redundancy Check",
  "CRL": "Certificate Revocation List",
  "CSO": "Chief Security Officer",
  "CSP": "Cloud Service Provider",
  "CSR": "Certificate Signing Request",
  "CSU": "Channel Service Unit",
  "CTM": "Counter Mode",
  "CTO": "Chief Technology Officer",
  "CVE": "Common Vulnerability Enumeration",
  "CVSS": "Common Vulnerability Scoring System",
  "CYOD": "Choose Your Own Device",
  "DAC": "Discretionary Access Control",
  "DBA": "Database Administrator",
  "DDoS": "Distributed Denial of Service",
  "DEP": "Data Execution Prevention",
  "DES": "Digital Encryption Standard",
  "DHCP": "Dynamic Host Configuration Protocol",
  "DHE": "Diffie-Hellman Ephemeral",
  "DKIM": "DomainKeys Identified Mail",
  "DLL": "Dynamic Link Library",
  "DLP": "Data Loss Prevention",
  "DMARC": "Domain Message Authentication Reporting and Conformance",
  "DNAT": "Destination Network Address Translation",
  "DNS": "Domain Name System",
  "DNSSEC": "Domain Name System Security Extensions",
  "DoS": "Denial of Service",
  "DPO": "Data Privacy Officer",
  "DRP": "Disaster Recovery Plan",
  "DSA": "Digital Signature Algorithm",
  "DSL": "Digital Subscriber Line",
  "EAP": "Extensible Authentication Protocol",
  "ECB": "Electronic Code Book",
  "ECC": "Elliptic Curve Cryptography",
  "ECDHE": "Elliptic Curve Diffie-Hellman Ephemeral",
  "ECDSA": "Elliptic Curve Digital Signature Algorithm",
  "EDR": "Endpoint Detection and Response",
  "EFS": "Encrypted File System",
  "ERP": "Enterprise Resource Planning",
  "ESN": "Electronic Serial Number",
  "ESP": "Encapsulated Security Payload",
  "EULA": "End User License Agreement",
  "FACL": "File System Access Control List",
  "FDE": "Full Disk Encryption",
  "FIM": "File Integrity Management",
  "FPGA": "Field Programmable Gate Array",
  "FRR": "False Rejection Rate",
  "FTP": "File Transfer Protocol",
  "FTPS": "Secured File Transfer Protocol",
  "GCM": "Galois Counter Mode",
  "GDPR": "General Data Protection Regulation",
  "GPG": "Gnu Privacy Guard",
  "GPO": "Group Policy Object",
  "GPS": "Global Positioning System",
  "GPU": "Graphics Processing Unit",
  "GRE": "Generic Routing Encapsulation",
  "HA": "High Availability",
  "HDD": "Hard Disk Drive",
  "HIDS": "Host-based Intrusion Detection System",
  "HIPS": "Host-based Intrusion Prevention System",
  "HMAC": "Hashed Message Authentication Code",
  "HOTP": "HMAC-based One-time Password",
  "HSM": "Hardware Security Module",
  "HTML": "Hypertext Markup Language",
  "HTTP": "Hypertext Transfer Protocol",
  "HTTPS": "Hypertext Transfer Protocol Secure",
  "HVAC": "Heating, Ventilation Air Conditioning",
  "IaaS": "Infrastructure as a Service",
  "IaC": "Infrastructure as Code",
  "IAM": "Identity and Access Management",
  "ICMP": "Internet Control Message Protocol",
  "ICS": "Industrial Control Systems",
  "IDEA": "International Data Encryption Algorithm",
  "IDF": "Intermediate Distribution Frame",
  "IdP": "Identity Provider",
  "IDS": "Intrusion Detection System",
  "IEEE": "Institute of Electrical and Electronics Engineers",
  "IKE": "Internet Key Exchange",
  "IM": "Instant Messaging",
  "IMAP": "Internet Message Access Protocol",
  "IoC": "Indicators of Compromise",
  "IoT": "Internet of Things",
  "IP": "Internet Protocol",
  "IPS": "Intrusion Prevention System",
  "IPSec": "Internet Protocol Security",
  "IR": "Incident Response",
  "IRC": "Internet Relay Chat",
  "IRP": "Incident Response Plan",
  "ISO": "International Standards Organization",
  "ISP": "Internet Service Provider",
  "ISSO": "Information Systems Security Officer",
  "IV": "Initialization Vector",
  "KDC": "Key Distribution Center",
  "KEK": "Key Encryption Key",
  "L2TP": "Layer 2 Tunneling Protocol",
  "LAN": "Local Area Network",
  "LDAP": "Lightweight Directory Access Protocol",
  "LEAP": "Lightweight Extensible Authentication Protocol",
  "MaaS": "Monitoring as a Service",
  "MAC": "Mandatory Access Control / Media Access Control / Message Authentication Code",
  "MAN": "Metropolitan Area Network",
  "MBR": "Master Boot Record",
  "MD5": "Message Digest 5",
  "MDF": "Main Distribution Frame",
  "MDM": "Mobile Device Management",
  "MFA": "Multifactor Authentication",
  "MFD": "Multifunction Device",
  "MFP": "Multifunction Printer",
  "ML": "Machine Learning",
  "MMS": "Multimedia Message Service",
  "MOA": "Memorandum of Agreement",
  "MOU": "Memorandum of Understanding",
  "MPLS": "Multi-protocol Label Switching",
  "MSA": "Master Service Agreement",
  "MSCHAP": "Microsoft Challenge Handshake Authentication Protocol",
  "MSP": "Managed Service Provider",
  "MSSP": "Managed Security Service Provider",
  "MTBF": "Mean Time Between Failures",
  "MTTF": "Mean Time to Failure",
  "MTTR": "Mean Time to Recover",
  "MTU": "Maximum Transmission Unit",
  "MX": "Mail Exchange",
  "NAC": "Network Access Control",
  "NAT": "Network Address Translation",
  "NDA": "Non-disclosure Agreement",
  "NFC": "Near Field Communication",
  "NGFW": "Next-generation Firewall",
  "NIDS": "Network-based Intrusion Detection System",
  "NIPS": "Network-based Intrusion Prevention System",
  "NIST": "National Institute of Standards & Technology",
  "NTFS": "New Technology File System",
  "NTLM": "New Technology LAN Manager",
  "NTP": "Network Time Protocol",
  "OAUTH": "Open Authorization",
  "OCSP": "Online Certificate Status Protocol",
  "OID": "Object Identifier",
  "OS": "Operating System",
  "OSINT": "Open-source Intelligence",
  "OSPF": "Open Shortest Path First",
  "OT": "Operational Technology",
  "OTA": "Over the Air",
  "OVAL": "Open Vulnerability Assessment Language",
  "OWASP": "Open Worldwide Application Security Project",
  "P12": "PKCS #12",
  "P2P": "Peer to Peer",
  "PaaS": "Platform as a Service",
  "PAC": "Proxy Auto Configuration",
  "PAM": "Privileged Access Management / Pluggable Authentication Modules",
  "PAP": "Password Authentication Protocol",
  "PAT": "Port Address Translation",
  "PBKDF2": "Password-based Key Derivation Function 2",
  "PBX": "Private Branch Exchange",
  "PCAP": "Packet Capture",
  "PCI DSS": "Payment Card Industry Data Security Standard",
  "PDU": "Power Distribution Unit",
  "PEAP": "Protected Extensible Authentication Protocol",
  "PED": "Personal Electronic Device",
  "PEM": "Privacy Enhanced Mail",
  "PFS": "Perfect Forward Secrecy",
  "PGP": "Pretty Good Privacy",
  "PHI": "Personal Health Information",
  "PII": "Personally Identifiable Information",
  "PIV": "Personal Identity Verification",
  "PKCS": "Public Key Cryptography Standards",
  "PKI": "Public Key Infrastructure",
  "POP": "Post Office Protocol",
  "POTS": "Plain Old Telephone Service",
  "PPP": "Point-to-Point Protocol",
  "PPTP": "Point-to-Point Tunneling Protocol",
  "PSK": "Pre-shared Key",
  "PTZ": "Pan-tilt-zoom",
  "PUP": "Potentially Unwanted Program",
  "RA": "Recovery Agent / Registration Authority",
  "RACE": "Research and Development in Advanced Communications Technologies in Europe",
  "RAD": "Rapid Application Development",
  "RADIUS": "Remote Authentication Dial-in User Service",
  "RAID": "Redundant Array of Inexpensive Disks",
  "RAS": "Remote Access Server",
  "RAT": "Remote Access Trojan",
  "RBAC": "Role-based Access Control / Rule-based Access Control",
  "RC4": "Rivest Cipher version 4",
  "RDP": "Remote Desktop Protocol",
  "RFID": "Radio Frequency Identifier",
  "RIPEMD": "RACE Integrity Primitives Evaluation Message Digest",
  "ROI": "Return on Investment",
  "RPO": "Recovery Point Objective",
  "RSA": "Rivest, Shamir, & Adleman",
  "RTBH": "Remotely Triggered Black Hole",
  "RTO": "Recovery Time Objective",
  "RTOS": "Real-time Operating System",
  "RTP": "Real-time Transport Protocol",
  "S/MIME": "Secure/Multipurpose Internet Mail Extensions",
  "SaaS": "Software as a Service",
  "SAE": "Simultaneous Authentication of Equals",
  "SAML": "Security Assertions Markup Language",
  "SAN": "Storage Area Network / Subject Alternative Name",
  "SASE": "Secure Access Service Edge",
  "SCADA": "Supervisory Control and Data Acquisition",
  "SCAP": "Security Content Automation Protocol",
  "SCEP": "Simple Certificate Enrollment Protocol",
  "SD-WAN": "Software-defined Wide Area Network",
  "SDK": "Software Development Kit",
  "SDLC": "Software Development Lifecycle",
  "SDLM": "Software Development Lifecycle Methodology",
  "SDN": "Software-defined Networking",
  "SE Linux": "Security-enhanced Linux",
  "SED": "Self-encrypting Drives",
  "SEH": "Structured Exception Handler",
  "SFTP": "Secured File Transfer Protocol",
  "SHA": "Secure Hashing Algorithm",
  "SHTTP": "Secure Hypertext Transfer Protocol",
  "SIEM": "Security Information and Event Management",
  "SIM": "Subscriber Identity Module",
  "SLA": "Service-level Agreement",
  "SLE": "Single Loss Expectancy",
  "SMB": "Server Message Block",
  "SMS": "Short Message Service",
  "SMTP": "Simple Mail Transfer Protocol",
  "SMTPS": "Simple Mail Transfer Protocol Secure",
  "SNMP": "Simple Network Management Protocol",
  "SOAP": "Simple Object Access Protocol",
  "SOAR": "Security Orchestration, Automation, Response",
  "SOC": "Security Operations Center",
  "SoC": "System on Chip",
  "SOW": "Statement of Work",
  "SPF": "Sender Policy Framework",
  "SPIM": "Spam over Internet Messaging",
  "SQL": "Structured Query Language",
  "SQLi": "SQL Injection",
  "SRTP": "Secure Real-Time Protocol",
  "SSD": "Solid State Drive",
  "SSH": "Secure Shell",
  "SSL": "Secure Sockets Layer",
  "SSO": "Single Sign-on",
  "STIX": "Structured Threat Information eXchange",
  "SWG": "Secure Web Gateway",
  "TACACS+": "Terminal Access Controller Access Control System",
  "TAXII": "Trusted Automated eXchange of Indicator Information",
  "TCP/IP": "Transmission Control Protocol/Internet Protocol",
  "TGT": "Ticket Granting Ticket",
  "TKIP": "Temporal Key Integrity Protocol",
  "TLS": "Transport Layer Security",
  "TOC": "Time-of-check",
  "TOTP": "Time-based One-time Password",
  "TOU": "Time-of-use",
  "TPM": "Trusted Platform Module",
  "TSIG": "Transaction Signature",
  "TTP": "Tactics, Techniques, and Procedures",
  "UAT": "User Acceptance Testing",
  "UAV": "Unmanned Aerial Vehicle",
  "UBA": "User Behavior Analytics",
  "UDP": "User Datagram Protocol",
  "UEFI": "Unified Extensible Firmware Interface",
  "UEM": "Unified Endpoint Management",
  "UPS": "Uninterruptible Power Supply",
  "URI": "Uniform Resource Identifier",
  "URL": "Universal Resource Locator",
  "USB": "Universal Serial Bus",
  "USB OTG": "USB On the Go",
  "UTM": "Unified Threat Management",
  "UTP": "Unshielded Twisted Pair",
  "VBA": "Visual Basic",
  "VDE": "Virtual Desktop Environment",
  "VDI": "Virtual Desktop Infrastructure",
  "VLAN": "Virtual Local Area Network",
  "VLSM": "Variable Length Subnet Masking",
  "VM": "Virtual Machine",
  "VoIP": "Voice over IP",
  "VPC": "Virtual Private Cloud",
  "VPN": "Virtual Private Network",
  "VTC": "Video Teleconferencing",
  "WAF": "Web Application Firewall",
  "WAP": "Wireless Access Point",
  "WEP": "Wired Equivalent Privacy",
  "WIDS": "Wireless Intrusion Detection System",
  "WIPS": "Wireless Intrusion Prevention System",
  "WO": "Work Order",
  "WPA": "Wi-Fi Protected Access",
  "WPS": "Wi-Fi Protected Setup",
  "WTLS": "Wireless TLS",
  "XDR": "Extended Detection and Response",
  "XML": "Extensible Markup Language",
  "XOR": "Exclusive Or",
  "XSRF": "Cross-site Request Forgery",
  "XSS": "Cross-site Scripting",
};

const LANGS: Lang[] = ["it", "en"];

/**
 * Alternate spellings to look for in running text, case-sensitive. The Acronym
 * List prints OAUTH, but the content writes OAuth; SELinux and "USB On the Go"
 * are the spellings actually used. Every other acronym is matched as printed.
 */
const SPELLINGS: Readonly<Record<string, string[]>> = {
  OAUTH: ["OAuth"],
  "SE Linux": ["SE Linux", "SELinux"],
  "USB OTG": ["USB OTG", "USB On the Go"],
};

const spellingsOf = (acronym: string): string[] => SPELLINGS[acronym] ?? [acronym];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-token match: the acronym is not glued to another letter or digit. */
const mentions = (text: string, acronym: string): boolean =>
  spellingsOf(acronym).some((term) =>
    new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`).test(text)
  );

const activeSubs = (groups: TopicGroup[]) =>
  groups.flatMap((g) => g.subtopics.filter((s) => !s.deprecated).map((s) => ({ s, group: g })));

/**
 * All text a learner can meet in one language: every glossary field the search
 * matches (GlossarySection) plus the domain guides shown in the app — their
 * objectives, key topics, decision patterns, traps, scenarios and the
 * end-of-module acronym tables. An acronym found here is present in the app.
 */
function searchableText(lang: Lang): string {
  const glossary = Object.values(getAllTopics(lang))
    .flat()
    .flatMap((g) => g.subtopics.filter((s) => !s.deprecated).map((s) => `${s.name}\n${s.definition}\n${s.details}\n${s.examTip}\n${g.title}`))
    .join("\n");
  return `${glossary}\n${JSON.stringify(GUIDES[lang])}`;
}

/** Acronyms that have their own glossary entry (and thus a flashcard), one language. */
function entryAcronyms(lang: Lang): Set<string> {
  const found = new Set<string>();
  for (const { s } of activeSubs(Object.values(getAllTopics(lang)).flat())) {
    if (s.canonical) continue; // a duplicate concept is represented by its canonical entry
    for (const a of acronymsOf(s.name)) found.add(a);
  }
  return found;
}

export interface AcronymCoverage {
  total: number;
  /** Acronyms findable via glossary search in at least one language. */
  searchable: string[];
  /** Acronyms with their own searchable glossary entry/flashcard. */
  withEntry: string[];
  /** Acronyms not findable anywhere (expansion kept for the report). */
  missing: { acronym: string; expansion: string }[];
}

/** Requires loadEnglishOverlay() to have run, so the English content is present. */
export function acronymCoverage(): AcronymCoverage {
  const textByLang = Object.fromEntries(LANGS.map((l) => [l, searchableText(l)])) as Record<Lang, string>;
  const entries = new Set<string>(LANGS.flatMap((l) => [...entryAcronyms(l)]));
  const acronyms = Object.keys(SY0701_ACRONYMS);

  const searchable: string[] = [];
  const withEntry: string[] = [];
  const missing: { acronym: string; expansion: string }[] = [];
  for (const a of acronyms) {
    const found = LANGS.some((l) => mentions(textByLang[l], a));
    if (found) searchable.push(a);
    else missing.push({ acronym: a, expansion: SY0701_ACRONYMS[a] });
    if (entries.has(a)) withEntry.push(a);
  }
  return { total: acronyms.length, searchable, withEntry, missing };
}

/** The acronyms not yet findable, just the tokens, sorted — the shrink-only list. */
export function missingAcronyms(): string[] {
  return acronymCoverage().missing.map((m) => m.acronym).sort((a, b) => a.localeCompare(b, "en"));
}

export function renderAcronymCoverage(): string {
  const cov = acronymCoverage();
  const pct = (n: number) => `${((n / cov.total) * 100).toFixed(1)}%`;
  const missing = [...cov.missing].sort((a, b) => a.acronym.localeCompare(b.acronym, "en"));
  const searchableNoEntry = cov.searchable
    .filter((a) => !cov.withEntry.includes(a))
    .sort((a, b) => a.localeCompare(b, "en"));
  const lines: string[] = [
    "# Copertura degli acronimi SY0-701",
    "",
    "<!-- Generato da scripts/acronym-coverage.ts: non modificare a mano, esegui `npm run acronym-coverage`. -->",
    "",
    "Ogni sigla della *Acronym List* ufficiale CompTIA Security+ SY0-701, e se l'app la copre.",
    "Due livelli: **ricercabile** (la sigla compare nel testo del glossario — nome, definizione,",
    "dettagli, exam tip o titolo del gruppo — ed è quindi trovabile dalla ricerca) e **voce dedicata**",
    "(la sigla è nel nome di una voce di glossario, quindi ha una card e una flashcard proprie).",
    "L'obiettivo è il 100% su entrambi; l'elenco delle sigle mancanti può solo accorciarsi.",
    "",
    "> **English summary.** Every acronym of the official SY0-701 Acronym List and whether the app",
    "> covers it: *searchable* in the glossary and, ideally, with its own *entry/flashcard*. Generated",
    "> by `scripts/acronym-coverage.ts`; `tests/acronymCoverage.test.ts` keeps it current and the list",
    "> of missing acronyms can only shrink.",
    "",
    "## Riepilogo",
    "",
    "| Metrica | Conteggio | Quota |",
    "|---|---|---|",
    `| Sigle nella Acronym List | ${cov.total} | 100% |`,
    `| Ricercabili nel glossario | ${cov.searchable.length} | ${pct(cov.searchable.length)} |`,
    `| Con voce/flashcard dedicata | ${cov.withEntry.length} | ${pct(cov.withEntry.length)} |`,
    `| Non ancora ricercabili | ${missing.length} | ${pct(missing.length)} |`,
    "",
    "## Sigle non ancora ricercabili",
    "",
  ];
  if (missing.length === 0) lines.push("Nessuna: copertura completa della ricerca.", "");
  else {
    lines.push(
      `${missing.length} sigle da aggiungere come voce o alias ricercabile (attività 34 della roadmap):`,
      "",
      ...missing.map((m) => `- **${m.acronym}** — ${m.expansion}`),
      ""
    );
  }
  lines.push(
    "## Ricercabili ma senza voce dedicata",
    "",
    "Sigle trovabili nel testo del glossario che non hanno ancora una voce con flashcard propria",
    "(obiettivo più ambizioso: dare a ciascuna una card dedicata).",
    ""
  );
  if (searchableNoEntry.length === 0) lines.push("Nessuna.", "");
  else lines.push(...searchableNoEntry.map((a) => `- ${a} — ${SY0701_ACRONYMS[a]}`), "");
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await loadEnglishOverlay();
  writeFileSync(ACRONYM_COVERAGE_PATH, renderAcronymCoverage());
  console.log(`Written ${ACRONYM_COVERAGE_PATH}`);
}
