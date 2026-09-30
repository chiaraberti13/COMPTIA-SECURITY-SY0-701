# Lab 06 — Triage di dodici allarmi del SIEM

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 4.4, 4.8, 4.9 |
| Rischio | `low` |
| Durata | 45 minuti |

Ricevi l'esportazione degli allarmi di una giornata e l'inventario degli asset. Con `jq` separi
i falsi positivi, colleghi gli allarmi che raccontano la stessa storia e decidi da che cosa
partire. È il primo lavoro di un analista del SOC: non indagare tutto, ma capire che cosa conta
prima.

## Scenario

Sei al primo turno della mattina e trovi dodici allarmi della notte e delle prime ore. Il
responsabile del SOC vuole entro mezz'ora tre cose: quali allarmi sono falsi positivi e
perché, quale incidente va aperto per primo, e quale azione di contenimento proponi.

## Prerequisiti

- `jq` 1.6 o successivo (`jq --version`): su Debian e Ubuntu `sudo apt install jq`, su macOS
  `brew install jq`, su Windows `winget install jqlang.jq`.
- Il repository clonato: i dati sono in `labs/06-incident-triage/data/`.
- Conoscenze: fasi della risposta agli incidenti (obiettivo 4.8), fonti dati (4.9) e gestione
  degli allarmi (4.4), nel Dominio 4 della guida.

## Topologia

```text
[terminale] ──► labs/06-incident-triage/data/alerts.json    (12 allarmi, sola lettura)
            ──► labs/06-incident-triage/data/inventory.json (asset, eccezioni approvate)
```

Solo file locali. I dati sono **sintetici**: nomi, host e utenti sono di fantasia, gli indirizzi
esterni appartengono al blocco riservato alla documentazione `203.0.113.0/24` (RFC 5737) e il
dominio `update-check.example` usa il suffisso riservato `.example` (RFC 2606).

## Setup

1. Entra nella cartella dei dati e verifica che i file siano quelli originali:

   ```bash
   cd labs/06-incident-triage/data
   sha256sum alerts.json inventory.json
   ```

   ```text
   a029e348605707ca19f63f4406fb40e9bee02a7a4a62575250083512d3e37350  alerts.json
   c67751204e667eefe1024d4ae69079d968f51ef52fd184d51aef72e635a56c95  inventory.json
   ```

2. Crea la cartella delle evidenze:

   ```bash
   mkdir -p ~/lab06
   ```

## Esercizio

1. **Quanti allarmi, e di che gravità?**

   ```bash
   jq length alerts.json
   jq -r '.[].severity' alerts.json | sort | uniq -c | sort -rn
   ```

   ```text
   12
         5 medium
         3 low
         3 high
         1 critical
   ```

2. **Su quali host si concentrano?** Più allarmi sullo stesso host sono spesso fasi dello
   stesso attacco:

   ```bash
   jq -r 'group_by(.host)[] | "\(length) \(.[0].host)"' alerts.json | sort -rn
   ```

   ```text
   4 WS-042
   2 WEB-01
   2 IDP
   1 WS-017
   1 MAIL
   1 FS-01
   1 DB-01
   ```

3. **Scarta le scansioni autorizzate.** L'inventario elenca lo scanner di vulnerabilità
   approvato: gli allarmi di port scan che partono da lì sono falsi positivi attesi.

   ```bash
   jq -r --slurpfile inv inventory.json \
     '.[] | select(.detail | test("src=(" + ($inv[0].approved_scanners | join("|")) + ") ")) | "\(.id) \(.host) \(.rule)"' \
     alerts.json
   ```

   ```text
   A-101 WEB-01 Port scan detected
   A-102 DB-01 Port scan detected
   ```

   Si chiudono come falsi positivi, e si propone di escludere quell'origine dalla regola
   (*alert tuning*), così domani non torneranno.

4. **Controlla il trasferimento notturno.** 6 GB verso l'esterno alle 02:30 fanno paura, ma
   l'inventario ha un trasferimento approvato da quell'host verso quella destinazione:

   ```bash
   jq -r --slurpfile inv inventory.json \
     '.[] | . as $a | select(any($inv[0].approved_transfers[]; . as $t | $t.host == $a.host and ($a.detail | contains("dst=" + $t.dst)))) | "\(.id) \(.host) \(.detail)"' \
     alerts.json
   ```

   ```text
   A-103 FS-01 dst=203.0.113.99 bytes=6442450944 proto=https
   ```

   È il backup fuori sede notturno. Probabile falso positivo, ma una conferma costa poco:
   chiedi al team dei backup se il volume corrisponde a quello abituale. Un attaccante che
   conosce l'eccezione potrebbe nascondersi proprio lì.

