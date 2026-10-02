# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html): content fixes are patches, new questions or sections are minor versions, changes to the saved-progress format or to the exam syllabus are major versions.

History before 2026-09-24 is reconstructed from the git log and grouped by theme rather than by release.

## [Unreleased]

- Added Vercel static frontend/serverless API deployment artifacts, preview AI isolation and a dedicated CI smoke test; live project activation is pending.

- Removed mandatory human-review metadata and second-reviewer requirements; retained sources and mandatory CI.
- Standardized email spelling in both languages and improved comparative-table readability and accessibility.

### Content quality / Qualità dei contenuti — 2026-10-02

- AI-assisted Domain 1 report; six bilingual fixes (wildcards, block modes,
  vestibules, non-repudiation, signatures, CRL/OCSP). Human sign-off remains pending.
- Italian spelling of the full study corpus using MIT project vocabulary,
  without new dependencies or license policy changes; English checked separately.
- Rapporto assistito dall’AI sul Dominio 1, sei correzioni IT/EN; revisione umana
  ancora aperta. Ortografia italiana del corpus con lessico MIT del progetto.

### Added

- Lab 11, three sensors and one incident: the SSH brute force from Lab 03 seen through synthetic network flows, identity events and endpoint process and file events. The learner queries each source with `jq`, finds what it sees and what it misses (no usernames in encrypted flows, no failed attempts on the endpoint), merges the three into one normalized SIEM timeline and writes a correlation rule that raises a single alert carrying the persistence commands. A deterministic generator recreates the data, and `tests/labData.test.ts` recomputes the expected output. The preflight knows Lab 11.
- Lab 10, from trace to defense: recorded, synthetic traces of a reconnaissance run for exposed files and a successful credential stuffing run followed by a data export, with no attack carried out. The learner writes two detection rules (the sign-in alert fires thirty seconds before the takeover), an nginx prevention configuration tested locally on `127.0.0.1:8090` (sensitive files refused, sign-ins limited to 5 a minute with `429` from the fifth attempt) and the response playbook. A deterministic generator recreates the traces, and `tests/labData.test.ts` recomputes the expected output, alert time included. The preflight knows Lab 10.
- Progressive help in every lab, 01 to 09, in Italian and English: a "Hints and solution" section between the exercise and the evidence, with at least three concrete success indicators, two folded hints and a folded worked solution from the vaguest to the full answer, and at least three common mistakes with their consequence. The section is in the template, and `tests/labs.test.ts` checks its three parts, the order of the folds and the same number of items in both languages.
- A preflight for the labs (`bash labs/preflight.sh NN`, documented in `labs/README.md`): before a lab it checks the tools it uses, disk and memory, that its ports are free, the services listening beyond loopback and, above the `low` risk level, that it runs in a virtual machine with no default route. It only reads local state and speaks Italian or English (`--en`). `tests/preflight.test.ts` runs it in every scenario with stand-in tools and substituted readings.
- A catalog of the labs' synthetic data (`labs/DATI.md`): every dataset with its SHA-256 and the rules it follows (private or documentation addresses, reserved domains, no email, declared fake secrets). The Lab 03 log now ships with a deterministic generator that recreates it byte for byte. `tests/labData.test.ts` checks the hashes in the catalog and in each lab's Setup, regenerates the log, refuses real addresses, domains and emails, and recomputes from the data the figures shown in the expected output of Labs 03 and 06.
- Versioned release workflow: validates the tag against the package version, dated changelog notes and main ancestry; runs checks, production audit, build and smoke before creating a draft with the application archive, production CycloneDX SBOM and SHA-256 checksums. Bilingual instructions in `docs/releases.md`; no release is published automatically.

