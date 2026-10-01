# Lab 08 — Identity and access on Linux: groups, ACLs, sudo and an employee leaving

| Field | Value |
|---|---|
| SY0-701 objectives | 2.5, 4.6 |
| Risk | `moderate` |
| Duration | 50 minutes |

You manage the lifecycle of three accounts on a Linux server: you grant access to a folder by
group, give an auditor read-only access with an ACL, allow a single administrative command with
`sudo`, enforce password expiry, close the account of someone leaving the company and run an
access review. It is least privilege (2.5) applied with identity and access management tools
(4.6).

## Scenario

The accounting office has a Linux server with a shared folder. Four requests reach you: Anna
(accounting) must read and write the documents; the external auditor must read them without
changing them; Marco (systems) must be able to see the listening ports, but not become root;
Anna leaves the company at the end of the month. Finally you prepare the access review for the
manager.

## Prerequisites

- The **Ubuntu Server 24.04** virtual machine `lab-vm`, isolated as described in
  [Isolation and recovery](../README.md#isolamento-e-ripristino), with an administrator user.
- The `acl` package (`sudo apt install -y acl`).
- Knowledge: access control models and least privilege (objective 2.5), provisioning,
  deprovisioning and access review (4.6), in Domain 2 and Domain 4 of the guide.

## Topology

```text
[lab-vm console] ──► users anna, marco, revisore
                 ──► /srv/contabilita (group contabilita, ACL for revisore)
                 ──► /etc/sudoers.d/marco-rete
```

Everything happens inside the virtual machine, with no network. User, group and folder names
are Italian, as in the Italian version (`contabilita` is accounting, `revisore` is auditor).
The outputs are those the author obtained on Ubuntu 24.04: UID and GID numbers, dates and the
name of your administrator user (here `ubuntu`) may differ.

## Setup

1. On the host, with the virtual machine powered off, take the `prima-del-lab` snapshot (for
   libvirt and Hyper-V see [Snapshot and restore](../README.md#snapshot-e-ripristino)):

   ```bash
   VBoxManage snapshot "lab-vm" take "prima-del-lab"
   ```

2. Start the virtual machine, sign in from the console, install `acl` and create the evidence
   folder:

   ```bash
   sudo apt install -y acl
   mkdir -p ~/lab08
   ```

## Exercise

> ⚠️ The following steps create users, groups and `sudo` rules on the virtual machine. Run them
> only on `lab-vm`, never on a system in use.

1. **Create the group and the users.** Access is granted to the group, not to the person: when
   someone changes role you change the group, not the file permissions.

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

2. **The shared folder.** Permissions `2770`: owner and group read and write, others get
   nothing; the setgid bit (the leading `2`, the `s` in the permissions) makes files created
   inside inherit the group.

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

   Anna's file belongs to the `contabilita` group thanks to setgid. Marco, who is not in the
   group, cannot even list the folder. "Codice di uscita" is the exit code.

3. **Read-only for the auditor, with an ACL.** Adding them to the group would also give them
   write access. An ACL grants a permission to a single user without changing the group; the
   *default* ACL applies to files created in the future.

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

   The auditor reads but does not write. An ACL is easy to forget: `ls -l` flags it only with a
   `+` after the permissions, which is why it must be part of the access review.

4. **A single command with `sudo`.** Marco must see the listening ports, which needs root to
   know the processes. Instead of adding him to the `sudo` group, you grant exactly that
   command, with those arguments. The file is checked with `visudo -c` before installing it: an
   error in `sudoers` can break `sudo` for everyone.

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

   The authorized command works, nothing else does. `NOPASSWD` here lets you run the test
   without giving Marco a password; in production it is weighed case by case, because without a
   password whoever steals Marco's session also gets that command.

5. **Password expiry.** Require a change every 90 days with a warning 14 days before:

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

   `chage` aligns its columns with tabs: here they are shown with spaces.

   Recent guidance, such as NIST SP 800-63B, advises against periodic expiry in favor of a
   change only after compromise; many company policies and the exam still expect it. It is an
   example of the gap between the exam and practice.

6. **Anna leaves the company.** You lock the account instead of deleting it right away: files
   and logs stay attributable, and any investigation has what it needs. Then you remove her
   from the group and give her files to another owner.

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

   `L` means the password is locked; expiry on January 2, 1970 (one day after the Unix epoch)
   makes the account expired for SSH key login too, which locking the password alone does not
   stop.

7. **Access review.** Who is in the groups that matter, which human accounts exist and which
   `sudo` rules there are:

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

   Each line must be matched with an approved request. Anna still appears as an account (locked,
   on purpose); if nobody has deleted it a month from now, it is an orphaned account.

## Evidence

The `~/lab08` folder must contain:

- `acl.txt`, the output of `getfacl -p /srv/contabilita`;
- `sudo-marco.txt`, the output of `sudo -l -U marco`;
- `review.md`, one row for each account and each rule from step 7, with the request that
  justifies it and the date it must be reviewed.

Copy them to the host before the cleanup.

## Cleanup

The safest way is to restore the snapshot: power off the virtual machine and, on the host,

```bash
VBoxManage snapshot "lab-vm" restore "prima-del-lab"
```

To undo the changes one by one instead:

```bash
sudo rm /etc/sudoers.d/marco-rete
sudo rm -r -- /srv/contabilita
for u in anna marco revisore; do sudo userdel -r "$u"; done
sudo groupdel contabilita
rm -r -- ~/lab08
```

Check: `getent passwd anna marco revisore` and `getent group contabilita` print nothing.

## Final questions

1. Why does the auditor get an ACL rather than membership of the `contabilita` group?

   <details>
   <summary>Answer</summary>

   Because the group has read and write access: adding them would give more than needed. The
   ACL grants exactly read access to that user: least privilege. The price is visibility,
   because ACLs are not obvious at a glance and must be part of the review.

   </details>

2. What is the difference between giving Marco membership of the `sudo` group and the rule in
   step 4?

   <details>
   <summary>Answer</summary>

   The `sudo` group would give him any command as root: in practice, full control of the
   machine. The rule gives him one command with fixed arguments. If his account is
   compromised, the attacker gets the list of ports, not the machine.

   </details>

3. Why lock an account when an employee leaves instead of deleting it right away?

   <details>
   <summary>Answer</summary>

   Because after deletion their files keep a numeric UID that may be reassigned to a new user,
   who would become their owner; and because an investigation or an audit may need the account
   and its history. You lock it at once, transfer the files, and delete it after the period set
   by policy.

   </details>

4. An access review finds an account nobody can justify. What do you do?

   <details>
   <summary>Answer</summary>

   You disable it instead of deleting it, check in the logs when and from where it was last
   used, and find out who created it. An account without an owner is a risk even if nobody uses
   it: it may be an attacker's persistence, as in Lab 03.

   </details>
