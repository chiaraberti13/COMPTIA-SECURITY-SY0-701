import type { Lang } from "./i18n";
import type { TopicGroup } from "./types";

interface CompletionEntry {
  domain: number;
  objective: string;
  key: string;
  name: Record<Lang, string>;
  definition: Record<Lang, string>;
  details: Record<Lang, string>;
  tip: Record<Lang, string>;
}

/** Residual objective bullets promoted from quiz-only explanations to referenceable study entries. */
export const OBJECTIVE_COMPLETION_ENTRIES: readonly CompletionEntry[] = [
  {
    domain: 1, objective: "1.2", key: "ThreatScopeReduction",
    name: { it: "Riduzione dell'ambito della minaccia (Threat Scope Reduction)", en: "Threat Scope Reduction" },
    definition: {
      it: "Principio Zero Trust che limita risorse, percorsi e durata raggiungibili da un'identità compromessa, riducendo il raggio d'azione dell'attaccante.",
      en: "A Zero Trust principle that limits the resources, paths, and duration reachable by a compromised identity, reducing an attacker's blast radius.",
    },
    details: {
      it: "Non significa soltanto segmentare la rete: decisioni per richiesta, privilegio minimo, microsegmentazione e credenziali brevi impediscono che una singola compromissione apra un'intera zona implicita. La riduzione si misura confrontando ciò che il soggetto può raggiungere prima e dopo la policy. **Piccolo Esempio Concentrato:** un portatile commerciale compromesso può usare il solo CRM assegnato, ma non enumerare HR o amministrazione. Fonte primaria: NIST SP 800-207.",
      en: "It is more than network segmentation: per-request decisions, least privilege, microsegmentation, and short-lived credentials prevent one compromise from opening an entire implicit zone. Reduction is measured by comparing what the subject can reach before and after policy. **Focused Mini-Example:** a compromised sales laptop can use only its assigned CRM, but cannot enumerate HR or finance. Primary source: NIST SP 800-207.",
    },
    tip: { it: "Zero Trust riduce il blast radius; non promette che la compromissione iniziale sia impossibile.", en: "Zero Trust reduces blast radius; it does not promise that initial compromise is impossible." },
  },
  {
    domain: 1, objective: "1.4", key: "RecordLevelEncryption",
    name: { it: "Cifratura a livello di record (Record-level Encryption)", en: "Record-level Encryption" },
    definition: {
      it: "Cifratura selettiva applicata a singoli record o campi, con granularità più fine rispetto alla cifratura di database, volume o disco.",
      en: "Selective encryption applied to individual records or fields, providing finer granularity than database, volume, or full-disk encryption.",
    },
    details: {
      it: "Protegge dati sensibili anche quando il database è operativo, purché la chiave sia separata dal DBA e la decifratura sia autorizzata dall'applicazione o da un servizio di chiavi. Comporta costi su ricerca, indicizzazione, rotazione e backup: non sostituisce TLS né la cifratura del supporto. **Piccolo Esempio Concentrato:** la diagnosi clinica resta cifrata nella tabella e viene decifrata solo per il medico autorizzato; il DBA vede ciphertext. Il controllo corrisponde alla protezione delle informazioni a riposo di NIST SP 800-53, SC-28.",
      en: "It protects sensitive data while the database is running, provided the key is separated from the DBA and decryption is authorized by the application or a key service. It adds search, indexing, rotation, and backup costs; it does not replace TLS or media encryption. **Focused Mini-Example:** a clinical diagnosis remains encrypted in its table and is decrypted only for the authorized clinician; the DBA sees ciphertext. The control aligns with NIST SP 800-53, SC-28 information-at-rest protection.",
    },
    tip: { it: "Granularità e controllo della chiave sono entrambi necessari: una chiave accessibile al DBA annulla il confine.", en: "Both granularity and key control matter: a DBA-accessible key defeats the boundary." },
  },
  {
    domain: 2, objective: "2.5", key: "ConfigurationEnforcement",
    name: { it: "Imposizione della configurazione (Configuration Enforcement)", en: "Configuration Enforcement" },
    definition: {
      it: "Applicazione continua e verificabile di uno stato di configurazione approvato, con prevenzione o correzione automatica delle deviazioni.",
      en: "Continuous, verifiable application of an approved configuration state, automatically preventing or correcting drift.",
    },
    details: {
      it: "Una baseline descrive lo stato desiderato; l'enforcement lo rende effettivo tramite GPO, MDM, policy-as-code o strumenti di configuration management. Servono rilevamento del drift, eccezioni con scadenza, remediation e prova del risultato. **Piccolo Esempio Concentrato:** un utente disattiva il firewall locale; la policy MDM lo riattiva e registra la non conformità. Fonte primaria: NIST SP 800-128.",
      en: "A baseline describes the desired state; enforcement makes it effective through GPO, MDM, policy as code, or configuration-management tools. It requires drift detection, expiring exceptions, remediation, and evidence of the result. **Focused Mini-Example:** a user disables the local firewall; MDM policy restores it and records noncompliance. Primary source: NIST SP 800-128.",
    },
    tip: { it: "Baseline = stato atteso; enforcement = meccanismo che lo mantiene e dimostra.", en: "Baseline is the expected state; enforcement is the mechanism that maintains and proves it." },
  },
  {
    domain: 4, objective: "4.6", key: "PasswordVaulting",
    name: { it: "Cassaforte delle password (Password Vaulting)", en: "Password Vaulting" },
    definition: {
      it: "Custodia centralizzata e cifrata delle credenziali, con accesso controllato, audit, rotazione e rilascio senza esporre inutilmente il segreto.",
      en: "Centralized encrypted custody of credentials with controlled access, auditing, rotation, and checkout without unnecessary secret exposure.",
    },
    details: {
      it: "Nel PAM il vault protegge soprattutto account privilegiati e condivisi: approvazione, MFA, session recording e rotazione dopo l'uso riducono segreti statici e non attribuibili. Non è sinonimo di credenziale effimera: un vault può conservare una password persistente, mentre JIT decide quando concedere il privilegio. **Piccolo Esempio Concentrato:** l'amministratore avvia dal vault una sessione sul server senza leggere la password root; al termine la password ruota. Riferimento ai controlli IA-5 e AC-2 di NIST SP 800-53.",
      en: "In PAM, the vault primarily protects privileged and shared accounts: approval, MFA, session recording, and post-use rotation reduce static, unattributable secrets. It is not synonymous with an ephemeral credential: a vault may hold a persistent password, while JIT decides when privilege is granted. **Focused Mini-Example:** an administrator launches a server session from the vault without seeing the root password; the password rotates afterward. See NIST SP 800-53 controls IA-5 and AC-2.",
    },
    tip: { it: "Vaulting protegge il segreto; JIT limita il tempo del privilegio; le credenziali effimere scadono automaticamente.", en: "Vaulting protects the secret; JIT limits privilege duration; ephemeral credentials expire automatically." },
  },
  {
    domain: 4, objective: "4.7", key: "WorkforceMultiplier",
    name: { it: "Moltiplicatore della forza lavoro (Workforce Multiplier)", en: "Workforce Multiplier" },
    definition: {
      it: "Beneficio dell'automazione che aumenta capacità, coerenza e velocità del team senza sostituire il giudizio umano nei casi ambigui.",
      en: "An automation benefit that increases a team's capacity, consistency, and speed without replacing human judgment in ambiguous cases.",
    },
    details: {
      it: "Playbook e orchestrazione eliminano passaggi ripetitivi, raccolgono contesto e applicano guard rail; gli analisti conservano escalation, eccezioni e decisioni ad alto impatto. Il beneficio va misurato con tempo risparmiato, volume gestito, errori e qualità, non con il solo numero di azioni automatiche. **Piccolo Esempio Concentrato:** un playbook arricchisce cento alert con reputazione IP e cronologia utente, mentre l'analista indaga i cinque casi anomali.",
      en: "Playbooks and orchestration remove repetitive steps, collect context, and apply guardrails; analysts retain escalations, exceptions, and high-impact decisions. Measure the benefit through time saved, handled volume, errors, and quality—not merely the number of automated actions. **Focused Mini-Example:** a playbook enriches one hundred alerts with IP reputation and user history while the analyst investigates the five anomalous cases.",
    },
    tip: { it: "Moltiplicare non significa rimpiazzare: automatizza il ripetibile e mantieni approvazione umana per azioni rischiose.", en: "Multiplying does not mean replacing: automate repeatable work and retain human approval for risky actions." },
  },
  {
    domain: 5, objective: "5.2", key: "KeyRiskIndicators",
    name: { it: "Key Risk Indicators (KRI)", en: "Key Risk Indicators (KRI)" },
    definition: {
      it: "Metriche associate a un rischio che segnalano variazioni dell'esposizione rispetto a soglie definite e attivano escalation o trattamento.",
      en: "Metrics tied to a risk that signal exposure changes against defined thresholds and trigger escalation or treatment.",
    },
    details: {
      it: "Un KRI deve avere proprietario, fonte dati, frequenza, soglia e azione prevista. Può essere anticipatore, come l'aumento degli account senza MFA, o consuntivo, come incidenti già avvenuti; non ogni KPI operativo è un KRI. **Piccolo Esempio Concentrato:** oltre il 2% di backup falliti per due giorni, il risk owner apre una remediation prima che l'obiettivo di recupero sia compromesso. Fonte primaria: NISTIR 8286D.",
      en: "A KRI needs an owner, data source, cadence, threshold, and prescribed action. It may be leading, such as growth in accounts without MFA, or lagging, such as incidents already observed; not every operational KPI is a KRI. **Focused Mini-Example:** when failed backups exceed 2% for two days, the risk owner opens remediation before the recovery objective is jeopardized. Primary source: NISTIR 8286D.",
    },
    tip: { it: "Il KRI segnala l'esposizione al rischio; la soglia stabilisce quando intervenire; il KPI misura una prestazione.", en: "A KRI signals risk exposure; the threshold says when to act; a KPI measures performance." },
  },
] as const;

export function objectiveCompletionTopics(domainId: number, lang: Lang): TopicGroup[] {
  const entries = OBJECTIVE_COMPLETION_ENTRIES.filter((entry) => entry.domain === domainId);
  if (entries.length === 0) return [];
  return entries.map((entry) => ({
    title: lang === "it" ? `Completamento obiettivo ${entry.objective}` : `Objective ${entry.objective} completion`,
    description: lang === "it" ? "Voce autonoma verificata dall'audit di copertura SY0-701." : "Standalone entry verified by the SY0-701 coverage audit.",
    icon: "CircleCheckBig",
    subtopics: [{
      name: entry.name[lang], checklistKey: entry.key, definition: entry.definition[lang],
      details: entry.details[lang], examTip: entry.tip[lang],
    }],
  }));
}
