# Matrice di copertura SY0-701

> File generato da `npm run coverage-matrix` (`scripts/coverage-matrix.ts`): non modificarlo a mano.
> La CI fallisce se non è aggiornato rispetto a domande, guide e collegamenti in `src/questionObjectives.ts`.

Una domanda può allenare più obiettivi, anche di un dominio diverso da quello del suo banco:
per questo la somma per obiettivo può superare il numero di domande del dominio.

Livelli cognitivi: **R** ricordo · **C** comprensione · **Ap** applicazione · **An** analisi.

## Dominio 1 — Concetti generali di sicurezza

Peso d'esame 12% · 105 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Revisione | Fonti |
|---|---|---|---|---|---|---|---|---|---|
| 1.1 | Distinguere categorie e tipi di controllo, separando lo scopo del controllo dal modo in cui viene implementato. | 10 | 0 | 3 | 3 | 4 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| 1.2 | Applicare CIA, autenticazione, autorizzazione, accounting, non ripudio, zero trust, gap analysis, sicurezza fisica e deception a uno scenario. | 35 | 1 | 14 | 9 | 11 | 2 | da revisionare | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| 1.3 | Valutare un cambiamento sicuro: ownership, impatto, approvazione, test, rollback, documentazione e monitoraggio. | 20 | 1 | 3 | 8 | 8 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 1.4 | Selezionare algoritmi, hashing, firma, certificati e gestione delle chiavi in funzione di confidenzialità, integrità e identità. | 42 | 2 | 12 | 16 | 12 | 2 | da revisionare | [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), [IETF RFC 8446](https://www.rfc-editor.org/rfc/rfc8446) |

## Dominio 2 — Minacce, vulnerabilità e mitigazioni

Peso d'esame 22% · 129 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Revisione | Fonti |
|---|---|---|---|---|---|---|---|---|---|
| 2.1 | Confrontare attori, attributi e motivazioni per stimare capacità, intento, accesso e probabilità. | 19 | 0 | 11 | 5 | 3 | 1 | da revisionare | [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 2.2 | Analizzare vettori e superfici di attacco, inclusi social engineering, supply chain, cloud, wireless e removable media. | 31 | 0 | 15 | 8 | 8 | 1 | da revisionare | [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 2.3 | Riconoscere vulnerabilità applicative, hardware, cloud, virtualizzazione, mobile, crittografiche e di configurazione. | 13 | 0 | 5 | 1 | 7 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [OWASP Foundation OWASP Top 10](https://owasp.org/www-project-top-ten/), [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) |
| 2.4 | Interpretare indicatori di malware, attacchi di rete, credenziali, applicazioni e comportamenti anomali. | 45 | 0 | 2 | 2 | 41 | 2 | da revisionare | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 2.5 | Selezionare mitigazioni coerenti con il vettore: segmentation, hardening, patching, least privilege, allowlisting, isolamento e monitoring. | 23 | 0 | 14 | 6 | 3 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |

## Dominio 3 — Architettura di sicurezza

Peso d'esame 18% · 112 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Revisione | Fonti |
|---|---|---|---|---|---|---|---|---|---|
| 3.1 | Confrontare modelli e infrastrutture: cloud service model, deployment model, virtualizzazione, container, IoT/OT, serverless e IaC. | 38 | 0 | 18 | 9 | 11 | 1 | da revisionare | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final), [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) |
| 3.2 | Applicare principi di sicurezza a segmentazione, zone, accesso remoto, dispositivi di rete, protocolli e trust boundary. | 31 | 0 | 11 | 15 | 5 | 2 | da revisionare | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 3.3 | Proteggere i dati per stato, classificazione e ciclo di vita mediante cifratura, tokenizzazione, masking, DLP e access control. | 24 | 0 | 10 | 13 | 1 | 1 | da revisionare | [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), [EUR-Lex Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) |
| 3.4 | Progettare resilienza e recovery con ridondanza, clustering, backup, siti alternativi, testing e obiettivi RTO/RPO. | 23 | 0 | 11 | 3 | 9 | 2 | da revisionare | [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) |

## Dominio 4 — Operazioni di sicurezza

Peso d'esame 28% · 181 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Revisione | Fonti |
|---|---|---|---|---|---|---|---|---|---|
| 4.1 | Applicare baseline, hardening, patching, secure configuration e protezioni per endpoint, mobile, wireless, applicazioni e cloud. | 23 | 0 | 5 | 17 | 1 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.2 | Gestire inventario, ownership, classificazione, ciclo di vita, sanitizzazione e dismissione degli asset. | 18 | 0 | 13 | 4 | 1 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.3 | Eseguire vulnerability management dal discovery alla prioritizzazione, remediation, rescansione, reporting ed eccezioni. | 24 | 0 | 12 | 7 | 5 | 1 | da revisionare | [NIST SP 800-40 Rev. 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final), [FIRST Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/), [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) |
| 4.4 | Analizzare alert e attività con log, SIEM, scansioni, intelligence e baseline per distinguere segnale e rumore. | 16 | 0 | 9 | 3 | 4 | 1 | da revisionare | [NIST SP 800-92](https://csrc.nist.gov/pubs/sp/800/92/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 4.5 | Configurare controlli enterprise quali firewall, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR e proxy. | 21 | 0 | 7 | 10 | 4 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.6 | Implementare IAM: provisioning, federation, MFA, authorization, least privilege, access review e deprovisioning. | 32 | 0 | 18 | 11 | 3 | 1 | da revisionare | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| 4.7 | Usare automazione e orchestrazione valutando repeatability, velocità, integrazioni, errori e rischio di propagazione. | 14 | 0 | 12 | 1 | 1 | 1 | da revisionare | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.8 | Applicare incident response e forensics preservando evidenze, comunicazioni, contenimento e ritorno controllato in produzione. | 18 | 0 | 11 | 0 | 7 | 1 | da revisionare | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) |
| 4.9 | Interpretare fonti dati e log di rete, autenticazione, endpoint, applicazioni, cloud, DNS ed email. | 23 | 0 | 6 | 3 | 14 | 1 | da revisionare | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final), [NIST SP 800-92](https://csrc.nist.gov/pubs/sp/800/92/final) |

## Dominio 5 — Gestione e supervisione del programma di sicurezza

Peso d'esame 20% · 137 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Revisione | Fonti |
|---|---|---|---|---|---|---|---|---|---|
| 5.1 | Stabilire governance con ruoli, responsabilità, policy hierarchy, reporting, data ownership e allineamento alla strategia. | 31 | 7 | 12 | 11 | 1 | 1 | da revisionare | [NIST Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/cyberframework), [ISO/IEC 27001](https://www.iso.org/standard/27001) |
| 5.2 | Gestire il rischio: identificazione, analisi, registro, appetite/tolerance, risposte, owner, monitoraggio e BIA. | 37 | 7 | 8 | 10 | 12 | 1 | da revisionare | [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final) |
| 5.3 | Valutare il rischio delle terze parti lungo selezione, due diligence, contratti, monitoraggio, incident notification e offboarding. | 19 | 2 | 5 | 7 | 5 | 1 | da revisionare | [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) |
| 5.4 | Applicare compliance e privacy considerando obblighi, giurisdizione, minimizzazione, retention, data subject e conseguenze. | 27 | 4 | 13 | 7 | 3 | 1 | da revisionare | [EUR-Lex Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [PCI Security Standards Council PCI Data Security Standard](https://www.pcisecuritystandards.org/), [ISO/IEC 27001](https://www.iso.org/standard/27001) |
| 5.5 | Distinguere audit e assessment, raccogliere evidenze e seguire finding, remediation, attestazioni e reporting. | 17 | 1 | 6 | 5 | 5 | 1 | da revisionare | [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final) |
| 5.6 | Costruire awareness e training misurabili, specifici per ruolo e adattati a comportamento, minacce e cultura. | 13 | 1 | 1 | 7 | 4 | 1 | da revisionare | [NIST SP 800-50 Rev. 1](https://csrc.nist.gov/pubs/sp/800/50/r1/final) |

## Priorità per nuove domande

I 5 obiettivi con meno domande, da rinforzare per primi:

- **1.1**: 10 domande
- **2.3**: 13 domande
- **5.6**: 13 domande
- **4.7**: 14 domande
- **4.4**: 16 domande

## Fonti e revisione

Le fonti di ogni obiettivo sono in `src/contentReview.ts` (assegnate il 2026-09-26); gli obiettivi d'esame
CompTIA valgono per tutti e non sono ripetuti nella tabella. Un obiettivo diventa **revisionato** solo
quando una persona ha confrontato domande, glossario e guida con le fonti indicate: servono data e revisore.
I controlli automatici (parità IT/EN, struttura, copertura) non contano come revisione.

### Fonti primarie: obiettivi d'esame, standard, specifiche e norme

- [CompTIA Security+ (SY0-701) — exam objectives](https://www.comptia.org/certifications/security) — CompTIA
- [SP 800-53 Rev. 5 — Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — NIST
- [SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) — NIST
- [SP 800-57 Part 1 Rev. 5 — Recommendation for Key Management](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) — NIST
- [SP 800-145 — The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final) — NIST
- [SP 800-34 Rev. 1 — Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — NIST
- [SP 800-40 Rev. 4 — Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final) — NIST
- [SP 800-92 — Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final) — NIST
- [SP 800-61 Rev. 3 — Incident Response Recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final) — NIST
- [SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final) — NIST
- [SP 800-161 Rev. 1 — Cybersecurity Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) — NIST
- [SP 800-115 — Technical Guide to Information Security Testing](https://csrc.nist.gov/pubs/sp/800/115/final) — NIST
- [SP 800-50 Rev. 1 — Building a Cybersecurity and Privacy Learning Program](https://csrc.nist.gov/pubs/sp/800/50/r1/final) — NIST
- [Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/cyberframework) — NIST
- [RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446) — IETF
- [ISO/IEC 27001 — Information security management systems](https://www.iso.org/standard/27001) — ISO
- [Regulation (EU) 2016/679 — General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj) — EUR-Lex
- [PCI Data Security Standard](https://www.pcisecuritystandards.org/) — PCI Security Standards Council

### Fonti secondarie: riferimenti di comunità ed enti

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — OWASP Foundation
- [CIS Critical Security Controls](https://www.cisecurity.org/controls) — Center for Internet Security
- [MITRE ATT&CK](https://attack.mitre.org/) — MITRE
- [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) — CISA
- [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/) — FIRST
