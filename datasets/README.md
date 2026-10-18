# Study datasets / Dataset didattici

## English

Catalog of original, entirely synthetic evidence under the [GPL-3.0 license](LICENSE), including PCAP files. No real traffic or personal data was collected. Addresses belong to TEST-NET and domains to `.invalid`: these are not operational IOCs and must not feed blocklists or reputation services.

| Dataset | Evidence | SY0-701 objectives | Level |
|---|---|---|---|
| [Authentication and DNS](auth-dns/README.md) | JSONL logs, PCAP, JSONL alerts, CSV timeline, JSON IOCs | 2.4, 4.4, 4.8, 4.9 | Beginner/intermediate |

Prerequisites: reading logs, UDP/DNS and incident response phases. Outcomes: correlate sources, formulate hypotheses, distinguish alerts from confirmed incidents and identify missing evidence. See the scenario for exercises, answers and cleanup. No offensive commands or network access are needed.

Deterministic regeneration from the repository root: `npm run datasets:generate`. `manifest.json` records provenance, review dates, objectives, sizes and SHA-256; `tests/studyDatasets.test.ts` checks integrity, reproducibility and consistency. New scenarios must include all five formats, a deterministic generator, license, IT/EN exercises/answers, metadata and dedicated tests. The capture is generated from scratch: “sanitization” means no real data by construction, not anonymization of a real capture.

---

## Italiano

Catalogo di evidenze originali e interamente sintetiche, distribuite con [licenza GPL-3.0](LICENSE), inclusi i file PCAP. Nessun traffico reale o dato personale è stato raccolto. Gli indirizzi appartengono a TEST-NET e i domini a `.invalid`: non sono IOC operativi e non devono alimentare blocklist o servizi di reputazione.

| Dataset | Evidenze | Obiettivi SY0-701 | Livello |
|---|---|---|---|
| [Autenticazione e DNS](auth-dns/README.md) | Log JSONL, PCAP, alert JSONL, timeline CSV, IOC JSON | 2.4, 4.4, 4.8, 4.9 | Base/intermedio |

Prerequisiti: lettura di log, UDP/DNS e fasi di incident response. Risultati: correlare fonti, formulare ipotesi, distinguere alert da incidente confermato e indicare evidenze mancanti. Consultare lo scenario per esercizi, soluzioni e ripristino. Nessun comando offensivo o accesso di rete è necessario.

Rigenerazione deterministica dalla radice del repository: `npm run datasets:generate`. `manifest.json` registra provenienza, revisione, obiettivi, dimensioni e SHA-256; `tests/studyDatasets.test.ts` verifica integrità, riproducibilità e coerenza. Per aggiungere uno scenario, includere tutti e cinque i formati, generatore deterministico, licenza, esercizi/soluzioni IT/EN, metadati e test specifici. La cattura è generata da zero: “sanificazione” significa assenza di dati reali per costruzione, non anonimizzazione di una cattura reale.
