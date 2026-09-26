# Threat model

Analisi delle minacce dell'applicazione e del repository con il metodo STRIDE.
Rivista il 2026-09-26 sul codice del branch principale. Va aggiornata a ogni
modifica che tocca un confine di fiducia, per esempio un nuovo endpoint, un
nuovo servizio esterno, un nuovo dato salvato o un nuovo workflow.

Il documento serve anche come caso di studio per l'esame: gli argomenti
corrispondono agli obiettivi 1.1 (tipi di controlli), 2.2 (vettori di minaccia),
2.3 (vulnerabilità applicative e della supply chain), 3.1 (modelli di
architettura), 4.1 (sicurezza delle applicazioni) e 5.2 (gestione del rischio:
mitigare o accettare).

## Sistema analizzato

```text
 Browser (React SPA)              Server Node (Express)                  Google Gemini API
 ┌──────────────────────┐  HTTPS  ┌────────────────────────────┐  HTTPS  ┌───────────────┐
 │ contenuti di studio  │ ──────► │ file statici (dist/)       │ ──────► │ modello LLM   │
 │ quiz, glossario      │         │ POST /api/chat             │         │ (a pagamento) │
 │ localStorage:        │ ◄────── │ POST /api/quiz/remediation │ ◄────── │               │
 │  progressi, lingua   │  JSON   │ GET  /healthz              │         └───────────────┘
 └──────────────────────┘         │ GEMINI_API_KEY (env)       │
                                  └────────────────────────────┘
 confine 1: utente anonimo nel browser
 confine 2: Internet → server
 confine 3: server → fornitore AI
 confine 4: repository GitHub → Actions (CI) → registro npm (supply chain)
```

**Beni da proteggere**, in ordine di impatto:

1. **La chiave `GEMINI_API_KEY` e il budget di Gemini.** Una chiave esposta o un
   endpoint abusato costano denaro reale (denial of wallet).
2. **L'integrità del codice distribuito.** Include le dipendenze npm, le
   GitHub Actions e il bundle servito ai browser.
3. **La correttezza dei contenuti di studio.** Una domanda alterata insegna una
   risposta sbagliata a chi prepara l'esame.
4. **La disponibilità del servizio.**
5. **I progressi dello studente.** Restano solo nel suo browser (vedi
   [ADR 0004](adr/0004-persistenza-solo-locale.md)) e hanno un valore
   personale, non economico.

**Fuori perimetro:** non ci sono account, sessioni o database lato server. Non
esiste quindi un'identità da rubare né un archivio di dati personali da
esfiltrare. È una scelta di progetto che elimina intere classi di minacce.

**Attori considerati:**

- un visitatore anonimo curioso o malevolo;
- un bot che cerca endpoint AI da sfruttare gratis;
- un attaccante della supply chain (pacchetto npm o Action compromessi);
- un contributore esterno che apre una pull request.

## Analisi STRIDE

Legenda dello stato: ✅ mitigato e verificato da un test, 🟡 mitigato in parte,
⬜ rischio accettato o azione aperta.

### Confine 1 e 2 — Browser e server Express

