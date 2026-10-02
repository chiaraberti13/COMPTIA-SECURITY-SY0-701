# Lab NN — Titolo breve e concreto

<!--
Copia questo file in labs/NN-nome-breve/README.md e la versione inglese in README.en.md.
tests/labs.test.ts richiede la tabella qui sotto (con gli stessi valori nelle due lingue) e
le sezioni "##" in quest'ordine. Nella versione inglese le intestazioni sono: Scenario,
Prerequisites, Topology, Setup, Exercise, Evidence, Cleanup, Final questions; le righe
della tabella: SY0-701 objectives, Risk, Duration.
-->

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 1.1, 4.1 |
| Rischio | `low` |
| Durata | 30 minuti |

Una o due frasi su che cosa si impara e perché serve, dentro e fuori dall'esame.

## Scenario

La situazione realistica da cui parte l'esercizio: chi sei, che cosa ti hanno chiesto, che
cosa devi dimostrare alla fine.

## Prerequisiti

- Software, versioni e sistema operativo.
- Conoscenze che si danno per scontate, con il collegamento alla guida del dominio.

## Topologia

Quali sistemi sono coinvolti, su quali indirizzi e porte ascoltano, e perché nessuno è
raggiungibile da fuori. Un piccolo schema testuale aiuta:

```text
[browser / curl] ──► 127.0.0.1:4190 [app in locale]
```

## Setup

I comandi per preparare l'ambiente, ognuno con una frase che dice che cosa fa, e il
controllo finale che l'ambiente è isolato (per esempio la verifica dell'interfaccia di
ascolto). Sopra il livello `low`: lo snapshot `prima-del-lab` della macchina virtuale e, per
`advanced-controlled`, la verifica che `ip route show default` non stampi nulla (vedi
[Isolamento e ripristino](README.md#isolamento-e-ripristino)). Il primo comando può essere
il [controllo preliminare](README.md#controllo-preliminare): `bash labs/preflight.sh NN`.

## Esercizio

I passaggi numerati. Per ognuno: il comando, l'output reale ottenuto dall'autore e la
spiegazione di che cosa osservare. Prima di ogni passaggio sensibile, un avviso `> ⚠️`.

## Evidenze

Che cosa salvare per dimostrare di aver completato il laboratorio (file, schermate, righe
di log) e dove salvarlo.

## Cleanup

I comandi per fermare ciò che è stato avviato, cancellare i file temporanei e verificare
che non sia rimasto nulla in ascolto. Per `advanced-controlled`, sempre il ripristino dello
snapshot.

## Domande finali

Tre o quattro domande che collegano l'esercizio agli obiettivi, ognuna con la risposta
ragionata dentro un blocco `<details>`.
