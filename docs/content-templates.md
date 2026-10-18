# Template dei contenuti

Come si scrivono i sette tipi di contenuto del progetto: sottovoce, confronto, procedura, comando,
domanda, scenario e laboratorio. Per ognuno: dove vive, quali campi ha, le regole e il test che le
fa rispettare. Ogni contenuto va scritto in italiano (la fonte) e in inglese nello stesso commit.

> **English summary.** The seven content templates of the project (concept, comparison,
> procedure, command, question, scenario, lab): where each lives, its fields, its rules and the
> test that enforces them. Italian is the source, English goes in the overlay in the same commit.
> See also [`CONTRIBUTING.md`](../CONTRIBUTING.md) and, for tone and terminology,
> [`style-guide.md`](style-guide.md).

## Sottovoce

Una voce di studio della checklist, che compare anche nel glossario.

- **Dove:** `src/data.ts` (`DOMAIN_N_TOPICS`), traduzione in `src/data.en.ts` (`SUBTOPIC_EN`).
- **Campi:**

  | Campo | Obbligatorio | Regola |
  |---|---|---|
  | `name` | sì | Il termine come compare all'esame, con la sigla fra parentesi se esiste |
  | `checklistKey` | sì | Identificatore stabile, mai rinominato (vedi [Nomi e identificatori](../CONTRIBUTING.md)) |
  | `definition` | sì | Una o due frasi, al massimo 400 caratteri, chiuse da un punto; `""` se il concetto è già definito in un altro dominio (vedi sotto) |
  | `details` | sì | L'analisi: paragrafi ed elenchi, con **grassetto**, `codice` e callout; al massimo 400 parole, circa due minuti di lettura |
  | `keyFormulas` | no | Solo se ci sono formule, ognuna scritta per intero |
  | `comparativeTable` | no | Vedi [Confronto](#confronto) |
  | `examTip` | sì | Una frase su come l'argomento compare nelle domande |

- **Callout nei `details`:** un punto elenco che inizia con un'etichetta standard diventa un
  riquadro, per esempio `* **Piccolo Esempio Concentrato:** …` o `* **Trappola d'esame:** …`.
  L'elenco completo è in [`CONTRIBUTING.md`](../CONTRIBUTING.md).
- **Un concetto in più domini:** la definizione si scrive una volta sola, nella voce canonica.
  Nell'altro dominio la sottovoce ha `definition: ""` (e nessuna `definition` in
  `src/data.en.ts`), mantiene la propria analisi e il proprio consiglio d'esame, e si aggiunge a
  `CANONICAL_TERMS` in `src/canonicalTerms.ts` con il riferimento `dominio:checklistKey`, per
  esempio `"2:CVEVuln": "4:CVE"`. Due sottovoci con lo stesso nome ma significati diversi vanno
  in `HOMONYMS`, con il motivo.
- **Test:** `tests/contentTemplates.test.ts` (campi, lunghezza, tabelle, formule),
  `tests/dataset.test.ts` (chiavi univoche, sottogruppi), `tests/languageParity.test.ts`,
  `tests/canonicalTerms.test.ts` (voci canoniche e omonimi).

## Confronto

Una tabella che mette a fianco concetti che l'esame tende a confondere. Solo per confronti reali:
un elenco non va trasformato in tabella.

- **Dove:** `comparativeTable` di una sottovoce, oppure `comparisons` di una guida di dominio
  (`src/domainGuides.ts`, con un `title`).
- **Regole:** almeno due colonne; la prima intestazione nomina la colonna delle etichette di riga
  (per esempio «Aspetto»), mai vuota, perché gli screen reader annunciano quel nome; ogni riga ha
  tante celle quante le intestazioni, nessuna cella vuota; nelle guide almeno due righe.
- **Esempio:**

  | Aspetto | Risk appetite | Risk tolerance |
  |---|---|---|
  | Chi lo stabilisce | Il consiglio di amministrazione | Chi governa il singolo processo |
  | Livello | Strategico | Operativo |

- **Test:** `tests/contentTemplates.test.ts`, `tests/domainGuides.test.ts`.

## Procedura

Una sequenza di passi da seguire in ordine.

- **Dove:** il percorso di studio delle guide (`studyPath`, ogni passo con `title` e
  `rationale`, cioè perché viene in quel punto) e l'esercizio dei laboratori.
