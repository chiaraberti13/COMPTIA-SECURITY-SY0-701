# Autenticazione e DNS / Authentication and DNS

## Italiano

Scenario originale: workstation-01 dell’organizzazione fittizia Kestrelia. Durata: 20 minuti; livello base/intermedio. Obiettivi 2.4 (indicatori di attività malevola), 4.4 (monitoraggio), 4.8 (risposta agli incidenti), 4.9 (fonti per investigazione). Prerequisiti e licenza nel [catalogo](../README.md). Owner e date di revisione nel [manifest](manifest.json).

### Evidenze e procedura

1. Aprire `events.jsonl` come testo e ricostruire ordine, utente e origine degli accessi.
2. Aprire `traffic.pcap` in Wireshark, senza avviare catture live; filtro `dns`. È PCAP classico con pacchetti IP raw, non frame Ethernet; contiene solo tre query DNS A, senza risposte.
3. Confrontare `alerts.jsonl`, `timeline.csv` e `iocs.json` con le evidenze originali. Gli alert sono ipotesi scritte dal generatore, non risultati di un SIEM reale.
4. Rispondere: quanti fallimenti precedono il successo? Qual è l’intervallo DNS? Possiamo confermare brute force, C2 o esfiltrazione? Quali fonti servono e quale azione è proporzionata?

### Soluzione ragionata

Tre fallimenti in 20 secondi, seguiti dal successo dopo altri 10 secondi, sullo stesso utente e dalla stessa origine. Questo può dipendere da errori dell’utente o da password guessing; non dimostra brute force. Le tre query hanno intervalli di 60 secondi: compatibili con automazione lecita o beaconing. Mancano risposte DNS, connessioni successive, processi endpoint, MFA e conferma dell’utente. Il PCAP non contiene prova di C2 o esfiltrazione.

Verificare l’utente tramite un canale affidabile, preservare gli originali e i loro hash, raccogliere log endpoint e autenticazione correlati e applicare il runbook di triage. Valutare il contenimento in base alle nuove evidenze e all’impatto; non bloccare automaticamente sulla sola periodicità. Gli hash aiutano a rilevare modifiche ai file, ma da soli non provano autenticità né catena di custodia. Per l’esame interessa scegliere fonti e azioni appropriate; soglie e procedure reali dipendono dal contesto.

Errori tipici: considerare ogni alert un incidente confermato; scambiare una query per una connessione al dominio; attribuire a un indirizzo documentale un attaccante reale; dedurre l’assenza di attacco da una cattura parziale. La timeline ha risoluzione al secondo, UTC, e non simula clock skew o pacchetti persi.

### Sicurezza e ripristino

Usare solo i file locali; non risolvere i domini, non inviare i dati a servizi esterni e non riprodurre i pacchetti in rete. Nessun account, segreto, malware o payload eseguibile è incluso. Lavorare su una copia; eliminare annotazioni/copie al termine. Per ripristinare i dati originali usare `npm run datasets:generate`, poi `npm test -- tests/studyDatasets.test.ts`. Nessun servizio viene avviato.

## English

Original scenario: workstation-01 at the fictional Kestrelia organization. Duration: 20 minutes; beginner/intermediate. Objectives 2.4 (malicious activity indicators), 4.4 (monitoring), 4.8 (incident response), 4.9 (investigation sources). Prerequisites and license in the [catalog](../README.md). Owner and review dates in the [manifest](manifest.json).

### Evidence and procedure

1. Open `events.jsonl` as text and reconstruct login order, user and source.
2. Open `traffic.pcap` in Wireshark without starting live captures; filter `dns`. This is classic PCAP with raw IP packets, not Ethernet frames; it contains only three DNS A queries, no responses.
3. Compare `alerts.jsonl`, `timeline.csv` and `iocs.json` with the original evidence. Alerts are hypotheses written by the generator, not output from a real SIEM.
4. Answer: how many failures precede success? What is the DNS interval? Can we confirm brute force, C2 or exfiltration? Which sources are needed and what action is proportionate?

### Worked solution

Three failures within 20 seconds, followed by success another 10 seconds later, for the same user and source. This could be user mistakes or password guessing; it does not prove brute force. The three queries have 60-second intervals, consistent with legitimate automation or beaconing. DNS responses, subsequent connections, endpoint processes, MFA and user confirmation are missing. The PCAP contains no proof of C2 or exfiltration.

Verify the user through a trusted channel, preserve originals and hashes, collect correlated endpoint and authentication logs and follow the triage runbook. Assess containment based on new evidence and impact; do not block automatically based only on periodicity. Hashes help detect file changes but alone prove neither authenticity nor chain of custody. Exam preparation focuses on choosing appropriate sources and actions; real thresholds and procedures depend on context.

Common mistakes: treating every alert as a confirmed incident; confusing a query with a connection to the domain; attributing a documentation address to a real attacker; inferring absence of attack from a partial capture. The timeline has second resolution, UTC, and does not simulate clock skew or lost packets.

### Safety and cleanup

Use only local files; do not resolve domains, upload data to external services or replay packets on a network. No accounts, secrets, malware or executable payloads are included. Work on a copy; delete notes/copies afterwards. Restore original data with `npm run datasets:generate`, then `npm test -- tests/studyDatasets.test.ts`. No service is started.
