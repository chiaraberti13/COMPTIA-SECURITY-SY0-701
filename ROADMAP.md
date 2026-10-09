# Roadmap — CompTIA Security+ SY0-701

> Registro unico e operativo dello stato e delle priorità del progetto. Viene
> ricostruito a ogni revisione mensile: le voci completate, obsolete o duplicate
> sono rimosse e la cronologia resta in Git, nel [CHANGELOG](CHANGELOG.md) e nelle
> issue. Niente storico cumulativo qui.
>
> **English summary.** Single operational register of project status and
> priorities, rebuilt each monthly review; completed items are dropped (history
> lives in Git, the CHANGELOG and the issues).

## Stato della revisione — 2026-10-09

**Esito complessivo: ✅ con una nota.** Tutti i gate automatici sono verdi e non
sono stati trovati difetti rotti, regressioni o vulnerabilità. In questa revisione
sono state applicate le correzioni di accuratezza dei contenuti: l'appendice sigle è
stata riscritta con objective code per voce e definizioni funzionali (issue
[#102](https://github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/issues/102),
chiusa). Resta aperta una sola attività — l'irrobustimento del metodo di misura della
copertura bilingue (issue
[#103](https://github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/issues/103)).

Base della revisione: `main` a `4d16e79`. Nessuna routine di sviluppo attiva
all'avvio (ultimo commit > 30 minuti).

## Origine e perimetro

Perimetro del prodotto: guide di dominio (`src/domainGuides.ts`), definizioni e
glossario (`src/data.ts`, `src/data.en.ts`, `src/glossaryIndex.ts`,
`src/canonicalTerms.ts`), banca delle domande, PBQ (`src/pbqData.ts`), flashcard
degli acronimi, laboratori (`labs/`), app full-stack React/TypeScript + Node/Express
con PWA offline e parità IT/EN. Gli artefatti di copertura in `docs/` sono generati
dagli script `npm run objective-coverage|coverage-matrix|maturity-dashboard|acronym-coverage`
e validati in CI.

## Criteri comuni di completamento

- Parità IT/EN: definizione, approfondimento, esempio originale e avvertenza, quando pertinenti.
- Riuso delle definizioni canoniche, identificatori stabili, nessuna duplicazione di concetti già spiegati.
- Termini e acronimi ricercabili nel glossario, con espansione corretta, alias e disambiguazione.
- Fonti primarie e mappatura agli obiettivi SY0-701; niente numeri normativi datati o contenuti di versioni successive spacciati per requisiti SY0-701.
- Esempi con dati sintetici, senza credenziali reali o istruzioni per attaccare sistemi di terzi.
- Esecuzione dei controlli automatici del progetto e aggiornamento degli artefatti di copertura toccati.

## Verifiche del mese — esito per lente

| Lente | Esito | Note |
|---|---|---|
| Contenuti e didattica (Security+ / instructional / traduttore) | ✅ | Copertura obiettivi 249/249 e acronimi 329/329 al 100%; parità IT/EN verde. Appendice sigle corretta (objective code per voce + definizioni funzionali, #102). Resta da irrobustire il metodo di misura della copertura bilingue (#103). |
| Codice ed efficienza (dev / performance) | ✅ | `typecheck`, `lint`, `lint:md` verdi; nessun errore rilevato. Bundle dataset grande ma lazy-split e precompresso (Brotli). |
| Sicurezza e supply-chain (DevSecOps / privacy) | ✅ | `npm audit` prod+dev: **0 vulnerabilità**. Nessun segreto nel codice. Nessun `</script>` pericoloso in template literal. Dependabot con cooldown 7 giorni attivo. |
| Accessibilità, UX e visual (a11y / UX / visual) | ✅ | Controlli axe nei test E2E (`@axe-core/playwright`) verdi; navigazione da tastiera testata su desktop e mobile. |
| CI/CD e qualità (QA / DevSecOps) | ✅ | Unit **1024** passati (113 file), E2E **163** passati + 1 skip (12 spec), build verde. Nessun test fragile riscontrato in questa sessione. |
| Documentazione e roadmap (technical writer / PM) | ✅ | README bilingui con banner SVG terminale e firma `@chiaraberti13`; CHANGELOG `[Unreleased]` allineato; artefatti `docs/` generati e aggiornati. |

## Correzioni e attività del mese

- Issue [#104](https://github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/issues/104)
  (CI Playwright: 4 E2E falliti su PBQ ed esame) **verificata e chiusa**: il fix
  della causa (helper `currentMatching` esteso al PBQ 3.4 `payments`, commit
  `9c2916b`; percorso `vpn-pbq` reso deterministico, `6187d19`) è già su `main`.
  Suite E2E completa rieseguita: 163 passati, 0 falliti.
- **Appendice sigle riscritta (#102) — risolta.** Le 236 voci di
  `src/acronymAppendixTopics.ts` hanno ora un objective code per voce (mappa
  `ACRONYM_META`) invece di un obiettivo unico per dominio: CHAP/MSCHAP/2FA/PIV →
  IAM 4.6, ECDSA → 1.4, HIPS → 4.5, SD-WAN → 3.2 e le altre sigle lasciano il
  contenitore 5.1 per i domini reali. La definizione descrive ora la funzione del
  termine (non ripete il nome esteso), con disambiguazione per le sigle a più
  significati (MAC, PAM, RA, RBAC, SAN, SoC). Le sigle sono raggruppate per obiettivo,
  così ogni flashcard eredita il codice corretto; citazioni di ATT&CK e OWASP spostate
  nel dominio 2 (`src/citations.ts`). Nuovo test `tests/acronymAppendix.test.ts` lega
  ogni sigla a un obiettivo SY0-701 valido. 20 forme italiane corrette aggiunte al
  vocabolario `cspell/`.

## Errori di contenuto noti (tracciati)

- **Metodo di misura della copertura bilingue** (#103): investigato in questa
  revisione. Irrigidire il match a «entrambe le lingue» (`every` invece di `some`)
  fa emergere ~16 voci che falliscono il confronto; verificato che la maggioranza
  sono **artefatti del match** (sinonimo singolare vs testo plurale, es.
  `geographic restriction` contro «restrictions», per via dei confini di parola),
  non veri buchi di contenuto, più poche voci realmente presenti in una sola lingua
  (es. *Independent third-party audit* lato IT). Correzione corretta = rendere il
  confronto robusto (plurali/stemming) e colmare le poche voci monolingua, senza
  indebolire il traguardo 249/249 né i test. Resta issue (tooling + contenuto).

## Issue aperte

| # | Titolo | Tipo | Priorità |
|---|---|---|---|
| [#103](https://github.com/chiaraberti13/COMPTIA-SECURITY-SY0-701/issues/103) | Copertura esaustiva bilingue: match da irrobustire (plurali/stemming) e poche voci monolingua | tooling / contenuto | P2 |

## Backlog per priorità

1. **P2 — Robustezza del match di copertura obiettivi (#103).** Rendere `mentions()`
   tollerante a plurali e forme flesse (o normalizzare i sinonimi), poi passare a
   evidenza per voce *e* lingua; colmare le poche voci realmente monolingua
   (es. *Independent third-party audit* IT). Mantenere verde il traguardo di
   copertura. In prospettiva: inventario versionato derivato dal PDF ufficiale come
   denominatore completo. Stima: media/grande (tooling + poche voci di contenuto).
2. **P3 — Valutazione major upgrade dipendenze (Dependabot-driven).** Da esaminare
   quando Dependabot aprirà le PR (cooldown 7 giorni) e l'ecosistema sarà pronto:
   - `typescript` 5.8 → 7.0 (compilatore nativo): attendere il supporto di
     `typescript-eslint`, `vite` e `vitest`; migrazione pianificata, non in-range.
   - `motion` 13 → 14 (breaking): verificare le API di animazione usate nei componenti.
   - `@types/node` 22 → 26: legato all'innalzamento del floor `engines` in
     `package.json` (oggi bloccato, come già per `jsdom` 30 in `dependabot.yml`).
   Gli aggiornamenti minori/patch restano gestiti automaticamente dalle PR settimanali
   raggruppate di Dependabot: non applicarli a mano per non aggirare il cooldown di
   supply-chain.

## Metriche (baseline inizio revisione → dopo revisione)

| Metrica | Inizio | Dopo | Note |
|---|---|---|---|
| Domande attive | 682 | 682 | D1 110 · D2 133 · D3 112 · D4 185 · D5 142 |
| Obiettivi coperti da domande | 28/28 | 28/28 | 100% |
| Sotto-voci di obiettivo spiegate | 249/249 | 249/249 | 100% (vedi #103 per il metodo) |
| Sigle della Acronym List coperte | 329/329 | 329/329 | deck di 366 flashcard |
| Objective code per sigla d'appendice | 1 per dominio (errato) | 1 per voce (236/236) | mappa `ACRONYM_META` |
| Guide di dominio | 5/5 | 5/5 | 46 esercizi guidati |
| Scenari PBQ | 32 | 32 | integrati nell'Esame |
| Test unitari | 1023 (113 file) | 1024 | +1 test mappatura sigle; tutti verdi |
| Test E2E | 163 + 1 skip (12 spec) | 163 + 1 skip | desktop + mobile, tutti verdi |
| Bundle (gzip) | index 274 KB · vendor 124 KB · dataset IT 784 KB · dataset EN 720 KB | invariato | dataset lazy-split, precompressi Brotli |
| Vulnerabilità `npm audit` (prod+dev) | 0 | 0 | — |
| Issue aperte | 3 (#102, #103, #104) | 1 (#103) | #104 e #102 chiuse |

## Argomenti già coperti nelle spiegazioni

Riferimento per evitare duplicazioni: questi contenuti esistono già e vanno riusati,
non ripetuti (teoria ed esercizio interattivo restano strumenti distinti).

- CIA/AAA, categorie e funzioni dei controlli, change management, hashing/salting, firme, TPM/HSM, formati dei certificati, tokenizzazione.
- Vettori e attori di minaccia, malware/fileless e living off the land, SQLi, buffer overflow, vulnerabilità cloud/supply chain e mitigazioni.
- Segmentazione, VPN/SASE, modelli cloud, disponibilità active/active e active/passive, backup, metriche di resilienza e alimentazione.
- Baseline, MDM/BYOD/COPE, SAST e fuzzing, scansioni, threat intelligence, SIEM, SPF/DKIM/DMARC, DLP/NAC, automazione e risposta agli incidenti.
- Ruoli sui dati, gestione del rischio, BIA, fornitori, accordi, audit, awareness e formazione.

Criteri di accuratezza sempre validi durante le integrazioni: fonti primarie, nessuna
sigla inventata, stato legacy dichiarato per le tecnologie obsolete, nessun importo
normativo datato o statistica incidentale non necessaria.
