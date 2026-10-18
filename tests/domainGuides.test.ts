import { beforeAll, describe, expect, it } from "vitest";
import { DOMAIN_GUIDES_EN, DOMAIN_GUIDES_IT, readinessCheckId, type DomainGuide } from "../src/domainGuides";
import { getDomainTopics, loadEnglishOverlay } from "../src/localizedData";
import { factDrift, strings } from "./helpers/languageFacts";

/*
 * Rules for the optional, richer guide sections (key topics, comparisons,
 * common traps, practice scenarios). The mandatory sections are covered in
 * dataset.test.ts. Domains are enriched one at a time: ENRICHED_DOMAINS lists
 * those that must carry every optional section, and grows with each domain.
 */

const DOMAIN_IDS = [1, 2, 3, 4, 5] as const;
const ENRICHED_DOMAINS = [1, 2, 3, 4, 5] as const;

/**
 * Official SY0-701 sub-topics per objective. Each must be named in the English
 * key topics of that objective, so the guide stays a complete syllabus map.
 */
const OFFICIAL_SUBTOPICS: Record<string, string[]> = {
  "1.1": [
    "technical", "managerial", "operational", "physical",
    "preventive", "deterrent", "detective", "corrective", "compensating", "directive",
  ],
  "1.2": [
    "CIA", "non-repudiation", "authenticating people", "systems", "authorization models", "accounting",
    "gap analysis", "adaptive identity", "threat scope reduction", "policy-driven access control",
    "Policy Engine", "Policy Administrator", "implicit trust zones", "subject/system",
    "Policy Enforcement Point", "bollards", "access control vestibule", "fencing", "video surveillance",
    "security guard", "access badge", "lighting", "infrared", "pressure", "microwave", "ultrasonic",
    "honeypot", "honeynet", "honeyfile", "honeytoken",
  ],
  "1.3": [
    "approval process", "ownership", "stakeholders", "impact analysis", "test results", "backout plan",
    "maintenance window", "standard operating procedure", "allow lists", "deny lists",
    "restricted activities", "downtime", "service restart", "application restart",
    "legacy applications", "dependencies", "diagrams", "policies", "procedures", "version control",
  ],
  "1.4": [
    "public key", "private key", "key escrow", "full-disk", "partition", "file", "volume", "database",
    "record", "transport", "asymmetric", "symmetric", "key exchange", "algorithms", "key length",
    "TPM", "HSM", "key management system", "secure enclave", "steganography", "tokenization",
    "data masking", "hashing", "salting", "digital signatures", "key stretching", "blockchain",
    "open public ledger", "certificate authorities", "CRL", "OCSP", "self-signed", "third-party",
    "root of trust", "CSR", "wildcard",
  ],
  "2.1": [
    "nation-state", "unskilled attacker", "hacktivist", "insider threat", "organized crime", "shadow IT",
    "internal/external", "resources/funding", "level of sophistication/capability", "data exfiltration",
    "espionage", "service disruption", "blackmail", "financial gain", "philosophical/political beliefs",
    "ethical", "revenge", "disruption/chaos", "war",
  ],
  "2.2": [
    "message-based", "email", "SMS", "instant messaging", "image-based", "file-based", "voice call",
    "removable device", "vulnerable software", "client-based", "agentless", "unsupported systems and applications",
    "wireless", "wired", "Bluetooth", "open service ports", "default credentials", "managed service providers",
    "vendors", "suppliers", "phishing", "vishing", "smishing", "misinformation/disinformation", "impersonation",
    "business email compromise", "pretexting", "watering hole", "brand impersonation", "typosquatting",
  ],
  "2.3": [
    "memory injection", "buffer overflow", "race conditions", "time-of-check", "time-of-use", "malicious update",
    "operating system (OS)-based", "web-based", "SQL injection", "cross-site scripting", "firmware",
    "end-of-life", "legacy", "VM escape", "resource reuse", "cloud-specific", "service provider",
    "hardware provider", "software provider", "cryptographic", "misconfiguration", "side loading",
    "jailbreaking", "zero-day",
  ],
  "2.4": [
    "ransomware", "trojan", "worm", "spyware", "bloatware", "virus", "keylogger", "logic bomb", "rootkit",
    "brute force", "RFID cloning", "environmental", "DDoS", "amplified", "reflected", "DNS attacks", "wireless",
    "on-path", "credential replay", "malicious code", "injection", "replay", "privilege escalation", "forgery",
    "directory traversal", "downgrade", "collision", "birthday", "spraying", "account lockout",
    "concurrent session usage", "blocked content", "impossible travel", "resource consumption",
    "resource inaccessibility", "out-of-cycle logging", "published/documented", "missing logs",
  ],
  "2.5": [
    "segmentation", "access control", "ACL", "permissions", "application allow list", "isolation", "patching",
    "encryption", "monitoring", "least privilege", "configuration enforcement", "decommissioning",
    "installation of endpoint protection", "host-based firewall", "host-based intrusion prevention system",
    "disabling ports/protocols", "default password changes", "removal of unnecessary software",
  ],
  "3.1": [
    "responsibility matrix", "hybrid considerations", "third-party vendors", "infrastructure as code", "serverless",
    "microservices", "physical isolation", "air-gapped", "logical segmentation", "software-defined networking",
    "on-premises", "centralized vs decentralized", "containerization", "virtualization", "IoT",
    "industrial control systems", "SCADA", "real-time operating system", "embedded systems", "high availability",
    "availability", "resilience", "cost", "responsiveness", "scalability", "ease of deployment", "risk transference",
    "ease of recovery", "patch availability", "inability to patch", "power", "compute",
  ],
  "3.2": [
    "device placement", "security zones", "attack surface", "connectivity", "fail-open", "fail-closed",
    "active vs passive", "inline vs tap/monitor", "jump server", "proxy server", "IPS/IDS", "load balancer",
    "sensors", "802.1X", "EAP", "web application firewall", "unified threat management",
    "next-generation firewall", "layer 4/layer 7", "VPN", "remote access", "tunneling", "TLS", "IPSec", "SD-WAN",
    "secure access service edge", "selection of effective controls",
  ],
  "3.3": [
    "regulated", "trade secret", "intellectual property", "legal information", "financial information",
    "human- and non-human-readable", "sensitive", "confidential", "public", "restricted", "private", "critical",
    "data at rest", "data in transit", "data in use", "data sovereignty", "geolocation", "geographic restrictions",
    "encryption", "hashing", "masking", "tokenization", "obfuscation", "segmentation", "permission restrictions",
  ],
  "3.4": [
    "load balancing vs clustering", "hot", "cold", "warm", "geographic dispersion", "platform diversity",
    "multi-cloud systems", "continuity of operations", "capacity planning", "people", "technology",
    "infrastructure", "tabletop exercises", "fail over", "simulation", "parallel processing", "onsite/offsite",
    "frequency", "encryption", "snapshots", "recovery", "replication", "journaling", "generators",
    "uninterruptible power supply",
  ],
  "4.1": [
    "establish", "deploy", "maintain", "mobile devices", "workstations", "switches", "routers",
    "cloud infrastructure", "servers", "ICS/SCADA", "embedded systems", "RTOS", "IoT devices", "site surveys",
    "heat maps", "mobile device management", "BYOD", "COPE", "CYOD", "cellular", "Wi-Fi", "Bluetooth", "WPA3",
    "AAA/RADIUS", "cryptographic protocols", "authentication protocols", "input validation", "secure cookies",
    "static code analysis", "code signing", "sandboxing", "monitoring",
  ],
  "4.2": [
    "acquisition/procurement process", "ownership", "classification", "inventory", "enumeration", "sanitization",
    "destruction", "certification", "data retention",
  ],
  "4.3": [
    "vulnerability scan", "static analysis", "dynamic analysis", "package monitoring", "OSINT",
    "proprietary/third-party", "information-sharing organization", "dark web", "penetration testing",
    "responsible disclosure program", "bug bounty program", "system/process audit", "false positive",
    "false negative", "prioritize", "CVSS", "CVE", "vulnerability classification", "exposure factor",
    "environmental variables", "industry/organizational impact", "risk tolerance", "patching", "insurance",
    "segmentation", "compensating controls", "exceptions and exemptions", "rescanning", "audit", "verification",
    "reporting",
  ],
  "4.4": [
    "systems", "applications", "infrastructure", "log aggregation", "alerting", "scanning", "reporting",
    "archiving", "quarantine", "alert tuning", "Security Content Automation Protocol", "benchmarks",
    "agents/agentless", "SIEM", "antivirus", "DLP", "SNMP traps", "NetFlow", "vulnerability scanners",
  ],
  "4.5": [
    "rules", "access lists", "ports/protocols", "screened subnets", "trends", "signatures", "agent-based",
    "centralized proxy", "URL scanning", "content categorization", "block rules", "reputation", "Group Policy",
    "SELinux", "protocol selection", "port selection", "transport method", "DNS filtering", "DMARC", "DKIM",
    "SPF", "gateway", "file integrity monitoring", "DLP", "network access control", "EDR/XDR",
    "user behavior analytics",
  ],
  "4.6": [
    "provisioning/de-provisioning user accounts", "permission assignments and implications", "identity proofing",
    "federation", "single sign-on", "LDAP", "OAuth", "SAML", "interoperability", "attestation", "mandatory",
    "discretionary", "role-based", "rule-based", "attribute-based", "time-of-day restrictions", "least privilege",
    "biometrics", "hard/soft authentication tokens", "security keys", "something you know", "something you have",
    "something you are", "somewhere you are", "length", "complexity", "reuse", "expiration", "age",
    "password managers", "passwordless", "just-in-time permissions", "password vaulting", "ephemeral credentials",
  ],
  "4.7": [
    "user provisioning", "resource provisioning", "guard rails", "security groups", "ticket creation", "escalation",
    "enabling/disabling services and access", "continuous integration and testing", "integrations and APIs",
    "efficiency/time saving", "enforcing baselines", "standard infrastructure configurations",
    "scaling in a secure manner", "employee retention", "reaction time", "workforce multiplier", "complexity",
    "cost", "single point of failure", "technical debt", "ongoing supportability",
  ],
  "4.8": [
    "preparation", "detection", "analysis", "containment", "eradication", "recovery", "lessons learned",
    "training", "tabletop exercise", "simulation", "root cause analysis", "threat hunting", "legal hold",
    "chain of custody", "acquisition", "reporting", "preservation", "e-discovery",
  ],
  "4.9": [
    "firewall logs", "application logs", "endpoint logs", "OS-specific security logs", "IPS/IDS logs",
    "network logs", "metadata", "vulnerability scans", "automated reports", "dashboards", "packet captures",
  ],
  "5.1": [
    "guidelines", "AUP", "information security policies", "business continuity", "disaster recovery",
    "incident response", "SDLC", "change management", "password", "access control", "physical security",
    "encryption", "onboarding/offboarding", "playbooks", "regulatory", "legal", "industry", "local/regional",
    "national", "global", "monitoring and revision", "boards", "committees", "government entities",
    "centralized/decentralized", "owners", "controllers", "processors", "custodians/stewards",
  ],
  "5.2": [
    "risk identification", "ad hoc", "recurring", "one-time", "continuous", "qualitative", "quantitative",
    "SLE", "ALE", "ARO", "probability", "likelihood", "exposure factor", "impact", "key risk indicators",
    "risk owners", "risk threshold", "risk tolerance", "risk appetite", "expansionary", "conservative", "neutral",
    "transfer", "accept", "exemption", "exception", "avoid", "mitigate", "risk reporting",
    "business impact analysis", "RTO", "RPO", "MTTR", "MTBF",
  ],
  "5.3": [
    "penetration testing", "right-to-audit clause", "evidence of internal audits", "independent assessments",
    "supply chain analysis", "due diligence", "conflict of interest", "SLA", "MOA", "MOU", "MSA", "WO/SOW",
    "NDA", "BPA", "vendor monitoring", "questionnaires", "rules of engagement",
  ],
  "5.4": [
    "internal", "external", "fines", "sanctions", "reputational damage", "loss of license", "contractual impacts",
    "due diligence/care", "attestation and acknowledgement", "automation", "legal implications", "data subject",
    "controller vs processor", "ownership", "data inventory and retention", "right to be forgotten",
  ],
  "5.5": [
    "attestation", "compliance", "audit committee", "self-assessments", "regulatory", "examinations",
    "assessment", "independent third-party audit", "physical", "offensive", "defensive", "integrated",
    "known environment", "partially known environment", "unknown environment", "passive", "active",
  ],
  "5.6": [
    "campaigns", "recognizing a phishing attempt", "responding to reported suspicious messages", "risky",
    "unexpected", "unintentional", "policy/handbooks", "situational awareness", "insider threat",
    "password management", "removable media and cables", "social engineering", "operational security",
    "hybrid/remote work environments", "initial", "recurring", "development", "execution",
  ],
};

