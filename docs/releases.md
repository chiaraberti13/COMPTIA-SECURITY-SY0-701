# Release versionate · Versioned releases

## Italiano

Le release stabili usano tag `vMAJOR.MINOR.PATCH`. Prima di creare il tag:

1. Aggiorna insieme `version` in `package.json` e nel lockfile (`npm version VERSIONE --no-git-tag-version`).
2. Sposta le modifiche da `Unreleased` a una sezione `## [VERSIONE] - YYYY-MM-DD` in `CHANGELOG.md`, lasciando `Unreleased` per le modifiche future.
3. Integra la pull request in `main` dopo i controlli CI e di sicurezza.
4. Crea e invia il tag sul commit integrato. Il workflow rifiuta commit non appartenenti alla cronologia di `main`, versioni discordanti e note mancanti.

Il workflow esegue check, audit, build e smoke test e crea una **bozza** di release: verifica gli allegati e le note prima di pubblicarla su GitHub. Include `app.tar.gz`, `sbom.cdx.json` (dipendenze di produzione in CycloneDX) e `SHA256SUMS`. I checksum verificano l'integrità; non costituiscono una firma né un'attestazione di provenienza. La firma resta una voce separata della roadmap.

Per eseguire il pacchetto: verifica `sha256sum -c SHA256SUMS`, estrai l'archivio in una cartella vuota, installa le dipendenze con `npm ci --omit=dev` e avvia con `NODE_ENV=production npm start`. Usa la versione Node indicata nel README. Il pacchetto include font e licenze, README, lockfile e build; non include credenziali. Configura le variabili d'ambiente sul server seguendo il README. Le funzioni AI richiedono rete e configurazione del provider.

Non ricreare o spostare tag già pubblicati. Per correggere una release usa una nuova versione; una ripetizione su una bozza già esistente fallisce senza sostituirne gli allegati.

## English

Stable releases use `vMAJOR.MINOR.PATCH` tags. Before tagging:

1. Update `version` in both package files (`npm version VERSION --no-git-tag-version`).
2. Move changes from `Unreleased` to one dated `## [VERSION] - YYYY-MM-DD` section in `CHANGELOG.md`, retaining `Unreleased` for future changes.
3. Merge the pull request into `main` after CI and security checks.
4. Create and push the tag at the merged commit. The workflow rejects commits outside the history of `main`, mismatched versions and missing notes.

Checks, audit, build and smoke tests precede a **draft** release. Review its notes and attachments before publishing on GitHub. Attachments are `app.tar.gz`, `sbom.cdx.json` (production dependencies in CycloneDX) and `SHA256SUMS`. Checksums verify integrity; they are neither signatures nor provenance attestations, which remain a separate roadmap item.

Verify with `sha256sum -c SHA256SUMS`, extract into an empty directory, run `npm ci --omit=dev`, then `NODE_ENV=production npm start` with the Node version documented in the README. The package includes bundled fonts and licences, READMEs, lockfile and build, never credentials. Configure environment variables on the server as documented in the README. AI features require network access and provider configuration.

Never move or recreate published tags. Fix a release with a new version; rerunning against an existing draft fails without replacing its attachments.
