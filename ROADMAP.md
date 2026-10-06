# Roadmap — integrazioni alla guida e al glossario SY0-701

## Origine e perimetro

Questa roadmap sostituisce integralmente il precedente backlog. Contiene soltanto nuove attività emerse dal confronto, effettuato il **6 ottobre 2026**, fra il PDF allegato *Professor Messer’s CompTIA SY0-701 Security+ Course Notes*, versione **1.07**, e i contenuti attuali del repository.

Il PDF ha **107 pagine fisiche**, delle quali **96 pagine numerate di contenuto**. I riferimenti sotto usano la numerazione stampata: pagina 1 corrisponde alla pagina fisica 10. Il confronto riguarda le cinque guide in `src/domainGuides.ts`, le definizioni e gli approfondimenti in `src/data.ts` e `src/data.en.ts`, e la loro reperibilità nel glossario tramite `src/glossaryIndex.ts` e `src/canonicalTerms.ts`.

La presenza di un termine nel PDF non implica una lacuna: numerosi argomenti sono già spiegati. Le attività distinguono **contenuto da approfondire**, **voce di glossario da rendere autonoma** e **formulazione da correggere**. I riferimenti agli obiettivi SY0-701 indicano dove integrare il materiale, senza trasformare ogni approfondimento in un nuovo requisito ufficiale d'esame.

Il PDF è una fonte secondaria per individuare gli argomenti, non un testo da copiare né un'autorità tecnica da seguire senza verifica. Non aggiungere il PDF, la sua estrazione o i suoi esempi al repository. Scrivere spiegazioni originali e verificarle sulle fonti primarie indicate nelle attività.

## Criteri comuni di completamento

Ogni attività va completata nella guida e nel glossario dove indicato, con:

- Parità italiano/inglese: definizione, approfondimento, esempio originale e avvertenza didattica, quando pertinenti.
- Riutilizzo delle definizioni canoniche e collegamenti ai contenuti esistenti; identificatori stabili e nessuna duplicazione di concetti già spiegati.
- Termini e acronimi ricercabili nel glossario, con espansione corretta, alias IT/EN e disambiguazione dei significati. Verificare anche le flashcard generate dal glossario.
- Fonti primarie e mappatura agli obiettivi SY0-701; niente affermazioni assolute non giustificate, numeri normativi datati o contenuti di versioni successive presentati come requisiti SY0-701.
- Esempi con dati sintetici, senza credenziali reali o istruzioni per attaccare sistemi esterni. Diagrammi, se utili, accompagnati da una spiegazione testuale accessibile e leggibile su mobile.
- Controlli pertinenti su parità, termini canonici, citazioni, copertura e ricerca; eseguire i controlli automatici del progetto e aggiornare eventuali artefatti di copertura interessati.

**Ordine:** completare prima P1, poi P2. Tutte le caselle sono nuove attività da svolgere; l'analisi non equivale all'implementazione.

## P1 — contenuti e precisione tecnica

### 1. Steganografia e limiti dell'offuscamento

- [ ] Aggiungere una voce autonoma di steganografia e approfondire il confronto con cifratura, hashing, tokenizzazione e mascheramento nella guida del Dominio 1 (obiettivo 1.4).

**Evidenza:** PDF p. 13. La guida cita la steganografia nell'elenco dell'obiettivo e in una breve tabella; manca una voce dedicata nelle definizioni del glossario. Tokenizzazione e mascheramento sono già trattati e vanno collegati.

**Da realizzare:** spiegare messaggio nascosto e contenitore, esempi descrittivi con immagini/audio e distinzione fra nascondere l'esistenza di un messaggio e proteggerne il contenuto. La steganografia da sola non garantisce riservatezza, integrità o autenticità. Separare questo concetto dall'offuscamento del codice.

**Accettazione:** ricerca IT/EN di “steganografia/steganography” trova la voce; un esempio originale permette di scegliere fra steganografia e cifratura senza suggerire che l'occultamento sostituisca la crittografia. Verifica tecnica su pubblicazioni NIST pertinenti alla terminologia.

### 2. XSS reflected/stored e confronto con CSRF

