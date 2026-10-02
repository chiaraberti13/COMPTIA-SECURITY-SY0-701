# Lab 11 — Tre sensori, un incidente: rete, identità ed endpoint

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 4.4, 4.9 |
| Rischio | `low` |
| Durata | 40 minuti |

Lo stesso incidente del Lab 03, un brute force SSH riuscito seguito da un account creato per
restare, raccontato da tre sensori diversi: i flussi di rete, i log del sistema di identità e
l'agente sull'endpoint. Interroghi ogni fonte da sola, scopri che cosa vede e che cosa le
sfugge, poi le unisci in un'unica linea temporale e scrivi una regola di correlazione, come fa
un SIEM. Lavori solo su file sintetici, in sola lettura.

## Scenario

Il server `web01` di Kestrelia (`10.0.0.5`) manda la sua telemetria al SIEM da tre sensori. Il
responsabile della sicurezza vuole sapere se ne servono davvero tre, o se uno basterebbe a
ricostruire l'incidente del 29 settembre. Gli rispondi con i dati: che cosa vede ciascuno, dove
è cieco, che cosa si ottiene solo mettendoli insieme.

## Prerequisiti

- Linux, macOS o WSL con `jq` 1.6 o successivo e `sha256sum` (su macOS `shasum -a 256`).
- Il repository clonato: la telemetria è in `labs/11-telemetry-views/data/`.
- Conoscenze: strumenti e fonti di monitoraggio (obiettivo 4.4) e fonti di dati a supporto di
  un'indagine, cioè log di rete, di sistema e degli endpoint (4.9). Il Lab 03 aiuta, ma non
  serve.

## Topologia

```text
[web01 10.0.0.5] ──► data/rete.jsonl      (sensore di rete: flussi, come NetFlow o Zeek)
                 ──► data/identita.jsonl  (sistema di identità: accessi riusciti e falliti)
                 ──► data/endpoint.jsonl  (agente EDR: processi e file modificati)
[terminale con jq] ── legge i tre file ──► ~/lab11 (le tue evidenze)
```

I file sono **sintetici**, generati da `data/genera_telemetria.py` (vedi
[Dati sintetici dei laboratori](../DATI.md)). Gli indirizzi esterni appartengono ai blocchi
riservati alla documentazione (RFC 5737); utenti e azienda sono di fantasia. I nomi dei campi
sono in inglese, come nei formati reali.

## Setup

1. Entra nella cartella dei dati e verifica che la telemetria sia quella originale:

   ```bash
   cd labs/11-telemetry-views/data
   sha256sum rete.jsonl identita.jsonl endpoint.jsonl
   ```

   ```text
   162ab091bd2c31722588e9d87d4e4a548f607edf286c0067815e5674808fa1c7  rete.jsonl
   7c05f0a5071cb30841745e5663a9d3f5081a68d90ad1b866541452f3501a5156  identita.jsonl
   5c102a3b0b76e60aeb653f10360d602f757163cd51460107f46296f299fe0219  endpoint.jsonl
   ```

2. Controlla l'ambiente con il [controllo preliminare](../README.md#controllo-preliminare) e
   crea la cartella delle evidenze:

   ```bash
   bash ../../preflight.sh 11
   mkdir -p ~/lab11
   ```

## Esercizio

1. **Che cosa vede la rete.** Ogni riga di `rete.jsonl` è un flusso: chi parla con chi, su quale
   porta, per quanto tempo e quanti byte. Raggruppa i flussi per origine e durata:

   ```bash
   jq -r '"\(.src) \(.duration_s)s"' rete.jsonl | sort | uniq -c | sort -rn
   ```

   ```text
        24 203.0.113.45 1s
        12 198.51.100.23 1s
         1 203.0.113.45 188s
         1 10.0.0.21 1800s
   ```

   Due indirizzi esterni aprono decine di connessioni SSH da un secondo, il ritmo di uno
   strumento automatico. Dopo 24 tentativi, `203.0.113.45` ottiene una sessione che dura tre
   minuti: con ogni probabilità è entrato. Ma chi? Guarda quali campi ha il sensore:

   ```bash
   jq -sc 'map(keys) | add | unique' rete.jsonl
   ```

   ```text
   ["bytes_from_server","bytes_to_server","dport","dst","duration_s","proto","src","time"]
   ```

   Nessun nome utente e nessun comando: SSH è cifrato, la rete vede la busta, non la lettera.

