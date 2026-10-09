# Roadmap — integrazioni alla guida e al glossario SY0-701

## Origine e perimetro

Questa roadmap contiene le attività individuate nell'analisi dei contenuti del repository del **6 ottobre 2026**. Ogni attività descrive autonomamente cosa realizzare, quali contenuti esistenti riutilizzare e come verificare il risultato.

L'analisi riguarda le guide in `src/domainGuides.ts`, le definizioni in `src/data.ts` e `src/data.en.ts`, la loro reperibilità tramite `src/glossaryIndex.ts` e `src/canonicalTerms.ts`, le PBQ e la banca delle domande.

Le attività distinguono **contenuto da approfondire**, **voce di glossario da rendere autonoma** e **formulazione da correggere**. I riferimenti agli obiettivi SY0-701 indicano dove integrare il materiale, senza trasformare ogni approfondimento in un nuovo requisito ufficiale d'esame.

Scrivere spiegazioni ed esercizi originali e verificarli sulle fonti primarie indicate nelle attività. Le descrizioni e i criteri qui riportati consentono di svolgere il lavoro senza allegati esterni al progetto.

## Criteri comuni di completamento

Ogni attività va completata nella guida e nel glossario dove indicato, con:

- Parità italiano/inglese: definizione, approfondimento, esempio originale e avvertenza didattica, quando pertinenti.
- Riutilizzo delle definizioni canoniche e collegamenti ai contenuti esistenti; identificatori stabili e nessuna duplicazione di concetti già spiegati.
- Termini e acronimi ricercabili nel glossario, con espansione corretta, alias IT/EN e disambiguazione dei significati. Verificare anche le flashcard generate dal glossario.
- Fonti primarie e mappatura agli obiettivi SY0-701; niente affermazioni assolute non giustificate, numeri normativi datati o contenuti di versioni successive presentati come requisiti SY0-701.
- Esempi con dati sintetici, senza credenziali reali o istruzioni per attaccare sistemi esterni. Diagrammi, se utili, accompagnati da una spiegazione testuale accessibile e leggibile su mobile.
- Controlli pertinenti su parità, termini canonici, citazioni, copertura e ricerca; eseguire i controlli automatici del progetto e aggiornare eventuali artefatti di copertura interessati.

**Ordine:** completare prima P1, poi P2; per gli esercizi che dipendono dalle nuove definizioni, completare prima la relativa attività di contenuto. Tutte le caselle sono nuove attività da svolgere; l'analisi non equivale all'implementazione.

## P1 — contenuti e precisione tecnica

### 1. Steganografia e limiti dell'offuscamento

- [x] Aggiungere una voce autonoma di steganografia e approfondire il confronto con cifratura, hashing, tokenizzazione e mascheramento nella guida del Dominio 1 (obiettivo 1.4).

**Evidenza nel repository:** La guida cita la steganografia nell'elenco dell'obiettivo e in una breve tabella; manca una voce dedicata nelle definizioni del glossario. Tokenizzazione e mascheramento sono già trattati e vanno collegati.

**Da realizzare:** spiegare messaggio nascosto e contenitore, esempi descrittivi con immagini/audio e distinzione fra nascondere l'esistenza di un messaggio e proteggerne il contenuto. La steganografia da sola non garantisce riservatezza, integrità o autenticità. Separare questo concetto dall'offuscamento del codice.

**Accettazione:** ricerca IT/EN di “steganografia/steganography” trova la voce; un esempio originale permette di scegliere fra steganografia e cifratura senza suggerire che l'occultamento sostituisca la crittografia. Verifica tecnica su pubblicazioni NIST pertinenti alla terminologia.

**Completato il 6 ottobre 2026:** voce canonica `1:SteganographyConcept` con nomi IT/EN ricercabili, esempio immagini/audio, limiti e fonte NIST CSRC; tabella ampliata e scenario originale nella guida 1.4. Verificata la ricerca nel glossario in entrambe le lingue e l'assenza di flashcard con sigle inventate.

### 2. XSS reflected/stored e confronto con CSRF

- [x] Approfondire XSS e CSRF nella guida del Dominio 2 (obiettivo 2.4), con voci autonome e alias nel glossario.

**Evidenza nel repository:** `AppCryptoAttacks` contiene definizioni generali di XSS e CSRF, ma non distingue XSS riflesso e persistente. `ApplicationSecurityHardening` spiega già cookie sicuri e token CSRF: riutilizzare quelle mitigazioni.

**Da realizzare:** distinguere reflected/stored XSS per origine e persistenza dell'input, esecuzione nel browser e impatto; confrontare XSS, CSRF e SSRF per componente che agisce e fiducia sfruttata. Spiegare output encoding contestuale, sanitizzazione quando occorre consentire HTML e query parametrizzate per SQLi: non presentare la stessa difesa come sufficiente per tutti gli attacchi. Aggiungere l'alias XSRF alla voce CSRF.

**Accettazione:** casi originali distinguono i tre attacchi; HttpOnly limita la lettura dei cookie ma non impedisce l'esecuzione XSS, e SameSite non è presentato come difesa universale. Fonti: guide OWASP su XSS e CSRF.

**Completato il 6 ottobre 2026:** voci canoniche `2:XSSAttack`, `2:CSRFAttack` e `2:SSRFAttack`; alias CSRF/XSRF condiviso. Guida IT/EN con confronto di componenti e difese, tre scenari sintetici e limiti HttpOnly/SameSite. Fonti delle Cheat Sheet OWASP collegate; ricerca, suggerimenti nel testo e flashcard verificati in entrambe le lingue.

### 3. Furto della sessione, replay e manipolazione dei cookie

- [x] Esplicitare session hijacking/sidejacking nella guida del Dominio 2 e nel glossario, collegandoli alle mitigazioni applicative del Dominio 4 (obiettivi 2.4 e 4.1).

**Evidenza nel repository:** `NetworkWirelessAttacks` menziona session hijacking come esempio di on-path; `AppCryptoAttacks` tratta replay e la sezione di hardening tratta già i cookie. Manca una spiegazione autonoma della relazione fra questi concetti.

**Da realizzare:** mostrare con un flusso testuale il riuso di un identificatore di sessione sottratto; distinguere attacco on-path, furto di sessione e replay, che possono essere collegati senza essere sinonimi. Separare header/cookie controllati dal client dalle decisioni di autorizzazione del server. Collegare TLS, scadenza/revoca, rotazione dopo autenticazione e attributi dei cookie già presenti.

**Accettazione:** chiarire che TLS non neutralizza ogni modalità di furto della sessione e che MFA al login non rende inutilizzabile una sessione rubata. Usare difese attuali e supportate. Fonti: OWASP Session Management Cheat Sheet e documentazione dei cookie HTTP.

**Completato il 6 ottobre 2026:** voci canoniche `2:SessionHijackingAttack`, `2:ReplayAttack` e `2:CookieHeaderTampering` IT/EN; tabella comparativa e scenari sintetici nella guida 2.4, collegamento alle mitigazioni del Dominio 4. Precisati i limiti di TLS, MFA e HttpOnly; fonti OWASP e MDN collegate. Verificate ricerca nel glossario, parità linguistica, citazioni e copertura.

### 4. Domain hijacking rispetto a DNS poisoning e typosquatting

- [x] Aggiungere domain hijacking alla guida del Dominio 2 e al glossario (obiettivo 2.4), collegandolo ai vettori di phishing dell'obiettivo 2.2.

**Evidenza nel repository:** Il corpus spiega DNS poisoning e typosquatting; manca il caso distinto del controllo illecito dell'account di registrazione o della delega del dominio.

**Da realizzare:** confrontare compromissione dell'account registrar, modifica dei record/deleghe, avvelenamento delle risposte DNS e registrazione di un dominio somigliante. Introdurre controllo degli accessi al registrar, MFA, protezione dei contatti di recupero, lock disponibili e monitoraggio delle modifiche.

**Accettazione:** uno scenario originale identifica quale componente è compromesso; spiegare che DNSSEC non impedisce da solo modifiche autorizzate con un account registrar compromesso. Fonti: ICANN e documentazione primaria su DNSSEC/registrar.

**Completato il 6 ottobre 2026:** voce canonica `2:DomainHijackingAttack` IT/EN, ricercabile per domain hijacking e dirottamento/domain takeover. Tabella comparativa e due scenari originali collegano gli obiettivi 2.2 e 2.4; precisati account registrar/provider DNS, record e deleghe, limiti DNSSEC e ambito dei lock. Collegamenti bidirezionali ai contenuti esistenti e fonti ICANN/IETF; verificati ricerca, parità, citazioni e assenza di sigle inventate nelle flashcard.

### 5. Disponibilità Wi-Fi e limiti di PMF

- [x] Integrare RF jamming e deauthentication/disassociation nella guida e nel glossario, correggendo le generalizzazioni su PMF nei Domini 2, 3 e 4 (obiettivi 2.4, 3.2 e 4.1).

**Evidenza nel repository:** Il corpus parla di interferenze e PMF, ma non spiega autonomamente il jamming Wi-Fi. `WPA3EnterpriseRes` afferma genericamente che PMF cifra e protegge i management frame: occorre precisare ambito e limiti.

**Da realizzare:** distinguere interferenza accidentale, disturbo radio intenzionale e falsificazione di frame di gestione. Espandere PMF/MFP e il riferimento storico a IEEE 802.11w; spiegare che la protezione riguarda specifici frame di gestione robusti e che protezione unicast e broadcast non equivale alla cifratura di ogni management frame. Collegare WPA3 e modalità di transizione senza attribuire la stessa garanzia a qualunque configurazione.

**Accettazione:** PMF non è descritto come protezione dal disturbo fisico RF o da ogni DoS; non legare indiscriminatamente l'obbligatorietà di 802.11w a 802.11ac. Fonti: IEEE e Wi-Fi Alliance; solo scenari difensivi, nessun laboratorio di jamming.

**Completato il 7 ottobre 2026:** voci canoniche `2:WiFiJammingAttack`, `2:WiFiDeauthAttack` e `3:ProtectedManagementFrames` IT/EN, ricercabili (jamming, interferenza, deautenticazione/disassociazione, PMF/MFP). Distinte interferenza accidentale, jamming RF al livello fisico e falsificazione dei frame di gestione; precisata la PMF/802.11w (frame di gestione robusti, riservatezza+integrità unicast, integrità BIP per i frame di gruppo, non ogni frame né beacon/probe), con obbligo legato a WPA3 e non a 802.11ac. Corretta la generalizzazione «cifra i management frame» in `WPA3EnterpriseRes` e aggiunti confronto, trappole e scenario nelle guide dei Domini 2, 3 e 4. Precisato che PMF non ferma il jamming né ogni DoS; fonti IEEE Std 802.11-2020 e Wi-Fi Alliance collegate. Verificati ricerca nel glossario, parità IT/EN, citazioni, flashcard (nessuna sigla inventata) e copertura.