- [ ] Approfondire XSS e CSRF nella guida del Dominio 2 (obiettivo 2.4), con voci autonome e alias nel glossario.

**Evidenza:** PDF pp. 25–26 e 37. `AppCryptoAttacks` contiene definizioni generali di XSS e CSRF, ma non distingue XSS riflesso e persistente. `ApplicationSecurityHardening` spiega già cookie sicuri e token CSRF: riutilizzare quelle mitigazioni.

**Da realizzare:** distinguere reflected/stored XSS per origine e persistenza dell'input, esecuzione nel browser e impatto; confrontare XSS, CSRF e SSRF per componente che agisce e fiducia sfruttata. Spiegare output encoding contestuale, sanitizzazione quando occorre consentire HTML e query parametrizzate per SQLi: non presentare la stessa difesa come sufficiente per tutti gli attacchi. Aggiungere l'alias XSRF alla voce CSRF.

**Accettazione:** casi originali distinguono i tre attacchi; HttpOnly limita la lettura dei cookie ma non impedisce l'esecuzione XSS, e SameSite non è presentato come difesa universale. Fonti: guide OWASP su XSS e CSRF.

### 3. Furto della sessione, replay e manipolazione dei cookie

- [ ] Esplicitare session hijacking/sidejacking nella guida del Dominio 2 e nel glossario, collegandoli alle mitigazioni applicative del Dominio 4 (obiettivi 2.4 e 4.1).

**Evidenza:** PDF pp. 35–36. `NetworkWirelessAttacks` menziona session hijacking come esempio di on-path; `AppCryptoAttacks` tratta replay e la sezione di hardening tratta già i cookie. Manca una spiegazione autonoma della relazione fra questi concetti.

**Da realizzare:** mostrare con un flusso testuale il riuso di un identificatore di sessione sottratto; distinguere attacco on-path, furto di sessione e replay, che possono essere collegati senza essere sinonimi. Separare header/cookie controllati dal client dalle decisioni di autorizzazione del server. Collegare TLS, scadenza/revoca, rotazione dopo autenticazione e attributi dei cookie già presenti.

**Accettazione:** chiarire che TLS non neutralizza ogni modalità di furto della sessione e che MFA al login non rende inutilizzabile una sessione rubata. Nessun addon obsoleto del PDF proposto come difesa attuale. Fonti: OWASP Session Management Cheat Sheet e documentazione dei cookie HTTP.

### 4. Domain hijacking rispetto a DNS poisoning e typosquatting

- [ ] Aggiungere domain hijacking alla guida del Dominio 2 e al glossario (obiettivo 2.4), collegandolo ai vettori di phishing dell'obiettivo 2.2.

**Evidenza:** PDF p. 33. Il corpus spiega DNS poisoning e typosquatting; manca il caso distinto del controllo illecito dell'account di registrazione o della delega del dominio.

**Da realizzare:** confrontare compromissione dell'account registrar, modifica dei record/deleghe, avvelenamento delle risposte DNS e registrazione di un dominio somigliante. Introdurre controllo degli accessi al registrar, MFA, protezione dei contatti di recupero, lock disponibili e monitoraggio delle modifiche.

**Accettazione:** uno scenario originale identifica quale componente è compromesso; spiegare che DNSSEC non impedisce da solo modifiche autorizzate con un account registrar compromesso. Fonti: ICANN e documentazione primaria su DNSSEC/registrar.

### 5. Disponibilità Wi-Fi e limiti di PMF

- [ ] Integrare RF jamming e deauthentication/disassociation nella guida e nel glossario, correggendo le generalizzazioni su PMF nei Domini 2, 3 e 4 (obiettivi 2.4, 3.2 e 4.1).

**Evidenza:** PDF p. 34. Il corpus parla di interferenze e PMF, ma non spiega autonomamente il jamming Wi-Fi. `WPA3EnterpriseRes` afferma genericamente che PMF cifra e protegge i management frame: occorre precisare ambito e limiti.

