# Lab 04 — Una piccola PKI: CSR, catena, scadenza e revoca

| Campo | Valore |
|---|---|
| Obiettivi SY0-701 | 1.4 |
| Rischio | `low` |
| Durata | 45 minuti |

Con `openssl` crei una CA di laboratorio, firmi il certificato di un server a partire dalla sua
CSR, verifichi la catena, controlli la scadenza e poi revochi il certificato con una CRL. Sono
i passaggi che l'obiettivo 1.4 descrive a parole e che chi gestisce certificati fa ogni mese.

## Scenario

Il team che gestisce il server interno `web.lab.test` ti chiede un certificato TLS firmato
dalla CA aziendale di laboratorio. Dopo la consegna, il team segnala che la chiave privata del
server è finita per errore in una cartella condivisa: devi revocare il certificato e dimostrare
che chi controlla la CRL lo rifiuta.

## Prerequisiti

- OpenSSL 3.x (`openssl version`). È preinstallato su Linux e macOS; su Windows è incluso in
  Git for Windows.
- Conoscenze: PKI, CSR, catena di fiducia, CRL e OCSP (obiettivo 1.4, Dominio 1 della guida).

## Topologia

```text
[terminale] ──► ~/lab04 (file locali: chiavi, CSR, certificati, CRL)
```

Nessuna rete e nessuna modifica all'archivio dei certificati del sistema: la CA di laboratorio
esiste solo nella cartella `~/lab04` e nessun programma la considera attendibile. Il dominio
`lab.test` è riservato ai test (RFC 2606) e non esiste su Internet.

## Setup

1. Crea la cartella di lavoro ed entraci:

   ```bash
   mkdir -p ~/lab04 && cd ~/lab04
   ```

2. Prepara il database minimo che `openssl ca` usa per ricordare i certificati emessi e
   revocati:

   ```bash
   mkdir -p ca/newcerts && touch ca/index.txt
   echo 1000 > ca/serial && echo 1000 > ca/crlnumber
   ```

3. Scrivi la configurazione della CA. Definisce dove stanno i file, la durata dei certificati
   (90 giorni) e della CRL (7 giorni), e le estensioni di un certificato da server:

   ```bash
   cat > ca.cnf <<'EOF'
   [ ca ]
   default_ca = lab_ca
   [ lab_ca ]
   dir = ./ca
   database = $dir/index.txt
   new_certs_dir = $dir/newcerts
   serial = $dir/serial
   crlnumber = $dir/crlnumber
   certificate = ./ca.crt
   private_key = ./ca.key
   default_md = sha256
   default_days = 90
   default_crl_days = 7
   policy = lab_policy
   copy_extensions = copy
   unique_subject = no
   [ lab_policy ]
   commonName = supplied
   [ server_cert ]
   basicConstraints = critical,CA:FALSE
   keyUsage = critical,digitalSignature
   extendedKeyUsage = serverAuth
   EOF
   ```

## Esercizio

Le date e gli hash delle chiavi negli output sono quelli dell'esecuzione dell'autore: i tuoi saranno diversi.

1. **Crea la CA.** Una chiave ECDSA P-256 e un certificato autofirmato valido un anno, marcato
   come CA (`CA:TRUE`) e autorizzato solo a firmare certificati e CRL:

   ```bash
   openssl ecparam -name prime256v1 -genkey -noout -out ca.key
   openssl req -x509 -new -key ca.key -sha256 -days 365 -subj "/CN=Kestrelia Lab Root CA" \
     -addext "basicConstraints=critical,CA:TRUE" -addext "keyUsage=critical,keyCertSign,cRLSign" \
     -out ca.crt
   openssl x509 -in ca.crt -noout -subject -issuer
   ```

   ```text
   subject=CN = Kestrelia Lab Root CA
   issuer=CN = Kestrelia Lab Root CA
   ```

   Soggetto ed emittente coincidono: è una **root** autofirmata. La fiducia in lei non viene
   dalla firma, ma dal fatto che qualcuno decide di installarla come attendibile.

2. **Genera la chiave del server e la CSR.** La chiave privata resta sul server; alla CA va solo
   la CSR, che contiene la chiave pubblica, il nome e il SAN richiesto:

   ```bash
   openssl ecparam -name prime256v1 -genkey -noout -out web.key
   openssl req -new -key web.key -subj "/CN=web.lab.test" \
     -addext "subjectAltName=DNS:web.lab.test" -out web.csr
   openssl req -in web.csr -noout -verify -subject
   ```

   ```text
   Certificate request self-signature verify OK
   subject=CN = web.lab.test
   ```

   La CSR è firmata con la chiave del server: la verifica dimostra che chi l'ha prodotta
   possiede la chiave privata corrispondente.

