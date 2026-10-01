# Lab 07 — Hardening di un server Linux: SSH, SUID e firewall

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.5, 4.1, 4.5 |
| Rischio | `moderate` |
| Durata | 60 minuti |

Fai l'audit di un server Ubuntu appena installato e lo rendi più difficile da attaccare: SSH
senza accesso di root né password, un binario SUID inutile in meno, un firewall host che lascia
entrare solo SSH. Poi verifichi da un client che il blocco funzioni davvero. Sono le tecniche di
hardening dell'obiettivo 2.5 applicate a una baseline (4.1) con regole firewall (4.5).

## Scenario

Il team infrastruttura sta per mettere in produzione un nuovo server Linux e ti chiede di
applicare la baseline aziendale prima che venga collegato alla rete. Devi consegnare la
configurazione prima e dopo, e la prova che un servizio avviato per errore non è raggiungibile
dall'esterno.

## Prerequisiti

- Una macchina virtuale **Ubuntu Server 24.04** chiamata `lab-vm`, collegata a una rete isolata
  come descritto in [Isolamento e ripristino](../README.md#isolamento-e-ripristino), con un
  utente amministratore che usa `sudo`.
- Accesso alla **console** della macchina virtuale, non via SSH: al passaggio 3 l'accesso con
  password viene disattivato.
- I pacchetti `openssh-server`, `nftables`, `iproute2` e `netcat-openbsd` (installati di
  default sulla versione server, tranne a volte `nftables`).
- Conoscenze: tecniche di hardening (obiettivo 2.5) e baseline di sicurezza (4.1), nel Dominio 2
  e nel Dominio 4 della guida.

## Topologia

```text
[namespace "client" 10.99.0.2] ──veth──► [lab-vm 10.99.0.1: sshd :22, servizio di prova :8080]
                                          └── tutto dentro la macchina virtuale isolata
```

Il "client" è un network namespace creato dentro la stessa macchina virtuale: simula un altro
host della rete senza bisogno di una seconda macchina. Gli indirizzi `10.99.0.0/24` esistono
solo dentro `lab-vm`.

Gli output riportati sono quelli ottenuti dall'autore su Ubuntu 24.04. I PID, e su alcune
installazioni il nome del processo in ascolto, possono essere diversi: con l'attivazione via
socket di systemd, `ss` mostra `systemd` al posto di `sshd`.

## Setup

1. Sull'host, con la macchina virtuale spenta, crea lo snapshot `prima-del-lab` (VirtualBox;
   per libvirt e Hyper-V usa i comandi di [Snapshot e ripristino](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Avvia la macchina virtuale, accedi dalla console e verifica che la rete sia isolata: questo
   comando non deve stampare nulla.

   ```bash
   ip route show default
   ```

3. Installa ciò che manca e crea la cartella delle evidenze:

   ```bash
   sudo apt install -y openssh-server nftables netcat-openbsd
   mkdir -p ~/lab07
   ```

## Esercizio

> ⚠️ I passaggi seguenti cambiano la configurazione di SSH, i permessi di un binario di sistema e il
> firewall della macchina virtuale. Eseguili solo su `lab-vm`, dalla console, dopo lo snapshot.

1. **Che cosa è in ascolto?** Il primo passo dell'hardening è sapere che cosa è esposto:

   ```bash
   sudo ss -tlnp '( sport = :22 )'
   ```

   ```text
   State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess
   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=1070,fd=3))
   ```

   SSH ascolta su tutte le interfacce (`0.0.0.0`). Rifai il comando senza il filtro, `sudo ss
   -tlnp`, e annota in `~/lab07/servizi.txt` ogni servizio e se serve davvero.

2. **Audit della configurazione SSH effettiva.** `sshd -T` stampa i valori in vigore, compresi i
   default che non compaiono nel file:

   ```bash
   sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|kbdinteractiveauthentication|x11forwarding|maxauthtries) '
   ```

   ```text
   maxauthtries 6
   permitrootlogin without-password
   passwordauthentication yes
   kbdinteractiveauthentication no
   x11forwarding yes
   ```

   Accesso con password consentito, root ammesso con chiave, inoltro X11 attivo e sei tentativi
   per connessione: valori comodi, non sicuri.

3. > ⚠️ Il passaggio seguente disattiva l'accesso SSH con password. Prima di applicarlo devi
   > avere una chiave SSH autorizzata per il tuo utente oppure, come in questo laboratorio,
   > lavorare dalla console della macchina virtuale.

   **Applica la baseline con un file a parte**, che non tocca `sshd_config` e si toglie con un
   solo comando. Poi controlla la sintassi prima di ricaricare: un errore nel file
   impedirebbe a SSH di ripartire.

   ```bash
   sudo tee /etc/ssh/sshd_config.d/10-hardening.conf > /dev/null <<'EOF'
   # Lab 07: hardening SSH
   PermitRootLogin no
   PasswordAuthentication no
   KbdInteractiveAuthentication no
   X11Forwarding no
   MaxAuthTries 3
   EOF
   sudo sshd -t && echo "sintassi OK"
   sudo systemctl reload-or-restart ssh
   sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|kbdinteractiveauthentication|x11forwarding|maxauthtries) '
   ```

   ```text
   sintassi OK
   maxauthtries 3
   permitrootlogin no
   passwordauthentication no
   kbdinteractiveauthentication no
   x11forwarding no
   ```

   Per vedere che cosa succede con un errore, prova la validazione su un file sbagliato:

   ```bash
   printf 'PermitRootLogin forse\n' > /tmp/sbagliato.conf
   sudo sshd -t -f /tmp/sbagliato.conf; echo "codice di uscita: $?"
   rm /tmp/sbagliato.conf
   ```

   ```text
   /tmp/sbagliato.conf line 1: unsupported option "forse".
   codice di uscita: 255
   ```

4. **Permessi dei file sensibili e binari SUID.** Un binario SUID gira con i privilegi del suo
   proprietario, spesso root: ognuno è un possibile percorso di escalation.

   ```bash
   stat -c '%a %U:%G %n' /etc/shadow /etc/passwd /etc/ssh/sshd_config
   sudo find /usr -xdev -perm -4000 -type f | sort
   ```

   ```text
   640 root:shadow /etc/shadow
   644 root:root /etc/passwd
   644 root:root /etc/ssh/sshd_config
   /usr/bin/chfn
   /usr/bin/chsh
   /usr/bin/gpasswd
   /usr/bin/mount
   /usr/bin/newgrp
   /usr/bin/passwd
   /usr/bin/su
   /usr/bin/sudo
   /usr/bin/umount
   /usr/lib/dbus-1.0/dbus-daemon-launch-helper
   /usr/lib/openssh/ssh-keysign
   /usr/lib/polkit-1/polkit-agent-helper-1
   ```

   I permessi sono corretti: `/etc/shadow` non è leggibile dagli utenti. Fra i SUID, `chfn`
   permette a un utente di cambiare il proprio nome completo: su un server non serve. Lo togli
   con `dpkg-statoverride`, così il prossimo aggiornamento del pacchetto non lo ripristina, come
   farebbe con un semplice `chmod`:

   ```bash
   sudo dpkg-statoverride --update --add root root 0755 /usr/bin/chfn
   stat -c '%A %n' /usr/bin/chfn
   ```

   ```text
   -rwxr-xr-x /usr/bin/chfn
   ```

5. > ⚠️ Il passaggio seguente imposta un firewall con policy di scarto: tutto ciò che non è
   > esplicitamente consentito viene bloccato. Se la porta di SSH fosse sbagliata, perderesti
   > l'accesso remoto; dalla console no.

   **Firewall host con nftables.** Consenti solo loopback, le risposte alle connessioni già
   aperte, SSH e un ping limitato; il resto viene scartato e contato.

   ```bash
   cat > ~/lab07/firewall.nft <<'EOF'
   table inet lab_filter {
     chain input {
       type filter hook input priority filter; policy drop;
       iif "lo" accept
       ct state established,related accept
       ct state invalid drop
       tcp dport 22 accept
       icmp type echo-request limit rate 5/second accept
       icmpv6 type { echo-request, nd-neighbor-solicit, nd-neighbor-advert, nd-router-advert } accept
       counter comment "scartati dalla policy"
     }
   }
   EOF
   sudo nft -c -f ~/lab07/firewall.nft && echo "controllo OK"
   sudo nft -f ~/lab07/firewall.nft
   sudo nft list table inet lab_filter
   ```

   ```text
   controllo OK
   table inet lab_filter {
       chain input {
           type filter hook input priority filter; policy drop;
           iif "lo" accept
           ct state established,related accept
           ct state invalid drop
           tcp dport 22 accept
           icmp type echo-request limit rate 5/second burst 5 packets accept
           icmpv6 type { echo-request, nd-router-advert, nd-neighbor-solicit, nd-neighbor-advert } accept
           counter packets 0 bytes 0 comment "scartati dalla policy"
       }
   }
   ```

   `nft` stampa le regole con i tab; qui sono riportati con spazi. Le regole ICMPv6 servono:
   senza neighbor discovery IPv6 non funziona.

6. **Prova il firewall da un altro "host".** Crea il namespace `client` collegato alla macchina
   virtuale e avvia per errore un servizio sulla porta 8080:

   ```bash
   sudo ip netns add client
   sudo ip link add veth-host type veth peer name veth-client
   sudo ip link set veth-client netns client
   sudo ip addr add 10.99.0.1/24 dev veth-host && sudo ip link set veth-host up
   sudo ip netns exec client ip addr add 10.99.0.2/24 dev veth-client
   sudo ip netns exec client ip link set veth-client up
   python3 -m http.server 8080 --bind 0.0.0.0 > /dev/null 2>&1 &
   ```

   Dal client, SSH risponde e la porta 8080 no, anche se il servizio è in ascolto su tutte le
   interfacce:

   ```bash
   sudo ip netns exec client nc -z -w 2 10.99.0.1 22; echo "codice di uscita: $?"
   sudo ip netns exec client nc -z -w 2 10.99.0.1 8080; echo "codice di uscita: $?"
   ```

   ```text
   Connection to 10.99.0.1 22 port [tcp/ssh] succeeded!
   codice di uscita: 0
   codice di uscita: 1
   ```

   Il servizio dimenticato non è raggiungibile: è la **difesa in profondità**. La disattivazione
   dei servizi inutili resta comunque il primo passo; il firewall copre ciò che sfugge.
   Ferma il servizio di prova con `kill %1`.

## Evidenze

Nella cartella `~/lab07` devono esserci:

- `servizi.txt`, i servizi in ascolto con la decisione per ciascuno;
- `ssh-prima-dopo.txt`, le due uscite di `sshd -T` dei passaggi 2 e 3;
- `firewall.nft` e l'output di `sudo nft list table inet lab_filter`;
- `prova.txt`, i due risultati di `nc` del passaggio 6.

Copiali sull'host prima del cleanup: il ripristino dello snapshot li cancella.

## Cleanup

Il modo più sicuro è ripristinare lo snapshot: spegni la macchina virtuale e, sull'host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

Se invece vuoi tenere la macchina e annullare le modifiche una per una:

```bash
kill %1 2>/dev/null
sudo ip netns del client
sudo nft delete table inet lab_filter
sudo rm /etc/ssh/sshd_config.d/10-hardening.conf && sudo systemctl reload-or-restart ssh
sudo dpkg-statoverride --remove /usr/bin/chfn && sudo chmod u+s /usr/bin/chfn
rm -r -- ~/lab07
```

E verifica che non sia rimasto nulla: `sudo nft list tables` e `ip netns list` non stampano
nulla, e `stat -c '%A' /usr/bin/chfn` torna a `-rwsr-xr-x`.

## Domande finali

1. Perché la baseline SSH va in un file di `sshd_config.d` e non in `sshd_config`?

   <details>
   <summary>Risposta</summary>

   Perché il file principale appartiene al pacchetto: un aggiornamento può proporre di
   sostituirlo, e le modifiche locali si perdono o creano conflitti. Un file separato si
   distribuisce, si verifica e si toglie da solo, e rende evidente che cosa la baseline
   cambia rispetto ai default. È lo stesso principio della gestione della configurazione.

   </details>

2. Il firewall blocca la porta 8080. Allora disattivare il servizio dimenticato è superfluo?

   <details>
   <summary>Risposta</summary>

   No. Il firewall è uno strato: una regola sbagliata, un'eccezione aggiunta in fretta o un
   attaccante già dentro la macchina lo aggirano. Un servizio spento non ha vulnerabilità da
   sfruttare. Ridurre la superficie d'attacco viene prima, il firewall copre gli errori: insieme
   sono la difesa in profondità.

   </details>

3. Perché si controlla la sintassi con `sshd -t` e `nft -c` prima di applicare?

   <details>
   <summary>Risposta</summary>

   Perché un errore in questi file può togliere l'accesso alla macchina: SSH che non riparte o
   un firewall che blocca tutto. Validare prima è un controllo preventivo del change
   management, come il piano di rientro: qui il rientro è lo snapshot.

   </details>

4. Che differenza c'è fra `PermitRootLogin no` e `PasswordAuthentication no`, e quale attacco
   ferma ciascuno?

   <details>
   <summary>Risposta</summary>

   Il primo vieta l'accesso diretto come root con qualunque metodo: l'attaccante deve
   compromettere un utente e poi elevare i privilegi, e ogni accesso è attribuibile a una
   persona. Il secondo vieta le password per tutti: ferma brute force e password spraying,
   perché senza la chiave privata non c'è niente da indovinare.

   </details>
