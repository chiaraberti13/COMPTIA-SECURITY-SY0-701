# 🗺️ Project Roadmap: COMPTIA-SECURITY-SY0-701

## Visione

Trasformare **COMPTIA-SECURITY-SY0-701** in una risorsa didattica di cybersecurity chiara, affidabile, manutenibile e sicura, utile sia per la preparazione alla certificazione CompTIA Security+ SY0-701 sia per consolidare competenze applicabili in contesti reali.

Il restyling segue tre prospettive complementari:

- **Engineering:** repository ordinato, validato automaticamente e semplice da mantenere o estendere.
- **Cybersecurity:** contenuti tecnicamente corretti, esempi sicuri e controlli di sicurezza integrati nel ciclo di sviluppo.
- **UX didattica:** navigazione intuitiva, progressione coerente, accessibilità e strumenti che favoriscano comprensione, pratica e ripasso.

> [!IMPORTANT]
> Questa roadmap è una baseline proposta sulla natura del progetto. Prima dell'implementazione deve essere confrontata con lo stato reale del repository tramite un audit iniziale. Non costituisce materiale ufficiale CompTIA e non garantisce il superamento dell'esame.

---

## Come usare questa roadmap

### Stati

- [ ] Da pianificare
- [ ] In corso — aggiungere `🚧` e il riferimento a issue/PR
- [x] Completato — aggiungere data e riferimento a issue/PR
- [ ] Bloccato — aggiungere `⛔` e descrivere il blocco

### Priorità

| Livello | Significato | Criterio |
|---|---|---|
| **P0** | Fondamentale | Correttezza, sicurezza, struttura di base o rischio elevato |
| **P1** | Alto valore | Migliora sensibilmente studio, manutenzione e qualità |
| **P2** | Evolutivo | Funzionalità avanzata o ottimizzazione successiva |

### Definizione generale di completamento

Un'attività è completata quando:

1. la modifica è revisionata e collegata a una issue o pull request;
2. i link, il Markdown e gli eventuali script superano i controlli automatici;
3. la documentazione in italiano e inglese rimane coerente, se il contenuto è bilingue;
4. esempi e laboratori includono prerequisiti, obiettivi, limiti d'uso e procedura di ripristino;
5. non sono presenti credenziali, dati personali, output sensibili o asset non distribuibili;
6. il changelog e l'indice vengono aggiornati quando necessario.

---

## 🔎 Fase 0 — Audit e baseline

**Obiettivo:** verificare lo stato reale del repository prima di applicare cambiamenti strutturali.

- [ ] **P0 — Inventario del repository:** mappare directory, formati, script, workflow, dipendenze, asset e contenuti duplicati.
- [ ] **P0 — Mappatura degli obiettivi SY0-701:** associare ogni pagina all'obiettivo e sotto-obiettivo d'esame pertinente.
- [ ] **P0 — Analisi dei gap:** identificare contenuti assenti, parziali, ridondanti, obsoleti o non verificabili.
- [ ] **P0 — Verifica linguistica:** rilevare pagine disponibili solo in una lingua e traduzioni non allineate.
- [ ] **P0 — Baseline qualità:** registrare link interrotti, errori Markdown, problemi di accessibilità e copertura dei domini.
- [ ] **P0 — Threat model del repository:** valutare rischi relativi a contributi malevoli, dipendenze, workflow GitHub Actions, file binari e laboratori.
- [ ] **P1 — Registro decisionale:** creare ADR essenziali per struttura, versionamento, traduzioni e tecnologia dei quiz/lab.

**Deliverable:** report di audit, matrice di copertura iniziale e backlog confermato.

---

## 📌 Priorità attuali — Q3 2026

### 🏗️ Engineering & Developer Experience

**Obiettivo:** migliorare struttura, manutenibilità, automazione e facilità di contribuzione.

#### Struttura e convenzioni

