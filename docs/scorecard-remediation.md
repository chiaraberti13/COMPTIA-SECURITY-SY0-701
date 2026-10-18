# Scorecard: correzioni e requisiti / remediation and requirements

## Italiano

Questo registro distingue correzioni nel repository, impostazioni GitHub e requisiti esterni. Non sopprimere gli avvisi e non dichiarare pratiche mai svolte. Fonte: [criteri ufficiali OpenSSF Scorecard](https://github.com/ossf/scorecard/blob/main/docs/checks.md).

### Controlli tecnici

- **Vulnerabilities:** rimosso `markdownlint-cli2`, mantenendo `markdownlint` 0.41.1 e le stesse regole in `.markdownlint.json`. `scripts/lint-markdown.ts` controlla i Markdown nella radice e in `docs`, `datasets`, `labs`, `.github`; esclude dipendenze, build e symlink. `braces`, `micromatch` e `fast-glob` non sono più necessari. Verificare con `npm audit --audit-level=low` e `npm ls braces micromatch fast-glob`.
- **Fuzzing:** sei proprietà con `fast-check` in `tests/securityFuzz.test.ts`, 1.000 casi per proprietà, incluse nella normale CI: backup malformati, salvataggi sanitizzati, limiti e ruoli delle API, budget dei topic, tag dei prompt con Unicode e confronto dei token. Eseguire `npm run test:fuzz`; in caso di errore usare seed e percorso di riduzione riportati da fast-check per riprodurre il caso e conservarlo come regressione. Verificare che Scorecard rilevi l'integrazione dopo il push.
- **SAST:** CodeQL è attivo su push, PR e scansioni settimanali. Scorecard valuta anche i controlli sui commit delle PR già unite: un job Actions verde non basta se manca il relativo check di code scanning. Controllare i check sullo SHA della PR e rieseguire l'analisi reale quando il risultato manca; non creare check artificiali né riscrivere la storia per migliorare il punteggio.
- **Prevenzione:** il workflow Security controlla sia le dipendenze di produzione sia l'intero lockfile, incluse quelle di sviluppo, senza ignorare gli errori dell'audit.

### Impostazioni ed evidenze esterne

| Requisito | Intervento concreto | Stato e limite |
|---|---|---|
| Branch-Protection | Applicare [il ruleset preparato](../.github/main-ruleset.json) a `main`: bloccare cancellazione e force push, senza attori esentati. In GitHub: Settings → Rules → Rulesets → importazione del ruleset. | Il file è una configurazione pronta, non una protezione già applicata. Preserva il push diretto; soddisfa il livello iniziale di Scorecard, non i livelli che richiedono review. Richiede accesso amministrativo. |
| Code-Review | Revisioni reali di un'altra persona prima del merge, registrate nelle PR. | Le review dell'AI non valgono per questo controllo. Il flusso autorizzato con push diretto su `main` non produce tali evidenze; non dichiararle e non imporre PR tramite il ruleset minimo. |
| Maintained | Continuare la manutenzione e lasciare maturare la storia del repository. | Il repository è stato creato il 27 luglio 2026 alle 09:23:20 UTC. Supera i 90 giorni dopo il 25 ottobre 2026 alle 09:23:20 UTC; prima di allora il controllo non può passare. L'attività successiva determina il punteggio. |
| CII-Best-Practices | Registrare il progetto nel [programma OpenSSF Best Practices](https://www.bestpractices.dev/) e compilare i criteri con evidenze verificate. | La registrazione e il badge non sono ancora attestati. Il solo README non li crea. Richiede un account e una valutazione veritiera dei criteri. |

Evidenze già disponibili per la valutazione OpenSSF: [licenza MIT](../LICENSE), [contributi e controlli](../CONTRIBUTING.md), [policy di sicurezza](../SECURITY.md), [changelog](../CHANGELOG.md), [test e build CI](../.github/workflows/ci.yml), [analisi di sicurezza e SBOM](../.github/workflows/security.yml), [test generativi](../tests/securityFuzz.test.ts). Queste evidenze non sostituiscono la verifica di tutti i criteri del badge, né una review umana.

## English

This register separates repository changes, GitHub settings and external prerequisites. Do not suppress findings or claim practices that never occurred. Source: [official OpenSSF Scorecard criteria](https://github.com/ossf/scorecard/blob/main/docs/checks.md).

### Technical controls

- **Vulnerabilities:** removed `markdownlint-cli2`, retaining `markdownlint` 0.41.1 and the same rules in `.markdownlint.json`. `scripts/lint-markdown.ts` checks Markdown at the root and in `docs`, `datasets`, `labs`, `.github`; dependencies, builds and symlinks are excluded. `braces`, `micromatch` and `fast-glob` are no longer needed. Verify with `npm audit --audit-level=low` and `npm ls braces micromatch fast-glob`.
- **Fuzzing:** six fast-check properties in `tests/securityFuzz.test.ts`, 1,000 cases per property, included in normal CI: malformed backups, sanitized progress, API limits and roles, topic budgets, Unicode prompt tags and token comparison. Run `npm run test:fuzz`; on failure, replay the seed and shrink path reported by fast-check and keep the case as a regression. Confirm Scorecard detects the integration after publication.
- **SAST:** CodeQL runs on pushes, PRs and weekly scans. Scorecard also evaluates checks on merged PR commits: a successful Actions job is insufficient if the code scanning check is missing. Inspect checks on the PR SHA and rerun the actual analysis when its result is missing; never manufacture checks or rewrite history to improve the score.
- **Prevention:** the Security workflow audits both production dependencies and the full lockfile, including development tooling, without ignoring audit failures.

### External settings and evidence

| Requirement | Concrete action | Status and limitation |
|---|---|---|
| Branch-Protection | Apply [the prepared ruleset](../.github/main-ruleset.json) to `main`: prevent deletion and force pushes, with no bypass actors. In GitHub: Settings → Rules → Rulesets → import ruleset. | The file is a ready configuration, not an already applied protection. It preserves direct pushes; it meets Scorecard's initial tier, not tiers requiring reviews. Requires administration access. |
| Code-Review | Genuine review by another person before merging, recorded in PRs. | AI reviews do not count. The authorized direct-push workflow does not produce this evidence; never claim it or enforce PRs through the minimal ruleset. |
| Maintained | Continue maintenance and let the repository history mature. | Created on 27 July 2026 at 09:23:20 UTC. It exceeds 90 days after 25 October 2026 at 09:23:20 UTC; the check cannot pass before then. Subsequent activity determines the score. |
| CII-Best-Practices | Register with [OpenSSF Best Practices](https://www.bestpractices.dev/) and complete the criteria with verified evidence. | Enrollment and a badge have not yet been attested. A README alone does not create them. Requires an account and truthful assessment of the criteria. |

Available evidence for the OpenSSF assessment: [MIT license](../LICENSE), [contribution and check guidance](../CONTRIBUTING.md), [security policy](../SECURITY.md), [changelog](../CHANGELOG.md), [CI tests and build](../.github/workflows/ci.yml), [security analysis and SBOM](../.github/workflows/security.yml), [generative tests](../tests/securityFuzz.test.ts). This evidence does not replace assessment of every badge criterion or a human review.