const pairs = DOMAIN_IDS.map((d) => [d, DOMAIN_GUIDES_IT[d], DOMAIN_GUIDES_EN[d]] as const);

const shape = (guide: DomainGuide) => ({
  keyTopics: guide.objectives.map((o) => o.keyTopics?.length ?? 0),
  comparisons: (guide.comparisons ?? []).map((c) => [c.headers.length, c.rows.length]),
  commonTraps: guide.commonTraps?.length ?? 0,
  practice: (guide.practiceScenarios ?? []).map((s) => s.objective),
});

describe("Italian and English guides", () => {
  it("have exactly the same fields in the same order", () => {
    for (const [, itGuide, enGuide] of pairs) {
      expect(strings(enGuide).map(([path]) => path)).toEqual(strings(itGuide).map(([path]) => path));
    }
  });

  it("carry the same numbers, acronyms and literal tokens in every sentence", () => {
    const drift: string[] = [];
    for (const [d, itGuide, enGuide] of pairs) {
      const en = new Map(strings(enGuide));
      for (const [path, itText] of strings(itGuide)) {
        const diff = factDrift(itText, en.get(path) ?? "");
        if (diff) drift.push(`D${d} ${path}: ${diff}`);
      }
    }
    expect(drift).toEqual([]);
  });

  it("keep practice scenarios and comparison rows on the same subject", () => {
    for (const [, itGuide, enGuide] of pairs) {
      expect((enGuide.practiceScenarios ?? []).map((s) => s.objective)).toEqual(
        (itGuide.practiceScenarios ?? []).map((s) => s.objective)
      );
      expect((enGuide.comparisons ?? []).map((c) => c.rows.length)).toEqual(
        (itGuide.comparisons ?? []).map((c) => c.rows.length)
      );
    }
  });
});

