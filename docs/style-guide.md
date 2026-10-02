# Style guide

Come si scrive nel progetto: tono, terminologia, sigle, maiuscole, numeri e traduzioni approvate.
Vale per i contenuti di studio (`src/data.ts`, `src/domainGuides.ts`), l'interfaccia
(`src/i18n.tsx`), i laboratori e la documentazione. La forma dei singoli contenuti (campi,
spiegazioni, tabelle) è in [`content-templates.md`](content-templates.md).

> **English summary.** Tone, terminology, acronyms, capitalisation, numbers and approved
> translations. Use the terms of the SY0-701 objectives (access control vestibule, allow list,
> deny list, on-path attack); the older terms appear only next to the current one, to help
> learners who meet them at work. `tests/styleGuide.test.ts` enforces the terminology table.

## Tono

- Si parla a chi studia con il **tu** e in forma attiva: «confronta il costo annuo del controllo
  con la riduzione di ALE», non «si procederà al confronto».
- Frasi brevi, un'idea per frase. Prima il concetto, poi l'eccezione.
- Si spiega il **perché**, non solo il che cosa: ogni distrattore di una domanda dice perché non
  è la risposta migliore.
- Nessun allarmismo e nessuna promessa: un controllo riduce un rischio, non lo elimina.
- Inglese: stesso tono, *you* e forma attiva, ortografia americana come negli obiettivi CompTIA
  (*authorization*, *behavior*), salvo nei nomi propri.

## Terminologia

Si usano i termini degli obiettivi ufficiali SY0-701, in inglese, perché sono quelli che
compaiono all'esame; la spiegazione è in italiano. Un termine storico o diffuso sul campo si
cita solo **accanto** a quello corrente, per riconoscerlo: «access control vestibule (il vecchio
*mantrap*)».

<!-- Il test legge questa tabella: una riga per termine, espressioni regolari fra backtick. -->

| Da usare | Da evitare | Ammesso solo vicino a |
|---|---|---|
| access control vestibule, vestibolo di controllo accessi | `mantraps?` | `vestibol\|vestibule` |
| allow list | `white-?lists?(ing)?\|white lists?\|liste? bianc[ah]e?` | `allow list` |
| deny list, block list | `black-?lists?(ing)?\|black lists?\|liste? ner[ae]` | `(deny\|block) list` |
| sanitizzazione (dei dati, degli input, dei supporti) | `sanificazion[ei]` | — |

Altre scelte, non verificate dal test perché dipendono dal contesto:

- **On-path attack** è il nome negli obiettivi; *man-in-the-middle* (MitM) resta ammesso come
  sinonimo diffuso, meglio se accanto a *on-path* la prima volta.
- **Threat actor** (non «hacker») per chi attacca; *hacker etico* solo per il penetration tester
  autorizzato.
- I nomi dei controlli restano in inglese come negli obiettivi (*least privilege*, *defense in
  depth*, *separation of duties*), con la traduzione fra parentesi alla prima occorrenza:
  «separation of duties (separazione dei compiti)».
- **Email**, senza trattino, in tutti i contenuti italiani e inglesi.

## Ortografia inglese

I contenuti di studio in inglese (`src/data.en.ts`, la parte inglese di `src/domainGuides.ts`,
`src/i18n.tsx` e `src/studyPaths.ts`) seguono l'ortografia americana degli obiettivi CompTIA:
*anomalous behavior recognition*, *defense in depth*, *authorization*. La documentazione del
repository può restare in inglese britannico.

| Da usare | Da evitare |
|---|---|
| -ize, -ization (organization, recognize, unauthorized) | `\b(?:un\|re\|de\|para)?(organ\|recogn\|author\|minim\|priorit\|categor\|normal\|standard\|optim\|summar\|central\|synchron\|virtual\|special\|sanit\|initial\|character\|memor\|penal\|real\|maxim\|analy\|annual\|formal\|general\|material\|parallel\|militar\|token)[sz]?is(e\|ed\|es\|ing\|ation\|ations\|ational\|able)\b\|\banalys(e\|ed\|ing)\b` |
| behavior, color, unfavorable, labor, neighbor | `\b(?:un)?(behavi\|col\|fav\|lab\|neighb\|harb)our` |
| center, defense, offense, license | `\b(centre\|defence\|offence\|licence)s?\b` |
| catalog, gray, judgment, artifact, kilometer, paralyzed, preemptive | `\b(catalogue[sd]?\|grey\|judgement\|artefacts?\|(?:centi\|kilo\|milli)?metres?\|paralys(?:e\|ed\|es\|ing)\|pre-empt\w*)\b` |
| labeled, traveling, signaling, leveling | `\b(label\|travel\|signal\|level\|cancel\|model)l(ed\|ing)\b` |

