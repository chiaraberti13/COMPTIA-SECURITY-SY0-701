# Lab 10 — Dalla traccia alla difesa: ricognizione e credential stuffing

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.4, 4.4, 4.5, 4.8 |
| Rischio | `low` |
| Durata | 60 minuti |

Parti dalle tracce già registrate di due attacchi a un'applicazione web, una ricognizione che
cerca file esposti e un credential stuffing contro il login, e costruisci le tre risposte
difensive: le regole che li **rilevano**, la configurazione che li **previene** e le azioni di
**risposta**. Nessun attacco viene eseguito: lavori su log sintetici e su un server di prova in
ascolto solo sul tuo computer.

## Scenario

Il portale clienti di Kestrelia ha registrato attività sospetta il 29 settembre. Il responsabile
ti consegna il log del web server e quello dei login dell'applicazione e ti chiede tre cose:
capire che cosa è successo, scrivere le regole che l'avrebbero segnalato in tempo, e preparare la
configurazione del reverse proxy che l'avrebbe fermato. Alla fine proponi la risposta per
l'account coinvolto.

## Prerequisiti

- Linux, macOS o WSL con `awk`, `jq`, `curl` e `sha256sum`.
- nginx 1.19.5 o successivo per il passaggio 5 (`sudo apt install -y nginx` su Debian e Ubuntu,
  `brew install nginx` su macOS). Il servizio di sistema non serve: il laboratorio avvia una
  copia propria, nella sua cartella.
- Il repository clonato: le tracce sono in `labs/10-attack-to-defense/data/`.
- Conoscenze: indicatori di attacco (obiettivo 2.4), monitoraggio e allarmi (4.4), controlli
  di sicurezza modificabili come filtri web e limiti (4.5) e risposta agli incidenti (4.8).

## Topologia

```text
[terminale] ──► data/access.log        (log del web server, sola lettura)
            ──► data/auth-events.jsonl (login dell'applicazione, sola lettura)
[curl]      ──► 127.0.0.1:8090 [nginx di prova, avviato e fermato dal laboratorio]
```

Le tracce sono **sintetiche**, generate da `data/genera_tracce.py` (vedi
[Dati sintetici dei laboratori](../DATI.md)). Gli indirizzi esterni appartengono ai blocchi
riservati alla documentazione (RFC 5737); utenti e azienda sono di fantasia.

## Setup

1. Entra nella cartella dei dati e verifica che le tracce siano quelle originali:

   ```bash
   cd labs/10-attack-to-defense/data
   sha256sum access.log auth-events.jsonl
   ```

   ```text
   9afa5c4cb0bd3d312114d95d80f097708bb56e6c3ce582f12925a9ee194affde  access.log
   dfe106eee0eadb7505d872ac039a0151ae7a6970eac1f781623e2dfd8a6645a9  auth-events.jsonl
   ```

2. Controlla l'ambiente con il [controllo preliminare](../README.md#controllo-preliminare) e
   crea la cartella di lavoro:

   ```bash
   bash ../../preflight.sh 10
   mkdir -p ~/lab10/nginx
   ```

## Esercizio

1. **Una panoramica.** Quante richieste per indirizzo, e con quale esito:

   ```bash
   awk '{print $1, $9}' access.log | sort | uniq -c | sort -rn
   ```

   ```text
        39 198.51.100.50 401
         6 203.0.113.77 404
         6 10.0.0.21 200
         3 10.0.0.34 200
         2 198.51.100.50 200
         1 203.0.113.77 403
   ```

   Due indirizzi esterni spiccano: uno colleziona `404`, l'altro `401`, cioè accessi negati.

2. **La ricognizione.** Che cosa cercava `203.0.113.77`:

   ```bash
   awk '$1 == "203.0.113.77" {print substr($4, 14), $7, $9}' access.log
   ```

   ```text
   10:15:02 /.env 404
   10:15:05 /.git/config 404
   10:15:08 /backup.zip 404
   10:15:11 /config.php.bak 404
   10:15:14 /phpinfo.php 404
   10:15:17 /server-status 403
   10:15:20 /admin/ 404
   ```

   Un elenco di file che non dovrebbero mai essere pubblici (variabili d'ambiente con segreti,
   repository git, backup, pagine diagnostiche), uno ogni tre secondi: è uno strumento
   automatico. Qui non ha trovato nulla, ma lo stesso giro su un server configurato male
   esporrebbe credenziali o codice.

