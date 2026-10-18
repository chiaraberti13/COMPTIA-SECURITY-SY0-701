# Lab on demand / On-demand labs

Owner: maintainers · Verified / Verificato: 2026-10-05 · Next review / Prossimo controllo: 2027-01-05.

## Italiano

### Scopo e prerequisiti

Le sessioni locali avviate su richiesta permettono di svolgere i laboratori originali **03, 04, 05, 06, 10 e 11** in un ambiente temporaneo, isolato e ripristinabile. Coprono gli obiettivi SY0-701 1.4, 2.4, 3.4, 4.4, 4.5, 4.8 e 4.9: analisi di log, PKI, backup, triage e telemetria. Livello: applicazione/analisi. Risultato atteso: produrre e verificare evidenze usando dati sintetici, poi ripristinare lo stato iniziale.

Servono il repository clonato, Node/npm nelle versioni supportate dall’app, `npm ci`, e un Docker Engine locale per container Linux (anche tramite Docker Desktop). Il comando non installa Docker, non scarica immagini implicitamente e non crea risorse cloud. I contesti Docker remoti, TCP e SSH sono rifiutati: i percorsi montati devono appartenere al computer locale. Su Windows si consiglia il checkout e Node in WSL con Docker Desktop integrato. I percorsi del repository con virgole non sono supportati dalla sintassi dei mount.

Costruisci una volta l’immagine già fissata per digest e versioni degli strumenti:

```bash
npm ci
docker build -t comptia-labs labs/container
npm run lab:session -- help
```

