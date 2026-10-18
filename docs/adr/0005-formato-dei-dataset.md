# 0005 — Dataset in TypeScript con schema a runtime, estrazione in JSON rimandata

- **Stato:** Accettato
- **Data:** 2026-09-28
- **Riprende:** [0001 — Contenuti di studio come dataset TypeScript tipizzati](0001-dataset-in-typescript.md)

## Contesto

L'ADR 0001 lasciava aperta l'estrazione dei contenuti in JSON o YAML, e la roadmap chiedeva di
valutarla «solo dopo che i test coprono la validazione dello schema». Il beneficio atteso è
permettere contributi di contenuto senza toccare codice TypeScript.

Misure del 2026-09-28:

| Aspetto | Valore |
|---|---|
| Domande | 682, in 5 domini |
| `src/data.ts` (italiano) | 2,5 MB di sorgente; 4,2 MB se scritto come JSON indentato |
| `src/data.en.ts` (overlay inglese) | 2,2 MB di sorgente; 2,3 MB come JSON indentato |
| Commenti nei dataset | 14 in `src/data.ts`, fra cui i rimandi alle voci canoniche |
| Commit su `src/data.ts` e `src/data.en.ts` | 94: 93 da sessioni di Claude Code, 1 da chi mantiene il progetto |
| Contenuto non serializzabile (funzioni, date, `undefined`) | Nessuno: il giro JSON restituisce dati identici |

## Decisione

1. **Prima la condizione posta dalla roadmap:** `src/contentSchema.ts` descrive con zod lo stesso
   contratto dei tipi, più le regole che i tipi non esprimono: indice della risposta dentro le
   opzioni, risposte multiple distinte con la più bassa in `answerIndex`, nessun campo
   sconosciuto (un refuso come `explaination` viene rifiutato), data ISO nelle deprecazioni,
   tabelle rettangolari. `tests/contentSchema.test.ts` lo applica a tutti i dataset, italiano e
   inglese, e verifica che siano dati puri.
2. **I dataset restano in TypeScript per ora.** Lo schema rende l'estrazione un passo meccanico
   (scrivere i file JSON e un caricatore che li valida con lo stesso schema), da fare quando si
   verifica una delle condizioni qui sotto.

## Quando rivalutare

- Arrivano contributi di contenuto da persone che non usano TypeScript, oppure le issue
  «errore nei contenuti» restano aperte perché nessuno sa modificare il file.
- Si adotta uno strumento editoriale (un CMS in sola lettura, un foglio condiviso) che produce
  JSON.
- Si dividono i dataset per dominio per caricarli su richiesta (la baseline di qualità segnala il
  tempo di primo rendering su mobile): la divisione è indipendente dal formato, ma i file JSON per
  dominio sarebbero il momento naturale per cambiarlo.

## Alternative considerate

- **Estrarre subito in JSON.** Nessuno ne ha oggi bisogno: la cronologia mostra che i contenuti
  sono modificati quasi solo da sessioni automatizzate, che lavorano bene con TypeScript. Si
  perderebbero i commenti, compresi i rimandi alle voci canoniche, e il file italiano passerebbe
  da 2,5 a 4,2 MB, più difficile da rivedere in una pull request.
- **YAML.** Più leggibile per il testo lungo, ma aggiunge un parser fra le dipendenze (una
  superficie di supply chain in più) e ha conversioni implicite insidiose: con le regole di YAML
  1.1, ancora seguite da alcuni parser, un valore `no` non fra virgolette diventa il booleano
  `false`.
- **Validare solo con `tsc`.** Non basta: i controlli sparirebbero nel momento stesso in cui i
  dati uscissero da TypeScript, e alcune regole (risposta dentro le opzioni) non sono tipi.

## Conseguenze

- ✅ Condizione soddisfatta: ogni dataset è validato a runtime, in qualunque formato arrivi.
- ✅ Le regole che `tsc` non vede (una risposta fuori dalle opzioni, una data non ISO) ora fanno
  fallire i test con il percorso esatto, per esempio
  `DOMAIN_2_QUESTIONS.14.answerIndex: the answer is one of the options`.
- ⚠️ Contribuire ai contenuti richiede ancora di modificare un file TypeScript, come previsto
  dall'ADR 0001; i moduli per le issue restano la via per chi non programma.
- ⚠️ Lo schema e i tipi di `src/types.ts` vanno tenuti allineati: il test fallisce se un dataset
  valido per `tsc` non lo è per lo schema, ma un campo aggiunto ai tipi va aggiunto anche allo
  schema.
