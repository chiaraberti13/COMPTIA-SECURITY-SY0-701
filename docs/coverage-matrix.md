# Matrice di copertura SY0-701

> File generato da `npm run coverage-matrix` (`scripts/coverage-matrix.ts`): non modificarlo a mano.
> La CI fallisce se non è aggiornato rispetto a domande, guide e collegamenti in `src/questionObjectives.ts`.

Una domanda può allenare più obiettivi, anche di un dominio diverso da quello del suo banco:
per questo la somma per obiettivo può superare il numero di domande del dominio.

Livelli cognitivi: **R** ricordo · **C** comprensione · **Ap** applicazione · **An** analisi.

## Dominio 1 — Concetti generali di sicurezza

Peso d'esame 12% · 110 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Fonti |
|---|---|---|---|---|---|---|---|---|
| 1.1 | Distinguere categorie e tipi di controllo, separando lo scopo del controllo dal modo in cui viene implementato. | 15 | 0 | 4 | 5 | 6 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| 1.2 | Applicare CIA, autenticazione, autorizzazione, accounting, non ripudio, zero trust, gap analysis, sicurezza fisica e deception a uno scenario. | 35 | 1 | 14 | 9 | 11 | 3 | [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) |
| 1.3 | Valutare un cambiamento sicuro: ownership, impatto, approvazione, test, rollback, documentazione e monitoraggio. | 20 | 1 | 3 | 8 | 8 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 1.4 | Selezionare algoritmi, hashing, firma, certificati e gestione delle chiavi in funzione di confidenzialità, integrità e identità. | 42 | 2 | 12 | 16 | 12 | 4 | [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), [NIST SP 800-56A Rev. 3](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final), [NIST SP 800-56B Rev. 2](https://csrc.nist.gov/pubs/sp/800/56/b/r2/final), [IETF RFC 8446](https://www.rfc-editor.org/rfc/rfc8446), [NIST CSRC Glossary](https://csrc.nist.gov/glossary/term/steganography) |

## Dominio 2 — Minacce, vulnerabilità e mitigazioni

Peso d'esame 22% · 133 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Fonti |
|---|---|---|---|---|---|---|---|---|
| 2.1 | Confrontare attori, attributi e motivazioni per stimare capacità, intento, accesso e probabilità. | 19 | 0 | 11 | 5 | 3 | 1 | [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 2.2 | Analizzare vettori e superfici di attacco, inclusi social engineering, supply chain, cloud, wireless e removable media. | 31 | 0 | 15 | 8 | 8 | 1 | [ICANN Protect Your Domain Name](https://www.icann.org/en/blogs/details/do-you-have-a-domain-name-heres-what-you-need-to-know-26-3-2018-en), [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 2.3 | Riconoscere vulnerabilità applicative, hardware, cloud, virtualizzazione, mobile, crittografiche e di configurazione. | 17 | 0 | 5 | 3 | 9 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [OWASP Foundation OWASP Top 10](https://owasp.org/www-project-top-ten/), [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) |
| 2.4 | Interpretare indicatori di malware, attacchi di rete, credenziali, applicazioni e comportamenti anomali. | 45 | 0 | 2 | 2 | 41 | 10 | [ICANN Domain Name Registration Hijacking](https://www.icann.org/en/icann-acronyms-and-terms/domain-name-registration-hijacking-en), [ICANN Protect Your Domain Name](https://www.icann.org/en/blogs/details/do-you-have-a-domain-name-heres-what-you-need-to-know-26-3-2018-en), [ICANN EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en), [IETF RFC 4033](https://www.rfc-editor.org/rfc/rfc4033), [IEEE Std 802.11-2020](https://standards.ieee.org/ieee/802.11/7028/), [Wi-Fi Alliance](https://www.wi-fi.org/discover-wi-fi/security), [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final), [MITRE ATT&CK](https://attack.mitre.org/), [OWASP Foundation XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html), [OWASP Foundation CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), [OWASP Foundation SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html), [OWASP Foundation Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), [NIST SP 800-63B](https://csrc.nist.gov/pubs/sp/800/63/b/4/final) |
| 2.5 | Selezionare mitigazioni coerenti con il vettore: segmentation, hardening, patching, least privilege, allowlisting, isolamento e monitoring. | 23 | 0 | 14 | 6 | 3 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |

## Dominio 3 — Architettura di sicurezza

Peso d'esame 18% · 112 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Fonti |
|---|---|---|---|---|---|---|---|---|
| 3.1 | Confrontare modelli e infrastrutture: cloud service model, deployment model, virtualizzazione, container, IoT/OT, serverless e IaC. | 38 | 0 | 18 | 9 | 11 | 1 | [NIST SP 800-145](https://csrc.nist.gov/pubs/sp/800/145/final), [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final) |
| 3.2 | Applicare principi di sicurezza a segmentazione, zone, accesso remoto, dispositivi di rete, protocolli e trust boundary. | 31 | 0 | 11 | 15 | 5 | 2 | [IETF RFC 4301](https://www.rfc-editor.org/rfc/rfc4301), [IETF RFC 7296](https://www.rfc-editor.org/rfc/rfc7296), [Netgate OpenVPN Mode Configuration](https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-mode.html), [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [IEEE Std 802.11-2020](https://standards.ieee.org/ieee/802.11/7028/), [Wi-Fi Alliance](https://www.wi-fi.org/discover-wi-fi/security), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 3.3 | Proteggere i dati per stato, classificazione e ciclo di vita mediante cifratura, tokenizzazione, masking, DLP e access control. | 24 | 0 | 10 | 13 | 1 | 1 | [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final), [EUR-Lex Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj) |
| 3.4 | Progettare resilienza e recovery con ridondanza, clustering, backup, siti alternativi, testing e obiettivi RTO/RPO. | 23 | 0 | 11 | 3 | 9 | 2 | [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) |

## Dominio 4 — Operazioni di sicurezza

Peso d'esame 28% · 185 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Fonti |
|---|---|---|---|---|---|---|---|---|
| 4.1 | Applicare baseline, hardening, patching, secure configuration e protezioni per endpoint, mobile, wireless, applicazioni e cloud. | 23 | 0 | 5 | 17 | 1 | 1 | [Cisco Wi-Fi 6E WLAN Layer 2 Security](https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/220712-configure-and-verify-wi-fi-6e-wlan-layer.html), [IEEE 802.1X](https://1.ieee802.org/security/802-1x/), [IETF RFC 3748](https://datatracker.ietf.org/doc/html/rfc3748), [Microsoft Protected Extensible Authentication Protocol (PEAP)](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-peap/5308642b-90c9-4cc4-beec-fb367325c0f9), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [IEEE Std 802.11-2020](https://standards.ieee.org/ieee/802.11/7028/), [Wi-Fi Alliance](https://www.wi-fi.org/discover-wi-fi/security), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls), [OWASP Foundation Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html), [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie), [IETF RFC 9190](https://www.rfc-editor.org/rfc/rfc9190), [IETF RFC 5281](https://www.rfc-editor.org/rfc/rfc5281), [Microsoft Learn Certificate requirements for EAP-TLS and PEAP](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/certificate-requirements-eap-tls-peap), [Microsoft Learn Wi-Fi settings for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/mem/intune/configuration/wi-fi-settings-windows) |
| 4.2 | Gestire inventario, ownership, classificazione, ciclo di vita, sanitizzazione e dismissione degli asset. | 18 | 0 | 13 | 4 | 1 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [NIST SP 800-88 Rev. 2](https://csrc.nist.gov/pubs/sp/800/88/r2/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.3 | Eseguire vulnerability management dal discovery alla prioritizzazione, remediation, rescansione, reporting ed eccezioni. | 24 | 0 | 12 | 7 | 5 | 1 | [NIST SP 800-40 Rev. 4](https://csrc.nist.gov/pubs/sp/800/40/r4/final), [FIRST Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/), [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) |
| 4.4 | Analizzare alert e attività con log, SIEM, scansioni, intelligence e baseline per distinguere segnale e rumore. | 16 | 0 | 9 | 3 | 4 | 1 | [NIST SP 800-92](https://csrc.nist.gov/pubs/sp/800/92/final), [MITRE ATT&CK](https://attack.mitre.org/) |
| 4.5 | Configurare controlli enterprise quali firewall, IDS/IPS, DNS filtering, DLP, NAC, EDR/XDR e proxy. | 21 | 0 | 7 | 10 | 4 | 1 | [Netgate pfSense Rule Methodology](https://docs.netgate.com/pfsense/en/latest/firewall/rule-methodology.html), [Netgate pfSense Firewall Fundamentals](https://docs.netgate.com/pfsense/en/latest/firewall/fundamentals.html), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.6 | Implementare IAM: provisioning, federation, MFA, authorization, least privilege, access review e deprovisioning. | 32 | 0 | 18 | 11 | 3 | 2 | [OASIS SAML 2.0 Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf), [IETF RFC 6749](https://www.rfc-editor.org/rfc/rfc6749), [OpenID Foundation OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html), [IETF RFC 4120](https://www.rfc-editor.org/rfc/rfc4120), [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final), [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [NIST SP 800-63B](https://csrc.nist.gov/pubs/sp/800/63/b/4/final) |
| 4.7 | Usare automazione e orchestrazione valutando repeatability, velocità, integrazioni, errori e rischio di propagazione. | 18 | 0 | 12 | 3 | 3 | 1 | [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final), [Center for Internet Security CIS Critical Security Controls](https://www.cisecurity.org/controls) |
| 4.8 | Applicare incident response e forensics preservando evidenze, comunicazioni, contenimento e ritorno controllato in produzione. | 18 | 0 | 11 | 0 | 7 | 1 | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final) |
| 4.9 | Interpretare fonti dati e log di rete, autenticazione, endpoint, applicazioni, cloud, DNS ed email. | 23 | 0 | 6 | 3 | 14 | 1 | [NIST SP 800-61 Rev. 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final), [NIST SP 800-92](https://csrc.nist.gov/pubs/sp/800/92/final) |

## Dominio 5 — Gestione e supervisione del programma di sicurezza

Peso d'esame 20% · 142 domande nel banco del dominio.

| Obiettivo | Risultato atteso | Domande | R | C | Ap | An | Esercizi guidati | Fonti |
|---|---|---|---|---|---|---|---|---|
| 5.1 | Stabilire governance con ruoli, responsabilità, policy hierarchy, reporting, data ownership e allineamento alla strategia. | 31 | 7 | 12 | 11 | 1 | 1 | [SEC Sarbanes-Oxley Rulemaking and Reports](https://www.sec.gov/spotlight/sarbanes-oxley.htm), [FTC Gramm-Leach-Bliley Act](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act), [FTC Safeguards Rule](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know), [NIST Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/cyberframework), [ISO/IEC 27001](https://www.iso.org/standard/27001), [NIST SP 800-37 Rev. 2](https://csrc.nist.gov/pubs/sp/800/37/r2/final) |
| 5.2 | Gestire il rischio: identificazione, analisi, registro, appetite/tolerance, risposte, owner, monitoraggio e BIA. | 37 | 7 | 8 | 10 | 12 | 1 | [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final) |
| 5.3 | Valutare il rischio delle terze parti lungo selezione, due diligence, contratti, monitoraggio, incident notification e offboarding. | 19 | 2 | 5 | 7 | 5 | 1 | [NIST SP 800-161 Rev. 1](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final), [AICPA SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) |
| 5.4 | Applicare compliance e privacy considerando obblighi, giurisdizione, minimizzazione, retention, data subject e conseguenze. | 27 | 4 | 13 | 7 | 3 | 2 | [SEC Sarbanes-Oxley Rulemaking and Reports](https://www.sec.gov/spotlight/sarbanes-oxley.htm), [FTC Gramm-Leach-Bliley Act](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act), [FTC Safeguards Rule](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know), [HHS HIPAA Covered Entities and Business Associates](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html), [HHS HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html), [PCI SSC compliance programs](https://www.pcisecuritystandards.org/faqs/1212/), [EUR-Lex Regulation (EU) 2016/679](https://eur-lex.europa.eu/eli/reg/2016/679/oj), [PCI Security Standards Council PCI Data Security Standard](https://www.pcisecuritystandards.org/standards/pci-dss/), [ISO/IEC 27001](https://www.iso.org/standard/27001), [U.S. Department of Health and Human Services HIPAA](https://www.hhs.gov/hipaa/index.html) |
| 5.5 | Distinguere audit e assessment, raccogliere evidenze e seguire finding, remediation, attestazioni e reporting. | 17 | 1 | 6 | 5 | 5 | 1 | [NIST SP 800-115](https://csrc.nist.gov/pubs/sp/800/115/final), [AICPA SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) |
| 5.6 | Costruire awareness e training misurabili, specifici per ruolo e adattati a comportamento, minacce e cultura. | 18 | 1 | 2 | 9 | 6 | 1 | [NIST SP 800-50 Rev. 1](https://csrc.nist.gov/pubs/sp/800/50/r1/final) |

## Priorità per nuove domande

I 5 obiettivi con meno domande, da rinforzare per primi:

- **1.1**: 15 domande
- **4.4**: 16 domande
- **2.3**: 17 domande
- **5.5**: 17 domande
- **4.2**: 18 domande

## Fonti

Le fonti di ogni obiettivo sono in `src/contentReview.ts` (assegnate il 2026-10-08); gli obiettivi d'esame
CompTIA valgono per tutti e non sono ripetuti nella tabella. Non sono richieste approvazioni umane
o un secondo revisore; restano obbligatori i controlli automatici del repository.

### Fonti primarie: obiettivi d'esame, standard, specifiche e norme

- [IEEE 802.1X — Port-Based Network Access Control](https://1.ieee802.org/security/802-1x/) — IEEE
- [RFC 3748 — EAP](https://datatracker.ietf.org/doc/html/rfc3748) — IETF
- [RFC 4301 — IPsec Security Architecture](https://www.rfc-editor.org/rfc/rfc4301) — IETF
- [RFC 7296 — IKEv2](https://www.rfc-editor.org/rfc/rfc7296) — IETF
- [Sarbanes-Oxley Rulemaking and Reports](https://www.sec.gov/spotlight/sarbanes-oxley.htm) — SEC
- [Gramm-Leach-Bliley Act](https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act) — FTC
- [FTC Safeguards Rule](https://www.ftc.gov/business-guidance/resources/ftc-safeguards-rule-what-your-business-needs-know) — FTC
- [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html) — HHS
- [SAML 2.0 Core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf) — OASIS
- [RFC 6749 — OAuth 2.0](https://www.rfc-editor.org/rfc/rfc6749) — IETF
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html) — OpenID Foundation
- [RFC 4120 — Kerberos V5](https://www.rfc-editor.org/rfc/rfc4120) — IETF
- [RFC 4033 — DNS Security Introduction and Requirements](https://www.rfc-editor.org/rfc/rfc4033) — IETF
- [IEEE Std 802.11-2020 — Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications](https://standards.ieee.org/ieee/802.11/7028/) — IEEE
- [CompTIA Security+ (SY0-701) — exam objectives](https://www.comptia.org/certifications/security) — CompTIA
- [SP 800-53 Rev. 5 — Security and Privacy Controls](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final) — NIST
- [SP 800-207 — Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final) — NIST
- [SP 800-56A Rev. 3 — Pair-Wise Key-Establishment Schemes Using Discrete Logarithm Cryptography](https://csrc.nist.gov/pubs/sp/800/56/a/r3/final) — NIST
- [SP 800-56B Rev. 2 — Pair-Wise Key-Establishment Using Integer Factorization Cryptography](https://csrc.nist.gov/pubs/sp/800/56/b/r2/final) — NIST
- [SP 800-63B — Digital Identity Guidelines: Authentication and Authenticator Management](https://csrc.nist.gov/pubs/sp/800/63/b/4/final) — NIST
- [SP 800-37 Rev. 2 — Risk Management Framework for Information Systems and Organizations](https://csrc.nist.gov/pubs/sp/800/37/r2/final) — NIST
- [SP 800-88 Rev. 2 — Guidelines for Media Sanitization](https://csrc.nist.gov/pubs/sp/800/88/r2/final) — NIST
- [SP 800-57 Part 1 Rev. 5 — Recommendation for Key Management](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final) — NIST
- [SP 800-145 — The NIST Definition of Cloud Computing](https://csrc.nist.gov/pubs/sp/800/145/final) — NIST
- [SP 800-34 Rev. 1 — Contingency Planning Guide](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final) — NIST
- [SP 800-40 Rev. 4 — Enterprise Patch Management Planning](https://csrc.nist.gov/pubs/sp/800/40/r4/final) — NIST
- [SP 800-92 — Guide to Computer Security Log Management](https://csrc.nist.gov/pubs/sp/800/92/final) — NIST
- [SP 800-61 Rev. 3 — Incident Response Recommendations](https://csrc.nist.gov/pubs/sp/800/61/r3/final) — NIST
- [SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments](https://csrc.nist.gov/pubs/sp/800/30/r1/final) — NIST
- [SP 800-161 Rev. 1 — Cybersecurity Supply Chain Risk Management](https://csrc.nist.gov/pubs/sp/800/161/r1/upd1/final) — NIST
- [SP 800-115 — Technical Guide to Information Security Testing](https://csrc.nist.gov/pubs/sp/800/115/final) — NIST
- [SP 800-50 Rev. 1 — Building a Cybersecurity and Privacy Learning Program](https://csrc.nist.gov/pubs/sp/800/50/r1/final) — NIST
- [Cybersecurity Framework (CSF) 2.0](https://www.nist.gov/cyberframework) — NIST
- [RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3](https://www.rfc-editor.org/rfc/rfc8446) — IETF
- [RFC 9190 — EAP-TLS 1.3](https://www.rfc-editor.org/rfc/rfc9190) — IETF
- [RFC 5281 — EAP-TTLSv0](https://www.rfc-editor.org/rfc/rfc5281) — IETF
- [ISO/IEC 27001 — Information security management systems](https://www.iso.org/standard/27001) — ISO
- [Regulation (EU) 2016/679 — General Data Protection Regulation](https://eur-lex.europa.eu/eli/reg/2016/679/oj) — EUR-Lex
- [HIPAA — Health Insurance Portability and Accountability Act](https://www.hhs.gov/hipaa/index.html) — U.S. Department of Health and Human Services
- [SOC 2 — Trust Services Criteria](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) — AICPA
- [PCI Data Security Standard](https://www.pcisecuritystandards.org/standards/pci-dss/) — PCI Security Standards Council

### Fonti secondarie: riferimenti di comunità ed enti

- [Wi-Fi 6E WLAN Layer 2 Security](https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/220712-configure-and-verify-wi-fi-6e-wlan-layer.html) — Cisco
- [Protected Extensible Authentication Protocol (PEAP)](https://learn.microsoft.com/en-us/openspecs/windows_protocols/ms-peap/5308642b-90c9-4cc4-beec-fb367325c0f9) — Microsoft
- [OpenVPN Mode Configuration](https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-mode.html) — Netgate
- [pfSense Rule Methodology](https://docs.netgate.com/pfsense/en/latest/firewall/rule-methodology.html) — Netgate
- [pfSense Firewall Fundamentals](https://docs.netgate.com/pfsense/en/latest/firewall/fundamentals.html) — Netgate
- [HIPAA Covered Entities and Business Associates](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html) — HHS
- [PCI SSC compliance programs](https://www.pcisecuritystandards.org/faqs/1212/) — PCI SSC
- [ICANN Domain Name Registration Hijacking](https://www.icann.org/en/icann-acronyms-and-terms/domain-name-registration-hijacking-en) — ICANN
- [ICANN Protect Your Domain Name](https://www.icann.org/en/blogs/details/do-you-have-a-domain-name-heres-what-you-need-to-know-26-3-2018-en) — ICANN
- [ICANN EPP Status Codes](https://www.icann.org/resources/pages/epp-status-codes-2014-06-16-en) — ICANN
- [Wi-Fi Alliance — WPA3 Specification and security](https://www.wi-fi.org/discover-wi-fi/security) — Wi-Fi Alliance
- [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) — OWASP Foundation
- [MDN Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie) — MDN
- [XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) — OWASP Foundation
- [CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) — OWASP Foundation
- [SSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html) — OWASP Foundation
- [CSRC Glossary — Steganography](https://csrc.nist.gov/glossary/term/steganography) — NIST
- [Certificate requirements for EAP-TLS and PEAP](https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/certificate-requirements-eap-tls-peap) — Microsoft Learn
- [Wi-Fi settings for Windows devices in Microsoft Intune](https://learn.microsoft.com/en-us/mem/intune/configuration/wi-fi-settings-windows) — Microsoft Learn
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — OWASP Foundation
- [CIS Critical Security Controls](https://www.cisecurity.org/controls) — Center for Internet Security
- [MITRE ATT&CK](https://attack.mitre.org/) — MITRE
- [Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog) — CISA
- [Common Vulnerability Scoring System (CVSS)](https://www.first.org/cvss/) — FIRST
