# Labs in a container

A minimal image to do the file-based `low` risk labs without installing anything on your own
computer, always with the same tool versions. Every session starts clean and, on exit,
disappears without leaving traces. The Italian version is [README.md](README.md); the messages
the scripts print are in Italian.

## Which labs

| Labs | In the container | Why |
|---|---|---|
| 03, 04, 05, 06, 10, 11 | yes | they work on files and, Lab 10, on an nginx listening on loopback only |
| 01, 02 | no | they start the project's application: use the `Dockerfile` at the root |
| 07, 08, 09 | no | they change the system (SSH, users, firewall, network namespaces) and need a VM with a snapshot |

A container shares the kernel with the computer hosting it: the `moderate` labs would need
privileges that cancel the isolation. They keep the virtual machine described in
[Isolation and recovery](../README.md#isolamento-e-ripristino).

## Prerequisites

- Docker Engine 20.10 or later, or Docker Desktop
  ([installation](https://docs.docker.com/engine/install/)).
- The cloned repository: commands run from its root.

## Build the image

```bash
docker build -t comptia-labs labs/container
```

The base is `ubuntu:noble-20260917` pinned by digest, the fingerprint of the content: a tag can
move, a digest cannot. The four added packages (`jq`, `curl`, `openssl`, `nginx`) are installed
at an exact version, with no recommended packages; the final image takes about 150 MB. If Docker
Hub answers `429 Too Many Requests`, pull the same base from Google's mirror and give it the
expected name:

```bash
docker pull mirror.gcr.io/library/ubuntu:noble-20260917
docker tag mirror.gcr.io/library/ubuntu:noble-20260917 ubuntu:noble-20260917
```

## Use a lab

```bash
bash labs/container/run.sh 11
```

A shell opens at the repository root, as user `lab`: from there follow the lab as written, from
the Setup on. To run a single command, add it after the number:

```bash
bash labs/container/run.sh 11 bash -c 'cd labs/11-telemetry-views/data && jq -s length rete.jsonl'
```

```text
38
```

A lab that is not supported is refused:

```bash
bash labs/container/run.sh 08
```

```text
Uso: bash labs/container/run.sh NN [comando...], con NN fra: 03 04 05 06 10 11.
Gli altri laboratori richiedono una VM: vedi labs/README.md.
```

## What `run.sh` guarantees

| Option | Effect |
|---|---|
| `--rm` | the container is deleted on exit: this is the automatic teardown |
| `--tmpfs /home/lab` (2 GB) | the home, with the `~/labNN` folders, lives in memory and disappears with the container |
| `--network none` | no interface besides loopback: no Internet and no local network |
| `--cap-drop ALL` | no Linux capabilities, not even those Docker usually grants |
| `--security-opt no-new-privileges` | no program can gain more privileges than whoever starts it |
| `--read-only` | the image's file system cannot be changed |
| `--user 10001:10001` | an unprivileged user, never root |
| `--mount ...,readonly` | the repository's labs can be read but not changed |
| `--memory 512m`, `--pids-limit 256` | a mistake in the exercise does not exhaust the computer's resources |

Lab 10's nginx stays reachable on `127.0.0.1:8090` **inside** the container, where the lab's
`curl` commands also run; no port is published outside. The preflight reports the memory of the
computer hosting the container, not the 512 MB limit.

Proof of the teardown: the folder created in one session does not exist in the next.

```bash
bash labs/container/run.sh 11 mkdir -p /home/lab/lab11
bash labs/container/run.sh 11 ls -A /home/lab
```

The second command prints nothing.

## Verification

`verify.sh` checks that the image keeps these promises: the preflight of every supported lab,
the user, the capabilities, the read-only image and labs, the absence of network, Lab 10's nginx
with its sign-in limit, and that no container is left behind. CI runs it on every change (job
`labs-container`), after building the image.

```bash
bash labs/container/verify.sh
```

```text
[OK]     lab 03: Esito: pronto (avvisi: 0).
[OK]     lab 04: Esito: pronto (avvisi: 0).
[OK]     lab 05: Esito: pronto (avvisi: 0).
[OK]     lab 06: Esito: pronto (avvisi: 0).
[OK]     lab 10: Esito: pronto (avvisi: 0).
[OK]     lab 11: Esito: pronto (avvisi: 0).
[OK]     utente 10001, senza privilegi
[OK]     nessuna capability, no-new-privileges attivo
[OK]     immagine e laboratori in sola lettura
[OK]     rete: solo il loopback
[OK]     nginx del Lab 10: 401 401 401 401 429
[OK]     nessun container rimasto dopo l'uso
```

The outputs of Labs 03, 05, 06, 10 and 11 run in the container match those in their text; in
Lab 04, as the lab already explains, only the dates and the fingerprints of the keys generated on
the spot change.

## Update the versions

- **Base:** Dependabot proposes the new digest every week, seven days after publication
  (`.github/dependabot.yml`).
- **Packages:** updated by hand. When the Ubuntu archive replaces a version with a security
  update, the build fails with `E: Version '...' for 'jq' was not found` (naming the package
  concerned): this is intended, because an image must not change silently. Look up the new
  version, check it was published at least seven days ago, update the `Dockerfile` and run
  `verify.sh` again.

```bash
docker run --rm ubuntu:noble-20260917 sh -c 'apt-get update -qq && apt-cache policy jq curl openssl nginx | grep -E "^[a-z]|Candidate"'
```

The script uses Docker; `LAB_ENGINE=podman` passes the same options to Podman, which accepts
them, but the project verifies Docker only.

## On demand

For expiring sessions with shell re-entry and reset, use the new manager: [On-demand labs — IT/EN guide](../../docs/labs-on-demand.md). `run.sh` remains available for a command or shell that removes the container on exit.
