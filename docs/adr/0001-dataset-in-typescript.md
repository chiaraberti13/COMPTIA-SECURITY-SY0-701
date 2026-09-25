# 0001 — Contenuti di studio come dataset TypeScript tipizzati

- **Stato:** Accettato
- **Data:** 2026-09-24 (formalizza una scelta presente dalle prime versioni)

## Contesto

L'app contiene 664 domande, 550 voci di glossario e le sottovoci dei cinque
domini, in italiano e in inglese: circa 2 MB di testo per lingua. Ogni domanda
ha una struttura rigida (quattro opzioni, indice della risposta, spiegazione di
ogni opzione sbagliata, scenario) e un errore strutturale produce una domanda
che non si può risolvere o che insegna la risposta sbagliata.

## Decisione

I contenuti vivono in `src/data.ts` e `src/data.en.ts` come costanti TypeScript
tipizzate dalle interfacce di `src/types.ts`, verificate da `tsc` e dai test
(`tests/dataset.test.ts`, `tests/languageParity.test.ts`,
`tests/questionObjectives.test.ts`) e impacchettate da Vite in chunk dedicati.

## Alternative considerate

- **File JSON o YAML.** Sono più facili da modificare per chi non programma,
  ma il controllo dei tipi andrebbe replicato con uno schema. Resta un'opzione
  per il futuro, con JSON Schema e validazione in CI.
- **Markdown con front matter**, un file per sottovoce. È adatto al testo
  lungo e alle revisioni editoriali, ma rende più difficile controllare in
  modo automatico domande a scelta multipla e tabelle.
- **CMS o database.** Aggiungerebbe un servizio da proteggere e da mantenere
  per contenuti che cambiano solo con una pull request revisionata.

## Conseguenze

- ✅ Un campo mancante o del tipo sbagliato blocca la build; i test verificano
  ID univoci, risposte valide, parità IT/EN e copertura degli obiettivi.
- ✅ I dataset stanno in chunk separati dal codice: una modifica
  all'interfaccia non invalida la cache del browser per i contenuti.
- ⚠️ I file sono molto grandi. Il commit `9098ba5` li ha troncati senza che
  nessuno se ne accorgesse in revisione. Da allora typecheck, test e build in CI
  bloccano qualsiasi modifica che li rompa.
- ⚠️ Per contribuire ai contenuti serve un minimo di familiarità con
  TypeScript. `CONTRIBUTING.md` e i moduli per le issue ("errore nei
  contenuti") permettono di segnalare un problema senza toccare il codice.
