# Rapporto di revisione — Domini 1–5

**Data:** 2026-10-02. **Base:** `9433f9d`, `main` dopo PR #81.
**Revisore:** Codex, analisi assistita dall'AI. **Validazione umana:** aperta.

## Esito e perimetro

Il passaggio estende il rapporto del Dominio 1 a tutti e cinque i domini.
Le sei correzioni del [rapporto precedente](domain-1-review.md) sono già in
`main`. Questa estensione corregge **12 ulteriori problemi**, raggruppando sotto
un unico problema le occorrenze dello stesso errore in glossario, guida e quiz.
Le correzioni sono bilingui. Identificatori, indici delle risposte e compatibilità
con i progressi salvati non cambiano; nella domanda D3#576 cambia il testo
corretto dell'opzione B da technology forecasting a capacity planning.

| Dominio | Concetti attivi | Domande attive nel banco | Obiettivi della guida | Nuovi problemi |
|---|---|---|---|---|
| 1 — Concetti generali | 88 | 110 | 1.1–1.4 | 0; sei già corretti nella PR #81 |
| 2 — Minacce e mitigazioni | 74 | 133 | 2.1–2.5 | 3 |
| 3 — Architettura | 174 | 112 | 3.1–3.4 | 3 |
| 4 — Operazioni | 132 | 185 | 4.1–4.9 | 3 |
| 5 — Gestione e supervisione | 94 | 142 | 5.1–5.6 | 3 |
| **Totale** | **562** | **682** | **28** | **12 nuovi; 18 con il passaggio precedente** |

Il conteggio segue la collocazione nell'interfaccia; alcune voci, come la
sanitizzazione nel Dominio 5, supportano obiettivi di un altro dominio.
La [matrice](coverage-matrix.md) documenta la mappatura delle domande agli
obiettivi, che può essere multipla e quindi non si somma come il banco.

**Metodo:** inventario completo, controlli automatici di struttura, parità delle
lingue, risposte, analisi dei distrattori, copertura, esempi e ortografia;
lettura delle definizioni e dei punti problematici delle guide; approfondimento
mirato di domande e spiegazioni con errori o incoerenze. Sono state consultate
fonti primarie per i punti tecnici e normativi corretti.

**Limite:** non è una certificazione semantica di ogni frase delle 682
spiegazioni, una revisione umana o una verifica nuova di ogni collegamento e
fonte del corpus. Il PDF ufficiale CompTIA non è stato nuovamente verificato;
il perimetro degli obiettivi segue il registro del repository. Tutti i 28 stati
`needs-review` rimangono tali: non si attribuisce a Chiara una revisione che
non ha svolto. Il superamento dei test non prova l'assenza di altri errori tecnici.

## Problemi corretti

| ID | Dominio e contenuto | Problema | Correzione | Priorità |
|---|---|---|---|---|
| E1 | D2 `NationStateActor` | Risorse quasi illimitate e APT usato come sinonimo certo di Stato | Risorse avanzate come indizio, attribuzione basata su contesto; corretta anche «campaigns» in «campagne» | Media |
| E2 | D2 `RansomwareMalware` | Solo cifratura e pagamento in criptovalute; backup come difesa sufficiente | Inclusi blocco dei sistemi e limiti del backup rispetto all'esfiltrazione | Alta |
| E3 | D2#428 | Bluetooth descritto come tecnologia senza sicurezza; discoverability confusa con accesso libero | Scenario PAN e pairing; Bluetooth supporta autenticazione e cifratura, sicurezza dipendente dalla configurazione | Alta |
| E4 | D3 `Layer4Transport` | Affidabilità e connessione attribuite all'intero livello 4 | Distinti TCP e UDP, senza garanzia di consegna o ordine per UDP | Alta |
| E5 | D3#545 | Journaling come recupero di ogni dato fino al punto esatto di guasto | Recupero di stato coerente delle operazioni registrate; ext4 normalmente registra metadati; backup ancora necessario | Alta |
| E6 | D3#576 | Domanda sulla capacità futura risolta con technology forecasting | Risposta B corretta in capacity planning, con spiegazione e traduzione | Alta |
| E7 | D4 `FirewallLogs` | Log come traccia di tutto il traffico | Copertura dipendente dal logging abilitato; nessuna presunzione di cattura completa | Media |
| E8 | D4 `DNSFilteringConcept` | Qualunque connessione richiederebbe una nuova query DNS; controllo universalmente efficace | Esplicitati resolver controllato, cache, IP diretto e resolver alternativi | Alta |
| E9 | D5 `QuantitativeRiskAssessmentConcept` | Calcolo economico presentato come previsione esatta e oggettiva | Stime, ipotesi e incertezza; formule SLE/ARO/ALE mantenute | Media |
| E10 | D5 `DataSovereigntyConcept`, guida D3 e spiegazione D3#559 | Giurisdizione esclusivamente determinata dalla residenza; cittadinanza come criterio GDPR nella guida | Distinti residenza, giurisdizioni e criteri extraterritoriali; artt. 3 e 44–49; cloud sovrano valutato sui requisiti concreti | Alta |
| E11 | D4#195, D4#209, D5 `MediaSanitizationRes`, catalogo fonti | Sanitizzazione contrapposta a Destroy; Clear sempre sufficiente nel riuso interno; riferimento NIST superato | Clear/Purge/Destroy come metodi di sanitizzazione; sensibilità, supporto, destinazione e validazione; fonte SP 800-88 Rev. 2 | Alta |
| E12 | D5 `DegaussingRes` e D4#195 | Degaussing distruggerebbe fisicamente testine/elettronica e ogni supporto sarebbe inutilizzabile | Campo adeguato alla coercitività, soli supporti magnetici; perdita delle tracce servo negli HDD distinta dalla distruzione fisica | Alta |

