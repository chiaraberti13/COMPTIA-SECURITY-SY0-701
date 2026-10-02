# Lab 03 — Finding an attack in the authentication logs

| Field | Value |
|---|---|
| SY0-701 objectives | 2.4, 4.4, 4.9 |
| Risk | `low` |
| Duration | 40 minutes |

You analyze a server's SSH authentication log with the tools every Linux system has (`grep`,
`awk`, `sort`, `uniq`) and rebuild two attacks: a successful brute force and a password
spraying run. It is what an analyst does when there is no SIEM, or when they need to check by
hand what the SIEM reported.

## Scenario

You are the analyst on shift. Server `web01` logged unusual activity during the night of
September 29, and the manager hands you a copy of its `auth.log`. You must answer three
questions: who tried to sign in and failed, did anyone succeed, and what did they do once
inside. At the end you deliver a timeline and the recommended actions.

## Prerequisites

- A Linux or macOS terminal, or WSL on Windows: you need `grep`, `awk`, `sort`, `uniq` and
  `sha256sum` (on macOS: `shasum -a 256`).
- The cloned repository: the log is in `labs/03-log-analysis/data/auth.log`.
- Knowledge: indicators of credential attacks (objective 2.4) and data sources for
  investigations (objective 4.9), in Domain 2 and Domain 4 of the guide.

## Topology

```text
[terminal] ──► labs/03-log-analysis/data/auth.log (local file, read only)
```

No network, no service: you work on a single file. The log is **synthetic**, generated for the
exercise by `data/genera_auth_log.py`, which recreates it byte for byte (see
[Synthetic lab data](../DATI.md)). External addresses belong to the blocks reserved for documentation
(`203.0.113.0/24` and `198.51.100.0/24`, RFC 5737), internal ones to a private network, and the
keys are fake.

## Setup

1. Go to the data folder:

   ```bash
   cd labs/03-log-analysis/data
   ```

2. Check that the file is the original one by comparing its hash. It is the same integrity
   check you run on evidence before analyzing it:

   ```bash
   sha256sum auth.log
   ```

   ```text
   13ea329df6706583f932aeff68c5831264116639e82b46ac655b1684e4e6b39c  auth.log
   ```

   If the hash differs, the file has been changed: restore it with `git checkout -- auth.log`.

3. Create the folder where you will save your evidence:

   ```bash
   mkdir -p ~/lab03
   ```

## Exercise

1. **Bound the period.** How many lines does the log contain, and what time span does it
   cover?

   ```bash
   wc -l auth.log
   head -n 1 auth.log | cut -c1-25
   tail -n 1 auth.log | cut -c1-25
   ```

   ```text
   47 auth.log
   2026-09-29T02:10:01+00:00
   2026-09-29T17:55:05+00:00
   ```

   Times are in UTC (`+00:00`). Write it down: when you compare the log with other sources, a
   different time zone shifts the timeline by hours.

2. **Count failed sign-ins per address.** In the message `Failed password … from IP port N
   ssh2` the address is the fourth field from the end, so `$(NF-3)` in `awk`:

   ```bash
   grep "Failed password" auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn
   ```

   ```text
        24 203.0.113.45
        12 198.51.100.23
         1 10.0.0.34
   ```

   Two external addresses stand out. A single failure from the internal network is normal:
   someone mistyped a password.

3. **Tell brute force from spraying.** The number of attempts is not enough: count how many
   *different* accounts each address tried. For a nonexistent user the message adds
   `invalid user`, and the name moves two fields along:

   ```bash
   grep "Failed password" auth.log \
     | awk '{user = ($7 == "invalid") ? $9 : $7; print $(NF-3), user}' \
     | sort -u | awk '{n[$1]++} END {for (ip in n) print n[ip], ip}' | sort -rn
   ```

   ```text
   12 198.51.100.23
   1 203.0.113.45
   1 10.0.0.34
   ```

   - `203.0.113.45`: 24 attempts against **a single** account. It is a **brute force**.
   - `198.51.100.23`: 12 attempts against **12 different accounts**, one each. It is
     **password spraying**: one common password tried against many users, to stay below the
     account lockout threshold.

4. **Look for successful sign-ins.** For each, print time, method, user and address:

   ```bash
   grep "Accepted" auth.log | awk '{print $1, $5, $7, $9}'
   ```

   ```text
   2026-09-29T02:12:01+00:00 password deploy 203.0.113.45
   2026-09-29T08:02:05+00:00 publickey alice 10.0.0.21
   2026-09-29T08:15:05+00:00 publickey bob 10.0.0.34
   2026-09-29T08:20:19+00:00 password bob 10.0.0.34
   2026-09-29T12:40:05+00:00 publickey alice 10.0.0.21
   2026-09-29T17:55:05+00:00 publickey bob 10.0.0.34
   ```

   The first line is the indicator of compromise: the `deploy` account signs in with a
   password from the same address as the brute force, at 02:12, outside working hours. The
   other sign-ins come from the internal network during working hours, almost all with a key.