describe("domain guide optional sections", () => {
  it("keep Italian and English structurally aligned", () => {
    for (const [, itGuide, enGuide] of pairs) {
      expect(shape(enGuide)).toEqual(shape(itGuide));
    }
  });

  it.each(["it", "en"] as const)("contain no empty or malformed %s entries", (lang) => {
    const broken: string[] = [];
    for (const d of DOMAIN_IDS) {
      const guide = (lang === "it" ? DOMAIN_GUIDES_IT : DOMAIN_GUIDES_EN)[d];
      const codes = guide.objectives.map((o) => o.code);
      for (const o of guide.objectives) {
        if (o.keyTopics?.some((topic) => !topic.trim())) broken.push(`D${d} ${o.code}: empty key topic`);
      }
      for (const c of guide.comparisons ?? []) {
        if (!c.title.trim() || c.headers.length < 2 || c.rows.length < 2) broken.push(`D${d} "${c.title}": too small`);
        if (c.rows.some((row) => row.length !== c.headers.length)) broken.push(`D${d} "${c.title}": row width`);
        if ([...c.headers, ...c.rows.flat()].some((cell) => !cell.trim())) broken.push(`D${d} "${c.title}": empty cell`);
        const firstCells = c.rows.map((row) => row[0]);
        if (new Set(firstCells).size !== firstCells.length) broken.push(`D${d} "${c.title}": duplicate row`);
      }
      for (const trap of guide.commonTraps ?? []) {
        if (!trap.misconception.trim() || trap.correction.trim().length < 60) broken.push(`D${d}: thin trap`);
      }
      for (const s of guide.practiceScenarios ?? []) {
        if (!codes.includes(s.objective)) broken.push(`D${d} "${s.title}": unknown objective ${s.objective}`);
        if (!s.title.trim() || s.prompt.trim().length < 80 || s.reasoning.trim().length < 180) {
          broken.push(`D${d} "${s.title}": thin scenario`);
        }
      }
      const titles = (guide.practiceScenarios ?? []).map((s) => s.title);
      if (new Set(titles).size !== titles.length) broken.push(`D${d}: duplicate scenario title`);
    }
    expect(broken).toEqual([]);
  });

  it.each(ENRICHED_DOMAINS)("are complete for enriched domain %i", (d) => {
    for (const guide of [DOMAIN_GUIDES_IT[d], DOMAIN_GUIDES_EN[d]]) {
      expect(guide.objectives.every((o) => (o.keyTopics?.length ?? 0) > 0)).toBe(true);
      expect(guide.comparisons?.length ?? 0).toBeGreaterThanOrEqual(3);
      expect(guide.commonTraps?.length ?? 0).toBeGreaterThanOrEqual(5);
      const trained = new Set((guide.practiceScenarios ?? []).map((s) => s.objective));
      expect(guide.objectives.filter((o) => !trained.has(o.code)).map((o) => o.code)).toEqual([]);
    }
  });

  it("name every official sub-topic of the enriched objectives", () => {
    const missing: string[] = [];
    for (const [code, subtopics] of Object.entries(OFFICIAL_SUBTOPICS)) {
      const d = Number(code.split(".")[0]) as (typeof DOMAIN_IDS)[number];
      const objective = DOMAIN_GUIDES_EN[d].objectives.find((o) => o.code === code);
      const text = (objective?.keyTopics ?? []).join(" | ").toLowerCase();
      for (const subtopic of subtopics) {
        if (!text.includes(subtopic.toLowerCase())) missing.push(`${code}: ${subtopic}`);
      }
    }
    expect(missing).toEqual([]);
  });
});

