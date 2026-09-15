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
| 1.0 General Security Concepts | Blockchain confusa con registro necessariamente pubblico e non ripudio automatico; firma descritta come cifratura dell'hash; Zero Trust presentato come cifratura obbligatoria di ogni richiesta; DH classificato fra algoritmi di cifratura, key stretching come impossibilità matematica di cracking; D1#225 promette protezione dal DBA e costo nullo senza vincoli sulle chiavi; PKI, CRL/OCSP, TPM e Secure Boot descritti in modo assoluto o confusi. | S1, S4, S6, S9, S10, S25, S31–S33: distinguere ledger, firma, accordo di chiave, derivazione, revoca, root of trust e granularità della cifratura. |
| 2.0 Threats, Vulnerabilities & Mitigations | D2#457 esclude erroneamente perdita diretta di dati nello Shadow IT e ha una seconda risposta plausibile; D2#166 fa coincidere la categoria insider threat con soli attori dolosi; la rimozione di software promette una superficie d'attacco pari a zero; Shadow IT, Bloatware, RFID cloning e attacchi ambientali richiedono definizioni autosufficienti. | S11, S12, S22, S29, S33: scenario univoco, categorie intenzionali/involontarie e glossario autosufficiente. |
| 3.0 Security Architecture | EAP-TLS scambiato per MFA dell'utente; D3#28 promette che l'hypervisor impedisca qualsiasi escape; D3#29 attribuisce protezione end-to-end fino alla risorsa interna; D3#30 firma un hash come «cifratura» e promette certezza assoluta; tokenizzazione, distanza fra siti e replica sincrona trattate come garanzie assolute. | S2, S8, S13, S14, S27, S28, S30: confini di fiducia, autenticazione reciproca, integrità e condizioni di resilienza. |
| 4.0 Security Operations | IAM 4.6 nel gruppo del Dominio 1 e asset management 4.2 nel Dominio 5; D4#20 attribuisce blocco automatico a STIX/TAXII; D4#320 tratta metriche CVSS v3.1 come valide per ogni versione; D4#282 presenta la scadenza periodica come risposta a password compromesse; D4#218 promette revoca immediata di sessioni SaaS; input validation e secure cookies mancano come distinzioni esplicite nella checklist 4.1. | S7, S15, S16, S19, S20, S23, S26: allineamento del dominio, versioni degli standard, limiti di automazione/IAM e copertura di application security. |
| 5.0 Security Program Management & Oversight | D5#6 trasforma ALE in tetto automatico di spesa; D5#4 confonde risk appetite strategico con una soglia di servizio; D5#86 promette assurance oltre il perimetro di audit; la checklist Password Policies impone complessità di caratteri come regola universale; D5#81 non analizza le opzioni composite; work order e SOW richiedono un confronto esplicito. | S3, S5, S17, S18, S24, S33: stima, soglie, evidenza degli audit, policy correnti e spiegazione individuale delle combinazioni. |

**Allineamento IT/EN:** i problemi S1–S6 e S8–S33 compaiono nelle due lingue;
sono spesso traduzioni fedeli dello stesso enunciato debole o errato, non
semplici omissioni EN. S21 richiede la verifica di ciascun override.
La copertura EN del 100% è strutturale, non una certificazione di qualità.

### Piano ordinato per priorità

