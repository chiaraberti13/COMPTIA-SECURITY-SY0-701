# Strategia di migrazione per gli aggiornamenti d'esame · Exam-update migration strategy

Questo documento descrive come il progetto passerà da **CompTIA Security+ SY0-701** al suo
successore quando CompTIA ne pubblicherà uno (tipicamente ogni tre anni circa). Non è materiale
ufficiale CompTIA e non anticipa date o contenuti non ancora annunciati: è il piano interno per
reagire all'annuncio senza rompere l'app, i progressi salvati degli studenti o la parità IT/EN.

- **Responsabile:** manutentrice del repository (vedi [`.github/CODEOWNERS`](../.github/CODEOWNERS)).
- **Ultima revisione:** 2026-10-06.
- **Prossimo controllo:** entro 180 giorni, cioè il 2027-04-04, o prima se CompTIA annuncia un successore.
- **Fonte di verità del codice d'esame:** [`src/examVersion.ts`](../src/examVersion.ts). Alla data di
  questa revisione nessun successore di SY0-701 è stato annunciato (`SUCCESSOR` è `null`).

> **English summary.** When CompTIA publishes a successor to SY0-701, this is the internal plan to
> migrate without breaking the app, learners' saved progress or IT/EN parity. The single source of
> truth for the exam identity is [`src/examVersion.ts`](../src/examVersion.ts); the seven ordered
> steps below are enforced by `tests/examVersion.test.ts`. Each step appears in both languages. As
> of this review no successor is announced.

---

## Italiano

### Principi

1. **Un solo punto di verità.** Il codice d'esame, la famiglia e il numero di domini sono dichiarati
   in [`src/examVersion.ts`](../src/examVersion.ts). La migrazione comincia modificando quel file;
   il test `tests/examVersion.test.ts` costringe poi il resto del repository (intestazione, nome del
   pacchetto, obiettivi) a tornare coerente, così nessun riferimento resta indietro.
2. **Non rompere ciò che funziona.** La migrazione segue lo stesso principio della roadmap: piccole
   PR incrementali, `npm run check` e `npm run build` sempre verdi, nessun cambio al formato dei
   progressi salvati senza migrazione testata.
3. **Nessuna perdita di progressi.** Gli ID a cui puntano i dati salvati (ID delle domande,
   `checklistKey`, codici degli obiettivi, cartelle dei lab) non si cancellano: i contenuti superati
   si marcano `deprecated`, non si rimuovono (vedi [`CONTRIBUTING.md`](../CONTRIBUTING.md) e
   `tests/deprecation.test.ts`).
4. **Finestra di sovrapposizione.** Finché CompTIA mantiene attive entrambe le versioni d'esame,
   l'app serve la nuova come predefinita ma non nasconde i contenuti della vecchia a chi si sta
   ancora preparando su quella.
5. **Versione major.** Un cambio di syllabus è una versione **major** in SemVer, come già dichiarato
   in [`CHANGELOG.md`](../CHANGELOG.md): si rilascia con il processo di [`docs/releases.md`](releases.md).

### Passi di migrazione

I passi seguenti sono dichiarati come `MIGRATION_STEPS` in [`src/examVersion.ts`](../src/examVersion.ts)
e il test verifica che ognuno sia documentato qui, in entrambe le lingue.

#### 1. `watch` — sorvegliare l'annuncio

Tenere d'occhio l'annuncio ufficiale di CompTIA (nuovo codice, nuovi obiettivi, finestra di
sovrapposizione e data di ritiro di SY0-701). La issue di manutenzione mensile
([`scripts/maintenance-report.ts`](../scripts/maintenance-report.ts)) è il promemoria naturale per
ricontrollare. Appena il successore è noto, aprire una issue epica che raccolga i passi seguenti.

#### 2. `inventory` — inventariare i riferimenti

Partire da [`src/examVersion.ts`](../src/examVersion.ts): è la radice. Da lì individuare ogni punto
che nomina l'esame o i suoi obiettivi:

