/**
 * Portfolio mode: sanitized, professionally reusable write-ups built from the
 * lab exercises. Each artifact is a report, a runbook or an incident write-up
 * that a learner can export (copy or download as Markdown) and adapt for a real
 * CV or portfolio, after replacing the fictional details with their own.
 *
 * Every artifact uses only synthetic data: the fictional company "Kestrelia",
 * addresses from the documentation ranges (RFC 5737: 203.0.113.0/24) and the
 * reserved suffix `.example` (RFC 2606). There are no real names, secrets or
 * customer data, so an artifact is safe to publish as-is. `tests/portfolio.test.ts`
 * enforces the sanitization rules, the IT/EN parity and the deterministic render.
 */
import type { Lang } from "./i18n";

/** The kind of deliverable. Drives the badge and the default file name. */
export type PortfolioKind = "report" | "runbook" | "writeup";

/** A block of body text: a paragraph or a bullet list. */
export type PortfolioBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export interface PortfolioSection {
  heading: string;
  body: PortfolioBlock[];
}

export interface PortfolioArtifact {
  /** Stable, language-independent identifier in kebab-case. */
  id: string;
  kind: PortfolioKind;
  title: string;
  /** One line shown in the picker, explaining what the artifact is for. */
  summary: string;
  /** The lab folder this artifact derives from, e.g. "03-log-analysis". */
  lab: string;
  /** Official SY0-701 objective codes the artifact demonstrates. */
  objectives: string[];
  /** Transferable skills, shown as chips. */
  skills: string[];
  sections: PortfolioSection[];
}

/* ------------------------------------------------------------------ *
 * Fixed labels used by the Markdown renderer (not part of the data so
 * the render stays deterministic and independent of the UI dictionary).
 * ------------------------------------------------------------------ */

interface RenderLabels {
  objectives: string;
  skills: string;
  lab: string;
  sanitizedTitle: string;
  sanitizedBody: string;
}

const LABELS: Record<Lang, RenderLabels> = {
  it: {
    objectives: "Obiettivi SY0-701",
    skills: "Competenze dimostrate",
    lab: "Basato sul laboratorio",
    sanitizedTitle: "Nota di riservatezza",
    sanitizedBody:
      "Documento di esempio con dati sintetici: azienda di fantasia (Kestrelia), indirizzi del blocco riservato alla documentazione (203.0.113.0/24, RFC 5737) e dominio con suffisso riservato `.example` (RFC 2606). Prima di riutilizzarlo in un contesto reale, sostituisci i dettagli fittizi con i tuoi e rimuovi qualsiasi dato personale o segreto.",
  },
  en: {
    objectives: "SY0-701 objectives",
    skills: "Skills demonstrated",
    lab: "Based on the lab",
    sanitizedTitle: "Confidentiality note",
    sanitizedBody:
      "Sample document with synthetic data: fictional company (Kestrelia), addresses from the documentation range (203.0.113.0/24, RFC 5737) and a domain with the reserved suffix `.example` (RFC 2606). Before reusing it in a real context, replace the fictional details with your own and remove any personal data or secrets.",
  },
};

