# PBQ 305 — Wi-Fi enterprise e ruoli 802.1X / Enterprise Wi-Fi and 802.1X roles

Esercizio originale IT/EN di abbinamento: obiettivo principale **4.1**, collegamento **3.2**. Riutilizza il motore PBQ, senza cambiare gli identificatori esistenti. Le attività 5 (disponibilità Wi-Fi/PMF) e 11 (metodi EAP/validazione server) sono completate.

Original IT/EN matching exercise: primary objective **4.1**, related objective **3.2**. Reuses the PBQ engine without changing existing identifiers. Activities 5 (Wi-Fi availability/PMF) and 11 (EAP methods/server validation) are complete.

## Topologia e profili / Topology and profiles

Portatile gestito / Managed laptop (supplicant) ↔ EAPOL ↔ access point (pass-through authenticator) ↔ RADIUS ↔ backend RADIUS/EAP `10.30.0.10` (authentication server).

Kestrelia, indirizzo e nome `radius.kestrelia.test` sono sintetici. Il backend termina EAP; l’access point applica il controllo di accesso. CA e identità server attese sono distribuite nel profilo gestito.

Kestrelia, the address and `radius.kestrelia.test` are synthetic. The backend terminates EAP; the access point enforces access control. The expected CA and server identity are provisioned in the managed profile.

- **A:** EAP-TLS 1.3 con certificati individuali e chiavi private protette, autenticazione reciproca senza password interna / EAP-TLS 1.3 with individual certificates and protected private keys, mutual authentication without an inner password.
- **B:** compatibilità limitata a PEAP/EAP-MSCHAPv2, senza certificato client o token / support restricted to PEAP/EAP-MSCHAPv2, without a client certificate or token.
- **C:** backend PAP non-EAP nel tunnel e client con solo il profilo EAP-TTLS dichiarato / backend non-EAP PAP inside the tunnel and clients with only the stated EAP-TTLS profile.

B/C sono casi didattici di interoperabilità, non una graduatoria assoluta o una raccomandazione per nuove installazioni. PEAP può usare altri metodi EAP interni; EAP-TTLS non richiede sempre PAP e può usare EAP interno. Sono i profili dichiarati a rendere unica la soluzione.

B/C are instructional interoperability cases, not an absolute ranking or a recommendation for new deployments. PEAP supports other inner EAP methods; EAP-TTLS does not always require PAP and can use inner EAP. The stated profiles determine the unique solution.

## Soluzione / Solution

| Prompt ID | Option ID | Decisione / Decision |
| --- | --- | --- |
| `p_supplicant` | `client` | Managed laptop 802.1X software |
| `p_authenticator` | `ap` | Pass-through access point |
| `p_auth_server` | `server` | RADIUS/EAP backend terminating EAP |
| `p_eap_tls` | `eap_tls` | Mutual certificate authentication |
| `p_peap` | `peap_mschap` | PEAP with inner EAP-MSCHAPv2 |
| `p_ttls` | `ttls_pap` | EAP-TTLS with inner non-EAP PAP |
| `p_server_validation` | `validate_server` | Expected CA, chain, validity and server identity; reject unexpected servers |
| `p_radius` | `radius_transport` | AAA/EAP transport between access point and backend |
| `p_factors` | `one_factor` | Password is one user factor; server certificate authenticates the server |

La spiegazione motiva tutte le associazioni e i quattro distrattori. Verifica del server prima delle credenziali interne, policy di revoca dell’implementazione e custodia della chiave privata restano essenziali. RADIUS è distinto dal metodo EAP e non cifra da solo tutto il traffico. 802.1X non garantisce da solo protezione da jamming o da ogni AP malevolo; il certificato server non rende MFA la password utente.

The explanation covers every match and the four distractors. Server validation before inner credentials, implementation revocation policy and protection of private keys remain essential. RADIUS is distinct from the EAP method and does not itself encrypt all traffic. 802.1X alone does not guarantee protection from jamming or every malicious access point; the server certificate does not make the user password MFA.

## Correzione e verifiche / Grading and verification

Nove punti diagnostici; tutti gli abbinamenti devono essere corretti per superare la PBQ. In esame vale un punto di pratica, senza riprodurre lo scoring proprietario CompTIA. Ripetizione conserva gli scenari scelti e azzera le risposte. Navigazione e cambio lingua mantengono le risposte dell’esame; il risultato concluso persiste nello storico locale. Le bozze di pratica non persistono dopo il ricaricamento.

Nine diagnostic points; all matches must be correct to pass. Exam mode awards one practice point without reproducing proprietary CompTIA scoring. Repeat preserves the selected scenarios and clears answers. Navigation and language changes retain exam answers; the completed result persists in local history. Practice drafts do not persist after reload.

Vitest verifica una chiave indipendente, errori singoli, parità dei fatti IT/EN, identificatori, obiettivi/fonti, reset e storico dopo rimontaggio. Playwright verifica tastiera, feedback, reset, navigazione, cambio lingua e storico su desktop/mobile, oltre ad axe e overflow. Il test firewall seleziona tutte le PBQ del dominio 4 per garantire l’inclusione dello scenario precedente.

Vitest checks an independent key, individual mistakes, IT/EN fact parity, identifiers, objectives/sources, restart and history after remount. Playwright checks keyboard operation, feedback, restart, navigation, language changes and history on desktop/mobile, plus axe and overflow. The firewall test selects every domain-4 PBQ to guarantee inclusion of the existing scenario.

## Fonti primarie / Primary sources

Verificate / Verified: **2026-10-08**.

- [IEEE 802.1X — Port-Based Network Access Control](https://1.ieee802.org/security/802-1x/): controllo di accesso e EAPOL / access control and EAPOL.
- [RFC 3748 — EAP](https://datatracker.ietf.org/doc/html/rfc3748): ruoli e inoltro al backend / roles and backend forwarding.
- [RFC 9190 — EAP-TLS 1.3](https://www.rfc-editor.org/rfc/rfc9190): autenticazione con certificati / certificate authentication.
- [RFC 5281 — EAP-TTLSv0](https://www.rfc-editor.org/rfc/rfc5281): autenticazione interna EAP/non-EAP / inner EAP/non-EAP authentication.
- [Microsoft — PEAP specification](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-peap/5308642b-90c9-4cc4-beec-fb367325c0f9) e / and [EAP network access](https://learn.microsoft.com/en-us/windows-server/networking/technologies/extensible-authentication-protocol/network-access): metodi interni e validazione server / inner methods and server validation.

Il quesito 40199 mantiene ID, opzioni e risposta. La spiegazione IT/EN richiede validazione di identità/catene e custodia delle chiavi per EAP-TLS e distingue WPA3-Enterprise dalla sua modalità a 192 bit.

Question 40199 retains its ID, options and answer. Its IT/EN explanation requires identity/chain validation and key protection for EAP-TLS and distinguishes WPA3-Enterprise from its 192-bit mode.

- [Cisco — Wi-Fi 6E WLAN Layer 2 Security](https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/220712-configure-and-verify-wi-fi-6e-wlan-layer.html): modalità WPA3-Enterprise e PMF / WPA3-Enterprise modes and PMF.
