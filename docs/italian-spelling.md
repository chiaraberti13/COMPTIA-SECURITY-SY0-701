# Controllo ortografico italiano / Italian spelling

`npm run spellcheck` controlla separatamente italiano e inglese. Estrae le sottovoci
attive, tutte le domande attive, le guide dei cinque domini, i testi dell'interfaccia
e i percorsi. Gli errori indicano l'identificatore della voce da correggere.

## Dizionario e licenze

Il lessico `cspell/italian-project.txt` è un **vocabolario del progetto**, sotto la
licenza MIT del repository. Contiene solo parole già presenti nei testi MIT di
questo progetto, con le nuove forme corrette necessarie alle correzioni.
Non è stato copiato un dizionario italiano di terzi. Le forme comuni del corpus
iniziale sono state controllate contro un riferimento pubblico; i termini tecnici,
le forme mancanti e le elisioni sono stati esaminati separatamente. La verifica è
assistita dall'AI, non una certificazione linguistica umana.

Riferimento consultato durante la preparazione, **non distribuito né richiesto in
CI**: [mircomacrelli/italian-dictionary](https://github.com/mircomacrelli/italian-dictionary),
con [dedicazione al pubblico dominio](https://github.com/mircomacrelli/italian-dictionary/blob/main/LICENSE.md).
La lista del progetto è ricavata dalle parole dei propri contenuti, non esportata
da quel riferimento. Nessun pacchetto, eccezione o licenza è stato aggiunto alla
politica Dependency review. I dizionari GPL di cspell non vengono installati.
Le liste aggregate con provenienza ignota non sono state importate.

## Aggiungere contenuti

1. Eseguire `npm run spellcheck`.
2. Correggere il refuso nel testo sorgente. Le parole sconosciute non vengono mai
   accettate automaticamente.
3. Se la forma è corretta, aggiungerla esplicitamente al vocabolario italiano
   oppure al dizionario tecnico condiviso, con una motivazione nella PR.
4. Non generare il vocabolario da tutte le parole dei nuovi contenuti: introdurrebbe
   anche i refusi che il controllo deve trovare.

Il controllo copre l'intero corpus di studio, **non l'intera lingua italiana**:
può richiedere nuove forme corrette e non rileva parole valide usate nel contesto
sbagliato, accordi grammaticali o errori tecnici. Il dizionario inglese rimane
separato per evitare che il lessico italiano nasconda refusi inglesi.
Il Markdown della documentazione è verificato dal lint; non rientra nell'estrazione
ortografica dei contenuti didattici.

## English

The command checks both languages independently, covering active concepts and
questions, all domain guides, UI strings and study paths. The Italian dictionary
is project vocabulary under the repository MIT license, made from its own study
text, not a redistributed third-party word list. Initial common forms were
validated against a public-domain reference; specialist words and elisions were
checked separately with AI assistance. There is no claim of human validation.
No dependency license policy or exception changed. Unknown words require an
explicit review and addition; there is no automatic acceptance or regeneration.
This is a vocabulary check of the study corpus, not a complete Italian dictionary,
grammar checker, semantic review or documentation spelling check.