/**
 * Scenarios that describe an attack, by Italian title. Each links the attack to
 * defense: vector, impact, mitigation, evidence and the limit of the control.
 */
const ATTACK_SCENARIOS = [
  "Pacchetto di configurazione alterato",
  "Chiave cloud esca nel repository",
  "Compromissione cloud con persistenza",
  "Controllo e uso non atomici",
  "Un tentativo per account",
  "Un'ora mancante nei log",
  "Chiosco in un'area pubblica",
  "Ransomware sul database replicato",
  "PowerShell e beacon DNS",
  "Email false a nome dell'azienda",
  "Indagine su un insider",
  "Quanto è uscito, e che cosa",
];

describe("attack chains in the guide scenarios", () => {
  const scenarios = (guides: Record<number, DomainGuide>) =>
    DOMAIN_IDS.flatMap((d) => [guides[d].appliedScenario, ...(guides[d].practiceScenarios ?? [])]);

  it("are present on exactly the listed attack scenarios", () => {
    const withChain = scenarios(DOMAIN_GUIDES_IT).filter((s) => s.attackChain).map((s) => s.title);
    expect(withChain.sort()).toEqual([...ATTACK_SCENARIOS].sort());
  });

  it("fill every step with a full sentence, in both languages", () => {
    const thin: string[] = [];
    for (const [lang, guides] of [["it", DOMAIN_GUIDES_IT], ["en", DOMAIN_GUIDES_EN]] as const) {
      for (const s of scenarios(guides)) {
        for (const [step, text] of Object.entries(s.attackChain ?? {})) {
          if (text.trim().length < 50 || !/[.!?]$/.test(text.trim())) thin.push(`${lang} "${s.title}" ${step}`);
        }
      }
    }
    expect(thin).toEqual([]);
  });

  it("cover every domain that trains attacks and responses", () => {
    for (const d of [1, 2, 3, 4] as const) {
      const guide = DOMAIN_GUIDES_IT[d];
      expect([guide.appliedScenario, ...(guide.practiceScenarios ?? [])].some((s) => s.attackChain), `domain ${d}`).toBe(true);
    }
  });
});