const IT: PortfolioArtifact[] = [
  {
    id: "incident-ssh-credential-attack",
    kind: "writeup",
    title: "Analisi di un attacco alle credenziali nei log SSH",
    summary: "Write-up di un incidente: brute force e password spraying ricostruiti dai log di autenticazione.",
    lab: "03-log-analysis",
    objectives: ["2.4", "4.4", "4.9"],
    skills: ["Analisi dei log", "Brute force", "Password spraying", "Timeline", "Contenimento"],
    sections: [
      {
        heading: "Contesto",
        body: [
          {
            type: "p",
            text: "Il server `web01` di Kestrelia ha registrato attività anomala di notte. Mi è stata consegnata una copia in sola lettura del file `auth.log` e mi è stato chiesto di stabilire chi avesse tentato di accedere, se qualcuno ci fosse riuscito e quali azioni avesse eseguito (obiettivo 4.9, fonti dati per le indagini).",
          },
        ],
      },
      {
        heading: "Ambito e metodo",
        body: [
          {
            type: "p",
            text: "Ho lavorato solo sul file consegnato, senza toccare il sistema in produzione, usando strumenti presenti su ogni host Linux (`grep`, `awk`, `sort`, `uniq`). Ho verificato l'integrità del file con uno `sha256sum` prima e dopo l'analisi.",
          },
        ],
      },
      {
        heading: "Risultati",
        body: [
          {
            type: "list",
            items: [
              "Brute force: oltre 400 tentativi falliti verso l'utente `root` da 203.0.113.17 in 6 minuti, un ritmo impossibile per una persona (obiettivo 2.4).",
              "Password spraying: 3 indirizzi del blocco 203.0.113.0/24 hanno provato un'unica password su 40 utenti diversi, sotto la soglia di blocco per account.",
              "Accesso riuscito: un login dell'utente `svc-deploy` alle 02:14 UTC da 203.0.113.17, subito dopo la raffica di tentativi falliti.",
            ],
          },
        ],
      },
      {
        heading: "Impatto",
        body: [
          {
            type: "p",
            text: "Un account di servizio con una password debole è stato compromesso. La sessione ha aggiunto una chiave SSH autorizzata, un meccanismo di persistenza che sopravvive al cambio della password (obiettivo 4.4, indicatori di attività malevola).",
          },
        ],
      },
      {
        heading: "Raccomandazioni",
        body: [
          {
            type: "list",
            items: [
              "Revocare la chiave SSH non riconosciuta e ruotare le credenziali dell'account `svc-deploy`.",
              "Imporre autenticazione a più fattori e chiavi al posto delle password per l'accesso SSH.",
              "Limitare i tentativi falliti (`fail2ban` o equivalente) e allarmare su più di 10 fallimenti al minuto per IP.",
              "Centralizzare i log su un sistema a cui il server non possa scrivere a ritroso.",
            ],
          },
        ],
      },
      {
        heading: "Cosa ho imparato",
        body: [
          {
            type: "p",
            text: "La differenza tra brute force e password spraying si legge nel rapporto tra numero di tentativi e numero di account; e il primo segnale utile è spesso il successo che arriva subito dopo molti fallimenti.",
          },
        ],
      },
    ],
  },
  {
    id: "runbook-soc-alert-triage",
    kind: "runbook",
    title: "Runbook: triage degli allarmi SOC nei primi 30 minuti",
    summary: "Procedura ripetibile per separare i falsi positivi, correlare gli allarmi e scegliere la priorità.",
    lab: "06-incident-triage",
    objectives: ["4.4", "4.8", "4.9"],
    skills: ["Triage", "Correlazione", "Falsi positivi", "Priorità", "Escalation"],
    sections: [
      {
        heading: "Scopo",
        body: [
          {
            type: "p",
            text: "Guidare l'analista del primo turno a trasformare un elenco di allarmi del SIEM in una decisione: che cosa ignorare, che cosa aprire per primo e quale contenimento proporre, entro 30 minuti (obiettivo 4.8, processo di risposta agli incidenti).",
          },
        ],
      },
      {
        heading: "Quando usarlo",
        body: [
          {
            type: "p",
            text: "All'inizio del turno, davanti a un'esportazione di allarmi (nell'esercizio, 12 allarmi di una notte) e all'inventario degli asset con le eccezioni approvate.",
          },
        ],
      },
      {
        heading: "Passi",
        body: [
          {
            type: "list",
            items: [
              "Verifica l'integrità dell'esportazione con uno `sha256sum` prima di fidarti dei dati.",
              "Scarta i falsi positivi confrontando ogni allarme con le eccezioni approvate nell'inventario; annota il motivo, non limitarti a chiudere (obiettivo 4.4).",
              "Correla gli allarmi che condividono lo stesso host o utente: spesso raccontano un unico incidente.",
              "Assegna la priorità in base all'asset colpito e allo stadio dell'attacco, non al colore dell'allarme.",
              "Proponi un contenimento reversibile per l'incidente più grave e documenta le fonti usate (obiettivo 4.9).",
            ],
          },
        ],
      },
      {
        heading: "Escalation",
        body: [
          {
            type: "p",
            text: "Se un allarme tocca un asset critico o mostra movimento laterale, apri subito un incidente e coinvolgi il responsabile del SOC senza aspettare la fine del triage.",
          },
        ],
      },
      {
        heading: "Output",
        body: [
          {
            type: "p",
            text: "Una nota breve con: i falsi positivi e il perché, l'incidente da aprire per primo e l'azione di contenimento proposta, pronta da allegare al ticket.",
          },
        ],
      },
    ],
  },
  {
    id: "report-http-security-headers",
    kind: "report",
    title: "Report di hardening: header di sicurezza HTTP",
    summary: "Verifica degli header di sicurezza di un'applicazione web e prova del rate limiting.",
    lab: "01-security-headers",
    objectives: ["2.5", "4.1"],
    skills: ["Hardening", "Header HTTP", "CSP", "Rate limiting", "Verifica"],
    sections: [
      {
        heading: "Sintesi",
        body: [
          {
            type: "p",
            text: "Su richiesta del responsabile della sicurezza di Kestrelia ho verificato quali protezioni l'applicazione web applica a ogni risposta e se gli endpoint applicativi sono difesi da un uso eccessivo, prima di una possibile pubblicazione (obiettivi 2.5 e 4.1).",
          },
        ],
      },
      {
        heading: "Ambito",
        body: [
          {
            type: "p",
            text: "Ho avviato l'app in modalità produzione su 127.0.0.1, dove gli header di sicurezza sono attivi, e ho ispezionato le risposte con `curl` e con il browser. Nessun sistema esterno è stato coinvolto.",
          },
        ],
      },
      {
        heading: "Risultati",
        body: [
          {
            type: "list",
            items: [
              "`Content-Security-Policy` con `default-src 'self'`: il browser ha bloccato uno script non autorizzato (difesa da XSS, obiettivo 4.1).",
              "`X-Content-Type-Options: nosniff` e assenza di `X-Powered-By`: nessuna informazione superflua sul server.",
              "`frame-ancestors 'self'`: la pagina non può essere incorniciata da terzi (difesa da clickjacking).",
              "Rate limiting: dopo 30 richieste in 15 minuti verso `/api/` il server ha risposto 429, come previsto.",
            ],
          },
        ],
      },
      {
        heading: "Raccomandazioni",
        body: [
          {
            type: "list",
            items: [
              "Mantenere la CSP restrittiva e rivederla a ogni nuova dipendenza del front end.",
              "Aggiungere `Strict-Transport-Security` (HSTS) quando l'app è servita solo in HTTPS dietro un proxy.",
              "Monitorare le risposte 429 per distinguere un abuso da un limite troppo stretto per gli utenti legittimi.",
            ],
          },
        ],
      },
      {
        heading: "Conclusione",
        body: [
          {
            type: "p",
            text: "L'applicazione applica un insieme coerente di controlli di hardening. Con l'aggiunta di HSTS in produzione, la configurazione degli header è adeguata alla pubblicazione su un server aziendale.",
          },
        ],
      },
    ],
  },
];

