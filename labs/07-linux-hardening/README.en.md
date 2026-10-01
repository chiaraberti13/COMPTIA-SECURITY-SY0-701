# Lab 07 — Hardening a Linux server: SSH, SUID and firewall

| Field | Value |
|---|---|
| SY0-701 objectives | 2.5, 4.1, 4.5 |
| Risk | `moderate` |
| Duration | 60 minutes |

You audit a freshly installed Ubuntu server and make it harder to attack: SSH with no root
login and no passwords, one unnecessary SUID binary fewer, a host firewall that lets in only
SSH. Then you check from a client that the block really works. These are the hardening
techniques of objective 2.5 applied to a baseline (4.1) with firewall rules (4.5).

## Scenario

The infrastructure team is about to put a new Linux server into production and asks you to
apply the company baseline before it is connected to the network. You must deliver the
configuration before and after, and proof that a service started by mistake cannot be reached
from outside.

## Prerequisites

- An **Ubuntu Server 24.04** virtual machine named `lab-vm`, connected to an isolated network
  as described in [Isolation and recovery](../README.md#isolamento-e-ripristino), with an
  administrator user who uses `sudo`.
- Access to the virtual machine's **console**, not via SSH: step 3 disables password login.
- The packages `openssh-server`, `nftables`, `iproute2` and `netcat-openbsd` (installed by
  default on the server edition, except sometimes `nftables`).
- Knowledge: hardening techniques (objective 2.5) and security baselines (4.1), in Domain 2 and
  Domain 4 of the guide.

## Topology

```text
[namespace "client" 10.99.0.2] ──veth──► [lab-vm 10.99.0.1: sshd :22, test service :8080]
                                          └── all inside the isolated virtual machine
```

The "client" is a network namespace created inside the same virtual machine: it simulates
another host on the network without needing a second machine. The `10.99.0.0/24` addresses
exist only inside `lab-vm`.

The outputs shown are those the author obtained on Ubuntu 24.04. PIDs, and on some installs the
name of the listening process, may differ: with systemd socket activation, `ss` shows `systemd`
instead of `sshd`.

## Setup

1. On the host, with the virtual machine powered off, take the `prima-del-lab` snapshot
   (VirtualBox; for libvirt and Hyper-V use the commands in
   [Snapshot and restore](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Start the virtual machine, sign in from the console and check that the network is isolated:
   this command must print nothing.

   ```bash
   ip route show default
   ```

3. Install whatever is missing and create the evidence folder:

   ```bash
   sudo apt install -y openssh-server nftables netcat-openbsd
   mkdir -p ~/lab07
   ```

## Exercise

> ⚠️ The following steps change the SSH configuration, the permissions of a system binary and
> the virtual machine's firewall. Run them only on `lab-vm`, from the console, after the snapshot.

1. **What is listening?** The first step of hardening is knowing what is exposed:

   ```bash
   sudo ss -tlnp '( sport = :22 )'
   ```

   ```text
   State  Recv-Q Send-Q Local Address:Port Peer Address:PortProcess
   LISTEN 0      128          0.0.0.0:22        0.0.0.0:*    users:(("sshd",pid=1070,fd=3))
   ```

   SSH listens on every interface (`0.0.0.0`). Run the command again without the filter,
   `sudo ss -tlnp`, and record in `~/lab07/services.txt` each service and whether it is really
   needed.

2. **Audit the effective SSH configuration.** `sshd -T` prints the values in force, including
   defaults that do not appear in the file:

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

   Password login allowed, root allowed with a key, X11 forwarding on and six attempts per
   connection: convenient values, not secure ones.

3. > ⚠️ The next step disables SSH password login. Before applying it you must have an
   > authorized SSH key for your user or, as in this lab, work from the virtual machine's
   > console.

   **Apply the baseline in a separate file**, which leaves `sshd_config` alone and can be
   removed with a single command. Then check the syntax before reloading: an error in the file
   would stop SSH from starting again.

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

   To see what happens with an error, try validating a wrong file:

   ```bash
   printf 'PermitRootLogin forse\n' > /tmp/sbagliato.conf
   sudo sshd -t -f /tmp/sbagliato.conf; echo "codice di uscita: $?"
   rm /tmp/sbagliato.conf
   ```

   ```text
   /tmp/sbagliato.conf line 1: unsupported option "forse".
   codice di uscita: 255
   ```

   The commands print a few Italian words ("sintassi OK", "codice di uscita", that is exit
   code) so that the output matches the Italian version of the lab.

4. **Permissions of sensitive files and SUID binaries.** A SUID binary runs with its owner's
   privileges, often root: each one is a possible escalation path.

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

   The permissions are correct: `/etc/shadow` is not readable by users. Among the SUID
   binaries, `chfn` lets a user change their own full name: a server does not need it. You
   remove it with `dpkg-statoverride`, so the next package update does not bring it back, as it
   would after a plain `chmod`:

   ```bash
   sudo dpkg-statoverride --update --add root root 0755 /usr/bin/chfn
   stat -c '%A %n' /usr/bin/chfn
   ```

   ```text
   -rwxr-xr-x /usr/bin/chfn
   ```

5. > ⚠️ The next step sets up a firewall with a drop policy: everything not explicitly allowed
   > is blocked. If the SSH port were wrong, you would lose remote access; from the console you
   > would not.

   **Host firewall with nftables.** Allow only loopback, replies to connections already open,
   SSH and a rate-limited ping; everything else is dropped and counted.

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

   `nft` prints the rules with tabs; here they are shown with spaces. The ICMPv6 rules are
   needed: without neighbor discovery, IPv6 does not work.

6. **Test the firewall from another "host".** Create the `client` namespace linked to the
   virtual machine and start a service on port 8080 by mistake:

   ```bash
   sudo ip netns add client
   sudo ip link add veth-host type veth peer name veth-client
   sudo ip link set veth-client netns client
   sudo ip addr add 10.99.0.1/24 dev veth-host && sudo ip link set veth-host up
   sudo ip netns exec client ip addr add 10.99.0.2/24 dev veth-client
   sudo ip netns exec client ip link set veth-client up
   python3 -m http.server 8080 --bind 0.0.0.0 > /dev/null 2>&1 &
   ```

   From the client, SSH answers and port 8080 does not, even though the service listens on
   every interface:

   ```bash
   sudo ip netns exec client nc -z -w 2 10.99.0.1 22; echo "codice di uscita: $?"
   sudo ip netns exec client nc -z -w 2 10.99.0.1 8080; echo "codice di uscita: $?"
   ```

   ```text
   Connection to 10.99.0.1 22 port [tcp/ssh] succeeded!
   codice di uscita: 0
   codice di uscita: 1
   ```

   The forgotten service cannot be reached: that is **defense in depth**. Disabling unneeded
   services is still the first step; the firewall covers what slips through. Stop the test
   service with `kill %1`.

## Evidence

The `~/lab07` folder must contain:

- `services.txt`, the listening services with the decision for each;
- `ssh-before-after.txt`, the two `sshd -T` outputs from steps 2 and 3;
- `firewall.nft` and the output of `sudo nft list table inet lab_filter`;
- `test.txt`, the two `nc` results from step 6.

Copy them to the host before the cleanup: restoring the snapshot deletes them.

## Cleanup

The safest way is to restore the snapshot: power off the virtual machine and, on the host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

If you would rather keep the machine and undo the changes one by one:

```bash
kill %1 2>/dev/null
sudo ip netns del client
sudo nft delete table inet lab_filter
sudo rm /etc/ssh/sshd_config.d/10-hardening.conf && sudo systemctl reload-or-restart ssh
sudo dpkg-statoverride --remove /usr/bin/chfn && sudo chmod u+s /usr/bin/chfn
rm -r -- ~/lab07
```

Then check that nothing is left: `sudo nft list tables` and `ip netns list` print nothing, and
`stat -c '%A' /usr/bin/chfn` is back to `-rwsr-xr-x`.

## Final questions

1. Why does the SSH baseline go into a file in `sshd_config.d` rather than into
   `sshd_config`?

   <details>
   <summary>Answer</summary>

   Because the main file belongs to the package: an update may offer to replace it, and local
   changes get lost or cause conflicts. A separate file can be deployed, checked and removed on
   its own, and makes it obvious what the baseline changes compared with the defaults. It is
   the same principle as configuration management.

   </details>

2. The firewall blocks port 8080. Is disabling the forgotten service unnecessary, then?

   <details>
   <summary>Answer</summary>

   No. The firewall is one layer: a wrong rule, an exception added in a hurry or an attacker
   already on the machine gets around it. A service that is off has no vulnerability to
   exploit. Reducing the attack surface comes first, the firewall covers mistakes: together
   they are defense in depth.

   </details>

3. Why check the syntax with `sshd -t` and `nft -c` before applying?

   <details>
   <summary>Answer</summary>

   Because a mistake in these files can lock you out of the machine: SSH that does not start
   again or a firewall that blocks everything. Validating first is a preventive control of
   change management, like the backout plan: here the backout plan is the snapshot.

   </details>

4. What is the difference between `PermitRootLogin no` and `PasswordAuthentication no`, and
   which attack does each stop?

   <details>
   <summary>Answer</summary>

   The first forbids direct login as root by any method: the attacker must compromise a user
   and then escalate, and every login is attributable to a person. The second forbids
   passwords for everyone: it stops brute force and password spraying, because without the
   private key there is nothing to guess.

   </details>
