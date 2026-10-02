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
| `10-attack-to-defense/data/access.log` | 10 | 57 richieste al web server: traffico normale, una ricognizione di file esposti, un credential stuffing | generato da `genera_tracce.py` | `9afa5c4cb0bd3d312114d95d80f097708bb56e6c3ce582f12925a9ee194affde` |
| `10-attack-to-defense/data/auth-events.jsonl` | 10 | 43 eventi di login dell'applicazione, con l'account compromesso | generato da `genera_tracce.py` | `dfe106eee0eadb7505d872ac039a0151ae7a6970eac1f781623e2dfd8a6645a9` |
| `10-attack-to-defense/data/genera_tracce.py` | 10 | il generatore delle due tracce, deterministico | scritto a mano | `45c14ba31e22a014b8437bcccc6540cd3e588fc11d5e6e53a6e5bfd8a9c3dab0` |
| `11-telemetry-views/data/endpoint.jsonl` | 11 | 8 eventi dell'agente sull'endpoint: processi e file modificati, con la persistenza | generato da `genera_telemetria.py` | `5c102a3b0b76e60aeb653f10360d602f757163cd51460107f46296f299fe0219` |
| `11-telemetry-views/data/identita.jsonl` | 11 | 38 autenticazioni: un accesso normale, un brute force riuscito, un password spraying | generato da `genera_telemetria.py` | `7c05f0a5071cb30841745e5663a9d3f5081a68d90ad1b866541452f3501a5156` |
| `11-telemetry-views/data/rete.jsonl` | 11 | 38 flussi di rete SSH dello stesso incidente, senza nomi utente | generato da `genera_telemetria.py` | `162ab091bd2c31722588e9d87d4e4a548f607edf286c0067815e5674808fa1c7` |
| `11-telemetry-views/data/genera_telemetria.py` | 11 | il generatore delle tre fonti, deterministico | scritto a mano | `40a3d0bca27a9ce70c54ec3cf001cd82e4fecf0c7c3b3db181cdc0fe91152a28` |

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
