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

- [ ] Integrare TLS termination/offload nella guida del Dominio 3 e nel glossario (obiettivo 3.2).

**Evidenza nel repository:** `LoadBalancingRes` e `ActiveActivePassiveRes` coprono distribuzione e disponibilità; manca l'approfondimento sulla terminazione TLS/SSL offload e sul percorso verso il backend.

**Da realizzare:** confrontare TLS pass-through, terminazione al bilanciatore e nuova connessione TLS al backend. Spiegare dove sono disponibili i dati in chiaro, custodia delle chiavi e verifica del certificato backend; separare distribuzione del traffico e protezione crittografica. Mantenere SSL offload come alias storico, usando TLS nel testo operativo.

**Accettazione:** due flussi originali mostrano distintamente tratto client–bilanciatore e bilanciatore–backend; HTTPS sul primo tratto non è descritto come garanzia automatica sull'intero percorso. Fonti: documentazione ufficiale di un reverse proxy/bilanciatore e RFC TLS.

## P2 — reperibilità e approfondimenti mirati

### 9. Elicitation e frode d'identità

- [ ] Esplicitare elicitation e identity fraud nella guida del Dominio 2 e nel glossario (obiettivo 2.2), collegandole a pretexting e impersonation.

**Evidenza nel repository:** `PretextingSE` contiene già un esempio di informazioni ottenute con una storia inventata e `ImpersonationSE` descrive la falsa identità; mancano le voci autonome e il confronto con l'uso illecito dell'identità raccolta.

**Da realizzare:** distinguere il pretesto costruito, il ruolo impersonato, l'ottenimento di informazioni durante una conversazione e la frode realizzata usando i dati altrui. Un attacco può combinare queste tecniche: non presentarle come fasi obbligatorie né come sinonimi. Collegare verifica tramite canale indipendente, minimizzazione della divulgazione e segnalazione.

**Accettazione:** un caso sintetico distingue raccolta delle informazioni e successivo abuso dell'identità; riutilizzare gli esempi di pretexting già presenti senza duplicarli. Voci e alias IT/EN reperibili. Fonti: risorse istituzionali CISA per social engineering e FTC per identity theft, con terminologia coerente con gli obiettivi d'esame.

### 10. Certificati, fiducia e revoca nel glossario

- [ ] Aggiungere accessi autonomi a CRL, OCSP, OCSP stapling e certificato autofirmato, collegandoli alla guida del Dominio 1 (obiettivo 1.4).

**Evidenza nel repository:** `PKIFundamentals` spiega già CRL/OCSP/stapling; esistono voci su CA, certificati, root of trust, wildcard e formati. La lacuna riguarda soprattutto reperibilità e confronto fra certificato autofirmato, CA interna e CA pubblica.

**Da realizzare:** riutilizzare le definizioni di revoca; chiarire trust anchor, catena e distribuzione della fiducia. Un certificato autofirmato non è automaticamente debole sul piano crittografico, ma non offre automaticamente una fiducia verificata da terzi. Separare revoca, scadenza e verifica del nome.

**Accettazione:** ogni acronimo porta alla definizione canonica; distinguere stato “good” OCSP dalla validazione completa del certificato. Fonti: RFC 5280 e RFC 6960, con verifica del contesto TLS per stapling.

### 11. Metodi EAP e validazione del server

- [ ] Rendere autonomi EAP-TLS, EAP-TTLS e PEAP nel glossario e affinare il confronto nella guida del Dominio 4 (obiettivo 4.1).

**Evidenza nel repository:** `EAPProtocol_New` descrive già i tre metodi, ma usa formule assolute come “il più sicuro di tutti” e collega la sola presenza di certificati alla neutralizzazione degli AP malevoli.

**Da realizzare:** precisare credenziali del client, tunnel e autenticazione del server per ciascun metodo; descrivere validazione della CA e dell'identità del server, provisioning del profilo e custodia della chiave privata. Collegare i ruoli supplicant/authenticator/authentication server di 802.1X senza duplicare la voce esistente. LEAP, EAP-FAST e WPS sono già presenti: non aggiungerli nuovamente.