describe("end-of-module summaries", () => {
  // The English study content is a separate chunk.
  beforeAll(() => loadEnglishOverlay());

  it("give every domain five to eight key points, as many in both languages", () => {
    for (const d of DOMAIN_IDS) {
      const it = DOMAIN_GUIDES_IT[d].keyPoints;
      expect(it.length, `domain ${d}`).toBeGreaterThanOrEqual(5);
      expect(it.length, `domain ${d}`).toBeLessThanOrEqual(8);
      expect(DOMAIN_GUIDES_EN[d].keyPoints).toHaveLength(it.length);
      for (const point of [...it, ...DOMAIN_GUIDES_EN[d].keyPoints]) expect(point.trim()).toMatch(/^.{40,260}[.]$/);
    }
  });

  it("list each acronym once, with an expansion that starts like it", () => {
    const problems: string[] = [];
    for (const d of DOMAIN_IDS) {
      const { acronyms } = DOMAIN_GUIDES_IT[d];
      expect(DOMAIN_GUIDES_EN[d].acronyms).toEqual(acronyms);
      expect(new Set(acronyms.map((a) => a.acronym)).size).toBe(acronyms.length);
      for (const { acronym, expansion } of acronyms) {
        // The first letter of the acronym starts the expansion ("SIEM", "Security…"),
        // except where X stands for "cross", as in XSS.
        const first = acronym[0] === "X" && expansion.startsWith("Cross") ? "C" : acronym[0];
        if (expansion[0] !== first) problems.push(`D${d} ${acronym}: ${expansion}`);
      }
    }
    expect(problems).toEqual([]);
  });

  it("list only acronyms that the domain's study content uses, in both languages", () => {
    const unused: string[] = [];
    for (const lang of ["it", "en"] as const) {
      for (const d of DOMAIN_IDS) {
        const guide = (lang === "it" ? DOMAIN_GUIDES_IT : DOMAIN_GUIDES_EN)[d];
        const { acronyms, ...rest } = guide;
        const text = [...strings(rest), ...strings(getDomainTopics(d, lang))].map(([, value]) => value).join(" ");
        for (const { acronym } of acronyms) {
          if (!new RegExp(`(?<![A-Za-z])${acronym}(?![a-z])`).test(text)) unused.push(`${lang} D${d} ${acronym}`);
        }
      }
    }
    expect(unused).toEqual([]);
  });

  it("identify each self-assessment point stably and uniquely", () => {
    const ids = DOMAIN_IDS.flatMap((d) => DOMAIN_GUIDES_IT[d].readinessChecks.map((_, i) => readinessCheckId(d, i)));
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(/^D[1-5]-[0-9a-f]{8}$/);
    expect(readinessCheckId(1, 0)).toBe(readinessCheckId(1, 0));
  });
});
