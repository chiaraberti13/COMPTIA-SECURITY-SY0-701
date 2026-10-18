# PBQ 403 — Intestazioni email e DMARC / Email headers and DMARC

PBQ originale IT/EN di interpretazione con abbinamento: obiettivo **4.5**, collegamento **2.2**. ID 403, meccanica `matching`, tema `log`; nessun nuovo motore.

Original IT/EN interpretation PBQ using matching: objective **4.5**, related objective **2.2**. ID 403, `matching` mechanic, `log` theme; no new engine.

## Premesse / Assumptions

Il gateway fidato di Kestrelia ha già verificato SPF e DKIM. Ogni riga contiene estratti From/DKIM e il MAIL FROM della sessione SMTP: quest’ultimo è l’envelope sender, non il display name. Un solo dominio From, MAIL FROM non vuoto, una firma DKIM per messaggio; nessun errore DNS/sintattico o altra firma da inferire. Policy effettiva già determinata per ogni From. Dati sintetici nei domini documentali `example.com` e `example.net`.

Kestrelia’s trusted gateway has already checked SPF and DKIM. Each row contains From/DKIM excerpts and the SMTP session MAIL FROM: the latter is the envelope sender, not the display name. One From domain, nonempty MAIL FROM and one DKIM signature per message; no DNS/syntax errors or other signatures to infer. The effective policy for each From is already determined. Synthetic data uses documentation domains `example.com` and `example.net`.

Strict (`aspf=s`, `adkim=s`) richiede domini identici; relaxed (`r`) richiede lo stesso Organizational Domain già determinato. Nell’esercizio gli Organizational Domain sono `example.com` ed `example.net`: non si implementa la scoperta DNS prevista dalla specifica. Risultato valido **e** allineamento sono entrambi necessari per il singolo meccanismo; basta **uno** fra SPF e DKIM per DMARC=pass.

Strict (`aspf=s`, `adkim=s`) requires identical domains; relaxed (`r`) requires the same already determined Organizational Domain. The exercise uses `example.com` and `example.net` as those domains; it does not implement the specification’s DNS discovery. A valid result **and** alignment are required for an individual mechanism; **one** of SPF or DKIM is enough for DMARC=pass.

## Evidenze e risultati / Evidence and outcomes

I domini nella tabella provengono dagli indirizzi From e MAIL FROM completi nelle righe della PBQ. Ogni riga dichiara la propria policy e modalità.

Domains below come from the full From and MAIL FROM addresses in the PBQ rows. Each row states its own policy and alignment mode.

| Caso / Case | From domain | MAIL FROM domain; SPF | DKIM d=; result | aspf/adkim; p | DMARC |
| --- | --- | --- | --- | --- | --- |
| A | example.com | mailer.example.net; pass | example.com; fail | s/s; reject | fail |
| B | example.com | mailer.example.net; pass | example.com; pass | s/s; reject | pass via DKIM |
| C | example.com | example.com; fail | example.net; pass | s/s; reject | fail |
| D | news.example.com | mailer.example.com; pass | example.net; fail | r/r; quarantine | pass via SPF |
| E | news.example.com | mailer.example.com; pass | sign.example.com; pass | s/s; reject | fail |
| F | news.example.com | news.example.com; pass | example.net; fail | s/s; reject | pass via SPF |

## Chiave stabile / Stable key

| Prompt ID | Option ID | Motivazione / Reason |
| --- | --- | --- |
| `p_message_a` | `fail_spf_unaligned` | Valid SPF unaligned; aligned DKIM invalid |
| `p_message_b` | `pass_dkim` | Valid and strictly aligned DKIM is sufficient |
| `p_message_c` | `fail_dkim_unaligned` | Valid DKIM unaligned; aligned SPF invalid |
| `p_message_d` | `pass_relaxed_spf` | Valid SPF shares the Organizational Domain |
| `p_message_e` | `fail_strict` | Both checks valid, neither domain strictly aligned |
| `p_message_f` | `pass_strict_spf` | Valid strictly aligned SPF is sufficient |
| `p_disposition` | `reject_request` | p=reject requests rejection; receiver retains discretion |
| `p_limits` | `pass_not_safety` | Domain authorization does not guarantee harmless content or delivery |

