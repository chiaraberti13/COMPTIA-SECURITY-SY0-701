import type { Question } from "./types";
import type { QuestionOverride } from "./data.en";

/** Original practice questions for Roadmap task 28. */
export const DOMAIN_1_ATTACK_QUESTIONS: Question[] = [
  {
    id: 9005, topic: "Cryptography", level: "APPLICAZIONE",
    scenario: "Un team vuole nascondere una breve nota dentro un'immagine allegata, così che un osservatore non si accorga subito che esiste un messaggio.",
    question: "Quale tecnica corrisponde meglio all'obiettivo, e quale limite va ricordato?",
    options: ["Steganografia: nasconde la presenza del messaggio, ma da sola non ne cifra il contenuto", "Hashing: nasconde e permette di recuperare il messaggio originale", "Cifratura: rende invisibile il fatto che esista un messaggio", "Tokenizzazione: garantisce autenticità dell'immagine"],
    answerIndex: 0,
    explanation: "La steganografia inserisce un messaggio in un contenitore per celarne la presenza. Non fornisce automaticamente riservatezza, integrità o autenticità; cifrare il contenuto prima di occultarlo può aggiungere riservatezza. L'hash non è reversibile, la cifratura non nasconde necessariamente l'esistenza del dato e la tokenizzazione sostituisce valori."
  },
  {
    id: 9006, topic: "Zero Trust Architecture", level: "APPLICAZIONE",
    scenario: "In una rete Zero Trust, il Policy Engine ha deciso che una sessione può proseguire. Un componente deve configurare il canale e coordinare l'applicazione di quella decisione.",
    question: "Quale componente svolge questo ruolo di coordinamento?",
    options: ["Policy Administrator (PA)", "Policy Engine (PE)", "Policy Enforcement Point (PEP)", "Identity provider"],
    answerIndex: 0,
    explanation: "Il Policy Administrator coordina l'istituzione o la cessazione del percorso di comunicazione sulla base della decisione del Policy Engine. Il PE decide, il PEP applica il controllo al traffico, mentre l'identity provider fornisce i dati d'identità e non sostituisce questi ruoli."
  },
  {
    id: 9007, topic: "Cryptography", level: "ANALISI",
    scenario: "Due endpoint concordano chiavi effimere per derivare un segreto di sessione. In seguito viene compromessa la chiave privata a lungo termine usata per autenticare le sessioni.",
    question: "Quale proprietà può limitare l'esposizione delle sessioni passate, se sono state usate chiavi effimere e i segreti temporanei sono stati cancellati?",
    options: ["Forward secrecy", "Steganografia", "Hash collision resistance", "Key escrow"],
    answerIndex: 0,
    explanation: "La forward secrecy limita la possibilità di ricostruire chiavi di sessioni passate dalla sola compromissione successiva della chiave privata a lungo termine, quando il protocollo usa accordo effimero e i segreti di sessione non sono conservati. Non protegge endpoint compromessi o dati già acquisiti; steganografia nasconde la presenza, collision resistance riguarda gli hash e key escrow conserva chiavi per recupero."
  }
];

