# Configurable exam simulator / Simulatore d’esame configurabile

Owner: maintainers · Reviewed / Verificato: 2026-10-05 · Next review / Prossimo controllo: 2027-01-05.

## Italiano

Prerequisiti: familiarità con i cinque domini SY0-701 e con gli scenari PBQ originali dell’app. Livello: applicazione e analisi. Risultati: gestire tempo e revisione delle risposte, applicare controlli a scenari e identificare obiettivi da ristudiare.

Nel **Simulatore**, scegli una lunghezza suggerita (20/45/65/90) per applicare i pesi ufficiali oppure modifica i cinque conteggi per dominio. La sezione **Modalità esame: MCQ e PBQ** usa questi stessi conteggi, con un totale ammesso da 1 a 90. Scegli quante PBQ includere: la disponibilità dipende dai domini e dagli spazi selezionati. Una PBQ sostituisce una MCQ nel proprio dominio: non aumenta il totale e non altera la distribuzione. Puoi anche scegliere zero PBQ o una sessione di sole PBQ. Nessun elemento viene estratto due volte.

Il timer è facoltativo e assegna un minuto per elemento del totale (90 elementi = 90 minuti). È una scelta didattica per le simulazioni brevi; il tempo non indica quanto dedicare a ciascuna PBQ. Continua anche cambiando scheda dell’app, lingua o scheda del browser; la scadenza usa l’orologio reale e consegna tutte le risposte. Le domande incomplete o mancanti valgono zero. La sessione attiva resta in memoria: un ricaricamento o un aggiornamento dell’app la interrompe. Con la copia offline pronta, configurazione, sessione e report funzionano senza rete; la nuova modalità non chiama servizi AI.

Le PBQ vengono presentate per prime, poi le MCQ mescolate. Usa **Precedente**, **Successiva / salta** e i pulsanti numerati per navigare, correggere e tornare alle risposte; **Segna per revisione** aggiunge una stella. Un segno di spunta indica una risposta completa, non necessariamente corretta. Per ordinare usa i pulsanti su/giù; per abbinare usa i menu con etichette. Non sono richiesti trascinamento o scorciatoie globali. Domande, risposte e segnali restano invariati passando tra IT e EN.

**Consegna e termina** mostra esplicitamente quante risposte sono incomplete; termina subito la sessione. Spiegazioni e soluzioni compaiono solo dopo la consegna. Il report comprende punteggio, risultati per dominio e per obiettivo (anche se l’obiettivo compare solo in una PBQ), parti corrette nelle PBQ e revisione di ciascuna risposta. Una MCQ associata a più obiettivi contribuisce a ciascuno: i totali degli obiettivi possono superare il totale delle domande. I collegamenti aprono le guide da ristudiare. Puoi ripetere l’estrazione o modificare la configurazione.

Il punteggio locale assegna **un punto per ogni MCQ o PBQ interamente corretta**, con traguardo didattico dell’80%; le parti corrette delle PBQ sono diagnostiche e non danno punti frazionari nello storico. Non riproduce il punteggio scalato, i pesi interni o la soglia ufficiale CompTIA. Gli scenari sono originali: non sono domande reali né exam dump. L’allenamento precedente con feedback immediato resta disponibile tramite **Avvia Simulatore**.

Al termine viene salvata una sola voce nello storico esistente (ultime 20 sessioni). Solo le MCQ aggiornano i progressi e il ripasso dilazionato; gli identificativi PBQ non entrano in quel registro. Il report dettagliato resta nella sessione in memoria. Il formato persistito non cambia: importazione, esportazione, cancellazione e vecchi risultati restano compatibili.

## English

Prerequisites: familiarity with the five SY0-701 domains and the app’s original PBQ scenarios. Level: application and analysis. Outcomes: manage time and answer review, apply controls to scenarios and identify objectives to revisit.

In the **Simulator**, choose a suggested length (20/45/65/90) to apply the official weights or edit the five domain counts. **Exam mode: MCQs and PBQs** uses those same counts, with a total from 1 to 90. Choose the number of PBQs: availability depends on selected domains and slots. Each PBQ replaces an MCQ in its own domain, keeping the total and distribution intact. Zero PBQs and PBQ-only sessions are supported. No item is drawn twice.

The optional timer allows one minute per item in the total (90 items = 90 minutes). This is a practice choice for short simulations, not an allowance for each individual PBQ. It keeps running across app tabs, language changes and browser tabs; its real clock deadline submits all answers on expiry. Incomplete or missing answers score zero. Active sessions stay in memory: reloading or updating the app ends them. Once the offline copy is ready, configuration, sessions and reports work without a network; the new mode makes no AI calls.

PBQs appear first, followed by shuffled MCQs. Use **Previous**, **Next / skip** and the numbered buttons to navigate, edit and revisit answers; **Flag for review** adds a star. A check mark indicates a complete answer, not necessarily a correct one. Ordering uses up/down buttons; matching uses labelled menus. Dragging and global shortcuts are not required. Questions, answers and flags remain unchanged when switching between IT and EN.

**Submit and finish** explicitly shows the number of incomplete answers and ends the session immediately. Explanations and solutions appear only after submission. Reports include score, domain and objective results (including objectives appearing only in PBQs), correct PBQ parts and each answer’s review. An MCQ mapped to several objectives contributes to each, so objective totals can exceed the question total. Links open the relevant study guides. You can draw another exam or change the configuration.

Local scoring awards **one point per fully correct MCQ or PBQ**, with an 80% practice target; correct PBQ parts are diagnostic and do not earn fractional history points. It does not reproduce CompTIA’s scaled score, internal weights or official passing mark. Scenarios are original, not real exam questions or exam dumps. Existing immediate-feedback training remains available through **Start Simulator**.

Completion saves exactly one entry in the existing history (latest 20 sessions). Only MCQs update question progress and spaced review; PBQ identifiers never enter that register. Detailed reports stay in the in-memory session. The persisted format is unchanged: import, export, deletion and older results remain compatible.

## Sources / Fonti

The [official SY0-701 objectives, version 6.0](https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-security-sy0-701-exam-objectives-%286-0%29.pdf?sfvrsn=204179cc_6), test details and domains, specify at most 90 multiple-choice/performance-based questions in 90 minutes and domain weights 12/22/18/28/20%. They do not prescribe the app’s PBQ count or practice scoring. Verified 2026-10-05.

## Verification / Verifica

- `tests/exam.test.ts`: assembly, exact domain distribution, unique items, limits, grading and objective aggregation.
- `tests/useExamSession.test.tsx`: navigation, editing, deadline expiry, single recording, language parity and compatible persistence.
- `e2e/exam.spec.ts`: mixed and PBQ-only sessions, keyboard controls, deferred feedback, offline use, IT/EN, history, responsive layout and axe WCAG A/AA checks, on desktop and phone.
