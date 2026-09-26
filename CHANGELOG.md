# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html): content fixes are patches, new questions or sections are minor versions, changes to the saved-progress format or to the exam syllabus are major versions.

History before 2026-09-24 is reconstructed from the git log and grouped by theme rather than by release.

## [Unreleased]

### Added

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
