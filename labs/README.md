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
> machine. Labs above the `low` risk level run in a virtual machine on an isolated virtual
> network, with a snapshot taken before and restored after, using the commands below for
> VirtualBox, libvirt/KVM and Hyper-V.

## Elenco dei laboratori

| Lab | Obiettivi | Rischio | Durata |
|---|---|---|---|
| [01 — Leggere gli header di sicurezza dell'app](01-security-headers/README.md) ([versione inglese](01-security-headers/README.en.md)) | 2.5, 4.1 | `low` | 30 minuti |
| [02 — Prompt injection e threat model dell'app](02-prompt-injection/README.md) ([versione inglese](02-prompt-injection/README.en.md)) | 2.4, 4.1, 5.2 | `low` | 45 minuti |
| [03 — Trovare un attacco nei log di autenticazione](03-log-analysis/README.md) ([versione inglese](03-log-analysis/README.en.md)) | 2.4, 4.4, 4.9 | `low` | 40 minuti |
| [04 — Una piccola PKI: CSR, catena, scadenza e revoca](04-certificates/README.md) ([versione inglese](04-certificates/README.en.md)) | 1.4 | `low` | 45 minuti |
| [05 — Backup completo, incrementale e prova di ripristino](05-backup-restore/README.md) ([versione inglese](05-backup-restore/README.en.md)) | 3.4 | `low` | 35 minuti |
| [06 — Triage di dodici allarmi del SIEM](06-incident-triage/README.md) ([versione inglese](06-incident-triage/README.en.md)) | 4.4, 4.8, 4.9 | `low` | 45 minuti |
| [07 — Hardening di un server Linux: SSH, SUID e firewall](07-linux-hardening/README.md) ([versione inglese](07-linux-hardening/README.en.md)) | 2.5, 4.1, 4.5 | `moderate` | 60 minuti |
| [08 — Identità e accessi su Linux: gruppi, ACL, sudo e uscita di un dipendente](08-linux-iam/README.md) ([versione inglese](08-linux-iam/README.en.md)) | 2.5, 4.6 | `moderate` | 50 minuti |
| [09 — Segmentare una rete: uffici, server e ospiti dietro un router con nftables](09-network-segmentation/README.md) ([versione inglese](09-network-segmentation/README.en.md)) | 2.5, 3.2 | `moderate` | 50 minuti |

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
- **Macchine virtuali.** Per i livelli `moderate` e `advanced-controlled` il laboratorio gira in
  una macchina virtuale collegata a una rete virtuale isolata, con uno snapshot fatto prima di
  iniziare: le due procedure qui sotto sono obbligatorie e `tests/labs.test.ts` verifica che il
  laboratorio le citi nel Setup e nel Cleanup.
- **Cartella di lavoro.** Le evidenze di ogni laboratorio vanno in una cartella dedicata fuori
  dal repository (per esempio `~/lab01`), che il cleanup cancella.

Negli esempi la macchina virtuale si chiama `lab-vm` e lo snapshot `prima-del-lab`: usa gli
stessi nomi, così i comandi del laboratorio si copiano senza modifiche.

### Rete virtuale isolata

Una rete *interna* (VirtualBox), *isolata* (libvirt) o *privata* (Hyper-V) collega le macchine
virtuali fra loro senza passare dall'host verso Internet. Con la macchina virtuale spenta:

```bash
# VirtualBox: collega la prima scheda di rete a una rete interna chiamata lab-net
VBoxManage modifyvm "lab-vm" --nic1 intnet --intnet1 "lab-net"

# libvirt/KVM: una rete senza elemento <forward> non instrada nulla verso l'esterno
cat > lab-isolated.xml <<'EOF'
<network>
  <name>lab-isolated</name>
  <bridge name="virbr-lab"/>
  <ip address="192.168.100.1" netmask="255.255.255.0"/>
</network>
EOF
virsh net-define lab-isolated.xml
virsh net-start lab-isolated
```

```powershell
# Hyper-V: uno switch privato collega solo le macchine virtuali fra loro
New-VMSwitch -Name "lab-private" -SwitchType Private
Connect-VMNetworkAdapter -VMName "lab-vm" -SwitchName "lab-private"
```

**Verifica senza mandare traffico a nessuno.** Dentro la macchina virtuale, `ip route show
default` non deve stampare nulla: senza una rotta predefinita nessun pacchetto può uscire dalla
rete del laboratorio. Non si verifica l'isolamento provando a contattare un sito esterno,
perché se l'isolamento non funziona quel traffico arriva davvero a un terzo.

### Snapshot e ripristino

Lo snapshot fotografa la macchina virtuale prima dell'esercizio; il ripristino la riporta
esattamente a quel punto, qualunque cosa sia stata modificata.

```bash
# VirtualBox
VBoxManage snapshot "lab-vm" take "prima-del-lab"
VBoxManage snapshot "lab-vm" restore "prima-del-lab"   # a macchina spenta

# libvirt/KVM
virsh snapshot-create-as lab-vm prima-del-lab
virsh snapshot-revert lab-vm prima-del-lab
```

```powershell
# Hyper-V
Checkpoint-VM -Name "lab-vm" -SnapshotName "prima-del-lab"
Restore-VMCheckpoint -VMName "lab-vm" -Name "prima-del-lab" -Confirm:$false
```

- `moderate`: snapshot nel **Setup**; nel **Cleanup** ripristino oppure verifica che le
  modifiche siano state annullate.
- `advanced-controlled`: snapshot e verifica della rete (`ip route show default` vuoto) nel
  **Setup**, ripristino dello snapshot sempre nel **Cleanup**: una macchina su cui è stata
  sfruttata una vulnerabilità non si considera mai pulita.

## Scrivere un nuovo laboratorio

1. Copia [TEMPLATE.md](TEMPLATE.md) in `labs/NN-nome-breve/README.md` e scrivi la versione
   inglese in `README.en.md` nella stessa cartella.
2. Compila la tabella iniziale: gli obiettivi devono essere codici ufficiali SY0-701 e il
   rischio uno dei tre livelli qui sopra.
3. Esegui ogni comando su una macchina pulita e riporta l'output reale, non quello atteso.
4. Se il laboratorio analizza dei file, mettili in `labs/NN-nome-breve/data/` e registrali
   nel [catalogo dei dati sintetici](DATI.md), con l'impronta e, se generati, con il generatore.
5. Aggiungi il laboratorio all'elenco qui sopra e lancia `npm run check`: `tests/labs.test.ts`
   verifica sezioni, metadati, parità fra le due lingue e indirizzi usati nei comandi.
