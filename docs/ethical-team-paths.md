# Percorsi Blue Team e Red Team / Ethical team paths

Owner: repository maintainer. Verifica / reviewed: 2026-10-05. Prossima revisione / next review: 2027-04-05.

## Italiano

Nell'app apri «Da dove inizio?» e scegli Blue Team o Red Team. Prerequisiti: basi dei Domini 2 e 4,
lettura dei log e strumenti richiesti dal preflight di ciascun laboratorio. Livello: introduttivo.
Risultato: associare lo stesso comportamento a un controllo preventivo, a una fonte di rilevazione
e a una verifica autorizzata, distinguendo evidenze, ipotesi e limiti.

I due percorsi condividono gli obiettivi 5.5, 4.6, 4.9, 4.4 e 4.8 e gli stessi casi sintetici.
Blue Team parte dai controlli e dalla telemetria; Red Team parte dalla verifica dei controlli.
Le azioni nell'app aprono la guida dell'obiettivo. I laboratori si eseguono localmente, seguendo
setup, preflight e cleanup dei rispettivi documenti; non sono eseguiti dal browser.

| Concetto | Prevenzione | Rilevazione | Validazione autorizzata | Laboratorio |
|---|---|---|---|---|
| Abuso di identità | MFA, minimo privilegio | Fallimenti e accessi nei log | Confrontare tracce sintetiche e risultati attesi | [Lab 03](../labs/03-log-analysis/README.md), [Lab 10](../labs/10-attack-to-defense/README.md) |
| Esposizione di servizi | Limitare accessi e richieste | Regole per ricognizione ed esportazione | Verificare rifiuti e limiti sul servizio locale | [Lab 10](../labs/10-attack-to-defense/README.md) |
| Correlazione e risposta | Ridurre privilegi e superficie | Correlare identità, rete ed endpoint | Ripetere la verifica dopo la correzione | [Lab 11](../labs/11-telemetry-views/README.md), [Lab 06](../labs/06-incident-triage/README.md) |

Prima di iniziare: autorizzazione scritta, sistemi consentiti, finestra di prova, condizioni di arresto
e ripristino concordati. Solo dati sintetici e ambiente isolato; nessun bersaglio pubblico.
Segui le [regole dei laboratori](../labs/README.md) e il [manager locale](labs-on-demand.md).
Se l'ambiente non rispetta il preflight o il risultato differisce da quello previsto, fermati.
Alla fine esegui il cleanup e verifica che servizi e sessioni siano terminati.

Verifica di apprendimento: per ogni riga consegna controllo scelto e motivazione, fonte e limite
della telemetria, risultato atteso e osservato, falso positivo o punto cieco, azione di risposta
e risultato del cleanup. Superi la verifica se tutte le scelte sono sostenute dalle evidenze del lab;
una traccia assente non dimostra da sola che un controllo sia efficace.

Per SY0-701 concentrati sulla scelta e sul ruolo dei controlli. Queste prove introduttive non
simulano un incarico Red Team completo né sostituiscono una valutazione professionale.

## English

In the app open “Where do I start?” and select Blue Team or Red Team. Prerequisites: basics of
Domains 2 and 4, log reading and the tools required by each lab preflight. Level: introductory.
Outcome: connect the same behavior to a preventive control, a detection source and an authorized
validation, distinguishing evidence, hypotheses and limitations.

Both paths share objectives 5.5, 4.6, 4.9, 4.4 and 4.8 and the same synthetic cases. Blue Team starts
with controls and telemetry; Red Team starts with control validation. App actions open the objective
guide. Labs run locally using their documented setup, preflight and cleanup, never in the browser.

| Concept | Prevention | Detection | Authorized validation | Lab |
|---|---|---|---|---|
| Identity abuse | MFA, least privilege | Failed and successful sign-ins in logs | Compare synthetic traces with expected results | [Lab 03](../labs/03-log-analysis/README.en.md), [Lab 10](../labs/10-attack-to-defense/README.en.md) |
| Service exposure | Limit access and requests | Reconnaissance and export rules | Verify denials and limits on the local service | [Lab 10](../labs/10-attack-to-defense/README.en.md) |
| Correlation and response | Reduce privileges and attack surface | Correlate identity, network and endpoint | Repeat validation after remediation | [Lab 11](../labs/11-telemetry-views/README.en.md), [Lab 06](../labs/06-incident-triage/README.en.md) |

Before starting: agree written authorization, allowed systems, testing window, stop conditions and
recovery. Synthetic data and isolated environments only; no public targets. Follow the
[lab rules](../labs/README.md) and [local manager](labs-on-demand.md). Stop if preflight fails or
observations differ from expectations. Finish with cleanup and verify services and sessions ended.

Learning check: for each row provide the chosen control and rationale, telemetry source and limit,
expected and observed result, false positive or blind spot, response action and cleanup result.
Pass when every choice is supported by lab evidence; an absent trace alone does not prove effectiveness.

For SY0-701 focus on selecting controls and understanding their roles. These introductory exercises
do not simulate a complete Red Team engagement or replace a professional assessment.