**Da realizzare:** distinguere interferenza accidentale, disturbo radio intenzionale e falsificazione di frame di gestione. Espandere PMF/MFP e il riferimento storico a IEEE 802.11w; spiegare che la protezione riguarda specifici frame di gestione robusti e che protezione unicast e broadcast non equivale alla cifratura di ogni management frame. Collegare WPA3 e modalità di transizione senza attribuire la stessa garanzia a qualunque configurazione.

**Accettazione:** PMF non è descritto come protezione dal disturbo fisico RF o da ogni DoS; non riprodurre l'affermazione del PDF che lega indiscriminatamente l'obbligatorietà di 802.11w a 802.11ac. Fonti: IEEE e Wi-Fi Alliance; solo scenari difensivi, nessun laboratorio di jamming.

### 6. Ruoli Zero Trust: PE, PA e PEP

- [ ] Rendere autonomi e ricercabili Policy Engine, Policy Administrator e Policy Enforcement Point, collegandoli alla guida del Dominio 1 (obiettivo 1.2).

**Evidenza:** PDF pp. 5–6. `PolicyDrivenAccessControl` e `ControlPlaneZTA` spiegano già PE/PA; la guida nomina Policy Enforcement Point, ma l'acronimo PEP e le voci autonome non sono disponibili nel glossario.

**Da realizzare:** riutilizzare le spiegazioni esistenti per distinguere decisione della policy, gestione della comunicazione e applicazione del controllo nel data plane. Collegare subject/system, segnali di contesto e verifica continua. Disambiguare il PA Zero Trust da altri significati dello stesso acronimo.

**Accettazione:** un flusso di accesso originale identifica correttamente chi decide, chi coordina e chi applica; ricerca per nomi estesi e acronimi, con collegamenti bidirezionali alle sezioni esistenti. Fonte: NIST SP 800-207.

### 7. Accordo delle chiavi, chiavi effimere e forward secrecy

- [ ] Approfondire key establishment nella guida del Dominio 1 e aggiungere le voci collegate nel glossario (obiettivo 1.4).

**Evidenza:** PDF pp. 11–12. `AsymmetricEncryption` distingue già correttamente DH/ECDH dalla cifratura; perfect forward secrecy compare soprattutto nel contesto WPA3. Manca un percorso generale su chiave di sessione, key transport, key agreement e chiavi effimere.

**Da realizzare:** conservare la distinzione già corretta su DH/ECDH; confrontare consegna di una chiave cifrata e derivazione di un segreto condiviso, poi l'uso della cifratura simmetrica. Definire DH, ECDH, ephemeral key e PFS/forward secrecy, spiegando perché l'autenticazione dei peer resta necessaria.

**Accettazione:** il trasporto RSA della chiave illustrato nel PDF non viene presentato come handshake TLS 1.3; descrivere cosa protegge e cosa non protegge la forward secrecy in caso di compromissione. Fonti: NIST SP 800-56A e RFC 8446. Diagramma originale con equivalente testuale.

### 8. Terminazione TLS nei bilanciatori e confini di fiducia

- [ ] Integrare TLS termination/offload nella guida del Dominio 3 e nel glossario (obiettivo 3.2).

**Evidenza:** PDF p. 50. `LoadBalancingRes` e `ActiveActivePassiveRes` coprono distribuzione e disponibilità; manca l'approfondimento sulla terminazione TLS/SSL offload e sul percorso verso il backend.

**Da realizzare:** confrontare TLS pass-through, terminazione al bilanciatore e nuova connessione TLS al backend. Spiegare dove sono disponibili i dati in chiaro, custodia delle chiavi e verifica del certificato backend; separare distribuzione del traffico e protezione crittografica. Mantenere SSL offload come alias storico, usando TLS nel testo operativo.

**Accettazione:** due flussi originali mostrano distintamente tratto client–bilanciatore e bilanciatore–backend; HTTPS sul primo tratto non è descritto come garanzia automatica sull'intero percorso. Fonti: documentazione ufficiale di un reverse proxy/bilanciatore e RFC TLS.

## P2 — reperibilità e approfondimenti mirati

### 9. Elicitation e frode d'identità

- [ ] Esplicitare elicitation e identity fraud nella guida del Dominio 2 e nel glossario (obiettivo 2.2), collegandole a pretexting e impersonation.