I Lab 01/02 usano l’app già descritta nei rispettivi testi. I Lab 07/08/09 modificano il sistema e richiedono le VM con rete isolata e snapshot di [labs/README.md](../labs/README.md#isolamento-e-ripristino). Non vengono abilitati aggirando i limiti del container.

### Avvio, accesso, ripristino e chiusura

```bash
# Avvia il Lab 03 per 45 minuti; senza --minutes la durata è 60 minuti.
npm run lab:session -- start 03 --minutes 45

# Mostra le sessioni del tuo utente e checkout: stato, immagine e scadenza.
npm run lab:session -- status

# Entra nella shell: segui Setup, Esercizio e Cleanup del testo del laboratorio.
npm run lab:session -- shell 03

# Oppure esegui un comando senza aprire una shell.
npm run lab:session -- exec 03 bash -c 'cd labs/03-log-analysis/data && wc -l auth.log'

# Ripristina uno stato pulito; stessa immagine e durata, nuova scadenza.
npm run lab:session -- reset 03

# Termina subito la sessione e cancella i suoi dati temporanei.
npm run lab:session -- stop 03

# Rimuove solo sessioni proprie scadute o ferme, ad esempio dopo una sospensione.
npm run lab:session -- clean
```

Avvio, stato, ripristino e chiusura stampano JSON con chiavi stabili; errori e aiuto sono bilingui. Usa `--lang en` prima del comando per l’inglese. La shell parte in `/repo`; i testi si trovano in `/repo/labs`. La home scrivibile è `/home/lab`. Il numero del laboratorio identifica lo slot: un secondo `start` sullo stesso slot fallisce senza modificare la sessione in corso, anche in caso di richieste concorrenti.

Uscire dalla shell, chiudere il terminale o terminare il comando `exec` **non** ferma la sessione. Un processo di durata nel container la mantiene fino alla scadenza e Docker la rimuove automaticamente all’uscita, senza un processo Node residente o un cron dell’utente. La scadenza mostrata è indicativa dell’avvio richiesto; il conteggio del processo comincia all’avvio effettivo del container. Una sospensione del computer/daemon o un container messo in pausa può ritardare il teardown: dopo il ritorno usa `status` e `clean`. `exec` rifiuta sessioni scadute, ferme o in pausa; non proroga la durata.

`reset` distrugge il container e la home, poi crea un nuovo container dalla **stessa immagine identificata dal suo SHA**, con durata originale e nuova scadenza. I dati originali del repository restano montati in sola lettura. Se la ricreazione fallisce dopo la rimozione, la vecchia sessione non viene recuperata: correggi l’errore Docker e usa `start`. Per applicare una nuova immagine costruita successivamente usa `stop` e `start`.

### Costi e limiti

| Risorsa | Per sessione | Limite e implicazione |
|---|---|---|
| Prezzo del servizio | Nessun servizio a pagamento invocato | Nessuna fatturazione a sessione o risorsa cloud creata; computer, energia, connessione e licenze degli strumenti sono a carico di chi li usa. |
| Durata | 60 minuti predefiniti | CLI: 1–120 minuti; reset riavvia la durata, exec non la estende. |
| Sessioni | Uno slot per ciascuno dei sei laboratori | Massimo sei contemporanee per utente/checkout sullo stesso daemon. Checkout diversi hanno scope distinti; non è una quota globale dell’host. |
| CPU | 0,5 CPU | Fino a 3 CPU complessive per sei sessioni del medesimo scope. |
| Memoria | 512 MiB, swap disabilitato | Fino a 3 GiB complessivi; esaurire la memoria può terminare i processi. Richiede il supporto ai limiti del Docker locale. |
| Processi | 256 | Un esercizio non può creare processi senza limite. |
| Home, `/tmp`, `/dev/shm` | tmpfs da 2 GiB, 64 MiB, 16 MiB | Capacità massime virtuali, non memoria prenotata; anche questi dati consumano il limite RAM di 512 MiB. Il preflight generale vede la capacità e la memoria dell’host, non la RAM effettiva concessa alla sessione. |
| Log Docker | 1 file da 1 MiB, driver `local` | Limite del log di servizio; l’output di `exec` va nel terminale, dove eventuali salvataggi sono responsabilità dell’utente. |
| Disco persistente | Immagine e cache della build | Restano sul computer dopo la sessione; misura con `docker image inspect comptia-labs --format '{{.Size}}'` e `docker system df`. Il manager non elimina immagini, cache o container estranei. |
| Rete | Solo loopback interno | Nessuna rete esterna né porte pubblicate; nginx del Lab 10 è raggiungibile solo dal proprio container. |
| Privilegi | UID/GID 10001, capability vuote | Root filesystem e sorgenti in sola lettura, `no-new-privileges`, nessun socket Docker montato. |
| Dati della sessione | Solo memoria temporanea | Persi a stop, reset e scadenza; esporta le sole evidenze sintetiche nel tuo terminale prima di chiudere. |

I container condividono il kernel dell’host. Questa funzione è destinata all’apprendimento locale da parte dell’utente che controlla Docker; non è un servizio pubblico, una sandbox per codice ostile o un sistema multiutente. Chi possiede già accesso al daemon può cambiare i limiti: il manager non revoca quel potere. L’app React/Express e il deploy Vercel non espongono comandi o socket Docker. Nessuna chiave AI viene passata alle sessioni.

I container vengono distinti per checkout e identità locale tramite un hash e controllati tramite etichette prima di `exec`, `stop`, `reset` o `clean`. Dopo il controllo si usa l’ID immutabile del container, così il riutilizzo di un nome non reindirizza l’operazione a un altro container. Non viene mai eseguito un `docker system prune` globale.

### Verifica

```bash
npm run test -- tests/labSession.test.ts
npm run lab:verify
```

Il primo comando usa un Docker simulato per input, limiti, slot, scadenza, ownership e ripristino. Il secondo richiede l’immagine costruita e Docker reale: verifica rete, privilegi e limiti effettivi, rientro, dati cancellati dal reset, chiusura e rimozione automatica dopo una durata breve. La CI `labs-container` esegue entrambi i verificatori (laboratori e sessioni). Il verificatore delle sessioni usa uno scope temporaneo distinto e pulisce solo i propri container anche in caso di errore.

## English

### Purpose and prerequisites

Local on-demand sessions run the original **03, 04, 05, 06, 10 and 11** labs in temporary, isolated, resettable environments. They cover SY0-701 objectives 1.4, 2.4, 3.4, 4.4, 4.5, 4.8 and 4.9: log analysis, PKI, backups, triage and telemetry. Level: application/analysis. Outcome: produce and verify evidence using synthetic data, then restore the starting state.

You need the cloned repository, the app’s supported Node/npm versions, `npm ci` and local Docker Engine for Linux containers (including Docker Desktop). The command does not install Docker, implicitly pull images or provision cloud resources. Remote TCP/SSH Docker contexts are refused: bind paths must belong to the local machine. On Windows, use a WSL checkout and Node with Docker Desktop integration. Repository paths containing commas cannot be represented safely by the mount syntax.

Build the existing digest/tool-version-pinned image once:

```bash
npm ci
docker build -t comptia-labs labs/container
npm run lab:session -- --lang en help
```

Labs 01/02 use the app as described in their guides. Labs 07/08/09 modify the system and require the isolated-network VMs and snapshots described in [labs/README.md](../labs/README.md#isolamento-e-ripristino). Container limits are not relaxed to enable them.

### Start, access, reset and stop

```bash
npm run lab:session -- --lang en start 03 --minutes 45
npm run lab:session -- --lang en status
npm run lab:session -- --lang en shell 03
npm run lab:session -- --lang en exec 03 bash -c 'cd labs/03-log-analysis/data && wc -l auth.log'
npm run lab:session -- --lang en reset 03
npm run lab:session -- --lang en stop 03
npm run lab:session -- --lang en clean
```

Start/status/reset/stop print JSON with stable keys; help and errors are bilingual. The shell starts in `/repo`; lab guides live in `/repo/labs`, and the writable home is `/home/lab`. The lab number identifies its slot: a duplicate `start` fails without altering the running session, including concurrent requests. Follow the lab’s Setup, Exercise and Cleanup instructions.

Leaving the shell, closing the terminal or finishing `exec` **does not** stop the session. A lifetime process in the container runs until expiry, when Docker removes the container automatically, without a resident Node process or user cron. The displayed expiry estimates the requested start; the lifetime process counts from actual container startup. Suspending the machine/daemon or pausing the container can delay teardown: check `status` and `clean` on return. `exec` refuses expired, stopped or paused sessions and never extends the duration.

`reset` destroys the container and home, then recreates it from the **same SHA-addressed image**, with the original duration and a new expiry. Original repository data remains mounted read-only. If recreation fails after removal, the old session cannot be recovered: resolve the Docker error and use `start`. To use a newly built image, use `stop` followed by `start`.

### Costs and limits

| Resource | Per session | Limit and implication |
|---|---|---|
| Service fee | No paid service invoked | No per-session billing or cloud provisioning; the user provides the computer, electricity, connectivity and tool licences. |
| Duration | Default 60 minutes | CLI: 1–120 minutes; reset restarts the duration, exec does not extend it. |
| Sessions | One slot for each of the six labs | At most six concurrent sessions per user/checkout on the same daemon. Different checkouts have different scopes; this is not a global host quota. |
| CPU | 0.5 CPU | Up to 3 CPUs total for six sessions in one scope. |
| Memory | 512 MiB, no swap | Up to 3 GiB total; exhaustion may kill processes. Requires resource-limit support in local Docker. |
| Processes | 256 | Exercises cannot create unlimited processes. |
| Home, `/tmp`, `/dev/shm` | 2 GiB, 64 MiB, 16 MiB tmpfs | Virtual capacities, not reserved memory; their data also counts toward the 512 MiB RAM limit. General preflight sees host capacity/memory rather than actual session RAM. |
| Docker logs | One 1 MiB file, `local` driver | Service log limit; exec output goes to the terminal, where any saved output is the user’s responsibility. |
| Persistent disk | Image and build cache | Remain after sessions; measure with `docker image inspect comptia-labs --format '{{.Size}}'` and `docker system df`. The manager never deletes images, caches or unrelated containers. |
| Network | Internal loopback only | No external network or published ports; Lab 10 nginx is reachable only inside its container. |
| Privileges | UID/GID 10001, no capabilities | Read-only root/source, `no-new-privileges`, no mounted Docker socket. |
| Session data | Temporary memory only | Lost on stop/reset/expiry; export only synthetic evidence to your terminal before stopping. |

Containers share the host kernel. This feature serves local learners who already control Docker; it is not a public service, hostile-code sandbox or multiuser system. Existing daemon access allows users to alter limits; the manager does not revoke that authority. React/Express and the Vercel deployment expose no Docker commands or sockets. No AI key is passed into a session.

Containers are scoped by a hash of checkout/local identity, and labels are checked before exec/stop/reset/clean. Operations then use the immutable container ID so reusing a name cannot redirect an operation. No global `docker system prune` is ever run.

### Verification

```bash
npm run test -- tests/labSession.test.ts
npm run lab:verify
```

The first uses simulated Docker for input validation, limits, slots, expiry, ownership and reset. The second needs the built image and real Docker: it checks actual network/privilege/resource limits, re-entry, clean reset, stop and automatic removal after a short duration. The `labs-container` CI job runs both lab and session verifiers. Session verification uses a distinct temporary scope and cleans only its own containers, including on failure.

## Sources / Fonti

Docker’s [container run reference](https://docs.docker.com/reference/cli/docker/container/run/) documents removal, init, read-only mounts and offline networking. [Resource constraints](https://docs.docker.com/engine/containers/resource_constraints/) explains CPU/memory caps and swap behaviour. Verified 2026-10-05. These container properties support local practice; they do not constitute an official CompTIA exam environment.
