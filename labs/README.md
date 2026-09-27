# Laboratori pratici

Esercizi da svolgere sul proprio computer per vedere in azione i concetti degli obiettivi
SY0-701. Ogni laboratorio segue lo stesso [template](TEMPLATE.md) e dichiara obiettivi,
durata e livello di rischio prima di qualsiasi comando.

> **English summary.** Hands-on exercises to run on your own machine. Every lab follows the
> same [template](TEMPLATE.md), states its SY0-701 objectives, duration and risk level up
> front, and has an English version (`README.en.md`) next to the Italian one. The rules
> below apply to every lab: only systems you own or are explicitly authorised to test, an
> isolated environment, synthetic data, and a tested cleanup. `tests/labs.test.ts` checks
> the structure of every lab and that its commands never target a host other than your own
> machine.

## Elenco dei laboratori

| Lab | Obiettivi | Rischio | Durata |
|---|---|---|---|
| [01 — Leggere gli header di sicurezza dell'app](01-security-headers/README.md) ([EN](01-security-headers/README.en.md)) | 2.5, 4.1 | `low` | 30 minuti |
| [02 — Prompt injection e threat model dell'app](02-prompt-injection/README.md) ([EN](02-prompt-injection/README.en.md)) | 2.4, 4.1, 5.2 | `low` | 45 minuti |

## Regole d'ingaggio

Valgono per ogni laboratorio, senza eccezioni.

1. **Solo sistemi tuoi o per cui hai un'autorizzazione scritta.** Scansioni, test di carico
   e tentativi di accesso contro sistemi di terzi sono illegali in quasi tutti i paesi (in
   Italia, per esempio, l'art. 615-ter del codice penale punisce l'accesso abusivo a un
   sistema informatico), anche quando lo scopo è imparare.
2. **Nessun bersaglio pubblico.** I comandi dei laboratori puntano solo a `127.0.0.1`,
   `localhost` o a macchine virtuali create per l'esercizio. Se un comando ti chiede di
   sostituire un indirizzo, usa sempre uno dei tuoi.
3. **Ambiente isolato.** Esegui i laboratori su una rete di cui hai il controllo. I servizi
   avviati per un esercizio ascoltano solo su `127.0.0.1` (per questa app: `HOST=127.0.0.1`)
   oppure su una rete virtuale solo-host (*host-only*).
4. **Dati sintetici.** Nessun dato personale, nessuna credenziale reale, nessuna chiave API
   di produzione. Quando un laboratorio ha bisogno di un segreto, ne usa uno finto e lo dice.
5. **Cleanup verificato.** Ogni laboratorio termina con i comandi per fermare ciò che ha
   avviato e per verificare che non sia rimasto nulla in ascolto.
6. **In caso di dubbio, fermati.** Se un passaggio ha un effetto diverso da quello descritto,
   interrompi il laboratorio e apri una issue invece di improvvisare.

## Livelli di rischio

| Livello | Che cosa significa | Che cosa richiede |
|---|---|---|
| `low` | Solo letture o richieste verso servizi avviati da te, su `127.0.0.1`. Nessuna modifica al sistema operativo. | Le regole d'ingaggio. |
| `moderate` | Modifiche reversibili alla configurazione di una macchina virtuale di laboratorio, oppure traffico generato su una rete virtuale isolata. | Uno snapshot della macchina virtuale prima di iniziare e un avviso `> ⚠️` prima di ogni passaggio che modifica il sistema. |
| `advanced-controlled` | Tecniche offensive (per esempio sfruttare una vulnerabilità) contro bersagli volutamente vulnerabili, in una rete senza accesso a Internet. | Tutto ciò che richiede `moderate`, più una rete senza uscita verso Internet verificata prima di iniziare e il ripristino dello snapshot alla fine. |

Il livello indica il rischio **per il tuo ambiente** se sbagli un passaggio, non la
difficoltà dell'esercizio.

## Isolamento e ripristino

- **Porte e interfacce.** Prima dell'esercizio, controlla su quale interfaccia ascolta il
  servizio: `ss -ltn` (Linux), `lsof -nP -iTCP -sTCP:LISTEN` (macOS e Linux) o
  `netstat -ano` (Windows). Deve comparire `127.0.0.1`, non `0.0.0.0`.
- **Macchine virtuali.** Per i livelli `moderate` e `advanced-controlled` usa una rete
  *host-only* o interna dell'hypervisor e fai uno snapshot prima di iniziare.
- **Cartella di lavoro.** Le evidenze di ogni laboratorio vanno in una cartella dedicata fuori
  dal repository (per esempio `~/lab01`), che il cleanup cancella.

## Scrivere un nuovo laboratorio

1. Copia [TEMPLATE.md](TEMPLATE.md) in `labs/NN-nome-breve/README.md` e scrivi la versione
   inglese in `README.en.md` nella stessa cartella.
2. Compila la tabella iniziale: gli obiettivi devono essere codici ufficiali SY0-701 e il
   rischio uno dei tre livelli qui sopra.
3. Esegui ogni comando su una macchina pulita e riporta l'output reale, non quello atteso.
4. Aggiungi il laboratorio all'elenco qui sopra e lancia `npm run check`: `tests/labs.test.ts`
   verifica sezioni, metadati, parità fra le due lingue e indirizzi usati nei comandi.