**Evidenza:** PDF p. 21. `PretextingSE` contiene già un esempio di informazioni ottenute con una storia inventata e `ImpersonationSE` descrive la falsa identità; mancano le voci autonome e il confronto con l'uso illecito dell'identità raccolta.

**Da realizzare:** distinguere il pretesto costruito, il ruolo impersonato, l'ottenimento di informazioni durante una conversazione e la frode realizzata usando i dati altrui. Un attacco può combinare queste tecniche: non presentarle come fasi obbligatorie né come sinonimi. Collegare verifica tramite canale indipendente, minimizzazione della divulgazione e segnalazione.

**Accettazione:** un caso sintetico distingue raccolta delle informazioni e successivo abuso dell'identità; riutilizzare gli esempi di pretexting già presenti senza duplicarli. Voci e alias IT/EN reperibili. Fonti: risorse istituzionali CISA per social engineering e FTC per identity theft, con terminologia coerente con gli obiettivi d'esame.

### 10. Certificati, fiducia e revoca nel glossario

- [ ] Aggiungere accessi autonomi a CRL, OCSP, OCSP stapling e certificato autofirmato, collegandoli alla guida del Dominio 1 (obiettivo 1.4).

**Evidenza:** PDF pp. 16–17. `PKIFundamentals` spiega già CRL/OCSP/stapling; esistono voci su CA, certificati, root of trust, wildcard e formati. La lacuna riguarda soprattutto reperibilità e confronto fra certificato autofirmato, CA interna e CA pubblica.

**Da realizzare:** riutilizzare le definizioni di revoca; chiarire trust anchor, catena e distribuzione della fiducia. Un certificato autofirmato non è automaticamente debole sul piano crittografico, ma non offre automaticamente una fiducia verificata da terzi. Separare revoca, scadenza e verifica del nome.

**Accettazione:** ogni acronimo porta alla definizione canonica; distinguere stato “good” OCSP dalla validazione completa del certificato. Fonti: RFC 5280 e RFC 6960, con verifica del contesto TLS per stapling.

### 11. Metodi EAP e validazione del server

- [ ] Rendere autonomi EAP-TLS, EAP-TTLS e PEAP nel glossario e affinare il confronto nella guida del Dominio 4 (obiettivo 4.1).

**Evidenza:** PDF pp. 50 e 62. `EAPProtocol_New` descrive già i tre metodi, ma usa formule assolute come “il più sicuro di tutti” e collega la sola presenza di certificati alla neutralizzazione degli AP malevoli.

**Da realizzare:** precisare credenziali del client, tunnel e autenticazione del server per ciascun metodo; descrivere validazione della CA e dell'identità del server, provisioning del profilo e custodia della chiave privata. Collegare i ruoli supplicant/authenticator/authentication server di 802.1X senza duplicare la voce esistente. LEAP, EAP-FAST e WPS sono già presenti: non aggiungerli nuovamente.

**Accettazione:** nessuna graduatoria assoluta senza ipotesi; certificato server non contato come secondo fattore dell'utente. Evitare il nome improprio “WPA3-PSK” del PDF per descrivere SAE. Fonti: RFC dei metodi EAP e documentazione ufficiale dei profili di autenticazione.

### 12. SSO, SAML, OAuth e OIDC nel glossario

- [ ] Rendere autonomi SSO, SAML, OAuth 2.0, OpenID Connect e Kerberos, collegandoli al confronto IAM della guida del Dominio 4 (obiettivo 4.6).

**Evidenza:** PDF pp. 75–77. `MFA_SSO_Federation` e `FederationConcept` spiegano già SSO, SAML e la distinzione OAuth/OIDC; questi protocolli non hanno tutti una voce autonoma. LDAP ha già una voce con DN, OU, LDAPS e StartTLS: non ripetere tali contenuti né aggiungere DAP per il solo cenno storico nel PDF.

**Da realizzare:** organizzare i rimandi per autenticazione, autorizzazione delegata, federazione e SSO. Collegare identity provider, service provider/relying party, asserzione e token nei limiti necessari a comprendere i flussi; spiegare il ruolo dei ticket Kerberos senza equipararlo automaticamente alla federazione web.