- intestazione dell'interfaccia ([`src/components/AppHeader.tsx`](../src/components/AppHeader.tsx));
- identità del pacchetto (`name` in `package.json`);
- codici degli obiettivi e mappa domande→obiettivi ([`src/questionObjectives.ts`](../src/questionObjectives.ts));
- pesi e guide di dominio ([`src/domainGuides.ts`](../src/domainGuides.ts));
- mappatura ai framework ([`docs/framework-mapping.md`](framework-mapping.md)) e matrice di copertura
  ([`docs/coverage-matrix.md`](coverage-matrix.md), rigenerata da `npm run coverage-matrix`).

Una ricerca `SY0-701` nel repository completa l'elenco. Aggiornare prima `examVersion.ts`: i test
falliti indicano esattamente che cosa resta da allineare.

#### 3. `map-objectives` — mappare gli obiettivi

Scrivere una tabella dal vecchio al nuovo syllabus: obiettivi invariati, rinominati, fusi, divisi o
rimossi. Gli obiettivi rimossi diventano `deprecated` con motivazione; quelli nuovi entrano in
`OFFICIAL_OBJECTIVES`. La mappa domande→obiettivi ([`src/questionObjectives.ts`](../src/questionObjectives.ts))
si aggiorna di conseguenza, mantenendo la copertura minima imposta dal suo test.

#### 4. `content` — adeguare i contenuti

Per ogni dominio del nuovo blueprint: aggiungere o rivedere domande, guide ed esempi pratici secondo
i nuovi pesi; marcare `deprecated` ciò che non è più in programma. Rispettare i gate esistenti
(`tests/dataset.test.ts`, `tests/domainGuides.test.ts`, `tests/gapAnalysis.test.ts`): nessuna
sottovoce senza esempio, scenario obbligatorio, pesi entro la tolleranza.

#### 5. `translate` — mantenere la parità IT/EN

L'italiano resta la sorgente di verità, l'inglese l'overlay. Ogni modifica va in entrambe le lingue
con gli stessi numeri e sigle; i test `tests/languageParity.test.ts`, `tests/translationFreshness.test.ts`
e `tests/i18n.test.ts` restano verdi.

#### 6. `compatibility` — preservare i progressi salvati

I dati salvati nel browser puntano a ID stabili. Durante la migrazione:

- **non** rimuovere domande, sottovoci o obiettivi a cui i progressi puntano: marcarli `deprecated`;
- se cambia il formato dei progressi, scrivere una migrazione in [`src/progressBackup.ts`](../src/progressBackup.ts)
  con un test dedicato (`tests/progressBackup.test.ts`);
- gli ID stabili restano registrati in `tests/fixtures/stable-ids.json`.

#### 7. `release` — rilasciare con sovrapposizione

Rilasciare una versione **major** seguendo [`docs/releases.md`](releases.md): spostare le voci da
`Unreleased` a una sezione datata in [`CHANGELOG.md`](../CHANGELOG.md), aggiornare `version`, taggare
su `main`. Durante la finestra di sovrapposizione l'app serve il nuovo esame come predefinito e
indica chiaramente dove trovare i contenuti ancora validi per chi sostiene la vecchia versione.
Al ritiro ufficiale di SY0-701, portare `CURRENT_EXAM.status` a `retired` e promuovere il successore.

---

## English

### Principles

1. **One source of truth.** The exam code, family and domain count are declared in
   [`src/examVersion.ts`](../src/examVersion.ts). A migration starts by editing that file;
   `tests/examVersion.test.ts` then forces the rest of the repository (header, package name,
   objectives) back into agreement so no reference is left behind.
2. **Do not break what works.** The migration follows the roadmap principle: small incremental PRs,
   `npm run check` and `npm run build` always green, no change to the saved-progress format without a
   tested migration.
