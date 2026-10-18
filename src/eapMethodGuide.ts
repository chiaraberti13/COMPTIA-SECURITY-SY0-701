import type { GuideComparison } from "./domainGuides";

/** Domain 4.1 comparison of EAP methods; 802.1X roles stay in their canonical entry. */
export const EAP_METHOD_GUIDE_COMPARISON: Record<"it" | "en", GuideComparison> = {
  it: {
    title: "Metodi EAP e validazione del server (4.1)",
    headers: ["Metodo", "Credenziali client e tunnel", "Validazione del server e profilo", "Limiti e chiavi"],
    rows: [
      ["EAP-TLS", "Certificato client e prova della chiave privata; tunnel TLS.", "Validare catena CA e identità/nome server; profilo gestito con CA e server attesi.", "Richiede emissione, rinnovo e revoca dei certificati client; proteggere la chiave privata sul dispositivo."],
      ["EAP-TTLS", "Tunnel TLS esterno; metodo client interno, per esempio password o altro EAP.", "Validare certificato, CA e identità/nome server prima di inviare credenziali; distribuire il profilo in modo affidabile.", "Metodo interno e supporto variano; proteggere credenziali. Il certificato server non è un certificato client."],
      ["PEAP", "Tunnel TLS esterno; metodo interno configurato, spesso EAP-MSCHAPv2 o EAP-TLS.", "Validare CA e identità/nome server e fissare CA/server attesi nel profilo; evitare accettazione interattiva di certificati inattesi.", "EAP-TLS interno usa certificato client, altri metodi interni no; custodia e ciclo di vita delle chiavi sono essenziali."]
    ]
  },
  en: {
    title: "EAP methods and server validation (4.1)",
    headers: ["Method", "Client credentials and tunnel", "Server validation and profile", "Limits and keys"],
    rows: [
      ["EAP-TLS", "Client certificate and proof of private-key possession; TLS tunnel.", "Validate the CA chain and server identity/name; managed profile pins trusted CAs and expected servers.", "Requires client-certificate issuance, renewal, and revocation; protect the device private key."],
      ["EAP-TTLS", "Outer TLS tunnel; inner client method, such as a password or another EAP method.", "Validate the certificate, CA, and server identity/name before sending credentials; provision the profile securely.", "Inner methods and support vary; protect credentials. A server certificate is not a client certificate."],
      ["PEAP", "Outer TLS tunnel; configured inner method, often EAP-MSCHAPv2 or EAP-TLS.", "Validate the CA and server identity/name and pin trusted CAs/expected servers in the profile; avoid prompts accepting unexpected certificates.", "An inner EAP-TLS method uses a client certificate, but other methods do not; key custody and lifecycle matter."]
    ]
  }
};
