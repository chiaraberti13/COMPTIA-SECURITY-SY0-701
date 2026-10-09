/**
 * English translation layer for the study content.
 *
 * Translations are stored as *keyed overrides* rather than full parallel
 * arrays: the localizer (see `localizedData.ts`) clones the Italian source
 * structure and overlays any English fields present here, falling back to the
 * Italian text for anything not yet translated. This keeps translation purely
 * additive and guarantees the app never breaks while coverage grows.
 *
 *  - GROUP_EN     : keyed by the Italian TopicGroup `title`
 *  - SUBTOPIC_EN  : keyed by the subtopic `checklistKey`
 *  - QUESTION_EN  : keyed by the numeric question `id`
 */

export interface GroupOverride {
  title?: string;
  description?: string;
}

export interface SubtopicOverride {
  name?: string;
  definition?: string;
  details?: string;
  examTip?: string;
  keyFormulas?: string[];
  comparativeTable?: { headers: string[]; rows: string[][] };
}

export interface QuestionOverride {
  topic?: string;
  scenario?: string;
  question?: string;
  options?: string[];
  explanation?: string;
}

/* ------------------------------------------------------------------ *
 * Topic-group titles & descriptions
 * ------------------------------------------------------------------ */

export const GROUP_EN: Record<string, GroupOverride> = {
  // Domain 1
  "1. Fondamentali d'Esame (Obj 1.2)": {
    title: "1. Exam Fundamentals (Obj 1.2)",
    description: "Core principles and cornerstone concepts of information security.",
  },
  "2. Security Controls (Obj 1.1)": {
    title: "2. Security Controls (Obj 1.1)",
    description: "Categories of security controls based on how they are implemented.",
  },
  "3. Control Types (Obj 1.1)": {
    title: "3. Control Types (Obj 1.1)",
    description: "Functional classification of controls based on the timing of the action.",
  },
  "4. Change Management (Obj 1.3)": {
    title: "4. Change Management (Obj 1.3)",
    description: "Standardized processes to introduce production changes without outages or gaps.",
  },
  "5. Cryptography (Obj 1.4)": {
    title: "5. Cryptography (Obj 1.4)",
    description: "Algorithms, cryptographic mechanisms and Public Key Infrastructure (PKI).",
  },
  "6. Physical Security (Obj 1.2)": {
    title: "6. Physical Security (Obj 1.2)",
    description: "Physical controls to protect facilities and tangible assets.",
  },
  "7. Deception Technologies (Obj 1.2)": {
    title: "7. Deception Technologies (Obj 1.2)",
    description: "Deception-based technologies to detect attackers early.",
  },
  "8. Identity & Access Control Models (Obj 4.6)": {
    title: "8. Identity & Access Control Models (Obj 4.6)",
    description: "Identity management, multifactor authentication, directory services and authorization models. Caution: these topics belong to objective 4.6 (Security Operations): they are gathered here because they are needed from the outset, but on the exam they count as Domain 4, not Domain 1."
  },

  // Domain 2
  "1. Threat Actors (Obj 2.1)": {
    title: "1. Threat Actors (Obj 2.1)",
    description: "The parties responsible for cyber threats, their capabilities and resources.",
  },
  "2. Motivations (Obj 2.1)": {
    title: "2. Motivations (Obj 2.1)",
    description: "The psychological, strategic and economic drivers behind cyberattacks.",
  },
  "3. Threat Vectors & Attack Surfaces (Obj 2.2)": {
    title: "3. Threat Vectors & Attack Surfaces (Obj 2.2)",
    description: "The channels or paths used by threat actors to access or compromise a system.",
  },
  "4. Malware (Obj 2.4)": {
    title: "4. Malware (Obj 2.4)",
    description: "The different types of malicious software designed to compromise systems and data.",
  },
  "5. Social Engineering (Obj 2.2)": {
    title: "5. Social Engineering (Obj 2.2)",
    description: "Psychological manipulation techniques used to trick people into taking actions or revealing sensitive data.",
  },
  "6. Password Attacks (Obj 2.4)": {
    title: "6. Password Attacks (Obj 2.4)",
    description: "The methods used to breach credential-based authentication systems.",
  },
  "7. Network, Wireless & App Attacks (Obj 2.4)": {
    title: "7. Network, Wireless & App Attacks (Obj 2.4)",
    description: "Attacks aimed at data transmission channels, network protocols and web applications.",
  },
  "8. Vulnerabilities (Obj 2.3)": {
    title: "8. Vulnerabilities (Obj 2.3)",
    description: "Identification, assessment and cataloging of weaknesses in computer systems.",
  },
  "9. Mitigations (Obj 2.5)": {
    title: "9. Mitigations (Obj 2.5)",
    description: "Techniques and countermeasures to reduce risk, shrink the attack surface and counter threats.",
  },
  "10. Threat Intelligence (Obj 2.1, 2.2 & 4.3)": {
    title: "10. Threat Intelligence (Obj 2.1, 2.2 & 4.3)",
    description: "Threat information sources, OSINT, information sharing and dark web intelligence.",
  },

  // Domain 3
  "1. Cloud (Obj 3.1)": {
    title: "1. Cloud (Obj 3.1)",
    description: "Cloud service and deployment models, the split of security responsibilities and data governance.",
  },
  "2. Network Security (Obj 3.2)": {
    title: "2. Network Security (Obj 3.2)",
    description: "Network security architecture and protocols, encrypted tunneling and centralized access management.",
  },
  "3. Firewalls (Obj 3.2)": {
    title: "3. Firewalls (Obj 3.2)",
    description: "Appliances for inspecting and filtering traffic at various layers of the OSI model.",
  },
  "4. Data Security (Obj 3.3)": {
    title: "4. Data Security (Obj 3.3)",
    description: "Protecting digital information across its various states, and encryption and obfuscation techniques.",
  },
  "5. Resilience & Recovery (Obj 3.4)": {
    title: "5. Resilience & Recovery (Obj 3.4)",
    description: "Business continuity systems, load and power redundancy, backup methods and alternate sites.",
  },
  "6. Dispositivi Speciali & IoT (Obj 3.1)": {
    title: "6. Specialized Devices & IoT (Obj 3.1)",
    description: "Security in industrial, embedded and specialized systems and Internet of Things networks.",
  },
  "7. PBQ Dominio 3 Scenarios (Obj 3.1-3.4)": {
    title: "7. Domain 3 PBQ Scenarios (Obj 3.1-3.4)",
    description: "Practical scenarios and Performance-Based Questions on Domain 3.",
  },

  // Domain 4
  "1. Hardening (Obj 4.1)": {
    title: "1. Hardening (Obj 4.1)",
    description: "Process of hardening systems, networks, servers, mobile devices and IoT to reduce the attack surface.",
  },
  "2. Mobile Security (Obj 4.1)": {
    title: "2. Mobile Security (Obj 4.1)",
    description: "Organizational provisioning models and centralized control tools for mobile devices.",
  },
  "3. Vulnerability Management (Obj 4.3)": {
    title: "3. Vulnerability Management (Obj 4.3)",
    description: "Methods to identify, classify, assess and mitigate security weaknesses.",
  },
  "4. Monitoring & Enterprise Controls (Obj 4.4 e 4.5)": {
    title: "4. Monitoring & Enterprise Controls (Obj 4.4 and 4.5)",
    description: "Systems, protocols and agents to analyze flows and centralize events (Obj 4.4), together with the controls that modify enterprise security capabilities (Obj 4.5): EDR/XDR, DLP, UBA, DNS and web filtering, file integrity monitoring.",
  },
  "5. Log Analysis (Obj 4.9)": {
    title: "5. Log Analysis (Obj 4.9)",
    description: "Technical analysis and forensic interpretation of logs generated by various devices and defensive appliances.",
  },
  "6. Incident Response (Obj 4.8)": {
    title: "6. Incident Response (Obj 4.8)",
    description: "Structured phases of the security incident management lifecycle to limit damage.",
  },
  "7. Digital Forensics (Obj 4.8)": {
    title: "7. Digital Forensics (Obj 4.8)",
    description: "Preservation, acquisition and scientific analysis of digital evidence to ensure its legal admissibility.",
  },
  "8. Automation (Obj 4.7)": {
    title: "8. Automation (Obj 4.7)",
    description: "Integration, scripting and orchestration of coordinated defensive responses.",
  },
  "9. PBQ Dominio 4 (Obj 4.8 / 4.9)": {
    title: "9. Domain 4 PBQ (Obj 4.8 / 4.9)",
    description: "Practical scenarios and Performance-Based Questions on log triage, investigation and host isolation.",
  },

  // Domain 5
  "1. Governance (Obj 5.1)": {
    title: "1. Governance (Obj 5.1)",
    description: "The decision-making structure, organizational oversight and alignment of security goals with business strategy.",
  },
  "2. Policies (Obj 5.1)": {
    title: "2. Policies (Obj 5.1)",
    description: "The documentary foundations of security: policies, standards, procedures and lifecycle and change management.",
  },
  "3. Risk Management (Obj 5.2)": {
    title: "3. Risk Management (Obj 5.2)",
    description: "Methods to identify, quantify and document the organization's risk exposure.",
  },
  "4. Risk Responses (Obj 5.2)": {
    title: "4. Risk Responses (Obj 5.2)",
    description: "The four fundamental strategies established by best practice to handle identified risk.",
  },
  "5. Compliance (Obj 5.4)": {
    title: "5. Compliance (Obj 5.4)",
    description: "Meeting legal requirements, protecting privacy and exercising professional responsibility.",
  },
  "6. Third Party Risk (Obj 5.3)": {
    title: "6. Third Party Risk (Obj 5.3)",
    description: "Managing and mitigating risks arising from vendors, business partners and supply chains.",
  },
  "7. Agreements (Obj 5.3)": {
    title: "7. Agreements (Obj 5.3)",
    description: "Types of formal agreements and contracts governing operational and commercial relationships with third parties.",
  },
  "8. Audits (Obj 5.5)": {
    title: "8. Audits (Obj 5.5)",
    description: "Formal, independent processes to evaluate the effectiveness of security controls and the organization's defensive posture.",
  },
  "9. Security Awareness (Obj 5.6)": {
    title: "9. Security Awareness (Obj 5.6)",
    description: "The human factor as the organization's first line of defense through ongoing training and exercise programs.",
  },
  "10. Secure Deconstruction & Disposal (Obj 4.2)": {
    title: "10. Secure Deconstruction & Disposal (Obj 4.2)",
    description: "Asset lifecycle and secure disposal: acquisition, assignment and ownership, inventory and tracking, decommissioning, sanitization, certified destruction and data retention. Caution: these topics belong to objective 4.2 (Security Operations): they are gathered here for continuity with governance, but on the exam they count as Domain 4, not Domain 5."
  },
};

/* ------------------------------------------------------------------ *
 * Subtopic overrides (keyed by checklistKey)
 * Populated in batches. Anything missing falls back to Italian.
 * ------------------------------------------------------------------ */

