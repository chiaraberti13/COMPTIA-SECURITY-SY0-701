# Contributing

Thank you for helping improve this study platform. Corrections to the study content are as valuable as code: a wrong fact taught to hundreds of learners is a real bug.

## Before you start

- **Security issues** go through [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new), never a public issue. See [`SECURITY.md`](SECURITY.md).
- For anything larger than a typo, open an issue first so the approach can be agreed.
- The study material must stay **original**: no questions copied from the real exam, from commercial question banks or from other courses.
- Everyone taking part follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## Local setup

Requirements: Node.js `22.13` or later (`24.x` recommended, see [`.nvmrc`](.nvmrc)) and npm `10` or later.

```bash
npm ci                    # exact dependencies from package-lock.json
cp .env.example .env      # GEMINI_API_KEY is only needed for the AI features
npm run dev               # http://localhost:3000
```

## Checks to run before a pull request

```bash
npm run check             # typecheck + lint (code and Markdown) + Italian/English spell check + all tests (CI runs the same)
npm run test:coverage     # the tests again, failing below the coverage thresholds of vitest.config.ts
npm run build             # production build
npm run smoke             # starts the built server in production mode and probes it
npm run e2e               # Playwright + axe at phone and desktop width (after build)
```

For `npm run e2e`, install Chromium once with `npx playwright install chromium`, or point `PW_CHROMIUM_PATH` to an existing Chromium.

Automated checks (axe, keyboard, the mobile viewport and the 200% zoom reflow) cannot replace a real assistive technology. Before a release, run the periodic manual accessibility pass in `docs/accessibility-manual-tests.md` (NVDA, VoiceOver, 200% zoom, a real phone) and record the result there.

`npm run spellcheck` checks Italian and English content separately with cspell and names the text that holds an unknown word: fix it, or add a real term (an acronym, a product, a fictional name) to `cspell/project-words.txt`.

CI runs these on Node 22 and 24, plus a separate security workflow (secret scan, `npm audit`, dependency review, CodeQL). A pull request is ready when all of them are green.

## Changing study content

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

## Naming and identifiers

- **Files:** documents and labs in `kebab-case` (`docs/threat-model.md`, `labs/01-security-headers/`, ADRs as `docs/adr/NNNN-title.md`); React components in `PascalCase` (`DomainGuidePanel.tsx`); hooks as `useSomething.ts`; other modules in `camelCase` (`contentReview.ts`); scripts in `kebab-case`.
- **Identifiers are forever.** What learners save in their browser points to question ids (namespaced as `domain × 10000 + id`) and to concept `checklistKey`s. Never rename or reuse one: a new question gets a new id, and outdated content is marked deprecated instead of being deleted. `tests/fixtures/stable-ids.json` records every published identifier and `tests/conventions.test.ts` fails if one disappears. After adding questions, concepts or labs, record them with `UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts` and commit the fixture.
- **Deprecating content.** To retire a question or a concept, add `deprecated: { since: "YYYY-MM-DD", reason: "why it is out of date, and what replaces it" }` to it in `src/data.ts`, then run `npm run coverage-matrix`. It stays in the dataset, so its id keeps existing, but the app no longer shows it, draws it in a quiz or counts it; `tests/deprecation.test.ts` requires the date and a real reason.

## Changing code

- Keep pull requests small and focused; do not mix refactoring with new behaviour.
- Validate and bound every new input on the server.
- Never render user or AI text with `innerHTML` or `dangerouslySetInnerHTML`.
- Data saved in `localStorage` must stay compatible, or ship with a tested migration: bump `STORAGE_SCHEMA_VERSION` in `src/storage.ts`, add the step to `STORAGE_MIGRATIONS` and a test to `tests/storage.test.ts`. `migrateStorage()` runs it once at start-up.
- New interactions must work with the keyboard and have labels in both languages.
- A new dependency needs a reason, a licence compatible with GPL-3.0 and an active maintainer.

## Dependency updates

Dependabot opens update pull requests every Monday, after a 7-day cooldown on new releases.

| Kind of update | Deadline | How |
|---|---|---|
| Security fix | 48 hours | Merge once CI and the smoke test are green |
| Minor and patch (grouped) | 7 days | Merge once CI and the smoke test are green |
| Major version | Dedicated pull request | Read the changelog, run `npm run build && npm run smoke`, check the affected area by hand |

A green CI is not enough for a major version: Express 5, for example, built and passed every test but refused to start in production until the SPA route was changed. That is what `npm run smoke` is for.

## Commits and pull requests

- Commit messages: a short imperative subject (`fix(server): ...`, `feat(guides): ...`, `docs: ...`), then *why* the change was needed.
- Fill in the pull request template, including how you verified the change.
- Update [`CHANGELOG.md`](CHANGELOG.md) under *Unreleased* and, when a roadmap item changes state, [`ROADMAP.md`](ROADMAP.md).

---

## Reporting and contribution checks

Use the [issue templates](https://github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/issues/new/choose) and check for duplicates first. Useful context: Browser, language, section, question or content identifier and app version.

Write community and technical documentation in English; maintain equivalent English and Italian READMEs. Preserve existing application translations. Fill in the pull request template with commands, results and checks not performed, including the reason. Use synthetic examples without secrets or personal data.

See [the code of conduct](CODE_OF_CONDUCT.md), [security policy](SECURITY.md) and [accessibility statement](ACCESSIBILITY.md). Report vulnerabilities only through the security policy process.