- Three moderate-risk defensive labs, run in an Ubuntu 24.04 virtual machine with a snapshot, each with real command output: Linux hardening with an SSH baseline in `sshd_config.d`, a SUID binary removed through `dpkg-statoverride` and an nftables drop-policy firewall tested from a network namespace (Lab 07); identity and access with a setgid shared folder, a read-only ACL, `sudo` limited to one command, password expiry, an employee leaving and an access review (Lab 08); segmentation of offices, servers and guests behind an nftables router built from network namespaces, from a flat network to an allow list that blocks lateral movement (Lab 09). The introductory defensive labs roadmap item is complete.
- Four introductory defensive labs, in Italian and English, each with the real output of the commands as the author ran them: finding a successful brute force and a password spraying run in a synthetic `auth.log` with `grep` and `awk` (Lab 03); a small PKI with OpenSSL, from CSR to CRL (Lab 04); full and incremental backups with `tar`, a SHA-256 manifest and a restore test (Lab 05); triage of twelve SIEM alerts with `jq`, where correlation beats an automatic score (Lab 06). The synthetic data sits in `labs/NN/data/` with its hash; all four labs are `low` risk.
- A focused practical example for every concept: the 141 concepts of Domains 3, 4 and 5 that had none now end with a «Piccolo Esempio Concentrato» and its English «Focused Mini-Example», with the same figures and acronyms in both languages, fictional company names and documentation-range addresses. The gap analysis lists 0 of 562 concepts without an example, and a new concept without one fails the tests.
- Core content and deepenings, with one pattern of progressive disclosure (`docs/style-guide.md`). The core of a concept (definition, analysis with its example, formulas, comparison table, exam tip) and of a guide stays open. Deepenings open on request and say what they hold: cross-domain connections, key comparisons, exam vs practice and sources in the guides, cited sources and glossary terms in the concepts, the full objective table in exam readiness. A single `Disclosure` component draws deepenings and exercise answers; the guide's table of contents opens the deepening it jumps to, and a test refuses new hand-written `<details>` outside the first-level panels.
- End-of-module summaries: every domain guide ends with six key points, the domain's acronyms with their official English expansion (10 to 16 per domain), the correct reading of the frequent mistakes, and a self-assessment of checkboxes that replaces the old mastery check. Ticks stay in the browser, are removed by "Delete all my data" and travel in the progress backup, whose format version is unchanged: an older backup imports with nothing ticked.
- Attack, controls and detection in the guide scenarios: the 12 scenarios that describe an attack (Domains 1 to 4) state the vector, the impact, the mitigation, the evidence that reveals it and the limit of the control, in both languages. The chain appears after the reasoning, so it stays folded with it in the guided exercises. `tests/domainGuides.test.ts` lists the attack scenarios and refuses an incomplete chain.
- Component tests for the quiz and the language switch: the question screen with the real session and language provider (radio and checkbox roles, confirm only after a pick, the verdict in words and in the live announcement, switching language mid-run without losing the question or the answer), and the header language buttons (pressed state, document language, remembered choice).
- English spell check (`npm run spellcheck`, in `npm run check` and CI): cspell 10.3.3 on the 1,740 English texts, each unknown word reported with the text it belongs to, and a reviewed project dictionary of 316 terms. It found 36 more British spellings, now American. The Italian check is left out: the only Italian cspell dictionaries are GPL-3.0. One development-only dependency (`@cspell/dict-en-common-misspellings`, CC BY-SA 4.0) is allowed by name in Dependency review, and a test keeps it development-only.
- Lab isolation and recovery for labs above the `low` risk level (`labs/README.md`): an isolated virtual network and a snapshot taken before and restored after, with the commands for VirtualBox, libvirt/KVM and Hyper-V. Isolation is checked with an empty `ip route show default`, never by contacting an outside site. `tests/labs.test.ts` requires the snapshot in the Setup of a `moderate` lab, and for `advanced-controlled` also the route check and the restore in the Cleanup.
- Verifiable citations for single statements: the 50 concepts that name a law, a standard or a scoring system cite it (`src/citations.ts`), with the article when the text states a precise rule (GDPR Art. 3(2), 17, 33, 34, 37–39, 44–49, 58, 83(5)). Each concept lists its "Cited sources" with links; the URLs are in `docs/gap-analysis.md` for the weekly link check. Six documents joined the source catalogue (NIST SP 800-37, 800-56A, 800-63B, 800-88, HIPAA, SOC 2). `tests/citations.test.ts` refuses a concept that names a document without citing it.

