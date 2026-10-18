# Lab 05 — Full backup, incremental backup and a restore test

| Field | Value |
|---|---|
| SY0-701 objectives | 3.4 |
| Risk | `low` |
| Duration | 35 minutes |

You make a full and an incremental backup of a folder with `tar`, record the fingerprint of
every file, simulate ransomware damage and restore. The point of the exercise is the last
step: a backup is worth only as much as the proof that it can be restored, intact.

## Scenario

A small office keeps orders and contracts in a shared folder. The owner asks you to set up a
backup and to show them, with a test, that after an incident all the data comes back
unaltered. On Monday you make the full backup, on Tuesday the incremental one; then you
simulate the damage and restore.

## Prerequisites

- Linux, macOS or WSL, with GNU `tar` and `sha256sum` (on macOS install `gnu-tar` and use
  `gtar`, and `shasum -a 256` instead of `sha256sum`).
- Knowledge: backup types, the 3-2-1 rule, RPO and restore testing (objective 3.4, Domain 3 of
  the guide).

## Topology

```text
[terminal] ──► ~/lab05/dati       (the "production" data, synthetic)
           ──► ~/lab05/backup     (archives and manifests)
           ──► ~/lab05/ripristino (where the restore is tested)
```

Local files only, all inside `~/lab05`. The data is made up. Folder and file names are in
Italian, as in the Italian version, so the hashes below match on every run.

## Setup

1. Create the working folder and enter it:

   ```bash
   mkdir -p ~/lab05 && cd ~/lab05
   ```

2. Create the test data: three orders and a contract.

   ```bash
   mkdir -p dati/ordini dati/contratti backup
   for i in 1 2 3; do
     printf 'Ordine %s — cliente fittizio, importo %s00 euro\n' "$i" "$i" > "dati/ordini/ordine-$i.txt"
   done
   printf 'Contratto quadro di prova con Kestrelia\n' > dati/contratti/msa.txt
   find dati -type f | sort
   ```

   ```text
   dati/contratti/msa.txt
   dati/ordini/ordine-1.txt
   dati/ordini/ordine-2.txt
   dati/ordini/ordine-3.txt
   ```

## Exercise

1. **Monday's full backup.** The `--listed-incremental` option makes `tar` keep a state file
   (`stato.snar`) of what it has already saved: on the first run, with no state, the backup is
   full.

   ```bash
   tar --listed-incremental=backup/stato.snar -czf backup/full-lun.tar.gz dati
   tar -tzf backup/full-lun.tar.gz
   ```

   ```text
   dati/
   dati/contratti/
   dati/ordini/
   dati/contratti/msa.txt
   dati/ordini/ordine-1.txt
   dati/ordini/ordine-2.txt
   dati/ordini/ordine-3.txt
   ```

2. **Record the fingerprint of every file**, the manifest you will use to prove the restore is
   identical to the original:

   ```bash
   find dati -type f -exec sha256sum {} + | sort -k2 > backup/manifest-lun.sha256
   awk '{print substr($1,1,16)"…", $2}' backup/manifest-lun.sha256
   ```

   ```text
   a87a13f8f74971ed… dati/contratti/msa.txt
   13cd7bdc4ad54c56… dati/ordini/ordine-1.txt
   5df34e0746ab5da2… dati/ordini/ordine-2.txt
   590c60caa38d8e12… dati/ordini/ordine-3.txt
   ```

   If you created the files with the same commands, your hashes are identical to these.

3. **On Tuesday something changes**: a new order arrives and one is corrected. Make the
   incremental backup starting from a copy of Monday's state:

   ```bash
   printf 'Ordine 4 — cliente fittizio, importo 400 euro\n' > dati/ordini/ordine-4.txt
   printf 'Ordine 2 — importo corretto 250 euro\n' > dati/ordini/ordine-2.txt
   cp backup/stato.snar backup/stato-mar.snar
   tar --listed-incremental=backup/stato-mar.snar -czf backup/incr-mar.tar.gz dati
   tar -tzf backup/incr-mar.tar.gz
   find dati -type f -exec sha256sum {} + | sort -k2 > backup/manifest-mar.sha256
   ```

   ```text
   dati/
   dati/contratti/
   dati/ordini/
   dati/ordini/ordine-2.txt
   dati/ordini/ordine-4.txt
   ```

   The incremental backup holds only the two files changed since Monday: it is small and fast,
   but on its own it is not enough to restore.