5. **Ricostruisci la storia di WS-042.** Prendi tutti gli allarmi che nominano l'host o il suo
   utente e ordinali per ora:

   ```bash
   jq -r '[.[] | select(.host == "WS-042" or (.detail | contains("WS-042")) or (.detail | contains("l.bianchi")))] | sort_by(.time)[] | "\(.time[11:19]) \(.source) \(.rule)"' alerts.json
   ```

   ```text
   09:12:02 Mail Phishing reported by user
   09:14:37 EDR Office spawned PowerShell
   09:15:02 DNS Newly registered domain
   09:16:02 DNS Periodic beaconing
   10:20:44 EDR Credential dumping
   10:23:10 IdP Admin sign-in from unusual host
   ```

   Sei allarmi di cinque sistemi diversi, presi uno per uno di gravità varia, raccontano un
   solo incidente: l'utente riceve un documento con macro, Word avvia PowerShell, il malware
   contatta un dominio registrato il giorno prima ogni 60 secondi, un'ora dopo estrae le
   credenziali dalla memoria e alle 10:23 un account amministrativo accede **da WS-042**.
   L'attaccante è passato da una postazione a un amministratore di dominio.

6. **Confronta con un punteggio automatico.** Un modo comune di ordinare la coda è moltiplicare
   la gravità dell'allarme per la criticità dell'asset (da 1 a 4):

   ```bash
   jq -r --slurpfile inv inventory.json \
     '{"low":1,"medium":2,"high":3,"critical":4} as $w | .[] | ($inv[0].assets[.host].criticality) as $c | "\($w[.severity] * $w[$c]) \(.id) \(.host) \(.rule)"' \
     alerts.json | sort -k1,1nr | head -6
   ```

   ```text
   12 A-111 IDP Admin sign-in from unusual host
   9 A-103 FS-01 Large outbound transfer
   8 A-104 IDP Impossible travel
   8 A-110 WS-042 Credential dumping
   6 A-101 WEB-01 Port scan detected
   6 A-102 DB-01 Port scan detected
   ```

   Il punteggio mette in cima A-111, giusto, ma subito dopo due falsi positivi e un «viaggio
   impossibile» che passa dalla VPN aziendale, e lascia il furto di credenziali al quarto
   posto. Il punteggio ordina gli allarmi **singoli**; la correlazione del passaggio 5 dice che
   A-105, A-106, A-107, A-108, A-110 e A-111 sono **un solo incidente critico**, da aprire per
   primo.

7. **Salva la timeline** dell'incidente:

   ```bash
   jq -r '[.[] | select(.host == "WS-042" or (.detail | contains("WS-042")) or (.detail | contains("l.bianchi")))] | sort_by(.time)[] | "\(.time) \(.id) \(.source) \(.rule) \(.detail)"' alerts.json > ~/lab06/timeline.txt
   wc -l < ~/lab06/timeline.txt
   ```

   ```text
   6
   ```

## Evidenze

Nella cartella `~/lab06` devono esserci:

- `timeline.txt`, le sei righe dell'incidente;
- `triage.md`, con una riga per ciascuno dei 12 allarmi: esito (vero positivo, falso positivo,
  da verificare), motivo e, per i veri positivi, l'incidente a cui appartengono;
- la proposta di contenimento: isolare WS-042 tramite l'EDR, disabilitare e reimpostare
  `adm.verdi` e `l.bianchi` revocandone le sessioni, bloccare `update-check.example` sul DNS, e
  cercare lo stesso dominio e lo stesso allegato sulle altre postazioni.

## Cleanup

I file di dati non sono stati modificati: puoi verificarlo con `sha256sum`. Quando hai
consegnato le evidenze, cancella la cartella di lavoro:

```bash
rm -r -- ~/lab06
```

## Domande finali

1. Perché A-111 conta più di A-110, anche se A-110 è l'unico allarme `critical`?

   <details>
   <summary>Risposta</summary>

   A-110 dice che le credenziali sono state estratte da **una** postazione; A-111 dice che sono
   già state **usate** per accedere come amministratore. L'attaccante ha fatto un salto di
   privilegi e ha ora in mano l'identità, l'asset più critico dell'inventario. Il contenimento
   deve riguardare subito gli account, non solo l'host.

   </details>

2. A-104, il viaggio impossibile di `m.rossi`, passa dalla VPN aziendale. Come lo classifichi?

   <details>
   <summary>Risposta</summary>

   Come **da verificare, probabile falso positivo**: un'uscita della VPN in un altro paese fa
   sembrare che l'utente si sia spostato. Si verifica con l'utente o con i log della VPN, e se
   è confermato si regola la regola perché riconosca gli indirizzi di uscita aziendali. Non si
   chiude «a sentimento».

   </details>

3. Perché escludere lo scanner dalla regola è *alert tuning* e non un buco nella rilevazione?

   <details>
   <summary>Risposta</summary>

   Perché l'eccezione è stretta (un solo indirizzo, approvato e inventariato) e documentata,
   e riduce il rumore che causa *alert fatigue*. Diventerebbe un buco se fosse larga, per
   esempio l'intera rete dei server, o se nessuno controllasse che quell'indirizzo sia davvero
   lo scanner.

   </details>

4. Da quale fase del ciclo di risposta agli incidenti viene questo lavoro, e quale viene
   subito dopo?

   <details>
   <summary>Risposta</summary>

   È la fase di **rilevazione e analisi**: confermare che c'è un incidente, capirne l'ampiezza
   e dargli una priorità. Subito dopo viene il **contenimento**, preservando le evidenze: si
   isola l'host, non lo si spegne né lo si reinstalla, perché la memoria di WS-042 contiene
   ciò che serve per capire che cosa è stato rubato.

   </details>