- [ ] **P0 — Definire una struttura prevedibile**, ad esempio:

  ```text
  .github/
  ├── ISSUE_TEMPLATE/
  ├── workflows/
  ├── CODEOWNERS
  └── pull_request_template.md
  docs/
  ├── it/
  │   ├── 01-general-security-concepts/
  │   ├── 02-threats-vulnerabilities-mitigations/
  │   ├── 03-security-architecture/
  │   ├── 04-security-operations/
  │   └── 05-security-program-management/
  └── en/
  labs/
  ├── templates/
  ├── beginner/
  └── intermediate/
  quizzes/
  glossary/
  assets/
  scripts/
  tests/
  CHANGELOG.md
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md
  LICENSE
  README.md
  ROADMAP.md
  ```

- [ ] **P0 — Stabilire convenzioni di naming:** nomi file in `kebab-case`, numerazione coerente dei domini e identificatori univoci per obiettivi, quiz e lab.
- [ ] **P0 — Separare contenuti, asset e automazioni:** evitare script o file generati mescolati alle note di studio.
- [ ] **P1 — Definire il front matter dei contenuti:** titolo, lingua, dominio, obiettivi, difficoltà, prerequisiti, ultima revisione e fonti.
- [ ] **P1 — Eliminare duplicazioni:** usare pagine canoniche, link interni e componenti riutilizzabili invece di copiare definizioni.
- [ ] **P1 — Introdurre un glossario centralizzato:** ogni termine deve avere ID stabile, acronimo, definizione e collegamenti contestuali.

#### Qualità automatizzata e CI

- [ ] **P0 — Aggiungere Markdown linting:** validare titoli, liste, spaziatura, blocchi di codice e stile comune.
- [ ] **P0 — Aggiungere link checking:** controllare link interni, ancore e collegamenti esterni con retry e allowlist motivata.
- [ ] **P0 — Validare YAML, JSON e front matter:** bloccare metadati malformati e campi obbligatori mancanti.
- [ ] **P0 — Aggiungere spell checking tecnico:** dizionario personalizzato per acronimi, comandi, protocolli e vendor.
- [ ] **P1 — Testare snippet e script non distruttivi:** linting shell/Python, test unitari e controllo degli exit code.
- [ ] **P1 — Generare automaticamente indice e matrice di copertura:** impedire divergenze tra navigazione e contenuti.
- [ ] **P1 — Configurare job separati e con permessi minimi:** documentazione, test, sicurezza e build devono fallire in modo leggibile.
- [ ] **P1 — Rendere obbligatori i controlli principali sulle pull request:** Markdown, link interni, metadati, secret scan e test.
- [ ] **P2 — Pubblicare un'anteprima della documentazione:** build automatica per ogni pull request e sito statico dalla branch principale.
- [ ] **P2 — Aggiungere release versionate:** changelog, tag e artefatto offline per milestone significative.

#### Collaborazione e manutenzione

- [ ] **P0 — Creare `CONTRIBUTING.md`:** setup, convenzioni editoriali, flusso branch/PR, test locali e regole per fonti e traduzioni.
- [ ] **P0 — Aggiungere template di issue e pull request:** bug contenutistico, proposta didattica, nuovo quiz, nuovo lab e problema di sicurezza.
- [ ] **P1 — Definire `CODEOWNERS`:** assegnare revisione a contenuti, sicurezza, automazioni, traduzioni e UX.
- [ ] **P1 — Aggiungere una policy di versionamento:** distinguere correzioni, nuovi contenuti, cambiamenti strutturali e aggiornamenti dell'esame.
- [ ] **P1 — Introdurre un processo di deprecazione:** marcare materiale superato senza rimuovere immediatamente il contesto storico utile.
- [ ] **P2 — Automatizzare le issue ricorrenti:** revisione link, aggiornamento fonti, audit dipendenze e verifica della parità linguistica.

**Criteri di accettazione:** una nuova pagina può essere aggiunta seguendo un template; la pull request riceve feedback automatico chiaro; indice e controlli non richiedono aggiornamenti manuali fragili.

---

### 🛡️ Security Posture & Content

**Obiettivo:** rendere il progetto sicuro da mantenere, tecnicamente affidabile e adatto a esercitazioni controllate.

#### Governance e sicurezza del repository