4. **Simulate the damage.** One file is overwritten, as ransomware would do, and one deleted.
   The manifest notices:

   ```bash
   echo "CIFRATO-DA-RANSOMWARE" > dati/ordini/ordine-1.txt
   rm dati/contratti/msa.txt
   sha256sum -c backup/manifest-mar.sha256
   ```

   ```text
   sha256sum: dati/contratti/msa.txt: No such file or directory
   dati/contratti/msa.txt: FAILED open or read
   dati/ordini/ordine-1.txt: FAILED
   dati/ordini/ordine-2.txt: OK
   dati/ordini/ordine-3.txt: OK
   dati/ordini/ordine-4.txt: OK
   sha256sum: WARNING: 1 listed file could not be read
   sha256sum: WARNING: 1 computed checksum did NOT match
   ```

   Here the backup sits in the same folder as the data: real ransomware would have encrypted it
   too. In practice the `backup` folder lives on another medium, with an off-site copy,
   preferably immutable (see question 2).

5. **Restore into a separate folder**, the full backup first and then the incremental one, in
   order, and check against Tuesday's manifest:

   ```bash
   mkdir -p ripristino
   tar --listed-incremental=/dev/null -xzf backup/full-lun.tar.gz -C ripristino
   tar --listed-incremental=/dev/null -xzf backup/incr-mar.tar.gz -C ripristino
   (cd ripristino && sha256sum -c ../backup/manifest-mar.sha256)
   ```

   ```text
   dati/contratti/msa.txt: OK
   dati/ordini/ordine-1.txt: OK
   dati/ordini/ordine-2.txt: OK
   dati/ordini/ordine-3.txt: OK
   dati/ordini/ordine-4.txt: OK
   ```

   Every file is back, each with the same fingerprint recorded before the damage: now you have
   proof, not just hope. You restore into a separate folder so as not to overwrite what the
   investigation needs, and to check the result before putting it back into use.

## Hints and solution

### Success indicators

- `full-lun.tar.gz` holds the four files and `incr-mar.tar.gz` only the two changed on Tuesday.
- After the damage, `sha256sum -c` reports `FAILED` for the two affected files.
- In the `ripristino` folder all five files are `OK`.

### If you get stuck

Try on your own first: the hints open one at a time, from the vaguest to the solution.

<details>
<summary>Hint 1</summary>

The incremental backup holds every file? You used a new state file instead of the copy of
Monday's `stato.snar`.

</details>

<details>
<summary>Hint 2</summary>

The restore reports missing files? Extract the full backup first and then the incremental one,
in order, and run `sha256sum -c` from inside the `ripristino` folder.

</details>

<details>
<summary>Worked solution</summary>

The full backup captures everything; the incremental one, thanks to the state file, only what
changed. The restore reapplies them in the same order, and the manifest recorded *before* the
damage proves every file is back identical. You restore into a separate folder so as not to
destroy evidence and to check the result before putting it back into use. In practice the backup
sits on another medium, with an off-site copy, preferably immutable.

</details>

### Common mistakes

- Restoring over the damaged data instead of into a separate folder.
- Keeping backups in the same folder or on the same disk as the data.
- Trusting the "backup completed" message without a restore test.
- Building the manifest after the damage: it would certify altered files as intact.

## Evidence

The `~/lab05` folder must contain:

- `backup/`, with both archives and both manifests;
- `verify.txt`, the output of step 5, saved with
  `(cd ripristino && sha256sum -c ../backup/manifest-mar.sha256) > verify.txt`;
- `plan.md`, three lines: with a full backup every Monday and an incremental one every
  evening, how much data can be lost at most (RPO), which archives are needed to restore on
  Thursday, and where you would keep the second and third copies.

## Cleanup

The lab worked only inside `~/lab05`. Once you have delivered your evidence, delete it:

```bash
cd ~ && rm -r -- ~/lab05
```

## Final questions

1. To restore on Thursday, with a full backup on Monday and an incremental one every evening,
   which archives do you need? And with a differential one?

   <details>
   <summary>Answer</summary>

   With **incremental** backups you need Monday's full backup and **all** the incrementals up
   to Thursday, in order: if one is missing, the chain breaks. With **differential** backups,
   which save everything changed since the last full backup, the full backup and the **latest**
   differential are enough: restoring is simpler, but each differential grows every day.

   </details>

2. Ransomware also encrypts backups reachable over the network. What changes in the design?

   <details>
   <summary>Answer</summary>

   You need at least one copy the attacker cannot modify: **offline** (a disconnected disk or
   tape), **immutable** (storage with a write lock for a period, such as object lock), or in a
   system with credentials separate from the domain's. That is the point of the 3-2-1 rule:
   three copies, on two different media, one off site.

   </details>

3. For months the backup software has reported "completed". Why is that not enough?

   <details>
   <summary>Answer</summary>

   Because it says the archive was written, not that it holds the right data or that it can be
   restored in time. Only a periodic **restore test**, with a fingerprint check as in step 5
   and a measure of the time taken, proves that RPO and RTO are met.

   </details>

4. Why should the hash manifest be kept apart from the data, and perhaps signed?

   <details>
   <summary>Answer</summary>

   Because whoever can change both the data and the manifest can make an altered file look
   intact by updating its hash. Kept elsewhere or signed, the manifest remains independent
   proof of integrity.

   </details>
