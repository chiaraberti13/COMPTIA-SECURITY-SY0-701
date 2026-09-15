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

**Stato del dataset:** 535 voci di glossario e 642 domande, copertura EN al 100%
secondo i controlli strutturali precedenti. La presenza di una traduzione non ne
certifica l'equivalenza tecnica; la revisione semantica rimane aperta.

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

- [ ] **Interventi aperti:** vedi «Seconda revisione dei contenuti» qui sotto.
      Le voci completate sopra descrivono il lavoro precedente, non attestano
      l'assenza di ulteriori errori o lacune. Non spuntare le nuove voci prima
      della modifica testuale coerente in IT/EN e della verifica del dataset.

---

## Seconda revisione dei contenuti — 15 settembre 2026

**Perimetro della tranche:** lettura delle cinque sezioni del dataset IT, degli
override EN, del registro e degli obiettivi ufficiali; controllo strutturale delle
642 domande (105/129/112/171/125 per i domini 1–5), degli identificativi,
delle risposte e delle spiegazioni per riferimenti espliciti alle opzioni.
Le segnalazioni qui sotto sono verificate sui passi indicati. Il controllo
automatico delle lettere non dimostra che tutte le 642 spiegazioni siano corrette
o che ogni distrattore sia inequivocabile: **una revisione semantica domanda per
domanda resta da completare**. La copertura lessicale di un obiettivo non prova
che sia trattato abbastanza in profondità.

### Report per dominio

| Dominio | Riscontro accertato | Implicazione didattica |
| --- | --- | --- |
| 1.0 General Security Concepts | La voce Blockchain identifica la blockchain con un registro necessariamente pubblico e attribuisce non ripudio automatico; la voce Non-Repudiation descrive la firma come «cifratura dell'hash» e promette una prova giuridica assoluta; Zero Trust prescrive la cifratura di *ogni richiesta* come requisito universale. | Distinguere tipo di ledger, firma, integrità e riservatezza; evitare assoluti nelle architetture. |
| 2.0 Threats, Vulnerabilities & Mitigations | Nelle voci e domande campionate non è emersa una nuova lacuna terminologica certa. | Verificare ancora, una domanda alla volta, unicità della risposta e plausibilità dei distrattori: la ricerca di termini non sostituisce il giudizio tecnico. |
| 3.0 Security Architecture | La nota EAP-TLS scambia l'autenticazione reciproca client/server per MFA dell'utente; `D3#29` chiama la VPN «end-to-end» fino alla risorsa interna e riunisce tre distrattori in una sola motivazione. | Separare protezione del canale, autenticazione reciproca e fattori dell'utente. |
| 4.0 Security Operations | Il gruppo «Identity & Access Control Models (Obj 4.6)» è nel Dominio 1; nelle domande del Dominio 4 campionate non è emerso un nuovo errore certo. | Rendere visibile la corrispondenza dell'IAM con l'obiettivo 4.6 e completare la lettura semantica delle domande del Dominio 4. |
| 5.0 Security Program Management & Oversight | `D5#6` dà la formula ALE corretta ma conclude che spendere oltre ALE per un controllo non ha senso; la checklist Password Policies impone la complessità di caratteri come regola obbligatoria. | Separare stima del rischio, decisione sul controllo e policy delle password corrente. |

**Allineamento IT/EN:** gli errori su Blockchain, Zero Trust, EAP-TLS,
password e ALE sono presenti in entrambe le lingue; non sono semplici difetti
di traduzione. La voce Non-Repudiation presenta lo stesso modello riduttivo
in IT ed EN. `D3#29` riunisce i distrattori in IT e anche nell'override EN.
La copertura EN del 100% è quindi strutturale, non una certificazione di qualità.

### Piano ordinato per priorità

- [ ] **P1 — Modelli tecnici falsi o categorici:** S1 Blockchain/open public
      ledger, S2 EAP-TLS/MFA, S3 ALE e costo dei controlli, S4 firme digitali
      e non ripudio.
