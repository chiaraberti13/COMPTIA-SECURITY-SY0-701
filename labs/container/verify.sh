#!/usr/bin/env bash
# Verifica l'immagine dei laboratori (labs/container/README.md), già costruita:
# per ogni laboratorio supportato il preflight dà "pronto", l'isolamento
# promesso da run.sh è reale, nginx del Lab 10 parte con il file system in
# sola lettura, e alla fine non resta nessun container. Lo esegue la CI.
#
# Uso: bash labs/container/verify.sh
# shellcheck disable=SC2016 # I programmi awk e bash passati al container vanno fra apici singoli.
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd -P)"
engine="${LAB_ENGINE:-docker}"
run() { bash "$here/run.sh" "$@"; }
check() { printf '[OK]     %s\n' "$1"; }
die() { printf '[ERRORE] %s\n' "$1" >&2; exit 1; }

supported="$(sed -n 's/^supported="\(.*\)"$/\1/p' "$here/run.sh")"
for nn in $supported; do
  esito="$(run "$nn" bash labs/preflight.sh "$nn" | tail -n 1)"
  [ "$esito" = "Esito: pronto (avvisi: 0)." ] || die "lab $nn: $esito"
  check "lab $nn: $esito"
done

[ "$(run 11 id -u)" = 10001 ] || die "il container non gira come utente 10001"
check "utente 10001, senza privilegi"
[ "$(run 11 awk '/^CapEff:/ {print $2}' /proc/self/status)" = 0000000000000000 ] || die "capability non azzerate"
[ "$(run 11 awk '/^NoNewPrivs:/ {print $2}' /proc/self/status)" = 1 ] || die "no-new-privileges non attivo"
check "nessuna capability, no-new-privileges attivo"
# Le opzioni di mount, non un tentativo di scrittura: l'utente 10001 non può
# scrivere in /etc nemmeno su un file system scrivibile.
[ "$(run 11 awk '$2 == "/" {split($4, o, ","); print o[1]}' /proc/mounts)" = ro ] || die "il file system dell'immagine è scrivibile"
run 11 touch labs/prova 2> /dev/null && die "i laboratori sono scrivibili"
check "immagine e laboratori in sola lettura"
[ "$(run 11 ls /sys/class/net)" = lo ] || die "il container ha interfacce di rete oltre al loopback"
check "rete: solo il loopback"

# Il Lab 10 avvia nginx come utente senza privilegi, con la home in memoria.
codici="$(run 10 bash -c '
  mkdir -p ~/n && cd ~/n
  printf "%s\n" "pid nginx.pid;" "error_log error.log;" "events {}" "http {" \
    "  access_log access.log;" "  limit_req_zone \$binary_remote_addr zone=l:1m rate=5r/m;" \
    "  limit_req_status 429;" "  server {" "    listen 127.0.0.1:8090;" \
    "    location = /login { limit_req zone=l burst=3 nodelay; try_files /dev/null @app; }" \
    "    location @app { return 401; }" "  }" "}" > nginx.conf
  nginx -e error.log -p "$PWD/" -c nginx.conf
  for i in 1 2 3 4 5; do curl -s -o /dev/null -w "%{http_code} " -X POST http://127.0.0.1:8090/login; done
  nginx -e error.log -p "$PWD/" -c nginx.conf -s quit')"
codici="${codici% }"
[ "$codici" = "401 401 401 401 429" ] || die "nginx nel Lab 10: $codici"
check "nginx del Lab 10: $codici"

[ -z "$("$engine" ps -aq --filter name=comptia-lab)" ] || die "è rimasto un container"
check "nessun container rimasto dopo l'uso"