- Gap analysis (`docs/gap-analysis.md`, `npm run gap-analysis`): the concepts without a practical example and the legal figures without a source. Thirteen concepts of Domains 1 and 2 got an example in both languages, so those domains have none left; 141 remain in Domains 3 to 5. `tests/gapAnalysis.test.ts` refuses a new concept without an example and lets the list only shrink.
- Stable links to the study content: `#studio/4/CVE` opens that concept (domain, concept and focus on its title), `#guida/1/1.4` that objective of a guide; each concept has a "permanent link" button. Links use the stable identifiers, so they work in both languages and survive edits; the hash is validated strictly and never written into the page. Concept analyses are limited to 400 words (the longest is 366).
- Run-time schema of the study content (`src/contentSchema.ts`, zod, not in the browser bundle): the contract of the types plus the rules they cannot express (answer inside the options, consistent multiple answers, no unknown field, ISO dates, rectangular tables). `tests/contentSchema.test.ts` validates every dataset in both languages. [ADR 0005](docs/adr/0005-formato-dei-dataset.md) records the evaluation of JSON or YAML datasets: they stay in TypeScript until there is a reason to move, and the schema makes the move mechanical.
- One definition per concept: the 10 concepts defined twice in two domains (least privilege, hashing, encryption, CVE, CVSS, false positive and negative, insider threat, penetration test, rules of engagement) now have their definition written once, in a canonical entry (`src/canonicalTerms.ts`); the other domain keeps its own analysis and exam tip and shows the shared definition. The glossary lists each concept once, with "Also studied in", and moves bookmarks on a duplicate to the canonical entry. Homonyms with different meanings (Zero Trust and SDN planes, Recovery, Reporting, PBQ scenarios) are declared with a reason; `tests/canonicalTerms.test.ts` refuses a new repeated name that is neither linked nor declared.