Per tutte le cinque domande riscritte sono esplicitate le ragioni per scartare
ciascun distrattore. Le traduzioni sono state rilette e i relativi fingerprint
aggiornati; il registro automatico non sostituisce una revisione linguistica umana.

## Valutazione per obiettivo e prossima verifica umana

Le righe senza un nuovo errore indicano cosa è stato esaminato e cosa resta da
confermare; non equivalgono a un obiettivo certificato corretto.

| Obiettivo | Valutazione e prossimo controllo |
|---|---|
| 1.1 | Distinzione fra categoria e funzione già documentata; verificare gli esempi con più funzioni |
| 1.2 | Vestibolo e non ripudio corretti nella PR #81; controllare gli assoluti negli esempi fisici e deception |
| 1.3 | Guida copre approvazione, impatto, test e backout; verificare ordine delle azioni nei quiz |
| 1.4 | Wildcard, padding, firma e CRL/OCSP già corretti; verificare freschezza e limiti del revocation checking |
| 2.1 | E1 limita l'attribuzione automatica di APT; verificare motivazioni multiple e indizi negli scenari |
| 2.2 | E3 elimina l'equivalenza Bluetooth = insicuro; verificare configurazione e condizioni nei vettori wireless |
| 2.3 | Distinzioni fra CVE, CVSS e priorità presenti; approfondire versioni e condizioni di sfruttamento |
| 2.4 | E2 chiarisce ransomware e doppia estorsione; gli IoC richiedono correlazione, non attribuzione certa |
| 2.5 | Mitigazioni e controlli compensativi presenti; verificare che isolamento e patching rispondano al requisito |
| 3.1 | E6 distingue capacity planning; responsabilità cloud da verificare rispetto al servizio concreto |
| 3.2 | E4 distingue TCP/UDP; completare controllo delle semplificazioni OSI e dei protocolli wireless |
| 3.3 | E10 allinea la guida sulla sovranità; verificare anche accessi amministrativi e trasferimenti |
| 3.4 | E5 limita il journaling; testare concettualmente perdita dati, copie e RTO/RPO negli scenari |
| 4.1 | Baseline, patch e hardening presenti; verificare compatibilità e dipendenze prima del deploy |
| 4.2 | E11/E12 correggono sanitizzazione e degaussing; validare le tecniche per supporto, non per nome del comando |
| 4.3 | Priorità distinta dal solo CVSS nella guida; verificare impatto operativo, esposizione e sfruttamento attivo |
| 4.4 | Log, SIEM e tuning presenti; verificare conseguenze contestuali dei falsi positivi e negativi |
| 4.5 | E8 esplicita i limiti del filtro DNS; verificare enforcement su resolver ed egress |
| 4.6 | IAM distribuito anche nel D1; confermare deprovisioning, sessioni, token e fattori distinti |
| 4.7 | Rischi dell'automazione esplicitati; verificare approvazioni, rollback e gestione degli errori |
| 4.8 | Catena di custodia e legal hold distinti; mantenere separato il modello didattico dalle revisioni NIST |
| 4.9 | E7 limita la copertura dei log firewall; verificare sorgenti mancanti, timestamp e correlazione |
| 5.1 | Ruoli e gerarchia documentale presenti; validare le responsabilità nel contesto organizzativo |
| 5.2 | E9 esplicita l'incertezza; mantenere corretta la distinzione fra frequenza, probabilità e impatto |
| 5.3 | Due diligence e monitoraggio distinti; verificare evidenze del fornitore e condizioni contrattuali |
| 5.4 | E10 elimina l'esclusività della giurisdizione fisica; revisione legale degli esempi concreti ancora necessaria |
| 5.5 | Audit, attestazioni e ambienti di test distinti; verificare perimetro, periodo e limiti delle evidenze |
| 5.6 | Awareness include segnalazione e formazione; verificare accessibilità, tono e misurazione con utenti reali |

## Ortografia italiana e licenze