### 6. Ruoli Zero Trust: PE, PA e PEP

- [x] Rendere autonomi e ricercabili Policy Engine, Policy Administrator e Policy Enforcement Point, collegandoli alla guida del Dominio 1 (obiettivo 1.2).

**Evidenza nel repository:** `PolicyDrivenAccessControl` e `ControlPlaneZTA` spiegano già PE/PA; la guida nomina Policy Enforcement Point, ma l'acronimo PEP e le voci autonome non sono disponibili nel glossario.

**Da realizzare:** riutilizzare le spiegazioni esistenti per distinguere decisione della policy, gestione della comunicazione e applicazione del controllo nel data plane. Collegare subject/system, segnali di contesto e verifica continua. Disambiguare il PA Zero Trust da altri significati dello stesso acronimo.

**Accettazione:** un flusso di accesso originale identifica correttamente chi decide, chi coordina e chi applica; ricerca per nomi estesi e acronimi, con collegamenti bidirezionali alle sezioni esistenti. Fonte: NIST SP 800-207.

**Completato l’8 ottobre 2026:** tre voci canoniche IT/EN con nomi estesi, acronimi PE/PA/PEP, citazioni NIST SP 800-207 e flashcard. Collegamenti alle spiegazioni esistenti, confronto dei ruoli e flusso di autorizzazione/revoca nella guida 1.2. Corrette le domande che confondevano la gestione delle policy con il ruolo operativo del PA e precisato il monitoraggio del PEP. Verificati ricerca, rimandi e parità linguistica con test dedicati.

### 7. Accordo delle chiavi, chiavi effimere e forward secrecy

- [x] Approfondire key establishment nella guida del Dominio 1 e aggiungere le voci collegate nel glossario (obiettivo 1.4).

**Evidenza nel repository:** `AsymmetricEncryption` distingue già correttamente DH/ECDH dalla cifratura; perfect forward secrecy compare soprattutto nel contesto WPA3. Manca un percorso generale su chiave di sessione, key transport, key agreement e chiavi effimere.

**Da realizzare:** conservare la distinzione già corretta su DH/ECDH; confrontare consegna di una chiave cifrata e derivazione di un segreto condiviso, poi l'uso della cifratura simmetrica. Definire DH, ECDH, ephemeral key e PFS/forward secrecy, spiegando perché l'autenticazione dei peer resta necessaria.

**Accettazione:** il trasporto RSA della chiave non viene presentato come handshake TLS 1.3; descrivere cosa protegge e cosa non protegge la forward secrecy in caso di compromissione. Fonti: NIST SP 800-56A e RFC 8446. Diagramma originale con equivalente testuale.

**Completato l’8 ottobre 2026:** sette voci canoniche IT/EN, flashcard DH/ECDH/PFS, confronto key transport/key agreement e scenario di compromissione nell’obiettivo 1.4. Diagramma originale responsive con equivalente testuale, autenticazione distinta dall’accordo e limiti PFS (segreti di sessione, endpoint, PSK-only e 0-RTT). Conservata la spiegazione corretta di DH/ECDH e precisato che TLS 1.3 non usa il trasporto RSA. Fonti NIST SP 800-56A/56B e RFC 8446; verifiche automatiche IT/EN, contenuti, accessibilità e layout.

### 8. Terminazione TLS nei bilanciatori e confini di fiducia

- [x] Integrare TLS termination/offload nella guida del Dominio 3 e nel glossario (obiettivo 3.2).

**Evidenza nel repository:** `LoadBalancingRes` e `ActiveActivePassiveRes` coprono distribuzione e disponibilità; manca l'approfondimento sulla terminazione TLS/SSL offload e sul percorso verso il backend.

**Da realizzare:** confrontare TLS pass-through, terminazione al bilanciatore e nuova connessione TLS al backend. Spiegare dove sono disponibili i dati in chiaro, custodia delle chiavi e verifica del certificato backend; separare distribuzione del traffico e protezione crittografica. Mantenere SSL offload come alias storico, usando TLS nel testo operativo.

**Accettazione:** due flussi originali mostrano distintamente tratto client–bilanciatore e bilanciatore–backend; HTTPS sul primo tratto non è descritto come garanzia automatica sull'intero percorso. Fonti: documentazione ufficiale di un reverse proxy/bilanciatore e RFC TLS.

**Completato l'8 ottobre 2026:** voce canonica `TLSTerminationOffload` IT/EN nel gruppo «2. Network Security (Obj 3.2)», con tabella comparativa delle tre modalità (pass-through, terminazione con backend in chiaro, terminazione con ri-cifratura) per dove sta il testo in chiaro, la chiave privata e il routing L7/WAF. Due flussi originali distinguono i tratti client–bilanciatore e bilanciatore–backend; precisati custodia della chiave (sul bilanciatore o suo HSM), verifica del certificato del backend nella ri-cifratura e la separazione fra distribuzione del traffico e protezione crittografica. `SSL offload` mantenuto come alias storico, `TLS` nel testo operativo. Aggiunta una trappola sul confine di fiducia nella guida del Dominio 3 (IT/EN) e la citazione RFC 8446. Collegamenti a reverse proxy e tipi di proxy avanzati. Test dedicato `tests/tlsTerminationContent.test.ts`; `npm run check` verde (typecheck, lint, lint:md, spellcheck, 784 test) e artefatti di copertura rigenerati.

## P2 — reperibilità e approfondimenti mirati

### 9. Elicitation e frode d'identità

- [x] Esplicitare elicitation e identity fraud nella guida del Dominio 2 e nel glossario (obiettivo 2.2), collegandole a pretexting e impersonation.

**Evidenza nel repository:** `PretextingSE` contiene già un esempio di informazioni ottenute con una storia inventata e `ImpersonationSE` descrive la falsa identità; mancano le voci autonome e il confronto con l'uso illecito dell'identità raccolta.

**Da realizzare:** distinguere il pretesto costruito, il ruolo impersonato, l'ottenimento di informazioni durante una conversazione e la frode realizzata usando i dati altrui. Un attacco può combinare queste tecniche: non presentarle come fasi obbligatorie né come sinonimi. Collegare verifica tramite canale indipendente, minimizzazione della divulgazione e segnalazione.

**Accettazione:** un caso sintetico distingue raccolta delle informazioni e successivo abuso dell'identità; riutilizzare gli esempi di pretexting già presenti senza duplicarli. Voci e alias IT/EN reperibili. Fonti: risorse istituzionali CISA per social engineering e FTC per identity theft, con terminologia coerente con gli obiettivi d'esame.

**Completato l'8 ottobre 2026:** voci canoniche `ElicitationSE` e `IdentityFraudSE` (IT/EN) nel gruppo «Social Engineering (Obj 2.2)», sottogruppo «Ingegneria Sociale & Phishing». L'elicitation è definita come raccolta di informazioni *durante* una conversazione, distinta da pretexting (scenario/ruolo costruito a monte) e impersonation (ruolo giocato sul momento), con la precisazione che le tecniche si combinano e non sono fasi obbligatorie né sinonimi. La frode d'identità separa esplicitamente la **raccolta** (furto d'identità, elicitation, phishing) dall'**abuso** dei dati; difese di verifica su canale indipendente, minimizzazione e segnalazione. Esempi sintetici originali, parità IT/EN e test `tests/elicitationSELinuxContent.test.ts`.

### 10. Certificati, fiducia e revoca nel glossario

- [x] Aggiungere accessi autonomi a CRL, OCSP, OCSP stapling e certificato autofirmato, collegandoli alla guida del Dominio 1 (obiettivo 1.4).

**Evidenza nel repository:** `PKIFundamentals` spiega già CRL/OCSP/stapling; esistono voci su CA, certificati, root of trust, wildcard e formati. La lacuna riguarda soprattutto reperibilità e confronto fra certificato autofirmato, CA interna e CA pubblica.

**Da realizzare:** riutilizzare le definizioni di revoca; chiarire trust anchor, catena e distribuzione della fiducia. Un certificato autofirmato non è automaticamente debole sul piano crittografico, ma non offre automaticamente una fiducia verificata da terzi. Separare revoca, scadenza e verifica del nome.

**Accettazione:** ogni acronimo porta alla definizione canonica; distinguere stato “good” OCSP dalla validazione completa del certificato. Fonti: RFC 5280 e RFC 6960, con verifica del contesto TLS per stapling.

**Completato l’8 ottobre 2026:** aggiunte voci IT/EN autonome e ricercabili per CRL, OCSP, OCSP stapling e certificato autofirmato, con alias acronimici, definizioni canoniche e collegamenti a RFC 5280, RFC 6960 e RFC 6066. Le voci spiegano il ruolo del trust anchor e della catena, distinguono CA interna, CA pubblica e certificato autofirmato e separano revoca, scadenza e corrispondenza del nome. Rafforzata la guida D1 (obiettivo 1.4) con confronto dei modelli di fiducia e trappola d'esame sul significato limitato di OCSP good. Aggiunti test per ricerca, parità IT/EN e precisione didattica.

### 11. Metodi EAP e validazione del server

- [x] Rendere autonomi EAP-TLS, EAP-TTLS e PEAP nel glossario e affinare il confronto nella guida del Dominio 4 (obiettivo 4.1).

**Evidenza nel repository:** `EAPProtocol_New` descrive già i tre metodi, ma usa formule assolute come “il più sicuro di tutti” e collega la sola presenza di certificati alla neutralizzazione degli AP malevoli.

**Da realizzare:** precisare credenziali del client, tunnel e autenticazione del server per ciascun metodo; descrivere validazione della CA e dell'identità del server, provisioning del profilo e custodia della chiave privata. Collegare i ruoli supplicant/authenticator/authentication server di 802.1X senza duplicare la voce esistente. LEAP, EAP-FAST e WPS sono già presenti: non aggiungerli nuovamente.

**Accettazione:** nessuna graduatoria assoluta senza ipotesi; certificato server non contato come secondo fattore dell'utente. Evitare il nome improprio “WPA3-PSK” per descrivere SAE. Fonti: RFC dei metodi EAP e documentazione ufficiale dei profili di autenticazione.

**Completato l'8 ottobre 2026:** aggiunte voci canoniche IT/EN EAP-TLS, EAP-TTLS e PEAP, mantenendo `EAPProtocol_New` come panoramica e collegando i ruoli già spiegati nella voce 802.1X. Precisati credenziali client, tunnel TLS, validazione di CA e identità server, provisioning del profilo e custodia/ciclo di vita delle chiavi private. La guida D4.1 confronta metodi e limiti senza graduatorie assolute; il certificato server non viene contato come secondo fattore. Fonti: RFC 9190, RFC 5281 e Microsoft Learn. Aggiunto test dedicato di reperibilità, contenuti e confronto IT/EN.

### 12. SSO, SAML, OAuth e OIDC nel glossario

