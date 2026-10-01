# Lab 09 — Segmenting a network: offices, servers and guests behind an nftables router

| Field | Value |
|---|---|
| SY0-701 objectives | 2.5, 3.2 |
| Risk | `moderate` |
| Duration | 50 minutes |

Inside a virtual machine you build three networks, offices, servers and guests, linked by a
router. First you check that on a flat network everyone reaches everything, then you apply a
minimal segmentation on the router and measure what changes, including lateral movement from a
compromised server. Segmentation (2.5) and security zones with firewalls (3.2) become rules you
can read and test.

## Scenario

A small company has its offices, an application server and a guest Wi-Fi on the same network.
The manager asks you to demonstrate the problem and propose the separation: the offices must use
the application on the server, guests must reach nothing internal, and if the server were
compromised it must not be able to attack the workstations.

## Prerequisites

- The **Ubuntu Server 24.04** virtual machine `lab-vm`, isolated as described in
  [Isolation and recovery](../README.md#isolamento-e-ripristino), with an administrator user.
- The packages `iproute2`, `nftables`, `netcat-openbsd`, `iputils-ping` and `python3`.
- Knowledge: segmentation and isolation (objective 2.5), security zones and firewalls (3.2), in
  Domain 2 and Domain 3 of the guide.

## Topology

```text
                      ┌──────── router (IP forwarding, nftables) ─────┐
[uffici 10.10.10.10] ─┤ r-uffici 10.10.10.1                           │
[server 10.10.20.10] ─┤ r-server 10.10.20.1   service on port 8080    │
[ospiti 10.10.30.10] ─┤ r-ospiti 10.10.30.1                           │
                      └───────────────────────────────────────────────┘
```

Each box is a *network namespace*: a separate network stack, with its own interfaces, addresses
and rules, inside the same virtual machine. *veth* pairs act as cables. No address exists outside
`lab-vm`. Zone names are Italian, as in the Italian version: `uffici` are the offices, `ospiti`
the guests.

The outputs are those the author obtained on Ubuntu 24.04. The words "aperta" (open) and
"bloccata" (blocked) are printed by the lab's own commands.

## Setup

1. On the host, with the virtual machine powered off, take the `prima-del-lab` snapshot (for
   libvirt and Hyper-V see [Snapshot and restore](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Start the virtual machine, sign in from the console, install the packages and create the
   evidence folder:

   ```bash
   sudo apt install -y iproute2 nftables netcat-openbsd iputils-ping
   mkdir -p ~/lab09
   ```

## Exercise

> ⚠️ The following steps create namespaces, interfaces and firewall rules, and turn on IP
> forwarding inside the `router` namespace. Run them only on `lab-vm`.

1. **Build the network.** Four namespaces, three cables to the router, an address and a default
   route for each zone; then IP forwarding on the router and the service on the server, waiting
   until it is listening.

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

2. **The flat network.** With no rules, the router forwards everything: guests too reach the
   server and the office workstations.

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

3. **The segmentation rules**, written as a list of what is allowed. Everything else is dropped
   by the policy of the `forward` chain, the one the router applies to traffic passing through
   it.

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

   The `ct state established,related` rule lets **replies** through: the server can answer the
   offices, but cannot open a connection to them first.

4. **Run the tests again**, adding the case of the compromised server trying to reach the
   offices:

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

   The offices use the application; guests reach nothing internal; the server cannot start
   connections to the workstations, so an attacker controlling it would have no direct path for
   **lateral movement**.

5. **The counter as evidence.** The rule with `counter` counts guest traffic before the policy
   drops it:

   ```bash
   sudo ip netns exec router nft list chain inet segmenti forward | grep counter
   ```

   ```text
   iifname "r-ospiti" counter packets 4 bytes 288 comment "ospiti verso le reti interne"
   ```

   Four packets, 288 bytes: two 60-byte SYNs from the attempt on port 8080 (the second is the
   retransmission) and two 84-byte pings. On a real network, a counter rising on the guest rule
   is a signal to send to the SIEM.

## Evidence

The `~/lab09` folder must contain:

- `segmenti.nft`, the rules;
- `tests.txt`, the results of steps 2 and 4, before and after;
- `matrix.md`, a table of source zone × destination zone with "allowed" or "denied" and the
  reason for each cell.

Copy them to the host before the cleanup.

## Cleanup

The safest way is to restore the snapshot: power off the virtual machine and, on the host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

To undo the changes by hand instead: stopping the service and deleting the namespaces also
removes the veth interfaces, the rules and IP forwarding, which existed only inside them.

```bash
kill %1 2>/dev/null
for ns in router uffici server ospiti; do sudo ip netns del $ns; done
rm -r -- ~/lab09
```

Check: `ip netns list` prints nothing.

## Final questions

1. Why do the rules list what is allowed, with a `drop` policy, instead of listing what is
   forbidden?

   <details>
   <summary>Answer</summary>

   Because with a *deny list* everything you did not foresee gets through: a new service, a
   forgotten port. With an *allow list* and default denial, what you did not foresee is blocked,
   and the mistake shows up as a service that does not work, visible and fixable, rather than as
   a silent exposure.

   </details>

2. The server answers the offices but cannot contact them first. Which rule makes that possible,
   and why does it matter?

   <details>
   <summary>Answer</summary>

   `ct state established,related accept`: the firewall is *stateful* and lets through only
   traffic belonging to a connection the offices already opened. It matters because exposed
   servers are the first to be compromised: stopping them from starting connections to the
   workstations limits lateral movement.

   </details>

3. VLANs already separate traffic. Why is a firewall between the zones needed too?

   <details>
   <summary>Answer</summary>

   Because VLANs separate at layer 2, but routing between VLANs joins them again at layer 3:
   without rules, as in step 2, everything is reachable again. The firewall (or the ACLs on the
   router) decides what may pass from one zone to another. Separation and transit control work
   together.

   </details>

4. How would you turn this lab into a Zero Trust network?

   <details>
   <summary>Answer</summary>

   Here the decision depends on the source zone: whoever is in the offices is trusted. In Zero
   Trust each request to the application would be authorized by a policy engine based on the
   user's identity, the device's posture and the context, and enforced by an enforcement point in
   front of the server. Segmentation remains, but it becomes finer: per application, not per
   network.

   </details>