- Licence check on pull requests: Dependency review now also fails on a licence outside an allow-list of the licences already in use, all compatible with MIT (no GPL, LGPL, AGPL or SSPL); a test keeps the list and `package-lock.json` in step.
- The SIL Open Font License notices of the bundled fonts (Inter, JetBrains Mono) now ship with the app in `public/licenses/`, as the licence requires.
- Translations to review after a change: `tests/translationFreshness.test.ts` keeps a fingerprint of the Italian text each English translation was made from and lists the translations to reread when the Italian changes (questions, concepts, groups and guide sections, 1,348 units).
- Deprecation of content: questions and concepts accept `deprecated: { since, reason }`. They stay in the dataset, so the ids learners' progress points to keep existing, but are no longer shown, drawn in quizzes or counted (coverage matrix included). `tests/deprecation.test.ts` requires the date and a reason; `CONTRIBUTING.md` describes the process.
- `CODE_OF_CONDUCT.md` in Italian and English: expected behaviour, what is not acceptable (including help to attack third-party systems) and how to report; linked from `CONTRIBUTING.md`. A test keeps the community and governance files in place.
- `docs/content-templates.md`: the templates of concepts, comparisons, procedures, commands, questions, scenarios and labs, each with its rules and the test that enforces it; `tests/contentTemplates.test.ts` checks the concept template in both languages.
- `docs/quality-baseline.md`: measured baseline of the question bank, tests, `npm audit` and Lighthouse (mobile and desktop), with the commands to repeat each measure.
- The build writes Brotli and gzip copies of the front end (`scripts/precompress.ts`, no new dependency) and the server sends the one the browser accepts; hashed files under `/assets` are cached for a year. A visit now transfers 1.35 MB instead of 5.4 MB.
- Naming conventions and stable identifiers, written in `CONTRIBUTING.md` and checked by `tests/conventions.test.ts`: every question id, concept key, objective code and lab ever published is recorded in `tests/fixtures/stable-ids.json`, so a change that would orphan the progress saved in learners' browsers fails the tests.
- "Exam and real world" in every domain guide: three topics per domain where the exam simplifies (control categories, Zero Trust, vulnerability priorities, SIEM, quantitative risk, compliance…), each with what the exam expects and how it works in practice.
- Standard callouts (note, exam, practice, warning, common mistake, deep dive), each with its own icon and a written title. In explanations, the recurring "Exam trap" and "Focused Mini-Example" paragraphs (and a few other labels) now show as callouts, with no change to the datasets; the exam tip of every concept uses the same component. `CONTRIBUTING.md` lists the labels.
- Every domain guide opens with "In this guide": a link to each section the guide has, which jumps there and moves focus to the section heading, opening "Sources and review" when it is folded.
- Hands-on labs in `labs/`: rules of engagement, three risk levels, isolation and cleanup rules, and a standard template, all enforced by `tests/labs.test.ts`. Lab 01 (Italian and English) has the learner read this app's security headers, watch the CSP block an injected script and trip the API rate limit, all on `127.0.0.1`. Lab 02 starts from the threat model, shows how the server neutralises prompt injection, switches the defence off to watch the tests fail and lets the learner try an attack of their own, with no API key.
- `HOST` environment variable: the interface the server listens on (default `0.0.0.0`); `HOST=127.0.0.1` keeps a local run out of reach of the network.
- Four new questions for objective 4.7 (automation and orchestration), which had almost only comprehension questions: automatic disabling of access on termination, escalation instead of automatic isolation on critical hosts, scanner-to-ticketing integration through APIs, and employee retention. In Italian and English.
- Five new questions for objective 5.6 (security awareness), on the sub-topics that had none: removable media and cables, hybrid and remote work, password management, reporting and monitoring of the programme, and unintentional behaviour. In Italian and English.
- Four new questions for objective 2.3 (vulnerability types), on the official sub-topics that had none: memory injection, resource reuse in virtualisation, the service-provider side of the supply chain, and cryptographic vulnerabilities (obsolete TLS versions and ciphers). In Italian and English.
- Five new questions for objective 1.1 (security control categories and types), which had the fewest: a physical control, a purely detective control, one measure with two types at once, a compensating control for separation of duties, and a multi-response question on managerial controls. In Italian and English.
- `docs/errata.md`: the substantive content errors already fixed, by domain, with what the text said, what it says now and the commit of the fix, reconstructed from the git history and linked from the READMEs.
- Sources and review state for every SY0-701 objective (`src/contentReview.ts`): the exam objectives plus at least one more primary source (NIST, RFC, ISO, GDPR, PCI DSS) and secondary references (OWASP, CIS, MITRE ATT&CK, CISA, FIRST). Each domain guide has a "Sources and review" section and the coverage matrix two new columns plus the source catalogue, whose links the weekly link check verifies. All objectives start as "needs review"; the tests refuse "reviewed" without a date and a reviewer, and `CONTRIBUTING.md` describes the review.
- "Exam readiness" panel at the top of the simulator, worked out from the progress saved in the browser: accuracy and coverage weighted by the official domain weights (kept apart, since high accuracy on few questions is not readiness), progress per domain with due reviews, the weakest objectives with a button to train each one, objectives never trained, and the questions available for each of the 28 objectives.
- Every domain guide opens with "Before you start" and closes with "Where to go next": what to know before the domain and where to continue, with a button that jumps to the linked objective in another domain's guide. Domain 1 lists the networking and operating system basics it assumes; Domain 5 ends with the exam simulation, the smart review and the objective quiz. Tests keep the links to official objectives, in syllabus order and identical in both languages.
- Container image scan with Grype in the security workflow: it fails on high or critical vulnerabilities that have a fix and reports them in the Security tab. On its first run it found fixed high-severity vulnerabilities in the distroless Node image, which ships Node 24.14.0: the runtime is now `distroless/cc-debian12` with the Node 24.21.0 binary of the build stage. Six CVEs of the base image's system `libssl3` are ignored one by one in `.grype.yaml`: Node bundles its own OpenSSL and never loads that library, which CI checks on every run.
- A hardened `Dockerfile` for self-hosting: multi-stage, distroless runtime without a shell, non-root user, base images pinned by digest (updated by Dependabot), health check, and a server bundle that needs no `node_modules`. CI builds it and runs it with `--read-only`, `--cap-drop=ALL` and `no-new-privileges`.
- "Glossary terms mentioned": after an answer, and under each concept, the glossary acronyms in the text (SIEM, ZTA, TACACS+, ...) open their definition and exam tip in place.
- The progress saved in the browser has a format version, and `migrateStorage()` upgrades data from older versions once at start-up, so future format changes keep existing progress.
- After an objective quiz, a button opens the domain guide at that objective's outcome and official sub-topics.
- OpenSSF Scorecard workflow with a badge in both READMEs, and a CycloneDX SBOM of the production dependencies saved with every security run.
- "Where do I start?" panel with four study paths (beginner, quick refresh, exam preparation, hands-on consolidation). Each step can jump to the right part of the app; the exam path sets up a 90-question simulation split by the official domain weights, with the timer on.
- "Objective only" quiz in the simulator: choose one of the 28 official SY0-701 objectives, see how many questions train it, and practise all of them, in Italian or English.
- Production start-up smoke test (`npm run smoke`), also run by CI: starts the built server with `NODE_ENV=production` and checks the app shell, security headers, SPA fallback, `/healthz`, API input validation, the AI budget and a clean exit on `SIGTERM`.
- `.github/workflows/security.yml`: gitleaks secret scan over the full history (with `.gitleaks.toml`), `npm audit` of production dependencies, dependency review on pull requests and CodeQL (`security-extended`).
- Daily cap on AI calls across all clients (`AI_DAILY_LIMIT`, default 500, `0` turns the AI off), a timeout on every Gemini call (`GEMINI_TIMEOUT_MS`, default 30 s), a 2048-token cap on chat answers, `GET /healthz` and graceful shutdown.
- Enriched guides for all five domains, in Italian and English: every official SY0-701 sub-topic per objective, 30 comparison tables, 40 common traps and 33 guided exercises with the reasoning hidden until requested.
- Automatic IT/EN content parity check: every sentence and its translation must carry the same numbers, acronyms and literal tokens (7,979 sentence pairs plus all guides).
- Dependabot for npm and GitHub Actions, with a 7-day cooldown and grouped minor/patch updates.
- `CONTRIBUTING.md`, issue forms, a pull request template and `CODEOWNERS`.
- Every question linked to its official objectives (`src/questionObjectives.ts`) and a generated coverage matrix in `docs/coverage-matrix.md`, checked by CI.
- End-to-end tests with Playwright and axe at phone and desktop width (`npm run e2e`), also run by CI.
- "Your data" section in the simulator: export the progress to a JSON file, import it with confirmation, or delete everything stored in this browser.
- The quiz announces whether an answer was right to screen readers, and animations follow the system "reduce motion" setting.
- The AI Trainer always shows that answers can be wrong and must not contain personal data; AI-generated remediation questions are labelled as unreviewed.
- The optional exam timer warns screen-reader users when one minute is left.
- Structured JSON logs (`server/log.ts`): start-up configuration, every API request with path, status and duration, and failed Gemini calls with keys redacted. They never contain what the learner wrote, IP addresses or keys.
- `docs/threat-model.md` (STRIDE analysis with controls, tests and residual risks) and `docs/adr/` with four architecture decision records.
- `.github/workflows/docs.yml`: Markdown lint (`npm run lint:md`, also part of `npm run check`) and link checking with lychee: internal links and anchors on every change, external links weekly.

