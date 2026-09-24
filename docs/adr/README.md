# Registro delle decisioni architetturali (ADR)

Ogni file descrive una decisione che ha conseguenze durature sul progetto:
il contesto, la scelta, le alternative scartate e i costi che accettiamo. Il
formato segue [Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

Una decisione non si modifica: se cambia, si scrive un nuovo ADR che la
sostituisce e si aggiorna lo stato di quello vecchio a "Sostituito da ADR NNNN".

| N. | Decisione | Stato |
|---|---|---|
| [0001](0001-dataset-in-typescript.md) | Contenuti di studio come dataset TypeScript tipizzati | Accettato |
| [0002](0002-bilingue-a-overlay.md) | Inglese come overlay a chiavi sopra la fonte italiana | Accettato |
| [0003](0003-provider-ai-dietro-proxy.md) | Gemini come provider AI, chiamato solo dal server | Accettato |
| [0004](0004-persistenza-solo-locale.md) | Progressi salvati solo nel browser, senza account | Accettato |

## Modello

```markdown
# NNNN — Titolo della decisione

- **Stato:** Proposto | Accettato | Sostituito da ADR NNNN
- **Data:** AAAA-MM-GG

## Contesto
Il problema e i vincoli, con i fatti che lo rendono rilevante.

## Decisione
Cosa abbiamo scelto, in una o due frasi.

## Alternative considerate
Le opzioni scartate e perché.

## Conseguenze
Benefici, costi accettati e come li teniamo sotto controllo.
```
