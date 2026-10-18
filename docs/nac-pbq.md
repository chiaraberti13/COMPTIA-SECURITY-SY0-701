# PBQ 503 — Postura NAC / NAC posture

PBQ originale IT/EN, obiettivo **4.5**, collegamento **4.1**, dominio 4. Otto abbinamenti, cinque dispositivi sintetici e quattro distrattori. Riutilizza il motore di pratica/esame e la tabella accessibile con scorrimento locale su mobile.

Original IT/EN PBQ, objective **4.5**, related objective **4.1**, domain 4. Eight matches, five synthetic devices and four distractors. Reuses the practice/exam engine and accessible table with local scrolling on mobile.

## Policy dichiarata / Stated policy

L'identità valida di utente e dispositivo è necessaria per ogni accesso aziendale. L'accesso ordinario richiede inoltre un report corrente riuscito su patch, cifratura e antimalware, e resta circoscritto al ruolo. Un requisito correggibile fallito ammette solo remediation; una postura sconosciuta ammette solo provisioning/valutazione; identità revocata blocca entrambi. Sono regole esplicite di Kestrelia, non default universali di un prodotto.

Valid user and device identity is required for corporate access. Ordinary access also requires a current successful report covering patches, encryption and antimalware, and remains role-scoped. A failed fixable requirement permits only remediation; unknown posture permits only provisioning/assessment; revoked identity blocks both. These are explicit Kestrelia rules, not universal product defaults.

Le reti limitate consentono esclusivamente DNS/DHCP aziendali, servizio NAC e server di aggiornamento/configurazione necessari al caso. Nessun accesso a produzione, altri endpoint o Internet generale. La riammissione segue una nuova valutazione riuscita di tutti i requisiti e una nuova decisione di autorizzazione, non il semplice messaggio di installazione.

Restricted networks permit only corporate DNS/DHCP, the NAC service and update/configuration servers needed for the case. No access to production, other endpoints or general Internet. Readmission follows a successful fresh assessment of all requirements and a new authorization decision, not an installation message alone.

## Soluzione / Solution

| Prompt ID | Option ID | Motivazione / Reason |
| --- | --- | --- |
| `p_device_a` | `ordinary` | Valid identity and verified current posture; role-scoped access |
| `p_device_b` | `patch_remediation` | Mandatory patch missing; approved update access only |
| `p_device_c` | `encryption_remediation` | Encryption disabled; antimalware does not replace it |
| `p_device_d` | `block_identity` | Revoked identity outweighs otherwise compliant posture |
| `p_device_e` | `unknown_posture` | Incomplete agentless report; do not infer compliance from missing results |
| `p_reassessment` | `fresh_authorization` | Reported fix needs new assessment and authorization |
| `p_network_scope` | `remediation_services` | Only explicitly required services, no broad network access |
| `p_compliance_limits` | `no_safety_guarantee` | Compliance at assessment time does not prove harmless activity |

Presenza dell'antimalware, report senza risultati, correzione dichiarata e necessità di remediation non giustificano fiducia indiscriminata. La quarantena NAC limita la rete; quella antimalware isola un file. Una nuova evidenza può cambiare la decisione secondo la policy.

Antimalware presence, a report without results, a reported fix and a need for remediation do not justify indiscriminate trust. NAC quarantine restricts the network; antimalware quarantine isolates a file. New evidence can change the decision under policy.

## Agenti e rimandi / Agents and links

La PBQ rimanda alle voci esistenti `NACNet`, `AgentRes`, `AgentlessRes` e `DissolvableAgentNAC` dell'attività 27. Un agente persistente resta installato; un agente dissolvibile è temporaneo. Non classificare come non conforme un dispositivo solo perché manca un agente persistente: un metodo supportato può produrre evidenze complete senza di esso. In E le verifiche obbligatorie non sono state completate, quindi lo stato è sconosciuto.

The PBQ links to existing `NACNet`, `AgentRes`, `AgentlessRes` and `DissolvableAgentNAC` concepts from activity 27. A persistent agent remains installed; a dissolvable agent is temporary. Do not classify a device as noncompliant solely because it lacks a persistent agent: a supported method can collect complete evidence without one. E has not completed mandatory checks, so its state is unknown.

La terminologia del prodotto non garantisce ogni capacità: Cisco ISE chiama agentless anche una modalità con script temporanei. Compatibilità, prerequisiti, controlli e frequenza dipendono da versione e configurazione. La nuova valutazione richiesta dalla policy dell'esercizio non implica che ogni modalità agentless abbia rivalutazione periodica automatica.

Product terminology does not guarantee every capability: Cisco ISE also calls a temporary-script method agentless. Compatibility, prerequisites, checks and frequency depend on version and configuration. The fresh assessment required by this exercise does not imply that every agentless mode has automatic periodic reassessment.

## Fonti e verifica / Sources and verification

Fonti primarie verificate il **2026-10-08**, visibili nell'app / Primary sources checked on **2026-10-08**, visible in the app:

- [Cisco ISE 3.4 — Compliance](https://www.cisco.com/c/en/us/td/docs/security/ise/3-4/admin_guide/b_ise_admin_3_4/b_ISE_admin_compliance.html): profili di postura e autorizzazione / posture and authorization profiles.
- [Cisco ISE — Configure Posture Agentless](https://www.cisco.com/c/en/us/support/docs/security/identity-services-engine/222260-configure-posture-agentless.html): prerequisiti e limiti del metodo / method prerequisites and limits.
- [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final): identità, stato del dispositivo e decisione di accesso / identity, device state and access decision.

Vitest verifica chiave indipendente, errori diagnostici, risposte incomplete, struttura della tabella, fonti, obiettivi, parità IT/EN e flusso pratica con reset. Sei test Playwright desktop/mobile aggiunti per tastiera, feedback, reset, cambio lingua, navigazione esame, storico, axe e overflow. Browser locale non disponibile: questi controlli visuali restano da eseguire in CI, senza dichiararli superati.

Vitest checks an independent key, diagnostic mistakes, incomplete answers, table structure, sources, objectives, IT/EN parity and practice/reset flow. Six desktop/mobile Playwright tests added for keyboard, feedback, restart, language changes, exam navigation, history, axe and overflow. No local browser is available: these visual checks remain to run in CI, without claiming they passed.

Esito locale / Local result: **959 test Vitest superati / passed**, typecheck, lint, Markdown, spelling IT/EN, build e 9 smoke checks superati / passed.
