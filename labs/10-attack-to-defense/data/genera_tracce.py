"""Genera le tracce sintetiche del Lab 10 (labs/DATI.md).

Due file, registrati e non eseguiti: access.log (formato combinato del web
server) e auth-events.jsonl (eventi di login dell'applicazione). Contengono
traffico normale, una ricognizione che cerca file esposti e un credential
stuffing contro il login. Deterministico: rigenera sempre gli stessi file.
Indirizzi esterni dai blocchi riservati alla documentazione (RFC 5737).

Uso: python3 genera_tracce.py   (scrive i due file nella cartella corrente)
"""
import json
from datetime import datetime, timedelta

GIORNO = datetime(2026, 9, 29)
UA_BROWSER = "Mozilla/5.0 (X11; Linux x86_64) Firefox/131.0"
UA_SCANNER = "Mozilla/5.0 (compatible; lab-scanner/1.0)"
UA_SCRIPT = "python-requests/2.32"

accessi = []
login = []


def t(h, m, s):
    return GIORNO + timedelta(hours=h, minutes=m, seconds=s)


def http(quando, ip, metodo, percorso, stato, byte, ua):
    data = quando.strftime("%d/%b/%Y:%H:%M:%S +0000")
    accessi.append((quando, f'{ip} - - [{data}] "{metodo} {percorso} HTTP/1.1" {stato} {byte} "-" "{ua}"'))


def evento(quando, ip, utente, esito):
    login.append((quando, {"time": quando.strftime("%Y-%m-%dT%H:%M:%SZ"), "ip": ip, "user": utente, "result": esito}))


# Traffico normale dalla rete interna.
for h, m, ip, utente in [(9, 2, "10.0.0.21", "a.ferri"), (9, 40, "10.0.0.34", "g.sala"), (11, 5, "10.0.0.21", "a.ferri")]:
    http(t(h, m, 0), ip, "GET", "/", 200, 5120, UA_BROWSER)
    http(t(h, m, 1), ip, "GET", "/app.js", 200, 48211, UA_BROWSER)
    http(t(h, m, 9), ip, "POST", "/login", 200, 312, UA_BROWSER)
    evento(t(h, m, 9), ip, utente, "success")

# Ricognizione: cerca file che non dovrebbero essere pubblici.
percorsi = [("/.env", 404), ("/.git/config", 404), ("/backup.zip", 404), ("/config.php.bak", 404),
            ("/phpinfo.php", 404), ("/server-status", 403), ("/admin/", 404)]
for i, (percorso, stato) in enumerate(percorsi):
    http(t(10, 15, 2 + 3 * i), "203.0.113.77", "GET", percorso, stato, 153, UA_SCANNER)

# Credential stuffing: coppie utente-password provenienti da un'altra violazione,
# una per account, finché una funziona.
utenti = [f"utente{n:02d}" for n in range(1, 40)] + ["m.conti"]
inizio = t(10, 31, 0)
for i, utente in enumerate(utenti):
    quando = inizio + timedelta(seconds=i)
    riuscito = utente == "m.conti"
    http(quando, "198.51.100.50", "POST", "/login", 200 if riuscito else 401, 312 if riuscito else 96, UA_SCRIPT)
    evento(quando, "198.51.100.50", utente, "success" if riuscito else "failure")
http(t(10, 32, 10), "198.51.100.50", "GET", "/account/export", 200, 2457600, UA_SCRIPT)

accessi.sort(key=lambda r: r[0])
login.sort(key=lambda r: r[0])
with open("access.log", "w") as f:
    f.write("\n".join(r for _, r in accessi) + "\n")
with open("auth-events.jsonl", "w") as f:
    f.write("\n".join(json.dumps(e, separators=(", ", ": ")) for _, e in login) + "\n")