2. **Che cosa vede l'identità.** Il sistema di identità registra ogni tentativo con l'account e
   l'esito. Conta i fallimenti per origine, e quanti account diversi sono stati provati:

   ```bash
   jq -sc 'map(select(.result == "failure")) | group_by(.src)[] | {src: .[0].src, falliti: length, account: (map(.user) | unique | length)}' identita.jsonl
   jq -r 'select(.result == "success") | "\(.time[11:19]) \(.user) da \(.src) con \(.method)"' identita.jsonl
   ```

   ```text
   {"src":"198.51.100.23","falliti":12,"account":12}
   {"src":"203.0.113.45","falliti":24,"account":1}
   02:12:01 deploy da 203.0.113.45 con password
   08:02:05 alice da 10.0.0.21 con publickey
   ```

   Ora i due attacchi hanno un nome: `203.0.113.45` è un **brute force** (24 password su un
   account, `deploy`, alla fine riuscito), `198.51.100.23` un **password spraying** (un tentativo
   su ciascuno di 12 account, nessun successo). Ma dopo l'accesso il sistema di identità tace:
   non sa che cosa `deploy` abbia fatto.

3. **Che cosa vede l'endpoint.** L'agente registra i processi avviati, con il loro padre, e i
   file modificati:

   ```bash
   jq -r '"\(.time[11:19]) \(.user // "-") \(.parent // .process) \(.command // "scrive \(.path)")"' endpoint.jsonl
   ```

   ```text
   02:12:02 deploy sshd -bash
   02:13:02 root sudo useradd -m -s /bin/bash svc-update
   02:13:02 - useradd scrive /etc/passwd
   02:13:02 - useradd scrive /etc/shadow
   02:13:40 root sudo usermod -aG sudo svc-update
   02:13:40 - usermod scrive /etc/group
   08:02:06 alice sshd -bash
   08:03:40 alice -bash vim /srv/app/config.yml
   ```

   Alle 02:12 `deploy` apre una shell; un minuto dopo, con `sudo`, viene creato l'account
   `svc-update` e messo nel gruppo `sudo`: è la **persistenza**. L'endpoint però non vede i 36
   tentativi falliti, che non hanno mai avviato un processo, e non sa da quale indirizzo arrivi
   la sessione. Lo spraying, per lui, non è mai esistito.

4. **La vista del SIEM.** Unisci le tre fonti in una sola linea temporale, normalizzando i
   record in tre campi comuni: l'ora, la fonte e una descrizione. Ogni file si riconosce da un
   campo che solo lui ha (`dport`, `result`, `type`). Mostra i due minuti attorno all'accesso:

   ```bash
   jq -s -r 'map(
       if has("dport") then {time, fonte: "rete", cosa: "\(.src) -> \(.dst):\(.dport) per \(.duration_s)s"}
       elif has("result") then {time, fonte: "identita", cosa: "\(.user) da \(.src): \(.result)"}
       elif .type == "process" then {time, fonte: "endpoint", cosa: "\(.user) esegue \(.command)"}
       else {time, fonte: "endpoint", cosa: "\(.process) scrive \(.path)"} end)
     | sort_by(.time)[] | select(.time >= "2026-09-29T02:11:55Z" and .time < "2026-09-29T02:14:00Z")
     | "\(.time[11:19]) \(.fonte) \(.cosa)"' rete.jsonl identita.jsonl endpoint.jsonl
   ```

   ```text
   02:11:56 rete 203.0.113.45 -> 10.0.0.5:22 per 1s
   02:11:56 identita deploy da 203.0.113.45: failure
   02:12:01 rete 203.0.113.45 -> 10.0.0.5:22 per 188s
   02:12:01 identita deploy da 203.0.113.45: success
   02:12:02 endpoint deploy esegue -bash
   02:13:02 endpoint root esegue useradd -m -s /bin/bash svc-update
   02:13:02 endpoint useradd scrive /etc/passwd
   02:13:02 endpoint useradd scrive /etc/shadow
   02:13:40 endpoint root esegue usermod -aG sudo svc-update
   02:13:40 endpoint usermod scrive /etc/group
   ```

   Ora la storia è completa: **da dove** (rete), **chi** (identità), **che cosa ha fatto**
   (endpoint). I collegamenti fra le fonti sono l'indirizzo e l'ora fra rete e identità, l'utente
   e l'ora fra identità ed endpoint. Per questo gli orologi devono essere sincronizzati: con un
   minuto di scarto fra i sensori, questa sequenza si sfalderebbe.