- [ ] **P1 — Indicazioni operative da correggere:** S5 policy password,
      S6 Zero Trust. Cercare nelle altre voci e domande gli stessi enunciati
      prima di considerare conclusa ogni correzione.
- [ ] **P3 — Allineamento agli obiettivi:** S7 gruppo IAM nel Dominio 1;
      conservare i `checklistKey` e gli id. Una decisione sulla collocazione
      editoriale non autorizza a riscrivere la struttura dei dati.
- [ ] **P4 — Spiegazioni:** S8 `D3#29`; poi controllo semantico incrementale
      D1 → D2 → D3 → D4 → D5, con una riga distinta per ogni distrattore,
      esempi e trappole d'esame solo quando aiutano a distinguere i concetti.

### Correzioni testuali proposte (aperte; dataset non modificato)

I «prima» sono estratti esatti dei campi attuali; i «dopo» sono testi
sostitutivi per **il campo specificato**, senza modifica di id, opzioni o schema.
Per i campi `details` lunghi si indica il passo da sostituire e si mantengono
gli altri passi soltanto dopo averli ricontrollati.

**S1 · P1 · Blockchain e open public ledger (Obj 1.4).**
`src/data.ts`, `BlockchainConcept.definition/details/examTip`;
`src/data.en.ts`, override omonimo.

| Lingua | Prima (estratto) | Dopo (testo guida) |
| --- | --- | --- |
| IT | «Un registro pubblico distribuito (**open public ledger**)»; «gli obiettivi ... chiamano questa tecnologia **open public ledger**»; «alterare un dato richiederebbe il ricalcolo ... su oltre la metà dei nodi»; «integrità e non ripudio ... ma non riservatezza, perché il registro è pubblico per costruzione». | **Definizione:** «Blockchain: registro distribuito resistente alle alterazioni, in cui i blocchi sono collegati tramite hash; può essere pubblico oppure permissioned. Open public ledger: registro consultabile pubblicamente, spesso realizzato con una blockchain pubblica.» **Dettagli:** «La resistenza alle modifiche dipende da hash, consenso e regole della rete; la soglia del 51% non descrive universalmente tutti i meccanismi di consenso. Un hash rende rilevabile un'alterazione, mentre autenticità e non ripudio richiedono ulteriori prove, per esempio firme e gestione affidabile delle chiavi.» **Nota:** «Gli obiettivi 1.4 elencano separatamente blockchain e open public ledger. Un ledger pubblico espone le informazioni registrate; uno permissioned può limitare la lettura. Non inserire dati segreti in chiaro in un ledger pubblico.» |
| EN | “An open public ledger”; “the official ... objectives call this technology an open public ledger”; “recomputing ... on more than half the nodes”; “integrity and non-repudiation ... but not confidentiality, because the ledger is public by design”. | **Definition:** “Blockchain: a tamper-resistant distributed ledger whose blocks are linked by hashes; it may be public or permissioned. Open public ledger: a publicly readable ledger, often implemented using a public blockchain.” **Details:** “Tamper resistance depends on hashing, consensus and network rules; a 51% threshold does not apply universally to every consensus mechanism. Hashes make alteration detectable; authenticity and non-repudiation need additional evidence such as signatures and trustworthy key management.” **Tip:** “Objective 1.4 lists blockchain and open public ledger separately. Public ledgers expose recorded information; permissioned ledgers may restrict read access. Do not publish secrets in plaintext on a public ledger.” |

Motivo: gli obiettivi distinguono i due termini; una blockchain non conferisce
da sola riservatezza o non ripudio. Rivedere anche l'esempio del consorzio:
un registro permissioned non è leggibile automaticamente da ogni cliente.

