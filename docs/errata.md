# Errata

Errori **sostanziali** trovati nei contenuti di studio e già corretti: affermazioni tecniche o fattuali
sbagliate, domande con più di una risposta difendibile, spiegazioni che contraddicevano la risposta o un'altra
parte del corpus. Chi ha studiato su una versione precedente può controllare qui che cosa è cambiato.

Non sono elencati refusi, anglicismi, stile e traduzioni, né le domande riscritte solo perché duplicavano
un'altra domanda: sono nella cronologia git, commit per commit.

*Substantive errors found in the study content and already fixed, with where they were, what the content said
and what it says now. Typos, style and translation fixes are left to the git history.*

**Come leggere le voci.** `D4#300` è la domanda 300 del banco del Dominio 4 (numero invariato dopo la
correzione); un nome in `monospazio` senza numero è una voce del glossario. Ogni correzione è stata applicata
in italiano e in inglese nello stesso commit. Per segnalare un errore: [apri una issue](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/issues).

Ultimo aggiornamento: 2026-09-26, dalla cronologia dei contenuti fino al 2026-09-24.

## Dominio 1 — General Security Concepts

| Data | Dove | Diceva | Dice ora | Commit |
|---|---|---|---|---|
| 2026-09-14 | `D1#136` | bcrypt "configurato con 12.000 iterazioni" | bcrypt si configura con un *cost factor* esponenziale: cost 12 = 2^12 = 4.096 iterazioni | [609fa7c](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/609fa7c) |
| 2026-09-14 | `D1#140` | Let's Encrypt fra le "CA commerciali" | CA gratuita e senza scopo di lucro | [609fa7c](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/609fa7c) |
| 2026-09-14 | `D1#143` | Certificato "autofirmato" firmato con la chiave di una root locale | Quello descrive un certificato emesso da una CA privata; l'autofirmato è firmato con la propria chiave. Il 15/09 chiarita anche la differenza con il certificato radice | [609fa7c](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/609fa7c), [ded6e70](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/ded6e70) |
| 2026-09-15 | `D1#199` | Risposta attesa "conformità normativa" con uno scenario che descriveva solo processi disallineati (l'opzione C) | Scenario riscritto con due obblighi di legge nuovi: una sola risposta difendibile | [ded6e70](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/ded6e70) |
| 2026-09-15 | `D1#42` | Controllo compensativo come funzione distinta da preventivo o investigativo | È un ruolo nel contesto: il controllo previene, ed è l'impossibilità di applicare la patch a renderlo compensativo | [ded6e70](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/ded6e70) |
| 2026-09-15 | `D1#180` | OCSP "elimina" la finestra di esposizione e interroga "la CA" | Interroga un *responder* e riduce la finestra senza annullarla (nextUpdate, soft-fail) | [ded6e70](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/ded6e70) |
| 2026-09-14 | `D1#217` | Le lettere dell'analisi dei distrattori non corrispondevano alle opzioni | Allineate; un controllo automatico su tutte le domande ha confermato che era l'unico caso | [2c91c16](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/2c91c16) |
| 2026-09-17 | `HashingConcept` | "Impossibile trovare due input con lo stesso hash" | Le collisioni esistono sempre; la proprietà è che trovarne una sia computazionalmente impraticabile (persa da MD5 e SHA-1) | [62eff0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/62eff0b) |
| 2026-09-17 | `DigitalSignaturesConcept` | La firma "cifra l'hash con la chiave privata" | Descrizione valida solo per il vecchio RSA PKCS#1 v1.5, allineata alla fase di verifica della stessa voce | [62eff0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/62eff0b) |
| 2026-09-17 | `SaltingConcept` | Il sale protegge dalla forza bruta offline | Il sale impedisce le rainbow table e rende diversi hash di password uguali; contro la forza bruta servono funzioni lente (bcrypt, scrypt, Argon2) | [091bb3b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/091bb3b) |
| 2026-09-17 | `PublicKeyConcept` | Diffondere la chiave pubblica "non compromette in alcun modo" la sicurezza | Vero per la riservatezza, non per l'autenticità: una chiave sostituita è un man-in-the-middle, il problema che risolve la PKI | [091bb3b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/091bb3b) |
| 2026-09-17 | `AccessControlModels` | MAC "il modello più sicuro" | Il più restrittivo, che non significa il più sicuro in assoluto | [091bb3b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/091bb3b) |
| 2026-09-18 | `Certificates` | Il browser confronta l'URL con il Common Name; il certificato dà "la certezza" dell'organizzazione | Dal 2017 i browser validano solo il SAN; il certificato lega una chiave a un nome di dominio verificato, non a un'organizzazione legittima | [3ebb649](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/3ebb649) |
| 2026-09-18 | `MFA`, `AAA` | Tre categorie di fattori più due "ausiliari" | L'obiettivo 4.6 elenca quattro fattori allo stesso livello, incluso *somewhere you are* | [3ebb649](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/3ebb649) |
| 2026-09-14 | glossario TLS | TLS al "Layer 4" OSI | TLS opera sopra il livello di trasporto | [549aa0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/549aa0b) |

## Dominio 2 — Threats, Vulnerabilities, and Mitigations

| Data | Dove | Diceva | Dice ora | Commit |
|---|---|---|---|---|
| 2026-09-14 | `D2#425` | "Misinformation" tradotto come "disinformazione" | Informazione errata diffusa in buona fede; la disinformazione è la falsità deliberata | [2c91c16](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/2c91c16) |
| 2026-09-14 | `D2#461` | RDP esclusivo e sfruttabile solo su Windows | Esiste anche su Linux, macOS e mobile; domanda riscritta sulla porta TCP 3389 come vettore e sulle mitigazioni reali | [0a9bd97](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/0a9bd97) |
| 2026-09-14 | `D2#460`, `D2#523` | "Capability" e "sophistication" come attributi distinti | L'obiettivo 2.1 li elenca come un unico attributo | [0a9bd97](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/0a9bd97) |
| 2026-09-14 | `D2#480` | S/MIME = "Secure Multipart Internet Message Extensions" | Secure/Multipurpose Internet Mail Extensions | [22fabc2](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/22fabc2) |
| 2026-09-14 | `D2#481` | Wi-Fi Enhanced Open usa l'handshake Dragonfly | Dragonfly (SAE) è di WPA3-Personal; Enhanced Open (OWE) usa un Diffie-Hellman non autenticato | [22fabc2](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/22fabc2) |
| 2026-09-14 | `D2#503` | Collisione = "due algoritmi diversi, stesso output per lo stesso input" | Due input diversi con lo stesso output dello stesso algoritmo | [22fabc2](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/22fabc2) |
| 2026-09-14 | `D2#506` | CSRF: "l'attaccante invia una richiesta al browser della vittima" | È il browser della vittima a inviare la richiesta al sito, con il cookie di sessione | [cc86c61](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/cc86c61) |
| 2026-09-15 | `D2#429` | "Race condition" e "time-of-use" come alternative distinte | TOC/TOU è un sottotipo di race condition; chiarito il criterio di scelta | [7e85899](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7e85899) |
| 2026-09-15 | `D2#466` | API insicure "esclusive degli ambienti cloud" | Esistono ovunque ci siano API; il cloud ne cambia il ruolo (unica console, esposta a Internet) | [7e85899](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7e85899) |
| 2026-09-15 | `D2#516` | L'opzione "corretta" sul BEC descriveva una richiesta legittima; un distrattore era un BEC altrettanto plausibile | Opzioni riscritte, una sola risposta difendibile | [7e85899](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7e85899) |
| 2026-09-15 | `D2#519` | HIPS come difesa dal buffer overflow | Le difese primarie sono DEP/NX, ASLR, stack canary e controllo dei limiti; l'HIPS è uno strato aggiuntivo | [7e85899](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7e85899) |
| 2026-09-17 | `EncryptionMiti` | La cifratura rende inservibili i dati rubati dal ransomware a doppia estorsione | Il malware lavora in una sessione autenticata e legge i file in chiaro; la cifratura protegge il disco rubato e il traffico intercettato | [b20d254](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/b20d254) |
| 2026-09-17 | `InsiderThreatActor` | Solo l'insider che "abusa per danneggiare" | Comprende anche l'insider involontario, il caso più frequente | [b20d254](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/b20d254) |
| 2026-09-17 | `CredentialStuffingAtt` | L'MFA "unica mitigazione definitiva" | Né unica né definitiva (MFA fatigue, phishing in tempo reale, furto del token) | [b20d254](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/b20d254) |

## Dominio 3 — Security Architecture

| Data | Dove | Diceva | Dice ora | Commit |
|---|---|---|---|---|
| 2026-09-14 | `D3#563` | IPsec opera al livello di trasporto OSI | IPsec opera al livello di rete (L3); la "modalità trasporto" non è il livello OSI | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-14 | `D3#539`, `D3#533` | Stuxnet sfruttò "vulnerabilità non patchabili" dei PLC e arrivò da Internet | Riprogrammò i PLC sfruttando l'assenza di autenticazione ed entrò via USB in una rete air-gapped | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-14 | `D3#21` | PCI DSS impone hardware dedicato | Lo standard non lo impone; lo scenario usa una policy interna | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-14 | `D3#577` | Cifrare i backup come difesa principale dal ransomware | La cifratura protegge la riservatezza; contro il ransomware servono copie immutabili o offline (3-2-1-1-0) | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-14 | `D3#574` | "Cluster" di server con funzioni diverse | Senza nodi identici e failover non c'è tolleranza ai guasti; riscritta su un cluster reale | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-14 | `D3#418` | Due opzioni corrette (backup cloud e offsite) | Una sola risposta difendibile | [1f99909](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1f99909) |
| 2026-09-17 | `WPA2Net`, `WPA3Net` | KRACK confuso con l'attacco a dizionario offline sull'handshake | KRACK forza la reinstallazione di una chiave, non ricava la password, e si corregge con le patch | [13efa90](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/13efa90) |
| 2026-09-17 | `DKIMConcept_New` | DKIM prova l'autenticità del mittente visibile | Prova il dominio `d=` che ha firmato; l'allineamento con il `From` lo impone DMARC | [13efa90](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/13efa90) |
| 2026-09-17 | `WPA3EnterpriseRes`, `GCMPConcept` | Suite a 192 bit e GCMP come caratteristiche standard di WPA3 | Modalità opzionale allineata a CNSA; WPA3 di base usa CCMP-128 | [2eeb23e](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/2eeb23e), [40175d9](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/40175d9) |
| 2026-09-17 | `WAFFire` | Il WAF è "l'unico" firewall a livello applicativo | Anche il NGFW arriva al Layer 7; la differenza è perimetro contro singola applicazione web | [2eeb23e](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/2eeb23e) |
| 2026-09-17 | `AirGapConcept` | L'air gap è "la soluzione definitiva" | Elimina l'attacco remoto, non il supporto rimovibile, il fornitore o l'insider | [2eeb23e](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/2eeb23e) |
| 2026-09-17 | `NetFirewallNATConcept` | Il NAT impedisce che gli host interni siano contattati da Internet | Effetto collaterale che cade con port forwarding, UPnP o una connessione aperta dall'interno; il NAT non sostituisce il firewall | [14dd9a1](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/14dd9a1) |
| 2026-09-17 | `VirtualMachineConcept` | "Risorse CPU dedicate e isolate" | L'hypervisor schedula le vCPU su core fisici condivisi | [13efa90](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/13efa90) |

## Dominio 4 — Security Operations

| Data | Dove | Diceva | Dice ora | Commit |
|---|---|---|---|---|
| 2026-09-14 | `D4#300` | "Porta 433 (NNTP)" | NNTP usa la porta 119; 433 non corrisponde a un servizio standard | [549aa0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/549aa0b) |
| 2026-09-14 | `D4#219` | WPA3 elimina il 4-way handshake | SAE sostituisce la derivazione della PMK; il 4-way handshake resta per la PTK | [549aa0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/549aa0b) |
| 2026-09-14 | `D4#300`, `#203`, `#219` | Domande "seleziona DUE/TRE" su un modello a risposta singola: risposte corrette segnate come errate | Riscritte a risposta singola; oggi l'app supporta anche le risposte multiple | [549aa0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/549aa0b) |
| 2026-09-14 | `D4#205` | Legal hold definito come la catena di custodia | Comunicazione formale che sospende le cancellazioni quando un contenzioso è prevedibile | [609fa7c](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/609fa7c) |
| 2026-09-15 | `D4#16` | L'analisi dei distrattori escludeva la risposta corretta | Ogni opzione analizzata con il proprio motivo | [5ca858a](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/5ca858a) |
| 2026-09-15 | `D4#234` | CVE = "Common Vulnerability Enumeration" | Common Vulnerabilities and Exposures | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#245` | Il NAC con agente installa il software "su un server centrale" | L'agente sta sull'endpoint, ed è ciò che permette di verificarne la conformità | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#212` | Le catture di pacchetti non registrano il contenuto cifrato | Il payload cifrato viene registrato; manca il testo in chiaro | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#317` | "2022-12345" identificatore CVE valido | Il formato è CVE-ANNO-NUMERO | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#282` | Maximum password age come soluzione agli account degli ex dipendenti | Si disabilita l'account in offboarding; riscritta sul significato del parametro e su NIST SP 800-63B | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#285` | Un RTOS come protezione dei sistemi embedded | Un RTOS risponde a requisiti temporali; le protezioni sono firmware firmato, secure boot e aggiornamenti autenticati | [67e763b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/67e763b) |
| 2026-09-15 | `D4#185`, `#411`, `#209` | Sanitizzazione come "sovrascrittura ripetuta"; secure erase come decine di passaggi | Livelli Clear/Purge/Destroy di NIST SP 800-88; sovrascrittura inefficace su SSD; secure erase è un comando del firmware o una cancellazione crittografica | [a08b57d](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/a08b57d) |
| 2026-09-15 | `D4#235` | MD5 alla pari di SHA-256 per l'integrità delle prove | MD5 è rotto dal 2004 ed è contestabile: SHA-256 | [a08b57d](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/a08b57d) |
| 2026-09-15 | `D4#287` | L'exposure factor come importo | È una percentuale: SLE = AV × EF, ALE = SLE × ARO | [a08b57d](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/a08b57d) |
| 2026-09-15 | `D4#315` | Scadenza periodica delle password come buona pratica | NIST raccomanda il cambio solo su evidenza di compromissione (PCI DSS la impone ancora) | [a08b57d](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/a08b57d) |
| 2026-09-17 | `AntivirusRes`, `AntivirusScanningConcept` | Il rilevamento a firme confronta l'hash del file | Una firma è una sequenza di byte caratteristica, per questo riconosce anche le varianti | [7b606b7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7b606b7), [40175d9](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/40175d9) |
| 2026-09-17 | `ChainOfCustody` | Qualsiasi interruzione invalida l'ammissibilità della prova | La compromette, ma l'esclusione la decide il giudice | [7b606b7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7b606b7) |
| 2026-09-17 | `SNMP` | AES e DES, MD5 e SHA equivalenti in SNMPv3 | DES e MD5 sono deprecati | [7b606b7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/7b606b7) |
| 2026-09-17 | `IPSLogs` | I log dell'IPS mostrano le minacce bloccate | Un IPS in sola rilevazione registra alert e non blocca: va letto il campo azione | [e5ffbe7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/e5ffbe7) |
| 2026-09-17 | `PortScanRes` | Porta chiusa e porta filtrata confuse | Tre esiti: aperta, chiusa (RST), filtrata (nessuna risposta) | [e5ffbe7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/e5ffbe7) |
| 2026-09-18 | `D4#306` | Tre metodi di distruzione ugualmente corretti | Requisiti espliciti nello scenario, una sola risposta difendibile | [d2f7f5d](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/d2f7f5d) |

## Dominio 5 — Security Program Management and Oversight

| Data | Dove | Diceva | Dice ora | Commit |
|---|---|---|---|---|
| 2026-09-14 | glossario GDPR | Si applica ai "dati di cittadini UE" | Si applica agli interessati che si trovano nell'UE (art. 3), a prescindere dalla cittadinanza | [549aa0b](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/549aa0b), [1329693](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1329693) |
| 2026-09-15 | `D5#74` | Il GDPR consente il trattamento "solo dopo" il consenso | Il consenso è una delle sei basi giuridiche dell'art. 6; spesso la base è il contratto o l'obbligo di legge | [972ecd7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/972ecd7) |
| 2026-09-15 | `D5#60` | Lo scenario descriveva una soglia di rischio ma la risposta era la tolleranza | Scenario riscritto sulla tolleranza, distinta dalla soglia | [972ecd7](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/972ecd7) |
| 2026-09-15 | `D5#6`, `ALE` | "Si mitiga solo se il controllo costa meno dell'ALE" | Si confronta il costo annuo del controllo con la riduzione di ALE; obblighi di legge e sicurezza delle persone prevalgono | [5ca858a](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/5ca858a), [c4108ed](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/c4108ed), [1329693](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1329693) |
| 2026-09-17 | `D5#143`, `ExemptionRes` | Eccezione ed esenzione come sinonimi; esenzione "a vita" | Differiscono per durata e portata; l'esenzione dura finché la causa non è rimossa, con revisioni periodiche | [c4108ed](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/c4108ed), [1329693](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1329693) |
| 2026-09-17 | `SocialEngineering` | La formazione come "unica difesa efficace" | Tre piani di difesa: tecnico, procedurale e umano; contro il BEC conta la verifica fuori banda | [1329693](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1329693) |
| 2026-09-17 | `VendorAssessment` | SOC 2 Type II "l'unico documento affidabile" | Una delle evidenze; su ogni rapporto vanno verificati perimetro, periodo ed eccezioni | [1329693](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/commit/1329693) |
