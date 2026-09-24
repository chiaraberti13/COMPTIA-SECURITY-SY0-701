# Contributing · Contribuire

<p align="center"><a href="#-english">🇬🇧 English</a> · <a href="#-italiano">🇮🇹 Italiano</a></p>

---

## 🇬🇧 English

Thank you for helping improve this study platform. Corrections to the study content are as valuable as code: a wrong fact taught to hundreds of learners is a real bug.

### Before you start

- **Security issues** go through [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new), never a public issue. See [`SECURITY.md`](SECURITY.md).
- For anything larger than a typo, open an issue first so the approach can be agreed.
- The study material must stay **original**: no questions copied from the real exam, from commercial question banks or from other courses.

### Local setup

Requirements: Node.js `22.13` or later (`24.x` recommended, see [`.nvmrc`](.nvmrc)) and npm `10` or later.

```bash
npm ci                    # exact dependencies from package-lock.json
cp .env.example .env      # GEMINI_API_KEY is only needed for the AI features
npm run dev               # http://localhost:3000
```

### Checks to run before a pull request

```bash
npm run check             # typecheck + lint + all tests (CI runs the same)
npm run build             # production build
npm run smoke             # starts the built server in production mode and probes it
```

CI runs these on Node 22 and 24, plus a separate security workflow (secret scan, `npm audit`, dependency review, CodeQL). A pull request is ready when all of them are green.

### Changing study content

The Italian text in `src/data.ts` is the source of truth; `src/data.en.ts` is the English overlay. Domain guides live in `src/domainGuides.ts`.

1. **Change both languages in the same pull request.** The tests check that every Italian sentence and its translation carry the same numbers, acronyms and literal tokens (`tests/languageParity.test.ts`). If a difference is only idiomatic, add it to the reviewed list in that test with a one-line reason.
2. **A new question** needs: a scenario, 2–6 options, the correct `answerIndex` (and `answerIndexes` for "choose TWO"), and an explanation that names the correct options and discusses **every** wrong one. `tests/dataset.test.ts` enforces all of this.
3. **Cite the source** for regulatory statements, numbers that change over time and configuration advice: official CompTIA objectives, NIST, RFCs, OWASP, CIS or vendor documentation.
4. **Separate exam theory from practice**: say when the exam simplifies something that works differently in real environments.
5. Commands and examples must be safe to copy: no real credentials, no destructive command without a warning, no targets you are not authorized to test.

### Changing code

- Keep pull requests small and focused; do not mix refactoring with new behaviour.
- Validate and bound every new input on the server.
- Never render user or AI text with `innerHTML` or `dangerouslySetInnerHTML`.
- Data saved in `localStorage` must stay compatible, or ship with a tested migration.
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

### Installazione locale

Requisiti: Node.js `22.13` o superiore (consigliata la `24.x`, vedi [`.nvmrc`](.nvmrc)) e npm `10` o superiore.

```bash
npm ci                    # dipendenze esatte da package-lock.json
cp .env.example .env      # GEMINI_API_KEY serve solo per le funzioni AI
npm run dev               # http://localhost:3000
```

### Controlli da eseguire prima di una pull request

```bash
npm run check             # typecheck + lint + tutti i test (la CI esegue gli stessi)
npm run build             # build di produzione
npm run smoke             # avvia il server compilato in modalità produzione e lo verifica
```

La CI li esegue su Node 22 e 24, insieme a un workflow di sicurezza separato (ricerca di segreti, `npm audit`, dependency review, CodeQL). Una pull request è pronta quando sono tutti verdi.

### Modificare i contenuti di studio

Il testo italiano in `src/data.ts` è la fonte di verità; `src/data.en.ts` è la sovrapposizione inglese. Le guide di dominio sono in `src/domainGuides.ts`.

1. **Modifica entrambe le lingue nella stessa pull request.** I test verificano che ogni frase italiana e la sua traduzione riportino gli stessi numeri, sigle e token letterali (`tests/languageParity.test.ts`). Se una differenza è solo idiomatica, aggiungila all'elenco revisionato di quel test con una riga di motivazione.
2. **Una nuova domanda** richiede: uno scenario, da 2 a 6 opzioni, l'`answerIndex` corretto (e `answerIndexes` per le domande "scegli DUE") e una spiegazione che nomini le opzioni corrette e discuta **ogni** opzione errata. `tests/dataset.test.ts` impone tutto questo.
3. **Cita la fonte** per affermazioni normative, numeri che cambiano nel tempo e consigli di configurazione: obiettivi ufficiali CompTIA, NIST, RFC, OWASP, CIS o documentazione dei produttori.
4. **Separa teoria d'esame e pratica**: indica quando l'esame semplifica qualcosa che nella realtà funziona diversamente.
5. Comandi ed esempi devono essere sicuri da copiare: nessuna credenziale reale, nessun comando distruttivo senza avvertenza, nessun bersaglio che non si è autorizzati a testare.

### Modificare il codice

- Pull request piccole e focalizzate; non mescolare refactoring e nuovi comportamenti.
- Ogni nuovo input va validato e limitato lato server.
- Mai mostrare testo di utenti o dell'AI con `innerHTML` o `dangerouslySetInnerHTML`.
- I dati salvati in `localStorage` devono restare compatibili, oppure servono una migrazione e un test.
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
