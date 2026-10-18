# Baseline di qualità

Misure di riferimento del progetto al **2026-09-27**, per confrontare le prossime versioni con
numeri e non con impressioni. Ogni sezione dice come ripetere la misura.

> **English summary.** Reference measurements as of 2026-09-27: question bank by domain and
> cognitive level, test suite, `npm audit`, Lighthouse scores (mobile and desktop) and the
> size of the build. Taking this baseline showed that the server sent the front end
> uncompressed (5.4 MB per visit) and that the AI panel shifted the layout on load; both are
> now fixed, and the table shows the scores before and after.

## Banca domande

| Dominio | Domande | Quota del banco | Peso d'esame | Ricordo | Comprensione | Applicazione | Analisi | Applicazione + analisi |
|---|---|---|---|---|---|---|---|---|
| 1 — Concetti generali | 110 | 16,1% | 12% | 4 | 33 | 39 | 34 | 66% |
| 2 — Minacce e vulnerabilità | 133 | 19,5% | 22% | 0 | 48 | 21 | 64 | 64% |
| 3 — Architettura | 112 | 16,4% | 18% | 0 | 51 | 35 | 26 | 54% |
| 4 — Operazioni | 185 | 27,1% | 28% | 0 | 90 | 57 | 38 | 51% |
| 5 — Gestione del programma | 142 | 20,8% | 20% | 22 | 39 | 49 | 32 | 57% |
| **Totale** | **682** | | | 26 | 261 | 201 | 194 | 58% |

Ogni obiettivo ha almeno 15 domande; il dettaglio per obiettivo, con i livelli e le fonti, è in
[`coverage-matrix.md`](coverage-matrix.md), rigenerato e verificato dalla CI. I più scoperti oggi
sono 1.1 (15), 4.4 (16), 2.3 e 5.5 (17).

## Test

| Suite | Numero | Che cosa copre |
|---|---|---|
| Vitest (unità, componenti, API) | 302 test in 34 file | Integrità e parità linguistica del dataset, logica del quiz, API con client AI simulato, prompt injection, componenti, convenzioni e identificatori stabili, sicurezza dei contenuti |
| Playwright (end-to-end) | 60 test, telefono e desktop | Flussi principali, tastiera, axe (WCAG 2.2 AA), CSP senza violazioni, gerarchia dei titoli |

Soglie di copertura del codice in `vitest.config.ts`; la CI esegue tutto su Node 22 e 24.

## Dipendenze

`npm audit` (registro npm, 2026-09-27): **0 vulnerabilità** su 540 pacchetti installati, di cui 155
di produzione. La CI ripete l'audit a ogni modifica, insieme a dependency review, CodeQL, SBOM e
scansione dell'immagine Docker (`.github/workflows/security.yml`).

## Lighthouse

Misurato con Lighthouse 13.5.0 e Chromium sulla build di produzione servita in locale
(`NODE_ENV=production`), con la simulazione di rete e CPU predefinita di Lighthouse: per il
profilo mobile una rete 4G lenta. I valori assoluti dipendono dalla macchina; contano i confronti
fatti con lo stesso metodo.

| Categoria | Mobile prima | Mobile dopo | Desktop prima | Desktop dopo |
|---|---|---|---|---|
| Performance | 55 | 60 | 47 | 93 |
| Accessibilità | 100 | 100 | 100 | 100 |
| Buone pratiche | 100 | 100 | 100 | 100 |
| SEO | 91 | 100 | 91 | 100 |

| Metrica | Mobile prima | Mobile dopo | Desktop prima | Desktop dopo |
|---|---|---|---|---|
| First Contentful Paint | 17,6 s | 6,5 s | 3,0 s | 1,2 s |
| Largest Contentful Paint | 29,5 s | 8,3 s | 3,0 s | 1,5 s |
| Cumulative Layout Shift | 0,027 | 0 | 0,419 | 0,038 |
| Total Blocking Time | 0 ms | 0 ms | 0 ms | 0 ms |
| Peso trasferito | 5.421 KiB | 1.350 KiB | 5.421 KiB | 1.350 KiB |

Che cosa è cambiato fra «prima» e «dopo»:

- **Compressione.** Il server mandava i file senza comprimerli. Ora `scripts/precompress.ts`
  scrive a build time una copia Brotli e una gzip di ogni file testuale e il server manda quella
  che il browser accetta; il dataset italiano passa da 2.389 KB a 548 KB.
- **Cache.** I file in `/assets` hanno l'hash del contenuto nel nome e si conservano per un anno
  (`immutable`): alla seconda visita il browser non li riscarica.
- **Spostamenti del layout.** Il pannello del Trainer AI, già aperto al caricamento, cresceva da
  larghezza zero con un'animazione e spostava tutta la pagina; ora l'animazione vale solo quando
  lo si apre o chiude.
- **Label in Name (WCAG 2.5.3).** I pulsanti della checklist avevano un nome accessibile («Apri
  l'argomento …») diverso dal testo visibile, e chi usa il controllo vocale non poteva attivarli
  pronunciando ciò che vede. Ora il nome è il testo visibile.
- **`robots.txt`.** Mancava: la richiesta riceveva la pagina dell'app.

### Che cosa resta

- Su mobile la prima schermata aspetta l'intero dataset della lingua (548 KB compressi): caricare
  prima la struttura e poi i domini uno alla volta abbasserebbe il First Contentful Paint.
- Lighthouse stima 280–320 KiB di JavaScript non usato al primo caricamento, per lo stesso motivo.
- In inglese il testo italiano viene mostrato finché non arriva la traduzione, poi sostituito.

## Peso della build

| File | Originale | Brotli |
|---|---|---|
| `dataset-it-*.js` | 2.389 KB | 548 KB |
| `dataset-en-*.js` | 2.150 KB | 508 KB |
| `index-*.js` (app) | 444 KB | 103 KB |
| `vendor-*.js` (React e librerie) | 387 KB | 105 KB |
| `index-*.css` | 71 KB | 9 KB |

Il dataset inglese si scarica solo quando si sceglie l'inglese.

## Come ripetere le misure

```bash
npm run build && npm run coverage-matrix    # banca domande (docs/coverage-matrix.md)
npm run test:coverage && npm run e2e        # test
npm audit                                   # dipendenze
NODE_ENV=production HOST=127.0.0.1 PORT=4190 AI_DAILY_LIMIT=0 npm start
```

In un altro terminale, con Lighthouse installato fuori dal progetto:

```bash
lighthouse http://127.0.0.1:4190/ --only-categories=performance,accessibility,best-practices,seo
lighthouse http://127.0.0.1:4190/ --preset=desktop --only-categories=performance,accessibility,best-practices,seo
```
