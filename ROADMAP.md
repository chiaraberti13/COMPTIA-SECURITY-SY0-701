# 🗺️ Project Roadmap: COMPTIA-SECURITY-SY0-701

## Visione

Trasformare **COMPTIA-SECURITY-SY0-701** in una risorsa didattica di cybersecurity chiara, affidabile, manutenibile e sicura, utile sia per la preparazione alla certificazione CompTIA Security+ SY0-701 sia per consolidare competenze applicabili in contesti reali.

Il restyling segue tre prospettive complementari:

- **Engineering:** repository ordinato, validato automaticamente e semplice da mantenere o estendere.
- **Cybersecurity:** contenuti tecnicamente corretti, esempi sicuri e controlli di sicurezza integrati nel ciclo di sviluppo (DevSecOps), estesi alla sicurezza dell'applicazione e della componente AI.
- **UX didattica:** navigazione intuitiva, progressione coerente, accessibilità e strumenti che favoriscano comprensione, pratica e ripasso.

> [!IMPORTANT]
> Questa roadmap è stata confrontata con lo stato reale del repository il **2026-09-24** (vedi [Stato attuale](#-stato-attuale--audit-del-2026-09-24)) e riallineata dopo le PR #37–#50. Le voci già soddisfatte sono marcate come completate con l'evidenza nel codice; quelle nuove nascono dai gap emersi. Non costituisce materiale ufficiale CompTIA e non garantisce il superamento dell'esame.

### Principio guida: non rompere ciò che funziona

Il progetto ha già una base solida (app funzionante, dataset bilingue, test di integrità dei contenuti, CI). Ogni attività deve quindi:

1. essere **incrementale** e reversibile, con una PR piccola e focalizzata;
2. mantenere verde `npm run check` (typecheck + lint + test) e `npm run build`;
3. non cambiare formato dei dati persistiti in `localStorage` senza una **migrazione** e un test dedicato;
4. non spostare i dataset (`src/data.ts`, `src/data.en.ts`) finché i test di integrità non coprono anche la nuova struttura;
5. non integrare un aggiornamento di versione principale di una dipendenza solo perché la CI è verde: prima va provato l'avvio reale dell'app (vedi [Aggiornamento delle dipendenze](#aggiornamento-delle-dipendenze)).

---

## 🔍 Stato attuale — audit del 2026-09-24

**Natura del progetto:** non è un repository di sole note Markdown, ma una **web app full-stack self-hosted**: frontend React 19 + Vite 6 + Tailwind 4, backend Express 4 (`server.ts`) che serve il frontend e fa da proxy verso l'API Google Gemini. I contenuti didattici vivono in dataset TypeScript tipizzati.

| Area | Già presente | Gap principale |
|---|---|---|
| Contenuti | 5 domini, checklist, ~550 voci di glossario, banca domande con scenario; **guide di dominio complete** per tutti e 5 i domini (ogni sotto-argomento ufficiale, 30 tabelle comparative, 40 errori comuni, 33 esercizi guidati), imposte da `tests/domainGuides.test.ts` | Le domande non dichiarano l'obiettivo (`1.1`…`5.6`) a cui sono collegate; nessuna data di revisione né fonte per voce |
| Bilinguismo | Italiano sorgente di verità, overlay inglese con fallback, test di parità strutturale e **di contenuto** (stessi numeri, sigle e token in 7.979 coppie di frasi e in tutte le guide) | Il controllo automatico non coglie differenze di significato senza numeri o sigle; nessun segnale di traduzione da rivedere dopo una modifica al testo italiano |
| Qualità contenuti | `tests/dataset.test.ts`: ID univoci, spiegazione di ogni distrattore, scenario obbligatorio, copertura di ogni obiettivo, pesi dei domini (±5%), maggioranza di domande di livello superiore | Nessun changelog/errata pubblico delle correzioni sostanziali |
| Apprendimento | Simulatore con timer opzionale, domande multi-risposta, soglia 80%, storico, ripasso spaziato 1-3-7-14-30 giorni, remediation AI | Nessuna esportazione/importazione dei progressi; nessuna vista "exam readiness" per obiettivo |
| Backend / AppSec | `helmet` con CSP in produzione, rate limit su `/api/`, body limit 64 kB, input limitati, history sanificata, prompt con difesa da injection, output JSON AI validato, errori del provider non esposti al client | Nessun timeout sulle chiamate Gemini, nessun budget globale, nessun `maxOutputTokens` sulla chat, nessun endpoint di health, header `User-Agent` residuo di AI Studio; **nessun test avvia il server in modalità produzione**, dove vengono registrate CSP e rotta statica |
| Frontend security | Rendering Markdown fatto a mano in JSX, senza `innerHTML` (niente XSS dall'output AI); `localStorage` letto tramite wrapper difensivo e sanificatori | CSP con `'unsafe-inline'` per gli stili e dipendenza da Google Fonts esterni |
| CI | `.github/workflows/ci.yml` con `permissions: contents: read`, `concurrency`, `npm ci`, typecheck, lint, test, build su Node 22 e 24, Actions fissate a SHA (`tests/workflows.test.ts`), Dependabot attivo | Secret scan, CodeQL, audit e dependency review aggiunti in `security.yml` (2026-09-24); **6 PR di Dependabot aperte**, tutte verificate, 5 con cambi di versione principale (Express 5, Vite 8, plugin-react 6, motion 13, Actions v7) |
| Governance | `SECURITY.md` bilingue, `LICENSE` MIT, README IT/EN, `.gitignore` che esclude `.env*`, `package.json` con nome, versione ed `engines` reali | Mancano `CONTRIBUTING.md`, `CHANGELOG.md`, template issue/PR, `CODEOWNERS` |
| Manutenibilità | Logica pura estratta e testata (`quiz.ts`, `remediation.ts`, `storage.ts`, `localizedData.ts`); helper di test condivisi in `tests/helpers/` | `src/App.tsx` ha circa 2.640 righe: rendering, stato e logica di tutte le sezioni in un unico componente; branch remoti già integrati mai chiusi |
| Accessibilità e layout | `lang` del documento aggiornato dinamicamente, attributi ARIA in più punti, area di studio leggibile anche su telefono, tabelle con scorrimento orizzontale nel proprio riquadro, soluzioni degli esercizi nascoste finché non richieste | Nessun test automatico di accessibilità né di layout (il difetto mobile è stato scoperto solo con Playwright a mano); animazioni `motion` senza rispetto di `prefers-reduced-motion` |

---

## Come usare questa roadmap

### Stati

- [ ] Da pianificare
- [ ] In corso — aggiungere `🚧` e il riferimento a issue/PR
- [ ] Parziale — aggiungere `🟡` e indicare cosa manca
- [x] Completato — aggiungere data e riferimento a issue/PR o all'evidenza nel codice
- [ ] Bloccato — aggiungere `⛔` e descrivere il blocco

### Priorità

| Livello | Significato | Criterio |
|---|---|---|
| **P0** | Fondamentale | Correttezza, sicurezza, struttura di base o rischio elevato |
| **P1** | Alto valore | Migliora sensibilmente studio, manutenzione e qualità |
| **P2** | Evolutivo | Funzionalità avanzata o ottimizzazione successiva |

### Stima dello sforzo

Ogni voce nuova riporta, dove utile, una taglia indicativa: **S** (meno di mezza giornata), **M** (1–2 giorni), **L** (più giorni, da spezzare in più PR).

### Definizione generale di completamento

Un'attività è completata quando:

1. la modifica è revisionata e collegata a una issue o pull request;
2. `npm run check` e `npm run build` passano in locale e in CI;
3. la documentazione e i contenuti in italiano e inglese rimangono coerenti (i test di parità restano verdi);
4. esempi e laboratori includono prerequisiti, obiettivi, limiti d'uso e procedura di ripristino;
5. non sono presenti credenziali, dati personali, output sensibili o asset non distribuibili;
6. il changelog, il README e questa roadmap vengono aggiornati quando necessario;
7. ogni nuova regola sui contenuti è **codificata in un test** in `tests/`, non solo descritta a parole.

---

## 🔎 Fase 0 — Audit e baseline

**Obiettivo:** verificare lo stato reale del repository prima di applicare cambiamenti strutturali.

- [x] **P0 — Inventario del repository:** mappati directory, script, workflow, dipendenze e asset — 2026-09-24, sezione [Stato attuale](#-stato-attuale--audit-del-2026-09-24).
- [x] **P0 — Mappatura degli obiettivi SY0-701 a livello di gruppo tematico:** ogni obiettivo numerato è coperto (test `covers every numbered objective in the five official domains`).
- [ ] 🟡 **P0 — Mappatura degli obiettivi a livello di domanda:** aggiungere a `Question` un campo `objectives: string[]` (es. `["2.4"]`) e un test che lo renda obbligatorio. **M**
- [ ] **P0 — Analisi dei gap:** identificare obiettivi con poche domande, sottovoci senza esempio pratico e contenuti non verificabili, usando la mappatura per domanda. **M**
- [x] **P0 — Verifica linguistica strutturale:** test di parità IT/EN su ID, campi tradotti, intestazioni e annunci multi-risposta.
- [ ] 🟡 **P0 — Baseline qualità:** registrare nel report numero di domande per dominio/obiettivo, stato Lighthouse (performance, accessibilità) e risultato di `npm audit`. **S**
- [ ] **P0 — Threat model dell'applicazione e del repository:** STRIDE su browser → Express → Gemini, abuso dei costi AI, prompt injection, supply chain npm, workflow GitHub Actions, integrità dei progressi locali. **M**
- [ ] **P1 — Registro decisionale:** ADR essenziali per dataset in TypeScript vs file di contenuto, strategia bilingue a overlay, scelta del provider AI e politica di persistenza solo locale. **S**

**Deliverable:** report di audit, matrice di copertura per obiettivo, threat model e backlog confermato.

---

## 📌 Priorità attuali — Q4 2026

### 🏗️ Engineering & Developer Experience

**Obiettivo:** migliorare struttura, manutenibilità, automazione e facilità di contribuzione senza interrompere l'app esistente.

#### Struttura e convenzioni

- [ ] **P0 — Consolidare la struttura esistente** invece di riorganizzarla da zero. Struttura di riferimento (in grassetto le aggiunte):

  ```text
  .github/
  ├── ISSUE_TEMPLATE/            # nuovo
  ├── workflows/                 # ci.yml esistente + security.yml nuovo
  ├── dependabot.yml             # nuovo
  ├── CODEOWNERS                 # nuovo
  └── pull_request_template.md   # nuovo
  docs/
  ├── adr/                       # nuovo: decisioni architetturali
  ├── threat-model.md            # nuovo
  └── coverage-matrix.md         # nuovo: generato da script
  labs/                          # nuovo, vedi "Laboratori pratici sicuri"
  scripts/                       # nuovo: generazione indici e report
  src/
  ├── components/                # esistente, da popolare con le sezioni di App.tsx
  ├── data.ts / data.en.ts       # esistenti: sorgente IT e overlay EN
  ├── domainGuides.ts            # esistente
  ├── quiz.ts, remediation.ts,   # esistenti: logica pura testata
  │   storage.ts, localizedData.ts
  └── ...
  server/                        # nuovo (P1): route e servizi estratti da server.ts
  tests/
  CHANGELOG.md                   # nuovo
  CONTRIBUTING.md                # nuovo
  CODE_OF_CONDUCT.md             # nuovo
  SECURITY.md                    # esistente
  LICENSE, README.md, README.it.md, ROADMAP.md
  ```

- [x] **P0 — Correggere l'identità del pacchetto:** `name` `comptia-security-sy0-701`, `version` `1.0.0`, `engines` `node ^22.13.0 || >=24.0.0` e `npm >=10` — 2026-09-24.
- [ ] **P0 — Stabilire convenzioni di naming:** file in `kebab-case` per documenti e lab, componenti React in `PascalCase`, identificatori univoci e stabili per obiettivi, domande, voci di glossario e lab.
- [x] **P0 — Separare contenuti, logica e automazioni:** dataset, logica pura (`quiz.ts`, `remediation.ts`, `storage.ts`) e test sono già separati.
- [ ] **P1 — Scomporre `src/App.tsx`:** estrarre una sezione per PR (Studio, Quiz, Risultati, AI Trainer) in `src/components/`, con hook dedicati (`useQuizSession`, `useProgress`) e nessun cambiamento visivo. **L**
- [ ] **P1 — Scomporre `server.ts`:** separare configurazione, middleware di sicurezza, route `/api/chat`, route `/api/quiz/remediation` e client Gemini condiviso, così da poterli testare con Supertest. **M**
- [ ] **P1 — Metadati di revisione dei contenuti:** aggiungere a dataset e glossario `lastReviewed`, `status` (`reviewed`/`needs-review`/`deprecated`) e, dove serve, `sources`. **M**
- [ ] **P1 — Eliminare duplicazioni:** le definizioni presenti sia nel glossario sia nelle sottovoci devono puntare a una voce canonica tramite ID.
- [x] **P1 — Glossario centralizzato:** ~550 voci con ricerca, filtri per dominio e categoria, indice A–Z e segnalibri (`src/components/GlossarySection.tsx`).
- [ ] **P2 — Valutare l'estrazione dei dataset in JSON/YAML con schema:** solo dopo che i test coprono la validazione dello schema; beneficio principale: contributi di contenuto senza toccare codice TypeScript.

#### Qualità automatizzata e CI

- [x] **P0 — Pipeline di base:** typecheck, lint, test Vitest e build su ogni push a `main` e su ogni pull request.
- [x] **P0 — Validazione dei dati strutturati:** i dataset sono tipizzati e verificati da `tests/dataset.test.ts` (ID, opzioni, risposte, spiegazioni, scenari, parità IT/EN).
- [x] **P0 — Aggiornare Node.js in CI e in `engines`:** CI su matrice Node 22 + 24 (al posto di Node 20, fuori supporto da aprile 2026), `.nvmrc` a 24 e README IT/EN allineati — 2026-09-24. Togliere Node 22 dalla matrice alla sua fine vita (aprile 2027).
- [ ] **P0 — Aggiungere Markdown linting:** `markdownlint-cli2` su README, ROADMAP, SECURITY e futuri `docs/` e `labs/`. **S**
- [ ] **P0 — Aggiungere link checking:** `lychee` su file Markdown con cache, retry e allowlist motivata. **S**
- [ ] **P1 — Aggiungere spell checking tecnico:** `cspell` con dizionari italiano e inglese e un dizionario di progetto per acronimi, protocolli e vendor. **M**
- [ ] **P1 — Test dell'API server:** con Supertest e client Gemini simulato: validazione input, limiti di dimensione, rate limit, gestione errori senza fuga di dettagli del provider. **M**
- [ ] **P1 — Test dei componenti principali:** Testing Library per il flusso quiz (selezione, multi-risposta, timer, risultato) e per il cambio lingua. **M**
- [ ] **P1 — Soglia di copertura dei test** per la logica pura (`quiz.ts`, `remediation.ts`, `storage.ts`, `localizedData.ts`), non per l'intero progetto. **S**
- [ ] **P1 — Generare automaticamente la matrice di copertura:** uno script legge dataset e guide e produce `docs/coverage-matrix.md`; la CI fallisce se il file committato non è aggiornato. **M**
- [ ] **P1 — Job separati e con permessi minimi:** `quality` (typecheck, lint, test), `build`, `security`, `docs`, ognuno con messaggi d'errore leggibili.
- [ ] **P1 — Rendere obbligatori i controlli principali sulle pull request** tramite branch protection.
- [ ] **P2 — Anteprima per pull request e deploy dalla branch principale** (solo frontend statico + backend su piattaforma con secret gestiti).
- [ ] **P2 — Release versionate:** changelog, tag semantici e artefatto buildato allegato alla release.

#### Aggiornamento delle dipendenze

Dependabot è attivo dal 2026-09-24 e ha già aperto 6 pull request. Integrarle senza metodo è il modo più rapido per rompere un'app che funziona; lasciarle aperte accumula debito e vulnerabilità. Le regole seguenti bilanciano le due cose.

- [x] **P0 — Smoke test di avvio in produzione nella CI:** `scripts/smoke-test.ts` (`npm run smoke`) avvia `dist/server.cjs` con `NODE_ENV=production` e verifica pagina dell'app, CSP, `nosniff`, assenza di `X-Powered-By`, fallback della SPA e risposta 400 delle due API; eseguito dalla CI dopo la build. Verificato che fallisce con Express 5 e la vecchia rotta `"*"` (`PathError: Missing parameter name`) — 2026-09-24.
- [ ] 🟡 **P0 — Smistare le 6 PR aperte di Dependabot:** ognuna verificata il 2026-09-24 in una copia separata del repository, sopra le correzioni di questo branch, con `npm ci`, typecheck, lint, test, build e smoke test. Resta da integrarle, **in quest'ordine**: **M**

  | Ordine | PR di Dependabot | Esito della verifica | Prerequisito |
  |---|---|---|---|
  | 1 | Gruppo npm minor/patch (10 pacchetti, esbuild 0.25 → 0.28) | ✅ tutto verde | Nessuno |
  | 2 | `express` 4 → 5 e `@types/express` | ✅ tutto verde **dopo** due correzioni: la rotta `"*"` fermava l'avvio (`PathError: Missing parameter name`) e le API senza corpo rispondevano 502 invece di 400 | Correzioni di `server.ts` e smoke test di questo branch |
  | 3 | `vite` 6 → 8 **insieme a** `@vitejs/plugin-react` 5 → 6 | ✅ tutto verde, build in circa 1 s invece di 4 s, nessun avviso | Gruppo minor/patch già integrato (Vite 8 richiede esbuild 0.27 o 0.28) e `vite.config.ts` con `import.meta.dirname`. Le due PR modificano lo stesso lockfile: integrare la prima, poi chiedere a Dependabot di aggiornare la seconda (`@dependabot rebase`) |
  | 4 | `motion` 12 → 13 | ✅ tutto verde; da controllare a vista l'animazione del pannello AI | Nessuno |
  | 5 | Actions `checkout` e `setup-node` a v7 | Non verificabile in locale; il commento di versione rispetta `tests/workflows.test.ts`. Consigliata: le v4 sono scritte per Node 20, che GitHub sta ritirando dai runner (la CI è ancora verde al 2026-09-24) | La CI della PR stessa deve essere verde su Node 22 e 24 |

- [ ] **P1 — Policy di aggiornamento documentata in `CONTRIBUTING.md`:** aggiornamenti di sicurezza entro 48 ore; minor e patch entro 7 giorni se la CI è verde; ogni major in una PR dedicata, con lettura del changelog, smoke test e verifica manuale dell'area coinvolta. **S**
- [ ] 🟡 **P1 — Migrazione a Express 5**, sostituisce la voce P2 precedente: il fallback della SPA è ora un middleware finale compatibile con Express 4 e 5 (smoke test verde con 4.22.3 e 5.2.1); anche le API senza corpo JSON rispondono 400 e non 502 con Express 5 (`req.body ?? {}`); resta da integrare la PR di Dependabot e sfruttare la gestione nativa degli errori asincroni. **S**
- [ ] **P2 — Pulizia dei branch remoti già integrati** (`codex/adaptive-learning-hardening`, `claude/loving-brown-fmfu60`, `claude/elegant-turing-xo631b`), dopo aver verificato che non contengano commit mancanti in `main`. **S**

#### Collaborazione e manutenzione

- [ ] **P0 — Creare `CONTRIBUTING.md`:** setup, `npm run check`, convenzioni editoriali, come aggiungere una domanda (IT + EN + test), regole per fonti e traduzioni. **S**
- [ ] **P0 — Aggiungere template di issue e pull request:** errore nel contenuto, proposta didattica, nuova domanda, nuovo lab, bug dell'app; le vulnerabilità vanno invece segnalate tramite `SECURITY.md`. **S**
- [ ] **P0 — Creare `CHANGELOG.md`** con formato *Keep a Changelog*, ricostruendo le tappe principali dalla cronologia git. **S**
- [ ] **P1 — Definire `CODEOWNERS`:** contenuti, sicurezza (`server.ts`, workflow, dipendenze), traduzioni e UX.
- [ ] **P1 — Policy di versionamento:** SemVer applicato all'app; correzioni di contenuto = patch, nuove domande o sezioni = minor, cambi del formato dei dati salvati o del syllabus = major.
- [ ] **P1 — Processo di deprecazione:** contenuti superati marcati `deprecated` con motivazione, senza rimozione immediata.
- [ ] **P2 — Automatizzare le issue ricorrenti:** revisione link, aggiornamento fonti, audit dipendenze e parità linguistica.

**Criteri di accettazione:** una nuova domanda o pagina si aggiunge seguendo un template e un test la valida; la pull request riceve feedback automatico chiaro; indice e matrice di copertura non richiedono aggiornamenti manuali.

---

### 🛡️ Security Posture & Content

**Obiettivo:** rendere il progetto sicuro da mantenere e da esporre, tecnicamente affidabile e adatto a esercitazioni controllate.

#### Governance e sicurezza del repository (supply chain)

- [x] **P0 — `SECURITY.md`:** canale privato tramite GitHub Security Advisories, ambito e regole di disclosure responsabile, in IT e EN.
- [x] **P0 — Minimo privilegio nei workflow:** `permissions: contents: read` dichiarato a livello di workflow.
- [x] **P0 — Lockfile versionato:** `package-lock.json` presente e installazione con `npm ci`.
- [x] **P0 — Fissare le GitHub Actions a commit SHA immutabili:** `checkout` e `setup-node` fissate a v4.4.0 con commento della versione, `persist-credentials: false`, processo di aggiornamento documentato in `ci.yml` e imposto da `tests/workflows.test.ts` — 2026-09-24.
- [x] **P0 — Secret scanning:** job `Secret scan (gitleaks)` in `.github/workflows/security.yml` su ogni push, pull request e settimanalmente, sull'intera cronologia; `.gitleaks.toml` mantiene le regole predefinite con due sole eccezioni motivate (nomi di chiavi di `localStorage` e identificativi della checklist, unici 4 falsi positivi su 130 commit) — 2026-09-24. Da verificare nelle impostazioni del repository che *secret scanning* e *push protection* di GitHub siano attivi.
- [x] **P0 — Audit delle dipendenze:** Dependabot per `npm` e `github-actions` (settimanale, attesa di 7 giorni, minor/patch raggruppati) e job `Dependency audit (npm)` con `npm audit --omit=dev --audit-level=high` — 2026-09-24. Esito attuale: 0 vulnerabilità nelle dipendenze di produzione.
- [x] **P0 — SAST pertinente:** job `CodeQL (JavaScript/TypeScript)` con la suite `security-extended`, senza build, risultati nella scheda Security — 2026-09-24. Se nel repository è attivo il *default setup* di CodeQL, va disattivato perché va in conflitto con questa configurazione avanzata.
- [ ] 🟡 **P1 — Dependency review sulle pull request:** job `Dependency review` che blocca le PR che introducono dipendenze con vulnerabilità `high` o `critical` — 2026-09-24. Manca il controllo delle licenze incompatibili con MIT, da aggiungere con un elenco `allow-licenses` verificato sulle dipendenze attuali.
- [ ] **P1 — OpenSSF Scorecard** come indicatore periodico della postura del repository.
- [ ] **P1 — Branch protection:** review obbligatoria, status check richiesti, conversazioni risolte, divieto di force push su `main`.
- [ ] **P1 — SBOM (CycloneDX) allegato alle release** dell'app.
- [ ] **P1 — Scansione container e IaC:** solo quando verrà aggiunto un `Dockerfile` o una configurazione di deploy (vedi sotto).
- [ ] **P2 — Firma delle release e attestazione di provenienza** (GitHub artifact attestation / SLSA) per build e immagini.

#### Sicurezza dell'applicazione (AppSec)

- [x] **P0 — Chiave API solo lato server:** il browser non riceve mai `GEMINI_API_KEY`; `.env*` escluso da git.
- [x] **P0 — Header di sicurezza in produzione:** `helmet` con CSP restrittiva (`default-src 'self'`, `object-src 'none'`, `frame-ancestors 'self'`).
- [x] **P0 — Limiti sugli input:** body JSON max 64 kB, messaggio max 2.000 caratteri, history max 8 turni, max 10 argomenti da 120 caratteri.
- [x] **P0 — Rate limiting** su `/api/` (30 richieste ogni 15 minuti per IP) con `trust proxy` in produzione.
- [x] **P0 — Nessuna fuga di dettagli interni:** gli errori del provider restano nei log del server.
- [x] **P0 — Output AI reso senza `innerHTML`:** il Markdown è convertito in JSX, quindi il testo generato non può iniettare HTML.
- [ ] **P0 — Timeout e annullamento delle chiamate Gemini** (es. 30 s con `AbortSignal`), per non tenere occupate connessioni e memoria. **S**
- [ ] **P0 — Limitare anche l'output della chat:** `maxOutputTokens` su `/api/chat` come già avviene per la remediation. **S**
- [ ] **P0 — Tetto di spesa globale (denial of wallet):** contatore giornaliero complessivo delle chiamate AI configurabile via env, oltre al limite per IP. **S**
- [ ] **P1 — Rimuovere l'header `User-Agent: aistudio-build`** residuo del template, o renderlo configurabile, per non falsare l'identità del client. **S**
- [ ] **P1 — Endpoint `/healthz`** senza dati sensibili e **arresto graduale** su `SIGTERM` per le piattaforme PaaS. **S**
- [ ] **P1 — Log strutturati** (livello, route, esito, latenza) senza contenuto dei messaggi degli utenti e senza chiavi. **S**
- [ ] **P1 — Irrigidire la CSP:** ospitare i font localmente per eliminare `fonts.googleapis.com`/`fonts.gstatic.com` e valutare la rimozione di `'unsafe-inline'` dagli stili; aggiungere `base-uri 'self'` e `form-action 'self'`. **M**
- [ ] **P1 — Validazione degli input con schema** (es. Zod) condiviso tra client e server al posto dei controlli manuali. **M**
- [ ] **P1 — Protezione minima degli endpoint AI in deploy pubblici:** opzione per richiedere un token d'accesso o disattivare l'AI via variabile d'ambiente. **M**
- [ ] **P1 — Container di deploy sicuro:** `Dockerfile` multi-stage, utente non root, filesystem in sola lettura, immagine base minimale e versione fissata. **M**
- [ ] **P1 — Migrazione a Express 5:** spostata in [Aggiornamento delle dipendenze](#aggiornamento-delle-dipendenze), perché Dependabot l'ha già proposta.

#### Sicurezza della componente AI (OWASP Top 10 for LLM Applications)

- [x] **LLM01 — Prompt injection (mitigazione di base):** il system prompt dichiara che i messaggi e gli argomenti dell'utente sono dati, non istruzioni.
- [x] **LLM05 — Gestione dell'output:** la remediation usa uno schema JSON e l'output è validato da `validateRemediationPayload` prima dell'uso.
- [x] **LLM10 — Consumo illimitato (parziale):** rate limit per IP e limiti sugli input; da completare con timeout, `maxOutputTokens` sulla chat e tetto globale (sopra).
- [ ] **P1 — Suite di test anti-injection:** raccolta di prompt malevoli noti eseguita contro il client simulato per verificare che le regole non vengano aggirate e che l'output resti valido. **M**
- [ ] **P1 — Avviso trasparente nell'interfaccia:** le risposte AI possono contenere errori e non sostituiscono i materiali ufficiali; i messaggi non vanno usati per dati personali. **S**
- [ ] **P1 — Revisione umana delle domande AI:** le domande di remediation restano marcate come generate e non entrano mai nella banca domande senza revisione.
- [ ] **P2 — Astrazione del provider AI:** interfaccia unica per poter cambiare modello o fornitore senza toccare le route.

#### Integrità e privacy dei dati locali

- [x] **P0 — Persistenza solo nel browser:** progressi, storico e segnalibri restano in `localStorage`; nessun account.
- [x] **P0 — Lettura difensiva:** `storage.ts` non lancia mai eccezioni; `sanitizeQuizHistory` e `sanitizeQuestionProgress` scartano dati corrotti o manipolati.
- [ ] **P1 — Versionare lo schema dei dati salvati** e prevedere migrazioni testate (oggi solo `question_progress_v1` è versionato). **S**
- [ ] **P1 — Esportazione e importazione dei progressi in JSON**, con validazione tramite gli stessi sanificatori e nessun upload al server. **M**
- [ ] **P1 — Pulsante "Cancella tutti i miei dati"** con conferma, per rendere esplicito il controllo dell'utente. **S**

#### Qualità e correttezza dei contenuti

- [x] **P0 — Copertura SY0-701 verificata da test:** ogni obiettivo numerato è coperto e la distribuzione delle domande resta entro ±5% dei pesi ufficiali.
- [x] **P0 — Spiegazione di tutte le opzioni:** i test verificano che la spiegazione nomini le risposte corrette e discuta ogni distrattore, in IT e EN.
- [ ] **P0 — Matrice di copertura per obiettivo pubblicata:** dominio, obiettivo, numero di domande, livelli cognitivi, sottovoci, data dell'ultima revisione (generata, vedi CI). **M**
- [ ] **P0 — Distinguere fonti primarie e secondarie:** privilegiare obiettivi ufficiali CompTIA, NIST, RFC, OWASP, CIS e documentazione dei vendor.
- [ ] **P0 — Citazioni verificabili:** ogni affermazione normativa, configurazione sensibile o dato soggetto a cambiamento indica fonte e data di consultazione.
- [ ] **P0 — Revisionare gli esempi per evitare cattive pratiche:** nessuna credenziale reale, disabilitazione ingiustificata dei controlli o comando distruttivo copiabile senza avvertenze.
- [ ] **P0 — Separare teoria d'esame e pratica reale:** evidenziare semplificazioni e differenze tra concetto, prodotto e implementazione.
- [ ] **P1 — Peer review tecnica** sui contenuti ad alto impatto: una revisione per accuratezza, una per chiarezza.
- [ ] **P1 — Etichettare la freschezza dei contenuti** (`reviewed`, `needs-review`, `deprecated`) con data e responsabile.
- [ ] **P1 — Errata e storico correzioni:** rendere trasparenti gli errori sostanziali già corretti (la cronologia git ne contiene molti: glossario, Dominio 1–5, terminologia).
- [ ] **P1 — Collegare attacchi, controlli e rilevazione:** per ogni scenario indicare vettore, impatto, mitigazione, evidenza e limite del controllo.
- [ ] **P2 — Mappare i contenuti a framework complementari:** NIST CSF 2.0, MITRE ATT&CK, CIS Controls v8 o NICE, senza sostituire gli obiettivi CompTIA.

#### Laboratori pratici sicuri

- [ ] **P0 — Policy per i lab:** uso esclusivo in ambienti autorizzati e isolati; divieto di bersagli pubblici o sistemi di terzi.
- [ ] **P0 — Template standard:** obiettivi e codice obiettivo SY0-701, scenario, prerequisiti, topologia, durata, rischio, setup, esercizio, evidenze, cleanup e domande finali.
- [ ] **P0 — Isolamento e ripristino:** rete locale dedicata, dati sintetici, snapshot e comandi di cleanup testati.
- [ ] **P0 — Classificazione del rischio:** `low`, `moderate`, `advanced-controlled`, con avvertenze prima dei passaggi sensibili.
- [ ] **P1 — Lab difensivi introduttivi:** analisi log, hardening Linux, IAM, gestione certificati, backup, segmentazione e incident triage.
- [ ] **P1 — Lab "sul progetto stesso":** usare questa app come caso di studio (lettura degli header di sicurezza, test del rate limit in locale, analisi del threat model, prompt injection sul proprio server), collegandoli agli obiettivi 2.x, 3.x e 4.x.
- [ ] **P1 — Scenari attack-to-defense:** osservare un comportamento malevolo simulato e poi configurare prevenzione, rilevazione e risposta.
- [ ] **P1 — Dati sintetici versionati:** log, IOC fittizi, configurazioni volutamente vulnerabili ed expected output privi di dati personali.
- [ ] **P1 — Validazione automatica dell'ambiente:** preflight per virtualizzazione, porte, risorse e assenza di esposizione pubblica involontaria.
- [ ] **P1 — Soluzioni progressive:** hint, soluzione ragionata, indicatori di successo ed errori comuni.
- [ ] **P2 — Lab containerizzati riproducibili:** immagini minimali, non privilegiate, versioni fissate e teardown automatico.
- [ ] **P2 — Telemetria didattica locale:** mostrare quali eventi sarebbero visibili a endpoint, rete, identity e SIEM.

**Criteri di accettazione:** nessun segreto rilevato; workflow a privilegi minimi e azioni fissate a SHA; endpoint AI con limiti di tempo, dimensione e costo; ogni lab è isolabile e ripristinabile; ogni contenuto critico presenta fonte, contesto e data di revisione.

---

### 🎨 Documentation & UX

**Obiettivo:** massimizzare comprensione, orientamento e continuità dello studio.

#### Architettura dell'informazione

- [x] **P0 — README come landing page:** scopo, funzionalità, prerequisiti, installazione per sistema operativo, architettura e risoluzione problemi, in IT e EN.
- [x] **P0 — Navigazione per i cinque domini:** stesso ordine e stessi nomi in checklist, guide, glossario e simulatore.
- [ ] 🟡 **P0 — Rendere visibile la copertura:** oggi è verificata dai test ma non mostrata; esporre nel README e nell'app una tabella basata su obiettivi, non sul numero di file. **S**
- [x] **P0 — Area di studio illeggibile su mobile:** `#study_panel_wrapper` aveva altezza 0 a 390 px; ora è un blocco a piena altezza sotto la checklist (`flex-none h-full`, layout affiancato invariato da `md` in su), verificato con Playwright a 390, 768 e 1280 px — 2026-09-24. Resta da aggiungere un test end-to-end in CI (vedi sotto).
- [ ] **P0 — Percorsi di studio:** principiante, ripasso rapido, preparazione all'esame e consolidamento pratico, come pagina iniziale guidata ("Da dove inizio?"). **M**
- [ ] **P1 — Collegare prerequisiti e passi successivi:** ogni modulo indica cosa conoscere prima e dove proseguire.
- [ ] 🟡 **P1 — Integrare ricerca e glossario:** la ricerca nel glossario esiste; manca il collegamento contestuale dei termini dalle sottovoci, dalle spiegazioni dei quiz e dai sotto-argomenti ufficiali mostrati nelle guide.
- [ ] **P1 — Separare contenuto principale e approfondimenti** con divulgazione progressiva coerente.
- [ ] **P2 — Vista "Exam readiness":** progressi per dominio e per obiettivo, pesati con `OFFICIAL_DOMAIN_WEIGHTS`, punti deboli e domande in scadenza per il ripasso.

#### Sistema editoriale e leggibilità

- [x] **P1 — Guide di dominio arricchite:** tabelle comparative, errori comuni, esercizi guidati con soluzione nascosta e mappa dei sotto-argomenti ufficiali per obiettivo, con test di completezza (`tests/domainGuides.test.ts`). Completate tutte e cinque le guide (2026-09-24).
- [ ] **P0 — Template coerenti** per sottovoce, confronto, procedura, comando, domanda, scenario e lab.
- [ ] **P0 — Gerarchia dei titoli corretta:** un solo H1, sezioni brevi, ancore stabili e sommario per le pagine lunghe.
- [ ] **P0 — Callout standard:** `Nota`, `Esame`, `Pratica`, `Attenzione`, `Errore comune`, `Approfondimento`.
- [ ] **P0 — Blocchi di codice:** linguaggio dichiarato, prompt distinguibile, output separato e righe pericolose commentate.
- [ ] 🟡 **P1 — Tabelle solo per confronti reali**, leggibili anche su mobile: le `comparativeTable` delle sottovoci e le tabelle delle guide scorrono già dentro il proprio riquadro; resta la revisione editoriale delle tabelle troppo dense.
- [ ] **P1 — Riepiloghi di fine modulo:** concetti chiave, acronimi, errori frequenti e autovalutazione.
- [x] **P1 — Esempi progressivi negli scenari:** le guide di dominio includono scenari applicati e ogni domanda si apre con uno scenario.
- [ ] **P1 — Style guide:** tono, terminologia, maiuscole, acronimi, nomi dei controlli e traduzioni approvate (partire dalle scelte già fatte, es. «access control vestibule» al posto di «mantrap»).
- [x] **P1 — Parità semantica IT/EN verificata strutturalmente** dai test; la revisione semantica umana resta nella peer review.
- [x] **P1 — Parità dei contenuti IT/EN verificata automaticamente:** per ogni frase di guide, sottovoci, glossario e domande i numeri, le sigle e i token letterali devono coincidere nelle due lingue (`tests/languageParity.test.ts`, `tests/helpers/languageFacts.ts`); le differenze solo idiomatiche stanno in un elenco revisionato — 2026-09-24.
- [ ] **P1 — Traduzioni da rivedere dopo una modifica:** quando cambia un testo italiano, segnalare in CI la frase inglese corrispondente come da rivedere (per esempio confrontando l'hash del testo sorgente salvato accanto alla traduzione), perché il controllo dei fatti non coglie le differenze di significato. **M**

#### Accessibilità e inclusione (obiettivo: WCAG 2.2 AA)

- [ ] **P0 — Testo alternativo informativo** per banner e immagini; icone decorative con `aria-hidden`.
- [ ] **P0 — Non affidarsi solo al colore:** risposta corretta/errata, stato e rischio con etichetta testuale o icona (verificare il simulatore e i risultati).
- [ ] **P0 — Contrasto e leggibilità:** verifica sul tema scuro attuale, inclusi testi `slate-500` su sfondo scuro.
- [ ] **P0 — Navigazione completa da tastiera nel quiz:** focus visibile, ordine logico, opzioni selezionabili con tastiera, annuncio del risultato con `aria-live`. **M**
- [ ] **P1 — Rispetto di `prefers-reduced-motion`** per le animazioni `motion` (`useReducedMotion` o `MotionConfig reducedMotion="user"`). **S**
- [ ] **P1 — Test end-to-end di accessibilità e layout:** Playwright con `axe-core` su studio, guide, glossario e quiz, a 390 e 1280 px, integrato in CI; deve fallire se il pannello di studio torna ad altezza 0 o se la pagina scorre in orizzontale. **M**
- [ ] **P1 — Timer accessibile:** avviso prima della scadenza e possibilità di estendere o disattivare il tempo (WCAG 2.2.1).
- [ ] **P1 — Versioni testuali dei diagrammi** e link descrittivi (niente "clicca qui").
- [ ] **P1 — Limitare emoji decorative e badge** come unica fonte di informazione.
- [ ] **P2 — Test manuali periodici:** screen reader (NVDA, VoiceOver), zoom al 200%, viewport mobile.

#### Apprendimento e valutazione

- [x] **P0 — Banca domande strutturata:** ID, argomento, livello cognitivo, scenario, opzioni, una o più risposte corrette e spiegazione; validata dai test.
- [x] **P0 — Spiegare tutte le opzioni:** imposto da test in entrambe le lingue.
- [x] **P0 — Contenuti originali, nessun dump:** dichiarato in README e verificato con controllo delle coppie di domande troppo simili.
- [ ] 🟡 **P1 — Quiz per obiettivo:** oggi la selezione è per dominio; con il campo `objectives` diventa possibile filtrare per obiettivo e rimandare all'esercizio guidato e alla tabella della guida che lo trattano.
- [ ] **P1 — Scenari performance-based originali:** ordinamento, abbinamento, interpretazione di log, risposta a incidente e scelta del controllo. **L**
- [x] **P1 — Livelli cognitivi bilanciati:** i test impongono che in ogni dominio prevalgano domande di livello superiore.
- [x] **P1 — Ripasso spaziato locale:** intervalli 1-3-7-14-30 giorni, errori riproposti subito, nessuna raccolta di dati.
- [ ] 🟡 **P2 — Simulazioni temporizzate:** timer opzionale già presente; mancano blueprint configurabile (numero domande, distribuzione per dominio) e analisi post-sessione per obiettivo.

**Criteri di accettazione:** uno studente individua rapidamente il punto di partenza, segue un percorso coerente, usa l'app anche solo da tastiera e comprende l'errore dopo ogni domanda senza dipendere da conoscenze implicite.

---

## 🧭 Piano di esecuzione consigliato

| Milestone | Focus | Dipendenze | Stato | Risultato atteso |
|---|---|---|---|---|
| **M0 — Baseline** | Audit, inventario, threat model, mappatura per domanda | Nessuna | 🟡 Parziale | Backlog verificato e rischi noti |
| **M1 — Fondazioni** | CONTRIBUTING, CHANGELOG, template, identità del pacchetto, Node LTS | M0 | 🟡 Node LTS e identità del pacchetto completati | Repository contribuibile |
| **M2 — Quality & Security Gate** | Action a SHA, Dependabot e smistamento delle sue PR, smoke test di avvio, gitleaks, CodeQL, npm audit, Markdown lint, link check | M1 | 🟡 CI, Action a SHA e Dependabot presenti; 6 PR di Dependabot da smistare | Pull request controllate automaticamente, dipendenze aggiornate senza regressioni |
| **M3 — Hardening AppSec/AI** | Timeout, tetti di costo, health check, CSP, test API e anti-injection | M2 | 🟡 Difese di base presenti | App esponibile in modo sicuro |
| **M4 — Refactoring senza regressioni** | Scomposizione di `App.tsx` e `server.ts`, test di componenti | M2 | Da pianificare | Codice manutenibile, comportamento invariato |
| **M5 — Content Quality** | Obiettivi per domanda, fonti, freschezza, errata, style guide | M0–M2 | 🟡 Guide complete per i 5 domini, parità IT/EN automatica; mancano obiettivi per domanda, fonti e date di revisione | Materiale coerente e verificabile |
| **M6 — Active Learning & A11y** | Percorsi, quiz per obiettivo, PBQ, tastiera, reduced motion, axe | M4–M5 | 🟡 Ripasso spaziato, esercizi guidati con soluzione nascosta e layout mobile corretto | Studio applicato e accessibile |
| **M7 — Learning Platform** | Exam readiness, export progressi, lab, simulazioni configurabili | M5–M6 | Da pianificare | Esperienza didattica completa |

### Ordine delle prossime attività

Ordinate per rapporto rischio ridotto / sforzo, ognuna in una PR separata. Le prime tre sono completate; la nuova n. 4 viene prima delle altre perché le PR di Dependabot sono già aperte e una di esse romperebbe l'avvio in produzione.

1. [x] Completare l'inventario del repository (audit del 2026-09-24, PR #37).
2. [x] Aggiornare Node.js alla LTS in CI e `engines`, correggere `name`/`version` in `package.json` (PR #38).
3. [x] Fissare le Actions a SHA e aggiungere Dependabot (`npm` + `github-actions`) (PR #39).
4. [ ] 🟡 Aggiungere lo smoke test di avvio in produzione alla CI, poi smistare le PR di Dependabot secondo la tabella in [Aggiornamento delle dipendenze](#aggiornamento-delle-dipendenze): smoke test e correzioni completati, tutte le PR verificate; resta da integrarle nell'ordine indicato. **S + M**
5. [x] Aggiungere un workflow `security.yml`: gitleaks, CodeQL, `npm audit`, dependency review (2026-09-24).
6. [ ] Hardening degli endpoint AI: timeout, `maxOutputTokens` sulla chat, tetto giornaliero, `/healthz`. **S**
7. [ ] Pubblicare `CONTRIBUTING.md` (con la policy di aggiornamento delle dipendenze), `CHANGELOG.md`, template di issue/PR e `CODEOWNERS`. **S**
8. [ ] Aggiungere il campo `objectives` alle domande con test obbligatorio, poi generare la matrice di copertura. **M**
9. [ ] Test end-to-end con Playwright e `axe-core` su telefono e desktop; poi quiz completamente usabile da tastiera e rispetto di `prefers-reduced-motion`. **M**
10. [ ] Aggiungere test API (Supertest) e i primi test di componenti, poi estrarre la prima sezione da `App.tsx`. **M**
11. [ ] Esportazione/importazione dei progressi e pulsante per cancellare i dati locali. **M**

---

## 🚀 Roadmap futura — Next Steps

- [ ] 🟡 **Quiz interattivi offline-first:** quiz e progressi già funzionano senza account; manca il funzionamento senza rete (PWA con service worker per dataset e interfaccia; l'AI resta online e opzionale).
- [ ] 🟡 **Motore di ripasso adattivo:** ripasso spaziato per domanda già attivo; estenderlo agli obiettivi e suggerire la sottovoce da rileggere.
- [ ] **Simulatore d'esame configurabile:** numero di domande, distribuzione per dominio, PBQ e analisi per obiettivo.
- [ ] **Lab on demand:** ambienti temporanei, isolati e ripristinabili con costi e limiti indicati.
- [ ] **Repository di dataset didattici:** log sintetici, PCAP sanificati, alert, timeline e IOC fittizi con licenza esplicita.
- [ ] **Percorsi Blue Team e Red Team etici:** collegare gli stessi concetti a prevenzione, rilevazione e validazione autorizzata.
- [ ] **Modalità portfolio:** report, runbook e write-up sanificati riutilizzabili professionalmente.
- [ ] **Dashboard di maturità del progetto:** copertura, freschezza, link, accessibilità, sicurezza (Scorecard) e stato delle traduzioni.
- [ ] **Release per aggiornamenti d'esame:** strategia di migrazione quando cambieranno codice, obiettivi o terminologia della certificazione (successore di SY0-701).
- [ ] **Community review periodica:** sessioni per dominio con revisori tecnici, didattici e linguistici.

---

## 📊 Metriche di successo

| Area | Indicatore | Baseline 2026-09-24 | Target iniziale |
|---|---|---|---|
| Copertura | Obiettivi coperti da almeno una sottovoce | 100% (verificato da test) | 100% |
| Copertura | Domande collegate esplicitamente a un obiettivo | 0% (campo assente) | 100% |
| Qualità | Test automatici verdi su `main` | Sì | Sempre |
| Qualità | Link interni validi | Non misurato | 100% |
| Sicurezza | Segreti confermati nella branch principale | 0 su 130 commit (gitleaks 8.30.1, 2026-09-24) | 0 |
| Sicurezza | Workflow con permessi espliciti | 100% | 100% |
| Sicurezza | Actions fissate a SHA | 0% → 100% (2026-09-24) | 100% |
| Sicurezza | Vulnerabilità `high`/`critical` nelle dipendenze di produzione | 0 (`npm audit`, 2026-09-24) | 0 |
| Sicurezza | Endpoint AI con timeout, limite di input/output e rate limit | 0 su 2 completi | 2 su 2 |
| Manutenzione | Voci con data e stato di revisione | 0% | 100% |
| Manutenzione | Righe di `src/App.tsx` | ~2.640 (erano ~2.550 all'audit iniziale) | < 500 |
| Didattica | Domande con spiegazione di tutte le opzioni | 100% (verificato da test) | 100% |
| Didattica | Domini con guida completa (ogni sotto-argomento ufficiale, tabelle, errori comuni, un esercizio per obiettivo) | 5 su 5 (verificato da test) | 5 su 5 |
| Manutenzione | PR di Dependabot aperte da più di 14 giorni | 0 (6 aperte, tutte del 2026-09-24) | 0 |
| Qualità | Avvio in produzione verificato automaticamente | Sì, dal 2026-09-24 (`npm run smoke` in CI) | Sì, a ogni pull request |
| Laboratori | Lab con isolamento e cleanup verificati | Nessun lab | 100% dei lab pubblicati |
| Accessibilità | Violazioni axe gravi o critiche sulle viste principali | Non misurato | 0 |
| Localizzazione | Campi tradotti per domanda e sottovoce | 100% (verificato da test) | 100% |
| Localizzazione | Coppie di frasi IT/EN con gli stessi numeri, sigle e token | 100% di 7.979, più tutte le guide (2 eccezioni revisionate) | 100% |
| Contributor UX | Tempo di `npm ci && npm run check` | Non documentato | Documentato e ripetibile |

> Le metriche devono misurare qualità reale. Non vanno usate per incentivare contenuti superficiali, duplicati o creati soltanto per aumentare una percentuale.

---

## ⚠️ Rischi da gestire

| Rischio | Impatto | Mitigazione |
|---|---|---|
| Contenuti obsoleti | Studio di concetti non più pertinenti | Owner, data di revisione e issue periodiche |
| Automazione eccessiva | Falsi positivi e manutenzione onerosa | Strumenti pertinenti, baseline e override motivati |
| Traduzioni divergenti | Ambiguità tecnica | Glossario condiviso, test di parità e review bilingue |
| Lab esposti o distruttivi | Danno a sistemi o reti | Isolamento, preflight, dati sintetici e cleanup |
| Domande troppo simili all'esame | Rischio etico e di proprietà intellettuale | Contenuti originali basati sugli obiettivi |
| Dipendenze non affidabili | Compromissione della supply chain | Pinning a SHA, Dependabot, dependency review, privilegi minimi |
| Runtime fuori supporto | Nessuna patch di sicurezza per Node.js | Allineamento alla LTS attiva, campo `engines`, `.nvmrc` e matrice CI rivista a ogni fine vita |
| Abuso degli endpoint AI | Costi imprevisti (denial of wallet) o servizio indisponibile | Rate limit per IP, tetto globale, timeout, opzione per disattivare l'AI |
| Prompt injection o risposte AI errate | Contenuti fuorvianti presentati come autorevoli | Istruzioni difensive, schema e validazione dell'output, avviso nell'interfaccia, nessuna promozione automatica nella banca domande |
| Refactoring del monolite `App.tsx` | Regressioni nell'interfaccia o perdita dei progressi salvati | Test di componenti prima dell'estrazione, una sezione per PR, migrazioni dei dati testate |
| Aggiornamento major che passa la CI ma rompe l'avvio | App non disponibile al primo deploy (caso concreto: Express 5 e la rotta `"*"`) | Smoke test di avvio in produzione, una PR per major, lettura del changelog |
| Regressioni di layout non coperte da test | Aree dell'app inutilizzabili su alcuni dispositivi (caso concreto: pannello di studio ad altezza 0 su telefono) | Test end-to-end su più viewport in CI |
| Traduzione corretta nei fatti ma non nel significato | Uno studente di una lingua impara una regola diversa | Segnalazione delle traduzioni da rivedere, revisione bilingue |
| File di contenuto danneggiati da un caricamento | Perdita silenziosa di contenuti (caso concreto: `9098ba5`) | Test di integrità dei dataset in CI, revisione del diff prima di unire, dimensione dei file controllata |
| Crescita senza struttura | Navigazione e manutenzione difficili | Template, tassonomia e governance editoriale |

---

## ✅ Checklist per ogni nuovo contenuto

- [ ] È collegato a uno o più obiettivi SY0-701 (campo `objectives` quando disponibile).
- [ ] Dichiara prerequisiti, livello e risultati di apprendimento.
- [ ] Usa fonti autorevoli e indica la data di verifica quando pertinente.
- [ ] Distingue ciò che serve per l'esame da ciò che dipende dal contesto reale.
- [ ] Non contiene segreti, dati personali o comandi pericolosi non contestualizzati.
- [ ] Include esempi originali e legalmente distribuibili.
- [ ] È presente in italiano e in inglese e rispetta template, glossario e terminologia.
- [ ] Supera `npm run check`, lint del Markdown, link check e controlli di sicurezza.
- [ ] È accessibile senza affidarsi solo a colore, immagini o formattazione visiva.
- [ ] Indica owner, data dell'ultima revisione e prossimo controllo.

## ✅ Checklist per ogni modifica al codice

- [ ] Nessun cambio di comportamento non dichiarato; i refactoring sono separati dalle nuove funzionalità.
- [ ] Nuovi input dal client sono validati e limitati lato server.
- [ ] Nessun uso di `dangerouslySetInnerHTML` o `innerHTML` su testo proveniente da utenti o AI.
- [ ] Nessuna nuova dipendenza senza motivazione, controllo della licenza e della manutenzione.
- [ ] I dati salvati in `localStorage` mantengono la compatibilità o hanno una migrazione testata.
- [ ] Le interazioni nuove funzionano da tastiera e hanno etichette accessibili in IT e EN.
- [ ] `npm run check` e `npm run build` passano.

---

## 📝 Registro avanzamento

| Data | Milestone | Modifica | Issue/PR | Stato |
|---|---|---|---|---|
| 2026-09-17 | M5 | Spiegazione obbligatoria di ogni distrattore in IT e EN, coerenza tra sorgente italiana e localizzazione | Cronologia git (`718daab`, `3e562e5`) | Completato |
| 2026-09-18 | M5 | Revisione del glossario (550 voci) e delle domande deboli | PR #29–#31 | Completato |
| 2026-09-21 | M5 | Riscrittura dei cluster più poveri del glossario | PR #34, #35 | Completato |
| 2026-09-22 | M6 | Ripasso spaziato adattivo e hardening dei progressi persistiti | `bf529c0`, `dc00db6` | Completato |
| 2026-09-22 | M5 | Test di accuratezza e integrità, guide di dominio con scenari applicati | `9098ba5`, `014585f`, `3440958` | Completato |
| 2026-09-24 | M0 | Audit del repository e roadmap riallineata allo stato reale | PR #37 | Completato |
| 2026-09-24 | M1 | Node 22/24 in CI, `.nvmrc`, `engines`, nome e versione del pacchetto, prerequisiti del README | PR #38 | Completato |
| 2026-09-24 | M5 | `src/data.ts` e `src/data.en.ts` troncati dal commit `9098ba5`: conservati solo i primi e gli ultimi 384 KiB (questi slittati di 2 bit), ~1,6 MB centrali persi per file; typecheck, test e build di `main` fallivano. Risolto ripristinando i due file alla versione precedente (le correzioni di contenuto di `9098ba5` non sono recuperate) | `9098ba5`, `af7b320`, PR #38 | Completato |
| 2026-09-24 | M2 | Actions fissate a SHA (v4.4.0), `persist-credentials: false`, Dependabot per npm e Actions, test `tests/workflows.test.ts` | PR #39 | Completato |
| 2026-09-24 | M5 | Guida del Dominio 1 arricchita: sotto-argomenti ufficiali 1.1–1.4, 5 tabelle comparative, 8 errori comuni, 6 esercizi guidati, percorso e verifiche estesi, in IT e EN | PR #46 | Completato |
| 2026-09-24 | M6 | Area di studio resa leggibile su mobile (pannello a piena altezza sotto la checklist) | PR #47 | Completato |
| 2026-09-24 | M5 | Guida del Dominio 2 arricchita (sotto-argomenti 2.1–2.5, 5 tabelle, 8 errori comuni, 6 esercizi); controllo automatico di parità IT/EN esteso a tutti i contenuti, con 9 disallineamenti corretti | PR #47 | Completato |
| 2026-09-24 | M5 | Guida del Dominio 3 arricchita: sotto-argomenti ufficiali 3.1–3.4, 6 tabelle (responsabilità cloud, apparati di rete, fail-open/fail-closed, siti alternativi, tecniche di copia, stati del dato), 8 errori comuni, 6 esercizi, in IT e EN con parità verificata | PR #48 | Completato |
| 2026-09-24 | M5 | Guida del Dominio 4 arricchita: sotto-argomenti ufficiali 4.1–4.9, 7 tabelle (modelli di accesso, dispositivi mobili, SPF/DKIM/DMARC, esiti di scansione, fine vita degli asset, fasi di IR, fonti dati), 8 errori comuni, 9 esercizi (uno per obiettivo), in IT e EN con parità verificata | PR #49 | Completato |
| 2026-09-24 | M5 | Guida del Dominio 5 arricchita: sotto-argomenti ufficiali 5.1–5.6, 7 tabelle (documenti di governance, ruoli sui dati, strategie di rischio, analisi quantitativa, metriche BIA, accordi con terze parti, ambienti di penetration test), 8 errori comuni, 6 esercizi, in IT e EN con parità verificata. Tutte e cinque le guide completate | PR #50 | Completato |
| 2026-09-24 | M2 | Roadmap riallineata dopo le PR #37–#50: smistamento delle 6 PR di Dependabot (con il blocco di avvio di Express 5), smoke test di avvio, test end-to-end di layout, nuovi rischi e metriche | Revisione roadmap | Completato |
| 2026-09-24 | M2 | Smoke test di avvio in produzione in CI; fallback della SPA e lettura del corpo delle API compatibili con Express 5; `vite.config.ts` pronto per Vite 8; 6 PR di Dependabot verificate con ordine di integrazione | Attività n. 4 | Parziale |
| 2026-09-24 | M2 | Workflow `security.yml`: gitleaks con `.gitleaks.toml`, `npm audit`, dependency review, CodeQL; convalidato con actionlint | Attività n. 5 | Completato |

---

## Nota legale ed etica

Questo progetto ha finalità esclusivamente formative. Esempi offensivi, simulazioni e laboratori devono essere eseguiti soltanto su sistemi propri o esplicitamente autorizzati, in ambienti isolati e nel rispetto delle leggi applicabili. CompTIA e Security+ sono marchi dei rispettivi proprietari; il repository è indipendente e non affiliato.
