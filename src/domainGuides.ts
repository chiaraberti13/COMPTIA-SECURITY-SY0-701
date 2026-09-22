import type { Lang } from "./i18n";

export interface DomainGuide {
  domainId: number;
  title: string;
  weight: number;
  purpose: string;
  objectives: { code: string; outcome: string }[];
  studyPath: { title: string; rationale: string }[];
  decisionPatterns: string[];
  connections: string[];
  readinessChecks: string[];
}

const IT_DOMAIN_GUIDES: Record<number, DomainGuide> = {
  1: {
    domainId: 1,
    title: "Concetti generali di sicurezza",
    weight: 12,
    purpose: "Costruisce il linguaggio decisionale dell'intero esame: classificare i controlli, collegare CIA e non ripudio alle tecnologie appropriate, governare il cambiamento e scegliere primitive crittografiche in base al requisito. Non basta ricordare una definizione: occorre riconoscere quale proprietà manca e quale controllo la ripristina.",
    objectives: [
      { code: "1.1", outcome: "Distinguere categorie e tipi di controllo, separando lo scopo del controllo dal modo in cui viene implementato." },
      { code: "1.2", outcome: "Applicare CIA, autenticazione, autorizzazione, accounting, non ripudio, zero trust, gap analysis e deception a uno scenario." },
      { code: "1.3", outcome: "Valutare un cambiamento sicuro: ownership, impatto, approvazione, test, rollback, documentazione e monitoraggio." },
      { code: "1.4", outcome: "Selezionare algoritmi, hashing, firma, certificati e gestione delle chiavi in funzione di confidenzialità, integrità e identità." },
    ],
    studyPath: [
      { title: "1. Parti dal requisito", rationale: "Per ogni scenario chiediti se il bisogno primario è confidenzialità, integrità, disponibilità, autenticità o non ripudio." },
      { title: "2. Classifica il controllo", rationale: "Identifica prima la categoria (manageriale, operativa, tecnica o fisica), poi il tipo (preventivo, detective, correttivo, deterrente, compensativo o direttivo)." },
      { title: "3. Collega la crittografia al caso d'uso", rationale: "Cifratura protegge la confidenzialità; hashing rileva modifiche; MAC aggiunge autenticità condivisa; firma digitale offre integrità, autenticità e non ripudio." },
      { title: "4. Inserisci il cambiamento nel ciclo di vita", rationale: "Una modifica sicura comprende baseline, analisi d'impatto, approvazione, test, piano di rollback, aggiornamento della documentazione e verifica post-implementazione." },
    ],
    decisionPatterns: [
      "Se la domanda chiede la BEST soluzione, traduci prima il requisito nella proprietà di sicurezza richiesta; solo dopo confronta le tecnologie.",
      "Un controllo compensativo riduce il rischio quando il controllo principale non è fattibile: non è automaticamente equivalente né una deroga senza approvazione.",
      "Per le firme, il mittente firma con la propria chiave privata e il destinatario verifica con la chiave pubblica del mittente; cifrare con la chiave pubblica del destinatario risolve invece la confidenzialità.",
    ],
    connections: [
      "La classificazione dei controlli sostiene mitigazioni (D2), architettura (D3), hardening e monitoring (D4), governance e risk treatment (D5).",
      "PKI e gestione delle chiavi ricompaiono in TLS, autenticazione, protezione dei dati, incident response e continuità operativa.",
      "Il change management collega governance, configurazioni sicure, vulnerabilità introdotte e capacità di rollback.",
    ],
    readinessChecks: [
      "Sai distinguere categoria e tipo dello stesso controllo senza confonderli.",
      "Sai motivare la scelta tra hashing, MAC, firma digitale e cifratura.",
      "Sai ordinare un cambiamento dal requisito alla verifica post-implementazione.",
    ],
  },
  2: {
    domainId: 2,
    title: "Minacce, vulnerabilità e mitigazioni",
    weight: 22,
    purpose: "Trasforma indicatori tecnici e contesto aziendale in una catena di ragionamento: attore e motivazione → vettore e superficie → vulnerabilità → indicatori → mitigazione. L'obiettivo è distinguere la causa dall'effetto e scegliere il controllo più specifico che interrompe l'attacco.",
    objectives: [
      { code: "2.1", outcome: "Confrontare attori, attributi e motivazioni per stimare capacità, intento, accesso e probabilità." },
      { code: "2.2", outcome: "Analizzare vettori e superfici di attacco, inclusi social engineering, supply chain, cloud, wireless e removable media." },
      { code: "2.3", outcome: "Riconoscere vulnerabilità applicative, hardware, cloud, virtualizzazione, mobile, crittografiche e di configurazione." },
      { code: "2.4", outcome: "Interpretare indicatori di malware, attacchi di rete, credenziali, applicazioni e comportamenti anomali." },
      { code: "2.5", outcome: "Selezionare mitigazioni coerenti con il vettore: segmentation, hardening, patching, least privilege, allowlisting, isolamento e monitoring." },
    ],
    studyPath: [
      { title: "1. Modella l'avversario", rationale: "Capacità, risorse, sofisticazione, accesso interno/esterno e motivazione cambiano sia la probabilità sia i controlli prioritari." },
      { title: "2. Segui il percorso d'attacco", rationale: "Separa initial access, execution, persistence, privilege escalation, lateral movement, command and control ed exfiltration." },
      { title: "3. Leggi gli indicatori in contesto", rationale: "Un singolo evento raramente prova un incidente; correla identità, host, rete, orario, baseline e intelligence." },
      { title: "4. Mitiga causa e propagazione", rationale: "Preferisci il controllo che rimuove o riduce la vulnerabilità; aggiungi segmentazione e rilevamento per limitare blast radius e tempo di permanenza." },
    ],
    decisionPatterns: [
      "Non confondere vettore, vulnerabilità ed exploit: il vettore è il percorso, la vulnerabilità è la debolezza, l'exploit è il mezzo che la sfrutta.",
      "Per FIRST action durante un attacco attivo, valuta sicurezza delle persone e contenimento; per la correzione permanente, rimuovi la causa e verifica l'efficacia.",
      "Una mitigazione è migliore quando interrompe la tecnica osservata con il minor impatto operativo accettabile, non quando è semplicemente il controllo più potente.",
    ],
    connections: [
      "Le mitigazioni dipendono dai modelli architetturali e dai trust boundary del D3.",
      "Indicatori, vulnerability management, SIEM e incident response diventano processi operativi nel D4.",
      "Threat intelligence, risk appetite e priorità di remediation dipendono da governance e rischio del D5.",
    ],
    readinessChecks: [
      "Sai ricostruire una kill chain essenziale partendo da log e sintomi.",
      "Sai distinguere una vulnerabilità da un indicatore della sua exploitation.",
      "Sai motivare una mitigazione primaria e un controllo compensativo per lo stesso scenario.",
    ],
  },
  3: {
    domainId: 3,
    title: "Architettura di sicurezza",
    weight: 18,
    purpose: "Richiede di progettare protezioni coerenti con modelli cloud, on-premises, ibridi, virtualizzati e zero trust. Ogni scelta va valutata rispetto a trust boundary, responsabilità condivise, flussi di dati, disponibilità, scalabilità e superficie d'attacco.",
    objectives: [
      { code: "3.1", outcome: "Confrontare modelli e infrastrutture: cloud service model, deployment model, virtualizzazione, container, IoT/OT, serverless e IaC." },
      { code: "3.2", outcome: "Applicare principi di sicurezza a segmentazione, zone, accesso remoto, dispositivi di rete, protocolli e trust boundary." },
      { code: "3.3", outcome: "Proteggere i dati per stato, classificazione e ciclo di vita mediante cifratura, tokenizzazione, masking, DLP e access control." },
      { code: "3.4", outcome: "Progettare resilienza e recovery con ridondanza, clustering, backup, siti alternativi, testing e obiettivi RTO/RPO." },
    ],
    studyPath: [
      { title: "1. Disegna confini e flussi", rationale: "Individua utenti, workload, dati, ingressi/uscite, control plane, data plane e passaggi tra livelli di fiducia." },
      { title: "2. Assegna le responsabilità", rationale: "Nel cloud il provider protegge l'infrastruttura sottostante, mentre il cliente conserva responsabilità variabili su dati, identità, configurazioni e workload." },
      { title: "3. Applica difesa in profondità", rationale: "Combina identità, segmentation, secure protocols, hardening, monitoring e protezione dei dati senza affidarti a un solo perimetro." },
      { title: "4. Progetta per il guasto", rationale: "Allinea alta disponibilità e disaster recovery al BIA: RTO guida il tempo di ripristino, RPO la perdita di dati tollerabile, MTD il limite massimo sostenibile." },
    ],
    decisionPatterns: [
      "Zero trust non significa fidarsi della rete interna: verifica esplicitamente, applica least privilege e valuta continuamente identità, dispositivo, risorsa e contesto.",
      "Alta disponibilità mantiene il servizio durante guasti locali; disaster recovery ripristina capacità dopo un evento maggiore. Possono coesistere ma non sono sinonimi.",
      "La segmentazione limita il movimento laterale solo se i flussi tra segmenti sono esplicitamente controllati e monitorati.",
    ],
    connections: [
      "I requisiti crittografici del D1 diventano scelte concrete per dati at rest, in transit e in use.",
      "Le vulnerabilità del D2 permettono di valutare superficie d'attacco e controlli compensativi dell'architettura.",
      "Monitoring e IAM del D4 rendono operativi zero trust e segmentation; BIA e governance del D5 stabiliscono i requisiti di resilienza.",
    ],
    readinessChecks: [
      "Sai delimitare responsabilità cliente/provider in IaaS, PaaS e SaaS.",
      "Sai scegliere tra segmentazione, isolamento, ridondanza e recovery in base al requisito.",
      "Sai derivare una soluzione di backup e sito alternativo da RTO, RPO e MTD.",
    ],
  },
  4: {
    domainId: 4,
    title: "Operazioni di sicurezza",
    weight: 28,
    purpose: "È il dominio più pesante e più orientato all'azione. Misura la capacità di rendere operativi i controlli: hardening, asset e vulnerability management, IAM, monitoring, automazione, analisi dei log e incident response. Nelle domande FIRST/NEXT, l'ordine delle azioni è spesso decisivo.",
    objectives: [
      { code: "4.1", outcome: "Applicare baseline, hardening, patching, secure configuration e protezioni per endpoint, mobile, wireless, applicazioni e cloud." },
      { code: "4.2", outcome: "Gestire inventario, ownership, classificazione, ciclo di vita, sanitizzazione e dismissione degli asset." },
      { code: "4.3", outcome: "Eseguire vulnerability management dal discovery alla prioritizzazione, remediation, rescansione, reporting ed eccezioni." },
      { code: "4.4", outcome: "Analizzare alert e attività con log, SIEM, scansioni, intelligence e baseline per distinguere segnale e rumore." },
      { code: "4.5", outcome: "Configurare controlli enterprise quali firewall, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR e proxy." },
      { code: "4.6", outcome: "Implementare IAM: provisioning, federation, MFA, authorization, least privilege, access review e deprovisioning." },
      { code: "4.7", outcome: "Usare automazione e orchestrazione valutando repeatability, velocità, integrazioni, errori e rischio di propagazione." },
      { code: "4.8", outcome: "Applicare incident response e forensics preservando evidenze, comunicazioni, contenimento e ritorno controllato in produzione." },
      { code: "4.9", outcome: "Interpretare fonti dati e log di rete, autenticazione, endpoint, applicazioni, cloud, DNS ed email." },
    ],
    studyPath: [
      { title: "1. Conosci lo stato normale", rationale: "Inventario, ownership, baseline e sincronizzazione temporale rendono interpretabili vulnerabilità, drift, log e alert." },
      { title: "2. Riduci preventivamente l'esposizione", rationale: "Applica hardening, patching, least privilege, segmentation e secure configuration secondo criticità e compatibilità." },
      { title: "3. Correlazione prima della conclusione", rationale: "Valida un alert usando più fonti, timeline, identità, host e contesto; preserva i dati volatili quando la risposta forense lo richiede." },
      { title: "4. Rispondi in ordine", rationale: "Segui preparation; detection/analysis; containment; eradication; recovery; lessons learned, adattando il contenimento a sicurezza, impatto e autorizzazioni." },
    ],
    decisionPatterns: [
      "FIRST non significa sempre spegnere: prima valida l'evento e considera evidenze volatili, safety e piano di risposta; durante un attacco confermato, contiene per limitare il danno.",
      "Una scansione identifica potenziali debolezze; la validazione riduce i falsi positivi; la prioritizzazione combina severità, exploitability, esposizione, valore dell'asset e contesto aziendale.",
      "Autenticazione prova chi sei, autorizzazione decide cosa puoi fare, accounting registra cosa hai fatto; MFA richiede fattori di categorie diverse.",
    ],
    connections: [
      "Le primitive e i controlli del D1 diventano configurazioni, procedure e verifiche operative.",
      "TTP, vulnerabilità e indicatori del D2 alimentano detection engineering, threat hunting e prioritizzazione.",
      "Architettura del D3 determina log disponibili e punti di enforcement; governance del D5 determina escalation, retention, evidence handling e reporting.",
    ],
    readinessChecks: [
      "Sai ordinare le fasi di incident response e giustificare la FIRST action.",
      "Sai correlare almeno tre fonti di log su una timeline coerente.",
      "Sai prioritizzare vulnerabilità oltre il solo punteggio CVSS e verificare la remediation.",
      "Sai distinguere authentication, authorization, federation, provisioning e access review.",
    ],
  },
  5: {
    domainId: 5,
    title: "Gestione e supervisione del programma di sicurezza",
    weight: 20,
    purpose: "Collega obiettivi aziendali, rischio e controlli. Richiede di distinguere governance, policy, standard, procedure e linee guida; quantificare o qualificare il rischio; gestire terze parti, compliance, privacy, audit e awareness con evidenze verificabili.",
    objectives: [
      { code: "5.1", outcome: "Stabilire governance con ruoli, responsabilità, policy hierarchy, reporting, data ownership e allineamento alla strategia." },
      { code: "5.2", outcome: "Gestire il rischio: identificazione, analisi, registro, appetite/tolerance, risposte, owner, monitoraggio e BIA." },
      { code: "5.3", outcome: "Valutare il rischio delle terze parti lungo selezione, due diligence, contratti, monitoraggio, incident notification e offboarding." },
      { code: "5.4", outcome: "Applicare compliance e privacy considerando obblighi, giurisdizione, minimizzazione, retention, data subject e conseguenze." },
      { code: "5.5", outcome: "Distinguere audit e assessment, raccogliere evidenze e seguire finding, remediation, attestazioni e reporting." },
      { code: "5.6", outcome: "Costruire awareness e training misurabili, specifici per ruolo e adattati a comportamento, minacce e cultura." },
    ],
    studyPath: [
      { title: "1. Parti da obiettivi e autorità", rationale: "Definisci chi decide, chi possiede rischio e dati, quali obblighi si applicano e quali risultati il programma deve sostenere." },
      { title: "2. Valuta il rischio", rationale: "Collega asset, minaccia, vulnerabilità, likelihood e impatto; documenta assunzioni, rischio inerente, controlli e rischio residuo." },
      { title: "3. Scegli e approva la risposta", rationale: "Mitigate, transfer, avoid o accept devono rispettare appetite/tolerance, costo, fattibilità, owner e autorità di accettazione." },
      { title: "4. Dimostra e migliora", rationale: "Metriche, audit, assessment, test, eccezioni, formazione e riesami trasformano la governance in evidenza e miglioramento continuo." },
    ],
    decisionPatterns: [
      "SLE = valore dell'asset × exposure factor; ALE = SLE × ARO. La stima supporta una decisione, ma non sostituisce requisiti legali, safety o risk appetite.",
      "RTO è il target per ripristinare un servizio, RPO il massimo intervallo di dati perdibili, MTD il massimo tempo totale di interruzione sostenibile; in un piano coerente RTO non supera MTD.",
      "Una policy esprime l'intento obbligatorio; uno standard stabilisce requisiti uniformi; una procedura descrive i passi; una guideline offre raccomandazioni flessibili.",
    ],
    connections: [
      "Il risk treatment seleziona e giustifica i controlli studiati nei D1-D4.",
      "BIA, RTO, RPO e MTD definiscono i requisiti che l'architettura resiliente del D3 deve realizzare e il D4 deve testare.",
      "Privacy, retention, legal hold e contratti influenzano logging, forensics, cloud, gestione dei dati e risposta agli incidenti.",
    ],
    readinessChecks: [
      "Sai calcolare SLE, ARO e ALE e interpretarne i limiti decisionali.",
      "Sai distinguere risk appetite, tolerance, threshold, rischio inerente e residuo.",
      "Sai scegliere il documento o accordo corretto e identificare owner e approvatore.",
      "Sai trasformare un audit finding in remediation tracciabile con evidenza di chiusura.",
    ],
  },
};

