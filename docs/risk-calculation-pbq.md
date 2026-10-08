# PBQ 308 — catena quantitativa AV, EF, SLE e ALE

Esercizio originale bilingue per l'obiettivo SY0-701 5.2. Integra conversione
delle percentuali, unità per evento e per anno, rischio inerente e residuo,
costo annuo del controllo e trattamento motivato.

## Calcolo verificabile

| Passaggio | Formula | Risultato |
| --- | --- | --- |
| SLE iniziale | €800.000 × 0,25 | €200.000/evento |
| ALE iniziale | €200.000 × 0,4/anno | €80.000/anno |
| SLE residua | €800.000 × 0,10 | €80.000/evento |
| ALE residuo | €80.000 × 0,1/anno | €8.000/anno |
| Riduzione attesa | €80.000 − €8.000 | €72.000/anno |
| Beneficio netto atteso | €72.000 − €18.000 | €54.000/anno |

Il caso sceglie la mitigazione perché il beneficio atteso supera il costo, ma
non presenta il risultato economico come criterio sufficiente. Obblighi,
tolleranza al rischio, sicurezza delle persone, impatti non monetizzati e
incertezza delle stime restano parte della decisione. I dati sono sintetici.

Fonte metodologica: [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final).
NIST tratta stime, assunzioni, incertezza e comunicazione dei risultati; le
formule AV/EF/SLE/ALE sono applicate qui come contenuto dell'obiettivo d'esame.

I test ricalcolano i risultati senza copiare la chiave, verificano unità,
distrattori, tabella e parità dei fatti IT/EN. I test Playwright coprono inoltre
tastiera, reset, accessibilità e layout desktop/mobile quando Chromium è disponibile.