**S2 · P1 · EAP-TLS non equivale a MFA (Obj 3.2/4.6).**
`src/data.ts`, `EAPProtocol_New.examTip`; `src/data.en.ts`, stesso override.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «EAP-TLS ... richiede certificati digitali sia sul client sia sul server (MFA nativa basata su certificati).» | «EAP-TLS usa certificati per autenticazione reciproca del client e del server. Il certificato del server prova il server al client: **non è un secondo fattore dell'utente**. La MFA dell'utente richiede due fattori distinti, per esempio possesso della chiave client e un PIN verificato nel flusso di autenticazione.» |
| EN | “EAP-TLS ... requires digital certificates on both the client and the server (native certificate-based MFA).” | “EAP-TLS uses certificates for mutual client/server authentication. The server certificate authenticates the server to the client; **it is not a second user factor**. User MFA requires two distinct factors, such as possession of the client key and a PIN verified during authentication.” |

Motivo: autenticare le due estremità non prova due fattori del medesimo utente.

**S3 · P1 · ALE non è una soglia universale di spesa (Obj 5.2).**
`src/data.ts`, `D5#6.explanation` (ultima frase);
`src/data.en.ts`, `QUESTION_EN[5][6].explanation` (ultima frase).

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «non ha senso dal punto di vista economico investire più di $1.500 all'anno ... per eliminare questo rischio.» | «$1.500 è la perdita annua attesa **prima** del controllo, non un tetto automatico di spesa. Confronta il costo annualizzato del controllo con la **riduzione stimata dell'ALE** (ALE iniziale − ALE residua); considera inoltre obblighi normativi, impatti non monetari e propensione al rischio. Per esempio, se il controllo riduce ALE da $1.500 a $300, evita in media $1.200 annui: il suo costo va valutato rispetto a questo beneficio e agli altri vincoli.» |
| EN | “it makes no economic sense to invest more than $1,500 per year ... to eliminate this risk.” | “$1,500 is the expected annual loss **before** the control, not an automatic spending cap. Compare the control's annualized cost with the **estimated ALE reduction** (initial ALE − residual ALE), and consider regulatory duties, nonfinancial impacts and risk appetite. For example, reducing ALE from $1,500 to $300 avoids an expected $1,200 per year; weigh the control's cost against that benefit and other constraints.” |

Motivo: la risposta B e il calcolo sono corretti; solo la deduzione sull'acquisto
del controllo è sbagliata. Nessuna modifica a id, formula o opzioni.

**S4 · P1 · Firma digitale, prova e non ripudio (Obj 1.2/1.4).**
`src/data.ts`, `NonRepudiation.details`; `src/data.en.ts`, override.

| Lingua | Prima (estratto) | Dopo (passo e esempio) |
| --- | --- | --- |
| IT | «genera l'hash ... e lo cifra utilizzando la propria chiave privata»; «può decifrare la firma»; «non può fare causa alla banca ... garantendo il non-ripudio». | «Il firmatario calcola l'hash e crea una **firma** con la chiave privata mediante un algoritmo di firma; il verificatore usa la chiave pubblica per **verificare** firma e integrità. Non è cifratura del documento né, in generale, “decifrare l'hash”. La firma offre evidenza di origine e integrità se la chiave e la sua associazione al firmatario sono affidabili. Nell'esempio bancario la firma aiuta a provare l'ordine, ma identità, custodia della chiave, log e norme applicabili determinano il valore della prova; non vieta un'azione legale.» |
| EN | “encrypts [the hash] using their private key”; “decrypt the signature”; “cannot sue the bank ... guaranteeing non-repudiation”. | “The signer hashes the message and produces a **signature** with the private key using a signature algorithm; the verifier uses the public key to **verify** the signature and integrity. This does not encrypt the document and is not, in general, ‘decrypting the hash’. A signature provides evidence of origin and integrity when the key and its binding to the signer are trustworthy. In the banking example it supports proof of the order; identity, key custody, logs and applicable law determine its evidentiary value. It does not bar a legal challenge.” |

Motivo: distinguere firma e cifratura evita una trappola ricorrente; il non ripudio
è supportato da prove e processi, non una certezza giuridica automatica.

**S5 · P1 · Password policy e linee guida correnti (Obj 4.6).**
`src/data.ts`, voce `PasswordPoliciesAccount`, passo «Password Policies»
in `details`;
`src/data.en.ts`, override della stessa voce.