5. **Rebuild what they did.** Filter the attacker's address and the administrative commands,
   leaving out the failed attempts already counted:

   ```bash
   grep -E "203\.0\.113\.45|sudo|useradd" auth.log | grep -v "Failed password"
   ```

   ```text
   2026-09-29T02:12:01+00:00 web01 sshd[2317]: Accepted password for deploy from 203.0.113.45 port 41024 ssh2
   2026-09-29T02:13:02+00:00 web01 sudo[2324]: deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/useradd -m -s /bin/bash svc-update
   2026-09-29T02:13:02+00:00 web01 useradd[2331]: new user: name=svc-update, UID=1004, GID=1004, home=/home/svc-update, shell=/bin/bash, from=/dev/pts/0
   2026-09-29T02:13:40+00:00 web01 sudo[2338]: deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/usermod -aG sudo svc-update
   2026-09-29T02:15:09+00:00 web01 sshd[2345]: Disconnected from user deploy 203.0.113.45 port 41024
   ```

   Within a minute the attacker creates the `svc-update` account and adds it to the `sudo`
   group: that is **persistence**. Even if the `deploy` password were changed, that account
   would remain theirs.

6. **Measure how long the brute force lasted** with a single `awk` command: number of
   attempts, first and last.

   ```bash
   awk '/Failed password/ && /203\.0\.113\.45/ {n++; if (!first) first=$1; last=$1} END {print n, first, last}' auth.log
   ```

   ```text
   24 2026-09-29T02:10:01+00:00 2026-09-29T02:11:56+00:00
   ```

   24 attempts in under two minutes, then the successful sign-in: a rule alerting on 10
   failures in 5 minutes from the same address would have fired at 02:10:46, before the
   sign-in.

7. **Save the incident timeline** in the evidence folder:

   ```bash
   grep -E "203\.0\.113\.45|sudo|useradd" auth.log > ~/lab03/timeline.txt
   wc -l ~/lab03/timeline.txt
   ```

   ```text
   29 /home/your-user/lab03/timeline.txt
   ```

## Evidence

The `~/lab03` folder must contain:

- `timeline.txt`, the 29 lines about the attacker and the administrative commands;
- `report.md`, with one row per attack (address, type, accounts involved, outcome) and the
  recommended actions: disable `deploy` and `svc-update`, revoke their sessions, block both
  addresses, require key-based authentication or MFA for SSH, and check the other servers for
  successful sign-ins from the same address.

## Cleanup

The lab started nothing and changed nothing on the system. Once you have delivered your
evidence, delete the working folder:

```bash
rm -r -- ~/lab03
```

The `auth.log` file is unchanged: you can check it again with `sha256sum auth.log`.

## Final questions

1. Why does password spraying not trigger account lockout, and which indicator reveals it?

   <details>
   <summary>Answer</summary>

   Lockout counts failures **per account**, and spraying makes only one per account. The
   indicator is the distribution by **origin**: many different accounts from the same address
   within minutes, as in step 3. That is why the detection rule must be written per address,
   not per user.

   </details>

2. The brute force against `deploy` succeeded. Which control would have prevented it, and
   which would only have detected it?

   <details>
   <summary>Answer</summary>

   Key-only SSH authentication (`PasswordAuthentication no`) or MFA would have **prevented**
   it, and to some extent a strong password with a limit on attempts (for example fail2ban). A
   SIEM rule on repeated failures would have **detected** it: useful, but only if someone
   responds within the two minutes the attacker needed.

   </details>

3. Why was checking the file's hash the first step, and why do you work on a copy of the log
   rather than on the server?

   <details>
   <summary>Answer</summary>

   The hash proves the evidence did not change between collection and analysis: it is the
   basis of the chain of custody. You work on a copy because a compromised server is not a
   reliable source, the attacker can delete or alter local logs, and because every command run
   on the original risks changing it. For the same reason, logs should be forwarded in real
   time to a central system.

   </details>

4. You found the `svc-update` account. Is deleting it enough to close the incident?

   <details>
   <summary>Answer</summary>

   No. First the evidence must be preserved, then the incident contained: disable the
   accounts, end the sessions, block the addresses. Then eradication: look for added SSH keys,
   scheduled tasks and other accounts, and check whether `deploy` used the same password
   elsewhere. Deleting the account first would destroy evidence and leave the other doors
   open.

   </details>