- [x] Rendere autonomi SSO, SAML, OAuth 2.0, OpenID Connect e Kerberos, collegandoli al confronto IAM della guida del Dominio 4 (obiettivo 4.6).

**Evidenza nel repository:** `MFA_SSO_Federation` e `FederationConcept` spiegano già SSO, SAML e la distinzione OAuth/OIDC; questi protocolli non hanno tutti una voce autonoma. LDAP ha già una voce con DN, OU, LDAPS e StartTLS: non ripetere tali contenuti né aggiungere DAP per un mero cenno storico.

**Da realizzare:** organizzare i rimandi per autenticazione, autorizzazione delegata, federazione e SSO. Collegare identity provider, service provider/relying party, asserzione e token nei limiti necessari a comprendere i flussi; spiegare il ruolo dei ticket Kerberos senza equipararlo automaticamente alla federazione web.

**Accettazione:** OAuth non diventa un protocollo di autenticazione; distinguere access token e ID token e non presumere che ogni access token sia JWT. Esempi IT/EN coerenti. Fonti: OASIS SAML, specifiche OAuth/OIDC e RFC 4120.

**Completato l’8 ottobre 2026:** cinque voci canoniche IT/EN nel gruppo IAM esistente (obiettivo 4.6), con fonti OASIS SAML, RFC 6749, OpenID Connect Core e RFC 4120, rimandi alle panoramiche SSO/Federation e flashcard SSO/SAML/OIDC. Aggiunti confronto dei cinque meccanismi e scenario originale nella guida D4.6; distinti autenticazione, autorizzazione delegata, ID token JWT, access token anche opaco e ticket Kerberos (KDC, TGT, service ticket). Precisati account locali, trust configurato e limiti di revoca delle sessioni federate. Aggiornati registri di identificatori/traduzioni e report di copertura; test dedicati verificano reperibilità, fonti, flashcard e parità IT/EN.

### 13. SELinux, MAC e isolamento applicativo

- [x] Aggiungere una voce SELinux e approfondire MAC rispetto a DAC nella guida del Dominio 4, collegandoli al Dominio 1 (obiettivi 4.5 e 1.2).

**Evidenza nel repository:** `MACConcept` usa già SELinux come esempio e la guida cita SELinux, ma manca una spiegazione autonoma. Distinguere UAC dal sandboxing.

**Da realizzare:** spiegare policy, label e confinamento delle applicazioni, distinguendo DAC, type enforcement e l'eventuale configurazione MLS. Non ridurre ogni policy SELinux al confronto lineare fra clearance e classificazione. Se si introduce UAC nel confronto, descriverlo come controllo dell'elevazione dei privilegi, distinto dall'isolamento di una sandbox.

**Accettazione:** esempio difensivo in cui permessi DAC concessi non bastano ad autorizzare l'accesso secondo la policy MAC; non proporre la disattivazione del controllo come soluzione standard. Fonti: documentazione ufficiale SELinux/distribuzione Linux e Microsoft per UAC.

**Completato l'8 ottobre 2026:** voce canonica `SELinuxOS` (IT/EN) nel gruppo Hardening (sottogruppo «Hardening di Sistemi e Dispositivi»), con l'angolo OS-security complementare a `MACConcept` (modello di accesso). Spiegati etichette e **type enforcement**, la distinzione dall'eventuale **MLS** (non ogni policy è un confronto lineare clearance/classificazione), le modalità `enforcing`/`permissive`/`disabled` e il **confinamento** delle applicazioni. Esempio difensivo originale in cui i permessi **DAC** concessi non bastano perché la policy **MAC** nega (servono entrambi i via libera), con l'avvertenza di correggere la policy anziché disattivare SELinux. Negli examTip, **UAC** descritto come controllo dell'elevazione dei privilegi e distinto dalla **sandbox**. Parità IT/EN e test `tests/elicitationSELinuxContent.test.ts`.

### 14. Contesto normativo: SOX e GLBA

- [x] Integrare un confronto normativo essenziale nel Dominio 5 e le voci SOX/GLBA nel glossario (obiettivi 5.1 e 5.4), collegando GDPR, HIPAA e PCI DSS già citati.

**Evidenza nel repository:** SOX e GLBA non compaiono nelle guide/definizioni analizzate; GDPR ha già una voce, mentre HIPAA e PCI DSS compaiono in vari approfondimenti. Non serve ricostruire una guida giuridica completa.

**Da realizzare:** spiegare ambito statunitense, finalità e tipo di organizzazione interessata da SOX e GLBA; distinguere legge/regolamento, standard di settore e obbligo contrattuale. Rendere HIPAA e PCI DSS autonomamente reperibili riutilizzando il contenuto pertinente. Collegare compliance reporting e responsabilità già trattati.

**Accettazione:** ambito geografico esplicito e nessuna applicabilità automatica a ogni organizzazione italiana; niente importi di sanzioni o classificazioni penali non necessari alla spiegazione. Verificare testo e applicabilità su SEC, FTC, HHS, PCI SSC e fonti istituzionali UE alla data dell'implementazione, registrando la data di verifica.

**Completato l’8 ottobre 2026:** quattro voci canoniche IT/EN autonome e ricercabili (`SarbanesOxleyAct`, `GrammLeachBlileyAct`, `HIPAAComplianceConcept`, `PCIDSSComplianceConcept`) con espansioni e flashcard SOX/GLBA/HIPAA/PCI-DSS. Confronto a cinque quadri con GDPR e scenario originale nella guida D5, collegati agli obiettivi 5.1/5.4 e a Compliance/Reporting. Precisati emittenti nel perimetro SEC, istituzioni finanziarie e regolatore competente, covered entities/business associates, PHI/ePHI e ambiente di pagamento; distinte legge, regolamento, standard di settore e obbligo contrattuale senza applicabilità automatica a ogni impresa italiana. Corretta la generalizzazione di Compliance sulle sanzioni e sulla natura di PCI DSS. Fonti SEC, FTC, HHS, PCI SSC ed EUR-Lex verificate il 2026-10-08; aggiornati report e registri di identificatori/traduzioni. Superati test dedicati e suite completa, typecheck, lint, Markdown, ortografia IT/EN, build e smoke test di produzione.

## Estensione dell'audit — PBQ e banca delle domande

Il secondo confronto del **6 ottobre 2026** include `src/pbqData.ts`, `src/pbqData.en.ts` e la banca iniziale localizzata delle domande. Lo stato esaminato comprende **10 PBQ interattive** e **682 domande iniziali**, distribuite sui cinque domini. Le sezioni teoriche con chiavi come `FirewallRulesPBQ` e `VPNPBQ` sono materiale preparatorio, non ulteriori scenari interattivi.

Le attività seguenti prevedono **esercizi e domande originali**, descritti nelle rispettive schede e verificati sulle fonti primarie. Usare scenari e diagrammi creati per il progetto.

Le PBQ attuali coprono rilascio dei certificati (101), change management (102), ciclo incident response (201), volatilità forense (202), social engineering (301), trattamento del rischio (302), log generali (401), log di autenticazione (402), classificazione dei controlli (501) e protezione dei dati (502). Le nuove attività aggiungono compiti diversi; non ripetono questi dieci scenari cambiando soltanto nomi e numeri.

### Requisiti comuni per i nuovi esercizi

- Usare prima le meccaniche esistenti di abbinamento e ordinamento (`src/pbq.ts`); non serve un nuovo motore per realizzare gli scenari sotto. Scegliere il `kind` compatibile con la meccanica, senza classificare un abbinamento come `incident`, che oggi richiede ordinamento.
- Definire identificatori stabili, obiettivo principale e rimandi agli obiettivi secondari; parità IT/EN di istruzioni, dati, risposta e spiegazione. Usare Kestrelia, indirizzi riservati/documentali e dati sintetici.
- Prevedere opzioni e premesse che rendano la soluzione determinata, senza imporre un ordine artificiale a operazioni che potrebbero avvenire in parallelo. La spiegazione deve motivare ogni scelta e chiarire i limiti delle conclusioni tratte dai log.
- Per i quiz, distinguere comprensione e applicazione, con distrattori plausibili e motivazione della risposta corretta e delle alternative. Ricontrollare i 682 quesiti esistenti, inclusi opzioni e spiegazioni, prima di introdurre ogni nuovo scenario.
- Verificare scoring, reset, persistenza e resa IT/EN delle nuove PBQ con Vitest; verificare via Playwright il flusso con tastiera e viewport mobile, senza dipendere dal solo trascinamento o dal colore. Riutilizzare i controlli di parità, obiettivi, citazioni e sicurezza dei contenuti per le nuove domande.

## P2 — otto nuove PBQ originali

### 15. Regole firewall e segmentazione

- [x] Aggiungere una PBQ di abbinamento fra flussi richiesti e regole firewall, con ordine di valutazione e deny implicito dichiarati nello scenario (obiettivo principale 4.5; collegamenti 2.5 e 3.2).

**Evidenza nel repository:** Non esiste una PBQ interattiva di configurazione firewall; la PBQ 401 riconosce indizi nei log e le voci `FirewallRulesPBQ`/`PBQFirewallLogs` sono approfondimenti teorici.

**Da realizzare:** topologia testuale con Internet, screened subnet, rete applicativa e gestione; scegliere sorgente, destinazione, protocollo/porta e azione per ciascun requisito. Includere una regola troppo ampia o mascherata da una precedente. Precisare se il firewall è stateful e come gestisce il traffico di risposta.

**Accettazione:** soluzione limita i flussi al necessario e mantiene la gestione dal segmento autorizzato; scoring ed esplicazione verificano ogni associazione. Non presentare NAT come sostituto delle policy firewall. Fonti: documentazione primaria del firewall scelto per la semantica delle regole.

**Completato il 2026-10-08:** aggiunta la PBQ originale 303, con sette abbinamenti e quattro distrattori IT/EN, topologia instradata pfSense, first match, deny implicito, stato delle connessioni e correzione della regola R0 troppo ampia. Le regole limitano proxy/API e accessi del bastion; NAT è distinto dalla policy firewall. Collegati gli obiettivi 4.5/2.5/3.2 e le fonti primarie Netgate; documentati soluzione e limiti in `docs/firewall-pbq.md`, aggiornati i report. Superati 844 test Vitest e 10 test Playwright su desktop/mobile (tastiera, feedback, reset, cambio lingua, navigazione, storico, axe e overflow), typecheck, lint, Markdown, ortografia IT/EN, build e smoke test di produzione.

### 16. Percorso VPN e protezione dei due siti

- [x] Aggiungere una PBQ di abbinamento per scegliere accesso remoto TLS, VPN site-to-site IPsec e modalità tunnel in un'infrastruttura sintetica (obiettivo 3.2).

**Evidenza nel repository:** Le definizioni VPN/IPsec esistono, ma nessuna delle dieci PBQ richiede di applicarle a una topologia.

**Da realizzare:** associare requisiti e punti di terminazione ai collegamenti corretti; distinguere il tratto protetto dai segmenti oltre il gateway e specificare l'autenticazione necessaria. Usare l'abbinamento esistente e un equivalente testuale della topologia.

