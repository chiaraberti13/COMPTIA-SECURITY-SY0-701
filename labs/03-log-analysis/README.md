# Lab 03 — Trovare un attacco nei log di autenticazione

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.4, 4.4, 4.9 |
| Rischio | `low` |
| Durata | 40 minuti |

Analizzi il log di autenticazione SSH di un server con gli strumenti presenti su ogni sistema
Linux (`grep`, `awk`, `sort`, `uniq`) e ricostruisci due attacchi: un brute force riuscito e un
password spraying. È ciò che fa un analista quando il SIEM non c'è o quando deve verificare a
mano che cosa gli ha segnalato.

## Scenario

Sei l'analista di turno. Il server `web01` ha registrato attività insolita durante la notte del
29 settembre e il responsabile ti consegna una copia del suo `auth.log`. Devi rispondere a tre
domande: chi ha provato ad accedere senza riuscirci, qualcuno ci è riuscito, e che cosa ha fatto
una volta dentro. Alla fine consegni una timeline e le azioni consigliate.

## Prerequisiti

- Un terminale Linux o macOS, oppure WSL su Windows: servono `grep`, `awk`, `sort`, `uniq` e
  `sha256sum` (su macOS: `shasum -a 256`).
- Il repository clonato: il log è in `labs/03-log-analysis/data/auth.log`.
- Conoscenze: indicatori di attacco alle credenziali (obiettivo 2.4) e fonti dati per le indagini
  (obiettivo 4.9), nel Dominio 2 e nel Dominio 4 della guida.

## Topologia

```text
[terminale] ──► labs/03-log-analysis/data/auth.log (file locale, sola lettura)
```

Nessuna rete, nessun servizio: lavori solo su un file. Il log è **sintetico**, generato per
l'esercizio da `data/genera_auth_log.py`, che lo ricrea identico (vedi
[Dati sintetici dei laboratori](../DATI.md)). Gli indirizzi esterni appartengono ai blocchi riservati alla documentazione
(`203.0.113.0/24` e `198.51.100.0/24`, RFC 5737), quelli interni a una rete privata, e le chiavi
sono finte.

## Setup

1. Entra nella cartella dei dati:

   ```bash
   cd labs/03-log-analysis/data
   ```

2. Verifica che il file sia quello originale, confrontandone l'hash. È la stessa verifica
   d'integrità che si fa su un'evidenza prima di analizzarla:

   ```bash
   sha256sum auth.log
   ```

   ```text
   13ea329df6706583f932aeff68c5831264116639e82b46ac655b1684e4e6b39c  auth.log
   ```

   Se l'hash è diverso, il file è stato modificato: ripristinalo con `git checkout -- auth.log`.

3. Crea la cartella in cui salverai le evidenze:

   ```bash
   mkdir -p ~/lab03
   ```

## Esercizio

1. **Delimita il periodo.** Quante righe contiene il log, e che intervallo di tempo copre?

   ```bash
   wc -l auth.log
   head -n 1 auth.log | cut -c1-25
   tail -n 1 auth.log | cut -c1-25
   ```

   ```text
   47 auth.log
   2026-09-29T02:10:01+00:00
   2026-09-29T17:55:05+00:00
   ```

   Gli orari sono in UTC (`+00:00`). Annotalo: quando confronterai il log con altre fonti, un
   fuso orario diverso sposta la timeline di ore.

2. **Conta gli accessi falliti per indirizzo.** Nel messaggio `Failed password … from IP port N
   ssh2` l'indirizzo è il quarto campo dalla fine, quindi `$(NF-3)` in `awk`:

   ```bash
   grep "Failed password" auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn
   ```

   ```text
        24 203.0.113.45
        12 198.51.100.23
         1 10.0.0.34
   ```

   Due indirizzi esterni spiccano. Un solo fallimento dalla rete interna è normale: qualcuno ha
   sbagliato la password.

3. **Distingui brute force e spraying.** Il numero di tentativi non basta: conta quanti account
   *diversi* ha provato ogni indirizzo. Per un utente inesistente il messaggio aggiunge
   `invalid user`, e il nome si sposta di due campi:

   ```bash
   grep "Failed password" auth.log \
     | awk '{user = ($7 == "invalid") ? $9 : $7; print $(NF-3), user}' \
     | sort -u | awk '{n[$1]++} END {for (ip in n) print n[ip], ip}' | sort -rn
   ```

   ```text
   12 198.51.100.23
   1 203.0.113.45
   1 10.0.0.34
   ```

   - `203.0.113.45`: 24 tentativi su **un solo** account. È un **brute force**.
   - `198.51.100.23`: 12 tentativi su **12 account diversi**, uno ciascuno. È un **password
     spraying**: una password comune provata su molti utenti, per restare sotto la soglia di
     blocco dell'account.

