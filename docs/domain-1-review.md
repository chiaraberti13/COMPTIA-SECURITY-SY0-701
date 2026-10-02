# Rapporto di revisione — Dominio 1

**Data:** 2026-10-02. **Base:** `e09342f` (`main`, dopo PR #80).
**Revisore:** Codex, analisi assistita dall'AI. **Validazione umana:** da eseguire.

## Esito

Il primo passaggio rileva **sei problemi tecnici/didattici** e un refuso nel
materiale collocato nel Dominio 1. Le correzioni sono applicate in IT e EN;
identificatori, risposte attese e progressi salvati restano compatibili.
I 28 obiettivi del registro mantengono `needs-review`: questo rapporto non
attribuisce una revisione umana a Chiara e non certifica l'assenza di altri errori.

## Perimetro e metodo

Inventario: **88 sottovoci e 110 domande** nel dataset del Dominio 1, oltre alla
guida degli obiettivi **1.1–1.4**. Alcune voci IAM collocate qui appartengono
all'obiettivo 4.6 e alcune domande sono mappate ad altri domini: collocazione
nell'interfaccia e copertura ufficiale non sono la stessa cosa.

Il passaggio confronta struttura, definizioni, testi delle domande e risposte
attese; approfondisce le affermazioni problematiche con NIST/IETF e controlla
le correzioni nelle due lingue. Non equivale a una verifica indipendente,
fonte per fonte, di ogni frase delle 110 spiegazioni o a una prova con studenti.
Le guide e i test di integrità forniscono evidenza strutturale, non una garanzia
di accuratezza semantica.

## Risultati per obiettivo

| Obiettivo | Valutazione del primo passaggio | Azione |
|---|---|---|
| 1.1 — Controlli | Categorie e funzioni distinte; già chiarito il ruolo compensativo del firewall | Confermare gli esempi durante la revisione umana |
| 1.2 — Principi | Zero Trust distingue decisione e trasporto; restavano assoluti sul vestibolo e sul non ripudio | Correzioni R3 e R4 |
| 1.3 — Change management | Guida strutturata con approvazione, impatto, test, backout, finestre e documentazione | Nessuna nuova correzione tecnica in questo passaggio; resta la validazione umana |
| 1.4 — Crittografia | Diverse spiegazioni ancora incoerenti con distinzioni già corrette nel glossario | Correzioni R1, R2, R5 e R6 |

## Problemi e correzioni

| ID | Dove | Problema prima della correzione | Correzione | Priorità |
|---|---|---|---|---|
| R1 | `WildcardCertificates` | La definizione includeva il dominio principale nella copertura del wildcard | `*.azienda.example` non copre `azienda.example` né `sub.mail.azienda.example`; occorre un SAN separato | Alta |
| R2 | `BlockCipherConcept`, `D1#131` | Padding presentato come necessario per ogni uso di un cifrario a blocchi; latenza usata come motivo universale | Padding distinto dalla primitiva; CTR/GCM gestiscono un ultimo blocco parziale. La risposta dipende dal requisito esplicito bit/byte | Alta |
| R3 | `AccessControlVestibule` | Interblocco descritto come garanzia assoluta di passaggio individuale | Esplicitati progetto, rilevamento della presenza e limiti; il solo interblocco non garantisce una persona alla volta | Media |
| R4 | `D1#44` | Firma descritta come prova inconfutabile della persona e impedimento assoluto alla contestazione | Prova dell'origine dalla chiave; associazione al titolare, custodia e log restano necessari | Alta |
| R5 | `D1#147` | Firma ancora spiegata come cifratura con chiave privata | Distinte firma/verifica da cifratura/decifratura; risposta A invariata | Alta |
| R6 | `D1#221` | Scelta CRL/OCSP basata sull'assenza del nome del certificato; revoca confusa con validità complessiva | Scenario con emittente, seriale e requisito di elenco firmato; chiariti limiti del controllo di revoca | Alta |
| L1 | `PasswordPoliciesAccount` | «ciclo di vida» | «ciclo di vita» | Bassa |

Il controllo italiano esteso al resto del corpus ha inoltre individuato
«contraffando» e «dati meno accessati», corretti rispettivamente in
«contraffacendo» e «dati consultati meno frequentemente», e «Non-Repudio»,
corretto in «Non-Ripudio». Non sono conteggiati come nuovi problemi tecnici.

## Fonti del confronto

- [NIST SP 800-53 Rev. 5](https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final): controlli CM, PE, AU e loro finalità; non impone la tassonomia didattica CompTIA.
- [NIST SP 800-207](https://csrc.nist.gov/pubs/sp/800/207/final): Zero Trust, PE/PA/PEP e separazione logica dei piani.
- [NIST SP 800-38A](https://csrc.nist.gov/pubs/sp/800/38/a/final): modalità di cifratura a blocchi, incluso CTR.
- [NIST SP 800-57 Part 1 Rev. 5](https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final): proprietà e gestione delle chiavi.
- [RFC 9525, §4.3](https://www.rfc-editor.org/rfc/rfc9525): corrispondenza dei nomi wildcard.
- [RFC 6960, §2 e §4.1.1](https://www.rfc-editor.org/rfc/rfc6960): identificazione del certificato e stato OCSP.

La pagina CompTIA tentata durante questo passaggio non è risultata accessibile:
la struttura 1.1–1.4 è quella già documentata nel repository. Non si dichiara
una nuova verifica completa del PDF ufficiale degli obiettivi.

## Verifiche tecniche

- TypeScript, ESLint e lint Markdown superati.
- 1.764 unità di testo controllate per ciascuna lingua.
- 413 test superati, incluse soglie di copertura, integrità dei dataset,
  parità IT/EN e prove del controllo ortografico con refusi introdotti.
- Build di produzione e smoke test riusciti; `tsx` avviato tramite
  `node --import tsx` per un limite IPC dell'ambiente locale.
- E2E/axe e controlli GitHub della PR restano da eseguire in CI.

## Per la validazione umana

- [ ] Confermare le sei correzioni e le traduzioni.
- [ ] Controllare sistematicamente tutte le spiegazioni e i distrattori 1.1–1.4.
- [ ] Esaminare gli assoluti residui negli esempi (in particolare sicurezza fisica,
      prestazioni dei cifrari, firma e attribuzione dell'identità).
- [ ] Registrare data e revisore in `src/contentReview.ts` solo dopo il controllo.

## English review summary

This is an AI-assisted first pass over the Domain 1 inventory (88 concepts,
110 questions and the guide for objectives 1.1–1.4), not human sign-off or a
sentence-by-sentence certification. Six technical/educational issues were fixed
in both languages: wildcard scope, padding versus block cipher modes, vestibule
limitations, evidence supporting non-repudiation, signing versus encryption,
and the CRL/OCSP question. Answer indices and content identifiers are unchanged.
All objective review states remain `needs-review`. The official CompTIA page
was unavailable during this pass; objective mapping follows the existing project
inventory. Human review of all explanations and distractors remains outstanding.