- [ ] **P1 — Errori tecnici e domande ambigue:** S1–S6, S9–S20, S25,
      S27–S32. Procedere per dominio D1 (S1, S4, S6, S9, S10, S25, S31,
      S32) → D2 (S11, S12, S29) → D3 (S2, S8, S13, S14, S27, S28,
      S30) → D4 (S15, S16, S19, S20) → D5 (S3, S5, S17, S18).
      Per ogni voce correggere IT/EN prima di spuntarla.
  - [x] **D1 fatto** — S1 (blockchain e open public ledger separati, con la
        soglia del 51% ricondotta al solo Proof of Work), S4 (firma ≠ cifratura
        dell'hash; il non ripudio dipende dalla custodia della chiave),
        S6 (Zero Trust: decisione di accesso distinta dalla protezione del
        canale), S9 (DH/ECDH = key agreement, non cifratura), S10 (i KDF non
        sono equivalenti e non rendono nulla «matematicamente impraticabile»),
        S25 (D1#225: il confine della chiave, il costo su indici e ricerche,
        A e C spiegate separatamente), S31 (CRL = elenco, OCSP = interrogazione,
        + OCSP stapling; un certificato valida il dominio, non l'onestà del
        sito), S32 (TPM ≠ Secure Boot; measured boot registra, non blocca;
        esistono fTPM).
  - [ ] D2 → D3 → D4 → D5
- [ ] **P3 — Copertura e collocazione:** S7, S22, S23, S26, S33; conservare
      `checklistKey` e id. Verificare i concetti degli obiettivi 1.4, 2.1,
      2.4 e 4.2 già presenti solo dentro spiegazioni o altre sezioni.
- [ ] **P4 — Spiegazioni:** S8, S15, S18, S21, S24, S25, S27, S30;
      trattare ciascun distrattore
      singolarmente e non far discendere una regola generale da un esempio.
      Poi completare la lettura semantica D1 → D2 → D3 → D4 → D5.

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

### Ulteriori interventi puntuali da inserire nel dataset

Tutti i seguenti interventi sono **da fare** in entrambe le lingue. I testi
«prima» riportano il passaggio problematico; i testi «dopo» sono formulazioni
da inserire nel campo indicato, mantenendo id, indice della risposta corretta
e struttura. Per gli override delle domande l'indirizzo è
QUESTION_EN[dominio][id] in src/data.en.ts.

**S9 · P1 · Accordo di chiave ≠ cifratura (Dominio 1, Obj 1.4).**
File: src/data.ts e src/data.en.ts; voce AsymmetricEncryption.details,
«Algoritmi Comuni».

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «Algoritmi Comuni: RSA, Diffie-Hellman (DH - per lo scambio chiavi) ed ECC» sotto «Algoritmi di crittografia». | «RSA è usato per cifratura e firme con schemi appropriati; Diffie-Hellman/ECDH servono all'**accordo di una chiave condivisa**, non cifrano direttamente il messaggio. ECC è una famiglia di tecniche basate sulle curve ellittiche, comprese ECDH per accordo di chiave ed ECDSA per firma. La chiave concordata può poi essere usata con AES.» |
| EN | “Common Algorithms: RSA, Diffie-Hellman (DH - for key exchange) and ECC” within “asymmetric encryption algorithms”. | “RSA supports encryption and signatures with appropriate schemes; Diffie-Hellman/ECDH perform **key agreement** and do not encrypt the message. ECC is a family of elliptic-curve techniques, including ECDH for agreement and ECDSA for signing. The agreed key can then be used with AES.” |

Motivo: l'obiettivo distingue encryption e key exchange; NIST SP 800-56A
classifica DH come schema di key establishment.

**S10 · P1 · Key stretching e resistenza agli attacchi (Dominio 1, Obj 1.4).**
File: src/data.ts/src/data.en.ts; KeyStretchingConcept.details.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «eseguire ricorsivamente migliaia di cicli di hashing e salting ... il cracking diventa matematicamente impraticabile» per PBKDF2, bcrypt, scrypt e Argon2. | «La derivazione della password aggiunge un salt unico e un costo configurabile per rallentare ogni tentativo. PBKDF2 usa iterazioni; scrypt e Argon2 aggiungono anche un costo di memoria. Il risultato **aumenta il lavoro dell'attaccante**, senza rendere matematicamente impossibile indovinare password deboli. Usa un salt distinto per ogni credenziale e parametri aggiornati.» |
| EN | “recursively running thousands of cycles of hashing and salting ... cracking becomes mathematically impractical” for PBKDF2, bcrypt, scrypt and Argon2. | “Password derivation combines a unique salt with a configurable work factor to slow each guess. PBKDF2 uses iterations; scrypt and Argon2 also impose memory cost. This **raises attacker effort** but cannot make weak passwords mathematically impossible to guess. Use a per-credential salt and current work parameters.” |

Motivo: i KDF non hanno tutti lo stesso meccanismo e nessun algoritmo rimedia
automaticamente a una password facile da indovinare.

**S11 · P1 · Shadow IT e perdita diretta di dati (Dominio 2, Obj 2.1).**
File: src/data.ts D2#457.scenario/question/options/explanation e override EN.
Conservare answerIndex = A: specificare nello scenario che si sta chiedendo
il rischio **strutturale** dell'aggiunta di servizi non inventariati; una domanda
generica sul «principale pericolo» rende anche D difendibile.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «Qual è il principale pericolo che deriva dallo Shadow IT?»; «la perdita di dati può avvenire solo se ... usato come punto di ingresso per esfiltrazione». | **Scenario/domanda:** «Un reparto aggiunge applicazioni e dispositivi non approvati che il team IT non inventaria né aggiorna. Quale effetto generale ha questa situazione sulla postura di sicurezza?» **Spiegazione D:** «La perdita di dati è possibile anche **direttamente**, per esempio caricando file aziendali su un SaaS non autorizzato. Nel caso descritto A è l'effetto generale dell'aggiunta di risorse fuori dal controllo IT; D è una possibile conseguenza, non un'impossibilità.» |
| EN | “What is the main danger arising from Shadow IT?”; “data loss can only occur if the Shadow IT device is used as an entry point for exfiltration”. | **Scenario/question:** “A department adds unapproved applications and devices that IT neither inventories nor updates. What general effect does this have on the security posture?” **D rationale:** “Data loss can occur **directly**, for example by uploading company files to an unapproved SaaS. Here A is the general effect of unmanaged resources; D is one possible outcome, not an impossibility.” |

Motivo: l'opzione D non è chiaramente sbagliata nel testo corrente e la
spiegazione contraddice D2#36, dove un cloud file-sharing non approvato
introduce fuga di dati senza bisogno di attaccanti.

**S12 · P1 · Insider threat può essere involontaria (Dominio 2, Obj 2.1).**
File: src/data.ts D2#166.question/explanation e override EN; controllare
anche D2#31.explanation e le definizioni Insider Threat/Script Kiddie.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «La differenza fondamentale risiede nell'intento ... una Insider Threat agisce con dolo», pur chiedendo il confronto con una minaccia interna **dolosa**. | «Nello scenario B distingue l'**insider intenzionalmente malevolo** dall'utente che introduce Shadow IT per comodità. “Insider threat” include però anche azioni negligenti o involontarie; e Shadow IT può introdurre rischio indipendentemente dall'intenzione. Evita di insegnare che ogni insider è doloso o ogni utente Shadow IT è necessariamente in buona fede.» |
| EN | “the fundamental difference is intent ... an Insider Threat acts with malice”, despite the question specifying a **malicious** insider. | “In this scenario B distinguishes an **intentionally malicious insider** from a user adding Shadow IT for convenience. Insider threat also includes negligent or unintentional acts, while Shadow IT creates risk regardless of intent. Do not teach that every insider is malicious or every Shadow IT user is necessarily well-intentioned.” |

Motivo: la risposta del caso resta B, ma la categoria generale non coincide
con il suo solo sottotipo malevolo. In D2#31 sostituire «mancano totalmente
delle capacità» / “totally lack the capabilities” con «di norma non hanno
risorse proprie per sviluppare exploit» / “typically lack the resources to
develop their own exploits”: la capacità di un attore non è assoluta.

**S13 · P1 · Le VM non impediscono ogni escape (Dominio 3, Obj 3.1/2.3).**
File: src/data.ts D3#28.explanation, override EN; nessun cambio
all'opzione B, che rimane la migliore fra quelle offerte.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «garantisce che anche in caso di compromissione del sistema operativo ospite ...»; «impedendo questa propagazione laterale». | «Un hypervisor di tipo 1 separa i kernel e in generale offre isolamento più forte di container che condividono il kernel host, ma **non garantisce isolamento assoluto**: vulnerabilità dell'hypervisor, configurazioni errate o canali condivisi possono permettere VM escape. Applicare patch e hardening dell'hypervisor, separare reti e verificare le risorse condivise.» |
| EN | “guarantees that even if the guest operating system is compromised ...”; “preventing this lateral propagation”. | “A type 1 hypervisor separates guest kernels and generally offers stronger isolation than containers sharing a host kernel, but **does not guarantee absolute isolation**: hypervisor flaws, misconfiguration or shared channels can enable VM escape. Patch and harden the hypervisor, segregate networks and review shared resources.” |

Motivo: l'obiettivo 2.3 elenca espressamente VM escape; la domanda 3.1
deve spiegare «più robusto», non «inviolabile».

**S14 · P1 · Firmware firmato e identità del firmatario (Dominio 3, Obj 1.4/3.1).**
File: src/data.ts D3#30.scenario/explanation e override EN.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «verificare con assoluta certezza»; «hash SHA-256 ... cifrandolo con la chiave privata»; «hash decifrato dalla firma». | «Il dispositivo verifica la firma **con una chiave pubblica attendibile associata al fornitore autorizzato** e controlla l'integrità del firmware; una firma non cifra il file. La validità della firma fornisce evidenza di provenienza, non certezza assoluta se la chiave privata è compromessa o il certificato non è verificato. Specificare nello scenario che il sistema possiede la chiave attendibile.» |
| EN | “verify with absolute certainty”; “encrypting the SHA-256 hash with the administrator's private key”; “hash decrypted from the signature”. | “The device verifies the signature **using a trusted public key bound to the authorized publisher** and checks firmware integrity; signing does not encrypt the file. A valid signature supports provenance but is not absolute proof if the private key is compromised or the certificate unchecked. State that the device has the trusted verification key.” |

Motivo: riallineare D3#30 con S4 e distinguere l'hash, la firma e la fiducia
nella chiave. L'opzione B resta la migliore.

**S15 · P1/P4 · STIX/TAXII non blocca automaticamente gli IoC
(Dominio 4, Obj 4.3/4.4).** File: src/data.ts D4#20.explanation e override EN.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «TAXII definisce il protocollo ... per scambiare questi dati in tempo reale ... permette ... di digerire e bloccare automaticamente le nuove minacce»; «B) e D)» accorpati. | «STIX rappresenta CTI strutturata; TAXII definisce API e modalità di scambio sopra HTTPS. Lo **scambio** non implica distribuzione in tempo reale né blocco automatico: i feed vanno convalidati, contestualizzati e integrati in regole di rilevamento/prevenzione.» **B:** «OpenPGP e SSH proteggono dati/canali, ma non forniscono una rappresentazione CTI interoperabile.» **D:** «CSV/SFTP può trasportare indicatori, ma non esprime nativamente oggetti, relazioni e API CTI di STIX/TAXII.» |
| EN | “exchange ... in real time ... lets firewalls, IPS, EDR and SIEM automatically ... block new threats”; “B) and D)” grouped. | “STIX represents structured CTI; TAXII defines APIs and exchange patterns over HTTPS. **Exchange** does not itself provide real-time delivery or automatic blocking: feeds need validation, context and integration into detection or prevention rules.” **B:** “OpenPGP and SSH protect data or channels, not interoperable CTI representation.” **D:** “CSV/SFTP can carry indicators but lack STIX/TAXII native objects, relationships and CTI APIs.” |