| Lingua | Prima (estratto) | Dopo (passo) |
| --- | --- | --- |
| IT | «Definizione obbligatoria di regole di complessità (maiuscole, minuscole, numeri, simboli)». | «Definire lunghezza adeguata e verificare le nuove password contro elenchi di credenziali compromesse o comuni; consentire password lunghe e password manager. Non insegnare l'obbligo di mischiare classi di caratteri come raccomandazione NIST: una policy interna può imporlo, ma NIST SP 800-63B non lo raccomanda. Richiedere il cambio quando vi sono indizi di compromissione, non automaticamente per ogni scadenza arbitraria.» |
| EN | “Mandatory definition of complexity rules (uppercase, lowercase, numbers, symbols)”. | “Set suitable length and screen new passwords against compromised or common-password blocklists; allow long passwords and password managers. Do not present mandatory character-class mixtures as a NIST recommendation: an internal policy may require them, but NIST SP 800-63B does not. Require changes on evidence of compromise, rather than arbitrary periodic expiry.” |

Motivo: gli obiettivi richiedono i concetti di password; le istruzioni normative
attribuite implicitamente allo standard devono riflettere la guida aggiornata.

**S6 · P1 · Zero Trust e protezione del canale (Obj 1.2).**
`src/data.ts`, `ZeroTrustIntro.examTip` e passo «Verifica Continua»;
`src/data.en.ts`, stesso override.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «ogni richiesta di accesso deve essere autenticata, autorizzata e crittografata prima di concedere l'accesso». | «Zero Trust non accorda fiducia implicita in base alla posizione di rete. Prima di stabilire una sessione verso la risorsa verifica soggetto e dispositivo e applica una decisione di autorizzazione; proteggi il traffico con protocolli appropriati e monitora la sessione secondo il rischio. La cifratura del canale è una misura di protezione, non un fattore di autenticazione né una regola per “cifrare la richiesta” prima della decisione.» |
| EN | “every access request must be authenticated, authorized and encrypted before access is granted.” | “Zero Trust grants no implicit trust based on network location. Before establishing a resource session, authenticate the subject and device and enforce an authorization decision; protect traffic with suitable protocols and monitor the session according to risk. Channel encryption is a protection, not an authentication factor or a rule to ‘encrypt the request’ before making the access decision.” |

Motivo: NIST SP 800-207 separa la decisione di accesso dai mezzi di protezione
del traffico; evitare di trasformare un esempio di implementazione in un assioma.

**S7 · P3 · Copertura IAM nel dominio corretto (Obj 4.6).**
`src/data.ts`, titolo del gruppo «8. Identity & Access Control Models
(Obj 4.6)» nel Dominio 1; `src/data.en.ts`, `GROUP_EN` dello stesso titolo.
**Prima IT/EN:** gruppo 4.6 elencato sotto il Dominio 1. **Dopo IT/EN
proposto:** collocare editorialmente la checklist IAM sotto Security Operations
4.6 oppure renderne esplicito nel titolo e nella guida il rinvio «Approfondimento
IAM → Obj 4.6 / Security Operations». Motivo: un obiettivo 4.6 può essere studiato
in anticipo, ma non deve sembrare coperto dal Dominio 1. Non spostare array,
`checklistKey` o identificativi in una correzione solo testuale: decidere prima
come rappresentare il rinvio senza modificare la struttura.

**S8 · P4 · `D3#29`: distrattori e limiti della VPN (Obj 3.2).**
`src/data.ts`, `D3#29.explanation`; `src/data.en.ts`,
`QUESTION_EN[3][29].explanation`.

