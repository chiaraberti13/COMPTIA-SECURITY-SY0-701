# Dati sintetici dei laboratori

I file di dati che i laboratori analizzano, versionati nel repository insieme alla loro impronta
SHA-256. Sono tutti **sintetici**: nessuna persona, azienda, indirizzo o credenziale reale.

> **English summary.** The data files the labs analyze, versioned with their SHA-256. All are
> synthetic. A generated file comes with its generator, which reproduces it byte for byte;
> `tests/labData.test.ts` checks every hash, regenerates the generated files, refuses addresses
> and domains outside the reserved ranges, and recomputes the figures each lab prints so the
> expected output in its text cannot drift from the data.

## Catalogo

| File | Lab | Che cosa contiene | Come nasce | SHA-256 |
|---|---|---|---|---|
| `03-log-analysis/data/auth.log` | 03 | 47 righe di log SSH: accessi normali, un brute force riuscito con persistenza, un password spraying | generato da `genera_auth_log.py` | `13ea329df6706583f932aeff68c5831264116639e82b46ac655b1684e4e6b39c` |
| `03-log-analysis/data/genera_auth_log.py` | 03 | il generatore di `auth.log`, deterministico | scritto a mano | `df86e5360ed77cb2c183727840910d203dcca07563bb33ead938c23af77b2bb6` |
| `06-incident-triage/data/alerts.json` | 06 | 12 allarmi di un SIEM in una giornata | scritto a mano | `a029e348605707ca19f63f4406fb40e9bee02a7a4a62575250083512d3e37350` |
| `06-incident-triage/data/inventory.json` | 06 | inventario degli asset ed eccezioni approvate | scritto a mano | `c67751204e667eefe1024d4ae69079d968f51ef52fd184d51aef72e635a56c95` |

Gli altri laboratori creano i propri dati durante l'esercizio (chiavi e certificati nel Lab 04,
file d'ufficio nel Lab 05, utenti nel Lab 08) e li cancellano nel cleanup: nel repository non
c'è nulla da versionare.

## Regole

1. **Indirizzi.** IPv4 solo dalle reti private (`10.0.0.0/8`, `172.16.0.0/12`,
   `192.168.0.0/16`) o dai blocchi riservati alla documentazione (`192.0.2.0/24`,
   `198.51.100.0/24`, `203.0.113.0/24`, RFC 5737). Nessun indirizzo pubblico vero, nemmeno
   come «attaccante».
2. **Nomi di dominio** solo con i suffissi riservati `.test`, `.example`, `.invalid`,
   `.localhost` o i domini `example.com`, `example.net`, `example.org` (RFC 2606).
3. **Persone e aziende** di fantasia: nomi propri generici, l'azienda è Kestrelia. Nessun
   indirizzo email, numero di telefono o documento.
4. **Segreti finti e dichiarati.** Una chiave o un'impronta, quando serve, contiene la parola
   `fake` o `lab`; le chiavi vere i laboratori le generano al momento.
5. **Riproducibili.** Un file generato si versiona con il suo generatore, che deve ricrearlo
   identico. Un file scritto a mano è la propria sorgente.
6. **Risultato atteso verificato.** Le cifre che il laboratorio mostra nei suoi output (quanti
   tentativi, quali indirizzi, quali allarmi) sono ricalcolate dai dati dal test: se cambia il
   file, il test indica quale output del testo non corrisponde più.

## Rigenerare un file

```bash
cd labs/03-log-analysis/data
python3 genera_auth_log.py > auth.log
sha256sum auth.log
```

```text
13ea329df6706583f932aeff68c5831264116639e82b46ac655b1684e4e6b39c  auth.log
```

Se cambi intenzionalmente un dataset, aggiorna nello stesso commit l'impronta qui sopra, quella
nel Setup del laboratorio e gli output del testo che ne dipendono.
