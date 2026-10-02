# Contributing · Contribuire

<p align="center"><a href="#-english">🇬🇧 English</a> · <a href="#-italiano">🇮🇹 Italiano</a></p>

---

## 🇬🇧 English

Thank you for helping improve this study platform. Corrections to the study content are as valuable as code: a wrong fact taught to hundreds of learners is a real bug.

### Before you start

- **Security issues** go through [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new), never a public issue. See [`SECURITY.md`](SECURITY.md).
- For anything larger than a typo, open an issue first so the approach can be agreed.
- The study material must stay **original**: no questions copied from the real exam, from commercial question banks or from other courses.
- Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

### Local setup

Requirements: Node.js `22.13` or later (`24.x` recommended, see [`.nvmrc`](.nvmrc)) and npm `10` or later.

```bash
npm ci                    # exact dependencies from package-lock.json
cp .env.example .env      # GEMINI_API_KEY is only needed for the AI features
npm run dev               # http://localhost:3000
```

### Checks to run before a pull request

```bash
npm run check             # typecheck + lint (code and Markdown) + Italian/English spell check + all tests (CI runs the same)
npm run test:coverage     # the tests again, failing below the coverage thresholds of vitest.config.ts
npm run build             # production build
npm run smoke             # starts the built server in production mode and probes it
npm run e2e               # Playwright + axe at phone and desktop width (after build)
```

For `npm run e2e`, install Chromium once with `npx playwright install chromium`, or point `PW_CHROMIUM_PATH` to an existing Chromium.

`npm run spellcheck` checks Italian and English content separately with cspell and names the text that holds an unknown word: fix it, or add a real term (an acronym, a product, a fictional name) to `cspell/project-words.txt`.

CI runs these on Node 22 and 24, plus a separate security workflow (secret scan, `npm audit`, dependency review, CodeQL). A pull request is ready when all of them are green.

### Changing study content

The Italian text in `src/data.ts` is the source of truth; `src/data.en.ts` is the English overlay. Domain guides live in `src/domainGuides.ts`. [`docs/content-templates.md`](docs/content-templates.md) describes the template of each kind of content (concept, comparison, procedure, command, question, scenario, lab) and the test that enforces it; [`docs/style-guide.md`](docs/style-guide.md) sets tone, terminology (the terms of the SY0-701 objectives), acronyms, American spelling for the English content and the approved translations, checked by `tests/styleGuide.test.ts`.

1. **Change both languages in the same pull request.** The tests check that every Italian sentence and its translation carry the same numbers, acronyms and literal tokens (`tests/languageParity.test.ts`). If a difference is only idiomatic, add it to the reviewed list in that test with a one-line reason. Changing Italian text also makes `tests/translationFreshness.test.ts` list the English translations to reread; once they are updated or confirmed, run `UPDATE_TRANSLATION_SOURCES=1 npx vitest run tests/translationFreshness.test.ts` and commit the fixture with them.
2. **A new question** needs: a scenario, 2–6 options, the correct `answerIndex` (and `answerIndexes` for "choose TWO"), and an explanation that names the correct options and discusses **every** wrong one. `tests/dataset.test.ts` enforces all of this. Its `topic` must be linked to SY0-701 objectives in `src/questionObjectives.ts` (a new topic needs a new entry), then run `npm run coverage-matrix` and commit the updated `docs/coverage-matrix.md`.
3. **Cite the source** for regulatory statements, numbers that change over time and configuration advice: official CompTIA objectives, NIST, RFCs, OWASP, CIS or vendor documentation.
4. **Separate exam theory from practice**: say when the exam simplifies something that works differently in real environments.
5. Commands and examples must be safe to copy: no real credentials, no destructive command without a warning, no targets you are not authorized to test. Hostnames are reserved names (`example.com`, `*.example`, `*.test`) and companies are fictional; `tests/contentSafety.test.ts` enforces it.
6. **Maintain objective sources.** Keep the mapping in `src/contentReview.ts` aligned with the content and run `npm run coverage-matrix`. Human approval and a second reviewer are not required; all mandatory automated checks must pass.
7. **Callouts.** A bullet that opens with a standard label becomes a titled box with its own icon: `* **Exam trap:** …` / `* **Trappola d'esame:** …` (exam), `* **Focused Mini-Example:** …` / `* **Piccolo Esempio Concentrato:** …` (practice), `* **Danger:** …` / `* **Pericolo:** …` (warning), `* **Remember:** …` / `* **Da ricordare:** …` (note), `* **The concept, from first principles:** …` / `* **Il concetto, dal principio:** …` (deep dive, also for criterion, principle, problem and distinction). The common traps of a domain guide are shown as "common mistake" callouts. The full list is `LABEL_CALLOUTS` in `src/components/Callout.tsx`; use exactly these labels, in both languages, so the box appears in each.
8. **No emoji as the only cue.** The app uses no emoji: a warning is a word ("Caution:", a callout) or a `lucide-react` icon with `aria-hidden` next to text; a right answer says so in words, not only in green. In the documentation a status emoji is followed by words (`✅ mitigated`), never alone in a table cell. `tests/emojiCues.test.ts` enforces both.
9. **Links and images.** A link says where it leads (`[Isolation rules](labs/README.md)`, not `[here](…)` or `[EN](…)`); an image has an alt of at least two words saying what it shows; a diagram is followed by a **Text version** (a list or a table with the same information). `tests/linkText.test.ts` enforces it.