**Accettazione:** spiegare perché tunnel e transport mode non sono intercambiabili nel caso proposto e perché un tunnel non protegge automaticamente tutto il traffico successivo alla terminazione. Nessuna falsa equivalenza “accesso remoto = sempre TLS”. Fonti: RFC IPsec/IKE e documentazione VPN ufficiale.

**Completato il 2026-10-08:** aggiunta la PBQ originale 304 con sette abbinamenti e quattro distrattori IT/EN: OpenVPN TLS remoto, IKEv2/IPsec ESP intersede, tunnel mode, limiti dopo la terminazione, autenticazione del personale e dei gateway, selector e policy. Topologia testuale sintetica e premesse rendono le scelte determinate senza equiparare accesso remoto e TLS né vietare universalmente transport mode. Collegate le fonti RFC 4301/RFC 7296 e Netgate e gli obiettivi 3.2/1.4/4.6; documentati soluzione e limiti in `docs/vpn-pbq.md`, aggiornati i report. Corretto “Ripeti” per conservare gli scenari scelti; adattati i test esame ai due scenari del dominio 3. Superati 864 test Vitest e 16 test Playwright desktop/mobile (tastiera, IT/EN, feedback, reset, navigazione, storico, axe e overflow), typecheck, lint, Markdown, ortografia IT/EN, build e smoke test di produzione.

### 17. Wi-Fi enterprise e ruoli 802.1X

- [x] Aggiungere una PBQ di abbinamento fra requisiti Wi-Fi, ruoli 802.1X e metodi EAP (obiettivo principale 4.1; collegamento 3.2).

**Evidenza nel repository:** La banca contiene già una domanda sul Wi-Fi con certificati (40199), ma manca un esercizio interattivo che colleghi client, access point, RADIUS e validazione del server.

**Da realizzare:** associare supplicant/authenticator/authentication server ai componenti, quindi profili con certificato client o autenticazione nel tunnel ai metodi pertinenti. Dichiarare le condizioni che distinguono PEAP ed EAP-TTLS ed evitare scelte ugualmente valide. Dipendenza: attività 5 e 11.

**Accettazione:** RADIUS non viene confuso con il metodo EAP e il certificato del server non è contato come fattore aggiuntivo dell'utente. Fonti: IEEE 802.1X e specifiche dei metodi EAP.

**Completato il 2026-10-08:** aggiunta la PBQ originale 305 con nove abbinamenti e quattro distrattori IT/EN: ruoli supplicant/authenticator/authentication server, EAP-TLS, PEAP/EAP-MSCHAPv2, EAP-TTLS/PAP, validazione server, trasporto RADIUS e fattori utente. Topologia testuale sintetica e compatibilità dei profili rendono le scelte determinate, senza confondere RADIUS con EAP né contare il certificato server come MFA del personale. Collegate le fonti IEEE 802.1X, RFC 3748/9190/5281 e Microsoft e gli obiettivi 4.1/3.2; soluzione e limiti in `docs/wifi-pbq.md`. Corretta la spiegazione del quesito 40199 in IT/EN eliminando la graduatoria assoluta EAP e distinguendo la modalità WPA3-Enterprise a 192 bit, con fonte Cisco e registro traduzioni aggiornato. Aggiornati report e test browser per la selezione delle PBQ e la nuova estrazione su ripetizione. Superati 889 test Vitest e 22 test Playwright desktop/mobile (tastiera, IT/EN, feedback, reset, navigazione, storico, axe e overflow), typecheck, lint, Markdown, ortografia IT/EN, build e smoke test di produzione.

### 18. SPF, DKIM e risultato DMARC

- [x] Aggiungere una PBQ di interpretazione di intestazioni email sintetiche con abbinamento a esito e motivazione DMARC (obiettivo 4.5).

**Evidenza nel repository:** Le voci SPF/DKIM/DMARC e i quesiti 40190, 40406 e 40200 trattano già i meccanismi; non esiste una PBQ con evidenze di autenticazione e allineamento da applicare.

**Da realizzare:** fornire dominio From, envelope sender, dominio della firma DKIM e risultati dei controlli, con policy DMARC e modalità di allineamento esplicite. Includere SPF valido ma non allineato, DKIM valido e allineato, e nessun meccanismo allineato.

**Accettazione:** pass/fail dipende dall'allineamento richiesto e dal risultato di almeno un meccanismo; separare valutazione DMARC e disposizione del messaggio secondo policy, senza garantire che ogni destinatario applichi la stessa azione. Fonte: specifiche IETF applicabili a SPF/DKIM/DMARC.

**Completato il 2026-10-08:** aggiunta la PBQ originale 403 IT/EN con sei messaggi sintetici, otto abbinamenti e cinque distrattori: SPF/DKIM validi o non validi, allineamento strict/relaxed, risultato DMARC, disposizione richiesta e limiti di sicurezza. Premesse esplicite e domini riservati rendono determinate le risposte; la policy del dominio non garantisce il comportamento del destinatario. Collegate RFC 9989, 7208 e 6376 e gli obiettivi 4.5/2.2; soluzione e limiti in `docs/dmarc-pbq.md`. Aggiornate le spiegazioni dei quesiti 40190, 40406 e 40200 in entrambe le lingue, il registro traduzioni e i report di copertura. Superati 913 test Vitest e 28 test Playwright desktop/mobile (tastiera, IT/EN, feedback, reset, navigazione, storico, axe e overflow), typecheck, lint, Markdown, ortografia IT/EN, build e nove smoke test di produzione.

### 19. Priorità delle vulnerabilità e verifica della remediation

- [x] Aggiungere una PBQ di abbinamento fra finding, priorità motivata e azione di verifica (obiettivo 4.3).

**Evidenza nel repository:** Il quesito 40320 già confronta CVSS ed esposizione: la nuova PBQ deve richiedere decisioni su più finding e sulla conferma della remediation, non riproporre quel confronto come domanda singola.

**Da realizzare:** tabella sintetica con CVE, severità fornita, esposizione, sfruttamento noto, criticità dell'asset e disponibilità delle patch; includere un falso positivo da validare e un sistema non aggiornabile da proteggere con controllo compensativo. Usare priorità esplicite e univoche nel contesto dichiarato.

**Accettazione:** non ordinare automaticamente per CVSS; distinguere patch applicata, rescan e verifica dell'efficacia. Nessun calcolo di vettori CVSS non spiegati o mescolati fra versioni. Fonti: FIRST, CISA e documentazione dello scanner per le evidenze.

**Completato il 2026-10-08:** PBQ originale 306 IT/EN, con quattro finding e otto abbinamenti più quattro distrattori. Tabella accessibile condivisa fra pratica ed esame con CVE esplicitamente fittizie, CVSS v3.1 Base fornito, esposizione, sfruttamento noto, criticità e disponibilità delle patch; priorità interne esplicite, senza ordinamento automatico per CVSS. Distinti falso positivo da validare e poi documentare, asset non aggiornabile con controllo compensativo, ticket di patch, rescan autenticato e verifica funzionale; evidenziato il rescan inconcludente quando i controlli autenticati falliscono. Fonti FIRST, CISA, Tenable e NIST collegate; soluzione e limiti in `docs/vulnerability-pbq.md`. Aggiornati i report di copertura e maturità. Superati 936 test Vitest, typecheck, lint, Markdown, ortografia IT/EN, build e 9 smoke test. Aggiunti sei test Playwright desktop/mobile per tastiera, reset, feedback, cambio lingua, esame, storico, axe e overflow: esecuzione locale bloccata prima del test dal Chromium assente e dal download non valido; verifiche browser non dichiarate superate.

### 20. Postura NAC e rete di remediation

- [x] Aggiungere una PBQ di abbinamento tra esiti del controllo di postura e accesso alla rete consentito (obiettivo principale 4.5; collegamento 4.1).

**Evidenza nel repository:** `NACNet` spiega già quarantena e controllo di postura; la PBQ 502 sceglie controlli per proteggere i dati, ma non tratta ammissione dei dispositivi.

**Da realizzare:** presentare dispositivi con stato patch, cifratura, agente e identità; associare accesso ordinario, accesso limitato alla remediation o blocco, secondo una policy dichiarata. Includere rivalutazione dopo la correzione e distinguere dispositivo conforme da attività sicuramente innocua.

**Accettazione:** la rete limitata offre i soli servizi necessari alla correzione; nessuna conclusione “antivirus presente = dispositivo fidato”. Collegare le varianti di agenti dell'attività 27. Fonti: documentazione ufficiale del prodotto NAC di riferimento.

**Completato il 2026-10-08:** PBQ originale 503 IT/EN, obiettivo 4.5 e collegamento 4.1: cinque dispositivi, otto abbinamenti e quattro distrattori. Policy esplicita per identità, patch, cifratura, antimalware e report corrente; accesso ordinario circoscritto al ruolo, remediation limitata, provisioning/valutazione per postura sconosciuta e blocco per identità revocata. Tabella accessibile condivisa tra pratica ed esame. Rivalutazione e nuova autorizzazione dopo la correzione; conformità distinta da attività sicuramente innocua, quarantena NAC distinta dalla quarantena di file. Rimandi alle varianti Agent/Agentless/Dissolvable Agent dell’attività 27, senza attribuire capacità universali al metodo agentless. Fonti Cisco ISE e NIST visibili nell’app; soluzione in `docs/nac-pbq.md`, report rigenerati. Superati 959 test Vitest, typecheck, lint, Markdown, ortografia IT/EN, build e 9 smoke test. Sei test Playwright desktop/mobile aggiunti; non eseguiti localmente per Chromium non disponibile, già verificato nell’intervento precedente.

### 21. RTO, RPO, backup e siti di recupero

- [x] Aggiungere una PBQ di abbinamento tra requisiti BIA e piani di recupero con tempi e perdita dati dichiarati (obiettivo principale 3.4; collegamento 5.2).

**Evidenza nel repository:** Esistono domande su RTO/RPO e siti alternativi; manca un esercizio interattivo che valuti insieme tempi di ripristino e intervallo dei dati persi.

**Da realizzare:** associare servizi a piani con frequenza backup/replica, ultimo punto recuperabile e durata misurata del ripristino. Includere siti hot/warm/cold solo con capacità esplicite: il nome del sito, da solo, non dimostra il rispetto del requisito.

**Accettazione:** lo studente distingue limite di perdita dati e tempo obiettivo di recupero; la soluzione è verificabile dai valori forniti, non dall'assunto “replica = backup” o “backup frequente = ripristino rapido”. Fonti: NIST sulla pianificazione di continuità.

**Completato (2026-10-09):** PBQ 307 IT/EN con cinque piani misurati, scelta del costo minimo ammissibile, sette abbinamenti e feedback. Fonte NIST SP 800-34; test indipendenti di calcolo e parità linguistica, verifica componente e controlli automatici. Dettagli in `docs/recovery-pbq.md`. Test Playwright aggiunti; esecuzione browser impedita dal binario Chromium assente.