Cinque distrattori rappresentano SPF valido senza allineamento, richiesta errata di entrambi i controlli, confusione strict/relaxed, rifiuto garantito e pass equiparato a messaggio sicuro. La spiegazione motiva tutti gli otto abbinamenti. `p=none` non richiede una disposizione DMARC; `quarantine` e `reject` sono preferenze sui fail, non una garanzia di gestione identica fra destinatari. Un pass può comunque essere filtrato; un fail può essere accettato per policy locale.

Five distractors represent valid SPF without alignment, incorrectly requiring both checks, strict/relaxed confusion, guaranteed rejection and equating a pass with safe mail. The explanation covers all eight matches. `p=none` requests no DMARC disposition; `quarantine` and `reject` express failure-handling preferences, not a guarantee of identical receiver behavior. A pass may still be filtered; a fail may be accepted under local policy.

## Regressioni e verifica / Regressions and verification

Otto punti diagnostici; tutti corretti per superare la PBQ. In esame vale un punto di pratica, senza riprodurre lo scoring proprietario CompTIA. Reset conserva la selezione degli scenari e cancella le risposte. Navigazione e cambio lingua mantengono le risposte dell’esame; il risultato concluso persiste nello storico locale. Le bozze di pratica non sopravvivono al ricaricamento.

Eight diagnostic points; all must be correct to pass. Exam mode awards one practice point without reproducing proprietary CompTIA scoring. Restart preserves scenario selection and clears answers. Navigation and language changes retain exam answers; the completed result persists in local history. Practice drafts do not survive reloads.

Vitest verifica chiave indipendente, errori singoli, coerenza delle evidenze con una valutazione indipendente dell’allineamento, fatti IT/EN, obiettivi/fonti, reset e storico dopo rimontaggio. Il controllo dei domini documentali nel test non è un algoritmo DNS per produzione. Playwright verifica tastiera, feedback, reset, cambio lingua, navigazione, storico dopo ricaricamento, axe e overflow su desktop/mobile. I test di inclusione esame usano il numero attuale delle PBQ del dominio 4.

Vitest checks an independent key, individual mistakes, evidence consistency with independent alignment evaluation, IT/EN facts, objectives/sources, restart and history after remount. Documentation-domain handling in the test is not a production DNS algorithm. Playwright checks keyboard operation, feedback, restart, language changes, navigation, history after reload, axe and overflow on desktop/mobile. Exam inclusion tests use the current domain-4 PBQ count.

I quesiti 40190, 40406 e 40200 mantengono ID, opzioni e risposta: le spiegazioni IT/EN precisano dominio d=, integrità delle parti firmate, strict/relaxed, disposizione locale e rollout graduale senza una sequenza obbligatoria universale.

Questions 40190, 40406 and 40200 retain IDs, options and answers: IT/EN explanations clarify the d= domain, signed-part integrity, strict/relaxed, local disposition and gradual rollout without a universal mandatory sequence.

## Fonti primarie / Primary sources

Verificate / Verified: **2026-10-08**.

- [RFC 9989 — DMARC](https://datatracker.ietf.org/doc/html/rfc9989), §4.4, §5.3.5, §5.3.6 e §5.4: allineamento, esito e discrezionalità del destinatario / alignment, outcome and receiver discretion. Sostituisce / Obsoletes RFC 7489.
- [RFC 7208 — SPF](https://datatracker.ietf.org/doc/html/rfc7208): identità SMTP e risultati SPF / SMTP identities and SPF results.
- [RFC 6376 — DKIM](https://datatracker.ietf.org/doc/html/rfc6376): dominio firmatario e verifica delle parti firmate / signing domain and verification of signed parts.
