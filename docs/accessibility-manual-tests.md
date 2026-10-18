# Test manuali periodici di accessibilità

Procedura ripetibile per le verifiche di accessibilità che **solo una persona** può fare: un
lettore di schermo reale, lo zoom del browser al 200% e l'uso su un telefono vero. Integra, non
sostituisce, i controlli automatici — axe su ogni vista, il percorso da tastiera, la struttura
dei titoli e il progetto mobile (Pixel 7) in `e2e/app.spec.ts` — che girano a ogni commit.

- **Responsabile:** manutentrice del repository (vedi [`.github/CODEOWNERS`](../.github/CODEOWNERS)).
- **Ultima revisione:** 2026-10-05.
- **Prossimo controllo:** entro 180 giorni, cioè il 2027-04-03.
- **Cadenza:** prima di ogni rilascio, e comunque almeno due volte l'anno. La data dell'ultima
  revisione è `MANUAL_A11Y_CHECKED_ON` in [`src/manualAccessibilityTests.ts`](../src/manualAccessibilityTests.ts);
  il limite di 180 giorni è `MANUAL_A11Y_MAX_AGE_DAYS`. Quando il giro è scaduto, l'issue di
  manutenzione mensile (`scripts/maintenance-report.ts`) lo segnala da sola, così nessuno deve
  ricordarsene.

> **English summary.** A repeatable procedure for the accessibility checks only a person can do:
> a real screen reader (NVDA on Windows, VoiceOver on macOS and iOS), the browser zoomed to 200%
> (with a 400% reflow check), and touch use on a real phone. It complements the automated axe,
> keyboard and mobile-viewport checks that run on every commit. Run it before every release, or at
> least twice a year; record each pass in the log at the end and update `MANUAL_A11Y_CHECKED_ON` in
> `src/manualAccessibilityTests.ts`. The monthly maintenance issue flags the round when it is
> overdue.

## Perché a mano

I controlli automatici trovano gli errori che una regola sa descrivere (nome accessibile mancante,
contrasto insufficiente, salto di livello nei titoli), ma non sanno dire se l'esperienza è
*comprensibile*: come un lettore di schermo pronuncia davvero la domanda del quiz e il suo esito,
se lo zoom al 200% lascia tutto leggibile senza scorrimento orizzontale, se i bersagli al tocco su
un telefono sono abbastanza grandi e distanziati. Queste verifiche restano manuali.

## Prima di iniziare

1. Compila l'app per la produzione e avviala come in `e2e/`:

   ```bash
   npm run build
   npm start
   ```

2. Apri l'app all'indirizzo indicato (per impostazione predefinita `http://localhost:3000`).
3. Prova in entrambe le lingue con il pulsante IT/EN in alto.
4. Percorri le tre sezioni (Studio, Glossario, Simulatore) e, nel simulatore, svolgi almeno una
   domanda fino al riscontro e ai risultati.

Ogni verifica qui sotto indica i **passi**, il **risultato atteso** e il **criterio di successo**.
Quando qualcosa non va, apri una issue con l'etichetta `accessibility` e annotala nel registro.

## 1. Lettore di schermo NVDA (Windows)

Copre WCAG 1.3.1, 2.4.3, 4.1.2 e 4.1.3.

- **Passi.** Con [NVDA](https://www.nvaccess.org/download/) attivo, in Firefox e poi in Chrome:
  spostati solo da tastiera (`Tab`, frecce, `H` per i titoli, `D` per le regioni, `K` per i link).
  Apri una guida di dominio, leggi un concetto, cambia lingua, svolgi una domanda del simulatore
  fino al riscontro, raggiungi i risultati.
- **Risultato atteso.** Ogni controllo annuncia nome e ruolo; i titoli formano una scaletta senza
  salti; l'esito della risposta è annunciato dalla regione `role="status"`; le opzioni corrette o
  scelte sono dette a parole («Risposta corretta», «La tua risposta»), non solo con il colore; il
  cambio di lingua aggiorna la lingua annunciata.
- **Criterio di successo.** Un utente che non vede lo schermo può svolgere una domanda e capirne
  l'esito senza conoscenze implicite.

## 2. Lettore di schermo VoiceOver (macOS e iOS)

Copre WCAG 1.3.1, 2.4.3 e 4.1.2.

- **Passi.** Con VoiceOver attivo (`⌘F5`) in Safari su macOS, ripeti il percorso del punto 1 usando
  il rotore per titoli, link e moduli. Poi su iOS, con VoiceOver attivo, prova lo stesso percorso
  al tocco (scorri a destra/sinistra per muoverti, doppio tocco per attivare).
- **Risultato atteso.** Il rotore elenca titoli e link sensati fuori contesto; i pulsanti delle
  schede dicono lo stato premuto; la domanda e il suo esito sono leggibili; su iOS ogni elemento è
  raggiungibile e attivabile al tocco.
- **Criterio di successo.** L'app è usabile con VoiceOver su desktop e su telefono, senza trappole
  di focus né elementi muti.

## 3. Zoom del browser al 200%

Copre WCAG 1.4.4 e 1.4.10.

- **Passi.** In un browser a 1280 px di larghezza porta lo zoom al 200% (`Ctrl`/`⌘` più `+`).
  Percorri Studio, Glossario e Simulatore. Ripeti a 400% (reflow equivalente a circa 320 px CSS).
- **Risultato atteso.** Nessun testo è tagliato o sovrapposto; non compare scorrimento orizzontale
  del contenuto (le tabelle comparative scorrono nel proprio riquadro, non la pagina); tutti i
  controlli restano raggiungibili e utilizzabili.
- **Criterio di successo.** A 200% nulla si perde; a 400% il contenuto si riadatta su una colonna
  senza doppio scorrimento.

## 4. Viewport mobile e tocco su dispositivo reale

Copre WCAG 1.4.10 e 2.5.8.

- **Passi.** Su un telefono reale (o, in mancanza, con l'emulazione dispositivo del browser) apri
  l'app in verticale e in orizzontale. Percorri le tre sezioni, apri e chiudi la barra laterale del
  Trainer AI, svolgi una domanda.
- **Risultato atteso.** Il menu principale è tutto visibile senza scorrerlo di lato; il pannello di
  studio non collassa; i bersagli al tocco (caselle, pulsanti, opzioni) sono almeno 24 × 24 px e
  non si toccano fra loro; non c'è scorrimento orizzontale della pagina.
- **Criterio di successo.** L'app è comoda da usare con il pollice, senza zoom pizzicato per
  centrare un bersaglio.

## Come registrare un giro

1. Esegui le quattro verifiche qui sopra nell'app compilata per la produzione.
2. Apri una issue `accessibility` per ogni problema trovato e correggilo o pianificane la
   correzione.
3. Aggiorna `MANUAL_A11Y_CHECKED_ON` in [`src/manualAccessibilityTests.ts`](../src/manualAccessibilityTests.ts)
   con la data del giro e aggiorna «Ultima revisione» e «Prossimo controllo» in cima a questo
   documento.
4. Aggiungi una riga al registro.

## Registro degli esiti

| Data | Verifiche eseguite | Esito | Problemi aperti |
|---|---|---|---|
| 2026-10-05 | Procedura definita e allineata ai controlli automatici esistenti (axe, tastiera, viewport mobile Pixel 7, zoom/reflow in `e2e/app.spec.ts`). Primo giro manuale completo pianificato per il prossimo rilascio. | Baseline stabilita | Nessuno |