- [ ] **P0 — Creare `SECURITY.md`:** canale di segnalazione, categorie accettate, tempi indicativi e regole di disclosure responsabile.
- [ ] **P0 — Applicare il principio del minimo privilegio ai workflow:** dichiarare `permissions` espliciti, preferibilmente in sola lettura.
- [ ] **P0 — Bloccare credenziali e dati sensibili:** attivare secret scanning e aggiungere un controllo preventivo nelle pull request.
- [ ] **P0 — Introdurre SAST per gli script:** analisi specifica per i linguaggi realmente presenti, evitando scanner non pertinenti.
- [ ] **P0 — Verificare le dipendenze:** aggiornamenti automatici, lockfile versionati e revisione delle nuove dipendenze.
- [ ] **P0 — Fissare le GitHub Actions a commit immutabili:** documentare il processo di aggiornamento dei riferimenti.
- [ ] **P1 — Generare un SBOM quando esiste software distribuibile:** includerlo nelle release e conservarne la provenienza.
- [ ] **P1 — Applicare branch protection:** review obbligatoria, status check, conversazioni risolte e divieto di force push sulla branch principale.
- [ ] **P1 — Aggiungere scansione IaC e container:** solo se il repository contiene Dockerfile, Compose, Terraform o configurazioni equivalenti.
- [ ] **P2 — Firmare release e attestare la provenienza:** valutare artifact attestation per pacchetti, immagini o siti generati.

#### Qualità e correttezza dei contenuti

- [ ] **P0 — Creare una matrice di copertura SY0-701:** dominio, obiettivo, pagina, stato, profondità, quiz, lab e data dell'ultima revisione.
- [ ] **P0 — Distinguere fonti primarie e secondarie:** privilegiare documentazione ufficiale, standard, RFC e pubblicazioni autorevoli.
- [ ] **P0 — Aggiungere citazioni verificabili:** ogni affermazione normativa, configurazione sensibile o dato soggetto a cambiamento deve indicare fonte e data di consultazione.
- [ ] **P0 — Revisionare gli esempi per evitare cattive pratiche:** nessuna credenziale reale, disabilitazione ingiustificata dei controlli o comando distruttivo copiabile senza avvertenze.
- [ ] **P0 — Separare chiaramente teoria d'esame e pratica reale:** evidenziare semplificazioni, dipendenze dal contesto e differenze tra concetto, prodotto e implementazione.
- [ ] **P1 — Applicare peer review tecnica:** almeno una revisione per accuratezza e una per chiarezza sui contenuti ad alto impatto.
- [ ] **P1 — Etichettare la freschezza dei contenuti:** `reviewed`, `needs-review`, `deprecated` con data e responsabile.
- [ ] **P1 — Aggiungere errata e storico correzioni:** rendere trasparenti gli errori sostanziali già corretti.
- [ ] **P1 — Collegare attacchi, controlli e rilevazione:** per ogni scenario indicare vettore, impatto, mitigazione, evidenza e limite del controllo.
- [ ] **P2 — Mappare i contenuti a framework complementari:** NIST CSF, MITRE ATT&CK, CIS Controls o NICE, senza sostituire gli obiettivi CompTIA.

#### Laboratori pratici sicuri

- [ ] **P0 — Definire una policy per i lab:** uso esclusivo in ambienti autorizzati e isolati; divieto di bersagli pubblici o sistemi di terzi.
- [ ] **P0 — Creare un template standard:** obiettivi, scenario, prerequisiti, topologia, durata, rischio, setup, esercizio, evidenze, cleanup e domande finali.
- [ ] **P0 — Progettare isolamento e ripristino:** rete locale dedicata, dati sintetici, snapshot e comandi di cleanup testati.
- [ ] **P0 — Classificare il rischio del lab:** `low`, `moderate`, `advanced-controlled`, con avvertenze prima dei passaggi sensibili.
- [ ] **P1 — Aggiungere lab difensivi introduttivi:** analisi log, hardening, IAM, gestione certificati, backup, segmentazione e incident triage.
- [ ] **P1 — Aggiungere scenari attack-to-defense:** osservare un comportamento malevolo simulato e poi configurare prevenzione, rilevazione e risposta.
- [ ] **P1 — Fornire dati sintetici versionati:** log, IOC fittizi, configurazioni vulnerabili intenzionali e expected output privi di dati personali.
- [ ] **P1 — Validare automaticamente l'ambiente:** preflight check per virtualizzazione, porte, risorse e assenza di esposizione pubblica involontaria.
- [ ] **P1 — Fornire soluzioni progressive:** hint, soluzione ragionata, indicatori di successo e spiegazione degli errori comuni.
- [ ] **P2 — Creare lab containerizzati riproducibili:** immagini minimali, non privilegiate, con versioni fissate e teardown automatico.
- [ ] **P2 — Integrare telemetria didattica locale:** mostrare quali eventi sarebbero visibili a endpoint, rete, identity e SIEM.