- **Regole:** passi numerati; ogni passo dice che cosa fare e che cosa si ottiene; nei
  laboratori ogni passo è comando, output ottenuto, che cosa osservare; prima di un passo
  sensibile un avviso `> ⚠️`.
- **Test:** `tests/dataset.test.ts` (stesso numero di passi nelle due lingue), `tests/labs.test.ts`.

## Comando

- **Nei contenuti di studio:** codice inline fra backtick (`` `nmap -sV` ``), mostrato in
  carattere monospazio. I backtick vanno sempre in coppia sulla stessa riga.
- **Nei laboratori:** un blocco `bash` per i comandi e un blocco `text` separato per l'output
  reale ottenuto; ogni blocco dichiara il linguaggio.
- **Regole di sicurezza:** nomi di host riservati (`example.com`, `*.example`, `*.test`) e
  aziende di fantasia; nei laboratori solo `127.0.0.1` o `localhost`; nessun comando che spegne
  una protezione o distrugge dati senza spiegazione; nessuna credenziale reale.
- **Test:** `tests/MarkdownText.test.tsx` (backtick in coppia), `tests/contentSafety.test.ts`,
  `tests/labs.test.ts`, markdownlint (regola MD040).

## Domanda

- **Dove:** `src/data.ts` (`DOMAIN_N_QUESTIONS`), traduzione in `QUESTION_EN` di
  `src/data.en.ts`.
- **Campi:** `id` (nuovo, mai riusato), `topic` (collegato agli obiettivi in
  `src/questionObjectives.ts`), `level` (`RICORDO`, `COMPRENSIONE`, `APPLICAZIONE`, `ANALISI`),
  `scenario`, `question`, da 2 a 6 `options` con la lettera (`"A) …"`), `answerIndex` e, per le
  domande a risposta multipla, `answerIndexes` con «(scegline due)» nel testo della domanda.
- **Spiegazione**, sempre in quest'ordine:

  ```text
  La risposta corretta è la **B) …**.

  * **Perché è la corretta:** …
  * **Perché le altre non sono corrette:**
    * **A) …** …
    * **C) …** …
    * **D) …** …

  * **Trappola d'esame:** …
  * **Piccolo Esempio Concentrato:** …
  ```

- **Regole:** uno scenario realistico, una sola risposta difendibile (salvo le multiple); ogni
  distrattore discusso, nessuna risposta corretta fra i distrattori; lettere corrette distribuite
  fra A, B, C e D; almeno metà delle domande di un dominio di livello applicazione o analisi.
- **Per ritirarla:** non si cancella; si aggiunge `deprecated: { since, reason }` (vedi
  [`CONTRIBUTING.md`](../CONTRIBUTING.md)). Lo stesso vale per le sottovoci.
- **Dopo averla aggiunta:** `npm run coverage-matrix` e
  `UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts`.
- **Test:** `tests/dataset.test.ts`, `tests/questionObjectives.test.ts`,
  `tests/conventions.test.ts`, `tests/languageParity.test.ts`.

## Scenario

Un caso applicato nelle guide di dominio.

- **Dove:** `appliedScenario` e `practiceScenarios` in `src/domainGuides.ts`; le voci «Esame e
  realtà» in `examVsPractice`.
- **Campi:** `title`, `prompt` (la situazione e la domanda), `reasoning` (il ragionamento che
  porta alla risposta, mostrato solo quando lo studente lo chiede) e, negli esercizi, l'`objective`
  che allenano. Le voci «Esame e realtà» hanno `topic`, `exam` e `practice`.
- **Regole:** il `prompt` non contiene la risposta; il `reasoning` spiega il perché, non solo il
  che cosa; stesso numero di voci in italiano e in inglese.
- **Test:** `tests/domainGuides.test.ts`, `tests/dataset.test.ts`,
  `tests/DomainGuidePanel.test.tsx`.

## Laboratorio

- **Dove:** `labs/NN-nome-breve/README.md` e `README.en.md`, a partire da
  [`labs/TEMPLATE.md`](../labs/TEMPLATE.md), nel rispetto delle regole d'ingaggio di
  [`labs/README.md`](../labs/README.md).
- **Test:** `tests/labs.test.ts` (metadati, sezioni, parità fra le lingue, host usati nei
  comandi, avvisi sopra il rischio `low`).
