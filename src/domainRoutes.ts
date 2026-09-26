/**
 * Where each domain sits in the study sequence: what to know before starting
 * it and where to continue once it is done. A step with an action takes the
 * learner there (usually an objective of another domain's guide); a step
 * without one is background knowledge outside the syllabus. Italian and
 * English share each step, so the two languages cannot drift apart
 * (tests/domainRoutes.test.ts).
 */
import type { Lang } from "./i18n";
import type { StudyAction } from "./studyPaths";

export type DomainId = 1 | 2 | 3 | 4 | 5;

interface RouteStepSource {
  it: string;
  en: string;
  action?: StudyAction;
}

export interface RouteStep {
  text: string;
  action?: StudyAction;
}

export interface DomainRoute {
  /** What to know before starting the domain. */
  before: RouteStep[];
  /** Where to continue once the domain is done. */
  next: RouteStep[];
}

const guide = (objective: string): StudyAction => ({
  kind: "guide",
  domain: Number(objective[0]) as DomainId,
  objective,
});

export const DOMAIN_ROUTES: Record<DomainId, { before: RouteStepSource[]; next: RouteStepSource[] }> = {
  1: {
    before: [
      {
        it: "Basi di rete: modello TCP/IP, indirizzi IP e porte più comuni (22, 53, 80, 443). Il Dominio 1 è il punto di partenza e non richiede altri domini.",
        en: "Networking basics: the TCP/IP model, IP addresses and the most common ports (22, 53, 80, 443). Domain 1 is the starting point and needs no other domain.",
      },
      {
        it: "Basi di sistemi operativi: utenti, permessi sui file, processi e registri eventi su Windows e Linux.",
        en: "Operating system basics: users, file permissions, processes and event logs on Windows and Linux.",
      },
    ],
    next: [
      {
        it: "Usa i tipi di controllo per classificare le mitigazioni contro minacce reali.",
        en: "Use the control types to classify the mitigations against real threats.",
        action: guide("2.5"),
      },
      {
        it: "Applica la crittografia ai dati at rest, in transit e in use.",
        en: "Apply cryptography to data at rest, in transit and in use.",
        action: guide("3.3"),
      },
      {
        it: "Trasforma AAA e zero trust in policy concrete di gestione delle identità.",
        en: "Turn AAA and zero trust into concrete identity management policies.",
        action: guide("4.6"),
      },
    ],
  },
  2: {
    before: [
      {
        it: "Categorie e tipi di controllo: servono per classificare ogni mitigazione del dominio.",
        en: "Control categories and types: you need them to classify every mitigation in the domain.",
        action: guide("1.1"),
      },
      {
        it: "Hashing, cifratura e PKI: senza di loro non si riconoscono gli attacchi crittografici come downgrade e collisioni.",
        en: "Hashing, encryption and PKI: without them you cannot recognize cryptographic attacks such as downgrade and collision.",
        action: guide("1.4"),
      },
      {
        it: "Porte e protocolli comuni: molti indicatori sono traffico anomalo su una porta o un protocollo.",
        en: "Common ports and protocols: many indicators are unusual traffic on a port or protocol.",
      },
    ],
    next: [
      {
        it: "Dalle vulnerabilità alla loro gestione: scansione, CVSS, priorità e verifica della correzione.",
        en: "From vulnerabilities to managing them: scanning, CVSS, prioritization and validation of the fix.",
        action: guide("4.3"),
      },
      {
        it: "Dagli indicatori alla risposta agli incidenti: contenimento, eradicazione e lezioni apprese.",
        en: "From indicators to incident response: containment, eradication and lessons learned.",
        action: guide("4.8"),
      },
      {
        it: "Dai vettori della supply chain alla valutazione dei fornitori.",
        en: "From supply chain vectors to vendor assessment.",
        action: guide("5.3"),
      },
    ],
  },
  3: {
    before: [
      {
        it: "Zero trust e sicurezza fisica: sono la base dei modelli architetturali e della segmentazione.",
        en: "Zero trust and physical security: they are the basis of architecture models and segmentation.",
        action: guide("1.2"),
      },
      {
        it: "Cifratura, hashing e PKI: servono per scegliere come proteggere i dati.",
        en: "Encryption, hashing and PKI: you need them to choose how to protect data.",
        action: guide("1.4"),
      },
      {
        it: "Tipi di vulnerabilità: servono per valutare la superficie d'attacco di cloud, IoT e ICS.",
        en: "Vulnerability types: you need them to assess the attack surface of cloud, IoT and ICS.",
        action: guide("2.3"),
      },
    ],
    next: [
      {
        it: "Dall'architettura alla configurazione sicura: baseline e hardening di ogni sistema.",
        en: "From architecture to secure configuration: baselines and hardening of every system.",
        action: guide("4.1"),
      },
      {
        it: "Firewall, IDS, IPS e filtri web: come si configurano i punti di enforcement progettati.",
        en: "Firewalls, IDS, IPS and web filters: how the designed enforcement points are configured.",
        action: guide("4.5"),
      },
      {
        it: "BIA, RTO e RPO: da dove vengono i requisiti di resilienza.",
        en: "BIA, RTO and RPO: where the resilience requirements come from.",
        action: guide("5.2"),
      },
    ],
  },
  4: {
    before: [
      {
        it: "AAA, zero trust e modelli di autorizzazione: diventano le policy di IAM.",
        en: "AAA, zero trust and authorization models: they become the IAM policies.",
        action: guide("1.2"),
      },
      {
        it: "Indicatori di attività malevola: sono ciò che il monitoraggio deve rilevare.",
        en: "Indicators of malicious activity: they are what monitoring must detect.",
        action: guide("2.4"),
      },
      {
        it: "Segmentazione e posizionamento dei dispositivi di rete: decidono quali log esistono.",
        en: "Segmentation and placement of network devices: they decide which logs exist.",
        action: guide("3.2"),
      },
    ],
    next: [
      {
        it: "Dalle procedure operative alle policy e agli standard che le governano.",
        en: "From operational procedures to the policies and standards that govern them.",
        action: guide("5.1"),
      },
      {
        it: "Rischio residuo, eccezioni e registro dei rischi per le vulnerabilità non corrette.",
        en: "Residual risk, exceptions and the risk register for unpatched vulnerabilities.",
        action: guide("5.2"),
      },
      {
        it: "Audit e penetration test: come si verifica che i controlli funzionino davvero.",
        en: "Audits and penetration tests: how to verify that the controls really work.",
        action: guide("5.5"),
      },
    ],
  },
  5: {
    before: [
      {
        it: "Categorie e tipi di controllo: il trattamento del rischio sceglie tra di essi.",
        en: "Control categories and types: risk treatment chooses among them.",
        action: guide("1.1"),
      },
      {
        it: "Vettori di minaccia e social engineering: sono il motivo della formazione di sensibilizzazione.",
        en: "Threat vectors and social engineering: they are the reason for awareness training.",
        action: guide("2.2"),
      },
      {
        it: "Backup, alta disponibilità e continuità operativa: realizzano i requisiti della BIA.",
        en: "Backups, high availability and continuity of operations: they meet the BIA requirements.",
        action: guide("3.4"),
      },
    ],
    next: [
      {
        it: "Hai completato il syllabus: fai una simulazione di 90 domande con il timer.",
        en: "You have completed the syllabus: take a simulation of 90 questions with the timer.",
        action: { kind: "exam" },
      },
      {
        it: "Ripassa ogni giorno le domande in scadenza fino al giorno dell'esame.",
        en: "Review the due questions every day until exam day.",
        action: { kind: "review" },
      },
      {
        it: "Allena gli obiettivi dove sbagli di più con il quiz per singolo obiettivo.",
        en: "Train the objectives where you make the most mistakes with the single-objective quiz.",
        action: { kind: "objective" },
      },
    ],
  },
};

export function getDomainRoute(domainId: number, lang: Lang): DomainRoute {
  const source = DOMAIN_ROUTES[domainId as DomainId];
  const localize = (step: RouteStepSource): RouteStep => ({ text: step[lang], action: step.action });
  return { before: source.before.map(localize), next: source.next.map(localize) };
}