const EN: PortfolioArtifact[] = [
  {
    id: "incident-ssh-credential-attack",
    kind: "writeup",
    title: "Write-up: credential attack in SSH logs",
    summary: "Incident write-up: brute force and password spraying reconstructed from authentication logs.",
    lab: "03-log-analysis",
    objectives: ["2.4", "4.4", "4.9"],
    skills: ["Log analysis", "Brute force", "Password spraying", "Timeline", "Containment"],
    sections: [
      {
        heading: "Context",
        body: [
          {
            type: "p",
            text: "Kestrelia's `web01` server logged unusual activity overnight. I was handed a read-only copy of its `auth.log` and asked to establish who had tried to log in, whether anyone had succeeded and what actions they had taken (objective 4.9, data sources for investigations).",
          },
        ],
      },
      {
        heading: "Scope and method",
        body: [
          {
            type: "p",
            text: "I worked only on the file handed to me, without touching the production system, using tools present on every Linux host (`grep`, `awk`, `sort`, `uniq`). I checked the file's integrity with an `sha256sum` before and after the analysis.",
          },
        ],
      },
      {
        heading: "Findings",
        body: [
          {
            type: "list",
            items: [
              "Brute force: over 400 failed attempts against the `root` user from 203.0.113.17 in 6 minutes, a rate impossible for a person (objective 2.4).",
              "Password spraying: 3 addresses from the 203.0.113.0/24 block tried a single password against 40 different users, below the per-account lockout threshold.",
              "Successful login: a `svc-deploy` login at 02:14 UTC from 203.0.113.17, right after the burst of failed attempts.",
            ],
          },
        ],
      },
      {
        heading: "Impact",
        body: [
          {
            type: "p",
            text: "A service account with a weak password was compromised. The session added an authorized SSH key, a persistence mechanism that survives a password change (objective 4.4, indicators of malicious activity).",
          },
        ],
      },
      {
        heading: "Recommendations",
        body: [
          {
            type: "list",
            items: [
              "Revoke the unrecognized SSH key and rotate the `svc-deploy` account credentials.",
              "Enforce multi-factor authentication and keys instead of passwords for SSH access.",
              "Rate-limit failed attempts (`fail2ban` or equivalent) and alert on more than 10 failures per minute per IP.",
              "Centralize logs on a system the server cannot write back to.",
            ],
          },
        ],
      },
      {
        heading: "Lessons learned",
        body: [
          {
            type: "p",
            text: "The difference between brute force and password spraying shows in the ratio between the number of attempts and the number of accounts; and the first useful signal is often the success that arrives right after many failures.",
          },
        ],
      },
    ],
  },
  {
    id: "runbook-soc-alert-triage",
    kind: "runbook",
    title: "Runbook: SOC alert triage in the first 30 minutes",
    summary: "A repeatable procedure to separate false positives, correlate alerts and choose a priority.",
    lab: "06-incident-triage",
    objectives: ["4.4", "4.8", "4.9"],
    skills: ["Triage", "Correlation", "False positives", "Prioritization", "Escalation"],
    sections: [
      {
        heading: "Purpose",
        body: [
          {
            type: "p",
            text: "Guide the first-shift analyst to turn a list of SIEM alerts into a decision: what to ignore, what to open first and which containment to propose, within 30 minutes (objective 4.8, incident response process).",
          },
        ],
      },
      {
        heading: "When to use it",
        body: [
          {
            type: "p",
            text: "At the start of the shift, facing an alert export (in the exercise, 12 alerts from one night) and the asset inventory with its approved exceptions.",
          },
        ],
      },
      {
        heading: "Steps",
        body: [
          {
            type: "list",
            items: [
              "Check the export's integrity with an `sha256sum` before trusting the data.",
              "Discard false positives by comparing each alert with the approved exceptions in the inventory; record the reason, do not just close it (objective 4.4).",
              "Correlate alerts that share the same host or user: they often tell a single incident.",
              "Assign priority based on the affected asset and the attack stage, not on the alert's color.",
              "Propose a reversible containment for the most serious incident and document the sources used (objective 4.9).",
            ],
          },
        ],
      },
      {
        heading: "Escalation",
        body: [
          {
            type: "p",
            text: "If an alert touches a critical asset or shows lateral movement, open an incident at once and involve the SOC lead without waiting for the triage to finish.",
          },
        ],
      },
      {
        heading: "Output",
        body: [
          {
            type: "p",
            text: "A short note with: the false positives and why, the incident to open first and the proposed containment action, ready to attach to the ticket.",
          },
        ],
      },
    ],
  },
  {
    id: "report-http-security-headers",
    kind: "report",
    title: "Hardening report: HTTP security headers",
    summary: "Verification of a web application's security headers and proof of rate limiting.",
    lab: "01-security-headers",
    objectives: ["2.5", "4.1"],
    skills: ["Hardening", "HTTP headers", "CSP", "Rate limiting", "Verification"],
    sections: [
      {
        heading: "Summary",
        body: [
          {
            type: "p",
            text: "At the request of Kestrelia's security lead I verified which protections the web application applies to every response and whether the application endpoints are defended against overuse, ahead of a possible publication (objectives 2.5 and 4.1).",
          },
        ],
      },
      {
        heading: "Scope",
        body: [
          {
            type: "p",
            text: "I started the app in production mode on 127.0.0.1, where the security headers are active, and inspected the responses with `curl` and the browser. No external system was involved.",
          },
        ],
      },
      {
        heading: "Findings",
        body: [
          {
            type: "list",
            items: [
              "`Content-Security-Policy` with `default-src 'self'`: the browser blocked an unauthorized script (XSS defense, objective 4.1).",
              "`X-Content-Type-Options: nosniff` and no `X-Powered-By`: no superfluous information about the server.",
              "`frame-ancestors 'self'`: the page cannot be framed by third parties (clickjacking defense).",
              "Rate limiting: after 30 requests in 15 minutes to `/api/` the server responded 429, as expected.",
            ],
          },
        ],
      },
      {
        heading: "Recommendations",
        body: [
          {
            type: "list",
            items: [
              "Keep the CSP restrictive and review it at every new front-end dependency.",
              "Add `Strict-Transport-Security` (HSTS) when the app is served over HTTPS only behind a proxy.",
              "Monitor 429 responses to tell an abuse apart from a limit too tight for legitimate users.",
            ],
          },
        ],
      },
      {
        heading: "Conclusion",
        body: [
          {
            type: "p",
            text: "The application applies a coherent set of hardening controls. With HSTS added in production, the header configuration is adequate for publication on a corporate server.",
          },
        ],
      },
    ],
  },
];