3. **Firma la CSR con la CA:**

   ```bash
   openssl ca -batch -config ca.cnf -extensions server_cert -in web.csr -out web.crt
   ```

   ```text
   Using configuration from ca.cnf
   Check that the request matches the signature
   Signature ok
   The Subject's Distinguished Name is as follows
   commonName            :ASN.1 12:'web.lab.test'
   Certificate is to be certified until Dec 29 20:47:30 2026 GMT (90 days)

   Write out database with 1 new entries
   Database updated
   ```

4. **Leggi il certificato emesso:**

   ```bash
   openssl x509 -in web.crt -noout -subject -issuer -serial -dates \
     -ext subjectAltName,extendedKeyUsage
   ```

   ```text
   subject=CN = web.lab.test
   issuer=CN = Kestrelia Lab Root CA
   serial=1000
   notBefore=Sep 30 20:47:30 2026 GMT
   notAfter=Dec 29 20:47:30 2026 GMT
   X509v3 Extended Key Usage:
       TLS Web Server Authentication
   X509v3 Subject Alternative Name:
       DNS:web.lab.test
   ```

   I browser controllano il nome nel **SAN**, non nel CN. L'uso esteso `serverAuth` impedisce
   di usare questo certificato, per esempio, per firmare codice.

5. **Verifica la catena**, e confrontala con un certificato che la CA non ha firmato:

   ```bash
   openssl verify -CAfile ca.crt web.crt
   openssl req -x509 -new -key web.key -subj "/CN=web.lab.test" -days 30 -out selfsigned.crt
   openssl verify -CAfile ca.crt selfsigned.crt
   ```

   ```text
   web.crt: OK
   CN = web.lab.test
   error 18 at 0 depth lookup: self-signed certificate
   error selfsigned.crt: verification failed
   ```

   Lo stesso nome e la stessa chiave non bastano: il certificato autofirmato non discende dalla
   CA e viene rifiutato. È l'avviso che il browser mostra davanti a un certificato autofirmato.

6. **Controlla che chiave e certificato corrispondano**, confrontando l'hash delle due chiavi
   pubbliche. È il primo controllo da fare quando un server non si avvia dopo il rinnovo:

   ```bash
   openssl pkey -in web.key -pubout | sha256sum
   openssl x509 -in web.crt -noout -pubkey | sha256sum
   ```

   ```text
   d52628be7006a0bbaf1256610ef5e8aa885c2b6a1298d1f54334e0f1a1111c8f  -
   d52628be7006a0bbaf1256610ef5e8aa885c2b6a1298d1f54334e0f1a1111c8f  -
   ```

   La chiave è generata a caso, quindi il tuo hash sarà diverso da questo: conta che le due
   righe siano identiche fra loro.

7. **Controlla la scadenza** con `-checkend`, che risponde alla domanda «scadrà entro N
   secondi?». 2592000 secondi sono 30 giorni, 7776000 sono 90:

   ```bash
   openssl x509 -in web.crt -noout -checkend 2592000
   openssl x509 -in web.crt -noout -checkend 7776000
   ```

   ```text
   Certificate will not expire
   Certificate will expire
   ```

   Il comando esce con codice 1 quando il certificato scade entro la finestra: è ciò che
   serve a uno script di monitoraggio per aprire un ticket 30 giorni prima.

8. > ⚠️ Il passaggio seguente revoca il certificato in modo definitivo per questa CA: esegui
   > il comando solo nella cartella `~/lab04`.

   **Revoca il certificato** per compromissione della chiave e pubblica la CRL:

   ```bash
   openssl ca -config ca.cnf -revoke ca/newcerts/1000.pem -crl_reason keyCompromise
   openssl ca -config ca.cnf -gencrl -out ca.crl
   openssl crl -in ca.crl -noout -text | grep -E "Serial Number|Revocation Date|Key Compromise|Next Update"
   ```

   ```text
   Using configuration from ca.cnf
   Revoking Certificate 1000.
   Database updated
   Using configuration from ca.cnf
           Next Update: Oct  7 20:47:30 2026 GMT
       Serial Number: 1000
           Revocation Date: Sep 30 20:47:30 2026 GMT
                   Key Compromise
   ```

   La CRL è firmata dalla CA ed elenca i numeri di serie revocati. `Next Update` dice ai client
   fino a quando possono considerarla aggiornata.

9. **Verifica di nuovo, questa volta consultando la CRL:**

   ```bash
   openssl verify -crl_check -CAfile ca.crt -CRLfile ca.crl web.crt
   ```

   ```text
   CN = web.lab.test
   error 23 at 0 depth lookup: certificate revoked
   error web.crt: verification failed
   ```

   Il certificato è ancora nel suo periodo di validità, ma chi controlla la CRL lo rifiuta.
   Chi non la controlla continuerebbe ad accettarlo: la revoca protegge solo i client che la
   verificano.