**Accettazione:** nessuna graduatoria assoluta senza ipotesi; certificato server non contato come secondo fattore dell'utente. Evitare il nome improprio “WPA3-PSK” per descrivere SAE. Fonti: RFC dei metodi EAP e documentazione ufficiale dei profili di autenticazione.

### 12. SSO, SAML, OAuth e OIDC nel glossario

- [ ] Rendere autonomi SSO, SAML, OAuth 2.0, OpenID Connect e Kerberos, collegandoli al confronto IAM della guida del Dominio 4 (obiettivo 4.6).

**Evidenza nel repository:** `MFA_SSO_Federation` e `FederationConcept` spiegano già SSO, SAML e la distinzione OAuth/OIDC; questi protocolli non hanno tutti una voce autonoma. LDAP ha già una voce con DN, OU, LDAPS e StartTLS: non ripetere tali contenuti né aggiungere DAP per un mero cenno storico.

**Da realizzare:** organizzare i rimandi per autenticazione, autorizzazione delegata, federazione e SSO. Collegare identity provider, service provider/relying party, asserzione e token nei limiti necessari a comprendere i flussi; spiegare il ruolo dei ticket Kerberos senza equipararlo automaticamente alla federazione web.

**Accettazione:** OAuth non diventa un protocollo di autenticazione; distinguere access token e ID token e non presumere che ogni access token sia JWT. Esempi IT/EN coerenti. Fonti: OASIS SAML, specifiche OAuth/OIDC e RFC 4120.

### 13. SELinux, MAC e isolamento applicativo

- [ ] Aggiungere una voce SELinux e approfondire MAC rispetto a DAC nella guida del Dominio 4, collegandoli al Dominio 1 (obiettivi 4.5 e 1.2).

**Evidenza nel repository:** `MACConcept` usa già SELinux come esempio e la guida cita SELinux, ma manca una spiegazione autonoma. Distinguere UAC dal sandboxing.

**Da realizzare:** spiegare policy, label e confinamento delle applicazioni, distinguendo DAC, type enforcement e l'eventuale configurazione MLS. Non ridurre ogni policy SELinux al confronto lineare fra clearance e classificazione. Se si introduce UAC nel confronto, descriverlo come controllo dell'elevazione dei privilegi, distinto dall'isolamento di una sandbox.

**Accettazione:** esempio difensivo in cui permessi DAC concessi non bastano ad autorizzare l'accesso secondo la policy MAC; non proporre la disattivazione del controllo come soluzione standard. Fonti: documentazione ufficiale SELinux/distribuzione Linux e Microsoft per UAC.

### 14. Contesto normativo: SOX e GLBA

- [ ] Integrare un confronto normativo essenziale nel Dominio 5 e le voci SOX/GLBA nel glossario (obiettivi 5.1 e 5.4), collegando GDPR, HIPAA e PCI DSS già citati.

**Evidenza nel repository:** SOX e GLBA non compaiono nelle guide/definizioni analizzate; GDPR ha già una voce, mentre HIPAA e PCI DSS compaiono in vari approfondimenti. Non serve ricostruire una guida giuridica completa.

**Da realizzare:** spiegare ambito statunitense, finalità e tipo di organizzazione interessata da SOX e GLBA; distinguere legge/regolamento, standard di settore e obbligo contrattuale. Rendere HIPAA e PCI DSS autonomamente reperibili riutilizzando il contenuto pertinente. Collegare compliance reporting e responsabilità già trattati.

**Accettazione:** ambito geografico esplicito e nessuna applicabilità automatica a ogni organizzazione italiana; niente importi di sanzioni o classificazioni penali non necessari alla spiegazione. Verificare testo e applicabilità su SEC, FTC, HHS, PCI SSC e fonti istituzionali UE alla data dell'implementazione, registrando la data di verifica.

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

- [ ] Aggiungere una PBQ di abbinamento fra flussi richiesti e regole firewall, con ordine di valutazione e deny implicito dichiarati nello scenario (obiettivo principale 4.5; collegamenti 2.5 e 3.2).

**Evidenza nel repository:** Non esiste una PBQ interattiva di configurazione firewall; la PBQ 401 riconosce indizi nei log e le voci `FirewallRulesPBQ`/`PBQFirewallLogs` sono approfondimenti teorici.