### 22. Catena quantitativa AV → EF → SLE → ALE

- [x] Aggiungere una PBQ di abbinamento fra dati, risultati di calcolo e trattamento motivato del rischio (obiettivo 5.2).

**Evidenza nel repository:** Le formule e i quesiti 50006, 50068 e 50075 sono già presenti; la PBQ 302 classifica strategie di trattamento senza richiedere calcoli. Il nuovo compito integra i passaggi e il rischio residuo.

**Da realizzare:** dati originali con EF in percentuale/frazione e ARO espresso come frequenza annua; far associare SLE e ALE prima e dopo un controllo dal costo annuo dichiarato. Esplicitare gli effetti del controllo e l'incertezza delle stime.

**Accettazione:** unità, conversioni e risultati verificati automaticamente; convenienza economica non presentata come unico criterio per sicurezza, obblighi o rischio per le persone. Usare valori sintetici originali.

**Completato (2026-10-09):** PBQ 308 IT/EN con catena AV → EF → SLE → ALE prima e dopo un controllo, costo annuo, beneficio atteso netto e trattamento motivato. Valori sintetici, unità e conversioni sono ricalcolati nei test; la decisione include rischio residuo, incertezza, obblighi e impatti non monetizzati. Fonte NIST SP 800-30. Dettagli in `docs/risk-calculation-pbq.md`. Test Playwright desktop/mobile aggiunti; esecuzione locale impedita dal binario Chromium assente.

## P2 — ulteriori voci autonome nel glossario

### 23. Key Management System e secure enclave

- [x] Aggiungere KMS e secure enclave come voci canoniche, con rimandi a TPM/HSM e alla guida del Dominio 1 (obiettivo 1.4).

**Evidenza nel repository:** TPM/HSM hanno voci dedicate; KMS e secure enclave sono argomenti citati nell'obiettivo/guida senza equivalenti voci autonome nelle definizioni analizzate.

**Da realizzare:** distinguere gestione del ciclo di vita delle chiavi, protezione hardware delle operazioni e ambiente isolato; spiegare che una piattaforma KMS può usare HSM e che le proprietà di un enclave dipendono dall'implementazione. Descrivere le caratteristiche hardware nel contesto dell'implementazione che le offre.

**Accettazione:** nomi estesi e acronimi reperibili in entrambe le lingue; confronto originale con TPM/HSM senza duplicare quelle definizioni. Fonti: NIST per key management e documentazione primaria dell'implementazione scelta.

**Completato l'8 ottobre 2026:** voci canoniche `KMSConcept` e `SecureEnclaveConcept` (IT/EN) nel gruppo Cryptography (sottogruppo «Infrastruttura PKI»). KMS = gestione del ciclo di vita delle chiavi (creazione, rotazione, revoca, distruzione, BYOK) che *può usare* un HSM senza esserne sinonimo; secure enclave = ambiente isolato nel processore (TEE) con proprietà dipendenti dall'implementazione. Confronto esplicito con TPM/HSM senza duplicarne le definizioni; esempi originali e parità IT/EN. Test `tests/kmsWirelessNacContent.test.ts`.

### 24. EOL, EOS ed EOSL: terminologia del supporto

- [x] Espandere gli alias EOL/EOS/EOSL e precisare la voce `LegacyEOLVuln` con un confronto fra vendita, manutenzione e supporto (obiettivo 2.3).

**Evidenza nel repository:** EOSL è assente dal corpus di definizioni analizzato; la voce legacy esistente tende a equiparare EOL e fine supporto: occorre distinguere le tappe secondo la policy del produttore.

**Da realizzare:** spiegare che i produttori usano sigle e milestone diverse, quindi vanno controllate data e condizioni della policy del vendor. Separare tecnologia legacy, fine vendita, fine aggiornamenti ordinari ed eventuale supporto esteso; non inventare una definizione universale di EOS.

**Accettazione:** esempio con calendario sintetico che identifica quando cessano le patch, senza dire che nessun aggiornamento potrà mai essere rilasciato. Riutilizzare segmentation/virtual patching già presenti. Fonte: policy ufficiale del vendor assunto come esempio.

**Completato (2026-10-09):** `LegacyEOLVuln` è ricercabile come EOL, EOS ed EOSL in IT/EN e separa tecnologia legacy, fine vendita, fine manutenzione ordinaria e fine supporto esteso. Calendario sintetico con date e conseguenze operative, nessuna promessa assoluta sugli aggiornamenti eccezionali, controlli compensativi già presenti e domanda 468 riallineata. Fonte primaria e citazione: Cisco End-of-Life Policy. Dettagli in `docs/eol-support-lifecycle.md`; test dedicati alla parità e alle milestone.

### 25. CCMP, GCMP e GMAC

- [x] Rendere CCMP e GMAC autonomamente ricercabili, collegandoli a `GCMPConcept` e al confronto Wi-Fi (obiettivo 4.1).

**Evidenza nel repository:** GCMP è già una voce con i limiti corretti delle suite WPA3; CCMP è citato nei dettagli e GMAC non compare nelle definizioni analizzate.

**Da realizzare:** distinguere protocollo di protezione Wi-Fi, modalità di cifratura autenticata e codice di autenticazione. Non presentare GMAC come cifratura del contenuto né GCMP come obbligatorio in ogni rete WPA3. Collegare le attività 5 e 11, senza replicarne il confronto sui metodi di autenticazione.

**Accettazione:** espansione di GMAC verificata sulla fonte primaria; esempi separano riservatezza e integrità. Fonti: NIST SP 800-38D, IEEE e Wi-Fi Alliance.

**Completato l'8 ottobre 2026:** voci canoniche `CCMPConcept` e `GMACConcept` (IT/EN) nel gruppo Network Security (sottogruppo Wi-Fi), accanto a `GCMPConcept`. CCMP (AES in modalità CCM) = cifrario di WPA2 e della modalità di base di WPA3 (CCMP-128), distinto dalla suite a 192 bit (GCMP-256); GMAC = sola integrità/autenticità derivata da GCM, non cifratura e non GCMP. Esempi che separano riservatezza e integrità; parità IT/EN e test dedicato.

### 26. SD-WAN, SASE, CASB, SWG e FWaaS

- [x] Separare le definizioni canoniche della voce composita `ModernCloudNetArchitectures` e collegarle alla guida del Dominio 3 (obiettivo 3.2).

**Evidenza nel repository:** Le cinque spiegazioni esistono nella stessa voce: l'attività riguarda reperibilità e relazioni, non l'invenzione di contenuti mancanti. Il confronto deve distinguere componenti di connettività e servizi di sicurezza.

**Da realizzare:** dare a ogni acronimo una voce autonoma e riutilizzare i contenuti; chiarire architettura complessiva, componenti e modalità di erogazione. Disambiguare SWG e CASB per web/SaaS; non assumere che ogni implementazione includa tutti i servizi citati nel confronto.

**Accettazione:** ricerca di ogni acronimo porta alla propria definizione e ai rimandi; niente duplicati in glossario o flashcard. Fonti: documentazione primaria delle architetture adottate e fonti istituzionali pertinenti.

**Completato (2026-10-09):** create cinque voci autonome IT/EN (`SDWANArchitecture`, `SASEArchitecture`, `CASBArchitecture`, `SWGArchitecture`, `FWaaSArchitecture`) con ruoli, relazioni ed esempi distinti. La voce composita resta solo come ID deprecato e viene esclusa da glossario, flashcard e studio, evitando duplicati. Chiariti connettività rispetto a sicurezza, SWG rispetto a CASB e variabilità del catalogo SASE; guida 3.2 e fonti Cisco/Microsoft aggiornate. Test dedicati verificano reperibilità, unicità e parità.

### 27. Agente persistente, dissolvibile e agentless nel NAC

- [x] Integrare agente dissolvibile/temporaneo e posture assessment nel glossario, collegandoli a `AgentRes`, `AgentlessRes` e `NACNet` (obiettivo 4.5).

**Evidenza nel repository:** Il corpus distingue agente e agentless, ma non introduce autonomamente la categoria dissolvibile e la relazione con la valutazione della postura.

**Da realizzare:** distinguere installazione persistente, esecuzione temporanea e verifica senza agente sul dispositivo, con limiti di visibilità e frequenza dei controlli. Descrivere dipendenza da Active Directory e schedulazione secondo il prodotto: non sono limiti universali degli approcci agentless.

**Accettazione:** caso originale seleziona l'approccio secondo requisiti espliciti; disambiguare la quarantena NAC dalla quarantena di un file antimalware. Fonte: documentazione primaria di implementazioni NAC, riportando i limiti del prodotto scelto.

**Completato l'8 ottobre 2026:** voce canonica `DissolvableAgentNAC` (IT/EN) accanto a `AgentRes`/`AgentlessRes`. Distingue agente persistente (visibilità continua), dissolvibile (eseguito una volta al collegamento, poi si rimuove) e agentless; collega il posture assessment NAC con accesso pieno/limitato alla remediation/blocco e rivalutazione. Precisati i limiti dipendenti dal prodotto (Active Directory, frequenza) e la distinzione fra quarantena NAC (di rete) e quarantena di un file antimalware. Esempio originale, parità IT/EN e test dedicato.

## P2 — nuove domande di comprensione e applicazione

### 28. Quiz sugli approfondimenti dei Domini 1 e 2

- [x] Aggiungere almeno otto domande originali, una per ciascun tema: steganografia, PE/PA/PEP, key agreement e chiavi effimere, reflected/stored XSS, CSRF rispetto a SSRF, furto di sessione, domain hijacking, elicitation rispetto a frode d'identità.

**Evidenza nel repository:** Gli argomenti sono previsti nelle attività 1–7 e 9; diversi compaiono soltanto come cenni, opzioni o spiegazioni nelle domande iniziali, non come competenza applicata nel contesto specifico. Non dedurre assenza dal solo mancato acronimo: verificare semanticamente il banco prima di aggiungere ogni quesito.

**Accettazione:** almeno quattro quesiti applicativi con scenari sintetici; ogni domanda si collega alla definizione completata e a un obiettivo principale, con distrattori motivati. Non ripetere il riconoscimento generale di social engineering della PBQ 301.

**Completato l’8 ottobre 2026:** aggiunte otto domande originali IT/EN, una per ciascun tema, nei gruppi Cryptography, Zero Trust Architecture, Vulnerability Types e Threat Vectors & Attack Surfaces. Gli scenari distinguono steganografia e cifratura, ruoli PE/PA/PEP, forward secrecy con chiavi effimere, reflected/stored XSS, CSRF/SSRF, furto di sessione, domain hijacking e elicitation/frode d'identità. Le spiegazioni motivano la risposta e i distrattori; mappatura agli obiettivi 1.2, 1.4, 2.2 e 2.3. Test Vitest dedicato a copertura, traduzione, risposte e obiettivi.