Motivo: distinguere formato, trasporto e uso operativo; una risposta per
ciascun distrattore. Le espansioni degli acronimi nel PDF CompTIA differiscono
dalle forme adottate dagli standard OASIS: mantenere il termine riconoscibile
all'esame, ma usare le definizioni tecniche dello standard nell'insegnamento.

**S16 · P1 · CVSS v3.1 e v4.0 vanno distinti (Domini 2/4, Obj 2.3/4.3).**
File: src/data.ts D4#320.explanation, voce CVSS nei Domini 2/4;
src/data.en.ts override e QUESTION_EN[4][320].

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «lo standard prevede altri due gruppi ... temporali ... ambientali» e «Base = ... non cambiano mai» senza precisare la versione. | «Nella **v3.1** si distinguono metriche Base, Temporal ed Environmental; nella **v4.0** Base, Threat, Environmental e Supplemental. Il punteggio base comunica severità tecnica, non priorità aziendale. L'esposizione dell'asset, lo sfruttamento attivo e gli impatti sul business guidano la remediation: qui la risposta B. Indicare la versione quando si elencano gruppi di metriche; non dire che una valutazione non possa mai essere corretta o aggiornata.» |
| EN | “the standard provides two other groups: temporal and environmental”; “Base ... never change” without a version qualifier. | “**v3.1** uses Base, Temporal and Environmental groups; **v4.0** uses Base, Threat, Environmental and Supplemental. A base score communicates technical severity, not business priority. Asset exposure, active exploitation and business impact guide remediation: B here. Name the version when listing metric groups; do not claim that an assessment can never be corrected or updated.” |

Motivo: FIRST v4.0 non usa il gruppo Temporal; nelle altre voci che
spiegano CVSS v3.x conservarlo come esempio storico **esplicitamente
versionato**, senza spacciarlo per unica versione corrente.

**S17 · P1 · Rischio accettabile e soglia operativa (Dominio 5, Obj 5.2).**
File: src/data.ts D5#4.scenario/question/options/explanation e override EN;
voci RiskAppetite/RiskTolerance nei due dataset. L'indice A può rimanere,
ma **l'attuale domanda non è inequivocabile**: un massimo di 30 minuti
per un singolo servizio è anche una soglia misurabile di risk tolerance,
e la finestra di cinque minuti è una decisione operativa, non
necessariamente la «variazione dell'appetite».

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «Risk Appetite il limite di 30 minuti; Risk Tolerance la finestra di 5 minuti». | **Scenario/domanda:** «Il board dichiara che l'organizzazione ha bassa propensione strategica al rischio di interruzione dei servizi critici. Per il mobile banking traduce questo orientamento in una soglia specifica: massimo 30 minuti di indisponibilità per incidente. Quale coppia di concetti descrive, rispettivamente, l'orientamento generale e la soglia misurabile?» **Opzione A:** «Risk Appetite: propensione strategica generale; Risk Tolerance: limite operativo di 30 minuti». **Spiegazione:** «Appetite orienta quanto rischio l'organizzazione intende assumere nel complesso; tolerance traduce l'orientamento in limiti accettabili per obiettivi e scenari. Una finestra di manutenzione programmata è un'altra decisione e va specificata separatamente.» |
| EN | “Risk Appetite the 30-minute limit; Risk Tolerance the 5-minute window”. | **Scenario/question:** “The board states a low strategic appetite for disruption of critical services. It translates this into a mobile-banking threshold: at most 30 minutes of unavailability per incident. Which concepts describe the overall stance and the measurable threshold, respectively?” **Option A:** “Risk Appetite: overall strategic stance; Risk Tolerance: 30-minute operational limit.” **Explanation:** “Appetite frames risk-taking overall; tolerance translates it into acceptable limits for objectives and scenarios. A planned maintenance window is a separate decision and should be stated separately.” |

