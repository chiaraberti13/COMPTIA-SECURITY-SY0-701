# PBQ 303 — Regole firewall e segmentazione / Firewall rules and segmentation

Esercizio originale IT/EN di abbinamento, obiettivo principale **4.5**; collegamenti **2.5** e **3.2**. Usa il motore PBQ esistente. Gli identificatori rimangono indipendenti dalla lingua.

## Topologia e premesse / Topology and assumptions

Kestrelia e gli indirizzi sono sintetici. Internet raggiunge la screened subnet pubblica instradata `203.0.113.0/24` (proxy `203.0.113.10`). Il firewall separa anche applicazioni `10.0.20.0/24` (API `10.0.20.10`) e gestione `10.0.30.0/24` (bastion `10.0.30.50`, firewall `10.0.30.1`).

Kestrelia and all addresses are synthetic. Internet reaches the routed public screened subnet containing the proxy. The firewall separates it from the application and management networks above.

Le regole di interfaccia pfSense filtrano le nuove connessioni in ingresso, in ordine dall’alto: prima corrispondenza, poi deny implicito. Sono escluse altre autorizzazioni floating, di gruppo e automatiche. La tabella degli stati parte vuota; il ritorno di una connessione autorizzata usa lo stato, mentre una nuova connessione inversa viene filtrata. Le porte indicate sono di destinazione; le porte sorgente sono effimere. La topologia instradata non richiede NAT.

pfSense interface rules filter incoming new connections using top-down first match and implicit deny. Other floating, group and automatic authorizations are explicitly excluded. The initially empty state table admits replies to allowed connections, not unrelated reverse connections. Listed ports are destination ports; source ports are ephemeral. This routed topology does not require NAT.

## Soluzione / Solution

| Prompt ID | Option ID | Decisione / Decision |
| --- | --- | --- |
| `p_public_https` | `wan_https` | WAN, any → proxy, TCP/443, PASS |
| `p_proxy_api` | `dmz_api` | Screened subnet, proxy → API, TCP/8443, PASS |
| `p_admin_ssh` | `mgmt_ssh` | Management, bastion → proxy/API, TCP/22, PASS |
| `p_firewall_gui` | `mgmt_gui` | Management, bastion → firewall, TCP/443, PASS |
| `p_shadowed` | `remove_broad` | Remove broad R0; retain specific R1 before blocking R2 |
| `p_reply` | `state_reply` | Existing connection state admits the reply |
| `p_unmatched` | `implicit_deny` | New API → bastion TCP/22 connection is blocked |

R0 consente tutte le porte fra screened subnet e applicazioni e precede R1/R2: spostare il blocco più in basso non risolve. Le regole di gestione mantengono gli accessi autorizzati dal bastion. NAT traduce indirizzi e non sostituisce la policy firewall. I quattro distrattori illustrano apertura eccessiva, SSH pubblico, shadowing e confusione NAT/policy.

R0 permits all ports between the screened subnet and applications before R1/R2: moving the block further down cannot fix this. Management rules preserve authorized bastion access. NAT translates addresses and does not replace firewall policy. The four distractors demonstrate excessive access, public SSH, shadowing and NAT/policy confusion.

## Correzione e verifiche / Grading and verification

Ogni abbinamento vale un punto diagnostico; tutti e sette devono essere corretti per superare questa PBQ di studio. In modalità esame la PBQ interamente corretta vale un punto di pratica: non riproduce lo scoring proprietario CompTIA. Il reset cancella le risposte. Le risposte restano durante navigazione e cambio lingua nell’esame; il risultato concluso viene salvato nello storico locale. La pratica non salva bozze tra ricaricamenti.

Each match earns a diagnostic point; all seven must be correct to pass this study PBQ. Exam mode awards one practice point for a fully correct PBQ, without claiming proprietary CompTIA scoring. Restart clears answers. Exam navigation and language changes retain answers; completed results persist in local history. Practice drafts do not survive reloads.

Vitest verifica chiave indipendente, singoli errori, campi IT/EN, identificatori, fonti e reset. Playwright verifica selezione da tastiera, feedback, reset, cambio lingua, navigazione e storico su desktop e mobile, con controlli axe e overflow.

Vitest checks an independent answer key, individual mistakes, IT/EN fields, identifiers, sources and reset. Playwright checks keyboard selection, feedback, restart, language changes, navigation and history on desktop and mobile, including axe and overflow checks.

## Fonti primarie / Primary sources

Verificate / Verified: **2026-10-08**. Le premesse delimitano il comportamento dell’esercizio; non sono una configurazione pronta per una rete reale.

- [Netgate — pfSense Rule Methodology](https://docs.netgate.com/pfsense/en/latest/firewall/rule-methodology.html): regole di interfaccia, first match, stato e default deny / interface rules, first match, state and default deny.
- [Netgate — pfSense Firewall Fundamentals](https://docs.netgate.com/pfsense/en/latest/firewall/fundamentals.html): funzionamento del firewall e relazione con NAT / firewall operation and relationship with NAT.
