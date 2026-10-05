# Anteprime e deploy su Vercel

## Stato

Deploy e collegamento GitHub verificati il **2026-10-05** sul progetto già
esistente `chiara11/comp-tia-security-sy-0-701`. Il nome effettivo differisce
da quello proposto inizialmente; viene mantenuto il progetto esistente.
Frontend statico su CDN e API Node 24 separate, sulla stessa origine.

| Destinazione | URL verificato | Evidenza |
|---|---|---|
| Produzione pubblica | [Training Studio](https://comp-tia-security-sy-0-701.vercel.app/) | Deployment `hENZ5S7bLJcw4wFQyK5oWvEENJeZ`, **Ready**, branch `main`, commit `4a823c7` |
| Anteprima della PR 89 | [Anteprima protetta](https://comp-tia-security-sy-0-701-git-claude-stoic-fer-28fcda-chiara11.vercel.app/) | Deployment `B26W7VdXgDTy6ujeoUHwFFkkK6QF`, **Ready**; autenticazione Vercel obbligatoria |

Gli identificativi sopra registrano la verifica iniziale, non l'ultimo commit
distribuito. Ogni push su `main` pubblica una nuova versione; le pull request
del repository generano anteprime. I link delle anteprime richiedono l'accesso
al team Vercel e possono cessare di esistere dopo la chiusura del branch.

## Artefatti e controlli

`npm run build:vercel` genera il formato
[Build Output API v3](https://vercel.com/docs/build-output-api):

- `.vercel/output/static/`: soltanto HTML, CSS, JavaScript, font e risorse pubbliche;
- `.vercel/output/functions/api.func/`: backend Express compilato, non servito dal CDN;
- `.vercel/output/config.json`: header di sicurezza, cache e instradamento.

Il backend riceve `/api`, `/api/*` e `/healthz` prima del fallback SPA. Le API e la
salute non vengono messe in cache. Un asset inesistente restituisce 404 invece di
HTML; gli altri percorsi di studio ricadono su `index.html`. I dati del browser
rimangono locali e appartengono all'origine dell'anteprima o del sito principale.

`npm run smoke:vercel` verifica l'artefatto compilato, l'assenza di file privati nel
CDN, l'isolamento della chiave sentinella di CI, i percorsi, gli header, gli input
invalidi e il blocco delle chiamate AI nelle anteprime. Il job CI dedicato non usa
credenziali Vercel o Gemini reali. La build locale/Docker resta invariata.

## Collegamento Git e ambienti

Destinazione attiva: team Vercel `chiara11`, progetto
`comp-tia-security-sy-0-701`, repository `chiaraberti13/COMPTIA-SECURITY-SY0-701`.
La produzione usa il dominio Vercel indicato sopra.

La procedura seguente descrive le impostazioni da mantenere o riprodurre:

1. Importa questo repository nel progetto Vercel; root `.` e production branch `main`.
2. Usa `vercel.json`: framework Other, installazione `npm ci`, build
   `npm run build:vercel`; il formato v3 descrive frontend e function.
3. Attiva le variabili di sistema Vercel, incluso `VERCEL_ENV`.
4. Mantieni le anteprime protette con l'autenticazione Vercel e il sito di
   produzione pubblico. Le anteprime dei contributi esterni non ricevono segreti.
5. La [integrazione GitHub](https://vercel.com/docs/git/vercel-for-github) produce
   anteprime per le pull request e pubblica da `main`. I check GitHub obbligatori
   proteggono le modifiche che arrivano al branch principale.
6. Al primo deploy verifica `/`, un percorso di studio, `/healthz`, un asset
   esistente e uno inesistente; prova una domanda, il cambio lingua e la tastiera.
   Verifica anche che l'API di un'anteprima non contatti Gemini.

Il runtime configurato nel progetto è Node 24. La protezione **Standard
Protection / Require Log In** è attiva: produzione pubblica, anteprime riservate
al team. L'accesso anonimo all'anteprima verificata restituisce HTTP 302 verso
il flusso di autenticazione; con l'accesso al team l'app si apre correttamente.

## Verifiche live ripetibili

```bash
npm run smoke:live -- https://comp-tia-security-sy-0-701.vercel.app
```

Il controllo richiede HTTPS e un'origine senza percorso, query, frammento o
credenziali. Verifica il router pubblicato dalla piattaforma, oltre al backend:

| Controllo | Esito verificato il 2026-10-05 |
|---|---|
| `/` e header di sicurezza | HTTP 200, shell React, CSP senza inline, `nosniff` |
| Script reale in `/assets/` | HTTP 200, JavaScript, cache `immutable` |
| `/studio/domain/3` | HTTP 200, fallback SPA |
| Asset inesistente | HTTP 404, `no-store`, nessun fallback SPA |
| `/healthz` | HTTP 200, JSON `{"status":"ok"}`, `no-store` |
| API inesistente | HTTP 404, `no-store`, nessun fallback SPA |
| Input invalidi su chat e remediation, IT/EN | HTTP 400, errore JSON, `no-store` |

Le richieste AI sono volutamente **invalide**, quindi vengono fermate prima del
provider e non consumano quota. Per una produzione che richiede il codice AI,
si può fornire `SMOKE_AI_ACCESS_TOKEN` nell'ambiente. Per un'anteprima protetta,
il controllo può usare un `VERCEL_AUTOMATION_BYPASS_SECRET` già configurato dal
team. Nessun codice viene stampato o passato a un'altra origine: i redirect non
sono seguiti e gli asset esterni sono rifiutati. Il controllo non crea codici di
bypass e non modifica la protezione. Dietro un proxy HTTP supportato da Node 24,
si può impostare `NODE_USE_ENV_PROXY=1` per la sola esecuzione.

`tests/smokeLive.test.ts` verifica anche i falsi successi: redirect al login,
API/health/asset mancanti coperti dal fallback HTML, health in cache e asset
su un'altra origine.

Prove di interfaccia eseguite in produzione: avvio del quiz Mini, risposta con
i tasti `3` e `Invio`, spiegazione della risposta e cambio IT/EN durante il quiz.
Nell'anteprima autenticata sono stati verificati il caricamento dell'app e il
Trainer: senza chiave configurata risponde con il messaggio informativo locale
del server, senza contattare Gemini. La chat in questo caso restituisce HTTP
200, non 503; lo smoke dell'artefatto verifica invece HTTP 503 anche con chiave,
codice e quota sintetici, per dimostrare che l'ambiente preview non chiama l'AI.

## Segreti e AI

Chiavi e codici si impostano nelle variabili gestite del progetto, mai in
`vercel.json`, negli artefatti o in variabili con prefisso `VITE_`.

| Variabile | Anteprima | Produzione |
|---|---|---|
| `VERCEL_ENV` | `preview`, dalla piattaforma | `production`, dalla piattaforma |
| `GEMINI_API_KEY` | Non necessaria | Segreto gestito, solo se si attiva l'AI |
| `AI_ACCESS_TOKEN` | Non necessario | Segreto di almeno 16 caratteri per attivare l'AI |
| `AI_DAILY_LIMIT` | Ignorata: limite sempre 0 | 0 predefinito; valore positivo solo per attivazione esplicita |
| `GEMINI_MODEL` | Modello predefinito, senza chiamate | Override opzionale del modello |
| `GEMINI_TIMEOUT_MS` | Nessuna chiamata | Massimo 30 secondi, function limitata a 35 |

L'AI resta disattivata anche in produzione finché quota e codice di accesso non
sono configurati esplicitamente. L'assenza di `VERCEL_ENV` non la abilita.
Il rate limit e il contatore giornaliero sono **per istanza calda**: riavvii e più
istanze non condividono il conteggio. Non sono un tetto globale di spesa; per
attivare un servizio AI pubblico con tetto preciso serve un contatore condiviso
o un backend persistente con quota esterna. Nessun servizio a pagamento viene
attivato da questa configurazione.

## Ripristino

Se una pubblicazione non funziona, ripristina il precedente deployment dal
progetto Vercel e correggi il codice tramite una nuova PR. Non fare force push su
`main`. Per fermare le chiamate AI, imposta `AI_DAILY_LIMIT=0` in produzione e
ridistribuisci; le anteprime sono già disattivate indipendentemente dalla quota.

## English summary

The repository contains a Vercel Build Output API v3 deployment configuration:
static CDN frontend, isolated Node 24 Express API, same-origin routes, security
headers and a dedicated artifact smoke test in CI. Git integration is active in
the existing `chiara11/comp-tia-security-sy-0-701` project: it creates protected
PR previews and publishes from `main`. On 2026-10-05, production (`4a823c7`) and
the preview of PR 89 were both Ready; their verified URLs are recorded above.
Standard Vercel Authentication protects previews while production is public;
the project uses Node 24. Preview AI is always disabled; production defaults
off and requires an explicit quota and a strong access code. Managed secrets
never use the `VITE_` prefix. In-memory limits are per warm instance, not global
spending caps. Docker and local production builds remain supported.

`npm run smoke:live -- https://comp-tia-security-sy-0-701.vercel.app` checks
the deployed shell and security headers, immutable same-origin JavaScript,
SPA fallback, missing assets and unknown APIs (404), JSON health (200,
`no-store`), and invalid chat/remediation input in IT/EN (400). Invalid input
never calls the AI provider. Existing automation bypass and AI access codes
can be supplied through `VERCEL_AUTOMATION_BYPASS_SECRET` and
`SMOKE_AI_ACCESS_TOKEN`; codes are never printed, redirects are not followed
and external assets are rejected. `NODE_USE_ENV_PROXY=1` supports an HTTP proxy
on Node 24. Tests reject false successes caused by login redirects, overbroad
HTML fallback, cached health and cross-origin assets.

The production Mini quiz, answering with `3` and Enter, the answer explanation
and switching IT/EN mid-quiz were checked in the browser. The authenticated
preview loads and its Trainer returns the server's no-key informational
response (200) without calling Gemini. The artifact smoke separately proves
preview AI returns 503 even with synthetic credentials and a positive quota.
