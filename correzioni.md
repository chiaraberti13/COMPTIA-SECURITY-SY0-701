# Correzioni ai contenuti didattici SY0-701

Registro di lavoro sulla revisione dei contenuti (checklist per dominio, glossario,
domande e spiegazioni), in italiano e in inglese.

**Ambito:** solo contenuto didattico. Codice dell'applicazione, UI, stile e logica del
quiz non vengono modificati; gli eventuali problemi tecnici sono segnalati a parte, in
fondo a questo documento.

**Regole di lavoro**

- Struttura dei dati e identificativi delle domande invariati: cambia solo il testo.
  Le domande nuove usano id nuovi in coda al dominio.
- Ogni modifica è applicata in modo coerente in IT e in EN, con i termini tecnici
  standard inglesi e non traduzioni letterali dall'italiano.
- Terminologia ufficiale CompTIA SY0-701; standard di settore (NIST, ISO 27001,
  MITRE ATT&CK, OWASP) dove pertinenti.
- Ogni voce si spunta solo dopo che `npm run check` (typecheck, lint, test) è verde.

**Stato del dataset:** 535 voci di glossario e 642 domande, copertura EN al 100%.

---

## Legenda

- `[ ]` da fare · `[x]` completato
- **P1** errore tecnico · **P2** duplicato o dominio errato · **P3** lacuna rispetto
  agli obiettivi · **P4** rifinitura didattica

---

## Completato

### P1 — Errori tecnici e terminologia non conforme

- [x] **BPA espanso in modo errato** — 13 occorrenze IT+EN: «Business Partnership
      Agreement» → «Business Partners Agreement», la dicitura dell'obiettivo 5.3.
      Voce di glossario riscritta con esempio pratico e criterio di scelta fra
      accordi.
- [x] **DKIM** — `D4#190`: «Domain Keys Identified Mail» → «DomainKeys Identified
      Mail» (RFC 6376). La spiegazione della stessa domanda usava già la forma
      corretta.
- [x] **Terminologia dei penetration test** — i tre formati erano insegnati solo come
      black/white/grey box. Allineati a unknown / known / partially known environment
      (Obj 5.5), con la dicitura storica fra parentesi come ponte: tre voci di
      glossario, `D5#64`, `D5#133` e il distrattore A di `D4#279`.
- [x] **`D4#16`: la spiegazione smentiva sé stessa** — elencava fra i distrattori
      «A) e C)», ma C è la risposta corretta, in IT e in EN. Analisi rifatta con una
      motivazione per ciascuna opzione errata.
- [x] **`D5#1` e `D5#5` (solo EN): lettere tradotte fuori passo** — l'analisi dei
      distrattori apriva con `**A)`, che in entrambe è la risposta corretta.
      L'italiano diceva correttamente B.

### P2 — Duplicati e dominio errato

- [x] **`D2#37` duplicava `D5#146`** ed era anche l'unica domanda del Dominio 2
      etichettata «Risk Management & Analysis», materia del Dominio 5. Riscritta
      sugli indicatori di attività malevola (Obj 2.4), a partire da *out-of-cycle
      logging*, che non era trattato da nessuna parte.
- [x] **Etichette errate rispetto al contenuto** — `D1#164` (test pilota prima di un
      cambiamento, Obj 1.3) da «Baselines & Configuration» a «Change Management»;
      `D5#130` (ciclo di vita delle chiavi) da «Compliance, Privacy, Due Diligence &
      Due Care» a «Cryptography & Key Management».

### P3 — Lacune rispetto agli obiettivi

- [x] **EDR e XDR (Obj 4.5)** — nessuna voce di glossario; XDR compariva una sola
      volta in tutto il materiale. Nuova voce che mette in fila antivirus, EDR, XDR
      e SIEM.
- [x] **Hard token, soft token, security key (Obj 4.6)** — i termini d'esame non
      comparivano mai, e mancava quale implementazione resiste al phishing. Nuova
      voce con la scala di robustezza.
- [x] **Time-of-day restrictions (Obj 4.6)** — assenti. Nuova voce, associata alle
      restrizioni geografiche come attributi contestuali.
- [x] **Modalità di penetration test (Obj 5.5)** — mancava l'asse offensive /
      defensive / integrated / physical. Nuova voce più la domanda `D5#163`.
- [x] **Gerarchia dei documenti di governance (Obj 5.1)** — policy / standard /
      procedura / linea guida esisteva in una sola riga, senza criterio per
      distinguerle. Voce espansa più la domanda `D5#164`.

### P4 — Rifiniture didattiche

- [x] **`D5#6`** — spiegava i calcoli SLE/ALE ma taceva sui tre distrattori, che sono
      la parte istruttiva. Ora ciascun errore è spiegato come errore.
- [x] **`D5#122`, `D5#127`, `D5#130`** — liquidavano i distrattori con «A, B e D sono
      tutti…». Ora ogni opzione ha la sua motivazione, più una trappola d'esame sul
      metodo per le domande con NON/ECCETTO.
- [x] **16 opzioni del Dominio 5 erano bilingui** — le opzioni italiane ripetevano il
      testo inglese fra parentesi (`#114`, `#119`, `#120`, `#122`, `#126`, `#128`,
      `#130`). Rimosse 19 occorrenze, incluse le citazioni nelle spiegazioni.

---

## Completato in questa tranche

### P3 — Lacune rispetto agli obiettivi SY0-701

