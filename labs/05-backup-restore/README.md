# Lab 05 — Backup completo, incrementale e prova di ripristino

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 3.4 |
| Rischio | `low` |
| Durata | 35 minuti |

Fai un backup completo e uno incrementale di una cartella con `tar`, registri l'impronta di
ogni file, simuli un danno da ransomware e ripristini. Il punto dell'esercizio è l'ultimo
passaggio: un backup vale solo quanto la prova che si riesce a ripristinarlo, e intatto.

## Scenario

Un piccolo ufficio tiene ordini e contratti in una cartella condivisa. Il titolare ti chiede di
impostare un backup e di dimostrargli, con una prova, che dopo un incidente i dati tornano
tutti e senza alterazioni. Il lunedì fai il backup completo, il martedì l'incrementale; poi
simuli il danno e ripristini.

## Prerequisiti

- Linux, macOS o WSL, con GNU `tar` e `sha256sum` (su macOS installa `gnu-tar` e usa `gtar`,
  e `shasum -a 256` al posto di `sha256sum`).
- Conoscenze: tipi di backup, regola 3-2-1, RPO e prove di ripristino (obiettivo 3.4, Dominio 3
  della guida).

## Topologia

```text
[terminale] ──► ~/lab05/dati      (i dati "di produzione", sintetici)
            ──► ~/lab05/backup    (archivi e manifesti)
            ──► ~/lab05/ripristino (dove si prova il ripristino)
```

Solo file locali, tutti dentro `~/lab05`. I dati sono di fantasia.

## Setup

1. Crea la cartella di lavoro ed entraci:

   ```bash
   mkdir -p ~/lab05 && cd ~/lab05
   ```

2. Crea i dati di prova: tre ordini e un contratto.

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

## Esercizio

1. **Backup completo del lunedì.** L'opzione `--listed-incremental` fa tenere a `tar` un file di
   stato (`stato.snar`) con ciò che ha già salvato: al primo giro, senza stato, il backup è
   completo.

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

2. **Registra l'impronta di ogni file**, il manifesto che servirà a dimostrare che il
   ripristino è identico all'originale:

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

   Se hai creato i file con gli stessi comandi, i tuoi hash sono identici a questi.

3. **Il martedì cambia qualcosa**: arriva un ordine nuovo e uno viene corretto. Fai
   l'incrementale partendo da una copia dello stato del lunedì:

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

   L'incrementale contiene solo i due file cambiati dal lunedì: è piccolo e veloce, ma da solo
   non basta a ripristinare.

4. **Simula il danno.** Un file viene sovrascritto, come farebbe un ransomware, e uno
   cancellato. Il manifesto se ne accorge:

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

   Qui il backup è nella stessa cartella dei dati: un ransomware vero l'avrebbe cifrato insieme
   a loro. Nella realtà la cartella `backup` sta su un altro supporto e una copia fuori sede,
   meglio se immutabile (vedi la domanda 2).

5. **Ripristina in una cartella separata**, prima il completo e poi l'incrementale, nell'ordine,
   e verifica con il manifesto del martedì:

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

   Tutti i file tornano, e ognuno ha la stessa impronta registrata prima del danno: ora hai
   la prova, non solo la speranza. Si ripristina in una cartella separata per non sovrascrivere
   ciò che serve all'indagine e per controllare il risultato prima di rimetterlo in uso.

## Evidenze

Nella cartella `~/lab05` devono esserci:

- `backup/`, con i due archivi e i due manifesti;
- `verifica.txt`, l'output del passaggio 5, salvato con
  `(cd ripristino && sha256sum -c ../backup/manifest-mar.sha256) > verifica.txt`;
- `piano.md`, tre righe: con un backup completo ogni lunedì e un incrementale ogni sera, quanti
  dati si possono perdere al massimo (RPO), quali archivi servono per ripristinare il giovedì,
  e dove terresti la seconda e la terza copia.

## Cleanup

Il laboratorio ha lavorato solo dentro `~/lab05`. Quando hai consegnato le evidenze,
cancellala:

```bash
cd ~ && rm -r -- ~/lab05
```

## Domande finali

1. Per ripristinare il giovedì, con un completo il lunedì e un incrementale ogni sera, quali
   archivi servono? E con un differenziale?

   <details>
   <summary>Risposta</summary>

   Con gli **incrementali** servono il completo del lunedì e **tutti** gli incrementali fino al
   giovedì, nell'ordine: se ne manca uno, la catena si rompe. Con i **differenziali**, che
   salvano tutto ciò che è cambiato dall'ultimo completo, bastano il completo e **l'ultimo**
   differenziale: il ripristino è più semplice, ma ogni differenziale cresce ogni giorno.

   </details>

2. Il ransomware cifra anche i backup raggiungibili dalla rete. Che cosa cambia nella
   progettazione?

   <details>
   <summary>Risposta</summary>

   Serve almeno una copia che l'attaccante non possa modificare: **offline** (un disco o un
   nastro scollegato), **immutabile** (storage con blocco di scrittura per un periodo, come
   l'object lock), oppure in un sistema con credenziali separate da quelle del dominio. È il
   senso della regola 3-2-1: tre copie, su due supporti diversi, una fuori sede.

   </details>

3. Il software di backup segnala da mesi «completato». Perché non basta?

   <details>
   <summary>Risposta</summary>

   Perché dice che l'archivio è stato scritto, non che contiene i dati giusti né che si riesce
   a ripristinarlo in tempo. Solo una **prova di ripristino** periodica, con la verifica delle
   impronte come al passaggio 5 e la misura del tempo impiegato, dimostra che RPO e RTO sono
   rispettati.

   </details>

4. Perché il manifesto degli hash va conservato separato dai dati, e magari firmato?

   <details>
   <summary>Risposta</summary>

   Perché chi può modificare i dati e anche il manifesto può far passare per integro un file
   alterato, aggiornando l'hash. Conservato altrove o firmato, il manifesto resta una prova
   indipendente dell'integrità.

   </details>
