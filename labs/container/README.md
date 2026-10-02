# Laboratori in container

Un'immagine minimale per svolgere i laboratori a rischio `low` che lavorano su file locali senza
installare nulla sul proprio computer, sempre con le stesse versioni degli strumenti. Ogni
sessione parte pulita e, all'uscita, sparisce senza lasciare tracce.

> **English summary.** A minimal image to run the file-based `low` risk labs (03, 04, 05, 06,
> 10, 11) with the same tool versions everywhere. `run.sh` starts a throwaway container with no
> network, no capabilities, a read-only root, an unprivileged user and the labs mounted
> read-only; the home lives in memory and disappears on exit. `verify.sh` proves those
> properties and runs in CI. See [README.en.md](README.en.md).

## Quali laboratori

| Laboratori | Nel container | Perché |
|---|---|---|
| 03, 04, 05, 06, 10, 11 | sì | lavorano su file e, il 10, su un nginx in ascolto solo sul loopback |
| 01, 02 | no | avviano l'applicazione del progetto: si usa il `Dockerfile` alla radice |
| 07, 08, 09 | no | modificano il sistema (SSH, utenti, firewall, namespace di rete) e richiedono una VM con snapshot |

Un container condivide il kernel con il computer che lo ospita: per i laboratori `moderate`
servirebbero privilegi che annullerebbero l'isolamento. Per loro resta la macchina virtuale
descritta in [Isolamento e ripristino](../README.md#isolamento-e-ripristino).

## Prerequisiti

- Docker Engine 20.10 o successivo, oppure Docker Desktop
  ([installazione](https://docs.docker.com/engine/install/)).
- Il repository clonato: i comandi si eseguono dalla sua radice.

## Costruire l'immagine

```bash
docker build -t comptia-labs labs/container
```

La base è `ubuntu:noble-20260917` fissata per digest, cioè per l'impronta del contenuto: un tag
si può spostare, un digest no. I quattro pacchetti aggiunti (`jq`, `curl`, `openssl`, `nginx`)
sono installati a una versione esatta, senza pacchetti consigliati; l'immagine finale occupa
circa 150 MB. Se Docker Hub risponde `429 Too Many Requests`, scarica la stessa base dal mirror
di Google e assegnale il nome atteso:

```bash
docker pull mirror.gcr.io/library/ubuntu:noble-20260917
docker tag mirror.gcr.io/library/ubuntu:noble-20260917 ubuntu:noble-20260917
```

## Usare un laboratorio

```bash
bash labs/container/run.sh 11
```

Si apre una shell nella radice del repository, come utente `lab`: da lì segui il laboratorio
come scritto, dal Setup in poi. Per eseguire un solo comando, aggiungilo dopo il numero:

```bash
bash labs/container/run.sh 11 bash -c 'cd labs/11-telemetry-views/data && jq -s length rete.jsonl'
```

```text
38
```

Un laboratorio non previsto viene rifiutato:

```bash
bash labs/container/run.sh 08
```

```text
Uso: bash labs/container/run.sh NN [comando...], con NN fra: 03 04 05 06 10 11.
Gli altri laboratori richiedono una VM: vedi labs/README.md.
```

## Che cosa garantisce `run.sh`

| Opzione | Effetto |
|---|---|
| `--rm` | il container viene cancellato all'uscita: è il teardown automatico |
| `--tmpfs /home/lab` (2 GB) | la home, con le cartelle `~/labNN`, è in memoria e sparisce con il container |
| `--network none` | nessuna interfaccia oltre al loopback: niente Internet e niente rete locale |
| `--cap-drop ALL` | nessuna capability Linux, nemmeno quelle che Docker concede di solito |
| `--security-opt no-new-privileges` | nessun programma può ottenere più privilegi di chi lo avvia |
| `--read-only` | il file system dell'immagine non si può modificare |
| `--user 10001:10001` | utente senza privilegi, mai root |
| `--mount ...,readonly` | i laboratori del repository si leggono ma non si modificano |
| `--memory 512m`, `--pids-limit 256` | un errore nell'esercizio non esaurisce le risorse del computer |

Il nginx del Lab 10 resta raggiungibile su `127.0.0.1:8090` **dentro** il container, dove si
eseguono anche i comandi `curl` del laboratorio; nessuna porta è pubblicata all'esterno. Il
preflight riporta la memoria del computer che ospita il container, non il limite di 512 MB.

La prova del teardown: la cartella creata in una sessione non esiste nella successiva.

```bash
bash labs/container/run.sh 11 mkdir -p /home/lab/lab11
bash labs/container/run.sh 11 ls -A /home/lab
```

Il secondo comando non stampa nulla.

## Verifica

`verify.sh` controlla che l'immagine mantenga queste promesse: il preflight di ogni laboratorio
supportato, l'utente, le capability, la sola lettura dell'immagine e dei laboratori, l'assenza di
rete, nginx del Lab 10 con il limite ai login, e che non resti nessun container. La CI lo esegue a
ogni modifica (job `labs-container`), dopo aver costruito l'immagine.

```bash
bash labs/container/verify.sh
```

```text
[OK]     lab 03: Esito: pronto (avvisi: 0).
[OK]     lab 04: Esito: pronto (avvisi: 0).
[OK]     lab 05: Esito: pronto (avvisi: 0).
[OK]     lab 06: Esito: pronto (avvisi: 0).
[OK]     lab 10: Esito: pronto (avvisi: 0).
[OK]     lab 11: Esito: pronto (avvisi: 0).
[OK]     utente 10001, senza privilegi
[OK]     nessuna capability, no-new-privileges attivo
[OK]     immagine e laboratori in sola lettura
[OK]     rete: solo il loopback
[OK]     nginx del Lab 10: 401 401 401 401 429
[OK]     nessun container rimasto dopo l'uso
```

Gli output dei laboratori 03, 05, 06, 10 e 11 eseguiti nel container coincidono con quelli dei
loro testi; nel Lab 04 cambiano, come già spiegato nel laboratorio, solo le date e le impronte
delle chiavi generate al momento.

## Aggiornare le versioni

- **Base:** Dependabot propone ogni settimana il nuovo digest, dopo sette giorni dalla
  pubblicazione (`.github/dependabot.yml`).
- **Pacchetti:** si aggiornano a mano. Quando l'archivio Ubuntu sostituisce una versione con un
  aggiornamento di sicurezza, la build fallisce con `E: Version '...' for 'jq' was not found` (con il pacchetto interessato): è voluto,
  perché un'immagine non deve cambiare in silenzio. Cerca la nuova versione, verifica che sia
  pubblicata da almeno sette giorni, aggiorna il `Dockerfile` ed esegui di nuovo `verify.sh`.

```bash
docker run --rm ubuntu:noble-20260917 sh -c 'apt-get update -qq && apt-cache policy jq curl openssl nginx | grep -E "^[a-z]|Candidate"'
```

Lo script usa Docker; `LAB_ENGINE=podman` passa le stesse opzioni a Podman, che le accetta, ma
il progetto verifica solo Docker.