Motivo: eliminare una trappola involontaria; confrontare le definizioni
con [NIST Risk Tolerance](https://csrc.nist.gov/glossary/term/risk_tolerance)
e NIST IR 8286A. Adeguare gli altri tre distrattori in IT/EN alla nuova
formulazione conservando una sola risposta corretta.

**S18 · P1/P4 · Perimetro di audit e attestazione (Dominio 5, Obj 5.5).**
File: src/data.ts D5#86.question/options/explanation e override EN.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «Assicura che i controlli di sicurezza del fornitore sono conformi agli standard stabiliti»; «certifica ... implementate e verificate correttamente». | **Opzione B:** «Fornisce un livello di assurance sui controlli **compresi nel perimetro, periodo e criteri** del rapporto di audit». **Spiegazione:** «Leggere scopo, periodo, eccezioni e opinione dell'auditor; SOC 2 Type II descrive il funzionamento dei controlli nel periodo esaminato, una certificazione ISO 27001 riguarda l'ISMS nell'ambito certificato. Nessuno dei due prova la sicurezza di ogni dato o garantisce assenza di incidenti.» **A:** «Il marketing non è oggetto dell'audit.» **D:** «Il prezzo dei servizi non è attestato.» |
| EN | “Ensures that the provider's security controls comply with established standards”; “certifies ... implemented and verified correctly”. | **Option B:** “Provides assurance about controls **within the audit report's scope, period and criteria**.” **Explanation:** “Read scope, period, exceptions and the auditor's opinion; SOC 2 Type II addresses control operation during the review period, while ISO 27001 certification covers the ISMS in its certified scope. Neither proves every datum safe or guarantees no incident.” **A:** “Marketing effectiveness is outside scope.” **D:** “Service pricing is not attested.” |

Motivo: la risposta B corrente promette troppo; A e D vanno spiegati
singolarmente e C resta l'assoluto impossibile.

**S19 · P1 · Password compromesse e scadenza periodica (Dominio 4,
Obj 4.6).** File: src/data.ts D4#282.scenario/explanation e override EN.
Conservare B se l'esercizio domanda specificamente quale impostazione
applica una scadenza, ma **rimuovere la credenziale già trovata in una
raccolta pubblica** come ragione per aspettare la prossima rotazione.

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «Alcune ... password compaiono in raccolte pubbliche» e «la rotazione fa sì che prima o poi smetta di funzionare anche se nessuno si è accorto della fuga». | **Scenario:** «La policy interna richiede esplicitamente che una password non resti valida oltre un periodo massimo: quale impostazione lo implementa?» **Spiegazione:** «Maximum password age impone una scadenza configurata: B risponde al requisito della policy. **Se una password risulta compromessa, va invalidata e cambiata subito**, non attesa la scadenza. NIST SP 800-63B non raccomanda la rotazione periodica arbitraria come pratica universale; distinguere il funzionamento di un'impostazione dalla sua opportunità.» |
| EN | “Some passwords appear in public stolen-credential collections” and “rotation eventually makes [them] stop working even if nobody noticed the leak”. | **Scenario:** “An internal policy explicitly requires that passwords cannot remain valid past a fixed maximum period: which setting enforces it?” **Explanation:** “Maximum password age enforces the configured deadline: B meets this policy requirement. **If a password is known to be compromised, invalidate and replace it immediately**, rather than waiting for expiration. NIST SP 800-63B does not recommend arbitrary periodic rotation as a universal best practice; distinguish a setting's operation from its advisability.” |

Motivo: integra S5 senza rendere errata una risposta sulla funzione
tecnica della policy; correggere il consiglio operativo.

**S20 · P1 · SAML, sessione SaaS e revoca (Dominio 4, Obj 4.6).**
File: src/data.ts D4#218.explanation e override EN; verificare anche
la voce MFA, SSO & Identity Federation (Obj 4.6).

| Lingua | Prima | Dopo |
| --- | --- | --- |
| IT | «quando l'azienda disattiva l'account nel proprio IdP, l'accesso al SaaS cessa immediatamente»; nella voce federazione «OAuth 2.0 ... basato su token JWT». | «SAML consente SSO tramite asserzioni verificate dal SaaS, senza trasmettergli la password nel flusso descritto. **Disabilitare l'account nell'IdP blocca nuove autenticazioni**, ma una sessione SaaS già aperta può restare valida fino alla scadenza o alla revoca supportata dall'applicazione. OAuth 2.0 è un framework di autorizzazione: i suoi access token possono essere opachi o strutturati, non devono essere JWT; OIDC aggiunge l'identità.» |
| EN | “when the company deactivates the account ... access to the SaaS ceases immediately”; federation entry: “OAuth 2.0 ... based on JWT tokens”. | “SAML enables SSO through assertions verified by the SaaS without sending it the password in this flow. **Disabling the IdP account blocks new authentication**, but an existing SaaS session may continue until it expires or the application supports revocation. OAuth 2.0 is an authorization framework: access tokens may be opaque or structured and need not be JWT; OIDC adds identity.” |

Motivo: la risposta B della domanda rimane corretta; immediatezza della
revoca e formato JWT obbligatorio sono falsi. Fonte: RFC 6749.

**S21 · P4 · Motivare i distrattori singolarmente, senza lettere
accorpate.** File: spiegazioni in src/data.ts e override delle stesse
domande in src/data.en.ts. Il controllo testuale ha trovato i seguenti
passi accorpati; alcune domande hanno già motivazioni individuali oltre
al passo segnalato, da non cancellare. Conservare la risposta attuale
solo dopo averne verificato l'unicità.

| Domanda | Prima IT/EN (estratto) | Dopo IT/EN richiesto |
| --- | --- | --- |
| D3#28 | Motivazione comune per opzioni con isolamento diverso. | A/containers: kernel condiviso; C/serverless: isolamento dipendente dal provider e poco controllo della configurazione; D/Kubernetes: orchestrazione, non un confine di memoria equivalente a VM. EN: “shared kernel”, “provider-dependent isolation”, “orchestration is not equivalent VM isolation”. |
| D3#29 | «A), C) e D)» / “A), C) and D)” | Vedi S8: Telnet, FTP anonimo e HTTP in chiaro con tre motivi separati. |
| D4#20 | «B) e D)» / “B) and D)” | Vedi S15: B/PGP+SSH protegge il trasporto; D/CSV+SFTP trasporta indicatori ma non strutture CTI. |
| D5#4 | «C) e D)» / “C) and D)” | Dopo S17, C/KRI è una metrica e mitigazione è trattamento; D/avoidance interrompe l'attività e acceptance assume il rischio. EN individuale per C e D. |
| D5#86 | «A) e D)» / “A) and D)” | Vedi S18: marketing vs economicità sono oggetti distinti, non verificati dall'audit. |
| D5#111 | «A, B e D» / “A, B and D” | A/formazione policy; B/provisioning di risorse limitato al ruolo; D/consegna sicura di credenziali iniziali e loro cambio dove richiesto. EN: separate rationale for training, scoped provisioning and secure credential delivery. |
| D1#225 | «A) e C)» / “A) and C)” | Vedi S25: volume e partizione hanno la stessa limitazione generale, ma spiegare distintamente che cosa ciascuno cifra. |

Motivo: una spiegazione condivisa può contenere un'affermazione valida
per alcune opzioni e falsa per altre. Verificare anche i passaggi non
numerati delle restanti spiegazioni; il semplice conteggio delle lettere
non certifica la qualità.

**S22 · P3 · Glossario autosufficiente per termini già presenti
nei quiz (Obj 2.1/2.4).** File: src/data.ts, gruppo Threat Actors/Malware,
src/data.en.ts SUBTOPIC_EN del medesimo dominio. **Prima IT/EN:**
D2#36 e D2#457 definiscono Shadow IT soltanto nelle spiegazioni;
D2#453 usa Bloatware come distrattore, ma nel glossario D2 non vi
sono voci autonome con questi nomi. **Dopo IT:** «Shadow IT: uso
di risorse informatiche senza approvazione o visibilità del team IT;
può causare direttamente esposizione di dati e aumentare la superficie
di attacco»; «Bloatware: software preinstallato non necessario o
indesiderato che consuma risorse e può ampliare la superficie di
attacco; non ogni bloatware è malware intenzionale».
**After EN:** “Shadow IT: IT resources used without approval or
visibility from the IT team; may directly expose data and expand
the attack surface”; “Bloatware: unnecessary or unwanted
preinstalled software that consumes resources and may broaden the
attack surface; it is not necessarily intentionally malicious”.
Motivo: sono termini espliciti degli obiettivi e il distrattore deve
essere comprensibile senza avere già svolto un'altra domanda. Prima
di aggiungere nuove voci confrontare il vincolo sullo schema: se
l'inserimento altera la struttura, integrare definizioni nelle voci
esistenti Threat Actors/Malware invece di modificare identificativi.

**S23 · P3 · Asset management 4.2 collocato nel Dominio 5.**
File: src/data.ts titolo «10. Secure Deconstruction & Disposal
(Obj 4.2)» e i suoi subtopic, GROUP_EN/SUBTOPIC_EN corrispondenti.
**Prima IT/EN:** inventario, tracciamento, sanitizzazione e distruzione
sono presentati sotto il Dominio 5; l'obiettivo 4.2 richiede lifecycle
di hardware, software e dati in Security Operations.
**Dopo IT/EN richiesto:** rinvio testuale esplicito «Asset management
e smaltimento → Security Operations, Obj 4.2» /
“Asset management and disposal → Security Operations, Obj 4.2” e
matrice che distingua acquisizione, assegnazione, inventario, monitoraggio,
disposal e retention. Non spostare array o id nell'intervento
solo testuale. Motivo: la collocazione corrente ripete il problema
IAM della S7 e può far credere che il Dominio 4 sia già coperto
dal solo gruppo del Dominio 5.

**S24 · P4 · D5#81: spiegare ogni combinazione (Obj 5.6).**
File: src/data.ts D5#81.explanation e override EN.
**Prima IT/EN:** l'analisi descrive manutenzione irregolare, straordinari
e sostegno alle policy come caratteristiche isolate; A, C e D sono invece
**coppie**. **Dopo IT:** «A unisce manutenzione irregolare e sostegno alle
policy: non prova abuso dei dati. C unisce straordinari e manutenzione
irregolare: richiede contesto, ma qui non è l'indicatore più forte. D
unisce sostegno alle policy e straordinari: può essere normale attività.
B combina accessi fuori mansione e trasferimenti anomali: richiede indagine,
senza presumere colpevolezza.» **After EN:** “A combines irregular maintenance
and support for policies, not evidence of data abuse. C combines overtime
and irregular maintenance; investigate context, but it is less compelling
here. D combines support for policies and overtime, which may be ordinary
work. B combines out-of-role access and unusual transfers; investigate
without presuming guilt.” Motivo: dire perché ciascuna opzione composita
non è la migliore, senza inferire dolo dai soli straordinari.

**S25 · P1/P4 · D1#225: cifratura di campo e custodia delle chiavi
(Obj 1.4).** File: src/data.ts D1#225.explanation e override EN.
Conservare B, ma correggere gli assoluti e spiegare A e C separatamente.

| Lingua | Prima (estratto) | Dopo |
| --- | --- | --- |
| IT | «per chiunque sia autenticato i dati sono in chiaro»; «senza alcun costo prestazionale»; «l'unica che protegge ... da chi ha accesso legittimo»; «la risposta scende sempre al livello del campo». | «La cifratura del disco protegge il supporto sottratto, ma normalmente **non impedisce al DBMS in esecuzione** di leggere i dati. Cifrare solo i tre campi può proteggerli dalle query del DBA **se** la chiave resta fuori dal suo controllo e l'applicazione decifra solo per utenti autorizzati. Può introdurre costi e limiti su ricerche e indici dei campi cifrati; le colonne non cifrate restano normalmente indicizzabili. Anche cifratura di file o tokenizzazione proteggono da utenti legittimi in altri scenari; qui B offre la granularità richiesta.» **A:** «Il volume è ancora decifrato dal DBMS attivo.» **C:** «La partizione modifica l'area protetta a riposo, non l'accesso alla tabella.» |
| EN | “to anyone authenticated, the data is plaintext”; “at no performance cost”; “the only one protecting data even from those with legitimate system access”; “the answer always drops to field level”. | “Disk encryption protects stolen storage but normally **does not stop a running DBMS** from reading data. Encrypting only the three fields can shield them from DBA queries **if** the key remains outside the DBA's control and the app decrypts only for authorized users. Encryption can add cost and limit search/indexing on encrypted fields; unencrypted columns retain ordinary indexing. File encryption or tokenization may protect against legitimate users in other scenarios; B provides the requested granularity here.” **A:** “Volume encryption is still transparent to the running DBMS.” **C:** “Partition encryption changes at-rest scope, not table access.” |

Motivo: la protezione dall'amministratore dipende dal **confine della chiave**
oltre che dalla granularità della cifratura.

**S26 · P3 · Application security: input validation e secure cookies
(Dominio 4, Obj 4.1).** File: src/data.ts
HardeningConcept.details/examTip, e override EN corrispondente.
**Prima IT/EN:** i
termini compaiono in alcuni quiz del Dominio 2, ma la checklist D4
non ha una voce che distingua la validazione input dalle protezioni
dei cookie di sessione, sebbene siano punti espliciti dell'obiettivo
4.1. **Dopo IT:** «Validazione input: sul server verificare tipo,
formato, lunghezza e range dei dati ricevuti; riduce input non
attesi, ma SQLi richiede anche query parametrizzate e XSS
output encoding. Secure cookie: impostare Secure (solo HTTPS),
HttpOnly (non accessibile a JavaScript) e SameSite appropriato
per ridurre richieste cross-site; insieme a TLS, durata limitata
e gestione delle sessioni, non è una difesa universale contro
CSRF o XSS.» **After EN:** “Input validation: server-side checks
of type, format, length and range; it limits unexpected input,
while SQLi also needs parameterized queries and XSS output
encoding. Secure session cookies: Secure restricts transmission
to HTTPS, HttpOnly denies JavaScript access and an appropriate
SameSite policy limits cross-site requests; use with TLS,
limited lifetimes and session controls, not as a universal
CSRF/XSS cure.” Motivo: rendere studiabili due voci ufficiali
senza aggiungere struttura o indurre una protezione assoluta.

**S27 · P1/P4 · Distanza tra siti e velocità DNS non sono garanzie
(Dominio 3, Obj 3.4).** File: src/data.ts voce Site Resiliency &
Geographic Dispersion.details, override EN.
**Prima IT:** «ad almeno 100 km di distanza» e
«reindirizzare istantaneamente tutto il traffico globale ...
tramite ... DNS Anycast». **Prima EN:** “at least 100 km apart”
and “instantly redirect all global traffic ... via ... DNS Anycast”.
**Dopo IT:** «La distanza e l'indipendenza di alimentazione,
connettività e rischi ambientali vanno scelte con una valutazione
del rischio: non esiste una soglia universale di 100 km.
Il failover geografico tramite GSLB, DNS o instradamento Anycast
ha tempi che dipendono da rilevamento, convergenza, cache DNS,
TTL e stato delle sessioni; provarlo rispetto a RTO/RPO.»
**After EN:** “Select distance and independence of power,
connectivity and environmental hazards based on risk; there
is no universal 100 km threshold. Geographic failover via
GSLB, DNS or anycast routing depends on detection,
convergence, DNS caching, TTL and session state; test
against RTO/RPO.” Motivo: evitare numeri e promesse di
istantaneità non presenti negli obiettivi.

**S28 · P1 · Tokenizzazione non elimina il rischio di furto
(Dominio 3, Obj 3.3).** File: src/data.ts TokenizationSec.details/examTip,
src/data.en.ts override.
**Prima IT:** «azzerando i rischi di furto sui database dei commercianti»
e «per risalire ... è indispensabile ... Token Vault» come regola universale.
**Prima EN:** “zeroing out the theft risks on merchants' databases”
and “the Token Vault is indispensable to recover the original data”
as a universal rule. **Dopo IT:** «La tokenizzazione riduce
l'esposizione del PAN reale nel database che conserva soltanto
token; **non azzera il rischio** se il vault, le API di detokenizzazione
o i sistemi che ricevono il PAN sono compromessi. Nel modello
vault-based il mapping è custodito in un vault; esistono anche
schemi vaultless, da non equiparare a cifratura. I token vanno
protetti e usati secondo il loro contesto.» **After EN:**
“Tokenization reduces exposure of real PAN in a database storing
only tokens; it **does not eliminate risk** if the vault,
detokenization API or systems receiving PAN are compromised.
Vault-based models store mappings in a vault; vaultless models
also exist and should not be conflated with encryption.
Protect tokens according to their use context.” Motivo: un
controllo trasferisce e riduce l'esposizione, non crea un rischio zero.

**S29 · P1 · Rimuovere software riduce, non azzera, la superficie
d'attacco (Dominio 2, Obj 2.5).** File: src/data.ts
RemoveSoftwareMiti.details e override EN. **Prima IT:**
«azzerando le vie per privilege escalation locali».
**Prima EN:** “zeroing out the avenues for local privilege
escalation”. **Dopo IT:** «Rimuovere programmi e compilatori
non necessari riduce i componenti attaccabili e alcuni strumenti
utili a un aggressore; **non elimina** falle locali nel kernel,
nei servizi indispensabili o nelle configurazioni. Applicare
anche patching, minimo privilegio e hardening.» **After EN:**
“Removing unnecessary programs and compilers reduces
attackable components and tools an attacker may abuse;
it **does not remove** local flaws in the kernel, required
services or configurations. Combine it with patching,
least privilege and hardening.” Motivo: la mitigazione non è
una garanzia di assenza di escalation.

**S30 · P1/P4 · Replica sincrona e RPO = 0 sono obiettivi condizionati
(Dominio 3, Obj 3.4).** File: src/data.ts
HotSiteRes.details e SynchronizationRes.details,
src/data.en.ts override. **Prima IT:** «failover ...
azzerando la perdita di dati»; «garantisce zero perdita di
dati (RPO = 0)» senza condizioni. **Prima EN:** “failover ...
zeroing out data loss”; “guarantees zero data loss (RPO = 0)”
without qualifiers. **Dopo IT:** «La replica sincrona
conferma una scrittura solo dopo il commit sulle copie
richieste e può puntare a RPO = 0 per le **scritture già
confermate**, a patto che replica, quorum e failover siano
configurati e testati correttamente. Perdita di dati, errori
logici propagati, guasti comuni e transazioni non confermate
richiedono backup e procedure di recupero; la replica non
li annulla.» **After EN:** “Synchronous replication
acknowledges writes after the required replicas commit
and can target RPO = 0 for **acknowledged writes**, provided
replication, quorum and failover are correctly configured
and tested. Unacknowledged transactions, propagated
logical errors and common-mode failures still require
backups and recovery procedures.” Motivo: spiegare ciò
che RPO misura e che cosa la replica non sostituisce.

**S31 · P1 · PKI, certificato TLS e controllo di revoca
(Dominio 1, Obj 1.4).** File: src/data.ts
PKIFundamentals.details/examTip e override EN; rivedere
anche RootOfTrust e le spiegazioni che promettono
«garanzia» automatica da certificati.
**Prima IT:** «CRL e OCSP: meccanismi dinamici» indistinti;
«certificato SSL ... CA fidata ... garantendo che il sito
non sia un clone fraudolento». **Prima EN:** “CRL and
OCSP: dynamic mechanisms” indistinct; “SSL certificate
signed by a trusted CA ... guarantees the site is not a
fraudulent clone”. **Dopo IT:** «Una CRL è un elenco
pubblicato di certificati revocati; OCSP è una richiesta
di stato a un responder (o una risposta prefornita,
OCSP stapling). Nel TLS il client verifica nome del
dominio, validità, catena fino a una radice attendibile
e, secondo la policy, stato di revoca. Il certificato
lega una chiave al nome verificato: **non garantisce**
che contenuti e impresa siano legittimi né esclude
un sito di phishing con un proprio dominio e certificato.»
**After EN:** “A CRL is a published list of revoked
certificates; OCSP queries a responder for status
(or uses a stapled response). In TLS the client checks
the domain name, validity, chain to a trusted root and
revocation status according to policy. A certificate
binds a key to the validated name; it **does not
guarantee** that site content or the business is
legitimate or exclude a phishing site with its own
domain and certificate.” Motivo: distinguere CA,
identità del dominio e autenticità dell'azienda;
usare «TLS» per il protocollo corrente.

**S32 · P1 · TPM, measured boot e Secure Boot
(Dominio 1, Obj 1.4).** File: src/data.ts
TPMHardware.definition/details, RootOfTrustConcept.details
e override EN.
**Prima IT:** «TPM: microchip ... saldato sulla scheda
madre»; «TPM ... misura ... per garantire che il
sistema non sia stato alterato prima dell'avvio (funzione
Secure Boot)» e «chiave ... nel chip TPM ... per validare
il bootloader». **Prima EN:** “TPM: chip soldered onto
the motherboard”; “TPM measures ... to ensure
the system has not been altered before startup (Secure
Boot function)” and “UEFI reads the trusted key in the TPM
to validate the bootloader”. **Definizione IT proposta:**
«TPM: modulo hardware o firmware che protegge chiavi
crittografiche e supporta misurazione e attestazione
della piattaforma.» **Definition EN:** “TPM: a hardware
or firmware module that protects cryptographic keys
and supports platform measurement and attestation.”
**Dopo IT (details):** «Il TPM protegge
chiavi e registra misurazioni dei componenti di avvio
nei PCR per measured boot e attestazione. Secure Boot
è una verifica delle firme eseguita dal firmware UEFI
con le sue chiavi attendibili: TPM e Secure Boot sono
**funzioni distinte e complementari**. Le misurazioni
da sole non impediscono l'esecuzione di codice non
attendibile. Il TPM può essere discreto o firmware-based;
evitare la regola che sia sempre un chip saldato.»
**After EN:** “A TPM protects keys and records boot
component measurements in PCRs for measured boot
and attestation. Secure Boot is signature verification
performed by UEFI firmware using its trusted keys:
TPM and Secure Boot are **distinct, complementary
functions**. Measurement alone does not prevent
untrusted code from running. TPMs may be discrete or
firmware-based; do not assume every TPM is a soldered
chip.” Motivo: la root of trust va spiegata per funzione;
la presenza di un TPM non sostituisce una policy UEFI.