### Changed

- All six callouts are now used: the common traps of the domain guides are "common mistake" callouts, and explanations that go back to first principles are "deep dive" callouts. The English warning "no replication is a backup" was a plain note while the Italian was a warning callout; both are warnings now.
- Style guide (`docs/style-guide.md`): tone, the terminology of the SY0-701 objectives, acronyms, capitalisation, numbers and approved translations. The content now says *allow list* and *deny list* instead of whitelist and blacklist, "sanitizzazione" instead of "sanificazione", and the English study content uses American spelling as the CompTIA objectives do (*behavior*, *organization*, *defense*). `tests/styleGuide.test.ts` applies the guide's tables to both languages.
- Descriptive links and image alternatives: the ADR index links each decision by its title instead of its number, the lab list says "versione inglese" instead of "EN", and the banner and badges of the READMEs say what they show in the file's language. `tests/linkText.test.ts` checks link texts, image alternatives, SVG names and a text version under any future diagram.
- No emoji as the only cue: the new-questions dialog says "Correct answer" in words instead of a green check mark alone, warnings use words or an icon hidden from screen readers instead of ⚠️, and the status emoji of the threat model and lab 02 are followed by what they mean. `tests/emojiCues.test.ts` enforces it.
- The Dockerfile no longer starts with `# syntax=docker/dockerfile:1`: that floating, unpinned frontend image was pulled from Docker Hub on every build (a registry outage failed two CI jobs on it), and BuildKit's built-in frontend covers every instruction used.
- Scenarios no longer involve real third parties: hostnames are reserved names (RFC 2606: `example.com`, `.example`, `.test`) and the company in the scenarios is the fictional Kestrelia instead of the real name of a training provider. `tests/contentSafety.test.ts` keeps real hostnames, commands that disable protections or destroy data, and credential-shaped strings out of the study content.
- `App.tsx` is down to 485 lines: its JSX is split into eight view components (`AppHeader`, `ChecklistSidebar`, `StudyContent`, `QuizSetupScreen`, `QuizQuestionScreen`, `QuizResultsScreen`, `RemediationScreen`, `NewQuestionsModal`), and it now only wires the hooks to the views. The rendered HTML is identical in 72 deterministic states.
- The simulator set-up moved out of `App.tsx` into the `useQuizSetup` hook: presets, questions per domain, chosen objective and the random draw. 40 deterministic states are identical, including the random order of the drawn questions; 4 hook tests.
- The study area state moved out of `App.tsx` into the `useStudySession` hook: domain, selected concept and saved checklist. The selected concept is kept by key and looked up in the active language, which removes the last effect that set state on a language switch. HTML and saved checklist are identical in 23 deterministic states; 4 hook tests.
- The adaptive remediation moved out of `App.tsx` into the `useRemediation` hook, with 5 hook tests; HTML, API requests and saved progress are identical in 27 deterministic states.
- The simulator run moved out of `App.tsx` into the `useQuizSession` hook: questions, answers, score, exam timer, review, history and saved progress. The questions follow the language as derived state instead of an effect, and the timer ends the run from its own callback. HTML and saved progress are identical in 15 deterministic states; 6 hook tests cover the run, the timer expiry and pause, and the language switch.
- The AI Trainer moved out of `App.tsx` into `AiTrainerPanel`, the `useAiChat` hook and a `MarkdownText` component, with 7 component tests; the rendered HTML is byte-for-byte identical in 8 states. The checklist progress is now read on the first render instead of in an effect.
- Main menu on phones and tablets: the four sections (Study, Glossary, Simulator, AI Trainer) are equal columns with an icon and a short label, all visible without scrolling the menu sideways; the language switch sits next to the title. The "S+" logo is replaced by a shield icon, the same one as the new favicon, now also served as `favicon.ico`, iOS home-screen icon and web app manifest icons. Before, `/favicon.ico` answered with the app page.
- CI checks test coverage of the pure logic and the server (`npm run test:coverage`) against minimum thresholds; the browser storage helpers are now fully tested.
- The exam timer follows the real SY0-701 pace: 1 minute per question, so the 90-question simulation lasts 90 minutes (it was 2 minutes per question).
- Dependencies: Express 4 → 5.2.1, Vite 6 → 8.3.0 with `@vitejs/plugin-react` 6.1.1, `motion` 12 → 13.4.0, React 19.3, esbuild 0.28 and the other minor/patch updates proposed by Dependabot; `actions/checkout` v7.0.1 and `actions/setup-node` v7.0.0. Every package in the lockfile, direct or indirect, was published at least 7 days earlier.
- CI runs on Node 22 and 24 (Node 20 is end-of-life); `.nvmrc` pins 24 and `package.json` declares the supported engines.
- The package is now `comptia-security-sy0-701` version `1.0.0` instead of the template's `react-example` `0.0.0`.
- GitHub Actions are pinned to commit SHAs, and a test rejects unpinned ones.
- `vite.config.ts` uses `import.meta.dirname` (ready for Vite 8) and a chunk-size limit that matches the real dataset size.
- The roadmap reflects the audited state of the application.

