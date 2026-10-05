/**
 * Original performance-based scenarios — Italian source of truth.
 *
 * Two scenarios for each of the five roadmap themes (ordering, matching, log
 * interpretation, incident response, control selection), ten in all, spread
 * across the five exam domains and tied to official SY0-701 objectives.
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