**S33 · P3 · Microdefinizioni degli obiettivi disperse nel materiale.**
Sono termini presenti nei quiz o nelle spiegazioni, ma non
autosufficienti nelle checklist del loro dominio. Integrarli nei
campi testuali indicati senza aggiungere nuovi identificativi
o mutare lo schema.

| Obiettivo e file/voce | Prima | Dopo IT | After EN |
| --- | --- | --- | --- |
| 1.4, src/data.ts PKIFundamentals.details e override EN | «CRL e OCSP» in un'unica riga. | «CRL = elenco di revoche pubblicato periodicamente dalla CA; OCSP = richiesta di stato di un certificato a un responder. Per l'esame: elenco vs interrogazione.» | “CRL = a CA-published revocation list; OCSP = a certificate-status query to a responder. Exam distinction: list vs query.” |
| 1.4, src/data.ts PKIFundamentals/TPMHardware.details e override EN | Key management system e secure enclave citati altrove ma senza confronto nella checklist crittografica D1. | «KMS gestisce creazione, conservazione, rotazione e accesso alle chiavi; HSM protegge ed esegue operazioni crittografiche in hardware; TPM lega chiavi e misurazioni a un dispositivo; secure enclave è un ambiente isolato di esecuzione/protezione dei segreti nel dispositivo. Sono componenti con ruoli diversi, non sinonimi.» | “A KMS manages key creation, storage, rotation and access; an HSM protects keys and performs cryptographic operations in hardware; a TPM binds keys and measurements to a device; a secure enclave is an isolated execution/secret-protection environment on a device. These roles are distinct.” |
| 2.4, src/data.ts Network & Wireless Attacks.details e override EN | RFID cloning ed environmental attacks compaiono come distrattori, non con definizioni comparabili nel glossario D2. | «RFID cloning copia o emula i dati di un badge compatibile per tentare accesso fisico; un attacco ambientale altera temperatura, alimentazione, umidità o altri fattori fisici per interrompere o danneggiare il servizio.» | “RFID cloning copies or emulates data from a compatible badge to attempt physical access; an environmental attack manipulates temperature, power, humidity or other physical conditions to disrupt or damage service.” |
| 5.3, src/data.ts SOW.details e override EN | SOW trattato senza «work order», termine dell'obiettivo. | «Un work order è una richiesta/ordine operativo per un intervento concreto; uno SOW specifica perimetro, deliverable, tempi e criteri di accettazione di un lavoro. Possono essere collegati, ma non sono sempre identici.» | “A work order requests or authorizes a concrete task; an SOW sets scope, deliverables, schedule and acceptance criteria. They may be linked but are not always identical.” |