const EN_DOMAIN_GUIDES: Record<number, DomainGuide> = {
  1: {
    domainId: 1,
    title: "General Security Concepts",
    weight: 12,
    purpose: "Builds the decision language used throughout the exam: classify controls, connect CIA and non-repudiation to suitable technologies, govern change, and select cryptographic primitives from the requirement. Memorizing a definition is not enough; you must recognize which property is missing and which control restores it.",
    objectives: [
      { code: "1.1", outcome: "Distinguish control categories and types, separating what a control is intended to achieve from how it is implemented." },
      { code: "1.2", outcome: "Apply CIA, authentication, authorization, accounting, non-repudiation, zero trust, gap analysis, and deception to a scenario." },
      { code: "1.3", outcome: "Evaluate secure change through ownership, impact, approval, testing, rollback, documentation, and monitoring." },
      { code: "1.4", outcome: "Select algorithms, hashing, signatures, certificates, and key management for confidentiality, integrity, and identity requirements." },
    ],
    studyPath: [
      { title: "1. Start with the requirement", rationale: "For every scenario, ask whether the primary need is confidentiality, integrity, availability, authenticity, or non-repudiation." },
      { title: "2. Classify the control", rationale: "Identify the category first (managerial, operational, technical, or physical), then the type (preventive, detective, corrective, deterrent, compensating, or directive)." },
      { title: "3. Map cryptography to the use case", rationale: "Encryption protects confidentiality; hashing detects change; a MAC adds shared authenticity; a digital signature provides integrity, authenticity, and non-repudiation." },
      { title: "4. Put change into a life cycle", rationale: "Secure change includes a baseline, impact analysis, approval, testing, rollback plan, documentation update, and post-implementation verification." },
    ],
    decisionPatterns: [
      "When a question asks for the BEST solution, translate the requirement into a security property before comparing technologies.",
      "A compensating control reduces risk when the primary control is not feasible; it is not automatically equivalent or an unapproved exception.",
      "For signatures, the sender signs with their private key and the recipient verifies with the sender's public key; encrypting with the recipient's public key instead addresses confidentiality.",
    ],
    connections: [
      "Control classification supports mitigations (D2), architecture (D3), hardening and monitoring (D4), and governance and risk treatment (D5).",
      "PKI and key management reappear in TLS, authentication, data protection, incident response, and business continuity.",
      "Change management connects governance, secure configurations, introduced vulnerabilities, and rollback capability.",
    ],
    readinessChecks: [
      "You can distinguish the category and type of the same control without confusing them.",
      "You can justify a choice among hashing, MAC, digital signature, and encryption.",
      "You can order a change from requirement through post-implementation verification.",
    ],
  },
  2: {
    domainId: 2,
    title: "Threats, Vulnerabilities, and Mitigations",
    weight: 22,
    purpose: "Turns technical indicators and business context into a reasoning chain: actor and motivation → vector and attack surface → vulnerability → indicators → mitigation. The goal is to separate cause from effect and select the most specific control that interrupts the attack.",
    objectives: [
      { code: "2.1", outcome: "Compare actors, attributes, and motivations to estimate capability, intent, access, and likelihood." },
      { code: "2.2", outcome: "Analyze vectors and attack surfaces, including social engineering, supply chain, cloud, wireless, and removable media." },
      { code: "2.3", outcome: "Recognize application, hardware, cloud, virtualization, mobile, cryptographic, and configuration vulnerabilities." },
      { code: "2.4", outcome: "Interpret indicators of malware, network, credential, application, and anomalous-behavior attacks." },
      { code: "2.5", outcome: "Select vector-aligned mitigations: segmentation, hardening, patching, least privilege, allowlisting, isolation, and monitoring." },
    ],
    studyPath: [
      { title: "1. Model the adversary", rationale: "Capability, resources, sophistication, internal or external access, and motivation change both likelihood and control priorities." },
      { title: "2. Follow the attack path", rationale: "Separate initial access, execution, persistence, privilege escalation, lateral movement, command and control, and exfiltration." },
      { title: "3. Read indicators in context", rationale: "One event rarely proves an incident; correlate identity, host, network, time, baseline, and intelligence." },
      { title: "4. Mitigate cause and spread", rationale: "Prefer the control that removes or reduces the vulnerability; add segmentation and detection to limit blast radius and dwell time." },
    ],
    decisionPatterns: [
      "Do not confuse vector, vulnerability, and exploit: the vector is the path, the vulnerability is the weakness, and the exploit is the means that abuses it.",
      "For the FIRST action during an active attack, consider human safety and containment; for the permanent correction, remove the cause and verify effectiveness.",
      "A mitigation is better when it interrupts the observed technique with the least acceptable operational impact, not when it is simply the strongest control.",
    ],
    connections: [
      "Mitigations depend on the architectural models and trust boundaries in D3.",
      "Indicators, vulnerability management, SIEM, and incident response become operational processes in D4.",
      "Threat intelligence, risk appetite, and remediation priority depend on governance and risk in D5.",
    ],
    readinessChecks: [
      "You can reconstruct an essential attack chain from logs and symptoms.",
      "You can distinguish a vulnerability from an indicator of its exploitation.",
      "You can justify a primary mitigation and a compensating control for the same scenario.",
    ],
  },
  3: {
    domainId: 3,
    title: "Security Architecture",
    weight: 18,
    purpose: "Requires protections that fit cloud, on-premises, hybrid, virtualized, and zero-trust models. Every choice should be evaluated against trust boundaries, shared responsibilities, data flows, availability, scalability, and attack surface.",
    objectives: [
      { code: "3.1", outcome: "Compare models and infrastructure: cloud service and deployment models, virtualization, containers, IoT/OT, serverless, and IaC." },
      { code: "3.2", outcome: "Apply security principles to segmentation, zones, remote access, network devices, protocols, and trust boundaries." },
      { code: "3.3", outcome: "Protect data by state, classification, and life cycle using encryption, tokenization, masking, DLP, and access control." },
      { code: "3.4", outcome: "Design resilience and recovery with redundancy, clustering, backups, alternate sites, testing, and RTO/RPO objectives." },
    ],
    studyPath: [
      { title: "1. Draw boundaries and flows", rationale: "Identify users, workloads, data, ingress and egress, control plane, data plane, and crossings between trust levels." },
      { title: "2. Assign responsibilities", rationale: "In cloud, the provider secures underlying infrastructure while the customer retains varying responsibility for data, identities, configurations, and workloads." },
      { title: "3. Apply defense in depth", rationale: "Combine identity, segmentation, secure protocols, hardening, monitoring, and data protection without relying on a single perimeter." },
      { title: "4. Design for failure", rationale: "Align high availability and disaster recovery to the BIA: RTO guides restoration time, RPO tolerable data loss, and MTD the maximum sustainable limit." },
    ],
    decisionPatterns: [
      "Zero trust does not mean trusting the internal network: verify explicitly, enforce least privilege, and continuously assess identity, device, resource, and context.",
      "High availability keeps service running through local failures; disaster recovery restores capability after a major event. They can coexist but are not synonyms.",
      "Segmentation limits lateral movement only when traffic between segments is explicitly controlled and monitored.",
    ],
    connections: [
      "D1 cryptographic requirements become concrete choices for data at rest, in transit, and in use.",
      "D2 vulnerabilities help evaluate architectural attack surface and compensating controls.",
      "D4 monitoring and IAM operationalize zero trust and segmentation; D5 BIA and governance set resilience requirements.",
    ],
    readinessChecks: [
      "You can delimit customer and provider responsibilities in IaaS, PaaS, and SaaS.",
      "You can choose among segmentation, isolation, redundancy, and recovery based on the requirement.",
      "You can derive a backup and alternate-site solution from RTO, RPO, and MTD.",
    ],
  },
  4: {
    domainId: 4,
    title: "Security Operations",
    weight: 28,
    purpose: "The heaviest and most action-oriented domain. It measures the ability to operationalize controls through hardening, asset and vulnerability management, IAM, monitoring, automation, log analysis, and incident response. In FIRST/NEXT questions, action order is often decisive.",
    objectives: [
      { code: "4.1", outcome: "Apply baselines, hardening, patching, secure configuration, and protections for endpoints, mobile, wireless, applications, and cloud." },
      { code: "4.2", outcome: "Manage asset inventory, ownership, classification, life cycle, sanitization, and disposal." },
      { code: "4.3", outcome: "Perform vulnerability management from discovery through prioritization, remediation, rescanning, reporting, and exceptions." },
      { code: "4.4", outcome: "Analyze alerts and activity with logs, SIEM, scans, intelligence, and baselines to separate signal from noise." },
      { code: "4.5", outcome: "Configure enterprise controls such as firewalls, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR, and proxies." },
      { code: "4.6", outcome: "Implement IAM: provisioning, federation, MFA, authorization, least privilege, access review, and deprovisioning." },
      { code: "4.7", outcome: "Use automation and orchestration while evaluating repeatability, speed, integrations, errors, and propagation risk." },
      { code: "4.8", outcome: "Apply incident response and forensics while preserving evidence, communications, containment, and controlled return to production." },
      { code: "4.9", outcome: "Interpret network, authentication, endpoint, application, cloud, DNS, and email data sources and logs." },
    ],
    studyPath: [
      { title: "1. Know normal state", rationale: "Inventory, ownership, baselines, and time synchronization make vulnerabilities, drift, logs, and alerts interpretable." },
      { title: "2. Reduce exposure proactively", rationale: "Apply hardening, patching, least privilege, segmentation, and secure configuration according to criticality and compatibility." },
      { title: "3. Correlate before concluding", rationale: "Validate an alert with multiple sources, a timeline, identity, host, and context; preserve volatile data when forensic response requires it." },
      { title: "4. Respond in order", rationale: "Follow preparation; detection/analysis; containment; eradication; recovery; lessons learned, adapting containment to safety, impact, and authorization." },
    ],
    decisionPatterns: [
      "FIRST does not always mean power off: validate the event and consider volatile evidence, safety, and the response plan; during a confirmed attack, contain to limit harm.",
      "A scan identifies potential weaknesses; validation reduces false positives; prioritization combines severity, exploitability, exposure, asset value, and business context.",
      "Authentication proves who you are, authorization decides what you may do, and accounting records what you did; MFA requires factors from different categories.",
    ],
    connections: [
      "D1 primitives and controls become operational configurations, procedures, and checks.",
      "D2 TTPs, vulnerabilities, and indicators feed detection engineering, threat hunting, and prioritization.",
      "D3 architecture determines available logs and enforcement points; D5 governance determines escalation, retention, evidence handling, and reporting.",
    ],
    readinessChecks: [
      "You can order incident-response phases and justify the FIRST action.",
      "You can correlate at least three log sources into a coherent timeline.",
      "You can prioritize vulnerabilities beyond CVSS alone and verify remediation.",
      "You can distinguish authentication, authorization, federation, provisioning, and access review.",
    ],
  },
  5: {
    domainId: 5,
    title: "Security Program Management and Oversight",
    weight: 20,
    purpose: "Connects business goals, risk, and controls. It requires distinguishing governance, policies, standards, procedures, and guidelines; quantifying or qualifying risk; and managing third parties, compliance, privacy, audits, and awareness with verifiable evidence.",
    objectives: [
      { code: "5.1", outcome: "Establish governance through roles, responsibilities, policy hierarchy, reporting, data ownership, and strategic alignment." },
      { code: "5.2", outcome: "Manage risk through identification, analysis, the risk register, appetite/tolerance, responses, owners, monitoring, and BIA." },
      { code: "5.3", outcome: "Assess third-party risk across selection, due diligence, contracts, monitoring, incident notification, and offboarding." },
      { code: "5.4", outcome: "Apply compliance and privacy with attention to obligations, jurisdiction, minimization, retention, data subjects, and consequences." },
      { code: "5.5", outcome: "Distinguish audits and assessments, gather evidence, and track findings, remediation, attestations, and reporting." },
      { code: "5.6", outcome: "Build measurable, role-specific awareness and training adapted to behavior, threats, and culture." },
    ],
    studyPath: [
      { title: "1. Start with goals and authority", rationale: "Define who decides, who owns risk and data, which obligations apply, and which outcomes the program must support." },
      { title: "2. Assess risk", rationale: "Connect asset, threat, vulnerability, likelihood, and impact; document assumptions, inherent risk, controls, and residual risk." },
      { title: "3. Select and approve the response", rationale: "Mitigate, transfer, avoid, or accept must fit appetite/tolerance, cost, feasibility, ownership, and acceptance authority." },
      { title: "4. Demonstrate and improve", rationale: "Metrics, audits, assessments, tests, exceptions, training, and reviews turn governance into evidence and continuous improvement." },
    ],
    decisionPatterns: [
      "SLE = asset value × exposure factor; ALE = SLE × ARO. The estimate supports a decision but does not override legal requirements, safety, or risk appetite.",
      "RTO is the target for restoring a service, RPO the maximum tolerable data-loss interval, and MTD the maximum total sustainable outage; in a coherent plan, RTO does not exceed MTD.",
      "A policy states mandatory intent; a standard sets uniform requirements; a procedure describes steps; a guideline offers flexible recommendations.",
    ],
    connections: [
      "Risk treatment selects and justifies the controls studied in D1-D4.",
      "BIA, RTO, RPO, and MTD define requirements that D3 resilient architecture must implement and D4 must test.",
      "Privacy, retention, legal hold, and contracts affect logging, forensics, cloud, data management, and incident response.",
    ],
    readinessChecks: [
      "You can calculate SLE, ARO, and ALE and interpret their decision limits.",
      "You can distinguish risk appetite, tolerance, threshold, and inherent and residual risk.",
      "You can select the correct document or agreement and identify its owner and approver.",
      "You can turn an audit finding into tracked remediation with closure evidence.",
    ],
  },
};

export const OFFICIAL_DOMAIN_WEIGHTS = [12, 22, 18, 28, 20] as const;

export function getDomainGuide(domainId: number, lang: Lang): DomainGuide {
  const guides = lang === "en" ? EN_DOMAIN_GUIDES : IT_DOMAIN_GUIDES;
  return guides[domainId] ?? guides[1];
}

export const DOMAIN_GUIDES_IT = IT_DOMAIN_GUIDES;
export const DOMAIN_GUIDES_EN = EN_DOMAIN_GUIDES;
