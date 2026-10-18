# Portfolio mode / Modalità portfolio

Owner: maintainers · Reviewed / Verificato: 2026-10-05 · Next review / Prossimo controllo: 2027-01-05.

## Italiano

Prerequisiti: aver svolto almeno uno dei laboratori collegati (01, 03, 06) e conoscere i relativi obiettivi SY0-701. Livello: applicazione. Risultati: produrre un documento professionale a partire da un esercizio e sanificarlo prima di pubblicarlo.

La **Modalità portfolio** si trova nell'area di studio, sotto la guida di dominio. Offre tre documenti pronti, costruiti sui laboratori, che puoi leggere, copiare in Markdown o scaricare come file `.md` e adattare per un portfolio o un colloquio reale:

- un **write-up** di incidente (brute force e password spraying nei log SSH, Lab 03, obiettivi 2.4, 4.4, 4.9);
- un **runbook** di triage degli allarmi SOC (Lab 06, obiettivi 4.4, 4.8, 4.9);
- un **report** di hardening degli header di sicurezza HTTP (Lab 01, obiettivi 2.5, 4.1).

Ogni documento mostra gli obiettivi collegati (un clic apre l'obiettivo nella guida di dominio), le competenze dimostrate e il testo diviso in sezioni (contesto, metodo, risultati, raccomandazioni). I pulsanti **Copia Markdown** e **Scarica .md** producono lo stesso documento in modo deterministico; la copia negli appunti può essere bloccata in un contesto non sicuro, ma il download resta disponibile.

Tutti i documenti usano solo dati sintetici: l'azienda di fantasia **Kestrelia**, gli indirizzi del blocco riservato alla documentazione `203.0.113.0/24` (RFC 5737) e il loopback `127.0.0.1`, senza nomi reali, segreti o credenziali. Prima di riutilizzare un documento, sostituisci i dettagli fittizi con i tuoi e rimuovi qualsiasi dato personale: la nota di riservatezza in fondo a ogni documento lo ricorda.

I contenuti e le due lingue sono verificati da `tests/portfolio.test.ts`: stessi documenti, obiettivi e tipi in italiano e inglese; stessi numeri, sigle e codici obiettivo nelle due lingue; indirizzi IP solo nei blocchi pubblicabili; nessun segreto o chiave; render del Markdown deterministico. Il modulo dati è `src/portfolio.ts` e il pannello è `src/components/PortfolioPanel.tsx`.

## English

Prerequisites: having done at least one of the linked labs (01, 03, 06) and knowing their SY0-701 objectives. Level: application. Outcomes: produce a professional document from an exercise and sanitize it before publishing.

**Portfolio mode** lives in the study area, below the domain guide. It offers three ready documents built on the labs, which you can read, copy as Markdown or download as a `.md` file and adapt for a real portfolio or interview:

- an incident **write-up** (brute force and password spraying in SSH logs, Lab 03, objectives 2.4, 4.4, 4.9);
- a SOC alert triage **runbook** (Lab 06, objectives 4.4, 4.8, 4.9);
- an HTTP security headers hardening **report** (Lab 01, objectives 2.5, 4.1).

Each document shows the linked objectives (a click opens the objective in the domain guide), the skills demonstrated and the text split into sections (context, method, findings, recommendations). The **Copy Markdown** and **Download .md** buttons produce the same document deterministically; copying to the clipboard can be blocked in an insecure context, but the download stays available.

Every document uses synthetic data only: the fictional company **Kestrelia**, addresses from the documentation range `203.0.113.0/24` (RFC 5737) and the loopback `127.0.0.1`, with no real names, secrets or credentials. Before reusing a document, replace the fictional details with your own and remove any personal data: the confidentiality note at the end of each document is a reminder.

The content and the two languages are checked by `tests/portfolio.test.ts`: the same documents, objectives and kinds in Italian and English; the same numbers, acronyms and objective codes across languages; IP addresses only in publishable blocks; no secrets or keys; a deterministic Markdown render. The data module is `src/portfolio.ts` and the panel is `src/components/PortfolioPanel.tsx`.
