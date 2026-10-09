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
  id: 308,
  kind: "matching",
  mechanic: "matching",
  objective: "5.2",
  domain: 5,
  sources: ["nist80030"],
  title: "Catena quantitativa del rischio: AV, EF, SLE e ALE",
  scenario: "Kestrelia stima un rischio con valori sintetici. Prima del controllo: valore dell'asset (AV) €800.000, fattore di esposizione (EF) 25% e tasso annuo di occorrenza (ARO) 0,4. Il controllo proposto costa €18.000 l'anno e, secondo la stima, riduce EF al 10% e ARO a 0,1. Calcola SLE = AV × EF e ALE = SLE × ARO. Le stime sono intervalli decisionali da riesaminare, non previsioni certe. Nessun rischio diretto per le persone è incluso nei valori monetari.",
  prompt: "Abbina dati, risultati e decisione motivata. Alcune opzioni sono distrattori.",
  evidenceTable: {
    caption: "Dati sintetici per la valutazione quantitativa",
    headers: ["Voce", "Prima del controllo", "Dopo il controllo proposto"],
    rows: [
      ["AV", "€800.000", "€800.000"],
      ["EF", "25% = 0,25", "10% = 0,10"],
      ["ARO", "0,4 eventi/anno", "0,1 eventi/anno"],
      ["Costo annuo controllo", "€0", "€18.000"],
    ],
  },
  prompts: [
    { id: "ef_before", text: "Conversione dell'EF iniziale del 25%", correctOptionId: "ef_025" },
    { id: "sle_before", text: "SLE prima del controllo", correctOptionId: "sle_200k" },
    { id: "ale_before", text: "ALE prima del controllo", correctOptionId: "ale_80k" },
    { id: "sle_after", text: "SLE dopo il controllo", correctOptionId: "sle_80k" },
    { id: "ale_after", text: "ALE residuo dopo il controllo", correctOptionId: "ale_8k" },
    { id: "benefit", text: "Riduzione annua attesa dell'ALE, prima del costo", correctOptionId: "benefit_72k" },
    { id: "net", text: "Beneficio annuo atteso netto del costo del controllo", correctOptionId: "net_54k" },
    { id: "treatment", text: "Trattamento e decisione motivata", correctOptionId: "mitigate_review" },
  ],
  options: [
    { id: "ef_025", text: "0,25" },
    { id: "sle_200k", text: "€200.000 per evento" },
    { id: "ale_80k", text: "€80.000 l'anno" },
    { id: "sle_80k", text: "€80.000 per evento" },
    { id: "ale_8k", text: "€8.000 l'anno" },
    { id: "benefit_72k", text: "€72.000 l'anno" },
    { id: "net_54k", text: "€54.000 l'anno" },
    { id: "mitigate_review", text: "Mitigare: il beneficio atteso supera il costo, ma validare assunzioni, rischio residuo, obblighi e impatti non monetizzati" },
    { id: "ef_25", text: "25" },
    { id: "ale_200k", text: "€200.000 l'anno" },
    { id: "net_72k", text: "€72.000 netti l'anno" },
    { id: "auto_accept", text: "Accettare automaticamente: il solo confronto economico decide ogni rischio" },
  ],
  explanation: "Il 25% diventa 0,25. Prima del controllo: SLE = €800.000 × 0,25 = €200.000 per evento; ALE = €200.000 × 0,4/anno = €80.000/anno. Dopo il controllo: SLE = €800.000 × 0,10 = €80.000 per evento; ALE residuo = €80.000 × 0,1/anno = €8.000/anno. La riduzione attesa è €80.000 − €8.000 = €72.000/anno; sottraendo €18.000/anno, il beneficio atteso netto è €54.000/anno. Il controllo mitiga frequenza e impatto stimati, non elimina il rischio. La convenienza sostiene la decisione, ma non sostituisce obblighi legali o contrattuali, tolleranza al rischio, sicurezza delle persone e analisi d'incertezza. AV, EF e ARO vanno documentati, verificati e riesaminati con scenari o intervalli.",
},
{
  "title": "BIA: scegliere il piano di recupero",
  "scenario": "Kestrelia perde il sito primario alle 12:00. La BIA definisce RTO come tempo obiettivo massimo fino al servizio nuovamente utilizzabile e RPO come intervallo massimo di dati perdibili. Tutti i tempi sono dello stesso giorno. Le prove includono attivazione, ripristino, dipendenze e verifica del servizio; la capacità indicata è sufficiente per il servizio assegnato. Scegli il piano con il minor costo relativo che soddisfa entrambi i limiti; i costi sono unità fittizie per servizio. La frequenza nominale non sostituisce il punto effettivamente recuperabile. Guida D3, obiettivo 3.4; BIA e gestione del rischio, obiettivo 5.2.",
  "prompt": "Abbina i tre servizi ai piani, poi interpreta i limiti e le evidenze. Alcune opzioni sono distrattori.",
  "explanation": "Pagamenti richiede RTO 30 minuti e RPO 5 minuti: solo A passa, con recupero in 20 minuti e perdita di 3 minuti. Ordini richiede RTO 120 minuti e RPO 30 minuti: A e B passano, ma B costa meno, con 90 minuti e 15 minuti. Archivio richiede RTO 480 minuti e RPO 120 minuti: A, B e C passano; C costa meno, con 360 minuti e 60 minuti. D perde solo 1 minuto ma impiega 600 minuti; E recupera in 10 minuti ma perde 180 minuti. RTO riguarda il tempo di recupero del servizio, RPO il punto dei dati. La perdita è 12:00 meno ultimo punto recuperabile, non la frequenza dichiarata. Nel piano A la replica può propagare cancellazioni: le copie versionate isolate con conservazione e prove di ripristino sono una protezione distinta. Hot/warm/cold descrivono dotazioni, non garantiscono tempi: valgono capacità e misure fornite, da rivalidare con prove periodiche.",
  "evidenceTable": {
    "caption": "Piani di recupero misurati",
    "headers": [
      "Piano / costo",
      "Sito e capacità esplicite",
      "Frequenza e ultimo punto recuperabile",
      "Durata misurata del recupero"
    ],
    "rows": [
      [
        "A / 9",
        "Hot: applicazione e dipendenze attive; capacità completa",
        "Replica ogni minuto; 11:57; copie versionate isolate separate",
        "20 minuti"
      ],
      [
        "B / 5",
        "Warm: hardware pronto; caricamento dati e avvio inclusi",
        "Backup ogni 15 minuti; 11:45",
        "90 minuti"
      ],
      [
        "C / 2",
        "Cold: spazio e rete; installazione hardware e recupero inclusi",
        "Backup ogni 60 minuti; 11:00",
        "360 minuti"
      ],
      [
        "D / 1",
        "Cold: approvvigionamento e installazione inclusi",
        "Backup ogni minuto; 11:59",
        "600 minuti"
      ],
      [
        "E / 3",
        "Hot: servizio attivo; capacità completa",
        "Backup ogni 15 minuti, ultimi tentativi falliti; 09:00",
        "10 minuti"
      ]
    ]
  },
  "id": 307,
  "kind": "matching",
  "mechanic": "matching",
  "objective": "3.4",
  "relatedObjectives": [
    "5.2"
  ],
  "domain": 3,
  "sources": [
    "nist80034"
  ],
  "prompts": [
    {
      "id": "payments",
      "text": "Pagamenti: RTO 30 minuti, RPO 5 minuti.",
      "correctOptionId": "a"
    },
    {
      "id": "orders",
      "text": "Ordini: RTO 120 minuti, RPO 30 minuti.",
      "correctOptionId": "b"
    },
    {
      "id": "archive",
      "text": "Archivio: RTO 480 minuti, RPO 120 minuti.",
      "correctOptionId": "c"
    },
    {
      "id": "limits",
      "text": "Quale limite misura il tempo e quale la perdita dati?",
      "correctOptionId": "limits"
    },
    {
      "id": "point",
      "text": "Quanti minuti di dati perde il piano E?",
      "correctOptionId": "loss"
    },
    {
      "id": "copies",
      "text": "Una cancellazione viene propagata dalla replica A: quale protezione distinta serve?",
      "correctOptionId": "copies"
    },
    {
      "id": "sites",
      "text": "Come verificare che un sito soddisfi i requisiti?",
      "correctOptionId": "capacity"
    }
  ],
  "options": [
    {
      "id": "a",
      "text": "Piano A"
    },
    {
      "id": "b",
      "text": "Piano B"
    },
    {
      "id": "c",
      "text": "Piano C"
    },
    {
      "id": "d",
      "text": "Piano D"
    },
    {
      "id": "e",
      "text": "Piano E"
    },
    {
      "id": "limits",
      "text": "RTO: recupero del servizio; RPO: perdita dati ammessa"
    },
    {
      "id": "loss",
      "text": "180 minuti dal punto 09:00"
    },
    {
      "id": "copies",
      "text": "Copie versionate isolate, conservazione e prove di ripristino"
    },
    {
      "id": "capacity",
      "text": "Capacità e durata misurate, confrontate con RTO e RPO"
    },
    {
      "id": "swapped",
      "text": "RTO: perdita dati; RPO: tempo di recupero"
    },
    {
      "id": "frequency",
      "text": "15 minuti perché il backup è frequente"
    },
    {
      "id": "replica",
      "text": "La replica è sempre un backup indipendente"
    },
    {
      "id": "hot",
      "text": "Il nome hot garantisce ogni requisito"
    }
  ]
},
{
  "id": 503,
  "kind": "control",
  "mechanic": "matching",
  "objective": "4.5",
  "relatedObjectives": [
    "4.1"
  ],
  "domain": 4,
  "sources": [
    "ciscoIsePosture",
    "ciscoIseAgentless",
    "nist800207"
  ],
  "title": "Postura NAC e accesso alla remediation",
  "scenario": "Kestrelia usa una policy NAC ispirata ai profili di autorizzazione Cisco ISE. Identità di utente e dispositivo devono essere valide e autorizzate. Sono obbligatori patch approvate, cifratura del disco attiva e antimalware attivo e aggiornato, verificati da un report di postura corrente e riuscito. Un agente installato, da solo, non è prova di conformità. Policy: identità non valida = blocco dei servizi aziendali e di remediation; identità valida e tutti i requisiti verificati = accesso ordinario ai soli servizi del ruolo; identità valida con requisito correggibile fallito = rete limitata alla remediation; identità valida con report incompleto o non disponibile = accesso limitato a provisioning e valutazione, mai alla produzione. In entrambe le reti limitate una ACL consente soltanto DNS e DHCP aziendali, servizio NAC di valutazione/provisioning e server aziendali di aggiornamento o configurazione necessari al caso; sono vietati Internet generale, server di produzione e altri endpoint. Le eccezioni sono servizi di questo laboratorio, non un elenco universale. Dopo la correzione serve una nuova valutazione riuscita e una nuova decisione di autorizzazione. Dati sintetici; nessun incidente attivo noto. Guida D4, obiettivi 4.5 e 4.1; glossario: NAC, Agent, Agentless e Dissolvable Agent (attività 27). Un agente persistente resta installato, un agente dissolvibile è temporaneo; agentless descrive l’approccio senza agente persistente, con capacità dipendenti dal prodotto. Cisco ISE può usare script temporanei anche nel metodo denominato agentless: il nome non garantisce tutte le verifiche o una rivalutazione periodica.",
  "prompt": "Abbina i dispositivi A–E al profilo di accesso motivato; valuta poi rivalutazione, servizi consentiti e significato della conformità. Alcune opzioni sono distrattori.",
  "explanation": "A → accesso ordinario circoscritto al ruolo: identità valida e report corrente confermano tutti i requisiti, non accesso illimitato. B → remediation delle patch: la cifratura e l’antimalware non compensano il requisito patch fallito. C → remediation della cifratura: un antimalware attivo non sostituisce la cifratura del disco. D → blocco: l’identità revocata prevale anche con un report di postura conforme; non riceve accesso alla remediation. E → provisioning/valutazione limitati: dati dichiarati buoni ma report agentless incompleto significano postura sconosciuta, non conformità. L’assenza di un agente persistente non è da sola una non conformità: un metodo agentless supportato con tutte le evidenze richieste potrebbe produrre un report valido. Per B, il messaggio di installazione della patch non basta: resta limitato fino a nuova valutazione riuscita e nuova autorizzazione. La rete di remediation consente soltanto i servizi definiti nella policy: DNS/DHCP aziendali, NAC e server di aggiornamento/configurazione necessari; niente produzione, comunicazione con altri endpoint o Internet generale. La conformità è una misura rispetto ai requisiti e al momento della verifica, non prova di attività innocua: allarmi successivi richiedono indagine e rivalutazione secondo policy. La quarantena NAC limita la rete, mentre la quarantena antimalware isola un file. I distrattori confondono presenza dell’antimalware con fiducia, report incompleto con conformità, correzione dichiarata con autorizzazione e remediation con accesso esteso.",
  "prompts": [
    {
      "id": "p_device_a",
      "text": "A: identità valida; patch approvate; cifratura attiva; antimalware attivo e aggiornato; agente persistente con report corrente riuscito.",
      "correctOptionId": "ordinary"
    },
    {
      "id": "p_device_b",
      "text": "B: identità valida; patch obbligatoria mancante; cifratura attiva; antimalware attivo e aggiornato; agente dissolvibile supportato con report corrente riuscito.",
      "correctOptionId": "patch_remediation"
    },
    {
      "id": "p_device_c",
      "text": "C: identità valida; patch approvate; cifratura disattivata; antimalware attivo e aggiornato; agente persistente con report corrente riuscito.",
      "correctOptionId": "encryption_remediation"
    },
    {
      "id": "p_device_d",
      "text": "D: identità del dispositivo revocata; patch approvate; cifratura attiva; antimalware attivo e aggiornato; agente persistente con report corrente riuscito.",
      "correctOptionId": "block_identity"
    },
    {
      "id": "p_device_e",
      "text": "E: identità valida; patch, cifratura e antimalware dichiarati conformi; metodo agentless configurato, ma controlli obbligatori non completati e report incompleto.",
      "correctOptionId": "unknown_posture"
    },
    {
      "id": "p_reassessment",
      "text": "B: l’installazione della patch è terminata, ma manca un nuovo report di postura. Quando può ottenere l’accesso ordinario?",
      "correctOptionId": "fresh_authorization"
    },
    {
      "id": "p_network_scope",
      "text": "Un dispositivo con identità valida è in remediation. Quali servizi può raggiungere secondo la policy dichiarata?",
      "correctOptionId": "remediation_services"
    },
    {
      "id": "p_compliance_limits",
      "text": "A passa la valutazione e ottiene l’accesso del ruolo. Questo prova che ogni attività successiva sia innocua?",
      "correctOptionId": "no_safety_guarantee"
    }
  ],
  "options": [
    {
      "id": "ordinary",
      "text": "Accesso ordinario ai soli servizi autorizzati del ruolo: identità valida e tutti i requisiti verificati."
    },
    {
      "id": "patch_remediation",
      "text": "Remediation limitata per installare la patch approvata; produzione vietata fino alla nuova autorizzazione."
    },
    {
      "id": "encryption_remediation",
      "text": "Remediation limitata per attivare e verificare la cifratura richiesta; antimalware da solo insufficiente."
    },
    {
      "id": "block_identity",
      "text": "Blocco dei servizi aziendali e di remediation: identità revocata, indipendentemente dalla postura."
    },
    {
      "id": "unknown_posture",
      "text": "Accesso limitato a provisioning e valutazione: postura sconosciuta, nessun accesso alla produzione."
    },
    {
      "id": "fresh_authorization",
      "text": "Restare limitato fino a nuova valutazione riuscita di tutti i requisiti e nuova decisione di autorizzazione."
    },
    {
      "id": "remediation_services",
      "text": "Solo DNS/DHCP aziendali, NAC e server di update/configurazione necessari; niente Internet generale, produzione o altri endpoint."
    },
    {
      "id": "no_safety_guarantee",
      "text": "No: conformità al momento della verifica, non garanzia di attività innocua; continuare monitoraggio e rivalutazione secondo policy."
    },
    {
      "id": "antimalware_trust",
      "text": "Consentire accesso a tutta la rete a qualsiasi dispositivo con antimalware presente."
    },
    {
      "id": "unknown_compliant",
      "text": "Trattare un report incompleto come conforme perché non contiene fallimenti."
    },
    {
      "id": "automatic_promotion",
      "text": "Riammettere automaticamente dopo il messaggio di installazione senza valutazione o autorizzazione."
    },
    {
      "id": "broad_remediation",
      "text": "Consentire Internet generale, produzione e altri endpoint per facilitare la correzione."
    }
  ],
  "evidenceTable": {
    "caption": "Postura e identità dei dispositivi A–E",
    "headers": [
      "Dispositivo",
      "Identità",
      "Patch",
      "Cifratura",
      "Antimalware",
      "Metodo / report"
    ],
    "rows": [
      [
        "A",
        "Valida",
        "Approvate",
        "Attiva",
        "Attivo e aggiornato",
        "Persistente / corrente riuscito"
      ],
      [
        "B",
        "Valida",
        "Obbligatoria mancante",
        "Attiva",
        "Attivo e aggiornato",
        "Dissolvibile / corrente riuscito"
      ],
      [
        "C",
        "Valida",
        "Approvate",
        "Disattivata",
        "Attivo e aggiornato",
        "Persistente / corrente riuscito"
      ],
      [
        "D",
        "Revocata",
        "Approvate",
        "Attiva",
        "Attivo e aggiornato",
        "Persistente / corrente riuscito"
      ],
      [
        "E",
        "Valida",
        "Dichiarate conformi",
        "Dichiarata attiva",
        "Dichiarato conforme",
        "Agentless / incompleto"
      ]
    ]
  }
},
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
  {
    id: 309,
    kind: "matching",
    mechanic: "matching",
    objective: "1.2",
    domain: 1,
    title: "Componenti dell'architettura Zero Trust",
    scenario:
      "Kestrelia adotta un'architettura Zero Trust secondo il modello NIST SP 800-207, distinguendo il piano di controllo dal piano dei dati.",
    prompt:
      "Abbina ogni componente alla sua funzione. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_pe", text: "Valuta le policy e decide se concedere o negare ogni singola richiesta di accesso.", correctOptionId: "pe" },
      { id: "p_pa", text: "Genera, applica e revoca le credenziali di sessione in base alla decisione presa.", correctOptionId: "pa" },
      { id: "p_pep", text: "Sul piano dei dati stabilisce, monitora e termina la connessione tra soggetto e risorsa.", correctOptionId: "pep" },
      { id: "p_subject", text: "L'utente o il servizio che richiede l'accesso a una risorsa protetta.", correctOptionId: "subject" },
    ],
    options: [
      { id: "pe", text: "Policy Engine (motore delle policy)" },
      { id: "pa", text: "Policy Administrator (amministratore delle policy)" },
      { id: "pep", text: "Policy Enforcement Point (punto di applicazione)" },
      { id: "subject", text: "Soggetto richiedente" },
      { id: "implicit", text: "Zona di fiducia implicita" },
    ],
    explanation:
      "Policy Engine e Policy Administrator insieme formano il Policy Decision Point sul piano di controllo: il primo decide, il secondo attua la decisione gestendo le credenziali di sessione. Il Policy Enforcement Point sta sul piano dei dati e apre o chiude concretamente la connessione verso la risorsa. Il soggetto è chi richiede l'accesso. La «zona di fiducia implicita», qui distrattore, è proprio ciò che Zero Trust elimina: nessun accesso è fidato solo per la posizione di rete.",
  },
  {
    id: 310,
    kind: "matching",
    mechanic: "matching",
    objective: "2.1",
    domain: 2,
    title: "Attori di minaccia e motivazioni",
    scenario:
      "Il team di threat intelligence di Kestrelia profila quattro episodi in base all'attore più probabile.",
    prompt:
      "Abbina ogni profilo all'attore di minaccia corretto. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_apt", text: "Gruppo con ingenti risorse e finanziamenti statali, conduce campagne persistenti di spionaggio su obiettivi strategici.", correctOptionId: "nation" },
      { id: "p_crime", text: "Organizzazione strutturata il cui scopo è il profitto economico; gestisce ransomware su larga scala.", correctOptionId: "crime" },
      { id: "p_hacktivist", text: "Agisce per una causa ideologica o politica e deturpa i siti per diffondere un messaggio.", correctOptionId: "hacktivist" },
      { id: "p_insider", text: "Dipendente autorizzato che abusa dei propri accessi per vendetta dopo un licenziamento annunciato.", correctOptionId: "insider" },
      { id: "p_unskilled", text: "Usa strumenti e script preconfezionati di altri senza comprenderne il funzionamento.", correctOptionId: "unskilled" },
    ],
    options: [
      { id: "nation", text: "Stato-nazione (APT)" },
      { id: "crime", text: "Criminalità organizzata" },
      { id: "hacktivist", text: "Hacktivista" },
      { id: "insider", text: "Minaccia interna (insider)" },
      { id: "unskilled", text: "Attaccante inesperto (script kiddie)" },
      { id: "shadow", text: "Shadow IT" },
    ],
    explanation:
      "Gli attori si distinguono per risorse, sofisticazione, posizione (interna/esterna) e motivazione. Lo stato-nazione punta allo spionaggio con risorse elevate e persistenza; la criminalità organizzata è mossa dal profitto; l'hacktivista da una causa; l'insider sfrutta accessi legittimi, spesso per vendetta; l'inesperto riusa strumenti altrui. Lo Shadow IT, qui distrattore, è tecnologia interna non autorizzata: un rischio, non un attore mosso da una motivazione ostile.",
  },
  {
    id: 311,
    kind: "matching",
    mechanic: "matching",
    objective: "2.3",
    domain: 2,
    title: "Tipi di vulnerabilità",
    scenario:
      "Durante un assessment Kestrelia cataloga le debolezze rilevate sui propri sistemi.",
    prompt:
      "Abbina ogni descrizione al tipo di vulnerabilità. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_toctou", text: "Tra il controllo di un permesso e l'uso effettivo della risorsa esiste una finestra temporale sfruttabile.", correctOptionId: "race" },
      { id: "p_overflow", text: "Un input più lungo del previsto sovrascrive la memoria adiacente e altera il flusso di esecuzione.", correctOptionId: "overflow" },
      { id: "p_vmescape", text: "Da una macchina virtuale un processo riesce a raggiungere l'hypervisor e le altre VM.", correctOptionId: "vmescape" },
      { id: "p_legacy", text: "Un sistema operativo fuori supporto non riceve più patch di sicurezza.", correctOptionId: "legacy" },
      { id: "p_reuse", text: "Memoria o storage riassegnati conservano i dati del tenant precedente.", correctOptionId: "reuse" },
    ],
    options: [
      { id: "race", text: "Race condition (TOCTOU)" },
      { id: "overflow", text: "Buffer overflow" },
      { id: "vmescape", text: "VM escape (fuga dalla macchina virtuale)" },
      { id: "legacy", text: "Sistema legacy / end-of-life" },
      { id: "reuse", text: "Riuso delle risorse" },
      { id: "sidechannel", text: "Attacco side-channel" },
    ],
    explanation:
      "La race condition (TOCTOU, time-of-check/time-of-use) sfrutta la finestra tra verifica e uso. Il buffer overflow scrive oltre il buffer e può dirottare l'esecuzione. La VM escape rompe l'isolamento verso l'hypervisor. Un sistema legacy è vulnerabile perché non riceve più patch. Il riuso delle risorse espone dati residui in memoria o storage riassegnati. L'attacco side-channel, qui distrattore, inferisce segreti da consumi, tempi o emissioni, non da una delle condizioni descritte.",
  },
  {
    id: 312,
    kind: "matching",
    mechanic: "matching",
    objective: "2.5",
    domain: 2,
    title: "Tecniche di mitigazione aziendali",
    scenario:
      "Kestrelia pianifica interventi di riduzione del rischio su asset e reti diversi.",
    prompt:
      "Abbina ogni intervento alla tecnica di mitigazione corretta. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_ot", text: "Separare la rete OT/ICS dalla rete aziendale per limitare il movimento laterale.", correctOptionId: "segmentation" },
      { id: "p_retire", text: "Rimuovere software e dati e dismettere in modo sicuro un server a fine vita.", correctOptionId: "decommissioning" },
      { id: "p_baseline", text: "Applicare e far rispettare in continuo una baseline di configurazione tramite GPO o MDM.", correctOptionId: "config" },
      { id: "p_helpdesk", text: "Concedere all'helpdesk solo i privilegi minimi necessari al suo ruolo.", correctOptionId: "leastpriv" },
      { id: "p_harden", text: "Disattivare porte e servizi inutilizzati e rimuovere gli account di default.", correctOptionId: "hardening" },
    ],
    options: [
      { id: "segmentation", text: "Segmentazione della rete" },
      { id: "decommissioning", text: "Dismissione sicura (decommissioning)" },
      { id: "config", text: "Enforcement della configurazione" },
      { id: "leastpriv", text: "Privilegio minimo" },
      { id: "hardening", text: "Hardening (irrobustimento)" },
      { id: "monitoring", text: "Monitoraggio continuo" },
    ],
    explanation:
      "La segmentazione isola reti con requisiti diversi (OT/ICS) e frena il movimento laterale. La dismissione sicura rimuove dati e sistema a fine vita. L'enforcement della configurazione mantiene nel tempo una baseline nota. Il privilegio minimo limita i diritti al necessario. L'hardening riduce la superficie d'attacco disattivando ciò che non serve. Il monitoraggio continuo, qui distrattore, rileva ma non rimuove la debolezza descritta in ciascun intervento.",
  },
  {
    id: 313,
    kind: "matching",
    mechanic: "matching",
    objective: "3.1",
    domain: 3,
    title: "Implicazioni dei modelli architetturali",
    scenario:
      "Kestrelia valuta dove collocare nuovi carichi di lavoro e quali vincoli di sicurezza comportano.",
    prompt:
      "Abbina ogni caratteristica al modello architetturale corretto. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_faas", text: "Esegue codice su richiesta senza gestire i server, con fatturazione per invocazione.", correctOptionId: "serverless" },
      { id: "p_scada", text: "Dispositivi di campo e PLC con controllo in tempo reale, dove disponibilità e sicurezza fisica vengono prima di tutto.", correctOptionId: "scada" },
      { id: "p_micro", text: "Applicazione suddivisa in piccoli servizi indipendenti che comunicano via API.", correctOptionId: "microservices" },
      { id: "p_iac", text: "Infrastruttura descritta in modelli dichiarativi versionati e ricreabile in modo ripetibile.", correctOptionId: "iac" },
      { id: "p_container", text: "Più carichi condividono lo stesso kernel del sistema operativo con isolamento leggero basato su immagini.", correctOptionId: "container" },
    ],
    options: [
      { id: "serverless", text: "Serverless (FaaS)" },
      { id: "scada", text: "SCADA / ICS" },
      { id: "microservices", text: "Microservizi" },
      { id: "iac", text: "Infrastructure as Code (IaC)" },
      { id: "container", text: "Containerizzazione" },
      { id: "iot", text: "Internet of Things (IoT)" },
    ],
    explanation:
      "Il serverless sposta la gestione del runtime sul provider e cambia il modello di responsabilità. SCADA/ICS controlla processi fisici: la priorità è la disponibilità e la safety, spesso con protocolli legacy. I microservizi aumentano la superficie di API da proteggere. L'IaC rende la configurazione versionabile e ripetibile, ma un errore nei modelli si propaga ovunque. La containerizzazione condivide il kernel, quindi l'isolamento è più debole di una VM. L'IoT, qui distrattore, riguarda dispositivi vincolati con default deboli, non descritti negli altri casi.",
  },
  {
    id: 103,
    kind: "ordering",
    mechanic: "ordering",
    objective: "4.2",
    domain: 4,
    title: "Ciclo di vita di un asset hardware",
    scenario:
      "Kestrelia ritira un lotto di portatili che contengono dati riservati e ne gestisce il ciclo di vita fino alla distruzione certificata.",
    prompt:
      "Ordina le fasi di gestione dell'asset, dall'acquisizione alla distruzione.",
    steps: [
      { id: "s_acq", text: "Acquisizione e registrazione dell'asset nell'inventario." },
      { id: "s_assign", text: "Assegnazione a un proprietario responsabile e classificazione dei dati." },
      { id: "s_monitor", text: "Monitoraggio e tracciamento dell'asset durante l'uso operativo." },
      { id: "s_decom", text: "Dismissione: ritiro dal servizio e rimozione dalle operazioni." },
      { id: "s_sanitize", text: "Sanitizzazione dei supporti (cancellazione sicura, degaussing o crypto-erase)." },
      { id: "s_destroy", text: "Distruzione fisica e rilascio del certificato di distruzione." },
    ],
    explanation:
      "La gestione dell'asset segue un ciclo preciso: prima si acquisisce e si inventaria, poi si assegna a un proprietario e si classificano i dati, quindi si monitora durante l'uso. A fine vita si dismette (ritiro dal servizio), poi si sanitizza il supporto e solo infine si distrugge fisicamente, documentando il tutto con un certificato di distruzione. Sanitizzazione prima della distruzione: su un supporto che potrebbe essere riutilizzato la cancellazione sicura viene prima; il certificato chiude la catena di custodia.",
  },
  {
    id: 314,
    kind: "matching",
    mechanic: "matching",
    objective: "4.4",
    domain: 4,
    title: "Strumenti e attività di monitoraggio",
    scenario:
      "Il SOC di Kestrelia assegna ogni esigenza allo strumento o all'attività di monitoraggio corretta.",
    prompt:
      "Abbina ogni esigenza allo strumento o all'attività corretta. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_correlate", text: "Raccoglie e correla eventi da molte sorgenti e genera avvisi centralizzati.", correctOptionId: "siem" },
      { id: "p_poll", text: "Interroga i dispositivi di rete e riceve trap sullo stato e sui guasti.", correctOptionId: "snmp" },
      { id: "p_scap", text: "Protocollo standard per automatizzare la verifica di vulnerabilità e configurazioni (CVE, CVSS, OVAL).", correctOptionId: "scap" },
      { id: "p_tuning", text: "Riduce i falsi positivi regolando soglie e regole degli avvisi.", correctOptionId: "tuning" },
      { id: "p_flows", text: "Registra i metadati dei flussi di traffico di rete per l'analisi.", correctOptionId: "netflow" },
    ],
    options: [
      { id: "siem", text: "SIEM" },
      { id: "snmp", text: "SNMP" },
      { id: "scap", text: "SCAP" },
      { id: "tuning", text: "Tuning degli avvisi" },
      { id: "netflow", text: "NetFlow" },
      { id: "dlp", text: "DLP" },
    ],
    explanation:
      "Il SIEM aggrega e correla i log di molte sorgenti e produce avvisi. SNMP raccoglie telemetria dai dispositivi e ne riceve le trap. SCAP standardizza e automatizza i controlli di vulnerabilità e configurazione (CVE, CVSS, OVAL). Il tuning degli avvisi abbassa il rumore dei falsi positivi. NetFlow registra i metadati dei flussi (chi parla con chi), non il contenuto. Il DLP, qui distrattore, previene l'esfiltrazione di dati: non è uno strumento di monitoraggio dello stato o dei flussi.",
  },
  {
    id: 315,
    kind: "matching",
    mechanic: "matching",
    objective: "4.6",
    domain: 4,
    title: "Fattori di autenticazione a più fattori",
    scenario:
      "Kestrelia rafforza l'accesso combinando fattori di autenticazione di categorie diverse.",
    prompt:
      "Abbina ogni metodo alla categoria di fattore corretta. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_fingerprint", text: "Scansione dell'impronta digitale all'accesso.", correctOptionId: "inherence" },
      { id: "p_key", text: "Chiave di sicurezza hardware o codice temporaneo generato da un'app (TOTP).", correctOptionId: "possession" },
      { id: "p_pin", text: "PIN o password memorizzati dall'utente.", correctOptionId: "knowledge" },
      { id: "p_geo", text: "Accesso consentito solo da una posizione geografica attesa (geofencing).", correctOptionId: "location" },
      { id: "p_keystroke", text: "Analisi del ritmo di digitazione e del comportamento d'uso.", correctOptionId: "behavior" },
    ],
    options: [
      { id: "knowledge", text: "Qualcosa che sai" },
      { id: "possession", text: "Qualcosa che hai" },
      { id: "inherence", text: "Qualcosa che sei" },
      { id: "location", text: "Da qualche parte dove sei" },
      { id: "behavior", text: "Qualcosa che fai" },
      { id: "sso", text: "Single Sign-On (SSO)" },
    ],
    explanation:
      "L'autenticazione è davvero a più fattori solo quando combina categorie diverse: qualcosa che sai (PIN), che hai (chiave/TOTP), che sei (impronta). Le categorie meno ovvie sono «da qualche parte dove sei» (posizione/geofencing) e «qualcosa che fai» (biometria comportamentale, come il ritmo di digitazione). Il Single Sign-On, qui distrattore, è un meccanismo di comodità che propaga una sola autenticazione a più servizi: non è un fattore.",
  },
  {
    id: 104,
    kind: "ordering",
    mechanic: "ordering",
    objective: "4.7",
    domain: 4,
    title: "Playbook di automazione e orchestrazione (SOAR)",
    scenario:
      "Kestrelia automatizza con un playbook SOAR la risposta a un avviso di malware su un endpoint.",
    prompt:
      "Ordina i passi del playbook, dall'attivazione alla chiusura.",
    steps: [
      { id: "s_trigger", text: "Un avviso del SIEM attiva automaticamente il playbook." },
      { id: "s_enrich", text: "Arricchimento: interroga threat intelligence e reputazione degli indicatori." },
      { id: "s_decide", text: "Logica decisionale con guardrail: valuta la gravità ed evita azioni non consentite." },
      { id: "s_contain", text: "Contenimento automatico: isola l'endpoint tramite API dell'EDR e disabilita l'account." },
      { id: "s_ticket", text: "Apertura del ticket ed escalation/notifica agli analisti." },
      { id: "s_report", text: "Chiusura e report dell'esecuzione per audit e metriche." },
    ],
    explanation:
      "Un playbook SOAR parte da un trigger (l'avviso del SIEM), poi arricchisce gli indicatori con contesto esterno prima di decidere. La logica decisionale applica i guardrail, barriere che impediscono azioni pericolose o non autorizzate. Solo allora agisce: contiene l'endpoint via API dell'EDR e disabilita l'account. Apre quindi il ticket con eventuale escalation umana e infine chiude registrando l'esecuzione per audit e metriche. L'arricchimento prima della decisione evita contenimenti inutili su falsi positivi.",
  },
  {
    id: 105,
    kind: "ordering",
    mechanic: "ordering",
    objective: "5.6",
    domain: 5,
    title: "Ciclo di un programma di sensibilizzazione",
    scenario:
      "Kestrelia avvia un programma di security awareness per tutto il personale.",
    prompt:
      "Ordina le fasi del programma, dalla pianificazione al miglioramento ricorrente.",
    steps: [
      { id: "s_assess", text: "Analisi dei rischi comportamentali e definizione degli obiettivi del programma." },
      { id: "s_develop", text: "Sviluppo dei contenuti e delle policy di sicurezza da comunicare." },
      { id: "s_execute", text: "Esecuzione: erogazione della formazione a tutto il personale." },
      { id: "s_phish", text: "Campagne di phishing simulato per misurare riconoscimento e segnalazione." },
      { id: "s_report", text: "Monitoraggio e reportistica delle metriche (iniziale e ricorrente)." },
      { id: "s_improve", text: "Revisione ricorrente e aggiornamento del programma sulla base dei risultati." },
    ],
    explanation:
      "Un programma di sensibilizzazione segue un ciclo: prima si analizzano i rischi comportamentali e si fissano gli obiettivi, poi si sviluppano contenuti e policy, quindi si esegue erogando la formazione. Le campagne di phishing simulato misurano se le persone riconoscono e segnalano gli attacchi. Le metriche si monitorano e si riportano sia all'avvio sia in modo ricorrente, alimentando una revisione periodica che mantiene efficace il programma nel tempo. La sensibilizzazione è un programma continuo, non un corso una tantum.",
  },
  {
    id: 316,
    kind: "matching",
    mechanic: "matching",
    objective: "5.1",
    domain: 5,
    title: "Gerarchia dei documenti di governance",
    scenario:
      "Il team di governance di Kestrelia riordina la documentazione di sicurezza.",
    prompt:
      "Abbina ogni documento alla sua definizione. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_policy", text: "Dichiarazione di alto livello, obbligatoria, che fissa l'intento e le responsabilità.", correctOptionId: "policy" },
      { id: "p_standard", text: "Requisiti specifici e obbligatori (per esempio la lunghezza minima delle password) a supporto di una policy.", correctOptionId: "standard" },
      { id: "p_procedure", text: "Istruzioni passo-passo su come eseguire concretamente un'attività.", correctOptionId: "procedure" },
      { id: "p_guideline", text: "Raccomandazioni consigliate ma non obbligatorie.", correctOptionId: "guideline" },
    ],
    options: [
      { id: "policy", text: "Policy" },
      { id: "standard", text: "Standard" },
      { id: "procedure", text: "Procedura" },
      { id: "guideline", text: "Linea guida" },
      { id: "regulation", text: "Legge/regolamento esterno" },
    ],
    explanation:
      "La policy fissa l'intento e la direzione, ed è obbligatoria. Lo standard traduce la policy in requisiti specifici e misurabili, anch'essi obbligatori. La procedura descrive i passi operativi per rispettare lo standard. La linea guida offre raccomandazioni non vincolanti. La legge o il regolamento esterno, qui distrattore, è imposto dall'esterno: la governance interna deve rispettarlo, ma non è un documento della sua stessa gerarchia.",
  },
  {
    id: 317,
    kind: "matching",
    mechanic: "matching",
    objective: "5.3",
    domain: 5,
    title: "Accordi e attività con terze parti",
    scenario:
      "Kestrelia formalizza i rapporti con fornitori e partner lungo la supply chain.",
    prompt:
      "Abbina ogni descrizione all'accordo o all'attività corretta. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_sla", text: "Garantisce livelli di servizio misurabili, come disponibilità del 99,9% e tempi di risposta.", correctOptionId: "sla" },
      { id: "p_sow", text: "Elenca deliverable, tempistiche e milestone specifici di un progetto.", correctOptionId: "sow" },
      { id: "p_audit", text: "Clausola che consente al cliente di verificare direttamente i controlli del fornitore.", correctOptionId: "audit" },
      { id: "p_nda", text: "Protegge le informazioni riservate scambiate tra le parti.", correctOptionId: "nda" },
      { id: "p_mou", text: "Esprime l'intento comune tra le parti, con scarsa vincolatività legale.", correctOptionId: "mou" },
    ],
    options: [
      { id: "sla", text: "SLA (accordo sul livello di servizio)" },
      { id: "sow", text: "SOW (capitolato di lavoro)" },
      { id: "audit", text: "Clausola di diritto all'audit" },
      { id: "nda", text: "NDA (accordo di riservatezza)" },
      { id: "mou", text: "MOU/MOA (memorandum d'intesa)" },
      { id: "bpa", text: "BPA (accordo tra partner d'affari)" },
    ],
    explanation:
      "Lo SLA fissa livelli di servizio misurabili e le penali in caso di mancato rispetto. Il SOW definisce deliverable e tempistiche puntuali di un progetto. La clausola di diritto all'audit permette al cliente di verificare i controlli del fornitore. L'NDA tutela le informazioni riservate. Il MOU/MOA esprime un intento comune con scarsa vincolatività. Il BPA, qui distrattore, regola un rapporto di partnership commerciale con ripartizione di utili e responsabilità: non descrive nessuna delle situazioni elencate.",
  },
  {
    id: 318,
    kind: "matching",
    mechanic: "matching",
    objective: "5.4",
    domain: 5,
    title: "Conformità e privacy",
    scenario:
      "L'ufficio compliance di Kestrelia classifica situazioni legate agli obblighi normativi e alla privacy.",
    prompt:
      "Abbina ogni situazione al concetto corretto. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_fine", text: "Un'autorità impone una sanzione pecuniaria per il mancato rispetto di un obbligo.", correctOptionId: "fine" },
      { id: "p_attest", text: "Dichiarazione formale e firmata che i controlli richiesti sono in atto.", correctOptionId: "attestation" },
      { id: "p_rtbf", text: "Un interessato chiede la cancellazione dei propri dati personali.", correctOptionId: "rtbf" },
      { id: "p_inventory", text: "Mappare dove risiedono i dati personali trattati e per quanto tempo conservarli.", correctOptionId: "inventory" },
      { id: "p_license", text: "La perdita della licenza operativa come conseguenza della non conformità.", correctOptionId: "license" },
    ],
    options: [
      { id: "fine", text: "Multa/sanzione pecuniaria" },
      { id: "attestation", text: "Attestazione di conformità" },
      { id: "rtbf", text: "Diritto all'oblio" },
      { id: "inventory", text: "Inventario e retention dei dati" },
      { id: "license", text: "Perdita della licenza" },
      { id: "duecare", text: "Due care (diligenza ragionevole)" },
    ],
    explanation:
      "Le conseguenze della non conformità includono multe, sanzioni, danno reputazionale, impatti contrattuali e, nei casi gravi, la perdita della licenza operativa. L'attestazione è la dichiarazione firmata che i controlli sono attuati. Sul fronte privacy, il diritto all'oblio è la richiesta di cancellazione dei dati personali dell'interessato, mentre l'inventario e la retention stabiliscono dove risiedono i dati e per quanto tempo. La due care, qui distrattore, è la diligenza ragionevole nell'adottare controlli: un principio, non una delle situazioni descritte.",
  },
  {
    id: 319,
    kind: "matching",
    mechanic: "matching",
    objective: "5.5",
    domain: 5,
    title: "Audit, assessment e penetration test",
    scenario:
      "Kestrelia pianifica verifiche interne ed esterne e un penetration test su un'applicazione.",
    prompt:
      "Abbina ogni descrizione al tipo corretto di verifica. Un'opzione è un distrattore.",
    prompts: [
      { id: "p_internal", text: "Il team interno verifica la conformità dei controlli e riferisce alla direzione.", correctOptionId: "internal" },
      { id: "p_external", text: "Una terza parte indipendente esamina i controlli ed emette un'attestazione.", correctOptionId: "external" },
      { id: "p_known", text: "I tester ricevono in anticipo architettura e credenziali complete.", correctOptionId: "known" },
      { id: "p_unknown", text: "I tester partono senza alcuna informazione interna sul bersaglio.", correctOptionId: "unknown" },
      { id: "p_passive", text: "Raccolta di informazioni senza interagire direttamente con il bersaglio (OSINT).", correctOptionId: "passive" },
    ],
    options: [
      { id: "internal", text: "Audit interno" },
      { id: "external", text: "Audit esterno / attestazione" },
      { id: "known", text: "Ambiente noto (known environment)" },
      { id: "unknown", text: "Ambiente ignoto (unknown environment)" },
      { id: "passive", text: "Ricognizione passiva" },
      { id: "active", text: "Ricognizione attiva" },
    ],
    explanation:
      "L'audit interno è condotto dal personale dell'organizzazione per la direzione; quello esterno da una terza parte indipendente che rilascia un'attestazione. Nei penetration test l'ambiente noto fornisce ai tester architettura e credenziali complete (white box), l'ambiente ignoto nessuna informazione iniziale (black box). La ricognizione passiva raccoglie dati senza toccare il bersaglio (OSINT). La ricognizione attiva, qui distrattore, interroga direttamente il bersaglio con scansioni: utile, ma è l'opposto di quella passiva descritta.",
  },
];