| Lingua | Prima (estratto) | Dopo (passi da sostituire) |
| --- | --- | --- |
| IT | «canale protetto end-to-end»; «firme crittografiche dei pacchetti»; «A), C) e D) ... Telnet, FTP o HTTP». | «La VPN protegge il traffico **tra il client e il gateway VPN** con cifratura e controllo di integrità/autenticazione del canale; il tratto dal gateway al database richiede protezioni proprie se attraversa segmenti non fidati. MFA limita l'abuso delle credenziali.» **A:** «Telnet espone credenziali e comandi.» **C:** «FTP in chiaro espone credenziali e dati; l'accesso anonimo amplia il rischio.» **D:** «HTTP senza TLS espone richieste e risposte; la porta 8080 non implica cifratura.» |
| EN | “end-to-end protected channel”; “cryptographic signatures on packets”; “A), C) and D) ... Telnet, FTP or unencrypted HTTP”. | “The VPN protects traffic **between client and VPN gateway** using encryption and channel integrity/authentication; the gateway-to-database leg needs its own protection if it crosses untrusted segments. MFA reduces credential abuse.” **A:** “Telnet exposes credentials and commands.” **C:** “Plain FTP exposes credentials and data; anonymous access widens exposure.” **D:** “HTTP without TLS exposes requests and responses; port 8080 does not imply encryption.” |

Motivo: la risposta B resta unica e l'id invariato, ma la spiegazione deve
descrivere il confine del tunnel e distinguere i tre errori.

### Lacune e verifiche ancora da colmare

- [ ] Costruire una matrice **obiettivo → checklist → domanda → spiegazione**
      per tutti i sotto-obiettivi 1.1–5.6, con evidenza di profondità e non
      soltanto presenza della parola. Partire da 4.6 IAM e 1.4 blockchain/open
      public ledger; segnalare come *non verificati* gli altri obiettivi finché
      non sono letti semanticamente.
- [ ] Controllare le 642 domande in tranche per dominio: una sola risposta
      difendibile nello scenario, distrattori plausibili, nessuna supposizione
      nascosta, spiegazione individuale per ciascuna opzione. Le lettere presenti
      nel testo sono un controllo di forma, non di correttezza.
- [ ] Cercare in glossario, checklist e quiz le stesse generalizzazioni (MFA
      da certificati client/server, firma = cifratura con privata, blockchain =
      sempre pubblica, ALE = budget massimo, cifratura obbligatoria di ogni
      richiesta) e verificare che IT/EN sostengano la stessa distinzione.
- [ ] Controllare i mnemonici esistenti contro i casi limite: IDS/IPS, DAC/MAC/
      RBAC/ABAC, phishing/vishing/smishing, cifratura simmetrica/asimmetrica.
      Aggiungere esempi soltanto quando chiariscono la risposta, evitando
      regole «sempre/mai» non vere.

**Fonti primarie della revisione:** [CompTIA SY0-701 Exam Objectives v5.0](https://assets.ctfassets.net/82ripq7fjls2/6TYWUym0Nudqa8nGEnegjG/0f9b974d3b1837fe85ab8e6553f4d623/CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf)
(Obj 1.2, 1.4, 3.2, 4.6, 5.2);
[NIST IR 8202 — Blockchain Technology Overview](https://csrc.nist.gov/pubs/ir/8202/final);
[NIST SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final);
[NIST SP 800-63B — Digital Identity Guidelines](https://pages.nist.gov/800-63-4/sp800-63b.html);
[RFC 8017 — PKCS #1](https://www.rfc-editor.org/rfc/rfc8017.html)
(firme RSA). Nessun riferimento a domande reali d'esame.

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

Nella seconda revisione non è stato verificato alcun nuovo bug tecnico:
le nuove voci riguardano esclusivamente contenuto e collocazione didattica.
I controlli automatici qui sotto descrivono l'ultimo esito registrato dalla
revisione precedente, salvo la distribuzione delle risposte ricontata oggi;
non equivalgono a una nuova esecuzione completa della suite.

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
| Distribuzione della risposta corretta | A 162 · B 167 · C 160 · D 153 = 642 (ricontata sul dataset corrente) |

---

## Nota sui contenuti

Questi materiali sono note di studio personali e originali. Non sono materiale
ufficiale CompTIA e non riproducono domande dell'esame reale. Obiettivi d'esame,
costi e policy vanno sempre verificati sulle fonti ufficiali CompTIA.
