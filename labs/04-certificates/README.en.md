# Lab 04 — A small PKI: CSR, chain, expiry and revocation

| Field | Value |
|---|---|
| SY0-701 objectives | 1.4 |
| Risk | `low` |
| Duration | 45 minutes |

With `openssl` you create a lab CA, sign a server certificate from its CSR, verify the chain,
check expiry and then revoke the certificate with a CRL. These are the steps objective 1.4
describes in words, and that whoever manages certificates carries out every month.

## Scenario

The team running the internal server `web.lab.test` asks you for a TLS certificate signed by
the company's lab CA. After delivery, the team reports that the server's private key ended up
in a shared folder by mistake: you must revoke the certificate and show that anyone checking
the CRL rejects it.

## Prerequisites

- OpenSSL 3.x (`openssl version`). It is preinstalled on Linux and macOS; on Windows it comes
  with Git for Windows.
- Knowledge: PKI, CSR, chain of trust, CRL and OCSP (objective 1.4, Domain 1 of the guide).

## Topology

```text
[terminal] ──► ~/lab04 (local files: keys, CSR, certificates, CRL)
```

No network and no change to the system certificate store: the lab CA exists only in the
`~/lab04` folder and no program trusts it. The `lab.test` domain is reserved for testing
(RFC 2606) and does not exist on the Internet.

## Setup

1. Create the working folder and enter it:

   ```bash
   mkdir -p ~/lab04 && cd ~/lab04
   ```

2. Prepare the minimal database `openssl ca` uses to remember issued and revoked
   certificates:

   ```bash
   mkdir -p ca/newcerts && touch ca/index.txt
   echo 1000 > ca/serial && echo 1000 > ca/crlnumber
   ```

3. Write the CA configuration. It defines where the files live, the lifetime of certificates
   (90 days) and of the CRL (7 days), and the extensions of a server certificate:

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

## Exercise

The dates and key hashes in the outputs are those of the author's run: yours will differ.

1. **Create the CA.** An ECDSA P-256 key and a self-signed certificate valid for one year,
   marked as a CA (`CA:TRUE`) and allowed only to sign certificates and CRLs:

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

   Subject and issuer are the same: it is a self-signed **root**. Trust in it does not come
   from the signature, but from someone deciding to install it as trusted.

2. **Generate the server key and the CSR.** The private key stays on the server; only the CSR
   goes to the CA, carrying the public key, the name and the requested SAN:

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

   The CSR is signed with the server key: the check proves that whoever produced it holds the
   matching private key.

3. **Sign the CSR with the CA:**

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

4. **Read the issued certificate:**

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

   Browsers check the name in the **SAN**, not in the CN. The `serverAuth` extended key usage
   prevents this certificate from being used, for example, to sign code.

5. **Verify the chain**, and compare it with a certificate the CA did not sign:

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

   The same name and the same key are not enough: the self-signed certificate does not chain
   to the CA and is rejected. It is the warning a browser shows for a self-signed certificate.

6. **Check that key and certificate match** by comparing the hash of the two public keys. It
   is the first check to run when a server fails to start after a renewal:

   ```bash
   openssl pkey -in web.key -pubout | sha256sum
   openssl x509 -in web.crt -noout -pubkey | sha256sum
   ```

   ```text
   d52628be7006a0bbaf1256610ef5e8aa885c2b6a1298d1f54334e0f1a1111c8f  -
   d52628be7006a0bbaf1256610ef5e8aa885c2b6a1298d1f54334e0f1a1111c8f  -
   ```

   The key is generated at random, so your hash will differ from this one: what matters is
   that the two lines are identical to each other.

7. **Check expiry** with `-checkend`, which answers "will it expire within N seconds?".
   2592000 seconds are 30 days, 7776000 are 90:

   ```bash
   openssl x509 -in web.crt -noout -checkend 2592000
   openssl x509 -in web.crt -noout -checkend 7776000
   ```

   ```text
   Certificate will not expire
   Certificate will expire
   ```

   The command exits with code 1 when the certificate expires within the window: that is what
   a monitoring script needs to open a ticket 30 days ahead.

8. > ⚠️ The next step revokes the certificate permanently for this CA: run the command only in
   > the `~/lab04` folder.

   **Revoke the certificate** for key compromise and publish the CRL:

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

   The CRL is signed by the CA and lists the revoked serial numbers. `Next Update` tells
   clients how long they may consider it current.

