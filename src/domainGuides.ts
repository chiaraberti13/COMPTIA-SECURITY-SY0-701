import type { Lang } from "./i18n";

export interface GuideScenario {
  title: string;
  prompt: string;
  reasoning: string;
}

/** A compact comparison table; every row has one cell per header. */
export interface GuideComparison {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface DomainGuide {
  domainId: number;
  title: string;
  weight: number;
  purpose: string;
  /**
   * `keyTopics` lists the official sub-topics of the objective, so the guide
   * doubles as a syllabus checklist. Optional while the guides are enriched
   * one domain at a time.
   */
  objectives: { code: string; outcome: string; keyTopics?: string[] }[];
  studyPath: { title: string; rationale: string }[];
  decisionPatterns: string[];
  connections: string[];
  /** Side-by-side comparisons of concepts the exam tends to confuse. */
  comparisons?: GuideComparison[];
  /** Frequent misconceptions, each paired with the correct reading. */
  commonTraps?: { misconception: string; correction: string }[];
  appliedScenario: GuideScenario;
  /** Extra exercises, each tied to the objective it trains. */
  practiceScenarios?: (GuideScenario & { objective: string })[];
  readinessChecks: string[];
}

const IT_DOMAIN_GUIDES: Record<number, DomainGuide> = {
  1: {
    domainId: 1,
    title: "Concetti generali di sicurezza",
    weight: 12,
    purpose: "Costruisce il linguaggio decisionale dell'intero esame: classificare i controlli, collegare CIA e non ripudio alle tecnologie appropriate, progettare l'accesso secondo zero trust, governare il cambiamento e scegliere primitive crittografiche in base al requisito. Non basta ricordare una definizione: occorre riconoscere quale proprietà manca e quale controllo la ripristina.",
    objectives: [
      {
        code: "1.1",
        outcome: "Distinguere categorie e tipi di controllo, separando lo scopo del controllo dal modo in cui viene implementato.",
        keyTopics: [
          "Categorie: technical, managerial, operational, physical",
          "Tipi: preventive, deterrent, detective, corrective, compensating, directive",
          "Uno stesso controllo può avere più tipi: conta la funzione richiesta dallo scenario",
        ],
      },
      {
        code: "1.2",
        outcome: "Applicare CIA, autenticazione, autorizzazione, accounting, non ripudio, zero trust, gap analysis, sicurezza fisica e deception a uno scenario.",
        keyTopics: [
          "CIA e non-repudiation",
          "AAA: autenticazione di persone e di sistemi, modelli di autorizzazione, accounting",
          "Gap analysis: stato attuale rispetto allo stato obiettivo",
          "Zero trust, control plane: adaptive identity, threat scope reduction, policy-driven access control, Policy Engine, Policy Administrator",
          "Zero trust, data plane: implicit trust zones, subject/system, Policy Enforcement Point",
          "Sicurezza fisica: bollards, access control vestibule, fencing, video surveillance, security guard, access badge, lighting",
          "Sensori: infrared, pressure, microwave, ultrasonic",
          "Deception: honeypot, honeynet, honeyfile, honeytoken",
        ],
      },
      {
        code: "1.3",
        outcome: "Valutare un cambiamento sicuro: ownership, impatto, approvazione, test, rollback, documentazione e monitoraggio.",
        keyTopics: [
          "Processi: approval process, ownership, stakeholders, impact analysis, test results, backout plan, maintenance window, standard operating procedure",
          "Implicazioni tecniche: allow lists/deny lists, restricted activities, downtime, service restart, application restart, legacy applications, dependencies",
          "Documentazione: aggiornamento di diagrammi, policy e procedure",
          "Version control",
        ],
      },
      {
        code: "1.4",
        outcome: "Selezionare algoritmi, hashing, firma, certificati e gestione delle chiavi in funzione di confidenzialità, integrità e identità.",
        keyTopics: [
          "PKI: public key, private key, key escrow",
          "Livelli di cifratura: full-disk, partition, file, volume, database, record",
          "Cifratura di trasporto, simmetrica e asimmetrica, key exchange, algoritmi e key length",
          "Strumenti: TPM, HSM, key management system, secure enclave",
          "Offuscamento: steganography, tokenization, data masking",
          "Hashing, salting, digital signatures, key stretching",
          "Blockchain e open public ledger",
          "Certificati: certificate authorities, CRL, OCSP, self-signed, third-party, root of trust, CSR, wildcard",
        ],
      },
    ],
    studyPath: [
      { title: "1. Parti dal requisito", rationale: "Per ogni scenario chiediti se il bisogno primario è confidenzialità, integrità, disponibilità, autenticità o non ripudio." },
      { title: "2. Classifica il controllo", rationale: "Identifica prima la categoria (manageriale, operativa, tecnica o fisica), poi il tipo (preventivo, detective, correttivo, deterrente, compensativo o direttivo)." },
      { title: "3. Togli la fiducia implicita", rationale: "Studia zero trust come flusso: il soggetto chiede accesso, il Policy Engine decide, il Policy Administrator comunica la decisione, il Policy Enforcement Point la applica. Poi collega sicurezza fisica e deception alla stessa idea di difesa a strati." },
      { title: "4. Collega la crittografia al caso d'uso", rationale: "Cifratura protegge la confidenzialità; hashing rileva modifiche; MAC aggiunge autenticità condivisa; firma digitale offre integrità, autenticità e non ripudio." },
      { title: "5. Segui la vita di chiavi e certificati", rationale: "Generazione della coppia di chiavi, CSR, emissione da parte della CA, catena fino alla root of trust, verifica della revoca (CRL/OCSP), custodia della chiave privata in TPM, HSM o KMS." },
      { title: "6. Inserisci il cambiamento nel ciclo di vita", rationale: "Una modifica sicura comprende baseline, analisi d'impatto e delle dipendenze, approvazione, test, maintenance window, backout plan, aggiornamento della documentazione e verifica post-implementazione." },
    ],
    decisionPatterns: [
      "Se la domanda chiede la BEST soluzione, traduci prima il requisito nella proprietà di sicurezza richiesta; solo dopo confronta le tecnologie.",
      "Un controllo compensativo riduce il rischio quando il controllo principale non è fattibile: non è automaticamente equivalente né una deroga senza approvazione.",
      "Per le firme, il mittente firma con la propria chiave privata e il destinatario verifica con la chiave pubblica del mittente; cifrare con la chiave pubblica del destinatario risolve invece la confidenzialità.",
      "Zero trust: la posizione in rete non concede fiducia. Se lo scenario chiede CHI decide, la risposta è il Policy Engine; se chiede CHI blocca o consente la connessione, è il Policy Enforcement Point.",
      "Se lo scenario chiede di rilevare un attaccante già presente senza toccare la produzione, pensa alla deception: qualsiasi interazione con honeypot, honeyfile o honeytoken è sospetta per definizione.",
      "Per conservare password scegli hash con salt unico e key stretching (Argon2, bcrypt, PBKDF2): non cifratura reversibile e non un hash veloce da solo.",
      "Se serve lo stato di revoca aggiornato di un certificato, OCSP (meglio con stapling) è preferibile alla CRL, che viene pubblicata a intervalli.",
      "Se la domanda chiede cosa preparare PRIMA di una modifica, cerca analisi d'impatto, approvazione, test e backout plan; DOPO la modifica, aggiornamento della documentazione e verifica.",
    ],
    connections: [
      "La classificazione dei controlli sostiene mitigazioni (D2), architettura (D3), hardening e monitoring (D4), governance e risk treatment (D5).",
      "PKI e gestione delle chiavi ricompaiono in TLS, autenticazione, protezione dei dati, incident response e continuità operativa.",
      "Il change management collega governance, configurazioni sicure, vulnerabilità introdotte e capacità di rollback.",
      "Zero trust e AAA preparano identity and access management (D4) e le scelte di segmentazione dell'architettura (D3).",
      "Honeypot e honeytoken producono indicatori utilizzati da SIEM, threat hunting e incident response (D4).",
    ],
    comparisons: [
      {
        title: "Tipi di controllo: quando agiscono",
        headers: ["Tipo", "Funzione", "Esempio"],
        rows: [
          ["Preventive", "Impedisce che l'evento accada", "Regola firewall, MFA, serratura"],
          ["Deterrent", "Scoraggia il tentativo, senza impedirlo", "Cartello di videosorveglianza (CCTV), illuminazione"],
          ["Detective", "Rileva e registra l'evento", "IDS, revisione dei log, sensore di movimento"],
          ["Corrective", "Riporta la situazione alla normalità dopo l'evento", "Ripristino da backup, patch dopo un incidente"],
          ["Compensating", "Riduce il rischio quando il controllo principale non è applicabile", "Isolare in una VLAN dedicata un sistema legacy non aggiornabile"],
          ["Directive", "Indica il comportamento atteso", "Policy, procedura, obbligo contrattuale"],
        ],
      },
      {
        title: "Primitive crittografiche: cosa garantiscono",
        headers: ["Soluzione", "Garantisce", "Chiave usata", "Non garantisce"],
        rows: [
          ["Cifratura simmetrica (AES)", "Confidenzialità, anche di grandi volumi", "Una chiave segreta condivisa", "Identità del mittente, non ripudio"],
          ["Cifratura asimmetrica (RSA, ECC)", "Confidenzialità di piccoli dati e scambio di chiavi", "Chiave pubblica del destinatario", "Prestazioni su grandi volumi"],
          ["Hash (SHA-256)", "Integrità: rileva modifiche", "Nessuna", "Confidenzialità, autenticità"],
          ["HMAC", "Integrità e autenticità tra chi condivide la chiave", "Chiave segreta condivisa", "Non ripudio: entrambe le parti hanno la chiave"],
          ["Firma digitale", "Integrità, autenticità e non ripudio", "Chiave privata del firmatario", "Confidenzialità"],
        ],
      },
      {
        title: "Dove vivono le chiavi",
        headers: ["Strumento", "Cos'è", "Indizio tipico nella domanda"],
        rows: [
          ["TPM", "Chip sulla scheda madre del singolo dispositivo", "Cifratura del disco legata all'hardware, measured boot"],
          ["HSM", "Dispositivo dedicato e certificato per operazioni crittografiche ad alto volume", "Chiavi della CA, pagamenti, molte firme al secondo"],
          ["Key management system", "Servizio centrale per il ciclo di vita delle chiavi", "Rotazione, revoca e audit delle chiavi su molti sistemi o in cloud"],
          ["Secure enclave", "Area isolata del processore", "Proteggere dati e chiavi durante l'uso, anche da un sistema operativo compromesso"],
        ],
      },
      {
        title: "Offuscamento dei dati",
        headers: ["Tecnica", "Cosa fa", "Reversibile?"],
        rows: [
          ["Tokenization", "Sostituisce il dato con un token; la corrispondenza resta in un vault separato", "Sì, solo tramite il vault"],
          ["Data masking", "Nasconde parte del dato mostrato, ad esempio ****1234", "Di norma no, sulla copia mascherata"],
          ["Steganography", "Nasconde l'esistenza stessa del dato dentro un altro file", "Sì, per chi conosce il metodo"],
        ],
      },
      {
        title: "Verifica della revoca dei certificati",
        headers: ["Meccanismo", "Come funziona", "Punto debole"],
        rows: [
          ["CRL", "La CA pubblica periodicamente l'elenco dei certificati revocati", "Aggiornamento non immediato, elenco che cresce"],
          ["OCSP", "Il client chiede lo stato di un singolo certificato al responder", "Il responder vede quali siti visita il client e deve essere raggiungibile"],
          ["OCSP stapling", "Il server allega alla connessione una risposta OCSP firmata e recente", "Deve essere supportato e configurato sul server"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "L'hash cifra i dati.", correction: "L'hash è una funzione a senso unico: rileva modifiche ma non protegge la confidenzialità e non si decifra." },
      { misconception: "Il salt deve restare segreto.", correction: "Il salt deve essere unico e casuale per ogni password, non segreto: rende inutili le rainbow table e obbliga ad attaccare ogni hash separatamente." },
      { misconception: "La cifratura full-disk protegge anche un computer acceso e sbloccato.", correction: "La full-disk protegge i dati a riposo, per esempio un portatile rubato e spento. Con il sistema sbloccato i dati sono accessibili a utente e malware." },
      { misconception: "Un certificato wildcard copre tutti i sottodomini.", correction: "*.example.com copre un solo livello (www.example.com) ma non example.com né a.b.example.com." },
      { misconception: "Un controllo compensativo equivale ad accettare il rischio.", correction: "Il controllo compensativo riduce il rischio con una misura alternativa approvata; l'accettazione del rischio è una decisione formale di non ridurlo ulteriormente." },
      { misconception: "Un honeypot blocca gli attacchi.", correction: "Un honeypot serve a rilevare e studiare l'attaccante: non ha valore di produzione e non impedisce l'attacco ai sistemi reali." },
      { misconception: "Una chiave più lunga è sempre più robusta, qualunque sia l'algoritmo.", correction: "La lunghezza si confronta all'interno della stessa famiglia: una chiave ECC da 256 bit offre una sicurezza paragonabile a RSA da 3072 bit." },
      { misconception: "Il backout plan si scrive se la modifica fallisce.", correction: "Il backout plan si prepara e si verifica prima della maintenance window, come condizione per l'approvazione del cambiamento." },
    ],
    appliedScenario: {
      title: "Pacchetto di configurazione alterato",
      prompt: "Un team distribuisce configurazioni firmate agli appliance. L'hash del file ricevuto non coincide e la firma non è valida. Quale problema è dimostrato e qual è la FIRST action sicura?",
      reasoning: "Integrità e autenticità non sono dimostrate: il pacchetto non va applicato. Blocca la distribuzione, preserva file e log, verifica certificato/catena e provenienza, quindi riparti dall'artefatto approvato tramite il processo di change management. Cifrare il file non correggerebbe una firma non valida.",
    },
    practiceScenarios: [
      {
        objective: "1.1",
        title: "Sistema industriale non aggiornabile",
        prompt: "Un controller industriale usa un sistema operativo non più supportato e il fornitore vieta di installare agenti o patch. Il team lo sposta in una VLAN dedicata, consente solo il traffico verso la console di gestione e monitora quel segmento. Come si classifica meglio questa misura?",
        reasoning: "È un controllo tecnico di tipo compensativo: il controllo principale (patching) non è applicabile e la segmentazione riduce il rischio residuo con una misura alternativa. Non è correttivo, perché non ripara un evento già avvenuto, e la descrizione come solo preventivo perde il motivo per cui è stato scelto. Va documentato e approvato come eccezione.",
      },
      {
        objective: "1.2",
        title: "Accesso di un consulente in zero trust",
        prompt: "Un consulente si autentica correttamente con MFA, ma il suo portatile non ha la cifratura del disco attiva. La policy aziendale richiede dispositivi conformi per accedere all'applicazione HR. Quale componente prende la decisione di negare l'accesso e quale lo impedisce materialmente?",
        reasoning: "Il Policy Engine valuta identità, stato del dispositivo e contesto e decide di negare; il Policy Administrator comunica la decisione; il Policy Enforcement Point blocca la sessione. È un esempio di adaptive identity e policy-driven access control: una credenziale valida non basta se il contesto non è conforme.",
      },
      {
        objective: "1.2",
        title: "Chiave cloud esca nel repository",
        prompt: "Il team inserisce in un repository interno una chiave di accesso cloud finta, senza permessi reali, e configura un allarme se qualcuno prova a usarla. Tre mesi dopo l'allarme scatta da un indirizzo esterno. Che tecnologia è stata usata e che cosa dimostra l'allarme?",
        reasoning: "È un honeytoken, una tecnica di deception. Nessun utente legittimo ha motivo di usarlo, quindi l'allarme è un indicatore ad alta affidabilità che il contenuto del repository è stato esposto o copiato. La risposta corretta è avviare l'incident response sul repository e sulle credenziali reali, non limitarsi a eliminare il token.",
      },
      {
        objective: "1.3",
        title: "Patch che riavvia un servizio condiviso",
        prompt: "Una patch critica per il server web richiede il riavvio del servizio. Sullo stesso server gira un'API usata dal gestionale (ERP), e le workstation hanno un allow list delle applicazioni basata sugli hash. Che cosa deve contenere la richiesta di change prima dell'approvazione?",
        reasoning: "Analisi d'impatto che includa le dipendenze (l'API e il gestionale ERP), una maintenance window concordata con gli stakeholder, risultati di test in un ambiente di prova, un backout plan verificato e l'aggiornamento dell'allow list se cambiano gli hash dei binari. Dopo l'intervento vanno aggiornati diagrammi e procedure e la modifica va tracciata nel version control delle configurazioni.",
      },
      {
        objective: "1.4",
        title: "Archiviazione delle password di un nuovo portale",
        prompt: "Un nuovo portale clienti deve conservare le password degli utenti. Uno sviluppatore propone AES-256 con la chiave nel file di configurazione, un altro SHA-256 senza altro. Quale soluzione è la BEST?",
        reasoning: "Nessuna delle due: serve un algoritmo di key stretching come Argon2id, bcrypt o PBKDF2 con salt unico per ogni utente. AES è reversibile, quindi chi ottiene la chiave ottiene tutte le password; SHA-256 da solo è troppo veloce e, senza salt, esposto alle rainbow table.",
      },
      {
        objective: "1.4",
        title: "Revoca dopo la compromissione della chiave",
        prompt: "La chiave privata del certificato di un sito pubblico è stata esposta. Il certificato viene revocato, ma alcuni client continuano ad accettarlo per ore. Quale meccanismo riduce questo intervallo senza pesare su ogni client?",
        reasoning: "OCSP stapling: il server allega alla connessione una risposta OCSP firmata e recente, così il client conosce lo stato del certificato senza scaricare una CRL, che viene aggiornata solo periodicamente. Va comunque generata una nuova coppia di chiavi con una nuova CSR: riemettere il certificato con la stessa chiave non risolve la compromissione.",
      },
    ],
    readinessChecks: [
      "Sai distinguere categoria e tipo dello stesso controllo senza confonderli.",
      "Sai motivare la scelta tra hashing, MAC, firma digitale e cifratura.",
      "Sai ordinare un cambiamento dal requisito alla verifica post-implementazione.",
      "Sai indicare il ruolo di Policy Engine, Policy Administrator e Policy Enforcement Point.",
      "Sai scegliere tra TPM, HSM, key management system e secure enclave a partire dallo scenario.",
      "Sai spiegare CSR, catena dei certificati, CRL e OCSP e il limite di un certificato wildcard.",
    ],
  },
  2: {
    domainId: 2,
    title: "Minacce, vulnerabilità e mitigazioni",
    weight: 22,
    purpose: "Trasforma indicatori tecnici e contesto aziendale in una catena di ragionamento: attore e motivazione → vettore e superficie → vulnerabilità → indicatori → mitigazione. L'obiettivo è distinguere la causa dall'effetto e scegliere il controllo più specifico che interrompe l'attacco.",
    objectives: [
      {
        code: "2.1",
        outcome: "Confrontare attori, attributi e motivazioni per stimare capacità, intento, accesso e probabilità.",
        keyTopics: [
          "Attori: nation-state, unskilled attacker, hacktivist, insider threat, organized crime, shadow IT",
          "Attributi: internal/external, resources/funding, level of sophistication/capability",
          "Motivazioni: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political beliefs, ethical, revenge, disruption/chaos, war",
        ],
      },
      {
        code: "2.2",
        outcome: "Analizzare vettori e superfici di attacco, inclusi social engineering, supply chain, cloud, wireless e removable media.",
        keyTopics: [
          "Message-based: email, SMS, instant messaging; image-based, file-based, voice call",
          "Removable device, vulnerable software (client-based e agentless), unsupported systems and applications",
          "Reti non sicure: wireless, wired, Bluetooth; open service ports; default credentials",
          "Supply chain: managed service providers (MSP), vendors, suppliers",
          "Human vectors: phishing, vishing, smishing, misinformation/disinformation, impersonation, business email compromise, pretexting, watering hole, brand impersonation, typosquatting",
        ],
      },
      {
        code: "2.3",
        outcome: "Riconoscere vulnerabilità applicative, hardware, cloud, virtualizzazione, mobile, crittografiche e di configurazione.",
        keyTopics: [
          "Applicative: memory injection, buffer overflow, race conditions (time-of-check, time-of-use), malicious update",
          "Operating system (OS)-based; web-based: SQL injection (SQLi), cross-site scripting (XSS)",
          "Hardware: firmware, end-of-life, legacy",
          "Virtualizzazione: VM escape, resource reuse; cloud-specific",
          "Supply chain: service provider, hardware provider, software provider",
          "Cryptographic, misconfiguration, zero-day",
          "Mobile device: side loading, jailbreaking",
        ],
      },
      {
        code: "2.4",
        outcome: "Interpretare indicatori di malware, attacchi di rete, credenziali, applicazioni e comportamenti anomali.",
        keyTopics: [
          "Malware: ransomware, trojan, worm, spyware, bloatware, virus, keylogger, logic bomb, rootkit",
          "Attacchi fisici: brute force, RFID cloning, environmental",
          "Attacchi di rete: DDoS (amplified, reflected), DNS attacks, wireless, on-path, credential replay, malicious code",
          "Attacchi applicativi: injection, buffer overflow, replay, privilege escalation, forgery, directory traversal",
          "Attacchi crittografici: downgrade, collision, birthday",
          "Attacchi alle password: spraying, brute force",
          "Indicatori: account lockout, concurrent session usage, blocked content, impossible travel, resource consumption, resource inaccessibility, out-of-cycle logging, published/documented, missing logs",
        ],
      },
      {
        code: "2.5",
        outcome: "Selezionare mitigazioni coerenti con il vettore: segmentation, hardening, patching, least privilege, allowlisting, isolamento e monitoring.",
        keyTopics: [
          "Segmentation, access control (ACL, permissions), application allow list, isolation",
          "Patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning",
          "Hardening: encryption, installation of endpoint protection, host-based firewall, host-based intrusion prevention system (HIPS), disabling ports/protocols, default password changes, removal of unnecessary software",
        ],
      },
    ],
    studyPath: [
      { title: "1. Modella l'avversario", rationale: "Capacità, risorse, sofisticazione, accesso interno/esterno e motivazione cambiano sia la probabilità sia i controlli prioritari." },
      { title: "2. Segui il percorso d'attacco", rationale: "Separa initial access, execution, persistence, privilege escalation, lateral movement, command and control ed exfiltration." },
      { title: "3. Leggi gli indicatori in contesto", rationale: "Un singolo evento raramente prova un incidente; correla identità, host, rete, orario, baseline e intelligence." },
      { title: "4. Mitiga causa e propagazione", rationale: "Preferisci il controllo che rimuove o riduce la vulnerabilità; aggiungi segmentazione e rilevamento per limitare blast radius e tempo di permanenza." },
      { title: "5. Riconosci la famiglia dell'attacco", rationale: "Prima di scegliere il controllo, decidi se il sintomo indica malware, un attacco alle credenziali, alla rete, all'applicazione o alla crittografia: ogni famiglia ha mitigazioni tipiche diverse." },
      { title: "6. Riduci la superficie prima dell'incidente", rationale: "Hardening, cambio delle credenziali di default, chiusura di porte e protocolli inutili, rimozione del software superfluo e dismissione dei sistemi end-of-life tolgono all'attaccante i vettori più facili." },
    ],
    decisionPatterns: [
      "Non confondere vettore, vulnerabilità ed exploit: il vettore è il percorso, la vulnerabilità è la debolezza, l'exploit è il mezzo che la sfrutta.",
      "Per FIRST action durante un attacco attivo, valuta sicurezza delle persone e contenimento; per la correzione permanente, rimuovi la causa e verifica l'efficacia.",
      "Una mitigazione è migliore quando interrompe la tecnica osservata con il minor impatto operativo accettabile, non quando è semplicemente il controllo più potente.",
      "Molti account, pochi tentativi ciascuno, con password comuni: è password spraying. Molti tentativi su un solo account fino al blocco: è brute force.",
      "Impossible travel o sessioni concorrenti dallo stesso account indicano credenziali o token compromessi: revoca le sessioni, non limitarti al cambio password.",
      "Missing logs e out-of-cycle logging suggeriscono che qualcuno sta coprendo le tracce: preserva le evidenze e confronta con i log inoltrati a un sistema centrale.",
      "Se un attaccante forza l'uso di una versione vecchia di un protocollo è un downgrade attack: la mitigazione è disabilitare le versioni deboli, non aggiungere un altro controllo a valle.",
      "Shadow IT è tecnologia non autorizzata usata di solito per comodità, non per nuocere: la risposta è governance e un'alternativa approvata, non trattarla come un insider malevolo.",
    ],
    connections: [
      "Le mitigazioni dipendono dai modelli architetturali e dai trust boundary del D3.",
      "Indicatori, vulnerability management, SIEM e incident response diventano processi operativi nel D4.",
      "Threat intelligence, risk appetite e priorità di remediation dipendono da governance e rischio del D5.",
      "Tipi di controllo e zero trust del D1 danno il vocabolario per classificare ogni mitigazione di questo dominio.",
      "Il rischio di supply chain collega vendor assessment e contratti del D5 alle vulnerabilità di update malevoli e service provider.",
    ],
    comparisons: [
      {
        title: "Attori delle minacce",
        headers: ["Attore", "Motivazione tipica", "Risorse e capacità", "Indizio nello scenario"],
        rows: [
          ["Nation-state", "Espionage, war, service disruption", "Molto alte, persistenza a lungo termine (APT)", "Obiettivi strategici, strumenti su misura, attacchi pazienti"],
          ["Organized crime", "Financial gain, blackmail", "Alte, organizzazione di tipo aziendale", "Ransomware, estorsione, frodi su pagamenti"],
          ["Hacktivist", "Philosophical/political beliefs", "Variabili", "Defacement, DDoS, pubblicazione di dati per una causa"],
          ["Insider threat", "Revenge, financial gain", "Accesso interno legittimo", "Abuso di permessi esistenti, attività fuori orario o fuori ruolo"],
          ["Unskilled attacker", "Disruption/chaos, notorietà", "Basse, strumenti già pronti", "Attacchi rumorosi con tool pubblici e senza adattamento"],
          ["Shadow IT", "Comodità, produttività", "Interno, senza intento malevolo", "Servizi cloud o dispositivi non approvati dall'IT"],
        ],
      },
      {
        title: "Famiglie di malware",
        headers: ["Tipo", "Come agisce", "Indizio tipico"],
        rows: [
          ["Virus", "Si attacca a un file o programma e si diffonde quando viene eseguito", "File infetti che si moltiplicano dopo l'apertura"],
          ["Worm", "Si propaga da solo in rete sfruttando una vulnerabilità", "Traffico di scansione e infezioni rapide senza azione dell'utente"],
          ["Trojan", "Si presenta come software legittimo e apre un accesso", "Programma scaricato da fonte non ufficiale che contatta un server esterno"],
          ["Ransomware", "Cifra o sottrae i dati e chiede un riscatto", "Estensioni dei file cambiate, nota di riscatto, picco di scritture su disco"],
          ["Rootkit", "Si nasconde a livello di kernel o firmware", "Processi e file invisibili agli strumenti del sistema compromesso"],
          ["Logic bomb", "Si attiva al verificarsi di una condizione o data", "Danno che parte in un momento preciso, spesso dopo l'uscita di un dipendente"],
          ["Keylogger", "Registra i tasti premuti", "Credenziali rubate anche con password robuste"],
          ["Spyware", "Raccoglie attività e dati dell'utente", "Traffico verso terze parti, impostazioni del browser cambiate"],
          ["Bloatware", "Software preinstallato non necessario", "Più superficie d'attacco e risorse consumate senza beneficio"],
        ],
      },
      {
        title: "Attacchi alle credenziali e alla crittografia",
        headers: ["Attacco", "Come funziona", "Mitigazione principale"],
        rows: [
          ["Brute force", "Molti tentativi su uno stesso account", "Blocco dopo tentativi falliti, MFA, password robuste"],
          ["Password spraying", "Poche password comuni provate su molti account", "MFA, blocco delle password comuni, rilevamento sui tentativi distribuiti"],
          ["Credential replay", "Riuso di credenziali o hash catturati", "MFA, canali cifrati, protocolli di autenticazione moderni"],
          ["Downgrade", "Forza l'uso di una versione debole di un protocollo", "Disabilitare versioni e cifrari obsoleti"],
          ["Collision / birthday", "Trova due input con lo stesso hash", "Algoritmi di hash con output più lungo, come SHA-256"],
        ],
      },
      {
        title: "Attacchi applicativi",
        headers: ["Attacco", "Cosa sfrutta", "Mitigazione principale"],
        rows: [
          ["SQL injection", "Input inserito in una query al database", "Query parametrizzate e validazione dell'input"],
          ["Cross-site scripting", "Script eseguito nel browser di un'altra vittima", "Codifica dell'output e Content Security Policy"],
          ["Directory traversal", "Percorsi come ../ per uscire dalla cartella prevista", "Normalizzazione dei percorsi e permessi minimi sul file system"],
          ["Buffer overflow", "Scrittura oltre i limiti di un'area di memoria", "Controllo dei limiti, linguaggi memory-safe, DEP e ASLR"],
          ["Race condition", "Intervallo tra controllo e uso di una risorsa (TOCTOU)", "Operazioni atomiche e lock sulle risorse"],
          ["Replay", "Riutilizzo di una richiesta valida catturata", "Nonce, timestamp e token di sessione a scadenza"],
          ["Forgery", "Richiesta falsificata a nome della vittima o del server", "Token anti-CSRF, cookie SameSite, filtro delle destinazioni per SSRF"],
        ],
      },
      {
        title: "Indicatori di attività malevola",
        headers: ["Indicatore", "Cosa può significare", "Prima verifica"],
        rows: [
          ["Account lockout", "Brute force contro l'account", "Origine e numero dei tentativi"],
          ["Concurrent session usage", "Credenziali usate da due soggetti", "Dispositivi e indirizzi delle sessioni attive"],
          ["Impossible travel", "Accesso da luoghi incompatibili in poco tempo", "Posizione, VPN aziendali e validità della sessione"],
          ["Blocked content", "Tentativi di raggiungere siti o file malevoli", "Host e utente che hanno generato il blocco"],
          ["Resource consumption", "Mining, esfiltrazione o DDoS in corso", "Processi e connessioni che consumano risorse"],
          ["Resource inaccessibility", "Ransomware o negazione del servizio", "File cifrati o servizi saturi"],
          ["Out-of-cycle logging", "Attività in orari o momenti insoliti", "Chi era autorizzato a operare in quel momento"],
          ["Missing logs", "Cancellazione delle tracce", "Confronto con i log inoltrati a un sistema centrale"],
          ["Published/documented", "Dati o vulnerabilità già resi pubblici", "Verifica della fonte e dell'esposizione reale"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "Un worm ha bisogno che l'utente apra un file.", correction: "Il worm si propaga da solo sfruttando una vulnerabilità di rete; è il virus che richiede l'esecuzione di un file o programma infetto." },
      { misconception: "Password spraying e brute force sono la stessa cosa.", correction: "Il brute force prova molte password su un account e provoca blocchi; lo spraying prova poche password comuni su molti account per restare sotto la soglia di blocco." },
      { misconception: "Dopo un account compromesso basta cambiare la password.", correction: "Sessioni, token OAuth e regole di persistenza possono restare validi: vanno revocati e rimossi, e va trovata la causa dell'accesso." },
      { misconception: "Lo shadow IT è un insider threat malevolo.", correction: "Lo shadow IT nasce di solito da comodità e produttività: è un rischio da governare con policy e alternative approvate, non un attacco intenzionale." },
      { misconception: "Contro una vulnerabilità zero-day non si può fare nulla.", correction: "Mancando la patch si usano controlli compensativi: segmentazione, least privilege, allow list, rilevamento comportamentale e riduzione della superficie esposta." },
      { misconception: "Il cross-site scripting attacca direttamente il database.", correction: "L'XSS esegue script nel browser di un'altra vittima; è la SQL injection che manipola le query al database." },
      { misconception: "Reflected e amplified DDoS sono sinonimi.", correction: "Nel reflected l'attaccante falsifica l'indirizzo della vittima come mittente; nell'amplified sfrutta servizi che rispondono con molti più dati della richiesta. Spesso sono combinati." },
      { misconception: "Un sistema end-of-life si protegge con il patching regolare.", correction: "Un sistema end-of-life non riceve più patch: servono isolamento, controlli compensativi e un piano di dismissione." },
    ],
    appliedScenario: {
      title: "Compromissione cloud con persistenza",
      prompt: "Dopo un login anomalo, un account crea una regola di inoltro email e autorizza un'app OAuth. Quali elementi correlare e quali controlli interrompono davvero l'attacco?",
      reasoning: "Correla sign-in, MFA, audit della mailbox, consenso OAuth, IP/device e timeline. Contieni revocando sessioni e token, disabilitando o limitando l'account e rimuovendo regola e app malevola; poi correggi la causa con credenziali, policy di consenso, MFA resistente al phishing e monitoring. Il solo reset password può lasciare validi token e persistenza.",
    },
    practiceScenarios: [
      {
        objective: "2.1",
        title: "Condivisione file non approvata",
        prompt: "Il team marketing usa un servizio cloud personale di condivisione file per scambiare bozze con un'agenzia, perché lo strumento aziendale è lento. Nei file ci sono dati di clienti. Quale tipo di attore e quale motivazione descrivono meglio la situazione, e qual è la risposta più adatta?",
        reasoning: "È shadow IT: attore interno, senza intento malevolo, motivato da comodità e produttività. Il rischio reale è l'esposizione dei dati fuori dai controlli aziendali. La risposta è fermare la condivisione, valutare l'esposizione, offrire un'alternativa approvata e aggiornare la policy; trattarlo come un insider malevolo sarebbe sproporzionato e non risolverebbe la causa.",
      },
      {
        objective: "2.2",
        title: "Accesso remoto del fornitore gestito",
        prompt: "Un managed service provider (MSP) amministra i server tramite uno strumento di accesso remoto con un account condiviso e privilegi da amministratore di dominio. Lo strumento del fornitore viene compromesso. Quale vettore è stato usato e quali controlli avrebbero limitato l'impatto?",
        reasoning: "È un vettore di supply chain tramite MSP. Limitano l'impatto: account nominativi con MFA per il fornitore, least privilege invece dei privilegi di dominio, accesso limitato nel tempo e da sistemi dedicati, monitoraggio delle sessioni e clausole contrattuali su sicurezza e notifica degli incidenti.",
      },
      {
        objective: "2.3",
        title: "Controllo e uso non atomici",
        prompt: "Un servizio verifica che un file temporaneo appartenga all'utente e, qualche millisecondo dopo, lo apre con privilegi elevati. Un attaccante sostituisce il file con un collegamento a un file di sistema tra le due operazioni. Quale vulnerabilità viene sfruttata?",
        reasoning: "È una race condition di tipo time-of-check to time-of-use (TOCTOU): lo stato verificato cambia prima dell'uso. La correzione è rendere l'operazione atomica, per esempio aprendo il file una sola volta e verificando i permessi sul descrittore già aperto, ed eseguire il servizio con i privilegi minimi necessari.",
      },
      {
        objective: "2.4",
        title: "Un tentativo per account",
        prompt: "In venti minuti il sistema di autenticazione registra un solo login fallito per ciascuno di 900 account diversi, tutti dalla stessa rete esterna e con la stessa password stagionale. Nessun account viene bloccato, uno riesce ad accedere. Quale attacco è in corso e quale indicatore lo rivela?",
        reasoning: "È password spraying: poche password comuni su molti account per restare sotto la soglia di blocco. L'indicatore non è l'account lockout, ma la distribuzione dei tentativi falliti per origine e password. La risposta è bloccare l'origine, reimpostare le credenziali dell'account compromesso revocandone le sessioni, imporre MFA e vietare le password comuni.",
      },
      {
        objective: "2.4",
        title: "Un'ora mancante nei log",
        prompt: "Durante un'indagine su un server, il registro locale non contiene eventi tra le 02:00 e le 03:00, mentre il SIEM ha ricevuto da quel server un'ondata di eventi di amministrazione subito prima del vuoto. Che cosa suggeriscono questi indicatori e come procedi?",
        reasoning: "Missing logs dopo attività amministrativa fuori orario suggeriscono che qualcuno ha cancellato le tracce. Preserva l'immagine del server e i log centrali, che fanno fede perché inoltrati prima della cancellazione, ricostruisci la timeline dal SIEM e verifica quali account amministrativi erano attivi. Il vuoto nei log è esso stesso un'evidenza.",
      },
      {
        objective: "2.5",
        title: "Chiosco in un'area pubblica",
        prompt: "Un chiosco informativo per il pubblico usa un sistema operativo generico con credenziali di default, porte USB accessibili, software di prova preinstallato e servizi di rete non necessari. Quale insieme di misure di hardening è il più appropriato?",
        reasoning: "Cambiare le credenziali di default, disabilitare le porte e i protocolli non necessari compresi USB e servizi di rete, rimuovere il software superfluo, applicare un application allow list che consenta solo l'app del chiosco, attivare firewall host-based e protezione endpoint e isolare il chiosco in un segmento dedicato. Ogni misura elimina un vettore specifico dello scenario.",
      },
    ],
    readinessChecks: [
      "Sai ricostruire una kill chain essenziale partendo da log e sintomi.",
      "Sai distinguere una vulnerabilità da un indicatore della sua exploitation.",
      "Sai motivare una mitigazione primaria e un controllo compensativo per lo stesso scenario.",
      "Sai associare ogni attore alla sua motivazione tipica e alle risorse di cui dispone.",
      "Sai distinguere virus, worm, trojan, rootkit e logic bomb dai loro indizi.",
      "Sai riconoscere password spraying, credential replay e downgrade dagli indicatori.",
    ],
  },
  3: {
    domainId: 3,
    title: "Architettura di sicurezza",
    weight: 18,
    purpose: "Richiede di progettare protezioni coerenti con modelli cloud, on-premises, ibridi, virtualizzati e zero trust. Ogni scelta va valutata rispetto a trust boundary, responsabilità condivise, flussi di dati, disponibilità, scalabilità e superficie d'attacco.",
    objectives: [
      {
        code: "3.1",
        outcome: "Confrontare modelli e infrastrutture: cloud service model, deployment model, virtualizzazione, container, IoT/OT, serverless e IaC.",
        keyTopics: [
          "Cloud: responsibility matrix, considerazioni sull'ibrido, third-party vendors",
          "Infrastructure as code (IaC), serverless, microservices, on-premises, centralized vs decentralized",
          "Rete: physical isolation (air-gapped), logical segmentation, software-defined networking (SDN)",
          "Containerization, virtualization, IoT, industrial control systems (ICS)/SCADA, real-time operating system (RTOS), embedded systems, high availability",
          "Considerazioni: availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, compute",
        ],
      },
      {
        code: "3.2",
        outcome: "Applicare principi di sicurezza a segmentazione, zone, accesso remoto, dispositivi di rete, protocolli e trust boundary.",
        keyTopics: [
          "Device placement, security zones, attack surface, connectivity",
          "Failure modes: fail-open, fail-closed; device attribute: active vs passive, inline vs tap/monitor",
          "Network appliances: jump server, proxy server, IPS/IDS, load balancer, sensors",
          "Port security: 802.1X, EAP",
          "Firewall types: web application firewall (WAF), unified threat management (UTM), next-generation firewall (NGFW), layer 4/layer 7",
          "Comunicazione e accesso sicuri: VPN, remote access, tunneling (TLS, IPSec), SD-WAN, secure access service edge (SASE)",
          "Selection of effective controls",
        ],
      },
      {
        code: "3.3",
        outcome: "Proteggere i dati per stato, classificazione e ciclo di vita mediante cifratura, tokenizzazione, masking, DLP e access control.",
        keyTopics: [
          "Data types: regulated, trade secret, intellectual property, legal information, financial information, human- and non-human-readable",
          "Classificazioni: sensitive, confidential, public, restricted, private, critical",
          "Data states: data at rest, data in transit, data in use; data sovereignty, geolocation",
          "Metodi: geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions",
        ],
      },
      {
        code: "3.4",
        outcome: "Progettare resilienza e recovery con ridondanza, clustering, backup, siti alternativi, testing e obiettivi RTO/RPO.",
        keyTopics: [
          "High availability: load balancing vs clustering",
          "Site considerations: hot, cold, warm, geographic dispersion; platform diversity, multi-cloud systems",
          "Continuity of operations; capacity planning: people, technology, infrastructure",
          "Testing: tabletop exercises, fail over, simulation, parallel processing",
          "Backups: onsite/offsite, frequency, encryption, snapshots, recovery, replication, journaling",
          "Power: generators, uninterruptible power supply (UPS)",
        ],
      },
    ],
    studyPath: [
      { title: "1. Disegna confini e flussi", rationale: "Individua utenti, workload, dati, ingressi/uscite, control plane, data plane e passaggi tra livelli di fiducia." },
      { title: "2. Assegna le responsabilità", rationale: "Nel cloud il provider protegge l'infrastruttura sottostante, mentre il cliente conserva responsabilità variabili su dati, identità, configurazioni e workload." },
      { title: "3. Applica difesa in profondità", rationale: "Combina identità, segmentation, secure protocols, hardening, monitoring e protezione dei dati senza affidarti a un solo perimetro." },
      { title: "4. Progetta per il guasto", rationale: "Allinea alta disponibilità e disaster recovery al BIA: RTO guida il tempo di ripristino, RPO la perdita di dati tollerabile, MTD il limite massimo sostenibile." },
      { title: "5. Posiziona e configura gli apparati", rationale: "Per ogni dispositivo decidi zona, modalità inline o tap, comportamento in caso di guasto (fail-open o fail-closed) e se deve bloccare o solo rilevare." },
      { title: "6. Classifica prima di proteggere", rationale: "Tipo di dato, classificazione, stato e giurisdizione determinano il controllo: cifratura, tokenization, masking, restrizioni geografiche o di permesso." },
    ],
    decisionPatterns: [
      "Zero trust non significa fidarsi della rete interna: verifica esplicitamente, applica least privilege e valuta continuamente identità, dispositivo, risorsa e contesto.",
      "Alta disponibilità mantiene il servizio durante guasti locali; disaster recovery ripristina capacità dopo un evento maggiore. Possono coesistere ma non sono sinonimi.",
      "La segmentazione limita il movimento laterale solo se i flussi tra segmenti sono esplicitamente controllati e monitorati.",
      "Se il requisito è bloccare un attacco in tempo reale serve un dispositivo inline (IPS, NGFW, WAF); se è solo osservare senza toccare il traffico basta un sensore passivo su tap o porta di monitoraggio (IDS).",
      "Fail-closed privilegia la confidenzialità, fail-open la disponibilità: scegli in base a che cosa l'organizzazione non può permettersi di perdere, e ricorda che la sicurezza delle persone viene prima.",
      "Per sistemi ICS/SCADA, RTOS o embedded che non si possono aggiornare, la risposta tipica è isolamento o segmentazione con controlli compensativi, non il patching.",
      "Per applicazioni web la protezione specifica è il WAF (layer 7); per un'unica appliance tuttofare in una piccola sede è l'UTM; per filtrare per applicazione e utente è l'NGFW.",
      "Replication non sostituisce il backup: copia anche cancellazioni e cifrature del ransomware. Per ripristinare serve una copia con versioni, isolata o immutabile.",
    ],
    connections: [
      "I requisiti crittografici del D1 diventano scelte concrete per dati at rest, in transit e in use.",
      "Le vulnerabilità del D2 permettono di valutare superficie d'attacco e controlli compensativi dell'architettura.",
      "Monitoring e IAM del D4 rendono operativi zero trust e segmentation; BIA e governance del D5 stabiliscono i requisiti di resilienza.",
      "Data sovereignty e classificazione collegano l'architettura agli obblighi di compliance e privacy del D5.",
      "Test di failover ed esercitazioni tabletop sono lo stesso strumento usato dall'incident response nel D4.",
    ],
    comparisons: [
      {
        title: "Responsabilità condivisa nel cloud",
        headers: ["Modello", "Il provider gestisce", "Il cliente gestisce"],
        rows: [
          ["IaaS", "Data center, hardware, rete fisica, hypervisor", "Sistema operativo, patch, applicazioni, dati, identità, configurazione di rete"],
          ["PaaS", "Anche sistema operativo e runtime della piattaforma", "Codice applicativo, dati, identità, configurazione dei servizi"],
          ["SaaS", "Anche l'applicazione", "Dati, utenti e permessi, configurazione di sicurezza dell'applicazione"],
        ],
      },
      {
        title: "Apparati di rete e posizionamento",
        headers: ["Apparato", "Modalità tipica", "Scopo"],
        rows: [
          ["IDS", "Passivo, su tap o porta di monitoraggio", "Rileva e genera allarmi, non blocca"],
          ["IPS", "Inline, attivo", "Rileva e blocca il traffico malevolo"],
          ["WAF", "Inline davanti all'applicazione web (layer 7)", "Blocca SQL injection, XSS e attacchi HTTP"],
          ["NGFW", "Inline al perimetro o tra zone", "Filtra per applicazione, utente e contenuto, non solo per porta"],
          ["UTM", "Inline, appliance unica", "Firewall, antivirus, filtro web e VPN in un solo apparato"],
          ["Jump server", "In una zona di amministrazione", "Punto unico e controllato per amministrare i sistemi interni"],
          ["Proxy server", "Tra client e Internet", "Filtra, registra e intermedia le richieste"],
          ["Load balancer", "Davanti a un gruppo di server", "Distribuisce il carico e rimuove i nodi guasti"],
        ],
      },
      {
        title: "Comportamento in caso di guasto",
        headers: ["Modalità", "Cosa succede se il dispositivo si guasta", "Quando si sceglie"],
        rows: [
          ["Fail-open", "Il traffico passa senza controllo", "Quando la disponibilità conta più del filtro"],
          ["Fail-closed", "Il traffico viene bloccato", "Quando la confidenzialità conta più della disponibilità"],
        ],
      },
      {
        title: "Siti alternativi",
        headers: ["Sito", "Tempo di attivazione", "Costo", "Contenuto"],
        rows: [
          ["Hot site", "Minuti o ore", "Alto", "Hardware, software e dati aggiornati, pronto a subentrare"],
          ["Warm site", "Ore o giorni", "Medio", "Hardware e connettività, dati da ripristinare"],
          ["Cold site", "Giorni o settimane", "Basso", "Spazio, alimentazione e raffreddamento, niente o quasi di installato"],
        ],
      },
      {
        title: "Tecniche di copia dei dati",
        headers: ["Tecnica", "Cosa fa", "Limite"],
        rows: [
          ["Backup offsite", "Copia conservata lontano dal sito principale", "Il ripristino richiede tempo"],
          ["Snapshot", "Immagine di un sistema o volume in un istante", "Se resta sullo stesso storage non protegge da un guasto di quello storage"],
          ["Replication", "Copia continua dei dati verso un altro sistema", "Replica anche cancellazioni e dati cifrati dal ransomware"],
          ["Journaling", "Registra ogni modifica e permette il ripristino a un istante preciso", "Richiede spazio e un punto di partenza integro"],
        ],
      },
      {
        title: "Stati del dato",
        headers: ["Stato", "Esempio", "Protezione tipica"],
        rows: [
          ["Data at rest", "Database, disco, backup", "Cifratura di disco, database o record, permessi"],
          ["Data in transit", "Traffico tra client e server", "TLS, IPSec, VPN"],
          ["Data in use", "Dati in memoria durante l'elaborazione", "Secure enclave, controllo degli accessi, masking a video"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "Load balancing e clustering sono la stessa cosa.", correction: "Il load balancing distribuisce le richieste su più nodi attivi; il clustering fa lavorare più nodi come un unico sistema e garantisce il failover quando uno cade." },
      { misconception: "Un IDS blocca gli attacchi.", correction: "L'IDS è passivo: rileva e allerta. Per bloccare serve un dispositivo inline come l'IPS." },
      { misconception: "Una VLAN equivale a un air gap.", correction: "La VLAN è segmentazione logica sulla stessa infrastruttura; l'air gap è isolamento fisico, senza alcun collegamento di rete." },
      { misconception: "Con la replication non servono più i backup.", correction: "La replication copia subito anche errori, cancellazioni e file cifrati dal ransomware; servono backup con versioni, isolati o immutabili." },
      { misconception: "Nel SaaS la sicurezza è tutta del provider.", correction: "Anche nel SaaS il cliente resta responsabile di dati, utenti, permessi e configurazioni di sicurezza dell'applicazione." },
      { misconception: "Un hot site garantisce di non perdere dati.", correction: "L'hot site riduce il tempo di ripristino (RTO); la perdita di dati (RPO) dipende da quanto spesso i dati vengono replicati o copiati." },
      { misconception: "Data sovereignty e geolocation sono sinonimi.", correction: "La data sovereignty dice quali leggi si applicano ai dati in base al paese in cui si trovano; la geolocation individua dove si trova un dispositivo o un utente e serve per applicare restrizioni geografiche." },
      { misconception: "Un UPS mantiene i sistemi accesi per tutto un blackout lungo.", correction: "L'UPS copre l'interruzione breve e il tempo necessario all'avvio del generatore, che sostiene i blackout lunghi." },
    ],
    appliedScenario: {
      title: "Servizio ibrido con RPO stretto",
      prompt: "Un portale critico usa API pubbliche e un database on-premises. Il BIA richiede RTO di 2 ore e RPO di 15 minuti. Quali decisioni architetturali sono necessarie?",
      reasoning: "Separa tier pubblico, applicativo e dati con flussi allowlist; applica identità workload e logging centralizzato. Replica o esegui backup con frequenza capace di rispettare 15 minuti e predisponi capacità alternativa testata entro 2 ore. Un backup giornaliero o un sito cold non soddisfano automaticamente gli obiettivi, anche se riducono il costo.",
    },
    practiceScenarios: [
      {
        objective: "3.1",
        title: "Impianto industriale non aggiornabile",
        prompt: "Un impianto di trattamento delle acque usa un sistema SCADA con controllori che eseguono un RTOS certificato: il fornitore non rilascia patch e ogni modifica richiederebbe una nuova certificazione. La direzione vuole collegare l'impianto alla rete aziendale per avere report in tempo reale. Qual è l'approccio architetturale più adatto?",
        reasoning: "Poiché i sistemi non si possono aggiornare (inability to patch), la protezione deve venire dall'architettura: una rete ICS separata, collegata alla rete aziendale solo tramite una zona intermedia con flussi unidirezionali o strettamente limitati, monitoraggio passivo del traffico industriale e accesso di manutenzione tramite jump server. Se il requisito di sicurezza prevale su quello dei report, la scelta resta l'air gap.",
      },
      {
        objective: "3.2",
        title: "IPS davanti a un servizio critico",
        prompt: "Un ospedale mette un IPS inline davanti al sistema che invia i referti ai reparti. Il team discute se configurarlo fail-open o fail-closed. Quali elementi decidono la scelta?",
        reasoning: "Conta che cosa è inaccettabile perdere. Se un guasto dell'IPS interrompesse l'invio dei referti mettendo a rischio i pazienti, la disponibilità prevale e si sceglie fail-open, compensando con monitoraggio e allarmi sul guasto dell'IPS. Se il servizio esponesse dati la cui riservatezza è prioritaria e l'interruzione fosse tollerabile, si sceglierebbe fail-closed. La decisione va documentata e approvata.",
      },
      {
        objective: "3.2",
        title: "Amministratori da remoto",
        prompt: "Gli amministratori di sistema lavorano spesso fuori sede e oggi raggiungono i server via RDP esposto su Internet. Quale architettura riduce la superficie d'attacco mantenendo l'accesso?",
        reasoning: "Chiudere RDP verso Internet, far passare l'accesso da una VPN o da un servizio SASE con MFA e verifica del dispositivo, e consentire l'amministrazione solo da un jump server in una zona dedicata, con sessioni registrate. I server accettano connessioni di gestione solo dal jump server, così un'unica porta d'ingresso controllata sostituisce molte porte esposte.",
      },
      {
        objective: "3.3",
        title: "Dati dei clienti europei nel cloud",
        prompt: "Un'azienda con clienti nell'UE vuole spostare il database clienti su un provider cloud che, per risparmiare, replica automaticamente i dati in regioni fuori dall'UE. Quali concetti entrano in gioco e che cosa va configurato?",
        reasoning: "Entra in gioco la data sovereignty: ai dati si applicano le leggi del paese in cui si trovano, e per dati personali di cittadini UE il GDPR limita i trasferimenti. Vanno configurate restrizioni geografiche sulle regioni di archiviazione e di replica, cifratura con chiavi gestite dall'azienda e una classificazione del dato come regolamentato, verificando le clausole contrattuali del provider.",
      },
      {
        objective: "3.4",
        title: "Scelta del sito alternativo",
        prompt: "Un'azienda di e-commerce ha un RTO di 8 ore e un RPO di 1 ora, con un budget che non consente un secondo data center completamente attivo. Quale combinazione di sito alternativo e protezione dei dati è la più adatta?",
        reasoning: "Un warm site, con hardware e connettività già pronti, può essere attivato entro 8 ore senza il costo di un hot site; un cold site richiederebbe probabilmente più tempo. Per l'RPO di 1 ora servono replication o backup con frequenza almeno oraria verso il sito alternativo. Il piano va verificato con un test di failover, non solo con un tabletop.",
      },
      {
        objective: "3.4",
        title: "Ransomware sul database replicato",
        prompt: "Un ransomware cifra il database principale. La replica sincrona nel secondo data center risulta cifrata anch'essa pochi secondi dopo. Che cosa è mancato nell'architettura di resilienza e come si ripristina?",
        reasoning: "La replication garantisce disponibilità, ma copia immediatamente anche la cifratura. È mancata una copia con versioni e isolata: snapshot immutabili, backup offline o offsite, o journaling che consenta di tornare a un istante precedente all'attacco. Il ripristino parte dall'ultimo punto integro verificato, dopo aver eliminato la causa dell'infezione.",
      },
    ],
    readinessChecks: [
      "Sai delimitare responsabilità cliente/provider in IaaS, PaaS e SaaS.",
      "Sai scegliere tra segmentazione, isolamento, ridondanza e recovery in base al requisito.",
      "Sai derivare una soluzione di backup e sito alternativo da RTO, RPO e MTD.",
      "Sai scegliere tra IDS e IPS, inline e tap, fail-open e fail-closed.",
      "Sai distinguere WAF, NGFW, UTM, proxy e jump server dal loro scopo.",
      "Sai collegare stato, classificazione e giurisdizione del dato al metodo di protezione.",
    ],
  },
  4: {
    domainId: 4,
    title: "Operazioni di sicurezza",
    weight: 28,
    purpose: "È il dominio più pesante e più orientato all'azione. Misura la capacità di rendere operativi i controlli: hardening, asset e vulnerability management, IAM, monitoring, automazione, analisi dei log e incident response. Nelle domande FIRST/NEXT, l'ordine delle azioni è spesso decisivo.",
    objectives: [
      { code: "4.1", outcome: "Applicare baseline, hardening, patching, secure configuration e protezioni per endpoint, mobile, wireless, applicazioni e cloud." },
      { code: "4.2", outcome: "Gestire inventario, ownership, classificazione, ciclo di vita, sanitizzazione e dismissione degli asset." },
      { code: "4.3", outcome: "Eseguire vulnerability management dal discovery alla prioritizzazione, remediation, rescansione, reporting ed eccezioni." },
      { code: "4.4", outcome: "Analizzare alert e attività con log, SIEM, scansioni, intelligence e baseline per distinguere segnale e rumore." },
      { code: "4.5", outcome: "Configurare controlli enterprise quali firewall, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR e proxy." },
      { code: "4.6", outcome: "Implementare IAM: provisioning, federation, MFA, authorization, least privilege, access review e deprovisioning." },
      { code: "4.7", outcome: "Usare automazione e orchestrazione valutando repeatability, velocità, integrazioni, errori e rischio di propagazione." },
      { code: "4.8", outcome: "Applicare incident response e forensics preservando evidenze, comunicazioni, contenimento e ritorno controllato in produzione." },
      { code: "4.9", outcome: "Interpretare fonti dati e log di rete, autenticazione, endpoint, applicazioni, cloud, DNS ed email." },
    ],
    studyPath: [
      { title: "1. Conosci lo stato normale", rationale: "Inventario, ownership, baseline e sincronizzazione temporale rendono interpretabili vulnerabilità, drift, log e alert." },
      { title: "2. Riduci preventivamente l'esposizione", rationale: "Applica hardening, patching, least privilege, segmentation e secure configuration secondo criticità e compatibilità." },
      { title: "3. Correlazione prima della conclusione", rationale: "Valida un alert usando più fonti, timeline, identità, host e contesto; preserva i dati volatili quando la risposta forense lo richiede." },
      { title: "4. Rispondi in ordine", rationale: "Segui preparation; detection/analysis; containment; eradication; recovery; lessons learned, adattando il contenimento a sicurezza, impatto e autorizzazioni." },
    ],
    decisionPatterns: [
      "FIRST non significa sempre spegnere: prima valida l'evento e considera evidenze volatili, safety e piano di risposta; durante un attacco confermato, contiene per limitare il danno.",
      "Una scansione identifica potenziali debolezze; la validazione riduce i falsi positivi; la prioritizzazione combina severità, exploitability, esposizione, valore dell'asset e contesto aziendale.",
      "Autenticazione prova chi sei, autorizzazione decide cosa puoi fare, accounting registra cosa hai fatto; MFA richiede fattori di categorie diverse.",
    ],
    connections: [
      "Le primitive e i controlli del D1 diventano configurazioni, procedure e verifiche operative.",
      "TTP, vulnerabilità e indicatori del D2 alimentano detection engineering, threat hunting e prioritizzazione.",
      "Architettura del D3 determina log disponibili e punti di enforcement; governance del D5 determina escalation, retention, evidence handling e reporting.",
    ],
    appliedScenario: {
      title: "PowerShell e beacon DNS",
      prompt: "EDR segnala PowerShell offuscato su una workstation e il SIEM mostra query DNS periodiche verso un dominio appena registrato. Qual è la sequenza operativa corretta?",
      reasoning: "Valida e correla processo, utente, parent process, DNS, proxy e autenticazioni; se l'attività è confermata, isola l'host preservando le evidenze richieste. Determina lo scope su altri endpoint, eradica persistenza e causa iniziale, ripristina da stato fidato e monitora recidive. Cancellare subito il file può distruggere evidenza e non interrompere credenziali o persistenza altrove.",
    },
    readinessChecks: [
      "Sai ordinare le fasi di incident response e giustificare la FIRST action.",
      "Sai correlare almeno tre fonti di log su una timeline coerente.",
      "Sai prioritizzare vulnerabilità oltre il solo punteggio CVSS e verificare la remediation.",
      "Sai distinguere authentication, authorization, federation, provisioning e access review.",
    ],
  },
  5: {
    domainId: 5,
    title: "Gestione e supervisione del programma di sicurezza",
    weight: 20,
    purpose: "Collega obiettivi aziendali, rischio e controlli. Richiede di distinguere governance, policy, standard, procedure e linee guida; quantificare o qualificare il rischio; gestire terze parti, compliance, privacy, audit e awareness con evidenze verificabili.",
    objectives: [
      { code: "5.1", outcome: "Stabilire governance con ruoli, responsabilità, policy hierarchy, reporting, data ownership e allineamento alla strategia." },
      { code: "5.2", outcome: "Gestire il rischio: identificazione, analisi, registro, appetite/tolerance, risposte, owner, monitoraggio e BIA." },
      { code: "5.3", outcome: "Valutare il rischio delle terze parti lungo selezione, due diligence, contratti, monitoraggio, incident notification e offboarding." },
      { code: "5.4", outcome: "Applicare compliance e privacy considerando obblighi, giurisdizione, minimizzazione, retention, data subject e conseguenze." },
      { code: "5.5", outcome: "Distinguere audit e assessment, raccogliere evidenze e seguire finding, remediation, attestazioni e reporting." },
      { code: "5.6", outcome: "Costruire awareness e training misurabili, specifici per ruolo e adattati a comportamento, minacce e cultura." },
    ],
    studyPath: [
      { title: "1. Parti da obiettivi e autorità", rationale: "Definisci chi decide, chi possiede rischio e dati, quali obblighi si applicano e quali risultati il programma deve sostenere." },
      { title: "2. Valuta il rischio", rationale: "Collega asset, minaccia, vulnerabilità, likelihood e impatto; documenta assunzioni, rischio inerente, controlli e rischio residuo." },
      { title: "3. Scegli e approva la risposta", rationale: "Mitigate, transfer, avoid o accept devono rispettare appetite/tolerance, costo, fattibilità, owner e autorità di accettazione." },
      { title: "4. Dimostra e migliora", rationale: "Metriche, audit, assessment, test, eccezioni, formazione e riesami trasformano la governance in evidenza e miglioramento continuo." },
    ],
    decisionPatterns: [
      "SLE = valore dell'asset × exposure factor; ALE = SLE × ARO. La stima supporta una decisione, ma non sostituisce requisiti legali, safety o risk appetite.",
      "RTO è il target per ripristinare un servizio, RPO il massimo intervallo di dati perdibili, MTD il massimo tempo totale di interruzione sostenibile; in un piano coerente RTO non supera MTD.",
      "Una policy esprime l'intento obbligatorio; uno standard stabilisce requisiti uniformi; una procedura descrive i passi; una guideline offre raccomandazioni flessibili.",
    ],
    connections: [
      "Il risk treatment seleziona e giustifica i controlli studiati nei D1-D4.",
      "BIA, RTO, RPO e MTD definiscono i requisiti che l'architettura resiliente del D3 deve realizzare e il D4 deve testare.",
      "Privacy, retention, legal hold e contratti influenzano logging, forensics, cloud, gestione dei dati e risposta agli incidenti.",
    ],
    appliedScenario: {
      title: "Fornitore che tratta dati personali",
      prompt: "Un nuovo SaaS elaborerà dati personali critici. Il questionario è positivo, ma il contratto non specifica notifica degli incidenti né cancellazione dei dati. Si può approvare il rischio?",
      reasoning: "La due diligence tecnica non sostituisce requisiti contrattuali e privacy. Registra il rischio, definisci DPA, tempi di notifica, retention/cancellazione, subprocessor, diritto di audit, ritorno dei dati e responsabilità; valuta i controlli residui. Solo l'autorità designata può accettare il rischio residuo, e non può derogare a un obbligo legale applicabile.",
    },
    readinessChecks: [
      "Sai calcolare SLE, ARO e ALE e interpretarne i limiti decisionali.",
      "Sai distinguere risk appetite, tolerance, threshold, rischio inerente e residuo.",
      "Sai scegliere il documento o accordo corretto e identificare owner e approvatore.",
      "Sai trasformare un audit finding in remediation tracciabile con evidenza di chiusura.",
    ],
  },
};

const EN_DOMAIN_GUIDES: Record<number, DomainGuide> = {
  1: {
    domainId: 1,
    title: "General Security Concepts",
    weight: 12,
    purpose: "Builds the decision language used throughout the exam: classify controls, connect CIA and non-repudiation to suitable technologies, design access around zero trust, govern change, and select cryptographic primitives from the requirement. Memorizing a definition is not enough; you must recognize which property is missing and which control restores it.",
    objectives: [
      {
        code: "1.1",
        outcome: "Distinguish control categories and types, separating what a control is intended to achieve from how it is implemented.",
        keyTopics: [
          "Categories: technical, managerial, operational, physical",
          "Types: preventive, deterrent, detective, corrective, compensating, directive",
          "One control can have several types: what matters is the function the scenario asks for",
        ],
      },
      {
        code: "1.2",
        outcome: "Apply CIA, authentication, authorization, accounting, non-repudiation, zero trust, gap analysis, physical security, and deception to a scenario.",
        keyTopics: [
          "CIA and non-repudiation",
          "AAA: authenticating people and systems, authorization models, accounting",
          "Gap analysis: current state compared with the target state",
          "Zero trust, control plane: adaptive identity, threat scope reduction, policy-driven access control, Policy Engine, Policy Administrator",
          "Zero trust, data plane: implicit trust zones, subject/system, Policy Enforcement Point",
          "Physical security: bollards, access control vestibule, fencing, video surveillance, security guard, access badge, lighting",
          "Sensors: infrared, pressure, microwave, ultrasonic",
          "Deception: honeypot, honeynet, honeyfile, honeytoken",
        ],
      },
      {
        code: "1.3",
        outcome: "Evaluate secure change through ownership, impact, approval, testing, rollback, documentation, and monitoring.",
        keyTopics: [
          "Processes: approval process, ownership, stakeholders, impact analysis, test results, backout plan, maintenance window, standard operating procedure",
          "Technical implications: allow lists/deny lists, restricted activities, downtime, service restart, application restart, legacy applications, dependencies",
          "Documentation: updating diagrams, policies, and procedures",
          "Version control",
        ],
      },
      {
        code: "1.4",
        outcome: "Select algorithms, hashing, signatures, certificates, and key management for confidentiality, integrity, and identity requirements.",
        keyTopics: [
          "PKI: public key, private key, key escrow",
          "Encryption levels: full-disk, partition, file, volume, database, record",
          "Transport encryption, symmetric and asymmetric encryption, key exchange, algorithms, and key length",
          "Tools: TPM, HSM, key management system, secure enclave",
          "Obfuscation: steganography, tokenization, data masking",
          "Hashing, salting, digital signatures, key stretching",
          "Blockchain and open public ledger",
          "Certificates: certificate authorities, CRL, OCSP, self-signed, third-party, root of trust, CSR, wildcard",
        ],
      },
    ],
    studyPath: [
      { title: "1. Start with the requirement", rationale: "For every scenario, ask whether the primary need is confidentiality, integrity, availability, authenticity, or non-repudiation." },
      { title: "2. Classify the control", rationale: "Identify the category first (managerial, operational, technical, or physical), then the type (preventive, detective, corrective, deterrent, compensating, or directive)." },
      { title: "3. Remove implicit trust", rationale: "Study zero trust as a flow: the subject requests access, the Policy Engine decides, the Policy Administrator relays the decision, and the Policy Enforcement Point applies it. Then connect physical security and deception to the same idea of layered defense." },
      { title: "4. Map cryptography to the use case", rationale: "Encryption protects confidentiality; hashing detects change; a MAC adds shared authenticity; a digital signature provides integrity, authenticity, and non-repudiation." },
      { title: "5. Follow the life of keys and certificates", rationale: "Key pair generation, CSR, issuance by the CA, the chain up to the root of trust, revocation checking (CRL/OCSP), and custody of the private key in a TPM, HSM, or KMS." },
      { title: "6. Put change into a life cycle", rationale: "Secure change includes a baseline, impact and dependency analysis, approval, testing, a maintenance window, a backout plan, documentation updates, and post-implementation verification." },
    ],
    decisionPatterns: [
      "When a question asks for the BEST solution, translate the requirement into a security property before comparing technologies.",
      "A compensating control reduces risk when the primary control is not feasible; it is not automatically equivalent or an unapproved exception.",
      "For signatures, the sender signs with their private key and the recipient verifies with the sender's public key; encrypting with the recipient's public key instead addresses confidentiality.",
      "Zero trust: network location grants no trust. If the scenario asks WHO decides, the answer is the Policy Engine; if it asks WHO allows or blocks the connection, it is the Policy Enforcement Point.",
      "If the scenario asks how to detect an attacker who is already inside without touching production, think deception: any interaction with a honeypot, honeyfile, or honeytoken is suspicious by definition.",
      "To store passwords, choose hashing with a unique salt and key stretching (Argon2, bcrypt, PBKDF2): not reversible encryption and not a fast hash on its own.",
      "When you need current revocation status for a certificate, OCSP (preferably with stapling) beats a CRL, which is published at intervals.",
      "If the question asks what to prepare BEFORE a change, look for impact analysis, approval, testing, and a backout plan; AFTER the change, documentation updates and verification.",
    ],
    connections: [
      "Control classification supports mitigations (D2), architecture (D3), hardening and monitoring (D4), and governance and risk treatment (D5).",
      "PKI and key management reappear in TLS, authentication, data protection, incident response, and business continuity.",
      "Change management connects governance, secure configurations, introduced vulnerabilities, and rollback capability.",
      "Zero trust and AAA prepare identity and access management (D4) and segmentation choices in architecture (D3).",
      "Honeypots and honeytokens produce indicators used by SIEM, threat hunting, and incident response (D4).",
    ],
    comparisons: [
      {
        title: "Control types: when they act",
        headers: ["Type", "Function", "Example"],
        rows: [
          ["Preventive", "Stops the event from happening", "Firewall rule, MFA, door lock"],
          ["Deterrent", "Discourages the attempt without stopping it", "CCTV warning sign, lighting"],
          ["Detective", "Detects and records the event", "IDS, log review, motion sensor"],
          ["Corrective", "Restores normal operation after the event", "Restore from backup, patch after an incident"],
          ["Compensating", "Reduces risk when the primary control cannot be applied", "Isolating an unpatchable legacy system in a dedicated VLAN"],
          ["Directive", "States the expected behavior", "Policy, procedure, contractual obligation"],
        ],
      },
      {
        title: "Cryptographic primitives: what they guarantee",
        headers: ["Solution", "Guarantees", "Key used", "Does not guarantee"],
        rows: [
          ["Symmetric encryption (AES)", "Confidentiality, including for large volumes", "One shared secret key", "Sender identity, non-repudiation"],
          ["Asymmetric encryption (RSA, ECC)", "Confidentiality of small data and key exchange", "Recipient's public key", "Performance on large volumes"],
          ["Hash (SHA-256)", "Integrity: detects changes", "None", "Confidentiality, authenticity"],
          ["HMAC", "Integrity and authenticity between key holders", "Shared secret key", "Non-repudiation: both parties hold the key"],
          ["Digital signature", "Integrity, authenticity, and non-repudiation", "Signer's private key", "Confidentiality"],
        ],
      },
      {
        title: "Where keys live",
        headers: ["Tool", "What it is", "Typical clue in the question"],
        rows: [
          ["TPM", "Chip on the motherboard of a single device", "Disk encryption tied to hardware, measured boot"],
          ["HSM", "Dedicated, certified device for high-volume cryptographic operations", "CA keys, payments, many signatures per second"],
          ["Key management system", "Central service for the key life cycle", "Rotation, revocation, and auditing of keys across many systems or in the cloud"],
          ["Secure enclave", "Isolated area of the processor", "Protecting data and keys in use, even from a compromised operating system"],
        ],
      },
      {
        title: "Data obfuscation",
        headers: ["Technique", "What it does", "Reversible?"],
        rows: [
          ["Tokenization", "Replaces the data with a token; the mapping stays in a separate vault", "Yes, only through the vault"],
          ["Data masking", "Hides part of the displayed data, for example ****1234", "Usually not, on the masked copy"],
          ["Steganography", "Hides the very existence of data inside another file", "Yes, for whoever knows the method"],
        ],
      },
      {
        title: "Certificate revocation checking",
        headers: ["Mechanism", "How it works", "Weakness"],
        rows: [
          ["CRL", "The CA periodically publishes the list of revoked certificates", "Not updated immediately, list keeps growing"],
          ["OCSP", "The client asks a responder for the status of one certificate", "The responder sees which sites the client visits and must be reachable"],
          ["OCSP stapling", "The server attaches a recent, signed OCSP response to the connection", "Must be supported and configured on the server"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "Hashing encrypts data.", correction: "A hash is a one-way function: it detects changes but does not protect confidentiality and cannot be decrypted." },
      { misconception: "The salt must be kept secret.", correction: "The salt must be unique and random for every password, not secret: it defeats rainbow tables and forces each hash to be attacked separately." },
      { misconception: "Full-disk encryption also protects a computer that is on and unlocked.", correction: "Full-disk encryption protects data at rest, for example a stolen laptop that is powered off. On an unlocked system the data is available to the user and to malware." },
      { misconception: "A wildcard certificate covers every subdomain.", correction: "*.example.com covers one level (www.example.com) but not example.com or a.b.example.com." },
      { misconception: "A compensating control is the same as accepting the risk.", correction: "A compensating control reduces risk through an approved alternative measure; risk acceptance is a formal decision not to reduce it further." },
      { misconception: "A honeypot blocks attacks.", correction: "A honeypot exists to detect and study the attacker: it has no production value and does not stop attacks on real systems." },
      { misconception: "A longer key is always stronger, whatever the algorithm.", correction: "Key length is compared within the same family: a 256-bit ECC key offers security comparable to 3072-bit RSA." },
      { misconception: "The backout plan is written if the change fails.", correction: "The backout plan is prepared and verified before the maintenance window, as a condition for approving the change." },
    ],
    appliedScenario: {
      title: "Altered configuration package",
      prompt: "A team distributes signed configurations to appliances. The received file's hash does not match and its signature is invalid. What problem is demonstrated, and what is the safe FIRST action?",
      reasoning: "Integrity and authenticity have not been established, so the package must not be applied. Stop distribution, preserve the file and logs, verify the certificate, chain, and origin, then restart from the approved artifact through change management. Encrypting the file would not correct an invalid signature.",
    },
    practiceScenarios: [
      {
        objective: "1.1",
        title: "Unpatchable industrial system",
        prompt: "An industrial controller runs an operating system that is no longer supported, and the vendor forbids installing agents or patches. The team moves it to a dedicated VLAN, allows traffic only to the management console, and monitors that segment. How is this measure best classified?",
        reasoning: "It is a technical control of the compensating type: the primary control (patching) cannot be applied, and segmentation reduces the residual risk through an alternative measure. It is not corrective, because it does not repair an event that has already happened, and calling it merely preventive misses why it was chosen. It must be documented and approved as an exception.",
      },
      {
        objective: "1.2",
        title: "Contractor access under zero trust",
        prompt: "A contractor authenticates successfully with MFA, but their laptop does not have disk encryption enabled. Company policy requires compliant devices to reach the HR application. Which component makes the decision to deny access, and which one physically prevents it?",
        reasoning: "The Policy Engine evaluates identity, device posture, and context and decides to deny; the Policy Administrator relays the decision; the Policy Enforcement Point blocks the session. This is an example of adaptive identity and policy-driven access control: a valid credential is not enough if the context is not compliant.",
      },
      {
        objective: "1.2",
        title: "Decoy cloud key in the repository",
        prompt: "The team places a fake cloud access key with no real permissions in an internal repository and configures an alert if anyone tries to use it. Three months later the alert fires from an external address. What technology was used, and what does the alert prove?",
        reasoning: "It is a honeytoken, a deception technique. No legitimate user has any reason to use it, so the alert is a high-confidence indicator that the repository content has been exposed or copied. The correct response is to start incident response on the repository and the real credentials, not just to delete the token.",
      },
      {
        objective: "1.3",
        title: "Patch that restarts a shared service",
        prompt: "A critical patch for the web server requires a service restart. The same server hosts an API used by the ERP system, and workstations enforce a hash-based application allow list. What must the change request contain before approval?",
        reasoning: "An impact analysis that includes dependencies (the API and the ERP), a maintenance window agreed with stakeholders, test results from a staging environment, a verified backout plan, and an allow list update if binary hashes change. After the change, diagrams and procedures must be updated and the change tracked in the configuration version control.",
      },
      {
        objective: "1.4",
        title: "Password storage for a new portal",
        prompt: "A new customer portal must store user passwords. One developer proposes AES-256 with the key in the configuration file; another proposes plain SHA-256. Which solution is BEST?",
        reasoning: "Neither: use a key stretching algorithm such as Argon2id, bcrypt, or PBKDF2 with a unique salt per user. AES is reversible, so whoever obtains the key obtains every password; SHA-256 on its own is too fast and, without a salt, exposed to rainbow tables.",
      },
      {
        objective: "1.4",
        title: "Revocation after key compromise",
        prompt: "The private key behind a public website's certificate has been exposed. The certificate is revoked, but some clients keep accepting it for hours. Which mechanism shortens this window without burdening every client?",
        reasoning: "OCSP stapling: the server attaches a recent, signed OCSP response to the connection, so the client learns the certificate status without downloading a CRL, which is only updated periodically. A new key pair with a new CSR is still required: reissuing the certificate with the same key does not fix the compromise.",
      },
    ],
    readinessChecks: [
      "You can distinguish the category and type of the same control without confusing them.",
      "You can justify a choice among hashing, MAC, digital signature, and encryption.",
      "You can order a change from requirement through post-implementation verification.",
      "You can state the role of the Policy Engine, Policy Administrator, and Policy Enforcement Point.",
      "You can choose among TPM, HSM, key management system, and secure enclave from the scenario.",
      "You can explain CSR, certificate chain, CRL, and OCSP, and the limit of a wildcard certificate.",
    ],
  },
  2: {
    domainId: 2,
    title: "Threats, Vulnerabilities, and Mitigations",
    weight: 22,
    purpose: "Turns technical indicators and business context into a reasoning chain: actor and motivation → vector and attack surface → vulnerability → indicators → mitigation. The goal is to separate cause from effect and select the most specific control that interrupts the attack.",
    objectives: [
      {
        code: "2.1",
        outcome: "Compare actors, attributes, and motivations to estimate capability, intent, access, and likelihood.",
        keyTopics: [
          "Actors: nation-state, unskilled attacker, hacktivist, insider threat, organized crime, shadow IT",
          "Attributes: internal/external, resources/funding, level of sophistication/capability",
          "Motivations: data exfiltration, espionage, service disruption, blackmail, financial gain, philosophical/political beliefs, ethical, revenge, disruption/chaos, war",
        ],
      },
      {
        code: "2.2",
        outcome: "Analyze vectors and attack surfaces, including social engineering, supply chain, cloud, wireless, and removable media.",
        keyTopics: [
          "Message-based: email, SMS, instant messaging; image-based, file-based, voice call",
          "Removable device, vulnerable software (client-based and agentless), unsupported systems and applications",
          "Unsecure networks: wireless, wired, Bluetooth; open service ports; default credentials",
          "Supply chain: managed service providers (MSP), vendors, suppliers",
          "Human vectors: phishing, vishing, smishing, misinformation/disinformation, impersonation, business email compromise, pretexting, watering hole, brand impersonation, typosquatting",
        ],
      },
      {
        code: "2.3",
        outcome: "Recognize application, hardware, cloud, virtualization, mobile, cryptographic, and configuration vulnerabilities.",
        keyTopics: [
          "Application: memory injection, buffer overflow, race conditions (time-of-check, time-of-use), malicious update",
          "Operating system (OS)-based; web-based: SQL injection (SQLi), cross-site scripting (XSS)",
          "Hardware: firmware, end-of-life, legacy",
          "Virtualization: VM escape, resource reuse; cloud-specific",
          "Supply chain: service provider, hardware provider, software provider",
          "Cryptographic, misconfiguration, zero-day",
          "Mobile device: side loading, jailbreaking",
        ],
      },
      {
        code: "2.4",
        outcome: "Interpret indicators of malware, network, credential, application, and anomalous-behavior attacks.",
        keyTopics: [
          "Malware: ransomware, trojan, worm, spyware, bloatware, virus, keylogger, logic bomb, rootkit",
          "Physical attacks: brute force, RFID cloning, environmental",
          "Network attacks: DDoS (amplified, reflected), DNS attacks, wireless, on-path, credential replay, malicious code",
          "Application attacks: injection, buffer overflow, replay, privilege escalation, forgery, directory traversal",
          "Cryptographic attacks: downgrade, collision, birthday",
          "Password attacks: spraying, brute force",
          "Indicators: account lockout, concurrent session usage, blocked content, impossible travel, resource consumption, resource inaccessibility, out-of-cycle logging, published/documented, missing logs",
        ],
      },
      {
        code: "2.5",
        outcome: "Select vector-aligned mitigations: segmentation, hardening, patching, least privilege, allowlisting, isolation, and monitoring.",
        keyTopics: [
          "Segmentation, access control (ACL, permissions), application allow list, isolation",
          "Patching, encryption, monitoring, least privilege, configuration enforcement, decommissioning",
          "Hardening: encryption, installation of endpoint protection, host-based firewall, host-based intrusion prevention system (HIPS), disabling ports/protocols, default password changes, removal of unnecessary software",
        ],
      },
    ],
    studyPath: [
      { title: "1. Model the adversary", rationale: "Capability, resources, sophistication, internal or external access, and motivation change both likelihood and control priorities." },
      { title: "2. Follow the attack path", rationale: "Separate initial access, execution, persistence, privilege escalation, lateral movement, command and control, and exfiltration." },
      { title: "3. Read indicators in context", rationale: "One event rarely proves an incident; correlate identity, host, network, time, baseline, and intelligence." },
      { title: "4. Mitigate cause and spread", rationale: "Prefer the control that removes or reduces the vulnerability; add segmentation and detection to limit blast radius and dwell time." },
      { title: "5. Recognize the attack family", rationale: "Before choosing the control, decide whether the symptom points to malware or to a credential, network, application, or cryptographic attack: each family has different typical mitigations." },
      { title: "6. Shrink the surface before the incident", rationale: "Hardening, changing default credentials, closing unneeded ports and protocols, removing unnecessary software, and decommissioning end-of-life systems take the easiest vectors away from the attacker." },
    ],
    decisionPatterns: [
      "Do not confuse vector, vulnerability, and exploit: the vector is the path, the vulnerability is the weakness, and the exploit is the means that abuses it.",
      "For the FIRST action during an active attack, consider human safety and containment; for the permanent correction, remove the cause and verify effectiveness.",
      "A mitigation is better when it interrupts the observed technique with the least acceptable operational impact, not when it is simply the strongest control.",
      "Many accounts, few attempts each, with common passwords: that is password spraying. Many attempts against one account until lockout: that is brute force.",
      "Impossible travel or concurrent sessions on the same account point to compromised credentials or tokens: revoke the sessions rather than only changing the password.",
      "Missing logs and out-of-cycle logging suggest someone is covering their tracks: preserve evidence and compare with the logs forwarded to a central system.",
      "If an attacker forces the use of an old protocol version, it is a downgrade attack: the mitigation is disabling the weak versions, not adding another control downstream.",
      "Shadow IT is unauthorized technology usually adopted for convenience, not to cause harm: the response is governance and an approved alternative, not treating it as a malicious insider.",
    ],
    connections: [
      "Mitigations depend on the architectural models and trust boundaries in D3.",
      "Indicators, vulnerability management, SIEM, and incident response become operational processes in D4.",
      "Threat intelligence, risk appetite, and remediation priority depend on governance and risk in D5.",
      "Control types and zero trust from D1 provide the vocabulary for classifying every mitigation in this domain.",
      "Supply chain risk connects vendor assessment and contracts in D5 to the vulnerabilities of malicious updates and service providers.",
    ],
    comparisons: [
      {
        title: "Threat actors",
        headers: ["Actor", "Typical motivation", "Resources and capability", "Clue in the scenario"],
        rows: [
          ["Nation-state", "Espionage, war, service disruption", "Very high, long-term persistence (APT)", "Strategic targets, custom tools, patient attacks"],
          ["Organized crime", "Financial gain, blackmail", "High, organized like a business", "Ransomware, extortion, payment fraud"],
          ["Hacktivist", "Philosophical/political beliefs", "Variable", "Defacement, DDoS, publishing data for a cause"],
          ["Insider threat", "Revenge, financial gain", "Legitimate internal access", "Abuse of existing permissions, activity outside hours or role"],
          ["Unskilled attacker", "Disruption/chaos, notoriety", "Low, ready-made tools", "Noisy attacks with public tools and no adaptation"],
          ["Shadow IT", "Convenience, productivity", "Internal, without malicious intent", "Cloud services or devices not approved by IT"],
        ],
      },
      {
        title: "Malware families",
        headers: ["Type", "How it works", "Typical clue"],
        rows: [
          ["Virus", "Attaches to a file or program and spreads when it runs", "Infected files multiplying after being opened"],
          ["Worm", "Spreads on its own across the network by exploiting a vulnerability", "Scanning traffic and fast infections with no user action"],
          ["Trojan", "Poses as legitimate software and opens access", "A program downloaded from an unofficial source that contacts an external server"],
          ["Ransomware", "Encrypts or steals data and demands a ransom", "Changed file extensions, ransom note, spike in disk writes"],
          ["Rootkit", "Hides at kernel or firmware level", "Processes and files invisible to the tools of the compromised system"],
          ["Logic bomb", "Activates when a condition or date is met", "Damage starting at a precise moment, often after an employee leaves"],
          ["Keylogger", "Records keystrokes", "Stolen credentials even with strong passwords"],
          ["Spyware", "Collects user activity and data", "Traffic to third parties, changed browser settings"],
          ["Bloatware", "Unnecessary preinstalled software", "More attack surface and resources used with no benefit"],
        ],
      },
      {
        title: "Credential and cryptographic attacks",
        headers: ["Attack", "How it works", "Main mitigation"],
        rows: [
          ["Brute force", "Many attempts against the same account", "Lockout after failed attempts, MFA, strong passwords"],
          ["Password spraying", "A few common passwords tried against many accounts", "MFA, banning common passwords, detection of distributed attempts"],
          ["Credential replay", "Reuse of captured credentials or hashes", "MFA, encrypted channels, modern authentication protocols"],
          ["Downgrade", "Forces the use of a weak protocol version", "Disabling obsolete versions and ciphers"],
          ["Collision / birthday", "Finds two inputs with the same hash", "Hash algorithms with longer output, such as SHA-256"],
        ],
      },
      {
        title: "Application attacks",
        headers: ["Attack", "What it exploits", "Main mitigation"],
        rows: [
          ["SQL injection", "Input placed into a database query", "Parameterized queries and input validation"],
          ["Cross-site scripting", "Script executed in another victim's browser", "Output encoding and Content Security Policy"],
          ["Directory traversal", "Paths such as ../ to escape the intended folder", "Path normalization and least privilege on the file system"],
          ["Buffer overflow", "Writing beyond the bounds of a memory area", "Bounds checking, memory-safe languages, DEP and ASLR"],
          ["Race condition", "The gap between checking and using a resource (TOCTOU)", "Atomic operations and locks on resources"],
          ["Replay", "Reuse of a captured valid request", "Nonces, timestamps, and expiring session tokens"],
          ["Forgery", "A forged request on behalf of the victim or the server", "Anti-CSRF tokens, SameSite cookies, destination filtering for SSRF"],
        ],
      },
      {
        title: "Indicators of malicious activity",
        headers: ["Indicator", "What it may mean", "First check"],
        rows: [
          ["Account lockout", "Brute force against the account", "Origin and number of attempts"],
          ["Concurrent session usage", "Credentials used by two parties", "Devices and addresses of the active sessions"],
          ["Impossible travel", "Access from incompatible locations in a short time", "Location, corporate VPNs, and session validity"],
          ["Blocked content", "Attempts to reach malicious sites or files", "Host and user that triggered the block"],
          ["Resource consumption", "Mining, exfiltration, or DDoS in progress", "Processes and connections consuming resources"],
          ["Resource inaccessibility", "Ransomware or denial of service", "Encrypted files or saturated services"],
          ["Out-of-cycle logging", "Activity at unusual times or moments", "Who was authorized to operate at that time"],
          ["Missing logs", "Tracks being deleted", "Comparison with the logs forwarded to a central system"],
          ["Published/documented", "Data or vulnerabilities already made public", "Verifying the source and the real exposure"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "A worm needs the user to open a file.", correction: "A worm spreads on its own by exploiting a network vulnerability; it is a virus that requires an infected file or program to be executed." },
      { misconception: "Password spraying and brute force are the same thing.", correction: "Brute force tries many passwords against one account and causes lockouts; spraying tries a few common passwords against many accounts to stay below the lockout threshold." },
      { misconception: "After an account compromise, changing the password is enough.", correction: "Sessions, OAuth tokens, and persistence rules can remain valid: they must be revoked and removed, and the cause of the access must be found." },
      { misconception: "Shadow IT is a malicious insider threat.", correction: "Shadow IT usually comes from convenience and productivity: it is a risk to govern with policy and approved alternatives, not an intentional attack." },
      { misconception: "Nothing can be done against a zero-day vulnerability.", correction: "Without a patch, compensating controls apply: segmentation, least privilege, allow lists, behavioral detection, and reducing the exposed surface." },
      { misconception: "Cross-site scripting attacks the database directly.", correction: "XSS runs scripts in another victim's browser; it is SQL injection that manipulates database queries." },
      { misconception: "Reflected and amplified DDoS are synonyms.", correction: "In a reflected attack the attacker spoofs the victim's address as the sender; in an amplified attack it abuses services that reply with far more data than the request. They are often combined." },
      { misconception: "An end-of-life system is protected by regular patching.", correction: "An end-of-life system no longer receives patches: it needs isolation, compensating controls, and a decommissioning plan." },
    ],
    appliedScenario: {
      title: "Cloud compromise with persistence",
      prompt: "After an anomalous sign-in, an account creates an email forwarding rule and authorizes an OAuth app. Which evidence should be correlated, and which controls actually interrupt the attack?",
      reasoning: "Correlate sign-in and MFA events, mailbox audit, OAuth consent, IP/device, and timeline. Contain by revoking sessions and tokens, disabling or restricting the account, and removing the malicious rule and app; then correct the cause with credential action, consent policy, phishing-resistant MFA, and monitoring. A password reset alone may leave tokens and persistence valid.",
    },
    practiceScenarios: [
      {
        objective: "2.1",
        title: "Unapproved file sharing",
        prompt: "The marketing team uses a personal cloud file-sharing service to exchange drafts with an agency because the corporate tool is slow. The files contain customer data. Which type of actor and which motivation best describe the situation, and what is the most suitable response?",
        reasoning: "It is shadow IT: an internal actor without malicious intent, motivated by convenience and productivity. The real risk is data exposure outside corporate controls. The response is to stop the sharing, assess the exposure, offer an approved alternative, and update the policy; treating it as a malicious insider would be disproportionate and would not fix the cause.",
      },
      {
        objective: "2.2",
        title: "Managed provider remote access",
        prompt: "A managed service provider (MSP) administers the servers through a remote access tool with a shared account and domain administrator privileges. The provider's tool is compromised. Which vector was used, and which controls would have limited the impact?",
        reasoning: "It is a supply chain vector through an MSP. The impact is limited by: named accounts with MFA for the provider, least privilege instead of domain privileges, time-limited access from dedicated systems, session monitoring, and contractual clauses on security and incident notification.",
      },
      {
        objective: "2.3",
        title: "Non-atomic check and use",
        prompt: "A service checks that a temporary file belongs to the user and, a few milliseconds later, opens it with elevated privileges. Between the two operations an attacker replaces the file with a link to a system file. Which vulnerability is being exploited?",
        reasoning: "It is a time-of-check to time-of-use (TOCTOU) race condition: the verified state changes before use. The fix is to make the operation atomic, for example opening the file once and checking permissions on the already open descriptor, and to run the service with the minimum privileges required.",
      },
      {
        objective: "2.4",
        title: "One attempt per account",
        prompt: "Within twenty minutes the authentication system records a single failed sign-in for each of 900 different accounts, all from the same external network and with the same seasonal password. No account is locked out, and one succeeds. Which attack is under way, and which indicator reveals it?",
        reasoning: "It is password spraying: a few common passwords against many accounts to stay below the lockout threshold. The indicator is not account lockout but the distribution of failed attempts by origin and password. The response is to block the origin, reset the compromised account's credentials while revoking its sessions, enforce MFA, and ban common passwords.",
      },
      {
        objective: "2.4",
        title: "A missing hour in the logs",
        prompt: "During an investigation of a server, the local log has no events between 02:00 and 03:00, while the SIEM received a burst of administrative events from that server just before the gap. What do these indicators suggest, and how do you proceed?",
        reasoning: "Missing logs after out-of-hours administrative activity suggest someone deleted their tracks. Preserve the server image and the central logs, which are authoritative because they were forwarded before the deletion, rebuild the timeline from the SIEM, and check which administrative accounts were active. The gap in the logs is itself evidence.",
      },
      {
        objective: "2.5",
        title: "Kiosk in a public area",
        prompt: "A public information kiosk runs a general-purpose operating system with default credentials, accessible USB ports, preinstalled trial software, and unnecessary network services. Which set of hardening measures is most appropriate?",
        reasoning: "Change the default credentials, disable unneeded ports and protocols including USB and network services, remove unnecessary software, apply an application allow list that permits only the kiosk app, enable a host-based firewall and endpoint protection, and isolate the kiosk in a dedicated segment. Each measure removes a specific vector from the scenario.",
      },
    ],
    readinessChecks: [
      "You can reconstruct an essential attack chain from logs and symptoms.",
      "You can distinguish a vulnerability from an indicator of its exploitation.",
      "You can justify a primary mitigation and a compensating control for the same scenario.",
      "You can match each actor to its typical motivation and available resources.",
      "You can tell virus, worm, trojan, rootkit, and logic bomb apart from their clues.",
      "You can recognize password spraying, credential replay, and downgrade from the indicators.",
    ],
  },
  3: {
    domainId: 3,
    title: "Security Architecture",
    weight: 18,
    purpose: "Requires protections that fit cloud, on-premises, hybrid, virtualized, and zero-trust models. Every choice should be evaluated against trust boundaries, shared responsibilities, data flows, availability, scalability, and attack surface.",
    objectives: [
      {
        code: "3.1",
        outcome: "Compare models and infrastructure: cloud service and deployment models, virtualization, containers, IoT/OT, serverless, and IaC.",
        keyTopics: [
          "Cloud: responsibility matrix, hybrid considerations, third-party vendors",
          "Infrastructure as code (IaC), serverless, microservices, on-premises, centralized vs decentralized",
          "Network: physical isolation (air-gapped), logical segmentation, software-defined networking (SDN)",
          "Containerization, virtualization, IoT, industrial control systems (ICS)/SCADA, real-time operating system (RTOS), embedded systems, high availability",
          "Considerations: availability, resilience, cost, responsiveness, scalability, ease of deployment, risk transference, ease of recovery, patch availability, inability to patch, power, compute",
        ],
      },
      {
        code: "3.2",
        outcome: "Apply security principles to segmentation, zones, remote access, network devices, protocols, and trust boundaries.",
        keyTopics: [
          "Device placement, security zones, attack surface, connectivity",
          "Failure modes: fail-open, fail-closed; device attribute: active vs passive, inline vs tap/monitor",
          "Network appliances: jump server, proxy server, IPS/IDS, load balancer, sensors",
          "Port security: 802.1X, EAP",
          "Firewall types: web application firewall (WAF), unified threat management (UTM), next-generation firewall (NGFW), layer 4/layer 7",
          "Secure communication and access: VPN, remote access, tunneling (TLS, IPSec), SD-WAN, secure access service edge (SASE)",
          "Selection of effective controls",
        ],
      },
      {
        code: "3.3",
        outcome: "Protect data by state, classification, and life cycle using encryption, tokenization, masking, DLP, and access control.",
        keyTopics: [
          "Data types: regulated, trade secret, intellectual property, legal information, financial information, human- and non-human-readable",
          "Classifications: sensitive, confidential, public, restricted, private, critical",
          "Data states: data at rest, data in transit, data in use; data sovereignty, geolocation",
          "Methods: geographic restrictions, encryption, hashing, masking, tokenization, obfuscation, segmentation, permission restrictions",
        ],
      },
      {
        code: "3.4",
        outcome: "Design resilience and recovery with redundancy, clustering, backups, alternate sites, testing, and RTO/RPO objectives.",
        keyTopics: [
          "High availability: load balancing vs clustering",
          "Site considerations: hot, cold, warm, geographic dispersion; platform diversity, multi-cloud systems",
          "Continuity of operations; capacity planning: people, technology, infrastructure",
          "Testing: tabletop exercises, fail over, simulation, parallel processing",
          "Backups: onsite/offsite, frequency, encryption, snapshots, recovery, replication, journaling",
          "Power: generators, uninterruptible power supply (UPS)",
        ],
      },
    ],
    studyPath: [
      { title: "1. Draw boundaries and flows", rationale: "Identify users, workloads, data, ingress and egress, control plane, data plane, and crossings between trust levels." },
      { title: "2. Assign responsibilities", rationale: "In cloud, the provider secures underlying infrastructure while the customer retains varying responsibility for data, identities, configurations, and workloads." },
      { title: "3. Apply defense in depth", rationale: "Combine identity, segmentation, secure protocols, hardening, monitoring, and data protection without relying on a single perimeter." },
      { title: "4. Design for failure", rationale: "Align high availability and disaster recovery to the BIA: RTO guides restoration time, RPO tolerable data loss, and MTD the maximum sustainable limit." },
      { title: "5. Place and configure the appliances", rationale: "For every device decide its zone, inline or tap mode, behavior on failure (fail-open or fail-closed), and whether it must block or only detect." },
      { title: "6. Classify before you protect", rationale: "Data type, classification, state, and jurisdiction determine the control: encryption, tokenization, masking, geographic or permission restrictions." },
    ],
    decisionPatterns: [
      "Zero trust does not mean trusting the internal network: verify explicitly, enforce least privilege, and continuously assess identity, device, resource, and context.",
      "High availability keeps service running through local failures; disaster recovery restores capability after a major event. They can coexist but are not synonyms.",
      "Segmentation limits lateral movement only when traffic between segments is explicitly controlled and monitored.",
      "If the requirement is to block an attack in real time you need an inline device (IPS, NGFW, WAF); if it is only to observe without touching traffic, a passive sensor on a tap or monitoring port is enough (IDS).",
      "Fail-closed favors confidentiality, fail-open favors availability: choose based on what the organization cannot afford to lose, and remember that people safety comes first.",
      "For ICS/SCADA, RTOS, or embedded systems that cannot be updated, the typical answer is isolation or segmentation with compensating controls, not patching.",
      "For web applications the specific protection is the WAF (layer 7); for a single all-in-one appliance in a small office it is the UTM; to filter by application and user it is the NGFW.",
      "Replication does not replace backup: it also copies deletions and ransomware encryption. Restoring requires a versioned, isolated, or immutable copy.",
    ],
    connections: [
      "D1 cryptographic requirements become concrete choices for data at rest, in transit, and in use.",
      "D2 vulnerabilities help evaluate architectural attack surface and compensating controls.",
      "D4 monitoring and IAM operationalize zero trust and segmentation; D5 BIA and governance set resilience requirements.",
      "Data sovereignty and classification connect architecture to the compliance and privacy obligations in D5.",
      "Failover tests and tabletop exercises are the same tool used by incident response in D4.",
    ],
    comparisons: [
      {
        title: "Shared responsibility in the cloud",
        headers: ["Model", "The provider manages", "The customer manages"],
        rows: [
          ["IaaS", "Data center, hardware, physical network, hypervisor", "Operating system, patches, applications, data, identities, network configuration"],
          ["PaaS", "Also the operating system and platform runtime", "Application code, data, identities, service configuration"],
          ["SaaS", "Also the application", "Data, users and permissions, application security configuration"],
        ],
      },
      {
        title: "Network appliances and placement",
        headers: ["Appliance", "Typical mode", "Purpose"],
        rows: [
          ["IDS", "Passive, on a tap or monitoring port", "Detects and raises alerts, does not block"],
          ["IPS", "Inline, active", "Detects and blocks malicious traffic"],
          ["WAF", "Inline in front of the web application (layer 7)", "Blocks SQL injection, XSS, and HTTP attacks"],
          ["NGFW", "Inline at the perimeter or between zones", "Filters by application, user, and content, not only by port"],
          ["UTM", "Inline, single appliance", "Firewall, antivirus, web filter, and VPN in one device"],
          ["Jump server", "In an administration zone", "A single, controlled point for administering internal systems"],
          ["Proxy server", "Between clients and the Internet", "Filters, logs, and brokers requests"],
          ["Load balancer", "In front of a group of servers", "Distributes load and removes failed nodes"],
        ],
      },
      {
        title: "Behavior on failure",
        headers: ["Mode", "What happens if the device fails", "When it is chosen"],
        rows: [
          ["Fail-open", "Traffic passes without inspection", "When availability matters more than filtering"],
          ["Fail-closed", "Traffic is blocked", "When confidentiality matters more than availability"],
        ],
      },
      {
        title: "Alternate sites",
        headers: ["Site", "Activation time", "Cost", "Contents"],
        rows: [
          ["Hot site", "Minutes or hours", "High", "Up-to-date hardware, software, and data, ready to take over"],
          ["Warm site", "Hours or days", "Medium", "Hardware and connectivity, data to be restored"],
          ["Cold site", "Days or weeks", "Low", "Space, power, and cooling, little or nothing installed"],
        ],
      },
      {
        title: "Data copy techniques",
        headers: ["Technique", "What it does", "Limit"],
        rows: [
          ["Offsite backup", "A copy kept away from the primary site", "Restoring takes time"],
          ["Snapshot", "An image of a system or volume at one instant", "If it stays on the same storage it does not protect against that storage failing"],
          ["Replication", "Continuous copy of data to another system", "Also replicates deletions and data encrypted by ransomware"],
          ["Journaling", "Records every change and allows restoring to a precise instant", "Needs space and a clean starting point"],
        ],
      },
      {
        title: "Data states",
        headers: ["State", "Example", "Typical protection"],
        rows: [
          ["Data at rest", "Database, disk, backup", "Disk, database, or record encryption, permissions"],
          ["Data in transit", "Traffic between client and server", "TLS, IPSec, VPN"],
          ["Data in use", "Data in memory during processing", "Secure enclave, access control, on-screen masking"],
        ],
      },
    ],
    commonTraps: [
      { misconception: "Load balancing and clustering are the same thing.", correction: "Load balancing distributes requests across several active nodes; clustering makes several nodes work as a single system and provides failover when one goes down." },
      { misconception: "An IDS blocks attacks.", correction: "An IDS is passive: it detects and alerts. Blocking requires an inline device such as an IPS." },
      { misconception: "A VLAN is equivalent to an air gap.", correction: "A VLAN is logical segmentation on the same infrastructure; an air gap is physical isolation, with no network connection at all." },
      { misconception: "With replication, backups are no longer needed.", correction: "Replication immediately copies errors, deletions, and files encrypted by ransomware as well; versioned, isolated, or immutable backups are required." },
      { misconception: "In SaaS, security is entirely the provider's job.", correction: "Even in SaaS the customer remains responsible for data, users, permissions, and the application's security configuration." },
      { misconception: "A hot site guarantees no data loss.", correction: "A hot site reduces restoration time (RTO); data loss (RPO) depends on how often data is replicated or copied." },
      { misconception: "Data sovereignty and geolocation are synonyms.", correction: "Data sovereignty states which laws apply to data based on the country where it resides; geolocation determines where a device or user is and is used to enforce geographic restrictions." },
      { misconception: "A UPS keeps systems running through a long blackout.", correction: "A UPS covers the short interruption and the time needed for the generator to start, which sustains long blackouts." },
    ],
    appliedScenario: {
      title: "Hybrid service with a tight RPO",
      prompt: "A critical portal uses public APIs and an on-premises database. The BIA requires a 2-hour RTO and a 15-minute RPO. Which architectural decisions are necessary?",
      reasoning: "Separate public, application, and data tiers with allowlisted flows; apply workload identity and centralized logging. Replicate or back up frequently enough to meet 15 minutes and provide tested alternate capacity within 2 hours. A daily backup or cold site does not automatically meet the objectives, even if it lowers cost.",
    },
    practiceScenarios: [
      {
        objective: "3.1",
        title: "Industrial plant that cannot be updated",
        prompt: "A water treatment plant uses a SCADA system whose controllers run a certified RTOS: the vendor releases no patches, and every change would require recertification. Management wants to connect the plant to the corporate network for real-time reports. What is the most suitable architectural approach?",
        reasoning: "Because the systems cannot be updated (inability to patch), protection must come from the architecture: a separate ICS network, connected to the corporate network only through an intermediate zone with one-way or tightly limited flows, passive monitoring of industrial traffic, and maintenance access through a jump server. If the security requirement outweighs the reporting one, the choice remains an air gap.",
      },
      {
        objective: "3.2",
        title: "IPS in front of a critical service",
        prompt: "A hospital places an inline IPS in front of the system that sends test results to the wards. The team debates whether to configure it fail-open or fail-closed. Which elements decide the choice?",
        reasoning: "What matters is what is unacceptable to lose. If an IPS failure interrupted the delivery of results and put patients at risk, availability prevails and fail-open is chosen, compensated by monitoring and alerts on the IPS failure. If the service exposed data whose confidentiality is the priority and an interruption were tolerable, fail-closed would be chosen. The decision must be documented and approved.",
      },
      {
        objective: "3.2",
        title: "Remote administrators",
        prompt: "System administrators often work off site and currently reach the servers through RDP exposed to the Internet. Which architecture reduces the attack surface while keeping access?",
        reasoning: "Close RDP to the Internet, route access through a VPN or a SASE service with MFA and device verification, and allow administration only from a jump server in a dedicated zone, with recorded sessions. The servers accept management connections only from the jump server, so a single controlled entry point replaces many exposed ports.",
      },
      {
        objective: "3.3",
        title: "European customer data in the cloud",
        prompt: "A company with customers in the EU wants to move its customer database to a cloud provider that, to save money, automatically replicates data to regions outside the EU. Which concepts are involved, and what must be configured?",
        reasoning: "Data sovereignty is involved: data is subject to the laws of the country where it resides, and for personal data of EU residents the GDPR restricts transfers. Configure geographic restrictions on the storage and replication regions, encryption with company-managed keys, and a classification of the data as regulated, while checking the provider's contractual clauses.",
      },
      {
        objective: "3.4",
        title: "Choosing the alternate site",
        prompt: "An e-commerce company has an 8-hour RTO and a 1-hour RPO, with a budget that does not allow a second fully active data center. Which combination of alternate site and data protection is most suitable?",
        reasoning: "A warm site, with hardware and connectivity already in place, can be activated within 8 hours without the cost of a hot site; a cold site would probably take longer. The 1-hour RPO requires replication or backups at least hourly to the alternate site. The plan must be verified with a failover test, not only with a tabletop exercise.",
      },
      {
        objective: "3.4",
        title: "Ransomware on the replicated database",
        prompt: "Ransomware encrypts the primary database. The synchronous replica in the second data center turns out to be encrypted as well a few seconds later. What was missing from the resilience architecture, and how is it restored?",
        reasoning: "Replication guarantees availability, but it immediately copies the encryption too. A versioned, isolated copy was missing: immutable snapshots, offline or offsite backups, or journaling that allows returning to an instant before the attack. Restoration starts from the last verified clean point, after removing the cause of the infection.",
      },
    ],
    readinessChecks: [
      "You can delimit customer and provider responsibilities in IaaS, PaaS, and SaaS.",
      "You can choose among segmentation, isolation, redundancy, and recovery based on the requirement.",
      "You can derive a backup and alternate-site solution from RTO, RPO, and MTD.",
      "You can choose between IDS and IPS, inline and tap, fail-open and fail-closed.",
      "You can tell WAF, NGFW, UTM, proxy, and jump server apart by their purpose.",
      "You can connect data state, classification, and jurisdiction to the protection method.",
    ],
  },
  4: {
    domainId: 4,
    title: "Security Operations",
    weight: 28,
    purpose: "The heaviest and most action-oriented domain. It measures the ability to operationalize controls through hardening, asset and vulnerability management, IAM, monitoring, automation, log analysis, and incident response. In FIRST/NEXT questions, action order is often decisive.",
    objectives: [
      { code: "4.1", outcome: "Apply baselines, hardening, patching, secure configuration, and protections for endpoints, mobile, wireless, applications, and cloud." },
      { code: "4.2", outcome: "Manage asset inventory, ownership, classification, life cycle, sanitization, and disposal." },
      { code: "4.3", outcome: "Perform vulnerability management from discovery through prioritization, remediation, rescanning, reporting, and exceptions." },
      { code: "4.4", outcome: "Analyze alerts and activity with logs, SIEM, scans, intelligence, and baselines to separate signal from noise." },
      { code: "4.5", outcome: "Configure enterprise controls such as firewalls, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR, and proxies." },
      { code: "4.6", outcome: "Implement IAM: provisioning, federation, MFA, authorization, least privilege, access review, and deprovisioning." },
      { code: "4.7", outcome: "Use automation and orchestration while evaluating repeatability, speed, integrations, errors, and propagation risk." },
      { code: "4.8", outcome: "Apply incident response and forensics while preserving evidence, communications, containment, and controlled return to production." },
      { code: "4.9", outcome: "Interpret network, authentication, endpoint, application, cloud, DNS, and email data sources and logs." },
    ],
    studyPath: [
      { title: "1. Know normal state", rationale: "Inventory, ownership, baselines, and time synchronization make vulnerabilities, drift, logs, and alerts interpretable." },
      { title: "2. Reduce exposure proactively", rationale: "Apply hardening, patching, least privilege, segmentation, and secure configuration according to criticality and compatibility." },
      { title: "3. Correlate before concluding", rationale: "Validate an alert with multiple sources, a timeline, identity, host, and context; preserve volatile data when forensic response requires it." },
      { title: "4. Respond in order", rationale: "Follow preparation; detection/analysis; containment; eradication; recovery; lessons learned, adapting containment to safety, impact, and authorization." },
    ],
    decisionPatterns: [
      "FIRST does not always mean power off: validate the event and consider volatile evidence, safety, and the response plan; during a confirmed attack, contain to limit harm.",
      "A scan identifies potential weaknesses; validation reduces false positives; prioritization combines severity, exploitability, exposure, asset value, and business context.",
      "Authentication proves who you are, authorization decides what you may do, and accounting records what you did; MFA requires factors from different categories.",
    ],
    connections: [
      "D1 primitives and controls become operational configurations, procedures, and checks.",
      "D2 TTPs, vulnerabilities, and indicators feed detection engineering, threat hunting, and prioritization.",
      "D3 architecture determines available logs and enforcement points; D5 governance determines escalation, retention, evidence handling, and reporting.",
    ],
    appliedScenario: {
      title: "PowerShell and DNS beaconing",
      prompt: "EDR flags obfuscated PowerShell on a workstation, and the SIEM shows periodic DNS queries to a newly registered domain. What is the correct operational sequence?",
      reasoning: "Validate and correlate the process, user, parent process, DNS, proxy, and authentication data; if confirmed, isolate the host while preserving required evidence. Scope other endpoints, eradicate persistence and the initial cause, restore from trusted state, and monitor for recurrence. Immediately deleting the file can destroy evidence and may not interrupt stolen credentials or persistence elsewhere.",
    },
    readinessChecks: [
      "You can order incident-response phases and justify the FIRST action.",
      "You can correlate at least three log sources into a coherent timeline.",
      "You can prioritize vulnerabilities beyond CVSS alone and verify remediation.",
      "You can distinguish authentication, authorization, federation, provisioning, and access review.",
    ],
  },
  5: {
    domainId: 5,
    title: "Security Program Management and Oversight",
    weight: 20,
    purpose: "Connects business goals, risk, and controls. It requires distinguishing governance, policies, standards, procedures, and guidelines; quantifying or qualifying risk; and managing third parties, compliance, privacy, audits, and awareness with verifiable evidence.",
    objectives: [
      { code: "5.1", outcome: "Establish governance through roles, responsibilities, policy hierarchy, reporting, data ownership, and strategic alignment." },
      { code: "5.2", outcome: "Manage risk through identification, analysis, the risk register, appetite/tolerance, responses, owners, monitoring, and BIA." },
      { code: "5.3", outcome: "Assess third-party risk across selection, due diligence, contracts, monitoring, incident notification, and offboarding." },
      { code: "5.4", outcome: "Apply compliance and privacy with attention to obligations, jurisdiction, minimization, retention, data subjects, and consequences." },
      { code: "5.5", outcome: "Distinguish audits and assessments, gather evidence, and track findings, remediation, attestations, and reporting." },
      { code: "5.6", outcome: "Build measurable, role-specific awareness and training adapted to behavior, threats, and culture." },
    ],
    studyPath: [
      { title: "1. Start with goals and authority", rationale: "Define who decides, who owns risk and data, which obligations apply, and which outcomes the program must support." },
      { title: "2. Assess risk", rationale: "Connect asset, threat, vulnerability, likelihood, and impact; document assumptions, inherent risk, controls, and residual risk." },
      { title: "3. Select and approve the response", rationale: "Mitigate, transfer, avoid, or accept must fit appetite/tolerance, cost, feasibility, ownership, and acceptance authority." },
      { title: "4. Demonstrate and improve", rationale: "Metrics, audits, assessments, tests, exceptions, training, and reviews turn governance into evidence and continuous improvement." },
    ],
    decisionPatterns: [
      "SLE = asset value × exposure factor; ALE = SLE × ARO. The estimate supports a decision but does not override legal requirements, safety, or risk appetite.",
      "RTO is the target for restoring a service, RPO the maximum tolerable data-loss interval, and MTD the maximum total sustainable outage; in a coherent plan, RTO does not exceed MTD.",
      "A policy states mandatory intent; a standard sets uniform requirements; a procedure describes steps; a guideline offers flexible recommendations.",
    ],
    connections: [
      "Risk treatment selects and justifies the controls studied in D1-D4.",
      "BIA, RTO, RPO, and MTD define requirements that D3 resilient architecture must implement and D4 must test.",
      "Privacy, retention, legal hold, and contracts affect logging, forensics, cloud, data management, and incident response.",
    ],
    appliedScenario: {
      title: "Vendor processing personal data",
      prompt: "A new SaaS will process critical personal data. Its questionnaire is positive, but the contract omits incident notification and data deletion. Can the risk be approved?",
      reasoning: "Technical due diligence does not replace contractual and privacy requirements. Record the risk and define the DPA, notification timelines, retention/deletion, subprocessors, audit rights, data return, and liability; then assess residual controls. Only the designated authority may accept residual risk, and it cannot waive an applicable legal obligation.",
    },
    readinessChecks: [
      "You can calculate SLE, ARO, and ALE and interpret their decision limits.",
      "You can distinguish risk appetite, tolerance, threshold, and inherent and residual risk.",
      "You can select the correct document or agreement and identify its owner and approver.",
      "You can turn an audit finding into tracked remediation with closure evidence.",
    ],
  },
};

export const OFFICIAL_DOMAIN_WEIGHTS = [12, 22, 18, 28, 20] as const;

export function getDomainGuide(domainId: number, lang: Lang): DomainGuide {
  const guides = lang === "en" ? EN_DOMAIN_GUIDES : IT_DOMAIN_GUIDES;
  return guides[domainId] ?? guides[1];
}

export const DOMAIN_GUIDES_IT = IT_DOMAIN_GUIDES;
export const DOMAIN_GUIDES_EN = EN_DOMAIN_GUIDES;