Motivo: non dichiarare «coperto» un termine soltanto perché appare
come opzione in un quiz; fornire una distinzione leggibile prima
di studiare la domanda. S31 già contiene la versione più completa
del confronto CRL/OCSP, quindi evitare due definizioni divergenti.

### Lacune e verifiche ancora da colmare

Le seguenti sono **modifiche testuali localizzate** nel registro, non la prova
che ogni altro obiettivo sia già trattato con profondità sufficiente.

| Obiettivo | Riscontro nel materiale | Intervento documentato |
| --- | --- | --- |
| 1.4 Crittografia e PKI | Blockchain e open public ledger confusi, key agreement ed encryption scambiati, CRL/OCSP e componenti di key management senza confronto | S1, S4, S9, S10, S31–S33: glossario e spiegazioni in IT/EN |
| 2.1 / 2.4 Attori, vettori e minacce fisiche | Shadow IT, insider involontario, Bloatware, RFID cloning, environmental attacks | S11, S12, S22, S33: chiarire quiz e definizioni |
| 3.2 / 3.4 Architettura, accesso e resilienza | EAP-TLS, perimetro VPN, distanza e replica descritti senza condizioni | S2, S8, S27, S30: definire il confine e le ipotesi operative |
| 4.1 Application security | Input validation e secure cookies non distinti nella checklist | S26: completare la checklist senza aggiungere chiavi |
| 4.2 Asset management | Ciclo di vita e smaltimento sicuro nel Dominio 5 | S23: richiamo testuale nel Dominio 4 senza cambiare id |
| 4.6 IAM | Gruppo IAM collocato nel Dominio 1, sessioni SaaS e password compromesse trattate con generalizzazioni | S5, S7, S19, S20: riferimenti e distinzioni nei due dataset |
| 5.2 / 5.3 Risk e vendor management | ALE inteso come limite di budget, risk appetite confuso con risk tolerance, SOW senza confronto work order | S3, S17, S33: scenario, definizioni, checklist |