## Sigle

- Alla prima occorrenza in una sottovoce, nome per esteso e sigla fra parentesi: «Multifactor
  Authentication (MFA)». Poi solo la sigla.
- Le sigle sono in maiuscolo e senza punti (MFA, non M.F.A.); il plurale non prende la *s* in
  italiano («gli IDS»), la prende in inglese (*IDSs* solo se serve, meglio riformulare).
- Una sigla ambigua (MAC: Media Access Control o Mandatory Access Control) si scioglie sempre.

## Maiuscole e punteggiatura

- Titoli con la sola iniziale maiuscola: «Gestione del rischio», non «Gestione Del Rischio».
  Le etichette dei callout sono fisse e vanno scritte come in `CONTRIBUTING.md`.
- I termini inglesi dentro una frase italiana restano in minuscolo (*allow list*, *on-path*),
  salvo nomi propri e sigle.
- Citazioni e parole usate come esempio fra virgolette basse «…» nei documenti; nei dataset
  sono ammesse le virgolette dritte, già usate nelle stringhe.
- Codice, comandi, nomi di file e campi fra backtick: `nmap -sV`, `checklistKey`.

## Numeri e date

- Date in formato ISO `AAAA-MM-GG` in registri, roadmap ed errata; per esteso («27 settembre
  2026») solo nel testo discorsivo.
- In italiano la virgola separa i decimali e il punto le migliaia (1.348 unità; 99,9%); in
  inglese il contrario (1,348; 99.9%).
- Le formule si scrivono per intero, con le sigle definite: `ALE = SLE × ARO`.

## Esempi e nomi

- Solo nomi di dominio riservati (`example.com`, `*.example`, `*.test`) e aziende di fantasia,
  come Kestrelia; nessuna persona reale come vittima o come colpevole.
- Nessuna emoji come unica informazione e link che dicono dove portano: vedi i punti 8 e 9 delle
  regole sui contenuti in [`CONTRIBUTING.md`](../CONTRIBUTING.md).

## Divulgazione progressiva

Il contenuto principale si legge senza aprire nulla; il resto si apre su richiesta, sempre nello stesso modo.

| Livello | Che cosa contiene | Come appare |
| --- | --- | --- |
| 1. Pannello | Un blocco intero: la guida di dominio, «Da dove comincio», «Preparazione all'esame» | Riquadro con titolo e freccia, chiuso finché non serve |
| 2. Approfondimento | Ciò che va oltre il nucleo: collegamenti tra domini, confronti, «Esame e realtà», fonti, termini del glossario, tabella di tutti gli obiettivi | `<Disclosure variant="deepen">`, con l'etichetta «Approfondimento» e il nome di ciò che contiene |
| 3. Risposta | Il ragionamento di un esercizio | `<Disclosure variant="answer">`, «Mostra il ragionamento» |

- **Nucleo di un concetto:** definizione, analisi con l'esempio pratico, formule, tabella comparativa e suggerimento d'esame. Restano sempre aperti.
- **Nucleo di una guida:** scopo, obiettivi, percorso di studio, pattern decisionali, errori comuni, scenario applicativo, esercizi guidati e riepilogo di fine modulo.
- Un approfondimento dice sempre che cosa contiene: niente pulsanti «Altro» generici.
- L'indice della guida apre l'approfondimento che raggiunge e porta il focus sul suo titolo.
- Un nuovo contenuto piegato usa `Disclosure`; `tests/disclosure.test.tsx` rifiuta un nuovo `<details>` scritto a mano fuori dai pannelli di primo livello.

## Traduzioni approvate

| Italiano | Inglese | Nota |
|---|---|---|
| Trappola d'esame | Exam trap | Etichetta del callout «esame» |
| Piccolo Esempio Concentrato | Focused Mini-Example | Etichetta del callout «pratica» |
| Da ricordare | Remember | Etichetta del callout «nota» |
| Pericolo | Danger | Etichetta del callout «attenzione» |
| vestibolo di controllo accessi | access control vestibule | Non *mantrap* |
| sanitizzazione dei supporti | media sanitization | Non «sanificazione» |
| separazione dei compiti | separation of duties | |
| minimo privilegio | least privilege | |
| difesa in profondità | defense in depth | |
| propensione al rischio / tolleranza al rischio | risk appetite / risk tolerance | Livello strategico / operativo |
| titolare del dato / custode del dato | data owner / data custodian | |
| Trainer AI | AI Trainer | Nome della funzione nell'interfaccia |
