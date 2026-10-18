# Acronomi integrati / Integrated acronyms

Revisione / Reviewed: 2026-10-06. Responsabile / Owner: maintainer.

Questa integrazione chiude i gap elencati nella roadmap; non riproduce l’intera appendice
ufficiale e non introduce una banca di domande separata. I concetti sono la fonte del glossario.

This addition closes the gaps listed in the roadmap; it does not reproduce the entire official
appendix or introduce a separate question bank. Study concepts remain the glossary source.

| Sigle / Labels | Collocazione / Placement | Distinzione / Distinction |
|---|---|---|
| PEM, DER, P12, PFX, .cer | Dominio / Domain 1, 1.4 | Codifica testuale/binaria contro contenitore; .cer non garantisce la codifica. / Textual/binary encoding versus container; .cer does not guarantee encoding. |
| NTLM, PAP | Dominio / Domain 1, 4.6 | Metodi legacy: challenge-response contro credenziali in chiaro. / Legacy methods: challenge-response versus plaintext credentials. |
| WTLS | Dominio / Domain 3, 3.2 | Sicurezza WAP legacy, non cifratura Wi-Fi. / Legacy WAP security, not Wi-Fi encryption. |
| LEAP, EAP-FAST, WPS | Dominio / Domain 4, 4.1 | Metodo legacy, tunnel di autenticazione, registrazione dei dispositivi. / Legacy method, authentication tunnel, device enrollment. |

CER nell’appendice indica il crossover error rate biometrico, non un formato di certificato.
WPS non è una suite crittografica; il rischio del PIN non va esteso automaticamente alla modalità
pulsante. EAP-FAST non viene etichettato come intrinsecamente vulnerabile come LEAP.

CER in the appendix means biometric crossover error rate, not a certificate format.
WPS is not a cipher suite; PIN weaknesses must not automatically be attributed to button mode.
EAP-FAST is not labeled inherently vulnerable like LEAP.

## Fonti / Sources

- [CompTIA: obiettivi SY0-701 e appendice degli acronimi / SY0-701 objectives and acronym appendix](https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-%286-0%29.pdf?sfvrsn=204179cc_6).
- [Cisco: metodi di autenticazione wireless / wireless authentication methods](https://www.cisco.com/c/en/us/td/docs/routers/access/wireless/software/guide/SecurityAuthenticationTypes.html).
- [IETF: EAP-FAST, RFC 4851](https://www.rfc-editor.org/rfc/rfc4851).
- [CERT: vulnerabilità del PIN WPS / WPS PIN vulnerability](https://www.kb.cert.org/vuls/id/723755/).
- [WAP Forum: specifiche WTLS / WTLS specifications](https://www.wapforum.org/what/technical.htm).
- [Microsoft: deprecazione NTLM / NTLM deprecation](https://learn.microsoft.com/en-us/windows/whats-new/deprecated-features).
- [IETF: autenticazione PAP / PAP authentication, RFC 1334](https://www.rfc-editor.org/rfc/rfc1334).
- [IETF: codifica testuale dei certificati / textual certificate encoding, RFC 7468](https://www.rfc-editor.org/rfc/rfc7468).
- [IETF: contenitore PKCS #12 / PKCS #12 container, RFC 7292](https://www.rfc-editor.org/rfc/rfc7292).

## Verifica / Verification

`tests/acronymAppendix.test.ts` verifica presenza, indicizzazione, esempi e consigli IT/EN,
segnalazione legacy e riconoscimento delle sigle senza frammenti spurii. Gli altri controlli
impongono parità delle traduzioni, ID stabili e documenti generati aggiornati.

`tests/acronymAppendix.test.ts` checks presence, indexing, IT/EN examples and tips, legacy labels
and acronym recognition without spurious fragments. Existing checks enforce translation parity,
stable IDs and current generated documents. No saved-progress schema changes are required.
