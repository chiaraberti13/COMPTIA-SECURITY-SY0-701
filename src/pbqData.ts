/**
 * Original performance-based scenarios — Italian source of truth.
 *
 * Two scenarios for each of the five roadmap themes (ordering, matching, log
 * interpretation, incident response, control selection), plus firewall
 * segmentation, VPN paths, enterprise Wi-Fi and DMARC analysis, spread across
 * the five exam domains and tied to official SY0-701 objectives.
 *
 * Content rules (same as the rest of the study content, enforced by
 * tests/contentSafety.test.ts and tests/pbqData.test.ts):
 *   - the fictional company is «Kestrelia»; no real organisation is cast;
 *   - hostnames are reserved names (example.com / .test, RFC 2606 / 6761);
 *   - addresses are documentation or private ranges (203.0.113.0/24, 10.0.0.0/8);
 *   - no copy-and-paste command that disables a protection or destroys data;
 *   - every `id`, step id, prompt id and option id is stable and
 *     language-independent, so the English overlay (src/pbqData.en.ts) only
 *     carries text and the two languages stay structurally identical.
 *
 * Ids are grouped by theme (1xx ordering, 2xx incident, 3xx matching,
 * 4xx log, 5xx control) so a new scenario does not collide with an existing one.
 */
import type { Pbq } from "./pbq";

