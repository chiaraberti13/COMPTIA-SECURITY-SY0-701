## What and why · Che cosa e perché

<!-- What changes, and the problem it solves. · Che cosa cambia e quale problema risolve. -->

## How it was verified · Come è stato verificato

- [ ] `npm run check` (typecheck, lint, tests)
- [ ] `npm run build && npm run smoke`

## Checklist

- [ ] Study content changed in **both** languages, with sources for regulatory or time-sensitive facts · Contenuti modificati in **entrambe** le lingue, con fonti per fatti normativi o soggetti a cambiare
- [ ] No secrets, personal data or destructive commands without a warning · Nessun segreto, dato personale o comando distruttivo senza avvertenza
- [ ] New server inputs are validated and bounded · I nuovi input del server sono validati e limitati
- [ ] No `innerHTML` / `dangerouslySetInnerHTML` on user or AI text · Nessun `innerHTML` / `dangerouslySetInnerHTML` su testo di utenti o AI
- [ ] Saved progress stays compatible, or a tested migration is included · I progressi salvati restano compatibili, oppure è inclusa una migrazione testata
- [ ] New interactions work with the keyboard and are labelled in both languages · Le nuove interazioni funzionano da tastiera e hanno etichette in entrambe le lingue
- [ ] `CHANGELOG.md` updated under *Unreleased*; `ROADMAP.md` updated if an item changed state · `CHANGELOG.md` aggiornato in *Unreleased*; `ROADMAP.md` aggiornato se una voce ha cambiato stato

## Common checks

- [ ] Described the problem, solution and relevant issue or roadmap item.
- [ ] Listed verification commands or steps, outcomes and omitted checks with reasons.
- [ ] Considered security, privacy, accessibility and compatibility; explained non-applicable aspects.
- [ ] Updated English documentation and both READMEs where affected.
- [ ] Used synthetic examples without credentials or personal data.

### Evidence and limitations

<!-- Report actual outcomes; do not claim checks that were not performed. -->

### Compatibility and rollback

<!-- Explain migrations and how to revert, or why not applicable. -->