### 29. Quiz su rete, cloud e autenticazione

- [x] Aggiungere almeno otto domande originali: due su limiti PMF/jamming e suite Wi-Fi, due su EAP/validazione del server, due su terminazione TLS e segmenti protetti, due sulla scelta motivata fra SD-WAN/SASE/CASB/SWG.

**Evidenza nel repository:** Esistono domande di riconoscimento dei protocolli e architetture, ma non coprono tutte le distinzioni approfondite nelle attività 5, 8, 11, 25 e 26.

**Accettazione:** dipendenze completate prima dei quesiti; le nuove domande chiedono di applicare le condizioni del caso, senza trasformare un acronimo aggiuntivo in un requisito ufficiale. Verificare la differenza rispetto al quesito Wi-Fi 40199 e al quesito SD-WAN 30540.

**Completato (2026-10-09):** aggiunte otto domande originali e bilingui: quattro nel Dominio 4 su limite di PMF rispetto al jamming RF, suite WPA3-Enterprise 192-bit, validazione CA/nome del server RADIUS e scelta PEAP rispetto a EAP-TLS; quattro nel Dominio 3 su ri-cifratura e validazione del backend dopo la terminazione TLS, custodia della chiave sul load balancer, scelta SD-WAN per il solo trasporto e CASB per la governance SaaS distinta da SWG/SASE. Gli scenari sono applicativi, motivano tutti i distrattori e sono distinti dai quesiti 40199 e 30540. Test dedicati verificano parità IT/EN, struttura, temi e mappatura agli obiettivi 3.2 e 4.1.

### 30. Quiz su IAM, hardening e responsabilità normative

- [x] Aggiungere almeno otto domande originali: due su SAML/OAuth/OIDC, due su SELinux/MAC/UAC, due su EOL/EOSL e supporto esteso, due su ambito e distinzione legge/standard di SOX/GLBA/HIPAA/PCI DSS.

**Evidenza nel repository:** I quesiti esistenti, fra cui 40218 su SAML, non esauriscono le distinzioni delle attività 12–14 e 24. Per le norme, evitare quesiti mnemonici su sanzioni storiche.

**Accettazione:** gli otto quesiti verificano decisioni e concetti distinti; OAuth resta autorizzazione delegata, UAC non diventa sandbox, la cessazione del supporto dipende dalla policy dichiarata. Fonti primarie normative controllate alla data di implementazione. Nessuna domanda aggiunta prima del materiale didattico necessario a risolverla.

**Completato (2026-10-09):** aggiunti otto quesiti applicativi IT/EN: OIDC/OAuth e token d'identità/accesso, OAuth come autorizzazione delegata distinta da SAML; SELinux MAC sopra DAC e UAC come elevazione non sandbox; interpretazione di EOL/EOS/LDOS secondo la policy del produttore e limiti del supporto esteso; ambito di SOX/GLBA e sovrapposizione HIPAA/PCI DSS, chiarendo che PCI DSS è uno standard di settore. Verificate le fonti primarie SEC, FTC, HHS e PCI SSC e aggiunti test su parità, struttura, mappatura e distinzioni richieste.

## Estensione dell'audit — confronto con il PDF ufficiale degli obiettivi SY0-701

Il terzo confronto dell'**8 ottobre 2026** verifica il corpus direttamente contro il documento ufficiale *CompTIA Security+ SY0-701 Exam Objectives* (Exam Number SY0-701 V7, Document Version 7.0, © 2023 CompTIA), sotto-obiettivo per sotto-obiettivo sui cinque domini **e acronimo per acronimo** sull'intera *Acronym List* finale del PDF (circa 230 sigle, confrontate con match a confine di parola contro `src/data.ts`, `src/data.en.ts`, `src/glossaryIndex.ts`, `src/canonicalTerms.ts` e `src/domainGuides.ts`). La copertura di guide, glossario e banca delle domande è risultata ampia: tutte le sigle centrali dei cinque domini (CIA, AAA, PKI, TLS, IPSec, SAML, OAuth, OIDC, CVSS, CVE, SIEM, EDR/XDR, SPF/DKIM/DMARC, RTO/RPO/MTBF/MTTR, ecc.) hanno già definizione o voce ricercabile. Il confronto ha individuato **due sotto-obiettivi non coperti adeguatamente** (attività 31–33), **73 sigle della *Acronym List* non ancora ricercabili per acronimo esatto** (attività 34) e la necessità di **garantire la copertura dettagliata ed esaustiva di ogni voce di ogni obiettivo** (attività 35).

**Direttiva aggiornata (richiesta dall'utente, 8 ottobre 2026):** l'app deve contenere e rendere ricercabili **tutti** gli acronimi presenti nel PDF ufficiale e deve coprire **in dettaglio tutti** gli obiettivi d'esame. Viene quindi rimosso il vincolo precedente che escludeva le sigle «solo-appendice» o considerate non pertinenti: su richiesta esplicita, l'intera *Acronym List* e l'intero elenco di obiettivi sono in perimetro. Restano validi i soli criteri di accuratezza (espansioni corrette da fonte primaria, nessuna sigla inventata, parità IT/EN, nessun contenuto di versioni successive spacciato per requisito SY0-701): non sono limiti di copertura ma garanzie di qualità.

### 31. Sensori di rilevamento nella sicurezza fisica (P1 — contenuto)

- [x] Rendere autonomi e ricercabili i sensori fisici infrarosso, di pressione, a microonde e a ultrasuoni, con approfondimento nella guida del Dominio 1 (obiettivo 1.2).

**Evidenza nel repository:** i quattro sensori compaiono **solo** come voce dell'elenco `keyTopics` dell'obiettivo 1.2 nelle guide IT/EN (`src/domainGuides.ts`, «Sensori: infrared, pressure, microwave, ultrasonic» / «Sensors: …»). Non esiste alcuna menzione in `src/data.ts` e `src/data.en.ts` (ricerca di infrared, pressure, microwave, ultrasonic, motion detector: zero risultati), nessuna voce canonica in `src/canonicalTerms.ts`, nessuna chiave in `src/glossaryIndex.ts`. Bollard, access control vestibule, video surveillance, lighting e la deception (honeypot/honeynet/honeyfile/honeytoken) sono invece già trattati e vanno collegati, non riscritti.

**Da realizzare:** una voce autonoma per i sensori di rilevamento che distingua il principio fisico di ciascuna tecnologia — infrarosso passivo (calore/corpo), sensore di pressione (peso/contatto a pavimento), microonde e ultrasuoni (rilevamento attivo di movimento per effetto Doppler, con bande e sensibilità diverse). Collocare i sensori come controllo **detective** (rileva e segnala), distinto da barriere deterrenti/preventive come bollard e vestibolo; spiegarne posizionamento, complementarità con videosorveglianza e illuminazione, e i limiti di falsi positivi/negativi in funzione dell'ambiente (correnti d'aria, animali, ostacoli, interferenze). Riutilizzare l'esempio «motion sensor» già citato nella tabella delle funzioni dei controlli, senza duplicarla.

**Accettazione:** la ricerca IT/EN di «sensore/sensor», «infrarosso/infrared», «pressione/pressure», «microonde/microwave», «ultrasuoni/ultrasonic» porta alla voce; uno scenario originale sceglie il sensore adeguato al contesto senza presentarne uno come universale né equiparare un sensore di rilevamento a una misura che impedisce l'intrusione. Collegamenti bidirezionali alle voci di sicurezza fisica esistenti; flashcard senza sigle inventate. Fonti: NIST (es. SP 800-116 e materiale sulla sicurezza fisica) e documentazione primaria dei produttori di sensori, con terminologia coerente con l'obiettivo 1.2.

**Completato l'8 ottobre 2026:** verificato che la voce `PhysicalSensors` (IT `data.ts` / EN `data.en.ts`) **già copre** l'obiettivo: distingue i quattro tipi — infrarosso passivo (PIR, calore corporeo in movimento), pressione (peso/contatto), microonde e ultrasuoni (rilevamento attivo di movimento) — con i rispettivi difetti, i sensori a doppia tecnologia, il rilevamento ambientale, un esempio originale e una trappola d'esame basata sul difetto del tipo sbagliato; è mappata nel sottogruppo «Misure di Sicurezza Fisica». L'evidenza iniziale di «zero risultati» era un **falso negativo**: la ricerca a frase non attraversava il grassetto Markdown (`**Pressione**`). Corretto il guard `scripts/objective-coverage.ts` (rimozione degli emphasis marker prima del match), che ora riconosce correttamente la copertura. Nessun contenuto duplicato.

### 32. Vettori non umani: image-based, file-based, voice call e removable device (P2 — reperibilità)

- [x] Rendere autonomamente reperibili i vettori basati su immagine, file, chiamata vocale e dispositivo rimovibile nella guida del Dominio 2 e nel glossario (obiettivo 2.2), collegandoli ai vettori umani e alle mitigazioni già presenti.

**Evidenza nel repository:** i vettori appaiono come enumerazione dell'obiettivo 2.2 nelle guide (`src/domainGuides.ts`, «Message-based: email, SMS, instant messaging; image-based, file-based, voice call» e «Removable device, vulnerable software…») con poche menzioni sparse in `src/data.ts`; manca una spiegazione autonoma e ricercabile che li distingua. Phishing/vishing/smishing, removable media hardening, email security e `AppCryptoAttacks` sono già trattati e vanno collegati.

**Completato l'8 ottobre 2026:** arricchita la voce `ThreatVectorsDetails` (IT/EN) con i vettori message-based (SMS/IM), image-based e file-based (immagine/QR, file con macro/allegato) e voice call (vishing), distinguendo esplicitamente il **mezzo di consegna** dalla **tecnica** e dal **payload**, e chiarendo che un attacco può concatenare più vettori. Collegati smishing/vishing/phishing e il removable media già presente. Aggiunta la trappola d'esame negli examTip IT/EN («disabilitare un solo canale non elimina l'intera superficie d'attacco»). La voce resta ricercabile e il sotto-argomento «voice call» risulta ora coperto nel guard di copertura degli obiettivi.

**Da realizzare:** una voce per ciascun vettore che separi il **mezzo di consegna** (immagine o QR code malevolo, documento/macro armati, chiamata vocale, supporto USB/rimovibile) dalla **tecnica** che lo sfrutta (es. social engineering, esecuzione di codice, esfiltrazione). Chiarire che lo stesso attacco può combinare più vettori e che il vettore non coincide con il payload. Collegare vishing alla voce «voice call», smishing/phishing ai messaggi, e il removable device all'hardening dei supporti rimovibili e al controllo dei dispositivi, senza duplicare quelle sezioni.