4. **Cerca gli accessi riusciti.** Per ognuno stampa ora, metodo, utente e indirizzo:

   ```bash
   grep "Accepted" auth.log | awk '{print $1, $5, $7, $9}'
   ```

   ```text
   2026-09-29T02:12:01+00:00 password deploy 203.0.113.45
   2026-09-29T08:02:05+00:00 publickey alice 10.0.0.21
   2026-09-29T08:15:05+00:00 publickey bob 10.0.0.34
   2026-09-29T08:20:19+00:00 password bob 10.0.0.34
   2026-09-29T12:40:05+00:00 publickey alice 10.0.0.21
   2026-09-29T17:55:05+00:00 publickey bob 10.0.0.34
   ```

   La prima riga è l'indicatore di compromissione: l'account `deploy` entra con una password
   dallo stesso indirizzo del brute force, alle 02:12, fuori orario. Gli altri accessi vengono
   dalla rete interna in orario di lavoro, quasi tutti con chiave.

5. **Ricostruisci che cosa ha fatto.** Filtra l'indirizzo dell'attaccante e i comandi
   amministrativi, escludendo i tentativi falliti già contati:

   ```bash
   grep -E "203\.0\.113\.45|sudo|useradd" auth.log | grep -v "Failed password"
   ```

   ```text
   2026-09-29T02:12:01+00:00 web01 sshd[2317]: Accepted password for deploy from 203.0.113.45 port 41024 ssh2
   2026-09-29T02:13:02+00:00 web01 sudo[2324]: deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/useradd -m -s /bin/bash svc-update
   2026-09-29T02:13:02+00:00 web01 useradd[2331]: new user: name=svc-update, UID=1004, GID=1004, home=/home/svc-update, shell=/bin/bash, from=/dev/pts/0
   2026-09-29T02:13:40+00:00 web01 sudo[2338]: deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/usermod -aG sudo svc-update
   2026-09-29T02:15:09+00:00 web01 sshd[2345]: Disconnected from user deploy 203.0.113.45 port 41024
   ```

   In un minuto l'attaccante crea l'account `svc-update` e lo aggiunge al gruppo `sudo`: è
   **persistenza**. Anche se la password di `deploy` venisse cambiata, quell'account gli
   resterebbe.

6. **Misura la durata del brute force** con un solo comando `awk`: numero di tentativi, primo e
   ultimo.

   ```bash
   awk '/Failed password/ && /203\.0\.113\.45/ {n++; if (!first) first=$1; last=$1} END {print n, first, last}' auth.log
   ```

   ```text
   24 2026-09-29T02:10:01+00:00 2026-09-29T02:11:56+00:00
   ```

   24 tentativi in meno di due minuti, poi l'accesso riuscito: una regola che segnala 10
   fallimenti in 5 minuti dallo stesso indirizzo avrebbe dato l'allarme alle 02:10:46, prima
   dell'accesso.

7. **Salva la timeline** dell'incidente nella cartella delle evidenze:

   ```bash
   grep -E "203\.0\.113\.45|sudo|useradd" auth.log > ~/lab03/timeline.txt
   wc -l ~/lab03/timeline.txt
   ```

   ```text
   29 /home/tuo-utente/lab03/timeline.txt
   ```

## Aiuti e soluzione

### Indicatori di successo

- `203.0.113.45` è classificato come brute force (24 tentativi su un account) e `198.51.100.23`
  come password spraying (12 account, un tentativo ciascuno).
- `~/lab03/timeline.txt` ha 29 righe e contiene la creazione di `svc-update` e il suo ingresso nel
  gruppo `sudo`.
- Il rapporto chiede di disabilitare sia `deploy` sia `svc-update`, non solo di bloccare gli
  indirizzi.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

Il passaggio 3 restituisce numeri strani? Guarda i campi: per un utente inesistente il messaggio
aggiunge `invalid user` e il nome si sposta di due posizioni.

</details>