**Criteri di accettazione:** nessun segreto rilevato; workflow a privilegi minimi; ogni lab è isolabile e ripristinabile; ogni contenuto critico presenta fonte, contesto e data di revisione.

---

### 🎨 Documentation & UX

**Obiettivo:** massimizzare comprensione, orientamento e continuità dello studio.

#### Architettura dell'informazione

- [ ] **P0 — Ridisegnare il README come landing page:** scopo, destinatari, stato, avvio rapido, domini, percorso consigliato e link essenziali.
- [ ] **P0 — Creare una navigazione per i cinque domini:** mantenere lo stesso ordine e gli stessi nomi in indice, cartelle e pagine.
- [ ] **P0 — Rendere visibile la copertura:** dashboard o tabella con percentuale basata su obiettivi verificati, non sul numero grezzo di file.
- [ ] **P0 — Definire percorsi di studio:** principiante, ripasso rapido, preparazione esame e consolidamento pratico.
- [ ] **P1 — Collegare prerequisiti e passi successivi:** ogni modulo deve indicare cosa conoscere prima e dove proseguire.
- [ ] **P1 — Integrare ricerca e glossario:** acronimi e termini devono essere raggiungibili senza interrompere il percorso.
- [ ] **P1 — Separare contenuto principale e approfondimenti:** evitare pagine sovraccariche e progressive disclosure incoerente.
- [ ] **P2 — Aggiungere una vista “Exam readiness”:** progressi per dominio, punti deboli e contenuti da rivedere.

#### Sistema editoriale e leggibilità

- [ ] **P0 — Creare template Markdown coerenti** per teoria, confronto, procedura, comando, quiz, scenario e lab.
- [ ] **P0 — Applicare una gerarchia dei titoli corretta:** un solo H1, sezioni brevi, ancore stabili e sommario per pagine lunghe.
- [ ] **P0 — Standardizzare callout:** `Nota`, `Esame`, `Pratica`, `Attenzione`, `Errore comune`, `Approfondimento`.
- [ ] **P0 — Migliorare i blocchi di codice:** linguaggio dichiarato, prompt distinguibile, output separato e righe pericolose commentate.
- [ ] **P1 — Usare tabelle solo per confronti reali:** evitare tabelle molto larghe o dense, soprattutto su dispositivi mobili.
- [ ] **P1 — Aggiungere riepiloghi di fine modulo:** concetti chiave, acronimi, errori frequenti e autovalutazione.
- [ ] **P1 — Inserire esempi progressivi:** concetto → mini-scenario → decisione → spiegazione → applicazione pratica.
- [ ] **P1 — Definire una style guide:** tono, terminologia, maiuscole, acronimi, nomi dei controlli e traduzioni approvate.
- [ ] **P1 — Mantenere parità semantica IT/EN:** ogni traduzione deve preservare significato tecnico e terminologia standard.

#### Accessibilità e inclusione

- [ ] **P0 — Aggiungere testo alternativo informativo alle immagini:** evitare descrizioni ridondanti o basate solo sull'aspetto.
- [ ] **P0 — Non affidarsi esclusivamente al colore:** stato, rischio e risposta corretta devono avere anche etichette testuali o icone.
- [ ] **P0 — Verificare contrasto e leggibilità degli asset:** includere resa light/dark quando necessario.
- [ ] **P1 — Fornire versioni testuali dei diagrammi:** descrivere flussi, relazioni e ordine degli eventi.
- [ ] **P1 — Limitare emoji decorative e badge:** usarli come supporto, non come unica informazione.
- [ ] **P1 — Verificare link descrittivi:** evitare etichette generiche come “clicca qui”.
- [ ] **P2 — Testare il sito documentale:** tastiera, zoom, screen reader, viewport mobile e preferenze di movimento ridotto.

