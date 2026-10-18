# 0003 — Gemini come provider AI, chiamato solo dal server

- **Stato:** Accettato
- **Data:** 2026-09-24 (formalizza una scelta presente dalle prime versioni)

## Contesto

Il Trainer AI risponde a domande libere e la remediation genera domande sugli
argomenti deboli. Il progetto è nato su Google AI Studio, che fornisce una
chiave Gemini. Ogni chiamata a un modello ha un costo, e una chiave esposta nel
browser può essere copiata e usata da chiunque.

## Decisione

Il browser non parla mai con Gemini. Chiama `/api/chat` e
`/api/quiz/remediation` sul server Express, che tiene `GEMINI_API_KEY` in una
variabile d'ambiente e usa `@google/genai`. Il modello si sceglie con
`GEMINI_MODEL` (predefinito `gemini-2.5-flash`). Le funzioni AI sono
facoltative: senza chiave, o con `AI_DAILY_LIMIT=0`, il resto dell'app funziona
normalmente.

## Alternative considerate

- **Chiamata diretta dal browser.** Esporrebbe la chiave a ogni visitatore.
- **Un altro fornitore** (OpenAI, Anthropic, un modello locale). È possibile:
  il codice specifico del fornitore sta dietro l'interfaccia `AiClient` di
  `server/app.ts`, già sostituita da un finto client nei test. Cambiare
  fornitore richiede un nuovo ADR, perché cambiano costi, trattamento dei dati
  e qualità delle risposte.

## Conseguenze

- ✅ La chiave non lascia mai il server (verificato da gitleaks e dall'assenza
  di `define` in `vite.config.ts`).
- ✅ Il costo è limitato dai controlli del server: rate limit per IP, tetto
  giornaliero, timeout, `maxOutputTokens`, input limitati e validazione
  dell'output (vedi [threat model](../threat-model.md)).
- ⚠️ I messaggi degli utenti arrivano a un fornitore esterno. L'app avvisa di
  non inserire dati personali e invia solo il messaggio e gli argomenti deboli,
  mai i progressi.
- ⚠️ Le risposte del modello possono essere sbagliate. L'app lo dichiara e
  segna come non revisionate le domande generate.
