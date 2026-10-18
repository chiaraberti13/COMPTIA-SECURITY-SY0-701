# Studio offline / Offline study

## Italiano

Apri l’app online e attendi **«Pronto per studiare offline»** nella barra inferiore. Il primo download prepara insieme interfaccia, font locali, guide, glossario, domande e scenari pratici in italiano e inglese: non serve aprire prima ogni scheda o cambiare lingua. Poi puoi chiudere e riaprire l’app, ricaricare la pagina, passare da IT a EN e completare quiz senza rete. Checklist, segnalibri, autovalutazioni, cronologia e ripasso continuano a usare gli stessi progressi locali; esportazione e importazione restano disponibili.

La prova in corso, inclusi gli scenari pratici, resta in memoria come prima: ricaricare riparte dalla schermata iniziale e conserva i risultati già salvati, senza riprendere una prova incompleta. I laboratori esterni e i collegamenti alle fonti richiedono i rispettivi file o una connessione. Trainer e recupero AI richiedono Internet; quando il browser segnala assenza di rete, i pulsanti sono disabilitati con una spiegazione e il testo della chat non inviato rimane disponibile alla riconnessione. Essere online non garantisce che il servizio AI sia raggiungibile: gli errori di rete restano gestiti dall’app.

Lo studio offline è attivo nella **build di produzione**, via HTTPS oppure su `localhost` / `127.0.0.1`; non nella modalità di sviluppo `npm run dev`. L’installazione dell’app dal menu del browser è opzionale. Serve un browser che supporti service worker e CacheStorage e consenta il salvataggio: se non sono disponibili o il download fallisce, l’app resta utilizzabile online e non dichiara il pacchetto pronto. Se il browser elimina la cache, apri nuovamente l’app online e attendi la preparazione. La modalità privata e la cancellazione dei dati del sito possono rimuovere sia il pacchetto sia i progressi: usa il backup dei progressi se vuoi conservarli.

Quando compare **«Nuova versione pronta»**, termina la prova prima di scegliere **«Aggiorna e riavvia»**. L’app non si ricarica automaticamente durante un quiz. Il riavvio mantiene i progressi già salvati e attiva il nuovo pacchetto; la versione corrente e una precedente possono coesistere per le schede ancora aperte. Se il download dell’aggiornamento fallisce, la copia precedente resta disponibile.

La cache offline contiene soltanto file pubblici dell’app. Richieste `/api`, `/healthz`, risposte AI, codici di accesso, dati personali e progressi non vengono scritti in CacheStorage. I progressi restano nel `localStorage` esistente, senza account e senza modifiche al formato. Un service worker non sostituisce il backup dei dati.

## English

Open the app online and wait for **“Ready to study offline”** in the bottom bar. The first download prepares the interface, local fonts, guides, glossary, questions and practice scenarios in Italian and English together: you do not need to visit every tab or switch languages first. You can then close and reopen the app, reload the page, switch between IT and EN and complete quizzes without a network. Checklists, bookmarks, self-assessments, history and spaced review keep using the same local progress; export and import remain available.

The current session, including practice scenarios, stays in memory as before: reloading returns to the start screen and keeps results already saved, without resuming an unfinished attempt. External labs and source links require their own files or a connection. The trainer and AI remediation require Internet; when the browser reports offline, their buttons are disabled with an explanation and the unsent chat draft stays available on reconnection. Being online does not guarantee that the AI service is reachable: the app still handles network errors.

Offline study is enabled in the **production build**, over HTTPS or on `localhost` / `127.0.0.1`; it is disabled in `npm run dev`. Installing the app through the browser menu is optional. The browser must support service workers and CacheStorage and allow storage: if these are unavailable or the download fails, online study remains usable and the package is not reported ready. If the browser evicts the cache, reopen the app online and wait for preparation. Private browsing and clearing site data can remove both the package and progress: export a progress backup to keep it.

When **“New version ready”** appears, finish your attempt before choosing **“Update and restart”**. The app does not reload automatically during a quiz. Restarting preserves saved progress and activates the new package; the current version and one previous generation may coexist for tabs still open. If downloading an update fails, the previous copy remains available.

The offline cache contains only public app files. `/api` and `/healthz` requests, AI responses, access codes, personal data and progress are never written to CacheStorage. Progress remains in the existing `localStorage`, with no account or format changes. A service worker does not replace a data backup.

## Verifica / Verification

```bash
npm ci
npm run check
npm run build
npm run smoke
npx playwright install chromium
npm run e2e:offline
npm run build:vercel
npm run smoke:vercel
```

`tests/offlineBuild.test.ts` checks the build inventory and content revision. `tests/offlineWorker.test.ts` executes the real worker for complete installation, failed download, API isolation, navigation, missing assets, cache eviction and bounded generations. `tests/offlineStudy.test.ts` checks readiness and explicit activation; `tests/offlineAi.test.tsx` checks offline controls, drafts and request suppression. `e2e/offline.spec.ts`, included in CI, checks both initial languages on desktop and phone, offline reload and a second tab, a language switch, glossary and PBQ loading, a completed quiz with saved history/mastery, AI isolation, reconnection and a waiting update during a quiz. Production and Vercel smoke checks verify the generated worker and its update headers.

Build generation lives in `scripts/offline-build.ts`; the worker template is `src/offline/service-worker.js`. Only the fixed public shell files, manifest icons and allowed files below `/assets/` are included. Revisions derive from all included file contents and the worker template. `/sw.js` is served with `Cache-Control: no-cache` and root scope on Express and Vercel; cached responses retain the existing security headers. No additional package or remote CDN is needed.