5. **Una regola di correlazione.** Un SIEM non aspetta che qualcuno legga la linea temporale:
   applica regole che uniscono le fonti. Questa segnala un accesso riuscito dopo almeno dieci
   fallimenti dello stesso account dallo stesso indirizzo, e allega i comandi eseguiti con `sudo`
   nei cinque minuti successivi:

   ```bash
   jq -s -r --slurpfile ep endpoint.jsonl '
     . as $id | $id[] | select(.result == "success") | . as $ok
     | ($id | map(select(.result == "failure" and .user == $ok.user and .src == $ok.src and .time < $ok.time)) | length) as $falliti
     | select($falliti >= 10)
     | ($ok.time | fromdateiso8601) as $t
     | [$ep[] | select(.parent == "sudo" and ((.time | fromdateiso8601) - $t) >= 0 and ((.time | fromdateiso8601) - $t) <= 300) | .command] as $dopo
     | "ALLARME \($ok.time[11:19]) \($ok.user) da \($ok.src): accesso dopo \($falliti) falliti, poi con sudo: \($dopo | join("; "))"' identita.jsonl
   ```

   ```text
   ALLARME 02:12:01 deploy da 203.0.113.45: accesso dopo 24 falliti, poi con sudo: useradd -m -s /bin/bash svc-update; usermod -aG sudo svc-update
   ```

   Un solo allarme, già con il contesto per decidere: account compromesso e persistenza in
   corso. Nessuna delle tre fonti, da sola, avrebbe potuto scriverlo. Salvalo fra le evidenze
   ripetendo il comando con `> ~/lab11/allarme.txt` in fondo.

6. **La matrice di visibilità.** Scrivi in `~/lab11/matrice.md` una tabella con le fasi
   dell'incidente sulle righe (spraying, tentativi di brute force, accesso riuscito, shell,
   creazione dell'account, elevazione a `sudo`) e le tre fonti sulle colonne, segnando per ogni
   cella «vede», «vede in parte» o «non vede», con il motivo.

## Aiuti e soluzione

### Indicatori di successo

- Hai distinto i due attacchi: brute force riuscito da `203.0.113.45` su `deploy`, spraying senza
  successo da `198.51.100.23`.
- La linea temporale del passaggio 4 mostra, in ordine, il flusso lungo, l'accesso riuscito e i
  comandi di persistenza.
- La regola del passaggio 5 produce un solo allarme, con i due comandi `sudo`.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

`jq` legge un file JSON Lines un record alla volta; per contare o raggruppare servono tutti i
record insieme, in un array: è quello che fa l'opzione `-s` (*slurp*).

</details>

<details>
<summary>Suggerimento 2</summary>

La linea temporale è vuota o mescolata? Le tre fonti hanno campi diversi: prima di ordinarle
vanno portate allo stesso schema, e l'ora va confrontata come stringa ISO 8601, che si ordina
correttamente solo se tutte le fonti usano lo stesso formato e lo stesso fuso (qui UTC, la `Z`).

</details>

<details>
<summary>Soluzione ragionata</summary>

