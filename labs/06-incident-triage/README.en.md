# Lab 06 — Triage of twelve SIEM alerts

| Field | Value |
|---|---|
| SY0-701 objectives | 4.4, 4.8, 4.9 |
| Risk | `low` |
| Duration | 45 minutes |

You receive one day's alert export and the asset inventory. With `jq` you set aside the false
positives, link the alerts that tell the same story and decide where to start. It is the first
job of a SOC analyst: not to investigate everything, but to work out what matters first.

## Scenario

You are on the morning shift and find twelve alerts from the night and the early hours. The SOC
manager wants three things within half an hour: which alerts are false positives and why, which
incident must be opened first, and which containment action you propose.

## Prerequisites

- `jq` 1.6 or later (`jq --version`): on Debian and Ubuntu `sudo apt install jq`, on macOS
  `brew install jq`, on Windows `winget install jqlang.jq`.
- The cloned repository: the data is in `labs/06-incident-triage/data/`.
- Knowledge: incident response phases (objective 4.8), data sources (4.9) and alert handling
  (4.4), in Domain 4 of the guide.

## Topology

```text
[terminal] ──► labs/06-incident-triage/data/alerts.json    (12 alerts, read only)
           ──► labs/06-incident-triage/data/inventory.json (assets, approved exceptions)
```

Local files only. The data is **synthetic**: names, hosts and users are made up, external
addresses belong to the documentation block `203.0.113.0/24` (RFC 5737) and the domain
`update-check.example` uses the reserved `.example` suffix (RFC 2606).

## Setup

1. Go to the data folder and check that the files are the original ones:

   ```bash
   cd labs/06-incident-triage/data
   sha256sum alerts.json inventory.json
   ```

   ```text
   a029e348605707ca19f63f4406fb40e9bee02a7a4a62575250083512d3e37350  alerts.json
   c67751204e667eefe1024d4ae69079d968f51ef52fd184d51aef72e635a56c95  inventory.json
   ```

2. Create the evidence folder:

   ```bash
   mkdir -p ~/lab06
   ```

## Exercise

1. **How many alerts, and how severe?**

   ```bash
   jq length alerts.json
   jq -r '.[].severity' alerts.json | sort | uniq -c | sort -rn
   ```

   ```text
   12
         5 medium
         3 low
         3 high
         1 critical
   ```

2. **Which hosts do they cluster on?** Several alerts on the same host are often stages of the
   same attack:

   ```bash
   jq -r 'group_by(.host)[] | "\(length) \(.[0].host)"' alerts.json | sort -rn
   ```

   ```text
   4 WS-042
   2 WEB-01
   2 IDP
   1 WS-017
   1 MAIL
   1 FS-01
   1 DB-01
   ```

3. **Set aside the authorized scans.** The inventory lists the approved vulnerability scanner:
   port scan alerts coming from it are expected false positives.

   ```bash
   jq -r --slurpfile inv inventory.json \
     '.[] | select(.detail | test("src=(" + ($inv[0].approved_scanners | join("|")) + ") ")) | "\(.id) \(.host) \(.rule)"' \
     alerts.json
   ```

   ```text
   A-101 WEB-01 Port scan detected
   A-102 DB-01 Port scan detected
   ```

   They are closed as false positives, with a proposal to exclude that source from the rule
   (*alert tuning*), so they do not come back tomorrow.

4. **Check the overnight transfer.** 6 GB going out at 02:30 looks alarming, but the inventory
   has an approved transfer from that host to that destination:

   ```bash
   jq -r --slurpfile inv inventory.json \
     '.[] | . as $a | select(any($inv[0].approved_transfers[]; . as $t | $t.host == $a.host and ($a.detail | contains("dst=" + $t.dst)))) | "\(.id) \(.host) \(.detail)"' \
     alerts.json
   ```

   ```text
   A-103 FS-01 dst=203.0.113.99 bytes=6442450944 proto=https
   ```

   It is the nightly off-site backup. Probably a false positive, but confirming costs little:
   ask the backup team whether the volume matches the usual one. An attacker who knows about
   the exception could hide right there.

5. **Rebuild the story of WS-042.** Take every alert that names the host or its user and sort
   them by time:

   ```bash
   jq -r '[.[] | select(.host == "WS-042" or (.detail | contains("WS-042")) or (.detail | contains("l.bianchi")))] | sort_by(.time)[] | "\(.time[11:19]) \(.source) \(.rule)"' alerts.json
   ```

   ```text
   09:12:02 Mail Phishing reported by user
   09:14:37 EDR Office spawned PowerShell
   09:15:02 DNS Newly registered domain
   09:16:02 DNS Periodic beaconing
   10:20:44 EDR Credential dumping
   10:23:10 IdP Admin sign-in from unusual host
   ```

   Six alerts from five different systems, each of varying severity on its own, tell a single
   incident: the user receives a document with a macro, Word launches PowerShell, the malware
   contacts a domain registered the day before every 60 seconds, an hour later it dumps
   credentials from memory, and at 10:23 an administrator account signs in **from WS-042**.
   The attacker has moved from a workstation to a domain administrator.

