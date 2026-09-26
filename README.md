<p align="center">
  <img src="assets/banner.svg" alt="CompTIA-Security-SY0-701" width="100%">
</p>

<p align="center"><a href="README.md">🇬🇧 English</a> · <a href="README.it.md">🇮🇹 Italiano</a></p>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-F2C94C?style=flat-square" alt="Project status: active">
  <img src="https://img.shields.io/badge/category-LEARNING-22D3EE?style=flat-square" alt="LEARNING">
  <img src="https://img.shields.io/badge/stack-TypeScript-8B949E?style=flat-square" alt="TypeScript">
  <img src="https://img.shields.io/badge/languages-EN%20%7C%20IT-8B5CF6?style=flat-square" alt="English and Italian">
  <img src="https://img.shields.io/badge/licence-MIT-2EA043?style=flat-square" alt="MIT">
  <a href="https://scorecard.dev/viewer/?uri=github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701"><img src="https://api.scorecard.dev/projects/github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/badge?style=flat-square" alt="OpenSSF Scorecard"></a>
</p>

> A bilingual, hands-on study environment for CompTIA Security+ SY0-701, combining structured objectives, realistic scenarios and an AI-assisted cybersecurity trainer.

<p align="center"><a href="https://comp-tia-security-sy-0-701.vercel.app"><strong>Live demo</strong></a> · <a href="SECURITY.md">Security</a> · <a href="LICENSE">Licence</a> · <a href="https://github.com/chiaraberti13/CompTIA-Security-SY0-701/issues">Report an issue</a></p>

---

## Quick Navigation

