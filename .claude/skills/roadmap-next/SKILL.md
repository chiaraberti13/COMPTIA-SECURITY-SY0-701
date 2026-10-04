---
name: roadmap-next
description: Avanza la roadmap di COMPTIA-SECURITY-SY0-701. Usala ogni volta che il compito è completare il prossimo punto non spuntato di ROADMAP.md, verificarlo, spuntarlo e fare commit e push su main.
---

# Prossimo punto della roadmap — COMPTIA-SECURITY-SY0-701

Procedura per una sessione automatica che deve chiudere **un** punto di `ROADMAP.md`
e pubblicarlo su `main` senza intervento umano. Segui i passi in ordine.

## 1. Allinea il repository

```bash
git checkout main
git pull --rebase origin main
npm ci
```

Lavora sempre partendo dall'ultimo `main`: altre esecuzioni pianificate possono aver
spuntato punti poco prima di te.

## 2. Scegli il punto giusto

Trova i candidati con:

```bash
grep -n -E '^\s*[-*] \[ \]' ROADMAP.md | head -20
```

Il punto da fare è il **primo vero task** non spuntato, in ordine di documento, con
queste eccezioni:

- **Salta la sezione `### Stati`** sotto "Come usare questa roadmap": le righe
  `- [ ] Da pianificare`, `- [ ] In corso — ...`, `- [ ] Parziale — ...`,
  `- [ ] Bloccato — ...` sono la legenda, non task. I task veri iniziano con una
  priorità in grassetto, es. `**P1 — ...:**`.
- **Salta** i punti con `⛔` (bloccati) e i `🟡` (parziali) la cui parte mancante
  dipende da servizi esterni (es. attivazione del progetto Vercel, impostazioni del
  repository su GitHub).
- I punti di taglia **L** vanno spezzati: chiudine una parte coerente e marcala
  `🟡`.
- **Salta** i punti che non si possono chiudere da una sessione cloud: richiedono
  account o servizi esterni da attivare (Vercel, impostazioni GitHub, branch
  protection), credenziali reali, hardware, laboratorio live o decisioni della
  proprietaria. Passa al successivo e segnalalo nel resoconto finale.
- Se un punto è troppo grande per una sola sessione, completa una parte coerente e
  verificata e marcalo come **parziale** con la convenzione del repository (vedi
  sotto), mai come completato.

Prima di scrivere codice rileggi il punto, la sua sezione e il criterio di
completamento: il lavoro è finito solo quando quel criterio è soddisfatto.

## 3. Implementa

Rispetta `CONTRIBUTING.md`, in particolare:

- **Entrambe le lingue nello stesso commit**; `tests/languageParity.test.ts` lo
  verifica. Dopo aver cambiato testo italiano aggiorna le traduzioni e poi
  `UPDATE_TRANSLATION_SOURCES=1 npx vitest run tests/translationFreshness.test.ts`.
- **Gli identificatori sono per sempre**: mai rinominare o riusare ID di domande,
  `checklistKey` o lab. Dopo averne aggiunti:
  `UPDATE_STABLE_IDS=1 npx vitest run tests/conventions.test.ts` e committa il
  fixture.
- Nuove domande: scenario, 2–6 opzioni, `answerIndex` corretto, spiegazione che
  discute ogni opzione errata, topic collegato in `src/questionObjectives.ts`, poi
  `npm run coverage-matrix` e committa `docs/coverage-matrix.md`.
- Aggiorna `CHANGELOG.md` per modifiche visibili all'utente.

## 4. Verifica

Esegui i controlli che la CI esegue su questo repository e correggi ogni errore prima
di proseguire:

```bash
npm run check        # typecheck, lint, lint:md, spellcheck, test
npm run build
npm run smoke
```

Se il punto tocca il deploy Vercel esegui anche `npm run build:vercel && npm run
smoke:vercel`; se tocca flussi dell'interfaccia e Playwright è installabile, anche
`npm run e2e`.

Se un controllo fallisce per cause preesistenti estranee al punto (verificabile
eseguendolo anche su `main` senza le tue modifiche), non nasconderlo: annotalo nel
resoconto.

## 5. Aggiorna ROADMAP.md

Formato del repository: `- [x] **Px — Titolo:** cosa è stato fatto — AAAA-MM-GG,
riferimento` (data di oggi e riferimento al commit, alla PR o al file che lo prova).
Per un completamento parziale: `- [ ] 🟡 ...` con l'indicazione di cosa manca.
Aggiorna anche le tabelle di stato della roadmap se il punto le cambia.

## 6. Commit e push

```bash
git add -A
git status            # controlla che non ci siano file temporanei, .env o segreti
git commit            # messaggio secondo la convenzione sotto
git pull --rebase origin main
git push origin main
```

Convenzione dei messaggi: oggetto breve all'imperativo con scope, es. `feat(guides): ...`,
`fix(server): ...`, `docs: ...`, poi nel corpo il *perché* della modifica.

Se il push viene rifiutato perché `main` è avanzato, ripeti `git pull --rebase`,
risolvi gli eventuali conflitti (in `ROADMAP.md` tieni le spunte di entrambi), riesegui
i test interessati e ripeti il push. **Mai** `--force`, mai riscrivere la storia di
`main`, mai `--no-verify`.

## 7. Resoconto

Chiudi con un riepilogo breve: punto scelto (con ID), file modificati, controlli
eseguiti con esito, hash del commit ed esito del push, punti saltati e perché.
