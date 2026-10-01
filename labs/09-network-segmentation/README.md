# Lab 09 — Segmentare una rete: uffici, server e ospiti dietro un router con nftables

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 2.5, 3.2 |
| Rischio | `moderate` |
| Durata | 50 minuti |

Costruisci dentro una macchina virtuale tre reti, uffici, server e ospiti, collegate da un router.
Prima verifichi che in una rete piatta tutti raggiungono tutto, poi applichi sul router le
regole di una segmentazione minima e misuri che cosa cambia, compreso il movimento laterale da un
server compromesso. La segmentazione (2.5) e le zone di sicurezza con firewall (3.2) diventano
regole che puoi leggere e provare.

## Scenario

Una piccola azienda ha uffici, un server applicativo e un Wi-Fi per gli ospiti sulla stessa rete.
Il responsabile ti chiede di dimostrare il problema e di proporre la separazione: gli uffici devono
usare l'applicazione sul server, gli ospiti non devono raggiungere nulla di interno, e se il server
venisse compromesso non deve poter attaccare le postazioni.

## Prerequisiti

- La macchina virtuale **Ubuntu Server 24.04** `lab-vm`, isolata come descritto in
  [Isolamento e ripristino](../README.md#isolamento-e-ripristino), con un utente amministratore.
- I pacchetti `iproute2`, `nftables`, `netcat-openbsd`, `iputils-ping` e `python3`.
- Conoscenze: segmentazione e isolamento (obiettivo 2.5), zone di sicurezza e firewall (3.2), nel
  Dominio 2 e nel Dominio 3 della guida.

## Topologia

```text
                      ┌──────── router (inoltro IP, nftables) ────────┐
[uffici 10.10.10.10] ─┤ r-uffici 10.10.10.1                           │
[server 10.10.20.10] ─┤ r-server 10.10.20.1   servizio sulla 8080     │
[ospiti 10.10.30.10] ─┤ r-ospiti 10.10.30.1                           │
                      └───────────────────────────────────────────────┘
```

Ogni riquadro è un *network namespace*: uno stack di rete separato, con interfacce, indirizzi e
regole propri, dentro la stessa macchina virtuale. Le coppie *veth* fanno da cavi. Nessun
indirizzo esiste fuori da `lab-vm`.

Gli output sono quelli ottenuti dall'autore su Ubuntu 24.04. Le parole «aperta» e «bloccata» le
stampano i comandi del laboratorio.

## Setup

1. Sull'host, con la macchina virtuale spenta, crea lo snapshot `prima-del-lab` (per libvirt e
   Hyper-V vedi [Snapshot e ripristino](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Avvia la macchina virtuale, accedi dalla console, installa i pacchetti e crea la cartella
   delle evidenze:

   ```bash
   sudo apt install -y iproute2 nftables netcat-openbsd iputils-ping
   mkdir -p ~/lab09
   ```

## Esercizio

> ⚠️ I passaggi seguenti creano namespace, interfacce e regole di firewall, e attivano l'inoltro
> IP dentro il namespace `router`. Eseguili solo su `lab-vm`.

1. **Costruisci la rete.** Quattro namespace, tre cavi verso il router, un indirizzo e una rotta
   predefinita per ciascuna zona; poi l'inoltro IP sul router e il servizio sul server, aspettando
   che sia in ascolto.

   ```bash
   for ns in router uffici server ospiti; do sudo ip netns add $ns; sudo ip -n $ns link set lo up; done
   i=10
   for z in uffici server ospiti; do
     sudo ip link add r-$z type veth peer name eth0 netns $z
     sudo ip link set r-$z netns router
     sudo ip -n router addr add 10.10.$i.1/24 dev r-$z && sudo ip -n router link set r-$z up
     sudo ip -n $z addr add 10.10.$i.10/24 dev eth0 && sudo ip -n $z link set eth0 up
     sudo ip -n $z route add default via 10.10.$i.1
     i=$((i+10))
   done
   sudo ip netns exec router sysctl -qw net.ipv4.ip_forward=1
   sudo ip netns exec server python3 -m http.server 8080 --bind 10.10.20.10 > /dev/null 2>&1 &
   until sudo ip netns exec server ss -tln | grep -q ':8080 '; do sleep 1; done
   sudo ip -n router -brief addr show
   ```

   ```text
   lo               UNKNOWN        127.0.0.1/8
   r-uffici@if2     UP             10.10.10.1/24
   r-server@if2     UP             10.10.20.1/24
   r-ospiti@if2     UP             10.10.30.1/24
   ```

2. **La rete piatta.** Senza regole, il router inoltra tutto: anche gli ospiti raggiungono il
   server e le postazioni degli uffici.

   ```bash
   for z in uffici ospiti; do
     printf '%s -> server:8080 ' "$z"
     sudo ip netns exec $z nc -z -w 2 10.10.20.10 8080 2>/dev/null && echo aperta || echo bloccata
   done
   printf 'ospiti -> ping uffici: '
   sudo ip netns exec ospiti ping -c 1 -W 1 10.10.10.10 | grep -o "[0-9]*% packet loss"
   ```

   ```text
   uffici -> server:8080 aperta
   ospiti -> server:8080 aperta
   ospiti -> ping uffici: 0% packet loss
   ```

3. **Le regole della segmentazione**, scritte come elenco di ciò che è permesso. Tutto il resto
   viene scartato dalla policy della catena `forward`, quella che il router applica al traffico
   che lo attraversa.

   ```bash
   cat > ~/lab09/segmenti.nft <<'EOF'
   table inet segmenti {
     chain forward {
       type filter hook forward priority filter; policy drop;
       ct state established,related accept
       iifname "r-uffici" oifname "r-server" tcp dport 8080 accept
       iifname "r-uffici" oifname "r-server" icmp type echo-request accept
       iifname "r-ospiti" counter comment "ospiti verso le reti interne"
     }
   }
   EOF
   sudo ip netns exec router nft -c -f ~/lab09/segmenti.nft && echo "controllo OK"
   sudo ip netns exec router nft -f ~/lab09/segmenti.nft
   ```

   ```text
   controllo OK
   ```

   La regola `ct state established,related` lascia passare le **risposte**: il server può
   rispondere agli uffici, ma non aprire per primo una connessione verso di loro.

4. **Rifai le prove**, aggiungendo il caso del server compromesso che prova a raggiungere gli
   uffici:

   ```bash
   for z in uffici ospiti; do
     printf '%s -> server:8080 ' "$z"
     sudo ip netns exec $z nc -z -w 2 10.10.20.10 8080 2>/dev/null && echo aperta || echo bloccata
   done
   for z in uffici ospiti; do
     printf '%s -> ping server: ' "$z"
     sudo ip netns exec $z ping -c 1 -W 1 10.10.20.10 | grep -o "[0-9]*% packet loss"
   done
   printf 'ospiti -> ping uffici: '
   sudo ip netns exec ospiti ping -c 1 -W 1 10.10.10.10 | grep -o "[0-9]*% packet loss"
   printf 'server -> ping uffici: '
   sudo ip netns exec server ping -c 1 -W 1 10.10.10.10 | grep -o "[0-9]*% packet loss"
   ```

   ```text
   uffici -> server:8080 aperta
   ospiti -> server:8080 bloccata
   uffici -> ping server: 0% packet loss
   ospiti -> ping server: 100% packet loss
   ospiti -> ping uffici: 100% packet loss
   server -> ping uffici: 100% packet loss
   ```

   Gli uffici usano l'applicazione; gli ospiti non raggiungono nulla di interno; il server non
   può avviare connessioni verso le postazioni, quindi un attaccante che lo controllasse non
   avrebbe una strada diretta per il **movimento laterale**.

5. **Il contatore come evidenza.** La regola con `counter` conta il traffico degli ospiti prima
   che la policy lo scarti:

   ```bash
   sudo ip netns exec router nft list chain inet segmenti forward | grep counter
   ```

   ```text
   iifname "r-ospiti" counter packets 4 bytes 288 comment "ospiti verso le reti interne"
   ```

   Quattro pacchetti, 288 byte: due SYN da 60 byte del tentativo verso la 8080 (il secondo è la
   ritrasmissione) e due ping da 84 byte. In una rete vera, un contatore che sale sulla regola
   degli ospiti è un segnale da inviare al SIEM.

## Evidenze

Nella cartella `~/lab09` devono esserci:

- `segmenti.nft`, le regole;
- `prove.txt`, i risultati dei passaggi 2 e 4, prima e dopo;
- `matrice.md`, una tabella zona di origine × zona di destinazione con «consentito» o «negato»
  e il motivo di ciascuna cella.

Copiali sull'host prima del cleanup.

## Cleanup

Il modo più sicuro è ripristinare lo snapshot: spegni la macchina virtuale e, sull'host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

Per annullare invece le modifiche a mano: fermare il servizio e cancellare i namespace elimina
anche le interfacce veth, le regole e l'inoltro IP, che esistevano solo dentro di loro.

```bash
kill %1 2>/dev/null
for ns in router uffici server ospiti; do sudo ip netns del $ns; done
rm -r -- ~/lab09
```

Verifica: `ip netns list` non stampa nulla.

## Domande finali

1. Perché le regole elencano ciò che è permesso, con una policy `drop`, invece di elencare ciò
   che è vietato?

   <details>
   <summary>Risposta</summary>

   Perché con una *deny list* tutto ciò che non hai previsto passa: un servizio nuovo, una porta
   dimenticata. Con una *allow list* e il rifiuto predefinito, ciò che non hai previsto è
   bloccato, e l'errore si manifesta come un servizio che non funziona, visibile e correggibile,
   invece che come un'esposizione silenziosa.

   </details>

2. Il server risponde agli uffici ma non può contattarli per primo. Quale regola lo rende
   possibile, e perché è importante?

   <details>
   <summary>Risposta</summary>

   `ct state established,related accept`: il firewall è *stateful* e lascia passare solo il
   traffico che appartiene a una connessione già aperta dagli uffici. È importante perché i
   server esposti sono i primi a essere compromessi: impedire che inizino connessioni verso le
   postazioni limita il movimento laterale.

   </details>

3. Le VLAN separano già il traffico. Perché serve anche il firewall fra le zone?

   <details>
   <summary>Risposta</summary>

   Perché le VLAN separano al livello 2, ma il routing fra VLAN le ricollega al livello 3: senza
   regole, come al passaggio 2, tutto torna raggiungibile. Il firewall (o le ACL sul router)
   decide che cosa può passare da una zona all'altra. Separazione e controllo del transito
   lavorano insieme.

   </details>

4. Come trasformeresti questo laboratorio in una rete Zero Trust?

   <details>
   <summary>Risposta</summary>

   Qui la decisione dipende dalla zona di provenienza: chi è negli uffici è fidato. In Zero Trust
   ogni richiesta verso l'applicazione verrebbe autorizzata in base all'identità dell'utente,
   allo stato del dispositivo e al contesto, da un policy engine, e applicata da un punto di
   enforcement davanti al server. La segmentazione resta, ma diventa più fine: per applicazione,
   non per rete.

   </details>
