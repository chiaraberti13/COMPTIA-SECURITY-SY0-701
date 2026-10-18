import type { TopicGroup } from "./types";

export const EAP_METHOD_TOPICS: Record<"it" | "en", TopicGroup> = {
  it: {
    title: "Metodi di autenticazione EAP",
    description: "EAP-TLS, EAP-TTLS e PEAP differiscono per credenziali client e uso del tunnel TLS. Sono trasportati da 802.1X: per i ruoli supplicant, authenticator e authentication server consulta la voce 802.1X. La protezione dipende anche dal profilo, dalla validazione del server e dalla custodia delle chiavi.",
    icon: "network",
    subtopics: [
      {
        name: "EAP-TLS", checklistKey: "EAP-TLS",
        definition: "Extensible Authentication Protocol-Transport Layer Security (EAP-TLS): metodo EAP basato su TLS con autenticazione mediante certificati; il client dimostra il possesso della propria chiave privata e verifica il certificato del server.",
        details: "EAP-TLS stabilisce un tunnel TLS autenticato; normalmente il server presenta un certificato e il client autentica la propria identità con un certificato client. Un profilo gestito richiede CA attendibili e l'identità/nome server attesi; non permette all'utente di accettare un server sconosciuto. La chiave privata client resta custodita nel TPM o nell'enclave sicura del dispositivo, ove disponibili; l'esportazione è limitata e rinnovo e revoca sono pianificati. La sicurezza dipende anche da provisioning, PKI, implementazione e gestione degli endpoint, senza un ordine universale. Fonti: RFC 9190 (EAP-TLS 1.3); Microsoft Learn, requisiti dei certificati EAP-TLS/PEAP.\n\n**Piccolo Esempio Concentrato:** il portatile di Kestrelia usa un profilo aziendale, valida CA e nome RADIUS e conserva la chiave client nel TPM.",
        examTip: "Il certificato client prova il possesso della chiave; quello server autentica il server solo se catena CA e identità attesa sono validate. Un certificato server non è un secondo fattore dell'utente e la sua presenza non prova da sola che l'access point sia legittimo."
      },
      {
        name: "EAP-TTLS", checklistKey: "EAP-TTLS",
        definition: "Extensible Authentication Protocol-Tunneled Transport Layer Security (EAP-TTLS): metodo EAP che crea un tunnel TLS autenticato dal server e trasporta un metodo di autenticazione client, per esempio credenziali o un altro metodo EAP.",
        details: "Il client verifica certificato e identità del server prima di inviare il metodo interno nel tunnel; il metodo interno può essere password-based o basato su EAP e le opzioni dipendono da supplicant e server. Il certificato server non è un certificato client: il client può autenticarsi con il metodo interno senza presentare un certificato client. Il profilo deve indicare CA e nomi server consentiti e rifiutare certificati non verificati; usa un metodo interno robusto e controlli di accesso sulle credenziali. Fonti: RFC 5281 (EAP-TTLSv0); documentazione ufficiale dei profili di rete.\n\n**Piccolo Esempio Concentrato:** il profilo Kestrelia valida il nome RADIUS prima di inviare la password nel tunnel e rifiuta un certificato inatteso.",
        examTip: "Distingui il tunnel TLS esterno, che autentica il server se il certificato viene validato, dalle credenziali client inviate al suo interno. Il certificato server non è un secondo fattore dell'utente. Un tunnel non rende sicuro un metodo interno debole né autentica il server se il client accetta certificati arbitrari."
      },
      {
        name: "PEAP", checklistKey: "PEAP",
        definition: "Protected Extensible Authentication Protocol (PEAP): metodo che usa un tunnel TLS autenticato dal server per proteggere un metodo interno di autenticazione client, comunemente EAP-MSCHAPv2 o un altro metodo EAP supportato.",
        details: "Nella fase esterna il client deve validare catena CA e identità/nome server; il metodo interno autentica il client. Opzioni come PEAP-MSCHAPv2 o PEAP-EAP-TLS variano per piattaforma e configurazione. Il profilo distribuito centralmente definisce CA e server attesi, senza accettazione manuale di certificati inattesi. Se PEAP incapsula EAP-TLS, il metodo interno usa anche il certificato client: non generalizzare questa proprietà a ogni PEAP. Fonti: Microsoft Learn, requisiti dei certificati EAP-TLS/PEAP e impostazioni Wi-Fi Intune.\n\n**Piccolo Esempio Concentrato:** il profilo gestito Kestrelia accetta PEAP-MSCHAPv2 solo con il certificato e il nome RADIUS previsti.",
        examTip: "Un certificato server validato protegge il canale e identifica il server; non è di per sé MFA. Valuta separatamente metodo interno, credenziali client, profilo e gestione delle chiavi."
      }
    ]
  },
  en: {
    title: "EAP Authentication Methods",
    description: "EAP-TLS, EAP-TTLS, and PEAP differ in client credentials and how they use a TLS tunnel. They are carried by 802.1X: see the existing 802.1X entry for supplicant, authenticator, and authentication-server roles. Protection also depends on the profile, server validation, and key custody.",
    icon: "network",
    subtopics: [
      {
        name: "EAP-TLS", checklistKey: "EAP-TLS",
        definition: "Extensible Authentication Protocol-Transport Layer Security (EAP-TLS): a TLS-based EAP method using certificate authentication; the client proves possession of its private key and verifies the server certificate.",
        details: "EAP-TLS establishes an authenticated TLS tunnel; typically the server presents a certificate and the client authenticates its identity with a client certificate. Deploy a profile that requires trusted CAs and the expected server identity/name instead of letting users accept an unknown server. Protect the client private key in the device TPM or secure enclave where available, restrict export, and manage renewal and revocation. Security also depends on provisioning, PKI, implementation, and endpoint management, so there is no unconditional ranking. Sources: RFC 9190 (EAP-TLS 1.3); Microsoft Learn, EAP-TLS/PEAP certificate requirements.\n\n**Mini-Example:** Kestrelia's laptop uses a managed profile, validates the CA and RADIUS name, and keeps its client key in the TPM.",
        examTip: "The client certificate proves possession of the key; a server certificate authenticates the server only when its CA chain and expected identity are validated. A server certificate is not a second user factor and its mere presence does not prove the access point is legitimate."
      },
      {
        name: "EAP-TTLS", checklistKey: "EAP-TTLS",
        definition: "Extensible Authentication Protocol-Tunneled Transport Layer Security (EAP-TTLS): an EAP method that creates a server-authenticated TLS tunnel and carries a client authentication method inside, such as credentials or another EAP method.",
        details: "The client verifies the server certificate and identity before sending the inner method through the tunnel; the inner method can be password-based or EAP-based, and options depend on the supplicant and server. The server certificate is not a client certificate: the client may authenticate through the inner method without presenting a client certificate. Deploy a profile with trusted CAs and permitted server names, rejecting unverified certificates; choose a strong inner method and protect credentials. Sources: RFC 5281 (EAP-TTLSv0); official network-profile documentation.\n\n**Mini-Example:** the Kestrelia profile validates the RADIUS name before sending a password through the tunnel and rejects an unexpected certificate.",
        examTip: "Distinguish the outer TLS tunnel, which authenticates the server when its certificate is validated, from client credentials carried inside. A server certificate is not a second user factor. A tunnel does not make a weak inner method safe or authenticate the server if the client accepts arbitrary certificates."
      },
      {
        name: "PEAP", checklistKey: "PEAP",
        definition: "Protected Extensible Authentication Protocol (PEAP): a method that uses a server-authenticated TLS tunnel to protect an inner client authentication method, commonly EAP-MSCHAPv2 or another supported EAP method.",
        details: "In the outer phase the client must validate the CA chain and server identity/name; the inner method authenticates the client. Options such as PEAP-MSCHAPv2 or PEAP-EAP-TLS vary by platform and configuration. Centrally deploy a profile that selects trusted CAs and expected servers and prevents prompts to accept unexpected certificates. If PEAP encapsulates EAP-TLS, the inner method also uses a client certificate; do not generalize that property to every PEAP configuration. Sources: Microsoft Learn, EAP-TLS/PEAP certificate requirements and Intune Wi-Fi settings.\n\n**Mini-Example:** the managed Kestrelia profile accepts PEAP-MSCHAPv2 only with the expected certificate and RADIUS name.",
        examTip: "A validated server certificate protects the channel and identifies the server; it is not MFA by itself. Assess the inner method, client credentials, profile, and key management separately."
      }
    ]
  }
};