- [x] **Obj 5.6 — Security Awareness, quattro argomenti mancanti.** Il gruppo aveva
      solo quattro voci (phishing, password, social engineering, insider threat).
      Aggiunte le quattro che gli obiettivi elencano e che non erano trattate:
  - [x] *Anomalous behavior recognition* — le tre categorie da riconoscere (rischioso,
        inatteso, involontario) e la cultura della segnalazione senza colpa.
  - [x] *Removable media and cables* — USB drop attack, cavi manomessi, juice jacking,
        USB data blocker, con la distinzione fra livello umano e controlli tecnici.
  - [x] *Operational security (OPSEC)* — il processo in cinque passi e il principio
        dell'aggregazione, presentato come rovescio dell'OSINT.
  - [x] *Hybrid and remote work practices* — rete, ambiente fisico e dispositivi di
        casa, con il legame a Zero Trust.
- [x] **Obj 1.4 — «open public ledger».** La voce Blockchain descriveva correttamente
      un registro distribuito e immutabile, ma non usava il termine con cui
      l'obiettivo la nomina. Riscritta attorno alla dicitura ufficiale, con le quattro
      proprietà e la trappola su ciò che **non** garantisce: la riservatezza, perché
      il registro è pubblico per costruzione.
- [x] **Obj 5.3 — «right-to-audit clause».** Era accennata in una riga. Nuova voce
      che spiega le quattro cose che una clausola esigibile deve dire (preavviso,
      frequenza, perimetro, chi paga), il motivo per cui va negoziata prima della
      firma, e le valutazioni indipendenti che in pratica la soddisfano, con la
      distinzione SOC 2 Type I / Type II.
- [x] **Domanda di verifica per le nuove voci di awareness.** `D5#165` sull'OPSEC: un
      attaccante costruisce un phishing credibile aggregando solo informazioni
      pubbliche, e i distrattori (classificazione, DLP, NDA) si distinguono per
      *su che cosa agiscono*.

### P4 — Rifiniture

- [x] **`D5#81`: etichetta imprecisa.** La domanda riguarda gli indicatori
      comportamentali di minaccia interna ed era etichettata «Social Engineering».
      Rietichettata «Security Awareness» (Obj 5.6), che ora non è un topic isolato
      perché lo condivide con `D5#165`.

---

## Da fare

- [ ] **Nessun intervento aperto.** Le lacune rilevate rispetto agli obiettivi
      SY0-701 sono state colmate e i difetti trovati corretti. Restano solo le
      decisioni editoriali elencate qui sotto, che spettano all'autore.

---

## Decisioni che spettano all'autore

Domande tecnicamente corrette ma collocate in un dominio diverso da quello del loro
obiettivo. **Non modificate**: spostarle cambierebbe gli identificativi, e il
materiale resta valido dov'è. Elencate perché la scelta è editoriale, non tecnica.

| Domanda | Contenuto | Obiettivo reale |
| --- | --- | --- |
| `D5#105` | RBAC | 4.6 |
| `D5#131` | Modelli di servizio cloud (FaaS) | 3.1 |
| `D5#130` | Ciclo di vita delle chiavi | 1.4 |
| `D1#46` | Riconoscimento di una minaccia in un corso awareness | 2.2 / 5.6 |
| `D3#176` | Governance, board e comitati | 5.1 |
| `D3#420` | Compliance e privacy | 5.4 |
| `D4#405`, `#407`, `#249`, `#255`, `#262`, `#287` | Principi, policy, rischio, terze parti | 5.x |

---

## Segnalazioni tecniche

Problemi rilevati fuori dall'ambito dei contenuti.

- [x] **Nessun disclaimer visibile nell'applicazione.** I README lo dicevano, ma chi
      usa l'app non legge il README. Aggiunta una riga a piè di pagina, sempre
      visibile, in IT e in EN. *(Risolto su richiesta esplicita dell'autore, con
      modifica a `src/i18n.tsx` e `src/App.tsx`.)*
- [x] **Assenza di segnale automatico sulla coerenza delle spiegazioni.** Aggiunti
      due test: l'apertura nomina esattamente le opzioni corrette, e nessuna opzione
      corretta compare fra i distrattori. Sono i test che hanno trovato `D5#1` e
      `D5#5`.
- [x] **`SUBGROUP_MAP` senza copertura di test.** Una voce di glossario non mappata
      veniva resa standalone in silenzio. Le 25 voci deliberatamente standalone sono
      ora elencate in `STANDALONE_SUBTOPICS` e due test impongono una scelta
      esplicita per ogni voce nuova.

### Aperte

- [ ] **Nessuna.**

---

## Controlli automatici disponibili

Oltre alla suite `npm run check`, la revisione si appoggia a controlli scritti per
l'occasione, che conviene rieseguire dopo ogni tranche di modifiche:

| Controllo | Ultimo esito |
| --- | --- |
| Allineamento strutturale IT/EN (opzioni, override, marcatore «scegli due») | 0 problemi |
| Coerenza lettera citata ↔ risposta corretta (ora nei test) | 0 |
| Opzione corretta citata fra i distrattori (ora nei test) | 0 |
| Residui italiani nel dataset inglese | 0 |
| Espansioni di ~70 acronimi rispetto agli standard | 0 |
| Numeri di porta (30 servizi) | 0 errori |
| Fatti crittografici (lunghezze chiave, simmetrico/asimmetrico, hash) | 0 errori |
| Coerenza numerica `ALE = SLE × ARO` | 0 errori |
| Duplicati semantici fra domande | 0 |
| Cue bias (opzione corretta ≥ 2× le altre) | 0 |
| Distribuzione della risposta corretta | A 162 · B 169 · C 163 · D 153 |

---

## Nota sui contenuti

Questi materiali sono note di studio personali e originali. Non sono materiale
ufficiale CompTIA e non riproducono domande dell'esame reale. Obiettivi d'esame,
costi e policy vanno sempre verificati sulle fonti ufficiali CompTIA.
