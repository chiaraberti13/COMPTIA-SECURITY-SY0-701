"""Genera la telemetria sintetica del Lab 11 (labs/DATI.md).

Lo stesso incidente del Lab 03 (brute force SSH riuscito su web01, poi un
account creato per restare) visto da tre sensori diversi, uno per file:

- rete.jsonl      flussi di rete, come li esporta un sensore NetFlow o Zeek;
- identita.jsonl  autenticazioni, come le registra il sistema di identità;
- endpoint.jsonl  processi e file modificati, come li vede un agente EDR.

Deterministico: rigenera sempre gli stessi file. Indirizzi esterni dai
blocchi riservati alla documentazione (RFC 5737).

Uso: python3 genera_telemetria.py   (scrive i tre file nella cartella corrente)
"""
import json
from datetime import datetime, timedelta

SERVER = "10.0.0.5"
GIORNO = datetime(2026, 9, 29)
rete, identita, endpoint = [], [], []


def t(h, m, s):
    return GIORNO + timedelta(hours=h, minutes=m, seconds=s)


def iso(quando):
    return quando.strftime("%Y-%m-%dT%H:%M:%SZ")


def flusso(inizio, src, durata, byte_in, byte_out):
    rete.append({"time": iso(inizio), "src": src, "dst": SERVER, "dport": 22, "proto": "tcp",
                 "duration_s": durata, "bytes_to_server": byte_in, "bytes_from_server": byte_out})


def accesso(quando, utente, src, metodo, esito):
    identita.append({"time": iso(quando), "host": "web01", "user": utente, "src": src,
                     "method": metodo, "result": esito})


def processo(quando, utente, padre, comando):
    endpoint.append({"time": iso(quando), "host": "web01", "type": "process", "user": utente,
                     "parent": padre, "command": comando})


def file_modificato(quando, percorso, processo_che_scrive):
    endpoint.append({"time": iso(quando), "host": "web01", "type": "file", "path": percorso,
                     "process": processo_che_scrive})


# Lavoro normale: alice entra con la chiave e modifica un file.
flusso(t(8, 2, 5), "10.0.0.21", 1800, 52000, 410000)
accesso(t(8, 2, 5), "alice", "10.0.0.21", "publickey", "success")
processo(t(8, 2, 6), "alice", "sshd", "-bash")
processo(t(8, 3, 40), "alice", "-bash", "vim /srv/app/config.yml")

# Brute force: 24 connessioni brevi, una per tentativo, poi la sessione riuscita.
inizio = t(2, 10, 1)
for i in range(24):
    quando = inizio + timedelta(seconds=5 * i)
    flusso(quando, "203.0.113.45", 1, 2100, 2600)
    accesso(quando, "deploy", "203.0.113.45", "password", "failure")
flusso(t(2, 12, 1), "203.0.113.45", 188, 9800, 31400)
accesso(t(2, 12, 1), "deploy", "203.0.113.45", "password", "success")
processo(t(2, 12, 2), "deploy", "sshd", "-bash")
processo(t(2, 13, 2), "root", "sudo", "useradd -m -s /bin/bash svc-update")
file_modificato(t(2, 13, 2), "/etc/passwd", "useradd")
file_modificato(t(2, 13, 2), "/etc/shadow", "useradd")
processo(t(2, 13, 40), "root", "sudo", "usermod -aG sudo svc-update")
file_modificato(t(2, 13, 40), "/etc/group", "usermod")

# Password spraying: 12 connessioni, un account diverso ciascuna.
utenti = ["admin", "alice", "bob", "carol", "dave", "deploy", "erin", "frank", "grace", "heidi", "oracle", "postgres"]
for i, utente in enumerate(utenti):
    quando = t(3, 0, 7) + timedelta(seconds=9 * i)
    flusso(quando, "198.51.100.23", 1, 2100, 2600)
    accesso(quando, utente, "198.51.100.23", "password", "failure")

for nome, righe in (("rete.jsonl", rete), ("identita.jsonl", identita), ("endpoint.jsonl", endpoint)):
    righe.sort(key=lambda r: r["time"])
    with open(nome, "w") as f:
        f.write("\n".join(json.dumps(r, separators=(", ", ": ")) for r in righe) + "\n")