**Da realizzare:** topologia testuale con Internet, screened subnet, rete applicativa e gestione; scegliere sorgente, destinazione, protocollo/porta e azione per ciascun requisito. Includere una regola troppo ampia o mascherata da una precedente. Precisare se il firewall è stateful e come gestisce il traffico di risposta.

**Accettazione:** soluzione limita i flussi al necessario e mantiene la gestione dal segmento autorizzato; scoring ed esplicazione verificano ogni associazione. Non presentare NAT come sostituto delle policy firewall. Fonti: documentazione primaria del firewall scelto per la semantica delle regole.

### 16. Percorso VPN e protezione dei due siti

- [ ] Aggiungere una PBQ di abbinamento per scegliere accesso remoto TLS, VPN site-to-site IPsec e modalità tunnel in un'infrastruttura sintetica (obiettivo 3.2).

**Evidenza nel repository:** Le definizioni VPN/IPsec esistono, ma nessuna delle dieci PBQ richiede di applicarle a una topologia.

**Da realizzare:** associare requisiti e punti di terminazione ai collegamenti corretti; distinguere il tratto protetto dai segmenti oltre il gateway e specificare l'autenticazione necessaria. Usare l'abbinamento esistente e un equivalente testuale della topologia.

**Accettazione:** spiegare perché tunnel e transport mode non sono intercambiabili nel caso proposto e perché un tunnel non protegge automaticamente tutto il traffico successivo alla terminazione. Nessuna falsa equivalenza “accesso remoto = sempre TLS”. Fonti: RFC IPsec/IKE e documentazione VPN ufficiale.

### 17. Wi-Fi enterprise e ruoli 802.1X

- [ ] Aggiungere una PBQ di abbinamento fra requisiti Wi-Fi, ruoli 802.1X e metodi EAP (obiettivo principale 4.1; collegamento 3.2).

**Evidenza nel repository:** La banca contiene già una domanda sul Wi-Fi con certificati (40199), ma manca un esercizio interattivo che colleghi client, access point, RADIUS e validazione del server.

**Da realizzare:** associare supplicant/authenticator/authentication server ai componenti, quindi profili con certificato client o autenticazione nel tunnel ai metodi pertinenti. Dichiarare le condizioni che distinguono PEAP ed EAP-TTLS ed evitare scelte ugualmente valide. Dipendenza: attività 5 e 11.

**Accettazione:** RADIUS non viene confuso con il metodo EAP e il certificato del server non è contato come fattore aggiuntivo dell'utente. Fonti: IEEE 802.1X e specifiche dei metodi EAP.

### 18. SPF, DKIM e risultato DMARC

- [ ] Aggiungere una PBQ di interpretazione di intestazioni email sintetiche con abbinamento a esito e motivazione DMARC (obiettivo 4.5).

**Evidenza nel repository:** Le voci SPF/DKIM/DMARC e i quesiti 40190, 40406 e 40200 trattano già i meccanismi; non esiste una PBQ con evidenze di autenticazione e allineamento da applicare.

**Da realizzare:** fornire dominio From, envelope sender, dominio della firma DKIM e risultati dei controlli, con policy DMARC e modalità di allineamento esplicite. Includere SPF valido ma non allineato, DKIM valido e allineato, e nessun meccanismo allineato.

**Accettazione:** pass/fail dipende dall'allineamento richiesto e dal risultato di almeno un meccanismo; separare valutazione DMARC e disposizione del messaggio secondo policy, senza garantire che ogni destinatario applichi la stessa azione. Fonte: specifiche IETF applicabili a SPF/DKIM/DMARC.

### 19. Priorità delle vulnerabilità e verifica della remediation

- [ ] Aggiungere una PBQ di abbinamento fra finding, priorità motivata e azione di verifica (obiettivo 4.3).

**Evidenza nel repository:** Il quesito 40320 già confronta CVSS ed esposizione: la nuova PBQ deve richiedere decisioni su più finding e sulla conferma della remediation, non riproporre quel confronto come domanda singola.

