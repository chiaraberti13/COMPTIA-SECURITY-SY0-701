/**
 * Generates docs/objective-coverage.md: every curated sub-topic of the official
 * SY0-701 objectives (1.1–5.6) and whether the app *explains* it — not merely
 * lists it. The content checked is the glossary (entry name, definition,
 * details, exam tip) and the domain guides' teaching text (decision patterns,
 * connections, traps, practice scenarios, comparisons, acronym tables), in IT
 * and EN. The objectives' own `keyTopics`/`outcome` are excluded on purpose: a
 * term that appears only there is listed, not taught.
 *
 * Deterministic output (no dates), so tests/objectiveCoverage.test.ts fails CI
 * when the committed file is stale or coverage regresses. The list of uncovered
 * sub-topics can only shrink; the goal is zero.
 *
 * Usage: npm run objective-coverage
 */
import { writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { getAllTopics, getInitialQuestions, loadEnglishOverlay } from "../src/localizedData";
import { DOMAIN_GUIDES_IT, DOMAIN_GUIDES_EN } from "../src/domainGuides";
import type { Lang } from "../src/i18n";

export const OBJECTIVE_COVERAGE_PATH = path.join("docs", "objective-coverage.md");

/** Curated sub-topics of each SY0-701 objective (code → terms), with IT/EN match synonyms. */
export interface ObjectiveTerm { term: string; match: string[]; }
export const OBJECTIVE_TERMS: Readonly<Record<string, ReadonlyArray<ObjectiveTerm>>> = {
  "1.1": [
    { term: "Deterrent control", match: ["deterrent", "deterrente"] },
    { term: "Compensating control", match: ["compensating", "compensativo"] },
    { term: "Directive control", match: ["directive control", "controllo direttivo", "direttivo", "direttiva"] },
  ],
  "1.2": [
    { term: "Adaptive identity", match: ["adaptive identity", "identità adattiva"] },
    { term: "Threat scope reduction", match: ["threat scope reduction", "threat scope", "scope reduction", "riduzione dell'ambito", "ambito della minaccia"] },
    { term: "Implicit trust zones", match: ["implicit trust", "zone di fiducia implicita"] },
    { term: "Access control vestibule", match: ["vestibule", "vestibolo"] },
    { term: "Bollards", match: ["bollard", "dissuasori"] },
    { term: "Honeynet", match: ["honeynet"] },
    { term: "Honeyfile", match: ["honeyfile"] },
    { term: "Honeytoken", match: ["honeytoken"] },
    { term: "Infrared sensor", match: ["infrared", "infrarossi", "infrarosso"] },
    { term: "Pressure sensor", match: ["pressure sensor", "sensore di pressione", "sensore a pressione"] },
    { term: "Microwave sensor", match: ["microwave", "microonde"] },
    { term: "Ultrasonic sensor", match: ["ultrasonic", "ultrasuoni", "ultrasonico"] },
  ],
  "1.3": [
    { term: "Backout plan", match: ["backout", "piano di rollback", "piano di ritorno"] },
    { term: "Maintenance window", match: ["maintenance window", "finestra di manutenzione"] },
    { term: "SOP", match: ["standard operating procedure", "procedura operativa standard"] },
    { term: "Version control", match: ["version control", "controllo di versione", "versionamento"] },
  ],
  "1.4": [
    { term: "Key escrow", match: ["key escrow"] },
    { term: "Full-disk encryption", match: ["full-disk", "full disk", "intero disco"] },
    { term: "Record-level encryption", match: ["record-level", "a livello di record", "cifratura del record", "per record"] },
    { term: "Key stretching", match: ["key stretching"] },
    { term: "Blockchain", match: ["blockchain"] },
    { term: "Open public ledger", match: ["public ledger", "registro pubblico", "libro mastro"] },
    { term: "Salting", match: ["salting"] },
    { term: "Key length", match: ["key length", "lunghezza della chiave"] },
  ],
  "2.1": [
    { term: "Unskilled attacker", match: ["unskilled", "script kiddie", "inesperto"] },
    { term: "Shadow IT", match: ["shadow it"] },
    { term: "Hacktivist", match: ["hacktivist"] },
    { term: "Nation-state", match: ["nation-state", "stato-nazione"] },
  ],
  "2.2": [
    { term: "Image-based vector", match: ["image-based", "basato su immagine", "immagine malevola", "QR malevolo"] },
    { term: "File-based vector", match: ["file-based", "basato su file", "file malevolo"] },
    { term: "Voice call vector", match: ["voice call", "chiamata vocale", "vettore vocale"] },
    { term: "Removable device", match: ["removable device", "removable media", "supporti rimovibili", "dispositivo rimovibile"] },
    { term: "Typosquatting", match: ["typosquatting"] },
    { term: "Brand impersonation", match: ["brand impersonation", "impersonazione del marchio"] },
    { term: "Watering hole", match: ["watering hole"] },
    { term: "BEC", match: ["business email compromise"] },
    { term: "Misinformation", match: ["misinformation", "disinformazione"] },
  ],
  "2.3": [
    { term: "Memory injection", match: ["memory injection", "iniezione in memoria"] },
    { term: "Race condition TOC/TOU", match: ["time-of-check", "toctou", "race condition", "condizione di competizione"] },
    { term: "Malicious update", match: ["malicious update", "aggiornamento malevolo"] },
    { term: "VM escape", match: ["vm escape", "virtual machine escape"] },
    { term: "Resource reuse", match: ["resource reuse", "riuso delle risorse"] },
    { term: "Side loading", match: ["side loading", "sideloading"] },
    { term: "Jailbreaking", match: ["jailbreak"] },
    { term: "Zero-day", match: ["zero-day", "zero day"] },
  ],
  "2.4": [
    { term: "Bloatware", match: ["bloatware"] },
    { term: "Logic bomb", match: ["logic bomb", "bomba logica"] },
    { term: "Rootkit", match: ["rootkit"] },
    { term: "RFID cloning", match: ["rfid cloning", "clonazione rfid", "clonazione del badge", "clonazione di badge"] },
    { term: "DDoS amplified", match: ["amplified", "amplificazione", "amplificato"] },
    { term: "DDoS reflected", match: ["reflected", "riflesso"] },
    { term: "On-path", match: ["on-path"] },
    { term: "Credential replay", match: ["credential replay", "replay delle credenziali"] },
    { term: "Directory traversal", match: ["directory traversal"] },
    { term: "Birthday attack", match: ["birthday", "compleanno"] },
    { term: "Collision", match: ["collision", "collisione"] },
    { term: "Downgrade", match: ["downgrade"] },
    { term: "Password spraying", match: ["spraying"] },
    { term: "Impossible travel", match: ["impossible travel", "viaggio impossibile"] },
    { term: "Out-of-cycle logging", match: ["out-of-cycle"] },
    { term: "Missing logs", match: ["missing logs", "log mancanti"] },
    { term: "Concurrent session", match: ["concurrent session", "sessioni concorrenti"] },
  ],
  "2.5": [
    { term: "Application allow list", match: ["allow list", "allowlist", "lista di autorizzazione"] },
    { term: "Configuration enforcement", match: ["configuration enforcement", "configuration baseline", "enforcement della configurazione", "applicazione della configurazione", "imposizione della configurazione"] },
    { term: "Decommissioning", match: ["decommission", "dismissione"] },
    { term: "HIPS", match: ["HIPS", "host-based intrusion prevention"] },
    { term: "Least privilege", match: ["least privilege", "privilegio minimo"] },
  ],
  "3.1": [
    { term: "IaC", match: ["infrastructure as code"] },
    { term: "Serverless", match: ["serverless"] },
    { term: "Microservices", match: ["microservices", "microservizi"] },
    { term: "SDN", match: ["SDN", "software-defined networking", "software-defined network", "rete definita dal software"] },
    { term: "Air-gapped", match: ["air-gap", "air gap", "air-gapped", "isolamento fisico", "rete isolata"] },
    { term: "Containerization", match: ["container"] },
    { term: "ICS/SCADA", match: ["scada"] },
    { term: "RTOS", match: ["real-time operating system"] },
    { term: "Embedded systems", match: ["embedded", "integrati"] },
    { term: "Responsibility matrix", match: ["responsibility matrix", "matrice di responsabilità"] },
    { term: "Risk transference", match: ["risk transference", "trasferimento del rischio"] },
  ],
  "3.2": [
    { term: "Jump server", match: ["jump server"] },
    { term: "Proxy server", match: ["proxy server"] },
    { term: "Fail-open/closed", match: ["fail-open", "fail-closed", "fail open", "fail closed"] },
    { term: "Tap/monitor", match: ["tap/monitor", "port mirror", "tap mode"] },
    { term: "WAF", match: ["web application firewall"] },
    { term: "UTM", match: ["unified threat"] },
    { term: "NGFW", match: ["next-generation firewall"] },
    { term: "802.1X", match: ["802.1x"] },
    { term: "SASE", match: ["sase"] },
    { term: "SD-WAN", match: ["sd-wan"] },
  ],
  "3.3": [
    { term: "Data sovereignty", match: ["data sovereignty", "sovranità dei dati"] },
    { term: "Geolocation", match: ["geolocation", "geolocalizzazione"] },
    { term: "Data at rest", match: ["data at rest", "dati a riposo"] },
    { term: "Data in transit", match: ["data in transit", "dati in transito"] },
    { term: "Data in use", match: ["data in use", "dati in uso"] },
    { term: "Trade secret", match: ["trade secret", "segreto commerciale"] },
    { term: "Geographic restrictions", match: ["geographic restriction", "restrizioni geografiche"] },
  ],
  "3.4": [
    { term: "Clustering", match: ["clustering"] },
    { term: "Hot/warm/cold site", match: ["hot site", "warm site", "cold site", "sito caldo", "sito freddo"] },
    { term: "Geographic dispersion", match: ["geographic dispersion", "dispersione geografica"] },
    { term: "Platform diversity", match: ["platform diversity", "diversità di piattaforma"] },
    { term: "Multi-cloud", match: ["multi-cloud"] },
    { term: "Journaling", match: ["journaling"] },
    { term: "Snapshots", match: ["snapshot"] },
    { term: "Replication", match: ["replication", "replica"] },
    { term: "Tabletop exercise", match: ["tabletop"] },
    { term: "Parallel processing", match: ["parallel processing", "elaborazione parallela"] },
    { term: "UPS", match: ["uninterruptible power"] },
    { term: "Generators", match: ["generator", "generatore"] },
  ],
  "4.1": [
    { term: "Secure baselines", match: ["secure baseline", "baseline sicura"] },
    { term: "Site surveys", match: ["site survey", "rilevamento del sito"] },
    { term: "Heat maps", match: ["heat map", "mappa di calore"] },
    { term: "BYOD", match: ["bring your own device"] },
    { term: "COPE", match: ["corporate-owned, personally"] },
    { term: "CYOD", match: ["choose your own device"] },
    { term: "WPA3", match: ["wpa3"] },
    { term: "Input validation", match: ["input validation", "validazione dell'input"] },
    { term: "Secure cookies", match: ["secure cookie", "cookie sicuri"] },
    { term: "Static code analysis", match: ["static code analysis", "SAST", "analisi statica", "analisi del codice statica"] },
    { term: "Code signing", match: ["code signing", "firma del codice"] },
    { term: "Sandboxing", match: ["sandbox"] },
  ],
  "4.2": [
    { term: "Acquisition/procurement", match: ["procurement", "acquisizione", "approvvigionamento"] },
    { term: "Assignment/accounting", match: ["assignment/accounting", "assegnazione"] },
    { term: "Inventory", match: ["inventory", "inventario"] },
    { term: "Enumeration asset", match: ["enumeration", "enumerazione"] },
    { term: "Sanitization", match: ["sanitization", "sanitizzazione"] },
    { term: "Destruction", match: ["destruction", "distruzione"] },
    { term: "Certification disposal", match: ["certification", "certificazione"] },
    { term: "Data retention", match: ["data retention", "conservazione dei dati"] },
  ],
  "4.3": [
    { term: "Package monitoring", match: ["package monitoring", "monitoraggio dei pacchetti"] },
    { term: "OSINT", match: ["osint", "open-source intelligence"] },
    { term: "Dark web", match: ["dark web"] },
    { term: "Penetration testing", match: ["penetration testing"] },
    { term: "Bug bounty", match: ["bug bounty"] },
    { term: "CVSS", match: ["cvss"] },
    { term: "CVE", match: ["cve"] },
    { term: "False positive", match: ["false positive", "falso positivo"] },
    { term: "Exposure factor", match: ["exposure factor", "fattore di esposizione"] },
    { term: "Compensating controls remediation", match: ["compensating control", "controllo compensativo"] },
    { term: "Rescanning", match: ["rescan"] },
  ],
  "4.4": [
    { term: "Log aggregation", match: ["log aggregation", "aggregazione dei log"] },
    { term: "Alert tuning", match: ["alert tuning"] },
    { term: "Quarantine", match: ["quarantine", "quarantena"] },
    { term: "SCAP", match: ["scap"] },
    { term: "Benchmarks", match: ["benchmark"] },
    { term: "SIEM", match: ["siem"] },
    { term: "DLP", match: ["data loss prevention"] },
    { term: "SNMP traps", match: ["snmp trap"] },
    { term: "NetFlow", match: ["netflow"] },
    { term: "Archiving", match: ["archiving", "archiviazione"] },
  ],
  "4.5": [
    { term: "Screened subnets", match: ["screened subnet", "subnet schermata"] },
    { term: "Content categorization", match: ["content categorization", "categorizzazione dei contenuti"] },
    { term: "URL scanning", match: ["URL scanning", "url filtering", "scansione degli URL", "scansione url", "filtraggio degli URL"] },
    { term: "Group Policy", match: ["group policy"] },
    { term: "SELinux", match: ["selinux"] },
    { term: "DNS filtering", match: ["dns filtering", "filtraggio dns"] },
    { term: "DKIM", match: ["dkim"] },
    { term: "SPF", match: ["sender policy framework"] },
    { term: "DMARC", match: ["dmarc"] },
    { term: "FIM", match: ["file integrity"] },
    { term: "NAC", match: ["network access control"] },
    { term: "EDR/XDR", match: ["endpoint detection"] },
    { term: "UBA", match: ["user behavior analytics"] },
  ],
  "4.6": [
    { term: "Provisioning", match: ["provisioning"] },
    { term: "Identity proofing", match: ["identity proofing", "verifica dell'identità"] },
    { term: "Federation", match: ["federation", "federazione"] },
    { term: "SSO", match: ["single sign-on"] },
    { term: "LDAP", match: ["ldap"] },
    { term: "OAuth", match: ["oauth"] },
    { term: "SAML", match: ["saml"] },
    { term: "Attestation", match: ["attestation", "attestazione"] },
    { term: "Mandatory access", match: ["mandatory access"] },
    { term: "Discretionary access", match: ["discretionary access"] },
    { term: "Role-based access", match: ["role-based"] },
    { term: "Rule-based access", match: ["rule-based"] },
    { term: "Attribute-based", match: ["attribute-based"] },
    { term: "Time-of-day restrictions", match: ["time-of-day", "restrizioni orarie"] },
    { term: "Biometrics", match: ["biometric"] },
    { term: "Security keys", match: ["security key", "chiave di sicurezza"] },
    { term: "Passwordless", match: ["passwordless", "senza password"] },
    { term: "JIT permissions", match: ["just-in-time"] },
    { term: "Password vaulting", match: ["password vaulting", "password vault", "cassaforte delle password", "vault delle password"] },
    { term: "Ephemeral credentials", match: ["ephemeral credential", "ephemeral", "credenziali effimere", "credenziali temporanee"] },
  ],
  "4.7": [
    { term: "Guard rails", match: ["guard rail"] },
    { term: "Ticket creation", match: ["ticket creation", "creazione di ticket"] },
    { term: "CI testing", match: ["continuous integration", "CI/CD", "integrazione continua"] },
    { term: "Workforce multiplier", match: ["workforce multiplier", "moltiplicatore di forza lavoro", "moltiplicatore della forza"] },
    { term: "Technical debt", match: ["technical debt", "debito tecnico"] },
    { term: "Single point of failure", match: ["single point of failure", "punto singolo di guasto"] },
  ],
  "4.8": [
    { term: "Containment", match: ["containment", "contenimento"] },
    { term: "Eradication", match: ["eradication", "eradicazione"] },
    { term: "Lessons learned", match: ["lessons learned", "lezioni apprese"] },
    { term: "Root cause analysis", match: ["root cause", "causa radice"] },
    { term: "Threat hunting", match: ["threat hunting"] },
    { term: "Legal hold", match: ["legal hold"] },
    { term: "Chain of custody", match: ["chain of custody", "catena di custodia"] },
    { term: "E-discovery", match: ["e-discovery"] },
    { term: "Preservation forensic", match: ["preservation", "preservazione"] },
  ],
  "4.9": [
    { term: "Firewall logs", match: ["firewall log"] },
    { term: "Endpoint logs", match: ["endpoint log", "log degli endpoint", "log dell'endpoint", "log degli endpoint"] },
    { term: "OS-specific logs", match: ["os-specific", "log del sistema operativo"] },
    { term: "Packet captures", match: ["packet capture", "cattura dei pacchetti"] },
    { term: "Metadata", match: ["metadata", "metadati"] },
  ],
  "5.1": [
    { term: "AUP", match: ["acceptable use policy"] },
    { term: "SDLC policy", match: ["SDLC", "software development lifecycle", "secure development lifecycle", "ciclo di vita dello sviluppo", "ciclo di vita di sviluppo"] },
    { term: "Playbooks", match: ["playbook"] },
    { term: "Onboarding/offboarding", match: ["onboarding", "offboarding"] },
    { term: "Governance structures", match: ["governance structure", "struttura di governance", "comitati"] },
    { term: "Data owners", match: ["data owner", "titolare dei dati"] },
    { term: "Data custodians", match: ["custodian", "custode"] },
  ],
  "5.2": [
    { term: "Risk register", match: ["risk register", "registro dei rischi"] },
    { term: "Key risk indicators", match: ["key risk indicator", "KRI", "indicatori chiave di rischio", "indicatore chiave di rischio"] },
    { term: "Risk tolerance", match: ["risk tolerance", "tolleranza al rischio"] },
    { term: "Risk appetite", match: ["risk appetite", "propensione al rischio"] },
    { term: "SLE", match: ["single loss expectancy"] },
    { term: "ALE", match: ["annualized loss"] },
    { term: "ARO", match: ["annualized rate"] },
    { term: "Risk transfer strategy", match: ["trasferimento", "transfer"] },
    { term: "RTO", match: ["recovery time objective"] },
    { term: "RPO", match: ["recovery point objective"] },
    { term: "MTTR", match: ["mean time to repair", "mean time to recover"] },
    { term: "MTBF", match: ["MTBF", "mean time between", "tempo medio tra i guasti"] },
  ],
  "5.3": [
    { term: "Right-to-audit", match: ["right-to-audit", "right to audit", "diritto di audit"] },
    { term: "Supply chain analysis", match: ["supply chain analysis", "analisi della supply chain"] },
    { term: "Conflict of interest", match: ["conflict of interest", "conflitto di interess"] },
    { term: "SLA", match: ["service-level agreement"] },
    { term: "MOU", match: ["memorandum of understanding"] },
    { term: "MSA", match: ["master service"] },
    { term: "BPA", match: ["business partners agreement"] },
    { term: "Rules of engagement", match: ["rules of engagement", "regole di ingaggio"] },
    { term: "Questionnaires", match: ["questionnaire", "questionari"] },
  ],
  "5.4": [
    { term: "Due diligence/care", match: ["due diligence", "due care"] },
    { term: "Right to be forgotten", match: ["right to be forgotten", "diritto all'oblio"] },
    { term: "Controller vs processor", match: ["controller", "titolare del trattamento"] },
    { term: "Data subject", match: ["data subject", "interessato"] },
    { term: "Loss of license", match: ["loss of license", "perdita della licenza", "revoca della licenza", "perdita di licenza"] },
  ],
  "5.5": [
    { term: "Self-assessments", match: ["self-assessment", "autovalutazione"] },
    { term: "Independent third-party audit", match: ["third-party audit", "indipendente di terza parte"] },
    { term: "Known environment", match: ["known environment", "ambiente noto"] },
    { term: "Unknown environment", match: ["unknown environment", "ambiente sconosciuto"] },
    { term: "Passive reconnaissance", match: ["passive reconnaissance", "ricognizione passiva"] },
    { term: "Active reconnaissance", match: ["active reconnaissance", "ricognizione attiva"] },
  ],
  "5.6": [
    { term: "Phishing campaigns", match: ["phishing campaign", "campagne di phishing"] },
    { term: "Anomalous behavior", match: ["anomalous behavior", "comportamento anomalo"] },
    { term: "Situational awareness", match: ["situational awareness", "consapevolezza situazionale"] },
    { term: "Insider threat", match: ["insider threat", "minaccia interna"] },
    { term: "Operational security", match: ["operational security", "opsec"] },
    { term: "Hybrid/remote work", match: ["remote work", "lavoro remoto", "lavoro ibrido"] },
  ],
};

const LANGS: Lang[] = ["it", "en"];
const GUIDES: Record<Lang, typeof DOMAIN_GUIDES_IT> = { it: DOMAIN_GUIDES_IT, en: DOMAIN_GUIDES_EN };

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Whole-token / whole-phrase match, case-insensitive, Unicode-aware boundaries. */
const mentions = (text: string, phrase: string): boolean =>
  new RegExp(`(?<![\\p{L}\\p{N}])${escapeRegExp(phrase)}(?![\\p{L}\\p{N}])`, "iu").test(text);

/**
 * The teaching content of one language: glossary entries plus the guides'
 * explanatory text, but NOT the objectives' keyTopics/outcome (those are the
 * objective bullets themselves, so matching them would make every term pass).
 */
function teachingText(lang: Lang): string {
  const glossary = Object.values(getAllTopics(lang))
    .flat()
    .flatMap((g) => g.subtopics.filter((s) => !s.deprecated).map((s) => `${s.name}\n${s.definition}\n${s.details}\n${s.examTip}`))
    .join("\n");
  const guideTeaching = Object.values(GUIDES[lang])
    .map(({ objectives: _objectives, ...rest }) => JSON.stringify(rest))
    .join("\n");
  return `${glossary}\n${guideTeaching}`;
}

/** The text of all quiz questions of one language (scenario, stem, options, explanation). */
function questionText(lang: Lang): string {
  return getInitialQuestions(lang)
    .filter((q) => !q.deprecated)
    .map((q) => `${q.scenario}\n${q.question}\n${q.options.join("\n")}\n${q.explanation}`)
    .join("\n");
}

/** Where a sub-topic is explained: a referenceable entry/guide, only a quiz, or nowhere. */
export type Where = "entry" | "quizOnly" | "absent";

export interface ObjectiveCoverage {
  total: number;
  /** Explained in the glossary or a guide (referenceable). */
  covered: number;
  /** Uncovered sub-topics (not referenceable), split by where they are explained. */
  missing: { code: string; term: string; where: Exclude<Where, "entry"> }[];
}

/** Requires loadEnglishOverlay() to have run. */
export function objectiveCoverage(): ObjectiveCoverage {
  const teachByLang = Object.fromEntries(LANGS.map((l) => [l, teachingText(l)])) as Record<Lang, string>;
  const quizByLang = Object.fromEntries(LANGS.map((l) => [l, questionText(l)])) as Record<Lang, string>;
  let total = 0;
  let covered = 0;
  const missing: { code: string; term: string; where: Exclude<Where, "entry"> }[] = [];
  for (const [code, terms] of Object.entries(OBJECTIVE_TERMS)) {
    for (const { term, match } of terms) {
      total += 1;
      const inEntry = match.some((m) => LANGS.some((l) => mentions(teachByLang[l], m)));
      if (inEntry) {
        covered += 1;
        continue;
      }
      const inQuiz = match.some((m) => LANGS.some((l) => mentions(quizByLang[l], m)));
      missing.push({ code, term, where: inQuiz ? "quizOnly" : "absent" });
    }
  }
  return { total, covered, missing };
}

/** Uncovered sub-topics as "code — term", sorted — the shrink-only list. */
export function missingObjectiveTerms(): string[] {
  return objectiveCoverage()
    .missing.map((m) => `${m.code} — ${m.term}`)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
}

const pctOf = (n: number, total: number) => `${((n / total) * 100).toFixed(1)}%`;

function renderGroup(missing: ObjectiveCoverage["missing"], where: Exclude<Where, "entry">): string[] {
  const items = missing.filter((m) => m.where === where);
  if (items.length === 0) return ["Nessuna.", ""];
  const byCode = new Map<string, string[]>();
  for (const m of items) byCode.set(m.code, [...(byCode.get(m.code) ?? []), m.term]);
  const codes = [...byCode.keys()].sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  return codes.flatMap((code) => [`### Obiettivo ${code}`, "", ...byCode.get(code)!.map((t) => `- ${t}`), ""]);
}

export function renderObjectiveCoverage(): string {
  const cov = objectiveCoverage();
  const quizOnly = cov.missing.filter((m) => m.where === "quizOnly").length;
  const absent = cov.missing.filter((m) => m.where === "absent").length;
  const lines: string[] = [
    "# Copertura delle voci di obiettivo SY0-701",
    "",
    "<!-- Generato da scripts/objective-coverage.ts: non modificare a mano, esegui `npm run objective-coverage`. -->",
    "",
    "Ogni sotto-argomento curato degli obiettivi ufficiali (1.1–5.6) e dove l'app lo **spiega**. Il",
    "contenuto di riferimento è il glossario (nome, definizione, dettagli, exam tip) e il testo didattico",
    "delle guide (decision pattern, collegamenti, trappole, scenari, confronti, tabelle degli acronimi),",
    "in IT ed EN. I `keyTopics` e gli `outcome` degli obiettivi sono esclusi apposta: un termine che",
    "compare solo lì è elencato, non spiegato. Per le voci non ancora nel glossario/guida si distingue se",
    "sono comunque spiegate in una **domanda** del quiz (da promuovere a voce ricercabile) o **assenti**",
    "del tutto (gap di contenuto). L'elenco può solo accorciarsi; l'obiettivo è zero.",
    "",
    "> **English summary.** Each curated sub-topic of the official SY0-701 objectives and where the app",
    "> *teaches* it: a referenceable glossary entry / guide passage, only a quiz explanation, or nowhere.",
    "> Generated by `scripts/objective-coverage.ts`; `tests/objectiveCoverage.test.ts` keeps it current",
    "> and the list of not-yet-referenceable sub-topics can only shrink.",
    "",
    "## Riepilogo",
    "",
    "| Metrica | Conteggio | Quota |",
    "|---|---|---|",
    `| Voci di obiettivo curate | ${cov.total} | 100% |`,
    `| Spiegate come voce (glossario o guida) | ${cov.covered} | ${pctOf(cov.covered, cov.total)} |`,
    `| Spiegate solo in una domanda | ${quizOnly} | ${pctOf(quizOnly, cov.total)} |`,
    `| Assenti (gap di contenuto) | ${absent} | ${pctOf(absent, cov.total)} |`,
    "",
    "## Assenti — gap di contenuto da colmare",
    "",
    "Voci non trattate né nel glossario/guida né in una domanda: priorità (collegate alle attività 31–32).",
    "",
    ...renderGroup(cov.missing, "absent"),
    "## Spiegate solo in una domanda — da promuovere a voce ricercabile",
    "",
    "Voci spiegate in una spiegazione di quiz ma senza voce di glossario o passaggio di guida dedicato:",
    "renderle ricercabili come voce autonoma.",
    "",
    ...renderGroup(cov.missing, "quizOnly"),
  ];
  return lines.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await loadEnglishOverlay();
  writeFileSync(OBJECTIVE_COVERAGE_PATH, renderObjectiveCoverage());
  console.log(`Written ${OBJECTIVE_COVERAGE_PATH}`);
}