### Security

- The API contract is a declarative schema shared by server and browser (`src/apiSchemas.ts`, Zod 4 with the tree-shakable `zod/mini`, about 7 kB gzipped). The server validates requests and the model output with it; the browser validates every answer from the server and drops one of the wrong shape. Status codes stay the same; topic labels that are not text are now refused with 400. The browser also sends the chat history already cut to the server limits, so a long conversation no longer risks exceeding the 64 kB body limit.
- Prompt injection hardening (OWASP LLM01): every text from the browser enters the Gemini prompts inside a data tag that the text cannot close, even with disguised tags (other case, spaces, full-width brackets, invisible characters), and the rules say tagged text is data. A suite of 11 known attacks checks it, and an end-to-end test checks that HTML, scripts and `javascript:` links in an AI answer are shown as text and never run.
- Optional access code for the AI features (`AI_ACCESS_TOKEN`). When it is set, the AI endpoints answer only requests with the right `X-Access-Token`: the code is compared in constant time, wrong guesses count against the rate limit, and it never appears in the logs. The app asks for the code in the AI Trainer and keeps it only for the current tab.
- `TRUST_PROXY` sets how many reverse proxies the rate limit trusts (default 1). With `0`, a server that clients reach directly can no longer be tricked by a made-up `X-Forwarded-For` header into giving a fresh quota to every request.
- The Content-Security-Policy allows styles, fonts and scripts from the app itself only: no `'unsafe-inline'`, no Google Fonts, plus `base-uri 'self'` and `form-action 'self'`. The fonts are bundled (Fontsource, SIL OFL 1.1), so no visitor's IP address reaches a third party. An end-to-end test fails on any policy violation or third-party request.

