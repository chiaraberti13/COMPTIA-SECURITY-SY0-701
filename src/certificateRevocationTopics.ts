import type { TopicGroup } from "./types";

/**
 * Standalone Domain 1.4 glossary entries for certificate status and trust.
 * RFC references are included so the study text points to the protocol source.
 */
export const CERTIFICATE_REVOCATION_TOPICS_IT: TopicGroup[] = [
  {
    title: "Certificati digitali e fiducia",
    description: "Revoca, stato e modelli di fiducia della PKI (obiettivo 1.4).",
    icon: "ShieldCheck",
    subtopics: [
      {
        name: "Certificate Revocation List (CRL)",
        checklistKey: "CertificateRevocationCRL",
        definition: "Una CRL è un elenco firmato dall'autorità di certificazione (CA) che identifica i certificati revocati prima della scadenza.",
        details: "Il verificatore controlla l'elenco pubblicato dalla CA e cerca il numero seriale del certificato. Le CRL sono aggiornate a intervalli, quindi possono non riflettere subito una revoca; dimensione, distribuzione e disponibilità dell'elenco influenzano la verifica. La CRL non sostituisce il controllo della catena, della scadenza o del nome. Fonte: RFC 5280, sezioni 5.1 e 6.",
        examTip: "CRL significa elenco: il client scarica o consulta un insieme di revoche, che può essere meno aggiornato di una risposta OCSP.",
      },
      {
        name: "Online Certificate Status Protocol (OCSP)",
        checklistKey: "CertificateRevocationOCSP",
        definition: "OCSP consente di chiedere a un responder lo stato di revoca di un singolo certificato.",
        details: "La risposta firmata indica good, revoked oppure unknown. good significa che il responder non ha un'indicazione di revoca per quel certificato al momento della risposta; non dimostra da sola che il certificato sia stato emesso, che la catena termini in un trust anchor accettato, che il certificato non sia scaduto o che il nome richiesto corrisponda. Controllare anche firma e freschezza della risposta. Fonte: RFC 6960, sezioni 2.2 e 4.2.",
        examTip: "OCSP good non equivale a «certificato valido»: completa comunque la validazione della catena, delle date e dell'identità del server.",
      },
      {
        name: "OCSP stapling",
        checklistKey: "CertificateRevocationStapling",
        definition: "Con OCSP stapling, il server presenta durante l'handshake TLS una risposta OCSP firmata e ancora valida, ottenuta in precedenza dal responder.",
        details: "Il client può verificare lo stato senza inviare direttamente una richiesta OCSP alla CA per ogni connessione; questo riduce l'esposizione delle destinazioni consultate e la dipendenza dalla raggiungibilità del responder nel momento dell'handshake. Il client deve comunque verificare firma e intervallo di validità della risposta. Stapling migliora la distribuzione del risultato OCSP: non sostituisce la validazione TLS del certificato. Fonti: RFC 6960 e RFC 6066, sezione 8.",
        examTip: "Il server allega la risposta OCSP nel flusso TLS; il client resta responsabile di verificare la risposta e il certificato.",
      },
      {
        name: "Certificato autofirmato (self-signed certificate)",
        checklistKey: "SelfSignedCertificateTrust",
        definition: "Un certificato autofirmato è firmato con la chiave privata corrispondente alla chiave pubblica contenuta nel certificato, senza una CA distinta che lo firmi.",
        details: "Firmare il certificato con la propria chiave non rende di per sé debole la crittografia, ma non fornisce automaticamente una catena verificata da una terza parte. Un certificato autofirmato può essere accettato se la chiave o il certificato viene distribuito e configurato come trust anchor tramite un canale affidabile. Una CA interna può invece firmare certificati di server e deve essere distribuita come attendibile ai client. Scadenza, uso previsto e corrispondenza del nome/SAN restano verifiche separate. Riferimenti: RFC 5280, sezioni 6.1 e 6.2.",
        examTip: "Distingui integrità della firma e fiducia: una firma corretta dimostra coerenza crittografica, non che un emittente sconosciuto sia attendibile.",
      },
    ],
  },
];

export const CERTIFICATE_REVOCATION_TOPICS_EN: TopicGroup[] = [
  {
    title: "Digital certificates and trust",
    description: "PKI revocation, status, and trust models (objective 1.4).",
    icon: "ShieldCheck",
    subtopics: [
      {
        name: "Certificate Revocation List (CRL)",
        checklistKey: "CertificateRevocationCRL",
        definition: "A CRL is a CA-signed list that identifies certificates revoked before their expiration.",
        details: "The verifier checks the list published by the certificate authority (CA) and looks for the certificate serial number. CRLs are updated periodically, so they may not reflect a revocation immediately; list size, distribution, and availability affect checking. A CRL does not replace chain, expiration, or name validation. Source: RFC 5280, sections 5.1 and 6.",
        examTip: "CRL means a list: the client downloads or checks a set of revocations, which may be less current than an OCSP response.",
      },
      {
        name: "Online Certificate Status Protocol (OCSP)",
        checklistKey: "CertificateRevocationOCSP",
        definition: "OCSP lets a client ask a responder for the revocation status of an individual certificate.",
        details: "The signed response reports good, revoked, or unknown. good means the responder has no indication that the certificate is revoked at the time of the response; by itself, it does not prove that the certificate was issued, that its chain ends at an accepted trust anchor, that it is unexpired, or that its name matches the requested server. Also check the response signature and freshness. Source: RFC 6960, sections 2.2 and 4.2.",
        examTip: "OCSP good does not mean \"the certificate is valid\": still validate the chain, dates, and server identity.",
      },
      {
        name: "OCSP stapling",
        checklistKey: "CertificateRevocationStapling",
        definition: "With OCSP stapling, the server presents a signed, still-valid OCSP response during the TLS handshake after obtaining it from the responder.",
        details: "The client can check status without sending an OCSP request directly to the CA for every connection, reducing exposure of visited destinations and dependence on responder reachability during the handshake. The client must still verify the response signature and validity interval. Stapling improves delivery of an OCSP result; it does not replace TLS certificate validation. Sources: RFC 6960 and RFC 6066, section 8.",
        examTip: "The server attaches the OCSP response in the TLS flow; the client still verifies the response and certificate.",
      },
      {
        name: "Self-signed certificate",
        checklistKey: "SelfSignedCertificateTrust",
        definition: "A self-signed certificate is signed with the private key corresponding to the public key in the certificate, without a separate CA signing it.",
        details: "Self-signing does not by itself make the cryptography weak, but it does not automatically provide a chain verified by a third party. A self-signed certificate can be accepted when the certificate or key is distributed and configured as a trust anchor through a trusted channel. An internal CA can instead sign server certificates and must itself be distributed as trusted to clients. Expiration, intended use, and name/SAN matching remain separate checks. References: RFC 5280, sections 6.1 and 6.2.",
        examTip: "Separate signature integrity from trust: a valid signature proves cryptographic consistency, not that an unknown issuer is trusted.",
      },
    ],
  },
];