#### Apprendimento e valutazione

- [ ] **P0 — Definire una banca domande strutturata:** ID, dominio, obiettivo, difficoltà, risposta, spiegazione e distrattori motivati.
- [ ] **P0 — Spiegare tutte le opzioni:** indicare perché la risposta corretta è migliore e perché le altre non lo sono nel contesto.
- [ ] **P0 — Evitare dump o riproduzioni dell'esame:** produrre domande originali orientate agli obiettivi e rispettose della proprietà intellettuale.
- [ ] **P1 — Aggiungere quiz per obiettivo:** feedback immediato e collegamento alla pagina da ripassare.
- [ ] **P1 — Introdurre scenari performance-based originali:** ordinamento, matching, interpretazione di log, risposta a incidente e scelta del controllo.
- [ ] **P1 — Bilanciare la difficoltà:** classificazione coerente e revisione dei distrattori ambigui.
- [ ] **P1 — Aggiungere spaced repetition:** esportazione flashcard o pianificazione locale senza raccolta obbligatoria di dati.
- [ ] **P2 — Creare simulazioni temporizzate:** blueprint configurabile, spiegazioni post-sessione e analisi per dominio.

**Criteri di accettazione:** uno studente individua rapidamente il punto di partenza, segue un percorso coerente e comprende l'errore dopo ogni domanda senza dipendere da conoscenze implicite.

---

## 🧭 Piano di esecuzione consigliato

| Milestone | Focus | Dipendenze | Risultato atteso |
|---|---|---|---|
| **M0 — Baseline** | Audit, inventario, coverage map, threat model | Nessuna | Backlog verificato e rischi noti |
| **M1 — Fondazioni** | Struttura, README, policy, template, lint | M0 | Repository navigabile e contribuibile |
| **M2 — Quality Gate** | CI, link check, secret scan, SAST, validation | M1 | Pull request controllate automaticamente |
| **M3 — Content Quality** | Fonti, review, glossario, parità IT/EN | M1–M2 | Materiale coerente e verificabile |
| **M4 — Active Learning** | Quiz, scenari e primi lab difensivi | M3 | Studio applicato con feedback |
| **M5 — Learning Platform** | Sito, ricerca, progressi, simulazioni | M3–M4 | Esperienza didattica completa |

### Ordine delle prime dieci attività

1. [ ] Completare inventario e matrice di copertura.
2. [ ] Confermare la struttura target e la strategia bilingue.
3. [ ] Pubblicare policy di sicurezza e contribuzione.
4. [ ] Introdurre template editoriali e front matter.
5. [ ] Attivare Markdown lint, link check e validazione metadati.
6. [ ] Attivare secret detection e SAST pertinente.
7. [ ] Ridurre i permessi e fissare le dipendenze dei workflow.
8. [ ] Ridisegnare README, indice e percorsi di studio.
9. [ ] Revisionare un dominio pilota end-to-end.
10. [ ] Creare un quiz e un lab pilota, misurando chiarezza e riproducibilità.

---

## 🚀 Roadmap futura — Next Steps

- [ ] **Quiz interattivi offline-first:** nessun account obbligatorio, stato locale esportabile e feedback dettagliato.
- [ ] **Motore di ripasso adattivo:** suggerire contenuti sulla base degli errori per obiettivo, senza profilazione invasiva.
- [ ] **Simulatore di esame:** set originali, distribuzione configurabile per dominio e analisi delle prestazioni.
- [ ] **Lab on demand:** ambienti temporanei, isolati e ripristinabili con costi e limiti chiaramente indicati.
- [ ] **Repository di dataset didattici:** log sintetici, PCAP sanificati, alert, timeline e IOC fittizi con licenza esplicita.
- [ ] **Percorsi Blue Team e Red Team etici:** collegare gli stessi concetti a prevenzione, rilevazione e validazione autorizzata.
- [ ] **Modalità portfolio:** consentire allo studente di produrre report, runbook e write-up sanitizzati riutilizzabili professionalmente.
- [ ] **Dashboard di maturità del progetto:** copertura, freschezza, link health, accessibilità, sicurezza e stato delle traduzioni.
- [ ] **Release per aggiornamenti d'esame:** strategia di migrazione quando cambiano codice, obiettivi o terminologia della certificazione.
- [ ] **Community review periodica:** sessioni focalizzate su un dominio con revisori tecnici, didattici e linguistici.

