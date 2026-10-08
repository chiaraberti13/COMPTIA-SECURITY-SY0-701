# PBQ 304 — Percorso VPN / VPN paths

Esercizio originale IT/EN di abbinamento: obiettivo **3.2**, collegamenti **1.4** e **4.6**. Usa il motore esistente e identificatori indipendenti dalla lingua.

Original IT/EN matching exercise: objective **3.2**, related objectives **1.4** and **4.6**. Uses the existing engine and language-independent identifiers.

## Topologia testuale / Text topology

- Portatile remoto / Remote laptop → Internet → gateway A `203.0.113.10` → rete / network A `10.10.0.0/24`.
- Rete / Network A → gateway A → Internet → gateway B `198.51.100.20` → rete / network B `10.20.0.0/24`, server B `10.20.0.20`.

Kestrelia e tutti i dati sono sintetici. Il portatile ha solo il profilo remoto OpenVPN TLS con certificato individuale, credenziali e MFA tramite backend già configurato. Il profilo intersede richiede IKEv2/IPsec ESP con cifratura e integrità, certificati dei gateway e selector per le due reti. Gli host non terminano IPsec; non esistono tunnel IP-in-IP aggiuntivi. Il server B termina HTTPS/TLS. I due collegamenti sono valutati separatamente: il profilo remoto non inoltra verso B.

Kestrelia and all data are synthetic. The laptop has only the remote OpenVPN TLS profile, requiring an individual certificate, credentials and MFA through an already configured backend. The intersite profile requires IKEv2/IPsec ESP with encryption and integrity, gateway certificates and selectors for the two networks. Hosts do not terminate IPsec; no additional IP-in-IP tunnels exist. Server B terminates HTTPS/TLS. The two links are evaluated separately: the remote profile does not forward to B.

## Soluzione / Solution

| Prompt ID | Option ID | Decisione / Decision |
| --- | --- | --- |
| `p_remote` | `remote_tls` | OpenVPN TLS, laptop → gateway A |
| `p_sites` | `site_ipsec` | IKEv2/IPsec ESP, gateway A ↔ gateway B |
| `p_mode` | `esp_tunnel` | Tunnel mode, protected inner IP packet and outer gateway header |
| `p_boundary` | `beyond_gateway` | Client/server HTTPS retains TLS up to server B |
| `p_remote_auth` | `remote_auth` | Validate VPN server; client certificate, credentials and configured MFA |
| `p_peer_auth` | `ike_auth` | Gateway certificates, peer identity and proof of private key in IKEv2 |
| `p_scope` | `selected_traffic` | Selectors, IPsec policy, routing and firewall authorization |

La scelta TLS per il remoto dipende dal profilo disponibile: anche IPsec può fornire accesso remoto. ESP tunnel protegge il pacchetto interno, non cifra l’header esterno. Transport mode non incapsula da solo il pacchetto originale ed è inadeguato al caso gateway-to-gateway dichiarato; non è vietato universalmente a gateway che agiscono come host. La VPN non protegge automaticamente i segmenti oltre la terminazione o flussi esclusi. HTTPS protegge il proprio flusso fino al server; segmentazione e autorizzazioni restano necessarie. I certificati dei gateway autenticano i peer, non il personale; il certificato server non è un fattore utente aggiuntivo.

The remote TLS choice depends on the available profile: IPsec can also provide remote access. ESP tunnel protects the inner packet without encrypting the outer header. Transport mode does not itself encapsulate the original packet and does not fit this stated gateway-to-gateway case; gateways acting as hosts are not universally forbidden from using it. VPN protection does not automatically extend beyond termination or to excluded flows. HTTPS protects its own flow to the server; segmentation and authorization remain necessary. Gateway certificates authenticate peers, not staff; the server certificate is not an additional user factor.

## Verifica / Verification

Sette abbinamenti diagnostici; la PBQ passa con tutti corretti. In modalità esame vale un punto di pratica, senza riprodurre scoring CompTIA. Reset e ripetizione cancellano le risposte e conservano gli scenari scelti; navigazione e cambio lingua conservano quelle dell’esame in corso. Lo storico dei risultati conclusi persiste localmente; le bozze di pratica non sopravvivono al ricaricamento.

Seven diagnostic matches; all must be correct to pass. Exam mode awards one practice point, without claiming CompTIA scoring. Restart and repeat clear answers and preserve the selected scenarios; navigation and language changes retain current exam answers. Completed result history persists locally; practice drafts do not survive reloads.

Vitest verifica soluzione indipendente, distrattori, metadati, parità dei fatti IT/EN, reset e storico dopo rimontaggio. Playwright verifica tastiera, feedback, reset, navigazione, cambio lingua e storico dopo ricaricamento su desktop/mobile, con axe e controllo overflow. I test preesistenti dell’esame gestiscono entrambi gli scenari del dominio 3.

Vitest checks an independent solution, distractors, metadata, IT/EN fact parity, reset and history after remount. Playwright checks keyboard operation, feedback, reset, navigation, language changes and history after reload on desktop/mobile, with axe and overflow checks. Existing exam tests handle both domain-3 scenarios.

## Fonti primarie / Primary sources

Verificate / Verified: **2026-10-08**. Le premesse descrivono un esercizio, non una configurazione pronta da applicare a una rete reale.

- [RFC 4301 — IPsec Security Architecture](https://www.rfc-editor.org/rfc/rfc4301), §4.1: modalità e confini delle associazioni / association modes and boundaries.
- [RFC 7296 — IKEv2](https://www.rfc-editor.org/rfc/rfc7296), §1.2 e §2.15: autenticazione dei peer e negoziazione / peer authentication and negotiation.
- [Netgate — OpenVPN Mode Configuration](https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-mode.html): profili TLS e autenticazione utente / TLS profiles and user authentication.
