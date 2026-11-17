<p align="center">

## Supported versions

Security fixes are applied to the latest version on the default branch. Older commits, forks and unofficial builds are not supported unless explicitly documented.

## Dependency checks

Both production and development dependency audits run on every push to `main`. The full audit blocks vulnerabilities of low severity or higher. `smol-toml` and `katex` overrides pin patched versions until their parent tools adopt them. Remove an override only after checking the resolved lockfile and running the full checks.

The Markdown lint uses `markdownlint` directly with a filesystem walker. The former CLI dependency chain (`markdownlint-cli2` → `micromatch` → `braces`) was removed, keeping the document scope and lint rules. Run `npm run lint:md` and `npm audit` after dependency changes.

Generative security checks use `fast-check` in `tests/securityFuzz.test.ts` and run in normal CI. `npm run test:fuzz` runs them separately; failure output includes a seed and shrink path for replay. Repository governance requirements and remaining external prerequisites are tracked in [Scorecard remediation](docs/scorecard-remediation.md).

## Reporting a vulnerability

Report suspected vulnerabilities privately through [GitHub Security Advisories](https://github.com/chiaraberti13/CompTIA-Security-SY0-701/security/advisories/new). Do not open a public issue for an unpatched vulnerability.

Include the affected version or commit, impact, reproducible steps or a minimal proof of concept, possible mitigations, and relevant logs with credentials and personal data removed. Allow reasonable time for investigation and remediation before public disclosure.

## Scope and responsible use

This policy covers this repository. Test only systems and data you own or are explicitly authorized to test. Do not perform denial-of-service testing, access third-party data, degrade services or use social engineering. This policy does not authorize testing of third-party infrastructure.

---

## Private reporting process

Use **Report a vulnerability** in the repository Security tab if private reporting is available. Otherwise use a verified private contact published by the repository owner. If no private contact is available, open a public issue asking only for a private contact, without vulnerability details. Do not publish exploit details, credentials, personal data or sensitive logs in public issues.

Include the affected revision, environment, impact and minimal synthetic reproduction. Coordinate disclosure with the maintainer. Acknowledgement and remediation depend on availability and severity; no fixed response deadline is guaranteed.
