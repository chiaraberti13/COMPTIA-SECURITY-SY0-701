# Mappatura a framework complementari

> File generato da `npm run framework-mapping` (`scripts/framework-mapping.ts`): non modificarlo a mano.
> I dati sono in `src/frameworkMapping.ts`; la CI fallisce se il file non è aggiornato.

Gli obiettivi CompTIA SY0-701 restano il riferimento del progetto: questa tabella indica solo dove
lo stesso concetto compare in **NIST CSF 2.0**, **CIS Controls v8** e **MITRE ATT&CK**, i framework
usati nel lavoro reale. La corrispondenza è approssimata (un obiettivo copre spesso più controlli):
indica il punto di contatto più vicino, non un'equivalenza. NICE non è mappato.

## Dominio 1 — Concetti generali di sicurezza

| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |
|---|---|---|---|
| 1.1 | GV Govern, PR Protect | 3 Data Protection; 4 Secure Configuration of Enterprise Assets and Software | — |
| 1.2 | PR Protect | 5 Account Management; 6 Access Control Management; 12 Network Infrastructure Management | Lateral Movement |
| 1.3 | PR Protect, DE Detect | 4 Secure Configuration of Enterprise Assets and Software; 13 Network Monitoring and Defense | Initial Access |
| 1.4 | PR Protect | 3 Data Protection | Credential Access, Collection |

## Dominio 2 — Minacce, vulnerabilità e mitigazioni

| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |
|---|---|---|---|
| 2.1 | ID Identify | — | Reconnaissance, Resource Development, Initial Access |
| 2.2 | ID Identify | 9 Email and Web Browser Protections; 15 Service Provider Management | Initial Access, Resource Development |
| 2.3 | ID Identify | 7 Continuous Vulnerability Management; 16 Application Software Security | Initial Access, Execution |
| 2.4 | DE Detect | 8 Audit Log Management; 10 Malware Defenses; 13 Network Monitoring and Defense | Execution, Persistence, Credential Access, Impact |
| 2.5 | PR Protect | 4 Secure Configuration of Enterprise Assets and Software; 5 Account Management; 6 Access Control Management; 12 Network Infrastructure Management | Privilege Escalation, Lateral Movement |

## Dominio 3 — Architettura di sicurezza

| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |
|---|---|---|---|
| 3.1 | PR Protect | 4 Secure Configuration of Enterprise Assets and Software; 12 Network Infrastructure Management | — |
| 3.2 | PR Protect | 4 Secure Configuration of Enterprise Assets and Software; 12 Network Infrastructure Management; 13 Network Monitoring and Defense | Lateral Movement, Command and Control |
| 3.3 | PR Protect | 3 Data Protection | Collection, Exfiltration |
| 3.4 | PR Protect, RC Recover | 11 Data Recovery | Impact |

## Dominio 4 — Operazioni di sicurezza

| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |
|---|---|---|---|
| 4.1 | PR Protect | 1 Inventory and Control of Enterprise Assets; 2 Inventory and Control of Software Assets; 4 Secure Configuration of Enterprise Assets and Software | — |
| 4.2 | ID Identify, PR Protect | 1 Inventory and Control of Enterprise Assets; 2 Inventory and Control of Software Assets; 3 Data Protection | — |
| 4.3 | ID Identify | 7 Continuous Vulnerability Management | Initial Access |
| 4.4 | DE Detect | 8 Audit Log Management; 13 Network Monitoring and Defense | — |
| 4.5 | PR Protect, DE Detect | 9 Email and Web Browser Protections; 10 Malware Defenses; 12 Network Infrastructure Management; 13 Network Monitoring and Defense | Initial Access, Command and Control |
| 4.6 | PR Protect | 5 Account Management; 6 Access Control Management | Credential Access, Privilege Escalation |
| 4.7 | PR Protect, RS Respond | 4 Secure Configuration of Enterprise Assets and Software; 7 Continuous Vulnerability Management | — |
| 4.8 | RS Respond, RC Recover | 17 Incident Response Management | — |
| 4.9 | DE Detect, RS Respond | 8 Audit Log Management; 13 Network Monitoring and Defense | — |

## Dominio 5 — Gestione e supervisione del programma di sicurezza

| Obiettivo | NIST CSF 2.0 | CIS Controls v8 | MITRE ATT&CK (tattiche) |
|---|---|---|---|
| 5.1 | GV Govern | — | — |
| 5.2 | GV Govern, ID Identify | — | — |
| 5.3 | GV Govern | 15 Service Provider Management | Initial Access |
| 5.4 | GV Govern | 3 Data Protection | — |
| 5.5 | GV Govern, ID Identify | 7 Continuous Vulnerability Management; 18 Penetration Testing | — |
| 5.6 | GV Govern, PR Protect | 14 Security Awareness and Skills Training | Initial Access |

## Note

- Le tattiche ATT&CK sono elencate solo dove l'obiettivo riguarda minacce o difese contro comportamenti
  osservabili; i temi di governance restano senza.
- Le versioni di riferimento sono NIST CSF 2.0, CIS Controls v8 e ATT&CK Enterprise.
