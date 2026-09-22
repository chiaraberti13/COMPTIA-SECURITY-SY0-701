import { TopicGroup, Question } from "./types";

export const DOMAIN_1_TOPICS: TopicGroup[] = [
  {
    title: "1. Fondamentali d'Esame (Obj 1.2)",
    description: "Principi e concetti cardine della sicurezza delle informazioni.",
    icon: "ShieldAlert",
    subtopics: [
      {
        name: "CIA Triad",
        checklistKey: "CIATriad",
        definition: "I tre pilastri fondamentali della sicurezza delle informazioni: Riservatezza, IntegritÃ  e DisponibilitÃ .",
        details: "Comprensione profonda dei tre concetti chiave:\n* **Confidentiality (Riservatezza):** Impedire l'accesso non autorizzato ai dati. Tecniche abilitanti: cifratura dei dati (AES/RSA), liste di controllo degli accessi (ACL), autenticazione a piÃ¹ fattori (MFA) e controllo dell'accesso basato sui ruoli.\n* **Integrity (IntegritÃ ):** Garantire che i dati non vengano modificati, corrotti o distrutti in modo non autorizzato o accidentale durante il ciclo di vita. Tecniche abilitanti: funzioni di hash (SHA-256), firme digitali, somme di controllo (checksum) e controllo di versione.\n* **Availability (DisponibilitÃ ):** Garantire l'accesso costante, tempestivo e affidabile ai sistemi, alle reti e alle informazioni per tutti gli utenti legittimi e autorizzati. Tecniche abilitanti: ridondanza hardware (RAID, alimentatori ridondanti), clustering di server, backup geografici, gruppi di continuitÃ  (UPS) e piani di failover automatico.\n\n* **Piccolo Esempio Concentrato:** In un'applicazione bancaria, la **Riservatezza** impedisce ad altri clienti di leggere il saldo del tuo conto; l'**IntegritÃ ** impedisce a un malware di alterare l'importo di un bonifico in transito da 10â‚¬ a 10.000â‚¬; la **DisponibilitÃ ** garantisce che l'app di home banking sia attiva e funzionante anche sotto un attacco DDoS grazie a filtri di rete dedicati.",
        examTip: "In caso di ransomware, l'attacco compromette la DisponibilitÃ  (cifrando i file), ma potenzialmente anche l'IntegritÃ  e la Riservatezza in caso di estorsione multipla."
      },
      {
        name: "AAA",
        checklistKey: "AAAFramework",
        definition: "Authentication, Authorization, and Accounting: il framework standard per il controllo degli accessi.",
        details: "Il framework AAA governa l'intero ciclo di gestione delle identitÃ  e dei permessi di sicurezza:\n* **Authentication (Autenticazione):** Il processo di verifica dell'identitÃ  dichiarata da un soggetto (utente, servizio o dispositivo). Si basa sui quattro fattori dell'obiettivo 4.6: qualcosa che sai (password, PIN), qualcosa che hai (smart card, token OTP), qualcosa che sei (biometria) e dove ti trovi (geolocalizzazione, indirizzo IP).\n* **Authorization (Autorizzazione):** Il processo di determinazione di quali privilegi, permessi e risorse specifiche sono concessi all'identitÃ  precedentemente autenticata (es. accesso in sola lettura, permessi di scrittura, esecuzione di script).\n* **Accounting (Audit/TracciabilitÃ ):** La registrazione cronologica e sistematica di tutte le attivitÃ  eseguite dagli utenti all'interno dei sistemi (es. chi ha effettuato l'accesso, quali file ha modificato, a che ora si Ã¨ disconnesso) all'interno di log di audit protetti.\n\n* **Piccolo Esempio Concentrato:** Quando un dipendente striscia il proprio badge RFID per accedere a un ufficio di ricerca blindato, il lettore verifica che il badge sia valido (**Autenticazione**), sblocca la serratura solo se l'utente appartiene al gruppo dei ricercatori senior (**Autorizzazione**), e registra l'orario esatto del passaggio e l'ID dipendente nel registro elettronico centrale (**Accounting**).",
        examTip: "I log devono essere protetti in scrittura e archiviati separatamente per garantire l'efficacia dell'Accounting."
      },
      {
        name: "Non-Repudiation",
        checklistKey: "NonRepudiation",
        definition: "La proprietÃ  per cui chi ha compiuto un'azione non puÃ² poi negare credibilmente di averla compiuta, perchÃ© esiste una prova verificabile da un terzo.",
        details: "Il non ripudio si ottiene combinando **hashing** e **crittografia asimmetrica** nella firma digitale:\n* **Come si firma davvero:** il firmatario calcola l'**hash** del documento e, con la propria **chiave privata**, produce una **firma** usando un algoritmo di firma (RSA-PSS, ECDSA, Ed25519). Chi riceve il documento usa la **chiave pubblica** per **verificare** la firma, cioÃ¨ per stabilire se Ã¨ valida per quel documento e per quella chiave.\n* **Attenzione a una descrizione diffusa ma imprecisa:** si legge spesso che la firma Â«cifra l'hash con la chiave privataÂ» e che il destinatario Â«decifra la firmaÂ». Ãˆ un'analogia che descrive solo il vecchio schema RSA PKCS#1 v1.5; negli schemi moderni firmare **non Ã¨ cifrare** e verificare **non Ã¨ decifrare**. Soprattutto, firmare **non rende segreto** il documento: se serve anche riservatezza, la cifratura Ã¨ un'operazione a parte.\n* **Che cosa prova la firma:** **integritÃ ** (il documento non Ã¨ cambiato dopo la firma) e **origine** (Ã¨ stata usata quella chiave privata). Il salto dalla chiave alla **persona** non Ã¨ automatico: dipende dal fatto che la chiave sia davvero associata a quel soggetto (certificato, identity proofing) e che sia stata **custodita** bene. Una chiave privata rubata produce firme perfettamente valide.\n\n* **Piccolo Esempio Concentrato:** un investitore conferma un ordine premendo il pulsante del proprio token hardware protetto da PIN. Se il titolo crolla, la firma Ã¨ una **prova forte** che l'ordine Ã¨ partito dalla sua chiave: la banca puÃ² esibire la transazione firmata, i log e la procedura di consegna del token. Non Ã¨ perÃ² un divieto di contestare: l'investitore potrebbe sostenere che il token gli era stato sottratto, e sarÃ  il complesso delle prove, non la sola matematica, a stabilire chi ha ragione.",
        examTip: "La crittografia **simmetrica non fornisce non ripudio**: con una chiave condivisa fra due parti, nessuna puÃ² dimostrare a un terzo che Ã¨ stata l'altra a produrre il messaggio, perchÃ© entrambe avrebbero potuto. Serve una chiave **privata** posseduta da uno solo. **Trappola d'esame:** distingui firmare da cifrare â€” la firma dÃ  integritÃ , autenticazione dell'origine e non ripudio, ma **non** riservatezza; la cifratura dÃ  riservatezza ma **non** non ripudio. E ricorda che il non ripudio Ã¨ tanto solido quanto la custodia della chiave privata."
      },
      {
        name: "Gap Analysis",
        checklistKey: "GapAnalysis",
        definition: "Valutazione dello scostamento tra lo stato corrente di sicurezza e lo stato ideale o richiesto.",
        details: "Un'analisi formale utilizzata per confrontare la postura di sicurezza corrente dell'organizzazione con standard internazionali o requisiti normativi legali:\n* **Confronto Sistematico:** Si analizza lo stato attuale (Stato As-Is) rispetto a standard riconosciuti (es. ISO 27001, NIST CSF, PCI DSS) o politiche interne aziendali (Stato To-Be).\n* **Identificazione delle Carenze:** Evidenzia i controlli mancanti, inefficaci o parzialmente implementati.\n* **Pianificazione Strategica:** Fornisce una roadmap prioritaria e strutturata per guidare i budget e gli investimenti in cybersecurity.\n\n* **Piccolo Esempio Concentrato:** Una clinica medica vuole allinearsi allo standard HIPAA per la privacy. Esegue una Gap Analysis e scopre che tutti i computer degli infermieri rimangono attivi senza password dopo 5 minuti di inattivitÃ . Identificato questo 'gap' (scostamento), la clinica impone via policy il blocco automatico dello schermo dopo 60 secondi.",
        examTip: "La Gap Analysis viene eseguita prima di definire il budget o un nuovo piano strategico di sicurezza."
      },
      {
        name: "Zero Trust",
        checklistKey: "ZeroTrustIntro",
        definition: "Il framework di sicurezza moderno basato sul principio 'Never Trust, Always Verify'.",
        details: "Zero Trust elimina per sempre il concetto obsoleto di fiducia implicita basata semplicemente sul perimetro fisico di rete:\n* **Verifica Continua:** nessuna fiducia implicita deriva dalla **posizione di rete**. Prima di aprire una sessione verso la risorsa il sistema autentica il **soggetto** e valuta il **dispositivo**, poi applica una decisione di autorizzazione **dinamica**; la sessione resta monitorata e puÃ² essere rivalutata se il rischio cambia. Il traffico va protetto con protocolli adeguati, ma la **cifratura del canale Ã¨ una misura di protezione, non un fattore di autenticazione**: non sostituisce la decisione di accesso e non Ã¨ una regola di Â«cifrare la richiestaÂ» prima di deciderla.\n* **Least Privilege (Minimo Privilegio):** Limitare l'accesso degli utenti e dei sistemi esclusivamente al livello minimo necessario per svolgere la mansione attiva nel momento specifico.\n* **Assume Breach (Assumi la Compromissione):** Progettare, monitorare e difendere l'infrastruttura partendo dal presupposto che gli attaccanti si siano giÃ  infiltrati nella rete interna.\n\n* **Piccolo Esempio Concentrato:** Un dipendente si siede alla propria scrivania in ufficio e accende il PC aziendale. Nonostante sia collegato alla rete cablata interna, per accedere alla cartella condivisa del reparto finanziario deve superare una verifica MFA ed il sistema controlla che il suo sistema operativo abbia installato tutte le patch di sicurezza attive.",
        examTip: "La formula da ricordare Ã¨ **Â«mai fidarsi, verificare sempreÂ»**: autenticazione e autorizzazione sono **esplicite e dinamiche**, valutate a ogni richiesta e indipendenti dal punto della rete da cui arriva. **Trappola d'esame:** NIST SP 800-207 tiene separata la **decisione** di accesso (chi sei, che dispositivo usi, che rischio porti) dai **mezzi di protezione** del traffico (TLS, IPsec). La cifratura va applicata, ma non Ã¨ ciÃ² che autorizza: un canale cifrato verso una risorsa a cui non hai diritto resta un accesso da negare."
      },
      {
        name: "Policy-driven access control",
        checklistKey: "PolicyDrivenAccessControl",
        definition: "Un modello di controllo degli accessi in cui i permessi vengono valutati dinamicamente in tempo reale in base a regole e politiche predefinite.",
        details: "Caratteristiche del Policy-driven Access Control:\n* **Valutazione Dinamica:** A differenza dei modelli statici basati sui ruoli (RBAC), valuta molteplici fattori (identitÃ , dispositivo, posizione, ora) rispetto alle policy aziendali centralizzate.\n* **FlessibilitÃ  e GranularitÃ :** Consente di definire regole precise (es. 'Consenti l'accesso ai dati sensibili dei clienti solo se l'utente Ã¨ un account manager autorizzato, si collega tramite VPN aziendale e utilizza un dispositivo conforme').\n* **Integrazione Zero Trust:** Rappresenta il pilastro decisionale del Control Plane (gestito da Policy Engine e Policy Administrator).",
        examTip: "Nell'architettura Zero Trust, il Policy-driven Access Control Ã¨ il meccanismo del Control Plane che prende le decisioni di accesso esaminando una serie di regole e politiche aziendali prima di autorizzare la connessione."
      },
      {
        name: "Control Plane",
        checklistKey: "ControlPlaneZTA",
        definition: "L'area logica dell'architettura Zero Trust che ospita i motori decisionali preposti a ricevere, valutare e autorizzare o negare le richieste di accesso.",
        details: "Il ruolo del Control Plane in Zero Trust:\n* **Cervello Decisionale:** Riceve le richieste di connessione e raccoglie informazioni di contesto (telemetria delle minacce, identitÃ , stato del dispositivo).\n* **Componenti Chiave:** Contiene il **Policy Engine** (che valuta la richiesta rispetto alle politiche) e il **Policy Administrator** (che emette la decisione e ordina al Data Plane di stabilire o chiudere la connessione).\n* **Isolamento:** Le funzioni di controllo e decisione sono logicamente separate dal transito effettivo dei dati.",
        examTip: "Il Control Plane funge da cervello decisionale dell'architettura Zero Trust: riceve la richiesta d'accesso, la confronta con le policy e decide se autorizzare la sessione."
      },
      {
        name: "Implicit trust zones",
        checklistKey: "ImplicitTrustZones",
        definition: "Aree di rete o segmenti logici in cui tutti i dispositivi all'interno sono considerati intrinsecamente sicuri e fidati per impostazione predefinita.",
        details: "Il concetto di Implicit Trust Zones:\n* **Modello Perimetrale Classico:** Si basa sull'idea della 'fortezza con fossato' (Castle-and-Moat), dove l'esterno Ã¨ considerato ostile e l'interno viene *presunto* sicuro â€” ed Ã¨ proprio questa presunzione il difetto del modello.\n* **VulnerabilitÃ  Chiave:** Se un attaccante riesce a superare il perimetro esterno (es. tramite phishing o malware), ha accesso illimitato e incontrollato a tutta la zona interna (movimento laterale).\n* **Eliminazione in Zero Trust:** La filosofia Zero Trust mira ad abolire o ridurre al minimo assoluto le zone di fiducia implicita, esigendo la verifica continua per ogni singola transazione o richiesta.",
        examTip: "Le zone di fiducia implicita sono aree tipiche dei vecchi modelli di sicurezza perimetrale. Lo Zero Trust mira ad abolirle tramite la verifica continua e la microsegmentazione."
      },
      {
        name: "Data Plane",
        checklistKey: "DataPlaneZTA",
        definition: "L'area logica dell'architettura di rete responsabile del trasporto effettivo, del transito e dell'instradamento dei pacchetti di dati degli utenti.",
        details: "Il funzionamento del Data Plane:\n* **Braccio Operativo:** Non prende decisioni autonome. Si limita ad applicare materialmente i comandi di blocco o sblocco ricevuti dal Control Plane.\n* **Canale di Comunicazione:** Una volta che il Control Plane ha validato l'handshake e approvato la richiesta, stabilisce un tunnel o una connessione protetta per far transitare il traffico dei dati tra il client e la risorsa.\n* **Efficienza:** Ottimizzato per l'elaborazione ad altissima velocitÃ  dei pacchetti di dati (Layer 2, Layer 3, Layer 4).",
        examTip: "Il Data Plane si occupa del trasporto effettivo dei pacchetti di dati degli utenti una volta che la sessione Ã¨ stata autorizzata e consentita dal Control Plane."
      }
    ]
  },
  {
    title: "2. Security Controls (Obj 1.1)",
    description: "Categorie di controlli di sicurezza in base alla modalitÃ  di implementazione.",
    icon: "Lock",
    subtopics: [
      {
        name: "Technical",
        checklistKey: "TechnicalControls",
        definition: "Controlli di sicurezza implementati tramite soluzioni hardware, software o firmware.",
        details: "Chiamati anche controlli logici, utilizzano le tecnologie informatiche e di rete per far rispettare i requisiti di sicurezza dell'organizzazione:\n* **Firewall e IDS/IPS:** Filtri di rete, rilevamento delle intrusioni (IDS, fuori linea su una copia del traffico) e prevenzione delle intrusioni (IPS, **in linea**, quindi in grado di scartare i pacchetti â€” se configurato per bloccare e non in sola rilevazione).\n* **Crittografia dei Dati:** Cifratura delle informazioni in transito (TLS) e a riposo (AES).\n* **Gestione IdentitÃ :** Sistemi di Single Sign-On (SSO), agenti di autenticazione a piÃ¹ fattori (MFA) e controllo degli accessi biometrico digitale.\n* **Agenti Endpoint:** Antivirus, antimalware ed Endpoint Detection and Response (EDR).\n\n* **Piccolo Esempio Concentrato:** L'attivazione di una regola su un firewall aziendale che rileva e blocca automaticamente il traffico non crittografato sulla porta TCP 80, forzando l'uso della porta HTTPS 443, rappresenta un controllo di tipo tecnico.",
        examTip: "Qualsiasi misura di sicurezza che agisce direttamente sui sistemi informatici ed Ã¨ gestita da codice o dispositivi fisici di rete Ã¨ un controllo tecnico."
      },
      {
        name: "Operational",
        checklistKey: "OperationalControls",
        definition: "Controlli di sicurezza incentrati sugli aspetti umani, sul personale e sulle procedure quotidiane.",
        details: "Vengono eseguiti operativamente dalle persone (utenti, amministratori o team di sicurezza) in conformitÃ  con i requisiti aziendali:\n* **Security Awareness Training:** Corsi periodici di sensibilizzazione e simulazioni di attacchi phishing diretti ai dipendenti.\n* **Esercitazioni e Simulazioni:** Test dei piani di Disaster Recovery, simulazioni di incident response e ripristini da backup.\n* **Revisione dei Log:** L'attivitÃ  umana manuale o supervisionata di esame e ispezione dei registri di sistema alla ricerca di anomalie.\n* **Gestione Fisico-Operativa:** Controllo dell'inventario hardware, etichettatura fisica dei server e distruzione sicura dei documenti cartacei tritati.\n\n* **Piccolo Esempio Concentrato:** Un dipendente d'ufficio riceve una telefonata da qualcuno che sostiene di essere del supporto IT e chiede la sua password. Grazie all'addestramento ricevuto sul social engineering (controllo operativo), il dipendente rifiuta di condividere la password e segnala l'incidente al SOC.",
        examTip: "L'addestramento degli utenti (Awareness Training) Ã¨ classificato come un controllo Operativo, non Gestionale."
      },
      {
        name: "Managerial",
        checklistKey: "ManagerialControls",
        definition: "Controlli amministrativi incentrati sulla governance, sulla gestione del rischio e sulle politiche organizzative.",
        details: "Guidano la direzione strategica ed amministrativa della sicurezza dell'azienda, fornendo un framework formale di regole e valutazioni:\n* **Risk Assessments:** Processi formalizzati di identificazione, analisi quantitativa o qualitativa e trattamento dei rischi aziendali.\n* **Security Policies:** Documenti ufficiali redatti e firmati dalla direzione (es. Acceptable Use Policy - AUP, password policy, clean desk policy).\n* **Vendor Risk Management:** Procedure di audit e ispezione di sicurezza applicate a terze parti e fornitori esterni.\n* **Change Management Policy:** Definizione formale delle regole e dei comitati (CAB) preposti all'approvazione delle modifiche infrastrutturali.\n\n* **Piccolo Esempio Concentrato:** La redazione e l'approvazione da parte dei direttori aziendali di un documento formale di 'Acceptable Use Policy' (AUP), che stabilisce i siti web consentiti e vieta l'uso di software di file sharing sui computer di lavoro, Ã¨ un controllo manageriale.",
        examTip: "I Risk Assessment e le politiche scritte rappresentano sempre controlli Gestionali/Amministrativi d'esame."
      },
      {
        name: "Physical",
        checklistKey: "PhysicalControls",
        definition: "Misure di sicurezza tangibili e reali progettate per prevenire l'accesso fisico non autorizzato o proteggere da danni strutturali.",
        details: "Proteggono il perimetro reale dei locali, gli uffici, i dipendenti e l'hardware dei data center:\n* **Barriere e Delimitazioni:** Recinzioni metalliche, muri perimetrali, cancelli di sicurezza e piloni stradali.\n* **Controllo degli Accessi Fisici:** Serrature meccaniche, badge elettronici RFID, lettori biometrici (iride, impronte) e tornelli d'ingresso.\n* **Sicurezza Ambientale:** Sistemi antincendio automatici, sensori di fumo, climatizzatori per data center e generatori di emergenza.\n* **Sorveglianza Reale:** Guardie giurate armate di presidio e sistemi di telecamere CCTV posizionati nei punti di accesso.\n\n* **Piccolo Esempio Concentrato:** Una grata metallica rinforzata con lucchetto di sicurezza montata davanti alla finestra della sala in cui risiedono i server di backup centralizzati rappresenta un controllo fisico per impedire furti di supporti di memoria.",
        examTip: "Un lucchetto su un rack di server Ã¨ un controllo fisico d'esame, fondamentale per prevenire il furto o la manipolazione dell'hardware."
      }
    ]
  },
  {
    title: "3. Control Types (Obj 1.1)",
    description: "Classificazione funzionale dei controlli in base alla tempistica dell'azione.",
    icon: "CheckSquare",
    subtopics: [
      {
        name: "Preventive",
        checklistKey: "PreventiveControl",
        definition: "Controlli progettati per impedire in modo proattivo il verificarsi di una violazione della sicurezza o di un incidente.",
        details: "Intervengono prima che l'evento dannoso possa concretizzarsi o iniziare:\n* **Hardening dei Sistemi:** Disabilitare servizi inutilizzati, chiudere porte aperte e applicare le patch.\n* **Barriere di Sicurezza:** Firewall di rete che bloccano il traffico illecito, sistemi MFA per impedire accessi abusivi.\n* **Misure Fisiche:** Serrature blindate che impediscono l'intrusione fisica nei locali.\n* **Formazione del Personale:** Istruire i dipendenti previene errori umani o cadute in trappole di ingegneria sociale.\n\n* **Piccolo Esempio Concentrato:** L'implementazione del blocco automatico degli account di Active Directory dopo 5 tentativi consecutivi di password errate Ã¨ un controllo preventivo che blocca sul nascere attacchi brute-force o a dizionario.",
        examTip: "L'hardening dei sistemi (es. disabilitare le porte inutilizzate) Ã¨ un controllo preventivo chiave d'esame."
      },
      {
        name: "Detective",
        checklistKey: "DetectiveControl",
        definition: "Controlli volti a identificare e registrare un incidente di sicurezza mentre si verifica o dopo che Ã¨ accaduto.",
        details: "Forniscono visibilitÃ  e avvisano tempestivamente il personale di sicurezza sulle anomalie in corso:\n* **Sistemi di Rilevamento:** Intrusion Detection Systems (IDS) che analizzano pattern d'attacco nella rete.\n* **Audit dei Log:** Sistemi SIEM che collezionano log dai server per correlare eventi sospetti retroattivamente.\n* **Sorveglianza Fisica:** Sensori di movimento volumetrici, allarmi volumetrici antintrusione e telecamere CCTV.\n\n* **Piccolo Esempio Concentrato:** Un sistema IDS installato sulla rete aziendale rileva una scansione di porte (port scan) proveniente da un IP interno e invia un allarme critico immediato alla dashboard del team del SOC, evidenziando il possibile tentativo di ricognizione di un attaccante.",
        examTip: "Un sensore che si limita a rilevare e segnalare Ã¨ un controllo **detective**; uno che interrompe l'attacco Ã¨ **preventive**. **Attenzione a non legare la categoria al prodotto:** un IPS configurato in sola rilevazione, o collegato a una porta SPAN, non blocca nulla e si comporta da controllo detective. A decidere sono il **posizionamento** e la **configurazione**, non il nome sulla scatola."
      },
      {
        name: "Corrective",
        checklistKey: "CorrectiveControl",
        definition: "Controlli implementati per rimediare ai danni causati da un incidente e ripristinare lo stato originale sicuro dei sistemi.",
        details: "Agiscono dopo che l'incidente si Ã¨ verificato e mira a minimizzarne l'impatto operando sulla guarigione:\n* **Ripristino dei Dati:** Backup periodici (offline, cloud, incrementali) per rimediare a perdite o cifrature di dati.\n* **Rimozione Minacce:** Software antivirus che isolano ed eliminano in quarantena un malware rilevato.\n* **Procedure di Patching:** Aggiornare d'emergenza i sistemi sfruttati dall'attaccante per chiudere definitivamente la falla.\n* **Business Continuity:** Attivazione di piani di Incident Response e disaster recovery per riavviare i servizi sui nodi secondari.\n\n* **Piccolo Esempio Concentrato:** A seguito di una corruzione dei dati su un server CRM causata da un database administrator distratto, il team di sicurezza avvia il ripristino dell'intero database partendo dall'ultimo backup sicuro scattato tre ore prima (controllo correttivo).",
        examTip: "Il ripristino dei dati da un backup offline o cloud dopo una corruzione Ã¨ l'esempio piÃ¹ tipico di controllo correttivo."
      },
      {
        name: "Deterrent",
        checklistKey: "DeterrentControl",
        definition: "Controlli progettati per scoraggiare psicologicamente potenziali aggressori dal tentare una violazione della sicurezza.",
        details: "Mirano ad influenzare la decisione e la percezione dell'attaccante, evidenziando le elevate probabilitÃ  di cattura o fallimento:\n* **Segnaletica Visibile:** Cartelli che indicano 'Area Sotto Videosorveglianza 24/7' o 'ProprietÃ  Protetta'.\n* **Presidio Fisico:** Telecamere ben esposte all'ingresso, fari di illuminazione perimetrale notturna attivati da sensori.\n* **Banner Digitali:** Messaggi legali esposti prima del login SSH o RDP che avvertono di procedimenti penali in caso di accesso non autorizzato.\n\n* **Piccolo Esempio Concentrato:** Un hacker intenzionato a infiltrarsi fisicamente nei parcheggi di una ditta per fare piggybacking nota una sbarra d'ingresso con un gabbiotto presidiato da una guardia giurata visibile e decide di rinunciare al tentativo.",
        examTip: "I controlli deterrenti non bloccano fisicamente l'attacco, ma riducono la probabilitÃ  che venga tentato."
      },
      {
        name: "Compensating",
        checklistKey: "CompensatingControl",
        definition: "Controlli alternativi o di ripiego introdotti per mitigare il rischio quando un controllo primario non Ã¨ praticabile.",
        details: "Vengono impiegati per compensare carenze strutturali, limiti di budget o vincoli tecnici insuperabili:\n* **Isolamento Legacy:** Un server medico obsoleto non supporta patch di sicurezza (controllo primario); lo si isola in una VLAN dedicata protetta da firewall restrittivi (controllo compensativo).\n* **MFA Alternativo:** Se un dipendente non puÃ² usare lo smartphone per la ricezione dell'OTP, gli viene assegnato un token hardware fisico alternativo.\n* **Controlli Amministrativi Sostitutivi:** Doppia approvazione cartacea se un workflow digitale sicuro non Ã¨ momentaneamente disponibile.\n\n* **Piccolo Esempio Concentrato:** Una filiale bancaria possiede casseforti i cui meccanismi di chiusura automatica temporizzata sono rotti. Come controllo compensativo temporaneo, la banca impone che l'apertura manuale delle casseforti richieda la presenza fisica e la firma contemporanea di due responsabili della filiale.",
        examTip: "I controlli compensativi devono fornire un livello di protezione equivalente a quello del controllo originale mancante."
      },
      {
        name: "Directive",
        checklistKey: "DirectiveControl",
        definition: "Controlli di natura amministrativa progettati per indirizzare, prescrivere o imporre comportamenti specifici conformi.",
        details: "Si basano sulle politiche formali, sulle procedure scritte e sulla conformitÃ  obbligatoria imposta dall'azienda o dalla legge:\n* **Acceptable Use Policy (AUP):** Regolamento interno sul corretto utilizzo dei dispositivi IT aziendali.\n* **Standard Operating Procedures (SOP):** Manuali tecnici operativi d'obbligo per configurare in modo sicuro server o reti.\n* **Regolamenti e Standard Esterni:** Requisiti normativi inderogabili di conformitÃ , come GDPR per i dati personali o PCI-DSS per le carte.\n\n* **Piccolo Esempio Concentrato:** All'ingresso della sede aziendale Ã¨ affisso un cartello ben visibile che impone a tutti i dipendenti e visitatori l'obbligo di indossare il badge identificativo sul petto in modo chiaramente visibile durante tutto l'orario di lavoro.",
        examTip: "I controlli direttivi definiscono le regole del gioco; la violazione di tali controlli comporta solitamente sanzioni disciplinari."
      }
    ]
  },
  {
    title: "4. Change Management (Obj 1.3)",
    description: "Processi standardizzati per introdurre modifiche in produzione senza interruzioni e falle.",
    icon: "TrendingUp",
    subtopics: [
      {
        name: "Approval Process",
        checklistKey: "ApprovalProcess",
        definition: "Il flusso strutturato di approvazione formale richiesto prima che qualsiasi cambiamento venga implementato in produzione.",
        details: "Garantisce la tracciabilitÃ , la governance e il controllo formale su tutte le modifiche infrastrutturali ed applicative:\n* **Sottomissione RFC:** Ogni modifica deve essere documentata tramite una formale Request for Change (RFC), descrivendone i motivi e i passaggi.\n* **Change Advisory Board (CAB):** Un comitato multidisciplinare composto da esperti di rete, sistemisti, sicurezza e business che valuta la richiesta.\n* **Firma Autorizzativa:** Nessuna modifica puÃ² essere applicata sul perimetro reale senza la preventiva approvazione formale e documentata.\n\n* **Piccolo Esempio Concentrato:** Un ingegnere di rete vuole modificare le regole di routing sul router centrale. Compila una RFC descrivendo l'attivitÃ ; il CAB si riunisce, valuta l'impatto sul business, e concede l'autorizzazione formale per procedere durante il weekend.",
        examTip: "Il Change Advisory Board (CAB) ha il compito di facilitare la valutazione e l'approvazione formale, non di implementare la modifica."
      },
      {
        name: "Impact Analysis",
        checklistKey: "ImpactAnalysis",
        definition: "La valutazione sistematica dei potenziali rischi, interruzioni e dipendenze che un cambiamento potrebbe causare.",
        details: "Viene condotta nella fase preliminare della RFC per mappare gli effetti collaterali dell'aggiornamento:\n* **Interdipendenze Hardware/Software:** Analizzare quali sistemi, database, porte o applicazioni legacy dipendono dalla risorsa che stiamo modificando.\n* **Sicurezza e ConformitÃ :** Valutare se l'introduzione della nuova versione altera i controlli di sicurezza attivi o compromette la conformitÃ  (es. HIPAA, GDPR).\n* **Downtime Operativo:** Stima del tempo di fuori servizio e dell'impatto sui clienti.\n\n* **Piccolo Esempio Concentrato:** Prima di aggiornare la versione di Java sul server di produzione dell'ERP aziendale, un sistemista simula l'aggiornamento in staging e scopre che il nuovo compilatore manda in blocco l'API delle spedizioni. L'installazione viene sospesa, prevenendo il blocco operativo delle consegne commerciali.",
        examTip: "L'analisi dell'impatto previene incidenti a catena dovuti alla mancata comprensione delle dipendenze dei sistemi."
      },
      {
        name: "Backout Plan",
        checklistKey: "BackoutPlan",
        definition: "Una procedura dettagliata per annullare rapidamente una modifica fallita e ripristinare il sistema allo stato sicuro precedente.",
        details: "Chiamato comunemente Rollback Plan, deve essere documentato prima di ricevere l'approvazione dal CAB:\n* **Snapshot e Backup Pre-AttivitÃ :** Effettuare copie complete dello stato del sistema un istante prima di iniziare la manutenzione.\n* **Passaggi Tecnici di Revert:** I passaggi e i comandi necessari per disinstallare la patch o ripristinare le vecchie configurazioni.\n* **Trigger di Rollback:** Regole precise basate sul tempo (es. 'se l'aggiornamento dura piÃ¹ di 2 ore') o su anomalie rilevate (es. 'se la latenza del database supera 500ms') che decretano lo stop dei lavori e l'avvio del ripristino.\n\n* **Piccolo Esempio Concentrato:** Un amministratore aggiorna il firmware del firewall aziendale. Al riavvio, il traffico VPN non funziona. Seguendo il Backout Plan, l'amministratore carica all'istante il vecchio firmware salvato sul banco di memoria secondario e ripristina la connettivitÃ  per i lavoratori remoti in tre minuti.",
        examTip: "Un piano di Change Management non Ã¨ MAI considerato completo d'esame senza un piano di backout testato e documentato."
      },
      {
        name: "Maintenance Window",
        checklistKey: "MaintenanceWindow",
        definition: "Un intervallo di tempo prestabilito e concordato in cui Ã¨ consentito eseguire modifiche o manutenzioni.",
        details: "Pianifica le attivitÃ  a minor impatto per preservare i patti di disponibilitÃ  operativa (SLA):\n* **Pianificazione Intelligente:** Le manutenzioni vengono eseguite in orari in cui l'uso dei sistemi Ã¨ minimo (es. di notte, nei weekend o durante le chiusure aziendali).\n* **Comunicazione Preventiva:** Avvisare i dipendenti e i clienti esterni con debito anticipo del possibile downtime o degrado delle performance.\n* **Massimizzazione SLA:** Permette di completare gli aggiornamenti senza impattare sull'indice di uptime aziendale contrattuale.\n\n* **Piccolo Esempio Concentrato:** Una piattaforma fintech stabilisce che tutti gli aggiornamenti dei server di transazione debbano avvenire esclusivamente all'interno della finestra di manutenzione concordata, ovvero la domenica mattina dalle 02:00 alle 05:00, minimizzando l'impatto sui commercianti.",
        examTip: "Anche le patch di emergenza dovrebbero idealmente essere coordinate con il processo di change management, mentre le modifiche programmate ordinarie vanno eseguite rigorosamente all'interno delle finestre di manutenzione approvate."
      },
      {
        name: "Version Control",
        checklistKey: "VersionControl",
        definition: "La gestione e il tracciamento formale delle diverse versioni di software, configurazioni o politiche di sicurezza.",
        details: "Garantisce l'integritÃ , l'audit trail e il ripristino sicuro di codici sorgente e file di configurazione infrastrutturali:\n* **Versionamento Centralizzato (es. Git):** Registra ogni singolo commit di modifica in un registro immutabile.\n* **TracciabilitÃ  degli Autori:** Memorizza l'identitÃ  dell'operatore che ha effettuato il cambiamento, i motivi e la data esatta della modifica.\n* **Revert Istantaneo:** PossibilitÃ  di confrontare e ripristinare all'istante una specifica configurazione passata qualora il codice corrente introduca bug o vulnerabilitÃ  di sicurezza.\n\n* **Piccolo Esempio Concentrato:** Un tecnico di sicurezza modifica lo script di configurazione del cloud AWS (Terraform). Il codice presenta un errore di sintassi che blocca la creazione delle VM. Usando il controllo di versione di Git, il tecnico esegue un `git revert` all'ultima versione funzionante, ripristinando il deploy automatico in pochi secondi.",
        examTip: "Il controllo di versione Ã¨ fondamentale per l'integritÃ  del software e previene modifiche non tracciate o sovrascritture accidentali."
      },
      {
        name: "Ownership & Stakeholders",
        checklistKey: "OwnershipStakeholders",
        definition: "Le due figure che l'obiettivo 1.3 tiene distinte in ogni modifica: il titolare (ownership), che ha l'autoritÃ  di chiederla e risponde dell'esito, e le parti interessate (stakeholder), cioÃ¨ tutti coloro che la modifica tocca e che vanno identificati e coinvolti prima che avvenga.",
        details: "Sono due ruoli diversi, e le domande d'esame li accostano proprio per vedere se li confondi:\n* **Ownership â€” chi decide e chi risponde:** ogni richiesta di modifica ha un titolare **nominato**, non un reparto generico. Ãˆ la persona che conosce il sistema, che ha l'autoritÃ  formale per chiedere l'approvazione e a cui si risale se qualcosa va storto. Senza un titolare, una modifica fallita non ha nessuno che la riporti indietro e nessuno a cui chiedere conto: la frase spia Ã¨ Â«se ne occupava l'ITÂ».\n* **Stakeholder â€” chi ne subisce gli effetti:** le funzioni che useranno il sistema dopo la modifica, quelle che dipendono da esso, la sicurezza, la conformitÃ , l'assistenza clienti e, quando il servizio Ã¨ esposto, i clienti stessi. Identificarli Ã¨ un passo del processo, non una cortesia.\n* **PerchÃ© si identificano prima:** rispondono a domande diverse. Il titolare risponde a Â«chi autorizza e chi rispondeÂ»; gli stakeholder a Â«chi va avvisato, consultato e formatoÂ». Una modifica tecnicamente riuscita ma comunicata a nessuno produce lo stesso disservizio di una fallita.\n* **Gli errori tipici:** confondere il titolare del **sistema** con il titolare della **modifica**, e limitare l'elenco degli stakeholder ai soli tecnici, dimenticando chi quel sistema lo usa tutti i giorni.\n\n* **Piccolo Esempio Concentrato:** Il gestionale viene migrato a una nuova versione in un fine settimana e la migrazione riesce. Il lunedÃ¬ perÃ² il call center resta fermo tre ore: la nuova interfaccia ha cambiato il percorso per emettere una nota di credito e nessun operatore era stato avvisato. Il reparto era il principale utilizzatore del sistema e non compariva fra le parti interessate della richiesta.",
        examTip: "Tieni distinte le due parole. **Ownership** = una persona nominata che **decide e risponde** della modifica Â· **Stakeholder** = tutti quelli che la modifica **tocca**, da identificare, informare e all'occorrenza formare. **Trappola d'esame:** quando lo scenario descrive una modifica riuscita sul piano tecnico ma che ha bloccato un reparto ignaro, il difetto non Ã¨ il piano di backout nÃ© la finestra di manutenzione: Ã¨ la mancata identificazione delle parti interessate."
      },
      {
        name: "Test Results",
        checklistKey: "TestResultsChange",
        definition: "Gli esiti documentati delle prove eseguite in un ambiente diverso dalla produzione, che il comitato di approvazione esamina prima di autorizzare una modifica.",
        details: "Sono l'unico elemento del pacchetto di change management che parla di **fatti** anzichÃ© di intenzioni:\n* **A che cosa servono:** l'analisi d'impatto dice che cosa *ci si aspetta* che accada; i risultati dei test dicono che cosa *Ã¨ accaduto davvero* quando la modifica Ã¨ stata provata. Sono la sola prova che funziona e che non rompe altro.\n* **Dove si producono:** in un ambiente che somiglia alla produzione â€” staging o collaudo â€” con dati e integrazioni rappresentativi. Una prova su un ambiente troppo diverso restituisce un esito rassicurante e privo di valore.\n* **Che cosa deve contenere l'evidenza:** che cosa Ã¨ stato provato, con quali dati, da chi, quando, e l'esito di ciascun caso â€” comprese le prove **fallite** e ciÃ² che Ã¨ stato corretto. Un rapporto che elenca solo i successi non Ã¨ un rapporto di test.\n* **Quando l'ambiente di collaudo non c'Ã¨:** la strada corretta non Ã¨ dichiararli Â«non necessariÂ», ma dichiarare il rischio residuo, farlo accettare da chi ha l'autoritÃ  di assumerselo e rafforzare il piano di backout.\n\n* **Piccolo Esempio Concentrato:** Una richiesta arriva al comitato completa di titolare, analisi d'impatto, finestra di manutenzione e piano di backout dettagliato. Alla voce Â«esito delle verifiche in collaudoÂ» il richiedente ha scritto Â«non necessario, modifica minimaÂ». Il comitato la respinge, e fa bene: senza quell'esito nessuno degli altri documenti dimostra che la modifica funzioni.",
        examTip: "I risultati dei test sono l'unico elemento del pacchetto che dice qualcosa sul **comportamento reale** della modifica; tutti gli altri descrivono piani e intenzioni. **Trappola d'esame:** Â«modifica minimaÂ» non Ã¨ mai una motivazione valida per ometterli, e una richiesta completa di tutto tranne gli esiti delle prove Ã¨ la risposta corretta quando la domanda chiede che cosa avrebbe dovuto impedire l'approvazione."
      },
      {
        name: "Standard Operating Procedure (SOP)",
        checklistKey: "StandardOperatingProcedure",
        definition: "Il documento che descrive passo per passo come si esegue un'attivitÃ  ricorrente, cosÃ¬ che l'esito non dipenda da chi la esegue.",
        details: "La SOP trasforma la competenza di una persona in un processo dell'organizzazione:\n* **Il problema che risolve:** un'attivitÃ  che vive solo nell'esperienza di due colleghi produce esiti diversi a seconda del turno, non Ã¨ verificabile da nessuno e sparisce quando quelle persone vanno in ferie o cambiano lavoro.\n* **Che cosa contiene:** lo scopo, chi Ã¨ autorizzato a eseguirla, i prerequisiti, la sequenza esatta dei passi con i comandi o le schermate, i controlli di verifica finali, che cosa fare se un passo fallisce, e un numero di versione con la data dell'ultima revisione.\n* **Il posto nella gerarchia documentale:** la **policy** dice *che cosa* si deve ottenere e *perchÃ©*; lo **standard** dice *con che cosa*; la **procedura (SOP)** dice *come*, nell'ordine giusto. Tutte e tre sono obbligatorie; la **linea guida** Ã¨ invece un consiglio.\n* **PerchÃ© Ã¨ un controllo di sicurezza e non burocrazia:** rende l'attivitÃ  **ripetibile** (stesso esito da chiunque), **verificabile** (un auditor confronta ciÃ² che Ã¨ stato fatto con ciÃ² che era prescritto) e **trasferibile** (una persona nuova Ã¨ operativa in giorni, non in mesi).\n\n* **Piccolo Esempio Concentrato:** In un'azienda la procedura per applicare le patch mensili esiste solo nella testa di due amministratori. Ognuno la esegue a modo suo e, durante le ferie estive, un collega meno esperto salta la verifica successiva al riavvio lasciando due servizi fermi per un giorno. Scritta come SOP, quella verifica Ã¨ un passo numerato che non si puÃ² omettere senza che risulti.",
        examTip: "La SOP risponde alla domanda **Â«come si fa, passo per passoÂ»** ed Ã¨ **obbligatoria**, a differenza della linea guida che Ã¨ una raccomandazione. **Trappola d'esame:** quando lo scenario descrive un'attivitÃ  il cui esito dipende da chi Ã¨ di turno, la risposta Ã¨ la procedura operativa standard â€” non una policy, che direbbe soltanto che l'attivitÃ  va svolta, e non un corso di formazione, che non lascia alcuna traccia verificabile."
      },
      {
        name: "Implicazioni tecniche di una modifica",
        checklistKey: "ChangeTechnicalImplications",
        definition: "Gli effetti collaterali che l'obiettivo 1.3 chiede di prevedere prima di applicare una modifica: liste di autorizzazione e di blocco, attivitÃ  consentite, fermo del servizio, riavvii, applicazioni legacy e dipendenze.",
        details: "Sono la parte dell'obiettivo 1.3 che le domande verificano con scenari concreti, non con definizioni:\n* **Allow list e deny list:** una modifica puÃ² richiedere di **aggiungere** il nuovo server, la nuova applicazione o il nuovo indirizzo agli elenchi di ciÃ² che Ã¨ consentito, o di **togliere** dagli elenchi di blocco ciÃ² che ora Ã¨ legittimo. Dimenticarlo produce il classico Â«in collaudo funzionavaÂ».\n* **Restricted activities (attivitÃ  limitate):** durante la finestra si esegue **solo ciÃ² che Ã¨ stato approvato**. Ãˆ la regola che vieta l'intervento opportunistico â€” Â«visto che siamo qui, disattivo anche questo servizio che non usa nessunoÂ» â€” perchÃ© ciÃ² che non Ã¨ stato analizzato non ha nÃ© valutazione d'impatto nÃ© piano di ripristino.\n* **Downtime (fermo del servizio):** va **stimato** prima, **comunicato** alle parti interessate e confrontato con gli impegni di servizio in essere. Un fermo non dichiarato viola l'SLA anche quando la modifica riesce.\n* **Service restart e application restart:** molte configurazioni diventano effettive solo dopo il riavvio del servizio o dell'applicazione, non al salvataggio del file. Il riavvio va quindi pianificato **dentro** la finestra, altrimenti la modifica si applica da sola piÃ¹ tardi, nel momento peggiore.\n* **Legacy applications:** i sistemi fuori supporto possono non tollerare la modifica e non avere alcun percorso di aggiornamento. Quando emergono nell'analisi, la via corretta Ã¨ documentare la dipendenza e isolarli con controlli compensativi, non rinviare l'intera modifica.\n* **Dependencies (dipendenze):** ciÃ² che dipende dal sistema che si modifica e ciÃ² da cui quel sistema dipende. Ãˆ la voce che l'analisi d'impatto sbaglia piÃ¹ spesso, perchÃ© le dipendenze non documentate si scoprono solo quando si rompono.\n\n* **Piccolo Esempio Concentrato:** Durante una finestra notturna un amministratore modifica un parametro di autenticazione, verifica che il file sia corretto e considera chiusa l'attivitÃ . La mattina dopo il comportamento del sistema Ã¨ ancora quello vecchio; piÃ¹ tardi un riavvio automatico pianificato applica la nuova configurazione in pieno orario di lavoro e tre applicazioni dipendenti cadono insieme. Il riavvio era un'implicazione prevedibile, e andava eseguito dentro la finestra.",
        examTip: "Associa ogni implicazione al suo sintomo, perchÃ© Ã¨ cosÃ¬ che le domande te la presentano. Modifica che **non ha effetto** â†’ manca il **riavvio** del servizio Â· disservizio **in altri sistemi** â†’ **dipendenze** non mappate Â· qualcosa rotto che **non era nella richiesta** â†’ violate le **attivitÃ  limitate** Â· traffico bloccato dopo il rilascio â†’ **allow list** non aggiornata Â· reclami dei clienti per un fermo â†’ **downtime** non comunicato."
      },
      {
        name: "Documentazione della modifica",
        checklistKey: "ChangeDocumentation",
        definition: "L'aggiornamento dei diagrammi, delle policy e delle procedure dopo che una modifica Ã¨ stata applicata: l'ultimo passo del processo, e quello che viene saltato piÃ¹ spesso.",
        details: "Ãˆ la fase che non produce alcun beneficio immediato e senza la quale tutto il resto si degrada:\n* **Aggiornamento dei diagrammi:** topologia di rete, schemi degli apparati, flussi dei dati e inventario devono riflettere lo stato **dopo** la modifica. Un diagramma non aggiornato non Ã¨ neutro: induce in errore chi lo consulta, e chi lo consulta di solito sta rispondendo a un incidente o conducendo una valutazione.\n* **Aggiornamento di policy e procedure:** se la modifica cambia il modo di lavorare â€” un nuovo strumento, un passaggio di autorizzazione in piÃ¹, un protocollo dismesso â€” la procedura che descriveva il vecchio modo va riscritta, altrimenti resta in vigore un documento che prescrive qualcosa che non esiste piÃ¹.\n* **PerchÃ© Ã¨ un controllo:** la documentazione aggiornata Ã¨ ciÃ² che rende possibili il ripristino, l'analisi di un incidente, l'inserimento di personale nuovo e l'audit. Ed Ã¨ la base dell'**analisi d'impatto della modifica successiva**: documentazione vecchia oggi significa analisi d'impatto sbagliata domani.\n* **Quando si esegue:** come parte della chiusura della modifica, non Â«quando ci sarÃ  tempoÂ». Una modifica non Ã¨ chiusa finchÃ© la documentazione non corrisponde alla realtÃ .\n\n* **Piccolo Esempio Concentrato:** Un consulente esterno riceve l'incarico di mappare le vulnerabilitÃ  del data center e chiede il diagramma dell'architettura. Gli viene consegnato uno schema di piÃ¹ di un anno prima: due segmenti introdotti nel frattempo non compaiono e un server dismesso c'Ã¨ ancora. Il consulente lavora su una mappa sbagliata, e le falle piÃ¹ recenti restano fuori dal perimetro dell'analisi.",
        examTip: "La documentazione chiude il ciclo della modifica, e il suo valore si manifesta sempre **dopo**: durante un incidente, un audit o l'analisi d'impatto del cambiamento successivo. **Trappola d'esame:** quando lo scenario descrive qualcuno che sbaglia una valutazione perchÃ© si Ã¨ fidato di uno schema o di una procedura non aggiornati, la risposta non Ã¨ un controllo tecnico ma l'aggiornamento della documentazione previsto dal processo di change management."
      }
    ]
  },
  {
    title: "5. Cryptography (Obj 1.4)",
    description: "Algoritmi, meccanismi crittografici e Infrastruttura a Chiave Pubblica (PKI).",
    icon: "Calculator",
    subtopics: [
      {
        name: "Symmetric Encryption",
        checklistKey: "SymmetricEncryption",
        definition: "Algoritmi di crittografia che utilizzano una singola chiave condivisa sia per cifrare che per decifrare i dati.",
        details: "Caratteristiche principali della crittografia a chiave simmetrica:\n* **Efficienza Computazionale:** Estremamente veloce. Richiede poche risorse di calcolo, rendendola ideale per cifrare grandi volumi di dati statici.\n* **Problema della Distribuzione:** Entrambe le parti devono scambiarsi preventivamente la chiave segreta in modo sicuro prima di poter comunicare, un processo difficile su canali pubblici.\n* **Algoritmi Comuni:** **AES (Advanced Encryption Standard - lo standard globale di riferimento)**, 3DES (obsoleto), Blowfish, Twofish e ChaCha20.\n\n* **Piccolo Esempio Concentrato:** Per proteggere i dati personali degli utenti memorizzati su un hard disk aziendale, l'amministratore attiva BitLocker. Il sistema cifra l'intero disco a riposo usando l'algoritmo simmetrico AES-256: l'accesso ai dati richiede la chiave simmetrica corretta inserita al boot.",
        examTip: "AES-256 Ã¨ l'algoritmo simmetrico consigliato a livello mondiale per la protezione dei dati a riposo."
      },
      {
        name: "Asymmetric Encryption",
        checklistKey: "AsymmetricEncryption",
        definition: "Algoritmi di crittografia che utilizzano una coppia di chiavi matematicamente correlate: una chiave pubblica e una chiave privata.",
        details: "Risolve il problema dello scambio chiavi sfruttando relazioni matematiche univoche e unidirezionali:\n* **Chiave Pubblica:** PuÃ² essere liberamente condivisa con chiunque. Viene utilizzata per cifrare i dati destinati al proprietario o per verificare la sua firma digitale.\n* **Chiave Privata:** Deve essere tenuta rigorosamente segreta dal proprietario. Viene utilizzata per decifrare i dati cifrati con la chiave pubblica corrispondente o per generare firme digitali.\n* **Lentezza Computazionale:** Richiede una potenza di elaborazione significativamente maggiore rispetto alla crittografia simmetrica, motivo per cui viene usata principalmente per firmare o per scambiarsi la chiave simmetrica iniziale di sessione.\n* **Algoritmi Comuni, e a che cosa servono davvero:** **RSA** cifra e firma, con schemi distinti per ciascun uso (RSA-OAEP per cifrare, RSA-PSS per firmare). **Diffie-Hellman** ed **ECDH** non cifrano nulla: eseguono un **accordo di chiave** (*key agreement*), cioÃ¨ fanno concordare a due parti una chiave condivisa senza mai trasmetterla, che viene poi usata con un algoritmo simmetrico come AES. **ECC** non Ã¨ un singolo algoritmo ma una famiglia basata sulle curve ellittiche, che comprende ECDH per l'accordo di chiave ed ECDSA per la firma, a paritÃ  di sicurezza con chiavi molto piÃ¹ corte di RSA.\n\n* **Piccolo Esempio Concentrato:** Se Alice vuole inviare il proprio numero di previdenza sociale a Bob in modo sicuro su internet, lo cifra usando la chiave pubblica di Bob. Da quel momento, solo ed esclusivamente Bob potrÃ  decifrare e leggere il messaggio usando la propria chiave privata segreta.",
        examTip: "La crittografia asimmetrica risolve il problema della distribuzione delle chiavi ma Ã¨ molto piÃ¹ lenta di quella simmetrica. **Trappola d'esame:** gli obiettivi distinguono *encryption* da *key exchange*, e il materiale di settore li confonde spesso. Diffie-Hellman ed ECDH **non cifrano**: stabiliscono una chiave condivisa (NIST SP 800-56A li classifica come schemi di *key establishment*). Se una domanda chiede quale algoritmo cifra i dati, DH non Ã¨ mai la risposta; se chiede come due estranei concordano una chiave di sessione senza segreti preesistenti, Ã¨ proprio DH o ECDH."
      },
      {
        name: "PKI",
        checklistKey: "PKIFundamentals",
        definition: "Public Key Infrastructure: l'insieme di ruoli, politiche, hardware, software e procedure necessari per gestire certificati digitali.",
        details: "Fornisce la struttura di fiducia distribuita per abilitare la crittografia asimmetrica su internet:\n* **Certificate Authority (CA):** L'ente di terze parti fiduciario che convalida le identitÃ  e firma digitalmente i certificati (es. DigiCert, Let's Encrypt).\n* **Registration Authority (RA):** Un'entitÃ  ausiliaria responsabile di verificare la validitÃ  dei dati e l'identitÃ  del richiedente prima che la CA emetta effettivamente il certificato.\n* **CRL e OCSP, due meccanismi diversi:** servono entrambi a scoprire se un certificato Ã¨ stato **revocato** prima della scadenza naturale (tipicamente per compromissione della chiave privata), ma funzionano in modo opposto. La **CRL** (*Certificate Revocation List*) Ã¨ un **elenco** che la CA pubblica periodicamente e che il client scarica: semplice, ma puÃ² essere grande e aggiornata solo al successivo rilascio. L'**OCSP** (*Online Certificate Status Protocol*) Ã¨ invece una **interrogazione** puntuale a un responder sullo stato di **un singolo** certificato: piÃ¹ tempestiva, ma introduce una dipendenza dalla disponibilitÃ  del responder e rivela quali siti il client sta visitando. L'**OCSP stapling** risolve entrambi i problemi: Ã¨ il server stesso ad allegare all'handshake una risposta OCSP firmata e recente. **Per l'esame: elenco contro interrogazione.**\n\n* **Piccolo Esempio Concentrato:** Quando un browser si connette a `https://banca.it`, verifica tramite PKI che il certificato SSL mostrato dal server sia stato firmato da una CA fidata (es. Let's Encrypt) presente nel database dei certificati radice del sistema operativo, e che il nome del dominio corrisponda. **Attenzione a che cosa questo prova davvero:** il certificato lega una chiave pubblica a un **nome di dominio verificato**, non alla legittimitÃ  dell'azienda o dei contenuti. Un sito di phishing puÃ² registrare un proprio dominio somigliante e ottenere per esso un certificato valido: il browser mostrerÃ  la connessione come sicura, e lo sarÃ : cifrata verso il server dell'attaccante.",
        examTip: "Se un browser riceve un certificato che non risale a una CA presente nel proprio archivio radici, mostra un avviso. In TLS il client verifica quattro cose: **nome del dominio**, **periodo di validitÃ **, **catena** fino a una radice attendibile e, secondo la policy, **stato di revoca**. **Trappola d'esame:** un certificato valido dimostra che stai parlando con il server di *quel dominio* e che il canale Ã¨ cifrato; **non** dimostra che l'organizzazione dietro il sito sia onesta. Usa sempre **TLS** come nome del protocollo: Â«SSLÂ» Ã¨ deprecato da anni e all'esame la risposta corretta Ã¨ TLS."
      },
      {
        name: "Root of Trust",
        checklistKey: "RootOfTrustConcept",
        definition: "La sorgente primaria e intrinsecamente fidata all'interno di un sistema crittografico o hardware, su cui poggia l'intera catena di sicurezza.",
        details: "Caratteristiche del Root of Trust (RoT):\n* **Ancoraggio di Sicurezza:** Rappresenta il punto di partenza non verificabile (poichÃ© intrinsecamente fidato) da cui viene derivata la fiducia per tutti gli altri componenti.\n* **Implementazione Hardware:** Spesso implementato tramite un chip crittografico fisico e protetto (come un HSM o un chip TPM) che memorizza le chiavi crittografiche primarie di root.\n* **Catena di Custodia (Chain of Trust):** Permette di convalidare l'integritÃ  del bootloader, del sistema operativo e delle applicazioni firmate digitalmente durante l'avvio (Secure Boot).\n\n* **Piccolo Esempio Concentrato:** Durante l'avvio, il firmware UEFI di un server legge la chiave crittografica radice fidata incorporata nel chip TPM hardware (Root of Trust) per convalidare il bootloader e assicurarsi che non sia stato infettato da malware pre-boot.",
        examTip: "La Root of Trust Ã¨ la base su cui poggia l'intera catena di fiducia crittografica e di avvio dell'hardware: Ã¨ fidata perchÃ© **non modificabile via software**, non perchÃ© sia invulnerabile. Se viene compromessa la radice stessa â€” un difetto nella boot ROM, una chiave estratta in fabbrica â€” ogni verifica costruita sopra di essa perde significato, ed Ã¨ la ragione per cui si realizza in hardware immutabile."
      },
      {
        name: "Certificate Authority",
        checklistKey: "CertificateAuthorityConcept",
        definition: "Un'entitÃ  terza fidata responsabile dell'emissione, della firma crittografica, della gestione e della revoca dei certificati digitali.",
        details: "Il ruolo della Certificate Authority (CA) in una PKI:\n* **Certificazione delle IdentitÃ :** Associa un'identitÃ  reale (un dominio web, un'azienda o un utente) a una chiave pubblica tramite un certificato firmato digitalmente.\n* **Fiducia Pubblica:** I certificati radice delle CA piÃ¹ autorevoli (es. Let's Encrypt, DigiCert) sono preinstallati nei sistemi operativi e nei browser di tutto il mondo.\n* **Gerarchia di Trust:** Composta da una CA Radice (Root CA) e una o piÃ¹ CA Subordinate (Intermediate CA) per limitare i rischi di compromissione del certificato radice principale.\n\n* **Piccolo Esempio Concentrato:** L'azienda Sweet as Thyme acquista un certificato SSL da DigiCert (una CA accreditata). DigiCert verifica l'identitÃ  dell'azienda e firma digitalmente la sua chiave pubblica. Da quel momento, tutti i browser riconoscono il sito come attendibile e sicuro tramite HTTPS.",
        examTip: "La Certificate Authority Ã¨ l'organizzazione fidata che firma digitalmente la chiave pubblica di un soggetto per certificarne l'identitÃ  all'esterno."
      },
      {
        name: "Registration Authority",
        checklistKey: "RegistrationAuthorityConcept",
        definition: "Un'entitÃ  ausiliaria all'interno di una PKI responsabile di verificare l'identitÃ  dei richiedenti prima che la CA emetta il certificato.",
        details: "La funzione della Registration Authority (RA):\n* **Filtro di Controllo:** Agisce come un ufficio di accoglienza e validazione per conto della CA, esaminando i documenti e accertandosi che il richiedente abbia effettivamente diritto sul dominio o sull'identitÃ  dichiarata.\n* **Nessun Potere di Firma:** La RA non firma nÃ© emette direttamente i certificati digitali finali; si limita ad approvare o rifiutare le richieste, inoltrando quelle approvate alla CA per la generazione crittografica.\n* **Efficienza Operativa:** Scarica la CA dall'onere burocratico e di verifica dei documenti dei richiedenti.\n\n* **Piccolo Esempio Concentrato:** Un'azienda richiede un certificato Extended Validation (EV). La Registration Authority (RA) esegue controlli legali e societari rigorosi per verificare che l'azienda esista davvero. Una volta convalidati i dati, inoltra l'approvazione alla CA che emette tecnicamente il certificato firmato.",
        examTip: "La RA verifica e convalida l'identitÃ  del richiedente del certificato, mentre solo la CA ha l'autoritÃ  tecnica di firmarlo ed emetterlo."
      },
      {
        name: "Public Key",
        checklistKey: "PublicKeyConcept",
        definition: "La componente della coppia di chiavi asimmetriche che viene resa pubblica e distribuita per cifrare o verificare firme.",
        details: "ProprietÃ  e utilizzi primari della chiave pubblica:\n* **Distribuzione Libera:** PuÃ² essere inserita all'interno di elenchi pubblici, siti web o inviata in chiaro.\n* **Garante della Riservatezza:** Viene usata da chiunque voglia inviare un messaggio cifrato al proprietario della chiave.\n* **Garante dell'IntegritÃ /AutenticitÃ :** Viene usata per **verificare** una firma digitale prodotta con la chiave privata corrispondente. *(Attenzione alla formulazione: si legge spesso Â«decifra la firmaÂ», ma la verifica Ã¨ un'operazione a sÃ©, non una decifratura. L'analogia descrive solo il vecchio schema RSA PKCS#1 v1.5 e non vale per RSA-PSS, ECDSA o Ed25519.)*\n* **Che cosa va protetto, e che cosa no:** della chiave pubblica non si protegge la **riservatezza** â€” Ã¨ fatta per circolare â€” ma se ne protegge l'**autenticitÃ **. Se qualcuno ti fa accettare la propria chiave al posto di quella del destinatario, cifri per lui. Ãˆ il problema che il certificato firmato da una CA risolve.\n\n* **Piccolo Esempio Concentrato:** Un cittadino scarica la chiave pubblica ufficiale del Ministero dell'Interno dal portale governativo per poter cifrare e trasmettere in sicurezza una denuncia riservata, sapendo che solo i sistemi ministeriali potranno decifrarla.",
        examTip: "La chiave pubblica Ã¨ fatta per essere distribuita: della chiave pubblica **non serve proteggere la riservatezza**. Serve perÃ² proteggerne l'**autenticitÃ **. Se un attaccante riesce a farti accettare la *propria* chiave pubblica al posto di quella del destinatario, cifrerai per lui: Ã¨ l'attacco *man-in-the-middle*, ed Ã¨ esattamente il problema che la **PKI** risolve facendo firmare la chiave pubblica da una CA fidata dentro un certificato. **Trappola d'esame:** la chiave pubblica non Ã¨ segreta, ma non per questo Ã¨ indifferente da dove arriva."
      },
      {
        name: "Private Key",
        checklistKey: "PrivateKeyConcept",
        definition: "La componente segreta della coppia di chiavi asimmetriche che deve essere custodita dal proprietario per decifrare o firmare.",
        details: "Ãˆ l'elemento segreto della coppia asimmetrica: se trapela, un attaccante puÃ² impersonare il titolare nelle firme future e decifrare i dati cifrati direttamente per quella chiave; occorre revocarla e sostituirla.\n* **Custodia:** non deve essere condivisa. Se backup o migrazione ne richiedono l'esportazione, servono cifratura, controllo degli accessi e tracciamento; idealmente resta non esportabile in smart card, TPM o HSM.\n* **Decifrazione:** decifra i dati cifrati con la chiave pubblica corrispondente quando lo schema usa cifratura asimmetrica.\n* **Firma:** produce firme verificabili con la chiave pubblica; la firma non rende il documento immutabile, ma rende rilevabile una modifica.\n* **Forward secrecy:** la compromissione successiva della chiave del certificato non decifra retroattivamente sessioni TLS basate su ECDHE, ma permette impersonazione futura finchÃ© chiave e certificato non vengono sostituiti.\n\n* **Piccolo Esempio Concentrato:** Se viene sottratta la chiave privata TLS di un server, l'organizzazione revoca il certificato e distribuisce una nuova coppia. Le vecchie sessioni ECDHE catturate restano protette dalla forward secrecy; file cifrati direttamente per la chiave compromessa possono invece essere a rischio.",
        examTip: "In un esame di sicurezza, qualsiasi scenario in cui una chiave privata viene esportata o condivisa rappresenta una grave violazione."
      },
      {
        name: "CSR",
        checklistKey: "CSRConcept",
        definition: "Certificate Signing Request: un blocco di testo codificato generato dal richiedente del certificato e inviato a una CA.",
        details: "Il file formale necessario per avviare l'emissione di un certificato SSL/TLS ufficiale:\n* **Contenuto Chiave:** Include la **chiave pubblica** del richiedente (generata localmente sul server insieme alla chiave privata) e i dettagli identificativi del richiedente (es. Common Name - CN: `www.azienda.com`, localitÃ , organizzazione).\n* **Firma di Controllo:** Il file CSR viene firmato con la chiave privata del richiedente per dimostrare alla CA che possiede effettivamente il controllo del set di chiavi asimmetriche creato.\n\n* **Piccolo Esempio Concentrato:** Un webmaster genera localmente sul server web IIS una coppia di chiavi crittografiche. Genera quindi il file CSR contenente solo la chiave pubblica e lo carica sul portale di DigiCert per richiedere l'emissione del certificato ufficiale, mantenendo la chiave privata al sicuro sul server.",
        examTip: "La chiave privata non viene mai inclusa o inviata alla CA all'interno del file CSR."
      },
      {
        name: "Certificates",
        checklistKey: "CertificatesConcept",
        definition: "Documenti digitali che legano in modo sicuro l'identitÃ  di un soggetto alla sua chiave pubblica tramite la firma di una CA fidata.",
        details: "Attestati digitali conformi allo standard X.509 che servono a prevenire attacchi di impersonificazione sul web:\n* **Elementi Interni:** IdentitÃ  del possessore (Soggetto, CN, SAN), chiave pubblica del possessore, firma digitale della Certificate Authority, algoritmi di cifratura supportati e date di validitÃ .\n* **Che cosa provano davvero:** legano crittograficamente una chiave pubblica a **uno o piÃ¹ nomi di dominio verificati** dalla CA. Ãˆ una prova forte sul **nome**, non sull'onestÃ  di chi lo possiede: un sito di phishing puÃ² registrare un proprio dominio e ottenere per esso un certificato perfettamente valido.\n* **CN o SAN? Solo SAN:** il nome host si verifica **esclusivamente** sul campo **SAN** (*Subject Alternative Name*). Il **Common Name** sopravvive per compatibilitÃ  storica, ma dal 2017 i browser lo **ignorano**: un certificato che elenchi il dominio solo nel CN, senza SAN, viene rifiutato. Ãˆ la ragione per cui anche un certificato per un solo dominio contiene comunque un SAN.\n\n* **Piccolo Esempio Concentrato:** Quando accedi al sito di un'istituzione governativa, il browser ispeziona il certificato inviato dal server e verifica che il dominio digitato compaia fra i nomi elencati nel **SAN**, che il certificato non sia scaduto nÃ© revocato e che la catena di firme risalga a una CA presente nel proprio archivio di radici attendibili.",
        examTip: "Un certificato scaduto, revocato o con un nome di dominio non corrispondente (Mismatched Name) fa fallire la validazione: il browser interrompe l'handshake e mostra un avviso di sicurezza a tutta pagina. Attenzione: l'utente puÃ² in genere forzare il proseguimento (a meno di HSTS o certificate pinning), quindi non si tratta di un blocco tecnicamente inaggirabile. **Trappola d'esame:** il confronto del nome host avviene sul **SAN**, non sul Common Name, che i browser ignorano dal 2017. E ricorda il limite di ciÃ² che il certificato dimostra: che stai parlando con il server di *quel dominio* su un canale cifrato, **non** che l'organizzazione dietro il sito sia affidabile."
      },
      {
        name: "Wildcard Certificates",
        checklistKey: "WildcardCertificates",
        definition: "Un tipo flessibile di certificato digitale che protegge un dominio principale e tutti i suoi sottodomini di primo livello.",
        details: "Ottimizza la gestione dei certificati in infrastrutture con molteplici server web:\n* **Sintassi di Emissione:** Viene emesso utilizzando un asterisco prima del dominio principale (es. `*.azienda.it`).\n* **Copertura Estesa:** Protegge contemporaneamente `mail.azienda.it`, `shop.azienda.it`, `portal.azienda.it` e qualsiasi altro sottodominio di primo livello.\n* **Svantaggio di Sicurezza:** Se la chiave privata associata al certificato wildcard viene compromessa, tutti i sottodomini associati diventano vulnerabili simultaneamente all'intercettazione.\n\n* **Piccolo Esempio Concentrato:** Un'universitÃ  con centinaia di dipartimenti acquista un certificato wildcard `*.universita.edu`. Questo consente di implementare l'HTTPS sicuro su `ingegneria.universita.edu` e `medicina.universita.edu` usando un unico file di certificato e risparmiando significativi costi di acquisto.",
        examTip: "I certificati wildcard coprono solo un livello di sottodominio (es. non coprono `sub.mail.azienda.it` se emesso per `*.azienda.it`)."
      },
      {
        name: "Hashing",
        checklistKey: "HashingConcept",
        definition: "L'applicazione di una funzione matematica unidirezionale per trasformare dati di input in una stringa di output a lunghezza fissa.",
        details: "Consente di **verificare l'integritÃ ** confrontando il digest con un riferimento autentico. Ãˆ unidirezionale, deterministico, produce un forte effetto valanga e deve rendere impraticabile costruire collisioni. MD5 e SHA-1 hanno perso la resistenza alle collisioni e sono deprecati; SHA-256 e SHA-3 sono scelte correnti.\n* **Il limite decisivo:** un hash non autenticato non impedisce a un attaccante di sostituire **sia il file sia il digest**. Per autenticare il riferimento servono una firma digitale, un MAC/HMAC o un canale attendibile.\n\n* **Piccolo Esempio Concentrato:** Un utente scarica una ISO da un mirror e confronta SHA-256 con il digest pubblicato tramite un canale fidato. Se anche la pagina potesse essere alterata, dovrebbe verificare una **firma digitale** del file o del digest.",
        examTip: "L'hashing consente di **rilevare modifiche** solo se il digest di riferimento Ã¨ autentico. Non fornisce riservatezza e, da solo, non autentica l'origine: firma digitale e HMAC aggiungono autenticitÃ  al controllo d'integritÃ ."
      },
      {
        name: "Salting",
        checklistKey: "SaltingConcept",
        definition: "La pratica di aggiungere una stringa di caratteri casuali univoci (sale) alla password prima dell'hashing.",
        details: "Protegge i database delle credenziali dal **precalcolo**, non dalla lentezza di indovinare una singola password:\n* **Funzione del Sale:** Impedisce che password identiche scelte da utenti diversi ('Password123') producano lo stesso hash visibile nel database.\n* **Prevenzione Rainbow Table:** Rende del tutto inutilizzabili le tabelle arcobaleno (rainbow tables), ovvero enormi elenchi precomputati di combinazioni di password comuni e relativi hash standard.\n\n* **Piccolo Esempio Concentrato:** Due colleghi scelgono la stessa password `Sole2026`. Al momento del salvataggio, il sistema assegna un sale casuale `Xy3Z` al primo utente e `K9pL` al secondo. Gli hash salvati sul database risulteranno completamente differenti, impedendo a un attaccante di capire che possiedono la stessa password.",
        examTip: "Il **sale** serve a impedire il **precalcolo**: con un sale casuale e diverso per ogni utente, le *rainbow table* costruite in anticipo diventano inutili e due utenti con la stessa password producono hash diversi. **Attenzione a che cosa il sale NON fa:** non rallenta di un millisecondo il tentativo di indovinare **una singola** password, perchÃ© l'attaccante che ha rubato il database ha anche il sale, che Ã¨ conservato in chiaro accanto all'hash. Contro la forza bruta serve un'altra proprietÃ , la **lentezza**, che si ottiene con una funzione di key stretching â€” bcrypt, scrypt, Argon2. Sale e lentezza si usano insieme e risolvono due problemi diversi."
      },
      {
        name: "Digital Signatures",
        checklistKey: "DigitalSignaturesConcept",
        definition: "Un meccanismo crittografico asimmetrico utilizzato per verificare l'autenticitÃ  e l'integritÃ  di un documento.",
        details: "Fornisce contemporaneamente tre garanzie chiave: AutenticitÃ  del mittente, IntegritÃ  del dato e Non-Ripudio:\n* **Fase di Creazione (Mittente):** Calcola l'**hash** del messaggio e, con la propria **chiave privata**, produce la **firma** applicando un algoritmo di firma (RSA-PSS, ECDSA, Ed25519). *(Non Ã¨ una cifratura dell'hash: quella descrizione vale solo per il vecchio RSA PKCS#1 v1.5.)*\n* **Fase di Verifica (Destinatario):** riceve il messaggio e la firma, ricalcola l'**hash** del messaggio e **verifica la firma** con la **chiave pubblica del mittente**. *(Si legge spesso Â«decifra la firma per estrarre l'hashÂ»: Ã¨ un'analogia che descrive solo il vecchio RSA PKCS#1 v1.5; negli schemi moderni â€” RSA-PSS, ECDSA, Ed25519 â€” si **verifica**, non si decifra.)* Se la verifica riesce, il documento Ã¨ integro e proviene effettivamente dal mittente.\n\n* **Piccolo Esempio Concentrato:** Uno sviluppatore rilascia un aggiornamento software. Firma digitalmente il file eseguibile usando la chiave privata della societÃ . Quando l'utente installa il software, il sistema operativo **verifica la firma** con la chiave pubblica dello sviluppatore, accertando che il pacchetto non sia stato alterato da un malware lungo la strada.",
        examTip: "Ricorda bene per l'esame: per creare una firma si usa la propria chiave PRIVATA; per verificarla si usa la chiave PUBBLICA del mittente."
      },
      {
        name: "TPM",
        checklistKey: "TPMHardware",
        definition: "Trusted Platform Module: modulo hardware o firmware, conforme allo standard TCG, che protegge le chiavi crittografiche e registra misurazioni della piattaforma per measured boot e attestazione.",
        details: "Un modulo crittografico locale integrato nei singoli dispositivi (laptop, server):\n* **Protezione delle chiavi:** genera e usa chiavi senza esporne normalmente il materiale privato. BitLocker puÃ² sigillare al TPM il materiale che protegge il volume; dire che la chiave Ã¨ semplicemente 'nel TPM' Ã¨ una semplificazione.\n* **Measured boot e attestazione:** registra nei **PCR** le misurazioni dei componenti caricati all'avvio, cosÃ¬ che un verificatore possa valutare lo stato della piattaforma. Le misurazioni **registrano**, non bloccano.\n* **TPM e Secure Boot non sono la stessa cosa:** Secure Boot verifica le firme nel firmware UEFI e puÃ² rifiutare il boot; il TPM protegge chiavi e misure. Sono funzioni distinte e complementari.\n* **Discreto o firmware:** puÃ² essere un chip dedicato oppure un **fTPM** eseguito in un ambiente isolato del processore.\n* **Generazione casuale:** espone un generatore conforme alla specifica, alimentato da una sorgente di entropia e sottoposto a condizionamento; non Ã¨ corretto descriverne l'output come 'entropia pura'.\n\n* **Piccolo Esempio Concentrato:** Un consulente smarrisce il portatile. Estrarre il disco non basta a leggere il volume BitLocker perchÃ© il materiale di sblocco Ã¨ protetto e puÃ² essere sigillato allo stato atteso della piattaforma; PIN e recovery key restano controlli essenziali nei profili che li prevedono.",
        examTip: "Il TPM Ã¨ **locale al singolo dispositivo**: qui sta la differenza dall'**HSM**, che Ã¨ un modulo condiviso di livello enterprise, spesso in rete, per proteggere le chiavi di molte applicazioni o di una CA. **Trappola d'esame:** non confondere **TPM** (custodisce chiavi e **misura** l'avvio) con **Secure Boot** (il firmware UEFI **verifica le firme** e puÃ² bloccare l'avvio). Misurare non Ã¨ impedire: solo Secure Boot rifiuta il codice non firmato."
      },
      {
        name: "HSM",
        checklistKey: "HSMHardware",
        definition: "Hardware Security Module: un dispositivo fisico dedicato di livello enterprise per la protezione e l'elaborazione sicura di chiavi crittografiche.",
        details: "Dispositivi ad alte prestazioni e massima protezione fisica destinati ad ambienti enterprise centralizzati:\n* **Struttura Fisica:** Si presenta come un modulo rack di rete autonomo o una scheda di espansione PCIe per server.\n* **Prestazioni Elevate:** Progettato per effettuare migliaia di operazioni crittografiche al secondo (es. firma di certificati per una Certificate Authority o elaborazione di transazioni bancarie).\n* **Sensori Anti-Manomissione (Tamper-Responsive):** Include sensori fisici di temperatura, pressione o fessurazione che provocano la distruzione istantanea e totale di tutte le chiavi memorizzate se il guscio metallico viene aperto o forzato.\n\n* **Piccolo Esempio Concentrato:** Una banca centrale gestisce un HSM di rete blindato per firmare digitalmente tutti i flussi di pagamento interbancari. Se un ladro tenta di smontare il dispositivo HSM fisicamente dal rack per rubarne i segreti, il microchip distrugge istantaneamente le chiavi private interne.",
        examTip: "Se lo scenario d'esame richiede protezione enterprise e firma di certificati in cluster, la risposta corretta Ã¨ l'HSM."
      },
      {
        name: "Key Escrow",
        checklistKey: "KeyEscrowConcept",
        definition: "Un accordo di sicurezza in cui le chiavi crittografiche vengono depositate e conservate da una terza parte autorizzata fidata.",
        details: "Garantisce la recuperabilitÃ  dei dati aziendali cifrati a fronte di perdite o emergenze:\n* **Funzione di Backup Fiduciario:** Le chiavi private di cifratura dei file degli impiegati vengono depositate in sicurezza in un archivio centralizzato gestito da una terza parte interna o esterna.\n* **Prevenzione Perdita Dati:** Impedisce che il licenziamento improvviso di un dipendente o lo smarrimento di una smart card hardware renda i dati aziendali crittografati persi e illeggibili per sempre.\n* **Controlli di Rilascio Rigidi:** Il recupero delle chiavi richiede l'approvazione congiunta di molteplici figure di garanzia (es. principio dei due uomini).\n\n* **Piccolo Esempio Concentrato:** Un ingegnere che ha cifrato i progetti industriali di un nuovo brevetto si licenzia improvvisamente cancellando le proprie password. La direzione aziendale, tramite un processo formale di Key Escrow, richiede al comitato fiduciario di recuperare la copia di backup della chiave privata per poter decifrare e continuare lo sviluppo dei progetti.",
        examTip: "Il **key escrow** risponde a un problema reale: se l'unica copia della chiave Ã¨ sul portatile di chi si Ã¨ licenziato, i dati cifrati sono persi. Depositarne una copia presso una parte fidata li rende recuperabili. **Il prezzo, che l'esame chiede di conoscere:** quella copia Ã¨ essa stessa un bersaglio, e concentra in un solo punto la capacitÃ  di decifrare tutto. E su una chiave di **firma** l'escrow distrugge il **non ripudio**, perchÃ© la chiave privata non Ã¨ piÃ¹ posseduta da una sola persona. Per questo si mette in escrow la chiave di **cifratura**, non quella di firma, e l'accesso al deposito si protegge con il controllo a due persone."
      },
      {
        name: "Block cipher",
        checklistKey: "BlockCipherConcept",
        definition: "Un tipo di cifratura simmetrica che suddivide il testo in chiaro in blocchi di dimensione fissa prima di cifrarli.",
        details: "Caratteristiche dei cifrari a blocchi (Block Ciphers):\n* **Dimensione Fissa:** Elaborano i dati in blocchi di byte di dimensione fissa (es. 128 bit per AES, 64 bit per DES).\n* **Padding:** Se l'ultimo blocco di dati Ã¨ incompleto, l'algoritmo applica un riempimento (padding) per raggiungere la dimensione fissa richiesta.\n* **ModalitÃ  di Funzionamento (Modes of Operation):** Definiscono come cifrare blocchi multipli (es. ECB, CBC, GCM).\n* **Esempi:** AES, DES, 3DES, Blowfish.",
        examTip: "I cifrari a blocchi richiedono algoritmi di padding per completare l'ultimo blocco di dati se non Ã¨ della dimensione fissa richiesta."
      },
      {
        name: "AES",
        checklistKey: "AES256Concept",
        definition: "Advanced Encryption Standard: un algoritmo di cifratura simmetrica a blocchi standard del governo statunitense, ampiamente considerato sicuro a livello globale.",
        details: "Caratteristiche di AES-256:\n* **Robustezza:** Utilizza chiavi a 128, 192 o 256 bit per cifrare blocchi di dati a 128 bit. Ad oggi non sono noti attacchi pratici contro l'algoritmo; le violazioni reali nascono quasi sempre da **implementazioni difettose**, da **chiavi gestite male** o da **modalitÃ  operative** scelte male (per esempio ECB), non dalla matematica di AES.\n* **Standard di Riferimento:** Ãˆ l'algoritmo raccomandato per la cifratura dei dati sensibili a riposo (Data at Rest).\n* **Ampio Supporto:** Integrato nativamente in quasi tutti i moderni processori tramite istruzioni hardware dedicate (AES-NI) per performance eccezionali.",
        examTip: "AES-256 Ã¨ la scelta predefinita e consigliata per garantire la riservatezza dei dati a riposo e dei database aziendali."
      },
      {
        name: "Stream cipher",
        checklistKey: "StreamCipherConcept",
        definition: "Un tipo di cifratura simmetrica che cifra il testo in chiaro un bit o un byte alla volta in tempo reale.",
        details: "Caratteristiche dei cifrari a flusso (Stream Ciphers):\n* **Efficienza in Tempo Reale:** Cifrano i dati in modo continuo (un bit o byte alla volta), rendendoli ideali per flussi audio/video o comunicazioni di rete a bassa latenza.\n* **Keystream:** Combinano il testo in chiaro con un flusso di chiavi pseudo-casuale (keystream) tramite un'operazione XOR.\n* **Esempi:** RC4 (obsoleto e vulnerabile), ChaCha20.",
        examTip: "I cifrari a flusso sono ideali per la trasmissione di dati in tempo reale o flussi continui in cui la lunghezza totale del messaggio non Ã¨ nota a priori."
      },
      {
        name: "Key Stretching",
        checklistKey: "KeyStretchingConcept",
        definition: "Una tecnica crittografica progettata per rendere le password piÃ¹ resistenti agli attacchi brute-force offline aumentando il costo computazionale dell'hashing.",
        details: "Meccanismo e algoritmi di Key Stretching:\n* **Salt e fattore di costo:** la funzione di derivazione combina la password con un **salt diverso per ogni credenziale** e con un costo configurabile, che rallenta **ogni singolo tentativo**. Il salt impedisce le rainbow table; il costo rende lenta la forza bruta.\n* **Rallentamento Intenzionale:** il tempo per calcolare un hash passa da nanosecondi a frazioni di secondo. Per l'utente legittimo il ritardo Ã¨ impercettibile; per chi prova miliardi di combinazioni offline su GPU il costo si moltiplica per ogni tentativo.\n* **Gli algoritmi non sono equivalenti:** **PBKDF2** agisce solo sul numero di **iterazioni**, quindi si parallelizza bene su GPU e ASIC. **bcrypt** usa un fattore di costo e un accesso alla memoria che lo rendono meno conveniente da parallelizzare. **scrypt** e **Argon2** aggiungono un **costo di memoria** esplicito, che Ã¨ oggi la difesa piÃ¹ efficace contro l'hardware dedicato; Argon2id Ã¨ la scelta preferita per le nuove applicazioni.\n* **Che cosa NON fa:** aumenta il **lavoro** dell'attaccante, non rende **matematicamente impossibile** indovinare. Una password debole o giÃ  presente in una raccolta pubblica cade comunque, solo piÃ¹ lentamente: la derivazione va affiancata al controllo contro elenchi di credenziali compromesse e a una lunghezza adeguata.",
        examTip: "Il Key Stretching aumenta intenzionalmente il costo di **ogni tentativo**, contrastando la forza bruta offline su GPU. **Trappola d'esame:** non Ã¨ una garanzia di inviolabilitÃ , ma un moltiplicatore di tempo; e i quattro algoritmi non sono intercambiabili â€” PBKDF2 agisce sulle sole iterazioni, scrypt e Argon2 impongono anche un costo di **memoria**, che Ã¨ ciÃ² che ostacola davvero l'hardware dedicato. Ricorda inoltre che il **salt** serve a rendere unico ogni hash, non a rallentarlo: rallentare Ã¨ compito del fattore di costo."
      },
      {
        name: "Blockchain",
        checklistKey: "BlockchainConcept",
        definition: "Blockchain: registro distribuito resistente alle alterazioni, in cui i blocchi sono collegati fra loro tramite hash; puÃ² essere pubblico oppure permissioned. Open public ledger: registro consultabile da chiunque, spesso realizzato con una blockchain pubblica.",
        details: "Gli obiettivi ufficiali SY0-701 (Obj 1.4) elencano **blockchain** e **open public ledger** come due voci **distinte**, e la distinzione conta:\n* **Blockchain** Ã¨ la **struttura dati**: blocchi concatenati da hash, replicati su piÃ¹ nodi, con regole di consenso. Dice **come** il registro resiste alle alterazioni, non chi puÃ² leggerlo.\n* **Open public ledger** riguarda invece la **visibilitÃ **: Ã¨ un registro che chiunque puÃ² consultare. Si realizza tipicamente con una blockchain pubblica, ma esistono blockchain **permissioned**, in cui lettura e scrittura sono riservate a partecipanti autorizzati: quelle **non** sono registri pubblici.\n* **Resistenza alle alterazioni:** ogni blocco contiene l'hash del precedente, quindi modificare un dato passato rende l'intera catena successiva incoerente. La soliditÃ  dipende da hash, **meccanismo di consenso** e regole della rete. La celebre soglia del **51%** descrive il Proof of Work e non vale universalmente: altri meccanismi (Proof of Stake, consenso permissioned) hanno soglie e ipotesi diverse.\n* **Che cosa dimostra, e che cosa no:** l'hashing rende un'alterazione **rilevabile**. **AutenticitÃ ** e **non ripudio** di una transazione non discendono dal registro in sÃ©, ma dalle **firme digitali** e da una gestione affidabile delle chiavi.\n\n* **Piccolo Esempio Concentrato:** un consorzio di aziende agroalimentari registra i passaggi di un lotto di olio. Se sceglie una blockchain **permissioned**, i partecipanti autorizzati vedono la filiera e nessuno di loro puÃ² riscrivere da solo un passaggio giÃ  registrato, ma il pubblico non legge nulla. Se vuole che il consumatore verifichi in autonomia inquadrando il codice sulla bottiglia, serve un **registro pubblico**: allora bisogna decidere in anticipo quali dati esporre, perchÃ© tutto ciÃ² che finisce lÃ¬ Ã¨ visibile a chiunque, per sempre.",
        examTip: "**Trappola d'esame:** blockchain e open public ledger non sono sinonimi. La blockchain Ã¨ la **struttura** (hash concatenati + consenso), il ledger pubblico Ã¨ una **scelta di visibilitÃ **. Ricorda che cosa un registro distribuito offre e che cosa no: dÃ  **integritÃ ** e **disponibilitÃ ** grazie alle copie replicate, e **tracciabilitÃ **; non dÃ  **riservatezza**, e da solo non dÃ  **non ripudio**, che arriva dalle firme. Regola pratica: non scrivere mai segreti in chiaro su un ledger pubblico, perchÃ© non esiste un modo per cancellarli."
      },
      {
        name: "Code signing",
        checklistKey: "CodeSigningConcept",
        definition: "Firma del codice: Il processo di firma digitale di script ed eseguibili tramite certificati crittografici asimmetrici per garantirne l'autenticitÃ  e l'integritÃ .",
        details: "Il code signing consente agli sviluppatori software di firmare digitalmente i propri programmi o aggiornamenti prima della distribuzione:\n* **AutenticitÃ :** Il sistema operativo o il client dell'utente finale verifica la firma utilizzando la chiave pubblica del produttore, garantendo la provenienza fidata della risorsa.\n* **IntegritÃ :** Assicura che il file non sia stato alterato, danneggiato o manomesso da terze parti (ad esempio iniettando malware) lungo la catena di distribuzione.\n\n* **Piccolo Esempio Concentrato:** Un'azienda di software rilascia una patch di sicurezza critica. Prima di distribuirla, firma l'eseguibile con la propria chiave privata aziendale (**Code signing**). Quando i sistemi dei clienti scaricano l'aggiornamento, verificano la firma crittografica con la chiave pubblica per convalidare l'origine legittima prima di eseguire l'installazione automatica.",
        examTip: "Il Code signing assicura la provenienza fidata (autenticitÃ ) e l'assenza di alterazioni non autorizzate (integritÃ ) del software o degli aggiornamenti in fase di distribuzione."
      }
    ]
  },
  {
    title: "6. Physical Security (Obj 1.2)",
    description: "Controlli fisici per proteggere strutture e asset tangibili.",
    icon: "Lock",
    subtopics: [
      {
        name: "Badge",
        checklistKey: "PhysicalBadge",
        definition: "Smart card e tessere identificative fisiche utilizzate per autenticare gli individui e controllare gli accessi.",
        details: "Tessere e credenziali tangibili destinate alla regolazione degli spostamenti fisici:\n* **Tecnologie Integrate:** NFC (Near Field Communication) e RFID consentono l'apertura delle porte blindate avvicinando la tessera al lettore.\n* **Identificazione Visiva:** Solitamente mostrano la foto, il nome e il dipartimento dell'impiegato per controlli visivi da parte delle guardie.\n* **Integrazione MFA:** Possono essere combinati con l'inserimento di un PIN sul tastierino numerico della porta.\n\n* **Piccolo Esempio Concentrato:** Per entrare nell'ala protetta dello sviluppo software, un dipendente deve accostare il proprio badge RFID al lettore a muro: il sistema di controllo accessi sblocca l'elettroserratura e registra l'ingresso nel log di audit.",
        examTip: "La combinazione di un badge (qualcosa che hai) con un codice PIN sul lettore della porta (qualcosa che sai) costituisce un'autenticazione fisica a due fattori."
      },
      {
        name: "Security Guards",
        checklistKey: "SecurityGuards",
        definition: "Personale umano impiegato per vigilare sul perimetro, gestire gli ingressi e rispondere ad anomalie fisiche.",
        details: "Rappresentano l'elemento umano di presidio e risposta adattiva d'emergenza sul campo:\n* **Fattore Adattivo:** A differenza dei sistemi automatici, le guardie possono valutare minacce insolite, sospettare comportamenti anomali e prendere decisioni dinamiche.\n* **Deterrenza Visiva:** La presenza visibile di personale di vigilanza riduce drasticamente il rischio di tentativi di effrazione.\n* **Risposta Attiva:** Intervenire per bloccare fisicamente un intruso o prestare soccorso in caso di incendio.\n\n* **Piccolo Esempio Concentrato:** Una guardia giurata di presidio all'ingresso principale del data center nota due persone vestite da manutentori che tentano di intrufolarsi camminando subito dietro ad un dipendente autorizzato (piggybacking). La guardia li ferma richiedendo le credenziali e sventando l'intrusione.",
        examTip: "All'esame, le guardie giurate sono classificate sia come controllo Fisico che Operativo."
      },
      {
        name: "Cameras",
        checklistKey: "PhysicalCameras",
        definition: "Sistemi di videosorveglianza (CCTV) posizionati strategicamente per monitorare e registrare l'attivitÃ .",
        details: "Sistemi elettronici per l'acquisizione visiva continua delle aree sensibili:\n* **Funzione Investigativa (Detective):** Consente di ripercorrere ed analizzare visivamente gli eventi accaduti dopo che si Ã¨ verificata una violazione.\n* **Deterrenza Attiva:** Telecamere ben visibili posizionate lungo le recinzioni scoraggiano i ladri.\n* **Video Analitica Moderna:** Algoritmi integrati in grado di allertare automaticamente il SOC in caso di scavalcamenti perimetrali.\n\n* **Piccolo Esempio Concentrato:** La mattina successiva al furto di alcuni monitor in ufficio, il team di sicurezza esamina le registrazioni visive delle telecamere CCTV interne, individuando l'orario esatto del furto e i volti dei responsabili da fornire alle forze dell'ordine.",
        examTip: "Il CCTV Ã¨ un classico controllo investigativo/rilevativo d'esame."
      },
      {
        name: "Fencing",
        checklistKey: "PhysicalFencing",
        definition: "Barriere perimetrali fisiche progettate per delimitare la proprietÃ  dell'organizzazione ed ostacolare l'accesso casuale.",
        details: "La prima linea di difesa fisica contro le intrusioni provenienti dall'esterno:\n* **Dimensionamento:** L'altezza della recinzione determina il grado di sicurezza (es. recinzioni da 2,4 metri con filo spinato scoraggiano la quasi totalitÃ  degli intrusi).\n* **Sensori di Vibrazione:** Possono integrare cavi microfonici per rilevare e allertare in caso di tentativi di taglio o arrampicata.\n\n* **Piccolo Esempio Concentrato:** Un impianto industriale di stoccaggio chimico Ã¨ circondato da una recinzione in acciaio zincato alta 3 metri sormontata da spirali di filo spinato concertina, che impedisce il passaggio e l'intrusione casuale di curiosi o malintenzionati.",
        examTip: "Le recinzioni fungono da controllo fisico preventivo delimitando chiaramente i confini della proprietÃ ."
      },
      {
        name: "Bollards",
        checklistKey: "PhysicalBollards",
        definition: "Dissuasori stradali pesanti di metallo o cemento, installati per impedire ai veicoli di impattare contro gli edifici.",
        details: "Misure di protezione meccanica ad altissima resistenza destinate all'arresto dei veicoli:\n* **Resistenza d'Arresto:** Progettati per assorbire l'energia cinetica d'impatto di vetture o camion lanciati ad alta velocitÃ .\n* **Prevenzione Ram-Raiding:** Evitano tentativi di sfondamento intenzionali diretti ad abbattere ingressi o vetrate per penetrare all'interno delle strutture.\n\n* **Piccolo Esempio Concentrato:** Davanti alle porte vetrate del piano terra di un prestigioso data center bancario sono installati robusti piloni d'acciaio riempiti di cemento e interrati in profonditÃ , rendendo fisicamente impossibile l'avvicinamento di auto o camion ostili.",
        examTip: "Se lo scenario d'esame descrive la minaccia di un veicolo che tenta di sfondare gli ingressi fisici dell'edificio, i dissuasori (Bollards) sono la contromisura corretta."
      },
      {
        name: "Sensors",
        checklistKey: "PhysicalSensors",
        definition: "Dispositivi elettronici progettati per rilevare variazioni fisiche o ambientali all'interno di un'area protetta.",
        details: "Sensori posizionati per garantire la stabilitÃ  ambientale ed antintrusione delle aree critiche.\n* **I quattro tipi nominati dall'obiettivo 1.2, e il difetto di ciascuno:**\n  - **Infrarosso (PIR, passivo):** rileva il **calore corporeo in movimento**. Economico e diffusissimo, ma perde sensibilitÃ  quando la temperatura ambiente si avvicina a quella del corpo â€” tipicamente nelle notti d'estate in un capannone â€” e non vede attraverso il vetro.\n  - **Pressione:** rileva il **peso** su una superficie: tappeti sensibili, pedane, pavimenti tecnici. Semplice e affidabile, ma copre solo la superficie su cui Ã¨ installato e si aggira camminando altrove.\n  - **Microonde:** emette onde radio e misura la variazione del segnale riflesso, quindi rileva il **movimento** indipendentemente dal calore, anche al buio totale. Copre volumi ampi, ma attraversa pareti sottili e puÃ² dare falsi positivi per il movimento oltre il muro.\n  - **Ultrasuoni:** stesso principio, con onde sonore ad alta frequenza. Sensibile ai piccoli movimenti, ma anche alle correnti d'aria dei condizionatori e ai rumori, che lo rendono soggetto a falsi allarmi.\n* **PerchÃ© spesso si combinano:** i sensori **a doppia tecnologia** (tipicamente infrarosso piÃ¹ microonde) fanno scattare l'allarme solo quando **entrambi** rilevano, il che abbatte i falsi positivi di ciascuno senza sacrificarne la copertura.\n* **Rilevamento Ambientale:** oltre all'antintrusione, sensori di umiditÃ , fumo, rilevatori di calore ad innalzamento rapido e sensori di allagamento sotto i pavimenti fluttuanti.\n\n* **Piccolo Esempio Concentrato:** All'interno della sala server, sotto il pavimento galleggiante dove passano i cavi elettrici, Ã¨ installato un sensore di allagamento. In caso di perdita d'acqua dal sistema di condizionamento, il sensore invia una notifica immediata di spegnimento d'emergenza prima che avvengano cortocircuiti.",
        examTip: "I sensori ambientali in sala server preservano la **DisponibilitÃ ** dell'hardware mitigando allagamenti e surriscaldamenti. **Trappola d'esame:** sui sensori antintrusione la domanda si risolve quasi sempre sul **difetto** del tipo sbagliato, non sul pregio di quello giusto. Ambiente caldo quanto un corpo umano â†’ l'**infrarosso** non vede, serve **microonde** Â· pavimento irregolare o ingombro â†’ il sensore a **pressione** non copre Â· correnti d'aria e rumore â†’ gli **ultrasuoni** danno falsi allarmi Â· troppi falsi positivi in generale â†’ sensore a **doppia tecnologia**."
      },
      {
        name: "HVAC",
        checklistKey: "HVACPhysical",
        definition: "Heating, Ventilation, and Air Conditioning: Sistemi fisici di riscaldamento, ventilazione e condizionamento dell'aria utilizzati per regolare i parametri di temperatura, umiditÃ  e purezza dell'aria.",
        details: "Il ruolo dei sistemi HVAC nella sicurezza dei data center:\n* **Prevenzione del surriscaldamento:** I server moderni generano enormi quantitÃ  di calore; se la temperatura della sala supera i limiti tollerati, i sistemi si spengono automaticamente per protezione termica (violando la disponibilitÃ ) o subiscono guasti hardware permanenti.\n* **Controllo dell'umiditÃ :**\n  - *Troppo bassa:* Favorisce l'accumulo di elettricitÃ  statica, provocando scariche elettrostatiche (ESD) letali per i chip di memoria e CPU.\n  - *Troppo alta:* Provoca fenomeni di condensa dell'acqua sui circuiti elettronici, con conseguenti cortocircuiti.\n* **Filtrazione dell'aria:** Rimuove polveri e particelle che potrebbero ostruire le ventole di raffreddamento dei server.\n* **Contenimento degli incendi:** I sistemi HVAC devono integrarsi con i rilevatori di fumo e calore per spegnersi istantaneamente in caso di incendio, evitando di alimentare le fiamme apportando ossigeno.",
        examTip: "In un data center, il mantenimento di un'umiditÃ  e di una temperatura controllate tramite sistemi HVAC Ã¨ vitale per prevenire scariche elettrostatiche (ESD, causate da umiditÃ  troppo bassa) e cortocircuiti (causati da condensa per umiditÃ  troppo alta)."
      },
      {
        name: "Access Control Vestibule",
        checklistKey: "AccessControlVestibule",
        definition: "Un piccolo locale con due porte interbloccate, di cui una sola puÃ² essere aperta per volta, che ammette una persona alla volta e rende meccanicamente impossibile entrare accodandosi a qualcun altro.",
        details: "Ãˆ l'unico controllo fisico che risolve il tailgating invece di scoraggiarlo o registrarlo:\n* **Come funziona:** la persona apre la prima porta con il proprio badge ed entra nel vestibolo; la prima porta deve richiudersi prima che la seconda possa aprirsi. Molti impianti aggiungono un sensore di peso o un conteggio delle persone, che blocca il ciclo se all'interno c'Ã¨ piÃ¹ di un individuo.\n* **Il problema che risolve:** il **tailgating**, in cui l'estraneo si accoda a un dipendente che non se ne accorge, e il **piggybacking**, in cui il dipendente gli tiene volontariamente la porta per cortesia. Sono comportamenti che la formazione riduce ma non elimina, perchÃ© chiedono a una persona di essere scortese con un'altra.\n* **PerchÃ© Ã¨ la risposta corretta negli scenari:** le telecamere documentano l'accaduto a posteriori, i cartelli dissuadono, la formazione riduce la frequenza. Solo il vestibolo rende il passaggio di due persone **fisicamente impossibile**.\n* **Limiti pratici da conoscere:** rallenta il flusso, quindi Ã¨ adatto agli ingressi di aree critiche â€” sala server, laboratori, caveau â€” e non a un atrio che deve smaltire centinaia di persone a inizio turno. Richiede inoltre una via di esodo conforme alle norme antincendio, perchÃ© in emergenza le persone devono poter uscire.\n\n* **Piccolo Esempio Concentrato:** L'ingresso di un data center Ã¨ protetto da un tornello con lettore di badge, ma il registro non torna: le presenze fisiche superano le strisciate. Le telecamere mostrano dipendenti che, per cortesia, tengono aperta la porta a chi li segue. Sostituito il varco con un vestibolo a doppia porta interbloccata, il fenomeno cessa: la seconda porta non si apre finchÃ© la prima non Ã¨ chiusa.",
        examTip: "**Attenzione al nome:** gli obiettivi SY0-701 lo chiamano **access control vestibule**; *mantrap* Ã¨ il termine storico, ancora diffuso sul campo ma non quello che troverai fra le opzioni d'esame. **Trappola d'esame:** quando lo scenario descrive tailgating o piggybacking e chiede il controllo che lo rende **impossibile**, la risposta Ã¨ il vestibolo â€” non le telecamere, che rilevano; non i cartelli, che dissuadono; non la formazione, che riduce soltanto la frequenza."
      },
      {
        name: "Lighting",
        checklistKey: "PhysicalLighting",
        definition: "L'illuminazione di sicurezza delle aree esterne e dei punti di accesso: un controllo fisico che scoraggia i tentativi di intrusione e, insieme, rende utilizzabili gli altri controlli di sorveglianza.",
        details: "Ãˆ il controllo fisico piÃ¹ sottovalutato, e quello da cui dipendono gli altri:\n* **La doppia funzione, che l'esame verifica:** l'illuminazione Ã¨ **deterrente**, perchÃ© chi agisce di nascosto evita gli spazi in cui puÃ² essere visto e riconosciuto, ed Ã¨ **abilitante**, perchÃ© senza luce le telecamere restituiscono immagini inutilizzabili e le guardie non vedono nulla.\n* **Dove si applica:** perimetro e recinzioni, parcheggi e piazzali, ingressi e uscite di sicurezza, banchine di carico, percorsi pedonali e ogni area in cui una telecamera debba riprendere volti o targhe.\n* **Criteri progettuali:** uniformitÃ , perchÃ© le zone d'ombra fra due lampioni sono esattamente il punto in cui ci si nasconde; assenza di abbagliamento verso le telecamere; attivazione da **sensore di movimento** dove una luce accesa in permanenza non Ã¨ sostenibile; alimentazione di emergenza sui punti critici, perchÃ© un'interruzione di corrente non deve spegnere insieme luci e sorveglianza.\n* **Il legame con le telecamere:** una telecamera Ã¨ buona quanto la luce che ha. Prima di sostituire gli apparati con modelli a risoluzione maggiore conviene verificare l'illuminazione: a paritÃ  di spesa Ã¨ quasi sempre l'intervento che produce il miglioramento piÃ¹ grande.\n\n* **Piccolo Esempio Concentrato:** Un sito industriale periferico subisce furti notturni dal piazzale. Le telecamere ci sono giÃ , ma di notte producono immagini inservibili. Illuminando il piazzale e completando la recinzione i tentativi calano subito â€” chi si avvicina sa di essere visibile â€” e le registrazioni diventano finalmente utilizzabili come prova.",
        examTip: "L'illuminazione compare fra i controlli fisici dell'obiettivo 1.2 ed Ã¨ l'esempio tipico di controllo **deterrente e abilitante insieme**. **Trappola d'esame:** quando lo scenario lamenta riprese notturne inservibili, la risposta non Ã¨ comprare telecamere migliori ma **illuminare l'area**; e quando chiede di scoraggiare i tentativi *prima* che avvengano, luce e recinzione vengono prima della videosorveglianza."
      }
    ]
  },
  {
    title: "7. Deception Technologies (Obj 1.2)",
    description: "Tecnologie basate sull'inganno per rilevare gli attaccanti precocemente.",
    icon: "Users",
    subtopics: [
      {
        name: "Honeypot",
        checklistKey: "HoneypotDeception",
        definition: "Un singolo sistema informatico, server o risorsa civetta configurato per apparire vulnerabile e attirare gli aggressori.",
        details: "Un'esca digitale isolata avente lo scopo di attrarre scansioni ed exploit attivi:\n* **Zero Traffico Legittimo:** PoichÃ© la macchina non ospita alcun servizio aziendale reale, qualsiasi tentativo di interazione, ping o login Ã¨ considerato ostile per definizione.\n* **Studio degli Attacchi:** Consente di catturare e analizzare in sicurezza le tattiche e gli zero-day utilizzati dagli hacker senza compromettere l'infrastruttura reale.\n\n* **Piccolo Esempio Concentrato:** Il team di sicurezza configura una macchina virtuale obsoleta con una porta RDP aperta e priva di patch, denominandola fittiziamente 'Server_Fatture_2025'. Qualsiasi hacker che scansiona la rete noterÃ  la macchina vulnerabile e tenterÃ  l'attacco, permettendo al team SOC di bloccare l'IP della minaccia sulla rete reale.",
        examTip: "L'Honeypot Ã¨ una tecnologia d'inganno (Deception) che funge anche da controllo investigativo (Detective)."
      },
      {
        name: "Honeynet",
        checklistKey: "HoneynetDeception",
        definition: "Una rete civetta completa composta da molteplici sistemi simulati, database e servizi fittizi.",
        details: "Un intero ecosistema simulato fittizio per uno studio approfondito del comportamento degli intrusi:\n* **Interazione Elevata:** Composta da server web finti, database simulati e router virtuali che cooperano tra loro.\n* **Analisi Movimenti Laterali:** Consente di studiare come l'attaccante si sposta all'interno della rete, quali password tenta di violare e quali strumenti di esplorazione locale scarica.\n\n* **Piccolo Esempio Concentrato:** Un'azienda di telecomunicazioni implementa una sottorete fittizia che imita la rete di controllo di una centrale elettrica. Gli attaccanti, credendo di aver penetrato l'infrastruttura reale, passano giorni a scansionare i finti plc industriali, mentre i ricercatori ne registrano ogni singola mossa e comando.",
        examTip: "Le Honeynet catturano l'intero comportamento di un attaccante a livello di rete."
      },
      {
        name: "Honeyfile",
        checklistKey: "HoneyfileDeception",
        definition: "File fittizi dai nomi accattivanti contenenti informazioni fasulle, posizionati per rilevare accessi non autorizzati.",
        details: "Documenti esca posizionati in cartelle condivise o server di file aziendali:\n* **Nomi Accattivanti:** Denominati in modo da attrarre la curiositÃ  di insider malintenzionati o hacker (es. `password_server.txt` o `bonus_stipendi_2026.xlsx`).\n* **Allarme Silenzioso:** Dotati di sensori o script software; se il file viene aperto, copiato o scaricato, genera all'istante un allarme ad altissima prioritÃ  nel SIEM indicando l'account compromesso.\n\n* **Piccolo Esempio Concentrato:** Un amministratore inserisce il file `progetti_segreti.docx` in una cartella accessibile del cloud aziendale. Il file contiene solo testo fittizio ma include un pixel tracciante web: quando un utente non autorizzato apre il file, il pixel invia una richiesta HTTP silenziosa che allerta immediatamente il team di sicurezza.",
        examTip: "L'apertura di un honeyfile Ã¨ un indicatore di compromissione (IoC) estremamente preciso poichÃ© nessun utente legittimo ha motivo di aprirlo."
      },
      {
        name: "Honeytoken",
        checklistKey: "HoneytokenDeception",
        definition: "Dati fittizi speciali diffusi nei sistemi per tracciare e rilevare l'esfiltrazione.",
        details: "Elementi e stringhe di dati fittizie inserite all'interno di database reali o codici sorgente:\n* **Rilevamento Fughe Dati:** Indirizzi email fittizi inseriti nel database dei clienti; se questi indirizzi iniziano a ricevere spam, l'azienda ha la prova che il database Ã¨ stato esfiltrato.\n* **Rilevamento Uso Credenziali:** Chiavi API fittizie inserite nel codice software su GitHub; se qualcuno tenta di usarle per interrogare il cloud, scatta un allarme istantaneo identificando la provenienza dell'attaccante.\n\n* **Piccolo Esempio Concentrato:** Uno sviluppatore inserisce una chiave API AWS fittizia e disattivata nel codice sorgente pubblico. Un bot di un hacker scansiona GitHub, trova la chiave e tenta di usarla per lanciare istanze EC2: il sistema AWS CloudTrail rileva il tentativo d'uso della chiave honeytoken fittizia ed invia un alert di compromissione in tempo reale.",
        examTip: "I honeytoken aiutano a rilevare le violazioni dei dati anche quando questi escono completamente dal controllo perimetrale della tua rete."
      }
    ]
  },
  {
    title: "8. Identity & Access Control Models (Obj 4.6)",
    description: "Gestione delle identitÃ , autenticazione a piÃ¹ fattori, servizi di directory e modelli di autorizzazione. âš ï¸ Questi argomenti appartengono all'obiettivo 4.6 (Security Operations): sono raccolti qui perchÃ© servono fin da subito, ma all'esame contano come Dominio 4, non come Dominio 1.",
    icon: "Users",
    subtopics: [
      {
        name: "Authentication",
        checklistKey: "AuthenticationConcept_New",
        definition: "Autenticazione: Il processo di verifica dell'identitÃ  rivendicata da un utente, computer o servizio IT che tenta di accedere a un sistema.",
        details: "Dettagli sull'Autenticazione:\n* **Scopo:** Risponde alla domanda: *'Chi sei?'* o *'Sei chi dichiari di essere?'*.\n* **Fattori di Autenticazione:** Si basa sulla convalida di uno o piÃ¹ fattori, tra cui password (qualcosa che sai), token/smart card (qualcosa che hai) o dati biometrici (qualcosa che sei).\n* **Esempio pratico:** Inserire nome utente e password e superare una richiesta di codice OTP inviato via SMS per accedere alla casella email di lavoro.",
        examTip: "L'autenticazione Ã¨ sempre la prima fase del framework AAA; convalida e certifica un'identitÃ  dichiarata prima di valutare quali diritti di accesso assegnarle."
      },
      {
        name: "Authorization",
        checklistKey: "AuthorizationConcept_New",
        definition: "Autorizzazione: Il processo di concessione o negazione di specifici diritti di accesso, permessi e privilegi a un'identitÃ  che Ã¨ giÃ  stata autenticata con successo.",
        details: "Dettagli sull'Autorizzazione:\n* **Scopo:** Risponde alla domanda: *'Cosa ti Ã¨ consentito fare?'*.\n* **Meccanismi d'Imposizione:** Viene controllata tramite liste di controllo degli accessi (ACL), ruoli (RBAC), o attributi dinamici (ABAC) definiti dall'amministratore.\n* **Esempio pratico:** Un dipendente HR autenticato tenta di aprire la cartella stipendi: il server esamina le ACL di Windows ed autorizza l'accesso poichÃ© il dipendente appartiene al gruppo 'Ufficio Personale'.",
        examTip: "L'autorizzazione avviene esclusivamente *dopo* che l'utente Ã¨ stato autenticato con successo; definisce e impone in modo granulare i confini operativi dell'utente."
      },
      {
        name: "Accounting",
        checklistKey: "AccountingConcept_New",
        definition: "Accounting (Tracciamento e Auditing): Il processo di registrazione e monitoraggio cronologico di tutte le attivitÃ  svolte da un'identitÃ  all'interno del sistema informatico.",
        details: "Dettagli sull'Accounting:\n* **Scopo:** Risponde alla domanda: *'Cosa hai fatto e quando?'*.\n* **Applicazione:** Raccoglie telemetria e log dettagliati (es. comandi digitati, file modificati, orari di login/logout, indirizzi IP usati).\n* **Accountability, non prova assoluta:** log centralizzati, protetti da accessi e modifiche, sincronizzati temporalmente e conservati secondo policy rendono le azioni attribuibili e difficili da contestare. Un log, perÃ², non dimostra da solo chi fosse materialmente alla tastiera: credenziali condivise o rubate indeboliscono l'attribuzione. Il non ripudio forte richiede anche identitÃ  affidabili, firme digitali o altri controlli che leghino l'azione al soggetto.\n* **Esempio pratico:** Il SIEM registra che l'account 'm.rossi' ha effettuato l'accesso alle 03:00 ed esportato un report clienti da 5 GB. Ãˆ un'evidenza importante da correlare con MFA, dispositivo sorgente e altri log, non una prova inoppugnabile della persona fisica.",
        examTip: "L'Accounting fornisce **tracciabilitÃ  e accountability**. Un audit log integro supporta l'attribuzione, ma non equivale automaticamente al non ripudio: se l'account Ã¨ condiviso o compromesso, il log identifica la credenziale usata, non necessariamente la persona."
      },
      {
        name: "Access Control Models & Directory Services",
        checklistKey: "AccessControlModels",
        definition: "I modelli di autorizzazione (RBAC, ABAC, MAC, DAC) e i servizi di directory centralizzati per l'Identity and Access Management.",
        details: "Definiscono le logiche e i protocolli matematici/amministrativi tramite cui concedere i permessi d'accesso alle informazioni:\n* **RBAC (Role-Based Access Control):** I permessi sono associati a ruoli o mansioni aziendali (es. 'Amministrazione', 'HR') ed ereditati dagli utenti iscritti al gruppo, riducendo l'accumulo di privilegi (Privilege Creep).\n* **ABAC (Attribute-Based Access Control):** Decisioni contestuali estremamente flessibili basate sugli attributi del soggetto (es. reparto), della risorsa (es. sensibilitÃ  del file), dell'azione (es. lettura) e dell'ambiente (es. orario di lavoro, IP VPN).\n* **MAC (Mandatory Access Control):** Modello rigido di stampo militare basato su etichette di classificazione (es. 'Top Secret', 'Riservato') e livelli di nulla osta associati agli utenti. I permessi sono centralizzati e non modificabili dai singoli proprietari di file.\n* **DAC (Discretionary Access Control):** Modello flessibile in cui il proprietario originario del file (Owner) ha la totale discrezione di concedere o revocare i permessi di lettura/scrittura a qualsiasi altro utente sul sistema.\n* **Directory Services:**\n  - **Active Directory (AD):** Servizio di directory proprietario Microsoft per la gestione centralizzata di macchine, identitÃ , policy di gruppo (GPO) e permessi di dominio.\n  - **LDAP:** Protocollo aperto standardizzato per interrogare ed autenticare utenti all'interno di un servizio di directory.\n\n* **Piccolo Esempio Concentrato:** In un ospedale, il personale di segreteria appartiene al gruppo 'Amministrativo' (**RBAC**) e puÃ² inserire i dati anagrafici dei pazienti, ma solo i medici possono leggere le diagnosi cliniche. Se un medico tenta di accedere alle cartelle da casa fuori dall'orario di lavoro, il sistema basato sugli attributi (**ABAC**) blocca il tentativo valutando l'orario e l'indirizzo IP.",
        examTip: "All'esame, memorizza questo schema mnemonico utilissimo:\n* **DAC** â†’ **D**ecide il proprietario.\n* **MAC** â†’ **M**ilitare (classificazioni obbligatorie).\n* **RBAC** â†’ **R**uolo.\n* **ABAC** â†’ **A**ttributi.\n\nSull'asse della rigiditÃ , **MAC** Ã¨ il piÃ¹ **restrittivo** â€” le etichette le impone il sistema e nemmeno il creatore del file puÃ² derogarvi â€” e **DAC** il piÃ¹ **permissivo**, perchÃ© lascia la decisione al proprietario della risorsa. **Attenzione a una scorciatoia diffusa:** Â«piÃ¹ restrittivoÂ» non vuol dire Â«piÃ¹ sicuro in assolutoÂ». MAC Ã¨ la scelta giusta dove la riservatezza domina su tutto, come in ambito militare; altrove la sua rigiditÃ  rende il lavoro impraticabile e spinge le persone ad aggirarlo, e un RBAC ben tenuto protegge di piÃ¹ di un MAC che nessuno riesce a rispettare. Il modello giusto Ã¨ quello adatto al contesto."
      },
      {
        name: "RBAC (Role-Based Access Control)",
        checklistKey: "RBACConcept",
        definition: "Controllo degli accessi basato sui ruoli definiti all'interno dell'organizzazione (Ruolo dell'utente).",
        details: "Caratteristiche del **RBAC (Role-Based Access Control)**:\n* **Associazione ai Ruoli:** I permessi non vengono assegnati ai singoli utenti, ma a ruoli organizzativi o mansioni lavorative (es. 'HR', 'Finanza', 'Amministratore'). Gli utenti ereditano i permessi associati ai ruoli di cui fanno parte.\n* **Semplificazione Amministrativa:** Riduce enormemente la complessitÃ  di gestione dei permessi in organizzazioni medio-grandi.\n* **Prevenzione del Privilege Creep:** Quando un dipendente cambia dipartimento o mansione, basta rimuoverlo dal vecchio gruppo e aggiungerlo al nuovo, eliminando i privilegi obsoleti.\n\n* **Piccolo Esempio Concentrato:** In un ospedale, un dipendente viene assunto come medico. Viene aggiunto al gruppo Active Directory 'Medici', ereditando all'istante l'accesso alle cartelle cliniche dei pazienti, senza che l'amministratore debba configurare permessi individuali.",
        examTip: "All'esame, associa sempre **RBAC** al **Ruolo dell'utente** (Role/Job function) e all'ereditarietÃ  tramite gruppi."
      },
      {
        name: "RuBAC (o Rule-Based Access Control)",
        checklistKey: "RuleBasedAccessControlConcept",
        definition: "Controllo degli accessi basato su regole e restrizioni fisse definite dal sistema (Regole definite dal sistema).",
        details: "Caratteristiche del **RuBAC (o Rule-Based Access Control)**:\n* **Regole di Sistema:** Le autorizzazioni di accesso sono determinate da un insieme di regole logiche predefinite nel sistema, indipendentemente dall'identitÃ  specifica o dal ruolo dell'utente.\n* **Fattori Comuni:** Tipicamente basato su parametri oggettivi come orari di accesso consentiti (es. lun-ven dalle 9:00 alle 18:00), geolocalizzazione o indirizzi IP di provenienza.\n* **Differenza con RBAC:** Mentre RBAC si concentra sulle mansioni del soggetto (Chi sei/Cosa fai), RuBAC valuta filtri logici e vincoli oggettivi (Quali regole si applicano).\n\n* **Piccolo Esempio Concentrato:** Un amministratore di rete imposta una regola sul firewall e sul server VPN per cui le connessioni SSH di amministrazione sono consentite esclusivamente dall'intervallo IP dell'ufficio IT centrale e solo durante l'orario di lavoro standard.",
        examTip: "All'esame, ricorda che **RuBAC / Rule-Based** fa riferimento a **Regole definite dal sistema** (es. filtri IP, orari), non a gruppi o ruoli aziendali."
      },
      {
        name: "ABAC (Attribute-Based Access Control)",
        checklistKey: "AttributeBasedConcept",
        definition: "Controllo degli accessi dinamico basato sugli attributi associati a utente, risorsa e contesto ambientale (Attributi di utente, risorsa e contesto).",
        details: "Caratteristiche del **ABAC (Attribute-Based Access Control)**:\n* **Valutazione Dinamica:** Ãˆ il modello piÃ¹ flessibile e granulare. Consente di scrivere politiche di autorizzazione complesse valutando combinazioni di attributi in tempo reale.\n* **Tre categorie di attributi principali:**\n  - *Attributi del Soggetto (Utente):* Reparto, livello di clearance, titolo professionale, anzianitÃ .\n  - *Attributi della Risorsa (Oggetto):* Nome del file, dipartimento proprietario, livello di riservatezza, tipo di dati.\n  - *Attributi Ambientali (Contesto):* Orario di lavoro corrente, geolocalizzazione GPS, indirizzo IP, stato di aggiornamento del dispositivo.\n\n* **Piccolo Esempio Concentrato:** Una policy aziendale stabilisce che: 'Un medico (soggetto) puÃ² modificare una cartella medica (risorsa) con classificazione Riservata solo se accede tramite tablet aziendale crittografato (contesto) e la richiesta avviene dall'IP Wi-Fi dell'ospedale (contesto)'.",
        examTip: "Ricorda che **ABAC** si basa su **Attributi di utente, risorsa e contesto** (Soggetto, Oggetto, Ambiente), offrendo il massimo della granularitÃ  e della flessibilitÃ  contestuale."
      },
      {
        name: "DAC (Discretionary Access Control)",
        checklistKey: "DACConcept",
        definition: "Controllo degli accessi in cui il proprietario della risorsa determina arbitrariamente chi puÃ² accedervi (Proprietario della risorsa).",
        details: "Caratteristiche del **DAC (Discretionary Access Control)**:\n* **Discrezione del Proprietario:** Il creatore di una risorsa (file, directory, database) ne Ã¨ il proprietario (Owner) e ha il potere esclusivo e discrezionale di concedere, modificare o revocare i permessi di lettura, scrittura o esecuzione ad altri utenti o gruppi.\n* **FlessibilitÃ  e SemplicitÃ :** Estremamente comune nei sistemi operativi consumer (permessi di condivisione cartelle in Windows NTFS o chmod in Unix/Linux).\n* **Rischio di Sicurezza:** PoichÃ© la sicurezza Ã¨ decentralizzata, la negligenza di un singolo utente (o un malware che gira con i suoi permessi) puÃ² facilmente esporre dati riservati condividendoli con soggetti non autorizzati.\n\n* **Piccolo Esempio Concentrato:** Un responsabile marketing crea una cartella sul proprio desktop e usa le impostazioni di condivisione di Windows per concedere l'accesso in sola lettura a due colleghi del suo team, escludendo tutti gli altri utenti.",
        examTip: "All'esame, **DAC** Ã¨ associato alla discrezione del **Proprietario della risorsa** (Data Owner). Ãˆ il modello piÃ¹ permissivo e decentralizzato."
      },
      {
        name: "MAC (Mandatory Access Control)",
        checklistKey: "MACConcept",
        definition: "Controllo degli accessi rigido basato su classificazioni di sicurezza centralizzate e livelli di nulla osta (Classificazioni di sicurezza).",
        details: "Caratteristiche del **MAC (Mandatory Access Control)**:\n* **Classificazioni Centralizzate:** Modello di derivazione militare, il piÃ¹ **restrittivo** fra quelli previsti dagli obiettivi. I soggetti e gli oggetti ricevono etichette di sicurezza centralizzate imposte dall'amministratore (es. 'Pubblico', 'Riservato', 'Segreto', 'Top Secret').\n* **Nessuna Discrezione:** Gli utenti e i proprietari dei file NON possono decidere chi accede ai dati o modificare le etichette di sicurezza dei file che creano.\n* **Regola di Confronto:** L'accesso viene autorizzato solo se la clearance (livello di nulla osta) dell'utente Ã¨ maggiore o uguale all'etichetta di sicurezza del file, e l'utente ha una reale necessitÃ  lavorativa (Need to Know).\n\n* **Piccolo Esempio Concentrato:** Un analista dell'esercito con livello di accesso 'Segreto' tenta di aprire un documento etichettato 'Top Secret'. Nonostante l'analista possa aver partecipato alla redazione dello stesso, il sistema operativo sicuro (es. SELinux con policy MAC) blocca immediatamente l'accesso.",
        examTip: "All'esame **MAC** Ã¨ il modello piÃ¹ **restrittivo**, basato su **classificazioni di sicurezza** e clearance stabilite centralmente: nÃ© il proprietario del file nÃ© l'utente possono modificarle. Â«PiÃ¹ restrittivoÂ» non significa perÃ² Â«migliore in assolutoÂ»: Ã¨ adatto dove la riservatezza domina su tutto (militare, governativo, SELinux), mentre altrove la sua rigiditÃ  blocca il lavoro e spinge le persone ad aggirarlo. **Caso limite utile:** quando il ruolo non basta e servono condizioni di contesto (orario, posizione, stato del dispositivo), la risposta Ã¨ **ABAC**, non MAC."
      },
      {
        name: "Least privilege",
        checklistKey: "LeastPrivilegeConcept",
        definition: "Il principio fondamentale di sicurezza secondo cui ogni utente riceve solo i permessi e i privilegi strettamente necessari per svolgere il proprio lavoro.",
        details: "Il funzionamento del principio del Minimo Privilegio (Least Privilege):\n* **Superficie d'Attacco Ridotta:** Impedisce che la compromissione di un singolo account utente ordinario dia all'attaccante privilegi amministrativi di root sull'intera rete.\n* **Limitazione dei Danni:** Riduce al minimo l'impatto di errori umani accidentali o di azioni dannose deliberate da parte di insider.\n* **Applicazione Rigorosa:** Richiede la separazione degli account (es. un amministratore usa un account normale per leggere le email ed un account admin solo quando deve effettuare modifiche critiche).\n\n* **Piccolo Esempio Concentrato:** Un tecnico di rete accede al server di posta per leggere le proprie e-mail usando un utente ordinario senza privilegi di amministratore. Quando deve aggiornare le regole di sicurezza del mail server, si scollega ed accede con un account amministratore separato a tempo determinato, riducendo l'esposizione.",
        examTip: "Il Least Privilege limita proattivamente i danni derivanti da account compromessi o minacce interne garantendo che ogni utente riceva solo i permessi strettamente necessari."
      },
      {
        name: "Need to Know",
        checklistKey: "NeedToKnowConcept",
        definition: "Un principio di sicurezza secondo cui, anche con le autorizzazioni corrette, si accede solo alle informazioni necessarie per svolgere il proprio lavoro specifico.",
        details: "Il funzionamento del principio del Need to Know:\n* **Controllo Granulare:** Prevede che il possesso di un livello di sicurezza (es. un nulla osta) non dia automaticamente accesso a tutti i dati di quel livello.\n* **NecessitÃ  Lavorativa:** L'utente deve dimostrare una specifica necessitÃ  operativa per poter consultare un determinato file o documento sensibile.\n* **Contrasto alla Fuga di Dati:** Impedisce la consultazione massiva di archivi riservati da parte di personale non direttamente coinvolto nei relativi progetti.",
        examTip: "**Il confronto che l'esame verifica, need-to-know contro minimo privilegio:** il **minimo privilegio** riguarda che cosa puoi **fare** â€” quali permessi ha il tuo account sui sistemi; il **need-to-know** riguarda quali **informazioni** puoi vedere, e agisce **anche quando l'autorizzazione formale c'Ã¨ giÃ **. **Esempio concreto:** un analista con nulla osta *segreto* Ã¨ formalmente abilitato a leggere qualunque documento *segreto*, ma puÃ² aprire solo quelli del caso su cui sta lavorando. Il nulla osta apre la porta della stanza; il need-to-know decide quali fascicoli sul tavolo lo riguardano."
      },
      {
        name: "Just-In-Time (JIT)",
        checklistKey: "JustInTimeConcept",
        definition: "Un approccio di sicurezza in cui i privilegi amministrativi ed elevati vengono concessi solo per il tempo strettamente necessario a svolgere l'attivitÃ .",
        details: "Caratteristiche dell'accesso Just-In-Time (JIT):\n* **Privilegi Temporanei:** Gli utenti operano normalmente con account a bassi privilegi. Quando sorge la necessitÃ  di eseguire compiti amministrativi, richiedono privilegi elevati temporanei.\n* **Scadenza Automatica:** Una volta trascorso il tempo prestabilito (es. 1 o 2 ore), i privilegi scadono in modo automatico.\n* **Riduzione del Rischio:** Minimizza la finestra temporale in cui un account con ampi privilegi puÃ² essere compromesso o abusato.",
        examTip: "**JIT risponde alla domanda *quando e per quanto*:** il privilegio non esiste finchÃ© non viene richiesto, viene concesso per una finestra breve e **scade da solo**. Elimina gli account amministrativi permanenti, che sono il bersaglio piÃ¹ prezioso di qualunque attaccante. **Trappola d'esame:** non confondere JIT con **JEA**, che risponde invece a *quanto potere*. Sono assi indipendenti e si usano insieme: JIT senza JEA dÃ  pieni poteri per mezz'ora; JEA senza JIT dÃ  poteri limitati per sempre."
      },
      {
        name: "Just-Enough Administration (JEA)",
        checklistKey: "JustEnoughAdministrationConcept",
        definition: "Un principio e una tecnologia che consentono di concedere solo i privilegi minimi indispensabili per svolgere una specifica attivitÃ .",
        details: "Caratteristiche di Just-Enough Administration (JEA):\n* **Limitazione di Ruolo e Comandi:** JEA permette di delegare l'amministrazione limitando gli utenti a eseguire esclusivamente comandi, cmdlet o script specifici.\n* **Amministrazione Non-Admin:** Evita di concedere i diritti di amministratore completo di una macchina a chi deve eseguire soltanto operazioni ordinarie circoscritte (es. riavviare un servizio di stampa).\n* **TracciabilitÃ :** Rende estremamente semplice monitorare e registrare ogni singola azione eseguita in sessioni amministrative protette.",
        examTip: "**JEA risponde alla domanda *quanto potere*:** invece di consegnare un account amministratore completo, si autorizzano i **singoli comandi** necessari a quel compito â€” riavviare quel servizio, leggere quel registro â€” e nulla piÃ¹. **Trappola d'esame:** l'altro asse Ã¨ **JIT**, che riguarda *per quanto tempo*. **JEA** limita l'**ampiezza** del privilegio, **JIT** la sua **durata**; entrambi sono applicazioni del minimo privilegio, e la configurazione robusta le combina."
      },
      {
        name: "Implicit deny",
        checklistKey: "ImplicitDenyConcept",
        definition: "Un principio di sicurezza di base in cui qualsiasi accesso o comunicazione non sia esplicitamente consentito viene automaticamente bloccato per impostazione predefinita.",
        details: "Il concetto di Negazione Implicita (Implicit Deny):\n* **Sicurezza di Default (Secure by Default):** Piuttosto che elencare ciÃ² che deve essere vietato (lista nera), si definisce una lista rigida di ciÃ² che Ã¨ esplicitamente autorizzato (lista bianca); tutto il resto viene respinto.\n* **Applicazione in Rete:** Nei firewall e nelle ACL di rete, corrisponde alla regola invisibile finale 'Deny All' (o 'Drop Any') che blocca tutto il traffico non corrispondente alle regole precedenti.\n* **Prevenzione delle Falle:** Protegge il sistema da omissioni o dimenticanze del programmatore o dell'amministratore di rete.\n\n* **Piccolo Esempio Concentrato:** Durante la configurazione di un firewall aziendale, l'amministratore abilita solo le porte TCP 80 e 443 per il traffico Web e la porta TCP 22 per SSH. PoichÃ© il firewall applica l'Implicit Deny alla fine della lista delle regole, qualsiasi altro tentativo di connessione su porte diverse viene respinto in automatico.",
        examTip: "L'Implicit Deny garantisce che tutto ciÃ² che non Ã¨ esplicitamente autorizzato sia bloccato di default, rappresentando la regola cardine alla base di firewall e liste di controllo degli accessi."
      },
      {
        name: "MFA, SSO & Identity Federation",
        checklistKey: "MFA_SSO_Federation",
        definition: "Tecnologie di autenticazione a piÃ¹ fattori, Single Sign-On e federazione delle identitÃ  tra domini diversi.",
        details: "I tre pilastri per garantire accessi moderni, sicuri e user-friendly in ambito aziendale:\n* **MFA (Multi-Factor Authentication):** Richiede l'uso convergente di almeno due o piÃ¹ fattori di autenticazione distinti scelti tra:\n  - *Something you know:* password o PIN.\n  - *Something you have:* smart card, chiavetta hardware o app con codici OTP.\n  - *Something you are:* impronta digitale, iride, riconoscimento facciale (biometria).\n  - *Somewhere you are:* posizione GPS, indirizzo IP o rete di provenienza. *(Questi quattro sono i fattori elencati dall'obiettivo 4.6; il vecchio* Something you do *â€” ritmo di digitazione, dinamica della firma â€” apparteneva agli attributi della versione precedente dell'esame e non Ã¨ fra i fattori del SY0-701.)*\n* **SSO (Single Sign-On):** Consente all'utente di effettuare l'autenticazione una sola volta ed accedere a molteplici applicazioni e server aziendali senza dover reinserire le credenziali ad ogni passaggio.\n* **Federazione delle IdentitÃ :** Estende il concetto di SSO oltre i confini dell'azienda, permettendo a domini e portali di organizzazioni distinte di fidarsi reciprocamente delle rispettive identitÃ  (IdP - Identity Provider vs SP - Service Provider).\n* **Protocolli Federati Standard:** SAML (basato su XML per l'enterprise), OAuth 2.0 (framework di **autorizzazione**, non di autenticazione: delega l'accesso a una risorsa senza consegnare la password. I suoi access token possono essere opachi o strutturati, e **non devono necessariamente essere JWT**) e OIDC (OpenID Connect, strato di autenticazione costruito sopra OAuth 2.0).\n\n* **Piccolo Esempio Concentrato:** Un dipendente si collega la mattina ed esegue il login inserendo password e impronta digitale sul portale aziendale centralizzato (**MFA**). Da quel momento, grazie all'**SSO**, puÃ² navigare tra l'applicazione cloud delle vendite (Salesforce) e il portale delle buste paga esterno (**Federazione** tramite protocollo SAML) senza dover digitare nessuna credenziale aggiuntiva.",
        examTip: "La federazione delle identitÃ  si basa su una relazione di fiducia (Trust Relationship) stabilita in anticipo tra l'Identity Provider (IdP), che autentica effettivamente l'utente, e il Service Provider (SP), che fornisce l'applicazione finale."
      },
      {
        name: "Password Policies & Account Management",
        checklistKey: "PasswordPoliciesAccount",
        definition: "Regole amministrative e tecniche per la protezione delle credenziali e il controllo del ciclo di vida degli account.",
        details: "Misure di sicurezza finalizzate alla prevenzione del furto di credenziali e al controllo rigoroso del perimetro delle identitÃ :\n* **Password Policies:** definire una **lunghezza adeguata** (le passphrase lunghe battono la complessitÃ ), **verificare le nuove password contro elenchi di credenziali compromesse o comuni**, consentire l'uso dei password manager e prevedere il blocco dell'account dopo troppi tentativi falliti. **Attenzione a due punti su cui il materiale di settore Ã¨ rimasto indietro:** il **NIST SP 800-63B non raccomanda** nÃ© l'obbligo di mescolare classi di caratteri nÃ© la **scadenza periodica arbitraria**, perchÃ© entrambi spingono gli utenti verso schemi prevedibili (`Password1!`, `Password2!`). Il cambio va imposto **quando c'Ã¨ un indizio di compromissione**. Una policy aziendale puÃ² comunque prescrivere complessitÃ  e scadenza, ma non vanno presentate come raccomandazioni dello standard.\n* **Privilege Creep:** Fenomeno per cui un dipendente accumula permessi in eccesso nel corso degli anni cambiando ruoli all'interno della ditta. Si contrasta tramite revisioni periodiche degli accessi (User Access Reviews).\n* **Account Types:** Separazione dei conti utente standard da quelli con permessi amministrativi elevati (Privileged Accounts/Root) e dagli account di servizio (Service Accounts) usati dai software automatici.\n\n* **Piccolo Esempio Concentrato:** Un programmatore viene promosso a responsabile di reparto. Il team di sicurezza esegue una User Access Review e scopre che il dipendente possiede ancora i permessi di scrittura sul codice sorgente dei vecchi progetti. Il team revoca tempestivamente i vecchi permessi obsoleti, sventando il rischio di 'Privilege Creep'.",
        examTip: "Per evitare il 'Privilege Creep' e garantire l'applicazione del principio del minimo privilegio, l'organizzazione deve implementare revisioni formali periodiche degli accessi (User Access Reviews) e revocare i vecchi permessi non piÃ¹ necessari."
      },
      {
        name: "LDAP",
        checklistKey: "LDAPProtocol_New",
        definition: "Lightweight Directory Access Protocol: un protocollo standard aperto utilizzato per interrogare, autenticare e gestire le informazioni sugli utenti e sulle risorse in un database di directory centrale.",
        details: "Caratteristiche principali:\n* **Struttura Gerarchica:** Organizza gli oggetti (utenti, computer, stampanti, gruppi) in un albero logico composto da unitÃ  organizzative (OU), domini (DC) e nomi distinti (DN).\n* **Integrazione con Active Directory:** Microsoft Active Directory si basa su LDAP come protocollo principale per consentire ai server e ai client di cercare e autenticare le identitÃ  nel dominio.\n* **LDAPS (LDAP Secure):** La variante cifrata che utilizza **TLS** (porta standard TCP 636) per proteggere credenziali e dati che sulla porta 389 viaggerebbero in chiaro. In alternativa si puÃ² usare **StartTLS**, che promuove a cifrata la connessione sulla porta 389. *(SSL Ã¨ deprecato: all'esame la risposta corretta Ã¨ sempre TLS.)*",
        examTip: "Per garantire la sicurezza delle query e delle credenziali utente trasmesse a un servizio di directory, disabilita l'LDAP in chiaro (porta 389) e implementa LDAPS (porta TCP 636) cifrato con TLS, oppure StartTLS sulla porta 389. SSL Ã¨ deprecato: all'esame la risposta corretta Ã¨ sempre TLS."
      },

      {
        name: "MFA",
        checklistKey: "MFAConcept_New",
        definition: "Multi-Factor Authentication (MFA): Processo di sicurezza che richiede l'uso convergente di due o piÃ¹ fattori di autenticazione indipendenti appartenenti a categorie differenti per verificare l'identitÃ  dell'utente.",
        details: "L'obiettivo 4.6 elenca **quattro** fattori, tutti allo stesso livello:\n* **Qualcosa che sai (Something you know):** Informazioni memorizzate (es. password, PIN o risposte a domande di sicurezza).\n* **Qualcosa che hai (Something you have):** Possesso fisico di un oggetto (es. smart card, token hardware USB/NFC, codici OTP generati da app sul telefono).\n* **Qualcosa che sei (Something you are):** Parametri biometrici o fisiologici dell'utente (es. impronta digitale, scansione dell'iride, riconoscimento facciale o pattern vocali).\n* **Dove ti trovi (Somewhere you are):** la posizione da cui arriva la richiesta, ricavata da geolocalizzazione GPS, indirizzo IP o rete di provenienza. Ãˆ un fattore a pieno titolo negli obiettivi SY0-701, non un elemento accessorio.\n* **Nota sulla terminologia:** in materiale piÃ¹ vecchio si incontra anche *Something you do* (il ritmo di digitazione, la dinamica della firma). Apparteneva agli *attributi* della versione precedente dell'esame e **non compare fra i fattori del SY0-701**: riconoscilo, ma non aspettartelo come risposta corretta.\n\n* **Piccolo Esempio Concentrato:** Per accedere alla VPN aziendale, un sistemista inserisce la propria password personale (**Qualcosa che sai**) e inserisce sul proprio laptop la chiave hardware YubiKey (**Qualcosa che hai**). Il superamento di entrambi i controlli indipendenti costituisce una vera autenticazione **MFA**.",
        examTip: "Per essere qualificata come vera MFA all'esame, i fattori forniti devono tassativamente appartenere a **categorie distinte**: due password non sono MFA, password + impronta digitale sÃ¬. **Trappola d'esame:** i fattori del SY0-701 sono **quattro** â€” *something you know*, *something you have*, *something you are*, *somewhere you are* â€” e l'ultimo vale quanto gli altri tre: se lo scenario descrive una verifica basata sulla posizione geografica, la risposta Ã¨ *somewhere you are*, non Â«nessuno dei precedentiÂ»."
      },
      {
        name: "Hard token, Soft token & Security key",
        checklistKey: "MFAImplementationsTokens",
        definition: "Le forme concrete con cui si realizza il fattore 'qualcosa che hai': un token hardware dedicato, un token software su dispositivo condiviso o una chiave di sicurezza crittografica FIDO2/WebAuthn.",
        details: "Tutti e tre appartengono allo stesso fattore (**something you have**), ma offrono garanzie molto diverse:\n* **Hard token (token hardware):** un oggetto fisico dedicato che genera codici OTP (TOTP a tempo o HOTP a contatore) o firma una sfida. Non Ã¨ collegato a Internet e non ospita altre applicazioni, quindi il malware di un telefono non lo raggiunge. Costa, va distribuito, si perde e ha una batteria.\n* **Soft token (token software):** un'app di autenticazione sul telefono o sul PC che genera lo stesso tipo di codice, oppure una notifica push da approvare. Costo quasi nullo e distribuzione immediata, ma condivide il destino del dispositivo: se il telefono Ã¨ compromesso o l'utente approva per abitudine una notifica non sua (**MFA fatigue**, o push bombing), il fattore cade.\n* **Security key (chiave di sicurezza FIDO2/WebAuthn):** una chiave USB/NFC che custodisce una coppia di chiavi crittografiche e firma una sfida **legata al dominio** del sito. Ãˆ l'unica delle tre a essere **resistente al phishing**, perchÃ© non esiste alcun codice da digitare e da consegnare a un sito fasullo: se il dominio non corrisponde, la chiave semplicemente non firma.\n* **Nota sugli SMS:** l'OTP via SMS Ã¨ il piÃ¹ debole di tutti ed Ã¨ sconsigliato dal NIST SP 800-63B, perchÃ© vulnerabile al **SIM swapping** e all'intercettazione della rete telefonica. All'esame Ã¨ il fattore da scartare quando la domanda chiede l'opzione piÃ¹ sicura.\n\n* **Piccolo Esempio Concentrato:** un attaccante costruisce un sito identico al portale aziendale. L'utente con **soft token** legge il codice dall'app e lo digita nel sito falso: l'attaccante lo ritrasmette in tempo reale al portale vero ed entra. Lo stesso utente, se avesse una **security key**, non avrebbe nulla da digitare, e la chiave non firmerebbe per un dominio che non Ã¨ quello registrato: l'attacco fallisce senza che l'utente debba accorgersi di nulla.",
        examTip: "Ordina le implementazioni MFA per robustezza: **SMS OTP** (piÃ¹ debole, SIM swapping) < **soft token** (app OTP o push, vulnerabile a MFA fatigue e phishing in tempo reale) < **hard token** (dispositivo dedicato, isolato dal telefono) < **security key FIDO2/WebAuthn** (resistente al phishing per costruzione). Quando lo scenario descrive utenti ingannati da un portale clone o subissati da notifiche push, la risposta corretta Ã¨ la **security key**, non un altro tipo di OTP."
      },
      {
        name: "Federation",
        checklistKey: "FederationConcept",
        definition: "Federazione delle IdentitÃ : Un sistema che collega i sistemi di gestione delle identitÃ  di diverse organizzazioni o domini, consentendo agli utenti di utilizzare le stesse credenziali per accedere a piÃ¹ reti o applicazioni esterne.",
        details: "Caratteristiche principali:\n* **Fiducia reciproca:** Si basa su una relazione di fiducia (trust relationship) preconfigurata tra un Identity Provider (IdP) e un Service Provider (SP).\n* **SSO Cross-Domain:** Consente il Single Sign-On oltre i confini aziendali, eliminando la necessitÃ  di creare account separati per ogni partner o applicazione SaaS esterna.\n* **Standard aperti:** Implementata comunemente tramite protocolli come SAML 2.0 (enterprise) o OpenID Connect (OIDC, consumatore/cloud).\n\n* **Piccolo Esempio Concentrato:** Un dipendente di un'azienda partner accede al portale clienti di una banca esterna. PoichÃ© tra l'azienda e la banca Ã¨ configurata una **Federation** tramite SAML, il browser reindirizza l'utente al server di autenticazione dell'azienda che convalida l'identitÃ  e rimanda l'utente alla banca giÃ  autenticato, senza condividere la password.",
        examTip: "La federazione delle identitÃ  estende il Single Sign-On (SSO) oltre i confini aziendali tramite protocolli standard come SAML o OIDC e relazioni di fiducia bilaterali."
      },
      {
        name: "Geographic & Network Location Restrictions (Geofencing)",
        checklistKey: "GeographicNetworkRestrictions",
        definition: "La limitazione dell'accesso logico o fisico basata sulla posizione geografica del dispositivo, sulla rete di appartenenza o su segnali radio/GPS.",
        details: "Questi controlli convalidano il fattore d'autenticazione contestuale **Somewhere you are**:\n* **Geographic Restrictions (Restrizioni Geografiche):** Criteri che consentono o bloccano l'accesso ai sistemi in base alla nazionalitÃ  o alla regione geografica di provenienza della connessione (es. bloccare i tentativi di login da paesi in cui l'azienda non ha operativitÃ ).\n* **Network Location (Posizione di Rete):** La distinzione logica tra connessioni provenienti dalla rete privata aziendale interna (LAN/WLAN fidata) e connessioni provenienti dall'esterno (Internet pubblica o reti guest).\n* **IP Subnet (Sottorete IP):** Suddivisione logica di un indirizzo di rete IP in blocchi piÃ¹ piccoli per isolare i reparti aziendali sensibili (es. isolare la subnet del reparto finanza dalla subnet degli uffici generali).\n* **Geolocation (Geolocalizzazione):** La stima della posizione fisica reale del dispositivo tramite database di indirizzi IP pubblici, ID di celle telefoniche o BSSID di reti Wi-Fi vicine.\n* **GPS (Global Positioning System):** Tecnologia satellitare integrata nei dispositivi mobili per determinare con massima precisione le coordinate geografiche (latitudine e longitudine) dell'utente in tempo reale.\n* **802.11 (Standard Wi-Fi):** Lo standard delle reti wireless locali; l'interconnessione a uno specifico Access Point 802.11 o la presenza del relativo SSID/BSSID certifica la presenza dell'utente all'interno dell'edificio.\n* **IP Address (Indirizzo IP):** L'identificativo numerico univoco del nodo di rete, utilizzato per convalidare l'origine della richiesta e applicare regole di whitelist (es. consentire l'accesso al pannello di amministrazione solo da IP statici aziendali).\n* **Geofencing (Geofencing):** La creazione di un perimetro virtuale attorno a un'area geografica reale (es. il perimetro del data center). Se l'utente esce da tale area (rilevato tramite GPS, 802.11 o rete mobile), l'accesso viene revocato o viene richiesta un'ulteriore convalida MFA.",
        examTip: "All'esame, il Geofencing e le restrizioni di Network Location basate su IP Subnet o GPS sono usati per rafforzare l'autenticazione contestuale (ABAC/Zero Trust) convalidando in tempo reale il fattore 'Somewhere you are' per bloccare sul nascere attacchi esterni."
      },
      {
        name: "Time-of-day restrictions",
        checklistKey: "TimeOfDayRestrictions",
        definition: "Restrizioni orarie: un controllo d'accesso che consente l'uso di un account o di una risorsa soltanto entro finestre temporali predefinite, negandolo al di fuori di esse.",
        details: "Le **time-of-day restrictions** aggiungono la dimensione **tempo** alla decisione di autorizzazione:\n* **Come funzionano:** la policy definisce le finestre ammesse (per esempio lunedÃ¬-venerdÃ¬, 07:00-20:00, fuso orario dell'ufficio) e nega l'accesso fuori da esse. Possono agire al login, oppure interrompere una sessione giÃ  aperta alla chiusura della finestra.\n* **A che cosa servono:** riducono la **superficie d'attacco temporale**. Le credenziali rubate vengono spesso usate di notte o nel fine settimana, quando nessuno osserva; se l'account non puÃ² autenticarsi in quelle ore, il furto perde gran parte del suo valore.\n* **Dove si applicano tipicamente:** account di servizio (che girano in batch a orari noti), personale a turni, fornitori esterni con accesso temporaneo, account con privilegi elevati.\n* **Attenzione al fuso orario:** la regola deve dichiarare rispetto a quale fuso Ã¨ espressa, altrimenti si blocca il personale legittimo all'estero o si lascia aperta una finestra involontaria.\n\n* **Piccolo Esempio Concentrato:** una catena di negozi consente ai cassieri di autenticarsi al gestionale solo dalle 08:00 alle 21:00 nei giorni di apertura. Un attaccante che ruba la password di un cassiere con il phishing prova a usarla alle 03:00 di domenica: l'accesso viene negato e il tentativo produce un allarme che altrimenti sarebbe passato inosservato.",
        examTip: "Le restrizioni orarie sono un controllo **preventivo** e rientrano fra i metodi di controllo degli accessi dell'obiettivo 4.6, insieme a MAC, DAC, RBAC, ABAC e least privilege. Associale mentalmente alle **restrizioni geografiche** (geofencing): entrambe negano l'accesso in base al **contesto** â€” *quando* nell'un caso, *dove* nell'altro â€” e sono i due attributi contestuali che ABAC e Zero Trust valutano piÃ¹ spesso."
      },
      {
        name: "Permission Restrictions (ACL, RBAC, Least Privilege)",
        checklistKey: "PermissionRestrictions",
        definition: "Misure di sicurezza logiche che definiscono ed impongono in modo rigido e granulare le operazioni consentite agli utenti sulle risorse di sistema.",
        details: "Le restrizioni dei permessi assicurano che le identitÃ  non possano compiere azioni dannose o non autorizzate:\n* **Permission Restrictions (Restrizioni dei Permessi):** L'applicazione di vincoli che specificano quali file, directory, database o funzionalitÃ  software un soggetto puÃ² visualizzare, creare, modificare o eliminare.\n* **ACL (Access Control List):** Liste che mappano in modo granulare gli identificativi utente o di gruppo ai relativi diritti d'accesso (Read, Write, Execute) direttamente sugli oggetti del File System o sui nodi di rete (Firewall ACL).\n* **RBAC (Role-Based Access Control):** Modello che allinea i permessi con i ruoli organizzativi o le mansioni dei dipendenti (es. 'Responsabile HR'), evitando la configurazione manuale di permessi individuali per ciascun utente.\n* **Least Privilege (Minimo Privilegio):** La regola aurea della cybersecurity che impone di assegnare a ogni utente e processo esclusivamente il set di privilegi minimo indispensabile per completare la mansione attiva, riducendo drasticamente il blast radius in caso di compromissione.",
        examTip: "All'esame, l'applicazione rigorosa del Least Privilege coadiuvata da ACL a livello di file system e ruoli RBAC strutturati previene il privilege creep e neutralizza le minacce interne (insider threats)."
      }
    ]
  }
];

export const DOMAIN_2_TOPICS: TopicGroup[] = [
  {
    title: "1. Threat Actors (Obj 2.1)",
    description: "I soggetti responsabili delle minacce informatiche, le loro capacitÃ  e risorse.",
    icon: "Users",
    subtopics: [
      {
        name: "Nation State",
        checklistKey: "NationStateActor",
        definition: "Attori sponsorizzati da governi con risorse finanziarie ed esperte quasi illimitate.",
        details: "Gli attori Stato-Nazione (Nation State) agiscono per conto di governi nazionali:\n* **Obiettivi:** Spionaggio industriale, geopolitico, furto di segreti militari, sabotaggio di infrastrutture critiche (SCADA/ICS).\n* **Metodologia:** Conducono campaigns APT (Advanced Persistent Threat) che rimangono silenti e infiltrate per mesi o anni.\n* **CapacitÃ :** Sviluppano exploit Zero-Day esclusivi e dispongono di laboratori di ricerca crittografica avanzati.\n\n* **Piccolo Esempio Concentrato:** Un gruppo APT governativo penetra nei sistemi di un fornitore di energia nazionale sfruttando uno zero-day, installando un firmware backdoor sui PLC per monitorare la griglia elettrica e poterne disattivare le turbine in caso di conflitto geopolitico.",
        examTip: "In caso di domande d'esame su attori dotati di persistenza estrema, strumenti avanzati e budget statali, la risposta corretta Ã¨ sempre il Nation State (o APT)."
      },
      {
        name: "Insider Threat",
        checklistKey: "InsiderThreatActor",
        definition: "Chi ha o ha avuto un accesso legittimo â€” dipendenti, ex dipendenti, consulenti, partner commerciali â€” e attraverso quell'accesso causa un danno all'organizzazione, che lo faccia deliberatamente o per errore.",
        details: "Le minacce interne sono particolarmente insidiose:\n* **Vantaggio:** Conoscono giÃ  la struttura della rete, i dati sensibili e le procedure di sicurezza.\n* **Tipologie:**\n  - *Malicious Insider:* Agisce intenzionalmente per vendetta, guadagno o spionaggio.\n  - *Negligent Insider:* Causa incidenti per distrazione, scarsa formazione o mancato rispetto delle policy.\n* **Mitigazioni:** Separazione dei compiti (Separation of Duties), rotazione delle mansioni (Job Rotation), e rigoroso monitoraggio dei log.\n\n* **Piccolo Esempio Concentrato:** Un dipendente arrabbiato del reparto finanza scarica l'intero database degli stipendi e lo invia a un giornalista per vendicarsi di una promozione mancata.",
        examTip: "**Trappola d'esame:** la categoria non coincide con il dipendente infedele. L'obiettivo 2.1 comprende l'insider **doloso** (chi agisce per vendetta, profitto o per conto di terzi) e l'insider **involontario**, che Ã¨ il caso di gran lunga piÃ¹ frequente: chi clicca sul link, chi porta a casa un archivio su una chiavetta per lavorare il fine settimana, chi lascia un bucket cloud aperto. CiÃ² che accomuna i due Ã¨ l'**accesso legittimo**, non l'intenzione, ed Ã¨ per questo che i controlli perimetrali non li vedono.\n\nLe contromisure seguono la distinzione: contro il doloso valgono **minimo privilegio**, **separazione dei compiti**, **rotazione delle mansioni** e revisione periodica degli accessi; contro l'involontario valgono **formazione**, **DLP** e configurazioni sicure per impostazione predefinita. Il **deprovisioning tempestivo** serve contro entrambi, e l'ex dipendente con le credenziali ancora attive Ã¨ lo scenario che l'esame propone piÃ¹ spesso."
      },
      {
        name: "Organized Crime",
        checklistKey: "OrganizedCrimeActor",
        definition: "Gruppi criminali strutturati e professionali motivati principalmente dal profitto finanziario.",
        details: "Il cybercrimine organizzato opera come una vera e propria industria:\n* **Modello di Business:** Ransomware-as-a-Service (RaaS), estorsioni multiple, furto di dati finanziari su larga scala, phishing massivo.\n* **Struttura:** Hanno sviluppatori, amministratori di infrastrutture IT, negoziatori di riscatti e persino help desk per assistere le vittime nel pagamento dei riscatti.\n\n* **Piccolo Esempio Concentrato:** Un gruppo criminale russo acquista un payload ransomware sul dark web, colpisce la rete di un ospedale privato crittografandone le cartelle cliniche e richiede 2 milioni di dollari in Bitcoin per non pubblicare i dati sensibili online.",
        examTip: "Se la motivazione principale dell'attacco descritto Ã¨ il guadagno monetario (Financial Gain) attraverso ransomware o frodi, l'attore Ã¨ l'Organized Crime."
      },
      {
        name: "Hacktivist",
        checklistKey: "HacktivistActor",
        definition: "Attaccanti guidati da motivazioni ideologiche, politiche, sociali o religiose.",
        details: "Gli hacktivisti usano la tecnologia per esprimere dissenso o promuovere una causa:\n* **Tecniche comuni:** Defacement di siti web istituzionali, attacchi DDoS per rendere inaccessibili portali pubblici, esfiltrazione e pubblicazione di dati riservati (leaks) per esporre presunti comportamenti illeciti.\n* **Gruppi noti:** Anonymous Ã¨ l'esempio storico piÃ¹ celebre.\n\n* **Piccolo Esempio Concentrato:** Un gruppo di attivisti ambientali lancia un massiccio attacco DDoS contro il sito web di una multinazionale petrolifera per protestare contro una nuova trivellazione, rendendo il portale di e-commerce dell'azienda offline per 48 ore.",
        examTip: "La chiave all'esame per identificare un Hacktivist risiede nella motivazione: promozione di una causa sociale/politica, non il guadagno economico."
      },
      {
        name: "Unskilled Attacker (Script Kiddie)",
        checklistKey: "ScriptKiddieActor",
        definition: "Attaccanti con scarse competenze tecniche che utilizzano strumenti e script giÃ  pronti scritti da altri.",
        details: "Gli Script Kiddie mancano di conoscenze profonde sul funzionamento degli exploit:\n* **Risorse:** Scaricano toolkit gratuiti o acquistano servizi illegali sul dark web.\n* **Motivazioni:** Spesso agiscono per noia, per ottenere notorietÃ  nella propria cerchia di amici, o per puro vandalismo digitale.\n* **Pericolo:** Sebbene non sofisticati, possono causare danni reali a sistemi non protetti o privi di patch base.\n\n* **Piccolo Esempio Concentrato:** Un adolescente scarica un tool automatico di scansione e exploit per vulnerabilitÃ  note e colpisce il sito web della sua scuola locale, causandone il crash temporaneo per darsi arie su un server Discord.",
        examTip: "L'uso esclusivo di strumenti altrui senza comprendere il codice sottostante caratterizza questo profilo. **Attenzione al nome:** gli obiettivi SY0-701 lo chiamano **unskilled attacker**; *script kiddie* Ã¨ il termine storico, ancora diffuso sul campo ma non quello che troverai fra le opzioni d'esame."
      },
      {
        name: "Competitor",
        checklistKey: "CompetitorActor",
        definition: "Aziende concorrenti che ricorrono a mezzi digitali illeciti per ottenere un vantaggio competitivo sleale.",
        details: "Le azioni dei competitor si focalizzano sullo spionaggio aziendale:\n* **Azioni:** Furto di brevetti, piani industriali, formule chimiche, codici sorgente o liste clienti.\n* **Danni:** Possono tentare di sabotare i sistemi dell'azienda rivale durante un lancio di prodotto cruciale per danneggiarne la reputazione.\n\n* **Piccolo Esempio Concentrato:** Un'azienda automobilistica assume un hacker esterno per infiltrarsi nei server CAD di un concorrente diretto e sottrarre i progetti del nuovo motore elettrico prima che venga brevettato.",
        examTip: "L'esfiltrazione di informazioni proprietarie o industriali a diretto beneficio di un'azienda concorrente definisce questo attore."
      },
      {
        name: "Shadow IT",
        checklistKey: "ShadowITActor",
        definition: "L'uso di risorse informatiche â€” applicazioni, servizi cloud, dispositivi â€” senza approvazione nÃ© visibilitÃ  del reparto IT; puÃ² esporre dati direttamente e ampliare la superficie d'attacco.",
        details: "Lo Shadow IT non Ã¨ un attore ostile ma una **condizione organizzativa**, e gli obiettivi lo elencano fra i vettori di minaccia proprio per questo:\n* **PerchÃ© nasce:** quasi sempre da buone intenzioni. Lo strumento ufficiale Ã¨ lento, manca una funzione, il processo di approvazione Ã¨ lungo: il reparto si arrangia. Vietare e basta non funziona, perchÃ© sposta il fenomeno ancora piÃ¹ nell'ombra.\n* **Che cosa comporta:** ciÃ² che l'IT non sa che esiste non viene aggiornato, non entra nelle scansioni di vulnerabilitÃ , non manda log al SIEM, non Ã¨ nei backup nÃ© nel piano di risposta agli incidenti.\n* **Il danno puÃ² essere diretto:** non serve un attaccante. Caricare un documento riservato su un servizio non autorizzato Ã¨ giÃ  una perdita di controllo sul dato e, spesso, una non conformitÃ .\n* **Come si affronta:** prima **scoprire** (CASB, analisi del traffico in uscita, censimento degli asset e delle spese), poi **incanalare** offrendo alternative approvate che risolvano il bisogno reale che ha generato il fenomeno.\n\n* **Piccolo Esempio Concentrato:** il reparto marketing, stanco di attendere l'approvazione per uno strumento di gestione dei progetti, ne attiva uno gratuito con le proprie carte di credito e vi carica il piano di lancio del prodotto. Nessuno agisce in malafede, ma il piano ora vive su un servizio che l'azienda non controlla, con account che sopravvivranno alle dimissioni di chi li ha creati.",
        examTip: "Lo Shadow IT introduce rischio **indipendentemente dall'intenzione** di chi lo adotta. **Trappola d'esame:** distingui l'**effetto strutturale** â€” superficie d'attacco piÃ¹ ampia e perdita di visibilitÃ , che Ã¨ sempre vero â€” dalle **conseguenze** possibili: fuga di dati, sanzioni, indisponibilitÃ . E non confonderlo con l'**insider threat**: l'insider doloso vuole danneggiare l'azienda, l'utente Shadow IT di norma vuole solo lavorare, anche se il rischio che crea Ã¨ reale."
      },
      {
        name: "Bloatware",
        checklistKey: "BloatwareConcept",
        definition: "Software preinstallato non necessario o indesiderato che consuma risorse e puÃ² ampliare la superficie d'attacco; non Ã¨ necessariamente malevolo.",
        details: "Il **bloatware** arriva di solito preinstallato dal produttore del dispositivo o incluso in un pacchetto durante un'altra installazione:\n* **PerchÃ© Ã¨ un problema di sicurezza, non solo di prestazioni:** Ã¨ **software aggiuntivo che nessuno ha chiesto e che nessuno aggiorna**. Spesso gira con privilegi elevati, include componenti di aggiornamento propri e amplia la superficie d'attacco senza portare alcun valore.\n* **Non Ã¨ malware:** la differenza sta nell'**intenzione**. Il malware Ã¨ scritto per fare danno; il bloatware Ã¨ di norma software legittimo, solo inutile per l'utente. Alcuni casi stanno nel mezzo (adware, componenti che raccolgono dati di telemetria), ma la categoria in sÃ© non implica dolo.\n* **Come si affronta:** rimozione in fase di **provisioning**, tramite un'immagine aziendale pulita (*golden image*) invece dell'installazione del produttore, e verifica periodica del software installato rispetto alla baseline approvata.\n\n* **Piccolo Esempio Concentrato:** un lotto di portatili arriva con un'utilitÃ  di aggiornamento driver del produttore, che gira come servizio con privilegi di sistema e scarica pacchetti da un proprio canale. Anni dopo una falla in quell'utilitÃ  consente l'esecuzione di codice come amministratore: nessuno la usava, ma era su tutte le macchine.",
        examTip: "**Trappola d'esame:** il bloatware Ã¨ **indesiderato, non necessariamente malevolo** â€” se la domanda descrive software preinstallato inutile, la risposta Ã¨ bloatware, non malware. La mitigazione che l'esame si aspetta Ã¨ la **rimozione del software non necessario** in fase di hardening, idealmente partendo da una baseline aziendale invece che dall'immagine del produttore."
      }
    ]
  },
  {
    title: "2. Motivations (Obj 2.1)",
    description: "Le spinte psicologiche, strategiche ed economiche dietro gli attacchi informatici.",
    icon: "ShieldAlert",
    subtopics: [
      {
        name: "Financial Gain",
        checklistKey: "FinancialGainMotiv",
        definition: "La ricerca di profitto monetario diretto o indiretto tramite attivitÃ  illecite.",
        details: "Ãˆ la motivazione di gran lunga piÃ¹ comune nell'era digitale:\n* **Meccanismi:** Richieste di riscatto ransomware, vendita di numeri di carte di credito o cartelle cliniche sul dark web, furto di criptovalute dagli exchange, o trasferimento fraudolento di fondi (Business Email Compromise - BEC).\n\n* **Piccolo Esempio Concentrato:** Un gruppo criminale invia un'email di spear phishing fingendosi il CEO e convince l'amministrativo a effettuare un bonifico urgente di 50.000â‚¬ su un conto estero non tracciabile.",
        examTip: "Il guadagno finanziario domina gli scenari legati alla criminalitÃ  organizzata."
      },
      {
        name: "Espionage",
        checklistKey: "EspionageMotiv",
        definition: "Il furto sistematico di informazioni riservate, militari, statali o industriali senza farsi rilevare.",
        details: "Lo spionaggio mira a raccogliere intelligence a lungo termine:\n* **Caratteristiche:** L'attaccante vuole rimanere nascosto il piÃ¹ a lungo possibile (basso profilo). Se distruggesse i sistemi, verrebbe scoperto immediatamente.\n* **Soggetti:** Svolto prevalentemente da Nation-States per scopi militari/geopolitici o da grandi aziende concorrenti.\n\n* **Piccolo Esempio Concentrato:** Un hacker sponsorizzato da uno stato installa un malware persistente di basso profilo sui server di un'azienda aerospaziale, esfiltrando nell'arco di sei mesi i progetti riservati di un nuovo sistema radar militare senza alterare alcun servizio.",
        examTip: "Nello spionaggio l'obiettivo Ã¨ la Riservatezza dei dati, mentre l'IntegritÃ  e la DisponibilitÃ  dei sistemi non vengono solitamente alterate per non destare sospetti."
      },
      {
        name: "Revenge",
        checklistKey: "RevengeMotiv",
        definition: "Il desiderio di ritorsione e di causare danni reputazionali o materiali come risposta a un torto percepito.",
        details: "La vendetta Ã¨ la motivazione tipica delle minacce interne:\n* **Esempi:** Un amministratore di sistema che viene licenziato e attiva una Logic Bomb programmata, o un dipendente insoddisfatto che cancella database critici prima di andarsene.\n* **Danno:** Spesso mirato ad alterare la DisponibilitÃ  o l'IntegritÃ  dei sistemi aziendali.\n\n* **Piccolo Esempio Concentrato:** Un sistemista licenziato in tronco, prima che i suoi account vengano disattivati, accede via VPN e distrugge le tabelle principali del database di produzione della ditta per danneggiare il fatturato aziendale.",
        examTip: "Negli attacchi motivati da vendetta, la persona ha tipicamente una relazione pregressa o in corso con la vittima."
      },
      {
        name: "Ideology",
        checklistKey: "IdeologyMotiv",
        definition: "La spinta a compiere attacchi per supportare ideali politici, ecologici, etici o religiosi.",
        details: "L'ideologia muove gli hacktivisti e i gruppi di protesta digitale:\n* **Esempi:** Attacchi contro aziende petrolifere da parte di attivisti del clima, o violazioni di siti governativi durante elezioni politiche per protestare contro la censura.\n* **Obiettivo:** Attirare l'attenzione dei media su una specifica causa.\n\n* **Piccolo Esempio Concentrato:** Un collettivo di hacktivisti penetra nel sito web di una casa farmaceutica e pubblica la lista dei test sugli animali per sensibilizzare l'opinione pubblica contro lo sfruttamento faunistico.",
        examTip: "Se l'attacco non porta profitto economico ma punta a sensibilizzare l'opinione pubblica su un tema etico, la motivazione Ã¨ l'ideologia."
      },
      {
        name: "Chaos",
        checklistKey: "ChaosMotiv",
        definition: "La volontÃ  distruttiva pura di generare disordine, disservizi o instabilitÃ  senza un fine ulteriore.",
        details: "Attacchi compiuti per dimostrare potere o per semplice divertimento nichilista:\n* **Esempi:** Rilasciare un worm distruttivo su internet per vedere fino a dove riesce a propagarsi, o effettuare attacchi DDoS casuali contro siti web popolari.\n* **Attori:** Spesso associato a Script Kiddie o a gruppi anarchici.\n\n* **Piccolo Esempio Concentrato:** Un gruppo di programmatori amatoriali diffonde sul web un virus distruttivo che cancella a caso i file di configurazione di Windows, col solo scopo di seminare panico tra gli utenti di tutto il mondo.",
        examTip: "Il caos mira direttamente all'annientamento della DisponibilitÃ  e all'interruzione dei servizi, senza richieste di riscatto."
      }
    ]
  },
  {
    title: "3. Threat Vectors & Attack Surfaces (Obj 2.2)",
    description: "I canali o percorsi utilizzati dagli attori delle minacce per accedere o compromettere un sistema.",
    icon: "TrendingUp",
    subtopics: [
      {
        name: "Threat Vectors",
        checklistKey: "ThreatVectorsDetails",
        definition: "I canali o percorsi utilizzati dagli attori delle minacce per accedere o compromettere un sistema.",
        details: "I vettori di minaccia comuni includono:\n* **Email (Phishing):** Uno dei vettori piÃ¹ usati; l'utente riceve email ingannevoli per installare malware o rubare credenziali.\n* **Wireless:** Sfruttare vulnerabilitÃ  in Wi-Fi (WPA2 debole, Rogue AP) o Bluetooth (Bluejacking, Bluesnarfing).\n* **Removable Media (USB):** Inserimento fisico di chiavette USB infette per bypassare le difese di rete ed eseguire payload.\n* **Cloud:** Sfruttare configurazioni errate (es. bucket S3 aperti) o credenziali API esposte su repository pubblici.\n* **Supply Chain (Catena di Fornitura):** Compromettere un fornitore di terze parti fidato per colpire la vittima finale (es. attacco SolarWinds).\n* **Direct Access / Physical:** Accesso fisico diretto a server, switch o workstation sbloccate per sottrarre dati o installare keylogger hardware.\n* **Social Media:** Raccolta di informazioni tramite OSINT o esche di ingegneria sociale per adescare dipendenti.\n\n* **Piccolo Esempio Concentrato:** Un attaccante lascia cadere intenzionalmente una chiavetta USB con etichetta 'Buste Paga Dipendenti' nel parcheggio aziendale. Un dipendente curioso la raccoglie, la inserisce nel suo PC in ufficio e innesca un malware trojan.",
        examTip: "La catena di fornitura (Supply Chain) Ã¨ un vettore subdolo perchÃ© sfrutta la fiducia implicita riposta dall'azienda nei confronti dei software o servizi di partner esterni approvati."
      },
      {
        name: "Attack Surfaces",
        checklistKey: "AttackSurfacesDetails",
        definition: "L'insieme di tutti i punti di ingresso vulnerabili o esposti in cui un attaccante puÃ² tentare di violare un sistema.",
        details: "Le superfici di attacco si dividono in:\n* **Software Attack Surface:** Codice esposto, API pubbliche, servizi attivi non patchati, sistemi operativi e porte aperte. Si riduce tramite l'hardening (disabilitando servizi superflui, chiudendo porte) e applicando patch.\n* **Hardware Attack Surface:** Dispositivi fisici, firmware vulnerabili (BIOS/UEFI non aggiornati), porte fisiche esposte (porte Ethernet in aree pubbliche) o porte USB accessibili.\n* **Physical Attack Surface:** L'area fisica dell'azienda o dei data center (porte di sicurezza, recinzioni, postazioni di lavoro lasciate incustodite).\n* **Human Attack Surface:** Gli utenti e i dipendenti dell'organizzazione che possono essere raggirati tramite l'ingegneria sociale o commettere errori di configurazione.\n\n* **Piccolo Esempio Concentrato:** Un server aziendale con porte Remote Desktop (RDP) esposte direttamente su Internet senza limitazioni d'accesso e un centralino fisico sbloccato nel corridoio costituiscono due enormi ed evidenti superfici d'attacco (software e fisica).",
        examTip: "Per ridurre la superficie d'attacco software, la regola primaria d'esame Ã¨ applicare il principio del minimo privilegio, fare hardening sistematico e chiudere tutte le porte e i servizi non strettamente necessari."
      }
    ]
  },
  {
    title: "4. Malware (Obj 2.4)",
    description: "I diversi tipi di software dannoso progettati per compromettere i sistemi e i dati.",
    icon: "Activity",
    subtopics: [
      {
        name: "Virus",
        checklistKey: "VirusMalware",
        definition: "Software dannoso che richiede un file ospite e l'intervento umano per essere eseguito e propagarsi.",
        details: "Caratteristiche del virus:\n* **Infezione:** Si allega a un programma eseguibile o a un documento (es. macro in un file Word).\n* **Propagazione:** Non puÃ² diffondersi da solo su altri computer; richiede che un utente sposti e apra attivamente il file infetto (es. tramite chiavetta USB o email).\n\n* **Piccolo Esempio Concentrato:** Un utente riceve un file Excel contenente macro infette; l'utente abilita l'esecuzione delle macro, avviando il codice virus che infetta tutti i file `.exe` della macchina.",
        examTip: "Ricorda la distinzione d'esame: il Virus richiede sempre l'azione dell'utente per diffondersi, mentre il Worm agisce in totale autonomia."
      },
      {
        name: "Worm",
        checklistKey: "WormMalware",
        definition: "Software dannoso autosufficiente che si propaga in automatico sulla rete sfruttando vulnerabilitÃ  dei servizi.",
        details: "Caratteristiche del worm:\n* **Indipendenza:** Non necessita di un file ospite a cui allegarsi.\n* **VelocitÃ :** PuÃ² infettare centinaia di migliaia di computer in pochi minuti scansionando la rete alla ricerca di porte aperte e servizi vulnerabili (es. WannaCry sfruttando MS17-010 EternalBlue).\n* **Impatto:** Consuma grandi quantitÃ  di banda di rete e risorse di sistema.\n\n* **Piccolo Esempio Concentrato:** Il malware Conficker scansiona costantemente la subnet locale e si propaga in autonomia ad altri PC della rete aziendale senza richiedere alcuna interazione da parte di alcun utente.",
        examTip: "I worm sfruttano bug del software di rete per propagarsi in modo automatico (Self-replicating) senza alcuna interazione umana."
      },
      {
        name: "Trojan",
        checklistKey: "TrojanMalware",
        definition: "Un programma apparentemente innocuo o utile che nasconde un payload distruttivo o una backdoor.",
        details: "Meccanismo d'inganno:\n* **Esempio:** Un utente scarica un gioco gratuito o un'utility per ottimizzare il PC. All'avvio il software funziona normalmente, ma in background installa una backdoor di controllo remoto (RAT - Remote Access Trojan).\n* **Scopo:** Aggirare i controlli perimetrali inducendo l'utente stesso a autorizzare l'esecuzione del software.\n\n* **Piccolo Esempio Concentrato:** Un utente scarica un editor di PDF craccato. Il programma legge e modifica i file correttamente, ma in background apre la porta SSH 2222 dell'host per permettere all'attaccante di collegarsi.",
        examTip: "Il Trojan si basa sulla tecnica del cavallo di Troia: l'utente viene ingannato sull'utilitÃ  dell'applicazione."
      },
      {
        name: "Ransomware",
        checklistKey: "RansomwareMalware",
        definition: "Malware che cifra i dati dell'utente e richiede un pagamento in criptovalute per sbloccarli.",
        details: "Tecniche avanzate di ransomware:\n* **Doppia Estorsione (Double Extortion):** Oltre a cifrare i file locali, l'attaccante esfiltra i dati sensibili prima della cifratura. Se la vittima ha i backup e si rifiuta di pagare per decifrare, l'attaccante minaccia di pubblicare i dati sensibili online.\n* **Triple Extortion:** Include anche attacchi DDoS contro l'azienda o minacce dirette ai clienti della vittima.\n\n* **Piccolo Esempio Concentrato:** Un dipendente apre un allegato malevolo; in pochi secondi i database aziendali assumono l'estensione `.encrypted` e compare un file di testo che esige 5 Bitcoin in cambio della chiave crittografica.",
        examTip: "La difesa primaria contro il ransomware Ã¨ avere un piano di backup offline o immutabile (non accessibile dalla rete ordinaria)."
      },
      {
        name: "Rootkit",
        checklistKey: "RootkitMalware",
        definition: "Malware che opera a livello privilegiato (root o system) e la cui funzione caratteristica Ã¨ **nascondere sÃ© stesso e l'attivitÃ  dell'attaccante** al sistema operativo e agli strumenti di sicurezza, mantenendo l'accesso nel tempo.",
        details: "ProfonditÃ  di infiltrazione:\n* **Funzionamento:** Modifica le chiamate di sistema (System Calls) del sistema operativo. Se un antivirus chiede la lista dei processi attivi, il rootkit intercetta la richiesta e rimuove se stesso dalla lista prima di inviarla.\n* **Livello:** Spesso opera a livello di kernel o firmware (UEFI), rendendo quasi impossibile la rilevazione con strumenti software standard in esecuzione sullo stesso sistema operativo.\n\n* **Piccolo Esempio Concentrato:** Un rootkit a livello kernel intercetta le query di esplorazione dei file dell'antivirus, nascondendo la cartella in cui risiedono i suoi file binari dannosi.",
        examTip: "**Il punto che l'esame verifica:** il rootkit di norma **non conquista** i privilegi, li **conserva e li occulta**. A ottenerli Ã¨ stato un exploit o una credenziale rubata; il rootkit arriva dopo e serve a restare. Da qui la conseguenza pratica: un sistema compromesso **non puÃ² indagare sÃ© stesso**, perchÃ© il rootkit intercetta proprio le chiamate che l'antivirus userebbe per cercarlo, e il sistema operativo riferisce ciÃ² che il rootkit gli lascia vedere. Per questo si analizza il disco da un **supporto di avvio esterno e pulito**, e per i rootkit piÃ¹ profondi (bootkit, firmware) la sola via affidabile Ã¨ la **reinstallazione da immagine certificata**, non la disinfezione."
      },
      {
        name: "Spyware",
        checklistKey: "SpywareMalware",
        definition: "Software che raccoglie segretamente informazioni sulle attivitÃ  di un utente senza il suo consenso.",
        details: "Dati raccolti dallo spyware:\n* Cronologia di navigazione web, credenziali bancarie digitate, screenshot dello schermo o utilizzo della webcam.\n* Spesso viene installato in bundle con freeware o tramite attacchi drive-by download su siti compromessi.\n\n* **Piccolo Esempio Concentrato:** Un software adware installato surrettiziamente registra le sessioni di acquisto online dell'utente e invia a server pubblicitari esterni le sue preferenze d'acquisto.",
        examTip: "Lo spyware mira specificamente a compromettere la Riservatezza (Confidentiality) delle informazioni personali."
      },
      {
        name: "Keylogger",
        checklistKey: "KeyloggerMalware",
        definition: "Dispositivo hardware o programma software progettato per registrare ogni singolo tasto premuto sulla tastiera.",
        details: "Tipologie:\n* **Software Keylogger:** Cattura gli input da tastiera a livello di driver o di API del sistema operativo e li invia periodicamente a un server controllato dall'attaccante.\n* **Hardware Keylogger:** Un piccolo connettore fisico inserito tra il cavo della tastiera USB e la porta del computer, totalmente invisibile ai software antivirus ordinari.\n\n* **Piccolo Esempio Concentrato:** Un piccolo barilotto USB infilato tra la tastiera e il computer dell'amministrativo memorizza offline ogni singola combinazione di credenziali digitata in chiaro.",
        examTip: "I keylogger sono usati principalmente per rubare password e credenziali aziendali durante la digitazione."
      },
      {
        name: "Logic Bomb",
        checklistKey: "LogicBombMalware",
        definition: "Codice dannoso inserito intenzionalmente in un programma che rimane inattivo finchÃ© non si verifica una specifica condizione.",
        details: "Fattori di attivazione:\n* **Data/Ora (Time Bomb):** Ad esempio, programmata per attivarsi venerdÃ¬ 13 o alla data di scadenza di un contratto.\n* **Azione logica:** L'assenza di un determinato record nel database (es. se l'utente 'Mario Rossi' viene cancellato dall'anagrafica dipendenti, la logic bomb cancella tutto il server).\n\n* **Piccolo Esempio Concentrato:** Un programmatore lascia nel codice di backend una routine che cancella i log di sistema e i database qualora il suo codice fiscale venisse escluso dall'elenco del database pagamenti.",
        examTip: "Le logic bomb sono tipicamente create da insider maliziosi (programmatori o amministratori di sistema arrabbiati)."
      }
    ]
  },
  {
    title: "5. Social Engineering (Obj 2.2)",
    description: "Tecniche di manipolazione psicologica utilizzate per indurre le persone a compiere azioni o rivelare dati sensibili.",
    icon: "Users",
    subtopics: [
      {
        name: "Phishing",
        checklistKey: "PhishingSE",
        definition: "Invio massivo di email ingannevoli contenenti allegati malevoli o link a siti web contraffatti.",
        details: "Varianti di phishing:\n* **Phishing Generico:** Invio a pioggia senza personalizzazione.\n* **Spear Phishing:** Attacco mirato a uno specifico individuo o azienda, personalizzato con dati reali (es. citando il nome del manager o un progetto reale dell'azienda).\n* **Whaling (Caccia alla balena):** Spear phishing mirato esclusivamente a dirigenti di alto livello (CEO, CFO) per autorizzare ingenti trasferimenti di denaro.\n\n* **Piccolo Esempio Concentrato:** Un'impiegata amministrativa riceve un'email apparentemente proveniente dal CFO aziendale (**Whaling**) in cui si richiede di liquidare urgentemente una fattura scaduta a un finto fornitore estero allegando un modulo PDF infetto.",
        examTip: "Un'email fraudolenta indirizzata specificamente al Direttore Finanziario per fargli firmare un bonifico urgente Ã¨ definita Whaling."
      },
      {
        name: "Smishing",
        checklistKey: "SmishingSE",
        definition: "Phishing condotto tramite messaggi SMS o app di messaggistica mobile.",
        details: "Sfrutta l'elevato tasso di apertura dei messaggi sul cellulare:\n* **Esempi:** SMS contraffatti che sembrano provenire da banche, poste o corrieri espresso (es. 'Pacco bloccato, clicca qui per pagare la tariffa di sdoganamento').\n* **Pericolo:** Gli utenti tendono a fidarsi del proprio smartphone piÃ¹ che della posta elettronica.\n\n* **Piccolo Esempio Concentrato:** Un tecnico riceve un SMS sul cellulare aziendale con mittente 'Ufficio IT' (**Smishing**) in cui si dice che il suo account Ã¨ sospeso e si fornisce un link per confermare le credenziali d'accesso.",
        examTip: "Smishing = SMS + Phishing."
      },
      {
        name: "Vishing",
        checklistKey: "VishingSE",
        definition: "Phishing condotto tramite chiamate telefoniche o sistemi vocali interattivi.",
        details: "L'attaccante usa la voce per creare urgenza:\n* **Tecnica:** PuÃ² usare la tecnologia VoIP per falsificare l'ID chiamante (Caller ID Spoofing) facendo apparire il numero della banca reale o del supporto IT.\n* **AI Voice Cloning:** Utilizzo recente di deepfake vocali per imitare perfettamente la voce dell'amministratore delegato dell'azienda.\n\n* **Piccolo Esempio Concentrato:** Un operatore riceve una chiamata VoIP in cui un truffatore, simulando perfettamente la voce del CEO tramite intelligenza artificiale (**Vishing**), gli impone di aggirare le procedure ed inviargli i dati di bilancio non ancora pubblici.",
        examTip: "Vishing = Voice + Phishing."
      },
      {
        name: "Pretexting",
        checklistKey: "PretextingSE",
        definition: "Creazione di uno scenario fittizio o pretesto credibile prima dell'attacco per indurre la vittima a collaborare.",
        details: "Come funziona:\n* L'attaccante non chiede subito i dati, ma costruisce una storia solida. Ad esempio, chiama fingendosi un investigatore antifrode o un addetto dell'ufficio censimenti, ponendo prima domande di routine per poi estorcere dati d'accesso riservati.\n\n* **Piccolo Esempio Concentrato:** Un attaccante telefona alla segreteria fingendo di essere un tecnico di rete dell'operatore telefonico nazionale impegnato in un controllo della linea. Chiede informazioni banali sulla connettivitÃ  per poi farsi dettare le credenziali di accesso al pannello del router.",
        examTip: "Il pretexting Ã¨ la fase preparatoria di creazione dello scenario fittizio che dÃ  legittimitÃ  alle successive richieste dell'attaccante."
      },
      {
        name: "Impersonation",
        checklistKey: "ImpersonationSE",
        definition: "Farsi passare attivamente per un'altra persona fisica o per un ruolo autorevole.",
        details: "Esempi pratici:\n* Presentarsi fisicamente all'ingresso aziendale vestito da corriere con degli scatoloni in mano per farsi aprire la porta sul retro.\n* Telefonare spacciandosi per il vice-presidente o un tecnico del supporto IT esterno per ordinare la reimpostazione di una password.\n\n* **Piccolo Esempio Concentrato:** Un attaccante si presenta nella sede aziendale indossando una divisa da elettricista, mostrando un finto tesserino e con una cassetta degli attrezzi al seguito. Dice di dover controllare un quadro elettrico nella sala server e riesce a farsi dare accesso diretto fisicamente.",
        examTip: "L'impersonificazione fa leva sui principi di AutoritÃ  e Consenso sociale per bypassare i controlli fisici o logici."
      },
      {
        name: "Watering Hole",
        checklistKey: "WateringHoleSE",
        definition: "Compromissione di un sito web di terze parti legittimo e frequentato abitualmente dal gruppo target dell'attacco.",
        details: "Metafora dell'oasi nel deserto:\n* Invece di attaccare direttamente la rete blindata del Ministero della Difesa, l'attaccante infetta un forum di discussione locale o un sito di catering situato di fronte al Ministero e frequentato dai suoi dipendenti.\n* Quando i dipendenti visitano quel sito, i loro browser vengono infettati tramite exploit web silenziosi.\n\n* **Piccolo Esempio Concentrato:** Un gruppo APT compromette l'allegato del menÃ¹ sul portale del ristorante preferito dei programmatori di una multinazionale high-tech, infettando i PC dei dipendenti non appena scaricano la lista dei piatti del giorno.",
        examTip: "Se un gruppo specifico di dipendenti viene infettato visitando un sito esterno noto e di nicchia, lo scenario d'esame descrive un attacco Watering Hole."
      },
      {
        name: "Typosquatting",
        checklistKey: "TyposquattingSE",
        definition: "Registrazione di nomi di dominio errati ma molto simili a quelli di marchi famosi, sfruttando i refusi di digitazione degli utenti.",
        details: "Esempi:\n* Registrare `goggle.com` al posto di `google.com`, o `paypa1.com` al posto di `paypal.com`.\n* **Utilizzo:** Ospitare pagine di login identiche a quelle originali per rubare le credenziali degli utenti distratti.\n\n* **Piccolo Esempio Concentrato:** Un utente vuole accedere al proprio conto bancario ma digita accidentalmente `bancaun1credit.it` anzichÃ© `bancaunicredit.it`. Si trova di fronte a una copia identica del portale che acquisisce le sue credenziali per inoltrarle ai truffatori.",
        examTip: "Chiamato anche URL Hijacking, sfrutta l'errore umano di battitura sulla barra degli indirizzi del browser."
      },
      {
        name: "Cloning",
        checklistKey: "CloningSE",
        definition: "La duplicazione o clonazione di e-mail legittime, siti web o file multimediali per ingannare gli utenti o rubare informazioni.",
        details: "Caratteristiche principali della clonazione:\n* **Clone Phishing:** Un attacco in cui una e-mail legittima precedentemente inviata e contenente un allegato o un link reale viene copiata (clonata) e modificata inserendo un link o un allegato malevolo. L'e-mail viene quindi inviata da un indirizzo che imita il mittente originale.\n* **Website Cloning:** Creazione di una replica speculare e visivamente identica di un sito web legittimo (es. il portale di accesso di una banca) per indurre gli utenti a inserire le proprie credenziali.\n* **AI Voice Cloning:** Utilizzo di campioni vocali di un utente (es. un dirigente) tramite intelligenza artificiale per imitare la sua voce ed effettuare attacchi di vishing mirati.",
        examTip: "All'esame, ricorda che il Clone Phishing consiste nello scambiare il link o l'allegato di un'e-mail reale e fidata precedentemente ricevuta con una versione contraffatta."
      },
      {
        name: "Whaling",
        checklistKey: "WhalingSE_New",
        definition: "Un tipo altamente specifico di attacco di spear phishing indirizzato esclusivamente a dirigenti di altissimo livello aziendale.",
        details: "Caratteristiche del Whaling:\n* **Target Executive:** Prende di mira figure apicali come CEO (Amministratore Delegato), CFO (Direttore Finanziario) o membri del consiglio d'amministrazione.\n* **Grande Impatto:** Spesso associato a truffe BEC (Business Email Compromise) per l'approvazione di trasferimenti urgenti di grandi somme di denaro.\n* **Tono Estremamente Formale:** Spesso utilizza pretesti legali, citazioni in giudizio fittizie, o notifiche formali di agenzie governative.",
        examTip: "Se la domanda d'esame specifica che l'obiettivo del phishing Ã¨ un dirigente di alto livello (CEO/CFO), la risposta corretta Ã¨ Whaling (caccia alla balena)."
      },
      {
        name: "Misinformation",
        checklistKey: "MisinformationSE_New",
        definition: "La diffusione involontaria o non intenzionale di informazioni false, errate o non verificate.",
        details: "Distinzione fondamentale:\n* **Misinformation (Disinformazione involontaria):** Informazioni errate diffuse senza un intento esplicito e coordinato di ingannare o recare danno (es. un utente che condivide un post falso credendolo vero).\n* **Disinformation (Disinformazione intenzionale):** Creazione e diffusione deliberata di notizie false con l'intento specifico di manipolare l'opinione pubblica, sviare le indagini o danneggiare un concorrente.\n* **Malinformation:** Informazioni reali ma utilizzate fuori contesto o divulgate intenzionalmente per causare danni (es. leak di messaggi privati).",
        examTip: "All'esame, ricorda che la differenza chiave tra Misinformation e Disinformation risiede interamente nell'intenzionalitÃ  (la Misinformation non ha un intento doloso coordinato iniziale)."
      },
      {
        name: "Phishing campaign",
        checklistKey: "PhishingCampaignSE_New",
        definition: "Un'operazione coordinata di invio di e-mail fraudolente a un gruppo di utenti per scopi malevoli o di addestramento.",
        details: "Fasi e tipologie di campagne:\n* **Campagne Malevole:** Condotte da attaccanti esterni per raccogliere credenziali, installare malware o avviare attacchi ransomware su larga scala all'interno di un'organizzazione.\n* **Campagne di Simulazione (Simulated Phishing):** Strumento fondamentale di Security Awareness gestito dal team di sicurezza interno. Consente di misurare la vulnerabilitÃ  del personale, raccogliere statistiche (click-rate) e formare gli utenti che cadono nel tranello.",
        examTip: "Le campagne di simulazione di phishing (Phishing campaign) aiutano le aziende a identificare i dipendenti piÃ¹ vulnerabili e ad addestrarli in modo dinamico e interattivo."
      },
      {
        name: "Business Email Compromise (BEC)",
        checklistKey: "BECSocialEngineering",
        definition: "Truffa mirata in cui l'attaccante impersona (o controlla realmente) la casella di posta di un dirigente o di un fornitore fidato per indurre un dipendente ad autorizzare un bonifico o a divulgare dati riservati.",
        details: "Il **Business Email Compromise (BEC)** Ã¨ la frode via e-mail economicamente piÃ¹ dannosa secondo l'FBI, ed Ã¨ esplicitamente citata negli obiettivi SY0-701 (Obj 2.2 - Human vectors).\n* **Nessun malware:** Il BEC non usa allegati o link malevoli, quindi i filtri antivirus e i gateway anti-malware non lo intercettano. L'arma Ã¨ esclusivamente la manipolazione psicologica (autoritÃ  + urgenza + riservatezza).\n* **Le tre varianti d'esame:**\n  1. **CEO fraud:** un'e-mail che sembra provenire dall'amministratore delegato chiede un bonifico urgente e 'confidenziale'.\n  2. **Vendor/Invoice fraud:** l'attaccante intercetta una corrispondenza reale con un fornitore e invia una fattura autentica con l'IBAN modificato.\n  3. **Account takeover:** l'attaccante entra davvero nella casella del dirigente (via phishing o credential stuffing) e scrive dal dominio legittimo, superando SPF, DKIM e DMARC.\n* **Tecniche di inganno del mittente:** spoofing del campo `From`, domini *lookalike* (`ranco.it` invece di `banco.it`), o semplice modifica del `Reply-To`.\n\n* **Piccolo Esempio Concentrato:** La contabile di un\'azienda riceve venerdÃ¬ alle 17:50 un\'e-mail dal 'CEO' in viaggio: chiede un bonifico immediato di 48.000 â‚¬ per chiudere un\'acquisizione riservata e raccomanda di non parlarne con nessuno fino a lunedÃ¬. Il dominio mittente Ã¨ `azienda-spa.com` invece di `aziendaspa.com`. La procedura aziendale di *callback verification* (richiamare il richiedente su un numero giÃ  noto in rubrica, mai su quello indicato nell\'e-mail) blocca la truffa.",
        examTip: "Il controllo piÃ¹ efficace contro il BEC NON Ã¨ tecnologico ma procedurale: la verifica *out-of-band* (callback su un recapito giÃ  censito) e la doppia autorizzazione (dual control) per i pagamenti sopra una certa soglia. All\'esame, se lo scenario descrive una richiesta di pagamento urgente e riservata da parte di un dirigente e NON menziona nÃ© allegati nÃ© link, la risposta Ã¨ Business Email Compromise, non phishing generico."
      },
      {
        name: "Brand Impersonation",
        checklistKey: "BrandImpersonationSE",
        definition: "Attacco in cui l'aggressore riproduce fedelmente il marchio, il logo, i colori e il tono comunicativo di un'azienda nota per far apparire legittimo un messaggio, un sito o un'applicazione fraudolenta.",
        details: "La **Brand Impersonation** sfrutta la fiducia che la vittima ripone in un marchio conosciuto, non in una persona specifica.\n* **Bersagli tipici:** banche, corrieri (avvisi di consegna), servizi cloud (Microsoft 365, Google), fornitori di energia e agenzie fiscali.\n* **Canali:** e-mail HTML clonate pixel per pixel, SMS (in combinazione con lo smishing), annunci sponsorizzati sui motori di ricerca che portano a portali di login contraffatti, app mobili fasulle negli store.\n* **Danno doppio:** la vittima perde le credenziali o il denaro, mentre il marchio impersonato subisce un danno reputazionale che non ha causato nÃ© puÃ² controllare direttamente.\n* **Contromisure lato azienda impersonata:** pubblicazione di record **DMARC** in policy `reject`, monitoraggio dei **Certificate Transparency log** e del typosquatting sui domini simili, servizi di *brand protection* e takedown.\n\n* **Piccolo Esempio Concentrato:** Un dipendente riceve un\'e-mail con il logo, il piÃ¨ di pagina e i caratteri esatti del corriere aziendale: 'Pacco in giacenza, paga 2,90 â‚¬ di dogana'. Il link porta a un sito identico all\'originale ospitato su `corriere-tracking-it.net`. Il pagamento serve solo a far digitare alla vittima i dati completi della carta di credito.",
        examTip: "Distingui bene le tre 'impersonificazioni' d'esame: **Impersonation** = ci si finge una *persona* (il nuovo tecnico, un collega); **Brand impersonation** = ci si finge un *marchio/azienda*; **Typosquatting** = si registra un *dominio* con un refuso per intercettare chi sbaglia a digitare. Le tre tecniche vengono spesso combinate nello stesso attacco."
      }
    ]
  },
  {
    title: "6. Password Attacks (Obj 2.4)",
    description: "Le metodologie utilizzate per violare i sistemi di autenticazione basati su credenziali d'accesso.",
    icon: "Lock",
    subtopics: [
      {
        name: "Brute-force attack",
        checklistKey: "BruteForceAtt",
        definition: "Tentativo sistematico ed esaustivo di ogni possibile combinazione di caratteri fino a trovare la password esatta.",
        details: "Caratteristiche:\n* **Offline Brute Force:** L'attaccante ruba il database degli hash delle password ed effettua i tentativi in locale sul proprio hardware (molto veloce, nessuna policy di blocco account).\n* **Online Brute Force:** Tentativi effettuati direttamente sulla pagina di login web (lento e facilmente bloccabile).\n\n* **Piccolo Esempio Concentrato:** Un utente adotta una password debole a 4 cifre (`8291`). Un programma automatico tenta istantaneamente tutte le 10.000 combinazioni possibili sulla pagina del login in meno di un secondo fino a scovarla.",
        examTip: "La difesa principale contro il brute-forcing offline Ã¨ l'uso di algoritmi di hashing lenti e resistenti (es. bcrypt, PBKDF2) e lunghezze elevate delle password."
      },
      {
        name: "Dictionary",
        checklistKey: "DictionaryAtt",
        definition: "Attacco mirato che prova sistematicamente parole predefinite tratte da un elenco o dizionario.",
        details: "Ottimizzazione del brute-force:\n* Invece di provare combinazioni casuali (es. `aaaa`, `aaab`), l'attacco prova parole di senso compiuto, nomi, date storiche e password comuni presenti nei leak precedenti (es. `Password123`, `Love`, `Juventus`).\n\n* **Piccolo Esempio Concentrato:** Un attaccante carica una wordlist contenente i termini piÃ¹ comuni del dizionario italiano e le password trapelate negli anni, e indovina in pochi istanti la password di un amministratore che aveva impostato `soleemare2020`.",
        examTip: "L'uso di passphrase (frasi composte da piÃ¹ parole casuali) rende gli attacchi a dizionario inefficaci."
      },
      {
        name: "Password Spraying",
        checklistKey: "PasswordSprayingAtt",
        definition: "Tentativo di accedere a moltissimi account diversi provando pochissime password estremamente comuni.",
        details: "Come funziona e perchÃ© aggira il lockout:\n* Se provi 5 password errate di fila sull'account di `mario.rossi`, il sistema lo blocca (Account Lockout).\n* Se invece provi la singola password `Password123!` una sola volta su 1000 utenti diversi, nessun account supererÃ  la soglia di lockout, consentendo all'attaccante di intrufolarsi silenziosamente in qualsiasi profilo vulnerabile.\n\n* **Piccolo Esempio Concentrato:** Un bot contatta i server di posta exchange aziendali testando lo username di centinaia di dipendenti provando la combinazione stagionale `Inverno2026!` senza far scattare alcuna policy di lockout su nessun account specifico.",
        examTip: "Il Password Spraying Ã¨ un attacco orizzontale ('one-to-many') studiato specificamente per aggirare le policy di Account Lockout."
      },
      {
        name: "Credential Stuffing",
        checklistKey: "CredentialStuffingAtt",
        definition: "Inserimento automatico di coppie username/password trapelate da violazioni passate su svariati siti web.",
        details: "Sfrutta la debolezza umana del riutilizzo delle credenziali:\n* Se un utente usa la stessa password sia sul forum dei videogiochi (violato in passato) che sulla casella email aziendale, l'attaccante usa bot automatici per provare quelle esatte credenziali sul portale aziendale.\n\n* **Piccolo Esempio Concentrato:** Un database di credenziali rubate da un e-commerce minore viene acquisito da un criminale, che utilizza uno script automatizzato per testare quegli indirizzi email e password sul sito di una nota banca online nazionale, trovando svariati account validi.",
        examTip: "**PerchÃ© funziona:** l'attacco non indovina nulla, **riusa** coppie utente-password giÃ  trapelate da altre violazioni. Ãˆ efficace per una sola ragione, il **riutilizzo della stessa password** su servizi diversi, ed Ã¨ la ragione per cui i tentativi hanno un tasso di successo basso ma non nullo su volumi enormi.\n* **La difesa piÃ¹ forte Ã¨ l'MFA**, perchÃ© la password corretta da sola non basta piÃ¹. **Ma attenzione a non chiamarla definitiva:** un attaccante puÃ² aggirare l'MFA con il *phishing in tempo reale* che inoltra il codice, con l'**MFA fatigue** o rubando il **token di sessione** dopo l'autenticazione. Contro questi casi serve l'MFA **resistente al phishing** (FIDO2/WebAuthn).\n* **Le difese che si affiancano:** confronto delle password scelte con archivi di credenziali trapelate, limitazione del ritmo di richiesta per indirizzo, rilevamento di *impossible travel* e di dispositivi mai visti prima. **Trappola d'esame:** distingui il credential stuffing (molte coppie **giÃ  note**, un tentativo per account) dal password spraying (**una password comune**, moltissimi account) e dalla forza bruta (**molte password generate**, un account)."
      }
    ]
  },
  {
    title: "7. Network, Wireless & App Attacks (Obj 2.4)",
    description: "Attacchi diretti ai canali di trasmissione dati, ai protocolli di rete ed alle applicazioni web.",
    icon: "TrendingUp",
    subtopics: [
      {
        name: "Network & Wireless Attacks",
        checklistKey: "NetworkWirelessAttacks",
        definition: "Attacchi mirati a intercettare, interrompere o deviare il traffico di rete cablato o wireless.",
        details: "I vettori di attacco alla rete includono:\n* **DDoS (Distributed Denial of Service):** Sovraccaricare di traffico un server usando botnet per renderlo non disponibile agli utenti legittimi.\n* **On-path Attack (MITM):** Posizionarsi in mezzo a due computer per spiare o modificare i dati in transito (es. hijacking di sessione).\n* **DNS Poisoning:** Inserire IP falsi nei server DNS per deviare gli utenti su siti truffaldini.\n* **ARP Spoofing:** Associare l'IP di un gateway legittimo al MAC address dell'attaccante in una LAN per intercettare tutto il traffico locale.\n* **MAC Flooding:** Inondare la memoria di uno switch con finti indirizzi MAC costringendolo a trasmettere pacchetti in 'fail-open' (comportandosi come un hub) per sniffare i pacchetti.\n* **Rogue Access Point (Rogue AP):** AP wireless non autorizzato connesso alla porta fisica della rete aziendale senza controlli.\n* **Evil Twin:** AP fraudolento che duplica lo stesso SSID e canali di un Wi-Fi aziendale per intercettare credenziali d'accesso degli utenti raggirati.\n* **Bluejacking & Bluesnarfing:** Sfruttare connessioni Bluetooth per inviare spam (jacking) o rubare informazioni personali (snarfing).\n\n* **Piccolo Esempio Concentrato:** Un malintenzionato si siede nella sala d'attesa aziendale e configura un hotspot con nome fittizio 'Ospiti_Azienda_Free' (**Evil Twin**). I visitatori si connettono convinti di navigare gratis, esponendo le credenziali dei loro social e account email.",
        examTip: "L'Evil Twin imita deliberatamente il nome (SSID) di una rete esistente per indurre gli utenti a connettersi spontaneamente, mentre il Rogue AP Ã¨ semplicemente un punto d'accesso non autorizzato installato fisicamente in rete."
      },
      {
        name: "Application & Cryptographic Attacks",
        checklistKey: "AppCryptoAttacks",
        definition: "Attacchi alle falle logiche del codice o all'implementazione degli algoritmi crittografici.",
        details: "Le tipologie di attacchi applicativi e crittografici comprendono:\n* **SQL Injection (SQLi):** Iniezione di comandi SQL nei campi d'input non sterilizzati per accedere abusivamente al database o distruggere dati.\n* **Cross-Site Scripting (XSS):** Iniezione di script dannosi eseguiti nel browser degli utenti legittimi che visitano il sito vulnerabile.\n* **Buffer Overflow:** Scrittura di dati oltre il limite di un buffer, fino a mandare in crash l'applicazione o a sovrascriverne l'**indirizzo di ritorno** per dirottare l'esecuzione su codice scelto dall'attaccante.\n* **CSRF (Cross-Site Request Forgery):** Sfruttare la sessione attiva e i cookie dell'utente per costringerlo a eseguire azioni indesiderate (es. trasferimenti di denaro) su un'applicazione Web fidata.\n* **SSRF (Server-Side Request Forgery):** Costringere il server vulnerabile a compiere richieste HTTP verso risorse interne non esposte a Internet.\n* **Directory Traversal:** Navigare nel file system del server tramite input non validati (es. `../etc/passwd`) per leggere file di sistema riservati.\n* **Replay Attack:** Intercettare un pacchetto dati autenticato (es. hash di password in transito) e ritrasmetterlo per ingannare il server ed effettuare l'accesso.\n* **Downgrade Attack:** Forzare due sistemi a stabilire una connessione crittografica obsoleta e insicura per poter decifrare i dati piÃ¹ agevolmente.\n* **Birthday Attack:** Attacco basato sulle collisioni degli algoritmi di hash sfruttando il paradosso del compleanno per violare l'integritÃ  delle firme.\n\n* **Piccolo Esempio Concentrato:** Un attaccante inserisce nel campo di ricerca del sito della banca la stringa `' OR '1'='1` (**SQL Injection**). Il server interpreta l'input come query e restituisce l'anagrafica completa dei conti correnti anzichÃ© cercare un record singolo.",
        examTip: "La validazione rigorosa degli input (Input Validation) e la sterilizzazione degli output (Output Encoding) rimangono le difese principali e piÃ¹ testate all'esame contro SQL Injection e XSS."
      },
      {
        name: "Amplified DDoS attack",
        checklistKey: "AmplifiedDDoS_New",
        definition: "Un tipo di attacco DDoS che sfrutta server terzi vulnerabili (UDP-based) per inviare risposte sproporzionatamente grandi alla vittima, sovraccaricandola.",
        details: "Come funziona l'amplificazione:\n* **IP Spoofing:** L'attaccante invia piccole richieste a servizi aperti come DNS, NTP, SNMP, o SSDP, falsificando l'IP sorgente con quello della vittima.\n* **Fattore d'Amplificazione:** I server rispondono inviando alla vittima risposte enormi (fino a centinaia di volte piÃ¹ grandi della richiesta originaria).\n* **Impatto:** Saturazione completa della banda della vittima, causandone il blocco immediato.",
        examTip: "L'attacco DDoS amplificato si basa sul protocollo UDP (che non richiede handshake, permettendo l'IP spoofing) e su server terzi aperti che generano risposte di dimensioni molto maggiori rispetto alla richiesta iniziale."
      },
      {
        name: "Reflected DDoS attack",
        checklistKey: "ReflectedDDoS_New",
        definition: "Un attacco DDoS in cui le richieste d'attacco vengono rimbalzate o riflesse su server intermediari legittimi prima di colpire il bersaglio finale.",
        details: "Caratteristiche del Reflected DDoS:\n* **Nessun Contatto Diretto:** L'attaccante non comunica direttamente con la vittima, nascondendo la reale provenienza dell'attacco.\n* **IP Spoofing:** L'attaccante invia pacchetti di richiesta a server riflettenti legittimi impostando come IP mittente l'IP della vittima.\n* **Rimbalzo:** I server riflettenti rispondono inviando pacchetti alla vittima credendo che sia stata lei a richiederli.\n* **Mitigazione:** Difficile da bloccare poichÃ© il traffico proviene da server legittimi pubblici e autorevoli.",
        examTip: "In un attacco Reflected DDoS, l'attaccante rimbalza ('riflette') il traffico d'attacco usando server intermediari innocenti tramite falsificazione dell'IP della vittima."
      },
      {
        name: "SQL Injection (SQLi)",
        checklistKey: "SQLi_New",
        definition: "Un attacco in cui comandi SQL malevoli vengono inseriti nei campi di input dell'applicazione per manipolare o estrarre dati dal database.",
        details: "Dettagli dell'attacco:\n* **Mancata Sanificazione:** Avviene quando l'applicazione concatena l'input dell'utente direttamente in una query SQL senza eseguire controlli.\n* **Effetti:** Consente all'attaccante di bypassare l'autenticazione, leggere dati riservati, modificarli, cancellarli, o persino eseguire comandi amministrativi sul server del database (tramite procedure memorizzate).\n* **Contromisura Principale:** Uso di query parametriche (Parameterized Queries / Prepared Statements) e sterilizzazione rigorosa degli input.",
        examTip: "La difesa definitiva e piÃ¹ testata all'esame contro la SQL Injection Ã¨ l'adozione sistematica di Prepared Statements (query parametriche), che separano il codice SQL dai dati forniti dall'utente. La validazione dell'input Ã¨ una difesa complementare, non sostitutiva; il WAF Ã¨ un controllo compensativo che filtra i payload noti ma non elimina la vulnerabilitÃ  nel codice."
      }
    ]
  },
  {
    title: "8. Vulnerabilities (Obj 2.3)",
    description: "Identificazione, valutazione e catalogazione dei punti deboli dei sistemi informatici.",
    icon: "Lock",
    subtopics: [
      {
        name: "CVE",
        checklistKey: "CVEVuln",
        definition: "Common Vulnerabilities and Exposures: l'elenco pubblico standardizzato delle falle di sicurezza note.",
        details: "Caratteristiche del CVE:\n* **Identificazione:** Fornisce un ID univoco a ciascuna vulnerabilitÃ  scoperta (es. `CVE-2017-0144` per EternalBlue).\n* **Scopo:** Consente ai professionisti della sicurezza e ai vendor di scambiarsi informazioni precise sulla stessa identica falla usando una denominazione comune internazionale.\n\n* **Piccolo Esempio Concentrato:** Un analista legge che il proprio firewall Fortinet Ã¨ affetto dalla vulnerabilitÃ  denominata `CVE-2023-27997` e puÃ² pianificare l'applicazione della patch correttiva indicando esattamente la scheda tecnica ufficiale.",
        examTip: "Il CVE Ã¨ un dizionario di vulnerabilitÃ  pubbliche e note, non un database proprietario o segreto."
      },
      {
        name: "CVSS",
        checklistKey: "CVSSVuln",
        definition: "Common Vulnerability Scoring System: un framework standard per valutare e comunicare la gravitÃ  di una vulnerabilitÃ .",
        details: "Il punteggio CVSS va da 0.0 a 10.0 (Critico):\n* **Metriche Principali:**\n  - *Base Metrics:* Caratteristiche intrinseche della falla (vettore d'attacco, complessitÃ  d'attacco, privilegi richiesti, interazione utente, impatto su C-I-A).\n  - *Temporal Metrics:* Come evolve la falla nel tempo (es. disponibilitÃ  di codice exploit pubblico, disponibilitÃ  di una patch ufficiale).\n  - *Environmental Metrics:* L'importanza del sistema colpito nell'infrastruttura reale dell'azienda.\n* **Attenzione alla versione:** i tre gruppi qui sopra sono quelli di **CVSS v3.1**. In **v4.0** l'impianto cambia: i gruppi sono **Base, Threat, Environmental e Supplemental**, e *Threat* prende il posto di *Temporal*. Le **fasce di severitÃ  restano identiche** nelle due versioni. Se una domanda nomina le metriche *Temporal*, sta parlando di v3.1.\n\n* **Piccolo Esempio Concentrato:** Uno scanner di vulnerabilitÃ  trova una falla CVSS v3 con punteggio `9.8` sul server Apache esposto sul web dell'azienda, forzando gli analisti ad attivarsi per un patching immediato fuori dall'orario lavorativo.",
        examTip: "Nella scala CVSS v3.x un punteggio da 9.0 a 10.0 ricade nella severitÃ  'Critical' e richiede intervento immediato (tipicamente si tratta di falle sfruttabili da remoto, senza autenticazione e senza interazione dell'utente). Ricorda le fasce, **identiche in v3.1 e in v4.0**: 0.0 None, 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical. Attenzione: il punteggio CVSS misura la gravitÃ  tecnica, NON il rischio aziendale; la prioritÃ  di remediation nasce dal CVSS combinato con la criticitÃ  dell'asset e con l'esposizione reale."
      },
      {
        name: "Zero-Day",
        checklistKey: "ZeroDayVuln",
        definition: "Una vulnerabilitÃ  software non ancora nota al produttore o priva di una patch o rimedio ufficiale.",
        details: "Finestra di esposizione:\n* **Nome:** Deriva dal fatto che il produttore ha avuto 'zero giorni' di preavviso per preparare una patch correttiva.\n* **Pericolo:** Estremamente preziosa per gli attaccanti sofisticati (Nation-States) poichÃ© i sistemi di rilevamento tradizionali basati su firme (Signatures) non possono intercettarla.\n\n* **Piccolo Esempio Concentrato:** Un'azienda di sicurezza scopre che i sistemi operativi Apple iOS sono vulnerabili a un attacco invisibile via iMessage senza interazione utente (**Zero-Day**). Il produttore viene allertato per preparare e rilasciare un aggiornamento d'urgenza.",
        examTip: "I sistemi IPS basati su anomalie (Anomaly-based) e il sandboxing sono le difese migliori per identificare exploit Zero-Day prima del rilascio di patch."
      },
      {
        name: "False Positive",
        checklistKey: "FalsePositiveVuln",
        definition: "La segnalazione errata da parte di uno scanner o di un IDS di una vulnerabilitÃ  o attacco inesistente.",
        details: "Impatto aziendale:\n* Genera rumore e spreco di tempo per gli analisti della sicurezza che indagano su alert fittizi.\n* **Soluzione:** Ottimizzare e personalizzare le regole di scansione e le firme dell'IDS/SIEM.\n\n* **Piccolo Esempio Concentrato:** L'antivirus centrale invia un allarme critico di rilevamento Trojan su un'applicazione personalizzata sviluppata internamente, ma un'analisi manuale rivela che si tratta solo di codice innocuo mal catalogato dal motore euristico.",
        examTip: "All'esame, una scansione autenticata (Credentialed Scan) riduce drasticamente i Falsi Positivi perchÃ© accede direttamente al registro e ai file di configurazione locali."
      },
      {
        name: "False Negative",
        checklistKey: "FalseNegativeVuln",
        definition: "La mancata segnalazione da parte degli strumenti di difesa di una vulnerabilitÃ  o di un attacco realmente esistente.",
        details: "Il pericolo piÃ¹ grave:\n* Lo scanner di vulnerabilitÃ  riporta che il sistema Ã¨ sicuro, ma in realtÃ  ospita una falla critica aperta. Questo lascia l'organizzazione esposta senza alcuna consapevolezza del rischio.\n* Tipico degli attacchi Zero-Day o di malware polimorfici.\n\n* **Piccolo Esempio Concentrato:** Un malware programmato per mutare la firma binaria scavalca silente le difese aziendali poichÃ© il software antivirus locale non rileva alcuna corrispondenza e dichiara la workstation 'protetta e pulita'.",
        examTip: "I Falsi Negativi espongono l'azienda al massimo livello di rischio poichÃ© creano un falso senso di sicurezza."
      },
      {
        name: "Memory Injection",
        checklistKey: "MemoryInjectionVuln",
        definition: "VulnerabilitÃ  che consente a un attaccante di scrivere ed eseguire codice arbitrario nello spazio di memoria di un processo legittimo giÃ  in esecuzione.",
        details: "La **Memory Injection** sfrutta il fatto che un processo affidabile (es. `explorer.exe`, un browser, un servizio di sistema) ha giÃ  i permessi e la reputazione che servono all'attaccante.\n* **PerchÃ© Ã¨ efficace:** il codice malevolo non risiede su disco come file eseguibile, quindi gli antivirus a firme non hanno nulla da analizzare. Ãˆ la base degli attacchi **fileless**.\n* **Tecniche tipiche:** DLL injection, process hollowing (si avvia un processo legittimo sospeso e se ne sostituisce il contenuto), reflective loading.\n* **Beneficio per l'attaccante:** eredita i privilegi del processo ospite e aggira le regole di firewall applicativo e di application allow list, perchÃ© per il sistema sta girando un programma autorizzato.\n* **Difese:** EDR con analisi comportamentale della memoria, protezioni del sistema operativo come DEP e ASLR, e Control Flow Guard.\n\n* **Piccolo Esempio Concentrato:** Un malware inietta una DLL dentro il processo del browser dell\'utente. Il traffico verso il server di comando e controllo esce quindi dal browser, che Ã¨ autorizzato a navigare: il firewall applicativo non vede nulla di anomalo perchÃ© il processo mittente Ã¨ legittimo.",
        examTip: "All'esame, se lo scenario descrive codice malevolo che gira dentro un processo legittimo senza alcun file sospetto sul disco, pensa a Memory Injection e attacco fileless. La contromisura corretta non Ã¨ l'antivirus a firme, ma un EDR con analisi comportamentale."
      },
      {
        name: "Buffer Overflow",
        checklistKey: "BufferOverflowVuln",
        definition: "VulnerabilitÃ  che si verifica quando un programma scrive in un buffer piÃ¹ dati di quanti esso possa contenerne, sovrascrivendo le aree di memoria adiacenti.",
        details: "Il **Buffer Overflow** Ã¨ la vulnerabilitÃ  di memoria piÃ¹ classica e piÃ¹ esaminata.\n* **Causa radice:** l'assenza di un controllo sulla lunghezza dell'input, tipica dei linguaggi senza gestione automatica della memoria come C e C++ (funzioni come `strcpy` o `gets`).\n* **Dal crash all'esecuzione di codice:** sovrascrivendo l'indirizzo di ritorno nello stack, l'attaccante puÃ² dirottare il flusso di esecuzione verso il proprio codice (shellcode), ottenendo l'esecuzione di comandi con i privilegi del programma vulnerabile.\n* **Varianti d'esame:** *stack overflow* (sovrascrive lo stack e l'indirizzo di ritorno) e *heap overflow* (sovrascrive strutture allocate dinamicamente).\n* **Difese:** validazione della lunghezza dell'input, funzioni sicure (`strncpy`), e protezioni di sistema: **ASLR** (randomizza gli indirizzi di memoria), **DEP/NX** (impedisce l'esecuzione di codice nelle aree dati) e stack canary.\n\n* **Piccolo Esempio Concentrato:** Un servizio di rete alloca 64 byte per il nome utente. L\'attaccante ne invia 900, accuratamente costruiti: i byte in eccesso sovrascrivono l\'indirizzo di ritorno della funzione e lo fanno puntare al codice che l\'attaccante ha appena collocato in memoria, ottenendo una shell remota.",
        examTip: "Ricorda la coppia di difese di sistema: **ASLR** rende imprevedibile *dove* si trova la memoria, **DEP/NX** impedisce l'esecuzione di codice *dove* ci sono solo dati. Entrambe non correggono il bug, lo rendono solo molto piÃ¹ difficile da sfruttare: la vera remediation resta la validazione dell'input nel codice."
      },
      {
        name: "Race Condition (TOC/TOU)",
        checklistKey: "RaceConditionVuln",
        definition: "VulnerabilitÃ  che nasce quando il comportamento corretto di un sistema dipende dall'ordine o dalla tempistica di eventi concorrenti, e un attaccante riesce a inserirsi tra il momento del controllo e quello dell'uso.",
        details: "La forma d'esame Ã¨ il **TOC/TOU** (*Time-of-Check to Time-of-Use*): il programma verifica una condizione e poi agisce, ma tra i due istanti esiste una finestra sfruttabile.\n* **I tre termini elencati dall'obiettivo 2.3:** il **TOC** (*Time-of-Check*) Ã¨ l'istante in cui il programma verifica la condizione; il **TOU** (*Time-of-Use*) Ã¨ l'istante in cui agisce fidandosi di quella verifica; il **TOE** (*Target of Evaluation*) Ã¨ la risorsa verificata â€” il file, il record, il contatore â€” cioÃ¨ esattamente ciÃ² che l'attaccante sostituisce nella finestra fra i due istanti.\n* **Lo schema:** 1) il programma controlla che l'utente possa accedere al file A; 2) l'attaccante, in quella frazione di secondo, sostituisce A con un collegamento a un file riservato; 3) il programma agisce sul file sbagliato, credendo di aver giÃ  verificato i permessi.\n* **Dove si manifesta:** accessi al file system, transazioni bancarie, applicazione di codici sconto, incremento di contatori concorrenti.\n* **Difese:** operazioni **atomiche** (controllo e uso in un unico passo indivisibile), lock e mutex, transazioni di database con isolamento adeguato, uso di descrittori di file anzichÃ© di percorsi testuali.\n\n* **Piccolo Esempio Concentrato:** Un sito di e-commerce verifica che un buono sconto non sia ancora stato usato e poi lo marca come consumato. Inviando 50 richieste nello stesso millisecondo, l\'attaccante fa superare il controllo a tutte e 50 prima che la prima riesca a scrivere l\'aggiornamento: lo stesso buono viene applicato 50 volte.",
        examTip: "Parole chiave da riconoscere all'esame: 'tra la verifica e l'utilizzo', 'richieste simultanee', 'condizione di gara'. La risposta corretta Ã¨ Race Condition / TOC-TOU, e la contromisura Ã¨ rendere l'operazione atomica, non aggiungere un secondo controllo. **Trappola d'esame:** quando fra le opzioni compaiono sia *Race condition* sia *Time-of-use*, la categoria generale Ã¨ la prima e il sottotipo la seconda: se lo scenario descrive proprio la finestra fra verifica e uso, la risposta Ã¨ il sottotipo. E non confondere il **TOE** con i due istanti: non Ã¨ un momento, Ã¨ l'oggetto valutato."
      },
      {
        name: "Malicious Update",
        checklistKey: "MaliciousUpdateVuln",
        definition: "VulnerabilitÃ  della catena di fornitura software in cui un aggiornamento apparentemente legittimo e firmato veicola codice malevolo verso tutti i sistemi che lo installano.",
        details: "Il **Malicious Update** ribalta un controllo di sicurezza in un vettore d'attacco: l'organizzazione viene compromessa proprio perchÃ© fa la cosa giusta, cioÃ¨ aggiornare.\n* **Come avviene:** compromissione della pipeline di build del fornitore, furto del suo certificato di code signing, oppure dirottamento del canale di distribuzione (server di update non protetto da HTTPS, DNS hijacking).\n* **PerchÃ© Ã¨ devastante:** l'aggiornamento arriva firmato e da una fonte fidata, quindi supera antivirus, application allow list e diffidenza dell'utente; inoltre colpisce simultaneamente tutti i clienti del fornitore.\n* **Difese:** verifica delle firme e degli hash pubblicati, aggiornamenti scaricati solo su canali cifrati, ambiente di staging prima della produzione, **SBOM** (Software Bill of Materials) per sapere cosa si sta realmente installando, e monitoraggio del comportamento post-aggiornamento.\n\n* **Piccolo Esempio Concentrato:** Un software di monitoraggio di rete usato da migliaia di aziende riceve un aggiornamento regolarmente firmato dal produttore. Al suo interno, inserita nella pipeline di compilazione compromessa, c\'Ã¨ una backdoor che si attiva dopo due settimane: ogni organizzazione che ha applicato la patch risulta compromessa.",
        examTip: "Non confondere: **Malicious update** = l'aggiornamento *ufficiale* Ã¨ stato avvelenato a monte; **Trojan** = l'utente installa volontariamente un software che credeva innocuo. Il malicious update Ã¨ il caso in cui patchare tempestivamente, pur essendo la pratica corretta, ha aumentato il rischio: per questo esistono gli anelli di rilascio graduali (staged rollout)."
      },
      {
        name: "VM Escape & Resource Reuse",
        checklistKey: "VMEscapeVuln",
        definition: "VulnerabilitÃ  della virtualizzazione: il VM Escape consente a un attaccante di uscire dalla macchina virtuale e raggiungere l'hypervisor o le altre VM; il Resource Reuse espone dati residui quando una risorsa viene riassegnata a un altro tenant.",
        details: "Sono le due vulnerabilitÃ  specifiche degli ambienti virtualizzati e cloud multi-tenant citate dall'obiettivo 2.3.\n* **VM Escape:** sfruttando una falla dell'hypervisor, il codice che gira dentro una VM guest 'evade' e ottiene esecuzione sull'host. Ãˆ l'attacco piÃ¹ grave possibile in un ambiente virtualizzato, perchÃ© annulla l'isolamento su cui si fonda l'intero modello cloud: da una singola VM di un cliente si arriva potenzialmente a tutte le altre sullo stesso host.\n* **Resource Reuse:** RAM, spazio disco o storage cloud vengono liberati da un tenant e riassegnati a un altro senza essere azzerati; il nuovo occupante puÃ² leggere i dati residui del precedente. Ãˆ la versione cloud del problema dei supporti non sanificati.\n* **Difese:** patching tempestivo dell'hypervisor, riduzione al minimo degli strumenti di integrazione guest-host, isolamento su hardware dedicato per i carichi piÃ¹ sensibili, e cifratura dei dati a riposo con chiavi gestite dal cliente, che rende illeggibili i residui anche in caso di riuso della risorsa.\n\n* **Piccolo Esempio Concentrato:** Un attaccante affitta legittimamente una VM presso un provider cloud. Sfrutta una falla nel driver grafico virtualizzato dell\'hypervisor per eseguire codice sull\'host fisico, e da lÃ¬ accede alla memoria delle macchine virtuali degli altri clienti che condividono lo stesso server.",
        examTip: "All'esame, VM Escape Ã¨ la minaccia che giustifica l'uso di **tenancy dedicata** invece di hardware condiviso per i carichi critici. Contro il Resource Reuse, la risposta corretta Ã¨ la cifratura a riposo con chiavi controllate dal cliente: se i dati residui sono cifrati, per il tenant successivo restano rumore."
      },
      {
        name: "Mobile Vulnerabilities (Jailbreaking & Sideloading)",
        checklistKey: "MobileVulnVuln",
        definition: "VulnerabilitÃ  introdotte rimuovendo le restrizioni del sistema operativo mobile (jailbreaking su iOS, rooting su Android) o installando applicazioni al di fuori degli store ufficiali (sideloading).",
        details: "Sono le due vulnerabilitÃ  mobile elencate esplicitamente dall'obiettivo 2.3.\n* **Jailbreaking / Rooting:** l'utente ottiene privilegi amministrativi sul dispositivo, disattivando il modello di sicurezza del produttore. Conseguenze: il *sandboxing* tra applicazioni salta, le app possono leggere i dati altrui, gli aggiornamenti ufficiali spesso smettono di funzionare e i controlli dell'MDM aziendale possono essere aggirati.\n* **Sideloading:** installazione di pacchetti (APK, IPA) scaricati da fonti non ufficiali, che non hanno superato i controlli automatici e manuali dello store. Ãˆ il canale abituale di distribuzione di trojan bancari e spyware mobile.\n* **Rischio per l'azienda:** un dispositivo compromesso che accede alla posta e alle applicazioni aziendali trasforma un problema personale in una violazione aziendale, specialmente in contesti BYOD.\n* **Difese:** policy MDM che rilevano il jailbreak/root e bloccano l'accesso alle risorse aziendali (*attestation*), divieto di installazione da fonti sconosciute e contenitori di lavoro separati dal profilo personale.\n\n* **Piccolo Esempio Concentrato:** Un dipendente esegue il root del proprio telefono personale per installare un\'app a pagamento gratuitamente, scaricando l\'APK da un forum. L\'app contiene uno spyware che, non essendoci piÃ¹ il sandboxing, legge i token di sessione dell\'app di posta aziendale installata sullo stesso dispositivo.",
        examTip: "Distingui i due termini: **Jailbreaking/Rooting** rimuove le restrizioni *del sistema operativo*; **Sideloading** installa app *fuori dallo store*, e non richiede necessariamente il root. Il controllo d'esame corretto Ã¨ l'MDM con rilevamento del root e blocco condizionale dell'accesso, non la semplice formazione dell'utente."
      },
      {
        name: "Misconfiguration",
        checklistKey: "MisconfigurationVuln",
        definition: "VulnerabilitÃ  derivante da impostazioni di sicurezza errate, incomplete o lasciate ai valori predefiniti, anzichÃ© da un difetto del codice.",
        details: "La **Misconfiguration** non richiede alcun bug software: il prodotto funziona esattamente come progettato, ma Ã¨ stato configurato male.\n* **Casi tipici d'esame:** credenziali predefinite mai cambiate, bucket di storage cloud esposti pubblicamente, permessi di condivisione troppo ampi, servizi di debug o porte di gestione raggiungibili da Internet, cifratura disponibile ma non attivata, logging disabilitato.\n* **PerchÃ© Ã¨ cosÃ¬ frequente:** i sistemi vengono forniti con impostazioni orientate alla facilitÃ  d'uso, non alla sicurezza; inoltre la configurazione si degrada nel tempo (**configuration drift**) attraverso modifiche non tracciate.\n* **Difese:** **security baseline** e benchmark CIS, hardening documentato, Infrastructure as Code per rendere le configurazioni ripetibili e verificabili, scansioni di conformitÃ  automatizzate (SCAP) e change management.\n\n* **Piccolo Esempio Concentrato:** Un team di sviluppo crea un bucket di storage cloud per condividere dei file e imposta il permesso di lettura su 'chiunque con il link' per fare prima. Il bucket viene indicizzato e migliaia di documenti interni diventano consultabili pubblicamente. Nessun software era vulnerabile: lo era la configurazione.",
        examTip: "Attenzione alla distinzione d'esame: se il problema si risolve applicando una **patch**, Ã¨ una vulnerabilitÃ  del software; se si risolve **cambiando un'impostazione**, Ã¨ una misconfiguration. Le misconfiguration sono tra le cause piÃ¹ comuni di violazione reale, e la contromisura corretta Ã¨ la baseline di sicurezza con verifica continua, non l'aggiornamento."
      },
      {
        name: "Legacy & End-of-Life Systems",
        checklistKey: "LegacyEOLVuln",
        definition: "VulnerabilitÃ  strutturale dei sistemi hardware o software che non ricevono piÃ¹ aggiornamenti di sicurezza dal produttore perchÃ© hanno superato la data di fine supporto.",
        details: "Un sistema **End-of-Life (EOL)** o **legacy** accumula vulnerabilitÃ  in modo permanente: ogni nuova falla scoperta resta aperta per sempre, perchÃ© nessuna patch verrÃ  mai rilasciata.\n* **Terminologia da distinguere:** *End-of-Sale* (non piÃ¹ acquistabile), *End-of-Support / EOL* (niente piÃ¹ patch di sicurezza), *legacy* (tecnologia obsoleta ancora in produzione, talvolta ancora supportata).\n* **PerchÃ© restano in funzione:** applicativi gestionali che girano solo su quel sistema operativo, macchinari industriali e medicali certificati su una versione specifica, costo di migrazione elevato.\n* **Compensating control obbligatori** quando la dismissione non Ã¨ possibile: **segmentazione** rigorosa in una VLAN isolata, regole di firewall che consentono solo i flussi indispensabili, rimozione dell'accesso a Internet, monitoraggio rinforzato e, dove disponibile, *virtual patching* tramite IPS.\n\n* **Piccolo Esempio Concentrato:** Un ospedale utilizza una TAC il cui software di controllo gira su un sistema operativo fuori supporto da anni e non aggiornabile senza invalidare la certificazione dell\'apparecchiatura. La macchina viene isolata in una VLAN dedicata, senza accesso a Internet, raggiungibile solo dalla postazione di refertazione tramite regole di firewall esplicite.",
        examTip: "Negli scenari d'esame con un sistema critico non aggiornabile, la risposta non Ã¨ mai 'applicare la patch' (non esiste) nÃ© 'accettare il rischio' senza altro: Ã¨ **isolamento e segmentazione** come controllo compensativo, accompagnati da un piano di sostituzione documentato."
      }
    ]
  },
  {
    title: "9. Mitigations (Obj 2.5)",
    description: "Tecniche e contromisure per abbattere il rischio, ridurre la superficie d'attacco e contrastare le minacce.",
    icon: "Lock",
    subtopics: [
      {
        name: "ACL",
        checklistKey: "ACLMiti",
        definition: "Access Control List: liste di regole che controllano e limitano l'accesso a risorse o traffico di rete.",
        details: "Ambiti di applicazione:\n* **Network ACL (Firewall/Router):** Regole sequenziali che permettono o negano pacchetti IP in transito basandosi su IP sorgente/destinazione, protocollo e porte (es. 'Consenti traffico TCP su porta 443').\n* **FileSystem ACL:** Permessi su file e cartelle che specificano quali utenti o gruppi possono Leggere (Read), Scrivere (Write) o Eseguire (Execute).\n\n* **Piccolo Esempio Concentrato:** Un amministratore configura una regola sul router aziendale (**Network ACL**) che blocca tutto il traffico in ingresso tranne le connessioni provenienti dall'indirizzo IP statico dell'ufficio principale sulla porta 22 per la gestione SSH sicura.",
        examTip: "Le ACL di rete contengono tipicamente una regola finale implicita di rifiuto di tutto il traffico non esplicitamente autorizzato (Implicit Deny)."
      },
      {
        name: "Segmentation",
        checklistKey: "SegmentationMiti",
        definition: "La pratica di suddividere una rete in sottoreti isolate e indipendenti per limitare il raggio d'azione di un attacco.",
        details: "Vantaggi di sicurezza:\n* **Contenimento:** Se un computer in una rete di test viene infettato, la segmentazione impedisce al malware di propagarsi verso la rete sensibile della contabilitÃ .\n* **Implementazione:** Realizzata tramite VLAN, subnet distinte e posizionamento di firewall di reparto.\n\n* **Piccolo Esempio Concentrato:** Un amministratore configura due VLAN distinte per isolare la rete Wi-Fi dedicata agli ospiti da quella della contabilitÃ  interna (**Segmentation**), impedendo che un portatile ospite infetto possa scansionare o attaccare i server finanziari.",
        examTip: "La segmentazione della rete mitiga i movimenti laterali di un attaccante all'interno della LAN."
      },
      {
        name: "Least Privilege",
        checklistKey: "LeastPrivilegeMiti",
        definition: "Il principio fondamentale che prevede di assegnare a ciascun utente, processo o sistema solo i permessi minimi indispensabili.",
        details: "Applicazione:\n* Evita che utenti ordinari abbiano diritti amministrativi locali sui loro laptop.\n* Riduce l'impatto di un'infezione malware: se l'utente infettato non Ã¨ amministratore, il malware non potrÃ  installarsi a livello profondo o disattivare l'antivirus.\n\n* **Piccolo Esempio Concentrato:** Un impiegato delle risorse umane riceve i permessi per accedere esclusivamente alla cartella dei contratti dei dipendenti, ma non a quella del bilancio finanziario (**Least Privilege**), riducendo l'esposizione dei dati aziendali.",
        examTip: "Least Privilege Ã¨ la regola aurea per contrastare minacce interne e contenere la compromissione degli account."
      },
      {
        name: "Patching",
        checklistKey: "PatchingMiti",
        definition: "L'applicazione periodica e sistematica di aggiornamenti software per sanare vulnerabilitÃ  scoperte.",
        details: "Ciclo di Patch Management:\n* **Test:** Verificare la patch in un ambiente di pre-produzione prima del rilascio (per evitare incompatibilitÃ ).\n* **Rilascio:** Applicazione ordinata durante finestre di manutenzione.\n* **Verifica:** Nuova scansione per confermare la chiusura della vulnerabilitÃ .\n\n* **Piccolo Esempio Concentrato:** Il team IT riceve una notifica su una vulnerabilitÃ  critica del server web e programma un'applicazione immediata dell'aggiornamento correttivo (**Patching**) durante la finestra di manutenzione notturna per prevenire eventuali intrusioni.",
        examTip: "La mancata applicazione tempestiva delle patch Ã¨ la causa principale di successo degli attacchi basati su exploit noti d'esame."
      },
      {
        name: "Application Allow List",
        checklistKey: "AppAllowListMiti",
        definition: "Tecnica che impedisce l'esecuzione di qualsiasi software ad eccezione di quelli esplicitamente autorizzati in una lista.",
        details: "Rispetto al blocco (Block List/Blacklist):\n* **Approccio:** Ãˆ molto piÃ¹ sicuro perchÃ© segue la filosofia del default-deny. Qualsiasi nuovo virus o script sconosciuto non potrÃ  mai avviarsi, poichÃ© non fa parte della lista dei programmi autorizzati dall'amministratore.\n\n* **Piccolo Esempio Concentrato:** Un dipendente scarica un programma freeware per la modifica dei PDF e tenta di avviarlo, ma riceve un messaggio di blocco dal sistema operativo poichÃ© l'applicazione non Ã¨ presente nella lista di quelle autorizzate (**Application Allow List**).",
        examTip: "Chiamato in passato Whitelisting, Ã¨ il controllo piÃ¹ potente contro l'avvio di file eseguibili malevoli non identificati."
      },
      {
        name: "Isolation",
        checklistKey: "IsolationMiti",
        definition: "Isolare fisicamente o logicamente sistemi compromessi o non fidati dal resto della rete aziendale.",
        details: "Metodologie:\n* **Quarantena:** Spostare un endpoint infettato da ransomware in una VLAN speciale priva di internet o contatti con altri host.\n* **Sandbox:** Avviare file o link potenzialmente dannosi in un ambiente virtualizzato isolato per analizzarne il comportamento riducendo fortemente il rischio per l'host. Non lo azzera: esistono tecniche di *sandbox escape* e malware che riconoscono la sandbox e restano inerti finchÃ© sono osservati.\n\n* **Piccolo Esempio Concentrato:** Un utente apre un allegato sospetto e il sistema antivirus lo avvia automaticamente all'interno di una macchina virtuale temporanea e priva di rete (**Sandbox**) per verificare se tenta di cifrare file.",
        examTip: "L'isolamento di una macchina infetta Ã¨ la primissima azione di contenimento (Containment) nel piano di Incident Response."
      },
      {
        name: "Encryption",
        checklistKey: "EncryptionMiti",
        definition: "L'uso della crittografia per proteggere la riservatezza dei dati sia a riposo che in transito.",
        details: "Tipologie:\n* **Data-at-rest (A riposo):** Cifratura di hard disk (FDE, BitLocker), database, file e backup.\n* **Data-in-transit (In movimento):** Cifratura dei pacchetti di rete (HTTPS/TLS, IPsec VPN) per evitare l'intercettazione.\n\n* **Piccolo Esempio Concentrato:** Un dipendente perde il computer portatile aziendale in aeroporto, ma i dati rimangono inaccessibili a chiunque trovi il dispositivo poichÃ© l'intero hard disk Ã¨ protetto da cifratura completa (**Data-at-rest Encryption**).",
        examTip: "**Attenzione a che cosa la cifratura protegge davvero.** Protegge il dato quando finisce in mano a chi **non ha la chiave**: un disco rubato, un backup smarrito, un pacchetto intercettato in transito. **Non protegge** dall'attaccante che opera **dentro una sessione giÃ  autenticata**: in un ransomware con doppia estorsione il malware gira con i privilegi di un utente o di un servizio legittimo, e il sistema gli decifra i file in modo trasparente, esattamente come farebbe per il proprietario. La cifratura del disco non impedisce l'esfiltrazione.\n* **Contro l'esfiltrazione servono altri controlli:** minimo privilegio, DLP, segmentazione e monitoraggio dei volumi in uscita. **Contro il ransomware la difesa Ã¨ il backup** offline o immutabile, e la verifica periodica del ripristino. **Trappola d'esame:** se lo scenario parla di un dispositivo **smarrito o rubato**, la risposta Ã¨ la cifratura; se parla di dati **esfiltrati da un sistema in funzione**, non lo Ã¨."
      },
      {
        name: "Monitoring",
        checklistKey: "MonitoringMiti",
        definition: "La raccolta, aggregazione e analisi continua dei log e degli eventi di sicurezza in tempo reale.",
        details: "Strumenti chiave:\n* **SIEM (Security Information and Event Management):** Centralizza i log di firewall, server, database ed esegue correlazione di eventi alla ricerca di attacchi.\n* **SOC (Security Operations Center):** Il team di specialisti che monitora i sistemi 24/7/365.\n\n* **Piccolo Esempio Concentrato:** Un server SIEM (**Monitoring**) rileva una raffica improvvisa di tentativi di accesso falliti seguiti da un login riuscito da un IP estero alle 3 del mattino, inviando immediatamente un alert critico ai reperibili del SOC.",
        examTip: "Il monitoraggio continuo fornisce la visibilitÃ  proattiva necessaria per rilevare attacchi complessi prima che facciano danni gravi."
      },
      {
        name: "Disable Ports/Protocols",
        checklistKey: "DisablePortsMiti",
        definition: "Disabilitare servizi inutilizzati, porte di rete aperte superflue e protocolli insicuri e in chiaro.",
        details: "Hardening di base:\n* **Porte:** Spegnere le porte fisiche dello switch negli uffici non utilizzate per impedire connessioni fisiche abusive.\n* **Protocolli:** Vietare protocolli obsoleti come Telnet (porta 23), FTP (porta 21), HTTP (porta 80) e imporre le varianti sicure SSH (porta 22), SFTP (porta 22), HTTPS (porta 443).\n\n* **Piccolo Esempio Concentrato:** Durante la messa in sicurezza di un nuovo server Linux, l'amministratore spegne il servizio Telnet e disabilita la porta 23, costringendo gli operatori a utilizzare esclusivamente connessioni SSH cifrate sulla porta 22.",
        examTip: "Disabilitare le porte inutilizzate e i servizi non richiesti Ã¨ il primo fondamentale passo d'esame per l'host hardening."
      },
      {
        name: "Change Default Passwords",
        checklistKey: "ChangePasswordsMiti",
        definition: "Sostituire immediatamente le credenziali impostate dal produttore (es. admin/admin) su qualsiasi nuovo hardware o software.",
        details: "Attacchi automatizzati:\n* I bot cercano continuamente indirizzi IP di telecamere IP, router e stampanti collegate a internet provando liste pubbliche di credenziali predefinite.\n* La mancata modifica espone i sistemi a una compromissione banale in pochi minuti dall'installazione.\n\n* **Piccolo Esempio Concentrato:** Al momento dell'installazione di una nuova stampante di rete per l'ufficio, l'amministratore IT accede alla pagina Web di gestione e cambia immediatamente le credenziali originali `admin/1234` con una passphrase complessa.",
        examTip: "La primissima configurazione di sicurezza su un nuovo dispositivo IoT o apparato di rete deve essere il cambio delle password predefinite."
      },
      {
        name: "Remove Unnecessary Software",
        checklistKey: "RemoveSoftwareMiti",
        definition: "Eliminare qualsiasi programma, utilitÃ , compilatore o servizio non strettamente necessario all'esecuzione del server.",
        details: "Riduzione dei vettori d'attacco:\n* Meno software installato significa meno codice esposto a potenziali bug o exploit futuri.\n* Rende anche piÃ¹ rapido il processo di patch management e l'ottimizzazione delle risorse di memoria.\n\n* **Piccolo Esempio Concentrato:** Su un server di database Oracle in produzione, l'amministratore disinstalla i browser web, i giochi integrati nel sistema operativo e i compilatori Python e GCC inutilizzati (**Remove Unnecessary Software**), riducendo i componenti attaccabili e gli strumenti che un aggressore troverebbe giÃ  pronti sulla macchina. La rimozione **riduce**, non azzera: restano le falle del kernel, dei servizi indispensabili e delle configurazioni, che vanno affrontate con patching, minimo privilegio e hardening.",
        examTip: "Rimuovere il software non richiesto riduce direttamente la superficie d'attacco software (Software Attack Surface) di un host."
      }
    ]
  },
  {
    title: "10. Threat Intelligence (Obj 2.1, 2.2 & 4.3)",
    description: "Fonti di informazioni sulle minacce, OSINT, condivisione delle informazioni e intelligence sul dark web.",
    icon: "ShieldAlert",
    subtopics: [
      {
        name: "Threat Intelligence",
        checklistKey: "ThreatIntelligenceRes",
        definition: "Informazioni strutturate e basate su evidenze riguardanti le minacce emergenti, gli attori ostili, le loro motivazioni, capacitÃ  e pattern d'attacco, utilizzate per prendere decisioni difensive consapevoli.",
        details: "La **Threat Intelligence** si articola in tre livelli operativi:\n* **Strategic Intelligence:** Informazioni ad alto livello destinate alla dirigenza aziendale per comprendere i trend globali delle minacce, i rischi geopolitici e pianificare gli investimenti di sicurezza a lungo termine.\n* **Tactical Intelligence:** Dettagli tecnici sulle Tattiche, Tecniche e Procedure (TTP) utilizzate dagli attaccanti. Aiuta i difensori del SOC a comprendere come si muovono le minacce.\n* **Operational/Technical Intelligence:** Indicatori di Compromissione (IoC) specifici ed immediati, come indirizzi IP malevoli, domini di comando e controllo (C2), o hash di file malware, utilizzati per configurare istantaneamente firewall, IDS e SIEM.",
        examTip: "La Threat Intelligence consente alle organizzazioni di passare da una difesa puramente reattiva a una postura proattiva, anticipando le mosse degli attaccanti prima che colpiscano l'infrastruttura."
      },
      {
        name: "OSINT",
        checklistKey: "OSINTRes",
        definition: "Open Source Intelligence: La metodologia di raccolta, analisi e correlazione di dati e informazioni sensibili o utili provenienti esclusivamente da fonti pubbliche, liberamente accessibili e legali.",
        details: "L'**OSINT** viene ampiamente utilizzata sia dagli hacker etici per la ricognizione passiva, sia dagli attaccanti per preparare attacchi mirati:\n* **Fonti Comuni:**\n  - *Social Network:* Profili LinkedIn, Facebook o Twitter per identificare i ruoli e l'organigramma dei dipendenti aziendali.\n  - *Database Pubblici:* Record DNS, database WHOIS, indirizzi IP registrati, registri delle camere di commercio.\n  - *Motori di Ricerca:* Google Dorking per scovare file sensibili indicizzati per errore, Shodan per mappare dispositivi IoT ed apparati esposti su internet.\n  - *Repository di Codice:* GitHub o GitLab per individuare password, chiavi API o commenti di debug lasciati accidentalmente dai programmatori.",
        examTip: "L'OSINT si basa su fonti di pubblico dominio. Nella sua forma passiva (registri WHOIS, certificati pubblici, social, motori di ricerca) non genera traffico verso l'infrastruttura del target ed Ã¨ quindi difficilmente rilevabile; attenzione perÃ² a non confonderla con la ricognizione attiva (scansione di porte, enumerazione di servizi), che invece tocca i sistemi della vittima e lascia tracce nei log."
      },
      {
        name: "Proprietary Intelligence",
        checklistKey: "ProprietaryIntelligenceRes",
        definition: "Intelligence Proprietaria: Informazioni sulle minacce commerciali, private ed esclusive raccolte e analizzate da aziende di cybersecurity specializzate, fornite ai clienti dietro abbonamento a pagamento.",
        details: "A differenza delle fonti pubbliche o open-source, la **Proprietary Intelligence** offre vantaggi competitivi chiave:\n* **QualitÃ  e Accuratezza:** I dati sono costantemente validati e analizzati da team di analisti umani dedicati, riducendo drasticamente i falsi positivi.\n* **Feed in Tempo Reale:** Fornisce IoC e advisory di sicurezza esclusive molto prima che vengano divulgati nei database pubblici nazionali.\n* **Esempi:** Feed commerciali di minacce forniti da vendor leader di mercato quali CrowdStrike, Mandiant o Palo Alto Networks.",
        examTip: "**Che cosa si paga davvero:** non informazioni intrinsecamente piÃ¹ vere, ma **curatela** â€” dati arricchiti di contesto, filtrati dal rumore, correlati con campagne note e consegnati in formato direttamente utilizzabile, con un impegno contrattuale sui tempi. **I limiti da conoscere:** il costo, e il fatto che le fonti del fornitore non sono ispezionabili, quindi le sue valutazioni si prendono in parte sulla fiducia.\n* **Come si confrontano le fonti:** l'**OSINT** costa poco ed Ã¨ verificabile, ma va filtrata a mano; l'**intelligence proprietaria** Ã¨ curata e tempestiva, ma opaca e onerosa; un'**organizzazione di condivisione settoriale** (ISAC) offre il contesto piÃ¹ pertinente, perchÃ© i suoi membri subiscono gli stessi attacchi. Una postura matura le usa insieme, non ne sceglie una."
      },
      {
        name: "Information Sharing",
        checklistKey: "InformationSharingRes",
        definition: "Condivisione delle Informazioni: La pratica collaborativa in cui organizzazioni pubbliche e private dello stesso settore o di settori diversi scambiano tra loro dati e IoC su attacchi informatici subiti per rafforzare la difesa comune.",
        details: "La condivisione delle informazioni permette di contrastare attacchi coordinati su vasta scala:\n* **ISAC (Information Sharing and Analysis Centers):** Organizzazioni settoriali (es. FS-ISAC per il settore finanziario, Aviation-ISAC per l'aviazione) dedicate allo scambio sicuro di intelligence tra aziende concorrenti ma unite nella sicurezza.\n* **Standard e Protocolli:** Per automatizzare lo scambio di informazioni leggibili dalle macchine, si utilizzano gli standard:\n  - *STIX (Structured Threat Information eXpression):* Linguaggio XML/JSON standardizzato per descrivere le informazioni sulle minacce.\n  - *TAXII (Trusted Automated eXchange of Intelligence Information):* Protocollo di rete sicuro a livello applicativo progettato specificamente per trasportare i messaggi STIX.",
        examTip: "STIX definisce 'cosa' viene condiviso (la struttura dati della minaccia), mentre TAXII definisce 'come' tali informazioni vengono scambiate in sicurezza sulla rete."
      },
      {
        name: "Dark Web Intelligence",
        checklistKey: "DarkWebIntelligenceRes",
        definition: "Intelligence sul Dark Web: Il monitoraggio proattivo e l'ispezione dei canali e dei mercati illegali presenti sulle reti anonime (come Tor o I2P) alla ricerca di credenziali aziendali rubate, dati esfiltrati o piani di attacco diretti contro l'organizzazione.",
        details: "La **Dark Web Intelligence** consente di intercettare le violazioni molto prima che abbiano un impatto devastante:\n* **Cosa si cerca:** Database aziendali messi in vendita, credenziali di dipendenti rubate tramite malware infostealer, discussioni in forum hacker su come penetrare nella rete dell'organizzazione, o kit ransomware pronti all'uso per colpire il brand.\n* **Strumenti:** Bot automatizzati ed analisti infiltrati in canali protetti (Telegram, forum chiusi) che scansionano le sorgenti senza compromettere la sicurezza degli asset aziendali.",
        examTip: "L'intelligence sul dark web Ã¨ cruciale per la rilevazione precoce di furti di credenziali o fughe di dati (leaks) giÃ  avvenute ma non ancora scoperte internamente dall'IT."
      }
    ]
  }
];

export const DOMAIN_3_TOPICS: TopicGroup[] = [
  {
    title: "1. Cloud (Obj 3.1)",
    description: "I modelli di servizio e deployment cloud, la divisione delle responsabilitÃ  di sicurezza e la governance dei dati.",
    icon: "TrendingUp",
    subtopics: [
      {
        name: "On-premises",
        checklistKey: "OnPremisesArchitecture",
        definition: "Un modello architetturale che prevede l'hosting, l'installazione e la gestione diretta delle infrastrutture IT all'interno dei locali fisici dell'organizzazione.",
        details: "Nel modello on-premises (o on-prem), l'azienda ha la proprietÃ  fisica e il controllo totale su server, rete e dati. PuÃ² essere configurato sia in modalitÃ  centralizzata che decentralizzata. Sebbene offra il massimo controllo e conformitÃ  per dati ultra-sensibili, richiede elevati investimenti iniziali (CapEx), manutenzione costante e gestione fisica della sicurezza (raffreddamento, alimentazione, sorveglianza).",
        examTip: "L'architettura On-premises indica che l'hardware Ã¨ situato fisicamente all'interno della sede aziendale, ponendo l'intera responsabilitÃ  della sicurezza (fisica e logica) in capo all'organizzazione stessa."
      },
      {
        name: "Centralized",
        checklistKey: "CentralizedArchitecture",
        definition: "Un modello architetturale che prevede l'uso di un singolo punto di controllo o di un'autoritÃ  centrale per gestire un intero sistema o servizio.",
        details: "I sistemi centralizzati offrono vantaggi significativi in termini di semplicitÃ  gestionale, coerenza delle politiche di sicurezza e facilitÃ  di monitoraggio. Tuttavia, presentano svantaggi critici quali l'essere un singolo punto di guasto (Single Point of Failure - SPOF), limitazioni di scalabilitÃ  e una totale mancanza di autonomia per le singole unitÃ  periferiche.",
        examTip: "Un modello Centralized concentra tutto il controllo e il processo decisionale in un unico punto; questo semplifica l'amministrazione ma crea un unico punto di guasto critico."
      },
      {
        name: "Decentralized",
        checklistKey: "DecentralizedArchitecture",
        definition: "Un modello architetturale che distribuisce il controllo, le decisioni e l'autoritÃ  di gestione su molteplici punti distribuiti nel sistema.",
        details: "I sistemi decentralizzati migliorano la resilienza complessiva (eliminando i singoli punti di guasto), aumentano la scalabilitÃ  orizzontale e offrono maggiore autonomia operativa ai nodi o dipartimenti locali. Di contro, introducono una maggiore complessitÃ  di integrazione, potenziali incoerenze nelle configurazioni e sfide di sicurezza significative.",
        examTip: "A differenza del modello centralizzato, l'architettura Decentralized distribuisce l'autoritÃ  su piÃ¹ nodi, aumentando la resilienza a discapito di una maggiore complessitÃ  gestionale."
      },
      {
        name: "IaaS",
        checklistKey: "IaaSCloud",
        definition: "Infrastructure as a Service: Modello cloud in cui il provider fornisce risorse di calcolo, storage e rete fondamentali.",
        details: "In un modello IaaS:\n* **Cosa gestisce il provider:** Server fisici, ipervisori, sistemi di storage fisico e componenti di rete fisici (datacenter).\n* **Cosa gestisce il cliente:** Sistemi operativi (OS), middleware, runtime applicativi, dati e le applicazioni stesse.\n* **Esempi:** AWS EC2, Google Compute Engine (GCE), Microsoft Azure VM.\n* **Implicazioni di Sicurezza:** Il cliente Ã¨ responsabile dell'host hardening, dell'installazione delle patch del sistema operativo e della configurazione dei firewall di rete virtuali (es. Security Groups).\n\n* **Piccolo Esempio Concentrato:** Un'azienda avvia tre macchine virtuali su Amazon EC2 (**IaaS**) per ospitare un database. L'azienda deve installare manualmente le patch di sicurezza del sistema operativo Linux e configurare i Security Groups per limitare l'accesso alla porta del database, mentre Amazon si occupa solo della manutenzione fisica dell'hardware e dell'hypervisor.",
        examTip: "All'esame, in IaaS il cliente ha il massimo livello di controllo amministrativo e la massima responsabilitÃ  di sicurezza rispetto agli altri modelli cloud."
      },
      {
        name: "PaaS",
        checklistKey: "PaaSCloud",
        definition: "Platform as a Service: Modello in cui il provider fornisce un ambiente di runtime e sviluppo pronto all'uso senza dover gestire l'hardware e i sistemi operativi sottostanti.",
        details: "In un modello PaaS:\n* **Cosa gestisce il provider:** Tutto l'hardware, la virtualizzazione, i sistemi operativi, il middleware e i database di backend.\n* **Cosa gestisce il cliente:** Il codice delle proprie applicazioni e le configurazioni di accesso/funzionamento dell'applicazione.\n* **Esempi:** Heroku, Google App Engine, AWS Elastic Beanstalk.\n* **Implicazioni di Sicurezza:** La sicurezza del sistema operativo e delle patch di sistema Ã¨ interamente gestita dal cloud provider. Il cliente deve concentrarsi solo sulla sicurezza del codice (Application Security, OWASP Top 10) e sulla gestione delle identitÃ  e degli accessi (IAM).\n\n* **Piccolo Esempio Concentrato:** Un team di sviluppatori carica il codice di un'applicazione Node.js su Google App Engine (**PaaS**). Non devono preoccuparsi di configurare server Web, Linux o fare il patching del sistema operativo (gestito da Google), ma devono proteggere l'applicazione da vulnerabilitÃ  SQL Injection nel loro codice.",
        examTip: "In PaaS, il cliente non si occupa del patching del sistema operativo nÃ© dell'infrastruttura di rete di base; il suo focus Ã¨ unicamente sulla sicurezza del codice e dei dati."
      },
      {
        name: "FaaS",
        checklistKey: "FaaSCloud",
        definition: "Function as a Service: Modello cloud serverless in cui il provider esegue singoli blocchi di codice (funzioni) attivati da eventi specifici.",
        details: "In un modello FaaS (noto anche come Serverless):\n* **Cosa gestisce il provider:** Server fisici, virtualizzazione, sistemi operativi, scalabilitÃ  automatica delle risorse (da zero a migliaia e viceversa) e gestione del runtime di esecuzione del codice.\n* **Cosa gestisce il cliente:** Unicamente il codice sorgente della funzione e i relativi trigger/permessi di accesso (IAM).\n* **Esempi:** AWS Lambda, Google Cloud Functions, Azure Functions.\n* **Implicazioni di Sicurezza:** Il cliente non deve configurare OS hardening o patch di sicurezza del server, ma la superficie d'attacco si sposta interamente sulle API, sulle vulnerabilitÃ  logiche del codice della funzione e su una corretta e rigorosa configurazione dei permessi IAM per evitare accessi non autorizzati ad altre risorse.\n\n* **Piccolo Esempio Concentrato:** Un'azienda implementa un sistema in cui, ogni volta che un utente carica una foto in cloud, una funzione su AWS Lambda (**FaaS**) viene attivata per ridimensionarla automaticamente. L'azienda paga solo per i millisecondi effettivi di esecuzione della funzione, senza gestire alcun server Web.",
        examTip: "All'esame CompTIA, il modello FaaS (Serverless) sposta quasi interamente la responsabilitÃ  infrastrutturale sul provider cloud, lasciando al cliente solo la responsabilitÃ  del codice e dei permessi di accesso."
      },
      {
        name: "SaaS",
        checklistKey: "SaaSCloud",
        definition: "Software as a Service: Modello in cui il provider distribuisce un'applicazione completa, pronta all'uso e accessibile via web/API.",
        details: "In un modello SaaS:\n* **Cosa gestisce il provider:** L'intero stack tecnologico, dall'hardware alle licenze software, dalla manutenzione dell'applicazione ai database.\n* **Cosa gestisce il cliente:** Solo l'accesso degli utenti, le configurazioni d'uso elementari e la protezione/classificazione dei dati immessi nell'applicazione.\n* **Esempi:** Microsoft 365, Google Workspace, Salesforce.\n* **Implicazioni di Sicurezza:** Il cliente ha un controllo minimo o nullo sulla sicurezza dell'applicazione stessa, dovendosi fidare delle certificazioni di terze parti del provider (es. SOC 2, ISO 27001). Deve perÃ² applicare forti policy di autenticazione (MFA, password complesse) per proteggere gli account.\n\n* **Piccolo Esempio Concentrato:** Un'azienda adotta Microsoft 365 (**SaaS**) per la posta elettronica. L'amministratore IT dell'azienda non puÃ² modificare le impostazioni di sicurezza dei server di posta di Microsoft, ma configura l'autenticazione a piÃ¹ fattori (MFA) obbligatoria per tutti i dipendenti per evitare accessi non autorizzati alle caselle.",
        examTip: "Anche nel modello SaaS, la responsabilitÃ  ultima sui dati aziendali, sulla loro classificazione e sulla governance degli accessi rimane interamente del cliente."
      },
      {
        name: "Shared Responsibility Model",
        checklistKey: "SharedResponsibilityCloud",
        definition: "Il framework fondamentale del cloud computing che delinea chiaramente quali controlli di sicurezza spettano al provider e quali al cliente.",
        details: "Il principio cardine distingue tra:\n* **Sicurezza DEL Cloud (del Provider):** Protezione fisica dei datacenter, infrastruttura hardware globale, hypervisor di virtualizzazione, sicurezza dei servizi nativi forniti.\n* **Sicurezza NEL Cloud (del Cliente):** Protezione dei dati memorizzati, crittografia (lato client e lato server), patch dei sistemi operativi guest, gestione delle identitÃ  e degli accessi (IAM), regole dei firewall software, sicurezza del codice dell'app.\n* **Ripartizione dinamica:** La linea di demarcazione si sposta verso l'alto man mano che si passa da IaaS, a PaaS, fino a SaaS.\n\n* **Piccolo Esempio Concentrato:** In conformitÃ  con il **Shared Responsibility Model**, se un server di database ospitato in cloud viene violato perchÃ© l'amministratore IT ha lasciato aperta a tutti la porta di accesso senza password, la colpa ricade sul cliente (sicurezza 'nel' cloud), non sul provider cloud che garantisce l'alimentazione e la sicurezza fisica del datacenter.",
        examTip: "Ricorda che la sicurezza fisica dell'hardware e la sicurezza dei data center fisici rimangono sempre ed esclusivamente sotto la responsabilitÃ  del Cloud Provider."
      },
      {
        name: "Responsibility matrix",
        checklistKey: "ResponsibilityMatrixConcept",
        definition: "Un documento formale che definisce chiaramente i ruoli e le responsabilitÃ  di sicurezza, conformitÃ  e operative tra le diverse parti coinvolte in un accordo di servizio cloud (come il provider, il cliente e l'utente finale). Non Ã¨ un modello architetturale.",
        details: "La matrice delle responsabilitÃ  (spesso mappata tramite modelli RACI) chiarifica chi deve gestire, approvare o supervisionare ciascun aspetto in un ambiente cloud. Ãˆ uno strumento cruciale per evitare lacune di sicurezza causate da malintesi su chi debba applicare una specifica patch, monitorare i log o gestire i backup.",
        examTip: "Ricorda che la Responsibility Matrix NON Ã¨ un modello di architettura, ma un documento contrattuale e operativo che mappa chi Ã¨ responsabile di quali controlli di sicurezza e operativi nel cloud."
      },
      {
        name: "Monolithic",
        checklistKey: "MonolithicArchitecture",
        definition: "Architettura Monolitica: Un modello di sviluppo software in cui l'intera applicazione (interfaccia utente, logica di business e accesso ai dati) Ã¨ progettata ed eseguita come un unico programma coeso ed indivisibile.",
        details: "Caratteristiche delle architetture monolitiche:\n* **Singolo blocco:** Tutto il codice risiede in un'unica base di codice ed Ã¨ compilato/distribuito insieme su un unico server o cluster.\n* **SemplicitÃ  iniziale:** Facile da sviluppare, testare e distribuire inizialmente per piccoli progetti.\n* **Sfide di sicurezza:** Se un attaccante riesce a sfruttare una singola debolezza nel codice dell'interfaccia utente, ottiene immediatamente l'accesso all'intero monolito, inclusi i dati sensibili, in quanto l'applicazione gira con lo stesso set di permessi del sistema operativo.\n* **Svantaggi operativi:** Difficile da scalare orizzontalmente (occorre replicare l'intero monolito) e vulnerabile a interruzioni globali (un singolo bug puÃ² mandare in crash l'intera applicazione).",
        examTip: "Nelle architetture monolitiche (Monolithic), la compromissione di un singolo componente dell'applicazione espone l'intero sistema alla violazione a causa della mancanza di confini logici e isolamento dei processi."
      },
      {
        name: "Microservices",
        checklistKey: "MicroservicesArchitecture",
        definition: "Architettura a Microservizi: Un approccio architetturale in cui un'applicazione complessa Ã¨ suddivisa in una collezione di piccoli servizi indipendenti, decentralizzati e debolmente accoppiati.",
        details: "Vantaggi e requisiti dei microservizi:\n* **Isolamento dei processi:** Ciascun microservizio esegue una funzione aziendale specifica (es. carrello, autenticazione, pagamenti), possiede il proprio database dedicato e comunica tramite API leggere.\n* **Robustezza di sicurezza:** Se un microservizio (es. catalogo prodotti) viene compromesso, l'attaccante Ã¨ isolato all'interno di quel microservizio e non ha accesso diretto al microservizio dei pagamenti o degli utenti, mitigando il movimento laterale.\n* **ScalabilitÃ  indipendente:** Consente di scalare orizzontalmente solo i singoli servizi che ne hanno bisogno.\n* **ComplessitÃ :** Introduce sfide complesse di rete, gestione di token di autenticazione e necessitÃ  di ispezione API.",
        examTip: "L'architettura a Microservizi (Microservices) riduce il raggio di impatto (blast radius) di una compromissione, garantendo che il fallimento o la violazione di un servizio non si propaghi automaticamente agli altri."
      },
      {
        name: "API",
        checklistKey: "APIArchitecture",
        definition: "Application Programming Interface: Insieme di definizioni e protocolli che consentono a diversi moduli software o microservizi di comunicare, scambiarsi dati e integrarsi tra loro in modo strutturato e sicuro.",
        details: "Il ruolo delle API nelle architetture moderne:\n* **Interscambio dati:** Costituiscono il tessuto connettivo dei microservizi e delle applicazioni cloud, tipicamente implementate tramite protocolli REST (JSON su HTTPS) o gRPC.\n* **Superficie d'attacco:** Rappresentano un bersaglio primario per gli attaccanti (es. attacchi OWASP API Security, come credenziali rubate o consumo di risorse non limitato per assenza di rate limiting).\n* **Protezione delle API:** Richiedono l'uso rigoroso di chiavi API (API Keys), token di autenticazione robusti (come OAuth/JWT), crittografia del transito (TLS) e soluzioni di API Gateway con rate limiting per prevenire abusi e attacchi DoS.",
        examTip: "Le API espongono funzionalitÃ  programmatiche all'esterno: per proteggerle, Ã¨ fondamentale applicare crittografia del canale (HTTPS), autenticazione tramite token (JWT/OAuth) e filtri di limitazione del traffico (Rate Limiting)."
      },
      {
        name: "Serverless",
        checklistKey: "ServerlessArchitecture",
        definition: "Architettura Serverless: Un modello di esecuzione cloud in cui il cloud provider gestisce interamente l'allocazione delle risorse di calcolo e l'esecuzione del codice on-demand, sollevando lo sviluppatore da qualsiasi gestione dei server.",
        details: "Caratteristiche dell'architettura Serverless:\n* **Nessun server da gestire:** L'astrazione dell'infrastruttura Ã¨ completa. Non ci sono macchine virtuali da configurare, aggiornare o proteggere con patch a livello di OS.\n* **ScalabilitÃ  automatica gestita dal provider:** Il sistema scala istantaneamente e dinamicamente da zero a migliaia di esecuzioni contemporanee in base al traffico effettivo. Non Ã¨ perÃ² una scalabilitÃ  *infinita*: ogni provider impone quote di concorrenza e limiti di durata per singola esecuzione, che vanno conosciuti e monitorati.\n* **Pagamento al consumo:** I costi sono calcolati esclusivamente sul tempo di esecuzione effettivo (al millisecondo) e sul numero di richieste, eliminando i costi di idle (server accesi ma inutilizzati).\n* **Servizi associati:** Non comprende solo il calcolo (FaaS, come AWS Lambda), ma anche database serverless (es. DynamoDB), storage di oggetti (es. S3) e code di messaggistica.",
        examTip: "L'architettura Serverless elimina la necessitÃ  di installare patch del sistema operativo guest, trasferendo questo onere interamente sul cloud provider e ridefinendo la matrice di responsabilitÃ  condivisa."
      },
      {
        name: "Hypervisor",
        checklistKey: "HypervisorConcept",
        definition: "Hypervisor (o Virtual Machine Monitor - VMM): Il software di base, firmware o hardware che crea, esegue e gestisce le macchine virtuali (VM), controllando l'allocazione e l'isolamento delle risorse fisiche sottostanti.",
        details: "Tipologie fondamentali di Hypervisor:\n* **Type 1 (Bare-Metal):** Gira direttamente sull'hardware fisico dell'host senza un sistema operativo sottostante. Ãˆ la soluzione piÃ¹ sicura, performante ed efficiente utilizzata nei data center aziendali e nel cloud. Esempi: VMware ESXi, Microsoft Hyper-V, KVM.\n* **Type 2 (Hosted):** Gira come un'applicazione all'interno di un sistema operativo host preesistente. Meno performante e meno sicuro, ideale per ambienti di sviluppo locali. Esempi: VirtualBox, VMware Workstation.\n* **Rischio VM Escape:** La minaccia di sicurezza piÃ¹ grave per un hypervisor, in cui un attaccante all'interno di una macchina virtuale ospite riesce a sfruttare una vulnerabilitÃ  dell'hypervisor per uscire dall'ambiente isolato della VM ed eseguire codice sul sistema host o sulle altre VM co-locate.",
        examTip: "L'Hypervisor di Tipo 1 (Bare-metal) offre prestazioni superiori e un isolamento di sicurezza piÃ¹ robusto rispetto al Tipo 2, poichÃ© elimina la superficie d'attacco associata a un sistema operativo host intermedio."
      },
      {
        name: "Virtual Machine (VM)",
        checklistKey: "VirtualMachineConcept",
        definition: "Macchina Virtuale: L'emulazione software completa di un computer fisico che esegue un sistema operativo guest e le relative applicazioni in modo del tutto indipendente su risorse hardware condivise.",
        details: "Caratteristiche e vantaggi delle VM:\n* **Isolamento completo:** Ogni VM dispone del proprio kernel di sistema operativo completo, di una partizione di memoria RAM, di spazio di storage virtuale e di CPU virtuali (vCPU) che l'hypervisor schedula sui core fisici condivisi con le altre VM.\n* **Consolidamento hardware:** Consente di far girare decine di server diversi (Linux, Windows) sullo stesso server fisico hardware, ottimizzando l'uso delle risorse.\n* **PortabilitÃ :** Le VM possono essere facilmente salvate sotto forma di file (formato OVA/OVF), replicate, copiate e spostate tra host diversi.",
        examTip: "Le Macchine Virtuali (VM) offrono il massimo livello di isolamento software per i workload in esecuzione, poichÃ© ciascun ambiente esegue un kernel di sistema operativo totalmente indipendente."
      },
      {
        name: "Guest OS",
        checklistKey: "GuestOSConcept",
        definition: "Sistema Operativo Ospite (Guest): Il sistema operativo installato ed eseguito all'interno di una macchina virtuale o di una partizione logica gestita da un hypervisor.",
        details: "La sicurezza del Guest OS nell'infrastruttura:\n* **Indipendenza del kernel:** Il Guest OS agisce come se avesse a disposizione hardware fisico dedicato, ignorando la presenza di altre VM co-locate sullo stesso host.\n* **ResponsabilitÃ  del cliente:** Nel modello cloud IaaS, il patching, l'hardening delle policy locali, l'installazione di antivirus e la configurazione del firewall locale del Guest OS sono di esclusiva competenza dell'utente/cliente, non del cloud provider.\n* **Esempi:** Un server Windows Server 2022 o una distribuzione Ubuntu Linux eseguiti come VM all'interno di un host ESXi.",
        examTip: "La sicurezza e l'aggiornamento (patching) del sistema operativo ospite (Guest OS) all'interno di macchine virtuali in cloud ricadono interamente sotto la responsabilitÃ  del cliente/utente."
      },
      {
        name: "Host OS",
        checklistKey: "HostOSConcept",
        definition: "Sistema Operativo Ospitante (Host): Il sistema operativo principale che gira direttamente sull'hardware fisico di un server o computer, responsabile di ospitare hypervisor di tipo 2 o motori di containerizzazione.",
        details: "Il ruolo dell'Host OS nella sicurezza complessiva:\n* **Punto unico di controllo:** Fornisce i servizi di sistema di base, la gestione dei driver hardware e l'accesso fisico alle risorse della macchina.\n* **VulnerabilitÃ  critica:** Se l'Host OS viene compromesso, tutti i container (Docker) o le macchine virtuali hosted (Type 2) in esecuzione su di esso vengono compromessi istantaneamente, poichÃ© l'attaccante ottiene l'accesso al kernel o al sistema di memorizzazione fisica sottostante.\n* **Hardening obbligatorio:** Richiede un monitoraggio estremamente rigoroso dei log, la rimozione di software superfluo e il patching continuo del kernel dell'Host OS.",
        examTip: "Nelle architetture basate su container (come Docker), il sistema operativo ospitante (Host OS) condivide il proprio kernel con tutti i container eseguiti su di esso, rendendo la sua protezione l'elemento cardine della sicurezza dell'intero server."
      },
      {
        name: "Container",
        checklistKey: "ContainerConcept",
        definition: "Container: Una tecnologia di virtualizzazione leggera a livello di sistema operativo che consente di impacchettare un'applicazione e tutte le sue dipendenze (librerie, file di configurazione) in un'unica immagine isolata ed eseguibile.",
        details: "Caratteristiche dei Container rispetto alle VM:\n* **Condivisione del Kernel:** A differenza delle macchine virtuali, i container non includono un intero sistema operativo ospite; condividono invece il kernel del sistema operativo Host, isolandosi a livello software tramite costrutti del kernel (come namespaces e cgroups su Linux).\n* **Efficienza e leggerezza:** Hanno dimensioni di pochi megabyte, si avviano in frazioni di secondo e consumano pochissima memoria RAM/CPU rispetto alle VM.\n* **Rischio Container Escape:** La minaccia di sicurezza in cui un attaccante riesce a sfruttare una vulnerabilitÃ  locale del kernel condiviso o una cattiva configurazione dei privilegi del container per 'evadere' e acquisire l'accesso con privilegi di root sull'Host OS.",
        examTip: "I container forniscono una virtualizzazione leggera condividendo il kernel del sistema operativo Host, il che li rende molto efficienti ma con un livello di isolamento di sicurezza inferiore rispetto alle macchine virtuali tradizionali."
      },
      {
        name: "Docker",
        checklistKey: "DockerConcept",
        definition: "Docker: La piattaforma open-source e il runtime di containerizzazione piÃ¹ diffuso a livello globale, utilizzato per creare, distribuire ed eseguire applicazioni all'interno di container standardizzati.",
        details: "La sicurezza e il funzionamento di Docker:\n* **Docker Engine:** Il daemon di sistema che gestisce l'intero ciclo di vita dei container, delle immagini, delle reti virtuali e dei volumi di storage sull'Host OS.\n* **Docker Registry:** Database pubblici o privati (come Docker Hub) utilizzati per archiviare e scaricare le immagini dei container. Le immagini caricate da terze parti sconosciute possono contenere malware o vulnerabilitÃ  preinstallate (richiedono strumenti di ispezione e scansione di sicurezza delle immagini).\n* **Best Practice di Sicurezza:**\n  - Non eseguire mai i processi del container con l'utente `root`.\n  - Eseguire la scansione automatizzata delle immagini (Vulnerability Scanning) per rilevare librerie software vulnerabili prima della distribuzione.\n  - Configurare le risorse in sola lettura (Read-Only Root Filesystem) ove possibile per bloccare modifiche ostili al container in esecuzione.",
        examTip: "Per proteggere gli ambienti Docker, applica sempre il principio del least privilege configurando i container per girare con utenti non root e scansiona le immagini per rilevare vulnerabilitÃ  prima del deployment."
      },
      {
        name: "Cost",
        checklistKey: "CostCloud",
        definition: "Costo di Sicurezza e Infrastruttura: La valutazione economica complessiva (Total Cost of Ownership - TCO) associata alla progettazione, implementazione, gestione e manutenzione delle misure di sicurezza e delle risorse IT.",
        details: "L'analisi dei costi di sicurezza prevede:\n* **Bilanciamento di sicurezza:** Il costo di implementazione di un controllo di sicurezza non dovrebbe mai superare il valore monetario dell'asset che si intende proteggere.\n* **TCO (Total Cost of Ownership):** Include i costi di acquisto di software/hardware, licenze annuali, formazione dei dipendenti, consumo energetico, condizionamento e costi del personale specializzato per la gestione.\n* **Transizione economica:** Il passaggio al cloud ristruttura completamente la gestione dei costi dell'organizzazione, sostituendo le grandi spese in conto capitale iniziali (CapEx) con un modello di spese operative ricorrenti (OpEx) basate sul consumo reale.",
        examTip: "La pianificazione finanziaria della sicurezza richiede di calcolare il ritorno sull'investimento (ROI) dei controlli e garantire che il costo delle contromisure sia proporzionato al valore degli asset protetti."
      },
      {
        name: "CAPEX",
        checklistKey: "CAPEXCloud",
        definition: "Capital Expenditure (Spese in Conto Capitale): I fondi e gli investimenti iniziali a lungo termine impiegati da un'organizzazione per acquistare, aggiornare e mantenere asset fisici tangibili come server, storage, hardware di rete e infrastrutture di data center.",
        details: "Caratteristiche del CapEx in ambito IT:\n* **Investimento iniziale pesante:** Richiede l'esborso immediato di ingenti capitali finanziari prima ancora che il servizio o l'applicazione siano operativi.\n* **Ammortamento e deprezzamento:** L'hardware acquistato costituisce un bene aziendale che si svaluta nel tempo (tipicamente in 3-5 anni).\n* **Tipico del modello On-premises:** L'acquisto di condizionatori industriali, generatori a gasolio, switch di rete fisici, recinzioni e server fisici ricade interamente sotto la classificazione CapEx.",
        examTip: "La costruzione e l'allestimento di un data center fisico on-premises privato costituisce una classica spesa in conto capitale (CapEx) a causa dell'ingente investimento hardware iniziale richiesto."
      },
      {
        name: "OPEX",
        checklistKey: "OPEXCloud",
        definition: "Operational Expenditure (Spese Operative): I costi correnti e continui associati alla gestione ordinaria del business e dell'infrastruttura IT quotidiana, pagati su base ricorrente.",
        details: "Caratteristiche dell'OpEx in ambito IT:\n* **Modello a consumo:** I servizi vengono pagati sotto forma di canoni mensili, abbonamenti o fatturati in base alle risorse effettivamente consumate al minuto o all'ora.\n* **FlessibilitÃ  e scalabilitÃ :** Consente all'organizzazione di aumentare o ridurre le risorse IT istantaneamente in base alle esigenze di mercato, pagando solo per ciÃ² che serve realmente (pay-as-you-go).\n* **Tipico del Cloud Computing:** Le spese per l'utilizzo di istanze cloud IaaS (es. AWS Lambda o macchine virtuali EC2), l'abbonamento a servizi SaaS (es. Microsoft 365) e il canone di connettivitÃ  internet rientrano interamente sotto la classificazione OpEx.",
        examTip: "Il Cloud Computing trasforma la gestione finanziaria dell'IT aziendale spostando i costi da grandi spese iniziali in conto capitale (CapEx) a spese operative correnti flessibili e ricorrenti (OpEx)."
      },
      {
        name: "Infrastructure as Code (IaC)",
        checklistKey: "IaCArchitecture",
        definition: "La pratica di definire e provisionare l'infrastruttura (reti, macchine virtuali, regole di firewall, permessi) attraverso file di configurazione versionati, anzichÃ© mediante configurazione manuale da console.",
        details: "L'**Infrastructure as Code** Ã¨ una voce esplicita dell'obiettivo 3.1 e cambia il modo in cui la sicurezza viene applicata all'infrastruttura.\n* **Il principio:** l'infrastruttura diventa un artefatto di codice. Si scrive un file (Terraform, CloudFormation, Ansible) che descrive lo stato desiderato, e lo strumento lo realizza.\n* **Vantaggi di sicurezza:** configurazioni **ripetibili e identiche** fra ambienti (niente 'in produzione era configurato diversamente'), revisione tra pari prima dell'applicazione, cronologia completa delle modifiche in Git, possibilitÃ  di scansionare la configurazione alla ricerca di errori *prima* che l'infrastruttura esista, e ripristino rapido dopo un disastro rieseguendo il codice.\n* **Contrasta il configuration drift:** poichÃ© lo stato desiderato Ã¨ dichiarato, ogni deviazione manuale Ã¨ rilevabile e correggibile riapplicando il codice.\n* **Il rovescio della medaglia:** un errore nel codice si replica istantaneamente su tutta l'infrastruttura; e un segreto scritto in chiaro in un file IaC finisce nella cronologia del repository, dove resta anche dopo essere stato rimosso.\n\n* **Piccolo Esempio Concentrato:** Un team deve replicare l\'ambiente di produzione per i test. Invece di ricreare a mano 40 risorse (con il rischio di dimenticare una regola di firewall), esegue lo stesso file Terraform con un parametro diverso: l\'ambiente di test nasce identico a quello di produzione, comprese tutte le impostazioni di sicurezza.",
        examTip: "All'esame, l'IaC Ã¨ la risposta quando lo scenario chiede **coerenza e ripetibilitÃ ** delle configurazioni o come contrastare il *configuration drift*. Ricorda le due regole d'oro: i segreti non si scrivono MAI nei file IaC (si usano vault o servizi di secret management) e il codice IaC va sottoposto a scansione di sicurezza esattamente come il codice applicativo."
      }
    ]
  },
  {
    title: "2. Network Security (Obj 3.2)",
    description: "Architettura e protocolli di sicurezza di rete, tunneling crittografato e gestione centralizzata degli accessi.",
    icon: "Lock",
    subtopics: [
      /* --- 1. MODELLO OSI (OSI MODEL) --- */
      {
        name: "Layer 1",
        checklistKey: "Layer1Physical",
        definition: "Layer 1 (Physical Layer): Il primo livello del modello OSI, responsabile della trasmissione e della ricezione di flussi di bit non strutturati su un mezzo fisico (cavi, segnali radio, fibra ottica).",
        details: "Caratteristiche principali:\n* **UnitÃ  di dati:** Bit.\n* **Funzione:** Definisce le specifiche elettriche, meccaniche, ottiche e funzionali del mezzo fisico, inclusi i livelli di tensione, la piedinatura dei connettori, i tipi di cavo e le frequenze wireless.\n* **Dispositivi tipici:** Hub, ripetitori, cavi di rete (UTP/fibra), transceiver, schede di rete (a livello fisico).\n* **Nessun filtraggio:** Non possiede alcuna intelligenza logica per analizzare indirizzi MAC, IP o porte.",
        examTip: "All'esame, ricorda che il Layer 1 (Physical Layer) si occupa esclusivamente della trasmissione fisica dei bit sui cavi o frequenze radio, senza alcuna visibilitÃ  logica sui dati."
      },
      {
        name: "Layer 2",
        checklistKey: "Layer2DataLink",
        definition: "Layer 2 (Data Link Layer): Il secondo livello del modello OSI responsabile del trasferimento affidabile dei dati attraverso il mezzo fisico, gestendo frame e indirizzi MAC.",
        details: "Caratteristiche principali:\n* **UnitÃ  di dati:** Gestisce i frame (o fotogrammi).\n* **Indirizzamento fisico:** Utilizza gli indirizzi MAC (Media Access Control) per identificare in modo univoco i dispositivi sulla stessa rete locale (LAN).\n* **Dispositivi tipici:** Gli switch di rete operano tipicamente a questo livello, instradando i frame verso la porta specifica basandosi sulla tabella dei MAC address (CAM table).\n* **Protocolli:** Ethernet, Wi-Fi (802.11), PPP e ARP (che mappa IP a MAC).",
        examTip: "All'esame, ricorda che il Layer 2 del modello OSI gestisce i frame e gli indirizzi MAC, e che gli switch tradizionali operano a questo livello."
      },
      {
        name: "Layer 3",
        checklistKey: "Layer3Network",
        definition: "Layer 3 (Network Layer): Il terzo livello del modello OSI, focalizzato principalmente sull'indirizzamento logico, sull'instradamento (routing) dei dati e sulla frammentazione dei pacchetti tra reti diverse.",
        details: "Caratteristiche principali:\n* **UnitÃ  di dati:** Gestisce i pacchetti.\n* **Indirizzamento logico:** Utilizza gli indirizzi IP (IPv4 e IPv6) per identificare i dispositivi attraverso reti geograficamente distanti.\n* **Dispositivi tipici:** I router operano a questo livello per determinare il percorso migliore (routing) che i dati devono seguire per raggiungere la destinazione finale.\n* **Protocolli:** IP, ICMP, IPSec, IGMP.",
        examTip: "Il Layer 3 (Network Layer) si occupa dell'indirizzamento logico IP e del routing dei pacchetti attraverso reti differenti, con i router come dispositivi principali."
      },
      {
        name: "Layer 4",
        checklistKey: "Layer4Transport",
        definition: "Layer 4 (Transport Layer): Il quarto livello del modello OSI, responsabile del trasferimento affidabile e trasparente dei dati tra host di origine e destinazione, gestendo i numeri di porta e la comunicazione orientata alla connessione.",
        details: "Caratteristiche principali:\n* **Protocolli chiave:** TCP (Transmission Control Protocol, affidabile e orientato alla connessione) e UDP (User Datagram Protocol, non affidabile e senza connessione).\n* **Numeri di porta:** Utilizza le porte (es. porta 80 per HTTP, 443 per HTTPS) per identificare specifiche applicazioni o servizi sui dispositivi di destinazione.\n* **Dispositivi e filtraggio:** Gli apparati di rete che operano a questo livello (come i firewall tradizionali o i bilanciatori di carico L4) filtrano e gestiscono il traffico basandosi sugli indirizzi IP di origine/destinazione e sui relativi numeri di porta.",
        examTip: "Il Layer 4 si occupa dei protocolli TCP/UDP, dei numeri di porta e della comunicazione orientata alla connessione. I dispositivi che operano a questo livello gestiscono il traffico basandosi su IP e porte."
      },
      {
        name: "Layer 5",
        checklistKey: "Layer5Session",
        definition: "Layer 5 (Session Layer): Il quinto livello del modello OSI, responsabile di stabilire, mantenere, sincronizzare e terminare le sessioni di connessione tra le applicazioni in esecuzione su dispositivi diversi.",
        details: "Caratteristiche e limiti:\n* **Funzione principale:** Gestisce il dialogo tra le applicazioni (meccanismi di controllo del dialogo, full-duplex, half-duplex) e inserisce checkpoint per riprendere la trasmissione in caso di interruzioni.\n* **Nessun filtraggio IP/Porte:** A differenza dei livelli inferiori (Layer 3 e Layer 4), il Layer 5 non si occupa di instradare pacchetti o di filtrare il traffico in base a indirizzi IP e numeri di porta.\n* **Protocolli associati:** NetBIOS, RPC (Remote Procedure Call), PPTP, SOCKS.",
        examTip: "All'esame, ricorda che il Layer 5 (Session Layer) stabilisce e termina le connessioni applicative tra dispositivi, ma NON gestisce il filtraggio basato su IP o numeri di porta."
      },
      {
        name: "Layer 6",
        checklistKey: "Layer6Presentation",
        definition: "Layer 6 (Presentation Layer): Il sesto livello del modello OSI, responsabile della traduzione, formattazione, cifratura e compressione dei dati per garantirne la corretta interpretazione da parte del livello applicativo.",
        details: "Caratteristiche principali:\n* **Funzioni chiave:**\n  - *Traduzione:* Converte i dati tra diversi formati di rappresentazione (es. da EBCDIC ad ASCII).\n  - *Cifratura e Decifratura:* Gestisce la crittografia (come la cifratura dei dati a livello applicativo o i protocolli SSL/TLS storicamente associati a questo livello).\n  - *Compressione:* Riduce la dimensione dei file per ottimizzare la trasmissione.\n* **Formati tipici:** JPEG, GIF, PNG, MP3, MPEG, ASCII, Unicode, TLS/SSL (funzione).",
        examTip: "Il Layer 6 (Presentation Layer) si occupa di 'come' i dati sono presentati e formattati, inclusi i processi di crittografia applicativa, compressione e traduzione dei caratteri."
      },
      {
        name: "Layer 7",
        checklistKey: "Layer7Application",
        definition: "Layer 7 (Application Layer): Il settimo e ultimo livello del modello OSI, che fornisce un'interfaccia diretta tra le applicazioni software dell'utente e i servizi di rete sottostanti.",
        details: "Caratteristiche principali:\n* **Funzione:** Consente ai programmi (browser web, client email, client FTP) di interagire con la rete. Gestisce l'autenticazione dell'utente, l'identificazione dei partner di comunicazione e la disponibilitÃ  delle risorse.\n* **Dispositivi e ispezione:** Gli apparati di sicurezza avanzati come i Next-Generation Firewall (NGFW) e i Web Application Firewall (WAF) operano fino a questo livello tramite la Deep Packet Inspection (DPI).\n* **Protocolli chiave:** HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH, Telnet, POP3, IMAP.",
        examTip: "All'esame, il Layer 7 (Application Layer) Ã¨ il livello piÃ¹ vicino all'utente finale. I dispositivi che analizzano il traffico applicativo (come WAF e NGFW) operano a questo livello per bloccare attacchi complessi come SQL Injection."
      },

      /* --- 2. DISPOSITIVI E APPARATI DI RETE (NETWORK DEVICES) --- */
      {
        name: "Routers",
        checklistKey: "RoutersConcept",
        definition: "Dispositivi di rete operanti a livello di rete (Layer 3 del modello OSI), responsabili dell'instradamento (routing) dei pacchetti di dati tra reti differenti e della corretta direzione del traffico su Internet.",
        details: "I router collegano reti distinte (ad esempio, la LAN locale dell'ufficio con la WAN esterna di Internet) e instradano i dati esaminando l'indirizzo IP di destinazione all'interno di ciascun pacchetto rispetto alle proprie tabelle di routing dinamiche o statiche. Sebbene possano essere configurati con regole di controllo degli accessi (ACL) e con meccanismi di Network Address Translation (NAT) per mappare indirizzi privati in IP pubblici, il loro scopo fondamentale Ã¨ la connettivitÃ  di rete e l'instradamento logico dei pacchetti, e non nascondono intrinsecamente l'origine delle richieste allo stesso livello di un proxy applicativo.",
        examTip: "La funzione **caratterizzante** del router Ã¨ al **Layer 3**: indirizzamento logico IP e instradamento fra reti diverse. **Attenzione perÃ² a non leggerlo come un limite invalicabile:** un router reale applica anche **ACL** che filtrano su porte TCP/UDP, cioÃ¨ informazioni di **Layer 4**, e svolge NAT. All'esame, se la domanda chiede il livello a cui il router *opera principalmente*, la risposta Ã¨ 3; se chiede se possa filtrare per porta, la risposta Ã¨ sÃ¬."
      },
      {
        name: "Proxy server",
        checklistKey: "ProxyServerConcept",
        definition: "Un server intermediario posizionato fra il client e il server di destinazione: il client non contatta piÃ¹ direttamente la risorsa, ma passa dal proxy, che inoltra la richiesta per suo conto e ne restituisce la risposta.",
        details: "Il proxy server agisce come relay. Riceve le richieste dei client interni destinate a Internet e le inoltra ai server remoti utilizzando il proprio indirizzo IP pubblico. Questo processo maschera l'indirizzo IP interno del client originario â€” effetto tecnico del passaggio, non lo scopo per cui il proxy viene messo in azienda, che Ã¨ il **controllo**: filtrare, ispezionare, registrare e applicare le policy da un punto unico. Consente inoltre di eseguire la memorizzazione nella cache (caching) delle risorse web per ottimizzare le prestazioni, oltre a facilitare il filtraggio dei contenuti e l'ispezione di sicurezza del traffico in uscita.",
        examTip: "**In azienda un proxy non serve all'anonimato, serve al controllo.** PoichÃ© tutto il traffico passa da un punto solo, quel punto puÃ² **filtrare** per categoria e reputazione, **ispezionare** i contenuti, **registrare** chi ha visitato che cosa, applicare **DLP** e, con la TLS inspection, guardare dentro l'HTTPS. Il mascheramento dell'indirizzo di origine Ã¨ una conseguenza tecnica del passaggio, non il suo scopo.\n* **Le due direzioni, da non confondere:** il **forward proxy** sta davanti ai *client* e controlla ciÃ² che esce; il **reverse proxy** sta davanti ai *server* e protegge ciÃ² che entra, con bilanciamento del carico, terminazione TLS e spesso funzioni di WAF. **Trappola d'esame:** se lo scenario parla di applicare policy di navigazione e avere un registro unico per piÃ¹ sedi, Ã¨ un forward proxy o un Secure Web Gateway; se parla di proteggere e bilanciare un'applicazione pubblicata, Ã¨ un reverse proxy."
      },
      {
        name: "Jump server",
        checklistKey: "JumpServerConcept",
        definition: "Un server blindato (hardened) e altamente sicuro utilizzato dagli amministratori di sistema come punto di ingresso obbligatorio e controllato per connettersi e gestire dispositivi situati in una zona di sicurezza diversa o piÃ¹ protetta.",
        details: "Il jump server (noto anche come bastion host) facilita l'accesso amministrativo sicuro a un ambiente isolato (ad esempio, una DMZ o una rete di produzione interna). Gli amministratori si connettono prima al jump server tramite un protocollo sicuro (come SSH o RDP con autenticazione a piÃ¹ fattori) e, da lÃ¬, possono effettuare un secondo collegamento ('salto') verso i server di destinazione interni. Non Ã¨ progettato per fungere da proxy generico o per inoltrare e mascherare la navigazione internet quotidiana degli utenti finali.",
        examTip: "Il Jump server serve esclusivamente a facilitare e controllare l'accesso amministrativo sicuro a reti protette, a differenza di un proxy server che Ã¨ progettato per mascherare e inoltrare le richieste generali dei client verso internet."
      },
      {
        name: "NAC",
        checklistKey: "NACNet",
        definition: "Network Access Control: Soluzione di sicurezza hardware/software che controlla e limita l'accesso fisico o logico alla rete aziendale.",
        details: "Funzionamento e requisiti:\n* **Posture Assessment (Valutazione della postura):** Quando un dispositivo tenta di connettersi alla rete, il NAC esamina lo stato di sicurezza dell'host (presenza di un antivirus attivo, patch del sistema operativo aggiornate, firewall abilitato).\n* **Agent-based vs Agentless:** PuÃ² utilizzare un software installato sul dispositivo (Agent) o eseguire controlli web-based senza installazione (Agentless).\n* **Quarantena:** Se il dispositivo fallisce il controllo di postura, il NAC ne limita l'accesso reindirizzandolo in una VLAN di quarantena dedicata, consentendo solo l'accesso ai server di update per aggiornare l'host prima di riammetterlo.\n\n* **Piccolo Esempio Concentrato:** Un consulente esterno collega il proprio portatile alla porta ethernet della sala riunioni. Il sistema **NAC** rileva che l'antivirus del portatile non Ã¨ aggiornato da mesi e lo confina immediatamente in una VLAN di quarantena, impedendogli l'accesso ai server di produzione aziendali.",
        examTip: "Il NAC previene l'ingresso di dispositivi vulnerabili, infetti o non conformi nella rete aziendale interna, isolandoli istantaneamente in una VLAN correttiva."
      },
      {
        name: "IDS solution",
        checklistKey: "IDSSolutionConcept",
        definition: "Intrusion Detection System (IDS): Dispositivo o software di sicurezza passivo che monitora il traffico di rete o le attivitÃ  di sistema alla ricerca di comportamenti dannosi o violazioni delle policy, generando avvisi (alert) per gli amministratori.",
        details: "Gli IDS si dividono principalmente in:\n* **NIDS (Network-based IDS):** Analizzano i pacchetti di rete che transitano su un segmento LAN (spesso tramite porte SPAN o TAP fisici) per identificare pattern di attacco.\n* **HIDS (Host-based IDS):** Installati sui singoli endpoint (server o workstation) per monitorare log locali, chiamate di sistema e modifiche ai file critici.\n* **Metodologie di rilevamento:**\n  - *Signature-based:* Confrontano il traffico con un database di firme note d'attacco.\n  - *Anomaly-based:* Rilevano deviazioni anomale rispetto a una baseline di comportamento precedentemente appresa tramite algoritmi statistici.\n\n* **Piccolo Esempio Concentrato:** Un amministratore riceve una notifica in tempo reale dal sistema **NIDS** della rete. L'IDS ha identificato un flusso continuo di pacchetti contenenti la firma nota di un tentativo di exploit SSH, consentendo al team di sicurezza di indagare tempestivamente sull'host di origine.",
        examTip: "Un IDS Ã¨ uno strumento **passivo** (out-of-band, alimentato da una porta SPAN o da un TAP) che rileva e notifica senza interrompere il traffico, a differenza di un **IPS** che sta **in-line** e puÃ² scartare i pacchetti. **Il caso limite che le domande usano:** ciÃ² che distingue i due non Ã¨ il prodotto ma il **posizionamento** e la **configurazione**. Quasi tutti gli IPS commerciali possono essere messi in **modalitÃ  di sola rilevazione**, e in quel caso si comportano da IDS; viceversa un IPS collegato a una porta SPAN **non blocca nulla**, perchÃ© il traffico non lo attraversa. Se lo scenario chiede chi puÃ² **fermare** l'attacco, cerca il dispositivo **in linea** con il traffico, non il nome sull'etichetta."
      },
      {
        name: "IPS",
        checklistKey: "IPS_New",
        definition: "Intrusion Prevention System: dispositivo di sicurezza di rete attivo posizionato in-line che monitora il traffico per bloccare le minacce in tempo reale.",
        details: "Caratteristiche:\n* **In-line:** Ãˆ posizionato fisicamente nel percorso del traffico, permettendogli di bloccare le minacce scartando i pacchetti prima che colpiscano la vittima.\n* **Ispezione:** Utilizza firme (signatures), euristiche e analisi di anomalie per rilevare attacchi e traffico dannoso.\n* **Differenza con IDS:** L'IDS Ã¨ passivo (riceve solo una copia del traffico) e invia avvisi; l'IPS Ã¨ attivo e interviene bloccando le connessioni.",
        examTip: "L'IPS sta **in-line** e puÃ² bloccare in tempo reale; l'IDS osserva una copia del traffico e si limita ad avvisare. **Due conseguenze che l'esame verifica.** Primo: essendo in linea, l'IPS Ã¨ un **potenziale punto di guasto** e un **falso positivo diventa un disservizio**, perchÃ© scarta traffico legittimo â€” per questo molte installazioni partono in sola rilevazione e passano al blocco solo dopo aver tarato le regole. Secondo: un IPS puÃ² essere **configurato per non bloccare**, e allora Ã¨ un IDS a tutti gli effetti. La domanda da porsi non Ã¨ Â«che prodotto Ã¨Â» ma Â«il traffico ci passa dentro, e il dispositivo Ã¨ autorizzato a scartarlo?Â»."
      },
      {
        name: "Passive mode",
        checklistKey: "PassiveMode_New",
        definition: "Una modalitÃ  operativa in cui un sistema di sicurezza (es. IDS o scanner) monitora e analizza il traffico passivamente senza interferire o bloccare.",
        details: "Dettagli:\n* **Out-of-band:** Il dispositivo passivo riceve una copia speculare del traffico di rete tramite un TAP fisico o una porta SPAN (Mirror Port) dello switch.\n* **Nessun impatto:** Non introduce alcuna latenza nella rete aziendale e, in caso di guasto del sensore, non interrompe la connettivitÃ .\n* **Limitazione:** PuÃ² solo generare allarmi o registrare log d'attivitÃ  per l'analisi successiva, ma non puÃ² bloccare attivamente l'attacco in corso.",
        examTip: "La modalitÃ  passiva (Passive mode o out-of-band) consente a sistemi come l'IDS di analizzare una copia del traffico senza introdurre latenza o punti di guasto nella rete di produzione."
      },

      /* --- 3. CONNESSIONI E PROTOCOLLI DI SICUREZZA (SECURE TUNNELING) --- */
      {
        name: "IPSec",
        checklistKey: "IPSecNet",
        definition: "Internet Protocol Security: Una suite di protocolli di rete standardizzati che cifra e autentica i pacchetti IP a livello Layer 3 del modello OSI.",
        details: "La suite si compone di tre elementi fondamentali:\n* **AH (Authentication Header):** Fornisce integritÃ  dei dati, autenticazione dell'origine del pacchetto e protezione anti-replay. **NON fornisce cifratura** (i dati rimangono in chiaro).\n* **ESP (Encapsulating Security Payload):** Fornisce cifratura dei dati (riservatezza) oltre all'autenticazione dell'origine e all'integritÃ .\n* **IKE (Internet Key Exchange):** Protocollo utilizzato per negoziare le associazioni di sicurezza (SA) e scambiare le chiavi crittografiche.\n* **ModalitÃ  d'uso:**\n  - *Transport Mode:* Cifra solo il payload del pacchetto IP (l'intestazione IP originale rimane in chiaro). Usata tipicamente da host a host.\n  - *Tunnel Mode:* Cifra l'intero pacchetto IP originale e ne aggiunge uno nuovo esterno. Usata tipicamente per VPN Site-to-Site.\n\n* **Piccolo Esempio Concentrato:** Per connettere in modo sicuro due datacenter, gli ingegneri configurano un tunnel IPSec abilitando **ESP in Tunnel Mode** per crittografare interamente ogni pacchetto IP in transito, nascondendo anche gli IP originali dei server interni di backend.",
        examTip: "Se all'esame ti viene chiesta l'integritÃ  del traffico senza riservatezza, la risposta Ã¨ AH. Se ti viene chiesta anche la riservatezza, serve ESP."
      },
      {
        name: "TLS",
        checklistKey: "TLSNet",
        definition: "Transport Layer Security: Il protocollo crittografico che cifra e autentica le comunicazioni al di sopra del livello di trasporto (tra il Layer 4 e il Layer 7 del modello OSI, tradizionalmente collocato ai Layer 5-6), sostituendo lo storico e ormai insicuro SSL (Secure Sockets Layer).",
        details: "Caratteristiche e applicazioni:\n* **Funzionamento:** Cifra e protegge i dati in transito su reti non sicure stabilendo canali di comunicazione sicuri basati su crittografia asimmetrica per la fase di handshake e simmetrica per la trasmissione dei dati.\n* **HTTPS (porta 443):** Applicazione primaria di TLS applicata al protocollo web HTTP.\n* **Certificati digitali:** Utilizza certificati X.509 firmati da un'AutoritÃ  di Certificazione (CA) per garantire l'identitÃ  del server prima dell'instaurazione del canale protetto.\n\n* **Piccolo Esempio Concentrato:** Quando un utente accede al proprio portale di home banking, il browser stabilisce una sessione **TLS 1.3** contrassegnata dall'indicatore di connessione sicura del browser e dal protocollo HTTPS, cifrando la password e il codice OTP prima di trasmetterli su Internet.",
        examTip: "SSL non deve piÃ¹ essere utilizzato a causa di gravi vulnerabilitÃ  (es. POODLE); l'esame richiede rigorosamente l'uso delle versioni TLS moderne (TLS 1.2 o TLS 1.3). Attenzione alla trappola: TLS NON Ã¨ un protocollo di Layer 4 (quello Ã¨ TCP); TLS si appoggia a TCP e opera al di sopra di esso."
      },
      {
        name: "SSH",
        checklistKey: "SSHNet",
        definition: "Secure Shell: Un protocollo crittografico utilizzato per stabilire sessioni remote di terminale a riga di comando (CLI) cifrate e sicure sulla porta TCP 22.",
        details: "Caratteristiche principali:\n* **Sostituto sicuro:** Rimpiazza direttamente Telnet (porta 23) e rlogin, i quali trasmettono le credenziali d'accesso e i comandi di testo in chiaro sulla rete.\n* **Autenticazione avanzata:** Oltre a supportare l'autenticazione tramite password, supporta l'autenticazione asimmetrica tramite chiavi pubbliche/private, eliminando la necessitÃ  di digitare credenziali in chiaro.\n* **Port Forwarding (Tunneling SSH):** Consente di incapsulare e cifrare altri protocolli di rete insicuri all'interno di una sessione SSH.\n\n* **Piccolo Esempio Concentrato:** Un sistemista si collega a un server remoto Linux usando l'utilitÃ  PuTTY su porta 22 tramite un tunnel **SSH** protetto da chiavi asimmetriche RSA a 4096 bit, evitando l'invio in chiaro del comando di reboot.",
        examTip: "L'hardening di una porta SSH richiede di disabilitare l'autenticazione tramite password (Password Authentication No) ed imporre solo chiavi crittografiche, oltre a vietare il login diretto all'utente 'root' (PermitRootLogin No)."
      },
      {
        name: "VPN",
        checklistKey: "VPNNet",
        definition: "Virtual Private Network: Una connessione sicura e cifrata stabilita su una rete pubblica (es. Internet) per unire un dispositivo remoto alla rete aziendale.",
        details: "Caratteristiche e tipologie:\n* **Scopo:** Consente ai lavoratori remoti o alle filiali di accedere in sicurezza alle risorse interne della intranet aziendale.\n* **Remote Access (Client-to-Site):** Consente a un singolo utente di connettersi temporaneamente tramite un client VPN (software) installato sul proprio computer.\n* **Split Tunneling vs Full Tunneling:**\n  - *Full Tunneling:* Tutto il traffico di rete viene instradato attraverso la VPN aziendale. Offre massima sicurezza e visibilitÃ  dei log, ma richiede molta banda.\n  - *Split Tunneling:* Solo il traffico destinato alla rete aziendale passa attraverso il tunnel; il traffico Internet generico esce localmente.\n\n* **Piccolo Esempio Concentrato:** Un dipendente lavora da casa e attiva l'app Cisco AnyConnect (**VPN**) configurata in *Full Tunneling*: da quel momento, anche se l'utente naviga su Facebook o Google, tutto il traffico attraversa la rete aziendale permettendo all'IDS aziendale di ispezionarlo.",
        examTip: "Il Full Tunneling garantisce che tutti i controlli di sicurezza aziendali vengano applicati a tutto il traffico dell'utente, anche a quello internet ordinario, mentre lo split tunneling puÃ² esporre l'host a minacce locali."
      },
      {
        name: "Site-to-Site VPN",
        checklistKey: "SiteToSiteVPNNet",
        definition: "Una connessione VPN permanente utilizzata per unire due o piÃ¹ reti intere dislocate geograficamente in modo sicuro.",
        details: "Caratteristiche principali:\n* **Funzionamento:** Invece di richiedere che ogni singolo computer installi un client VPN, la connessione viene stabilita direttamente tra due gateway o router VPN dedicati situati nelle rispettive sedi (es. sede centrale e filiale periferica).\n* **Trasparenza:** Ãˆ del tutto trasparente per gli utenti finali della rete locale, che comunicano con l'altra sede come se fossero nella stessa stanza.\n* **Protocollo standard:** Implementata quasi esclusivamente utilizzando la suite di protocolli IPSec per garantire massima sicurezza ed efficienza a livello layer 3.\n\n* **Piccolo Esempio Concentrato:** La sede di Milano e la filiale di Roma di un'azienda sono collegate da una **Site-to-Site VPN** basata su IPSec configurata sui rispettivi router Cisco di frontiera. Un dipendente a Roma stampa un file su una stampante di Milano inserendo l'IP locale `10.0.1.50` in modo del tutto trasparente.",
        examTip: "La Site-to-Site VPN Ã¨ progettata per connettere in modo stabile intere reti distanti tramite gateway dedicati, senza l'uso di software client sui singoli PC."
      },
      {
        name: "VPN gateway",
        checklistKey: "VPNGateway_New",
        definition: "Un dispositivo o servizio di rete dedicato che stabilisce, gestisce e termina le connessioni VPN per un'organizzazione.",
        details: "Caratteristiche:\n* **Punto di Terminazione:** Riceve le connessioni provenienti da client remoti (Client-to-Site) o da altri gateway remoti (Site-to-Site).\n* **Cifratura e Decifratura:** Gestisce i complessi calcoli crittografici necessari per decifrare il traffico in ingresso e cifrare quello in uscita.\n* **Integrazione AAA:** Spesso integrato con sistemi RADIUS o Active Directory per verificare le credenziali e l'MFA degli utenti remoti prima di concedere l'accesso.",
        examTip: "Il VPN gateway centralizza la gestione dei tunnel cifrati e la decrittografia del traffico remoto prima di immetterlo nella rete locale privata dell'azienda."
      },
      {
        name: "VPN Concentrator",
        checklistKey: "VPNConcentratorConcept",
        definition: "Un dispositivo hardware dedicato ad alte prestazioni progettato specificamente per gestire e concentrare un numero elevatissimo di tunnel VPN simultanei.",
        details: "Caratteristiche e compiti:\n* **Alte Prestazioni:** Integra processori crittografici dedicati per scaricare la CPU dei server o dei router ordinari (Hardware Acceleration) dal pesante calcolo della crittografia di migliaia di sessioni.\n* **Remote Access scalabile:** Utilizzato tipicamente nelle grandi aziende per gestire la connettivitÃ  di migliaia di dipendenti remoti in smart working simultaneamente.\n* **Sicurezza:** Fornisce autenticazione forte, integrazione con directory centralizzate (RADIUS/LDAP/Active Directory) e assegnazione dinamica degli indirizzi IP interni ai client connessi.",
        examTip: "All'esame, quando viene richiesto un dispositivo hardware dedicato specifico in grado di scalare e supportare migliaia di connessioni VPN simultanee dei dipendenti remoti, la risposta corretta Ã¨ il VPN Concentrator."
      },
      {
        name: "SSL/TLS VPN",
        checklistKey: "SSLTLSTunnelVPNConcept",
        definition: "Un tipo di VPN ad accesso remoto che utilizza il protocollo standard SSL/TLS (solitamente tramite browser web o client leggero) per stabilire connessioni sicure sulla porta TCP 443.",
        details: "Vantaggi principali:\n* **Nessun client pesante:** Consente l'accesso sicuro alle risorse aziendali (spesso tramite un portale web) senza richiedere l'installazione e la configurazione di software client VPN proprietari complessi.\n* **FacilitÃ  di transito:** PoichÃ© utilizza la porta TCP 443 (lo stesso traffico HTTPS standard), riesce a transitare facilmente attraverso quasi tutti i firewall e proxy pubblici che bloccherebbero i protocolli IPSec.\n* **Accesso Granulare (Portal-based o Tunnel-based):** PuÃ² essere configurata per dare accesso solo a specifiche applicazioni web aziendali (Portal mode) anzichÃ© all'intera sottorete interna (Tunnel mode), riducendo i rischi di sicurezza.",
        examTip: "La SSL/TLS VPN Ã¨ la scelta ottimale per consentire ad utenti esterni o dispositivi personali (BYOD) di accedere ad applicazioni web interne in modo sicuro senza dover preinstallare un software client specifico sul computer."
      },
      {
        name: "IPSec Tunnel vs. Transport Mode",
        checklistKey: "IPSecTunnelTransportModes",
        definition: "Le due differenti modalitÃ  operative con cui il protocollo IPSec protegge e incapsula i pacchetti di dati a livello di rete.",
        details: "Le differenze chiave sono:\n* **Tunnel Mode (ModalitÃ  Tunnel):** Protegge l'intero pacchetto IP originale. Cifra sia il payload (dati) sia le intestazioni IP originali (sorgente/destinazione), inserendo il pacchetto risultante in un nuovo pacchetto IP esterno con nuove intestazioni. Ãˆ lo standard obbligatorio per le VPN Site-to-Site ed Ã¨ estremamente sicuro perchÃ© nasconde la topologia di rete interna.\n* **Transport Mode (ModalitÃ  Trasporto):** Cifra e protegge esclusivamente il payload del pacchetto IP originale. L'intestazione IP sorgente/destinazione iniziale rimane visibile in chiaro durante il transito. Viene utilizzata tipicamente per comunicazioni dirette host-to-host all'interno di una stessa rete locale protetta.",
        examTip: "La modalitÃ  Tunnel cifra l'intero pacchetto IP originario (incluso l'header IP) ed Ã¨ la scelta standard per le VPN Site-to-Site, mentre la modalitÃ  Trasporto cifra solo il payload e mantiene intatto l'header IP originale."
      },

      /* --- 4. SICUREZZA DELLE RETI WIRELESS (WIRELESS SECURITY) --- */
      {
        name: "PSK",
        checklistKey: "PSKConcept",
        definition: "Pre-Shared Key: ModalitÃ  di autenticazione wireless (nota come modalitÃ  Personal) in cui tutti i dispositivi client condividono la stessa identica chiave o password segreta preconfigurata sull'access point.",
        details: "Caratteristiche e limiti della PSK:\n* **SemplicitÃ :** Ideale per scenari domestici o piccole reti d'ufficio (SOHO), poichÃ© non richiede un server di autenticazione dedicato.\n* **Limiti di Sicurezza:** Se un dipendente si licenzia, possiede ancora la chiave PSK e puÃ² connettersi abusivamente dall'esterno dell'ufficio. Per ripristinare la sicurezza, la chiave deve essere modificata manualmente su tutti i dispositivi rimasti nell'organizzazione.\n* **Esposizione ad attacchi:** Sotto WPA2-PSK, l'intercettazione dell'handshake iniziale a 4 vie consente attacchi brute-force offline sui dizionari delle password.",
        examTip: "Per le reti aziendali enterprise, evita l'uso della PSK statica e implementa l'autenticazione basata su server RADIUS (802.1X / WPA Enterprise) per revocare gli accessi in modo centralizzato e individuale."
      },
      {
        name: "WEP",
        checklistKey: "WEPConcept",
        definition: "Wired Equivalent Privacy: Il primo protocollo di sicurezza wireless introdotto dallo standard IEEE 802.11 nel 1997, oggi completamente deprecato e considerato altamente insicuro.",
        details: "VulnerabilitÃ  strutturali di WEP:\n* **Cifratura Debole:** Utilizza l'algoritmo di cifratura a flusso RC4 con un vettore di inizializzazione (IV) di soli 24 bit trasmesso in chiaro.\n* **IV Replay:** A causa della ridotta lunghezza dell'IV, in una rete con traffico medio gli IV si ripetono rapidamente. Un attaccante puÃ² catturare passivamente questi pacchetti e ricostruire la chiave segreta WEP in pochi minuti utilizzando software gratuiti.\n* **Mancanza di IntegritÃ  Forte:** Utilizza un algoritmo CRC-32 (Checksum) per verificare l'integritÃ , il quale Ã¨ vulnerabile a manipolazioni dei pacchetti senza che l'errore venga rilevato (bit-flipping).",
        examTip: "All'esame, WEP deve essere sistematicamente evitato in qualsiasi contesto poichÃ© Ã¨ vulnerabile alla decrittografia immediata a causa della debolezza del vettore di inizializzazione (IV) e dell'uso di RC4."
      },
      {
        name: "WPA",
        checklistKey: "WPAWirelessConcept",
        definition: "Wi-Fi Protected Access: Un protocollo di sicurezza wireless intermedio introdotto nel 2003 come misura correttiva d'emergenza per sostituire WEP senza richiedere la sostituzione dell'hardware esistente.",
        details: "Caratteristiche di WPA:\n* **TKIP (Temporal Key Integrity Protocol):** Sostituisce la chiave statica di WEP con chiavi dinamiche che cambiano per ogni singolo pacchetto, sebbene utilizzi ancora l'algoritmo RC4 sottostante.\n* **MIC (Message Integrity Check):** Introduce un algoritmo di verifica dell'integritÃ  dei frame piÃ¹ forte (chiamato Michael) per contrastare la manipolazione dei dati, al posto del debole CRC-32 di WEP.\n* **Sostituzione:** Trattandosi di una soluzione ponte, Ã¨ stata presto superata da WPA2 (che impone AES e CCMP) e dal moderno standard WPA3.",
        examTip: "WPA Ã¨ stato progettato come un aggiornamento firmware temporaneo per i vecchi dispositivi WEP, introducendo TKIP per sanare le falle di cifratura statica."
      },
      {
        name: "TKIP",
        checklistKey: "TKIPConcept",
        definition: "Temporal Key Integrity Protocol: Algoritmo di cifratura wireless introdotto con WPA per sanare le vulnerabilitÃ  del protocollo WEP senza richiedere l'acquisto di nuovo hardware.",
        details: "Funzionamento di TKIP:\n* **Chiavi Dinamiche:** Genera una chiave di cifratura a 128 bit differente per ciascun pacchetto dati trasmesso, impedendo la violazione immediata tipica del WEP.\n* **RC4 Legacy:** Pur ruotando le chiavi, TKIP si appoggia ancora sul cifrario a flusso RC4. Di conseguenza, Ã¨ stato dichiarato deprecato ed Ã¨ oggi interamente sostituito da CCMP/AES.\n\n* **Piccolo Esempio Concentrato:** Una vecchia stampante wireless di rete supporta solo WEP o **WPA-TKIP**. Per aumentarne la sicurezza senza sostituirla fisicamente, l'amministratore attiva WPA-TKIP: il protocollo implementa la rotazione temporanea delle chiavi impedendo gli attacchi automatici che affliggono WEP.",
        examTip: "TKIP risolve il problema della chiave statica di WEP ruotandola dinamicamente ad ogni pacchetto, ma rimane insicuro poichÃ© si basa sull'algoritmo RC4."
      },
      {
        name: "MIC",
        checklistKey: "MICConcept",
        definition: "Message Integrity Check: Algoritmo di controllo dell'integritÃ  dei messaggi introdotto con il protocollo TKIP (WPA) per prevenire attacchi di manomissione o alterazione dei pacchetti wireless.",
        details: "Il funzionamento di MIC (algoritmo Michael):\n* **Prevenzione Manomissione:** Calcola sul payload dei frame wireless un valore di integritÃ  (MIC) dipendente da una chiave segreta â€” non Ã¨ una funzione di hash crittografica in senso stretto, ma un algoritmo volutamente leggero per girare sull'hardware WEP esistente â€” che consente di confermare che il pacchetto non sia stato modificato in transito da un attaccante (es. tramite attacchi di bit-flipping).\n* **Contromisure attive:** Se l'access point rileva due errori MIC entro 60 secondi, presume un attacco in corso, disconnette tutti i client e sospende le trasmissioni per un minuto per mitigare l'intrusione.",
        examTip: "Il MIC garantisce l'integritÃ  dei dati nei frame wireless TKIP, impedendo agli attaccanti di alterare o contraffare i pacchetti in transito."
      },
      {
        name: "WPA3",
        checklistKey: "WPA3Net",
        definition: "Wi-Fi Protected Access 3: Il protocollo di sicurezza wireless moderno che sostituisce WPA2 per la protezione delle reti Wi-Fi.",
        details: "Le novitÃ  principali di WPA3 includono:\n* **SAE (Simultaneous Authentication of Equals):** Sostituisce l'handshake basato sulla chiave precondivisa statica (PSK) di WPA2. Impedisce gli attacchi a dizionario *offline* che partono dalla cattura passiva dell'handshake: con SAE il materiale catturato non consente di provare le password candidate fuori linea.\n* **Cifratura individualizzata dei dati:** Protegge gli utenti anche sulle reti Wi-Fi aperte tramite la cifratura wireless opportunistica (OWE - Opportunistic Wireless Encryption).\n* **WPA3-Enterprise:** Richiede l'autenticazione centralizzata 802.1X con server RADIUS e rende obbligatoria la protezione dei frame di gestione (PMF). Prevede inoltre una modalitÃ  *opzionale* a 192 bit allineata alla suite CNSA, pensata per ambienti governativi e della difesa: non Ã¨ il comportamento predefinito.\n\n* **Piccolo Esempio Concentrato:** In un ufficio viene configurata una rete Wi-Fi protetta da **WPA3-Personal**: anche se la password di accesso Ã¨ semplice, un attaccante nel parcheggio che cattura passivamente l'handshake radio non puÃ² lanciare attacchi brute-force offline per decifrare le sessioni degli altri dipendenti, grazie al protocollo **SAE**.",
        examTip: "SAE Ã¨ la tecnologia chiave introdotta in WPA3 che elimina la vulnerabilitÃ  di WPA2 agli attacchi di intercettazione passiva e decifratura offline delle password Wi-Fi."
      },
      {
        name: "WPA2",
        checklistKey: "WPA2Net",
        definition: "Wi-Fi Protected Access 2: Il protocollo di sicurezza wireless basato sull'algoritmo di cifratura simmetrica AES e sul protocollo CCMP per garantire riservatezza e integritÃ  alle comunicazioni Wi-Fi.",
        details: "Caratteristiche e vulnerabilitÃ :\n* **AES & CCMP:** Utilizza il cifrario robusto AES con CCMP (Counter Mode con Cipher Block Chaining Message Authentication Code Protocol) che sostituisce interamente il vulnerabile TKIP.\n* **Handshake a 4 vie:** Implementa la negoziazione iniziale delle chiavi di sessione. In modalitÃ  Personal Ã¨ esposta all'attacco a dizionario *offline*: chi cattura passivamente l'handshake puÃ² provare le password candidate sul proprio computer, senza piÃ¹ alcun contatto con la rete. * **Attenzione a non confondere:** **KRACK** (Key Reinstallation Attack, 2017) Ã¨ un problema diverso e non ricava la password; forza la reinstallazione di una chiave giÃ  in uso azzerando il nonce, e si corregge con le patch di client e access point.\n* **ModalitÃ  d'Uso:** Supporta sia la versione Personal (con chiave precondivisa PSK comune a tutti) sia la versione Enterprise (autenticazione centralizzata individuale via 802.1X/RADIUS).",
        examTip: "WPA2 utilizza AES-CCMP per garantire una crittografia solida, ma rimane vulnerabile al brute-forcing offline dell'handshake a 4 vie se si impiega una password Personal semplice."
      },
      {
        name: "GCMP",
        checklistKey: "GCMPConcept",
        definition: "Galois/Counter Mode Protocol: Un protocollo di cifratura wireless avanzato utilizzato in WPA3 per garantire sia la riservatezza che l'integritÃ  dei dati tramite la crittografia autenticata.",
        details: "Caratteristiche principali:\n* **Crittografia Autenticata (AEAD):** Fornisce contemporaneamente cifratura (tramite AES-GCM) e autenticazione dei dati in un unico passaggio computazionale.\n* **Parallelizzazione:** A differenza di CCMP (usato in WPA2 e nella modalitÃ  di base di WPA3) che Ã¨ sequenziale, GCMP consente l'elaborazione parallela dei dati, offrendo throughput significativamente maggiori e minore latenza sui dispositivi moderni.\n* **Sicurezza robusta:** Riduce la vulnerabilitÃ  ad attacchi di replay e manipolazione fine dei pacchetti radio.",
        examTip: "GCMP (basato su AES-GCM) Ã¨ il cifrario della **modalitÃ  a 192 bit di WPA3-Enterprise**, dove GCMP-256 Ã¨ obbligatorio, e offre parallelizzazione e throughput superiori al CCMP di WPA2. **Attenzione a non generalizzare:** WPA3-Personal e WPA3-Enterprise nella modalitÃ  di base continuano a usare **CCMP-128**, esattamente come WPA2. All'esame, GCMP Ã¨ la risposta quando lo scenario nomina la suite rafforzata a 192 bit o ambienti governativi e della difesa, non ogni volta che compare la parola WPA3."
      },
      {
        name: "SAE",
        checklistKey: "SAEConcept",
        definition: "Simultaneous Authentication of Equals: Un metodo sicuro di accordo di chiave (handshake Dragonfly) utilizzato in WPA3-Personal che sostituisce la chiave precondivisa (PSK) per proteggere dalle intercettazioni e dagli attacchi offline.",
        details: "Funzionamento di SAE:\n* **Dragonfly Handshake:** Si basa su uno scambio di chiavi Diffie-Hellman a curva ellittica. Elimina la vulnerabilitÃ  di WPA2 all'intercettazione passiva dei pacchetti d'accesso iniziale.\n* **Zero Offline Dictionary Attacks:** Un utente malintenzionato che cattura i frame di autenticazione non puÃ² lanciare attacchi brute-force offline contro la password Wi-Fi, poichÃ© ogni sessione genera chiavi uniche e indipendenti.\n* **Perfect Forward Secrecy (PFS):** Se una chiave viene compromessa in futuro, questa non puÃ² essere usata per decifrare il traffico intercettato nel passato.",
        examTip: "SAE Ã¨ la tecnologia chiave introdotta in WPA3-Personal che impedisce ad attaccanti dotati di sniffer radio di acquisire l'handshake e decifrare le password offline."
      },
      {
        name: "Open System",
        checklistKey: "OpenSystemConcept",
        definition: "Sistemi Aperti (Open System): Una configurazione wireless in cui non Ã¨ richiesta alcuna credenziale o chiave crittografica per connettersi all'Access Point, lasciando la trasmissione radio non cifrata o protetta da OWE.",
        details: "Caratteristiche e Rischi:\n* **Zero Autenticazione:** Chiunque nel raggio radio puÃ² associarsi all'access point senza fornire password (es. Wi-Fi degli hotel o degli aeroporti).\n* **VulnerabilitÃ  allo Sniffing:** PoichÃ© i dati transitano in chiaro nell'aria, gli attaccanti possono facilmente intercettare il traffico di altri utenti tramite packet sniffer.\n* **OWE (Opportunistic Wireless Encryption):** L'evoluzione sicura introdotta con WPA3 che permette una cifratura wireless individuale per ciascun client, trasparente e attiva anche in assenza di password d'accesso, proteggendo gli utenti dall'intercettazione passiva.",
        examTip: "Nelle reti aperte tradizionali (Open System) il traffico radio non Ã¨ protetto; l'adozione di OWE (WPA3) permette di cifrare la comunicazione pur mantenendo l'accesso libero senza password."
      },
      {
        name: "WPA3-Personal",
        checklistKey: "WPA3PersonalRes",
        definition: "WPA3-Personal: La modalitÃ  di protezione wireless di WPA3 progettata per reti domestiche o piccoli uffici, che impiega il protocollo SAE per proteggere lo scambio delle chiavi.",
        details: "Caratteristiche:\n* **SemplicitÃ  d'Uso:** Richiede una sola password segreta (passphrase) per tutti gli utenti, come il vecchio WPA2-Personal.\n* **Sicurezza Rivoluzionaria:** Grazie a SAE, protegge gli utenti deboli che scelgono password semplici, eliminando gli attacchi di dizionario offline.",
        examTip: "WPA3-Personal sostituisce WPA2-Personal introducendo SAE, che rende **impraticabile l'attacco a dizionario offline**: chi cattura l'handshake non ottiene piÃ¹ materiale su cui provare password a piacere, perchÃ© ogni tentativo richiede una nuova interazione con la rete. La password debole resta comunque attaccabile online, ma a un ritmo enormemente piÃ¹ lento e rilevabile."
      },
      {
        name: "WPA3-Enterprise",
        checklistKey: "WPA3EnterpriseRes",
        definition: "WPA3-Enterprise: la modalitÃ  di protezione wireless di WPA3 destinata alle organizzazioni, che richiede l'autenticazione individuale tramite 802.1X con un server RADIUS centralizzato e prevede, in opzione, una suite crittografica rafforzata a 192 bit.",
        details: "Caratteristiche:\n* **Suite a 192 bit (opzionale):** WPA3-Enterprise prevede una modalitÃ  rafforzata allineata alla CNSA, con cifratura a 192 bit, destinata ad ambienti governativi e della difesa. **Non Ã¨ il comportamento predefinito**: la modalitÃ  Enterprise di base non la impone.\n* **Integrazione 802.1X:** Richiede credenziali personali o certificati digitali gestiti da Active Directory tramite server RADIUS.\n* **MFP (Management Frame Protection) Obbligatorio:** Cifra e protegge i frame di gestione wireless da attacchi di disassociazione e deautenticazione fasulla.",
        examTip: "**CiÃ² che definisce la modalitÃ  Enterprise Ã¨ l'identitÃ  individuale**, non la forza della cifratura: ogni utente si autentica con proprie credenziali o con un certificato verso un server **RADIUS**, quindi l'accesso si revoca per singola persona senza cambiare nulla sugli altri. Ãˆ la differenza sostanziale rispetto alla modalitÃ  Personal, dove la chiave Ã¨ condivisa da tutti.\n* **Due precisazioni tecniche:** la suite a **192 bit** Ã¨ una **modalitÃ  opzionale** di WPA3-Enterprise (allineata alla CNSA), non il comportamento predefinito; e WPA3 impone la **protezione dei frame di gestione (PMF)**, che Ã¨ ciÃ² che blocca gli attacchi di deautenticazione â€” quelli che su WPA2 funzionano anche con una passphrase robustissima, perchÃ© i frame di gestione non erano autenticati."
      },
      {
        name: "Wi-Fi & Bluetooth",
        checklistKey: "WiFiBluetoothTech",
        definition: "Wi-Fi (IEEE 802.11) e Bluetooth (IEEE 802.15.1): Tecnologie radio per la connettivitÃ  a medio e corto raggio.",
        details: "Specifiche e differenze:\n* **Wi-Fi (802.11):** Progettato per stabilire reti locali (WLAN) ad alta velocitÃ  su bande a 2.4 GHz, 5 GHz e 6 GHz. Supporta robusti meccanismi di cifratura ed Ã¨ il canale primario per collegare host e computer aziendali.\n* **Bluetooth (802.15.1):** Standard radio a bassissimo consumo e corto raggio (PAN - Personal Area Network) operante a 2.4 GHz per connettere periferiche (es. cuffie, tastiere, sensori sanitari). Se lasciato in modalitÃ  visibile senza PIN di accoppiamento forte, Ã¨ soggetto ad attacchi di furto dati (Bluesnarfing) o spam (Bluejacking).",
        examTip: "Mentre il Wi-Fi (802.11) estende la rete locale a medio raggio con forte sicurezza centralizzata, il Bluetooth crea reti PAN personali a corto raggio vulnerabili ad attacchi locali se non accoppiati in sicurezza."
      },
      {
        name: "Site Survey & Wireless Survey Tools",
        checklistKey: "WirelessSurveyRes",
        definition: "Pianificazione e diagnostica della copertura wireless tramite Site Survey e Mappe di Calore (Heat Map).",
        details: "Strumenti e metodologie:\n* **Site Survey:** L'analisi fisica e radioelettrica degli ambienti di un edificio finalizzata a determinare il numero, il posizionamento ideale e le bande di frequenza degli Access Point, prevenendo le interferenze e limitando l'esondazione del segnale fuori dal perimetro fisico aziendale (signal leakage).\n* **Heat Map (Mappa di calore):** Rappresentazione visiva colorata che illustra graficamente la potenza del segnale Wi-Fi (solitamente verde/rosso per indicare segnale forte/debole) sovrapposta alla planimetria dei locali.\n* **Wireless Survey Tools:** Analizzatori di spettro software/hardware (es. NetSpot, Ekahau, Wi-Fi Analyzer) usati per localizzare canali saturi, trovare zone d'ombra prive di segnale e rilevare Access Point abusivi (Rogue AP) o interferenze esterne (microonde, radar).",
        examTip: "La Site Survey supportata da mappe di calore (Heat Maps) Ã¨ il processo fondamentale per ottimizzare la potenza del segnale wireless, garantendo che questo non esondi eccessivamente all'esterno dell'edificio aziendale."
      },
      {
        name: "RADIUS",
        checklistKey: "RADIUSNet",
        definition: "Remote Authentication Dial-In User Service: Protocollo client/server centralizzato per la gestione AAA (Authentication, Authorization, Accounting) degli accessi di rete.",
        details: "Funzionamento e centralizzazione:\n* **Centralizzazione:** Raccoglie le richieste di autenticazione provenienti da svariati Network Access Server (NAS) come switch, router VPN o access point wireless, e le convalida contro un database di utenti centralizzato (es. Active Directory).\n* **Sicurezza:** Durante la fase di autenticazione, RADIUS cifra solo la password trasmessa tra il client e il server tramite una chiave condivisa (Shared Secret); il resto della comunicazione rimane in chiaro.\n* **Standard 802.1X:** RADIUS Ã¨ la spina dorsale per implementare l'autenticazione wireless e cablata basata su porta (Enterprise Wi-Fi).\n\n* **Piccolo Esempio Concentrato:** Un dipendente si connette alla rete Wi-Fi dell'ufficio inserendo le sue credenziali personali AD; l'Access Point Wi-Fi (**RADIUS Client**) inoltra la richiesta a un server NPS (**RADIUS Server**) centrale che valida l'accesso dell'utente.",
        examTip: "A differenza di TACACS+ (che cifra l'intero corpo dei pacchetti ed Ã¨ ideale per la gestione degli apparati di rete degli amministratori), RADIUS cifra solo la password ed Ã¨ piÃ¹ orientato agli accessi generali degli utenti."
      },
      {
        name: "EAP",
        checklistKey: "EAPProtocol_New",
        definition: "Extensible Authentication Protocol: un framework di autenticazione universale utilizzato per estendere e supportare diversi metodi di verifica su reti cablate e Wi-Fi.",
        details: "Funzionamento e protocolli:\n* **EstensibilitÃ :** Consente l'adozione di svariati metodi di autenticazione (es. password, token hardware, smart card o certificati digitali) senza dover aggiornare gli switch o gli access point fisici della rete.\n* **Varianti Comuni d'Esame:**\n  - **EAP-TLS:** Considerato il piÃ¹ sicuro in assoluto; richiede certificati digitali X.509 sia sul server di autenticazione sia sul dispositivo client (autenticazione reciproca).\n  - **EAP-TTLS:** Richiede un certificato solo sul server, creando un tunnel sicuro entro cui l'utente puÃ² inserire la propria password standard.\n  - **PEAP (Protected EAP):** Sviluppato da Microsoft, Cisco e RSA; incapsula un altro protocollo EAP (solitamente EAP-MSCHAPv2) all'interno di un tunnel TLS sicuro.",
        examTip: "All'esame, ricorda che EAP-TLS Ã¨ la variante EAP piÃ¹ robusta perchÃ© usa certificati digitali su **entrambe le estremitÃ **, ottenendo l'**autenticazione reciproca**: il client prova la propria identitÃ  al server e il server la propria al client, il che neutralizza gli access point civetta. **Attenzione a un errore diffuso:** questa **non Ã¨ MFA dell'utente**. Il certificato del server autentica il *server*, non aggiunge un secondo fattore alla *persona*: entrambi i certificati sono Â«qualcosa che si haÂ». Per avere MFA vera serve un secondo fattore distinto dell'utente, per esempio un PIN o un dato biometrico che sblocchi la chiave privata del client."
      },
      {
        name: "SMTP",
        checklistKey: "SMTPProtocol",
        definition: "Simple Mail Transfer Protocol: Il protocollo standard per la trasmissione, l'invio e il routing delle e-mail su reti IP (porta standard TCP 25 per server-to-server, 587 per client-to-server).",
        details: "Caratteristiche e limiti di sicurezza:\n* **Protocollo in chiaro:** SMTP originario inviava tutte le comunicazioni e le credenziali in chiaro. Oggi viene protetto tramite l'estensione **STARTTLS** (opportunistic TLS) che aggiorna la connessione in chiaro a una cifrata.\n* **Mancanza di autenticazione nativa:** SMTP non possiede meccanismi nativi per verificare che il mittente dichiarato nell'intestazione 'From:' sia reale, rendendo estremamente facile l'email spoofing. Per sanare questa falla sono stati introdotti protocolli correttivi come SPF, DKIM e DMARC.\n\n* **Piccolo Esempio Concentrato:** Connor configura il proprio client di posta aziendale per inviare le e-mail impostando il server **SMTP** sulla porta 587 con cifratura STARTTLS obbligatoria, assicurandosi che le proprie credenziali d'accesso vengano trasmesse in modo sicuro e cifrato.",
        examTip: "SMTP Ã¨ il protocollo predefinito per il trasferimento delle e-mail (porte TCP 25 e 587), che richiede STARTTLS per proteggere le comunicazioni in transito."
      },
      {
        name: "MTA",
        checklistKey: "MTAConcept",
        definition: "Mail Transfer Agent: Il componente software di un server di posta elettronica che riceve, accetta, instrada e trasferisce le e-mail da un computer all'altro utilizzando il protocollo SMTP.",
        details: "Ruolo dell'MTA nell'architettura email:\n* **Instradamento:** Quando viene inviata un'email, l'MTA interroga il server DNS per trovare il record MX (Mail Exchanger) del dominio del destinatario e determinare il server corretto a cui recapitare il messaggio.\n* **Esempi:** Software famosi includono Postfix, Sendmail, Microsoft Exchange Server ed Exim.\n* **Catena di consegna:** L'MTA lavora in sinergia con l'MUA (Mail User Agent, il client di posta) e l'MDA (Mail Delivery Agent, che deposita l'email nella casella finale).\n\n* **Piccolo Esempio Concentrato:** Quando invii un'e-mail dal tuo client, il tuo server di posta locale riceve il messaggio. Il software **MTA** (es. Postfix) analizza l'indirizzo del destinatario, effettua una query DNS MX per localizzare il server di destinazione e invia materialmente il messaggio tramite SMTP.",
        examTip: "L'MTA Ã¨ il software responsabile del trasferimento effettivo e dell'instradamento delle e-mail tra server differenti via SMTP."
      },
      {
        name: "SPF",
        checklistKey: "SPFConcept_New",
        definition: "Sender Policy Framework: Un protocollo di validazione e-mail basato su DNS che consente ai proprietari di un dominio di specificare quali host o indirizzi IP sono autorizzati a inviare e-mail per loro conto.",
        details: "Funzionamento di SPF:\n* **Record DNS TXT:** Il proprietario del dominio pubblica un record DNS TXT contenente la lista dei server autorizzati (es. `v=spf1 ip4:192.168.1.1 include:spf.google.com ~all`).\n* **Verifica del destinatario:** Quando un server riceve un'e-mail, estrae l'IP del server mittente e verifica se Ã¨ presente nel record SPF del dominio dichiarato. Se non Ã¨ presente, il messaggio puÃ² essere contrassegnato come spam o rifiutato.\n* **Limite:** SPF verifica solo l'indirizzo del mittente a livello di busta (Return-Path), non l'indirizzo visualizzato dall'utente finale nell'intestazione 'From:', rendendolo parzialmente aggirabile.\n\n* **Piccolo Esempio Concentrato:** Un hacker tenta di inviare un'e-mail fraudolenta spacciandosi per la ditta `sicurezza.com` utilizzando un proprio server. Il server di posta del destinatario riceve il messaggio, consulta il record **SPF** di `sicurezza.com` nei DNS pubblici e rileva che l'IP del server dell'hacker non Ã¨ autorizzato, bloccando o contrassegnando l'e-mail come phishing.",
        examTip: "SPF aiuta a prevenire l'e-mail spoofing memorizzando nei record DNS TXT del dominio l'elenco dei server e degli indirizzi IP formalmente autorizzati a spedire posta."
      },
      {
        name: "DKIM",
        checklistKey: "DKIMConcept_New",
        definition: "DomainKeys Identified Mail: Un metodo di autenticazione e-mail crittografico che consente a un'organizzazione di firmare digitalmente le e-mail in uscita, garantendo l'integritÃ  delle parti firmate e l'identitÃ  del dominio che ha apposto la firma.",
        details: "Funzionamento di DKIM:\n* **Chiave Privata e Pubblica:** Il server di invio firma l'e-mail (corpo e intestazioni principali) con la chiave privata del dominio, inserendo la firma nell'intestazione dell'e-mail (DKIM-Signature).\n* **Verifica DNS:** Il server destinatario recupera la chiave pubblica corrispondente leggendo il record DNS TXT del dominio indicato nel tag `d=` della firma (il dominio *firmatario*) e convalida la firma.\n* **IntegritÃ  e AutenticitÃ :** Se la firma Ã¨ valida, dimostra che il messaggio Ã¨ stato firmato con la chiave privata del dominio `d=` e che le parti firmate non sono cambiate in transito. **Non dimostra** che quel dominio coincida con quello mostrato all'utente nel campo `From`: a imporre la corrispondenza Ã¨ DMARC, con il requisito di allineamento.\n\n* **Piccolo Esempio Concentrato:** Un'e-mail viene firmata digitalmente dal server SMTP in uscita tramite la chiave privata del dominio. All'arrivo, il server del destinatario esegue la convalida crittografica tramite la chiave pubblica prelevata dal record **DKIM** nel DNS del mittente, accertando che l'e-mail non abbia subito manipolazioni.",
        examTip: "**Che cosa prova DKIM:** che il messaggio Ã¨ stato firmato dalla chiave privata di un certo dominio e che le parti firmate â€” alcune intestazioni e il corpo â€” non sono cambiate dopo la firma. Il destinatario recupera la chiave pubblica da un record DNS del dominio firmatario e verifica.\n* **Che cosa NON prova, ed Ã¨ il punto che l'esame verifica:** che il dominio firmatario sia lo stesso che l'utente **vede** nel campo `From`. Un attaccante puÃ² firmare regolarmente con un proprio dominio un messaggio che mostra il tuo. A imporre la corrispondenza fra i due Ã¨ **DMARC**, con il requisito di **allineamento**.\n* **Un limite pratico:** una lista di distribuzione o un inoltro che modifichi oggetto o corpo invalida la firma, e il messaggio risulta `dkim=fail` pur essendo legittimo. Ãˆ la ragione per cui DMARC accetta il superamento di **SPF oppure** di DKIM, non necessariamente di entrambi."
      },
      {
        name: "DMARC",
        checklistKey: "DMARCConcept_New",
        definition: "Domain-based Message Authentication, Reporting and Conformance: Un protocollo di sicurezza e-mail che unifica SPF e DKIM, consentendo ai proprietari di domini di definire come gestire i messaggi che falliscono l'autenticazione.",
        details: "Funzionamento e policy di DMARC:\n* **Politiche di gestione (Policy):** Consente al proprietario del dominio di pubblicare un record DNS TXT che indica ai server di posta esterni cosa fare con i messaggi fraudolenti che falliscono sia SPF che DKIM. Le tre policy previste sono:\n  - `none`: Nessuna azione (monitoraggio semplice).\n  - `quarantine`: Sposta i messaggi non conformi nella cartella spam/quarantena.\n  - `reject`: Rifiuta e blocca completamente la consegna del messaggio.\n* **Reporting (Rapporti):** I server riceventi inviano report periodici di telemetria al mittente, indicandogli quali indirizzi IP stanno inviando e-mail per suo conto e se passano o falliscono le verifiche.\n\n* **Piccolo Esempio Concentrato:** Per proteggere il proprio brand dal phishing, un'azienda pubblica un record **DMARC** con la policy `p=reject`. Da quel momento, qualsiasi e-mail spoofata che fallisce le verifiche SPF e DKIM viene rifiutata ed eliminata all'istante dai server di posta di tutto il mondo, proteggendo i clienti.",
        examTip: "DMARC estende e coordina SPF e DKIM, fornendo ai proprietari di dominio report sull'uso del brand e definendo regole di blocco (none, quarantine, reject) per i server riceventi in caso di fallimento dei controlli."
      },
      {
        name: "Physical Segmentation",
        checklistKey: "PhysicalSegmentationConcept",
        definition: "Separazione Fisica: Isolare i sistemi e le reti utilizzando cablaggi fisici, switch dedicati ed apparati hardware completamente indipendenti senza alcuna interconnessione elettrica o logica.",
        details: "L'isolamento fisico rappresenta la forma piÃ¹ sicura di segregazione di rete:\n* **Air-gapping:** Consiste nel mantenere una rete completamente scollegata da Internet e da qualsiasi altra rete pubblica o privata, creando un isolamento che nessuna configurazione software puÃ² aggirare, perchÃ© il collegamento semplicemente non esiste. Resta perÃ² aggirabile per **via fisica**: supporti rimovibili, manutenzione, insider â€” Ã¨ cosÃ¬ che Stuxnet ha superato un air gap.\n* **Hardware dedicato:** Utilizzo di switch, cablaggi (rame o fibra) e router dedicati ed esclusivi per ciascuna classe di traffico (es. la rete di videosorveglianza non condivide alcun filo con la rete dei computer aziendali).\n* **Vantaggi:** Immune da vulnerabilitÃ  di configurazione software o da attacchi di VLAN hopping.\n* **Svantaggi:** Costi elevati di installazione e manutenzione, totale mancanza di flessibilitÃ .",
        examTip: "L'isolamento fisico tramite Air-gapping rappresenta il massimo controllo di sicurezza preventivo per la protezione di infrastrutture industriali o militari critiche."
      },
      {
        name: "Air gap",
        checklistKey: "AirGapConcept",
        definition: "Isolamento Fisico Totale: Una misura di sicurezza estrema che consiste nel mantenere un computer, un server o un'intera rete locale completamente isolati da Internet e da qualsiasi altra rete esterna, eliminando ogni tipo di connessione fisica o wireless.",
        details: "L'obiettivo fondamentale dell'Air Gap Ã¨ garantire che non vi sia alcuna possibilitÃ  di comunicazione remota o logica con i sistemi protetti:\n* **Assenza di ConnettivitÃ :** Il sistema non possiede schede di rete collegate, antenne Wi-Fi, Bluetooth o connessioni di telefonia mobile attive.\n* **Trasferimento Dati Controllato (Sneakernet):** PoichÃ© non Ã¨ possibile inviare dati via rete, l'unico modo per trasferire informazioni Ã¨ l'uso manuale di supporti rimovibili fisici (es. chiavette USB o dischi esterni cifrati), preventivamente scansionati e controllati per escludere la presenza di malware.\n* **Ambiti di Applicazione:** Reti militari classificate, centrali nucleari e sistemi industriali critici (SCADA/ICS), server di certificazione PKI principali (Root CA) e sistemi di firma offline per transazioni e chiavi crittografiche (es. cold storage di criptovalute).\n* **VulnerabilitÃ  Residue:** Nonostante l'altissimo livello di sicurezza, un sistema air-gapped puÃ² comunque essere infettato tramite minacce interne (insider threats) o supporti fisici compromessi (es. il celebre attacco Stuxnet tramite chiavetta USB). Esistono inoltre sofisticati attacchi accademici basati su canali laterali (esaltazione acustica delle ventole, vibrazioni, emissioni elettromagnetiche o fluttuazioni di calore) per esfiltrare dati da sistemi vicini.",
        examTip: "L'air gap Ã¨ la scelta per i sistemi ultra-critici â€” controller industriali SCADA, la Root CA di una PKI â€” e ciÃ² che elimina Ã¨ l'**attacco remoto proveniente dalla rete**. **Attenzione a non leggerlo come sicurezza assoluta:** ciÃ² che resta Ã¨ proprio la via per cui questi sistemi vengono violati nella pratica, cioÃ¨ il **supporto rimovibile** che qualcuno deve pur portare dentro per aggiornarli, il **fornitore** che interviene in manutenzione e l'**insider**. **Stuxnet** Ã¨ l'esempio da ricordare: raggiunse impianti air-gapped tramite chiavette USB.\n* **Il costo operativo, che l'esame a volte chiede:** un sistema isolato non riceve patch, firme antivirus nÃ© log centralizzati per la via ordinaria. L'air gap va quindi accompagnato da una procedura formale per i supporti rimovibili, da controlli di sicurezza fisica e dalla raccolta manuale dei log, altrimenti diventa un sistema non aggiornato e non sorvegliato."
      },
      {
        name: "Logical Segmentation",
        checklistKey: "LogicalSegmentationConcept",
        definition: "Segmentazione Logica: Suddividere una singola infrastruttura di rete fisica in molteplici segmenti logici indipendenti e protetti utilizzando configurazioni software, VLAN, sottoreti e regole di firewall.",
        details: "La segmentazione logica consente di isolare il traffico senza la necessitÃ  di raddoppiare l'hardware fisico:\n* **FlessibilitÃ :** Consente di riorganizzare i reparti e le zone di sicurezza con semplici modifiche alle configurazioni dello switch o del firewall.\n* **Contenimento dell'attacco:** Limita il movimento laterale di un malware o di un attaccante; se un host nella VLAN ospiti viene compromesso, le ACL sul firewall impediscono la propagazione verso la VLAN server.\n* **Tecnologie:** Si realizza tipicamente tramite Virtual LAN (VLAN), sottoreti IP (Subnetting) e Access Control List (ACL).",
        examTip: "La segmentazione logica (Logical Segmentation) Ã¨ la strategia ottimale all'esame per ridurre il raggio di un attacco (blast radius) e impedire il movimento laterale all'interno della rete aziendale."
      },
      {
        name: "VLAN",
        checklistKey: "VLANConcept",
        definition: "Virtual Local Area Network: Tecnologia a livello di collegamento dati (Layer 2) che permette di creare piÃ¹ reti locali logiche e isolate sullo stesso switch fisico.",
        details: "Caratteristiche e funzionamento:\n* **Isolamento di Broadcast:** Riduce il traffico di broadcast limitandolo esclusivamente all'interno della singola VLAN.\n* **Tagging (802.1Q):** Lo switch contrassegna i frame Ethernet con un ID di VLAN (VLAN Tag) per instradarli correttamente tra switch diversi attraverso le porte 'Trunk'.\n* **VLAN di Default (Default VLAN):** Tipicamente la VLAN 1. Ãˆ considerata una grave debolezza di sicurezza lasciare porte attive nella default VLAN, in quanto espone ad attacchi di VLAN Hopping (in cui un attaccante invia frame con tag doppi per scavalcare il limite della propria VLAN).\n* **Port Hardening:** Spostare sempre il traffico di management e le porte inutilizzate su una VLAN dedicata diversa dalla default VLAN 1.",
        examTip: "Per mitigare gli attacchi di VLAN Hopping, configura sempre le porte degli utenti come 'Access' non negoziabili, disabilita il dynamic trunking (DTP) e assegna una Native VLAN fittizia per le porte Trunk."
      },
      {
        name: "Layer 3 Switch",
        checklistKey: "Layer3SwitchConcept",
        definition: "Switch di Livello 3: Uno switch di rete avanzato che, oltre a inoltrare i frame a livello Layer 2 (MAC), Ã¨ in grado di eseguire il routing dei pacchetti a livello Layer 3 (IP) tramite hardware dedicato (ASIC).",
        details: "Vantaggi del Layer 3 Switch:\n* **Prestazioni eccezionali:** Esegue il routing dei pacchetti IP a velocitÃ  vicine a quelle della commutazione fisica (wire-speed), riducendo drasticamente la latenza rispetto a un router tradizionale.\n* **Instradamento locale:** Ideale per gestire l'instradamento ad alta velocitÃ  tra diverse VLAN locali (Inter-VLAN routing) all'interno dello stesso data center o della stessa sede aziendale.\n* **Nessun collo di bottiglia:** Sostituisce l'architettura 'Router-on-a-stick' eliminando i colli di bottiglia sul collegamento fisico verso il router.",
        examTip: "All'esame, lo Switch Layer 3 unisce la velocitÃ  di uno switch L2 con le capacitÃ  di routing logico IP di un router L3 per ottimizzare le prestazioni della rete locale."
      },
      {
        name: "Inter-VLAN Routing",
        checklistKey: "InterVLANRoutingConcept",
        definition: "Instradamento Inter-VLAN: Il processo logico che consente la comunicazione e il passaggio dei dati tra VLAN isolate differenti, che di base non potrebbero comunicare tra loro.",
        details: "Metodologie di implementazione:\n* **Router-on-a-stick:** Utilizza un router esterno collegato a uno switch tramite una singola porta fisica configurata come Trunk, suddividendo l'interfaccia fisica in sotto-interfacce logiche per ciascuna VLAN.\n* **Switch Layer 3 (SVI):** Configura delle interfacce virtuali (Switch Virtual Interfaces - SVI) sullo switch L3 che fungono da gateway predefiniti per ciascuna VLAN.\n* **Sicurezza:** PoichÃ© il traffico deve essere instradato per passare da una VLAN all'altra, questo passaggio consente di applicare controlli di sicurezza rigorosi (ACL o regole di firewall) per decidere quale traffico consentire o bloccare.",
        examTip: "L'Inter-VLAN Routing permette di connettere VLAN separate; per garantire la sicurezza, tale traffico deve sempre essere filtrato tramite Access Control List (ACL) o reindirizzato verso un firewall di ispezione."
      },
      {
        name: "SDN",
        checklistKey: "SDNConcept",
        definition: "Software-Defined Networking: Un'architettura di rete moderna che separa il controllo logico della rete (Control Plane) dal dispositivo fisico di inoltro del traffico (Data Plane), centralizzando la gestione tramite software.",
        details: "Vantaggi dell'approccio SDN:\n* **ProgrammabilitÃ :** Consente agli amministratori e ai sistemi di automazione di configurare, gestire e proteggere l'intera rete dinamicamente tramite codice e API.\n* **Virtualizzazione di Rete:** Facilita la microsegmentazione dinamica negli ambienti cloud (es. creazione e modifica di regole di sicurezza per i singoli server in tempo reale).\n* **VisibilitÃ  centralizzata:** Fornisce un unico punto di osservazione del traffico e dello stato della rete globale.",
        examTip: "L'SDN centralizza la logica di controllo della rete tramite un controller software, astraendo la configurazione dai singoli switch e router fisici."
      },
      {
        name: "Data Plane",
        checklistKey: "DataPlaneConcept",
        definition: "Piano Dati (o Forwarding Plane): La componente dei dispositivi di rete (switch, router) responsabile dell'effettivo inoltro e smistamento dei pacchetti dati e dei frame da un'interfaccia all'altra.",
        details: "Caratteristiche del Data Plane:\n* **Esecuzione veloce:** Si occupa di elaborazioni a livello hardware (ASIC) per massimizzare la velocitÃ  di trasmissione dei pacchetti.\n* **Logica passiva:** Non prende decisioni su come instradare i pacchetti a lungo termine; si limita ad applicare le regole e i percorsi memorizzati nella propria tabella di routing o nella cache (FIB - Forwarding Information Base) ricevute dal Control Plane.\n* **Esempi d'azione:** Confronto dell'indirizzo MAC/IP di destinazione e inoltro sulla porta corrispondente, applicazione di tag VLAN, decremento del TTL.",
        examTip: "All'esame, il Data Plane Ã¨ il piano operativo che si occupa unicamente di spostare fisicamente i pacchetti da una porta all'altra basandosi sulle direttive ricevute dal piano superiore."
      },
      {
        name: "Control Plane",
        checklistKey: "ControlPlaneConcept",
        definition: "Piano di Controllo: La componente intelligente della rete responsabile di determinare come e dove il traffico debba essere instradato, calcolando i percorsi e le tabelle di routing.",
        details: "Caratteristiche del Control Plane:\n* **Presa decisionale:** Definisce la topologia della rete scambiando messaggi e informazioni con gli altri apparati di rete locali o globali.\n* **Protocolli attivi:** Esegue algoritmi complessi e gestisce protocolli di routing dinamico come OSPF, BGP, RIP, STP.\n* **Centralizzazione in SDN:** Nelle reti tradizionali, ciascun apparato possiede il proprio Control Plane locale. Nell'SDN, il Control Plane viene estratto e centralizzato all'interno di un software chiamato **SDN Controller**, lasciando sugli switch fisici solo il semplice Data Plane.",
        examTip: "Il Control Plane decide la rotta logica del traffico (crea le tabelle di routing), mentre il Data Plane la esegue materialmente inoltrando i pacchetti."
      },
      {
        name: "Management Plane",
        checklistKey: "ManagementPlaneConcept",
        definition: "Piano di Gestione: La componente dell'architettura di rete utilizzata dagli amministratori di sistema per configurare, monitorare e gestire i dispositivi e l'infrastruttura di rete globale.",
        details: "Caratteristiche del Management Plane:\n* **Accesso Amministrativo:** Consente l'interazione umana o programmatica con il dispositivo tramite console, interfacce a riga di comando (CLI), pannelli Web (GUI) o protocolli di monitoraggio.\n* **Protocolli di gestione:** Telnet, SSH, SNMPv3, NETCONF, RESTCONF, HTTP/HTTPS.\n* **Sicurezza:** Ãˆ fondamentale isolare il Management Plane proteggendo le connessioni tramite crittografia (SSH/SNMPv3), requisiti MFA e configurando una VLAN di gestione dedicata (Management VLAN) inaccessibile agli utenti ordinari.",
        examTip: "La protezione del Management Plane richiede l'uso esclusivo di protocolli crittografati (SSH, HTTPS, SNMPv3) e l'isolamento del traffico di gestione in una VLAN dedicata (fuori banda)."
      },
      {
        name: "Responsiveness",
        checklistKey: "ResponsivenessPerformance",
        definition: "ReattivitÃ  del sistema: La misura di quanto velocemente e tempestivamente un'applicazione o un servizio IT risponde alle richieste avviate dagli utenti finali.",
        details: "Caratteristiche della Responsiveness:\n* **Esperienza Utente:** Influenza direttamente la produttivitÃ  e la percezione della qualitÃ  del servizio da parte dei clienti.\n* **Indicatori di degradazione:** Un rallentamento della reattivitÃ  Ã¨ di solito il primo campanello d'allarme di problemi strutturali, quali sovraccarico del server, attacchi DDoS in corso, o esaurimento delle risorse computazionali (RAM/CPU).\n* **Monitoraggio:** Tracciata tramite metriche APM (Application Performance Monitoring) e tempi di risposta transazionali.",
        examTip: "La reattivitÃ  (Responsiveness) misura la velocitÃ  di risposta percepita dall'utente, ed Ã¨ critica per rilevare anomalie o sovraccarichi in tempo reale."
      },
      {
        name: "Latency",
        checklistKey: "LatencyPerformance",
        definition: "Latenza: Il ritardo temporale (misurato in millisecondi) che intercorre tra l'invio di una richiesta di dati da parte di un client e la ricezione della relativa risposta.",
        details: "Fattori che determinano la latenza:\n* **Distanza Geografica:** La propagazione dei segnali fisici attraverso i cavi in fibra ottica risente della distanza (risolta tramite CDN - Content Delivery Network).\n* **Latenza di Rete:** Ritardi causati dal numero di salti (hop) tra router e dalla congestione dei canali di rete.\n* **Elaborazione del firewall:** Firewall avanzati (come NGFW o IPS) che eseguono l'ispezione profonda dei pacchetti (DPI) introducono una minima quota di latenza dovuta al tempo di calcolo necessario per l'ispezione.\n* **Impatto di sicurezza:** Protocolli crittografici non ottimizzati (es. handshake TLS lenti) aumentano la latenza.",
        examTip: "La latenza misura il ritardo di propagazione e calcolo dei pacchetti; la compressione dei tempi di handshake (es. TLS 1.3) e l'ispezione hardware-assisted sono fondamentali per contenerla."
      },
      {
        name: "Network Segmentation & Port Security",
        checklistKey: "NetSegmentationPortSecurityConcept",
        definition: "Suddivisione della rete (Segmentation) e misure di controllo per limitare l'accesso alle porte fisiche degli apparati (Port Security).",
        details: "Include:\n* **Segmentation (Segmentazione):** Pratica architetturale di dividere una rete in segmenti isolati (VLAN, subnet) per limitare la propagazione degli attacchi (blast radius) e bloccare il movimento laterale dei malware.\n* **Port Security (Sicurezza delle Porte):** FunzionalitÃ  degli switch di livello 2 (Layer 2) che controlla l'accesso alle porte fisiche. Permette di associare ciascuna porta a uno o piÃ¹ indirizzi MAC autorizzati (statici o dinamici tramite 'sticky MAC'). Se viene rilevato un MAC non registrato, lo switch applica contromisure (es. 'shutdown' della porta o restrizione del traffico, inviando una notifica SNMP).",
        examTip: "La Port Security a livello di switch previene l'inserimento di dispositivi non autorizzati bloccando fisicamente l'accesso in base all'indirizzo MAC del computer."
      },
      {
        name: "802.1X Wired & Wireless Authentication",
        checklistKey: "IEEE8021XAuthConcept",
        definition: "Lo standard di controllo degli accessi alla rete basato su porte (Port-Based Network Access Control), che richiede autenticazione prima di sbloccare il transito dati.",
        details: "I tre pilastri fondamentali dello standard IEEE 802.1X sono:\n* **Supplicant (Client):** Il software o dispositivo dell'utente finale (es. laptop) che richiede l'accesso e fornisce le credenziali.\n* **Authenticator (Switch o Access Point):** L'apparato di rete fisico che controlla l'accesso materiale alla porta. Non valida direttamente le credenziali, ma funge da intermediario inoltrandole al server di autenticazione.\n* **Authentication Server (RADIUS Server):** Il server centralizzato che valida l'identitÃ  del supplicant consultando una directory (es. Active Directory) e invia un messaggio di successo o fallimento all'authenticator per sbloccare o bloccare la porta.",
        examTip: "All'esame, ricorda che in uno scenario 802.1X l'Authenticator (lo switch o l'access point) non convalida le credenziali, ma si limita a fare da tramite inoltrandole al server RADIUS."
      },
      {
        name: "Traffic Capture & Copying (SPAN, Port Mirroring, TAP)",
        checklistKey: "TrafficCaptureTAPConcept",
        definition: "Metodologie hardware e software per catturare, copiare e duplicare il traffico di rete per l'ispezione passiva da parte di IDS o analizzatori di protocollo.",
        details: "Include:\n* **Port Mirroring / SPAN (Switched Port Analyzer):** FunzionalitÃ  software dello switch che copia tutto il traffico di una o piÃ¹ porte (o VLAN) e lo reindirizza verso una porta specifica collegata a un sensore (es. IDS o Wireshark). PuÃ² degradare le prestazioni dello switch sotto carichi di traffico molto alti.\n* **Network TAP (Test Access Point):** Un dispositivo hardware passivo e indipendente inserito fisicamente nel cablaggio di rete per sdoppiare il segnale ottico o elettrico. Garantisce la copia esatta del 100% dei pacchetti (incluso traffico con errori di checksum) senza introdurre ritardi o consumare risorse dello switch, rimanendo invisibile sulla rete.",
        examTip: "Il Network TAP Ã¨ un hardware fisico dedicato piÃ¹ affidabile e sicuro del Port Mirroring (SPAN) software, poichÃ© garantisce l'acquisizione di tutto il traffico anche in caso di sovraccarico estremo dello switch."
      },
      {
        name: "Advanced Proxy Types (Forward, Reverse, Open)",
        checklistKey: "ProxyTypesAdvancedConcept",
        definition: "Le diverse tipologie di proxy server utilizzate per instradare, proteggere e ottimizzare i flussi di traffico tra client e server.",
        details: "Si distinguono tre architetture:\n* **Forward Proxy:** Posizionato all'interno della rete locale per conto dei client interni. Riceve le richieste destinate a Internet, le inoltra mascherando l'IP privato del client e applicando filtri sui contenuti e controlli di sicurezza (URL Filtering).\n* **Reverse Proxy:** Posizionato davanti a uno o piÃ¹ server web di backend. Riceve le richieste provenienti da Internet e le smista ai server interni, nascondendo la struttura della rete aziendale. Svolge compiti chiave come terminazione SSL/TLS (decifratura del traffico), caching e bilanciamento del carico.\n* **Open Proxy:** Un proxy server configurato in modo errato o deliberato per essere accessibile da chiunque su Internet. Spesso abusato da malintenzionati per nascondere la propria identitÃ  durante attacchi informatici.",
        examTip: "Mentre un Forward Proxy protegge e maschera i client interni che escono verso Internet, un Reverse Proxy si posiziona a difesa dei server aziendali ricevendo le richieste in ingresso da Internet."
      },
      {
        name: "Modern Cloud & Secure Access Architectures (SD-WAN, SASE, CASB, Zero Trust, SWG)",
        checklistKey: "ModernCloudNetArchitectures",
        definition: "I moderni paradigmi architetturali di rete e sicurezza basati sul cloud per gestire connettivitÃ  distribuita e accessi sicuri di utenti remoti.",
        details: "Le tecnologie chiave comprendono:\n* **SD-WAN (Software-Defined WAN):** Architettura WAN programmabile tramite software che instrada in modo intelligente il traffico aziendale combinando connessioni geografiche eterogenee (es. MPLS, banda larga, 5G) per ottimizzare costi e performance.\n* **SASE (Secure Access Service Edge):** Framework che unifica connettivitÃ  di rete (SD-WAN) e funzionalitÃ  di sicurezza (CASB, FWaaS, SWG, Zero Trust) in un unico servizio interamente gestito in cloud.\n* **CASB (Cloud Access Security Broker):** Un punto di controllo software o servizio cloud inserito tra gli utenti aziendali e le applicazioni cloud (SaaS) per monitorare l'uso del cloud, applicare policy di conformitÃ , applicare controlli di prevenzione della perdita di dati (DLP) e rilevare accessi anomali.\n* **FWaaS (Firewall as a Service):** Soluzione firewall di nuova generazione erogata direttamente dal cloud, che elimina la necessitÃ  di apparati hardware locali e centralizza le regole di sicurezza per tutti i dipendenti, inclusi quelli remoti.\n* **Zero Trust:** Filosofia di sicurezza riassunta nel motto 'Never trust, always verify'. Presume che qualsiasi dispositivo o utente, anche se situato all'interno del perimetro aziendale tradizionale, sia potenzialmente compromesso, imponendo autenticazione continua e privilegi minimi.\n* **SWG (Secure Web Gateway):** Una soluzione di sicurezza web (on-prem o cloud) che filtra il traffico web degli utenti applicando controlli di malware, URL filtering, ispezione SSL/TLS e prevenzione DLP in tempo reale.",
        examTip: "Il CASB Ã¨ la risposta d'esame per eccellenza quando si deve monitorare, proteggere e verificare la conformitÃ  di dipendenti aziendali che accedono ad applicazioni cloud SaaS esterne (come Office365 o Salesforce)."
      }
    ]
  },
  {
    title: "3. Firewalls (Obj 3.2)",
    description: "Apparati per l'ispezione ed il filtraggio del traffico a vari livelli del modello OSI.",
    icon: "ShieldAlert",
    subtopics: [
      {
        name: "NGFW",
        checklistKey: "NGFWFire",
        definition: "Next-Generation Firewall: Un dispositivo di filtraggio di rete evoluto che combina le funzioni tradizionali con ispezione a livello applicativo e intelligence sulle minacce.",
        details: "CapacitÃ  avanzate rispetto ai firewall legacy:\n* **Deep Packet Inspection (DPI):** Analizza il contenuto effettivo dei pacchetti di dati (payload) a tutti i livelli OSI, non limitandosi a verificare intestazioni IP e porte.\n* **Application Awareness:** Riconosce e controlla specifiche applicazioni (es. bloccare il trasferimento file su Skype consentendo al contempo le chat video).\n* **IPS Integrato:** Rileva e blocca attacchi e intrusioni di rete in tempo reale basandosi su signatures e anomalie.\n* **Integrazione con Active Directory:** Associa le regole di filtraggio direttamente agli utenti aziendali e ai gruppi logici piuttosto che solo ad indirizzi IP statici.\n\n* **Piccolo Esempio Concentrato:** Un'azienda configura un **NGFW** Palo Alto alle proprie frontiere: il firewall rileva che un computer interno sta usando il protocollo BitTorrent camuffato sulla porta TCP 443 (normalmente usata per HTTPS) e blocca la sessione grazie all'ispezione di livello 7 (**Deep Packet Inspection**).",
        examTip: "Un NGFW opera fino al Layer 7 (Applicazione) del modello OSI ed include nativamente funzionalitÃ  di IPS e controllo applicativo granulare."
      },
      {
        name: "WAF",
        checklistKey: "WAFFire",
        definition: "Web Application Firewall: Un firewall specializzato posizionato davanti ai server web per filtrare e analizzare il traffico HTTP/HTTPS a livello applicativo (Layer 7).",
        details: "Caratteristiche principali:\n* **Target:** Protegge le applicazioni web ed i siti web aziendali da attacchi e vulnerabilitÃ  software specifiche del web (es. OWASP Top 10).\n* **Prevenzione attacchi:** Identifica ed elimina tentativi di SQL Injection, Cross-Site Scripting (XSS), XML External Entities (XXE), e attacchi di tipo CSRF.\n* **Meccanismo:** Ispeziona le richieste GET e POST prima che raggiungano il server web di backend, bloccando pattern di input anomali o malevoli.\n\n* **Piccolo Esempio Concentrato:** Un utente malintenzionato digita `' OR '1'='1` nel form di login di un sito di e-commerce. Il **WAF** posizionato davanti al server web analizza la richiesta HTTP POST, riconosce la firma tipica di una SQL Injection e blocca istantaneamente l'indirizzo IP dell'attaccante con una pagina di errore 403.",
        examTip: "**WAF contro NGFW, la coppia che l'esame confonde piÃ¹ spesso.** Entrambi arrivano al **Layer 7**, ma guardano cose diverse e stanno in punti diversi.\n  * Il **NGFW** sta al **perimetro** e guarda **tutto il traffico** dell'organizzazione: identifica l'applicazione che genera un flusso (questo Ã¨ Dropbox, questo Ã¨ BitTorrent), applica policy per utente e integra IPS e intelligence sulle minacce.\n  * Il **WAF** sta **davanti a un'applicazione web** specifica e ne comprende la **semantica**: parametri, cookie di sessione, corpo delle richieste. Ãˆ questo che gli consente di riconoscere una SQL injection o una XSS in un singolo campo di input.\n* **Regola d'esame:** se lo scenario nomina **SQLi, XSS o un'applicazione web pubblicata**, la risposta Ã¨ WAF; se nomina il **controllo del traffico aziendale per applicazione e per utente**, Ã¨ NGFW. **Da ricordare:** il WAF Ã¨ un controllo **compensativo**, non la correzione del difetto: la remediation vera resta la validazione dell'input nel codice."
      },
      {
        name: "UTM",
        checklistKey: "UTMFire",
        definition: "Unified Threat Management: Un singolo apparato di sicurezza integrato che racchiude molteplici funzionalitÃ  difensive in un unico dispositivo economico e facile da gestire.",
        details: "FunzionalitÃ  tipicamente consolidate in un UTM:\n* Stateful Firewall e VPN Gateway.\n* Gateway Antivirus, Antispyware e Antispam.\n* Filtro dei contenuti Web (URL/Content Filtering).\n* Intrusion Prevention System (IPS).\n* **Destinazione d'uso:** Ideato specificamente per le piccole e medie imprese (PMI) o per filiali distaccate che mancano di personale IT dedicato per gestire sistemi specialistici multipli.\n\n* **Piccolo Esempio Concentrato:** Un piccolo studio associato acquista un apparato Fortinet FortiGate (**UTM**) per la propria sede. Questo unico dispositivo esegue il filtraggio dei siti web non ammessi ai dipendenti, scansiona le email in ingresso alla ricerca di spam ed esegue l'ispezione antivirus su tutti i download.",
        examTip: "L'UTM rappresenta la soluzione ideale per semplificare la gestione della sicurezza per le PMI integrando piÃ¹ difese in un unico hardware centralizzato (All-in-one)."
      },
      {
        name: "Firewall",
        checklistKey: "FirewallBase_New",
        definition: "Dispositivo di sicurezza di rete progettato per monitorare e filtrare il traffico in entrata e in uscita in base a regole di sicurezza predefinite.",
        details: "PuÃ² essere implementato come hardware dedicato, software installato su un computer, o come servizio cloud (FWaaS). Agisce come barriera protettiva tra una rete interna fidata e reti esterne non fidate (es. Internet).",
        examTip: "Un firewall funge da primo livello di difesa perimetrale, consentendo o bloccando il traffico in base alla configurazione delle regole di accesso (ACL)."
      },
      {
        name: "Stateful firewall",
        checklistKey: "StatefulFirewall_New",
        definition: "Un tipo di firewall in grado di monitorare lo stato attivo delle connessioni e di filtrare i pacchetti analizzandone l'intero contesto.",
        details: "Caratteristiche principali:\n* **Tabella di Stato (State Table):** Registra tutte le sessioni di comunicazione attive (es. handshake TCP completati).\n* **Ispezione Intelligente:** Riconosce se un pacchetto in entrata appartiene a una sessione legittima giÃ  stabilita dall'interno dell'azienda, consentendone automaticamente il transito.\n* **Sicurezza:** Rispetto ai packet-filtering statici, impedisce agli attaccanti di bypassare il filtro inviando pacchetti isolati con flag TCP fittizi.",
        examTip: "I firewall stateful sono superiori a quelli stateless (packet-filtering) poichÃ© tengono traccia dello stato delle connessioni, prendendo decisioni basate sul contesto della sessione."
      },
      {
        name: "Packet-filtering firewall",
        checklistKey: "PacketFilteringFirewall_New",
        definition: "Un firewall di base che esamina individualmente ogni singolo pacchetto dati, decidendo se farlo passare unicamente in base alle intestazioni.",
        details: "Caratteristiche principali:\n* **Senza Stato (Stateless):** Non tiene traccia dello stato della sessione; ogni pacchetto viene valutato in modo del tutto indipendente dagli altri.\n* **Parametri di Filtro:** Prende decisioni basate esclusivamente su indirizzi IP sorgente/destinazione, tipo di protocollo (TCP/UDP/ICMP) e numeri di porta (OSI Layer 3 e Layer 4).\n* **Performance:** Molto veloce e consuma pochissime risorse, ma Ã¨ piÃ¹ vulnerabile a spoofing e tecniche di bypass dei flag TCP.",
        examTip: "I packet-filtering firewall operano a livello Layer 3 e 4, sono privi di stato (stateless) e filtrano il traffico confrontando esclusivamente le intestazioni del pacchetto con regole statiche."
      },
      {
        name: "Proxy firewall",
        checklistKey: "ProxyFirewall_New",
        definition: "Un tipo di firewall (noto anche come Application Gateway) che funge da intermediario tra i client interni e i server di destinazione esterni.",
        details: "Come funziona:\n* **Intermediazione Completa:** Riceve la richiesta del client interno, esegue l'ispezione completa a livello applicativo (Layer 7), stabilisce una nuova connessione separata verso il server di destinazione per conto del client e restituisce al client i dati ricevuti.\n* **Isolamento Totale:** Non c'Ã¨ mai un passaggio diretto di pacchetti tra il client e la risorsa esterna, nascondendo completamente l'indirizzamento interno.\n* **Ispezione Profonda:** PuÃ² bloccare contenuti specifici (es. codice dannoso o siti web non approvati) ma introduce latenza a causa dell'elaborazione doppia delle sessioni.",
        examTip: "Un proxy firewall (Application-level Gateway) opera a livello Layer 7 del modello OSI, interrompe la connessione diretta tra mittente e destinatario ed esegue il massimo livello di ispezione del payload."
      },
      {
        name: "Fail-closed",
        checklistKey: "FailClosed_New",
        definition: "Un principio di design di sicurezza in cui, in caso di guasto, anomalia o blackout, l'accesso a una risorsa viene completamente bloccato per impostazione predefinita.",
        details: "Dettagli:\n* **Sicurezza Massima:** Privilegia la sicurezza del sistema rispetto alla disponibilitÃ  e operativitÃ  aziendale.\n* **Esempi fisici:** Serrature magnetiche di caveau blindati che rimangono bloccate meccanicamente se viene a mancare la corrente elettrica.\n* **Esempi logici:** Un firewall che, se va in crash la sua CPU o la memoria, blocca tutto il traffico di transito anzichÃ© permettere il passaggio incontrollato dei dati.",
        examTip: "La modalitÃ  Fail-closed (o fail-secure) garantisce che, se si verifica un errore o un'interruzione di corrente, i sistemi e gli accessi rimangano bloccati di default per impedire intrusioni."
      },
      {
        name: "Fail-open",
        checklistKey: "FailOpen_New",
        definition: "Un principio di design in cui, in caso di anomalia o interruzione di alimentazione, il sistema consente l'accesso o il transito a tutti di default.",
        details: "Dettagli:\n* **DisponibilitÃ  Massima:** Privilegia la sicurezza delle persone e la continuitÃ  del servizio rispetto alla sicurezza fisica o logica degli asset.\n* **Esempi fisici:** Porte tagliafuoco o varchi di uscita d'emergenza che si sbloccano automaticamente in caso di allarme antincendio o blackout per facilitare l'evacuazione rapida.\n* **Esempi logici:** Un IPS in-line che, se si spegne o subisce un guasto hardware, attiva un bypass fisico lasciando passare il traffico per non interrompere la connettivitÃ  di rete dell'azienda.",
        examTip: "La modalitÃ  Fail-open (o fail-safe) assicura la continuitÃ  e la salvaguardia della vita umana in situazioni di emergenza sbloccando tutti i varchi o consentendo il transito del traffico."
      },
      {
        name: "Rate-based filtering",
        checklistKey: "RateBasedFiltering_New",
        definition: "Un meccanismo di filtraggio che limita la frequenza o il tasso di pacchetti o richieste consentiti da un singolo indirizzo IP o utente.",
        details: "Dettagli:\n* **Scopo principale:** Mitigare attacchi di tipo DoS, DDoS (come HTTP Floods), tentativi automatici di brute-force alle pagine di login e attivitÃ  di web scraping massivo.\n* **Funzionamento:** Se l'indirizzo IP di un utente supera una soglia massima prestabilita di richieste al secondo (es. 100 richieste/sec), il firewall o il server web blocca temporaneamente l'IP o richiede la risoluzione di un CAPTCHA.",
        examTip: "Il Rate-based filtering (filtraggio basato sulla frequenza delle richieste) Ã¨ una tecnica chiave per proteggere i portali Web da attacchi DoS applicativi e scansioni brutali."
      },
      {
        name: "Stateless",
        checklistKey: "StatelessFirewallConcept",
        definition: "Un modello di filtraggio del traffico di rete privo di stato in cui ogni pacchetto viene esaminato in modo del tutto indipendente, senza conservare informazioni sulle sessioni attive.",
        details: "Conosciuto anche come packet-filtering statico, analizza esclusivamente le intestazioni del singolo pacchetto (IP sorgente/destinazione, porta, protocollo). Ãˆ estremamente veloce ma vulnerabile ad attacchi avanzati e non riconosce le risposte a connessioni legittime avviate dall'interno.",
        examTip: "Un filtro stateless opera senza mantenere traccia dello stato della connessione; per questo richiede regole bidirezionali esplicite per consentire il traffico di andata e di ritorno."
      },
      {
        name: "DPI",
        checklistKey: "DPIFire",
        definition: "Deep Packet Inspection: Tecnologia avanzata di analisi dei pacchetti di rete che esamina sia le intestazioni che l'intero contenuto informativo (payload) del pacchetto fino al livello applicativo (Layer 7).",
        details: "A differenza del filtraggio tradizionale che verifica solo IP e porte, la DPI decodifica e ispeziona i dati effettivi trasmessi per identificare malware nascosti, violazioni del protocollo, violazioni di policy o tentativi di exploit, introducendo tuttavia una minima quota di latenza dovuta al tempo di elaborazione.",
        examTip: "La Deep Packet Inspection (DPI) Ã¨ la tecnologia abilitante dei Next-Generation Firewall (NGFW) e degli IPS per ispezionare il contenuto effettivo del traffico a livello applicativo (Layer 7)."
      },
      {
        name: "Allow",
        checklistKey: "AllowRule",
        definition: "La regola esplicita in una Access Control List (ACL) del firewall che autorizza il transito del traffico che corrisponde a determinati criteri.",
        details: "Una regola **allow** autorizza esplicitamente un flusso di traffico che corrisponde ai criteri indicati. In un firewall ben configurato Ã¨ l'unico modo in cui qualcosa passa, perchÃ© tutto il resto viene scartato dall'*implicit deny* finale.\n* **Di che cosa Ã¨ fatta una regola:** origine (IP o rete), destinazione, protocollo (TCP/UDP/ICMP), porta o intervallo di porte, direzione (in entrata o in uscita), azione e â€” in un NGFW â€” l'applicazione e l'identitÃ  dell'utente.\n* **La regola d'oro dell'ordinamento:** il firewall valuta **dall'alto verso il basso** e si ferma alla **prima** corrispondenza. Le regole **specifiche** vanno quindi sopra quelle generiche: se in cima metti `allow any any`, ogni regola sottostante diventa lettera morta, e nessuno se ne accorge finchÃ© non si va a leggere i log.\n* **Come si scrive una allow difendibile:** il piÃ¹ stretta possibile su tutti e quattro gli assi â€” origine, destinazione, porta e protocollo. `Allow 10.0.5.12 â†’ 10.0.9.4 TCP/1433` Ã¨ una regola; `Allow any â†’ any TCP/1433` Ã¨ un buco con la forma di una regola.\n* **Il rischio che si accumula nel tempo:** le regole *allow* si aggiungono e non si tolgono mai. Le eccezioni temporanee sopravvivono per anni, e il risultato Ã¨ un insieme di regole che nessuno sa piÃ¹ giustificare. Per questo il riesame periodico del rule set Ã¨ un controllo, non manutenzione.\n\n* **Piccolo Esempio Concentrato:** Il server web in DMZ deve raggiungere il database interno. La regola corretta non Ã¨ Â«consenti alla DMZ di parlare con la LANÂ», ma `Allow 172.16.1.10 â†’ 10.0.9.4 TCP/1433`: un solo host, un solo host di destinazione, una sola porta. Se il server web viene compromesso, l'attaccante eredita esattamente quella porta e nulla di piÃ¹.",
        comparativeTable: {
          headers: ["Concetto", "Che cosa significa", "PerchÃ© l'esame lo chiede"],
          rows: [
            ["Ordine top-down", "Le regole si valutano dall'alto in basso e si ferma alla PRIMA che corrisponde", "Una regola generica in alto rende inutile ogni regola specifica sotto"],
            ["Regola specifica prima", "IP e porta singoli sopra, intervalli e 'any' sotto", "Ãˆ l'errore che le PBQ chiedono di correggere"],
            ["Implicit deny", "Alla fine tutto ciÃ² che non Ã¨ stato consentito viene scartato", "Ãˆ implicita: non si vede nella lista ma agisce comunque"],
            ["Explicit deny", "Una regola di blocco scritta a mano, che si vede e si registra", "Serve a generare log: l'implicit deny spesso non ne produce"],
            ["Deny vs Drop", "Deny risponde (RST/ICMP), Drop scarta in silenzio", "Drop fa apparire la porta 'filtrata' e non conferma l'esistenza dell'host"],
            ["Inbound vs Outbound", "In entrata dall'esterno Â· in uscita verso l'esterno", "Il filtraggio in uscita ferma l'esfiltrazione e il traffico C2"],
          ],
        },
        examTip: "**Il firewall valuta dall'alto in basso e si ferma alla prima regola che corrisponde:** per questo le regole specifiche stanno sopra e quelle generiche sotto.\n* **L'errore che le PBQ chiedono di correggere:** una regola ampia collocata sopra a una stretta. Se `Allow any â†’ any` sta in cima, tutto ciÃ² che segue non viene mai valutato.\n* **Il criterio di scrittura:** ogni *allow* va stretta su origine, destinazione, protocollo e porta. In Zero Trust vale la stessa logica portata all'estremo: nulla passa se non Ã¨ stato esplicitamente consentito per quell'utente, quel dispositivo e quella risorsa."
      },
      {
        name: "Deny",
        checklistKey: "DenyRule",
        definition: "La regola esplicita o implicita in una Access Control List (ACL) del firewall che blocca e scarta il traffico non autorizzato.",
        details: "Una regola **deny** blocca il traffico che corrisponde ai criteri indicati. La distinzione che l'esame verifica Ã¨ fra il *deny* **implicito** e quello **esplicito**, perchÃ© fanno la stessa cosa ma non producono lo stesso effetto.\n* **Implicit deny:** la regola finale, non scritta e non visibile nella lista, che scarta **tutto ciÃ² che non Ã¨ stato esplicitamente consentito**. Ãˆ il fondamento del modello *default deny* ed Ã¨ ciÃ² che rende sicuro un firewall: non serve elencare le minacce, basta elencare ciÃ² che Ã¨ lecito.\n* **Explicit deny:** una regola di blocco scritta a mano. Se l'implicit deny blocca giÃ  tutto, perchÃ© scriverla? Per tre ragioni: **generare log** (l'implicit deny spesso non registra nulla), **documentare** una decisione presa consapevolmente, e bloccare qualcosa **prima** che una regola *allow* piÃ¹ ampia collocata sotto lo autorizzi.\n* **Deny e drop non sono sinonimi:** **deny (reject)** risponde al mittente con un `RST` TCP o un messaggio ICMP di irraggiungibilitÃ  â€” la porta risulta **chiusa** e l'host Ã¨ confermato esistente. **Drop** scarta in silenzio â€” la porta risulta **filtrata** e l'attaccante non ottiene nemmeno la conferma che l'host ci sia. Sul perimetro si preferisce il drop; all'interno il reject Ã¨ piÃ¹ gentile con le applicazioni, che ricevono un errore immediato invece di attendere il timeout.\n* **Il costo del silenzio:** un drop senza log Ã¨ invisibile anche al difensore. Le regole di blocco su cui vuoi visibilitÃ  â€” tentativi verso porte amministrative, traffico verso domini noti come malevoli â€” vanno scritte esplicitamente e con il logging attivo.\n\n* **Piccolo Esempio Concentrato:** Un'azienda vuole impedire a un intero segmento di raggiungere Internet, ma vuole anche **sapere** quando qualcuno ci prova. L'implicit deny basterebbe a bloccarlo, ma non produrrebbe alcun registro. Viene quindi aggiunta una regola **explicit deny** con logging attivo: il traffico si ferma esattamente come prima, ma ora ogni tentativo lascia una traccia.",
        examTip: "**L'implicit deny Ã¨ la regola finale che scarta tutto ciÃ² che non Ã¨ stato consentito**, e su ogni firewall esiste anche se non la vedi nella lista.\n* **PerchÃ© scrivere comunque un deny esplicito:** per avere i **log**, per documentare una decisione e per bloccare qualcosa prima che una regola *allow* piÃ¹ ampia, collocata sotto, lo autorizzi.\n* **Deny contro drop, la distinzione che compare nelle domande sulle scansioni:** **deny/reject** risponde con `RST` e la porta appare **chiusa**, confermando che l'host esiste Â· **drop** non risponde e la porta appare **filtrata**. Sul perimetro il drop Ã¨ preferibile, perchÃ© non conferma nemmeno l'esistenza del bersaglio."
      },
      {
        name: "Inbound",
        checklistKey: "InboundTraffic",
        definition: "Traffico Inbound: Il flusso di dati di rete in entrata che proviene da una rete esterna (es. Internet) diretto verso l'interno della rete privata aziendale.",
        details: "Il traffico **inbound** Ã¨ quello che entra nella rete provenendo dall'esterno. Ãˆ la direzione su cui l'attenzione si concentra da sempre, e il modello corretto per governarla Ã¨ **default deny**: si nega tutto e si aprono esplicitamente le sole porte necessarie.\n* **Che cosa si apre legittimamente:** i servizi pubblicati â€” un server web in **screened subnet** (l'ex DMZ) su 443, un mail exchanger, un DNS autoritativo. Il principio Ã¨ che i servizi esposti stiano nella sottorete schermata, **mai** nella LAN fidata, cosÃ¬ che la loro compromissione non dia accesso diretto alla rete interna.\n* **Che cosa non si apre mai verso Internet:** RDP (3389), SMB (445), i database (1433, 3306, 5432), SSH senza restrizione di origine e le interfacce di gestione. Sono le porte che compaiono nelle domande come errore da correggere, e nella realtÃ  sono il vettore d'ingresso piÃ¹ comune del ransomware.\n* **Il traffico di risposta non Ã¨ inbound nel senso delle regole:** un firewall **stateful** riconosce i pacchetti che tornano in risposta a una connessione aperta dall'interno e li lascia passare senza bisogno di una regola dedicata. Ãˆ la differenza pratica con un filtro stateless, che richiede regole bidirezionali esplicite.\n* **Il NAT non Ã¨ un controllo inbound:** che un host privato non sia raggiungibile da Internet Ã¨ un effetto collaterale della traduzione, non una policy â€” e cade con un port forwarding, con l'UPnP o con una connessione aperta dall'interno.\n\n* **Piccolo Esempio Concentrato:** Una PMI espone il gestionale su Internet aprendo RDP per consentire il lavoro da remoto. La configurazione corretta Ã¨ l'opposta: RDP **chiuso** verso Internet e accesso attraverso una VPN con MFA, oppure tramite un jump server pubblicato. La porta 3389 aperta Ã¨, statisticamente, uno dei principali vettori d'ingresso del ransomware.",
        examTip: "**Sul traffico in entrata vale il default deny:** si blocca tutto e si aprono esplicitamente solo i servizi che devono essere pubblicati.\n* **Le porte che non vanno mai esposte a Internet:** RDP 3389, SMB 445, database 1433/3306/5432, interfacce di gestione. Se compaiono aperte in uno scenario, Ã¨ quella la falla che la domanda ti chiede di trovare.\n* **Da ricordare:** i servizi pubblici stanno nella **screened subnet**, non nella LAN fidata. E un firewall **stateful** lascia passare il traffico di risposta senza una regola dedicata, perchÃ© lo riconosce come parte di una sessione giÃ  stabilita dall'interno."
      },
      {
        name: "Outbound",
        checklistKey: "OutboundTraffic",
        definition: "Traffico Outbound: Il flusso di dati di rete in uscita originato dai dispositivi della rete interna e diretto verso reti esterne (es. Internet).",
        details: "Il traffico **outbound** Ã¨ quello che esce dalla rete verso l'esterno. Ãˆ la direzione storicamente trascurata â€” Â«tanto siamo noi che usciamoÂ» â€” ed Ã¨ esattamente per questo che Ã¨ diventata la via preferita dagli attaccanti.\n* **PerchÃ© filtrarlo Ã¨ un controllo, non una fissazione:** un attaccante che Ã¨ giÃ  dentro deve **uscire** per fare qualcosa di utile. Deve contattare il server di comando e controllo per ricevere istruzioni, e deve trasferire fuori i dati che ha raccolto. Il filtraggio in uscita (*egress filtering*) Ã¨ ciÃ² che interrompe entrambe le cose, anche quando l'ingresso non Ã¨ stato rilevato.\n* **Che cosa si blocca in pratica:** il DNS verso resolver esterni diversi da quelli aziendali â€” altrimenti il filtraggio DNS si aggira in un minuto; SMTP in uscita da host che non siano il mail server; le connessioni verso categorie e reputazioni note come malevole; i protocolli che nessuno deve usare verso Internet; e, negli ambienti piÃ¹ rigorosi, tutto ciÃ² che non passa dal proxy.\n* **Il legame con la prevenzione della perdita di dati:** il DLP di rete vive su questa direzione, perchÃ© Ã¨ qui che i dati escono. Attenzione perÃ² al limite: se il traffico Ã¨ cifrato e non si esegue l'ispezione TLS, il contenuto non Ã¨ leggibile â€” restano visibili destinazione, volume e orario, che spesso bastano a insospettire.\n* **PerchÃ© Ã¨ difficile da introdurre a posteriori:** in una rete dove tutto Ã¨ sempre uscito liberamente, il primo giorno di *egress filtering* rompe qualcosa. La via praticabile Ã¨ procedere in **modalitÃ  di sola registrazione**, costruire l'elenco di ciÃ² che esce davvero e solo poi passare al blocco.\n\n* **Piccolo Esempio Concentrato:** Un malware si installa su una postazione e tenta di contattare il proprio server di comando e controllo su una porta non standard. Il firewall consente in uscita solo 80, 443 e 53 verso il resolver aziendale: la connessione non si stabilisce, il malware resta senza istruzioni e l'esfiltrazione non parte. L'ingresso non era stato rilevato; l'uscita sÃ¬.",
        examTip: "**Il filtraggio in uscita (egress filtering) Ã¨ ciÃ² che ferma l'attacco dopo l'ingresso:** blocca il traffico verso i server di comando e controllo e l'esfiltrazione dei dati.\n* **Il blocco che non va dimenticato:** il DNS verso resolver esterni. Se i client possono interrogare un DNS pubblico, il filtraggio DNS aziendale si aggira cambiando un'impostazione di rete.\n* **Trappola d'esame:** quando lo scenario descrive dati che escono o una macchina interna che contatta un indirizzo sospetto, la risposta riguarda il traffico **outbound** â€” DLP di rete o filtraggio in uscita â€” non una regola in entrata, che quella comunicazione non la vede nemmeno."
      },
      {
        name: "Network Firewall & NAT (Network Address Translation)",
        checklistKey: "NetFirewallNATConcept",
        definition: "La combinazione di firewall perimetrali di rete (Network Firewall) e traduzione degli indirizzi (NAT) per proteggere e mascherare la topologia interna.",
        details: "I due concetti lavorano in sinergia:\n* **Network Firewall (Firewall di Rete):** Dispositivo dedicato a filtrare il traffico tra reti differenti (es. LAN e Internet). Esamina indirizzi IP, porte e stati di connessione (L3/L4) per bloccare flussi non autorizzati.\n* **NAT (Network Address Translation):** Tecnologia che consente di mappare molteplici indirizzi IP privati (interni) in un unico o pochi indirizzi IP pubblici (esterni) per la navigazione su Internet. Maschera l'indirizzamento privato interno. Di riflesso un host dietro NAT non Ã¨ raggiungibile dall'esterno finchÃ© non Ã¨ lui ad aprire la connessione, ma **non Ã¨ un controllo di sicurezza**: port forwarding, UPnP, NAT traversal o un malware interno che apre la connessione lo aggirano. A decidere che cosa passa Ã¨ il firewall, non il NAT.",
        examTip: "**Il NAT nasce per risparmiare indirizzi IPv4, non per proteggere.** Ãˆ vero che, di riflesso, un host dietro NAT non Ã¨ raggiungibile da Internet finchÃ© non Ã¨ lui ad aprire la connessione â€” ma quell'effetto **non Ã¨ un controllo di sicurezza** e cade con facilitÃ : basta una regola di **port forwarding**, l'**UPnP** che un dispositivo si configura da solo, una tecnica di **NAT traversal** (STUN, TURN) o, molto piÃ¹ semplicemente, un malware interno che apre lui la connessione verso l'esterno.\n* **Trappola d'esame:** il NAT **non sostituisce il firewall**. Il firewall decide per policy che cosa puÃ² passare in entrambe le direzioni e lo registra; il NAT si limita a tradurre indirizzi. Se uno scenario propone il NAT come misura di protezione del perimetro, Ã¨ un distrattore."
      },
      {
        name: "NGFW Advanced Capabilities (Application Awareness, URL Filtering)",
        checklistKey: "NGFWCapabilitiesConcept",
        definition: "Le caratteristiche distintive di un Next-Generation Firewall (NGFW), inclusi il controllo delle applicazioni e il filtraggio degli indirizzi web (URL).",
        details: "Oltre al filtraggio statico e stateful, i NGFW includono:\n* **Application Awareness (Riconoscimento Applicativo):** CapacitÃ  di identificare e ispezionare il traffico a livello di Layer 7 per comprendere quale applicazione specifica stia trasmettendo dati (es. distinguere il traffico di Skype da quello di BitTorrent anche se usano la stessa porta 443).\n* **URL Filtering (Filtraggio degli URL):** Blocca o consente l'accesso a specifici siti web basandosi su blacklist predefinite, categorie di contenuti (es. gioco d'azzardo, social network) o reputazione del dominio per prevenire attacchi di phishing e malware.\n* **Deep Packet Inspection (DPI):** L'ispezione profonda del payload dei pacchetti per rilevare minacce nascoste ed exploit a livello applicativo.",
        examTip: "L'Application Awareness consente agli amministratori di bloccare specifiche funzionalitÃ  di un'applicazione (es. impedire il trasferimento file su una chat aziendale) pur mantenendo attiva l'applicazione stessa."
      },
      {
        name: "Security Zones (Trusted, Untrusted, Screened)",
        checklistKey: "SecurityZonesConcept",
        definition: "La divisione logica di un'infrastruttura di rete in zone con differenti livelli di fiducia e permessi di sicurezza.",
        details: "Le tre zone perimetrali classiche sono:\n* **Trusted Zone (Zona Fidata):** La rete interna dell'organizzazione (LAN) in cui risiedono i dispositivi aziendali e i dipendenti. L'accesso Ã¨ strettamente controllato e protetto.\n* **Untrusted Zone (Zona Non Fidata):** Qualsiasi rete esterna al controllo dell'organizzazione (es. Internet o reti guest), considerata ostile ed esposta a minacce.\n* **Screened Zone / Screened Subnet (DMZ / Zona Demilitarizzata):** Una sottorete isolata frapposta tra la rete fidata e quella non fidata. Ospita i server che devono essere accessibili dall'esterno (es. server web, mail, DNS), impedendo che una loro compromissione consenta l'accesso diretto alla LAN fidata.",
        examTip: "All'esame, lo Screened Subnet (un tempo noto come DMZ) Ã¨ la soluzione architetturale obbligatoria per ospitare server pubblici, garantendo che il traffico esterno non possa mai raggiungere direttamente i dispositivi della LAN fidata."
      }
    ]
  },
  {
    title: "4. Data Security (Obj 3.3)",
    description: "Protezione delle informazioni digitali nei vari stati e tecniche di cifratura ed oscuramento.",
    icon: "FileText",
    subtopics: [
      {
        name: "Data at Rest",
        checklistKey: "DataAtRestSec",
        definition: "Dati a riposo: Tutte le informazioni digitali memorizzate in modo persistente su supporti fisici o logici che non si stanno muovendo sulla rete nÃ© sono in fase di elaborazione attiva.",
        details: "Caratteristiche e protezioni:\n* **Esempi:** File salvati su hard disk (SSD/HDD), database aziendali, nastri di backup, chiavette USB, storage in cloud (es. AWS S3).\n* **Minacce:** Furto fisico dei supporti, intrusioni logiche non autorizzate.\n* **Metodologie di Cifratura Chiave:**\n  - **Full Disk Encryption (FDE):** Cifratura totale dell'unitÃ  fisica (es. BitLocker, FileVault). Protegge i dati in caso di smarrimento o furto dell'intero hardware.\n  - **Database Encryption:** Cifratura applicata direttamente all'interno dei database (es. Transparent Data Encryption - TDE), che cifra le tabelle e i file di dati salvati sul disco logico, lasciando il database operativo per le interrogazioni autorizzate.\n  - **File/Folder Encryption:** Cifratura di singoli file o cartelle specifiche (es. EFS su Windows, GnuPG). Utile quando utenti diversi sullo stesso sistema devono accedere solo a file specifici.\n* **ACL (Access Control List):** Liste di controllo d'accesso a livello di file system o sistema operativo che specificano in modo granulare quali utenti o processi hanno i permessi di lettura, scrittura o esecuzione sui dati archiviati.",
        examTip: "La Full Disk Encryption (FDE) protegge i 'Data at Rest' contro il furto fisico dell'hardware, mentre la Database/File Encryption e le ACL (Access Control Lists) prevengono l'accesso logico non autorizzato a sistema operativo attivo."
      },
      {
        name: "Data in Transit",
        checklistKey: "DataInTransitSec",
        definition: "Dati in transito (Data in Motion): Tutte le informazioni digitali che si stanno attivamente spostando da un nodo all'altro attraverso una rete pubblica o privata.",
        details: "Caratteristiche e protezioni:\n* **Esempi:** Email inviate via internet, traffico web di e-commerce, trasferimenti file (FTP/SFTP), connessioni remote SSH o VPN.\n* **Minacce:** Intercettazione abusiva dei pacchetti di rete (Man-in-the-Middle, eavesdropping, sniffing).\n* **Contromisure di Protezione e Canali Cifrati:**\n  - **TLS (Transport Layer Security):** Protocollo crittografico standard che stabilisce canali sicuri e cifrati per il traffico web (HTTPS), mail (SMTPS, IMAPS) e API, garantendo privacy e autenticazione dei server.\n  - **IPSec (Internet Protocol Security):** Framework di protocolli di rete per cifrare l'intero traffico IP a livello di pacchetto, ideale per creare tunnel VPN sicuri (Site-to-Site o Client-to-Site).\n  - **Network Firewall & IPS (Intrusion Prevention System):** Apparati che monitorano, filtrano e ispezionano (Deep Packet Inspection) il traffico in transito per rilevare e bloccare iniezioni, exploit o esfiltrazioni in corso prima che raggiungano i server aziendali.\n\n* **Piccolo Esempio Concentrato:** Un cliente effettua un pagamento con carta di credito su una rete Wi-Fi pubblica di un bar. PoichÃ© il sito web di e-commerce utilizza il protocollo HTTPS cifrato (**Data in Transit** protetto da TLS), un attaccante sulla stessa rete Wi-Fi che esegue lo sniffing dei pacchetti riceverÃ  solo dati binari cifrati incomprensibili.",
        examTip: "Per proteggere i 'Data in Transit' si usano canali cifrati tramite TLS o IPSec, coadiuvati da ispezione di Firewall e IPS per prevenire attacchi in tempo reale."
      },
      {
        name: "Data in Use",
        checklistKey: "DataInUseSec",
        definition: "Dati in uso: Tutte le informazioni digitali che sono correntemente caricate nella memoria volatile di un sistema e sono attivamente elaborate dalla CPU.",
        details: "Caratteristiche e protezioni:\n* **Esempi:** Un documento Word aperto e in fase di modifica, chiavi di decifratura caricate in memoria per sbloccare un disco, transazioni finanziarie calcolate in tempo reale.\n* **Minacce:** Attacchi di cold boot, dumping della memoria RAM, attacchi di exploit a livello CPU (es. Spectre/Meltdown).\n* **Stati di memoria fisica della CPU:** Durante l'esecuzione attiva, i dati fluiscono attraverso tre livelli di memoria hardware a velocitÃ  crescente:\n  - **RAM (Random Access Memory):** Memoria di sistema principale, volatile, dove risiedono i dati dei processi attivi.\n  - **Cache (L1/L2/L3):** Memoria ultra-veloce integrata nella CPU per memorizzare i dati usati piÃ¹ di frequente.\n  - **CPU Registers (Registri della CPU):** Celle di memoria microscopiche interne al processore che contengono i dati e le istruzioni correntemente in fase di elaborazione da parte dell'unitÃ  di calcolo (ALU).\n* **Contromisure primarie:** Confidential Computing, isolamento basato su enclave hardware (es. Intel SGX, AMD SEV) che cifra dinamicamente le sezioni di memoria RAM dedicate a processi sensibili, impedendo anche all'amministratore del sistema operativo di visualizzarle.\n\n* **Piccolo Esempio Concentrato:** Un server cloud multi-tenant esegue calcoli su dati medici riservati. Il sistema si avvale di tecnologie di Confidential Computing (**Data in Use** protetto tramite enclave Intel SGX e registri sicuri della CPU), assicurando che nessun'altra macchina virtuale ospitata sullo stesso hypervisor fisico possa accedere alla porzione di memoria RAM del server medico.",
        examTip: "I 'Data in Use' risiedono attivamente nella RAM, nella Cache e nei Registri della CPU (CPU Registers) durante l'elaborazione del processore; proteggerli richiede tecniche avanzate di isolamento hardware."
      },
      {
        name: "Types of Data & Information Formats",
        checklistKey: "DataTypesConcept",
        definition: "La classificazione delle informazioni digitali in base alla loro natura normativa, commerciale e di leggibilÛmvçoÊ×¬¢h­µç\Ý[ZHH\ÜÜÚ]]šHÚH›ÛˆÛÛ›ÈpîH™XÙ\ÜØ\šHÈ][^ž˜]Kˆ™]™YH›ØÙY\™H\ˆØ[˜Ù[\™HÈ\ÝYÙÙ\™HH]HÙ[œÚXš[HH\ˆÛX[\™Hš\ÚXØ[Y[HH\ÜÜÚ]]šH[ˆ[ÙÈÚXÝ\›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ñ[˜Üž\[ÛŠŠˆ›ÝYÙÙHH]HHXØÙ\ÜÚH›Ûˆ]]Üš^ž˜]H˜\Ù›Ü›X[™ÛH[ˆ[ˆ›Ü›X]È[YÙÚXš[NÈ›ÛˆÛX[\ØÙHš\ÚXØ[Y[HH\ÜÜÚ]]šHHX\ØÚ\˜HH]H[™XÙHH\ÝYÙÙ\›K—ˆ
ˆ
ŠŠH	Ò\ÛÛ][ÛŠŠˆ™]šY[™HHY™\Ú[Û™H[X[Ø\™HH[ˆÚ\Ý[XH[	Ø[›ÎÈ›ÝYÙÙHHÚ\Ý[ZH[˜ÛÜ˜H[ˆ\ÛË›Ûˆ]Y[H\ÛY\ÜÚK—ˆ
ˆ
ŠÊH[]Ú[™ÊŠˆYÙÚ[Ü›˜H[ÛÙØ\™H\ˆš\ÛÛ™\™H[™\˜Xš[]0è›ÝNÈÚH\XØHZH\ÜÜÚ]]šH[˜ÛÜ˜H[ˆ\ÛË›ÛˆH]Y[H[ÜšHÙ\š^š[Ëˆ‚ˆKˆÂˆYˆ‹ˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ”Ø[K[ˆÙXÝ\š]H[™Ú[™Y\‹ÝH\Ý[™ÈHÚXÝ\™^ž˜HH[‰Ø\XØ^š[Û™HÙXˆHØÛÜ™HÚH0ê[™\˜Xš[HH[ˆ\ÈH]XØÛÈÚHÛÛœÚ\ÝH™[	Ú[šX\™HpîH]H[™]š\ÝÈH[˜H[žš[Û™KØ]\Ø[™ÈHÛÝœ˜\ØÜš]\˜HHØØ^š[ÛšHHY[[ÜšXHYXXÙ[HH	Ù\ÙXÝ^š[Û™HHÛÙXÙH\˜š]˜\š[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H]XØÚH\XØ]]šH0êQQÓSÈ\ØÜš]ÈH]Y\ÝH[™\˜Xš[]0èÈ‹ˆÜ[ÛœÎˆÂˆJH[š™XÝ[Ûˆ‹ˆŠHš]š[YÙH\ØØ[][Ûˆ‹ˆÊHY™™\ˆÝ™\™›ÝÈ‹ˆ‘
H™\^H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHY™™\ˆÝ™\™›ÝÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜]XØÛÈY™™\ˆÝ™\™›ÝÊŠˆÛÛœÚ\ÝH™[	Ú[šX\™HpîH]HH]X[H[˜H[žš[Û™HÚH\Ü]KØ]\Ø[™ÈHÛÝœ˜\ØÜš]\˜HHØØ^š[ÛšHHY[[ÜšXHYXXÙ[HHÝ[žšX[Y[H	Ù\ÙXÝ^š[Û™HHÛÙXÙH\˜š]˜\š[Ëˆ0â[˜H[H[™\˜Xš[]0èpîHÛ\ÜÚXÚH™[H\XØ^š[ÛšHÚH›Ûˆ˜[Y[›ÈH[Y[œÚ[Û™HYÛH[œ]—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆ]XØÛÈ[š™XÝ[ÛŠŠˆÛÛœÚ\ÝH™[	Ú[œÙ\š\™HÛÙXÙHÈÛÛX[™H[››ÜÚH[ˆ[‰Ø\XØ^š[Û™HÈ]X˜\ÙNÈ›ÛˆšYÝX\™HHÛÝœ˜\ØÜš]\˜HHY[[ÜšXHYXXÙ[K—ˆ
ˆ
ŠŠHHš]š[YÙH\ØØ[][ÛŠŠˆÙœ]H[™\˜Xš[]0èÈZ\ØÛÛ™šYÝ\˜^š[ÛšH\ˆÝ[™\™Hš]š[YÚHÝ\\š[ÜšNÈ›Ûˆ0êÛÜœ™[]H[HÛÝœ˜\ØÜš]\˜HHY™™\‹—ˆ
ˆ
Š‘
H[ˆ]XØÛÈ™\^JŠˆØ]\˜HHš]˜\ÛY]H]H˜[YH
ÛÛYHÚÙ[ˆH]][XØ^š[Û™JH\ˆ[\\œÛÛ˜\™H[ˆ][HYÚ][[ÎÈ›ÛˆšYÝX\™H	ÛÝ™\™›ÝÈHY[[ÜšXKˆ‚ˆKˆÂˆYˆËˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“[™ØK[ˆ[˜[\ÝHHÚXÝ\™^ž˜KÝH[™\ÝYØ[™È[ˆ[˜ÚY[HX[Ø\™HHØÛÜ™HÚH[X[Ø\™HH[œÝ[]È[ˆ›ÙÜ˜[[XH›Ù›Û™[Y[H˜\ØÛÜÝÈÚHÛÛœÙ[HH[ˆ]XØØ[HH\ÙYÝZ\™HÛÛX[™HH™[[ÝÈÝ[Ú\Ý[XHÙ[ž˜H\ÜÙ\™Hš[]˜]Ëˆ[\š[ÜšH[™YÚ[šHš]™[[›ÈÚH	Ø]XØØ[HHÝ[]Èš]š[YÚHH[[Z[š\Ý˜]Ü™HØØ[HHÚH[›ÙÜ˜[[XH0ê›ÙÙ]]È\ˆš[X[™\™H˜\ØÛÜÝÈ[	Ú[\››È[Ú\Ý[XHÜ\˜]]›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H\HHX[Ø\™H0êpæH›Ø˜Xš[Y[HÛÚ[›ÛÈ[ˆ]Y\ÝÈ[˜ÚY[OÈ‹ˆÜ[ÛœÎˆÂˆJH›ÛÝÚ]‹ˆŠH›Ú˜[ˆ‹ˆÊHÛÜ›H‹ˆ‘
H˜[œÛÛ]Ø\™H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH›ÛÝÚ]
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š”›ÛÝÚ]
Šˆ0ê[ˆ\ÈHX[Ø\™HÚHÚH˜\ØÛÛ™HH˜\ØÛÛ™H[šH›ÙÜ˜[[ZH[››ÜÚH[š[]˜[Y[ËÛÛœÙ[[™ÈH[ˆ]XØØ[HHÝ[™\™HXØÙ\ÜÛÈ\œÚ\Ý[HHÛÛ›ÛÈÝH[ˆÚ\Ý[XHÛÛˆš]š[YÚHH[[Z[š\Ý˜]Ü™KˆHØ\XÚ]0èH˜\ØÛÛ™\œÚH™[Ú\Ý[XHÜ\˜]]›ÈHH›Ü›š\™H[	Ø]XØØ[Hš]š[YÚH[]˜]H0êHØ\˜]\š\ÝXØH\Ý[]˜HH[ˆ›ÛÝÚ]—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ˆ›Ú˜[ŠŠˆÚHX\ØÚ\˜HH›ÙÜ˜[[XHYÚ][[ÎÈÙX˜™[™HÚXH˜\ØÛÜÝË›Ûˆ›Ü›š\ØÙH\XØ[Y[H[	Ø]XØØ[Hš]š[YÚHH[[Z[š\Ý˜]Ü™HØØ[K—ˆ
ˆ
ŠÊH[ˆÛÜ›JŠˆÚH]]Ë\™\XØHHÚHY™›Û™HY[šHÚ\Ý[ZNÈ›Ûˆ0ê›ÙÙ]]È\ˆ˜\ØÛÛ™\œÚH›Ù›Û™[Y[H™[ÓÈHÝ[™\™Hš]š[YÚH[]˜]K—ˆ
ˆ
Š‘
H[˜[œÛÛ]Ø\™JŠˆÚYœ˜HH]HHšXÚYYH[ˆš\ØØ]ÎÈ›ÛˆÚH˜\ØÛÛ™HÚ[[žš[ÜØ[Y[HH›Ûˆ›Ü›š\ØÙHXØÙ\ÜÛÈ™[[ÝÈ\œÚ\Ý[Kˆ‚ˆKˆÂˆYˆˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’Ù[ÚHYØH[ˆÜ™[™HÝH[ˆÚ]ÈHKXÛÛ[Y\˜ÙHHØÚHÜ™HÜÈH˜[˜ØHHÙYÛ˜[H˜[œØ^š[ÛšHÚH›ÛˆH]]Üš^ž˜]Ëˆ	Ø[˜[\ÚH[Ú]Èš]™[HHØ]\ØNˆ[Ø[\Èœ™XÙ[œÚ[Û™H[›ÙÝ×ˆY[[Üš^ž˜]˜H[\ÝÈ[šX]ÈZHÛY[HHÈš\X˜›XØ]˜H™[HYÚ[™HÙ[ž˜H[Ý[˜HÛÙYšXØH[	ÛÝ]]ˆ[ˆ]XØØ[HšH]™]˜H[œÙ\š]È[ˆYÈØÜš\ˆÚH[œ›ÝÜÙ\ˆHÙÛšHš\Ú]]Ü™H\ÙYÝZ]˜HÛÛYHÙH›ÜÜÙHÛÙXÙH[Ú]ËÛÜX[™ÈHØ[\H[[Ù[ÈHYØ[Y[È™\œÛÈ[ˆÙ\™\ˆ\Ý\››Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[™\˜Xš[]0èÙXˆ0êÝ]HÙœ]]OÈ‹ˆÜ[ÛœÎˆÂˆJHÝXÝ\™Y]Y\žH[™ÝXYÙH[š™XÝ[Ûˆ
ÔSJH‹ˆŠHX[XÚ[Ý\È\]H‹ˆÊHY™™\ˆÝ™\™›ÝÈ‹ˆ‘
HÜ›ÜÜË\Ú]HØÜš\[™È
ÔÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÜ›ÜÜË\Ú]HØÜš\[™È
ÔÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[	ÊŠ–ÔÊŠˆ	Ø]XØØ[H˜H\ÙYÝZ\™H
Š˜ÛÙXÙHHÝXHØÙ[H[›È[œ›ÝÜÙ\ˆ[Hš][XJŠ‹ÛÛˆ	ÛÜšYÚ[™HHHš]š[YÚH[Ú]ÈYÚ][[Ëˆ]ZHÚHÛÛ›È]HH™HÛH[[Y[HÚHÈY[YšXØ[›Îˆ[ˆ[È[ˆÝZH[Ú]ÈXØÙ]H\ÝÈ[	Ý][H
[Ø[\È™XÙ[œÚ[Û™JKH
Š›X[˜Ø]HÛÙYšXØH[	ÛÝ]]
ŠˆÚH˜Hš[š\™H]Y[\ÝÈ™[HYÚ[˜HÛÛYH
Š›X\šÝ\[žšXÚ0êHÛÛYH\ÝÊŠ‹H[ˆ^[ØYÚH[œ›ÝÜÙ\ˆ\ÙYÝYKˆÚXÚ0êHH™XÙ[œÚ[Û™H0ê
ŠœØ[˜]JŠˆ™[]X˜\ÙHHš\›ÜÜÝHHÚ][œ]YH\˜HHYÚ[˜KÚH˜]H[H˜\šX[H
ŠœÝÜ™Y
\œÚ\Ý[JJŠ‹HpîHÜ˜]™NˆÛÛ\ØÙHÙÛšHš\Ú]]Ü™K›ÛˆÛÛÈÚHÛXØØH[ˆ[šÈ™\\˜]Ëˆ[ÛÙXÙHÚ\˜H™[	ÛÜšYÚ[™H[Ú]Ë]Z[™HpìˆYÙÙ\™H[ÓKHØ[\H[[Ù[ÈHYØ[Y[ÈHHÛÛÚÚYH›Ûˆ›Ý]KY0êÛÜðëÚHH]H[HØ\HHÙ[ÚHÛÛ›Èš[š]HH[ˆ\ž›ËˆHÛÛ›ÛZ\Ý\™HÛÛ›È›ÝHH˜[››È\XØ]H[œÚY[YNˆ
Š˜ÛÙYšXØH[	ÛÝ]][ˆ˜\ÙH[ÛÛ\ÝÊŠˆ[ˆÝZH[]ÈšY[™H[œÙ\š]È
S]šX]Ë˜]˜TØÜš\T“
K˜[Y^š[Û™H[ˆ[™Ü™\ÜÛÈÛÛˆ\ÝHH[[Y[HÛÛœÙ[]K
ŠÛÛ[ÙXÝ\š]HÛXÞJŠˆ\ˆ[\Y\™H	Ù\ÙXÝ^š[Û™HHØÜš\›Ûˆ™]š\ÝKHÛÛÚÚYHÛÛˆ
Š’Û›JŠˆH
Š”ÙXÝ\™JŠ‹—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÔS[š™XÝ[ÛŽŠŠˆ[˜ÚHHÔSH˜\ØÙHH[œ]›Ûˆ˜]]ËXH[^[ØYš[š\ØÙH™[H
Šœ]Y\žH™\œÛÈ[]X˜\ÙJŠˆH[[››ÈÚH™YH0ëˆ]H\Ý˜]H[ˆX\ÜØK]][XØ^š[Û™HYÙÚ\˜]KX™[H[\˜]Kˆ]ZH[^[ØYšY[™H\ÙYÝZ]È[
Š˜œ›ÝÜÙ\ˆZHÛY[JŠ‹›Ûˆ[[ÝÜ™HÔSHH]HÛÛ›ÈÝ]HX˜]HY[™H™[š]˜[›ÈYÚ]]Kˆ›ÝHÚH›Ûˆ0êœ\˜Ú0êHÙ[ÚH›ÛˆHØÜš]ÈÔSŽˆ[ˆ[˜HÔSHHš][XH›ÛˆØÜš]™HXZHÔS0ê	Ø\XØ^š[Û™HHÛÜÝZ\™HH]Y\žHÛÛˆ	Ú[œ]šXÙ]]Ë—ˆ
ˆ
ŠŠHX[XÚ[Ý\È\]NŠŠˆ0ê[ˆ]XØÛÈ[H
Š˜Ø][˜HH›Ü›š]\˜JŠ‹[ˆÝZH[ˆYÙÚ[Ü›˜[Y[ÈYÚ][[ÈšY[™HÛÜÝ]Z]ÈÛÛˆ[›ÈÛÛ\›ÛY\ÜÛËˆ™\Ý\Û™H[ˆXØÚ]ÈÛÙØ\™H\ÝšXZ]ÈH[œÝ[]ÎÈ]ZH™\ÜÝ[›ÈHYÙÚ[Ü›˜]È[KH˜[H0ê™[ÛÙXÙH[Ú]Ë—ˆ
ˆ
ŠÊHY™™\ˆÝ™\™›ÝÎŠŠˆ0ê[ˆY™]ÈHÙ\Ý[Û™H[H
Š›Y[[ÜšXJŠ‹\XÛÈH[™ÝXYÙÚHÙ[ž˜HÛÛ›ÛÈZH[Z]HÛÛYHÈHÊÊÎˆÚHØÜš]™HÛ™HHš[™HH[ˆY™™\ˆHÚHÛÝœ˜\ØÜš]™HY[[ÜšXHYXXÙ[Kˆ›ÛˆH][™[ž˜HÛÛˆ[ˆØ[\ÈH\ÝÈš\X˜›XØ]È[ˆ[˜HYÚ[˜HS——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™È[˜HÛX[™H\ØÜš]™H[ˆ[œ]›Ûˆ˜]]ËÚYY]H
Š™Ý™Hš[š\ØÙH[^[ØYHÚHÈ\ÙYÝYJŠ‹ˆ™[
Š˜œ›ÝÜÙ\ˆH[ˆ[›È][JŠˆHÔÈ0­È™[
Š™]X˜\ÙJŠˆHÔS[š™XÝ[Ûˆ0­È™[
ŠœÚ\Ý[XHÜ\˜]]›È[Ù\™\ŠŠˆHÛÛ[X[™[š™XÝ[Ûˆ0­È[ˆ[˜H
ŠœšXÚY\ÝHÚH[œ›ÝÜÙ\ˆ[Hš][XH[šXHÚpè]][XØ]JŠ‹Ù[ž˜HÚH	Ø]XØØ[H™H™YHHš\ÜÜÝHHÔÔ‘‹ˆ‚ˆKˆÂˆYˆKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[Ú]È[HÙ[H[››Ý˜][ÛœÈÈ]™[H\œ˜YÙÚ][™ÚXš[Kˆ[š\™]Ø[™YÚ\Ý˜H[ˆXØÛÈH˜Y™šXÛÈQ[ˆ[˜]HÝ[HÜHLË›Ý™[šY[HH]X[ÚHXÚ[˜HH™\ÛÛ™\ˆ”ÈX˜›XÚHYÚ][ZHH\™™][Y[H[žš[Û˜[Kˆ™\ÜÝ[›ÈH]YZHXØÚ]HÛÜœš\ÜÛ™HH[˜H]Y\žH\]H[H™]H^šY[™[NˆÛÛ›Èš\ÜÜÝHÚH™\ÜÝ[›ÈHÚY\ÝËˆ	Ø[[Z[š\Ý˜]Ü™HH[›ÈZH™\ÛÛ™\ˆÛÛ™™\›XHH]™\ˆšXÙ]]È]Y\žHHÚ\˜ØHÙ\ÜØ[Hž]HÚHš\Ü]˜[›ÈÛÛYH[™\š^ž›ÈHÜšYÚ[™H]Y[È[Ù\™\ˆ^šY[™[KHH]™\ˆš\ÜÜÝÈÛÛˆXØÚ]HHÛ™H™HÚ[Øž]HÚX\ØÝ[›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]]š]0è[››ÜØH\ØÜš]™HQQÓSÈ]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[\YšYYÔÈ]XÚÈ‹ˆŠHœ]H›Ü˜ÙH]XÚÈ‹ˆÊHX[Ø\™H[™™XÝ[Ûˆ‹ˆ‘
H™Y›XÝYÔÈ]XÚÈ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[\YšYYÔÈ]XÚÈ
ÔÈ[\YšXØ]ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÈØÙ[˜\š[È\ØÜš]™HYHYXØØ[š\ÛZHÛÝœ˜\ÜÝKˆ[š[[È0êH
ŠœšY›\ÜÚ[Û™JŠŽˆ	Ø]XØØ[H[šXH]Y\žHZH™\ÛÛ™\ˆ˜[ÚYšXØ[™È	Ú[™\š^ž›ÈHÜšYÚ[™H

Š’TÜÛÙš[™ÊŠŠKÛÜðëHš\ÜÜÝH›ÛˆÜ›˜[›ÈHZHXH[Hš][XKÚHÚHš]›Ý˜HÛÛ[Y\œØHH˜Y™šXÛÈÚH›ÛˆHšXÚY\ÝÈH›Ý™[šY[HHÙ\™\ˆ[]ÈYÚ][ZKˆ[ÙXÛÛ™ËY0ê]Y[ÈÚH0è[›ÛYH[Hš\ÜÜÝK0ê	ÊŠ˜[\YšXØ^š[Û™JŠŽˆÙ\ÜØ[Hž]HH]Y\žH›ÙXÛÛ›ÈÛ™H™[Z[Hž]HHš\ÜÜÝK[ˆ
Š™˜]Ü™HH[\YšXØ^š[Û™HHÚ\˜ØHÚ[œ]X[H›ÛJŠ‹ˆ0â]Y\ÝÈ[]ÈXÚ\Ú]›È™[ÈØÙ[˜\š[Ë\˜Ú0êHÚYÛšYšXØHÚH[	Ø]XØØ[H˜\ÝH[ˆYYØXš][ÙXÛÛ™ÈH˜[™H\ˆØØ\šXØ\›™HÚ[œ]X[HÝ[Hš][XKˆÛH[™^šHÚH]šHØ\\ˆYÙÙ\™HÛÛ›È™Nˆ
Š•Q
Šˆ
›ÝØÛÛÈÙ[ž˜H[™ÚZÙK]Z[™H	ÛÜšYÚ[™HÚH˜[ÚYšXØH˜[˜[Y[JK
Šœš\ÜÜÝH›ÛˆšXÚY\ÝJŠˆ
™\ÜÝ[˜H]Y\žHÛÜœš\ÜÛ™[H[ˆ\ØÚ]JHH
ŠœÜ›ÜÜžš[Û™HXÚX\˜]JŠˆœ˜HšXÚY\ÝHHš\ÜÜÝKˆHZ]YØ^š[ÛšHÝ[››ÈÝHYHX[šNˆÚHÙ\Ý\ØÙHH™\ÛÛ™\ˆ\XØH
ŠÔÎ
Šˆ
š[˜YÙÚ[È[˜Y™šXÛÈ[ˆ\ØÚ]HÛÛˆÜšYÚ[™H›Ûˆ\\[™[H[H›ÜšXH™]JHH[Z]HHš\ÜÜÝHšXÛÜœÚ]™KY[™HHš][XHHš\ÛÙÛ›ÈH[ˆÙ\š^š[ÈH
ŠœØÜX˜š[™ÊŠˆH[ÛK\˜Ú0êHHÝXH˜[™H0êÚpèØ]\˜Hš[XH[š\™]Ø[—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
Š‘
H™Y›XÝYÔÎŠŠˆ0ê[\›Z[™H
Š˜ÛÜœ™]ÈXH[˜ÛÛ\]ÊŠ‹ˆHšY›\ÜÚ[Û™H\ØÜš]™H[
˜[Z]Jˆ8 %Ù\™\ˆYÚ][ZH\Ø]HÛÛYHš[X˜[›ÈÜ˜^šYH[	ÒT˜[ÚYšXØ]È8 %H]ZHÉðêˆXHÈØÙ[˜\š[ÈY]H[ˆ]šY[ž˜H›Üš[È[˜\ÜÈÙ\ÜØ[Hž]HÛÛ›È™[Z[Nˆ]X[™ÈHÛX[™HH›Ü›š\ØÙH[
Š™˜]Ü™HH[\YšXØ^š[Û™JŠ‹ÝHÚYY[™È[\›Z[™HpîHÜXÚYšXÛËˆ[ˆ]XØÛÈšY›\ÜÛÈÙ[ž˜H[\YšXØ^š[Û™H\Ú\ÝH
Hš\ÜÜÝH[››È[	Ú[˜Ú\˜ØHH[Y[œÚ[Û™H[HšXÚY\ÝJHH›Ûˆ0êÚpìˆÚH0ê\ØÜš]È]ZK—ˆ
ˆ
ŠŠHœ]H›Ü˜ÙNŠŠˆ0ê[ˆ]XØÛÈ[H
Š˜Ü™Y[žšX[JŠ‹˜]ÈH[]]šHH]][XØ^š[Û™Hš\]]Kˆ™[ÈØÙ[˜\š[È›ÛˆÛÛ\\™H[Ý[ˆ[]]›ÈHÙÚ[ˆH[˜Y™šXÛÈ0êQ™\œÛÈHÜHLË›Ûˆ™\œÛÈ[ˆÙ\š^š[ÈH]][XØ^š[Û™K—ˆ
ˆ
ŠÊHX[Ø\™H[™™XÝ[ÛŽŠŠˆ™\Ý\Û™HÛÙXÙHX[]›ÛÈ[ˆ\ÙXÝ^š[Û™H
ŠœÝZHÚ\Ý[ZH[Hš][XJŠ‹ÛÛˆHÝ[ÚH[™XØ]ÜšH\XÚNˆ›ØÙ\ÜÚH[›ÛX[K\œÚ\Ý[ž˜KÛÛ›™\ÜÚ[ÛšH™\œÛÈ[ˆÙ\™\ˆHÛÛX[™ÈHÛÛ›ÛËˆ]ZHHÙ\™\ˆ^šY[™[H›ÛˆÛÛ›ÈÛÛ\›ÛY\ÜÚNˆÛÛ›ÈÛÛÈ
Š˜™\œØYÛ[ÊŠˆH˜Y™šXÛÈ\Ý\››Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHH™H˜[ZYÛYHH]XØÛÈ›Û[Y]šXÛÈZHÜ›È[™^šKˆ
Š‘ÔÈ\ÝšXZ]ÈÛ\ÜÚXÛÊŠˆH[ÛHÛÜ™Ù[H™X[K\XØ[Y[H[˜H›Ý™]0­È
Š”šY›\ÜÛÊŠˆHØÚHÛÜ™Ù[H
Š›YÚ][YJŠ‹[™\š^ž›ÈHÜšYÚ[™H˜[ÚYšXØ]Ëš\ÜÜÝHXZHšXÚY\ÝH0­È
Š[\YšXØ]ÊŠˆHšY›\ÜÛÈ
ŠœpîJŠˆ[ˆ˜\ÜÈš\ÜÜÝKÜšXÚY\ÝH[ÛÈ[ËÝ[]ÈX\Ø[™ÈH”Ë•Y[XØXÚYÈÔÑˆšXÛÜ™HÚH	Ø[\YšXØ^š[Û™H0ê[ˆØ\ÛÈ\XÛÛ\™H[HšY›\ÜÚ[Û™NˆÙHHÛX[™HXÚX\˜HH[Y[œÚ[ÛšKHš\ÜÜÝHÚ]\ÝH0ê˜[\YšXØ]×‹ˆ‚ˆKˆÂˆYˆLˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”šXÙ]šH[‰Ù[XZ[[HXH˜[˜ØHÚHHÚYYHH™\šYšXØ\™HH]YÛH[[ÈXØÛÝ[ÛXØØ[™ÈÝH[ˆ[šËˆ	Ù[XZ[Ù[Xœ˜HYÚ][XKXHÙZHÛÜÜ]ÜÛËˆ‹ˆ]Y\Ý[ÛŽˆÚH\ÈH™]Ü™HHZ[˜XØÚXH0êÝ]È][^ž˜]È\ˆ]Y\ÝÈ]XØÛÏÈ‹ˆÜ[ÛœÎˆÂˆJHš[KX˜\ÙY‹ˆŠHYÙ[\ÜÈ‹ˆÊH[XYÙKX˜\ÙY‹ˆ‘
HY\ÜØYÙKX˜\ÙY‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HY\ÜØYÙKX˜\ÙY
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH™]ÜšHH]XØÛÈ
Š“Y\ÜØYÙKX˜\ÙY
Šˆ[˜ÛYÛ›È[XZ[Y\ÜØYÙÚHÓTÈHY\ÜØYÙÚH\Ý[[™ZKˆ[ˆ]Y\ÝÈØÙ[˜\š[Ë	Ø]XØØ[HH\Ø]È[‰Ù[XZ[\ˆÙ\˜Ø\™HH[™Ø[›˜\™HHš][XHHÛXØØ\™HÝH[ˆ[šÈ[››ÜÛÈ8 %[˜HÛ\ÜÚXØHØ[\YÛ˜HH\Ú[™È˜[Z]H™]Ü™H[XZ[—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[™]Ü™Hš[KX˜\ÙY
Šˆ\ØHš[H[››ÜÚH
\ÙYÝZXš[KØÝ[Y[K\˜Ú]šJH\ˆ[™™]\™HHÚ\Ý[ZNÈÈØÙ[˜\š[ÈH[ˆ[šÈ™[	Ù[XZ[›Ûˆ[ˆš[HHØØ\šXØ\™K—ˆ
ˆ
ŠŠH[™]Ü™HYÙ[\ÜÊŠˆ\ØHÛÙØ\™HÚH›ÛˆšXÚYYH[œÝ[^š[Û™HÝ[	Ù[™Ú[È›Ûˆ0ê\[™[HH[‰Ù[XZ[H\Ú[™Ë—ˆ
ˆ
ŠÊH[™]Ü™H[XYÙKX˜\ÙY
ŠˆHÛÙXÙH[››ÜÛÈ[˜ÛÜœÜ˜]È™[	Ú[\Ý^š[Û™HH[‰Ú[[XYÚ[™NÈ›Ûˆ0ê\[™[HH[˜H[XZ[ÛÛˆ[ˆ[šËˆ‚ˆKˆÂˆYˆLKˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[\™]Ü™HÙ[™\˜[HH[ˆÜ\È[™\ÝšX[HšXÙ]™H[˜HÚ[™ÛÛHK[XZ[ØÜš]H[ˆ[ˆ][X[›È[\XØØXš[KÚHÚ]H\ˆ›ÛYHYHY[XœšH[ÛÛœÚYÛ[ÈH˜HšY™\š[Y[ÈH[‰ÛÜ\˜^š[Û™HHXÜ]Z\Ú^š[Û™H™X[Y[H[ˆÛÜœÛÈH›ÝHÛÛÈHØÚH\œÛÛ™Kˆ[Y\ÜØYÙÚ[ÈÈ[š]HY\›Ý˜\™HÛÛˆ\™Ù[ž˜K˜[Z]H[ˆÜ[H\Ý\››Ë[ØÝ[Y[Èš\Ù\˜]È[YØ]Ëˆ™\ÜÝ[ˆ[›È\[™[HHšXÙ]]ÈY\ÜØYÙÚHÚ[Z[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØHH[™ÙYÛ™\šXHÛØÚX[H\ØÜš]™HQQÓSÈ]Y\ÝÈ]XØÛÏÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™ÈÙ[™\šXÛÎˆ[ˆY\ÜØYÙÚ[ÈHX\ÜØH[šX]ÈH[ÛH\Ý[˜]\šH™[HÜ\˜[ž˜HÚH]X[Ý[›ÈX˜›ØØÚH‹ˆŠHÛZ\Ú[™Îˆ	Ú[™Ø[››È\œš]˜H˜[Z]H[ˆY\ÜØYÙÚ[ÈH\ÝÈÝ[[Y›Û›È[\Ý[˜]\š[È‹ˆÊHÚÝ[\ˆÝ\™š[™Îˆ	Ø]XØØ[HÜÜÙ\˜H\™][Y[HH[™›Ü›X^š[ÛšHš\Ù\˜]H[\šYÙ[H‹ˆ‘
HÚ[[™Îˆ\Ú[™ÈZ\˜]ÈÛÛ›È[ˆ\šYÙ[HH™\XÙKÛÜÝZ]ÈÝH[™›Ü›X^š[ÛšH™X[H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÚ[[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠÚ[[™ÊŠˆ0êH›Ü›XHpîHZ\˜]HH\Ú[™ÎˆÛÛ\ØÙH[˜H
ŠœÚ[™ÛÛH\œÛÛ˜HH™\XÙJŠ‹ØÙ[H\ˆ[Ý\™HXÚ\Ú[Û˜[HÚH]Y[™KH\ˆ]Y\ÝÈÚ]\ÝYšXØH[ˆ]›Ü›ÈH™\\˜^š[Û™HÚH[\Ú[™ÈHX\ÜØH›ÛˆÝ™X˜™H\›Y]\œÚKˆÙÛšH]YÛ[È[ÈØÙ[˜\š[È0ê[›ÙÝÈH]Y[H™\\˜^š[Û™Kˆ[Y\ÜØYÙÚ[È0ê
Š[šXÛÊŠ‹›Ûˆ[šX]ÈH™\ÜÝ[ˆ[›Ë[ÚHÈÛÝ˜YHZHÛÛ›ÛHÝ]\ÝXÚHÚH[™]šYX[›ÈHØ[\YÛ™HHX\ÜØKˆ0âØÜš]È
ŠœÙ[ž˜H\œ›ÜšJŠ‹\˜Ú0êH[ÙYÛ˜[H	Ø[\›YHpîH›ÝÈ0ê[˜ÚH[š[[ÈÚH[ˆ]XØØ[HÙ\š[È[[Z[˜KˆHÛÜ˜]]ÈÚ]H
Šš[™›Ü›X^š[ÛšH™\™HHš\Ù\˜]JŠ‹H›ÛZHZHÛÛœÚYÛY\šHH[‰ØXÜ]Z\Ú^š[Û™H[ˆÛÜœÛË˜XØÛÛHÛÛˆšXÙ\˜ØHH›ÛH\\HÈH[˜H™XÙY[HÛÛ\›ÛZ\ÜÚ[Û™Nˆ0ê]Y\ÝÈÚHÜYÛ™H[ÛÜÜ]Ë\˜Ú0êH™\ÜÝ[›È[[XYÚ[˜HÚH[ˆ\Ý˜[™[ÈÜÜØHØ\\™KˆHÛÛ›ÛZ\Ý\˜H›Ûˆpìˆ\ÜÙ\™H[ÛÛÈš[›ËÚH[ˆY\ÜØYÙÚ[È[šXÛÈH™[ˆØÜš]È]˜]™\œØNˆÙ\™H[˜H
Šœ›ØÙY\˜HH™\šYšXØH[ÜšH˜[™JŠˆ\ˆÙÛšH\›Ý˜^š[Û™H[ÜšH›ØÙ\ÜÛËHHÛÛœØ\]›Û^ž˜K™ZH\šYÙ[KH\ÜÙ\™H™\œØYÛHH˜[Ü™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ú[™ÈÙ[™\šXÛÎŠŠˆ0ê	ÛÜÜÝÈ\ˆÛÜÝ^š[Û™Kˆ[HÝ[
Š›Û[YJŠ‹ÛÛˆY\ÜØYÙÚHY[XÚHHZYÛXZXHH\Ý[˜]\šKÜ\ÜÛÈ[\™XÚ\ÚHHÛÛˆ\œ›ÜšKH\ˆ]Y\ÝÈÚHÛÛ˜\ÝH™[™HÛÛˆHš[šKˆ]ZHÉðê[ˆÛÛÈ\Ý[˜]\š[ÈH[ˆÛÛ[]ÈÝXÚ]ÈÝHZ\Ý\˜K—ˆ
ˆ
ŠŠHÛZ\Ú[™ÎŠŠˆ[™XØH[
Š˜Ø[˜[JŠ‹Ú[ðê	ÔÓTËˆÈØÙ[˜\š[È\›H\ÜXÚ][Y[HH[‰ÙK[XZ[]Z[™H[Ø[˜[H0ê[ˆ[›Ë—ˆ
ˆ
ŠÊHÚÝ[\ˆÝ\™š[™ÎŠŠˆšXÚYYH
Šœ™\Ù[ž˜Hš\ÚXØJŠŽˆ	Ø]XØØ[HÝX\™HÈØÚ\›[ÈÈH\ÝY\˜H[Hš][XKˆ]ZH›ÛˆÉðê[Ý[ˆÛÛ]È\™]ËHH[™›Ü›X^š[ÛšHš\Ù\˜]HÛÛ›ÈÝ]H˜XØÛÛHš[XK›ÛˆÜÜÙ\˜]HÝ[[ÛY[Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šHÙ\\˜]HHYH\ÜÚHÝHÝZHHÛX[™HÛÜÝZ\ØÛÛ›ÈH\Ý˜]ÜšKˆ[
Š˜™\œØYÛ[ÊŠŽˆ\Ú[™ÈHÚ][œ]YK[ˆX\ÜØH0­ÈÜX\ˆ\Ú[™ÈH[˜H\œÛÛ˜HÈ[ˆÜ\ÈÜXÚYšXÛÈ0­ÈÚ[[™ÈH[ˆ\šYÙ[HH™\XÙKˆ[
Š˜Ø[˜[JŠŽˆK[XZ[H\Ú[™È0­ÈÓTÈHÛZ\Ú[™È0­È›ØÙHHš\Ú[™È0­ÈÛÙXÙHTˆH]Z\Ú[™ËˆHYH\ÜÚHÚHÛÛXš[˜[›ÈX™\˜[Y[K]Z[™H\Ú\ÝH[˜ÚH[ˆÚ[[™ÈÛÛ™ÝÈ\ˆ[Y›Û›Ëˆ[ÙYÛ˜[HÚH[™XØH[Ú[[™È0êÙ[\™HÈÝ\ÜÛÎˆ
Š[ˆÛÛÈ\Ý[˜]\š[È[ÛÈ[ˆ[ÊŠˆH
Š™]YÛH[\›šH™\šJŠˆÚHÛÛÈ[˜HšXÙ\˜ØHZ\˜]HÝ]˜H›ØÝ\˜\™Kˆ‚ˆKˆÂˆYˆL‹ˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“™ZHÙÈH[‰Ø\XØ^š[Û™HÙXˆÛÛ\Z[Û›ÈšXÚY\ÝHÛÛYHÑUÙÝÛ›ØYÙš[OK‹‹Ë‹‹Ë‹‹Ë‹‹Ù]ËÜ\ÜÝÙK[ˆ›Ü›XHÛÙYšXØ]K	L™IL™IL™‰L™IL™IL™˜ˆ	Ø\XØ^š[Û™HšXÙ]™H[	Ý][H[›ÛYH[š[HHØØ\šXØ\™HHÈÛÛ˜Ø][˜H\™][Y[H[\˜ÛÜœÛÈ[HØ\[HZHØÝ[Y[KÙ[ž˜H[Ý[ˆÛÛ›ÛËˆ[Ý[™Hš\ÜÜÝH[››ÈÛÙXÙHŒH[Y[œÚ[Û™H[›ÛX[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[™\˜Xš[]0èšY[™HÙœ]]HHÛÛYHÚHÛÜœ™YÙÙH[H˜YXÙOÈ‹ˆÜ[ÛœÎˆÂˆJH\™XÝÜžH˜]™\œØ[ˆ˜[Y\™H	Ú[œ]Hš\ÛÛ™\™H[\˜ÛÜœÛÈÛÛ™š[˜[™ÛÈ[ˆ[˜HØ\[HÛÛœÙ[]H‹ˆŠHÔS[š™XÝ[ÛŽˆ\Ø\™H]Y\žH\˜[Y]š^ž˜]H[ÜÝÈ[HÛÛ˜Ø][˜^š[Û™HHÝš[™ÚH‹ˆÊHÜ›ÜÜË\Ú]HØÜš\[™ÎˆÛÙYšXØ\™H	ÛÝ]]š[XHH[œÙ\š\›È™[HYÚ[˜HS‹ˆ‘
HY™™\ˆÝ™\™›ÝÎˆÛÛ\[\™H	Ø\XØ^š[Û™HÛÛˆ›Ý^š[ÛšH[ÈÝXÚÈHTÓˆ]]šH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH\™XÝÜžH˜]™\œØ[
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÙ\]Y[ž˜H‹‹ØÚYÛšYšXØH˜Ø\[HÝ\\š[Ü™W‹Hš\]]HÛÛœÙ[HHš\Ø[\™H[š[\Þ\Ý[Hš[›È[H˜YXÙH\ˆÚHØÙ[™\™HÝ™HÚH[ÛKˆ0â[
Š™\™XÝÜžH˜]™\œØ[
Šˆ
È
œ]˜]™\œØ[
ŠNˆ	Ø\XØ^š[Û™HÚHšYH[›ÛYHHš[HÚHšXÙ]™HHÈÛÛ˜Ø][˜HH[ˆ\˜ÛÜœÛËÛÜðë	Ý][H›ÛˆØÙYÛYHpîH]X[HØÝ[Y[ÈØØ\šXØ\™HXH
Šœ]X[Hš[H[Ù\™\ŠŠˆYÙÙ\™KˆH™H[™^šH[ÈØÙ[˜\š[ÈÛÛ›ÈXÚ\Ú]šNˆHÙ\]Y[ž˜HHš\Ø[]KHÝXH
Š™\œÚ[Û™HÛÙYšXØ]H[ˆ\˜Ù[X[JŠ‹ÚHÙ\™HYYÙÚ\˜\™HHš[šH[™Ù[ZHÚHÙ\˜Ø[›ÈÛÛÈ‹‹Ø[ˆÚX\›ËHHš\ÜÜÝHÛÛˆÛÙXÙHŒH[Y[œÚ[Û™H[›ÛX[KÚHXÛÛ›ÈÚH[Ù\™\ˆ
ŠšH]™\›È™\Ý]Z]ÊŠˆ]X[ÛÜØHH]™\œÛÈ[™]š\ÝËˆHÛÜœ™^š[Û™H[H˜YXÙH0ê\XÙNˆ
Š˜[Y\™H	Ú[œ]
ŠˆÛÛˆ[˜H\ÝHH˜[ÜšHÛÛœÙ[]H[žšXÚ0êHÙ\˜Ø\™HHšY]\™HHÙ\]Y[ž™H\šXÛÛÜÙKH
Šœš\ÛÛ™\™H[\˜ÛÜœÛÈ\ÜÛÛ]ÊŠˆ™\šYšXØ[™ÈÚHÚHš\Ý[HÛÛ[]È™[HØ\[H[[Y\ÜØKÛÜðëÚH]X[[œ]YH›Ü›XHHÛÙYšXØH™[™ØH™]]˜[^ž˜]HÜÈH›Ü›X[^ž˜^š[Û™HH›Ûˆš[XK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÔS[š™XÝ[ÛŽŠŠˆ]XØØH[
Š™]X˜\ÙJŠ‹[šY][™Èœ˜[[Y[HH]Y\žH[ˆ[ˆØ[\ÈÚH	Ø\XØ^š[Û™HÛÛ˜Ø][˜H[ˆ[‰Ú\Ý^š[Û™HÔSˆHÙYÛ˜[HØ\™X˜™\›È\XÚKÔˆOLXÈS’SÓˆÑSPÕ›Ûˆ\˜ÛÜœÚH[š[\Þ\Ý[K—ˆ
ˆ
ŠÊHÜ›ÜÜË\Ú]HØÜš\[™ÎŠŠˆ[šY]H
ŠœØÜš\
Šˆ™[HYÚ[™H\ˆ˜\›H\ÙYÝZ\™H™[œ›ÝÜÙ\ˆH[šH][Kˆ[™\œØYÛ[ÈØ\™X˜™H[š\Ú]]Ü™K›Ûˆ[Ù\™\‹H™ZHÙÈÚH™Y™X˜™\›ÈYÈØÜš\˜ÈÙ\ÝÜšHH]™[K›Ûˆ‹‹Ø—ˆ
ˆ
Š‘
HY™™\ˆÝ™\™›ÝÎŠŠˆÛÝœ˜\ØÜš]™H
Š›Y[[ÜšXHYXXÙ[JŠˆÛÛˆ[ˆ[œ]ÛÝœ˜Y[Y[œÚ[Û˜]ËHÚHX[šY™\ÝHÛÛˆÜ˜\ÚÈ\ÙXÝ^š[Û™HHÛÙXÙKˆ]ZH	Ú[œ]›Ûˆ0ê[™ÛÎˆ0ê
ŠœÙ[X[XØ[Y[JŠˆ]™\œÛÈH]Y[È]\ÛË[ÚH0ê[ˆ›Ø›[XHH˜[Y^š[Û™K›ÛˆHÙ\Ý[Û™H[HY[[ÜšXK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÛ›ÜØÚHÙÛšH]XØÛÈ\ˆ[šY^š[Û™H[
Š˜Ø\˜]\™HÈ[HÙ\]Y[ž˜JŠˆÚHÛÛ\\™H™[	Ú[œ]\˜Ú0êH0êÛÜðëÚHHÛX[™HHÈ[ÜÝ˜[›Ëˆ‹‹ØÈ	L™IL™IL™˜H\™XÝÜžH˜]™\œØ[0­È\XÙHÚ[™ÛÛËÔˆOLXS’SÓˆÑSPÕHÔS[š™XÝ[Ûˆ0­ÈØÜš\˜ÈÛ™\œ›ÜXHÜ›ÜÜË\Ú]HØÜš\[™È0­ÈØÈ	‰˜ÙYÝZ]HH[ˆÛÛX[™ÈHÛÛ[X[™[š™XÝ[Û‹ˆ[Y™]ÈH›Û™È0êÙ[\™HÈÝ\ÜÛË
Š™šY\œÚH[	Ú[œ][	Ý][JŠ‹HHY™\ØHH›Û™È\™Nˆ˜[Y\™HÛÛˆ\ÝHH˜[ÜšHÛÛœÙ[]KXZHÛÛˆ\ÝHHÙ\]Y[ž™HšY]]Kˆ‚ˆKˆÂˆYˆLËˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ™]š\ÛÜ™H[ÛÙXÙH\Ø[Z[˜H[˜H[žš[Û™HÚH™\šYšXØHH\›Y\ÜÚHH[ˆš[HKÝXš]ÈÜËÈ\™H[ˆØÜš]\˜Kˆœ˜HHYHÜ\˜^š[ÛšH\ÜØH[˜Hœ˜^š[Û™HHÙXÛÛ™ËH[ˆ]Y[Hš[™\Ý˜H[ˆ[›È›ØÙ\ÜÛÈpìˆÛÜÝ]Z\™H[š[HÛÛˆ[ˆÛÛYØ[Y[ÈH[ˆ\˜ÛÜœÛÈHÚ\Ý[XKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H0ê[ˆ]XØÛÈ[ˆÝZH[ˆ›ØÙ\ÜÛÈ™\šYšXØHÈÝ]ÈÈ[˜[Ü™HH[˜Hš\ÛÜœØHš[XHH\Ø\›KXH[ˆ[›È›ØÙ\ÜÛÈÈHØ[XšX]È™[œ˜][\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\X[XXÚ[™H
“JH\ØØ\H‹ˆŠHY[[ÜžH[š™XÝ[Ûˆ‹ˆÊHY™™\ˆÝ™\™›ÝÈ‹ˆ‘
HÐÕÕH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÐÕÕH
[YK[Ù‹PÚXÚÈÈ[YK[Ù‹U\ÙJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ]XØÛÈ
Š•ÐÕÕJŠˆÙœ]H[˜H˜XÙHÛÛ™][ÛˆÚHÚH™\šYšXØH]X[™È[ˆ›ØÙ\ÜÛÈÛÛ›ÛHÈÝ]ÈÈ[˜[Ü™HH[˜Hš\ÛÜœØHš[XHH\Ø\›K\ØÚX[™È[ˆXØÛÛÈ[\˜[È˜H[ÛÛ›ÛÈH	Ý\ÛÈY™™]]›ËˆÙH[ˆ]XØØ[HšY\ØÙHH[ÙYšXØ\™HHš\ÛÜœØH\˜[H]Y\ÝÈ[\˜[ËpìˆÜ\™HY^š[ÛšH\œ˜]HÈ›Ûˆ]]Üš^ž˜]H˜\Ø]HÝH[™›Ü›X^š[ÛšHØœÛÛ]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[˜H“H\ØØ\JŠˆÚH™\šYšXØH]X[™È[ˆ›ØÙ\ÜÛÈÚHÚ\˜H[ˆ[˜H“HšY\ØÙHH[Üš]\ØÚ\™HH[\˜YÚ\™HÛÛˆ[Ú\Ý[XHÜÝÈ0ê[ˆ\È]™\œÛÈH[™\˜Xš[]0è—ˆ
ˆ
ŠŠHHY[[ÜžH[š™XÝ[ÛŠŠˆÚH™\šYšXØH]X[™È[ˆ]XØØ[H[œÙ\š\ØÙHÛÙXÙHÈ]H[››ÜÚH™[ÈÜ^š[ÈHY[[ÜšXHH[ˆ›ØÙ\ÜÛÈ[ˆ\ÙXÝ^š[Û™NÈ›ÛˆšYÝX\™H	Ú[\˜[È[\Ü˜[H˜HÛÛ›ÛÈH\ÛË—ˆ
ˆ
ŠÊH[Y™™\ˆÝ™\™›ÝÊŠˆÚH™\šYšXØH]X[™È[ˆ›ÙÜ˜[[XHØÜš]™HpîH]HH]X[H[Y™™\ˆÜÜØHÛÛ[™\™NÈ›Ûˆ0êÛÜœ™[]ÈZHÛÛ›ÛH[\Ü˜[HÝ[Hš\ÛÜœÙKˆ‚ˆKˆÂˆYˆMˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆÛÙØ\™HHÙ\Ý[Û™H™[[ÝH\Ø]ÈHZYÛXZXHH^šY[™Hš[\ØÚXH[ˆYÙÚ[Ü›˜[Y[È™YÛÛ\›Y[Hš\›X]ÈÛÛˆ[Ù\YšXØ]È[›Ù]Ü™HH\ÝšXZ]ÈZHÝ[ÚHØ[˜[HY™šXÚX[KˆYHÙ][X[™HÜÈ	Ú[œÝ[^š[Û™K[ˆ]HHÜ™Ø[š^ž˜^š[ÛšHÚHÈ[››È\XØ]ÈÛÛ\\™H[˜H˜XÚÙÛÜˆÚHÛÛ]H[ˆÙ\™\ˆ\Ý\››ËˆÚH›Ûˆ]™]˜H[˜ÛÜ˜HYÙÚ[Ü›˜]È›Ûˆš\Ý[HÛÛ\›ÛY\ÜÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÈH]XØÛÈÚH0ê™\šYšXØ]ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\ÜÜ]X][™È[ÛZ[š[ÈH\ÝšX^š[Û™HYÛHYÙÚ[Ü›˜[Y[H‹ˆŠH]XØÛÈ™\›ËY^HÛÛ›È[ÛÙØ\™HHÙ\Ý[Û™H™[[ÝH‹ˆÊHØ]\š[™ÈÛHÝ[Ú]È[›Ù]Ü™H‹ˆ‘
HX[XÚ[Ý\È\]H™[HØ][˜HH›Ü›š]\˜HÛÙØ\™H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HX[XÚ[Ý\È\]H™[HØ][˜HH›Ü›š]\˜JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[]YÛ[ÈXÚ\Ú]›È0êÚH	ØYÙÚ[Ü›˜[Y[È0ê
Š˜]][XÛÊŠŽˆš\›X]ÈÛÛˆ[Ù\YšXØ]ÈYÚ][[ÈH\ÝšXZ]ÈZHØ[˜[HY™šXÚX[KˆÚYÛšYšXØHÚHHÛÛ\›ÛZ\ÜÚ[Û™H0ê]™[]H
Š˜H[ÛJŠ‹[›ÈH\[[™HHZ[[›Ù]Ü™HÈ˜[Z]H[\È[HÝXHÚX]™HHš\›XKˆ[ÛÙXÙHX[]›ÛÈ0ê]Z[™H[˜]È
Š˜ÛÛˆHšYXÚXH[›Ü›š]Ü™JŠ‹Ý\\˜[™È[]š\\Ë\XØ][Ûˆ[ÝÈ\ÝHY™šY[ž˜H[	Ý][Kˆ[˜]ÈÚHš\Ý[[›ÈÛÛ]HÛÛÈHÜ™Ø[š^ž˜^š[ÛšHÚH[››ÈYÙÚ[Ü›˜]ÈÛÛ™™\›XHÚH[™]Ü™H0ê	ØYÙÚ[Ü›˜[Y[ÈÝ\ÜÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH™\›ËY^NŠŠˆ0ê[˜H[™\˜Xš[]0è
Š››Ûˆ›ÝH[›Ù]Ü™HHš]˜HH]Ú
Š‹ÚH	Ø]XØØ[HÙœ]HÛÛ›È[ÛÙØ\™HÛÜðëÛÛIðêˆ]ZH›Ûˆ0êÝ]HÙœ]]H[Ý[˜H˜[Nˆ0êÝ]ÈÛÛœÙYÛ˜]ÈÛÙXÙHX[]›ÛÈ]˜]™\œÛÈ[ˆØ[˜[HYÚ][[Ë—ˆ
ˆ
ŠÊHØ]\š[™ÈÛNŠŠˆÛÛ\›ÛY]H[ˆ
ŠœÚ]ÈÙXˆœ™\]Y[]ÊŠˆ[Hš][YH\ˆÙ\š\™H[ˆ^Ú]\˜[HH˜]šYØ^š[Û™Kˆ]ZHHš][YH›Ûˆ[››È˜]šYØ]Îˆ[››È[œÝ[]È[ˆXØÚ]Èš\›X]Ë—ˆ
ˆ
ŠJH\ÜÜ]X][™ÎŠŠˆ™\Ý\Û™H[ˆ
Š™ÛZ[š[ÈÚ[Z[JŠˆÚH[™Ø[›˜HÚHØ˜YÛXHHYÚ]\™KˆÛHYÙÚ[Ü›˜[Y[HÛÛ›È\œš]˜]H[ÛZ[š[ÈÛÜœ™]È[›Ù]Ü™K›ÛˆH[ˆÛÜÚXK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]Y\ÝÈ0ê[Ø\ÛÈ[ˆÝZH
Š˜\XØ\™H[\\Ý]˜[Y[HH]Ú8 %H˜]XØHÛÜœ™]H8 %H][Y[]È[š\ØÚ[ÊŠ‹ˆHš\ÜÜÝH›Ûˆ0êÛY]\™HHYÙÚ[Ü›˜\™KXH[›Ù\œ™HÛÛ›ÛHÚH™YÙØ[›È[˜ÚH]X[™È[›Ü›š]Ü™H0êÛÛ\›ÛY\ÜÛÎˆš[\ØÚHHÛ™]H›ÙÜ™\ÜÚ]™H

œÝYÙY›ÛÝ]
ŠK[XšY[HHÝYÚ[™Ë
Š”Ð“ÓJŠˆ\ˆØ\\™HÛÜØHÚH[œÝ[H]™\›ÈH[Ûš]Ü˜YÙÚ[ÈÛÛ\Ü[Y[[HÜÈ	ØYÙÚ[Ü›˜[Y[Ëˆ‚ˆKˆÂˆYˆMKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’˜[X\š[ËY[™H[˜[^ž˜HHÙÈH™]HH™]SXœËÜÜÙ\˜H][\HšXÚY\ÝH›Ý™[šY[HH[ˆÚ[™ÛÛÈ[™\š^ž›ÈTÚH™[™Û›ÈHZ\˜H[Ü[HHÙÚ[ˆ[	Ø^šY[™Kˆ]Y\ÝHšXÚY\ÝH\Ø[›È]™\œÙHÛÛXš[˜^š[ÛšH[˜[[Y\šXÚH[ˆ˜\YHÝXØÙ\ÜÚ[Û™Kˆ[›Û™KH™]š\Ú[Û™H[HY]šXÚHHØ[]H[Ù\™\ˆš]™[H\š[ÙHH[[œÛÈØ\šXÛÈH[X›Ü˜^š[Û™H\˜[H]Y\ÝH[]]šHHÙÚ[‹ˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[H]]š]0è0êSÓÈ›Ø˜Xš[Y[HHØ]\ØH[HÜÜÙ\˜^š[ÛšHH˜[X\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH™\^H]XÚÈ‹ˆŠH\ÜÝÛÜ™Ü˜^Z[™È‹ˆÊHœ]H›Ü˜ÙH]XÚÈ‹ˆ‘
H\Ú[™È]XÚÈ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHœ]H›Ü˜ÙH]XÚÈ
]XØÛÈH›Üž˜Hœ]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜]XØÛÈH›Üž˜Hœ]JŠˆ›Ý˜H[ÛHÛÛXš[˜^š[ÛšHš[˜Ú0êH›Ûˆ›Ý˜HH\ÜÝÛÜ™Ú]\ÝKˆH™H[[Y[HÜÜÙ\˜]HH˜[X\š[ÈÛÚ[˜ÚYÛ›Îˆ
Š[ˆÛÛÈ[™\š^ž›ÈHÜšYÚ[™JŠ‹
Š›[ÛH\ÜÝÛÜ™]™\œÙJŠˆÛÛ›ÈÈÝ\ÜÛÈ™\œØYÛ[ËH[ˆØ\šXÛÈ[›ÛX[ÈÝ[Ù\™\ˆÚH™H0êHÛÛœÙYÝY[ž˜K—Šˆ
Š’[ÛÛ™œ›ÛÈÚH	Ù\Ø[YH™\šYšXØH]™\›Ë›Üž˜Hœ]HÛÛ›È\ÜÝÛÜ™Ü˜^Z[™ÎŠŠˆ›Ûˆ0êH]X[]0èH[]]šK0êH
Š™\™^š[Û™JŠ‹ˆH›Üž˜Hœ]H›Ý˜H
Š›[ÛH\ÜÝÛÜ™ÝH[ˆXØÛÝ[
ŠŽÈ[
œ\ÜÝÛÜ™Ü˜^Z[™Êˆ›Ý˜H
Š[˜H\ÜÝÛÜ™ÛÛ][™HÝH[Û\ÜÚ[ZHXØÛÝ[
Š‹ˆ[ÙXÛÛ™È\Ú\ÝH›Üš[È\ˆ
Š››ÛŠŠˆ˜\ˆØØ]\™H[›ØØÛÈ[	ØXØÛÝ[\˜Ú0êHÙÛšHÚ[™ÛÛÈ][H™YH[›ÈÈYH[]]šH˜[]KH\ˆ]Y\ÝÈÚHš[]˜HÛÛÈÛÜœ™[[™ÈH˜[[Y[H
Š™œ˜JŠˆXØÛÝ[]™\œÚH[žšXÚ0êH[	Ú[\››ÈH[›ÈÛÛË—Šˆ
Š‘H[™\™H™\Ù[NŠŠˆÈÝ\ÜÛÈ\›Z[™H[™XØH[˜ÚHH
Š™›Üž˜Hœ]Hš\ÚXØJŠˆÝH[˜HÙ\œ˜]\˜HÈ[ˆ\ÝY\š[›ËÚH™YÛHØšY]]šHšY[˜Hœ˜HÛH]XØÚHš\ÚXÚKˆ[YXØØ[š\Û[È0êÈÝ\ÜÛÎÈØ[XšX[›È™\œØYÛ[ÈHY™\ÙK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆ™\^H]XÚÊŠˆØ]\˜HHš]˜\ÛY]H[˜H˜\ÛZ\ÜÚ[Û™HH]H˜[YH
ÛÛYH[ˆÚÙ[ˆH]][XØ^š[Û™JNÈ›ÛˆÛÜœš\ÜÛ™H[	ÛÜÜÙ\˜^š[Û™HH˜\šH[]]šHHÙÚ[ˆÛÛˆÛÛXš[˜^š[ÛšH]™\œÙK—ˆ
ˆ
ŠŠH[\ÜÝÛÜ™Ü˜^Z[™ÊŠˆ[H[˜HÚ[™ÛÛH\ÜÝÛÜ™ÛÛ›ÈpîH\Ù\›˜[YK›Ûˆ][\H\ÜÝÛÜ™ÛÛ›È[ˆÚ[™ÛÛÈ\™Ù]H[ˆT—ˆ
ˆ
Š‘
H[ˆ]XØÛÈ\Ú[™ÊŠˆÙ\˜ØHH[™Ø[›˜\™HÛH][HHš]™[\™H[™›Ü›X^š[ÛšH˜[Z]HÛÛ][šXØ^š[ÛšHœ˜]YÛ[NÈ›ÛˆÙ[™\˜H[]]šH][\H]]ÛX]^ž˜]H[Ü[HHÙÚ[‹ˆ‚ˆKˆÂˆYˆM‹ˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ˜\ÜÈH™X][[YÙ[˜ÙH\ØÜš]™H[˜H˜[HH[ˆœ›ÝÜÙ\ˆ[ÛÈY™\ÛËÙœ]]H[ˆ™]HHÙ][X[™Kˆ[›Ù]Ü™H™H0ê™[]ÈHÛÛ›ÜØÙ[ž˜HÛÛ[È[Hš[YHš][YHH›ÛˆH[˜ÛÜ˜HX˜›XØ]È[Ý[˜HÛÜœ™^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[HÚHšY™\š\ØÙHH[˜H[™\˜Xš[]0è™[ÛÙØ\™HØÛÛ›ÜØÚ]]H[™[™ÜˆHÜ\ÜÛÈÙœ]]HH]ÜšHX[]›ÛHš[XHÚH™[™ØHš[\ØÚX]H[˜H]ÚÈ‹ˆÜ[ÛœÎˆÂˆJH\™Ø\™H[˜ÛÛ\]Xš[]H‹ˆŠHÙ\šXÙH\Ü\[Ûˆ‹ˆÊH™\›ËY^H‹ˆ‘
HÝ\HÚZ[ˆ\Ü\[Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH™\›ËY^JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š[™\˜Xš[]0è™\›ËY^JŠˆÛÛ›È[™\˜Xš[]0è™[ÛÙØ\™HØÛÛ›ÜØÚ]]H[™[™ÜˆÚHÜÜÛÛ›È\ÜÙ\™HÙœ]]HYÛH]XØØ[KˆÙH[ˆ›Ü›š]Ü™HHÛÙØ\™H›ÛˆY[YšXØHHÛÜœ™YÙÙHH[™\˜Xš[]0è™\›ËY^H™[Ý[ÈÛÙØ\™KHÛY[HÜÜÛÛ›È\ÜÙ\™HHš\ØÚ[ÈH]XØÛËˆ[\›Z[™H	Þ™\›ËY^IÈ[™XØHÚH[™[™ÜˆH	Þ™\›ÈÚ[Ü›šIÈ\ˆÛÜœ™YÙÙ\™H[›Ø›[XHš[XHÚH™[™ØHÙœ]]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ò\™Ø\™H[˜ÛÛ\]Xš[]JŠˆpìˆ[™›Z\™HÝ[H[žš[Û˜[]0è[ÛÙØ\™KXH›Ûˆ0ê[˜H[™\˜Xš[]0èÙœ]Xš[HYÛH]XØØ[K—ˆ
ˆ
ŠŠHHÙ\šXÙH\Ü\[ÛŠŠˆpìˆ[™›Z\™HÝ[H\ÜÛšXš[]0è[ÛÙØ\™KXH›Ûˆ0ê[˜H[™\˜Xš[]0èÜXÚYšXØH[ÛÙXÙK—ˆ
ˆ
Š‘
HHÝ\HÚZ[ˆ\Ü\[ÛŠŠˆpìˆ[™›Z\™HÝ[HÛÛœÙYÛ˜H[ÛÙØ\™KXH›Ûˆ0ê[˜H[™\˜Xš[]0è™[ÛÙXÙHÙœ]Xš[H\™][Y[Kˆ‚ˆKˆÂˆYˆMËˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•™HÝYHH[™ÙYÛ™\šXHÚH]›Ü˜[›ÈÝH[˜HÝ\ÜØHØ\˜H	Ø\[È™[™ÛÛ›ÈÛÛ\›ÛY\ÜÚH™[ÈÝ\ÜÛÈ\š[ÙËˆ	Ø[˜[\ÚH›Ü™[œÙHš[]˜HÚH]HH™HHX[HÛÛœÝ[]˜[›ÈXš]X[Y[H[Ü[HH[‰Ø\ÜÛØÚX^š[Û™HXÛšXØHHÙ]Ü™KHÚH]Y[Ü[H\˜HÝ]Èš[Û]ÈHÙ\š]˜H[ˆ^Ú][œ›ÝÜÙ\ˆZHÛÛHš\Ú]]ÜšH›Ý™[šY[HYÛH[™\š^žšHTZH™HÝYKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØH	Ø]XØÛÈ\ØÜš]™H]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™ÈZ\˜]È
ÜX\ˆ\Ú[™ÊH‹ˆŠHØ]\š[™ÈÛH‹ˆÊH]XØÛÈ[HØ][˜HH›Ü›š]\˜HÛÙØ\™H‹ˆ‘
H\ÜÜ]X][™È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHØ]\š[™ÈÛJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	Ø]XØÛÈ
ŠØ]\š[™ÈÛJŠˆ
]\˜[Y[H	ÜÞž˜H	ØXÜ]XIËÛÛYH[™Y]Ü™HÚH\Ü]HH™YHÝ™H˜[››ÈH™\™JH›ÛˆÛÛ\ØÙH\™][Y[HHš][YNˆÛÛ\›ÛY]H[ˆ
ŠœÚ]È\ž›ÈYÚ][[ÊŠˆÚH[Ü\È™\œØYÛ[Èœ™\]Y[HXš]X[Y[KHÈ\ØH\ˆÙ\š\™H	Ù^Ú]ˆYH[[Y[HÈY[YšXØ[›ÈÛÛˆÙ\^ž˜H™[ÈØÙ[˜\š[Îˆ[™]Ü™H0ê[ˆÚ]È
Š™HšYXÚXHH›Ûˆ^šY[™[JŠ‹H[š[˜YÙÚ[È\ˆ[™\š^ž›ÈT[[ÜÝ˜HÚH[™\œØYÛ[È\˜H[ˆ
Š™Ü\È™XÚ\ÛÊŠ‹›Ûˆ[X˜›XÛÈÙ[™\šXÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÜX\ˆ\Ú[™ÎŠŠˆ[˜Ú	Ù\ÜÛÈ0êZ\˜]ËXH[™]Ü™H0ê[ˆ
Š›Y\ÜØYÙÚ[È[šX]È[Hš][XJŠˆ
K[XZ[Ú]
Kˆ]ZH›ÛˆÉðê[Ý[ˆY\ÜØYÙÚ[ÎˆHš][YHÛÛ›ÈÝ]H[™™]]Hš\Ú][™ÈÜÛ[™X[Y[H[ˆÚ]ÈÚHÛÛœÝ[]˜[›ÈÚpè—ˆ
ˆ
ŠÊH]XØÛÈ[HØ][˜HH›Ü›š]\˜NŠŠˆÛÛ\›ÛY]H[ˆ
Šœ›ÙÝÈÈ[ˆYÙÚ[Ü›˜[Y[ÈÛÙØ\™JŠˆÚHHš][XH[œÝ[KÛÛYH™[Ø\ÛÈH[ˆ\]H]™[[˜]Ëˆ]ZH›Ûˆ0êÝ]È[œÝ[]È[Nˆ	Ú[™™^š[Û™H0ê]™[]H\˜[HH˜]šYØ^š[Û™K—ˆ
ˆ
Š‘
H\ÜÜ]X][™ÎŠŠˆ™YÚ\Ý˜HÛZ[šHÚ[Z[HH]Y[H›ÝH\ˆ[\˜Ù]\™HÚHØ˜YÛXHHYÚ]\™Kˆ™[ÈØÙ[˜\š[ÈHš][YH[››È˜YÙÚ][È[Ú]È
Š˜ÛÜœ™]ÊŠ‹ÚH\˜HÝ]Èš[Û]Îˆ™\ÜÝ[ˆ\œ›Ü™HH˜]]\˜H0êÛÚ[›ÛË——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[Ø]\š[™ÈÛH0ê\XÛÛ\›Y[H[œÚY[ÜÛÈ\˜Ú0êHYÙÚ\˜HH›Ü›X^š[Û™H[K\\Ú[™È
›ÛˆÉðê™\ÜÝ[ˆY\ÜØYÙÚ[ÈÛÜÜ]ÈHšXÛÛ›ÜØÙ\™JHHÙœ]H[ˆÚ]ÈÚHÛÛ\\™H™[H[ÝÈ\Ý^šY[™[KˆHÛÛ›ÛZ\Ý\™HY™šXØXÚHÛÛ›ÈXÛšXÚNˆœ›ÝÜÙ\ˆHYËZ[ˆYÙÚ[Ü›˜]K\ÛÛ[Y[È[H˜]šYØ^š[Û™KQˆÛÛ\Ü[Y[[HHš[šHH™\]^š[Û™Kˆ‚ˆKˆÂˆYˆNˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[ˆ[ˆ™[™\™0ë]›Ü˜]]›È[ÛÈØØÝ\]Ë™[›šY™\ˆšXÙ]™H[‰Ù[XZ[ÛÛˆ[˜HšXÚY\ÝH\™Ù[HH›Ø™\[ÑSÈHÛÜ›™\œÝÛ™H\ÚYÛ‹ˆ	Ú[\ÜËH˜]\˜HHH]YÛHHYØ[Y[ÈÛÛ›È[˜Û\ÚH™[	Ù[XZ[ˆ	Ú[™\š^ž›È[XZ[0ê›Ø™\ÛÜ›™\œÛÛ™Y\ÚYÛ‹˜ÛÛKˆ›Ø™\H	ØXš]Y[™HH\Ü]\™H›ÜÈH[™ÛÈ\ˆ[YØ[Y[ÈHÚH[šX\™H[‰Ù[XZ[œ™]ÛÜØHH™[›šY™\ˆšXÚYY[™È[YØ[Y[Ëˆ‹ˆ]Y\Ý[ÛŽˆÚH\ÈH]XØÛÈÝH]™[™È[ÙÛÏÈ‹ˆÜ[ÛœÎˆÂˆJH™]^[™È‹ˆŠHØ]\š[™ÈÛH‹ˆÊH\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙH‹ˆ‘
H\Ú[™È‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙH
‘PÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛH]XØØ[H™[
Š\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙJŠˆÜ\ÜÛÈ™[™Û›ÈHZ\˜H\œÛÛ™HÚX]™H[	Ú[\››ÈH[‰Ø^šY[™Kˆ	Ø]XØØ[HH˜]ÈH	ØÛÛ\]HHØ\ØIËÛÛ›ÜØÙ[™ÈHXš]Y[šHH›Ø™\H[[ÛÈH™[›šY™\‹ˆ›ÝH	Ù\œ›Ü™H™[	Ú[™\š^ž›È[XZ[ˆ	ØÛÜ›™\œÛÛ™Y\ÚYÛ‹˜ÛÛIÈ[™XÙHH	ØÛÜ›™\œÝÛ™Y\ÚYÛ‹˜ÛÛIÈ8 %[ˆ\XÛÈ[™XØ]Ü™HH‘PÈ˜[Z]HÛZ[š[ÈÚ[Z[H
\ÜÜ]X][™ÊK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[™]^[™ÊŠˆ0êHÜ™X^š[Û™HH[˜HÝÜšXH]\ÚXš[H\Ø]HÛÛYHÝ[Y[È™[	Ø]XØÛÎÈ0êÈÝ[Y[Ë›ÛˆH›Ü›XH[	Ø]XØÛÈšXÚY\ÝK—ˆ
ˆ
ŠŠH[Ø]\š[™ÈÛJŠˆÛÛ\›ÛY]HÚ]HÙXˆœ™\]Y[]HH[ˆÜ\È\™Ù]È›Ûˆ0ê\[™[HH]Y\ÝÈØÙ[˜\š[ÈH[XZ[—ˆ
ˆ
Š‘
H[\Ú[™ÊŠˆ0ê[ˆ\ÈpîHÙ[™\˜[HH]XØÛÈÚH›Ûˆ[˜ÛYH™XÙ\ÜØ\šX[Y[H[\™Ù][™ÈH[˜H\œÛÛ˜HÜXÚYšXØNÈ[‘PÈ0êHš\ÜÜÝHpîH™XÚ\ØH\ˆ]Y\ÝÈØÙ[˜\š[ÈZ\˜]Ëˆ‚ˆKˆÂˆYˆNKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[X[HU[H[Ûˆ˜Z[š[™ÈÛÛ][ÛœÈ\Ø[Z[˜HHÙÈ[š\™]Ø[\š[Y]˜[Kˆ™[H[[YHÜ™HÛÛ\Z[Û›ÈXÚ[™HHZYÛXZXHHÛÛ›™\ÜÚ[ÛšH™\Ü[K\™]HH™HÛÛHÙ\š^šH8 %ÌÎKÕÔKÕÔHMÌËÕÔ8 %ÚHHÛXÞH^šY[™[H›ØØØH[X™\˜][Y[H[ÛÛ™š[™KˆÛH[™\š^žšHHÜšYÚ[™HÛÛ›ÈÙ[[˜ZXHHØ[XšX[›ÈHÛÛ[[Ëˆ™\ÜÝ[˜HÛÜ™Ù[H[[Y\˜H	Ú[\˜[È[HÜNˆÙÛ[˜H\ÜØH\™][Y[HH]Y[H™Kš\]][Y[Kˆ[Ú]ÈX˜›XÛÈHHÜÝH™\Ý[›È˜YÙÚ][™ÚXš[HHH[\HHš\ÜÜÝHÛÛ›È›Ü›X[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HY™™\›X^š[ÛšH\ØÜš]™HQQÓSÈ	Ø]]š]0èÜÜÙ\˜]OÈ‹ˆÜ[ÛœÎˆÂˆJH]]š]0èHÜØØ[›š[™Ëˆ‹ˆŠH[]]šHH™Z[™\š^ž˜[Y[È[˜Y™šXÛËˆ‹ˆÊH]XØÛÈ\ÝšX]Y[šX[ÙˆÙ\šXÙH
ÔÊKˆ‹ˆ‘
H[]ÈXØÙ\ÜÛÈHÜH›ØØØ]Kˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[]ÈXØÙ\ÜÛÈHÜH›ØØØ]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÙÈ[ÜÝ˜[›È[]]šHš\]]HH
Šœ˜YÙÚ][™Ù\™HÙ\š^šHÚHHÛXÞHšY]HH\ÜÜœ™JŠ‹H[š\™]Ø[HÝH™\Ü[™Ù[™È\Ø][Y[HÛÛYH™]š\ÝËˆHØÙ[H[H™HÜH›Ûˆ0êØ\ÝX[HY0ê[™\›È[™^š[Îˆ
ŠŒÌÎJŠˆ
‘
K
ŠJŠˆ
ÓPŠHH
ŠŒMÌÊŠˆ
ÔSÙ\™\ŠHÛÛ›ÈH™HÙ\š^šHÚHÛH]XØØ[HÙ\˜Ø[›È\ˆš[ZHÝH[\›™]\˜Ú0êHÜ[›Èš\Ü]]˜[Y[HH[˜HÙ\ÜÚ[Û™H\ÚÝÜ[HÛÛ™]š\Ú[Û™Hš[HHH[ˆ]X˜\ÙKˆÚH\ÜØHØHÚpèÚHÛÜØH[ÛKˆH]ZH\ØÙ[™H[˜ÚHHš\ÜÜÝHÜ\˜]]˜HÛÜœ™]KÚH›Ûˆ0ê\š\™H[Nˆ
Š›X[[™\™H[›ØØÛÊŠ‹™\šYšXØ\™HÚH™\ÜÝ[ˆÜÝ˜YÙÚ][™ØH]YZHÙ\š^šH\ˆ[™HšYH
[˜H™YÛÛH[Y[XØ]K[ˆ[›™[[ˆ\\˜]ÈÛÛˆTX˜›XÛÊK[[Y[\™HH\ÝHH›ØØÛÈÛÛˆHÛÜ™Ù[HpîH[œÚ\Ý[HHÛÛ›Û\™HÚH[š\™]Ø[ÝXH]™\›È™YÚ\Ý˜[™È]Ëˆ[ˆ˜Y™šXÛÈH]Y\ÝÈ\È0ê[[Ü™HH›Û™È\›X[™[HÝH]X[ÚX\ÚH[™\š^ž›ÈX˜›XÛÎˆÛÛHÛÛYH[™XØ]Ü™K›ÛˆÛÛYH[Y\™Ù[ž˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÜØØ[›š[™ÎŠŠˆ[˜HØØ[œÚ[Û™HÙ\™HH
ŠœØÛÜš\™JŠˆÚHÛÜØH0ê\\ËH\ˆ˜\›È
Š™[[Y\˜JŠˆ[ˆ[\˜[ÈHÜKÜ\ÜÛÈ[ˆÙ\]Y[ž˜HH[ˆØÛÈ[\ËˆÈØÙ[˜\š[È\ØÛYH›Üš[È]Y\ÝÎˆ™\ÜÝ[˜HÛÜ™Ù[H[[Y\˜H[K]HÛÛ\ØÛÛ›ÈHÝ\ÜÙH™HÜH›ÝKˆ›Ûˆ0êšXÛÙÛš^š[Û™K0ê[]]›È	ØXØÙ\ÜÛË—ˆ
ˆ
ŠŠH™Z[™\š^ž˜[Y[È[˜Y™šXÛÎŠŠˆ[\XØHÚH[˜Y™šXÛÈ™[™ØH
Š™\›Ý]ÊŠˆ™\œÛÈ[˜H\Ý[˜^š[Û™H]™\œØHH]Y[H›Û]K\XØ[Y[HÛÛˆ]™[[˜[Y[ÈH”ÈÈT”ÈÛÛˆ›ÝH[\˜]Kˆ[H™[ÈØÙ[˜\š[È[™XØHÚH[˜HÛÛ][šXØ^š[Û™HÚXHš[š]HÝ™H›ÛˆÝ™]˜NˆHÛÛ›™\ÜÚ[ÛšH\œš]˜[›ÈH\Ý[˜^š[Û™HH™[™ÛÛ›ÈÙ[\XÙ[Y[HšYš]]]K—ˆ
ˆ
ŠÊHÔÎŠŠˆZ\˜HH
Š™\Ø]\š\™HHš\ÛÜœÙJŠˆHH™[™\™H[™\ÜÛšXš[H[Ù\š^š[ËˆÈØÙ[˜\š[ÈÈÛY[\ØÙH\ÜXÚ][Y[KXÙ[™ÈÚHÚ]ÈHÜÝH™\Ý[›È˜YÙÚ][™ÚXš[HÛÛˆ[\HHš\ÜÜÝH›Ü›X[Kˆ[Ü˜[ˆ[Y\›ÈHÛÜ™Ù[Hpìˆ[™Ø[›˜\™KXHH\ÝšX^š[Û™HHÛÛH›Ûˆ˜H[ˆÔÎˆÙ[ž˜H[\]ÈÝ[H\ÜÛšXš[]0è›Ûˆ0ê[ˆ]XØÛÈH™YØ^š[Û™H[Ù\š^š[Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™ÈYÙÚHÙÈHš\™]Ø[\Ý[™ÝZH	Ø]]š]0è[Ý[È
Š›ØšY]]›ÊŠ‹ˆ
Š”ØØ[œÚ[Û™JŠˆH[[Y\˜\™H[ÛHÜH\ˆØÛÜš\™HÚHÛÜØHš\ÜÛ™H0­È
Š•[]ÈXØÙ\ÜÛÊŠˆH[œÚ\Ý\™HÝH
ŠœØÚHÜH›ÝJŠ‹Ú[ðêÚHØHÚpèÚHÛÜØHÚHÙ\˜ØH0­È
Š‘ÔÊŠˆH›Û[YHš[˜[^ž˜]ÈH
ŠœØ]\˜\™JŠ‹ÛÛˆYÜ˜YÈZ\Ý\˜Xš[H[Ù\š^š[È0­È
Š“[Ýš[Y[È]\˜[JŠˆH˜Y™šXÛÈ
Šš[\››ÊŠˆœ˜HÜÝÚH›Ü›X[Y[H›ÛˆÚH\›[›Ëˆ‚ˆKˆÂˆYˆLˆÜXÎˆ•™X]XÝÜœÈ	ˆ[Ý]˜][ÛœÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆÜ\È[™]˜H™[H™]HH[›ÈÝY[ÈYYXÛËÛÜXHHØ\[HÛ[šXÚHH[Ý[šH^šY[H›ÝHHÛÛ]HH\™^š[Û™Nˆ›ÛˆÚYYH[ˆš\ØØ]È\ˆš\š\Ý[˜\™HHÚ\Ý[ZKÚH[žš[Û˜[›È\™™][Y[HH›ÛˆÛÛ›ÈÝ]HÚYœ˜]KXHZ[˜XØÚXHHX˜›XØ\™HHØ\[HÙH›ÛˆšXÙ]™H[ˆYØ[Y[Ëˆ™\ÜÝ[ˆ]È0êÝ]È\Ý]ÈH™\ÜÝ[ˆÙ\š^š[È0êÝ]È[\œ›ÝËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[Ý]˜^š[Û™H\ØÜš]™HQQÓSÈ]Y\ÝÈ]XØÛÏÈ‹ˆÜ[ÛœÎˆÂˆJH™[™]Nˆ[ˆ^\[™[HÛÛ\ØÙH	ÛÜ™Ø[š^ž˜^š[Û™H\ˆ[ˆÜÈÝXš]È‹ˆŠH[\œ^š[Û™H[Ù\š^š[Îˆ	ÛØšY]]›È0ê™[™\™H[™\ÜÛšXš[HHÚ\Ý[ZHØ[š]\šH‹ˆÊHšXØ]È
›XÚÛXZ[
NˆHZ[˜XØÚXHH][Ø\™HH]H0ê\ÜØHÝ\ÜØHH]˜H[YØ[Y[È‹ˆ‘
HÜ[Û˜YÙÚ[ÎˆH]HÙ\›Û›ÈH[ˆÛÛ˜ÛÜœ™[H\ˆÝ[™\™H[ˆ˜[YÙÚ[ÈÛÛ[Y\˜ÚX[H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHšXØ]È
›XÚÛXZ[
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÈØÙ[˜\š[È0êÛÜÝZ]È\ˆ\ÛÛ\™H[˜H[Ý]˜^š[Û™HÛÛKY0êH
Š›Z[˜XØÚXHH][Ø^š[Û™JŠˆH˜\›Ëˆ	Ø]XØØ[H›ÛˆHÚYœ˜]È[K›ÛˆH\Ý]È[HH›ÛˆH[\œ›ÝÈ[Ý[ˆÙ\š^š[Îˆ[[››ÈÚH›ÛY]H0ê[\˜[Y[H
Šœ™\]^š[Û˜[HHYØ[JŠ‹HšYÝX\™HÚpìˆÚHXØØY™X˜™HÙH]YZH]H]™[\ÜÙ\›ÈX˜›XÚKˆ]Y\ÝÈ\Ý[™ÝYH[šXØ]È[˜[œÛÛ]Ø\™HÛ\ÜÚXÛËÝ™HH]˜H0ê	ÊŠš[™\ÜÛšXš[]0è
ŠˆZHÚ\Ý[ZKˆHØÙ[H[™\œØYÛ[È›Ûˆ0êØ\ÝX[Nˆ]HØ[š]\šHH^šY[H›ÝHX\ÜÚ[Z^ž˜[›ÈÚXH[[››È™\]^š[Û˜[HÚXH	Ù\ÜÜÚ^š[Û™H›Ü›X]]˜KH›Üš[È\ˆ]Y\ÝÈHš][XH0êÜ[HHYØ\™H[˜ÚH]X[™ÈHÚ\Ý[ZH[žš[Û˜[›Ëˆ0âÈØÚ[XH›ÝÈÛÛYH
Š™\ÝÜœÚ[Û™HHÜXH]˜JŠˆ]X[™ÈÚHXØÛÛ\YÛ˜H[HÚYœ˜]\˜KHÛÛYH
Š™\ÝÜœÚ[Û™HÙ[ž˜HÚYœ˜]\˜JŠˆ]X[™ËÛÛYH]ZKHÛÛH\Ùš[˜^š[Û™H˜\ÝK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH™[™]NŠŠˆ][Ý™HÚH[ÛH
Š™[›™YÙÚX\™JŠ‹\XØ[Y[H[ˆ^\[™[HÈ[ˆÛY[H[œÛÙ\Ù˜]ËH[Ý[È˜]È\Ý[]›È0ê	ÊŠ˜\ÜÙ[ž˜HH[˜HšXÚY\ÝHXÛÛ›ÛZXØJŠŽˆÚHÛÛ\ØÙHH˜\ÝKˆ]ZH[™XÙH\Ú\ÝH[˜HšXÚY\ÝH™XÚ\ØHHYØ[Y[ËÚH0ê[š[™H[	Ú[\˜HÜ\˜^š[Û™K—ˆ
ˆ
ŠŠH[\œ^š[Û™H[Ù\š^š[ÎŠŠˆÈØÙ[˜\š[ÈH\ØÛYHYH›ÛNˆHÚ\Ý[ZH[žš[Û˜[›ÈH[H0êÝ]ÈÚYœ˜]ËˆÚH[H[	Ú[™\ÜÛšXš[]0è™[™HH]H[˜XØÙ\ÜÚXš[K›ÛˆZ[˜XØÚXHH™[™\›H
Š›ÜÊŠˆXØÙ\ÜÚXš[K—ˆ
ˆ
Š‘
HÜ[Û˜YÙÚ[ÎŠŠˆZ\˜HH
Š›Ý[™\™HH\Ø\™JŠˆ[™›Ü›X^š[ÛšH™\Ý[™È[pîHÜÜÚXš[H[š\ÚXš[K\˜Ú0êH[˜[Ü™HÝH™[˜[YÙÚ[ÈÚH[™\œØYÛ[È›ÛˆØHH]™\ˆ\™]Ëˆ˜\œÚHš]šHÛÛˆ[˜HšXÚY\ÝHHYØ[Y[È0ê	ÛÜÜÝÈH]Y\ÝHÙÚXØK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[\\˜HHšXÛÛ›ÜØÙ\™HH[Ý]˜^š[Û™H[H
ŠœšXÚY\ÝJŠ‹›Ûˆ[HXÛšXØKˆ
Š‘ÝXYYÛ›ÈXÛÛ›ÛZXÛÊŠˆHšXÚY\ÝHHYØ[Y[Ë˜[œÛÛ]Ø\™Kœ›ÙH0­È
Š”šXØ]ÊŠˆHZ[˜XØÚXHH][Ø\™KÛÛˆH]HÛÛYH]˜H[žšXÚ0êHHÚ\Ý[ZH0­È
Š•™[™]JŠˆH[››ÈÙ[ž˜HšXÚY\ÝH0­È
Š”Ü[Û˜YÙÚ[ÊŠˆH\ÈÚ[[žš[ÜÛÈH\œÚ\Ý[ž˜H›Û[™Ø]H0­È
Š‘\Ý\˜›ÈÈØ[ÜÊŠˆH[››Èš[™HHðêHÝ\ÜÛÈ0­È
Š“[Ý]˜^š[Û™H]XØHÈÛ]XØJŠˆHš]™[™XØ^š[Û™HX˜›XØK\XØH[	ÚXÚÝ]š\Û[Ëˆ™[HÛX[™KHœ˜\ÙHÚHš]™[H[šXØ]È0êÙ[\™HHÝ\ÜØNˆHÚ\Ý[ZH™\Ý[›È[žš[Û˜[HHHZ[˜XØÚXHšYÝX\™HH
ŠœX˜›XØ^š[Û™JŠ‹ˆ‚ˆKˆÂˆYˆLKˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[˜HØØ[œÚ[Û™H[\›˜Hš[]˜HÚHÙXÚHÝ[\[HH™]K]X]›È[XØ[Y\™HHYH\\˜]HH\˜Ú]šX^š[Û™Hš\ÜÛ™Û›È[˜ÛÜ˜H[HÛÛXš[˜^š[ÛšH][KÜ\ÜÝÛÜ™[\ÜÝ]H[ˆ˜X˜œšXØK™\\šXš[H™ZHX[X[HX˜›XÚH[›Ù]Ü™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H™]ÜšHHZ[˜XØÚXH0ê\ÜÛØÚX]ÈZHš\ØÚH\š]˜[H[›ÛˆØ[XšX\™HH[™›Ü›X^š[ÛšHHÙÚ[ˆ™Z[\ÜÝ]HÝZHÚ\Ý[ZKÛÛœÙ[[™ÈÝ[žšX[Y[H[ˆ˜XÚ[HXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™È‹ˆŠH\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙH‹ˆÊHY˜][Ü™Y[X[È‹ˆ‘
HX[˜YÙYÙ\šXÙH›ÝšY\œÈ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHY˜][Ü™Y[X[È
Ü™Y[žšX[H™YYš[š]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š‘Y˜][Ü™Y[X[ÊŠˆ
Ü™Y[žšX[H™YYš[š]JH[›Ý[›ÈÜXÚYšXØ[Y[H[š\ØÚ[È\ÜÛØÚX]È[	Ý\ÛÈZH]YÛHHÙÚ[ˆ[\ÜÝ]H[ˆ˜X˜œšXØK™[™[™ÈHÚ\Ý[ZHÝ\ØÙ]Xš[HYXØÙ\ÜÚH›Ûˆ]]Üš^ž˜]HÚXÚ0êHÛH]XØØ[HÜ\ÜÛÈÛÛ›ÜØÛÛ›È[HÜ™Y[žšX[H
\ÜÛšXš[H™ZHX[X[H[›Ù]Ü™HÈ˜XÚ[Y[H™\\šXš[HÛ›[™JK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[\Ú[™ÊŠˆZ\˜HH[™Ø[›˜\™HÛH[™]šYZHH][Ø\™H[™›Ü›X^š[ÛšHÙ[œÚXš[H˜[Z]HY]ÙHHÛÛ][šXØ^š[Û™H\\™[[Y[HYÚ][ZNÈ›ÛˆšYÝX\™HÜXÚYšXØ][Y[HHÜ™Y[žšX[H™YYš[š]HZHÚ\Ý[ZK—ˆ
ˆ
ŠŠH[\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙJŠˆ0êÙ[˜]ÈÝ[HX[š\Û^š[Û™HZHÚ\Ý[ZHH[XZ[^šY[™[H\ˆÝXYYÛ›Èš[˜[žšX\š[È›Ûˆ]]Üš^ž˜]ÎÈ›ÛˆšYÝX\™HHÜ™Y[žšX[HHÙÚ[ˆ™YYš[š]K—ˆ
ˆ
Š‘
HHX[˜YÙYÙ\šXÙH›ÝšY\œÊŠˆÛÛ›ÈÜ™Ø[š^ž˜^š[ÛšHH\ž™H\HÚHÙ\Ý\ØÛÛ›ÈÙ\š^šH\ˆ[šNÈHš\ØÚH\ÜÛØÚX]H›ÛˆÛÛ›ÈÙ[˜]HÝ[	Ý\ÛÈH]YÛHHÙÚ[ˆ™XÛÛ™šYÝ\˜]Kˆ‚ˆKˆÂˆYˆL‹ˆÜXÎˆ•™X]XÝÜœÈ	ˆ[Ý]˜][ÛœÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[Ú]ÈHÜ™YÛÜžIÜÈØ[Y\ÈÝXš\ØÙH[ˆ]XØÛËˆ	Ø[˜[\ÚH[ÜÝ˜HÚH	ØYÙÜ™\ÜÛÜ™HH\Ø]È[›ÈÝ[Y[È]]ÛX]XÛÈØØ\šXØ]ÈH[ˆ›Ü[HX˜›XÛËÛÛˆH[\ÜÝ^š[ÛšH™YYš[š]HHÙ[ž˜HXZH[ÙYšXØ\›NÈH\ØÚX]È™ZHÙÈHÝš[™ØHHY[YšXØ^š[Û™HÜšYÚ[˜[H[ÈÝ[Y[ÎÈHÜ\˜]È[›Üš[È[™\š^ž›ÈTÛY\ÝXÛÎÈHHÚHš]™[™XØ]È	Ø]XØÛÈÝH[ˆØ[˜[HHY\ÜØYÙÚ\ÝXØHX˜›XÛËÚYY[™È\™^ž˜[Y[ÈZHÛÙ][™ZKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HØ]YÛÜšXHH]Ü™H[HZ[˜XØÚXH\ØÜš]™HQQÓSÈ]Y\ÝÈ›Ùš[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHZ[˜XØÚXH[\›˜K\˜Ú0êHÛÛ›ÜØÙ]˜H[[žš[Û˜[Y[È[Ú]È‹ˆŠH]Ü™HÜÛœÛÜš^ž˜]ÈH[›ÈÝ]Ë\ˆH\œÚ\Ý[ž˜H[[ÜÝ˜]H‹ˆÊH]XØØ[H[™\Ü\È
[œÚÚ[Y]XÚÙ\ŠKÚH\ØHÝ[Y[H[ZHÙ[ž˜HÛÛ\™[™\›H‹ˆ‘
HÜš[Z[˜[]0èÜ™Ø[š^ž˜]K\ˆHÝ]\˜H[	ÛÜ\˜^š[Û™HH[[Ý™[HXÛÛ›ÛZXÛÈ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH]XØØ[H[™\Ü\È
[œÚÚ[Y]XÚÙ\ŠJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÙÛšH[[Y[È[ÈØÙ[˜\š[È[HHØ\XÚ]0è˜\ÜÙHHH[ˆ[Ý™[H›ÛˆXÛÛ›ÛZXÛËˆÈ
ŠœÝ[Y[È™XÛÛ™™^š[Û˜]È\Ø]ÈÛÛˆH[\ÜÝ^š[ÛšH™YYš[š]JŠˆXÙHÚH	Ø]XØØ[H›ÛˆØHÛÜÝZ\™H°êHY]\™H[ˆ^Ú]ˆÚH[Z]HH\ÙYÝZ\›ËˆH
ŠœÝš[™ØHHY[YšXØ^š[Û™H\ØÚX]H™ZHÙÊŠˆH	Ý\ÛÈ[
Šœ›Üš[È[™\š^ž›ÈT
Šˆš]™[[›È	Ø\ÜÙ[ž˜HH]X[[œ]YHXÛšXØHHØØÝ[[Y[ËÚH0êHš[XHÛÜØHÚH[ˆ]XØØ[HØ\XÙHÝ\˜KˆH
Šœš]™[™XØ^š[Û™HX˜›XØH[ˆÙ\˜ØHHšXÛÛ›ÜØÚ[Y[ÊŠˆÛÛ\]H[]XY›ÎˆH[Ý]˜^š[Û™H›Ûˆ0ê[[˜\›È°êH	Ú[™›Ü›X^š[Û™KXHH
Šœ™\]^š[Û™JŠˆ™\ÜÛÈH›ÜšH\šKˆ0â[›Ùš[ÈÚHÛÛ\PHÚX[XH
[œÚÚ[Y]XÚÙ\Š‹[ˆ[\È
œØÜš\ÚYYJ‹ˆ][žš[Û™HH›ÛˆÛÝÝ˜[]\›Îˆ[[››ÈÚH›Ý›ØØHpìˆ\ÜÙ\™HÙ\š[Ë\˜Ú0êHÛHÝ[Y[HÚH\ÙYÝYHÛÛ›ÈØÜš]HH[šHHÛÛ›ÈY™šXØXÚNÈÚpìˆÚHX[˜ØH0êHÛÛ\™[œÚ[Û™K›ÛˆHÝ[ž˜HH[ØÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHZ[˜XØÚXH[\›˜NŠŠˆšXÚYYH[ˆ
Š˜XØÙ\ÜÛÈYÚ][[ÊŠˆ[	ÛÜ™Ø[š^ž˜^š[Û™KÛÛYH\[™[K›Ü›š]Ü™HÈÛÛX›Ü˜]Ü™Kˆ[H™[ÈØÙ[˜\š[È[™XØH[ˆ˜\ÜÈÛÛˆÜ™YÛÜžIÜÈØ[Y\ËH	Ø]XØÛÈ\œš]˜H[	Ù\Ý\››Ë—ˆ
ˆ
ŠŠH]Ü™HÜÛœÛÜš^ž˜]ÈH[›ÈÝ]ÎŠŠˆ0ê[›Ùš[ÈÜÜÝÈÝHÙÛšH\ÜÙKˆš\ÛÜœÙH[]˜]K^Ú]Ýš[\]H[\›˜[Y[KØØÝ[[Y[ÈY]XÛÛÜÛÈH\›X[™[ž˜HÚ[[žš[ÜØH\ˆY\ÚKˆ[ˆ]Ü™HH]Y\ÝÈ]™[È›Ûˆ\ØÚXHHš\›XH[ÈÝ[Y[È™ZHÙÈ°êHš]™[™XØH[H[ˆX˜›XÛË—ˆ
ˆ
Š‘
HÜš[Z[˜[]0èÜ™Ø[š^ž˜]NŠŠˆÜ\˜HÛÛYH[‰Ú[\™\ØKÛÛˆ]š\Ú[Û™HZH[ÛK[™œ˜\Ý]\˜HY™š]]HH[ˆ[Ý™[H
Š™XÛÛ›ÛZXÛÊŠˆ™XÚ\ÛËˆ]ZH›ÛˆÉðê[Ý[˜HšXÚY\ÝHH[˜\›ËHHšXÙ\˜ØHH\]\ÚH0ê[˜ÛÛ\]Xš[HÛÛˆ[‰ÛÜ™Ø[š^ž˜^š[Û™HÚHš]™HH\ØÜ™^š[Û™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ˜[]HÙÛšH]Ü™HÝHYH\ÜÚH[™\[™[K
Š˜Ø\XÚ]0è
ŠˆH
Š›[Ý]˜^š[Û™JŠ‹\˜Ú0êH0êÛÜðëÚHHÛX[™HH\Ý[™Ý[Û›Ëˆ]XØØ[H[™\Ü\ÈHØ\XÚ]0è˜\ÜØK[Ý]˜^š[Û™H™\]^š[Û˜[H0­ÈXÚÝ]š\ÝHHØ\XÚ]0èYYXK[Ý]˜^š[Û™HY[ÛÙÚXØKš]™[™XØ^š[Û™HX˜›XØH0­ÈZ[˜XØÚXH[\›˜HHØ\XÚ]0è˜\šXXš[HXH
Š˜XØÙ\ÜÛÈÚpèÛÛ˜Ù\ÜÛÊŠ‹[Ý]˜^š[Û™HÜ\ÜÛÈ™[™XØ]]˜HÈXÛÛ›ÛZXØH0­ÈÜš[Z[˜[]0èÜ™Ø[š^ž˜]HHØ\XÚ]0è[K[Ý]˜^š[Û™HXÛÛ›ÛZXØH0­È]Ü™HÝ][HHØ\XÚ]0è[\ÜÚ[XK[Ý]˜^š[Û™HÙ[ÜÛ]XØHÈHÜ[Û˜YÙÚ[ËH\œÚ\Ý[ž˜H›Û[™Ø]KˆÛH[™^šHXÚ\Ú]šH™[HÛX[™HÛÛ›ÈÙ[\™HÛHÝ\ÜÚNˆ
ŠœÛÙš\ÝXØ^š[Û™HYÛHÝ[Y[JŠ‹
Š˜Ý\˜H[	ÛØØÝ[[Y[ÊŠˆH
Šœ™\Ù[ž˜HÈ\ÜÙ[ž˜HH[˜HšXÚY\ÝHXÛÛ›ÛZXØJŠ‹ˆ‚ˆKˆÂˆYˆLËˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ”ÚZÚ\‹[ˆšXÙ\˜Ø]Ü™HHÚXÝ\™^ž˜K™[™HYHš[H]™\œÚNˆ[ˆÛÛ˜]È[››ØÝ[ÈH[ˆ\ÙYÝZXš[HX[]›ÛËˆ\ÜØ[™ÛH[ÈÝ\ÜÛÈ[ÛÜš][ÈH\Ú[™ÈÝY[™H\Ø][Y[HÈÝ\ÜÛÈYÙ\Ýˆ[[ÜÝ˜HÛÜðëHÝ\ˆ˜\ˆš\›X\™HYÚ][Y[H[ÛÛ˜]ÈHÚHÛÜÝ]Z\›ÈÛÛˆ	Ù\ÙYÝZXš[HÙ[ž˜HÚHH™\šYšXØH[Hš\›XHÙH™HXØÛÜ™ØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]XØÛÈÜš]ÙÜ˜YšXÛÈ0êQQÓSÈ[\Ý˜]ÈH]Y\ÝHØÛÜ\OÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ\Ú[Ûˆ‹ˆŠHÝÛ™Ü˜YH‹ˆÊHÜ˜^Z[™È‹ˆ‘
Hœ]H›Ü˜ÙH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÛÛ\Ú[Ûˆ
ÛÛ\Ú[Û™JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Š˜ÛÛ\Ú[Û™JŠˆ0ê\Ø][Y[H]Y\ÝÎˆ
Š™YH[œ]]™\œÚJŠˆÚK]H[ˆ\ÝÈ
Š˜[ÈÝ\ÜÛÈ[ÛÜš][ÈH\Ú[™ÊŠ‹›ÙXÛÛ›È
Š›ÈÝ\ÜÛÈYÙ\Ý
Š‹ˆ[˜H[žš[Û™HH\ÚÚXÝ\˜H]™H™[™\›ÈÛÛ\]^š[Û˜[Y[H[\˜]XØXš[K\˜Ú0êH0êÝH]Y[H›ÜšY]0èÚHÚH™YÙÙHÙÛšH\ÛÈ[	Ú\Ú\ˆ	ÊŠš[YÜš]0è
ŠŽˆš\›YHYÚ][KÙ\YšXØ]K™\šYšXØHZHÝÛ›ØYØ][˜HHÝ\ÝÙXH›Ü™[œÙKˆÈØÙ[˜\š[È[ÜÝ˜H\˜Ú0êHÛÛNˆÙHÛÈÛÜÝZ\™HYHš[HÛÛˆÈÝ\ÜÛÈ\Ú˜XØÚ[Èš\›X\™H]Y[È[››ØÝ[ÈHÚHÛÛœÙYÛ›È]Y[ÈX[]›ÛËHH™\šYšXØH[Hš\›XHÛÛ[XHH\™H\Ú]ÈÜÚ]]›Ë\˜Ú0êHHš\›XHÛÜ™H	Ú\Ú›Ûˆ[š[Kˆ0â[[Ý]›È\ˆÝZH
Š“QJŠˆH
Š”ÒKLJŠˆÛÛ›ÈÝ]HY\ÜÚH[ÜšH\ÛÎˆ\ˆ[˜[XšH\Ú\ÝÛ›ÈÛÛ\Ú[ÛšHÛÜÝZXš[H[ˆ˜]XØKH™[ŒMÈ	Ø]XØÛÈ
”Ò]\™Y
ˆH›ÙÝÈYHˆ\Ý[HÛÛˆÈÝ\ÜÛÈ\ÚÒKLKˆHÛÛ›ÛZ\Ý\˜H0ê[˜HÛÛNˆ\Ø\™H
Š”ÒKLMˆÈÝ\\š[Ü™JŠ‹—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÝÛ™Ü˜YNŠŠˆÛÜÝš[™ÙHHYH\HH™YÛÞšX\™H[˜H™\œÚ[Û™HH›ÝØÛÛÈÈ[ˆ[ÛÜš][ÈpîHX›ÛHH]Y[HÚH[˜[X™HÝ\Ü[›Ë\ˆÚH]XØØ\™H[pîHX›ÛKˆYÚ\ØÙHÝ[H
Š›™YÛÞšX^š[Û™JŠ‹›ÛˆÝ[H[žš[Û™HH\Ú—ˆ
ˆ
ŠÊHÜ˜^Z[™ÎŠŠˆ›Ý˜H
Š[˜HÛÛH\ÜÝÛÜ™[ÛÈÛÛ][™JŠˆÝH
Š›[Û\ÜÚ[ZHXØÛÝ[
Š‹›Üš[È\ˆ›Ûˆ˜\ˆØØ]\™HH›ØØÚHÜÈˆ[]]šH˜[]Kˆ0â[ˆ]XØÛÈ[HÜ™Y[žšX[K›Ûˆ[HÜš]ÙÜ˜YšXK—ˆ
ˆ
Š‘
Hœ]H›Ü˜ÙNŠŠˆ›Ý˜HÚ\Ý[X]XØ[Y[H]HHÛÛXš[˜^š[ÛšHš[›ÈH›Ý˜\™H]Y[HÚ]\ÝKˆ\XØ]ÈH[ˆ\ÚÙ\™HHØÛÜš\™H
Š›	Ú[œ]ÚHÈHÙ[™\˜]ÊŠˆ
™Z[[XYÚ[™JK›ÛˆH›Ý˜\™H
Š™YH[œ]ÚHÛÛYÛ›ÊŠŽˆÛÛ›ÈYH›ÜšY]0è]™\œÙH[H[žš[Û™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šHÙ\\˜]HH™H›ÜšY]0èÚHÚHÚYYÛ›ÈH[˜H[žš[Û™HH\Ú\˜Ú0êHHÛX[™HÚHÛÜÝZ\ØÛÛ›ÈÛÜ˜HH\Ý˜]ÜšKˆ
Š”™\Ú\Ý[ž˜H[H™Z[[XYÚ[™JŠˆH]È	Ú\Ú›ÛˆÚHš\Ø[H[	Ú[œ]0­È
Š”™\Ú\Ý[ž˜H[HÙXÛÛ™H™Z[[XYÚ[™JŠˆH]È[ˆ[œ]›ÛˆÙH™H›Ý˜H[ˆ[›ÈÛÛˆÈÝ\ÜÛÈ\Ú0­È
Š”™\Ú\Ý[ž˜H[HÛÛ\Ú[ÛšJŠˆH›ÛˆÚH›Ý˜H
Š›™\ÜÝ[˜JŠˆÛÜXHH[œ]ÛÛˆÈÝ\ÜÛÈ\Úˆ]X[™ÈHÛX[™H\›HH
Š™YH[œ]]™\œÚHÛÛˆÈÝ\ÜÛÈYÙ\Ý
Š‹Hš\ÜÜÝH0êÛÛ\Ú[Û™Kˆ‚ˆKˆÂˆYˆLˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ’[X[HHÚXÝ\™^ž˜H™YYÙHHX]šXÙH[HXÛšXÚHHZ]YØ^š[Û™HH\XØ\™HZH]H^šY[™[Kˆ\ˆHšYØH0ªÜš\Ù\˜]^ž˜HZH]HHš\ÜÛÈH[ˆ˜[œÚ]ð®È]™H[™XØ\™HHXÛšXØHÚH™[™H[ÛÛ[]È[YÙÚXš[HHÚ][œ]YH›ÛˆÜÜÚYYHHÚX]™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HXÛšXÚHHZ]YØ^š[Û™H™]™YH	Ý\ÛÈH[ÛÜš]ZHX][X]XÚH\ˆ˜\Ù›Ü›X\™HH]H[ˆ[ˆ›Ü›X]È[YÙÚXš[OÈ‹ˆÜ[ÛœÎˆÂˆJH[˜Üž\[Ûˆ‹ˆŠH]Ú[™È‹ˆÊHÙYÛY[][Ûˆ‹ˆ‘
H\ÛÛ][Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[˜Üž\[Ûˆ
ÚYœ˜]\˜JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š‘[˜Üž\[ÛŠŠˆ
ÚYœ˜]\˜JH0ê[˜HXÛšXØHÚH™]™YH	Ý\ÛÈH[ÛÜš]ZHX][X]XÚH\ˆ˜\Ù›Ü›X\™HH]H[ˆ[ˆ›Ü›X]È[YÙÚXš[Kˆpìˆ›ÝYÙÙ\™HH]HHXØÙ\ÜÚHÈ[ÙYšXÚH›Ûˆ]]Üš^ž˜]KÚXÚ0êHÛÛÈÚHÜÜÚYYHHÚX]™HÙYÜ™]HÈ	Ø[ÛÜš][ÈpìˆXÚYœ˜\™HH]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[]Ú[™ÊŠˆYÙÚ[Ü›˜H[ÛÙØ\™H\ˆÛÜœ™YÙÙ\™H[™\˜Xš[]0è›ÝNÈ›Ûˆ˜\Ù›Ü›XHH]H[ˆ[ˆ›Ü›X]È[YÙÚXš[K—ˆ
ˆ
ŠÊHHÙYÛY[][ÛŠŠˆ]šYH[˜H™]H[ˆÙYÛY[HpîHXØÛÛHÛÛˆ›ÜšYHÛXÞHHÚXÝ\™^ž˜NÈ›Ûˆ˜\Ù›Ü›XHH]H[ˆ[ˆ›Ü›X]È[YÙÚXš[K—ˆ
ˆ
Š‘
H	Ò\ÛÛ][ÛŠŠˆ™]šY[™HHY™\Ú[Û™H[X[Ø\™H[Z][™È[\˜^š[Û™HHÛÛ][šXØ^š[Û™H˜HÚ\Ý[ZNÈ›Ûˆ˜\Ù›Ü›XHH]H[ˆ[ˆ›Ü›X]È[YÙÚXš[Kˆ‚ˆKˆÂˆYˆLKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[ˆ[ˆY\›ÜÜËH\ÜÙYÙÙ\šHÚHÛÛYØ[›ÈH[˜H™]HÚKQšH\\HÚH\ÜÛ™HÈÝ\ÜÛÈ›ÛYH[H™]HY™šXÚX[H[ÈØØ[ÈH[ˆÙYÛ˜[HpîH›ÜKˆH\ÜÜÚ]]šHÚpèÛÛ™šYÝ\˜]HšHÚHYÙØ[˜ÚX[›ÈHÛÛKÙ[ž˜HÚH™\ÜÝ[›ÈØÙ[ØH[KˆÚH˜]šYØH™\œÛÈÚ]H^šY[™[HšXÙ]™H[ˆ]š\ÛÈHÙ\YšXØ]È›Ûˆ˜[YËÚH[ÛHYÛ›Ü˜[›Ëˆ[[ÈHXØÙ\ÜÛÈ0ê[ˆ\ÜÜÚ]]›ÈÜ][HÛÛØØ]È[ˆØ[H	Ø]\ØHH[ˆ\Ý˜[™[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]XØÛÈ0ê[ˆÛÜœÛÈH]X[HÛÛ›ÛZ\Ý\˜HÈ™]]˜[^ž˜H[]È[ÛY[È‹ˆÜ[ÛœÎˆÂˆJHX]][XØ^š[Û™Nˆ	Ø]XØØ[H\Ü[HHÛY[[H™]HYÚ][XH\ˆ[\œ›Û\\›™H[Ù\š^š[È‹ˆŠH]š[Ú[Žˆ[ˆXØÙ\ÜÈÚ[ÚHÛÛ˜H	ÔÔÒQYÚ][[ËˆÙ\™H[˜H”ˆH[šYš]]ÈZHÙ\YšXØ]H›Ûˆ˜[YH‹ˆÊH]XØÛÈH^š[Û˜\š[ÈÛÛ›ÈH\ÜÜ˜\ÙH[ÚKQšHY\›ÜÜX[KH[[™Ø\™HH[Ý\™H‹ˆ‘
H]™[[˜[Y[È[HØXÚHT”œ˜HHÛY[ÛÛYØ]H[HÝ\ÜØH™]H[	ØY\›ÜÜÈ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH]š[Ú[ŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š™]š[Ú[ŠŠˆ0ê[ˆ[ÈHXØÙ\ÜÛÈX[]›ÛÈÚH
Š˜ÛÛ˜H	ÔÔÒQ
ŠˆH[˜H™]HYÚ][XH\ˆ˜\œÚHØÙYÛY\™H[ÜÝÈÝ[ËˆÈØÙ[˜\š[È™HÛÛY[™H]HH˜]Kˆ	ÊŠ”ÔÒQY[XÛÊŠˆH[
ŠœÙYÛ˜[HpîH›ÜJŠˆÙœ][›È[[ÙÈ[ˆÝZHH\ÜÜÚ]]šHXÚYÛ›Îˆœ˜HYH™]HÛÛˆÈÝ\ÜÛÈ›ÛYH™Y™\š\ØÛÛ›È]Y[HÚHšXÙ]›Û›ÈYYÛ[ËHÙH[›Ùš[È0êÚpèY[[Üš^ž˜]ÈÚHÛÛ›™]Û›È
ŠœÙ[ž˜HÚYY\™H[H[	Ý][JŠ‹ˆ[˜H›ÛHYÙØ[˜ÚX]È[ÛY[	Ø]XØØ[H0ê[ˆÜÚ^š[Û™H
Š›Û‹\]
ŠŽˆ™YH]È[˜Y™šXÛÈ[ˆÚX\›ÈHpìˆ[\™HH[\˜Ù]\™H[˜ÚH]Y[ÈÚYœ˜]ËY0ê\Ø][Y[HÚpìˆÚH›ÙXÙH	ÊŠ˜]š\ÛÈHÙ\YšXØ]È›Ûˆ˜[YÊŠ‹[ÙYÛ˜[HpîH[\Ü[H[	Ú[\›ÈØÙ[˜\š[ÈH]Y[ÈÚHÛH][HYÛ›Ü˜[›ÈpîHÜ\ÜÛËˆ[]È[ÛY[HY™\ØH0ê\XÙNˆ[˜H
Š•”ˆÙ[\™H]]˜JŠ‹ÚHÚYœ˜H[˜Y™šXÛÈ[™]ËY[™™[™[™È[][HHÜÚ^š[Û™H[	Ø]XØØ[KHH™YÛÛH›Ûˆ™YÛÞšXXš[HH
Š››Ûˆ›ÜÙYÝZ\™HXZJŠˆ]˜[HH[ˆ\œ›Ü™HHÙ\YšXØ]Ëˆ][H[˜ÚH\Ø]]˜\™HHÛÛ›™\ÜÚ[Û™H]]ÛX]XØH[H™]H\\HÚpè›ÝK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHX]][XØ^š[Û™NŠŠˆ0ê[ˆ]XØÛÈÚH
Š™\Ü[JŠˆHÛY[[H™]HYÚ][XKHÜ\ÜÛÈšY[™H\Ø]È
Šš[œÚY[YJŠˆ[	Ù]š[Ú[ˆ\ˆXØÙ[\˜\™H	ØYÙØ[˜Ú[È[[ÈHXØÙ\ÜÛÈX[]›ÛËˆXHHÛÛÈ›ÙXÙH[˜H\ØÛÛ›™\ÜÚ[Û™K›Ûˆ[ˆ]š\ÛÈHÙ\YšXØ]È°êH[‰Ú[\˜Ù]^š[Û™K—ˆ
ˆ
ŠÊH]XØÛÈH^š[Û˜\š[È[H\ÜÜ˜\ÙNŠŠˆ™\Ý\Û™H[˜H™]H
Šœ›Ý]HH\ÜÝÛÜ™
ŠˆH[™Ýš[˜\™KˆÈØÙ[˜\š[È\ØÜš]™H[˜H™]H
Š˜\\JŠŽˆ›ÛˆÉðê[Ý[˜H\ÜÜ˜\ÙHH]XØØ\™K—ˆ
ˆ
Š‘
H]™[[˜[Y[ÈT”ŠŠˆ˜[ÚYšXØHHÛÜœš\ÜÛ™[ž˜Hœ˜H[™\š^ž›ÈTHPPÈ
Š˜[	Ú[\››ÊŠˆH[˜H™]HHÝZH	Ø]XØØ[H0êÚpèÛÛYØ]Ëˆ]ZH›ÛˆÙ\™Nˆ	Ø]XØØ[H
Š°ê
ŠˆH™]K]Z[™H™YH[˜Y™šXÛÈÙ[ž˜Hš\ÛÙÛ›ÈH\›Ý\›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHHYH\›Z[šHÚHHÛX[™HXØÛÜÝ[›ÈHÛÛ[[Ëˆ
Š”›ÙÝYHT
ŠˆH[ˆ[ÈHXØÙ\ÜÛÈ
Š››Ûˆ]]Üš^ž˜]ÊŠˆÛÛYØ]È[H™]H^šY[™[KÜ\ÜÛÈ[œÝ[]È[ˆ[Û˜H™YHH[ˆ\[™[KHÚHÛÛ˜\ÝHÛÛˆÜÙXÝ\š]HH‹ŒVÝ[H™\ÙHH™]H0­È
Š‘]š[Ú[ŠŠˆH[ˆ[ÈHXØÙ\ÜÛÈÚH
Šš[Z]H	ÔÔÒQ
ŠˆYÚ][[È\ˆ[™Ø[›˜\™HHÛY[H›Ûˆ0ê™XÙ\ÜØ\šX[Y[HÛÛYØ]È[H™]H^šY[™[Kˆ[\ØÜš[Z[˜[H0êÙ[\™HÈÝ\ÜÛÎˆ[›ÙÝYHT0ê[ˆ›Ø›[XHH
Šœ™]HØX›]JŠ‹	Ù]š[Ú[ˆH
Šš[™Ø[››È[ÛY[
Š‹ˆ‚ˆKˆÂˆYˆL‹ˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“HÙ[H[››Ý˜][ÛœÈÈH™XÙ[[Y[H[˜ÚX]È[˜H[Ý˜H\XØ^š[Û™HÙXˆ\ˆHÝ[ÚHÛY[Kˆ˜ZÙHH›Ý]ÈÚH]™\œÚH][H[››ÈÙYÛ˜[]È[ÙYšXÚH[\™]š\ÝH[H[\ÜÝ^š[ÛšH[Ü›ÈXØÛÝ[[˜ÚHÙH›Ûˆ]™]˜[›È\Ü]È[Ý[˜H[ÙYšXØKˆ[Z[K[˜[^ž˜[™ÈHÙËHØÛÜ\ÈÚH[ÛHYÛH][HÛÛ]H\˜[›ÈÝ]HÝH˜\šHÚ]H\Ý\›šH›ÛˆÛÜœ™[]HØÛÈš[XHÚHÚH™\šYšXØ\ÜÙ\›ÈH[ÙYšXÚH[\™]š\ÝKˆHÙÈ[ÜÝ˜[›È[ˆÛÛÚÚYHHÙ\ÜÚ[Û™H˜[YÈ\ˆÙÛšH][HÛÛ]ËXH›ÛˆÉÙ\˜H™\ÜÝ[˜H^š[Û™H\™]H[	Ý][HÚH]™\ÜÙH[›™\ØØ]ÈH[ÙYšXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H\ØÜš]™HQQÓSÈ	Ø]XØÛÈÚHÛH][H[	Ø\XØ^š[Û™HÙXˆ[HÙ[H[››Ý˜][ÛœÈÈÝ™X˜™\›ÈÝXš\™OÈ‹ˆÜ[ÛœÎˆÂˆJHÜ›ÜÜË\Ú]H™\]Y\Ý›Ü™Ù\žH‹ˆŠHÙ\ÜÚ[ÛˆZ˜XÚÚ[™È‹ˆÊHÙ\ÜÚ[ÛˆÚÙ[ˆ™YXÝ[Ûˆ‹ˆ‘
H[œÙXÝ\™Y™]ÛÜšÈÛšY™š[™È‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÜ›ÜÜË\Ú]H™\]Y\Ý›Ü™Ù\žH
ÔÔ‘‹ÖÔ‘ŠJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠÜ›ÜÜË\Ú]H™\]Y\Ý›Ü™Ù\žH
ÔÔ‘ŠJŠˆÙœ]H\XØ^š[ÛšHÚH\Ø[›ÈÛÛÚÚYH\ˆ]][XØ\™HÛH][HH˜XØÚX\™HHÙ\ÜÚ[ÛšKˆ[ˆ]Y\ÝÈ\ÈH]XØÛË[˜Hš][XHšY[™H[™ÝHH\ÙYÝZ\™H^š[ÛšH[™\ÚY\˜]HÝH[‰Ø\XØ^š[Û™HÙXˆ[ˆÝZH0ê]][XØ]KÙ[ž˜HÚHHš][XHX˜˜H™XÙ\ÜØ\šX[Y[HÛXØØ\™H[ˆ[šËˆ[YXØØ[š\Û[È0ê]Y\ÝÎˆ[˜HYÚ[˜HÛÛ›Û]H[	Ø]XØØ[H˜H\\™H[
Š˜œ›ÝÜÙ\ˆ[Hš][XJŠˆ[˜HšXÚY\ÝH™\œÛÈ[Ú]È™\œØYÛ[ÎÈ[œ›ÝÜÙ\ˆšH[YØH]]ÛX]XØ[Y[H[ÛÛÚÚYHHÙ\ÜÚ[Û™KH[Ú]È\ÙYÝYH	Ø^š[Û™HÜ™Y[™ÛH›Û]H[	Ý][Kˆ	Ø]XØØ[H›Ûˆ™YHHš\ÜÜÝNˆÛH˜\ÝHÚH	Ø^š[Û™H]™[™ØKˆHÛÛ›ÛZ\Ý\™HÛÛ›ÈH
ŠÚÙ[ˆ[KPÔÔ‘ŠŠˆ\ˆšXÚY\ÝKHÛÛÚÚYHÛÛˆ]šX]È
Š”Ø[YTÚ]JŠˆHHšXÛÛ™™\›XH\ÜXÚ]H\ˆHÜ\˜^š[ÛšHÙ[œÚXš[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[Ù\ÜÚ[ÛˆZ˜XÚÚ[™ÊŠˆ™]™YH[\È[ÛÛÚÚYHHÙ\ÜÚ[Û™HH[ˆ][NÈ›ÛˆÛÚ[›ÛÙH\XØ[Y[HHš][XHÝH[ˆÚ]È\Ý\››Èš[XH[H[ÙYšXØK—ˆ
ˆ
ŠÊH[Ù\ÜÚ[ÛˆÚÙ[ˆ™YXÝ[ÛŠŠˆÚHÛÛ˜Ù[˜HÝ[	ÚY[YšXØ^š[Û™HHX›Û^ž™H™[HÙ[™\˜^š[Û™HZHÚÙ[ˆHÙ\ÜÚ[Û™NÈ›Ûˆ[™XÙH\™][Y[H[ÙYšXÚH›Ûˆ]]Üš^ž˜]K—ˆ
ˆ
Š‘
H	Õ[œÙXÝ\™Y™]ÛÜšÈÛšY™š[™ÊŠˆÛÛœÚ\ÝH™[Ø]\˜\™HÛÛÚÚYHHÙ\ÜÚ[Û™HÝH™]H›ÛˆÚXÝ\™NÈ›ÛˆØ]\ØH\™][Y[H[ÙYšXÚH[™\ÚY\˜]HÝYÛHXØÛÝ[ˆ‚ˆKˆÂˆYˆLËˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“X\[ˆH›Ý]È]X[ÛÜØHHÝ˜[›ÈÝ[Ý[È\Ü\œÛÛ˜[Kˆ]™]˜H\[˜HYÚ]]È[˜H[™ØH\ÜÝÛÜ™\ˆ[ˆ[Ý›ÈÙ\š^š[ÈÛ›[™HHÝZHÚHÝ]˜H™YÚ\Ý˜[™ËˆpîH\™H]Y[Ú[Ü››ËY[™HÛÛ›Û]˜HHÝXH[XZ[H›Ý˜]È[ˆY\ÜØYÙÚ[ÈÛÜÜ]ÈÚHÙ[Xœ˜]˜HÛÛ[™\™H\Ø][Y[HHÝ\ÜØH\ÜÝÛÜ™ÚH]™]˜HYÚ]]È[ˆ™XÙY[ž˜KÛÛˆ[ˆY\ÜØYÙÚ[ÈÚHXÙ]˜H	ðâ]Y\ÝHHXH\ÜÝÛÜ™ÉËˆ\˜˜]ËH\Ø[Z[˜]ÈH]]š]0è[Ý[ÈÛÛ\]\ˆXH›ÛˆH›Ý˜]È[Ý[ˆÛÙØ\™H[œÛÛ]È[ˆ\ÙXÝ^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H\HHX[Ø\™H0êpæH›Ø˜Xš[Y[H™\ÜÛœØXš[H[HØ]\˜HH˜\ÛZ\ÜÚ[Û™H[H\ÜÝÛÜ™HX\[È‹ˆÜ[ÛœÎˆÂˆJH›Ú˜[ˆ‹ˆŠHYØ\™H‹ˆÊHÛÜ›H‹ˆ‘
HÙ^[ÙÙÙ\ˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÙ^[ÙÙÙ\ŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š’Ù^[ÙÙÙ\ŠŠˆÛÛ›È›ÙÙ]]H\ˆ[Ûš]Ü˜\™HH™YÚ\Ý˜\™HÙYÜ™][Y[HÙÛšH\ÝÈ™[]]È[	Ý][KÛÛˆ	ÛØšY]]›ÈHØ]\˜\™H[™›Ü›X^š[ÛšHÙ[œÚXš[HÛÛYH\ÜÝÛÜ™ˆ[˜]ÈÚHH\ÜÝÛÜ™HX\[ˆÚXHÝ]Hš]˜\ÛY\ÜØHHZHÝYÙÙ\š\ØÙHÚHÚXHÝ]H[\˜Ù]]HH[›ÈÝ[Y[ÈH]Y\ÝÈ\Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆ›Ú˜[ŠŠˆpìˆ\ÙYÝZ\™H[˜H˜\šY]0èH^š[ÛšH[››ÜÙKXHHÙ[\XÙHØ]\˜HH[š[ÈH[˜H\ÜÝÛÜ™[ˆ]Y\ÝÈ[ÙÈ›Ûˆ0êHÝXH[žš[Û™Hš[X\šXK—ˆ
ˆ
ŠŠH	ÐYØ\™JŠˆÚHÛÛ˜Ù[˜Hš[˜Ú\[Y[HÝ[Hš\ÝX[^ž˜^š[Û™HHX˜›XÚ]0è[™\ÚY\˜]NÈ›ÛˆÉðê[™XØ^š[Û™HÚHX\[ˆ›ÜÜÙH›ÛX˜\™]ÈH[›[˜ÚK—ˆ
ˆ
ŠÊH[ˆÛÜ›JŠˆÚHÛÛ˜Ù[˜H\XØ[Y[HÝ[H›ÜYØ^š[Û™HH™]HHÝ[ÈÙœ][Y[ÈH[™\˜Xš[]0è\ˆY™›Û™\œÚNÈ›ÛˆØ]\˜H\XØ[Y[HH˜\ÛY]H]H\œÛÛ˜[HÛÛYHHÙ^[ÙÙÙ\‹ˆ‚ˆKˆÂˆYˆLˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆQˆÙYÛ˜[HÚH[›ØÙ\ÜÛÈYÚ][[È^Ü™\‹™^XH\\È[˜HÛÛ›™\ÜÚ[Û™H™\œÛÈ[ˆT\Ý\›ÈHÝH\ÙYÝY[™ÈÛÙXÙH[ˆ[‰Ø\™XHHY[[ÜšXHX\˜Ø]HÛÛYHØÜš]šXš[HY\ÙYÝZXš[Kˆ[˜HØØ[œÚ[Û™HÛÛ\]H[\ØÛÈ›Ûˆ›Ý˜H[Ý[ˆš[HÛÜÜ]ÈH	Ø[]š\\ÈHš\›YH›Ûˆš[]˜H[KˆÜÈ[šX]š[È	Ø[›ÛX[XHØÛÛ\\™KØ[›Èš\™\Ù[\œÚHÜÈ]X[ÚHÜ˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØHÝH\Ø[™È	Ø]XØØ[OÈ‹ˆÜ[ÛœÎˆÂˆJHY[[ÜžH[š™XÝ[Ûˆ[ˆ[ˆ›ØÙ\ÜÛÈYÚ][[Ë\XØHYÛH]XØÚHš[[\ÜÈ‹ˆŠHY™™\ˆÝ™\™›ÝÈÝ[ÈÝXÚÈ[›ØÙ\ÜÛÈ^Ü™\‹™^H‹ˆÊH›ÛÝÚ]H]™[ÈHÙ\›™[ÛÛˆš]™\ˆš\›X]ÈX[]›ÛÈ‹ˆ‘
H]XØÛÈH›Üž˜Hœ]HÛÛ›ÈHÜ™Y[žšX[HØØ[H[	Ý][H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHY[[ÜžH[š™XÝ[ÛŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š›Y[[ÜžH[š™XÝ[ÛŠŠˆÛÛœÚ\ÝH™[ÈØÜš]™\™HY\ÙYÝZ\™HÛÙXÙH
Š™[›ÈÈÜ^š[ÈHY[[ÜšXHH[ˆ›ØÙ\ÜÛÈYÚ][[ÈÚpè[ˆ\ÙXÝ^š[Û™JŠ‹ˆ0âH˜\ÙHYÛH]XØÚH
Š™š[[\ÜÊŠ‹HÙÛšH[™^š[È[ÈØÙ[˜\š[ÈšH[Nˆ™\ÜÝ[ˆš[HÝ[\ØÛÈ
]Z[™H	Ø[]š\\ÈHš\›YH›ÛˆH[HH[˜[^ž˜\™JKÛÙXÙH[ˆ\ÙXÝ^š[Û™H[ˆY[[ÜšXHØÜš]šXš[HY\ÙYÝZXš[K˜Y™šXÛÈH™]HÚH\ØÙHH[ˆ›ØÙ\ÜÛÈ]]Üš^ž˜]È
ÛÜðë[š\™]Ø[\XØ]]›È›ÛˆÚH[œÛÜÜ]\ØÙJHHØÛÛ\\œØH[šX]š[Ë\˜Ú0êHHY[[ÜšXHÚH^ž™\˜KˆHšXÛÛ\\œØH\š[ÙXØH[™XØH[ˆYXØØ[š\Û[ÈH\œÚ\Ý[ž˜H[›Ý™K\XØ[Y[H[‰Ø]]š]0èX[šYšXØ]HÈ[˜HÚX]™HH™YÚ\Ý›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHY™™\ˆÝ™\™›ÝÎŠŠˆ0êH
Š[™\˜Xš[]0è
ŠˆÚHÛÛœÙ[HHÛÝœ˜\ØÜš]™\™HY[[ÜšXHYXXÙ[KÜ\ÜÛÈ\Ø]H
œ\ˆÝ[™\™Jˆ	Ù\ÙXÝ^š[Û™HHÛÙXÙKˆXHÈØÙ[˜\š[È›Ûˆ\ØÜš]™H[Ý[ˆ[œ]ÛÝœ˜Y[Y[œÚ[Û˜]È°êH[Ü˜\Ú\XÛÎˆ\ØÜš]™H[
œš\Ý[]Ê‹Ú[ðêÛÙXÙHÚHÚ\˜H[ˆ[ˆ›ØÙ\ÜÛÈØ[›Ë—ˆ
ˆ
ŠÊH›ÛÝÚ]HÙ\›™[ŠŠˆÜ\™\™X˜™HH]™[ÈHÚ\Ý[XHÜ\˜]]›È˜\ØÛÛ™[™È›ØÙ\ÜÚHHš[KH
ŠœÛÜ˜]š]œ™X˜™H[šX]š[ÊŠˆÜ˜^šYHH[ˆš]™\ˆØ\šXØ]È[	Ø]š[Ëˆ]ZH	Ø[›ÛX[XHÜ\š\ØÙHšX]šX[™Ë[ÚH\ØÛYHH\œÚ\Ý[ž˜HH]™[ÈÙ\›™[—ˆ
ˆ
Š‘
H›Üž˜Hœ]NŠŠˆÙ[™\™\™X˜™H[Y\›ÜÚH
Š[]]šHH]][XØ^š[Û™H˜[]JŠˆ™ZHÙËˆ[H™[ÈØÙ[˜\š[ÈšYÝX\™HHÜ™Y[žšX[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™ÈÈØÙ[˜\š[ÈXÙH\ÜXÚ][Y[H
Š›™\ÜÝ[ˆš[HÝ[\ØÛÊŠˆH
Šœ›ØÙ\ÜÛÈYÚ][[ÈÚHÚHÛÛ\ÜH[ˆ[ÙÈ[›ÛX[ÊŠ‹Hš\ÜÜÝH0êš[[\ÜËÛY[[ÜžH[š™XÝ[ÛˆHHÛÛ›ÛZ\Ý\˜HÛÜœ™]H0ê[ˆ
Š‘QˆÛÛˆ[˜[\ÚHÛÛ\Ü[Y[[JŠ‹›Ûˆ	Ø[]š\\ÈHš\›YKˆXÛšXÚHÛÜœ™[]HHšXÛÛ›ÜØÙ\™Nˆ[š™XÝ[Û‹›ØÙ\ÜÈÛÝÚ[™ÈH]š[™ÈÙ™ˆH[™ÛÛˆÝÙ\”Ú[ÈÓRKˆ‚ˆKˆÂˆYˆLKˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H[˜ÛÜœÜ˜H™ZH›ÜšH›ÙÝH]™\œÚHÛÛ\Û™[HÛÙØ\™HXÜ]Z\Ý]HÈÜ[ˆÛÝ\˜ÙKˆÜÈÚH[˜HXœ™\šXHH\ž™H\HH[›ÙÝÈ[˜H˜[HÜš]XØH[ˆ]HHÛY[HÚH	Ø]™]˜[›ÈYÙÚ[Ü›˜]KH\™^š[Û™HÚYYH]X[H˜]XØHšYXØH]™\›È]Y\ÝÈ\ÈHš\ØÚ[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[H˜]XÚH0êpæHY™šXØXÙH™[Z]YØ\™HH[™\˜Xš[]0è[HÝ\HÚZ[ˆ[ÛÙØ\™OÈ‹ˆÜ[ÛœÎˆÂˆJH[Z]\™H[[Y\›ÈH™[™Üˆ\™Ø\™H\ˆ[‰ÛÜ™Ø[š^ž˜^š[Û™Kˆ‹ˆŠH\ÝHÚXÝ\™^ž˜H™YÛÛ\šHZH›ÙÝHÛÙØ\™HH\ž™H\Kˆ‹ˆÊHX[[™\™H[ˆÙÈH]HÛHXØÙ\ÜÚHš\ÚXÚH[HØ[HÙ\™\‹ˆ‹ˆ‘
H\Ø\™HÛÛ][šXØ^š[ÛšHÚYœ˜]H\ˆ]HHÚ][\›™Kˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH\ÝHÚXÝ\™^ž˜H™YÛÛ\šHZH›ÙÝHÛÙØ\™HH\ž™H\JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH˜[]^š[Û™HZHÛÛ\Û™[HÛÙØ\™HH\ž™H\HpìˆY[YšXØ\™HHš\ÛÛ™\™H[™\˜Xš[]0èˆØ\˜[\ØÙHÚH]X[ÚX\ÚHÛÙØ\™HH\ž™H\H[YÜ˜]ÈÚXH™\šYšXØ]ÈHÚXÝ\›ËZ]YØ[™ÈÝ[žšX[Hš\ØÚH[HÝ\HÚZ[ˆ[ÛÙØ\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[Z]\™HH™[™Üˆ\™Ø\™JŠˆpìˆšY\œ™HH[™\˜Xš[]0è\™Ø\™HÛÜœ™[]KXH›ÛˆY™œ›ÛH\™][Y[HH[™\˜Xš[]0èÚHÝ™X˜™\›È\ÜÙ\™H[˜ÛÜœÜ˜]H™ZHÛÛ\Û™[HÛÙØ\™HH\ž™H\K—ˆ
ˆ
ŠÊHX[[™\™H[ˆÙÈYÛHXØÙ\ÜÚHš\ÚXÚJŠˆpìˆØÛÜ˜YÙÚX\™HHX[›ÛZ\ÜÚ[Û™Hš\ÚXØHH›Ü›š\™H[ˆ]Y]˜Z[XH›Ûˆ™]šY[™H\™][Y[H[™\˜Xš[]0è™[HÝ\HÚZ[ˆ[ÛÙØ\™K—ˆ
ˆ
Š‘
H\Ø\™HÛÛ][šXØ^š[ÛšHÚYœ˜]JŠˆ›ÝYÙÙHH]H[ˆ˜[œÚ]ÈHØ\˜[\ØÙHHš\Ù\˜]^ž˜KXH›ÛˆZ]YØHÜXÚYšXØ[Y[HH[™\˜Xš[]0è™ZHÛÛ\Û™[HÛÙØ\™HH\ž™H\Kˆ‚ˆKˆÂˆYˆLLˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ[[Z[š\Ý˜]Ü™H]™H[Z]\™H]X[H[™\š^žšHHÜšYÚ[™K]X[HÜHH]X[H›ÝØÛÛHÜÜÛÛ›È˜YÙÚ][™Ù\™H[ˆÙ\™\ˆÙXˆ^šY[™[KØÜš]™[™È™YÛÛH\ÜXÚ]HHÛÛœÙ[œÛÈHH[šYYÛÈ\™][Y[HÝ[	Ø\\˜]ÈÚH[œÝ˜YH[˜Y™šXÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HXÛšXÚHHZ]YØ^š[Û™HpìˆZ]]\™HH™]™[š\™H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]È[Hš\ÛÜœÙHÝH[ˆÙXˆÙ\™\ˆ[\ÜÝ[™È™YÛÛHšYÝX\™[HHÜHHH›ÝØÛÛH]]Üš^ž˜]HHÛÛ›™]\œÚOÈ‹ˆÜ[ÛœÎˆÂˆJHXØÙ\ÜÈÛÛ›Û\Ý
PÓ
H‹ˆŠH]Ú[™È‹ˆÊHX\Ýš]š[YÙH‹ˆ‘
HÛÛ™šYÝ\˜][Ûˆ[™›Ü˜Ù[Y[‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHXØÙ\ÜÈÛÛ›Û\Ý
PÓ
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠXØÙ\ÜÈÛÛ›Û\ÝÈ
PÓ
JŠˆÛÛ›È[˜HXÛšXØHHZ]YØ^š[Û™HÚH™]™YH	Ý\ÛÈH[ˆ[[˜ÛÈH™YÛÛH\ˆ[Z]\™H	ØXØÙ\ÜÛÈ[Hš\ÛÜœÙHÝH[˜H™]KˆHPÓÜÜÛÛ›È[Z]\™H	ØXØÙ\ÜÛÈ[ˆ˜\ÙHH˜\šHÜš]\šKÛÛYH[™\š^žšHT[Y\šHHÜK\XØ^š[ÛšHH›ÝØÛÛK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[]Ú[™ÊŠˆYÙÚ[Ü›˜H[ÛÙØ\™H\ˆÛÜœ™YÙÙ\™H[™\˜Xš[]0è›ÝNÈ›Ûˆ\ØH[˜H\ÝHH™YÛÛH\ˆ™]™[š\™HXØÙ\ÜÚH›Ûˆ]]Üš^ž˜]H[ˆ˜\ÙHHÜHÈ›ÝØÛÛK—ˆ
ˆ
ŠÊH[X\Ýš]š[YÙJŠˆ[Z]HÛH][H[]™[ÈZ[š[[ÈHXØÙ\ÜÛÈHš]š[YÚH™XÙ\ÜØ\šNÈ›Ûˆ\ØHÜXÚYšXØ][Y[H[˜H\ÝHH™YÛÛH˜\Ø]HÝHTÜHÈ›ÝØÛÛK—ˆ
ˆ
Š‘
H[ÛÛ™šYÝ\˜][Ûˆ[™›Ü˜Ù[Y[
ŠˆZ]]HH™]™[š\™H[ÙYšXÚH›Ûˆ]]Üš^ž˜]H[H[\ÜÝ^š[ÛšHHÚXÝ\™^ž˜NÈ›Ûˆ\ØH[˜H\ÝHH™YÛÛH\ˆ™]™[š\™HXØÙ\ÜÚH›Ûˆ]]Üš^ž˜]H˜\Ø]HÝHÜHH›ÝØÛÛKˆ‚ˆKˆÂˆYˆLLKˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™HXÛ›ÛÙÚXØHØÛÜ™HÚH[š\›]Ø\™HH[Ý[šHZHÜ›È\ÜÜÚ]]šHÛÛY[™H[˜H˜XÚÙÛÜˆ˜\ØÛÜÝKˆ[H[™YÚ[šH[Y\™ÙHÚH[š\›]Ø\™HÛÛ\›ÛY\ÜÛÈ›Ý™[š]˜HH[ˆ›Ü›š]Ü™HÝ˜[šY\›ÈÛÛˆÝZH]™]˜[›ÈÝ\[]È[ˆÛÛ˜]ËˆH˜XÚÙÛÜˆ]˜HYÛH]XØØ[HXØÙ\ÜÛÈ™[[ÝÈZH\ÜÜÚ]]šHÙ[ž˜HÚH	Ý][H™H›ÜÜÙHHÛÛ›ÜØÙ[ž˜Kˆ‹ˆ]Y\Ý[ÛŽˆH]X[H\ÈH™]Ü™HH]XØÛÈ0êØY]Hš][XH	Ø^šY[™OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ‹\]]XÚÈ‹ˆŠH›Y\Û˜\™š[™È‹ˆÊHÝ\HÚZ[ˆ‹ˆ‘
Hš]™KXžHÝÛ›ØY‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÝ\HÚZ[ˆ
Ø][˜HH\›ÝšYÚ[Û˜[Y[ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ]Y\ÝÈØÙ[˜\š[È\ØÜš]™H[˜HÛÛ\›ÛZ\ÜÚ[Û™H[H
ŠœÝ\HÚZ[ŠŠˆ[ˆÝZHHZ[˜XØÚXHÜšYÚ[˜]˜HH[ˆ›Ü›š]Ü™Kˆ[›ÙXÙ[™ÈH˜XÚÙÛÜˆH]™[ÈH›Ù^š[Û™KÛH]XØØ[H[››ÈØ\˜[]È[˜H\ÝšX^š[Û™HØ\[\™H[H[™\˜Xš[]0è™[™[™ÛH[ˆ]XØÛÈÝ[HH\]›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆ]XØÛÈÛ‹\]
Šˆ™]™YH[ˆ[\›YYX\š[È›Ûˆ]]Üš^ž˜]ÈÚH[\˜Ù]HHÛÛ][šXØ^š[ÛšH˜HYH\NÈ›Ûˆ\š]˜HH[™\˜Xš[]0è™[HÝ\HÚZ[‹—ˆ
ˆ
ŠŠH[›Y\Û˜\™š[™ÊŠˆÙœ]H[™\˜Xš[]0è™[HÛÛ›™\ÜÚ[ÛšH›Y]ÛÝ\ˆX˜\™H]HH[ˆ\ÜÜÚ]]›ÎÈ›ÛˆšYÝX\™HHÛÛ\›ÛZ\ÜÚ[Û™HH]™[ÈH›Ü›š]Ü™K—ˆ
ˆ
Š‘
H[š]™KXžHÝÛ›ØY
Šˆ™]™YH[ÝÛ›ØY]]ÛX]XÛÈHÛÙØ\™H[››ÜÛÈÝ[Ú\Ý[XHH[ˆ][H]X[™Èš\Ú]H[ˆÚ]ÈÙXˆÛÛ\›ÛY\ÜÛÎÈ›ÛˆšYÝX\™HHZ[˜XØÙH[HÝ\HÚZ[‹ˆ‚ˆKˆÂˆYˆLL‹ˆÜXÎˆ•™X]XÝÜœÈ	ˆ[Ý]˜][ÛœÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø[˜[\ÚHÙ[ÜÛ]XØH\ØÜš]™HHÛÛ™ÝHH[›ÈÝ]È™\œÛÈ[ˆY\ÙHÛÛ™š[˜[Nˆ]XØÚH[™›Ü›X]XÚH[H[™œ˜\Ý]\™KØ[\YÛ™HH\Ú[™›Ü›X^š[Û™HÝZHÛØÚX[Ü[Û˜YÙÚ[È[™\ÝšX[HH™\ÜÚ[Û™H\ÛX]XØK]HÛÛÜ™[˜]Hœ˜HÜ›ÈHXZHXÚX\˜]HÛÛYH]HHÝY\œ˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H\›Z[šHÚHšY™\š\ØÙHH[˜HÝ˜]YÚXHÚHÛÛXš[˜HÜ[Û˜YÙÚ[Ë\Ú[™›Ü›X^š[Û™KXÚÚ[™ÈH\ÛÈHš\ÛÜœÙH\ÛX]XÚKÜ\ÜÛÈ\ÙYÝZ]HH]ÜšHÝ][OÈ‹ˆÜ[ÛœÎˆÂˆJHXœšYØ\™˜\™H‹ˆŠHÛÝ[\š[[YÙ[˜ÙHÜ\˜][ÛœÈ‹ˆÊHÞX™\ˆ\ÛXXÞH‹ˆ‘
HÛÙÝÙ\ˆ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHXœšYØ\™˜\™H
ÝY\œ˜HXœšYJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š’XœšYØ\™˜\™JŠˆ
ÝY\œ˜HXœšYJH0ê[˜HÝ˜]YÚXH[ˆÝZHÛH]ÜšHÝ][H\Ø[›È[ˆZ^HÜ[Û˜YÙÚ[Ë\Ú[™›Ü›X^š[Û™KXÚÚ[™ÈHÛÙÝÙ\ˆ\ˆ˜YÙÚ][™Ù\™HHÜ›ÈØšY]]šKÙ™œ™[™È[ˆ\›ØØÚ[È][Y˜XØÙ]]È[ÛÛ™›]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHHÛÝ[\š[[YÙ[˜ÙHÜ\˜][ÛœÊŠˆÚHÛÛ˜Ù[˜[›ÈÝ[	Ú[\Y\™HYÛH]™\œØ\šHHÝ[™\™H[™›Ü›X^š[ÛšHÙYÜ™]NÈ›ÛˆÛÜ›Û›È	Ú[\˜HØ[[XHHÝ˜]YÚYH[HÝY\œ˜HXœšYK—ˆ
ˆ
ŠÊHHÞX™\ˆ\ÛXXÞJŠˆšYÝX\™HHÙ\Ý[Û™H[H™[^š[ÛšH[\›˜^š[Û˜[H™[™YÛ›ÈYÚ][NÈ›Ûˆ[˜ÛYH™XÙ\ÜØ\šX[Y[H	Ø\›ØØÚ[È][Y˜XØÙ]]È[HÝY\œ˜HXœšYK—ˆ
ˆ
Š‘
H[ÛÙÝÙ\ŠŠˆ0ê[˜HÛÛ\Û™[H[HÝY\œ˜HXœšYKXHHÛÛÈÚHšY™\š\ØÙH[	Ý\ÛÈHš\ÛÜœÙH\ÛX]XÚHHÝ[\˜[H\ˆ[™›Y[ž˜\™NÈ›Ûˆ[˜ÛYHÜ[Û˜YÙÚ[ÈÈXÚÚ[™Ëˆ‚ˆKˆÂˆYˆLLËˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™HØÛÜ™HÚH[›Üš[ÈÙ\™\ˆHÜÝHšY[™H\Ø]ÈH\Ý˜[™ZH\ˆ[›Û˜\™HÜ[H™\œÛÈ	Ù\Ý\››ËH[Ý[ÈÛZ[š[Èš[š\ØÙH[ˆ]™\œÙH\ÝHH›ØØÛËˆ[X[HH™]HšY\Ø[Z[˜H]X[HÜHH˜\ÜÜÈ[HÜÝHÚXH\ÜÜÝHÝH[\›™]Ù[ž˜HÚH™H™HÚXHš\ÛÙÛ›Ëˆ‹ˆ]Y\Ý[ÛŽˆ“H\ØXš[]^š[Û™HH]X[H[HÙYÝY[HÜHpìˆZ]]\™HH™]™[š\™H	Ù\ÜÜÚ^š[Û™HH[ˆÙ\š^š[ÈH˜\ÜÜÈ[HÜÝHÛÛ][™[Y[H][^ž˜]ËšYXÙ[™ÈÛÜðëH›Ø˜Xš[]0èH]XØÚHXZ[™[^OÈ‹ˆÜ[ÛœÎˆÂˆJHÜÌÎH‹ˆŠHÜH‹ˆÊHÜ‹ˆ‘
HÜŒˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÜH
ÓU
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠœÜHJŠˆ0êHÜH[›ÝØÛÛÈ
Š”ÓU
Ú[\HXZ[˜[œÙ™\ˆ›ÝØÛÛ
JŠ‹\Ø]È\ˆH˜\ÛZ\ÜÚ[Û™H[H[XZ[ˆ\ØXš[]\™H]Y\ÝHÜHÝZHÚ\Ý[ZH›Ûˆ\Ý[˜]HZHÙ\š^šHHÜÝHpìˆZ]]\™HH™]™[š\™HÝ[žšX[H]XØÚHXZ[™[^H
[ˆÝZHHÙ\™\ˆ[XZ[™[™ÛÛ›È\Ø]H\ˆÜY\™HÜ[HÈ[XZ[œ˜]YÛ[JK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHHÜHÌÎJŠˆ0ê\Ø]HH‘\ˆÛÛ›™]\™HHÛÛ›Û\™HXXØÚ[™HÚ[™ÝÜÈ™[[ÝNÈ›Ûˆ0ê\™][Y[HÛÜœ™[]H[H˜\ÛZ\ÜÚ[Û™H[H[XZ[—ˆ
ˆ
ŠÊHHÜH
Šˆ0ê\Ø]HH\ˆ[˜\Ù™\š[Y[ÈHYÚ[™HÙXŽÈ›Ûˆ0êÛÜœ™[]HZHÙ\š^šHH˜\ÜÜÈ[HÜÝK—ˆ
ˆ
Š‘
HHÜHŒŠŠˆ0ê\Ø]HHÔÒ\ˆÙÚ[ˆÚXÝ\šK˜\Ù™\š[Y[Èš[HHÜ›ÜØ\™[™ÎÈ›Ûˆ0ê\™][Y[HÛÜœ™[]HZHÙ\š^šHH˜\ÜÜÈ[HÜÝKˆ‚ˆKˆÂˆYˆLMˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ”ÝH[˜HSˆ^šY[™[HÛH][HÙYÛ˜[[›È˜[[[Y[HH]š\ÚHHÙ\YšXØ]È›Ûˆ˜[YÈÝHÚ]H[\›šKˆ[ˆ[˜[\ÝH\ÙYÝYH\œXXÝHpîHÜÝ^š[ÛšHH›Ý˜HÚH	Ú[™\š^ž›ÈPPÈ\ÜÛØÚX]È[Ø]]Ø^H™YYš[š]È0êÈÝ\ÜÛÈH[˜HÛÜšÜÝ][Ûˆ[™\\ÈX\šÙ][™ËˆØ]\˜[™È[˜Y™šXÛËÜÜÙ\˜H[ˆ›\ÜÛÈÛÛ[[ÈHš\ÜÜÝHT”›ÛˆšXÚY\ÝKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]XØÛÈ0ê[ˆÛÜœÛÈH]X[HÛÛ›ÛZ\Ý\˜HÈ›ØØØHÝ]\˜[Y[OÈ‹ˆÜ[ÛœÎˆÂˆJH”ÈÚ\ÛÛš[™È[HØXÚHØØ[NÈ›ØØØ]È[	Ø]]˜^š[Û™HH”ÔÑPÈÝ[™\ÛÛ™\ˆ^šY[™[H‹ˆŠH]XØÛÈÔÈ[\YšXØ]ÎÈ›ØØØ]È[˜]H[Z][™ÈÝ[HšXÚY\ÝH[ˆ[™Ü™\ÜÛÈ[\š[Y]›È‹ˆÊHT”Ú\ÛÛš[™È\ˆ[ˆ]XØÛÈÛ‹\]È›ØØØ]ÈH[˜[ZXÈT”[œÜXÝ[ÛˆÛÛˆÔÛ›ÛÜ[™ÈÝYÛHÝÚ]Ú‹ˆ‘
H]š[Ú[ˆÝ[H™]HÚ\™[\ÜÎÈ›ØØØ]È[\Û™[™ÈÔLËQ[\œš\ÙHÛÛˆ]][XØ^š[Û™H‹ŒV‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHT”Ú\ÛÛš[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛH[™^šHÛÛ›È[™\]Z]›ØØXš[Kˆ[›ÝØÛÛÈ
ŠT”›Ûˆ™]™YH[Ý[˜H]][XØ^š[Û™JŠŽˆÚ][œ]YHÝ[HSˆpìˆ[›[˜ÚX\™H	Û	ÒT[Ø]]Ø^HÛÜœš\ÜÛ™H[Z[ÈPPÉËˆ›Ý˜\™H[
Š“PPÈ[Ø]]Ø^H\ÜÛØÚX]ÈH[˜HÛÜšÜÝ][ÛŠŠˆH[ˆ›\ÜÛÈH
Šœš\ÜÜÝHT”›ÛˆšXÚY\ÝJŠˆ
Ü˜]Z]Ý\ÈT”
HÚYÛšYšXØHÚH]Y[HXXØÚ[˜HÚH0ê[\œÜÝH™[\˜ÛÜœÛÎˆ0ê[ˆ]XØÛÈ
Š›Û‹\]
Š‹HÛH]š\ÚHHÙ\YšXØ]È˜\ØÛÛ›È›Üš[È[[]]›ÈH[\˜Ù]\™H[˜Y™šXÛÈËˆHÛÛ›ÛZ\Ý\˜HÝ]\˜[H0êH
Š‘[˜[ZXÈT”[œÜXÝ[ÛŠŠ‹ÚHÝYÛHÝÚ]Ú˜[YHHš\ÜÜÝHT”ÛÛ™œ›Û[™ÛHÛÛˆHX™[HÛÜÝZ]H[
Š‘ÔÛ›ÛÜ[™ÊŠˆHØØ\H]Y[H[˜ÛÙ\™[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÔÈ[\YšXØ]ÎŠŠˆÙœ]HÙ\š^šHQ\Ý\›šH\ˆ›Ý™\ØÚX\™H˜Y™šXÛÈÝ[Hš][XKˆ0â[ˆ]XØÛÈ[H
Š™\ÜÛšXš[]0è›Ý™[šY[H[	Ù\Ý\››ÊŠ‹Y[™H]ZH	Ø[›ÛX[XH0ê[\›˜H[HSˆHšYÝX\™H	Ú[\˜Ù]^š[Û™K›ÛˆHØ]\˜^š[Û™K—ˆ
ˆ
ŠJH”ÈÚ\ÛÛš[™ÎŠŠˆ[\™\™X˜™HH
Šœš\ÛÛ^š[Û™HZH›ÛZJŠ‹›ÛˆHX\]\˜HTSPPËˆ[ÛÛX[™È\œXX›Ûˆ[ÜÝ™\™X˜™H[HH[›ÛX[ËH”ÔÑPÈ›ÛˆH[Ý[ˆY™™]ÈÝ[›ÝØÛÛÈT”—ˆ
ˆ
Š‘
H]š[Ú[ŽŠŠˆšYÝX\™H[
ŠÚ\™[\ÜÊŠˆH™\Ý\Û™HÛY[ÚHÚH\ÜÛØÚX[›ÈH[ˆT˜\Ý[ËˆÈØÙ[˜\š[È\ØÜš]™H[˜HSˆØX›]HH[˜HÛÜšÜÝ][Ûˆ[\›˜K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ	ÐT”Ú\ÛÛš[™È0ê[\XÛÈ
Šœ™XÝ\œÛÜ™JŠˆH[ˆ]XØÛÈÛ‹\]ˆÛH]š\ÚHHÙ\YšXØ]ÈÛÛ›È[ˆÝ[[È[™XØ]Ü™K\˜Ú0êHÙYÛ˜[[›ÈÚH]X[Ý[›ÈÝH\›Z[˜[™ÈHšX\š\™HHÙ\ÜÚ[ÛšHËˆÛÛ›ÛZ\Ý\™H	Ù\Ø[YNˆ
Š‘[˜[ZXÈT”[œÜXÝ[Ûˆ
ÈÔÛ›ÛÜ[™ÊŠ‹ÙYÛY[^š[Û™HKÝZHÚ\Ý[ZHÜš]XÚK›ØÚHT”Ý]XÚKˆ‚ˆKˆÂˆYˆLMKˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“™ZHÚ[Ü›šH™XÙY[H	Ø\ÜÙ[X›XHYÛH^š[Ûš\ÝKXÚ[™HH›Ùš[HÜ™X]HH™XÙ[HY™›Û™Û›ÈH›Ý^šXHÚH	Ø[[Z[š\Ý˜]Ü™H[YØ]ÈH[‰Ø^šY[™H][Ý]HÚXHÛÝÈ[™YÚ[™KˆH›Ý^šXH0ê˜[ØHHÛÜÝZ]HY\KÛÜœ™Y]HH[›ÈØÜ™Y[œÚÝÛÛ˜Y™˜]ÈH[˜H\Ý]H™X[KHšY[™Hš[[˜ÚX]HHXØÛÝ[ÚHÙ[Xœ˜[›È[™\[™[HXHX˜›XØ[›ÈÛHÝ\ÜÚHÛÛ[]H™YÛHÝ\ÜÚHZ[]Kˆ[]ÛÈ\™H[IH[ˆYHÚ[Ü›šKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H™]Ü™H	Ø]XØÛÈ\ØÜš]™HQQÓSÈ]Y\ÝHØ[\YÛ˜OÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™ÈZ\˜]Ë\˜Ú0êHÈØÜ™Y[œÚÝÛÛ˜Y™˜]È[Z]H[˜H›ÛH]]Ü™]›ÛH‹ˆŠH]XØÛÈ[HØ][˜HH›Ü›š]\˜K\˜Ú0êHÙœ]HH™\]^š[Û™HH[˜H\Ý]H™X[H‹ˆÊH\Ùš[˜^š[Û™HH]K\˜Ú0êH[™›Ü›X^š[ÛšHš\Ù\˜]HÝ[	Ø[[Z[š\Ý˜]Ü™HÛÛ›ÈÝ]H][Ø]H‹ˆ‘
H\Ú[™›Ü›X^š[Û™KÚ[ðêY™\Ú[Û™H[X™\˜]HH›Ý^šYH˜[ÙH\ˆÝ[™\™H[ˆY™™]È‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H\Ú[™›Ü›X^š[Û™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ]Y\ÝHØ[\YÛ˜H›ÛˆÛÛ\›ÛY]H[Ý[ˆÚ\Ý[XNˆ]XØØHH
Šœ\˜Ù^š[Û™JŠ‹HÛÛ\PHHÛ\ÜÚYšXØH\ÜXÚ][Y[Hœ˜HH
Š™]ÜšH[X[šJŠ‹ˆ™H[[Y[HH]X[YšXØ[›ÈÛÛYH\Ú[™›Ü›X^š[Û™KˆH›Ý^šXH0ê
Š™˜[ØJŠ‹]Z[™H›ÛˆÚH˜]HH[ˆ]Èš\Ù\˜]È][Ø]Ëˆ0â
Š™[X™\˜]HHÛÛÜ™[˜]JŠ‹ÛÛYH[ÜÝ˜[›ÈH›Ùš[HÜ™X]HH™XÙ[HÚHX˜›XØ[›ÈÛHÝ\ÜÚHÛÛ[]H[ˆÚ[˜Ü›ÛšXK[ÚH\ØÛYHHÚ\˜ÛÛ^š[Û™HÜÛ[™XHH[ˆ\œ›Ü™KˆY0ê
ŠœÝ[Y[[JŠ‹\˜Ú0êH[[ÛY[ÈØÙ[ËHšYÚ[XH[	Ø\ÜÙ[X›XKH	ÙY™™]ÈÝ[]ÈÝ[]ÛÈ[™XØ[›È[ˆØšY]]›È™XÚ\ÛËˆ˜[HH[˜H›Ý\™HÚH™\ÜÝ[ˆÛÛ›ÛÈXÛšXÛÈ˜Y^š[Û˜[H[\šY[™H]ZNˆš\™]Ø[[]š\\ÈHÚYœ˜]\˜H›Ûˆ[››È[Ý[˜H™\ØKHHY™\ØH\ÜØH\ˆ[[Ûš]Ü˜YÙÚ[È[X\˜Ú[Ë[ˆØ[˜[HY™šXÚX[H]]Ü™]›ÛHH[˜H›ØÙY\˜HHÛY[]H˜\YHÛÛ˜ÛÜ™]H[ˆ[XÚ\Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ú[™ÈZ\˜]ÎŠŠˆ[HH˜\ˆÛÛ\Y\™H[‰ÊŠ˜^š[Û™JŠˆH[˜Hš][XH™XÚ\ØK\XØ[Y[HÛÛœÙYÛ˜\™HÜ™Y[žšX[HÈ\ÜÜœ™H[ˆYØ[Y[Ëˆ]ZH›ÛˆÉðê[Ý[ˆ\Ý[˜]\š[È[™]šYX[H°êH[Ý[˜H^š[Û™HšXÚY\ÝNˆ[Y\ÜØYÙÚ[È0êX˜›XÛÈH[™\œØYÛ[È0ê	ÛÜ[š[Û™H[Y\˜Ø]Ë—ˆ
ˆ
ŠŠH]XØÛÈ[HØ][˜HH›Ü›š]\˜NŠŠˆÛÛ\›ÛY]H[ˆ
Š™›Ü›š]Ü™JŠˆ\ˆ˜YÙÚ][™Ù\™H[ÛY[H]˜]™\œÛÈ[ˆØ[˜[HYÚ][[ËÛÛYH[ˆYÙÚ[Ü›˜[Y[ÈÛÙØ\™Hš\›X]Ëˆ[Z]\™H	Ø\Ü]ÈH[˜H\Ý]H[ˆ[›ÈØÜ™Y[œÚÝ›Ûˆ0êÛÛ\›ÛY]\™H]Y[H\Ý]Nˆ™\ÜÝ[ˆ›Ü›š]Ü™H0êÝ]Èš[Û]Ë—ˆ
ˆ
ŠÊH\Ùš[˜^š[Û™HH]NŠŠˆ™\Ý\Û™HÚH[™›Ü›X^š[ÛšH
Š™\™HHš\Ù\˜]JŠˆÚX[›È\ØÚ]H[	ÛÜ™Ø[š^ž˜^š[Û™KˆÈØÙ[˜\š[ÈXÙH[ÛÛ˜\š[ÎˆH›Ý^šXH0ê˜[ØK]Z[™H›ÛˆÉðê[Ý[ˆ]ÈÛÝ˜]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHHYH\›Z[šHÚHHÛX[™HXØÛÜÝ[›ÈHÛÛ[[Ë\˜Ú0êHHY™™\™[ž˜HÝH™[	ÊŠš[[žš[Û™JŠ‹›Ûˆ™[ÛÛ[]Ëˆ
Š“Z\Ú[™›Ü›X][ÛŠŠˆH[™›Ü›X^š[Û™H\œ˜]HY™\ØH
ŠœÙ[ž˜H[[ÈH[™Ø[›˜\™JŠ‹\ˆ\Ù[\[ÈÚHš[[˜ÚXH[ˆ[Û˜H™YH[˜H›Ý^šXHØ˜YÛX]H0­È
Š‘\Ú[™›Ü›X][ÛŠŠˆH˜[Ú]0è
Š™[X™\˜]JŠ‹Ü™X]HHY™\ØH\ˆÝ[™\™H[ˆY™™]Ëˆ]X[™ÈÈØÙ[˜\š[È›ÛZ[˜HÛÛÜ™[˜[Y[ËXØÛÝ[Ü™X]HH™XÙ[K[\\ÝXØHØÙ[HH[ˆ™[™YšXÚ[È\ˆÚHHY™›Û™KÙZH]˜[HH\Ú[™›Ü›X^š[Û™Kˆ‚ˆKˆÂˆYˆLM‹ˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“	ÝY™šXÚ[ÈÛÛXš[]LLH[‰Ø^šY[™HX[šY˜]\šY\˜HHšXÙ]]È™[	Ý[[[È[››È[]]šHHY™˜HšXHÜÝH[]›ÛšXØH[ÛÈ]™\œÚHœ˜HÜ›Ëˆ[™\ÜÛœØXš[H[HÚXÝ\™^ž˜H[ÛHÚH[\œÛÛ˜[HØ\XHšXÛÛ›ÜØÙ\™H[ˆ\XÛÛ\™H[\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙK\˜ÚLNHLN	Ý[šXÛÈÚH›ÛˆÜH—LNH[YØ]H—LNH[šÈX[]›ÛHH]Z[™HÝ\\˜H[™[›™HHš[šHXÛšXÚKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[HØÙ[˜\šH\Ù[\YšXØHQQÓSÈ[ˆ\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[‰ÙK[XZ[ÚHÙ[Xœ˜H›Ý™[š\™H[	Ø[[Z[š\Ý˜]Ü™H[YØ]ÈÚYYH[	ÝY™šXÚ[ÈÛÛXš[]LL[ˆ›ÛšYšXÛÈ\™Ù[H™\œÛÈ[ˆÛÛÈ[Ý›Ë[ÜšH[H›ØÙY\˜HÜ™[˜\šXH‹ˆŠH[‰ÙK[XZ[HÜ[H[›[˜ÚXH[˜Hš[˜Ú]H[HÝ\šXHHÚYYHH]H\ˆš\ØÝ[Ý\›H‹ˆÊH[‰ÙK[XZ[™ZXÛÛH[ˆ[YØ]ÈÚK[˜H›ÛH\\Ë[œÝ[HÛÙØ\™HX[]›ÛÈ‹ˆ‘
H[ˆÜ]\ÝH[ˆÚ]ÈÙXˆÚYYHH]H[HØ\HHÜ™Y]È\ˆÝ\ˆÛÛ[X\™HH˜]šYØ\™H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH	ÙK[XZ[ÚHÙ[Xœ˜H›Ý™[š\™H[	Ø[[Z[š\Ý˜]Ü™H[YØ]ÈHÚYYH[ˆ›ÛšYšXÛÈ\™Ù[H[ÜšH›ØÙY\˜JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š\Ú[™\ÜÈ[XZ[ÛÛ\›ÛZ\ÙH
‘PÊJŠˆH™H˜]H\Ý[]šKH™[	ÛÜš[Û™HHÚHÛÛ›È]HH™Kˆš[[Ë	Ø]XØØ[H
Šš[\\œÛÛ˜H[˜HšYÝ\˜HH]]Üš]0è[\›˜JŠˆ8 %	Ø[[Z[š\Ý˜]Ü™H[YØ]Ë[\™]Ü™Hš[˜[žšX\š[ËH›ÛH[ˆ›Ü›š]Ü™H›ÝÈ8 %\Ø[™È[ˆÛZ[š[ÈÛÛZYÛX[HÈ[ˆXØÛÝ[]™\›ÈÛÛ\›ÛY\ÜÛËˆÙXÛÛ™ËHšXÚY\ÝH0ê
Šœ]\ÚXš[H™[Ý[ÈÛÛ\ÝÈ^šY[™[JŠŽˆ[ˆ›ÛšYšXÛÈ0êÚpìˆÚH]Y[™\\È˜H]HHÚ[Ü›šKˆ\ž›Ë˜H]˜HÝH
Š\™Ù[ž˜HH]]Üš]0è
ŠˆHÜ[™ÙH[\Ý[˜]\š[ÈH
ŠœØ[\™HH›ØÙY\˜H›Ü›X[JŠ‹Y0ê]Y\ÝÈ[]YÛ[ÈXÚ\Ú]›Îˆ[‘PÈ›ÛˆÙœ]H[Ý[˜H˜[HXÛšXØKÙœ]HH\ÜÛšXš[]0èH[˜H\œÛÛ˜HH˜\™H[‰ÙXØÙ^š[Û™H\ˆ[Ø\Ë—Šˆ
Š’[ÙYÛ›ÈÚHÈ\Ý[™ÝYNŠŠˆ[ˆ‘PÈÜ\ÜÛÈ›ÛˆÜH
Š›°êH[YØ]H°êH[šÈX[]›ÛJŠ‹Y0êH˜YÚ[Û™H\ˆÝZHHš[šH[K[X[Ø\™H›ÛˆÈ[\˜Ù][›Îˆ0êÛÛÈ\ÝËˆHY™\ØH0ê
Šœ›ØÙY\˜[JŠˆ8 %™\šYšXØ\™H[™[™YšXÚX\š[ÈÝH[ˆØ[˜[H]™\œÛËÜXH]]Üš^ž˜^š[Û™HÛÜ˜H[˜HÛÙÛXH8 %›ÛˆXÛ›ÛÙÚXØK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH	ÙK[XZ[HÜ[HÝ[Hš[˜Ú]H[HÝ\šXJŠˆ[˜ÚXH[˜H™]H[\\ÜÚ[XHÜ\˜[™ÈÚH]X[Ý[›ÈX˜›ØØÚNˆ›Ûˆ[\\œÛÛ˜H™\ÜÝ[›Ë›ÛˆÚH\ÙÙÚXHH[ˆÛÛ\ÝÈ^šY[™[H™X[HH›Ûˆ™[™HHZ\˜H[˜H[žš[Û™HÜXÚYšXØH[	ÛÜ™Ø[š^ž˜^š[Û™K—ˆ
ˆ
ŠÊH	ÙK[XZ[ÛÛˆ	Ø[YØ]ÈÚH[œÝ[HÛÙØ\™HX[]›ÛÊŠˆ0ê\Ú[™ÈÛÛˆ^[ØYˆ[[››È\œš]˜H[š[H\ÙYÝZ]ËH›Üš[È\ˆ]Y\ÝÈ[ˆš[›È[[X[Ø\™HÈ[Ø[™›Þ[™È[	Ø[YØ]ÈÜÜÛÛ›È[\˜Ù]\›Kˆ[‘PÈ]›Ü˜H[	ÛÜÜÝËÛÛˆ[ÛÛÈ\ÝÈH[˜HšXÚY\ÝH[™Ø[›™]›ÛHH›Û™K—ˆ
ˆ
Š‘
H[Ü]\ÚHÚYYHH]H[HØ\JŠˆ0ê[˜HY™˜HÙXˆš]›ÛH[Ú[™ÛÛÈÛÛœÝ[X]Ü™Nˆ›Ûˆ\ÜØH™[[Y[›È[HÜÝH[]›ÛšXØH^šY[™[KÚH0ê[Ø[˜[HÝHÝZH[‘PÈ\ˆYš[š^š[Û™HÚHÛÜÝZ\ØÙKˆ‚ˆKˆÂˆYˆLMËˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø\XØ^š[Û™HHXYØ^žš[›ÈØ[ÛÛH[Ý[HH[ˆÜ™[™H[Û\XØ[™È]X[]0èH™^ž›È[š]\š[ÈHÛÛœÙ\˜H[š\Ý[]È[ˆ[˜H˜\šXXš[H[\˜HHÌˆš]ÛÛˆÙYÛ›Ëˆ[ˆÛY[HÜ™[˜H[˜H]X[]0è[›Ü›YHH[ˆ\XÛÛÎˆ[Ý[HÝœ™X˜™HÝ\\˜\™H[[Z]H˜\™\Ù[Xš[KXH[Ú\Ý[XH™YÚ\Ý˜H[ˆ[\ÜÈ
Š›™YØ]]›ÊŠˆHXØÜ™Y]HHY™™\™[ž˜HÝ[ÛÛÈ[ÛY[Kˆ™\ÜÝ[ˆÛÛ›ÛÈH[œ]]™]˜H[Z]]ÈH]X[]0èˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[™\˜Xš[]0è0êÝ]HÙœ]]OÈ‹ˆÜ[ÛœÎˆÂˆJHY™™\ˆÝ™\™›ÝÎˆ	Ú[œ]XØÙYHÈÜ^š[ÈHY[[ÜšXH[ØØ]ÈHÛÝœ˜\ØÜš]™H]Y[ÈYXXÙ[H‹ˆŠHÔS[š™XÝ[ÛŽˆH]X[]0èšY[™H[\œ™]]HÛÛYH\HH[‰Ú\Ý^š[Û™HÔS‹ˆÊH˜XÙHÛÛ™][ÛŽˆYHÜ\˜^š[ÛšHÛÛ˜ÛÜœ™[HÚHÛÝœ˜\Û™ÛÛ›È[\˜[™È[š\Ý[]È‹ˆ‘
H[YÙ\ˆÝ™\™›ÝÎˆ[š\Ý[]ÈÝ\\˜H[˜[Ü™HX\ÜÚ[[È˜\™\Ù[Xš[HHÚHšX˜[H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[YÙ\ˆÝ™\™›ÝÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Šš[YÙ\ˆÝ™\™›ÝÊŠˆÚH™\šYšXØH]X[™È[‰ÛÜ\˜^š[Û™H\š]Y]XØH›ÙXÙH[ˆ˜[Ü™HÚH
Š››Ûˆ[˜JŠˆ™[\È[\›ÈÚH]™HÛÛ[™\›Ëˆ[š\Ý[]È›ÛˆšY[™H›Û˜Ø]È[ˆ[ÙÈ[››ØÝ[Îˆ™[H˜\™\Ù[^š[Û™H[ˆÛÛ\[Y[ÈHYKÝ\\˜\™H[X\ÜÚ[[ÈH[ˆ[\›ÈHÌˆš]ÛÛˆÙYÛ›ËÚH0ê‹ŒMËËË˜HœšX˜[\™Wˆ[˜[Ü™H™\œÛÈH[Y\šH™YØ]]šKˆ0â\Ø][Y[H[Ú[Û[È\ØÜš]ËY0ê[˜ÚHH˜YÚ[Û™H\ˆÝZH[Y™]È0ê[È[œÚY[ÜÛÎˆ[›ÙÜ˜[[XH›Ûˆ˜H[ˆ\œ›Ü™K›Ûˆ›ÙXÙH[Ý[˜HXØÙ^š[Û™HH›ÜÙYÝYHÛÛˆ[ˆ[Y\›È\™™][Y[H˜[YÈXHÛÛ\][Y[HØ˜YÛX]ËˆHÛÛœÙYÝY[ž˜H]ZH0ê[ˆÝ[H™YØ]]›È˜]]È[HÙÚXØH\XØ]]˜HÛÛYH[ˆÜ™Y]ËˆHÛÜœ™^š[Û™HYÚ\ØÙHÝHYHX[šNˆ
Š˜[Y\™H	Ú[œ]
ŠˆÛÛˆ[Z]HÝ\\š[ÜšHÙ[œØ]H\ˆH]X[]0èH\Ø\™H\HÈXœ™\šYHÚHš[]š[›È	ÛÝ™\™›ÝÈ[žšXÚ0êHšX˜[\™HÚ[[žš[ÜØ[Y[KÛÛˆÛÛ›ÛH\ÜXÚ]Hš[XHHÙÛšH[Û\XØ^š[Û™HÝH˜[ÜšHÛÛ›ÛXš[H[	Ý][K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHY™™\ˆÝ™\™›ÝÎŠŠˆšYÝX\™HH
Š›Y[[ÜšXJŠ‹›Ûˆ	Ø\š]Y]XØNˆÚHØÜš]™HÛ™HÈÜ^š[È[ØØ]È\ˆ[ˆ]ÈHÚHÛÝœ˜\ØÜš]™H]Y[ÈYXXÙ[Kˆ[Ú[Û[È\XÛÈ0ê[ˆÜ˜\ÚÈ	Ù\ÙXÝ^š[Û™HHÛÙXÙK›Ûˆ[ˆ[Y\›ÈØ˜YÛX]ËˆHYHY™]HÛÛ›È\°ìˆ[\\™[]K\˜Ú0êH[ˆ[YÙ\ˆÝ™\™›ÝÈ™[Ø[ÛÛÈ[H[Y[œÚ[Û™HH[ˆY™™\ˆ0ê[˜HØ]\ØHÛ\ÜÚXØHHY™™\ˆÝ™\™›ÝË—ˆ
ˆ
ŠŠHÔS[š™XÝ[ÛŽŠŠˆšXÚYYHÚH	Ú[œ]™[™ØHÛÛ˜Ø][˜]È[ˆ[‰Ú\Ý^š[Û™H
Š”ÔS
ŠˆH[\œ™]]ÈÛÛYHÛÙXÙKˆ]ZHH]X[]0èšY[™H\Ø]HÛÛYH[Y\›È[ˆ[ˆØ[ÛÛËH[]X˜\ÙH›Ûˆ[˜H[ˆÚ[ØÛË—ˆ
ˆ
ŠÊH˜XÙHÛÛ™][ÛŽŠŠˆ˜\ØÙH[H
ŠœÛÝœ˜\ÜÚ^š[Û™H[\Ü˜[JŠˆHÜ\˜^š[ÛšHÛÛ˜ÛÜœ™[KH[Ý[È˜]È\Ý[]›È0êÚH	Ù\Ú]È˜\šXHH\ÙXÝ^š[Û™HH\ÙXÝ^š[Û™Kˆ]ZH[ÛÛ\Ü[Y[È0ê\™™][Y[H]\›Z[š\ÝXÛÎˆHÝ\ÜØH]X[]0è›ÙXÙHÙ[\™HÈÝ\ÜÛÈÝ[H™YØ]]›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÛ›ÜØÚHÚX\ØÝ[ˆY™]È[
ŠœÚ[Û[ÊŠˆÚH›ÙXÙKˆ
Š’[YÙ\ˆÝ™\™›ÝÊŠˆH[ˆ[Y\›È\ÜÝ\™ËÜ\ÜÛÈ™YØ]]›ËÙ[ž˜H[Ý[ˆ\œ›Ü™H0­È
ŠY™™\ˆÝ™\™›ÝÊŠˆHÜ˜\ÚÈ\ÙXÝ^š[Û™HHÛÙXÙH\˜š]˜\š[È0­È
Š”˜XÙHÛÛ™][ÛˆHÐÕÕJŠˆHÛÛ\Ü[Y[È[˜ÛÙ\™[Hœ˜H[‰Ù\ÙXÝ^š[Û™HH	Ø[˜H0­È
Š“Y[[ÜžHXZÊŠˆHÛÛœÝ[[ÈHY[[ÜšXHÚHÜ™\ØÙH™[[\Èš[›È[	Ù\Ø]\š[Y[Ëˆ[[›ÛZ[˜]Ü™HÛÛ][™H™\ÝHÈÝ\ÜÛËY0êH^š[Û™HHÜ\™H[	Ù\Ø[YNˆ
Šš[œ]›Ûˆ˜[Y]ÊŠ‹ˆ[ˆ[Z]HÝ\\š[Ü™HÝ[H]X[]0è]œ™X˜™H[\Y]È]Ëˆ‚ˆKˆÂˆYˆLNˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø\XØ^š[Û™H˜[˜Ø\šXH™YÚ\Ý˜H[ˆ›ÛšYšXÛÈ\ÙYÝZ]ÈYH›ÛHÛÛˆÈÝ\ÜÛÈY[XÛÈY[YšXØ]]›ÈH˜[œØ^š[Û™K[ÈÝ\ÜÛÈTH\Ý[ž˜HHÙZHÜ™H[	ÛÜšYÚ[˜[Kˆ	Ý][HXÚX\˜HH]™\ˆ\ÜÜÝÈ[ˆÛÛÈYØ[Y[ËˆHÙÈ[ÜÝ˜[›ÈÚHHÙXÛÛ™HšXÚY\ÝH\˜Hž]H\ˆž]HY[XØH[Hš[XKš\›XH[˜Û\ØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]XØÛÈ0êÝ]È]X\ÚHÙ\[Y[H\ÙYÝZ]ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÔS[š™XÝ[Ûˆ‹ˆŠH™\^H]XÚÈ‹ˆÊHÜ›ÜÜË\Ú]HØÜš\[™È‹ˆ‘
H]XØÛÈH›Üž˜Hœ]H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH™\^H]XÚÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ[ˆ
Š˜]XØÛÈ™\^JŠˆ	ØYÙÜ™\ÜÛÜ™H[\˜Ù]H[˜HÛÛ][šXØ^š[Û™HYÚ][XHHH
Šœš]˜\ÛY]HY[XØJŠˆ[ˆ[ˆ[ÛY[ÈÝXØÙ\ÜÚ]›Ëˆ›ÛˆHš\ÛÙÛ›ÈHXÚYœ˜\›H°êHH[\˜\›NˆH˜\ÝHÚH[Ù\™\ˆHšXXØÙ]Kˆ	Ú[™^š[ÈXÚ\Ú]›È™[ÈØÙ[˜\š[È0êÚHHÙXÛÛ™HšXÚY\ÝH0ê
ŠšY[XØHž]H\ˆž]Kš\›XHÛÛ\™\ØJŠŽˆ[ˆ]XØØ[HÚH]™\ÜÙH[ÙYšXØ]È]X[ÛÜØH]œ™X˜™H[˜[Y]ÈHš\›XKY[™H[ˆ][HÚH\ÜÛ™H[ˆÙXÛÛ™È›ÛšYšXÛÈÙ[™\™\™X˜™H[ˆY[YšXØ]]›ÈH[˜Hš\›XH]™\œÚK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÔS[š™XÝ[ÛŽŠŠˆšXÚYYH	Ú[œÙ\š[Y[ÈH
Š˜ÛÛX[™HÔS™ZHØ[\HH[œ]
Šˆ\ˆX[š\Û\™H[]X˜\ÙKˆ]ZH›ÛˆÉðê[Ý[ˆ[œ][›ÛX[ÎˆHšXÚY\ÝH0ê[˜H˜[œØ^š[Û™H\™™][Y[H˜[YKÛÛÈš\]]K—ˆ
ˆ
ŠÊHÜ›ÜÜË\Ú]HØÜš\[™ÎŠŠˆ[šY]H
ŠœØÜš\™[œ›ÝÜÙ\ˆH[šH][JŠˆ\ˆX˜\™HÙ\ÜÚ[ÛšHÈ]Kˆ[H™[ÈØÙ[˜\š[È[™XØHÛÛ[]È]]›ÈÙ\š]ÈH\žšK—ˆ
ˆ
Š‘
H›Üž˜Hœ]NŠŠˆ[Hš\]][Y[HÜ™Y[žšX[HÈÚX]šH]™\œÙHš[˜Ú0êH[˜H[žš[Û˜Kˆ]ZH›ÛˆÚHÛÛ›È[]]šH˜[]H°êH˜\šX^š[Û™NˆÉðê[˜HÛÛHšXÚY\ÝH˜[YKš\›ÜÜÝH[HH]X[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHY™\ÙHÛÛ›È[™\^H›ÛˆÛÛ›ÈHÚYœ˜]\˜H
[Y\ÜØYÙÚ[È\˜HÚpèš\›X]ÈHÚYœ˜]ÊKXHHYXØØ[š\ÛZHÚH™[™Û›È
Š›ÙÛšHY\ÜØYÙÚ[È][^ž˜Xš[H[˜HÛÛH›ÛJŠŽˆ[ˆ
Š››Û˜ÙJŠˆÈ[ˆY[YšXØ]]›È[š]›ØÛÈ\ˆ˜[œØ^š[Û™K[ˆ
Š[Y\Ý[\
ŠˆÛÛˆš[™\Ý˜HH˜[Y]0èš\Ý™]K[Y\šHHÙ\]Y[ž˜HHÚÙ[ˆHÙ\ÜÚ[Û™HHØØY[ž˜Hœ™]™KˆÙHÈØÙ[˜\š[È\ØÜš]™H[˜HšXÚY\ÝHYÚ][XH
œš\]]HY[XØJ‹Hš\ÜÜÝH0êÙ[\™H™\^Kˆ‚ˆKˆÂˆYˆLNKˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘ÜÈ[ˆ^Ú]ÚHHØÜš]ÈÛ™HÈÜ^š[ÈHY[[ÜšXH[ØØ]ÈH[ˆÙ\š^š[Ë[X[HHÚXÝ\™^ž˜HÙ\˜ØH[ˆÛÙØ\™HH[œÝ[\™HÝYÛHÜÝØ\XÙHHÛÜ™YÛX\™H[ÛÛ\Ü[Y[ÈZH›ØÙ\ÜÚHHH[\œ›Û\\™H]Y\ÝÈ\ÈH[]]šHY[™H]™[™ÛÛ›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HXÛšXÚHH\™[š[™ÈpìˆZ]]\™HH™]™[š\™H]XØÚHY™™\ˆÝ™\™›ÝÈÝH[ˆÚ\Ý[XHÈ\ÜÜÚ]]›È\Ø[™È[ˆÛÙØ\™H[ˆÜ˜YÈHš[]˜\™HH™]™[š\™H]X[ÚX\ÚH[]]›ÈHØÜš]™\™H]HÛ™HÈÜ^š[ÈHY[[ÜšXH[ØØ]ÈH[ˆ›ÙÜ˜[[XOÈ‹ˆÜ[ÛœÎˆÂˆJH\ÛÛ[Y[È
\ÛÛ][ÛŠH‹ˆŠH\Ø]]˜^š[Û™HHÜHH›ÝØÛÛH‹ˆÊHÚ\Ý[XHH™]™[žš[Û™H[H[\Ú[ÛšHÝHÜÝ
TÊH‹ˆ‘
Hš[[Þš[Û™H[ÛÙØ\™H›Ûˆ™XÙ\ÜØ\š[È‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÚ\Ý[XHH™]™[žš[Û™H[H[\Ú[ÛšHÝHÜÝ
TÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆœ˜HH]X]›ÈÜš[ÛšK	ÊŠ’TÈ
ÜÝX˜\ÙY[\Ú[Ûˆ™]™[[ÛˆÞ\Ý[JJŠˆ0ê	Ý[šXØHÚHÛÜœš\ÜÛ™H[H\ØÜš^š[Û™H[HÛX[™Nˆ[ˆÛÙØ\™HÚH
Š›ÜÜÙ\˜H[ÛÛ\Ü[Y[È[Ú\Ý[XJŠˆ8 %[ÙYšXÚHZHš[KØÜš]\™H™[™YÚ\Ý›ËXØÙ\ÜÚH[›ÛX[H[HY[[ÜšXH8 %Hpìˆ
Šš[\œ›Û\\™JŠˆ	ÛÜ\˜^š[Û™KÛÛ\™\ÙHHØÜš]\™HÛ™HH[Z]H[HY[[ÜšXH[ØØ]HH[ˆ›ØÙ\ÜÛË—Šˆ
Š•[˜H™XÚ\Ø^š[Û™HÚH˜[H\ˆ	Ù\Ø[YHH\ˆH˜]XØNŠŠˆHY™\ÙH
Šœš[X\šYJŠˆÛÛ›È[Y™™\ˆÝ™\™›ÝÈ›ÛˆÛÛ›È	ÒTÈXHHYXØØ[š\ÛZH[YÜ˜]H™[Ú\Ý[XHÜ\˜]]›ÈH™[ÛÛ\[]Ü™H8 %
Š‘TÓ–
Šˆ
H\™YH]H›ÛˆÛÛ›È\ÙYÝZXš[JK
ŠTÓŠŠˆ
ÛH[™\š^žšHØ[XšX[›ÈHÙÛšH\ÙXÝ^š[Û™K™[™[™È[˜Y™šYXš[H	Ù^Ú]
HHÛH
ŠœÝXÚÈØ[˜\žJŠˆ
˜[ÜšHÙ[[™[HÚHš]™[[›ÈHÛÝœ˜\ØÜš]\˜JH8 %Û™KÝšX[Y[KHØÜš]™\™HÛÙXÙHÚHÛÛ›ÛHH[Z]HYÛH\œ˜^Kˆ	ÒTÈ0ê[›È
ŠœÝ˜]ÈYÙÚ][]›ÊŠ‹™^š[ÜÛÈÛÜ˜]]ÈÝ[ÛÙØ\™HH\ž™H\HÚH›Ûˆ[ÚHšXÛÛ\[\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ò\ÛÛ][ÛŠŠˆ™]šY[™HHY™\Ú[Û™H[X[Ø\™H[Z][™È[\˜^š[Û™HHÛÛ][šXØ^š[Û™NÈ›Ûˆ0êÜXÚYšXØ[Y[H›ÙÙ]]H\ˆš[]˜\™HÈ™]™[š\™HY™™\ˆÝ™\™›ÝË—ˆ
ˆ
ŠŠHH\ØXš[]^š[Û™HHÜHH›ÝØÛÛJŠˆ0ê[˜HXÛšXØHH\™[š[™ÈÚHZ]]HHšY\œ™H	Ù\ÜÜÚ^š[Û™HY]XØÚHÝ[žšX[HÚ]Y[™ÈØ[˜[HH™]H›Ûˆ™XÙ\ÜØ\šNÈ›Ûˆ™]šY[™H[Y™™\ˆÝ™\™›ÝË—ˆ
ˆ
Š‘
HHš[[Þš[Û™H[ÛÙØ\™H›Ûˆ™XÙ\ÜØ\š[ÊŠˆšYXÙHHÝ\\™šXÚYHH]XØÛÈ[[Z[˜[™ÈÛÙØ\™H[][^ž˜]ÎÈ›Ûˆ™]šY[™H\™][Y[H[Y™™\ˆÝ™\™›ÝËˆ‚ˆKˆÂˆYˆLŒˆÜXÎˆ•[™\˜Xš[]H\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ›Ü›š]Ü™HHÜÝ[™ÈÛÛ™]š\ÛÈ\ÜÙYÛ˜HHÙÛšHÛY[H[˜HXXØÚ[˜Hš\X[HÝ[ÈÝ\ÜÛÈÜÝš\ÚXÛËˆ\˜[H[ˆ\Ý]]Üš^ž˜]Ë˜\ž[ˆ\HH[˜HXXØÚ[˜Hš\X[HH›Ý˜HÛÛˆÛÛHš]š[YÚH][KÙœ]H[ˆY™]È™[š]™\ˆÜ˜YšXÛÈ\˜]š\X[^ž˜]È[	Ú\\š\ÛÜˆHÝY[™H\ÙXÝ^š[Û™HHÛÙXÙHÝ[	ÚÜÝˆH0ëpìˆYÙÙ\™HHY[[ÜšXH[HXXØÚ[™Hš\X[HYÛH[šHÛY[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÈH[™\˜Xš[]0è0êÝ]HÙœ]]OÈ‹ˆÜ[ÛœÎˆÂˆJHYØH[HXXØÚ[˜Hš\X[H
“H\ØØ\JNˆ[ÛÙXÙHÝ\\˜H[ÛÛ™š[™H[	Ú\\š\ÛÜˆ‹ˆŠHØØ[]HZHš]š[YÚHØØ[Nˆ	Ý][H]™[H[[Z[š\Ý˜]Ü™H[H›ÜšXHXXØÚ[˜Hš\X[H‹ˆÊH›ÛY™\˜^š[Û™HHXXØÚ[™Hš\X[H
“HÜ˜]Û
Nˆ›ÜH\Ý[ž™H›ÛˆÙ[œÚ]HÝ[ÈÝ\ÜÛÈÜÝ‹ˆ‘
H[šY^š[Û™H[ˆY[[ÜšXNˆÛÙXÙH\ÙYÝZ]È[›È[ˆ›ØÙ\ÜÛÈYÚ][[È[HXXØÚ[˜Hš\X[H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHYØH[HXXØÚ[˜Hš\X[H
“H\ØØ\JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[]YÛ[ÈXÚ\Ú]›È0ê
Š™Ý™Hš[š\ØÙJŠˆ	Ø]XØÛÎˆ›Ûˆ[›ÈHXXØÚ[˜Hš\X[HH\[ž˜KXHÝ[	ÊŠšÜÝ
ŠˆÚHHÜÜ]Kˆ[˜H
Š•“H\ØØ\JŠˆ0ê\Ø][Y[H]Y\ÝË[Ý\\˜[Y[È[ÛÛ™š[™HH\ÛÛ[Y[ÈÚH	Ú\\š\ÛÜˆØ\˜[\ØÙKÝ[]ÈÙœ][™Û™H[ˆY™]È[ˆ[›ÈZH[H[ˆÝZH\ÜÛÈ\ÜÛ™HÝ\\™šXÚYH™\œÛÈÛHÜÜ]K\XØ[Y[HH\ÜÜÚ]]šH[][]HÈ\˜]š\X[^ž˜]HÛÛYH[š]™\ˆÜ˜YšXÛÈ[ÈØÙ[˜\š[Ëˆ0âH[™\˜Xš[]0èpîHÜ˜]™HÛÛ˜Ù\Xš[H[ˆ[ˆ[XšY[Hš\X[^ž˜]Ë\ˆYH˜YÚ[ÛšKˆš[[Ë	Ú\\š\ÛÜˆ0ê
Š›	Ý[šXØHÛÜØJŠˆÚHÙ\\˜HÛY[H]™\œÚNˆØY]È]Y[ËØYHÙÛšHÙ\\˜^š[Û™KˆÙXÛÛ™Ë[ˆ[ˆÜÝ[™ÈÛÛ™]š\ÛÈ[[››È0ê
Š›][K][˜[
ŠŽˆ	Ø]XØØ[H˜YÙÚ][™ÙH]HHÜ™Ø[š^ž˜^š[ÛšHÚH›Ûˆ[››È[Ý[ˆ˜\ÜÈÛÛˆZHHÚH[H]œ™X˜™\›ÈÝ]È˜\™H\ˆY™[™\œÚKˆHÛÛ›ÛZ\Ý\™HÛÛ›ÈYÙÚ[Ü›˜\™H[\\Ý]˜[Y[H	Ú\\š\ÛÜ‹šY\›™HHÝ\\™šXÚYH\Ø]]˜[™ÈH\ÜÜÚ]]šH[][]H›Ûˆ™XÙ\ÜØ\šHK\ˆHØ\šXÚHpîHÙ[œÚXš[Kš[[˜ÚX\™H[HÛÛ™]š\Ú[Û™H\Ø[™ÈÜÝYXØ]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHØØ[]HZHš]š[YÚHØØ[NŠŠˆÚH™\›XH
Š™[›ÊŠˆHXXØÚ[˜Hš\X[Nˆ	Ý][H]™[H[[Z[š\Ý˜]Ü™HH]Y[HXXØÚ[˜KH[HHpîKˆ0âÜ\ÜÛÈ[š[[È\ÜÛÈH[˜HØ][˜KXHHÛÛH›Ûˆ]˜]™\œØH[Ý[ˆÛÛ™š[™HH›ÛˆØØØHÛH[šHÛY[K—ˆ
ˆ
ŠÊH“HÜ˜]ÛŠŠˆ0ê[ˆ›Ø›[XHH
Š™ÛÝ™\›˜[˜ÙJŠ‹›Ûˆ[ˆ^Ú]ˆ\Ý[ž™HÜ™X]HHXZH\ÛY\ÜÙK›ÛˆÙ[œÚ]HH›ÛˆYÙÚ[Ü›˜]KÚH[\™Ø[›ÈHÝ\\™šXÚYH	Ø]XØÛËˆ\ØÜš]™H[ˆ\ÛÜ™[™K›Ûˆ[Ý\\˜[Y[ÈH[ˆ\ÛÛ[Y[Ë—ˆ
ˆ
Š‘
H[šY^š[Û™H[ˆY[[ÜšXNŠŠˆÛÛœÚ\ÝH™[	Ù\ÙYÝZ\™HÛÙXÙH[›È[ˆ
Šœ›ØÙ\ÜÛÈYÚ][[ÊŠ‹Y0ê\XØHYÛH]XØÚHš[[\ÜËˆ™\ÝHÛÛ™š[˜]H[Ú\Ý[XHÜ\˜]]›ÈÜÜ]Nˆ›ÛˆH[HHÚH™Y\™HÛÛˆ	Ú\\š\ÛÜ‹——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HHÙ\˜\˜ÚXHZHÛÛ™š[šHH]X[H[™\˜Xš[]0è™H]˜]™\œØH]X[Kˆ
Š‘œ˜H›ØÙ\ÜÚJŠˆ[ÈÝ\ÜÛÈÚ\Ý[XHHØØ[]HZHš]š[YÚH0­È
Š‘œ˜HÛÛZ[™\ŠŠˆÝ[ÈÝ\ÜÛÈÙ\›™[HÛÛZ[™\ˆ\ØØ\K˜]›Üš]HHš]š[YÚHXØÙ\ÜÚ]šHHÛØÚÙ][[[YH[Û]H0­È
Š‘œ˜HXXØÚ[™Hš\X[JŠˆH“H\ØØ\KÚHšXÚYYH[˜H[™\˜Xš[]0è[	Ú\\š\ÛÜˆ0­È
Š‘œ˜H[˜[
Šˆ[ÈÝ\ÜÛÈÙ\š^š[ÈÛÝYHY™]ÈH\ÛÛ[Y[È][K][˜[ˆ[š[˜Ú\[ÈHÜ\œÚH[	Ù\Ø[YH0êÚHpîH[ÛÛ™š[™H]˜]™\œØ]È0ê˜\ÜÛËpîH	Ú[\]È0ê[\[Îˆ[˜H“H\ØØ\H[ˆ[ˆÜÝ[™ÈÛÛ™]š\ÛÈ\ÜÛ™H
Š]JŠˆHÛY[H[œÚY[YKˆ‚ˆKˆÂˆYˆLŒKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[ÎˆZYY]›Ü˜H™[™\\ÈUH[‰ÛÜ™Ø[š^ž˜^š[Û™HØ[š]\šXKˆ[˜HX][˜K\™H[ˆ[YØ]È[XZ[]XÚ]]ÈÛÛYH	ØØ\[HÛ[šXÚH\™Ù[IËˆØÛÈÜËHÝ[ÚHš[H]™[[›È[˜XØÙ\ÜÚXš[HH\\™H[ˆY\ÜØYÙÚ[ÈÚHÚYYH[YØ[Y[È[ˆÜš\Ý˜[]H\ˆš\š\Ý[˜\™H	ØXØÙ\ÜÛËˆÚXÚ0êH[ÛÛ\]\ˆHZYY0êÛÛ›™\ÜÛÈ[H™]K[ÛÙØ\™H[››ÜÛÈÚHY™›Û™H˜\Y[Y[KÛÛ[™È[šHÚ\Ý[ZH™[	ÛÜ™Ø[š^ž˜^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÈHX[Ø\™HHpæH›Ø˜Xš[Y[H[™™]]È[Ú\Ý[XHHZYYÈ‹ˆÜ[ÛœÎˆÂˆJHÛÜ›H‹ˆŠHYØ\™H‹ˆÊHÜ]Ø\™H‹ˆ‘
H˜[œÛÛ]Ø\™H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H˜[œÛÛ]Ø\™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š”˜[œÛÛ]Ø\™JŠˆ[žš[Û˜HÚYœ˜[™ÈHš[HÝH[ˆÚ\Ý[XH[™™]ÈHšXÚYY[™È[ˆYØ[Y[È\ˆHÚX]™HHXÜš]^š[Û™Kˆ[ˆ]Y\ÝÈØÙ[˜\š[ËZYYH[˜ÛÛœØ\]›ÛY[H]]˜]È[˜[œÛÛ]Ø\™H\™[™È[ˆ[YØ]È[XZ[[››ÜÛËˆ[˜H›ÛH]]˜]Ë[˜[œÛÛ]Ø\™HHÚYœ˜]ÈHÝ[ÚHš[HHÚH0êY™\ÛÈ]˜]™\œÛÈH™]KÛÛ[™È[šHÚ\Ý[ZK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆÛÜ›JŠˆÚH™\XØH\ˆY™›Û™\œÚHXH\XØ[Y[H›ÛˆšXÚYYH[ˆYØ[Y[ÈHš\ØØ]È\ˆš\š\Ý[˜\™H	ØXØÙ\ÜÛÈZHš[K—ˆ
ˆ
ŠŠH	ÐYØ\™JŠˆš\ÝX[^ž˜HX˜›XÚ]0è[™\ÚY\˜]NÈ›ÛˆÚYœ˜Hš[H°êHšXÚYYHš\ØØ]K—ˆ
ˆ
ŠÊHÈÜ]Ø\™JŠˆ˜XØÛÙÛYHÚ[[žš[ÜØ[Y[H[™›Ü›X^š[ÛšNÈ›ÛˆÚYœ˜Hš[H°êHšXÚYYHš\ØØ]Kˆ‚ˆKˆÂˆYˆLŒ‹ˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø\XØ^š[Û™HÙXˆX˜›XØHHÛÛ[Y[HYÛH][HÙ[ž˜HÛÙYšXØ\›™H	ÛÝ]]ˆ[X[HHÚXÝ\™^ž˜H]™HÜYYØ\™H[H\™^š[Û™HÚHÛÜØHÝY[™HÛÛ˜Ü™][Y[H[ˆ]XØØ[H]X[™ÈšY\ØÙHH˜\ˆ\ÙYÝZ\™H[›Üš[ÈØÜš\™[œ›ÝÜÙ\ˆYÛH[šHš\Ú]]ÜšKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[H0ê[˜HÛÛœÙYÝY[ž˜HÛÛ][™HH[ˆ]XØÛÈÜ›ÜÜË\Ú]HØÜš\[™È
ÔÊOÈ‹ˆÜ[ÛœÎˆÂˆJH[šX[ÙˆÙ\šXÙH\ˆÛH][HYÚ][ZH‹ˆŠH\ÙXÝ^š[Û™HHÛÛX[™H›Ûˆ]]Üš^ž˜]HÝ[Ù\™\ˆ‹ˆÊH\ÈZH]HHÙ\ÜÚ[Û™H][H‹ˆ‘
H[\˜^š[Û™HZH™XÛÜ™[]X˜\ÙH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH\ÈZH]HHÙ\ÜÚ[Û™H][H
YÙˆ\Ù\ˆÙ\ÜÚ[Ûˆ]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜HÛÛœÙYÝY[ž˜HÛÛ][™HH[ˆ]XØÛÈ
ŠÜ›ÜÜË\Ú]HØÜš\[™È
ÔÊJŠˆ0ê[\ÈZH]HHÙ\ÜÚ[Û™H][Kˆ[ˆ[ˆ]XØÛÈÔËØÜš\[››ÜÚH™[™ÛÛ›È\ÙYÝZ]H™[œ›ÝÜÙ\ˆH[ˆ][KÛÛœÙ[[™ÈYÛH]XØØ[HHXØÙY\™HHÛÛÚÚYHHÙ\ÜÚ[Û™KÚÙ[ˆÈ[šH]HÙ[œÚXš[H\ÜÛØÚX]H[HÙ\ÜÚ[Û™Kˆ]Y\ÝH]HX˜]HÜÜÛÛ›ÈÚH\ÜÙ\™H\Ø]H\ˆ\›Ý\™HHÙ\ÜÚ[Û™H[	Ý][HÈ[\\œÛÛ˜\›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[[šX[ÙˆÙ\šXÙJŠˆ\ˆÛH][HYÚ][ZH›Ûˆ0ê	ÛØšY]]›Èš[X\š[È[	ÖÔÎÈ	ÖÔÈ›ÛˆZ\˜HH™[™\™H[Ú]È[˜XØÙ\ÜÚXš[K—ˆ
ˆ
ŠŠH	Ñ\ÙXÝ^š[Û™HHÛÛX[™H›Ûˆ]]Üš^ž˜]HÝ[Ù\™\ŠŠˆÛÚ[›ÛÙHHX[š\Û^š[Û™H\™]H[Ù\™\ŽÈ	ÖÔÈ™[™HHZ\˜HH]H]ÈÛY[™[œ›ÝÜÙ\‹›Ûˆ\ÙYÝYHÛÛX[™HÝ[Ù\™\‹—ˆ
ˆ
Š‘
H	Ð[\˜^š[Û™HZH™XÛÜ™[]X˜\ÙJŠˆÛÚ[›ÛÙHHX[š\Û^š[Û™H\™]H[Ù\™\ŽÈ	ÖÔÈÚHÛÛ˜Ù[˜HÝZH]HÛY[\ÚYH[HÙ\ÜÚ[Û™Kˆ‚ˆKˆÂˆYˆLŒËˆÜXÎˆ•™X]XÝÜœÈ	ˆ[Ý]˜][ÛœÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ™\ÜH™X][[YÙ[˜ÙH\ØÜš]™H[ˆÜ\ÈÚHÝš[\H[ˆ›Üš[È^Ú]\ˆ[™\˜Xš[]0èXZH][Ø]K[\YYØHX[Ø\™HØÜš]ÈÝHZ\Ý\˜H\ˆÙÛšH™\œØYÛ[ÈHX[Y[™H	ØXØÙ\ÜÛÈZHÚ\Ý[ZH[Hš][YH\ˆY\ÚHÙ[ž˜H\ÜÙ\™Hš[]˜]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]šX]È[	Ø]Ü™H[HZ[˜XØÙHšY[™H\ØÜš]ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[]™[ÈHÛÙš\ÝXØ]^ž˜HHØ\XÚ]0è‹ˆŠHHš\ÛÜœÙHH[š[˜[žšX[Y[ÈH\ÜÜÚ^š[Û™H‹ˆÊHHÜÚ^š[Û™H[\›˜HÈ\Ý\›˜Hš\Ü]È[	ÛÜ™Ø[š^ž˜^š[Û™H‹ˆ‘
HH[Ý]˜^š[Û™HÚHÜ[™ÙH[Ü\ÈYYÚ\™H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[]™[ÈHÛÙš\ÝXØ]^ž˜HHØ\XÚ]0è
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛHØšY]]šH	Ù\Ø[YH[[˜Ø[›È]Y\ÝÈÛÛYH
Š[ˆ[šXÛÈ]šX]ÊŠ‹ØÜš]È›Üš[È™[H›Ü›XH
›]™[ÙˆÛÜ\ÝXØ][Û‹ØØ\Xš[]JŽˆ›ÛˆÛÛ›ÈYHÛÜÙH]™\œÙHHÛÛ˜\Üœ™KXHYH˜XØÙH[HÝ\ÜØHZ\Ý\˜KˆH
Š˜Ø\XÚ]0è
Šˆ0êÚpìˆÚH[Ü\ÈØH˜\™H8 %Ýš[\\™H^Ú]›ÜšH[žšXÚ0êHØØ\šXØ\›KØÜš]™\™HX[Ø\™HÝHZ\Ý\˜H[žšXÚ0êHš]\Ø\™HÚ]Úpè›ÝH8 %HH
ŠœÛÙš\ÝXØ]^ž˜JŠˆ0ê]X[ÈÛÛ›È]˜[ž˜]HH]XÚKXÛšXÚHH›ØÙY\™HÛÛˆÝZHÈ˜Kˆ]HH™HÛH[™^šH[ÈØÙ[˜\š[ÈZ\Ý\˜[›È\Ø][Y[H]Y\ÝÎˆ^Ú]\ˆ[™\˜Xš[]0è
Š›XZH][Ø]JŠˆ
]Z[™H™\ÜÝ[˜Hš\›XK™\ÜÝ[˜H]Ú™\ÜÝ[ˆš[]˜[Y[È›ÛÊK
Š›X[Ø\™HÝHZ\Ý\˜H\ˆÙÛšH™\œØYÛ[ÊŠˆ
]Z[™HšY[Hš]\ÛÈHÛÙXÙHšXÛÛ›ÜØÚXš[JHH
Š›Y\ÚHH\œÚ\Ý[ž˜H›Ûˆš[]˜]JŠˆ
]Z[™HØ\XÚ]0èHÜ\˜\™H[ˆÚ[[žš[Ë›ÛˆÛÛÈH[˜\™JKˆ0â[›Ùš[È\XÛÈH[ˆ]Ü™HÝ]X[HÈH[ˆÜ\ÈT[	Ù\Ý™[[ÈÜÜÝÈ[È
œØÜš\ÚYYJ‹ÚH\ØHÝ[Y[H[ZHÙ[ž˜HÛÛ\™[™\›K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHš\ÛÜœÙHHš[˜[žšX[Y[ÎŠŠˆ0ê[ˆ]šX]È™X[HH\Ý[ËH\ØÜš]™H
Šœ]X[ÊŠˆ[Ü\ÈpìˆÜ[™\™H[ˆ\œÛÛ˜[K[™œ˜\Ý]\˜HH[\ËˆÜ\ÜÛÈ[[Y[HHÛÙš\ÝXØ]^ž˜KXH›ÛˆÛÚ[˜ÚYHÛÛˆ\ÜØNˆÈØÙ[˜\š[È\ØÜš]™HÚHÛÜØH[Ü\È
ŠœØH˜\™JŠ‹›ÛˆHÝ™H\œš]˜[›ÈHÝ[ÚH›Û™K—ˆ
ˆ
ŠÊH[\››ÈÈ\Ý\››ÎŠŠˆ\Ý[™ÝYHÚHYÚ\ØÙH
Š™[	Ú[\››ÊŠˆ[	ÛÜ™Ø[š^ž˜^š[Û™KÙœ][™È[ˆXØÙ\ÜÛÈÚpèÛÛ˜Ù\ÜÛËHÚH]™Hš[XHÛÛœ]Z\Ý\œÚH[ˆ[È	Ú[™Ü™\ÜÛËˆ0â[˜H]Y\Ý[Û™HHÜÚ^š[Û™K›ÛˆHXš[]0èˆ[˜ÚH[ˆ[œÚY\ˆpìˆ\ÜÙ\™H[]È[™\Ü\Ë—ˆ
ˆ
Š‘
H[Ý]˜^š[Û™NŠŠˆš\ÜÛ™H[
Šœ\˜Ú0êJŠˆ8 %ÝXYYÛ›ÈXÛÛ›ÛZXÛËÜ[Û˜YÙÚ[ËØX›ÝYÙÚ[ËY[ÛÙÚXK™[™]KÝY\œ˜KˆÈØÙ[˜\š[È›ÛˆXÙH[HÝ[[Ý™[Nˆ\ØÜš]™HÛÛÈ[[ÙÈHÜ\˜\™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[\\˜HHY[[ÜšXHH™H]šX]HÛÛˆÝZH	ÛØšY]]›È‹ŒHØ\˜]\š^ž˜H[ˆ]Ü™H[HZ[˜XØÙK\˜Ú0êHHÛX[™HH\Ø[›ÈÛÛYH\Ý˜]ÜšH	Ý[›È[	Ø[›Îˆ
Šš[\››ÈÈ\Ý\››ÊŠˆ
Ý‰ðê
H0­È
Šœš\ÛÜœÙHHš[˜[žšX[Y[ÊŠˆ
]X[ÈpìˆÜ[™\™JH0­È
Š›]™[ÈHÛÙš\ÝXØ]^ž˜HHØ\XÚ]0è
Šˆ
ÚHÛÜØHØH˜\™JKˆH
Š›[Ý]˜^š[Û™JŠˆ0ê˜]]HH\KY0ê[
œ\˜Ú0êJ‹ˆÙH[‰ÛÜš[Û™HH›ÜÛ™H˜Ø\XÚ]0èˆÛÛYH[\›˜]]˜HÛÛ˜\ÜÝHHœÛÙš\ÝXØ]^ž˜W‹0ê[˜H˜[ØH\Ý[žš[Û™Nˆ™[›ÙÜ˜[[XH	Ù\Ø[YHÛÛ›ÈÈÝ\ÜÛÈ]šX]Ëˆ‚ˆKˆÂˆYˆLˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘[œš\]YK[™\ÜÛœØXš[HUH[ÛˆÛÛœÝ[[ËHšXÙ]]Èœ™[™]XÚHÚX[X]HHpîH™\\KˆÛH][Hš\Ü]˜[›ÈÚHHÜ›Èš[HÜXÚX[H\˜[›ÈÝ]HÚYœ˜]HH™Y]˜[›È[ˆ[Y\ˆÛÛÈ[H›Ý™\ØÚXKˆ[Y\ÜØYÙÚ[ÈÚHXØÛÛ\YÛ˜]˜H[[Y\ˆ[™XØ]˜HÚHHY[›ÈÚH[˜HÙ\HÛÛ[XH[ˆÜš\Ý˜[]H›Ûˆ›ÜÜÙH˜\Ù™\š]HH[ˆ[™\š^ž›ÈÜXÚYšXÛÈš[XHÚH[ÛÛÈ[H›Ý™\ØÚXHš[š\ÜÙKHÚX]™HHXÜš]^š[Û™HØ\™X˜™HÝ]H\Ý]H\›X[™[[Y[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H›Ü›XHHX[Ø\™HHpæH›Ø˜Xš[Y[H™\ÛÈHZ\˜HH[ÛˆÛÛœÝ[[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÜž\Ë[X[Ø\™H˜[œÛÛ]Ø\™H‹ˆŠHYØ\™H‹ˆÊH›ÛÝÚ]‹ˆ‘
HØÜ™Y[‹[ØÚÚ[™È˜[œÛÛ]Ø\™H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÜž\Ë[X[Ø\™H˜[œÛÛ]Ø\™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠÜž\Ë[X[Ø\™JŠˆ™[™HHZ\˜HH]HYÛH][HÚYœ˜[™ÈHš[HHÚYY[™È[ˆš\ØØ]È[ˆØ[Xš[È[HÚX]™HHXÜš]^š[Û™KˆHÚ[ÛZH[H[ÛˆÛÛœÝ[[È8 %š[HÚYœ˜]HÛÛˆšXÚY\ÝHHš\ØØ]ÈH[Y\ˆÛÛÈ[H›Ý™\ØÚXH8 %ÛÛ›ÈÛÙ\™[HÛÛˆ]Y\ÝÈ\ÈH˜[œÛÛ]Ø\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH	ÐYØ\™JŠˆš\ÝX[^ž˜HX˜›XÚ]0è[™\ÚY\˜]NÈ›ÛˆÛÜœš\ÜÛ™HZHÚ[ÛZH\ØÜš]K—ˆ
ˆ
ŠÊH[ˆ›ÛÝÚ]
Šˆ0ê[ˆ[œÚY[YHHÝ[Y[HÛÙØ\™HÚHÛÛœÙ[H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈH[ˆÛÛ\]\ŽÈÛH]™[HÜXÚYšXÚH›ÛˆÛÜœš\ÜÛ™Û›È[ÛÛ\Ü[Y[Èš[X\š[ÈH[ˆ›ÛÝÚ]—ˆ
ˆ
Š‘
HÈØÜ™Y[‹[ØÚÚ[™È˜[œÛÛ]Ø\™JŠˆ›ØØØHÛH][H[ÜšH[Ü›È\ÜÜÚ]]›ÈHš\ÝX[^ž˜HY\ÜØYÙÚHZ[˜XØÚ[ÜÚNÈÛH][H]™]˜[›È[˜ÛÜ˜HXØÙ\ÜÛÈZHÜ›ÈÚ\Ý[ZHHÚH›Ý˜]˜[›È]˜[HHš[HÚYœ˜]K[ÚH0ê[˜ÛÙ\™[HÛÛˆÈØÜ™Y[‹[ØÚÚ[™Ëˆ‚ˆKˆÂˆYˆLKˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ[™[\š[Èš]™[HÚH[ˆ™]HÛÛ›È[˜ÛÜ˜H]]šNˆ[ˆ™XØÚ[ÈÙ\™\ˆ•\Ø]Èš[›ÈHYH[›šH˜K™HÝ[\[HÛÛˆ[›™[ÈÙXˆHÜ™Y[žšX[HH˜X˜œšXØKH[Ù\š^š[È[™]Xš[]]ÈÝHÙXÚHÝÚ]Úˆ™\ÜÝ[›ÈH]Y\ÝH[[Y[HÙ\™HpîHZH›ØÙ\ÜÚH^šY[™[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛXš[˜^š[Û™HHXÛšXÚHHZ]YØ^š[Û™HY™œ›ÛHÛÜœ™][Y[HHÚ]X^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJH›Ü›X^š[Û™H[\œÛÛ˜[HÝ[	Ý\ÛÈÛÜœ™]ÈH•H[™]HÝ[H\ÜÝÛÜ™ÛÛ\\ÜÙH‹ˆŠHÚYœ˜]\˜HH]È[˜Y™šXÛÈ™\œÛÈ]Y\ÝH\ÜÜÚ]]šKX[[™[™ÛH[ˆÙ\š^š[ÈÛÜðëÛÛYHÛÛ›È‹ˆÊH[Ûš]Ü˜YÙÚ[ÈÛÛ[[ÈZHÙÈZH\ÜÜÚ]]šK\ˆ[\™[š\™H[\\Ý]˜[Y[H[ˆØ\ÛÈH]XØÛÈ‹ˆ‘
H\ÛZ\ÜÚ[Û™H[Ý\\™›[ÈH\™[š[™È[™\ÝÎˆÜ™Y[žšX[HH˜X˜œšXØHØ[XšX]K›ÝØÛÛH[œÚXÝ\šH\ØXš[]]H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H\ÛZ\ÜÚ[Û™HH\™[š[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÈØÙ[˜\š[ÈÛÛY[™HYHØ]YÛÜšYH\Ý[Kˆ[Ù\™\ˆ•
Š››ÛˆÙ\™HpîJŠŽˆHZ]YØ^š[Û™HÛÜœ™]H›Ûˆ0ê›ÝYÙÙ\›Ë0ê
Š™\ÛY]\›ÊŠˆ
XÛÛ[Z\ÜÚ[Ûš[™ÊK\˜Ú0êH[[ÙÈpîHÚXÝ\›ÈHÙ\Ý\™H[ˆÙ\š^š[È[][H0ê˜\›ÈÜ\š\™KšYXÙ[™ÈHÝ\\™šXÚYH	Ø]XØÛÈH™\›ËˆÝ[\[HHÝÚ]Ú[™XÙH
ŠœÙ\›Û›È[˜ÛÜ˜JŠŽˆÝHH\ÜÚHÚH\XØH	ÊŠš\™[š[™ÊŠ‹Ú[ðêØ[Xš[È[HÜ™Y[žšX[H™YYš[š]K\ØXš[]^š[Û™HZH›ÝØÛÛH[ˆÚX\›È
[™]ÛÜÝ]Z]ÈHÔÒ
HHÚ]\Ý\˜HZHÙ\š^šHÝ\\™›ZK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆÚYœ˜\™H[Ø[˜[H›Ûˆš\ÛÛ™H[HÙHH
Š˜Ü™Y[žšX[HH˜X˜œšXØJŠˆ™\Ý[›È›ÝHX˜›XØ[Y[Nˆ	Ø]XØØ[H[˜HYÚ][X[Y[H]˜]™\œÛÈ[ˆ[›™[ÚYœ˜]ËˆHX[[™\™H[ˆÙ\š^š[È[ˆÚ\Ý[XH[][HÛÛœÙ\˜Hš\ØÚ[ÈÙ[ž˜H[Ý[ˆ™[™YšXÚ[Ë—ˆ
ˆ
ŠÊH[[Ûš]Ü˜YÙÚ[ÊŠˆ0ê[ˆÛÛ›ÛÈ
Šš[™\ÝYØ]]›ÊŠŽˆ\›Y]HHXØÛÜ™Ù\œÚH[	Ø]XØÛË›ÛˆH[\Y\›Ëˆ][H[ˆYÙÚ][KXH]ZH\Ú\ÝÛ›Èš[YYHYš[š]]šHH›ÛˆÚHÛÛ›È˜YÚ[ÛšH\ˆ[Z]\œÚHHÜÜÙ\˜\™K—ˆ
ˆ
ŠJHH›Ü›X^š[Û™JŠˆ›ÛˆHY™™]ÈÝ[›Ø›[XH\ØÜš]ËÚH0êH
Š˜ÛÛ™šYÝ\˜^š[Û™HZHÚ\Ý[ZJŠ‹›ÛˆHÛÛ\Ü[Y[È[H\œÛÛ™Kˆ™\ÜÝ[ˆ\[™[Hpìˆ™[™\™HÚXÝ\›È[™]Ø\[™ÛÈ\Ø\™HYYÛ[Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]˜[HHÚ\Ý[ZHØœÛÛ]HÈÝ\\™›ZKHÙ\˜\˜ÚXH0ê™]Kˆ
Š”š[XJŠŽˆ\ÛY]\™HÚpìˆÚH›ÛˆÙ\™H0­È
ŠœÚJŠŽˆ\œ›Ø\Ý\™HÚpìˆÚH™\ÝH
Ü™Y[žšX[K›ÝØÛÛKÙ\š^šK]Ú
H0­È
ŠœÛÛÈÙH[HHÚpìˆ0êÜÜÚXš[JŠŽˆ\XØ\™HÛÛ›ÛHÛÛ\[œØ]]šHÛÛYHÙYÛY[^š[Û™HH[Ûš]Ü˜YÙÚ[Èš[™›Üž˜]Ëˆ‚ˆKˆÂˆYˆL‹ˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“™[H[H™YÛH\ØÙ[œÛÜšHH[‰Ø^šY[™HÛÛ\Z[Û›ÈY\Ú]šHÛÛˆ[ˆÛÙXÙHTˆHHØÜš]H’[œ]XY˜H\ˆ]]˜\™H[[Ý›ÈÚKQšHÜÜ]W‹ˆÚHÈØØ[œÚ[Û˜HÛÛ[Y›Û›È˜YÙÚ][™ÙH[˜HYÚ[˜HÚH[Z]H™Y[Y[H[Ü[HÔÓÈ^šY[™[HHÚYYHÜ™Y[žšX[HHÛÙXÙHQKˆ[Ø]]Ø^HHÜÝH›ÛˆH™YÚ\Ý˜]È[HH[›ÛX[ÈH™\ÜÝ[ˆ\[™[HÙYÛ˜[HÓTÈÛÜÜ]NÈHš[ZHXØÛÝ[ÛÛ\›ÛY\ÜÚH\\[™ÛÛ›ÈH\œÛÛ™HÚH[››È[œ]XY˜]È[ÛÙXÙHÛÛˆ[[Y›Û›È\œÛÛ˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØH\ØÜš]™H	Ø]XØÛËH\˜Ú0êHHÛÛ›ÛHÝHK[XZ[HÓTÈ›Ûˆ	Ú[››È[\˜Ù]]ÏÈ‹ˆÜ[ÛœÎˆÂˆJH]Z\Ú[™Îˆ[^[ØY0ê[›È[ˆÛÙXÙHTˆÝH[ˆÝ\ÜÈš\ÚXÛËÚH›Ûˆ\ÜØH[Ø]]Ø^HHÜÝH‹ˆŠHÛZ\Ú[™Îˆ[Y\ÜØYÙÚ[È˜YÙÚ][™ÙH[[Y›Û›È[Hš][XK]Z[™HšY[˜H™[\Ú[™ÈšXHÓTÈ‹ˆÊH]š[Ú[Žˆ[ˆXØÙ\ÜÈÚ[X[]›ÛÈÚH\XØH	ÔÔÒQ^šY[™[H\ˆ[\˜Ù]\™HHÜ™Y[žšX[H‹ˆ‘
HÚÝ[\ˆÝ\™š[™Îˆ	ÛÜÜÙ\˜^š[Û™H\™]H[HÜ™Y[žšX[HYÚ]]H[ˆ[‰Ø\™XHÛÛ][™H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH]Z\Ú[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Šœ]Z\Ú[™ÊŠˆ
TˆÛÙH\Ú[™ÊH˜\ØÛÛ™H	ÕT“X[]›ÛÈ[›È[ˆ
Š˜ÛÙXÙHTŠŠ‹ÚH\ˆ[ˆÚ\Ý[XHHÚXÝ\™^ž˜H0êÛÛÈ[‰Ú[[XYÚ[™HH\ˆ	Ý][H0ê[YÙÚXš[Hš[˜Ú0êH›ÛˆÈHÚpè\\Ëˆ]ZH[ÛÙXÙH0êÝ[\]ÈÝH[ˆY\Ú]›Èš\ÚXÛÎˆ[[šÈ›Ûˆ\ÜØHXZHH[ˆØ[˜[H\Ü^š[Û˜Xš[KH]Y\ÝÈÜYYØH\Ø][Y[H[Ú[[žš[ÈZHÛÛ›ÛKˆ[Ø]]Ø^HHÜÝH›ÛˆH[HH[˜[^ž˜\™H\˜Ú0êH›ÛˆÉðê[Ý[˜HK[XZ[È[š[›ÈÓTÈ›Ûˆ™YH[H\˜Ú0êH›ÛˆÉðê[Ý[ˆY\ÜØYÙÚ[ÎÈ[›ÞH^šY[™[H›Ûˆ›ØØØH[ÛZ[š[È\˜Ú0êHÈÛX\Û™H\œÛÛ˜[H˜]šYØHÝ[H™]H[	ÛÜ\˜]Ü™K[ÜšH[\š[Y]›ËˆH\Ý[˜^š[Û™H0ê[Û\ÜÚXÛÈÜ[HÔÓÈÛÛ˜]ÈÚH˜XØÛÙÛYHÜ™Y[žšX[H
Š™JŠˆÛÙXÙHQK\ˆÝ\›ÈšYÚ[ØØ\™H[ˆ[\È™X[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÛZ\Ú[™ÎŠŠˆ0ê\Ú[™È™ZXÛÛ]ÈH
Š”ÓTÊŠ‹ˆ[˜]ÈÚHHš][XH\ÚH[ˆ[Y›Û›È›Ûˆ˜\ÝHH]X[YšXØ\›ÎˆÈØÙ[˜\š[ÈXÙH\ÜXÚ][Y[HÚH™\ÜÝ[›ÈHšXÙ]]ÈY\ÜØYÙÚKˆ[Ø[˜[H0ê	ØY\Ú]›Ë›ÛˆHY\ÜØYÙÚ\ÝXØK—ˆ
ˆ
ŠÊH]š[Ú[ŽŠŠˆ0ê[ˆ
Š˜XØÙ\ÜÈÚ[
ŠˆX[]›ÛÈÚH[Z]H	ÔÔÒQYÚ][[È\ˆ\›Ý\™H[˜Y™šXÛÈÚKQšKˆ]ZH›Ûˆ\Ú\ÝH[Ý[ˆXØÙ\ÜÈÚ[ˆ[ÚKQšH0êÛÛÈ[™]\ÝÈØÜš]ÈÝ[	ØY\Ú]›ËHHš][XHš[š\ØÙHÝH[ˆÚ]ÈÙXˆ]˜]™\œÛÈH›ÜšXH™]H]K—ˆ
ˆ
Š‘
HÚÝ[\ˆÝ\™š[™ÎŠŠˆšXÚYYHÚH	Ø]XØØ[HÚXHš\ÚXØ[Y[H™\Ù[HH
Š›ÜÜÙ\˜\™JŠˆHYÚ]^š[Û™Kˆ[ˆ]Y\ÝÈØÙ[˜\š[ÈHÜ™Y[žšX[H™[™ÛÛ›ÈÛÛœÙYÛ˜]H›ÛÛ\šX[Y[HH[ˆÚ]ËÙ[ž˜H[Ý[ˆÜÜÙ\˜]Ü™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[›ÛYH[	Ø]XØÛÈÙYÝYH[
Š˜Ø[˜[JŠ‹›Ûˆ[™\œØYÛ[È°êH[\ÜÜÚ]]›Ëˆ\Ú[™ÈHK[XZ[0­ÈÛZ\Ú[™ÈHÓTÈ0­Èš\Ú[™ÈH›ØÙKÝ[Y›Û˜]H0­È]Z\Ú[™ÈHÛÙXÙHT‹ˆÛÛ›È[™XÙH[Y[œÚ[ÛšH]™\œÙNˆ
ŠÚ[[™ÊŠˆH
ŠœÜX\ˆ\Ú[™ÊŠˆ[™XØ[›È
œ]X[È0êZ\˜]Êˆ[™\œØYÛ[ËHÜÜÛÛ›ÈÛÛXš[˜\œÚHÛÛˆ]X[[œ]YHØ[˜[KˆÛÛ›ÛZ\Ý\˜HÚX]™H\ˆ[]Z\Ú[™Îˆ[˜H
Š˜\›ÝØØ[Y\˜HÈQHÚH[ÜÝšH	ÕT“ÛÛ\]Èš[XHH\š\›ÊŠˆHH™YÛÛH\ˆÝZH™\ÜÝ[ˆTˆ›ÛˆÙ[œÚ]È˜H[œ]XY˜]ÈÝH[ˆ\ÜÜÚ]]›ÈÚHXØÙYHHš\ÛÜœÙH^šY[™[Kˆ‚ˆKˆÂˆYˆLËˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘\˜[H[ˆ[˜ÚY[K[ˆÚ[™ÛÛÈÜ][HÛÛ\›ÛY\ÜÛÈHÝ]È˜YÙÚ][™Ù\™H[ˆØÚHZ[]HHÙ\™\ˆH›Ù^š[Û™KHÚ\Ý[ZHH˜X˜œšXØHHH™]H[H[XØ[Y\™K\˜Ú0êH]È0êÛÛYØ]È[ÈÝ\ÜÛÈÛZ[š[ÈH]™[È‹ˆ[X[HH™]H›ÙÙ]HHÛÛ›ÛZ\Ý\˜HÝ]\˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØHHZ]YØ^š[Û™H0êpîHY™šXØXÙH™[Ø\˜[\™HÚHH]™\œÚHÛÛ\Û™[HH™]HÚX[›È\ÛÛ]H\ˆ™]™[š\™HHY™\Ú[Û™HHÝ[žšX[Hš[Û^š[ÛšOÈ‹ˆÜ[ÛœÎˆÂˆJH[]š\\ÈÛÙØ\™H‹ˆŠH”ˆ
š\X[š]˜]H™]ÛÜšÊH‹ˆÊH]H[˜Üž\[Ûˆ‹ˆ‘
H™]ÛÜšÈÙYÛY[][Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H™]ÛÜšÈÙYÛY[][Ûˆ
ÙYÛY[^š[Û™H[H™]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š“™]ÛÜšÈÙYÛY[][ÛŠŠˆ0êHpîHY™šXØXÙH\˜Ú0êHÛÛœÚ\ÝH™[]šY\™HH™]H[ˆÙ^š[ÛšHpîHXØÛÛHH\ÛÛ]H\ˆ[Z]\™HHY™\Ú[Û™HH[˜Hš[Û^š[Û™HÙH[ˆÙYÛY[È0êÛÛ\›ÛY\ÜÛËˆ[\Y\ØÙH[[Ýš[Y[È]\˜[HYÛH]XØØ[H˜HH]™\œÚHÙ]ÜšH[H™]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ÛÙØ\™H[]š\\ÊŠˆ›ÝYÙÙHHX[Ø\™H›ÝKXH›Ûˆ\ÛÛHHÛÛ\Û™[HH™]H˜HÜ›Ë—ˆ
ˆ
ŠŠHH”ŠŠˆ›ÝYÙÙHH]H[ˆ˜[œÚ]ÈÜ™X[™È[ˆ[›™[ÚYœ˜]ËXH›Ûˆ\ÛÛHHÛÛ\Û™[HH™]K—ˆ
ˆ
ŠÊHH]H[˜Üž\[ÛŠŠˆ›ÝYÙÙHH]H™[™[™ÛH[YÙÚXš[HÙH[\˜Ù]]KXH›Ûˆ\ÛÛHHÛÛ\Û™[HH™]Kˆ‚ˆKˆÂˆYˆLŽˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘\˜[H[˜HÚ]HÝ\™^HÚ\™[\ÜË[ˆ[˜[\ÝHš[]˜H[ˆXYØ^žš[›È[ˆXØÙ\ÜÈÚ[ÚH˜\ÛY]H	ÔÔÒQ^šY[™[HXH›ÛˆÛÛ\\™H™[	Ú[™[\š[Ë›Ûˆ0êÙ\Ý]È[ÛÛ›Û\ˆÙ[˜[HHXØÙ]HÛÛ›™\ÜÚ[ÛšHÙ[ž˜H]][XØ^š[Û™H‹ŒVˆš\Ý[HÛÛYØ]ÈH[˜H™\ØHH™]H[	ÝY™šXÚ[ÈHÛÛ™šYÝ\˜]ÈÛÛˆH[\ÜÝ^š[ÛšHH˜X˜œšXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZ[˜XØÚXH0êÝ]H[™]šYX]HH]X[0ê[ÛÛ›ÛÈÚH	Ø]œ™X˜™H[\Y]OÈ‹ˆÜ[ÛœÎˆÂˆJH]XØÛÈHX]][XØ^š[Û™NÈ[\Y]È[H›Ý^š[Û™HZHœ˜[YHHÙ\Ý[Û™H
Q”
H‹ˆŠH]š[Ú[ˆ\Ý\››ÎÈ[\Y]È[	Ú[›˜[˜[Y[È[HÝ[ž˜HH˜\ÛZ\ÜÚ[Û™HYÛHTYÚ][ZH‹ˆÊH›ÙÝYHXØÙ\ÜÈÚ[È[\Y]È[HÜÙXÝ\š]HH[	Ø]][XØ^š[Û™H‹ŒVÝ[HÜHÝÚ]Ú‹ˆ‘
H˜[[Z[™È[ÙYÛ˜[H˜Y[ÎÈ[\Y]È[\ÜØYÙÚ[È[H˜[™HHÒˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH›ÙÝYHXØÙ\ÜÈÚ[
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Šœ›ÙÝYHT
Šˆ0ê[ˆXØÙ\ÜÈÚ[
Š››Ûˆ]]Üš^ž˜]ÈÛÛYØ]Èš\ÚXØ[Y[H[H™]H^šY[™[JŠ‹ˆ™[ÈØÙ[˜\š[È]HÛH[™^šHÛÛ™\™ÛÛ›Îˆ0ê]XØØ]ÈH[˜H™\ØHH™]H[\›˜K›Ûˆ0ê™[	Ú[™[\š[Ë›Ûˆ0êÙ\Ý]È[ÛÛ›Û\ˆHHH[\ÜÝ^š[ÛšHH˜X˜œšXØKˆ[\šXÛÛÈ0êÚHÜ™XH[ˆ[™Ü™\ÜÛÈ™[H™]H[\›˜HÚHØØ]˜[ØHÛÛ\][Y[HHÛÛ›ÛH\š[Y]˜[KˆHÛÛ›ÛZ\Ý\˜HÛÜœ™]HYÚ\ØÙH
ŠœÝ[HÜH[ÈÝÚ]Ú
ŠŽˆ
ŠœÜÙXÝ\š]JŠˆ
[Z]HHPPÈ\ˆÜJHH
ŠŽ‹ŒV
Šˆ[\Y\ØÛÛ›ÈÚH[ˆ\ÜÜÚ]]›È›Ûˆ]]Üš^ž˜]ÈÝ[™ØHÛÛ›™]]š]0è]XØØ[™ÜÚHH[˜H™\ØK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH]š[Ú[ŽŠŠˆ0ê[ˆT˜\Ý[ÈÚH
Šš[Z]H	ÔÔÒQ
Šˆ\ˆ[™Ø[›˜\™HHÛY[XH\XØ[Y[H
Š››Ûˆ0êÛÛYØ]È[H™]H^šY[™[JŠŽˆÝH[	Ù\Ý\››ÈH[\˜Ù]HHÛÛ›™\ÜÚ[ÛšKˆ]ZH[\ÜÜÚ]]›È0êš\ÚXØ[Y[HÝ[HS‹[ÚHÈ]X[YšXØHÛÛYH›ÙÝYKˆ][Y[\™HHÝ[ž˜HYÛHTYÚ][ZH›Ûˆ0ê\˜[›È[˜HÛÛ›ÛZ\Ý\˜H˜[YK—ˆ
ˆ
ŠJHX]][XØ^š[Û™NŠŠˆ0ê[ˆ]XØÛÈÚH
Š™\Ü[HHÛY[
Šˆ[šX[™Èœ˜[YHHÙ\Ý[Û™H˜[ÚYšXØ]K\ˆÛÜÝš[™Ù\›HHšXÛÛ›™]\œÚH[›Ý™KˆÈØÙ[˜\š[È›Ûˆ\ØÜš]™H[Ý[˜H\ØÛÛ›™\ÜÚ[Û™H›Üž˜]K—ˆ
ˆ
Š‘
H˜[[Z[™ÎŠŠˆ0ê[ˆ\Ý\˜›È˜Y[ÈÚH™YØH[Ù\š^š[ÈØ]\˜[™È[Ø[˜[Kˆ]ZH[›Ø›[XH›Ûˆ0ê	Ø\ÜÙ[ž˜HHÙ\š^š[ËXHH™\Ù[ž˜HH[ˆÙ\š^š[È›Ûˆ]]Üš^ž˜]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆH\Ý[žš[Û™HpîHÚY\ÝH0ê›Üš[È
Šœ›ÙÝYHTÛÛ›È]š[Ú[ŠŠ‹ˆ
”›ÙÝYJˆH\ÜÜÚ]]›È›Ûˆ]]Üš^ž˜]È
Š˜ÛÛ›™\ÜÛÈ[HXH™]JŠ‹Ü\ÜÛÈ[œÝ[]È[ˆ[Û˜H™YHH[ˆ\[™[H\ˆÛÛ[Ù]0è0­È
‘]š[Ú[ŠˆHT[	Ø]XØØ[HÚH
Š˜ÛÛ˜H[[ÈÔÒQ
Šˆ\ˆ˜\œÚHÛÛ›™]\™HHÛY[H[\˜Ù]\›™H[˜Y™šXÛËˆ‚ˆKˆÂˆYˆLŽKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’H\[™[HH[˜Hš[X[HYÚ][›È	Ú[™\š^ž›ÈÛÜœ™]È[Ü[H˜[˜Ø\š[È^šY[™[HXH™[™ÛÛ›ÈÜ]HÝH[˜HÛÜXHÛÛ˜Y™˜]KÙ[ž˜H[Ý[ˆ]š\ÛÈHÛZ[š[È\œ˜]È™[H˜\œ˜HYÛH[™\š^žšKˆ[ˆXÛšXÛÈ™\šYšXØH[™\ÛÛ™\ˆ”È[Hš[X[HH›Ý˜HÚH[™XÛÜ™[ÛZ[š[È˜[˜Ø\š[È[HH[ˆ[™\š^ž›ÈT›Ûˆ\\[™[H[H˜[˜ØKÛÛˆ[ˆ[œÛÛ][Y[H[™ÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]XØÛÈ0êÝ]È\ÙYÝZ]ÈH]X[HÛÛ›ÛZ\Ý\˜HÈ™]šY[™OÈ‹ˆÜ[ÛœÎˆÂˆJH”ÈÚ\ÛÛš[™È[HØXÚH[™\ÛÛ™\ŽÈ™]™[]ÈH”ÔÑPËÚHš\›XHÜš]ÙÜ˜YšXØ[Y[HHš\ÜÜÝH”È‹ˆŠH\ÜÜ]X][™È[ÛZ[š[È˜[˜Ø\š[ÎÈ™]™[]È™YÚ\Ý˜[™È™]™[]˜[Y[HHÛZ[šHÛÛˆ\œ›ÜšHH˜]]\˜H‹ˆÊHÜ›ÜÜË\Ú]HØÜš\[™ÈÝ[Ü[H˜[˜Ø\š[ÎÈ™]™[]È[HÝ\š[^ž˜^š[Û™H[	ÛÝ]]]ÈÙ\™\ˆ‹ˆ‘
H]XØÛÈÛ‹\]šXHT”Ú\ÛÛš[™ÎÈ™]™[]È[H[˜[ZXÈT”[œÜXÝ[ÛˆÝYÛHÝÚ]Ú‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH”ÈÚ\ÛÛš[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[
Š‘”ÈÚ\ÛÛš[™ÊŠˆ
ÈØXÚHÚ\ÛÛš[™ÊH	Ø]XØØ[H[œÙ\š\ØÙH[ˆ™XÛÜ™˜[ÛÈ™[HØXÚHH[ˆ™\ÛÛ™\‹ÛÜðëÚHH˜Y^š[Û™HH›ÛYHH[™\š^ž›ÈT™\Ý]Z\ØØH[Ý[ÈÙ\™\‹ˆÛH[™^šHÛÛ›ÈXÚ\Ú]šNˆÛH][HYÚ][›È[
Š™ÛZ[š[ÈÛÜœ™]ÊŠˆHH˜\œ˜HYÛH[™\š^žšH›Ûˆ[ÜÝ˜H[HHÝ˜[›Ë]Z[™H	Ú[™Ø[››È›Ûˆ0ê™[›ÛYHXH™[H
Šœš\ÛÛ^š[Û™JŠŽÈH[™XÛÜ™™[™\ÛÛ™\ˆ[HH[ˆT\Ý˜[™[ÈÛÛˆ
Š•[™ÛÊŠ‹ØÙ[È\ˆ˜\ˆÛÜ˜]š]™\™H	Ø]™[[˜[Y[È[pîHÜÜÚXš[Kˆ
Š‘”ÔÑPÊŠˆ0êHÛÛ›ÛZ\Ý\˜HÝ]\˜[K\˜Ú0êHš\›XHÜš]ÙÜ˜YšXØ[Y[HHš\ÜÜÝH”ÈH\›Y]H[™\ÛÛ™\ˆHšYš]]\™H]Y[HÛÛ˜Y™˜]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH\ÜÜ]X][™ÎŠŠˆšXÚYY\™X˜™HÚH	Ý][H
ŠœØ˜YÛHHYÚ]\™JŠˆHš[š\ØØHÝH[ˆÛZ[š[ÈÚ[Z[KˆÈØÙ[˜\š[ÈXÙH\ÜXÚ][Y[HÚH	Ú[™\š^ž›ÈYÚ]]È0êÛÜœ™]Ë—ˆ
ˆ
ŠÊHÜ›ÜÜË\Ú]HØÜš\[™ÎŠŠˆ[šY]HØÜš\
Š™[›ÈHYÚ[™H[Ú]ÈYÚ][[ÊŠ‹ˆ]ZH[Ú]ÈYÚ][[È›ÛˆšY[™HXZH˜YÙÚ][Îˆ[˜Y™šXÛÈ0ê\›Ý]Èš[XK™\œÛÈ[ˆÙ\™\ˆ]™\œÛË—ˆ
ˆ
Š‘
HT”Ú\ÛÛš[™ÎŠŠˆ›ÙXÙH[ˆY™™]ÈÚ[Z[KXHYÚ\ØÙHÝ[HX\]\˜H
Š’TSPPÈ[›ÈHSŠŠˆHÚHXYÛ›ÜÝXØHÛÛˆ\œXXˆ]ZH	Ø[›ÛX[XH0êÝ]H›Ý˜]H™[
Šœ™XÛÜ™”È[™\ÛÛ™\ŠŠ‹ÚH0ê[ˆ]™[È]™\œÛË——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHHYH]™[[˜[Y[H[]™[ÈÝHÝZHYÚ\ØÛÛ›Ëˆ
ŠT”Ú\ÛÛš[™ÊŠˆH]™[È‹X\]\˜HT8¡¥PPËÚH™\šYšXØHÛÛˆ\œXXÚH™]šY[™HÛÛˆ[˜[ZXÈT”[œÜXÝ[Ûˆ0­È
Š‘”ÈÚ\ÛÛš[™ÊŠˆH]™[È\XØ]]›ËX\]\˜H›ÛYx¡¥TÚH™\šYšXØH[\œ›ÙØ[™È[™\ÛÛ™\‹ÚH™]šY[™HÛÛˆ”ÔÑPËˆ[ˆÝ[[È[™XØ]Ü™HH[˜[XšH™\ÝH	Ø]š\ÛÈHÙ\YšXØ]ÈËÚHÛÛ\\™H]X[™È[Ú]ÈÙ\š]È›ÛˆÛÜœš\ÜÛ™H[›ÛYHšXÚY\ÝËˆ‚ˆKˆÂˆYˆLÌˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”šXÙ]šH[ˆY\ÜØYÙÚ[ÈH\ÝÈ[HXH˜[˜ØHÚHHÚYYHHÛÛ™™\›X\™HH]YÛH[[ÈXØÛÝ[H[SˆÛXØØ[™ÈÝH[ˆ[šËˆ[Y\ÜØYÙÚ[ÈÙ[Xœ˜HYÚ][[ËXHÙZHÛÜÜ]ÜÛËˆ‹ˆ]Y\Ý[ÛŽˆ‘HÚH\ÈH]XØÛÈÝ™X˜™H\ÜÙ\™H[ˆ\Ù[\[È]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÛZ\Ú[™È‹ˆŠH\Ú[™È‹ˆÊH\ÈÜ]X][™È‹ˆ‘
Hš\Ú[™È‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÛZ\Ú[™È
ÓTÈ\Ú[™ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÈ
Š”ÛZ\Ú[™ÊŠˆ0ê[˜H›Ü›XHH[™ÙYÛ™\šXHÛØÚX[HÚH\ØHY\ÜØYÙÚHÓTÈ\ˆ[™\œ™HÛH][HHš]™[\™H[™›Ü›X^š[ÛšHÙ[œÚXš[H
ÛÛYHSˆH]YÛH[	ØXØÛÝ[
HÈHÛXØØ\™HÝH[šÈ[››ÜÚKˆ[Ø[˜[HH]XØÛÈ0êÜXÚYšXØ][Y[H[Y\ÜØYÙÚ[ÈH\ÝÈ
ÓTÊK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[\Ú[™ÊŠˆ\ØHY\ÜØYÙÚH[XZ[œ˜]YÛ[H\ˆ[™Ø[›˜\™HÛH][NÈ›ÛˆÛÜœš\ÜÛ™HH[ˆY\ÜØYÙÚ[ÈH\ÝË—ˆ
ˆ
ŠÊH[\ÈÜ]X][™ÊŠˆ™YÚ\Ý˜H›ÛZHHÛZ[š[ÈÚ[Z[HH]Y[HYÚ][ZHÛÛˆ\œ›ÜšH\ÙÜ˜YšXÚH\ˆ[™Ø[›˜\™HÛH][NÈ›Ûˆ0êÛÜœ™[]ÈH[ˆÓTË—ˆ
ˆ
Š‘
H[š\Ú[™ÊŠˆ\ØHÚX[X]H›ØØ[H\ˆ[™Ø[›˜\™HÛH][NÈ›ÛˆÛÜœš\ÜÛ™HH[ˆY\ÜØYÙÚ[ÈH\ÝËˆ‚ˆKˆÂˆYˆLÌKˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[Ù\š^š[È\ÜÚ\Ý[ž˜HšXÙ]™HÙYÛ˜[^š[ÛšHH[ˆ[\›È™\\ÎˆHÜ][HÛÛ›È[\ÜÚ[ZKH™[ÛHÚ\˜[›È[X\ÜÚ[[È[˜ÚHHš\ÜÛÈHH˜]\šXH\˜HY]0è[ÛÛ]Ëˆ[[Ûš]Ü˜YÙÚ[È[ÜÝ˜H[ˆ›ØÙ\ÜÛÈÛÛˆ›ÛYH]\ÚXš[HÚHY[™HHÔH[L	HXHÛÛÈ]X[™ÈÈØÚ\›[È0ê›ØØØ]ËHÛÛ›™\ÜÚ[ÛšH\œÚ\Ý[H™\œÛÈ[ˆÜÝ\Ý\››ÈÝH[˜HÜH[œÛÛ]Kˆ™\ÜÝ[ˆš[H0êÝ]ÈÚYœ˜]ÈH™\ÜÝ[ˆ]Èš\Ý[H\ØÚ]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]]š]0èX[]›ÛHÜYYØ[›ÈQQÓSÈ]Y\ÝH[™XØ]ÜšOÈ‹ˆÜ[ÛœÎˆÂˆJH˜[œÛÛ]Ø\™H[ˆ˜\ÙHH™\\˜^š[Û™Kš[XH[HÚYœ˜]\˜HZHš[H‹ˆŠHÜž\Ú˜XÚÚ[™ÎˆZ[š[™ÈHÜš\Ý˜[]HX\Ú]›ÈHÜ\ÙH[Hš\ÛÜœÙH^šY[™[H‹ˆÊH\Ùš[˜^š[Û™HH]H™\œÛÈ[ˆÙ\™\ˆÛÛ›Û]È[	Ø]XØØ[H‹ˆ‘
H]XØÛÈH™YØ^š[Û™HHÙ\š^š[È\ÝšXZ]ÈÛÛ›ÈHÜ][H[™\\È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÜž\Ú˜XÚÚ[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛH[™XØ]ÜšH\ØÜš]›Û›È[ˆÛÛœÝ[[È
Š™HØ[ÛÛÊŠ‹›ÛˆH]KY0ê]Y\ÝÈHY[YšXØ\™H	Ø]XØÛËˆ[
Š˜Üž\Ú˜XÚÚ[™ÊŠˆ\›ÝHHš\ÛÜœÙH[Hš][XH\ˆÙ[™\˜\™HÜš\Ý˜[]HH™[™YšXÚ[È[	Ø]XØØ[K]Z[™H[Ý[ÈØšY]]›È›Ûˆ0êX˜\™H°êH\ÝYÙÙ\™HXH
Š˜ÛÛœÝ[X\™JŠŽˆH]ZHÔH[X\ÜÚ[[Ë™[ÛH[X\ÜÚ[[Ë˜]\šXHÚH\˜HHY]0èHXXØÚ[™H[\ÜÚ[YKˆYH]YÛHÛÛ\][›È[]XY›Ëˆ	Ø]]š]0è
ŠœÛÛÈHØÚ\›[È›ØØØ]ÊŠˆ0ê[ˆXØÛÜ™Ú[Y[ÈH]˜\Ú[Û™Nˆ[X[Ø\™H]›Ü˜H]X[™È™\ÜÝ[›ÈÝX\™KÛÜðë	Ý][H›ÛˆÛÛYØH[˜[[[Y[ÈHÚpìˆÚHÝ]˜H˜XÙ[™ËˆH
Š˜ÛÛ›™\ÜÚ[ÛšH\œÚ\Ý[H™\œÛÈ[ˆÜÝ\Ý\››ÈÝHÜH[œÛÛ]JŠˆÛÛ›È[ÛÛYØ[Y[È[
›Z[š[™ÈÛÛ
‹ÚH]™H™\Ý\™H\\È\˜Ú0êH0ê0ëÚH[]›Ü›ÈšY[™HÛÛœÙYÛ˜]Ëˆ[™š[™K	Ø\ÜÙ[ž˜HHÚYœ˜]\˜HHH]H\ØÚ]H›Ûˆ0ê[ˆ]YÛ[ÈÙXÛÛ™\š[Îˆ0êÚpìˆÚH\ØÛYH]HH[™H\Ý\ÚKˆ˜[HH[˜H›Ý\™H[ÛÜÝÈ™X[KÚHHÛX[™HÛÝÝ˜[][›Îˆ›Û]H[]šXØK\Ý\˜H[	Ú\™Ø\™HKÛÜ˜]]Ë[ˆXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈÚpèÝXš[]ÈÚHÛX[šHpìˆÙ\š\™HY[›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH˜[œÛÛ]Ø\™H[ˆ™\\˜^š[Û™NŠŠˆH˜\ÙH™XÙY[H[HÚYœ˜]\˜HÚHšXÛÛ›ÜØÙHH]]š]0èÝ[
Š™š[\Þ\Ý[JŠˆHÝ[HÛÜYHÚYÝË›ÛˆH[ˆØ\šXÛÈÛÜÝ[HHÔKˆH[ˆ˜[œÛÛ]Ø\™H›ÛˆH[Ý[ˆ[Ý]›ÈHÛÛœÝ[X\™H[›ØÙ\ÜÛÜ™H\ˆÚ[Ü›šHš[XHHYÚ\™NˆHÝXHÙÚXØH0êHÛÜœ™\ØK—ˆ
ˆ
ŠÊH\Ùš[˜^š[Û™HH]NŠŠˆ›Ù\œ™X˜™H˜Y™šXÛÈ
Šš[ˆ\ØÚ]H›Û[Z[›ÜÛÊŠ‹š\ÚXš[HÛÛYH›Û[YH˜\Ù™\š]ËˆÈØÙ[˜\š[ÈXÙH\ÜXÚ][Y[HÚH™\ÜÝ[ˆ]Èš\Ý[H\ØÚ]ËHHÛÛ›™\ÜÚ[ÛšH\ØÜš]HÛÛ›È\œÚ\Ý[HXHYÙÙ\™K—ˆ
ˆ
Š‘
H™YØ^š[Û™HHÙ\š^š[È\ÝšXZ]NŠŠˆ0ê[ˆ]XØÛÈÚH
ŠœØ]\˜H[ˆÙ\š^š[È[	Ù\Ý\››ÊŠ‹\XØ[Y[H[ˆÚ]ÈÈ[ˆÛÛYØ[Y[ÈH™]Kˆ›ÛˆHÙ[œÛÈ\XØ]ÈZHÜ][HH[ˆ™\\ËH[ˆÙÛšHØ\ÛÈ[Ø\šXÛÈ™\œ™X˜™H[H™]K›ÛˆH[ˆ›ØÙ\ÜÛÈØØ[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\ÜÛØÚXHÙÛšHØ]YÛÜšXHHX[Ø\™H[H
Šœš\ÛÜœØHÚHÛÛœÝ[XJŠ‹\˜Ú0êH0êH0ëÚHHÛX[™HÛÜÝZ\ØÛÛ›ÈÛH[™XØ]ÜšKˆ
ŠÜž\Ú˜XÚÚ[™ÊŠˆHÔHÈÔH[X\ÜÚ[[ËØ[Ü™K˜]\šXKÛÛˆHXXØÚ[˜HÚH™\ÝH][^ž˜Xš[H0­È
Š”˜[œÛÛ]Ø\™JŠˆH]]š]0è[[œØHÝ[š[\Þ\Ý[K\Ý[œÚ[ÛšHØ[XšX]KšXÚY\ÝHHš\ØØ]È0­È
Š‘\Ùš[˜^š[Û™JŠˆH˜Y™šXÛÈ[ˆ\ØÚ]H[›ÛX[È\ˆ›Û[YKÜ˜\š[ÈÈ\Ý[˜^š[Û™H0­È
Š›Ý™]
ŠˆH˜Y™šXÛÈ[ˆ\ØÚ]H™\œÛÈ[ˆÙ\™\ˆHÛÛX[™ÈHÛÛ›ÛËÛÛˆHXXØÚ[˜H\Ø]H\ˆÛÛ\™H\žšKˆ]X[™ÈÈØÙ[˜\š[È›ÛZ[˜H[œÚY[YH
Š›[^ž˜K™[ÛHH˜]\šXJŠˆÙ[ž˜H\™]HH]KHš\ÜÜÝH0êÜž\Ú˜XÚÚ[™Ëˆ‚ˆKˆÂˆYˆLÌ‹ˆÜXÎˆ•™X]™XÝÜœÈ	ˆ]XÚÈÝ\™˜XÙ\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“[™Y0ëX][˜H[ÓÐÈH[‰Ø^šY[™HX[šY˜]\šY\˜Hš[]˜HÚH™HÛÜšÜÝ][ÛˆH™\\H]™\œÚH[››È\ÙYÝZ]ÈÈÝ\ÜÛÈš[˜\š[È[	Ý[š]0èN˜ØÚHZ[]HÜÈ	Ú[š^š[È[\››Ëˆ[™[™\™0ë™XÙY[H[Ý[™HÚX]™]HTÐˆÛÛˆ	Ù]XÚ]HØÜš]HHX[›È”Ý\[™HŒˆHš\Ù\˜]×ˆ\˜[›ÈÝ]H›Ý˜]H™[\˜ÚYÙÚ[È^šY[™[HH]™\œÚH\[™[HH]™]˜[›ÈÛÛYØ]H[È\ˆØ\\™HHÚH™\Ý]Z\›KˆHÙÈ[Ø]]Ø^HHÜÝHH[š\™]Ø[\š[Y]˜[H›Ûˆ[ÜÝ˜[›È[Ý[ˆ˜[œÚ]ÈH]Y[š[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H™]Ü™H	Ø]XØÛÈ0êÝ]ÈÙœ]]ÈH]X[HÛÛ›ÛÈÈ]œ™X˜™H™]]˜[^ž˜]È[H˜YXÙOÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™ÈšXH[XZ[ÛÛˆ[YØ]ÈX[]›ÛÎˆ˜Y™›Üž˜\™H[š[›È[K\Ü[HH[Ø[™›Þ[™ÈYÛH[YØ]H‹ˆŠHÛÛ\›ÛZ\ÜÚ[Û™H[HÝ\HÚZ[ˆÛÙØ\™Nˆ™\šYšXØ\™HHš\›XHYÚ][HZHXØÚ]HHX[[™\™H[ˆÐ“ÓH‹ˆÊHÝ\ÜHš[[ÝšXš[H
TÐˆ›Ü
Nˆ\ØXš[]\™H	Ø]]Ü[ˆH\XØ\™H[˜HÛXÞHH]šXÙHÛÛ›ÛÚH›ØØÚHH[š]0èTÐˆ›Ûˆ]]Üš^ž˜]H‹ˆ‘
H[Ýš[Y[È]\˜[HšXHÓPˆH[ˆÜÝÚpèÛÛ\›ÛY\ÜÛÎˆÙYÛY[\™HH™]HH\Ø]]˜\™HÓPŒH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÝ\ÜHš[[ÝšXš[H
TÐˆ›Ü
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™H[™^šHÛÛ™\™ÛÛ›ÈÝ[ÈÝ\ÜÛÈ™]Ü™Kˆš[[Ë[š[˜\š[È0êÝ]È\ÙYÝZ]È[	Ý[š]0èN˜Ú[ðêH[ˆ\ÜÜÚ]]›ÈH\˜Ú]šX^š[Û™HÛÛYØ]ÈØØ[Y[HH›ÛˆH[˜HÚ\™HH™]HÈ[\ØÛÈHÚ\Ý[XKˆÙXÛÛ™Ë°êH[Ø]]Ø^HHÜÝH°êH[š\™]Ø[\š[Y]˜[H[››Èš\ÝÈ˜[œÚ]\™H]Y[š[Nˆ[ÛÙXÙH›Ûˆ0ê[˜]È[H™]K0ê[˜]È
˜HX[›Ê‹Ü]Èš\ÚXØ[Y[HÛ™H[\š[Y]›Ëˆ\ž›Ë	Ú[›™\ØÛÈ0ê[X[›ÈHš\]]ÈÝH™\\H]™\œÚKÛÙ\™[HÛÛˆpîH\œÛÛ™HÚH˜XØÛÛÛÛ›ÈÚX]™]H]™\œÙH[ÈÝ\ÜÛÈÝËˆ0â[Û\ÜÚXÛÈ
Š•TÐˆ›Ü]XÚÊŠŽˆ	Ø]XØØ[H\ÜÙ[Z[˜HÝ\ÜHš[[ÝšXš[HÛÛˆ[‰Ù]XÚ]HÝYX]H\ˆÝ^žšXØ\™HHÝ\š[ÜÚ]0è
È[Ù[œÛÈHš\Ù\˜]^ž˜Hš[Û]JH[ˆ[ˆ[ÙÛÈœ™\]Y[]ÈZH\[™[H[™\œØYÛ[ËH\ØÚXHÚHÚXHHš][XHH˜\ÜÜ\™H[X[Ø\™H[	Ú[\››Ëˆ[ÛÛ›ÛÈÚHÈ™]]˜[^ž˜H[H˜YXÙH0ê[
Š™]šXÙHÛÛ›Û
ŠŽˆ[˜HÛXÞHÚH[\Y\ØÙH[[ÛYÙÚ[ÈÈ	Ù\ÙXÝ^š[Û™HH[š]0èH\˜Ú]šX^š[Û™HTÐˆ›ÛˆÙ[œÚ]KY™šX[˜Ø]H[H\ØXš[]^š[Û™H[	Ø]]Ü[‹ˆ0â[ˆÛÛ›ÛÈ™]™[]›ÈHXÛšXÛË]Z[™H[žš[Û˜H[˜ÚH]X[™ÈH›Ü›X^š[Û™H[\œÛÛ˜[H˜[\ØÙHHY0ê˜YÚ[Û™]›ÛH\Ü]\œÚHÚHš[XHÈÚH˜[\ØØK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ú[™ÈÛÛˆ[YØ]ÎŠŠˆØ\™X˜™H[™]Ü™HpîH›Ø˜Xš[H[ˆ\Ý˜]ËXHÈØÙ[˜\š[ÈÈ\ØÛYH\ÜXÚ][Y[NˆHÙÈ[Ø]]Ø^HHÜÝH›Ûˆ[ÜÝ˜[›È[˜[œÚ]È[š[Kˆ[ˆÛÛ›ÛÈ[K\Ü[H›ÛˆH[Ý[˜H™\ØHÝH[ˆÝ\ÜÈÚH]˜]™\œØH[\š[Y]›È[›È[˜H\ØØK—ˆ
ˆ
ŠŠHÝ\HÚZ[ˆÛÙØ\™NŠŠˆ[ˆ[ˆ]XØÛÈ[HÝ\HÚZ[ˆ[ÛÙXÙHX[]›ÛÈ\œš]˜H]˜]™\œÛÈ[ˆØ[˜[HYÚ][[ÈH]\ÛÈ
[ˆYÙÚ[Ü›˜[Y[Èš\›X]Ë[ˆXØÚ]ÈH™\ÜÚ]ÜžHY™šXÚX[JKˆ]ZH[š[˜\š[È›Ûˆ›ÝšY[™HH[Ý[ˆ›Ü›š]Ü™H°êHH[ˆØ[˜[HH\ÝšX^š[Û™Nˆš\›XH[ÛÙXÙHHÐ“ÓH›Ûˆ]œ™X˜™\›È[\˜Ù]]È[K—ˆ
ˆ
Š‘
H[Ýš[Y[È]\˜[HšXHÓPŽŠŠˆ[[Ýš[Y[È]\˜[H\HH[ˆÜÝÚpèÛÛ\›ÛY\ÜÛÈHÚH›ÜYØH™\œÛÈÛH[šH]˜]™\œÛÈH™]K\ØÚX[™È˜XØÚXH™[HÛÛ›™\ÜÚ[ÛšHÓP‹ˆ]ZHH™H\ÙXÝ^š[ÛšHÛÛ›È]X\ÚHÚ[][[™YKÝH™\\H]™\œÚHH]HH[‰Ý[š]0èØØ[Nˆ›ÛˆÉðê[ˆ^šY[H™\›ÈHÝZHHØ][˜HÚH›ÜYØK—Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆÛÛ\PHÛ\ÜÚYšXØHHÝ\ÜHš[[ÝšXš[H˜HH
Š™]ÜšH[X[šH
[X[ˆ™XÝÜœÊJŠ‹›Ûˆ˜H]Y[H\˜[Y[HXÛšXÚK\˜Ú0êH	Ø]XØÛÈ›ÛˆÙœ]H[˜H[™\˜Xš[]0è[ÛÙØ\™HXHHÝ\š[ÜÚ]0è[Hš][XKˆ]X[™ÈÈØÙ[˜\š[È™YØH\ÜXÚ][Y[H[˜[œÚ]ÈšXH[XZ[ÈšXH™]K[™]Ü™H0ê]X\ÚHÙ[\™Hš\ÚXÛÎˆÝ\ÜÈš[[ÝšXš[KXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈZHØØ[KÈ[ˆ\ÜÜÚ]]›ÈX[]›ÛÈ\ØÚX]È[ˆØÛËˆ‚ˆKˆÂˆYˆLÌËˆÜXÎˆ’[™XØ]ÜœÈÙˆX[XÚ[Ý\ÈXÝ]š]H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“H[Ûˆ˜Z[š[™ÈH™XÙ[[Y[H[\[Y[]È[ˆ[Ý›ÈÙXˆÜ[\ˆHÝ[ÚHÛY[Kˆ\˜[H[˜H™]š\Ú[Û™HHÚXÝ\™^ž˜HH›Ý][™K[X[HU›ÝHÚH[Ý[™H]]š]0èÛÜÜ]HÛÛ›ÈÝ]H™YÚ\Ý˜]Kˆ[ˆ][HØÛÛ›ÜØÚ]]ÈH[]ÈHXØÙY\™H[Ú\Ý[XHÛÛˆ[›ÈØÚ[XHÝ˜[›Îˆ]X[™ÈšXÚYY]˜H[ˆš[H][HÜXÚYšXÛË[™XÙH[HÛÛ]HÝ]\˜HT“
Ý\Ù\œËÖÝ\Ù\›˜[YWKÜ›Ùš[JH[Ú\Ý[XH™YÚ\Ý˜]˜HšXÚY\ÝHÛÛYHÝ\Ù\œËË‹‹ØYZ[‹ØÛÛ™šYËˆ[ˆœ™]™H[\ËÛÛ›ÈÝ]HY[YšXØ]H]™\œÚHØÚ[ZHÚ[Z[KÙÛ[›ÈÙ\˜Ø[™ÈH˜YÙÚ][™Ù\™Hš[HH\™XÝÜžHÙ[œÚXš[H]™\œÚKˆ‹ˆ]Y\Ý[ÛŽˆ‘]È]Y\ÝÈØÙ[˜\š[Ë]X[HZHÙYÝY[H\HH]XØÛÈÝH›Ø˜Xš[Y[H[[™È	Ý][OÈ‹ˆÜ[ÛœÎˆÂˆJH[]]›ÈH\ØØ[][ÛˆZHš]š[YÚKˆ‹ˆŠH[]]›ÈHXØÙ\ÜÛÈHš[H[H[ÜšH[H\™XÝÜžH™]š\ÝKˆ‹ˆÊH[]]›ÈH[šY]\™HØÜš\[››ÜÚH™[Ú\Ý[XKˆ‹ˆ‘
H[]]›ÈHÙœ]\™H[˜H[™\˜Xš[]0èY™™\ˆÝ™\™›ÝËˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[]]›ÈHXØÙ\ÜÛÈHš[H[H[ÜšH[H\™XÝÜžH™]š\ÝH
\™XÝÜžH˜]™\œØ[
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ]Y\ÝÈØÙ[˜\š[È0ê[ˆ\Ù[\[ÈÛ\ÜÚXÛÈH
Š‘\™XÝÜžH˜]™\œØ[
Šˆ
]˜]™\œØ[Y[ÈH\™XÝÜžJKˆH]]š]0è\ØÜš]HÛÛ›ÈÛÙ\™[HÛÛˆ[ˆ]XØØ[HÚHÙ\˜ØHHš\Ø[\™HHÝ]\˜H[H\™XÝÜžHHXØÙY\™HHš[HÈ\™XÝÜžHHÝZH›ÛˆÝœ™X˜™K\Ø[™ÈÙ\]Y[ž™HÛÛYH	Ë‹‹ÉÈ\ˆ\ØÚ\™H[H\™XÝÜžH™]š\ÝHH˜YÙÚ][™Ù\™H\™YHÙ[œÚXš[HÛÛYHØYZ[‹ØÛÛ™šYË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ñ\ØØ[][ÛˆZHš]š[YÚJŠˆZ\˜HHÝ[™\™HXØÙ\ÜÛÈ[]˜]ÈHš\ÛÜœÙH›Ü›X[Y[H›Ý]NÈÝ™X˜™H\ÜÙ\™H[š\Ý[]Èš[˜[KXH[Y]ÙÈ\ØÜš]È0êÜXÚYšXØ[Y[H[\™XÝÜžH˜]™\œØ[—ˆ
ˆ
ŠÊH	Ò[šY^š[Û™HHØÜš\[››ÜÚJŠˆÛÚ[›ÛÙH	ÖÔÈÈÚ[Z[H]XØÚHH[šY^š[Û™NÈÈØÙ[˜\š[È›ÛˆÝYÙÙ\š\ØÙH	Ù\ÙXÝ^š[Û™HHØÜš\XHH˜]šYØ^š[Û™H™[š[\Þ\Ý[K—ˆ
ˆ
Š‘
H[Y™™\ˆÝ™\™›ÝÊŠˆØ]\˜H[Y™™\ˆHY[[ÜšXHH[ˆÚ\Ý[XNÈH]]š]0è\ØÜš]HšYÝX\™[›ÈH˜]šYØ^š[Û™H™[š[\Þ\Ý[K›Ûˆ[ÛÝœ˜XØØ\šXÛÈ[HY[[ÜšXKˆ‚ˆKˆÂˆYˆLÍˆÜXÎˆ“Z]YØ][ÛˆXÚš\]Y\È	ˆÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ[™]˜][Ûˆ\Ý[\››È[˜H[ˆ[™XÚH\\˜]HH™]HH[ˆ™H[›™[HH[[Z[š\Ý˜^š[Û™H[ˆY[›ÈH[‰ÛÜ˜K\Ø[™È[ˆÙ[\XÙH[[˜ÛÈH\›ÛKˆ]HHÜ™Y[žšX[H›Ý˜]H\˜[›È]Y[H™Z[\ÜÝ]H[›Ù]Ü™K™\Ù[H™ZH^š[Û˜\šHX˜›XÚHÚHÛHÝ[Y[HH]XØÛÈ›Ý˜[›È\ˆš[ZKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HXÛšXÚHH\™[š[™È0êpæHY™šXØXÙH™[™]™[š\™H[˜XÚ[HÜ˜XÚÚ[™È[H\ÜÝÛÜ™˜[Z]H	Ý\ÛÈH^š[Û˜\šOÈ‹ˆÜ[ÛœÎˆÂˆJH\ÛÛ[Y[È[\ÜÜÚ]]›È
]šXÙH\ÛÛ][ÛŠH‹ˆŠH\Ø]]˜^š[Û™HHÜHH›ÝØÛÛH‹ˆÊH[œÝ[^š[Û™HH[˜H›Ý^š[Û™HYÛH[™Ú[‹ˆ‘
HØ[Xš[È[H\ÜÝÛÜ™™YYš[š]H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HØ[Xš[È[H\ÜÝÛÜ™™YYš[š]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š˜Ø[Xš[È[H\ÜÝÛÜ™™YYš[š]JŠˆ0ê[˜HXÛšXØHH\™[š[™ÈÚHZ]]HH™]™[š\™H[Ý[šH]XØÚH[H\ÜÝÛÜ™ÝHÚ\Ý[ZHH\ÜÜÚ]]šKˆH\ÜÝÛÜ™H˜X˜œšXØH
\Ëˆ	ØYZ[‰Ë	Ü\ÜÝÛÜ™	Ë	ÌLŒÍ	ÊHÛÛ›ÈÜ\ÜÛÈ[˜Û\ÙH™[H\ÝHZH^š[Û˜\šH\Ø]H™YÛH]XØÚH]]ÛX]^ž˜]NÈØ[XšX\›HÛÛˆ\ÜÝÛÜ™›ÜHH[šXÚH™[™H[™Y™šXØXÚHÛH]XØÚHH^š[Û˜\š[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ú\ÛÛ[Y[È[\ÜÜÚ]]›ÊŠˆ™]šY[™HHY™\Ú[Û™H[X[Ø\™HH[ˆÚ\Ý[XH[	Ø[›ÎÈ›Ûˆ[\Y\ØÙHÜXÚYšXØ[Y[H[Ü˜XÚÚ[™È[H\ÜÝÛÜ™˜[Z]H^š[Û˜\šK—ˆ
ˆ
ŠŠHH\ØXš[]^š[Û™HHÜHH›ÝØÛÛJŠˆšYXÙH	Ù\ÜÜÚ^š[Û™HY]XØÚHÝ[žšX[HÚ]Y[™ÈØ[˜[HH™]H›Ûˆ™XÙ\ÜØ\šNÈ›Ûˆ[\Y\ØÙH[Ü˜XÚÚ[™È[H\ÜÝÛÜ™—ˆ
ˆ
ŠÊH	Ò[œÝ[^š[Û™HH[™Ú[›ÝXÝ[ÛŠŠˆ
[]š\\Ë[K[X[Ø\™JH›ÝYÙÙHH[™\˜Xš[]0è›ÝHHpìˆš[]˜\™H[]]šHHÜ˜XÚÚ[™ËXH[Ø[Xš[È[H\ÜÝÛÜ™™YYš[š]H0êpîH\™][Y[HY™šXØXÙHÛÛ›ÈÛH]XØÚHH^š[Û˜\š[Ëˆ‚ˆB—NÂ‚™^ÜÛÛœÝÓPRS—ÌWÔUQTÕSÓ”Îˆ]Y\Ý[Û–×HHÂˆÂˆYˆKˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[˜HÛØÚY]0èHÙ\š^šHš[˜[žšX\šH[ÛH[[™X\œÚH[ÈÝ[™\™TÓËÒQPÈÌH[›ÈXÚ[ÝÈY\ÚKˆš[XHHÝ[žšX\™H[YÙ]H\™^š[Û™H[˜Ø\šXØH[X[HHÚXÝ\™^ž˜HHÙ[œÚ\™H]X[HÛÛ›ÛH™]š\ÝH[ÈÝ[™\™ÚX[›ÈÚpè]]šK]X[HÚX[›È[\[Y[]HÛÛÈ\žšX[Y[HH]X[HX[˜Ú[›È[]ËÛÜðëHÝ[™\™H[˜H›ØYX\ÛÛˆHš[Üš]0èH[\™[Ëˆ‹ˆ]Y\Ý[ÛŽˆÛÛYHÚHÚX[XH]Y\ÝH]]š]0èHÛÛ™œ›ÛÈœ˜HÈÝ]È]X[HHÈÝ]ÈšXÚY\ÝÏÈ‹ˆÜ[ÛœÎˆÂˆJHØ\[˜[\Ú\È‹ˆŠH[™]˜][Ûˆ\Ý‹ˆÊH\Ú[™\ÜÈ[\XÝ[˜[\Ú\È
’PJH‹ˆ‘
H[˜ÚY[™\ÜÛœÙH[ˆ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHØ\[˜[\Ú\ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š‘Ø\[˜[\Ú\ÊŠˆ0ê\Ø][Y[H[ÛÛ™œ›ÛÈœ˜HÈ
ŠœÝ]È]X[JŠˆ[HÜÝ\˜HHÚXÝ\™^ž˜H

˜\ËZ\ÊŠHHÈ
ŠœÝ]ÈšXÚY\ÝÊŠˆH[›ÈÝ[™\™[˜H›Ü›X]]˜HÈ[˜HÛXÞH[\›˜H

ËX™JŠKˆ[Ý[È›ÙÝÈ0ê	Ù[[˜ÛÈYÛHØÛÜÝ[Y[H8 %H
™Ø\
ˆ8 %HÝZH˜\ØÙH[˜H›ØYX\ÛÛˆHš[Üš]0èˆ0â\ˆ]Y\ÝÈÚHÚH\ÙYÝYH
Šœš[XJŠˆHYš[š\™H[YÙ]ˆÙ[ž˜HØ\\™HÛÜØHX[˜ØK›ÛˆÚHpìˆXÚY\™H]X[ÈÜ[™\™H°êHÝHÛÜØK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[[™]˜][Ûˆ\Ý
ŠˆÚ[][H[ˆ]XØÛÈ™X[H\ˆ™\šYšXØ\™HÙH[˜HX›Û^ž˜H0êÛÛ˜Ü™][Y[HÙœ]Xš[Kˆš\ÜÛ™H[HÛX[™H	Ü]Y\ÝH˜[H0ê]XØØXš[OÉË›Ûˆ	Ü]X[HÛÛ›ÛH[ÈÝ[™\™›ÛˆX˜šX[[È[˜ÛÜ˜IËˆ[‰Ø^šY[™HpìˆÝ\\˜\™H[ˆ[™]˜][Ûˆ\ÝY\ÜÙ\™HÛÛ][œ]YHÛ[š\ÜÚ[XH[HÛÛ™›Ü›Z]0èTÓÈÌK—ˆ
ˆ
ŠÊHH\Ú[™\ÜÈ[\XÝ[˜[\Ú\ÊŠˆÝ[XHHÛÛœÙYÝY[ž™HXÛÛ›ÛZXÚHHÜ\˜]]™H[	Ú[\œ^š[Û™HZH›ØÙ\ÜÚHÜš]XÚHHÙ\™HHš\ÜØ\™H•Ë”ÈHU™[HX[šYšXØ^š[Û™HHÛÛ[Z]0èˆZ\Ý\˜H	Ú[\]ÈH[‰Ú[™\ÜÛšXš[]0è]\˜K›ÛˆÈØÛÜÝ[Y[ÈH[›ÈÝ[™\™—ˆ
ˆ
Š‘
H	Ò[˜ÚY[™\ÜÛœÙH[ŠŠˆ0ê[X[›ÈÚHYš[š\ØÙHÛÛYH™XYÚ\™HH[ˆ[˜ÚY[HÚpè]™[]Îˆ0ê[ˆ[]™\˜X›HÜ\˜]]›Ë›Ûˆ[‰Ø]]š]0èH˜[]^š[Û™H[ÈÝ]ÈÛÜœ™[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[˜HÛ[šXØH[ÛH[[™X\œÚHHTPKˆHØ\[˜[\Ú\Èš[]˜HÚHHÈYÛH[™™\›ZY\šH™\Ý[›ÈØ›ØØØ]H\ˆÚ[œ]YHZ[]HH[˜]]š]0èY[™HHÛXÞH™HšXÚYYH[›Ëˆ]Y[Ú[™ÛÛÈØÛÜÝ[Y[È]™[H[˜H›ØÙH[H›ØYX\ÛÛˆš[Üš]0èÛÜÝÈH™\ÜÛœØXš[H\ÜÙYÛ˜]K—Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆH\›ÛHÚX]™H[HØ\[˜[\Ú\È0êÙ[\™H[
Š˜ÛÛ™œ›ÛÈÛÛˆ[ˆšY™\š[Y[ÊŠˆ
Ý[™\™›Ü›X]]˜K˜\Ù[[™JKˆÙHÈØÙ[˜\š[È\›HH
œÙœ]\™Jˆ[˜H[™\˜Xš[]0è0ê[ˆ[™]˜][Ûˆ\ÝÈÙH\›HH
œ]X[ÈÛÜÝH[ˆ™\›[Ê‹0ê[˜H’PKˆ‚ˆKˆÂˆYˆ‹ˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“	Ø[[Z[š\Ý˜]Ü™HH™]HH[˜Hš[X[H™[[ÝH]™H[œÝ[\™H[ˆÚ\Ý[XHÜ\˜]]›ÈYØXÞH\ÜÙ[žšX[H\ˆHXYÛ›ÜÝXØHH™XØÚHXXØÚ[˜\šH[™\ÝšX[KˆÚXÚ0êH[Ú\Ý[XHÜ\˜]]›È›ÛˆšXÙ]™HpîH]Ú[›Ù]Ü™HH™\Ù[H[™\˜Xš[]0èÜš]XÚK	Ø[[Z[š\Ý˜]Ü™HÛÛ™šYÝ\˜H[š\™]Ø[ØØ[H\ˆ›ØØØ\™H]X[ÚX\ÚH˜Y™šXÛÈ[ˆ[˜]HH[ˆ\ØÚ]HH]Y[	ÚÜÝ™\œÛÈ[\›™]ÛÛœÙ[[™ÈÛÛÈHÛÛ›™\ÜÚ[Û™HØØ[HY[˜HÛÜšÜÝ][ÛˆHÛÛ›ÛÈÜXÚYšXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÛÙÚXH[žš[Û˜[HHÛÛ›ÛÈHÚXÝ\™^ž˜H˜\™\Ù[H]Y\ÝHÛÛ™šYÝ\˜^š[Û™H[š\™]Ø[È‹ˆÜ[ÛœÎˆÂˆJHÛÛ›ÛÈ™]™[]›È
™]™[]™HÛÛ›Û
H‹ˆŠHÛÛ›ÛÈ[™\ÝYØ]]›È
]XÝ]™HÛÛ›Û
H‹ˆÊHÛÛ›ÛÈ]\œ™[H
]\œ™[ÛÛ›Û
H‹ˆ‘
HÛÛ›ÛÈÛÛ\[œØ]]›È
ÛÛ\[œØ][™ÈÛÛ›Û
H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛÛ›ÛÈÛÛ\[œØ]]›È
ÛÛ\[œØ][™ÈÛÛ›Û
JŠ‹ˆ—Šˆ
Š”\˜Ú0êH0êH‘TÕŠŠˆ[ˆÛÛ›ÛÈÛÛ\[œØ]]›È0ê[ˆÛÛ›ÛÈ[\›˜]]›ÈÈÝ\[Y[\™H[\[Y[]È]X[™È[ÛÛ›ÛÈš[˜Ú\[H
[ˆ]Y\ÝÈØ\ÛË	Ø\XØ^š[Û™H[H]ÚHÚXÝ\™^ž˜HÝ[Ú\Ý[XHÜ\˜]]›ÊH›Ûˆ0ê˜]XØXš[HÈÜÜÚXš[Kˆ\ÛÛ\™H	ÚÜÝ[™\˜Xš[H˜[Z]H™YÛÛH™\Ýš]]™HÝ[š\™]Ø[šYXÙH[š\ØÚ[È\ÜÛØÚX]È[H[™\˜Xš[]0è›ÝHÙ[ž˜Hš\ÛÛ™\›H\™][Y[K—Šˆ
Š”\˜Ú0êHH[™H›ÛˆÛÛ›ÈÛÜœ™]NŠŠ—ˆ
ˆ
ŠJH[ˆÛÛ›ÛÈ™]™[]›ÊŠˆZ\˜HH[\Y\™H\™][Y[H[ˆ]XØÛÈ[ˆÛÛ™^š[ÛšH›Ü›X[KXH]ZHÚH\XØH[˜HÛÛ›ÛZ\Ý\˜HÛÜÝ]]]˜HYØÈ\ˆZ]YØ\™HHX[˜Ø[ž˜HH]Ú—ˆ
ˆ
ŠŠH[ˆÛÛ›ÛÈ[™\ÝYØ]]›ÊŠˆÙ\™HHš[]˜\™H[˜Hš[Û^š[Û™H]™[]HÈ[ˆÛÜœÛÈ
\Ëˆ[ˆQÈÈ	Ù\Ø[YHZHÙÊK—ˆ
ˆ
ŠÊH[ˆÛÛ›ÛÈ]\œ™[JŠˆØÛÜ˜YÙÚXHÚXÛÛÙÚXØ[Y[H	Ø]XØØ[H[[\™H[‰Ø^š[Û™H›ØÚ]˜K——Šˆ
Š•˜\ÛH	Ù\Ø[YKY0êHpîH[œÚY[ÜØHÝH]Y\ÝÈ\™ÛÛY[ÎŠŠˆ0ªØÛÛ\[œØ]]›ð®È›Ûˆ0ê[˜H
Š™[žš[Û™JŠˆ]™\œØHH™]™[]›ÈÈ[™\ÝYØ]]›ËXH[ˆ
Šœ[ÛÊŠˆÚH[ˆÛÛ›ÛÈ\ÜÝ[YH™[ÛÛ\ÝËˆ[š\™]Ø[[ÈØÙ[˜\š[Ë\ˆ[žš[Û™K™]šY[™NˆÙHÈÚHÝX\™\ÜÙH\ÛÛ]ËHHØ\™X˜™HÛÜœ™]Kˆ]Y[ÈÚHÈ™[™H
Š˜ÛÛ\[œØ]]›ÊŠˆ0ê[˜]ÈÚHÝXH0ë
Š˜[ÜÝÊŠˆ[ÛÛ›ÛÈš[X\š[ÈÚH›ÛˆÚHpìˆ\XØ\™KÚ[ðêH]ÚˆHÛX[™HHÜœÚH›Ûˆ0ê0ªØÚHÛÜØH˜H]Y\ÝÈÛÛ›ÛÏð®ÈXH0ªÊŠ˜ÚHÛÜØHÝœ™X˜™H\ÜÙ\˜ÚH[Ý[ÈÜÝÏÊŠ°®ÎˆÙHHš\ÜÜÝH0ê0ªÝ[ˆÛÛ›ÛÈÚH›ÛˆÜÜÚX[[ÈY]\™p®Ë[Ü˜H0êÛÛ\[œØ]]›ËˆH\›ÛHÜXH™[ÈØÙ[˜\š[ÈÛÛ›È
›YØXÞJ‹
››Ûˆ]ÚXš[J‹
š[›Ù]Ü™H›ÛˆÝ\ÜHpîJ‹
š[ˆ]\ØH[HZYÜ˜^š[Û™J‹—Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ™XØÚ[ÈÙ\™\ˆHÛÛ›ÛÈ[™\ÝšX[H›ÛˆÝ\ÜHÔLÈH›Ûˆpìˆ\ÜÙ\™HYÙÚ[Ü›˜]Ëˆ[X[HÈ\ÛÛH[ˆ[˜H“Sˆ›Ý]HÛÛˆÜÙXÝ\š]HH[Ûš]Ü˜YÙÚ[ÈYXØ]Îˆ\ˆ[žš[Û™H]YZHÛÛ›ÛHÛÛ›È™]™[]šHH[™\ÝYØ]]šKXH™[ÛÛ\ÝÈ
Š˜ÛÛ\[œØ[›ÊŠˆ	Ú[\ÜÜÚXš[]0èH\œ›Ø\Ý\™H[Ù\™\‹ˆ‚ˆKˆÂˆYˆËˆÜXÎˆ•HÒPHšXY	ˆ›Û‹T™\YX][Ûˆ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘\˜[HH›ÝK[ˆÜ\ÈHXÚÙ\ˆ[™]˜H™[]X˜\ÙHH[ˆ›ÝÈKXÛÛ[Y\˜ÙKˆ[™XÙHHÛÝ˜\œ™HH]H[HØ\HHÜ™Y]ÈYÛH][HÈ›ØØØ\™H[Ú]ËÛH]XØØ[H[ÙYšXØ[›ÈYÙÙ\›Y[HH™^žšHHÙ[[˜ZXHH\XÛÛH[]›ÛšXÚHH˜\ØÚXH[H™ZH™XÛÜ™[]X˜\ÙKšYXÙ[™ÛH[L	Kˆ[X][›ÈÙYÝY[K[\œÛÛ˜[H[[Z[š\Ý˜]]›Èš[]˜H[˜ÛÛ™ÜY[ž™H™ZHÝ[HYÛHÜ™[šHšXÙ]]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[\Ý›È[[Ù[ÈÒPH0êÝ]ÈÛÛ\›ÛY\ÜÛÈ\™][Y[HH]Y\ÝÈ]XØÛÏÈ‹ˆÜ[ÛœÎˆÂˆJH[YÜš]0è
[YÜš]JH‹ˆŠHš\Ù\˜]^ž˜H
ÛÛ™šY[X[]JH‹ˆÊH\ÜÛšXš[]0è
]˜Z[Xš[]JH‹ˆ‘
H˜XØÚXXš[]0è
XØÛÝ[[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[YÜš]0è
[YÜš]JJŠ‹ˆ—Šˆ
Š”\˜Ú0êH0êH‘TÕŠŠˆ	Ú[YÜš]0èØ\˜[\ØÙHÚHH]H›Ûˆ™[™Ø[›È[\˜]K[ÙYšXØ]HÈ\Ý]H[ˆ[ÙÈ›Ûˆ]]Üš^ž˜]ÈÈXØÚY[[KˆH[ÙYšXØH›Ûˆ]]Üš^ž˜]HZH™^žšHYÛH\XÛÛH™[]X˜\ÙH[	ÙKXÛÛ[Y\˜ÙHÛÛ\›ÛY]H\™][Y[H	ØXØÝ\˜]^ž˜HH	ØY™šYXš[]0è[H[™›Ü›X^š[ÛšHÛÛœÙ\˜]H™[Ú\Ý[XK—Šˆ
Š”\˜Ú0êHH[™H›ÛˆÛÛ›ÈÛÜœ™]NŠŠ—ˆ
ˆ
ŠŠHHš\Ù\˜]^ž˜JŠˆšYÝX\™H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈZH]H
\Ëˆ\ÈH[™›Ü›X^š[ÛšHÙ[œÚXš[HÈXZÊKÚH›Ûˆ0êÝ]ÈÈØÛÜÈš[X\š[È\ØÜš]Ë—ˆ
ˆ
ŠÊHH\ÜÛšXš[]0è
ŠˆØ\˜[\ØÙHÚHHÙ\š^šHÈH]HÚX[›ÈXØÙ\ÜÚXš[HYÛH][H]]Üš^ž˜]H]X[™È™XÙ\ÜØ\š[ÎÈ[Ú]È0êš[X\ÝÈ]]›ÈHXØÙ\ÜÚXš[K—ˆ
ˆ
Š‘
HH˜XØÚXXš[]0è
Šˆ
XØÛÝ[[™ÊH˜H\H[œ˜[Y]ÛÜšÈPPHY0ê[ˆ›ØÙ\ÜÛÈH™YÚ\Ý˜^š[Û™K›Ûˆ˜H\H[šX[™ÛÛÈÒPHš[X\š[Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ][HX[[[žš[Û˜]È\ÙYÝYH[ˆÔS[š™XÝ[ÛˆÝH[ˆ]X˜\ÙHYYXÛË[ÙYšXØ[™È[Ü\ÈØ[™ÝZYÛ›ÈH[ˆ^šY[HH	Ì
ÉÈH	ÐP‹IËˆ›Û›ÜÝ[HH]HÚX[›Èš[X\ÝHš\Ù\˜]HHXØÙ\ÜÚXš[KH\™]HH[YÜš]0èY]HH™\[YÛ[ÈHš]H[^šY[Kˆ‚ˆKˆÂˆYˆˆÜXÎˆ•HÒPHšXY	ˆ›Û‹T™\YX][Ûˆ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÛY[HH[˜HX]Y›Ü›XHH˜Y[™ÈÛ›[™HXÚX\˜HH›Ûˆ]™\ˆXZHY™™]X]È[˜H˜[œØ^š[Û™HH™[™]HY[Èš\ØÚ[ÈÚHHØ]\Ø]È[™Ù[H\™]HÝ[Ý[ÈÛÛËÛÜÝ[™[™ÈÚH	ÛÜ™[™HÚXHÝ]ÈÙ[™\˜]ÈH[ˆ\œ›Ü™HXÛšXÛÈ[HX]Y›Ü›XKˆ[X[H›Ü™[œÙH\Ø[Z[˜HHÙÈH[[ÜÝ˜HÚH	ÛÜ™[™H0êÝ]È˜\ÛY\ÜÛÈ[œ›ÝÜÙ\ˆ[ÛY[Kš\›X]ÈYÚ][Y[HÛÛˆHÚX]™Hš]˜]HY[[Üš^ž˜]H™[Ý[ÈÛX\ÚÙ[ˆ\™Ø\™H\œÛÛ˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ˜Ù]ÈHÚXÝ\™^ž˜HØ\˜[\ØÙHÚH[ÛY[H›ÛˆÜÜØH™YØ\™H	Ú[š[È[H˜[œØ^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJH›Û‹Tš\Y[È
›Û‹T™\YX][ÛŠH‹ˆŠHš\Ù\˜]^ž˜H
ÛÛ™šY[X[]JH‹ˆÊH]][XØ^š[Û™HHYH˜]ÜšH
QJH‹ˆ‘
HÛÛ›ÛÈYÛHXØÙ\ÜÚH˜\Ø]ÈÝZH[ÛH
PÊH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH›Û‹Tš\Y[È
›Û‹T™\YX][ÛŠJŠ‹ˆ—Šˆ
Š”\˜Ú0êH0êH‘TÕŠŠˆ[›Û‹\š\Y[È[\Y\ØÙHH[ˆ][HÈZ][HH™YØ\™H	Ø]][XÚ]0èH[˜Hš\›XHÈH[‰Ø^š[Û™HY™™]X]HÝH[˜Hš\ÛÜœØKˆ™[HÜš]ÙÜ˜YšXH\Ú[[Y]šXØKÚXÚ0êHÛÛÈ[YÚ][[È›ÜšY]\š[ÈÜÜÚYYHH›ÜšXHÚX]™Hš]˜]H
Ý\ÝÙ]H[ˆ]Y\ÝÈØ\ÛÈ™[ÈÛX\ÚÙ[ˆ\™Ø\™JK[˜Hš\›XHYÚ][HÙ[™\˜]HÛÛˆ[HÚX]™H›Ý˜H[ˆ[ÙÈ[˜ÛÛ™]Xš[H	ÛÜšYÚ[™H[Y\ÜØYÙÚ[ÈÈ[H˜[œØ^š[Û™K—Šˆ
Š”\˜Ú0êHH[™H›ÛˆÛÛ›ÈÛÜœ™]NŠŠ—ˆ
ˆ
ŠŠHHš\Ù\˜]^ž˜JŠˆ˜\ØÛÛ™HH[™›Ü›X^š[ÛšHHÚH›Ûˆ0ê]]Üš^ž˜]ÈXH›Ûˆ›Ý˜H	ÛÜšYÚ[™HH[‰Ø^š[Û™HÜXÚYšXØK—ˆ
ˆ
ŠÊH	Ø]][XØ^š[Û™HHYH˜]ÜšJŠˆ™\šYšXØH	ÚY[]0è[	Ý][H[[ÛY[È[ÙÚ[‹XH	Ø]ÈHš\›X\™HYÚ][Y[HHÚ[™ÛÛH˜[œØ^š[Û™HØ\˜[\ØÙHÜXÚYšXØ[Y[H[›Û‹\š\Y[È[H˜[œØ^š[Û™HÝ\ÜØK—ˆ
ˆ
Š‘
HPÊŠˆYš[š\ØÙH]X[H^š[ÛšH[ˆ][H0ê]]Üš^ž˜]ÈH˜\™H[ˆ˜\ÙH[Ý[È[ÛË›Ûˆ›Ü›š\ØÙH›Ý™HX][X]XÚH\ˆ[\Y\™HHÛY[]H[H^š[ÛšHÛÛ\]]K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ˜Y\ˆš[˜[žšX\š[È[šXH[˜H\ÜÜÚ^š[Û™HHXÜ]Z\ÝÈ^š[Û˜\š[Èš\›X[™ÛHÛÛˆHÝXHÚX]™Hš]˜]HÓKˆÝXØÙ\ÜÚ]˜[Y[K]X[™È[˜[Ü™H[	Ø^š[Û™HÜ›ÛK[˜Y\ˆ[HH\ØÛÛ›ÜØÙ\™H	ÛÜ\˜^š[Û™KXHHš\›XHYÚ][H\Ú[[Y]šXØH™[™H	Ø^š[Û™H›Ûˆš\YXXš[HYØ[Y[Kˆ‚ˆKˆÂˆYˆKˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ]Y]ÜˆHÚXÝ\™^ž˜Hš[]˜HÚHHÙÈH]Y]HHXØÙ\ÜÛÈ[Ù\™\ˆš[˜Ú\[HH›Ù^š[Û™HÛÛ›È\˜Ú]šX]H[ˆ[ˆ\˜ÛÜœÛÈH™]HÝ™HÛH[[Z[š\Ý˜]ÜšHH™]H[››È\›Y\ÜÚHÛÛ\]HHØÜš]\˜HHØ[˜Ù[^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜\ÙHÜXÚYšXØH[œ˜[Y]ÛÜšÈPPHšY[™HÜ˜]™[Y[HÛÛ\›ÛY\ÜØHÙHHÙÈ[H]]š]0èÜÜÛÛ›È\ÜÙ\™H[ÙYšXØ]HÈØ[˜Ù[]HYÛHÝ\ÜÚH][HHÝZHÝœ™X˜™\›È˜XØÚX\™HH^š[ÛšOÈ‹ˆÜ[ÛœÎˆÂˆJH]][XØ^š[Û™H
]][XØ][ÛŠH‹ˆŠH]]Üš^ž˜^š[Û™H
]]Üš^˜][ÛŠH‹ˆÊHÚYœ˜]\˜H
[˜Üž\[ÛŠH‹ˆ‘
H˜XØÚXXš[]0è
XØÛÝ[[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H˜XØÚXXš[]0è
XØÛÝ[[™ÊJŠ‹ˆ—Šˆ
Š”\˜Ú0êH0êH‘TÕŠŠˆHÛÛ\Û™[HH
ŠXØÛÝ[[™ÊŠˆ
˜XØÚXXš[]0èÐ]Y]
HšXÚYYH›ÛˆÛÛÈHÛÜœ™]HÙ[™\˜^š[Û™HZHÙÈ[H]]š]0èXH[˜ÚHHØ\˜[žšXH[HÜ›È[YÜš]0èH[[]]Xš[]0èˆÙHHÙÈÛÛ›ÈXØÙ\ÜÚXš[H[ˆØÜš]\˜HÈ[[Z[˜^š[Û™H[\œÛÛ˜[HU[ˆ[œÚY\ˆÈ[ˆ]XØØ[HÛÛˆÜ™Y[žšX[HUÛÛ\›ÛY\ÜÙHÝ™X˜™HØ[˜Ù[\™HÈ[\˜\™HH›Ý™H[H›ÜšYH^š[ÛšH
\Ëˆ˜[œØ^š[ÛšH[XÚ]JK\ÝYÙÙ[™È	ØY™šYXš[]0è[	Ú[\›È›ØÙ\ÜÛÈH]Y]—Šˆ
Š”\˜Ú0êHH[™H›ÛˆÛÛ›ÈÛÜœ™]NŠŠ—ˆ
ˆ
ŠJH	Ø]][XØ^š[Û™JŠˆšYÝX\™HH™\šYšXØH[	ÚY[]0è[[ÛY[È[ÙÚ[‹ÚH]ZHÚH\ÜÝ[YH[žš[Û˜[K—ˆ
ˆ
ŠŠH	Ø]]Üš^ž˜^š[Û™JŠˆYš[š\ØÙHH\š]HHXØÙ\ÜÛÈ[	Ý][KXHH[™\˜Xš[]0èÜš]XØHšYÝX\™HH›Ý^š[Û™H[	Ú[YÜš]0èZH™XÛÜ™H]Y]
XØÛÝ[[™ÊK—ˆ
ˆ
ŠÊHHÚYœ˜]\˜JŠˆ0ê[ˆÛÛ›ÛÈXÛšXÛÈXš[][K›Ûˆ[˜H˜\ÙHÙÚXØH[œ˜[Y]ÛÜšÈPPK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆÙH[ˆ[[Z[š\Ý˜]Ü™HH]X˜\ÙHH	ØXØÙ\ÜÛÈ[ˆØÜš]\˜HZHš[HHÙËÝ™X˜™H[[Z[˜\™H[ˆ™XÛÜ™ÜXÚYšXÛÈ\ˆ˜\ØÛÛ™\™H[˜H]šX^š[Û™HH›Û™Kˆ›ÝYÙÙ\™HHÙÈ[ˆ[Ù[]0è	ÕÓÔ“IÈ
Üš]HÛ˜ÙK™XYX[žJH\ÜÚXÝ\˜H	ØXØÛÝ[[™ÈH™]šY[™H[\˜^š[ÛšKˆ‚ˆKˆÂˆYˆ‹ˆÜXÎˆ”ÛØÚX[[™Ú[™Y\š[™È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“	Ú\Ý]]Èš[˜[žšX\š[È	ÔšXÛÈš[˜[˜ÚX[ÉÈH[›ÙÝÈ[ˆ›ÙÜ˜[[XHÛØ˜[HH›Ü›X^š[Û™HÝ[HÚXÝ\™^ž˜H
ÙXÝ\š]H]Ø\™[™\ÜÊKˆ\˜[H[˜H[H[[YHÙ\ÜÚ[ÛšHY]XÚKH\[™[H[››È[˜[^ž˜]È™[]YÛ[ÈHš\ØÚHHHÙYÛ˜[H\ÜÛØÚX]HY]]š]0èÛÜÙHÛÛ™ÝHH\[™[H]X[HÈ^\[™[KÈH\™\ˆÛÛ[Y\˜ÚX[HšY]Kˆ‹ˆ]Y\Ý[ÛŽˆ”ÝH]X[HZ[˜XØÚXHÜXÚYšXØHÚHÛÛ˜Ù[˜H]Y\ÝH^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™È‹ˆŠH™\Ü[™È[™[Ûš]Üš[™È
ÙYÛ˜[^š[Û™HH[Ûš]Ü˜YÙÚ[ÊH‹ˆÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][Ûˆ
šXÛÛ›ÜØÚ[Y[ÈHÛÛ\Ü[Y[H[›ÛX[JH‹ˆ‘
H[œÚY\ˆ™X]
Z[˜XØÚXH[\›˜JH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[œÚY\ˆ™X]
Z[˜XØÚXH[\›˜JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÙ[œÚXš[^ž˜^š[Û™HÛÛ›ÈH
Š›Z[˜XØÙH[\›™JŠˆ
[œÚY\ˆ™X]]Ø\™[™\ÜÊHH	ÛØšY]]›ÈH\ÝZ\™H[\œÛÛ˜[HÝZHš\ØÚH\š]˜[HH[™]šYZHÜ\˜[H[	Ú[\››È[	ÛÜ™Ø[š^ž˜^š[Û™H
\[™[KÛÛX›Ü˜]ÜšK[[Z[š\Ý˜]ÜšJHÚHÝ™X˜™\›ÈØ]\Ø\™H[›šH
›ÛÛ\šKÛÛYH[ØX›ÝYÙÚ[ÈÈ[\ÈH]KÈ[›ÛÛ\šKÛÛYHH™YÛYÙ[ž˜JK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ú[™ÊŠˆÚHÛÛ˜Ù[˜HÝ[šXÛÛ›ÜØÚ[Y[ÈHK[XZ[[™Ø[›™]›ÛH›Ý™[šY[H[	Ù\Ý\››ÈÚHZ\˜[›ÈHX˜\™HÜ™Y[žšX[K›ÛˆÝ[HZ[˜XØÙH[\›™H\™]K—ˆ
ˆ
ŠŠH™\Ü[™È[™[Ûš]Üš[™ÊŠˆ
ÙYÛ˜[^š[Û™HH[Ûš]Ü˜YÙÚ[ÊH0ê[˜H˜]XØH˜\Ý™\œØ[HH›ØÙY\˜[H›ÛHH›ÝYšXØ\™H[˜ÚY[HHÚXÝ\™^ž˜HÙ[™\šXÚK›Ûˆ[˜HZ[˜XØÚXHÜXÚYšXØK—ˆ
ˆ
ŠÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][ÛŠŠˆ
šXÛÛ›ÜØÚ[Y[ÈH[›ÛX[YHÛÛ\Ü[Y[[JHÝ\ÜH	Ú[™]šYX^š[Û™HHÛÛ\Ü[Y[HÝ˜[šHXH˜\™\Ù[H[ˆY]ÙÈHš[]˜[Y[ÈXÛšXÛËÛÜ\˜]]›ÈH›ÛˆHØ]YÛÜšXHHZ[˜XØÚXHÝ\ÜØH˜]]H™[H^š[Û™K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ[[Z[š\Ý˜]Ü™HHÚ\Ý[XHØÛÛ[È\ˆ[ˆX[˜Ø]È][Y[ÈØØ\šXØH	Ú[\›È]X˜\ÙHZHœ™]™]H^šY[™[HÝH[˜HÚX]™]HTÐˆš[XHH˜\ÜÙYÛ˜\™HH[Z\ÜÚ[ÛšKX[šYšXØ[™ÈHš]™[™\™HH›ÜšY]0è[[]X[HH[ˆÛÛ˜ÛÜœ™[Kˆ‚ˆKˆÂˆYˆËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ[™ÙYÛ™\™HHÚXÝ\™^ž˜HÝH˜[][™È[‰Ø\XØ^š[Û™H›ÜšY]\šXHÝš[\]HH\žšKˆ›ÝHÚH	Ø\XØ^š[Û™HY[[Üš^ž˜HHÚX]šHTHZHÙ\š^šHÛÝY[ˆÚX\›È[	Ú[\››ÈH[ˆš[HHÛÛ™šYÝ\˜^š[Û™KX\ØÚ\˜[™ÛHÙ[\XÙ[Y[H\XØ[™È[ˆ[ÛÜš][ÈÔˆ[™\Xš[HHÛÙYšXØ[™È[š\Ý[]Èš[˜[H[ˆ›Ü›X]È˜\ÙMˆ‹ˆ]Y\Ý[ÛŽˆÛÛYH]™H\ÜÙ\™H˜[]]È]Y\ÝÈY]ÙÈH›Ý^š[Û™HÙXÛÛ™ÈHš[˜Ú\HÜš]ÙÜ˜YšXÚHHÛXZ[ˆOÈ‹ˆÜ[ÛœÎˆÂˆJH˜\™\Ù[H[˜HXÛšXØHHÙ™\ØØ[Y[È
Ø™\ØØ][ÛŠHÚH›Ûˆ›Ü›š\ØÙH[Ý[˜Hš\Ù\˜]^ž˜H™X[HY0ê˜XÚ[Y[HXÚYœ˜Xš[H‹ˆŠH0â[ˆY]ÙÈÚXÝ\›È\]Z]˜[[H[HÚYœ˜]\˜H\Ú[[Y]šXØHÚXÚ0êHšXÚYYH[˜HÚX]™H\ˆ[™\\™HÈÔˆ‹ˆÊH0â[˜H[žš[Û™HH\Ú[™È[šY\™^š[Û˜[HÚXÝ\˜HÚH[\Y\ØÙHH]\˜H[HÚX]šH‹ˆ‘
HØ\˜[\ØÙH	Ú[YÜš]0è[HÚX]šHTH[\Y[™Û™H	Ø[\˜^š[Û™HXØÚY[[H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH˜\™\Ù[H[˜HXÛšXØHHÙ™\ØØ[Y[È
Ø™\ØØ][ÛŠHÚH›Ûˆ›Ü›š\ØÙH[Ý[˜Hš\Ù\˜]^ž˜H™X[HY0ê˜XÚ[Y[HXÚYœ˜Xš[JŠ‹ˆ—Šˆ
Š”\˜Ú0êH0êH‘TÕŠŠˆ	ÛÙ™\ØØ[Y[È
Ø™\ØØ][ÛŠHZ\˜HH™[™\™H[ˆÛÙXÙHÈ[ˆš[HY™šXÚ[HHÛÛ\™[™\™HHš[XHš\ÝHH[ˆ\ÜÙ\™H[X[›ËXHÚH˜\ØHÝHY]ÙHX›ÛHHÝ[™\™^ž˜]H
ÛÛYH˜\ÙMÔˆÈ›Ý^š[Û™HHØ\˜]\šJH˜XÚ[Y[H[™\Xš[HÙ[ž˜HH™XÙ\ÜÚ]0èH[ˆÙYÜ™]ÈÜš]ÙÜ˜YšXÛÈ›ÜKˆ›Ûˆ›Ü›š\ØÙHš\Ù\˜]^ž˜HH›Ûˆ]™HXZH\ÜÙ\™H\Ø]H\ˆ›ÝYÙÙ\™HÜ™Y[žšX[HÈÙYÜ™]K—Šˆ
Š”\˜Ú0êHH[™H›ÛˆÛÛ›ÈÛÜœ™]NŠŠ—ˆ
ˆ
ŠŠJŠˆÈÔˆÙ[\XÙH›Ûˆ\]Z]˜[H[HÜš]ÙÜ˜YšXH\Ú[[Y]šXØH
ÚH\ØHÛÛ\\ÜÙH™[^š[ÛšHX][X]XÚH˜HÛÜYHHÚX]šHX˜›XÚKÜš]˜]JK—ˆ
ˆ
ŠÊJŠˆ	Ú\Ú[™È0ê[šY\™^š[Û˜[HH›Ûˆ[™\Xš[KY[™HÈÔˆÛÛXš[˜]ÈÛÛˆ˜\ÙM0êY[˜[Y[H[™\Xš[H\ˆ™XÝ\\˜\™HHÚX]šHÜšYÚ[˜[K—ˆ
ˆ
Š‘
JŠˆ	ÛÙ™\ØØ[Y[È›Ûˆ›Ü›š\ØÙH[Ý[ˆYXØØ[š\Û[ÈX][X]XÛÈ
ÛÛYH[ˆ\ÚÈ[ˆPPÊH\ˆš[]˜\™HÈ[\Y\™HH[ÙYšXØHXØÚY[[HZH]K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[›ÈÝš[\]Ü™HÛÙYšXØHH\ÜÝÛÜ™ZH]X˜\ÙH[ˆ›Ü›X]È˜\ÙM™[š[HÛÛ™šYËš[šXˆ]X[ÚX\ÚH][HÛÛˆXØÙ\ÜÛÈ[š[HpìˆXÛÙYšXØ\™H[	Ú\Ý[HH\ÜÝÛÜ™\Ø[™È[ˆÛÛX[™È˜[˜[KÚXÚ0êH˜\ÙM0ê[ˆY\›ÈÙ™\ØØ[Y[ÈH›ÛˆÜš]ÙÜ˜YšXH™X[Kˆ‚ˆKˆÂˆYˆˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘ÜÈ[ˆ[˜ÚY[K[‰Ø^šY[™HYÝH]X]›ÈZ\Ý\™NˆX˜›XØH[˜HÛ]XØHÚHØ˜›YØHH\[™[HHÚYœ˜\™HHÜ][KÛÛ™šYÝ\˜HHÚYœ˜]\˜H[\ØÛÈ˜[Z]HÜš]\šHHÜ\Ë\ÝZ\ØÙH	Ú[\ÚÈÝHÛÛYH™\šYšXØ\›™H	Ø]]˜^š[Û™H\˜[HÙÛšH[\™[ËH[œÝ[HÙ\œ˜]\™HÝYÛH\›XYHÝ™HHÜ][H™[™ÛÛ›Èš\ÜÝKˆ‹ˆ]Y\Ý[ÛŽˆH]X[HØ]YÛÜšXHHÛÛ›ÛÈ\\Y[™HHÛÛ™šYÝ\˜^š[Û™H[HÚYœ˜]\˜H˜[Z]HÜš]\šHHÜ\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ›ÛÈš\ÚXÛË\˜Ú0êH›ÝYÙÙH[\ÜÜÚ]]›È[\ÈX]\šX[H‹ˆŠHÛÛ›ÛÈÜ\˜]]›Ë\˜Ú0êH0ê\ÙYÝZ]ÈH\œÛÛ™H™[H]]š]0è][ÝYX[™H‹ˆÊHÛÛ›ÛÈÙ\Ý[Û˜[K\˜Ú0êH\š]˜HH[˜HXÚ\Ú[Û™H[H\™^š[Û™H‹ˆ‘
HÛÛ›ÛÈXÛšXÛË\˜Ú0êH[˜H›ÛHÛÛ™šYÝ\˜]È0êHXÛ›ÛÙÚXHY\XØ\›È‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛÛ›ÛÈXÛšXÛÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š˜Ø]YÛÜšYJŠˆHÛÛ›ÛÈš\ÜÛ™Û›È[HÛX[™HŠ˜ÚHÈÚHÛÜØJˆÈ\XØO×‹H[ˆ
Š˜ÛÛ›ÛÈXÛšXÛÊŠˆ0ê]Y[È\XØ]È[H
ŠXÛ›ÛÙÚXJŠˆ8 %\™Ø\™KÛÙØ\™HÈÛÛ™šYÝ\˜^š[Û™Kˆ[˜H\œÛÛ˜HÈ›ÙÙ]HHÈÛÛ™šYÝ\˜KXHH]Y[[ÛY[È0ê[Ú\Ý[XHH˜\›Èš\Ü]\™KÙ[ž˜HÚH™\ÜÝ[›ÈX˜˜HšXÛÜ™\œÙ[™HÙÛšH›ÛNˆ0ê]Y\ÝHHY™™\™[ž˜Hš\Ü]ÈH[ˆÛÛ›ÛÈÜ\˜]]›ËÚH\[™H[	Ù\ÙXÝ^š[Û™H][ÝYX[˜HH]X[Ý[›ËˆHÚYœ˜]\˜H[\ÜÝH˜[Z]HÜš]\šHHÜ\È0ê	Ù\Ù[\[ÈHX[X[Nˆ[Ú\Ý[XHH\XØHHÛÛÈHÙÛšHXXØÚ[˜HÚH[˜H™[ÛZ[š[Ë[ÈÝ\ÜÛÈ[ÙËÙ[\™Kˆ0â[˜ÚH[[Ý]›È\ˆÝZHHÛÛ›ÛHXÛšXÚHÛÛ›ÈHpîHY™šYXš[H]X[™È\Ú\ÝÛ›Ë\˜Ú0êH›Ûˆ\[™Û›È[H[YÙ[ž˜H][ÝYX[˜HH™\ÜÝ[›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠˆH[™H™HÜš[ÛšH\ØÜš]›Û›ÈÛÜœ™][Y[HH[™H™HZ\Ý\™H[ÈØÙ[˜\š[ËXH›Ûˆ]Y\ÝK—ˆ
ˆ
ŠJHÛÛ›ÛÈš\ÚXÛÎŠŠˆ0êH
ŠœÙ\œ˜]\˜HÝYÛH\›XYJŠ‹ˆYÚ\ØÙH™[[Û™ÈX]\šX[HÝHXØÙ\ÜÚKØØ[HH\ÜÜÚ]]šK—ˆ
ˆ
ŠŠHÛÛ›ÛÈÜ\˜]]›ÎŠŠˆ0êH
Šœ›ØÙY\˜H[	Ú[\ÚÊŠ‹ˆ0â\ÙYÝZ]ÈH
Šœ\œÛÛ™JŠˆ™[ÛÜœÛÈ[H]]š]0è][ÝYX[™KH\ˆ]Y\ÝÈHÝXHY™šXØXÚXH\[™HH›Ü›X^š[Û™HHÛÜÝ[ž˜K—ˆ
ˆ
ŠÊHÛÛ›ÛÈÙ\Ý[Û˜[NŠŠˆ0êH
ŠœÛ]XØJŠˆÚHØ˜›YØHHÚYœ˜\™KˆšYÝX\™H[[ÙÈ[ˆÝZH	ÛÜ™Ø[š^ž˜^š[Û™HÛÝ™\›˜HHÚXÝ\™^ž˜NˆÛ]XÚK˜[]^š[ÛšH[š\ØÚ[ËX[šYšXØ^š[Û™Kˆ][žš[Û™H[HÙ[X]\˜NˆHÛ]XØH
›Ü™[˜JˆHÚYœ˜]\˜KHÛÛ™šYÝ\˜^š[Û™HH
œ™X[^ž˜J‹ˆHš[XH0êÙ\Ý[Û˜[KHÙXÛÛ™HXÛšXØK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ›ÛˆÛÛ™›Û™\™HH
Š˜Ø]YÛÜšYJŠˆÛÛˆH
Š\JŠ‹\˜Ú0êHÙÛšHÛÛ›ÛÈHÙ[\™H[˜[XšHHHÛX[™HÚ[ØØ[›È›Üš[ÈÝH]Y\ÝHÜXHÛ\ÜÚYšXØ^š[Û™KˆH
Š˜Ø]YÛÜšYJŠˆXÛÛ›ÈÚHÈ\XØNˆXÛšXÛËÙ\Ý[Û˜[KÜ\˜]]›Ëš\ÚXÛËˆH
Š\JŠˆXÛÛ›ÈHÛÜØHÙ\™Nˆ™]™[]›Ë]\œ™[K]XÝ]™KÛÜœ™]]›ËÛÛ\[œØ]]›Ë\™]]›ËˆHÚYœ˜]\˜H[\ØÛÈ[\ÜÝHHÜš]\šHHÜ\È0ê]Z[™H[ˆÛÛ›ÛÈ
ŠXÛšXÛÊŠˆ\ˆØ]YÛÜšXHH
Šœ™]™[]›ÊŠˆ\ˆ\ËH[˜H[XØ[Y\˜HHšY[ÜÛÜ™YÛX[ž˜H0ê
Š™š\ÚXØJŠˆ\ˆØ]YÛÜšXHXH[œÚY[YH
Š™]\œ™[JŠˆH
Š™]XÝ]™JŠˆ\ˆ\Ëˆ‚ˆKˆÂˆYˆKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÚ\Ý[Z\ÝH[š[ÜˆšXÙ]™H[˜HšXÚY\ÝHHÝ\ÜÈ\™Ù[HH\H[™\\È™[™]KÚHXÚX\˜HH›ÛˆÝ\ˆXØÙY\™HH[ˆ[Ý›È]X˜\ÙHÔ“HHØ]\ØHH[ˆ›ØØÛÈH™]Kˆ\ˆš\ÛÛ™\™H˜\Y[Y[HHÚ]X^š[Û™K[Ú\Ý[Z\ÝH[ÙYšXØHX[X[Y[H[˜H™YÛÛH[š\™]Ø[H›Ù^š[Û™HÙ[˜[KÛÛœÙ[[™È	ØXØÙ\ÜÛÈH]X[ÚX\ÚH[™\š^ž›ÈT[Hš[X[KˆHÛÛ›™\ÜÚ[Û™H[žš[Û˜KXHYHÚ[Ü›šHÜÈ	Ø^šY[™HÝXš\ØÙH[ˆ]XØÛÈ›Ý™[šY[HH[˜HÛÝÜ™]H›Ûˆ]]Üš^ž˜]HÚHHÙœ]]È]Y[HÝ\ÜØHÜH\\Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜\ÙHÜš]XØH[›ØÙ\ÜÛÈHÚ[™ÙHX[˜YÙ[Y[0êÝ]HÝ[Y[HÛY\ÜØHH]œ™X˜™H]š]]È	Ú[˜ÚY[OÈ‹ˆÜ[ÛœÎˆÂˆJHHÝ\Ý\˜H[X[›ÈHš\š\Ý[›È	Ù[Y\™Ù[ž˜H
›Û˜XÚÈ[ŠH‹ˆŠH	Ø[˜[\ÚHH[\]ÈH	Ø\›Ý˜^š[Û™H›Ü›X[H[Ú[™ÙHYš\ÛÜžH›Ø\™
ÐPŠH‹ˆÊHH›ÝYšXØH™]™[]˜HYÛH][H\Ý\›šH[	Ú[[Z[™[HØ[XšX[Y[È[H™YÛÛHÝ[š\™]Ø[\š[Y]˜[H‹ˆ‘
H	Ù\ÙXÝ^š[Û™HH[˜HØØ[œÚ[Û™HH[™\˜Xš[]0èš[XH[H[ÙYšXØH[H™YÛÛH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH	Ø[˜[\ÚHH[\]È
[\XÝ[˜[\Ú\ÊHH	Ø\›Ý˜^š[Û™H›Ü›X[HH\H[Ú[™ÙHYš\ÛÜžH›Ø\™
ÐPŠHÈ[X[HHÚXÝ\™^ž˜JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[›ØÙ\ÜÛÈ›Ü›X[HHÚ[™ÙHX[˜YÙ[Y[šXÚYYHÚH]X[ÚX\ÚH[ÙYšXØH\Ü]HZHÚ\Ý[ZHH›Ù^š[Û™H
ÛÛYHH™YÛÛH[š\™]Ø[
HÚXH™XÙY]HH[‰Ø[˜[\ÚHH[\]È\ˆ˜[]\™HHÝ[žšX[Hš\ØÚHHÚXÝ\™^ž˜H\ÜÛØÚX]HHX˜˜H\ÜÙ\™H›Ü›X[Y[H\›Ý˜]H[ÐPˆÈ[X[H™\ÜÝËˆÙH[Ú\Ý[Z\ÝH]™\ÜÙHÙYÝZ]È]Y\ÝH›ØÙY\˜KH[ÙYšXØHY™œ™]]HØ\™X˜™HÝ]H›ØØØ]HÈ[ÙYšXØ]H\ˆ]š]\™H	Ø\\\˜H[™\ØÜš[Z[˜]H[HÜK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHHÝ\Ý\˜H[X[›ÈHš\š\Ý[›ÊŠˆ
›Û˜XÚÈ[ŠHÛÛœÙ[HHÜ›˜\™H[HÛÛ™šYÝ\˜^š[Û™H™XÙY[H[ˆØ\ÛÈH›Ø›[ZH\˜[H	Ø\XØ^š[Û™H[Ø[XšX[Y[ËXH›Ûˆ™]šY[™H	Ú[›Ù^š[Û™H[H˜[HÝ\ÜØK—ˆ
ˆ
ŠÊHH›ÝYšXØHYÛH][H\Ý\›šJŠˆ0ê[˜HZ\Ý\˜H[™›Ü›X]]˜HHHÛÜ\ÚXHÜ\˜]]˜Kš]˜HH˜[[ž˜H\ˆH™]™[žš[Û™HH[™\˜Xš[]0èXÛšXÚK—ˆ
ˆ
Š‘
H	Ù\ÙXÝ^š[Û™HH[˜HØØ[œÚ[Û™HH[™\˜Xš[]0è
Šˆš[]˜H˜[H\Ú\Ý[HXH›ÛˆÛÜÝ]Z\ØÙHH˜[]^š[Û™HH	Ø\›Ý˜^š[Û™H›Ü›X[H[Ø[XšX[Y[Èš[XHÚH]Y\ÝÈ™[™ØH[\[Y[]Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆXÛšXÛÈ\™H[˜HÜHÔ[ˆ›Ù^š[Û™HÙ[ž˜H[ˆXÚÙ]›Ü›X[H\ˆ\Ý\™H[‰Ø\XØ^š[Û™Kˆ[XÚÙ]›ÛˆšY[™HXZH™YÚ\Ý˜]ËHÜHš[X[™H\\H[Y[XØ]KH™HY\ÚHÜÈšY[™HÙœ]]HH[ˆ˜[œÛÛ]Ø\™H\ˆ[™š[˜\œÚKˆ‚ˆKˆÂˆYˆLˆÜXÎˆ‘XÙ\[ÛˆXÚ›ÛÙÚY\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’Üš^›ÛˆÙXÝ\š]H[ÛHØ\\™H]X[HXÛšXÚHÛH]XØØ[H\Ú[›ÈÛÛ›ÈH›ÜšXH[™œ˜\Ý]\˜KH[ÛH˜\›ÈÙ[ž˜HY]\™HHš\ØÚ[È[Ý[ˆ]È™X[Kˆ[X[H™Y\ÜÛ™H]Z[™H[ˆ[\›ÈÙ\™\ˆ\ÜÜÝËÚH[Z]H[ˆÙ\Ý[Û˜[H^šY[™[HÛÛˆ]Hš]^šK›Ûˆ0êÛÛYØ]ÈY[Ý[ˆÚ\Ý[XHH›Ù^š[Û™HH›ÛˆH[Ý[˜H˜YÚ[Û™HYÚ][XHHšXÙ]™\™H˜Y™šXÛÎˆ]X[[œ]YHÛÛ›™\ÜÚ[Û™HšH\œš]šH0ê\ˆYš[š^š[Û™HÛÜÜ]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛ›ÛÙÚXHH[™Ø[››È0êÝ]H™X[^ž˜]OÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆÛ™^\ÝÚ\Ý[XH\ØØH\ÛÛ]ÈÚH]\˜HH™YÚ\Ý˜H	Ø]]š]0èÜÝ[H‹ˆŠH[ˆÛ™^Yš[KØÝ[Y[È\ØØHÚHÙ[™\˜H[ˆ[\]X[™ÈšY[™H\\È‹ˆÊH[ˆÛ™^]ÚÙ[‹Ü™Y[žšX[HÈ™XÛÜ™\ØØHÚH›ÛˆH[Ý[ˆ\ÛÈYÚ][[È‹ˆ‘
H[˜HØ[™›Þ[XšY[H\ÛÛ]È[ˆÝZH\ÙYÝZ\™H[ˆÚXÝ\™^ž˜Hš[HÛÜÜ]H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[ˆÛ™^\Ý
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
ŠšÛ™^\Ý
Šˆ0ê[ˆ
ŠœÚ\Ý[XJŠˆ\ØØHÛÛ\]Ë[X™\˜][Y[H\ÜÜÝÈH™\ÛÈ]˜Y[K[ÝZH[šXÛÈØÛÜÈ0ê˜\œÚH]XØØ\™KˆHØ\˜]\š\ÝXØHÚHÈ™[™H™^š[ÜÛÈ0ê]Y[H\ØÜš]H™[ÈØÙ[˜\š[Îˆ›Ûˆ\Ú\ÝH[Ý[ˆ[Ý]›ÈYÚ][[È\ˆÝZH]X[Ý[›ÈX˜˜HÛÛ›™]\š\ÚK]Z[™H
Š›ÙÛšJŠˆ[\˜^š[Û™H0ê[ˆÙYÛ˜[KH[˜\ÜÈœ˜HÙYÛ˜[HH[[Ü™H0ê˜]XØ[Y[H\™™]Ë	ÛÜÜÝÈH]X[ÈXØØYHÝH[ˆÚ\Ý[XHH›Ù^š[Û™KˆÚXÚ0êH0ê\ÛÛ]ÈHÛÛY[™HÛÛÈ]Hš]^šK\›Y]HHÜÜÙ\˜\™HÝ[Y[KÛÛX[™HHØšY]]šH[	Ø]XØØ[HÙ[ž˜H\ÜÜœ™H[HH™X[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÛ™^Yš[NŠŠˆ0ê[ˆ
ŠœÚ[™ÛÛÈØÝ[Y[ÊŠˆ\ØØK\ˆ\Ù[\[È[ˆš[HÚX[X]È\ÜÝÛÜ™Ø[[Z[š\Ý˜]ÜšKžÞ\ØÚX]È[ˆ[˜HÛÛ™]š\Ú[Û™KÚHÙ[™\˜H[ˆ[\]X[™ÈšY[™H\\ÈÈÛÜX]Ëˆ0â[‰Ù\ØØH[X[H[›È[ˆÚ\Ý[XH™\›Ë›Ûˆ[ˆÚ\Ý[XH[\›Ë—ˆ
ˆ
ŠÊHÛ™^]ÚÙ[ŽŠŠˆ0ê[ˆ
Š™]ÊŠˆ\ØØKÛÛYH[˜HÜ™Y[žšX[HXZH\ÜÙYÛ˜]HH™\ÜÝ[›Ë[˜HÚX]™HTHš]^šXHÈ[ˆ™XÛÜ™˜\Ý[È[ˆ[ˆ]X˜\ÙKˆ[Ý[È\ÛÈÙYÛ˜[H[˜HÛÛ\›ÛZ\ÜÚ[Û™KHÙHÛÛ\\™H[›Ý™H™Hš]™[H	Ù\Ùš[˜^š[Û™Kˆ[˜ÚH]ZNˆ[ˆ]Ë›Ûˆ[ˆÚ\Ý[XK—ˆ
ˆ
Š‘
HØ[™›ÞŠŠˆ›Ûˆ0êY™˜]È[˜HXÛ›ÛÙÚXHH[™Ø[››Ëˆ0â[ˆ[XšY[H\ÛÛ]È[ˆÝZH
ŠJŠˆ\ÙYÝZH›ÛÛ\šX[Y[Hš[HÛÜÜ]H\ˆ[˜[^ž˜\›Kˆ›Ûˆ]\˜H™\ÜÝ[›ÈH›Ûˆ[™Ø[›˜H™\ÜÝ[›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHH]X]›È\ØÚH[ˆ˜\ÙHH
Š˜ÛÜØJŠˆšY[™H\ÜÜÝËˆ
Š’Û™^\Ý
ŠˆH[ˆÚ[™ÛÛÈÚ\Ý[XH\ØØH0­È
Š’Û™^[™]
ŠˆH[‰Ú[\˜H™]HHÛ™^\ÝÚHÚ[][H[‰Ú[™œ˜\Ý]\˜HÜ™YXš[HH\›Y]HHÜÜÙ\˜\™H[˜ÚH[[Ýš[Y[È]\˜[H0­È
Š’Û™^Yš[JŠˆH[ˆš[H\ØØH0­È
Š’Û™^]ÚÙ[ŠŠˆH[ˆ]ÈÈ[˜HÜ™Y[žšX[H\ØØKˆ[˜[Ü™HÛÛ][™HH]H0êÈÝ\ÜÛÎˆ
Šž™\›È˜[ÚHÜÚ]]šH\ˆÛÜÝ^š[Û™JŠ‹\˜Ú0êH™\ÜÝ[ˆ][HYÚ][[ÈH[Ý]›ÈHØØØ\›Kˆ‚ˆKˆÂˆYˆLÌKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ[™ÙYÛ™\™HH™]H]™H›ÙÙ]\™H[˜HÛÛ^š[Û™HHÜš]ÙÜ˜YšXHÚ[[Y]šXØH\ˆ[‰Ø\XØ^š[Û™H[™\ÝšX[H[ˆ[\È™X[Kˆ	Ø\XØ^š[Û™H˜\ÛY]H›\ÜÚHÛÛ[ZHH[[Y]šXH[ˆÝZHH[™Ú^ž˜HÝ[H[XØÚ]È]H›Ûˆ0ê›ÝHHš[ÜšHHšXÚYYH[˜H][ž˜HZ[š[XKÚYœ˜[™ÈH]H[ˆž]HÈ[ˆš][H›ÛKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÛÙÚXHHÚYœ˜]\˜HÚ[[Y]šXØH0êHpæHY]H\ˆÛÙ\Ù˜\™H]Y\ÝH™\]Z\Ú]HÜ\˜]]šOÈ‹ˆÜ[ÛœÎˆÂˆJHÚYœ˜]\˜HH›ØØÚH
›ØÚÈÚ\\ŠH‹ˆŠHÚYœ˜]\˜HH›\ÜÛÈ
Ý™X[HÚ\\ŠH‹ˆÊH™]Ü™HH[š^šX[^ž˜^š[Û™H
[š]X[^˜][Ûˆ™XÝÜˆHUŠH‹ˆ‘
HQTËLMˆ
Y˜[˜ÙY[˜Üž\[ÛˆÝ[™\™
H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÚYœ˜]\˜HH›\ÜÛÈ
Ý™X[HÚ\\ŠJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÚYœ˜\šHH›\ÜÛÈ

ŠœÝ™X[HÚ\\œÊŠŠHÚYœ˜[›ÈH]H[ˆÚX\›È[ˆš]È[ˆž]H[H›ÛKHY™™\™[ž˜HZHÚYœ˜\šHH›ØØÚKˆ]Y\ÝÈH™[™HYX[H\ˆØÙ[˜\šHH˜\ÛZ\ÜÚ[Û™H[ˆ[\È™X[H
ÛÛYH›\ÜÚH]Y[ËÝšY[ÈÈ[[Y]šXH[™\ÝšX[HÛÛ[XJH[ˆÝZHH[™Ú^ž˜HÝ[H[Y\ÜØYÙÚ[È›Ûˆ0ê™Y]\›Z[˜]HHH][ž˜H]™H\ÜÙ\™HšYÝH[Z[š[[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚYœ˜]\˜HH›ØØÚH
›ØÚÈÚ\\ŠJŠˆÚYœ˜HH]H]šY[™ÛH[ˆ›ØØÚHH[Y[œÚ[ÛšHš\ÜÙH
\ËˆÈLŽš]
HHšXÚYYH	Ý\ÛÈH[ÛÜš]ZHHšY[\[Y[È
Y[™ÊHÙH[Y\ÜØYÙÚ[È›ÛˆÚHY]H\™™][Y[H[H[Y[œÚ[Û™H[›ØØÛË[›ÙXÙ[™È][ž˜HYÙÚ][]˜K—ˆ
ˆ
ŠÊH™]Ü™HH[š^šX[^ž˜^š[Û™H
UŠJŠˆ›Ûˆ0ê[˜H\ÛÙÚXHHÚYœ˜]\˜HÚ[[Y]šXØK™[œðë[ˆ˜[Ü™HØ\ÝX[H][^ž˜]È[ˆÛÛXš[˜^š[Û™HÛÛˆHÚYœ˜\šH\ˆØ\˜[\™HÚH\ÝH[ˆÚX\›ÈY[XÚH›ÙXØ[›È\ÝHÚYœ˜]HY™™\™[K—ˆ
ˆ
Š‘
HQTËLMŠŠˆ0ê[ˆ[ÛÜš][ÈHÜš]ÙÜ˜YšXHÚ[[Y]šXØH[\X[Y[HÚXÝ\›ËXH0ê[ˆÚYœ˜\š[ÈH›ØØÚH
Ü\˜HÝH›ØØÚHHLŽš]ÛÛˆÚX]šHHMˆš]
K›Ûˆ[ˆÚYœ˜\š[ÈH›\ÜÛÈ˜]]›Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[˜HšY[ØØ[Y\˜HHÛÜ™YÛX[ž˜HZ[]\™H˜\ÛY]H[›ÈÝ™X[Z[™ÈšY[ÈÛÛ[[ÈHÌ”Ëˆ\ˆ›ÝYÙÙ\™H[Ø[˜[HÛÛˆ[˜H][ž˜H]X\ÚH™\›Ë	Ø[ÛÜš][ÈHÚYœ˜]\˜HÚYœ˜HÙÛšHÚ[™ÛÛÈš]šY[ÈX[ˆX[›ÈÚH\ØÙH[Ù[œÛÜ™H\Ø[™È[ˆÚYœ˜\š[ÈH›\ÜÛËˆ‚ˆKˆÂˆYˆLÌ‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HÛØÚY]0è	ÔÝÙY]\È[YIË[ˆ›Ü›š]Ü™HH\›ÛZH[[Y[\šK\ÚY\˜H˜XØÚX\™HHÜY^š[ÛšHHHYØ[Y[H[H›ÜšXHš[Y\˜H›Ù]]˜Kˆ	Ø^šY[™HXÚYHHYÝ\™H[˜H™]HY\‹]Ë\Y\ˆXÙ[˜[^ž˜]H˜\Ø]HÝH[ˆ™YÚ\Ý›È\ÝšXZ]ÈHX˜›XÛÈ\ˆØ\˜[\™H	Ú[[]]Xš[]0è	Ú[YÜš]0èHH˜\Ü\™[ž˜HH]HH˜[œØ^š[ÛšHÛÛ[Y\˜ÚX[Kˆ‹ˆ]Y\Ý[ÛŽˆÛÛYHÚHÚX[XH]Y\ÝHXÛ›ÛÙÚXHH™YÚ\Ý›ÈX˜›XÛÈ\ÝšXZ]ÏÈ‹ˆÜ[ÛœÎˆÂˆJHØ[[™È‹ˆŠHÙ^HÝ™]Ú[™È‹ˆÊHš\›YHYÚ][H
YÚ][ÚYÛ˜]\™\ÊH‹ˆ‘
H›ØÚØÚZ[ˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H›ØÚØÚZ[ŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š˜›ØÚØÚZ[ŠŠˆ0êHXÛ›ÛÙÚXHH™YÚ\Ý›È\ÝšXZ]ÈÝHÝZHÈØÙ[˜\š[ÈÚH˜\ØNˆH™XÛÜ™ÛÛ›È˜YÙÜ\]H[ˆ›ØØÚHÛÛ˜Ø][˜]HH\ÚH™\XØ]HÝH[˜H™]HY\‹]Ë\Y\‹[ÚH™[™H	Ø[\˜^š[Û™Hš[]˜Xš[HÙ[ž˜H\[™\™HH[‰Ø]]Üš]0èÙ[˜[HšY]K—Šˆ
Š•[˜H™XÚ\Ø^š[Û™HÝZH\›Z[šKÚH	Ù\Ø[YH\Ý[™ÝYNŠŠˆÛHØšY]]šHK[[˜Ø[›ÈÙ\\˜][Y[H
Š˜›ØÚØÚZ[ŠŠˆH
Š›Ü[ˆX›XÈYÙ\ŠŠ‹ˆH›ØÚØÚZ[ˆ0êH
ŠœÝ]\˜JŠˆ
\ÚÛÛ˜Ø][˜]HpîHÛÛœÙ[œÛÊNÈ0ªÜ™YÚ\Ý›ÈX˜›XÛð®È0ê[˜H
ŠœØÙ[HHš\ÚXš[]0è
Š‹ÚH]ZH	Ø^šY[™HH˜]ÈØÙYÛY[™È[˜H™]HX˜›XØKˆ\Ú\ÝÛ›È[˜ÚH›ØÚØÚZ[ˆ
Šœ\›Z\ÜÚ[Û™Y
Š‹YÙÚXš[HÛÛÈZH\XÚ\[H]]Üš^ž˜]NˆÛÛ›È›ØÚØÚZ[‹XH›Ûˆ™YÚ\ÝšHX˜›XÚKˆšXÛÜ™H[›Û™HÚH[™YÚ\Ý›È0è[YÜš]0èH˜XØÚXXš[]0è
Š››Ûˆš\Ù\˜]^ž˜JŠŽˆÚpìˆÚHšHÚHØÜš]™H0êš\ÚXš[HHÚ][œ]YK\ˆÙ[\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHØ[[™ÊŠˆ0ê[˜HXÛšXØHÜš]ÙÜ˜YšXØHÚHÛÛœÚ\ÝH™[	ØYÙÚ][™Ù\™H]HØ\ÝX[H
Ø[
HH[˜H\ÜÝÛÜ™š[XHHY™™]X\›™H	Ú\Ú[™È\ˆ›ÝYÙÙ\›HH]XØÚHH^š[Û˜\š[ÈÈ˜Z[˜›ÝÈX›K—ˆ
ˆ
ŠŠHÙ^HÝ™]Ú[™ÊŠˆ0ê[ˆY]ÙÈ\ˆ™[™\™HpîHÚXÝ\›È	Ú\Ú[™È[H\ÜÝÛÜ™\ÙYÝY[™ÛÈ[Û\XÚH›ÛH
\ËˆÛÛˆ’ÑŒˆÈ˜Üž\
H\ˆ][Y[\™H[[\ÈHØ[ÛÛÈ™XÙ\ÜØ\š[È\ˆš[Û\›K—ˆ
ˆ
ŠÊHš\›YHYÚ][JŠˆÛÛ›È][^ž˜]H\ˆ]][XØ\™H	ÛÜšYÚ[™HH	Ú[YÜš]0èH[ˆÚ[™ÛÛÈš[HÈY\ÜØYÙÚ[ËXH›Ûˆ˜\™\Ù[[›È[˜H™]HY\‹]Ë\Y\ˆÈ[ˆ™YÚ\Ý›ÈÛÛ™]š\ÛÈH˜[œØ^š[ÛšK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[‰Ø^šY[™Hš[šXÛÛH™YÚ\Ý˜HÙÛšH\ÜØYÙÚ[È[H›ÝYÛXH
[˜XØÛÛÈ[HšYÛ˜K[HÜY^š[Û™HX\š][XKš[›È[\ÝšX]Ü™JHÝH[˜H›ØÚØÚZ[ˆX˜›XØKˆÚXÚ0êHH›ØØÚHÛÛ›ÈYØ]HÜš]ÙÜ˜YšXØ[Y[K™\ÜÝ[ˆ\ÝšX]Ü™H[\›YY[Èpìˆ˜[ÚYšXØ\™HH]HÈH[\\˜]\˜HHÛÛœÙ\˜^š[Û™Kˆ‚ˆKˆÂˆYˆLÌËˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ’[ˆ[‰Ø^šY[™HÚHYÝH[[Ù[ÈHÚXÝ\™^ž˜H™\›È\Ý	Ø[[Z[š\Ý˜]Ü™HHÚ\Ý[XH]™HÛÛ™šYÝ\˜\™HHÛÛ\Û™[H™\ÜÝHHXÚY\™HÙH[˜HšXÚY\ÝHHXØÙ\ÜÛÈ[Hš\ÛÜœÙH[\›™HX˜˜H\ÜÙ\™H]]Üš^ž˜]HÈ™YØ]K˜\Ø[™ÜÚHÝHÛXÞH^šY[™[K[˜[\ÚH[š\ØÚ[ÈH™\šYšXØH[ˆ[\È™X[H[HÜ™Y[žšX[HH[ÈÝ]È[\ÜÜÚ]]›Ëˆ‹ˆ]Y\Ý[ÛŽˆ’[ˆ]X[HX[›È\˜Ú]]\˜[H
[™JHš\ÚYYH[ÛÛ\Û™[H™\ÜÝÈH™[™\™H]Y\ÝHXÚ\Ú[ÛšHHXØÙ\ÜÛÈ™[[Ù[È™\›È\ÝÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
ÛÛ›ÛÈXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞJH‹ˆŠH[\XÚ]\Ý›Û™\È
›Û™HHšYXÚXH[\XÚ]JH‹ˆÊH]H[™H
X[›È]JH‹ˆ‘
HÛÛ›Û[™H
X[›ÈHÛÛ›ÛÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛÛ›Û[™H
X[›ÈHÛÛ›ÛÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[[Ù[È™\›È\Ý[
ŠÛÛ›Û[™JŠˆ
X[›ÈHÛÛ›ÛÊH0ê	Ø\™XHÙÚXØHÚHÛÛY[™HH[ÝÜšHXÚ\Ú[Û˜[H
ÛÛYH[ÛXÞH[™Ú[™HH[ÛXÞHYZ[š\Ý˜]ÜŠKˆ]Y\ÝÈX[›È˜[]HHšXÚY\ÝHHXØÙ\ÜÛÈ[˜[^ž˜[™ÈHÛ]XÚHHÚXÝ\™^ž˜K	ÚY[]0è[	Ý][K[ÛÛ\ÝÈ[\ÜÜÚ]]›ÈHHÙYÛ˜[HHZ[˜XØÚXKXÚY[™ÈÙHÝXš[\™HÈ™YØ\™H[˜HÛÛ›™\ÜÚ[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
Šˆ0êHš[ÜÛÙšXHÈ[YXØØ[š\Û[ÈHÛÛ›ÛÈYÛHXØÙ\ÜÚH\XØ]ËXH›Ûˆ˜\™\Ù[H[ˆX[›È\˜Ú]]\˜[H[	Ú[™œ˜\Ý]\˜HH™]HÝ\ÜØK—ˆ
ˆ
ŠŠH[\XÚ]\Ý›Û™\ÊŠˆÛÛ›È\™YH\XÚHZH™XØÚH[Ù[H\š[Y]˜[H[ˆÝZHH\ÜÜÚ]]šH[\›šHÛÛ›ÈÛÛœÚY\˜]H[š[œÙXØ[Y[HÚXÝ\šK[ˆÛÛ˜Ù]ÈÚHÈ™\›È\ÝZ\˜HYX›Û\™H[]Ë—ˆ
ˆ
ŠÊH]H[™H
X[›È]JJŠˆ0êÈÝ˜]ÈÜ\˜]]›È™\ÜÛœØXš[H[	Ú[œÝ˜Y[Y[Ë[˜\ÜÜÈH[\ÜØYÙÚ[ÈY™™]]›ÈZHXØÚ]HH]HYÛH][H[˜H›ÛHÚHHÙ\ÜÚ[Û™H0êÝ]H]]Üš^ž˜]H[ÛÛ›Û[™K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ\[™[HšXÚYYH	ØXØÙ\ÜÛÈH[˜HØ\[HÛÛ™]š\ØH[HÈ[X][›ÈH[ˆT[œÛÛ]È[ˆ\ÚXKˆ[ÛXÞH[™Ú[™HH[ÛXÞHYZ[š\Ý˜]Üˆ
ÛÛ\Û™[H[ÛÛ›Û[™JH[˜[^ž˜[›ÈHZ[˜XØÚXHH™YØ[›È	ØXØÙ\ÜÛËÜ™[˜[™È[]H[™HH›ØØØ\™HHXØÚ]Kˆ‚ˆKˆÂˆYˆLÍˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆ”’PÓÔ‘È‹ˆØÙ[˜\š[Îˆ“	ÛÜ™Ø[š^ž˜^š[Û™H[\›˜^š[Û˜[H	Õ\Ý\ÉÈÙ™œ™HÙ\š^šHHÚXÝ\™^ž˜HHšYXÚX\šHÝ[ÙX‹ˆ	Ø^šY[™HÚHØØÝ\HH˜[Y\™HHY[]0èHÙ\™\ˆHÛZ[šK[Y]\™HÜ™Y[žšX[HÜš]ÙÜ˜YšXÚHYÚ][HHš\›X\™HÚX]šHX˜›XÚH\ÜÛØÚX[™ÛHH[]0èÜXÚYšXÚH\ˆÛÛœÙ[\™HÛÛ][šXØ^š[ÛšHÚYœ˜]HÚXÝ\™H˜[Z]HËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÛÙÚXHHÜ™Ø[š^ž˜^š[Û™H\ØÜš]™HYYÛ[È	ÛÜ\˜]ÈH	Õ\Ý\ÉÏÈ‹ˆÜ[ÛœÎˆÂˆJH›ÛÝÙˆ\Ý
˜YXÙHHšYXÚXJH‹ˆŠH›ØÚØÚZ[ˆ‹ˆÊH™YÚ\Ý˜][Ûˆ]]Üš]H
]]Üš]0èH™YÚ\Ý˜^š[Û™HHJH‹ˆ‘
HÙ\YšXØ]H]]Üš]H
]]Üš]0èHÙ\YšXØ^š[Û™HHÐJH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÙ\YšXØ]H]]Üš]H
]]Üš]0èHÙ\YšXØ^š[Û™HHÐJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
ŠÙ\YšXØ]H]]Üš]H
ÐJJŠˆ0ê[‰Ù[]0è\ž˜HšY]H™\ÜÛœØXš[H[	Ù[Z\ÜÚ[Û™K[Hš\›XK[HÙ\Ý[Û™HH[H™]›ØØHZHÙ\YšXØ]HYÚ][Kˆ\ÜØH]\ÝH	Ø\ÜÛØÚX^š[Û™H˜H[˜HÚX]™HX˜›XØHH	ÚY[]0è[›ÜšY]\š[È[Ù\YšXØ]ÈYYX[H	Ý\ÛÈ[H›ÜšXHš\›XHYÚ][K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH›ÛÝÙˆ\Ý
˜YXÙHHšYXÚXJJŠˆÚHšY™\š\ØÙHH[˜HÛÜ™Ù[HÜš]ÙÜ˜YšXØH\™Ø\™HÈÛÙØ\™H[š[œÙXØ[Y[HšY]HÝHÝZHÙÙÚXHHÚXÝ\™^ž˜HH[ˆ[\›ÈÚ\Ý[XHÜ\˜]]›ÈÈ\ÜÜÚ]]›Ë›ÛˆH[‰ÛÜ™Ø[š^ž˜^š[Û™HÛÛ[Y\˜ÚX[HÚHš[\ØÚXHÜ™Y[žšX[HYÚ][HÝ[ÙX‹—ˆ
ˆ
ŠŠH›ØÚØÚZ[ŠŠˆ0ê[˜HXÛ›ÛÙÚXHH™YÚ\Ý›È\ÝšXZ]Ë›Ûˆ[‰ÛÜ™Ø[š^ž˜^š[Û™H[˜Ø\šXØ]H[	Ù[Z\ÜÚ[Û™HH[H˜[Y^š[Û™HHÙ\YšXØ]HÔÓÕË—ˆ
ˆ
ŠÊH™YÚ\Ý˜][Ûˆ]]Üš]H
JJŠˆ0ê[‰Ù[]0è]\Ú[X\šXHÚH\ÜÚ\ÝHHÐH™\šYšXØ[™È	ÚY[]0èZHšXÚYY[KXH›ÛˆH	Ø]]Üš]0èHš\›X\™HY[Y]\™H\™][Y[HHÙ\YšXØ]HYÚ][Hš[˜[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ]X[™ÈHÛÛYÚHÝHÎ‹ËÙÛÛÙÛK˜ÛÛX[˜HÐH\ž˜HšXÛÛ›ÜØÚ]]H
ÛÛYHYÚPÙ\ÈÛÛÙÛH\ÝÙ\šXÙ\ÊHØ\˜[\ØÙHYÚ][Y[HÚHHÚX]™HX˜›XØH\Ø]H\\Y[™HY™™]]˜[Y[HHÛÛÙÛHË]š][™È]XØÚHX[‹Z[‹]KSZYKˆ‚ˆKˆÂˆYˆLÍKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’Ù]š[‹[ˆ[˜[\ÝHHÚ\Ý[ZH\Ü\È™\ÜÛÈ[‰Ø^šY[™HHÙ\š^šHš[˜[žšX\šKšXÙ]™H[˜HšXÚY\ÝHH[ÙYšXØH\ˆ\XØ\™H[ˆ[\Ü[HYÙÚ[Ü›˜[Y[ÈÝ[][]]›È[Ú\Ý[XHT”^šY[™[Kˆš[XHÚHH[ÙYšXØH™[™ØH\›Ý˜]HÈ[\[Y[]KÙ]š[ˆ[˜[^ž˜HXØÝ\˜][Y[HÛÛYH	ØYÙÚ[Ü›˜[Y[È[\]\°èÝ[H™\Ý^š[ÛšH\™Ø\™HZHÙ\™\ˆH›Ù^š[Û™KÝ[	ÛÜ\˜]]š]0è][ÝYX[˜H[\œÛÛ˜[HHÝ[H[YÜ˜^š[ÛšHTH]]™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\›Z[™H[Ú[™ÙHX[˜YÙ[Y[\ØÜš]™HQQÓSÈH˜[]^š[Û™HÛÛ™ÝHHÙ]š[È‹ˆÜ[ÛœÎˆÂˆJH\›Ý˜[›ØÙ\ÜÈ
›ØÙ\ÜÛÈH\›Ý˜^š[Û™JH‹ˆŠH˜XÚÛÝ][ˆ
X[›ÈHš\š\Ý[›ÊH‹ˆÊH™\œÚ[ÛˆÛÛ›Û
ÛÛ›ÛÈH™\œÚ[Û™JH‹ˆ‘
H[\XÝ[˜[\Ú\È
[˜[\ÚHH[\]ÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[\XÝ[˜[\Ú\È
[˜[\ÚHH[\]ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	ÊŠ[˜[\ÚHH[\]ÊŠˆ
[\XÝ[˜[\Ú\ÊH0êH˜\ÙHÜš]XØH[Ú[™ÙHX[˜YÙ[Y[[ˆÝZHÚHÝYX[›ÈÚ\Ý[X]XØ[Y[H]HHÝ[žšX[HY™™]HÛÛ]\˜[KHš\ØÚH\ÜÛØÚX]HHHšXØY]HÜ\˜]]™HÚH[ˆØ[XšX[Y[È›ÜÜÝÈÝ™X˜™H\œ™XØ\™H[	Ú[™œ˜\Ý]\˜HUZH›ØÙ\ÜÚHH\Ú[™\ÜÈH[HÚXÝ\™^ž˜H[	ÛÜ™Ø[š^ž˜^š[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\›Ý˜[›ØÙ\ÜÈ
›ØÙ\ÜÛÈH\›Ý˜^š[Û™JJŠˆ0êH˜\ÙHÝXØÙ\ÜÚ]˜HÛÛ™ÝH[Ú[™ÙHYš\ÛÜžH›Ø\™
ÐPŠH\ˆ\›Ý˜\™HÈšYš]]\™H›Ü›X[Y[H[Ø[XšX[Y[È˜\Ø[™ÜÚHÝZH]H[Y\œÚH[	Ø[˜[\ÚHH[\]Ë—ˆ
ˆ
ŠŠH˜XÚÛÝ][ˆ
X[›ÈHš\š\Ý[›ÈÈ›Û˜XÚÈ[ŠJŠˆ0êHX[šYšXØ^š[Û™H[H^š[ÛšHXÛšXÚHHÛÛ\Y\™H\ˆš\š\Ý[˜\™HHÚ\Ý[ZH[ÈÝ]ÈÜšYÚ[˜\š[È]X[Ü˜H[Ø[XšX[Y[È[\[Y[]È›Ý›ØÚH[›ÛX[YH›ØØØ[K—ˆ
ˆ
ŠÊH™\œÚ[ÛˆÛÛ›Û
ÛÛ›ÛÈH™\œÚ[Û™JJŠˆ0êH˜]XØHH˜XØÚX\™HHÙ\Ý\™HH™]š\Ú[ÛšHZHš[HHÛÙXÙHÈHÛÛ™šYÝ\˜^š[Û™K\Ý˜[™XH[H˜[]^š[Û™HH[\]ÈÜ\˜]]›ÈÛØ˜[HH[ˆš[\ØÚ[Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆš[XHH[œÝ[\™H[˜H]ÚÜš]XØHÝ[Ù\™\ˆT”	Ø[˜[\ÝHÚ[][H	ØYÙÚ[Ü›˜[Y[È[ˆ[ˆ[XšY[HH™K\›Ù^š[Û™KØÛÜ™[™ÈÚHH[Ý˜H™\œÚ[Û™H›ØØØH	ÐTH[HÜY^š[ÛšKˆ	Ú[œÝ[^š[Û™HšY[™HÛÜÜ\ØKØ[˜[™È	Ø^šY[™H[›ØØÛÈYÛHÜ™[šKˆ‚ˆKˆÂˆYˆLÍ‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HÛØÚY]0èHK[X\›š[™È	Ô™X\ÛÛˆ[™š[YIÈ\ÚY\˜H[›˜[˜\™HHÚXÝ\™^ž˜HH\˜Ú]šX^š[Û™H[HÜ™Y[žšX[HZH›ÜšHÝY[Kˆ[žšXÚ0êH[Z]\œÚHY\XØ\™H[ˆ[ÛÜš][ÈH\ÚÝ[™\™[˜HÛÛH›ÛK	Ø^šY[™H[›ÙXÙH[ˆYXØØ[š\Û[ÈHÚYœ˜]\˜HÚH\ÙYÝYHšXÛÜœÚ]˜[Y[HZYÛXZXHH]\˜^š[ÛšHX][X]XÚHH\Ú[™ËÛÛˆÈØÛÜÈH˜[[\™H›Ý]›ÛY[H[Ø[ÛÛÈHœ]KY›Ü˜ÙHH\HH[ˆ]XØØ[H\Ý\››Ëˆ‹ˆ]Y\Ý[ÛŽˆÛÛYHšY[™HÚX[X]È]Y\ÝÈY]ÙÈÜš]ÙÜ˜YšXÛÈH›Ý^š[Û™H[H\ÜÝÛÜ™È‹ˆÜ[ÛœÎˆÂˆJH\Ú[™È‹ˆŠHØ[[™È‹ˆÊHÙ^HÝ™]Ú[™È‹ˆ‘
Hš\›YHYÚ][H
YÚ][ÚYÛ˜]\™\ÊH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÙ^HÝ™]Ú[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š’Ù^HÝ™]Ú[™ÊŠˆ0ê[˜HXÛšXØHÚHÛÛœÚ\ÝH™[	Ù\ÙYÝZ\™Hš\]][Y[HHšXÛÜœÚ]˜[Y[H[ˆ[ÛÜš][ÈH\ÚÈHÚYœ˜]\˜H
\Ëˆ’ÑŒ‹˜Üž\ØÜž\
HÝH[˜H\ÜÝÛÜ™\ˆ[ˆ[]˜]È[Y\›ÈH]\˜^š[ÛšKˆ]Y\ÝÈ›ØÙ\ÜÛÈ][Y[H[X™\˜][Y[H[[\ÈHØ[ÛÛÈ™XÙ\ÜØ\š[È\ˆ™\šYšXØ\™HÚX\ØÝ[˜H\ÜÝÛÜ™™[™[™ÈÛH]XØÚHHœ]KY›Ü˜ÙHÈH^š[Û˜\š[È[˜Ü™YXš[Y[H[HHÛÜÝÜÚH[ˆ\›Z[šHHš\ÛÜœÙH\ˆÛH]XØØ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ú[™ÊŠˆ0êHÛÛ™\œÚ[Û™HÝ[™\™HÛÛÈÚ[™ÛÛÈH[˜HÝš[™ØH[ˆ[˜HÙ\]Y[ž˜HH[™Ú^ž˜Hš\ÜØKÙ[ž˜H	Ø\XØ^š[Û™H]\˜]]˜H›ÛHH˜[[\™H[[žš[Û˜[Y[HH[]]šHHÜ˜XÚÚ[™Ë—ˆ
ˆ
ŠŠHØ[[™ÊŠˆ0ê	ØYÙÚ][HH[˜HÝš[™ØHØ\ÝX[H[šXØHš[XH[›ØÙ\ÜÛÈH\Ú[™È\ˆ]š]\™HÚH\ÜÝÛÜ™Y[XÚHX˜šX[›È\ÚYÝX[KÛÛ˜\Ý[™È	Ý\ÛÈH˜Z[˜›ÝÈX›K—ˆ
ˆ
Š‘
Hš\›YHYÚ][JŠˆ\ÜÚXÝ\˜[›È	Ø]][XÚ]0èH[›Û‹\š\Y[ÈZHY\ÜØYÙÚK›Ûˆ[››È][™[ž˜HÛÛˆ[˜Y™›Üž˜[Y[ÈÜš]ÙÜ˜YšXÛÈ[H\ÜÝÛÜ™Y[[Üš^ž˜]K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[™XÙHHØ[˜\™HH\ÜÝÛÜ™ÛÛLLŒØ\XØ[™È[ˆÙ[\XÙH\ÚQH\Ý[[™[Ë[Ú\Ý[XH][^ž˜H˜Üž\ÛÛˆÛÜÝ˜XÝÜˆL‹Ú[ðê—ŒLˆHŒMˆ]\˜^š[ÛšKˆ]Y\ÝÈÛÜÝš[™ÙH[Ù\™\ˆH[\YYØ\™HÚ\˜ØHLZ[\ÙXÛÛ™H\ˆ™\šYšXØ\™H[ÙÚ[‹™[™[™È[\˜]XØXš[H]XØÚHœ]KY›Ü˜ÙHÝHÔHY[H™[ØÚ]0èˆ‚ˆKˆÂˆYˆLÍËˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HXÚÛÛ\[žH	Ó›Ý\ÈXÚ›ÛÙÚY\ÉÈÝHš\›ÙÙ][™ÈH›ÜšXH\˜Ú]]\˜HH™]HÙYÝY[™ÈH[™YHÝZYH[œ˜[Y]ÛÜšÈ™\›È\Ýˆ\ˆÙ\Ý\™H	ØXØÙ\ÜÛÈZH\[™[H[Hš\ÛÜœÙH^šY[™[H[ˆ[ÙÈÚXÝ\›ÈH›\ÜÚXš[K[X[HUXÚYHH[\[Y[\™H[˜HÛÛ^š[Û™HÝ[X[›ÈHÛÛ›ÛÈÚH™\šYšXÚH	ÚY[]0è[	Ý][K[˜[^žšHHÝYHX[œÚ[ÛšH]]™HH\XÚH[˜[ZXØ[Y[HÛXÞHHÚXÝ\™^ž˜H™XÚ\ÙKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[HÈ\›ØØÚ[È[	Ø\˜Ú]]\˜H™\›È\Ý\ØÜš]™H]Y\ÝHÙ\Ý[Û™HÙ[˜[^ž˜]HYÛHXØÙ\ÜÚHÝ[X[›ÈHÛÛ›ÛÏÈ‹ˆÜ[ÛœÎˆÂˆJH›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û
ÛÛ›ÛÈXØÙ\ÜÚH˜\Ø]ÈÝZH[ÛJH‹ˆŠHX\Ýš]š[YÙH
Z[š[[Èš]š[YÚ[ÊH‹ˆÊH[\XÚ][žH
[šYYÛÈ[\XÚ]ÊH‹ˆ‘
HÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
ÛÛ›ÛÈXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞJH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
ÛÛ›ÛÈXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[	Ø\˜Ú]]\˜H™\›È\Ý[
ŠÛÛ›ÛÈYÛHXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞJŠˆ
ÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
H0ê[[\Ý›È[ÛÛ›Û[™HÚH™[™HHXÚ\Ú[ÛšHHXØÙ\ÜÛÈ\Ø[Z[˜[™È[˜HÙ\šYHH™YÛÛHHÛ]XÚH^šY[™[H
\ËˆY[]0è[	Ý][KÝ]È[\ÜÜÚ]]›ËÜ˜\š[Ë™\]Z\Ú]H[\\[Y[ÊHš[XHHÛÛ˜ÙY\™H	ØXØÙ\ÜÛÈ[Hš\ÛÜœÙHÙ[œÚXš[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û
PÊJŠˆ0ê[ˆY]ÙÈÛ\ÜÚXÛÈHÛÛ›ÛÈXØÙ\ÜÚH˜\Ø]È\ØÛ\Ú]˜[Y[HÝ[	Ø\\[™[ž˜HHÜ\HÈ[ÛHH]›Ü›ÈÝ]XÚK›Ûˆ˜\™\Ù[[™È	Ú[\›ÈÚ\Ý[XHY]]›ÈH[˜[ZXÛÈÝZY]ÈHÛXÞHÛÛ\\ÜÙH[ÛÛ›Û[™H[ˆ™\›È\Ý—ˆ
ˆ
ŠŠHX\Ýš]š[YÙJŠˆ0ê[š[˜Ú\[ÈÙ[™\˜[HHÚXÝ\™^ž˜HÚH™]™YHHÛÛ˜ÙY\™HYÛH][HÛÛÈH\›Y\ÜÚHÝ™][Y[H™XÙ\ÜØ\šH\ˆÝ›ÛÙ\™HH›ÜšYHX[œÚ[ÛšK›Ûˆ[[Ù[ÈÛÙØ\™HÚH˜[]HH™YÛÛHHXØÙ\ÜÛË—ˆ
ˆ
ŠÊH[\XÚ][žJŠˆ0ê[ˆš[˜Ú\[ÈHÛÛ™šYÝ\˜^š[Û™HH™]H
ÙH[˜HÛÛ›™\ÜÚ[Û™H›Ûˆ0ê\ÜXÚ][Y[HÛÛœÙ[]KšY[™H›ØØØ]JK\Ý˜[™[È[HÙÚXØHY]]˜HHÛXÞHX[˜YÙ[Y[——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ[‰Ø^šY[™K	ØXØÙ\ÜÛÈZH]HÙ[œÚXš[HZHÛY[HšXÚYYHÚ[][[™X[Y[HÚH	Ý][HÚXH[ˆXØÛÝ[X[˜YÙ\ˆ]]Üš^ž˜]ËÚHÛÛYÚH˜[Z]H”ˆ^šY[™[HH][^žšH[ˆ\ÜÜÚ]]›ÈÛÛˆ[]š\\ÈYÙÚ[Ü›˜]Îˆ]Y\ÝÈÛÛ›ÛÈY]]›ÈH][KY˜]Ü™H0êÝZY]È[HÛXÞKˆ‚ˆKˆÂˆYˆLÎˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘\˜[H	Ú[œÝ[^š[Û™HH[˜H[Ý˜H\XØ^š[Û™HÛÙØ\™HHÛÛXš[]0è^šY[™[HÝH[ˆÙ\™\ˆ[^Ù[˜[^ž˜]È[	Ú[\››È[H	ÒÙ[H[››Ý˜][ÛœÈÉË	Ú[œÝ[]Ü™HšXÙ]™H[ˆ\œ›Ü™H›ØØØ[Nˆ	Ø\XØ^š[Û™H›Ûˆpìˆ\ÜÙ\™H]šX]H\˜Ú0êHšXÚYYH	Ú[œÝ[^š[Û™H™]™[]˜HH[˜HÜXÚYšXØHXœ™\šXHÜš]ÙÜ˜YšXØHÜ[ˆÛÝ\˜ÙH›Ûˆ™\Ù[H™[Ú\Ý[XKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\›Z[™HXÛšXÛÈ\ØÜš]™HQQÓSÈH™[^š[Û™H›ØØØ[H˜H	Ø\XØ^š[Û™HHÛÛXš[]0èHHXœ™\šXHX[˜Ø[OÈ‹ˆÜ[ÛœÎˆÂˆJH\ÙXÝ^š[Û™HH[‰Ø\XØ^š[Û™HYØXÞH
[›š[™ÈHYØXÞH\XØ][ÛŠH‹ˆŠH›Ø›[XHHÛÛ\]Xš[]0è
ÛÛ\]Xš[]H\ÜÝYJH‹ˆÊHXØÙ\ÜÛÈ][H[[Z]]È
[œ™\ÝšXÝY\Ù\ˆXØÙ\ÜÊH‹ˆ‘
H\[™[ž˜HÛÙØ\™H
ÛÙØ\™H\[™[˜ÞJH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H\[™[ž˜HÛÙØ\™H
ÛÙØ\™H\[™[˜ÞJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Š™\[™[ž˜HÛÙØ\™JŠˆÚH™\šYšXØH]X[™È[˜H]\›Z[˜]H\XØ^š[Û™HÈ[Ù[È™XÙ\ÜÚ]H[	Ù\Ú\Ý[ž˜K[	Ú[œÝ[^š[Û™HÈ[	Ù\ÙXÝ^š[Û™H™]™[]˜HH[‰Ø[˜Hš\ÛÜœØHÛÙØ\™H
Xœ™\šXKXØÚ]Ëœ˜[Y]ÛÜšÈÈÙ\š^š[ÊH\ˆÝ\ˆ[žš[Û˜\™HÛÜœ™][Y[HHÛÛ\]\™H	Ù\ÙXÝ^š[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\ÙXÝ^š[Û™HH[‰Ø\XØ^š[Û™HYØXÞJŠˆÚHšY™\š\ØÙH[	Ý\ÛÈÜ\˜]]›ÈHÚ\Ý[ZHÈÛÙØ\™HØœÛÛ]HÈ›ÛˆpîHÝ\Ü]KXH›Ûˆ\Üš[YH[ˆ™\™\]Z\Ú]È›ØØØ[H˜HXØÚ]K—ˆ
ˆ
ŠŠH›Ø›[XHHÛÛ\]Xš[]0è
ŠˆÚHšY™\š\ØÙH[	Ú[\ÜÜÚXš[]0èÈ[HY™šXÛÛ0èHYHÈpîHÛÙØ\™HÈ\™Ø\™HH[žš[Û˜\™HÛÜœ™][Y[H™[ÈÝ\ÜÛÈ[XšY[KY[™H[ˆ]Y\ÝÈØÙ[˜\š[È	Ø\XØ^š[Û™HHÛÛXš[]0è[žš[Û™\™X˜™H\™™][Y[HÙHHXœ™\šXH›ÜÜÙH™\Ù[K—ˆ
ˆ
ŠÊHXØÙ\ÜÛÈ][H[[Z]]ÊŠˆšYÝX\™HHš]š[YÚHÜ\˜]]šHYÛH][HÝZHš[HHÚ\Ý[XK›ÛˆH[\™\[™[ž™HH[žš[Û˜[Y[È[ÛÙXÙK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ\ˆÝ\ˆ]šX\™H	Ø\XØ^š[Û™HHÛÛXš[]0è[Ú\Ý[XHÜ\˜]]›È[^šXÚYYHH™\Ù[ž˜H[XØÚ]ÈÜ[œÜÛY]™[ˆÙH]Y\ÝH\[™[ž˜HÛÙØ\™H›ÛˆšY[™H[œÝ[]Hš[XH˜[Z]H\YÙ]È][X	Ø\XØ^š[Û™HšYš]]\°èH]šX\œÚH[˜ÚX[™È[ˆ\œ›Ü™H›ØØØ[Kˆ‚ˆKˆÂˆYˆLÎKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆ”’PÓÔ‘È‹ˆØÙ[˜\š[Îˆ•[‰ÛÜ™Ø[š^ž˜^š[Û™Hš[˜[žšX\šXHYÝH[˜HÛÛ\\ÜØH[™œ˜\Ý]\˜HHÚX]™HX˜›XØH
ÒJH\ˆÜš]ÙÜ˜Y˜\™H]HHØÝ[Y[H[\›šHHH]X˜\ÙHÛÛ™šY[žšX[Kˆ\ˆ™]™[š\™HH\™]H\œ™]™\œÚXš[HZH]HÙ[œÚXš[H]X[Ü˜HH\[™[HÛX\œš\ÜÙ\›ÈH›ÜšXHÚX]™Hš]˜]HHXÚYœ˜]\˜K	Ø^šY[™HXÚYHH\ÜÚ]\™H[ˆÚXÝ\™^ž˜H[˜HÛÜXHH˜XÚÝ\H]HHÚX]šHš]˜]H™\ÜÛÈ[‰Ù[]0è\ž˜HšY]H]]Üš^ž˜]H[™XÝ\\›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[HÈ›ØÙ\ÜÛÈ[HÒH\›Y]HH\ÜÚ]\™HH™XÝ\\˜\™HHÚX]šHÜš]ÙÜ˜YšXÚH˜[Z]H\ž™H\HšY]OÈ‹ˆÜ[ÛœÎˆÂˆJHX›XÈÙ^H[™œ˜\ÝXÝ\™H
[™œ˜\Ý]\˜HHÚX]™HX˜›XØJH‹ˆŠHÙ^H^Ú[™ÙH
ØØ[Xš[ÈHÚX]šJH‹ˆÊHÙ^H\ØÜ›ÝÈ
\ÜÚ]ÈšYXÚX\š[È[HÚX]šJH‹ˆ‘
HÙ^HÙ[™\˜][Ûˆ
Ù[™\˜^š[Û™H[HÚX]šJH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÙ^H\ØÜ›ÝÈ
\ÜÚ]ÈšYXÚX\š[È[HÚX]šJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š’Ù^H\ØÜ›ÝÊŠˆ0ê[ˆXØÛÜ™ÈÈ[ˆ›ØÙ\ÜÛÈ[ˆÝZH[˜H\ž˜H\HšY]HY[[Üš^ž˜HHÝ\ÝÙ\ØÙH[ˆ[ÙÈÚXÝ\›ÈHÚX]šHHÜš]ÙÜ˜YšXH
ÛÛ][Y[HHÚX]šHš]˜]JKˆ]Y\ÝÈYXØØ[š\Û[ÈÛÛœÙ[HH™XÝ\\˜\™HHÚX]šHHXÚYœ˜\™HH]H[ˆØÙ[˜\šHH[Y\™Ù[ž˜KÛÛYHÈÛX\œš[Y[ÈXØÚY[[H[HÜ™Y[žšX[HH\H[	Ý][HYÚ][[ÈÈšXÚY\ÝHYØ[HHXØÙ\ÜÛÈZH]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHX›XÈÙ^H[™œ˜\ÝXÝ\™H
ÒJJŠˆ0ê	Ú[\›Èœ˜[Y]ÛÜšÈÜ™Ø[š^ž˜]]›ËXÛšXÛÈH›ØÙY\˜[HÚHÛÝ™\›˜HHÜš]ÙÜ˜YšXH\Ú[[Y]šXØK›Ûˆ[Ú[™ÛÛÈ›ØÙ\ÜÛÈH\˜Ú]šX^š[Û™HšYXÚX\šXHH˜XÚÝ\[HÚX]šK—ˆ
ˆ
ŠŠHÙ^H^Ú[™ÙH
ØØ[Xš[ÈHÚX]šJJŠˆ0ê[›ÝØÛÛÈÜš]ÙÜ˜YšXÛÈ][^ž˜]È\ˆ™YÛÞšX\™HÈ˜\ÛY]\™H[ˆÚXÝ\™^ž˜HÚX]šHÚ[[Y]šXÚH˜HYH\HÛÛ][šXØ[H
\ËˆY™šYKR[X[ŠK—ˆ
ˆ
Š‘
HÙ^HÙ[™\˜][Ûˆ
Ù[™\˜^š[Û™H[HÚX]šJJŠˆ0êH˜\ÙHX][X]XØH™[[Z[˜\™HHÜ™X^š[Û™HH[˜HÛÜXHHÚX]šHÜš]ÙÜ˜YšXÚH
X˜›XØHHš]˜]JK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ[™ÙYÛ™\™H[˜Ø\šXØ]ÈHš\›X\™HH™[X\ÙHH[ˆÛÙØ\™H^šY[™[H\™HH›ÜšXHÚX]™Hš]˜]H\™Ø\™KˆÜ˜^šYH[Ù^H\ØÜ›ÝË	Ø[[Z[š\Ý˜]Ü™H[YØ]ÈH	Ø]Y]ÜˆYØ[HÜÜÛÛ›È™XÝ\\˜\™H[˜HÛÜXH›Ý]H[HÚX]™H[Ø]™X]HYÚ][H^šY[™[H\ˆ›Ûˆ[\œ›Û\\™HHš[\ØÚKˆ‚ˆKˆÂˆYˆMˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“HØÝ[ÛHH›Ü›X^š[Û™H›Ù™\ÜÚ[Û˜[H	Ñ[Ûˆ˜Z[š[™ÉÈ[ÛH[˜Ü™[Y[\™HHšYXÚXHHHÚXÝ\™^ž˜H[›Üš[ÈÜ[HÙXˆ\ˆÛHÝY[H\Ý\›šK[[Z[˜[™ÈH˜\ÝY[ÜÚH]š\ÚHHÚXÝ\™^ž˜HÙ[™\˜]HZHœ›ÝÜÙ\ˆ[Ù\›šH]X[™ÈÛH][HšHÚHÛÛYØ[›È˜[Z]HËˆH[š[™K	Ø^šY[™H™XÙ\ÜÚ]HH[ˆÙ\YšXØ]ÈYÚ][Hš\›X]ÈHÛÛ˜[Y]ÈH[‰Ø]]Üš]0èHÙ\YšXØ^š[Û™H]]Ü™]›ÛHHšXÛÛ›ÜØÚ]]HH]™[ÈÛØ˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÛÙÚXHHÙ\YšXØ]Èš\ÜÛ™HYYÛ[ÈH]Y\ÝH\ÚYÙ[ž˜HÜ™Ø[š^ž˜]]˜OÈ‹ˆÜ[ÛœÎˆÂˆJHÙ[‹\ÚYÛ™YÙ\YšXØ]H
Ù\YšXØ]È]]Ùš\›X]ÊH‹ˆŠHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
H‹ˆÊHÚ[Ø\™Ù\YšXØ]H
Ù\YšXØ]ÈÚ[Ø\™
H‹ˆ‘
H\™\\HÙ\YšXØ]H
Ù\YšXØ]ÈH\ž™H\JH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H\™\\HÙ\YšXØ]H
Ù\YšXØ]ÈH\ž™H\JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜Ù\YšXØ]ÈH\ž™H\JŠˆ
[Y\ÜÛÈH[˜HÙ\YšXØ]H]]Üš]HX˜›XØHšY]KHYØ[Y[ÈÛÛYHYÚPÙ\HÙXÝYÛÈÜ\™HÜ˜]Z]HÛÛYH]	ÜÈ[˜Üž\
H0êš\›X]ÈH[˜HÐHHÝZHÙ\YšXØ]H˜YXÙHÛÛ›È™Z[œÝ[]HHÛÛœÚY\˜]H][™Xš[HH]HHœ›ÝÜÙ\ˆ[Ù\›šKˆ]Y\ÝÈ[[Z[˜H]X[ÚX\ÚH]š\ÛÈHÚXÝ\™^ž˜H\ˆÛH][H\Ý\›šHH][Y[HHÜ™YXš[]0è[Ú]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÙ[‹\ÚYÛ™YÙ\YšXØ]H
Ù\YšXØ]È]]Ùš\›X]ÊJŠˆ0êÙ[™\˜]ÈHš\›X]È[\›˜[Y[H[	ÛÜ™Ø[š^ž˜^š[Û™HÝ\ÜØKˆÚXÚ0êH›Ûˆ0êÝ\Ü]ÈH[˜HÐHšY]HX˜›XØK›Ý›ØØHHÛÛ\\œØHHš\ÝÜÚH]š\ÚHH\œ›Ü™HÝ[œ›ÝÜÙ\ˆZHš\Ú]]ÜšH\Ý\›šK—ˆ
ˆ
ŠŠHÔÔˆ
šXÚY\ÝHHš\›XH[Ù\YšXØ]ÊJŠˆ›Ûˆ0ê[ˆÙ\YšXØ]ÈHÚXÝ\™^ž˜K™[œðë[š[HH\ÝÈ›Ü›X[HÚHÛÛY[™HH[™›Ü›X^š[ÛšHÝ[	ÛÜ™Ø[š^ž˜^š[Û™HHHÚX]™HX˜›XØK[šX]È[HÐH\ˆšXÚYY\™H	Ù[Z\ÜÚ[Û™H[Ù\YšXØ]ÈY™™]]›Ë—ˆ
ˆ
ŠÊHÚ[Ø\™Ù\YšXØ]JŠˆÛÛœÙ[HH›ÝYÙÙ\™H[ˆÛZ[š[Èš[˜Ú\[HH]HHÝ[ÚHÛÝÙÛZ[šHHš[[È]™[È
\Ëˆ
‹™[Û˜Z[š[™Ë˜ÛÛJKXHH\ˆðêH›ÛˆØ\˜[\ØÙH	Ø]]Ü™]›Û^ž˜HHY[›ÈÚH›ÛˆÚXHÝ]Èš\›X]ÈH[˜HÐHH\ž™H\K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[Ü[HÝY[HH[‰ØXØØY[ZXHXÚYHHÛÜÝ]Z\™H[™XØÚ[ÈÙ\YšXØ]È]]Ùš\›X]ÈÛÛˆ[ˆÙ\YšXØ]È[Y\ÜÛÈH]	ÜÈ[˜Üž\ˆH]Y[[ÛY[Ë]HHœ›ÝÜÙ\ˆšXÛÛ›ÜØÛÛ›È˜]]˜[Y[HHÛÛ›™\ÜÚ[Û™HÈÛÛYHšY]HHÚXÝ\˜K[[Z[˜[™È[Z[˜XØÚ[ÜÛÈY\ÜØYÙÚ[È›ÜÜÛÈH]š\ÛËˆ‚ˆKˆÂˆYˆMKˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“	Ø^šY[™H	Ó^XÛÛ‰ËÜXÚX[^ž˜]H™[ÈÝš[\ÈHÚ\Ý[ZHH[[YÙ[ž˜H\YšXÚX[K[[™H[\[Y[\™H[˜HZ\Ý\˜HÝ]\˜]HH]™[È^šY[™[H\ˆY[YšXØ\™K]X[YšXØ\™HHÛ\ÜÚYšXØ\™HÚ\Ý[X]XØ[Y[H]HHÝ[žšX[Hš\ØÚH[™›Ü›X]XÚHYØ]H[HÛÛœÙ\˜^š[Û™HZH]HZH[Ù[HH[™ÝXYÙÚ[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HZ\Ý\™H˜\™\Ù[H[ˆ\Ù[\[ÈHÛÛ›ÛÈHÚXÝ\™^ž˜HÙ\Ý[Û˜[H
X[˜YÙ\šX[JHY]È\ˆ˜YÙÚ][™Ù\™H]Y\ÝÈØšY]]›ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÝX\™YHHÚXÝ\™^ž˜H
ÙXÝ\š]HÝX\™ÊH‹ˆŠHÚ\Ý[XHHš[]˜[Y[È[H[\Ú[ÛšH
[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[JH‹ˆÊHš\™]Ø[H™]HÙ[˜[^ž˜]È‹ˆ‘
H˜[]^š[ÛšH[š\ØÚ[È
š\ÚÈ\ÜÙ\ÜÛY[ÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H˜[]^š[ÛšH[š\ØÚ[È
š\ÚÈ\ÜÙ\ÜÛY[ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š”š\ÚÈ\ÜÙ\ÜÛY[ÊŠˆ
˜[]^š[ÛšH[š\ØÚ[ÊHÛÜÝ]Z\ØÛÛ›È[ˆÛ\ÜÚXÛÈÛÛ›ÛÈHÚXÝ\™^ž˜HÙ\Ý[Û˜[H
È[[Z[š\Ý˜]]›ÊKˆ\ÜÚHYš[š\ØÛÛ›ÈH›ØÙ\ÜÚKHÛ]XÚHHHY]ÙÛÙÚYH›Ü›X[H\›Ý˜]H[HÛÝ™\›˜[˜ÙH^šY[™[H\ˆ\Ø[Z[˜\™HH]X[YšXØ\™HHš\ØÚH[	ÛÜ™Ø[š^ž˜^š[Û™KÝZY[™ÈÛH[™\Ý[Y[HHHÛXÞHÙ[™\˜[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÝX\™YHHÚXÝ\™^ž˜JŠˆ˜\™\Ù[[›È[ˆÛÛ›ÛÈHÚXÝ\™^ž˜Hš\ÚXÛÈÚH›ÝYÙÙH	ØXØÙ\ÜÛÈX]\šX[HZHÙ\™\ˆH[HÝ]\™H^šY[™[K—ˆ
ˆ
ŠŠH[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[H
QÊJŠˆ0ê[ˆÛÛ›ÛÈHÚXÝ\™^ž˜HXÛšXÛÈ
ÈÙÚXÛÊH[\[Y[]È˜[Z]HÛÙØ\™HÈ\™Ø\™H\ˆš[]˜\™H˜Y™šXÛÈX[]›ÛÈÝ[H™]K—ˆ
ˆ
ŠÊHš\™]Ø[
Šˆ0ê[ˆ[›ÈÛÛ›ÛÈHÚXÝ\™^ž˜HXÛšXÛÈYXš]È[š[˜YÙÚ[È[˜Y™šXÛÈH™]HÝ[H˜\ÙHH™YÛÛH™YYš[š]K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆš[XHH[˜ÚX\™H[ˆ[Ý›È[Ù[ÈH[[YÙ[ž˜H\YšXÚX[HÙ[™\˜]]˜KH^XÛÛˆÛÛ™XÙH[ˆš\ÚÈ\ÜÙ\ÜÛY[›Ü›X[H\ˆX\\™HH™]ÜšHH]XØÛÈH›Û\[š™XÝ[ÛˆH˜[]\™H[š\ØÚ[ÈHYØHZH\ÚH[[Ù[ËÝ[X[™È	Ú[\]È™\]^š[Û˜[H[ˆØ\ÛÈHš[Û^š[Û™Kˆ‚ˆKˆÂˆYˆM‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ][HXÚYHH™[›Ý\™H[ˆ\[[Y[ÈÛ›[™H\ˆ[ˆYÛ[ÈHØ\[HÝ[Ú]ÈÙXˆ[Ø[Û™H	ÑYH^H\›[™ÉËˆ]X[™ÈÛÛ\[H[[Ù[ÈÛÛˆH›ÜšH]H\œÛÛ˜[K]Y\ÝH™[™ÛÛ›È˜\ÛY\ÜÚH[]X˜\ÙH^šY[™[HÚXÝ\›ÈH[[YYX][Y[H\ÜÛØÚX]HH[˜HÝš[™ØHHØ\˜]\šHØ\ÝX[HH›ÛˆÙ[œÚXš[H
[›ÛZ[˜]HÚÙ[ŠHÚHÛÜÝ]Z\ØÙHH]H™X[Kˆ[\œÛÛ˜[H[Ø[Û™Hš\ÝX[^ž™\°èÛÛÈ]Y\ÝÈY[YšXØ]]›Èš]^š[È\ˆÙ\Ý\™HH™[›Ý^š[ÛšKšYXÙ[™È	Ù\ÜÜÚ^š[Û™HZH]HZHÛY[H[ˆØ\ÛÈHœ™XØÚXH[™›Ü›X]XØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HY]ÙÈHØØÝ[[Y[ÈH›Ý^š[Û™HZH]HÙ[œÚXš[HÝH[\YYØ[™È[Ú]ÈÙXˆ	ÑYH^H\›[™ÉÏÈ‹ˆÜ[ÛœÎˆÂˆJHÝYØ[›ÙÜ˜\H
ÝYØ[›ÙÜ˜YšXJH‹ˆŠH[˜Üž\[Ûˆ
Üš]ÙÜ˜YšXJH‹ˆÊHÚÙ[š^˜][Ûˆ
ÚÙ[š^ž˜^š[Û™JH‹ˆ‘
H]HX\ÚÚ[™È
X\ØÚ\˜[Y[ÈZH]JH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÚÙ[š^˜][Ûˆ
ÚÙ[š^ž˜^š[Û™JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š•ÚÙ[š^ž˜^š[Û™JŠˆ
ÚÙ[š^˜][ÛŠHÛÛœÚ\ÝH™[ÛÜÝ]Z\™H[ˆ]ÈÙ[œÚXš[H
ÛÛYH]H\œÛÛ˜[HÈš[˜[žšX\šJHÛÛˆ[ˆ\]Z]˜[[H›ÛˆÙ[œÚXš[HÚX[X]È	ÝÚÙ[‰Ëˆ[]ÈÙ[œÚXš[HÜšYÚ[˜[HšY[™Hš[[ÜÜÛÈ[Ú\Ý[XHHY[[Üš^ž˜]ÈÙ\\˜][Y[H[ˆ[ˆ]X˜\ÙHÚXÝ\›ÈÙ[˜[^ž˜]È
[	ÝÚÙ[ˆ˜][	ÊKY[™H™[Ú\Ý[XHÜ\˜]]›ÈØØ[HšY[™H][^ž˜]È\ØÛ\Ú]˜[Y[H[ÚÙ[ˆš]›ÈH˜[Ü™H]]Û›Û[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÝYØ[›ÙÜ˜\H
ÝYØ[›ÙÜ˜YšXJJŠˆÛÛœÚ\ÝH™[˜\ØÛÛ™\™H	Ù\Ú\Ý[ž˜HÝ\ÜØHH[ˆY\ÜØYÙÚ[ÈÈH[ˆš[HØØÝ[[™ÛÈ[	Ú[\››ÈH[ˆ[›Èš[H›ÛˆÛÜÜ]È
\Ëˆ\ÝÈ˜\ØÛÜÝÈ™ZH^[H[‰Ú[[XYÚ[™JK—ˆ
ˆ
ŠŠH[˜Üž\[Ûˆ
Üš]ÙÜ˜YšXJJŠˆ˜\Ù›Ü›XHX][X]XØ[Y[H[ˆ\ÝÈ[ˆÚX\›È[ˆ[ˆ\ÝÈÚYœ˜]ÈYÙÚXš[HÛÛÈHÚHÜÜÚYYHHÛÜœ™]HÚX]™HHXÚYœ˜^š[Û™KXH›Ûˆ™]™YHHÛÜÝ]^š[Û™HÚ\Ý[X]XØH[]ÈÛÛˆ[ˆÚÙ[ˆ™YÚ\Ý˜]È[ˆ[ˆ\˜Ú]š[È\Ý\››Ë—ˆ
ˆ
Š‘
H]HX\ÚÚ[™È
X\ØÚ\˜[Y[ÈZH]JJŠˆÛÛœÚ\ÝH™[˜\ØÛÛ™\™H\žšX[Y[HÜžš[ÛšH[]È\ˆØÛÜHHš\ÝX[^ž˜^š[Û™H
\Ëˆ[ÜÝ˜\™H[˜HØ\HHÜ™Y]ÈÛÛYH
ŠŠŠ‹JŠŠŠ‹JŠŠŠ‹LLŒÍ
KXH[˜[Ü™HÜšYÚ[˜[Hš[X[™HÛÛ][œ]YHY[[Üš^ž˜]È[	Ú[\››È[ÈÝ\ÜÛÈ]X˜\ÙH\XØ]]›Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ]X[™È[œÙ\š\ØÚHHØ\HHÜ™Y]ÈÝH[‰Ø\H˜\ÜÜK[[Y\›È™X[HšY[™HY[[Üš^ž˜]È[ˆ[˜HØ\ÜØY›ÜHYÚ][HÙ\YšXØ]H
˜][
HHÛÜÝ]Z]È™[	Ø\XØ^š[Û™HØØ[HÛÛˆ[ˆÚÙ[ˆØ\ÝX[H[š]›ØÛËˆ	Ø\\ØHÛÛÈ[ÚÙ[ˆ\ˆYXš]\™HHÛÜœÙKšYXÙ[™È	Ù\ÜÜÚ^š[Û™H[ˆØ\ÛÈHœ™XØÚXH[™›Ü›X]XØKˆ‚ˆKˆÂˆYˆMËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ[[Z[š\Ý˜]Ü™HH™]H]™H[\[Y[\™H[\Ü˜[™X[Y[H[ˆÙ\YšXØ]ÈÔÓÕÈ\ˆ[ˆÙ\™\ˆÙXˆ[\››È][^ž˜]È\ØÛ\Ú]˜[Y[H\ˆÛÛ™\œ™HZH\ÝXYÛ›ÜÝXÚHH\H[X[HHÝš[\ÈÛÙØ\™KˆÚXÚ0êH[Ú\Ý[XH›Ûˆ0ê\ÜÜÝÈH][H\Ý\›šHH	Ø^šY[™H\ÚY\˜H]š]\™HHÛÜÝHYØ]H[HÐHÛÛ[Y\˜ÚX[K	Ø[[Z[š\Ý˜]Ü™HXÚYHHš\›X\™H[Ù\YšXØ]ÈÛÛˆHÚX]™Hš]˜]H[Ù\YšXØ]ÈÝ\ÜÛËÙ[ž˜HÛÚ[›ÛÙ\™H[Ý[˜H]]Üš]0èHÙ\YšXØ^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÛÙÚXHHÙ\YšXØ]ÈšY[™H[Y\ÜØHY]]Ùš\›X]HH[‰Ù[]0è\ˆ\ÛÈØØ[OÈ‹ˆÜ[ÛœÎˆÂˆJH^[™Y˜[Y][ÛˆÙ\YšXØ]H
Ù\YšXØ]ÈH˜[Y^š[Û™H\Ý\ØJH‹ˆŠHÙ[‹\ÚYÛ™YÙ\YšXØ]H
Ù\YšXØ]È]]Ùš\›X]ÊH‹ˆÊHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
H‹ˆ‘
H›ÛÝÙ\YšXØ]H
Ù\YšXØ]È˜YXÙJH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÙ[‹\ÚYÛ™YÙ\YšXØ]H
Ù\YšXØ]È]]Ùš\›X]ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜Ù\YšXØ]È]]Ùš\›X]ÊŠˆ
Ù[‹\ÚYÛ™YÙ\YšXØ]JH0ê[ˆÙ\YšXØ]ÈYÚ][Hš\›X]È\™][Y[H[ÛÙÙÙ]ÈÜ™X]Ü™HÚHÈÜÜÚYYKÙ[ž˜H\ÜØ\™H]˜]™\œÛÈ[˜HÙ\YšXØ]H]]Üš]H
ÐJHšY]HH\ž™H\KˆÙX˜™[™H›Ü›š\ØØHHÚYœ˜]\˜HZHØ[˜[K›ÛˆÜÜÚYYH[Ý[˜H][™Xš[]0è˜]]˜H™ZHœ›ÝÜÙ\ˆZHÛÛ\]\ˆ\Ý\›šKH]X[H[ÜÝ™\˜[››È[ˆ\œ›Ü™HHÚXÝ\™^ž˜Kˆ0âYX[H\ˆ[XšY[HÚ]\ÚHHÝš[\ÈH\Ý—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH^[™Y˜[Y][ÛˆÙ\YšXØ]H
UŠJŠˆ0ê[ˆÙ\YšXØ]ÈÛÛ[Y\˜ÚX[HY[\ÜÚ[XHY™šYXš[]0èX˜›XØHÚHšXÚYYHÙ]™\šHHšYÛÜ›ÜÚHÛÛ›ÛHYØ[HÝ[	ÚY[]0è[	Ø^šY[™HH\H[HÐH[Z][K—ˆ
ˆ
ŠÊHÔÔˆ
šXÚY\ÝHHš\›XH[Ù\YšXØ]ÊJŠˆ0ê[šXØ[Y[H[š[H[šX]È\ˆšXÚYY\™HHš\›XHH[ˆÙ\YšXØ]Ë›ÛˆÛÜÝ]Z\ØÙH[ˆÙ\YšXØ]Èš[š]ÈÜ\˜Xš[HÝ[Ù\™\‹—ˆ
ˆ
Š‘
H›ÛÝÙ\YšXØ]H
Ù\YšXØ]È˜YXÙJNŠŠˆ0ê[\Ý˜]Ü™HÚHšXÚYYH][žš[Û™K\˜Ú0êH[˜ÚH[ˆÙ\YšXØ]È˜YXÙH
Š°ê]]Ùš\›X]ÊŠˆ8 %HÐHÈš\›XHÛÛˆH›ÜšXHÚX]™KˆXH›Ûˆ0ê[ˆÙ\YšXØ]È
Š™HÙ\š^š[ÊŠŽˆ›ÛˆÚH[œÝ[HÝH[ˆÙ\™\ˆÙXˆ\ˆÚYœ˜\›™H[˜Y™šXÛË™[œðëÛÜÝ]Z\ØÙH	ÊŠ˜[˜ÛÜ˜HHšYXÚXJŠˆH[˜HÒK\ÝšXZ]HYÛH\˜Ú]šH˜YXÙHZHÛY[\ˆš\›X\™H]HHÙ\YšXØ]HÝX›Ü™[˜]KˆÈØÙ[˜\š[ÈÚYYH[ˆÙ\YšXØ]È
Š™HY]\™HÝH[ˆÙ\™\ˆH\Ý
Š‹›ÛˆH˜YXÙHH[˜HÙ\˜\˜ÚXK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ0ªØ]]Ùš\›X]ð®È\ØÜš]™H
Š˜ÛÛYJŠˆ[Ù\YšXØ]È0êÝ]Èš\›X]Ë›Ûˆ
Š˜HÚHÛÜØHÙ\™JŠ‹ˆÛÛ›È]]Ùš\›X]HÚXH[Ù\YšXØ]È[Ù\™\ˆHX›Ü˜]Üš[ÈÚXHH˜YXÙHHÙÛšHÐH[[Û™Ëˆ]X[™ÈHÛX[™H\›HH[ˆÙ\š^š[È[\››ËH\ÝHH]š]\™HHÛÜÝHH[˜HÐHX˜›XØKHš\ÜÜÝH0ê
ŠœÙ[‹\ÚYÛ™YÙ\YšXØ]JŠŽÈ]X[™È\›H[	Ø[˜ÛÜ˜HHšYXÚXH\ÝšXZ]HZHÛY[0ê[
Šœ›ÛÝÙ\YšXØ]JŠ‹——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[›ÈÝš[\]Ü™HÛÛ™šYÝ\˜H[ˆÙ\™\ˆÙXˆØØ[HÎ‹ËÛØØ[ÜÝŽ\ˆ\Ý\™H[ˆ[Ù[ÈHYØ[Y[ËˆÚXÚ0êHÚH˜]HH[ˆ\Ý[\››ËÙ[™\˜H[ˆÙ\YšXØ]È]]Ùš\›X]Ëˆ[œ›ÝÜÙ\ˆ[ÜÝ™\°è[ˆ]š\ÛÈHÚXÝ\™^ž˜H
ÚHšY[™HYÛ›Ü˜]È›ØÙY[™ÈÛ™JKXH[Ø[˜[HHÛÛ][šXØ^š[Û™Hš[X\œ°èÚYœ˜]ÈHÚXÝ\›Ëˆ‚ˆKˆÂˆYˆMˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[ÎˆØ\›ÜÈšY[™H\ÜÝ[ÈÛÛYHÛÛœÝ[[HHÞX™\œÙXÝ\š]H\Ý\››È™\ÜÛÈ[Ûˆ˜Z[š[™ÈÛÛ][ÛœÈÛÛˆ	Ú[˜Ø\šXÛÈH[™]šYX\™HHX\\™HH˜[HHH[™\˜Xš[]0è[	Ú[™œ˜\Ý]\˜H[]HÙ[\‹ˆØ\›ÜÈšXÚYYH›Ü›X[Y[H[ˆXYÜ˜[[XHYÙÚ[Ü›˜]È[	Ø\˜Ú]]\˜HH™]HHZHÙ\™\ˆš\ÚXÚKXH[X[HHÝ\ÜÈXÛšXÛÈÛH›Ü›š\ØÙH[˜H[š[Y]šXHš\Ø[[HHpîHH[ˆ[››Èš[XKˆ‹ˆ]Y\Ý[ÛŽˆ”\˜Ú0êH	Ý][^ž›ÈH]Y\ÝÈ™XØÚ[ÈXYÜ˜[[XH\˜Ú]]\˜[H0êÝ[žšX[Y[H›Ø›[X]XÛÈ\ˆ[ÛÛ\]È\ÜÙYÛ˜]ÈHØ\›ÜÏÈ‹ˆÜ[ÛœÎˆÂˆJHÝ™X˜™H›ÛˆšY›]\™HHÜÛÙÚXHHHÙ\™\ˆ]X[KÜ[™ÈH˜\ØÝ\˜\™H[H[™\˜Xš[]0èÜš]XÚH[›ÙÝHH™XÙ[Kˆ‹ˆŠH[ÜÝ™\™X˜™H[ˆ[Y\›ÈXØÙ\ÜÚ]›ÈH]YÛHXÛšXÚHÛÛ\\ÜÚHH[™\ÚY\˜]HÚHÝ™X˜™\›ÈÛÛ™›Û™\™HØ\›ÜËˆ‹ˆÊHÛÛ\œ™X˜™H[ˆ[[˜ÛÈ›ÛˆYÙÚ[Ü›˜]ÈH[\YYØ]HÛÛˆH™[]]šH\›Y\ÜÚHHXØÙ\ÜÛÈš\ÚXÛÈ[]HÙ[\‹ˆ‹ˆ‘
H[ÜÝ™\™X˜™H\ØÛ\Ú]˜[Y[HH™XØÚHX[šHH\Ü[œÚ[Û™H^šY[™[H\›Ý˜]H	Ø[››ÈØÛÜœÛËˆ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÝ™X˜™H›ÛˆšY›]\™HHÜÛÙÚXHHHÙ\™\ˆ]X[KÜ[™ÈH˜\ØÝ\˜\™H[H[™\˜Xš[]0èÜš]XÚH[›ÙÝHH™XÙ[KŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH[™œ˜\Ý]\™HZH]HÙ[\ˆÛÛ›È\Ý™[X[Y[H[˜[ZXÚNÈ™[	Ø\˜ÛÈH[ˆ[››È™[™ÛÛ›È™YÛÛ\›Y[H[œÝ[]H[ÝšHÙ\™\‹\\H[Ý™HÜHÝ[š\™]Ø[H[ÙYšXØ]HH›\ÜÚHH[œÝ˜Y[Y[ËˆÛÛ™\œ™H[˜H˜[]^š[Û™H[H[™\˜Xš[]0è˜\Ø[™ÜÚHÝH[ˆXYÜ˜[[XHØœÛÛ]È[™\œ°èØ\›ÜÈHYÛ›Ü˜\™HH™\Ù[ž˜HH[ÝšHÜÝÈ[ÙYšXÚH[H™]HÚHÝ™X˜™\›ÈÜÜ]\™H˜[HÜš]XÚHH˜[H›ÛˆÙ[œÚ]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ÜÝ™\™X˜™H[ˆ[Y\›ÈXØÙ\ÜÚ]›ÈH]YÛHXÛšXÚJŠˆ›Ûˆ0êÛÜœ™]H\˜Ú0êHØ\›ÜË[ˆ]X[]0èH\Ü\ÈHÚXÝ\™^ž˜K™XÙ\ÜÚ]H›Üš[ÈH]HH]YÛHXÛšXÚHÜÜÚXš[H[	Ø\˜Ú]]\˜H\ˆÝ\›H[˜[^ž˜\™HXØÝ\˜][Y[K—ˆ
ˆ
ŠÊHÛÛ\œ™X˜™H[ˆ[[˜ÛÈ›ÛˆYÙÚ[Ü›˜]ÈH[\YYØ]JŠˆ›Ûˆ0êÛÜœ™]HÚXÚ0êHHXYÜ˜[[ZH[	Ø\˜Ú]]\˜HH™]H\ØÜš]›Û›È\ÜÜÚ]]šK›ÝØÛÛHHÜÛÙÚYHH[\˜ÛÛ›™\ÜÚ[Û™Hš\ÚXØKÛÙÚXØK›ÛˆH™XÛÜ™HH[˜YÜ˜YšXÚH[\œÛÛ˜[K—ˆ
ˆ
Š‘
H[ÜÝ™\™X˜™H\ØÛ\Ú]˜[Y[HH™XØÚHX[šHH\Ü[œÚ[Û™JŠˆ›Ûˆ0êÛÜœ™]H[ˆ]X[È[XYÜ˜[[XH\ØÜš]™HÈÝ]È[	Ú[™œ˜\Ý]\˜H]]˜H[\ÜØ]Ë›ÛˆHX[šHHÝš[\È]\šHÛÛ[Y\˜ÚX[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ\˜[H[‰Ú\Ü^š[Û™HHÚXÝ\™^ž˜K[ˆ]Y]Üˆš[]˜H[˜H[™\˜Xš[]0è‘Üš]XØHÝH[ˆÙ\™\ˆHÝYÚ[™Ëˆ]Y\ÝÈÜXÚYšXÛÈÙ\™\ˆ\˜HÝ]È[›ÙÝÈ™HY\ÚHš[XH\ˆ[ˆ\Ý[ÝH[™\\ÈX\šÙ][™ËXH\˜H\ÜÙ[H[	Ø\˜Ú]]\˜HH™]Hš\Ø[[HH[ˆ[››Èš[XH›Ü›š]H[	Ø]Y]Ü‹ˆ‚ˆKˆÂˆYˆMKˆÜXÎˆ‘XÙ\[ÛˆXÚ›ÛÙÚY\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“™]š[K[ˆ[™ÙYÛ™\™HHÚXÝ\™^ž˜H\Ü\ËÝYÙÙ\š\ØÙH[X[˜YÙ[Y[HÜ™X\™HHÜÚ^š[Û˜\™H[	Ú[\››ÈH[˜HØ\[HHÛÛ™]š\Ú[Û™HH™]H[ÛÈ[ˆš\ÝH[ˆØÝ[Y[Èš]^š[È[]Û]È	Ü\ÜÝÛÜ™Ø[[Z[š\Ý˜^š[Û™KžÞ	Ëˆ[ØÝ[Y[ÈÛÛY[™HÜ™Y[žšX[H˜[ÙH\ÜÚ][Y[H›ÙÙ]]H\ˆ˜\ˆØØ]\™H[ˆ[\›YHH[\Ú[Û™H[[YYX]È]X[Ü˜H[ˆ]XØØ[HXÚYHH\š\›ÈÈÛÜX\›Ëˆ‹ˆ]Y\Ý[ÛŽˆÚH\ÛÙÚXHHš\ÛÜœØH\ØØHHÝYÙÙ\š]ÈHÜ™X\™H™]š[OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ™^[™]‹ˆŠHÛ™^\Ý‹ˆÊHÛ™^]ÚÙ[ˆ‹ˆ‘
HÛ™^Yš[H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛ™^Yš[JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š’Û™^Yš[JŠˆ0ê[ˆš[HÈ[ˆØÝ[Y[ÈÚ]™]H\ÜÚ][Y[H[œÙ\š]È[	Ú[\››ÈZHÚ\Ý[ZH^šY[™[H\ˆ]\˜\™H	Ø][žš[Û™HHÜÜÚXš[H[\ÚHÈ]XØØ[H[™›Ü›X]XÚKˆÚXÚ0êH™\ÜÝ[ˆ][HÈ›ØÙ\ÜÛÈYÚ][[ÈH[Ý]šHÜ\˜]]šH\ˆXØÙY\™HH]Y\ÝÈš[K]X[ÚX\ÚH[]]›ÈH]\˜KÛÜXHÈ[ÙYšXØHÙ[™\˜H[	Ú\Ý[H[˜HÙYÛ˜[^š[Û™HHÚXÝ\™^ž˜HY[\ÜÚ[XHš[Üš]0è—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÛ™^[™]
Šˆ0ê[‰Ú[\˜H™]H\ØØHš]^šXHÛÛ[™[H[Û\XÚHÜÝHÚ\Ý[ZHÚ[][]H\ˆÛÛ™›Û™\™HHÝYX\™HÛH]XØØ[H™[[\Ë—ˆ
ˆ
ŠŠHÛ™^\Ý
Šˆ0ê[ˆÚ[™ÛÛÈÜÝÛÛ\]\ˆÈÙ\š^š[ÈÚ]™]HÛÛ›™\ÜÛÈ[ˆ™]H\ˆ]\˜\™H]XØÚH]]šK—ˆ
ˆ
ŠÊHÛ™^]ÚÙ[ŠŠˆÚHšY™\š\ØÙHH™XÛÜ™Èœ˜[[Y[HH]HÜXÚYšXÚHY\ØØH
\Ëˆ[ˆ™XÛÜ™ÔS˜\Ý[ÈÈ[ˆ[™\š^ž›È[XZ[Ú]™]H\ˆš[]˜\™HÜ[JH]]ÜÝÈÚHH[ˆ[\›Èš[HÝ]\˜]ÈY[[Üš^ž˜]ÈÝ[š[\Þ\Ý[HÛÛYH[ˆ]Y\ÝÈØÙ[˜\š[Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ[[Z[š\Ý˜]Ü™HH™]H[œÙ\š\ØÙH[ˆ›ÙÛ[È[]›ÛšXÛÈ[›ÛZ[˜]ÈÝ\[™WÙ\šYÙ[WÌŒ‹žÞ[ˆ[˜HØ\[HÛÛ™]š\ØH\\Kˆ[š[HÛÛY[™H]Hš]^šHXH0ê›Ý]ÈH[ˆÙ[œÛÜ™HÛÙØ\™NÈÙH[ˆ\[™[HÝ\š[ÜÛÈÈ[ˆXÚÙ\ˆÈ\™KØØ]H[˜H›ÝYšXØH[[YYX]H[X[HÓÐËˆ‚ˆKˆÂˆYˆM‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H\ÝšXZ\ØÙHZH›ÜšHÛY[H[ˆYÙÚ[Ü›˜[Y[Èš\›]Ø\™HØØ\šXØXš[H[Ú]ÈÙX‹ˆ[™\]Z\Ú]È0ê\XÙNˆ[ÛY[H]™HÝ\ˆ™\šYšXØ\™HÚH[š[H›Ý™[™ØH]™\›È[	Ø^šY[™HHÚH™\ÜÝ[›ÈÈX˜šXH[\˜]ÈÜÈHX˜›XØ^š[Û™Kˆ	Ø^šY[™H›Ûˆ[ÛH\°ìˆÚH[ÛÛ[]È[š\›]Ø\™HÚXHÙYÜ™]Îˆ]™H™\Ý\™HYÙÚXš[HH[œÝ[Xš[HHÚ][œ]YKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HYXØØ[š\Û[ÈÜš]ÙÜ˜YšXÛÈÛÙ\Ù˜H\Ø][Y[H]Y\ÝH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJHÚYœ˜]\˜HÚ[[Y]šXØH[š[HÛÛˆQTËLMˆHÚX]™H\ÝšXZ]HZHÛY[H‹ˆŠHš\›XHYÚ][Nˆ[š[Hš\›X]ÈÛÛˆHÚX]™Hš]˜]H[	Ø^šY[™H‹ˆÊH\ÚÒKLMˆ[š[HX˜›XØ]ÈXØØ[È[ÝÛ›ØYÝ[HÝ\ÜØHYÚ[˜H‹ˆ‘
HÚYœ˜]\˜H[š[HÛÛˆHÚX]™HX˜›XØHHÚX\ØÝ[ˆÛY[H™YÚ\Ý˜]È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHš\›XHYÚ][JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHš\›XHYÚ][H›Ü›š\ØÙH
Š˜]][XÚ]0è
Š‹
Šš[YÜš]0è
ŠˆH
Š››Û‹\š\Y[ÊŠˆÙ[ž˜H™[™\™HÙYÜ™]È[ÛÛ[]Ëˆ	Ø^šY[™HØ[ÛÛH	Ú\Ú[š\›]Ø\™HH›ÙXÙH[˜H
Š™š\›XJŠˆÛÛˆH›ÜšXH
Š˜ÚX]™Hš]˜]JŠŽÈÚ][œ]YHpìˆ
Š™\šYšXØ\™JŠˆ]Y[Hš\›XHÛÛˆH
Š˜ÚX]™HX˜›XØJŠˆ[	Ø^šY[™KšXØ[ÛÛ[™È	Ú\Ú[š[HØØ\šXØ]ÈHÛÛ™œ›Û\™HHYH˜[ÜšKˆÙHÛÚ[˜ÚYÛ›Ë[š[H0ê]][XÛÈH[YÜ›Ëˆ[š\›]Ø\™H[ˆðê™\ÝH[ˆÚX\›Ë\Ø][Y[HÛÛYHšXÚY\ÝË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJJŠˆHÚYœ˜]\˜HÚ[[Y]šXØH™[™\™X˜™H[š[H
ŠœÙYÜ™]ÊŠ‹ÚH0ê	ÛÜÜÝÈ[™\]Z\Ú]ÎÈ[›Û™H[˜HÚX]™HÛÛ™]š\ØHÛÛˆ]HHÛY[H›Ûˆ0êpîH[ˆÙYÜ™]ÈH›Ûˆ›Ý˜H[HÝ[	ÛÜšYÚ[™K\˜Ú0êHÚ][œ]YHHÜÜÚYYHpìˆÚYœ˜\™HH›ÛYH[	Ø^šY[™K—ˆ
ˆ
ŠÊJŠˆ[ˆ\ÚX˜›XØ]ÈXØØ[È[ÝÛ›ØYØ\˜[\ØÙH	Ú[YÜš]0èÛÛÈÙH	Ø]XØØ[H›Ûˆpìˆ[ÙYšXØ\™HHYÚ[˜KˆXHÚHšY\ØÙHHÛÜÝ]Z\™H[š[HÛÜÝ]Z\ØÙH[˜ÚH	Ú\ÚˆÙ[ž˜H[˜HÚX]™Hš]˜]HH›ÝYÙÙ\›Ë	Ú\ÚHÛÛÈ›Ûˆ›Ý˜H
Š˜ÚJŠˆHX˜›XØ]È[š[K—ˆ
ˆ
Š‘
JŠˆÚYœ˜\™HÛÛˆHÚX]™HX˜›XØHHÙÛšHÛY[HØ\˜[\™X˜™HHš\Ù\˜]^ž˜H™\œÛÈ]Y[Ú[™ÛÛÈÛY[KØ\™X˜™H[™Ù\ÝXš[HÝH\™ØHØØ[HH›Ûˆ\™X˜™HÛÛ][œ]YH[HÝ[	Ø]][XÚ]0è[Z][K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HH™YÛÛH[HÚX]šKˆ\ˆH
Šœš\Ù\˜]^ž˜JŠˆÚHÚYœ˜HÛÛˆHÚX]™H
ŠœX˜›XØH[\Ý[˜]\š[ÊŠŽÈ\ˆ
Š™š\›X\™JŠˆÚH\ØHHÚX]™H
Šœš]˜]H[Z][JŠ‹ˆÙHÈØÙ[˜\š[ÈÚYYHH›Ý˜\™H
˜ÚHH›ÙÝÊˆ[ˆš[KHš\ÜÜÝH0êÙ[\™HHš\›XHYÚ][NÈÙHÚYYHH™[™\›È
š[YÙÚXš[J‹0êHÚYœ˜]\˜Kˆ‚ˆKˆÂˆYˆMËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆÛY[H\Ý\››È\ÚY\˜H˜\ÛY]\™H[ˆÜ™[™HÙ[œÚXš[H[[Y[HÛÛ™šY[žšX[H[HÙYHÙ[˜[HH	Ñ[Ûˆ˜Z[š[™ÉÈ][^ž˜[™ÈHÜš]ÙÜ˜YšXH\Ú[[Y]šXØKØ\˜[[™ÈÚHÛÛÈHÛÛ[È[Ûˆ˜Z[š[™ÈÚXH[ˆÜ˜YÈHXÚYœ˜\™HHYÙÙ\™H[ÛÛ[]È[Y\ÜØYÙÚ[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÚX]™HÜš]ÙÜ˜YšXØH]™H][^ž˜\™H[ÛY[\ˆÚYœ˜\™H[Y\ÜØYÙÚ[È[ˆ[ÙÈHØ\˜[\›™HHX\ÜÚ[XHš\Ù\˜]^ž˜OÈ‹ˆÜ[ÛœÎˆÂˆJHHÚX]™HX˜›XØHH[Ûˆ˜Z[š[™È
X›XÈÙ^JH‹ˆŠHHÚX]™Hš]˜]H[ÛY[
š]˜]HÙ^JH‹ˆÊHHÚX]™HH\ØÜ›ÝÈ
Ù^H\ØÜ›ÝÊH‹ˆ‘
H[Ù\YšXØ]ÈÚ[Ø\™
Ú[Ø\™Ù\YšXØ]JH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHHÚX]™HX˜›XØHH[Ûˆ˜Z[š[™È
X›XÈÙ^JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[HÜš]ÙÜ˜YšXH\Ú[[Y]šXØK\ˆØ\˜[\™HH
Šœš\Ù\˜]^ž˜JŠˆ
ÛÛ™šY[X[]JHH[˜HÛÛ][šXØ^š[Û™K[Z][H]™HÙ[\™HÚYœ˜\™H[Y\ÜØYÙÚ[È][^ž˜[™ÈH
Š˜ÚX]™HX˜›XØH[\Ý[˜]\š[ÊŠˆ
[ˆ]Y\ÝÈØ\ÛÈH[Ûˆ˜Z[š[™ÊKˆÚXÚ0êH[ˆY\ÜØYÙÚ[ÈÚYœ˜]ÈÛÛˆHÚX]™HX˜›XØHpìˆ\ÜÙ\™HXÚYœ˜]È\ØÛ\Ú]˜[Y[H˜[Z]HHÛÜœš\ÜÛ™[HÚX]™Hš]˜]HÙYÜ™]HHXØÛÜX]H[ˆ[ÙÈ[š]›ØÛËHÛÛÈ[Ûˆ˜Z[š[™ÈÜÜÚYYH[HÚX]™Hš]˜]K™\ÜÝ[ˆ[›ÈÝ°èXÚYœ˜\™H[Y\ÜØYÙÚ[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHHÚX]™Hš]˜]H[ÛY[
Šˆ›Ûˆ]™H\ÜÙ\™H][^ž˜]H\ˆÚYœ˜\™HÙH	ÛØšY]]›È0êHš\Ù\˜]^ž˜NˆÙH[ÛY[ÚYœ˜\ÜÙHÛÛˆH›ÜšXHÚX]™Hš]˜]KÚ][œ]YHÝ™X˜™HXÚYœ˜\›È\Ø[™ÈHÚX]™HX˜›XØH[ÛY[
ÚH0êHX˜›XÛÈÛZ[š[ÊKØ\˜[[™ÈÛÛÈ	Ø]][XÚ]0èH[›Û‹\š\Y[È
š\›XHYÚ][JHXH™\ÜÝ[˜Hš\Ù\˜]^ž˜K—ˆ
ˆ
ŠÊHHÚX]™HH\ØÜ›ÝÊŠˆ›Ûˆ0ê[˜HÚX]™HÜ\˜]]˜H][^ž˜]H™ZH›\ÜÚHHÚYœ˜]\˜H\™]K™[œðë[˜H›ØÙY\˜HH˜XÚÝ\\ˆHÚX]šHš]˜]K—ˆ
ˆ
Š‘
H[Ù\YšXØ]ÈÚ[Ø\™
ŠˆšY[™H[\YYØ]È\ˆ›ÝYÙÙ\™HÛZ[šHÙXˆHÛÛ›™\ÜÚ[ÛšHË›Ûˆ˜\™\Ù[HHÚX]™H\Ú[[Y]šXØH\ˆÚYœ˜\™H[ˆY\ÜØYÙÚ[ÈH\ÝË——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆÙH[XÙH[ÛH[šX\™H[›Üš[ÈPSˆ˜[˜Ø\š[ÈÛÛ™šY[žšX[HH[Ûˆ˜Z[š[™ËÈÚYœ˜H][^ž˜[™ÈHÚX]™HX˜›XØHH[Ûˆ˜Z[š[™ËˆÛÛÈ	ØXØØY[ZXK˜[Z]HHÝXHÚX]™Hš]˜]H\ØÛ\Ú]˜KÝ°èXÚYœ˜\™HHYÙÙ\™H[HPS‹ˆ‚ˆKˆÂˆYˆMˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰ÛÜ™Ø[š^ž˜^š[Û™HÛÝ™\›˜]]˜H[[™H[\[Y[\™H[ˆÚ\Ý[XHHÛÛ›ÛÈYÛHXØÙ\ÜÚH[[Y[H›\ÜÚXš[HH[˜[ZXÛÈÚHÜÜØH˜[]\™H[ˆ[\È™X[H[ÛÛ\Ü[Y[È[œÛÛ]ÈYÛH][H
\ËˆÜ˜\šHHÛÛ›™\ÜÚ[Û™H[›ÛX[HÈÜÜÝ[Y[HÙ[ÙÜ˜YšXÚH[\ÜÜÚXš[H™[[\ÊKšXÚYY[™È™\]Z\Ú]HH]][XØ^š[Û™HQHYÙÚ][]šHÈ›ØØØ[™È	ØXØÙ\ÜÛÈÙH[š\ØÚ[ÈØ[ÛÛ]ÈÝ\\˜HHÛÙÛXHÛÛœÙ[]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÛÛ^š[ÛšHHXÛ›ÛÙÚYHš\ÜÛ™HQQÓSÈH]Y\ÝH\ÚYÙ[ž˜OÈ‹ˆÜ[ÛœÎˆÂˆJHY[]0èY]]˜H
Y\]™HY[]JH‹ˆŠH›Û™HHÚXÝ\™^ž˜H
ÙXÝ\š]H›Û™\ÊH‹ˆÊHPPÈ
X[™]ÜžHXØÙ\ÜÈÛÛ›Û
H‹ˆ‘
HÛÛ›ÛÈYÛHXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞH
ÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHY[]0èY]]˜H
Y\]™HY[]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	ÊŠ’Y[]0èY]]˜JŠˆ
Y\]™HY[]JHÈ]][XØ^š[Û™H˜\Ø]HÝ[š\ØÚ[È\›Y]HH˜[]\™HÛÛ\ÝX[Y[H[Û\XÚH˜]ÜšH[ˆ[\È™X[H
ÛÛYHÙ[ÛØØ[^ž˜^š[Û™K\ÈH\ÜÜÚ]]›Ë]\›ˆÛÛ\Ü[Y[[H\ÜØ]KÜ˜\š[ÊH\ˆ]\›Z[˜\™H[˜[ZXØ[Y[H[]™[ÈHY™šYXš[]0èH[ˆÙÚ[‹Y][™ÈHšXÚY\ÝHH]][XØ^š[Û™H
\ËˆšXÚYY[™È[˜HÙXÛÛ™H™\šYšXØHQHÈšYš]][™ÈHÛÛ›™\ÜÚ[Û™H[ˆØ\ÛÈH[›ÛX[YJK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH›Û™HHÚXÝ\™^ž˜JŠˆÝY]šYÛ›ÈH™]Hš\ÚXØHÈÙÚXØH[ˆÙYÛY[H
\ËˆV‹SŠHXH›Ûˆ[˜[^ž˜[›È[ˆ[ÙÈ[˜[ZXÛÈHØ[XšX[Y[HÛÛ\Ü[Y[[HZHÚ[™ÛÛH][K—ˆ
ˆ
ŠÊHPPÈ
X[™]ÜžHXØÙ\ÜÈÛÛ›Û
JŠˆ0ê[ˆ[Ù[ÈHÛÛ›ÛÈXØÙ\ÜÚH\Ý™[X[Y[HšYÚYÈHÙ[˜[^ž˜]È˜\Ø]ÈÝH]XÚ]HHÛ\ÜÚYšXØ^š[ÛšHHÚXÝ\™^ž˜Hš\ÜÙK[]Èš]›ÈH›\ÜÚXš[]0èÈØ\XÚ]0èHY][Y[È]]ÛX]XÛÈ[ÛÛ\Ü[Y[Ë—ˆ
ˆ
Š‘
HÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
ŠˆYš[š\ØÙHHÛÛ›ÛHXØÙ\ÜÚH[ˆ˜\ÙHHÛ]XÚH^šY[™[H™Z[\ÜÝ]HÝ[ÛÛ›Û[™KXHHXÛ›ÛÙÚXHÜXÚYšXØH™\ÜÝHH[˜[^ž˜\™HHY]\œÚH[ˆ[\È™X[H[š\ØÚ[È	ÚY[]0èHÛÛ\Ü[Y[È[	Ý][H0ê	ÒY[]0èY]]˜K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ][HÚH]][XØHÛÛ][Y[HHZ[[›È[HNŒ\Ø[™È[Ý[È›ÝX›ÛÚÈ^šY[™[KˆÙHÈÝ\ÜÛÈ][H[H[ˆÙÚ[ˆHÚ[™Ø\Ü™H[HNŒMK	ÐY\]™HY[]Hš[]˜H[‰Ú[˜ÛÛ™ÜY[ž˜HÙ[ÙÜ˜YšXØH[\ÜÜÚXš[H™[[\ÈH›ØØØH[[]]›ËšXÚYY[™È[˜HÜXH™\šYšXØKˆ‚ˆKˆÂˆYˆMKˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆ”’PÓÔ‘È‹ˆØÙ[˜\š[Îˆ’[\\[Y[ÈHÚXÝ\™^ž˜Hš\ÚXØH[H	ÒÜš^›ÛˆXœÉÈ]™H›ÝYÙÙ\™H	Ú[™Ü™\ÜÛÈØ\œ˜Xš[Hš[˜Ú\[HH[\š[Y]›ÈÙ[œÚXš[H[]HÙ[\ˆÙ[˜[K[\Y[™Èš\ÚXØ[Y[HY]]ÈÈ™ZXÛÛHÜÝ[HY[H™[ØÚ]0èHÜ\›Û˜\™HÛH[™Ü™\ÜÚH™]˜]HÈH˜\œšY\™H\Ý\›™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZ\Ý\˜HHÚXÝ\™^ž˜Hš\ÚXØHÝ˜Y[H0êHpæHYÛ™XH\ˆ\œ™\Ý\™H™ZXÛÛH[ˆÛÜœØOÈ‹ˆÜ[ÛœÎˆÂˆJHÜÝÈH›ØØÛÈHÚXÝ\™^ž˜H
ÙXÝ\š]HÚXÚÜÚ[
H‹ˆŠHÚ\Ý[XHHš[]˜[Y[È[H[\Ú[ÛšH
[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[JH‹ˆÊH\ÜÝX\ÛÜšHÈ[]HÝ˜Y[H
›Û\™ÊH‹ˆ‘
H™XÚ[žš[Û™H[ˆš[ÈY][XÛÈ
Ú\™H™[˜Ú[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH\ÜÝX\ÛÜšHÈ[]HÝ˜Y[H
›Û\™ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š™\ÜÝX\ÛÜšJŠˆÝ˜Y[HÈ[]H

Š˜›Û\™ÊŠŠHÛÛ›È[\ÝšHÛÜHH›Ø\ÝH[ˆXØÚXZ[ÈÈÙ[Y[ËÛÛY[Y[H[˜ÛÜ˜]H[ÛÝÜÝ[ÛËÜÚ^š[Û˜]HÝ˜]YÚXØ[Y[H[	Ù\Ý\››ÈYÛHYYšXÚH\ˆ›ØØØ\™HH™\›X\™H	Ú[\]Èš\ÚXÛÈH™ZXÛÛHH\™ÛÛšK›ÝYÙÙ[™ÈHÝ]\™HHÜ\›Û˜[Y[HÈ[˜ÚY[H™ZXÛÛ\šHXØÚY[[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÜÝÈH›ØØÛÊŠˆ0ê[ˆ™\ÚY[È\ˆ	ÚY[YšXØ^š[Û™HHH™\šYšXØHZHÛÛ™XÙ[KXHH\ˆðêH›ÛˆÛÜÝ]Z\ØÙH[˜H˜\œšY\˜HY[H™\Ú\Ý[ž˜HYXØØ[šXØHÛÛ›ÈÛHÙ›Û™[Y[K—ˆ
ˆ
ŠŠHÚ\Ý[XHHš[]˜[Y[È[H[\Ú[ÛšJŠˆ0ê[ˆÛÛ›ÛÈÙÚXÛÈH™]HYÚ][K[š[™›Y[HÛÛ›È™]\™HHZ[˜XØÙHš\ÚXÚH\œ™\ÝšK—ˆ
ˆ
Š‘
H™XÚ[žš[Û™H[ˆš[ÈY][XÛÊŠˆ[[Z]HHÛÛ™š[šH^šY[™[HH˜[[HHYÛšKXH›ÛˆÜÜÚYYH[Ý[˜H™\Ú\Ý[ž˜H	Ø\œ™\ÝÈÛÛ›ÈHX\ÜØH	Ú[\]ÈH[ˆ]]ÛY^ž›Ë——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[	Ú[™Ü™\ÜÛÈØ\œ˜Xš[Hš[˜Ú\[HH[ˆ]HÙ[\ˆ˜[˜Ø\š[ÈÛÛ›È[œÝ[]H›Ø\ÝH[ÛšH	ØXØÚXZ[È[\œ˜]HH™HY]šKˆÙH[ˆ™ZXÛÛÈÜÝ[H[H[ˆ]XØÛÈÙ›Û™[™È[\š[Y]›ËH\ÜÝX\ÛÜšH\ÜÛÜ˜›Û›È	Ú[\]È\ÝYÙÙ[™È[Y^ž›ÈXH™\Ù\˜[™È[]È	ÙYYšXÚ[Ëˆ‚ˆKˆÂˆYˆMLˆÜXÎˆ‘XÙ\[ÛˆXÚ›ÛÙÚY\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÙXÝ\š]H[™Ú[™Y\ˆ›ÙÙ]H	Ú[œÙ\š[Y[ÈH[˜HXXØÚ[˜HÚ]™]H\\™[[Y[H[™\˜Xš[HHš]˜HH]Ú[	Ú[\››ÈH[˜HÛÝÜ™]H\ÛÛ]H[	Ø^šY[™K[ÈØÛÜÈHÝYX\™HHXÛšXÚHHXÚÚ[™È][^ž˜]HYÛHYÙÜ™\ÜÛÜšHHØ]\˜\™HÙÈ™^š[ÜÚHÙ[ž˜H\ÜÜœ™HHÙ\™\ˆ™X[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÜš[ÛšH\ØÜš]™HQQÓSÈH[žš[Û™Hš[X\šXHH[ˆÛ™^\Ý[ˆ[‰Ø\˜Ú]]\˜HH™]OÈ‹ˆÜ[ÛœÎˆÂˆJHš[]˜\™HH]šX\™HHÝ[žšX[H]XØØ[H
È]XÝ[™]™\Ý[X[]XÚÙ\œÊH‹ˆŠH›ØØØ\™H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈZHÙ\™\ˆ™X[H
È›ØÚÈ[˜]]Üš^™YXØÙ\ÜÊH‹ˆÊH™XÝ\\˜\™HH]H\œÚHHÙYÝZ]ÈH[ˆ]XØÛÈ˜[œÛÛ]Ø\™H
È™XÛÝ™\ˆÜÝ]JH‹ˆ‘
H™]™[š\™H	Ù\ÙXÝ^š[Û™H]]ÛX]XØHHÛÙØ\™HX[Ø\™H
È™]™[X[Ø\™Hœ›ÛH^XÝ][™ÊH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHš[]˜\™HH]šX\™HHÝ[žšX[H]XØØ[H
È]XÝ[™]™\Ý[X[]XÚÙ\œÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÈØÛÜÈ›Û™[Y[[HH[ˆ
ŠšÛ™^\Ý
Šˆ0ê[™Ù\™HH\ØØH\]Xš[H[	Ú[\››È[H™]H\ˆ]\˜\™HH]šX\™HH]]š]0èYÛHYÙÜ™\ÜÛÜšHÛ[›È[Hš\ÛÜœÙHH›Ù^š[Û™H™X[Kˆ]Y\ÝÈ\›Y]HZHX[HHÚXÝ\™^ž˜HHš[]˜\™HH[\Ú[ÛšH[\\Ý]˜[Y[HH˜XØÛÙÛY\™H[[Y]šXH]YÛX]HÝ[HXÛšXÚHHÝYÛHÝ[Y[H[	Ø]XØØ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH›ØØØ\™H	ØXØÙ\ÜÛÊŠˆ0ê[ÛÛ\]ÈZHÚ\Ý[ZHH™]™[žš[Û™H]]˜HHHš[˜YÙÚ[ËÛÛYHš\™]Ø[TÈÈQ‹Y[™H	ÚÛ™^\Ý[ÛÛ˜\š[È[š]H[X™\˜][Y[H[HÛÛ›™\ÜÚ[Û™K—ˆ
ˆ
ŠÊH™XÝ\\˜\™HH]JŠˆ0êH[žš[Û™H[H›ØÙY\™HH˜XÚÝ\H\Ø\Ý\ˆ™XÛÝ™\žK›Ûˆ[H\ØÚHH™]K—ˆ
ˆ
Š‘
H™]™[š\™H	Ù\ÙXÝ^š[Û™HHX[Ø\™JŠˆ0êÙ\Ý]ÈH[]š\\ËÛÙØ\™H[K[X[Ø\™HYQˆ˜[Z]Hš\›YHÈ[˜[\ÚHÛÛ\Ü[Y[[HØØ[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ™[\š[Y]›È^šY[™[HšY[™HÜÚ^š[Û˜]È[ˆÙ\™\ˆ\\™[[Y[H[™\˜Xš[HHØœÛÛ]ËÙ[ž˜H]HH˜[Ü™H™X[Kˆ]X[ÚX\ÚH[]]›ÈHØØ[œÚ[Û™HÈ^Ú]ÛÛ›È]Y\ÝHXXØÚ[˜H
Û™^\Ý
HÛÛœÙ[HHY[YšXØ\™HH\ÛÛ\™H[[YYX][Y[H	Ú[™\š^ž›ÈT[	Ø]XØØ[H™[HS‹ˆ‚ˆKˆÂˆYˆMLKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘\˜[H[ˆ]Y][ˆÛÛœÝ[[Hš[]˜HÚH[‰Ø\XØ^š[Û™H[\›˜H›ÝYÙÙHH]HÛÛˆQTÈXH\Ø[™ÈÚX]šHHLŽš]H›ÜÛ™HH\ÜØ\™HHMˆš]ˆ[™\ÜÛœØXš[HUØšY]HÚK\ÜÙ[™ÈÈÝ\ÜÛÈ[ÛÜš][ËHÚXÝ\™^ž˜H›ÛˆØ[XšXKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0ê	ÙY™™]È™X[H[	Ø][Y[È[H[™Ú^ž˜H[HÚX]™OÈ‹ˆÜ[ÛœÎˆÂˆJHHÚX]™HpîH[™ØHÚYœ˜H›ØØÚHH]HpîHÜ˜[™KšYXÙ[™È[[Y\›ÈHÜ\˜^š[ÛšHH]Z[™HHÝ\\™šXÚYH	Ø]XØÛÈ‹ˆŠH™\ÜÝ[›ÎˆH›Ø\Ý^ž˜H\[™HÛÛÈ[	Ø[ÛÜš][Ë]Z[™HQTËLLŽHQTËLMˆÛÛ›È\]Z]˜[[HÝ[X[›È[HÚXÝ\™^ž˜H‹ˆÊH˜YÜX[™ÈHš][HÚX]™HÈÜ^š[È[HÚX]šHÜ™\ØÙH[ˆ[ÙÈ\ÜÛ™[žšX[K™[™[™ÈHšXÙ\˜ØH\Ø]\Ý]˜H[˜ÛÛ\\˜Xš[Y[HpîHÛÜÝÜØH‹ˆ‘
HHÚX]™HpîH[™ØH™[™H	Ø[ÛÜš][È™\Ú\Ý[HYÛH]XØÚH[Ø[˜[H]\˜[HHYÛH\œ›ÜšHH[\[Y[^š[Û™H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH[™Ú^ž˜H[HÚX]™H]\›Z[˜HH[Y[œÚ[Û™H[È
ŠœÜ^š[È[HÚX]šJŠ‹Ú[ðê]X[HÚX]šH[ˆ]XØØ[HÝœ™X˜™H›Ý˜\™H[ˆ[˜HšXÙ\˜ØH\Ø]\Ý]˜KˆÙÛšHš]YÙÚ][È
Šœ˜YÜXJŠˆ]Y[ÈÜ^š[ÎˆQTËLLŽH—ŒLŽÚX]šHÜÜÚXš[KQTËLMˆ™HH—ŒM‹ˆ›Ûˆ0ê[Ü[Ë0ê[ˆ[Y\›È[˜ÛÛ[Y[œÝ\˜Xš[Y[HpîHÜ˜[™Kˆ0â]Y\ÝHH˜YÚ[Û™H\ˆÝZHQTËLMˆšY[™HšXÚY\ÝÈÝ™HÙ\™H[ˆX\™Ú[™HHÚXÝ\™^ž˜HH[™ÛÈ\›Z[™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆÛÛ™›Û™HYHÛÜÙH\Ý[Kˆ	Ø[ÛÜš][È]\›Z[˜H
˜ÛÛYJˆÚHÚYœ˜HHÙH\Ú\ÝÛ›ÈX›Û^ž™HÝ]\˜[NÈH[™Ú^ž˜H[HÚX]™H]\›Z[˜H
œ]X[ÊˆÛÜÝH›Ý˜\›H]KˆH\š]0èH[ÛÜš][ÈÛÛYË[˜HÚX]™HpîH[™ØH0ê™X[Y[HpîH›Ø\ÝHÛÛ›È[œ]KY›Ü˜ÙK—ˆ
ˆ
ŠJJŠˆ\œ›Ü™HXÛšXÛÎˆ[ˆQTÈH
Š™[Y[œÚ[Û™H[›ØØÛÈ™\ÝHLŽš]
Šˆ]X[[œ]YHÚXHH[™Ú^ž˜H[HÚX]™H
LŽNLˆÈMŠKˆØ[XšXH[[Y\›ÈH›Ý[™[\›šK›ÛˆH[Y[œÚ[Û™HZH›ØØÚH[X›Ü˜]K—ˆ
ˆ
Š‘
JŠˆÛH
Š˜]XØÚH[Ø[˜[H]\˜[JŠˆ
[˜[\ÚHZH[\KZHÛÛœÝ[ZH[]šXÚK[HØXÚJHYÙÚ\˜[›È[]ÈHX][X]XØNˆÙœ][›ÈY™]H[	Ú[\[Y[^š[Û™Hš\ÚXØKˆ[˜HÚX]™HpîH[™ØH›ÛˆÙ™œ™H[Ý[˜H›Ý^š[Û™HÛÛ›ÈH\ÜÚKÚHÚHÛÛ˜\Ý[›ÈÛÛˆ[\[Y[^š[ÛšHH[\ÈÛÜÝ[HH\™Ø\™HYXØ]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ›ÛˆÛÛ™›Û™\™H[™Ú^ž˜H[HÚX]™HH›Ø\Ý^ž˜H[	Ø[ÛÜš][Ëˆ[˜HÚX]™HHMˆš]ÝH[ˆ[ÛÜš][È›ÝÈ™\ÝH[œÚXÝ\˜NÈHH[™Ú^ž™H›ÛˆÛÛ›ÈÛÛ™œ›ÛXš[H˜H˜[ZYÛYH]™\œÙK\˜Ú0êH[˜HÚX]™H”ÐHHÌÌˆš]Ù™œ™H[	Ú[˜Ú\˜ØHHÝ\ÜØHÚXÝ\™^ž˜HH[˜HÚX]™HÚ[[Y]šXØHHLŽš]ÈH[˜HÝ\˜H[]XØHHMˆš]ˆ‚ˆKˆÂˆYˆML‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘\˜[H[‰Ú[™YÚ[™H[\›˜K[X[HHÚXÝ\™^ž˜HØÛÜ™HÚH[ˆ\[™[HH\Ùš[˜]È[ˆ[[˜ÛÈHÛY[HX˜›XØ[™ÈÝ[›Ùš[ÈÛØÚX[^šY[™[H[Ý[™H›Ü›X[H›ÝÙÜ˜YšYH[X[KˆHš[H[[XYÚ[™HÚH\›Û›ÈÛÜœ™][Y[HH\Z[Û›È[]ÈÜ™[˜\šKXH[Ü›È\ÛÈ0ê[›ÛX[ÈH[‰Ø[˜[\ÚH›Ü™[œÙHš]™[H]HYÙÚ][]šH˜\ØÛÜÝH™ZHš]Y[›ÈÚYÛšYšXØ]]šHZH^[ˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛšXØHHØØÝ[[Y[ÈH][^ž˜]È[\[™[OÈ‹ˆÜ[ÛœÎˆÂˆJHÚYœ˜]\˜H\Ú[[Y]šXØH‹ˆŠHÚÙ[š^ž˜^š[Û™H‹ˆÊH]HX\ÚÚ[™È‹ˆ‘
HÝYØ[›ÙÜ˜YšXH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÝYØ[›ÙÜ˜YšXJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠœÝYØ[›ÙÜ˜YšXJŠˆ˜\ØÛÛ™H	ÊŠ™\Ú\Ý[ž˜HÝ\ÜØJŠˆ[Y\ÜØYÙÚ[Ë›Ûˆ[Ý[ÈÛÛ[]ËˆH]H™[™ÛÛ›È[˜ÛÜœÜ˜]H[›È[ˆš[HÜ[H\\™[[Y[H[››ØÝ[È
[[XYÚ[™K]Y[ËšY[ËØÝ[Y[ÊK\XØ[Y[H[\˜[™ÈHš]Y[›ÈÚYÛšYšXØ]]šHZH^[ˆ[˜H[ÙYšXØH[\\˜Ù]Xš[H[	ÛØØÚ[ÈXHÝY™šXÚY[HH˜\ÜÜ\™H[™›Ü›X^š[ÛšKˆ0â›Üš[È]Y[ÈÚH\ØÜš]™HÈØÙ[˜\š[ËHH˜YÚ[Û™H\ˆÝZH[š[HÚH\™H›Ü›X[Y[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHHÚÙ[š^ž˜^š[Û™JŠˆÛÜÝ]Z\ØÙH[ˆ]ÈÙ[œÚXš[HÛÛˆ[ˆÚÙ[ˆš]›ÈH˜[Ü™KÛÛœÙ\˜[™È	ÛÜšYÚ[˜[H[ˆ[ˆ˜][Ù\\˜]Ëˆ0â[ˆÛÛ›ÛÈ
Š™Y™[œÚ]›ÊŠˆ\XØ]È[	ÛÜ™Ø[š^ž˜^š[Û™HZH›ÜšH]K›Ûˆ[˜HXÛšXØH\ˆ˜\›H\ØÚ\™HH˜\ØÛÜÝË—ˆ
ˆ
ŠÊH[]HX\ÚÚ[™ÊŠˆÜØÝ\˜H\žšX[Y[H[ˆ]È\ˆHš\ÝX[^ž˜^š[Û™H
\Ëˆ[ÜÝ˜\™HÛÛÈH[[YH]X]›ÈÚYœ™HH[˜HØ\JKˆ[˜Ú	Ù\ÜÛÈ0ê[ˆÛÛ›ÛÈY™[œÚ]›ÈH›Ûˆ˜\ØÛÛ™H[H[›È[ˆ[›Èš[K—ˆ
ˆ
ŠJHHÚYœ˜]\˜H\Ú[[Y]šXØJŠˆ™[™H[ÛÛ[]È[YÙÚXš[HXH
Š™XÚX\˜HH›ÜšXH\Ú\Ý[ž˜JŠŽˆ[ˆš[HÚYœ˜]È0ê[\Ù[Y[HÚYœ˜]ÈH]\˜H	Ø][žš[Û™KˆHÝYØ[›ÙÜ˜YšXH[H[	ÙY™™]ÈÜÜÝËÚ[ðê›Ûˆ\Ý\™H[Ý[ˆÛÜÜ]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHHYHØšY]]šKˆH
Š˜ÚYœ˜]\˜JŠˆ˜\ØÛÛ™H
š[ÚYÛšYšXØ]ÊˆHÚH™YHÚHÉðê]X[ÛÜØNÈH
ŠœÝYØ[›ÙÜ˜YšXJŠˆ˜\ØÛÛ™H
š[˜]ÈÝ\ÜÛÊˆÚHÚHÚXH]X[ÛÜØKˆÚH[ÛH\Ùš[˜\™H]HYÙÚ\˜[™È[ˆ˜\Ø]ÈÝH]\›ˆ™Y™\š\ØÙHHÙXÛÛ™K\˜Ú0êH[™YHÛÛÈ[˜H›ÝÙÜ˜YšXKˆ‚ˆKˆÂˆYˆMLËˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ]XØØ[HÝY[™HHÜ™Y[žšX[H”ˆH[ˆ\[™[H˜[Z]H\Ú[™Ëˆ[˜H›ÛH[›ÈH™]H^šY[™[HÚH][Ý™HX™\˜[Y[Hœ˜HHÙ\™\ˆH™\\ËXØÙY[™ÈHÛÛ™]š\Ú[ÛšHH]X˜\ÙHÙ[ž˜H[˜ÛÛ˜\™H[\š[ÜšH™\šYšXÚK\˜Ú0êH	Ú[™œ˜\Ý]\˜HÛÛœÚY\˜HY™šYXš[H]X[[œ]YHÜÝÚpèÛÛYØ]È[HSˆ[\›˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HØ\˜]\š\ÝXØH\˜Ú]]\˜[HH™\ÛÈÜÜÚXš[H[[Ýš[Y[È]\˜[KHÛÜØHH[[Z[˜OÈ‹ˆÜ[ÛœÎˆÂˆJH	Ø\ÜÙ[ž˜HH[ˆš\™]Ø[\š[Y]˜[NÈÚH[[Z[˜H[œÝ[[™È[ˆ‘Ñ•ÈÝ[ÛÛ™š[™HÛÛˆ[\›™]‹ˆŠHH›Û™HHšYXÚXH[\XÚ]H[[Ù[È\š[Y]˜[NÈÚH[[Z[˜[›ÈÛÛˆ™\šYšXØHÛÛ[XHHZXÜ›ÜÙYÛY[^š[Û™H‹ˆÊH	Ý\ÛÈ[H”ˆ[ÜÝÈH[˜H[™XHYXØ]NÈÚH[[Z[˜HÛÜÝ]Y[™ÈH”ˆÛÛˆ[ˆÛÛYØ[Y[ÈTÈ‹ˆ‘
HHX[˜Ø[ž˜HHÚYœ˜]\˜HÝ[˜Y™šXÛÈ[\››ÎÈÚH[[Z[˜HXš[][™ÈÈÝH]HHÛÛ›™\ÜÚ[ÛšH[HSˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHH›Û™HHšYXÚXH[\XÚ]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[[Ù[È\š[Y]˜[HÛ\ÜÚXÛÈ
	ØØ\Ý[ÈH›ÜÜØ]ÉÊH]šYH[[Û™È[ˆ\Ý\››ÈÜÝ[HH[\››ÈšY]Ëˆ[˜H›ÛHÝ\\˜]È[\š[Y]›Ë	Ø]XØØ[HÚH›Ý˜H[ˆ[˜H
Šš[\XÚ]\Ý›Û™JŠŽˆ	Ú[™œ˜\Ý]\˜H›ÛˆÚYYHpîH[K\˜Ú0êH\ÜÙ\™HÝ[HSˆ˜[HH\ˆðêHÛÛYH]]Üš^ž˜^š[Û™Kˆ0â\Ø][Y[HÚpìˆÚH\ØÜš]™HÈØÙ[˜\š[Ëˆ™\›È\Ýš[][Ý™H]Y\ÝÈ™\Ý\ÜÝÈ[\Û™[™È
Š™\šYšXØHÛÛ[XJŠˆHÙÛšHÚ[™ÛÛHšXÚY\ÝHH
Š›ZXÜ›ÜÙYÛY[^š[Û™JŠ‹ÛÜðëÚHHÛÛ\›ÛZ\ÜÚ[Û™HH[ˆÜÝ›Ûˆ\˜H]]ÛX]XØ[Y[H	ØXØÙ\ÜÛÈYÛH[šK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJJŠˆ[š\™]Ø[\š[Y]˜[HÉÙ\˜HHH˜]È[Ý[È]›Ü›Îˆ	Ø]XØØ[H›ÛˆHÙ›Û™]È[ÛÛ™š[™K0ê
Š™[˜]È[HÜHš[˜Ú\[JŠˆÛÛˆÜ™Y[žšX[H˜[YKˆYÙÚ][™Ù\™H[ˆ‘Ñ•ÈÝ[\š[Y]›È›ÛˆØ[XšXH[H\ˆÚH0êÚpè[›Ë—ˆ
ˆ
ŠÊJŠˆH”ˆ›Ûˆ0ê[Y™]ÎˆHÚYœ˜]ÈH]][XØ]ÈHÛÛ›™\ÜÚ[Û™HÛÛYHÝ™]˜Kˆ[›Ø›[XH0êÚpìˆÚHXØØYH
Š™ÜÊŠˆ	Ø]][XØ^š[Û™Kˆ[˜H[™XHTÈYXØ]Hš\›ÜÜœ™X˜™HÈÝ\ÜÛÈY[XÛÈ[Ù[ÈHšYXÚXH[\XÚ]K—ˆ
ˆ
Š‘
JŠˆÚYœ˜\™H[˜Y™šXÛÈ[\››È›ÝYÙÙH[	Ú[\˜Ù]^š[Û™H\ÜÚ]˜KXH	Ø]XØØ[H]ZH\ØHÜ™Y[žšX[HYÚ][YNˆHÚYœ˜]\˜H›ÝYÙÙ\™X˜™HHÝYHÙ\ÜÚ[ÛšH\Ø][Y[HÛÛYH]Y[HH[ˆ][H]]Üš^ž˜]ËÙ[ž˜H[\Y\›™H[Ý[˜K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™ÈÈØÙ[˜\š[È\ØÜš]™H[ˆ]XØØ[HÚK[˜]È[˜H›ÛK˜YÙÚ][™ÙHX™\˜[Y[H[šHÚ\Ý[ZKH\›ÛHÚX]™H0ê
Š›[Ýš[Y[È]\˜[JŠˆHHØ]\ØH0êHšYXÚXH[\XÚ]KˆHÛÛ›ÛZ\Ý\˜H	Ù\Ø[YH0êÙ[\™HHÛÜXH
Š›ZXÜ›ÜÙYÛY[^š[Û™H
È™\šYšXØHÛÛ[XJŠ‹›Ûˆ[ˆÛÛ›ÛÈYÙÚ][]›ÈÝ[\š[Y]›Ëˆ‚ˆKˆÂˆYˆMMˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÚ\Ý[Z\ÝH]™HšXÚYY\™H[ˆÙ\YšXØ]ÈÈ\ˆ[[Ý›ÈÜ[H^šY[™[KˆÙ[™\˜HÝ[Ù\™\ˆHÛÜXHHÚX]šK]Z[™H™\\˜H[ˆš[HH[šX\™H[HÙ\YšXØ]H]]Üš]HÛÛ[™[H[›ÛYH[ÛZ[š[ËH]H[	ÛÜ™Ø[š^ž˜^š[Û™HHHÚX]™HX˜›XØH\[˜HÜ™X]Kˆ‹ˆ]Y\Ý[ÛŽˆÛÛYHÚHÚX[XH[š[H[šX]È[HÐKHÛÜØH“Óˆ]™HXZHÛÛ[™\™OÈ‹ˆÜ[ÛœÎˆÂˆJHÙ\YšXØ]È˜YXÙNÈ›Ûˆ]™HXZHÛÛ[™\™H[›ÛYH[ÛZ[š[ËYÙÚ][ÈÚH[HÐH‹ˆŠHÔ“
Ù\YšXØ]H™]›ØØ][Ûˆ\Ý
NÈ›Ûˆ]™HXZHÛÛ[™\™HHÚX]™HX˜›XØKÚH[šXHHÐH‹ˆÊHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
NÈ›Ûˆ]™HXZHÛÛ[™\™HHÚX]™Hš]˜]KÚH™\ÝHÝ[Ù\™\ˆ‹ˆ‘
HÙ\YšXØ]ÈÚ[Ø\™È›Ûˆ]™HXZHÛÛ[™\™HH]H[	ÛÜ™Ø[š^ž˜^š[Û™KÚHÛÛ›ÈX˜›XÚH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠÔÔŠŠˆ0ê[›ØØÛÈH\ÝÈÛÙYšXØ]ÈÚH[šXÚYY[HÙ[™\˜HH[šXH[HÐKˆÛÛY[™HH[™›Ü›X^š[ÛšHY[YšXØ]]™H
ÛÛ[[Ûˆ˜[YKÐS‹Ü™Ø[š^ž˜^š[Û™KY\ÙJHHH
Š˜ÚX]™HX˜›XØJŠ‹Y0êš\›X]ÈÛÛˆHÚX]™Hš]˜]HÛÜœš\ÜÛ™[H\ˆ[[ÜÝ˜\™HÚH[šXÚYY[HHÜÜÚYYH]™\›ËˆH
Š˜ÚX]™Hš]˜]H›Ûˆ\ØÚXHXZH[Ù\™\ŠŠŽˆÙHš[š\ÜÙH™[ÔÔ‹Ú][œ]YHÈ[\˜Ù]\ÜÙHÝ™X˜™H[\\œÛÛ˜\™H[Ú]ËH[Ù\YšXØ]È[™™X˜™H[[YYX][Y[H™]›ØØ]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHHÔ“
Šˆ0ê	Ù[[˜ÛÈZHÙ\YšXØ]H™]›ØØ]HÚHHÐH
ŠœX˜›XØJŠˆ\˜Ú0êHHÛY[ÈÛÛœÝ[[›ÎˆšXYÙÚXH™[H\™^š[Û™HÜÜÝHH›ÛˆH[HHÚH˜\™HÛÛˆHšXÚY\ÝHH[Z\ÜÚ[Û™K—ˆ
ˆ
ŠJH[Ù\YšXØ]È˜YXÙJŠˆ0ê[Ù\YšXØ]È]]Ùš\›X]È[HÐKÚHÝH[H˜\ÙH[HØ][˜HHšYXÚXHY0ê™Z[œÝ[]È™ZHœ›ÝÜÙ\‹ˆ›Ûˆ0ê]X[ÛÜØHÚH[šXÚYY[H[šXK—ˆ
ˆ
Š‘
H[Ù\YšXØ]ÈÚ[Ø\™
Šˆ0ê[ˆ\ÈHÙ\YšXØ]È
Š™[Y\ÜÛÊŠˆ
ÛÜ™H
‹™ÛZ[š[Ëš]
K›Ûˆ[ØÝ[Y[ÈÛÛˆÝZHÈÚHšXÚYYNÈHH]H[	ÛÜ™Ø[š^ž˜^š[Û™HÛÛ›È›Üš[ÈÚpìˆÚHHÐH]™H˜[Y\™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[[Üš^ž˜H[›\ÜÛÈÛÛ\]Îˆ
Š™Ù[™\›ÈHÛÜXHHÚX]šHÝ[Ù\™\ˆ8¡¤ˆÜ™[È[ÔÔˆÛÛˆHÛÛHÚX]™HX˜›XØH8¡¤ˆHÐH˜[YH	ÚY[]0è8¡¤ˆHÐHš\›XHY[Y]H[Ù\YšXØ]È8¡¤ˆÈ[œÝ[ÈXØØ[È[HÚX]™Hš]˜]HÚH›ÛˆÚH0êXZH[ÜÜØJŠ‹ˆ]X[ÚX\ÚHÜš[Û™H	Ù\Ø[YH[ˆÝZH[˜HÚX]™Hš]˜]HšY[™H˜\ÛY\ÜØK\ÜÜ]HÈÛÛ™]š\ØH0êØ˜YÛX]Kˆ‚ˆKˆÂˆYˆMMKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’[X[H[™œ˜\Ý]\™H]™H\XØ\™H[ˆYÙÚ[Ü›˜[Y[È[Ú\Ý[XHHÝÜ˜YÙHÚHšXÚYYH[šX]š[ÈZHÛÛ›Û\ˆHÛÛ\ÜHÚ\˜ØHZ[]HH[™\ÜÛšXš[]0èˆ[Ù\š^š[È0ê\Ø]È[HÙÚ\ÝXØK]]˜H[HŽŒ[HŒŽŒ™ZHÚ[Ü›šH™\šX[KH[Ü[HÛY[K]]›ÈÜ™HÝHXHÛÛˆ˜Y™šXÛÈZ[š[[Èœ˜HHŽŒHHNŒHÛY[šXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[[Y[È[›ØÙ\ÜÛÈHÚ[™ÙHX[˜YÙ[Y[™YÛÛHUPS‘È\ÙYÝZ\™H	Ú[\™[ËHÛÛYH˜HØÙ[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[ÛÛ›ÛÈH™\œÚ[Û™KÚH™YÚ\Ý˜H]HHÜ˜H[	Ú[\™[ÈH™H]\›Z[˜HHX[šYšXØ^š[Û™H‹ˆŠH[X[›ÈH˜XÚÛÝ]ÚHÝXš[\ØÙH	ÛÜ˜\š[ÈH\ÙXÝ^š[Û™H[ˆ˜\ÙH[[\È™XÙ\ÜØ\š[È\ˆ[›[\™HH[ÙYšXØH‹ˆÊH	Ø[˜[\ÚHH[\]ËÚH[˜H›ÛHÛÛ\]]H]]Üš^ž˜H]]ÛX]XØ[Y[H	Ù\ÙXÝ^š[Û™H[[YYX]H‹ˆ‘
HHš[™\Ý˜HHX[][žš[Û™KÛÛ˜ÛÜ™]HÛÛˆH]Û\šHZHÙ\š^šH™[H˜\ØÚXHHZ[›Üˆ[\]È
ÛY[šXØH›ÝJH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HHš[™\Ý˜HHX[][žš[Û™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š›XZ[[˜[˜ÙHÚ[™ÝÊŠˆ0ê	Ú[\˜[È™\ÝXš[]ÈHÛÛ˜ÛÜ™]ÈÛÛˆH]Û\šHZHÙ\š^šH[ˆÝZH0êÛÛœÙ[]È\ÙYÝZ\™H[ÙYšXÚHÚHÛÛ\Ü[›È[™\ÜÛšXš[]0èˆÚHØÙYÛYH[˜Ü›ØÚX[™ÈH˜\ØÙHÜ\˜]]™HH
]JˆHÙ\š^šHÛÚ[›ÛNˆ]ZHHÙÚ\ÝXØH\ØÛYHŽŒLŒŽŒ™ZH™\šX[HH[Ü[HÛY[H[™XØHHŽŒMNŒHÛY[šXØHÛÛYH[ÛY[ÈHZ[›Üˆ˜Y™šXÛËˆ]X\˜[XÚ[œ]YHZ[]HH]›Ü›È[˜[›ÈÛÛ[Ù[Y[H[ˆ]Y[Hš[™\Ý˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[X[›ÈH˜XÚÛÝ]
ŠˆYš[š\ØÙH
Š˜ÛÛYJŠˆÜ›˜\™H[™Y]›ÈÙHH[ÙYšXØH˜[\ØÙKY0êØ˜›YØ]Üš[ËXH›ÛˆÝXš[\ØÙH]X[™È\ÙYÝZ\›KˆÙ[[XZH0êHš[™\Ý˜HHÝ™\ˆ\ÜÙ\™HX˜˜\Ý[ž˜H[\XHHÛÛ[™\™H[˜ÚH	Ù]™[X[H›Û˜XÚË—ˆ
ˆ
ŠÊH	Ø[˜[\ÚHH[\]ÊŠˆ˜[]Hš\ØÚHH\[™[ž™HH[[Y[HHXÚ\Ú[Û™H[ÐP‹XH›Ûˆ]]Üš^ž˜H[HHÛÛH°êHš\ÜØH[ˆÜ˜\š[Îˆ0ê[ˆ[œ][›ØÙ\ÜÛÈH\›Ý˜^š[Û™K›ÛˆHÝXHÛÛ˜Û\Ú[Û™K—ˆ
ˆ
ŠJH[ÛÛ›ÛÈH™\œÚ[Û™JŠˆ˜XØÚXHH™]š\Ú[ÛšHHÛÙXÙHHÛÛ™šYÝ\˜^š[ÛšKˆØÝ[Y[HÛÜØH0êØ[XšX]Ë›ÛˆX[šYšXØH]X[™ÈØ[XšX\›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHš[™\Ý˜HHX[][žš[Û™H˜H[Y[œÚ[Û˜]HÝ[
Š[\È[	Ú[\™[ÈpîH[[\È[›Û˜XÚÊŠ‹›ÛˆÛÛÈÝ[š[[Ëˆ[˜H[ÙYšXØHHZ[]HÛÛˆ[ˆ›Û˜XÚÈHÌšXÚYYH[˜Hš[™\Ý˜HH[Y[›ÈÌZ[]K[š[Y[H[ˆ[\™]š\ÝÈ\ØÚXH[Ù\š^š[ÈÚpîHÛ™H	ÛÜ˜\š[ÈÛÛ˜ÛÜ™]Ëˆ‚ˆKˆÂˆYˆMM‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™HÚYœ˜HH\ØÚHZH›ÝX›ÛÚÈ^šY[™[HÛÛˆš]ØÚÙ\‹ˆ[™\]Z\Ú]È0êÚHHÚX]™HHÚYœ˜]\˜H›ÛˆÚXHXZHÛÛœÙ\˜]HÝ[\ØÛÈÝ\ÜÛÈHÚH[Ü][HÚHšYš]]HH]šX\œÚHÙH]X[Ý[›ÈÛ[ÛH[\ØÛÈ\ˆYÙÙ\›È[›Ý™HÈ[\˜H[š\›]Ø\™HH]š[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[HÛÙ\Ù˜H]Y\ÝH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJHÓH
\™Ø\™HÙXÝ\š]H[Ù[JK	Ø\X[˜ÙHH™]HÚHÙ[˜[^ž˜HHÚX]šH\ˆ	Ú[\˜H^šY[™H‹ˆŠHH
\ÝY]›Ü›H[Ù[JK[[Ù[ÈYØ]È[\ÜÜÚ]]›ÈÚHš[\ØÚXHHÚX]™HÛÛÈHÛÛ™šYÝ\˜^š[Û™H[YÜ˜H‹ˆÊHÙ^H\ØÜ›ÝË[\ÜÚ]È[HÚX]šH™\ÜÛÈ[˜H\ž˜H\HšY]H\ˆ[™XÝ\\›È	Ù[Y\™Ù[ž˜H‹ˆ‘
HØ[[™Ë	ØYÙÚ][HH[ˆ˜[Ü™HØ\ÝX[H[HÚX]™Hš[XHHØÜš]™\›H™[Ù]Ü™HH]š[È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHH
\ÝY]›Ü›H[Ù[JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š•JŠˆ0ê[ˆ[Ù[ÈYØ]È[
ŠœÚ[™ÛÛÈ\ÜÜÚ]]›ÊŠˆ8 %[ˆÚ\YXØ]ÈÝ[HØÚYHXY™HÜ\™H[˜H[\[Y[^š[Û™H
Š™š\›]Ø\™JŠˆ
•JH[›È[›ØÙ\ÜÛÜ™KˆÝ\ÝÙ\ØÙHHÚX]™HHÚYœ˜]\˜H[\ØÛÈ[›Üš[È[\››ÈHH
ŠœÚYÚ[JŠˆH[›ÈÝ]ÈH]š[È]\ÛÎˆHš[\ØÚXH
ŠœÛÛÊŠˆÙHHZ\Ý\˜^š[ÛšH[š\›]Ø\™HH[HÙ\]Y[ž˜HH›ÛÝÛÜœš\ÜÛ™Û›ÈH]Y[H™YÚ\Ý˜]Kˆ™H\ØÙ[™Û›È[˜[XšHH™\]Z\Ú]NˆHÚX]™H›ÛˆÝHÝ[\ØÛËHÜÜÝ[™È[\ØÛÈÝH[‰Ø[˜HXXØÚ[˜H›ÛˆÉðê[Ý[ˆHÚHH›Ü›š\ØØKÛÜðëH]H™\Ý[›È[YÙÚXš[KˆÙH]X[Ý[›ÈX[›ÛY]H[š\›]Ø\™KHZ\Ý\˜^š[ÛšHØ[XšX[›ÈH[H›Ûˆš[\ØÚXHHÚX]™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	ÒÓJŠˆÝ›ÛÙH[˜H[žš[Û™H[˜[ÙØHXHÝHØØ[H
Š™[\œš\ÙJŠŽˆ0ê[‰Ø\X[˜ÙHYXØ]HÚH›ÝYÙÙHHÚX]šHHÐK]X˜\ÙHH\XØ^š[ÛšH\ˆ]H	ÛÜ™Ø[š^ž˜^š[Û™Kˆ0âÛÝœ˜Y[Y[œÚ[Û˜]ÈH[˜Y]ÈHYØ\™H[˜HÚX]™HH[ˆÚ[™ÛÛÈÜ][K—ˆ
ˆ
ŠÊH[Ù^H\ØÜ›ÝÊŠˆ0êH›ØÙY\˜HÛÛˆÝZHÚHÛÛœÙ\˜H[˜HÛÜXHH™XÝ\\›È[HÚX]™H™\ÜÛÈ[ˆ\ÜÚ]\š[ÈšY]Ëˆš\ÛÛ™H[›Ø›[XHÜÜÝËÚ[ðêÛÛYHšY[˜\™H[ˆÜÜÙ\ÜÛÈZH]HÙHHÚX]™H˜H\œØKXH›Ûˆ[\Y\ØÙHH™\ÜÝ[›ÈHYÙÙ\™H[\ØÛÈ[›Ý™K—ˆ
ˆ
Š‘
H[Ø[[™ÊŠˆÚH\XØH[	Ú\Ú[™È[H\ÜÝÛÜ™\ˆÛÛ˜\Ý\™HH˜Z[˜›ÝÈX›K›Ûˆ[H›Ý^š[Û™H[HÚX]šHHÚYœ˜]\˜H[\ØÛÎÈHØÜš]™\™H[Ý[˜Ú0êH™[Ù]Ü™HH]š[ÈÛÛ˜YXÙH[™\]Z\Ú]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÛÜXHÚH\Ý[™ÝYH\ˆHØØ[Kˆ
Š•HH[ˆ\ÜÜÚ]]›ÊŠ‹Ú\ØØ[KYØ]ÈH]Y[HXXØÚ[˜NÈ
Š’ÓHH]H	Ø^šY[™JŠ‹\X[˜ÙHYXØ]HHÙ\YšXØ]KÜ\ÜÛÈ[ˆÛ\Ý\‹\Ø]H\ˆš\›X\™HÙ\YšXØ]HH›ÝYÙÙ\™HÚX]šHH›Ù^š[Û™Kˆ‚ˆKˆÂˆYˆMMËˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[˜H˜[˜ØHÙ\Ý\ØÙH[\›˜[Y[HH›ÜšXHÙ\YšXØ]H]]Üš]KÚHš\›XHZYÛXZXHHÙ\YšXØ]H[Ú[Ü››È\ˆ\XØ^š[ÛšHH\[™[Kˆ	Ø]Y][\Û™HÚHHÚX]™Hš]˜]H[HÐH›Ûˆ\Ú\ÝHXZH[ˆ›Ü›XHYÙÚXš[H™[HY[[ÜšXHH[ˆÙ\™\ˆÙ[™\šXÛËÚHHÜ\˜^š[ÛšHHš\›XHÚX[›È˜XØÚX]HHÚH[\ÜÜÚ]]›È™\Ú\ÝHH[]]šHHX[›ÛZ\ÜÚ[Û™Hš\ÚXØHØ[˜Ù[[™ÈHÚX]šKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ^š[Û™HÛÙ\Ù˜H]Y\ÝH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJHÙ^H\ØÜ›ÝÈ™\ÜÛÈ[˜H\ž˜H\KÚHÛÛœÙ\˜HHÚX]™Hš]˜]H[HÐH[ˆØ\ÜØY›ÜH‹ˆŠHH[YÜ˜]È™[Ù\™\ˆ[HÐKÚHYØHHÚX]™HH]Y[HÜXÚYšXØHØÚYHXY™H‹ˆÊHÓH
\™Ø\™HÙXÝ\š]H[Ù[JHÙ\YšXØ]ËÛÛˆHÚX]™HÙ[™\˜]HHXZH\ÜÜXš[H[\ÜÜÚ]]›È‹ˆ‘
HÚYœ˜]\˜H[HÚX]™Hš]˜]HÛÛˆQTËLMˆH\˜Ú]šX^š[Û™HÝH[ˆ›Û[YH›Ý]È[Ù\™\ˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÓH
\™Ø\™HÙXÝ\š]H[Ù[JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	ÊŠ’ÓJŠˆ0ê[ˆ\ÜÜÚ]]›È\™Ø\™HYXØ]ÈHÙ\YšXØ]È
\XØ[Y[H’TÈML‹ÌMLÊHÚHÙ[™\˜HHÚX]™H
Š˜[›Üš[È[\››ÊŠˆH›Ûˆ™HÛÛœÙ[HXZH	Ù\ÜÜ^š[Û™H[ˆÚX\›ËˆHÜ\˜^š[ÛšHHš\›XH]™[™ÛÛ›È[›È[\ÜÜÚ]]›Îˆ[Ù\™\ˆ[šXH	Ú\ÚHš\›X\™HHšXÙ]™HHš\›XKÙ[ž˜HÚHHÚX]™H]˜]™\œÚHXZHHY[[ÜšXH[Ú\Ý[XHÜ\˜]]›ËˆÛHÓH™YÚ\Ý˜[›ÈÙÛšHÜ\˜^š[Û™HHÛÛ›È
Š[\\‹\™\Ú\Ý[
ŠŽˆ[	Ø\\\˜Hš\ÚXØH^ž™\˜[›È[X]\šX[HÜš]ÙÜ˜YšXÛËˆ]HH™HH™\]Z\Ú]H[	Ø]Y]ÛÛ›ÈÛÙ\Ù˜]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[JŠˆ\XØHÈÝ\ÜÛÈš[˜Ú\[ÈXH0ê[œØ]È\ˆ›ÝYÙÙ\™H
Š[ˆÚ[™ÛÛÈ\ÜÜÚ]]›ÊŠˆ
ÚYœ˜]\˜H[\ØÛË]\Ý^š[Û™H[	Ø]š[ÊKˆ›Ûˆ™YÙÙH[›Û[YHHš\›YHH[˜HÐH^šY[™[K›ÛˆÙ™œ™H™\Ý^š[ÛšHÜš]ÙÜ˜YšXÚHH\X[˜ÙHH›ÛˆHHÙ\YšXØ^š[ÛšHšXÚY\ÝH\ˆ[˜HÐK—ˆ
ˆ
ŠJH[Ù^H\ØÜ›ÝÊŠˆYÙÜ˜]˜H[›Ø›[XH[žšXÚ0êHš\ÛÛ™\›ÎˆÜ™X\™H[˜HÛÜXH[HÚX]™Hš]˜]H[HÐHHY™šY\›HH\žšH[Û\XØHH[ÙÚHHÝZHpìˆ˜\[\™Kˆ\ˆ[˜HÐH0ê[˜H˜]XØHH]š]\™K—ˆ
ˆ
Š‘
JŠˆÚYœ˜\™HHÚX]™HÛÛˆQTÈÜÜÝHÛÛÈ[›Ø›[XNˆ\ˆš\›X\™Hš\ÛÙÛ˜HXÚYœ˜\›KH[ˆ]Y[[ÛY[ÈHÚX]™H
Š°ê[ˆÚX\›È™[HY[[ÜšXH[Ù\™\ŠŠ‹Ú[ðê\Ø][Y[HÚpìˆÚH	Ø]Y]šY]Kˆ[›Û™HÙ\™HÝ\ÝÙ\™HHÚX]™HÚH›ÝYÙÙHHÚX]™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™ÈÈØÙ[˜\š[È›ÛZ[˜H[˜HÐK[H›Û[ZKÛ\Ý\ˆÈÙ\YšXØ^š[Û™H’TËHš\ÜÜÝH0ê
Š’ÓJŠ‹ˆ]X[™È›ÛZ[˜H[ˆÜ][Kš]ØÚÙ\‹ÙXÝ\™H›ÛÝÈ]\Ý^š[Û™HH[YÜš]0èH[˜HXXØÚ[˜KHš\ÜÜÝH0ê
Š•JŠ‹ˆ‚ˆKˆÂˆYˆMNˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[˜H[ÙYšXØH\›Ý˜]H™]™YHHYÙÚ[Ü›˜\™H[Ú\Ý[XHHÙ\Ý[Û™HØÝ[Y[[H[ÜšHÜ˜\š[Ëˆ\˜[HHš[™\Ý˜K	Ø[[Z[š\Ý˜]Ü™HÚHXØÛÜ™ÙHÚH[™XØÚ[ÈÙ\™\ˆH[˜ÚH[ˆÙ\š^š[È•]]›ÈÚH™\ÜÝ[›È\ØKHXÚYHH\Ø]]˜\›Èš\ÝÈÚHÚX[[È]ZW‹ˆ[Ú[Ü››ÈÜË[›ØÙ\ÜÛÈ›Ý\››ÈÚH[\ÜHH\Ý[šHH[ˆ\™\ˆ\Ý\››Ë	Ý[šXÛÈÚH\Ø]˜H]Y[	Ñ•˜[\ØÙHÙ[ž˜HÚH™\ÜÝ[›ÈÛÛYÚHHYHÛÜÙKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[Hš[˜Ú\[È[›ØÙ\ÜÛÈHÙ\Ý[Û™H[H[ÙYšXÚH0êÝ]Èš[Û]ÏÈ‹ˆÜ[ÛœÎˆÂˆJHHš[™\Ý˜HHX[][žš[Û™K\˜Ú0êH	Ú[\™[È0êÝ]È\ÙYÝZ]È[ÜšHÜ˜\š[È‹ˆŠH[ÛÛ›ÛÈH™\œÚ[Û™K\˜Ú0êHHÛÛ™šYÝ\˜^š[Û™H›Ûˆ0êÝ]HØ[˜]H[ˆ[ˆ™\ÜÚ]ÜžH‹ˆÊH	Ø[˜[\ÚH	Ú[\]Ë\˜Ú0êH[Ù\š^š[ÈØÝ[Y[[H›Ûˆ\˜HÝ]È˜[]]È‹ˆ‘
HH]]š]0è[Z]]NˆÚH\ÙYÝYHÛÛÈÚpìˆÚH0êÝ]È\›Ý˜]Ë[HHpîH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HH]]š]0è[Z]]H
™\ÝšXÝYXÝ]š]Y\ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[š[˜Ú\[È[H
Š˜]]š]0è[Z]]JŠˆÝXš[\ØÙHÚK[›È[˜Hš[™\Ý˜HHX[][žš[Û™KÚHÜÜØH\ÙYÝZ\™H
ŠœÛÛ[ÈÚpìˆÚH0êÝ]È\›Ý˜]ÊŠ‹HšY[	Ø[›Ëˆ›Ûˆ0ê\›ØÜ˜^šXNˆ0êHÛÛ™^š[Û™HÚH™[™H][^ž˜Xš[H]È[™\ÝÈ[›ØÙ\ÜÛËˆ[˜H[ÙYšXØH\›Ý˜]H0êÝ]H˜[]]H\ˆ[Ý[È[\]ËH[ˆX[›ÈH˜XÚÛÝ]ÛÜÝZ]ÈÝHH\ÜØHY0ê›ÝHHÚHÝœ°èXYÛ›ÜÝXØ\™H[ˆ]™[X[H›Ø›[XKˆ[‰ØYÙÚ][H[\›Ýš\Ø]H›ÛˆH[HH]ÈÚpì‹H[™˜]H™[ÈØÙ[˜\š[È›ÙXÙH\Ø][Y[H[[››È\XÛÎˆ[ÝX\ÝÈÛÛ\\™H[Ú[Ü››ÈÜËÝH[ˆ›ØÙ\ÜÛÈ]™\œÛËH™\ÜÝ[›ÈÈÛÛYØHH[ˆ[\™[ÈÚH›Ûˆš\Ý[HH™\ÜÝ[˜H\KˆH™YÛÛH˜]XØH0êÙ]™\˜HH›Û][Y[HÙ[ž˜HXØÙ^š[ÛšNˆÙH\˜[HHš[™\Ý˜H[Y\™ÙH]X[ÛÜØHÚH[™™X˜™H˜]ËÈÚH
Šœ™YÚ\Ý˜HÛÛYH[Ý˜HšXÚY\ÝHH[ÙYšXØJŠ‹›ÛˆÈÚH˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHš[™\Ý˜HHX[][žš[Û™NŠŠˆ0êÝ]H
Šœš\Ü]]JŠ‹ˆ	Ú[\™[È0ê]™[]È[ÜšHÜ˜\š[ÈÛÛYH™]š\ÝÎˆ[›Ø›[XH›Ûˆ0ê]X[™ÈÚH0êYÚ]ËXHÛÜØHÚH0ê˜]È[ˆpîK—ˆ
ˆ
ŠŠHÛÛ›ÛÈH™\œÚ[Û™NŠŠˆ0ê[˜H[Û˜H˜]XØHÚH]œ™X˜™H™\ÛÈH[ÙYšXØHH•š\ÚXš[HÛÛYHY™™\™[ž˜H›Ûˆ™YÚ\Ý˜]KZ]][™ÈHXYÛ›ÜÚKˆXH0ê[ˆš[YY[ÈH˜[Nˆ[š[˜Ú\[Èš[Û]È[	ÛÜšYÚ[™H0ê[ˆ[›Ë—ˆ
ˆ
ŠÊH[˜[\ÚH	Ú[\]ÎŠŠˆ\˜HÝ]H˜]KY\˜HÛÜœ™]H
Šœ\ˆH[ÙYšXØH\›Ý˜]JŠ‹ˆ›ÛˆÝ]˜H™]™Y\™H	Ú[\]ÈH[‰Ø]]š]0èÚH™\ÜÝ[›È]™]˜H›ÜÜÝÎˆ›ÛˆÚH[˜[^ž˜HÚpìˆÚH›Ûˆ0êÝ]ÈÚY\ÝË——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÚ]\ÝYšXØ^š[Û™H™ÚpèÚHÚHÚX[[×ˆ0ê™[ÛÛ\ÝÈ	Ù\Ø[YKÙ[\™HHš\ÜÜÝHØ˜YÛX]KˆÙÛšH^š[Û™HÛÛ\]]H[ÜšH[	Ø[Xš]È\›Ý˜]È[›[HH™HØ\˜[žšYHÚH[›ØÙ\ÜÛÈ›Ü›š\ØÙNˆ[\]È˜[]]Ë˜XÚÛÝ]˜]XØXš[HH˜XØÚXXš[]0è\ˆÚHÝœ°èXYÛ›ÜÝXØ\™KˆšXÛÜ™H	Ù[[˜ÛÈ[H[\XØ^š[ÛšHXÛšXÚHH[˜H[ÙYšXØKHÝZHH
Š˜]]š]0è[Z]]JŠˆ˜[››È\Nˆ\ÝHH]]Üš^ž˜^š[Û™HHH›ØØÛË
Š˜]]š]0è[Z]]JŠ‹™\›[È[Ù\š^š[ËšX]š[ÈHÙ\š^š[ÈHH\XØ^š[Û™K\XØ^š[ÛšHYØXÞK\[™[ž™Kˆ‚ˆKˆÂˆYˆMNKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ›Ù]Ü™HHÛX\Û™H]™HÛÛœÙ\˜\™HÝ[\ÜÜÚ]]›È[[Ù[Èš[ÛY]šXÛÈ[	Ú[\›ÛHHHÚX]šHÚHØ›ØØØ[›ÈHYØ[Y[Kˆ[™\]Z\Ú]È0ê™]Îˆ]YZH]H›Ûˆ]›Û›ÈXZH\ÜÙ\™HYÙÚXš[H[Ú\Ý[XHÜ\˜]]›Èš[˜Ú\[H™[[Y[›ÈÙH]Y\ÝÈšY[™HÛÛ\›ÛY\ÜÛÈÛÛˆš]š[YÚHH›ÛÝH[ÛÛ™œ›ÛÈš[ÛY]šXÛÈ]™H]™[š\™H[ˆ[ˆ[XšY[H\ÛÛ]ÈÚH™\Ý]Z\ØØHÛÛ[È[ˆ\Ú]ËÛÜœš\ÜÛ™[ž˜HðëÈ›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛ›ÛÙÚXHÛÙ\Ù˜H]Y\ÝÈ™\]Z\Ú]ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÚYœ˜]\˜H[YÜ˜[H[HY[[ÜšXH[\ÜÜÚ]]›ÈÛÛˆQTËLMˆ‹ˆŠH[ˆÓHH™]K[\œ›ÙØ]È[[Y›Û›ÈHÙÛšHØ›ØØÛÈ‹ˆÊH[˜HÙXÝ\™H[˜Û]™K[XšY[HH\ÙXÝ^š[Û™H\ÛÛ]È[›ØÙ\ÜÛÜ™Hš[˜Ú\[H‹ˆ‘
H[\ÜÚ]È[HÚX]šH™\ÜÛÈ[›Ù]Ü™K\ˆ[™XÝ\\›È[ˆØ\ÛÈHÝX\ÝÈ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH[˜HÙXÝ\™H[˜Û]™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
ŠœÙXÝ\™H[˜Û]™JŠˆ0ê[ˆ[XšY[HH\ÙXÝ^š[Û™H
Šš\ÛÛ]È[›ØÙ\ÜÛÜ™Hš[˜Ú\[JŠ‹ÛÛˆY[[ÜšXH›ÜšXHHÛÙXÙH›Üš[ËÚH[Ú\Ý[XHÜ\˜]]›È›ÛˆpìˆYÙÙ\™H°êH\Ü^š[Û˜\™NˆpìˆÛÛ[È[šX\™ÛHšXÚY\ÝHHšXÙ]™\›™HHš\ÜÜÝKˆ0â\Ø][Y[HÚpìˆÚHÈØÙ[˜\š[ÈÚYYKˆ[[Ù[Èš[ÛY]šXÛÈ›Ûˆ\ØÚXHXZH	Ù[˜Û]™NÈ[ÛÛ™œ›ÛÈ]šY[™H[›ËH™\œÛÈ	Ù\Ý\››È\ØÙHÛÛ[È[ˆ\Ú]ËÛÜœš\ÜÛ™[ž˜HðëÈ›ÎÈHÚX]šHZHYØ[Y[H™\Ý[›Èš[˜ÛÛ]H[	Ù[˜Û]™KÚHH\ØHÙ[ž˜HXZH\ÜÜ›KˆH›ÜšY]0èXÚ\Ú]˜H0êÚH	Ú\ÛÛ[Y[È0ê
Šš\™Ø\™JŠŽˆ[˜ÚH[ˆ]XØØ[HÚHÝ[™ØHš]š[YÚHH›ÛÝÝ[Ú\Ý[XHÜ\˜]]›Èš[˜Ú\[H™\ÝH[ÜšK\˜Ú0êH›Ûˆ\Ú\ÝH[Ý[ˆ\˜ÛÜœÛÈÛÙØ\™H\ˆ[˜\˜ÚK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚYœ˜]\˜H[YÜ˜[H[HY[[ÜšXNŠŠˆ›ÝYÙÙHH]H
Š˜Hš\ÜÛÊŠ‹]X[™È[\ÜÜÚ]]›È0êÜ[ÈÈ›ØØØ]ËˆH[Y›Û›ÈXØÙ\ÛÈHØ›ØØØ]ÈHY[[ÜšXH0êXÚYœ˜]H[ˆ[ÙÈ˜\Ü\™[K]Z[™H[ˆÚ\Ý[XHÜ\˜]]›ÈÛÛ\›ÛY\ÜÛÈYÙÙ\™X˜™H[[Ù[Èš[ÛY]šXÛÈ\Ø][Y[HÛÛYH]X[[œ]YH[›È]Ë—ˆ
ˆ
ŠŠHÓHH™]NŠŠˆ0êHØÙ[HÚ]\ÝH\ˆ
Š[ˆ]XÙ[\ŠŠ‹Ý™H[‰Ø\X[˜ÙHÙ\YšXØ]HÝ\ÝÙ\ØÙHHÚX]šH[	ÛÜ™Ø[š^ž˜^š[Û™KˆÝH[›ÈÛX\Û™H0ê[\˜]XØXš[Nˆ[›Ù\œ™X˜™H[˜H\[™[ž˜H[HÛÛ›™]]š]0èHÙÛšHØ›ØØÛËÛÛˆ][ž˜HH[™\ÜÛšXš[]0è[˜XØÙ]Xš[KHX[™\™X˜™HÛÛ][œ]YH[ÜšH[\ÜÜÚ]]›È[ˆ]ÈÚH]™H™\Ý\šK—ˆ
ˆ
Š‘
H\ÜÚ]È[HÚX]šH™\ÜÛÈ[›Ù]Ü™NŠŠˆ0ê[ˆYXØØ[š\Û[ÈH
Šœ™XÝ\\›ÊŠ‹›ÛˆH\ÛÛ[Y[ËH]ZHØ\™X˜™HÛÛ›Ü›ÙXÙ[NˆÜ™Y\™X˜™H[˜HÛÜXH[HÚX]™H[ÜšH[\ÜÜÚ]]›ËÚ[ðê\Ø][Y[HÚpìˆÚH[™\]Z\Ú]ÈšY]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHH™HÛÛ[š]ÜšH\™Ø\™HHÚX]šH[ˆ˜\ÙHH
Š™Ý™HÝ[››ÈHÛÜØH›ÝYÙÛÛ›ÊŠ‹ˆ
Š•JŠˆHÚ\Ø[]ÈÝ[HØÚYHXY™HH
[ŠˆÛÛ\]\‹Ý\ÝÙ\ØÙHHÚX]šHH]Y[HXXØÚ[˜HH™HZ\Ý\˜H	Ú[YÜš]0è[	Ø]š[Ë\XÛÈ[HÚYœ˜]\˜H[\ØÛÈ0­È
Š’ÓJŠˆH\X[˜ÙHÈØÚYHYXØ]KÜ\ÜÛÈÙ\YšXØ]H’TËÚHÝ\ÝÙ\ØÙHHÚX]šH
™[	ÛÜ™Ø[š^ž˜^š[Û™JˆHšH\ÙYÝYHÜ\˜^š[ÛšHÜš]ÙÜ˜YšXÚHY[È›Û[YK\XØHHÐHHÚ\Ý[ZHHYØ[Y[È0­È
Š”ÙXÝ\™H[˜Û]™JŠˆH\™XH\ÛÛ]H
™[›Êˆ[›ØÙ\ÜÛÜ™K\ˆHÙYÜ™]HpîHÙ[œÚXš[H[\ÜÜÚ]]›Ë\XØHHš[ÛY]šXHHYØ[Y[HÝH[Øš[Kˆ[š[ÈÛÛ][™H0êÙ[\™HÈÝ\ÜÛÎˆ
Š›HÚX]™H›Ûˆ\ØÙHXZH[ˆÚX\›ÊŠ‹ˆ‚ˆKˆÂˆYˆMŒˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™È]™H›ÝYÙÙ\™HÛÛˆ[ˆÛÛÈÙ\YšXØ]È]X]›È›ÛZHÚH›ÛˆÛÛ™]šYÛ›ÈÈÝ\ÜÛÈÛZ[š[Îˆ[Û˜Z[š[™Ë˜ÛÛXÝÝË™[Û˜Z[š[™Ë˜ÛÛXÜ[K™[Û˜Z[š[™Ëš]HÙÚ[‹™[Û‹XXØY[^K›Ü™Øˆ[ˆÛÛYØH›ÜÛ™H[ˆÙ\YšXØ]ÈÚ[Ø\™
‹™[Û˜Z[š[™Ë˜ÛÛXÛÜÝ[™[™ÈÚH˜ÛÜ™H]×‹ˆ‹ˆ]Y\Ý[ÛŽˆ”\˜Ú0êH[Ú[Ø\™›Ûˆ˜\ÝKH]X[HÙ\YšXØ]Èš\ÛÛ™H[›Ø›[XOÈ‹ˆÜ[ÛœÎˆÂˆJH[Ú[Ø\™ØØYHš[XHYÛH[šHÙ\YšXØ]NˆÙ\™H[ˆÙ\YšXØ]ÈH˜[Y^š[Û™H\Ý\ØH‹ˆŠH[Ú[Ø\™›Ûˆ0êšXÛÛ›ÜØÚ]]ÈZHœ›ÝÜÙ\ŽˆÙ\™H[ˆÙ\YšXØ]È[Y\ÜÛÈH[˜HÐHX˜›XØH‹ˆÊH[Ú[Ø\™›Ûˆpìˆ\ÜÙ\™H]]Ùš\›X]ÎˆÙ\™H[˜HšXÚY\ÝHHš\›XHH[˜HÐHH\ž™H\H‹ˆ‘
H[Ú[Ø\™ÛÜ™HÛÛÈHÛÝÙÛZ[šHH[ˆ[šXÛÈÛZ[š[ÎˆÙ\™H[ˆÙ\YšXØ]ÈÐSˆ][KYÛZ[š[È‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[Ú[Ø\™ÛÜ™HÛÛÈHÛÝÙÛZ[šHH[ˆ[šXÛÈÛZ[š[ÎˆÙ\™H[ˆÙ\YšXØ]ÈÐSˆ][KYÛZ[š[ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆÙ\YšXØ]È
ŠÚ[Ø\™
ŠˆÛÛYH
‹™[Û˜Z[š[™Ë˜ÛÛX˜[H\ˆHÛÝÙÛZ[šHH
Š[ˆÛÛÈ]™[ÊŠˆH
Šœ]Y[ÛÛÈÛZ[š[ÊŠ‹ˆ™[	Ù[[˜ÛÈ[ÈØÙ[˜\š[È™HÛÜ™H]Z[™H[›ÈÛÛ[ËÝÝË™[Û˜Z[š[™Ë˜ÛÛXH˜[\ØÙHÝH]HÛH[šH\ˆ˜YÚ[ÛšH]™\œÙNˆ[Û˜Z[š[™Ë˜ÛÛX0ê[ÛZ[š[ÈYËÚH	Ø\Ý\š\ØÛÈ›ÛˆÛÛ\™[™HH˜H[[˜Ø]ÈH\NÈÜ[K™[Û˜Z[š[™Ëš]H[‰Ù\Ý[œÚ[Û™H]™\œØNÈÙÚ[‹™[Û‹XXØY[^K›Ü™Ø0ê[ˆÛZ[š[È[]È\Ý˜[™[ËˆHÛÛ^š[Û™H0ê[ˆÙ\YšXØ]È
Š”ÐSŠŠˆ

”ÝXš™XÝ[\›˜]]™H˜[YJŠK]È[˜ÚH][KYÛZ[š[ÈÈPÐËÚH[[˜ØH\ÜXÚ][Y[H™[Ø[\ÈÐSˆ]HH›ÛZHHÛÜš\™K[˜ÚHHÛZ[šH]™\œÚHœ˜HÜ›Ëˆ0â\˜[›È[YXØØ[š\Û[ÈÝHÝZHHœ›ÝÜÙ\ˆ[Ù\›šHÚH˜\Ø[›È]™\›Îˆ[™XØÚ[ÈØ[\ÈÛÛ[[Ûˆ˜[YH0êÛÛœÚY\˜]ÈØœÛÛ]ËHH˜[Y^š[Û™H]šY[™HÝ[Ø[\ÈÐS‹—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHØØY[ž˜HH˜[Y^š[Û™H\Ý\ØNŠŠˆH\˜]H›Ûˆ\[™H[\ÈHÛÜ\\˜HZH›ÛZKHH
Š˜[Y^š[Û™H\Ý\ØJŠˆšYÝX\™H]X[ÈH›Û™ÈHÐH™\šYšXØH	ÚY[]0èYØ[H[	ÛÜ™Ø[š^ž˜^š[Û™K›Ûˆ]X[H›ÛZH[Ù\YšXØ]È›ÝYÙÙK—ˆ
ˆ
ŠŠH›ÛˆšXÛÛ›ÜØÚ]]ÈZHœ›ÝÜÙ\ŽŠŠˆ˜[ÛËˆHÙ\YšXØ]HÚ[Ø\™ÛÛ›ÈY[˜[Y[HÝ\Ü]HH]HHœ›ÝÜÙ\ŽÈ[Ü›È[Z]H0ê	Ø[Xš]ÈZH›ÛZK›ÛˆHšYXÚXK—ˆ
ˆ
ŠÊH›Ûˆpìˆ\ÜÙ\™H]]Ùš\›X]ÎŠŠˆ˜[ÛËHÛÛ][œ]YH\œš[]˜[Kˆ[ˆÚ[Ø\™pìˆ™[š\ÜÚ[[È\ÜÙ\™H]]Ùš\›X]Ë\Ø][Y[HÛÛYH]X[[œ]YH[›ÈÙ\YšXØ]ÎÈØ\™X˜™HÙ[\XÙ[Y[H›ÛˆšY]È[	Ù\Ý\››Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚH	Ø\Ý\š\ØÛÈH[ˆÚ[Ø\™ÛÜ™H
Š[ˆÛÛÈ]™[ÊŠ‹ˆ
‹™\Ù[\[Ë˜ÛÛX˜[H\ˆÝÝË™\Ù[\[Ë˜ÛÛXXH
Š››ÛŠŠˆ\ˆ\Ù[\[Ë˜ÛÛX°êH\ˆK˜‹™\Ù[\[Ë˜ÛÛXˆHY[šH™\Ù[H[›Ý™\ØÚ[È[HYYYÛXH[Ú[Ø\™ÚHHÛX[™H[X[›Îˆ[˜HÛÛHÚX]™Hš]˜]H\ˆ]HHÛÝÙÛZ[šHÚYÛšYšXØHÚHHÝXHÛÛ\›ÛZ\ÜÚ[Û™HH\ÜÛ™H
Š]H[œÚY[YJŠ‹Y0êH˜YÚ[Û™H\ˆÝZH[ˆ[XšY[HÙ[œÚXš[HÚH™Y™\š\ØÛÛ›ÈÙ\YšXØ]HÙ\\˜]HÈÐSˆ\ˆHÛÛH›ÛZH™X[Y[H™XÙ\ÜØ\šKˆ‚ˆKˆÂˆYˆMŒKˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“	Ú[™Ü™\ÜÛÈH[ˆ]HÙ[\ˆ0ê›Ý]ÈH[ˆÜ›™[ÈÛÛˆ]Ü™HH˜YÙKXH[™YÚ\Ý›ÈYÛHXØÙ\ÜÚH›ÛˆÜ›˜Nˆ[\œÛÛ˜[HÛÛHpîH™\Ù[ž™Hš\ÚXÚHH]X[HÚX[›ÈHÝš\ØÚX]KˆH[XØ[Y\™H[ÜÝ˜[›ÈÚHH\[™[K\ˆÛÜ\ÚXK[™ÛÛ›È\\HHÜHHÚHHÙYÝYKˆ	Ø^šY[™H[ÛH[ˆÛÛ›ÛÈÚH™[™H[™[›ÛY[›Èš\ÚXØ[Y[H[\ÜÜÚXš[K›ÛˆÛÛÈØÛÜ˜YÙÚX]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ›ÛÈš\ÚXÛÈš\ÛÛ™H[H˜YXÙH[›Ø›[XOÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ[\X[ÈHšY[ÜÛÜ™YÛX[ž˜HÛÛˆ™YÚ\Ý˜^š[Û™HY[Hš\ÛÛ^š[Û™H‹ˆŠH[ˆ™\ÝX›ÛÈHÛÛ›ÛÈXØÙ\ÜÚKÚH[[Y]H[˜H\œÛÛ˜H\ˆ›ÛH‹ˆÊH[˜HØ[\YÛ˜HH›Ü›X^š[Û™HÝ[]šY]ÈH[™\™H\\HHÜH‹ˆ‘
H\ÜÝX\ÛÜšH[]™ZXÛÛÈ[œÝ[]H]˜[H[	Ú[™Ü™\ÜÛÈ[	ÙYYšXÚ[È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[ˆ™\ÝX›ÛÈHÛÛ›ÛÈXØÙ\ÜÚH
XØÙ\ÜÈÛÛ›Û™\ÝX[JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[™[›ÛY[›È\ØÜš]È0ê[
ŠZ[Ø][™ÊŠˆ
È
œYÙÞX˜XÚÚ[™Êˆ]X[™ÈH\œÛÛ˜H]˜[HÛÛX›Ü˜HÛÛœØ\]›ÛY[JKH[™\ÝX›ÛÈHÛÛ›ÛÈXØÙ\ÜÚK›ÝÈ[˜ÚHÛÛYH
›X[˜\
‹0ê	Ý[šXÛÈÛÛ›ÛÈ[	Ù[[˜ÛÈÚHÈ™[™H
Š›YXØØ[šXØ[Y[H[\ÜÜÚXš[JŠ‹ˆ0â[ˆXØÛÛÈØØ[HÛÛˆYHÜH[\˜›ØØØ]NˆHÙXÛÛ™H›ÛˆÚH\™Hš[˜Ú0êHHš[XH›Ûˆ0êÚ]\ØKH[Ú\Ý[XH[[Y]H
Š[˜H\œÛÛ˜H\ˆ›ÛJŠ‹Ü\ÜÛÈÛÛˆ[˜HY[˜HHš[]˜^š[Û™HH\ÛÈÈ[ˆÛÛYÙÚ[ÈÝXÛÈÚH›ØØØH[\ÜØYÙÚ[ÈÙHš[]˜HYH™\Ù[ž™KˆÚH[˜H]™H]][XØ\œÚHHÛÛËHÚHÈÙYÝYH™\ÝHÚ]\ÛÈ[ÜšKÙ[ž˜HÚH™\ÜÝ[›ÈX˜˜H]™\™HÈÙÜ˜Y]›ÛHÛÛ\]ÈH\™HH›ÈH[ˆÛÛYØKˆ0â\Ø][Y[H[™\]Z\Ú]ÈÜÝÈ[	Ø^šY[™Nˆ[\Y\™K›ÛˆØÛÜ˜YÙÚX\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHšY[ÜÛÜ™YÛX[ž˜NŠŠˆ0ê[ˆÛÛ›ÛÈ
Š™]XÝ]™JŠ‹ˆ™YÚ\Ý˜HÚH0ê[˜]ÈH\›Y]HHšXÛÜÝZ\™H	ØXØØY]ËXH™[[ÛY[È[\ÜØYÙÚ[È›Ûˆ™\›XH™\ÜÝ[›Ëˆ[™YÚ\Ý›ÈÛÛ[Y\™X˜™HH›ÛˆÜ›˜\™KÛÛˆ[ˆpîH[ˆš[X]ÈÚHÈÛÛ™™\›XK—ˆ
ˆ
ŠÊH›Ü›X^š[Û™NŠŠˆ0ê[ˆÛÛ›ÛÈ
Š™\™]]›ÊŠ‹HY™œ›ÛH[›Ø›[XH™[[ÈpîHX›ÛKˆ[™\™HHÜHHÚHÚHÙYÝYH0ê[ˆšY›\ÜÛÈÛØÚX[H›ÜKHÚYY\™H[H\œÛÛ™HHÛÛX˜]\›ÈXÚ[™HH›ÛH[Ú[Ü››È›ÙXÙHš\Ý[]H[˜ÛÜÝ[H\ˆYš[š^š[Û™KˆH›Ü›X^š[Û™HY™šX[˜ØH[ÛÛ›ÛÈXÛšXÛË›ÛˆÈÛÜÝ]Z\ØÙK—ˆ
ˆ
Š‘
H\ÜÝX\ÛÜšH[]™ZXÛÛÈ
›Û\™
NŠŠˆ›ÝYÙÛÛ›ÈH[ˆ
Š™ZXÛÛÊŠˆ[˜ÚX]ÈÛÛ›È	ÙYYšXÚ[ËˆÛÛ›È[]È\Ý˜[™ZH[\ÜØYÙÚ[ÈYÛ˜[H]˜]™\œÛÈ[˜HÜHÛÛ›Û]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™ÈÈØÙ[˜\š[ÈÚYYH\ÜXÚ][Y[HH
Šš[\Y\™JŠˆ[žšXÚ0êHš[]˜\™HÈØÛÜ˜YÙÚX\™KØØ\HÝXš]ÈšY[ÜÛÜ™YÛX[ž˜K[[Z[˜^š[Û™KØ\[HH›Ü›X^š[Û™KÚHÛÛ›ÈÛÛ›ÛH]XÝ]™HÈ]\œ™[KHÙ\˜ØH[ÛÛ›ÛÈ
Šœ™]™[]›ÊŠ‹ˆšXÛÜ™H[›Û™HHYH\›Z[šHÙ[Y[Nˆ
ŠZ[Ø][™ÊŠˆHÚHÙYÝYH[˜H[	Ú[œØ\]HHÚHH\\È0­È
ŠœYÙÞX˜XÚÚ[™ÊŠˆHÚHH\\È0êÛÛœØ\]›ÛHHXØÛÛœÙ[Kˆ‚ˆKˆÂˆYˆMŒ‹ˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆXYØ^žš[›È]™H\ÜÙ\™HÛÜ™YÛX]ÈH›ÝK]X[™È0êÛÛ\][Y[H[ÝËˆ[™\ÜÛœØXš[H[HÚXÝ\™^ž˜HÙ\˜ØH[ˆÙ[œÛÜ™HÚHš[]šH[
Š›[Ýš[Y[ÊŠˆH[˜H\œÛÛ˜H[	Ú[\››È[	Ø\™XKÚH[žš[ÛšH[Z[ÈÝ[HHÚH›Ûˆ\[™H[ÛÛ]ÈÛÛˆ[˜HÝ\\™šXÚYNˆ[]š[Y[È0ê\œ™YÛÛ\™HH[ˆ\HØØÝ\]ÈHØØY™˜[]\™KH™[H›ÝH	Ù\Ý]HH[\\˜]\˜H[\›˜HÚH]šXÚ[˜HH]Y[HÛÜœÜ™XKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛ›ÛÙÚXHHÙ[œÛÜ™Hš\ÜÛ™HQQÓSÈH]Y\ÝHš[˜ÛÛOÈ‹ˆÜ[ÛœÎˆÂˆJHÙ[œÛÜ™HH™\ÜÚ[Û™KÚHš[]˜H[\ÛÈHÚHØ[\ÝH[˜HÝ\\™šXÚYH‹ˆŠHÙ[œÛÜ™HHZXÜ›ÛÛ™KÚHš[]˜H[[Ýš[Y[È˜[Z]HÛ™H˜Y[ÈšY›\ÜÙH‹ˆÊHÙ[œÛÜ™H[™œ˜\›ÜÜÛÈ\ÜÚ]›ËÚHš[]˜H[Ø[Ü™HÛÜœÜ™[È[ˆ[Ýš[Y[È‹ˆ‘
HÙ[œÛÜ™HH›Ý\˜H™]šKÚH™XYÚ\ØÙH[Hœ™\]Y[ž˜HXÝ\ÝXØH[™]›È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÙ[œÛÜ™HHZXÜ›ÛÛ™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆÙ[œÛÜ™HH
Š›ZXÜ›ÛÛ™JŠˆ[Y]HÛ™H˜Y[ÈHZ\Ý\˜HH˜\šX^š[ÛšH[ÙYÛ˜[HšY›\ÜÛËš[]˜[™È[
Š›[Ýš[Y[ÊŠˆ[™\[™[[Y[H[HXÙHH[H[\\˜]\˜Kˆ0â	Ý[šXØHÜš[Û™HÛÛ\]Xš[HÛÛˆ]HH™HHš[˜ÛÛH[ÈØÙ[˜\š[Îˆ[žš[Û˜H[Z[ÈÝ[K›ÛˆšXÚYYH[Ý[ˆÛÛ]ÈÛÛˆ[]š[Y[ÈK›Ûˆ˜\Ø[™ÜÚHÝ[Ø[Ü™K›ÛˆšY[™H[™Ø[›˜]È[H[\\˜]\˜H[XšY[[H›ÜÜÚ[XHH]Y[HÛÜœÜ™XKˆÛÜ™H[›Û™H›Û[ZH[\HH]˜]™\œØH\žšX[Y[HX]\šX[H›ÛˆY][XÚK[ÚHZ]]H[ˆ[ˆXYØ^žš[›È[™ÛÛXœ›ÈHØØY™˜[]\™Kˆ[Ý[È›Ý™\ØÚ[È[HYYYÛXKHÛÛ›ÜØÙ\™K0êHÙ[œÚXš[]0èXØÙ\ÜÚ]˜Nˆpìˆš[]˜\™H[Ýš[Y[ÈÛ™H[˜H\™]HÛÝ[HHÙ[™\˜\™H˜[ÚH[\›ZK[Ý]›È\ˆÝZH™YÛH[\X[H™X[HšY[™HÜ\ÜÛÈX˜š[˜]ÈH[ˆ[™œ˜\›ÜÜÛÈ[ˆÛÛ™šYÝ\˜^š[Û™HHÜXHXÛ›ÛÙÚXKÝ™H	Ø[\›YHØØ]HÛÛÈÙH
Š™[˜[XšJŠˆÛÛ˜ÛÜ™[›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÙ[œÛÜ™HH™\ÜÚ[Û™NŠŠˆš[]˜H[
Šœ\ÛÊŠˆÝH[˜HÝ\\™šXÚYK]Z[™HšXÚYYH›Üš[È[ÛÛ]ÈÚHÈØÙ[˜\š[È\ØÛYKHÛÛˆ[ˆ]š[Y[È\œ™YÛÛ\™HHØØÝ\]È[HØØY™˜[]\™HHÛÜ\\˜HØ\™X˜™HY[˜HH›Û™HÚYXÚK—ˆ
ˆ
ŠÊH[™œ˜\›ÜÜÛÈ\ÜÚ]›ÎŠŠˆš[]˜HH˜\šX^š[Û™HH
Š˜Ø[Ü™JŠˆ[ˆ[Ýš[Y[ËH[ˆÛÛ™^š[ÛšH›Ü›X[HØ\™X˜™H[‰ÛÝ[XHØÙ[H[Z[ËˆXHÈØÙ[˜\š[ÈÙYÛ˜[H›Üš[È[Ý[È[ÈX›ÛNˆ]X[™ÈH[\\˜]\˜H[XšY[HÚH]šXÚ[˜HH]Y[HÛÜœÜ™XK[ÛÛ˜\ÝÈ\›ZXÛÈÚH[›[HH[Ù[œÛÜ™H]™[H[˜Y™šYXš[K—ˆ
ˆ
Š‘
HÙ[œÛÜ™HH›Ý\˜H™]šNŠŠˆ0ê[ˆš[]˜]Ü™H
Š˜XÝ\ÝXÛÊŠˆ[X[K\˜]ÈÝ[Hœ™\]Y[ž˜H[H›Ý\˜H[™]›ËˆÛÜ™YÛXH[ˆ˜\˜ÛÈÜXÚYšXÛÈH›Ûˆš[]˜H[Ý[ˆ[Ýš[Y[È[	Ú[\››È[	Ø\™XK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\ÜÛØÚXHÙÛšHÙ[œÛÜ™H[
Š™™[›ÛY[›Èš\ÚXÛÊŠˆÚHZ\Ý\˜K\˜Ú0êH0êH0ëÚH\ØÙ[™Û›ÈHÝ[ÚH[Z]Kˆ
Š’[™œ˜\›ÜÜÛÊŠˆHØ[Ü™H[ˆ[Ýš[Y[Ë[™Ø[›˜]È[ÛÛ˜\ÝÈ\›ZXÛÈšYÝÈ0­È
Š”™\ÜÚ[Û™JŠˆH\ÛËšXÚYYHÛÛ]È0­È
Š“ZXÜ›ÛÛ™JŠˆHÛ™H˜Y[ÈšY›\ÜÙK]˜]™\œØHH\™]HÛÝ[HHpìˆ\™H˜[ÚHÜÚ]]šH0­È
Š•[˜\Ý[ÛšJŠˆHÛ™HÛÛ›Ü™HšY›\ÜÙKÙ[œÚXš[HHÛÜœ™[H	Ø\šXHH[[Ü™Kˆ™[HÛX[™KHÛÛ™^š[Û™H[XšY[[HÚ]]H™[ÈØÙ[˜\š[ËZ[Ë[\\˜]\˜K]š[Y[ËÛÜœ™[H	Ø\šXK0ê]X\ÚHÙ[\™H	Ú[™^š[ÈÚH\ØÛYHÛH[šKˆ‚ˆKˆÂˆYˆMŒËˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆÚ]È[™\ÝšX[H\šY™\šXÛÈÝXš\ØÙHš\]]H\H›Ý\›šHHX]\šX[H[X^ž˜[H\Ý\››Ëˆ[\š[Y]›È0êÙYÛ˜]ÈÛÛÈH[˜HÚY\H˜\ÜØK[X^ž˜[H0ê[Z[ÈHHØÚH[XØ[Y\™H›ÙXÛÛ›È[[XYÚ[šH[][^ž˜Xš[HH›ÝKˆH\™^š[Û™HÚYYH[ˆ[\™[ÈÚHØÛÜ˜YÙÚHH[]]šHš[XH[˜ÛÜ˜HÚH]™[™Ø[›ËHÚH™[ÛÛ[\È™[™HY™šXØXÚHH[XØ[Y\™HÚpè[œÝ[]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛXš[˜^š[Û™HHÛÛ›ÛHš\ÚXÚHš\ÜÛ™HQQÓSÈH[˜[X™HH\ÚYÙ[ž™OÈ‹ˆÜ[ÛœÎˆÂˆJHÛÜÝ]Z\™HH[XØ[Y\™HÛÛˆ[Ù[HHš\ÛÛ^š[Û™HpîH[HHpîH[Y\›ÜÚH‹ˆŠH\ÜÝ[Y\™H[˜HÝX\™XHÚ]\˜]HÚH™\ÚYH	Ú[™Ü™\ÜÛÈ\˜[H	ÛÜ˜\š[ÈHY™šXÚ[È‹ˆÊH™XÚ[žš[Û™H\š[Y]˜[HH[[Z[˜^š[Û™H[X^ž˜[KHÝ\ÜÈ[H[XØ[Y\™H‹ˆ‘
H\ÜÝX\ÛÜšH[]™ZXÛÛÈ]˜[H[HÜ[™\šXHH[Ý˜HØ\[Ûš\ÝXØHH]šY]È‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH™XÚ[žš[Û™H\š[Y]˜[HH[[Z[˜^š[Û™H[X^ž˜[JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHYHZ\Ý\™H]›Ü˜[›ÈÝHX[šH]™\œÚHH[œÚY[YHÛÜ›Û›È[˜[X™HH\ÚYÙ[ž™KˆH
Šœ™XÚ[žš[Û™JŠˆ0ê[œÚY[YH[ˆÛÛ›ÛÈ
Š™]\œ™[JŠˆH
Šœ™]™[]›ÊŠŽˆ™[™H[\š[Y]›È\ÜXÚ]ËØ˜›YØH	Ú[\ÛÈH[ˆ]È[X™\˜]ÈHØØ]˜[Ø[Y[ÈÈYÛ[ËHØ[˜[^ž˜HÛHXØÙ\ÜÚH™\œÛÈHØÚH˜\˜ÚHÛÜ™YÛX]Kˆ	ÊŠš[[Z[˜^š[Û™JŠˆ0ê[ÛÛ›ÛÈ]\œ™[HpîHÛÝÝ˜[]]ÎˆÙÛYHHÛÜ\\˜H[Z[ËÚH0êHÛÛ™^š[Û™HÝHÝZH]Y\ÝH\HÚH™YÙÛÛ›ËH[ÈÝ\ÜÛÈ[\È0ê[
Š›[Û\XØ]Ü™JŠˆÚH™[™H][^ž˜Xš[HH[XØ[Y\™HÚpè[œÝ[]KÙÙÚH[œÙ\šXš[HH›ÝH›Üš[È\ˆX[˜Ø[ž˜HHXÙKˆ0â]Y\ÝÈÙXÛÛ™ÈY™™]ÈHÛÙ\Ù˜\™HHšXÚY\ÝH[H\™^š[Û™HÙ[ž˜HÛÛ\˜\™H[HH[Ý›È[ˆ\›Z[šHHšY[ÜÛÜ™YÛX[ž˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[XØ[Y\™HZYÛ[ÜšHHpîH[Y\›ÜÙNŠŠˆY™œ›ÛH[Ú[Û[ÈØ˜YÛX]Ëˆ[›Ø›[XH›Ý\››È›Ûˆ0êHš\ÛÛ^š[Û™HXH	Ø\ÜÙ[ž˜HHXÙKH[˜H[XØ[Y\˜HpîHYš[š]H[ˆ[ˆX^ž˜[HZ[È›ÙXÙH[[XYÚ[šH™\™HpîHš]YKˆ[›Û™H™\ÝH[ˆÛÛ›ÛÈ\˜[Y[H
Š™]XÝ]™JŠŽˆ›ÛˆØÛÜ˜YÙÚXH[K—ˆ
ˆ
ŠŠHÝX\™XHÚ]\˜]NŠŠˆØ\™X˜™H[ˆÝ[[È]\œ™[KXH™[	ÛÜ˜\š[ÈØ˜YÛX]ËˆH\H]™[™ÛÛ›ÈH›ÝKH[ˆ™\ÚY[È[Z]]È[	ÛÜ˜\š[ÈHY™šXÚ[È›ÛˆÛÜ™H	Ý[šXÛÈ[\˜[È[ˆÝZH[›Ø›[XH\Ú\ÝK—ˆ
ˆ
Š‘
H\ÜÝX\ÛÜšHHØ\[NŠŠˆH
Š™\ÜÝX\ÛÜšJŠˆ›ÝYÙÛÛ›ÈH[ˆ™ZXÛÛÈ[˜ÚX]ÈÛÛ›È[ˆYYšXÚ[ËÚH›Ûˆ0êÚpìˆÚHÝHXØØY[™ËˆH
Š˜Ø\[Ûš\ÝXØJŠˆ0ê[ˆ]\œ™[HX›Û\ÜÚ[[ÈÝHÚHHÚpèXÚ\ÛÈHX˜\™KH™\ÜÝ[˜H[HYHZ\Ý\™HZ]]HH[XØ[Y\™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÚXÝ\™^ž˜Hš\ÚXØHÚH˜YÚ[Û˜HH
ŠœÝ˜]HÛÛ˜Ù[šXÚJŠ‹HHÛX[™HÚYYÛ›ÈÜ\ÜÛÈHÛÛØØ\™H[ÛÛ›ÛÈ™[ÈÝ˜]ÈÚ]\ÝËˆ\š[Y]›ÈH™XÚ[žš[Û™K\ÜÝX\ÛÜšK[[Z[˜^š[Û™H0­È˜\˜ÛÈH™\ÝX›ÛÈHÛÛ›ÛÈXØÙ\ÜÚK˜YÙKÝX\™XH0­È[\››ÈHÙ[œÛÜšKšY[ÜÛÜ™YÛX[ž˜KÙ\œ˜]\™KˆY[šH™\Ù[HÚH	ÊŠš[[Z[˜^š[Û™JŠˆÛÛ\\™H™YÛÛ\›Y[HÛÛYHš\ÜÜÝHÛÜœ™]H]X[™ÈÈØÙ[˜\š[È›ÛZ[˜H]™[H›Ý\›šHÈš\™\ÙH[][^ž˜Xš[H[Z[Ë\˜Ú0êH0ê[œÚY[YH]\œ™[HHÛÛ™^š[Û™H™XÙ\ÜØ\šXH\˜Ú0êHÛH[šHÛÛ›ÛH[žš[Ûš[›Ëˆ‚ˆKˆÂˆYˆMˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆ”’PÓÔ‘È‹ˆØÙ[˜\š[Îˆ‘\˜[HHX[šYšXØ^š[Û™HH[ˆ[\Ü[HYÙÚ[Ü›˜[Y[È[Ú\Ý[XHT”^šY[™[K[X[HUXÚYHHÛÛ™\œ™H[˜HÚ[][^š[Û™HH[ˆ\Ý[ÝHÛÛ›Û]H
šX[[ŠH[ˆ[ˆ[XšY[HHÝYÚ[™È\ÛÛ]Èš[XHHY™™]X\™H[›ÛÝ]Yš[š]]›ÈÝ[H›Ù^š[Û™HH]H	ÛÜ™Ø[š^ž˜^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[H˜]XÚH]šY[žšXH	Ú[\Ü[ž˜HH\ÙYÝZ\™H\Ý™[[Z[˜\šHH›Ý™H[ÝHÝZHØ[XšX[Y[HÚYÛšYšXØ]]šHš[XH[HÜ›ÈÛÛ\]H[\[Y[^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ]XØHHÙYÛY[^š[Û™H[H™]H
™]ÛÜšÈÙYÛY[][ÛˆÛXÞJH‹ˆŠH˜]XÚHHÙ\Ý[Û™HZHØ[XšX[Y[H
Ú[™ÙHX[˜YÙ[Y[˜XÝXÙ\ÊH‹ˆÊH›ÝØÛÛHHš\ÜÜÝHYÛH[˜ÚY[H
[˜ÚY[™\ÜÛœÙH›ÝØÛÛ
H‹ˆ‘
HX[šYšXØ^š[Û™H[HÛÛ[Z]0è^šY[™[H
\Ú[™\ÜÈÛÛ[Z]H[›š[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH˜]XÚHHÙ\Ý[Û™HZHØ[XšX[Y[H
Ú[™ÙHX[˜YÙ[Y[˜XÝXÙ\ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Šœ˜]XÚHHÙ\Ý[Û™HZHØ[XšX[Y[JŠˆ
Ú[™ÙHX[˜YÙ[Y[
HÚHÛÛ˜Ù[˜[›ÈÝ[	Ú[\[Y[^š[Û™HÛÛ›Û]K\Ý]HHØÝ[Y[]HH[ÙYšXÚH[	Ú[™œ˜\Ý]\˜HUˆY™™]X\™H[˜H›Ý˜H™[[Z[˜\™HÈ[ˆ\Ý[ÝH
šX[[ŠH\ˆØ[XšX[Y[H[\Ü[HZ]]HHY[YšXØ\™H[\]H[\™]š\ÝHÝ[\Ú[™\ÜÈš[XH[š[\ØÚ[ÈYš[š]]›ËØ\˜[[™È[˜H˜[œÚ^š[Û™H›ZYHHÚXÝ\˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHHÙYÛY[^š[Û™H[H™]JŠˆ0ê[˜HZ\Ý\˜HH\˜Ú]]\˜HH™]H›ÛHY\ÛÛ\™HÙYÛY[H]™\œÚH\ˆ˜YÚ[ÛšHH\™›Ü›X[˜ÙHHÚXÝ\™^ž˜KXH›ÛˆYš[š\ØÙHH›ØÙY\™HÜ\˜]]™H\ˆ\Ü\™H[ÙYšXÚHÝ]\˜[HZHÚ\Ý[ZK—ˆ
ˆ
ŠÊHHš\ÜÜÝHYÛH[˜ÚY[H
[˜ÚY[™\ÜÛœÙJJŠˆÚHÛÛ˜Ù[˜HÝ[Hš[]˜^š[Û™KÛÛ[š[Y[ÈY\˜YXØ^š[Û™HH[˜HZ[˜XØÚXHÈ[ˆ]XØÛÈ[™›Ü›X]XÛÈ]]›Ë›ÛˆÝ[HX[šYšXØ^š[Û™H[H[ÙYšXÚH[™œ˜\Ý]\˜[K—ˆ
ˆ
Š‘
HHÛÛ[Z]0è^šY[™[H
Ô
JŠˆYš[š\ØÙHH›ØÙ\ÜÚH\ˆØ\˜[\™HHÛÜ˜]š]™[ž˜H^šY[™[H\˜[HHÜÈ[ˆ\Ø\Ý›Ë›ÛˆHY]ÙÛÙÚXH]YÛX]H\ˆ	Ù\ÙXÝ^š[Û™H][ÝYX[˜HHÛÛ›Û]HZH\ÝT”——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆš[XHHYÙÚ[Ü›˜\™HHX]Y›Ü›XHT”^šY[™[HH]™[ÈÛØ˜[K[X[HUÛÛ˜H	Ú[\›È]X˜\ÙH[ˆ[ˆ[XšY[HHÝYÚ[™ÈY\ÙYÝYH	ØYÙÚ[Ü›˜[Y[È[ÝH
šX[[ŠKˆ]Y\ÝÈ\›Y]HHXØÛÜ™Ù\œÚHÚHH[Ý˜H™\œÚ[Û™HX[™H[ˆÜ˜\Ú[[Ù[È\ˆ	Ù[Z\ÜÚ[Û™H[H˜]\™K]š][™È[ˆ\Ø\Ý›È[ˆ›Ù^š[Û™Kˆ‚ˆKˆÂˆYˆMKˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H]][XØHšYÛÜ›ÜØ[Y[HÙÛšH][HHÙÛšH\ÜÜÚ]]›ÈÚHÚHÛÛYØH[	Ù\Ý\››Ëˆ[˜H›ÛHÝ\\˜]È]Y[ÛÛ›ÛË\°ì‹HÛÛ›™\ÜÚ[Û™H[˜H™[H™]H[\›˜HHH0ëpìˆ˜YÙÚ][™Ù\™H]X[[œ]YHÙ\™\ˆÙ[ž˜H[\š[ÜšH™\šYšXÚKˆ\˜[H[ˆ[˜ÚY[K[ˆÜ][HÛÛ\›ÛY\ÜÛÈH[ˆÛÛ[Y\˜ÚX[HH˜YÙÚ][È[ˆØÚHZ[]H[]X˜\ÙH[Hš\ÛÜœÙH[X[™KÙ[ž˜H[˜ÛÛ˜\™H[ˆÛÛÈÛÛ›ÛÈÜÈ	Ø]][XØ^š[Û™H[š^šX[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HØ\˜]\š\ÝXØH[	Ø\˜Ú]]\˜HH\›Y\ÜÛÈ[[Ýš[Y[È]\˜[KHÛÛYHHÛÜœ™YÙÙH[[Ù[È™\›È\ÝÈ‹ˆÜ[ÛœÎˆÂˆJH[‰Ø]][XØ^š[Û™H›ÜÈX›ÛH[\š[Y]›Îˆ˜H˜Y™›Üž˜]HÛÛˆQHpîHÙ]™\˜H‹ˆŠH[˜H›Û˜HHšYXÚXH[\XÚ]H[\›˜Nˆ™\›È\ÝH[[Z[˜H™\šYšXØ[™ÈÙÛšHšXÚY\ÝH‹ˆÊH[˜HX[˜Ø[ž˜HHÚYœ˜]\˜H[˜Y™šXÛÈ[\››Îˆ˜H]]˜]ÈÈœ˜H]HHÙ\™\ˆ‹ˆ‘
H[‰Ø\ÜÙ[ž˜HH™YÚ\Ý˜^š[Û™HYÛHXØÙ\ÜÚNˆ˜[››È˜XØÛÛHHÙÈH]HHÚ\Ý[ZH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[˜H›Û˜HHšYXÚXH[\XÚ]H[\›˜JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Šž›Û˜HHšYXÚXH[\XÚ]JŠˆ

š[\XÚ]\Ý›Û™JŠH0ê	Ø\™XH[ˆÝZKÝ\\˜]È[ˆÛÛ›ÛÈ[š^šX[K[˜Y™šXÛÈÚ\˜ÛÛH
ŠœÙ[ž˜H[\š[ÜšH™\šYšXÚJŠ‹ˆ0â[[Ù[ÈÛ\ÜÚXÛÈ[Ø\Ý[ÈÛÛˆ[›ÜÜØ]ËH[Ý[ÈY™]È0ê\Ø][Y[H]Y[ÈÜÜÙ\˜]Îˆ[ÛÛ›ÛÈÚHÛÛ˜Ù[˜H]È[ˆ[ˆ[ËHÚHÈÝ\\˜KYÚ][X[Y[HÈÛÛˆÜ™Y[žšX[HX˜]KÚH›Ý˜HX™\›ÈH][Ý™\œÚKˆ[[Ù[È
Š–™\›È\Ý
Šˆ˜\ØÙH\ˆX›Û\™H]Y\ÝH›Û˜KÛÜÝ]Y[™ÈHšYXÚXH˜\Ø]HÝ[H
ŠœÜÚ^š[Û™H[ˆ™]JŠˆÛÛˆ[˜H™\šYšXØH
Šœ\ˆÚ[™ÛÛHšXÚY\ÝJŠ‹ˆÙÛšHXØÙ\ÜÛÈ\ÜØHH[ˆ
ŠœÛXÞH[™›Ü˜Ù[Y[Ú[
Š‹ÚH[\œ›ÙØH[
ŠœÛXÞH[™Ú[™JŠˆH[
ŠœÛXÞHYZ[š\Ý˜]ÜŠŠˆš[XHHÛÛœÙ[\™HÈ™YØ\™K˜[][™ÈÙÛšH›ÛHY[]0èÜÝ\˜H[\ÜÜÚ]]›ËÙ[œÚXš[]0è[Hš\ÛÜœØHHÛÛ\ÝËˆ[š\Ý[]È0êH
ŠœšY^š[Û™H[	Ø[Xš]ÈHZ[˜XØÚXJŠˆ

™X]ØÛÜH™YXÝ[ÛŠŠNˆ[Ü][HÛÛ\›ÛY\ÜÛÈ˜YÙÚ][™Ù\™X˜™HÛÛ[ÈÚpìˆÚH]Y[ÛÛ[Y\˜ÚX[H0ê]]Üš^ž˜]ÈH\Ø\™KH[]X˜\ÙH[Hš\ÛÜœÙH[X[™H™\Ý\™X˜™H[ÜšHÜ]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH]][XØ^š[Û™HpîHÙ]™\˜H[\š[Y]›ÎŠŠˆ˜Y™›Üž˜H\Ø][Y[H[[ÈÚHHÚpè[žš[Û˜]Ëˆ[‰ÓQHpîHšYÛÜ›ÜØH›Ûˆ]œ™X˜™HØ[XšX]È[Nˆ[Ü][H\˜H]][XØ]ÈYÚ][X[Y[KY0êÝ]ÈÛÛ\›ÛY\ÜÛÈ
Š™ÜÊŠ‹ˆÙÛšHÛÛ›ÛÈÛÛ˜Ù[˜]È[	Ú[™Ü™\ÜÛÈÛÛ™]šYH]Y\ÝÈ[Z]K—ˆ
ˆ
ŠÊHÚYœ˜]\˜H[˜Y™šXÛÈ[\››ÎŠŠˆ›ÝYÙÙH[H
Šš[\˜Ù]^š[Û™JŠˆ[™ÛÈ[\˜ÛÜœÛËˆ›Ûˆ™YØH[Ý[ˆXØÙ\ÜÛÎˆHÛÛ›™\ÜÚ[Û™H™\œÛÈ[]X˜\ÙH[Hš\ÛÜœÙH[X[™HØ\™X˜™H]™[]HYÝX[Y[KÙ[\XÙ[Y[HÚYœ˜]K—ˆ
ˆ
Š‘
H˜XØÛÛHZHÙÎŠŠˆ0ê[ˆÛÛ›ÛÈ
Š™]XÝ]™JŠ‹[™\Ü[œØXš[H\ˆšXÛÜÝZ\™H	Ú[˜ÚY[KˆXH™YÚ\Ý˜\™H[ˆ[Ýš[Y[È]\˜[H›Ûˆ0ê[\Y\›ÎˆÈØÙ[˜\š[ÈÚYYH\˜Ú0êHÚXHÝ]ÈÜÜÚXš[K›ÛˆÛÛYHØÝ[Y[\›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HH]š\Ú[Û™Hœ˜HHYHX[šH[È™\›È\Ý\˜Ú0êHHÛX[™HH\Ø[›ÈÜ\ÜÛËˆ[
ŠœX[›ÈHÛÛ›ÛÊŠˆXÚYNˆÛXÞH[™Ú[™KÛXÞHYZ[š\Ý˜]Ü‹Y[]0èY]]˜KXØÙ\ÜÛÈÝZY]ÈHÛXÞKˆ[
ŠœX[›È]JŠˆ\ÙYÝYNˆÛÙÙÙ]ÈÈÚ\Ý[XKÛXÞH[™›Ü˜Ù[Y[Ú[›Û™HHšYXÚXH[\XÚ]HÚH[[Ù[È[HH[[Z[˜\™KˆHY[šHHY[H[š[˜Ú\[ÈšX\ÜÝ[]›Ë
Š›™]™\ˆ\Ý[Ø^\È™\šYžJŠŽˆ[ˆ™\›È\ÝHÜÚ^š[Û™H[ˆ™]H›ÛˆÛÛ™™\š\ØÙH[Ý[ˆš]š[YÚ[ËH›Ý˜\œÚH™[›×ˆ›ÛˆÚYÛšYšXØHpîH[Kˆ‚ˆKˆÂˆYˆM‹ˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ[[Z[š\Ý˜]Ü™H[ÙYšXØHHØX˜]È[˜H™YÛÛH[š\™]Ø[\š[Y]˜[H\ˆØ›ØØØ\™H[ˆ›Ü›š]Ü™HÚHÚH[Y[]˜Kˆ[™Y0ë[‰Ø\XØ^š[Û™HH›Ù^š[Û™H›Ûˆ[žš[Û˜HpîK™\ÜÝ[›ÈØH\˜Ú0êKHÙ\›Û›ÈÙZHÜ™H\ˆš\Ø[\™H[HØ]\ØKˆH[ÙYšXØH›Ûˆš\Ý[H[ˆ[Ý[ˆ™YÚ\Ý›Ë›Ûˆ0êÝ]H˜[]]HH™\ÜÝ[›ÈH	Ø[[Z[š\Ý˜]Ü™H›Ûˆ]™]˜H	Ø]]Üš]0è›Ü›X[H\ˆXÚY\™HÝ[\š[Y]›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[[Y[È[›ØÙ\ÜÛÈHÙ\Ý[Û™H[H[ÙYšXÚH0êX[˜Ø]È\ˆ’SSÏÈ‹ˆÜ[ÛœÎˆÂˆJH[›ØÙ\ÜÛÈH\›Ý˜^š[Û™KÛÛˆ[ˆ]Û\™H[H[ÙYšXØH›Ü›X[Y[H[™]šYX]È‹ˆŠHHš[™\Ý˜HHX[][žš[Û™K[ˆÝZH\ÙYÝZ\™H	Ú[\™[ÈÙ[ž˜H\ÜÙ\š^šH‹ˆÊH[X[›ÈH˜XÚÛÝ]ÚH]œ™X˜™H\›Y\ÜÛÈH[›[\™H˜\Y[Y[HH[ÙYšXØH‹ˆ‘
H	ØYÙÚ[Ü›˜[Y[ÈZHXYÜ˜[[ZHH™]HÜÈ	Ù\ÙXÝ^š[Û™H[H[ÙYšXØH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[›ØÙ\ÜÛÈH\›Ý˜^š[Û™KÛÛˆ[ˆ]Û\™H[H[ÙYšXØJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ]HH]X]›ÈHÜš[ÛšH\ØÜš]›Û›È[[Y[H™X[H[HÙ\Ý[Û™H[H[ÙYšXÚKXHÛÛÈ[˜H0êX[˜Ø]H
Šœ\ˆš[XJŠˆHH™\ÛÈÜÜÚXš[H]HH[™HX[˜Ø[ž™Kˆ[
Šœ›ØÙ\ÜÛÈH\›Ý˜^š[Û™JŠˆ0êHÜH	Ú[™Ü™\ÜÛÎˆ0ê[[ÛY[È[ˆÝZH[˜H[ÙYšXØH›ÜÜÝHšY[™H™YÚ\Ý˜]K˜[]]H\ˆ[Ý[È[\]ËÛÝÜÜÝH[H\H[\™\ÜØ]HH]]Üš^ž˜]HHÚH™HH	Ø]]Üš]0è\XØ[Y[H[ˆÛÛZ]]ÈÛÛœÝ[]›È\ˆH[ÙYšXÚKˆÙ[ž˜H]Y[\ÜØYÙÚ[ÈH[ÙYšXØH›Ûˆ\Ú\ÝH\ˆ	ÛÜ™Ø[š^ž˜^š[Û™KH[™˜]H›ÛˆÛÛ\\™H[ˆ[Ý[ˆ™YÚ\Ý›ËˆH
Š]Û\š]0è
Šˆ

›ÝÛ™\œÚ\
ŠH0ê	Ø[˜HY]0èˆÙÛšH[ÙYšXØH]™H]™\™H[˜H\œÛÛ˜HY[YšXØ]HÚH™Hš\ÜÛ™KH]Y[H\œÛÛ˜H]™H]™\™H	Ø]]Üš]0èÝ[	Ø[Xš]ÈØØØ]Ëˆ]ZH	Ø[[Z[š\Ý˜]Ü™HHYÚ]ÈÝH[ˆÚ\Ý[XH\š[Y]˜[HÚH›ÛˆÛHÛÛ\]]˜KH]X[™È	Ø\XØ^š[Û™HÚH0ê›ÝH›ÛˆÉÙ\˜H™\ÜÝ[ˆ]Û\™HHÝZHš\Ø[\™K[ÚHÜYYØHHÛÛÈHÙZHÜ™HHXYÛ›ÜÚK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHš[™\Ý˜HHX[][žš[Û™NŠŠˆÙ\™HH
Šœ]X[™ÊŠˆ\ÙYÝZ\™HH[ÙYšXØKÛÛ˜Ù[˜[™È[š\ØÚ[ÈH\ÜÙ\š^š[È[ˆ[ˆ[\˜[ÈÛÛ˜ÛÜ™]ÈHÛÛ][šXØ]Ëˆ0âX[˜Ø]H[˜Ú	Ù\ÜØKXH0ê[ˆ[[Y[ÈÚHÚH\XØH
™ÜÊˆÚH[˜H[ÙYšXØH0êÝ]H\›Ý˜]K—ˆ
ˆ
ŠÊHX[›ÈH˜XÚÛÝ]ŠŠˆ0êHšXH	Ý\ØÚ]H™\\˜]H[ˆ[XÚ\È\ˆÜ›˜\™H[ÈÝ]È™XÙY[KˆØ\™X˜™HÝ]È™^š[ÜÛÈ[[™Y0ëX][˜KXH0ê[ˆ™\]Z\Ú]ÈÚH[›ØÙ\ÜÛÈH\›Ý˜^š[Û™H
Šœ™][™JŠˆš[XHH]]Üš^ž˜\™NˆÙ[ž˜H\›Ý˜^š[Û™K™\ÜÝ[›ÈÈHXZHÚY\ÝË—ˆ
ˆ
Š‘
HYÙÚ[Ü›˜[Y[ÈZHXYÜ˜[[ZNŠŠˆ\\Y[™H[H
Š™ØÝ[Y[^š[Û™HÝXØÙ\ÜÚ]˜JŠˆ[H[ÙYšXØKˆ0âHØ]\ØH\ˆÝZHH›ÜÜÚ[XH\œÛÛ˜H›Ý™\°è[˜H™]H]™\œØHH]Y[H\ÙYÛ˜]K›ÛˆHØ]\ØH[\ÜÙ\š^š[ÈHÙÙÚK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HHÙ\]Y[ž˜H[›ØÙ\ÜÛÈ™[	ÛÜ™[™H[ˆÝZHÛÛ\PHÈ™\Ù[K\˜Ú0êHHÛX[™HÚYYÛ›ÈÜ\ÜÛÈ]X[H\ÜØYÙÚ[ÈÚXHX[˜Ø]Ëˆ
Š”šXÚY\ÝJŠˆ[H[ÙYšXØH0­È
Š[˜[\ÚH	Ú[\]ÊŠˆHÛÛœÝ[^š[Û™H[H\H[\™\ÜØ]H0­È
Š\›Ý˜^š[Û™JŠˆH\H[	Ø]]Üš]0èÛÛ\][KÛÛˆ]Û\™H[™]šYX]È0­È
Š•\Ý
Šˆ[ˆ[XšY[H›Ûˆ›Ù]]›ËÛÛˆš\Ý[]HØÝ[Y[]H0­È
Š”X[›ÈH˜XÚÛÝ]
Šˆ™Y\ÜÜÝÈ0­È
Š‘\ÙXÝ^š[Û™JŠˆ™[Hš[™\Ý˜HHX[][žš[Û™H0­È
Š•™\šYšXØJŠˆH
Š˜YÙÚ[Ü›˜[Y[È[HØÝ[Y[^š[Û™JŠ‹ˆH[ÙYšXØH\™Ù[Wˆ˜]HØX˜]ÈÙ[ž˜H™YÚ\Ý˜\›H›Ûˆ0ê[˜HØÛÜ˜ÚX]ÚXNˆ0êH˜YÚ[Û™H\ˆÝZH™\ÜÝ[›ÈØ\°èXZH\˜Ú0êH]X[ÛÜØHÚH0ê›ÝËˆ‚ˆKˆÂˆYˆMËˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ’[ˆ[‰Ø^šY[™KH›ØÙY\˜H\ˆ\XØ\™HH]ÚY[œÚ[HZHÙ\™\ˆ\Ú\ÝHÛÛ[È™[H\ÝHHYH[[Z[š\Ý˜]ÜšH\Ü\KˆÙÛ[›ÈH\ÙYÝYHH[ÙÈÝ[Ë	Ù\Ú]È\[™HHÚH0êH\››ÈK\˜[HH™\šYH\Ý]™K[ˆÛÛYØHY[›È\Ü\ÈHØ[]ÈH™\šYšXØHÝXØÙ\ÜÚ]˜H[šX]š[È\ØÚX[™ÈYHÙ\š^šH™\›ZH\ˆ[ˆÚ[Ü››ËˆH\™^š[Û™H[ÛHÚH	Ø]]š]0èÚXH\ÙYÝZ]H[ÈÝ\ÜÛÈ[ÙÈHÚ][œ]YKHÚHHÝXHÛÜœ™]^ž˜H›Ûˆ\[™H[	Ù\Ü\šY[ž˜H[™]šYX[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÝ[Y[È[HÙ\Ý[Û™H[H[ÙYšXÚHš\ÜÛ™HH]Y\ÝH\ÚYÙ[ž˜OÈ‹ˆÜ[ÛœÎˆÂˆJH[˜HÛ]XØHHÚXÝ\™^ž˜HÚHXÚX\šH	ÛØ˜›YÛÈH\XØ\™HH]ÚY[œÚ[H‹ˆŠH[˜Hš[™\Ý˜HHX[][žš[Û™HÛÛ˜ÛÜ™]HÛÛˆH[žš[ÛšH^šY[™[H[\™\ÜØ]H‹ˆÊH[˜H›ØÙY\˜HÜ\˜]]˜HÝ[™\™
ÓÔ
HÚH\ØÜš]˜H	Ø]]š]0è\ÜÛÈ\ˆ\ÜÛÈ‹ˆ‘
H[‰Ø[˜[\ÚH	Ú[\]ÈÚH˜[]HHÛÛœÙYÝY[ž™H[	Ø\XØ^š[Û™H[H]Ú‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH[˜H›ØÙY\˜HÜ\˜]]˜HÝ[™\™
ÓÔ
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Š”ÓÔ
Šˆ

œÝ[™\™Ü\˜][™È›ØÙY\™JŠH0ê[ØÝ[Y[ÈÚH\ØÜš]™H
Š˜ÛÛYJŠˆ\ÙYÝZ\™H[‰Ø]]š]0èšXÛÜœ™[K\ÜÛÈÜÈ\ÜÛËÛÛˆHÛÛX[™HH\Ø\™KH™\šYšXÚHH˜\™HHÙÛšH\KHÜš]\šH\ˆØ\\™HÙH0ê[™]H™[™HHÛÜØH˜\™HÙH›Ûˆ0ê[™]H™[™Kˆš\ÜÛ™HH[˜[X™HH\ÚYÙ[ž™HÜÝH[H\™^š[Û™Kˆ™[™H	Ù\ÙXÝ^š[Û™H
Šœš\]Xš[JŠ‹\˜Ú0êHÚ][œ]YHHÙYÝXHÝY[™HÈÝ\ÜÛÈš\Ý[]ËH]Y\ÝÈ[[Z[˜HH˜\šX[ž˜Hœ˜HHYH[[Z[š\Ý˜]ÜšKˆH™[™H	Ø]]š]0è
Š˜\Ù™\šXš[JŠ‹\˜Ú0êHHÛÛ›ÜØÙ[ž˜HÛY]HHš\ÚYY\™H™[HY[[ÜšXHHYH\œÛÛ™HH]™[H[ˆ™[™H[	ÛÜ™Ø[š^ž˜^š[Û™K\ÜÛšXš[H[˜ÚHYYÛÜÝËˆH™\šYšXØHÜÈ[šX]š[ËØ[]H[ÛÛYØHY[›È\Ü\Ë[ˆ[˜HÓÔ0ê[ˆ\ÜØYÙÚ[È\ÜXÚ]ÈÛÛˆ[ˆ\Ú]ÈH™YÚ\Ý˜\™K›Ûˆ]X[ÛÜØHHšXÛÜ™\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÛ]XØNŠŠˆÝXš[\ØÙH[
Š˜ÚHÛÜØJŠˆH[
Šœ\˜Ú0êJŠˆH]™[È\™]]›Ë\ˆ\Ù[\[ÈšHÙ\™\ˆ]›Û›È\ÜÙ\™HYÙÚ[Ü›˜]H[›È™[HÚ[Ü›šH[š[\ØÚ[È[H]Ú‹ˆ0â™XÙ\ÜØ\šXKXH›ÛˆXÙHH™\ÜÝ[›ÈÛÛYH˜\›ËY0ê›Üš[È[
˜ÛÛYJˆÚH]ZH˜\šXHH\œÛÛ˜HH\œÛÛ˜K—ˆ
ˆ
ŠŠHš[™\Ý˜HHX[][žš[Û™NŠŠˆÝXš[\ØÙH
Šœ]X[™ÊŠˆ[\™[š\™KšYXÙ[™È	Ú[\]ÈÝ[Ù\š^š[Ëˆ›ÛˆH[Ý[ˆY™™]ÈÝ[H]X[]0èHÝ[	Ý[šY›Ü›Z]0è[	Ù\ÙXÝ^š[Û™NˆHÝ\ÜØH]]š]0è˜]HX[H™\ÝH˜]HX[H[˜ÚH[›ÈHš[™\Ý˜HÚ]\ÝK—ˆ
ˆ
Š‘
H[˜[\ÚH	Ú[\]ÎŠŠˆ˜[]H[ˆ[XÚ\È
Šœ]X[HÛÛœÙYÝY[ž™JŠˆ]œ°è[˜H[ÙYšXØHHÝH]X[HÚ\Ý[ZKY0ê[ˆ\ÜØYÙÚ[È[	Ø\›Ý˜^š[Û™KˆšYÝX\™HHXÚ\Ú[Û™HH›ØÙY\™K›ÛˆH\Ý^š[ÛšHÛÛˆÝZHÚH›ØÙYK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHH]X]›È]™[H[HØÝ[Y[^š[Û™K\˜Ú0êHHÛX[™HHXØÛÜÝ[›ÈHÛÛ[[Ëˆ
Š”Û]XØJŠˆHÚHÛÜØHH\˜Ú0êK\™]]˜HHØ˜›YØ]ÜšXH0­È
Š”Ý[™\™
ŠˆH™\]Z\Ú]HZ\Ý\˜Xš[HHš\Ü]\™K\ˆ\Ù[\[ÈH[™Ú^ž˜HZ[š[XH[HÚX]šH0­È
Š”›ØÙY\˜HÈÓÔ
ŠˆHÛÛYK\ÜÛÈ\ˆ\ÜÛËØ˜›YØ]ÜšXH0­È
Š“[™XHÝZYJŠˆH˜XØÛÛX[™^š[ÛšK›Ûˆš[˜ÛÛ[Kˆ]X[™ÈÈØÙ[˜\š[È[Y[Hš\Ý[]H
Šš[˜ÛÙ\™[Hœ˜H\œÛÛ™H]™\œÙJŠˆÚHÝ›ÛÛÛ›ÈHÝ\ÜØH]]š]0èHš\ÜÜÝH0ê]X\ÚHÙ[\™HH›ØÙY\˜K›ÛˆHÛ]XØKˆ‚ˆKˆÂˆYˆMŽˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[˜H[ÙYšXØH[	Ø\XØ^š[Û™HH˜]\˜^š[Û™HšY[™HÛÝÜÜÝH[ÛÛZ]]ÈH\›Ý˜^š[Û™KˆHšXÚY\ÝH0êÛÛ\]NˆÉðê[]Û\™K	Ø[˜[\ÚH	Ú[\]ËHš[™\Ý˜HHX[][žš[Û™HH[ˆX[›ÈH˜XÚÛÝ]]YÛX]Ëˆ[H›ØÙH™\Ú]È[H™\šYšXÚH[ˆ[XšY[HHÛÛ]Y×ˆ[šXÚYY[HHØÜš]È››Ûˆ™XÙ\ÜØ\š[Ë[ÙYšXØHZ[š[XW‹ˆ[ÛÛZ]]È™\Ü[™ÙHHšXÚY\ÝKˆ‹ˆ]Y\Ý[ÛŽˆ”\˜Ú0êH[ÛÛZ]]ÈH˜]È™[™HH™\Ü[™Ù\›K›Û›ÜÝ[H]HÛH[šH[[Y[H›ÜÜÙ\›È™\Ù[OÈ‹ˆÜ[ÛœÎˆÂˆJH\˜Ú0êHHš\Ý[]HZH\ÝÛÛ›È	Ý[šXØH›Ý˜HÚHH[ÙYšXØH[žš[Û˜HÛÛYH™]š\ÝÈ‹ˆŠH\˜Ú0êH[˜H[ÙYšXØHZ[š[XHšXÚYYHÛÛ][œ]YH[˜Hš[™\Ý˜HHX[][žš[Û™HpîH[™ØH‹ˆÊH\˜Ú0êH[X[›ÈH˜XÚÛÝ]›Ûˆ0ê˜[YÈÙH›Ûˆ0ê\›Ý˜]È[]Û\™H[Ú\Ý[XH‹ˆ‘
H\˜Ú0êH	Ø[˜[\ÚH	Ú[\]È]™H\ÜÙ\™Hš\]]HÙÛšH›ÛH[ÛÛZ]]ÈÝ\ÜÛÈ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH\˜Ú0êHHš\Ý[]HZH\ÝÛÛ›È	Ý[šXØH›Ý˜HÚHH[ÙYšXØH[žš[Û˜HÛÛYH™]š\ÝÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛH[šH[[Y[H[HšXÚY\ÝHš\ÜÛ™Û›ÈHÛX[™H]™\œÙNˆÚHš\ÜÛ™H[H[ÙYšXØKÛÜØHÝ™X˜™HØØØ\™K]X[™È\ÙYÝZ\›KÛÛYHÜ›˜\™H[™Y]›Ëˆ™\ÜÝ[›ÈH\ÜÚHXÙH
ŠœÙHH[ÙYšXØH[žš[Û˜JŠ‹ˆÛÛÈH
Šœš\Ý[]HZH\Ý
Šˆ[ˆ[ˆ[XšY[HÙ\\˜]È[H›Ù^š[Û™H›Ü›š\ØÛÛ›È]Y[H›Ý˜KH\ˆ]Y\ÝÈ[ÛÛZ]]ÈH™][™HÛÛYH]šY[ž˜HØÝ[Y[]K›ÛˆÛÛYH˜\ÜÚXÝ\˜^š[Û™H™\˜˜[Kˆ[[Ý]›È\ˆÝZH›[ÙYšXØHZ[š[XWˆ›Ûˆ0ê[‰Ù\Ù[žš[Û™HXØÙ]Xš[H0êÝ]\ÝXÛÈš[XH[˜ÛÜ˜HÚHY]ÙÛÙÚXÛÎˆÜ˜[ˆ\HYÛH[˜ÚY[H˜\ØÙHH[ÙYšXÚHÚ]YXØ]H˜[˜[HHÚHH›ÜÛ™K›Üš[È\˜Ú0êHHÜ›È\\™[HÙ[\XÚ]0èÜHHØ[\™HH™\šYšXÚKˆHH˜[]^š[Û™HHZ[š[X[]0è\œš]˜HHÚHHØÜš]ÈH[ÙYšXØKÚ[ðê[H\œÛÛ˜HY[›È[ˆÜ˜YÈH™Y\›™HÛHY™™]HÛÛ]\˜[Kˆ[ˆ[\š[Ü™HY™™]È˜]XÛÎˆÚH›ÛˆHXZH\ÙYÝZ]ÈH[ÙYšXØH[ˆÛÛ]YÈ›ÛˆH™[[Y[›ÈXZH
Šœ›Ý˜]È[X[›ÈH˜XÚÛÝ]
Š‹ÚHH]Y[[È0ê[ˆØÝ[Y[Ë›Ûˆ[˜HšXH	Ý\ØÚ]H™\šYšXØ]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHš[™\Ý˜HHX[][žš[Û™HpîH[™ØNŠŠˆ0ê[‰ØY™™\›X^š[Û™HÙ[ž˜H›Û™[Y[ËHØ\Ý›ÛÙHHÙÚXØKˆH\˜]H[Hš[™\Ý˜HÚH[Y[œÚ[Û˜HÝ[	Ú[\™[ÈHÝ[[\ÈHš\š\Ý[›ÈÝ[X]ÎÈ[˜H[ÙYšXØH™X[Y[HXØÛÛH™HšXÚYYH[˜Hœ™]™K—ˆ
ˆ
ŠÊH˜XÚÛÝ]\›Ý˜]È[]Û\™H[Ú\Ý[XNŠŠˆ	Ø\›Ý˜^š[Û™H[X[›È˜H\H[›ØÙ\ÜÛËXHÈØÙ[˜\š[ÈXÙHÚH[X[›ÈH˜XÚÛÝ]0ê™\Ù[HH]YÛX]Ëˆ›Ûˆ0ê]Y\ÝÈ	Ù[[Y[ÈØ\™[K—ˆ
ˆ
Š‘
H[˜[\ÚH	Ú[\]Èš\]]H[ÛÛZ]]ÎŠŠˆ[ÛÛZ]]È
Š˜[]JŠˆ	Ø[˜[\ÚH	Ú[\]Ë›ÛˆHš\ØÜš]™KˆH[˜ÚH[ˆ]Y\ÝÈØ\ÛÈ	Ø[˜[\ÚH0ê™\Ù[NˆHXÝ[˜H0ê[›Ý™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šH™\Ù[HÚH™[HÙ\Ý[Û™H[H[ÙYšXÚHÙÛšH[[Y[Èš\ÜÛ™HH[˜HÛX[™H\Ý[KY0êÛÜðëÚHHÛX[™H	Ù\Ø[YHHÚYYÛ›ÈH[™]šYX\™H]Y[ÈX[˜Ø[Kˆ]Û\™HH
Š˜ÚJŠˆ™Hš\ÜÛ™H0­È[˜[\ÚH	Ú[\]ÈH
Š˜ÛÜØJŠˆpìˆ›Û\\œÚH0­Èš\Ý[]HZH\ÝH
Š™[žš[Û˜OÊŠˆ0­ÈX[›ÈH˜XÚÛÝ]H
Š˜ÛÛYHÜ››È[™Y]›ÊŠˆ0­Èš[™\Ý˜HHX[][žš[Û™HH
Šœ]X[™ÊŠˆ0­ÈYÙÚ[Ü›˜[Y[È[HØÝ[Y[^š[Û™HH
Š˜ÛÜØH™\ÝHØÜš]ÈÜÊŠ‹ˆY™šYHÙ[\™H[HÚ]\ÝYšXØ^š[Û™H°ê[˜H[ÙYšXØHXØÛÛWŽˆ™[ÛÛ\ÝÈ	Ù\Ø[YH0ê[ˆ[™XØ]Ü™HHš\ØÚ[Ë›Ûˆ[‰Ø][X[Kˆ‚ˆKˆÂˆYˆMŽKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[X[HHÚXÝ\™^ž˜H[ÛH\Ø]]˜\™HÈKŒHKŒHÝH]HHÙ\™\ˆÙXˆ^šY[™[KÛÛYHšXÚY\ÝÈ[ÈÝ[™\™[\››Ëˆ\˜[H	Ø[˜[\ÚH	Ú[\]È[Y\™ÙHÚH[ˆ\›Z[˜[HH›Ù^š[Û™H›Ü›š]È]Z[™XÚH[›šH˜K[˜ÛÜ˜H[™\Ü[œØXš[H[H[™XHHÛÛ™™^š[Û˜[Y[ËÝ\ÜHÛÛ[ÈÈKŒH›Ûˆ0êYÙÚ[Ü›˜Xš[Nˆ[ÛÜÝ]Ü™H›Ûˆ\Ú\ÝHpîHH[š\›]Ø\™H0êÚ]\ÛËˆ‹ˆ]Y\Ý[ÛŽˆÛÛYH˜HÙ\Ý]H]Y\ÝHÚ]X^š[Û™H™[›ØÙ\ÜÛÈH[ÙYšXØOÈ‹ˆÜ[ÛœÎˆÂˆJHš[šX[™È	Ú[\˜H[ÙYšXØHš[˜Ú0êH[\›Z[˜[H›ÛˆØ\°èÛÜÝ]Z]È‹ˆŠH\Ø]]˜[™ÈÈKŒÝ[œ]YNˆHÛÛ™›Ü›Z]0è[ÈÝ[™\™™]˜[HÝ[™\ÝÈ‹ˆÊHÚYY[™È[›Ü›š]Ü™H[\›Z[˜[H[ˆYÙÚ[Ü›˜[Y[È[š\›]Ø\™H[›ÈHš[™\Ý˜H‹ˆ‘
HØÝ[Y[[™ÈH\[™[ž˜HYØXÞHH\ÛÛ[™È[\›Z[˜[HÛÛˆÛÛ›ÛHÛÛ\[œØ]]šH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HØÝ[Y[[™ÈH\[™[ž˜HYØXÞHH\ÛÛ[™È[\›Z[˜[HÛÛˆÛÛ›ÛHÛÛ\[œØ]]šJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š˜\XØ^š[ÛšHYØXÞJŠˆÛÛ›È[˜H[H[\XØ^š[ÛšHXÛšXÚHÚHÛÛ\PH[[˜ØH\ÜXÚ][Y[Hœ˜HÚpìˆÚHHÙ\Ý[Û™H[H[ÙYšXÚH]™HØ\\ˆY™œ›Û\™KY0ê›Üš[È	Ø[˜[\ÚH	Ú[\]ÈY]™\›HÜ]H[HXÙHš[XHÚHØ]\Ø\ÜÙH[ˆ™\›[È[™XKˆHš\ÜÜÝHÛÜœ™]H›Ûˆ0ê[˜HÛÛHÛÜØK0ê[˜HÛÜXKˆš[XK
Š™ØÝ[Y[\™HH\[™[ž˜JŠŽˆ]Y\ÝÈ\›Z[˜[H˜H™YÚ\Ý˜]ÈÛÛYHXØÙ^š[Û™H›ÝKÛÛˆH[Ý]˜^š[Û™K[š\ØÚ[ÈXØÙ]]Ë[]Û\™HÚHÙHÈ\ÜÝ[YHH[˜H]HHšY\Ø[YKˆ[˜H\[™[ž˜HYØXÞH›ÛˆØÝ[Y[]HšX\\™H[›ÜÜÚ[[ÈØ[XšX[Y[ËÛÛˆÈÝ\ÜÛÈY™™]ÈHÈÝ\ÜÛÈÝ\Ü™KˆÚK
Šš\ÛÛ\™HÛÛˆÛÛ›ÛHÛÛ\[œØ]]šJŠŽˆ[\›Z[˜[H˜HÜÜÝ]È[ˆ[ˆÙYÛY[ÈYXØ]Ë˜YÙÚ][™ÚXš[HÛÛÈZHÚ\Ý[ZHÚH™H[››È]™\›Èš\ÛÙÛ›ËÛÛˆ[Ûš]Ü˜YÙÚ[ÈÜXÚYšXÛÈ[Ý[È˜Y™šXÛËˆÛÜðëH[ÙYšXØH›ØÙYHÝH]È[™\ÝÈ[	Ú[™œ˜\Ý]\˜KÚH0ê[NIH[\˜ÛËH[š\ØÚ[È™\ÚY[È™\ÝHÛÛ™š[˜]ÈH[ˆ\š[Y]›ÈXØÛÛËÛÜ™YÛX]ÈHÛÛœØ\]›ÛK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHš[šX\™H	Ú[\˜H[ÙYšXØNŠŠˆ\ØÚXH
Š]JŠˆHÙ\™\ˆ\ÜÜÝHH›ÝØÛÛHX›ÛH\ˆ›ÝYÙÙ\™H[ˆÚ[™ÛÛÈ\\˜]Ëˆ0â[Ø\ÛÈÛ\ÜÚXÛÈ[ˆÝZH	ÙXØÙ^š[Û™H]HYÙÙH[H™YÛÛNˆHÛÜÝ]^š[Û™HH[ˆ\›Z[˜[H[™\ÝšX[HšXÚYYHY\ÚHÈ[›šKH™[œ˜][\È[š\ØÚ[È0êX\ÜÚ[[È›Üš[ÈÝZHÚ\Ý[ZH\ÜÜÝK—ˆ
ˆ
ŠŠH\Ø]]˜\™HÝ[œ]YHÙ[ž˜HXØÙ^š[ÛšNŠŠˆ™\›XHH[™XHHÛÛ™™^š[Û˜[Y[Ëˆ[ˆ[ˆ[XšY[H[™\ÝšX[HH
Š™\ÜÛšXš[]0è
ŠˆHHÚXÝ\™^ž˜Hš\ÚXØH™[™ÛÛ›Èš[XH[HÛÛ™›Ü›Z]0èH[›ÈÝ[™\™[\››ËH[˜H[ÙYšXØHÚH›ØØØHH›Ù^š[Û™HšY[™H™]›ØØ]H	Ý\™Ù[ž˜H[›ÈØÚHÜ™K^ž™\˜[™È[˜ÚHH\H[Û˜H[]›Ü›Ë—ˆ
ˆ
ŠÊHÚYY\™H[ˆYÙÚ[Ü›˜[Y[È[›Ü›š]Ü™NŠŠˆÈØÙ[˜\š[È\ØÛYH]Y\ÝHšXH[H˜YXÙKˆ[ÛÜÝ]Ü™H›Ûˆ\Ú\ÝHpîHH[š\›]Ø\™H0êÚ]\ÛÎˆ›ÛˆÉðê™\ÜÝ[›ÈHÝZHÚYY\™KH›ÙÜ˜[[X\™HH[ÙYšXØHÝH[˜Hš\ÜÜÝHÚH›Ûˆ\œš]™\°èÚYÛšYšXØH›Ûˆ]™\›H›ÙÜ˜[[X]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ]X[™È	Ø[˜[\ÚH	Ú[\]Èš]™[H[˜H
Š™\[™[ž˜HYØXÞH›ÛˆYÙÚ[Ü›˜Xš[JŠ‹Hš\ÜÜÝHÛÜœ™]H›Ûˆ0êXZH°êHš[[˜ÚX\™H[H[ÙYšXØH°êHYÛ›Ü˜\™HH\[™[ž˜Kˆ0âÙ[\™HHÝ\ÜØHÛÜXNˆ
Šœ›ØÙY\™HÝ[™\ÝÊŠˆH
Šš\ÛÛ\™H	ÙXØÙ^š[Û™HÛÛˆÛÛ›ÛHÛÛ\[œØ]]šHØÝ[Y[]HHH\›Z[™JŠ‹ˆšXÛÜ™H[›Û™HÚHH[\XØ^š[ÛšHXÛšXÚHH˜[]\™H[ˆÙÛšH[ÙYšXØHÛÛ›ÈÙ[\™HHÝ\ÜÙNˆ\ÝHH]]Üš^ž˜^š[Û™HHH›ØØÛË]]š]0è[Z]]K™\›ZHHÙ\š^š[ËšX]šZHHÙ\š^šHH\XØ^š[ÛšK\XØ^š[ÛšHYØXÞHH\[™[ž™Hœ˜HÚ\Ý[ZKˆ‚ˆKˆÂˆYˆMÌˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘\˜[H[˜Hš[™\Ý˜HHX[][žš[Û™H›Ý\›˜K[ˆ[[Z[š\Ý˜]Ü™H[ÙYšXØH[ˆ\˜[Y]›ÈHÛÛ™šYÝ\˜^š[Û™H[	Ø]][XØ^š[Û™HÝH[ˆÙ\™\‹ˆ™\šYšXØHÚH[š[HÚXHÛÜœ™]ËÛÛœÚY\˜HÛÛ˜Û\ØH	Ø]]š]0èHÚ]YHHš[™\Ý˜KˆHX][˜HÜÈ[ÛÛ\Ü[Y[È[Ú\Ý[XH0ê[˜ÛÜ˜H]Y[È™XØÚ[ËˆpîH\™K[ˆšX]š[È]]ÛX]XÛÈX[šYšXØ]È\XØHš[˜[Y[HH[Ý˜HÛÛ™šYÝ\˜^š[Û™K[ˆY[›ÈÜ˜\š[ÈH]›Ü›ËH™H\XØ^š[ÛšHÚH\[™Û›ÈH]Y[Ù\š^š[ÈØYÛ›ÈÛÛ[\Ü˜[™X[Y[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[\XØ^š[Û™HXÛšXØH[H[ÙYšXØH0êÝ]H˜\ØÝ\˜]OÈ‹ˆÜ[ÛœÎˆÂˆJH	ØYÙÚ[Ü›˜[Y[È[HØÝ[Y[^š[Û™HÜÈH[ÙYšXØH[HÛÛ™šYÝ\˜^š[Û™H‹ˆŠH[šX]š[È[Ù\š^š[ËÛÛˆH\[™[ž™HÚH™HÝXš\ØÛÛ›È	ÙY™™]È‹ˆÊHH™XÙ\ÜÚ]0èH[‰Ø[˜[\ÚH	Ú[\]ÈÝ[\˜[Y]›ÈH]][XØ^š[Û™H‹ˆ‘
H	Ú[œÙ\š[Y[È[Ù\™\ˆ[ˆ[˜H\ÝHH]]Üš^ž˜^š[Û™HYÙÚ[Ü›˜]H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[šX]š[È[Ù\š^š[ËÛÛˆH\[™[ž™HÚH™HÝXš\ØÛÛ›È	ÙY™™]ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ\ˆ[Û\ÜÚ[ZHÙ\š^šHHÛÛ™šYÝ\˜^š[Û™HšY[™H]H
Š˜[	Ø]š[ÊŠˆH[]H[ˆY[[ÜšXNˆ[ÙYšXØ\™H[š[H›ÛˆØ[XšXH[ÛÛ\Ü[Y[È[›ØÙ\ÜÛÈÚpè[ˆ\ÙXÝ^š[Û™Kˆ0â]Y\ÝHH˜YÚ[Û™HZHYHÚ[ÛZH\\™[[Y[HØÛÛYØ]H[ÈØÙ[˜\š[Ëˆ[X][›È[Ú\Ý[XHÚHÛÛ\Ü]˜H[˜ÛÜ˜H˜ÛÛYHš[XWˆ\˜Ú0êH[Ù\š^š[ÈÚ\˜]˜HÛÛˆH™XØÚXHÛÛ™šYÝ\˜^š[Û™H[ˆY[[ÜšXNÈHH[ÙYšXØH0êÚH[˜]H[ˆšYÛÜ™H™[[ÛY[ÈYÙÚ[Ü™K\˜Ú0êH[šX]š[È0ê]™[]È\ˆÛÛÈÝ[Ë[ÜšH[Hš[™\Ý˜HHX[][žš[Û™HH[ˆY[›ÈÜ˜\š[ÈH]›Ü›Ëˆ[šX]š[ÈH[ˆÙ\š^š[È˜H]Z[™H˜]]ÈÛÛYH\H[YÜ˜[H[H[ÙYšXØK\ÙYÝZ]È
Š™[›ÊŠˆHš[™\Ý˜HHÙYÝZ]ÈH[˜H™\šYšXØH\ÜXÚ]H[[Ý›ÈÛÛ\Ü[Y[ËˆHÙXÛÛ™HY]0è[›Ø›[XHÛÛ›ÈH
Š™\[™[ž™JŠŽˆ™H\XØ^š[ÛšHÚH\ÙÙÚX]˜[›ÈH]Y[Ù\š^š[ËH™\ÜÝ[˜HH\ÜÙHÛÛ\\š]˜H™[HšXÚY\ÝHH[ÙYšXØKˆ[˜H[ÙYšXØH›Ûˆš[š\ØÙHÝ[Ú\Ý[XHÚHÚHØØØK\œš]˜Hš[ˆÝ™H\œš]˜HHØ][˜HHÚH™H\[™KY0ê	Ø[˜[\ÚH	Ú[\]ÈHÝ™\›HX\\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHYÙÚ[Ü›˜[Y[È[HØÝ[Y[^š[Û™NŠŠˆ0ê[˜HXÝ[˜HÚHÚHYØHpîH]˜[K]X[™È]X[Ý[ˆ[›ÈYÙÙ\°è[˜H\ØÜš^š[Û™H›ÛˆpîH™\š]Y\˜Kˆ›ÛˆH[Ý[ˆ[ÛÈ™[\ÜÙ\š^š[È[HX][˜K—ˆ
ˆ
ŠÊH[˜[\ÚH	Ú[\]ÈÝ[\˜[Y]›ÎŠŠˆ0ê\žšX[Y[H™\˜HH™H0êHØ]\ØHH[ÛK\˜Ú0êH]œ™X˜™HÝ]Èš]™[\™HH™H\[™[ž™KˆXHHÛX[™HÚYYH]X[H
Šš[\XØ^š[Û™HXÛšXØJŠˆÚXHÝ]H˜\ØÝ\˜]H™[	Ù\ÙXÝ^š[Û™KH]Y[H0ê[šX]š[ËÚH0êX[˜Ø]ÈX]\šX[Y[HHH›ÙÝÈ[˜[XšHÛHY™™]K—ˆ
ˆ
Š‘
H\ÝHH]]Üš^ž˜^š[Û™NŠŠˆšYÝX\™H]X[H›ÙÜ˜[[ZHÈ[™\š^žšHÚX[›È[[Y\ÜÚKˆ0â[‰Ø[˜H[\XØ^š[Û™HXÛšXØH™]š\ÝH[›ØÙ\ÜÛËXH™[ÈØÙ[˜\š[È™\ÜÝ[›ÈšY[™H›ØØØ]ÈH[˜H\ÝNˆ[›Ø›[XH0ê[˜HÛÛ™šYÝ\˜^š[Û™HXZH[˜]H[ˆšYÛÜ™H[[ÛY[ÈÚ]\ÝË——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[\\˜HHY[[ÜšXH	Ù[[˜ÛÈ[H[\XØ^š[ÛšHXÛšXÚHH[˜H[ÙYšXØK\˜Ú0êHHÛX[™H™H\ÛÛ[›È[˜H[H›ÛNˆ\ÝHH]]Üš^ž˜^š[Û™HHH›ØØÛË]]š]0è[Z]]K™\›[È[Ù\š^š[Ë
ŠœšX]š[ÈHÙ\š^š[ÊŠ‹
ŠœšX]š[ÈH\XØ^š[Û™JŠ‹\XØ^š[ÛšHYØXÞK
Š™\[™[ž™JŠ‹ˆHšXÛÜ™HH™YÛÛH˜]XØHÚH™H\ØÙ[™Nˆ[˜H[ÙYšXØHHÛÛ™šYÝ\˜^š[Û™H›Ûˆ0êÛÛ˜Û\ØH]X[™È[š[H0êØ[˜]ËXH]X[™È[Ù\š^š[È0êÝ]ÈšX]šX]È
Š™[›ÈHš[™\Ý˜JŠˆH[[Ý›ÈÛÛ\Ü[Y[È0êÝ]È™\šYšXØ]Ëˆ‚ˆKˆÂˆYˆMÌKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“HÛÛ™šYÝ\˜^š[ÛšHHš\™]Ø[ÝÚ]ÚHš[[˜ÚX]ÜšHH[‰Ø^šY[™H™[™ÛÛ›È[ÙYšXØ]HHX[›ÈHØ[˜]HÛÛYHÛÜYH]]HÝH[˜HÛÛ™]š\Ú[Û™HH™]KÛÛˆ›ÛZHÛÛYHË\\š[Y]›ËYY‹]ŒËQ’SSK[ÚË˜Ù™ØˆÜÈ[ˆ\ÜÙ\š^š[Ë™\ÜÝ[›ÈšY\ØÙHHÝXš[\™H]X[H™\œÚ[Û™H›ÜÜÙH]]˜Hš[XH[	Ú[\™[ËÚHX˜šXH[›ÙÝÈHšYØH[˜Üš[Z[˜]H°êH]X[™ËˆH\™^š[Û™H[ÛHÝ\ˆš\ÜÛ™\™HÙ[\™HH™HÛX[™NˆÚHHØ[XšX]ÈÛÜØK]X[™ËHÛÛYHÚHÜ›˜H[™Y]›Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜]XØH[HÙ\Ý[Û™H[H[ÙYšXÚHš\ÜÛ™HH]HH™HHÛX[™OÈ‹ˆÜ[ÛœÎˆÂˆJH[ÛÛ›ÛÈH™\œÚ[Û™H\XØ]ÈZHš[HHÛÛ™šYÝ\˜^š[Û™HYÛH\\˜]H‹ˆŠH[ˆ˜XÚÝ\›Ý\››ÈÛÛ\]È[HÛÛ™]š\Ú[Û™HH™]HÚHÜÜ]HHš[H‹ˆÊH[˜HÛÛ™[žš[Û™HH[›ÛZ[˜^š[Û™HpîHšYÛÜ›ÜØH\ˆH›ÛZHZHš[HØ[˜]H‹ˆ‘
HH™\Ýš^š[Û™H[HÛÛ™]š\Ú[Û™HZHÛÛH[[Z[š\Ý˜]ÜšHH™]H]]Üš^ž˜]H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[ÛÛ›ÛÈH™\œÚ[Û™H
™\œÚ[ÛˆÛÛ›Û
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š˜ÛÛ›ÛÈH™\œÚ[Û™JŠˆ0ê	Ý[šXØH˜]XØHÚHš\ÜÛ™HH]HH™HHÛX[™HÜÝH[H\™^š[Û™KHšHš\ÜÛ™H\ˆÛÜÝ^š[Û™K›Ûˆ\ˆ[YÙ[ž˜HHÚHÈ\ØKˆÛÛœÙ\˜H
Š›ÙÛšJŠˆÝ]ÈÝXØÙ\ÜÚ]›ÈH[ˆš[KH\ˆÚX\ØÝ[›È™YÚ\Ý˜H
Š˜]]Ü™JŠ‹
Š™]HHÜ˜JŠˆH[ˆ
Š›Y\ÜØYÙÚ[ÊŠˆÚH™HÜYYØHH˜YÚ[Û™NˆH]ZH™[™ÛÛ›ÈHš\ÜÜÝHHÚHH]X[™Ëˆ\›Y]HHÛÛ™œ›Û\™HYH™\œÚ[ÛšH]X[ÚX\ÚHH[ÜÝ˜\™H\Ø][Y[HHšYÚHØ[XšX]NˆH]ZHHš\ÜÜÝHHÛÜØKˆHÛÛœÙ[HHš\Ü\™H[š[HH[›ÈÝ]È™XÙY[HÛÛˆ[‰ÛÜ\˜^š[Û™H˜XØÚX]K[ÚH˜\Ù›Ü›XH[X[›ÈH˜XÚÛÝ]H›ÛY\ÜØHH›ØÙY\˜HH[ˆÛÛX[™Ëˆ\XØ]È[HÛÛ™šYÝ\˜^š[ÛšHH™]K\XØ[Y[HÛÛˆ[ˆ™\ÜÚ]ÜžHÚ]H[‰Ù\ÜÜ^š[Û™H]]ÛX]XØH\š[ÙXØHYÛH\\˜]K™[™H[˜ÚH[[YYX][Y[Hš\ÚXš[HH[ÙYšXÚH\ÙYÝZ]HHX[›È[ÜšH›ØÙ\ÜÛË\˜Ú0êHÛÛ\Z[Û›ÈÛÛYHY™™\™[ž™HÚH™\ÜÝ[›ÈH™YÚ\Ý˜]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH˜XÚÝ\›Ý\››ÎŠŠˆÛÛœÙ\˜H
Š[˜H›ÝÙÜ˜YšXH[Ú[Ü››ÊŠ‹HÛÛˆ\ÜØHÛÛÈ	Ý[[[ÈÝ]ÈØ[˜]Ëˆ›ÛˆXÙHÚHX˜šXH[ÙYšXØ]ÈÛÜØK›Ûˆ\Ý[™ÝYHYH[ÙYšXÚH˜]HÈÝ\ÜÛÈÚ[Ü››ÈH›Ûˆ[ÜÝ˜H[Ý[˜HY™™\™[ž˜Hœ˜H™\œÚ[ÛšKˆ\›Y]H[pîHHÜ›˜\™HHY\šKÙ[ž˜HØ\\™HÚHÛÜØHÚHÝXH\™[™Ë—ˆ
ˆ
ŠÊHÛÛ™[žš[Û™HH[›ÛZ[˜^š[Û™NŠŠˆ™[™HH›ÛZHpîHÜ™[˜]HHšY[	Ø[›ËˆHÝÜšXHÛÛ[Y\™X˜™HHš\ÚYY\™H[ˆš[HÙ\\˜]KH]\›š]0è™\Ý\™X˜™HYÛ›ÝHHQ’SSK[ÚØ]™[\™X˜™HÙ[\XÙ[Y[H[ˆ[›ÈÝY™š\ÜÛÈ\XØ]ÈÛÛˆHÝ\ÜØH[˜ÛÜÝ[ž˜K—ˆ
ˆ
Š‘
H™\Ýš[™Ù\™H	ØXØÙ\ÜÛÈ[HÛÛ™]š\Ú[Û™NŠŠˆ0ê[ˆÛÛ›ÛÈ	ØXØÙ\ÜÛÈÙ[œØ]ÈH˜H˜]ÈÛÛ][œ]YKXHšYXÙH
Š˜ÚHpìŠŠˆ[ÙYšXØ\™HÙ[ž˜H™YÚ\Ý˜\™H
Š˜ÚHÛÜØJŠˆ0êÝ]È[ÙYšXØ]ËˆÜÈ[\ÜÙ\š^š[ÈH™HÛX[™H™\Ý\™X˜™\›È]HÙ[ž˜Hš\ÜÜÝK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ›ÛˆÛÛ™›Û™\™H
Š˜˜XÚÝ\
ŠˆH
Š˜ÛÛ›ÛÈH™\œÚ[Û™JŠ‹\˜Ú0êHHÛX[™HHXØÛÜÝ[›ÈÜ\ÜÛÈHÙ[Xœ˜[›ÈÚ[Z[HÛÛÈ[ˆÝ\\™šXÚYKˆ[
Š˜˜XÚÝ\
ŠˆÙ\™H[š\š\Ý[›ÈÜÈ[˜H\™]HHÛÛœÙ\˜HÝ]H\š[ÙXÚH0­È[
Š˜ÛÛ›ÛÈH™\œÚ[Û™JŠˆÙ\™H[H
Š˜XØÚXXš[]0è
ŠˆHÛÛœÙ\˜HHÝÜšXHÛÛ\]HÛÛˆ]]Ü™K]HH[Ý]›ÈHÙÛšHØ[XšX[Y[Ëˆ]X[™ÈÈØÙ[˜\š[ÈÚYYH
Š˜ÚHHØ[XšX]ÈÛÜØHH]X[™ÊŠ‹Hš\ÜÜÝH0êÙ[\™H[ÛÛ›ÛÈH™\œÚ[Û™Kˆ0â[›Û™H[›Û™[Y[ÈÝHÝZHÙÙÚXH	Ú[™œ˜\Ý]\˜HÛÛYHÛÙXÙKÝ™HÙÛšH[ÙYšXØH[	Ú[™œ˜\Ý]\˜H0ê\ˆYš[š^š[Û™H[˜H[ÙYšXØH˜XØÚX]HH[ˆš[Kˆ‚ˆKˆÂˆYˆMÌ‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘YHÙ\™\ˆ]›Û›ÈÝXš[\™H[ˆØ[˜[HÚYœ˜]ÈÝH[˜H™]HX˜›XØKˆ›Ûˆ[››ÈXZHÛÛ][šXØ]Èš[XHH›ÛˆÛÛ™]šYÛ›È[Ý[ˆÙYÜ™]Ëˆ[™\]Z\Ú]ÈÜÝÈ[X[HHÚXÝ\™^ž˜H0ê\XÙNˆ]›Û›È\œš]˜\™HH[˜HÚX]™HÚ[[Y]šXØHÛÛ][™HÙ[ž˜HXZH˜\ÛY]\›KH[ˆ]XØØ[HÚH[ˆ]\›ÈÝ[™\ÜÙHHÚX]™Hš]˜]H[Ù\™\ˆ›Ûˆ]™HÝ\ˆXÚYœ˜\™HHÙ\ÜÚ[ÛšH™YÚ\Ý˜]H[ˆ\ÜØ]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HYXØØ[š\Û[ÈÜš]ÙÜ˜YšXÛÈÛÙ\Ù˜H[˜[XšHH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJH[›ÈØØ[Xš[ÈHÚX]šHY™šYKR[X[ˆY™š[Y\›ËÚHØ\˜[\ØÙH›ÜØ\™ÙXÜ™XÞH‹ˆŠHHÚYœ˜]\˜H[HÚX]™HÚ[[Y]šXØHÛÛˆQTËLMˆš[XHH˜\ÛY]\›H[ˆ™]H‹ˆÊH	Ú\Ú[™È[HÚX]™HÛÛˆÒKLMˆH[ˆØ[ÛÛ™]š\ÛÈœ˜HHYHÙ\™\ˆ‹ˆ‘
H[ˆÙ\YšXØ]È]]Ùš\›X]È[œÝ[]ÈÝH[˜[XšHHÙ\™\ˆ\ˆ]][XØ\œÚH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[›ÈØØ[Xš[ÈHÚX]šHY™šYKR[X[ˆY™š[Y\›ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ
Š‘Y™šYKR[X[ŠŠˆš\ÛÛ™H[ˆ›Ø›[XHÚHHš[XHš\ÝHÙ[Xœ˜H[\ÜÜÚXš[Nˆ˜\ˆ\œš]˜\™HYH\H[H
ŠœÝ\ÜØHÚX]™HÙYÜ™]HÙ[ž˜HXZH˜\›HšXYÙÚX\™JŠ‹ˆÚX\ØÝ[˜HÙ[™\˜H[ˆ˜[Ü™Hš]˜]Ë™H\š]˜H[›ÈX˜›XÛÈHÈ[šXH[	Ø[˜NÈÜ˜^šYH[H›ÜšY]0èX][X]XÚH[	ÛÜ\˜^š[Û™K[˜[X™HØ[ÛÛ[›È[™\[™[[Y[HÈÝ\ÜÛÈÙYÜ™]ÈÛÛ™]š\ÛËY[™HÚH[\˜Ù]H™YHÛÛ[ÈH˜[ÜšHX˜›XÚKZH]X[HšXØ]˜\™H[ÙYÜ™]È0êÛÛ\]^š[Û˜[Y[H›ÚXš]]›Ëˆ]Y\ÝÈÛÜ™H[š[[È™\]Z\Ú]Ëˆ[ÙXÛÛ™ÈÈÛÜ™HH˜\šX[H
Š™Y™š[Y\˜JŠˆ
HÈPÑJNˆHÛÜYHH˜[ÜšH™[™ÛÛ›ÈÙ[™\˜]H[Ý™H
Šœ\ˆÙÛšHÙ\ÜÚ[Û™JŠˆHØØ\]H[\›Z[™Kˆ™HÛÛœÙYÝYHH
Š™›ÜØ\™ÙXÜ™XÞJŠŽˆÚXÚ0êHHÚX]™HHÙ\ÜÚ[Û™H›Ûˆ0êXZHÝ]H\š]˜]H[HÚX]™Hš]˜]HH[™ÛÈ\›Z[™H[Ù\™\‹ÚH[ˆ]\›ÈÝ™\ÜÙH[\Y›Ûš\œÙ[™H›Ûˆ]œ™X˜™H[Ý[ˆ[ÙÈHXÚYœ˜\™H[˜Y™šXÛÈ™YÚ\Ý˜]ÈY\ÚHš[XKˆÙÛšHÙ\ÜÚ[Û™H0ê[ˆÛÛ\\[Y[ÈÝYÛ›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHÚYœ˜\™HHÚX]™HÚ[[Y]šXØHÛÛˆQTÈš[XHH[šX\›NŠŠˆ0ê[ˆ˜YÚ[Û˜[Y[ÈÚ\˜ÛÛ\™KˆQTÈ0êÚ[[Y]šXÛË]Z[™H\ˆÚYœ˜\™H]Y[HÚX]™HÙ\š\™X˜™H
Š[‰Ø[˜JŠˆÚX]™HÛÛ™]š\ØKÚHHYH\H›Ûˆ[››Îˆ0ê\Ø][Y[H[›Ø›[XHÚHÚHÝHÙ\˜Ø[™ÈHš\ÛÛ™\™K—ˆ
ˆ
ŠÊH\Ú[™ÈÛÛˆÒKLMˆHØ[ŠŠˆ	Ú\Ú[™È0ê[˜H[žš[Û™HH
ŠœÙ[œÛÈ[šXÛÊŠˆHÙ\™HH™\šYšXØ\™H[YÜš]0èÈ\ÜÝÛÜ™›ÛˆHÛÛ˜ÛÜ™\™H[ˆÙYÜ™]ËˆH[ˆ\Ú›ÛˆÚHÜ›˜H[™Y]›Ë]Z[™H™\ÜÝ[›ÈZHYHÙ\™\ˆÝ™X˜™H\Ø\›È\ˆÚYœ˜\™HHXÚYœ˜\™K—ˆ
ˆ
Š‘
HÙ\YšXØ]È]]Ùš\›X]ÎŠŠˆšYÝX\™H	ÊŠ˜]][XØ^š[Û™JŠ‹Ú[ðê›Ý˜\™HÛÛˆÚHÚHÝH\›[™ËÚH0ê[ˆ›Ø›[XH]™\œÛÈHÛÛ\[Y[\™Kˆ[ˆÙ\YšXØ]È›Ûˆ›ÙXÙHH\ˆðêH[˜HÚX]™HHÙ\ÜÚ[Û™KH[ˆ[˜HÛÛ™šYÝ\˜^š[Û™H”ÐHÛ\ÜÚXØHÙ[ž˜HØØ[Xš[ÈY™š[Y\›ÈHÛÛ\›ÛZ\ÜÚ[Û™H]\˜H[HÚX]™Hš]˜]H™[™\™X˜™HXÚYœ˜Xš[H]È[˜Y™šXÛÈ\ÜØ]Îˆ\Ø][Y[HÚpìˆÚH[™\]Z\Ú]ÈšY]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šHÙ\\˜]HH™HÛÛ\]HÚHHÜš]ÙÜ˜YšXHÝ›ÛÙH[›È[˜HÛÛ›™\ÜÚ[Û™HË\˜Ú0êHHÛX[™HHY\ØÛÛ[›ÈHÛÛ[[Ëˆ
Š”ØØ[Xš[ÈHÚX]šJŠˆHÛÛ˜ÛÜ™\™HHÚX]™HHÙ\ÜÚ[Û™KÛÛˆHÈPÑH0­È
Š]][XØ^š[Û™JŠˆH›Ý˜\™H	ÚY[]0è[Ù\™\‹ÛÛˆÙ\YšXØ]HHš\›YH”ÐHÈPÑÐH0­È
ŠÚYœ˜]\˜HHX\ÜØJŠˆH›ÝYÙÙ\™HH]H™\šHÛÛˆ[ˆ[ÛÜš][ÈÚ[[Y]šXÛÈÛÛYHQTËˆ]X[™ÈÈØÙ[˜\š[È›ÛZ[˜HH
Š™XÚYœ˜]\˜H]\˜HHÙ\ÜÚ[ÛšH\ÜØ]JŠ‹Hš\ÜÜÝH0êÙ[\™HÈØØ[Xš[ÈHÚX]šH
Š™Y™š[Y\›ÊŠˆHH›ÜØ\™ÙXÜ™XÞKˆ‚ˆKˆÂˆYˆMÌËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘\˜[H[˜H™]š\Ú[Û™KX™[›Ý˜H™HÛÛ™šYÝ\˜^š[ÛšNˆ[ˆÙ\š^š[ÈÚH\ØHQTÈÛÛˆÚX]™HHLŽš][›ÈÚH\ØH”ÐHÛÛˆÚX]™HHŒš]H[›ÈÚH\ØHTÈHMˆš]ˆ[ˆÛÛYØH›ÜÛ™HHÜ\™H]ÈHŒš]œ\ˆ[šY›Ü›Z]0è‹ÛÜÝ[™[™ÈÚH[˜HÚX]™HQTÈHLŽš]ÚXHpîHX›ÛHH[˜H”ÐHHŒš]\˜Ú0êH[[Y\›È0êpîHXØÛÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜[]^š[Û™H0êXÛšXØ[Y[HÛÜœ™]OÈ‹ˆÜ[ÛœÎˆÂˆJH[ÛÛYØHH˜YÚ[Û™NˆH\š]0èH[ÛÜš][ËpîHš]ÚYÛšYšXØ[›ÈÙ[\™HpîHÚXÝ\™^ž˜H‹ˆŠHH[™Ú^ž™H›ÛˆÛÛ›ÈÛÛ™œ›ÛXš[Hœ˜H[ÛÜš]ZH]™\œÚNˆQTËLLŽ0ê›Ø\ÝËTÈHMˆš]›È‹ˆÊH]HH™HHÛÛ™šYÝ\˜^š[ÛšHÛÛ›È\]Z]˜[[K\˜Ú0êH\Ø[›ÈÚYœ˜\šHH›ØØÚH[Ù\›šH‹ˆ‘
H”ÐHHŒš]0ê[œÚXÝ\›Îˆ\ˆ\ÜÙ\™HXØÙ]Xš[H[˜HÚX]™H]™HÝ\\˜\™HHMˆš]‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHH[™Ú^ž™H›ÛˆÛÛ›ÈÛÛ™œ›ÛXš[Hœ˜H[ÛÜš]ZH]™\œÚJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH[™Ú^ž˜H[HÚX]™HÚHpìˆÛÛ™œ›Û\™HÛÛÈ
Š˜[	Ú[\››È[ÈÝ\ÜÛÈ[ÛÜš][ÈÈ[HÝ\ÜØH˜[ZYÛXJŠ‹\˜Ú0êHHY™šXÛÛ0è[	Ø]XØÛÈ\[™H[HX][X]XØHÛÝÜÝ[K›Ûˆ[[Y\›ÈHš][ˆðêKˆ™[HÜš]ÙÜ˜YšXH
ŠœÚ[[Y]šXØJŠˆ	Ø]XØÛÈZYÛ[Ü™H0ê\ÜÙ[žšX[Y[HH›Üž˜Hœ]HÝ[	Ú[\›ÈÜ^š[È[HÚX]šK]Z[™HLŽš]ÚYÛšYšXØ[›È—ŒLŽÜÜÚXš[]0èˆ[ˆ˜[Ü™HÚH™\ÜÝ[˜HØ\XÚ]0èHØ[ÛÛÈ™]™YXš[Hpìˆ\Ø]\š\™KY0ê\ˆ]Y\ÝÈÚH
ŠQTËLLŽ0ê]Ü˜HÛÛœÚY\˜]È›Ø\ÝÊŠ‹ˆ™[HÜš]ÙÜ˜YšXH
Š˜\Ú[[Y]šXØJŠˆHÚXÝ\™^ž˜H›Ûˆ\š]˜H[H›Üž˜Hœ]HXH[HY™šXÛÛ0èH˜]Üš^ž˜\™H[ˆ[Y\›ÈÜ˜[™K\ˆÝZHÙ\›Û›ÈÚX]šH[ÛÈpîH[™ÚH\ˆÝ[™\™H[˜H›Ø\Ý^ž˜H\˜YÛÛ˜Xš[Nˆ
Š””ÐKLŒÙ™œ™H[	Ú[˜Ú\˜ØHHÝ\ÜØH›Ý^š[Û™HHQTËLLLŠŠ‹H
Š””ÐKLÌÌŠŠˆ0ê	Ù\]Z]˜[[H\›ÜÜÚ[X]]›ÈHQTËLLŽˆ[™\›È›Ø›[XH[H™]š\Ú[Û™H0ê[\ž›ÈØ\ÛÎˆ
Š‘TÈHMˆš]
ŠˆH[›ÈÜ^š[ÈHÚX]šH\Ø]\šXš[HÛÛˆ\™Ø\™HYXØ]ËY0êÛÛœÚY\˜]È›ÝÈHXÙ[›šKˆÜ\™HQTÈHŒš]\˜[›Ë›Ûˆ0ê™[[Y[›ÈÜÜÚXš[NˆQTÈ[[Y]HÛÛÈÚX]šHHLŽNLˆÈMˆš]—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHpîHš]YÝX[HpîHÚXÝ\™^ž˜NŠŠˆ˜[H
Š˜H\š]0èH[ÛÜš][ÊŠ‹H	ÛÜš[Û™H\Ý[™H[™Xš][Y[HH™YÛÛHHÛÛ™œ›ÛHœ˜H[ÛÜš]ZH]™\œÚKˆ˜H[›Û™HšXÛÜ™]ÈÚHHÚX]šHpîH[™ÚHÛÜÝ[›È[ˆ™\Ý^š[ÛšKHHØÙ[HÛÜœ™]H0êHÚX]™HYYÝX]H[HZ[˜XØÚXHH[H\˜]H[]Ë›ÛˆHpîH[™ØHÜÜÚXš[K—ˆ
ˆ
ŠÊH]H\]Z]˜[[H\˜Ú0êHÚYœ˜\šHH›ØØÚH[Ù\›šNŠŠˆ0ê˜[ÛÈYH›ÛKˆ”ÐH›Ûˆ0ê[ˆÚYœ˜\š[ÈH›ØØÚHXH[ˆ[ÛÜš][È\Ú[[Y]šXÛËHTÈ›ÛˆH[HH[Ù\››Îˆ0ê›Üš[È	Ø[™[ÈX›ÛHZH™K—ˆ
ˆ
Š‘
H”ÐKLŒ[œÚXÝ\›ÈÛÝÈHMˆš]ŠŠˆ”ÐKLŒ0êH]	ÛÙÙÚHÛÛœÚY\˜]ÈYYÝX]È\ˆHXYÙÚ[Üˆ\HYÛH\ÚKÛÛˆ[˜HZYÜ˜^š[Û™H™\œÛÈÌÌˆš]˜XØÛÛX[™]H\ˆH›Ý^š[Û™HH[™ÛÈ\›Z[™Kˆ[Ø[ÈHMˆš]›Ûˆ0ê[ˆ™\]Z\Ú]ÈÙ[™\˜[HHÛÛ\ÜH[ˆÛÜÝÈÛÛ\]^š[Û˜[HÙ[œÚXš[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[[Üš^ž˜HÛHÜ™[šHHÜ˜[™^ž˜H[	Ù\]Z]˜[[ž˜K\˜Ú0êHšXÛÜœ›Û›ÈÜ\ÜÛÎˆQTËLLŽ8¢b”ÐKLÌÌˆ8¢bÝ\˜H[]XØHHMˆš]0­ÈQTËLMˆ8¢b”ÐKLMLÍŒ8¢bÝ\˜H[]XØHHLLˆš]ˆ™H\ØÙ[™H[[Ý]›È˜]XÛÈ\ˆÝZHH
Š˜Üš]ÙÜ˜YšXHHÝ\˜H[]XØJŠˆÚH0êY™\ØNˆÝY[™HHÝ\ÜØH›Ø\Ý^ž˜HÛÛˆÚX]šH[ÛÈpîHÛÜK[ÚHH™[™HY]HH\ÜÜÚ]]šH[Øš[HH[ÕˆHšXÛÜ™HÛH[ÛÜš]ZHHÛÛœÚY\˜\™HÝ\\˜]H[ˆÙÛšHÛX[™NˆTËÑTËÍQHHÒKLKˆ‚ˆKˆÂˆYˆMÍˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[ØØ[HÚHÜÜ]HH˜\ÝšHH˜XÚÝ\H[ˆ\Ý]]Èš[˜[žšX\š[È]™H\ÜÙ\™HXØÙ\ÜÚXš[HÛÛÈHYH\œÛÛ™HÛÛ[\Ü˜[™X[Y[KXZHH[˜HÛÛKˆ[™\]Z\Ú]È˜\ØÙHH[ˆ\\ÛÙ[È[ˆÝZH[ˆÚ[™ÛÛÈY]È]]Üš^ž˜]È]™]˜HÛÝ˜]È[ˆ˜\Ý›ÈÙ[ž˜HÚH™\ÜÝ[›ÈÙH™HXØÛÜ™Ù\ÜÙKˆH\™^š[Û™H[ÛH[›Û™H[˜HšYÝ\˜H[ˆÜ˜YÈH˜[]\™HÚ]X^š[ÛšH[\™]š\ÝK\ˆ\Ù[\[È[ˆ›Ü›š]Ü™HÚHÚYYHH[˜\™H\ˆ[‰Ý\™Ù[ž˜H›Ûˆ›ÙÜ˜[[X]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛXš[˜^š[Û™HHÛÛ›ÛHš\ÚXÚHš\ÜÛ™HH[˜[XšHH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ˜YÙHH›ÜÜÚ[Z]0è\ˆÚX\ØÝ[›ÈZHYHY]H]]Üš^ž˜]H[ØØ[H‹ˆŠH[ˆ[\X[ÈHšY[ÜÛÜ™YÛX[ž˜HÛÛˆ™YÚ\Ý˜^š[Û™HÛÛ[XHHÛÛœÙ\˜^š[Û™HHLÚ[Ü›šH‹ˆÊH[ˆÙ[œÛÜ™HH[Ýš[Y[ÈH[™œ˜\›ÜÜÚHÛÛYØ]È[HÙ[˜[HH[\›YH‹ˆ‘
H[˜HÝX\™XHHÚXÝ\™^ž˜H[ˆ™\ÚY[ËÛÛˆ™YÛÛHH[YÜš]0èHYH\œÛÛ™H[	Ú[™Ü™\ÜÛÈ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H[˜HÝX\™XHHÚXÝ\™^ž˜KÛÛˆ™YÛÛHH[YÜš]0èHYH\œÛÛ™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ÙXÛÛ™È™\]Z\Ú]È0ê]Y[ÈXÚ\Ú]›ËH[˜HÛÛHÜš[Û™HÈÛÙ\Ù˜KˆH
Š™ÝX\™XHHÚXÝ\™^ž˜JŠˆ0ê	Ý[šXÛÈÛÛ›ÛÈš\ÚXÛÈÝ]ÈH
Š™Ú]Y^š[ÊŠŽˆØH\XØ\™H[˜H™YÛÛKXHØH[˜ÚHšXÛÛ›ÜØÙ\™H[˜HÚ]X^š[Û™HÚHH™YÛÛH›Ûˆ™]™YK™\šYšXØ\™H[‰ÚY[]0èÚH›ÛˆÜ›˜KÚYY\™H[˜HÛÛ™™\›XHHXÚY\™HH™YØ\™H	ØXØÙ\ÜÛÈH[ˆ›Ü›š]Ü™HÚHÚH™\Ù[H[ÜšH›ÙÜ˜[[XKˆ™\ÜÝ[ˆ]]ÛX]\Û[Èpìˆ˜\›ËˆHÝX\™XH0ê[›Û™H[ÛÛ›ÛÈÚH
Š˜\XØHX]\šX[Y[JŠˆH™YÛÛHH
Šš[YÜš]0èHYH\œÛÛ™JŠˆ

ÛË\\œÛÛˆ[YÜš]JŠKÚHš\ÜÛ™H[š[[È™\]Z\Ú]Îˆ™\ÜÝ[›È[˜HHÛÛË]Z[™H]X[[œ]YH^š[Û™H[›È[ØØ[HHÙ[\™H[ˆ\Ý[[Û™Kˆ0â]Y\ÝHHÛÛ›ÛZ\Ý\˜HÛÜœ™]H[	Ù\\ÛÙ[È\ØÜš]Ë\˜Ú0êH[›Ø›[XH›Ûˆ\˜H[ˆXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈXH[ˆX\ÛÈÛÛ[Y\ÜÛÈHÚH\˜H
Š˜]]Üš^ž˜]ÊŠ‹HÛÛ›È]Y\ÝÈ[ÛÛ›ÛÈ	ØXØÙ\ÜÛÈ›Ûˆpìˆ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH˜YÙHH›ÜÜÚ[Z]0èŠŠˆ™\šYšXØHÚHÚH[˜HÚXH]]Üš^ž˜]ËH™[	Ù\\ÛÙ[È\ØÜš]ÈÈ\˜Kˆ[ˆ˜YÙH›ÛˆØHÛÛ\™H]X[H\œÛÛ™HÝ[››È[˜[™Ë°êH\Ý[™ÝY\™H[ˆ[™Ü™\ÜÛÈ[ˆÛÜXHHYH[™Ü™\ÜÚHÙ\\˜]KH›ÛˆH[Ý[ˆÚ]Y^š[ÈÝ[HÚ]X^š[ÛšH[\™]š\ÝK—ˆ
ˆ
ŠŠHšY[ÜÛÜ™YÛX[ž˜NŠŠˆ0ê[ˆÛÛ›ÛÈ
Š™]XÝ]™JŠ‹ˆ]œ™X˜™H\›Y\ÜÛÈHšXÛÜÝZ\™HÚHH™\ÛÈ[˜\Ý›È
Š™ÜÊŠˆHÜ\š^š[Û™KXH›Ûˆ[\Y\ØÙH	Ú[™Ü™\ÜÛÈH[˜H\œÛÛ˜HÛÛHH›ÛˆXÚYH[HÝ[›Ü›š]Ü™HÚHÚH™\Ù[H[	Ú[\›Ýš\ÛË—ˆ
ˆ
ŠÊHÙ[œÛÜ™HH[Ýš[Y[ÎŠŠˆš[]˜HH
Šœ™\Ù[ž˜JŠ‹›Ûˆ	ÚY[]0è°êH[[Y\›È[H\œÛÛ™Kˆ[ˆ[ˆØØ[HÝ™HÛHXØÙ\ÜÚH]]Üš^ž˜]HÛÛ›ÈYÚ][ZHÙ[™\™\™X˜™HÛÛ[È[\›ZHÝH]]š]0è›Ü›X[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆH
Š™ÝX\™XHHÚXÝ\™^ž˜JŠˆ0êHš\ÜÜÝHÛÜœ™]HÙÛšH›ÛHÚHÈØÙ[˜\š[ÈšXÚYYH
Š™\ØÙ\›š[Y[ÊŠ‹Ú[ðêHØ\XÚ]0èH˜[]\™H[ˆØ\ÛÈ›Ûˆ™]š\ÝËH˜HšXÛÜ™]HÛÛYH	Ý[šXÛÈÛÛ›ÛÈš\ÚXÛÈ[œÚY[YH
Š™]\œ™[JŠ‹
Šœ™]™[]›ÊŠˆH
Šš[™\ÝYØ]]›ÊŠ‹ˆ\ÜÛØÚXH[›Û™HYH™YÛÛHÚHšXÛÜœ›Û›ÈÜ\ÜÛÎˆ
Šš[YÜš]0èHYH\œÛÛ™JŠ‹™\ÜÝ[›È[˜HÈÜ\˜HHÛÛËH
Š˜ÛÛ›ÛÈZH]X]›ÈØØÚJŠ‹ÙÛšHÜ\˜^š[Û™HÜš]XØHšXÚYYH	Ø\›Ý˜^š[Û™HHYH\œÛÛ™H\Ý[Kˆ[˜[X™H\Ú\ÝÛ›È\ˆHÝ\ÜØH˜YÚ[Û™NˆÛÛ[™\™H	ØX\ÛÈH\HHÚH0ê]]Üš^ž˜]Ëˆ‚ˆKˆÂˆYˆMÍKˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H[ÛHÚHÛÛ[ÈHÜ][HH›ÜšY]0è^šY[™[HÜÜØ[›ÈÛÛYØ\œÚH[H™]H[\›˜KˆÙÙÚHÚ][œ]YHÛÛ›ÜØØHHÜ™Y[žšX[HH[ˆ\[™[Hpìˆ˜\›ÈH[ˆÛÛ\]\ˆ]X[ÚX\ÚKH[ˆ[ˆ[˜ÚY[H™XÙ[H0ê˜\Ý]H[˜H\ÜÝÛÜ™X˜]H\˜Ú0êH[ˆ\ÜÜÚ]]›È\Ý˜[™[ÈÝ[™\ÜÙHXØÙ\ÜÛËˆ[X[H[ÛHÚHÚXHH
Š›XXØÚ[˜JŠ‹›ÛˆÛÛÈH\œÛÛ˜KHÝ™\œÚHY[YšXØ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HYXØØ[š\Û[È]][XØH[\ÜÜÚ]]›ÈH›Ûˆ	Ý][OÈ‹ˆÜ[ÛœÎˆÂˆJH[‰Ø]][XØ^š[Û™HHpîH˜]ÜšHpîHÙ]™\˜H\ˆ]HÛHXØÛÝ[ZH\[™[H‹ˆŠH[˜H\ÜÝÛÜ™H™]HÛÛ™]š\ØKØ[XšX]HÛÛˆØY[ž˜Hš[Y\Ý˜[H‹ˆÊH[ˆÙ\YšXØ]ÈXXØÚ[˜H[Y\ÜÛÈ[HÒH^šY[™[K™\šYšXØ]ÈšXH‹ŒV‹ˆ‘
H[˜HÛ]XØHÚHšY]H	Ý\ÛÈH\ÜÜÚ]]šH\œÛÛ˜[HÝ[H™]H[\›˜H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH[ˆÙ\YšXØ]ÈXXØÚ[˜H[Y\ÜÛÈ[HÒH^šY[™[K™\šYšXØ]ÈšXH‹ŒV
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠPPJŠˆ›ÛˆšYÝX\™HÛÛ[ÈH\œÛÛ™NˆÛÛ\PH\Ý[™ÝYH\ÜXÚ][Y[H	ÊŠ˜]][XØ^š[Û™HYÛH][JŠˆ[	ÊŠ˜]][XØ^š[Û™HZHÚ\Ý[ZJŠ‹H]Y\ÝÈØÙ[˜\š[ÈÚYYHHÙXÛÛ™Kˆ[ˆ
Š˜Ù\YšXØ]ÈXXØÚ[˜JŠˆ[œÝ[]È[HÒH^šY[™[H0ê	ÚY[]0è[\ÜÜÚ]]›ÎˆHÝXHÚX]™Hš]˜]H0êÙ[™\˜]HHÝ\ÝÙ]HÝ[HXXØÚ[˜KYX[Y[H[ˆ[ˆ
Š•JŠˆHÝZH›Ûˆpìˆ\ÜÙ\™H\Ý˜]Kˆ]X[™È[Ü][HÚHÛÛYØK
ŠŽ‹ŒV
ŠˆÛÛˆPTUÈ™\šYšXØH]Y[Ù\YšXØ]Èš[XHH\š\™HHÜK]Z[™H[ˆÛÛ\]\ˆ\Ý˜[™[È›Ûˆ\ÜØH™[[Y[›ÈÛÛ›ÜØÙ[™ÈÜ™Y[žšX[H˜[YK\˜Ú0êH›ÛˆÜÜÚYYH[Ý[ˆÙ\YšXØ]È[Y\ÜÛÈ[	Ø^šY[™Kˆ0âHY™™\™[ž˜Hœ˜HœÛÈÚHÙZWˆHœÛÈ[˜ÚHH]X[HXXØÚ[˜HÝZH[˜[™×‹Hš\ÛÛ™H\Ø][Y[H	Ú[˜ÚY[H\ØÜš]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHQHpîHÙ]™\˜NŠŠˆ˜Y™›Üž˜H	Ø]][XØ^š[Û™H
Š™[	Ý][JŠ‹ÚH0ê[X[›ÈØ˜YÛX]Ëˆ[ˆ]XØØ[HÚHÝ\\šH	ÓQK\ˆ\Ù[\[ÈÛÛˆ[ˆ]XØÛÈ[ˆ[\È™X[HÝ[ÛÙXÙK[™\™X˜™HÛÛ][œ]YH[›Üš[ÈÛÛ\]\Žˆ[H™[H™]HÚHXØÛÜ™ÙHH]X[HXXØÚ[˜HÚXK—ˆ
ˆ
ŠŠH\ÜÝÛÜ™H™]HÛÛ™]š\ØNŠŠˆ›Ûˆ]][XØH
Š›™\ÜÝ[›ÊŠˆ[ˆ[ÙÈ[™]šYX[Kˆ[ˆÙYÜ™]È›ÝÈH]HH\[™[H0ê›ÝÈ[˜ÚHHÚH	ÚHšXÙ]]ÈHÜ›ËHH›Ý^š[Û™Hš[Y\Ý˜[HÜÜÝH[›Ø›[XHH™HY\ÚH[H›ÛK—ˆ
ˆ
Š‘
HÛ]XØHÚHšY]HH\ÜÜÚ]]šH\œÛÛ˜[NŠŠˆ0ê[ˆÛÛ›ÛÈ
Š™\™]]›ÊŠŽˆXÚX\˜HH™YÛÛK›ÛˆH\XØKˆ™\ÜÝ[ˆ\ÜÜÚ]]›ÈšY[™H™\›X]ÈH[ˆØÝ[Y[ËH[™˜]HÚHH\Ø]ÈÜ™Y[žšX[HX˜]H›ÛˆÝ]˜HÛÛœÝ[[™ÈHÛXÞK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚH	ÚY[]0èpìˆ\ÜÙ\™H
Š™H[˜H\œÛÛ˜JŠˆÈ
Š™H[ˆÚ\Ý[XJŠ‹HÚHHÛX[™HÜ\ÜÛÈÛÛ™›Û™Û›ÈHYHX[šH\ÜÝKˆY[]0è[	Ý][HH\ÜÝÛÜ™QKš[ÛY]šXKÚX]šHHÚXÝ\™^ž˜H0­ÈY[]0è[\ÜÜÚ]]›ÈHÙ\YšXØ]ÈXXØÚ[˜KK]\Ý^š[Û™H[ÈÝ]È	Ø]š[Ë[™\š^ž›ÈPPÈ
X›ÛK\˜Ú0êH˜[ÚYšXØXš[JH0­ÈY[]0èH[ˆØ\šXÛÈH]›Ü›ÈHXØÛÝ[HÙ\š^š[ÈÈY[]0èÙ\Ý]K™YÛH[XšY[HÛÝYˆ]X[™ÈÈØÙ[˜\š[ÈXÙHÚH
Š˜Ü™Y[žšX[H˜[YHH[ˆ\ÜÜÚ]]›È›Ûˆ^šY[™[JŠˆ›Ûˆ]›Û›È˜\Ý\™KHš\ÜÜÝHÝHÙ[\™HÝ[	ÚY[]0è[\ÜÜÚ]]›Ëˆ‚ˆKˆÂˆYˆMÍ‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ™]š\ÛÜ™Hš[]˜HÚH[Ú\Ý[XHH\ÝšX^š[Û™HÛÙØ\™HH[‰Ø^šY[™H™\šYšXØH	Ú[YÜš]0èZHXØÚ]HÛÛ™œ›Û[™Û™H	Ú[\›ÛH
Š“QJŠˆÛÛˆ]Y[HX˜›XØ]Kˆ[™\ÜÛœØXš[HØšY]HÚH	Ø[ÛÜš][È[žš[Û˜H[˜ÛÜ˜H\™™][Y[HHÚHØ[XšX\›ÈÛÜÝ\™X˜™H[\Ë]ÈÚH™\ÜÝ[›ÈHXZHÙYÛ˜[]È›Ø›[ZKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0ê[š\ØÚ[ÈÛÛ˜Ü™]ÈH\˜Ú0êH[˜]ÈÚH™[žš[ÛšWˆ›Ûˆ0êš[]˜[OÈ‹ˆÜ[ÛœÎˆÂˆJHQH›ÙXÙH[\›ÛH›ÜÈÛÜH\ˆHš[HHÜ˜[™H[Y[œÚ[ÛšKÚH™\Ý[›ÈÙ[ž˜HÛÛ›ÛÈ‹ˆŠHQH0ê[™\˜Xš[H[HÛÛ\Ú[ÛšNˆÚHpìˆÛÜÝZ\™H[ˆš[HX[]›ÛÈÛÛˆHÝ\ÜØH[\›ÛH‹ˆÊHQH0ê™]™\œÚXš[Nˆ[	Ú[\›ÛHX˜›XØ]HÚHpìˆšXÛÜÝZ\™H[ÛÛ[]È[XØÚ]È‹ˆ‘
HQH˜[[H›ÜÈH™\šYšXØK]Z[™HHXØÚ]H™[™ÛÛ›È[œÝ[]HÙ[ž˜HÛÛ›Û\›H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHQH0ê[™\˜Xš[H[HÛÛ\Ú[ÛšJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Š˜ÛÛ\Ú[Û™JŠˆÚH™\šYšXØH]X[™ÈYHÛÛ[]H
Š™]™\œÚJŠˆ›ÙXÛÛ›ÈH
ŠœÝ\ÜØJŠˆ[\›ÛKˆ0âHÛÛ™^š[Û™HÚH\ÝYÙÙH	Ý[šXÛÈØÛÜÈ\ˆÝZH	Ú[\›ÛHšY[™H\Ø]H]ZKÚ[ðê›Ý˜\™HÚH[XØÚ]ÈØØ\šXØ]È0ê]Y[ÈX˜›XØ]ËˆÝH
Š“QJŠˆHÛÛ\Ú[ÛšH›ÛˆÛÛ›È[‰Ú\Ý\ÚH[ÜšXØNˆÛÛ›È›ÙXÚXš[H
Š˜HÛÛX[™ÊŠ‹[ˆØÚHÙXÛÛ™HÝH[ˆÛÛ\]\ˆÜ™[˜\š[ËH[ˆ]XØØ[HpìˆÛÜÝZ\™H[ˆXØÚ]ÈX[]›ÛÈÚH™\Ù[H\Ø][Y[H	Ú[\›ÛH]\ØKˆH™\šYšXØH[Ü˜H\ÜØKH›Üš[È\ˆ]Y\ÝÈ	Ø\™ÛÛY[È™[žš[Û˜H[˜ÛÜ˜Wˆ›ÛˆH\ÛÎˆH[žš[Û™H›ÛˆÚH0êÝX\Ý]KÚH0ê
Šœ›ÝHH›ÜšY]0èHÚXÝ\™^ž˜JŠˆÝHÝZH	Ý\ÛÈÚH™YÙÙ]˜KH	Ø\ÜÙ[ž˜HHÙYÛ˜[^š[ÛšHÚYÛšYšXØHÛÛ[ÈÚH™\ÜÝ[›ÈH[˜ÛÜ˜H›Ý˜]ÈYX\Ø\›™K›ÛˆÚH›ÛˆÚXHÜÜÚXš[KˆHÛÜœ™^š[Û™H0ê\ÜØ\™HH
Š”ÒKLMŠŠˆKYYÛ[È[˜ÛÜ˜KY™šX[˜Ø\™H[	Ú[\›ÛH[˜H
Š™š\›XHYÚ][JŠˆ[›Ü›š]Ü™KÚHYØH[XØÚ]ÈH[‰ÚY[]0èH›ÛˆÛÛÈH[ˆ˜[Ü™HX˜›XØ]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[\›ÛH›ÜÈÛÜH\ˆHš[HÜ˜[™NŠŠˆÛÛ™›Û™HYHÛÜÙKˆ[˜H[žš[Û™HH\Ú›ÙXÙH[‰Ú[\›ÛHH
Š›[™Ú^ž˜Hš\ÜØJŠˆ]X[[œ]YHÚXHH[Y[œÚ[Û™H[	Ú[™Ü™\ÜÛÎˆHLŽš]HQHÛÛ›ÈØÚHš\Ü]ÈZHMˆHÒKLM‹XH[›Ø›[XH›Ûˆ0êH[Y[œÚ[Û™H[š[K—ˆ
ˆ
ŠÊHQH0ê™]™\œÚXš[NŠŠˆ˜[ÛËˆ	Ú\Ú[™È0êH
ŠœÙ[œÛÈ[šXÛÊŠˆ\ˆÛÜÝ^š[Û™KHQH›Ûˆ˜HXØÙ^š[Û™Nˆ›ÛˆÚHš\Ø[H[ÛÛ[]ËˆÚpìˆÚH0êÛÛ\›ÛY\ÜÛÈ0êH™\Ú\Ý[ž˜H[HÛÛ\Ú[ÛšKÚH0ê[˜H›ÜšY]0è]™\œØK—ˆ
ˆ
Š‘
H›ÜÈ[ÎŠŠˆ0ê	ÛÜÜÝËˆQH0ê[ÛÈ
Š™[ØÙJŠ‹HHÝXH™[ØÚ]0è0êÙ[[XZH[ˆY™]È]X[™ÈÈÚH\ØH[\›ÜšX[Y[HÝ[H\ÜÝÛÜ™\˜Ú0êHYÙ]›ÛHÛH]XØÚHH›Üž˜Hœ]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šH\Ý[HH™H›ÜšY]0èÚH[˜H[žš[Û™HH\ÚÜš]ÙÜ˜YšXØH]™HØ\˜[\™K\˜Ú0êHHÛX[™H™Hš[Û[›È[˜H[H›ÛKˆ
Š”™\Ú\Ý[ž˜H[H™Z[[XYÚ[™JŠˆH[	Ú[\›ÛH›ÛˆÚHš\Ø[H[	Ú[™Ü™\ÜÛÈ0­È
Š”™\Ú\Ý[ž˜H[HÙXÛÛ™H™Z[[XYÚ[™JŠˆH]È[ˆš[K›ÛˆÙH™H›Ý˜H[ˆ[›ÈÛÛˆHÝ\ÜØH[\›ÛH0­È
Š”™\Ú\Ý[ž˜H[HÛÛ\Ú[ÛšJŠˆH›ÛˆÚH›Ý˜[›ÈY™˜]ÈYHš[HÛÛˆHÝ\ÜØH[\›ÛKˆ
Š“QHHÒKLH[››È\œÛÈH™\Ú\Ý[ž˜H[HÛÛ\Ú[ÛšJŠˆH˜[››ÈÛÛœÚY\˜]H\™XØ]H[ˆÙÛšHÛX[™NÈÈÝ[™\™]X[H0êH˜[ZYÛXH
Š”ÒKLŠŠ‹ÛÛˆÒKLMˆ[ˆ\ÝKˆ‚ˆKˆÂˆYˆMÍËˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ’[ÛÛZ]]È\›Ý˜HHZYÜ˜^š[Û™H[Ù\Ý[Û˜[HH[˜H[Ý˜H™\œÚ[Û™K™]š\ÝH\ˆ[ˆØX˜]ËˆXÛšXØ[Y[HHZYÜ˜^š[Û™HšY\ØÙKˆ[[™Y0ë\°ìˆ[Ø[Ù[\ˆ™\ÝH™\›[È™HÜ™NˆH[Ý˜H[\™˜XØÚXHHØ[XšX]È[\˜ÛÜœÛÈ\ˆ[Y]\™H[˜H›ÝHHÜ™Y]ÈH™\ÜÝ[›ÈYÛHÜ\˜]ÜšH\˜HÝ]È]š\Ø]È°êH›Ü›X]Ëˆ[™\\Ë\ˆ\ÜÙ[™È[š[˜Ú\[H][^ž˜]Ü™H[Ú\Ý[XK›ÛˆÛÛ\\™Hœ˜HH\Ý[˜]\šH[HÛÛ][šXØ^š[Û™HH[ÙYšXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[[Y[È[›ØÙ\ÜÛÈHÙ\Ý[Û™H[H[ÙYšXÚH0êÝ]ÈÙ\Ý]ÈX[OÈ‹ˆÜ[ÛœÎˆÂˆJH	ÚY[YšXØ^š[Û™HH[ÛÚ[›ÛÚ[Y[È[H\H[\™\ÜØ]H
ÝZÙZÛ\ŠH‹ˆŠH[X[›ÈH˜XÚÛÝ]ÚH]œ™X˜™HÝ]Èš\Ü\™H[Ù\Ý[Û˜[H[H™\œÚ[Û™H™XÙY[H‹ˆÊHHš[™\Ý˜HHX[][žš[Û™KÚH[™]˜HÛÛØØ]H[ˆ[˜HÚ[Ü›˜]H[™œ˜\Ù][X[˜[H‹ˆ‘
H[ÛÛ›ÛÈH™\œÚ[Û™KÚH›ÛˆHÛÛœÙ\˜]ÈHÛÛ™šYÝ\˜^š[Û™H[H™XØÚXH[\™˜XØÚXH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH	ÚY[YšXØ^š[Û™HH[ÛÚ[›ÛÚ[Y[È[H\H[\™\ÜØ]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛH
ŠœÝZÙZÛ\ŠŠˆH[˜H[ÙYšXØHÛÛ›È
Š]JŠˆÛÛÜ›ÈÚH™HÝXš\ØÛÛ›ÈÛHY™™]K›ÛˆÛÛ[ÈÚHH\ÙYÝYKˆ	ÚY[YšXØ^š[Û™H[H\H[\™\ÜØ]H0ê[ˆ\ÜØYÙÚ[È›Ü›X[H[›ØÙ\ÜÛËHÙ\™HHYHÛÜÙHÚH]ZHÛÛ›ÈX[˜Ø]H[˜[X™Nˆ˜XØÛÙÛY\™H
Šœš[XJŠˆ[Ü›È\™\™HÝ[	Ú[\]È™X[K\˜Ú0êH0ê[Ø[Ù[\ˆHØ\\™HÚH[˜H›ÝHHÜ™Y]ÈÚH[Y]H™[H›ÛH[Ú[Ü››ËH
Šš[™›Ü›X\›HH›Ü›X\›JŠˆš[XHÚHH[ÙYšXØH[šH[ˆšYÛÜ™KˆÈØÙ[˜\š[È[ÜÝ˜H[ÛÜÝÈ\XÛÈH]Y\ÝHÛZ\ÜÚ[Û™Nˆ[ˆ[\™[ÈXÛšXØ[Y[H\™™]ÈÚH›ÙXÙHÛÛ][œ]YH™HÜ™HH™\›[Ë\˜Ú0êH	Ú[\]È›Ûˆ\˜HÝZHÚ\Ý[ZHXHÝ[H\œÛÛ™Kˆ˜[HH[˜H›Ý\™HÚH™\ÜÝ[ˆÛÛ›ÛÈXÛšXÛÈ]œ™X˜™H]š]]È[\ÜÙ\š^š[Ë[ÚH0ê™XÚ\Ø[Y[H[[È[HÛX[™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHX[›ÈH˜XÚÛÝ]ŠŠˆ\Ú\ÝH\ˆš[YYX\™HH[˜H[ÙYšXØH
ŠXÛšXØ[Y[JŠˆ˜[]Kˆ]ZHHZYÜ˜^š[Û™H0êš]\ØÚ]HH[ÛÙØ\™H[žš[Û˜HÛÜœ™][Y[NˆÜ›˜\™H[™Y]›ÈØ\™X˜™HÝ]È[ˆš[YY[ÈÜ›ÜÜžš[Û˜]ÈH[ˆ›Ø›[XHH›Ü›X^š[Û™KH]œ™X˜™H˜[šYšXØ]È[]›Ü›Ë—ˆ
ˆ
ŠÊHš[™\Ý˜HHX[][žš[Û™NŠŠˆ0êÝ]HØÙ[H™[™Kˆ[ØX˜]È0ê[[ÛY[ÈÚ]\ÝÈ›Üš[È\˜Ú0êH[™\›[ÈXÛšXÛÈ›Ûˆ[\]H	Ø]]š]0èÈ[›Ø›[XH0ê[Y\œÛÈ[[™Y0ëH›ÛˆH[HHÚH™Y\™HÛÛˆ
Šœ]X[™ÊŠˆH[ÙYšXØH0êÝ]H\ÙYÝZ]K—ˆ
ˆ
Š‘
HÛÛ›ÛÈH™\œÚ[Û™NŠŠˆÛÛœÙ\˜HHÝÜšXH[HÛÛ™šYÝ\˜^š[ÛšHHÙ\™H[H˜XØÚXXš[]0èˆ™\ÜÝ[›È]ZHHš\ÛÙÛ›ÈHØ\\™HÚHHØ[XšX]ÈÛÜØNˆ[Ø[XšX[Y[È\˜H›Û]Ë\›Ý˜]ÈHš]\ØÚ]Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚHHÙ\Ý[Û™H[H[ÙYšXÚHH[˜H
Š™[Y[œÚ[Û™H[X[˜JŠˆÚHHÛX[™HY]Û›È[H›Ý˜HHÛÛ[[ËHÚHHš\ÜÜÝHÛÜœ™]H›Ûˆ0êÙ[\™HXÛšXØKˆÛHÝZÙZÛ\ˆHÙ[œÚ\™HÛÛ\™[™Û›ÈH]Û\šHZHÙ\š^šKÛH][Hš[˜[K	Ø\ÜÚ\Ý[ž˜KHÚXÝ\™^ž˜KHÛÛ™›Ü›Z]0èHH›Ü›š]ÜšHÛÚ[›ÛKˆ]X[™ÈÈØÙ[˜\š[È\ØÜš]™H[˜H[ÙYšXØH
Šœš]\ØÚ]JŠˆÚHÙ[™\˜HÛÛ][œ]YH[ˆ\ÜÙ\š^š[ËÙ\˜ØHHXÝ[˜H[ˆ
Š˜ÛÛ][šXØ^š[Û™K›Ü›X^š[Û™HÈÛÚ[›ÛÚ[Y[ÊŠ‹›Ûˆ™[	Ù\ÙXÝ^š[Û™Kˆ‚ˆKˆÂˆYˆMÎˆÜXÎˆ‘XÙ\[ÛˆXÚ›ÛÙÚY\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[˜HÛØÚY]0è[YHÚH[ˆ›Ü›š]Ü™Hš]™[™H[›Üš[È\˜Ú]š[ÈÛY[Kˆ\ˆØÛÜš\›Ë[œÙ\š\ØÙH™[]X˜\ÙH[Ý[šH™XÛÜ™HÛY[H[™\Ú\Ý[KÚX\ØÝ[›ÈÛÛˆ[ˆ[™\š^ž›ÈK[XZ[H[ˆ[Y\›ÈH[Y›Û›È[š]›ØÚHÜ™X]H\ÜÚ][Y[HH[Ûš]Ü˜]KˆÙH]YZH™XØ\]HšXÙ]›Û›ÈÛÛ][šXØ^š[ÛšHH\žšKHYØH0ê[[ÜÝ˜]HHÚHš\Ø[HH]X[HÛÜXH[	Ø\˜Ú]š[È0êÝ]HY™\ØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛ›ÛÙÚXH	Ú[™Ø[››È0êÝ]H[\YYØ]OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ™^[™]‹ˆŠHÛ™^Yš[H‹ˆÊHÛ™^\Ý‹ˆ‘
HÛ™^]ÚÙ[ˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛ™^]ÚÙ[ŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
ŠšÛ™^]ÚÙ[ŠŠˆ0ê[ˆ
Š™]ÊŠˆš]^š[È[œÙ\š]Èœ˜H]H™X[Nˆ[ˆ™XÛÜ™H]X˜\ÙK[˜HÜ™Y[žšX[K[˜HÚX]™HTK[ˆ[™\š^ž›ÈK[XZ[ˆ›ÛˆH˜[Ü™HÜ\˜]]›ÈH™\ÜÝ[›ÈÝœ™X˜™HXZH\Ø\›Ë]Z[™H[Ý[È][^ž›È0êH›Ý˜HH[ˆXØÙ\ÜÛÈÈH[˜HY™\Ú[Û™H›Ûˆ]]Üš^ž˜]KˆÚXÚ0êHÙÛšHÛÜXHpìˆÛÛ[™\™HÚÙ[ˆ]™\œÚK[žš[Û˜H[˜ÚHÛÛYH
Š™š[YÜ˜[˜JŠŽˆ\›Y]HHØ\\™H
œ]X[JˆÛÜXH0êÝ]HY™\ØK\Ø][Y[HÛÛYHšXÚY\ÝÈ[ÈØÙ[˜\š[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ˆÛ™^Yš[JŠˆ0ê[ˆ[\›È
Š™š[JŠˆÚ]™]HÛÛØØ]ÈÝ[š[\Þ\Ý[H
\Ëˆ\ÜÝÛÜ™Ø[[Z[š\Ý˜^š[Û™KžÞ
HÚH[\H]X[™ÈšY[™H\\ÈÈÛÜX]Ëˆ]ZH[™XÙH	Ù\ØØH›Ûˆ0ê[ˆš[KÛÛ›ÈÚ[™ÛÛH™XÛÜ™[›È[ˆ]X˜\ÙHYÚ][[Ë—ˆ
ˆ
ŠÊH[ˆÛ™^\Ý
Šˆ0ê[ˆ
ŠœÚ\Ý[XJŠˆÚ]™]HÛÛ\]Ë[X™\˜][Y[H[™\˜Xš[KÚH]\˜H	Ø]XØØ[HH™H™YÚ\Ý˜HHXÛšXÚKˆÈØÙ[˜\š[È›Ûˆ\ØÜš]™H[Ý[˜HXXØÚ[˜H\ØØK—ˆ
ˆ
ŠJH[˜HÛ™^[™]
Šˆ0ê[‰Ú[\˜H
Šœ™]JŠˆHÛ™^\Ý\Ø]H\ˆÝYX\™HH[™ÛÈ[ÛÛ\Ü[Y[ÈYÛHYÙÜ™\ÜÛÜšKˆ0â[Ø\ÛÈpîH[\[ÈH›Ûˆ\[™[H]ZK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[[Üš^ž˜HHØØ[HÜ™\ØÙ[Kˆ
Š’Û™^]ÚÙ[ˆH[ˆ]ÊŠˆ
™XÛÜ™Ü™Y[žšX[KK[XZ[
H0­È
Š’Û™^Yš[HH[ˆš[JŠˆ0­È
Š’Û™^\ÝH[ˆÚ\Ý[XJŠˆ0­È
Š’Û™^[™]H[˜H™]JŠ‹ˆ[˜[YÙÚ[ÈÛÛ][™H0ê	Ø[\ÜÚ[XH™XÚ\Ú[Û™Nˆ™\ÜÝ[ˆ][HYÚ][[ÈH[Ý]›ÈHØØØ\›K]Z[™H	Ø[\›YH›ÛˆÙ[™\˜H˜]XØ[Y[H˜[ÚHÜÚ]]šKˆ‚ˆKˆÂˆYˆMÎKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ›Ù]Ü™HH\ÜÜÚ]]šHYYXØ[H]™HØ\˜[\™HÚH[š\›]Ø\™HØ\šXØ]È[	Ø]š[È›ÛˆÚXHÝ]ÈX[›ÛY\ÜÛËˆH™\šYšXØH›Ûˆpìˆ\ÙÙÚX\œÚH[Ú\Ý[XHÜ\˜]]›Ë\˜Ú0êH[X[Ø\™HÝ™X˜™H]™\›ÈÚpèÛÛ\›ÛY\ÜÛÎˆÙ\™H[ˆ[[Y[ÈÚHÚXHY™šYXš[H\ˆÛÜÝ^š[Û™HH™\šYšXØXš[Hš[XHÚH]X[[œ]YHÛÙØ\™H™[™ØH\ÙYÝZ]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”ÝH]X[H[[Y[È]™HÙÙÚX\™H]Y\ÝHØ][˜HH™\šYšXØOÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ[]š\\ÈÛÛˆ[˜[\ÚH]\š\ÝXØH]šX]È]]ÛX]XØ[Y[H[	ØXØÙ[œÚ[Û™H‹ˆŠH[˜H›ÛÝÙˆ\Ý\™Ø\™H
\ËˆÚX]™HX˜›XØH[›Ù]Ü™H[ˆ[ˆÚ\HÈ[ˆ“ÓJH‹ˆÊH[ˆ\ÚÒKLMˆ[š\›]Ø\™HÛÛœÙ\˜]È[ˆ[ˆš[HÝ[\ØÛÈ[\ÜÜÚ]]›È‹ˆ‘
H[ˆÙ\YšXØ]ÈÈ[œÝ[]È™[\ÜÜÚ]]›È\ˆ]][XØ\™H[Ù\™\ˆHYÙÚ[Ü›˜[Y[È‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[˜H›ÛÝÙˆ\Ý\™Ø\™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š”›ÛÝÙˆ\Ý
Šˆ0ê[[ÈH\[ž˜H[HØ][˜HHšYXÚXNˆ[ˆÛÛ\Û™[HÛÛœÚY\˜]ÈY™šYXš[H
œ\ˆÛÜÝ^š[Û™J‹›Ûˆ\˜Ú0êH]X[Ý[ˆ[›ÈÈ]\ÝKˆ\XØ[Y[H0ê[˜HÚX]™HX˜›XØH[›Ù]Ü™HY[[Üš^ž˜]H[ˆ[ÙÈ[[]]Xš[H[ˆ“ÓHÈ[›È[ˆ
Š•JŠ‹ˆ[	ØXØÙ[œÚ[Û™K]Y[ÛÙXÙH™\šYšXØHHš\›XH[›ÛÝØY\‹ÚHHÝXH›ÛH™\šYšXØH[Ù\›™[HÛÜðëšXNˆ0ê[YXØØ[š\Û[È[
Š”ÙXÝ\™H›ÛÝ
Š‹ˆÚXÚ0êHH˜YXÙH0ê\™Ø\™HH›Ûˆš\ØÜš]šXš[K™\ÝH˜[YH[˜ÚHÙH]È[ÛÙØ\™HÛÝœ˜\Ý[H0êÛÛ\›ÛY\ÜÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJJŠˆ[ˆ[]š\\È0êÛÙØ\™NˆÚ\˜H
™ÜÊˆ	Ø]š[ÈHÛÜ˜H[Ú\Ý[XHÜ\˜]]›ËˆÙH[X[Ø\™HÚH0ê[œÙYX]ÈH[ˆ]™[ÈpîH˜\ÜÛÈ
›ÛÝÚ]›ÛÝÚ][š\›]Ø\™JKpìˆ˜\ØÛÛ™\œÚH›Üš[È[	Ø[]š\\Ëˆ›Ûˆpìˆ]Z[™H˜\™HH˜YXÙH[HšYXÚXK—ˆ
ˆ
ŠÊJŠˆ[ˆ\ÚÛÛœÙ\˜]È[ˆ[ˆš[HÝ[\ØÛÈ0ê[ÙYšXØXš[H\Ø][Y[HÛÛYH[š\›]Ø\™NˆÚH[\˜H	Ý[›È[\˜H	Ø[›Ëˆ[ˆ\Ú›Ûˆ›Ý]ÈH[˜HÚX]™HHH[ˆÝ\ÜÈ[[]]Xš[H›Ûˆ›Ý˜H[K—ˆ
ˆ
Š‘
JŠˆ[ˆÙ\YšXØ]ÈÈ]][XØH[
˜Ø[˜[Jˆ™\œÛÈ[Ù\™\ˆHYÙÚ[Ü›˜[Y[ÈH›ÝYÙÙH[š\›]Ø\™H[ˆ˜[œÚ]ËXH›ÛˆXÙH[HÝ[	Ú[YÜš]0è[š\›]Ø\™H
Š™Úpè[œÝ[]ÊŠˆH[ˆ\ÙXÝ^š[Û™HÝ[\ÜÜÚ]]›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆÙÛšHØ][˜HHšYXÚXH]™H\›Z[˜\™HH]X[ÚH\KH]Y[[Èš[˜[H›Ûˆpìˆ\ÜÙ\™H™\šYšXØ]ÈHšY[	Ø[›Îˆ]™H\ÜÙ\™HšY]È\ˆYš[š^š[Û™KˆÙHÈØÙ[˜\š[ÈÚYYH
˜ÚH™\šYšXØH[™\šYšXØ]Ü™J‹Hš\ÜÜÝH0êH›ÛÝÙˆ\Ý[˜ÛÜ˜]H™[	Ú\™Ø\™H
KÓHÈ“ÓH[›Ù]Ü™JKˆ‚ˆKˆÂˆYˆNˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ“HÚX]™Hš]˜]HH[ˆÙ\YšXØ]È^šY[™[HšY[™HÛÛ\›ÛY\ÜØHHHÐHÈ™]›ØØH[[YYX][Y[Kˆ[X[H™\šYšXØH\°ìˆÚH[Ý[šHÛY[ÛÛ[X[›ÈYXØÙ]\™H[Ù\YšXØ]È\ˆÜ™Kˆ[™YØ[™ËØÛÜ™HÚH]YZHÛY[ØØ\šXØ[›È	Ù[[˜ÛÈZHÙ\YšXØ]H™]›ØØ]H[˜H›ÛH[Ú[Ü››ÈHÈ[™ÛÛ›È[ˆØXÚKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HYXØØ[š\Û[ÈšYXÙH˜\ÝXØ[Y[H]Y\ÝHš[™\Ý˜HH\ÜÜÚ^š[Û™HHÛÛYH[žš[Û˜OÈ‹ˆÜ[ÛœÎˆÂˆJH[Ù\YšXØ]H[›š[™ËÚHš[˜ÛÛH[ÛY[YXØÙ]\™HÛÛ[È]Y[™XÚ\ÛÈÙ\YšXØ]È™]›ØØ]È‹ˆŠH[˜HÔ“pîHÛÜKÚHšYXÙHH[Y[œÚ[Û™H[š[HH]Z[™H[[\ÈHØØ\šXØ[Y[ÈZHÛY[‹ˆÊHÐÔÔÚH[\œ›ÙØH[ˆ™\ÜÛ™\ˆ[ˆ[\È™X[HÝ[ÈÝ]È[Ú[™ÛÛÈÙ\YšXØ]È[žšXÚ0êHØØ\šXØ\™H	Ú[\›È[[˜ÛÈ‹ˆ‘
H[ˆÙ\YšXØ]ÈÚ[Ø\™ÚHÛÜÝ]Z\ØÙH]]ÛX]XØ[Y[H[Ù\YšXØ]È™]›ØØ]ÈÝH]HHÛÝÙÛZ[šH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÐÔÔ
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	ÊŠ“ÐÔÔ
Šˆ
Û›[™HÙ\YšXØ]HÝ]\È›ÝØÛÛ
HØ\Ý›ÛÙH	Ø\›ØØÚ[È[HÔ“ˆ[™XÙHHØØ\šXØ\™H\š[ÙXØ[Y[H	Ú[\˜H\ÝHZHÙ\YšXØ]H™]›ØØ]HHšY\œÚH[H›ÜšXHÛÜXH[ˆØXÚK[ÛY[[\œ›ÙØH[ˆ™\ÜÛ™\ˆÚYY[™ÈÈÝ]ÈH
Šœ]Y[Ú[™ÛÛÈÙ\YšXØ]ÊŠˆ™[[ÛY[ÈÝ\ÜÛÈ[	Ú[™ÚZÙKHšXÙ]™H
™ÛÛÙ
‹
œ™]›ÚÙY
ˆÈ
[šÛ›ÝÛŠ‹ˆH™]›ØØHHY™™]È]X\ÚHÝXš]ÈHHš[™\Ý˜HH\ÜÜÚ^š[Û™HÚHšYXÙHHÜ™HHZ[]Kˆ
Š”]X\ÚJŠ‹›Ûˆ[]Îˆ[˜Hš\ÜÜÝHÐÔÔH[ˆ›Üš[È\š[ÙÈH˜[Y]0è
™^\]X
H[›ÈÝZHpìˆ\ÜÙ\™Hš]][^ž˜]KHÛÜ˜]]È]X\ÚH]HHœ›ÝÜÙ\ˆ\XØ[›È[
ŠœÛÙY˜Z[
Šˆ8 %ÙH[™\ÜÛ™\ˆ›Ûˆš\ÜÛ™K›ÜÙYÝ[Û›È[™XÙHH›ØØØ\™K\ˆ›Ûˆ™[™\™H\œ˜YÙÚ][™ÚXš[HY^ž›ÈÙXˆHÙÛšH\ÜÙ\š^š[Ëˆ[ˆ]XØØ[H[ˆÜÚ^š[Û™HH™]Hpìˆ]Z[™H˜\ˆØY\™HH™\šYšXØHÙ[\XÙ[Y[H›ØØØ[™ÛKˆ	ÊŠ“ÐÔÔÝ\[™ÊŠˆ™H0ê	Ù]›Û^š[Û™Nˆ0ê[Ù\™\ˆÙXˆY[YØ\™H[	Ú[™ÚZÙH[˜Hš\ÜÜÝHÐÔÔ™XÙ[HHš\›X]H[HÐK]š][™È[ÛY[[˜HÛÛ›™\ÜÚ[Û™HYÙÚ][]˜HH[HÐH[ˆØ\šXÛÈ[]˜]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆXØÛÜ˜ÚX\™HHÔ“šYXÙHH˜[™HXH›ÛˆØØØHHØ]\ØH[›Ø›[XKÚH0ê	ÊŠš[\˜[ÈHYÙÚ[Ü›˜[Y[ÈHHØXÚJŠ‹ˆš[˜Ú0êH[ÛY[ÚHšYHH[˜HÛÜXHØØ\šXØ]HY\šK[ˆÙ\YšXØ]È™]›ØØ]ÈÝ[X][˜HÛÛ[Y\°èH\ÜÙ\™HXØÙ]]Ë—ˆ
ˆ
ŠJH[Ù\YšXØ]H[›š[™ÊŠˆš[˜ÛÛH[ÛY[YXØÙ]\™HÛÛÈ[ˆÙ\YšXØ]ÈÈ[˜HÐHÜXÚYšXÚNˆÙ\™HHÛÛ˜\Ý\™HHÐHÛÛ\›ÛY\ÜÙKXH]ZH›Ù\œ™X˜™H	ÙY™™]ÈÜÜÝËÚ[ðê[˜Ú[Ù\™H[ÛY[›Üš[È[Ù\YšXØ]ÈÚH›ÙÛX[[ÈšYš]]\™K—ˆ
ˆ
Š‘
H[ˆÙ\YšXØ]ÈÚ[Ø\™
ŠˆÛÜ™HpîHÛÝÙÛZ[šHÛÛˆ[ˆ[šXÛÈÙ\YšXØ]Ëˆ›ÛˆH[Ý[˜H™[^š[Û™HÛÛˆH™]›ØØHK[žšK[\YšXØH[[››ÈH[˜HÛÛ\›ÛZ\ÜÚ[Û™H\˜Ú0êH[‰Ý[šXØHÚX]™H›ÝYÙÙH[ÛH›ÛZK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HHÛÛ˜\ÜÚ^š[Û™Kˆ
ŠÔ“H[[˜ÛÈÛÛ\]ËØØ\šXØ]È\š[ÙXØ[Y[K™\šYšXØH[ˆØXÚHH]Z[™Hš]\™]JŠˆ0­È
Š“ÐÔÔH[\œ›ÙØ^š[Û™H[X[H[ˆ[\È™X[JŠˆ0­È
Š“ÐÔÔÝ\[™ÈHHš\ÜÜÝHHÜH[Ù\™\‹šYXÙ[™È][ž˜HHØ\šXÛÈÝ[HÐJŠ‹ˆ‚ˆKˆÂˆYˆNKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆÜÜY[H]™H›ÝYÙÙ\™HHØ\[HÛ[šXÚHÝH[ˆ]X˜\ÙHÛÛ™]š\ÛËˆ[™\]Z\Ú]È0ê\XÙNˆÙH[ˆÜ][HÈ[ˆ\ØÛÈ™[™ÛÛ›ÈX˜]KH]H]›Û›È\ÜÙ\™H[YÙÚXš[NÈXH0ê™XÙ\ÜØ\š[È[˜ÚHÚH[ˆ[[Z[š\Ý˜]Ü™HHÚ\Ý[XHÛÛˆXØÙ\ÜÛÈ[Ù\™\ˆ[ˆ[žš[Û™H“ÓˆÜÜØHYÙÙ\™H[ˆÚX\›È[Ø[\ÈÛÛ[™[HHXYÛ›ÜÚKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛXš[˜^š[Û™HH]™[HHÚYœ˜]\˜HÛÙ\Ù˜H[˜[XšHH™\]Z\Ú]OÈ‹ˆÜ[ÛœÎˆÂˆJH[Y\ÚÈ[˜Üž\[ÛˆÛÛ›È[\Èš\ÚXÛËpîHÚYœ˜]\˜HH]™[ÈHÛÛÛ›˜KÜ™XÛÜ™\ˆ›ÝYÙÙ\™H[Ø[\È[	Ø[[Z[š\Ý˜]Ü™H‹ˆŠHÛÛÈ[Y\ÚÈ[˜Üž\[Û‹\˜Ú0êHÚYœ˜[™È	Ú[\›È\ØÛÈ[˜ÚHHÚ[™ÛÛHØ[\Hš\Ý[[›È›Ý]HH]X[ÚX\ÚH][H‹ˆÊHÛÛÈÚYœ˜]\˜HH]™[ÈHš[H\XØ]H[HØ\[H[]X˜\ÙKÝY™šXÚY[H\ˆ[˜[XšHÛHØÙ[˜\šH‹ˆ‘
HÚYœ˜]\˜H[Ø[˜[HÛÛˆÈœ˜H\XØ^š[Û™HH]X˜\ÙKÚH›ÝYÙÙHH]HÚXHHš\ÜÛÈÚXH[ˆ\ÛÈ‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHYH™\]Z\Ú]HšYÝX\™[›ÈZ[˜XØÙH]™\œÙHHšXÚYYÛ›È]™[H]™\œÚK—ˆ
ˆH
Š™[Y\ÚÈ[˜Üž\[Ûˆ
‘JJŠˆ›ÝYÙÙHH]H
Š˜Hš\ÜÛÈÛÛ›È[\Èš\ÚXÛÊŠŽˆÙH[\ØÛÈšY[™Hš[[ÜÜÛÈHÛÛYØ]È[›Ý™KÙ[ž˜HHÚX]™H
Ý\ÝÙ]H™[JH0ê[YÙÚXš[K—ˆ
ˆH‘H\°ìˆ›ÛˆÙ\™HH[H
Š˜HÚ\Ý[XHXØÙ\ÛÈHØ›ØØØ]ÊŠŽˆ[Ú\Ý[XHÜ\˜]]›ÈXÚYœ˜H[ˆ[ÙÈ˜\Ü\™[K]Z[™HÚ][œ]YHX˜šXHXØÙ\ÜÛÈ[Ù\™\ˆ™YHH]H[ˆÚX\›Ëˆ\ˆÛÝ˜\œ™HHXYÛ›ÜÚH[˜ÚH[	Ø[[Z[š\Ý˜]Ü™HÙ\™HH
Š˜ÚYœ˜]\˜HH]™[ÈHÛÛÛ›˜HÈH™XÛÜ™
Š‹[ˆÝZHHÚX]™H0êÙ\Ý]H[	Ø\XØ^š[Û™HH›Ûˆ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆ0â	Ù\œ›Ü™HÛÛ˜Ù]X[HpîHÛÛ][™NˆH‘H›ÝYÙÙH[\È[Ý\ÜË
Š››ÛŠŠˆYÛH][H[Ú\Ý[XH[ˆ[žš[Û™KˆHXXØÚ[˜HXØÙ\ØH›ÛˆÜÛ™H[Ý[˜H˜\œšY\˜HH[ˆ[[Z[š\Ý˜]Ü™K—ˆ
ˆ
ŠÊJŠˆHÚYœ˜]\˜HH]™[ÈHš[H›ÝYÙÙHÚ[™ÛÛHš[HYÛH[šH][H[Ú\Ý[XHÜ\˜]]›ËXH[[ÝÜ™H[]X˜\ÙH]™HÝ\ˆYÙÙ\™HH›ÜšHš[H\ˆ[žš[Û˜\™Nˆ›ÛˆÙ™œ™H[Ý[˜HÜ˜[[\š]0èÝ[Ú[™ÛÛÈØ[\Ë—ˆ
ˆ
Š‘
JŠˆÈ›ÝYÙÙHH]H
Šš[ˆ˜[œÚ]ÊŠˆœ˜H\XØ^š[Û™HH]X˜\ÙKˆ›Ûˆ0êÚYœ˜]\˜HHš\ÜÛÈH›Ûˆ[˜ÚYH[ˆ[Ý[ˆ[ÙÈÝHÚpìˆÚH[ˆ[[Z[š\Ý˜]Ü™HYÙÙH[\œ›ÙØ[™È\™][Y[HHX™[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\ÜÛØÚXHÙ[\™H[]™[ÈHÚYœ˜]\˜H[HZ[˜XØÚXKˆ
Š‘\ØÛËÝ›Û[YH8¡¤ˆ\Èš\ÚXÛÈ[Ý\ÜÊŠˆ0­È
Š‘š[KØØ\[H8¡¤ˆ[šH][H[Ú\Ý[XHÜ\˜]]›ÊŠˆ0­È
Š‘]X˜\ÙKÛÛÛ›˜HÈ™XÛÜ™8¡¤ˆš]š[YÚHXØÙ\ÜÚ]šHYÛH[[Z[š\Ý˜]ÜšHHš[˜Ú\[È[Z[š[[Èš]š[YÚ[ÈÝZH]JŠˆ0­È
Š•ËÒTÙXÈ8¡¤ˆ[\˜Ù]^š[Û™H[ˆ˜[œÚ]ÊŠ‹ˆ‚ˆKˆÂˆYˆN‹ˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ‘ÜÈ[ˆ\ÈHX]\šX[H[XYØ^žš[›Ë	Ø^šY[™HYÝH™HZ\Ý\™Nˆ[ˆØ\[ÈÚH[›[˜ÚXHHšY[ÜÛÜ™YÛX[ž˜H]]˜K[ˆÜ›™[ÈÛÛˆ˜YÙH[	Ú[™Ü™\ÜÛÈH[ˆÚ\Ý[XHÚH™YÚ\Ý˜HHÛÛœÙ\˜H\ˆLÚ[Ü›šHHš[X]H[H[XØ[Y\™Kˆ[™\ÜÛœØXš[HÚYYHHÛ\ÜÚYšXØ\™HH™HZ\Ý\™H\ˆ[žš[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆÛÛYH˜[››ÈÛ\ÜÚYšXØ]Hš\Ü]]˜[Y[H[Ø\[Ë[Ü›™[ÈHH™YÚ\Ý˜^š[Û™HZHš[X]OÈ‹ˆÜ[ÛœÎˆÂˆJH]\œ™[K™]™[]›Ë[™\ÝYØ]]›È
]XÝ]™JH‹ˆŠH™]™[]›Ë]\œ™[KÛÜœ™]]›È‹ˆÊH[™\ÝYØ]]›ËÛÜœ™]]›Ë]\œ™[H‹ˆ‘
H\™]]›ËÛÛ\[œØ]]›Ë™]™[]›È‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH]\œ™[K™]™[]›Ë[™\ÝYØ]]›ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH™HÛÛ›ÛHYÚ\ØÛÛ›È[ˆ[ÛY[H]™\œÚHš\Ü]È[	Ù]™[Ë—ˆ
ˆ[
Š˜Ø\[ÊŠˆ›Ûˆ[\Y\ØÙHš\ÚXØ[Y[H[NˆYÚ\ØÙHÝ[HÚXÛÛÙÚXH[Ý[žšX[HY›ËØÛÜ˜YÙÚX[™ÛÈ[[\™Kˆ0â]Z[™H
Š™]\œ™[JŠ‹—ˆ
ˆ[
ŠÜ›™[ÈÛÛˆ˜YÙJŠˆ›ØØØHX]\šX[Y[H	Ú[™Ü™\ÜÛÈHÚH›Ûˆ0ê]]Üš^ž˜]Îˆ[\Y\ØÙH	Ù]™[È
œš[XJˆÚHXØØYKY0ê
Šœ™]™[]›ÊŠ‹—ˆ
ˆH
Šœ™YÚ\Ý˜^š[Û™HZHš[X]JŠˆ›Ûˆ[\Y\ØÙH°êHØÛÜ˜YÙÚXNˆÙ\™HHšXÛÜÝZ\™H	ØXØØY]È
™ÜÊ‹]Z[™H0ê
Šš[™\ÝYØ]]›È
]XÝ]™JJŠ‹—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆ[™\HHš[ZHYNˆ[ˆØ\[È›ÛˆH[Ý[˜HØ\XÚ]0èH[\Y\™H	ØXØÙ\ÜÛËH[ˆÜ›™[È›ÛˆÚH[Z]HHØÛÜ˜YÙÚX\™K›ØØØKˆ[›Û™HH™YÚ\Ý˜^š[Û™H›Ûˆ0ê
Š˜ÛÜœ™]]˜JŠ‹\˜Ú0êH›Ûˆš\š\Ý[˜H[K—ˆ
ˆ
ŠÊJŠˆ\ÜÙYÛ˜H[Ü›™[ÈH[žš[Û™H
Š˜ÛÜœ™]]˜JŠ‹ÚHÜ]H[™XÙH[HZ\Ý\™HÚHš[YYX[›È[[››ÈÜÈ	Ú[˜ÚY[H
š\š\Ý[›ÈH˜XÚÝ\ÛÜÝ]^š[Û™H[	Ú\™Ø\™K]Ú
K—ˆ
ˆ
Š‘
JŠˆÛÛ™›Û™HHØ]YÛÜšYNˆ
Š™\™]]›ÊŠˆ0ê[ˆÛÛ›ÛÈØÝ[Y[[HÚH™\ØÜš]™HÛÛ\Ü[Y[H
[˜HÛXÞK[˜H›ØÙY\˜JK
Š˜ÛÛ\[œØ]]›ÊŠˆ0êHZ\Ý\˜H[\›˜]]˜HYÝ]H]X[™È[ÛÛ›ÛÈš[X\š[È›Ûˆ0ê\XØXš[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÝ\ÜØH[XØ[Y\˜HpìˆšXØY\™H[ˆØ]YÛÜšYH]™\œÙHHÙXÛÛ™HHÛÛYHšY[™H\Ø]KY0êHÛX[™HpîHœ™\]Y[HÝH]Y\ÝÈ\™ÛÛY[Ëˆ
Š™[ˆš\ÚXš[HHÙYÛ˜[]H8¡¤ˆ]\œ™[JŠŽÈ
Š˜ÚH™YÚ\Ý˜HHÛÛœÙ[HHš]™Y\™H	ØXØØY]È8¡¤ˆ[™\ÝYØ]]›ÊŠ‹ˆÛÛØØHÙ[\™H[ÛÛ›ÛÈÝ[	Ø\ÜÙH[\Ü˜[Nˆ
œš[XJˆ
™]™[]›ËÙ]\œ™[KÙ\™]]›ÊK
™\˜[HÈÜÈ[š[]˜[Y[Êˆ
[™\ÝYØ]]›ÊK
™ÜÊˆ\ˆš[YYX\™H
ÛÜœ™]]›ÊKˆ‚ˆKˆÂˆYˆNËˆÜXÎˆ‘XÙ\[ÛˆXÚ›ÛÙÚY\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÙ[›ÈHšXÙ\˜ØHÝ[HÚXÝ\™^ž˜H[ÛHÝYX\™H\ˆY\ÚH[ÛÛ\Ü[Y[ÈHÜ\HÜš[Z[˜[HÜ™Ø[š^ž˜]NˆÛÛYHY™™]X[›ÈHšXÛÙÛš^š[Û™K]X[HÝ[Y[H\Ø[›È\ˆ[[Ýš[Y[È]\˜[Hœ˜HÚ\Ý[ZH]™\œÚKÛÛYHÝXš[\ØÛÛ›ÈH\œÚ\Ý[ž˜Kˆ™Y\ÜÛ™H]Z[™H[ˆ[\›ÈÙYÛY[È\ÛÛ]ÈÛÛˆÙ\™\ˆÙX‹]X˜\ÙKÛÛ›Û\ˆHÛZ[š[ÈHÜÝ^š[ÛšHÛY[Ú[][]K]HÛÜ™YÛX]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HXÛ›ÛÙÚXH	Ú[™Ø[››ÈÛÜœš\ÜÛ™HH]Y\ÝHÛÛ™šYÝ\˜^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ™^]ÚÙ[ˆ‹ˆŠHÛ™^\Ý‹ˆÊHÛ™^Yš[H‹ˆ‘
HÛ™^[™]‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛ™^[™]
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
ŠšÛ™^[™]
Šˆ0ê[‰Ú[\˜H
Šœ™]JŠˆHÚ\Ý[ZH\ØØK›Ûˆ[ˆÚ[™ÛÛÈÜÝˆ›Üš[È\˜Ú0êHÛÛY[™HXXØÚ[™HH[ÛH]™\œÚHÚHÛÛ][šXØ[›Èœ˜HÜ›ËÛÛœÙ[HHÜÜÙ\˜\™HÚpìˆÚH[ˆÛ™^\Ý\ÛÛ]È›ÛˆÝ™X˜™H[ÜÝ˜\™Nˆ[
Š›[Ýš[Y[È]\˜[JŠ‹	Ù\ØØ[][ÛˆZHš]š[YÚHH[ˆÚ\Ý[XH[	Ø[›ËHXÛšXÚHH\œÚ\Ý[ž˜HH	Ú[\˜HØ][˜H	Ø]XØÛËˆ0âÈÝ[Y[È\XÛÈ[HšXÙ\˜ØHÝ[HZ[˜XØÙHH[H˜XØÛÛHH[[YÙ[˜ÙHÝHØ[\YÛ™H›Û[™Ø]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ˆÛ™^\Ý
Šˆ0ê[ˆ
ŠœÚ[™ÛÛÊŠˆÚ\Ý[XHÚ]™]Kˆ0â\™™]È\ˆš[]˜\™HØØ[œÚ[ÛšHH[]]šHH[\Ú[Û™KXH\ÜÙ[™È\ÛÛ]È›Ûˆ\›Y]HHÝYX\™HÛÛYH	Ø]XØØ[HÚHÜÜÝHœ˜HÜÝ]™\œÚKÚH0ê	ÛØšY]]›ÈXÚX\˜]È[ÈØÙ[˜\š[Ë—ˆ
ˆ
ŠÊH[ˆÛ™^Yš[JŠˆ0ê[ˆÚ[™ÛÛÈ
Š™š[JŠˆ\ØØHÚH[\H]X[™ÈšY[™H\\Ëˆš[]˜H	ØXØÙ\ÜÛÈ[™Xš]ÈH[ˆØÝ[Y[Ë›Ûˆ	Ú[\˜HØ][˜H	Ø]XØÛÈÝHpîHÚ\Ý[ZK—ˆ
ˆ
ŠJH[ˆÛ™^]ÚÙ[ŠŠˆ0ê[ˆÚ[™ÛÛÈ
Š™]ÊŠˆ\ØØH
[ˆ™XÛÜ™[˜HÜ™Y[žšX[K[ˆ[™\š^ž›ÈK[XZ[
H\Ø]È\ˆš[]˜\™H\Ùš[˜^š[ÛšHÈY™\Ú[ÛšH›Ûˆ]]Üš^ž˜]K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆÛ™H[HØØ[H
]Ëš[KÚ\Ý[XK™]JK\Ý[™ÝZHÈ
ŠœØÛÜÊŠ‹ˆÙHÈØÙ[˜\š[È[ÛH
œš[]˜\™Jˆ[‰Ú[\Ú[Û™K˜\ÝH[ˆÛ™^\ÝÈ[ˆÛ™^Yš[NÈÙH[ÛH
œÝYX\™HH›Û™ÊˆHXÛšXÚHH[ˆ]™\œØ\š[È™[[\ËÙ\™H[˜HÛ™^[™]ˆ][žš[Û™H[›Û™H[H™YÛÛHÜ\˜]]˜Nˆ[ˆ[XšY[H	Ú[™Ø[››È˜HšYÛÜ›ÜØ[Y[H\ÛÛ]È[H™]HH›Ù^š[Û™K[š[Y[H]™[H\ÜÛÈÝ\ÜÛÈ[ˆ˜[\Û[›È\ˆ	Ø]XØØ[Kˆ‚ˆKˆÂˆYˆNˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆY]È[HÚXÝ\™^ž˜HÝH][^ž˜[™È[ˆÚ\Ý[XHÚH™]™YH	Ý\ÛÈH[XØ[Y\™H\ˆ[Ûš]Ü˜\™HH]]š]0è[ˆ[˜H]\›Z[˜]H\™XKˆ‹ˆ]Y\Ý[ÛŽˆÛÛYH0ê›ÝÈ]Y\ÝÈÚ\Ý[XOÈ‹ˆÜ[ÛœÎˆÂˆJH˜YÙHHXØÙ\ÜÛÈ
XØÙ\ÜÈ˜YÙJH‹ˆŠHÙ[œÛÜšH
Ù[œÛÜœÊH‹ˆÊHšY[ÜÛÜ™YÛX[ž˜H
šY[ÈÝ\™Z[[˜ÙJH‹ˆ‘
H[[Z[˜^š[Û™H
YÚ[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHšY[ÜÛÜ™YÛX[ž˜H
šY[ÈÝ\™Z[[˜ÙJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠšY[ÜÛÜ™YÛX[ž˜JŠˆ
ÐÕˆÈšY[ÈÝ\™Z[[˜ÙJH™]™YH	Ý\ÛÈÜXÚYšXÛÈH[XØ[Y\™H\ˆ[Ûš]Ü˜\™HH™YÚ\Ý˜\™Hš\Ú]˜[Y[HH]]š]0è[ˆ[˜H]\›Z[˜]H\™XHÙ[ÙÜ˜YšXØHÈ[\›˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[˜YÙHHXØÙ\ÜÛÊŠˆ0ê[˜H\ÜÙ\˜H\Ø]H\ˆ	Ø]][XØ^š[Û™Hš\ÚXØHZH˜\˜ÚK›Ûˆ[\YYØH[XØ[Y\™H\ˆ[[Ûš]Ü˜YÙÚ[ÈÛÛ[[Ë—ˆ
ˆ
ŠŠHHÙ[œÛÜšJŠˆš[]˜[›È[[ÜšK[Ýš[Y[HÈ\\\˜HH[™š\ÜÚKXH›Ûˆ›Ü›š\ØÛÛ›È›Ý™HšY[È\™]HHY[›ÈÚH›ÛˆÚX[›È[YÜ˜]HÛÛˆ[ˆÚ\Ý[XHH[XØ[Y\™K—ˆ
ˆ
Š‘
H	Ú[[Z[˜^š[Û™JŠˆÙ\™HHš\ØÚX\˜\™HH\™YHZYH\ˆ[™Ù\™HH]\œ™[HÈÝ\Ü\™HHš\ÚXš[]0èXHH\ˆðêH›ÛˆÛÜÝ]Z\ØÙH[ˆ[Ûš]Ü˜YÙÚ[È˜\Ø]ÈÝH[XØ[Y\™Kˆ‚ˆKˆÂˆYˆNKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ°â™]š\ÝÈ[š[\ØÚ[ÈH[ˆ[\Ü[HYÙÚ[Ü›˜[Y[ÈÛÙØ\™H™[	Ø[XšY[HH›Ù^š[Û™HH[‰Ø^šY[™Kˆ‹ˆ]Y\Ý[ÛŽˆ”\ˆØ\˜[\™HÚH]™[X[H›Ø›[ZH[\™]š\ÝHÈÛÛ™›]HÜÜØ[›È\ÜÙ\™H[›[]Hš\Ü[™È[Ú\Ý[XH[™XÙY[HÝ]ÈÝXš[KÛÜØHÝœ™X˜™H]™\ˆ™Y\ÜÜÝÈ[X[HUÈ‹ˆÜ[ÛœÎˆÂˆJH›ØÙY\˜HÜ\˜]]˜HÝ[™\™
Ý[™\™Ü\˜][™È›ØÙY\™JH‹ˆŠH›ØÙ\ÜÛÈH\›Ý˜^š[Û™H
\›Ý˜[›ØÙ\ÜÊH‹ˆÊHX[›ÈHš\š\Ý[›ËÜš]Ü››È[ÈÝ]È™XÙY[H
˜XÚÛÝ][ŠH‹ˆ‘
Hš[™\Ý˜HHX[][žš[Û™H
XZ[[˜[˜ÙHÚ[™ÝÊH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHX[›ÈHš\š\Ý[›ËÜš]Ü››È[ÈÝ]È™XÙY[H
˜XÚÛÝ][ŠJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜˜XÚÛÝ][ŠŠˆ
X[›ÈHšY[›ÈÈH›ÛX˜XÚÊH0ê[˜HÝ˜]YÚXH™YYš[š]HÚH\ØÜš]™HH\ÜÚH™XÙ\ÜØ\šH\ˆ[›[\™H[˜H[ÙYšXØHÈ[ˆYÙÚ[Ü›˜[Y[ÈHš\š\Ý[˜\™H[Ú\Ý[XH[Ý[ÈÝ]ÈÜšYÚ[˜\š[ÈÝXš[H]X[Ü˜H[œÛÜ™Ø[›ÈÛÛ\XØ^š[ÛšH›ØØØ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[˜H›ØÙY\˜HÜ\˜]]˜HÝ[™\™
ÓÔ
JŠˆ\ØÜš]™HÛÛYHÝ›ÛÙ\™HÛÛ\]HH›Ý][™H\ÜÛÈÜÈ\ÜÛËXH›Ûˆ0ê›ØØ[^ž˜]HÝ[H^š[ÛšHH[Y\™Ù[ž˜H\ˆ[›[\™H[ˆ\Þ[Y[˜[]Ë—ˆ
ˆ
ŠŠH[ˆ›ØÙ\ÜÛÈH\›Ý˜^š[Û™JŠˆØ\˜[\ØÙHÚHH[ÙYšXÚH™[™Ø[›È™\šYšXØ]HH]]Üš^ž˜]Hš[XH[š[\ØÚ[ËXH›Ûˆ›Ü›š\ØÙH[ˆYXØØ[š\Û[ÈXÛšXÛÈH›Û˜XÚÈÙH]X[ÛÜØH˜HÝÜÈ\˜[H	Ù\ÙXÝ^š[Û™K—ˆ
ˆ
Š‘
H[˜Hš[™\Ý˜HHX[][žš[Û™JŠˆ0ê	Ú[\˜[È[\Ü˜[HX[šYšXØ]È\ˆ\ÙYÝZ\™HH]›ÜšHšYXÙ[™È	Ú[\]ÈÝ[\Ú[™\ÜËXH›Ûˆ˜\™\Ù[HH›ØÙY\˜HXÛšXØHHš\š\Ý[›Ëˆ‚ˆKˆÂˆYˆN‹ˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈÛÛ›Û[Ù[È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”™YÚ[˜[[ˆUX[˜YÙ\‹0ê[›ÜšY]\š[ÈH[ˆš[HÝH[ˆÙ\™\ˆH\ÚY\˜HÛÛ˜ÙY\™H	ØXØÙ\ÜÛÈ[š[HZHÝ[ÚHÛÛYÚKˆ0â	Ý[šXÛÈÚHpìˆXÚY\™HÚH0ê]]Üš^ž˜]ÈYXØÙY\™H[š[HH]X[H^š[ÛšHÜÜÛÛ›È\ÙYÝZ\™HÝHH\ÜÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[Ù[ÈH]]Üš^ž˜^š[Û™HšY[™H][^ž˜]È[ˆ]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHPÈ
\ØÜ™][Û˜\žHXØÙ\ÜÈÛÛ›Û
H‹ˆŠHPPÈ
X[™]ÜžHXØÙ\ÜÈÛÛ›Û
H‹ˆÊHPPÈ
]šX]KP˜\ÙYXØÙ\ÜÈÛÛ›Û
H‹ˆ‘
HPÈ
›ÛKP˜\ÙYXØÙ\ÜÈÛÛ›Û
H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHPÈ
\ØÜ™][Û˜\žHXØÙ\ÜÈÛÛ›Û
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[[Ù[È
Š‘PÈ
ÛÛ›ÛÈ	ØXØÙ\ÜÛÈ\ØÜ™^š[Û˜[JJŠ‹HXÚ\Ú[Û™HHXØÙ\ÜÛÈ0êH\ØÜ™^š[Û™H[›ÜšY]\š[È[]ÈÈ[Hš\ÛÜœØKˆ[›ÜšY]\š[ÈHH˜XÛÛ0èHÛÛ˜ÙY\™HÈ™]›ØØ\™H\›Y\ÜÚHH]\˜KØÜš]\˜HÈ\ÙXÝ^š[Û™HY[šH][HÈÜ\K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[PPÈ
X[™]ÜžHXØÙ\ÜÈÛÛ›Û
JŠˆÚH˜\ØHÝH]]Üš^ž˜^š[ÛšHÙ[˜[HšYÛÜ›ÜÙHY]XÚ]HHÚXÝ\™^ž˜HÙ[œÚXš[H
\ËˆÙYÜ™]Ëš\Ù\˜]\ÜÚ[[ÊH[\ÜÝ]H[Ú\Ý[XHÈ[	Ø[[Z[š\Ý˜]Ü™K›ÛˆH\ØÜ™^š[Û™H[	Ý][K—ˆ
ˆ
ŠÊH	ÐPPÈ
]šX]KP˜\ÙYXØÙ\ÜÈÛÛ›Û
JŠˆ˜[]H]šX]H[ÛÙÙÙ]Ë[	ÛÙÙÙ]ÈH[	Ø[XšY[H
\ËˆÜ˜\š[Ë\\[Y[ÊH\ˆÛÛ˜ÙY\™H	ØXØÙ\ÜÛÈ˜[Z]HÛXÞHÙÚXÚK—ˆ
ˆ
Š‘
H	ÔPÈ
›ÛKP˜\ÙYXØÙ\ÜÈÛÛ›Û
JŠˆ\ÜÙYÛ˜HH\›Y\ÜÚHH[ÛHÈX[œÚ[ÛšHÜ™Ø[š^ž˜]]™K›ÛˆZHÚ[™ÛÛH][H›ÜšY]\šH[ˆ[ÙÈ\˜š]˜\š[Ëˆ‚ˆKˆÂˆYˆNËˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”™\Z\ˆ›ÝË[‰Ø^šY[™HH›Ü›X^š[Û™H˜ZKYK]K\ÚY\˜HY[YšXØ\™HHÛÜœ™YÙÙ\™H›Ø]]˜[Y[HH[HX›ÛH›ÝH™[H›ÜšXHÜÝ\˜HHÚXÝ\™^ž˜H[™›Ü›X]XØHÚHÝ™X˜™\›ÈÛÛ\›ÛY]\™H	Ø^šY[™Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜HHÙYÝY[HÛÛ›ÛHHÚXÝ\™^ž˜HÜ\˜]]šHZ]]\™X˜™H	Ø^šY[™HH˜YÙÚ][™Ù\™H]Y\ÝÈØšY]]›ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ\Ý[Û™H[H[™\˜Xš[]0è
[™\˜Xš[]HX[˜YÙ[Y[
H‹ˆŠHÚ\Ý[XHHš[]˜[Y[È[H[\Ú[ÛšH
[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[JH‹ˆÊHÜš]ÙÜ˜YšXH
[˜Üž\[ÛŠH‹ˆ‘
Hš\™]Ø[‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÙ\Ý[Û™H[H[™\˜Xš[]0è
[™\˜Xš[]HX[˜YÙ[Y[
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š™Ù\Ý[Û™H[H[™\˜Xš[]0è
[™\˜Xš[]HX[˜YÙ[Y[
JŠˆ0ê[ˆÛÛ›ÛÈÜ\˜]]›ÈHÛÛ[[ÈÚHÛÛœÚ\ÝH™[	ÚY[YšXØ\™K˜[]\™KÛ\ÜÚYšXØ\™HHZ]YØ\™KÜš\ÛÛ™\™HH[HX›ÛH›ÝH
\ËˆYÈÛÙØ\™KÛÛ™šYÝ\˜^š[ÛšH\œ˜]JHš[XHÚHÜÜØ[›È\ÜÙ\™HÙœ]]HYÛH]XØØ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ˆQÈ
[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[JJŠˆ[Ûš]Ü˜H\ÜÚ]˜[Y[H[˜Y™šXÛÈH™]H[HšXÙ\˜ØHHÙYÛ˜[HH]XØÚH[ˆÛÜœÛËXH›ÛˆÚHØØÝ\H[HØØ[œÚ[Û™HÈ[HÛÜœ™^š[Û™H™]™[]˜H[H[™\˜Xš[]0è[Ú\Ý[XK—ˆ
ˆ
ŠÊHHÜš]ÙÜ˜YšXJŠˆH
Š‘
H[š\™]Ø[
ŠˆÛÛ›ÈÛÛ›ÛHXÛšXÚH›ØØ[^ž˜]Hš\Ü]]˜[Y[HÝ[H›Ý^š[Û™H[Hš\Ù\˜]^ž˜HZH]HHÝ[ÛÛ›ÛÈYÛHXØÙ\ÜÚHH™]K›ÛˆÝ[HÙ\Ý[Û™HY]ÙÛÙÚXØH[H[™\˜Xš[]0èˆ‚ˆKˆÂˆYˆNˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈÛÛ›Û[Ù[È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™ÈHYÝ]È[‰Ø\˜Ú]]\˜H™\›È\Ýˆ™[X[›ÈHÛÛ›ÛÈÛÛš]›Û›ÈpîHÛÛ\Û™[Nˆ[›È˜[]HÙÛšHÚ[™ÛÛHšXÚY\ÝHÛÛ™œ›Û[™ÛHÛÛˆH™YÛÛK[ˆ[›ÈØÜš]™HHX[Y[™H]Y[H™YÛÛHHÛÛ][šXØHHXÚ\Ú[Û™H[[ÈÚHH\XØHÝ[˜Y™šXÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[HHH™\ÜÛœØXš[]0èHYš[š\™HHÙ\Ý\™HHÛXÞHHÚXÝ\™^ž˜HÚH™YÛÛ[›ÈHÛÛ›ÛHHXØÙ\ÜÛÏÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞH[™›Ü˜Ù[Y[Ú[
T
H‹ˆŠHÙ\™\ˆH]][XØ^š[Û™H
]][XØ][ÛˆÙ\™\ŠH‹ˆÊHÜÝÛY[
ÛY[ÜÝ
H‹ˆ‘
HÛXÞHYZ[š\Ý˜]Üˆ
JH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛXÞHYZ[š\Ý˜]Üˆ
JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[	Ø\˜Ú]]\˜H™\›È\Ý[
Š”ÛXÞHYZ[š\Ý˜]Üˆ
JJŠˆ0ê[ÛÛ\Û™[HÚHØÜš]™KYš[š\ØÙKYÙÚ[Ü›˜HHÙ\Ý\ØÙHHÛXÞHHXØÙ\ÜÛÈ][^ž˜]H[ÛXÞH[™Ú[™H\ˆ]\›Z[˜\™HÙHÛÛ˜ÙY\™HÈY[›È	ØXØÙ\ÜÛÈH[˜Hš\ÛÜœØK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ÛXÞH[™›Ü˜Ù[Y[Ú[
T
JŠˆ0ê[ÛÛ\Û™[Hš\ÚXÛÈÈÙÚXÛÈ
\Ëˆ[ˆØ]]Ø^K[ˆš\™]Ø[[ˆ›ÞJHÚH\XØHX]\šX[Y[HHXÚ\Ú[Û™H™\ØH[ÛXÞHXÚ\Ú[ÛˆÚ[

K—ˆ
ˆ
ŠŠH[ˆÙ\™\ˆH]][XØ^š[Û™JŠˆ˜[YHHÜ™Y[žšX[H][H\ˆXØÙ\\›™H	ÚY[]0èXH›ÛˆÚHØØÝ\H[HYš[š^š[Û™HHÙ\Ý[Û™H[	Ú[\›ÈÙ]HÛXÞHHÛÛ›ÛÈXØÙ\ÜÚH[˜[ZXÛÈH™\›È\Ý—ˆ
ˆ
ŠÊH	ÚÜÝÛY[
Šˆ0ê[\ÜÜÚ]]›Èš[˜[HHÝZH	Ý][HšXÚYYH	ØXØÙ\ÜÛË›ÛˆHÛÛ\]HHÙ\Ý[Û™HÈYš[š^š[Û™HÙ[˜[^ž˜]H[HÛXÞKˆ‚ˆKˆÂˆYˆNKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”™\ÜÛÈÙ[H[››Ý˜][ÛœÈÛÜœ‹\˜[H[ˆ]Y]H›Ý][™K[^ØÛÜ™HÚH[]X˜\ÙHHÝ\ÜÈ[	Ø\XØ^š[Û™HÔ“H0êÛÜœ›ÝËˆ[™›Ü›XH[[YYX][Y[HÙ]š[‹	Ø[[Z[š\Ý˜]Ü™HÙ[š[Üˆ[]X˜\ÙKÚHXÚYHHš\š\Ý[˜\™H[]X˜\ÙH[	Ý[[[È˜XÚÝ\[]Ë\ÜÚXÝ\˜[™ÈÚH[Ô“HÜ›šHÜ\˜]]›ÈÛÛˆ[˜HZ[š[XH\™]HH]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H^š[Û™HÝH[˜\™[™[™ÈÙ]š[ˆ\ˆš\ÛÛ™\™H[›Ø›[XOÈ‹ˆÜ[ÛœÎˆÂˆJHš\š\Ý[›È[	Ø\XØ^š[Û™H
\XØ][Ûˆ™XÛÝ™\žJH‹ˆŠHZ\œ›Üš[™ÈZH]H
]HZ\œ›Üš[™ÊH‹ˆÊHYœ˜[[Y[^š[Û™H[]X˜\ÙH
]X˜\ÙHYœ˜YÛY[][ÛŠH‹ˆ‘
H[™XÚ^ž˜^š[Û™H[]X˜\ÙH
]X˜\ÙH[™^[™ÊH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHš\š\Ý[›È[	Ø\XØ^š[Û™H
\XØ][Ûˆ™XÛÝ™\žJJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Šœš\š\Ý[›È[	Ø\XØ^š[Û™H
\XØ][Ûˆ™XÛÝ™\žJJŠˆÛÛ\ÜH	Ý][^ž›ÈH[ˆ˜XÚÝ\[]È\ˆš[Y]\™H[ˆ[žš[Û™H[‰Ø\XØ^š[Û™HÈHÝ[ÚHÛÛ\Û™[HHÝ\ÜÈ[›™YÙÚX]H
ÛÛYH[ˆ]X˜\ÙHÛÜœ›ÝÊHHÙYÝZ]ÈH[ˆ[˜ÚY[KZ[š[Z^ž˜[™ÈH[\HH[˜]]š]0èHH\™]HH]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[Z\œ›Üš[™ÈZH]H
]HZ\œ›Üš[™ÊJŠˆØÜš]™HH]HÚ[][[™X[Y[H[ˆYH[ÙÚH\Ý[H[ˆ[\È™X[H\ˆšYÛ™[ž˜KXH]ZHÚH\›HHš\š\Ý[˜\™HH[ˆ˜XÚÝ\ÝÜšXÛÈHÙYÝZ]ÈHÛÜœ^š[Û™K›ÛˆHÚ[˜Ü›Ûš^ž˜^š[Û™H]]˜K—ˆ
ˆ
ŠÊHHYœ˜[[Y[^š[Û™JŠˆH
Š‘
H	Ú[™XÚ^ž˜^š[Û™JŠˆÛÛ›ÈXÛšXÚHHÝ[Z^ž˜^š[Û™H[H™\Ý^š[ÛšH[]X˜\ÙHH›Ûˆš\ÛÛ›Û›ÈHÛÜœ^š[Û™HÈ[š\š\Ý[›ÈH]H\™]Kˆ‚ˆKˆÂˆYˆNLˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’[ˆ[‰Ø^šY[™HH\[™[H]›Û›È[™\™H[˜YÙHÙ[\™H[ˆš\ÝKˆÈØÛÜÈXÚX\˜]È0ê[›ÈÛÛÎˆ™[™\™H[[YYX][Y[HšXÛÛ›ÜØÚXš[HÚH›ÛˆÈÜKÛÜðëÚH[ˆ\Ý˜[™[ÈØ\XHH\ÜÙ\™H›Ý]ÈHš[[˜ÚHH[˜\™Kˆ[˜YÙH[ˆš\ÝH›Ûˆ\™H[Ý[˜HÜHH›Ûˆ™YÚ\Ý˜H[Ý[ˆ\ÜØYÙÚ[Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÈHÛÛ›ÛÈØ\˜]\š^ž˜HQQÓSÈ]Y\ÝHZ\Ý\˜OÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ›ÛÈÛÜœ™]]›È
ÛÜœ™XÝ]™HÛÛ›Û
H‹ˆŠHÛÛ›ÛÈ]\œ™[H
]\œ™[ÛÛ›Û
H‹ˆÊHÛÛ›ÛÈ[™\ÝYØ]]›ËÜš[]˜]]›È
]XÝ]™HÛÛ›Û
H‹ˆ‘
HÛÛ›ÛÈ\™]]›È
\™XÝ]™HÛÛ›Û
H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÛÛ›ÛÈ]\œ™[H
]\œ™[ÛÛ›Û
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜ÛÛ›ÛÈ]\œ™[H
]\œ™[ÛÛ›Û
JŠˆHÈØÛÜÈš[X\š[ÈHØÛÜ˜YÙÚX\™HÈ\ÜÝXY\™H[ˆÝ[žšX[H]XØØ[HÈ[ˆÛÛ\Ü[Y[È›Ûˆ]]Üš^ž˜]Èš[XHÚH]™[™ØKˆ\ÜÜœ™Hš\ÚXš[Y[H[˜YÙH[™ÙHHÛÛ[[È›ÛY[[ÜšXHš\Ú]›ÈH™[™H[[YYX][Y[H]šY[HÚH›Ûˆ0ê]]Üš^ž˜]ËØÛÜ˜YÙÚX[™ÈH[]]šHHZ[Ø][™Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆÛÛ›ÛÈÛÜœ™]]›ÊŠˆ[\šY[™HÜÈÚH	Ú[˜ÚY[H0ê]™[]È\ˆš\š\Ý[˜\™HÈÝ]ÈÝ[X[HZHÚ\Ý[ZK—ˆ
ˆ
ŠÊH[ˆÛÛ›ÛÈ[™\ÝYØ]]›È
]XÝ]™JJŠˆ[HHY[YšXØ\™H[‰Ú[\Ú[Û™HÈš[Û^š[Û™HÜÈÈY[™HÚH™\šYšXØH
\Ëˆ™YÚ\ÝšHÙË[\›ZJK—ˆ
ˆ
Š‘
H[ˆÛÛ›ÛÈ\™]]›ÊŠˆÝXš[\ØÙH™YÛÛHÈ[™YHÝZYHÛÛ\Ü[Y[[HØÜš]H™[	ÛÜ™Ø[š^ž˜^š[Û™KXH	Ø^š[Û™Hš\ÚXØHH[™ÜÜØ\™Hš\ÚXš[Y[H[˜YÙH\ˆØÛÜ˜YÙÚX\™H]XØÚHH[ˆ[\]È™]˜[[[Y[H]\œ™[Kˆ‚ˆKˆÂˆYˆNLKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H]™Hš\ÛÛ™\™HYH›Ø›[ZHÛÛˆHÜš]ÙÜ˜YšXNˆ›ÝYÙÙ\™H[ˆ\˜Ú]š[ÈHLÐˆÛÛœÙ\˜]ÈÝZH›ÜšHÙ\™\‹H\›Y]\™HZHÛY[H™\šYšXØ\™H	ÚY[]0èZHÙ\™\ˆHÝZHÚHÛÛYØ[›Ëˆ[X[H˜[]H]X[H[HYH˜[ZYÛYHÜš]ÙÜ˜YšXÚHÚXHY]HHÚX\ØÝ[ˆÛÛ\]Ëˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HY™™\›X^š[ÛšHÝ[ÛÛ™œ›ÛÈœ˜HÜš]ÙÜ˜YšXHÚ[[Y]šXØHH\Ú[[Y]šXØHÛÛ›ÈÛÜœ™]OÈ
ØÙYÛ[™HYJH‹ˆÜ[ÛœÎˆÂˆJHHÜš]ÙÜ˜YšXHÚ[[Y]šXØH0ê[ÛÈpîH™[ØÙHY0êHØÙ[HÚ]\ÝH\ˆÚYœ˜\™HÜ˜[™H›Û[ZHH]H‹ˆŠHHÜš]ÙÜ˜YšXH\Ú[[Y]šXØH\ØH[˜HÛÜXHHÚX]šHH™[™HÜÜÚXš[Hš\›XHYÚ][HH›Ûˆš\Y[È‹ˆÊHHÜš]ÙÜ˜YšXH\Ú[[Y]šXØH0êpîH™[ØÙHH]Y[HÚ[[Y]šXØHH\š]0èH]HHÚYœ˜\™H‹ˆ‘
HHÜš]ÙÜ˜YšXHÚ[[Y]šXØHÛÛœÙ[HHš\›XHYÚ][K\˜Ú0êHHÚX]™H›Ý˜H	ÚY[]0è[š\›X]\š[È‚ˆKˆ[œÝÙ\’[™^ˆˆ[œÝÙ\’[™^\ÎˆÌWKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]HÛÛ›ÈH
ŠJJŠˆHH
ŠŠJŠ‹——Šˆ
Š”\˜Ú0êHHJH0êÛÜœ™]NŠŠˆH
Š˜Üš]ÙÜ˜YšXHÚ[[Y]šXØJŠˆ\ØH
Š[˜HÛÛHÚX]™JŠˆ\ˆÚYœ˜\™HHXÚYœ˜\™KHHÝ[ÚH[ÛÜš]ZKQTÈ[ˆ\ÝKÛÛ›ÈÜ™[šHHÜ˜[™^ž˜HpîH˜\YHH]Y[H\Ú[[Y]šXÚK[˜ÚHÜ˜^šYH[	ØXØÙ[\˜^š[Û™H\™Ø\™H™\Ù[H[ˆÙÛšHÔH[Ù\›˜Kˆ0â\ˆ]Y\ÝÈÚH]ÈÚpìˆÚH0ê›Û[Z[›ÜÛËHLÐˆ[	Ø\˜Ú]š[ÈÛÛYH[ÛÜœÈH[˜HÛÛ›™\ÜÚ[Û™HËšY[™HÚYœ˜]ÈÚ[[Y]šXØ[Y[K—Šˆ
Š”\˜Ú0êHHŠH0êÛÜœ™]NŠŠˆH
Š˜Üš]ÙÜ˜YšXH\Ú[[Y]šXØJŠˆ\ØH[˜H
Š˜ÛÜXJŠˆHÚX]šHX][X]XØ[Y[HYØ]NˆÚpìˆÚH[˜HÚYœ˜KÛÛÈ	Ø[˜HXÚYœ˜KˆH]ZH\ØÙ[™Û›ÈHYHØ\XÚ]0èÚH[Ú[[Y]šXÛÈ›Ûˆpìˆ]™\™KˆH
Š™\ÝšX^š[Û™H[HÚX]šJŠˆÙ[ž˜H[ˆÙYÜ™]È™Y\Ú\Ý[K\˜Ú0êHHÚX]™HX˜›XØHpìˆ\ÜÙ\™H]HHÚ][œ]YKˆHH
Š™š\›XHYÚ][HÛÛˆ›Ûˆš\Y[ÊŠŽˆš\›X[™ÈÛÛˆH
Šœ›ÜšXHÚX]™Hš]˜]JŠ‹ÚH™\ÜÝ[ˆ[›ÈÜÜÚYYK[š\›X]\š[È›Ûˆpìˆ[ˆÙYÝZ]È™YØ\™HH]™\›È˜]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠÊJŠˆØ\Ý›ÛÙH[˜\ÜÈ™X[Kˆ	Ø\Ú[[Y]šXÛÈ0ê
Š›[ÛÈpîH[ÊŠ‹Y0ê™XÚ\Ø[Y[H]Y\ÝÈ[[Ý]›È\ˆÝZH™\ÜÝ[ˆ›ÝØÛÛÈÈ\ØH\ˆH]H™\šNˆÙ\™HÛÛÈHÛÛ˜ÛÜ™\™HÈ›ÝYÙÙ\™HHÚX]™HÚ[[Y]šXØK—ˆ
ˆ
Š‘
JŠˆ\ØÜš]™H]X[ÛÜØHÚH[Ú[[Y]šXÛÈ›Ûˆpìˆ˜\™KˆÛÛˆ[˜HÚX]™H
Š˜ÛÛ™]š\ØJŠˆœ˜HYH\K™\ÜÝ[˜H[HYHpìˆ[[ÜÝ˜\™HH[ˆ\ž›ÈÚH[Y\ÜØYÙÚ[È0êÝ]ÈØÜš]È[	Ø[˜Nˆ[˜[X™H]œ™X˜™\›ÈÝ]È›Ù\›ËˆX[˜ØH]Z[™H[›Ûˆš\Y[Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚHHÚ\Ý[ZH™X[HÛÛ›È
ŠšXœšYJŠˆH\Ø[›È[˜[X™HH˜[ZYÛYH\ˆÚpìˆ[ˆÝZHÚX\ØÝ[˜H0ê›ÜKˆ[ˆÈ	Ø\Ú[[Y]šXÛÈ]][XØH[Ù\™\ˆHÛÛ˜ÛÜ™HHÚX]™HHÙ\ÜÚ[Û™NÈ[Ú[[Y]šXÛÈÚYœ˜H]È[˜Y™šXÛÈÚHÙYÝYKˆ™YÛÛH˜]XØH\ˆšXÛÛ›ÜØÙ\™HHš\ÜÜÝNˆÙHÈØÙ[˜\š[È\›HH
Š›Û[YHH]HÈ™\Ý^š[ÛšJŠ‹0êÚ[[Y]šXÛÎÈÙH\›HH
ŠšY[]0èš\›XK›Ûˆš\Y[ÈÈØØ[Xš[ÈHÚX]šHœ˜HØÛÛ›ÜØÚ]]JŠ‹0ê\Ú[[Y]šXÛËˆ‚ˆKˆÂˆYˆNL‹ˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”™\ÜÛÈÙ[H[››Ý˜][ÛœÈÛÜœ‹Ø\˜Z›ÝHÚHHÜ›È\XØ^š[Û™H^šY[™[Hš[˜Ú\[KÚHY[™H˜XØÚXHYÛHÜ™[šHZHÛY[K›ÛˆYÙÚ[Ü›˜HXØÝ\˜][Y[HH]™[HH[™[\š[Ëˆ[ˆ™XÙ[HYÙÚ[Ü›˜[Y[ÈÙ[Xœ˜H]™\ˆ[›ÙÝÈ[ˆYËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÜš[ÛšHÙ™œš\™X˜™HHÛÛ^š[Û™HRQÓSÔ‘OÈ‹ˆÜ[ÛœÎˆÂˆJH›Û˜XÚÈ[	Ø\XØ^š[Û™H
\XØ][Ûˆ›Û˜XÚÊH‹ˆŠHÛÛ›ÛÈ[H\[™[ž™H
\[™[˜ÞHÚXÚÊH‹ˆÊHÙ\Ý[Û™H[H]Ú
]ÚX[˜YÙ[Y[
H‹ˆ‘
HšX]š[È[	Ø\XØ^š[Û™H
\XØ][Ûˆ™\Ý\
H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH›Û˜XÚÈ[	Ø\XØ^š[Û™H
\XØ][Ûˆ›Û˜XÚÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Šœ›Û˜XÚÈ[	Ø\XØ^š[Û™H
\XØ][Ûˆ›Û˜XÚÊJŠˆÛÛœÚ\ÝH™[š\š\Ý[˜\™H[‰Ø\XØ^š[Û™HH[›ÈÝ]ÈÈ™\œÚ[Û™H™XÙY[HÝXš[HHÙYÝZ]ÈH[ˆX[[žš[Û˜[Y[ÈÈYÈ[›ÙÝÈH[ˆYÙÚ[Ü›˜[Y[È™XÙ[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ÛÛ›ÛÈ[H\[™[ž™H
\[™[˜ÞHÚXÚÊJŠˆÙ\™HH™\šYšXØ\™HÚH]HHXœ™\šYHÈHXØÚ]H™XÙ\ÜØ\šHÚX[›È[œÝ[]KXH›ÛˆÛÜœ™YÙÙH[ˆYÈÙÚXÛÈ[›ÙÝÈ™[ÛÙXÙHÛÛˆ	ØYÙÚ[Ü›˜[Y[Ë—ˆ
ˆ
ŠÊHHÙ\Ý[Û™H[H]Ú
]ÚX[˜YÙ[Y[
JŠˆÜ™Ø[š^ž˜HH\ÝšX^š[Û™HÚ\Ý[X]XØHH]ÚHÚXÝ\™^ž˜HHYÙš^XH\ˆš[YYX\™H™[	Ú[[YYX]ÈH[ˆYÈ›ØØØ[H[ˆ›Ù^š[Û™HÚH™Y[YÙH[›Û˜XÚË—ˆ
ˆ
Š‘
H[šX]š[È[	Ø\XØ^š[Û™JŠˆ[\œ›Û\HHšX]šXHH›ØÙ\ÜÚH\ˆ[\™HHY[[ÜšXHÈ›Üž˜\™H[šXØ\šXØ[Y[ÈHÛÛ™šYÝ\˜^š[ÛšKXH›Ûˆš[][Ý™H[YÈÙÚXÛÈ™\Ù[H™[ÛÙØ\™H[ÙYšXØ]Ëˆ‚ˆKˆÂˆYˆNLËˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈÛÛ›Û[Ù[È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“™[	Ø\›ØØÚ[È™\›È\Ý[ÛÛ›ÛÈYÛHXØÙ\ÜÚHÝZY]ÈHÛXÞH
ÛXÞKYš]™[ˆXØÙ\ÜÈÛÛ›Û
H0ê[ˆ[\Ý›È›Û™[Y[[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÜš[ÛšH\ØÜš]™HQQÓSÈ[ÛÛ›ÛÈYÛHXØÙ\ÜÚHÝZY]ÈHÛXÞH™[	Ø\›ØØÚ[È™\›È\ÝÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛY[™HHÝ[žšX[HZ[˜XØÙHÙYÛY[[™ÈH™]Kˆ‹ˆŠHØ\˜[\ØÙH[˜\Ù™\š[Y[ÈÚXÝ\›ÈZH]HÜÈHXÚ\Ú[Û™HHXØÙ\ÜÛËˆ‹ˆÊH˜\ØHHXÚ\Ú[ÛšHHXØÙ\ÜÛÈÝHÛXÞHHÚXÝ\™^ž˜H™YYš[š]Kˆ‹ˆ‘
HÚHY™šYH[H˜[]^š[Û™HÛÛ[XH[ÛÛ\Ü[Y[È[	Ý][Kˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH˜\ØHHXÚ\Ú[ÛšHHXØÙ\ÜÛÈÝHÛXÞHHÚXÝ\™^ž˜H™YYš[š]H
˜\Ù\ÈXØÙ\ÜÈXÚ\Ú[ÛœÈÛˆ™YYš[™YÙXÝ\š]HÛXÚY\ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ÛÛ›ÛÈYÛHXØÙ\ÜÚH
ŠœÛXÞKYš]™[ŠŠˆ[ˆ™\›È\ÝÝXš[\ØÙHÚHÙÛšHšXÚY\ÝHHXØÙ\ÜÛÈ™[™ØH\Ø[Z[˜]HH˜[Y]HÛÛ™œ›Û[™ÛHÛÛˆ™YÛÛHHÛXÞHHÚXÝ\™^ž˜HÙ[˜[H™\ÝXš[]Hš[XHHÛÛ˜ÙY\™H	Ø]]Üš^ž˜^š[Û™Kˆ]Y\ÝÈØ\˜[\ØÙHÛÛœÚ\Ý[ž˜HHÛÛ™›Ü›Z]0è[H\™]]™H^šY[™[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÙYÛY[\™HH™]JŠˆ\ÛÛH\H[	Ú[™œ˜\Ý]\˜H\ˆÛÛ[™\™HZ[˜XØÙKXH›Ûˆ\ØÜš]™H[YXØØ[š\Û[ÈHXÚ\Ú[Û™HYÛHXØÙ\ÜÚH˜\Ø]ÈÝHÛXÞK—ˆ
ˆ
ŠŠHØ\˜[\™H[˜\Ù™\š[Y[ÈÚXÝ\›ÊŠˆšYÝX\™HHÜš]ÙÜ˜YšXHZH]H[ˆ˜[œÚ]È
\ËˆÊHÝXØÙ\ÜÚ]˜H[HXÚ\Ú[Û™HHXØÙ\ÜÛË›ÛˆHÜš]\šH[HXÚ\Ú[Û™HÝ\ÜØK—ˆ
ˆ
Š‘
HH˜[]^š[Û™HÛÛ[XH[ÛÛ\Ü[Y[ÊŠˆ0ê\H[[Ûš]Ü˜YÙÚ[ÈY]]›ËXH›Ûˆ˜\™\Ù[HHYš[š^š[Û™HÝ™]H[ÛÛ›ÛÈÝZY]ÈH™YÛÛHHÜš]\šHØÜš]H
ÛXÞJKˆ‚ˆKˆÂˆYˆNMˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈÛÛ›Û[Ù[È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™ÈH[\[Y[]È[ˆ[Ù[È™\›È\Ý[ˆÝZH[X[›ÈHÛÛ›ÛÈ™[™HHXÚ\Ú[ÛšHHXØÙ\ÜÛÈH[X[›È]HH\ÙYÝYHÝ[˜Y™šXÛÈ™X[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[H[X[›È]H\XØHHXÚ\Ú[Û™K™\šYšXØ[™È][HH\ÜÜÚ]]›Èš[XHÚH˜YÙÚ][™Ø[›ÈHš\ÛÜœØOÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞHYZ[š\Ý˜]Üˆ‹ˆŠHÛXÞH[™Ú[™H‹ˆÊHÛXÞH[™›Ü˜Ù[Y[Ú[‹ˆ‘
HÝXš™XÝ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÛXÞH[™›Ü˜Ù[Y[Ú[
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š”ÛXÞH[™›Ü˜Ù[Y[Ú[
T
JŠˆ0ê[ÛÛ\Û™[H[X[›È]H™\ÜÛœØXš[HHØ\˜[\™HÚHHÛXÞHHÚXÝ\™^ž˜HÚX[›È\XØ]H]X[™È[ˆ][HÈ\ÜÜÚ]]›È[HHXØÙY\™H[Hš\ÛÜœÙHH™]Kˆ[™ÙHHØ]ZÙY\\‹™\šYšXØ[™È	ÚY[]0èH[ÛÛ\ÝÈ[HšXÚY\ÝHHXØÙ\ÜÛÈHœ›ÛH[HÛXÞHÝXš[]Hš[XHHÛÛœÙ[\™HÈ™YØ\™H	ØXØÙ\ÜÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÛXÞHYZ[š\Ý˜]ÜŠŠˆÚHØØÝ\HHÛÛ][šXØ\™H[THXÚ\Ú[Û™HHÝXš[\™HÈ[\œ›Û\\™H[\˜ÛÜœÛÈHÛÛ][šXØ^š[Û™KXH›Ûˆ[\˜YÚ\ØÙH\™][Y[HÛÛˆH›\ÜÚH[]H[™H\ˆH™\šYšXØK—ˆ
ˆ
ŠŠHÛXÞH[™Ú[™JŠˆ0ê™\ÜÛœØXš[HH™[™\™HHXÚ\Ú[Û™HHXØÙ\ÜÛÈ˜\Ø[™ÜÚHÝ[HÛXÞKXH›Ûˆ\XØH\™][Y[HHXÚ\Ú[Û™H°êH[\˜YÚ\ØÙHÛÛˆH\ÜÜÚ]]šHÝ[]H[™K—ˆ
ˆ
Š‘
HÝXš™XÝ
Šˆ0ê	Ù[]0è
][HÈ\ÜÜÚ]]›ÊHÚHšY[™H™\šYšXØ]K›Ûˆ[ÛÛ\Û™[H™\ÜÛœØXš[H[›ØÙ\ÜÛÈH™\šYšXØKˆ‚ˆKˆÂˆYˆNMKˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆœ›ÝÜÙ\ˆÚHÛÛYØHH[ˆÚ]È^šY[™[HH[ÜÝ˜H	Ù\œ›Ü™Hš[\ÜÜÚXš[H™\šYšXØ\™H	Ù[Z][W‹\ˆ\ÜÙ[™È[Ù\YšXØ]È[Ù\™\ˆ˜[YË›ÛˆØØY]ÈHÛÛˆ[›ÛYHÛÜœ™]ËˆÝ[Ù\™\ˆ0êÝ]È[œÝ[]ÈÛÛ[È[Ù\YšXØ]Èš[˜[NÈ	Ø]]Üš]0èÚHÈH[Y\ÜÛÈ›Ûˆ0ê[˜HÐH˜YXÙHXH[˜HÐHÝX›Ü™[˜]K[ÝZHÙ\YšXØ]È›Ûˆ0ê™Z[œÝ[]È™ZHœ›ÝÜÙ\‹ˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0êHØ]\ØH[	Ù\œ›Ü™HHÛÛYHÚHš\ÛÛ™OÈ‹ˆÜ[ÛœÎˆÂˆJH[Ù\YšXØ]È[Ù\™\ˆ0êØØY]Îˆ˜HšXÚY\ÝÈ[ˆš[››Ý›È[HÐH[Z][H‹ˆŠHX[˜ØH[Ù\YšXØ]È[\›YY[Îˆ[Ù\™\ˆ]™H™\Ù[\™H	Ú[\˜HØ][˜Hš[›È[H˜YXÙH‹ˆÊH[Ù\YšXØ]È›Ûˆ0êÝ]È™]›ØØ]ÈÛÜœ™][Y[Nˆ˜HYÙÚ[Ü›˜]HH\ÝHH™]›ØØH‹ˆ‘
H[œ›ÝÜÙ\ˆ›ÛˆÝ\ÜH	Ø[ÛÜš][ÈHš\›XNˆ˜H[Y\ÜÛÈ[ˆ[Ý›ÈÙ\YšXØ]ÈÛÛˆ”ÐH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHX[˜ØH[Ù\YšXØ]È[\›YY[ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHšYXÚXH[ˆ[˜HÒHÚHÛÜÝZ\ØÙH[™ÛÈ[˜H
Š˜Ø][˜JŠ‹›ÛˆÝH[ˆÚ[™ÛÛÈØÝ[Y[Ëˆ[œ›ÝÜÙ\ˆÛÛ›ÜØÙHHÛÛœÚY\˜H][™Xš[HÛÛ[ÈH
ŠÐH˜YXÙJŠˆ™Z[œÝ[]H™[›Üš[È\˜Ú]š[ÎÈ\ˆšY\œÚH[Ù\YšXØ]È[Ù\™\ˆ]™HÝ\ˆš\Ø[\™HH\ÜÛËš\›XHÜÈš\›XKš[›ÈH[˜HH]Y[H˜YXÚKˆ™[Y^ž›ÈÝ[››ÈH
ŠÐH[\›YYYJŠ‹ÚHH˜YXÚH\Ø[›È\ˆš\›X\™HHÙ\YšXØ]Hš[˜[H›Üš[È\ˆ[™\™HHÚX]šH˜YXÙHÙ™›[™HH[ÚXÝ\›ËˆÙH[Ù\™\ˆ™\Ù[HÛÛÈ[›Üš[ÈÙ\YšXØ]Ë[œ›ÝÜÙ\ˆÚH™\›XNˆH[ˆX[›È[ˆØÝ[Y[Èš\›X]ÈH[‰Ù[]0èHÝZH›ÛˆØH[KH›ÛˆH[ÙÈHØÛÜš\™HHÚH]Y[	Ù[]0èÚXHÝ]HHÝXH›ÛHš\›X]KˆHÛÛ^š[Û™H0êÛÛ™šYÝ\˜\™H[Ù\™\ˆ\˜Ú0êH[šZH
Š›	Ú[\˜HØ][˜JŠ‹Ú[ðê[Ù\YšXØ]Èš[˜[HÙYÝZ]ÈH]HÛH[\›YYKˆH˜YXÙH›ÛˆÙ\™H˜\ÛY]\›Nˆ[œ›ÝÜÙ\ˆÙH	ÚHÚpèY0ê]Y[È[[È	Ø\œš]›Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÙ\YšXØ]ÈØØY]ÎŠŠˆÈØÙ[˜\š[ÈÈ\ØÛYH\ÜXÚ][Y[KH[ˆÙ\YšXØ]ÈØØY]È›Ù\œ™X˜™H[ˆ\œ›Ü™H]™\œÛÈH™[ˆšXÛÛ›ÜØÚXš[KÚH\›HH˜[Y]0è[\Ü˜[HH›ÛˆH[Z][K—ˆ
ˆ
ŠÊH\ÝHH™]›ØØNŠŠˆšYÝX\™H[ˆÙ\YšXØ]È
Š˜[YÈXH™]›ØØ]ÊŠ‹HÙ[™\˜H[˜Ú	Ù\ÜÛÈ[ˆY\ÜØYÙÚ[È]™\œÛËˆ]ZH[›Ø›[XHÚH™\Ù[Hš[XH[˜ÛÜ˜HHÝ\ˆ[\œ›ÙØ\™HÈÝ]ÈH™]›ØØK\˜Ú0êHHØ][˜HHšYXÚXH›ÛˆÚHÚ]YK—ˆ
ˆ
Š‘
H[ÛÜš][ÈHš\›XH›ÛˆÝ\Ü]ÎŠŠˆ›Ù\œ™X˜™H[ˆ\œ›Ü™HÚH›ÛZ[˜H	Ø[ÛÜš][ËHšYÝX\™\™X˜™H]HHÙ\YšXØ]H[Y\ÜÚHH]Y[HÐKˆ[Y\ÜØYÙÚ[È[ÈØÙ[˜\š[È[™XØH[™XÙHÛÛˆ™XÚ\Ú[Û™H[[Îˆ	ÊŠ™[Z][JŠˆ›Ûˆ0ê™\šYšXØXš[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[[Üš^ž˜HHØ][˜HH[Ý[È™\œÛËˆ
ŠÙ\YšXØ]Èš[˜[JŠˆ
[Ù\™\ŠH8¡¤š\›X]ÈH8¡¤ˆ
ŠÐH[\›YYXJŠˆ8¡¤š\›X]HH8¡¤ˆ
ŠÐH˜YXÙJŠ‹ÚH0ê]]Ùš\›X]HHš]™H™[	Ø\˜Ú]š[ÈHšYXÚXH[Ú\Ý[XKˆ[Ú[Û[ÈÛ\ÜÚXÛÈ[	Ú[\›YY[ÈX[˜Ø[H0ê[ˆÚ]ÈÚH[žš[Û˜HÝH[ˆœ›ÝÜÙ\ˆH˜[\ØÙHÝH[ˆ[›ËÈÚH[žš[Û˜HH\ÚÝÜH›ÈHÙ[[\™Nˆ[Ý[šHÛY[ÛÛœÙ\˜[›ÈÛH[\›YYH[˜ÛÛ˜]H[ˆ™XÙY[ž˜HHX\ØÚ\˜[›È	Ù\œ›Ü™KˆšXÛÜ™H[™š[™H\˜Ú0êHHÝ]\˜H\Ú\ÝNˆHÚX]™H[HÐH˜YXÙHšY[™H[]H
Š›Ù™›[™JŠ‹ÛÜðëÚH[˜HÛÛ\›ÛZ\ÜÚ[Û™HÛÛ\ØØH[pîH[‰Ú[\›YYXKÚHpìˆ\ÜÙ\™H™]›ØØ]HÙ[ž˜H˜]›ÛÙ\™H	Ú[\˜H[™œ˜\Ý]\˜Kˆ‚ˆKˆÂˆYˆNM‹ˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ\›ØÚ[˜[H[™\\ÈX\šÙ][™ÈXØÙYHÛÜœ™][Y[H[Ü[H^šY[™[HÛÛˆH›ÜšYHÜ™Y[žšX[HHH™\šYšXØH[ˆYH\ÜØYÙÚKˆ[˜H›ÛH[›Ë\°ì‹\™HÙ[ž˜H[Ý[ˆÜÝXÛÛÈHÙ^š[Û™H[H\ÝHYØHH]È[\œÛÛ˜[Kˆ[™YÚ\Ý›È[ÜÝ˜HÚH[Ú\Ý[XHHšXÛÛ›ÜØÚ]]È	Ý][HÙ[ž˜H\œ›ÜšHHÚH™\ÜÝ[ˆÛÛ›ÛÈ0ê[\™[]ÈÝ[HšXÚY\ÝHÝXØÙ\ÜÚ]˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[H™HH0ê˜[]KH]X[H›ÏÈ‹ˆÜ[ÛœÎˆÂˆJH0â˜[]H	Ø]][XØ^š[Û™NˆHÜ™Y[žšX[H[\›ØÚ[˜[H[™]˜[›ÈšYš]]]H‹ˆŠH0â˜[]HH˜XØÚXXš[]0èˆÙ[ž˜H™YÚ\Ý›È›ÛˆÚHØ\™X˜™HÝ]ÈšXÛÜÝZ\™H	ØXØÙ\ÜÛÈ‹ˆÊH0â˜[]H	Ø]]Üš^ž˜^š[Û™Nˆ	ÚY[]0è\˜HÛÜœ™]KH\›Y\ÜÚHÛÛ˜Ù\ÜÚH›È‹ˆ‘
H™\ÜÝ[˜H0ê˜[]Nˆ	Ý][H\˜H]][XØ]Ë]Z[™H	ØXØÙ\ÜÛÈ0ê\ˆYš[š^š[Û™HYÚ][[È‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH0â˜[]H	Ø]]Üš^ž˜^š[Û™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH™HHš\ÜÛ™Û›ÈH™HÛX[™H\Ý[HHÛÛœÙXÝ]]™Kˆ	ÊŠ˜]][XØ^š[Û™JŠˆÚYYH
˜ÚHÙZJˆH]ZHH[žš[Û˜]È\™™][Y[Nˆ[\›ØÚ[˜[H0ê]™\›ÈÚHXÚX\˜HH\ÜÙ\™KHÜ™Y[žšX[HÛÛ›ÈÝYHHH™\šYšXØH[ˆYH\ÜØYÙÚH0êÝ]HÝ\\˜]Kˆ	ÊŠ˜]]Üš^ž˜^š[Û™JŠˆÚYYH
˜ÚHÛÜØHH0ê\›Y\ÜÛÈ˜\™J‹H[\šY[™H
Š™ÜÊŠˆ	ÚY[YšXØ^š[Û™KÝHÙÛšHÚ[™ÛÛHš\ÛÜœØHšXÚY\ÝKˆ0â]Y\ÝÈ[ÛÛ›ÛÈX[˜Ø]Îˆ[HH[\Y]ÈH[ˆ][H[X\šÙ][™ÈH\š\™HH\ÝHYØK]Z[™HH\›Y\ÜÚHÛÛ˜Ù\ÜÚH›ÛˆÛÜœš\ÜÛ™Û›È[[ÛËˆH\Ý[žš[Û™H0êH˜YÚ[Û™H\ˆÝZH[
Šœš]š[YÚ[ÈZ[š[[ÊŠˆ0ê[ˆš[˜Ú\[ÈHðêNˆ]][XØ\™H™[™H›ÛˆÙ\™HH[HÙHÚHÙÛšH][H]][XØ]Èpìˆ˜YÙÚ][™Ù\™H]ËH	Ù\œ›Ü™H\ØÜš]È™\ÝH[š\ÚXš[Hš[˜Ú0êH]X[Ý[›È›Ûˆ™H\›Ùš]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH]][XØ^š[Û™NŠŠˆ0ê\Ø][Y[HÚpìˆÚHH[žš[Û˜]ËˆHÜ™Y[žšX[H\˜[›ÈYÚ][YHH\\[™]˜[›È]™\›È[\›ØÚ[˜[NˆšYš]]\›HØ\™X˜™HÝ]È[ˆ\œ›Ü™K›Ûˆ[˜H›Ý^š[Û™K—ˆ
ˆ
ŠŠH˜XØÚXXš[]0èŠŠˆH[˜Ú	Ù\ÜØH[žš[Û˜]ËY0êH˜YÚ[Û™H\ˆÝZHØ\X[[ÈÛÛIðê[™]Kˆ	Ê˜XØÛÝ[[™Êˆ™YÚ\Ý˜HÛÜØH0êÝXØÙ\ÜÛËXH\ˆÛÜÝ^š[Û™H
Š››Ûˆ[\Y\ØÙH[JŠŽˆ0ê[ˆÛÛ›ÛÈ]XÝ]™HÚHYÚ\ØÙHÜË—ˆ
ˆ
Š‘
H™\ÜÝ[˜H0ê˜[]NŠŠˆ0ê	Ù\œ›Ü™HÛÛ˜Ù]X[HÚHHÛX[™H[ÛHÛX\ØÚ\˜\™Kˆ]][XØ]È›ÛˆÚYÛšYšXØH]]Üš^ž˜]Îˆ	ÚY[]0èÛÛ™™\›X]HXÙHÛÛ[È
Š˜ÚJŠˆÝHÚYY[™ËXZH
ŠœÙJŠˆpìˆÝ[™\™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[šH™\›YHH™HÛX[™H[ˆÙ\]Y[ž˜K\˜Ú0êHHÛX[™H	Ù\Ø[YHHÚYYÛ›È]X[H[™[ÈÚHÚXHÜ^ž˜]Ëˆ
Š]][XØ^š[Û™JŠˆHÚHÙZKÛÛˆ\ÜÝÛÜ™QKš[ÛY]šXKÙ\YšXØ]H0­È
Š]]Üš^ž˜^š[Û™JŠˆHÛÜØH[ÚH˜\™KÛÛˆPËPPËPÓš]š[YÚ[ÈZ[š[[È0­È
ŠXØÛÝ[[™ÈÈ˜XØÚXXš[]0è
ŠˆHÛÜØHZH˜]ËÛÛˆÙË]Y]˜Z[H›Ûˆš\Y[Ëˆ[ÙYÛ˜[HÚH[™XØH[ˆ˜[[Y[ÈH]]Üš^ž˜^š[Û™H0êÙ[\™HÈÝ\ÜÛÎˆ[ˆ][H
Š›YÚ][[ÈHÛÜœ™][Y[H]][XØ]ÊŠˆÚH˜YÙÚ][™ÙH]X[ÛÜØHÚH›ÛˆÛHÛÛ\]Kˆ‚ˆKˆÂˆYˆNMËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ‘\˜[H	Ú[œÙ\š[Y[ÈÛ›[™HH[˜H\ÜÝÛÜ™]˜[ˆ›ÝHÚHÙÛšH]\˜HYÚ]]HšY[™H˜\Y[Y[HÛÜÝ]Z]HH[ˆ[[›È™\›Ëˆ]˜[ˆ›Ý˜H]Y\ÝÈ˜\ÝY[ÜÛÈÚXÚ0êHÛHØ\]HH[œÙ\š\™HH\ÜÝÛÜ™\œ˜]H[ˆ]X[ÈHØÚ\›[ÈÛÛ\Z[Û›ÈÛÛÈ[H[[šH]X[HÛÛ›ÈHØ\˜]\šHYÚ]]Kˆ‹ˆ]Y\Ý[ÛŽˆÚHÛÜØHÝHÜÜÙ\˜[™È]˜[È‹ˆÜ[ÛœÎˆÂˆJHÚÙ[š^˜][Ûˆ‹ˆŠH]HX\ÚÚ[™È‹ˆÊHÝYØ[›ÙÜ˜\H‹ˆ‘
H[˜Üž\[Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH]HX\ÚÚ[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š›X\ØÚ\˜[Y[ÈZH]H
]HX\ÚÚ[™ÊJŠˆ0ê[˜HXÛšXØH\Ø]H\ˆ˜\ØÛÛ™\™H[Ý[šHÈ]HHØ\˜]\šH[ˆ[˜HÙ\]Y[ž˜HÙ[ž˜H[\˜\™H[]ÈÜšYÚ[˜[KˆÛÜÝ]Z\™HH]\™HYÚ]]H[ˆ[ˆØ[\È\ÜÝÛÜ™ÛÛˆZH[H0ê[ˆÛ\ÜÚXÛÈ\Ù[\[ÈHX\ØÚ\˜[Y[Èš\Ú]›È\ˆ™]™[š\™HÈÚÝ[\ˆÝ\™š[™Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚÙ[š^˜][ÛŠŠˆÛÜÝ]Z\ØÙH[ˆ[[Y[ÈH]ÈÙ[œÚXš[HÛÛˆ[ˆ\]Z]˜[[H›ÛˆÙ[œÚXš[H
ÚÙ[ŠHš]›ÈH˜[Ü™H\Ýš[œÙXÛÈÈÙÚXÛËY[[Üš^ž˜[™È[YØ[YH[ˆ[ÙÈÚXÝ\›Ë—ˆ
ˆ
ŠÊHÝYØ[›ÙÜ˜\JŠˆÛÛœÚ\ÝH™[˜\ØÛÛ™\™H[ˆš[K[ˆY\ÜØYÙÚ[ÈÈ[‰Ú[[XYÚ[™H[	Ú[\››ÈH[ˆ[›Èš[HÜÜ]H\ˆÙ[\›™H	Ù\Ú\Ý[ž˜K—ˆ
ˆ
Š‘
H[˜Üž\[ÛŠŠˆ0ê[›ØÙ\ÜÛÈHÛÛ™\œÚ[Û™HH]HYÙÚXš[H[ˆ[ˆÛÙXÙH[YÙÚXš[H
\ÝÈÚYœ˜]ÊH˜[Z]H[ÛÜš]ZHX][X]XÚHHÚX]šK\ˆ[\Y\›™H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]ÈHš\ÜÛÈÈ[ˆ˜[œÚ]Ëˆ‚ˆKˆÂˆYˆNNˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HZ\Ý\™HHÚXÝ\™^ž˜H[™›Ü›X]XØHÛÛ\™[™Û›È]™\œÚH\HHÛÛ›ÛH
™]™[]šKš[]˜]]šKÛÜœ™]]šK\™]]šK]\œ™[KÛÛ\[œØ]]šJKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÜš[ÛšH0ê[ˆÛÛ›ÛÈÛÜœ™]]›È
ÛÜœ™XÝ]™HÛÛ›Û
OÈ‹ˆÜ[ÛœÎˆÂˆJH[œÝ[^š[Û™HH[ˆš\™]Ø[
[\[Y[[™ÈHš\™]Ø[
H‹ˆŠH›Ü›X^š[Û™HÝ[HÛÛœØ\]›Û^ž˜H
ÙXÝ\š]H]Ø\™[™\ÜÈ˜Z[š[™ÊH‹ˆÊH[[Z[˜^š[Û™HÛÛˆÙ[œÛÜ™HH[Ýš[Y[È
[Ý[ÛˆÙ[œÛÜˆYÚ[™ÊH‹ˆ‘
Hš\š\Ý[›ÈZH]HZH˜XÚÝ\
™\ÝÜš[™È]Hœ›ÛH˜XÚÝ\ÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
Hš\š\Ý[›ÈZH]HZH˜XÚÝ\
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Šœš\š\Ý[›ÈZH]HZH˜XÚÝ\
™\ÝÜš[™È]Hœ›ÛH˜XÚÝ\ÊJŠˆ0ê[ˆÛÛ›ÛÈÛÜœ™]]›È\˜Ú0êHš\ÜÛ™H\™][Y[HH[ˆ[˜ÚY[H
ÛÛYHH\™]HÈHÛÜœ^š[Û™HZH]JH\ˆš\Ü\™H[Ú\Ý[XHÈH[™›Ü›X^š[ÛšH[Ü›ÈÝ]ÈÜ\˜]]›È[YÜ›È™XÙY[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH	Ú[œÝ[^š[Û™HH[ˆš\™]Ø[
Šˆ0ê[ˆÛÛ›ÛÈ™]™[]›Ë[ˆ]X[ÈYÚ\ØÙHÛÛYH˜\œšY\˜H\ˆ›ØØØ\™H	ØXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]Èš[XHÚH]™[™ØK—ˆ
ˆ
ŠŠHH›Ü›X^š[Û™HÝ[HÛÛœØ\]›Û^ž˜JŠˆ0ê[ˆÛÛ›ÛÈ™]™[]›ËZ\˜]ÈH\ÝZ\™HÛH][H\ˆšY\œ™HH›Ø˜Xš[]0èÚHÛÛ\X[›È^š[ÛšH[œÚXÝ\™K—ˆ
ˆ
ŠÊH	Ú[[Z[˜^š[Û™HÛÛˆÙ[œÛÜ™HH[Ýš[Y[ÊŠˆ0ê[ˆÛÛ›ÛÈ™]˜[[[Y[H]\œ™[KZ\˜]ÈHØÛÜ˜YÙÚX\™HXØÙ\ÜÚHš\ÚXÚH›Ûˆ]]Üš^ž˜]Kˆ‚ˆKˆÂˆYˆNNKˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ]Y]™\ÜÛÈHÛØ˜[XÚÛÜœš[]˜HÚHHÛXÞHHH›ØÙY\™HØÜš]H›ÛˆÛÛ›ÈÝ]Hš]š\ÝHH]X]›È[›šKˆ™[œ˜][\ÈÛÛ›È[˜]H[ˆšYÛÜ™HYH[ÝšHØ˜›YÚHHYÙÙHÝ[˜][Y[ÈZH]HZHÛY[KÚHHØÝ[Y[H›Ûˆ™XÙ\\ØÛÛ›ËH	Ø^šY[™HH\\È[˜HÙYH[ˆ[ˆ[›ÈY\ÙHÛÙÙÙ]HH[ˆ™YÛÛ]Ü™H]™\œÛËˆ[[XKH™\ÜÛœØXš[H[HÛÛ™›Ü›Z]0èÚYYHH\Ý]Z\™H[ˆÚXÛÈH™]š\Ú[Û™H\š[ÙXØKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0ê[[Ý]›ÈpæH[\Ü[H\ˆYÙÚ[Ü›˜\™H\š[ÙXØ[Y[H[HØÝ[Y[HHÛÛYH[™›Y[ž˜[›ÈHÜÝ\˜HHÚXÝ\™^ž˜HÛÜœ™[H[	ÛÜ™Ø[š^ž˜^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJH\ˆ[™\™HYÙÚ[Ü›˜]HHXYÜ˜[[ZHHHÜXÚYšXÚHHÚX\ØÝ[ˆ\\˜]Ëˆ‹ˆŠH\ˆØ\˜[\™HÚH™\Ý[›È\[™[HHÛÛ™›Ü›ZHH›Ü›X]]™HÚHØ[XšX[›Ëˆ‹ˆÊH\ˆ[[™X\›H[H™XÙ[H[ÙYšXÚHZH›ØÙ\ÜÚH^šY[™[Kˆ‹ˆ‘
H\ˆÝš[\\™H[ÝšH›ÙÝHHÙ\š^šKˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH\ˆØ\˜[\™HÚH™\Ý[›È\[™[HHÛÛ™›Ü›ZHH›Ü›X]]™HÚHØ[XšX[›ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆÛHYÙÚ[Ü›˜[Y[H™YÛÛ\šHHÛXÞHH›ØÙY\™H\ÜÚXÝ\˜[›ÈÚH	ÛÜ™Ø[š^ž˜^š[Û™Hš[X[™ØH[[™X]HÛÛˆH›ØÙ\ÜÚH^šY[™[HHÛÛˆHÛÛ[ZHØ[XšX[Y[H›Ü›X]]šHHYÚ\Û]]šKˆÙHHÛXÞH›ÛˆØ[XšX[›ÈÛÛˆ	Ù]›Û^š[Û™HZH™\]Z\Ú]HHÛÛ™›Ü›Z]0è	Ø^šY[™HÚH\ÜÛ™HHÚYÛšYšXØ]]šHš\ØÚHYØ[Kš[˜[žšX\šHHHÚXÝ\™^ž˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[™\™HYÙÚ[Ü›˜]HXYÜ˜[[ZHHÜXÚYšXÚHYÛH\\˜]JŠˆ˜HšY™\š[Y[ÈH[™[\šHXÛšXÚHHXYÜ˜[[ZHH™]K›Ûˆ[HÛÝ™\›˜[˜ÙHÙ[™\˜[H\ØÜš]H[HÛXÞK—ˆ
ˆ
ŠÊH[[™X\›H[H[ÙYšXÚHZH›ØÙ\ÜÚH^šY[™[NŠŠˆ0ê[˜H˜YÚ[Û™H
Šœ™X[HHœ™\]Y[JŠˆ\ˆš]™Y\™H[˜HÛXÞKY0ê[[Ý]›È\ˆÝZH]Y\ÝÈ\Ý˜]Ü™H˜H]ÈÛÛˆ][žš[Û™Kˆ]ZH\°ìˆ›Ûˆ0ê[[Ý]›È
ŠœpîH[\Ü[JŠ‹\˜Ú0êHÈØÙ[˜\š[È›Ûˆ\ØÜš]™H›ØÙ\ÜÚH[\›šHØ[XšX]Nˆ\ØÜš]™H
Š›Ø˜›YÚH\Ý\›šH[ÝšJŠˆÚHHØÝ[Y[H›Ûˆ™XÙ\\ØÛÛ›Ëˆ[ˆ\Ø[[™X[Y[È[\››ÈÛÜÝHY™šXÚY[ž˜NÈ[ˆ\Ø[[™X[Y[È›Ü›X]]›ÈÛÜÝHØ[žš[ÛšK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÛXÞHÚHš]™YÛ›È\ˆ
Š™JŠˆ[Ý]šKHHÛX[™HÚYYH]X[H\ØHHpîH™[Ø\ÛÈ\ØÜš]Ëˆ
ŠØ[XšX[Y[H\Ý\›šJŠˆ8 %YÙÚK™YÛÛ]ÜšKÝ[™\™ÛÛ˜]X[NˆÛÛ›ÈHpîHš[˜ÛÛ[K\˜Ú0êH›ÛˆÚH™YÛÞšX[›È0­È
ŠØ[XšX[Y[H[\›šJŠˆ8 %›ØÙ\ÜÚKÜ™Ø[š^ž˜^š[Û™KXÛ›ÛÙÚYHYÝ]H0­È
Š“^š[ÛšH\™\ÙJŠˆ8 %[˜ÚY[K\Ú]HH]Y]š\Ý[]H[H\Ù\˜Ú]^š[ÛšKˆ]X[™ÈÈØÙ[˜\š[È›ÛZ[˜H[ˆ
Šœ™YÛÛ]Ü™K[˜H›Ü›X]]˜H[˜]H[ˆšYÛÜ™HÈ[˜HÙYH[ˆ[ˆ[›ÈY\ÙJŠ‹Hš\ÜÜÝH0êHÛÛ™›Ü›Z]0è›Ü›X]]˜K—ˆ
ˆ
Š‘
HÝš[\\™H[ÝšH›ÙÝHHÙ\š^šJŠˆ›Ûˆ0êÈØÛÜÈš[˜Ú\[H[H]]š]0èH]Y]HHYÙÚ[Ü›˜[Y[È[HØÝ[Y[^š[Û™HHÚXÝ\™^ž˜Kˆ‚ˆKˆÂˆYˆŒˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H\ÚY\˜HØ\˜[\™HÚHH›ÜšH\[™[H][^žš[›ÈHš\ÛÜœÙH^šY[™[H[ˆ[ÙÈÛÜœ™]ÈY]XÛËˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[H^š[ÛšH˜\™\Ù[H[ˆ\Ù[\[ÈHÛÛ›ÛÈ\™]]›È
\™XÝ]™HÛÛ›Û
HÚH	Ø^šY[™HÝ™X˜™H[\[Y[\™H\ˆY™œ›Û\™H]Y\ÝH™[ØØÝ\^š[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJH˜\ˆYÙÙ\™HHÛÝÜØÜš]™\™HH]HH\[™[H[˜HÛXÞHH\ÛÈXØÙ]Xš[H
UT
H‹ˆŠH\Ø[Z[˜\™HHš[HHÙÈ[HšXÙ\˜ØHHÙYÛšHHXØÙ\ÜÛÈ›Ûˆ]]Üš^ž˜]È‹ˆÊH[\Üœ™H	Ø]][XØ^š[Û™HHpîH˜]ÜšH]X[™È]Y[HH˜]Ü™HÚ[™ÛÛÈ˜[\ØÙH‹ˆ‘
HÛÛ™\œ™H\š[ÙXØH›Ü›X^š[Û™HÝ[HÛÛœØ\]›Û^ž˜HHÚXÝ\™^ž˜H\ˆH\[™[H‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH˜\ˆYÙÙ\™HHÛÝÜØÜš]™\™HH]HH\[™[H[˜HUT
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜HÛXÞHH][^ž›ÈXØÙ]Xš[H

ŠUTHXØÙ\X›H\ÙHÛXÞJŠŠHYš[š\ØÙHH™YÛÛHHÛÛ\Ü[Y[ÈÝ[	Ý\ÛÈZH™[šH^šY[™[KˆšXÚYY\™HHš\›XHHH]\˜H[HUT0ê[ˆÛÛ›ÛÈ\™]]›È
\™XÝ]™HÛÛ›Û
H\˜Ú0êH™\ØÜš]™H[ˆ[ÙÈ\ÜXÚ]ÈH^š[ÛšHHHÛÛ™ÝH]\ÙHZH\[™[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH\Ø[Z[˜\™HHš[HHÙÊŠˆ0ê[ˆÛÛ›ÛÈ[™\ÝYØ]]›ËÜš[]˜]]›È
]XÝ]™JK›ÛÈHY[YšXØ\™H[˜ÚY[HÜÈ[Ü›ÈXØØY[Y[Ë—ˆ
ˆ
ŠÊH[\Üœ™H	ÓQJŠˆ0ê[ˆÛÛ›ÛÈXÛšXÛËÜ™]™[]›È\ˆ›ØØØ\™HXØÙ\ÜÚH›Ûˆ]]Üš^ž˜]K—ˆ
ˆ
Š‘
HH›Ü›X^š[Û™HÝ[HÛÛœØ\]›Û^ž˜JŠˆ0ê[\Ý˜]Ü™HpîH[œÚY[ÜÛË\˜Ú0êH[˜Ú	Ù\ÜØHYÚ\ØÙHÝ[ÛÛ\Ü[Y[È[H\œÛÛ™KˆHY™™\™[ž˜HÝH™[
Š™\˜›ÊŠŽˆHUT
Šœ™\ØÜš]™JŠˆ[˜HÛÛ™ÝHHH˜HÛÝÜØÜš]™\™KÜ™X[™È[ˆØ˜›YÛÈ™\šYšXØXš[HHÜÛšXš[NÈH›Ü›X^š[Û™H
Š›Y]H[ˆÜ˜YÊŠˆHšXÛÛ›ÜØÙ\™H[˜HZ[˜XØÚXKY0ê]Z[™HÛ\ÜÚYšXØ]HÛÛYHÛÛ›ÛÈ
Šœ™]™[]›ÊŠ‹ˆ™YÛÛH˜]XØNˆÙH[ØÝ[Y[ÈXÙH
™]šJˆY0êš\›X]Ë0ê\™]]›ÎÈÙH[œÙYÛ˜H
˜ÛÛYHÚH˜J‹0ê™]™[]›Ë——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆHÛÛ›ÛH
Š™\™]]šJŠˆÛÛ›È]Y[HÚH[™\š^ž˜[›È[ÛÛ\Ü[Y[ÈÛÛˆ[˜H™YÛÛHØÜš]H8 %ÛXÞK›ØÙY\™KØ\[KÛ]\ÛÛHÛÛ˜]X[Kˆ›Ûˆ[\Y\ØÛÛ›ÈX]\šX[Y[H[KY0ê›Üš[È]Y\ÝÈH\Ý[™ÝY\›HZH
Šœ™]™[]šJŠŽˆ[˜HUT›Ûˆ›ØØØH[ÝÛ›ØYH[ˆš[KXHÝXš[\ØÙHÚHÚXHšY]]ÈH™[™HØ[žš[Û˜Xš[HÚHÈ˜Kˆ\ˆ]Y\ÝÈH\™]]šHÛÛ›ÈÜ\ÜÛÈH˜\ÙHÝHÝZHÙÙÚX[›ÈHÛÛ›ÛHXÛšXÚKHHš\ÜÜÝHÛÜœ™]H]X[™ÈÈØÙ[˜\š[È\›HH
Šœ™YÛÛKÛXÞHÈš\›XHH[ˆØÝ[Y[ÊŠ‹ˆ‚ˆKˆÂˆYˆŒKˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HÙ\Ý[Û™H[HÜš]ÙÜ˜YšXHHÚX]™HX˜›XØHÝH\™ØHØØ[HšXÚYYH[˜HÝ]\˜HÜ™Ø[š^ž˜]]˜KXÛ›ÛÙÚXØHH›ØÙY\˜[HÝ[™\™^ž˜]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\›Z[™HšY[™H][^ž˜]È\ˆ\ØÜš]™\™HHÜ™X^š[Û™K\ÝšX^š[Û™KY[[Üš^ž˜^š[Û™HH™]›ØØHZHÙ\YšXØ]HYÚ][OÈ‹ˆÜ[ÛœÎˆÂˆJHÙ^HÙ[™\˜][Ûˆ‹ˆŠHX›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆÊHÙ^H^Ú[™ÙH‹ˆ‘
HÙ^H\ØÜ›ÝÈ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHX›XÈÙ^H[™œ˜\ÝXÝ\™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š”X›XÈÙ^H[™œ˜\ÝXÝ\™H
ÒJJŠˆ0ê	Ú[œÚY[YHH[ÛKÛ]XÚK›ØÙ\ÜÚK\™Ø\™HHÛÙØ\™H™XÙ\ÜØ\šH\ˆÙ\Ý\™H	Ú[\›ÈÚXÛÈHš]HZHÙ\YšXØ]HYÚ][HH[HÚX]šHÜš]ÙÜ˜YšXÚH
[˜Û\ØHHÜ™X^š[Û™K\ÝšX^š[Û™KY[[Üš^ž˜^š[Û™HH™]›ØØJK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÙ^HÙ[™\˜][ÛŠŠˆ0êÛÛÈHš[XH˜\ÙHHÙ[™\˜^š[Û™H[HÛÜXHHÚX]šHÜš]ÙÜ˜YšXÚK—ˆ
ˆ
ŠÊHÙ^H^Ú[™ÙJŠˆ0ê[›ÝØÛÛÈÛÛˆÝZHYH\HÚHØØ[XšX[›È[ˆÚXÝ\™^ž˜HÚX]šHÚ[[Y]šXÚK—ˆ
ˆ
Š‘
HÙ^H\ØÜ›ÝÊŠˆ0ê	ØY™šY[Y[ÈH[˜HÛÜXH[HÚX]šHHXÚYœ˜]\˜HH[˜H\ž˜H\HšY]H\ˆš[˜[]0èH™XÝ\\›ÈH[Y\™Ù[ž˜Kˆ‚ˆKˆÂˆYˆŒ‹ˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™È[[™H\Ü[™\™HH›ÜšHÙ\š^šHÛ›[™K[˜ÚX[™È[Û\XÚHÛÝËYÛZ[šH\ˆ]™\œÚHÛÜœÚH
Y\Ù[\[ÈÛÜœÚK™[Û˜Z[š[™Ë˜ÛÛKXœË™[Û˜Z[š[™Ë˜ÛÛK\Ý™[Û˜Z[š[™Ë˜ÛÛJKˆ\ÚY\˜[›È[ˆ[šXÛÈÙ\YšXØ]ÈYÚ][H[ˆÜ˜YÈH›ÝYÙÙ\™HÛÛ[\Ü˜[™X[Y[H]H]Y\ÝHÛÝËYÛZ[šKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\ÈHÙ\YšXØ]ÈÝœ™X˜™H™[™\™H[ˆÛÛœÚY\˜^š[Û™H[Ûˆ˜Z[š[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
H‹ˆŠHÚ[Ø\™Ù\YšXØ]H‹ˆÊH\™\\HÙ\YšXØ]H‹ˆ‘
HÙ[‹\ÚYÛ™YÙ\YšXØ]H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÚ[Ø\™Ù\YšXØ]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜Ù\YšXØ]È›ÛH
Ú[Ø\™Ù\YšXØ]JJŠˆ\›Y]HH›ÝYÙÙ\™H[ˆÛZ[š[Èš[˜Ú\[HH[ˆ[Y\›È[[Z]]ÈHÝ[ÚHÛÝËYÛZ[šHÛÜœ™[]HHš[[È]™[È
\Ëˆ
‹™[Û˜Z[š[™Ë˜ÛÛX
H][^ž˜[™È[ˆ[šXÛÈÙ\YšXØ]Ëˆ0âHÛÛ^š[Û™HpîHY™šXÚY[HHÛÛ™[šY[H\ˆ]Y\ÝÈØÙ[˜\š[Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÔÔˆ
Ù\YšXØ]HÚYÛš[™È™\]Y\Ý
JŠˆ0êHšXÚY\ÝH[šX]HH[˜HÙ\YšXØ]H]]Üš]H\ˆÝ[™\™H[ˆÙ\YšXØ]Ë›Ûˆ[ˆÙ\YšXØ]È\ÜÛÈÝ\ÜÛË—ˆ
ˆ
ŠÊH\™\\HÙ\YšXØ]JŠˆÚHšY™\š\ØÙHH[ˆÙ\YšXØ]È[Y\ÜÛÈH[˜HÐH\ž˜H][™Xš[KXH›ÛˆÜXÚYšXØHH[žš[Û˜[]0èXÛšXØH›ÛH™XÙ\ÜØ\šXH\ˆÛÜš\™H[Û\XÚHÛÝËYÛZ[šK—ˆ
ˆ
Š‘
HÙ[‹\ÚYÛ™YÙ\YšXØ]JŠˆ0ê[ˆÙ\YšXØ]Èš\›X]È[	Ù[]0èÝ\ÜØHÚHÈHÙ[™\˜]ÎÈ›Ý›ØÚ\™X˜™H]š\ÚHHÚXÝ\™^ž˜H™ZHœ›ÝÜÙ\ˆYÛH][HH›Ûˆ0ê˜XØÛÛX[™]È\ˆÚ]HX˜›XÚKˆ‚ˆKˆÂˆYˆŒËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ\Ý]]Èš[˜[žšX\š[È\ÚY\˜H›ÝYÙÙ\™H[›Üš[È]X˜\ÙHÛY[H[ˆ[ÙÈ[HÚK[˜ÚH™[	Ù]™[X[]0èH[˜Hš[Û^š[Û™HZHÚ\Ý[ZHÛÛˆ\ÈH]K]Y\ÝH[[ZHš[X[™Ø[›ÈÛÛ\][Y[H[š[[YÚXš[HYÛHYÙÜ™\ÜÛÜšKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H]™[HHÜš]ÙÜ˜YšXHØ\™X˜™H[pæH\›ÜšX]È\ˆØ[˜YÝX\™\™H\™][Y[H[ÛÛ[]È[]X˜\ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[Y\ÚÈ[˜Üž\[Ûˆ‹ˆŠH›Û[YH[˜Üž\[Ûˆ‹ˆÊH]X˜\ÙH]™[[˜Üž\[Ûˆ‹ˆ‘
Hš[H[˜Üž\[Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH]X˜\ÙH]™[[˜Üž\[ÛŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š˜Üš]ÙÜ˜YšXHH]™[ÈH]X˜\ÙH
]X˜\ÙH]™[[˜Üž\[ÛŠJŠˆØ\˜[\ØÙHÚH	Ú[\›ÈÛÛ[]È[]X˜\ÙH
ÈÚ[™ÛÛHX™[KØÛÛÛ›™HÙ[œÚXš[JHÚXH›Ý]È\™][Y[H[	Ø[ÛÜš][ÈÜš]ÙÜ˜YšXÛËˆHÛÛœÙYÝY[ž˜K[˜ÚHÙH[š[H[]X˜\ÙHšY[™HÛÜX]ÈÈX˜]ËH]H™\Ý[›È[YÙÚXš[HÙ[ž˜HHÛÜœ™]HÚX]™HHXÚYœ˜]\˜K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[Y\ÚÈ[˜Üž\[ÛŠŠˆH
ŠŠH›Û[YH[˜Üž\[ÛŠŠˆ›ÝYÙÛÛ›ÈH]HÛÛÈHš\ÜÛÈÛÛ›È[\Èš\ÚXÛÈZH\ØÚHšYÚYH
\ËˆÙH[Ù\™\ˆ0êÜ[ÊKXH›Ûˆ›ÝYÙÛÛ›ÈH]H]X[Ü˜H[ˆ][HX[[[žš[Û˜]ÈXØÙYH[Ú\Ý[XHÜ\˜]]›È]šX]ÈÈY™™]ZH[ˆ]XØÛÈÝ[]X˜\ÙHÛ›[™K—ˆ
ˆ
Š‘
Hš[H[˜Üž\[ÛŠŠˆÚYœ˜HÚ[™ÛÛHš[HÝ[\ØÛË[ÚHÝ™X˜™H›Ûˆ\ÜÙ\™HY™šXÚY[HÈÝ]\˜]È[ˆ[ÙÈYÛ™[ÈHÝ\Ü\™HH]Y\žHY[H™\Ý^š[ÛšHšXÚY\ÝHH[ˆÚ\Ý[XHH]X˜\ÙKˆ‚ˆKˆÂˆYˆŒˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ™]š\ÛÜ™H\Ø[Z[˜H[ˆ\˜Ú]š[ÈH[[XYÚ[šHÚYœ˜]HÛÛˆQTÈH›ÝH[˜HÛÜØHÝ\š[ÜØNˆYHš[HÚYœ˜]HÚHÝœ™X˜™\›È\ÜÙ\™H[YÙÚXš[H[ÜÝ˜[›ËÙHš\ÝX[^ž˜]HÛÛYH[[XYÚ[™KHÛÛÜ›šHšXÛÛ›ÜØÚXš[H[ÙÛÈ^šY[™[Kˆ\›Ù›Û™[™ËØÛÜ™HÚHÈÝš[\]Ü™HH\Ø]ÈQTÈ[ˆ[Ù[]0è
Š‘PÐŠŠ‹Ù[ž˜H™]Ü™HH[š^šX[^ž˜^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ”\˜Ú0êHH[Ù[]0èPÐˆ›ÙXÙH]Y\ÝÈY™™]ËH]X[H[Ù[]0è˜H\Ø]OÈ‹ˆÜ[ÛœÎˆÂˆJHPÐˆ\ØH[˜HÚX]™H›ÜÈÛÜNˆ˜\ÝH\ÜØ\™HHQTËLLŽYQTËLMˆX[[™[™ÈPÐˆ‹ˆŠHPÐˆÚYœ˜HÙÛšH›ØØÛÈ[ˆ[ÙÈ[™\[™[Nˆ›ØØÚHY[XÚH[››ÈÚYœ˜]HY[XÚKˆÙ\™HÐÓH‹ˆÊHPÐˆ›ÛˆÚYœ˜HY™˜]ÈH]NˆÚH[Z]HHÛÙYšXØ\›K]Z[™H˜[››ÈÚYœ˜]H[˜HÙXÛÛ™H›ÛH‹ˆ‘
HPÐˆÛÛ\š[YHH]Hš[XHHÚYœ˜\›KHHÛÛ\™\ÜÚ[Û™H\ØÚXHš\ÚXš[HH›Ü›YHšXÛÜœ™[H‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHPÐˆÚYœ˜HÙÛšH›ØØÛÈ[ˆ[ÙÈ[™\[™[JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ[Ù[]0è
Š‘PÐŠŠˆ

‘[XÝ›ÛšXÈÛÙX›ÛÚÊŠHÙÛšH›ØØÛÈH\ÝÈ[ˆÚX\›ÈšY[™HÚYœ˜]È
Š™HÛÛÊŠ‹ÛÛˆHÝ\ÜØHÚX]™HHÙ[ž˜H[Ý[ˆYØ[YHÛÛˆH›ØØÚHšXÚ[šKˆHÛÛœÙYÝY[ž˜H0ê[[YYX]NˆYH›ØØÚHY[XÚH[ˆ[™Ü™\ÜÛÈ›ÙXÛÛ›È
Š˜›ØØÚHÚYœ˜]HY[XÚJŠˆ[ˆ\ØÚ]Kˆ[ˆ[‰Ú[[XYÚ[™KÝ™H˜\ÝH\™YH[››ÈÈÝ\ÜÛÈÛÛÜ™K]Y\ÝÈÚYÛšYšXØHÚH]Y[H\™YH™\Ý[›ÈšXÛÛ›ÜØÚXš[H[˜ÚHÜÈHÚYœ˜]\˜KH[ÛÛÜ››È[ÙÛÈ]˜]™\œØH[\ÝÈÚYœ˜]ÈÛÛYHÙH[H›ÜÜÙKˆ0â	Ù\Ù[\[ÈÛ\ÜÚXÛÈÛÛˆÝZHÚHÜYYØH[›Ø›[XKXHH˜[H›ÛˆšYÝX\™HÛÛÈH[[XYÚ[šNˆPÐˆ
Š›\ØÚXH˜\Ü\š\™HHÝ]\˜JŠˆH]X[[œ]YH]ËHÝH]HÝ]\˜]HÛÛYH[ˆ]X˜\ÙHš]™[H]X[H™XÛÜ™ÛÛ›ÈYÝX[Hœ˜HÜ›ËˆHÛÜœ™^š[Û™H›Ûˆ0êØØØ\™HHÚX]™HXHH
Š›[Ù[]0è
ŠŽˆ
Š‘ÐÓJŠˆ

‘Ø[Ú\ËÐÛÝ[\ˆ[ÙJŠHÚYœ˜HÛÛˆ[ˆÛÛ]Ü™HH[ˆ˜[Ü™H[š]›ØÛÈ\ˆÙÛšHY\ÜØYÙÚ[ËÛÜðëÚHÈÝ\ÜÛÈ\ÝÈ[ˆÚX\›ÈXHÙÛšH›ÛH[ˆÚYœ˜]È]™\œÛËH[ˆpîHØ[ÛÛH[ˆ
ŠYÈH]][XØ^š[Û™JŠˆÚHš]™[H]X[[œ]YHX[›ÛZ\ÜÚ[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚX]™HpîH[™ØNŠŠˆ›ÛˆØ[XšXH[Kˆ[Y™]È0ê™[
Š›[ÙÈ[ˆÝZHH›ØØÚH™[™ÛÛ›ÈÛÛ˜Ø][˜]JŠ‹›Ûˆ™[H›Ø\Ý^ž˜H[HÚX]™NˆQTËLMˆ[ˆPÐˆ[ÜÝ˜H[ÙÛÈ\Ø][Y[HÛÛYHQTËLLŽ[ˆPÐ‹—ˆ
ˆ
ŠÊHPÐˆ›ÛˆÚYœ˜H]™\›ÎŠŠˆ˜[ÛËˆPÐˆÚYœ˜HXØÛÛYKÛÛˆQTÈH]HÛHY™™]NÈÚpìˆÚH\™H0êH
Šš[™\Ý[™ÝZXš[]0è
Š‹Ú[ðêHØ\˜[žšXHÚH[ÚYœ˜]È›Ûˆš]™[H[HÝ[HÝ]\˜H[ÚX\›ËˆÚYœ˜\™HYH›ÛH[ˆPÐˆš\]\™X˜™H[›Ø›[XK—ˆ
ˆ
Š‘
HÛÛ\™\ÜÚ[Û™NŠŠˆPÐˆ›ÛˆÛÛ\š[YH[KˆHÛÛ\™\ÜÚ[Û™H0ê[‰ÛÜ\˜^š[Û™H\Ý[KHÙHXZH˜H\XØ]H
Šœš[XJŠˆ[HÚYœ˜]\˜KXZHÛÛYH\HH\ÜØK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚH
Š›	Ø[ÛÜš][È›Ûˆ˜\ÝJŠŽˆÛÛH[˜ÚHH[Ù[]0èÛÛˆÝZHÈÚH\ØKˆ
Š‘PÐŠŠˆHH]š]\™HÙ[\™K›Ûˆ˜\ØÛÛ™HÛHØÚ[ZHšXÛÜœ™[H0­È
ŠÐÊŠˆHÛÛ˜Ø][˜HH›ØØÚHHšXÚYYH[ˆ™]Ü™HH[š^šX[^ž˜^š[Û™H[\™]™YXš[KXH›Ûˆ]][XØH0­È
ŠÕŠŠˆH˜\Ù›Ü›XH[ÚYœ˜\š[ÈH›ØØÚH[ˆ[ˆÚYœ˜\š[ÈH›\ÜÛÈ0­È
Š‘ÐÓJŠˆHHØÙ[H[Ù\›˜K\˜Ú0êH[š\ØÙHÚYœ˜]\˜HH]][XØ^š[Û™H[ˆ[ˆÛÛÈÛÛËˆ]Y\ÝHÛÛXš[˜^š[Û™HH[ˆ›ÛYHÚH˜[HH[˜HY[[Üš^ž˜\™K
ŠQPQ
Šˆ

]][XØ]Y[˜Üž\[ÛˆÚ]\ÜÛØÚX]Y]JŠNˆ›ÝYÙÙH[œÚY[YHš\Ù\˜]^ž˜HH[YÜš]0èY0êÚpìˆÚHÈKŒÈ[\Û™Kˆ‚ˆKˆÂˆYˆŒKˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ‘Ù\˜[	ÒUX[˜YÙ\‹ÝH[\[Y[[™È[ˆÚ\Ý[XH[ˆÝZHH\[™[H]›Û›ÈÜÜÙY\™H[ˆ\ÜÜÚ]]›ËÙÙ]Û™H
ÚÙ[ŠH\ˆÝ[™\™H	ØXØÙ\ÜÛÈY[Ý[™H\™YHÜXÚYšXÚH[	Ú[\››È[	ÙYYšXÚ[È^šY[™[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H[HÙYÝY[HÜš[ÛšHÜYYØHYYÛ[È[\ÈHÚXÝ\™^ž˜Hš\ÚXØHÚHÝ[››È[\[Y[[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH™XÚ[žš[ÛšH
™[˜Ú[™ÊH‹ˆŠHšY[ÜÛÜ™YÛX[ž˜H
šY[ÈÝ\™Z[[˜ÙJH‹ˆÊH˜\˜ÚHHÛÛ›ÛÈYÛHXØÙ\ÜÚH
XØÙ\ÜÈÛÛ›Û™\ÝX[\ÊH‹ˆ‘
H˜YÙHHXØÙ\ÜÛÈ
XØÙ\ÜÈ˜YÙ\ÊH‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
H˜YÙHHXØÙ\ÜÛÈ
XØÙ\ÜÈ˜YÙ\ÊJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š˜˜YÙHHXØÙ\ÜÛÈ
XØÙ\ÜÈ˜YÙJJŠˆ0ê[˜H\ÜÙ\˜HÈ\ÜÜÚ]]›Èš\ÚXÛÈ
ÚÙ[ŠH][^ž˜]ÈZH\[™[H\ˆ]][XØ\œÚHHØ›ØØØ\™HH˜\˜ÚH[]›ÛšXÚH\ˆXØÙY\™HHÜXÚYšXÚH\™YH[	ÙYYšXÚ[È^šY[™[Kš\ÜXØÚX[™È\Ø][Y[HÈØÙ[˜\š[È\ØÜš]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHH™XÚ[žš[ÛšH
™[˜Ú[™ÊJŠˆÛÛ›È˜\œšY\™H\š[Y]˜[H\Ý\›™H›ÛHH[\Y\™HÈš]\™\™H	Ú[\Ú[Û™Hš\ÚXØH™[H›ÜšY]0è›Ûˆ][^ž˜[›ÈÚÙ[ˆÈ\ÜÙ\™H\œÛÛ˜[K—ˆ
ˆ
ŠŠHHšY[ÜÛÜ™YÛX[ž˜H
šY[ÈÝ\™Z[[˜ÙJJŠˆ[\YYØH[XØ[Y\™H\ˆ[Ûš]Ü˜\™HH™YÚ\Ý˜\™Hš\Ú]˜[Y[HH]]š]0è›ÛˆÛÜÝ]Z\ØÙHH\ˆðêH[ˆYXØØ[š\Û[È˜\Ø]ÈÝHÙ]ÛšH\ˆÛÛ˜ÙY\™H	ØXØÙ\ÜÛË—ˆ
ˆ
ŠÊHH˜\˜ÚHHÛÛ›ÛÈYÛHXØÙ\ÜÚH
XØÙ\ÜÈÛÛ›Û™\ÝX[\ÈÈX[˜\
JŠˆÛÛ›ÈÝ]\™HHÜXHÜH›ÙÙ]]H\ˆÛÛ›Û\™H[›\ÜÛÈš\ÚXÛÈ[H\œÛÛ™HH™]™[š\™H[Z[Ø][™ËXH˜\™\Ù[[›ÈH˜\œšY\˜Hš\ÚXØHH˜[œÚ]ÈH›Ûˆ[Ù]Û™HÈÚÙ[ˆHØ›ØØÛÈ[ˆðêKˆ‚ˆKˆÂˆYˆŒ‹ˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ’™[›˜K[‰Ø[˜[\ÝH[HÚXÝ\™^ž˜K\ÚY\˜H[\[Y[\™H[˜H™]š\Ú[Û™H\š[ÙXØHH™YÛÛ\™HZHš[HHÙÈ\ˆZYÛ[Ü˜\™HHÜÝ\˜HHÚXÝ\™^ž˜HÛÛ\\ÜÚ]˜H[	ÛÜ™Ø[š^ž˜^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆH]X[HZHÙYÝY[H\HHÛÛ›ÛHHÚXÝ\™^ž˜H\\Y[™H[[Ûš]Ü˜YÙÚ[ÈZHÙÈ
ÙÈ[Ûš]Üš[™ÊOÈ‹ˆÜ[ÛœÎˆÂˆJHÙ\Ý[Û˜[H
X[˜YÙ\šX[
H‹ˆŠHš\ÚXÛÈ
\ÚXØ[
H‹ˆÊHÜ\˜]]›È
Ü\˜][Û˜[
H‹ˆ‘
HXÛšXÛÈ
XÚšXØ[
H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÜ\˜]]›È
Ü\˜][Û˜[
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š˜ÛÛ›ÛHHÚXÝ\™^ž˜HÜ\˜]]šH
Ü\˜][Û˜[ÛÛ›ÛÊJŠˆÛÛ›ÈZ\Ý\™H[\[Y[]HHÛÛ™ÝH][ÝYX[˜[Y[H[\œÛÛ˜[H\ˆ›ÝYÙÙ\™HHÚ\Ý[ZHHHÜ\˜^š[ÛšH[	ÛÜ™Ø[š^ž˜^š[Û™Kˆ\Ù[\HÛ\ÜÚXÚH[˜ÛYÛ›È[[Ûš]Ü˜YÙÚ[ÈZHš[HH™YÚ\Ý›È
ÙÈ[Ûš]Üš[™ÊKH›ØÙY\™HH˜XÚÝ\Hš\š\Ý[›ËHÙ\Ý[Û™H[HÛÛ™šYÝ\˜^š[ÛšHHH›Ý^š[Û™HZHÝ\ÜHHY[[Üš^ž˜^š[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHHÛÛ›ÛHÙ\Ý[Û˜[H
X[˜YÙ\šX[ÛÛ›ÛÊJŠˆšYÝX\™[›ÈHX[šYšXØ^š[Û™HÝ˜]YÚXØKH˜[]^š[ÛšH[š\ØÚ[È
š\ÚÈ\ÜÙ\ÜÛY[
KHÛXÞHØÜš]KH›ÙÜ˜[[ZHHÛÛœØ\]›Û^ž˜H[HÚXÝ\™^ž˜HHHÙ\Ý[Û™HÛÛ\\ÜÚ]˜HZH›ÙÜ˜[[ZHHÚXÝ\™^ž˜K—ˆ
ˆ
ŠŠHHÛÛ›ÛHš\ÚXÚH
\ÚXØ[ÛÛ›ÛÊJŠˆ›ÝYÙÛÛ›È	ØXØÙ\ÜÛÈ[Hš\ÛÜœÙH\™Ø\™HH[H[™œ˜\Ý]\™H[™ÚXš[H
\Ëˆ[XØ[Y\™KXØÚ]K™XÚ[žš[ÛšKÝX\™YJK—ˆ
ˆ
Š‘
HHÛÛ›ÛHXÛšXÚH
XÚšXØ[ÛÛ›ÛÊJŠˆÛÛ›ÈÛÛ›ÛHÙÚXÚH\ÙYÝZ]H\™][Y[H[	Ú\™Ø\™HÈ[ÛÙØ\™HZHÚ\Ý[ZH[™›Ü›X]]šH
\Ëˆš\™]Ø[Üš]ÙÜ˜YšXKPÓÚ\Ý[ZHQËÒTÊKˆ‚ˆKˆÂˆYˆŒËˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’[œÝ[˜Ù\È“K[‰Ø^šY[™HHÛÝYÛÛ\][™ËÝHYš[™[™ÈYÛHÝ[™\™^šY[™[HÛÛ\]H\ˆHÙ\Ý[Û™H[HÚX]šHÜš]ÙÜ˜YšXÚKÝXš[[™ÈÛXÞH™XÚ\ÙHÚH™H™YÛÛ[›È	Ú[\›ÈÚXÛÈHš]K[HÙ[™\˜^š[Û™Hš[›È[H™]›ØØHH\Ý^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆÚHÛÜØHÝ[››È›ÙÙ][™ÈHÝš[\[™È[ˆ]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ\ÝY]›Ü›H[Ù[H
JH‹ˆŠH[ˆÚ\Ý[XHHÙ\Ý[Û™H[HÚX]šH
Ù^HX[˜YÙ[Y[Þ\Ý[JH‹ˆÊH[˜HÙXÝ\™H[˜Û]™H‹ˆ‘
H[ˆ[Ù[ÈHÚXÝ\™^ž˜H\™Ø\™H
\™Ø\™HÙXÝ\š]H[Ù[HHÓJH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH[ˆÚ\Ý[XHHÙ\Ý[Û™H[HÚX]šH
Ù^HX[˜YÙ[Y[Þ\Ý[JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ
Š’Ù^HX[˜YÙ[Y[Þ\Ý[H
ÓTÊJŠˆ0ê[ˆ›ØÙ\ÜÛÈÝ]\˜]ËÝ\Ü]ÈHÝ[™\™HÛXÞHÜ™Ø[š^ž˜]]™KÚHÚHØØÝ\H[HÙ\Ý[Û™H[	Ú[\›ÈÚXÛÈHš]H[HÚX]šHÜš]ÙÜ˜YšXÚH
Ù[™\˜^š[Û™K\ÝšX^š[Û™KY[[Üš^ž˜^š[Û™K›Ý^š[Û™K™]›ØØHH\Ý^š[Û™JKˆÚH˜]HH[ˆœ˜[Y]ÛÜšÈXÚ\Ú[Û˜[HHÜ\˜]]›Ë›ÛˆH[ˆÚ[™ÛÛÈÚ\È\ÜÜÚ]]›È\™Ø\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[ˆ\ÝY]›Ü›H[Ù[H
JJŠˆ0ê[ˆZXÜ›ØÚ\YXØ]È[YÜ˜]ÈÝ[HØÚYHXY™H
ÛÛ][™H™ZHÚ\Ý[ZHÚ[™ÝÜÊH\ˆ\˜Ú]šX\™H[ˆÚXÝ\™^ž˜HÚX]šHÜš]ÙÜ˜YšXÚHHZ\Ý\˜^š[ÛšH[	Ú[YÜš]0è[›ÛÝ›Ûˆ0ê[˜HÛ]XØHÈÝ[™\™^šY[™[HÛØ˜[K—ˆ
ˆ
ŠÊH[˜HÙXÝ\™H[˜Û]™JŠˆ0ê[ˆÛÜ›ØÙ\ÜÛÜ™H\ÛÛ]Ë[YÜ˜]È™[Ú[XÚ[ÈH[Ý[šHÛÐÈ
ÛÛYH\HÈ]\›Z[˜]HÚ\Ý[ZH[™›ÚY
KYXØ]È\ØÛ\Ú]˜[Y[HH[X›Ü˜^š[ÛšHÙ[œÚXš[HÛÛYHÚX]šHÜš]ÙÜ˜YšXÚHH]Hš[ÛY]šXÚK—ˆ
ˆ
Š‘
H[ˆ[Ù[ÈHÚXÝ\™^ž˜H\™Ø\™H
ÓJJŠˆ0ê[ˆ\ÜÜÚ]]›Èš\ÚXÛÈ\Ý\››ÈÈ[˜HØÚYHH\Ü[œÚ[Û™HÜXÚX[^ž˜]H™[Ø[ÛÛÈÜš]ÙÜ˜YšXÛÈY[H™\Ý^š[ÛšHH™[H›Ý^š[Û™H[HÚX]šHÝH˜\ÝHØØ[KXH›ÛˆÛÜÝ]Z\ØÙH	Ú[œÚY[YHHÛXÞHÜ™Ø[š^ž˜]]™HÝ[ÚXÛÈHš]H[HÚX]šKˆ‚ˆKˆÂˆYˆŒˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈÛÛ›Û[Ù[È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HÛÜœ™]HÛÛ™šYÝ\˜^š[Û™HZHÛÛ›ÛHHÚXÝ\™^ž˜H™]™YH™YÛÛHÚX\™H\ˆÛÛœÙ[\™H	ØXØÙ\ÜÛÈÙÚXÛÈÛÛÈZHÛÙÙÙ]HÛÛœÚY\˜]HÚXÝ\šHÈ]]Üš^ž˜]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H˜HHÙYÝY[H\›Z[šHÚHšY™\š\ØÙHH[ˆ[[˜ÛÈÚHÛÛ˜ÙYH\ÜXÚ][Y[H	ØXØÙ\ÜÛÈÈH\›Y\ÜÚHH[]0èÜXÚYšXÚKY[™H]HH[™H™[™ÛÛ›È[\XÚ][Y[H™YØ]OÈ‹ˆÜ[ÛœÎˆÂˆJH[[˜ÛÈZHÛÛœÙ[]H
[ÝÈ\Ý
H‹ˆŠH›ØÙ\ÜÛÈH\›Ý˜^š[Û™H
\›Ý˜[›ØÙ\ÜÊH‹ˆÊHX[›ÈHš\š\Ý[›È
˜XÚÛÝ][ŠH‹ˆ‘
H]]š]0è[Z]]H
™\ÝšXÝYXÝ]š]Y\ÊH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH[[˜ÛÈZHÛÛœÙ[]H
[ÝÈ\Ý
JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[˜H
Š˜[ÝÈ\Ý
Šˆ
ÈÚ][\Ý
H0ê[ˆ[[˜ÛÈ\ÜXÚ]ÈH[]0è
\Ëˆ[™\š^žšHT\XØ^š[ÛšHÈÛZ[šJHHÝZHšY[™HÛÛ˜Ù\ÜÛÈ	ØXØÙ\ÜÛËˆHY˜][]HHÛÙÙÙ]H›Ûˆ\Ü™\ÜØ[Y[H™\Ù[H™[	Ù[[˜ÛÈ™[™ÛÛ›ÈšYš]]]H˜[Z]H[˜H™YÛÛH[\XÚ]HH™YØ^š[Û™H
[\XÚ][žJK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH[ˆ›ØÙ\ÜÛÈH\›Ý˜^š[Û™H
\›Ý˜[›ØÙ\ÜÊJŠˆ0ê[˜H›ØÙY\˜H›Ü›X[HÜ™Ø[š^ž˜]]˜H\ˆ™\šYšXØ\™HH]]Üš^ž˜\™H[ÙYšXÚHš[XH[HÜ›È[\[Y[^š[Û™K›Ûˆ0ê[ˆ[[˜ÛÈHÛÛ›ÛÈYÛHXØÙ\ÜÚK—ˆ
ˆ
ŠÊH[ˆX[›ÈHš\š\Ý[›È
˜XÚÛÝ][ŠJŠˆ\ØÜš]™HH\ÜØYÙÚH\ˆ[›[\™H[˜H[ÙYšXØH˜[]H[ˆ›Ù^š[Û™HHš]Ü›˜\™H[ÈÝ]È™XÙY[HÝXš[K—ˆ
ˆ
Š‘
HH]]š]0è[Z]]H
™\ÝšXÝYXÝ]š]Y\ÊJŠˆÛÛ›È^š[ÛšHÜXÚYšXÚHÚH›ÛˆÜÜÛÛ›È\ÜÙ\™H\ÙYÝZ]H\ˆ[Ý]šHHÚXÝ\™^ž˜HÈ™YÛÛ[Y[^š[Û™H^šY[™[K›Ûˆ\ØÜš]›Û›È[˜HÙÚXØHHXØÙ\ÜÛÈ	Ú[\XÚ][žIËˆ‚ˆKˆÂˆYˆŒKˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ’[ˆ[‰Ø^šY[™HÈÝ\ÜÛÈ[\YYØ]È[	ÝY™šXÚ[ÈXÜ]Z\ÝHpìˆÜ™X\™H[ˆ[Ý›È›Ü›š]Ü™H™[	Ø[˜YÜ˜YšXØK[Y]\™H[ˆÜ™[™HHÝ[È˜]›Ü™HH\›Ý˜\™H[YØ[Y[È[H˜]\˜Kˆ[ˆ]Y]ÙYÛ˜[HHÚ]X^š[Û™HÛÛYHš\ØÚ[ÈÜ˜]™HHœ›ÙH[\›˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[Hš[˜Ú\[ÈHÚXÝ\™^ž˜H0êš[Û]ÈH]X[HÛÛ›ÛZ\Ý\˜HÈš\š\Ý[˜OÈ‹ˆÜ[ÛœÎˆÂˆJHZ[š[[Èš]š[YÚ[Îˆ[	Ú[\YYØ]È˜[››È™]›ØØ]H]HH\›Y\ÜÚH˜[›™HHÛÛœÝ[^š[Û™H[ˆÛÛH]\˜H‹ˆŠHÙ\\˜^š[Û™HZHÛÛ\]H
Ù\\˜][ÛˆÙˆ]Y\ÊNˆÜ™X^š[Û™KÜ™[™HH\›Ý˜^š[Û™H[YØ[Y[È˜[››È\ÜÙYÛ˜]HH\œÛÛ™H]™\œÙH‹ˆÊH™YYÈÛ›ÝÎˆ[	Ú[\YYØ]È˜H[\Y]ÈHÛÛœÝ[\™H	Ø[˜YÜ˜YšXØHZH›Ü›š]ÜšHÛÛ˜ÛÜœ™[H‹ˆ‘
H›Ý^š[Û™H[HX[œÚ[ÛšNˆ	Ú[\YYØ]È˜HÜÜÝ]È[ˆ[ˆ[›È™\\ÈÙÛšHÙXÚHY\ÚH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÙ\\˜^š[Û™HZHÛÛ\]JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠœÙ\\˜][ÛˆÙˆ]Y\ÊŠˆ[\Û™HÚH™\ÜÝ[˜HÚ[™ÛÛH\œÛÛ˜HÜÜØHÛÛ›Û\™HHÛÛH	Ú[\›ÈÚXÛÈH[‰ÛÜ\˜^š[Û™HÙ[œÚXš[Kˆ]ZH[ˆÛÛÈ[\YYØ]ÈÜ™XH[›Ü›š]Ü™KÜ™[˜HHYØNˆpìˆ]Z[™H[™[\™H[ˆ›Ü›š]Ü™Hš]^š[ÈH\]ZY\œÚH[˜\›ÈÙ[ž˜HÚH™\ÜÝ[›ÈX˜˜H\›Ý˜\™KˆÜ^ž˜[™È[ÚXÛÈœ˜H\œÛÛ™H]™\œÙKHœ›ÙHšXÚYY\™X˜™H[˜HÛÛ\Ú[Û™KÚH0ê[ÛÈpîHY™šXÚ[HH[ÛÈpîHš[]˜Xš[K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[Z[š[[Èš]š[YÚ[ÊŠˆšYÝX\™H	Ê˜[\Y^ž˜JˆZH\›Y\ÜÚHH[˜H\œÛÛ˜K›ÛˆH
˜ÛÛXš[˜^š[Û™H\šXÛÛÜØJˆHpîH\›Y\ÜÚH]HYÚ][ZKˆ]ZHÚX\ØÝ[˜H[H™H[žš[ÛšH0ê\[™[H[[ÛÈ[	Ú[\YYØ]Îˆ[›Ø›[XH˜\ØÙH[˜]ÈÚHHH]HH™Kˆ™]›ØØ\™ÛH]X\ÚH]ÈÛH[\Y\™X˜™H[˜ÚHH]›Ü˜\™K—ˆ
ˆ
ŠÊH[™YYÈÛ›ÝÊŠˆ[Z]H	ØXØÙ\ÜÛÈ[H
š[™›Ü›X^š[ÛšJˆH]Y[H™XÙ\ÜØ\šYH\ˆ[ÛÛ\]ËˆÈØÙ[˜\š[È›Ûˆ\ØÜš]™H[ˆ›Ø›[XHHš\ÚXš[]0èZH]KXHH]]Üš]0èÝ[H˜[œØ^š[ÛšK—ˆ
ˆ
Š‘
HH›Ý^š[Û™H[HX[œÚ[ÛšJŠˆ0ê[ˆÛÛ›ÛÈ][HHÛÛ\[Y[\™K\˜Ú0êH™[™HpîHY™šXÚ[HX[[™\™H[˜Hœ›ÙH™[[\ÈH™H˜XÚ[]HHØÛÜ\H[Ø[Xš[ËˆXH›Ûˆ[\Y\ØÙHHœ›ÙH
›ÙÙÚJŽˆ\ˆÙXÚHY\ÚH	Ú[\YYØ]ÈÛÛœÙ\™\™X˜™H	Ú[\›ÈÚXÛÈ™[H›ÜšYHX[šK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ\Ý[™ÝZHHYHš[˜Ú\HÚH™[™ÛÛ›ÈÙ[\™HÛÛ™\ÚKˆ
Š“Z[š[[Èš]š[YÚ[ÊŠˆH
œ]X[Êˆpìˆ˜\™H[˜H\œÛÛ˜H0­È
Š”Ù\\˜^š[Û™HZHÛÛ\]JŠˆH
œ]X[HÛÛXš[˜^š[ÛšJˆHÝ\šH›Ûˆ]›Û›ÈXZHÝ\™H[œÚY[YKˆÛÛ›ÛHY™š[šHÚH	Ù\Ø[YH\ÜÛØÚXHH]Y\ÝÈ[XNˆ
Š™X[ÛÛ›Û
Šˆ
YH\œÛÛ™H\ˆ\ÙYÝZ\™H[˜HÚ[™ÛÛH^š[Û™HÜš]XØJK
Š™™\šYHØ˜›YØ]ÜšYJŠˆH
Šš›Øˆ›Ý][ÛŠŠ‹[œØ]H›Üš[È\ˆ˜\ˆ[Y\™Ù\™Hœ›ÙHÚHšXÚYYÛ›È™\Ù[ž˜HÛÛ[XKˆ‚ˆKˆÂˆYˆŒLˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HÜš]ÙÜ˜YšXH\Ú[[Y]šXØHÚH˜\ØHÝ[HÙ\\˜^š[Û™HÙÚXØHHX][X]XØH[HÚX]šH\Ý[˜]H[HÚYœ˜]\˜HH[HXÚYœ˜]\˜H[HÛÛ][šXØ^š[ÛšKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0ê[›ÛYHH[˜HÚX]™HÜš]ÙÜ˜YšXØHÚHpìˆ\ÜÙ\™H\ÝšXZ]HX™\˜[Y[HH][^ž˜]HHÚ][œ]YH\ˆÚYœ˜\™HY\ÜØYÙÚH\Ý[˜]H[›ÜšY]\š[È[HÚX]™HÝ\ÜØOÈ‹ˆÜ[ÛœÎˆÂˆJHÚX]™HH\Ú
\ÚÙ^JH‹ˆŠHš\›XHYÚ][H
YÚ][ÚYÛ˜]\™JH‹ˆÊHÚX]™HX˜›XØH
X›XÈÙ^JH‹ˆ‘
HÚX]™HÚ[[Y]šXØH
Þ[[Y]šXÈÙ^JH‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÚX]™HX˜›XØH
X›XÈÙ^JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ™[HÜš]ÙÜ˜YšXH\Ú[[Y]šXØKH
Š˜ÚX]™HX˜›XØH
X›XÈÙ^JJŠˆpìˆ\ÜÙ\™H][Ø]HHÚ][œ]YH[ˆ[ÙÈ\\ËˆšY[™H][^ž˜]HZHZ][H\Ý\›šH\ˆÚYœ˜\™HY\ÜØYÙÚHÚHÛÛÈHÛÜœš\ÜÛ™[HÚX]™Hš]˜]H
ÙYÜ™]HHÙ[ÜØ[Y[HÝ\ÝÙ]H[\Ý[˜]\š[ÊHØ\°è[ˆÜ˜YÈHXÚYœ˜\™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[˜HÚX]™HH\Ú
\ÚÙ^JJŠˆÈ[ˆ˜[Ü™H\ÚšY[™HÙ[™\˜]ÈH[˜H[žš[Û™H[šY\™^š[Û˜[H\ˆ™\šYšXØ\™H	Ú[YÜš]0èZH]HÈX\\™HÝš[™ÚK›Ûˆ\ˆÚYœ˜\™HHXÚYœ˜\™HY\ÜØYÙÚHšY\™^š[Û˜[K—ˆ
ˆ
ŠŠHHš\›XHYÚ][H
YÚ][ÚYÛ˜]\™JJŠˆ0ê[›ÈØÚ[XHX][X]XÛÈÚH]\ÝH	Ø]][XÚ]0èH	Ú[YÜš]0èH[ˆØÝ[Y[È
š\›X]ÈÛÛˆÚX]™Hš]˜]HH™\šYšXØ]ÈÛÛˆÚX]™HX˜›XØJK›Ûˆ0ê[˜HÚX]™HHÚYœ˜]\˜K—ˆ
ˆ
Š‘
H[˜HÚX]™HÚ[[Y]šXØH
Þ[[Y]šXÈÙ^JJŠˆ]™Hš[X[™\™H\ÜÛÛ][Y[HÙYÜ™]HHÛÛ™]š\ØH\ØÛ\Ú]˜[Y[H˜HHYH\HÛÛ][šXØ[NÈÙH™[š\ÜÙH\ÝšXZ]HX™\˜[Y[KÚ][œ]YHÝ™X˜™HXÚYœ˜\™HH[\˜\™HHÛÛ][šXØ^š[ÛšKˆ‚ˆKˆÂˆYˆŒLKˆÜXÎˆ”ÙXÝ\š]Hš[˜Ú\\È‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“HšXYHÒPH
š\Ù\˜]^ž˜K[YÜš]0è\ÜÛšXš[]0è
H˜\™\Ù[H[[\Ý›È›Û™[Y[[H[HÚXÝ\™^ž˜H[H[™›Ü›X^š[ÛšKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H\›Z[™HÚHšY™\š\ØÙH[HØ\˜[žšXHÚHH]HHHš\ÛÜœÙHÚX[›ÈXØÙ\ÜÚXš[HH][^ž˜Xš[H]X[™È™XÙ\ÜØ\š[ÈH\HYÛH][H]]Üš^ž˜]OÈ‹ˆÜ[ÛœÎˆÂˆJH\ÜÛšXš[]0è
]˜Z[Xš[]JH‹ˆŠHš\Ù\˜]^ž˜H
ÛÛ™šY[X[]JH‹ˆÊH]]Üš^ž˜^š[Û™H
]]Üš^˜][ÛŠH‹ˆ‘
H[YÜš]0è
[YÜš]JH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJH\ÜÛšXš[]0è
]˜Z[Xš[]JJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
Š™\ÜÛšXš[]0è
]˜Z[Xš[]JJŠˆØ\˜[\ØÙHÚHHÚ\Ý[ZH[™›Ü›X]]šKHØ[˜[HHÛÛ][šXØ^š[Û™HHH]HÚX[›È›ÛH[	Ý\ÛÈHXØÙ\ÜÚXš[HYÛH][H]]Üš^ž˜]HÙÛš\]X[›ÛH™HX˜šX[›Èš\ÛÙÛ›È\ˆÝ›ÛÙ\™HH›ÜšYH]]š]0è—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHHš\Ù\˜]^ž˜H
ÛÛ™šY[X[]JJŠˆ\ÜÚXÝ\˜HÚHH[™›Ü›X^š[ÛšHÙ[œÚXš[H›Ûˆ™[™Ø[›Èš]™[]HÈ][Ø]HH[™]šYZK[]0èÈ›ØÙ\ÜÚH›Ûˆ]]Üš^ž˜]K—ˆ
ˆ
ŠÊH	Ø]]Üš^ž˜^š[Û™H
]]Üš^˜][ÛŠJŠˆÝXš[\ØÙHH\š]HHH]™[HHXØÙ\ÜÛÈÜXÚYšXÚHÛÛ˜Ù\ÜÚHH[ˆ][HÈÚ\Ý[XHÜÈÚHHÝXHY[]0è0êÝ]H]][XØ]K—ˆ
ˆ
Š‘
H	Ú[YÜš]0è
[YÜš]JJŠˆØ\˜[\ØÙHÚHH[™›Ü›X^š[ÛšHš[X[™Ø[›ÈXØÝ\˜]KY™šYXš[HH›Ûˆ[\˜]HÈÛÜœ›ÝKÙH›Ûˆ˜[Z]H[\™[H\Ü™\ÜØ[Y[H]]Üš^ž˜]Kˆ‚ˆKˆÂˆYˆŒL‹ˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•ZÙHHØZÙK[˜Hš[›ÛX]H\ÝXØÙ\šXKH™XÙ[[Y[HXÜ]Z\Ý]È[ˆ[Ý›È[Ù[ÈÛÙØ\™H\ˆZYÛ[Ü˜\™HHÚXÝ\™^ž˜H[H›ÜšYHÜ™Y[žšX[Kˆ[ÛÙØ\™HYÙÚ][™ÙH[ˆ[ÙÈØ\ÝX[H]HYÙÚ][]šHH[š]›ØÚH[	Ú[œ]H[˜H[žš[Û™HH\Úš[XHÚH]Y\Ý	Ý[[XHÈ[X›ÜšKˆ‹ˆ]Y\Ý[ÛŽˆÚHÛÜØHÝH˜XÙ[™ÈÜXÚYšXØ[Y[H[ÛÙØ\™OÈ‹ˆÜ[ÛœÎˆÂˆJHÙ^HÝ™]Ú[™È‹ˆŠHØ[[™È‹ˆÊH\Ú[™È‹ˆ‘
Hš\›YHYÚ][H
YÚ][ÚYÛ˜]\™\ÊH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHØ[[™ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠœØ[[™ÊŠˆ0ê[˜HXÛšXØHÜš]ÙÜ˜YšXØHÚHÛÛœÚ\ÝH™[	ØYÙÚ][™Ù\™H]HØ\ÝX[HH[šXÚH
ÚX[X]H	ÜØ[IÊH[	Ú[œ]
[ˆÙ[™\™H[˜H\ÜÝÛÜ™
Hš[XHHÛÝÜÜ›ÈH[˜H[žš[Û™HH\Úˆ]Y\ÝÈ[\Y\ØÙHYÛH]XØØ[HH][^ž˜\™H]XØÚH™XØ[ÛÛ]HÛÛYHH˜Z[˜›ÝÈX›\È\ˆXÚYœ˜\™H[ˆX\ÜØHH\ÜÝÛÜ™—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH[Ù^HÝ™]Ú[™ÊŠˆ0ê[ˆY]ÙÈÚHÛÛœÚ\ÝH™[Ø[ÛÛ\™Hš\]][Y[H
ZYÛXZXHH›ÛJH	Ú\ÚH[˜H\ÜÝÛÜ™\ˆ™[™\›È›Û][Y[HpîH[ÈHÛÛ\]\™K][Y[[™È›Ý]›ÛY[H[[\ÈšXÚY\ÝÈ\ˆ]XØÚHH›Üž˜Hœ]H
\ËˆÛÛˆ’ÑŒˆÈ˜Üž\
K—ˆ
ˆ
ŠÊH	Ò\Ú[™ÊŠˆ0ê[Ù[\XÙH›ØÙ\ÜÛÈHÛÛ™\œÚ[Û™H[šY\™^š[Û˜[HH[ˆ[œ]H[™Ú^ž˜H\˜š]˜\šXH[ˆ[˜HÝš[™ØHH[™Ú^ž˜Hš\ÜØH˜[Z]H[˜H[žš[Û™HX][X]XØKÙ[ž˜H	ØYÙÚ][HØ˜›YØ]ÜšXHH]HØ\ÝX[H™]™[]šK—ˆ
ˆ
Š‘
HHš\›YHYÚ][H
YÚ][ÚYÛ˜]\™\ÊJŠˆÛÛ›ÈÛÜÝ]HX][X]XÚH\Ø]H\ˆØ\˜[\™H	Ø]][XÚ]0èH[›Ûˆš\Y[ÈH[ˆš[HÈY\ÜØYÙÚ[Ë›Ûˆ	ØYÙÚ][HH]HØ\ÝX[H[	Ú[œ]H[˜H[žš[Û™HH\Ú[H\ÜÝÛÜ™ˆ‚ˆKˆÂˆYˆŒLËˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ\[™[HÚYYH	ØXØÙ\ÜÛÈH[‰Ø\XØ^š[Û™Hš[˜[žšX\šXKˆ[Ú\Ý[XH™\›È\Ý˜XØÛÙÛYHY[]0èÝ]ÈHYÙÚ[Ü›˜[Y[È[Ü][KÜÚ^š[Û™HH[YÙÚ[ÈHš\ØÚ[ËHÛÛ™œ›ÛHÛÛˆHÛXÞH^šY[™[HHÛÛ˜ÛYHÚH	ØXØÙ\ÜÛÈ˜HÛÛ˜Ù\ÜÛÈXHÛÛÈ[ˆÛÛH]\˜Kˆ[ˆÙXÛÛ™ÈÛÛ\Û™[H˜\Ù›Ü›XH]Y[HXÚ\Ú[Û™H[ˆ[˜HÛÛ™šYÝ\˜^š[Û™HÜ\˜]]˜HHÜ™[˜HH\š\™HHÙ\ÜÚ[Û™HÛÛˆ]YZH[Z]Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HÛÛ\Û™[H[ÛÛ›Û[™H[››ÈÝ›ÛÈš\Ü]]˜[Y[HH˜[]^š[Û™HH	Ù[Z\ÜÚ[Û™H[HXÚ\Ú[Û™OÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞHYZ[š\Ý˜]Üˆ\ˆH˜[]^š[Û™K™X]ØÛÜH™YXÙ\ˆ\ˆ	Ù[Z\ÜÚ[Û™H[HXÚ\Ú[Û™H‹ˆŠHÛXÞH[™›Ü˜Ù[Y[Ú[\ˆH˜[]^š[Û™KÛXÞH[™Ú[™H\ˆ	Ù[Z\ÜÚ[Û™H[HXÚ\Ú[Û™H‹ˆÊHY[]H›ÝšY\ˆ\ˆH˜[]^š[Û™KÛXÞH[™›Ü˜Ù[Y[Ú[\ˆ	Ù[Z\ÜÚ[Û™H[HXÚ\Ú[Û™H‹ˆ‘
HÛXÞH[™Ú[™H\ˆH˜[]^š[Û™KÛXÞHYZ[š\Ý˜]Üˆ\ˆ	Ù[Z\ÜÚ[Û™H[HXÚ\Ú[Û™H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛXÞH[™Ú[™H\ˆH˜[]^š[Û™KÛXÞHYZ[š\Ý˜]Üˆ\ˆ	Ù[Z\ÜÚ[Û™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[[Ù[È’TÕÔLŒÈÙ\\˜H™H[ÛH\Ý[K—ˆ
ˆ[
Š”ÛXÞH[™Ú[™H
JJŠˆ0ê[ÛÛ\Û™[HÚH
Š™XÚYJŠŽˆ[˜Ü›ØÚXHÙYÛ˜[HHY[]0èÝ]È[\ÜÜÚ]]›ËÛÛ\ÝÈH[[Y]šXH[HZ[˜XØÙHÛÛˆHÛXÞHH›ÙXÙH[ˆ™\™]È
ÛÛœÙ[K™YØKÛÛœÙ[HÛÛˆ™\Ýš^š[ÛšJK—ˆ
ˆ[
Š”ÛXÞHYZ[š\Ý˜]Üˆ
JJŠˆ
Š™\ÙYÝYH[[Z[š\Ý˜]]˜[Y[JŠˆ]Y[™\™]ÎˆÙ[™\˜HÜ™Y[žšX[HÈÚÙ[ˆHÙ\ÜÚ[Û™HH\ÝZ\ØÙH[[ÈH\XØ^š[Û™HÝHÛÜØH\š\™HHÛÛˆ]X[H[Z]K—ˆ
ˆ[œÚY[YHHHH›Ü›X[›È[
ŠÛÛ›Û[™JŠ‹—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠJŠˆ[™\HH[ÛKˆ[
Š”ÛXÞH[™›Ü˜Ù[Y[Ú[
T
JŠˆ›Ûˆ˜[]H[NˆÝHÝ[
Š‘]H[™JŠˆY0ê[[È[ˆÝZHHÙ\ÜÚ[Û™HšY[™HX]\šX[Y[H\\HÈ›ØØØ]K—ˆ
ˆ
ŠÊJŠˆ	ÊŠ’Y[]H›ÝšY\ŠŠˆ›Ü›š\ØÙH
[›ÊˆZHÙYÛ˜[HÚH[HÛÛœÚY\˜KÚ[ðê	Ø]][XØ^š[Û™H[	ÚY[]0èXH›Ûˆ™[™HHXÚ\Ú[Û™HHXØÙ\ÜÛÈ°êH™H˜[]H[ÛÛ\ÝÈÛÛ\\ÜÚ]›Ë—ˆ
ˆ
ŠJJŠˆ[
Š•™X]ØÛÜH™YXÙ\ŠŠˆ›Ûˆ0ê[ˆÛÛ\Û™[HXÚ\Ú[Û˜[Nˆ0ê	ÛØšY]]›È\˜Ú]]\˜[HHšY\œ™H[˜YÙÚ[È	Ø^š[Û™HH[˜HÛÛ\›ÛZ\ÜÚ[Û™KÚHÚHÝY[™HÛÛˆHZXÜ›ÜÙYÛY[^š[Û™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆY[[Üš^ž˜HHØ][˜HH[X[›ÈH\\[™[ž˜Kˆ
Š”HXÚYH8¡¤ˆH[Y]H
ÛÛ›Û[™JH8¡¤ˆT\XØH
]H[™JJŠ‹ˆÙHHÛX[™HÚYYH
˜ÚH˜[]HHÛXÞJˆHš\ÜÜÝH0ê[ÛXÞH[™Ú[™NÈÙHÚYYH
˜ÚHÛÛœÙ[HÈ›ØØØHÛÛ˜Ü™][Y[H[˜Y™šXÛÊˆ0ê[ÛXÞH[™›Ü˜Ù[Y[Ú[ˆ‚ˆKˆÂˆYˆŒMˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ“™[[Ù[È™\›È\Ý[˜H›ÛHÚH[ÛÛ›Û[™HH]]Üš^ž˜]È[˜HšXÚY\ÝHHXØÙ\ÜÛË[›\ÜÛÈH]H˜H	Ý][HHHš\ÛÜœØH]™H\ÜÙ\™HÙ\Ý]ÈH˜\ÛY\ÜÛÈ[ˆ[ÙÈÛÜœ™]ÈYY™šXÚY[Hš[›ÈH\Ý[˜^š[Û™Kˆ‹ˆ]Y\Ý[ÛŽˆ“™[[Ù[È™\›È\Ý]X[HÛÛ\Û™[HØ\˜[\ØÙHš[˜Ú\[Y[HH˜\ÛZ\ÜÚ[Û™HÛÜœ™]HYY™šXÚY[HZH]H[˜H›ÛH™\ÙHHXÚ\Ú[ÛšHHXØÙ\ÜÛÏÈ‹ˆÜ[ÛœÎˆÂˆJHY\]™HY[]H‹ˆŠH]H[™H‹ˆÊHÛÛ›Û[™H‹ˆ‘
H™X]ØÛÜH™YXÝ[Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠH]H[™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
Š‘]H[™JŠˆ[	Ú[\››È[[Ù[È™\›È\ÝÛÝœš[[™H[˜\ÜÜÈY™™]]›ÈZH]Kˆ[˜H›ÛHÚH[ÛÛ›Û[™HHÛÛ˜Ù\ÜÛÈ	ØXØÙ\ÜÛË[]H[™HÚHØØÝ\HHØ\˜[\™HÚHH]H™[™Ø[›È˜\ÛY\ÜÚH[ˆ[ÙÈY™šXÚY[HH˜YÙÚ][™Ø[›ÈÛÜœ™][Y[HH\Ý[˜^š[Û™H™]š\ÝK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHY\]™HY[]JŠˆ[\YYØHXÚ\Ú[ÛšHHÚXÝ\™^ž˜H[˜[ZXÚH˜\Ø]HÝ[ÛÛ\Ü[Y[È[	Ý][HHÝ[ÛÛ\ÝËÝ\Ü[™È[ÛÛ›Û[™H™[HXÚ\Ú[ÛšHXHÙ[ž˜HÙ\Ý\™H[˜\ÜÜÈZH]K—ˆ
ˆ
ŠÊHÛÛ›Û[™JŠˆÚHØØÝ\HHXÚY\™HÙHÛÛ˜ÙY\™H	ØXØÙ\ÜÛÈ[˜[^ž˜[™ÈÛXÞKY[]0èHÙYÛ˜[HHZ[˜XØÚXKXH›ÛˆÙ\Ý\ØÙHH˜\ÛZ\ÜÚ[Û™HZH]H[˜H›ÛH™\ØHHXÚ\Ú[Û™K—ˆ
ˆ
Š‘
H™X]ØÛÜH™YXÝ[ÛŠŠˆšYÝX\™HH[Z]^š[Û™H[HÝ[žšX[H›Û™HH[››È[	Ú[\››ÈH[˜H™]K\ˆØ\˜[\™HÚH[˜Hš[Û^š[Û™H[ˆ[‰Ø\™XH›ÛˆÛÛ\›ÛY]H	Ú[\›ÈÚ\Ý[XKXH›ÛˆÚHÛÛ˜Ù[˜HÜXÚYšXØ[Y[HÝ[H˜\ÛZ\ÜÚ[Û™HZH]K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆÜÈÚH[ÛÛ›Û[™H\›Ý˜H	ØXØÙ\ÜÛÈH[ˆ\[™[HH[ˆš[HÙ\™\‹[]H[™H[œÝ˜YHH˜\ÛY]HHXØÚ]HH]HÛÛ[™[H[ØÝ[Y[ÈšXÚY\ÝË\ÜÚXÝ\˜[™ÈÚH\œš]š[›È[YÜšHHÙ[ž˜H[ÜH[\ÜÜÚ]]›È[	Ý][Kˆ‚ˆKˆÂˆYˆŒMKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆÜ][H^šY[™[HšY[™HÛÛ™]š\ÛÈH\››ÈH™H›ÙÙ]\ÝHÚH]›Ü˜[›ÈÝHÛÛ[Y\ÜÙHHÛY[HÛÛ˜ÛÜœ™[KˆÚX\ØÝ[›È]™HÝ\ˆXØÙY\™HÛÛ[ÈZH›ÜšH›ÙÙ]K[˜ÚHÙH]HH™HÛÛ›È[[Z[š\Ý˜]ÜšHØØ[H[HXXØÚ[˜HH[\ØÛÈ0êÚpè›Ý]ÈÛÛˆÚYœ˜]\˜H[YÜ˜[KˆH\™^š[Û™HÚYYHÚHH]HH[˜HÛÛ[Y\ÜØH™\Ý[›È[YÙÚXš[HY[™H]›Ü˜H[ÛÛYØHH[‰Ø[˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]™[ÈHÚYœ˜]\˜Hš\ÜÛ™HH]Y\ÝÈ™\]Z\Ú]ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\]\™HHÚYœ˜]\˜H[YÜ˜[H[\ØÛÈÛÛˆ[˜HÚX]™HpîH[™ØH‹ˆŠHÚYœ˜\™H™H›Û[ZHÙ\\˜]K[›È\ˆ›ÙÙ]\ÝKÚX\ØÝ[›ÈÛÛˆH›ÜšXHÚX]™H‹ˆÊHÚYœ˜\™H[˜Y™šXÛÈH™]H[Ü][HÛÛˆ[˜H”ˆÙ[\™H]]˜H‹ˆ‘
H\XØ\™HHÚYœ˜]\˜HH]™[ÈH]X˜\ÙHZHš[HH›ÙÙ]ÈÛÛ™]š\ÚH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÚYœ˜\™H™H›Û[ZHÙ\\˜]K[›È\ˆ›ÙÙ]\ÝJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÚX]™H[˜YÚ[Û˜[Y[È0êØ\\™H
Š˜ÛÛ›ÈÚJŠˆÚHÝH›ÝYÙÙ[™ËˆH
Š˜ÚYœ˜]\˜H[YÜ˜[H[\ØÛÊŠ‹Úpè™\Ù[KY™[™H[\Èš\ÚXÛÈ[Ü][NˆHXXØÚ[˜HÜ[H[\ØÛÈ0ê[ˆ›ØØÛÈ[YÙÚXš[KˆXH\[˜H[Ú\Ý[XHÚH]šXK[\ØÛÈšY[™HXÚYœ˜]È[ˆ[ÙÈ˜\Ü\™[H
Šœ\ˆÚ][œ]YHÝXH\Ø[™ÈHXXØÚ[˜JŠ‹H™[ÈØÙ[˜\š[ÈÚH˜]HH™H[[Z[š\Ý˜]ÜšHØØ[Nˆœ˜HÜ›ÈHÚYœ˜]\˜H[\ØÛÈ›Ûˆœ˜\Û™H[KˆH
Š˜ÚYœ˜]\˜HH›Û[YJŠˆÜÜÝH[ÛÛ™š[™H™[[ÈÚ]\ÝÎˆÙÛšH›ÙÙ]\ÝH[ÛH[›Üš[È›Û[YHÛÛˆH›ÜšXHÚX]™KHš[˜Ú0êH›ÛˆÈ˜H]Y[›Û[YH™\ÝHÚYœ˜]È[˜ÚHHÚ\Ý[XHXØÙ\ÛËˆ[ÛÛYØHÚH]›Ü˜HÝ[HÛÛ[Y\ÜØHÛÛ˜ÛÜœ™[H™YH[ˆÛÛ[š]Ü™H[YÙÚXš[K›ÛˆHš[Kˆ0â\Ø][Y[HÚpìˆÚHH\™^š[Û™HÚYYKH[žš[Û˜H›Û›ÜÝ[HHš]š[YÚH[[Z[š\Ý˜]]šK\˜Ú0êHÙ[ž˜HHÚX]™H›ÛˆÉðêš]š[YÚ[ÈÚHZ]]K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚYœ˜]\˜H[YÜ˜[HÛÛˆÚX]™HpîH[™ØNŠŠˆ˜Y™›Üž˜H[˜H›Ý^š[Û™HÚHÚpè[žš[Û˜HÛÛ›ÈHZ[˜XØÚXHØ˜YÛX]Kˆ[›Ø›[XH›Ûˆ0êÚHHÚYœ˜]\˜H[\ØÛÈÚXHX›ÛK0êÚH
ŠœÚH\ØÚ]YH]H[œÚY[YJŠˆ[	Ø]š[Îˆ˜YÜX\™HHÚX]™H›ÛˆØ[XšXHH[˜Hš\™ÛÛHÚHpìˆYÙÙ\™HÛÜØHHXXØÚ[˜HXØÙ\ØK—ˆ
ˆ
ŠÊH”ˆÙ[\™H]]˜NŠŠˆ›ÝYÙÙHH]H
Šš[ˆ˜[œÚ]ÊŠˆÝ[H™]KˆH›ÙÙ]H[ÈØÙ[˜\š[ÈÝ[››È™\›ZHÝ[\ØÛÈØØ[KH[ÛÛYØHÚHH\™H›Ûˆ]˜]™\œØH[Ý[˜H™]K—ˆ
ˆ
Š‘
HÚYœ˜]\˜HH]™[ÈH]X˜\ÙNŠŠˆ0ê[]™[ÈÚ]\ÝÈ]X[™ÈH]Hš]›Û›È
Šš[ˆ[ˆ]X˜\ÙJŠ‹Ý™H\Ú\ÝÛ›ÈX™[KÛÛÛ›™HH[ˆ[ÝÜ™HÚH\XØHH\›Y\ÜÚKˆ]ZHÚH˜]HHš[HH›ÙÙ]ÈÝ[š[\Þ\Ý[Nˆ›ÛˆÉðê[Ý[ˆ]X˜\ÙHHÚYœ˜\™K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HHØØ[HZH]™[HHÚYœ˜]\˜HK\ˆÚX\ØÝ[›Ë[[ÛY[È[ˆÝZH[]ÈÜ›˜HYÙÚXš[Kˆ
Š‘\ØÛÈ[\›ÊŠˆH›ÝYÙÙH[\Èš\ÚXÛËÚH\ØÚ]YH]È[	Ø]š[È0­È
Š”\^š[Û™HÈ›Û[YJŠˆHÜžš[ÛšHÙ\\˜]HÛÛˆÚX]šH\Ý[K™\Ý[›ÈÚ]\ÙHš[˜Ú0êH›ÛˆÚH[ÛH[›Û[YH0­È
Š‘š[JŠˆH[Ú[™ÛÛÈØÝ[Y[Ë›Ý]È[˜ÚHYÛH[šH][H[HÝ\ÜØHXXØÚ[˜H0­È
Š‘]X˜\ÙJŠˆH	Ø\˜Ú]š[ÈHš\ÜÛË[ˆÚX\›È\ˆÚHšHXØÙYH0­È
Š”™XÛÜ™ÈØ[\ÊŠˆHHÜ˜[[\š]0èpîHš[™K›ÝYÙÙH[˜ÚH[	Ø[[Z[š\Ý˜]Ü™KˆHÛX[™HHÜœÚH0êÙ[\™HHÝ\ÜØNˆ
˜ÚH0ê	Ø]™\œØ\š[ËHHXXØÚ[˜H0êXØÙ\ØOÊˆ‚ˆKˆÂˆYˆŒM‹ˆÜXÎˆ”ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[ˆ˜[œÛÛ]Ø\™HÚYœ˜H[š[HÙ\™\ˆH[‰Ø^šY[™Kˆ[X[H[\šY[™H[ˆÙ\]Y[ž˜Nˆ\ÛÛH	ÚÜÝ[H™]Kš\š\Ý[˜HH]HZH˜XÚÝ\[[]]Xš[K™Z[œÝ[H[Ú\Ý[XHÜ\˜]]›ÈH[‰Ú[[XYÚ[™HÙ\YšXØ]HH[™š[™H\XØHH]ÚÚHÚ]Y]˜HH[™\˜Xš[]0èÙœ]]Kˆ‹ˆ]Y\Ý[ÛŽˆH]X[HØ]YÛÜšXH[žš[Û˜[H\\[™ÛÛ›È[š\š\Ý[›ÈZH]HHH™Z[œÝ[^š[Û™H[Ú\Ý[XOÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ›ÛH[™\ÝYØ]]šH
]XÝ]™JH‹ˆŠHÛÛ›ÛH™]™[]šH
™]™[]™JH‹ˆÊHÛÛ›ÛHÛÜœ™]]šH
ÛÜœ™XÝ]™JH‹ˆ‘
HÛÛ›ÛH]\œ™[H
]\œ™[
H‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÛÛ›ÛHÛÜœ™]]šJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆÛÛ›ÛÈ
Š˜ÛÜœ™]]›ÊŠˆ[\šY[™H
Š™ÜÊŠˆÚH	Ú[˜ÚY[HÚH0ê™\šYšXØ]Ë\ˆ[Z]\›™HÛHY™™]HHš\Ü\™HHÚ\Ý[ZH[ÈÝ]ÈÜ\˜]]›Ëˆ[š\š\Ý[›ÈH˜XÚÝ\HH™Z[œÝ[^š[Û™HH[[XYÚ[™HÙ\YšXØ]H˜[››È\Ø][Y[H]Y\ÝÎˆ›Ûˆ[\Y\ØÛÛ›È	Ø]XØÛË™Hš\\˜[›ÈHÛÛœÙYÝY[ž™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠH™]™[]šNŠŠˆ™[ÈØÙ[˜\š[È[ÛÛ›ÛÈ™]™[]›È0êH
Šœ]Ú\XØ]H[Hš[™JŠ‹\˜Ú0êH[\Y\ØÙHÈÙœ][Y[È]\›ÈH]Y[H[™\˜Xš[]0èˆ[š\š\Ý[›È›Ûˆ™]šY[™H[Nˆ	Ù]™[È0êÚpèXØØY]Ë—ˆ
ˆ
ŠJH[™\ÝYØ]]šNŠŠˆ]œ™X˜™\›Èš[]˜]È	Ø]XØÛÈY[™H]™[š]˜H
[ˆQ‹[ˆÒQSK[[Ûš]Ü˜YÙÚ[È[H[›ÛX[YJKˆ™[ÈØÙ[˜\š[È[š[]˜[Y[ÈÉðêÚpèÝ]ÎÈ]ZHÚHÝHš[YYX[™Ë—ˆ
ˆ
Š‘
H]\œ™[NŠŠˆYÚ\ØÛÛ›ÈÝ[HXÚ\Ú[Û™H[	Ø]XØØ[H
œš[XJˆ[[]]›È
Ø\[K˜[›™\ˆYØ[K›ÝÜšY]0è[HØ[žš[ÛšJKˆ[˜[œÛÛ]Ø\™HHÚpèÛÛ]Ë›ÛˆÉðê[HHØÛÜ˜YÙÚX\™K——Šˆ
Š“›ÝH	Ù\Ø[YH8 %	Ú\ÛÛ[Y[È0ê[ˆØ\ÛÈ[\™\ÜØ[NŠŠˆ\ÛÛ\™H	ÚÜÝ[H™]H0ê[ˆÛÛ›ÛÈ\XØ[Y[HÛ\ÜÚYšXØ]ÈÛÛYH
Š˜ÛÜœ™]]›ÊŠˆ[ˆ]X[È^š[Û™HHÛÛ[š[Y[È[	Ú[˜ÚY[H[ˆÛÜœÛËXH[Ý[šH\ÝHÈYÙÛÛ›ÈÛÛYH™]™[]›È\˜Ú0êH
š[\Y\ØÙJˆH›ÜYØ^š[Û™KˆÙHHÛX[™H›ÜÛ™H[˜[X™HH]\™KØÙYÛH]Y[HÛÙ\™[HÛÛˆ[[ÛY[È\ØÜš]ÎˆÙH	Ú[˜ÚY[H0ê[ˆÛÜœÛÈHÚHÝH[Z][™È[[››ËHš\ÜÜÝH0êÛÜœ™]]›Ë—Šˆ
Š”ØÚ[XH[\Ü˜[HHY[[Üš^ž˜\™NŠŠˆ
œš[XJˆ8¡¤ˆ\™]]›Ë]\œ™[K™]™[]›È0­È
™\˜[Jˆ8¡¤ˆ[™\ÝYØ]]›È0­È
™ÜÊˆ8¡¤ˆÛÜœ™]]›È0­È
œ]X[™È[ÛÛ›ÛÈÚ]\ÝÈ›Ûˆ0ê\XØXš[Jˆ8¡¤ˆÛÛ\[œØ]]›Ëˆ‚ˆKˆÂˆYˆŒMËˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ“ÈÝY[ÈYØ[H	ÔÞY™^K›Ü›X[‹[™Ü˜Y[YIÈ\ÚY\˜H[\[Y[\™H[ˆ›ØÙ\ÜÛÈÚHšXÚYYHÚH]HH[ÙYšXÚHZH›ÜšHX[šHHÚXÝ\™^ž˜H™[™Ø[›È\Ø[Z[˜]HH[ˆÛÛZ]]ÈÛÛœÝ[]›ÈH\›Ý˜]HH[ˆ\šYÙ[HÙ[š[Üˆš[XHH\ÜÙ\™H[\[Y[]Kˆ‹ˆ]Y\Ý[ÛŽˆ‘H]X[H›ØÙ\ÜÛÈ0ê[ˆ\Ù[\[È]Y\ÝH›ØÙY\˜OÈ‹ˆÜ[ÛœÎˆÂˆJH˜XÚÛÝ][ˆ‹ˆŠHÚ[™ÙHX[˜YÙ[Y[‹ˆÊH[\XÝ[˜[\Ú\È‹ˆ‘
HÝÛ™\œÚ\‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÚ[™ÙHX[˜YÙ[Y[
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[
ŠÚ[™ÙHX[˜YÙ[Y[
Šˆ
Ù\Ý[Û™H[Ø[XšX[Y[ÊH0ê[›ØÙ\ÜÛÈ\ˆ\Ø[Z[˜\™HH]]Üš^ž˜\™HH[ÙYšXÚHZHÚ\Ý[ZHU[š[™HHØ\˜[\™HÚHÙÛšHØ[XšX[Y[È™[™ØHYYÝX][Y[H™]š\Ú[Û˜]ÈH]]Üš^ž˜]Èš[XHH\ÜÙ\™H[\[Y[]Ëˆ[ˆ\Ù[\[ÈH]Y\ÝÈ›ØÙ\ÜÛÈ™]™YHÚH]HH[ÙYšXÚH™[™Ø[›È\Ø[Z[˜]HH[ˆÛÛZ]]ÈÛÛœÝ[]›È
Ú[™ÙHYš\ÛÜžH›Ø\™
HH\›Ý˜]HH[ˆ\šYÙ[HÙ[š[Üˆš[XH[	Ú[\[Y[^š[Û™K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH˜XÚÛÝ][ŠŠˆ0ê[œØ]È\ˆY™œ›Û\™H[˜HÚ]X^š[Û™H[ˆÝZH[ˆØ[XšX[Y[È0êÝ]È]šX]ÈXH›Ûˆpìˆ\ÜÙ\™HÛÛ\]]ÎÈ0ê[˜HÛÛ\Û™[H[pîH[\[È›ØÙ\ÜÛÈHÚ[™ÙHX[˜YÙ[Y[—ˆ
ˆ
ŠÊH[\XÝ[˜[\Ú\ÊŠˆ0ê[›ØÙ\ÜÛÈH˜[]^š[Û™H[Ý[žšX[H[\]ÈH[ˆØ[XšX[Y[ÈÝZHÚ\Ý[ZHUHÝ[\Ú[™\ÜËXH›Ûˆ\ØÜš]™H	Ú[\›È›ØÙ\ÜÛÈH™]š\Ú[Û™HH\›Ý˜^š[Û™H›Ü›X[K—ˆ
ˆ
Š‘
HÝÛ™\œÚ\
ŠˆÚHšY™\š\ØÙH[	Ú[™]šY[ÈÈ[Ü\È™\ÜÛœØXš[H[HÙ\Ý[Û™HH[ˆ\XÛÛ\™HÚ\Ý[XHÈÛÛ\Û™[HU——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ™\ÜÛÈÈÝY[ÈYØ[KÙÛšHšXÚY\ÝHH[ÙYšXØH[š\™]Ø[]™Hš[XH\ÜØ\™H]˜]™\œÛÈ[Ú[™ÙHYš\ÛÜžH›Ø\™ÚH˜[]HHš\ØÚKHÝXØÙ\ÜÚ]˜[Y[HšXÙ]™\™HHš\›XH[ÒTÓÈš[XHÚHH[ÙYšXØH™[™ØH\XØ]H[ˆ›Ù^š[Û™Nˆ]Y\ÝÈ[\›È›\ÜÛÈÛÜÝ]Z\ØÙH[›ØÙ\ÜÛÈHÚ[™ÙHX[˜YÙ[Y[ˆ‚ˆKˆÂˆYˆŒNˆÜXÎˆÚ[™ÙHX[˜YÙ[Y[‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™HÚHÜ\˜H[ˆ[ˆ[XšY[HÚXÝ\›ÈÚH›Ý˜HHÝ™\ˆXÚY\™HÙHYÙÚ[Ü›˜\™HÈY[›È[Ý[™H\XØ^š[ÛšHYØXÞH[˜ÛÜ˜H[ˆ\ÛÈ™\ÜÛÈH›ÜšH™\\HÜ\˜]]šKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[0ê[˜HÝ[žšX[H[\XØ^š[Û™HXÛšXØH\š]˜[H[X[˜Ø]ÈYÙÚ[Ü›˜[Y[ÈH\XØ^š[ÛšHYØXÞH[ˆ[ˆ[XšY[HÚXÝ\›ÏÈ‹ˆÜ[ÛœÎˆÂˆJHXYÙÚ[Ü™HÛÛ\]Xš[]0èÛÛˆHÚ\Ý[ZH[Ù\›šH‹ˆŠHÛÛ™›Ü›Z]0è]]ÛX]XØH[H[Ý™HÛXÞHHÚXÝ\™^ž˜H‹ˆÊH™\Ý^š[ÛšHHÚ\Ý[XHpîH™[ØÚH‹ˆ‘
Hš\ØÚ[È[]˜]ÈH[™\˜Xš[]0èHÚXÝ\™^ž˜H‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
Hš\ØÚ[È[]˜]ÈH[™\˜Xš[]0èHÚXÝ\™^ž˜JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[X[˜Ø]ÈYÙÚ[Ü›˜[Y[È[H\XØ^š[ÛšHYØXÞH[ˆ[ˆ[XšY[HÚXÝ\›ÈpìˆÛÛ\Ü\™H[ˆš\ØÚ[È[]˜]ÈH[™\˜Xš[]0èHÚXÝ\™^ž˜Kˆ]Y\ÝH\XØ^š[ÛšHØœÛÛ]HÜ\ÜÛÈ™\Ù[[›È[HX›ÛH›ÛˆÛÜœ™]HÚHÛH]XØØ[HÜÜÛÛ›ÈÙœ]\™KÛÛ\›ÛY][™ÈÝ[žšX[Y[H	Ú[\˜HÚXÝ\™^ž˜H[Ú\Ý[XK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHHXYÙÚ[Ü™HÛÛ\]Xš[]0èÛÛˆHÚ\Ý[ZH[Ù\›šJŠˆ›Ûˆ0êÛÜœ™]NˆH\XØ^š[ÛšHYØXÞKHY™™\™[ž˜HH]Y[HYÙÚ[Ü›˜]KX[˜Ø[›È\XØ[Y[HHÛÛ\]Xš[]0èÛÛˆÛHÝ[™\™HÚXÝ\™^ž˜H[Ù\›šK—ˆ
ˆ
ŠŠHHÛÛ™›Ü›Z]0è]]ÛX]XØH[H[Ý™HÛXÞHHÚXÝ\™^ž˜JŠˆ›Ûˆ0êÛÜœ™]Nˆ[ÛÙØ\™HYØXÞH[™HHš[X[™\™H[™Y]›Èš\Ü]ÈZH™\]Z\Ú]HHÛÛ™›Ü›Z]0è]X[K—ˆ
ˆ
ŠÊHH™\Ý^š[ÛšHHÚ\Ý[XHpîH™[ØÚJŠˆ›Ûˆ0êÛÜœ™]NˆHX[˜Ø[ž˜HHYÙÚ[Ü›˜[Y[H›ÛˆZYÛ[Ü˜HH™\Ý^š[ÛšK[žšHH\XØ^š[ÛšHØœÛÛ]HÜÜÛÛ›Èš\Ý[\™HpîH[HÈY[›ÈY™šXÚY[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆÜÜY[HÛÛ[XHH][^ž˜\™H[ˆ™XØÚ[ÈÚ\Ý[XHHÙ\Ý[Û™H[HØ\[HÛ[šXÚHš]›ÈH]ÚH[›šKˆ[ˆ]XØØ[HÙœ]H[˜H[™\˜Xš[]0è›ÝHH›ÛˆÛÜœ™]H[ˆ]Y[ÛÙØ\™H\ˆXØÙY\™HZH]HÙ[œÚXš[HZH^šY[K[ˆš\ØÚ[ÈÚHØ\™X˜™HÝ]ÈZ]YØ]ÈÛÛˆYÙÚ[Ü›˜[Y[H™YÛÛ\šKˆ‚ˆKˆÂˆYˆŒNKˆÜXÎˆ”\ÚXØ[ÙXÝ\š]HÛÛ›ÛÈ‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™H\ØH˜YÙHH›ÜÜÚ[Z]0èH˜\ÜØHœ™\]Y[ž˜KÙ[ž˜HÚYœ˜]\˜KÚH˜\ÛY]Û›È[ˆÚX\›È[ˆ[Y\›ÈY[YšXØ]]›Èš\ÜÛËˆ\˜[H[ˆ\Ý]]Üš^ž˜]Ë[ˆÛÛœÝ[[HÚH]šXÚ[˜HH[ˆ\[™[H[ˆ\ØÙ[œÛÜ™HÛÛˆ[ˆ]Ü™H˜\ØÛÜÝÈ™[È˜Z[›ËÛÜXH[˜YÙH[ˆØÚHÙXÛÛ™HH[Ú[Ü››ÈÜÈ[˜H™[]HÙ[\ˆÙ[ž˜H\ÜÙ\™H™\›X]ËˆHÙÈ™YÚ\Ý˜[›È[ˆ[™Ü™\ÜÛÈ\™™][Y[H™YÛÛ\™HH›ÛYH[\[™[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HX›Û^ž˜H0êÝ]HÙœ]]HH]X[HÛÛ›ÛZ\Ý\˜HH[[Z[˜OÈ‹ˆÜ[ÛœÎˆÂˆJH[˜YÙH\˜HØØY]Îˆ˜\ÝHšY\œ™HH˜[Y]0èZH˜YÙHHÙZHY\ÚH‹ˆŠH[\[™[HH˜]XØ]ÈZ[Ø][™ÎˆÙ\™H[ˆ™\ÝX›ÛÈHÛÛ›ÛÈXØÙ\ÜÚH‹ˆÊH[˜YÙH0êÛÛ˜Xš[H\˜Ú0êH›Ûˆ]][XØNˆÙ\›Û›ÈÛX\Ø\™Üš]ÙÜ˜YšXÚHH[ˆÙXÛÛ™È˜]Ü™H‹ˆ‘
HHÙÈ›Ûˆ\˜[›È[Ûš]Ü˜]NˆÙ\™H[ˆ[\›YHÝYÛH[™Ü™\ÜÚH[ÜšHÜ˜\š[È™[]HÙ[\ˆ‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊH[˜YÙH0êÛÛ˜Xš[H\˜Ú0êH›Ûˆ]][XØJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ˜YÙHH›ÜÜÚ[Z]0èH˜\ÜØHœ™\]Y[ž˜Hš]›ÈHÚYœ˜]\˜H›Ûˆ
Š˜]][XØJŠˆ[NˆÚH[Z]HH
Š™XÚX\˜\™JŠˆ[ˆ[Y\›ËÙ[\™HÈÝ\ÜÛËHÚ][œ]YHÈ[\œ›ÙÚKˆ0â	Ù\]Z]˜[[Hš\ÚXÛÈH[˜H\ÜÝÛÜ™˜\ÛY\ÜØH[ˆÚX\›ÈHXZHØ[XšX]KHÚ][œ]YHšY\ØØHY]šXÚ[˜\œÚHX˜˜\Ý[ž˜HpìˆÛÜX\›HÙ[ž˜HØØØ\™HHš][XH°êH\ØÚX\™H˜XØÚXKˆ[]YÛ[ÈpîH\Ý]]›È[ÈØÙ[˜\š[È0ê	Ý[[[Îˆ[Ú\Ý[XH™YÚ\Ý˜H[ˆ[™Ü™\ÜÛÈ
Šœ\™™][Y[H™YÛÛ\™JŠ‹\˜Ú0êH[Ý[È[ÈHš\ÝH[˜YÙH™\Ù[]È0ê]][XÛËˆHÛÛ›ÛZ\Ý\˜H]™H]Z[™HØ[XšX\™HH˜]\˜H[ÛÛ›ÛË›Ûˆ˜Y™›Üž˜\›™HHÛÛÜ›šNˆ
ŠœÛX\Ø\™Üš]ÙÜ˜YšXÚJŠˆÚK[™XÙHH™XÚ]\™H[ˆ[Y\›Ë\ÙYÝ[Û›È[˜HÙšYHÜš]ÙÜ˜YšXØHÛÛˆ[˜HÚX]™HÚH›Ûˆ\ØÚXHXZHHØ\KH[ˆ
ŠœÙXÛÛ™È˜]Ü™JŠ‹\XØ[Y[H[ˆSˆÝ[H\ÝY\˜H[]Ü™KÛÜðëÚHHØ\HHÛÛH›Ûˆ˜\ÝKˆ0âHÝ\ÜØHÙÚXØH[	Ø]][XØ^š[Û™HHpîH˜]ÜšH\XØ]H[HÜNˆ]X[ÛÜØHÚHÜÜÚYYHpîH]X[ÛÜØHÚHØZK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH˜YÙHØØY]ÎŠŠˆ[H™[ÈØÙ[˜\š[ÈšYÝX\™HHØØY[ž˜KHšY\›™HH˜[Y]0è›ÛˆÙ\™Nˆ[ÛÛ™H[žš[Û˜H\ˆ]È[[\È[ˆÝZH[žš[Û˜H	ÛÜšYÚ[˜[K]Z[™HXØÛÜ˜ÚX\™HHš[™\Ý˜HHXØÛÜ˜ÚXH\ˆ[˜[XšK—ˆ
ˆ
ŠŠHZ[Ø][™ÎŠŠˆ]šY[™H]X[™È]X[Ý[›È[˜H
Š˜XØÛÙ[™ÜÚJŠˆH[˜H\œÛÛ˜H]]Üš^ž˜]Kˆ]ZH[ÛÛœÝ[[H0ê[˜]È
Š™HÛÛÊŠ‹ÛÛˆ[ˆ˜YÙHÝ[ÈH]HÛHY™™]Nˆ[ˆ™\ÝX›ÛÈÚH[[Y]H[˜H\œÛÛ˜H\ˆ›ÛHÈ]œ™X˜™H˜]È\ÜØ\™HÙ[ž˜HØšY^š[ÛšK—ˆ
ˆ
Š‘
HÙÈ›Ûˆ[Ûš]Ü˜]NŠŠˆ	Ø[\›YH]œ™X˜™HÝ]È˜\ˆ›Ý\™H	Ø[›ÛX[XH
Š™ÜÊŠ‹HÛÛÈÙH	Ú[™Ü™\ÜÛÈ›ÜÜÙH]™[]È[ÜšHÜ˜\š[Ëˆ0â[ˆÛÛ›ÛÈ]XÝ]™KH›ÛˆY™œ›ÛHH˜YÚ[Û™H\ˆÝZHHÜHÚH0ê\\K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HÚHHXÛ›ÛÙÚYHH˜YÙH›ÛˆÛÛ›È\]Z]˜[[HHÚHHÛX[™HÚ[ØØ[›ÈÝH]Y\ÝËˆ
Š˜[™HXYÛ™]XØHH›ÜÜÚ[Z]0èHLHÒŠŠˆHY[YšXØ]Ü™HÝ]XÛÈ[ˆÚX\›ËÛÛ˜Xš[HÛÛˆ\\™XØÚX]\™HHØÚHXÚ[™HH]\›È0­È
Š”ÛX\Ø\™ÛÛˆÚ\
ŠˆHH\ÜÙ\™HÙ[ž˜HÛÛ]ÈÚYœ˜]HH]][XØ^š[Û™HHÙšYKHÚX]™H›Ûˆ\ØÙHXZH[HØ\Kˆ[š[˜Ú\[ÈÙ[™\˜[HHÜ\œÚH[	Ù\Ø[YH0êÚH[ˆÛÛ›ÛÈÚHÚH[Z]HH
ŠšY[YšXØ\™JŠˆ›Ûˆ
Š˜]][XØJŠŽˆ˜[H\ˆH˜YÙHÛÛYH\ˆ	Ú[™\š^ž›ÈPPÈ[ˆ™]K[˜[XšHXÚX\˜^š[ÛšHÚHÚ][œ]YHpìˆš\]\™Kˆ‚ˆKˆÂˆYˆŒŒˆÜXÎˆ–™\›È\Ý\˜Ú]XÝ\™H‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[Îˆ•[‰ÛÜ™Ø[š^ž˜^š[Û™HÝH[\[Y[[™È[ˆ[Ù[È™\›È\ÝH\ÚY\˜HYš[š\™HÛÛˆÚX\™^ž˜H[š[˜Ú\[ÈÙXÛÛ™ÈÝZHšY[™HÛÛ˜Ù\ÜÛÈ	ØXØÙ\ÜÛÈ[Hš\ÛÜœÙH^šY[™[Kˆ‹ˆ]Y\Ý[ÛŽˆ’[ˆ[ˆ[Ù[È™\›È\Ý]X[HZHÙYÝY[Hš[˜Ú\H\ØÜš]™HQQÓSÈ[[ÙÈ[ˆÝZHšY[™HÛÛ˜Ù\ÜÛÈ	ØXØÙ\ÜÛÈ[Hš\ÛÜœÙOÈ‹ˆÜ[ÛœÎˆÂˆJH\Ý]™\šYžH‹ˆŠHX\Ýš]š[YÙH‹ˆÊH[\XÚ]\Ý‹ˆ‘
H›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHX\Ýš]š[YÙJŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ[ˆ[Ù[È™\›È\Ý	ØXØÙ\ÜÛÈšY[™HÛÛ˜Ù\ÜÛÈ[ˆ˜\ÙH[š[˜Ú\[È[
Š›Z[š[[Èš]š[YÚ[È
X\Ýš]š[YÙJJŠ‹[ÚHÚYÛšYšXØHÚHÛH][HšXÙ]›Û›ÈÛÛÈ	ØXØÙ\ÜÛÈZ[š[[È™XÙ\ÜØ\š[È\ˆÝ›ÛÙ\™HH›ÜšYH]]š]0èÙ[ž˜HÚH™\ÜÝ[˜H[]0èÚXHÛÛœÚY\˜]H][™Xš[H\ˆ[\ÜÝ^š[Û™H™YYš[š]HHÛÛˆ[˜H™\šYšXØHÛÛ[XH[	ØXØÙ\ÜÛË—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH\Ý]™\šYžJŠˆÚH[[™XHÛÛÈ\žšX[Y[H[ÛÛ˜Ù]ËÚXÚ0êH[\XØHÛÛ][œ]YH[˜HšYXÚXH[š^šX[KY[™HÈ™\›È\ÝšXÚYYH[˜H™\šYšXØHÛÜÝ[HÙ[ž˜H™\Ý\Üœ™H[Ý[˜HšYXÚXK—ˆ
ˆ
ŠÊH[\XÚ]\Ý
Šˆ›ÛˆÚH[[™XHÛÛˆÈ™\›È\ÝÚXÚ0êH™\Ý\Û™HšYXÚXHÙ[ž˜H™\šYšXØHÛÛ[XK[ˆÛÛ˜Ù]ÈÚH[[Ù[È™\›È\ÝZ\˜HY[[Z[˜\™K—ˆ
ˆ
Š‘
H›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û
Šˆ\ÜÙYÛ˜HH\›Y\ÜÚH[ˆ˜\ÙHZH[ÛH]]ÜÝÈÚHZ[š[Z^ž˜\™HšYÛÜ›ÜØ[Y[H	ØXØÙ\ÜÛË[ÚHÝ™X˜™HÛÛ˜ÙY\™Hš]š[YÚH›ÛˆÝ™][Y[H™XÙ\ÜØ\šK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ[ˆ\[™[H[™\\ÈX\šÙ][™ÈšXÙ]™HXØÙ\ÜÛÈ\ØÛ\Ú]˜[Y[HYÛHÝ[Y[HHZHØÝ[Y[H™XÙ\ÜØ\šH\ˆ[›Üš[È[ÛËÙ[ž˜H[Ý[ˆXØÙ\ÜÛÈ™YYš[š]ÈY[™Hš\ÛÜœÙH^šY[™[NÈÙÛšHšXÚY\ÝHHXØÙ\ÜÛÈYÙÚ][]›ÈšY[™H˜[]]HH™\šYšXØ]HÚ[™ÛÛ\›Y[Kˆ‚ˆKˆÂˆYˆŒŒKˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[[ÝK[ˆ\[™[H[	Ú[\ÚËšXÙ]™H[‰Ù[XZ[H[˜HÛY[KˆHÛY[H˜XØÛÛHH]™\ˆš\ØÛÛ˜]È[›ÈÝ˜[›È]š\ÛÈ\˜[H[[]]›ÈHXØÙY\™HH[ˆÚ]ÈÙXˆÚH]™]˜HÚpèš\Ú]]È[ÛH›ÛH[ˆ\ÜØ]ËXH]Y\ÝH›ÛH[Y\ÜØYÙÚ[ÈÙYÛ˜[HÚH[ˆÙ\YšXØ]È›Ûˆ0ê˜[YËˆ[ÈØÜ™Y[œÚÝ[šX]È[HÛY[K[[ÝH›ÛˆšY\ØÙHHš\Ø[\™H[›ÛYH\Ø]È[Ù\YšXØ]Ëˆ‹ˆ]Y\Ý[ÛŽˆÛÜØHpìˆ][^ž˜\™H[[ÝH\ˆ™\šYšXØ\™HÙH[Ù\YšXØ]È›Ûˆ0êpîH˜[YÏÈ‹ˆÜ[ÛœÎˆÂˆJH›ÛÝÙˆ\Ý‹ˆŠHÛ›[™HÙ\YšXØ]HÝ]\È›ÝØÛÛ‹ˆÊHÙ\YšXØ]H™]›ØØ][Ûˆ\ÝÈ‹ˆ‘
HÙ\YšXØ]H]]Üš]Y\È‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÙ\YšXØ]H™]›ØØ][Ûˆ\ÝÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆH
ŠÙ\YšXØ]H™]›ØØ][Ûˆ\ÝÈ
Ô“
JŠˆÛÛ›È[[˜ÚHZHÙ\YšXØ]HÚHÛÛ›ÈÝ]H™]›ØØ]HH[˜HÙ\YšXØ]H]]Üš]Hš[XH[HÜ›È]HHØØY[ž˜H™]š\ÝKˆÚXÚ0êH[[ÝH›ÛˆÛÛ›ÜØÙH[›ÛYH[Ù\YšXØ]ËÛÛœÝ[\™H]Y\ÝÈ[[˜ÛÈ˜\™\Ù[HHÝXHZYÛ[Ü™HÜš[Û™H™[ÈØÙ[˜\š[È\ØÜš]Ë—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJH›ÛÝÙˆ\Ý
›Õ
JŠˆ0ê[˜H›ÛHÙ[\™HÛÛœÚY\˜]H][™Xš[K[›Û™[Y[ÈH[ˆÚ\Ý[XHÜš]ÙÜ˜YšXÛÈH[[ÈÙ[˜[H[HØ][˜HHšYXÚXH[Ý[È[\››ÎÈ0ê[\Ü[H™[HÒKXH›Ûˆ›Ü›š\ØÙH\™][Y[H[™›Ü›X^š[ÛšHÝZHÙ\YšXØ]H™]›ØØ]K—ˆ
ˆ
ŠŠHÛ›[™HÙ\YšXØ]HÝ]\È›ÝØÛÛ
ÐÔÔ
JŠˆ0ê[ˆ›ÝØÛÛÈ[\›™]\Ø]È\ˆÝ[™\™HÈÝ]ÈH™]›ØØHH[ˆÙ\YšXØ]ÈYÚ][HÜXÚYšXÛÎÈÙH[[ÝHÛÛ›ÜØÙ\ÜÙH[›ÛYH[Ù\YšXØ]ËØ\™X˜™HHÝXHZYÛ[Ü™HÜš[Û™KXH™[ÈØÙ[˜\š[È›Ûˆ\ÜÛ™HH]Y\ÝH[™›Ü›X^š[Û™K—ˆ
ˆ
Š‘
HÙ\YšXØ]H]]Üš]Y\È
ÐJJŠˆÛÛ›È[]0èšY]HÚHš[\ØÚX[›ÈHÙ\Ý\ØÛÛ›ÈÜ™Y[žšX[HHÚXÝ\™^ž˜HHÚX]šHX˜›XÚH\ˆHÚYœ˜]\˜HZHY\ÜØYÙÚNÈHÐHX˜›XØ[›ÈHÔ“XHÙHÛÛ]]H\™][Y[H[ˆY\š]ÈH[ˆÙ\YšXØ]ÈÜXÚYšXÛËš[X[™\˜[››ÈÛÛ][œ]YH[HÔ“Ý\ÜØK——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆ›ÛˆÛÛ›ÜØÙ[™È[›ÛYH\Ø]È[Ù\YšXØ]ÈØØY]ÈÙYÛ˜[]È[HÛY[K[[ÝHÛÛœÝ[HHÙ\YšXØ]H™]›ØØ][Ûˆ\ÝX˜›XØ]H[HÐH\ˆ™\šYšXØ\™HÙH[Ù\YšXØ]È[Ú]Èš\Ý[H˜H]Y[H™]›ØØ]H[XÚ\][Y[Kˆ‚ˆKˆÂˆYˆŒŒ‹ˆÜXÎˆ]][XØ][ÛˆY]ÙÈ‹ˆ]™[ˆÓÓT‘S”ÒSÓ‘H‹ˆØÙ[˜\š[ÎˆÛÛœÝ[˜ÙHÝHY™™]X[™È	ØXØÙ\ÜÛÈ[›Üš[ÈÛÛÈ˜[˜Ø\š[ÈÛ›[™Kˆ[Ú]ÈÙXˆ™\šYšXØHÚHÝXH][^ž˜[™È[›ÛYH][HHH\ÜÝÛÜ™ÛÜœ™]Kˆ‹ˆ]Y\Ý[ÛŽˆ‘H]X[HY]ÙÈÛÛ][™H\ˆ]][XØ\™HH\œÛÛ™H0ê[ˆ\Ù[\[È]Y\ÝÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÜÜÙ\ÜÚ[Û‹X˜\ÙY]][XØ][Ûˆ‹ˆŠHš[ÛY]šXÈ]][XØ][Ûˆ‹ˆÊHØØ][Û‹X˜\ÙY]][XØ][Ûˆ‹ˆ‘
HÛ›ÝÛYÙKX˜\ÙY]][XØ][Ûˆ‚ˆKˆ[œÝÙ\’[™^ˆËˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
Š‘
HÛ›ÝÛYÙKX˜\ÙY]][XØ][ÛŠŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ[ˆ›ÛYH][HH[˜H\ÜÝÛÜ™ÛÛ›È\Ù[\HH
Š˜]][XØ^š[Û™H˜\Ø]HÝ[HÛÛ›ÜØÙ[ž˜H
Û›ÝÛYÙKX˜\ÙY]][XØ][ÛŠJŠ‹[ˆY]ÙÈÛÛ][™H\ˆ]][XØ\™HH\œÛÛ™H˜\Ø]ÈÝH]X[ÛÜØHÚH	Ý][HÛÛ›ÜØÙK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÜÜÙ\ÜÚ[Û‹X˜\ÙY]][XØ][ÛŠŠˆÚHšY™\š\ØÙH[	Ý][^ž›ÈH[ˆÙÙÙ]Èš\ÚXÛËÛÛYH[˜HÛX\Ø\™È[ˆÚÙ[‹\ˆ	Ø]][XØ^š[Û™K—ˆ
ˆ
ŠŠHš[ÛY]šXÈ]][XØ][ÛŠŠˆÚHšY™\š\ØÙH[	Ý][^ž›ÈH[˜HØ\˜]\š\ÝXØHš[ÛY]šXØKÛÛYH[‰Ú[\›ÛHYÚ][HÈ[šXÛÛ›ÜØÚ[Y[È˜XØÚX[K\ˆ	Ø]][XØ^š[Û™K—ˆ
ˆ
ŠÊHØØ][Û‹X˜\ÙY]][XØ][ÛŠŠˆ][^ž˜HHÜÚ^š[Û™HÙ[ÙÜ˜YšXØH[ˆÝZHÚH›Ý˜H[˜H\œÛÛ˜H[[ÛY[È[	ØXØÙ\ÜÛÈH[ˆÚ]È\ˆ]][XØ\™H	Ý][K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆÙÛšH›ÛHÚHÛÛœÝ[˜ÙHXØÙYH[›Üš[ÈÛÛÈ˜[˜Ø\š[ÈÛ›[™KYÚ]H[›Üš[È›ÛYH][HHH›ÜšXH\ÜÝÛÜ™ˆ[˜[X™HH[™›Ü›X^š[ÛšHÛÛ›È›ÝH\ØÛ\Ú]˜[Y[HHZK[ÚH™[™H]Y\ÝÈ[ˆÛ\ÜÚXÛÈ\Ù[\[ÈH]][XØ^š[Û™H˜\Ø]HÝ[HÛÛ›ÜØÙ[ž˜Kˆ‚ˆKˆÂˆYˆŒŒËˆÜXÎˆ”ÙXÝ\™H™]ÛÜšÈ›ÝØÛÛÈ‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ”ØY™YÝX\™Þ\Ý[\È\ÚY\˜H›ÝYÙÙ\™HHÛÛ][šXØ^š[ÛšH›ØØ[H˜HH›ÜšYHš[X[Kˆ‹ˆ]Y\Ý[ÛŽˆ”]X[HZHÙYÝY[H›ÝØÛÛH›Ü›š\™X˜™HÚYœ˜]\˜HÜXÚYšXØ[Y[H\ˆ[˜Y™šXÛÈ›ØØ[HÝHTÈ‹ˆÜ[ÛœÎˆÂˆJHÔ‹ˆŠHT”‹ˆÊHÔ•‹ˆ‘
HPÓT‚ˆKˆ[œÝÙ\’[™^ˆ‹ˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠÊHÔ•
Š‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆ	ÊŠ”Ô•
ÙXÝ\™H™X[][YH˜[œÜÜ›ÝØÛÛ
JŠˆ›Ü›š\ØÙHÚYœ˜]\˜K]][XØ^š[Û™HZHY\ÜØYÙÚHH[YÜš]0è\ˆHÛÛ][šXØ^š[ÛšH›ØØ[HÝHTˆ0â›ÙÙ]]ÈÜXÚYšXØ[Y[H\ˆ›ÝYÙÙ\™H[˜Y™šXÛÈ[™X[][YH˜[œÜÜ›ÝØÛÛ
•
HH[	Ô•ÛÛ›Û›ÝØÛÛ
•Ô
K—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÔ
[˜[ZXÈÜÝÛÛ™šYÝ\˜][Ûˆ›ÝØÛÛ
JŠˆšY[™H][^ž˜]È\ˆ\ÜÙYÛ˜\™H[™\š^žšHT[˜[ZXÚHZH\ÜÜÚ]]šHÝH[˜H™]NÈ›ÛˆÚYœ˜H[˜Y™šXÛÈ›ØØ[K—ˆ
ˆ
ŠŠHT”
Y™\ÜÈ™\ÛÛ][Ûˆ›ÝØÛÛ
JŠˆšY[™H][^ž˜]È\ˆX\\™H[ˆ[™\š^ž›ÈTHÌˆš]H[ˆ[™\š^ž›ÈPPÈ[	Ú[\››ÈH[˜H™]HØØ[K›Ûˆ\ˆÚYœ˜\™H[˜Y™šXÛÈ›ØØ[K—ˆ
ˆ
Š‘
HPÓT
[\›™]ÛÛ›ÛY\ÜØYÙH›ÝØÛÛ
JŠˆšY[™H][^ž˜]Èš[˜Ú\[Y[HZHÚ\Ý[ZHÜ\˜]]šHZHÛÛ\]\ˆ[ˆ™]H\ˆ[šX\™HY\ÜØYÙÚHH\œ›Ü™KY\Ù[\[È]X[™È[ˆÙ\š^š[ÈšXÚY\ÝÈ›Ûˆ0ê\ÜÛšXš[NÈ›ÛˆÙ\Ý\ØÙHHÚYœ˜]\˜H›ØØ[K——Šˆ
Š”XØÛÛÈ\Ù[\[ÈÛÛ˜Ù[˜]ÎŠŠˆØY™YÝX\™Þ\Ý[\È[\[Y[H	ÔÔ•Ý[›Üš[ÈÚ\Ý[XH›ÒT^šY[™[H[ˆ[ÙÈÚH]HHÚX[X]H›ØØ[H˜HHÙYHÙ[˜[HHHš[X[H™[[ÝHÚX[›ÈÚYœ˜]H[™]ËY[™[\Y[™È	Ú[\˜Ù]^š[Û™H[HÛÛ™\œØ^š[ÛšHš\Ù\˜]H\˜[H[˜[œÚ]ÈÝ[H™]Kˆ‚ˆKˆÂˆYˆŒˆÜXÎˆ”X›XÈÙ^H[™œ˜\ÝXÝ\™H‹ˆ]™[ˆSSTÒH‹ˆØÙ[˜\š[Îˆ•[‰Ø^šY[™HÙ\Ý\ØÙH[˜HÒH[\›˜HÚH[Y]HÙ\YšXØ]H\ˆÙ\™\‹Ü][HH”‹ˆHÚX]™Hš]˜]H[HÐH
Šœ˜YXÙJŠˆ0êÛÛœÙ\˜]HÝH[ˆÙ\™\ˆÙ[\™HXØÙ\ÛÈH˜YÙÚ][™ÚXš[H[H™]HH[[Z[š\Ý˜^š[Û™K\˜Ú0êHœÙ\™HÜ\ÜÛÈ\ˆ[Y]\™H[ÝšHÙ\YšXØ]W‹ˆ[ˆ™]š\ÛÜ™HÙYÛ˜[HHÛÛ™šYÝ\˜^š[Û™HÛÛYH[š\ØÚ[ÈpîHÜ˜]™H[	Ú[\˜H[™œ˜\Ý]\˜Kˆ‹ˆ]Y\Ý[ÛŽˆ”\˜Ú0êHHÛÛ\›ÛZ\ÜÚ[Û™H[HÐH˜YXÙH0êpîHÜ˜]™HH]X[[œ]YH[˜KHÛÛYHÚH™]šY[™OÈ‹ˆÜ[ÛœÎˆÂˆJH\˜Ú0êHÙÛšHÙ\YšXØ]È[Y\ÜÛÈ]™[H[˜Y™šYXš[NˆH˜YXÙH˜H[]HÙ™›[™HY[Y]\™H˜[Z]HÐH[\›YYYH‹ˆŠH\˜Ú0êHHÙ\YšXØ]HÚpè[Y\ÜÚHØØY™X˜™\›ÈÝXš]Îˆ˜\ÝH[[™Ø\›™HH˜[Y]0èHÚ[œ]YH[›šH‹ˆÊH\˜Ú0êHH\ÝHH™]›ØØH›ÛˆØ\™X˜™HpîH˜YÙÚ][™ÚXš[Nˆ˜\ÝHX˜›XØ\›HÝH[ˆÙXÛÛ™ÈÙ\™\ˆ‹ˆ‘
H\˜Ú0êH[˜Y™šXÛÈÈ™\Ý\™X˜™H[ˆÚX\›Îˆ˜\ÝH[\Üœ™HÈKŒÈÝH]HHÙ\™\ˆ[\›šH‚ˆKˆ[œÝÙ\’[™^ˆˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠJHÙÛšHÙ\YšXØ]È[Y\ÜÛÈ]™[H[˜Y™šYXš[NˆH˜YXÙH˜H[]HÙ™›[™JŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÐH˜YXÙH0êH
Šœ˜YXÙHHšYXÚXJŠˆ

œ›ÛÝÙˆ\Ý
ŠH[	Ú[\˜HÒNˆ]ÈÚpìˆÚHšHÚH\ÙÙÚXH0êY™šYXš[H
Šœ\˜Ú0êJŠˆ\ØÙ[™HHZKH›Ûˆ\Ú\ÝH[H[HÛÜ˜HÚHÜÜØHØ\˜[\™H[Ý[ÈÜÝËˆÙHHÝXHÚX]™Hš]˜]HšY[™HX˜]K	Ø]XØØ[Hpìˆ[Y]\™HÙ\YšXØ]H˜[YH\ˆ]X[[œ]YH›ÛYKHÙÛšHÚ\Ý[XHÚHÚHšYHH]Y[H˜YXÙHHXØÙ]\°èˆ›ÛˆÉðê[ÙÈH\Ý[™ÝY\›HH]Y[HYÚ][ZKˆYÙÚ[È[˜ÛÜ˜K[š[YY[È›Ûˆ0êÚ\\™ÚXÛÈÛÛYH[˜H™]›ØØHÜ™[˜\šXNˆš\ÛÙÛ˜Hš[][Ý™\™HH˜YXÙH[	Ø\˜Ú]š[ÈHšYXÚXHH
Š›ÙÛšJŠˆ\ÜÜÚ]]›ËÙ[™\˜\›™H[˜H[Ý˜HHšY[Y]\™H
Š]JŠˆHÙ\YšXØ]H\Ú\Ý[KˆH™]™[žš[Û™H0êHÛÛœÙYÝY[ž˜H\˜Ú]]\˜[HHÚHšX\ÜÝ[YH[ˆ[˜Hœ˜\ÙNˆH˜YXÙH
Š››Ûˆ]™HÝ\™HÛ›[™JŠ‹ˆHÚHY[™HÜ[HHš\ÚXØ[Y[HÝ\ÝÙ]K\XØ[Y[HÛÛˆHÚX]™H[ˆ[ˆÓHH	ØXØÙ\ÜÛÈÛÝÜÜÝÈHÛÛ›ÛÈHpîH\œÛÛ™NÈHÚHXØÙ[™HÛÛ[È\ˆš\›X\™HH
ŠÐH[\›YYYJŠŽÈHÛÛ›È]Y\ÝKÛÜÝ]ZXš[HH™]›ØØXš[KH[Y]\™HHÙ\YšXØ]HH]HHÚ[Ü›šK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠŠHØØY[ž˜HZHÙ\YšXØ]NŠŠˆ[˜HÛÛ\›ÛZ\ÜÚ[Û™H›Ûˆ˜HØØY\™H[KH[[™Ø\™HH˜[Y]0èYÙÚ[Ü™\™X˜™HHÚ]X^š[Û™Nˆ[ˆÙ\YšXØ]È˜[ÚYšXØ]È™\Ý\™X˜™H][^ž˜Xš[HpîHH[™ÛËˆH[™[ž˜H™X[H˜H™[H\™^š[Û™HÜÜÝK™\œÛÈ\˜]Hœ™]šHHš[››Ý›È]]ÛX]XÛË—ˆ
ˆ
ŠÊH\ÝHH™]›ØØH›Ûˆ˜YÙÚ][™ÚXš[NŠŠˆÛÛ™›Û™HH
Š™\ÜÛšXš[]0è
Šˆ[Ù\š^š[ÈH™]›ØØHÛÛˆH
Š™šYXÚXJŠ‹ˆ[›Ø›[XH›Ûˆ0êÚHH™]›ØØH›ÛˆÚHÜÜØHÛÛœÝ[\™Nˆ0êÚH›ÛˆÚHØ\™X˜™H
Š˜ÛÜØJŠˆ™]›ØØ\™K\˜Ú0êHHÙ\YšXØ]H˜[ÚHÛÛ›È[™\Ý[™ÝZXš[HZH™\šKH™]›ØØ\™HH˜YXÙH[˜[Y\™X˜™H]Ë—ˆ
ˆ
Š‘
HÈ[ˆÚX\›ÎŠŠˆ›ÛˆÉðê[Ý[ˆ˜\ÜËˆ[˜HÐHÛÛ\›ÛY\ÜØH›Ûˆ\Ø]]˜HHÚYœ˜]\˜NˆÛÛœÙ[HH
Šš[\\œÛÛ˜\™JŠˆHÙ\™\‹Ú[ðêH™\Ù[\œÚHÛÛYHÜ›ÈÛÛˆ[ˆÙ\YšXØ]ÈÚH[ÛY[XØÙ]Kˆ[˜Y™šXÛÈ™\ÝHÚYœ˜]ËXH™\œÛÈ	Ø]XØØ[K——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆšXÛÜ™HHÝ]\˜HÙ\˜\˜ÚXØHHH˜YÚ[Û™H\ˆÝZH\Ú\ÝKˆ
Š”˜YXÙJŠˆH]]Ùš\›X]KÙ™›[™Kš\›XHÛÛ[ÈH[\›YYYH0­È
Š’[\›YYYJŠˆHÛ›[™Kš\›X[›ÈHÙ\YšXØ]Hš[˜[KHÙHÛÛ\›ÛY\ÜÙHÚH™]›ØØ[›ÈÙ[ž˜H˜]›ÛÙ\™H	Ú[™œ˜\Ý]\˜H0­È
ŠÙ\YšXØ]Hš[˜[JŠˆHÙ\™\ˆH][Kˆ]Y\ÝHÙ\\˜^š[Û™HH[ˆ›ÛYK
ŠÐHÙ™›[™JŠ‹Y0êHš\ÜÜÝHÛÜœ™]HÙÛšH›ÛHÚH[˜HÛX[™HÚYYHÛÛYH›ÝYÙÙ\™HH˜YXÙHHšYXÚXKˆšXÛÜ™H[™š[™H[š[˜Ú\[ÈÙ[™\˜[Nˆ[ˆ[˜HØ][˜HHšYXÚXKHÛÛ\›ÛZ\ÜÚ[Û™HH[ˆ[™[È[˜[YH
Š]ÈÚpìˆÚHÝHÛÝÊŠ‹XZHÚpìˆÚHÝHÛÜ˜Kˆ‚ˆKˆÂˆYˆŒKˆÜXÎˆÜž\ÙÜ˜\H‹ˆ]™[ˆTPÐV’SÓ‘H‹ˆØÙ[˜\š[Îˆ•[ˆ]X˜\ÙHÜÜ]H[‰Ý[šXØHX™[HÛY[H[ˆÝZKœ˜HXÚ[™HHÛÛÛ›™HÜ™[˜\šYK™HÛÛ[™ÛÛ›È]HHYØ[Y[Ëˆ	Ø^šY[™HHÚpèHÚYœ˜]\˜H[YÜ˜[H[\ØÛÈÝH]HHÙ\™\‹ˆ	Ø]Y]ÜˆÜÜÙ\˜HÚH]Y\ÝÈ›Ûˆ˜\ÝNˆÚYYHÚHH™HØ[\HÙ[œÚXš[H™\Ý[›ÈÚYœ˜]H[˜ÚH\ˆ[ˆ[[Z[š\Ý˜]Ü™HH]X˜\ÙHÚH[\œ›ÙÚHYÚ][X[Y[HHX™[KHÚHH[™HÛÛÛ›™H™\Ý[›ÈYÙÚXš[HH[™XÚ^ž˜Xš[HÙ[ž˜H[˜[^ž˜\™HH™\Ý^š[ÛšKˆ‹ˆ]Y\Ý[ÛŽˆ”]X[H]™[ÈHÚYœ˜]\˜HÛÙ\Ù˜H]Y\ÝHšXÚY\ÝOÈ‹ˆÜ[ÛœÎˆÂˆJHÚYœ˜]\˜HH›Û[YK\Ý\ØHH]HH[š]0èÙÚXÚHÚHÜÜ][›È[]X˜\ÙH‹ˆŠHÚYœ˜]\˜HH]™[ÈH™XÛÜ™ÈHØ[\Ë\XØ]H[HÛÛH™HÛÛÛ›™HÙ[œÚXš[H‹ˆÊHÚYœ˜]\˜HH\^š[Û™K\XØ]H[H\^š[Û™HÚHÛÛY[™HHš[HH]H‹ˆ‘
HÚYœ˜]\˜H[˜\ÜÜÈÛÛˆÈœ˜H[ÛY[\XØ]]›ÈH[Ù\™\ˆH]X˜\ÙH‚ˆKˆ[œÝÙ\’[™^ˆKˆ^[˜][ÛŽˆ“Hš\ÜÜÝHÛÜœ™]H0êH
ŠŠHÚYœ˜]\˜HH]™[ÈH™XÛÜ™ÈHØ[\ÊŠ‹——Šˆ
Š”\˜Ú0êH0êHÛÜœ™]NŠŠˆHÚX]™H\ˆš\ÜÛ™\™HÝH™[Ø\\™H
Š˜ÛÛ›È]X[HZ[˜XØÚXJŠˆÚX\ØÝ[ˆ]™[È›ÝYÙÙHKÛÜ˜]]Ë
Š™Ý™HÚH›Ý˜HHÚX]™JŠˆÚHš[Y]H[]È[ˆÚX\›ËˆH
Š˜ÚYœ˜]\˜H[YÜ˜[H[\ØÛÊŠ‹Úpè™\Ù[K›ÝYÙÙHH]H
Š˜Hš\ÜÛÊŠˆÛÛ›È[\Èš\ÚXÛÈ[Ù\™\ˆÈ[\ØÛÎˆHXXØÚ[˜HXØÙ\ØH[›Û[YH0ê[Û]ÈHXÚYœ˜]È[ˆ[ÙÈ˜\Ü\™[KH[
Š‘“TÈ[ˆ\ÙXÝ^š[Û™HYÙÙH›Ü›X[Y[JŠˆH]KÚH]Z[™H\œš]˜[›È[ˆÚX\›ÈHÚHHH\›Y\ÜÚH\ˆ[\œ›ÙØ\™HHX™[Kˆ0â\Ø][Y[H\ˆ]Y\ÝÈÚH	Ø]Y]ÜˆXÙHÚH›Ûˆ˜\ÝKˆH
Š˜ÚYœ˜]\˜HH]™[ÈH™XÛÜ™ÈHØ[\ÊŠˆYÚ\ØÙH[™XÙHÝ[Ú[™ÛÛÈ]ÎˆH™HÛÛÛ›™H™\Ý[›ÈÚYœ˜]H
Š™[›ÊŠˆ[]X˜\ÙK—Šˆ
Š“HÛÛ™^š[Û™HÚH™[™HY™šXØXÙHHÛÛ^š[Û™NŠŠˆ›ÝYÙÙ\™H[]È
Š™[JŠˆ›Ûˆ\[™H[HÛÛHÜ˜[[\š]0èXH[˜]ÈÚHH
Š˜ÚX]™H™\ÝH[ÜšH[Ý[ÈÛÛ›ÛÊŠ‹\XØ[Y[HÝ\ÝÙ]H[	Ø\XØ^š[Û™HÈ[ˆ[ˆÓTËÒÓKÛÛˆXÚYœ˜]\˜HÛÛÈ\ˆÛH][H]]Üš^ž˜]KˆÙHHÚX]™H›ÜÜÙHÙ\Ý]H[]X˜\ÙHÝ\ÜÛË	Ø[[Z[š\Ý˜]Ü™HÝ™X˜™H\Ø\›HHHÚYœ˜]\˜HHÛÛÛ›˜H›ÛˆÈ™\›Y\™X˜™K—Šˆ
Š’[ÛÜÝËÚH\Ú\ÝNŠŠˆÚYœ˜\™H™HÛÛÛ›™HH[ˆ™^ž›ËˆÝH]YZHØ[\HÚH\™Û›ÈH›Ü›XHšXÙ\˜ÚHH[™XÚNˆ[˜HšXÙ\˜ØH\ˆYÝXYÛX[ž˜HšXÚYY\™X˜™HÚYœ˜]\˜H]\›Z[š\ÝXØKÚHHÝXH›ÛH\ÜÛ™HØÚ[ZHšXÛÜœ™[KHHšXÙ\˜ÚH\ˆ[\˜[È]™[[›È[\˜]XØXš[Kˆ[™\]Z\Ú]È[	Ø]Y]Üˆ™\ÝHÛÛ][œ]YHÛÙ\Ù˜]È\˜Ú0êHH
Š˜[™HÛÛÛ›™H›ÛˆÛÛ›ÈÚYœ˜]JŠˆH™\Ý[›È[™XÚ^ž˜Xš[HHšXÙ\˜ØXš[HÛÛYHš[XK—Šˆ
Š[˜[\ÚHZH\Ý˜]ÜšNŠŠ—ˆ
ˆ
ŠJHÚYœ˜]\˜HH›Û[YNŠŠˆ›ÝYÙÙH	Ú[\˜H[š]0èÙÚXØHHš\ÜÛËXHHÚ\Ý[XH]šX]È[›Û[YH0ê[Û]ÈHXÚYœ˜]Îˆ[“TÈÛÛ[XHHYÙÙ\™H]Ë]Z[™H›ÛˆÜÛ™H[HHÚH[\œ›ÙØHYÚ][X[Y[HHX™[K—ˆ
ˆ
ŠÊHÚYœ˜]\˜HH\^š[Û™NŠŠˆØ[XšXHÛÛ[È
Šœ]X[H\™XJŠˆ[\ØÛÈ0ê›Ý]HHš\ÜÛËˆ›ÛˆØØØH[[ÙÈ[ˆÝZHÚHXØÙYH[HX™[HKÛÛYHHK\ØÙHHØÙ[˜H\[˜H[Ú\Ý[XH0ê]šX]Ë—ˆ
ˆ
Š‘
HÈœ˜HÛY[H]X˜\ÙNŠŠˆ›ÝYÙÙHH]H
Šš[ˆ˜[œÚ]ÊŠˆ[	Ú[\˜Ù]^š[Û™H[™ÛÈ[\˜ÛÜœÛËˆ[]ÈšY[™HXÚYœ˜]È[	Ù\Ý™[Z]0èˆ	Ø[[Z[š\Ý˜]Ü™HÚH[\œ›ÙØH[]X˜\ÙHÈšXÙ]™H[ˆÚX\›È\Ø][Y[HÛÛYHš[XK——Šˆ
Š•˜\ÛH	Ù\Ø[YNŠŠˆ[\\˜HHØØ[HZH]™[HHÚYœ˜]\˜H[pîH[\[È[pîHÙ[]]›Ëˆ
Š‘\ØÛÈ[\›ÊŠ‹
Š›Û[YJŠˆH
Šœ\^š[Û™JŠˆH›Ý^š[Û™HÛÛ›È[\Èš\ÚXÛËXÚYœ˜]\˜H˜\Ü\™[HHÚ\Ý[XH]šX]È0­È
Š‘š[JŠˆH›Ý^š[Û™H[Ú[™ÛÛÈØÝ[Y[Ë[˜ÚHH[šH][H[HÝ\ÜØHXXØÚ[˜H0­È
Š‘]X˜\ÙJŠˆH	Ú[\›È\˜Ú]š[ÈÚYœ˜]ÈHš\ÜÛËXHYÙÚXš[HHÚHšHXØÙYH0­È
Š”™XÛÜ™ÈØ[\ÊŠˆHHÜ˜[[\š]0èpîHš[™K]Y[HÚHpìˆ›ÝYÙÙ\™H[]È[˜ÚHHÚHHXØÙ\ÜÛÈYÚ][[È[Ú\Ý[XK
Š˜HÛÛ™^š[Û™HÚHHÚX]™HÚXH[ÜšH[HÝXHÜ]JŠ‹ˆ]X[™ÈÈØÙ[˜\š[ÈXÙHÚHHÚYœ˜]\˜H[\ØÛÈ0ªÛ›Ûˆ˜\Ýp®ÈH›ÛZ[˜H[ˆ[[Z[š\Ý˜]Ü™KÝX\™H[HÜ˜[[\š]0èš[™NˆÚYœ˜]\˜HHØ[\ËXH[˜ÚH
ŠÚÙ[š^ž˜^š[Û™JŠˆÈ
Š›X\ÚÚ[™ÊŠˆš\ÜÛ™Û›È[ÈÝ\ÜÛÈš\ÛÙÛ›È[ˆØÙ[˜\šH]™\œÚKˆ‚ˆB—NÂ‚™^ÜÛÛœÝS’UPSÔUQTÕSÓ”Îˆ]Y\Ý[Û–×HHË‹‹‘ÓPRS—ÌWÔUQTÕSÓ”Ë‹‹‘ÓPRS—Ì—ÔUQTÕSÓ”Ë‹‹‘ÓPRS—Ì×ÔUQTÕSÓ”Ë‹‹‘ÓPRS—ÍÔUQTÕSÓ”Ë‹‹‘ÓPRS—ÍWÔUQTÕSÓ”×NÂ