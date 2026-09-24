# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html): content fixes are patches, new questions or sections are minor versions, changes to the saved-progress format or to the exam syllabus are major versions.

History before 2026-09-24 is reconstructed from the git log and grouped by theme rather than by release.

## [Unreleased]

### Added

- Production start-up smoke test (`npm run smoke`), also run by CI: starts the built server with `NODE_ENV=production` and checks the app shell, security headers, SPA fallback, `/healthz`, API input validation, the AI budget and a clean exit on `SIGTERM`.
- `.github/workflows/security.yml`: gitleaks secret scan over the full history (with `.gitleaks.toml`), `npm audit` of production dependencies, dependency review on pull requests and CodeQL (`security-extended`).
- Daily cap on AI calls across all clients (`AI_DAILY_LIMIT`, default 500, `0` turns the AI off), a timeout on every Gemini call (`GEMINI_TIMEOUT_MS`, default 30 s), a 2048-token cap on chat answers, `GET /healthz` and graceful shutdown.
- Enriched guides for all five domains, in Italian and English: every official SY0-701 sub-topic per objective, 30 comparison tables, 40 common traps and 33 guided exercises with the reasoning hidden until requested.
- Automatic IT/EN content parity check: every sentence and its translation must carry the same numbers, acronyms and literal tokens (7,979 sentence pairs plus all guides).
- Dependabot for npm and GitHub Actions, with a 7-day cooldown and grouped minor/patch updates.
- `CONTRIBUTING.md`, issue forms, a pull request template and `CODEOWNERS`.

### Changed

- CI runs on Node 22 and 24 (Node 20 is end-of-life); `.nvmrc` pins 24 and `package.json` declares the supported engines.
- The package is now `comptia-security-sy0-701` version `1.0.0` instead of the template's `react-example` `0.0.0`.
- GitHub Actions are pinned to commit SHAs, and a test rejects unpinned ones.
- `vite.config.ts` uses `import.meta.dirname` (ready for Vite 8) and a chunk-size limit that matches the real dataset size.
- The roadmap reflects the audited state of the application.

### Fixed

- The study area collapsed to zero height on phones; it now fills the screen below the checklist.
- The SPA fallback route and the API body handling now work on both Express 4 and 5 (Express 5 refused to start with `app.get("*")` and answered 502 instead of 400 to requests without a body).
- Nine IT/EN content drifts, among them WPA/TKIP vs WPA2/WPA3, Control Plane/SDN and a missing IBAN.
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