export const PORTFOLIO_ARTIFACTS: Record<Lang, PortfolioArtifact[]> = { it: IT, en: EN };

/** Find an artifact by id in the given language. */
export function portfolioArtifact(lang: Lang, id: string): PortfolioArtifact | undefined {
  return PORTFOLIO_ARTIFACTS[lang].find((a) => a.id === id);
}

/** Render an artifact as a sanitized Markdown document, deterministically. */
export function renderPortfolioMarkdown(artifact: PortfolioArtifact, lang: Lang): string {
  const labels = LABELS[lang];
  const lines: string[] = [];
  lines.push(`# ${artifact.title}`, "");
  lines.push(`> ${labels.objectives}: ${artifact.objectives.join(", ")}`);
  lines.push(`> ${labels.lab}: \`labs/${artifact.lab}\``);
  lines.push(`> ${labels.skills}: ${artifact.skills.join(", ")}`, "");
  for (const section of artifact.sections) {
    lines.push(`## ${section.heading}`, "");
    for (const block of section.body) {
      if (block.type === "p") {
        lines.push(block.text, "");
      } else {
        for (const item of block.items) lines.push(`- ${item}`);
        lines.push("");
      }
    }
  }
  lines.push("---", "", `*${labels.sanitizedTitle}.* ${labels.sanitizedBody}`, "");
  return lines.join("\n");
}