- [ ] Proseguire la verifica semantica delle **642 domande**, in ordine
      D1 (105), D2 (129), D3 (112), D4 (171), D5 (125), annotando **nel
      medesimo file** ogni ulteriore prima/dopo IT/EN, identificativo e motivo:
      una sola risposta difendibile, distrattori plausibili e spiegazione
      individuale di ogni opzione. La presenza delle lettere nella spiegazione
      e la copertura degli override non provano l'accuratezza dei contenuti.
- [ ] Costruire la matrice **obiettivo → checklist → domanda → spiegazione**
      per tutti i sotto-obiettivi 1.1–5.6; indicare espressamente quelli ancora
      non verificati nella lettura semantica, senza inferire copertura dal solo
      numero di occorrenze di una parola.
- [ ] Ricercare in tutti i tre tipi di contenuto le generalizzazioni già
      individuate (firma = cifratura con chiave privata, blockchain = sempre
      pubblica, ALE = budget massimo, MFA da certificati client/server,
      Zero Trust = cifratura di ogni richiesta) e uniformare IT/EN.
- [ ] Verificare i confronti didattici IDS/IPS, DAC/MAC/RBAC/ABAC,
      phishing/vishing/smishing e cifratura simmetrica/asimmetrica rispetto
      ai casi limite; aggiungere esempi in checklist o spiegazioni solo
      dove risolvono un'ambiguità effettiva.