**Accettazione:** ogni vettore è ricercabile in IT/EN e uno scenario sintetico identifica il vettore senza confonderlo con la tecnica; nessuna affermazione che disabilitare un singolo canale elimini l'intera superficie d'attacco. Collegamenti bidirezionali ai contenuti esistenti, senza ripeterli. Fonti: CISA e NIST per i vettori di social engineering e la sicurezza dei supporti rimovibili.

### 33. Quiz su sensori fisici e vettori non umani (P2 — quiz)

- [x] Aggiungere almeno quattro domande originali: due sui sensori di rilevamento fisico (scelta del sensore in funzione del contesto e funzione detective) e due sui vettori non umani (distinzione fra mezzo di consegna e tecnica). Dipendenza: completare prima le attività 31 e 32.

**Evidenza nel repository:** gli argomenti sono oggi presenti solo come enumerazione dell'obiettivo; non esistono quesiti che richiedano di applicarne le distinzioni in uno scenario. Verificare semanticamente la banca prima di aggiungere ogni quesito, senza dedurre l'assenza dal solo mancato acronimo.

**Accettazione:** almeno due quesiti applicativi con scenario sintetico; ogni domanda si collega alla voce completata nelle attività 31–32 e a un obiettivo principale, con distrattori motivati e spiegazione della risposta corretta e delle alternative. Nessun quesito aggiunto prima del materiale didattico necessario a risolverlo; nessun sensore o vettore presentato come soluzione universale. Verifica IT/EN con Vitest e, dove pertinente, controllo del flusso su mobile.

**Completato l’8 ottobre 2026:** aggiunte quattro domande originali alla banca, integrate nel flusso localizzato dell'app e tradotte in inglese: due su `Physical Security Controls` (selezione contestuale del sensore a pressione e funzione detective dei sensori) e due su `Threat Vectors & Attack Surfaces` (QR/image-based e dispositivo rimovibile). Tutte usano scenari, quattro opzioni e spiegazioni che motivano la risposta corretta e distinguono i distrattori; le domande sono collegate rispettivamente agli obiettivi 1.2 e 2.2. Test Vitest dedicato per presenza nella banca IT/EN, answer key e mappatura degli obiettivi.

### 34. Copertura completa della Acronym List SY0-701 (P1 — reperibilità totale)

- [x] Rendere **ogni** sigla della *Acronym List* ufficiale SY0-701 presente e ricercabile nell'app (voce di glossario con espansione, alias IT/EN e flashcard), senza eccezioni. Dove il concetto è già spiegato, aggiungere l'acronimo come alias/rimando alla voce esistente; dove manca del tutto, creare una voce autonoma con definizione sintetica e rimando alla guida del dominio pertinente.

**Obiettivo di copertura:** 100% delle 329 voci della *Acronym List* del PDF ufficiale. La misura autoritativa è ora lo script `scripts/acronym-coverage.ts` (`npm run acronym-coverage`), che genera `docs/acronym-coverage.md` e alimenta il guard di CI `tests/acronymCoverage.test.ts`. Alla verifica dell'8 ottobre 2026 risultano, sul contenuto effettivamente reso nell'app (glossario + guide, in IT ed EN, con match a confine di parola): **244 sigle ricercabili (74,2%)**, **78 con voce/flashcard dedicata (23,7%)**, **85 non ancora ricercabili (25,8%)**. Questa misura è più severa del grep manuale iniziale (che dava 73, includendo file di codice, maiuscole/minuscole e occorrenze nelle sole domande): fa fede lo script. Questa attività elimina il vincolo precedente che escludeva le sigle «solo-appendice»: su richiesta esplicita, tutte le sigle del PDF vanno rese disponibili. L'elenco vivo delle mancanti è in `tests/fixtures/acronyms-missing.json` e `docs/acronym-coverage.md`; il guard impedisce regressioni e la lista può solo accorciarsi fino a zero.

**Da realizzare — le sigle mancanti, raggruppate per area.** L'elenco completo e aggiornato è in `tests/fixtures/acronyms-missing.json` / `docs/acronym-coverage.md` (85 all'8 ottobre 2026); il raggruppamento qui sotto copre le principali per orientare il lavoro (sigla — espansione):

- *Crittografia e PKI (obj 1.4):* **CFB** (Cipher Feedback), **CTM** (Counter Mode), **DSA** (Digital Signature Algorithm), **IDEA** (International Data Encryption Algorithm), **KEK** (Key Encryption Key), **RIPEMD** (RACE Integrity Primitives Evaluation Message Digest), **RACE** (Research and Development in Advanced Communications Technologies in Europe — contesto storico di RIPEMD), **SCEP** (Simple Certificate Enrollment Protocol), **SED** (Self-encrypting Drives), **GPG** (Gnu Privacy Guard).
- *Identità e autenticazione (obj 4.6/4.1):* **CHAP** (Challenge Handshake Authentication Protocol), **MSCHAP** (Microsoft CHAP), **KDC** (Key Distribution Center), **TGT** (Ticket Granting Ticket — collegare a Kerberos, attività 12), **PIV** (Personal Identity Verification), **FACL** (File System Access Control List).
- *Monitoraggio, detection ed endpoint (obj 4.1/4.5):* **NIPS** (Network-based Intrusion Prevention System), **WIDS** (Wireless Intrusion Detection System), **WIPS** (Wireless Intrusion Prevention System), **AIS** (Automated Indicator Sharing — companion di STIX/TAXII), **ML** (Machine Learning), **UEM** (Unified Endpoint Management), **PUP** (Potentially Unwanted Program), **SEH** (Structured Exception Handler).
- *Architettura, cloud e virtualizzazione (obj 3.1):* **VDI** (Virtual Desktop Infrastructure), **VDE** (Virtual Desktop Environment), **VPC** (Virtual Private Cloud), **MaaS** (Monitoring as a Service), **MSSP** (Managed Security Service Provider), **FPGA** (Field Programmable Gate Array), **SDK** (Software Development Kit), **VBA** (Visual Basic), **USB OTG** (USB On the Go).
- *Rete e infrastruttura (obj 3.1/3.2):* **DNAT** (Destination NAT), **PAT** (Port Address Translation), **GRE** (Generic Routing Encapsulation), **DSL** (Digital Subscriber Line), **MAN** (Metropolitan Area Network), **MTU** (Maximum Transmission Unit), **ISP** (Internet Service Provider), **P2P** (Peer to Peer), **POTS** (Plain Old Telephone Service), **VLSM** (Variable Length Subnet Masking), **OTA** (Over the Air), **RTBH** (Remotely Triggered Black Hole), **RAS** (Remote Access Server), **CSU** (Channel Service Unit), **ESN** (Electronic Serial Number), **BASH** (Bourne Again Shell), **TSIG** (Transaction Signature).
- *Messaggistica e protocolli (obj 2.2/4.5):* **IM** (Instant Messaging), **IRC** (Internet Relay Chat), **MMS** (Multimedia Message Service), **SPIM** (Spam over Internet Messaging), **POP** (Post Office Protocol), **FTPS** (Secured File Transfer Protocol — distinguere da SFTP), **SHTTP** (Secure Hypertext Transfer Protocol — obsoleto, distinguere da HTTPS).
- *Sicurezza fisica e strutture (obj 1.2/3.x):* **PTZ** (Pan-tilt-zoom), **IDF** (Intermediate Distribution Frame), **MDF** (Main Distribution Frame), **UAV** (Unmanned Aerial Vehicle), **PED** (Personal Electronic Device), **MFD** (Multifunction Device), **VTC** (Video Teleconferencing).
- *Governance, ruoli e processi (obj 5.x/1.3):* **CSO** (Chief Security Officer), **ISSO** (Information Systems Security Officer), **CIRT** (Computer Incident Response Team — companion di CSIRT/CERT), **CAR** (Corrective Action Report), **EULA** (End User License Agreement), **SDLM** (Software Development Lifecycle Methodology), **CP** (Contingency Planning), **COBO** (Corporate-owned, Business-only — completa BYOD/COPE/CYOD), **MTTF** (Mean Time to Failure — companion di MTBF/MTTR).

**Note di qualità (non sono esclusioni di copertura, ma criteri di accuratezza):**

- Espansione fedele al PDF e verificata su fonte primaria del protocollo/standard (IETF/RFC, NIST, IEEE, ISO, documentazione del produttore); nessuna sigla inventata.
- Disambiguare le sigle con più significati già a listino (es. **MAC** = Mandatory Access Control / Media Access Control / Message Authentication Code; **RA** = Recovery Agent / Registration Authority; **RBAC** = Role-based / Rule-based; **SAN** = Storage Area Network / Subject Alternative Name; **PAM** = Privileged Access Management / Pluggable Authentication Modules; **SOC** = Security Operations Center vs **SoC** = System on Chip): ogni significato deve avere la propria voce o un chiaro distinguo nella ricerca.
- Per le sigle storiche/obsolete (RACE, RIPEMD, S-HTTP, POTS, WTLS già presente) indicare lo stato «legacy/storico» senza presentarle come tecnologie correnti consigliate.
- Dove il concetto è già spiegato (es. SED→self-encrypting, DSA→firme/ECDSA, CIRT→incident response team, ML→machine learning, POP→POP3) aggiungere solo l'acronimo come alias ricercabile, senza duplicare la spiegazione.

**Accettazione:** il guard automatico esiste già — `scripts/acronym-coverage.ts` + `tests/acronymCoverage.test.ts` (nella suite `npm test`, quindi in CI) — e misura la copertura rispetto alle 329 sigle: la lista delle mancanti può solo accorciarsi e l'attività è completa quando arriva a **zero** (100% ricercabili; obiettivo ulteriore: 100% con voce/flashcard dedicata). Per ogni sigla aggiunta: espansione corretta da fonte primaria, parità IT/EN, nessuna sigla inventata nelle flashcard; dopo le modifiche rigenerare `docs/acronym-coverage.md` con `npm run acronym-coverage` e rimuovere la sigla da `tests/fixtures/acronyms-missing.json`.

**Completato il 9 ottobre 2026:** copertura portata a **329/329 sigle ricercabili e 329/329 con voce/flashcard dedicata** in italiano e inglese. Aggiunta un'appendice data-driven distribuita nei cinque domini con espansioni fedeli alla lista ufficiale, ID stabili, esempi e suggerimenti d'esame; le tecnologie storiche sono marcate `legacy/storico` e le collisioni rilevanti (FTPS/SFTP, SoC/SOC, SHTTP/HTTPS) sono esplicitate. L'indicizzatore e il salvataggio dei progressi riconoscono anche token ufficiali non standard (`2FA`, `3DES`, `ATT&CK`, `AES-256`, `PCI DSS`, `S/MIME`, `SE Linux`, `TCP/IP`, `USB OTG`, `MaaS`, `SoC`). Il report è stato rigenerato, la fixture delle mancanti è vuota e i test impongono copertura dedicata al 100%, espansioni esatte e parità delle flashcard IT/EN.

### 35. Copertura dettagliata e completa di tutti gli obiettivi SY0-701 (P1 — copertura)