Il controllo già integrato verifica **1.764 unità per lingua**, includendo tutte
le voci e domande attive, guide, interfaccia e percorsi. In questo passaggio sono
aggiunte solo forme nuove effettivamente introdotte e verificate, come
«datagrammi», «coercitività» e «extraterritoriali». Il lessico non viene rigenerato
automaticamente per accettare parole sconosciute.

Il vocabolario deriva dai testi MIT del progetto. Nessuna nuova dipendenza,
lista di terzi, licenza consentita o eccezione alla Dependency review è aggiunta.
I dizionari GPL non vengono importati. I due termini inglesi tecnici nuovi sono
aggiunti esplicitamente al lessico tecnico. Vedi [metodo e limiti](italian-spelling.md).
Il controllo non certifica grammatica, significato o ortografia di documenti
esterni al corpus estratto.

## Protezione di main

GitHub ha confermato **«Branch protection rule created»** il 2026-10-02 dopo la
verifica d'identità. La regola corrisponde esattamente a `main` e si applica a un
branch. La configurazione salvata richiede:

- pull request, branch aggiornato e conversazioni risolte;
- `Typecheck, lint, test, build, smoke (Node 22)`;
- `Typecheck, lint, test, build, smoke (Node 24)`;
- `End-to-end (Playwright, axe)`;
- `Dependency audit (npm)`;
- `Secret scan (gitleaks)`.

I cinque check accettano risultati da GitHub Actions. `Require approvals`,
Code Owners obbligatori e approvazione dell'ultimo push sono disattivati:
**non occorre un secondo revisore**. La regola vale anche per gli amministratori;
force push e cancellazione non sono consentiti. I controlli tecnici obbligatori
non vengono confusi con la validazione umana dei contenuti.

## Fonti verificate per le nuove correzioni

- [NIST — Advanced Persistent Threat](https://csrc.nist.gov/glossary/term/advanced_persistent_threats): caratteristiche della minaccia; la sola sigla non attribuisce lo sponsor.
- [NIST SP 800-92](https://csrc.nist.gov/pubs/sp/800/92/final): gestione e configurazione dei log.
- [CISA — Protective DNS](https://www.cisa.gov/sites/default/files/publications/PDNS%20Fact%20Sheet%20Updated_508c.pdf): controllo sui servizi DNS.
- [CISA — StopRansomware Guide](https://www.cisa.gov/stopransomware/ransomware-guide): prevenzione e ripristino, distinti dal rischio di esfiltrazione.
- [NIST SP 800-121 Rev. 2, aggiornamento 1](https://csrc.nist.gov/pubs/sp/800/121/r2/upd1/final): Bluetooth e proprietà di sicurezza.
- [RFC 768](https://www.rfc-editor.org/rfc/rfc768): limiti di consegna di UDP.
- [Linux kernel — ext4 journal](https://docs.kernel.org/filesystems/ext4/journal.html): metadati e limiti del recupero dopo crash.
- [Microsoft — Capacity planning](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/capacity-planning): domanda futura e dimensionamento.
- [NIST SP 800-30 Rev. 1](https://csrc.nist.gov/pubs/sp/800/30/r1/final): stima del rischio e assunzioni.
- [EDPB — ambito territoriale GDPR, linee guida 3/2018](https://www.edpb.europa.eu/documents/guideline/guidelines-32018-on-the-territorial-scope-of-the-gdpr-article-3-version-adopted_en): criteri territoriali; la pagina EUR-Lex tentata non era leggibile dal servizio di ricerca.
- [NIST SP 800-88 Rev. 2](https://csrc.nist.gov/pubs/sp/800/88/r2/final): riferimento corrente, pubblicato il 26 settembre 2025, sostituisce Rev. 1.

## Verifiche

- TypeScript ed ESLint superati.
- Lint Markdown e spellcheck: 1.764 testi IT e 1.764 EN, senza errori.
- 413 test superati in 51 file, incluse soglie di coverage, integrità dei
  dataset, analisi di ogni distrattore e parità delle traduzioni.
- Build di produzione, precompressione e smoke test superati.
- Script `tsx` eseguiti con `node --import tsx` per il limite IPC locale.
- La CI della PR #81 è risultata verde (Docs, CI e Security). I check della
  nuova PR, inclusi E2E/axe, vanno verificati sul nuovo commit.

## English summary

AI-assisted review across all five domains: 562 active concepts, 682 active
questions and 28 objective guides. Twelve additional issue groups were corrected
in both languages, following six Domain 1 fixes already merged in PR #81.
The complete inventory receives structural and language checks; semantic review
of explanations is targeted, not sentence-by-sentence certification. All human
review states remain `needs-review`. Italian spelling covers the full extracted
study corpus with project-owned MIT vocabulary and unchanged dependency-license
policy. Main protection was saved with five mandatory GitHub Actions checks,
up-to-date branches and resolved conversations, without required approvals.