- **[What this is](#what-this-is)** — The idea behind the trainer and how it's put together.
- **[Features](#features)** — Checklists, glossary, exam simulator, AI trainer.
- **[Prerequisites](#prerequisites)** — What you need installed before you start.
- **[Gemini API key](#gemini-api-key)** — How to get the free key the AI features use.
- **[Environment variables](#environment-variables)** — The `.env` file the app reads.
- **[Installation](#installation)** — Step-by-step for Linux, macOS and Windows.
- **[Scripts](#scripts)** — The npm commands and what each one does.
- **[Architecture](#architecture)** — Where the code lives in the repo.
- **[Troubleshooting](#troubleshooting)** — Fixes for the two errors you're most likely to hit.
- **[Licence](#licence)** — MIT for the code; CompTIA marks belong to their owners.

> [!TIP]
> **Found a mistake in a question or translation, or have a feature idea?** Open an [issue](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/issues) — bilingual, self-hosted and privacy-first is the only real requirement.

---

## What this is

A single self-hosted web app for preparing the **CompTIA Security+ SY0-701** exam. It runs
entirely on your own machine or server: the React frontend is served by a small Express
backend that also acts as a proxy to the Google Gemini API, so your API key stays
server-side and is never shipped to the browser.

Everything in the app is **bilingual**. Italian is the source of truth (`src/data.ts`) and
English is a keyed overlay (`src/data.en.ts`) that falls back to Italian for anything not
yet translated, wired together by `src/localizedData.ts` — all five domains' subtopics and
quiz questions are fully available in both languages.

The philosophy, shared with the rest of these repositories:

- **Self-hosted** — no third-party account for the app itself; clone it and run it.
- **Privacy-first** — your Gemini key lives in a local `.env` and is used only by your own
  server; nothing about your study data leaves your machine.
- **Free and open-source**, under the MIT licence.

## Features

- **Interactive SY0-701 checklist** — track your progress across all 5 official domains
  (General Security Concepts; Threats, Vulnerabilities & Mitigations; Security
  Architecture; Security Operations; Security Program Management & Oversight).
- **Comprehensive SY0-701 glossary** — instant search with filters by domain and category
  (acronyms, controls, attacks, metrics/formulas, governance), an A–Z index and bookmarks.
- **AI Senior Cybersecurity Trainer** — backed by the **Google Gemini API** for
  step-by-step explanations, concept comparisons and exam-metric clarifications
  (ALE, SLE, ARO, RTO, RPO, and more).
- **High-stakes exam simulator** — scenario-based, Analysis/Application-level questions
  with detailed rationale and distractor analysis.
- **AI remediation generator** — after a practice set, the AI dynamically generates
  targeted questions on the topics where you were weakest.
- **Privacy-first smart review** — per-question mastery stays in the browser; mistakes
  return immediately and correct answers reappear on a 1–3–7–14–30 day schedule.
- **Full English / Italian localisation** — every subtopic and quiz question in both
  languages, switchable in-app.

## Prerequisites

- **Node.js** `22.13` or higher — LTS `24.x` recommended (the version in [`.nvmrc`](.nvmrc)).
  Node 18 and 20 are end-of-life and no longer supported by the test and lint toolchain.
- **npm** `10.x` or higher (bundled with Node.js).
- **Git** — to clone the repository.

## Gemini API key

The AI trainer and the remediation generator use the official `@google/genai` SDK and need
a free **`GEMINI_API_KEY`**:

1. Go to **Google AI Studio**: <https://aistudio.google.com/>
2. Sign in with your Google account.
3. Click **"Get API key"**.
4. Click **"Create API key"** (pick an existing or new Google Cloud project).
5. Copy the generated string (e.g. `AIzaSy...`) — it goes into your `.env` file.

## Environment variables

Copy `.env.example` to a new file called `.env` in the project root:

```env
# Required — Google Gemini AI trainer & remediation engine
GEMINI_API_KEY="Paste_Your_Gemini_API_Key_Here"

# Optional — application base URL
APP_URL="http://localhost:3000"

# Optional — cost and resilience limits for the AI endpoints
AI_DAILY_LIMIT=500        # total AI calls per UTC day, all users together; 0 turns the AI off
GEMINI_TIMEOUT_MS=30000   # a Gemini call taking longer is abandoned and answered with 504
TRUST_PROXY=1             # reverse proxies in front of Node; 0 if browsers connect directly
AI_ACCESS_TOKEN=          # optional: the AI answers only visitors who enter this code
```

`AI_DAILY_LIMIT` complements the per-IP rate limit (30 requests every 15 minutes): on a
public deployment it caps what many different addresses can spend together. The counter
lives in the server process, so with several instances the effective cap is the limit
multiplied by the number of instances.

`TRUST_PROXY` tells the rate limit where to read the client address. Keep `1` behind one
reverse proxy (Cloud Run, Vercel, Render, a single nginx). Set `0` when browsers reach
Node directly: otherwise a client can send a made-up `X-Forwarded-For` header and get a
fresh quota on every request.

`AI_ACCESS_TOKEN` protects the Gemini budget of a public site: visitors can study freely,
but the AI Trainer and the adaptive remediation ask for the code first. Generate a long
random one, for example with `openssl rand -base64 24`, and share it only with the people
who should use the AI. The browser keeps it for the current tab only.

> [!WARNING]
> Never commit your `.env` to a public repository — it holds a private API credential.

## Installation

### 🐧 Linux (Ubuntu, Debian, Fedora, Arch)

```bash
# 1. Install prerequisites
# Ubuntu / Debian:
sudo apt update && sudo apt install -y curl git
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs
# Fedora / RHEL:   sudo dnf install -y git nodejs
# Arch:            sudo pacman -S git nodejs npm

# 2. Verify
node -v   # v22.13.x or higher (v24.x recommended)
npm -v    # v10.x.x or higher

# 3. Clone, install, configure
git clone https://github.com/chiaraberti13/CompTIA-Security-SY0-701.git
cd CompTIA-Security-SY0-701
npm install
cp .env.example .env
nano .env          # paste your GEMINI_API_KEY

# 4. Run
npm run dev        # development, hot reload → http://localhost:3000
# or
npm run build && npm start   # production
```

### 🍎 macOS (Intel & Apple Silicon)

```bash
# 1. Install prerequisites (Homebrew)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node git

# 2. Clone, install, configure
cd ~/Documents
git clone https://github.com/chiaraberti13/CompTIA-Security-SY0-701.git
cd CompTIA-Security-SY0-701
npm install
cp .env.example .env
nano .env          # paste your GEMINI_API_KEY (CTRL+O, ENTER, CTRL+X)

# 3. Run
npm run dev                    # → http://localhost:3000
# or
npm run build && npm start
```

### 🪟 Windows (PowerShell / CMD / WSL2)

**Native (PowerShell as Administrator):**

```powershell
# 1. Install prerequisites
winget install OpenJS.NodeJS.LTS
winget install Git.Git
# (restart the terminal afterwards)

# 2. Clone, install, configure
cd $HOME\Documents
git clone https://github.com/chiaraberti13/CompTIA-Security-SY0-701.git
cd CompTIA-Security-SY0-701
npm install
Copy-Item .env.example .env
notepad .env       # paste your GEMINI_API_KEY, then save

# 3. Run
npm run dev                    # → http://localhost:3000
# or
npm run build ; npm start
```

**WSL2:** open your WSL shell (e.g. Ubuntu) and follow the Linux steps above — the app maps
to `http://localhost:3000` in your Windows browser automatically.

## Scripts

| Script | What it does |
| :--- | :--- |
| `npm run dev` | Express + Vite middleware in development, hot reload on `http://localhost:3000`. |
| `npm run build` | Builds the React frontend (Vite) and bundles the Express backend (esbuild) into `dist/server.cjs`. |
| `npm start` | Runs the compiled production server (`node dist/server.cjs`). |
| `npm run typecheck` | TypeScript type-check (`tsc --noEmit`). |
| `npm run lint` | ESLint over the source (TypeScript + React Hooks rules). |
| `npm test` | Vitest suite: dataset integrity, quiz logic and i18n coverage. |
| `npm run check` | Typecheck + lint + tests, the same gate CI runs. |
| `npm run smoke` | After `npm run build`: starts `dist/server.cjs` in production mode and checks the app shell, security headers, SPA fallback and API input validation. Also run by CI. |
| `npm run clean` | Removes build artifacts (`dist`, `server.js`). |

## Architecture

Integrated **full-stack** layout — one Express server serves the frontend and proxies Gemini:

```text
├── server.ts                 # Start-up: reads the environment, Vite in dev, listen, graceful shutdown
├── server/
│   ├── app.ts                # createApp(): security headers, /healthz, rate limit, AI routes, static files
│   └── aiGuard.ts            # Daily AI budget and safe reading of numeric limits
├── src/
│   ├── App.tsx               # Main React component (Studio, Glossary, Quiz, AI)
│   ├── components/           # Domain guide, glossary, "Your data" (export/import/delete)
│   ├── main.tsx              # React 19 entry point
│   ├── data.ts               # Italian source of truth — 5 domains & question bank
│   ├── data.en.ts            # English overlay, lazily loaded (falls back to Italian)
│   ├── localizedData.ts      # Merges the two languages, namespaces question ids
│   ├── domainGuides.ts       # Reasoned guide per domain (IT/EN)
│   ├── questionObjectives.ts # Links every question to its SY0-701 objectives
│   ├── subgroups.ts          # checklistKey → thematic subgroup map
│   ├── quiz.ts               # Pure quiz logic (shuffle, threshold, history, spaced review)
│   ├── progressBackup.ts     # Backup format and sanitisers for the saved progress
│   ├── remediation.ts        # Validation of AI-generated questions
│   ├── storage.ts            # Guarded localStorage helpers
│   ├── i18n.tsx              # UI-string localisation & language switch
│   ├── types.ts              # TypeScript interfaces
│   └── index.css             # Tailwind CSS v4 styles
├── tests/                    # Vitest: data integrity, IT/EN parity, API, components, logic
├── e2e/                      # Playwright + axe at phone and desktop width
├── scripts/                  # Smoke test and coverage-matrix generator
├── docs/coverage-matrix.md   # Generated: questions per objective
├── public/favicon.svg        # App icon
├── .github/workflows/        # ci.yml (checks, smoke, e2e) and security.yml (gitleaks, audit, CodeQL)
├── .env.example              # Environment variables template
├── eslint.config.js          # ESLint flat config
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Vite configuration (dataset/vendor chunk splitting)
└── tsconfig.json             # TypeScript configuration
```

## Troubleshooting

**AI error: _"GEMINI_API_KEY is not configured"_**
Missing `.env` or invalid key. Make sure `.env` exists in the project root with a valid key
from Google AI Studio, then restart the server (`npm run dev`).

**`Error: listen EADDRINUSE: address already in use :::3000`**
Port 3000 is taken. Free it:

- **Linux / macOS:** `npx kill-port 3000`
- **Windows PowerShell:** `Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process`

## Licence

The code in this repository is distributed under the **MIT licence** — see
[`LICENSE`](LICENSE) for the full text. You're free to use, study, modify and redistribute
it, including commercially, as long as the copyright notice is kept; it's provided as-is,
with no warranty.

This project is an independent, educational study aid. **CompTIA** and **Security+** are
registered trademarks of CompTIA, Inc.; this project is not affiliated with or endorsed by
CompTIA, and all such trademarks belong to their respective owners.

## A note on the study content

The study materials in this platform (checklists, glossary, questions and explanations) are
**original, personal study notes** written to help build understanding of the concepts. They
are not official CompTIA material, they do not reproduce real exam questions, and they are
not intended as an "exam dump": passing the exam requires genuine understanding of the
topics, not memorized items.

The content is aligned with the **official SY0-701 objectives** to the best of the author's
knowledge, but it may contain inaccuracies and may fall behind updates to the exam syllabus.
Always verify against **official CompTIA sources**:

- the current exam objectives and their version number;
- voucher price, exam duration and number of questions;
- renewal (CEU), retake and certification-expiry policies;
- test dates and delivery options (test centre or online proctoring).

Where these notes and CompTIA's official documentation disagree, **the official
documentation always prevails**.

How every official objective is covered (number of questions by cognitive level and guided
exercises) is published in [`docs/coverage-matrix.md`](docs/coverage-matrix.md), generated
from the dataset and checked by CI.

---

<p align="center">
  <sub>Made with 🛡️ by <a href="https://github.com/chiaraberti13">chiaraberti13</a></sub>
</p>

---
