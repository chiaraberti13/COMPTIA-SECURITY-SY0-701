<p align="center">
  <img src="assets/banner.svg" alt="CompTIA Security+ Training Studio" width="100%">
</p>

<p align="center"><a href="#-english">🇬🇧 English</a> · <a href="#-italiano">🇮🇹 Italiano</a></p>

<p align="center">
  <img src="https://img.shields.io/badge/security-responsible%20disclosure-22D3EE?style=flat-square" alt="Responsible disclosure">
  <img src="https://img.shields.io/badge/status-maintained-F2C94C?style=flat-square" alt="Project status: maintained">
</p>

<p align="center"><a href="README.md">Project README</a> · <a href="LICENSE">MIT Licence</a></p>

---

## 🇬🇧 English

### Supported versions

Security fixes are applied to the latest version on the default branch. Older commits, forks and unofficial builds are not supported unless explicitly documented.

### Dependency checks

The production dependency audit runs on every push to `main`. Also run `npm audit` locally to inspect development tools. `smol-toml` and `katex` overrides pin patched versions until their parent tools adopt them. Remove an override only after checking the resolved lockfile and running the full checks.

As of 7 October 2026, `braces` 3.0.3 has an unpatched stack-exhaustion advisory ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)). It is a transitive development dependency of Markdown linting; it is not shipped with the production server. Use repository-controlled file patterns and monitor upstream releases. This finding is not suppressed.

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

L’audit delle dipendenze di produzione viene eseguito a ogni push su `main`. Esegui anche `npm audit` localmente per controllare gli strumenti di sviluppo. Gli override di `smol-toml` e `katex` fissano versioni corrette finché gli strumenti che li usano non le adottano. Rimuovi un override solo dopo aver verificato il lockfile risolto ed eseguito tutti i controlli.

Al 7 ottobre 2026, `braces` 3.0.3 presenta una vulnerabilità di esaurimento dello stack senza patch ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)). È una dipendenza transitiva di sviluppo del lint Markdown; non viene distribuita con il server di produzione. Usa pattern di file controllati dal repository e monitora le nuove versioni upstream. La segnalazione non viene soppressa.

### Segnalazione di una vulnerabilità

Segnala privatamente le vulnerabilità sospette tramite [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new). Non aprire issue pubbliche per vulnerabilità non ancora corrette.

Indica versione o commit interessato, impatto, passaggi riproducibili o una prova di concetto minima, possibili mitigazioni e log privati di credenziali e dati personali. Attendi un tempo ragionevole per analisi e correzione prima della divulgazione pubblica.

### Ambito e uso responsabile

Questa policy copre il repository. Esegui test esclusivamente su sistemi e dati di tua proprietà o per i quali possiedi un’autorizzazione esplicita. Sono esclusi denial of service, accesso a dati di terzi, degrado dei servizi e social engineering. Questa policy non autorizza test su infrastrutture di terzi.