export const SUBTOPIC_EN: Record<number, Record<string, SubtopicOverride>> = {
  1: {
    "SingleSignOn": {
      "name": "Single Sign-On (SSO)",
      "definition": "Single authentication reused across multiple applications.",
      "details": "SSO is an access outcome, not a protocol: it can use Kerberos within an enterprise realm or SAML/OpenID Connect across federated systems. Each application keeps its own permissions and sessions; disabling the IdP does not automatically revoke existing sessions. **Focused Mini-Example:** Kestrelia opens payroll and projects after one login. See MFA, SSO & Identity Federation and Federation.\n\nSource: OASIS SAML 2.0 Core.",
      "examTip": "SSO implies neither MFA nor permission to access every resource."
    },
    "SAML": {
      "name": "Security Assertion Markup Language (SAML)",
      "definition": "An XML-based standard for exchanging security assertions, commonly used for federated web authentication.",
      "details": "The Identity Provider (IdP) authenticates the user; the Service Provider (SP) checks the signed assertion, issuer, recipient/audience and validity period before creating a local session. A signature does not automatically encrypt attributes. **Focused Mini-Example:** the Kestrelia IdP asserts identity to an external payroll portal without sending the password. See Federation and Single Sign-On (SSO).\n\nSource: OASIS SAML 2.0 Core.",
      "examTip": "A SAML assertion is not an OAuth access token."
    },
    "OAuth2": {
      "name": "OAuth 2.0",
      "definition": "An authorization framework that grants a client limited access to protected resources.",
      "details": "A resource owner can delegate a scope to a client; the authorization server issues an access token that the resource server checks before allowing the operation. An access token can be opaque or structured: it is not necessarily JWT and does not by itself prove user identity to the client. **Focused Mini-Example:** Kestrelia lets an app read a calendar without granting write access or sharing a password. See OpenID Connect (OIDC) and Federation.\n\nSource: RFC 6749.",
      "examTip": "OAuth 2.0 provides delegated authorization, not an authentication protocol."
    },
    "OpenIDConnect": {
      "name": "OpenID Connect (OIDC)",
      "definition": "An identity layer built on OAuth 2.0 that enables a client to verify end-user authentication.",
      "details": "The OpenID Provider (OP, IdP role) authenticates the user and issues an ID token JWT to the Relying Party (RP, client). The RP checks signature, issuer, audience, expiration and nonce when applicable. The ID token describes authentication for the client; the access token authorizes API access and may be opaque. **Focused Mini-Example:** Kestrelia signs into an app with OIDC; the app separately uses an access token to read a profile. See OAuth 2.0, SAML and Single Sign-On (SSO).\n\nSource: OpenID Connect Core.",
      "examTip": "Do not use an ID token as an API access token."
    },
    "Kerberos": {
      "name": "Kerberos",
      "definition": "A network authentication protocol using tickets issued by a trusted Key Distribution Center.",
      "details": "The Key Distribution Center (KDC) includes an Authentication Service and a Ticket Granting Service. After initial authentication the client receives a Ticket Granting Ticket (TGT), uses it to request a service ticket for the intended service, then presents that ticket and an authenticator to the service. The TGT is not directly used as a file-server ticket. Key protection, KDC availability and clock synchronization matter. **Focused Mini-Example:** Kestrelia opens a share within its enterprise realm without reentering a password. See Single Sign-On (SSO) and Federation: Kerberos supports cross-realm trust but does not automatically equal SAML/OIDC web federation.\n\nSource: RFC 4120.",
      "examTip": "An authentication ticket does not imply unlimited authorization; the service enforces permissions."
    },

    SteganographyConcept: {
      "name": "Steganography (Steganografia)",
      "definition": "A technique that embeds a message in a carrier, such as an image or an audio file, to conceal the existence of the communication.",
      "details": "Steganography separates the **hidden message** from the apparently ordinary **carrier** that transports it, called the cover object. The recipient uses the intended extraction method; some schemes also require a key.\n* **Images and audio:** small changes to pixel data or audio samples can embed a message without obvious visual or audible changes. Not every format and method withstands recompression, resizing or file conversion.\n* **Limits:** statistical analysis or comparison with the original may reveal hidden data. Once extracted, an unencrypted message is readable: steganography alone does not guarantee confidentiality, integrity or authenticity.\n* **Comparison:** encryption protects content with a key; hashing produces a fingerprint for checking data; tokenization replaces data with a token; masking limits what is displayed. Code obfuscation makes a program difficult to analyze without changing its behavior: it does not imply a message inside a carrier.\n\n* **Focused Mini-Example:** Kestrelia uses a synthetic picture and a test audio recording to carry the fictional phrase “Meeting in the blue room”. Hiding it in the carrier is steganography; making it unreadable without a key is encryption. The techniques can be combined, but hiding the phrase does not prove who wrote it or prevent alteration.\n\nTerminology source: NIST CSRC glossary, steganography entry.",
      "examTip": "If the scenario asks to hide the existence of a message in an image or audio, choose steganography; if it asks to make the content unreadable without the key, choose encryption."
    },
    "LegacyPAP": {
      "name": "Password Authentication Protocol (PAP)",
      "definition": "PAP is a legacy PPP authentication protocol that sends the username and password in plaintext over the link.",
      "details": "PAP provides neither confidentiality nor replay protection on its own. An outer tunnel can protect transport, but does not change the properties of the inner method. Do not use it over unprotected links.\n\n* **Focused Mini-Example:** Kestrelia finds PAP in an old remote access configuration and requires an approved authentication method before reactivating it.",
      "examTip": "PAP sends plaintext credentials; do not confuse it with a challenge-response method."
    },
    "LegacyNTLM": {
      "name": "New Technology LAN Manager (NTLM)",
      "definition": "NTLM is a legacy family of Microsoft challenge-response authentication protocols.",
      "details": "The password is not sent directly, but this does not prevent relay or pass-the-hash. NTLM is deprecated: inventory dependencies and prefer Kerberos where supported, without blindly disrupting services.\n\n* **Focused Mini-Example:** Kestrelia detects NTLM in application logs and tests Kerberos authentication in an isolated environment before migration.",
      "examTip": "Challenge-response does not imply relay resistance; NTLM is not Kerberos."
    },
    "CertificateP12": {
      "name": "PKCS #12 (P12) / Personal Information Exchange (PFX)",
      "definition": "P12 and PFX are common extensions for PKCS #12 containers, which can include certificates, a chain and a private key.",
      "details": "The container can protect the private key with a password; protection depends on the selected algorithms and password. It is not just a public certificate to distribute freely.\n\n* **Focused Mini-Example:** Kestrelia transfers a protected PFX to the authorized server, communicates the password through a separate channel and removes the temporary copy after import.",
      "examTip": "P12/PFX may include the private key: protect the file and restrict distribution."
    },
    "CertificateDER": {
      "name": "Distinguished Encoding Rules (DER)",
      "definition": "DER is a deterministic binary encoding for ASN.1 structures, also used by certificates.",
      "details": "DER and PEM can represent the same certificate: the encoding changes, not trust in the CA. The .cer extension does not guarantee the encoding: it may contain DER or PEM. Do not confuse .cer with CER, the biometric error rate.\n\n* **Focused Mini-Example:** Kestrelia receives a .cer file and checks the encoding before import, without inferring it from the name.",
      "examTip": "DER is binary; PEM is textual. A public certificate does not contain the private key."
    },
    "CertificatePEM": {
      "name": "Privacy Enhanced Mail (PEM)",
      "definition": "PEM is a Base64 textual encoding with delimiters for certificates and other cryptographic objects.",
      "details": "The format represents binary data as text; it adds no encryption. A PEM file can contain a public certificate or a private key: check the object type and protect keys.\n\n* **Focused Mini-Example:** Kestrelia imports a PEM certificate into the web server and keeps the private key separately with restricted access.",
      "examTip": "PEM identifies a textual representation, not an encryption algorithm."
    },
  /* ---------------- Domain 1 · Group 1: Exam Fundamentals ---------------- */
  CIATriad: {
    name: "CIA Triad",
    definition: "The three fundamental pillars of information security: Confidentiality, Integrity and Availability.",
    details: "A deep understanding of the three key concepts:\n* **Confidentiality:** Preventing unauthorized access to data. Enabling techniques: data encryption (AES/RSA), access control lists (ACL), multi-factor authentication (MFA) and role-based access control.\n* **Integrity:** Ensuring that data is not modified, corrupted or destroyed in an unauthorized or accidental way throughout its lifecycle. Enabling techniques: hash functions (SHA-256), digital signatures, checksums and version control.\n* **Availability:** Ensuring constant, timely and reliable access to systems, networks and information for all legitimate and authorized users. Enabling techniques: hardware redundancy (RAID, redundant power supplies), server clustering, geographic backups, uninterruptible power supplies (UPS) and automatic failover plans.\n\n* **Focused Mini-Example:** In a banking application, **Confidentiality** prevents other customers from reading your account balance; **Integrity** prevents malware from altering the amount of a transfer in transit from €10 to €10,000; **Availability** ensures the home-banking app stays up and running even under a DDoS attack thanks to dedicated network filters.",
    examTip: "In a ransomware attack, the attack compromises Availability (by encrypting files), but potentially also Integrity and Confidentiality in a multi-extortion scenario.",
  },
  AAAFramework: {
    name: "AAA",
    definition: "Authentication, Authorization, and Accounting: the standard framework for access control.",
    details: "The AAA framework governs the entire lifecycle of identity and security-permission management:\n* **Authentication:** The process of verifying the identity claimed by a subject (user, service or device). It relies on the four factors of objective 4.6: something you know (password, PIN), something you have (smart card, OTP token), something you are (biometrics) and where you are (geolocation, IP address).\n* **Authorization:** The process of determining which specific privileges, permissions and resources are granted to the previously authenticated identity (e.g. read-only access, write permissions, script execution).\n* **Accounting (Audit/Traceability):** The chronological and systematic recording of all activities performed by users within the systems (e.g. who logged in, which files they modified, what time they logged out) inside protected audit logs.\n\n* **Focused Mini-Example:** When an employee swipes their RFID badge to enter a secured research office, the reader verifies that the badge is valid (**Authentication**), unlocks the door only if the user belongs to the senior researchers group (**Authorization**), and records the exact time of entry and the employee ID in the central electronic log (**Accounting**).",
    examTip: "Logs must be write-protected and stored separately to guarantee the effectiveness of Accounting.",
  },
  NonRepudiation: {
    name: "Non-Repudiation",
    definition: "The property whereby whoever performed an action cannot credibly deny having done so, because verifiable evidence exists that a third party can check.",
    details: "Non-repudiation comes from combining **hashing** and **asymmetric cryptography** in a digital signature:\n* **How signing actually works:** the signer computes the document's **hash** and, with their **private key**, produces a **signature** using a signature algorithm (RSA-PSS, ECDSA, Ed25519). The recipient uses the **public key** to **verify** the signature, establishing whether it is valid for that document and that key.\n* **A widespread but imprecise description:** you will often read that signing \"encrypts the hash with the private key\" and that the recipient \"decrypts the signature\". That analogy only describes the old RSA PKCS#1 v1.5 scheme; in modern schemes, signing **is not encrypting** and verifying **is not decrypting**. Above all, signing **does not make the document secret**: if confidentiality is also needed, encryption is a separate operation.\n* **What a signature proves:** **integrity** (the document has not changed since signing) and **origin** (that private key was used). The step from the key to the **person** is not automatic: it depends on the key genuinely being bound to that subject (certificate, identity proofing) and on it having been **kept safe**. A stolen private key produces perfectly valid signatures.\n\n* **Focused Mini-Example:** an investor confirms an order by pressing the button on their PIN-protected hardware token. If the stock collapses, the signature is **strong evidence** that the order came from their key: the bank can produce the signed transaction, the logs and the token-issuance procedure. It is not, however, a bar to dispute: the investor might claim the token had been stolen, and it is the body of evidence, not the mathematics alone, that will settle who is right.",
    examTip: "**Symmetric cryptography provides no non-repudiation**: with a key shared between two parties, neither can prove to a third party that the other produced the message, because either could have. A **private** key held by one party alone is required. **Exam trap:** keep signing and encrypting apart - a signature gives integrity, origin authentication and non-repudiation, but **not** confidentiality; encryption gives confidentiality but **not** non-repudiation. And remember that non-repudiation is only as strong as the custody of the private key.",
  },
  GapAnalysis: {
    name: "Gap Analysis",
    definition: "Assessment of the gap between the current security posture and the ideal or required state.",
    details: "A formal analysis used to compare the organization's current security posture against international standards or legal regulatory requirements:\n* **Systematic Comparison:** The current state (As-Is state) is analyzed against recognized standards (e.g. ISO 27001, NIST CSF, PCI DSS) or internal corporate policies (To-Be state).\n* **Identification of Gaps:** It highlights missing, ineffective or partially implemented controls.\n* **Strategic Planning:** It provides a prioritized and structured roadmap to guide budgets and cybersecurity investments.\n\n* **Focused Mini-Example:** A medical clinic wants to align with the HIPAA privacy standard. It performs a Gap Analysis and discovers that all the nurses' computers stay active without a password after 5 minutes of inactivity. Having identified this 'gap', the clinic mandates via policy an automatic screen lock after 60 seconds.",
    examTip: "Gap Analysis is performed before defining the budget or a new strategic security plan.",
  },
  ZeroTrustIntro: {
    name: "Zero Trust",
    definition: "The modern security framework based on the principle 'Never Trust, Always Verify'.",
    details: "Zero Trust forever eliminates the obsolete concept of implicit trust based simply on the physical network perimeter:\n* **Continuous Verification:** no implicit trust follows from **network location**. Before a session to the resource is established, the system authenticates the **subject** and evaluates the **device**, then enforces a **dynamic** authorization decision; the session stays monitored and may be re-evaluated as risk changes. Traffic must be protected with suitable protocols, but **channel encryption is a protection, not an authentication factor**: it does not replace the access decision and is not a rule to encrypt the request before making it.\n* **Least Privilege:** Restricting the access of users and systems exclusively to the minimum level needed to perform the active task at that specific moment.\n* **Assume Breach:** Designing, monitoring and defending the infrastructure on the assumption that attackers have already infiltrated the internal network.\n\n* **Focused Mini-Example:** An employee sits at their desk in the office and turns on the company PC. Even though they are connected to the internal wired network, to access the finance department's shared folder they must pass an MFA check and the system verifies that their operating system has all active security patches installed.",
    examTip: "The phrase to remember is **never trust, always verify**: authentication and authorization are **explicit and dynamic**, evaluated per request and independent of where on the network it arrives from. **Exam trap:** NIST SP 800-207 keeps the access **decision** (who you are, what device you use, what risk you bring) separate from the **means of protecting** traffic (TLS, IPsec). Encryption must be applied, but it is not what authorizes: an encrypted channel to a resource you have no right to remains an access to deny.",
  },
  PolicyDrivenAccessControl: {
    name: "Policy-driven access control",
    definition: "An access control model in which permissions are evaluated dynamically in real time based on predefined rules and policies.",
    details: "Characteristics of Policy-driven Access Control:\n* **Dynamic Evaluation:** Unlike static role-based models (RBAC), it evaluates multiple factors (identity, device, location, time) against centralized corporate policies.\n* **Flexibility and Granularity:** It allows precise rules to be defined (e.g. 'Allow access to sensitive customer data only if the user is an authorized account manager, connects through the corporate VPN and uses a compliant device').\n* **Zero Trust Integration:** It represents the decision-making pillar of the Control Plane (managed by the Policy Engine and Policy Administrator).",
    examTip: "In the Zero Trust architecture, Policy-driven Access Control is the Control Plane mechanism that makes access decisions by examining a set of corporate rules and policies before authorizing the connection.",
  },
  ControlPlaneZTA: {
    name: "Control Plane",
    definition: "The logical area of the Zero Trust architecture that hosts the decision engines responsible for receiving, evaluating and authorizing or denying access requests.",
    details: "The role of the Control Plane in Zero Trust:\n* **Decision-Making Brain:** It receives connection requests and gathers context information (threat telemetry, identity, device state).\n* **Key Components:** It contains the **Policy Engine (PE)** (which evaluates the request against policies) and the **Policy Administrator (PA)** (which executes the PE’s decision and instructs the **Policy Enforcement Point (PEP)** to open or close the path).\n* **Isolation:** The control and decision functions are logically separated from the actual transit of data.\n\n* **Focused Mini-Example:** An analyst at Kestrelia opens the payroll portal from a laptop that is missing this month's security update. The **Policy Engine** compares identity, device posture and time of day with the policy and denies access; the **Policy Administrator** tells the Data Plane gateway not to open the session. After the update the same request is approved: the decision depends on context, not on the network it comes from.",
    examTip: "The Control Plane acts as the decision-making brain of the Zero Trust architecture: it receives the access request, compares it with the policies and decides whether to authorize the session.",
  },
  PolicyEngineZTA: {
    "name": "Policy Engine (PE)",
    "definition": "The Zero Trust policy engine: decides whether to grant, deny or revoke a subject’s access to a resource.",
    "details": "* **Decision:** in the Control Plane, the PE combines enterprise policy, identity, device posture and context or threat signals. It produces and logs the verdict; the Policy Administrator executes it and the Policy Enforcement Point enforces it.\n* **Continuous verification:** new evidence can trigger reevaluation and revocation of an already authorized session; frequency depends on policy. The subject requests access through its system: valid credentials or an internal network are insufficient.\n* **Connections:** Zero Trust, Policy-driven access control and Control Plane describe the context for this decision.\n\n* **Focused Mini-Example:** For Kestrelia’s project portal, the PE authorizes reading from a compliant laptop; a later device alert changes the verdict to revocation.\n\nSource: NIST SP 800-207, section 3.",
    "examTip": "PE decides; PA coordinates; PEP enforces. PE and PA make up the Policy Decision Point (PDP) functions; distinguish the decision from traffic enforcement."
  },
  PolicyAdministratorZTA: {
    "name": "Policy Administrator (PA)",
    "definition": "The Zero Trust policy administrator: executes the PE’s decision by coordinating establishment and termination of the communication path through the PEP.",
    "details": "* **Coordination:** in the Control Plane, the PA receives the Policy Engine’s verdict, prepares the session-specific credentials or tokens required by the implementation and instructs the Policy Enforcement Point. It does not replace the PE’s final authorization decision.\n* **Revocation:** when the PE withdraws approval, the PA tells the PEP to close the path. Authoring enterprise policies is a management activity distinct from this logical function during the session.\n* **Disambiguation:** PA here means Policy Administrator in Zero Trust, not a Public Administration, a privacy function or a generic human administrator. Connect it to Control Plane and Policy-driven access control.\n\n* **Focused Mini-Example:** After approval to read the Kestrelia portal, the PA configures the PEP for that path only; after PE revocation it tells the PEP to terminate it.\n\nSource: NIST SP 800-207, section 3.",
    "examTip": "The PA executes and communicates the verdict: it is not the component NIST defines as authoring policies. PE and PA may share a service while retaining distinct logical roles."
  },
  PolicyEnforcementPointZTA: {
    "name": "Policy Enforcement Point (PEP)",
    "definition": "The Zero Trust policy enforcement point: enables, monitors and terminates the connection between subject and resource according to PA instructions.",
    "details": "* **Enforcement:** in the Data Plane, the PEP guards resource access and enforces Policy Administrator instructions based on the Policy Engine’s decision. It can be a gateway, a proxy or a combination of components on the client and resource.\n* **Monitoring:** it observes the connection and can provide telemetry for reevaluation. The subject requests access; the system is the device or system through which it operates. Data traffic crosses the PEP-controlled path, not the PE and PA.\n* **Connections:** Data Plane, Control Plane, Policy-driven access control and Zero Trust complete the flow.\n\n* **Focused Mini-Example:** The Kestrelia portal PEP enables only the authorized session. When the PA communicates the PE’s revocation, the PEP terminates the path to the resource.\n\nSource: NIST SP 800-207, section 3.",
    "examTip": "PEP enforces and monitors; PE makes the final decision. A PEP need not be a firewall or a separate appliance for each logical function."
  },
  ImplicitTrustZones: {
    name: "Implicit trust zones",
    definition: "Network areas or logical segments where all devices inside are considered inherently secure and trusted by default.",
    details: "The concept of Implicit Trust Zones:\n* **Classic Perimeter Model:** It is based on the 'castle-and-moat' idea, where the outside is treated as hostile and the inside is *presumed* secure — and that presumption is exactly the model's flaw.\n* **Key Vulnerability:** If an attacker manages to breach the outer perimeter (e.g. through phishing or malware), they gain unlimited and uncontrolled access to the entire internal zone (lateral movement).\n* **Elimination in Zero Trust:** The Zero Trust philosophy aims to abolish or minimize implicit trust zones to the absolute minimum, requiring continuous verification for every single transaction or request.",
    examTip: "Implicit trust zones are typical of the old perimeter security models. Zero Trust aims to abolish them through continuous verification and microsegmentation.",
  },
  DataPlaneZTA: {
    name: "Data Plane",
    definition: "The logical area of the network architecture responsible for the actual transport, transit and routing of users' data packets.",
    details: "In the Zero Trust model, the Data Plane carries communication between subject/system and resource through the Policy Enforcement Point (PEP). The Policy Engine (PE) decides in the Control Plane; the Policy Administrator (PA) coordinates establishment or termination and the PEP enforces instructions and monitors the connection.\n\n* **Focused Mini-Example:** The PE authorizes access to the Kestrelia portal, the PA instructs the PEP and the gateway opens the required path. If the PE revokes access after a device alert, the PA tells the PEP to close the session. The PA does not independently decide approval.\n\nSource: NIST SP 800-207, section 3.",
    examTip: "The Data Plane handles the actual transport of users' data packets once the session has been authorized and allowed by the Control Plane.",
  },

  /* ---------------- Domain 1 · Group 2: Security Controls ---------------- */
  TechnicalControls: {
    name: "Technical",
    definition: "Security controls implemented through hardware, software or firmware solutions.",
    details: "Also called logical controls, they use IT and network technologies to enforce the organization's security requirements:\n* **Firewalls and IDS/IPS:** Network filters, intrusion detection (IDS, out-of-band on a copy of the traffic) and intrusion prevention (IPS, **in-line**, and therefore able to drop packets — when configured to block rather than to detect only).\n* **Data Encryption:** Encryption of information in transit (TLS) and at rest (AES).\n* **Identity Management:** Single Sign-On (SSO) systems, multi-factor authentication (MFA) agents and digital biometric access control.\n* **Endpoint Agents:** Antivirus, antimalware and Endpoint Detection and Response (EDR).\n\n* **Focused Mini-Example:** Enabling a rule on a corporate firewall that automatically detects and blocks unencrypted traffic on TCP port 80, forcing the use of HTTPS port 443, is a technical control.",
    examTip: "Any security measure that acts directly on computer systems and is managed by code or physical network devices is a technical control.",
  },
  OperationalControls: {
    name: "Operational",
    definition: "Security controls focused on human aspects, personnel and day-to-day procedures.",
    details: "They are carried out operationally by people (users, administrators or security teams) in compliance with corporate requirements:\n* **Security Awareness Training:** Periodic awareness courses and phishing attack simulations aimed at employees.\n* **Exercises and Simulations:** Testing of Disaster Recovery plans, incident response simulations and backup restores.\n* **Log Review:** The manual or supervised human activity of examining and inspecting system logs looking for anomalies.\n* **Physical-Operational Management:** Hardware inventory control, physical labeling of servers and secure shredding of paper documents.\n\n* **Focused Mini-Example:** An office employee receives a phone call from someone claiming to be from IT support asking for their password. Thanks to the social engineering training they received (operational control), the employee refuses to share the password and reports the incident to the SOC.",
    examTip: "User training (Awareness Training) is classified as an Operational control, not a Managerial one.",
  },
  ManagerialControls: {
    name: "Managerial",
    definition: "Administrative controls focused on governance, risk management and organizational policies.",
    details: "They guide the strategic and administrative direction of corporate security, providing a formal framework of rules and assessments:\n* **Risk Assessments:** Formalized processes for identifying, quantitatively or qualitatively analyzing and treating corporate risks.\n* **Security Policies:** Official documents drafted and signed by management (e.g. Acceptable Use Policy - AUP, password policy, clean desk policy).\n* **Vendor Risk Management:** Security audit and inspection procedures applied to third parties and external suppliers.\n* **Change Management Policy:** Formal definition of the rules and boards (CAB) responsible for approving infrastructure changes.\n\n* **Focused Mini-Example:** The drafting and approval by company directors of a formal 'Acceptable Use Policy' (AUP) document, which establishes the permitted websites and prohibits the use of file-sharing software on work computers, is a managerial control.",
    examTip: "Risk Assessments and written policies always represent Managerial/Administrative controls on the exam.",
  },
  PhysicalControls: {
    name: "Physical",
    definition: "Tangible, real-world security measures designed to prevent unauthorized physical access or protect against structural damage.",
    details: "They protect the real perimeter of the premises, the offices, the employees and the data center hardware:\n* **Barriers and Boundaries:** Metal fences, perimeter walls, security gates and street bollards.\n* **Physical Access Control:** Mechanical locks, RFID electronic badges, biometric readers (iris, fingerprints) and entrance turnstiles.\n* **Environmental Security:** Automatic fire-suppression systems, smoke sensors, data center air conditioners and emergency generators.\n* **Real Surveillance:** Armed security guards on duty and CCTV camera systems positioned at access points.\n\n* **Focused Mini-Example:** A reinforced metal grille with a security padlock mounted in front of the window of the room housing the centralized backup servers is a physical control to prevent theft of storage media.",
    examTip: "A padlock on a server rack is a physical control on the exam, essential for preventing theft or tampering of hardware.",
  },

  /* ---------------- Domain 1 · Group 3: Control Types ---------------- */
  PreventiveControl: {
    name: "Preventive",
    definition: "Controls designed to proactively prevent a security breach or incident from occurring.",
    details: "They intervene before the harmful event can materialize or begin:\n* **System Hardening:** Disabling unused services, closing open ports and applying patches.\n* **Security Barriers:** Network firewalls that block illicit traffic, MFA systems to prevent abusive access.\n* **Physical Measures:** Armored locks that prevent physical intrusion into the premises.\n* **Staff Training:** Educating employees prevents human error or falling into social engineering traps.\n\n* **Focused Mini-Example:** Implementing automatic lockout of Active Directory accounts after 5 consecutive wrong password attempts is a preventive control that stops brute-force or dictionary attacks in their tracks.",
    examTip: "System hardening (e.g. disabling unused ports) is a key preventive control on the exam.",
  },
  DetectiveControl: {
    name: "Detective",
    definition: "Controls aimed at identifying and recording a security incident while it is occurring or after it has happened.",
    details: "They provide visibility and promptly alert the security staff to ongoing anomalies:\n* **Detection Systems:** Intrusion Detection Systems (IDS) that analyze attack patterns on the network.\n* **Log Auditing:** SIEM systems that collect logs from servers to correlate suspicious events retroactively.\n* **Physical Surveillance:** Volumetric motion sensors, volumetric anti-intrusion alarms and CCTV cameras.\n\n* **Focused Mini-Example:** An IDS installed on the corporate network detects a port scan coming from an internal IP and sends an immediate critical alert to the SOC team's dashboard, highlighting a possible reconnaissance attempt by an attacker.",
    examTip: "A sensor that only detects and reports is a **detective** control; one that interrupts the attack is **preventive**. **Do not tie the category to the product:** an IPS configured in detection-only mode, or attached to a SPAN port, blocks nothing and behaves as a detective control. What decides is **placement** and **configuration**, not the name on the box.",
  },
  CorrectiveControl: {
    name: "Corrective",
    definition: "Controls implemented to remedy the damage caused by an incident and restore the systems to their original secure state.",
    details: "They act after the incident has occurred and aim to minimize its impact by working on recovery:\n* **Data Restoration:** Periodic backups (offline, cloud, incremental) to remedy data loss or encryption.\n* **Threat Removal:** Antivirus software that isolates and quarantines a detected malware.\n* **Patching Procedures:** Emergency updating of the systems exploited by the attacker to permanently close the flaw.\n* **Business Continuity:** Activation of Incident Response and disaster recovery plans to restart services on secondary nodes.\n\n* **Focused Mini-Example:** Following data corruption on a CRM server caused by a careless database administrator, the security team starts restoring the entire database from the last secure backup taken three hours earlier (corrective control).",
    examTip: "Restoring data from an offline or cloud backup after corruption is the most typical example of a corrective control.",
  },
  DeterrentControl: {
    name: "Deterrent",
    definition: "Controls designed to psychologically discourage potential attackers from attempting a security breach.",
    details: "They aim to influence the attacker's decision and perception, highlighting the high likelihood of capture or failure:\n* **Visible Signage:** Signs indicating 'Area Under 24/7 Video Surveillance' or 'Protected Property'.\n* **Physical Presence:** Cameras clearly exposed at the entrance, perimeter floodlights activated by sensors at night.\n* **Digital Banners:** Legal messages displayed before SSH or RDP login warning of criminal prosecution in case of unauthorized access.\n\n* **Focused Mini-Example:** A hacker intending to physically infiltrate a company's parking lots to piggyback notices an entrance barrier with a visibly staffed booth manned by a security guard and decides to give up the attempt.",
    examTip: "Deterrent controls do not physically block the attack, but reduce the likelihood that it will be attempted.",
  },
  CompensatingControl: {
    name: "Compensating",
    definition: "Alternative or fallback controls introduced to mitigate risk when a primary control is not feasible.",
    details: "They are used to compensate for structural shortcomings, budget limits or insurmountable technical constraints:\n* **Legacy Isolation:** An obsolete medical server does not support security patches (primary control); it is isolated in a dedicated VLAN protected by restrictive firewalls (compensating control).\n* **Alternative MFA:** If an employee cannot use a smartphone to receive the OTP, they are assigned an alternative physical hardware token.\n* **Substitute Administrative Controls:** Dual paper-based approval if a secure digital workflow is temporarily unavailable.\n\n* **Focused Mini-Example:** A bank branch has safes whose automatic timed locking mechanisms are broken. As a temporary compensating control, the bank requires that manual opening of the safes require the physical presence and simultaneous signature of two branch managers.",
    examTip: "Compensating controls must provide a level of protection equivalent to that of the missing original control.",
  },
  DirectiveControl: {
    name: "Directive",
    definition: "Administrative controls designed to direct, prescribe or mandate specific compliant behaviors.",
    details: "They are based on formal policies, written procedures and mandatory compliance imposed by the company or by law:\n* **Acceptable Use Policy (AUP):** Internal regulation on the correct use of corporate IT devices.\n* **Standard Operating Procedures (SOP):** Mandatory operational technical manuals for securely configuring servers or networks.\n* **External Regulations and Standards:** Non-negotiable regulatory compliance requirements, such as GDPR for personal data or PCI-DSS for cards.\n\n* **Focused Mini-Example:** At the entrance of the company headquarters, a clearly visible sign requires all employees and visitors to wear their identification badge on their chest clearly visible throughout working hours.",
    examTip: "Directive controls define the rules of the game; violating such controls usually results in disciplinary sanctions.",
  },

  /* ---------------- Domain 1 · Group 4: Change Management ---------------- */
  ApprovalProcess: {
    name: "Approval Process",
    definition: "The structured formal approval flow required before any change is implemented in production.",
    details: "It guarantees traceability, governance and formal control over all infrastructure and application changes:\n* **RFC Submission:** Every change must be documented through a formal Request for Change (RFC), describing its reasons and steps.\n* **Change Advisory Board (CAB):** A multidisciplinary committee made up of network experts, system administrators, security and business staff that evaluates the request.\n* **Authorizing Signature:** No change can be applied to the real perimeter without prior formal and documented approval.\n\n* **Focused Mini-Example:** A network engineer wants to change the routing rules on the central router. They fill out an RFC describing the activity; the CAB meets, assesses the impact on the business, and grants formal authorization to proceed over the weekend.",
    examTip: "The Change Advisory Board (CAB) is responsible for facilitating the formal evaluation and approval, not for implementing the change.",
  },
  ImpactAnalysis: {
    name: "Impact Analysis",
    definition: "The systematic assessment of the potential risks, disruptions and dependencies that a change could cause.",
    details: "It is conducted in the preliminary phase of the RFC to map the side effects of the update:\n* **Hardware/Software Interdependencies:** Analyzing which systems, databases, ports or legacy applications depend on the resource we are modifying.\n* **Security and Compliance:** Assessing whether introducing the new version alters the active security controls or compromises compliance (e.g. HIPAA, GDPR).\n* **Operational Downtime:** Estimating the out-of-service time and the impact on customers.\n\n* **Focused Mini-Example:** Before updating the version of Java on the production server of the corporate ERP, a system administrator simulates the update in staging and discovers that the new compiler crashes the shipping API. The installation is suspended, preventing an operational block of commercial deliveries.",
    examTip: "Impact analysis prevents cascading incidents due to a failure to understand system dependencies.",
  },
  BackoutPlan: {
    name: "Backout Plan",
    definition: "A detailed procedure to quickly undo a failed change and restore the system to its previous secure state.",
    details: "Commonly called a Rollback Plan, it must be documented before receiving approval from the CAB:\n* **Pre-Activity Snapshots and Backups:** Making complete copies of the system state an instant before starting maintenance.\n* **Technical Revert Steps:** The steps and commands needed to uninstall the patch or restore the old configurations.\n* **Rollback Triggers:** Precise rules based on time (e.g. 'if the update takes more than 2 hours') or on detected anomalies (e.g. 'if database latency exceeds 500ms') that decree stopping the work and starting the restore.\n\n* **Focused Mini-Example:** An administrator updates the firmware of the corporate firewall. On reboot, VPN traffic does not work. Following the Backout Plan, the administrator instantly loads the old firmware saved on the secondary memory bank and restores connectivity for remote workers in three minutes.",
    examTip: "A Change Management plan is NEVER considered complete on the exam without a tested and documented backout plan.",
  },
  MaintenanceWindow: {
    name: "Maintenance Window",
    definition: "A pre-established, agreed-upon time interval during which changes or maintenance are permitted.",
    details: "It schedules lower-impact activities to preserve operational availability agreements (SLA):\n* **Smart Scheduling:** Maintenance is carried out at times when system usage is minimal (e.g. at night, on weekends or during company closures).\n* **Advance Communication:** Warning employees and external customers well in advance of possible downtime or performance degradation.\n* **SLA Maximization:** It allows updates to be completed without impacting the contractual corporate uptime index.\n\n* **Focused Mini-Example:** A fintech platform establishes that all updates to the transaction servers must occur exclusively within the agreed maintenance window, namely Sunday morning from 02:00 to 05:00, minimizing the impact on merchants.",
    examTip: "Even emergency patches should ideally be coordinated through the change management process, while routine scheduled changes must be executed strictly inside approved maintenance windows.",
  },
  VersionControl: {
    name: "Version Control",
    definition: "The formal management and tracking of the different versions of software, configurations or security policies.",
    details: "It guarantees the integrity, audit trail and secure recovery of source code and infrastructure configuration files:\n* **Centralized Versioning (e.g. Git):** Records every single change commit in an immutable log.\n* **Author Traceability:** It stores the identity of the operator who made the change, the reasons and the exact date of the modification.\n* **Instant Revert:** The ability to compare and instantly restore a specific past configuration should the current code introduce bugs or security vulnerabilities.\n\n* **Focused Mini-Example:** A security technician modifies the AWS cloud configuration script (Terraform). The code has a syntax error that blocks the creation of the VMs. Using Git version control, the technician runs a `git revert` to the last working version, restoring the automated deployment in a few seconds.",
    examTip: "Version control is essential for software integrity and prevents untracked changes or accidental overwrites.",
  },

  OwnershipStakeholders: {
    name: "Ownership & Stakeholders",
    definition: "The two roles objective 1.3 keeps apart in every change: the owner, who has the authority to request it and answers for the outcome, and the stakeholders, everyone the change touches, who must be identified and involved before it happens.",
    details: "They are two different roles, and exam questions put them side by side precisely to see whether you confuse them:\n* **Ownership - who decides and who answers:** every change request has a **named** owner, not a generic department. That is the person who knows the system, who has the formal authority to seek approval, and who is asked when something goes wrong. With no owner, a failed change has nobody to roll it back and nobody to answer for it: the give-away phrase is \"IT was handling it\".\n* **Stakeholders - who is affected:** the functions that will use the system after the change, those that depend on it, security, compliance, customer support and, when the service is public-facing, the customers themselves. Identifying them is a step of the process, not a courtesy.\n* **Why they are identified beforehand:** they answer different questions. The owner answers \"who authorizes and who is accountable\"; the stakeholders answer \"who must be told, consulted and trained\". A change that succeeds technically but is announced to nobody causes the same outage as one that fails.\n* **The typical mistakes:** confusing the owner of the **system** with the owner of the **change**, and limiting the stakeholder list to technical staff, forgetting the people who use that system every day.\n\n* **Focused Mini-Example:** The ERP is migrated to a new version over a weekend and the migration succeeds. On Monday, however, the call center is down for three hours: the new interface changed the path for issuing a credit note and no operator had been told. The department was the system's main user and did not appear among the change request's stakeholders.",
    examTip: "Keep the two words apart. **Ownership** = a named person who **decides and answers** for the change · **Stakeholders** = everyone the change **touches**, to be identified, informed and where needed trained. **Exam trap:** when the scenario describes a change that succeeded technically but blocked an unaware department, the flaw is neither the backout plan nor the maintenance window: it is the failure to identify the stakeholders.",
  },
  TestResultsChange: {
    name: "Test Results",
    definition: "The documented outcomes of tests run in an environment other than production, which the approval board examines before authorizing a change.",
    details: "They are the only element of the change management package that speaks of **facts** rather than intentions:\n* **What they are for:** the impact analysis says what is *expected* to happen; the test results say what *actually happened* when the change was tried. They are the only evidence that it works and that it breaks nothing else.\n* **Where they are produced:** in an environment that resembles production - staging or UAT - with representative data and integrations. A test on an environment too unlike production returns a reassuring result with no value.\n* **What the evidence must contain:** what was tested, with what data, by whom, when, and the outcome of each case - including the **failed** runs and what was fixed. A report listing only successes is not a test report.\n* **When there is no test environment:** the correct route is not to declare them \"unnecessary\", but to state the residual risk, have it accepted by someone with the authority to take it on, and strengthen the backout plan.\n\n* **Focused Mini-Example:** A request reaches the board complete with owner, impact analysis, maintenance window and a detailed backout plan. Against \"outcome of testing\" the requester has written \"not needed, minimal change\". The board rejects it, and rightly so: without that outcome none of the other documents shows that the change works.",
    examTip: "Test results are the only item in the package that says anything about the change's **real behavior**; everything else describes plans and intentions. **Exam trap:** \"minimal change\" is never a valid reason to omit them, and a request complete with everything except test outcomes is the right answer when the question asks what should have blocked approval.",
  },
  StandardOperatingProcedure: {
    name: "Standard Operating Procedure (SOP)",
    definition: "The document describing, step by step, how a recurring activity is carried out, so that the outcome does not depend on who performs it.",
    details: "The SOP turns one person's skill into a process owned by the organization:\n* **The problem it solves:** an activity that lives only in the experience of two colleagues produces different outcomes depending on the shift, cannot be verified by anyone, and disappears when those people go on holiday or change jobs.\n* **What it contains:** the purpose, who is authorized to perform it, the prerequisites, the exact sequence of steps with commands or screens, the final verification checks, what to do if a step fails, and a version number with the date of the last revision.\n* **Its place in the document hierarchy:** the **policy** says *what* must be achieved and *why*; the **standard** says *with what*; the **procedure (SOP)** says *how*, in the right order. All three are mandatory; the **guideline** is advice.\n* **Why it is a security control and not paperwork:** it makes the activity **repeatable** (same outcome from anyone), **auditable** (a reviewer compares what was done against what was prescribed) and **transferable** (a new joiner is productive in days, not months).\n\n* **Focused Mini-Example:** In one company the procedure for applying monthly patches exists only in the heads of two administrators. Each runs it their own way and, over the summer holidays, a less experienced colleague skips the post-reboot check, leaving two services down for a day. Written as an SOP, that check is a numbered step that cannot be missed without it showing.",
    examTip: "The SOP answers the question **\"how is it done, step by step\"** and is **mandatory**, unlike a guideline, which is a recommendation. **Exam trap:** when the scenario describes an activity whose outcome depends on who is on shift, the answer is the standard operating procedure - not a policy, which would only say the activity must be done, and not training, which leaves no auditable trace.",
  },
  ChangeTechnicalImplications: {
    name: "Technical Implications of a Change",
    definition: "The side effects objective 1.3 asks you to anticipate before applying a change: allow and deny lists, permitted activities, downtime, restarts, legacy applications and dependencies.",
    details: "This is the part of objective 1.3 that questions test with concrete scenarios rather than definitions:\n* **Allow list and deny list:** a change may require **adding** the new server, application or address to the lists of what is permitted, or **removing** from block lists what is now legitimate. Forgetting it produces the classic \"it worked in staging\".\n* **Restricted activities:** during the window you perform **only what was approved**. This is the rule that forbids the opportunistic fix - \"while we are here, let me also turn off this service nobody uses\" - because what was never analyzed has neither an impact assessment nor a rollback plan.\n* **Downtime:** it must be **estimated** beforehand, **communicated** to stakeholders and checked against the service commitments in force. Undeclared downtime breaches the SLA even when the change succeeds.\n* **Service restart and application restart:** many settings only take effect after the service or application restarts, not when the file is saved. The restart therefore belongs **inside** the window, otherwise the change applies itself later, at the worst possible moment.\n* **Legacy applications:** unsupported systems may not tolerate the change and may have no upgrade path at all. When they surface in the analysis, the correct route is to document the dependency and isolate them with compensating controls, not to postpone the whole change.\n* **Dependencies:** what depends on the system being changed, and what that system depends on. This is the item impact analysis gets wrong most often, because undocumented dependencies only surface when they break.\n\n* **Focused Mini-Example:** During a night window an administrator changes an authentication parameter, checks that the file is correct and considers the work closed. The next morning the system still behaves the old way; later a scheduled automatic reboot applies the new configuration in the middle of the working day and three dependent applications fall over together. The restart was a foreseeable implication, and belonged inside the window.",
    examTip: "Match each implication to its symptom, because that is how questions present them. Change that **has no effect** → the service **restart** is missing · outage **in other systems** → **dependencies** not mapped · something broken that **was not in the request** → **restricted activities** violated · traffic blocked after release → **allow list** not updated · customer complaints about an outage → **downtime** not communicated.",
  },
  ChangeDocumentation: {
    name: "Change Documentation",
    definition: "Updating diagrams, policies and procedures after a change has been applied: the last step of the process, and the one skipped most often.",
    details: "It is the phase that brings no immediate benefit and without which everything else decays:\n* **Updating diagrams:** network topology, appliance schematics, data flows and inventory must reflect the state **after** the change. An out-of-date diagram is not neutral: it misleads whoever reads it, and whoever reads it is usually responding to an incident or running an assessment.\n* **Updating policies and procedures:** if the change alters how work is done - a new tool, an extra authorization step, a retired protocol - the procedure describing the old way must be rewritten, otherwise a document prescribing something that no longer exists stays in force.\n* **Why it is a control:** up-to-date documentation is what makes recovery, incident analysis, onboarding and auditing possible. And it is the basis of the **next change's impact analysis**: stale documentation today means a wrong impact analysis tomorrow.\n* **When it is done:** as part of closing the change, not \"when there is time\". A change is not closed until the documentation matches reality.\n\n* **Focused Mini-Example:** An external consultant is engaged to map the data center's vulnerabilities and asks for the architecture diagram. They are handed a drawing more than a year old: two segments added since are missing, and a decommissioned server is s…162152 tokens truncated…rodotti e servizi** non è lo scopo principale delle attività di audit e di aggiornamento della documentazione di sicurezza."
  },
  {
    id: 200,
    topic: "Security Controls",
    level: "APPLICAZIONE",
    scenario: "Un'azienda desidera garantire che i propri dipendenti utilizzino le risorse aziendali in modo corretto ed etico.",
    question: "Quale delle seguenti azioni rappresenta un esempio di controllo direttivo (directive control) che l'azienda potrebbe implementare per affrontare questa preoccupazione?",
    options: [
      "A) Far leggere e sottoscrivere a tutti i dipendenti una policy di uso accettabile (AUP)",
      "B) Esaminare i file di log alla ricerca di segni di accesso non autorizzato",
      "C) Imporre l'autenticazione a più fattori quando quella a fattore singolo fallisce",
      "D) Condurre periodica formazione sulla consapevolezza di sicurezza per i dipendenti"
    ],
    answerIndex: 0,
    explanation: "La risposta corretta è la **A) Far leggere e sottoscrivere a tutti i dipendenti una AUP**.\n\n* **Perché è la corretta:** Una policy di utilizzo accettabile (**AUP - Acceptable Use Policy**) definisce le regole di comportamento sull'uso dei beni aziendali. Richiedere la firma e la lettura della AUP è un controllo direttivo (directive control) perché prescrive in modo esplicito le azioni e la condotta attese dai dipendenti.\n* **Analisi dei distrattori:**\n  * **B) Esaminare i file di log** è un controllo investigativo/rilevativo (detective), volto a identificare incidenti dopo il loro accadimento.\n  * **C) Imporre l'MFA** è un controllo tecnico/preventivo per bloccare accessi non autorizzati.\n  * **D) La formazione sulla consapevolezza** è il distrattore più insidioso, perché anch'essa agisce sul comportamento delle persone. La differenza sta nel **verbo**: la AUP **prescrive** una condotta e la fa sottoscrivere, creando un obbligo verificabile e opponibile; la formazione **mette in grado** di riconoscere una minaccia, ed è quindi classificata come controllo **preventivo**. Regola pratica: se il documento dice *devi* ed è firmato, è direttivo; se insegna *come si fa*, è preventivo.\n\n* **Trappola d'esame:** i controlli **direttivi** sono quelli che indirizzano il comportamento con una regola scritta — policy, procedure, cartelli, clausole contrattuali. Non impediscono materialmente nulla, ed è proprio questo a distinguerli dai **preventivi**: una AUP non blocca il download di un file, ma stabilisce che sia vietato e rende sanzionabile chi lo fa. Per questo i direttivi sono spesso la base su cui poggiano i controlli tecnici, e la risposta corretta quando lo scenario parla di **regole, policy o firma di un documento**."
  },
  {
    id: 201,
    topic: "Public Key Infrastructure",
    level: "COMPRENSIONE",
    scenario: "La gestione della crittografia a chiave pubblica su larga scala richiede una struttura organizzativa, tecnologica e procedurale standardizzata.",
    question: "Quale termine viene utilizzato per descrivere la creazione, distribuzione, memorizzazione e revoca dei certificati digitali?",
    options: [
      "A) Key Generation",
      "B) Public Key Infrastructure",
      "C) Key Exchange",
      "D) Key Escrow"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Public Key Infrastructure**.\n\n* **Perché è la corretta:** La **Public Key Infrastructure (PKI)** è l'insieme di ruoli, politiche, processi, hardware e software necessari per gestire l'intero ciclo di vita dei certificati digitali e delle chiavi crittografiche (inclusa la creazione, distribuzione, memorizzazione e revoca).\n* **Analisi dei distrattori:**\n  * **A) Key Generation** è solo la prima fase di generazione della coppia di chiavi crittografiche.\n  * **C) Key Exchange** è il protocollo con cui due parti si scambiano in sicurezza chiavi simmetriche.\n  * **D) Key Escrow** è l'affidamento di una copia delle chiavi di decifratura a una terza parte fidata per finalità di recupero di emergenza."
  },
  {
    id: 202,
    topic: "Public Key Infrastructure",
    level: "APPLICAZIONE",
    scenario: "Kestrelia Training intende espandere i propri servizi online, lanciando molteplici sotto-domini per diversi corsi (ad esempio corsi.example.com, labs.example.com, test.example.com). Desiderano un unico certificato digitale in grado di proteggere contemporaneamente tutti questi sotto-domini.",
    question: "Quale tipo di certificato dovrebbe prendere in considerazione Kestrelia Training?",
    options: [
      "A) CSR (Certificate Signing Request)",
      "B) Wildcard certificate",
      "C) Third-party certificate",
      "D) Self-signed certificate"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Wildcard certificate**.\n\n* **Perché è la corretta:** Un **certificato jolly (wildcard certificate)** permette di proteggere un dominio principale e un numero illimitato di suoi sotto-domini correlati di primo livello (es. `*.example.com`) utilizzando un unico certificato. È la soluzione più efficiente e conveniente per questo scenario.\n* **Analisi dei distrattori:**\n  * **A) CSR (Certificate Signing Request)** è la richiesta inviata a una Certificate Authority per ottenere un certificato, non un certificato esso stesso.\n  * **C) Third-party certificate** si riferisce a un certificato emesso da una CA terza attendibile, ma non specifica la funzionalità tecnica jolly necessaria per coprire molteplici sotto-domini.\n  * **D) Self-signed certificate** è un certificato firmato dall'entità stessa che lo ha generato; provocherebbe avvisi di sicurezza nei browser degli utenti e non è raccomandato per siti pubblici."
  },
  {
    id: 203,
    topic: "Cryptography",
    level: "APPLICAZIONE",
    scenario: "Un istituto finanziario desidera proteggere il proprio database clienti in modo tale che, anche nell'eventualità di una violazione dei sistemi con furto di dati, questi ultimi rimangano completamente inintelligibili agli aggressori.",
    question: "Quale dei seguenti livelli di crittografia sarebbe il PIÙ appropriato per salvaguardare direttamente il contenuto del database?",
    options: [
      "A) Full-disk encryption",
      "B) Volume encryption",
      "C) Database level encryption",
      "D) File encryption"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Database level encryption**.\n\n* **Perché è la corretta:** La **crittografia a livello di database (database level encryption)** garantisce che l'intero contenuto del database (o singole tabelle/colonne sensibili) sia protetto direttamente dall'algoritmo crittografico. Di conseguenza, anche se il file del database viene copiato o rubato, i dati restano illeggibili senza la corretta chiave di decifratura.\n* **Analisi dei distrattori:**\n  * **A) Full-disk encryption** e **B) Volume encryption** proteggono i dati solo a riposo contro il furto fisico dei dischi rigidi (es. se il server è spento), ma non proteggono i dati qualora un utente malintenzionato acceda al sistema operativo avviato o effettui un attacco sul database online.\n  * **D) File encryption** cifra singoli file sul disco, il che potrebbe non essere efficiente o strutturato in modo idoneo a supportare le query ad alte prestazioni richieste da un sistema di database."
  },
  {
    id: 204,
    topic: "Cryptography",
    level: "ANALISI",
    scenario: "Un revisore esamina un archivio di immagini cifrate con AES e nota una cosa curiosa: due file cifrati che dovrebbero essere illeggibili mostrano, se visualizzati come immagine, i contorni riconoscibili del logo aziendale. Approfondendo, scopre che lo sviluppatore ha usato AES in modalità **ECB**, senza vettore di inizializzazione.",
    question: "Perché la modalità ECB produce questo effetto, e quale modalità va usata?",
    options: [
      "A) ECB usa una chiave troppo corta: basta passare da AES-128 ad AES-256 mantenendo ECB",
      "B) ECB cifra ogni blocco in modo indipendente: blocchi identici danno cifrati identici. Serve GCM",
      "C) ECB non cifra affatto i dati: si limita a codificarli, quindi vanno cifrati una seconda volta",
      "D) ECB comprime i dati prima di cifrarli, e la compressione lascia visibili le forme ricorrenti"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) ECB cifra ogni blocco in modo indipendente**.\n\n* **Perché è la corretta:** In modalità **ECB** (*Electronic Codebook*) ogni blocco di testo in chiaro viene cifrato **da solo**, con la stessa chiave e senza alcun legame con i blocchi vicini. La conseguenza è immediata: due blocchi identici in ingresso producono **blocchi cifrati identici** in uscita. In un'immagine, dove vaste aree hanno lo stesso colore, questo significa che quelle aree restano riconoscibili anche dopo la cifratura, e il contorno del logo attraversa il testo cifrato come se nulla fosse. È l'esempio classico con cui si spiega il problema, ma la falla non riguarda solo le immagini: ECB **lascia trasparire la struttura** di qualunque dato, e su dati strutturati come un database rivela quali record sono uguali fra loro. La correzione non è toccare la chiave ma la **modalità**: **GCM** (*Galois/Counter Mode*) cifra con un contatore e un valore univoco per ogni messaggio, così che lo stesso testo in chiaro dia ogni volta un cifrato diverso, e in più calcola un **tag di autenticazione** che rivela qualunque manomissione.\n* **Analisi dei distrattori:**\n  * **A) Chiave più lunga:** non cambia nulla. Il difetto è nel **modo in cui i blocchi vengono concatenati**, non nella robustezza della chiave: AES-256 in ECB mostra il logo esattamente come AES-128 in ECB.\n  * **C) ECB non cifra davvero:** falso. ECB cifra eccome, con AES a tutti gli effetti; ciò che perde è la **indistinguibilità**, cioè la garanzia che il cifrato non riveli nulla sulla struttura del chiaro. Cifrare due volte in ECB ripeterebbe il problema.\n  * **D) Compressione:** ECB non comprime nulla. La compressione è un'operazione distinta, e se mai va applicata **prima** della cifratura, mai come parte di essa.\n\n* **Trappola d'esame:** ricorda che **l'algoritmo non basta**: conta anche la modalità con cui lo si usa. **ECB** = da evitare sempre, non nasconde gli schemi ricorrenti · **CBC** = concatena i blocchi e richiede un vettore di inizializzazione imprevedibile, ma non autentica · **CTR** = trasforma il cifrario a blocchi in un cifrario a flusso · **GCM** = la scelta moderna, perché unisce cifratura e autenticazione in un colpo solo. Questa combinazione ha un nome che vale la pena memorizzare, **AEAD** (*Authenticated Encryption with Associated Data*): protegge insieme riservatezza e integrità, ed è ciò che TLS 1.3 impone."
  },
  {
    id: 205,
    topic: "Physical Security Controls",
    level: "APPLICAZIONE",
    scenario: "Gerald, l'IT manager, sta implementando un sistema in cui i dipendenti devono possedere un dispositivo/gettone (token) per ottenere l'accesso ad alcune aree specifiche all'interno dell'edificio aziendale.",
    question: "Quale delle seguenti opzioni spiega meglio il tipo di sicurezza fisica che stanno implementando?",
    options: [
      "A) Recinzioni (Fencing)",
      "B) Videosorveglianza (Video surveillance)",
      "C) Varchi di controllo degli accessi (Access control vestibules)",
      "D) Badge di accesso (Access badges)"
    ],
    answerIndex: 3,
    explanation: "La risposta corretta è la **D) Badge di accesso (Access badges)**.\n\n* **Perché è la corretta:** Un **badge di accesso (access badge)** è una tessera o dispositivo fisico (token) utilizzato dai dipendenti per autenticarsi e sbloccare i varchi elettronici per accedere a specifiche aree dell'edificio aziendale, rispecchiando esattamente lo scenario descritto.\n* **Analisi dei distrattori:**\n  * **A) Le recinzioni (Fencing)** sono barriere perimetrali esterne volte a impedire o ritardare l'intrusione fisica nella proprietà, non utilizzano token o tessere personali.\n  * **B) La videosorveglianza (Video surveillance)** impiega telecamere per monitorare e registrare visivamente le attività, non costituisce di per sé un meccanismo basato su gettoni per concedere l'accesso.\n  * **C) I varchi di controllo degli accessi (Access control vestibules / mantrap)** sono strutture a doppia porta progettate per controllare il flusso fisico delle persone e prevenire il tailgating, ma rappresentano la barriera fisica di transito e non il gettone o token di sblocco in sé."
  },
  {
    id: 206,
    topic: "Security Controls",
    level: "COMPRENSIONE",
    scenario: "Jenna, un'analista della sicurezza, desidera implementare una revisione periodica e regolare dei file di log per migliorare la postura di sicurezza complessiva dell'organizzazione.",
    question: "A quale dei seguenti tipi di controlli di sicurezza appartiene il monitoraggio dei log (log monitoring)?",
    options: [
      "A) Gestionale (Managerial)",
      "B) Fisico (Physical)",
      "C) Operativo (Operational)",
      "D) Tecnico (Technical)"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Operativo (Operational)**.\n\n* **Perché è la corretta:** I **controlli di sicurezza operativi (operational controls)** sono misure implementate e condotte quotidianamente dal personale per proteggere i sistemi e le operazioni dell'organizzazione. Esempi classici includono il monitoraggio dei file di registro (log monitoring), le procedure di backup e ripristino, la gestione delle configurazioni e la protezione dei supporti di memorizzazione.\n* **Analisi dei distrattori:**\n  * **A) I controlli gestionali (Managerial controls)** riguardano la pianificazione strategica, le valutazioni del rischio (risk assessment), le policy scritte, i programmi di consapevolezza della sicurezza e la gestione complessiva dei programmi di sicurezza.\n  * **B) I controlli fisici (Physical controls)** proteggono l'accesso alle risorse hardware e alle infrastrutture tangibili (es. telecamere, lucchetti, recinzioni, guardie).\n  * **D) I controlli tecnici (Technical controls)** sono controlli logici eseguiti direttamente dall'hardware o dal software dei sistemi informativi (es. firewall, crittografia, ACL, sistemi IDS/IPS)."
  },
  {
    id: 207,
    topic: "Cryptography",
    level: "APPLICAZIONE",
    scenario: "Instances VM, un'azienda di cloud computing, sta definendo degli standard aziendali completi per la gestione delle chiavi crittografiche, stabilendo policy precise che ne regolino l'intero ciclo di vita, dalla generazione fino alla revoca e distruzione.",
    question: "Che cosa stanno progettando e sviluppando in questo scenario?",
    options: [
      "A) Un Trusted Platform Module (TPM)",
      "B) Un sistema di gestione delle chiavi (Key Management System)",
      "C) Una Secure Enclave",
      "D) Un modulo di sicurezza hardware (Hardware Security Module - HSM)"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Un sistema di gestione delle chiavi (Key Management System)**.\n\n* **Perché è la corretta:** Un **Key Management System (KMS)** è un processo strutturato, supportato da standard e policy organizzative, che si occupa della gestione dell'intero ciclo di vita delle chiavi crittografiche (generazione, distribuzione, memorizzazione, rotazione, revoca e distruzione). Si tratta di un framework decisionale e operativo, non di un singolo chip o dispositivo hardware.\n* **Analisi dei distrattori:**\n  * **A) Un Trusted Platform Module (TPM)** è un microchip dedicato integrato sulla scheda madre (comune nei sistemi Windows) per archiviare in sicurezza chiavi crittografiche e misurazioni dell'integrità del boot, non è una politica o standard aziendale globale.\n  * **C) Una Secure Enclave** è un coprocessore isolato, integrato nel silicio di alcuni SoC (come Apple o determinati sistemi Android), dedicato esclusivamente a elaborazioni sensibili come chiavi crittografiche e dati biometrici.\n  * **D) Un modulo di sicurezza hardware (HSM)** è un dispositivo fisico esterno o una scheda di espansione specializzata nel calcolo crittografico ad alte prestazioni e nella protezione delle chiavi su vasta scala, ma non costituisce l'insieme di policy organizzative sul ciclo di vita delle chiavi."
  },
  {
    id: 208,
    topic: "Identity & Access Control Models",
    level: "COMPRENSIONE",
    scenario: "La corretta configurazione dei controlli di sicurezza prevede regole chiare per consentire l'accesso logico solo ai soggetti considerati sicuri o autorizzati.",
    question: "Quale tra i seguenti termini si riferisce a un elenco che concede esplicitamente l'accesso o i permessi a entità specifiche, mentre tutte le altre vengono implicitamente negate?",
    options: [
      "A) Elenco dei consentiti (Allow list)",
      "B) Processo di approvazione (Approval process)",
      "C) Piano di ripristino (Backout plan)",
      "D) Attività limitate (Restricted activities)"
    ],
    answerIndex: 0,
    explanation: "La risposta corretta è la **A) Elenco dei consentiti (Allow list)**.\n\n* **Perché è la corretta:** Una **allow list** (o whitelist) è un elenco esplicito di entità (es. indirizzi IP, applicazioni o domini) a cui viene concesso l'accesso. Di default, tutti i soggetti non espressamente presenti nell'elenco vengono rifiutati tramite una regola implicita di negazione (implicit deny).\n* **Analisi dei distrattori:**\n  * **B) Un processo di approvazione (Approval process)** è una procedura formale organizzativa per verificare e autorizzare modifiche prima della loro implementazione, non è un elenco di controllo degli accessi.\n  * **C) Un piano di ripristino (Backout plan)** descrive i passaggi per annullare una modifica fallita in produzione e ritornare allo stato precedente stabile.\n  * **D) Le attività limitate (Restricted activities)** sono azioni specifiche che non possono essere eseguite per motivi di sicurezza o regolamentazione aziendale, non descrivono una logica di accesso 'implicit deny'."
  },
  {
    id: 209,
    topic: "Security Principles",
    level: "APPLICAZIONE",
    scenario: "In un'azienda lo stesso impiegato dell'ufficio acquisti può creare un nuovo fornitore nell'anagrafica, emettere un ordine a suo favore e approvare il pagamento della fattura. Un audit segnala la situazione come rischio grave di frode interna.",
    question: "Quale principio di sicurezza è violato e quale contromisura lo ripristina?",
    options: [
      "A) Minimo privilegio: all'impiegato vanno revocati tutti i permessi tranne la consultazione in sola lettura",
      "B) Separazione dei compiti (separation of duties): creazione, ordine e approvazione del pagamento vanno assegnate a persone diverse",
      "C) Need to know: all'impiegato va impedito di consultare l'anagrafica dei fornitori concorrenti",
      "D) Rotazione delle mansioni: l'impiegato va spostato in un altro reparto ogni dodici mesi"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Separazione dei compiti**.\n\n* **Perché è la corretta:** La **separation of duties** impone che nessuna singola persona possa controllare da sola l'intero ciclo di un'operazione sensibile. Qui un solo impiegato crea il fornitore, ordina e paga: può quindi inventare un fornitore fittizio e liquidarsi denaro senza che nessuno debba approvare. Spezzando il ciclo fra persone diverse, la frode richiederebbe una collusione, che è molto più difficile e molto più rilevabile.\n* **Analisi dei distrattori:**\n  * **A) Il minimo privilegio** riguarda l'*ampiezza* dei permessi di una persona, non la *combinazione pericolosa* di più permessi tutti legittimi. Qui ciascuna delle tre funzioni è pertinente al ruolo dell'impiegato: il problema nasce dal fatto che le ha tutte e tre. Revocargli quasi tutto gli impedirebbe anche di lavorare.\n  * **C) Il need to know** limita l'accesso alle *informazioni* a quelle necessarie per il compito. Lo scenario non descrive un problema di visibilità dei dati, ma di autorità sulle transazioni.\n  * **D) La rotazione delle mansioni** è un controllo utile e complementare, perché rende più difficile mantenere una frode nel tempo e ne facilita la scoperta al cambio. Ma non impedisce la frode *oggi*: per dodici mesi l'impiegato conserverebbe l'intero ciclo nelle proprie mani.\n\n* **Trappola d'esame:** distingui i due principi che vengono sempre confusi. **Minimo privilegio** = *quanto* può fare una persona · **Separazione dei compiti** = *quali combinazioni* di poteri non devono mai stare insieme. Controlli affini che l'esame associa a questo tema: **dual control** (due persone per eseguire una singola azione critica), **ferie obbligatorie** e **job rotation**, pensati proprio per far emergere frodi che richiedono presenza continua."
  },
  {
    id: 210,
    topic: "Cryptography",
    level: "COMPRENSIONE",
    scenario: "La crittografia asimmetrica si basa sulla separazione logica e matematica delle chiavi destinate alla cifratura e alla decifratura delle comunicazioni.",
    question: "Qual è il nome di una chiave crittografica che può essere distribuita liberamente e utilizzata da chiunque per cifrare messaggi destinati al proprietario della chiave stessa?",
    options: [
      "A) Chiave di hash (Hash key)",
      "B) Firma digitale (Digital signature)",
      "C) Chiave pubblica (Public key)",
      "D) Chiave simmetrica (Symmetric key)"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Chiave pubblica (Public key)**.\n\n* **Perché è la corretta:** Nella crittografia asimmetrica, la **chiave pubblica (public key)** può essere divulgata a chiunque in modo aperto. Viene utilizzata dai mittenti esterni per cifrare messaggi che solo la corrispondente chiave privata (segreta e gelosamente custodita dal destinatario) sarà in grado di decifrare.\n* **Analisi dei distrattori:**\n  * **A) Una chiave di hash (Hash key)** o un valore hash viene generato da una funzione unidirezionale per verificare l'integrità dei dati o mappare stringhe, non per cifrare e decifrare messaggi bidirezionali.\n  * **B) La firma digitale (Digital signature)** è uno schema matematico che attesta l'autenticità e l'integrità di un documento (firmato con chiave privata e verificato con chiave pubblica), non è una chiave di cifratura.\n  * **D) Una chiave simmetrica (Symmetric key)** deve rimanere assolutamente segreta e condivisa esclusivamente tra le due parti comunicanti; se venisse distribuita liberamente, chiunque potrebbe decifrare e alterare le comunicazioni."
  },
  {
    id: 211,
    topic: "Security Principles",
    level: "COMPRENSIONE",
    scenario: "La triade CIA (Riservatezza, Integrità, Disponibilità) rappresenta il pilastro fondamentale della sicurezza delle informazioni.",
    question: "Quale termine si riferisce alla garanzia che i dati e le risorse siano accessibili e utilizzabili quando necessario da parte degli utenti autorizzati?",
    options: [
      "A) Disponibilità (Availability)",
      "B) Riservatezza (Confidentiality)",
      "C) Autorizzazione (Authorization)",
      "D) Integrità (Integrity)"
    ],
    answerIndex: 0,
    explanation: "La risposta corretta è la **A) Disponibilità (Availability)**.\n\n* **Perché è la corretta:** La **disponibilità (availability)** garantisce che i sistemi informativi, i canali di comunicazione e i dati siano pronti all'uso e accessibili agli utenti autorizzati ogniqualvolta ne abbiano bisogno per svolgere le proprie attività.\n* **Analisi dei distrattori:**\n  * **B) La riservatezza (Confidentiality)** assicura che le informazioni sensibili non vengano rivelate o divulgate a individui, entità o processi non autorizzati.\n  * **C) L'autorizzazione (Authorization)** stabilisce i diritti e i livelli di accesso specifici concessi a un utente o sistema dopo che la sua identità è stata autenticata.\n  * **D) L'integrità (Integrity)** garantisce che le informazioni rimangano accurate, affidabili e non alterate o corrotte, se non tramite interventi espressamente autorizzati."
  },
  {
    id: 212,
    topic: "Cryptography",
    level: "APPLICAZIONE",
    scenario: "Take the Cake, una rinomata pasticceria, ha recentemente acquistato un nuovo modulo software per migliorare la sicurezza delle proprie credenziali. Il software aggiunge in modo casuale dati aggiuntivi e univoci all'input di una funzione di hash prima che quest'ultima lo elabori.",
    question: "Che cosa sta facendo specificamente il software?",
    options: [
      "A) Key Stretching",
      "B) Salting",
      "C) Hashing",
      "D) Firme digitali (Digital Signatures)"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Salting**.\n\n* **Perché è la corretta:** Il **salting** è una tecnica crittografica che consiste nell'aggiungere dati casuali e unici (chiamati 'sale') all'input (in genere una password) prima di sottoporlo a una funzione di hash. Questo impedisce agli attaccanti di utilizzare attacchi precalcolati come le Rainbow Tables per decifrare in massa le password.\n* **Analisi dei distrattori:**\n  * **A) Il Key Stretching** è un metodo che consiste nel calcolare ripetutamente (migliaia di volte) l'hash di una password per renderlo volutamente più lento da computare, aumentando notevolmente il tempo richiesto per attacchi di forza bruta (es. con PBKDF2 o bcrypt).\n  * **C) L'Hashing** è il semplice processo di conversione unidirezionale di un input di lunghezza arbitraria in una stringa di lunghezza fissa tramite una funzione matematica, senza l'aggiunta obbligatoria di dati casuali preventivi.\n  * **D) Le firme digitali (Digital Signatures)** sono costrutti matematici usati per garantire l'autenticità e il non ripudio di un file o messaggio, non l'aggiunta di dati casuali all'input di una funzione di hash delle password."
  },
  {
    id: 213,
    topic: "Zero Trust Architecture",
    level: "ANALISI",
    scenario: "Un dipendente chiede l'accesso a un'applicazione finanziaria. Il sistema Zero Trust raccoglie identità, stato di aggiornamento del portatile, posizione e punteggio di rischio, li confronta con le policy aziendali e conclude che l'accesso va concesso ma solo in sola lettura. Un secondo componente trasforma quella decisione in una configurazione operativa e ordina di aprire la sessione con quei limiti.",
    question: "Quali componenti del Control Plane hanno svolto rispettivamente la valutazione e l'emissione della decisione?",
    options: [
      "A) Policy Administrator per la valutazione, Threat Scope Reducer per l'emissione della decisione",
      "B) Policy Enforcement Point per la valutazione, Policy Engine per l'emissione della decisione",
      "C) Identity Provider per la valutazione, Policy Enforcement Point per l'emissione della decisione",
      "D) Policy Engine per la valutazione, Policy Administrator per l'emissione della decisione"
    ],
    answerIndex: 3,
    explanation: "La risposta corretta è la **D) Policy Engine per la valutazione, Policy Administrator per l'emissione**.\n\n* **Perché è la corretta:** Il modello NIST SP 800-207 separa tre ruoli distinti.\n  * Il **Policy Engine (PE)** è il componente che **decide**: incrocia segnali di identità, stato del dispositivo, contesto e telemetria delle minacce con le policy e produce un verdetto (consenti, nega, consenti con restrizioni).\n  * Il **Policy Administrator (PA)** **esegue amministrativamente** quel verdetto: genera credenziali o token di sessione e istruisce il punto di applicazione su cosa aprire e con quali limiti.\n  * Insieme PE e PA formano il **Control Plane**.\n* **Analisi dei distrattori:**\n  * **B)** Inverte i ruoli. Il **Policy Enforcement Point (PEP)** non prende la decisione finale di autorizzazione e può fornire telemetria: sta sul **Data Plane** ed è il punto in cui la sessione viene materialmente aperta o bloccata.\n  * **C)** L'**Identity Provider** fornisce *uno* dei segnali che il PE considera, cioè l'autenticazione dell'identità, ma non prende la decisione di accesso né ne valuta il contesto complessivo.\n  * **A)** Il **Threat Scope Reducer** non è un componente decisionale: è l'obiettivo architetturale di ridurre il raggio d'azione di una compromissione, che si ottiene con la microsegmentazione.\n\n* **Trappola d'esame:** memorizza la catena e il piano di appartenenza. **PE decide → PA emette (Control Plane) → PEP applica (Data Plane)**. Se la domanda chiede *chi valuta le policy* la risposta è il Policy Engine; se chiede *chi consente o blocca concretamente il traffico* è il Policy Enforcement Point."
  },
  {
    id: 214,
    topic: "Zero Trust Architecture",
    level: "COMPRENSIONE",
    scenario: "Nel modello Zero Trust, una volta che il Control Plane ha autorizzato una richiesta di accesso, il flusso di dati tra l'utente e la risorsa deve essere gestito e trasmesso in modo corretto ed efficiente fino a destinazione.",
    question: "Nel modello Zero Trust, quale componente garantisce principalmente la trasmissione corretta ed efficiente dei dati una volta prese le decisioni di accesso?",
    options: [
      "A) Adaptive identity",
      "B) Data Plane",
      "C) Control Plane",
      "D) Threat scope reduction"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Data Plane**.\n\n* **Perché è la corretta:** Il **Data Plane** all'interno del modello Zero Trust sovrintende al trasporto effettivo dei dati. Una volta che il Control Plane ha concesso l'accesso, il Data Plane si occupa di garantire che i dati vengano trasmessi in modo efficiente e raggiungano correttamente la destinazione prevista.\n* **Analisi dei distrattori:**\n  * **A) Adaptive identity** impiega decisioni di sicurezza dinamiche basate sul comportamento dell'utente e sul contesto, supportando il Control Plane nelle decisioni ma senza gestire il trasporto dei dati.\n  * **C) Control Plane** si occupa di decidere se concedere l'accesso analizzando policy, identità e segnali di minaccia, ma non gestisce la trasmissione dei dati una volta presa la decisione.\n  * **D) Threat scope reduction** riguarda la limitazione delle potenziali zone di danno all'interno di una rete, per garantire che una violazione in un'area non comprometta l'intero sistema, ma non si concentra specificamente sulla trasmissione dei dati.\n\n* **Piccolo Esempio Concentrato:** Dopo che il Control Plane approva l'accesso di un dipendente a un file server, il Data Plane instrada e trasmette i pacchetti di dati contenenti il documento richiesto, assicurando che arrivino integri e senza intoppi al dispositivo dell'utente."
  },
  {
    id: 215,
    topic: "Cryptography",
    level: "APPLICAZIONE",
    scenario: "Un portatile aziendale viene condiviso a turno da tre progettisti che lavorano su commesse di clienti concorrenti. Ciascuno deve poter accedere soltanto ai propri progetti, anche se tutti e tre sono amministratori locali della macchina e il disco è già protetto con cifratura integrale. La direzione chiede che i dati di una commessa restino illeggibili mentre lavora il collega di un'altra.",
    question: "Quale livello di cifratura risponde a questo requisito?",
    options: [
      "A) Ripetere la cifratura integrale del disco con una chiave più lunga",
      "B) Cifrare tre volumi separati, uno per progettista, ciascuno con la propria chiave",
      "C) Cifrare il traffico di rete del portatile con una VPN sempre attiva",
      "D) Applicare la cifratura a livello di database ai file di progetto condivisi"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Cifrare tre volumi separati, uno per progettista**.\n\n* **Perché è la corretta:** La chiave del ragionamento è capire **contro chi** si sta proteggendo. La **cifratura integrale del disco**, già presente, difende dal furto fisico del portatile: a macchina spenta il disco è un blocco illeggibile. Ma appena il sistema si avvia, il disco viene decifrato in modo trasparente **per chiunque stia usando la macchina**, e nello scenario si tratta di tre amministratori locali: fra loro la cifratura del disco non frappone nulla. La **cifratura di volume** sposta il confine nel punto giusto: ogni progettista monta il proprio volume con la propria chiave, e finché non lo fa quel volume resta cifrato anche a sistema acceso. Il collega che lavora sulla commessa concorrente vede un contenitore illeggibile, non i file. È esattamente ciò che la direzione chiede, e funziona nonostante i privilegi amministrativi, perché senza la chiave non c'è privilegio che aiuti.\n* **Analisi dei distrattori:**\n  * **A) Cifratura integrale con chiave più lunga:** rafforza una protezione che già funziona contro la minaccia sbagliata. Il problema non è che la cifratura del disco sia debole, è che **si dischiude tutta insieme** all'avvio: raddoppiare la chiave non cambia di una virgola chi può leggere cosa a macchina accesa.\n  * **C) VPN sempre attiva:** protegge i dati **in transito** sulla rete. I progetti dello scenario stanno fermi sul disco locale, e il collega che li apre non attraversa alcuna rete.\n  * **D) Cifratura a livello di database:** è il livello giusto quando i dati vivono **in un database**, dove esistono tabelle, colonne e un motore che applica i permessi. Qui si tratta di file di progetto sul filesystem: non c'è alcun database da cifrare.\n\n* **Trappola d'esame:** ricorda la scala dei livelli di cifratura e, per ciascuno, il momento in cui il dato torna leggibile. **Disco intero** = protegge dal furto fisico, si dischiude tutto all'avvio · **Partizione o volume** = porzioni separate con chiavi distinte, restano chiuse finché non si monta il volume · **File** = il singolo documento, protetto anche dagli altri utenti della stessa macchina · **Database** = l'archivio a riposo, in chiaro per chi vi accede · **Record o campo** = la granularità più fine, protegge anche dall'amministratore. La domanda da porsi è sempre la stessa: *chi è l'avversario, e la macchina è accesa?*"
  },
  {
    id: 216,
    topic: "Security Controls",
    level: "ANALISI",
    scenario: "Un ransomware cifra il file server di un'azienda. Il team interviene in sequenza: isola l'host dalla rete, ripristina i dati dai backup immutabili, reinstalla il sistema operativo da un'immagine certificata e infine applica la patch che chiudeva la vulnerabilità sfruttata.",
    question: "A quale categoria funzionale appartengono il ripristino dei dati e la reinstallazione del sistema?",
    options: [
      "A) Controlli investigativi (detective)",
      "B) Controlli preventivi (preventive)",
      "C) Controlli correttivi (corrective)",
      "D) Controlli deterrenti (deterrent)"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Controlli correttivi**.\n\n* **Perché è la corretta:** Un controllo **correttivo** interviene **dopo** che l'incidente si è verificato, per limitarne gli effetti e riportare i sistemi allo stato operativo. Il ripristino da backup e la reinstallazione da immagine certificata fanno esattamente questo: non impediscono l'attacco, ne riparano le conseguenze.\n* **Analisi dei distrattori:**\n  * **B) Preventivi:** nello scenario il controllo preventivo è la **patch applicata alla fine**, perché impedisce lo sfruttamento futuro di quella vulnerabilità. Il ripristino non previene nulla: l'evento è già accaduto.\n  * **A) Investigativi:** avrebbero rilevato l'attacco mentre avveniva (un EDR, un SIEM, il monitoraggio delle anomalie). Nello scenario il rilevamento c'è già stato; qui si sta rimediando.\n  * **D) Deterrenti:** agiscono sulla decisione dell'attaccante *prima* del tentativo (cartelli, banner legali, notorietà delle sanzioni). Il ransomware ha già colpito, non c'è nulla da scoraggiare.\n\n* **Nota d'esame — l'isolamento è un caso interessante:** isolare l'host dalla rete è un controllo tipicamente classificato come **correttivo** in quanto azione di contenimento dell'incidente in corso, ma alcuni testi lo leggono come preventivo perché *impedisce* la propagazione. Se la domanda propone entrambe le letture, scegli quella coerente con il momento descritto: se l'incidente è in corso e si sta limitando il danno, la risposta è correttivo.\n* **Schema temporale da memorizzare:** *prima* → direttivo, deterrente, preventivo · *durante* → investigativo · *dopo* → correttivo · *quando il controllo giusto non è applicabile* → compensativo."
  },
  {
    id: 217,
    topic: "Change Management",
    level: "APPLICAZIONE",
    scenario: "Lo studio legale 'Sydney, Norman, and Graeme' desidera implementare un processo che richieda che tutte le modifiche ai propri piani di sicurezza vengano esaminate da un comitato consultivo e approvate da un dirigente senior prima di essere implementate.",
    question: "Di quale processo è un esempio questa procedura?",
    options: [
      "A) Backout Plan",
      "B) Change Management",
      "C) Impact Analysis",
      "D) Ownership"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Change Management**.\n\n* **Perché è la corretta:** Il **Change Management** (gestione del cambiamento) è il processo per esaminare e autorizzare le modifiche ai sistemi IT, al fine di garantire che ogni cambiamento venga adeguatamente revisionato e autorizzato prima di essere implementato. Un esempio di questo processo prevede che tutte le modifiche vengano esaminate da un comitato consultivo (Change Advisory Board) e approvate da un dirigente senior prima dell'implementazione.\n* **Analisi dei distrattori:**\n  * **A) Backout Plan** è pensato per affrontare una situazione in cui un cambiamento è stato avviato ma non può essere completato; è una componente del più ampio processo di Change Management.\n  * **C) Impact Analysis** è il processo di valutazione del potenziale impatto di un cambiamento sui sistemi IT e sul business, ma non descrive l'intero processo di revisione e approvazione formale.\n  * **D) Ownership** si riferisce all'individuo o al gruppo responsabile della gestione di un particolare sistema o componente IT.\n\n* **Piccolo Esempio Concentrato:** Presso lo studio legale, ogni richiesta di modifica al firewall deve prima passare attraverso il Change Advisory Board, che valuta i rischi, e successivamente ricevere la firma del CISO prima che la modifica venga applicata in produzione: questo intero flusso costituisce il processo di Change Management."
  },
  {
    id: 218,
    topic: "Change Management",
    level: "ANALISI",
    scenario: "Un'azienda che opera in un ambiente sicuro si trova a dover decidere se aggiornare o meno alcune applicazioni legacy ancora in uso presso i propri reparti operativi.",
    question: "Qual è una potenziale implicazione tecnica derivante dal mancato aggiornamento di applicazioni legacy in un ambiente sicuro?",
    options: [
      "A) Maggiore compatibilità con i sistemi moderni",
      "B) Conformità automatica alle nuove policy di sicurezza",
      "C) Prestazioni di sistema più veloci",
      "D) Rischio elevato di vulnerabilità di sicurezza"
    ],
    answerIndex: 3,
    explanation: "La risposta corretta è la **D) Rischio elevato di vulnerabilità di sicurezza**.\n\n* **Perché è la corretta:** Il mancato aggiornamento delle applicazioni legacy in un ambiente sicuro può comportare un rischio elevato di vulnerabilità di sicurezza. Queste applicazioni obsolete spesso presentano punti deboli non corretti che gli attaccanti possono sfruttare, compromettendo potenzialmente l'intera sicurezza del sistema.\n* **Analisi dei distrattori:**\n  * **A) La maggiore compatibilità con i sistemi moderni** non è corretta: le applicazioni legacy, a differenza di quelle aggiornate, mancano tipicamente di compatibilità con gli standard di sicurezza moderni.\n  * **B) La conformità automatica alle nuove policy di sicurezza** non è corretta: il software legacy tende a rimanere indietro rispetto ai requisiti di conformità attuali.\n  * **C) Le prestazioni di sistema più veloci** non è corretta: la mancanza di aggiornamenti non migliora le prestazioni, anzi le applicazioni obsolete possono risultare più lente o meno efficienti.\n\n* **Piccolo Esempio Concentrato:** Un ospedale continua a utilizzare un vecchio sistema di gestione delle cartelle cliniche privo di patch da anni. Un attaccante sfrutta una vulnerabilità nota e non corretta in quel software per accedere ai dati sensibili dei pazienti, un rischio che sarebbe stato mitigato con aggiornamenti regolari."
  },
  {
    id: 219,
    topic: "Physical Security Controls",
    level: "ANALISI",
    scenario: "Un'azienda usa badge di prossimità a bassa frequenza, senza cifratura, che trasmettono in chiaro un numero identificativo fisso. Durante un test autorizzato, un consulente si avvicina a un dipendente in ascensore con un lettore nascosto nello zaino, copia il badge in pochi secondi e il giorno dopo entra nel data center senza essere fermato. I log registrano un ingresso perfettamente regolare a nome del dipendente.",
    question: "Quale debolezza è stata sfruttata e quale contromisura la elimina?",
    options: [
      "A) Il badge era scaduto: basta ridurre la validità dei badge a sei mesi",
      "B) Il dipendente ha praticato tailgating: serve un vestibolo di controllo accessi",
      "C) Il badge è clonabile perché non autentica: servono smart card crittografiche e un secondo fattore",
      "D) I log non erano monitorati: serve un allarme sugli ingressi fuori orario nel data center"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Il badge è clonabile perché non autentica**.\n\n* **Perché è la corretta:** Un badge di prossimità a bassa frequenza privo di cifratura non **autentica** nulla: si limita a **dichiarare** un numero, sempre lo stesso, a chiunque lo interroghi. È l'equivalente fisico di una password trasmessa in chiaro e mai cambiata, e chiunque riesca ad avvicinarsi abbastanza può copiarla senza toccare la vittima né lasciare traccia. Il dettaglio più istruttivo dello scenario è l'ultimo: il sistema registra un ingresso **perfettamente regolare**, perché dal suo punto di vista il badge presentato è autentico. La contromisura deve quindi cambiare la natura del controllo, non rafforzarne i contorni: **smart card crittografiche** che, invece di recitare un numero, eseguono una sfida crittografica con una chiave che non lascia mai la carta, e un **secondo fattore**, tipicamente un PIN sulla tastiera del lettore, così che la carta da sola non basti. È la stessa logica dell'autenticazione a più fattori applicata alla porta: qualcosa che possiedi più qualcosa che sai.\n* **Analisi dei distrattori:**\n  * **A) Badge scaduto:** nulla nello scenario riguarda la scadenza, e ridurne la validità non serve: il clone funziona per tutto il tempo in cui funziona l'originale, quindi accorciare la finestra la accorcia per entrambi.\n  * **B) Tailgating:** avviene quando qualcuno entra **accodandosi** a una persona autorizzata. Qui il consulente è entrato **da solo**, con un badge suo a tutti gli effetti: un vestibolo che ammette una persona per volta lo avrebbe fatto passare senza obiezioni.\n  * **D) Log non monitorati:** l'allarme avrebbe potuto far notare l'anomalia **dopo**, e solo se l'ingresso fosse avvenuto fuori orario. È un controllo detective, e non affronta la ragione per cui la porta si è aperta.\n\n* **Trappola d'esame:** ricorda che le tecnologie di badge non sono equivalenti e che le domande giocano su questo. **Banda magnetica e prossimità a 125 kHz** = identificatore statico in chiaro, clonabile con apparecchiature da poche decine di euro · **Smart card con chip** e le tessere senza contatto cifrate = autenticazione a sfida, la chiave non esce mai dalla carta. Il principio generale da portarsi all'esame è che un controllo che si limita a **identificare** non **autentica**: vale per i badge come per l'indirizzo MAC in rete, entrambi dichiarazioni che chiunque può ripetere."
  },
  {
    id: 220,
    topic: "Zero Trust Architecture",
    level: "COMPRENSIONE",
    scenario: "Un'organizzazione sta implementando un modello Zero Trust e desidera definire con chiarezza il principio secondo cui viene concesso l'accesso alle risorse aziendali.",
    question: "In un modello Zero Trust, quale dei seguenti principi descrive MEGLIO il modo in cui viene concesso l'accesso alle risorse?",
    options: [
      "A) Trust but Verify",
      "B) Least Privilege",
      "C) Implicit Trust",
      "D) Role-based Access Control"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Least Privilege**.\n\n* **Perché è la corretta:** In un modello Zero Trust, l'accesso viene concesso in base al principio del **minimo privilegio (Least Privilege)**, il che significa che gli utenti ricevono solo l'accesso minimo necessario per svolgere le proprie attività, senza che nessuna entità sia considerata attendibile per impostazione predefinita e con una verifica continua dell'accesso.\n* **Analisi dei distrattori:**\n  * **A) Trust but Verify** si allinea solo parzialmente al concetto, poiché implica comunque una fiducia iniziale, mentre lo Zero Trust richiede una verifica costante senza presupporre alcuna fiducia.\n  * **C) Implicit Trust** non si allinea con lo Zero Trust, poiché presuppone fiducia senza verifica continua, un concetto che il modello Zero Trust mira ad eliminare.\n  * **D) Role-based Access Control** assegna i permessi in base ai ruoli piuttosto che minimizzare rigorosamente l'accesso, il che potrebbe concedere privilegi non strettamente necessari.\n\n* **Piccolo Esempio Concentrato:** Un dipendente del reparto marketing riceve accesso esclusivamente agli strumenti e ai documenti necessari per il proprio ruolo, senza alcun accesso predefinito ad altre risorse aziendali; ogni richiesta di accesso aggiuntivo viene valutata e verificata singolarmente."
  },
  {
    id: 221,
    topic: "Public Key Infrastructure",
    level: "APPLICAZIONE",
    scenario: "Timothy, un dipendente dell'help desk, recupera il certificato del sito e identifica l'emittente e il numero di serie. Deve verificare una possibile revoca usando un elenco firmato e aggiornato dei certificati revocati, pubblicato dalla CA, senza interrogare un servizio online per il singolo certificato.",
    question: "Quale risorsa soddisfa il requisito di consultare un elenco firmato dei certificati revocati?",
    options: [
      "A) Root of Trust",
      "B) Online Certificate Status Protocol",
      "C) Certificate Revocation Lists",
      "D) Certificate Authorities"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Certificate Revocation Lists**.\n\n* **Perché è la corretta:** Una CRL è un elenco firmato dei certificati revocati. Timothy verifica firma, emittente e freschezza dell'elenco e cerca il numero di serie del certificato.\n* **Analisi dei distrattori:**\n  * **A) Root of Trust:** è la base della fiducia, non un elenco di revoche.\n  * **B) Online Certificate Status Protocol (OCSP):** può verificare lo stato di revoca di un certificato specifico, ma non soddisfa il requisito di consultare un elenco firmato. Il nome del certificato non è il criterio che distingue OCSP dalla CRL.\n  * **D) Certificate Authorities (CA):** emettono certificati e pubblicano informazioni di revoca; la risorsa richiesta è la CRL.\n* **Piccolo Esempio Concentrato:** Timothy trova il numero di serie nell'elenco valido della CA e conferma la revoca. L'assenza dalla CRL non prova da sola la validità complessiva: restano da verificare scadenza, nome del servizio e catena di fiducia."
  },
  {
    id: 222,
    topic: "Authentication Methods",
    level: "COMPRENSIONE",
    scenario: "Constance sta effettuando l'accesso al proprio conto bancario online. Il sito web verifica che stia utilizzando il nome utente e la password corretti.",
    question: "Di quale metodo comune per autenticare le persone è un esempio questo scenario?",
    options: [
      "A) Possession-based authentication",
      "B) Biometric authentication",
      "C) Location-based authentication",
      "D) Knowledge-based authentication"
    ],
    answerIndex: 3,
    explanation: "La risposta corretta è la **D) Knowledge-based authentication**.\n\n* **Perché è la corretta:** Un nome utente e una password sono esempi di **autenticazione basata sulla conoscenza (Knowledge-based authentication)**, un metodo comune per autenticare le persone basato su qualcosa che l'utente conosce.\n* **Analisi dei distrattori:**\n  * **A) Possession-based authentication** si riferisce all'utilizzo di un oggetto fisico, come una smart card o un token, per l'autenticazione.\n  * **B) Biometric authentication** si riferisce all'utilizzo di una caratteristica biometrica, come un'impronta digitale o il riconoscimento facciale, per l'autenticazione.\n  * **C) Location-based authentication** utilizza la posizione geografica in cui si trova una persona al momento dell'accesso a un sito per autenticare l'utente.\n\n* **Piccolo Esempio Concentrato:** Ogni volta che Constance accede al proprio conto bancario online, digita il proprio nome utente e la propria password: entrambe le informazioni sono note esclusivamente a lei, il che rende questo un classico esempio di autenticazione basata sulla conoscenza."
  },
  {
    id: 223,
    topic: "Secure Network Protocols",
    level: "APPLICAZIONE",
    scenario: "Safeguard Systems desidera proteggere le comunicazioni vocali tra le proprie filiali.",
    question: "Quale dei seguenti protocolli fornirebbe cifratura specificamente per il traffico vocale su IP?",
    options: [
      "A) DHCP",
      "B) ARP",
      "C) SRTP",
      "D) ICMP"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) SRTP**.\n\n* **Perché è la corretta:** L'**SRTP (Secure Real-time Transport Protocol)** fornisce cifratura, autenticazione dei messaggi e integrità per le comunicazioni vocali su IP. È progettato specificamente per proteggere il traffico del Real-time Transport Protocol (RTP) e dell'RTP Control Protocol (RTCP).\n* **Analisi dei distrattori:**\n  * **A) DHCP (Dynamic Host Configuration Protocol)** viene utilizzato per assegnare indirizzi IP dinamici ai dispositivi su una rete; non cifra il traffico vocale.\n  * **B) ARP (Address Resolution Protocol)** viene utilizzato per mappare un indirizzo IP a 32 bit a un indirizzo MAC all'interno di una rete locale, non per cifrare il traffico vocale.\n  * **D) ICMP (Internet Control Message Protocol)** viene utilizzato principalmente dai sistemi operativi dei computer in rete per inviare messaggi di errore, ad esempio quando un servizio richiesto non è disponibile; non gestisce la cifratura vocale.\n\n* **Piccolo Esempio Concentrato:** Safeguard Systems implementa l'SRTP sul proprio sistema VoIP aziendale in modo che tutte le chiamate vocali tra la sede centrale e le filiali remote siano cifrate end-to-end, impedendo l'intercettazione delle conversazioni riservate durante il transito sulla rete."
  },
  {
    id: 224,
    topic: "Public Key Infrastructure",
    level: "ANALISI",
    scenario: "Un'azienda gestisce una PKI interna che emette certificati per server, portatili e VPN. La chiave privata della CA **radice** è conservata su un server sempre acceso e raggiungibile dalla rete di amministrazione, perché \"serve spesso per emettere nuovi certificati\". Un revisore segnala la configurazione come il rischio più grave dell'intera infrastruttura.",
    question: "Perché la compromissione della CA radice è più grave di qualunque altra, e come si previene?",
    options: [
      "A) Perché ogni certificato emesso diventa inaffidabile: la radice va tenuta offline ed emettere tramite CA intermedie",
      "B) Perché i certificati già emessi scadrebbero subito: basta allungarne la validità a cinque anni",
      "C) Perché la lista di revoca non sarebbe più raggiungibile: basta pubblicarla su un secondo server",
      "D) Perché il traffico HTTPS resterebbe in chiaro: basta imporre TLS 1.3 su tutti i server interni"
    ],
    answerIndex: 0,
    explanation: "La risposta corretta è la **A) Ogni certificato emesso diventa inaffidabile: la radice va tenuta offline**.\n\n* **Perché è la corretta:** La CA radice è la **radice di fiducia** (*root of trust*) dell'intera PKI: tutto ciò che vi si appoggia è affidabile **perché** discende da lei, e non esiste nulla al di sopra che possa garantire al suo posto. Se la sua chiave privata viene rubata, l'attaccante può emettere certificati validi per qualunque nome, e ogni sistema che si fida di quella radice li accetterà: non c'è modo di distinguerli da quelli legittimi. Peggio ancora, il rimedio non è chirurgico come una revoca ordinaria: bisogna rimuovere la radice dall'archivio di fiducia di **ogni** dispositivo, generarne una nuova e riemettere **tutti** i certificati esistenti. La prevenzione è di conseguenza architetturale e si riassume in una frase: la radice **non deve stare online**. La si tiene spenta e fisicamente custodita, tipicamente con la chiave in un HSM e l'accesso sottoposto a controllo di più persone; la si accende soltanto per firmare le **CA intermedie**; e sono queste, sostituibili e revocabili, a emettere i certificati di tutti i giorni.\n* **Analisi dei distrattori:**\n  * **B) Scadenza dei certificati:** una compromissione non fa scadere nulla, e allungare la validità peggiorerebbe la situazione: un certificato falsificato resterebbe utilizzabile più a lungo. La tendenza reale va nella direzione opposta, verso durate brevi e rinnovo automatico.\n  * **C) Lista di revoca non raggiungibile:** confonde la **disponibilità** del servizio di revoca con la **fiducia**. Il problema non è che la revoca non si possa consultare: è che non si saprebbe **cosa** revocare, perché i certificati falsi sono indistinguibili dai veri, e revocare la radice invaliderebbe tutto.\n  * **D) HTTPS in chiaro:** non c'è alcun rapporto. Una CA compromessa non disattiva la cifratura: consente di **impersonare** i server, cioè di presentarsi come loro con un certificato che il client accetta. Il traffico resta cifrato, ma verso l'attaccante.\n\n* **Trappola d'esame:** ricorda la struttura gerarchica e la ragione per cui esiste. **Radice** = autofirmata, offline, firma soltanto le intermedie · **Intermedie** = online, firmano i certificati finali, e se compromesse si revocano senza travolgere l'infrastruttura · **Certificati finali** = server e utenti. Questa separazione ha un nome, **CA offline**, ed è la risposta corretta ogni volta che una domanda chiede come proteggere la radice di fiducia. Ricorda infine il principio generale: in una catena di fiducia, la compromissione di un anello invalida **tutto ciò che sta sotto**, mai ciò che sta sopra."
  },
  {
    id: 225,
    topic: "Cryptography",
    level: "APPLICAZIONE",
    scenario: "Un database ospita un'unica tabella clienti in cui, fra decine di colonne ordinarie, tre contengono dati di pagamento. L'azienda ha già la cifratura integrale del disco su tutti i server. L'auditor osserva che questo non basta: chiede che i tre campi sensibili restino cifrati anche per un amministratore di database che interroghi legittimamente la tabella, e che le altre colonne restino leggibili e indicizzabili senza penalizzare le prestazioni.",
    question: "Quale livello di cifratura soddisfa questa richiesta?",
    options: [
      "A) Cifratura di volume, estesa a tutte le unità logiche che ospitano il database",
      "B) Cifratura a livello di record o di campo, applicata alle sole tre colonne sensibili",
      "C) Cifratura di partizione, applicata alla partizione che contiene i file di dati",
      "D) Cifratura del trasporto con TLS fra il client applicativo e il server di database"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Cifratura a livello di record o di campo**.\n\n* **Perché è la corretta:** la chiave per rispondere sta nel capire **contro quale minaccia** ciascun livello protegge e, soprattutto, **dove si trova la chiave** che rimette il dato in chiaro. La **cifratura integrale del disco**, già presente, protegge i dati **a riposo** contro il furto fisico del server o del disco: a macchina accesa il volume è montato e decifrato in modo trasparente, e il **DBMS in esecuzione legge normalmente** i dati, che quindi arrivano in chiaro a chi ha i permessi per interrogare la tabella. È esattamente per questo che l'auditor dice che non basta. La **cifratura a livello di record o di campo** agisce invece sul singolo dato: le tre colonne restano cifrate **dentro** il database.\n* **La condizione che rende efficace la soluzione:** proteggere il dato **dal DBA** non dipende dalla sola granularità, ma dal fatto che la **chiave resti fuori dal suo controllo**, tipicamente custodita dall'applicazione o in un KMS/HSM, con decifratura solo per gli utenti autorizzati. Se la chiave fosse gestita dal database stesso, l'amministratore potrebbe usarla e la cifratura di colonna non lo fermerebbe.\n* **Il costo, che esiste:** cifrare tre colonne ha un prezzo. Su quei campi si perdono di norma ricerche e indici: una ricerca per uguaglianza richiederebbe cifratura deterministica, che a sua volta espone schemi ricorrenti, e le ricerche per intervallo diventano impraticabili. Il requisito dell'auditor resta comunque soddisfatto perché le **altre colonne non sono cifrate** e restano indicizzabili e ricercabili come prima.\n* **Analisi dei distrattori:**\n  * **A) Cifratura di volume:** protegge l'intera unità logica a riposo, ma a sistema avviato il volume è montato e decifrato: il DBMS continua a leggere tutto, quindi non oppone nulla a chi interroga legittimamente la tabella.\n  * **C) Cifratura di partizione:** cambia soltanto **quale area** del disco è protetta a riposo. Non tocca il modo in cui si accede alla tabella e, come la A, esce di scena appena il sistema è avviato.\n  * **D) TLS fra client e database:** protegge i dati **in transito** dall'intercettazione lungo il percorso. Il dato viene decifrato all'estremità: l'amministratore che interroga il database lo riceve in chiaro esattamente come prima.\n\n* **Trappola d'esame:** impara la scala dei livelli di cifratura dal più ampio al più selettivo. **Disco intero**, **volume** e **partizione** = protezione contro il furto fisico, decifratura trasparente a sistema avviato · **File** = protezione del singolo documento, anche da altri utenti della stessa macchina · **Database** = l'intero archivio cifrato a riposo, ma leggibile da chi vi accede · **Record o campo** = la granularità più fine, quella che può proteggere il dato anche da chi ha accesso legittimo al sistema, **a condizione che la chiave sia fuori dalla sua portata**. Quando lo scenario dice che la cifratura del disco «non basta» e nomina un amministratore, guarda alla granularità fine: cifratura di campo, ma anche **tokenizzazione** o **masking** rispondono allo stesso bisogno in scenari diversi."
  },
  {
    id: 226,
    topic: "Security Controls",
    level: "APPLICAZIONE",
    scenario: "Un'azienda apre un piccolo data center al piano terra di un edificio che affaccia su un parcheggio. L'analisi dei rischi segnala che un veicolo lanciato contro la vetrata dell'ingresso potrebbe raggiungere direttamente la sala server, e chiede una misura che fermi materialmente il veicolo prima dell'edificio.",
    question: "Quale misura appartiene alla categoria dei controlli fisici e risponde a questo rischio?",
    options: [
      "A) Un corso di sensibilizzazione per gli addetti alla reception",
      "B) Una regola del firewall perimetrale che blocca il traffico dal parcheggio",
      "C) Dissuasori in acciaio (bollard) fissati nel terreno davanti all'ingresso",
      "D) Una procedura di change management per le modifiche all'edificio"
    ],
    answerIndex: 2,
    explanation: "La risposta corretta è la **C) Dissuasori in acciaio (bollard) fissati nel terreno davanti all'ingresso**.\n\n* **Perché è la corretta:** Le **categorie** di controllo rispondono alla domanda «*chi o che cosa* applica la misura?». Un **controllo fisico** agisce sul mondo materiale: recinzioni, serrature, tornelli, illuminazione, bollard. Qui il rischio è un oggetto fisico, un veicolo, e l'unica misura che lo ferma è una barriera fisica. Per **tipo**, i bollard sono anche **preventivi**: impediscono l'evento invece di rilevarlo o rimediare dopo.\n* **Perché le altre non sono corrette:**\n  * **A) La formazione** è un controllo **operativo**, perché la eseguono persone. Può aiutare il personale a reagire, ma non ferma un veicolo.\n  * **B) La regola del firewall** è un controllo **tecnico**: filtra pacchetti, non automobili. Confonde la vicinanza al parcheggio con una minaccia di rete.\n  * **D) Il change management** è un processo **gestionale**/operativo che governa le modifiche. Non protegge l'ingresso.\n\n* **Trappola d'esame:** categoria e tipo sono due assi diversi e vanno letti entrambi. La **categoria** dice *chi* applica il controllo (tecnico, gestionale, operativo, fisico); il **tipo** dice *quando e come* agisce rispetto all'evento (preventivo, deterrente, investigativo, correttivo, compensativo, direttivo). Un bollard è **fisico** per categoria e **preventivo** per tipo: una domanda può chiederti l'uno o l'altro.\n* **Piccolo Esempio Concentrato:** davanti a molti uffici pubblici i bollard sono spesso travestiti da fioriere in cemento. Sembrano arredo urbano, ma sono dimensionati per fermare un'auto: sono un controllo fisico e preventivo."
  },
  {
    id: 227,
    topic: "Security Controls",
    level: "ANALISI",
    scenario: "Un magazzino installa sopra la porta del reparto resi una telecamera ben visibile, con una spia rossa accesa e un cartello «Area videoregistrata». Le immagini vengono conservate per 30 giorni e consultate dalla sicurezza quando mancano merci dall'inventario. La telecamera non comanda la serratura e non impedisce a nessuno di entrare.",
    question: "Quale combinazione di categoria e tipi descrive MEGLIO la telecamera?",
    options: [
      "A) Categoria tecnica; tipi preventivo e correttivo insieme",
      "B) Categoria fisica; tipi deterrente e rilevativo insieme",
      "C) Categoria operativa; tipo direttivo",
      "D) Categoria gestionale; tipo compensativo"
    ],
    answerIndex: 1,
    explanation: "La risposta corretta è la **B) Categoria fisica; tipi deterrente e rilevativo insieme**.\n\n* **Perché è la corretta:** Una stessa misura può avere **più tipi** contemporaneamente, a seconda dell'effetto che si considera. La telecamera **ben visibile**, con spia e cartello, scoraggia chi pensa di rubare: effetto **deterrente**. Le registrazioni consultate dopo un ammanco permettono di scoprire che cosa è successo e chi è stato: effetto **rilevativo** (investigativo, *detective*). La categoria è **fisica**, perché la telecamera sorveglia uno spazio fisico; alcuni testi la collocano fra i controlli tecnici, ma nessuna delle altre opzioni ha i tipi giusti, ed è sui tipi che la domanda si decide.\n* **Perché le altre non sono corrette:**\n  * **A)** La telecamera **non è preventiva**: lo scenario dice esplicitamente che non comanda la serratura e non impedisce l'ingresso. Non è nemmeno **correttiva**, perché non ripristina nulla dopo il furto.\n  * **C)** Un controllo **direttivo** indica che cosa fare, come una policy o un cartello «Vietato l'ingresso». Il cartello qui annuncia la registrazione, cioè rafforza la deterrenza, non dà un'istruzione.\n  * **D)** Un controllo **compensativo** sostituisce un controllo primario che non si può applicare. Lo scenario non parla di nessun controllo mancante.\n\n* **Trappola d'esame:** le domande sui controlli premiano chi legge l'**effetto dichiarato** nello scenario. Parole come *visibile*, *cartello*, *scoraggiare* indicano deterrenza; *registrare*, *rivedere*, *allertare*, *scoprire* indicano rilevazione; *impedire*, *bloccare* indicano prevenzione. Se lo scenario nega esplicitamente un effetto («non impedisce a nessuno di entrare»), scarta subito le opzioni che lo contengono.\n* **Piccolo Esempio Concentrato:** una telecamera finta, senza registrazione, è **solo deterrente**; una telecamera nascosta che registra è **solo rilevativa**. Quella dello scenario, visibile e registrante, è entrambe le cose."
  },
  {
    id: 228,
    topic: "Security Controls",
    level: "APPLICAZIONE",
    scenario: "Gli amministratori di un'azienda modificano spesso, e legittimamente, i file di configurazione dei server web. Dopo un audit, la direzione chiede di sapere entro pochi minuti quando uno di quei file cambia, per poter verificare che la modifica sia autorizzata. Bloccare le modifiche non è accettabile, perché fermerebbe il lavoro degli amministratori.",
    question: "Quale controllo soddisfa la richiesta?",
    options: [
      "A) Un job notturno che ripristina i file dall'ultimo backup",
      "B) Rendere i file di configurazione di sola lettura per tutti gli account",
      "C) Una policy che vieta le modifiche non approvate dal change advisory board",
      "D) Un monitoraggio dell'integrità dei file (FIM) che confronta gli hash e avvisa il SOC a ogni cambiamento"
    ],
    answerIndex: 3,
    explanation: "La risposta corretta è la **D) Un monitoraggio dell'integrità dei file (FIM) che confronta gli hash e avvisa il SOC**.\n\n* **Perché è la corretta:** La richiesta è **sapere** quando un file cambia, non impedirlo: è la definizione di un controllo **rilevativo** (investigativo, *detective*). Il **FIM** calcola un hash di riferimento di ogni file e lo ricalcola a intervalli o a ogni evento del file system; se l'hash cambia, genera un avviso. È anche un controllo **tecnico** per categoria, perché è il software ad applicarlo.\n* **Perché le altre non sono corrette:**\n  * **A) Il ripristino notturno** è un controllo **correttivo**: cancella anche le modifiche autorizzate e interviene ore dopo, senza avvisare nessuno.\n  * **B) Sola lettura per tutti** è un controllo **preventivo**: blocca anche le modifiche legittime, esattamente ciò che la direzione ha escluso.\n  * **C) La policy** è un controllo **direttivo**: dice che cosa si deve fare, ma da sola non segnala nulla se qualcuno la viola.\n\n* **Trappola d'esame:** quando lo scenario esclude esplicitamente il blocco («non è accettabile impedire…»), la risposta non può essere preventiva, anche se il controllo preventivo sembra «più sicuro». Cerca il verbo della richiesta: *sapere*, *essere avvisati*, *scoprire* portano a un controllo rilevativo.\n* **Piccolo Esempio Concentrato:** su Linux strumenti come AIDE salvano un database di hash dei file di `/etc`. Un controllo pianificato lo confronta con lo stato attuale e invia al SIEM l'elenco dei file cambiati, che l'analista confronta con i change approvati."
  },
  {
    id: 229,
    topic: "Security Controls",
    level: "COMPRENSIONE",
    scenario: "Un'azienda classifica le proprie misure di sicurezza per categoria in vista di un audit. I controlli gestionali (managerial) sono quelli che orientano il programma di sicurezza attraverso decisioni, piani e regole stabilite dalla direzione, invece di essere applicati da una tecnologia o eseguiti quotidianamente dal personale.",
    question: "Quali misure sono controlli gestionali? (scegline due)",
    options: [
      "A) L'addetto dell'help desk che verifica l'identità del chiamante prima di un reset della password",
      "B) La politica di sicurezza delle informazioni approvata dal consiglio di amministrazione",
      "C) La cifratura completa del disco con chiave protetta dal TPM",
      "D) Un programma di valutazione dei fornitori, con criteri di selezione e riesame annuale"
    ],
    answerIndex: 1,
    answerIndexes: [1, 3],
    explanation: "Le risposte corrette sono la **B)** e la **D)**.\n\n* **Perché sono le corrette:** I **controlli gestionali** (o amministrativi) definiscono *come* l'organizzazione governa la sicurezza: politiche, valutazioni del rischio, piani, programmi e criteri decisi dalla direzione. La **politica di sicurezza** approvata dal consiglio fissa gli obiettivi e le responsabilità; il **programma di valutazione dei fornitori** stabilisce con quali criteri si scelgono e si riesaminano le terze parti. Nessuno dei due è applicato da una macchina o eseguito come routine da un operatore: orientano le decisioni.\n* **Analisi dei distrattori:**\n  * **A) La verifica dell'identità da parte dell'help desk** è un controllo **operativo**: è una procedura eseguita da persone, ogni giorno, nel lavoro ordinario.\n  * **C) La cifratura del disco con TPM** è un controllo **tecnico**: una volta configurata, è la tecnologia ad applicarla senza intervento umano.\n\n* **Trappola d'esame:** la stessa parola «procedura» può ingannare. La **scrittura** di una procedura o di una politica è gestionale; la sua **esecuzione** quotidiana da parte del personale è operativa; la sua **applicazione automatica** da parte di un sistema è tecnica. Chiediti sempre chi agisce, e con quale orizzonte: la direzione che decide, la persona che esegue, la macchina che impone.\n* **Piccolo Esempio Concentrato:** la direzione approva la regola «password di almeno 14 caratteri» (gestionale); l'help desk spiega la regola ai nuovi assunti (operativo); Active Directory rifiuta le password più corte (tecnico)."
  },
  {
    id: 230,
    topic: "Security Controls",
    level: "ANALISI",
    scenario: "Un negozio online ha tre dipendenti. Il controllo interno richiede la separazione dei compiti fra chi approva un pagamento a un fornitore e chi lo esegue, ma l'unica persona in amministrazione deve fare entrambe le cose e l'azienda non può assumere nessun altro. Il titolare chiede come ridurre comunque il rischio di pagamenti fraudolenti.",
    question: "Quale misura è un controllo compensativo appropriato?",
    options: [
      "A) Una revisione mensile, da parte del titolare, di ogni pagamento eseguito confrontato con i log delle approvazioni",
      "B) Una policy scritta che vieta a chiunque di approvare i pagamenti che esegue",
      "C) Un cartello nell'ufficio amministrativo che avvisa che le transazioni sono monitorate",
      "D) Una polizza assicurativa che rimborsa le perdite dopo una frode"
    ],
    answerIndex: 0,
    explanation: "La risposta corretta è la **A) Una revisione mensile, da parte del titolare, di ogni pagamento eseguito confrontato con i log delle approvazioni**.\n\n* **Perché è la corretta:** Il controllo primario, la **separazione dei compiti**, non si può applicare: c'è una sola persona. Un **controllo compensativo** è una misura alternativa che riduce lo stesso rischio in un altro modo. La revisione indipendente del titolare reintroduce il **secondo paio d'occhi** che la separazione avrebbe garantito: un pagamento anomalo viene scoperto al più tardi entro un mese. Per funzione è rilevativa, ma il suo ruolo è compensare il controllo mancante.\n* **Perché le altre non sono corrette:**\n  * **B) La policy** è un controllo **direttivo**, e qui è inapplicabile: l'unica addetta deve per forza approvare ed eseguire, quindi la regola verrebbe violata ogni giorno senza ridurre il rischio.\n  * **C) Il cartello** è **deterrente**: può scoraggiare, ma nessuno controlla davvero, e quindi non sostituisce la verifica indipendente.\n  * **D) L'assicurazione** **trasferisce** il rischio economico e interviene dopo il danno: non riduce la probabilità della frode e non compensa la separazione dei compiti.\n\n* **Trappola d'esame:** per riconoscere un controllo compensativo chiediti «**quale controllo manca, e che cosa faceva?**». La risposta giusta deve ottenere, almeno in parte, lo **stesso effetto** del controllo mancante. La separazione dei compiti serve a far sì che una seconda persona veda ogni operazione: solo la revisione indipendente fa lo stesso.\n* **Piccolo Esempio Concentrato:** lo standard PCI DSS ammette esplicitamente i controlli compensativi quando un requisito non è applicabile per vincoli tecnici o di business documentati, a patto che soddisfino l'intento del requisito originale."
  }
];

export const INITIAL_QUESTIONS: Question[] = [...DOMAIN_1_QUESTIONS, ...DOMAIN_2_QUESTIONS, ...DOMAIN_3_QUESTIONS, ...DOMAIN_4_QUESTIONS, ...DOMAIN_5_QUESTIONS];
