#!/usr/bin/env bash
# Avvia un laboratorio nel container (labs/container/README.md).
#
# Uso:   bash labs/container/run.sh NN [comando...]
#        senza comando apre una shell; con un comando lo esegue e termina.
#
# Il container nasce e muore con la sessione: --rm lo cancella all'uscita, e
# la home è in memoria (tmpfs), quindi anche le cartelle di lavoro dei
# laboratori spariscono. Niente rete (solo il loopback interno), nessuna
# capability, file system dell'immagine in sola lettura, utente senza
# privilegi, laboratori montati in sola lettura. LAB_ENGINE=podman usa Podman.
set -eu

# Solo i laboratori a rischio `low` che lavorano su file locali: 01 e 02
# avviano l'applicazione (si usa il Dockerfile alla radice), 07, 08 e 09
# modificano il sistema e richiedono una VM con snapshot.
supported="03 04 05 06 10 11"

lab="${1:-}"
case " $supported " in
  *" $lab "*) ;;
  *)
    printf 'Uso: bash labs/container/run.sh NN [comando...], con NN fra: %s.\n' "$supported" >&2
    printf 'Gli altri laboratori richiedono una VM: vedi labs/README.md.\n' >&2
    exit 2 ;;
esac
shift

engine="${LAB_ENGINE:-docker}"
image="${LAB_IMAGE:-comptia-labs}"
labs="$(cd "$(dirname "$0")/.." && pwd -P)"

tty=""
[ -t 0 ] && [ -t 1 ] && tty="-it"

# shellcheck disable=SC2086 # $tty è vuoto o un'unica opzione.
exec "$engine" run --rm $tty \
  --name "comptia-lab$lab" \
  --network none \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /tmp:rw,nosuid,nodev,noexec,size=64m \
  --tmpfs /home/lab:rw,nosuid,nodev,size=2g,uid=10001,gid=10001,mode=0700 \
  --memory 512m \
  --pids-limit 256 \
  --user 10001:10001 \
  --mount "type=bind,source=$labs,target=/repo/labs,readonly" \
  --workdir /repo \
  "$image" "${@:-bash}"