La rete vede i 36 tentativi e la sessione lunga, ma non l'account né i comandi, perché SSH è
cifrato. L'identità dà un nome ai due attacchi e all'account compromesso, ma si ferma al login.
L'endpoint vede la persistenza, ma non i tentativi falliti né l'origine. Solo la correlazione,
sull'indirizzo e sull'ora fra rete e identità e sull'utente e l'ora fra identità ed endpoint,
ricostruisce la catena completa e permette una regola che dà un allarme con il contesto per
rispondere. La risposta è quella del Lab 03: disabilitare `svc-update`, reimpostare `deploy`,
bloccare l'indirizzo, cercare altre modifiche.

</details>

### Errori comuni

- Concludere dalla sola rete che `203.0.113.45` è entrato «come root»: il flusso non dice quale
  account.
- Considerare innocuo lo spraying perché l'endpoint non lo vede: nessun processo non vuol dire
  nessun attacco.
- Ordinare la linea temporale senza normalizzare i formati dell'ora, o con sensori su fusi
  diversi.
- Attribuire a `root` la creazione dell'account senza risalire alla sessione di `deploy` da cui
  è partito `sudo`.

## Evidenze

Nella cartella `~/lab11` devono esserci:

- `allarme.txt`, l'output della regola del passaggio 5;
- `matrice.md`, la matrice di visibilità del passaggio 6;
- `risposta.md`, cinque righe per il responsabile: se tre sensori servono davvero, quale
  sacrificheresti per primo e che cosa perderesti.

## Cleanup

Il laboratorio ha solo letto i file in `data/` e scritto in `~/lab11`. Consegnate le evidenze,
cancella la cartella:

```bash
rm -r -- ~/lab11
```

Puoi verificare con `sha256sum` che la telemetria in `data/` non sia cambiata.

## Domande finali

1. Perché il sensore di rete non vede il nome utente, e che cosa vede comunque di utile?

   <details>
   <summary>Risposta</summary>

   Perché SSH cifra la sessione, autenticazione compresa: il sensore vede solo i metadati, cioè
   indirizzi, porte, durata e volumi. Bastano però per riconoscere uno strumento automatico
   (molte connessioni brevi e uguali), per notare la sessione anomala che segue, e per vedere
   l'attività anche di host senza agente o con i log cancellati.

   </details>

2. L'agente EDR registra `root` come autore di `useradd`. Come si risale a `deploy`?

   <details>
   <summary>Risposta</summary>

   Seguendo la catena dei processi e della sessione: `sudo` è stato lanciato dalla shell aperta
   da `deploy` alle 02:12:02, e `sudo` stesso registra nel suo log l'utente che lo invoca. Gli
   agenti reali conservano l'identificativo di sessione e il processo padre proprio per questo:
   senza, l'attribuzione si ferma all'account privilegiato.

   </details>

3. Perché la correlazione dipende dalla sincronizzazione degli orologi?

   <details>
   <summary>Risposta</summary>

   Perché le fonti si uniscono sull'ora: se il sensore di rete fosse avanti di due minuti,
   la sessione lunga comparirebbe dopo i comandi che ha generato, e una regola con una finestra di
   cinque minuti potrebbe non trovarli più. Per questo ogni sorgente usa NTP e scrive in UTC.

   </details>

4. Il budget permette un solo sensore. Quale sceglieresti per questo server, e che cosa
   rinunceresti a vedere?

   <details>
   <summary>Risposta</summary>

   Non c'è una risposta unica, ma va motivata: l'endpoint vede l'impatto (persistenza,
   modifiche) ma non i tentativi; l'identità vede chi e come, utile contro spraying e
   credenziali rubate, ma nulla dopo il login; la rete vede tutto ciò che passa, anche da host
   senza agente, ma non il contenuto cifrato. Spesso si sceglie in base al rischio principale e
   si compensa con controlli preventivi, come chiavi SSH al posto delle password, che qui
   avrebbero reso inutile il brute force.

   </details>