### Naming and identifiers

- **Files:** documents and labs in `kebab-case` (`docs/threat-model.md`, `labs/01-security-headers/`, ADRs as `docs/adr/NNNN-title.md`); React components in `PascalCase` (`DomainGuidePanel.tsx`); hooks as `useSomething.ts`; other modules in `camelCase` (`contentReview.ts`); scripts in `kebab-case`.
- **Identifiers are forever.** What learners save in their browser points to question ids (namespaced as `domain × 10000 + id`) and to concept `checklistKey`s. Never rename or reuse one: a new question gets a new id, and outdated content is marked deprecated instead of being deleted. `tests/fixtures/stable-ids.json` records every published identifier and `tests/conventions.test.ts` fails if one disappears. After adding questions, concepts or labs, record them with `UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts` and commit the fixture.
- **Deprecating content.** To retire a question or a concept, add `deprecated: { since: "YYYY-MM-DD", reason: "why it is out of date, and what replaces it" }` to it in `src/data.ts`, then run `npm run coverage-matrix`. It stays in the dataset, so its id keeps existing, but the app no longer shows it, draws it in a quiz or counts it; `tests/deprecation.test.ts` requires the date and a real reason.

### Changing code

- Keep pull requests small and focused; do not mix refactoring with new behaviour.
- Validate and bound every new input on the server.
- Never render user or AI text with `innerHTML` or `dangerouslySetInnerHTML`.
- Data saved in `localStorage` must stay compatible, or ship with a tested migration: bump `STORAGE_SCHEMA_VERSION` in `src/storage.ts`, add the step to `STORAGE_MIGRATIONS` and a test to `tests/storage.test.ts`. `migrateStorage()` runs it once at start-up.
- New interactions must work with the keyboard and have labels in both languages.
- A new dependency needs a reason, a licence compatible with MIT and an active maintainer.

### Dependency updates

Dependabot opens update pull requests every Monday, after a 7-day cooldown on new releases.

| Kind of update | Deadline | How |
|---|---|---|
| Security fix | 48 hours | Merge once CI and the smoke test are green |
| Minor and patch (grouped) | 7 days | Merge once CI and the smoke test are green |
| Major version | Dedicated pull request | Read the changelog, run `npm run build && npm run smoke`, check the affected area by hand |

A green CI is not enough for a major version: Express 5, for example, built and passed every test but refused to start in production until the SPA route was changed. That is what `npm run smoke` is for.

### Commits and pull requests

- Commit messages: a short imperative subject (`fix(server): ...`, `feat(guides): ...`, `docs: ...`), then *why* the change was needed.
- Fill in the pull request template, including how you verified the change.
- Update [`CHANGELOG.md`](CHANGELOG.md) under *Unreleased* and, when a roadmap item changes state, [`ROADMAP.md`](ROADMAP.md).

---

## 🇮🇹 Italiano

Grazie per aiutare a migliorare questa piattaforma di studio. Le correzioni ai contenuti valgono quanto il codice: un'informazione sbagliata insegnata a centinaia di studenti è un bug vero.

### Prima di iniziare

- **I problemi di sicurezza** vanno segnalati tramite [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new), mai con una issue pubblica. Vedi [`SECURITY.md`](SECURITY.md).
- Per qualsiasi modifica più grande di un refuso, apri prima una issue per concordare l'approccio.
- Il materiale deve restare **originale**: nessuna domanda copiata dall'esame reale, da banche domande commerciali o da altri corsi.
- Chi partecipa segue il [Codice di condotta](CODE_OF_CONDUCT.md).

### Installazione locale

Requisiti: Node.js `22.13` o superiore (consigliata la `24.x`, vedi [`.nvmrc`](.nvmrc)) e npm `10` o superiore.

```bash
npm ci                    # dipendenze esatte da package-lock.json
cp .env.example .env      # GEMINI_API_KEY serve solo per le funzioni AI
npm run dev               # http://localhost:3000
```