3. **No lost progress.** The IDs that saved data points to (question IDs, `checklistKey`, objective
   codes, lab folders) are never deleted: superseded content is marked `deprecated`, not removed (see
   [`CONTRIBUTING.md`](../CONTRIBUTING.md) and `tests/deprecation.test.ts`).
4. **Overlap window.** While CompTIA keeps both exam versions live, the app serves the new one by
   default but does not hide the old content from learners still preparing for it.
5. **Major version.** A syllabus change is a **major** SemVer bump, as already stated in
   [`CHANGELOG.md`](../CHANGELOG.md): it ships through the [`docs/releases.md`](releases.md) process.

### Migration steps

The steps below are declared as `MIGRATION_STEPS` in [`src/examVersion.ts`](../src/examVersion.ts),
and the test checks that each one is documented here in both languages.

#### 1. `watch` — watch for the announcement

Track CompTIA's official announcement (new code, new objectives, overlap window and SY0-701
retirement date). The monthly maintenance issue ([`scripts/maintenance-report.ts`](../scripts/maintenance-report.ts))
is the natural reminder to re-check. As soon as the successor is known, open an epic issue gathering
the steps below.

#### 2. `inventory` — inventory the references

Start from [`src/examVersion.ts`](../src/examVersion.ts): it is the root. From there, locate every
place that names the exam or its objectives:

- the UI header ([`src/components/AppHeader.tsx`](../src/components/AppHeader.tsx));
- the package identity (`name` in `package.json`);
- objective codes and the question→objective map ([`src/questionObjectives.ts`](../src/questionObjectives.ts));
- domain weights and guides ([`src/domainGuides.ts`](../src/domainGuides.ts));
- framework mapping ([`docs/framework-mapping.md`](framework-mapping.md)) and the coverage matrix
  ([`docs/coverage-matrix.md`](coverage-matrix.md), regenerated by `npm run coverage-matrix`).

A repository-wide search for `SY0-701` completes the list. Update `examVersion.ts` first: the failing
tests then point to exactly what still needs aligning.

#### 3. `map-objectives` — map the objectives

Write an old→new syllabus table: objectives unchanged, renamed, merged, split or removed. Removed
objectives become `deprecated` with a reason; new ones enter `OFFICIAL_OBJECTIVES`. The
question→objective map ([`src/questionObjectives.ts`](../src/questionObjectives.ts)) is updated
accordingly, keeping the minimum coverage its test enforces.

#### 4. `content` — adapt the content

For each domain in the new blueprint: add or revise questions, guides and focused examples per the
new weights; mark as `deprecated` whatever is no longer in scope. Keep the existing gates green
(`tests/dataset.test.ts`, `tests/domainGuides.test.ts`, `tests/gapAnalysis.test.ts`): no subtopic
without an example, a mandatory scenario, weights within tolerance.

#### 5. `translate` — keep IT/EN parity

Italian stays the source of truth, English the overlay. Every change lands in both languages with the
same numbers and acronyms; `tests/languageParity.test.ts`, `tests/translationFreshness.test.ts` and
`tests/i18n.test.ts` stay green.

#### 6. `compatibility` — preserve saved progress

Browser-saved data points to stable IDs. During the migration:

- do **not** remove questions, subtopics or objectives that progress points to: mark them `deprecated`;
- if the progress format changes, write a migration in [`src/progressBackup.ts`](../src/progressBackup.ts)
  with a dedicated test (`tests/progressBackup.test.ts`);
- stable IDs stay registered in `tests/fixtures/stable-ids.json`.

#### 7. `release` — release with an overlap

Release a **major** version via [`docs/releases.md`](releases.md): move entries from `Unreleased` to a
dated section in [`CHANGELOG.md`](../CHANGELOG.md), bump `version`, tag on `main`. During the overlap
window the app serves the new exam by default and clearly points learners sitting the old version to
the content still valid for them. When CompTIA retires SY0-701, set `CURRENT_EXAM.status` to `retired`
and promote the successor.