3. **Il credential stuffing.** Il log dell'applicazione dice quali account sono stati provati:

   ```bash
   jq -s '[.[] | select(.ip == "198.51.100.50")] | {tentativi: length, account_diversi: (map(.user) | unique | length), riusciti: [.[] | select(.result == "success") | .user]}' auth-events.jsonl
   ```

   ```text
   {
     "tentativi": 40,
     "account_diversi": 40,
     "riusciti": [
       "m.conti"
     ]
   }
   ```

   Quaranta account, un tentativo ciascuno, uno riuscito: è il segno del **credential
   stuffing**, che usa coppie utente-password rubate in un'altra violazione e funziona quando
   qualcuno riusa la stessa password. Che cosa ha fatto dopo l'accesso:

   ```bash
   grep '198.51.100.50' access.log | grep -v '/login'
   ```

   ```text
   198.51.100.50 - - [29/Sep/2026:10:32:10 +0000] "GET /account/export HTTP/1.1" 200 2457600 "-" "python-requests/2.32"
   ```

   Trenta secondi dopo l'accesso ha scaricato l'esportazione dei dati dell'account, circa
   2,4 MB, con uno script.

4. **Rilevazione.** Due regole, scritte in modo che un SIEM le possa applicare in tempo reale. La
   prima segnala tre richieste a file sensibili dallo stesso indirizzo:

   ```bash
   awk '$9 ~ /^40[34]$/ && $7 ~ /^\/(\.env|\.git|backup|phpinfo|server-status)|\.bak$/ {n[$1]++; if (n[$1] == 3) print "ALLARME", substr($4, 14), $1, "tre richieste a file sensibili"}' access.log
   ```

   ```text
   ALLARME 10:15:08 203.0.113.77 tre richieste a file sensibili
   ```

   La seconda segnala dieci login falliti dallo stesso indirizzo in 60 secondi, con una finestra
   scorrevole:

   ```bash
   jq -r 'select(.result == "failure") | "\(.time | fromdateiso8601) \(.ip) \(.time)"' auth-events.jsonl \
     | awk '{s[$2] = s[$2] " " $1; n = split(s[$2], a, " "); c = 0; for (i = 1; i <= n; i++) if ($1 - a[i] < 60) c++; if (c >= 10 && !visto[$2]++) print "ALLARME", $3, $2, c, "login falliti in 60 secondi"}'
   ```

   ```text
   ALLARME 2026-09-29T10:31:09Z 198.51.100.50 10 login falliti in 60 secondi
   ```

   L'allarme arriva alle 10:31:09, **trenta secondi prima** dell'accesso riuscito delle 10:31:39.
   La rilevazione funziona, ma da sola non ferma niente: serve qualcuno, o un playbook
   automatico, che risponda in meno di trenta secondi. Da qui il passaggio successivo.

5. **Prevenzione.** Il reverse proxy davanti all'applicazione rifiuta i file nascosti e i
   backup, e limita i login a 5 al minuto per indirizzo, con una tolleranza (*burst*) di 3:

   ```bash
   cat > ~/lab10/nginx/nginx.conf <<'EOF'
   # Lab 10: prevenzione davanti all'applicazione (solo 127.0.0.1)
   pid nginx.pid;
   error_log error.log;
   events {}
   http {
     access_log access.log;
     limit_req_zone $binary_remote_addr zone=login:1m rate=5r/m;
     limit_req_status 429;
     server {
       listen 127.0.0.1:8090;
       location ~ /\. { return 404; }
       location ~* \.(bak|zip|sql|old)$ { return 404; }
       location = /login {
         limit_req zone=login burst=3 nodelay;
         try_files /dev/null @app;
       }
       location @app { return 401; }
       location / { return 200 "ok\n"; }
     }
   }
   EOF
   cd ~/lab10/nginx
   nginx -t -e error.log -p "$PWD/" -c nginx.conf
   nginx -e error.log -p "$PWD/" -c nginx.conf
   ```

   ```text
   nginx: the configuration file /home/tuo-utente/lab10/nginx/nginx.conf syntax is ok
   nginx: configuration file /home/tuo-utente/lab10/nginx/nginx.conf test is successful
   ```

   La location `@app` simula l'applicazione, che a credenziali sbagliate risponde `401`. Ora
   ripeti la ricognizione e un tentativo di stuffing contro il server di prova:

   ```bash
   for p in /.env /.git/config /backup.zip /; do
     printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:8090$p)" "$p"
   done
   for i in $(seq 1 8); do curl -s -o /dev/null -w "%{http_code} " -X POST http://127.0.0.1:8090/login; done; echo
   ```

   ```text
   404 /.env
   404 /.git/config
   404 /backup.zip
   200 /
   401 401 401 401 429 429 429 429
   ```

   I file sensibili non escono, anche se qualcuno li lasciasse nella cartella pubblica. Dopo
   quattro tentativi (uno più il burst di tre) l'indirizzo riceve `429`: i quaranta tentativi
   delle 10:31 si sarebbero fermati al quarto. Ferma il server di prova:

   ```bash
   nginx -e error.log -p "$PWD/" -c nginx.conf -s quit
   ```