<details>
<summary>Suggerimento 2</summary>

Non trovi che cosa ha fatto l'attaccante dopo l'accesso? Cerca le righe dei processi diversi da
`sshd`: `sudo` e `useradd` registrano i comandi amministrativi.

</details>

<details>
<summary>Soluzione ragionata</summary>

Il numero di tentativi da solo non distingue i due attacchi: conta quanti account diversi prova
ogni indirizzo. L'accesso riuscito delle 02:12 viene dallo stesso indirizzo del brute force, con
password e fuori orario: è l'indicatore di compromissione. Un minuto dopo nasce `svc-update`,
aggiunto a `sudo`: è persistenza. Le azioni sono preservare le evidenze, disabilitare entrambi
gli account e chiuderne le sessioni, bloccare gli indirizzi, imporre chiavi o MFA su SSH e
cercare lo stesso indirizzo sugli altri server.

</details>

### Errori comuni

- Contare solo i tentativi e chiamare brute force anche lo spraying.
- Fermarsi all'accesso riuscito senza cercare che cosa è successo dopo.
- Bloccare l'indirizzo e lasciare attivo `svc-update`.
- Modificare `auth.log` durante l'analisi: l'hash del Setup non corrisponde più.

## Evidenze

Nella cartella `~/lab03` devono esserci:

- `timeline.txt`, le 29 righe relative all'attaccante e ai comandi amministrativi;
- `rapporto.md`, con una riga per ciascun attacco (indirizzo, tipo, account coinvolti,
  esito) e le azioni consigliate: disabilitare `deploy` e `svc-update`, revocarne le sessioni,
  bloccare i due indirizzi, imporre l'autenticazione a chiave o la MFA su SSH, e verificare
  sugli altri server se lo stesso indirizzo ha avuto successo.

## Cleanup

Il laboratorio non ha avviato nulla e non ha modificato il sistema. Quando hai consegnato le
evidenze, cancella la cartella di lavoro:

```bash
rm -r -- ~/lab03
```

Il file `auth.log` resta com'era: puoi verificarlo di nuovo con `sha256sum auth.log`.

## Domande finali

1. Perché il password spraying non fa scattare il blocco dell'account, e quale indicatore lo
   rivela?

   <details>
   <summary>Risposta</summary>

   Il blocco conta i fallimenti **per account**, e lo spraying ne fa uno solo per ciascuno.
   L'indicatore è la distribuzione per **origine**: molti account diversi dallo stesso
   indirizzo in pochi minuti, come al passaggio 3. Per questo la regola di rilevazione va
   scritta per indirizzo, non per utente.

   </details>

2. Il brute force contro `deploy` è riuscito. Quale controllo lo avrebbe impedito, e quale
   l'avrebbe solo rilevato?

   <details>
   <summary>Risposta</summary>

   Lo avrebbero **impedito** l'autenticazione SSH solo a chiave (`PasswordAuthentication no`)
   o la MFA, e in parte una password robusta con un limite ai tentativi (per esempio
   fail2ban). Lo avrebbe **rilevato** una regola del SIEM sui fallimenti ripetuti: utile, ma
   solo se qualcuno risponde prima dei due minuti che sono bastati all'attaccante.

   </details>

3. Perché il primo passo è stato verificare l'hash del file, e perché lavori su una copia del
   log e non sul server?

   <details>
   <summary>Risposta</summary>

   L'hash dimostra che l'evidenza non è cambiata fra la raccolta e l'analisi: è la base della
   catena di custodia. Si lavora su una copia perché un server compromesso non è una fonte
   affidabile, l'attaccante può cancellare o alterare i log locali, e perché ogni comando
   eseguito sull'originale rischia di modificarlo. Per lo stesso motivo i log vanno inoltrati
   in tempo reale a un sistema centrale.

   </details>

4. Hai trovato l'account `svc-update`. Basta cancellarlo per chiudere l'incidente?

   <details>
   <summary>Risposta</summary>

   No. Prima va preservata l'evidenza, poi l'incidente va contenuto: disabilitare gli account,
   chiudere le sessioni, bloccare gli indirizzi. Poi l'eradicazione: cercare chiavi SSH
   aggiunte, attività pianificate, altri account, e verificare se `deploy` usava la stessa
   password altrove. Cancellare l'account per primo distruggerebbe una prova e lascerebbe
   aperte le altre porte.

   </details>
