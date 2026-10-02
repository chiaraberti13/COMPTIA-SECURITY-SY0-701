# Immagine dei laboratori in container (labs/container/README.md).
#
# Contiene solo gli strumenti dei laboratori a rischio `low` che lavorano su
# file locali (03, 04, 05, 06, 10, 11) e gira con un utente senza privilegi.
# La base è fissata per digest (un tag si può spostare su un altro contenuto) e
# ogni pacchetto a una versione esatta: se l'archivio Ubuntu la ritira, la
# build fallisce invece di cambiare in silenzio. Dependabot propone il nuovo
# digest (.github/dependabot.yml); le versioni dei pacchetti si aggiornano a
# mano, dopo almeno sette giorni dalla pubblicazione.
#
#   docker build -t comptia-labs labs/container
#   bash labs/container/run.sh 11
FROM ubuntu:noble-20260917@sha256:9bb148f8a4e622539bc24b0b312e66da1bafcceedebeb703dbbc183530ba2d7d

# --no-install-recommends: solo le dipendenze necessarie. Gli indici di apt si
# cancellano nello stesso strato, così non restano nell'immagine. nginx crea
# all'avvio le cartelle temporanee compilate nel pacchetto, e con il file system
# in sola lettura non potrebbe: esistono già, e il Lab 10 non le usa.
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
      jq=1.7.1-3ubuntu0.24.04.2 \
      curl=8.5.0-2ubuntu10.15 \
      openssl=3.0.13-0ubuntu3.16 \
      nginx=1.24.0-2ubuntu7.18 \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /var/lib/nginx/body /var/lib/nginx/proxy /var/lib/nginx/fastcgi /var/lib/nginx/uwsgi /var/lib/nginx/scgi \
 && useradd --uid 10001 --user-group --no-create-home --home-dir /home/lab --shell /bin/bash lab

# I laboratori arrivano dal repository, montati in sola lettura da run.sh: nell'immagine
# non c'è nessun file del progetto, e una modifica ai testi non richiede una nuova build.
ENV HOME=/home/lab LANG=C.UTF-8
WORKDIR /repo
USER 10001:10001
CMD ["bash"]