6. **Risposta.** Scrivi in `~/lab10/risposta.md` il playbook per l'account `m.conti`, in ordine:
   chiudere le sessioni attive e reimpostare la password; avvisare l'utente che la sua password
   circola altrove e va cambiata ovunque l'abbia riusata; trattare l'esportazione come una
   possibile violazione di dati personali e coinvolgere il responsabile della protezione dei
   dati; bloccare i due indirizzi; abilitare la MFA sul portale e il controllo delle password
   già comparse in violazioni note.

## Aiuti e soluzione

### Indicatori di successo

- Hai separato i due attacchi: `203.0.113.77` è ricognizione, `198.51.100.50` credential
  stuffing riuscito su `m.conti`.
- La regola sui login dà l'allarme alle 10:31:09, prima dell'accesso riuscito.
- Il server di prova risponde `404` ai file sensibili e `429` dal quinto tentativo di login.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

Il log del web server non contiene i nomi utente: per sapere quali account sono stati provati
serve il log dell'applicazione, `auth-events.jsonl`.

</details>

<details>
<summary>Suggerimento 2</summary>

Il limite di nginx non scatta? Se la location di `/login` risponde direttamente con `return`, la
risposta parte prima che `limit_req` venga valutato: la richiesta deve passare da una location
interna, come `@app`, o da un `proxy_pass` verso l'applicazione.

</details>

<details>
<summary>Soluzione ragionata</summary>

La ricognizione si riconosce dall'elenco di percorsi sensibili richiesti in sequenza da un
client automatico; il credential stuffing da molti account, un tentativo ciascuno, e un successo.
La rilevazione arriva in tempo, ma da sola non interrompe l'attacco. La prevenzione al reverse
proxy lo ferma prima: niente file nascosti o backup serviti, e un limite ai login per indirizzo.
Per un attacco distribuito su molti indirizzi servono anche MFA e controllo delle password già
violate. La risposta riguarda l'account compromesso e i dati esportati, non solo gli indirizzi.

</details>

### Errori comuni

- Chiamare brute force il credential stuffing: qui ogni account riceve un solo tentativo, con
  credenziali che l'attaccante ha già.
- Usare `return` nella location limitata: `limit_req` non viene mai applicato.
- Fidarsi del solo limite per indirizzo: un attacco distribuito su molti indirizzi lo aggira.
- Bloccare gli indirizzi e dimenticare l'esportazione: i dati di `m.conti` sono già usciti.

## Evidenze

Nella cartella `~/lab10` devono esserci:

- `allarmi.txt`, l'output delle due regole del passaggio 4;
- `nginx/nginx.conf` e `prevenzione.txt`, con i codici di risposta del passaggio 5;
- `risposta.md`, il playbook del passaggio 6.

## Cleanup

Verifica che il server di prova sia fermo, poi cancella la cartella di lavoro:

```bash
ss -tln '( sport = :8090 )' | tail -n +2
rm -r -- ~/lab10
```

Il primo comando non deve stampare nulla. Le tracce in `data/` non sono state modificate: puoi
verificarlo con `sha256sum`.

## Domande finali

1. Che differenza c'è fra credential stuffing, password spraying e brute force?

   <details>
   <summary>Risposta</summary>

   Il **brute force** prova molte password su un account. Il **password spraying** prova poche
   password comuni su molti account. Il **credential stuffing** prova coppie utente-password già
   note, rubate altrove: un tentativo per account, e funziona solo dove la password è stata
   riusata. Per questo la difesa più efficace contro lo stuffing è la MFA, insieme al controllo
   delle password già comparse in violazioni.

   </details>

2. La regola sui login dà l'allarme trenta secondi prima dell'accesso. Perché non è bastata?

   <details>
   <summary>Risposta</summary>

   Perché un allarme è un'informazione, non un'azione: se nessuno, o nessun playbook automatico,
   blocca l'indirizzo o l'account in quei trenta secondi, l'attacco continua. Un controllo
   rilevativo va sempre abbinato a un controllo preventivo o a una risposta automatica.

   </details>

3. Il reverse proxy risponde `404` a `/.env` anche se il file non esiste. A che cosa serve?

   <details>
   <summary>Risposta</summary>

   È una protezione contro gli errori futuri: se un giorno qualcuno copiasse per sbaglio un file
   `.env` o un backup nella cartella pubblica, il proxy continuerebbe a non servirlo. È difesa in
   profondità applicata alla configurazione.

   </details>

4. Quali obblighi può far nascere l'esportazione dei dati di `m.conti`?

   <details>
   <summary>Risposta</summary>

   Se contiene dati personali, è una violazione da valutare secondo la normativa applicabile,
   per esempio il GDPR per un'azienda europea: documentarla, valutare il rischio per la persona
   e, se previsto, notificarla all'autorità e all'interessato entro i termini stabiliti. La
   decisione spetta all'organizzazione con il suo responsabile della protezione dei dati, ma la
   raccolta delle evidenze comincia nella risposta all'incidente.

   </details>
