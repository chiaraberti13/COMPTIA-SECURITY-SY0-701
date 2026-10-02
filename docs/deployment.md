# Anteprime e deploy su Vercel

## Stato

Configurazione pronta nel repository: frontend statico su CDN e API Node 24
separate, sulla stessa origine. Il progetto Vercel e il collegamento GitHub non
sono ancora creati: nessun URL pubblico o deploy live viene dichiarato attivo.
L'attivazione esterna è separata dalla pubblicazione del codice su `main`.

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

Destinazione proposta: team Vercel `chiara11`, progetto
`comptia-security-sy0-701`, repository `chiaraberti13/COMPTIA-SECURITY-SY0-701`.
Non serve un dominio personalizzato.

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

Dopo l'attivazione, registra qui il progetto, gli URL effettivi e l'esito delle
prove live; solo allora la voce della roadmap può essere completata.

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
headers and a dedicated artifact smoke test in CI. Git integration is intended
to create PR previews and publish from `main`. The Vercel project and Git link
have not been activated, and no live deployment is claimed. Preview AI is
always disabled; production defaults off and requires an explicit quota and a
strong access code. Managed secrets never use the `VITE_` prefix. In-memory
limits are per warm instance, not global spending caps. Docker and local
production builds remain supported.