**Da realizzare:** tabella sintetica con CVE, severità fornita, esposizione, sfruttamento noto, criticità dell'asset e disponibilità delle patch; includere un falso positivo da validare e un sistema non aggiornabile da proteggere con controllo compensativo. Usare priorità esplicite e univoche nel contesto dichiarato.

**Accettazione:** non ordinare automaticamente per CVSS; distinguere patch applicata, rescan e verifica dell'efficacia. Nessun calcolo di vettori CVSS non spiegati o mescolati fra versioni. Fonti: FIRST, CISA e documentazione dello scanner per le evidenze.

### 20. Postura NAC e rete di remediation

- [ ] Aggiungere una PBQ di abbinamento tra esiti del controllo di postura e accesso alla rete consentito (obiettivo principale 4.5; collegamento 4.1).

**Evidenza nel repository:** `NACNet` spiega già quarantena e controllo di postura; la PBQ 502 sceglie controlli per proteggere i dati, ma non tratta ammissione dei dispositivi.

**Da realizzare:** presentare dispositivi con stato patch, cifratura, agente e identità; associare accesso ordinario, accesso limitato alla remediation o blocco, secondo una policy dichiarata. Includere rivalutazione dopo la correzione e distinguere dispositivo conforme da attività sicuramente innocua.

**Accettazione:** la rete limitata offre i soli servizi necessari alla correzione; nessuna conclusione “antivirus presente = dispositivo fidato”. Collegare le varianti di agenti dell'attività 27. Fonti: documentazione ufficiale del prodotto NAC di riferimento.

### 21. RTO, RPO, backup e siti di recupero

- [ ] Aggiungere una PBQ di abbinamento tra requisiti BIA e piani di recupero con tempi e perdita dati dichiarati (obiettivo principale 3.4; collegamento 5.2).

**Evidenza nel repository:** Esistono domande su RTO/RPO e siti alternativi; manca un esercizio interattivo che valuti insieme tempi di ripristino e intervallo dei dati persi.

**Da realizzare:** associare servizi a piani con frequenza backup/replica, ultimo punto recuperabile e durata misurata del ripristino. Includere siti hot/warm/cold solo con capacità esplicite: il nome del sito, da solo, non dimostra il rispetto del requisito.

**Accettazione:** lo studente distingue limite di perdita dati e tempo obiettivo di recupero; la soluzione è verificabile dai valori forniti, non dall'assunto “replica = backup” o “backup frequente = ripristino rapido”. Fonti: NIST sulla pianificazione di continuità.

### 22. Catena quantitativa AV → EF → SLE → ALE

- [ ] Aggiungere una PBQ di abbinamento fra dati, risultati di calcolo e trattamento motivato del rischio (obiettivo 5.2).

**Evidenza nel repository:** Le formule e i quesiti 50006, 50068 e 50075 sono già presenti; la PBQ 302 classifica strategie di trattamento senza richiedere calcoli. Il nuovo compito integra i passaggi e il rischio residuo.

**Da realizzare:** dati originali con EF in percentuale/frazione e ARO espresso come frequenza annua; far associare SLE e ALE prima e dopo un controllo dal costo annuo dichiarato. Esplicitare gli effetti del controllo e l'incertezza delle stime.

**Accettazione:** unità, conversioni e risultati verificati automaticamente; convenienza economica non presentata come unico criterio per sicurezza, obblighi o rischio per le persone. Usare valori sintetici originali.

## P2 — ulteriori voci autonome nel glossario

### 23. Key Management System e secure enclave

- [ ] Aggiungere KMS e secure enclave come voci canoniche, con rimandi a TPM/HSM e alla guida del Dominio 1 (obiettivo 1.4).

**Evidenza nel repository:** TPM/HSM hanno voci dedicate; KMS e secure enclave sono argomenti citati nell'obiettivo/guida senza equivalenti voci autonome nelle definizioni analizzate.

**Da realizzare:** distinguere gestione del ciclo di vita delle chiavi, protezione hardware delle operazioni e ambiente isolato; spiegare che una piattaforma KMS può usare HSM e che le proprietà di un enclave dipendono dall'implementazione. Descrivere le caratteristiche hardware nel contesto dell'implementazione che le offre.

