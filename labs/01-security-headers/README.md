# Lab 01 — Leggere gli header di sicurezza dell'app

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.5, 4.1 |
| Rischio | `low` |
| Durata | 30 minuti |

Avvii questa stessa app sul tuo computer, leggi gli header di sicurezza che il server
aggiunge a ogni risposta, vedi il browser bloccare uno script non autorizzato e fai scattare
il limite di richieste. Sono controlli di hardening (2.5) e di sicurezza applicativa (4.1)
che trovi in quasi ogni applicazione web.

## Scenario

Il responsabile della sicurezza deve decidere se l'app di studio può essere pubblicata su un
server aziendale. Ti chiede una verifica rapida: quali protezioni applica il server
all'interfaccia web, quali no, e se gli endpoint AI sono protetti da un uso eccessivo.
Devi consegnare l'elenco degli header con il loro scopo e la prova che il limite di
richieste funziona.

## Prerequisiti

- Node.js 24 e npm, con il repository clonato (vedi il README principale).
- `curl`, già presente su Linux, macOS e Windows 10 o successivi.
- Un browser basato su Chromium o Firefox, per il passaggio 3.
- Nessuna chiave Gemini: l'esercizio non chiama mai l'AI.
- Conoscenze: che cos'è un header HTTP; il Dominio 4 della guida (obiettivo 4.1).

## Topologia

```text
[curl / browser] ──► 127.0.0.1:4190 [app in locale, modalità produzione]
```

Il server ascolta solo sull'interfaccia di loopback: nessun altro computer della rete può
raggiungerlo. Tutte le richieste restano sulla tua macchina.

## Setup

1. Compila l'app in modalità produzione (gli header di sicurezza sono attivi solo lì):

   ```bash
   npm ci
   npm run build
   ```

2. Avvia il server sull'interfaccia di loopback, sulla porta 4190, con l'AI spenta:

   ```bash
   HOST=127.0.0.1 PORT=4190 AI_DAILY_LIMIT=0 NODE_ENV=production npm start
   ```

   Su Windows (PowerShell) imposta prima le variabili, per esempio
   `$env:HOST="127.0.0.1"`, poi lancia `npm start`. Lascia questo terminale aperto e usane
   un altro per i passaggi successivi.

3. Controlla che il server ascolti solo su `127.0.0.1`:

   ```bash
   lsof -nP -iTCP:4190 -sTCP:LISTEN
   ```

   Output ottenuto:

   ```text
   COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
   node    762 root   21u  IPv4   3471      0t0  TCP 127.0.0.1:4190 (LISTEN)
   ```

   Se vedi `*:4190` o `0.0.0.0:4190`, il server è raggiungibile dalla rete: fermalo e
   controlla la variabile `HOST`. In alternativa a `lsof` puoi usare `ss -ltn` (Linux) o
   `netstat -ano` (Windows).

4. Crea la cartella per le evidenze, fuori dal repository:

   ```bash
   mkdir -p ~/lab01
   ```

## Esercizio

### 1. Leggi gli header della pagina

```bash
curl -sI http://127.0.0.1:4190/ | tee ~/lab01/headers.txt
```

Output ottenuto (le righe `Date`, `ETag` e `Last-Modified` cambiano a ogni build):

```text
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self';form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self';upgrade-insecure-requests;connect-src 'self'
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Content-Type: text/html; charset=utf-8
```

Per ciascuno degli header principali, scrivi in `~/lab01/analisi.md` contro che cosa
protegge. Usa questa tabella come traccia e completala:

| Header | Protegge da |
|---|---|
| `Content-Security-Policy` | Esecuzione di script non autorizzati (XSS) e caricamento di risorse da altri siti |
| `X-Frame-Options`, `frame-ancestors` | Clickjacking: la pagina non può essere incorniciata da un altro sito |
| `X-Content-Type-Options: nosniff` | … |
| `Referrer-Policy: no-referrer` | … |
| `Strict-Transport-Security` | … |

