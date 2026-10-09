# EOL, EOS ed EOSL: ciclo di vendita, manutenzione e supporto

La voce `LegacyEOLVuln` distingue una tecnologia legacy dalle milestone
contrattuali pubblicate dal produttore. EOL, EOS ed EOSL non hanno un significato
universale: occorre verificare sempre prodotto, versione, data e condizioni.

Come esempio verificabile, la
[Cisco End-of-Life Policy](https://www.cisco.com/c/en/us/products/eos-eol-policy.html)
definisce EOL come un processo, EOS come *End of Sale* e LDOS come ultimo giorno
di supporto. Altri vendor possono espandere EOS come *End of Support* ed EOSL
come *End of Service Life*.

## Calendario sintetico dell'esercizio

| Data | Milestone | Decisione |
| --- | --- | --- |
| 01/01/2027 | Avviso EOL | Inventario e piano di migrazione |
| 01/07/2027 | Fine vendita | Il prodotto non è ordinabile; patch e supporto possono continuare |
| 01/07/2028 | Fine manutenzione ordinaria | Non fare affidamento su nuove patch programmate |
| 01/07/2030 | Fine supporto esteso | Nessuna assistenza contrattuale prevista dopo la data |

Un aggiornamento eccezionale può essere rilasciato a discrezione del produttore:
non è garantito e non deve essere assunto nel piano di rischio. Segmentazione,
allowlist, monitoraggio e virtual patching riducono l'esposizione ma non
riattivano il supporto. La domanda 468 è stata allineata alla stessa distinzione.
