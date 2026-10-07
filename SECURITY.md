<p align="center">
  <img src="assets/banner.svg" alt="CompTIA Security+ Training Studio" width="100%">
</p>

<p align="center"><a href="#-english">🇬🇧 English</a> · <a href="#-italiano">🇮🇹 Italiano</a></p>

<p align="center">
  <img src="https://img.shields.io/badge/security-responsible%20disclosure-22D3EE?style=flat-square" alt="Responsible disclosure">
  <img src="https://img.shields.io/badge/status-maintained-F2C94C?style=flat-square" alt="Project status: maintained">
</p>

<p align="center"><a href="README.md">Project README</a> · <a href="LICENSE">GPL-3.0 Licence</a></p>

---

## 🇬🇧 English

### Supported versions

Security fixes are applied to the latest version on the default branch. Older commits, forks and unofficial builds are not supported unless explicitly documented.

### Dependency checks

Both production and development dependency audits run on every push to `main`. The full audit blocks vulnerabilities of low severity or higher. `smol-toml` and `katex` overrides pin patched versions until their parent tools adopt them. Remove an override only after checking the resolved lockfile and running the full checks.

The Markdown lint uses `markdownlint` directly with a filesystem walker. The former CLI dependency chain (`markdownlint-cli2` → `micromatch` → `braces`) was removed, keeping the document scope and lint rules. Run `npm run lint:md` and `npm audit` after dependency changes.

Generative security checks use `fast-check` in `tests/securityFuzz.test.ts` and run in normal CI. `npm run test:fuzz` runs them separately; failure output includes a seed and shrink path for replay. Repository governance requirements and remaining external prerequisites are tracked in [Scorecard remediation](docs/scorecard-remediation.md).

### Reporting a vulnerability

Report suspected vulnerabilities privately through [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new). Do not open a public issue for an unpatched vulnerability.

Include the affected version or commit, impact, reproducible steps or a minimal proof of concept, possible mitigations, and relevant logs with credentials and personal data removed. Allow reasonable time for investigation and remediation before public disclosure.

### Scope and responsible use

This policy covers this repository. Test only systems and data you own or are explicitly authorized to test. Do not perform denial-of-service testing, access third-party data, degrade services or use social engineering. This policy does not authorize testing of third-party infrastructure.

---

## 🇮🇹 Italiano

### Versioni supportate

Le correzioni di sicurezza vengono applicate alla versione più recente del branch predefinito. Commit precedenti, fork e build non ufficiali non sono supportati salvo diversa indicazione.

### Controlli delle dipendenze

Gli audit delle dipendenze di produzione e di sviluppo vengono eseguiti a ogni push su `main`. L’audit completo blocca le vulnerabilità di gravità bassa o superiore. Gli override di `smol-toml` e `katex` fissano versioni corrette finché gli strumenti che li usano non le adottano. Rimuovi un override solo dopo aver verificato il lockfile risolto ed eseguito tutti i controlli.

Il lint Markdown usa direttamente `markdownlint` con una scansione del filesystem. La precedente catena di dipendenze del CLI (`markdownlint-cli2` → `micromatch` → `braces`) è stata rimossa, mantenendo il perimetro dei documenti e le regole di lint. Esegui `npm run lint:md` e `npm audit` dopo le modifiche alle dipendenze.

I controlli generativi di sicurezza usano `fast-check` in `tests/securityFuzz.test.ts` e vengono eseguiti nella normale CI. `npm run test:fuzz` li esegue separatamente; in caso di errore vengono riportati seed e percorso di riduzione per riprodurlo. I requisiti di governance e i prerequisiti esterni ancora necessari sono registrati in [Correzioni Scorecard](docs/scorecard-remediation.md).

### Segnalazione di una vulnerabilità

Segnala privatamente le vulnerabilità sospette tramite [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new). Non aprire issue pubbliche per vulnerabilità non ancora corrette.

Indica versione o commit interessato, impatto, passaggi riproducibili o una prova di concetto minima, possibili mitigazioni e log privati di credenziali e dati personali. Attendi un tempo ragionevole per analisi e correzione prima della divulgazione pubblica.

### Ambito e uso responsabile

Questa policy copre il repository. Esegui test esclusivamente su sistemi e dati di tua proprietà o per i quali possiedi un’autorizzazione esplicita. Sono esclusi denial of service, accesso a dati di terzi, degrado dei servizi e social engineering. Questa policy non autorizza test su infrastrutture di terzi.