9. **Verify again, this time checking the CRL:**

   ```bash
   openssl verify -crl_check -CAfile ca.crt -CRLfile ca.crl web.crt
   ```

   ```text
   CN = web.lab.test
   error 23 at 0 depth lookup: certificate revoked
   error web.crt: verification failed
   ```

   The certificate is still within its validity period, but anyone checking the CRL rejects
   it. Anyone who does not check would keep accepting it: revocation protects only the
   clients that verify it.

## Hints and solution

### Success indicators

- Before revocation, `openssl verify -CAfile ca.crt web.crt` prints `web.crt: OK`.
- The hashes of the two public keys in step 6 match.
- After revocation, checking with `-crl_check` gives `error 23 at 0 depth lookup: certificate
  revoked`.

### If you get stuck

Try on your own first: the hints open one at a time, from the vaguest to the solution.

<details>
<summary>Hint 1</summary>

`openssl ca` cannot find its files? Run it from the `~/lab04` folder: the configuration uses
relative paths (`./ca`, `./ca.crt`).

</details>

<details>
<summary>Hint 2</summary>

The CRL check still says `OK`? Regenerate the CRL after revoking (`-gencrl`) and pass it with
`-CRLfile` together with `-crl_check`.

</details>

<details>
<summary>Worked solution</summary>

The CSR carries the public key and the requested name, signed with the server's private key; the
CA signs it, adding the SAN and the `serverAuth` usage. Chain verification climbs from the
certificate to the root you chose to trust: a self-signed certificate with the same name never
gets there. Revocation goes into a CRL signed by the CA, and takes effect only for clients that
check it, or that use OCSP.

</details>

### Common mistakes

- Putting the name only in the CN: browsers read the SAN.
- Distributing the CA's private key together with its certificate.
- Revoking without publishing the new CRL.
- Reading the `-checkend` value as days: it is seconds.

## Evidence

The `~/lab04` folder must contain:

- `web.crt` and `ca.crl`;
- `verify.txt`, with the output of steps 5 and 9, saved for example with
  `openssl verify -crl_check -CAfile ca.crt -CRLfile ca.crl web.crt > verify.txt 2>&1`;
- two lines of comment: why the certificate is rejected in step 9, and what would happen to a
  client that checks neither the CRL nor OCSP.

Never hand in the `.key` files: they are the private keys.

## Cleanup

No system store was changed. Once you have delivered your evidence, delete the folder, private
keys included:

```bash
cd ~ && rm -r -- ~/lab04
```

## Final questions

1. Why do you send the CA the CSR and not the private key?

   <details>
   <summary>Answer</summary>

   Because the CA only has to vouch for the link between a name and a **public key**. The
   private key must never leave the server: whoever holds it can impersonate it. The CSR
   carries the public key and is signed with the private one, so the CA checks possession
   without ever seeing it.

   </details>

2. A revoked certificate is still "valid" by its dates. How does a client notice the
   revocation, and what are the limits of each method?

   <details>
   <summary>Answer</summary>

   With the **CRL**, a signed list downloaded periodically: simple, but it can be as old as
   its `Next Update` and grow large. With **OCSP**, a request per certificate to the CA's
   responder: an up-to-date answer, but it reveals which sites you visit. With **OCSP
   stapling** the server presents the signed answer along with its certificate, so the client
   never contacts the CA.

   </details>

3. The certificate lasts 90 days. Why do public CAs push toward ever shorter lifetimes?

   <details>
   <summary>Answer</summary>

   Because revocation works poorly in practice: many clients do not check it. A short lifetime
   limits how long a certificate with a compromised key stays usable, and forces renewal to be
   automated, which cuts forgotten expirations.

   </details>

4. Why is a company's root CA key usually kept offline, perhaps in an HSM, with an
   intermediate CA used for day-to-day issuance?

   <details>
   <summary>Answer</summary>

   Because whoever obtains the root key can issue valid certificates for any name, and the fix
   means replacing the root on every device. With an online intermediate and an offline root,
   a compromised intermediate is dealt with by revoking it and signing a new one with the
   root, without touching the devices.

   </details>