## Aiuti e soluzione

### Indicatori di successo

- Prima della revoca, `openssl verify -CAfile ca.crt web.crt` stampa `web.crt: OK`.
- Le impronte delle due chiavi pubbliche del passaggio 6 coincidono.
- Dopo la revoca, la verifica con `-crl_check` dà `error 23 at 0 depth lookup: certificate
  revoked`.

### Se ti blocchi

Prova prima da solo: i suggerimenti si aprono uno alla volta, dal più vago alla soluzione.

<details>
<summary>Suggerimento 1</summary>

`openssl ca` non trova i suoi file? Lancialo dalla cartella `~/lab04`: la configurazione usa
percorsi relativi (`./ca`, `./ca.crt`).

</details>

<details>
<summary>Suggerimento 2</summary>

La verifica con la CRL dà ancora `OK`? Rigenera la CRL dopo la revoca (`-gencrl`) e passala con
`-CRLfile` insieme a `-crl_check`.

</details>

<details>
<summary>Soluzione ragionata</summary>

La CSR porta la chiave pubblica e il nome richiesto, firmata con la chiave privata del server;
la CA la firma aggiungendo il SAN e l'uso `serverAuth`. La verifica della catena risale dal
certificato alla radice che hai scelto di considerare attendibile: un certificato autofirmato
con lo stesso nome non ci arriva. La revoca entra in una CRL firmata dalla CA, e ha effetto solo
per i client che la controllano, o che usano OCSP.

</details>

### Errori comuni

- Mettere il nome solo nel CN: i browser leggono il SAN.
- Distribuire la chiave privata della CA insieme al suo certificato.
- Revocare senza pubblicare la nuova CRL.
- Leggere il valore di `-checkend` come giorni: sono secondi.

## Evidenze

Nella cartella `~/lab04` devono esserci:

- `web.crt` e `ca.crl`;
- `verifica.txt`, con l'output dei passaggi 5 e 9, salvato per esempio con
  `openssl verify -crl_check -CAfile ca.crt -CRLfile ca.crl web.crt > verifica.txt 2>&1`;
- due righe di commento: perché il certificato è rifiutato al passaggio 9, e che cosa
  succederebbe a un client che non consulta né la CRL né OCSP.

Non consegnare mai i file `.key`: sono le chiavi private.

## Cleanup

Nessun archivio di sistema è stato modificato. Quando hai consegnato le evidenze, cancella la
cartella, chiavi private comprese:

```bash
cd ~ && rm -r -- ~/lab04
```

## Domande finali

1. Perché alla CA si invia la CSR e non la chiave privata?

   <details>
   <summary>Risposta</summary>

   Perché la CA deve solo attestare il legame fra un nome e una **chiave pubblica**. La chiave
   privata non deve mai uscire dal server: chiunque la possieda può impersonarlo. La CSR
   contiene la chiave pubblica ed è firmata con quella privata, così la CA verifica il possesso
   senza vederla.

   </details>

2. Un certificato revocato è ancora «valido» secondo le date. Come fa un client ad accorgersi
   della revoca, e quali sono i limiti di ciascun metodo?

   <details>
   <summary>Risposta</summary>

   Con la **CRL**, un elenco firmato scaricato periodicamente: semplice, ma può essere vecchio
   fino al `Next Update` e crescere molto. Con **OCSP**, una richiesta per singolo certificato
   al responder della CA: risposta aggiornata, ma rivela quali siti visiti. Con l'**OCSP
   stapling** è il server a presentare la risposta firmata insieme al certificato, senza che il
   client contatti la CA.

   </details>

3. Il certificato dura 90 giorni. Perché le CA pubbliche spingono verso durate sempre più
   brevi?

   <details>
   <summary>Risposta</summary>

   Perché la revoca funziona male nella pratica: molti client non la controllano. Una durata
   breve limita il tempo in cui un certificato con chiave compromessa resta utilizzabile, e
   obbliga ad automatizzare il rinnovo, riducendo le scadenze dimenticate.

   </details>

4. Perché la chiave della CA radice di un'azienda si conserva di solito offline, magari in un
   HSM, e si usa una CA intermedia per l'emissione quotidiana?

   <details>
   <summary>Risposta</summary>

   Perché chi ottiene la chiave della radice può emettere certificati validi per qualunque
   nome, e rimediare significa sostituire la radice su ogni dispositivo. Con una CA intermedia
   online e la radice offline, la compromissione dell'intermedia si risolve revocandola e
   firmandone un'altra con la radice, senza toccare i dispositivi.

   </details>
