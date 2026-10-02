"""Genera auth.log, il log SSH sintetico del Lab 03 (labs/DATI.md).

Deterministico: lo stesso script produce sempre lo stesso file, con lo stesso
SHA-256 registrato nel catalogo. Indirizzi esterni dai blocchi riservati alla
documentazione (RFC 5737), interni da una rete privata, chiavi finte.

Uso: python3 genera_auth_log.py > auth.log
"""
from datetime import datetime, timedelta

FMT = "%Y-%m-%dT%H:%M:%S+00:00"
righe = []
pid = 2100


def aggiungi(quando, processo, messaggio):
    global pid
    pid += 7
    ts = quando.strftime(FMT)
    righe.append((ts, f"{ts} web01 {processo}[{pid}]: {messaggio}"))


def ora(h, m, s):
    return datetime(2026, 9, 29, h, m, s)


# Attività normale dalla rete interna.
for h, m, utente, ip in [(8, 2, "alice", "10.0.0.21"), (8, 15, "bob", "10.0.0.34"),
                         (12, 40, "alice", "10.0.0.21"), (17, 55, "bob", "10.0.0.34")]:
    aggiungi(ora(h, m, 5), "sshd", f"Accepted publickey for {utente} from {ip} port {50000 + m * 10 + h} ssh2: ED25519 SHA256:lab-fake-key-{utente}")
aggiungi(ora(8, 20, 11), "sshd", "Failed password for bob from 10.0.0.34 port 50312 ssh2")
aggiungi(ora(8, 20, 19), "sshd", "Accepted password for bob from 10.0.0.34 port 50318 ssh2")

# Brute force riuscito contro deploy, poi persistenza.
inizio = ora(2, 10, 1)
for i in range(24):
    aggiungi(inizio + timedelta(seconds=5 * i), "sshd", f"Failed password for deploy from 203.0.113.45 port {41000 + i} ssh2")
aggiungi(inizio + timedelta(seconds=120), "sshd", "Accepted password for deploy from 203.0.113.45 port 41024 ssh2")
aggiungi(ora(2, 13, 2), "sudo", "deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/useradd -m -s /bin/bash svc-update")
aggiungi(ora(2, 13, 2), "useradd", "new user: name=svc-update, UID=1004, GID=1004, home=/home/svc-update, shell=/bin/bash, from=/dev/pts/0")
aggiungi(ora(2, 13, 40), "sudo", "deploy : TTY=pts/0 ; PWD=/home/deploy ; USER=root ; COMMAND=/usr/sbin/usermod -aG sudo svc-update")
aggiungi(ora(2, 15, 9), "sshd", "Disconnected from user deploy 203.0.113.45 port 41024")

# Password spraying: un tentativo per ciascuno di 12 account.
utenti = ["admin", "alice", "bob", "carol", "dave", "deploy", "erin", "frank", "grace", "heidi", "oracle", "postgres"]
inizio = ora(3, 0, 7)
for i, utente in enumerate(utenti):
    invalido = "" if utente in ("alice", "bob", "deploy") else "invalid user "
    aggiungi(inizio + timedelta(seconds=9 * i), "sshd", f"Failed password for {invalido}{utente} from 198.51.100.23 port {52000 + i} ssh2")

righe.sort(key=lambda r: r[0])
print("\n".join(r for _, r in righe))