**Accettazione:** nomi estesi e acronimi reperibili in entrambe le lingue; confronto originale con TPM/HSM senza duplicare quelle definizioni. Fonti: NIST per key management e documentazione primaria dell'implementazione scelta.

### 24. EOL, EOS ed EOSL: terminologia del supporto

- [ ] Espandere gli alias EOL/EOS/EOSL e precisare la voce `LegacyEOLVuln` con un confronto fra vendita, manutenzione e supporto (obiettivo 2.3).

**Evidenza nel repository:** EOSL è assente dal corpus di definizioni analizzato; la voce legacy esistente tende a equiparare EOL e fine supporto: occorre distinguere le tappe secondo la policy del produttore.

**Da realizzare:** spiegare che i produttori usano sigle e milestone diverse, quindi vanno controllate data e condizioni della policy del vendor. Separare tecnologia legacy, fine vendita, fine aggiornamenti ordinari ed eventuale supporto esteso; non inventare una definizione universale di EOS.

**Accettazione:** esempio con calendario sintetico che identifica quando cessano le patch, senza dire che nessun aggiornamento potrà mai essere rilasciato. Riutilizzare segmentation/virtual patching già presenti. Fonte: policy ufficiale del vendor assunto come esempio.

### 25. CCMP, GCMP e GMAC

- [ ] Rendere CCMP e GMAC autonomamente ricercabili, collegandoli a `GCMPConcept` e al confronto Wi-Fi (obiettivo 4.1).

**Evidenza nel repository:** GCMP è già una voce con i limiti corretti delle suite WPA3; CCMP è citato nei dettagli e GMAC non compare nelle definizioni analizzate.

**Da realizzare:** distinguere protocollo di protezione Wi-Fi, modalità di cifratura autenticata e codice di autenticazione. Non presentare GMAC come cifratura del contenuto né GCMP come obbligatorio in ogni rete WPA3. Collegare le attività 5 e 11, senza replicarne il confronto sui metodi di autenticazione.

**Accettazione:** espansione di GMAC verificata sulla fonte primaria; esempi separano riservatezza e integrità. Fonti: NIST SP 800-38D, IEEE e Wi-Fi Alliance.

### 26. SD-WAN, SASE, CASB, SWG e FWaaS

- [ ] Separare le definizioni canoniche della voce composita `ModernCloudNetArchitectures` e collegarle alla guida del Dominio 3 (obiettivo 3.2).

**Evidenza nel repository:** Le cinque spiegazioni esistono nella stessa voce: l'attività riguarda reperibilità e relazioni, non l'invenzione di contenuti mancanti. Il confronto deve distinguere componenti di connettività e servizi di sicurezza.

**Da realizzare:** dare a ogni acronimo una voce autonoma e riutilizzare i contenuti; chiarire architettura complessiva, componenti e modalità di erogazione. Disambiguare SWG e CASB per web/SaaS; non assumere che ogni implementazione includa tutti i servizi citati nel confronto.

**Accettazione:** ricerca di ogni acronimo porta alla propria definizione e ai rimandi; niente duplicati in glossario o flashcard. Fonti: documentazione primaria delle architetture adottate e fonti istituzionali pertinenti.

### 27. Agente persistente, dissolvibile e agentless nel NAC

- [ ] Integrare agente dissolvibile/temporaneo e posture assessment nel glossario, collegandoli a `AgentRes`, `AgentlessRes` e `NACNet` (obiettivo 4.5).

**Evidenza nel repository:** Il corpus distingue agente e agentless, ma non introduce autonomamente la categoria dissolvibile e la relazione con la valutazione della postura.

**Da realizzare:** distinguere installazione persistente, esecuzione temporanea e verifica senza agente sul dispositivo, con limiti di visibilità e frequenza dei controlli. Descrivere dipendenza da Active Directory e schedulazione secondo il prodotto: non sono limiti universali degli approcci agentless.

**Accettazione:** caso originale seleziona l'approccio secondo requisiti espliciti; disambiguare la quarantena NAC dalla quarantena di un file antimalware. Fonte: documentazione primaria di implementazioni NAC, riportando i limiti del prodotto scelto.

## P2 — nuove domande di comprensione e applicazione