6. **Compare with an automatic score.** A common way to order the queue is to multiply the
   alert severity by the asset criticality (from 1 to 4):

   ```bash
   jq -r --slurpfile inv inventory.json \
     '{"low":1,"medium":2,"high":3,"critical":4} as $w | .[] | ($inv[0].assets[.host].criticality) as $c | "\($w[.severity] * $w[$c]) \(.id) \(.host) \(.rule)"' \
     alerts.json | sort -k1,1nr | head -6
   ```

   ```text
   12 A-111 IDP Admin sign-in from unusual host
   9 A-103 FS-01 Large outbound transfer
   8 A-104 IDP Impossible travel
   8 A-110 WS-042 Credential dumping
   6 A-101 WEB-01 Port scan detected
   6 A-102 DB-01 Port scan detected
   ```

   The score puts A-111 on top, rightly, but right after it come two false positives and an
   "impossible travel" that goes through the corporate VPN, and the credential theft ends up
   fourth. The score ranks **single** alerts; the correlation in step 5 says that A-105, A-106,
   A-107, A-108, A-110 and A-111 are **one critical incident**, to be opened first.

7. **Save the incident timeline:**

   ```bash
   jq -r '[.[] | select(.host == "WS-042" or (.detail | contains("WS-042")) or (.detail | contains("l.bianchi")))] | sort_by(.time)[] | "\(.time) \(.id) \(.source) \(.rule) \(.detail)"' alerts.json > ~/lab06/timeline.txt
   wc -l < ~/lab06/timeline.txt
   ```

   ```text
   6
   ```

## Hints and solution

### Success indicators

- A-101 and A-102 are closed as false positives (approved scanner) and A-103 is to be checked with
  the backup team.
- A-105, A-106, A-107, A-108, A-110 and A-111 form a single incident, opened first.
- The containment proposal covers WS-042 and the accounts `l.bianchi` and `adm.verdi`.

### If you get stuck

Try on your own first: the hints open one at a time, from the vaguest to the solution.

<details>
<summary>Hint 1</summary>

Not sure which alerts belong together? Look for the host and user names in the `detail` field
too, not only in `host`.

</details>

<details>
<summary>Hint 2</summary>

Not sure where to start? More than the severity of each alert, what matters is how far the
attacker got: the last link in the chain.

</details>

<details>
<summary>Worked solution</summary>

Alerts explained by the inventory are closed or checked; the others are correlated by host, user
and time. Six alerts from five different sources tell one story: a document with a macro,
PowerShell, DNS beaconing, credential theft, an administrator sign-in from the workstation. The
last step, A-111, shows the attacker already holds a privileged identity: containment covers the
accounts at once, as well as the host, preserving WS-042's memory.

</details>

### Common mistakes

- Ordering the queue only by severity or by an automatic score.
- Closing A-103 as a false positive without confirmation: a known exception is a good hiding
  place.
- Shutting down or reinstalling WS-042: the memory the investigation needs is lost.
- Isolating the host and forgetting the accounts already compromised.

## Evidence

The `~/lab06` folder must contain:

- `timeline.txt`, the six lines of the incident;
- `triage.md`, with one row for each of the 12 alerts: outcome (true positive, false positive,
  to be checked), reason and, for true positives, the incident they belong to;
- the containment proposal: isolate WS-042 through EDR, disable and reset `adm.verdi` and
  `l.bianchi` while revoking their sessions, block `update-check.example` in DNS, and look for
  the same domain and the same attachment on the other workstations.

## Cleanup

The data files were not changed: you can check with `sha256sum`. Once you have delivered your
evidence, delete the working folder:

```bash
rm -r -- ~/lab06
```

## Final questions

1. Why does A-111 matter more than A-110, even though A-110 is the only `critical` alert?

   <details>
   <summary>Answer</summary>

   A-110 says credentials were dumped from **one** workstation; A-111 says they have already
   been **used** to sign in as an administrator. The attacker has escalated privileges and now
   holds the identity, the most critical asset in the inventory. Containment must cover the
   accounts right away, not just the host.

   </details>

2. A-104, the impossible travel of `m.rossi`, goes through the corporate VPN. How do you
   classify it?

   <details>
   <summary>Answer</summary>

   As **to be checked, probably a false positive**: a VPN exit in another country makes it look
   as if the user moved. You check with the user or the VPN logs and, if confirmed, adjust the
   rule to recognize the company's exit addresses. You do not close it on a hunch.

   </details>

3. Why is excluding the scanner from the rule alert tuning and not a blind spot in detection?

   <details>
   <summary>Answer</summary>

   Because the exception is narrow (a single address, approved and in the inventory) and
   documented, and it cuts the noise that causes alert fatigue. It would become a blind spot
   if it were broad, for example the whole server network, or if nobody checked that the
   address really is the scanner.

   </details>

4. Which phase of the incident response cycle does this work belong to, and which comes right
   after?

   <details>
   <summary>Answer</summary>

   It is the **detection and analysis** phase: confirming there is an incident, understanding
   its scope and giving it a priority. Right after comes **containment**, preserving the
   evidence: you isolate the host, you do not shut it down or reinstall it, because WS-042's
   memory holds what is needed to understand what was stolen.

   </details>
