# 0002 — Inglese come overlay a chiavi sopra la fonte italiana

- **Stato:** Accettato
- **Data:** 2026-09-24 (formalizza una scelta presente dalle prime versioni)

## Contesto

I contenuti sono nati in italiano. La versione inglese va mantenuta allineata
senza duplicare la struttura (opzioni, indici delle risposte, obiettivi), che
deve restare una sola: se l'indice della risposta corretta divergesse tra le
lingue, uno studente imparerebbe la risposta sbagliata.

## Decisione

L'italiano è la fonte. `src/data.en.ts` contiene solo le traduzioni, come
override indicizzati: `GROUP_EN` per titolo del gruppo, `SUBTOPIC_EN` per
`checklistKey`, `QUESTION_EN` per ID della domanda. `src/localizedData.ts`
clona la struttura italiana e sovrappone i campi inglesi presenti; ciò che
manca resta in italiano. L'overlay inglese è un import dinamico, scaricato
solo da chi usa l'app in inglese. I testi dell'interfaccia usano chiavi in
`src/i18n.tsx`, e le guide di dominio sono oggetti paralleli in
`src/domainGuides.ts`.

## Alternative considerate

- **Due dataset completi e indipendenti.** Il doppio del lavoro a ogni
  modifica strutturale e un rischio concreto di risposte corrette diverse tra
  le lingue.
- **Una libreria i18n con file di messaggi** (per esempio i18next). È adatta
  alle etichette dell'interfaccia, ma non a paragrafi, tabelle e domande con
  struttura propria.

## Conseguenze

- ✅ La struttura (risposte, opzioni, obiettivi) esiste una sola volta.
- ✅ Chi studia in italiano non scarica i ~2 MB dell'inglese.
- ⚠️ Una traduzione può mancare o restare indietro senza errori visibili.
  `tests/languageParity.test.ts` confronta numeri, acronimi e token letterali
  di ogni frase con la sua traduzione (circa 8.000 coppie). Ha già trovato 9
  disallineamenti, che sono stati corretti.
- ⚠️ La parità di significato, oltre ai fatti estratti automaticamente, richiede
  ancora una revisione umana (voce P1 della roadmap).
