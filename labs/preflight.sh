#!/usr/bin/env bash
# Preflight dei laboratori (labs/README.md, "Controllo preliminare").
#
# Controlla, prima di iniziare un laboratorio, che l'ambiente sia pronto e
# sicuro: strumenti installati, spazio e memoria, porte libere, servizi esposti
# fuori dal loopback e, per i lab `moderate`, che si lavori in una macchina
# virtuale senza rotta predefinita. Legge solo lo stato locale: non manda
# traffico a nessun host e non modifica nulla.
#
# Uso:   bash labs/preflight.sh NN [--en]
# Esito: 0 se si può iniziare, 1 se un controllo è fallito, 2 se l'uso è errato.
#
# Per i test, alcune letture si possono sostituire con variabili d'ambiente:
# PREFLIGHT_VIRT (uscita di systemd-detect-virt), PREFLIGHT_ROUTE (uscita di
# `ip route show default`), PREFLIGHT_LISTEN (uscita di `ss -Htln`),
# PREFLIGHT_DISK_KB e PREFLIGHT_MEM_KB.
set -u

lab="${1:-}"
lang="it"
[ "${2:-}" = "--en" ] && lang="en"

t() { if [ "$lang" = "en" ]; then printf '%s' "$2"; else printf '%s' "$1"; fi; }

errors=0
warnings=0
ok() { printf '[OK]      %s\n' "$1"; }
warn() { printf '[%s] %s\n' "$(t 'AVVISO ' 'WARNING')" "$1"; warnings=$((warnings + 1)); }
fail() { printf '[%s] %s\n' "$(t 'ERRORE ' 'ERROR  ')" "$1"; errors=$((errors + 1)); }

# Requisiti di ciascun laboratorio: rischio, comandi, porte che userà.
case "$lab" in
  01) risk=low;      cmds="node npm curl";                                   ports="4190" ;;
  02) risk=low;      cmds="node npm git";                                    ports="" ;;
  03) risk=low;      cmds="grep awk sort uniq sha256sum";                    ports="" ;;
  04) risk=low;      cmds="openssl";                                         ports="" ;;
  05) risk=low;      cmds="tar sha256sum";                                   ports="" ;;
  06) risk=low;      cmds="jq sha256sum";                                    ports="" ;;
  07) risk=moderate; cmds="sshd nft ip ss nc python3 dpkg-statoverride";     ports="8080" ;;
  08) risk=moderate; cmds="setfacl getfacl useradd visudo chage";            ports="" ;;
  09) risk=moderate; cmds="ip nft ss nc ping python3";                       ports="" ;;
  10) risk=low;      cmds="awk jq curl sha256sum nginx";                     ports="8090" ;;
  *)
    printf '%s\n' "$(t 'Uso: bash labs/preflight.sh NN [--en], con NN fra 01 e 10.' 'Usage: bash labs/preflight.sh NN [--en], with NN between 01 and 10.')" >&2
    exit 2 ;;
esac

printf '%s %s (%s)\n\n' "$(t 'Controllo preliminare del laboratorio' 'Preflight for lab')" "$lab" "$risk"

# 1. Strumenti.
for c in $cmds; do
  if command -v "$c" > /dev/null 2>&1 || [ -x "/usr/sbin/$c" ] || [ -x "/sbin/$c" ]; then
    ok "$(t "comando $c presente" "command $c found")"
  else
    fail "$(t "manca il comando $c: installalo prima di iniziare" "command $c missing: install it before starting")"
  fi
done

# 2. Risorse: 2 GB liberi nella home, 1 GB di memoria disponibile.
disk_kb="${PREFLIGHT_DISK_KB:-$(df -Pk "$HOME" 2> /dev/null | awk 'NR == 2 {print $4}')}"
if [ -n "$disk_kb" ] && [ "$disk_kb" -ge 2097152 ]; then
  ok "$(t "spazio libero nella home: $((disk_kb / 1048576)) GB" "free space in home: $((disk_kb / 1048576)) GB")"
else
  fail "$(t 'meno di 2 GB liberi nella home' 'less than 2 GB free in home')"
fi
mem_kb="${PREFLIGHT_MEM_KB:-$(awk '/^MemAvailable:/ {print $2}' /proc/meminfo 2> /dev/null)}"
if [ -z "$mem_kb" ]; then
  warn "$(t 'memoria disponibile non misurabile su questo sistema' 'available memory cannot be measured on this system')"
elif [ "$mem_kb" -ge 1048576 ]; then
  ok "$(t "memoria disponibile: $((mem_kb / 1024)) MB" "available memory: $((mem_kb / 1024)) MB")"
else
  fail "$(t 'meno di 1 GB di memoria disponibile' 'less than 1 GB of available memory')"
fi

# 3. Porte in ascolto: quelle del laboratorio devono essere libere, e nessun
#    servizio dovrebbe ascoltare fuori dal loopback durante un esercizio.
listen="${PREFLIGHT_LISTEN-$(ss -Htln 2> /dev/null)}"
addresses="$(printf '%s\n' "$listen" | awk 'NF >= 4 {print $4}')"
for p in $ports; do
  if printf '%s\n' "$addresses" | grep -Eq "[:.]$p\$"; then
    fail "$(t "la porta $p è già in uso: ferma il servizio che la occupa" "port $p is already in use: stop the service holding it")"
  else
    ok "$(t "porta $p libera" "port $p free")"
  fi
done
exposed="$(printf '%s\n' "$addresses" | grep -Ev '^(127\.|\[::1\]|::1|$)' | sort -u | tr '\n' ' ')"
if [ -n "$exposed" ]; then
  warn "$(t "servizi in ascolto fuori dal loopback: $exposed— verifica che servano" "services listening outside loopback: $exposed— check that they are needed")"
else
  ok "$(t 'nessun servizio in ascolto fuori dal loopback' 'no service listening outside loopback')"
fi

# 4. Isolamento, obbligatorio sopra il livello low.
if [ "$risk" != "low" ]; then
  virt="${PREFLIGHT_VIRT-$(systemd-detect-virt 2> /dev/null || echo none)}"
  case "$virt" in
    none|"")
      fail "$(t 'non sei in una macchina virtuale: i lab moderate vanno eseguiti in una VM con snapshot' 'not in a virtual machine: moderate labs must run in a VM with a snapshot')" ;;
    docker|podman|lxc|lxc-libvirt|systemd-nspawn|openvz|rkt|wsl|container-other)
      warn "$(t "ambiente $virt: è un container, non una VM, e lo snapshot va fatto con altri mezzi" "$virt environment: a container, not a VM, so the snapshot needs other means")" ;;
    *)
      ok "$(t "macchina virtuale ($virt)" "virtual machine ($virt)")" ;;
  esac
  route="$(printf '%s' "${PREFLIGHT_ROUTE-$(ip route show default 2> /dev/null)}" | head -n 1 | sed 's/[[:space:]]*$//')"
  if [ -n "$route" ]; then
    fail "$(t "esiste una rotta predefinita ($route): collega la VM a una rete isolata" "a default route exists ($route): connect the VM to an isolated network")"
  else
    ok "$(t 'nessuna rotta predefinita: la rete è isolata' 'no default route: the network is isolated')"
  fi
fi

printf '\n'
if [ "$errors" -gt 0 ]; then
  printf '%s\n' "$(t "Esito: errori $errors, avvisi $warnings. Correggi gli errori prima di iniziare." "Result: errors $errors, warnings $warnings. Fix the errors before starting.")"
  exit 1
fi
printf '%s\n' "$(t "Esito: pronto (avvisi: $warnings)." "Result: ready (warnings: $warnings).")"
