# Lab 08 — Identità e accessi su Linux: gruppi, ACL, sudo e uscita di un dipendente

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.5, 4.6 |
| Rischio | `moderate` |
| Durata | 50 minuti |

Gestisci il ciclo di vita di tre account su un server Linux: assegni l'accesso a una cartella
per gruppo, dai a un revisore la sola lettura con una ACL, concedi un solo comando amministrativo
con `sudo`, imponi la scadenza delle password, chiudi l'account di chi lascia l'azienda e fai la
revisione degli accessi. È il minimo privilegio (2.5) applicato con gli strumenti di gestione
delle identità e degli accessi (4.6).

## Scenario

L'ufficio contabilità ha un server Linux con una cartella condivisa. Ti arrivano quattro
richieste: Anna (contabilità) deve leggere e scrivere i documenti; il revisore esterno deve
leggerli senza modificarli; Marco (sistemi) deve poter vedere le porte in ascolto, ma non diventare
root; Anna lascia l'azienda a fine mese. Alla fine prepari la revisione degli accessi per il
responsabile.

## Prerequisiti

- La macchina virtuale **Ubuntu Server 24.04** `lab-vm`, isolata come descritto in
  [Isolamento e ripristino](../README.md#isolamento-e-ripristino), con un utente amministratore.
- Il pacchetto `acl` (`sudo apt install -y acl`).
- Conoscenze: modelli di controllo degli accessi e minimo privilegio (obiettivo 2.5), provisioning,
  deprovisioning e revisione degli accessi (4.6), nel Dominio 2 e nel Dominio 4 della guida.

## Topologia

```text
[console di lab-vm] ──► utenti anna, marco, revisore
                    ──► /srv/contabilita (gruppo contabilita, ACL per revisore)
                    ──► /etc/sudoers.d/marco-rete
```

Tutto avviene dentro la macchina virtuale, senza rete. Gli output sono quelli ottenuti
dall'autore su Ubuntu 24.04: i numeri di UID e GID, le date e il nome del tuo utente
amministratore (qui `ubuntu`) possono essere diversi.

## Setup

1. Sull'host, con la macchina virtuale spenta, crea lo snapshot `prima-del-lab` (per libvirt e
   Hyper-V vedi [Snapshot e ripristino](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Avvia la macchina virtuale, accedi dalla console, installa `acl` e crea la cartella delle
   evidenze:

   ```bash
   sudo apt install -y acl
   mkdir -p ~/lab08
   ```

## Esercizio

> ⚠️ I passaggi seguenti creano utenti, gruppi e regole `sudo` sulla macchina virtuale. Eseguili
> solo su `lab-vm`, mai su un sistema in uso.

1. **Crea gruppo e utenti.** L'accesso si assegna al gruppo, non alla persona: quando qualcuno
   cambia ruolo si cambia il gruppo, non i permessi dei file.

   ```bash
   sudo groupadd contabilita
   sudo useradd -m -s /bin/bash -G contabilita anna
   sudo useradd -m -s /bin/bash marco
   sudo useradd -m -s /bin/bash revisore
   id anna; id marco
   ```

   ```text
   uid=1001(anna) gid=1003(anna) groups=1003(anna),1002(contabilita)
   uid=1002(marco) gid=1004(marco) groups=1004(marco)
   ```

2. **La cartella condivisa.** Permessi `2770`: proprietario e gruppo leggono e scrivono, gli altri
   niente; il bit setgid (il `2` iniziale, la `s` nei permessi) fa ereditare il gruppo ai file
   creati dentro.

   ```bash
   sudo install -d -o root -g contabilita -m 2770 /srv/contabilita
   ls -ld /srv/contabilita
   sudo -u anna sh -c 'echo "Bilancio di prova" > /srv/contabilita/bilancio.txt'
   sudo ls -l /srv/contabilita
   sudo -u marco ls /srv/contabilita; echo "codice di uscita: $?"
   ```

   ```text
   drwxrws--- 2 root contabilita 4096 Oct  1 09:10 /srv/contabilita
   total 4
   -rw-rw-r-- 1 anna contabilita 18 Oct  1 09:10 bilancio.txt
   ls: cannot open directory '/srv/contabilita': Permission denied
   codice di uscita: 2
   ```

   Il file di Anna appartiene al gruppo `contabilita` grazie al setgid. Marco, che non è nel
   gruppo, non riesce nemmeno a elencare la cartella.

3. **Sola lettura per il revisore, con una ACL.** Aggiungerlo al gruppo gli darebbe anche la
   scrittura. Una ACL dà un permesso a un singolo utente senza cambiare il gruppo; la ACL
   *default* vale per i file creati in futuro.

   ```bash
   sudo setfacl -m u:revisore:rx /srv/contabilita
   sudo setfacl -m u:revisore:r /srv/contabilita/bilancio.txt
   sudo setfacl -d -m u:revisore:rX /srv/contabilita
   getfacl -p /srv/contabilita
   sudo -u revisore cat /srv/contabilita/bilancio.txt
   sudo -u revisore touch /srv/contabilita/nuovo.txt; echo "codice di uscita: $?"
   ```

   ```text
   # file: /srv/contabilita
   # owner: root
   # group: contabilita
   # flags: -s-
   user::rwx
   user:revisore:r-x
   group::rwx
   mask::rwx
   other::---
   default:user::rwx
   default:user:revisore:r-x
   default:group::rwx
   default:mask::rwx
   default:other::---

   Bilancio di prova
   touch: cannot touch '/srv/contabilita/nuovo.txt': Permission denied
   codice di uscita: 1
   ```

   Il revisore legge ma non scrive. Una ACL è facile da dimenticare: `ls -l` la segnala solo con
   un `+` dopo i permessi, ed è per questo che va inclusa nella revisione degli accessi.

4. **Un solo comando con `sudo`.** Marco deve vedere le porte in ascolto, che richiede root per
   conoscere i processi. Invece di aggiungerlo al gruppo `sudo`, gli concedi esattamente quel
   comando, con quegli argomenti. Il file si controlla con `visudo -c` prima di installarlo: un
   errore in `sudoers` può bloccare `sudo` per tutti.

   ```bash
   echo 'marco ALL=(root) NOPASSWD: /usr/bin/ss -tlnp' > /tmp/marco-rete
   sudo visudo -cf /tmp/marco-rete
   sudo install -m 0440 /tmp/marco-rete /etc/sudoers.d/marco-rete && rm /tmp/marco-rete
   sudo -l -U marco | tail -2
   sudo -u marco sudo -n /usr/bin/ss -tlnp | head -1
   sudo -u marco sudo -n cat /etc/shadow; echo "codice di uscita: $?"
   ```

   ```text
   /tmp/marco-rete: parsed OK
   User marco may run the following commands on vm:
       (root) NOPASSWD: /usr/bin/ss -tlnp
   State  Recv-Q Send-Q Local Address:Port  Peer Address:PortProcess
   sudo: a password is required
   codice di uscita: 1
   ```

   Il comando autorizzato funziona, tutto il resto no. `NOPASSWD` qui serve a eseguire la prova
   senza dare una password a Marco; in produzione si valuta caso per caso, perché senza
   password chi ruba la sessione di Marco ottiene anche quel comando.

5. **Scadenza delle password.** Imponi un cambio ogni 90 giorni con avviso 14 giorni prima:

   ```bash
   sudo chage -M 90 -W 14 anna
   sudo chage -l anna
   ```

   ```text
   Last password change                                 : Oct 01, 2026
   Password expires                                     : Dec 30, 2026
   Password inactive                                    : never
   Account expires                                      : never
   Minimum number of days between password change       : 0
   Maximum number of days between password change       : 90
   Number of days of warning before password expires    : 14
   ```

   `chage` allinea le colonne con tabulazioni: qui sono riportate con spazi.

   Le linee guida recenti, come NIST SP 800-63B, sconsigliano la scadenza periodica a favore
   del cambio solo in caso di compromissione; molte policy aziendali e l'esame la prevedono
   ancora. È un esempio della differenza fra esame e pratica.

6. **Anna lascia l'azienda.** Si blocca l'account invece di cancellarlo subito: i file e i log
   restano attribuibili, e un'eventuale indagine ha ciò che serve. Poi si toglie dal gruppo e si
   assegnano i suoi file a un altro proprietario.

   ```bash
   sudo usermod -L -e 1 anna
   sudo passwd -S anna
   sudo chage -l anna | grep "Account expires"
   sudo find /srv -user anna
   sudo chown root /srv/contabilita/bilancio.txt
   sudo gpasswd -d anna contabilita
   ```

   ```text
   anna L 2026-10-01 0 90 14 -1
   Account expires                                      : Jan 02, 1970
   /srv/contabilita/bilancio.txt
   Removing user anna from group contabilita
   ```

   `L` indica la password bloccata; la scadenza al 2 gennaio 1970 (un giorno dopo l'epoca Unix)
   rende l'account scaduto anche per l'accesso con chiave SSH, che il blocco della password da
   solo non ferma.

7. **Revisione degli accessi.** Chi è nei gruppi che contano, quali account umani esistono e
   quali regole `sudo` ci sono:

   ```bash
   getent group contabilita sudo
   awk -F: '$3 >= 1000 && $3 < 65534 {print $1, $3, $7}' /etc/passwd
   ls /etc/sudoers.d/
   ```

   ```text
   contabilita:x:1002:
   sudo:x:27:ubuntu
   ubuntu 1000 /bin/bash
   anna 1001 /bin/bash
   marco 1002 /bin/bash
   revisore 1003 /bin/bash
   README
   marco-rete
   ```

   Ogni riga va confrontata con una richiesta approvata. Anna compare ancora come account
   (bloccato, ed è voluto); se fra un mese nessuno l'avrà cancellato, è un account orfano.

## Aiuti e soluzione

### Indicatori di successo

- `marco` non riesce a elencare `/srv/contabilita`; `revisore` legge `bilancio.txt` ma non crea
  file.
- `sudo -l -U marco` mostra un solo comando, `/usr/bin/ss -tlnp`.
- `passwd -S anna` mostra `L` e `chage -l anna` una scadenza dell'account nel passato.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

Il file creato da Anna appartiene al gruppo `anna`? Manca il bit setgid: la cartella deve avere
permessi `2770`.

</details>

<details>
<summary>Suggerimento 2</summary>

Il revisore non legge i file creati dopo la ACL? Serve anche la ACL *default* (`setfacl -d`),
che vale per i file nuovi.

</details>

<details>
<summary>Soluzione ragionata</summary>

Ogni richiesta riceve esattamente il permesso che le serve: lettura e scrittura al gruppo, sola
lettura al revisore con una ACL, un solo comando a Marco. All'uscita di Anna l'account si blocca
e scade, perché la sola password bloccata non ferma una chiave SSH, si toglie dal gruppo e i
suoi file passano a un altro proprietario. La revisione finale confronta ogni accesso con una
richiesta approvata.

</details>

### Errori comuni

- Aggiungere il revisore al gruppo: otterrebbe anche la scrittura.
- Scrivere in `/etc/sudoers.d/` senza controllare il file con `visudo -c`.
- Bloccare solo la password di chi lascia l'azienda: con una chiave SSH entra ancora.
- Cancellare subito l'account: i suoi file restano a un UID che può essere riassegnato.

## Evidenze

Nella cartella `~/lab08` devono esserci:

- `acl.txt`, l'output di `getfacl -p /srv/contabilita`;
- `sudo-marco.txt`, l'output di `sudo -l -U marco`;
- `revisione.md`, una riga per ciascun account e ciascuna regola del passaggio 7, con la
  richiesta che lo giustifica e la data in cui va rivisto.

Copiali sull'host prima del cleanup.

## Cleanup

Il modo più sicuro è ripristinare lo snapshot: spegni la macchina virtuale e, sull'host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

Per annullare invece le modifiche una per una:

```bash
sudo rm /etc/sudoers.d/marco-rete
sudo rm -r -- /srv/contabilita
for u in anna marco revisore; do sudo userdel -r "$u"; done
sudo groupdel contabilita
rm -r -- ~/lab08
```

Verifica: `getent passwd anna marco revisore` e `getent group contabilita` non stampano nulla.

## Domande finali

1. Perché il revisore riceve una ACL e non l'appartenenza al gruppo `contabilita`?

   <details>
   <summary>Risposta</summary>

   Perché il gruppo ha lettura e scrittura: aggiungerlo gli darebbe più del necessario. La ACL
   concede esattamente la lettura a quell'utente: è il minimo privilegio. Il prezzo è la
   visibilità, perché le ACL non si vedono a colpo d'occhio e vanno incluse nella revisione.

   </details>

2. Che differenza c'è fra dare a Marco l'appartenenza al gruppo `sudo` e la regola del
   passaggio 4?

   <details>
   <summary>Risposta</summary>

   Il gruppo `sudo` gli darebbe qualunque comando come root: di fatto, il controllo completo
   della macchina. La regola gli dà un solo comando con argomenti fissi. Se il suo account
   viene compromesso, l'attaccante ottiene l'elenco delle porte, non la macchina.

   </details>

3. Perché all'uscita di un dipendente si blocca l'account invece di cancellarlo subito?

   <details>
   <summary>Risposta</summary>

   Perché cancellandolo i suoi file restano con un UID numerico che può essere riassegnato a un
   nuovo utente, che ne diventerebbe proprietario; e perché un'indagine o un audit potrebbero
   aver bisogno dell'account e della sua storia. Si blocca subito, si trasferiscono i file, e si
   cancella dopo il periodo stabilito dalla policy.

   </details>

4. Una revisione degli accessi trova un account che nessuno sa giustificare. Che cosa fai?

   <details>
   <summary>Risposta</summary>

   Lo disabiliti invece di cancellarlo, controlli nei log quando è stato usato l'ultima volta e
   da dove, e cerchi chi l'ha creato. Un account senza un responsabile è un rischio anche se
   nessuno lo usa: può essere la persistenza di un attaccante, come nel Lab 03.

   </details>