### 28. Quiz sugli approfondimenti dei Domini 1 e 2

- [ ] Aggiungere almeno otto domande originali, una per ciascun tema: steganografia, PE/PA/PEP, key agreement e chiavi effimere, reflected/stored XSS, CSRF rispetto a SSRF, furto di sessione, domain hijacking, elicitation rispetto a frode d'identità.

**Evidenza nel repository:** Gli argomenti sono previsti nelle attività 1–7 e 9; diversi compaiono soltanto come cenni, opzioni o spiegazioni nelle domande iniziali, non come competenza applicata nel contesto specifico. Non dedurre assenza dal solo mancato acronimo: verificare semanticamente il banco prima di aggiungere ogni quesito.

**Accettazione:** almeno quattro quesiti applicativi con scenari sintetici; ogni domanda si collega alla definizione completata e a un obiettivo principale, con distrattori motivati. Non ripetere il riconoscimento generale di social engineering della PBQ 301.

### 29. Quiz su rete, cloud e autenticazione

- [ ] Aggiungere almeno otto domande originali: due su limiti PMF/jamming e suite Wi-Fi, due su EAP/validazione del server, due su terminazione TLS e segmenti protetti, due sulla scelta motivata fra SD-WAN/SASE/CASB/SWG.

**Evidenza nel repository:** Esistono domande di riconoscimento dei protocolli e architetture, ma non coprono tutte le distinzioni approfondite nelle attività 5, 8, 11, 25 e 26.

**Accettazione:** dipendenze completate prima dei quesiti; le nuove domande chiedono di applicare le condizioni del caso, senza trasformare un acronimo aggiuntivo in un requisito ufficiale. Verificare la differenza rispetto al quesito Wi-Fi 40199 e al quesito SD-WAN 30540.

### 30. Quiz su IAM, hardening e responsabilità normative

- [ ] Aggiungere almeno otto domande originali: due su SAML/OAuth/OIDC, due su SELinux/MAC/UAC, due su EOL/EOSL e supporto esteso, due su ambito e distinzione legge/standard di SOX/GLBA/HIPAA/PCI DSS.

**Evidenza nel repository:** I quesiti esistenti, fra cui 40218 su SAML, non esauriscono le distinzioni delle attività 12–14 e 24. Per le norme, evitare quesiti mnemonici su sanzioni storiche.

**Accettazione:** gli otto quesiti verificano decisioni e concetti distinti; OAuth resta autorizzazione delegata, UAC non diventa sandbox, la cessazione del supporto dipende dalla policy dichiarata. Fonti primarie normative controllate alla data di implementazione. Nessuna domanda aggiunta prima del materiale didattico necessario a risolverla.

## Argomenti già coperti nelle spiegazioni

Il confronto non giustifica duplicare le spiegazioni dei seguenti contenuti già presenti. Alcuni vengono comunque ripresi nelle nuove PBQ, perché spiegazione teorica ed esercizio interattivo sono strumenti diversi:

- CIA/AAA, categorie e funzioni dei controlli, change management, hashing/salting, firme, TPM/HSM, formati dei certificati e tokenizzazione.
- Vettori e attori di minaccia, malware/fileless e living off the land, SQLi, buffer overflow, vulnerabilità cloud/supply chain e mitigazioni generali.
- Segmentazione, VPN/SASE, modelli cloud, disponibilità active/active e active/passive, backup, metriche di resilienza e alimentazione.
- Baseline, MDM/BYOD/COPE, SAST e fuzzing, scansioni, threat intelligence, SIEM, SPF/DKIM/DMARC, DLP/NAC, automazione e risposta agli incidenti.
- Ruoli sui dati, gestione del rischio, BIA, fornitori, accordi, audit, awareness e formazione.

La copertura esistente non esclude miglioramenti futuri; riutilizzare queste sezioni evitando duplicazioni. Non pianificare cataloghi di tool citati soltanto come esempi storici, statistiche incidentali, importi normativi datati o acronimi non pertinenti agli obiettivi. Le correzioni individuate sopra riguardano le formulazioni effettivamente riscontrate e i criteri di precisione tecnica da rispettare durante l'integrazione.