export const PBQ_SCENARIOS: Pbq[] = [
{
  "id": 306,
  "evidenceTable": {
  "caption": "Evidenze sintetiche dei finding A–D",
  "headers": [
    "Finding / CVE fittizia",
    "CVSS v3.1 Base",
    "Esposizione",
    "Sfruttamento noto",
    "Criticità",
    "Patch / evidenza"
  ],
  "rows": [
    [
      "A / CVE-2099-1001",
      "8.1",
      "Internet",
      "Sì",
      "Critico",
      "Patch supportata disponibile; confermato"
    ],
    [
      "B / CVE-2099-1002",
      "7.5",
      "Rete interna",
      "No",
      "Critico",
      "Non aggiornabile; confermato"
    ],
    [
      "C / CVE-2099-1003",
      "9.8",
      "Laboratorio isolato",
      "No",
      "Non critico",
      "Patch supportata disponibile; confermato"
    ],
    [
      "D / CVE-2099-1004",
      "9.1",
      "Servizio interno",
      "No",
      "Non critico",
      "Backport dichiarato; solo banner, da validare"
    ]
  ]
},
  "kind": "matching",
  "mechanic": "matching",
  "objective": "4.3",
  "relatedObjectives": [
    "2.5",
    "1.3"
  ],
  "domain": 4,
  "sources": [
    "firstCvss",
    "cisaKev",
    "tenableCredentialedChecks",
    "tenablePluginRules",
    "nist80040"
  ],
  "title": "Priorità dei finding e verifica della remediation",
  "scenario": "Kestrelia valuta quattro finding con CVSS v3.1 Base già fornito: non calcolare vettori né confrontare versioni diverse. Le CVE-2099-1001, CVE-2099-1002, CVE-2099-1003 e CVE-2099-1004 sono identificatori fittizi, non vulnerabilità reali né voci del catalogo CISA KEV. Anche lo sfruttamento noto è un dato sintetico fornito, non la prova di una compromissione locale. Policy interna: P1 = emergenza per vulnerabilità confermata su asset critico esposto a Internet e con sfruttamento noto; P2 = controllo compensativo urgente per asset critico raggiungibile dalla rete interna, non aggiornabile, senza sfruttamento noto; P3 = patch nella finestra approvata per asset non critico in laboratorio isolato, senza sfruttamento noto; V = validare prima un finding basato solo sul banner. P1, P2 e P3 sono priorità di questo esercizio, non scadenze CISA o una formula universale. Per i finding confermati, inventario e controlli autenticati sono riusciti. Per il finding D, il banner suggerisce una versione vulnerabile ma il fornitore dichiara una correzione backport: verifica ancora incompleta. Le azioni di verifica sono autorizzate e non distruttive. Guida D4, obiettivo 4.3; rimandi: CVSS, scansioni credentialed e controlli compensativi.",
  "prompt": "Abbina ogni finding alla priorità motivata, poi ogni evidenza successiva alla verifica necessaria. Le righe A–D riportano CVE, severità, esposizione, sfruttamento, criticità e patch. Alcune opzioni sono distrattori.",
  "prompts": [
    {
      "id": "p_finding_a",
      "text": "A | CVE-2099-1001 | CVSS v3.1 Base 8.1 | portale paghe critico esposto a Internet | sfruttamento noto: sì | vulnerabilità confermata | patch supportata disponibile.",
      "correctOptionId": "p1"
    },
    {
      "id": "p_finding_b",
      "text": "B | CVE-2099-1002 | CVSS v3.1 Base 7.5 | console critica raggiungibile dalla rete interna | sfruttamento noto: no | vulnerabilità confermata | nessuna patch supportata; aggiornamento non possibile.",
      "correctOptionId": "p2"
    },
    {
      "id": "p_finding_c",
      "text": "C | CVE-2099-1003 | CVSS v3.1 Base 9.8 | server non critico nel laboratorio isolato | sfruttamento noto: no | vulnerabilità confermata | patch supportata disponibile.",
      "correctOptionId": "p3"
    },
    {
      "id": "p_finding_d",
      "text": "D | CVE-2099-1004 | CVSS v3.1 Base 9.1 | servizio interno non critico | sfruttamento noto: no | finding solo da banner; fornitore dichiara backport | patch dichiarata installata, ancora da verificare.",
      "correctOptionId": "validate"
    },
    {
      "id": "p_patch_ticket",
      "text": "A: il ticket dichiara patch applicata. Nessun rescan o test funzionale è ancora stato eseguito. Quale verifica serve prima della chiusura?",
      "correctOptionId": "verify_patch"
    },
    {
      "id": "p_failed_scan",
      "text": "C: il rescan non mostra finding, ma l’output indica fallimento dei controlli autenticati. La patch è verificata?",
      "correctOptionId": "repeat_scan"
    },
    {
      "id": "p_compensation",
      "text": "B: segmentazione e allowlist installate. Quale evidenza verifica la compensazione senza fingere che la vulnerabilità sia rimossa?",
      "correctOptionId": "verify_control"
    },
    {
      "id": "p_backport",
      "text": "D: inventario autenticato e advisory del fornitore ora confermano il pacchetto corretto tramite backport; il plugin usava solo il vecchio banner. Quale trattamento è giustificato?",
      "correctOptionId": "record_false_positive"
    }
  ],
  "options": [
    {
      "id": "p1",
      "text": "P1: contenimento immediato e patch approvata; criticità, esposizione Internet e sfruttamento noto prevalgono sul solo punteggio."
    },
    {
      "id": "p2",
      "text": "P2: compensazione urgente, monitoraggio e piano di sostituzione; asset critico interno non aggiornabile."
    },
    {
      "id": "p3",
      "text": "P3: patch nella finestra approvata; laboratorio isolato non critico, senza sfruttamento noto."
    },
    {
      "id": "validate",
      "text": "V: validare con inventario autenticato, advisory del fornitore e output del plugin; possibile falso positivo da backport."
    },
    {
      "id": "verify_patch",
      "text": "Rescan autenticato riuscito con plugin aggiornati, versione corretta in esecuzione e test funzionali; documentare l’efficacia prima della chiusura."
    },
    {
      "id": "repeat_scan",
      "text": "Ripristinare l’autenticazione e ripetere i controlli pertinenti: assenza di finding con controlli falliti non dimostra la correzione."
    },
    {
      "id": "verify_control",
      "text": "Test autorizzati dei percorsi bloccati e consentiti, evidenze nei log e riesame del rischio residuo; vulnerabilità ancora presente."
    },
    {
      "id": "record_false_positive",
      "text": "Registrare falso positivo con pacchetto, advisory, output e motivazione verificati; eventuale eccezione circoscritta e riesaminabile."
    },
    {
      "id": "score_only",
      "text": "Trattare C prima di A soltanto perché 9.8 è maggiore di 8.1."
    },
    {
      "id": "ticket_closes",
      "text": "Chiudere A perché il ticket di installazione basta a dimostrare la remediation."
    },
    {
      "id": "hide_plugin",
      "text": "Nascondere il plugin e dichiarare il sistema corretto senza altre evidenze."
    },
    {
      "id": "compensation_fixes",
      "text": "Chiudere B come software corretto perché la segmentazione elimina la vulnerabilità."
    }
  ],
  "explanation": "A → P1: esposizione Internet, criticità e sfruttamento noto rendono urgente il portale anche se 8.1 è inferiore a 9.8. Contieni l’esposizione e applica la patch approvata con gestione della modifica; sfruttamento noto non significa automaticamente incidente locale. B → P2: la patch non è disponibile; limita i percorsi di accesso alla console mediante segmentazione e allowlist, monitora e assegna un responsabile al rischio residuo e al piano di sostituzione. La compensazione riduce il rischio senza correggere il software. C → P3: 9.8 indica severità tecnica alta ma l’asset non critico è isolato e non ha sfruttamento noto; resta da aggiornare nella finestra prevista. D → V: un banner non dimostra vulnerabilità né falso positivo; confronta versione del pacchetto, advisory del fornitore e output del plugin con controlli autenticati. Solo dopo conferma del backport registra il falso positivo con evidenze. Il ticket di patch non basta: rescan con plugin aggiornati e credenziali riuscite, controllo della versione effettiva e test funzionali. Un rescan senza finding ma con autenticazione fallita è inconcludente. Per B verifica che i percorsi vietati siano bloccati e quelli necessari funzionino; conserva monitoraggio e riesame del rischio residuo. Nascondere un plugin cambia il report, non risolve la vulnerabilità. Nessun exploit su sistemi esterni è richiesto."
},
{
  "id": 403,
  "kind": "log",
  "mechanic": "matching",
  "objective": "4.5",
  "relatedObjectives": [
    "2.2"
  ],
  "sources": [
    "rfc9989",
    "rfc7208",
    "rfc6376"
  ],
  "domain": 4,
  "title": "Intestazioni email e allineamento DMARC",
  "scenario": "Il gateway email di Kestrelia analizza sei messaggi sintetici. Gli estratti delle intestazioni From e DKIM e il MAIL FROM della sessione SMTP sono riportati in ogni riga; MAIL FROM è l’envelope sender, non il display name o un header From aggiuntivo. Il MAIL FROM non è vuoto e ogni messaggio ha un solo dominio From e una sola firma DKIM. SPF e DKIM sono già stati verificati dal gateway fidato: usa i risultati dichiarati, non un Authentication-Results inserito dal mittente. Non ci sono errori DNS o di sintassi, né altre firme o eccezioni locali da inferire. La policy indicata in ogni riga è quella effettiva per il dominio From. Per i casi relaxed, gli Organizational Domain già determinati sono example.com ed example.net: non occorre eseguire una ricerca DNS. aspf=s/adkim=s richiedono uguaglianza esatta dei domini; r indica relaxed alignment sullo stesso Organizational Domain. DMARC passa se almeno uno fra SPF valido e allineato oppure DKIM valido e allineato soddisfa il requisito. Valuta prima pass/fail; considera separatamente la disposizione richiesta da p e la scelta del destinatario. example.com ed example.net sono domini documentali. Obiettivo principale 4.5; collegamento 2.2.",
  "prompt": "Abbina ciascun estratto A–F al risultato DMARC con motivazione, poi valuta disposizione e limiti del pass. Alcune opzioni sono distrattori.",
  "prompts": [
    {
      "id": "p_message_a",
      "text": "A | From: alerts@example.com | MAIL FROM: bounce@mailer.example.net | SPF=pass | DKIM d=example.com, result=fail | p=reject; aspf=s; adkim=s",
      "correctOptionId": "fail_spf_unaligned"
    },
    {
      "id": "p_message_b",
      "text": "B | From: alerts@example.com | MAIL FROM: bounce@mailer.example.net | SPF=pass | DKIM d=example.com, result=pass | p=reject; aspf=s; adkim=s",
      "correctOptionId": "pass_dkim"
    },
    {
      "id": "p_message_c",
      "text": "C | From: alerts@example.com | MAIL FROM: bounce@example.com | SPF=fail | DKIM d=example.net, result=pass | p=reject; aspf=s; adkim=s",
      "correctOptionId": "fail_dkim_unaligned"
    },
    {
      "id": "p_message_d",
      "text": "D | From: notice@news.example.com | MAIL FROM: bounce@mailer.example.com | SPF=pass | DKIM d=example.net, result=fail | p=quarantine; aspf=r; adkim=r",
      "correctOptionId": "pass_relaxed_spf"
    },
    {
      "id": "p_message_e",
      "text": "E | From: notice@news.example.com | MAIL FROM: bounce@mailer.example.com | SPF=pass | DKIM d=sign.example.com, result=pass | p=reject; aspf=s; adkim=s",
      "correctOptionId": "fail_strict"
    },
    {
      "id": "p_message_f",
      "text": "F | From: notice@news.example.com | MAIL FROM: bounce@news.example.com | SPF=pass | DKIM d=example.net, result=fail | p=reject; aspf=s; adkim=s",
      "correctOptionId": "pass_strict_spf"
    },
    {
      "id": "p_disposition",
      "text": "Per A, distinguere il risultato DMARC dalla disposizione richiesta dalla policy p=reject.",
      "correctOptionId": "reject_request"
    },
    {
      "id": "p_limits",
      "text": "Per B, stabilire cosa prova DMARC=pass e cosa non garantisce sul contenuto e sulla consegna.",
      "correctOptionId": "pass_not_safety"
    }
  ],
  "options": [
    {
      "id": "fail_spf_unaligned",
      "text": "DMARC=fail: SPF è valido ma non allineato; la firma DKIM allineata non è valida."
    },
    {
      "id": "pass_dkim",
      "text": "DMARC=pass tramite DKIM valido e allineato esattamente al dominio From; SPF non è allineato."
    },
    {
      "id": "fail_dkim_unaligned",
      "text": "DMARC=fail: DKIM è valido ma non allineato; il dominio MAIL FROM coincide, ma SPF fallisce."
    },
    {
      "id": "pass_relaxed_spf",
      "text": "DMARC=pass tramite SPF valido e relaxed alignment: i domini condividono example.com come Organizational Domain."
    },
    {
      "id": "fail_strict",
      "text": "DMARC=fail: entrambi i controlli sono validi, ma nessun dominio coincide esattamente con news.example.com come richiesto da strict alignment."
    },
    {
      "id": "pass_strict_spf",
      "text": "DMARC=pass tramite SPF valido con dominio MAIL FROM identico al dominio From; DKIM fallisce."
    },
    {
      "id": "reject_request",
      "text": "A resta DMARC=fail; p=reject richiede il rifiuto, ma la decisione finale dipende dalla policy locale del destinatario."
    },
    {
      "id": "pass_not_safety",
      "text": "B valida l’uso autorizzato del dominio From; non certifica contenuti innocui né garantisce consegna o esclusione dei filtri antispam."
    },
    {
      "id": "spf_always_pass",
      "text": "DMARC=pass ogni volta che SPF=pass, indipendentemente dal dominio From."
    },
    {
      "id": "both_required",
      "text": "DMARC=fail se uno tra SPF e DKIM fallisce: entrambi devono essere validi e allineati."
    },
    {
      "id": "related_is_strict",
      "text": "Strict alignment accetta qualsiasi sottodominio con lo stesso Organizational Domain."
    },
    {
      "id": "guaranteed_reject",
      "text": "DMARC=fail con p=reject garantisce che ogni destinatario rifiuti il messaggio."
    },
    {
      "id": "guaranteed_safe",
      "text": "DMARC=pass garantisce che il messaggio sia innocuo e venga consegnato."
    }
  ],
  "explanation": "A. SPF=pass autentica mailer.example.net, non allineato a example.com; DKIM d=example.com coincide ma result=fail non autentica quell’identificatore. Quindi DMARC=fail. B. DKIM d=example.com è valido e allineato strict: basta questo per DMARC=pass, anche con SPF valido ma non allineato. C. DKIM d=example.net è valido ma non allineato; SPF=fail non diventa valido perché MAIL FROM coincide con From. Quindi DMARC=fail. D. news.example.com e mailer.example.com condividono l’Organizational Domain dichiarato example.com: SPF=pass soddisfa relaxed alignment e DMARC=pass, anche con DKIM=fail. E. mailer.example.com e sign.example.com non sono uguali a news.example.com: strict alignment fallisce per entrambi, anche se i due controlli sono pass. Quindi DMARC=fail. F. MAIL FROM e From hanno lo stesso dominio news.example.com e SPF=pass: DMARC=pass anche con DKIM=fail. Disposizione: p=reject per A richiede rifiuto sui fallimenti DMARC; p=quarantine richiede trattamento sospetto e p=none non richiede una disposizione DMARC. Queste preferenze non cambiano pass/fail e non garantiscono l’azione di ogni destinatario: la policy locale può accettare un fail o filtrare un pass. Limiti: il pass di B valida l’uso del dominio From, non l’identità personale del mittente o l’assenza di malware. I distrattori ignorano l’allineamento, impongono erroneamente entrambi i meccanismi, scambiano relaxed e strict o garantiscono rifiuto/consegna. SPF riguarda il dominio dell’envelope sender in questi casi; DKIM riguarda il dominio d= della firma, non il solo nome visibile. Fonti: RFC 9989 (DMARC, sostituisce RFC 7489), RFC 7208 (SPF) e RFC 6376 (DKIM), verificate il 2026-10-08. Ogni abbinamento vale un punto diagnostico; la PBQ di studio richiede tutti e 8 corretti, senza riprodurre lo scoring proprietario CompTIA."
},
{
  "id": 305,
  "kind": "matching",
  "mechanic": "matching",
  "objective": "4.1",
  "relatedObjectives": [
    "3.2"
  ],
  "sources": [
    "ieee8021x",
    "rfc3748",
    "rfc9190",
    "rfc5281",
    "microsoftPeap"
  ],
  "domain": 4,
  "title": "Wi-Fi enterprise e ruoli 802.1X",
  "scenario": "Kestrelia usa Wi-Fi enterprise con 802.1X. Topologia testuale: software del portatile (supplicant) ↔ access point in pass-through (authenticator), mediante EAPOL; access point ↔ backend RADIUS/EAP 10.30.0.10 (authentication server), mediante RADIUS. Il backend termina i metodi EAP; l’access point non è il server EAP in questo caso. Identità server attesa: radius.kestrelia.test; CA e nome attesi sono distribuiti nel profilo gestito. Tutti i dati sono sintetici. Profilo A: client e server supportano EAP-TLS 1.3, certificati individuali e chiavi private protette; si richiede autenticazione reciproca con certificati senza password interna. Profilo B: client e backend consentono soltanto PEAP con EAP-MSCHAPv2 interno, password utente e nessun certificato client o token. Profilo C: backend compatibile con PAP non-EAP nel tunnel e client con solo EAP-TTLS per quel profilo; nessun certificato client. I profili B/C sono casi didattici di interoperabilità, non una graduatoria di sicurezza o un consiglio di usare metodi legacy. Le credenziali interne vengono inviate solo dopo la validazione del server. Il certificato server non è un fattore dell’utente. Obiettivo principale 4.1; collegamento 3.2.",
  "prompt": "Abbina componenti, profili e decisioni alle opzioni corrette. Usa il supporto dichiarato per distinguere i metodi; alcune opzioni sono distrattori.",
  "prompts": [
    {
      "id": "p_supplicant",
      "text": "Assegnare il ruolo supplicant al componente che richiede accesso e partecipa al metodo EAP.",
      "correctOptionId": "client"
    },
    {
      "id": "p_authenticator",
      "text": "Assegnare il ruolo authenticator al componente che controlla l’accesso e inoltra EAP al backend.",
      "correctOptionId": "ap"
    },
    {
      "id": "p_auth_server",
      "text": "Assegnare il ruolo authentication server al componente che termina il metodo EAP e verifica le credenziali.",
      "correctOptionId": "server"
    },
    {
      "id": "p_eap_tls",
      "text": "Scegliere il metodo del profilo A: certificato client individuale, prova della chiave privata e autenticazione reciproca con certificati, senza password interna.",
      "correctOptionId": "eap_tls"
    },
    {
      "id": "p_peap",
      "text": "Scegliere il metodo del profilo B: PEAP con EAP-MSCHAPv2 interno, unico profilo consentito da questi client e dal backend; nessun certificato client.",
      "correctOptionId": "peap_mschap"
    },
    {
      "id": "p_ttls",
      "text": "Scegliere il metodo del profilo C: autenticazione PAP non-EAP dentro il tunnel TLS, supportata solo dal profilo EAP-TTLS dichiarato.",
      "correctOptionId": "ttls_pap"
    },
    {
      "id": "p_server_validation",
      "text": "Prima di inviare credenziali nel tunnel B/C, decidere come validare il server e gestire un certificato inatteso.",
      "correctOptionId": "validate_server"
    },
    {
      "id": "p_radius",
      "text": "Identificare il ruolo di RADIUS nel collegamento access point → backend, senza confonderlo con EAP-TLS/PEAP/EAP-TTLS.",
      "correctOptionId": "radius_transport"
    },
    {
      "id": "p_factors",
      "text": "Contare i fattori del personale nel profilo B: password utente e certificato del server, senza token o altro fattore utente.",
      "correctOptionId": "one_factor"
    }
  ],
  "options": [
    {
      "id": "client",
      "text": "Supplicant: software 802.1X del portatile gestito di Kestrelia."
    },
    {
      "id": "ap",
      "text": "Authenticator: access point in pass-through; controlla l’accesso e inoltra EAP tramite RADIUS."
    },
    {
      "id": "server",
      "text": "Authentication server: backend RADIUS/EAP 10.30.0.10; termina EAP e autentica il client."
    },
    {
      "id": "eap_tls",
      "text": "EAP-TLS: certificati client e server, con validazione delle identità e prova delle chiavi private."
    },
    {
      "id": "peap_mschap",
      "text": "PEAP con EAP-MSCHAPv2 interno: server autenticato tramite certificato, client tramite credenziali nel tunnel TLS."
    },
    {
      "id": "ttls_pap",
      "text": "EAP-TTLS con PAP interno non-EAP: certificato server validato e credenziali client inviate soltanto nel tunnel TLS."
    },
    {
      "id": "validate_server",
      "text": "Profilo distribuito: CA attesa e identità radius.kestrelia.test, catena e validità verificate; rifiutare server inattesi senza approvazione interattiva."
    },
    {
      "id": "radius_transport",
      "text": "RADIUS trasporta EAP e informazioni AAA fra access point e backend; il metodo EAP è una scelta distinta."
    },
    {
      "id": "one_factor",
      "text": "Un fattore utente: la password. Il certificato server autentica il server, non è un secondo fattore del personale."
    },
    {
      "id": "swapped_roles",
      "text": "Supplicant: server RADIUS; authenticator: portatile; authentication server: access point."
    },
    {
      "id": "radius_method",
      "text": "RADIUS è il metodo EAP che sostituisce EAP-TLS, PEAP ed EAP-TTLS."
    },
    {
      "id": "accept_any",
      "text": "Accettare qualsiasi certificato server: la presenza del tunnel TLS basta a identificare il server."
    },
    {
      "id": "two_factors",
      "text": "Due fattori utente: password del personale più certificato del server."
    }
  ],
  "explanation": "1. Supplicant: il software del portatile partecipa ad EAP e presenta le credenziali. 2. Authenticator: l’access point controlla l’accesso e inoltra i messaggi; in questo caso non termina il metodo EAP. 3. Authentication server: il backend RADIUS/EAP verifica le credenziali e restituisce la decisione che l’access point applica. 4. A: EAP-TLS soddisfa l’autenticazione reciproca con certificati e prova delle chiavi private; per TLS 1.3 il riferimento è RFC 9190. 5. B: PEAP/EAP-MSCHAPv2 è determinato dal profilo consentito. PEAP può supportare altri metodi interni, incluso EAP-TLS: non significa sempre password. 6. C: EAP-TTLS può trasportare PAP non-EAP nel tunnel; il supporto dichiarato rende questa la scelta corretta. TTLS non significa sempre PAP e può usare anche metodi EAP interni. 7. Validazione: fidarsi soltanto del certificato presente non basta; verificare catena, CA attesa, validità e identità del server atteso, con profilo distribuito e senza accettare manualmente server inattesi. Applicare anche la policy di revoca prevista dall’implementazione e custodire la chiave privata del client. 8. RADIUS: è il protocollo AAA fra access point e backend, con trasporto dei messaggi EAP; EAPOL copre il tratto client/access point. RADIUS non è un metodo EAP e da solo non garantisce cifratura di tutto il traffico. 9. Fattori: in B la password è un solo fattore utente; il certificato server autentica un’altra parte e non trasforma la password in MFA. I distrattori scambiano i ruoli, confondono RADIUS con EAP, omettono la validazione o contano un falso secondo fattore. 802.1X regola l’accesso: non garantisce da solo protezione da jamming o da ogni AP malevolo. Fonti: IEEE 802.1X, RFC 3748, RFC 9190, RFC 5281 e Microsoft PEAP, verificate il 2026-10-08. Ogni abbinamento vale un punto diagnostico; questa PBQ di studio richiede tutti e 9 corretti, senza riprodurre lo scoring proprietario CompTIA."
},
{
  "id": 304,
  "kind": "matching",
  "mechanic": "matching",
  "objective": "3.2",
  "relatedObjectives": [
    "1.4",
    "4.6"
  ],
  "sources": [
    "rfc4301",
    "rfc7296",
    "netgateOpenvpnMode"
  ],
  "domain": 3,
  "title": "Percorso VPN e protezione dei due siti",
  "scenario": "Kestrelia collega sito A (rete 10.10.0.0/24, gateway A pubblico 203.0.113.10) e sito B (rete 10.20.0.0/24, gateway B pubblico 198.51.100.20, server B 10.20.0.20). Topologia testuale: portatile remoto → Internet → gateway A → rete A; rete A → gateway A → Internet → gateway B → rete B/server B. Dati sintetici. Il portatile gestito dispone solo del profilo OpenVPN TLS di accesso remoto verso A, con certificato client individuale, credenziali e MFA tramite backend già configurato. Il client deve validare certificato e identità del server VPN. Per il collegamento intersede è richiesto IKEv2/IPsec ESP con cifratura e integrità, certificati dei gateway e traffic selector 10.10.0.0/24 ↔ 10.20.0.0/24. Gli host interni non terminano IPsec; non sono previsti altri tunnel IP-in-IP. Il server B offre HTTPS e termina TLS sul server stesso. Considera separatamente ciascun collegamento: il profilo remoto non include l’inoltro verso B. La VPN termina sul gateway; non presumere protezione crittografica oltre quel punto o per traffico escluso dai selector. Obiettivo 3.2; collegamenti 1.4 e 4.6.",
  "prompt": "Abbina requisiti, collegamenti e confini di protezione alla soluzione corretta. Usa i profili e le premesse dichiarati; alcune opzioni sono distrattori.",
  "prompts": [
    {
      "id": "p_remote",
      "text": "Collegare il portatile del personale al gateway A con il profilo remoto disponibile.",
      "correctOptionId": "remote_tls"
    },
    {
      "id": "p_sites",
      "text": "Collegare le reti A e B usando i due gateway e il profilo intersede richiesto.",
      "correctOptionId": "site_ipsec"
    },
    {
      "id": "p_mode",
      "text": "Scegliere la modalità ESP per trasportare il pacchetto originale fra host delle due reti, non terminare IPsec sugli host.",
      "correctOptionId": "esp_tunnel"
    },
    {
      "id": "p_boundary",
      "text": "Proteggere anche il tratto gateway B → server B: il server è oltre la terminazione VPN e offre HTTPS.",
      "correctOptionId": "beyond_gateway"
    },
    {
      "id": "p_remote_auth",
      "text": "Autenticare entrambe le parti e applicare la policy del personale nel profilo remoto dichiarato.",
      "correctOptionId": "remote_auth"
    },
    {
      "id": "p_peer_auth",
      "text": "Autenticare reciprocamente i gateway A e B nel profilo IKEv2 dichiarato.",
      "correctOptionId": "ike_auth"
    },
    {
      "id": "p_scope",
      "text": "Definire quali flussi A/B sono coperti dal collegamento IPsec e quali accessi sono autorizzati.",
      "correctOptionId": "selected_traffic"
    }
  ],
  "options": [
    {
      "id": "remote_tls",
      "text": "OpenVPN TLS: portatile → gateway A; la protezione VPN termina sul gateway A."
    },
    {
      "id": "site_ipsec",
      "text": "IPsec ESP con cifratura e integrità, negoziato tramite IKEv2: gateway A ↔ gateway B."
    },
    {
      "id": "esp_tunnel",
      "text": "Tunnel mode: pacchetto IP interno protetto da ESP e nuovo header IP esterno con indirizzi dei gateway."
    },
    {
      "id": "beyond_gateway",
      "text": "HTTPS con TLS fra client e server B, validando il certificato del server; mantenere segmentazione e policy dopo il gateway."
    },
    {
      "id": "remote_auth",
      "text": "Validare certificato e identità del server VPN; certificato client individuale più credenziali utente e MFA tramite il backend configurato."
    },
    {
      "id": "ike_auth",
      "text": "IKEv2 con certificati dei gateway: validare catena e identità del peer e verificare la prova della chiave privata; non è autenticazione del personale."
    },
    {
      "id": "selected_traffic",
      "text": "Policy IPsec e traffic selector per 10.10.0.0/24 ↔ 10.20.0.0/24; routing e regole firewall per gli accessi consentiti."
    },
    {
      "id": "transport",
      "text": "Transport mode ESP fra gateway: protegge automaticamente tutto il pacchetto originale fra le reti."
    },
    {
      "id": "all_segments",
      "text": "La VPN protegge automaticamente anche ogni segmento dopo il gateway e ogni destinazione Internet."
    },
    {
      "id": "no_validation",
      "text": "Non validare il certificato del server VPN, perché il tunnel è cifrato."
    },
    {
      "id": "remote_always_tls",
      "text": "Qualsiasi accesso remoto usa sempre TLS: IPsec non può collegare un portatile a un gateway."
    }
  ],
  "explanation": "1. Remoto: OpenVPN TLS collega il portatile ad A perché questo è il profilo disponibile, non perché ogni VPN remota usi TLS. Anche IPsec può fornire accesso remoto. 2. Intersede: IKEv2 negozia e autentica le associazioni; ESP con cifratura e integrità protegge i dati fra gateway A e B. 3. Modalità: tunnel mode incapsula il pacchetto originale, incluso il suo header IP interno, e aggiunge un header esterno per i gateway. Con ESP l’header esterno non è cifrato. Transport mode protegge il payload del pacchetto IP, non incapsula da solo l’intero pacchetto originale: non è intercambiabile in questa topologia gateway-to-gateway per host dietro i gateway, senza un ulteriore tunnel. Non è una regola universale che vieti transport mode ai gateway quando agiscono da host. 4. Confine: dopo la decapsulazione il tratto verso server B non è protetto da quella VPN; HTTPS client/server conserva TLS fino al server, ma non protegge ogni altro flusso. Restano necessari segmentazione e autorizzazioni. 5. Remoto/autenticazione: la validazione del server evita di affidarsi a un gateway falso; il profilo impone certificato client, credenziali e MFA del personale, senza contare il certificato server come fattore utente. 6. IKEv2/autenticazione: i certificati e la prova della chiave privata autenticano i peer gateway; non sostituiscono l’identità degli utenti. 7. Ambito: selector, policy, routing e firewall delimitano i flussi protetti e consentiti; un tunnel non autorizza automaticamente tutto. I distrattori confondono transport/tunnel, estendono la protezione oltre i gateway, omettono la validazione del server o dichiarano erroneamente che il remoto usa sempre TLS. Fonti: RFC 4301, RFC 7296 e Netgate OpenVPN Mode Configuration, verificate il 2026-10-08. Ogni abbinamento vale un punto diagnostico; questa PBQ di studio richiede tutti e 7 corretti, senza riprodurre lo scoring proprietario CompTIA."
},
  {
    "id": 303,
    "kind": "matching",
    "mechanic": "matching",
    "objective": "4.5",
    "relatedObjectives": [
      "2.5",
      "3.2"
    ],
    "sources": [
      "netgateRuleMethodology",
      "netgateFirewallFundamentals"
    ],
    "domain": 4,
    "title": "Regole firewall e segmentazione",
    "scenario": "Kestrelia usa un firewall pfSense stateful con interfacce Internet (WAN), screened subnet pubblica instradata 203.0.113.0/24 (proxy 203.0.113.10), applicazioni 10.0.20.0/24 (API 10.0.20.10) e gestione 10.0.30.0/24 (bastion 10.0.30.50; firewall 10.0.30.1). I dati sono sintetici. Le regole di ciascuna interfaccia filtrano le nuove connessioni in ingresso su quell’interfaccia, dall’alto verso il basso: vince la prima corrispondenza. Non ci sono altre regole floating, di gruppo o automatiche che autorizzino questi flussi; la tabella degli stati è inizialmente vuota. Il traffico di risposta di una connessione autorizzata usa lo stato; una nuova connessione inversa non è una risposta. Tutto ciò che non corrisponde è bloccato dal deny implicito. Sulla screened subnet la bozza contiene, in ordine: R0 PASS qualsiasi sorgente 203.0.113.0/24 verso qualsiasi destinazione 10.0.20.0/24, qualsiasi protocollo/porta; R1 PASS proxy verso API TCP/8443; R2 BLOCK screened subnet verso applicazioni. Le porte indicate sono di destinazione; le porte sorgente restano effimere. Non serve NAT nella topologia instradata. Obiettivo principale 4.5; collegamenti 2.5 e 3.2.",
    "prompt": "Abbina ogni requisito alla regola o alla decisione corretta. Usa le premesse dichiarate e le opzioni più restrittive; alcune opzioni sono distrattori.",
    "prompts": [
      {
        "id": "p_public_https",
        "text": "Consentire da Internet solo HTTPS al proxy pubblicato.",
        "correctOptionId": "wan_https"
      },
      {
        "id": "p_proxy_api",
        "text": "Consentire al solo proxy di iniziare connessioni verso la sola API su TCP/8443.",
        "correctOptionId": "dmz_api"
      },
      {
        "id": "p_admin_ssh",
        "text": "Consentire al solo bastion la gestione SSH di proxy e API.",
        "correctOptionId": "mgmt_ssh"
      },
      {
        "id": "p_firewall_gui",
        "text": "Consentire al solo bastion l’accesso HTTPS alla GUI del firewall su 10.0.30.1.",
        "correctOptionId": "mgmt_gui"
      },
      {
        "id": "p_shadowed",
        "text": "Correggere R0/R1/R2: la bozza deve consentire solo proxy → API TCP/8443; R2 oggi non blocca i flussi coperti da R0.",
        "correctOptionId": "remove_broad"
      },
      {
        "id": "p_reply",
        "text": "Gestire la risposta API → proxy per una connessione TCP/8443 già autorizzata.",
        "correctOptionId": "state_reply"
      },
      {
        "id": "p_unmatched",
        "text": "Decidere l’esito di una nuova connessione API → bastion TCP/22 non coperta dalle regole consentite.",
        "correctOptionId": "implicit_deny"
      }
    ],
    "options": [
      {
        "id": "wan_https",
        "text": "WAN | qualsiasi → 203.0.113.10 | TCP/443 | PASS"
      },
      {
        "id": "dmz_api",
        "text": "screened subnet | 203.0.113.10 → 10.0.20.10 | TCP/8443 | PASS"
      },
      {
        "id": "mgmt_ssh",
        "text": "gestione | 10.0.30.50 → {203.0.113.10, 10.0.20.10} | TCP/22 | PASS"
      },
      {
        "id": "mgmt_gui",
        "text": "gestione | 10.0.30.50 → 10.0.30.1 | TCP/443 | PASS"
      },
      {
        "id": "remove_broad",
        "text": "Rimuovere R0 troppo ampia; mantenere R1 specifica prima di R2, che blocca gli altri flussi."
      },
      {
        "id": "state_reply",
        "text": "Usare lo stato esistente; non aggiungere una regola inversa per nuove connessioni."
      },
      {
        "id": "implicit_deny",
        "text": "BLOCK per deny implicito: è una nuova connessione senza autorizzazione."
      },
      {
        "id": "wide_dmz",
        "text": "screened subnet | 203.0.113.0/24 → 10.0.20.0/24 | qualsiasi protocollo/porta | PASS"
      },
      {
        "id": "internet_admin",
        "text": "WAN | qualsiasi → {203.0.113.10, 10.0.20.10} | TCP/22 | PASS"
      },
      {
        "id": "late_block",
        "text": "Lasciare R0 e R1 invariate; spostare R2 ancora più in basso."
      },
      {
        "id": "nat_only",
        "text": "Configurare solo NAT senza verificare le regole firewall."
      }
    ],
    "explanation": "1. WAN/HTTPS: la regola consente solo la destinazione proxy e TCP/443, non l’intera screened subnet. 2. Proxy/API: la regola sulla screened subnet limita sorgente, destinazione e TCP/8443. 3. Bastion/SSH: il traffico nasce in gestione, quindi la regola consente TCP/22 dal solo 10.0.30.50 ai due host indicati. 4. Bastion/GUI: TCP/443 dal solo bastion all’indirizzo di gestione del firewall conserva l’accesso amministrativo autorizzato. 5. R0: il PASS ampio precede R1 e R2; ogni flusso che corrisponde a R0 è già consentito. Rimuovere R0 rende efficace R1 prima del BLOCK R2; spostare R2 più in basso non cambia il problema. 6. Risposta: lo stato della connessione proxy/API consente il ritorno; una regola inversa ampia autorizzerebbe anche nuove connessioni non richieste. 7. API/bastion: una nuova connessione TCP/22 non è una risposta e incontra il deny implicito. I distrattori aprono tutte le porte fra subnet, espongono SSH a Internet, lasciano la regola mascherante o scambiano NAT per controllo degli accessi. NAT traduce indirizzi: non sostituisce una policy firewall. Questa è una topologia instradata; altre installazioni possono usare NAT e regole automatiche, escluse esplicitamente dalle premesse. Verificare i flussi consentiti e negati, anche la gestione, prima del rilascio. Fonti: Netgate pfSense Rule Methodology e Firewall Fundamentals, verificate il 2026-10-08. Ogni abbinamento vale un punto diagnostico; nello studio questa PBQ è superata solo con tutti e 7 corretti, senza riprodurre lo scoring proprietario dell’esame."
  },
  /* ---------------- Ordering (ordinamento) ---------------- */
  {
    id: 101,
    kind: "ordering",
    mechanic: "ordering",
    objective: "1.4",
    domain: 1,
    title: "Ciclo di vita di un certificato TLS",
    scenario:
      "Kestrelia deve pubblicare il portale clienti su portale.example.com e ha bisogno di un certificato TLS rilasciato da una CA pubblica.",
    prompt:
      "Ordina le fasi del rilascio e dell'installazione del certificato, dalla prima all'ultima.",
    steps: [
      { id: "keypair", text: "Genera sul server la coppia di chiavi, tenendo privata la chiave privata." },
      { id: "csr", text: "Prepara la CSR con il nome a dominio e i dati dell'organizzazione." },
      { id: "validate", text: "La CA verifica il controllo del dominio e l'identità del richiedente." },
      { id: "issue", text: "La CA firma ed emette il certificato con la propria chiave privata." },
      { id: "install", text: "Installa sul server il certificato e la catena intermedia fino alla root." },
      { id: "renew", text: "Monitora la scadenza e pianifica il rinnovo prima che il certificato scada." },
    ],
    explanation:
      "La chiave privata nasce e resta sul server: non lascia mai la macchina, perciò si genera prima di tutto. La CSR trasporta la chiave pubblica e i dati; la CA valida il dominio e l'identità prima di firmare. Solo dopo l'emissione si installa il certificato con la catena intermedia, altrimenti i client non ricostruiscono la fiducia fino alla root. Il monitoraggio della scadenza chiude il ciclo: un certificato scaduto interrompe il servizio.",
  },
  {
    id: 102,
    kind: "ordering",
    mechanic: "ordering",
    objective: "1.3",
    domain: 1,
    title: "Processo di change management",
    scenario:
      "Un amministratore di Kestrelia deve aggiornare le regole del firewall perimetrale di un servizio in produzione.",
    prompt:
      "Ordina i passi del processo di gestione del cambiamento, come li verificherebbe un auditor.",
    steps: [
      { id: "request", text: "Apre una richiesta di cambiamento che descrive la modifica e la motivazione." },
      { id: "impact", text: "Analizza impatto e rischio, con il piano di ripristino (backout)." },
      { id: "approve", text: "Il Change Advisory Board approva la richiesta." },
      { id: "test", text: "Prova la modifica in un ambiente di staging." },
      { id: "implement", text: "Applica la modifica nella finestra di manutenzione concordata." },
      { id: "document", text: "Verifica l'esito, aggiorna la documentazione e chiude la richiesta." },
    ],
    explanation:
      "Il change management serve a rendere i cambiamenti tracciabili e reversibili. La richiesta formale viene prima di tutto; l'analisi di impatto e il piano di backout permettono l'approvazione informata del CAB. Si prova in staging prima di toccare la produzione, si applica nella finestra concordata e si chiude solo dopo aver verificato e documentato: senza documentazione aggiornata il controllo successivo non sa che cosa è cambiato.",
  },

  /* ---------------- Incident response (risposta a incidente) ---------------- */
  {
    id: 201,
    kind: "incident",
    mechanic: "ordering",
    objective: "4.8",
    domain: 4,
    title: "Ciclo di risposta agli incidenti (NIST SP 800-61)",
    scenario:
      "Il SOC di Kestrelia rileva un host interno (10.0.5.23) che comunica con un server di comando e controllo.",
    prompt:
      "Ordina le fasi del ciclo di risposta agli incidenti secondo NIST SP 800-61.",
    steps: [
      { id: "prep", text: "Preparazione: procedure, strumenti e contatti pronti prima dell'incidente." },
      { id: "detect", text: "Rilevamento e analisi: conferma l'incidente e ne stabilisce l'ambito." },
      { id: "contain", text: "Contenimento: isola l'host per fermare la diffusione." },
      { id: "eradicate", text: "Eradicazione: rimuove il malware e chiude la via d'accesso." },
      { id: "recover", text: "Recupero: ripristina i sistemi e verifica che siano puliti." },
      { id: "lessons", text: "Lezioni apprese: analisi a posteriori e miglioramento dei controlli." },
    ],
    explanation:
      "La preparazione precede l'incidente: strumenti e ruoli devono esistere prima. Rilevamento e analisi confermano che è un incidente reale e ne misurano l'ambito; solo allora ha senso contenere, perché contenere senza conoscere l'ambito lascia fuori altri host compromessi. Eradicazione e recupero vengono dopo il contenimento, e le lezioni apprese chiudono il ciclo alimentando di nuovo la preparazione.",
  },
  {
    id: 202,
    kind: "incident",
    mechanic: "ordering",
    objective: "4.8",
    domain: 4,
    title: "Ordine di volatilità nell'acquisizione forense",
    scenario:
      "Un portatile di Kestrelia è ancora acceso e viene sequestrato come prova. L'analista deve acquisire i dati prima di spegnerlo.",
    prompt:
      "Ordina le fonti dalla più volatile alla meno volatile, come impone l'ordine di volatilità.",
    steps: [
      { id: "cpu", text: "Registri e cache della CPU." },
      { id: "ram", text: "Memoria RAM e tabella dei processi." },
      { id: "net", text: "Stato della rete: connessioni attive e tabella ARP." },
      { id: "disk", text: "File temporanei e contenuto del disco." },
      { id: "logs", text: "Log remoti e di monitoraggio su altri sistemi." },
      { id: "archive", text: "Supporti di archiviazione e backup." },
    ],
    explanation:
      "L'ordine di volatilità impone di raccogliere prima ciò che svanisce prima. Registri e cache della CPU durano frazioni di secondo; la RAM e le connessioni di rete spariscono allo spegnimento; disco, log remoti e backup persistono. Acquisire il disco prima della RAM distruggerebbe prove che non tornano più. La catena di custodia accompagna ogni fase.",
  },

  /* ---------------- Matching (abbinamento) ---------------- */
  {
    id: 301,
    kind: "matching",
    mechanic: "matching",
    objective: "2.2",
    domain: 2,
    title: "Tecniche di ingegneria sociale",
    scenario:
      "Il team di sensibilizzazione di Kestrelia raccoglie quattro episodi segnalati dai dipendenti.",
    prompt:
      "Abbina ogni episodio alla tecnica di ingegneria sociale che lo descrive.",
    prompts: [
      { id: "p_ceo", text: "Una email che finge di venire dall'amministratore delegato chiede un bonifico urgente.", correctOptionId: "bec" },
      { id: "p_sms", text: "Un SMS invita a chiamare un numero per «sbloccare» il conto.", correctOptionId: "smishing" },
      { id: "p_usb", text: "Chiavette USB etichettate «Stipendi» vengono lasciate nel parcheggio.", correctOptionId: "baiting" },
      { id: "p_call", text: "Qualcuno telefona fingendosi dell'IT per farsi dettare la password.", correctOptionId: "vishing" },
    ],
    options: [
      { id: "bec", text: "Business email compromise (frode del CEO)" },
      { id: "smishing", text: "Smishing (phishing via SMS)" },
      { id: "baiting", text: "Baiting (esca con supporto fisico)" },
      { id: "vishing", text: "Vishing (phishing vocale)" },
      { id: "watering", text: "Watering hole (sito compromesso)" },
    ],
    explanation:
      "La frode del CEO sfrutta l'autorità e l'urgenza per ottenere un bonifico. Lo smishing arriva via SMS, il vishing per telefono: cambia il canale, non il raggiro. Il baiting usa un'esca fisica (la chiavetta) che fa leva sulla curiosità. Il watering hole, qui un distrattore, compromette un sito legittimo frequentato dalla vittima: nessun episodio lo descrive.",
  },
  {
    id: 302,
    kind: "matching",
    mechanic: "matching",
    objective: "5.2",
    domain: 5,
    title: "Strategie di risposta al rischio",
    scenario:
      "Il comitato rischi di Kestrelia decide come trattare quattro rischi identificati.",
    prompt:
      "Abbina ogni decisione alla strategia di risposta al rischio corrispondente.",
    prompts: [
      { id: "p_insurance", text: "Stipula una polizza cyber per coprire le perdite di un eventuale attacco.", correctOptionId: "transfer" },
      { id: "p_mfa", text: "Introduce l'autenticazione a più fattori per ridurre il rischio di furto credenziali.", correctOptionId: "mitigate" },
      { id: "p_drop", text: "Dismette un servizio legacy non più necessario e troppo esposto.", correctOptionId: "avoid" },
      { id: "p_accept", text: "Documenta e accetta un rischio basso il cui controllo costerebbe più del danno possibile.", correctOptionId: "accept" },
    ],
    options: [
      { id: "transfer", text: "Trasferimento" },
      { id: "mitigate", text: "Mitigazione (riduzione)" },
      { id: "avoid", text: "Evitare" },
      { id: "accept", text: "Accettazione" },
    ],
    explanation:
      "Trasferire sposta l'impatto economico a un terzo (l'assicuratore), ma non elimina il rischio. Mitigare riduce probabilità o impatto con un controllo, come l'MFA. Evitare elimina la fonte del rischio rinunciando all'attività. Accettare è una scelta consapevole e documentata quando il controllo costa più del danno atteso.",
  },

  /* ---------------- Log interpretation (interpretazione di log) ---------------- */
  {
    id: 401,
    kind: "log",
    mechanic: "matching",
    objective: "4.9",
    domain: 4,
    title: "Indizi negli estratti di log",
    scenario:
      "Durante un'indagine, l'analista di Kestrelia isola quattro estratti di log da sistemi diversi.",
    prompt:
      "Abbina ogni estratto all'attività che segnala.",
    prompts: [
      { id: "p_portscan", text: "Dallo stesso IP 203.0.113.45, connessioni SYN alle porte 21, 22, 23, 25, 80, 443, 3389 in due secondi.", correctOptionId: "scan" },
      { id: "p_sqli", text: "In un log web: GET /cerca?q=1' OR '1'='1 seguito da errori 500 del database.", correctOptionId: "sqli" },
      { id: "p_exfil", text: "Un host interno invia 4,5 GB verso 203.0.113.80 alle 03:12, fuori orario.", correctOptionId: "exfil" },
      { id: "p_brute", text: "180 tentativi di login falliti sullo stesso account in un minuto, poi uno riuscito.", correctOptionId: "brute" },
    ],
    options: [
      { id: "scan", text: "Scansione delle porte (ricognizione)" },
      { id: "sqli", text: "Tentativo di SQL injection" },
      { id: "exfil", text: "Esfiltrazione di dati" },
      { id: "brute", text: "Attacco a forza bruta sulle credenziali" },
      { id: "patch", text: "Aggiornamento di routine pianificato" },
    ],
    explanation:
      "Molte porte diverse contattate dallo stesso IP in pochi secondi sono una scansione. La stringa 1' OR '1'='1 con errori del database è la firma di una SQL injection. Un grande trasferimento in uscita fuori orario verso un indirizzo esterno è esfiltrazione. Tanti login falliti seguiti da uno riuscito indicano un attacco a forza bruta andato a segno. L'aggiornamento di routine è un distrattore: nessun estratto lo mostra.",
  },
  {
    id: 402,
    kind: "log",
    mechanic: "matching",
    objective: "2.4",
    domain: 2,
    title: "Analisi del log di autenticazione",
    scenario:
      "L'analista di Kestrelia esamina quattro righe del log di autenticazione per decidere quali indagare.",
    prompt:
      "Abbina ogni riga alla conclusione corretta.",
    prompts: [
      { id: "p_travel", text: "L'utente `mrossi` accede da Roma e, otto minuti dopo, da un IP in un altro continente.", correctOptionId: "travel" },
      { id: "p_spray", text: "La password «Primavera2026!» fallisce una volta su 300 account diversi, in sequenza.", correctOptionId: "spray" },
      { id: "p_normal", text: "L'utente `gbianchi` accede dal solito IP aziendale alle 09:02 di un giorno feriale.", correctOptionId: "normal" },
      { id: "p_disabled", text: "Ripetuti tentativi su un account disattivato di un dipendente che ha lasciato l'azienda.", correctOptionId: "disabled" },
    ],
    options: [
      { id: "travel", text: "Viaggio impossibile (credenziali compromesse)" },
      { id: "spray", text: "Password spraying" },
      { id: "normal", text: "Accesso legittimo di routine" },
      { id: "disabled", text: "Uso tentato di un account dismesso" },
    ],
    explanation:
      "Due accessi riusciti troppo distanti per il tempo trascorso sono un «viaggio impossibile»: segnala credenziali compromesse. Una sola password provata su molti account è password spraying, che aggira il blocco per tentativi falliti. L'accesso dal solito IP in orario d'ufficio è routine. I tentativi su un account disattivato di un ex dipendente vanno indagati: qualcuno sta cercando una via d'accesso rimasta aperta.",
  },

  /* ---------------- Control selection (scelta del controllo) ---------------- */
  {
    id: 501,
    kind: "control",
    mechanic: "matching",
    objective: "1.1",
    domain: 1,
    title: "Classificare i controlli di sicurezza",
    scenario:
      "Kestrelia cataloga i propri controlli per tipo, come richiede l'obiettivo 1.1.",
    prompt:
      "Abbina ogni controllo al tipo (per funzione) che lo descrive meglio.",
    prompts: [
      { id: "p_backup", text: "Backup che permettono di ripristinare i dati dopo un attacco ransomware.", correctOptionId: "corrective" },
      { id: "p_cam", text: "Telecamere di videosorveglianza che registrano gli ingressi.", correctOptionId: "detective" },
      { id: "p_lock", text: "Serratura che impedisce l'accesso al locale server.", correctOptionId: "preventive" },
      { id: "p_sign", text: "Cartello «Area videosorvegliata» che scoraggia gli intrusi.", correctOptionId: "deterrent" },
    ],
    options: [
      { id: "preventive", text: "Preventivo" },
      { id: "detective", text: "Investigativo (detective)" },
      { id: "corrective", text: "Correttivo" },
      { id: "deterrent", text: "Deterrente" },
      { id: "compensating", text: "Compensativo" },
    ],
    explanation:
      "Il tipo descrive la funzione del controllo. Un backup è correttivo: ripristina dopo l'evento. La telecamera che registra è investigativa: rileva e documenta, non impedisce. La serratura è preventiva: blocca l'accesso. Il cartello è deterrente: scoraggia senza impedire fisicamente. Il controllo compensativo, qui distrattore, sostituisce un controllo previsto quando non è attuabile.",
  },
  {
    id: 502,
    kind: "control",
    mechanic: "matching",
    objective: "3.3",
    domain: 3,
    title: "Scegliere il controllo per proteggere i dati",
    scenario:
      "Kestrelia deve proteggere i dati dei clienti in quattro situazioni diverse.",
    prompt:
      "Abbina ogni requisito al controllo più adatto.",
    prompts: [
      { id: "p_rest", text: "Rendere illeggibili i dati sui dischi dei portatili se vengono rubati.", correctOptionId: "atrest" },
      { id: "p_transit", text: "Proteggere i dati scambiati tra browser e portale durante il viaggio in rete.", correctOptionId: "tls" },
      { id: "p_test", text: "Usare dati realistici ma non reali nell'ambiente di test.", correctOptionId: "mask" },
      { id: "p_leak", text: "Impedire che documenti riservati vengano inviati fuori dall'azienda via email.", correctOptionId: "dlp" },
    ],
    options: [
      { id: "atrest", text: "Cifratura dei dati a riposo (disco)" },
      { id: "tls", text: "Cifratura in transito (TLS)" },
      { id: "mask", text: "Mascheramento dei dati" },
      { id: "dlp", text: "Data Loss Prevention (DLP)" },
      { id: "hash", text: "Hashing" },
    ],
    explanation:
      "La cifratura a riposo protegge i dati sul disco di un portatile rubato. La cifratura in transito (TLS) protegge i dati mentre viaggiano in rete. Il mascheramento sostituisce i valori reali con dati realistici ma fittizi negli ambienti non di produzione. Il DLP controlla i dati in uscita e blocca l'invio di documenti riservati. L'hashing, qui distrattore, è a senso unico e serve a verificare l'integrità o a conservare le password, non a proteggere dati che devono restare leggibili.",
  },
];