### Controlli da eseguire prima di una pull request

```bash
npm run check             # typecheck + lint (codice e Markdown) + controllo ortografico inglese + tutti i test (la CI esegue gli stessi)
npm run test:coverage     # di nuovo i test, falliscono sotto le soglie di copertura di vitest.config.ts
npm run build             # build di produzione
npm run smoke             # avvia il server compilato in modalità produzione e lo verifica
npm run e2e               # Playwright + axe a larghezza telefono e desktop (dopo la build)
```

Per `npm run e2e` installa Chromium una volta con `npx playwright install chromium`, oppure indica un Chromium già presente con `PW_CHROMIUM_PATH`.

`npm run spellcheck` controlla separatamente con cspell i contenuti italiani e inglesi e indica il testo che contiene una parola sconosciuta: correggila, oppure aggiungi un termine vero (una sigla, un prodotto, un nome di fantasia) a `cspell/project-words.txt`.

La CI li esegue su Node 22 e 24, insieme a un workflow di sicurezza separato (ricerca di segreti, `npm audit`, dependency review, CodeQL). Una pull request è pronta quando sono tutti verdi.

### Modificare i contenuti di studio

Il testo italiano in `src/data.ts` è la fonte di verità; `src/data.en.ts` è la sovrapposizione inglese. Le guide di dominio sono in `src/domainGuides.ts`. [`docs/content-templates.md`](docs/content-templates.md) descrive il template di ogni tipo di contenuto (sottovoce, confronto, procedura, comando, domanda, scenario, lab) e il test che lo fa rispettare; [`docs/style-guide.md`](docs/style-guide.md) fissa tono, terminologia (i termini degli obiettivi SY0-701), sigle, ortografia americana per i contenuti in inglese e traduzioni approvate, verificati da `tests/styleGuide.test.ts`.

