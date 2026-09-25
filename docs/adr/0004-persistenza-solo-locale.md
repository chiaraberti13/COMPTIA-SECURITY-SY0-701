# 0004 — Progressi salvati solo nel browser, senza account

- **Stato:** Accettato
- **Data:** 2026-09-24 (formalizza una scelta presente dalle prime versioni)

## Contesto

Lo studente accumula checklist, segnalibri, cronologia dei quiz e ripasso
spaziato. Salvarli su un server richiederebbe account, autenticazione, un
database, backup, conformità al GDPR e protezione di dati personali: un costo
e una superficie d'attacco sproporzionati per un'app di studio gratuita.

## Decisione

Tutti i progressi restano nel `localStorage` del browser, sotto chiavi con il
prefisso `comptia_sy0701_`, letti con sanificatori che tollerano dati
malformati. Il server non conserva nulla sull'utente. Per spostare i progressi
su un altro dispositivo, la sezione "I tuoi dati" esporta e importa un file
JSON (`src/progressBackup.ts`), e un pulsante li cancella tutti.

## Alternative considerate

- **Account con database lato server.** Sincronizzazione automatica, ma serve
  gestire identità, password o OAuth, violazioni dei dati e richieste GDPR.
- **Sincronizzazione tramite un servizio di terze parti** (per esempio un
  archivio cloud dell'utente). Introduce un'origine esterna, incompatibile con
  la CSP limitata a `'self'`.

## Conseguenze

- ✅ Nessun dato personale sul server: niente da esfiltrare, niente account da
  compromettere, nessun obbligo di conservazione.
- ✅ L'app funziona anche se il server AI è spento.
- ⚠️ Cancellando i dati del browser si perdono i progressi. L'esportazione
  manuale è l'unica copia di sicurezza; la sezione "I tuoi dati" spiega che
  i progressi restano solo in quel browser.
- ⚠️ Chi usa lo stesso computer può vedere i progressi. Il rischio è
  accettato perché non sono dati sensibili.
- ⚠️ Cambiare il formato salvato richiede una migrazione. Il backup ha un campo
  `schema` e un cambio incompatibile è una versione major (vedi
  `CHANGELOG.md`).