export const DOMAIN_2_ATTACK_QUESTIONS: Question[] = [
  {
    id: 9010, topic: "Vulnerability Types", level: "APPLICAZIONE",
    scenario: "Una pagina mostra subito, senza conservarla, una stringa inserita in un parametro URL. Un input appositamente costruito viene interpretato come markup attivo nel browser.",
    question: "Quale variante di XSS descrive meglio questo flusso?",
    options: ["Reflected XSS", "Stored XSS", "CSRF", "SSRF"],
    answerIndex: 0,
    explanation: "Il contenuto torna nella risposta immediata alla richiesta e non viene conservato: è reflected XSS. Stored XSS persiste in una risorsa poi visualizzata da altri utenti. CSRF induce il browser autenticato a inviare un'azione, mentre SSRF induce il server a effettuare una richiesta."
  },
  {
    id: 9011, topic: "Vulnerability Types", level: "APPLICAZIONE",
    scenario: "Un sito accetta cookie di sessione. In un caso un attaccante induce il browser di una vittima autenticata a inviare una richiesta di modifica; in un altro sfrutta il server per raggiungere un servizio interno.",
    question: "Quale associazione distingue correttamente i due attacchi?",
    options: ["La richiesta dal browser autenticato è CSRF; la richiesta avviata dal server verso il servizio è SSRF", "La prima è SSRF; la seconda è CSRF", "Entrambe sono XSS stored", "Entrambe sono furto di sessione"],
    answerIndex: 0,
    explanation: "CSRF sfrutta il contesto di fiducia del browser e le credenziali inviate automaticamente; SSRF sfrutta la capacità del server di effettuare richieste verso destinazioni non previste. XSS riguarda l'esecuzione di script nel browser. Furto di sessione è l'acquisizione o il riuso di un identificatore di sessione, non la distinzione descritta."
  },
  {
    id: 9012, topic: "Threat Vectors & Attack Surfaces", level: "ANALISI",
    scenario: "Un aggressore ottiene l'identificatore di sessione valido di un utente e lo presenta al server da un altro dispositivo.",
    question: "Quale affermazione descrive correttamente il rischio e una risposta difensiva?",
    options: ["È session hijacking; revocare o ruotare la sessione può invalidare l'identificatore, mentre MFA al solo login non annulla una sessione già rubata", "È solo password spraying; cambiare la password rende sempre inutilizzabile ogni cookie", "È DNS poisoning; DNSSEC revoca l'identificatore", "È CSRF; SameSite garantisce che una sessione copiata non sia riutilizzabile"],
    answerIndex: 0,
    explanation: "Un identificatore di sessione sottratto può consentire di assumere la sessione autenticata. Revoca, scadenza e rotazione dell'identificatore sono pertinenti; MFA al login protegge l'autenticazione iniziale, ma da sola non invalida una sessione già attiva. Le altre opzioni confondono attacchi distinti o danno a DNSSEC/SameSite garanzie che non offrono."
  },
  {
    id: 9013, topic: "Threat Vectors & Attack Surfaces", level: "APPLICAZIONE",
    scenario: "Un aggressore accede all'account del registrar di un'azienda e modifica i name server del dominio. Le risposte DNS risultano formalmente coerenti con la nuova delega.",
    question: "Qual è la causa primaria e quale limite di DNSSEC è rilevante?",
    options: ["Domain hijacking tramite account registrar compromesso; DNSSEC non impedisce a un account autorizzato compromesso di cambiare la delega", "Typosquatting; DNSSEC impedisce qualsiasi modifica del registrar", "DNS cache poisoning; DNSSEC impedisce la compromissione dell'account", "DDoS; DNSSEC ripristina automaticamente i name server originali"],
    answerIndex: 0,
    explanation: "Il controllo del dominio è stato sottratto modificando la delega dal registrar: è domain hijacking. DNSSEC autentica dati DNS firmati e può rilevare alterazioni non autorizzate delle risposte, ma non impedisce a un attore che controlla l'account registrar di modificare legittimamente la delega o i dati di firma. Typosquatting registra un dominio simile."
  },
  {
    id: 9014, topic: "Threat Vectors & Attack Surfaces", level: "COMPRENSIONE",
    scenario: "Durante una chiamata, una persona con un pretesto credibile pone domande mirate e raccoglie dettagli interni; in seguito usa dati d'identità sottratti per aprire un account a nome della vittima.",
    question: "Quale distinzione è corretta?",
    options: ["La raccolta di informazioni durante una conversazione è elicitation; l'uso dei dati per fingersi la vittima è identity fraud", "La raccolta è identity fraud; l'apertura dell'account è elicitation", "Entrambi sono sinonimi di pretexting", "L'elicitation richiede sempre una compromissione tecnica"],
    answerIndex: 0,
    explanation: "Elicitation indica l'ottenimento di informazioni durante una conversazione; identity fraud è l'abuso dei dati altrui per agire sotto falsa identità. Un pretext può sostenere la conversazione, ma le tecniche non sono sinonimi né fasi obbligatorie. L'elicitation può avvenire senza exploit tecnico."
  }
];

export const DOMAIN_1_ATTACK_QUESTION_EN: Record<number, QuestionOverride> = {
  9005: {
    topic: "Cryptography",
    scenario: "A team wants to hide a short note inside an attached image so an observer does not immediately notice that a message exists.",
    question: "Which technique best fits the goal, and what limitation should be remembered?",
    options: ["Steganography: it hides the message's presence but does not encrypt its content by itself", "Hashing: it hides and lets the original message be recovered", "Encryption: it makes the existence of a message invisible", "Tokenization: it guarantees the image's authenticity"],
    explanation: "Steganography embeds a message in a carrier to conceal its presence. It does not automatically provide confidentiality, integrity, or authenticity; encrypting the content before hiding it can add confidentiality. A hash is not reversible, encryption does not necessarily hide that data exists, and tokenization replaces values."
  },
  9006: {
    topic: "Zero Trust Architecture",
    scenario: "In a Zero Trust network, the Policy Engine has decided that a session may continue. A component must configure the channel and coordinate enforcement of that decision.",
    question: "Which component performs this coordination role?",
    options: ["Policy Administrator (PA)", "Policy Engine (PE)", "Policy Enforcement Point (PEP)", "Identity provider"],
    explanation: "The Policy Administrator coordinates establishing or terminating the communication path based on the Policy Engine's decision. The PE decides, the PEP enforces controls on traffic, and an identity provider supplies identity assertions without replacing these roles."
  },
  9007: {
    topic: "Cryptography",
    scenario: "Two endpoints agree on ephemeral keys to derive a session secret. The long-term private key used to authenticate sessions is compromised later.",
    question: "Which property can limit exposure of past sessions if ephemeral keys were used and temporary secrets were erased?",
    options: ["Forward secrecy", "Steganography", "Hash collision resistance", "Key escrow"],
    explanation: "Forward secrecy limits reconstruction of past session keys from a later compromise of the long-term private key when the protocol uses ephemeral agreement and session secrets were not retained. It does not protect compromised endpoints or data already captured; steganography hides presence, collision resistance concerns hashes, and key escrow retains keys for recovery."
  }
};