Nota anche che cosa **manca**: non c'è `X-Powered-By`, l'header con cui Express dichiarerebbe
la tecnologia del server. Toglierlo non rende il server sicuro, ma dà meno indizi a chi
cerca vulnerabilità note di un prodotto specifico.

### 2. Due header che sembrano strani

- `X-XSS-Protection: 0` **spegne** il vecchio filtro XSS dei browser. È voluto: quel filtro
  è stato rimosso dai browser moderni e in passato ha introdotto a sua volta delle
  vulnerabilità. La protezione moderna contro XSS è la CSP.
- `Strict-Transport-Security` compare anche se stai usando `http://`. Il browser però lo
  **ignora** quando arriva su una connessione non cifrata (RFC 6797, sezione 8.1): HSTS ha
  effetto solo quando il sito è servito in HTTPS, come in produzione.

### 3. Guarda la CSP bloccare uno script

Apri `http://127.0.0.1:4190/` nel browser, poi gli strumenti per sviluppatori (F12), scheda
Console, e incolla:

```js
const s = document.createElement("script");
s.textContent = "window.__ran = true";
document.body.append(s);
window.__ran
```

Output ottenuto in Chromium:

```text
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-TzqRNhn3cMET3JybEF+0ZY76dZlxqMrOYqp0xs1vMZI='), or a nonce ('nonce-...') is required to enable inline execution.
undefined
```

Lo script non è stato eseguito: `window.__ran` è `undefined`. È ciò che succederebbe a uno
script iniettato da un attaccante tramite una XSS: la CSP ammette solo gli script serviti
dallo stesso sito come file (`script-src 'self'`), non quelli scritti dentro la pagina.

### 4. Fai scattare il limite di richieste

Gli endpoint `/api/` accettano al massimo 30 richieste ogni 15 minuti da uno stesso
indirizzo. Invia 31 richieste con un corpo vuoto: il server le rifiuta come non valide
(`400`) prima di chiamare l'AI, quindi non consumano nessuna quota.

```bash
for i in $(seq 1 31); do
  curl -s -o /dev/null -w "%{http_code} " -X POST http://127.0.0.1:4190/api/chat \
    -H 'content-type: application/json' -d '{}'
done; echo
```

Output ottenuto:

```text
400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 429
```

Dalla trentunesima richiesta la risposta è `429 Too Many Requests`. Guarda gli header che
la accompagnano:

```bash
curl -s -i -X POST http://127.0.0.1:4190/api/chat \
  -H 'content-type: application/json' -d '{}' | tee ~/lab01/ratelimit.txt
```

Output ottenuto (righe principali):

```text
HTTP/1.1 429 Too Many Requests
RateLimit-Policy: 30;w=900
RateLimit: limit=30, remaining=0, reset=892
Retry-After: 892
{"error":"Too many requests. Please try again in a few minutes."}
```

`RateLimit-Policy` dichiara la regola (30 richieste in una finestra di 900 secondi),
`RateLimit` quante ne restano e fra quanti secondi si azzera il contatore, `Retry-After`
quando riprovare. Il controllo di salute invece non è limitato, perché è registrato prima
del limiter:

```bash
curl -s http://127.0.0.1:4190/healthz
```

```text
{"status":"ok"}
```

Il contatore vive nella memoria del processo: riavviando il server si azzera. È un limite
per indirizzo IP pensato contro l'uso eccessivo (*denial of wallet*), non una protezione
contro un attacco distribuito da molti indirizzi.

## Aiuti e soluzione

### Indicatori di successo

- `~/lab01/headers.txt` contiene `Content-Security-Policy` e non contiene `X-Powered-By`.
- La console del browser mostra «Refused to execute inline script» e `window.__ran` vale
  `undefined`.
- La trentunesima richiesta a `/api/chat` riceve `429`, con `RateLimit-Policy: 30;w=900`.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

Non vedi gli header di sicurezza? Controlla in che modalità gira il server: ci sono solo dopo
`npm run build` e con `NODE_ENV=production`.

</details>

<details>
<summary>Suggerimento 2</summary>