### Fixed

- The weekly full-history secret scan failed on three identifiers (a `localStorage` key name, a checklist key, a text fingerprint): gitleaks-action installed gitleaks 8.24.3, which silently ignores the top-level `[[allowlists]]` of `.gitleaks.toml` (supported from 8.25.0). The workflow now pins gitleaks 8.30.1; reproduced locally with both versions, and a real-looking key is still detected. A test keeps the pin.
- GDPR figures now cite their article and say it right: fines up to 20 million euros or 4% of worldwide turnover, whichever is higher (Art. 83(5)); breach notification to the supervisory authority within 72 hours (Art. 33) and to data subjects without undue delay when the risk is high (Art. 34), where the text had applied the 72 hours to customers too.
- Three comparison tables (risk appetite, due diligence, barcode and RFID) had an empty first header, announced without a name by screen readers; it now reads "Aspect".
- The AI Trainer panel, open on load, no longer grows from zero width and shifts the page (desktop CLS from 0.419 to 0.038).
- Checklist buttons are named by their visible text (WCAG 2.5.3 Label in Name), so voice-control users can activate them by saying what they see.
- `robots.txt` exists instead of returning the app page.
- Inline code in the study content (`` `ssh admin@host` ``, file names, record values) is shown as code instead of text with stray backticks, in explanations, concept details, exam tips, scenarios and options. The new-questions dialog renders its explanations like the quiz does, without raw `**` and backticks.
- Heading levels no longer skip a step, so screen-reader users navigating by headings find every section: the quiz and remediation question is an h2 (it followed the h1 directly as an h3), the AI Trainer and the new-questions dialog are h2, and the boxes of the results and of the readiness panel are h3. An end-to-end test walks every view.
- The SPF example included `spf.google.com`, which is not Google's SPF record (that is `_spf.google.com`); it now uses a reserved name.
- The adaptive remediation never showed its questions: the AI questions arrived, but the results screen stayed on top because the remediation starts from it. The results now give way to the remediation while it runs, and the 1-4 and Enter keys work there too. A new end-to-end test goes through the whole flow; it failed before the fix.
- The top of the simulator set-up could not be reached when the panel was taller than the screen, on phones and on short desktop windows: the vertical centring pushed it above the scroll origin.
- Jumping to an element (links, focus, the new "go to" buttons) no longer leaves it hidden under the sticky header on phones.
- The AI chat can be scrolled with the keyboard and announces new messages to screen readers (`role="log"`); the time under your own messages now has enough contrast.
- Right and wrong answers were shown by colour alone: options now say "Correct answer" and "Your answer" in words, and the answer review says "Correct", "Incorrect" or "Not answered" (WCAG 1.4.1).
- The study area collapsed to zero height on phones; it now fills the screen below the checklist.
- The SPA fallback route and the API body handling now work on both Express 4 and 5 (Express 5 refused to start with `app.get("*")` and answered 502 instead of 400 to requests without a body).
- Nine IT/EN content drifts, among them WPA/TKIP vs WPA2/WPA3, Control Plane/SDN and a missing IBAN.
- Five WCAG 2.2 AA violations found by axe, two critical: a tab list containing non-tab buttons, an unnamed chat button, nested checklist controls, 16 px touch targets, insufficient colour contrast and scrollable tables unreachable by keyboard.
- Checklist and bookmarks read from the browser are now sanitised; a malformed bookmarks entry could crash the glossary.
- The architecture section of both READMEs lists the current files (`server/`, `e2e/`, `scripts/`, `docs/`).
- `smol-toml`, used by the Markdown linter, is forced to 1.8.0 (GHSA-7w5x-hrqm-74c2).
- `src/data.ts` and `src/data.en.ts`, truncated by commit `9098ba5`, restored to their last intact version.

### Removed

- The `User-Agent: aistudio-build` header inherited from the AI Studio template.

## History before 2026-09-24

### 2026-09-17 to 2026-09-22 — Content quality and adaptive review

- Complete reading of the glossary (550 entries) and of the question bank, domain by domain, with technical and terminology corrections.
- Permanent tests for duplicated questions, empty scenarios, explanations of every wrong option and objective coverage within ±5% of the official weights.
- Denser coverage of objectives 4.9 and 5.5.
- Adaptive spaced review (1-3-7-14-30 days) and hardening of the progress saved in the browser.
- Applied scenarios in the domain guides.

### 2026-09-14 to 2026-09-15 — Content review and multi-response questions

- Removal of duplicated questions in all five domains and correction of technical errors found by full reading.
- Support for "choose TWO" multi-response questions.
- Visible disclaimer in the app: original study notes, not official CompTIA material.

### 2026-09-04 — API hardening and performance

- Unique question ids, a hardened API (`helmet`, rate limit, input limits) and a smaller initial bundle.

### 2026-07 to 2026-09-01 — First versions

- Bilingual study platform for the five SY0-701 domains: checklist, glossary, exam simulator and AI trainer.
- Bilingual README and security policy.
