# PBQ 307 — BIA, RTO e RPO

Esercizio originale IT/EN, obiettivo principale SY0-701 3.4, collegamento 5.2.
Disponibile in pratica e nelle simulazioni attraverso il catalogo PBQ condiviso.

L'interruzione avviene alle 12:00. Il tempo di recupero include attivazione,
ripristino, dipendenze e verifica: non è soltanto il trasferimento del backup.
La perdita dati si calcola dal punto realmente recuperabile, dello stesso giorno.
Il criterio dichiarato è il minor costo fra piani che rispettano entrambi i limiti.

| Servizio | RTO (minuti) | RPO (minuti) | Piani ammissibili | Scelta |
| --- | --- | --- | --- | --- |
| Pagamenti | 30 | 5 | A | A |
| Ordini | 120 | 30 | A, B | B |
| Archivio | 480 | 120 | A, B, C | C |

A recupera in 20 minuti e perde 3 minuti; B in 90 e perde 15; C in 360 e perde 60.
D perde solo 1 minuto ma richiede 600 minuti; E recupera in 10 ma perde 180 minuti,
nonostante backup nominali ogni 15 minuti: gli ultimi tentativi sono falliti.
I nomi hot/warm/cold sono accompagnati da capacità esplicite e prove misurate.
La replica può propagare cancellazioni; copie isolate versionate, conservazione
 e prove di ripristino costituiscono una protezione distinta.

Fonte primaria: [NIST SP 800-34 Rev. 1](https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final),
pianificazione di continuità, BIA e strategie di recupero. Dati e costi fittizi;
non rappresentano garanzie di prestazione di prodotti o raccomandazioni economiche.

## Verifica

Test bilingui verificano i calcoli indipendenti, il costo minimo ammissibile,
le evidenze tabellari, i distrattori e la parità dei fatti IT/EN.
Test Playwright coprono risposta via tastiera, reset, feedback, overflow e axe,
nei progetti desktop/mobile configurati. L'esecuzione browser in questo ambiente
è impedita dall'assenza del binario Chromium; tali controlli non sono dichiarati superati.