1. **Modifica entrambe le lingue nella stessa pull request.** I test verificano che ogni frase italiana e la sua traduzione riportino gli stessi numeri, sigle e token letterali (`tests/languageParity.test.ts`). Se una differenza è solo idiomatica, aggiungila all'elenco revisionato di quel test con una riga di motivazione. Una modifica al testo italiano fa anche elencare a `tests/translationFreshness.test.ts` le traduzioni inglesi da rileggere; quando le hai aggiornate o confermate, esegui `UPDATE_TRANSLATION_SOURCES=1 npx vitest run tests/translationFreshness.test.ts` e includi il file nel commit.
2. **Una nuova domanda** richiede: uno scenario, da 2 a 6 opzioni, l'`answerIndex` corretto (e `answerIndexes` per le domande "scegli DUE") e una spiegazione che nomini le opzioni corrette e discuta **ogni** opzione errata. `tests/dataset.test.ts` impone tutto questo. Il suo `topic` deve essere collegato agli obiettivi SY0-701 in `src/questionObjectives.ts` (un topic nuovo richiede una nuova voce); poi esegui `npm run coverage-matrix` e includi nel commit `docs/coverage-matrix.md` aggiornato.
3. **Cita la fonte** per affermazioni normative, numeri che cambiano nel tempo e consigli di configurazione: obiettivi ufficiali CompTIA, NIST, RFC, OWASP, CIS o documentazione dei produttori.
4. **Separa teoria d'esame e pratica**: indica quando l'esame semplifica qualcosa che nella realtà funziona diversamente.
5. Comandi ed esempi devono essere sicuri da copiare: nessuna credenziale reale, nessun comando distruttivo senza avvertenza, nessun bersaglio che non si è autorizzati a testare. I nomi di host sono riservati (`example.com`, `*.example`, `*.test`) e le aziende sono di fantasia; `tests/contentSafety.test.ts` lo verifica.
6. **Mantenere le fonti degli obiettivi.** Allinea la mappatura in `src/contentReview.ts` ai contenuti ed esegui `npm run coverage-matrix`. Non sono richieste approvazioni umane o un secondo revisore; tutti i controlli automatici obbligatori devono riuscire.
7. **Callout.** Un punto elenco che inizia con un'etichetta standard diventa un riquadro con titolo e icona propri: `* **Trappola d'esame:** …` / `* **Exam trap:** …` (esame), `* **Piccolo Esempio Concentrato:** …` / `* **Focused Mini-Example:** …` (pratica), `* **Pericolo:** …` / `* **Danger:** …` (attenzione), `* **Da ricordare:** …` / `* **Remember:** …` (nota), `* **Il concetto, dal principio:** …` / `* **The concept, from first principles:** …` (approfondimento, anche per criterio, principio, problema e distinzione). Gli errori comuni delle guide di dominio compaiono come callout «Errore comune». L'elenco completo è `LABEL_CALLOUTS` in `src/components/Callout.tsx`; usa esattamente queste etichette, in entrambe le lingue, perché il riquadro compaia in tutte e due.
8. **Nessuna emoji come unico segnale.** L'app non usa emoji: un avviso è una parola («Attenzione:», un callout) o un'icona di `lucide-react` con `aria-hidden` accanto al testo; una risposta giusta lo dice a parole, non solo in verde. Nella documentazione un'emoji di stato è seguita da parole (`✅ mitigato`), mai da sola in una cella di tabella. `tests/emojiCues.test.ts` verifica entrambe le regole.
9. **Link e immagini.** Un link dice dove porta (`[Regole di isolamento](labs/README.md)`, non `[qui](…)` o `[EN](…)`); un'immagine ha un testo alternativo di almeno due parole che dice che cosa mostra; un diagramma è seguito da una **Versione testuale** (un elenco o una tabella con le stesse informazioni). `tests/linkText.test.ts` lo verifica.

### Nomi e identificatori

- **File:** documenti e lab in `kebab-case` (`docs/threat-model.md`, `labs/01-security-headers/`, ADR come `docs/adr/NNNN-titolo.md`); componenti React in `PascalCase` (`DomainGuidePanel.tsx`); hook come `useQualcosa.ts`; gli altri moduli in `camelCase` (`contentReview.ts`); script in `kebab-case`.
- **Gli identificatori sono per sempre.** Ciò che gli studenti salvano nel browser punta agli ID delle domande (con namespace `dominio × 10000 + id`) e alle `checklistKey` delle sottovoci. Non rinominarli né riusarli: una nuova domanda riceve un nuovo ID, e un contenuto superato si marca come deprecato invece di cancellarlo. `tests/fixtures/stable-ids.json` registra ogni identificatore pubblicato e `tests/conventions.test.ts` fallisce se uno sparisce. Dopo aver aggiunto domande, sottovoci o lab, registrali con `UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts` e includi il file nel commit.
- **Deprecare un contenuto.** Per ritirare una domanda o una sottovoce, aggiungi `deprecated: { since: "AAAA-MM-GG", reason: "perché è superata e che cosa la sostituisce" }` in `src/data.ts`, poi esegui `npm run coverage-matrix`. Resta nel dataset, quindi il suo ID continua a esistere, ma l'app non la mostra, non la estrae nei quiz e non la conta; `tests/deprecation.test.ts` richiede la data e una motivazione vera.

### Modificare il codice

- Pull request piccole e focalizzate; non mescolare refactoring e nuovi comportamenti.
- Ogni nuovo input va validato e limitato lato server.
- Mai mostrare testo di utenti o dell'AI con `innerHTML` o `dangerouslySetInnerHTML`.
- I dati salvati in `localStorage` devono restare compatibili, oppure servono una migrazione e un test: aumenta `STORAGE_SCHEMA_VERSION` in `src/storage.ts`, aggiungi il passo in `STORAGE_MIGRATIONS` e un test in `tests/storage.test.ts`. `migrateStorage()` lo esegue una sola volta all'avvio.
- Le nuove interazioni devono funzionare da tastiera e avere etichette in entrambe le lingue.
- Una nuova dipendenza richiede una motivazione, una licenza compatibile con MIT e un manutentore attivo.

### Aggiornamento delle dipendenze

Dependabot apre le pull request di aggiornamento ogni lunedì, dopo un'attesa di 7 giorni sulle nuove versioni.

| Tipo di aggiornamento | Scadenza | Come |
|---|---|---|
| Correzione di sicurezza | 48 ore | Integrare quando CI e smoke test sono verdi |
| Minor e patch (raggruppati) | 7 giorni | Integrare quando CI e smoke test sono verdi |
| Versione principale | Pull request dedicata | Leggere il changelog, eseguire `npm run build && npm run smoke`, verificare a mano l'area coinvolta |

Per una versione principale la CI verde non basta: Express 5, per esempio, compilava e superava tutti i test ma non partiva in produzione finché non è stata cambiata la rotta della SPA. È esattamente ciò che `npm run smoke` intercetta.

### Commit e pull request

- Messaggi di commit: un oggetto breve all'imperativo (`fix(server): ...`, `feat(guides): ...`, `docs: ...`), poi il *perché* della modifica.
- Compila il modello della pull request, compreso come hai verificato la modifica.
- Aggiorna [`CHANGELOG.md`](CHANGELOG.md) nella sezione *Unreleased* e, quando una voce cambia stato, [`ROADMAP.md`](ROADMAP.md).

Italian vocabulary / Vocabolario italiano: [policy and scope / politica e perimetro](docs/italian-spelling.md).