---

## 📊 Metriche di successo

| Area | Indicatore | Target iniziale |
|---|---|---|
| Copertura | Obiettivi mappati a contenuti revisionati | 100% |
| Qualità | Link interni validi | 100% |
| Sicurezza | Segreti confermati nella branch principale | 0 |
| Sicurezza | Workflow con permessi espliciti | 100% |
| Manutenzione | Pagine con data e stato di revisione | 100% |
| Didattica | Domande con spiegazione di tutte le opzioni | 100% |
| Laboratori | Lab con isolamento e cleanup verificati | 100% |
| Accessibilità | Immagini informative con testo alternativo adeguato | 100% |
| Localizzazione | Moduli dichiarati bilingui semanticamente allineati | 100% |
| Contributor UX | Tempo per eseguire i controlli locali | Documentato e ripetibile |

> Le metriche devono misurare qualità reale. Non vanno usate per incentivare contenuti superficiali, duplicati o creati soltanto per aumentare una percentuale.

---

## ⚠️ Rischi da gestire

| Rischio | Impatto | Mitigazione |
|---|---|---|
| Contenuti obsoleti | Studio di concetti non più pertinenti | Owner, data di revisione e issue periodiche |
| Automazione eccessiva | Falsi positivi e manutenzione onerosa | Strumenti pertinenti, baseline e override motivati |
| Traduzioni divergenti | Ambiguità tecnica | Glossario condiviso e review bilingue |
| Lab esposti o distruttivi | Danno a sistemi o reti | Isolamento, preflight, dati sintetici e cleanup |
| Domande troppo simili all'esame | Rischio etico e di proprietà intellettuale | Contenuti originali basati sugli obiettivi |
| Dipendenze non affidabili | Compromissione della supply chain | Pinning, review, aggiornamenti e privilegi minimi |
| Crescita senza struttura | Navigazione e manutenzione difficili | Template, tassonomia e governance editoriale |

---

## ✅ Checklist per ogni nuovo contenuto

- [ ] È collegato a uno o più obiettivi SY0-701.
- [ ] Dichiara prerequisiti, livello e risultati di apprendimento.
- [ ] Usa fonti autorevoli e indica la data di verifica quando pertinente.
- [ ] Distingue ciò che serve per l'esame da ciò che dipende dal contesto reale.
- [ ] Non contiene segreti, dati personali o comandi pericolosi non contestualizzati.
- [ ] Include esempi originali e legalmente distribuibili.
- [ ] Rispetta template, glossario e terminologia bilingue.
- [ ] Supera lint, link check e controlli di sicurezza.
- [ ] È accessibile senza affidarsi solo a colore, immagini o formattazione visiva.
- [ ] Indica owner, data dell'ultima revisione e prossimo controllo.

---

## 📝 Registro avanzamento

| Data | Milestone | Modifica | Issue/PR | Stato |
|---|---|---|---|---|
| _YYYY-MM-DD_ | _M0–M5_ | _Descrizione sintetica_ | _#000_ | _Pianificato/In corso/Completato/Bloccato_ |

---

## Nota legale ed etica

Questo progetto ha finalità esclusivamente formative. Esempi offensivi, simulazioni e laboratori devono essere eseguiti soltanto su sistemi propri o esplicitamente autorizzati, in ambienti isolati e nel rispetto delle leggi applicabili. CompTIA e Security+ sono marchi dei rispettivi proprietari; il repository deve chiarire la propria natura indipendente e non affiliata.