| STRIDE | Minaccia | Controlli presenti | Stato |
|---|---|---|---|
| Spoofing | Un client si fa passare per un altro indirizzo IP per aggirare il rate limit, inviando un'intestazione `X-Forwarded-For` falsa | `trust proxy` configurabile con `TRUST_PROXY` (predefinito 1 proxy; `0` se Node è esposto direttamente) in `server/app.ts`; test in `tests/api.test.ts` | ✅ |
| Tampering | Corpo della richiesta enorme o malformato per esaurire la memoria | `express.json` con limite di 64 kB; schema dichiarativo condiviso con il browser (`src/apiSchemas.ts`, Zod): messaggio al massimo di 2000 caratteri, cronologia di 8 turni troncati con ruoli ammessi solo `user` e `trainer`, 10 argomenti testuali di 120 caratteri; richiesta senza corpo o di forma errata → 400. Test in `tests/apiSchemas.test.ts` e `tests/api.test.ts` | ✅ |
| Tampering | XSS: testo dell'AI o dei dati che inietta HTML o script | Nessun `innerHTML` né `dangerouslySetInnerHTML`: il Markdown dell'AI è convertito in elementi React. La CSP ammette solo `'self'` per script, stili e font, senza `'unsafe-inline'`, e aggiunge `script-src-attr 'none'`, `object-src 'none'`, `base-uri 'self'` e `form-action 'self'`. Un test end-to-end fallisce a ogni violazione | ✅ |
| Tampering | Clickjacking: l'app caricata in un iframe di un altro sito | `frame-ancestors 'self'` e `X-Frame-Options` di `helmet` | ✅ |
| Repudiation | Abuso degli endpoint AI senza traccia per ricostruirlo | Log strutturati in JSON (`server/log.ts`): ogni richiesta `/api/` con percorso, stato e durata, e ogni chiamata a Gemini fallita con tipo ed esito. Mai testo dell'utente, argomenti, IP o chiavi: i test e lo smoke test lo verificano | ✅ |
| Information disclosure | Messaggi d'errore del fornitore AI (progetto, quote, URL interni) inoltrati al client | Risposta generica 502 o 504; il dettaglio resta nel log del server. Test dedicato in `tests/api.test.ts` | ✅ |
| Information disclosure | La chiave Gemini finisce nel bundle del browser | La chiave è letta solo dal server (`process.env`); `vite.config.ts` non la inietta; gitleaks controlla tutta la cronologia | ✅ |
| Information disclosure | L'indirizzo IP del visitatore raggiunge terze parti | Nessuna richiesta verso altre origini: font nel bundle, niente CDN né analytics. Verificato dal test end-to-end sulla CSP | ✅ |
| Denial of service | Molte richieste da un solo client | Rate limit di 30 richieste ogni 15 minuti per IP su `/api/` | ✅ |
| Denial of service | Chiamata a Gemini che non risponde e tiene occupato il server | Timeout con `AbortSignal` (`GEMINI_TIMEOUT_MS`, 30 s) → 504 | ✅ |
| Denial of service / costo | **Denial of wallet:** molti indirizzi diversi consumano il budget Gemini (OWASP LLM10) | Tetto giornaliero globale `AI_DAILY_LIMIT` (500, `0` spegne l'AI), `maxOutputTokens` 2048 sulla chat, input limitati. Il contatore è in memoria: si azzera al riavvio e si moltiplica per il numero di istanze. Per un sito pubblico, `AI_ACCESS_TOKEN` fa rispondere l'AI solo a chi conosce un codice: il codice è confrontato in tempo costante, i tentativi contano per il rate limit, non finisce mai nei log e nel browser resta solo nella scheda (`sessionStorage`) | 🟡 documentato nel README; per più istanze serve un contatore condiviso |
| Elevation of privilege | Non applicabile: non esistono ruoli né funzioni amministrative | — | — |
| Elevation of privilege | Un difetto in una dipendenza del server permette di eseguire codice: l'attaccante prova a modificare l'app, persistere o ottenere privilegi di root | Con l'immagine Docker: utente non root, file dell'app di proprietà di root, filesystem in sola lettura, nessuna capability Linux, `no-new-privileges`, runtime distroless senza shell, niente `node_modules` superflui. Verificato dal job CI `Container image`. Su Vercel l'isolamento è quello della piattaforma | ✅ |

### Confine 3 — Server e modello AI

| STRIDE | Minaccia | Controlli presenti | Stato |
|---|---|---|---|
| Tampering | **Prompt injection diretta** (OWASP LLM01): l'utente chiede al modello di ignorare le regole, falsifica un turno del dialogo o chiude in anticipo il blocco dei propri dati | *Spotlighting* (`server/promptSafety.ts`): ogni testo del browser (domanda, cronologia, argomenti) entra nel prompt dentro un tag (`<student_message>`, `<trainer_message>`, `<topic>`), e il prompt di sistema dichiara che il contenuto dei tag è un dato e non un'istruzione. Dal testo vengono rimossi i tag falsificati, anche mascherati con maiuscole, spazi, parentesi a larghezza piena o caratteri invisibili. `tests/promptInjection.test.ts` prova 11 attacchi noti: le regole non cambiano e nessun attacco esce dal suo tag. Il danno possibile resta limitato: il modello non ha strumenti né dati riservati, e la risposta è solo testo mostrato a chi l'ha chiesta | 🟡 nessun filtro rende un modello immune; il confine tra regole e dati però non si può più falsificare |
| Tampering | Output del modello malformato o ostile (OWASP LLM05): HTML, script o link `javascript:` in una risposta, JSON non valido nella remediation | Lo schema della remediation accetta solo 3 domande con 4 opzioni e un indice valido; gli ID li assegna il server; in caso contrario → 502. Anche il browser valida ogni risposta con gli stessi schemi e scarta quella di forma errata. Test dedicati | ✅ |
| Information disclosure | Dati personali inviati al fornitore AI dall'utente | Avviso visibile nel Trainer AI: "non inserire dati personali"; nessun dato dei progressi viene inviato, solo il messaggio e gli argomenti deboli | 🟡 dipende dal comportamento dell'utente |
| Repudiation / integrità | Risposta dell'AI sbagliata presa per vera (OWASP LLM09) | Avviso "le risposte possono contenere errori" e domande di remediation etichettate come non revisionate | ✅ |

### Confine 4 — Supply chain e repository

| STRIDE | Minaccia | Controlli presenti | Stato |
|---|---|---|---|
| Tampering | GitHub Action compromessa o tag spostato su codice malevolo | Tutte le Action fissate a SHA con il numero di versione in commento; `tests/workflows.test.ts` fa fallire la CI se manca | ✅ |
| Tampering | Pacchetto npm compromesso o appena pubblicato | `package-lock.json` con `npm ci`; Dependabot con attesa di 7 giorni; policy "versioni pubblicate da almeno 7 giorni" in `CONTRIBUTING.md`; `npm audit`, dependency review e CodeQL in `security.yml`; `overrides` per le dipendenze transitive vulnerabili; SBOM CycloneDX a ogni build per capire subito se una nuova vulnerabilità ci riguarda; OpenSSF Scorecard settimanale; scansione dell'immagine Docker con Grype | ✅ |
| Elevation of privilege | Una pull request esterna ottiene permessi di scrittura o segreti | I workflow usano `pull_request` (mai `pull_request_target`), `permissions: contents: read` e `persist-credentials: false`; la CI non usa segreti | ✅ |
| Information disclosure | Segreti committati per errore | gitleaks su tutta la cronologia con `.gitleaks.toml`; `.env` ignorato da git | ✅; da attivare nelle impostazioni del repository: secret scanning e push protection |
| Tampering | Modifica non revisionata di file critici | `CODEOWNERS` | 🟡 serve la protezione del branch `main` nelle impostazioni del repository |

### Dati nel browser

| STRIDE | Minaccia | Controlli presenti | Stato |
|---|---|---|---|
| Tampering | `localStorage` modificato a mano o da un'altra versione dell'app: l'app si blocca | Lettura difensiva e sanificatori per checklist, segnalibri, cronologia e progressi | ✅ |
| Tampering | File di backup importato ostile: troppo grande, di un'altra app o con valori anomali | `parseBackup`: limite di 1 MB, identificativo dell'app, versione dello schema, sanificazione di ogni campo, riepilogo e conferma prima di sostituire | ✅ |
| Information disclosure | Un'altra persona sullo stesso computer vede i progressi | Rischio accettato: i progressi non sono dati sensibili; "Cancella tutto" li elimina | ⬜ accettato |

## Rischi residui e azioni

| Priorità | Azione | Dove è tracciata |
|---|---|---|
| P1 | Attivare nel repository secret scanning, push protection e protezione del branch `main` | ROADMAP, attività n. 5 (impostazioni) |
| P2 | Contatore del budget AI condiviso tra le istanze, per esempio Redis, se si distribuisce su più istanze | Questo documento |

## Come verificare in locale

```bash
npm run build && npm run smoke         # header di sicurezza, CSP, limiti e budget
npx vitest run tests/api.test.ts       # validazione, timeout, 502/503/504, rate limit, X-Forwarded-For
npm run e2e                            # nessuna violazione della CSP e nessuna richiesta verso altre origini
```