- [x] Garantire che **ogni voce puntata e sub-puntata** di tutti i sotto-obiettivi (da 1.1 a 5.6) del PDF ufficiale abbia una spiegazione autonoma e ricercabile nell'app, non solo una menzione nell'elenco `keyTopics` della guida. L'obiettivo è la copertura esaustiva: nessun termine d'esame deve esistere solo come enumerazione.

**Da realizzare:** audit sistematico obiettivo per obiettivo (riusare e aggiornare `scripts/coverage-matrix.ts` e `scripts/gap-analysis.ts`) che, per ciascuna voce del PDF, verifichi la presenza di: definizione/spiegazione, voce o alias ricercabile, e almeno un rimando applicativo (quiz o PBQ) dove pertinente. Ogni lacuna rilevata diventa un'attività di contenuto con gli stessi criteri comuni di completamento (parità IT/EN, fonti primarie, esempi sintetici, accessibilità). Le attività 1–34 restano i gap già individuati; questa attività chiude gli eventuali residui non ancora elencati, fino a copertura dichiarata al 100%.

**Esito della prima passata (8 ottobre 2026):** verificati a campione **256 sotto-argomenti** delle voci puntate/sub-puntate di tutti i sotto-obiettivi 1.1–5.6 (presenza e profondità in `src/domainGuides.ts`, `src/data.ts`, `src/data.en.ts`). Risultato: la quasi totalità è coperta in guida e spiegazioni; **nessuna voce completamente assente (0/0)** oltre ai gap già a catalogo (sensori fisici, attività 31; vettori non umani, attività 32). Voci solo marginalmente sottili da approfondire o rendere autonome (concetto già presente): *credential replay* (spiegato nelle guide, senza voce dedicata), *URL scanning* (trattato dentro il web filter), *OS-specific security logs* (in tabella, espandibile). Da integrare come micro-approfondimenti, non come lacune bloccanti. Questa passata è a campione sui termini chiave: la verifica esaustiva automatizzata resta da costruire (vedi Accettazione).

**Accettazione:** uno script di copertura enumera **tutte** le voci del PDF per sotto-obiettivo e conferma, per ciascuna, spiegazione + ricerca; nessuna voce del PDF presente solo come bullet di `keyTopics`; report di copertura rigenerato e allegato; verifiche automatiche del progetto superate. Aggiornare questo stato a ogni avanzamento, registrando la data di verifica.

**Stato:** entrambi i guard sono realizzati e girano in CI (`npm test`).

- Acronimi — `scripts/acronym-coverage.ts` + `tests/acronymCoverage.test.ts` (attività 34).
- Voci di obiettivo — `scripts/objective-coverage.ts` + `tests/objectiveCoverage.test.ts`: confronta un elenco curato di **249 sotto-argomenti** degli obiettivi 1.1–5.6 (con sinonimi IT/EN) contro il contenuto *reso*, escludendo di proposito `keyTopics`/`outcome` (che sono i bullet dell'obiettivo) per non contare come «spiegato» ciò che è solo elencato. Report in `docs/objective-coverage.md`, fixture «può solo accorciarsi» in `tests/fixtures/objectives-uncovered.json`.

**Esito aggiornato all'8 ottobre 2026:** **242/249 (97,2%)** hanno una voce ricercabile dedicata (glossario o testo didattico di guida); **7 sono spiegati solo in una domanda** del quiz e vanno promossi a voce autonoma (threat scope reduction, record-level encryption, configuration enforcement, HIPS, password vaulting, workforce multiplier, key risk indicators); **0 assenti** (nessun gap totale di contenuto). Rispetto alla prima passata sono stati chiusi *pressure sensor* (già coperto da `PhysicalSensors`, vedi task 31), *voice call vector* (task 32) e *RFID cloning* (già coperto dalla voce RFID). Il guard, dopo la correzione dello strip del grassetto Markdown, non produce più i falsi negativi di quelle voci. Verifica anche che nulla regredisca a «assente» e che l'elenco scenda solo verso zero. L'elenco curato dei 249 sotto-argomenti è il denominatore vivo: ampliarlo quando emergono nuove voci rende il guard più stringente.

**Completato il 9 ottobre 2026:** il guard conferma **249/249 voci (100%) spiegate come contenuto autonomo e ricercabile**, con **0 quiz-only** e **0 assenti**. Promosse a voci bilingui le sei lacune residue: threat scope reduction, record-level encryption, configuration enforcement, password vaulting, workforce multiplier e key risk indicators; HIPS era già stato chiuso dall'appendice degli acronimi. Ogni nuova voce include definizione, distinzione operativa, esempio applicativo, exam tip e collegamento al quiz esistente; i concetti normativi/standard-based riportano fonti primarie NIST. La fixture delle voci scoperte è vuota e il test di CI richiede esplicitamente copertura 249/249.

## P1 — UX e navigazione (richieste del 9 ottobre 2026)

Modifiche di navigazione e struttura richieste dal proprietario per semplificare la home e avvicinare l'esperienza all'esame reale. Tutte le etichette coinvolte sono in `src/i18n.tsx` (locali IT ed EN) e i tab della home in `src/components/AppHeader.tsx` (`TABS`).

### 36. Acronimi: spostare il menu nel Glossario e toglierlo dalla home (P1 — UX/navigazione)

- [ ] Spostare il menu **Acronimi** (oggi tab top-level `flash`, etichette `tab.flash` "Flashcard Acronimi" / `tab.flashShort` "Acronimi") **dentro la sezione Glossario** e rimuoverlo dalla barra di navigazione principale della home.
- [ ] **Audit degli acronimi esposti nel Glossario:** la quantità di sigle effettivamente visibili/ricercabili dal Glossario appare oggettivamente insufficiente rispetto alla *Acronym List* ufficiale SY0-701. Verificare che **tutte** le sigle presenti nel dataset (glossario + appendice acronimi, vedi `src/acronymAppendixTopics.ts` e `src/glossaryIndex.ts`) siano realmente raggiungibili dal Glossario e non solo dalla sola vista flashcard; correggere ogni mancanza di esposizione.

**Da realizzare:** rendere le flashcard/voci degli acronimi un pannello o filtro interno al Glossario (riuso di `GlossarySection`/`FlashcardScreen`), aggiornare `AppHeader` per togliere il tab, aggiornare le chiavi i18n IT/EN e gli eventuali test E2E che selezionano `#tab_btn_flash`. Confrontare il conteggio degli acronimi mostrati nel Glossario con quello del dataset e con la lista ufficiale.

**Accettazione:** nessun tab "Acronimi" nella home; gli acronimi sono raggiungibili e ricercabili dal Glossario; il conteggio esposto coincide con il dataset (nessuna sigla «nascosta»); parità IT/EN; test e build verdi.

### 37. Pratica (PBQ): integrarla nel Simulatore e toglierla dalla home (P1 — UX/navigazione)

- [ ] Integrare gli **Scenari Pratici / PBQ** (oggi tab `pbq`, etichette `tab.pbq` "Scenari Pratici" / `tab.pbqShort` "Pratica") **dentro il Simulatore**, dove le PBQ sono già selezionabili tramite il controllo `#exam_pbq_count`.
- [ ] **Garantire che le PBQ compaiano effettivamente** nel flusso d'esame quando se ne seleziona un numero > 0 all'avvio della simulazione (coprire con test E2E l'estrazione effettiva delle PBQ dal banco per dominio).
- [ ] Rimuovere **Pratica** dalla barra di navigazione della home.

**Da realizzare:** togliere il tab `pbq` da `AppHeader`, verificare che la configurazione esame del `quiz`/Simulatore permetta di esercitare le PBQ in modalità pratica (eventuale modalità «solo PBQ» già presente), aggiornare le chiavi i18n IT/EN e i test E2E che aprono `#tab_btn_pbq`.

**Accettazione:** nessun tab "Pratica" nella home; dal Simulatore si possono selezionare e svolgere le PBQ; all'avvio con PBQ selezionate esse appaiono realmente nell'esame (verificato da test); parità IT/EN; test, build ed E2E verdi.

### 38. Rinominare il Simulatore con un nome più adatto (P1 — copy/UX)

- [ ] Sostituire l'etichetta **Simulatore** (`tab.quizShort` "Simulatore" / "Simulator", `tab.quiz` "High-Stakes Simulator") con un nome più adatto e coerente con l'esperienza d'esame.
- Opzioni proposte: **"Esame"**, "Test", "Simulazione d'esame".
- Raccomandazione del verificatore: **"Esame"**, coerente con la modalità già denominata internamente *exam mode* (`exam.title` "Exam mode: MCQs and PBQs"); decisione finale del proprietario.

**Da realizzare:** scelta del termine definitivo, aggiornamento delle chiavi i18n IT/EN (`tab.quiz`, `tab.quizShort` ed eventuali titoli correlati come `quiz.title`), verifica dei riferimenti testuali nei test e nella documentazione.

**Accettazione:** etichetta uniforme e coerente IT/EN in tutta l'app; nessun riferimento residuo a "Simulatore" dove si è scelto il nuovo nome; test e build verdi.

## Argomenti già coperti nelle spiegazioni

Il confronto non giustifica duplicare le spiegazioni dei seguenti contenuti già presenti. Alcuni vengono comunque ripresi nelle nuove PBQ, perché spiegazione teorica ed esercizio interattivo sono strumenti diversi:

- CIA/AAA, categorie e funzioni dei controlli, change management, hashing/salting, firme, TPM/HSM, formati dei certificati e tokenizzazione.
- Vettori e attori di minaccia, malware/fileless e living off the land, SQLi, buffer overflow, vulnerabilità cloud/supply chain e mitigazioni generali.
- Segmentazione, VPN/SASE, modelli cloud, disponibilità active/active e active/passive, backup, metriche di resilienza e alimentazione.
- Baseline, MDM/BYOD/COPE, SAST e fuzzing, scansioni, threat intelligence, SIEM, SPF/DKIM/DMARC, DLP/NAC, automazione e risposta agli incidenti.
- Ruoli sui dati, gestione del rischio, BIA, fornitori, accordi, audit, awareness e formazione.

La copertura esistente non esclude miglioramenti futuri; riutilizzare queste sezioni evitando duplicazioni di spiegazione. Nota: la direttiva aggiornata dell'8 ottobre 2026 (vedi attività 34–35) richiede comunque che **ogni** acronimo del PDF ufficiale sia ricercabile e che **ogni** voce di obiettivo sia coperta in dettaglio; la precedente indicazione di non catalogare «acronimi non pertinenti agli obiettivi» è quindi superata per le sigle della *Acronym List* SY0-701, pur mantenendo i criteri di accuratezza (fonti primarie, nessuna sigla inventata, stato legacy dichiarato per le tecnologie obsolete, nessun importo normativo datato o statistica incidentale non necessaria). Le correzioni individuate sopra riguardano le formulazioni effettivamente riscontrate e i criteri di precisione tecnica da rispettare durante l'integrazione.