Il `429` non arriva? Il contatore vale per indirizzo e solo per gli endpoint `/api/`: le
richieste alla pagina principale non contano, e riavviare il server lo azzera.

</details>

<details>
<summary>Soluzione ragionata</summary>

`nosniff` impedisce al browser di indovinare il tipo di un file e di eseguire come script ciò
che il server dichiara testo. `no-referrer` evita che l'indirizzo della pagina, con i suoi
parametri, arrivi ai siti esterni. HSTS obbliga il browser a usare solo HTTPS per un anno,
contro il downgrade a HTTP. La CSP blocca lo script del passaggio 3 perché è scritto dentro la
pagina e la policy ammette solo file serviti dallo stesso sito. Il limite di richieste è un
controllo preventivo contro l'uso eccessivo, non contro un attacco distribuito da molti
indirizzi.

</details>

### Errori comuni

- Avviare `npm run dev`: in sviluppo gli header non ci sono e il controllo sembra fallito.
- Incollare lo script in una scheda vuota o su un altro sito: la CSP da provare è quella della
  pagina dell'app.
- Concludere che HSTS funzioni su `http://`: il browser lo ignora finché il sito non è servito in
  HTTPS.
- Togliere `HOST=127.0.0.1`: il server diventa raggiungibile da tutta la rete durante l'esercizio.

## Evidenze

Nella cartella `~/lab01` devono esserci:

- `headers.txt`, gli header della pagina;
- `analisi.md`, la tabella completata con lo scopo di ogni header;
- `ratelimit.txt`, la risposta `429` con i suoi header;
- una schermata della console del browser con l'errore della CSP.

## Cleanup

1. Ferma il server con `Ctrl+C` nel terminale in cui l'hai avviato.
2. Verifica che non sia rimasto in ascolto: questo comando non deve stampare nulla.

   ```bash
   lsof -nP -iTCP:4190 -sTCP:LISTEN
   ```

3. Quando hai consegnato le evidenze, cancella la cartella di lavoro:

   ```bash
   rm -r -- ~/lab01
   ```

## Domande finali

1. Perché gli header di sicurezza compaiono solo con `NODE_ENV=production`?

   <details>
   <summary>Risposta</summary>

   In sviluppo il server integra Vite, che inserisce nella pagina script e stili generati al
   volo per il ricaricamento automatico: una CSP così rigida li bloccherebbe. In produzione i
   file sono già compilati e la CSP può ammettere solo quelli. Per la verifica dello scenario
   conta quindi la modalità produzione, la stessa che verrà pubblicata.

   </details>

2. Un collega propone di aggiungere `'unsafe-inline'` a `script-src` perché un widget esterno
   non funziona. Che cosa rispondi?

   <details>
   <summary>Risposta</summary>

   Che così la CSP smetterebbe di proteggere dalle XSS: uno script iniettato è proprio uno
   script inline. Le alternative sono caricare il widget come file dallo stesso sito, oppure
   autorizzare solo quel codice con un hash o un nonce. È un esempio di compromesso fra
   funzionalità e sicurezza da documentare, non da risolvere spegnendo il controllo.

   </details>

3. Il limite di 30 richieste è un controllo preventivo, rilevativo o correttivo? E di quale
   categoria?

   <details>
   <summary>Risposta</summary>

   È un controllo **preventivo** (impedisce le richieste oltre la soglia) e **tecnico** (lo
   applica il software). Riduce il rischio di consumo eccessivo delle risorse, ma da solo non
   ferma un attacco distribuito da molti indirizzi: per quello l'app ha anche un limite
   giornaliero complessivo (`AI_DAILY_LIMIT`).

   </details>

4. Perché `HOST=127.0.0.1` fa parte del setup di un laboratorio?

   <details>
   <summary>Risposta</summary>

   Perché senza, il server ascolta su tutte le interfacce e chiunque sulla stessa rete (un
   Wi-Fi pubblico, per esempio) potrebbe raggiungerlo durante l'esercizio. Ridurre
   l'esposizione ai soli servizi necessari è una tecnica di hardening dell'obiettivo 2.5.

   </details>