export const DOMAIN_2_ATTACK_QUESTION_EN: Record<number, QuestionOverride> = {
  9010: {
    topic: "Vulnerability Types",
    scenario: "A page immediately displays a string from a URL parameter without storing it. A crafted input is interpreted as active markup in the browser.",
    question: "Which XSS variant best describes this flow?",
    options: ["Reflected XSS", "Stored XSS", "CSRF", "SSRF"],
    explanation: "The content returns in the immediate response and is not persisted: this is reflected XSS. Stored XSS persists in a resource later viewed by other users. CSRF tricks an authenticated browser into sending an action, while SSRF causes the server to make a request."
  },
  9011: {
    topic: "Vulnerability Types",
    scenario: "A site accepts session cookies. In one case, an attacker tricks an authenticated victim's browser into sending a change request; in another, the attacker abuses the server to reach an internal service.",
    question: "Which association correctly distinguishes the two attacks?",
    options: ["The authenticated browser request is CSRF; the server-initiated request to the service is SSRF", "The first is SSRF; the second is CSRF", "Both are stored XSS", "Both are session theft"],
    explanation: "CSRF exploits the browser's trust context and automatically sent credentials; SSRF exploits the server's ability to make requests to unintended destinations. XSS concerns script execution in the browser. Session theft is acquisition or reuse of a session identifier, not the distinction described."
  },
  9012: {
    topic: "Threat Vectors & Attack Surfaces",
    scenario: "An attacker obtains a user's valid session identifier and presents it to the server from another device.",
    question: "Which statement correctly describes the risk and a defensive response?",
    options: ["This is session hijacking; revoking or rotating the session can invalidate the identifier, while login-only MFA does not cancel a session already stolen", "This is only password spraying; changing the password always makes every cookie unusable", "This is DNS poisoning; DNSSEC revokes the identifier", "This is CSRF; SameSite guarantees that a copied session cannot be reused"],
    explanation: "A stolen session identifier may let an attacker take over the authenticated session. Revocation, expiration, and identifier rotation are relevant; login MFA protects initial authentication but by itself does not invalidate an active session. The other choices confuse distinct attacks or attribute guarantees to DNSSEC/SameSite that they do not provide."
  },
  9013: {
    topic: "Threat Vectors & Attack Surfaces",
    scenario: "An attacker accesses a company's registrar account and changes the domain's name servers. DNS responses are now consistent with the new delegation.",
    question: "What is the primary cause, and which DNSSEC limitation matters?",
    options: ["Domain hijacking through a compromised registrar account; DNSSEC does not stop an authorized but compromised account from changing delegation", "Typosquatting; DNSSEC prevents any registrar changes", "DNS cache poisoning; DNSSEC prevents account compromise", "DDoS; DNSSEC automatically restores the original name servers"],
    explanation: "Control of the domain was taken by changing its registrar delegation: this is domain hijacking. DNSSEC authenticates signed DNS data and can detect unauthorized response tampering, but it does not stop an actor controlling the registrar account from legitimately changing delegation or signing data. Typosquatting registers a similar-looking domain."
  },
  9014: {
    topic: "Threat Vectors & Attack Surfaces",
    scenario: "During a call, someone using a convincing pretext asks targeted questions and gathers internal details; later, the person uses stolen identity data to open an account in the victim's name.",
    question: "Which distinction is correct?",
    options: ["Information gathering during a conversation is elicitation; using the data to impersonate the victim is identity fraud", "The gathering is identity fraud; opening the account is elicitation", "Both are synonyms for pretexting", "Elicitation always requires a technical compromise"],
    explanation: "Elicitation means obtaining information during a conversation; identity fraud is abusing another person's data to act under a false identity. A pretext can support the conversation, but these techniques are neither synonyms nor mandatory stages. Elicitation can happen without a technical exploit."
  }
};