**Accettazione:** OAuth non diventa un protocollo di autenticazione; distinguere access token e ID token e non presumere che ogni access token sia JWT. Esempi IT/EN coerenti. Fonti: OASIS SAML, specifiche OAuth/OIDC e RFC 4120.

### 13. SELinux, MAC e isolamento applicativo

- [ ] Aggiungere una voce SELinux e approfondire MAC rispetto a DAC nella guida del Dominio 4, collegandoli al Dominio 1 (obiettivi 4.5 e 1.2).

**Evidenza:** PDF pp. 63 e 72. `MACConcept` usa già SELinux come esempio e la guida cita SELinux, ma manca una spiegazione autonoma. Il PDF colloca UAC tra gli esempi di sandboxing: tale equivalenza non va importata.

**Da realizzare:** spiegare policy, label e confinamento delle applicazioni, distinguendo DAC, type enforcement e l'eventuale configurazione MLS. Non ridurre ogni policy SELinux al confronto lineare fra clearance e classificazione. Se si introduce UAC nel confronto, descriverlo come controllo dell'elevazione dei privilegi, distinto dall'isolamento di una sandbox.

**Accettazione:** esempio difensivo in cui permessi DAC concessi non bastano ad autorizzare l'accesso secondo la policy MAC; non proporre la disattivazione del controllo come soluzione standard. Fonti: documentazione ufficiale SELinux/distribuzione Linux e Microsoft per UAC.

### 14. Contesto normativo: SOX e GLBA

- [ ] Integrare un confronto normativo essenziale nel Dominio 5 e le voci SOX/GLBA nel glossario (obiettivi 5.1 e 5.4), collegando GDPR, HIPAA e PCI DSS già citati.

**Evidenza:** PDF pp. 87 e 92. SOX e GLBA non compaiono nelle guide/definizioni analizzate; GDPR ha già una voce, mentre HIPAA e PCI DSS compaiono in vari approfondimenti. Non serve ricostruire una guida giuridica completa.

**Da realizzare:** spiegare ambito statunitense, finalità e tipo di organizzazione interessata da SOX e GLBA; distinguere legge/regolamento, standard di settore e obbligo contrattuale. Rendere HIPAA e PCI DSS autonomamente reperibili riutilizzando il contenuto pertinente. Collegare compliance reporting e responsabilità già trattati.

**Accettazione:** ambito geografico esplicito e nessuna applicabilità automatica a ogni organizzazione italiana; niente importi di sanzioni o classificazioni penali copiati dal PDF. Verificare testo e applicabilità su SEC, FTC, HHS, PCI SSC e fonti istituzionali UE alla data dell'implementazione, registrando la data di verifica.

## Argomenti verificati che non generano nuove attività

Il confronto non giustifica un nuovo backlog per i seguenti contenuti già presenti:

- CIA/AAA, categorie e funzioni dei controlli, change management, hashing/salting, firme, TPM/HSM, formati dei certificati e tokenizzazione.
- Vettori e attori di minaccia, malware/fileless e living off the land, SQLi, buffer overflow, vulnerabilità cloud/supply chain e mitigazioni generali.
- Segmentazione, VPN/SASE, modelli cloud, disponibilità active/active e active/passive, backup, metriche di resilienza e alimentazione.
- Baseline, MDM/BYOD/COPE, SAST e fuzzing, scansioni, threat intelligence, SIEM, SPF/DKIM/DMARC, DLP/NAC, automazione e risposta agli incidenti.
- Ruoli sui dati, gestione del rischio, BIA, fornitori, accordi, audit, awareness e formazione.

La copertura esistente non esclude miglioramenti futuri, ma il PDF non è una ragione per duplicare queste sezioni. Non pianificare cataloghi di tool citati soltanto come esempi storici, statistiche incidentali, importi normativi datati o acronimi non pertinenti agli obiettivi. Le correzioni individuate sopra riguardano le formulazioni effettivamente riscontrate o gli errori del PDF da evitare durante l'integrazione.