**Fonti primarie della revisione:** [CompTIA SY0-701 Exam Objectives v5.0](https://assets.ctfassets.net/82ripq7fjls2/6TYWUym0Nudqa8nGEnegjG/0f9b974d3b1837fe85ab8e6553f4d623/CompTIA-Security-Plus-SY0-701-Exam-Objectives.pdf)
(Obj 1.2, 1.4, 2.1, 2.4, 3.2, 3.4, 4.1, 4.2, 4.6, 5.2, 5.3);
[NIST IR 8202 — Blockchain](https://csrc.nist.gov/pubs/ir/8202/final),
[NIST SP 800-207 — Zero Trust](https://csrc.nist.gov/pubs/sp/800/207/final),
[NIST SP 800-63B — Digital Identity](https://pages.nist.gov/800-63-4/sp800-63b.html),
[NIST SP 800-56A — Key Establishment](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final),
[NIST SP 800-125 — Virtualization](https://csrc.nist.gov/pubs/sp/800/125/final),
[FIRST — CVSS v4.0](https://www.first.org/cvss/v4.0/specification-document),
[OASIS — TAXII 2.1](https://docs.oasis-open.org/cti/taxii/v2.1/os/taxii-v2.1-os.html),
[RFC 8017 — Firme RSA](https://www.rfc-editor.org/rfc/rfc8017.html),
[RFC 6749 — OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749.html),
[OWASP — Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html),
[OWASP — Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html),
[NIST — Risk Tolerance](https://csrc.nist.gov/glossary/term/risk_tolerance),
[Microsoft — TPM](https://learn.microsoft.com/en-us/windows/security/hardware-security/tpm/tpm-fundamentals),
[Microsoft — Secure Boot](https://learn.microsoft.com/en-us/windows/security/operating-system-security/system-security/secure-the-windows-10-boot-process).
Nessun riferimento a domande reali d'esame.

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
