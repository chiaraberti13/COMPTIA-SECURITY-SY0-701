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
    description: "Identity management, multifactor authentication, directory services and authorization models. \u26a0\ufe0f These topics belong to objective 4.6 (Security Operations): they are gathered here because they are needed from the outset, but on the exam they count as Domain 4, not Domain 1."
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
    description: "Asset lifecycle and secure disposal: acquisition, assignment and ownership, inventory and tracking, decommissioning, sanitization, certified destruction and data retention. \u26a0\ufe0f These topics belong to objective 4.2 (Security Operations): they are gathered here for continuity with governance, but on the exam they count as Domain 4, not Domain 5."
  },
};

/* ------------------------------------------------------------------ *
 * Subtopic overrides (keyed by checklistKey)
 * Populated in batches. Anything missing falls back to Italian.
 * ------------------------------------------------------------------ */

export const SUBTOPIC_EN: Record<number, Record<string, SubtopicOverride>> = {
  1: {
  /* ---------------- Domain 1 Â· Group 1: Exam Fundamentals ---------------- */
  CIATriad: {
    name: "CIA Triad",
    definition: "The three fundamental pillars of information security: Confidentiality, Integrity and Availability.",
    details: "A deep understanding of the three key concepts:\n* **Confidentiality:** Preventing unauthorized access to data. Enabling techniques: data encryption (AES/RSA), access control lists (ACL), multi-factor authentication (MFA) and role-based access control.\n* **Integrity:** Ensuring that data is not modified, corrupted or destroyed in an unauthorized or accidental way throughout its lifecycle. Enabling techniques: hash functions (SHA-256), digital signatures, checksums and version control.\n* **Availability:** Ensuring constant, timely and reliable access to systems, networks and information for all legitimate and authorized users. Enabling techniques: hardware redundancy (RAID, redundant power supplies), server clustering, geographic backups, uninterruptible power supplies (UPS) and automatic failover plans.\n\n* **Focused Mini-Example:** In a banking application, **Confidentiality** prevents other customers from reading your account balance; **Integrity** prevents malware from altering the amount of a transfer in transit from â‚¬10 to â‚¬10,000; **Availability** ensures the home-banking app stays up and running even under a DDoS attack thanks to dedicated network filters.",
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
    details: "The role of the Control Plane in Zero Trust:\n* **Decision-Making Brain:** It receives connection requests and gathers context information (threat telemetry, identity, device state).\n* **Key Components:** It contains the **Policy Engine** (which evaluates the request against policies) and the **Policy Administrator** (which issues the decision and orders the Data Plane to establish or close the connection).\n* **Isolation:** The control and decision functions are logically separated from the actual transit of data.",
    examTip: "The Control Plane acts as the decision-making brain of the Zero Trust architecture: it receives the access request, compares it with the policies and decides whether to authorize the session.",
  },
  ImplicitTrustZones: {
    name: "Implicit trust zones",
    definition: "Network areas or logical segments where all devices inside are considered inherently secure and trusted by default.",
    details: "The concept of Implicit Trust Zones:\n* **Classic Perimeter Model:** It is based on the 'castle-and-moat' idea, where the outside is treated as hostile and the inside is *presumed* secure â€” and that presumption is exactly the model's flaw.\n* **Key Vulnerability:** If an attacker manages to breach the outer perimeter (e.g. through phishing or malware), they gain unlimited and uncontrolled access to the entire internal zone (lateral movement).\n* **Elimination in Zero Trust:** The Zero Trust philosophy aims to abolish or minimize implicit trust zones to the absolute minimum, requiring continuous verification for every single transaction or request.",
    examTip: "Implicit trust zones are typical of the old perimeter security models. Zero Trust aims to abolish them through continuous verification and microsegmentation.",
  },
  DataPlaneZTA: {
    name: "Data Plane",
    definition: "The logical area of the network architecture responsible for the actual transport, transit and routing of users' data packets.",
    details: "How the Data Plane works:\n* **Operational Arm:** It does not make autonomous decisions. It simply materially applies the block or allow commands received from the Control Plane.\n* **Communication Channel:** Once the Control Plane has validated the handshake and approved the request, it establishes a tunnel or protected connection to route data traffic between the client and the resource.\n* **Efficiency:** Optimized for very high-speed processing of data packets (Layer 2, Layer 3, Layer 4).",
    examTip: "The Data Plane handles the actual transport of users' data packets once the session has been authorized and allowed by the Control Plane.",
  },

  /* ---------------- Domain 1 Â· Group 2: Security Controls ---------------- */
  TechnicalControls: {
    name: "Technical",
    definition: "Security controls implemented through hardware, software or firmware solutions.",
    details: "Also called logical controls, they use IT and network technologies to enforce the organization's security requirements:\n* **Firewalls and IDS/IPS:** Network filters, intrusion detection (IDS, out-of-band on a copy of the traffic) and intrusion prevention (IPS, **in-line**, and therefore able to drop packets â€” when configured to block rather than to detect only).\n* **Data Encryption:** Encryption of information in transit (TLS) and at rest (AES).\n* **Identity Management:** Single Sign-On (SSO) systems, multi-factor authentication (MFA) agents and digital biometric access control.\n* **Endpoint Agents:** Antivirus, antimalware and Endpoint Detection and Response (EDR).\n\n* **Focused Mini-Example:** Enabling a rule on a corporate firewall that automatically detects and blocks unencrypted traffic on TCP port 80, forcing the use of HTTPS port 443, is a technical control.",
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

  /* ---------------- Domain 1 Â· Group 3: Control Types ---------------- */
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

  /* ---------------- Domain 1 Â· Group 4: Change Management ---------------- */
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
    details: "They are two different roles, and exam questions put them side by side precisely to see whether you confuse them:\n* **Ownership - who decides and who answers:** every change request has a **named** owner, not a generic department. That is the person who knows the system, who has the formal authority to seek approval, and who is asked when something goes wrong. With no owner, a failed change has nobody to roll it back and nobody to answer for it: the give-away phrase is \"IT was handling it\".\n* **Stakeholders - who is affected:** the functions that will use the system after the change, those that depend on it, security, compliance, customer support and, when the service is public-facing, the customers themselves. Identifying them is a step of the process, not a courtesy.\n* **Why they are identified beforehand:** they answer different questions. The owner answers \"who authorizes and who is accountable\"; the stakeholders answer \"who must be told, consulted and trained\". A change that succeeds technically but is announced to nobody causes the same outage as one that fails.\n* **The typical mistakes:** confusing the owner of the **system** with the owner of the **change**, and limiting the stakeholder list to technical staff, forgetting the people who use that system every day.\n\n* **Focused Mini-Example:** The ERP is migrated to a new version over a weekend and the migration succeeds. On Monday, however, the call centre is down for three hours: the new interface changed the path for issuing a credit note and no operator had been told. The department was the system's main user and did not appear among the change request's stakeholders.",
    examTip: "Keep the two words apart. **Ownership** = a named person who **decides and answers** for the change Â· **Stakeholders** = everyone the change **touches**, to be identified, informed and where needed trained. **Exam trap:** when the scenario describes a change that succeeded technically but blocked an unaware department, the flaw is neither the backout plan nor the maintenance window: it is the failure to identify the stakeholders.",
  },
  TestResultsChange: {
    name: "Test Results",
    definition: "The documented outcomes of tests run in an environment other than production, which the approval board examines before authorizing a change.",
    details: "They are the only element of the change management package that speaks of **facts** rather than intentions:\n* **What they are for:** the impact analysis says what is *expected* to happen; the test results say what *actually happened* when the change was tried. They are the only evidence that it works and that it breaks nothing else.\n* **Where they are produced:** in an environment that resembles production - staging or UAT - with representative data and integrations. A test on an environment too unlike production returns a reassuring result with no value.\n* **What the evidence must contain:** what was tested, with what data, by whom, when, and the outcome of each case - including the **failed** runs and what was fixed. A report listing only successes is not a test report.\n* **When there is no test environment:** the correct route is not to declare them \"unnecessary\", but to state the residual risk, have it accepted by someone with the authority to take it on, and strengthen the backout plan.\n\n* **Focused Mini-Example:** A request reaches the board complete with owner, impact analysis, maintenance window and a detailed backout plan. Against \"outcome of testing\" the requester has written \"not needed, minimal change\". The board rejects it, and rightly so: without that outcome none of the other documents shows that the change works.",
    examTip: "Test results are the only item in the package that says anything about the change's **real behaviour**; everything else describes plans and intentions. **Exam trap:** \"minimal change\" is never a valid reason to omit them, and a request complete with everything except test outcomes is the right answer when the question asks what should have blocked approval.",
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
    details: "This is the part of objective 1.3 that questions test with concrete scenarios rather than definitions:\n* **Allow list and deny list:** a change may require **adding** the new server, application or address to the lists of what is permitted, or **removing** from block lists what is now legitimate. Forgetting it produces the classic \"it worked in staging\".\n* **Restricted activities:** during the window you perform **only what was approved**. This is the rule that forbids the opportunistic fix - \"while we are here, let me also turn off this service nobody uses\" - because what was never analysed has neither an impact assessment nor a rollback plan.\n* **Downtime:** it must be **estimated** beforehand, **communicated** to stakeholders and checked against the service commitments in force. Undeclared downtime breaches the SLA even when the change succeeds.\n* **Service restart and application restart:** many settings only take effect after the service or application restarts, not when the file is saved. The restart therefore belongs **inside** the window, otherwise the change applies itself later, at the worst possible moment.\n* **Legacy applications:** unsupported systems may not tolerate the change and may have no upgrade path at all. When they surface in the analysis, the correct route is to document the dependency and isolate them with compensating controls, not to postpone the whole change.\n* **Dependencies:** what depends on the system being changed, and what that system depends on. This is the item impact analysis gets wrong most often, because undocumented dependencies only surface when they break.\n\n* **Focused Mini-Example:** During a night window an administrator changes an authentication parameter, checks that the file is correct and considers the work closed. The next morning the system still behaves the old way; later a scheduled automatic reboot applies the new configuration in the middle of the working day and three dependent applications fall over together. The restart was a foreseeable implication, and belonged inside the window.",
    examTip: "Match each implication to its symptom, because that is how questions present them. Change that **has no effect** â†’ the service **restart** is missing Â· outage **in other systems** â†’ **dependencies** not mapped Â· something broken that **was not in the request** â†’ **restricted activities** violated Â· traffic blocked after release â†’ **allow list** not updated Â· customer complaints about an outage â†’ **downtime** not communicated.",
  },
  ChangeDocumentation: {
    name: "Change Documentation",
    definition: "Updating diagrams, policies and procedures after a change has been applied: the last step of the process, and the one skipped most often.",
    details: "It is the phase that brings no immediate benefit and without which everything else decays:\n* **Updating diagrams:** network topology, appliance schematics, data flows and inventory must reflect the state **after** the change. An out-of-date diagram is not neutral: it misleads whoever reads it, and whoever reads it is usually responding to an incident or running an assessment.\n* **Updating policies and procedures:** if the change alters how work is done - a new tool, an extra authorization step, a retired protocol - the procedure describing the old way must be rewritten, otherwise a document prescribing something that no longer exists stays in force.\n* **Why it is a control:** up-to-date documentation is what makes recovery, incident analysis, onboarding and auditing possible. And it is the basis of the **next change's impact analysis**: stale documentation today means a wrong impact analysis tomorrow.\n* **When it is done:** as part of closing the change, not \"when there is time\". A change is not closed until the documentation matches reality.\n\n* **Focused Mini-Example:** An external consultant is engaged to map the data centre's vulnerabilities and asks for the architecture diagram. They are handed a drawing more than a year old: two segments added since are missing, and a decommissioned server is still on it. The consultant works from a wrong map, and the most recent flaws fall outside the scope of the assessment.",
    examTip: "Documentation closes the change cycle, and its value always shows up **later**: during an incident, an audit, or the next change's impact analysis. **Exam trap:** when the scenario describes someone reaching a wrong conclusion because they trusted an out-of-date diagram or procedure, the answer is not a technical control but the documentation update the change management process requires.",
  },

  /* ---------------- Domain 1 Â· Group 5: Cryptography ---------------- */
  SymmetricEncryption: {
    name: "Symmetric Encryption",
    definition: "Encryption algorithms that use a single shared key to both encrypt and decrypt data.",
    details: "Main characteristics of symmetric-key cryptography:\n* **Computational Efficiency:** Extremely fast. It requires few computing resources, making it ideal for encrypting large volumes of static data.\n* **Distribution Problem:** Both parties must securely exchange the secret key in advance before they can communicate, a difficult process over public channels.\n* **Common Algorithms:** **AES (Advanced Encryption Standard - the global reference standard)**, 3DES (obsolete), Blowfish, Twofish and ChaCha20.\n\n* **Focused Mini-Example:** To protect users' personal data stored on a corporate hard disk, the administrator enables BitLocker. The system encrypts the entire disk at rest using the symmetric AES-256 algorithm: accessing the data requires the correct symmetric key entered at boot.",
    examTip: "AES-256 is the symmetric algorithm recommended worldwide for protecting data at rest.",
  },
  AsymmetricEncryption: {
    name: "Asymmetric Encryption",
    definition: "Encryption algorithms that use a pair of mathematically related keys: a public key and a private key.",
    details: "It solves the key-exchange problem by exploiting unique, one-way mathematical relationships:\n* **Public Key:** Can be freely shared with anyone. It is used to encrypt data intended for the owner or to verify their digital signature.\n* **Private Key:** Must be kept strictly secret by the owner. It is used to decrypt data encrypted with the corresponding public key or to generate digital signatures.\n* **Computational Slowness:** It requires significantly more processing power than symmetric cryptography, which is why it is used mainly to sign or to exchange the initial symmetric session key.\n* **Common algorithms, and what they actually do:** **RSA** both encrypts and signs, with a distinct scheme for each use (RSA-OAEP to encrypt, RSA-PSS to sign). **Diffie-Hellman** and **ECDH** encrypt nothing: they perform **key agreement**, letting two parties settle on a shared key without ever transmitting it, which is then used with a symmetric algorithm such as AES. **ECC** is not a single algorithm but a family based on elliptic curves, including ECDH for key agreement and ECDSA for signing, matching RSA's security with far shorter keys.\n\n* **Focused Mini-Example:** If Alice wants to send her social security number to Bob securely over the internet, she encrypts it using Bob's public key. From that moment, only Bob can decrypt and read the message using his own secret private key.",
    examTip: "Asymmetric cryptography solves the key-distribution problem but is much slower than symmetric cryptography. **Exam trap:** the objectives separate *encryption* from *key exchange*, and industry material often blurs them. Diffie-Hellman and ECDH **do not encrypt**: they establish a shared key (NIST SP 800-56A classifies them as *key establishment* schemes). If a question asks which algorithm encrypts the data, DH is never the answer; if it asks how two strangers agree a session key with no pre-shared secret, DH or ECDH is exactly it.",
  },
  PKIFundamentals: {
    name: "PKI",
    definition: "Public Key Infrastructure: the set of roles, policies, hardware, software and procedures needed to manage digital certificates.",
    details: "It provides the distributed trust structure to enable asymmetric cryptography on the internet:\n* **Certificate Authority (CA):** The trusted third-party entity that validates identities and digitally signs certificates (e.g. DigiCert, Let's Encrypt).\n* **Registration Authority (RA):** An auxiliary entity responsible for verifying the validity of the data and the identity of the applicant before the CA actually issues the certificate.\n* **CRL and OCSP, two different mechanisms:** both exist to find out whether a certificate has been **revoked** before its natural expiry (typically because the private key was compromised), but they work in opposite ways. A **CRL** (*Certificate Revocation List*) is a **list** the CA publishes periodically and the client downloads: simple, but it can grow large and is only as fresh as the latest issue. **OCSP** (*Online Certificate Status Protocol*) is instead a pointed **query** to a responder about the status of **one** certificate: more timely, but it creates a dependency on the responder's availability and reveals which sites the client is visiting. **OCSP stapling** solves both problems: the server itself attaches a recent, signed OCSP response to the handshake. **For the exam: list versus query.**\n\n* **Focused Mini-Example:** When a browser connects to `https://bank.com`, it verifies through PKI that the SSL certificate presented by the server was signed by a trusted CA (e.g. Let's Encrypt) present in the operating system's root certificate database, and that the domain name matches. **Note what this actually proves:** a certificate binds a public key to a **validated domain name**, not to the legitimacy of the business or its content. A phishing site can register a similar-looking domain of its own and obtain a valid certificate for it: the browser will show the connection as secure, and it will be: encrypted, to the attacker's server.",
    examTip: "If a browser receives a certificate that does not chain to a CA in its root store, it shows a warning. In TLS the client checks four things: the **domain name**, the **validity period**, the **chain** to a trusted root and, according to policy, **revocation status**. **Exam trap:** a valid certificate proves you are talking to the server for *that domain* and that the channel is encrypted; it does **not** prove the organization behind the site is honest. Always call the protocol **TLS**: SSL has been deprecated for years and TLS is the correct exam answer.",
  },
  RootOfTrustConcept: {
    name: "Root of Trust",
    definition: "The primary, inherently trusted source within a cryptographic or hardware system, on which the entire security chain rests.",
    details: "Characteristics of the Root of Trust (RoT):\n* **Security Anchor:** It represents the unverifiable starting point (since it is inherently trusted) from which trust for all other components is derived.\n* **Hardware Implementation:** Often implemented through a physical, protected cryptographic chip (such as an HSM or a TPM chip) that stores the primary root cryptographic keys.\n* **Chain of Trust:** It allows the integrity of the bootloader, operating system and digitally signed applications to be validated during startup (Secure Boot).\n\n* **Focused Mini-Example:** During startup, a server's UEFI firmware reads the trusted root cryptographic key embedded in the hardware TPM chip (Root of Trust) to validate the bootloader and make sure it has not been infected by pre-boot malware.",
    examTip: "The Root of Trust is the foundation the whole cryptographic and hardware boot chain rests on: it is trusted because it cannot be modified by software, not because it is invulnerable. If the root of trust itself is compromised - a flaw in the boot ROM, a key extracted at manufacturing - every verification built on it becomes meaningless, which is why it is implemented in immutable hardware.",
  },
  CertificateAuthorityConcept: {
    name: "Certificate Authority",
    definition: "A trusted third-party entity responsible for issuing, cryptographically signing, managing and revoking digital certificates.",
    details: "The role of the Certificate Authority (CA) in a PKI:\n* **Identity Certification:** It associates a real identity (a web domain, a company or a user) with a public key through a digitally signed certificate.\n* **Public Trust:** The root certificates of the most authoritative CAs (e.g. Let's Encrypt, DigiCert) are preinstalled in operating systems and browsers worldwide.\n* **Trust Hierarchy:** Made up of a Root CA and one or more Subordinate CAs (Intermediate CAs) to limit the risks of compromising the main root certificate.\n\n* **Focused Mini-Example:** The company Sweet as Thyme buys an SSL certificate from DigiCert (an accredited CA). DigiCert verifies the company's identity and digitally signs its public key. From that moment, all browsers recognize the site as trusted and secure through HTTPS.",
    examTip: "The Certificate Authority is the trusted organization that digitally signs a subject's public key to certify its identity to the outside world.",
  },
  RegistrationAuthorityConcept: {
    name: "Registration Authority",
    definition: "An auxiliary entity within a PKI responsible for verifying the identity of applicants before the CA issues the certificate.",
    details: "The function of the Registration Authority (RA):\n* **Control Filter:** It acts as a reception and validation office on behalf of the CA, examining documents and making sure that the applicant is actually entitled to the claimed domain or identity.\n* **No Signing Power:** The RA does not sign or directly issue the final digital certificates; it only approves or rejects requests, forwarding approved ones to the CA for cryptographic generation.\n* **Operational Efficiency:** It relieves the CA of the bureaucratic burden of verifying applicants' documents.\n\n* **Focused Mini-Example:** A company requests an Extended Validation (EV) certificate. The Registration Authority (RA) performs rigorous legal and corporate checks to verify that the company really exists. Once the data is validated, it forwards the approval to the CA, which technically issues the signed certificate.",
    examTip: "The RA verifies and validates the identity of the certificate applicant, while only the CA has the technical authority to sign and issue it.",
  },
  PublicKeyConcept: {
    name: "Public Key",
    definition: "The component of the asymmetric key pair that is made public and distributed to encrypt or verify signatures.",
    details: "Primary properties and uses of the public key:\n* **Free Distribution:** It can be placed in public directories, on websites or sent in the clear.\n* **Confidentiality Guarantor:** It is used by anyone who wants to send an encrypted message to the key's owner.\n* **Integrity/Authenticity Guarantor:** It is used to **verify** a digital signature produced with the corresponding private key. *(Mind the wording: you will often read that it decrypts the signature, but verification is an operation in its own right, not a decryption. The analogy describes only the old RSA PKCS#1 v1.5 scheme and does not hold for RSA-PSS, ECDSA or Ed25519.)*\n* **What must be protected, and what need not:** a public key has no **confidentiality** to protect â€” it is meant to circulate â€” but its **authenticity** must be. If someone gets you to accept their key in place of the recipient's, you encrypt for them. That is the problem a CA-signed certificate solves.\n\n* **Focused Mini-Example:** A citizen downloads the official public key of the Ministry of the Interior from the government portal in order to encrypt and transmit a confidential report securely, knowing that only the ministry's systems will be able to decrypt it.",
    examTip: "A public key is made to be handed out: there is **no confidentiality to protect** on a public key. Its **authenticity**, however, must be protected. If an attacker gets you to accept *their* public key in place of the recipient's, you will encrypt for them: that is the *man-in-the-middle* attack, and it is exactly the problem **PKI** solves by having a trusted CA sign the public key inside a certificate. **Exam trap:** a public key is not secret, but that does not make it indifferent where it came from.",
  },
  PrivateKeyConcept: {
    name: "Private Key",
    definition: "The secret component of the asymmetric key pair that must be guarded by the owner to decrypt or sign.",
    details: "It is the secret component of the asymmetric pair: if it leaks, an attacker can impersonate its owner in future signatures and decrypt data encrypted directly for that key; it must be revoked and replaced.\n* **Custody:** it must not be shared. If backup or migration requires export, the operation needs encryption, access control and audit logging; ideally the key remains non-exportable in a smart card, TPM or HSM.\n* **Decryption:** it decrypts data encrypted with the corresponding public key when the scheme uses asymmetric encryption.\n* **Signing:** it produces signatures verifiable with the public key; a signature does not make a document immutable, but makes later modification detectable.\n* **Forward secrecy:** later compromise of a certificate key does not retroactively decrypt TLS sessions based on ECDHE, although it enables future impersonation until the key and certificate are replaced.\n\n* **Focused Mini-Example:** If a server's TLS private key is stolen, the organisation revokes the certificate and deploys a new pair. Captured old ECDHE sessions remain protected by forward secrecy; files encrypted directly for the compromised key may be at risk.",
    examTip: "In a security exam, any scenario in which a private key is exported or shared represents a serious violation.",
  },
  CSRConcept: {
    name: "CSR",
    definition: "Certificate Signing Request: a block of encoded text generated by the certificate applicant and sent to a CA.",
    details: "The formal file needed to start the issuance of an official SSL/TLS certificate:\n* **Key Content:** It includes the applicant's **public key** (generated locally on the server together with the private key) and the applicant's identifying details (e.g. Common Name - CN: `www.company.com`, locality, organization).\n* **Control Signature:** The CSR file is signed with the applicant's private key to prove to the CA that they actually control the asymmetric key set created.\n\n* **Focused Mini-Example:** A webmaster generates a cryptographic key pair locally on the IIS web server. They then generate the CSR file containing only the public key and upload it to the DigiCert portal to request the issuance of the official certificate, keeping the private key safe on the server.",
    examTip: "The private key is never included or sent to the CA inside the CSR file.",
  },
  CertificatesConcept: {
    name: "Certificates",
    definition: "Digital documents that securely bind a subject's identity to their public key through the signature of a trusted CA.",
    details: "Digital attestations conforming to the X.509 standard that serve to prevent impersonation attacks on the web:\n* **Internal Elements:** Identity of the holder (Subject, CN, SAN), holder's public key, digital signature of the Certificate Authority, supported encryption algorithms and validity dates.\n* **What they actually prove:** they cryptographically bind a public key to **one or more domain names verified** by the CA. That is strong proof about the **name**, not about the honesty of whoever holds it: a phishing site can register its own domain and obtain a perfectly valid certificate for it.\n* **CN or SAN? SAN only:** the host name is checked **exclusively** against the **SAN** field (*Subject Alternative Name*). The **Common Name** survives for historical compatibility, but browsers have **ignored** it since 2017: a certificate listing the domain only in the CN, with no SAN, is rejected. That is why even a single-domain certificate still carries a SAN.\n\n* **Focused Mini-Example:** When you access a government institution's site, the browser inspects the certificate sent by the server and checks that the typed domain appears among the names listed in the **SAN**, that the certificate is neither expired nor revoked, and that the signature chain leads back to a CA in its own trusted root store.",
    examTip: "An expired or revoked certificate, or one with a mismatched domain name (Mismatched Name), fails validation: the browser interrupts the handshake and shows a full-page security warning. Note: the user can usually choose to proceed anyway (unless HSTS or certificate pinning is in place), so it is not a technically unbypassable block. **Exam trap:** the host name is matched against the **SAN**, not the Common Name, which browsers have ignored since 2017. And remember the limit of what the certificate proves: that you are talking to the server of *that domain* over an encrypted channel, **not** that the organization behind the site is trustworthy.",
  },
  WildcardCertificates: {
    name: "Wildcard Certificates",
    definition: "A flexible type of digital certificate that protects a main domain and all its first-level subdomains.",
    details: "It optimizes certificate management in infrastructures with multiple web servers:\n* **Issuance Syntax:** It is issued using an asterisk before the main domain (e.g. `*.company.com`).\n* **Extended Coverage:** It simultaneously protects `mail.company.com`, `shop.company.com`, `portal.company.com` and any other first-level subdomain.\n* **Security Disadvantage:** If the private key associated with the wildcard certificate is compromised, all the associated subdomains become vulnerable to interception simultaneously.\n\n* **Focused Mini-Example:** A university with hundreds of departments buys a wildcard certificate `*.university.edu`. This allows secure HTTPS to be deployed on `engineering.university.edu` and `medicine.university.edu` using a single certificate file and saving significant purchase costs.",
    examTip: "Wildcard certificates cover only one subdomain level (e.g. they do not cover `sub.mail.company.com` if issued for `*.company.com`).",
  },
  HashingConcept: {
    name: "Hashing",
    definition: "The application of a one-way mathematical function to transform input data into a fixed-length output string.",
    details: "It lets you **verify integrity** by comparing a digest with an authentic reference. It is one-way and deterministic, should exhibit a strong avalanche effect, and must make collisions impractical to construct. MD5 and SHA-1 have lost collision resistance and are deprecated; SHA-256 and SHA-3 are current choices.\n* **The decisive limitation:** an unauthenticated hash does not stop an attacker replacing **both the file and the digest**. A digital signature, MAC/HMAC or trusted channel must authenticate the reference.\n\n* **Focused Mini-Example:** A user downloads an ISO from a mirror and compares SHA-256 with a digest obtained through a trusted channel. If that page could also be altered, they should verify a **digital signature** over the file or digest.",
    examTip: "Hashing can **detect modification** only when the reference digest is authentic. It provides no confidentiality and does not authenticate origin by itself; digital signatures and HMAC add authenticity to integrity checking.",
  },
  SaltingConcept: {
    name: "Salting",
    definition: "The practice of adding a unique random string of characters (salt) to the password before hashing.",
    details: "It protects corporate credential databases from massive offline computational attacks:\n* **Function of the Salt:** It prevents identical passwords chosen by different users ('Password123') from producing the same hash visible in the database.\n* **Rainbow Table Prevention:** It makes rainbow tables completely unusable, i.e. huge precomputed lists of common password combinations and their standard hashes.\n\n* **Focused Mini-Example:** Two colleagues choose the same password `Sun2026`. At save time, the system assigns a random salt `Xy3Z` to the first user and `K9pL` to the second. The hashes stored in the database will be completely different, preventing an attacker from realizing they have the same password.",
    examTip: "A **salt** exists to defeat **precomputation**: with a random, per-user salt, rainbow tables built in advance become useless and two users with the same password produce different hashes. **Mind what a salt does NOT do:** it does not slow a guess at **a single** password by one millisecond, because an attacker who stole the database also has the salt, which is stored in the clear next to the hash. Against brute force you need a different property, **slowness**, obtained with a key-stretching function â€” bcrypt, scrypt, Argon2. Salt and slowness are used together and solve two different problems.",
  },
  DigitalSignaturesConcept: {
    name: "Digital Signatures",
    definition: "An asymmetric cryptographic mechanism used to verify the authenticity and integrity of a document.",
    details: "It simultaneously provides three key guarantees: sender Authenticity, data Integrity and Non-Repudiation:\n* **Creation Phase (Sender):** Computes the **hash** of the message and, with their own **private key**, produces the **signature** by applying a signature algorithm (RSA-PSS, ECDSA, Ed25519). *(It is not an encryption of the hash: that description holds only for the old RSA PKCS#1 v1.5.)*\n* **Verification Phase (Recipient):** Receives the message and the signature. It recomputes the message **hash** and **verifies the signature** with the **sender's public key**. *(You will often read that it decrypts the signature to extract the hash: that analogy describes only the old RSA PKCS#1 v1.5 scheme; in modern schemes - RSA-PSS, ECDSA, Ed25519 - you **verify**, you do not decrypt.)* It compares the hash of the received message and compares them: if they match, the document is intact and actually comes from the sender.\n\n* **Focused Mini-Example:** A developer releases a software update. They digitally sign the executable file using the company's private key. When the user installs the software, the operating system **verifies the signature** with the developer's public key, establishing that the package has not been altered with malware along the way.",
    examTip: "Remember well for the exam: to create a signature you use your own PRIVATE key; to verify it you use the sender's PUBLIC key.",
  },
  TPMHardware: {
    name: "TPM",
    definition: "Trusted Platform Module: a hardware or firmware module, compliant with the TCG standard, that protects cryptographic keys and records platform measurements for measured boot and attestation.",
    details: "A local cryptographic module integrated into individual devices (laptops, servers):\n* **Key protection:** it generates and uses keys without normally exposing private material. BitLocker can seal the material protecting a volume to the TPM; saying the key is simply 'inside the TPM' is a simplification.\n* **Measured boot and attestation:** it records component measurements into **PCRs**, allowing a verifier to assess platform state. Measurements **record**; they do not block.\n* **TPM and Secure Boot are different:** Secure Boot verifies signatures in UEFI firmware and can refuse to boot; the TPM protects keys and measurements. They are distinct and complementary.\n* **Discrete or firmware:** it may be a dedicated chip or an **fTPM** running in an isolated processor environment.\n* **Random generation:** it exposes a standards-compliant random-number generator fed by an entropy source and conditioning; describing its output as 'pure entropy' is inaccurate.\n\n* **Focused Mini-Example:** A consultant loses a laptop. Removing the disk is not enough to read the BitLocker volume because unlocking material is protected and may be sealed to the expected platform state; PINs and recovery keys remain essential controls in profiles that use them.",
    examTip: "A TPM is **local to a single device**: that is the difference from an **HSM**, an enterprise-grade shared module, often networked, protecting keys for many applications or for a CA. **Exam trap:** do not conflate the **TPM** (stores keys and **measures** the boot) with **Secure Boot** (UEFI firmware **verifies signatures** and can block the boot). Measuring is not preventing: only Secure Boot refuses unsigned code.",
  },
  HSMHardware: {
    name: "HSM",
    definition: "Hardware Security Module: a dedicated, enterprise-grade physical device for the protection and secure processing of cryptographic keys.",
    details: "High-performance, maximally physically protected devices intended for centralized enterprise environments:\n* **Physical Structure:** It comes as a standalone network rack module or a PCIe expansion card for servers.\n* **High Performance:** Designed to perform thousands of cryptographic operations per second (e.g. signing certificates for a Certificate Authority or processing banking transactions).\n* **Anti-Tamper Sensors (Tamper-Responsive):** It includes physical temperature, pressure or breach sensors that cause the instant and total destruction of all stored keys if the metal shell is opened or forced.\n\n* **Focused Mini-Example:** A central bank manages an armored network HSM to digitally sign all interbank payment flows. If a thief tries to physically dismount the HSM device from the rack to steal its secrets, the microchip instantly destroys the internal private keys.",
    examTip: "If the exam scenario requires enterprise protection and clustered certificate signing, the correct answer is the HSM.",
  },
  KeyEscrowConcept: {
    name: "Key Escrow",
    definition: "A security arrangement in which cryptographic keys are deposited and kept by a trusted authorized third party.",
    details: "It guarantees the recoverability of encrypted corporate data in the event of loss or emergencies:\n* **Fiduciary Backup Function:** Employees' private file-encryption keys are securely deposited in a centralized archive managed by an internal or external third party.\n* **Data Loss Prevention:** It prevents the sudden dismissal of an employee or the loss of a hardware smart card from rendering the encrypted corporate data lost and unreadable forever.\n* **Strict Release Controls:** Recovering the keys requires the joint approval of multiple guarantor figures (e.g. the two-man principle).\n\n* **Focused Mini-Example:** An engineer who encrypted the industrial designs of a new patent suddenly resigns, deleting their passwords. Company management, through a formal Key Escrow process, asks the fiduciary committee to recover the backup copy of the private key in order to decrypt and continue developing the designs.",
    examTip: "**Key escrow** answers a real problem: if the only copy of the key is on the laptop of somebody who has left, the encrypted data is gone. Depositing a copy with a trusted party makes it recoverable. **The price, which the exam expects you to know:** that copy is itself a target, and it concentrates the ability to decrypt everything in one place. And on a **signing** key, escrow destroys **non-repudiation**, because the private key is no longer held by one person alone. That is why you escrow the **encryption** key, not the signing key, and why access to the escrow is protected by two-person control.",
  },
  BlockCipherConcept: {
    name: "Block cipher",
    definition: "A type of symmetric encryption that splits the plaintext into fixed-size blocks before encrypting them.",
    details: "Characteristics of block ciphers:\n* **Fixed Size:** They process data in fixed-size byte blocks (e.g. 128 bits for AES, 64 bits for DES).\n* **Padding:** If the last block of data is incomplete, the algorithm applies padding to reach the required fixed size.\n* **Modes of Operation:** They define how to encrypt multiple blocks (e.g. ECB, CBC, GCM).\n* **Examples:** AES, DES, 3DES, Blowfish.",
    examTip: "Block ciphers require padding algorithms to complete the last block of data if it is not of the required fixed size.",
  },
  AES256Concept: {
    name: "AES",
    definition: "Advanced Encryption Standard: a symmetric block encryption algorithm standardized by the US government, widely considered secure globally.",
    details: "Characteristics of AES-256:\n* **Strength:** It uses 128-, 192- or 256-bit keys to encrypt 128-bit data blocks. To date no practical attacks against the algorithm are known; real-world breaks almost always come from **faulty implementations**, **poorly managed keys** or **badly chosen modes of operation** (ECB, for instance), not from the mathematics of AES.\n* **Reference Standard:** It is the recommended algorithm for encrypting sensitive data at rest (Data at Rest).\n* **Broad Support:** Natively integrated into almost all modern processors through dedicated hardware instructions (AES-NI) for exceptional performance.",
    examTip: "AES-256 is the default and recommended choice to guarantee the confidentiality of data at rest and corporate databases.",
  },
  StreamCipherConcept: {
    name: "Stream cipher",
    definition: "A type of symmetric encryption that encrypts the plaintext one bit or byte at a time in real time.",
    details: "Characteristics of stream ciphers:\n* **Real-Time Efficiency:** They encrypt data continuously (one bit or byte at a time), making them ideal for audio/video streams or low-latency network communications.\n* **Keystream:** They combine the plaintext with a pseudo-random key stream (keystream) through an XOR operation.\n* **Examples:** RC4 (obsolete and vulnerable), ChaCha20.",
    examTip: "Stream ciphers are ideal for real-time data transmission or continuous streams where the total length of the message is not known in advance.",
  },
  KeyStretchingConcept: {
    name: "Key Stretching",
    definition: "A cryptographic technique designed to make passwords more resistant to offline brute-force attacks by increasing the computational cost of hashing.",
    details: "Mechanism and algorithms of Key Stretching:\n* **Salt and work factor:** the derivation function combines the password with a **salt unique to each credential** and with a configurable cost that slows down **every single attempt**. The salt defeats rainbow tables; the cost makes brute force slow.\n* **Intentional slowdown:** the time to compute one hash goes from nanoseconds to fractions of a second. For a legitimate user the delay is imperceptible; for someone trying billions of combinations offline on GPUs, the cost multiplies with every attempt.\n* **The algorithms are not equivalent:** **PBKDF2** only varies the number of **iterations**, so it parallelizes well on GPUs and ASICs. **bcrypt** uses a cost factor and a memory access pattern that make it less convenient to parallelise. **scrypt** and **Argon2** add an explicit **memory cost**, today the most effective defense against dedicated hardware; Argon2id is the preferred choice for new applications.\n* **What it does NOT do:** it raises the attacker's **effort**, it does not make guessing **mathematically impossible**. A weak password, or one already in a public breach corpus, still falls, only more slowly: derivation must be paired with screening against compromised-credential lists and with adequate length.",
    examTip: "Key Stretching intentionally raises the cost of **each attempt**, countering offline GPU brute force. **Exam trap:** it is not a guarantee of invulnerability but a time multiplier; and the four algorithms are not interchangeable - PBKDF2 varies only iterations, while scrypt and Argon2 also impose a **memory** cost, which is what really hinders dedicated hardware. Remember too that the **salt** makes each hash unique rather than slow: slowing down is the work factor's job.",
  },
  BlockchainConcept: {
    name: "Blockchain",
    definition: "Blockchain: a tamper-resistant distributed ledger whose blocks are linked to one another by hashes; it may be public or permissioned. Open public ledger: a ledger anyone can read, often implemented using a public blockchain.",
    details: "The official SY0-701 objectives (Obj 1.4) list **blockchain** and **open public ledger** as two **separate** items, and the distinction matters:\n* **Blockchain** is the **data structure**: blocks chained by hashes, replicated across nodes, governed by consensus rules. It says **how** the ledger resists alteration, not who may read it.\n* **Open public ledger** is about **visibility**: a ledger anyone can inspect. It is typically built on a public blockchain, but **permissioned** blockchains exist, where reading and writing are restricted to authorized participants: those are **not** public ledgers.\n* **Tamper resistance:** each block carries the previous block's hash, so altering past data makes the whole subsequent chain inconsistent. Its strength depends on hashing, the **consensus mechanism** and network rules. The famous **51%** threshold describes Proof of Work and does not hold universally: other mechanisms (Proof of Stake, permissioned consensus) have different thresholds and assumptions.\n* **What it proves, and what it does not:** hashing makes alteration **detectable**. A transaction's **authenticity** and **non-repudiation** do not follow from the ledger itself but from **digital signatures** and trustworthy key management.\n\n* **Focused Mini-Example:** a consortium of food producers records the movements of a batch of olive oil. Choosing a **permissioned** blockchain, authorized participants can see the supply chain and none of them can unilaterally rewrite a recorded step, but the public reads nothing. To let shoppers verify for themselves by scanning the code on the bottle, a **public ledger** is required: and then which data to expose must be decided in advance, because whatever goes on it is visible to anyone, permanently.",
    examTip: "**Exam trap:** blockchain and open public ledger are not synonyms. A blockchain is the **structure** (chained hashes plus consensus); a public ledger is a **visibility choice**. Remember what a distributed ledger does and does not offer: it gives **integrity** and **availability** through replicated copies, plus **traceability**; it does not give **confidentiality**, and on its own it does not give **non-repudiation**, which comes from signatures. Practical rule: never write secrets in plaintext to a public ledger, because there is no way to erase them.",
  },
  CodeSigningConcept: {
    name: "Code signing",
    definition: "The process of digitally signing scripts and executables through asymmetric cryptographic certificates to guarantee their authenticity and integrity.",
    details: "Code signing allows software developers to digitally sign their programs or updates before distribution:\n* **Authenticity:** The operating system or the end user's client verifies the signature using the manufacturer's public key, guaranteeing the trusted origin of the resource.\n* **Integrity:** It ensures that the file has not been altered, damaged or tampered with by third parties (for example by injecting malware) along the distribution chain.\n\n* **Focused Mini-Example:** A software company releases a critical security patch. Before distributing it, it signs the executable with its corporate private key (**Code signing**). When customers' systems download the update, they verify the cryptographic signature with the public key to validate the legitimate origin before running the automatic installation.",
    examTip: "Code signing ensures the trusted origin (authenticity) and the absence of unauthorized alterations (integrity) of software or updates during distribution.",
  },

  /* ---------------- Domain 1 Â· Group 6: Physical Security ---------------- */
  PhysicalBadge: {
    name: "Badge",
    definition: "Smart cards and physical ID cards used to authenticate individuals and control access.",
    details: "Tangible cards and credentials intended to regulate physical movements:\n* **Integrated Technologies:** NFC (Near Field Communication) and RFID allow armored doors to be opened by bringing the card close to the reader.\n* **Visual Identification:** They usually show the employee's photo, name and department for visual checks by guards.\n* **MFA Integration:** They can be combined with the entry of a PIN on the door's numeric keypad.\n\n* **Focused Mini-Example:** To enter the protected software development wing, an employee must bring their RFID badge close to the wall reader: the access control system unlocks the electric lock and records the entry in the audit log.",
    examTip: "The combination of a badge (something you have) with a PIN code on the door reader (something you know) constitutes physical two-factor authentication.",
  },
  SecurityGuards: {
    name: "Security Guards",
    definition: "Human personnel employed to watch over the perimeter, manage entrances and respond to physical anomalies.",
    details: "They represent the human element of on-site guarding and adaptive emergency response:\n* **Adaptive Factor:** Unlike automatic systems, guards can assess unusual threats, suspect anomalous behavior and make dynamic decisions.\n* **Visual Deterrence:** The visible presence of security personnel drastically reduces the risk of break-in attempts.\n* **Active Response:** Intervening to physically stop an intruder or provide help in case of fire.\n\n* **Focused Mini-Example:** A security guard on duty at the main entrance of the data center notices two people dressed as maintenance workers trying to sneak in by walking right behind an authorized employee (piggybacking). The guard stops them by requesting credentials and thwarting the intrusion.",
    examTip: "On the exam, security guards are classified as both a Physical and an Operational control.",
  },
  PhysicalCameras: {
    name: "Cameras",
    definition: "Video surveillance systems (CCTV) strategically positioned to monitor and record activity.",
    details: "Electronic systems for the continuous visual capture of sensitive areas:\n* **Investigative Function (Detective):** It allows events that occurred after a breach to be visually reviewed and analyzed.\n* **Active Deterrence:** Clearly visible cameras positioned along the fences discourage thieves.\n* **Modern Video Analytics:** Integrated algorithms able to automatically alert the SOC in case of perimeter climbing.\n\n* **Focused Mini-Example:** The morning after some monitors are stolen from the office, the security team examines the visual recordings of the internal CCTV cameras, identifying the exact time of the theft and the faces of those responsible to provide to law enforcement.",
    examTip: "CCTV is a classic investigative/detective control on the exam.",
  },
  PhysicalFencing: {
    name: "Fencing",
    definition: "Physical perimeter barriers designed to delimit the organization's property and hinder casual access.",
    details: "The first line of physical defense against intrusions coming from outside:\n* **Sizing:** The height of the fence determines the degree of security (e.g. 2.4-meter fences with barbed wire discourage almost all intruders).\n* **Vibration Sensors:** They can integrate microphonic cables to detect and alert in case of cutting or climbing attempts.\n\n* **Focused Mini-Example:** A chemical storage industrial plant is surrounded by a 3-meter-high galvanized steel fence topped with concertina barbed wire, which prevents the casual passage and intrusion of curious onlookers or malicious individuals.",
    examTip: "Fences act as a preventive physical control by clearly delimiting the boundaries of the property.",
  },
  PhysicalBollards: {
    name: "Bollards",
    definition: "Heavy metal or concrete street deterrents, installed to prevent vehicles from crashing into buildings.",
    details: "Very high-strength mechanical protection measures intended to stop vehicles:\n* **Stopping Resistance:** Designed to absorb the kinetic impact energy of cars or trucks launched at high speed.\n* **Ram-Raiding Prevention:** They prevent intentional break-in attempts aimed at knocking down entrances or windows to penetrate inside the structures.\n\n* **Focused Mini-Example:** In front of the glass doors on the ground floor of a prestigious bank data center, sturdy steel bollards filled with concrete and buried deep are installed, making it physically impossible for hostile cars or trucks to approach.",
    examTip: "If the exam scenario describes the threat of a vehicle trying to smash through the building's physical entrances, bollards are the correct countermeasure.",
  },
  PhysicalSensors: {
    name: "Sensors",
    definition: "Electronic devices designed to detect physical or environmental changes within a protected area.",
    details: "Sensors positioned to ensure the environmental stability and anti-intrusion protection of critical areas.\n* **The four types objective 1.2 names, and each one's weakness:**\n  - **Infrared (PIR, passive):** detects **body heat in motion**. Cheap and ubiquitous, but it loses sensitivity when the ambient temperature approaches body temperature - typically on summer nights in a warehouse - and it cannot see through glass.\n  - **Pressure:** detects **weight** on a surface: sensitive mats, platforms, raised floors. Simple and reliable, but it covers only the surface it is installed on and is bypassed by walking elsewhere.\n  - **Microwave:** emits radio waves and measures the change in the reflected signal, so it detects **movement** regardless of heat, even in total darkness. It covers large volumes, but it passes through thin walls and can false-positive on movement beyond them.\n  - **Ultrasonic:** same principle with high-frequency sound waves. Sensitive to small movements, but also to draughts from air conditioning and to noise, which make it prone to false alarms.\n* **Why they are often combined:** **dual-technology** sensors (typically infrared plus microwave) raise the alarm only when **both** detect, which cuts each one's false positives without sacrificing coverage.\n* **Environmental Detection:** beyond intrusion, humidity sensors, smoke sensors, rapid-rise heat detectors and flood sensors under raised floors.\n\n* **Focused Mini-Example:** Inside the server room, under the raised floor where the electrical cables run, a flood sensor is installed. In the event of a water leak from the air conditioning system, the sensor sends an immediate emergency-shutdown notification before short circuits occur.",
    examTip: "Environmental sensors in the server room preserve the hardware's **Availability** by mitigating flooding and overheating. **Exam trap:** on intrusion sensors the question is almost always settled by the **weakness** of the wrong type, not the merit of the right one. Room as warm as a human body â†’ **infrared** cannot see, you need **microwave** Â· uneven or cluttered floor â†’ a **pressure** sensor does not cover it Â· draughts and noise â†’ **ultrasonic** gives false alarms Â· too many false positives in general â†’ **dual-technology** sensor.",
  },
  HVACPhysical: {
    name: "HVAC",
    definition: "Heating, Ventilation, and Air Conditioning: physical systems used to regulate temperature, humidity and air-purity parameters.",
    details: "The role of HVAC systems in data center security:\n* **Overheating Prevention:** Modern servers generate enormous amounts of heat; if the room temperature exceeds tolerated limits, the systems shut down automatically for thermal protection (violating availability) or suffer permanent hardware failures.\n* **Humidity Control:**\n  - *Too low:* Favors the buildup of static electricity, causing electrostatic discharges (ESD) that are lethal to memory chips and CPUs.\n  - *Too high:* Causes water condensation on electronic circuits, resulting in short circuits.\n* **Air Filtration:** Removes dust and particles that could clog the servers' cooling fans.\n* **Fire Containment:** HVAC systems must integrate with smoke and heat detectors to shut down instantly in case of fire, avoiding feeding the flames by supplying oxygen.",
    examTip: "In a data center, maintaining controlled humidity and temperature through HVAC systems is vital to prevent electrostatic discharges (ESD, caused by too-low humidity) and short circuits (caused by condensation from too-high humidity).",
  },

  AccessControlVestibule: {
    name: "Access Control Vestibule",
    definition: "A small room with two interlocked doors, only one of which can be open at a time, admitting one person at a time and making it mechanically impossible to walk in behind someone else.",
    details: "It is the only physical control that solves tailgating rather than discouraging or recording it:\n* **How it works:** the person opens the first door with their badge and steps into the vestibule; the first door must close before the second can open. Many installations add a weight sensor or a people counter, which halts the cycle if more than one individual is inside.\n* **The problem it solves:** **tailgating**, where a stranger follows an employee who does not notice, and **piggybacking**, where the employee deliberately holds the door open out of courtesy. Training reduces both but never eliminates them, because they ask one person to be rude to another.\n* **Why it is the right answer in scenarios:** cameras document what happened afterwards, signs discourage, training lowers the frequency. Only the vestibule makes two people passing together **physically impossible**.\n* **Practical limits worth knowing:** it slows the flow, so it suits the entrance to critical areas - server room, laboratories, vaults - and not a lobby that must clear hundreds of people at shift start. It also needs an escape route compliant with fire regulations, because in an emergency people must be able to get out.\n\n* **Focused Mini-Example:** A data centre entrance is protected by a badge-reader turnstile, but the register does not add up: physical presences outnumber badge swipes. Cameras show employees courteously holding the door for whoever follows them. Once the gate is replaced with an interlocked double-door vestibule the problem stops: the second door will not open until the first is shut.",
    examTip: "**Mind the name:** the SY0-701 objectives call it an **access control vestibule**; *mantrap* is the historical term, still common in the field but not the one you will find among the exam options. **Exam trap:** when the scenario describes tailgating or piggybacking and asks for the control that makes it **impossible**, the answer is the vestibule - not cameras, which detect; not signs, which deter; not training, which only lowers the frequency.",
  },
  PhysicalLighting: {
    name: "Lighting",
    definition: "Security lighting of outdoor areas and access points: a physical control that discourages intrusion attempts and, at the same time, makes the other surveillance controls usable.",
    details: "It is the most underrated physical control, and the one the others depend on:\n* **The dual function the exam tests:** lighting is **deterrent**, because anyone acting covertly avoids spaces where they can be seen and recognised, and it is **enabling**, because without light cameras return unusable images and guards see nothing.\n* **Where it applies:** perimeter and fences, car parks and yards, entrances and emergency exits, loading bays, walkways, and any area where a camera must capture faces or number plates.\n* **Design criteria:** uniformity, because the shadow between two lamp posts is exactly where someone hides; no glare towards the cameras; **motion-sensor** activation where permanently lit is not sustainable; and emergency power on critical points, because a power cut must not switch off lighting and surveillance together.\n* **The link with cameras:** a camera is only as good as the light it has. Before replacing units with higher-resolution models it is worth checking the lighting: for the same money it is almost always the change that produces the biggest improvement.\n\n* **Focused Mini-Example:** A remote industrial site suffers night-time thefts from its yard. Cameras are already in place, but at night they produce unusable footage. Lighting the yard and completing the fence cuts the attempts immediately - anyone approaching knows they are visible - and the recordings finally become usable as evidence.",
    examTip: "Lighting appears among the physical controls of objective 1.2 and is the classic control that is **deterrent and enabling at once**. **Exam trap:** when the scenario complains about unusable night-time footage, the answer is not buying better cameras but **lighting the area**; and when it asks how to discourage attempts *before* they happen, light and fencing come before video surveillance.",
  },

  /* ---------------- Domain 1 Â· Group 7: Deception Technologies ---------------- */
  HoneypotDeception: {
    name: "Honeypot",
    definition: "A single decoy computer system, server or resource configured to appear vulnerable and attract attackers.",
    details: "An isolated digital decoy whose purpose is to attract scans and active exploits:\n* **Zero Legitimate Traffic:** Because the machine hosts no real corporate service, any interaction, ping or login attempt is considered hostile by definition.\n* **Attack Study:** It allows the tactics and zero-days used by hackers to be safely captured and analyzed without compromising the real infrastructure.\n\n* **Focused Mini-Example:** The security team configures an obsolete virtual machine with an open, unpatched RDP port, fictitiously naming it 'Invoices_Server_2025'. Any hacker scanning the network will notice the vulnerable machine and attempt the attack, allowing the SOC team to block the threat's IP on the real network.",
    examTip: "The Honeypot is a deception technology that also acts as a detective control.",
  },
  HoneynetDeception: {
    name: "Honeynet",
    definition: "A complete decoy network made up of multiple simulated systems, databases and fake services.",
    details: "An entire simulated, fictitious ecosystem for an in-depth study of intruder behavior:\n* **High Interaction:** Made up of fake web servers, simulated databases and virtual routers that cooperate with each other.\n* **Lateral Movement Analysis:** It allows study of how the attacker moves within the network, which passwords they try to crack and which local exploration tools they download.\n\n* **Focused Mini-Example:** A telecommunications company deploys a fictitious subnet that mimics the control network of a power plant. The attackers, believing they have penetrated the real infrastructure, spend days scanning the fake industrial PLCs, while the researchers record their every single move and command.",
    examTip: "Honeynets capture an attacker's entire behavior at the network level.",
  },
  HoneyfileDeception: {
    name: "Honeyfile",
    definition: "Decoy files with enticing names containing bogus information, placed to detect unauthorized access.",
    details: "Decoy documents placed in shared folders or corporate file servers:\n* **Enticing Names:** Named so as to attract the curiosity of malicious insiders or hackers (e.g. `server_passwords.txt` or `salary_bonuses_2026.xlsx`).\n* **Silent Alarm:** Equipped with sensors or software scripts; if the file is opened, copied or downloaded, it instantly generates a very high-priority alert in the SIEM indicating the compromised account.\n\n* **Focused Mini-Example:** An administrator places the file `secret_projects.docx` in an accessible folder of the corporate cloud. The file contains only fictitious text but includes a web tracking pixel: when an unauthorized user opens the file, the pixel sends a silent HTTP request that immediately alerts the security team.",
    examTip: "Opening a honeyfile is an extremely precise indicator of compromise (IoC) because no legitimate user has any reason to open it.",
  },
  HoneytokenDeception: {
    name: "Honeytoken",
    definition: "Special fictitious data spread across systems to track and detect exfiltration.",
    details: "Fictitious data elements and strings inserted inside real databases or source code:\n* **Data Leak Detection:** Fictitious email addresses inserted into the customer database; if these addresses start receiving spam, the company has proof that the database has been exfiltrated.\n* **Credential Use Detection:** Fictitious API keys inserted into software code on GitHub; if someone tries to use them to query the cloud, an instant alert is triggered identifying the attacker's origin.\n\n* **Focused Mini-Example:** A developer inserts a fictitious, disabled AWS API key into public source code. A hacker's bot scans GitHub, finds the key and tries to use it to launch EC2 instances: the AWS CloudTrail system detects the attempt to use the fictitious honeytoken key and sends a real-time compromise alert.",
    examTip: "Honeytokens help detect data breaches even when the data leaves your network's perimeter control entirely.",
  },

  /* ---------------- Domain 1 Â· Group 8: Identity & Access Control Models ---------------- */
  AuthenticationConcept_New: {
    name: "Authentication",
    definition: "The process of verifying the identity claimed by a user, computer or IT service attempting to access a system.",
    details: "Details on Authentication:\n* **Purpose:** It answers the question: *'Who are you?'* or *'Are you who you claim to be?'*.\n* **Authentication Factors:** It relies on the validation of one or more factors, including passwords (something you know), tokens/smart cards (something you have) or biometric data (something you are).\n* **Practical Example:** Entering a username and password and passing a request for an OTP code sent via SMS to access the work email inbox.",
    examTip: "Authentication is always the first phase of the AAA framework; it validates and certifies a claimed identity before evaluating which access rights to assign to it.",
  },
  AuthorizationConcept_New: {
    name: "Authorization",
    definition: "The process of granting or denying specific access rights, permissions and privileges to an identity that has already been successfully authenticated.",
    details: "Details on Authorization:\n* **Purpose:** It answers the question: *'What are you allowed to do?'*.\n* **Enforcement Mechanisms:** It is controlled through access control lists (ACL), roles (RBAC), or dynamic attributes (ABAC) defined by the administrator.\n* **Practical Example:** An authenticated HR employee tries to open the payroll folder: the server examines the Windows ACLs and authorizes the access because the employee belongs to the 'HR Department' group.",
    examTip: "Authorization occurs exclusively *after* the user has been successfully authenticated; it defines and enforces the user's operational boundaries in a granular way.",
  },
  AccountingConcept_New: {
    name: "Accounting",
    definition: "The process of chronologically recording and monitoring all the activities carried out by an identity within the computer system.",
    details: "Details on Accounting:\n* **Purpose:** It answers the question: *'What did you do and when?'*.\n* **Application:** It collects detailed telemetry and logs (e.g. commands typed, files modified, login/logout times, IP addresses used).\n* **Accountability, not absolute proof:** centralised, access-protected, tamper-evident, time-synchronised logs make actions attributable and harder to dispute. A log alone does not prove who was physically at the keyboard: shared or stolen credentials weaken attribution. Strong non-repudiation also needs reliable identity binding, digital signatures or equivalent controls.\n* **Practical Example:** The SIEM records that account 'j.smith' logged in at 03:00 and exported a 5 GB customer report. This is important evidence to correlate with MFA, source device and other logs, not irrefutable proof of the individual.",
    examTip: "Accounting provides **traceability and accountability**. An intact audit log supports attribution but does not automatically equal non-repudiation: if an account is shared or compromised, the log identifies the credential used, not necessarily the person.",
  },
  AccessControlModels: {
    name: "Access Control Models & Directory Services",
    definition: "The authorization models (RBAC, ABAC, MAC, DAC) and the centralized directory services for Identity and Access Management.",
    details: "They define the mathematical/administrative logic and protocols through which to grant access permissions to information:\n* **RBAC (Role-Based Access Control):** Permissions are associated with corporate roles or job functions (e.g. 'Administration', 'HR') and inherited by users enrolled in the group, reducing the buildup of privileges (Privilege Creep).\n* **ABAC (Attribute-Based Access Control):** Extremely flexible contextual decisions based on the attributes of the subject (e.g. department), the resource (e.g. file sensitivity), the action (e.g. read) and the environment (e.g. working hours, VPN IP).\n* **MAC (Mandatory Access Control):** A rigid, military-style model based on classification labels (e.g. 'Top Secret', 'Confidential') and clearance levels associated with users. Permissions are centralized and cannot be modified by individual file owners.\n* **DAC (Discretionary Access Control):** A flexible model in which the original owner of the file (Owner) has full discretion to grant or revoke read/write permissions to any other user on the system.\n* **Directory Services:**\n  - **Active Directory (AD):** Microsoft's proprietary directory service for the centralized management of machines, identities, group policies (GPO) and domain permissions.\n  - **LDAP:** Open standardized protocol for querying and authenticating users within a directory service.\n\n* **Focused Mini-Example:** In a hospital, the front-desk staff belong to the 'Administrative' group (**RBAC**) and can enter patients' personal data, but only doctors can read clinical diagnoses. If a doctor tries to access the records from home outside working hours, the attribute-based system (**ABAC**) blocks the attempt by evaluating the time and the IP address.",
    examTip: "On the exam, memorize this very useful mnemonic scheme:\n* **DAC** â†’ the owner **D**ecides.\n* **MAC** â†’ **M**ilitary (mandatory classifications).\n* **RBAC** â†’ **R**ole.\n* **ABAC** â†’ **A**ttributes.\n\nOn the rigidity axis, **MAC** is the most **restrictive** â€” the system imposes the labels and not even the file's creator may override them â€” and **DAC** the most **permissive**, because it leaves the decision to the resource owner. **Beware a common shortcut:** *most restrictive* does not mean *most secure in the absolute*. MAC is the right choice where confidentiality dominates everything else, as in military settings; elsewhere its rigidity makes work impractical and pushes people to route around it, and a well-maintained RBAC protects more than a MAC nobody can live with. The right model is the one that fits the context.",
  },
  RBACConcept: {
    name: "RBAC (Role-Based Access Control)",
    definition: "Access control based on the roles defined within the organization (the user's Role).",
    details: "Characteristics of **RBAC (Role-Based Access Control)**:\n* **Association with Roles:** Permissions are not assigned to individual users, but to organizational roles or job functions (e.g. 'HR', 'Finance', 'Administrator'). Users inherit the permissions associated with the roles they belong to.\n* **Administrative Simplification:** It greatly reduces the complexity of managing permissions in medium-to-large organizations.\n* **Privilege Creep Prevention:** When an employee changes department or job function, it is enough to remove them from the old group and add them to the new one, eliminating obsolete privileges.\n\n* **Focused Mini-Example:** In a hospital, an employee is hired as a doctor. They are added to the 'Doctors' Active Directory group, instantly inheriting access to patients' clinical records, without the administrator having to configure individual permissions.",
    examTip: "On the exam, always associate **RBAC** with the **user's Role** (Role/Job function) and with inheritance through groups.",
  },
  RuleBasedAccessControlConcept: {
    name: "RuBAC (or Rule-Based Access Control)",
    definition: "Access control based on fixed rules and restrictions defined by the system (System-defined rules).",
    details: "Characteristics of **RuBAC (or Rule-Based Access Control)**:\n* **System Rules:** Access authorizations are determined by a set of logical rules predefined in the system, regardless of the specific identity or role of the user.\n* **Common Factors:** Typically based on objective parameters such as permitted access hours (e.g. Mon-Fri from 9:00 to 18:00), geolocation or source IP addresses.\n* **Difference from RBAC:** While RBAC focuses on the subject's job function (Who you are/What you do), RuBAC evaluates logical filters and objective constraints (Which rules apply).\n\n* **Focused Mini-Example:** A network administrator sets a rule on the firewall and VPN server whereby administrative SSH connections are allowed exclusively from the central IT office's IP range and only during standard working hours.",
    examTip: "On the exam, remember that **RuBAC / Rule-Based** refers to **System-defined rules** (e.g. IP filters, time schedules), not to corporate groups or roles.",
  },
  AttributeBasedConcept: {
    name: "ABAC (Attribute-Based Access Control)",
    definition: "Dynamic access control based on the attributes associated with the user, the resource and the environmental context (Attributes of user, resource and context).",
    details: "Characteristics of **ABAC (Attribute-Based Access Control)**:\n* **Dynamic Evaluation:** It is the most flexible and granular model. It allows complex authorization policies to be written by evaluating combinations of attributes in real time.\n* **Three main categories of attributes:**\n  - *Subject (User) Attributes:* Department, clearance level, job title, seniority.\n  - *Resource (Object) Attributes:* File name, owning department, confidentiality level, data type.\n  - *Environmental (Context) Attributes:* Current working hours, GPS geolocation, IP address, device update status.\n\n* **Focused Mini-Example:** A corporate policy establishes that: 'A doctor (subject) can modify a medical record (resource) with a Confidential classification only if they access through an encrypted corporate tablet (context) and the request comes from the hospital's Wi-Fi IP (context)'.",
    examTip: "Remember that **ABAC** is based on **Attributes of user, resource and context** (Subject, Object, Environment), offering the maximum granularity and contextual flexibility.",
  },
  DACConcept: {
    name: "DAC (Discretionary Access Control)",
    definition: "Access control in which the owner of the resource arbitrarily determines who can access it (Resource owner).",
    details: "Characteristics of **DAC (Discretionary Access Control)**:\n* **Owner's Discretion:** The creator of a resource (file, directory, database) is its owner and has the exclusive, discretionary power to grant, modify or revoke read, write or execute permissions to other users or groups.\n* **Flexibility and Simplicity:** Extremely common in consumer operating systems (folder-sharing permissions in Windows NTFS or chmod in Unix/Linux).\n* **Security Risk:** Because security is decentralized, the negligence of a single user (or malware running with their permissions) can easily expose confidential data by sharing it with unauthorized parties.\n\n* **Focused Mini-Example:** A marketing manager creates a folder on their desktop and uses Windows sharing settings to grant read-only access to two colleagues on their team, excluding all other users.",
    examTip: "On the exam, **DAC** is associated with the discretion of the **Resource owner** (Data Owner). It is the most permissive and decentralized model.",
  },
  MACConcept: {
    name: "MAC (Mandatory Access Control)",
    definition: "Rigid access control based on centralized security classifications and clearance levels (Security classifications).",
    details: "Characteristics of **MAC (Mandatory Access Control)**:\n* **Centralized Classifications:** A model of military origin, the most **restrictive** of those in the objectives. Subjects and objects receive centralized security labels imposed by the administrator (e.g. 'Public', 'Confidential', 'Secret', 'Top Secret').\n* **No Discretion:** Users and file owners CANNOT decide who accesses the data or modify the security labels of the files they create.\n* **Comparison Rule:** Access is authorized only if the user's clearance level is greater than or equal to the file's security label, and the user has a real work-related need (Need to Know).\n\n* **Focused Mini-Example:** An army analyst with a 'Secret' access level tries to open a document labeled 'Top Secret'. Even though the analyst may have taken part in drafting it, the secure operating system (e.g. SELinux with a MAC policy) immediately blocks access.",
    examTip: "On the exam **MAC** is the most **restrictive** model, based on **security classifications** and clearances set centrally: neither the file owner nor the user can change them. Most restrictive does not mean best in every case: it suits environments where confidentiality dominates everything else (military, government, SELinux), while elsewhere its rigidity blocks work and pushes people to route around it. **A useful edge case:** when the role is not enough and contextual conditions are needed (time of day, location, device posture), the answer is **ABAC**, not MAC.",
  },
  LeastPrivilegeConcept: {
    name: "Least privilege",
    definition: "The fundamental security principle whereby every user receives only the permissions and privileges strictly necessary to perform their job.",
    details: "How the principle of Least Privilege works:\n* **Reduced Attack Surface:** It prevents the compromise of a single ordinary user account from giving the attacker administrative root privileges over the entire network.\n* **Damage Limitation:** It minimizes the impact of accidental human error or deliberate malicious actions by insiders.\n* **Rigorous Application:** It requires the separation of accounts (e.g. an administrator uses a normal account to read email and an admin account only when they need to make critical changes).\n\n* **Focused Mini-Example:** A network technician accesses the mail server to read their own email using an ordinary account without administrator privileges. When they need to update the mail server's security rules, they log out and log in with a separate, time-limited administrator account, reducing exposure.",
    examTip: "Least Privilege proactively limits the damage resulting from compromised accounts or insider threats by ensuring that every user receives only the strictly necessary permissions.",
  },
  NeedToKnowConcept: {
    name: "Need to Know",
    definition: "A security principle whereby, even with the correct authorizations, one accesses only the information needed to perform one's specific job.",
    details: "How the Need to Know principle works:\n* **Granular Control:** It provides that possessing a security level (e.g. a clearance) does not automatically give access to all the data at that level.\n* **Work-Related Necessity:** The user must demonstrate a specific operational need in order to consult a given sensitive file or document.\n* **Countering Data Leaks:** It prevents the mass consultation of confidential archives by personnel not directly involved in the relevant projects.",
    examTip: "**The comparison the exam tests, need-to-know versus least privilege:** **least privilege** is about what you can **do** â€” the permissions your account holds on systems; **need-to-know** is about which **information** you may see, and it applies **even where the formal authorization is already there**. **A concrete example:** an analyst with *secret* clearance is formally cleared to read any *secret* document, but may open only those for the case they are working on. Clearance opens the door of the room; need-to-know decides which files on the table concern you.",
  },
  JustInTimeConcept: {
    name: "Just-In-Time (JIT)",
    definition: "A security approach in which administrative and elevated privileges are granted only for the time strictly necessary to perform the task.",
    details: "Characteristics of Just-In-Time (JIT) access:\n* **Temporary Privileges:** Users normally operate with low-privilege accounts. When the need to perform administrative tasks arises, they request temporary elevated privileges.\n* **Automatic Expiration:** Once the pre-established time has elapsed (e.g. 1 or 2 hours), the privileges expire automatically.\n* **Risk Reduction:** It minimizes the time window in which an account with broad privileges can be compromised or abused.",
    examTip: "**JIT answers the question *when and for how long*:** the privilege does not exist until it is requested, is granted for a short window, and **expires on its own**. It removes standing administrative accounts, which are the most valuable target any attacker has. **Exam trap:** do not confuse JIT with **JEA**, which answers *how much power*. They are independent axes and are used together: JIT without JEA gives full powers for half an hour; JEA without JIT gives limited powers forever.",
  },
  JustEnoughAdministrationConcept: {
    name: "Just-Enough Administration (JEA)",
    definition: "A principle and technology that allow only the minimum indispensable privileges to be granted to perform a specific task.",
    details: "Characteristics of Just-Enough Administration (JEA):\n* **Role and Command Limitation:** JEA allows administration to be delegated by limiting users to executing only specific commands, cmdlets or scripts.\n* **Non-Admin Administration:** It avoids granting full machine administrator rights to those who only need to perform limited routine operations (e.g. restarting a print service).\n* **Traceability:** It makes it extremely simple to monitor and record every single action performed in protected administrative sessions.",
    examTip: "**JEA answers the question *how much power*:** instead of handing over a full administrator account, the **individual commands** that task needs are authorized â€” restart that service, read that log â€” and nothing else. **Exam trap:** the other axis is **JIT**, which is about *for how long*. **JEA** limits the **breadth** of the privilege, **JIT** its **duration**; both are applications of least privilege, and a robust configuration combines them.",
  },
  ImplicitDenyConcept: {
    name: "Implicit deny",
    definition: "A basic security principle in which any access or communication that is not explicitly allowed is automatically blocked by default.",
    details: "The concept of Implicit Deny:\n* **Secure by Default:** Rather than listing what must be forbidden (blacklist), a rigid list of what is explicitly authorized (whitelist) is defined; everything else is rejected.\n* **Network Application:** In firewalls and network ACLs, it corresponds to the final invisible 'Deny All' (or 'Drop Any') rule that blocks all traffic not matching the previous rules.\n* **Gap Prevention:** It protects the system from omissions or oversights by the programmer or network administrator.\n\n* **Focused Mini-Example:** When configuring a corporate firewall, the administrator enables only TCP ports 80 and 443 for web traffic and TCP port 22 for SSH. Because the firewall applies Implicit Deny at the end of the rule list, any other connection attempt on different ports is automatically rejected.",
    examTip: "Implicit Deny ensures that everything not explicitly authorized is blocked by default, representing the cornerstone rule underlying firewalls and access control lists.",
  },
  MFA_SSO_Federation: {
    name: "MFA, SSO & Identity Federation",
    definition: "Multi-factor authentication, Single Sign-On and identity federation technologies across different domains.",
    details: "The three pillars for guaranteeing modern, secure and user-friendly access in the corporate environment:\n* **MFA (Multi-Factor Authentication):** Requires the convergent use of at least two or more distinct authentication factors chosen from:\n  - *Something you know:* password or PIN.\n  - *Something you have:* smart card, hardware token or app with OTP codes.\n  - *Something you are:* fingerprint, iris, facial recognition (biometrics).\n  - *Somewhere you are:* GPS location, IP address or originating network. *(These four are the factors listed by objective 4.6; the older* Something you do *- typing rhythm, signature dynamics - belonged to the attributes of the previous exam version and is not among the SY0-701 factors.)*\n* **SSO (Single Sign-On):** Allows the user to authenticate only once and access multiple corporate applications and servers without having to re-enter credentials at each step.\n* **Identity Federation:** Extends the concept of SSO beyond the company's boundaries, allowing domains and portals of distinct organizations to trust each other's identities (IdP - Identity Provider vs SP - Service Provider).\n* **Standard Federated Protocols:** SAML (XML-based for enterprise), OAuth 2.0 (an **authorization** framework, not an authentication one: it delegates access to a resource without handing over the password. Its access tokens may be opaque or structured, and **need not be JWTs**) and OIDC (OpenID Connect, an authentication layer built on top of OAuth 2.0).\n\n* **Focused Mini-Example:** An employee connects in the morning and logs in by entering a password and fingerprint on the centralized corporate portal (**MFA**). From that moment, thanks to **SSO**, they can navigate between the cloud sales application (Salesforce) and the external payroll portal (**Federation** through the SAML protocol) without having to type any additional credentials.",
    examTip: "Identity federation is based on a trust relationship established in advance between the Identity Provider (IdP), which actually authenticates the user, and the Service Provider (SP), which provides the final application.",
  },
  PasswordPoliciesAccount: {
    name: "Password Policies & Account Management",
    definition: "Administrative and technical rules for protecting credentials and controlling the account lifecycle.",
    details: "Security measures aimed at preventing credential theft and rigorously controlling the identity perimeter:\n* **Password Policies:** set an **adequate length** (long passphrases beat complexity), **screen new passwords against compromised or common-password lists**, allow password managers, and lock the account after too many failed attempts. **Two points where industry material has fallen behind:** **NIST SP 800-63B does not recommend** either mandatory character-class mixtures or **arbitrary periodic expiry**, because both push users towards predictable patterns (`Password1!`, `Password2!`). A change should be required **on evidence of compromise**. A company policy may still mandate complexity and expiry, but they should not be presented as recommendations of the standard.\n* **Privilege Creep:** The phenomenon whereby an employee accumulates excess permissions over the years by changing roles within the company. It is countered through periodic access reviews (User Access Reviews).\n* **Account Types:** Separation of standard user accounts from those with elevated administrative permissions (Privileged Accounts/Root) and from service accounts (Service Accounts) used by automated software.\n\n* **Focused Mini-Example:** A programmer is promoted to department manager. The security team performs a User Access Review and discovers that the employee still has write permissions on the source code of the old projects. The team promptly revokes the old obsolete permissions, averting the risk of 'Privilege Creep'.",
    examTip: "To avoid 'Privilege Creep' and ensure the application of the least-privilege principle, the organization must implement periodic formal access reviews (User Access Reviews) and revoke old permissions that are no longer needed.",
  },
  LDAPProtocol_New: {
    name: "LDAP",
    definition: "Lightweight Directory Access Protocol: an open standard protocol used to query, authenticate and manage information about users and resources in a central directory database.",
    details: "Main characteristics:\n* **Hierarchical Structure:** It organizes objects (users, computers, printers, groups) in a logical tree made up of organizational units (OU), domains (DC) and distinguished names (DN).\n* **Integration with Active Directory:** Microsoft Active Directory relies on LDAP as its main protocol to allow servers and clients to search for and authenticate identities in the domain.\n* **LDAPS (LDAP Secure):** The encrypted variant that uses **TLS** (standard TCP port 636) to protect credentials and data that would travel in the clear on port 389. Alternatively you can use **StartTLS**, which upgrades the connection on port 389 to an encrypted one. *(SSL is deprecated: on the exam the correct answer is always TLS.)*",
    examTip: "To secure queries and user credentials sent to a directory service, disable cleartext LDAP (port 389) and implement LDAPS (TCP port 636) encrypted with TLS, or StartTLS on port 389. SSL is deprecated: on the exam the correct answer is always TLS.",
  },
  MFAConcept_New: {
    name: "MFA",
    definition: "Multi-Factor Authentication (MFA): a security process that requires the convergent use of two or more independent authentication factors belonging to different categories to verify the user's identity.",
    details: "Objective 4.6 lists **four** factors, all on the same footing:\n* **Something you know:** Memorized information (e.g. password, PIN or answers to security questions).\n* **Something you have:** Physical possession of an object (e.g. smart card, USB/NFC hardware token, OTP codes generated by an app on the phone).\n* **Something you are:** The user's biometric or physiological parameters (e.g. fingerprint, iris scan, facial recognition or voice patterns).\n* **Somewhere you are:** the location the request comes from, derived from GPS geolocation, IP address or originating network. It is a full factor in the SY0-701 objectives, not an accessory.\n* **A note on terminology:** older material also mentions *Something you do* (typing rhythm, signature dynamics). It belonged to the *attributes* of the previous exam version and **does not appear among the SY0-701 factors**: recognise it, but do not expect it as a correct answer.\n\n* **Focused Mini-Example:** To access the corporate VPN, a system administrator enters their personal password (**Something you know**) and inserts the YubiKey hardware key into their laptop (**Something you have**). Passing both independent checks constitutes true **MFA** authentication.",
    examTip: "To qualify as true MFA at the exam, the factors provided must strictly belong to **distinct categories**: two passwords are not MFA, password + fingerprint is. **Exam trap:** the SY0-701 factors are **four** - *something you know*, *something you have*, *something you are*, *somewhere you are* - and the last one counts as much as the other three: if the scenario describes a check based on geographic location, the answer is *somewhere you are*, not \"none of the above\".",
  },
  MFAImplementationsTokens: {
    name: "Hard token, Soft token & Security key",
    definition: "The concrete forms the 'something you have' factor takes: a dedicated hardware token, a software token on a shared device, or a FIDO2/WebAuthn cryptographic security key.",
    details: "All three belong to the same factor (**something you have**), but they offer very different guarantees:\n* **Hard token:** a dedicated physical object that generates OTP codes (time-based TOTP or counter-based HOTP) or signs a challenge. It is not connected to the internet and hosts no other applications, so malware on a phone cannot reach it. It costs money, has to be distributed, gets lost and has a battery.\n* **Soft token:** an authenticator app on a phone or PC that generates the same kind of code, or a push notification to approve. Near-zero cost and immediate rollout, but it shares the fate of the device: if the phone is compromised, or the user habitually approves a prompt that is not theirs (**MFA fatigue**, or push bombing), the factor collapses.\n* **Security key (FIDO2/WebAuthn):** a USB/NFC key holding a cryptographic key pair that signs a challenge **bound to the site's domain**. It is the only one of the three that is **phishing-resistant**, because there is no code to type and hand to a fake site: if the domain does not match, the key simply does not sign.\n* **A note on SMS:** SMS OTP is the weakest of all and is discouraged by NIST SP 800-63B, being vulnerable to **SIM swapping** and to interception on the telephone network. On the exam it is the factor to rule out whenever the question asks for the most secure option.\n\n* **Focused Mini-Example:** an attacker builds a site identical to the corporate portal. The user with a **soft token** reads the code from the app and types it into the fake site: the attacker relays it in real time to the genuine portal and gets in. Had the same user held a **security key**, there would have been nothing to type, and the key would not sign for a domain other than the registered one: the attack fails without the user having to notice anything.",
    examTip: "Rank MFA implementations by strength: **SMS OTP** (weakest, SIM swapping) < **soft token** (OTP app or push, vulnerable to MFA fatigue and real-time phishing) < **hard token** (dedicated device, isolated from the phone) < **FIDO2/WebAuthn security key** (phishing-resistant by construction). When a scenario describes users fooled by a cloned portal or bombarded with push prompts, the correct answer is the **security key**, not another kind of OTP.",
  },
  FederationConcept: {
    name: "Federation",
    definition: "Identity Federation: a system that links the identity management systems of different organizations or domains, allowing users to use the same credentials to access multiple external networks or applications.",
    details: "Main characteristics:\n* **Mutual Trust:** It is based on a preconfigured trust relationship between an Identity Provider (IdP) and a Service Provider (SP).\n* **Cross-Domain SSO:** It enables Single Sign-On beyond corporate boundaries, eliminating the need to create separate accounts for each partner or external SaaS application.\n* **Open Standards:** Commonly implemented through protocols such as SAML 2.0 (enterprise) or OpenID Connect (OIDC, consumer/cloud).\n\n* **Focused Mini-Example:** An employee of a partner company accesses the customer portal of an external bank. Because a **Federation** through SAML is configured between the company and the bank, the browser redirects the user to the company's authentication server, which validates the identity and sends the user back to the bank already authenticated, without sharing the password.",
    examTip: "Identity federation extends Single Sign-On (SSO) beyond corporate boundaries through standard protocols such as SAML or OIDC and bilateral trust relationships.",
  },
  GeographicNetworkRestrictions: {
    name: "Geographic & Network Location Restrictions (Geofencing)",
    definition: "The restriction of logical or physical access based on the device's geographic location, the network it belongs to, or radio/GPS signals.",
    details: "These controls validate the contextual authentication factor **Somewhere you are**:\n* **Geographic Restrictions:** Criteria that allow or block access to systems based on the nationality or geographic region from which the connection originates (e.g. blocking login attempts from countries where the company has no operations).\n* **Network Location:** The logical distinction between connections coming from the internal corporate private network (trusted LAN/WLAN) and connections coming from outside (public Internet or guest networks).\n* **IP Subnet:** The logical division of an IP network address into smaller blocks to isolate sensitive corporate departments (e.g. isolating the finance department's subnet from the general offices' subnet).\n* **Geolocation:** The estimation of the device's real physical position through databases of public IP addresses, cell-tower IDs or the BSSIDs of nearby Wi-Fi networks.\n* **GPS (Global Positioning System):** Satellite technology integrated into mobile devices to determine the user's geographic coordinates (latitude and longitude) with maximum precision in real time.\n* **802.11 (Wi-Fi Standard):** The standard for local wireless networks; connecting to a specific 802.11 Access Point or the presence of its SSID/BSSID certifies the user's presence inside the building.\n* **IP Address:** The unique numeric identifier of the network node, used to validate the origin of the request and apply whitelist rules (e.g. allowing access to the administration panel only from static corporate IPs).\n* **Geofencing:** The creation of a virtual perimeter around a real geographic area (e.g. the data center perimeter). If the user leaves that area (detected through GPS, 802.11 or mobile network), access is revoked or an additional MFA validation is requested.",
    examTip: "On the exam, Geofencing and Network Location restrictions based on IP Subnet or GPS are used to strengthen contextual authentication (ABAC/Zero Trust) by validating the 'Somewhere you are' factor in real time to block external attacks at their inception.",
  },
  TimeOfDayRestrictions: {
    name: "Time-of-day restrictions",
    definition: "An access control that permits use of an account or a resource only within predefined time windows, denying it outside them.",
    details: "**Time-of-day restrictions** add the **time** dimension to the authorization decision:\n* **How they work:** the policy defines the permitted windows (Monday to Friday, 07:00-20:00 in the office time zone, say) and denies access outside them. They can act at login, or terminate an already-open session when the window closes.\n* **What they are for:** they shrink the **temporal attack surface**. Stolen credentials are typically used at night or at the weekend, when nobody is watching; if the account cannot authenticate during those hours, the theft loses much of its value.\n* **Where they typically apply:** service accounts (which run batch jobs at known times), shift workers, outside suppliers with temporary access, and highly privileged accounts.\n* **Mind the time zone:** the rule must state which time zone it is expressed in, or it will lock out legitimate staff abroad or leave an unintended window open.\n\n* **Focused Mini-Example:** a retail chain lets cashiers sign in to the point-of-sale system only between 08:00 and 21:00 on trading days. An attacker who phishes a cashier's password tries it at 03:00 on a Sunday: access is denied, and the attempt raises an alert that would otherwise have gone unnoticed.",
    examTip: "Time-of-day restrictions are a **preventive** control and belong to the access control methods of objective 4.6, alongside MAC, DAC, RBAC, ABAC and least privilege. Pair them mentally with **geographic restrictions** (geofencing): both deny access based on **context** - *when* in one case, *where* in the other - and they are the two contextual attributes that ABAC and Zero Trust evaluate most often.",
  },
  PermissionRestrictions: {
    name: "Permission Restrictions (ACL, RBAC, Least Privilege)",
    definition: "Logical security measures that rigidly and granularly define and enforce the operations users are allowed to perform on system resources.",
    details: "Permission restrictions ensure that identities cannot perform malicious or unauthorized actions:\n* **Permission Restrictions:** The application of constraints that specify which files, directories, databases or software features a subject can view, create, modify or delete.\n* **ACL (Access Control List):** Lists that granularly map user or group identifiers to their access rights (Read, Write, Execute) directly on File System objects or network nodes (Firewall ACL).\n* **RBAC (Role-Based Access Control):** A model that aligns permissions with organizational roles or employees' job functions (e.g. 'HR Manager'), avoiding the manual configuration of individual permissions for each user.\n* **Least Privilege:** The golden rule of cybersecurity that requires assigning to each user and process only the minimum indispensable set of privileges needed to complete the active task, drastically reducing the blast radius in case of compromise.",
    examTip: "On the exam, the rigorous application of Least Privilege supported by file-system-level ACLs and structured RBAC roles prevents privilege creep and neutralizes insider threats.",
  },
  },

  /* ================= Domain 2 ================= */
  2: {
  /* ---- Group 1: Threat Actors ---- */
  NationStateActor: {
    name: "Nation State",
    definition: "Government-sponsored actors with almost unlimited financial and expert resources.",
    details: "Nation State actors act on behalf of national governments:\n* **Objectives:** Industrial and geopolitical espionage, theft of military secrets, sabotage of critical infrastructure (SCADA/ICS).\n* **Methodology:** They conduct APT (Advanced Persistent Threat) campaigns that stay silent and embedded for months or years.\n* **Capabilities:** They develop exclusive Zero-Day exploits and have advanced cryptographic research labs.\n\n* **Focused Mini-Example:** A government APT group penetrates the systems of a national energy provider by exploiting a zero-day, installing a backdoor firmware on the PLCs to monitor the power grid and be able to disable its turbines in the event of a geopolitical conflict.",
    examTip: "For exam questions about actors with extreme persistence, advanced tools and state-level budgets, the correct answer is always the Nation State (or APT).",
  },
  InsiderThreatActor: {
    name: "Insider Threat",
    definition: "Anyone who holds or held legitimate access â€” employees, former employees, contractors, business partners â€” and causes harm to the organization through that access, whether deliberately or by mistake.",
    details: "Insider threats are particularly insidious:\n* **Advantage:** They already know the network structure, the sensitive data and the security procedures.\n* **Types:**\n  - *Malicious Insider:* Acts intentionally for revenge, gain or espionage.\n  - *Negligent Insider:* Causes incidents through carelessness, poor training or failure to follow policies.\n* **Mitigations:** Separation of Duties, Job Rotation, and rigorous log monitoring.\n\n* **Focused Mini-Example:** An angry employee in the finance department downloads the entire salary database and sends it to a journalist to take revenge for a missed promotion.",
    examTip: "**Exam trap:** the category is not the same as the disloyal employee. Objective 2.1 covers both the **malicious** insider (acting out of revenge, for profit or on someone else's behalf) and the **unintentional** insider, which is by far the more common case: the person who clicks the link, who takes an archive home on a USB stick to work at the weekend, who leaves a cloud bucket open. What they share is **legitimate access**, not intent, and that is precisely why perimeter controls do not see them.\n\nThe countermeasures follow the distinction: against the malicious insider, **least privilege**, **separation of duties**, **job rotation** and periodic access reviews; against the unintentional one, **training**, **DLP** and secure defaults. **Prompt deprovisioning** works against both, and the former employee whose credentials still work is the scenario the exam raises most often.",
  },
  OrganizedCrimeActor: {
    name: "Organized Crime",
    definition: "Structured, professional criminal groups motivated primarily by financial profit.",
    details: "Organized cybercrime operates like a real industry:\n* **Business Model:** Ransomware-as-a-Service (RaaS), multiple extortion, large-scale theft of financial data, mass phishing.\n* **Structure:** They have developers, IT infrastructure administrators, ransom negotiators and even help desks to assist victims in paying the ransoms.\n\n* **Focused Mini-Example:** A Russian criminal group buys a ransomware payload on the dark web, hits a private hospital's network by encrypting its medical records and demands 2 million dollars in Bitcoin not to publish the sensitive data online.",
    examTip: "If the primary motivation of the described attack is Financial Gain through ransomware or fraud, the actor is Organized Crime.",
  },
  HacktivistActor: {
    name: "Hacktivist",
    definition: "Attackers driven by ideological, political, social or religious motivations.",
    details: "Hacktivists use technology to express dissent or promote a cause:\n* **Common techniques:** Defacement of institutional websites, DDoS attacks to make public portals inaccessible, exfiltration and publication of confidential data (leaks) to expose alleged illicit behavior.\n* **Known groups:** Anonymous is the most famous historical example.\n\n* **Focused Mini-Example:** A group of environmental activists launches a massive DDoS attack against the website of an oil multinational to protest against new drilling, taking the company's e-commerce portal offline for 48 hours.",
    examTip: "The key on the exam to identifying a Hacktivist lies in the motivation: promoting a social/political cause, not financial gain.",
  },
  ScriptKiddieActor: {
    name: "Unskilled Attacker (Script Kiddie)",
    definition: "Attackers with poor technical skills who use ready-made tools and scripts written by others.",
    details: "Script Kiddies lack deep knowledge of how exploits work:\n* **Resources:** They download free toolkits or buy illegal services on the dark web.\n* **Motivations:** They often act out of boredom, to gain notoriety within their circle of friends, or for pure digital vandalism.\n* **Danger:** Although unsophisticated, they can cause real damage to unprotected systems or ones lacking basic patches.\n\n* **Focused Mini-Example:** A teenager downloads an automatic scanning and exploit tool for known vulnerabilities and hits their local school's website, causing it to temporarily crash to show off on a Discord server.",
    examTip: "Relying solely on other people's tools without understanding the underlying code characterizes this profile. **Mind the name:** the SY0-701 objectives call it the **unskilled attacker**; *script kiddie* is the historical term, still common in the field but not the one you will find among the exam options.",
  },
  CompetitorActor: {
    name: "Competitor",
    definition: "Rival companies that resort to illicit digital means to gain an unfair competitive advantage.",
    details: "Competitors' actions focus on corporate espionage:\n* **Actions:** Theft of patents, industrial plans, chemical formulas, source code or customer lists.\n* **Damage:** They may attempt to sabotage the rival company's systems during a crucial product launch to damage its reputation.\n\n* **Focused Mini-Example:** A car company hires an external hacker to infiltrate a direct competitor's CAD servers and steal the designs of the new electric motor before it is patented.",
    examTip: "The exfiltration of proprietary or industrial information for the direct benefit of a competing company defines this actor.",
  },
  ShadowITActor: {
    name: "Shadow IT",
    definition: "The use of IT resources - applications, cloud services, devices - without the IT department's approval or visibility; it can expose data directly and widen the attack surface.",
    details: "Shadow IT is not a hostile actor but an **organisational condition**, and that is precisely why the objectives list it among threat vectors:\n* **Why it arises:** almost always from good intentions. The official tool is slow, a feature is missing, the approval process drags: the department improvises. Simply banning it does not work, because it drives the practice further into the shadows.\n* **What it costs:** whatever IT does not know exists is not patched, does not appear in vulnerability scans, sends no logs to the SIEM, and sits outside backups and the incident response plan.\n* **The harm can be direct:** no attacker is needed. Uploading a confidential document to an unapproved service is already a loss of control over the data and, often, a compliance breach.\n* **How to tackle it:** first **discover** (CASB, outbound traffic analysis, asset and expense inventory), then **channel** it by offering approved alternatives that solve the real need behind it.\n\n* **Focused Mini-Example:** the marketing team, tired of waiting for approval of a project-management tool, signs up for a free one on their own cards and uploads the product launch plan to it. Nobody acts in bad faith, but the plan now lives on a service the company does not control, under accounts that will outlive the people who created them.",
    examTip: "Shadow IT creates risk **regardless of the adopter's intent**. **Exam trap:** separate the **structural effect** - a wider attack surface and lost visibility, always true - from the possible **consequences**: data leakage, penalties, unavailability. And do not confuse it with **insider threat**: a malicious insider means to harm the company, whereas a Shadow IT user normally just wants to get work done, even though the risk they create is real.",
  },
  BloatwareConcept: {
    name: "Bloatware",
    definition: "Unnecessary or unwanted preinstalled software that consumes resources and may broaden the attack surface; it is not necessarily malicious.",
    details: "**Bloatware** usually arrives preinstalled by the device manufacturer or bundled during another installation:\n* **Why it is a security problem, not just a performance one:** it is **extra software nobody asked for and nobody patches**. It often runs with elevated privileges, ships its own updater component, and widens the attack surface while delivering no value.\n* **It is not malware:** the difference is **intent**. Malware is written to do harm; bloatware is normally legitimate software that is simply useless to the user. Some cases sit in between (adware, telemetry-gathering components), but the category itself implies no malice.\n* **How to tackle it:** removal at **provisioning** time, using a clean corporate image (*golden image*) rather than the manufacturer's install, plus periodic review of installed software against the approved baseline.\n\n* **Focused Mini-Example:** a batch of laptops ships with the manufacturer's driver-update utility, which runs as a system-privileged service and downloads packages over its own channel. Years later a flaw in that utility allows code execution as administrator: nobody ever used it, but it was on every machine.",
    examTip: "**Exam trap:** bloatware is **unwanted, not necessarily malicious** - if a question describes useless preinstalled software, the answer is bloatware, not malware. The mitigation the exam expects is **removing unnecessary software** during hardening, ideally starting from a corporate baseline rather than the manufacturer's image.",
  },

  /* ---- Group 2: Motivations ---- */
  FinancialGainMotiv: {
    name: "Financial Gain",
    definition: "The pursuit of direct or indirect monetary profit through illicit activities.",
    details: "It is by far the most common motivation in the digital age:\n* **Mechanisms:** Ransomware ransom demands, sale of credit-card numbers or medical records on the dark web, theft of cryptocurrency from exchanges, or fraudulent transfer of funds (Business Email Compromise - BEC).\n\n* **Focused Mini-Example:** A criminal group sends a spear phishing email pretending to be the CEO and convinces the administrative staff to make an urgent transfer of â‚¬50,000 to an untraceable foreign account.",
    examTip: "Financial gain dominates scenarios linked to organized crime.",
  },
  EspionageMotiv: {
    name: "Espionage",
    definition: "The systematic theft of confidential, military, state or industrial information without being detected.",
    details: "Espionage aims to gather long-term intelligence:\n* **Characteristics:** The attacker wants to stay hidden as long as possible (low profile). If they destroyed the systems, they would be discovered immediately.\n* **Subjects:** Carried out predominantly by Nation-States for military/geopolitical purposes or by large competing companies.\n\n* **Focused Mini-Example:** A state-sponsored hacker installs a low-profile persistent malware on the servers of an aerospace company, exfiltrating over six months the confidential designs of a new military radar system without altering any service.",
    examTip: "In espionage the objective is the Confidentiality of the data, while the Integrity and Availability of the systems are usually not altered in order not to arouse suspicion.",
  },
  RevengeMotiv: {
    name: "Revenge",
    definition: "The desire for retaliation and to cause reputational or material damage in response to a perceived wrong.",
    details: "Revenge is the typical motivation of insider threats:\n* **Examples:** A system administrator who is fired and activates a programmed Logic Bomb, or a dissatisfied employee who deletes critical databases before leaving.\n* **Damage:** Often aimed at altering the Availability or Integrity of corporate systems.\n\n* **Focused Mini-Example:** A system administrator fired on the spot, before their accounts are deactivated, connects via VPN and destroys the main tables of the company's production database to damage corporate revenue.",
    examTip: "In revenge-motivated attacks, the person typically has a prior or ongoing relationship with the victim.",
  },
  IdeologyMotiv: {
    name: "Ideology",
    definition: "The drive to carry out attacks to support political, ecological, ethical or religious ideals.",
    details: "Ideology drives hacktivists and digital protest groups:\n* **Examples:** Attacks against oil companies by climate activists, or breaches of government sites during political elections to protest against censorship.\n* **Objective:** To draw media attention to a specific cause.\n\n* **Focused Mini-Example:** A collective of hacktivists penetrates the website of a pharmaceutical company and publishes the list of animal testing to raise public awareness against the exploitation of wildlife.",
    examTip: "If the attack yields no financial profit but aims to raise public awareness on an ethical topic, the motivation is ideology.",
  },
  ChaosMotiv: {
    name: "Chaos",
    definition: "The pure destructive will to generate disorder, disruption or instability without any further aim.",
    details: "Attacks carried out to demonstrate power or for simple nihilistic amusement:\n* **Examples:** Releasing a destructive worm onto the internet to see how far it can spread, or carrying out random DDoS attacks against popular websites.\n* **Actors:** Often associated with Script Kiddies or anarchist groups.\n\n* **Focused Mini-Example:** A group of amateur programmers spreads a destructive virus on the web that randomly deletes Windows configuration files, with the sole purpose of sowing panic among users worldwide.",
    examTip: "Chaos directly targets the annihilation of Availability and the disruption of services, without ransom demands.",
  },

  /* ---- Group 3: Threat Vectors & Attack Surfaces ---- */
  ThreatVectorsDetails: {
    name: "Threat Vectors",
    definition: "The channels or paths used by threat actors to access or compromise a system.",
    details: "Common threat vectors include:\n* **Email (Phishing):** One of the most used vectors; the user receives deceptive emails to install malware or steal credentials.\n* **Wireless:** Exploiting vulnerabilities in Wi-Fi (weak WPA2, Rogue AP) or Bluetooth (Bluejacking, Bluesnarfing).\n* **Removable Media (USB):** Physical insertion of infected USB sticks to bypass network defenses and run payloads.\n* **Cloud:** Exploiting misconfigurations (e.g. open S3 buckets) or API credentials exposed on public repositories.\n* **Supply Chain:** Compromising a trusted third-party supplier to hit the final victim (e.g. the SolarWinds attack).\n* **Direct Access / Physical:** Direct physical access to servers, switches or unlocked workstations to steal data or install hardware keyloggers.\n* **Social Media:** Gathering information through OSINT or social-engineering lures to bait employees.\n\n* **Focused Mini-Example:** An attacker intentionally drops a USB stick labeled 'Employee Payslips' in the corporate parking lot. A curious employee picks it up, inserts it into their office PC and triggers a trojan malware.",
    examTip: "The Supply Chain is a subtle vector because it exploits the implicit trust a company places in the software or services of approved external partners.",
  },
  AttackSurfacesDetails: {
    name: "Attack Surfaces",
    definition: "The set of all vulnerable or exposed entry points where an attacker can attempt to breach a system.",
    details: "Attack surfaces are divided into:\n* **Software Attack Surface:** Exposed code, public APIs, active unpatched services, operating systems and open ports. It is reduced through hardening (disabling superfluous services, closing ports) and applying patches.\n* **Hardware Attack Surface:** Physical devices, vulnerable firmware (outdated BIOS/UEFI), exposed physical ports (Ethernet ports in public areas) or accessible USB ports.\n* **Physical Attack Surface:** The physical area of the company or the data centers (security doors, fences, unattended workstations).\n* **Human Attack Surface:** The organization's users and employees, who can be tricked through social engineering or make configuration errors.\n\n* **Focused Mini-Example:** A corporate server with Remote Desktop (RDP) ports exposed directly on the Internet without access restrictions and an unlocked physical switchboard in the hallway constitute two huge and obvious attack surfaces (software and physical).",
    examTip: "To reduce the software attack surface, the primary exam rule is to apply the least-privilege principle, perform systematic hardening and close all ports and services that are not strictly necessary.",
  },

  /* ---- Group 4: Malware ---- */
  VirusMalware: {
    name: "Virus",
    definition: "Malicious software that requires a host file and human action to be executed and spread.",
    details: "Characteristics of the virus:\n* **Infection:** It attaches to an executable program or a document (e.g. a macro in a Word file).\n* **Propagation:** It cannot spread by itself to other computers; it requires a user to actively move and open the infected file (e.g. via a USB stick or email).\n\n* **Focused Mini-Example:** A user receives an Excel file containing infected macros; the user enables macro execution, launching the virus code that infects all the `.exe` files on the machine.",
    examTip: "Remember the exam distinction: the Virus always requires user action to spread, whereas the Worm acts completely autonomously.",
  },
  WormMalware: {
    name: "Worm",
    definition: "Self-sufficient malicious software that spreads automatically over the network by exploiting service vulnerabilities.",
    details: "Characteristics of the worm:\n* **Independence:** It does not need a host file to attach to.\n* **Speed:** It can infect hundreds of thousands of computers in a few minutes by scanning the network looking for open ports and vulnerable services (e.g. WannaCry exploiting MS17-010 EternalBlue).\n* **Impact:** It consumes large amounts of network bandwidth and system resources.\n\n* **Focused Mini-Example:** The Conficker malware constantly scans the local subnet and spreads autonomously to other PCs on the corporate network without requiring any interaction from any user.",
    examTip: "Worms exploit network-software bugs to propagate automatically (self-replicating) without any human interaction.",
  },
  TrojanMalware: {
    name: "Trojan",
    definition: "An apparently harmless or useful program that hides a destructive payload or a backdoor.",
    details: "Deception mechanism:\n* **Example:** A user downloads a free game or a PC-optimization utility. On launch the software works normally, but in the background it installs a remote-control backdoor (RAT - Remote Access Trojan).\n* **Purpose:** To bypass perimeter controls by inducing the user to authorize the execution of the software.\n\n* **Focused Mini-Example:** A user downloads a cracked PDF editor. The program reads and edits files correctly, but in the background it opens the host's SSH port 2222 to allow the attacker to connect.",
    examTip: "The Trojan relies on the Trojan-horse technique: the user is deceived about the usefulness of the application.",
  },
  RansomwareMalware: {
    name: "Ransomware",
    definition: "Malware that encrypts the user's data and demands a payment in cryptocurrency to unlock it.",
    details: "Advanced ransomware techniques:\n* **Double Extortion:** In addition to encrypting the local files, the attacker exfiltrates the sensitive data before encryption. If the victim has backups and refuses to pay to decrypt, the attacker threatens to publish the sensitive data online.\n* **Triple Extortion:** It also includes DDoS attacks against the company or direct threats to the victim's customers.\n\n* **Focused Mini-Example:** An employee opens a malicious attachment; within seconds the corporate databases take on the `.encrypted` extension and a text file appears demanding 5 Bitcoin in exchange for the cryptographic key.",
    examTip: "The primary defense against ransomware is having an offline or immutable backup plan (not accessible from the ordinary network).",
  },
  RootkitMalware: {
    name: "Rootkit",
    definition: "Malware that operates at privileged level (root or system) and whose defining function is to **conceal itself and the attacker's activity** from the operating system and the security tooling, maintaining access over time.",
    details: "Depth of infiltration:\n* **How it works:** It modifies the operating system's System Calls. If an antivirus asks for the list of active processes, the rootkit intercepts the request and removes itself from the list before sending it.\n* **Level:** It often operates at the kernel or firmware (UEFI) level, making detection almost impossible with standard software tools running on the same operating system.\n\n* **Focused Mini-Example:** A kernel-level rootkit intercepts the antivirus's file-exploration queries, hiding the folder where its malicious binary files reside.",
    examTip: "**The point the exam tests:** a rootkit does not usually **gain** privileges, it **keeps and hides** them. An exploit or a stolen credential obtained them; the rootkit arrives afterwards and exists to stay. Hence the practical consequence: a compromised system **cannot investigate itself**, because the rootkit intercepts the very calls the antivirus would use to look for it, and the operating system reports whatever the rootkit lets it see. That is why the disk is examined from a **clean external boot medium**, and why for deeper rootkits (bootkits, firmware) the only reliable route is **reinstallation from a certified image**, not disinfection.",
  },
  SpywareMalware: {
    name: "Spyware",
    definition: "Software that secretly collects information about a user's activities without their consent.",
    details: "Data collected by spyware:\n* Web browsing history, typed banking credentials, screen screenshots or webcam usage.\n* It is often installed bundled with freeware or through drive-by download attacks on compromised sites.\n\n* **Focused Mini-Example:** An adware software installed surreptitiously records the user's online shopping sessions and sends their purchase preferences to external advertising servers.",
    examTip: "Spyware specifically aims to compromise the Confidentiality of personal information.",
  },
  KeyloggerMalware: {
    name: "Keylogger",
    definition: "A hardware device or software program designed to record every single key pressed on the keyboard.",
    details: "Types:\n* **Software Keylogger:** Captures keyboard input at the driver or operating-system API level and periodically sends it to a server controlled by the attacker.\n* **Hardware Keylogger:** A small physical connector inserted between the USB keyboard cable and the computer port, totally invisible to ordinary antivirus software.\n\n* **Focused Mini-Example:** A small USB dongle inserted between the keyboard and the administrative staff's computer stores offline every single credential combination typed in the clear.",
    examTip: "Keyloggers are used mainly to steal passwords and corporate credentials during typing.",
  },
  LogicBombMalware: {
    name: "Logic Bomb",
    definition: "Malicious code intentionally inserted into a program that remains dormant until a specific condition occurs.",
    details: "Trigger factors:\n* **Date/Time (Time Bomb):** For example, programmed to activate on Friday the 13th or on a contract's expiration date.\n* **Logical action:** The absence of a certain record in the database (e.g. if the user 'Mario Rossi' is deleted from the employee registry, the logic bomb wipes the entire server).\n\n* **Focused Mini-Example:** A programmer leaves in the backend code a routine that deletes the system logs and databases if their tax code is removed from the payroll database list.",
    examTip: "Logic bombs are typically created by malicious insiders (angry programmers or system administrators).",
  },

  /* ---- Group 5: Social Engineering ---- */
  PhishingSE: {
    name: "Phishing",
    definition: "Mass sending of deceptive emails containing malicious attachments or links to counterfeit websites.",
    details: "Phishing variants:\n* **Generic Phishing:** Broadcast sending with no personalization.\n* **Spear Phishing:** Attack targeted at a specific individual or company, personalized with real data (e.g. citing the manager's name or a real company project).\n* **Whaling:** Spear phishing targeted exclusively at high-level executives (CEO, CFO) to authorize large money transfers.\n\n* **Focused Mini-Example:** An administrative employee receives an email apparently coming from the corporate CFO (**Whaling**) requesting the urgent settlement of an overdue invoice to a fake foreign supplier, attaching an infected PDF form.",
    examTip: "A fraudulent email specifically addressed to the Chief Financial Officer to have them sign an urgent transfer is called Whaling.",
  },
  SmishingSE: {
    name: "Smishing",
    definition: "Phishing conducted through SMS messages or mobile messaging apps.",
    details: "It exploits the high open rate of messages on mobile phones:\n* **Examples:** Counterfeit SMS that appear to come from banks, postal services or express couriers (e.g. 'Package blocked, click here to pay the customs fee').\n* **Danger:** Users tend to trust their smartphone more than email.\n\n* **Focused Mini-Example:** A technician receives an SMS on the corporate phone from sender 'IT Department' (**Smishing**) stating that their account is suspended and providing a link to confirm the login credentials.",
    examTip: "Smishing = SMS + Phishing.",
  },
  VishingSE: {
    name: "Vishing",
    definition: "Phishing conducted through phone calls or interactive voice systems.",
    details: "The attacker uses the voice to create urgency:\n* **Technique:** They can use VoIP technology to falsify the caller ID (Caller ID Spoofing) making the real bank's or IT support's number appear.\n* **AI Voice Cloning:** Recent use of voice deepfakes to perfectly imitate the voice of the company's CEO.\n\n* **Focused Mini-Example:** An operator receives a VoIP call in which a fraudster, perfectly simulating the CEO's voice through artificial intelligence (**Vishing**), orders them to bypass procedures and send the not-yet-public financial statements.",
    examTip: "Vishing = Voice + Phishing.",
  },
  PretextingSE: {
    name: "Pretexting",
    definition: "Creating a fictitious or credible pretext before the attack to induce the victim to cooperate.",
    details: "How it works:\n* The attacker does not ask for the data right away, but builds a solid story. For example, they call pretending to be a fraud investigator or a census office worker, first asking routine questions and then extracting confidential access data.\n\n* **Focused Mini-Example:** An attacker phones the front desk pretending to be a network technician of the national telephone operator engaged in a line check. They ask trivial questions about connectivity and then get the router-panel access credentials dictated to them.",
    examTip: "Pretexting is the preparatory phase of creating the fictitious scenario that lends legitimacy to the attacker's subsequent requests.",
  },
  ImpersonationSE: {
    name: "Impersonation",
    definition: "Actively passing oneself off as another physical person or as an authoritative role.",
    details: "Practical examples:\n* Physically showing up at the company entrance dressed as a courier with boxes in hand to get the back door opened.\n* Phoning while posing as the vice president or an external IT support technician to order a password reset.\n\n* **Focused Mini-Example:** An attacker shows up at the company premises wearing an electrician's uniform, showing a fake badge and carrying a toolbox. They say they need to check an electrical panel in the server room and manage to be given direct physical access.",
    examTip: "Impersonation leverages the principles of Authority and Social Proof to bypass physical or logical controls.",
  },
  WateringHoleSE: {
    name: "Watering Hole",
    definition: "Compromising a legitimate third-party website habitually frequented by the attack's target group.",
    details: "The oasis-in-the-desert metaphor:\n* Instead of directly attacking the fortified network of the Ministry of Defense, the attacker infects a local discussion forum or a catering site located opposite the Ministry and frequented by its employees.\n* When the employees visit that site, their browsers are infected through silent web exploits.\n\n* **Focused Mini-Example:** An APT group compromises the menu attachment on the portal of the favorite restaurant of a high-tech multinational's programmers, infecting the employees' PCs as soon as they download the list of the day's dishes.",
    examTip: "If a specific group of employees is infected by visiting a known niche external site, the exam scenario describes a Watering Hole attack.",
  },
  TyposquattingSE: {
    name: "Typosquatting",
    definition: "Registration of misspelled domain names that are very similar to those of famous brands, exploiting users' typing errors.",
    details: "Examples:\n* Registering `goggle.com` instead of `google.com`, or `paypa1.com` instead of `paypal.com`.\n* **Use:** Hosting login pages identical to the originals to steal the credentials of careless users.\n\n* **Focused Mini-Example:** A user wants to access their bank account but accidentally types `bancaun1credit.it` instead of `bancaunicredit.it`. They are faced with an identical copy of the portal that captures their credentials to forward them to the fraudsters.",
    examTip: "Also called URL Hijacking, it exploits the human typing error on the browser's address bar.",
  },
  CloningSE: {
    name: "Cloning",
    definition: "The duplication or cloning of legitimate emails, websites or multimedia files to deceive users or steal information.",
    details: "Main characteristics of cloning:\n* **Clone Phishing:** An attack in which a legitimate, previously sent email containing a real attachment or link is copied (cloned) and modified by inserting a malicious link or attachment. The email is then sent from an address that mimics the original sender.\n* **Website Cloning:** Creating a mirror, visually identical replica of a legitimate website (e.g. a bank's login portal) to induce users to enter their credentials.\n* **AI Voice Cloning:** Using voice samples of a user (e.g. an executive) through artificial intelligence to imitate their voice and carry out targeted vishing attacks.",
    examTip: "On the exam, remember that Clone Phishing consists of swapping the link or attachment of a real, trusted, previously received email with a counterfeit version.",
  },
  WhalingSE_New: {
    name: "Whaling",
    definition: "A highly specific type of spear phishing attack directed exclusively at very high-level corporate executives.",
    details: "Characteristics of Whaling:\n* **Executive Target:** It targets top figures such as the CEO, the CFO or board members.\n* **Large Impact:** Often associated with BEC (Business Email Compromise) scams for the approval of urgent transfers of large sums of money.\n* **Extremely Formal Tone:** It often uses legal pretexts, fictitious lawsuits, or formal notices from government agencies.",
    examTip: "If the exam question specifies that the phishing target is a high-level executive (CEO/CFO), the correct answer is Whaling.",
  },
  MisinformationSE_New: {
    name: "Misinformation",
    definition: "The unintentional or unwitting spread of false, incorrect or unverified information.",
    details: "Fundamental distinction:\n* **Misinformation (unintentional):** Incorrect information spread without an explicit and coordinated intent to deceive or cause harm (e.g. a user who shares a fake post believing it to be true).\n* **Disinformation (intentional):** The deliberate creation and spread of fake news with the specific intent to manipulate public opinion, mislead investigations or damage a competitor.\n* **Malinformation:** Real information but used out of context or intentionally disclosed to cause harm (e.g. a leak of private messages).",
    examTip: "On the exam, remember that the key difference between Misinformation and Disinformation lies entirely in intentionality (Misinformation has no coordinated malicious intent at the start).",
  },
  PhishingCampaignSE_New: {
    name: "Phishing campaign",
    definition: "A coordinated operation of sending fraudulent emails to a group of users for malicious or training purposes.",
    details: "Phases and types of campaigns:\n* **Malicious Campaigns:** Conducted by external attackers to gather credentials, install malware or launch large-scale ransomware attacks within an organization.\n* **Simulation Campaigns (Simulated Phishing):** A fundamental Security Awareness tool managed by the internal security team. It allows the vulnerability of the staff to be measured, statistics (click-rate) to be gathered and the users who fall for the trap to be trained.",
    examTip: "Simulated phishing campaigns help companies identify the most vulnerable employees and train them dynamically and interactively.",
  },
  BECSocialEngineering: {
    name: "Business Email Compromise (BEC)",
    definition: "A targeted scam in which the attacker impersonates (or actually controls) the mailbox of an executive or a trusted supplier in order to trick an employee into authorizing a wire transfer or disclosing confidential data.",
    details: "**Business Email Compromise (BEC)** is, according to the FBI, the most financially damaging email fraud, and it is explicitly listed in the SY0-701 objectives (Obj 2.2 - Human vectors).\n* **No malware:** BEC uses no malicious attachments or links, so antivirus engines and anti-malware gateways do not catch it. The only weapon is psychological manipulation (authority + urgency + secrecy).\n* **The three exam variants:**\n  1. **CEO fraud:** an email that appears to come from the chief executive requests an urgent and 'confidential' wire transfer.\n  2. **Vendor/Invoice fraud:** the attacker intercepts a genuine supplier thread and sends an authentic invoice with an altered bank account.\n  3. **Account takeover:** the attacker actually gets into the executive's mailbox (through phishing or credential stuffing) and writes from the legitimate domain, passing SPF, DKIM and DMARC.\n* **Sender deception techniques:** spoofing the `From` header, *lookalike* domains (`ranco.com` instead of `banco.com`), or simply altering `Reply-To`.\n\n* **Focused Mini-Example:** On Friday at 5:50 p.m. an accountant receives an email from the traveling 'CEO': it requests an immediate 48,000 EUR transfer to close a confidential acquisition and asks that nobody be told until Monday. The sender domain is `company-inc.com` instead of `companyinc.com`. The corporate *callback verification* procedure (calling the requester back on a number already on file, never on the one given in the email) stops the fraud.",
    examTip: "The most effective control against BEC is procedural rather than technological: *out-of-band* verification (a callback to an already-recorded contact) and dual control on payments above a set threshold. On the exam, if the scenario describes an urgent, confidential payment request from an executive and mentions NO attachment and NO link, the answer is Business Email Compromise, not generic phishing.",
  },
  BrandImpersonationSE: {
    name: "Brand Impersonation",
    definition: "An attack in which the adversary faithfully reproduces the trademark, logo, colors and tone of voice of a well-known company to make a fraudulent message, site or application look legitimate.",
    details: "**Brand impersonation** exploits the trust the victim places in a well-known brand, not in a specific person.\n* **Typical targets:** banks, parcel carriers (delivery notices), cloud services (Microsoft 365, Google), utility companies and tax agencies.\n* **Channels:** pixel-perfect cloned HTML emails, SMS (combined with smishing), sponsored search-engine ads leading to counterfeit login portals, fake mobile apps in the stores.\n* **Double damage:** the victim loses credentials or money, while the impersonated brand suffers reputational damage it neither caused nor can directly control.\n* **Countermeasures for the impersonated company:** publishing **DMARC** records with a `reject` policy, monitoring **Certificate Transparency logs** and typosquatted lookalike domains, and using brand-protection and takedown services.\n\n* **Focused Mini-Example:** An employee receives an email carrying the exact logo, footer and typeface of the corporate courier: 'Parcel on hold, pay 2.90 EUR in customs duty'. The link leads to a site identical to the original, hosted on `courier-tracking-uk.net`. The payment exists only to make the victim type in full credit-card details.",
    examTip: "Tell the three exam 'impersonations' apart: **Impersonation** = pretending to be a *person* (the new technician, a colleague); **Brand impersonation** = pretending to be a *brand/company*; **Typosquatting** = registering a *domain* with a typo to catch users who mistype. The three techniques are often combined in the same attack.",
  },

  /* ---- Group 6: Password Attacks ---- */
  BruteForceAtt: {
    name: "Brute-force attack",
    definition: "Systematic and exhaustive attempt of every possible character combination until the exact password is found.",
    details: "Characteristics:\n* **Offline Brute Force:** The attacker steals the database of password hashes and makes the attempts locally on their own hardware (very fast, no account-lockout policy).\n* **Online Brute Force:** Attempts made directly on the web login page (slow and easily blockable).\n\n* **Focused Mini-Example:** A user adopts a weak 4-digit password (`8291`). An automatic program instantly tries all 10,000 possible combinations on the login page in less than a second until it finds it.",
    examTip: "The main defense against offline brute-forcing is the use of slow, resistant hashing algorithms (e.g. bcrypt, PBKDF2) and long password lengths.",
  },
  DictionaryAtt: {
    name: "Dictionary",
    definition: "Targeted attack that systematically tries predefined words drawn from a list or dictionary.",
    details: "Optimization of brute-force:\n* Instead of trying random combinations (e.g. `aaaa`, `aaab`), the attack tries meaningful words, names, historical dates and common passwords present in previous leaks (e.g. `Password123`, `Love`, `Juventus`).\n\n* **Focused Mini-Example:** An attacker loads a wordlist containing the most common Italian dictionary terms and passwords leaked over the years, and guesses in a few moments the password of an administrator who had set `soleemare2020`.",
    examTip: "The use of passphrases (phrases made up of several random words) makes dictionary attacks ineffective.",
  },
  PasswordSprayingAtt: {
    name: "Password Spraying",
    definition: "Attempting to access very many different accounts by trying very few extremely common passwords.",
    details: "How it works and why it bypasses lockout:\n* If you try 5 wrong passwords in a row on `mario.rossi`'s account, the system locks it (Account Lockout).\n* If instead you try the single password `Password123!` just once on 1000 different users, no account will exceed the lockout threshold, allowing the attacker to silently sneak into any vulnerable profile.\n\n* **Focused Mini-Example:** A bot contacts the corporate exchange mail servers testing the username of hundreds of employees by trying the seasonal combination `Winter2026!` without triggering any lockout policy on any specific account.",
    examTip: "Password Spraying is a horizontal ('one-to-many') attack specifically designed to bypass Account Lockout policies.",
  },
  CredentialStuffingAtt: {
    name: "Credential Stuffing",
    definition: "Automatic input of username/password pairs leaked from past breaches across various websites.",
    details: "It exploits the human weakness of credential reuse:\n* If a user uses the same password on both a gaming forum (breached in the past) and the corporate email inbox, the attacker uses automated bots to try those exact credentials on the corporate portal.\n\n* **Focused Mini-Example:** A database of credentials stolen from a minor e-commerce site is acquired by a criminal, who uses an automated script to test those email addresses and passwords on the site of a well-known national online bank, finding several valid accounts.",
    examTip: "**Why it works:** the attack guesses nothing, it **reuses** username-password pairs already leaked in other breaches. It succeeds for exactly one reason, **password reuse** across different services, which is why the success rate per attempt is low but never zero at scale.\n* **The strongest defense is MFA**, because the right password alone is no longer enough. **But do not call it definitive:** an attacker can bypass MFA with *real-time phishing* that relays the code, with **MFA fatigue**, or by stealing the **session token** after authentication. Against those you need **phishing-resistant** MFA (FIDO2/WebAuthn).\n* **The defenses that go alongside:** screening chosen passwords against breached-credential corpora, per-address rate limiting, detection of *impossible travel* and of never-before-seen devices. **Exam trap:** tell credential stuffing (many **already known** pairs, one attempt per account) apart from password spraying (**one common password**, very many accounts) and brute force (**many generated passwords**, one account).",
  },

  /* ---- Group 7: Network, Wireless & App Attacks ---- */
  NetworkWirelessAttacks: {
    name: "Network & Wireless Attacks",
    definition: "Attacks aimed at intercepting, disrupting or diverting wired or wireless network traffic.",
    details: "Network attack vectors include:\n* **DDoS (Distributed Denial of Service):** Overloading a server with traffic using botnets to make it unavailable to legitimate users.\n* **On-path Attack (MITM):** Positioning oneself between two computers to spy on or modify the data in transit (e.g. session hijacking).\n* **DNS Poisoning:** Inserting fake IPs into DNS servers to divert users to fraudulent sites.\n* **ARP Spoofing:** Associating a legitimate gateway's IP with the attacker's MAC address in a LAN to intercept all local traffic.\n* **MAC Flooding:** Flooding a switch's memory with fake MAC addresses forcing it to transmit packets in 'fail-open' mode (behaving like a hub) to sniff the packets.\n* **Rogue Access Point (Rogue AP):** An unauthorized wireless AP connected to the physical port of the corporate network without controls.\n* **Evil Twin:** A fraudulent AP that duplicates the same SSID and channels of a corporate Wi-Fi to intercept the login credentials of tricked users.\n* **Bluejacking & Bluesnarfing:** Exploiting Bluetooth connections to send spam (jacking) or steal personal information (snarfing).\n\n* **Focused Mini-Example:** A malicious actor sits in the corporate waiting room and sets up a hotspot with the fictitious name 'Company_Guests_Free' (**Evil Twin**). Visitors connect thinking they are browsing for free, exposing the credentials of their social media and email accounts.",
    examTip: "The Evil Twin deliberately imitates the name (SSID) of an existing network to induce users to connect spontaneously, whereas the Rogue AP is simply an unauthorized access point physically installed on the network.",
  },
  AppCryptoAttacks: {
    name: "Application & Cryptographic Attacks",
    definition: "Attacks on the logical flaws of the code or on the implementation of cryptographic algorithms.",
    details: "The types of application and cryptographic attacks include:\n* **SQL Injection (SQLi):** Injecting SQL commands into unsanitized input fields to gain unauthorized access to the database or destroy data.\n* **Cross-Site Scripting (XSS):** Injecting malicious scripts executed in the browser of legitimate users who visit the vulnerable site.\n* **Buffer Overflow:** Writing data beyond a buffer's fixed memory limit to crash the app or overwrite the return instruction and execute arbitrary code.\n* **CSRF (Cross-Site Request Forgery):** Exploiting the user's active session and cookies to force them to perform unwanted actions (e.g. money transfers) on a trusted web application.\n* **SSRF (Server-Side Request Forgery):** Forcing the vulnerable server to make HTTP requests to internal resources not exposed to the Internet.\n* **Directory Traversal:** Navigating the server's file system through unvalidated input (e.g. `../etc/passwd`) to read confidential system files.\n* **Replay Attack:** Intercepting an authenticated data packet (e.g. a password hash in transit) and retransmitting it to deceive the server and gain access.\n* **Downgrade Attack:** Forcing two systems to establish an obsolete and insecure cryptographic connection in order to decrypt the data more easily.\n* **Birthday Attack:** An attack based on hash-algorithm collisions exploiting the birthday paradox to break the integrity of signatures.\n\n* **Focused Mini-Example:** An attacker enters the string `' OR '1'='1` into the search field of the bank's site (**SQL Injection**). The server interprets the input as a query and returns the complete registry of the bank accounts instead of searching for a single record.",
    examTip: "Rigorous input validation and output sanitization (Output Encoding) remain the main and most-tested exam defenses against SQL Injection and XSS.",
  },
  AmplifiedDDoS_New: {
    name: "Amplified DDoS attack",
    definition: "A type of DDoS attack that exploits vulnerable third-party servers (UDP-based) to send disproportionately large responses to the victim, overloading it.",
    details: "How amplification works:\n* **IP Spoofing:** The attacker sends small requests to open services such as DNS, NTP, SNMP, or SSDP, falsifying the source IP with that of the victim.\n* **Amplification Factor:** The servers respond by sending the victim huge responses (up to hundreds of times larger than the original request).\n* **Impact:** Complete saturation of the victim's bandwidth, causing an immediate block.",
    examTip: "The amplified DDoS attack relies on the UDP protocol (which requires no handshake, allowing IP spoofing) and on open third-party servers that generate responses much larger than the initial request.",
  },
  ReflectedDDoS_New: {
    name: "Reflected DDoS attack",
    definition: "A DDoS attack in which the attack requests are bounced or reflected off legitimate intermediary servers before hitting the final target.",
    details: "Characteristics of Reflected DDoS:\n* **No Direct Contact:** The attacker does not communicate directly with the victim, hiding the real origin of the attack.\n* **IP Spoofing:** The attacker sends request packets to legitimate reflecting servers, setting the victim's IP as the sender IP.\n* **Bounce:** The reflecting servers respond by sending packets to the victim, believing that the victim requested them.\n* **Mitigation:** Difficult to block because the traffic comes from legitimate, authoritative public servers.",
    examTip: "In a Reflected DDoS attack, the attacker bounces ('reflects') the attack traffic using innocent intermediary servers through spoofing of the victim's IP.",
  },
  SQLi_New: {
    name: "SQL Injection (SQLi)",
    definition: "An attack in which malicious SQL commands are inserted into the application's input fields to manipulate or extract data from the database.",
    details: "Details of the attack:\n* **Lack of Sanitization:** It occurs when the application concatenates the user's input directly into an SQL query without performing checks.\n* **Effects:** It allows the attacker to bypass authentication, read confidential data, modify it, delete it, or even run administrative commands on the database server (through stored procedures).\n* **Main Countermeasure:** Use of parameterized queries (Prepared Statements) and rigorous input sanitization.",
    examTip: "The definitive and most-tested exam defense against SQL Injection is the systematic adoption of Prepared Statements (parameterized queries), which separate SQL code from user-supplied data. Input validation is a complementary defense, not a substitute; a WAF is a compensating control that filters known payloads but does not remove the vulnerability in the code.",
  },

  /* ---- Group 8: Vulnerabilities ---- */
  CVEVuln: {
    name: "CVE",
    definition: "Common Vulnerabilities and Exposures: the standardized public list of known security flaws.",
    details: "Characteristics of the CVE:\n* **Identification:** It provides a unique ID for each discovered vulnerability (e.g. `CVE-2017-0144` for EternalBlue).\n* **Purpose:** It allows security professionals and vendors to exchange precise information about the same exact flaw using a common international naming.\n\n* **Focused Mini-Example:** An analyst reads that their Fortinet firewall is affected by the vulnerability named `CVE-2023-27997` and can plan the application of the corrective patch pointing exactly to the official datasheet.",
    examTip: "The CVE is a dictionary of public, known vulnerabilities, not a proprietary or secret database.",
  },
  CVSSVuln: {
    name: "CVSS",
    definition: "Common Vulnerability Scoring System: a standard framework for assessing and communicating the severity of a vulnerability.",
    details: "The CVSS score ranges from 0.0 to 10.0 (Critical):\n* **Main Metrics:**\n  - *Base Metrics:* Intrinsic characteristics of the flaw (attack vector, attack complexity, privileges required, user interaction, impact on C-I-A).\n  - *Temporal Metrics:* How the flaw evolves over time (e.g. availability of public exploit code, availability of an official patch).\n  - *Environmental Metrics:* The importance of the affected system in the company's real infrastructure.\n* **Mind the version:** the three groups above are those of **CVSS v3.1**. In **v4.0** the layout changes: the groups are **Base, Threat, Environmental and Supplemental**, and *Threat* takes the place of *Temporal*. The **severity bands stay identical** across the two versions. If a question names the *Temporal* metrics, it is talking about v3.1.\n\n* **Focused Mini-Example:** A vulnerability scanner finds a CVSS v3 flaw with a score of `9.8` on the company's web-facing Apache server, forcing the analysts to act for immediate patching outside working hours.",
    examTip: "On the CVSS v3.x scale a score from 9.0 to 10.0 falls in the 'Critical' severity band and demands immediate action (typically flaws exploitable remotely, without authentication and without user interaction). Remember the bands, **identical in v3.1 and v4.0**: 0.0 None, 0.1-3.9 Low, 4.0-6.9 Medium, 7.0-8.9 High, 9.0-10.0 Critical. Note: the CVSS score measures technical severity, NOT business risk; remediation priority comes from CVSS combined with asset criticality and real exposure.",
  },
  ZeroDayVuln: {
    name: "Zero-Day",
    definition: "A software vulnerability not yet known to the manufacturer or lacking an official patch or remedy.",
    details: "Exposure window:\n* **Name:** It comes from the fact that the manufacturer had 'zero days' of notice to prepare a corrective patch.\n* **Danger:** Extremely valuable to sophisticated attackers (Nation-States) because traditional signature-based detection systems cannot intercept it.\n\n* **Focused Mini-Example:** A security company discovers that Apple iOS operating systems are vulnerable to an invisible attack via iMessage with no user interaction (**Zero-Day**). The manufacturer is alerted to prepare and release an emergency update.",
    examTip: "Anomaly-based IPS systems and sandboxing are the best defenses for identifying Zero-Day exploits before patches are released.",
  },
  FalsePositiveVuln: {
    name: "False Positive",
    definition: "The erroneous reporting by a scanner or an IDS of a nonexistent vulnerability or attack.",
    details: "Business impact:\n* It generates noise and wastes time for the security analysts who investigate fictitious alerts.\n* **Solution:** Optimizing and customizing the scan rules and the IDS/SIEM signatures.\n\n* **Focused Mini-Example:** The central antivirus sends a critical Trojan-detection alert on a custom internally developed application, but a manual analysis reveals that it is only harmless code miscataloged by the heuristic engine.",
    examTip: "On the exam, a credentialed scan drastically reduces False Positives because it directly accesses the registry and local configuration files.",
  },
  FalseNegativeVuln: {
    name: "False Negative",
    definition: "The failure of the defense tools to report a truly existing vulnerability or attack.",
    details: "The most serious danger:\n* The vulnerability scanner reports that the system is secure, but in reality it hosts a critical open flaw. This leaves the organization exposed without any awareness of the risk.\n* Typical of Zero-Day attacks or polymorphic malware.\n\n* **Focused Mini-Example:** A malware programmed to mutate its binary signature silently bypasses the corporate defenses because the local antivirus software detects no match and declares the workstation 'protected and clean'.",
    examTip: "False Negatives expose the company to the maximum level of risk because they create a false sense of security.",
  },
  MemoryInjectionVuln: {
    name: "Memory Injection",
    definition: "A vulnerability that lets an attacker write and execute arbitrary code inside the memory space of a legitimate, already-running process.",
    details: "**Memory injection** exploits the fact that a trusted process (e.g. `explorer.exe`, a browser, a system service) already holds the permissions and the reputation the attacker needs.\n* **Why it works:** the malicious code never lands on disk as an executable file, so signature-based antivirus has nothing to scan. This is the foundation of **fileless** attacks.\n* **Typical techniques:** DLL injection, process hollowing (a legitimate process is started suspended and its contents replaced), reflective loading.\n* **Attacker benefit:** it inherits the host process's privileges and bypasses application firewall rules and application allow lists, because as far as the system is concerned an authorized program is running.\n* **Defenses:** EDR with behavioral memory analysis, operating-system protections such as DEP and ASLR, and Control Flow Guard.\n\n* **Focused Mini-Example:** Malware injects a DLL into the user's browser process. Traffic to the command-and-control server therefore leaves from the browser, which is allowed to browse: the application firewall sees nothing unusual because the sending process is legitimate.",
    examTip: "On the exam, if the scenario describes malicious code running inside a legitimate process with no suspicious file on disk, think memory injection and fileless attack. The right countermeasure is not signature-based antivirus but an EDR with behavioral analysis.",
  },
  BufferOverflowVuln: {
    name: "Buffer Overflow",
    definition: "A vulnerability that occurs when a program writes more data into a buffer than it can hold, overwriting the adjacent memory areas.",
    details: "**Buffer overflow** is the most classic and most heavily examined memory vulnerability.\n* **Root cause:** no length check on input, typical of languages without automatic memory management such as C and C++ (functions like `strcpy` or `gets`).\n* **From crash to code execution:** by overwriting the return address on the stack, the attacker can redirect execution to their own code (shellcode), gaining command execution with the privileges of the vulnerable program.\n* **Exam variants:** *stack overflow* (overwrites the stack and the return address) and *heap overflow* (overwrites dynamically allocated structures).\n* **Defenses:** input length validation, safe functions (`strncpy`), and system protections: **ASLR** (randomizes memory addresses), **DEP/NX** (prevents code execution in data areas) and stack canaries.\n\n* **Focused Mini-Example:** A network service allocates 64 bytes for a username. The attacker sends 900 carefully crafted bytes: the excess overwrites the function's return address and points it at code the attacker has just placed in memory, yielding a remote shell.",
    examTip: "Remember the pair of system defenses: **ASLR** makes it unpredictable *where* memory lives, **DEP/NX** prevents execution *where* there should only be data. Neither fixes the bug, they only make it much harder to exploit: the real remediation is still input validation in the code.",
  },
  RaceConditionVuln: {
    name: "Race Condition (TOC/TOU)",
    definition: "A vulnerability that arises when a system's correct behavior depends on the order or timing of concurrent events, and an attacker manages to slip in between the moment of the check and the moment of use.",
    details: "The exam form is **TOC/TOU** (*Time-of-Check to Time-of-Use*): the program verifies a condition and then acts, but an exploitable window exists between the two moments.\n* **The three terms objective 2.3 lists:** **TOC** (*Time-of-Check*) is the moment the program verifies the condition; **TOU** (*Time-of-Use*) is the moment it acts on the strength of that verification; **TOE** (*Target of Evaluation*) is the resource that was checked - the file, the record, the counter - which is exactly what the attacker swaps out in the window between the two moments.\n* **The pattern:** 1) the program checks that the user may access file A; 2) in that fraction of a second the attacker replaces A with a link to a restricted file; 3) the program acts on the wrong file, believing it has already verified permissions.\n* **Where it shows up:** file system access, banking transactions, discount-code redemption, concurrent counter increments.\n* **Defenses:** **atomic** operations (check and use in a single indivisible step), locks and mutexes, database transactions with adequate isolation, and using file descriptors instead of textual paths.\n\n* **Focused Mini-Example:** An e-commerce site verifies that a discount voucher has not been used yet and then marks it as consumed. By sending 50 requests within the same millisecond, the attacker makes all 50 pass the check before the first one manages to write the update: the same voucher is applied 50 times.",
    examTip: "Keywords to spot on the exam: 'between the check and the use', 'simultaneous requests', 'race'. The correct answer is race condition / TOC-TOU, and the countermeasure is making the operation atomic, not adding a second check. **Exam trap:** when both *Race condition* and *Time-of-use* appear among the options, the first is the general category and the second the subtype: if the scenario describes precisely the window between check and use, the answer is the subtype. And do not confuse **TOE** with the two moments: it is not a point in time, it is the object being evaluated.",
  },
  MaliciousUpdateVuln: {
    name: "Malicious Update",
    definition: "A software supply-chain vulnerability in which a seemingly legitimate, signed update delivers malicious code to every system that installs it.",
    details: "A **malicious update** turns a security control into an attack vector: the organization is compromised precisely because it did the right thing, namely patch.\n* **How it happens:** compromise of the vendor's build pipeline, theft of its code-signing certificate, or hijacking of the distribution channel (update server not protected by HTTPS, DNS hijacking).\n* **Why it is devastating:** the update arrives signed and from a trusted source, so it passes antivirus, application allow lists and user suspicion; it also hits every one of the vendor's customers at once.\n* **Defenses:** verifying signatures and published hashes, downloading updates only over encrypted channels, a staging environment before production, an **SBOM** (Software Bill of Materials) so you know what you are actually installing, and post-update behavioral monitoring.\n\n* **Focused Mini-Example:** A network monitoring product used by thousands of companies ships an update properly signed by the vendor. Inside it, planted through the compromised build pipeline, is a backdoor that activates after two weeks: every organization that applied the patch is compromised.",
    examTip: "Do not conflate them: **malicious update** = the *official* update was poisoned upstream; **Trojan** = the user willingly installs software they believed harmless. A malicious update is the case where patching promptly, though the correct practice, increased risk: hence staged rollout rings.",
  },
  VMEscapeVuln: {
    name: "VM Escape & Resource Reuse",
    definition: "Virtualization vulnerabilities: VM escape lets an attacker break out of a virtual machine and reach the hypervisor or the other VMs; resource reuse exposes residual data when a resource is reassigned to another tenant.",
    details: "These are the two virtualization- and multi-tenant-cloud-specific vulnerabilities named by objective 2.3.\n* **VM escape:** by exploiting a hypervisor flaw, code running inside a guest VM 'escapes' and gains execution on the host. It is the most severe attack possible in a virtualized environment, because it destroys the isolation the entire cloud model rests on: from one customer's VM an attacker can potentially reach every other VM on the same host.\n* **Resource reuse:** RAM, disk space or cloud storage is released by one tenant and reassigned to another without being zeroed; the new occupant can read the previous one's residual data. It is the cloud version of the unsanitized-media problem.\n* **Defenses:** prompt hypervisor patching, minimizing guest-host integration tools, dedicated hardware isolation for the most sensitive workloads, and encryption at rest with customer-managed keys, which renders residual data unreadable even when a resource is reused.\n\n* **Focused Mini-Example:** An attacker legitimately rents a VM from a cloud provider. They exploit a flaw in the hypervisor's virtualized graphics driver to execute code on the physical host, and from there reach the memory of other customers' virtual machines sharing the same server.",
    examTip: "On the exam, VM escape is the threat that justifies **dedicated tenancy** instead of shared hardware for critical workloads. Against resource reuse the correct answer is encryption at rest with customer-controlled keys: if residual data is encrypted, it is just noise to the next tenant.",
  },
  MobileVulnVuln: {
    name: "Mobile Vulnerabilities (Jailbreaking & Sideloading)",
    definition: "Vulnerabilities introduced by removing mobile operating-system restrictions (jailbreaking on iOS, rooting on Android) or by installing applications from outside the official stores (sideloading).",
    details: "These are the two mobile vulnerabilities explicitly listed by objective 2.3.\n* **Jailbreaking / rooting:** the user gains administrative privileges over the device, switching off the vendor's security model. Consequences: inter-app *sandboxing* collapses, apps can read each other's data, official updates often stop working, and corporate MDM controls can be bypassed.\n* **Sideloading:** installing packages (APK, IPA) downloaded from unofficial sources that never went through the store's automated and manual vetting. It is the usual distribution channel for banking trojans and mobile spyware.\n* **Risk to the organization:** a compromised device that reaches corporate mail and applications turns a personal problem into a corporate breach, especially in BYOD settings.\n* **Defenses:** MDM policies that detect jailbreak/root and block access to corporate resources (*attestation*), banning installation from unknown sources, and work containers kept separate from the personal profile.\n\n* **Focused Mini-Example:** An employee roots their personal phone to get a paid app for free, downloading the APK from a forum. The app carries spyware which, with sandboxing gone, reads the session tokens of the corporate mail app installed on the same device.",
    examTip: "Tell the two terms apart: **jailbreaking/rooting** removes *operating-system* restrictions; **sideloading** installs apps *outside the store* and does not necessarily require root. The correct exam control is MDM with root detection and conditional access blocking, not user training alone.",
  },
  MisconfigurationVuln: {
    name: "Misconfiguration",
    definition: "A vulnerability arising from wrong, incomplete or default security settings rather than from a defect in the code.",
    details: "**Misconfiguration** requires no software bug at all: the product works exactly as designed, but it was set up badly.\n* **Typical exam cases:** default credentials never changed, publicly exposed cloud storage buckets, overly broad share permissions, debug services or management ports reachable from the Internet, encryption available but not switched on, logging disabled.\n* **Why it is so common:** systems ship with settings tuned for ease of use, not security; and configuration degrades over time (**configuration drift**) through untracked changes.\n* **Defenses:** **security baselines** and CIS benchmarks, documented hardening, Infrastructure as Code to make configurations repeatable and reviewable, automated compliance scanning (SCAP) and change management.\n\n* **Focused Mini-Example:** A development team creates a cloud storage bucket to share files and sets read permission to 'anyone with the link' to save time. The bucket gets indexed and thousands of internal documents become publicly readable. No software was vulnerable: the configuration was.",
    examTip: "Mind the exam distinction: if the problem is fixed by applying a **patch**, it is a software vulnerability; if it is fixed by **changing a setting**, it is a misconfiguration. Misconfigurations are among the most common causes of real breaches, and the correct countermeasure is a security baseline with continuous verification, not an update.",
  },
  LegacyEOLVuln: {
    name: "Legacy & End-of-Life Systems",
    definition: "The structural vulnerability of hardware or software that no longer receives security updates from the vendor because it has passed its end-of-support date.",
    details: "An **End-of-Life (EOL)** or **legacy** system accumulates vulnerabilities permanently: every newly discovered flaw stays open forever, because no patch will ever ship.\n* **Terminology to separate:** *End-of-Sale* (no longer purchasable), *End-of-Support / EOL* (no more security patches), *legacy* (obsolete technology still in production, sometimes still supported).\n* **Why they stay in service:** business applications that run only on that operating system, industrial and medical equipment certified against one specific version, high migration cost.\n* **Mandatory compensating controls** when decommissioning is not possible: strict **segmentation** into an isolated VLAN, firewall rules allowing only the indispensable flows, removal of Internet access, heightened monitoring and, where available, *virtual patching* through an IPS.\n\n* **Focused Mini-Example:** A hospital runs a CT scanner whose control software sits on an operating system that has been out of support for years and cannot be upgraded without voiding the equipment's certification. The machine is isolated in a dedicated VLAN with no Internet access, reachable only from the reporting workstation through explicit firewall rules.",
    examTip: "In exam scenarios with a critical system that cannot be updated, the answer is never 'apply the patch' (none exists) nor 'accept the risk' on its own: it is **isolation and segmentation** as a compensating control, together with a documented replacement plan.",
  },

  /* ---- Group 9: Mitigations ---- */
  ACLMiti: {
    name: "ACL",
    definition: "Access Control List: lists of rules that control and limit access to resources or network traffic.",
    details: "Scopes of application:\n* **Network ACL (Firewall/Router):** Sequential rules that allow or deny IP packets in transit based on source/destination IP, protocol and ports (e.g. 'Allow TCP traffic on port 443').\n* **FileSystem ACL:** Permissions on files and folders that specify which users or groups can Read, Write or Execute.\n\n* **Focused Mini-Example:** An administrator configures a rule on the corporate router (**Network ACL**) that blocks all incoming traffic except connections coming from the main office's static IP address on port 22 for secure SSH management.",
    examTip: "Network ACLs typically contain a final implicit rule denying all traffic not explicitly authorized (Implicit Deny).",
  },
  SegmentationMiti: {
    name: "Segmentation",
    definition: "The practice of dividing a network into isolated, independent subnetworks to limit the reach of an attack.",
    details: "Security benefits:\n* **Containment:** If a computer in a test network is infected, segmentation prevents the malware from spreading to the sensitive accounting network.\n* **Implementation:** Achieved through VLANs, distinct subnets and the placement of departmental firewalls.\n\n* **Focused Mini-Example:** An administrator configures two distinct VLANs to isolate the guest Wi-Fi network from the internal accounting one (**Segmentation**), preventing an infected guest laptop from scanning or attacking the financial servers.",
    examTip: "Network segmentation mitigates an attacker's lateral movements within the LAN.",
  },
  LeastPrivilegeMiti: {
    name: "Least Privilege",
    definition: "The fundamental principle of assigning each user, process or system only the minimum indispensable permissions.",
    details: "Application:\n* It prevents ordinary users from having local administrative rights on their laptops.\n* It reduces the impact of a malware infection: if the infected user is not an administrator, the malware cannot install itself deeply or disable the antivirus.\n\n* **Focused Mini-Example:** An HR employee is granted permission to access exclusively the employee-contracts folder, but not the financial-statements one (**Least Privilege**), reducing the exposure of corporate data.",
    examTip: "Least Privilege is the golden rule for countering insider threats and containing account compromise.",
  },
  PatchingMiti: {
    name: "Patching",
    definition: "The periodic and systematic application of software updates to fix discovered vulnerabilities.",
    details: "Patch Management cycle:\n* **Test:** Verifying the patch in a pre-production environment before release (to avoid incompatibilities).\n* **Release:** Orderly application during maintenance windows.\n* **Verification:** A new scan to confirm the closure of the vulnerability.\n\n* **Focused Mini-Example:** The IT team receives a notification about a critical web-server vulnerability and schedules an immediate application of the corrective update (**Patching**) during the nightly maintenance window to prevent possible intrusions.",
    examTip: "Failing to apply patches promptly is the main cause of success for attacks based on known exploits on the exam.",
  },
  AppAllowListMiti: {
    name: "Application Allow List",
    definition: "A technique that prevents the execution of any software except those explicitly authorized in a list.",
    details: "Compared to blocking (Block List/Blacklist):\n* **Approach:** It is much more secure because it follows the default-deny philosophy. Any new virus or unknown script will never be able to start, because it is not part of the list of programs authorized by the administrator.\n\n* **Focused Mini-Example:** An employee downloads a freeware PDF-editing program and tries to launch it, but receives a block message from the operating system because the application is not present in the list of authorized ones (**Application Allow List**).",
    examTip: "Formerly called Whitelisting, it is the most powerful control against the launching of unidentified malicious executables.",
  },
  IsolationMiti: {
    name: "Isolation",
    definition: "Physically or logically isolating compromised or untrusted systems from the rest of the corporate network.",
    details: "Methodologies:\n* **Quarantine:** Moving a ransomware-infected endpoint to a special VLAN with no internet or contact with other hosts.\n* **Sandbox:** Running potentially harmful files or links in an isolated virtualized environment to analyze their behavior while greatly reducing the risk to the host. It does not remove it: *sandbox escape* techniques exist, and some malware detects the sandbox and stays inert while it is being watched.\n\n* **Focused Mini-Example:** A user opens a suspicious attachment and the antivirus system automatically launches it inside a temporary, network-less virtual machine (**Sandbox**) to check whether it tries to encrypt files.",
    examTip: "Isolating an infected machine is the very first Containment action in the Incident Response plan.",
  },
  EncryptionMiti: {
    name: "Encryption",
    definition: "The use of cryptography to protect the confidentiality of data both at rest and in transit.",
    details: "Types:\n* **Data-at-rest:** Encryption of hard disks (FDE, BitLocker), databases, files and backups.\n* **Data-in-transit:** Encryption of network packets (HTTPS/TLS, IPsec VPN) to avoid interception.\n\n* **Focused Mini-Example:** An employee loses the corporate laptop at the airport, but the data remains inaccessible to whoever finds the device because the entire hard disk is protected by full encryption (**Data-at-rest Encryption**).",
    examTip: "**Mind what encryption actually protects.** It protects data once it reaches someone who **does not hold the key**: a stolen disk, a mislaid backup, a packet intercepted in transit. It does **not** protect against an attacker operating **inside an already authenticated session**: in a double-extortion ransomware case the malware runs with the privileges of a legitimate user or service, and the system decrypts the files for it transparently, exactly as it would for the owner. Disk encryption does not prevent exfiltration.\n* **Exfiltration calls for other controls:** least privilege, DLP, segmentation and monitoring of outbound volumes. **Against ransomware the defense is backup** â€” offline or immutable â€” and periodic restore testing. **Exam trap:** if the scenario involves a **lost or stolen device**, the answer is encryption; if it involves data **exfiltrated from a running system**, it is not.",
  },
  MonitoringMiti: {
    name: "Monitoring",
    definition: "The continuous collection, aggregation and analysis of logs and security events in real time.",
    details: "Key tools:\n* **SIEM (Security Information and Event Management):** Centralizes the logs of firewalls, servers, databases and performs event correlation looking for attacks.\n* **SOC (Security Operations Center):** The team of specialists that monitors the systems 24/7/365.\n\n* **Focused Mini-Example:** A SIEM server (**Monitoring**) detects a sudden burst of failed login attempts followed by a successful login from a foreign IP at 3 a.m., immediately sending a critical alert to the SOC on-call staff.",
    examTip: "Continuous monitoring provides the proactive visibility needed to detect complex attacks before they cause serious damage.",
  },
  DisablePortsMiti: {
    name: "Disable Ports/Protocols",
    definition: "Disabling unused services, superfluous open network ports and insecure cleartext protocols.",
    details: "Basic hardening:\n* **Ports:** Turning off the physical switch ports in unused offices to prevent unauthorized physical connections.\n* **Protocols:** Banning obsolete protocols such as Telnet (port 23), FTP (port 21), HTTP (port 80) and mandating the secure variants SSH (port 22), SFTP (port 22), HTTPS (port 443).\n\n* **Focused Mini-Example:** While securing a new Linux server, the administrator turns off the Telnet service and disables port 23, forcing operators to use exclusively encrypted SSH connections on port 22.",
    examTip: "Disabling unused ports and unneeded services is the first fundamental exam step for host hardening.",
  },
  ChangePasswordsMiti: {
    name: "Change Default Passwords",
    definition: "Immediately replacing the credentials set by the manufacturer (e.g. admin/admin) on any new hardware or software.",
    details: "Automated attacks:\n* Bots continuously look for the IP addresses of internet-connected IP cameras, routers and printers, trying public lists of default credentials.\n* Failing to change them exposes the systems to a trivial compromise within minutes of installation.\n\n* **Focused Mini-Example:** When installing a new network printer for the office, the IT administrator accesses the web management page and immediately changes the original credentials `admin/1234` with a complex passphrase.",
    examTip: "The very first security configuration on a new IoT device or network appliance must be changing the default passwords.",
  },
  RemoveSoftwareMiti: {
    name: "Remove Unnecessary Software",
    definition: "Removing any program, utility, compiler or service not strictly necessary to the server's operation.",
    details: "Reducing attack vectors:\n* Less installed software means less code exposed to potential future bugs or exploits.\n* It also makes the patch-management process and memory-resource optimization faster.\n\n* **Focused Mini-Example:** On a production Oracle database server, the administrator uninstalls the web browsers, the games built into the operating system and the unused Python and GCC compilers (**Remove Unnecessary Software**), reducing the attackable components and the tools an attacker would otherwise find ready on the machine. Removal **reduces**, it does not eliminate: flaws in the kernel, in required services and in configurations remain, and must be addressed with patching, least privilege and hardening.",
    examTip: "Removing unneeded software directly reduces a host's Software Attack Surface.",
  },

  /* ---- Group 10: Threat Intelligence ---- */
  ThreatIntelligenceRes: {
    name: "Threat Intelligence",
    definition: "Structured, evidence-based information regarding emerging threats, hostile actors, their motivations, capabilities and attack patterns, used to make informed defensive decisions.",
    details: "**Threat Intelligence** is structured into three operational levels:\n* **Strategic Intelligence:** High-level information intended for corporate management to understand global threat trends, geopolitical risks and plan long-term security investments.\n* **Tactical Intelligence:** Technical details on the Tactics, Techniques and Procedures (TTP) used by attackers. It helps SOC defenders understand how threats move.\n* **Operational/Technical Intelligence:** Specific and immediate Indicators of Compromise (IoC), such as malicious IP addresses, command-and-control (C2) domains, or malware file hashes, used to instantly configure firewalls, IDS and SIEM.",
    examTip: "Threat Intelligence allows organizations to move from a purely reactive defense to a proactive posture, anticipating attackers' moves before they hit the infrastructure.",
  },
  OSINTRes: {
    name: "OSINT",
    definition: "Open Source Intelligence: the methodology of collecting, analyzing and correlating sensitive or useful data and information coming exclusively from public, freely accessible and legal sources.",
    details: "**OSINT** is widely used both by ethical hackers for passive reconnaissance and by attackers to prepare targeted attacks:\n* **Common Sources:**\n  - *Social Networks:* LinkedIn, Facebook or Twitter profiles to identify the roles and org chart of company employees.\n  - *Public Databases:* DNS records, WHOIS databases, registered IP addresses, chamber-of-commerce registries.\n  - *Search Engines:* Google Dorking to find sensitive files indexed by mistake, Shodan to map IoT devices and appliances exposed on the internet.\n  - *Code Repositories:* GitHub or GitLab to spot passwords, API keys or debug comments accidentally left by programmers.",
    examTip: "OSINT relies on public-domain sources. In its passive form (WHOIS records, public certificates, social media, search engines) it generates no traffic toward the target's infrastructure and is therefore hard to detect; do not confuse it with active reconnaissance (port scanning, service enumeration), which does touch the victim's systems and leaves traces in the logs.",
  },
  ProprietaryIntelligenceRes: {
    name: "Proprietary Intelligence",
    definition: "Commercial, private and exclusive threat information collected and analyzed by specialized cybersecurity companies, provided to customers on a paid subscription basis.",
    details: "Unlike public or open-source sources, **Proprietary Intelligence** offers key competitive advantages:\n* **Quality and Accuracy:** The data is constantly validated and analyzed by dedicated teams of human analysts, drastically reducing false positives.\n* **Real-Time Feeds:** It provides exclusive IoCs and security advisories well before they are disclosed in national public databases.\n* **Examples:** Commercial threat feeds provided by market-leading vendors such as CrowdStrike, Mandiant or Palo Alto Networks.",
    examTip: "**What you are actually paying for:** not inherently truer information, but **curation** â€” data enriched with context, filtered of noise, correlated with known campaigns and delivered in a directly usable format, with a contractual commitment on timing. **The limits to know:** the cost, and the fact that the vendor's sources cannot be inspected, so its assessments are taken partly on trust.\n* **How the sources compare:** **OSINT** is cheap and verifiable but must be filtered by hand; **proprietary intelligence** is curated and timely but opaque and expensive; a sector **information-sharing organization** (ISAC) offers the most relevant context, because its members face the same attacks. A mature posture uses them together rather than picking one.",
  },
  InformationSharingRes: {
    name: "Information Sharing",
    definition: "The collaborative practice in which public and private organizations in the same or different sectors exchange data and IoCs about the cyberattacks they have suffered to strengthen the common defense.",
    details: "Information sharing makes it possible to counter large-scale coordinated attacks:\n* **ISAC (Information Sharing and Analysis Centers):** Sector-based organizations (e.g. FS-ISAC for the financial sector, Aviation-ISAC for aviation) dedicated to the secure exchange of intelligence among competing companies united in security.\n* **Standards and Protocols:** To automate the exchange of machine-readable information, the following standards are used:\n  - *STIX (Structured Threat Information eXpression):* A standardized XML/JSON language to describe threat information.\n  - *TAXII (Trusted Automated eXchange of Intelligence Information):* A secure application-layer network protocol designed specifically to transport STIX messages.",
    examTip: "STIX defines 'what' is shared (the data structure of the threat), while TAXII defines 'how' that information is securely exchanged over the network.",
  },
  DarkWebIntelligenceRes: {
    name: "Dark Web Intelligence",
    definition: "The proactive monitoring and inspection of the channels and illegal markets on anonymous networks (such as Tor or I2P) looking for stolen corporate credentials, exfiltrated data or attack plans directed against the organization.",
    details: "**Dark Web Intelligence** makes it possible to intercept breaches well before they have a devastating impact:\n* **What is searched for:** Corporate databases put up for sale, employee credentials stolen through infostealer malware, discussions in hacker forums on how to penetrate the organization's network, or ready-to-use ransomware kits to hit the brand.\n* **Tools:** Automated bots and analysts infiltrated in protected channels (Telegram, closed forums) that scan the sources without compromising the security of the corporate assets.",
    examTip: "Dark web intelligence is crucial for the early detection of credential theft or data leaks that have already occurred but not yet been discovered internally by IT.",
  },
  },

  /* ================= Domain 3 ================= */
  3: {
  /* ---- Group 1: Cloud ---- */
  OnPremisesArchitecture: {
    name: "On-premises",
    definition: "An architectural model that involves hosting, installing and directly managing the IT infrastructure within the organization's physical premises.",
    details: "In the on-premises (or on-prem) model, the company has physical ownership and total control over servers, network and data. It can be configured in either a centralized or decentralized way. Although it offers maximum control and compliance for ultra-sensitive data, it requires high initial investment (CapEx), constant maintenance and physical security management (cooling, power, surveillance).",
    examTip: "The On-premises architecture indicates that the hardware is physically located within the corporate premises, placing the entire responsibility for security (physical and logical) on the organization itself.",
  },
  CentralizedArchitecture: {
    name: "Centralized",
    definition: "An architectural model that involves using a single point of control or a central authority to manage an entire system or service.",
    details: "Centralized systems offer significant advantages in terms of management simplicity, consistency of security policies and ease of monitoring. However, they have critical drawbacks such as being a Single Point of Failure (SPOF), scalability limitations and a total lack of autonomy for the individual peripheral units.",
    examTip: "A Centralized model concentrates all control and decision-making in a single point; this simplifies administration but creates a single critical point of failure.",
  },
  DecentralizedArchitecture: {
    name: "Decentralized",
    definition: "An architectural model that distributes control, decisions and management authority across multiple points distributed in the system.",
    details: "Decentralized systems improve overall resilience (eliminating single points of failure), increase horizontal scalability and offer greater operational autonomy to the local nodes or departments. On the other hand, they introduce greater integration complexity, potential configuration inconsistencies and significant security challenges.",
    examTip: "Unlike the centralized model, the Decentralized architecture distributes authority across multiple nodes, increasing resilience at the expense of greater management complexity.",
  },
  IaaSCloud: {
    name: "IaaS",
    definition: "Infrastructure as a Service: a cloud model in which the provider supplies fundamental compute, storage and network resources.",
    details: "In an IaaS model:\n* **What the provider manages:** Physical servers, hypervisors, physical storage systems and physical network components (datacenter).\n* **What the customer manages:** Operating systems (OS), middleware, application runtimes, data and the applications themselves.\n* **Examples:** AWS EC2, Google Compute Engine (GCE), Microsoft Azure VM.\n* **Security Implications:** The customer is responsible for host hardening, installing OS patches and configuring the virtual network firewalls (e.g. Security Groups).\n\n* **Focused Mini-Example:** A company launches three virtual machines on Amazon EC2 (**IaaS**) to host a database. The company must manually install the Linux OS security patches and configure the Security Groups to restrict access to the database port, while Amazon only takes care of the physical maintenance of the hardware and the hypervisor.",
    examTip: "On the exam, in IaaS the customer has the highest level of administrative control and the greatest security responsibility compared to the other cloud models.",
  },
  PaaSCloud: {
    name: "PaaS",
    definition: "Platform as a Service: a model in which the provider supplies a ready-to-use runtime and development environment without having to manage the underlying hardware and operating systems.",
    details: "In a PaaS model:\n* **What the provider manages:** All the hardware, virtualization, operating systems, middleware and backend databases.\n* **What the customer manages:** The code of their own applications and the access/operation configurations of the application.\n* **Examples:** Heroku, Google App Engine, AWS Elastic Beanstalk.\n* **Security Implications:** The security of the operating system and system patches is entirely managed by the cloud provider. The customer must focus only on the security of the code (Application Security, OWASP Top 10) and on identity and access management (IAM).\n\n* **Focused Mini-Example:** A team of developers uploads the code of a Node.js application to Google App Engine (**PaaS**). They do not have to worry about configuring web servers, Linux or patching the OS (managed by Google), but they must protect the application from SQL Injection vulnerabilities in their code.",
    examTip: "In PaaS, the customer does not handle OS patching or the base network infrastructure; their focus is solely on the security of the code and data.",
  },
  FaaSCloud: {
    name: "FaaS",
    definition: "Function as a Service: a serverless cloud model in which the provider runs individual blocks of code (functions) triggered by specific events.",
    details: "In a FaaS model (also known as Serverless):\n* **What the provider manages:** Physical servers, virtualization, operating systems, automatic scaling of resources (from zero to thousands and vice versa) and management of the code-execution runtime.\n* **What the customer manages:** Only the source code of the function and its triggers/access permissions (IAM).\n* **Examples:** AWS Lambda, Google Cloud Functions, Azure Functions.\n* **Security Implications:** The customer does not have to configure OS hardening or server security patches, but the attack surface shifts entirely to the APIs, the logical vulnerabilities of the function code and a correct and rigorous configuration of the IAM permissions to avoid unauthorized access to other resources.\n\n* **Focused Mini-Example:** A company implements a system in which, every time a user uploads a photo to the cloud, a function on AWS Lambda (**FaaS**) is triggered to resize it automatically. The company only pays for the actual milliseconds of the function's execution, without managing any web server.",
    examTip: "On the CompTIA exam, the FaaS (Serverless) model shifts almost the entire infrastructure responsibility to the cloud provider, leaving the customer only the responsibility for the code and the access permissions.",
  },
  SaaSCloud: {
    name: "SaaS",
    definition: "Software as a Service: a model in which the provider distributes a complete, ready-to-use application accessible via web/API.",
    details: "In a SaaS model:\n* **What the provider manages:** The entire technology stack, from the hardware to the software licenses, from application maintenance to the databases.\n* **What the customer manages:** Only user access, basic usage configurations and the protection/classification of the data entered into the application.\n* **Examples:** Microsoft 365, Google Workspace, Salesforce.\n* **Security Implications:** The customer has minimal or no control over the security of the application itself, having to rely on the provider's third-party certifications (e.g. SOC 2, ISO 27001). However, they must apply strong authentication policies (MFA, complex passwords) to protect the accounts.\n\n* **Focused Mini-Example:** A company adopts Microsoft 365 (**SaaS**) for email. The company's IT administrator cannot modify the security settings of Microsoft's mail servers, but configures mandatory multi-factor authentication (MFA) for all employees to avoid unauthorized access to the mailboxes.",
    examTip: "Even in the SaaS model, the ultimate responsibility for the corporate data, its classification and the governance of access remains entirely the customer's.",
  },
  SharedResponsibilityCloud: {
    name: "Shared Responsibility Model",
    definition: "The fundamental cloud-computing framework that clearly outlines which security controls belong to the provider and which to the customer.",
    details: "The cornerstone principle distinguishes between:\n* **Security OF the Cloud (the Provider's):** Physical protection of the datacenters, global hardware infrastructure, virtualization hypervisor, security of the native services provided.\n* **Security IN the Cloud (the Customer's):** Protection of the stored data, encryption (client-side and server-side), patches of the guest operating systems, identity and access management (IAM), software firewall rules, security of the app's code.\n* **Dynamic split:** The dividing line shifts upward as you move from IaaS, to PaaS, up to SaaS.\n\n* **Focused Mini-Example:** In compliance with the **Shared Responsibility Model**, if a cloud-hosted database server is breached because the IT administrator left the access port open to everyone without a password, the blame falls on the customer (security 'in' the cloud), not on the cloud provider that guarantees the power and physical security of the datacenter.",
    examTip: "Remember that the physical security of the hardware and the security of the physical data centers always remain exclusively the Cloud Provider's responsibility.",
  },
  ResponsibilityMatrixConcept: {
    name: "Responsibility matrix",
    definition: "A formal document that clearly defines the security, compliance and operational roles and responsibilities between the different parties involved in a cloud service agreement (such as the provider, the customer and the end user). It is not an architectural model.",
    details: "The responsibility matrix (often mapped through RACI models) clarifies who must manage, approve or supervise each aspect in a cloud environment. It is a crucial tool to avoid security gaps caused by misunderstandings about who should apply a specific patch, monitor the logs or manage the backups.",
    examTip: "Remember that the Responsibility Matrix is NOT an architecture model, but a contractual and operational document that maps who is responsible for which security and operational controls in the cloud.",
  },
  MonolithicArchitecture: {
    name: "Monolithic",
    definition: "Monolithic Architecture: a software development model in which the entire application (user interface, business logic and data access) is designed and executed as a single cohesive and indivisible program.",
    details: "Characteristics of monolithic architectures:\n* **Single block:** All the code resides in a single codebase and is compiled/deployed together on a single server or cluster.\n* **Initial simplicity:** Easy to develop, test and deploy initially for small projects.\n* **Security challenges:** If an attacker manages to exploit a single weakness in the user-interface code, they immediately gain access to the entire monolith, including the sensitive data, because the application runs with the same set of OS permissions.\n* **Operational disadvantages:** Difficult to scale horizontally (the entire monolith must be replicated) and vulnerable to global outages (a single bug can crash the entire application).",
    examTip: "In monolithic architectures, the compromise of a single component of the application exposes the entire system to breach due to the lack of logical boundaries and process isolation.",
  },
  MicroservicesArchitecture: {
    name: "Microservices",
    definition: "Microservices Architecture: an architectural approach in which a complex application is divided into a collection of small, independent, decentralized and loosely coupled services.",
    details: "Advantages and requirements of microservices:\n* **Process isolation:** Each microservice performs a specific business function (e.g. cart, authentication, payments), has its own dedicated database and communicates through lightweight APIs.\n* **Security robustness:** If one microservice (e.g. product catalog) is compromised, the attacker is isolated within that microservice and has no direct access to the payments or users microservice, mitigating lateral movement.\n* **Independent scalability:** It allows only the individual services that need it to be scaled horizontally.\n* **Complexity:** It introduces complex network challenges, management of authentication tokens and the need for API inspection.",
    examTip: "The Microservices architecture reduces the blast radius of a compromise, ensuring that the failure or breach of one service does not automatically propagate to the others.",
  },
  APIArchitecture: {
    name: "API",
    definition: "Application Programming Interface: a set of definitions and protocols that allow different software modules or microservices to communicate, exchange data and integrate with each other in a structured and secure way.",
    details: "The role of APIs in modern architectures:\n* **Data interchange:** They constitute the connective tissue of microservices and cloud applications, typically implemented through REST protocols (JSON over HTTPS) or gRPC.\n* **Attack surface:** They represent a primary target for attackers (e.g. OWASP API Security attacks, such as unrestricted resource consumption caused by missing rate limiting).\n* **API Protection:** They require the rigorous use of API Keys, robust authentication tokens (such as OAuth/JWT), transit encryption (TLS) and API Gateway solutions with rate limiting to prevent abuse and DoS attacks.",
    examTip: "APIs expose programmatic functionality externally: to protect them, it is essential to apply channel encryption (HTTPS), token-based authentication (JWT/OAuth) and traffic-limiting filters (Rate Limiting).",
  },
  ServerlessArchitecture: {
    name: "Serverless",
    definition: "Serverless Architecture: a cloud execution model in which the cloud provider entirely manages the allocation of compute resources and the on-demand execution of code, relieving the developer of any server management.",
    details: "Characteristics of the Serverless architecture:\n* **No servers to manage:** The infrastructure abstraction is complete. There are no virtual machines to configure, update or protect with OS-level patches.\n* **Provider-managed automatic scalability:** The system scales instantly and dynamically from zero to thousands of concurrent executions based on the actual traffic. It is not, however, *infinite* scalability: every provider enforces concurrency quotas and per-execution duration limits that must be known and monitored.\n* **Pay per use:** Costs are calculated exclusively on the actual execution time (per millisecond) and the number of requests, eliminating idle costs (servers on but unused).\n* **Associated services:** It does not include only compute (FaaS, such as AWS Lambda), but also serverless databases (e.g. DynamoDB), object storage (e.g. S3) and messaging queues.",
    examTip: "The Serverless architecture eliminates the need to install guest-OS patches, transferring this burden entirely to the cloud provider and redefining the shared responsibility matrix.",
  },
  HypervisorConcept: {
    name: "Hypervisor",
    definition: "Hypervisor (or Virtual Machine Monitor - VMM): the base software, firmware or hardware that creates, runs and manages virtual machines (VMs), controlling the allocation and isolation of the underlying physical resources.",
    details: "Fundamental types of Hypervisor:\n* **Type 1 (Bare-Metal):** Runs directly on the host's physical hardware without an underlying operating system. It is the most secure, performant and efficient solution used in corporate data centers and in the cloud. Examples: VMware ESXi, Microsoft Hyper-V, KVM.\n* **Type 2 (Hosted):** Runs as an application within a pre-existing host operating system. Less performant and less secure, ideal for local development environments. Examples: VirtualBox, VMware Workstation.\n* **VM Escape Risk:** The most serious security threat for a hypervisor, in which an attacker inside a guest virtual machine manages to exploit a hypervisor vulnerability to break out of the VM's isolated environment and execute code on the host system or on the other co-located VMs.",
    examTip: "The Type 1 (Bare-metal) Hypervisor offers superior performance and more robust security isolation than Type 2, because it eliminates the attack surface associated with an intermediate host operating system.",
  },
  VirtualMachineConcept: {
    name: "Virtual Machine (VM)",
    definition: "Virtual Machine: the complete software emulation of a physical computer that runs a guest operating system and its applications completely independently on shared hardware resources.",
    details: "Characteristics and advantages of VMs:\n* **Complete isolation:** Each VM has its own complete OS kernel, a RAM partition, virtual storage space and virtual CPUs (vCPUs) that the hypervisor schedules onto physical cores shared with the other VMs.\n* **Hardware consolidation:** It allows dozens of different servers (Linux, Windows) to run on the same physical hardware server, optimizing resource usage.\n* **Portability:** VMs can be easily saved as files (OVA/OVF format), replicated, copied and moved between different hosts.",
    examTip: "Virtual Machines (VMs) offer the highest level of software isolation for running workloads, because each environment runs a completely independent OS kernel.",
  },
  GuestOSConcept: {
    name: "Guest OS",
    definition: "Guest Operating System: the operating system installed and run inside a virtual machine or a logical partition managed by a hypervisor.",
    details: "The security of the Guest OS in the infrastructure:\n* **Kernel independence:** The Guest OS acts as if it had dedicated physical hardware, ignoring the presence of other VMs co-located on the same host.\n* **Customer responsibility:** In the IaaS cloud model, the patching, hardening of local policies, installation of antivirus and configuration of the Guest OS's local firewall are the exclusive responsibility of the user/customer, not the cloud provider.\n* **Examples:** A Windows Server 2022 or an Ubuntu Linux distribution run as a VM inside an ESXi host.",
    examTip: "The security and updating (patching) of the guest operating system (Guest OS) inside cloud virtual machines fall entirely under the responsibility of the customer/user.",
  },
  HostOSConcept: {
    name: "Host OS",
    definition: "Host Operating System: the main operating system that runs directly on the physical hardware of a server or computer, responsible for hosting Type 2 hypervisors or containerization engines.",
    details: "The role of the Host OS in overall security:\n* **Single point of control:** It provides the base system services, hardware driver management and physical access to the machine's resources.\n* **Critical vulnerability:** If the Host OS is compromised, all the containers (Docker) or hosted virtual machines (Type 2) running on it are instantly compromised, because the attacker gains access to the kernel or the underlying physical storage system.\n* **Mandatory hardening:** It requires extremely rigorous log monitoring, the removal of superfluous software and continuous patching of the Host OS kernel.",
    examTip: "In container-based architectures (such as Docker), the host operating system (Host OS) shares its kernel with all the containers running on it, making its protection the cornerstone of the security of the entire server.",
  },
  ContainerConcept: {
    name: "Container",
    definition: "Container: a lightweight OS-level virtualization technology that allows an application and all its dependencies (libraries, configuration files) to be packaged into a single isolated and executable image.",
    details: "Characteristics of Containers compared to VMs:\n* **Kernel Sharing:** Unlike virtual machines, containers do not include an entire guest operating system; instead they share the Host OS kernel, isolating themselves at the software level through kernel constructs (such as namespaces and cgroups on Linux).\n* **Efficiency and lightness:** They are a few megabytes in size, start in fractions of a second and consume very little RAM/CPU compared to VMs.\n* **Container Escape Risk:** The security threat in which an attacker manages to exploit a local vulnerability of the shared kernel or a bad configuration of the container's privileges to 'escape' and gain root access on the Host OS.",
    examTip: "Containers provide lightweight virtualization by sharing the Host OS kernel, which makes them very efficient but with a lower level of security isolation than traditional virtual machines.",
  },
  DockerConcept: {
    name: "Docker",
    definition: "Docker: the most widespread open-source containerization platform and runtime globally, used to create, distribute and run applications inside standardized containers.",
    details: "The security and operation of Docker:\n* **Docker Engine:** The system daemon that manages the entire lifecycle of containers, images, virtual networks and storage volumes on the Host OS.\n* **Docker Registry:** Public or private databases (such as Docker Hub) used to store and download container images. Images uploaded by unknown third parties may contain malware or preinstalled vulnerabilities (they require image security-inspection and scanning tools).\n* **Security Best Practices:**\n  - Never run the container processes as the `root` user.\n  - Perform automated image scanning (Vulnerability Scanning) to detect vulnerable software libraries before deployment.\n  - Configure resources as read-only (Read-Only Root Filesystem) where possible to block hostile changes to the running container.",
    examTip: "To protect Docker environments, always apply the least-privilege principle by configuring containers to run with non-root users and scan the images to detect vulnerabilities before deployment.",
  },
  CostCloud: {
    name: "Cost",
    definition: "Security and Infrastructure Cost: the overall economic assessment (Total Cost of Ownership - TCO) associated with the design, implementation, management and maintenance of security measures and IT resources.",
    details: "The analysis of security costs involves:\n* **Security balancing:** The cost of implementing a security control should never exceed the monetary value of the asset it is intended to protect.\n* **TCO (Total Cost of Ownership):** It includes the costs of purchasing software/hardware, annual licenses, employee training, energy consumption, air conditioning and specialized personnel costs for management.\n* **Economic transition:** The move to the cloud completely restructures the organization's cost management, replacing large initial capital expenditures (CapEx) with a model of recurring operational expenditures (OpEx) based on real consumption.",
    examTip: "Financial security planning requires calculating the return on investment (ROI) of the controls and ensuring that the cost of the countermeasures is proportionate to the value of the protected assets.",
  },
  CAPEXCloud: {
    name: "CAPEX",
    definition: "Capital Expenditure: the initial long-term funds and investments used by an organization to purchase, upgrade and maintain tangible physical assets such as servers, storage, network hardware and data center infrastructure.",
    details: "Characteristics of CapEx in IT:\n* **Heavy initial investment:** It requires the immediate outlay of large financial capital even before the service or application is operational.\n* **Amortization and depreciation:** The purchased hardware constitutes a company asset that depreciates over time (typically in 3-5 years).\n* **Typical of the On-premises model:** The purchase of industrial air conditioners, diesel generators, physical network switches, fences and physical servers falls entirely under the CapEx classification.",
    examTip: "The construction and setup of a private on-premises physical data center constitutes a classic capital expenditure (CapEx) due to the large initial hardware investment required.",
  },
  OPEXCloud: {
    name: "OPEX",
    definition: "Operational Expenditure: the ongoing, recurring costs associated with the ordinary management of the business and the day-to-day IT infrastructure, paid on a recurring basis.",
    details: "Characteristics of OpEx in IT:\n* **Consumption-based model:** Services are paid in the form of monthly fees, subscriptions or billed based on the resources actually consumed per minute or hour.\n* **Flexibility and scalability:** It allows the organization to increase or reduce IT resources instantly based on market needs, paying only for what is actually needed (pay-as-you-go).\n* **Typical of Cloud Computing:** The expenses for using IaaS cloud instances (e.g. AWS Lambda or EC2 virtual machines), the subscription to SaaS services (e.g. Microsoft 365) and the internet connectivity fee fall entirely under the OpEx classification.",
    examTip: "Cloud Computing transforms the financial management of corporate IT by shifting costs from large initial capital expenditures (CapEx) to flexible, recurring operational expenditures (OpEx).",
  },
  IaCArchitecture: {
    name: "Infrastructure as Code (IaC)",
    definition: "The practice of defining and provisioning infrastructure (networks, virtual machines, firewall rules, permissions) through versioned configuration files rather than manual console configuration.",
    details: "**Infrastructure as Code** is an explicit item in objective 3.1 and it changes how security is applied to infrastructure.\n* **The principle:** infrastructure becomes a code artifact. You write a file (Terraform, CloudFormation, Ansible) describing the desired state, and the tool makes it so.\n* **Security benefits:** **repeatable, identical** configurations across environments (no more 'production was set up differently'), peer review before anything is applied, a full change history in Git, the ability to scan the configuration for mistakes *before* the infrastructure exists, and fast recovery after a disaster by re-running the code.\n* **It counters configuration drift:** because the desired state is declared, any manual deviation is detectable and can be corrected by reapplying the code.\n* **The downside:** a mistake in the code replicates instantly across the whole estate; and a secret written in cleartext in an IaC file ends up in the repository history, where it remains even after being removed.\n\n* **Focused Mini-Example:** A team needs to replicate the production environment for testing. Instead of hand-building 40 resources (and risking a forgotten firewall rule), they run the same Terraform file with a different parameter: the test environment comes up identical to production, security settings included.",
    examTip: "On the exam, IaC is the answer when the scenario asks for **consistency and repeatability** of configurations or how to counter *configuration drift*. Remember the two golden rules: secrets are NEVER written into IaC files (use a vault or a secret-management service), and IaC code must be security-scanned exactly like application code.",
  },

  /* ---- Group 2: Network Security ---- */
  Layer1Physical: {
    name: "Layer 1",
    definition: "Layer 1 (Physical Layer): the first layer of the OSI model, responsible for transmitting and receiving unstructured bit streams over a physical medium (cables, radio signals, optical fiber).",
    details: "Main characteristics:\n* **Data unit:** Bits.\n* **Function:** It defines the electrical, mechanical, optical and functional specifications of the physical medium, including voltage levels, connector pinouts, cable types and wireless frequencies.\n* **Typical devices:** Hubs, repeaters, network cables (UTP/fiber), transceivers, network cards (at the physical level).\n* **No filtering:** It has no logical intelligence to analyze MAC, IP or port addresses.",
    examTip: "On the exam, remember that Layer 1 (Physical Layer) deals exclusively with the physical transmission of bits over cables or radio frequencies, with no logical visibility of the data.",
  },
  Layer2DataLink: {
    name: "Layer 2",
    definition: "Layer 2 (Data Link Layer): the second layer of the OSI model, responsible for the reliable transfer of data across the physical medium, managing frames and MAC addresses.",
    details: "Main characteristics:\n* **Data unit:** It handles frames.\n* **Physical addressing:** It uses MAC (Media Access Control) addresses to uniquely identify devices on the same local network (LAN).\n* **Typical devices:** Network switches typically operate at this layer, routing frames to the specific port based on the MAC address table (CAM table).\n* **Protocols:** Ethernet, Wi-Fi (802.11), PPP and ARP (which maps IP to MAC).",
    examTip: "On the exam, remember that Layer 2 of the OSI model manages frames and MAC addresses, and that traditional switches operate at this layer.",
  },
  Layer3Network: {
    name: "Layer 3",
    definition: "Layer 3 (Network Layer): the third layer of the OSI model, focused mainly on logical addressing, routing of data and fragmentation of packets between different networks.",
    details: "Main characteristics:\n* **Data unit:** It handles packets.\n* **Logical addressing:** It uses IP addresses (IPv4 and IPv6) to identify devices across geographically distant networks.\n* **Typical devices:** Routers operate at this layer to determine the best path (routing) that the data must follow to reach the final destination.\n* **Protocols:** IP, ICMP, IPSec, IGMP.",
    examTip: "Layer 3 (Network Layer) deals with logical IP addressing and packet routing across different networks, with routers as the main devices.",
  },
  Layer4Transport: {
    name: "Layer 4",
    definition: "Layer 4 (Transport Layer): the fourth layer of the OSI model, responsible for the reliable and transparent transfer of data between source and destination hosts, managing port numbers and connection-oriented communication.",
    details: "Main characteristics:\n* **Key protocols:** TCP (Transmission Control Protocol, reliable and connection-oriented) and UDP (User Datagram Protocol, unreliable and connectionless).\n* **Port numbers:** It uses ports (e.g. port 80 for HTTP, 443 for HTTPS) to identify specific applications or services on the destination devices.\n* **Devices and filtering:** Network appliances that operate at this layer (such as traditional firewalls or L4 load balancers) filter and manage traffic based on source/destination IP addresses and their port numbers.",
    examTip: "Layer 4 deals with the TCP/UDP protocols, port numbers and connection-oriented communication. Devices operating at this layer manage traffic based on IP and ports.",
  },
  Layer5Session: {
    name: "Layer 5",
    definition: "Layer 5 (Session Layer): the fifth layer of the OSI model, responsible for establishing, maintaining, synchronizing and terminating connection sessions between applications running on different devices.",
    details: "Characteristics and limits:\n* **Main function:** It manages the dialogue between applications (dialogue-control mechanisms, full-duplex, half-duplex) and inserts checkpoints to resume transmission in case of interruptions.\n* **No IP/Port filtering:** Unlike the lower layers (Layer 3 and Layer 4), Layer 5 does not deal with routing packets or filtering traffic based on IP addresses and port numbers.\n* **Associated protocols:** NetBIOS, RPC (Remote Procedure Call), PPTP, SOCKS.",
    examTip: "On the exam, remember that Layer 5 (Session Layer) establishes and terminates application connections between devices, but does NOT handle filtering based on IP or port numbers.",
  },
  Layer6Presentation: {
    name: "Layer 6",
    definition: "Layer 6 (Presentation Layer): the sixth layer of the OSI model, responsible for the translation, formatting, encryption and compression of data to ensure its correct interpretation by the application layer.",
    details: "Main characteristics:\n* **Key functions:**\n  - *Translation:* Converts data between different representation formats (e.g. from EBCDIC to ASCII).\n  - *Encryption and Decryption:* Manages encryption (such as application-level data encryption or the SSL/TLS protocols historically associated with this layer).\n  - *Compression:* Reduces the size of files to optimize transmission.\n* **Typical formats:** JPEG, GIF, PNG, MP3, MPEG, ASCII, Unicode, TLS/SSL (function).",
    examTip: "Layer 6 (Presentation Layer) deals with 'how' the data is presented and formatted, including the processes of application encryption, compression and character translation.",
  },
  Layer7Application: {
    name: "Layer 7",
    definition: "Layer 7 (Application Layer): the seventh and final layer of the OSI model, which provides a direct interface between the user's software applications and the underlying network services.",
    details: "Main characteristics:\n* **Function:** It allows programs (web browsers, email clients, FTP clients) to interact with the network. It manages user authentication, identification of communication partners and resource availability.\n* **Devices and inspection:** Advanced security appliances such as Next-Generation Firewalls (NGFW) and Web Application Firewalls (WAF) operate up to this layer through Deep Packet Inspection (DPI).\n* **Key protocols:** HTTP, HTTPS, FTP, SMTP, DNS, DHCP, SSH, Telnet, POP3, IMAP.",
    examTip: "On the exam, Layer 7 (Application Layer) is the layer closest to the end user. Devices that analyze application traffic (such as WAF and NGFW) operate at this layer to block complex attacks such as SQL Injection.",
  },
  RoutersConcept: {
    name: "Routers",
    definition: "Network devices operating at the network layer (Layer 3 of the OSI model), responsible for routing data packets between different networks and correctly directing traffic on the Internet.",
    details: "Routers connect distinct networks (for example, the local office LAN with the external WAN of the Internet) and route data by examining the destination IP address within each packet against their dynamic or static routing tables. Although they can be configured with access control rules (ACL) and Network Address Translation (NAT) mechanisms to map private addresses to public IPs, their fundamental purpose is network connectivity and the logical routing of packets, and they do not intrinsically hide the origin of requests at the same level as an application proxy.",
    examTip: "The router's **defining** function is at **Layer 3**: logical IP addressing and routing between different networks. **Do not read that as a hard limit, though:** a real router also applies **ACLs** filtering on TCP/UDP ports, which is **Layer 4** information, and performs NAT. On the exam, if the question asks at which layer a router *primarily operates*, the answer is 3; if it asks whether it can filter by port, the answer is yes.",
  },
  ProxyServerConcept: {
    name: "Proxy server",
    definition: "An intermediary server positioned between the client and the destination server: the client no longer contacts the resource directly but goes through the proxy, which forwards the request on its behalf and returns the response.",
    details: "The proxy server acts as a relay. It receives requests from internal clients destined for the Internet and forwards them to the remote servers using its own public IP address. This process masks the internal IP address of the original client â€” a technical side effect of going through it, not the reason a proxy is deployed in an enterprise, which is **control**: filtering, inspecting, logging and enforcing policy from a single point. It also providing a level of privacy, anonymity and protection. It also allows caching of web resources to optimize performance, as well as facilitating content filtering and security inspection of outbound traffic.",
    examTip: "**In an enterprise a proxy is not about anonymity, it is about control.** Because all traffic passes through a single point, that point can **filter** by category and reputation, **inspect** content, **log** who visited what, apply **DLP** and, with TLS inspection, look inside HTTPS. Masking the source address is a technical consequence of going through it, not its purpose.\n* **The two directions, not to be confused:** a **forward proxy** sits in front of the *clients* and controls what goes out; a **reverse proxy** sits in front of the *servers* and protects what comes in, with load balancing, TLS termination and often WAF functions. **Exam trap:** if the scenario is about enforcing browsing policy and having one log across several sites, it is a forward proxy or a Secure Web Gateway; if it is about protecting and balancing a published application, it is a reverse proxy.",
  },
  JumpServerConcept: {
    name: "Jump server",
    definition: "A hardened, highly secure server used by system administrators as a mandatory, controlled entry point to connect to and manage devices located in a different or more protected security zone.",
    details: "The jump server (also known as a bastion host) facilitates secure administrative access to an isolated environment (for example, a DMZ or an internal production network). Administrators first connect to the jump server through a secure protocol (such as SSH or RDP with multi-factor authentication) and, from there, can make a second connection ('jump') to the internal destination servers. It is not designed to act as a generic proxy or to forward and mask end users' daily internet browsing.",
    examTip: "The Jump server serves exclusively to facilitate and control secure administrative access to protected networks, unlike a proxy server which is designed to mask and forward clients' general requests to the internet.",
  },
  NACNet: {
    name: "NAC",
    definition: "Network Access Control: a hardware/software security solution that controls and limits physical or logical access to the corporate network.",
    details: "Operation and requirements:\n* **Posture Assessment:** When a device tries to connect to the network, NAC examines the host's security state (presence of an active antivirus, up-to-date OS patches, firewall enabled).\n* **Agent-based vs Agentless:** It can use software installed on the device (Agent) or perform web-based checks without installation (Agentless).\n* **Quarantine:** If the device fails the posture check, NAC restricts its access by redirecting it to a dedicated quarantine VLAN, allowing only access to update servers to update the host before readmitting it.\n\n* **Focused Mini-Example:** An external consultant connects their laptop to the meeting-room ethernet port. The **NAC** system detects that the laptop's antivirus has not been updated for months and immediately confines it to a quarantine VLAN, preventing access to the corporate production servers.",
    examTip: "NAC prevents the entry of vulnerable, infected or non-compliant devices into the internal corporate network, instantly isolating them in a corrective VLAN.",
  },
  IDSSolutionConcept: {
    name: "IDS solution",
    definition: "Intrusion Detection System (IDS): a passive security device or software that monitors network traffic or system activity looking for malicious behavior or policy violations, generating alerts for administrators.",
    details: "IDS are mainly divided into:\n* **NIDS (Network-based IDS):** They analyze the network packets that transit on a LAN segment (often through SPAN ports or physical TAPs) to identify attack patterns.\n* **HIDS (Host-based IDS):** Installed on individual endpoints (servers or workstations) to monitor local logs, system calls and changes to critical files.\n* **Detection methodologies:**\n  - *Signature-based:* They compare the traffic with a database of known attack signatures.\n  - *Anomaly-based:* They detect anomalous deviations from a behavior baseline previously learned through statistical algorithms.\n\n* **Focused Mini-Example:** An administrator receives a real-time notification from the network's **NIDS**. The IDS identified a continuous flow of packets containing the known signature of an SSH exploit attempt, allowing the security team to promptly investigate the origin host.",
    examTip: "An IDS is a **passive** (out-of-band) tool, fed by a SPAN port or a TAP, that detects and alerts without interrupting traffic, unlike an **IPS**, which sits **in-line** and can drop packets. **The edge case questions exploit:** what separates the two is not the product but the **placement** and the **configuration**. Almost every commercial IPS can be put into **detection-only mode**, in which case it behaves as an IDS; conversely, an IPS attached to a SPAN port **blocks nothing**, because the traffic does not pass through it. If a scenario asks who can **stop** the attack, look for the device **in line** with the traffic, not for the name on the label.",
  },
  IPS_New: {
    name: "IPS",
    definition: "Intrusion Prevention System: an active network security device placed in-line that monitors traffic to block threats in real time.",
    details: "Characteristics:\n* **In-line:** It is physically placed in the traffic path, allowing it to block threats by discarding packets before they hit the victim.\n* **Inspection:** It uses signatures, heuristics and anomaly analysis to detect attacks and malicious traffic.\n* **Difference from IDS:** The IDS is passive (it only receives a copy of the traffic) and sends alerts; the IPS is active and intervenes by blocking the connections.",
    examTip: "An IPS sits **in-line** and can block in real time; an IDS watches a copy of the traffic and only warns. **Two consequences the exam tests.** First: being in line, an IPS is a **potential point of failure**, and a **false positive becomes an outage**, because it drops legitimate traffic - which is why many deployments start in detection-only mode and move to blocking once the rules are tuned. Second: an IPS can be **configured not to block**, in which case it is an IDS in all but name. The question to ask is not what the product is called but whether the traffic passes through it and whether the device is allowed to drop it.",
  },
  PassiveMode_New: {
    name: "Passive mode",
    definition: "An operational mode in which a security system (e.g. IDS or scanner) monitors and analyzes traffic passively without interfering or blocking.",
    details: "Details:\n* **Out-of-band:** The passive device receives a mirror copy of the network traffic through a physical TAP or a SPAN port (Mirror Port) of the switch.\n* **No impact:** It introduces no latency into the corporate network and, in case of sensor failure, does not interrupt connectivity.\n* **Limitation:** It can only generate alarms or log activity for later analysis, but cannot actively block the ongoing attack.",
    examTip: "Passive mode (or out-of-band) allows systems such as the IDS to analyze a copy of the traffic without introducing latency or points of failure into the production network.",
  },
  IPSecNet: {
    name: "IPSec",
    definition: "Internet Protocol Security: a suite of standardized network protocols that encrypts and authenticates IP packets at Layer 3 of the OSI model.",
    details: "The suite is composed of three fundamental elements:\n* **AH (Authentication Header):** Provides data integrity, authentication of the packet's origin and anti-replay protection. It does **NOT provide encryption** (the data remains in the clear).\n* **ESP (Encapsulating Security Payload):** Provides data encryption (confidentiality) in addition to origin authentication and integrity.\n* **IKE (Internet Key Exchange):** The protocol used to negotiate security associations (SA) and exchange cryptographic keys.\n* **Modes of use:**\n  - *Transport Mode:* Encrypts only the payload of the IP packet (the original IP header remains in the clear). Typically used host-to-host.\n  - *Tunnel Mode:* Encrypts the entire original IP packet and adds a new external one. Typically used for Site-to-Site VPNs.\n\n* **Focused Mini-Example:** To securely connect two datacenters, the engineers configure an IPSec tunnel by enabling **ESP in Tunnel Mode** to fully encrypt every IP packet in transit, also hiding the original IPs of the internal backend servers.",
    examTip: "If on the exam you are asked about traffic integrity without confidentiality, the answer is AH. If you are also asked about confidentiality, ESP is needed.",
  },
  TLSNet: {
    name: "TLS",
    definition: "Transport Layer Security: the cryptographic protocol that encrypts and authenticates communications above the transport layer (between Layer 4 and Layer 7 of the OSI model, traditionally placed at Layers 5-6), replacing the historic and now insecure SSL (Secure Sockets Layer).",
    details: "Characteristics and applications:\n* **Operation:** It encrypts and protects data in transit over insecure networks by establishing secure communication channels based on asymmetric cryptography for the handshake phase and symmetric cryptography for data transmission.\n* **HTTPS (port 443):** The primary application of TLS applied to the HTTP web protocol.\n* **Digital certificates:** It uses X.509 certificates signed by a Certificate Authority (CA) to guarantee the server's identity before the protected channel is established.\n\n* **Focused Mini-Example:** When a user accesses their home-banking portal, the browser establishes a **TLS 1.3** session marked by the browser's secure-connection indicator and the HTTPS protocol, encrypting the password and the OTP code before transmitting them over the Internet.",
    examTip: "SSL must no longer be used due to serious vulnerabilities (e.g. POODLE); the exam strictly requires the use of modern TLS versions (TLS 1.2 or TLS 1.3). Watch out for the trap: TLS is NOT a Layer 4 protocol (that is TCP); TLS runs on top of TCP.",
  },
  SSHNet: {
    name: "SSH",
    definition: "Secure Shell: a cryptographic protocol used to establish encrypted and secure remote command-line (CLI) terminal sessions on TCP port 22.",
    details: "Main characteristics:\n* **Secure replacement:** It directly replaces Telnet (port 23) and rlogin, which transmit login credentials and text commands in the clear over the network.\n* **Advanced authentication:** In addition to supporting password authentication, it supports asymmetric authentication through public/private keys, eliminating the need to type credentials in the clear.\n* **Port Forwarding (SSH Tunneling):** It allows other insecure network protocols to be encapsulated and encrypted within an SSH session.\n\n* **Focused Mini-Example:** A system administrator connects to a remote Linux server using the PuTTY utility on port 22 through an **SSH** tunnel protected by 4096-bit RSA asymmetric keys, avoiding sending the reboot command in the clear.",
    examTip: "Hardening an SSH port requires disabling password authentication (Password Authentication No) and enforcing only cryptographic keys, as well as prohibiting direct login for the 'root' user (PermitRootLogin No).",
  },
  VPNNet: {
    name: "VPN",
    definition: "Virtual Private Network: a secure, encrypted connection established over a public network (e.g. the Internet) to join a remote device to the corporate network.",
    details: "Characteristics and types:\n* **Purpose:** It allows remote workers or branch offices to securely access the internal resources of the corporate intranet.\n* **Remote Access (Client-to-Site):** It allows a single user to connect temporarily through a VPN client (software) installed on their computer.\n* **Split Tunneling vs Full Tunneling:**\n  - *Full Tunneling:* All network traffic is routed through the corporate VPN. It offers maximum security and log visibility, but requires a lot of bandwidth.\n  - *Split Tunneling:* Only the traffic destined for the corporate network passes through the tunnel; generic Internet traffic exits locally.\n\n* **Focused Mini-Example:** An employee works from home and activates the Cisco AnyConnect app (**VPN**) configured in *Full Tunneling*: from that moment, even if the user browses Facebook or Google, all traffic crosses the corporate network, allowing the corporate IDS to inspect it.",
    examTip: "Full Tunneling ensures that all corporate security controls are applied to all the user's traffic, including ordinary internet traffic, while split tunneling can expose the host to local threats.",
  },
  SiteToSiteVPNNet: {
    name: "Site-to-Site VPN",
    definition: "A permanent VPN connection used to securely join two or more entire geographically distributed networks.",
    details: "Main characteristics:\n* **Operation:** Instead of requiring every single computer to install a VPN client, the connection is established directly between two dedicated VPN gateways or routers located at the respective sites (e.g. headquarters and peripheral branch).\n* **Transparency:** It is completely transparent to the local network's end users, who communicate with the other site as if they were in the same room.\n* **Standard protocol:** Implemented almost exclusively using the IPSec protocol suite to guarantee maximum security and efficiency at Layer 3.\n\n* **Focused Mini-Example:** A company's Milan headquarters and Rome branch are connected by an IPSec-based **Site-to-Site VPN** configured on their respective Cisco border routers. An employee in Rome prints a file on a printer in Milan by entering the local IP `10.0.1.50` completely transparently.",
    examTip: "The Site-to-Site VPN is designed to stably connect entire distant networks through dedicated gateways, without the use of client software on the individual PCs.",
  },
  VPNGateway_New: {
    name: "VPN gateway",
    definition: "A dedicated network device or service that establishes, manages and terminates VPN connections for an organization.",
    details: "Characteristics:\n* **Termination Point:** It receives connections coming from remote clients (Client-to-Site) or from other remote gateways (Site-to-Site).\n* **Encryption and Decryption:** It manages the complex cryptographic computations needed to decrypt the incoming traffic and encrypt the outgoing traffic.\n* **AAA Integration:** It is often integrated with RADIUS or Active Directory systems to verify the credentials and MFA of remote users before granting access.",
    examTip: "The VPN gateway centralizes the management of the encrypted tunnels and the decryption of the remote traffic before injecting it into the company's private local network.",
  },
  VPNConcentratorConcept: {
    name: "VPN Concentrator",
    definition: "A dedicated high-performance hardware device designed specifically to manage and concentrate a very large number of simultaneous VPN tunnels.",
    details: "Characteristics and tasks:\n* **High Performance:** It integrates dedicated cryptographic processors to offload the CPU of ordinary servers or routers (Hardware Acceleration) from the heavy computation of encrypting thousands of sessions.\n* **Scalable Remote Access:** Typically used in large companies to manage the connectivity of thousands of remote employees working from home simultaneously.\n* **Security:** It provides strong authentication, integration with centralized directories (RADIUS/LDAP/Active Directory) and dynamic assignment of internal IP addresses to the connected clients.",
    examTip: "On the exam, when a specific dedicated hardware device capable of scaling and supporting thousands of simultaneous VPN connections of remote employees is required, the correct answer is the VPN Concentrator.",
  },
  SSLTLSTunnelVPNConcept: {
    name: "SSL/TLS VPN",
    definition: "A type of remote-access VPN that uses the standard SSL/TLS protocol (usually through a web browser or lightweight client) to establish secure connections on TCP port 443.",
    details: "Main advantages:\n* **No heavy client:** It allows secure access to corporate resources (often through a web portal) without requiring the installation and configuration of complex proprietary VPN client software.\n* **Ease of transit:** Because it uses TCP port 443 (the same standard HTTPS traffic), it can easily transit through almost all firewalls and public proxies that would block the IPSec protocols.\n* **Granular Access (Portal-based or Tunnel-based):** It can be configured to give access only to specific corporate web applications (Portal mode) rather than to the entire internal subnet (Tunnel mode), reducing security risks.",
    examTip: "The SSL/TLS VPN is the optimal choice to allow external users or personal devices (BYOD) to securely access internal web applications without having to pre-install specific client software on the computer.",
  },
  IPSecTunnelTransportModes: {
    name: "IPSec Tunnel vs. Transport Mode",
    definition: "The two different operational modes with which the IPSec protocol protects and encapsulates data packets at the network level.",
    details: "The key differences are:\n* **Tunnel Mode:** It protects the entire original IP packet. It encrypts both the payload (data) and the original IP headers (source/destination), inserting the resulting packet into a new external IP packet with new headers. It is the mandatory standard for Site-to-Site VPNs and is extremely secure because it hides the internal network topology.\n* **Transport Mode:** It encrypts and protects exclusively the payload of the original IP packet. The initial source/destination IP header remains visible in the clear during transit. It is typically used for direct host-to-host communications within the same protected local network.",
    examTip: "Tunnel mode encrypts the entire original IP packet (including the IP header) and is the standard choice for Site-to-Site VPNs, while Transport mode encrypts only the payload and keeps the original IP header intact.",
  },
  PSKConcept: {
    name: "PSK",
    definition: "Pre-Shared Key: a wireless authentication mode (known as Personal mode) in which all client devices share the same identical secret key or password preconfigured on the access point.",
    details: "Characteristics and limits of PSK:\n* **Simplicity:** Ideal for home or small-office (SOHO) scenarios, because it does not require a dedicated authentication server.\n* **Security Limits:** If an employee leaves, they still have the PSK key and can connect abusively from outside the office. To restore security, the key must be changed manually on all the devices remaining in the organization.\n* **Exposure to attacks:** Under WPA2-PSK, intercepting the initial 4-way handshake allows offline brute-force attacks on the password dictionaries.",
    examTip: "For enterprise corporate networks, avoid using a static PSK and implement RADIUS-server-based authentication (802.1X / WPA Enterprise) to revoke access centrally and individually.",
  },
  WEPConcept: {
    name: "WEP",
    definition: "Wired Equivalent Privacy: the first wireless security protocol introduced by the IEEE 802.11 standard in 1997, now completely deprecated and considered highly insecure.",
    details: "Structural vulnerabilities of WEP:\n* **Weak Encryption:** It uses the RC4 stream cipher with an initialization vector (IV) of only 24 bits transmitted in the clear.\n* **IV Replay:** Due to the reduced length of the IV, in a network with average traffic the IVs repeat rapidly. An attacker can passively capture these packets and reconstruct the secret WEP key in a few minutes using free software.\n* **Lack of Strong Integrity:** It uses a CRC-32 algorithm (Checksum) to verify integrity, which is vulnerable to packet manipulation without the error being detected (bit-flipping).",
    examTip: "On the exam, WEP must be systematically avoided in any context because it is vulnerable to immediate decryption due to the weakness of the initialization vector (IV) and the use of RC4.",
  },
  WPAWirelessConcept: {
    name: "WPA",
    definition: "Wi-Fi Protected Access: an intermediate wireless security protocol introduced in 2003 as an emergency corrective measure to replace WEP without requiring the replacement of the existing hardware.",
    details: "Characteristics of WPA:\n* **TKIP (Temporal Key Integrity Protocol):** It replaces WEP's static key with dynamic keys that change for every single packet, although it still uses the underlying RC4 algorithm.\n* **MIC (Message Integrity Check):** It introduces a stronger frame-integrity algorithm (called Michael) to counter data tampering, in place of WEP's weak CRC-32.\n* **Replacement:** Being a bridging solution, it was soon superseded by WPA2 (which mandates AES and CCMP) and by the modern WPA3 standard.",
    examTip: "WPA was a transitional solution to fix WEP without changing the hardware; on the exam it is nonetheless considered obsolete in favor of WPA2 and WPA3.",
  },
  TKIPConcept: {
    name: "TKIP",
    definition: "Temporal Key Integrity Protocol: a wireless encryption algorithm introduced with WPA to fix the vulnerabilities of the WEP protocol without requiring the purchase of new hardware.",
    details: "How TKIP works:\n* **Dynamic Keys:** It generates a different 128-bit encryption key for each data packet transmitted, preventing the immediate breach typical of WEP.\n* **RC4 Legacy:** Although it rotates the keys, TKIP still relies on the RC4 stream cipher. As a result, it has been declared deprecated and is today entirely replaced by CCMP/AES.\n\n* **Focused Mini-Example:** An old wireless network printer supports only WEP or **WPA-TKIP**. To increase its security without physically replacing it, the administrator enables WPA-TKIP: the protocol implements temporary key rotation, preventing the automatic attacks that afflict WEP.",
    examTip: "TKIP solves the static-key problem of WEP by rotating it dynamically at each packet, but it remains insecure because it relies on the RC4 algorithm.",
  },
  MICConcept: {
    name: "MIC",
    definition: "Message Integrity Check: a message-integrity control algorithm introduced with the TKIP protocol (WPA) to prevent tampering or alteration attacks on wireless packets.",
    details: "How MIC (the Michael algorithm) works:\n* **Tampering Prevention:** It computes on the payload of the wireless frames an integrity value (MIC) derived from a secret key â€” not a cryptographic hash function in the strict sense, but a deliberately lightweight algorithm designed to run on existing WEP hardware â€” that allows confirmation that the packet was not modified in transit by an attacker (e.g. through bit-flipping attacks).\n* **Active countermeasures:** If the access point detects two MIC errors within 60 seconds, it assumes an ongoing attack, disconnects all clients and suspends transmissions for a minute to mitigate the intrusion.",
    examTip: "The MIC guarantees data integrity in TKIP wireless frames, preventing attackers from altering or forging packets in transit.",
  },
  WPA3Net: {
    name: "WPA3",
    definition: "Wi-Fi Protected Access 3: the modern wireless security protocol that replaces WPA2 for protecting Wi-Fi networks.",
    details: "The main new features of WPA3 include:\n* **SAE (Simultaneous Authentication of Equals):** It replaces the handshake based on the static pre-shared key (PSK) of WPA2. It prevents the *offline* dictionary attacks that start from passively capturing the handshake: with SAE the captured material does not let an attacker test candidate passwords off the wire.\n* **Individualized data encryption:** It protects users even on open Wi-Fi networks through opportunistic wireless encryption (OWE).\n* **WPA3-Enterprise:** It requires centralized 802.1X authentication with a RADIUS server and makes Protected Management Frames (PMF) mandatory. It also defines an *optional* 192-bit mode aligned with the CNSA suite, intended for government and defense environments: it is not the default behavior.\n\n* **Focused Mini-Example:** In an office, a Wi-Fi network protected by **WPA3-Personal** is configured: even if the access password is simple, an attacker in the parking lot who passively captures the radio handshake cannot launch offline brute-force attacks to decrypt the other employees' sessions, thanks to the **SAE** protocol.",
    examTip: "SAE is the key technology introduced in WPA3 that eliminates WPA2's vulnerability to passive interception and offline decryption of Wi-Fi passwords.",
  },
  WPA2Net: {
    name: "WPA2",
    definition: "Wi-Fi Protected Access 2: the wireless security protocol based on the AES symmetric encryption algorithm and the CCMP protocol to guarantee confidentiality and integrity for Wi-Fi communications.",
    details: "Characteristics and vulnerabilities:\n* **AES & CCMP:** It uses the robust AES cipher with CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol) which entirely replaces the vulnerable TKIP.\n* **4-way handshake:** It implements the initial negotiation of the session keys. In Personal mode it is exposed to the *offline* dictionary attack: whoever passively captures the handshake can test candidate passwords on their own computer, with no further contact with the network. * **Do not confuse them:** **KRACK** (Key Reinstallation Attack, 2017) is a different problem and does not recover the password; it forces the reinstallation of a key already in use, resetting the nonce, and it is fixed by patching clients and access points.\n* **Modes of Use:** It supports both the Personal version (with a common PSK pre-shared key for all) and the Enterprise version (individual centralized authentication via 802.1X/RADIUS).",
    examTip: "WPA2 uses AES-CCMP to guarantee solid encryption, but it remains vulnerable to offline brute-forcing of the 4-way handshake if a simple Personal password is used.",
  },
  GCMPConcept: {
    name: "GCMP",
    definition: "Galois/Counter Mode Protocol: an advanced wireless encryption protocol used in WPA3 to guarantee both confidentiality and data integrity through authenticated encryption.",
    details: "Main characteristics:\n* **Authenticated Encryption (AEAD):** It simultaneously provides encryption (through AES-GCM) and data authentication in a single computational pass.\n* **Parallelization:** Unlike CCMP (used in WPA2 and in WPA3's baseline mode) which is sequential, GCMP allows parallel data processing, offering significantly higher throughput and lower latency on modern devices.\n* **Robust security:** It reduces vulnerability to replay attacks and fine manipulation of radio packets.",
    examTip: "GCMP (based on AES-GCM) is the cipher of **WPA3-Enterprise's 192-bit mode**, where GCMP-256 is mandatory, and it offers higher throughput and parallelization than WPA2's CCMP. **Do not over-generalize:** WPA3-Personal and baseline WPA3-Enterprise still use **CCMP-128**, exactly as WPA2 does. On the exam, GCMP is the answer when the scenario names the hardened 192-bit suite or government and defense environments, not every time the word WPA3 appears.",
  },
  SAEConcept: {
    name: "SAE",
    definition: "Simultaneous Authentication of Equals: a secure key-agreement method (Dragonfly handshake) used in WPA3-Personal that replaces the pre-shared key (PSK) to protect against interception and offline attacks.",
    details: "How SAE works:\n* **Dragonfly Handshake:** It is based on an elliptic-curve Diffie-Hellman key exchange. It eliminates WPA2's vulnerability to passive interception of the initial access packets.\n* **Zero Offline Dictionary Attacks:** A malicious user who captures the authentication frames cannot launch offline brute-force attacks against the Wi-Fi password, because each session generates unique and independent keys.\n* **Perfect Forward Secrecy (PFS):** If a key is compromised in the future, it cannot be used to decrypt traffic intercepted in the past.",
    examTip: "SAE is the key technology introduced in WPA3-Personal that prevents attackers with radio sniffers from acquiring the handshake and decrypting passwords offline.",
  },
  OpenSystemConcept: {
    name: "Open System",
    definition: "Open System: a wireless configuration in which no credential or cryptographic key is required to connect to the Access Point, leaving the radio transmission unencrypted or protected by OWE.",
    details: "Characteristics and Risks:\n* **Zero Authentication:** Anyone within radio range can associate with the access point without providing a password (e.g. hotel or airport Wi-Fi).\n* **Sniffing Vulnerability:** Because the data transits in the clear over the air, attackers can easily intercept other users' traffic through a packet sniffer.\n* **OWE (Opportunistic Wireless Encryption):** The secure evolution introduced with WPA3 that enables per-client wireless encryption, transparent and active even without an access password, protecting users from passive interception.",
    examTip: "In traditional open networks (Open System) the radio traffic is not protected; the adoption of OWE (WPA3) allows the communication to be encrypted while keeping free access without a password.",
  },
  WPA3PersonalRes: {
    name: "WPA3-Personal",
    definition: "WPA3-Personal: the WPA3 wireless protection mode designed for home networks or small offices, which uses the SAE protocol to protect the key exchange.",
    details: "Characteristics:\n* **Ease of Use:** It requires a single secret password (passphrase) for all users, like the old WPA2-Personal.\n* **Revolutionary Security:** Thanks to SAE, it protects weak users who choose simple passwords, eliminating offline dictionary attacks.",
    examTip: "WPA3-Personal replaces WPA2-Personal by introducing SAE, which makes the **offline dictionary attack impractical**: capturing the handshake no longer yields material against which passwords can be tried at will, because each attempt requires a fresh interaction with the network. A weak password remains attackable online, but at a vastly slower and more detectable rate.",
  },
  WPA3EnterpriseRes: {
    name: "WPA3-Enterprise",
    definition: "WPA3-Enterprise: the WPA3 wireless protection mode intended for organizations, requiring individual authentication through 802.1X against a centralized RADIUS server, with an optional strengthened 192-bit cryptographic suite.",
    details: "Characteristics:\n* **192-bit suite (optional):** WPA3-Enterprise offers a strengthened mode aligned with CNSA, using 192-bit encryption, aimed at government and defense environments. **It is not the default behavior**: baseline Enterprise mode does not mandate it.\n* **802.1X Integration:** It requires personal credentials or digital certificates managed by Active Directory through a RADIUS server.\n* **Mandatory MFP (Management Frame Protection):** It encrypts and protects the wireless management frames from disassociation and fake deauthentication attacks.",
    examTip: "**What defines Enterprise mode is individual identity**, not cipher strength: every user authenticates with their own credentials or a certificate against a **RADIUS** server, so access is revoked per person without changing anything for anybody else. That is the substantive difference from Personal mode, where one key is shared by everyone.\n* **Two technical points:** the **192-bit** suite is an **optional mode** of WPA3-Enterprise (aligned with CNSA), not the default behavior; and WPA3 mandates **Protected Management Frames (PMF)**, which is what blocks deauthentication attacks â€” the ones that work on WPA2 even with a very strong passphrase, because management frames were not authenticated.",
  },
  WiFiBluetoothTech: {
    name: "Wi-Fi & Bluetooth",
    definition: "Wi-Fi (IEEE 802.11) and Bluetooth (IEEE 802.15.1): radio technologies for medium- and short-range connectivity.",
    details: "Specifications and differences:\n* **Wi-Fi (802.11):** Designed to establish high-speed local networks (WLAN) on the 2.4 GHz, 5 GHz and 6 GHz bands. It supports robust encryption mechanisms and is the primary channel for connecting corporate hosts and computers.\n* **Bluetooth (802.15.1):** A very low-power, short-range radio standard (PAN - Personal Area Network) operating at 2.4 GHz to connect peripherals (e.g. headphones, keyboards, health sensors). If left in visible mode without a strong pairing PIN, it is subject to data-theft attacks (Bluesnarfing) or spam (Bluejacking).",
    examTip: "While Wi-Fi (802.11) extends the local network at medium range with strong centralized security, Bluetooth creates short-range personal PAN networks that are vulnerable to local attacks if not securely paired.",
  },
  WirelessSurveyRes: {
    name: "Site Survey & Wireless Survey Tools",
    definition: "Planning and diagnostics of wireless coverage through Site Surveys and Heat Maps.",
    details: "Tools and methodologies:\n* **Site Survey:** The physical and radioelectric analysis of a building's environments aimed at determining the number, ideal placement and frequency bands of the Access Points, preventing interference and limiting signal leakage outside the corporate physical perimeter.\n* **Heat Map:** A colored visual representation that graphically illustrates the Wi-Fi signal strength (usually green/red to indicate strong/weak signal) superimposed on the floor plan of the premises.\n* **Wireless Survey Tools:** Software/hardware spectrum analyzers (e.g. NetSpot, Ekahau, Wi-Fi Analyzer) used to locate saturated channels, find dead zones with no signal and detect abusive Access Points (Rogue AP) or external interference (microwaves, radar).",
    examTip: "The Site Survey supported by Heat Maps is the fundamental process for optimizing the wireless signal strength, ensuring that it does not leak excessively outside the corporate building.",
  },
  RADIUSNet: {
    name: "RADIUS",
    definition: "Remote Authentication Dial-In User Service: a centralized client/server protocol for the AAA (Authentication, Authorization, Accounting) management of network access.",
    details: "Operation and centralization:\n* **Centralization:** It collects authentication requests coming from various Network Access Servers (NAS) such as switches, VPN routers or wireless access points, and validates them against a centralized user database (e.g. Active Directory).\n* **Security:** During the authentication phase, RADIUS encrypts only the password transmitted between the client and the server through a shared key (Shared Secret); the rest of the communication remains in the clear.\n* **802.1X Standard:** RADIUS is the backbone for implementing port-based wireless and wired authentication (Enterprise Wi-Fi).\n\n* **Focused Mini-Example:** An employee connects to the office Wi-Fi network by entering their personal AD credentials; the Wi-Fi Access Point (**RADIUS Client**) forwards the request to a central NPS (**RADIUS Server**) that validates the user's access.",
    examTip: "Unlike TACACS+ (which encrypts the entire body of the packets and is ideal for managing administrators' network appliances), RADIUS encrypts only the password and is more oriented toward general user access.",
  },
  EAPProtocol_New: {
    name: "EAP",
    definition: "Extensible Authentication Protocol: a universal authentication framework used to extend and support different verification methods on wired and Wi-Fi networks.",
    details: "Operation and protocols:\n* **Extensibility:** It allows the adoption of various authentication methods (e.g. passwords, hardware tokens, smart cards or digital certificates) without having to update the physical switches or access points of the network.\n* **Common Exam Variants:**\n  - **EAP-TLS:** Considered the most secure of all; it requires X.509 digital certificates on both the authentication server and the client device (mutual authentication).\n  - **EAP-TTLS:** It requires a certificate only on the server, creating a secure tunnel within which the user can enter their standard password.\n  - **PEAP (Protected EAP):** Developed by Microsoft, Cisco and RSA; it encapsulates another EAP protocol (usually EAP-MSCHAPv2) inside a secure TLS tunnel.",
    examTip: "On the exam, remember that EAP-TLS is the most secure EAP variant because it uses digital certificates at **both ends**, achieving **mutual authentication**: the client proves its identity to the server and the server proves its own to the client, which neutralizes rogue access points. **Beware a common error:** this is **not user MFA**. The server certificate authenticates the *server*; it adds no second factor to the *person*, since both certificates are something you have. Real MFA needs a distinct second user factor, such as a PIN or biometric that unlocks the client's private key.",
  },
  SMTPProtocol: {
    name: "SMTP",
    definition: "Simple Mail Transfer Protocol: the standard protocol for the transmission, sending and routing of emails over IP networks (standard TCP port 25 for server-to-server, 587 for client-to-server).",
    details: "Characteristics and security limits:\n* **Cleartext protocol:** The original SMTP sent all communications and credentials in the clear. Today it is protected through the **STARTTLS** extension (opportunistic TLS) which upgrades the cleartext connection to an encrypted one.\n* **Lack of native authentication:** SMTP has no native mechanisms to verify that the sender stated in the 'From:' header is real, making email spoofing extremely easy. To fix this flaw, corrective protocols such as SPF, DKIM and DMARC were introduced.\n\n* **Focused Mini-Example:** Connor configures his corporate mail client to send emails by setting the **SMTP** server on port 587 with mandatory STARTTLS encryption, ensuring that his access credentials are transmitted securely and encrypted.",
    examTip: "SMTP is the default protocol for the transfer of emails (TCP ports 25 and 587), which requires STARTTLS to protect the communications in transit.",
  },
  MTAConcept: {
    name: "MTA",
    definition: "Mail Transfer Agent: the software component of an email server that receives, accepts, routes and transfers emails from one computer to another using the SMTP protocol.",
    details: "The role of the MTA in the email architecture:\n* **Routing:** When an email is sent, the MTA queries the DNS server to find the MX (Mail Exchanger) record of the recipient's domain and determine the correct server to deliver the message to.\n* **Examples:** Famous software includes Postfix, Sendmail, Microsoft Exchange Server and Exim.\n* **Delivery chain:** The MTA works in synergy with the MUA (Mail User Agent, the mail client) and the MDA (Mail Delivery Agent, which deposits the email in the final mailbox).\n\n* **Focused Mini-Example:** When you send an email from your client, your local mail server receives the message. The **MTA** software (e.g. Postfix) analyzes the recipient's address, performs a DNS MX query to locate the destination server and materially sends the message through SMTP.",
    examTip: "The MTA is the software responsible for the actual transfer and routing of emails between different servers via SMTP.",
  },
  SPFConcept_New: {
    name: "SPF",
    definition: "Sender Policy Framework: a DNS-based email validation protocol that allows domain owners to specify which hosts or IP addresses are authorized to send emails on their behalf.",
    details: "How SPF works:\n* **DNS TXT Record:** The domain owner publishes a DNS TXT record containing the list of authorized servers (e.g. `v=spf1 ip4:192.168.1.1 include:spf.google.com ~all`).\n* **Recipient verification:** When a server receives an email, it extracts the IP of the sending server and checks whether it is present in the SPF record of the stated domain. If it is not present, the message can be marked as spam or rejected.\n* **Limit:** SPF verifies only the sender's envelope address (Return-Path), not the address displayed to the end user in the 'From:' header, making it partially bypassable.\n\n* **Focused Mini-Example:** A hacker tries to send a fraudulent email posing as the company `security.com` using their own server. The recipient's mail server receives the message, consults the **SPF** record of `security.com` in the public DNS and detects that the hacker's server IP is not authorized, blocking or marking the email as phishing.",
    examTip: "SPF helps prevent email spoofing by storing in the domain's DNS TXT records the list of servers and IP addresses formally authorized to send mail.",
  },
  DKIMConcept_New: {
    name: "DKIM",
    definition: "DomainKeys Identified Mail: a cryptographic email-authentication method that allows an organization to digitally sign its outgoing emails, guaranteeing the integrity of the signed parts and the identity of the domain that applied the signature.",
    details: "How DKIM works:\n* **Private and Public Key:** The sending server signs the email (body and main headers) with the domain's private key, inserting the signature into the email header (DKIM-Signature).\n* **DNS Verification:** The recipient server retrieves the corresponding public key by reading the DNS TXT record of the domain named in the signature's `d=` tag (the *signing* domain) and validates the signature.\n* **Integrity and Authenticity:** If the signature is valid, it proves that the message was signed with the private key of the `d=` domain and that the signed parts did not change in transit. It does **not** prove that this domain matches the one shown to the user in the `From` field: what forces that match is DMARC, through its alignment requirement.\n\n* **Focused Mini-Example:** An email is digitally signed by the outgoing SMTP server through the domain's private key. On arrival, the recipient's server performs the cryptographic validation through the public key taken from the **DKIM** record in the sender's DNS, ascertaining that the email has not been tampered with.",
    examTip: "**What DKIM proves:** that the message was signed by the private key of a given domain and that the signed parts â€” selected headers and the body â€” have not changed since signing. The recipient fetches the public key from a DNS record of the signing domain and verifies.\n* **What it does NOT prove, and this is the point the exam tests:** that the signing domain is the same one the user **sees** in the `From` field. An attacker can legitimately sign, with their own domain, a message that displays yours. What forces the two to match is **DMARC**, through its **alignment** requirement.\n* **A practical limit:** a mailing list or a forwarder that alters the subject or body invalidates the signature, and the message comes out `dkim=fail` while being perfectly legitimate. That is why DMARC accepts a pass on **SPF or** DKIM, not necessarily on both.",
  },
  DMARCConcept_New: {
    name: "DMARC",
    definition: "Domain-based Message Authentication, Reporting and Conformance: an email security protocol that unifies SPF and DKIM, allowing domain owners to define how to handle messages that fail authentication.",
    details: "Operation and DMARC policies:\n* **Management policies:** It allows the domain owner to publish a DNS TXT record that tells external mail servers what to do with fraudulent messages that fail both SPF and DKIM. The three provided policies are:\n  - `none`: No action (simple monitoring).\n  - `quarantine`: Moves the non-compliant messages to the spam/quarantine folder.\n  - `reject`: Rejects and completely blocks the delivery of the message.\n* **Reporting:** The receiving servers send periodic telemetry reports to the sender, indicating which IP addresses are sending emails on their behalf and whether they pass or fail the checks.\n\n* **Focused Mini-Example:** To protect its brand from phishing, a company publishes a **DMARC** record with the `p=reject` policy. From that moment, any spoofed email that fails the SPF and DKIM checks is rejected and deleted instantly by mail servers worldwide, protecting the customers.",
    examTip: "DMARC extends and coordinates SPF and DKIM, providing domain owners with reports on brand usage and defining blocking rules (none, quarantine, reject) for the receiving servers in case of failed checks.",
  },
  PhysicalSegmentationConcept: {
    name: "Physical Segmentation",
    definition: "Physical Separation: isolating systems and networks using physical cabling, dedicated switches and completely independent hardware appliances without any electrical or logical interconnection.",
    details: "Physical isolation represents the most secure form of network segregation:\n* **Air-gapping:** It consists of keeping a network completely disconnected from the Internet and any other public or private network, creating an isolation that no software configuration can bypass, because the link simply does not exist. It remains bypassable **physically**, though: removable media, maintenance, insiders - that is how Stuxnet crossed an air gap.\n* **Dedicated hardware:** Use of dedicated, exclusive switches, cabling (copper or fiber) and routers for each class of traffic (e.g. the video-surveillance network shares no wire with the corporate computer network).\n* **Advantages:** Immune from software configuration vulnerabilities or VLAN hopping attacks.\n* **Disadvantages:** High installation and maintenance costs, total lack of flexibility.",
    examTip: "Physical isolation through Air-gapping represents the highest preventive security control for protecting critical industrial or military infrastructure.",
  },
  AirGapConcept: {
    name: "Air gap",
    definition: "Total Physical Isolation: an extreme security measure that consists of keeping a computer, a server or an entire local network completely isolated from the Internet and any other external network, eliminating any type of physical or wireless connection.",
    details: "The fundamental goal of the Air Gap is to ensure that there is no possibility of remote or logical communication with the protected systems:\n* **No Connectivity:** The system has no connected network cards, Wi-Fi antennas, Bluetooth or active mobile-telephony connections.\n* **Controlled Data Transfer (Sneakernet):** Because it is not possible to send data over a network, the only way to transfer information is the manual use of physical removable media (e.g. USB sticks or encrypted external disks), previously scanned and checked to exclude the presence of malware.\n* **Fields of Application:** Classified military networks, nuclear plants and critical industrial systems (SCADA/ICS), main PKI certification servers (Root CA) and offline signing systems for transactions and cryptographic keys (e.g. cryptocurrency cold storage).\n* **Residual Vulnerabilities:** Despite the very high level of security, an air-gapped system can still be infected through insider threats or compromised physical media (e.g. the famous Stuxnet attack through a USB stick). There are also sophisticated academic attacks based on side channels (acoustic amplification of the fans, vibrations, electromagnetic emissions or heat fluctuations) to exfiltrate data from nearby systems.",
    examTip: "An air gap is the choice for ultra-critical systems â€” SCADA industrial controllers, a PKI Root CA â€” and what it removes is the **remote network-borne attack**. **Do not read it as absolute security:** what remains is precisely how such systems are breached in practice â€” the **removable media** somebody must carry in to update them, the **vendor** performing maintenance, and the **insider**. **Stuxnet** is the example to remember: it reached air-gapped plants on USB sticks.\n* **The operational cost, which the exam sometimes asks about:** an isolated system receives no patches, no antivirus signatures and no centralized logging by the ordinary route. An air gap therefore has to come with a formal removable-media procedure, physical security controls and manual log collection â€” otherwise it becomes an unpatched, unmonitored system.",
  },
  LogicalSegmentationConcept: {
    name: "Logical Segmentation",
    definition: "Logical Segmentation: dividing a single physical network infrastructure into multiple independent and protected logical segments using software configurations, VLANs, subnets and firewall rules.",
    details: "Logical segmentation allows traffic to be isolated without the need to duplicate the physical hardware:\n* **Flexibility:** It allows departments and security zones to be reorganized with simple changes to the switch or firewall configurations.\n* **Attack containment:** It limits the lateral movement of malware or an attacker; if a host in the guest VLAN is compromised, the ACLs on the firewall prevent propagation toward the server VLAN.\n* **Technologies:** It is typically achieved through Virtual LANs (VLAN), IP subnets (Subnetting) and Access Control Lists (ACL).",
    examTip: "Logical Segmentation is the optimal strategy on the exam to reduce the blast radius of an attack and prevent lateral movement within the corporate network.",
  },
  VLANConcept: {
    name: "VLAN",
    definition: "Virtual Local Area Network: a data-link-layer (Layer 2) technology that allows multiple logical, isolated local networks to be created on the same physical switch.",
    details: "Characteristics and operation:\n* **Broadcast Isolation:** It reduces broadcast traffic by limiting it exclusively within the single VLAN.\n* **Tagging (802.1Q):** The switch marks the Ethernet frames with a VLAN ID (VLAN Tag) to route them correctly between different switches through the 'Trunk' ports.\n* **Default VLAN:** Typically VLAN 1. It is considered a serious security weakness to leave active ports in the default VLAN, because it exposes to VLAN Hopping attacks (in which an attacker sends double-tagged frames to bypass the boundary of their own VLAN).\n* **Port Hardening:** Always move the management traffic and unused ports to a dedicated VLAN different from the default VLAN 1.",
    examTip: "To mitigate VLAN Hopping attacks, always configure the users' ports as non-negotiable 'Access' ports, disable dynamic trunking (DTP) and assign a dummy Native VLAN for the Trunk ports.",
  },
  Layer3SwitchConcept: {
    name: "Layer 3 Switch",
    definition: "Layer 3 Switch: an advanced network switch that, in addition to forwarding frames at Layer 2 (MAC), is able to route packets at Layer 3 (IP) through dedicated hardware (ASIC).",
    details: "Advantages of the Layer 3 Switch:\n* **Exceptional performance:** It routes IP packets at speeds close to those of physical switching (wire-speed), drastically reducing latency compared to a traditional router.\n* **Local routing:** Ideal for managing high-speed routing between different local VLANs (Inter-VLAN routing) within the same data center or corporate site.\n* **No bottleneck:** It replaces the 'Router-on-a-stick' architecture by eliminating the bottlenecks on the physical link toward the router.",
    examTip: "On the exam, the Layer 3 Switch combines the speed of an L2 switch with the logical IP routing capabilities of an L3 router to optimize the performance of the local network.",
  },
  InterVLANRoutingConcept: {
    name: "Inter-VLAN Routing",
    definition: "Inter-VLAN Routing: the logical process that enables communication and the passage of data between different isolated VLANs, which by default could not communicate with each other.",
    details: "Implementation methodologies:\n* **Router-on-a-stick:** It uses an external router connected to a switch through a single physical port configured as a Trunk, dividing the physical interface into logical sub-interfaces for each VLAN.\n* **Layer 3 Switch (SVI):** It configures virtual interfaces (Switch Virtual Interfaces - SVI) on the L3 switch that act as default gateways for each VLAN.\n* **Security:** Because the traffic must be routed to pass from one VLAN to another, this passage allows rigorous security controls (ACL or firewall rules) to be applied to decide which traffic to allow or block.",
    examTip: "Inter-VLAN Routing allows separate VLANs to be connected; to guarantee security, that traffic must always be filtered through Access Control Lists (ACL) or redirected to an inspection firewall.",
  },
  SDNConcept: {
    name: "SDN",
    definition: "Software-Defined Networking: a modern network architecture that separates the logical control of the network (Control Plane) from the physical traffic-forwarding device (Data Plane), centralizing management through software.",
    details: "Advantages of the SDN approach:\n* **Programmability:** It allows administrators and automation systems to configure, manage and protect the entire network dynamically through code and APIs.\n* **Network Virtualization:** It facilitates dynamic microsegmentation in cloud environments (e.g. creating and modifying security rules for individual servers in real time).\n* **Centralized visibility:** It provides a single point of observation of the traffic and the state of the global network.",
    examTip: "SDN centralizes the network's control logic through a software controller, abstracting the configuration from the individual physical switches and routers.",
  },
  DataPlaneConcept: {
    name: "Data Plane",
    definition: "Data Plane (or Forwarding Plane): the component of network devices (switches, routers) responsible for the actual forwarding and dispatching of data packets and frames from one interface to another.",
    details: "Characteristics of the Data Plane:\n* **Fast execution:** It handles hardware-level processing (ASIC) to maximize the packet transmission speed.\n* **Passive logic:** It does not make long-term decisions about how to route the packets; it merely applies the rules and paths stored in its routing table or cache (FIB - Forwarding Information Base) received from the Control Plane.\n* **Action examples:** Comparison of the destination MAC/IP address and forwarding on the corresponding port, application of VLAN tags, decrementing the TTL.",
    examTip: "On the exam, the Data Plane is the operational plane that deals solely with physically moving the packets from one port to another based on the directives received from the upper plane.",
  },
  ControlPlaneConcept: {
    name: "Control Plane",
    definition: "Control Plane: the intelligent component of the network responsible for determining how and where traffic should be routed, computing the paths and the routing tables.",
    details: "Characteristics of the Control Plane:\n* **Decision-making:** It defines the network topology by exchanging messages and information with the other local or global network appliances.\n* **Active protocols:** It runs complex algorithms and manages dynamic routing protocols such as OSPF, BGP, RIP, STP.\n* **Centralization in SDN:** In traditional networks, each appliance has its own local Control Plane. In SDN, the Control Plane is extracted and centralized within a software called the **SDN Controller**, leaving only the simple Data Plane on the physical switches.",
    examTip: "On the exam, the Control Plane is the network's decision-making brain that computes the routes and routing tables; in SDN it is centralized into a single software controller.",
  },
  ManagementPlaneConcept: {
    name: "Management Plane",
    definition: "Management Plane: the component of the network architecture used by system administrators to configure, monitor and manage the devices and the global network infrastructure.",
    details: "Characteristics of the Management Plane:\n* **Administrative Access:** It allows human or programmatic interaction with the device through the console, command-line interfaces (CLI), web panels (GUI) or monitoring protocols.\n* **Management protocols:** Telnet, SSH, SNMPv3, NETCONF, RESTCONF, HTTP/HTTPS.\n* **Security:** It is essential to isolate the Management Plane by protecting the connections through encryption (SSH/SNMPv3), MFA requirements and configuring a dedicated Management VLAN inaccessible to ordinary users.",
    examTip: "Protecting the Management Plane requires the exclusive use of encrypted protocols (SSH, HTTPS, SNMPv3) and the isolation of the management traffic in a dedicated (out-of-band) VLAN.",
  },
  ResponsivenessPerformance: {
    name: "Responsiveness",
    definition: "System Responsiveness: the measure of how quickly and promptly an application or IT service responds to requests initiated by end users.",
    details: "Characteristics of Responsiveness:\n* **User Experience:** It directly influences the productivity and the customers' perception of the service quality.\n* **Degradation indicators:** A slowdown in responsiveness is usually the first warning sign of structural problems, such as server overload, ongoing DDoS attacks, or exhaustion of computational resources (RAM/CPU).\n* **Monitoring:** Tracked through APM (Application Performance Monitoring) metrics and transactional response times.",
    examTip: "Responsiveness measures the response speed perceived by the user, and is critical for detecting anomalies or overloads in real time.",
  },
  LatencyPerformance: {
    name: "Latency",
    definition: "Latency: the time delay (measured in milliseconds) between the sending of a data request by a client and the receipt of the corresponding response.",
    details: "Factors that determine latency:\n* **Geographic Distance:** The propagation of physical signals through fiber-optic cables is affected by distance (solved through CDN - Content Delivery Network).\n* **Network Latency:** Delays caused by the number of hops between routers and by congestion of the network channels.\n* **Firewall processing:** Advanced firewalls (such as NGFW or IPS) that perform deep packet inspection (DPI) introduce a minimal amount of latency due to the computation time needed for inspection.\n* **Security impact:** Non-optimized cryptographic protocols (e.g. slow TLS handshakes) increase latency.",
    examTip: "Latency measures the propagation and computation delay of the packets; compressing handshake times (e.g. TLS 1.3) and hardware-assisted inspection are essential to contain it.",
  },
  NetSegmentationPortSecurityConcept: {
    name: "Network Segmentation & Port Security",
    definition: "Network subdivision (Segmentation) and control measures to limit access to the physical ports of the appliances (Port Security).",
    details: "It includes:\n* **Segmentation:** The architectural practice of dividing a network into isolated segments (VLAN, subnet) to limit the propagation of attacks (blast radius) and block the lateral movement of malware.\n* **Port Security:** A feature of Layer 2 switches that controls access to the physical ports. It allows each port to be associated with one or more authorized MAC addresses (static or dynamic through 'sticky MAC'). If an unregistered MAC is detected, the switch applies countermeasures (e.g. 'shutdown' of the port or restriction of the traffic, sending an SNMP notification).",
    examTip: "Port Security at the switch level prevents the insertion of unauthorized devices by physically blocking access based on the computer's MAC address.",
  },
  IEEE8021XAuthConcept: {
    name: "802.1X Wired & Wireless Authentication",
    definition: "The port-based network access control standard, which requires authentication before unlocking data transit.",
    details: "The three fundamental pillars of the IEEE 802.1X standard are:\n* **Supplicant (Client):** The software or device of the end user (e.g. laptop) that requests access and provides the credentials.\n* **Authenticator (Switch or Access Point):** The physical network appliance that controls material access to the port. It does not directly validate the credentials, but acts as an intermediary by forwarding them to the authentication server.\n* **Authentication Server (RADIUS Server):** The centralized server that validates the supplicant's identity by consulting a directory (e.g. Active Directory) and sends a success or failure message to the authenticator to unlock or block the port.",
    examTip: "On the exam, remember that in an 802.1X scenario the Authenticator (the switch or access point) does not validate the credentials, but merely acts as an intermediary by forwarding them to the RADIUS server.",
  },
  TrafficCaptureTAPConcept: {
    name: "Traffic Capture & Copying (SPAN, Port Mirroring, TAP)",
    definition: "Hardware and software methodologies to capture, copy and duplicate network traffic for passive inspection by IDS or protocol analyzers.",
    details: "It includes:\n* **Port Mirroring / SPAN (Switched Port Analyzer):** A software feature of the switch that copies all the traffic of one or more ports (or VLANs) and redirects it to a specific port connected to a sensor (e.g. IDS or Wireshark). It can degrade the switch's performance under very high traffic loads.\n* **Network TAP (Test Access Point):** A passive, independent hardware device physically inserted into the network cabling to split the optical or electrical signal. It guarantees the exact copy of 100% of the packets (including traffic with checksum errors) without introducing delays or consuming the switch's resources, remaining invisible on the network.",
    examTip: "The Network TAP is a dedicated physical hardware more reliable and secure than software Port Mirroring (SPAN), because it guarantees the capture of all the traffic even in case of extreme switch overload.",
  },
  ProxyTypesAdvancedConcept: {
    name: "Advanced Proxy Types (Forward, Reverse, Open)",
    definition: "The different types of proxy server used to route, protect and optimize the traffic flows between clients and servers.",
    details: "Three architectures are distinguished:\n* **Forward Proxy:** Placed within the local network on behalf of the internal clients. It receives requests destined for the Internet, forwards them by masking the client's private IP and applying content filters and security controls (URL Filtering).\n* **Reverse Proxy:** Placed in front of one or more backend web servers. It receives requests coming from the Internet and dispatches them to the internal servers, hiding the corporate network structure. It performs key tasks such as SSL/TLS termination (traffic decryption), caching and load balancing.\n* **Open Proxy:** A proxy server configured incorrectly or deliberately to be accessible by anyone on the Internet. Often abused by malicious actors to hide their identity during cyberattacks.",
    examTip: "While a Forward Proxy protects and masks the internal clients going out to the Internet, a Reverse Proxy is placed to defend the corporate servers by receiving incoming requests from the Internet.",
  },
  ModernCloudNetArchitectures: {
    name: "Modern Cloud & Secure Access Architectures (SD-WAN, SASE, CASB, Zero Trust, SWG)",
    definition: "The modern cloud-based network and security architectural paradigms to manage distributed connectivity and secure access of remote users.",
    details: "The key technologies include:\n* **SD-WAN (Software-Defined WAN):** A software-programmable WAN architecture that intelligently routes corporate traffic by combining heterogeneous geographic connections (e.g. MPLS, broadband, 5G) to optimize costs and performance.\n* **SASE (Secure Access Service Edge):** A framework that unifies network connectivity (SD-WAN) and security functions (CASB, FWaaS, SWG, Zero Trust) into a single fully cloud-managed service.\n* **CASB (Cloud Access Security Broker):** A software control point or cloud service inserted between corporate users and cloud (SaaS) applications to monitor cloud usage, apply compliance policies, enforce data loss prevention (DLP) controls and detect anomalous access.\n* **FWaaS (Firewall as a Service):** A next-generation firewall solution delivered directly from the cloud, which eliminates the need for local hardware appliances and centralizes the security rules for all employees, including remote ones.\n* **Zero Trust:** A security philosophy summarized in the motto 'Never trust, always verify'. It assumes that any device or user, even if located within the traditional corporate perimeter, is potentially compromised, enforcing continuous authentication and minimum privileges.\n* **SWG (Secure Web Gateway):** A web security solution (on-prem or cloud) that filters users' web traffic by applying malware controls, URL filtering, SSL/TLS inspection and DLP prevention in real time.",
    examTip: "The CASB is the go-to exam answer when you must monitor, protect and verify the compliance of corporate employees accessing external SaaS cloud applications (such as Office365 or Salesforce).",
  },

  /* ---- Group 3: Firewalls ---- */
  NGFWFire: {
    name: "NGFW",
    definition: "Next-Generation Firewall: an advanced network filtering device that combines traditional functions with application-level inspection and threat intelligence.",
    details: "Advanced capabilities compared to legacy firewalls:\n* **Deep Packet Inspection (DPI):** It analyzes the actual content of the data packets (payload) at all OSI levels, not limiting itself to checking IP headers and ports.\n* **Application Awareness:** It recognizes and controls specific applications (e.g. blocking file transfer on Skype while allowing video chats).\n* **Integrated IPS:** It detects and blocks network attacks and intrusions in real time based on signatures and anomalies.\n* **Active Directory Integration:** It associates the filtering rules directly with corporate users and logical groups rather than only with static IP addresses.\n\n* **Focused Mini-Example:** A company configures a Palo Alto **NGFW** at its borders: the firewall detects that an internal computer is using the BitTorrent protocol disguised on TCP port 443 (normally used for HTTPS) and blocks the session thanks to Layer 7 inspection (**Deep Packet Inspection**).",
    examTip: "An NGFW operates up to Layer 7 (Application) of the OSI model and natively includes IPS functionality and granular application control.",
  },
  WAFFire: {
    name: "WAF",
    definition: "Web Application Firewall: a specialized firewall placed in front of web servers to filter and analyze HTTP/HTTPS traffic at the application level (Layer 7).",
    details: "Main characteristics:\n* **Target:** It protects corporate web applications and websites from web-specific software attacks and vulnerabilities (e.g. OWASP Top 10).\n* **Attack prevention:** It identifies and eliminates SQL Injection, Cross-Site Scripting (XSS), XML External Entities (XXE), and CSRF attempts.\n* **Mechanism:** It inspects GET and POST requests before they reach the backend web server, blocking anomalous or malicious input patterns.\n\n* **Focused Mini-Example:** A malicious user types `' OR '1'='1` into the login form of an e-commerce site. The **WAF** placed in front of the web server analyzes the HTTP POST request, recognizes the typical signature of a SQL Injection and instantly blocks the attacker's IP address with a 403 error page.",
    examTip: "**WAF versus NGFW, the pair the exam confuses most often.** Both reach **Layer 7**, but they look at different things from different places.\n  * The **NGFW** sits at the **perimeter** and looks at **all** the organization's traffic: it identifies the application behind a flow (this is Dropbox, this is BitTorrent), applies per-user policy and integrates IPS and threat intelligence.\n  * The **WAF** sits **in front of a specific web application** and understands its **semantics**: parameters, session cookies, request bodies. That is what lets it recognize a SQL injection or an XSS in a single input field.\n* **Exam rule:** if the scenario names **SQLi, XSS or a published web application**, the answer is WAF; if it names **controlling corporate traffic by application and by user**, it is NGFW. **Remember:** a WAF is a **compensating** control, not a fix for the defect: the real remediation is still input validation in the code.",
  },
  UTMFire: {
    name: "UTM",
    definition: "Unified Threat Management: a single integrated security appliance that combines multiple defensive functions into one economical and easy-to-manage device.",
    details: "Functions typically consolidated in a UTM:\n* Stateful Firewall and VPN Gateway.\n* Gateway Antivirus, Antispyware and Antispam.\n* Web content filtering (URL/Content Filtering).\n* Intrusion Prevention System (IPS).\n* **Intended use:** Specifically designed for small and medium-sized businesses (SMBs) or branch offices that lack dedicated IT staff to manage multiple specialized systems.\n\n* **Focused Mini-Example:** A small partnership firm buys a Fortinet FortiGate appliance (**UTM**) for its office. This single device performs the filtering of websites not allowed to employees, scans incoming emails for spam and performs antivirus inspection on all downloads.",
    examTip: "The UTM is the ideal solution to simplify security management for SMBs by integrating multiple defenses into a single centralized (All-in-one) hardware.",
  },
  FirewallBase_New: {
    name: "Firewall",
    definition: "A network security device designed to monitor and filter incoming and outgoing traffic based on predefined security rules.",
    details: "It can be implemented as dedicated hardware, software installed on a computer, or as a cloud service (FWaaS). It acts as a protective barrier between a trusted internal network and untrusted external networks (e.g. the Internet).",
    examTip: "A firewall acts as the first level of perimeter defense, allowing or blocking traffic based on the configuration of the access rules (ACL).",
  },
  StatefulFirewall_New: {
    name: "Stateful firewall",
    definition: "A type of firewall able to monitor the active state of connections and filter packets by analyzing their entire context.",
    details: "Main characteristics:\n* **State Table:** It records all the active communication sessions (e.g. completed TCP handshakes).\n* **Intelligent Inspection:** It recognizes whether an incoming packet belongs to a legitimate session already established from within the company, automatically allowing it through.\n* **Security:** Compared to static packet-filtering, it prevents attackers from bypassing the filter by sending isolated packets with fake TCP flags.",
    examTip: "Stateful firewalls are superior to stateless ones (packet-filtering) because they track the state of connections, making decisions based on the session context.",
  },
  PacketFilteringFirewall_New: {
    name: "Packet-filtering firewall",
    definition: "A basic firewall that individually examines each single data packet, deciding whether to pass it based solely on the headers.",
    details: "Main characteristics:\n* **Stateless:** It does not track the session state; each packet is evaluated completely independently of the others.\n* **Filter Parameters:** It makes decisions based exclusively on source/destination IP addresses, protocol type (TCP/UDP/ICMP) and port numbers (OSI Layer 3 and Layer 4).\n* **Performance:** Very fast and consumes very few resources, but it is more vulnerable to spoofing and TCP-flag bypass techniques.",
    examTip: "Packet-filtering firewalls operate at Layer 3 and 4, are stateless and filter traffic by comparing exclusively the packet headers against static rules.",
  },
  ProxyFirewall_New: {
    name: "Proxy firewall",
    definition: "A type of firewall (also known as an Application Gateway) that acts as an intermediary between internal clients and external destination servers.",
    details: "How it works:\n* **Complete Intermediation:** It receives the internal client's request, performs a complete application-level (Layer 7) inspection, establishes a new separate connection to the destination server on behalf of the client and returns the received data to the client.\n* **Total Isolation:** There is never a direct passage of packets between the client and the external resource, completely hiding the internal addressing.\n* **Deep Inspection:** It can block specific content (e.g. malicious code or unapproved websites) but introduces latency due to the double processing of the sessions.",
    examTip: "A proxy firewall (Application-level Gateway) operates at Layer 7 of the OSI model, breaks the direct connection between sender and recipient and performs the highest level of payload inspection.",
  },
  FailClosed_New: {
    name: "Fail-closed",
    definition: "A security design principle in which, in case of failure, anomaly or blackout, access to a resource is completely blocked by default.",
    details: "Details:\n* **Maximum Security:** It prioritizes system security over business availability and operability.\n* **Physical examples:** Magnetic locks of armored vaults that remain mechanically locked if the electrical power fails.\n* **Logical examples:** A firewall that, if its CPU or memory crashes, blocks all transit traffic rather than allowing the uncontrolled passage of data.",
    examTip: "The Fail-closed (or fail-secure) mode ensures that, if an error or power outage occurs, the systems and access remain blocked by default to prevent intrusions.",
  },
  FailOpen_New: {
    name: "Fail-open",
    definition: "A design principle in which, in case of anomaly or power interruption, the system allows access or transit for everyone by default.",
    details: "Details:\n* **Maximum Availability:** It prioritizes the safety of people and service continuity over the physical or logical security of the assets.\n* **Physical examples:** Fire doors or emergency exit gates that unlock automatically in case of a fire alarm or blackout to facilitate rapid evacuation.\n* **Logical examples:** An in-line IPS that, if it turns off or suffers a hardware failure, activates a physical bypass letting the traffic pass so as not to interrupt the company's network connectivity.",
    examTip: "The Fail-open (or fail-safe) mode ensures continuity and the safeguarding of human life in emergency situations by unlocking all gates or allowing traffic to transit.",
  },
  RateBasedFiltering_New: {
    name: "Rate-based filtering",
    definition: "A filtering mechanism that limits the frequency or rate of packets or requests allowed from a single IP address or user.",
    details: "Details:\n* **Main purpose:** To mitigate DoS, DDoS attacks (such as HTTP Floods), automatic brute-force attempts on login pages and massive web-scraping activity.\n* **Operation:** If a user's IP address exceeds a preset maximum threshold of requests per second (e.g. 100 requests/sec), the firewall or web server temporarily blocks the IP or requires the solving of a CAPTCHA.",
    examTip: "Rate-based filtering is a key technique to protect web portals from application DoS attacks and brute scanning.",
  },
  StatelessFirewallConcept: {
    name: "Stateless",
    definition: "A stateless network traffic filtering model in which each packet is examined completely independently, without retaining information about active sessions.",
    details: "Also known as static packet-filtering, it analyzes exclusively the headers of the single packet (source/destination IP, port, protocol). It is extremely fast but vulnerable to advanced attacks and does not recognize the responses to legitimate connections initiated from within.",
    examTip: "A stateless filter operates without keeping track of the connection state; therefore it requires explicit bidirectional rules to allow the outgoing and return traffic.",
  },
  DPIFire: {
    name: "DPI",
    definition: "Deep Packet Inspection: an advanced network-packet analysis technology that examines both the headers and the entire information content (payload) of the packet up to the application level (Layer 7).",
    details: "Unlike traditional filtering that checks only IP and ports, DPI decodes and inspects the actual transmitted data to identify hidden malware, protocol violations, policy violations or exploit attempts, introducing however a minimal amount of latency due to the processing time.",
    examTip: "Deep Packet Inspection (DPI) is the enabling technology of Next-Generation Firewalls (NGFW) and IPS to inspect the actual content of the traffic at the application level (Layer 7).",
  },
  AllowRule: {
    name: "Allow",
    definition: "The explicit rule in a firewall's Access Control List (ACL) that authorizes the transit of traffic matching certain criteria.",
    details: "An **allow** rule explicitly authorises a flow of traffic matching the stated criteria. In a well-configured firewall it is the only way anything gets through, because everything else is discarded by the final implicit deny.\n* **What a rule is made of:** source (IP or network), destination, protocol (TCP/UDP/ICMP), port or port range, direction (inbound or outbound), action and â€” on an NGFW â€” the application and the user's identity.\n* **The golden rule of ordering:** the firewall evaluates **top to bottom** and stops at the **first** match. **Specific** rules therefore go above generic ones: put `allow any any` at the top and every rule below it becomes dead letter, and nobody notices until someone reads the logs.\n* **How to write a defensible allow:** as narrow as possible on all four axes â€” source, destination, port and protocol. `Allow 10.0.5.12 â†’ 10.0.9.4 TCP/1433` is a rule; `Allow any â†’ any TCP/1433` is a hole shaped like a rule.\n* **The risk that accumulates over time:** allow rules get added and never removed. Temporary exceptions survive for years, and the result is a rule set nobody can justify any more. That is why periodic rule-set review is a control, not maintenance.\n\n* **Focused Mini-Example:** The web server in the DMZ must reach the internal database. The correct rule is not 'let the DMZ talk to the LAN', but `Allow 172.16.1.10 â†’ 10.0.9.4 TCP/1433`: one source host, one destination host, one port. If the web server is compromised, the attacker inherits exactly that port and nothing more.",
    comparativeTable: {
      headers: ["Concept", "What it means", "Why the exam asks about it"],
      rows: [
        ["Top-down order", "Rules are evaluated top to bottom and stop at the FIRST match", "A broad rule near the top makes every specific rule below it useless"],
        ["Specific first", "Single IPs and ports above, ranges and 'any' below", "This is the mistake PBQs ask you to correct"],
        ["Implicit deny", "At the end, anything not permitted is discarded", "It is implicit: you cannot see it in the list but it acts anyway"],
        ["Explicit deny", "A hand-written block rule, visible and logged", "It exists to generate logs: implicit deny often produces none"],
        ["Deny vs Drop", "Deny replies (RST/ICMP), Drop discards silently", "Drop makes the port look 'filtered' and does not confirm the host exists"],
        ["Inbound vs Outbound", "Coming in from outside Â· going out to outside", "Egress filtering stops exfiltration and C2 traffic"],
      ],
    },
    examTip: "**A firewall evaluates top to bottom and stops at the first matching rule:** that is why specific rules go above and generic ones below.\n* **The mistake PBQs ask you to fix:** a broad rule placed above a narrow one. If `Allow any â†’ any` sits at the top, nothing after it is ever evaluated.\n* **The writing criterion:** every allow must be narrow on source, destination, protocol and port. Zero Trust applies the same logic taken to its limit: nothing passes unless it has been explicitly permitted for that user, that device and that resource.",
  },
  DenyRule: {
    name: "Deny",
    definition: "The explicit or implicit rule in a firewall's Access Control List (ACL) that blocks and discards unauthorized traffic.",
    details: "A **deny** rule blocks traffic matching the stated criteria. The distinction the exam tests is between **implicit** and **explicit** deny, because they do the same thing but do not produce the same effect.\n* **Implicit deny:** the final rule, unwritten and invisible in the list, that discards **everything not explicitly permitted**. It is the foundation of the *default deny* model and what makes a firewall safe: you do not need to list the threats, only what is legitimate.\n* **Explicit deny:** a hand-written block rule. If implicit deny already blocks everything, why write one? For three reasons: to **generate logs** (implicit deny often records nothing), to **document** a deliberate decision, and to block something **before** a broader allow rule placed below it authorises it.\n* **Deny and drop are not synonyms:** **deny (reject)** replies to the sender with a TCP `RST` or an ICMP unreachable message â€” the port reads as **closed** and the host is confirmed to exist. **Drop** discards silently â€” the port reads as **filtered** and the attacker does not even get confirmation that the host is there. At the perimeter, drop is preferred; internally, reject is kinder to applications, which get an immediate error instead of waiting for a timeout.\n* **The cost of silence:** a drop with no logging is invisible to the defender too. Block rules you want visibility on â€” attempts towards administrative ports, traffic to known-malicious domains â€” should be written explicitly with logging enabled.\n\n* **Focused Mini-Example:** A company wants to stop an entire segment reaching the internet, but also wants to **know** when someone tries. Implicit deny would block it but would produce no record. So an **explicit deny** rule with logging is added: the traffic stops exactly as before, but now every attempt leaves a trace.",
    examTip: "**Implicit deny is the final rule discarding everything not permitted**, and it exists on every firewall even though you cannot see it in the list.\n* **Why write an explicit deny anyway:** to get the **logs**, to document a decision, and to block something before a broader allow rule placed below it authorises it.\n* **Deny versus drop, the distinction that shows up in scanning questions:** **deny/reject** replies with `RST` and the port reads **closed**, confirming the host exists Â· **drop** does not reply and the port reads **filtered**. At the perimeter drop is preferable, because it does not even confirm the target exists.",
  },
  InboundTraffic: {
    name: "Inbound",
    definition: "Inbound Traffic: the incoming network data flow that comes from an external network (e.g. the Internet) directed toward the inside of the private corporate network.",
    details: "**Inbound** traffic is what enters the network from outside. It is the direction attention has always focused on, and the correct model for governing it is **default deny**: deny everything and explicitly open only the necessary ports.\n* **What is legitimately opened:** the published services â€” a web server in the **screened subnet** (formerly the DMZ) on 443, a mail exchanger, an authoritative DNS. The principle is that exposed services live in the screened subnet, **never** in the trusted LAN, so that their compromise does not hand over direct access to the internal network.\n* **What is never opened to the internet:** RDP (3389), SMB (445), databases (1433, 3306, 5432), SSH with no source restriction, and management interfaces. These are the ports that appear in questions as the mistake to fix, and in reality they are ransomware's commonest way in.\n* **Return traffic is not inbound in the rule sense:** a **stateful** firewall recognises packets returning in response to a connection opened from inside and lets them through without a dedicated rule. That is the practical difference from a stateless filter, which needs explicit bidirectional rules.\n* **NAT is not an inbound control:** a private host being unreachable from the internet is a side effect of translation, not a policy â€” and it falls to a port forward, to UPnP, or to a connection opened from inside.\n\n* **Focused Mini-Example:** A small business exposes its ERP to the internet by opening RDP so staff can work remotely. The correct configuration is the opposite: RDP **closed** to the internet and access through a VPN with MFA, or via a published jump server. Port 3389 left open is, statistically, one of ransomware's principal entry vectors.",
    examTip: "**Default deny governs inbound traffic:** block everything and explicitly open only the services that must be published.\n* **Ports that must never face the internet:** RDP 3389, SMB 445, databases 1433/3306/5432, management interfaces. If a scenario shows them open, that is the flaw the question wants you to find.\n* **Worth remembering:** public services live in the **screened subnet**, not in the trusted LAN. And a **stateful** firewall passes return traffic without a dedicated rule, because it recognises it as part of a session already established from inside.",
  },
  OutboundTraffic: {
    name: "Outbound",
    definition: "Outbound Traffic: the outgoing network data flow originated from the internal network's devices and directed toward external networks (e.g. the Internet).",
    details: "**Outbound** traffic is what leaves the network towards outside. It is the direction historically neglected â€” 'it's only us going out' â€” and that is precisely why it has become the attackers' preferred route.\n* **Why filtering it is a control, not a fixation:** an attacker already inside has to **get out** to do anything useful. They must reach the command-and-control server for instructions, and they must move the collected data out. Egress filtering is what interrupts both, even when the entry went undetected.\n* **What gets blocked in practice:** DNS towards external resolvers other than the corporate ones â€” otherwise DNS filtering is bypassed in a minute; outbound SMTP from any host other than the mail server; connections towards categories and reputations known to be malicious; protocols nobody should use towards the internet; and, in stricter environments, anything not going through the proxy.\n* **The link with data loss prevention:** network DLP lives on this direction, because this is where data leaves. Mind the limit, though: if traffic is encrypted and TLS inspection is not performed, the content is unreadable â€” destination, volume and timing stay visible, and often that is enough to raise suspicion.\n* **Why it is hard to retrofit:** in a network where everything has always gone out freely, the first day of egress filtering breaks something. The workable path is to run in **log-only mode**, build the list of what actually leaves, and only then switch to blocking.\n\n* **Focused Mini-Example:** Malware installs itself on a workstation and tries to reach its command-and-control server on a non-standard port. The firewall permits outbound 80, 443 and 53 to the corporate resolver only: the connection never establishes, the malware gets no instructions and exfiltration never starts. The entry had not been detected; the exit was.",
    examTip: "**Egress filtering is what stops the attack after the break-in:** it blocks traffic towards command-and-control servers and data exfiltration.\n* **The block not to forget:** DNS towards external resolvers. If clients can query a public DNS, corporate DNS filtering is bypassed by changing one network setting.\n* **Exam trap:** when the scenario describes data leaving or an internal machine contacting a suspicious address, the answer concerns **outbound** traffic â€” network DLP or egress filtering â€” not an inbound rule, which never even sees that communication.",
  },
  NetFirewallNATConcept: {
    name: "Network Firewall & NAT (Network Address Translation)",
    definition: "The combination of perimeter network firewalls (Network Firewall) and address translation (NAT) to protect and mask the internal topology.",
    details: "The two concepts work in synergy:\n* **Network Firewall:** A device dedicated to filtering traffic between different networks (e.g. LAN and Internet). It examines IP addresses, ports and connection states (L3/L4) to block unauthorized flows.\n* **NAT (Network Address Translation):** A technology that allows multiple private (internal) IP addresses to be mapped to a single or few public (external) IP addresses for browsing the Internet. It masks the internal private addressing. As a side effect a host behind NAT is unreachable from outside until it opens the connection itself, but that **is not a security control**: port forwarding, UPnP, NAT traversal or internal malware opening the connection all get past it. What decides what may pass is the firewall, not NAT.",
    examTip: "**NAT exists to conserve IPv4 addresses, not to protect.** It is true that, as a side effect, a host behind NAT is unreachable from the Internet until it opens the connection itself â€” but that effect **is not a security control** and it falls over easily: a **port-forwarding** rule, **UPnP** that a device configures for itself, a **NAT traversal** technique (STUN, TURN) or, far more simply, internal malware that opens the outbound connection itself.\n* **Exam trap:** NAT **does not replace a firewall**. A firewall decides by policy what may pass in either direction and logs it; NAT merely translates addresses. If a scenario offers NAT as a perimeter protection measure, it is a distractor.",
  },
  NGFWCapabilitiesConcept: {
    name: "NGFW Advanced Capabilities (Application Awareness, URL Filtering)",
    definition: "The distinctive features of a Next-Generation Firewall (NGFW), including application control and web address (URL) filtering.",
    details: "In addition to static and stateful filtering, NGFWs include:\n* **Application Awareness:** The ability to identify and inspect traffic at Layer 7 to understand which specific application is transmitting data (e.g. distinguishing Skype traffic from BitTorrent traffic even if they use the same port 443).\n* **URL Filtering:** It blocks or allows access to specific websites based on predefined blacklists, content categories (e.g. gambling, social networks) or domain reputation to prevent phishing and malware attacks.\n* **Deep Packet Inspection (DPI):** The deep inspection of the packet payload to detect hidden threats and application-level exploits.",
    examTip: "Application Awareness allows administrators to block specific features of an application (e.g. preventing file transfer on a corporate chat) while keeping the application itself active.",
  },
  SecurityZonesConcept: {
    name: "Security Zones (Trusted, Untrusted, Screened)",
    definition: "The logical division of a network infrastructure into zones with different levels of trust and security permissions.",
    details: "The three classic perimeter zones are:\n* **Trusted Zone:** The organization's internal network (LAN) where the corporate devices and employees reside. Access is strictly controlled and protected.\n* **Untrusted Zone:** Any network outside the organization's control (e.g. the Internet or guest networks), considered hostile and exposed to threats.\n* **Screened Zone / Screened Subnet (DMZ):** An isolated subnet placed between the trusted and untrusted networks. It hosts the servers that must be accessible from outside (e.g. web, mail, DNS servers), preventing their compromise from allowing direct access to the trusted LAN.",
    examTip: "On the exam, the Screened Subnet (formerly known as DMZ) is the mandatory architectural solution to host public servers, ensuring that external traffic can never directly reach the trusted LAN devices.",
  },

  /* ---- Group 4: Data Security ---- */
  DataAtRestSec: {
    name: "Data at Rest",
    definition: "Data at rest: all digital information stored persistently on physical or logical media that is not moving over the network nor being actively processed.",
    details: "Characteristics and protections:\n* **Examples:** Files saved on hard disks (SSD/HDD), corporate databases, backup tapes, USB sticks, cloud storage (e.g. AWS S3).\n* **Threats:** Physical theft of the media, unauthorized logical intrusions.\n* **Key Encryption Methodologies:**\n  - **Full Disk Encryption (FDE):** Total encryption of the physical drive (e.g. BitLocker, FileVault). It protects the data in case of loss or theft of the entire hardware.\n  - **Database Encryption:** Encryption applied directly within the databases (e.g. Transparent Data Encryption - TDE), which encrypts the tables and data files saved on the logical disk, leaving the database operational for authorized queries.\n  - **File/Folder Encryption:** Encryption of individual files or specific folders (e.g. EFS on Windows, GnuPG). Useful when different users on the same system must access only specific files.\n* **ACL (Access Control List):** Access control lists at the file-system or operating-system level that granularly specify which users or processes have read, write or execute permissions on the stored data.",
    examTip: "Full Disk Encryption (FDE) protects 'Data at Rest' against physical theft of the hardware, while Database/File Encryption and ACLs (Access Control Lists) prevent unauthorized logical access on an active operating system.",
  },
  DataInTransitSec: {
    name: "Data in Transit",
    definition: "Data in transit (Data in Motion): all digital information that is actively moving from one node to another across a public or private network.",
    details: "Characteristics and protections:\n* **Examples:** Emails sent over the internet, e-commerce web traffic, file transfers (FTP/SFTP), remote SSH or VPN connections.\n* **Threats:** Abusive interception of network packets (Man-in-the-Middle, eavesdropping, sniffing).\n* **Protection Countermeasures and Encrypted Channels:**\n  - **TLS (Transport Layer Security):** A standard cryptographic protocol that establishes secure and encrypted channels for web traffic (HTTPS), mail (SMTPS, IMAPS) and APIs, guaranteeing privacy and server authentication.\n  - **IPSec (Internet Protocol Security):** A framework of network protocols to encrypt the entire IP traffic at the packet level, ideal for creating secure VPN tunnels (Site-to-Site or Client-to-Site).\n  - **Network Firewall & IPS (Intrusion Prevention System):** Appliances that monitor, filter and inspect (Deep Packet Inspection) the traffic in transit to detect and block injections, exploits or ongoing exfiltration before they reach the corporate servers.\n\n* **Focused Mini-Example:** A customer makes a credit-card payment on a cafe's public Wi-Fi network. Because the e-commerce website uses the encrypted HTTPS protocol (**Data in Transit** protected by TLS), an attacker on the same Wi-Fi network who sniffs the packets will receive only incomprehensible encrypted binary data.",
    examTip: "To protect 'Data in Transit', encrypted channels through TLS or IPSec are used, aided by Firewall and IPS inspection to prevent real-time attacks.",
  },
  DataInUseSec: {
    name: "Data in Use",
    definition: "Data in use: all digital information that is currently loaded into a system's volatile memory and is actively being processed by the CPU.",
    details: "Characteristics and protections:\n* **Examples:** A Word document open and being edited, decryption keys loaded into memory to unlock a disk, financial transactions computed in real time.\n* **Threats:** Cold boot attacks, RAM memory dumping, CPU-level exploit attacks (e.g. Spectre/Meltdown).\n* **Physical CPU memory states:** During active execution, the data flows through three levels of hardware memory at increasing speed:\n  - **RAM (Random Access Memory):** The main system memory, volatile, where the data of active processes resides.\n  - **Cache (L1/L2/L3):** Ultra-fast memory integrated into the CPU to store the most frequently used data.\n  - **CPU Registers:** Microscopic memory cells inside the processor that contain the data and instructions currently being processed by the compute unit (ALU).\n* **Primary countermeasures:** Confidential Computing, hardware enclave-based isolation (e.g. Intel SGX, AMD SEV) that dynamically encrypts the RAM memory sections dedicated to sensitive processes, preventing even the operating-system administrator from viewing them.\n\n* **Focused Mini-Example:** A multi-tenant cloud server performs computations on confidential medical data. The system uses Confidential Computing technologies (**Data in Use** protected through Intel SGX enclaves and secure CPU registers), ensuring that no other virtual machine hosted on the same physical hypervisor can access the medical server's RAM portion.",
    examTip: "'Data in Use' actively resides in the RAM, the Cache and the CPU Registers during the processor's execution; protecting it requires advanced hardware isolation techniques.",
  },
  DataTypesConcept: {
    name: "Types of Data & Information Formats",
    definition: "The classification of digital information based on its regulatory, commercial and readability nature for humans or machines.",
    details: "The exam data types include:\n\n* **Regulated Information:** Data subject to strict national or international compliance regulations (e.g. payment data protected by PCI-DSS, health data protected by HIPAA/PHI, European personal data protected by GDPR). Failure to protect it entails very heavy penalties.\n* **Intellectual Property (IP):** Creations of the mind protected by legal instruments such as patents, copyrights or trademarks. It includes proprietary source code, engineering designs and scientific formulas.\n* **Trade Secret:** Commercial information of inestimable value that provides a direct competitive advantage (e.g. the Coca-Cola recipe or Google's search algorithm). It is not publicly patented but protected by extreme secrecy and non-disclosure agreements (NDA).\n* **Legal Information:** Sensitive data relating to corporate contracts, litigation, internal investigations or attorney-client privileged communications.\n* **Financial Information:** Banking data, credit-card numbers, transactions, invoices or internal financial reports not yet intended for publication.\n\n**Data Readability and Formats:**\n* **Human-readable:** Data stored in unencrypted text format (Plain Text) that a person can understand instantly without special software (e.g. .txt or .doc files in the clear).\n* **Non-human-readable:** Binary, compiled or encrypted data, readable exclusively by machines or decipherable only by possessing the relevant cryptographic key (e.g. .exe executables, disk images, cryptographic keys).\n* **Hybrid Formats:** Structured or semi-structured interchange formats that contain human-understandable tags or separators, but are designed mainly to be read and analyzed automatically by software:\n  - **CSV (Comma-Separated Values):** Tabular data arranged in rows with values separated by commas.\n  - **XML (eXtensible Markup Language):** A flexible markup language based on nested hierarchical tags.\n  - **JSON (JavaScript Object Notation):** A standard, lightweight format based on key-value pairs and arrays, dominant in modern API communications.",
    examTip: "On the exam, remember that Trade Secrets do not benefit from public registration (like patents) and are protected only through rigorous civil NDAs, and that JSON, XML and CSV are considered structured hybrid interchange formats.",
  },
  DataClassificationLevels: {
    name: "Data Classification & Sensitivity Levels",
    definition: "The process of categorizing information based on its sensitivity and the level of harm that its loss or disclosure would cause to the organization.",
    details: "The classification levels vary based on the sector of application:\n\n**Commercial / Private Classifications (from least to most sensitive):**\n* **Public:** Information in the public domain. Its dissemination causes no harm. Examples: commercial catalogs, corporate press releases.\n* **Unclassified:** Generic office information that does not require special protective measures but is not intended for mass publication.\n* **Private:** Information intended exclusively for internal corporate use that, if disclosed, would cause minor inconvenience or embarrassment (e.g. internal org charts).\n* **Restricted:** Data with specific access restrictions for small groups or departments. Disclosure causes moderate operational harm.\n* **Proprietary:** Data exclusive to the company that defines its business model and market advantage (e.g. product schematics, secret commercial price lists). A leak reduces competitiveness.\n* **Confidential:** Sensitive data whose unauthorized disclosure would cause serious financial, reputational or legal losses (e.g. acquisition plans, internal financial reports).\n\n**Military / Government Classifications (from least to most sensitive):**\n* **Unclassified / Public:** Data without restrictions.\n* **Confidential:** Disclosure that would damage national security.\n* **Secret:** Disclosure that would cause serious damage to state security.\n* **Top Secret:** Vital information whose disclosure would cause exceptionally serious and irreparable damage to national security.\n\n**Critical Types of Sensitive Data:**\n* **PII (Personally Identifiable Information):** Personal identifying information that allows an individual to be traced or identified (e.g. tax code, fingerprints, personal addresses).\n* **PHI (Protected Health Information):** Personal clinical and health data protected strictly by the laws (e.g. medical records, medical prescriptions).\n* **Sensitive / Critical:** Wildcard terms used to indicate very-high-impact data (e.g. master cryptographic keys, root credentials, core network configurations).",
    examTip: "PII and PHI data are subject to extremely strict protection regulations. On the exam, the classification directly guides the choice of the logical and physical security controls to apply to each piece of data.",
  },
  EncryptionSec: {
    name: "Encryption",
    definition: "Encryption: the process of converting readable information (plaintext) into an incomprehensible format (ciphertext) using an algorithm and a cryptographic key.",
    details: "The application of encryption methodologies is essential for the protection and confidentiality of assets:\n* **Protecting Data:** The set of strategies, technical controls and organizational policies implemented to protect sensitive data from unauthorized access, alteration or destruction.\n* **Encryption:** The main algorithmic mechanism to guarantee the confidentiality of information both at rest and in transit.\n* **Plaintext:** The original unencrypted data, readable and processable by any ordinary user or software.\n* **Ciphertext:** The unreadable, altered result generated by the encryption algorithm applied to the plaintext. It appears as a random binary string with no meaning.\n* **Decryption:** The reverse process that converts the ciphertext back into plaintext using the corresponding cryptographic key.\n* **Symmetric Encryption:** Uses the same key to encrypt and decrypt (e.g. AES, 3DES). Extremely efficient for massive volumes of data.\n* **Asymmetric Encryption:** Uses a key pair: public to encrypt, private to decrypt (e.g. RSA, ECC).\n\n* **Focused Mini-Example:** To protect confidential documents (**Protecting Data**), a software applies symmetric **Encryption** transforming the contracts in the clear (**Plaintext**) into incomprehensible files (**Ciphertext**), ensuring that only whoever possesses the correct private key can perform the **Decryption** and read the content.",
    examTip: "Symmetric encryption (e.g. AES) is much faster than asymmetric encryption and is the preferred choice for encrypting local files or large databases, while decryption is computationally infeasible without the paired key: not Â«impossibleÂ» in the mathematical sense, but out of reach for any foreseeable computing power.",
  },
  AppVsNetworkEncryptionConcept: {
    name: "Application vs. Network Encryption",
    definition: "The differences between application encryption (performed at the application software level) and network encryption (performed at the transport or network protocol level).",
    details: "The two approaches protect data in different ways and locations:\n* **Application Encryption:** The data is encrypted directly by the application software before being saved or sent (e.g. encryption of specific database fields, such as user passwords or credit-card numbers). It ensures that the data remains encrypted throughout its lifecycle, even if the network infrastructure or the database are compromised. However, it requires changes to the application code and complex key management.\n* **Network Encryption:** The data is encrypted at the network level during transit (e.g. through protocols such as TLS, IPSec or SSH) to protect the communication channel. It encrypts all data in transit between two points, making the transmission secure over public networks, but the data returns to the clear once decapsulated by the recipient before being stored or processed by the application.",
    examTip: "Application encryption protects the data persistently from the origin to the final destination (End-to-End), while network encryption guarantees security exclusively during the physical transit over the communication channels.",
  },
  HashingSec: {
    name: "Hashing",
    definition: "A one-way algorithm that converts an input of arbitrary length into a fixed-length string of characters (the Hash).",
    details: "Hashing is a deterministic, one-way function mapping arbitrary input to a fixed-length digest.\n* **Digest does not mean unique value:** inputs outnumber outputs, so collisions exist; a secure algorithm makes them impractical to construct. MD5 and SHA-1 are deprecated because that property has been broken.\n* **Integrity verification:** comparing digests detects a difference, but the reference value must be authentic. If an attacker replaces both file and hash, the check passes.\n* **Digital signature:** a signature algorithm uses the private key over the digest according to a defined scheme such as RSA-PSS, ECDSA or Ed25519; it should not generically be described as 'encrypting the hash'. Public-key verification proves integrity and origin from that key.\n* **Identity limit:** mathematics identifies the **key**, not automatically the person. A certificate, identity proofing and key protection bind that key to the signer; a stolen key produces valid signatures.\n* **Non-repudiation:** this is strong evidential support built from signature, identity, key custody, timestamps and audit, not an absolute bar on dispute.",
    examTip: "Hashing = modification detection against an authentic reference; HMAC = integrity and authenticity with a shared secret; digital signature = integrity and publicly verifiable origin. None of the three provides confidentiality.",
  },
  TokenizationSec: {
    name: "Tokenization",
    definition: "Tokenization: replacing a piece of sensitive data with an equivalent non-sensitive value called a Token, generated randomly.",
    details: "Tokenization removes the real data from local archives, reducing the risk perimeter:\n* **Tokenization:** A process that replaces a piece of sensitive data with a random token, with no mathematical correlation with the original data.\n* **Token Vault:** A centralized, ultra-protected archive that contains the association table between the real data and the corresponding tokens. It is the only system able to perform the reverse conversion.\n* **Payment Token:** A specific application provided for by the PCI-DSS standards, where the real PAN number of a credit card is converted into a random fictitious token for e-commerce transactions, so the merchant's database holds only tokens. This **greatly reduces exposure** of the PAN but **does not eliminate the risk**: the vault, the detokenization API and the systems that do receive the PAN all still need protecting. **Vaultless** schemes also exist, deriving the token without a central mapping table: they should not be confused with encryption.\n* **Placeholder:** The use of a temporary or fictitious value structured in the same format as the real data (e.g. `9999-9999-9999-9999`), used to preserve the database schema or simulate transactions without exposing sensitive data.",
    examTip: "**The difference from encryption:** encrypted data **still contains** the information, and whoever obtains the key recovers it offline. A token **contains nothing**: it is a random value with no mathematical relationship to the original, so analyzing it leads nowhere. Getting back to the data requires authorization to query the mapping store.\n* **Two implementations, to be told apart:** the **vaulted** kind keeps the token-to-data table in a heavily protected central store, which becomes both the thing to defend and the bottleneck; the **vaultless** kind derives the token algorithmically with a key held in an HSM, with no table to maintain. Either way the benefit is the same, and it is why PCI DSS rewards it: systems that handle only tokens **fall out of the compliance scope**, because they no longer process the real data.",
  },
  DataMaskingSec: {
    name: "Data Masking",
    definition: "Data masking: a technique that hides or replaces portions of sensitive data with filler characters to protect confidentiality.",
    details: "Masking prevents the improper display of sensitive data in unprotected contexts:\n* **Data Masking:** The static or dynamic obscuring of parts of text or figures using special characters (e.g. asterisks or 'X').\n* **PII (Personally Identifiable Information):** Information that uniquely identifies a person (e.g. tax code, email, phone). Masking PII is a primary control provided for regulatory compliance (e.g. GDPR).\n* **Static Data Masking (SDM):** Generates a permanent masked copy of the real data to be used in insecure environments (such as development or test databases).\n* **Dynamic Data Masking (DDM):** Applies the masking on the fly based on the privileges of the user running the query (e.g. a customer-support agent sees the masked PII `XXXX-XXXX-1234`, while the administrator sees the entire number).",
    examTip: "Data Masking allows PII information to be protected and GDPR compliance to be met by sharing realistic databases with development teams without exporting real data.",
  },
  ObfuscationSec: {
    name: "Obfuscation",
    definition: "Obfuscation: the process of making the source code of a software or a data structure difficult to understand or decode for the human eye, while keeping the original functionality intact.",
    details: "Obfuscation hinders software analysis and defends intellectual property:\n* **Obfuscation:** Logical reorganization, renaming of variables and insertion of redundant instructions to make the code hard to analyze, without altering its execution behavior.\n* **Reverse Engineering:** The technique used by hackers or competitors to disassemble, decompile or analyze the binary or compiled files of an application in order to reconstruct its original source code and understand its internal logic.\n* **Tools:** Obfuscation is performed by automatic tools (e.g. ProGuard for Java/Android, JavaScript obfuscators) to actively hinder Reverse Engineering activities.",
    examTip: "Obfuscation is a defensive measure against the Reverse Engineering of client-side code; it represents a classic example of 'Security through Obscurity' and should be combined with other countermeasures.",
  },
  SanitizationSec_New: {
    name: "Sanitization",
    definition: "Sanitization: a process aimed at removing, cleaning or neutralizing sensitive data or potentially harmful code from an input flow or storage media to ensure its security.",
    details: "The term applies mainly in two critical contexts:\n* **Input Sanitization:** A practice applied in software development to clean the input entered by users (e.g. web forms, search bars) before processing it or sending it to the database. It consists of eliminating, escaping or filtering special characters (such as apostrophes, quotation marks, semicolons, angle brackets) used for injection attacks.\n* **Data Sanitization (on Media):** A process to make data previously stored on hard disks or tapes completely unrecoverable even against laboratory analysis, before decommissioning or reusing the media.\n\n* **Focused Mini-Example:** A web registration form receives the user's input. Before running the query in the backend database, the server applies **Input Sanitization** by converting the special characters into safe HTML entities, instantly disarming any SQL injection or XSS attack attempt.",
    examTip: "**Mind the term: in the exam syllabus it means two different things.** Here it is **input sanitization**, neutralizing the special characters arriving from a user before they are used (Obj 3.3); in objective 4.2, **media sanitization** is something else entirely â€” making data unrecoverable from a disk before disposing of it. Context decides: if the text is about *input, fields, queries*, it is the first; if about *decommissioning, disks, reuse*, it is the second.\n* **On the input side, the correct hierarchy of defenses:** against **SQL injection** the real solution is **parameterized queries** (*prepared statements*), which separate code from data; against **XSS** it is **output encoding** matched to the context the data is placed in. Input sanitization is a **complementary** defense â€” valuable, but insufficient on its own, because filtering characters by list is a game the attacker can always reopen.",
  },

  /* ---- Group 5: Resilience & Recovery ---- */
  LoadBalancingRes: {
    name: "Load Balancing & Load Balancers",
    definition: "Load balancing: the intelligent distribution of incoming network or application traffic across multiple backend servers.",
    details: "Architectures and balancing:\n* **Purpose:** It prevents the overload of a single server, optimizes performance and guarantees service availability in case of a node malfunction.\n* **Active-Active:** All the backend servers handle user requests simultaneously in parallel, maximizing efficiency.\n* **Active-Passive (Standby):** A main server handles all the traffic; the secondary server is on standby and automatically takes over only if the main one fails.\n* **Health Checks:** The balancer periodically sends requests to the servers to verify that they are active. If a server stops responding, it is automatically removed from the traffic rotation.\n\n* **Focused Mini-Example:** During Black Friday, an e-commerce site receives millions of visits. A load balancer (**Load Balancer**) evenly distributes the connections in *Active-Active* mode across five different web servers. If server #3 breaks due to a memory failure, the health check detects it in a few seconds and the balancer redirects all the traffic to the remaining four servers without any user noticing disruptions.",
    examTip: "Load Balancing guarantees High Availability by making the traffic-processing capacity redundant and dynamically excluding failed servers.",
  },
  FaultToleranceConcept: {
    name: "Fault Tolerance",
    definition: "The ability of a system to continue functioning correctly even in the presence of hardware or software failures.",
    details: "The key concepts include:\n* **Fault Tolerance:** A property that allows a system not to interrupt the delivery of services even in case of failure of one or more components (e.g. redundant power supplies, RAID controllers for hard disks, network cards in bonding/teaming).\n* **Active-Active:** A clustering configuration in which all nodes actively process requests in parallel, distributing the load.\n* **Active-Passive:** A configuration in which a primary node handles the traffic and a secondary node (hot standby) automatically takes over in case of failure of the primary (failover).\n* **Redundancy:** Duplication of critical components to eliminate Single Points of Failure (SPOF).",
    examTip: "**The distinction, in terms of downtime:** **high availability** aims to **minimize** downtime â€” one node fails, another takes over, and the user perceives at most a few seconds of interruption. **Fault tolerance** aims for **none at all**: the redundant component is already working in parallel and the failure does not show.\n* **How far it actually goes:** fault tolerance masks the failures the **design anticipated** â€” one power supply of two, one disk in a RAID set, one node of a cluster. A failure **outside that envelope** still stops the service: both power feeds going down, a software defect replicated across every node, a misconfiguration propagated everywhere. Redundant hardware does not protect against whatever is identical on every copy.",
  },
  ClusteringRes: {
    name: "Server Clustering",
    definition: "Clustering: the joining of multiple independent physical or virtual computers (nodes) to work together as if they were a single unified system.",
    details: "Advantages of clustering:\n* **High Availability (HA):** It provides Fault Tolerance. If a node in the cluster fails, the other nodes absorb its workload completely transparently for the end users (Failover).\n* **Scalability:** It allows additional nodes to be added on the fly to cope with increases in the demand for compute or database resources.\n* **Examples:** Database clusters (e.g. Microsoft SQL Server Cluster, PostgreSQL Cluster) and virtualization compute clusters (VMware ESXi Cluster).\n\n* **Focused Mini-Example:** A company configures an *Active-Passive* SQL Server **cluster** made up of two distinct physical servers connected to the same SAN storage unit. If the primary server suddenly shuts down due to a power-supply failure, the secondary server takes control of the database (Failover) in less than 10 seconds, keeping the corporate transactions active.",
    examTip: "Database server clustering guarantees the operational continuity of the data service in case of a catastrophic hardware failure of an entire backend server.",
  },
  HotSiteRes: {
    name: "Hot Site",
    definition: "Hot Site: a fully equipped and active disaster recovery center, a mirror of the primary production site.",
    details: "Main characteristics:\n* **State:** It has the same identical hardware as the main site, with the data constantly replicated in real time or with minimal differences of a few minutes.\n* **RTO (Recovery Time Objective):** Extremely low, often on the order of seconds or minutes, because the switch to the secondary site (Failover) is almost instantaneous.\n* **Costs:** Very high, because the company pays for double the production infrastructure, with associated energy and management costs.\n\n* **Focused Mini-Example:** An investment bank maintains a **Hot Site** 100 km away from its main datacenter. All financial data and customer transactions are replicated on the fly in synchronous mode; in case of a fire at the main site, the systems fail over to the secondary site with data loss tending to zero **provided** replication is synchronous and the failover has been tested.",
    examTip: "The Hot Site is the correct choice on the exam when the tolerable corporate RTO is minimal (close to zero) and the budget is not a constraint.",
  },
  WarmSiteRes: {
    name: "Warm Site",
    definition: "Warm Site: a partially equipped disaster recovery center with connectivity, utilities and physical servers ready, but without up-to-date data.",
    details: "Main characteristics:\n* **State:** The hardware, connectivity and utilities are already in place and configured, but the data is not current: it must be restored manually from the latest corporate backups kept offsite. This is what separates it from a Cold Site, where the hardware still has to be purchased and installed.\n* **RTO (Recovery Time Objective):** It requires from a few hours to several days for complete startup and data restoration from the backups.\n* **Costs:** Moderate, representing an excellent balance between operating costs and recovery times for many organizations.\n\n* **Focused Mini-Example:** A clothing store chain opts for a **Warm Site**: the network infrastructure and servers are ready in a secondary datacenter, but in case of disaster the system administrators must go on-site and physically restore the last nightly backup of the sales data, an operation that takes about 12 hours.",
    examTip: "The Warm Site offers the best cost-effectiveness compromise for companies that can afford a few hours or a couple of days of downtime before recovery.",
  },
  ColdSiteRes: {
    name: "Cold Site",
    definition: "Cold Site: a simple empty physical space set up with basic utilities (power, network, air conditioning) but without any hardware or data.",
    details: "Main characteristics:\n* **State:** There are no servers, storage, or ready-to-use backups. In case of disaster, the company must purchase, transport, configure and install all the hardware from scratch.\n* **RTO (Recovery Time Objective):** Extremely long, usually measured in weeks, because it requires the entire hardware supply chain.\n* **Costs:** Minimal, suitable for companies with a reduced budget that do not offer critical online services.\n\n* **Focused Mini-Example:** A legal consulting firm rents an empty space in a secure warehouse as a **Cold Site**. In case of destruction of their office, the company will have to order new computers and servers from the manufacturer, have them delivered to the warehouse, cable them and install all the software and data, with estimated recovery times of about three weeks.",
    examTip: "The Cold Site is ideal for organizations that are not affected by long downtime windows (long RTO, weeks) and that want to minimize fixed costs.",
  },
  BackupsRes: {
    name: "Backups",
    definition: "Periodic security copy of corporate data to allow its restoration in case of accidental or intentional loss.",
    details: "Main types and strategies:\n* **Full Backup:** Copies all the files. It offers the fastest restore but requires a lot of space and execution time.\n* **Differential Backup:** Copies the files modified since the last *Full*. It requires increasing time each day; to restore, the Full and the last Differential are needed.\n* **Incremental Backup:** Copies the files modified since the last backup of any type. It is the fastest to run; to restore, the Full and *all* the intermediate incrementals are needed.\n* **3-2-1 Rule:** 3 copies of the data, on 2 different media, 1 offsite (in the cloud or on a remote tape).\n* **Offline backup (Air-gapped):** Copies disconnected from the network to prevent ransomware from encrypting them.\n\n* **Focused Mini-Example:** A network administrator plans the security strategy: every Saturday evening they run a complete **Full Backup** of the file server, while from Monday to Friday night they run an **Incremental Backup** that copies only the files modified in the last 24 hours, saving space and daily computation time.",
    examTip: "In an exam scenario where you want to minimize the daily backup time, the optimal combination is a weekly Full supported by daily Incrementals.",
  },
  ReplicationRes: {
    name: "Replication",
    definition: "Data replication: the continuous real-time or deferred copying of data from one system to another, typically located in a distinct geographic area.",
    details: "Fundamental types:\n* **Synchronous Replication:** Writes the data simultaneously on both the primary site and the replica site before confirming the completion of the write. It can target RPO = 0 **for acknowledged writes**, provided replication, quorum and failover are configured and tested; in exchange it is subject to network latency, which limits the useful distance between sites. **What it leaves out:** transactions not yet acknowledged, logical errors that replication faithfully propagates (a mistaken deletion is replicated at once) and common-mode failures. This is why replication **does not replace backups**.\n* **Asynchronous Replication:** Writes the data on the main site and, with a time delay (e.g. a few seconds or minutes), replicates it to the secondary site. It does not introduce write latency but exposes to the risk of losing the not-yet-replicated data in case of a crash.\n\n* **Focused Mini-Example:** An international stock-exchange application uses **synchronous replication** between two database servers: when a user buys a stock, the operation is recorded simultaneously in both databases before giving the visual OK to the user: an acknowledged transaction cannot be lost if the primary site fails.",
    examTip: "Synchronous replication is recommended for high-value financial transactions and banking databases where no data loss is tolerable, provided very-low-latency connections are available.",
  },
  SnapshotsRes: {
    name: "Snapshots",
    definition: "Snapshot: an instant photo of the state and data of a system (e.g. a virtual machine) at a precise moment in time.",
    details: "Characteristics and limits:\n* **Operation:** It records the incremental changes relative to the initial state starting from the moment of the snapshot. It allows you to 'go back in time' instantly if a software update fails or damages the system.\n* **It is not a complete backup:** The snapshot depends entirely on the integrity of the original primary disk on which it resides; if the primary disk breaks, the snapshot is useless.\n\n* **Focused Mini-Example:** Before installing an important cumulative Windows Server update package on a critical virtual machine, a system administrator takes a **Snapshot** of the VM. The update fails, sending the server into a BSOD (blue screen); the administrator clicks 'Restore snapshot' and the server immediately returns operational to the state it was in 5 minutes earlier.",
    examTip: "Snapshots do not constitute a self-sufficient backup copy; they are instead excellent for creating quick restore points before making risky changes or system updates.",
  },
  RecoveryRes: {
    name: "Recovery",
    definition: "The process of operationally restoring data, systems and processes following an incident or a disaster.",
    details: "Fundamental planning parameters:\n* **RTO (Recovery Time Objective):** The maximum tolerable amount of time to restore a system following an interruption before it causes unacceptable damage to the business.\n* **RPO (Recovery Point Objective):** The maximum amount of data (measured in time, e.g. 'data of the last 2 hours') that the organization can afford to lose due to a failure.\n* **Recovery Testing:** It is essential to test the recovery plans regularly (simulations, table-top exercises) to ensure that the backups work and the employees know the procedures.\n\n* **Focused Mini-Example:** An airline-booking site establishes an **RTO** of 20 minutes and an **RPO** of 5 minutes. In case of a sudden crash of the main booking server, the IT security team must be able to bring the service back online in less than 20 minutes, losing at most the transactions of the last 5 minutes before the failure.",
    examTip: "The RPO determines the minimum frequency with which to perform backups (e.g. if the RPO is 4 hours, a backup must be made at least every 4 hours).",
  },
  UPSRes: {
    name: "UPS",
    definition: "Uninterruptible Power Supply: a battery-based continuity unit that provides immediate and temporary electrical power in case of voltage fluctuations or blackouts.",
    details: "Purposes and operation:\n* **Immediacy:** It reacts in fractions of a second to protect the servers from power surges and micro-interruptions that would cause the machines to reboot or crash.\n* **Time window:** It provides enough energy (usually for 15-30 minutes) to allow a controlled shutdown of the systems (graceful shutdown) or to wait for the diesel generators to reach full capacity.\n\n* **Focused Mini-Example:** During a violent summer storm, lightning strikes the local power plant, cutting off the power to an entire office building. In the office servers, the battery **UPS** immediately kicks in, keeping the servers on for the time needed to shut them down safely, avoiding file corruption on the database.",
    examTip: "The UPS provides immediate short-term battery power; it is not designed to run a data center for days during a prolonged blackout.",
  },
  GeneratorsRes: {
    name: "UPS vs Generator (Comparison)",
    definition: "The comparison between the two emergency power systems: the UPS covers the instant of the blackout on batteries, the generator sustains the load over the long run by burning fuel. They are complementary, not alternatives.",
    details: "On the exam these two devices are systematically set against each other, but the correct answer is almost always that **you need both**, because they cover two different time windows.\n* **The problem being solved:** a generator cannot start instantly (it has to spin up a combustion engine and stabilize voltage and frequency: 1 to 3 minutes). During those minutes, without a UPS, every server goes down anyway.\n* **The correct continuity chain:** blackout -> the UPS takes over within milliseconds on batteries -> the generator starts and stabilizes -> the generator assumes the load -> the UPS recharges its batteries and stands ready for the next event.\n* **The generator's weak p×Î·ïÞ›Ê×¬¢h­µç]˜Y][Û˜[[]š\\È[œÝ[YÛˆ]™\žH]šXÙH‹ˆÊHš[ÛY]šXÈ]][XØ][ÛˆÙˆHXÚšXÚX[œÈÛÜšÚ[™È[ˆHšY[‹ˆ‘
HH™X[][YHÜ\˜][™ÈÞ\Ý[H
•ÔÊKÚXÚÝX\˜[Y\È]\›Z[š\ÝXÈ™\ÜÛœÙH[Y\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHYÚ][HÚYÛ™Yš\›]Ø\™H™\šYšYY]›ÛÝ[™[ˆ]][XØ]Y\]HÚ[›™[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆ[ˆ[X™YYÞ\Ý[HHÛÙØ\™H
Šš\ÊŠˆHš\›]Ø\™NˆÚÙ]™\ˆX[˜YÙ\ÈÈ™\XÙH]ÝÛœÈH]šXÙH›Ü™]™\‹™XØ]\ÙH\™H\È›ÈÜ\˜][™ÈÞ\Ý[H[™\›™X]È\X[ËˆYÚ][HÚYÛš[™ÈHš\›]Ø\™K™\šYšYY]]™\žH›ÛÝYØZ[œÝH\™Ø\™H›ÛÝÙˆ\Ý[œÝÙ\œÈ^XÝHH\\ÛÙH\ØÜšX™Yˆš\›]Ø\™H[\™YžH[ˆ^\›˜[XÚšXÚX[ˆ˜Z[È™\šYšXØ][Ûˆ[™H]šXÙHÙ\È›ÝÝ\ˆH]][XØ]Y\]HÚ[›™[^[™ÈHØ[YHÝX\˜[YHÝ™\ˆ[YK[™]\ÈÚ]\È™X[H™YYYÛˆ[š]È]Ý^H[ˆHšY[›Üˆ[ˆÜˆšYY[ˆYX\œË˜\ˆ™^[Û™HY™HÙˆH›Ú™XÝ]Ü™X]Y[Kˆ[Û™ÜÚYH\ËHÛ\ÜÚXÈÕÛÝ[\›YX\Ý\™\ÈÝ[\KÚXÚH]Y\Ý[ÛˆÙ\È›Ý\ÚÈX›Ý]]ÚXÚ\™HÛÜ™[Y[X™\š[™Îˆ
ŠœÙYÛY[][ÛŠŠˆÙˆHXZ[[˜[˜ÙH™]ÛÜšË\ØX›[™ÈXYÈ[\™˜XÙ\È
•QËÙ\šXÙHÙ\šX[ÜÊH[™™\XÚ[™ÈY˜][Ü™Y[X[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
Š‘
H[ˆ•ÔÎŠŠˆH\Ý˜XÝÜˆÈ™XÛÙÛš^™KˆH™X[][YHÜ\˜][™ÈÞ\Ý[H[œÝÙ\œÈH
Š[Z[™ÊŠˆ™\]Z\™[Y[˜[Y[HÝX\˜[YZ[™È]H\ÚÈš[š\Ú\ÈÚ][ˆH™YXÝX›HXY[™Kˆ]\È›ÝHÙXÝ\š]HÛÛ›Û[™[ˆ˜XÝX[žH•ÔÙ\È[X™\˜][H›ÜH›ÝXÝ[ÛœÈ]ÛÝ[[›ÙXÙH›Û‹Y]\›Z[š\ÝXÈ][˜ÞH8 %TÓ‹ÝXÚÈØ[˜\šY\Ë›ËY^XÝ]H8 %X]š[™È[H
Š›[Ü™JŠˆ^ÜÙYÈY™™\ˆÝ™\™›ÝÜË›Ý\ÜË—ˆ
ˆ
ŠŠH˜Y][Û˜[[]š\\ÎŠŠˆ™\Ý\ÜÙ\ÈHÙ[™\˜[\\œÜÙHÜ\˜][™ÈÞ\Ý[K[\HÛÛ\]H™\ÛÝ\˜Ù\È[™ÛÛ[[Ý\ÈÚYÛ˜]\™H\]\ËˆHÛÛ›Û\ˆÚ]H™]ÈYYØXž]\ÈÙˆY[[ÜžH[™›ÈÛÛ›™XÝ[ÛˆÈH[\›™]Ø[››ÝÜÝÛ™K[™ÚYÛ˜]\™KX˜\ÙY[˜[\Ú\ÈÛÝ[›Ý™XÛÙÛš^™H™\ÜÚÙH[\\™Yš\›]Ø\™H[ž]Ø^K—ˆ
ˆ
ŠÊHš[ÛY]šXÈ]][XØ][ÛˆÙˆXÚšXÚX[œÎŠŠˆÛÝ™\›œÈ
ŠÚÊŠˆØ[ˆ\ÚXØ[H™XXÚH[š][™\ÈH\ÙY[ÛÛ›Ûˆ]]Ø^\È›Ý[™ÈX›Ý]
ŠÚ]
ŠˆÙ]ÈØYYˆH\™™XÝH]][XØ]YXÚšXÚX[ˆÚÈ[œÝ[ÈÛÛ\›ÛZ\ÙYš\›]Ø\™H[ˆÛÛÙ˜Z]\ÜÙ\È]™\žHš[ÛY]šXÈÚXÚË——Šˆ
Š‘^[H˜\ŠŠˆÚ[ˆH]Y\Ý[ÛˆÛÛ˜Ù\›œÈ[X™YYPÔÈÜˆÐÐQHÞ\Ý[\Ë\Ý\Ý[œÝÙ\œÈ›Üœ›ÝÙYœ›ÛHHÈÛÜ›ˆH™X[ÛÛœÝ˜Z[È\™NˆZ[š[X[Y[[ÜžH[™ÔK›ÈÚ[˜ÙHÈÝÜH[›Üˆ\]\ËY™HÞXÛ\ÈYX\Ý\™Y[ˆXØY\Ë[™\ÝšX[›ÝØÛÛÈ\ÚYÛ™YÚ]Ý]]][XØ][Û‹ˆ[˜ÙHHÛÛ›ÛÈ]ÛÜšÎˆ
Šš\™Ø\™H›ÛÝÙˆ\Ý[™ÚYÛ™Yš\›]Ø\™JŠ‹
ŠœÙYÛY[][ÛŠŠˆ[™\ÜÚ]™H[Ûš]Üš[™Ë
Š˜ÛÛ\[œØ][™ÈÛÛ›ÛÊŠˆÚ[ˆH]ÚØ[››Ý™H\YYˆ‹ˆKˆŽŽˆÂˆÜXÎˆ’[™œ˜\ÝXÝ\™HÙYÛY[][ÛœÈ	ˆÜÛÙÚY\È‹ˆØÙ[˜\š[Îˆ”Ø\ÚKH™]ÛÜšÈ[™Ú[™Y\ˆ]Ù[H[››Ý˜][ÛœÈË\È™\Ù[[™ÈÈH›Ø\™HY˜[YÙ\ÈÙˆØÜ™Y[™YÝX›™]È[ˆH™]ÈÙ™šXÙHÛÛ™šYÝ\˜][Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\ÈHš[X\žHY˜[YÙHÙˆXÚ[™È[\›™]XXØÙ\ÜÚX›HÙ\™\œÈ
ÝXÚ\ÈÙXˆÙ\™\œÊHÛˆHØÜ™Y[™YÝX›™]È‹ˆÜ[ÛœÎˆÂˆJH]›ÝšY\È]]ÛX]XÈ˜XÚÝ\È›ÜˆHÙ\™\œÈ‹ˆŠH][ÝÜÈHÙ\™\œÈÈž\\ÜÈHš\™]Ø[[\È‹ˆÊH][˜Ü™X\Ù\ÈHÙ\™\œÉÈ›ØÙ\ÜÚ[™ÈÜYY‹ˆ‘
HYˆÛÛ\›ÛZ\ÙY]™]™[ÈXØÙ\ÜÈÈH[\›˜[™]ÛÜšÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HYˆÛÛ\›ÛZ\ÙY]™]™[ÈXØÙ\ÜÈÈH[\›˜[™]ÛÜšÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
ŠœØÜ™Y[™YÝX›™]
Šˆ
HÛ\ˆ˜[YH\ÈVŠH\È[ˆ[\›YYX]H™]ÛÜšÈÜÝ[™ÈH[\›™]Y˜XÚ[™ÈÙ\šXÙ\Ë™[˜ÙYžHš\™]Ø[[\ÈÛˆ›ÝÚY\ËˆÚÙ]™\ˆÛÛ\›ÛZ\Ù\ÈHÙXˆÙ\™\ˆ[™È\
Šš[œÚYHHØÜ™Y[™YÝX›™]›Ý[œÚYHHÛÛ\[žJŠŽˆÈÛÈ\\ˆ^H]\ÝÙ]\ÝHÙXÛÛ™Ù]Ùˆ[\È]\›Z]ÈÛ›HH[™\Ü[œØX›H›ÝÜÈ
]Ù\™\‹È]ÜÛˆ]]X˜\ÙJH[™[šY\È]™\ž][™È[ÙKˆ]\ÈHÛ›HÜ[ÛˆÛˆH\Ý]\ØÜšX™\ÈHÙ[Z[™HÙXÝ\š]H™[™Yš]—Šˆ
Š•Ú\™HH[Z]Y\ÎŠŠˆÙYÛY[][Ûˆ
Š˜ÛÛ™š[™\ÊŠ‹]Ù\È›Ý™]™[ˆYˆH[\ÈÝØ\™ÈH[œÚYH\™H\›Z\ÜÚ]™KYˆHVˆÙ\™\ˆ\ÈÛXZ[‹Z›Ú[™YÜˆÛÈÜ™Y[X[È˜[YÛˆH[\›˜[™]ÛÜšË]\˜[[Ý™[Y[\ÈÝ[ÛˆHX›KˆHØÜ™Y[™YÝX›™]ÛÜšÜÈ[™\ˆÛÈÛÛ™][ÛœÎˆ[˜›Ý[™]ËZ[\›˜[[\ÈÝ]ÈHÝšXÝZ[š[][K[™›Èš]š[YÙYÜ™Y[X[ÈÛˆH^ÜÙYÞ\Ý[\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆØÜ™Y[™YÝX›™]ÈÈ›Ý›ÝšYH]]ÛX]XÈ˜XÚÝ\ÎÈ˜XÚÝ\ÛÛ][ÛœÈ\™H[\[Y[YÙ\\˜][K—ˆ
ˆ
ŠŠJŠˆÙ\™\œÈ[ˆHØÜ™Y[™YÝX›™]\™HÝXš™XÝÈÜXÚYšXÈš\™]Ø[[\ÈÈX[˜YÙH[˜›Ý[™[™Ý]›Ý[™˜Y™šXÎÈ^HÈ›Ýž\\ÜÈHš\™]Ø[—ˆ
ˆ
ŠÊJŠˆ™]ÛÜšÈ\ÚYÛˆØ[ˆY™™XÝ\™›Ü›X[˜ÙK]HXZ[ˆ\œÜÙHÙˆHØÜ™Y[™YÝX›™]\ÈÙXÝ\š]K›Ý\™›Ü›X[˜ÙH[\›Ý™[Y[ˆ‹ˆKˆŽÎˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHš\ÚÈX[˜YÙ\ˆØ[ÈÈ[™\œÝ[™HÛÛ˜Ù\Ùˆ^ÜÝ\™H˜XÝÜˆ[ˆHÛÛ^Ùˆ[™\˜Xš[]HX[˜YÙ[Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[˜Ý[ÛˆÙˆ[ˆ	Ù^ÜÝ\™H˜XÝÜ‰È[ˆHÛÛ^Ùˆ[™\˜Xš[]HX[˜YÙ[Y[È‹ˆÜ[ÛœÎˆÂˆJH[ˆ^ÜÝ\™H˜XÝÜˆYX\Ý\™\ÈH›Ø˜Xš[]H]H[™\˜Xš[]H\È^Ú]Y‹ˆŠH[ˆ^ÜÝ\™H˜XÝÜˆ]˜[X]\ÈH]™[Ùˆ[™\˜Xš[]H[ˆ[ˆÜ™Ø[š^˜][Û‰ÜÈ™]ÛÜšÈ[™œ˜\ÝXÝ\™H‹ˆÊH[ˆ^ÜÝ\™H˜XÝÜˆ[ÈÜ™Ø[š^˜][ÛœÈ]˜[X]HH[Û™]\žH[\XÝÙˆHÙXÝ\š]Hœ™XXÚ‹ˆ‘
H[ˆ^ÜÝ\™H˜XÝÜˆ™Y™\œÈÈH[YH™YYYÈ]XÝ[™™\ÜÛ™ÈHÙXÝ\š]H[˜ÚY[‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[ˆ^ÜÝ\™H˜XÝÜˆ[ÈÜ™Ø[š^˜][ÛœÈ]˜[X]HH[Û™]\žH[\XÝÙˆHÙXÝ\š]Hœ™XXÚ
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š™^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ\ÈH
Šœ\˜Ù[YÙJŠˆÙˆ[ˆ\ÜÙ]	ÜÈ˜[YHÜÝYˆH™X\™Y]™[ØØÝ\œËˆ]\ÈHÛ›HÛ™HÙˆH›Ý\ˆÜ[ÛœÈYYÈ][™ÈHšYÝ\™HÛˆH[XYÙNˆÚ]Ý]Q‹H\ÜÙ]˜[YHÛˆ]ÈÝÛˆØ^\È›Ý[™ÈX›Ý]ÝÈ]XÚ\ÈXÝX[HÜÝ[ˆHÚ[™ÛH\\ÛÙK—Šˆ
Š“Z[™HÛÜ™[™ÎŠŠˆHQˆ
Šš\È›Ý
Šˆ[ˆ[[Ý[[ˆÝ\œ™[˜ÞK]\ÈH\˜Ù[YÙKˆ]™XÛÛY\È[ˆ[[Ý[Ú[ˆ][\œÈHÚZ[ˆÙˆ›Ü›][\ÈÙˆ]X[]]]™Hš\ÚÈ[˜[\Ú\Î—ˆ
ˆ
Š”ÓHHUˆ0åÈQŠŠˆ8 %HÜÜÈ^XÝYœ›ÛH
Š›Û™HÚ[™ÛJŠˆ]™[

”Ú[™ÛHÜÜÈ^XÝ[˜ÞJŠKÝ\[™Èœ›ÛHH
\ÜÙ]˜[YJ‹—ˆ
ˆ
ŠSHHÓH0åÈT“ÊŠˆ8 %HÜÜÈ^XÝY
Š›Ý™\ˆHYX\ŠŠ‹][\Z[™ÈžHH\Ý[X]Y[›X[œ™\]Y[˜ÞHÙˆH]™[

[›X[^™Y˜]HÙˆØØÝ\œ™[˜ÙJŠK——ˆ
Š‘^[\NŠŠˆH	Ù\™\ˆ]Hš\™HÛÝ[[XYÙHžHL	H\ÈQˆHKÛÈÓHH	ŒˆYˆÝXÚHš\™H\È^XÝYÛ˜ÙH]™\žH[ˆYX\œÈ
T“ÈHŒJKHSH\È	‹HYX\‹ˆHSH\ÈHšYÝ\™H[ÝHÛÛ\\™HYØZ[œÝH[›X[ÛÜÝÙˆHÛÛ›Û—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆH›Ø˜Xš[]H]H[™\˜Xš[]H\È^Ú]Y\ÈHZÙ[ZÛÙÜ›Ø˜Xš[]K›ÝH^ÜÝ\™H˜XÝÜ‹—ˆ
ˆ
ŠŠJŠˆH]™[Ùˆ[™\˜Xš[]H[ˆH™]ÛÜšÈ[™œ˜\ÝXÝ\™H\È]˜[X]YžH[™\˜Xš[]H\ÜÙ\ÜÛY[›ÝžHH^ÜÝ\™H˜XÝÜ‹—ˆ
ˆ
Š‘
JŠˆH[YHÈ]XÝ[™H[YHÈ™\ÝÜ™HÙ\šXÙH\™HYX\Ý\™YžHYX[ˆ[YHÈ]XÝ
U
H[™YX[ˆ[YHÈ™\Z\ˆ
UŠK›ÝžHH^ÜÝ\™H˜XÝÜ‹ˆ‹ˆKˆŽˆÂˆÜXÎˆ]]ÛX][Ûˆ	ˆÜ˜Ú\Ý˜][Ûˆ‹ˆØÙ[˜\š[ÎˆHÛÝY\˜Ú]XÝØ[ÈÈ[™\œÝ[™HY˜[YÙ\ÈÙˆ]]ÛX][™È™\ÛÝ\˜ÙH›Ýš\Ú[Ûš[™È›ÜˆÛÝY[™œ˜\ÝXÝ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆ]]ÛX][™È™\ÛÝ\˜ÙH›Ýš\Ú[Ûš[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH][Z]È™\ÛÝ\˜Ù\ÈÈÛ›H™YYš[™YÛÛ™šYÝ\˜][ÛœÈ‹ˆŠH]XÜ™X\Ù\ÈH›^Xš[]H[™Y\Xš[]HÙˆÛÝYÞ\Ý[\È‹ˆÊH][œÝ\™\È]Û›HÛ™H\Ù\ˆ]H[YHØ[ˆXØÙ\ÜÈH™\ÛÝ\˜ÙH‹ˆ‘
H][È[ˆH˜\YØØ[[™ÈÙˆ™\ÛÝ\˜Ù\È˜\ÙYÛˆ[X[™‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H][È[ˆH˜\YØØ[[™ÈÙˆ™\ÛÝ\˜Ù\È˜\ÙYÛˆ[X[™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]]ÛX][™È
Šœ™\ÛÝ\˜ÙH›Ýš\Ú[Ûš[™ÊŠˆ[ÝÜÈÛ‹]KY›HY\ÝY[Ë[˜X›[™ÈH[š\›Û›Y[ÈY\]ZXÚÛHÈÛÜšÛØY™YYËˆ\È\È\XÝ[\›HÜš]XØ[[ˆÛÝY[š\›Û›Y[ÈÚ\™H™\]Z\™[Y[ÈØ[ˆÚ[™ÙH]ZXÚÛH[™[Y[HY\ÝY[È\™H™YYY—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[ÝYÚ[\]\ÈØ[ˆ™H\ÙY]]ÛX][ÛˆØ[ˆ[ÛÈ›Ýš\Ú[ÛˆÝ\ÝÛHÛÛ™šYÝ\˜][ÛœÈ˜\ÙYÛˆHYš[™YÛXÚY\Ë›Ý\Ý™YYš[™YÛÛ™šYÝ\˜][ÛœË—ˆ
ˆ
ŠŠJŠˆÛˆHÛÛ˜\žK]]ÛX][™È™\ÛÝ\˜ÙH›Ýš\Ú[Ûš[™È
Šš[˜Ü™X\Ù\ÊŠˆH›^Xš[]H[™Y\Xš[]HÙˆÛÝYÞ\Ý[\Ë—ˆ
ˆ
ŠÊJŠˆ™\ÛÝ\˜ÙH›Ýš\Ú[Ûš[™ÈÛÛ˜Ù\›œÈHY™šXÚY[›Ýš\Ú[ÛˆÙˆ™\ÛÝ\˜Ù\Ë›Ý[Z][™ÈXØÙ\ÜÈÈHÚ[™ÛH\Ù\‹ˆ‹ˆKˆŽNˆÂˆÜXÎˆ˜\Ù[[™\È	ˆÛÛ™šYÝ\˜][Ûˆ‹ˆØÙ[˜\š[Îˆ”ØÚ[\‹H™]ÛÜšÈYZ[š\Ý˜]Ü‹\ÈÛÛ™šYÝ\š[™ÈH™]ÈÚKQšH™]ÛÜšÈ›ÜˆHœ˜[˜ÚÙˆH][[˜][Û˜[ˆÚH\È[ˆH	Ù\ÝX›\Ú	È\ÙHÙˆÜ™X][™ÈÙXÝ\™H˜\Ù[[™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]Ú[ØÚ[\ˆÈ’T”Õ[ˆ\È\ÙOÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ™šYÝ\™HHÞ\Ý[HÙÜÈ›Üˆ]\™H]Y][™È[™[˜ÚY[Y]XÝ[ÛˆXÝ]š]Y\È‹ˆŠH\ÚYÛˆHÙ]ÙˆÙXÝ\š]HÛÛ™šYÝ\˜][ÛœÈ][˜ÛYH[˜Üž\[ÛˆÙ][™ÜËš\™]Ø[[™XØÙ\ÜÈÛÛ›ÛÈ‹ˆÊHÚXÚÈ[™[œÝ[H]\Ý\]\È›ÜˆH™]ÛÜšÉÜÈ›Ý]\œÈ[™XØÙ\ÜÈÚ[È‹ˆ‘
HÛÛ™XÝH[™\˜Xš[]H\ÜÙ\ÜÛY[È™\šYžHHÙXÝ\š]HÙˆH™]ÛHÛÛ™šYÝ\™YÚKQšH™]ÛÜšÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\ÚYÛˆHÙ]ÙˆÙXÝ\š]HÛÛ™šYÝ\˜][ÛœÈ][˜ÛYH[˜Üž\[ÛˆÙ][™ÜËš\™]Ø[[™XØÙ\ÜÈÛÛ›ÛÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\š[™ÈH
Š‰Ù\ÝX›\Ú	È\ÙJŠˆÙˆÙXÝ\™H˜\Ù[[™\ËHÙ]Ùˆ[š]X[ÛÛ™šYÝ\˜][ÛœÈ\È\ÚYÛ™Y[™[\[Y[Y][˜ÛY\ÈÙXÝ\š]HÛÛ›ÛÈÝXÚ\È[˜Üž\[Û‹š\™]Ø[[™XØÙ\ÜÈÛÛ›ÛËˆ\È˜\Ù[[™HØÙ[˜\š[È[œÝ\™\È]HÜXÚYšXÈÙXÝ\š]HÝ[™\™\ÈY]Ú[ˆHÞ\Ý[H\ÈÛÛ™šYÝ\™Y—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÛÛ™šYÝ\š[™ÈÙÜÈ\ÈHÜXÚX[\ÙˆXZ[Z[š[™ÈÙXÝ\š]K]\ÈÝ\\È\ÝX[H\ÜÛØÚX]YÚ]HÜ\˜][Û˜[ÛXZ[[˜[˜ÙH\ÙK—ˆ
ˆ
ŠÊJŠˆÚXÚÚ[™È[™[œÝ[[™È\]\È\È[\Ü[]\È\ÙˆHÜ\˜][Û˜[ÛXZ[[˜[˜ÙH\ÙK›ÝH\ÝX›\Ú\ÙK—ˆ
ˆ
Š‘
JŠˆ[™\˜Xš[]H\ÜÙ\ÜÛY[\È[ˆ\ÜÙ[X[›ØÙ\ÜÈÈY[YžHÝ[X[ÙXZÛ™\ÜÙ\Ë]\ÈÙ[™\˜[H\™›Ü›YYY\ˆ\ÝX›\Ú[™ÈHÙXÝ\™H˜\Ù[[™HÈ\Ý]ÈY™™XÝ]™[™\ÜËˆ‹ˆKˆŽLˆÂˆÜXÎˆ”\ÜÝÛÜ™ÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ”Ø\ÚKHÞX™\œÙXÝ\š]H[˜[\Ý][Ûˆ˜Z[š[™ÈÛÛ][ÛœË\È›ÝXÙY][\ÞYY\È[™È\ÙHHØ[YH\ÜÝÛÜ™ÈXÜ›ÜÜÈ][\HÛÜšÈ]›Ü›\ËˆÚH\ÈÛÜœšYYX›Ý]HÙXÝ\š]Hš\ÚÜÈ]\È™Z]š[Üˆ™\Ù[Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]ÚÝ[Ø\ÚH™XÛÛ[Y[™È‘TÕRUQÐUHHš\ÚÈ]HÛÛ\›ÛZ\ÙY\ÜÝÛÜ™XYÈÈ][\Hœ™XXÚ\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ™XÝ[Ü™Hœ™\]Y[ÙXÝ\š]H]Y]È‹ˆŠH˜Z[ˆ\Ù\œÈÛˆH[™Ù\œÈÙˆ\Ú[™È[XZ[È‹ˆÊH[˜Ü™X\ÙHHœ™\]Y[˜ÞHÙˆ\ÜÝÛÜ™^\˜][Ûˆ‹ˆ‘
H[\[Y[HÛXÞH]\ØÛÝ\˜YÙ\È\ÜÝÛÜ™™]\ÙH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[\[Y[HÛXÞH]\ØÛÝ\˜YÙ\È\ÜÝÛÜ™™]\ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆžH\Ú[™ÈY™™\™[\ÜÝÛÜ™È›ÜˆY™™\™[]›Ü›\ËHš\ÚÈ]HÚ[™ÛHÛÛ\›ÛZ\ÙY\ÜÝÛÜ™XYÈÈ][\Hœ™XXÚ\È\ÈZ[š[Z^™YˆH
Šœ\ÜÝÛÜ™™]\ÙHÛXÞJŠˆ
Ú]H\ÜÝÛÜ™Z\ÝÜžHXÚš\]YJHÝXÝ\˜[H›Ü˜Ù\ÈH\ÙHÙˆ[š\]YH\ÜÝÛÜ™È›ÜˆXXÚ]›Ü›K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÙXÝ\š]H]Y]È\™H[\Ü[]È›Ý\™XÝHY™\ÜÈHÜXÚYšXÈ›Ø›[HÙˆ\ÜÝÛÜ™™]\ÙHXÜ›ÜÜÈ][\H]›Ü›\Ë—ˆ
ˆ
ŠŠJŠˆ\Ú[™È˜Z[š[™È\È\ÜÙ[X[]Ù\È›Ý\™XÝH™]™[\ÜÝÛÜ™™]\ÙHXÜ›ÜÜÈ][\H]›Ü›\Ë—ˆ
ˆ
ŠÊJŠˆ[˜Ü™X\Ú[™ÈHœ™\]Y[˜ÞHÙˆ\ÜÝÛÜ™^\˜][ÛˆØ[ˆ[[ˆÛÛYHØÙ[˜\š[ÜË]Ù\È›Ý™XÙ\ÜØ\š[H\ØÛÝ\˜YÙH™]\ÙHXÜ›ÜÜÈY™™\™[]›Ü›\Ëˆ‹ˆKˆŽLNˆÂˆÜXÎˆ”\ÜÝÛÜ™ÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ“›Ý›ÕXÚ\ÈH\Ù\ˆX›HÙˆ]ÈÜ[ÝÛ[‹ˆH\ÜÝÛÜ™ÈÙ\™H›Ý[ˆÛX\^ˆ^HÙ\™HQH\Ú\ÈÚ]›È˜[™ÛH[[Y[YYˆÚ][ˆÝ\œÈH™\ÙX\˜Ú\ˆ[[ÛœÝ˜]\È]š[™È™XÛÝ™\™YÝ™\ˆÙ]™[H\ˆÙ[ÙˆHÜšYÚ[˜[\ÜÝÛÜ™ÈÚ]Ý]žZ[™ÈÛ™HÛÛXš[˜][Ûˆ]H[YKÚ[\HžHX]Ú[™ÈH\Ú\ÈYØZ[œÝ™KXÛÛ\]YX›\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚØ^HÙˆÝÜš[™È\ÜÝÛÜ™ÈÛÝ[]™HXYH\È]XÚÈ[\˜XÝXØ[È‹ˆÜ[ÛœÎˆÂˆJH[˜Üž\[™ÈH\ÜÝÛÜ™š[HÚ]QTËLM‹ÙY\[™ÈHÙ^HÛˆHØ[YHÙ\™\ˆ‹ˆŠH[™›Ü˜Ú[™ÈHZ[š[][H[™ÝÙˆZYÚÚ\˜XÝ\œÈÚ]]X\ÝÛ™HÞ[X›Û‹ˆÊH\Z[™ÈH\KY^H\ÜÝÛÜ™^\žHÛXÞH‹ˆ‘
HÝÜš[™ÈXXÚ\ÜÝÛÜ™\ÈH\ÚÚ]H\‹]\Ù\ˆ[š\]YHØ[\Ú[™ÈHÛÝÈ[˜Ý[ÛˆÝXÚ\È˜Üž\ØÜž\Üˆ\™ÛÛŒˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HH\ÚÚ]H\‹]\Ù\ˆ[š\]YHØ[[™HÛÝÈ[˜Ý[Ûˆ
˜Üž\ØÜž\\™ÛÛŒŠJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH]XÚÈ\ØÜšX™Y\ÈH
Šœ˜Z[˜›ÝÈX›JŠ‹[™]ÛÜšÜÈ›ÜˆÛÈ™X\ÛÛœÈ]]\Ý™HY™\ÜÙYÙ\\˜][KˆHš\œÝ\ÈHXœÙ[˜ÙHÙˆH
ŠœØ[
ŠŽˆÚ]›È˜[™ÛH˜[YHY™™\š[™È\ˆ\Ù\‹HØ[YH\ÜÝÛÜ™[Ø^\È›ÙXÙ\ÈHØ[YH\ÚÛÈ[ˆ]XÚÙ\ˆØ[ˆ™KXÛÛ\]HH\Ú\ÈÙˆš[[ÛœÈÙˆ\ÜÝÛÜ™ÈÛ˜ÙH[™[ˆÚ[\HÛÚÈ›ÜˆX]Ú\ËˆHØ[\Ý›Þ\È]XÛÛ›Û^Nˆ]›Ü˜Ù\ÈHÛÜšÈÈ™H™YÛ™Hœ›ÛHØÜ˜]Ú›Üˆ
Š™]™\žHÚ[™ÛH\Ù\ŠŠ‹[™XZÙ\È[žH™KXÛÛ\]YX›H\Ù[\ÜËˆHÙXÛÛ™™X\ÛÛˆ\ÈQIÜÈ
ŠœÜYY
Š‹\ÚYÛ™YÈ™H^™[Y[H˜\ÝˆH[Ù\›ˆÔHÛÛ\]\Èš[[ÛœÈ\ˆÙXÛÛ™ˆH[˜Ý[ÛœÈ\ÚYÛ™Y›Üˆ\ÜÝÛÜ™È8 %
Š˜˜Üž\
Š‹
ŠœØÜž\
Š‹
Š\™ÛÛŒŠŠˆ8 %ÈHÜÜÚ]Nˆ^H]™HH[˜X›HÛÜÝ
›Ý[™ËY[[ÜžK\˜[[\ÛJH]Ø[ˆ™H˜Z\ÙY\È\™Ø\™H[\›Ý™\ËÛÈ]Û™H][\ÛÜÝÈH]XÚÙ\ˆœ˜XÝ[ÛœÈÙˆHÙXÛÛ™[œÝXYÙˆ˜[›ÜÙXÛÛ™ËˆHÛÈYX\Ý\™\ÈÛÈÙÙ]\ŽˆHØ[™[[Ý™\È™KXÛÛ\]][Û‹HÛÝÛ™\ÜÈXZÙ\Èœ]H›Ü˜ÙHÛˆÚ]™[XZ[œÈ[˜Y™›Ü™X›K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[˜Üž\[™ÈHš[HÚ]QTÈ[™ÙY\[™ÈHÙ^HÛˆHØ[YHÙ\™\ŽŠŠˆ]\È™]™\œÚX›HžH\ÚYÛ‹[™ÚÙ]™\ˆÝÛHHX›H[[ÜÝÙ\Z[›H\ÈHÙ^HÛËÚ][™ÈšYÚ™^È]ˆ]H›Ø›[H[œÈY\\Žˆ\ÜÝÛÜ™ÈÚÝ[›Ý™H
Š™[˜Üž\Y
Š‹™XØ]\ÙH›Ø›ÙH8 %›Ý]™[ˆHÙ\™\ˆ8 %ÚÝ[™HX›HÈ™XY[H˜XÚËˆ^H]\Ý™H˜[œÙ›Ü›YY[ˆÛ™H\™XÝ[ÛˆÛ›K—ˆ
ˆ
ŠŠHZ[š[][H[™Ý[™ÛÛ\^]NŠŠˆÛÛ˜Ù\›ˆH\ÜÝÛÜ™
Š˜™Y›Ü™JŠˆ]\ÈÝÜ™Y[™Ù[Z[™[H[YØZ[œÝÝY\ÜÚ[™Ëˆ]^HÚ[™ÙH›Ý[™ÈX›Ý]ÝÈH\ÚØ\ÈÛÛ\]YˆYØZ[œÝX›\È™KXÛÛ\]YÝ™\ˆQK[ˆZYÚXÚ\˜XÝ\ˆ\ÜÝÛÜ™Ú]HÞ[X›Û˜[È[ž]Ø^K—ˆ
ˆ
ŠÊH\KY^H^\žNŠŠˆXÝÈ
Š˜Y\ŠŠˆHXZË›Ü˜Ú[™ÈHÚ[™ÙKˆ[ˆHØÙ[˜\š[ÈH\ÜÝÛÜ™ÈÙ\™H[™XYH™XÛÝ™\™YÚ][ˆÝ\œË[™H™X[[XYÙHY\È[Ù]Ú\™NˆHØ[YHÜ™Y[X[Ë™]\ÙYÛˆÝ\ˆÙ\šXÙ\ËÝ^H˜[Y\™H]™[ˆY\ˆHÜ[\ÜÝÛÜ™\ÈÚ[™ÙY——Šˆ
Š‘^[H˜\ŠŠˆ[H™YH˜[œÙ›Ü›X][ÛœÈ\\™XØ]\ÙH]Y\Ý[ÛœÈÝØ\[HÛÛœÝ[Kˆ
Š‘[˜Üž\[ÛŠŠˆH™]™\œÚX›HÚ]HÙ^K›Üˆ]H]]\Ý™H™XY˜XÚÈ0­È
Š’\Ú[™ÊŠˆHÛ™K]Ø^K›Üˆ]H]Û›H™YYÈÈ™H
Š™\šYšYY
Š‹ÝXÚ\È\ÜÝÛÜ™È0­È
Š•ÚÙ[š\Ø][ÛŠŠˆHÝXœÝ]][ÛˆÚ]H˜[YH™X\š[™È›ÈX][X]XØ[™[][Û‹[[ˆHÙ\\˜]H˜][ˆ›Üˆ\ÜÝÛÜ™ÈHšYÚ[œÝÙ\ˆ[Ø^\ÈÛÛXš[™\È™YH[™ÜÎˆ
Šš\Ú
Š‹
Šœ\‹]\Ù\ˆ[š\]YHØ[
Šˆ[™H
ŠœÛÝËÛÜÝ][˜X›H[˜Ý[ÛŠŠ‹ˆ‹ˆKˆŽLŽˆÂˆÜXÎˆ‘Ü›Ý\ÛXÞH	ˆXÝ]™H\™XÝÜžH‹ˆØÙ[˜\š[Îˆ–[ÝH\™HHÙXÝ\š]HYZ[š\Ý˜]Üˆ›ÜˆH\™ÙH›Û‹\›Ùš]Ü™Ø[š^˜][ÛˆÚ]][\H\\Y[È[™Y™™\™[ÙXÝ\š]H™\]Z\™[Y[ËˆHÜ™Ø[š^˜][Ûˆ\È˜XÙYÚ[[™Ù\È[ˆX[˜YÚ[™ÈHÙXÝ\š]HÙ][™ÜÈ[™ÛÛ™šYÝ\˜][ÛœÈÛˆH[™]šYX[ÛÛ\]\œËˆÈ[\›Ý™HÙXÝ\š]H[™Ú[\YžHX[˜YÙ[Y[[ÝHXÚYHÈ[\[Y[Ü›Ý\ÛXÞH[ˆHÚ[™ÝÜÈXÝ]™H\™XÝÜžH[š\›Û›Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›ØXÚ\ÈÛÝ[™HHSÔÕY™™XÝ]™HØ^HÈ[\[Y[Ü›Ý\ÛXÞH›ÜˆHÚ]™[ˆØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\ÚYÛˆÔÜÈÛÈ]XXÚ\È›È[Ü™H[ˆH\Ù\œÈÈ˜XÚ[]]H[Ûš]Üš[™È[™Ý\ÝÛZ^˜][Ûˆ‹ˆŠH\ÚYÛˆ][\HÔÜËXXÚÝ\ÝÛZ^™Y›ÜˆHÜXÚYšXÈÙXÝ\š]H™\]Z\™[Y[ÈÙˆH[™]šYX[\\Y[Ë[™\H[HXØÛÜ™[™ÛH‹ˆÊH[\[Y[Ü›Ý\ÛXÞH™Y™\™[˜Ù\ÈÈ\HHÙXÝ\š]HÙ][™ÜË[ÝÚ[™È[™\Ù\œÈÈ[ÙYžHHÛÛ™šYÝ\˜][ÛœÈ\È™YYY‹ˆ‘
HÜ™X]HHÚ[™ÛHÛÛ\™Z[œÚ]™HÔÈÚ][ÙXÝ\š]HÙ][™ÜÈ\YY[šY›Ü›[HÈ[\\Y[È[™ÛÛ\]\œÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\ÚYÛˆ][\HÔÜËXXÚÝ\ÝÛZ^™Y›ÜˆHÜXÚYšXÈÙXÝ\š]H™\]Z\™[Y[ÈÙˆH[™]šYX[\\Y[Ë[™\H[HXØÛÜ™[™ÛJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÜ™X][™È
Š˜Ý\ÝÛZ^™YÔÜÊŠˆ›ÜˆXXÚ\\Y[[ÝÜÈ\™Ù]YÙXÝ\š]HX[˜YÙ[Y[YY][™ÈHÜXÚYšXÈ™YYÈÙˆXXÚ\\Y[Ú[HXZ[Z[š[™ÈÙ[˜[ÛÛ›Ûˆ]\ÈH[ÜÝ›^X›H[™ÙXÝ\™H\›ØXÚ›ÜˆÜ™Ø[š^˜][ÛœÈÚ]Y™™\™[™\]Z\™[Y[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[Z][™È[Ûš]Üš[™ÈÜ›Ý\ÈÈH\Ù\œÈ\È›Ý[ˆY™™XÝ]™H\ÙHÙˆÜ›Ý\ÛXÚY\È[™Ù\È›ÝY™\ÜÈHY™™\™[ÙXÝ\š]H™\]Z\™[Y[Ë—ˆ
ˆ
ŠÊJŠˆÜ›Ý\ÛXÞH™Y™\™[˜Ù\ÈÙ™™\ˆ›^Xš[]K]Ø[ˆ[›ÙXÙHÙXÝ\š]Hš\ÚÜÈÚ[˜ÙHH\œÜÙHÙˆÜ›Ý\ÛXÚY\È\ÈÈ\HÛÛœÚ\Ý[ÙXÝ\š]HÙ][™ÜË—ˆ
ˆ
Š‘
JŠˆ\Ú[™ÈHÚ[™ÛHÛÛ\™Z[œÚ]™HÔÈZYÚÙY[HÚ[\\‹]ÛÝ[Ü™X]HÛÛ™›XÝÈÚ[˜ÙH\\Y[È]™H[š\]YH™\]Z\™[Y[È]H[šY›Ü›HÛXÞHØ[››ÝYY]ˆ‹ˆKˆŽLÎˆÂˆÜXÎˆ”ÙXÝ\š]H[Ûš]Üš[™È	ˆ[\[™È‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý]\Ý[™\œÝ[™HXÝ[ÛœÈZÙ[ˆ\š[™ÈH]X\˜[[™HÙˆHš[H[ˆ™\ÜÛœÙHÈ[ˆ[\ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È‘TÕ\ØÜšX™\ÈHXÝ[ÛˆZÙ[ˆÚ[ˆHš[H\È]X\˜[[™Y\š[™ÈH™\ÜÛœÙHÈ[ˆ[\È‹ˆÜ[ÛœÎˆÂˆJHXØÙ\ÜÈÈHÜšYÚ[˜[š[H\È[šYYÈH\Ù\ˆ‹ˆŠHXØÙ\ÜÈÈ[š[\È[ˆH\™XÝÜžH\È™\ÝšXÝY‹ˆÊHHš[H\È[[YYX][H›ÜØ\™YÈH™X]Z[[YÙ[˜ÙH]›Ü›H‹ˆ‘
HHš[H\È\›X[™[H[]Y‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHXØÙ\ÜÈÈHÜšYÚ[˜[š[H\È[šYYÈH\Ù\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÚ[ˆHš[H\È
Šœ]X\˜[[™Y
Š‹]\È\ÛÛ]Y[œÝ\š[™È]H\Ù\ˆ
ÜˆÜÜÚX›H[žH\Ù\ŠHØ[››ÝXØÙ\ÜÈ]ˆ\ÈØ[ˆ™HXÚY]™YžH[˜Üž\[™ÈHš[HÜˆ[Ýš[™È]ÈH\ÚYÛ˜]Y]X\˜[[™H›Û™H[ˆHš[HÞ\Ý[K™]™[[™È]È^XÝ][ÛˆÜˆÜ[š[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ]X\˜[[™HÜXÚYšXØ[H™Y™\œÈÈHÝ\ÜXÚ[Ý\ÈÜˆX[XÚ[Ý\Èš[K›ÝÈ[š[\È[ˆH\™XÝÜžK—ˆ
ˆ
ŠÊJŠˆÛÛYH]X\˜[[™Yš[\ÈZYÚ™H\\ˆ[˜[^™Y]]X\˜[[™H]Ù[ˆÙ\È›Ý[\H[[YYX]H›ÜØ\™[™ÈÈ[›Ý\ˆ]›Ü›K—ˆ
ˆ
Š‘
JŠˆ]X\˜[[™H[›Û™\È\ÛÛ][™ÈHš[HÚ]Ý]ÛÛ\][H™[[Ýš[™È]È[][Ûˆ\ÈHÙ\\˜]HXÝ[Ûˆ]Ø[ˆ›ÛÝÈY\ˆ[˜[\Ú\Ëˆ‹ˆKˆŽMˆÂˆÜXÎˆ’[˜ÚY[™\ÜÛœÙH‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[H]\ÝÛ›ÝÈHÛÜœ™XÝÜ™\ˆÙˆH\Ù\È[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È™\™\Ù[ÈHÛÜœ™XÝÜ™\ˆÙˆH\Ù\È[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜÏÈ‹ˆÜ[ÛœÎˆÂˆJH]XÝ[Û‹\˜YXØ][Û‹ÛÛZ[›Y[™\\˜][Û‹™XÛÝ™\žH‹ˆŠH™\\˜][Û‹]XÝ[Û‹ÛÛZ[›Y[\˜YXØ][Û‹™XÛÝ™\žH‹ˆÊHÛÛZ[›Y[™\\˜][Û‹]XÝ[Û‹\˜YXØ][Û‹™XÛÝ™\žH‹ˆ‘
H™\\˜][Û‹]XÝ[Û‹\˜YXØ][Û‹ÛÛZ[›Y[™XÛÝ™\žH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™\\˜][Û‹]XÝ[Û‹ÛÛZ[›Y[\˜YXØ][Û‹™XÛÝ™\žJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÛÜœ™XÝÜ™\ˆÙˆH\Ù\È[ˆ[˜ÚY[™\ÜÛœÙH\Î—ˆKˆ
Š”™\\˜][ÛŽŠŠˆÜ™X]H[ˆY™šXÚY[[˜ÚY[[X[˜YÙ[Y[[—ˆ‹ˆ
Š‘]XÝ[ÛŽŠŠˆY[YžHÝ[X[ÙXÝ\š]H[˜ÚY[×ˆËˆ
ŠÛÛZ[›Y[ŠŠˆ™]™[HÜ™XYÙˆH[˜ÚY[ˆˆ
Š‘\˜YXØ][ÛŽŠŠˆ[[Z[˜]HHØ]\ÙHÙˆH[˜ÚY[ˆKˆ
Š”™XÛÝ™\žNŠŠˆ™\ÝÜ™HHÞ\Ý[\ÈÈZ\ˆ›Ü›X[Ý]WŠˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[˜ÛÜœ™XÝˆ™\\˜][Ûˆ]\ÝÛÛYH™Y›Ü™H]XÝ[Û‹›ÝY\‹—ˆ
ˆ
ŠÊJŠˆ[˜ÛÜœ™XÝˆÛÛZ[›Y[Ø[››Ý™XÙYH™\\˜][Ûˆ[™]XÝ[Û‹—ˆ
ˆ
Š‘
JŠˆ[˜ÛÜœ™XÝˆ\˜YXØ][ÛˆÛÛY\ÈY\ˆÛÛZ[›Y[›Ý™Y›Ü™Kˆ‹ˆKˆŽMNˆÂˆÜXÎˆ•ÙXˆÛÛ[š[\š[™È‹ˆØÙ[˜\š[Îˆ”™YYÕÈ][Ûˆ˜Z[š[™ÈÛÛ][ÛœË\ÈÛÜœšYYX›Ý]Ý[X[™X]ÈÝXÚ\ÈÛÛ[X[™X[™XÛÛ›ÛX[Ø\™H[™]H^š[˜][Ûˆœ›ÛH\Ù\ˆ˜Y™šXËˆHØ[ÈHÛÛ][Ûˆ]š[\œÈHT“È™\Ù[[ˆH[žH\ÝÈ[™\Y\È[YKX˜\ÙY™\ÝšXÝ[ÛœË[ÛÈ\™›Ü›Z[™È™X][˜[\Ú\ÈÛˆ\Ù\ˆ˜Y™šXËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÛÛ][ÛˆÛÝ[™HSÔÕY™™XÝ]™HÈYY]\ÙH™\]Z\™[Y[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[\[Y[HÝ[™[Û™HÞ\Ý[H‹ˆŠH\ÙHHÛÛ[š[\ˆ‹ˆÊH[\[Y[[ˆÕÑÈ
ÙXÝ\™HÙXˆØ]]Ø^JH‹ˆ‘
H\ÙHÛ›H[ˆ‘Ñ•È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[\[Y[[ˆÕÑÈ
ÙXÝ\™HÙXˆØ]]Ø^JJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”ÙXÝ\™HÙXˆØ]]Ø^\È
ÕÑÜÊJŠˆ\™H\ÚYÛ™YÈX[˜YÙH\Ù\ˆ˜Y™šXÈ[™Ø[ˆš[\ˆT“È˜\ÙYÛˆÛÛ[›XÚÛ\ÝËˆ^H[ÛÈ›ÝšYH™X][˜[\Ú\È[™[YÜ˜]H™X]\™\ÈÝXÚ\È[™ÐTÐˆÈ›ÝXÝYØZ[œÝ˜\š[Ý\È[˜]]Üš^™Y^š[˜][Ûˆ™X]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÞ\Ý[\È›ØÝ\ÈÛˆ™]™[[™È]Hœ™XXÚ\Ë]È›ÝÙ™™\ˆHÛÛ\]H˜[™ÙHÙˆš[\š[™È[™™X]X[˜[\Ú\È™X]\™\Ë—ˆ
ˆ
ŠŠJŠˆÛÛ[š[\œÈØ[ˆ›ØÚÈÜXÚYšXÈT“Ë]ZYÚ›Ý]™HÛÛ\]H™X][˜[\Ú\È[™Ý\ˆ[YÜ˜]Y™X]\™\Ë—ˆ
ˆ
Š‘
JŠˆ‘Ñ•ÜÈÙ™™\ˆY˜[˜ÙY™X]\™\È]ZYÚ›Ý™HÜ[Z^™Y›ÜˆHYÚ›ÝYÚ]ÙˆX[˜YÚ[™È\Ù\ˆÙXˆ˜Y™šXÈÝXÚ\Èœ›ÝÜÚ[™È[™[XZ[ˆ‹ˆKˆŽMŽˆÂˆÜXÎˆ\ÜÙ]X[˜YÙ[Y[‹ˆØÙ[˜\š[Îˆ‘[œš\]YH\È™\\š[™ÈH]Z[Y\ÝÙˆ]™\žH\XØ][Ûˆ[œÝ[YÛˆH[Ûˆ˜Z[š[™ÈÙ\™\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\ÚÜÈ‘TÕ\ØÜšX™\È[œš\]YIÜÈXÝ]š]OÈ‹ˆÜ[ÛœÎˆÂˆJHÛÙØ\™H[[Y\˜][Ûˆ
[™[ÜžHÙˆ[œÝ[YÛÙØ\™JH‹ˆŠH™]ÛÜšÈX\[™È
\ØÛÝ™\žHÙˆ™]ÛÜšÈÜÝÈ[™Ù\šXÙ\ÊH‹ˆÊH]ÚX[˜YÙ[Y[
[™[™ÈÙˆÛÙØ\™H\]\ÊH‹ˆ‘
Hš\ÚÈ\ÜÙ\ÜÛY[
]˜[X][ÛˆÙˆ\Ú[™\ÜÈš\ÚÊH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÛÙØ\™H[[Y\˜][ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”ÛÙØ\™H[[Y\˜][ÛŠŠˆ›ØÝ\Ù\ÈÛˆY[YžZ[™È[™Ø][ÙÚ[™È]™\žHÛÙØ\™HÛÛ\Û™[™\Ù[ÛˆHÜXÚYšXÈÞ\Ý[Kˆ][È[™\œÝ[™HÛÙØ\™H[™ØØ\H[™XZÙH[™›Ü›YYXÚ\Ú[ÛœÈ™[]YÈÛÙØ\™H\ÜÙ]X[˜YÙ[Y[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ™]ÛÜšÈX\[™È\ÈH›ØÙ\ÜÈÙˆÜ™X][™ÈHš\ÝX[™\™\Ù[][ÛˆÙˆH™]ÛÜšÈ[™œ˜\ÝXÝ\™NÈ]Ù\È›ÝÛÛ˜Ù\›ˆØ][ÙÚ[™ÈH[œÝ[YÛÙØ\™K—ˆ
ˆ
ŠÊJŠˆ]ÚX[˜YÙ[Y[›ØÝ\Ù\ÈÛˆ\][™ÈÛÙØ\™HÛÛ\Û™[ÈÚ]]Ú\ÈÈš^[™\˜Xš[]Y\ÈÜˆYÜÎÈ]Ù\È›Ý[›Û™HÜ™X][™ÈH\ÝÙˆH[œÝ[][ÛœË—ˆ
ˆ
Š‘
JŠˆš\ÚÈ\ÜÙ\ÜÛY[\ÈHÛÛ\]H]˜[X][ÛˆÙˆÝ[X[™X]È[™[™\˜Xš[]Y\ÎÈ[ÝYÚ]X^HÛÛœÚY\ˆHÛÙØ\™H™\Ù[]Èš[X\žHÛØ[\È›ÝÈ\Ý[Kˆ‹ˆKˆŽMÎˆÂˆÜXÎˆ•[™\˜Xš[]HØØ[›š[™È‹ˆØÙ[˜\š[Îˆ•ÛÛšØH[™\ÝšY\ËH][[˜][Û˜[\È[›š[™ÈÈÜ[ˆH™]ÈÙ™šXÙH[ˆHY™™\™[Ú]KˆHUX[HØ[ÈÈ]\›Z[™HÚ]\ˆ™]ÈÙXÝ\š]H™\]Z\™[Y[È\™H™YYYÈY\]X][H›ÝXÝHU™\ÛÝ\˜Ù\Èœ›ÛHÝ[X[™X]Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]ÚÝ[ÛÛšØH[™\ÝšY\ÈÈÈ]\›Z[™HÚ]\ˆ™]È™\]Z\™[Y[È\™H™YYYÈ‹ˆÜ[ÛœÎˆÂˆJH[\[Y[š[ÛY]šXÈ]][XØ][Ûˆ›Üˆ[[\ÞYY\È‹ˆŠH[œÝ[ÐÕˆØ[Y\˜\È[ˆ[Ù™šXÙH\™X\È‹ˆÊHÛÛ™XÝHÜ›ÝYÚÚ]HÝ\™^H‹ˆ‘
HÛÛ™XÝH[™\˜Xš[]H\ÜÙ\ÜÛY[[™[™]˜][Ûˆ\Ý[™È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÛÛ™XÝH[™\˜Xš[]H\ÜÙ\ÜÛY[[™[™]˜][Ûˆ\Ý[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š•[™\˜Xš[]H\ÜÙ\ÜÛY[[™[™]˜][Ûˆ\Ý[™ÊŠˆ\ÈH[™[Y[[ÙXÝ\š]HXÚš\]YKˆ\È›ØÙ\ÜÈ[ÈY[YžHÝ[X[ÙXZÛ™\ÜÙ\È[™ÙXÝ\š]H›]ÜÈ[ˆH™]ÈÙ™šXÙIÜÈU™\ÛÝ\˜Ù\È[™™]ÛÜšÈ[™œ˜\ÝXÝ\™KˆH™\Ý[ÈÚ[[]™[ÜH›Ø\ÝÙXÝ\š]H[‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆš[ÛY]šXÈ]][XØ][Ûˆ\È[ˆXØÙ\ÜËXÛÛ›ÛYX\Ý\™H[™Ù\È›ÝY™\ÜÈÜXÚYšXÈ[™\˜Xš[]Y\ÈÜˆš\ÚÜÈÙˆH™]ÈÙ™šXÙIÜÈU[™œ˜\ÝXÝ\™K—ˆ
ˆ
ŠŠJŠˆÐÕˆØ[Y\˜\È\™HH\ÚXØ[ÙXÝ\š]HYX\Ý\™K]È›ÝY™\ÜÈÞX™\œÙXÝ\š]H\š[™ÈHÛÛ™šYÝ\˜][Û‹—ˆ
ˆ
ŠÊJŠˆÚ]HÝ\™^\È\™H\ÙYÈ[œÝ[ÚKQšHÞ\Ý[\ÈžH]\›Z[š[™ÈÚ\™HÈXÙHHXØÙ\ÜÈÚ[ÎÈ^HÈ›Ý]˜[X]HHÝ™\˜[ÙXÝ\š]HÙˆHU[™œ˜\ÝXÝ\™Kˆ‹ˆKˆŽNˆÂˆÜXÎˆ\ÜÙ]X[˜YÙ[Y[‹ˆØÙ[˜\š[Îˆ[ˆUX[˜YÙ\ˆØ[ÈÈ[™\œÝ[™HÚYÛšYšXØ[˜ÙHÙˆ[™[ÜžH[ˆHY™™XÝ]™HX[˜YÙ[Y[Ùˆ\™Ø\™KÛÙØ\™H[™]H\ÜÙ]Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È‘TÕYÚYÚÈHÚYÛšYšXØ[˜ÙHÙˆ[™[ÜžH[ˆHY™™XÝ]™HX[˜YÙ[Y[Ùˆ\™Ø\™KÛÙØ\™H[™]H\ÜÙ]ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[™[ÜžH[ÝÜÈÜ™Ø[š^˜][ÛœÈÈXZ[Z[ˆ\]ËY]H™XÛÜ™È‹ˆŠH[™[ÜžH˜XÚ[]]\ÈH\ÚXØ[Ü™Ø[š^˜][ÛˆÙˆ\ÜÙ]È‹ˆÊH[™[ÜžHØÝ[Y[][Ûˆ[È[ˆ˜XÚÚ[™ÈHš[˜[˜ÚX[˜[YHÙˆ\ÜÙ]È‹ˆ‘
H[™[ÜžHY[YšY\ÈH[ÜH™\ÜÛœÚX›H›ÜˆX[˜YÚ[™ÈH\ÜÙ]È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH[™[ÜžH[ÝÜÈÜ™Ø[š^˜][ÛœÈÈXZ[Z[ˆ\]ËY]H™XÛÜ™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š’[™[ÜžJŠˆ[ÝÜÈÜ™Ø[š^˜][ÛœÈÈXZ[Z[ˆXØÝ\˜]H™XÛÜ™ÈÙˆ\™Ø\™KÛÙØ\™H[™]H\ÜÙ]Ë˜XÚ[]][™È[Y[H]ÚX[˜YÙ[Y[žH[[™ÈYZ[š\Ý˜]ÜœÈY[YžHH\ÜÙ]È]™YY\]\Ëˆ[Y[H]Ú[™È\È[™[Y[[ÈZ]YØ][™ÈHÙXÝ\š]Hš\ÚÜÈ\š\Ú[™Èœ›ÛH[˜ÛÜœ™XÝY[™\˜Xš[]Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ[™[ÜžHÙ\È›Ý[\\Ú^™HH\ÚXØ[Ü™Ø[š^˜][ÛˆÙˆ\ÜÙ]È›Üˆ]Y]ÎÈ]È\œÜÙH\ÈÈXZ[Z[ˆÝ\œ™[™XÛÜ™È›ÜˆY™™XÝ]™HÙXÝ\š]H[Ûš]Üš[™Ë—ˆ
ˆ
ŠÊJŠˆ[ÝYÚ[™[ÜžHØÝ[Y[][ÛˆØ[ˆÝ\Üš[˜[˜ÚX[˜XÚÚ[™È[™YÙ][›š[™Ë]Èš[X\žH›ÛH[ˆÙXÝ\š]H\È\ÜÙ][Ûš]Üš[™È[™X[˜YÙ[Y[—ˆ
ˆ
Š‘
JŠˆ[™[ÜžHØ[ˆ[Y[YžHÜÙH™\ÜÛœÚX›K]XØÛÝ[Xš[]H\È›ÝHXZ[ˆ›ØÝ\ÈÙˆ[™[ÜžH[ˆHÙXÝ\š]HÛÛ^ˆ‹ˆKˆŽNNˆÂˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈX[˜YÙ[Y[‹ˆØÙ[˜\š[Îˆ–[ÝH\™HHÙXÝ\š]HYZ[š\Ý˜]Üˆ›ÜˆHš[˜[˜ÚX[[œÝ]][Ûˆ]X[˜YÙ\ÈYÚHÙ[œÚ]]™HÝ\ÝÛY\ˆ]Kˆ\È\Ùˆ[Ý\ˆPSHÝ˜]YÞK[ÝH\™H[\[Y[[™È[ˆ]\Ý][Ûˆ›ØÙ\ÜÈÈ[œÝ\™HHXØÝ\˜XÞH[™˜[Y]HÙˆ\Ù\œÉÈXØÙ\ÜÈšYÚËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ\ØÜšX™\ÈH\œÜÙHÙˆ]\Ý][Ûˆ[ˆ\ÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH]\Ý][Ûˆ\È[ˆ]Y]\™›Ü›YYžH^\›˜[™YÝ[]ÜžHYÙ[˜ÚY\ÈÈ]˜[X]HHš[˜[˜ÚX[[œÝ]][Û‰ÜÈÝ™\˜[ÙXÝ\š]HÜÝ\™H‹ˆŠH]\Ý][Ûˆ\ÈH›ØÙ\ÜÈ[ˆÚXÚ\Ù\œÈ\™H™\]Z\™YÈ›ÝšYHš[ÛY]šXÈ]][XØ][Û‹ÝXÚ\Èš[™Ù\œš[ÈÜˆ™][˜HØØ[œËÈXØÙ\ÜÈÙ[œÚ]]™H]H‹ˆÊH]\Ý][Ûˆ\ÈH›ØÙY\™H[ˆÚXÚ[\ÞYY\È]\ÝÚYÛˆHØÝ[Y[ÈXÚÛ›ÝÛYÙHZ\ˆXØÙ\[˜ÙHÙˆHÛÜœÜ˜]HÙXÝ\š]HÛXÚY\È‹ˆ‘
H]\Ý][Ûˆ\ÈH›ØÙ\ÜÈ[ˆÚXÚ]HÝÛ™\œÈ\š[ÙXØ[H™]šY]Ë˜[Y]H[™ÛÛ™š\›HHXØÙ\ÜÈšYÚÈÙˆ[\Ù\œÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H]\Ý][Ûˆ\ÈH›ØÙ\ÜÈ[ˆÚXÚ]HÝÛ™\œÈ\š[ÙXØ[H™]šY]Ë˜[Y]H[™ÛÛ™š\›HHXØÙ\ÜÈšYÚÈÙˆ[\Ù\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆHÛÛ^ÙˆPSK
Š˜]\Ý][ÛŠŠˆ™Y™\œÈÈH\š[ÙXÈ™]šY]È›ØÙ\ÜÈ[ˆÚXÚ]HÝÛ™\œÈÜˆX[˜YÙ\œÈ˜[Y]H[™ÛÛ™š\›HHXØÙ\ÜÈšYÚÈÙˆ[\Ù\œËˆ][È[œÝ\™H]\Ù\œÈ]™HH\›ÜšX]H\›Z\ÜÚ[ÛœÈ™YYY›ÜˆZ\ˆ›Û\È[™][žH[›™XÙ\ÜØ\žHÜˆ[˜\›ÜšX]HXØÙ\ÜÈ\È›Û\H™]›ÚÙY—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ^\›˜[]Y]ÈžH™YÝ[]ÜžHYÙ[˜ÚY\È\™HÙ\\˜]Hœ›ÛHH[\›˜[]\Ý][Ûˆ›ØÙ\ÜÈ[™]˜[X]H™YÝ[]ÜžHÛÛ\X[˜ÙK›ÝÜXÚYšXØ[HHXØÝ\˜XÞHÙˆ\Ù\œÉÈXØÙ\ÜÈšYÚË—ˆ
ˆ
ŠŠJŠˆš[ÛY]šXÈ]][XØ][Ûˆ\È[ˆY[]K]™\šYšXØ][ÛˆY]Ù›ÝH\œÜÙHÙˆ]\Ý][Û‹—ˆ
ˆ
ŠÊJŠˆXÚÛ›ÝÛYÚ[™ÈXØÙ\[˜ÙHÙˆHÙXÝ\š]HÛXÚY\È\ÈHÙXÝ\š]KX]Ø\™[™\ÜÈ›ØÙ\ÜË›ÝHÜXÚYšXÈ]\Ý][ÛˆÙˆXØÙ\ÜÈšYÚËˆ‹ˆKˆÌˆÂˆÜXÎˆ”ÙXÝ\™H™]ÛÜšÈ›ÝØÛÛÈ‹ˆØÙ[˜\š[Îˆ’˜[X\š[ËH™]ÛÜšÈXÚšXÚX[ˆ]Ù[H[››Ý˜][ÛœÈË\ÈÛÛ™šYÝ\š[™ÈH™]ÈÙ\™\‹ˆHØ[È\Ù\œÈÈ™HX›HÈ™XXÚS‘SÔ–TQÙXˆYÙ\ÈÜÝYÛˆHÙ\™\ˆ[™ÛˆHØ[YHXXÚ[™K˜[œÙ™\ˆš[\È\Ú[™ÈÛX\^•ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈZ\œÈÙˆÜÈ]\ÝHÜ[ˆÛˆH\š[Y]\ˆš\™]Ø[ÈYY]“Õ™\]Z\™[Y[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÜ

H[™ÜŒH
•
H‹ˆŠHÜÈ
ÊH[™ÜŒˆ
Ñ•ÔÔÒ
H‹ˆÊHÜ

H[™ÜH
ÓPŠH‹ˆ‘
HÜH
ÓU
H[™ÜLNH
“•
H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÜ

H[™ÜŒH
•
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š•ÔÜ
Šˆ\ÈHÝ[™\™ÜH›ÝØÛÛ]Ù\™\È
Š[™[˜Üž\Y
ŠˆÙXˆYÙ\ÎˆÜ[š[™È]YY]ÈHš\œÝ™\]Z\™[Y[ˆ
Š•ÔÜŒJŠˆ\ÈHÛÛ›ÛÜÙˆ
Š‘•
Šˆ
š[H˜[œÙ™\ˆ›ÝØÛÛ
KHÛX\^š[K]˜[œÙ™\ˆ›ÝØÛÛ˜[YY[ˆHØÙ[˜\š[ÎˆÜ[š[™È]YY]ÈHÙXÛÛ™™\]Z\™[Y[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆÜÈÙ\™\ÈË]\ÈËJŠ™[˜Üž\Y
Šˆ˜Y™šXË[™ÜŒˆ\ÈÔÒÔÑ•[ÛÈ[˜Üž\Yˆ›ÝÛÛ˜YXÝHØÙ[˜\š[ÉÜÈ^XÚ]™\]Z\™[Y[›ÜˆÛX\^˜Y™šXË—ˆ
ˆ
ŠÊJŠˆÜH\È\ÜÛØÚX]YÚ]
Š”ÓPŠŠˆ
Ù\™\ˆY\ÜØYÙH›ØÚÊK\ÙY›ÜˆÚ[™ÝÜÈš[H[™š[\ˆÚ\š[™Ë›Ý›ÜˆH•˜[œÙ™\ˆ]Ø\È™\]Y\ÝYÈ^ÜÚ[™È]ÈH[\›™]\È[ÛÈHÙ]™\™[H[œÙXÝ\™H˜XÝXÙH
]\ÈH™XÝÜˆ^Ú]YžHÛÜ›\ÈÝXÚ\ÈØ[›˜PÜžJK—ˆ
ˆ
Š‘
JŠˆÜH\È
Š”ÓU
Šˆ
Ù\™\‹]Ë\Ù\™\ˆ[XZ[˜[œÛZ\ÜÚ[ÛŠH[™ÜLNH\È
Š““•
Šˆ
\Ù[™]™]ÜÙÜ›Ý\ÊNˆ™Z]\ˆ\È[ž][™ÈÈÈÚ]HÙXˆœ›ÝÜÚ[™ÈÜˆš[H˜[œÙ™\ˆ]Ù\™H™\]Y\ÝY——Šˆ
Š‘^[H›ÝH
ÛÛ[[Ûˆ˜\
NŠŠˆÈ\ÈÜ
ŠÊŠŽÈÜš][™È	ÍÌÉÈ\ÈH™\žHÛÛ[[Ûˆ\È[™X\ÈÈ›ÈÝ[™\™^[HÙ\šXÙKˆY[[Üš^™HHÛX\^8¡¤ˆÙXÝ\™HZ\œÎˆŒH•8¡¤ˆŒˆÑ•8¡¤ˆÈËÎHT8¡¤ˆŒÍˆTËˆ‹ˆKˆÌNˆÂˆÜXÎˆ˜\Ù[[™\È	ˆÛÛ™šYÝ\˜][Ûˆ‹ˆØÙ[˜\š[Îˆ–[Ý\ˆÛÛ\[žH\È™XÙ[HXÜ]Z\™YH˜]ÚÙˆ™]ÈÙ\™\œÈ›ÜˆHÛÙØ\™H]™[ÜY[\\Y[ˆ\ÈHÙXÝ\š]HÜXÚX[\Ý[ÝH\™H\ÚÙYÚ]ÛÛ™šYÝ\š[™ÈH[š]X[[š\›Û›Y[™Y›Ü™H[™[™È]Ý™\ˆÈH]™[Ü\œËˆ[ÝH]™H\Ý[œÝ[YHÜ\˜][™ÈÞ\Ý[H[™H™^Ý\[›Û™\ÈH˜\Ù[[™H\Þ[Y[›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÛÝ[™HH‘TÕ™^XÝ[ÛˆÈZÙOÈ‹ˆÜ[ÛœÎˆÂˆJHÝ\™]ÛÜšÚ[™ÈÚ]Ý\ˆÙ\™\œÈÚ]Ý]\Z[™È[žHÛÛ™šYÝ\˜][Ûˆ‹ˆŠH\HH™\Ù]ÛÛ™šYÝ\˜][Ûˆ[\]H][˜ÛY\ÈÙXÝ\š]H\]\È[™Ý[™\™ÛÛ™šYÝ\˜][ÛœÈ‹ˆÊH[œÝ[H]™[ÜY[ÛÙØ\™HÚ]Ý]\\ˆÞ\Ý[K[]™[Ú[™Ù\È‹ˆ‘
H[[YYX][H[™Ý™\ˆHÙ\™\œÈÈH]™[ÜY[X[H›ÜˆÛÙØ\™H[œÝ[][Ûˆ[™ÛÛ™šYÝ\˜][Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\HH™\Ù]ÛÛ™šYÝ\˜][Ûˆ[\]H][˜ÛY\ÈÙXÝ\š]H\]\È[™Ý[™\™ÛÛ™šYÝ\˜][ÛœÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\Z[™ÈH
Šœ™\Ù]ÛÛ™šYÝ\˜][Ûˆ[\]JŠˆ][˜ÛY\ÈÙXÝ\š]H\]\È[™Ý[™\™ÛÛ™šYÝ\˜][ÛœÈ\ÈH™\Ý˜XÝXÙH›Üˆ\Z[™ÈÙXÝ\™H˜\Ù[[™\ËˆH™\Ù]ÛÛ™šYÝ\˜][Ûˆ[\]HÛÛœÚ\ÝÈÙˆÝ[™\™ÛÛ™šYÝ\˜][ÛœË]Ú\È[™ÙXÝ\š]H\]\ÈÛÛ\X[Ú]HÜ™Ø[š^˜][Û‰ÜÈÙXÝ\š]HÛXÞK\ÝX›\Ú[™ÈHÛÛYÙXÝ\š]H›Ý[™][Ûˆ›ÜˆXXÚÙ\™\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÝ\[™È™]ÛÜšÚ[™ÈÚ]Ý\ˆÙ\™\œÈÚ]Ý]\Z[™È[žHÛÛ™šYÝ\˜][ÛˆØ[ˆÜ™X]HÙXÝ\š]HØ\ÎÈH™]ÈÙ\™\ˆÚÝ[š\œÝ]™HHÙXÝ\™H˜\Ù[[™H\YY—ˆ
ˆ
ŠÊJŠˆ[œÝ[[™È[žHÛÙØ\™H™Y›Ü™H\Z[™ÈÙXÝ\š]H\]\Ë]Ú\È[™ÛÛ™šYÝ\˜][ÛœÈØ[ˆ^ÜÙHHÙ\™\œÈÈš\ÚÜË—ˆ
ˆ
Š‘
JŠˆ[™[™ÈHÙ\™\œÈÈH]™[Ü\œÈ™Y›Ü™H\Z[™ÈÛÛ™šYÝ\˜][ÛœÈÜˆÙXÝ\š]H]Ú\ÈX]™\È[H[™\˜X›HÈÙXÝ\š]H™X]Ëˆ‹ˆKˆÌŽˆÂˆÜXÎˆ]]ÛX][Ûˆ	ˆÜ˜Ú\Ý˜][Ûˆ‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ\È]˜[X][™ÈH[›ÙXÝ[ÛˆÙˆH™]ÈÙXÝ\š]KX]]ÛX][ÛˆÛÛ[™Ø[ÈÈ[™\œÝ[™Ú]\È[ÜÝÜXÚX[›Üˆ]ÈÛ™ÛÚ[™ÈÝ\ÜXš[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\ÈHSÔÕÜXÚX[˜XÝÜˆ[ˆ]\›Z[š[™ÈHÛ™ÛÚ[™ÈÝ\ÜXš[]HÙˆH™]ÈÙXÝ\š]KX]]ÛX][ÛˆÛÛ[›ÙXÙY[ÈHÜ™Ø[š^˜][Û˜[[š\›Û›Y[È‹ˆÜ[ÛœÎˆÂˆJHÜ[\š]HÙˆHÛÛÛˆHX\šÙ]‹ˆŠH™[™Ü‰ÜÈX\šÙ]™\Ù[˜ÙH‹ˆÊH]˜Z[Xš[]HÙˆ]X[YšYY\œÛÛ›™[‹ˆ‘
H[YÜ˜][ÛˆØ\Xš[]Y\È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH]˜Z[Xš[]HÙˆ]X[YšYY\œÛÛ›™[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]š[™ÈX[HY[X™\œÈÚ]HÚÚ[È™YYYÈX[˜YÙK›ÝX›\ÚÛÝ[™\]HHÛÛ\È[™[Y[[È[œÝ\š[™È]ÈÛ™ÛÚ[™ÈÝ\ÜXš[]H[™ÙXÝ\™HÜ\˜][ÛœËˆÚ]Ý]]X[YšYY\œÛÛ›™[]™[ˆH™\ÝÛÛ™XÛÛY\È[\ØX›HÜˆ[™\˜X›K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆX\šÙ]Ü[\š]HØ[ˆÝYÙÙ\ÝHÛÛ	ÜÈY™™XÝ]™[™\ÜË]Ù\È›Ý\™XÝHÝX\˜[YHÝ\ÜXš[]H[ˆHÜXÚYšXÈÜ™Ø[š^˜][Û˜[[š\›Û›Y[—ˆ
ˆ
ŠŠJŠˆH™[™Ü‰ÜÈX\šÙ]™\Ù[˜ÙHØ[ˆ›ÝšYH[™›Ü›X][ÛˆX›Ý]HÛÛ	ÜÈ™[XXš[]K]Ù\È›Ý\™XÝHY™\ÜÈ[\›˜[Ý\ÜXš[]K—ˆ
ˆ
Š‘
JŠˆ[YÜ˜][ÛˆØ\Xš[]Y\ÈØ[ˆ[\›Ý™HHÛÛ	ÜÈ[˜Ý[Û˜[]K]È›ÝXZ[›HY™\ÜÈÛ™ÛÚ[™Ë\Ý\ÜÛÛœÚY\˜][ÛœËˆ‹ˆKˆÌÎˆÂˆÜXÎˆ”Þ\Ý[H	ˆ]šXÙH\™[š[™È‹ˆØÙ[˜\š[Îˆ‘[œš\]YKH™]ÛÜšÈYZ[š\Ý˜]Üˆ]Ù[H[››Ý˜][ÛœÈË\È\ØÝ\ÜÚ[™ÈÚ]™YYHÝ˜]YÚY\ÈÈ\\ˆ›ÝXÝHÜ™Ø[š^˜][Û‰ÜÈ›Ý]\œËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÛÝ[™HH‘TÕ\›ØXÚÈ[œÝ\™HHÙXÝ\š]HÙˆZ\ˆ›Ý]\œÏÈ‹ˆÜ[ÛœÎˆÂˆJH[˜X›HÓ“TŒH›Üˆ˜XÚÝØ\™ÛÛ\]Xš[]H‹ˆŠH[˜X›H[™]›Üˆ™[[ÝHX[˜YÙ[Y[‹ˆÊH[\[Y[PÓÈÈš[\ˆ˜Y™šXÈ‹ˆ‘
Hœ™\]Y[HÚ[™ÙHH›Ý]\œÉÈTY™\ÜÙ\ÈÈ]›ÚY]XÝ[Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[\[Y[PÓÈÈš[\ˆ˜Y™šXÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠXØÙ\ÜÈÛÛ›Û\ÝÈ
PÓÊJŠˆ\™H\ÙYÈYš[™H[™ÛÛ›ÛH˜Y™šXÈ[ÝÙY[ˆ[™Ý]ÙˆH™]ÛÜšË[\›Ýš[™ÈH›Ý]\‰ÜÈÙXÝ\š]HžHÜXÚYžZ[™ÈÚXÚ˜Y™šXÈÚÝ[™H[ÝÙYÜˆ[šYYˆ]\ÈÛ™HÙˆH[ÜÝY™™XÝ]™H\™[š[™ÈXÚš\]Y\È›Üˆ›Ý]\œË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÓ“TŒKÚ[H›ÝšY[™ÈÛÛ\]Xš[]KXÚÜÈ[˜Üž\[Ûˆ[™\Ù\ÈÛÛ[][š]HÝš[™ÜÈ]\™HX\Ú[HÛÛ\›ÛZ\ÙYÛÛ\\™YÈ]ÈÝXØÙ\ÜÛÜœÈ
Ó“TŒÊK—ˆ
ˆ
ŠŠJŠˆ[™]˜[œÛZ]È]K[˜ÛY[™ÈÜ™Y[X[Ë[ˆÛX\^XZÚ[™È][™\˜X›HÈ[\˜Ù\[ÛˆÛÛ\\™YÈ[Ü™HÙXÝ\™H[\›˜]]™\ÈÝXÚ\ÈÔÒ—ˆ
ˆ
Š‘
JŠˆœ™\]Y[HÚ[™Ú[™ÈHTY™\ÜÙ\ÈØ[ˆÛÛ\XØ]H˜XÚÚ[™È›Üˆ]XÚÙ\œË]YÈYZ[š\Ý˜]]™HÛÛ\^]H[™\È›Ý\ÈY™™XÝ]™H\ÈPÓÈ›Üˆ˜Y™šXÈX[˜YÙ[Y[ˆ‹ˆKˆÌˆÂˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈX[˜YÙ[Y[‹ˆØÙ[˜\š[Îˆ[ˆXØÙ\ÜÈ™]šY]È™]™X[È]ŒˆXØÛÝ[È™[Û™ÈÈ[ÜHÚÈ]™HYHÛÛ\[žKÛÛYH[Ü™H[ˆÛÈYX\œÈYÛËˆ™YHÙˆ[HÙ\™H\ÙY[ˆ™XÙ[[ÛÎˆÛ™HžHHÛÛœÝ[[Ý[ÛÜšÚ[™È›ÜˆHÝ\Y\‹ÛÈœ›ÛH›Ü™ZYÛˆY™\ÜÙ\ËˆHX]™\ˆ›ØÙ\ÜÈÛÝ™\œÈ™]\›š[™ÈH\Ü[™H˜YÙK]›Ø›ÙH\È™\ÜÛœÚX›H›Üˆ\ØX›[™ÈXØÛÝ[Ë[™ˆÙ\È›Ý›ÝYžHUÙˆ\›Z[˜][ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚY[]HX[˜YÙ[Y[›ØÙ\ÜÈØ\ÈZ\ÜÚ[™Ë[™ÝÈÚÝ[]™HXYH™[XX›OÈ‹ˆÜ[ÛœÎˆÂˆJH][KY˜XÝÜˆ]][XØ][Û‹È™H[™›Ü˜ÙYÛˆ]™\žHÛÜœÜ˜]HXØÛÝ[‹ˆŠH\š[ÙXÈš]š[YÙH™]šY]Ë\™›Ü›YY]X\\›HÛˆYZ[š\Ý˜]]™HXØÛÝ[ÈÛ›H‹ˆÊH\ÜÝÛÜ™›Ý][Û‹XYHX[™]ÜžH]™\žHÚ^H^\È›Üˆ]™\ž[Û™H‹ˆ‘
H\›Ýš\Ú[Ûš[™Ë]]ÛX]YžH[šÚ[™È]ÈHˆÞ\Ý[H\ÈH]]Üš]]]™HÛÝ\˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\›Ýš\Ú[Ûš[™Ë]]ÛX]Yœ›ÛHHˆÞ\Ý[JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š‘\›Ýš\Ú[Ûš[™ÊŠˆ\ÈH[Y[H™[[Ý˜[Ùˆ[XØÙ\ÜÈÚ[ˆH\œÛÛˆX]™\ÈHÜ™Ø[š^˜][ÛˆÜˆÚ[™Ù\È›ÛK[™]\ÈH›Ü™ÛÝ[ˆ[ˆÙˆHY[]HY™XÞXÛNˆ
œ›Ýš\Ú[Ûš[™Êˆ\ÈH[Ý]˜]Y™\]Y\Ý\ˆ™\ÜÚ[™È›Üˆ]Ú[HžHYš[š][Ûˆ›Ø›ÙH\È[\™\ÝY[ˆH™[[Ý˜[ˆHØÙ[˜\š[ÈÚÝÜÈHÛÛœÙ\]Y[˜ÙNˆŒˆ˜[YÜ™Y[X[È[ˆH[™ÈÙˆ[ÜHÚ]›È™[XZ[š[™È™[][ÛœÚ\ÈHÛÛ\[žK™YHÙˆ[HXÝX[H\ÙYˆH™[YYH\È›ÝÈ\ÚÈ[ÜH›Üˆ[Ü™H][[Û‹™XØ]\ÙHHX]™\ˆ›ØÙ\ÜÈ[™XYH^\ÝÈ[™ÛÝ™\œÈ\ÚXØ[Øš™XÝË]È
Š˜]]ÛX]JŠˆXXÝ]˜][ÛˆžHZ[™È]È[ˆ]™[ÛÛYX›ÙH\È[ˆ[\™\Ý[ˆ™XÛÜ™[™È[ž]Ø^NˆH\›Z[˜][Ûˆ[ˆHˆÞ\Ý[K\ÙY\ÈH
Š˜]]Üš]]]™HÛÝ\˜ÙHÙˆY[]JŠ‹ˆÚ][ˆ]]ÛX]Y[šËH\›Z[˜][Ûˆ›ÜYØ]\ÈÚ][ˆZ[]\È[È\ØX›[™ÈHÛXZ[ˆXØÛÝ[™]›ÚÚ[™ÈØXTÈ\XØ][ÛˆXØÙ\ÜË[˜[Y][™ÈXÝ]™HÙ\ÜÚ[ÛœÈ[™XXÝ]˜][™ÈH˜YÙKˆ]\È[ÛÈHÚ[˜ÙHÈ[™HHÛÈØ\Ù\ÈX[X[›ØÙY\™\È[ÜÝÙ[ˆÙ]Ü›Û™Îˆ
Šœ›ÛHÚ[™Ù\ÊŠ‹Ú\™HÛ\›Z\ÜÚ[ÛœÈ]\Ý™H™[[Ý™Y[™›ÝY\™[H™]ÈÛ™\ÈYY[™
Š˜ÛÛœÝ[[ÊŠ‹ÚÈÚÝ[™H™YÚ\Ý\™YÚ][ˆ^\žH]Hœ›ÛH^HÛ™K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH][KY˜XÝÜˆ]][XØ][ÛŽŠŠˆÝ™[™Ý[œÈ›ÛÙˆÙˆ
ŠÚÊŠˆ\ÈÚYÛš[™È[‹ˆ]XÚY]™\È›Ý[™ÈÚ[ˆH\œÛÛˆ™X[H\ÈHXØÛÝ[Û\ˆ[™[ÛÈÛÈHÙXÛÛ™˜XÝÜŽˆHXØÛÝ[ÚÝ[›Ý]™H^\ÝY[™QH›ÝXÝÈ]˜]\ˆ[ˆÛÜÚ[™È]—ˆ
ˆ
ŠŠH\š[ÙXÈš]š[YÙH™]šY]ÎŠŠˆ\ÈÛÛÙ˜XÝXÙH[™ÛÝ[]™H
Š™]XÝY
ŠˆH›Ø›[K][ÛÈ]\ˆ[™[Z]YÈYZ[š\Ý˜]]™HXØÛÝ[ËÚ[HHØÙ[˜\š[ÈÛÛ˜Ù\›œÈÜ™[˜\žHÛ™\Ëˆ]\ÈH]XÝ]™HÛÛ›Û]™\šYšY\È\›Ýš\Ú[Ûš[™Ë›ÝHÝXœÝ]]H›Üˆ]—ˆ
ˆ
ŠÊH\ÜÝÛÜ™›Ý][ÛŽŠŠˆ›Ü˜Ù\ÈH\ÜÝÛÜ™Ú[™ÙHÛˆÜÙHÚÈ
ŠœÚYÛˆ[ˆ™YÝ[\›JŠ‹ˆH›Ü›Y\ˆ[\ÞYYHÝ[\Ú[™ÈZ\ˆXØÛÝ[ÛÝ[Ú[™ÙH]Ú]Ý]Y™šXÝ[K[™›ÜˆÜ›X[XØÛÝ[È^\žH›ÙXÙ\È›ÈXXÝ]˜][Ûˆ][——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆHY[]HY™XÞXÛH[ˆ[™XØ]\ÙH]Y\Ý[ÛœÈ\ÛÛ]HHZ\ÜÚ[™È\ÙNˆ
Šœ›Ýš\Ú[Ûš[™ÊŠˆÛˆ›Ú[š[™ËÚ]X\Ýš]š[YÙH0­È
Š›[ÙYšXØ][ÛŠŠˆÛˆ›ÛHÚ[™ÙK™[[Ýš[™ÈÛ\›Z\ÜÚ[ÛœÈÈ]›ÚYHXØÝ[][][ÛˆÛ›ÝÛˆ\È
œš]š[YÙHÜ™Y\
ˆ0­È
Šœ\š[ÙXÈ™]šY]ÊŠˆ[™
Š˜]\Ý][ÛŠŠˆžHX[˜YÙ\œÈ0­È
Š™\›Ýš\Ú[Ûš[™ÊŠˆÛˆX]š[™Ëˆ[™ÙY\[ˆZ[™HÚYÛ˜[][Ø^\ÈÚ[ÈÈ\ÈØ\ˆ
Š˜XÝ]™HXØÛÝ[È™[Û™Ú[™ÈÈ[ÜHÚÈ›ÈÛ™Ù\ˆÛÜšÈ\™JŠ‹ˆ‹ˆKˆÌNˆÂˆÜXÎˆ”Þ\Ý[H	ˆ]šXÙH\™[š[™È‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™È\È™XÙ[HÛÛ™šYÝ\™YH™]ÈÙXˆÙ\™\ˆ›Üˆ]ÈK[X\›š[™È]›Ü›KˆHUX[H\È\ÚÙYÚ][\[Y[[™ÈÙXÝ\š]HYX\Ý\™\ÈÈZ]YØ]HÝ[X[]XÚÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È˜XÝXÙ\ÈÛÝ[™HSÔÕY™™XÝ]™H›Üˆ\™[š[™ÈHÙ\™\È‹ˆÜ[ÛœÎˆÂˆJHY[YžH[ÛÙØ\™H[™\™Ø\™H\›ØXÚ[™È[™ÙˆY™H‹ˆŠH[˜Ü™X\ÙHHÙ\™\‰ÜÈÝÜ˜YÙHØ\XÚ]H[™H[X™\ˆÙˆÙ\™\œÈ‹ˆÊH[\[Y[Hš[˜Ú\HÙˆX\Ýš]š[YÙH[™]ÚX[˜YÙ[Y[‹ˆ‘
HÛÛ™šYÝ\™HHÝY\ÝXØÛÝ[›Üˆ[\Ù\œÈ[™ÝY\ÝÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[\[Y[Hš[˜Ú\HÙˆX\Ýš]š[YÙH[™]ÚX[˜YÙ[Y[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[œÝ\š[™È]\Ù\œÈ]™HÛ›HH™XÙ\ÜØ\žHXØÙ\ÜÈ[Z]ÈÝ[X[™X]Ëˆ™YÝ[\›H\][™ÈHÙ\™\ˆÛÙØ\™H[ÛÈ^\ÈH[™[Y[[›ÛH[ˆZ]YØ][™È[™\˜Xš[]Y\ËˆÙÙ]\‹\ÙHÛÈÛÛ›ÛÈ›Ü›HH˜\Ú\ÈÙˆÙ\™\ˆ\™[š[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆY[YžZ[™ÈÛÙØ\™KÚ\™Ø\™H\›ØXÚ[™È[™ÙˆY™H\ÈHÛÛÙ™^Ý\]ÛÝ[›ÝÛÛYH™Y›Ü™HX[˜YÚ[™ÈÚ]\È[™XYH[™[Ù‹[Y™HÜˆ[\[Y[[™ÈX\Ýš]š[YÙH[™]ÚX[˜YÙ[Y[—ˆ
ˆ
ŠŠJŠˆ[˜Ü™X\Ú[™ÈÝÜ˜YÙH[\›Ý™\È\™›Ü›X[˜ÙH]Ù\È›Ý\™XÝH[\›Ý™HÙ\™\ˆÙXÝ\š]K—ˆ
ˆ
Š‘
JŠˆÝY\ÝXØÛÝ[ÈØ[ˆ[›ÙXÙHY][Û˜[[™\˜Xš[]Y\ÈžH›ÝšY[™È[›™XÙ\ÜØ\žHXØÙ\ÜÈÈ[˜]]Üš^™Y\Ù\œËˆ‹ˆKˆÌŽˆÂˆÜXÎˆ‘]HØ[š]^˜][Ûˆ	ˆ\ÝXÝ[Ûˆ‹ˆØÙ[˜\š[ÎˆY\ˆHÙXÝ\š]H]Y]Ù[H[››Ý˜][ÛœÈÈ\ÈÈXÛÛ[Z\ÜÚ[ÛˆH˜]ÚÙˆÛXYÛ™]XÈ\™\ÚÜÈÛ[™ÈÙ[œÚ]]™H]KˆØ\ÚHÝYÙÙ\ÝÈ][™ÈHš]™\ÈÚ]H[[Y\‹]HX[˜YÙ\ˆÚ[ÈÝ]]H[Y]\ˆØ[ˆÝ[™H™XY[ˆHX›Ü˜]ÜžKˆÛÛ\[žHÛXÞH[ˆÙ]È™YH™\]Z\™[Y[ÎˆHY]Ù]\Ý˜[[ÈH
Š‘\Ý›ÞJŠˆØ]YÛÜžHÙˆ’TÕÔN]]\Ý™YXÙHHYY][HÈœ˜YÛY[ÈÛÈÛX[›Üˆ[žHÜ[ÛˆÙˆH˜XÚÈÈ™[XZ[ˆ™XYX›K[™]]\Ý™HØ\œšYYÝ]žHHÝ\Y\ˆ]\ÜÝY\ÈHÙ\YšXØ]HÙˆ\ÝXÝ[Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚY]ÙØ]\ÙšY\È[™YH™\]Z\™[Y[ÈÙ]žHHÛXÞOÈ‹ˆÜ[ÛœÎˆÂˆJHYØ]\ÜÚ[™ËÚXÚÚ\\ÈHXYÛ™]XÈšY[Ú[HX]š[™ÈHYY][H\ÚXØ[H[XÝ‹ˆŠH[™\ÝšX[[™\š^š[™ËÚXÚ™YXÙ\ÈHYY][HÈš[™H\XÛ\È‹ˆÊHÚ™Y[™È[ÈLˆ[HÝš\Ë]ÙXÝ\š]H]™[H‹ˆ‘
H[˜Ú[™\˜][Ûˆ[ˆH][šXÚ\[Ø\ÝH[˜Ú[™\˜]Üˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[™\ÝšX[[™\š^š[™ÊŠ‹——Šˆ
Š•HÜš]\š[Û‹œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆ
Š“’TÕÔN
ŠˆÜ]ÈYYXHØ[š]^˜][Ûˆ[È™YHØ]YÛÜšY\Ë[™HÛXÞH[ˆHØÙ[˜\š[È˜[Y\ÈÛ›HÛ™Kˆ
ŠÛX\ŠŠˆHÝ™\Üš][™Ë™\Ú\Ý[È™XÛÝ™\žHÚ]Ü™[˜\žHÛÛËˆ
Š”\™ÙJŠˆHXÚš\]Y\È]XZÙH™XÛÝ™\žH[™™X\ÚX›H]™[ˆ[ˆHX›Ü˜]ÜžH]
Š›X]™HHYY][HÚÛJŠˆ
YØ]\ÜÚ[™Ë™[™ÜˆÙXÝ\™H\˜\ÙKÜž\È\˜\ÙJKˆ
Š‘\Ý›ÞJŠˆH\ÚXØ[\ÝXÝ[Û‹Y\ˆÚXÚHYY][H\È›ÈÛ™Ù\ˆHYY][Kˆ\ÚÚ[™È›ÜˆH
‘\Ý›ÞJˆØ]YÛÜžH[\ÈÝ][ˆÛ™H[Ý™K]™\ž][™È][™È˜XÚÈ[ˆ[XÝØš™XÝ—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[™\ÝšX[[™\š^š[™È™YXÙ\ÈH\ÚÈÈ
Š™š[™H\XÛ\ÊŠ‹Ù[™[ÝÈH™\ÚÛ]ÚXÚHœ˜YÛY[ÛÝ[Ý[ÛH™XYX›HÜ[ÛˆÙˆH˜XÚÎÈH™\Ý[\È™\šYšXX›HžH^YK[™HÝ\Y\œÈÚÈ\™›Ü›H]\ÜÝYHHÙ\YšXØ]HÙˆ\ÝXÝ[ÛˆHÛXÞH™\]Z\™\Ëˆ]\™Y›Ü™HYY]È[™YH™\]Z\™[Y[Îˆ
Š‘\Ý›ÞJŠˆØ]YÛÜžK\XÛHÚ^™KØÝ[Y[\žH˜XÙXXš[]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHYØ]\ÜÚ[™ÊŠˆ\ÈY™™XÝ]™HÛˆ\È˜]ÚÚXÚ\È[\™[HXYÛ™]XË]]™[Û™ÜÈÈH
Š”\™ÙJŠˆØ]YÛÜžK›Ý
‘\Ý›ÞJŽˆH\ÚÈÛÛY\ÈÝ]ÙˆHÜ\˜][Ûˆ\ÚXØ[HÚÛH[™š\ÝX[H[™\Ý[™ÝZ\ÚX›Hœ›ÛHHÛÜšÚ[™ÈÛ™Kˆ]˜Z[ÈHš\œÝ™\]Z\™[Y[[™Ú]]™\šYšXXš[]K™XØ]\ÙHÚ]Ý]YXØ]Y[œÝ[Y[È›Ø›ÙHØ[ˆÛÛ™š\›HH[XYÛ™]^˜][ÛˆXÝX[HÛÜšÙY—ˆ
ˆ
ŠÊHÚ™Y[™È[ÈLˆ[HÝš\ÊŠˆÙ[Z[™[H\Ý›Þ\ÈHYY][K[™[™YYH\ÜÝYH\È›Ý
Ú]\Šˆ]\Ý›Þ\È]
ŠšÝÈš[™[JŠŽˆÛˆYÚY[œÚ]H\ÚÜÈHÝš\]Ú^™HØ[ˆÝ[Û™XÛÝ™\˜X›HÜ[ÛœÈÙˆH˜XÚË[™[™\ÝžH™Y™\™[˜Ù\È›ÜˆXYÛ™]XÈYYXHÛÛYHÝÛˆÈHÜ™\ˆÙˆˆ[KˆÚ™Y[™È\ÈH˜[YY]Ù\Ý›Ý]]ÙXÝ\š]H]™[ˆ]˜Z[ÈHÙXÛÛ™™\]Z\™[Y[—ˆ
ˆ
Š‘
H[˜Ú[™\˜][ÛŠŠˆ\ÈH[HYÚ][X]H
‘\Ý›ÞJˆY]Ù]Û›H[ˆ[ˆ
Š˜]]Üš^™Y[˜Ú[™\˜]ÜŠŠˆ›ÜˆYYXH\ÝXÝ[Û‹Û™H]™XXÚ\È[™ÛÈH™XÙ\ÜØ\žH[\\˜]\™KˆH][šXÚ\[Ø\ÝH[˜Ú[™\˜]Üˆ\È›ÝÙ\YšYY›Üˆ\È\œÜÙKX^HX]™H™\ÚYYHÙˆHYY][K[™›ÙXÙ\È›ÈÙ\YšXØ]H[ˆ]Y]ÜˆÛÝ[XØÙ\ˆ]˜Z[ÈH\™™\]Z\™[Y[——Šˆ
Š‘^[H˜\ŠŠˆÚ[ˆÙ]™\˜[Ü[ÛœÈ\ÚXØ[H\Ý›ÞHHYY][KH\ØÜš[Z[˜]Üˆ\È›Ý
Ú]\Šˆ^H\Ý›ÞH]]
ŠšÝÈš[™[JŠˆ[™
ŠÚ]Ú]›ÛÙŠŠ‹ˆÙY\H’TÕÔNY\ˆ[ˆZ[™8 %
ŠÛX\ŠŠˆ
HÝ™\Üš]JK
Š”\™ÙJŠˆ
HXZÙH][œ™XÛÝ™\˜X›KYY][H[XÝ
K
Š‘\Ý›ÞJŠˆ
HYY][H›ÈÛ™Ù\ˆ^\ÝÊH8 %[™™[Y[X™\ˆ]XÛÛ[Z\ÜÚ[Ûš[™ÈÙ\È›Ý[™Ú]\ÝXÝ[ÛŽˆ][™ÈÚ]H
Š˜Ù\YšXØ]JŠˆ]ØÝ[Y[È]ˆ‹ˆKˆÌÎˆÂˆÜXÎˆ]]ÛX][Ûˆ	ˆÜ˜Ú\Ý˜][Ûˆ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[HØ[ÈÈ[™\œÝ[™HÛÛ˜Ù\ÙˆÛÜšÙ›Ü˜ÙH][\Y\ˆ[ˆHÛÛ^ÙˆÙXÝ\š]H]]ÛX][Ûˆ[™Ü˜Ú\Ý˜][Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆHÛÜšÙ›Ü˜ÙH][\Y\È‹ˆÜ[ÛœÎˆÂˆJHHÛÜšÙ›Ü˜ÙH][\Y\ˆ[ÝÜÈÜ™Ø[š^˜][ÛœÈÈ˜\YHØØ[HZ\ˆÙXÝ\š]HØ\Xš[]Y\È\Ú[™ÈHÛÛXš[˜][ÛˆÙˆ[X[ˆ[™]]ÛX]Y™\ÛÝ\˜Ù\È‹ˆŠHHÛÜšÙ›Ü˜ÙH][\Y\ˆ[Z]ÈHØÛÜHÙˆÙXÝ\š]H[˜ÚY[ÈžH˜\YH\ÞZ[™Èš\X[š\™]Ø[Ë™]™[[™È[Hœ›ÛHY™™XÝ[™ÈH\™ÙH[X™\ˆÙˆ\Ù\œÈ‹ˆÊH]™\˜YÚ[™ÈHÛÜšÙ›Ü˜ÙH][\Y\ˆ[ÝÜÈÜ™Ø[š^˜][ÛœÈÈ™\XÙHX[X[ÙXÝ\š]HXÝ]š]Y\ÈÚ]]]ÛX]Y›ØÙ\ÜÙ\Ë[\›Ýš[™ÈY™šXÚY[˜ÞH‹ˆ‘
HHÛÜšÙ›Ü˜ÙH][\Y\ˆ™YXÙ\ÈH™YY›ÜˆYÚH]X[YšYYÞX™\œÙXÝ\š]H›Ù™\ÜÚ[Û˜[Ë™\Ý[[™È[ˆÛÜÝØ]š[™ÜÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHHÛÜšÙ›Ü˜ÙH][\Y\ˆ[ÝÜÈÜ™Ø[š^˜][ÛœÈÈ˜\YHØØ[HZ\ˆÙXÝ\š]HØ\Xš[]Y\È\Ú[™ÈHÛÛXš[˜][ÛˆÙˆ[X[ˆ[™]]ÛX]Y™\ÛÝ\˜Ù\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
ŠÛÜšÙ›Ü˜ÙH][\Y\ŠŠˆ™Y™\œÈÈHXš[]HÈØØ[H[™[\YžHHY™™XÝ]™[™\ÜÈÙˆHÙXÝ\š]HX[HžHÛÛXš[š[™ÈHY™›ÜÈÙˆ[X[ˆ›Ù™\ÜÚ[Û˜[ÈÚ]]]ÛX][Ûˆ[™Ü˜Ú\Ý˜][Û‹ˆ\ÈÛÛXš[˜][Ûˆ[ÝÜÈHÜ™Ø[š^˜][ÛˆÈ[™HH\™Ù\ˆ›Û[YHÙˆÙXÝ\š]HXÝ]š]Y\È[™[˜ÚY[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆHÛÜšÙ›Ü˜ÙH][\Y\ˆÙ\È›ÝÜXÚYšXØ[HÛÛ˜Ù\›ˆ\ÞZ[™Èš\X[š\™]Ø[ÈÈ[Z]HØÛÜHÙˆ[˜ÚY[Ë—ˆ
ˆ
ŠÊJŠˆ[ÝYÚHÛÜšÙ›Ü˜ÙH][\Y\ˆ[›Û™\È]]ÛX][™ÈÙ\Z[ˆÙXÝ\š]HXÝ]š]Y\Ë]Ù\È›ÝÛÛ˜Ù\›ˆHÛÛ\]H™\XÙ[Y[ÙˆX[X[XÝ]š]Y\È]H[\YšXØ][ÛˆÙˆHX[IÜÈØ\Xš[]Y\Ë—ˆ
ˆ
Š‘
JŠˆHÛÜšÙ›Ü˜ÙH][\Y\ˆÙ\È›Ý™YXÙHH™YY›Üˆ]X[YšYY›Ù™\ÜÚ[Û˜[ÎÈ]›ØÝ\Ù\ÈÛˆ[˜Ü™X\Ú[™ÈHØ\Xš[]Y\ÈÙˆH^\Ý[™ÈÛÜšÙ›Ü˜ÙHÚ]]]ÛX][Ûˆ[™Ü˜Ú\Ý˜][Û‹ˆ‹ˆKˆÌˆÂˆÜXÎˆ’[˜ÚY[™\ÜÛœÙH‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\ÝØ[ÈÈ[™\œÝ[™H›ÛHÙˆ›ÛÝØ]\ÙH[˜[\Ú\È
ÐJH[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆ›ÛÝØ]\ÙH[˜[\Ú\È[ˆ[˜ÚY[™\ÜÛœÙOÈ‹ˆÜ[ÛœÎˆÂˆJH›ÛÝØ]\ÙH[˜[\Ú\È[È]\›Z[™HÝÈÙ\š[Ý\È[ˆ[˜ÚY[ÛÝ[™H[™ÝÈ]Ú[[\XÝHÜ™Ø[š^˜][Ûˆ‹ˆŠH›ÛÝØ]\ÙH[˜[\Ú\È]\›Z[™\ÈH[ÜHÜˆÜ›Ý\È™\ÜÛœÚX›H›ÜˆH[˜ÚY[[™\ÜÚ\ÝÈ[ˆYØ[›ØÙYY[™ÜÈ‹ˆÊH›ÛÝØ]\ÙH[˜[\Ú\È[È[™\œÝ[™ÝÈH[˜ÚY[ØØÝ\œ™Y[™ÝÈÈ™]™[Ú[Z[\ˆ[˜ÚY[È[ˆH]\™H‹ˆ‘
H›ÛÝØ]\ÙH[˜[\Ú\È[›Û™\È™[[Ýš[™ÈH›ÛÝØ]\ÙHÙˆH[˜ÚY[œ›ÛHHY™™XÝYÞ\Ý[\È[™™]ÛÜšÜÈÈ™]™[™XÝ\œ™[˜ÙH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH›ÛÝØ]\ÙH[˜[\Ú\È[È[™\œÝ[™ÝÈH[˜ÚY[ØØÝ\œ™Y[™ÝÈÈ™]™[Ú[Z[\ˆ[˜ÚY[È[ˆH]\™JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”›ÛÝØ]\ÙH[˜[\Ú\È
ÐJJŠˆ\È[™[Y[[[ˆ[˜ÚY[™\ÜÛœÙH™XØ]\ÙH][È[™\œÝ[™ÝÈH[˜ÚY[ØØÝ\œ™YÚXÚ[™\˜Xš[]Y\ÈÙ\™H^Ú]Y[™ÝÈÈ™]™[Ú[Z[\ˆ[˜ÚY[È[ˆH]\™KˆžHY[YžZ[™ÈH›ÛÝØ]\ÙKÜ™Ø[š^˜][ÛœÈØ[ˆY™\ÜÈH[™\›Z[™ÈÙXZÛ™\ÜÙ\È[ˆHÙXÝ\š]HYX\Ý\™\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]\›Z[š[™ÈHÙ]™\š]HÙˆH[˜ÚY[\È\ÙˆH]XÝ[Ûˆ[™[˜[\Ú\È\ÙK›ÝÐK—ˆ
ˆ
ŠŠJŠˆY[YžZ[™ÈÜÙH™\ÜÛœÚX›H\È˜[XX›H›ÜˆYØ[›ØÙYY[™ÜË]ÐHXZ[›H›ØÝ\Ù\ÈÛˆ[™\œÝ[™[™ÈÝÈH[˜ÚY[ØØÝ\œ™YÈ™]™[Ú[Z[\ˆÛ™\Ë—ˆ
ˆ
Š‘
JŠˆ™[[Ýš[™ÈH›ÛÝØ]\ÙHÈ™]™[™XÝ\œ™[˜ÙH\È\ÙˆH\˜YXØ][Ûˆ\ÙH[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜË›ÝÐH]Ù[‹ˆ‹ˆKˆÌNˆÂˆÜXÎˆ•™X][[YÙ[˜ÙH‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý]\Ý]˜[X]HÛÛYHÝ][Y[ÈX›Ý]H\šÈÙXˆÈ[™\œÝ[™ÚXÚ\™HXØÝ\˜]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È\È“ÕYH™YØ\™[™ÈH\šÈÙXÈ‹ˆÜ[ÛœÎˆÂˆJH[ÛÛ[]˜Z[X›HÛˆH\šÈÙXˆ\È[YØ[[™\›Y[‹ˆŠHH\šÈÙXˆ\È\ÙˆHY\ÙXˆÚXÚ\È[[[Û˜[HY[ˆ[™[˜XØÙ\ÜÚX›H›ÝYÚÝ[™\™ÙXˆœ›ÝÜÙ\œÈ‹ˆÊHÜXÚX[^™YÛÙØ\™KÝXÚ\ÈÜ‹\È\XØ[H™YYYÈXØÙ\ÜÈH\šÈÙXˆ‹ˆ‘
HH\šÈÙXˆÙ[ˆXÝÈ\ÈHX\šÙ]XÙH›Üˆ[XÚ]XÝ]š]Y\È[šÜÈÈH[›Ûž[Z]H]Ù™™\œÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH[ÛÛ[]˜Z[X›HÛˆH\šÈÙXˆ\È[YØ[[™\›Y[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝ
HÝ][Y[]\È“ÕYJNŠŠˆ[ÝYÚH\šÈÙXˆÛÛZ[œÈ]XÚ[YØ[XÝ]š]H[™ÛÛ[]\È›ÝXØÝ\˜]HÈÝ]H]
Š˜[
ŠˆHÛÛ[\È[YØ[Üˆ\›Y[ˆH\šÈÙXˆ[ÛÈÜÝÈYØ[[™\›[\ÜÈÛÛ[ÝXÚ\Èœ™YK\ÜYXÚ›Ü[\È[ˆÛÝ[šY\ÈÚ]Ù[œÛÜœÚ\—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÈ
[YJNŠŠ—ˆ
ˆ
ŠŠJŠˆH\šÈÙXˆ\ÈH\ÙˆHY\ÙX‹[[[Û˜[HY[ˆ[™\ÝX[H[˜XØÙ\ÜÚX›H›ÝYÚÝ[™\™ÙXˆœ›ÝÜÙ\œË—ˆ
ˆ
ŠÊJŠˆÜXÚX[^™YÛÙØ\™HÝXÚ\ÈÜˆ\È\XØ[H™YYYÈXØÙ\ÜÈH\šÈÙX‹›ÝšY[™È[›Ûž[Z]HÈ]È\Ù\œË—ˆ
ˆ
Š‘
JŠˆH\šÈÙXˆ\ÈÙ[ˆ\ÜÛØÚX]YÚ][XÚ]XÝ]š]Y\È[šÜÈÈH[›Ûž[Z]H]Ø[ˆÙ™™\ˆ]È\Ù\œËˆ‹ˆKˆÌLˆÂˆÜXÎˆ\XØ][ÛˆÙXÝ\š]H‹ˆØÙ[˜\š[ÎˆHÛÛ\[žIÜÈÙXˆ\XØ][Ûˆ[ÝÜÈ\Ù\œÈÈÙX\˜Ú›Üˆ›ÙXÝÈ›ÝYÚHÙX\˜Ú˜\‹ÚÜÙH™\Ý[\È\ÙY[ˆHÔS]Y\žKˆH\XØ][Ûˆ[ÛÈ[ÝÜÈ\Ù\œÈÈX]™HÛÛ[Y[ÈÛˆH›ÙXÝYÙ\Ë\Ü^YYÚ]Ý]™\ÝšXÝ[ÛœËˆHÙXÝ\š]HX[H\ÈÛÜœšYYX›Ý]Hš\ÚÈÙˆÔS[š™XÝ[Ûˆ[™ÔÈ]XÚÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÙXÝ\š]HXÚš\]Y\ÈÚÝ[™H\YYÈY™™XÝ]™[HY™\ÜÈ\ÙHÛÛ˜Ù\›œÏÈ‹ˆÜ[ÛœÎˆÂˆJH[\[Y[HÐQˆÈ[Ûš]Üˆ[™š[\ˆ™]ÛÜšÈ˜Y™šXÈ‹ˆŠH[Z]\Ù\ˆXØÙ\ÜÈÈH›ÙXÝYÙ\È›ÝYÚÝ›Û™È]][XØ][Ûˆ‹ˆÊH[˜X›HÈÛˆHÙXˆÙ\™\ˆÈ›ÝXÝ]H˜[œÛZ\ÜÚ[Ûˆ‹ˆ‘
H˜[Y]H[™Ø[š]^™H\Ù\ˆ[œ]›Üˆ›ÝHÙX\˜Ú[™HÛÛ[Y[È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H˜[Y]H[™Ø[š]^™H\Ù\ˆ[œ]›Üˆ›ÝHÙX\˜Ú[™HÛÛ[Y[ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š•˜[Y][Ûˆ[™Ø[š]^˜][ÛˆÙˆ\Ù\ˆ[œ]
Šˆ\ÈH[™[Y[[ÙXÝ\š]HXÚš\]YHÈ™]™[ÔS[š™XÝ[Ûˆ[™ÔÈ]XÚÜËˆ›ÜˆÔSK˜[Y][Ûˆ[œÝ\™\È]ÙX\˜Ú]Y\šY\ÈÈ›Ý[˜ÛYHX[XÚ[Ý\ÈÔSÛÛ[X[™Ëˆ›ÜˆÔËØ[š]^˜][Ûˆ[œÝ\™\È]ÛÛ[Y[ÈÈ›ÝÛÛZ[ˆX[XÚ[Ý\ÈØÜš\È^XÝ]X›H[ˆœ›ÝÜÙ\œË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆHÐQˆ\ÈH˜[XX›HÙXÝ\š]HYX\Ý\™K]\È›ÝHÝXœÝ]]H›Üˆ›Ü\ˆ[œ]˜[Y][ÛŽÈ]Ù\È›ÝÛÛ™HH›ÛÝØ]\ÙHÙˆH›Ø›[K—ˆ
ˆ
ŠŠJŠˆ[Z][™ÈXØÙ\ÜÈÚ]Ý›Û™È]][XØ][ÛˆÙ\È›Ý\™XÝHY™\ÜÈH›Ø›[HÙˆH\XØ][Û‰ÜÈ[\›Ü\ˆ[œ][™[™Ë—ˆ
ˆ
ŠÊJŠˆÈ[˜Üž\È]H\š[™È˜[œÛZ\ÜÚ[Û‹]Ù\È›Ý›ÝXÝYØZ[œÝ]XÚÜÈ]^Ú]H[\›Ü\ˆ[™[™ÈÙˆ\Ù\ˆ[œ][ˆH\XØ][Û‹ˆ‹ˆKˆÌLNˆÂˆÜXÎˆ‘]HÜÜÈ™]™[[Ûˆ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[HØ[ÈÈ[™\œÝ[™H›ÛHÙˆ[ˆHÛÛ^Ùˆ[™\˜Xš[]HX[˜YÙ[Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆ[ˆHÛÛ^Ùˆ[™\˜Xš[]HX[˜YÙ[Y[È‹ˆÜ[ÛœÎˆÂˆJH\ÈH]KY[˜Üž\[ÛˆXÚš\]YH\ÙYÈ›ÝXÝÙ[œÚ]]™H[™›Ü›X][ÛˆÝÜ™Y[ˆ]X˜\Ù\È[™ÛÝY[š\›Û›Y[È‹ˆŠH\ÈHÞX™\œÙXÝ\š]HÛÛ]›ØÝ\Ù\ÈÛˆY[YžZ[™È[™›ØÚÚ[™ÈX[XÚ[Ý\ÈÛÙØ\™H[™š\\Ù\ÈÈ™]™[]Hœ™XXÚ\È‹ˆÊH\ÈHÙ]ÙˆXÚš\]Y\È[™ÛÛÈÈ™]™[H[˜]]Üš^™Y˜[œÛZ\ÜÚ[ÛˆÙˆ]H‹ˆ‘
H\ÈH™]ÛÜšË\ÙXÝ\š]HXÚ›ÛÙÞH][Ûš]ÜœÈ[™[˜[^™\È™]ÛÜšÈ˜Y™šXÈÈ]XÝ[™™]™[ÔÈ]XÚÜÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH\ÈHÙ]ÙˆXÚš\]Y\È[™ÛÛÈÈ™]™[H[˜]]Üš^™Y˜[œÛZ\ÜÚ[ÛˆÙˆ]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š‘
]HÜÜÈ™]™[[ÛŠJŠˆÛÛ\š\Ù\ÈHÙ]ÙˆXÚš\]Y\È[™ÛÛÈ\ÚYÛ™YÈ]XÝ[™™]™[H[˜]]Üš^™Y˜[œÛZ\ÜÚ[ÛˆÙˆÙ[œÚ]]™H]HÝ]ÚYH[ˆÜ™Ø[š^˜][Û‰ÜÈ™]ÛÜšË›ÝXÝ[™È˜[XX›H]Hœ›ÛHXZØYÙHÜˆ^ÜÝ\™HÈ[˜]]Üš^™Y[]Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ\È›ÝÜXÚYšXØ[H›ØÝ\ÙYÛˆ[˜Üž\[™È]H[ˆ]X˜\Ù\È[™ÛÝY[š\›Û›Y[ÎÈ]›ØÝ\Ù\ÈÛˆ™]™[[™È]HÜÜË—ˆ
ˆ
ŠŠJŠˆÞX™\œÙXÝ\š]HÛÛÈ›ÜˆY[YžZ[™È[™›ØÚÚ[™ÈX[Ø\™H\ØÜšX™H[]š\\ËØ[[X[Ø\™K›Ý—ˆ
ˆ
Š‘
JŠˆ[Ûš]Üš[™È™]ÛÜšÈ˜Y™šXÈÈ]XÝÔÈ]XÚÜÈ\ØÜšX™\È[KQÔÈÛÛË›Ýˆ‹ˆKˆÌLŽˆÂˆÜXÎˆ”\ÜÝÛÜ™ÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ•™\^[™\ÝšY\È\Ù\È[Y\›Ý\ÈÛÙØ\™HÛÛËXXÚ™\]Z\š[™ÈÙ\\˜]H]][XØ][Û‹ˆHÞX™\œÙXÝ\š]HX[H\ÈÛÜœšYYX›Ý]Hœ™\]Y[Ý\ÜXÚÙ]È™[]YÈ›Ü™ÛÝ[ˆ\ÜÝÛÜ™Ëˆ^H™[Y]™H\ÈÛÝ[XY[\ÞYY\ÈÈYÜ[œÙXÝ\™H\ÜÝÛÜ™Xš]Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÛÛ][ÛˆÛÝ[‘TÕ™[Y]™HHÝ™\ÜÈÙˆ™[Y[X™\š[™È][\HÜ™Y[X[È[™›Û[ÝH™]\ˆ\ÜÝÛÜ™ÙXÝ\š]OÈ‹ˆÜ[ÛœÎˆÂˆJH[˜ÛÝ\˜YÙH[\ÞYY\ÈÈØÝ[Y[Z\ˆ\ÜÝÛÜ™È‹ˆŠHYÜHÛÛ\[žKX\›Ý™Y\ÜÝÛÜ™X[˜YÙ\ˆ‹ˆÊH\ÞHHÝ]Y[š\™]Ø[‹ˆ‘
H[˜Ü™X\ÙHH\ÜÝÛÜ™^\˜][Ûˆ\š[Ù‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHYÜHÛÛ\[žKX\›Ý™Y\ÜÝÛÜ™X[˜YÙ\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”\ÜÝÛÜ™X[˜YÙ\œÊŠˆÙXÝ\™[HÝÜ™H][\HÜ™Y[X[È[™›ÝšYH\Ù\œÈÚ]HÛÛ™[šY[˜ÙHÙˆ]š[™ÈÈ™[Y[X™\ˆÛ›HÛ™HÝ›Û™ÈX\Ý\ˆ\ÜÝÛÜ™™YXÚ[™ÈH›Ø˜Xš[]HÙˆ[œÙXÝ\™H\ÜÝÛÜ™˜XÝXÙ\Ëˆ^H[ÝÈ\Ú[™ÈY™™\™[ÛÛ\^\ÜÝÛÜ™È›ÜˆXXÚÙ\šXÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[˜ÛÝ\˜YÚ[™È[\ÞYY\ÈÈØÝ[Y[Z\ˆ\ÜÝÛÜ™ÈÜÙ\ÈHÚYÛšYšXØ[ÙXÝ\š]Hš\ÚËÚ[˜ÙH\ÚXØ[ÜˆYÚ][\ÝÈØ[ˆ™HX\Ú[HÜÝÜˆXØÙ\ÜÙYžH[˜]]Üš^™Y[ÜK—ˆ
ˆ
ŠÊJŠˆHÝ]Y[š\™]Ø[Ù\È›ÝY™\ÜÈH›Ø›[HÙˆ\ÜÝÛÜ™˜]YÝYH[[Û™È[\ÞYY\Ë—ˆ
ˆ
Š‘
JŠˆ[˜Ü™X\Ú[™ÈH\ÜÝÛÜ™^\˜][Ûˆ\š[ÙZYÚ™YXÙHHœ™\]Y[˜ÞHÙˆ™\Ù]Ë]Ù\È›ÝY™\ÜÈHXZ[ˆ›Ø›[HÙˆX[˜YÚ[™È][\H\ÜÝÛÜ™Ëˆ‹ˆKˆÌLÎˆÂˆÜXÎˆ“][KQ˜XÝÜˆ]][XØ][Ûˆ‹ˆØÙ[˜\š[Îˆ’Ù[H[››Ý˜][ÛœÈÈ\ÈÛÚÚ[™È›Üˆ[ˆ]][XØ][ÛˆY]Ù]Ù[™\˜]\ÈH[š\]YK[\Ü˜\žHÛÙHÈ™\šYžHHY[]HÙˆ™[[ÝH[\ÞYY\Ëˆ\ÈÛÙHØ[ˆ™HÙ[™\˜]YžHHÛÙØ\™H\XØ][Ûˆ[œÝ[YÛˆH[\ÞYY\ÉÈÛX\Û™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È‘TÕ\ØÜšX™\ÈH]][XØ][ÛˆY]ÙHÛÛ\[žH\ÈÛÛœÚY\š[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\ÚXØ[ÙXÝ\š]HÙ^\È‹ˆŠHÛÙØ\™H]][XØ][ÛˆÚÙ[œÈ‹ˆÊHÝ]XÈ\ÜÝÛÜ™È‹ˆ‘
Hš[ÛY]šXÈ]][XØ][Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÛÙØ\™H]][XØ][ÛˆÚÙ[œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”ÛÙØ\™H]][XØ][ÛˆÚÙ[œÊŠˆÙ[™\˜]H[˜[ZXË[\Ü˜\žHÛÙ\ËÙ[ˆ\ÙY›ÜˆÛËY˜XÝÜˆ]][XØ][Ûˆ
‘JK[™Ø[ˆ™H›ÙXÙYžH[ˆ\ÛˆH]šXÙHÝXÚ\ÈHÛX\Û™Kˆ\ÈXZÙ\È[HYX[›Üˆ™[[ÝH[\ÞYY\ÈÚÈÈ›Ý]™HÈØ\œžHY][Û˜[\™Ø\™K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ\ÚXØ[ÙXÝ\š]HÙ^\È\™H\™Ø\™H]šXÙ\Ë›ÝÛÙØ\™H\XØ][ÛœÈ[œÝ[YÛˆÛX\Û™\Ë—ˆ
ˆ
ŠÊJŠˆÝ]XÈ\ÜÝÛÜ™È\™H™YYš[™Y\ÜÝÛÜ™È]È›ÝÚ[™ÙH[˜[ZXØ[HZÙHÚÙ[œË—ˆ
ˆ
Š‘
JŠˆš[ÛY]šXÈ]][XØ][Ûˆ™[Y\ÈÛˆ[š\]YH\ÚXØ[Üˆ™Z]š[Ü˜[]šX]\È
ÝXÚ\Èš[™Ù\œš[ÈÜˆ›ÚXÙH]\›œÊH›Üˆ™\šYšXØ][ÛŽÈ]Ù\È›ÝÙ[™\˜]H[\Ü˜\žHÛÙ\Ëˆ‹ˆKˆÌMˆÂˆÜXÎˆ’[˜ÚY[™\ÜÛœÙH‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý]\ÝÛ›ÝÈÚXÚXÝ]š]Y\ÈØØÝ\ˆ\š[™ÈH]XÝ[Ûˆ\ÙH[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ]š]Y\ÈZÙ\ÈXÙH\š[™ÈH]XÝ[Ûˆ\ÙH[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜÏÈ‹ˆÜ[ÛœÎˆÂˆJH[˜[^™HH]šY[˜ÙH[™]\›Z[™HH›ÛÝØ]\ÙHÙˆH[˜ÚY[‹ˆŠHY[YžH[™Û\ÜÚYžH[˜ÚY[È˜\ÙYÛˆZ\ˆÙ]™\š]H[™[\XÝÛˆHÜ™Ø[š^˜][Ûˆ‹ˆÊH[Z]HY™™XÝY]šXÙIÜÈÛÛXÝÚ]Ý\ˆ]šXÙ\È[™ÛÚÈ›ÜˆH›Ø›[HÛˆHY™™XÝY]šXÙH‹ˆ‘
H]\›Z[™HÝÈÛ™È]Ú[ZÙHÈœš[™ÈHY™™XÝYÞ\Ý[\È[™Ù\šXÙ\È˜XÚÈÈ›Ü›X[Ü\˜][Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHY[YžH[™Û\ÜÚYžH[˜ÚY[È˜\ÙYÛˆZ\ˆÙ]™\š]H[™[\XÝÛˆHÜ™Ø[š^˜][ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š™]XÝ[Ûˆ\ÙJŠˆ[ˆH[˜ÚY[\™\ÜÛœÙH›ØÙ\ÜÈ[›Û™\ÈHY[YšXØ][Ûˆ[™Û\ÜÚYšXØ][ÛˆÙˆ[˜ÚY[È˜\ÙYÛˆZ\ˆÙ]™\š]H[™[\XÝÛˆHÜ™Ø[š^˜][Û‹ˆ\È\ÙH\Ù\È˜\š[Ý\ÈÙXÝ\š]K[[Ûš]Üš[™ÈÛÛËÝXÚ\ÈQÈ[™ÒQSKÈ]XÝ[\ÝX[XÝ]š]HÜˆ[›ÛX[Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[˜[^š[™ÈH]šY[˜ÙH[™]\›Z[š[™ÈH›ÛÝØ]\ÙH˜[ÈÚ][ˆH™XÛÝ™\žH[™\ÜÛÛœÈX\›™Y\ÙKY\ˆH[˜ÚY[\È™Y[ˆÛÛZ[™Y[™\˜YXØ]Y—ˆ
ˆ
ŠÊJŠˆ[Z][™ÈHY™™XÝY]šXÙIÜÈÛÛXÝ\È\ÙˆHÛÛZ[›Y[\ÙK—ˆ
ˆ
Š‘
JŠˆ]\›Z[š[™ÈHÞ\Ý[K\™XÛÝ™\žH[Y\È\È\ÙˆH™XÛÝ™\žH\ÙKˆ‹ˆKˆÌMNˆÂˆÜXÎˆ”\ÜÝÛÜ™ÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ’Ù[H[››Ý˜][ÛœÈÈ\È™XÙ[H\ØÛÝ™\™Y]HÚYÛšYšXØ[[X™\ˆÙˆ[\ÞYY\È]™H\ÙYHØ[YH\ÜÝÛÜ™›ÜˆZ\ˆÛÜšÈXØÛÝ[È›ÜˆÝ™\ˆHYX\‹ˆHU\\Y[™[Y]™\È\ÈÛÝ[ÛÛšX]HÈHYÚ\ˆš\ÚÈÙˆ[˜]]Üš^™YXØÙ\ÜË\ÜXÚX[HYˆÛÛYH[\ÞYYIÜÈ\ÜÝÛÜ™Y™Y[ˆ™]š[Ý\ÛHÛÛ\›ÛZ\ÙYˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]ÛÝ[™HH‘TÕÝ˜]YÞHÈ™YÝ[\›H›Û\[\ÞYY\ÈÈ\]HZ\ˆÜ™Y[X[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ]H\ÜÝÛÜ™^\˜][ÛˆÛXÞH‹ˆŠH[˜Ü™X\ÙHH\ÜÝÛÜ™ÛÛ\^]H™\]Z\™[Y[È‹ˆÊH[\[Y[š[ÛY]šXÈ]][XØ][Ûˆ‹ˆ‘
HXZÙH\š[ÙXÈÙXÝ\š]H˜Z[š[™ÈX[™]ÜžH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÙ]H\ÜÝÛÜ™^\˜][ÛˆÛXÞJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÙˆH›Ý\ˆÜ[ÛœËH
Šœ\ÜÝÛÜ™^\˜][ÛˆÛXÞJŠˆ\ÈHÛ›HÛ™H]›ÙXÙ\ÈHY™™XÝH]Y\Ý[Ûˆ\ÚÜÈ›Üˆ8 %›Ü˜Ú[™È\Ù\œÈÈ
Š˜Ú[™ÙHÜ™Y[X[È]™YÝ[\ˆ[\˜[ÊŠˆ8 %™XØ]\ÙH]\ÈHÛ›HÛ™H]XÝÈÛˆH\ÜÝÛÜ™	ÜÈY™][YKˆHÝ\ˆ™YH[\›Ý™HÙXÝ\š]H[ˆÝ\ˆØ^\Ë]›Û™HÙˆ[HÛÛ\[È[žX›ÙHÈÚ[™ÙH[ž][™Ë—Šˆ
Š[ˆ[\Ü[Ú[›ÝÈZ\Ü™XYŠŠˆ\š[ÙXÈ^\˜][Ûˆ
Šš\È›ÈÛ™Ù\ˆÛÛœÚY\™YÛÛÙ˜XÝXÙH[ˆ]Ù[ŠŠ‹ˆ
Š“’TÕÔMŒÐŠŠˆ^XÚ]H™XÛÛ[Y[™È
Š››Ý
Šˆ[\ÜÚ[™ÈX[™]ÜžH\š[ÙXÈÚ[™Ù\ÈÚ]Ý]H™X\ÛÛ‹[™›Ü˜Ú[™ÈHÚ[™ÙHÛ›HÚ\™H\™H\È
Š™]šY[˜ÙHÙˆÛÛ\›ÛZ\ÙJŠ‹ˆH™X\ÛÛˆ\È™Z]š[Ü˜[[™Ù[ØÝ[Y[Y[ˆHšY[ˆÛÛY[Û™H›Ü˜ÙYÈÚ[™ÙH]™\žHŒ^\È›ÙXÙ\È™YXÝX›H\š]˜]]™\È

”Ý[[Y\ŒŒJ‹[ˆ
]][[ŒŒJŠKÚXÚ[ˆ]XÚÙ\ˆÝY\ÜÙ\È[Ü™HX\Ú[H[ˆH™]š[Ý\È\ÜÝÛÜ™—Šˆ
Š’ÝÈHØÙ[˜\š[ÉÜÈ›Ø›[H\È[™YÙ^NŠŠˆÛ™È\ÜÜ˜\Ù\ÈÚ]›È^\žK
Š“QJŠ‹ØÜ™Y[š[™ÈÚÜÙ[ˆ\ÜÝÛÜ™ÈYØZ[œÝÛÜœÜ˜HÙˆ[™XYKXœ™XXÚYÜ™Y[X[Ë[™[ˆ
Šš[[YYX]K\™Ù]Y™\Ù]
ŠˆÚ[ˆHÜ™Y[X[\›œÈÝ]È™H^ÜÙYˆ›ÝKÝÙ]™\‹]Ù]™\˜[™YÝ[]ÜžHœ˜[Y]ÛÜšÜÈ

Š”ÒHÔÊŠˆš\œÝ[[Û™È[JHÝ[X[™]H\š[ÙXÈ^\˜][Û‹ÚXÚ\ÈÚHH^[H]Y\Ý[Ûˆ™[XZ[œÈ˜[YˆÛ›ÝÈÝÈÈ[œÝÙ\ˆžHH]Y\Ý[Û‰ÜÈÙÚXË[™Û›ÝÈHÝ\œ™[™XÛÛ[Y[™][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ[˜Ü™X\Ú[™ÈHÛÛ\^]H™\]Z\™[Y[È[\›Ý™\È\ÜÝÛÜ™Ý™[™Ý]Ù\È›Ý[˜ÛÝ\˜YÙH™YÝ[\ˆÚ[™Ù\Ë—ˆ
ˆ
ŠÊJŠˆš[ÛY]šXÈ]][XØ][ÛˆÙ\È›ÝY™\ÜÈH›Ø›[HÙˆÝ[H\ÜÝÛÜ™Ë—ˆ
ˆ
Š‘
JŠˆ˜Z[š[™È\È\ÙY[]Ù\È›Ý\™XÝH[™›Ü˜ÙH\ÜÝÛÜ™Ú[™Ù\Ëˆ‹ˆKˆÌMŽˆÂˆÜXÎˆ”\ÜÝÛÜ™ÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ”™YY[ˆUX[˜YÙ\ˆ]Ù[H[››Ý˜][ÛœÈË\ØÛÝ™\™Y]HÜ[\ˆ\ÜÝÛÜ™XÜ˜XÚÚ[™ÈÛÛØ\ÈX\Ú[HÜ˜XÚÚ[™ÈX[žH\Ù\ˆ\ÜÝÛÜ™ËˆHÝ\ÜXÝÈ\È\È™XØ]\ÙH\Ù\œÈ™[HÛˆX\Ú[HÝY\ÜØX›H]\›œÈ[™ÛÜ™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈH‘TÕ\›ØXÚ›Üˆ™YYÈ[œÝ\™H]\ÜÝÛÜ™È\™H›ÝX\Ú[HÜ˜XÚÙYÈ‹ˆÜ[ÛœÎˆÂˆJHX[™]HÜ™X]\ˆÛÛ\^]H[ˆ\ÜÝÛÜ™È‹ˆŠHÝÚ]ÚÈHY™™\™[[˜Üž\[Ûˆ[ÛÜš]H›ÜˆHÝÜ™Y\ÜÝÛÜ™È‹ˆÊH[\[Y[][KY˜XÝÜˆ]][XØ][Ûˆ‹ˆ‘
H[˜Ü™X\ÙHHœ™\]Y[˜ÞHÙˆX[™]ÜžH\ÜÝÛÜ™Ú[™Ù\È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHX[™]HÜ™X]\ˆÛÛ\^]H[ˆ\ÜÝÛÜ™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[È[œÚ[ÈHÜXÚYšXÈØ]\ÙH8 %\Ù\œÈXÚÈ
Šœ™YXÝX›HÛÜ™È[™]\›œÊŠˆ8 %[™ÙˆH›Ý\ˆÜ[ÛœÈÛ›H
Š˜ÛÛ\^]H™\]Z\™[Y[ÊŠˆXÝÛˆHÛÛ\ÜÚ][ÛˆÙˆH\ÜÝÛÜ™]\ËÛˆ^XÝHÚ]XZÙ\È]ÝY\ÜØX›KˆQHYÈHÙXÛÛ™˜XÝÜˆ]X]™\ÈHÙXZÈ\ÜÝÛÜ™\È]\ÎÈœ™\]Y[^\žHÚ[™Ù\ÈH\ÜÝÛÜ™Ú]Ý]XZÚ[™È][žH™]\‹—Šˆ
Š•Ú]ÈYÈXZÙH]XÝX[HÛÜšÎŠŠˆ
Š“’TÕÔMŒÐŠŠˆ˜]›Ý\œÈ
Š›[™Ý
ŠˆÝ™\ˆÛÛ\ÜÚ][Ûˆ[\Ë™XØ]\ÙHÝ™\‹\šYÚY[\È›ÙXÙHHÜÜÚ]HÙˆH[[™YY™™XÝˆ›Ü˜ÙYÈ[˜ÛYH[ˆ\\˜Ø\ÙH]\‹HYÚ][™HÞ[X›ÛH\Ù\ˆÜš]\È
”ÜÝÌ™J‹ÚXÚ›Ü›X[HØ]\ÙšY\ÈHÛXÞH[™Ú]È™X\ˆHÜÙˆ]™\žHÜ˜XÚÚ[™ÈXÝ[Û˜\žKˆHY™[œÙH]Ù[Z[™[HÛÜšÜÈ\ÈHÛÛXš[˜][ÛŽˆH
Š›Û™È\ÜÜ˜\ÙJŠˆ
Ù[™HÚ\˜XÝ\œÈ[™\
KH
Š˜›ØÚÛ\Ý
Šˆ™Z™XÝ[™ÈÛÛ[[Ûˆ\ÜÝÛÜ™È[™[™XYKXœ™XXÚYÜ™Y[X[Ë[™
Š“QJŠ‹—Šˆ
Š“ÛˆHÙ\™\ˆÚYKÚ\™HH]Y\Ý[ÛˆÝÜÎŠŠˆYˆHÜ˜XÚÚ[™ÈÛÛ\Èœ™XZÚ[™ÈX[žH\ÜÝÛÜ™È
™X\Ú[J‹ÝÈ^H\™H
ŠœÝÜ™Y
Šˆ\Ù\™\ÈÚXÚÚ[™ÈÛËˆ\ÜÝÛÜ™È\™H›Ý[˜Üž\Yˆ^H\™H]›ÝYÚH
ŠœÛÝËØ[Y
Šˆ\Ú[˜Ý[Ûˆ8 %˜Üž\ØÜž\\™ÛÛŒ‹ˆÝÜ™Y\ÈH˜\Ý\Ú
QKÒKLKZ[ˆÒKLMŠH^H˜[Èš[[ÛœÈÙˆÔH][\È\ˆÙXÛÛ™ÝÙ]™\ˆÛÛ\^^H\™K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆHÜ[Ûˆ\È[\™XÚ\ÙH[ˆ]È™\žH\›\ÎˆÝÜ™Y\ÜÝÛÜ™È\™H
Š››Ý[˜Üž\Y
Š‹^H\™H]›ÝYÚHÛÝËØ[Y\Ú[˜Ý[Û‹ˆ™^[Û™]Ú[™Ú[™ÈHÙ\™\‹\ÚYH[ÛÜš]H›ÝXÝÈHÝÜ™HYˆH]X˜\ÙH\ÈÝÛ[‹]Ù\È›Ý[™ÈÈXZÙHH\ÜÝÛÜ™H\Ù\ˆÚÛÜÙ\È\ÜÈ™YXÝX›H8 %ÚXÚ\ÈH›Ø›[HHØÙ[˜\š[È\ØÜšX™\Ë—ˆ
ˆ
ŠÊJŠˆQHÜ™X]H[\›Ý™\ÈXØÛÝ[ÙXÝ\š]K]Ù\È›Ý[œÝ\™H]H\ÜÝÛÜ™ÛÛ\Û™[\ÈÛÛ\^[™™\Ú\Ý[ÈÜ˜XÚÚ[™Ë—ˆ
ˆ
Š‘
JŠˆœ™\]Y[\ÜÝÛÜ™Ú[™Ù\ÈØ[ˆXYÈ\ÜÝÛÜ™˜]YÝYH[™È›Ý[œÝ\™H]H™]È\ÜÝÛÜ™È\™H[Ü™HÛÛ\^ˆ‹ˆKˆÌMÎˆÂˆÜXÎˆ•[™\˜Xš[]HX[˜YÙ[Y[‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý]\ÝY[YžHHÛÜœ™XÝ›Ü›X]ÙˆHÕ‘HY[YšY\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È™\™\Ù[ÈH˜[Y›Ü›X]›ÜˆHÕ‘HY[YšY\È‹ˆÜ[ÛœÎˆÂˆJHÕ‘KLŒŒ‹RX\›YY‹ˆŠHÕ‘KLŒ‹LLŒÈ‹ˆÊHÕ”ÔÎŒËŒKÐUŽ“‹ÐPÎ“ÔŽ“‹ÕRN“ˆ‹ˆ‘
HÕ‘KLŒŒ‹LLŒÍH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÕ‘KLŒŒ‹LLŒÍJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
ŠÕ‘JŠˆY[YšY\ˆ\È™YH\[‹\Ù\\˜]Y\ÎˆHš^Y™Yš^
ŠÕ‘JŠ‹H›Ý\‹YYÚ]
ŠžYX\ŠŠˆ[ˆÚXÚHY[YšY\ˆØ\È\ÜÚYÛ™Y
›Ý™XÙ\ÜØ\š[HHYX\ˆÙˆ\ØÛÜÝ\™JH[™H
ŠœÙ\]Y[˜ÙH[X™\ŠŠˆÙˆ]X\Ý›Ý\ˆYÚ]ËÚXÚ›ÝØY^\ÈØ[ˆ™H]XÚÛ™Ù\‹ˆHY[YšY\ˆ\ÈÛ›HHX™[ˆ]Ø^\È›Ý[™ÈX›Ý]Ù]™\š]KÚXÚ\ÈYX\Ý\™YÙ\\˜][HÚ]Õ”ÔË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÕ‘KLŒŒ‹RX\›YYŠŠˆH\™šY[]\Ý™H[Y\šXËˆ›Ü\ˆ˜[Y\È
X\›YYÙÍÚ[Ú[ÚØÚÊH\™HšXÚÛ˜[Y\ÈÚ]™[ˆžHH™\ÜÈÜˆžHÚÙ]™\ˆ›Ý[™H›]ÎÈ^H\™H›Ý\ÙˆHÝ[™\™[™Y[YžH›Ý[™È[š\]Y[K—ˆ
ˆ
ŠŠHÕ‘KLŒ‹LLŒÎŠŠˆHYX\ˆ]\Ý™HÜš][ˆÚ]›Ý\ˆYÚ]ËˆHÛËYYÚ]›Ü›HÙ\È›Ý^\Ý[ˆHÝ[™\™—ˆ
ˆ
ŠÊHÕ”ÔÎŒËŒKÐUŽ“‹ÐPÎ“ÔŽ“‹ÕRN“ŽŠŠˆ\È\ÈH
ŠÕ”ÔÈ™XÝÜŠŠ‹\ØÜšXš[™ÈH^Ú]][Ûˆ[™[\XÝÚ\˜XÝ\š\ÝXÜÈœ›ÛHÚXÚHÙ]™\š]HØÛÜ™H\ÈÛÛ\]Yˆ]\ÈX›Ý]ÝÈ˜YH›]È\Ë›ÝÚXÚ›]È]\Ëˆ‹ˆKˆÌNˆÂˆÜXÎˆ•Ú\™[\ÜÈÙXÝ\š]H‹ˆØÙ[˜\š[Îˆ‘ÙZÚÛËHÛÝ[™È™]Z[\‹\È^[™[™È]ÈXY]X\\œÈ[™[œÈÈ[\[Y[H™]ÈÚ\™[\ÜÈ™]ÛÜšÈ›ÝYÚÝ]H˜XÚ[]KˆØ\H\È™Y[ˆ\ÚÙYÚ][œÝ\š[™ÈÝ›Û™ËÙXÝ\™HÚ\™[\ÜÈÛÝ™\˜YÙK\ÜXÚX[H[ˆYÚ]˜Y™šXÈÝ\ÝÛY\‹Y˜XÚ[™È\™X\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]ÚÝ[Ø\HÈ‘Q“Ô‘H[œÝ[[™ÈHXØÙ\ÜÈÚ[ÈÈÜ[Z^™HXÙ[Y[[™™YXÙH[\™™\™[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJHÜ™X]HHÚ\™[\ÜÈX]X\ÙˆHZ[[™È^[Ý]‹ˆŠHÛÛ™šYÝ\™HÔLÈÙXÝ\š]HÛˆ[XØÙ\ÜÈÚ[È\š[™ÈÙ]\‹ˆÊH[œÝ[Ú\™[\ÜÈ™]ÛÜšÈ™\X]\œÈ]HÛÜ›™\œÈÙˆH˜XÚ[]H‹ˆ‘
H\ØX›HÔÒQœ›ØYØ\ÝÛˆ[Ú\™[\ÜÈ]šXÙ\È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÜ™X]HHÚ\™[\ÜÈX]X\ÙˆHZ[[™È^[Ý]
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÜ™X][™ÈH
ŠšX]X\
ŠˆÙˆH˜XÚ[]H[ÝÜÈØ\HÈš\ÝX[^™HHÚ\™[\ÜÈÚYÛ˜[ÛÝ™\˜YÙH[™Y[YžHXY›Û™\Ë[\™™\™[˜ÙHÛÝ\˜Ù\ÈÜˆÝ™\›\\™X\È™Y›Ü™H\ÚXØ[H\ÞZ[™ÈHXØÙ\ÜÈÚ[Ë[œÝ\š[™ÈÜ[X[XÙ[Y[›Üˆ\™›Ü›X[˜ÙH[™ÙXÝ\š]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆÛÛ™šYÝ\š[™ÈÔLÈÙXÝ\š]H\È[\Ü[]ÚÝ[™HÛ™HY\ˆ]\›Z[š[™ÈHYX[\ÚXØ[XÙ[Y[—ˆ
ˆ
ŠÊJŠˆ[œÝ[[™È™\X]\œÈÜˆ\ØX›[™ÈÔÒQœ›ØYØ\Ý\™HÜÝZ[œÝ[][Ûˆ[™™XXÝ]™HÚ[™Ù\Ë[œÝY™šXÚY[›Üˆ[›š[™ÈY\]X]HÚ\™[\ÜÈÛÝ™\˜YÙK—ˆ
ˆ
Š‘
JŠˆ\ØX›[™ÈÔÒQœ›ØYØ\Ý\ÈHÙXÝ\š]HÛÛ™šYÝ\˜][Û‹›ÝH\Þ[Y[\[›š[™ÈÝ˜]YÞKˆ‹ˆKˆÌNNˆÂˆÜXÎˆ“™]ÛÜšÈÙXÝ\š]H]šXÙ\È‹ˆØÙ[˜\š[ÎˆÞX™\™Y\ÈHÛØ˜[›Û‹\›Ùš]Ü™Ø[š^˜][ÛˆYXØ]YÈXZÚ[™È[\›™]XØÙ\ÜÈH™X[]HÛÜ›ÚYKˆÛÛ\[žHÙ™šXÚX[È\™HÛÜœšYYX›Ý]Ú]\ˆH™]ÛÜšÈ[™œ˜\ÝXÝ\™HØ[ˆ[œÝ\™H]HÛÛ™šY[X[]H[™›ÝXÝÙ[œÚ]]™H[™›Ü›X][ÛˆÚ[ˆ]\ÈÙ[ÈH[Y\›Ý\È[\›˜][Û˜[Ú]\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È™]ÛÜšÈ]šXÙ\ÈÛÝ[™HHSÔÕÝZ]X›H›ÜˆHÜ™Ø[š^˜][ÛˆÈ[\›Ý™HÙXÝ\š]OÈ‹ˆÜ[ÛœÎˆÂˆJHœšYÙH‹ˆŠH›Ý]\ˆ‹ˆÊHÝÚ]Ú‹ˆ‘
HXˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH›Ý]\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”›Ý]\œÊŠˆÜ\˜]H]H™]ÛÜšÈ^Y\ˆ
^Y\ˆÊH[™\™HHÛ›H]šXÙH[[Û™ÈÜÙH\ÝYX›HÈ›Ú[ˆY™™\™[™]ÛÜšÜÈ[™XÚYHÚ]Ù]È›ÝYÚˆ^H\HPÓËÙ\\˜]HHÚ]\È[™X›Ý™H[\™HÚ\™H
Š’TÙXÈ”ˆ[›™[ÊŠˆ™]ÙY[ˆÚ]\È\›Z[˜]KˆÈ™H™XÚ\ÙNˆÛÛ™šY[X[]H\È›Ý›ÝšYYžHH›Ý]\ˆ\ÈÝXÚ]\È›ÝšYYžHH[›™[	ÜÈ
Š™[˜Üž\[ÛŠŠˆ8 %]H›Ý]\ˆ\ÈÚ]ÜÝÈ]ÚXÚ\ÈÚH]\ÈHšYÚÚÚXÙH[[Û™ÈH›Ý\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆœšYÙ\ÈÜ\˜]H]H]K[[šÈ^Y\ˆ
^Y\ˆŠH[™\™HÝZ]X›H›Üˆ[\›˜[™]ÛÜšÈ˜Y™šXË]XÚÈH›Ý][™ÈØ\Xš[]Y\È[™XØÙ\ÜÈÛÛ›ÛÈ™YYY›ÜˆHÙXÝ\™H˜[œÛZ\ÜÚ[ÛˆÙˆ]H™]ÙY[ˆÚ]\Ë—ˆ
ˆ
ŠÊJŠˆÝÚ]Ú\ÈÜ\˜]H]^Y\ˆˆ[™\™HÝZ]X›H›Üˆ[\›˜[™]ÛÜšÈ˜Y™šXË]È›ÝX[˜YÙHÙXÝ\™HÛÛ[][šXØ][Ûˆ™]ÙY[ˆY™™\™[™]ÛÜšÜË—ˆ
ˆ
Š‘
JŠˆXœÈÜ\˜]H]H\ÚXØ[^Y\ˆ
^Y\ˆJK˜[œÛZ][™È]HÈ[ÛÛ›™XÝY]šXÙ\ÈÚ]Ý]ÙXÝ\š]H™X]\™\Ëˆ‹ˆKˆÌŒˆÂˆÜXÎˆ•[™\˜Xš[]HX[˜YÙ[Y[‹ˆØÙ[˜\š[ÎˆHØØ[ˆ™]\›œÈÛÈš[™[™ÜËˆHš\œÝ\ÈH[™\˜Xš[]HÚ]HÕ”ÔÈ˜\ÙHØÛÜ™HÙˆKŽÛˆH\ÝÙ\™\ˆ\ÛÛ]Y[ˆHXˆ™]ÛÜšÈ[œ™XXÚX›Hœ›ÛHH[\›™][™Û[™È›È™X[]KˆHÙXÛÛ™ØÛÜ™\È‹H[™Ú]ÈÛˆH[\›™]Y˜XÚ[™ÈÝ\ÝÛY\ˆÜ[ÚXÚ[™\È^[Y[]K[™HX›XÈ^Ú]›Üˆ]\È[™XYH™Z[™È\ÙY[ˆHÚ[ˆ‹ˆ]Y\Ý[ÛŽˆ“ÛˆÚXÚÜš]\š[ÛˆÚÝ[™[YYX][Ûˆš[Üš]H™H˜\ÙYÈ‹ˆÜ[ÛœÎˆÂˆJHÛˆHYÚ\ˆÕ”ÔÈ˜\ÙHØÛÜ™NˆHKŽ[™\˜Xš[]H]\Ý™Hš^Yš\œÝ‹ˆŠHÛˆXÝX[š\ÚËÛÛXš[š[™ÈHØÛÜ™HÚ]^ÜÝ\™K]H[™Y[™XÝ]™H^Ú]][Ûˆ‹ˆÊHÛˆHÜ™\ˆš[™[™ÜÈ\X\ˆ[ˆHØØ[ˆ™\ÜÛÈ›Û™H\ÈÝ™\›ÛÚÙY‹ˆ‘
HÛˆH[X™\ˆÙˆÞ\Ý[\ÈY™™XÝYžHXXÚÙˆHÛÈ[™\˜Xš[]Y\È›Ý[™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÛˆXÝX[š\ÚÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
ŠÕ”ÔÈ˜\ÙHØÛÜ™JŠˆYX\Ý\™\ÈH[™\˜Xš[]IÜÈ
Šš[š[œÚXË[[]]X›JŠˆÚ\˜XÝ\š\ÝXÜË]\ËÝÈ\™]\ÈÈ^Ú][™ÝÈ]XÚ[XYÙH]ÛÝ[Ø]\ÙH[ˆHXœÝ˜XÝˆžHÛÛœÝXÝ[Ûˆ]
ŠšÛ›ÝÜÈ›Ý[™ÊŠˆX›Ý][Ý\ˆ[š\›Û›Y[ˆ›ÝÚ]\ˆHÞ\Ý[H\È[\›™]Y˜XÚ[™ËÚ]]H][™\ËÝÈÜš]XØ[]\ÈÈH\Ú[™\ÜË›ÜˆÚ]\ˆ[ž[Û™H\È[™XYH]XÚÚ[™È]ˆ]\È™XÚ\Ù[HÚHHÝ[™\™Yš[™\È\\ˆY]šXÈÜ›Ý\È™^[Û™˜\ÙK[™
ŠÚXÚÛ™\È\[™ÈÛˆH™\œÚ[ÛŠŠŽˆ[ˆ
ŠŒËŒJŠˆ^H\™H
Š•[\Ü˜[
Šˆ
^Ú]ÛÙHX]\š]K™[YYX][Ûˆ]˜Z[Xš[]JH[™
Š‘[š\›Û›Y[[
Šˆ
™]ÙZYÚ[™ÈžHH\™Ù]	ÜÈÜš]XØ[]H[ˆ
ž[Ý\ŠˆÛÛ^
NÈ[ˆ
ŠŒ
ŠˆH[\Ü˜[Ü›Ý\Ø\È™\XÙYžH
Š•™X]
Š‹[™H
Š”Ý\[Y[[
ŠˆÜ›Ý\Ø\ÈYYˆÚ[™]™\ˆ[ÝH\ÝY]šXÈÜ›Ý\ËÝ]HH™\œÚ[Ûˆ[ÝHYX[‹ˆ\H[H[™HÛÈš[™[™ÜÈ[™\ˆHKŽÚ]ÈÛˆ[ˆ\ÛÛ]YXˆÞ\Ý[HÚ]›È]KÛÈ^ÜÝ\™H[™[\XÝ\™H™X\ˆ™\›ÎÈH‹HÚ]ÈÛˆ[ˆ^ÜÙYÜ[Ú]^[Y[]H[™[ˆ^Ú][™XYH[ˆ\ÙKÛÈZÙ[ZÛÙÙˆ^Ú]][Ûˆ\È™\žHYÚ[™H[\XÝÛˆÛÛ™šY[X[]H[™ÛÛ\X[˜ÙH\È™X[ˆHÙXÛÛ™]\Ý™Hš^Yš\œÝ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÜ[™ÈžH˜\ÙHØÛÜ™NŠŠˆ\ÈH[ÜÝÛÛ[[ÛˆZ\ÝZÙH[ˆ[™\˜Xš[]HX[˜YÙ[Y[[™›ÙXÙ\ÈÙYZÜÈÙˆÛÜšÈÜ[ÛˆÞ\Ý[\È›Ø›ÙHØ[ˆ™XXÚÚ[HH^ÜÙYÜ[Ý^\ÈÜ[‹ˆH˜\ÙHØÛÜ™H\È[ˆ[™Ü™YY[ÙˆHXÚ\Ú[Û‹›ÝHXÚ\Ú[Û‹—ˆ
ˆ
ŠÊH™\ÜÜ™\ŽŠŠˆ\È›ÝHÜš]\š[Û‹]\ÈHXœÙ[˜ÙHÙˆÛ™KˆHÛÛ	ÜÈÜ™\š[™È™Y›XÝÈÝÈ]ØØ[›™Y›ÝÝÈ]XÚš\ÚÈ[ÝHØ\œžK—ˆ
ˆ
Š‘
H[X™\ˆÙˆY™™XÝYÞ\Ý[\ÎŠŠˆX]\œË]Z\ÛXYÈÛˆ]ÈÝÛ‹ˆšYHXˆÛÜšÜÝ][ÛœÈÚ]HØ[YH›]È™[XZ[ˆHÛX[\ˆš\ÚÈ[ˆHÚ[™ÛHÜ[^ÜÚ[™È]™\žHÝ\ÝÛY\‰ÜÈ^[Y[]NˆÙZYÚ^ÜÝ\™H[™˜[YK›Ý]X[]K——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆH\Ý[˜Ý[Ûˆ™]ÙY[ˆH™YHÕ”ÔÈY]šXÈÜ›Ý\Ë™XØ]\ÙH][™\œ[œÈ[[ÜÝ]™\žHš[Üš]^˜][Ûˆ]Y\Ý[Û‹ˆ
Š˜\ÙJŠˆH[š[œÚXÈÚ\˜XÝ\š\ÝXÜË™]™\ˆÚ[™ÙH0­È
Š•[\Ü˜[
ŠˆH^Ú]X]\š]H[™]Ú]˜Z[Xš[]KÚ[™Ù\ÈÝ™\ˆ[YH0­È
Š‘[š\›Û›Y[[
ŠˆHÜš]XØ[]H[™ÛÛ^[œÚYH
ž[Ý\ŠˆÜ™Ø[š^˜][Û‹ˆ[™ÙY\HÛÈXÜ›Ûž[\È\\ˆ
ŠÕ‘JŠˆ\ÈH[š\]YH
ŠšY[YšY\ŠŠˆÙˆ[ˆ[™]šYX[[™\˜Xš[]K
ŠÕ”ÔÊŠˆ\ÈH
ŠœØÛÜš[™ÈÞ\Ý[JŠˆYX\Ý\š[™È]ÈÙ]™\š]Kˆ‹ˆKˆÌŒNˆÂˆÜXÎˆ‘]HØ[š]^˜][Ûˆ	ˆ\ÝXÝ[Ûˆ‹ˆØÙ[˜\š[Îˆ[ˆUX[˜YÙ\ˆ]\Ý]˜[X]HÛÛYHÝ][Y[ÈX›Ý]Ù\YšXØ][Ûˆ[ˆH\ÜÙ]YXÛÛ[Z\ÜÚ[Ûš[™È›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[ÈX›Ý]Ù\YšXØ][Ûˆ[ˆHXÛÛ[Z\ÜÚ[Ûš[™È›ØÙ\ÜÈ\È“ÕYOÈ‹ˆÜ[ÛœÎˆÂˆJHHXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ][Ûˆ™\šYšY\È]H\›ÜšX]HØ[š]^˜][Ûˆ[™\ÝXÝ[ÛˆY]ÙÈÙ\™H\YYÈH\ÜÙ]È‹ˆŠHXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ]\ÈÚÝ[[˜ÛYH]Z[ÈÙˆHXÛÛ[Z\ÜÚ[Ûš[™ÈY]Ù]H[™[YK[™™\ÜÛœÚX›H\œÛÛ›™[‹ˆÊHÙ\YšXØ][Ûˆ\È›Ý™XÙ\ÜØ\žHYˆH\ÝXÝ[Ûˆ›ØÙ\ÜÈØ\ÈÝ\\š\ÙYžHHY[X™\ˆÙˆÝY™ˆ‹ˆ‘
HHXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ][Ûˆ™YXÙ\ÈHš\ÚÈÙˆ[˜]]Üš^™YXØÙ\ÜÈÜˆ™XÛÝ™\žHÙˆÙ[œÚ]]™H]Hœ›ÛHHXÛÛ[Z\ÜÚ[Û™Y\ÜÙ]È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÙ\YšXØ][Ûˆ\È›Ý™XÙ\ÜØ\žHYˆH\ÝXÝ[Ûˆ›ØÙ\ÜÈØ\ÈÝ\\š\ÙYžHHY[X™\ˆÙˆÝY™ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝ
HÝ][Y[]\È“ÕYJNŠŠˆ]™[ˆYˆH\ÝXÝ[Ûˆ›ØÙ\ÜÈØ\ÈÝ\\š\ÙYžHHY[X™\ˆÙˆÝY™‹
Š˜Ù\YšXØ][Ûˆ\ÈÝ[H™XÙ\ÜØ\žHÝ\
ŠˆÈ›Ü›X[HØÝ[Y[[™ÛÛ™š\›HH\ÜÙ]	ÜÈXÛÛ[Z\ÜÚ[Ûš[™Ëˆ]›ÝšY\È[ˆ]Y]˜Z[™YXÙ\ÈYØ[š\ÚÈ[™YÈ[ˆY][Û˜[^Y\ˆÙˆ]HÙXÝ\š]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÈ
[YJNŠŠ—ˆ
ˆ
ŠJJŠˆHXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ][ÛˆÙ\ÈY™™XÝ]™[H™\šYžH]H\›ÜšX]HØ[š]^˜][Ûˆ[™\ÝXÝ[ÛˆY]ÙÈÙ\™H\YY—ˆ
ˆ
ŠŠJŠˆXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ]\ÈÚÝ[ÛÛZ[ˆÜXÚYšXÈ]Z[ÈX›Ý]HY]Ù]KÝ[YH[™\œÛÛ›™[[›Û™Y—ˆ
ˆ
Š‘
JŠˆHXÛÛ[Z\ÜÚ[Ûš[™ÈÙ\YšXØ][ÛˆÚYÛšYšXØ[H™YXÙ\ÈHš\ÚÈÙˆ[˜]]Üš^™YXØÙ\ÜÈÜˆ]H™XÛÝ™\žHœ›ÛHHXÛÛ[Z\ÜÚ[Û™Y\ÜÙ]Ëˆ‹ˆKˆÌŒŽˆÂˆÜXÎˆ˜\Ù[[™\È	ˆÛÛ™šYÝ\˜][Ûˆ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[HØ[ÈÈ[™\œÝ[™H˜[YHÙˆ[™›Ü˜Ú[™È˜\Ù[[™\È\š[™ÈH]]ÛX][Ûˆ[™Ü˜Ú\Ý˜][ÛˆÙˆÙXÝ\™HÜ\˜][ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆ[™›Ü˜Ú[™È˜\Ù[[™\È\š[™ÈH]]ÛX][Ûˆ[™Ü˜Ú\Ý˜][ÛˆÙˆÙXÝ\™HÜ\˜][ÛœÏÈ‹ˆÜ[ÛœÎˆÂˆJH˜\Ù[[™\È\ÝX›\ÚH[š]X[Øš™XÝ]™\È›ÜˆH]]ÛX][ÛˆÙˆ™X][[™È[™[™]˜][Ûˆ\Ý[™Ë™YXÚ[™È\[™[˜ÙHÛˆ[X[ˆ[œ]‹ˆŠH[™›Ü˜Ú[™È˜\Ù[[™\È[ÈÝ[™\™^™HÛÛ™šYÝ\˜][ÛœÈXÜ›ÜÜÈÞ\Ý[\Ë[˜X›[™ÈY™šXÚY[]]ÛX][Ûˆ[™™YXÚ[™ÈHš\ÚÈÙˆÙXÝ\š]H[˜ÚY[È‹ˆÊH[™›Ü˜Ú[™È˜\Ù[[™\È[ÝÜÈH[[ÜÝÛÛ\]H]]ÛX][ÛˆÙˆ[˜ÚY[™\ÜÛœÙK™YXÚ[™ÈH™YY›Üˆ\™ÙHÙXÝ\š]HX[\È‹ˆ‘
H˜\Ù[[™\È[[Z[˜]HH™YY›ÜˆÛÛ[[Ý\ÈÞ\Ý[H[Ûš]Üš[™È™XØ]\ÙH\ÙH[˜Ý[ÛœÈ\™H[]]ÛX]YÜˆÜ˜Ú\Ý˜]Y‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[™›Ü˜Ú[™È˜\Ù[[™\È[ÈÝ[™\™^™HÛÛ™šYÝ\˜][ÛœÈXÜ›ÜÜÈÞ\Ý[\Ë[˜X›[™ÈY™šXÚY[]]ÛX][Ûˆ[™™YXÚ[™ÈHš\ÚÈÙˆÙXÝ\š]H[˜ÚY[ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[™›Ü˜Ú[™È
Š˜˜\Ù[[™\ÊŠˆXZ[Z[œÈHÝ[™\™[™ÙXÝ\™HÛÛ™šYÝ\˜][ÛˆXÜ›ÜÜÈÞ\Ý[\Ë[™[Y[[›ÜˆY™šXÚY[]]ÛX][Ûˆ[™›Üˆ™YXÚ[™ÈÙXÝ\š]Hš\ÚÜÈžHZ[š[Z^š[™ÈÛÛ™šYÝ\˜][ÛˆšYˆÚ[ˆ[Þ\Ý[\È›ÛÝÈHØ[YH˜\Ù[[™K]]ÛX][ÛˆØ[ˆ™H\YYÛÛœÚ\Ý[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ˜\Ù[[™\È›ØÝ\ÈÛˆXZ[Z[š[™ÈÙXÝ\š]HÛÛœÚ\Ý[˜ÞK›ÝÜXÚYšXØ[HÛˆHXÝ]™H]]ÛX][ÛˆÙˆ™X][[™Ë—ˆ
ˆ
ŠÊJŠˆ[ÝYÚ]]ÛX][ÛˆØ[ˆÝ\Ü[˜ÚY[™\ÜÛœÙK˜\Ù[[™\ÈÈ›Ý™\XÙHH™YY›Üˆ[X[ˆ[\™[[Ûˆ[ˆ]\›Z[š[™ÈH\›ÜšX]H™\ÜÛœÙ\Ë—ˆ
ˆ
Š‘
JŠˆ˜\Ù[[™\È[[ˆ[›ÛX[H]XÝ[Û‹]ÛÛ[[Ý\È[Ûš]Üš[™È™[XZ[œÈ™XÙ\ÜØ\žHÈ[œÝ\™H]Þ\Ý[\ÈÝ^HÛÛ\X[ˆ‹ˆKˆÌŒÎˆÂˆÜXÎˆ“][KQ˜XÝÜˆ]][XØ][Ûˆ‹ˆØÙ[˜\š[Îˆ–[ÝH]™H™XÙ[H™Y[ˆ\™YžHH\™ÙHÛÙØ\™HÛÛ\[žHÜXÚX[^™Y[ˆ]™[Ü[™È[Øš[H\XØ][ÛœËˆY\ˆ™XÙZ]š[™ÈH\Ù\›˜[YH[™\ÜÝÛÜ™[ÝH]\Ý›ÝšYHHš[™Ù\œš[ØØ[ˆ›ÝYÚHš[ÛY]šXÈ™XY\ˆÈXØÙ\ÜÈHÛÜœÜ˜]H]™[ÜY[[š\›Û›Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆQH˜XÝÜˆÙ\ÈHš[ÛY]šXÈ™XY\ˆ™\™\Ù[È‹ˆÜ[ÛœÎˆÂˆJHÛÛY]Ú\™H[ÝH\™H‹ˆŠHÛÛY][™È[ÝHÛ›ÝÈ‹ˆÊHÛÛY][™È[ÝH]™H‹ˆ‘
HÛÛY][™È[ÝH\™H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÛÛY][™È[ÝH\™JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”ÛÛY][™È[ÝH\™JŠˆ˜XÝÜˆ[˜ÛY\Èš[ÛY]šXÈ]][XØ][Û‹ÝXÚ\ÈHš[™Ù\œš[ØØ[‹ˆš[ÛY]šXÈ˜XÝÜœÈ™[HÛˆ[š\]YH\ÚXØ[˜Z]È›Üˆ]][XØ][Û‹Ù™™\š[™ÈHÝ›Û™È[™ÛÛ™[šY[›Ü›HÙˆQK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÛÛY]Ú\™H[ÝH\™H\È˜\ÙYÛˆÙ[ÙÜ˜\XÈØØ][Û‹ÛÛœÚY\š[™ÈHÙ[ÙÜ˜\XÈÜÚ][Ûˆ\È[ˆY][Û˜[˜XÝÜ‹—ˆ
ˆ
ŠŠJŠˆÛÛY][™È[ÝHÛ›ÝÈÛÛ˜Ù\›œÈÛ›ÝÛYÙKX˜\ÙY˜XÝÜœËÝXÚ\ÈH\ÜÝÛÜ™›Ýš[ÛY]šXÈ]][XØ][Û‹—ˆ
ˆ
ŠÊJŠˆÛÛY][™È[ÝH]™HÛÛ˜Ù\›œÈ\ÚXØ[ÚÙ[œÈÝXÚ\ÈHÛX\Ø\™ÜˆH[Øš[H]šXÙK›ÝH\Ù\‰ÜÈš[ÛÙÚXØ[Ú\˜XÝ\š\ÝXÜËˆ‹ˆKˆÌˆÂˆÜXÎˆ˜\Ù[[™\È	ˆÛÛ™šYÝ\˜][Ûˆ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[H]\Ý[™\œÝ[™H›ÛHÙˆÐÐT[ˆÛÛ™šYÝ\˜][Û‹\ÙXÝ\š]HX[˜YÙ[Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆÐÐTÈ‹ˆÜ[ÛœÎˆÂˆJHÐÐT\ÈHÞX™\œÙXÝ\š]Hœ˜[Y]ÛÜšÈ][˜X›\È]]ÛX]Y[™\˜Xš[]H\ÜÙ\ÜÛY[[™ÛÛ\X[˜ÙHÚXÚÚ[™È‹ˆŠHÐÐT\ÈH™]ÛÜšÈ›ÝØÛÛ\ÙY›ÜˆHÙXÝ\™H˜[œÛZ\ÜÚ[ÛˆÙˆ]H™]ÙY[ˆ™[[ÝH]šXÙ\Ë[œÝ\š[™ÈÛÛ™šY[X[]H‹ˆÊHÐÐT\È[ˆ[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[H][Ûš]ÜœÈ[™[˜[^™\È™]ÛÜšÈ˜Y™šXÈ›ÜˆÝ[X[œ™XXÚ\È‹ˆ‘
HÐÐT\ÈHš\™]Ø[XÚ›ÛÙÞH][˜[^™\È™]ÛÜšÈ˜Y™šXÈ[™›ØÚÜÈÝ\ÜXÚ[Ý\ÈÛÛ›™XÝ[ÛœÈÈ›ÝXÝYØZ[œÝ™X]È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÐÐT\ÈHÞX™\œÙXÝ\š]Hœ˜[Y]ÛÜšÈ][˜X›\È]]ÛX]Y[™\˜Xš[]H\ÜÙ\ÜÛY[[™ÛÛ\X[˜ÙHÚXÚÚ[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”ÐÐT
ÙXÝ\š]HÛÛ[]]ÛX][Ûˆ›ÝØÛÛ
JŠˆ\ÈHÞX™\œÙXÝ\š]Hœ˜[Y]ÛÜšÈ]ÛÛXš[™\È˜\š[Ý\ÈÙXÝ\š]HÝ[™\™Ë[˜X›[™È]]ÛX]Y[™\˜Xš[]H\ÜÙ\ÜÛY[[™ÛÛ\X[˜ÙHÚXÚÚ[™Ëˆ]›ÝšY\ÈHÝXÝ\™Y\›ØXÚÈ]˜[X][™È[™X[˜YÚ[™È[™\˜Xš[]Y\È[™ÙXÝ\š]HÛÛ™šYÝ\˜][ÛœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆÐÐT\È›ÝH™]ÛÜšÈ›ÝØÛÛ›ÜˆHÙXÝ\™H˜[œÛZ\ÜÚ[ÛˆÙˆ]NÈ]Ù\™\ÈHY™™\™[\œÜÙH™[]YÈÙXÝ\š]H]]ÛX][Û‹—ˆ
ˆ
ŠÊJŠˆQÈÞ\Ý[\È[Ûš]Üˆ™]ÛÜšÈ˜Y™šXÈ›Üˆœ™XXÚ\ÎÈÐÐT\È›Ý[ˆQÈ]HÙXÝ\š]KX]]ÛX][Ûˆœ˜[Y]ÛÜšË—ˆ
ˆ
Š‘
JŠˆš\™]Ø[XÚ›ÛÙÚY\È[˜[^™H[™š[\ˆ™]ÛÜšÈ˜Y™šXÎÈÐÐT\È›ÝHš\™]Ø[XÚ›ÛÙÞH]Hœ˜[Y]ÛÜšÈ›ÜˆÙXÝ\š]H]]ÛX][Û‹ˆ‹ˆKˆÌNˆÂˆÜXÎˆ‘YÚ][›Ü™[œÚXÜÈ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý]\Ý[™\œÝ[™H[\Ü[˜ÙHÙˆH™\Ù\˜][Ûˆ\ÙH[ˆ[˜ÚY[™\ÜÛœÙKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ^Z[œÈH[\Ü[˜ÙHÙˆ	Ô™\Ù\˜][Û‰È[ˆ[˜ÚY[™\ÜÛœÙOÈ‹ˆÜ[ÛœÎˆÂˆJH™\Ù\˜][Ûˆ\ÈH›ØÙ\ÜÈÙˆØ\™Y[H[™[™È]šY[˜ÙHÈXZ[Z[ˆ]È[YÜš]H›Üˆ]\™H›Ü™[œÚXÈ[˜[\Ú\È‹ˆŠH™\Ù\˜][Ûˆ\ÈH›ØÙ\ÜÈÙˆØÝ[Y[[™ÈH]Z[ÈÙˆHÙXÝ\š]H[˜ÚY[]È[\XÝ[™Ý[X[™[YYY\È‹ˆÊH™\Ù\˜][Ûˆ\ÈH›ØÙ\ÜÈÙˆ™XÛÙÛš^š[™ÈÝ[X[™X]ÈÈ›ÝXÝ[ˆÜ™Ø[š^˜][Û‰ÜÈ[™œ˜\ÝXÝ\™H‹ˆ‘
H™\Ù\˜][Ûˆ\ÈH›ØÙ\ÜÈÙˆÙY\[™ÈÙXÝ\š]HÛÛ›ÛÈ\È]HÈ™]™[]\™H[˜ÚY[È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH™\Ù\˜][Ûˆ\ÈH›ØÙ\ÜÈÙˆØ\™Y[H[™[™È]šY[˜ÙHÈXZ[Z[ˆ]È[YÜš]H›Üˆ]\™H›Ü™[œÚXÈ[˜[\Ú\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”™\Ù\˜][ÛŠŠˆÛÛ˜Ù\›œÈXZ[Z[š[™ÈH[YÜš]HÙˆÝ[X[]šY[˜ÙKˆ][›Û™\ÈÛÛXÝ[™È[™›Ü›X][Ûˆ[ˆHÛÛ›ÛYØ^K™XÛÜ™[™ÈÝÈ][™›Ü›X][ÛˆØ\È[™Y[™›ÝXÝ[™È]œ›ÛH[\\š[™Ëˆ[\ÙHÝ\È\™HÜXÚX[›Üˆ[žHÝXœÙ\]Y[›Ü™[œÚXÈ[˜[\Ú\ÈÜˆYØ[›ØÙYY[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆØÝ[Y[[™ÈH]Z[ÈÙˆ[ˆ[˜ÚY[[™H›ÜÜÙY™[YYY\È\È[\Ü[›Üˆ[˜ÚY[Ë]\È›Ý\Ùˆ™\Ù\˜][Û‹—ˆ
ˆ
ŠÊJŠˆ™XÛÙÛš^š[™ÈÝ[X[™X]ÈÜˆœ™XXÚ\È\È[™[Y[[È]™[Ü[™È[ˆ[˜ÚY[\™\ÜÛœÙH[‹]™\Ù\˜][ÛˆÛÛ˜Ù\›œÈHÛÜœ™XÝX™[[™È[™ÛÛœÙ\˜][ÛˆÙˆ]šY[˜ÙK—ˆ
ˆ
Š‘
JŠˆÙY\[™ÈÙXÝ\š]HÛÛ›ÛÈ\È]H\È›Ý™\Ù\˜][Ûˆ[ˆH›Ü™[œÚXÈÙ[œÙHÙˆH\›Kˆ‹ˆKˆÌŽˆÂˆÜXÎˆ“][KQ˜XÝÜˆ]][XØ][Ûˆ‹ˆØÙ[˜\š[Îˆ”Ý[\•XÚÛÜœˆ\ÈÝ\YH[Ý›ÙÜ˜[H[ˆÚXÚ[\ÞYY\È\ÙHH\ÚXØ[]šXÙH]^HÛÛ›™XÝÈZ\ˆÛÛ\]\œËˆÚ[ˆ^H™\ÜÈH]ÛˆÛˆ\È]šXÙK^H[[YYX][HØZ[ˆXØÙ\ÜÈÈHÛÜœÜ˜]HÞ\Ý[\ÈÚ]Ý][\š[™ÈH\ÜÝÛÜ™ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ÜÝÛÜ™\ÜÈ]][XØ][ÛˆY]Ù\ÈÝ[\•XÚÛÜœˆ^\š[Y[[™ÈÚ]È‹ˆÜ[ÛœÎˆÂˆJHS‹X˜\ÙY]][XØ][Ûˆ‹ˆŠH\™Ø\™HÚÙ[‹X˜\ÙY]][XØ][Ûˆ‹ˆÊHÛÙÛš]]™H]][XØ][Ûˆ‹ˆ‘
Hš[ÛY]šXÈ]][XØ][Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\™Ø\™HÚÙ[‹X˜\ÙY]][XØ][ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š’\™Ø\™HÚÙ[‹X˜\ÙY]][XØ][ÛŠŠˆ[›Û™\ÈH\ÙHÙˆH\ÚXØ[]šXÙH
Ù[ˆHTÐˆÚÙ[ŠHÈØZ[ˆXØÙ\ÜË[[Z[˜][™ÈH™YY›Üˆ˜Y][Û˜[\ÜÝÛÜ™ËˆÚ[ˆH]šXÙH\ÈÛÛ›™XÝY[™H]Ûˆ™\ÜÙY]][XØ][ÛˆØØÝ\œÈ›ÝYÚÜÜÙ\ÜÚ[ÛˆÙˆH\ÚXØ[ÚÙ[‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆS‹X˜\ÙY]][XØ][Ûˆ\ÈÝ[H›Ü›HÙˆ
[Y\šXÊH\ÜÝÛÜ™›ÝH[H\ÜÝÛÜ™\ÜÈ\™Ø\™KX˜\ÙYY]Ù—ˆ
ˆ
ŠÊJŠˆÛÙÛš]]™H]][XØ][Ûˆ™\]Z\™\È\Ù\œÈÈ[œÝÙ\ˆÛ›ÝÛYÙKX˜\ÙY]Y\Ý[ÛœÎÈ]Ù\È›Ý[›Û™H\™Ø\™H]šXÙ\Ë—ˆ
ˆ
Š‘
JŠˆš[ÛY]šXÈ]][XØ][Ûˆ\Ù\È[š\]YHš[ÛÙÚXØ[˜Z]ÈÝXÚ\Èš[™Ù\œš[ÈÜˆ˜XÚX[™XÛÙÛš][Û‹›ÝH]šXÙHÈÛÛ›™XÝÚ]H]Û‹ˆ‹ˆKˆÌÎˆÂˆÜXÎˆ”ÙXÝ\š]H[Ûš]Üš[™È	ˆ[\[™È‹ˆØÙ[˜\š[Îˆ’ÛKHÛX[X\›ˆX[Y˜XÝ\™\‹\ÈÜ›ÝÚ[™È[™\È™XÙ[HXYH]Èš\œÝ[\›˜][Û˜[Ø[KˆÛH™X[^™\È]\ÈZ\ˆÙXˆ™\Ù[˜ÙHÜ›ÝÜË^H]\Ý™H[Ü™H]Ø\™HÙˆÙXÝ\š]H\ÜÝY\ËˆÚH\È\™Y[šHÈÛÛ™šYÝ\™HHÞ\Ý[H]Ú[ÛÛXÝ[™[˜[^™H]HÛˆÛIÜÈ™]ÛÜšÈÙXÝ\š]K]XÝ[™È[™™\ÜÛ™[™ÈÈ[žH[˜ÚY[ÈÜˆ[›ÛX[Y\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÙXÝ\š]HXÚš\]Y\ÈÚ[[šH™H™\ÜÛœÚX›H›ÜÈ‹ˆÜ[ÛœÎˆÂˆJH[Ûš]Üš[™È‹ˆŠH]Ú[™È‹ˆÊH]Y][™È‹ˆ‘
HÙÙÚ[™È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH[Ûš]Üš[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š“[Ûš]Üš[™ÊŠˆ\ÈHXÚš\]YH][›Û™\ÈHÛÛ[[Ý\ÈØœÙ\˜][Ûˆ[™YX\Ý\™[Y[ÙˆHÝ]\È[™XÝ]š]HÙˆH™]ÛÜšÈ[™Þ\Ý[\Ë\Ú[™ÈÛÛÈÝXÚ\È™]ÛÜšÈ[˜[^™\œË\™›Ü›X[˜ÙH[Ûš]ÜœÈÜˆ[\Ú[Ûˆ]XÝ[ÛˆÞ\Ý[\Ëˆ[Ûš]Üš[™ÈØ[ˆ›ÝšYH™X[][YH]H[™[\ÈÛˆH™]ÛÜšÉÜÈ\™›Ü›X[˜ÙK]˜Z[Xš[]H[™ÙXÝ\š]K[ÝÚ[™ÈHÛÛ\[žHÈ]XÝ[™™\ÜÛ™È[žH[˜ÚY[ÈÜˆ[›ÛX[Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ]Ú[™È[›Û™\È\][™È[™š^[™ÈHÛÙØ\™H[™š\›]Ø\™HÛˆH™]ÛÜšÈ[™Þ\Ý[\ÎÈ]Ù\È›ÝXÝ]™[H]XÝÜˆ™\ÜÛ™È[˜ÚY[Ë—ˆ
ˆ
ŠÊJŠˆ]Y][™È[›Û™\ÈH\š[ÙXÈ™]šY]È[™™\šYšXØ][ÛˆÙˆHÛÛ\X[˜ÙH[™Y™™XÝ]™[™\ÜÈÙˆH™]ÛÜšÈ[™Þ\Ý[\ÎÈ]\ÈÛÛ\X[˜ÙK[ÜšY[Y›Ý™X[][YH]XÝ[Û‹—ˆ
ˆ
Š‘
JŠˆÙÙÚ[™È[›Û™\È™XÛÜ™[™È[™ÝÜš[™ÈH]™[È]ØØÝ\ˆÛˆH™]ÛÜšÎÈÙÜÈØ[ˆ™H\ÙYžH[Ûš]Üš[™ÈÞ\Ý[\Ë]ÙÜÈ[Û™HÈ›Ý]XÝÜˆ™\ÜÛ™È[˜ÚY[Ëˆ‹ˆKˆMNˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•HÒQSH™\ÜÈ][\›˜[TY™\ÜÈL‹ËŒLN˜[œÙ™\œ™YˆÐˆÈ[ˆ^\›˜[ÝÜ˜YÙHÙ\šXÙH]ÎŒŒÛˆY\Ù^KˆH™]ÛÜšÈ\ÜÚYÛœÈY™\ÜÙ\È[˜[ZXØ[HÚ]ZYÚZÝ\ˆX\Ù\Ë[™H\Ý]H\È[[ÜÝ[\™[H\ÜÈ][Ý™H™]ÙY[ˆÚ]\ËˆÚ[ˆH[˜[\ÝÚXÚÜË]Y™\ÜÈ\ÈÙ^H\ÜÚYÛ™YÈHÛÜšÜÝ][ÛˆÙˆÛÛY[Û™HÚÈØ\ÈÛˆÛY^H]šYÚˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ]HÛÝ\˜ÙH\ÝX›\Ú\ÈÒPÒ]šXÙHØ\È™Z[™]TY™\ÜÈ]H[YHÙˆH˜[œÙ™\È‹ˆÜ[ÛœÎˆÂˆJHH\š[Y]\ˆš\™]Ø[ÙËÚXÚ™XÛÜ™YHÝ]›Ý[™ÛÛ›™XÝ[Ûˆ‹ˆŠHHÔÙ\™\ˆÙËÚXÚY\ÈTY™\ÜÈÈPPÈY™\ÜÈÝ™\ˆ[YHÚ[™ÝÜÈ‹ˆÊHH\ÜÙ][™[ÜžKÚXÚ\ÝÈHTY™\ÜÙ\È\ÜÚYÛ™YÈXXÚ]šXÙH‹ˆ‘
HHY]Y]HÙˆH˜[œÙ™\œ™Yš[\ËÚXÚ[™XØ]\ÈHÜšYÚ[˜][™È]šXÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHHÔÙ\™\ˆÙÊŠ‹——Šˆ
Š•H›Ø›[Kœ›ÛHš\œÝš[˜Ú\\ÎŠŠˆ[ˆ[\›˜[TY™\ÜÈ\È›Ý[ˆY[]KˆÛˆH™]ÛÜšÈÚ][˜[ZXÈ\ÜÚYÛ›Y[]\ÈH[\Ü˜\žHX™[[ÈH]šXÙH›ÜˆH\˜][ÛˆÙˆH
›X\ÙJˆ[™[ˆ[™YÈ[›Ý\‹ˆ\ÚÚ[™È
ÚÜÙH\ÈL‹ËŒLN
ˆÚ]Ý]ÜXÚYžZ[™È
ŠÚ[ŠŠˆ\ÈH]Y\Ý[ÛˆÚ]›È[œÝÙ\‹[™]\È^XÝHHZ\ÝZÙHH[˜[\Ý[ˆHØÙ[˜\š[ÈØ\ÈX›Ý]ÈXZÙK—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘ÔÙÊŠˆ™XÛÜ™Ë›Üˆ]™\žH\ÜÚYÛ›Y[HTY™\ÜËH]šXÙIÜÈ
Š“PPÊŠˆY™\ÜÈ[™HÝ\[™[™ÙˆHX\ÙKˆ]\ÈHÛ›HÛÝ\˜ÙHZ[™È[ˆY™\ÜÈÈH]šXÙH
Š›Ý™\ˆH™XÚ\ÙH[YHÚ[™ÝÊŠ‹ˆÛ˜ÙH[ÝH]™HHPPËH\ÜÙ][™[ÜžH[È[ÝHÚXÚ\Ü]\È[™ÚÈÛÈ]—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHHš\™]Ø[ÙÊŠˆÛÛ™š\›\ÈHÛÛ›™XÝ[Ûˆ\[™YÚ]Y™\ÜÙ\ËÜÈ[™›Û[YKˆ]\ÈÚ]˜Z\ÙYH[\›K]]ÝÜÈ]HY™\ÜÎˆ]Û›ÝÜÈ›Ý[™ÈÙˆH]šXÙH™Z[™]—ˆ
ˆ
ŠÊHH\ÜÙ][™[ÜžJŠˆ\È\ÜÙ[X[›ÜˆH
›™^
ˆÝ\]Ûˆ]ÈÝÛˆ]\È›Ý[›ÝYÚˆ[ˆHÔ[š\›Û›Y[]ÛÈ›È\ÝÜšXØ[Y™\ÜË]ËY]šXÙHX\[™Ë[™H\ÜÚYÛ›Y[]ÚÝÜÈÙ^H\È™XÚ\Ù[HHZ\ÛXY[™ÈÛ™K—ˆ
ˆ
Š‘
Hš[HY]Y]JŠˆ\ØÜšX™\È]]Ü‹]\È[™H›ÙXÚ[™È\XØ][ÛŽÈH]šXÙH]XÝX[H\™›Ü›YYH˜[œÙ™\ˆÙ\È›Ý\X\ˆ[ˆ]—Šˆ
Š‘^[H˜\ŠŠˆÚ[ˆH]Y\Ý[Ûˆ\ÚÜÈ[ÝHÈÙ]œ›ÛH[ˆ
Šš[\›˜[TY™\ÜÊŠˆÈH
Š™]šXÙHÜˆH\œÛÛŠŠ‹HÚZ[ˆ\È[Ø^\ÈHØ[YNˆ
‘ÔÙÈ8¡¤ˆPPÈY™\ÜÈ8¡¤ˆ\ÜÙ][™[ÜžH8¡¤ˆ\ÜÚYÛ™YJ‹ˆYˆHY™\ÜÈ\ÈX›XÈ[™^\›˜[HÚZ[ˆ\È[œÝXY
”’TKÐT’Sˆ™YÚ\ÝžH8¡¤ˆ›ÝšY\ˆ8¡¤ˆYØ[™\]Y\Ý
‹ˆ‚ˆKˆMŽˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\›ÛZ\ÙYÛÜšÜÝ][Ûˆ\ÈÛÛ[][šXØ][™ÈÝ]›Ý[™ˆ[Ý]›Ý[™˜Y™šXÈ\ÈËÛÈHÛÛ[\È[œ™XYX›K[™H\Ý[˜][ÛˆTY™\ÜÈÚ[™Ù\È]™\žH™]ÈÝ\œÈ™XØ]\ÙHH]XÚÙ\ˆ\Ù\È[ˆY™\ÜË\›Ý][™ÈÙ\šXÙKˆHX[H™YYÈÈÛÜšÈÝ]ÚXÚ[™œ˜\ÝXÝ\™HHXXÚ[™H\ÈXÝX[H[Ú[™ÈË[ˆÜ™\ˆÈ›ØÚÈ][™È[›ÜˆÝ\ˆÛÛ\›ÛZ\ÙYÜÝËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ]HÛÝ\˜ÙHÙ™™\œÈH[ÜÝÝX›H[[Y[ÛˆÚXÚÈZ[›ÝH›ØÚÈ[™H[È‹ˆÜ[ÛœÎˆÂˆJHH\XØ][ÛˆÙÜÈÙˆHÛÜœÜ˜]HÙXˆÙ\™\‹ÚXÚ™XÛÜ™™\]Y\ÝÈ‹ˆŠHHÔÙ\™\ˆÙËÚXÚ™XÛÜ™ÈY™\ÜÈ\ÜÚYÛ›Y[È‹ˆÊH[XÚÙ]Ø\\™KÚXÚÛÈHž]\ÈÙˆH[˜Üž\YÙ\ÜÚ[Ûˆ‹ˆ‘
HH”ÈÙËÚXÚ™XÛÜ™ÈHÛXZ[ˆ˜[Y\È™\ÛÛ™YžHXXÚÛY[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HH”ÈÙÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ™Y›Ü™HÜ[š[™ÈHÛÛ›™XÝ[ÛˆÈH˜[YKHÜÝ]\Ý
Šœ™\ÛÛ™JŠˆ]ˆ]™\]Y\ÝÛÙ\È›ÝYÚHÛÜœÜ˜]H™\ÛÛ™\ˆ[™\ÈÙÙÙY[™HÛXZ[ˆ˜[YH\ÈH[[Y[]Ý^\È
ŠœÝX›JŠˆÚ[HTY™\ÜÙ\È›Ý]KˆÚ]H˜[YH[ˆ[™[ÝHÈÛÈ[™ÜÈ]Û˜ÙNˆ›ØÚÈ]]H™\ÛÛ™\‹[™]Y\žHH”ÈÙÜÈÈš[™
Š™]™\žHÝ\ˆÜÝ
Šˆ]™\ÛÛ™Y]8 %]\ËH\ÝÙˆÛÛ\›ÛZ\ÙYXXÚ[™\ÈH[˜[\ÝY›ÝÛ›ÝÈÈÛÚÈ›Ü‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHÔÙÊŠˆÙ\™\ÈÈY[YžHH]šXÙH™Z[™[ˆY™\ÜËÚXÚ\™H\È[™XYHÛ›ÝÛŽˆHÛÜšÜÝ][Ûˆ\È™Y[ˆ›Ý[™—ˆ
ˆ
ŠÊHXÚÙ]Ø\\™JŠˆÛÈHž]\Ë]H˜Y™šXÈ\È[˜Üž\YˆÚ]Ý]HÙ\ÜÚ[ÛˆÙ^\ÈHÛÛ[\È[œ™XYX›Kˆ]™[XZ[œÈ\ÙY[›ÜˆHÙ\™\ˆ˜[YH[ˆHÈ
Š”Ó’JŠˆ^[œÚ[Ûˆ[™›Üˆ[Z[™ÜË]]\ÈHX]ž]ÙZYÚÛÝ\˜ÙH[™›Ý™XÙ\ÜØ\š[H[›š[™ÈÛˆ]ÙYÛY[]HšYÚ[ÛY[—ˆ
ˆ
ŠJHHÛÜœÜ˜]HÙXˆÙ\™\ˆÙÜÊŠˆ™XÛÜ™
Šš[˜›Ý[™
Šˆ™\]Y\ÝÈÈHÛÛ\[žIÜÈÙ\šXÙ\ÎˆHÜ›Û™È\™XÝ[Ûˆ[\™[H›ÜˆÝ]›Ý[™ÛÛ[][šXØ][Û‹—Šˆ
ŠH˜XÝXØ[›ÝNŠŠˆH”ÈÙÈ\ÈÛ™HÙˆHYÚ\Ý˜[YK]ËXÛÜÝ˜][ÜÈÙˆ[žHÛÝ\˜ÙKˆ]ZÙ\È[[ÜÝ›ÈÜXÙK]Ø[ˆ™HÙ\›ÜˆHÛ™È[YK[™]Ý^\È[™›Ü›X]]™HÚ[ˆ]™\ž][™È[ÙH\È[˜Üž\Yˆ]È›[™ÜÝÈ\™HX[Ø\™H]ÛÛXÝÈ[ˆ
Š’TY™\ÜÈ\™XÝJŠˆÚ]Ý]™\ÛÛš[™È[žH˜[YK[™HÛY[\Ú[™È
Š‘Ò
ŠˆÈ[ˆ^\›˜[™\ÛÛ™\‹ž\\ÜÚ[™ÈHÛÜœÜ˜]HÛ™Kˆ‚ˆKˆMÎˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ”™]šY]Ú[™ÈHÙXÝ\š]H]™[ÙÈÙˆHÚ[™ÝÜÈÙ\™\‹[ˆ[˜[\Ýš[™Ë[ˆÙ\]Y[˜ÙHÚ][ˆ›Ý\ˆZ[]\ÎˆHÛ™È[ˆÙˆŒH]™[Èœ›ÛHHÚ[™ÛH[\›˜[TY™\ÜË[ˆHŒ]™[Ú]ÙÛÛˆ\HÈ›ÜˆHÙ\šXÙHXØÛÝ[Ý˜×Ø˜XÚÝ\[ˆHÌˆ]™[›ÜˆHØ[YHXØÛÝ[[™š[˜[H[ˆLLˆ]™[ˆ‹ˆ]Y\Ý[ÛŽˆ’ÝÈÚÝ[\ÈÙ\]Y[˜ÙH™H™XY[™ÚXÚ[[Y[\ÈHSÔÕÙ\š[Ý\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHØÚY[YXZ[[˜[˜ÙNˆHÌˆÚÝÜÈHÙ\šXÙHXØÛÝ[˜[ˆH˜XÚÝ\Ú]]È[[™Yš]š[YÙ\È‹ˆŠHH˜Z[Y]XÚÎˆH[ˆÙˆŒH]™[È›Ý™\ÈH]XÚÙ\ˆ™]™\ˆX[˜YÙYÈ]][XØ]H‹ˆÊHHÝXØÙ\ÜÙ[]XÚÎˆ\ÜÝÛÜ™Ü˜^Z[™È\È›ÛÝÙYžHHš]š[YÙY™]ÛÜšÈÙÛÛ‹[™HLLˆØ^\ÈHÙXÝ\š]HÙÈØ\ÈÛX\™Y‹ˆ‘
HHÛÛ™šYÝ\˜][Ûˆ›Ø›[NˆHÙ\šXÙHXØÛÝ[	ÜÈ\ÜÝÛÜ™\È^\™Y[˜ÙHH˜Z[\™\È[™HÝXœÙ\]Y[ÙÈÛX[\‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊJŠ‹——Šˆ
Š•HÙ\]Y[˜ÙK]™[žH]™[ŠŠ—ˆ
ˆ
Š”™\X]YŒHœ›ÛHHÚ[™ÛHY™\ÜÊŠˆ8 %
Š™˜Z[Y
ŠˆÙÛÛœËˆX[žH][\È[ˆH™]ÈZ[]\Èœ›ÛHÛ™H[\›˜[ÜšYÚ[ˆ\ÈH›Ùš[HÙˆ
œ\ÜÝÛÜ™Ü˜^Z[™ÊˆÜˆœ]H›Ü˜ÙH[ˆ
Š™œ›ÛHHXXÚ[™H[™XYH[œÚYHH™]ÛÜšÊŠ‹—ˆ
ˆ
ŠŒÚ]ÙÛÛˆ\HÊŠˆ8 %H
ŠœÝXØÙ\ÜÙ[
ŠˆÙÛÛ‹[™H
Š›™]ÛÜšÊŠˆÛ™NˆÛÛYX›ÙH]][XØ]YÈ\ÈÙ\™\ˆ™[[Ý[K›Ý]]ÈÛÛœÛÛKˆ]\ÈHÚYÛ˜]\™HÙˆ]\˜[[Ý™[Y[—ˆ
ˆ
ŠÌŠŠˆ8 %HXØÛÝ[Ø\È\ÜÚYÛ™Y
ŠœÜXÚX[š]š[YÙ\ÊŠˆ]ÙÛÛŽˆ[ˆ˜XÝXÙK]Ø[YH[ˆ\È[ˆYZ[š\Ý˜]Ü‹—ˆ
ˆ
ŠŒLLŠŠˆ8 %
ŠHÙXÝ\š]HÙÈØ\ÈÛX\™Y
Š‹ˆ\È\ÈH[ÜÝÙ\š[Ý\ÈÙˆH›Ý\‹™XØ]\ÙH]\È›Ý[ˆÜ\˜][Û˜[]™[ˆ]\ÈH[X™\˜]HXÝÙˆ
Š˜[KY›Ü™[œÚXÜÊŠ‹ˆ›ÈYÚ][X]HXZ[[˜[˜ÙH›ØÙ\ÜÈ[\Y\ÈHÙXÝ\š]H]™[ÙË—Šˆ
Š•ÚHLLˆ\ÈHXÚ\Ú]™H[[Y[ŠŠˆHÝ\ˆ™YH\ØÜšX™H[ˆ[\Ú[ÛŽÈLLˆØ^\ÈH]XÚÙ\ˆ\È
Š™\Ý›ÞZ[™ÈH]šY[˜ÙJŠ‹ÚXÚYX[œÈ]œ›ÛH]Ú[ÛˆHØØ[ÙÈ\È›ÈÛ™Ù\ˆH™[XX›HÛÝ\˜ÙKˆ]\È[ÛÈH[[ÛœÝ˜][ÛˆÙˆÚHÙÜÈ]\Ý™H
Š™›ÜØ\™Y[ˆ™X[[YHÈHÙ[˜[Þ\Ý[JŠŽˆHÒQSHÛÜHÝ\š]™\ÈH[][ÛˆÙˆHØØ[Û™K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆHÌˆÛˆ]ÈÝÛˆ›Ý™\È›Ý[™ÈYÚ][X]Nˆ]Ø^\ÈHÙÛÛˆØ\Èš]š[YÙY›Ý]]Ø\È]]Üš^™Yˆ[™XZ[[˜[˜ÙHÙ\È›ÝÛX\ˆHÙXÝ\š]HÙË—ˆ
ˆ
ŠŠJŠˆ]ÝÜÈ]HŒ\È[™YÛ›Ü™\ÈHŒ]›ÛÝÜÎˆH]XÚÈ˜Z[YX[žH[Y\È[™[ˆ
ŠœÝXØÙYYY
Š‹ˆ\È\ÈHÛ\ÜÚXÈ\œ›ÜˆÙˆÛÝ[[™È˜Z[Y][\ÈÚ]Ý]ÛÚÚ[™È›ÜˆHÝXØÙ\ÜÙ[Û™K—ˆ
ˆ
Š‘
JŠˆ[ˆ^\™Y\ÜÝÛÜ™›ÙXÙ\ÈY™™\™[˜Z[\™H™\Ý[È[™^Z[œÈHÙÈÛX\š[™È[ˆ›ÈØ^HÚ]ÛÙ]™\‹—Šˆ
Š•ÛÜY[[Üš^š[™ÎŠŠˆ
ŠŒ
ŠˆÝXØÙ\ÜÈ0­È
ŠŒJŠˆ˜Z[\™H0­È
ŠÌŠŠˆÜXÚX[š]š[YÙ\È0­È
ŠÌŒ
ŠˆXØÛÝ[Ü™X]Y0­È
ŠÌŽÍÌÌŠŠˆYYÈHš]š[YÙYÜ›Ý\0­È
ŠŒLLŠŠˆÙXÝ\š]HÙÈÛX\™Yˆ[™H
Š“ÙÛÛˆ\JŠŽˆˆÛÛœÛÛKÈ™]ÛÜšËHÙ\šXÙKL™[[ÝH\ÚÝÜˆ‚ˆKˆNˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH]\Ý[[ÛœÝ˜]H[ˆÛÝ\
ŠÚXÚÜXÚYšXÈØÝ[Y[ÊŠˆY[ˆ[™Ú[™Y\š[™ÈÙ\™\ˆ\š[™ÈHÛËZÝ\ˆÚ[™ÝË›ÝY\™[H]H]H˜[œÙ™\ˆØØÝ\œ™YˆHÒQSHÛÈ™]›ÝÈ™XÛÜ™È›ÜˆHÚÛH™]ÛÜšËHš\™]Ø[ÙÜÈ[™HÙ\™\‰ÜÈ\XØ][ÛˆÙÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ]HÛÝ\˜ÙHØ]\ÙšY\È\È]šY[X\žH™\]Z\™[Y[È‹ˆÜ[ÛœÎˆÂˆJHH™]›ÝÈ™XÛÜ™ËØÝ[Y[[™È›Û[YK\˜][Ûˆ[™ÜÈÙˆHÛÛ™\œØ][Ûˆ‹ˆŠHHš\™]Ø[ÙÜË™XÛÜ™[™ÈH\›Z]YÛÛ›™XÝ[Ûˆ[™]ÈÝ]ÛÛYH‹ˆÊH[XÚÙ]Ø\\™HÛˆHÙ\™\‰ÜÈÙYÛY[
ÐT
H‹ˆ‘
HHY]Y]HÙˆHØÝ[Y[ÈÛˆHÙ\™\‹Ú]Z\ˆ\ÝXXØÙ\ÜÈ]\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[XÚÙ]Ø\\™JŠ‹——Šˆ
Š•HÜš]\š[Û‹œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆ™]ÛÜšÈÛÝ\˜Ù\È˜[[ÈÛÈ˜[Z[Y\ËˆÜÙH™XÛÜ™[™È
ŠÚ]\[™Y
Šˆ8 %ÚÈ[ÙYÈÚÛKÚ[‹›ÜˆÝÈX[žHž]\È8 %[™ÜÙH™XÛÜ™[™È
ŠÚ]Ø\ÈØZY
Š‹ˆ™]›ÝËš\™]Ø[ÙÜÈ[™ÛÛ›™XÝ[ÛˆÙÜÈ™[Û™ÈÈHš\œÝÈÛ›HXÚÙ]Ø\\™H™[Û™ÜÈÈHÙXÛÛ™—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[È\ÚÜÈ
ŠÚXÚØÝ[Y[ÊŠ‹]\ËÛÛ[ˆÛ›HÐT[ÝÜÈH^[ØYÈ™H™XÛÛœÝXÝY[™H˜[œÙ™\œ™Yš[\ÈÈ™HØ\™YÝ]ˆ]\È[ÛÈHÛ›H[œÝÙ\ˆ]Ý[™È\[ˆÛÝ\È]™XÚ\ÙH]Y\Ý[Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH™]›ÝÊŠˆØ^\ÈÐˆÙ[È]Y™\ÜÎˆ]›Ý™\ÈH˜[œÙ™\‹›Ý]ÈÛÛ[ˆ]\È^Ù[[›ÜˆHœ›ØY\ÝÜšXØ[šY]È[™›ÜˆÜÝ[™ÈH[›ÛX[KÚXÚ\ÈÚH]\ÈÙ\[›š[™È]™\ž]Ú\™K—ˆ
ˆ
ŠŠHHš\™]Ø[ÙÜÊŠˆÛÛ™š\›HHÛÛ›™XÝ[ÛˆØ\È\›Z]YžHÛXÞNˆHØ[YH[Z]\È™]›ÝËÚ]]™[ˆ\ÜÈ]Z[Ûˆ›Û[YK—ˆ
ˆ
Š‘
HØÝ[Y[Y]Y]JŠˆX^HÚÝÈHš[HØ\È
Š›Ü[™Y
Š‹]›Ý]]Ø\È˜[œÙ™\œ™Y›ÜˆÈÚ\™Kˆ]\È[ˆ[™XØ][Û‹›Ý›ÛÙˆÙˆ˜[œÙ™\‹—Šˆ
Š•ÚH[ÝHÈ›ÝØ\\™H]™\ž][™ÎŠŠˆ[ÐTXÜ›ÜÜÈ[ˆ[\™H™]ÛÜšÈ›Üˆ[ÛÈ\È[œÝ\ÝZ[˜X›H[ˆ›Û[YH[™ÛÜÝˆÝ\œ™[˜XÝXÙH\È
Š“™]›ÝÈ]™\ž]Ú\™K[Ø\\™HÛ›HÛˆÜš]XØ[ÙYÛY[ÊŠ‹ÜˆšYÙÙ\™YžH[ˆ[\8 %ÚXÚ\È™XÚ\Ù[HÚK[ˆH™X[ØÙ[˜\š[ËH]Y\Ý[Ûˆ™XÛÛY\È
™YÙH]™HØ\\™H[›š[™ÈÛˆ]ÙYÛY[Ê—Šˆ
Š•H[Z]›ÝÈ›Ü™Ù]ŠŠˆYˆHÙ\ÜÚ[ÛˆØ\È[˜Üž\YÐTÛÈHž]\È]›ÝHZ[^ˆÚ]™[XZ[œÈ\ÈY™\ÜÙ\ËÜËÚ^™\Ë[Z[™ÜÈ[™[ˆËHÙ\™\ˆ˜[YH[ˆHÓ’H^[œÚ[Û‹ˆ‚ˆKˆNNˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•Hš[˜[˜ÙH\™XÝÜˆ™XÙZ]™\È[ˆ[XZ[\\™[HÙ[žHHÚYYˆ^XÝ]]™H™\]Y\Ý[™È[ˆ\™Ù[Ú\™H˜[œÙ™\‹ˆ[ˆHXZ[ÛY[HÙ[™\ˆšY[ÛÜœ™XÝHÚÝÜÈHÑSÉÜÈ˜[YH[™ÛÜœÜ˜]HY™\ÜËˆHÙXÝ\š]HX[H]\Ý\ÝX›\ÚÚ]\ˆHY\ÜØYÙHÙ[Z[™[HÜšYÚ[˜]Yœ›ÛHHÛÜœÜ˜]H[™œ˜\ÝXÝ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[[Y[]\Ý™H^[Z[™YÈ[œÝÙ\ˆ]È‹ˆÜ[ÛœÎˆÂˆJHH[Y\ÜØYÙHXY\œË[ˆ\XÝ[\ˆH™XÙZ]™Y[™™]\›‹T]šY[È[™H]][XØ][Ûˆ™\Ý[È‹ˆŠHHÚYÛ˜]\™H›ØÚÈ]H›ÛÝÙˆHY\ÜØYÙKÛÛ\\™YÚ]HÛ™HHÑSÈ›Ü›X[H\Ù\È‹ˆÊHHÙÜÈÙˆHÑSÉÜÈXZ[›ÞÈÚXÚÈÚ]\ˆHY\ÜØYÙH\X\œÈ[ˆÙ[][\È‹ˆ‘
HHY]Y]HÙˆ[žH]XÚY[ÚXÚ[™XØ]\ÈHØÝ[Y[	ÜÈ]]Üˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHH[Y\ÜØYÙHXY\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÚ]HÛY[\Ü^\È\ÈHÙ[™\ˆ\ÈH
Š˜œ›ÛX
ŠˆšY[[™]\ÈZ[ˆ^][ž[Û™HØ[ˆÜš]H\È^HX\ÙKˆH]]™\È[ˆH
ŠšXY\œÊŠ‹ÚXÚH™XÚ\Y[Ù\È›Ý›Ü›X[HÙYN—ˆ
ˆH
Š˜™XÙZ]™Y
ŠˆšY[È\™H™XY
Š™œ›ÛHH›ÝÛH\
Šˆ[™™XÛÛœÝXÝHÚZ[ˆÙˆÙ\™\œÈ˜]™\œÙYˆHÝÙ\Ý\ÈHš\œÝ]\ËH™X[ÜšYÚ[‹ˆYˆHY\ÜØYÙH™]™\ˆ\ÜÙY›ÝYÚHÛÜœÜ˜]H[™œ˜\ÝXÝ\™K]\È›Ý\™K—ˆ
ˆH
Š˜™]\›‹T]
Šˆ\ÈH
Š™[™[ÜJŠˆÙ[™\‹HÛ™HH›ÝØÛÛXÝX[H\Ù\È[™HÛ™H
Š”ÔŠŠˆ™\šYšY\Ëˆ[ˆHÜÛÙˆ]\È[[ÜÝ[Ø^\ÈY™™\™[œ›ÛHH\Ü^YYœ›ÛX—ˆ
ˆH
Š˜]][XØ][Û‹T™\Ý[Ø
ŠˆXY\ˆØ\œšY\ÈHÝ]ÛÛY\ÈÙˆ
Š”ÔŠŠ‹
Š‘ÒSJŠˆ[™
Š‘PTÊŠ‹ˆHX\˜ÏY˜Z[Ù]\ÈHX]\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHÚYÛ˜]\™H›ØÚÊŠˆ\È^ˆ[ˆ]XÚÙ\ˆÚÈ\ÈÙY[ˆHÚ[™ÛH[XZ[œ›ÛHHÑSÈ™\›ÙXÙ\È]\™™XÝKˆ]›Ý™\È›Ý[™Ë—ˆ
ˆ
ŠÊHHÑSÉÜÈXZ[›ÞÙÜÊŠˆ\™H\ÙY[YˆH\Ý\Ú\È\È]HXØÛÝ[Ø\È
Š˜ÛÛ\›ÛZ\ÙY
Š‹]^HÈ›Ý[œÝÙ\ˆH]Y\Ý[ÛŽˆ[ˆHÜÛÙˆHY\ÜØYÙH™]™\ˆ\ÜÙ\È›ÝYÚHÑSÉÜÈXZ[›ÞÛÈ]ÈXœÙ[˜ÙHœ›ÛHÙ[][\ÈÙ\È›Ý\Ý[™ÝZ\ÚÜÛÙš[™Èœ›ÛHHÛÛ\›ÛZ\ÙHÚ]H˜XÙ\È[]Y—ˆ
ˆ
Š‘
H]XÚY[Y]Y]JŠˆÛÛ˜Ù\›œÈHØÝ[Y[›ÝHY\ÜØYÙIÜÈ]8 %[™\ÈØÙ[˜\š[Ë\XØ[Ùˆ
Š‘PÊŠ‹Ù[ˆ\È›È]XÚY[][—Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆHÛÈÙ[™\œËˆH
Š˜œ›ÛX
Šˆ\ÈHÛ™HH\Ù\ˆ
ŠœÙY\ÊŠˆ[™›Ý[™È™\šYšY\È]ÈH
Š˜™]\›‹T]
Šˆ
ÜˆPRS”“ÓX
H\ÈHÛ™HH›ÝØÛÛ
Š\Ù\ÊŠˆ[™HÛ™HÔˆÚXÚÜËˆ™XØ]\ÙHHÛÈØ[ˆ]™\™ÙK
Š‘PTÊŠˆ^\ÝÎˆ]™\]Z\™\È
Š˜[YÛ›Y[
Šˆ™]ÙY[ˆHœ›ÛXÛXZ[ˆ[™HÛ™H™\šYšYYžHÔˆÜˆÒSKˆ‚ˆKˆŒˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•H›Ø\™\ÚÜÈHÒTÓÈ›ÜˆH[ÛHšY]ÈÙˆÝÈHÙXÝ\š]H›ÙÜ˜[H\È›ÙÜ™\ÜÚ[™Îˆ\˜Ù[YÙHÙˆÞ\Ý[\È[YÛ™YÚ]H˜\Ù[[™KYX[ˆ[YHÈ™[YYX]HÜš]XØ[[™\˜Xš[]Y\Ë[™QˆYÙ[ÛÝ™\˜YÙHXÜ›ÜÜÈH\Ý]KˆHÓÐÈ[™XYH[œÈHÒQSH]Ù[™È™X[][YH›ÝYšXØ][ÛœÈÈ[˜[\ÝËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[œÝ[Y[YY]È\È™YY[™ÚH\ÈÚ]HÓÐÈ[™XYH\È›Ý[›ÝYÚÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆY][Û˜[ÒQSH[\Ú]H[ÛH™\ÚÛ›ÝYžZ[™ÈH›Ø\™Ú[ˆ[Z]È\™H^ÙYYY‹ˆŠH[ˆ]]ÛX]Y\š[ÙXÈ™\Ü™XØ]\ÙHH]Y\Ý[ÛˆÛÛ˜Ù\›œÈ[ˆYÙÜ™YØ]Y™[™[™›ÝHÚ[™ÛH]™[‹ˆÊH\™XÝ›Ø\™XØÙ\ÜÈÈHÒQSHÛÛœÛÛKÈÛÛœÝ[H˜]È]HÚ[ˆ™YYY‹ˆ‘
HHØÚY[YXÚÙ]Ø\\™HØÝ[Y[[™ÈH[Û	ÜÈ˜Y™šXÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[ˆ]]ÛX]Y\š[ÙXÈ™\Ü
Š‹——Šˆ
Š•H\Ý[˜Ý[ÛˆH]Y\Ý[Ûˆ\ÝÎŠŠˆ
˜[\
ˆ[™
œ™\Ü
ˆ[œÝÙ\ˆÛÈY™™\™[]Y\Ý[ÛœË—ˆ
ˆH
Š˜[\
Šˆ\È
Šš[[YYX]JŠ‹ÛÛ˜Ù\›œÈH
ŠœÚ[™ÛH]™[
Šˆ[™[X[™ÈH
Š™XÚ\Ú[Ûˆ›ÝÊŠ‹ˆ™XÚ\Y[ˆÚÙ]™\ˆ\ÈÛˆÚY—ˆ
ˆH
Šœ™\Ü
Šˆ\È
Šœ\š[ÙXÊŠ‹
Š˜YÙÜ™YØ]Y
Š‹[™^\ÝÈÈYX\Ý\™HH
Š™[™
Š‹ˆ™XÚ\Y[ˆÚÙ]™\ˆ[ØØ]\È™\ÛÝ\˜Ù\Ë—ˆH™YHY]šXÜÈ™\]Y\ÝY8 %ÛÛ\X[˜ÙH\˜Ù[YÙKYX[ˆ[YHÈ™[YYX]KYÙ[ÛÝ™\˜YÙH8 %\™HYÙÜ™YØ]YžHÛÛœÝXÝ[ÛŽˆ›Û™HÙˆ[H^\ÝÈ\ÈHÚ[™ÛH]™[ÛÈ›Û™HÙˆ[HØ[ˆ™H[ˆ[\—Šˆ
Š•ÚHH™\Ü]\Ý™H]]ÛX]YŠŠˆ™XØ]\ÙHH]šY[˜ÙH[ˆ]Y]ÜˆÛÚÜÈ›Üˆ\È›ÝH[X™\‹]\ÈH
ŠœÙ\šY\ÊŠŽˆH]Y™\Ü›ÙXÙYÛˆHš^YØY[˜ÙH[™\˜Ú]™Y[[ÛœÝ˜]\È]HÛÛ›Û[œÈ™YÝ[\›KˆHÚY]š[Y[ˆžH[™™Y›Ü™HHYY][™È[[ÛœÝ˜]\ÈÛ›H]ÛÛYX›ÙHš[Y[ˆHÚY]—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆH[ÛH[\ÈH›Ø\™ÛÛ™\Ù\ÈHÛÈ[œÝ[Y[ÎˆH›Ø\™\È›Ý[ˆÛ‹XØ[›ÝH[™Ù\È›ÝZÙH™X[][YHÜ\˜][Û˜[XÚ\Ú[ÛœË—ˆ
ˆ
ŠÊJŠˆÚ]š[™ÈH›Ø\™˜]ÈÒQSH]H\È[ˆ\œ›ÜˆÙˆ
Šœ™XÚ\Y[
ŠŽˆH˜[YHÙˆH™\ÜY\È[ˆHYÙÜ™YØ][Ûˆ[™[\œ™]][Û‹ÚXÚ\™H^XÝHHÛÜšÈ™Z[™È\ÚÙYÙˆHÒTÓË—ˆ
ˆ
Š‘
JŠˆXÚÙ]Ø\\™H\ÈHÛÝ\˜ÙH›ÜˆH›Ü™[œÚXÈ[˜[\Ú\ÈÙˆ[ˆ[˜ÚY[›ÝHYX\Ý\™HÙˆH›ÙÜ˜[IÜÈ›ÙÜ™\ÜË—Šˆ
Š•H]˜[ÛÜÛ›ÝÚ[™ÎŠŠˆH™\Ü›Ø›ÙH™XYÈ\ÈÛÜœÙH[ˆ›È™\Ü™XØ]\ÙH]X[Y˜XÝ\™\ÈH[\Ú[ÛˆÙˆÛÛ›Ûˆ[ˆ]]ÛX]Y™\Ü™YYÈH™XÚ\Y[Ú]H
Š˜]]Üš]HÈXÝ
Šˆ[™H
Š™\ÚÛ
ŠˆÚXÚÛ˜ÙHÜ›ÜÜÙY\›œÈ][È[ˆ[\Ú]Ý]ØZ][™È›ÜˆH™^ØY[˜ÙKˆ‚ˆKˆŒNˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ›ÝXÝÈ]È˜Y™šXÈÚ]ÛÈÙ[œÛÜœÎˆ[ˆQÈ]XÚYÈHÔSˆÜÛˆH\ÝšX][ÛˆÝÚ]Ú[™[ˆ[›[™HTÈÛˆH[\›™][šËˆY\ˆ[ˆ[\Ú[Ûˆ][\H[˜[\Ýš[™È[ˆ›ÝÙÜÈ[ˆ[žHÚ][™ÈHØ[YH^Ú]Ú]HØ[YHÛÝ\˜ÙHY™\ÜÈ[™HØ[YHÚYÛ˜]\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]ÈHÛÈÙÈ[šY\È™\ÜXÝ]™[H›Ý™OÈ‹ˆÜ[ÛœÎˆÂˆJH›Ý›Ý™HHX[XÚ[Ý\È˜Y™šXÈØ\È›ØÚÙY™XØ]\ÙH›ÝÙ[œÛÜœÈ™XÛÙÛš^™HHÚYÛ˜]\™H‹ˆŠHHQÈ[žH›Ý™\ÈH˜Y™šXÈØ\ÈØœÙ\™YÈHTÈ[žKYˆH™XÛÜ™YXÝ[Ûˆ\ÈH›ØÚË]]Ø\ÈÝÜY‹ˆÊHHQÈ[žHØ\œšY\È[Ü™H]šY[X\žHÙZYÚ™XØ]\ÙHH\ÜÚ]™HÙ[œÛÜˆÙ\È›Ý[\ˆH˜Y™šXÈ]™XÛÜ™È‹ˆ‘
H›Ý›Ý™HÛ›H]H˜Y™šXÈØ\ÈØœÙ\™Yˆ™Z]\ˆÙ[œÛÜˆ™XÛÜ™ÈHÝ]ÛÛYHÙˆHXÝ[Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠJŠ‹——Šˆ
Š•Hš[˜Ú\Kœ›ÛHš\œÝš[˜Ú\\ÎŠŠˆHY™™\™[˜ÙH™]ÙY[ˆHÛÈÙ[œÛÜœÈY\È›Ý[ˆÚ]^H
Šœ™XÛÙÛš^™JŠˆ8 %HÚYÛ˜]\™H\ÈHØ[YH8 %][ˆÚ]^H
Š˜Ø[ˆÊŠ‹žHš\YHÙˆÚ\™H^H\™H]XÚY—ˆ
ˆH
Š’QÊŠˆÛˆHÔSˆÜ™XÙZ]™\ÈH
Š˜ÛÜJŠˆÙˆH˜Y™šXËˆ]Ø[ˆÛ›HØœÙ\™H[™™\ÜˆHÜšYÚ[˜[XÚÙ]\È[™XYH[Ý™YÛ‹ˆ]ÈÙÈ[žHYX[œÈ
\È\ÜÙY›ÝYÚ\™J‹[™›Ý[™È[Ü™K—ˆ
ˆH
Šš[›[™HTÊŠˆÚ]È
Šš[ˆH]
ŠˆÙˆH˜Y™šXÎˆ]™\žHXÚÙ]Ü›ÜÜÙ\È]ÛÈ]Ø[ˆ›ÜÛ™Kˆ][ˆTÈÛÈØ[ˆ™HÛÛ™šYÝ\™Y[ˆ]XÝ[Û‹[Û›H[ÙK[™[ˆ]™Z]™\È^XÝHZÙH[ˆQË—Šˆ
Š•ÚHH[œÝÙ\ˆÛÛZ[œÈ[ˆ
šYŠŽŠŠˆ]\ÈHÚ[H^[H\ÝËˆÛ›ÝÚ[™ÈHÙ[œÛÜˆ\È[ˆTÈ\È›Ý[›ÝYÚÈ[ÝH]\Ý™XYH
Š˜XÝ[ÛˆšY[
ŠˆÙˆHÙÈ[žH8 %›ØÚÙY›ÜY™\Ù]ÛˆÛ™H[™[\]XÝY\›Z]YÛˆHÝ\‹ˆ[ˆTÈÙÙÚ[™È
˜[\
ˆØ]È][™]]›ÝYÚ^XÝH\ÈHQÈYˆ[™™\œš[™ÈH›ØÚÈœ›ÛHH›ÙXÝ˜[YH˜]\ˆ[ˆœ›ÛHHÙÈ\ÈHZ\ÝZÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]ÛÛ™\Ù\È™XÛÙÛš][ÛˆÚ]XÝ[Û‹ˆ™XÛÙÛš^š[™ÈHÚYÛ˜]\™H\ÈÚ]›ÝÎÈXÝ[™È\[™ÈÛˆXÙ[Y[[™ÛÛ™šYÝ\˜][Û‹—ˆ
ˆ
ŠÊJŠˆ]šY[X\žHÙZYÚÙ\È›Ý›ÛÝÈœ›ÛHHÙ[œÛÜˆ™Z[™È\ÜÚ]™KˆYˆ[ž][™ÈHÜÜÚ]HÙˆÚ]HÜ[Ûˆ[\Y\ÈÛÎˆHÔSˆÜ[™\ˆØY
Š™›ÜÈXÚÙ]ÊŠˆÚ]Ý]Ø^Z[™ÈÛËÚXÚ\ÈÚH›Ü™[œÚXÈÛÛXÝ[Ûˆ™Y™\œÈH
Š•T
Š‹ÚXÚÜÙ\È›Ý[™Ë—ˆ
ˆ
Š‘
JŠˆ]\È˜[ÙH›ÜˆHTËÚXÚ™XÛÜ™ÈHÝ]ÛÛYHÙˆHXÝ[ÛˆZÙ[ŽÈ]\ÈYHÛ›HÙˆHQË—Šˆ
Š•HÜ\˜][Û˜[ÛÛœÙ\]Y[˜ÙHÛÜ™[Y[X™\š[™ÎŠŠˆ™Z[™È[›[™K[ˆTÈ\ÈHÝ[X[
ŠœÚ[Ùˆ˜Z[\™JŠ‹[™H˜[ÙHÜÚ]]™Hœ›ÛH]™XÛÛY\È[ˆ[[YYX]HÝ]YÙKˆ]\ÈÚHX[žHÜ™Ø[š^˜][ÛœÈÙY\™]ÈÚYÛ˜]\™\È[ˆ]XÝ[Û‹[Û›H[ÙH›Üˆ[ˆØœÙ\˜][Ûˆ\š[Ù[™›Û[ÝH[HÈ›ØÚÚ[™ÈÛ›HY\ˆÛÛ™š\›Z[™È^HÈ›ÝØ]ÚYÚ][X]H˜Y™šXËˆ‚ˆKˆŒŽˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][ÛˆÙY\ÈÙÜÈÛÛ[HÛˆHÞ\Ý[\È]Ù[™\˜]H[KÚ]ÙYZÛH›Ý][Û‹ˆ\š[™È[ˆ[™\ÝYØ][Ûˆ[ÈHÛÛ\›ÛZ\ÙH][™È˜XÚÈÙ[H^\ËHX[H\ØÛÝ™\œÈ]ÛˆHY™™XÝYÙ\™\ˆHÙÜÈ›ÜˆH™[]˜[\š[Ù›ÈÛ™Ù\ˆ^\Ý[™]ÛˆHÛ™HÞ\Ý[HÚ\™H^HYÝ\š]™YH]XÚÙ\ˆY[]Y[Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ˜XÝXÙHÛÝ[]™H›ÝXÝYH]šY[˜ÙH[ˆ“ÕØ^\È]Ø\ÈÜÝÈ‹ˆÜ[ÛœÎˆÂˆJH[˜Ü™X\Ú[™ÈHœ™\]Y[˜ÞHÙˆHÙ\™\œÉÈÜ\˜][™Ë\Þ\Ý[H˜XÚÝ\È‹ˆŠH›ÜØ\™[™ÈÙÜÈ[ˆ™X[[YHÈHÙ[˜[^™Y\[™[Û›HÞ\Ý[HÚ]YXØ]Y™][[Ûˆ‹ˆÊH[˜X›[™È[XÚÙ]Ø\\™HÛˆHÙ\™\‰ÜÈ™]ÛÜšÈÙYÛY[‹ˆ‘
H\Z[™Èš[H[YÜš]H[Ûš]Üš[™ÈÈHÙ\™\‰ÜÈÙÈš[\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™X[][YH›ÜØ\™[™ÈÈHÙ[˜[^™Y\[™[Û›HÞ\Ý[JŠ‹——Šˆ
Š•H]šY[˜ÙHØ\ÈÜÝ[ˆÛÈ\Ý[˜ÝØ^\ÊŠ‹[™H]Y\Ý[Ûˆ\ÚÜÈ›ÜˆHYX\Ý\™HÛÝ™\š[™È›Ý—ˆKˆ
Š”›Ý][ÛˆÛÈÚÜ
Šˆ8 %HÙÜÈ›ÜˆH™[]˜[\š[ÙY[™XYH™Y[ˆÝ™\Üš][ˆ™Y›Ü™H[ž[Û™HÙ[ÛÚÚ[™ËˆHÛÛ\›ÛZ\ÙH\È\ØÛÝ™\™YÙYZÜÈÜˆ[ÛÈ]\‹[™ÙYZÛH›Ý][Ûˆ\ÈHÝX\˜[YHÙˆš[™[™È›Ý[™Ë—ˆ‹ˆ
Š‘[][ÛˆžHH]XÚÙ\ŠŠˆ8 %ÚÙ]™\ˆØZ[œÈYZ[š\Ý˜]]™Hš]š[YÙ\ÈÛˆHÞ\Ý[H[ÛÈÛÛ›ÛÈHÙÜÈ
Š›Ùˆ]Þ\Ý[JŠ‹ˆHÙÈ[Û›HÛˆHXXÚ[™H]›ÙXÙ\È]\ËžHYš[š][Û‹]HY\˜ÞHÙˆÚÙ]™\ˆ\ÈZÙ[ˆ]XXÚ[™K—Šˆ
Š•ÚHÙ[˜[›ÜØ\™[™ÈÛÛ™\È›ÝŠŠˆHÛÜH\œš]™\È
Šš[ˆ™X[[YJŠˆÛˆHÙ\\˜]HÞ\Ý[KÛÈ]^\ÝÈ™Y›Ü™HØØ[›Ý][Ûˆ™[[Ý™\È]È[™]]™\ÈÛˆHXXÚ[™HÚ\™HH]XÚÙ\ˆÙ\È›Ý™XÙ\ÜØ\š[HÛš]š[YÙ\Ëˆ
Š\[™[Û›JŠˆ[ÙH
ÜˆÓÔ“JHÛÜÙ\ÈHÛÜˆÚÙ]™\ˆ\ÈXØÙ\ÜÈÈHÙ[˜[Þ\Ý[HØ[ˆÜš]H™]È]™[È]Ø[››Ý™]Üš]HÜˆ[]H\ÝÛ™\Ëˆ
Š‘YXØ]Y™][[ÛŠŠˆ]È[ÝHÛ[ÛÈÜˆYX\œÈÙ[˜[HÚ[HÙY\[™ÈÚÜ›Ý][ÛœÈØØ[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÜ\˜][™Ë\Þ\Ý[H˜XÚÝ\ÊŠˆX^H[˜ÚY[[HÛÛZ[ˆÛÛYHÙÈš[\Ë]^H\™H›Ý[ˆ]šY[˜ÙK\™][[ÛˆÝ˜]YÞNˆÜ›Û™Èœ™\]Y[˜ÞKÜ›Û™ÈÜ˜[[\š]K[™H˜XÚÝ\ÙˆHÛÛ\›ÛZ\ÙYXXÚ[™HÛÛZ[œÈ[™XYK][\\™YÙÜË—ˆ
ˆ
ŠÊHXÚÙ]Ø\\™JŠˆØÝ[Y[È™]ÛÜšÈ˜Y™šXË›ÝHXÝ[ÛœÈ\™›Ü›YY
Š›ÛŠŠˆHÞ\Ý[Nˆ]][XØ][ÛœËš]š[YÙH\ÙH[™ÛÛ[X[™È^XÝ]YÈ›Ý\X\‹—ˆ
ˆ
Š‘
H’SHÛˆHÙÈš[\ÊŠˆÛÝ[›YÈH[\\š[™È8 %[™]\È\ÙY[8 %]
Š˜Y\ŠŠˆ]\È\[™Y[™Ú]Ý]™]\›š[™ÈHÜÝÛÛ[ˆX›Ý™H[]Ù\È›Ý[™ÈX›Ý]Hš\œÝÙˆHÛÈ›Ø›[\Ë›Ý][Û‹—Šˆ
Š‘›ÜˆH^[NŠŠˆÚ[ˆHØÙ[˜\š[ÈY[[ÛœÈ
Š›ÙÈ[][ÛˆžHH]XÚÙ\ŠŠ‹H[œÝÙ\ˆ\È™X\›H[Ø^\È›ÜØ\™[™ÈÈ[ˆ[[]]X›HÙ[˜[\˜Ú]™Kˆ]\È[ÛÈÚHÚ[™ÝÜÈ]™[
ŠŒLLŠŠˆ
ÙXÝ\š]HÙÈÛX\™Y
HÛ›HÛÜšÜÈ\È[ˆ[™XØ]ÜˆYˆÛÛYX›ÙH™XÙZ]™\È]
Š™[Ù]Ú\™JŠ‹ˆ‚ˆKˆŒÎˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÙXˆÙ\™\ˆ\È™Y[ˆÛÛ\›ÛZ\ÙYˆHX[HÛ›ÝÜÈÚ[ˆH]XÚÈ\[™Y]›Ý›ÝYÚÚXÚ›]Ëˆ]\ÈHÙXˆÙ\™\ˆXØÙ\ÜÈÙÜËH™\ÜÈÙˆH[™\˜Xš[]HØØ[œÈ[ˆ[ÛHYØZ[œÝHØ[YHÜÝ[™HÚ[™ÙH™XÛÜ™ÙˆHÞ\Ý[\ÈX[Kˆ‹ˆ]Y\Ý[ÛŽˆ’ÝÈÚÝ[H[™\˜Xš[]HØØ[ˆ™\Ü™H\ÙY[ˆ\È[™\ÝYØ][ÛÈ‹ˆÜ[ÛœÎˆÂˆJH]\È›Ý\ÙY[ˆ]\ØÜšX™\ÈHÝ]Hš[ÜˆÈH[˜ÚY[[™™XÛÜ™È›È]™[È‹ˆŠHÈ˜\œ›ÝÈH\Ý\Ù\ÈX›Ý]H™XÝÜ‹ÛÛ\\š[™ÈÛ›ÝÛˆ[œ™[YYX]Y›]ÜÈYØZ[œÝÚ]HXØÙ\ÜÈÙÜÈÚÝÈ‹ˆÊHÈ[[ÛœÝ˜]H]HÜ™Ø[š^˜][ÛˆYY]]ÈÛÛ\X[˜ÙHØ›YØ][ÛœÈ‹ˆ‘
HÈ\ÝX›\ÚÚXÚ]HØ\ÈXÝX[HZÙ[ˆœ›ÛHHÙ\™\ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÈ˜\œ›ÝÈH\Ý\Ù\ÈX›Ý]H™XÝÜŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØØ[ˆ™\Ü\È›ÝHÙÈ8 %]™XÛÜ™È›È]™[È8 %]]\È›Û™][\ÜÈH
Š™]HÛÝ\˜ÙH›ÜˆH[™\ÝYØ][ÛŠŠ‹[™]Ù\™\ÈÛ™H™XÚ\ÙH\œÜÙNˆ][È[ÝH
ŠÚXÚÛÜœÈÙ\™HÜ[ŠŠ‹ˆÛÛ\\š[™ÈHÛ›ÝÛ‹[œ™[YYX]Y[™\˜Xš[]Y\ÈÛˆ]ÜÝYØZ[œÝÚ]HXØÙ\ÜÈÙÜÈÚÝÈ[ˆH]XÚÈÚ[™ÝÈÚš[šÜÈHÙ]Ùˆ\Ý\Ù\È˜[X]XØ[KˆYˆHØØ[›™\ˆY™Y[ˆ›YÙÚ[™È[ˆ[˜]][XØ]Y
\ØY
ˆ›]È›ÜˆÛÈ[ÛÈ[™HÙÜÈÚÝÈHÔÕÈ][™Ú[ÚÜH™Y›Ü™HHÛÛ\›ÛZ\ÙKH™XÝÜˆ\È›ÈÛ™Ù\ˆH\Ý\Ú\Ë—Šˆ
Š•H˜[YHÙˆH\ÝÜšXØ[Ù\šY\ÎŠŠˆÙ]™\˜[™\ÜÈÛÜÙHÙÙ]\ˆ[ˆ[YH][ÝH\ÝX›\Ú
ŠÚ[ŠŠˆH›]È\X\™Y[™
ŠšÝÈÛ™ÊŠˆ]Ý^YYÜ[ˆ8 %[™›Ü›X][Ûˆ]X]\œÈ›Ý›Üˆ[™\œÝ[™[™È^ÜÝ\™H[™Ù[‹›Üˆ›ÝYšXØ][ÛˆØ›YØ][ÛœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]ÛÛ™\Ù\È
œ™XÛÜ™È›È]™[ÊˆÚ]
š\È›Ý\ÙY[
‹ˆ]\ÈYH]]\ØÜšX™\ÈHš[ÜˆÝ]Nˆ]\È™XÚ\Ù[HHÝ]HH]XÚÙ\ˆ›Ý[™—ˆ
ˆ
ŠÊJŠˆ\È\ÈHYÚ][X]H\ÙHÙˆØØ[ˆ™\ÜË]][œÝÙ\œÈH
Š˜ÛÛ\X[˜ÙJŠˆ]Y\Ý[Û‹›ÝH[™\ÝYØ][Ûˆ][™ˆZ[™H]˜[ˆ\Ú[™ÈÛÛ\X[˜ÙH]šY[˜ÙH\ÈÝYÚ]Ù\™H›ÛÝXØ]\ÙH[˜[\Ú\È\ÈHÝ[™\™Ø^HÈÛÜÙH[ˆ[˜ÚY[Ú]Ý]]š[™È[™\œÝÛÙ]—ˆ
ˆ
Š‘
JŠˆHØØ[ˆ™\ÜÛ›ÝÜÈ›Ý[™ÈX›Ý]H]HÛˆHÙ\™\ˆÜˆX›Ý]Ú]Y]ˆ][œÝÙ\ˆÛÛY\Èœ›ÛHHXØÙ\ÜÈÙÜËH™]ÛÜšÈ›ÝÜÈ[™›ÜˆÛÛ[[žHXÚÙ]Ø\\™K—Šˆ
Š•ÛÜ™[Y[X™\š[™È›ÜˆØš™XÝ]™HŽNŠŠˆHÛÝ\˜Ù\È›Üˆ[ˆ[™\ÝYØ][Ûˆ\™H›ÝÛ›HÙÜËˆ^H[ÛÈ[˜ÛYH
Š[™\˜Xš[]HØØ[ˆ™\ÜÊŠ‹
Š˜]]ÛX]Y™\ÜÊŠ‹
Š™\Ú›Ø\™ÊŠˆ[™
Š›Y]Y]JŠˆ8 %XXÚ[œÝÙ\œÈHY™™\™[]Y\Ý[Û‹[™H™XÛÛœÝXÝ[ÛˆÛÛY\Èœ›ÛHÜ›ÜÜÚ[™È[K›Ýœ›ÛH[žHÛ™HÙˆ[Kˆ‚ˆKˆˆÂˆÜXÎˆ“ÙÈ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•HÓÐÈX[˜YÙ\ˆØ[È[˜[\ÝÈÈÙYKH[ÛY[^HÛÛYHÛˆÚYHÝ™\˜[Ý]HÙˆHÙ[\Žˆ[X™\ˆÙˆÜ[ˆ[\ÈžHÙ]™\š]KÞ\Ý[\È]]™HÝÜYÙ[™[™ÈÙÜË[™]Y]YHØY\ˆ[˜[\ÝˆH]H\È[[™XYH[ˆHÒQSKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[œÝ[Y[YY]È\È™YYÈ‹ˆÜ[ÛœÎˆÂˆJHHØ]™YÒQSH]Y\žH]XXÚ[˜[\Ý[œÈÚ[ˆ^H™YY]‹ˆŠHHÙYZÛH]]ÛX]Y™\Ü[XZ[YÈHÚÛHX[H‹ˆÊH[ˆ[\›ÜˆXXÚÙˆH™YHY]šXÜËÙ[]HÝ\Ùˆ]™\žHÚY‹ˆ‘
HH\Ú›Ø\™™\Ù[[™ÈÝ\œ™[Ý]Hš\ÝX[H[™ÛÛ[[Ý\ÛH\]Y‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HH\Ú›Ø\™
Š‹——Šˆ
Š•H™YH›Ü›\È[ˆÚXÚHÒQSH™]\›œÈÚ]]Û›ÝÜÊŠ‹[™H]Y\Ý[ÛˆXXÚ[œÝÙ\œÎ—ˆ
ˆ
Š[\
Šˆ8 %
š\ÈÛÛY][™È\[™Y]™YYÈHXÚ\Ú[Ûˆ›ÝÏÊˆ[[YYX]KÛˆHÚ[™ÛH]™[Ú]H™XÚ\Y[ÚÈ]\ÝXÝ—ˆ
ˆ
Š‘\Ú›Ø\™
Šˆ8 %
Ú]Ù\ÈHÚ]X][ÛˆÛÚÈZÙHšYÚ›ÝÏÊˆš\ÝX[ÛÛ[[Ý\ÛH\]YYX[È™H
Š›ÛÚÙY]
Šˆ[™ÈXZÙHH]šX][ÛˆØš[Ý\È]HÛ[˜ÙK—ˆ
ˆ
Š”™\Ü
Šˆ8 %
šÝÈ\™HÙHÚ[™ÈÝ™\ˆ[YOÊˆ\š[ÙXËYÙÜ™YØ]YÚ]H™XÚ\Y[ÚÈ]\ÝXÚYHÚ\™HÈ[™\Ý—ˆHØÙ[˜\š[È\ÚÜÈ›ÜˆHÛ˜\ÚÝÙˆÝ\œ™[Ý]HÈ™HÙY[ˆ]HÝ\ÙˆHÚYˆ]\ÈHYš[š][ÛˆÙˆH\Ú›Ø\™—Šˆ
ŠH]Z[ÛÜ›ÝXÚ[™ÎŠŠˆ[[Û™ÈH™\]Y\ÝYY]šXÜÈ\È
œÞ\Ý[\È]]™HÝÜYÙ[™[™ÈÙÜÊ‹ˆ]\ÈÛ™HÙˆH[ÜÝ[\Ü[[™[ÜÝ™YÛXÝYˆHÛÝ\˜ÙH]˜[ÈÚ[[˜Z\Ù\È›È[\8 %]›ÙXÙ\È
ŠœÚ[[˜ÙJŠ‹ÚXÚ\È[™\Ý[™ÝZ\ÚX›Hœ›ÛHØ[KˆÛ›HH\Ú›Ø\™]^XÚ]HÚÝÜÈÛÝ\˜ÙHÛÝ™\˜YÙHXZÙ\È[ˆXœÙ[˜ÙHš\ÚX›K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHÙYZÛH™\Ü
Šˆ\ÈHÜ›Û™ÈØY[˜ÙNˆÝ\œ™[Ý]HÚ[™Ù\ÈÝ\ˆžHÝ\‹[™žHH[™ÙˆHÙYZÈHÛ˜\ÚÝ\ÈÙˆ›È\ÙHÈÚÙ]™\ˆÛÛY\ÈÛˆÚYÛˆ[Û™^H[Ü›š[™Ë—ˆ
ˆ
ŠÊH™YH[\È]ÚYÝ\
ŠˆZ\Ý\ÙHH[œÝ[Y[ˆ[ˆ[\ÚYÛ˜[È[ˆ
Š™]™[
Š‹›ÝHÝ]K[™\Ú[™È]\ÈH\š[ÙXÈ™[Z[™\ˆ™YYÈH
˜[\˜]YÝYJˆ]›[™È[˜[\ÝÈÈH™X[Û™\Ë—ˆ
ˆ
ŠJHHØ]™Y]Y\žJŠˆ›ÙXÙ\ÈHØ[YH]K]Û›HÚ[ˆÛÛY[Û™H™[Y[X™\œÈÈ[ˆ]ˆHÚ[ÙˆH\Ú›Ø\™\È]H[™›Ü›X][Ûˆ\È
Š˜[™XYH\™JŠ‹Ú]Ý][ž[Û™H]š[™ÈÈXÚYHÈÛÈÛÚÚ[™È›Üˆ]ˆ‚ˆKˆK‚ˆNˆÂˆMÍŽˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[Îˆ‘\š[™ÈHÙ[XÝ[ÛˆÙˆHX[˜YÙYÙXÝ\š]H›ÝšY\ˆ][Y\™Ù\È]H^\›˜[ÛÛœÝ[[[™ØYÙYÈ˜YH]˜[X][ÛˆÜš]\šXHX\›œÈHÛÛ[Z\ÜÚ[ÛˆÛˆØ[\ÈÙˆÛ™HÙˆHÛÛ\][™È›ÙXÝËˆ\™H\È›È]šY[˜ÙH]HÜš]\šXHÙ\™HÚÙ]ÙY[™H›ÙXÝ[ˆ]Y\Ý[Ûˆ\È\ÈXÚšXØ[HÛÝ[™\ÈHÝ\œËˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHÛÜœ™XÝÛÝ\œÙHÙˆXÝ[ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ[YHH[™\ˆ[™ÚXÚÈY\Ø\™ÈÚ]\ˆHÛÛ[Z\ÜÚ[Ûˆ[™›Y[˜ÙYHÝ]ÛÛYH‹ˆŠH]™HHÛÛ™›XÝ›Ü›X[HXÛ\™Y[™]™HH]˜[X][Ûˆ™YÛ™HžHÛÛY[Û™HÚ]Ý]][\™\Ý‹ˆÊH\ÚÈHÛÛœÝ[[ÈØZ]™HHÛÛ[Z\ÜÚ[Û‹ÙY\[™ÈHÜš]\šXH[™XYH˜YY‹ˆ‘
H^ÛYHœ›ÛHH[™\ˆH›ÙXÝÛˆÚXÚHÛÛœÝ[[X\›œÈHÛÛ[Z\ÜÚ[Ûˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH]™HHÛÛ™›XÝ›Ü›X[HXÛ\™Y[™]™HH]˜[X][Ûˆ™YÛ™HžHÛÛY[Û™HÚ]Ý]][\™\Ý
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÛÛ™›XÝÙˆ[\™\Ý
Š™Ù\È›Ý]™HÈ]™H›ÙXÙYZ\ØÛÛ™XÝ
ŠˆÈ™HH›Ø›[KˆYˆH™X\ÛÛ˜X›H\™\HØ[ˆÝXH[\\X[]HÙˆHXÚ\Ú[Û‹H[XYÙHÈHÜ™YXš[]HÙˆH›ØÙ\ÜÈ\È[™XYHØØÝ\œ™YˆH[™[™ÈØš™XÝ]™HKŒÈ™\ØÜšX™\È\È[Ø^\ÈHØ[YNˆ
Š˜Y˜[˜ÙHXÛ\˜][ÛŠŠ‹™XÛÜ™[™È[ˆHÛÛ™›XÝÈ™YÚ\Ý\‹
Šœ™XÝ\Ø[
ŠˆÙˆÚÙ]™\ˆ\ÈÛÛ™›XÝY[™Ù\\˜][Ûˆ™]ÙY[ˆÚÈ]˜[X]\È[™ÚÈÛÈH[\™\Ý—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ\È\ÈH˜\H^[HÙ™™\œÈ[ÜÝÙ[‹ˆÚXÚÚ[™ÈH[™›Y[˜ÙHY\Ø\™ÈÚYÈH\™[ˆÛÈ›Ýš[™È\›KÚ\™X\ÈHš\ÚÈÈ™HÛÝ™\›™Y\È
Šš[\Z\™Y[\\X[]H[ˆ]Ù[ŠŠŽˆÜš]\šXH˜YYžHÛÛY[Û™HÚ]Hš[˜[˜ÚX[[\™\Ý\™H›ÝY™[œÚX›H™Y›Ü™H[ˆ]Y]Ü‹Y™™XÝ›Ý™[ˆÜˆ›Ý—ˆ
ˆ
ŠÊJŠˆØZ]š[™ÈHÛÛ[Z\ÜÚ[Ûˆ™[[Ý™\ÈH[\™\Ý
Š™œ›ÛH›ÝÈÛŠŠ‹]HÜš]\šXHÙ\™HÜš][ˆÚ[HH[\™\Ý^\ÝYˆHØÝ[Y[Z[Y]]ÈÜšYÚ[ˆÝ^\ÈZ[Y—ˆ
ˆ
Š‘
JŠˆ^ÛY[™ÈH›ÙXÝ[˜[\Ù\ÈHÝ\Y\ˆ]\È›Ý]˜][[™X]™\ÈH™X[Y™XÝ[ÝXÚYˆHÙ[XÝ[Ûˆ[ˆžHÛÛY[Û™HÚÈÛÝ[›Ý[ˆ]ˆ[ÝHš^H›ØÙ\ÜË›ÝH\ÝÙˆÛÛ\]]ÜœË——Šˆ
Š“›ÝÈ™HÛÛ™\ÙYÚ]]ÈÚ[ˆ]Y\Ý[ÛŽŠŠˆY[YžZ[™ÈÚXÚ
Š˜Ø]YÛÜžJŠˆÙˆÛÛ™›XÝ\È\È8 %\™H]ÛÝ[™HH
Š™š[˜[˜ÚX[
Šˆ[\™\Ý8 %\ÈHY™™\™[^\˜Ú\ÙHœ›ÛHXÚY[™È
ŠÚ]ÈÊŠ‹ˆ\È]Y\Ý[Ûˆ\ÚÜÈHÙXÛÛ™—Šˆ
Š‘^[H˜\ŠŠˆHÛÜœ™XÝ[œÝÙ\ˆ\È[[ÜÝ[Ø^\È
Š™XÛ\™H[™™XÝ\ÙJŠ‹™]™\ˆ	ØÚXÚÈÚ]\ˆ]XYHHY™™\™[˜ÙIËˆ‹ˆKˆMÍÎˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ][ˆ[™\ÝžH˜YH˜Z\ˆ[ˆ[\ÞYYH™XÙZ]™\ÈÛˆZ\ˆÛÜœÜ˜]HÛ™HHY\ÜØYÙH]\X\œÈÈÛÛYHœ›ÛHZ\ˆX[˜YÙ\‹\ÚÚ[™È›Üˆ\™Ù[\›Ý˜[ÙˆH^[Y[ˆH^\È]\ÚX›KØ\œšY\È›È[šÜÈÜˆ]XÚY[È[™ÚÝÜÈ›ÈÝ\ÜXÚ[Ý\ÈXÚšXØ[[™XØ]ÜŽÈHÛ›H[™ÈÝ]ÙˆXÙH\È]HX[˜YÙ\ˆ\È™]™\ˆ\ÙY]Ú[›™[ˆH[\ÞYYHÜ›ÝÜÈÝ\ÜXÚ[Ý\ËØ[È˜XÚÈH[X™\ˆ[™XYH[ˆZ\ˆÛÛXÝË[™Hœ˜]YÝÜÈ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[[Y[ÙˆH]Ø\™[™\ÜÈ›ÙÜ˜[[YH›ÙXÙY\È™Z]š[Ý\È‹ˆÜ[ÛœÎˆÂˆJH™XÛÙÛš\Ú[™È\Ú[™È[XZ[È›ÝYÚXÚšXØ[[™XØ]ÜœÈ‹ˆŠHÚ]X][Û˜[]Ø\™[™\ÜÈ‹ˆÊHÔÑPË]\ËÛÛ›Û[™ÈH[™›Ü›X][ÛˆHÜ™Ø[š\Ø][Ûˆ]ÈÛ\‹ˆ‘
H™XÛÙÛš\Ú[™È[›ÛX[Ý\È™Z]š[Ý\ˆ[ˆÛÛXYÝY\È
[œÚY\ˆ™X]
H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÚ]X][Û˜[]Ø\™[™\ÜÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÚ]X][Û˜[]Ø\™[™\ÜÈ\ÈHXš[]HÈ™XÛÙÛš\ÙH]
ŠHÛÛ^[ÝH\™H[ˆÚ[™Ù\ÈH]™[Ùˆš\ÚÊŠ‹[™ÈY\Ý[Ý\ˆ™Z]š[Ý\ˆXØÛÜ™[™ÛKˆ\™H\È›Ý[™ÈXÚšXØ[H[›ÛX[Ý\ÈÈÜÝ\™NˆÚ]XZÙ\ÈH[\ÞYYHÝ\ÜXÚ[Ý\È\ÈHÛÛ^8 %H˜YH˜Z\‹]\ËH[ÛY[Ú[ˆÛ™H\È[ÜÝ^ÜÙY[™[ÜÝ\Ý˜XÝY8 %ÛÛXš[™YÚ][ˆ\™Ù[™\]Y\Ý\œš]š[™È›ÝYÚ[ˆ
Š[\ÝX[Ú[›™[
Š‹ˆ]\ÈÚ]ÛÝ™\œÈHØ\Ù\È›ÈÛÝ\œÙH[XÚ\]Y—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ\Ú[™È™XÛÙÛš][Ûˆ™\ÝÈÛˆ
Š›ØœÙ\˜X›H[™XØ]ÜœÊŠŽˆ›Ü™ÙYÙ[™\‹X\ÚÙY[šÜË[™^XÝY]XÚY[ËÛXZ[ˆ\œ›ÜœËˆHØÙ[˜\š[È[\È[HÝ]^XÚ]K[™]\È^XÝHÚ]XZÙ\È]Ú[™Ùˆ˜Z[š[™È[œÝY™šXÚY[\™K—ˆ
ˆ
ŠÊJŠˆ
Š“ÔÑPÊŠˆÛÛ˜Ù\›œÈH[™›Ü›X][Ûˆ[ˆÜ™Ø[š\Ø][Ûˆ]ÈÛ\[™[ˆ]XÚÙ\ˆØ[ˆ™X\ÜÙ[X›H8 %Ü™ÈÚ\Ë›ØˆY™\ËÝÙÜ˜\ÈÙˆ˜YÙ\ËˆYˆ[ž][™È]^Z[œÈÝÈH]XÚÙ\ˆÛ™]ÈHX[˜YÙ\‰ÜÈ˜[YH[™›ÛK›ÝÚHH[\ÞYYHÝÜY—ˆ
ˆ
Š‘
JŠˆ™XÛÙÛš\Ú[™È[›ÛX[Ý\È™Z]š[Ý\ˆÛÛ˜Ù\›œÈÚ]
Šš[œÚY\œÊŠˆË[™\ÈHÛÛ›ÛYØZ[œÝH[œÚY\ˆ™X]ˆ\™H\È›È[œÚY\ˆ\™Nˆ\™H\È[ˆÝ]ÚY\ˆ[\\œÛÛ˜][™ÈÛ™K——Šˆ
Š‘^[H˜\ŠŠˆ\Ý[™ÝZ\ÚÚ]H][[Ûˆ\È\™XÝY]ˆ
Š”Ú]X][Û˜[]Ø\™[™\ÜÊŠˆ8¡¤ˆH
œÚ]X][ÛŠˆ[ÝH\™H[ˆ0­È
Š“ÔÑPÊŠˆ8¡¤ˆH
š[™›Ü›X][ÛŠˆYZ[™È\›Ý[™0­È
Š˜[›ÛX[Ý\È™Z]š[Ý\ŠŠˆ8¡¤ˆÚ]
œ[ÜHÊ‹ˆ‹ˆKˆNˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ•ÛÈÛÝ™\››Y[Ü™Ø[š^˜][ÛœÈ[[™ÈÝ\H™[[Z[˜\žHÛÛX›Ü˜][ÛˆÈ^Ú[™ÙHÙX]\ˆ[[Y]žH]KˆH\Y\È\™H›Ý™XYHÈÚYÛˆHš[˜[˜ÚX[ÜˆYØ[Hš[™[™ÈÛÛ˜XÝ]Ú\ÚÈ›Ü›X[HØÝ[Y[HÛÛ[[ÛˆØš™XÝ]™\ËÙ[™\˜[›Û\È[™œ›ØY[[[ÛœÈ™Y›Ü™H›ØÙYY[™ÈÚ]HXÚšXØ[™X\ÚXš[]HÝYY\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈØÝ[Y[È\ÈHSÔÕ\›ÜšX]HÈÚYÛˆ[ˆ\È™[[Z[˜\žH\ÙOÈ‹ˆÜ[ÛœÎˆÂˆJHSÕH
Y[[Ü˜[™[HÙˆ[™\œÝ[™[™ÊH‹ˆŠHÓH
Ù\šXÙH]™[YÜ™Y[Y[
H‹ˆÊH”H
\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
H‹ˆ‘
HÓÕÈ
Ý][Y[ÙˆÛÜšÊH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHSÕH
Y[[Ü˜[™[HÙˆ[™\œÝ[™[™ÊJŠ‹——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆHSÕH\ÈH›Ü›X[]›ÝYØ[Hš[™[™ÈØÝ[Y[]Ý][™\ÈHÙ[™\˜[[[[ÛœË›Û\È[™ÛÛÜ\˜][Ûˆ™]ÙY[ˆÛÈÜˆ[Ü™H\Y\Ëˆ]\ÈHÝ[™\™ÛÛ[ˆHX\›H\Ù\ÈÙˆH™[][ÛœÚ\È™XÛÜ™HYÜ™Y[Y[ÛˆÙ[™\˜[š[˜Ú\\È™Y›Ü™H[™\Ý[™È[YH[™YÙ][ˆÝš[™Ù[YØ[YÜ™Y[Y[Ë—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆÛÈÝ]HÙX]\ˆYÙ[˜ÚY\ÈØ[È^Ú[™ÙH˜Y\ˆ]Kˆ^HÚYÛˆ[ˆSÕHÈØ^Nˆ	ÕÙHÚ[ÛÛX›Ü˜]HžHÚ\š[™ÈÙ[™\šXÈÙX]\ˆ]H›ÜˆÝYH\œÜÙ\ÉËÚ]Ý]\ÝX›\Ú[™Èš[˜[˜ÚX[[˜[Y\ÈÜˆšYÚYYØ[Ø›YØ][ÛœË—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠŠHÓJŠˆYš[™\ÈÜXÚYšXÈ\™›Ü›X[˜ÙH[™]˜Z[Xš[]HY]šXÜÈÚ][˜[Y\Ë›ÝÝZ]X›H›Üˆ[™›Ü›X[™[[Z[˜\žH[™\œÝ[™[™ÜË—ˆ
ˆ
ŠÊH”JŠˆ™YÝ[]\ÈHÛÛ[Y\˜ÚX[[™š[˜[˜ÚX[\ÜXÝÈ
›Ùš]È[™ÜÜÙ\ÊHÙˆH\Ú[™\ÜÈ\™\œÚ\›ÝÝZ]X›H™]ÙY[ˆÛÝ™\››Y[›ÙY\ÈÛÛÜ\˜][™ÈÚ]Ý]›Ùš][Ý]™\Ë—ˆ
ˆ
Š‘
HÓÕÊŠˆYš[™\È[ˆ]Z[HÜ\˜][Û˜[XY[™\ËÜXÚYšXÈ[]™\˜X›\È[™Z[\ÝÛ™\ÈÙˆ[ˆ^XÝ]]™HXÚšXØ[›Ú™XÝˆ‹ˆKˆŽˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ[ˆY\›ÜÜXÙHÛÛ\[žH\È[™\™ÛÚ[™ÈHÛÛ\]H™[Ü™Ø[š^˜][ÛˆÙˆ]È\ÚXØ[[™ÙÚXØ[ÙXÝ\š]H›ÙÜ˜[KˆÈ[œÝ\™H]HÞX™\œÙXÝ\š]Hš[Üš]Y\ÈÈ›ÝÛÛ™›XÝÚ]H™YYÈÙˆ[™\ÝšX[›ÙXÝ[ÛˆÜˆHYØ[\\Y[X[˜YÙ[Y[XÚY\ÈÈ\ÝX›\ÚH›Ü›X[›ÙHÈÛÛÜ™[˜]H\ÙHXÝ]š]Y\È[™\›Ý™HH[\›YYX]HÜ\˜][Û˜[YÙ]Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È›ÙY\È\ÈHÛ™HÈ\ÝX›\Ú[ˆÜ™\ˆÈ[YÛˆÙXÝ\š]HÚ]\Ú[™\ÜÈ™YYÏÈ‹ˆÜ[ÛœÎˆÂˆJH[˜ÚY[™\ÜÛœÙHX[H
T•
H‹ˆŠH›Ø\™Ùˆ\™XÝÜœÈ
›Ñ
H‹ˆÊHÙXÝ\š]HÝY\š[™ÈÛÛ[Z]YH‹ˆ‘
HÚ[™ÙHYš\ÛÜžH›Ø\™
ÐPŠH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÙXÝ\š]HÝY\š[™ÈÛÛ[Z]YJŠ‹——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆHÝY\š[™ÈÛÛ[Z]YH\ÈHÛÛ[Z]YHÛÛ\ÜÙYÙˆXY\œÈœ›ÛHY™™\™[ÛÜœÜ˜]H\™X\È
YØ[‹Uš[˜[˜ÙKÜ\˜][ÛœËÙXÝ\š]JHÚÜÙHXZ[ˆ\œÜÙH\ÈÈ[œÝ\™H]HÙXÝ\š]HÝ˜]YÞHÝ\ÜÈHÙ[™\˜[\Ú[™\ÜÈØš™XÝ]™\È[™˜XÚ[]]\ÈÛÛX›Ü˜][Ûˆ™]ÙY[ˆ\\Y[Ë˜[[˜Ú[™Èš\ÚÜÈ[™Ü\˜][Û˜[ÜÜ[š]Y\Ë—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆHÒTÓÈØ[ÈÈ\˜Ú\ÙHH™]È[\ÞYYK]˜XÚÚ[™ÈÞ\Ý[Kˆ[ˆHÙXÝ\š]HÝY\š[™ÈÛÛ[Z]YKHˆX[˜YÙ\ˆYÚYÚÈš]˜XÞHÛÛ˜Ù\›œÈ[™Hš[˜[˜ÚX[\™XÝÜˆ]˜[X]\ÈHYÙ][œÝ\š[™ÈH˜[[˜ÙY\›Ý˜[™Y›Ü™HH\˜Ú\ÙK—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠJHT•
Šˆ\È[ˆÜ\˜][Û˜[Ü›Ý\›ØÝ\ÙYÛˆHX[˜YÙ[Y[[™ÛÛZ[›Y[ÙˆXÝ]™H[˜ÚY[Ë›ÝÛˆÝ˜]YÚXÈ[›š[™È[™\Ú[™\ÜÈ[YÛ›Y[—ˆ
ˆ
ŠŠH›Ø\™Ùˆ\™XÝÜœÊŠˆYš[™\ÈH™\žHYÚ[]™[XXÜ›ÜØÛÜXÈÝ˜]YÚXÈØš™XÝ]™\È[™HÙ[™\˜[š\ÚÈ\]]K]Ù\È›Ý[™HHXÝXØ[Ü›ÜÜËY[˜Ý[Û˜[ÛÛÜ™[˜][ÛˆÙˆH[\›YYX]HÙXÝ\š]HYÙ]Ë—ˆ
ˆ
Š‘
HÐPŠŠˆ\ÈH›ÙH›ØÝ\ÙY^Û\Ú]™[HÛˆH™]šY]Ë[›š[™È[™\›Ý˜[Ùˆ[™]šYX[[™œ˜\ÝXÝ\™HÚ[™Ù\È
Ú[™ÙHX[˜YÙ[Y[
Kˆ‹ˆKˆÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ•HXY\œÚ\ÙˆHXÚÛÛ\[žH\›Ý™\ÈH™]È[\›˜[ÛXÞH]™\]Z\™\È[[\ÞYY\ÈÈ[˜X›H][KQ˜XÝÜˆ]][XØ][Ûˆ
QJHÛˆZ\ˆXØÛÝ[Ëˆ™YHÙYZÜÈY\ˆH\›Ý˜[HÙ[š[Üˆ™]ÛÜšÈ[™Ú[™Y\ˆ[\Ü˜\š[H\ØX›\ÈQHÛˆ\ÈXØÛÝ[È˜XÚ[]]HHZYÜ˜][Û‹]›Ü™Ù]ÈÈ™KY[˜X›H]ˆHXØÛÝ[\Èœ™XXÚY›ÝYÚÜ™Y[X[ÝY™š[™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚØ]YÛÜžHÙ\ÈHš[Û][ÛˆÜˆÚÜÛÛZ[™È[[ÛœÝ˜]Y[ˆ\ÈØÙ[˜\š[È˜[[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHXÚÈÙˆYHØ\™HžHH[\ÞYYH‹ˆŠHXÚÈÙˆYH[YÙ[˜ÙHžHHÛÛ\[žH‹ˆÊHÛÜœ™XÝ^\˜Ú\ÙHÙˆHÛÛ\[œØ][™ÈÛÛ›Û‹ˆ‘
H›Ü›X[š[Û][ÛˆÙˆ[ˆ^\›˜[™YÝ[]ÜžH\™XÝ]™H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHXÚÈÙˆYHØ\™HžHH[\ÞYYJŠ‹——Šˆ
Š•H[™[Y[[Y™™\™[˜ÙH™]ÙY[ˆYH[YÙ[˜ÙH[™YHØ\™H
HÙ^HÛÛ˜Ù\ÙˆÙXÝ\š]JÈÖLMÌHØš™XÝ]™HKŒJNŠŠ—ˆ
ˆ
Š‘YH[YÙ[˜ÙH
[ˆÈ™\ÙX\˜ÚÈ[šÊNŠŠˆ]\ÈH™[[Z[˜\žH[™\ÝYØ]]™K[˜[]XØ[[™Ý˜]YÚXÈXÝ]š]Kˆ]ÛÛœÚ\ÝÈÙˆÚ[™È™\ÙX\˜Ú[™\œÝ[™[™ÈH™X]Ë˜Y[™ÈHÛXÚY\Ë[˜[^š[™ÈH\™\œÈ[™\ÚYÛš[™ÈH\›ÜšX]HÛÛ›ÛËˆ
‘YH[YÙ[˜ÙH[œÝÙ\œÈH]Y\Ý[ÛŽˆ‘YÙHÈÝ\ˆÛY]ÛÜšÈÈ[™\œÝ[™Ú]\È™YYY×ˆ
K™ËˆH›Ø\™\ÚYÛœÈ[™\›Ý™\ÈHQHÛXÞJKŠ—ˆ
ˆ
Š‘YHØ\™H
XÝÈ[\[Y[ÈÊNŠŠˆ]\ÈHÛÛ˜Ü™]KÜ\˜][Û˜[XÝÙˆ\Z[™ÈH[›™YÛÛ›ÛÈZ[H[™[YÙ[HÈ›ÝXÝHÜ™Ø[š^˜][Û‹ˆ]™\™\Ù[ÈH™\ÜÛœÚX›K^XÝ]]™HÛÛ™XÝžH[ˆ[™]šYX[ÜˆHÛÛ\[žKˆ
‘YHØ\™H[œÝÙ\œÈH]Y\Ý[ÛŽˆ\™HÙHXÝX[HXÝ[™ÈÚ]YHØ\™H^HY\ˆ^O×ˆ
K™ËˆH[\ÞYYH\Y\ÈQKÙ\È›Ý\ØX›H]›ÜˆÛÛ™[šY[˜ÙJKŠ——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆHÛÛ\[žHXY\œÚ\ÛÜœ™XÝH^\˜Ú\ÙY
Š‘YH[YÙ[˜ÙJŠˆžHÛÛ™XÝ[™È[˜[\Ú\È[™›Ü›X[H\›Ýš[™ÈHQHÛXÞKˆHÙ[š[Üˆ[\ÞYYKžH[\Ü˜\š[H\ØX›[™È][™›Ü™Ù][™ÈÈ™KY[˜X›H]›ÜˆÜ\˜][Û˜[ÛÛ™[šY[˜ÙK[[ÛœÝ˜]YšY[™YÛYÙ[˜ÙK˜Z[[™ÈÈ^\˜Ú\ÙH
Š‘YHØ\™JŠˆ
XÚÈÙˆY[›ÝXÝ]™H™Z]š[Üˆ[ˆZ[HXÝ[ÛŠK——Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠ—ˆ
ˆ
’ÛYHØÙ[˜\š[ÎŠˆÚ[™ÈX\šÙ]™\ÙX\˜ÚÈ^HH™\ÝÛX\ØÚËÚXÚÚ[™ÈÛ›[™H™]šY]ÜÈ[™˜Y[™ÈH˜[Z[H[ˆÛˆÝÈÈ\ÙH]\È
Š‘YH[YÙ[˜ÙJŠ‹ˆXÝX[H™[Y[X™\š[™ÈÈØÚÈHÛÜˆ]™\žH[YH[ÝHX]™HHÝ\ÙH\È
Š‘YHØ\™JŠ‹—ˆ
ˆ
ÛÛ\[žHØÙ[˜\š[ÎŠˆÜ™X][™ÈHÛÜœÜ˜]Hš\™]Ø[ÛXÞH[™ÛÛ™šYÝ\š[™ÈHÙÜÈ\È
Š‘YH[YÙ[˜ÙJŠ‹ˆXÝ]™[H^[Z[š[™ÈÜÙHÙÜÈ]™\žH[Ü›š[™ÈÈš[™[\Ú[ÛœÈ\È
Š‘YHØ\™JŠ‹——Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠŠHHÛÛ\[žH[[ÛœÝ˜]YYH[YÙ[˜ÙJŠˆžH\ÝX›\Ú[™Ë\›Ýš[™È[™ÛÛ[][šXØ][™ÈHQHÛXÞH
]YH™\ÙX\˜ÚÙ]H[\È[™›ÝšYYHYX[œÊKˆHÜ\˜][Û˜[˜][Y\ÈÚ]H[\ÞYYK—ˆ
ˆ
ŠÊH\ØX›[™ÈQJŠˆÚ]Ý][žH[\›˜]]™H›ÝXÝ]™HYX\Ý\™HÙ\È›Ý[ˆ[žHØ^H™\™\Ù[H	ÐÛÛ\[œØ][™ÈÛÛ›Û	Ë—ˆ
ˆ
Š‘
HHØÙ[˜\š[È\ØÜšX™\ÊŠˆHš[Û][ÛˆÙˆ[ˆ[\›˜[ÛÜœÜ˜]HÛXÞK›ÝÙˆH\™XÝHÚ]Y^\›˜[ÛÝ™\››Y[Üˆ™YÝ[]ÜžH]Ëˆ‹ˆKˆˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•H›Ø\™ÙˆH™]Z[˜[šÈÝ]\È]HÜ™Ø[š^˜][Ûˆ\ÈH
Š›ÝÈÝ˜]YÚXÈ\]]JŠˆ›Üˆ\Ü\[ÛˆÙˆÜš]XØ[Ù\šXÙ\Ë™XØ]\ÙHH›ÛÛ™ÙYÝ]YÙHÛÝ[Ø]\ÙH[Û\˜X›H™\]][Û˜[[XYÙKˆ›Üˆ[Øš[H˜[šÚ[™È\ÈÝ[˜ÙH\È[ˆ˜[œÛ]Y[ÈHÜXÚYšXËYX\Ý\˜X›H[Z]ˆ][ÜÝ
ŠŒÌZ[]\ÊŠˆÙˆ[˜]˜Z[Xš[]H\ˆ[˜ÚY[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚZ\ˆÙˆÛÛ˜Ù\È\ØÜšX™\Ë™\ÜXÝ]™[KHÝ™\˜[Ý[˜ÙHXÛ\™YžHH›Ø\™[™HYX\Ý\˜X›H™\ÚÛÙ]›Üˆ[Øš[H˜[šÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ\]]HHÝ™\˜[Ý˜]YÚXÈÝ[˜ÙNÈš\ÚÈÛ\˜[˜ÙHHÌ[Z[]HÜ\˜][Û˜[[Z]‹ˆŠHš\ÚÈÛ\˜[˜ÙHHÝ™\˜[Ý˜]YÚXÈÝ[˜ÙNÈš\ÚÈ\]]HHÌ[Z[]HÜ\˜][Û˜[[Z]‹ˆÊHÙ^Hš\ÚÈ[™XØ]Üˆ
Ô’JHHÝ˜]YÚXÈÝ[˜ÙNÈš\ÚÈZ]YØ][ÛˆHÌ[Z[]H[Z]‹ˆ‘
Hš\ÚÈ]›ÚY[˜ÙHHÝ˜]YÚXÈÝ[˜ÙNÈš\ÚÈXØÙ\[˜ÙHHÌ[Z[]H[Z]‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHš\ÚÈ\]]HHÝ™\˜[Ý˜]YÚXÈÝ[˜ÙNÈš\ÚÈÛ\˜[˜ÙHHÌ[Z[]HÜ\˜][Û˜[[Z]
Š‹——Šˆ
Š•H\Ý[˜Ý[Û‹œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆHÛÈ\›\ÈÚ]Ûˆ
Š™Y™™\™[[™\ÊŠ‹[™]\ÈÚ]]Y\Ý[ÛœÈ\Ýˆ
Š”š\ÚÈ\]]JŠˆ\ÈH
Š›Ý™\˜[Ý[˜ÙJŠŽˆÝÈ]XÚš\ÚÈHÜ™Ø[š^˜][Ûˆ[[™ÈÈZÙHÛˆ[ˆ\œÝZ[™È]ÈØš™XÝ]™\Ëˆ]\È^™\ÜÙY]X[]]]™[H[™Ý˜]YÚXØ[HHHÝÈ\]]H›Üˆ\Ü\[ÛˆÙˆÜš]XØ[Ù\šXÙ\ÈH[™]\ÈÙ]žHHÜÙˆHÜ™Ø[š^˜][Û‹ˆ
Š”š\ÚÈÛ\˜[˜ÙJŠˆ˜[œÛ]\È]Ý[˜ÙH[È
Š˜XØÙ\X›KYX\Ý\˜X›H[Z]ÊŠˆ›ÜˆHÜXÚYšXÈØš™XÝ]™HÜˆØÙ[˜\š[Îˆ][ÜÝÌZ[]\È\ˆ[˜ÚY[Ûˆ[Øš[H˜[šÚ[™Ë—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[È™\Ù[È^XÝH]Ù\]Y[˜ÙKˆš\œÝH›Ø\™	ÜÈÙ[™\˜[Ý][Y[ÚXÚ\È\]]NÈ[ˆ]È˜[œÛ][Ûˆ[ÈH[Y\šXØ[™\ÚÛ›ÜˆÛ™H˜[YYÙ\šXÙKÚXÚ\ÈÛ\˜[˜ÙKˆH˜XÝXØ[[NˆYˆ[ÝH™XYH
Š›[X™\ŠŠˆ]XÚYÈHÙ\šXÙK[ÝH\™H[[ÜÝ[Ø^\È[ˆÛ\˜[˜ÙNÈYˆ[ÝH™XYH
ŠœÝ[˜ÙJŠˆXÛ\™YžHHXY\œÚ\[ÝH\™H[ˆ\]]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ[™\ÈHÛÎˆ]\ÜÚYÛœÈH[Y\šXØ[[Z]È\]]H[™HÙ[™\˜[Ý[˜ÙHÈÛ\˜[˜ÙKH™]™\œÙHÙˆÝÈHÛÈ[™\È™[]K—ˆ
ˆ
ŠÊHÔ’H[™Z]YØ][ÛŽŠŠˆH
Š’Ù^Hš\ÚÈ[™XØ]ÜŠŠˆ\ÈH
Š›[Ûš]Üš[™ÈY]šXÊŠˆÚYÛ˜[[™È]H™\ÚÛ\È™Z[™È\›ØXÚYÈ]\È›ÝHÝ˜]YÚXÈÝ[˜ÙKˆ[™
Š›Z]YØ][ÛŠŠˆ\ÈHØ^HÙˆ
Š™X][™ÊŠˆš\ÚÈ
Y[™ÈÛÛ›ÛÊK›ÝH[Z]È™\ÜXÝ—ˆ
ˆ
Š‘
H]›ÚY[˜ÙH[™XØÙ\[˜ÙNŠŠˆ\ÙHÛÈ\™H
Š™X]Y[Ý˜]YÚY\ÊŠ‹›Ý\ØÜš\[ÛœÈÙˆÝÈ]XÚš\ÚÈÛ™H\ÈÚ[[™ÈÈ™X\‹ˆ
Š]›ÚY[˜ÙJŠˆÛÝ[YX[ˆ›Ü[™È[Øš[H˜[šÚ[™È[ÙÙ]\‹[™[ˆHØÙ[˜\š[ÈHÙ\šXÙHÝ^\È]™K——Šˆ
Š‘^[H˜\ŠŠˆÙY\
ŠšÝÈ]XÚš\ÚÈ\ÈXØÙ\Y
Šˆ\\œ›ÛH
ŠšÝÈ]\È™X]Y
Š‹ˆ
’ÝÈ]XÚ
Žˆ
Š˜\]]JŠˆ
Ù[™\˜[]X[]]]™KÙ]]HÜ
HOˆ
ŠÛ\˜[˜ÙJŠˆ
YX\Ý\˜X›H™\ÚÛ\ˆØš™XÝ]™JHOˆ
Šœš\ÚÈ™\ÚÛ
Šˆ
H˜[YH]ÚXÚXÝ[Ûˆ\ÈšYÙÙ\™Y
Kˆ
’ÝÊŽˆ
Š›Z]YØ]K˜[œÙ™\‹XØÙ\]›ÚY
Š‹ˆH
Š’Ô’JŠˆ™[Û™ÜÈÈ™Z]\ˆÜ›Ý\ˆ]\ÈH[œÝ[Y[[[™È[ÝHÝÈÛÜÙHÈH™\ÚÛ[ÝH\™Kˆ‹ˆKˆNˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[ÎˆHÜÜ][ÛÛ\[žH\ÈÝ]ÛÝ\˜Ú[™ÈHXZ[[˜[˜ÙHÙˆ]È]X˜\ÙHÙ\™\œÈÈ[ˆ^\›˜[Ý\Y\‹ˆHÙ[™\˜[ÛÛ˜XÝ
TÐJH\È[™XYHÚYÛ™Y]HÙXÝ\š]HX[˜YÙ\ˆ™\]Y\ÝÈÛÈY][Û˜[]Z[ØÝ[Y[ÎˆÛ™HÈYš[™HH™XÚ\ÙHÜ\˜][Û˜[\˜[Y]\œÈÝXÚ\ÈÙ\™\ˆ]˜Z[Xš[]H
NKŽNIH\[YJH[™[\™[[Ûˆ[Y\ÈÚ][ˆHÝ\‹[™[›Ý\ˆÈ\ØÜšX™HHÜXÚYšXÈ\ÝÙˆ\ÚXØ[Ù\™\œËH\ÚËY\ÜÜØ[Y]ÙÈ[™H^[Y[Z[\ÝÛ™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚZ\ˆÙˆØÝ[Y[È^XÝHY™\ÜÙ\È\ÙHÛÈ\Ý[˜Ý™YYÏÈ‹ˆÜ[ÛœÎˆÂˆJHÓH›ÜˆH]˜Z[Xš[]HY]šXÜÎÈÓÕÈ›ÜˆH\ÚËY\ÜÜØ[[]™\˜X›\È‹ˆŠHÓÕÈ›ÜˆH]˜Z[Xš[]HY]šXÜÎÈÓH›ÜˆH\ÚËY\ÜÜØ[[]™\˜X›\È‹ˆÊH‘H›ÜˆH]˜Z[Xš[]HY]šXÜÎÈ”H›ÜˆH\ÚÈ\ÜÜØ[‹ˆ‘
HSÕH›ÜˆH]˜Z[Xš[]HY]šXÜÎÈÓH›ÜˆH\ÚÈ\ÜÜØ[‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÓH›ÜˆH]˜Z[Xš[]HY]šXÜÎÈÓÕÈ›ÜˆH\ÚËY\ÜÜØ[[]™\˜X›\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆHÓH
Ù\šXÙH]™[YÜ™Y[Y[
HX[ÈÚ]HYX\Ý\˜X›H\™›Ü›X[˜ÙHY]šXÜÈÙˆH›ÝšYYÙ\šXÙH
K™Ëˆ\[YKØ[\™\ÜÛœÙH[Y\ÊKˆHÓÕÈ
Ý][Y[ÙˆÛÜšÊK[œÝXYÜXÚYšY\ÈH^XÝ]]™HÜ\˜][Û˜[\ÜXÝÈ[™HÛÛ˜Ü™]H[]™\˜X›\È
Z[\ÝÛ™\Ë\ÝÙˆ]šXÙ\Ë™XÚ\ÙH\ÚÜÈÝXÚ\ÈHÙXÝ\™H\ÜÜØ[Ùˆ\™Ø\™JK—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆ[ˆHÛÝYÙ\šXÙKHÓHØ^\Îˆ	ÕHÛÝYÚ[™HXØÙ\ÜÚX›HNKŽIHÙˆH[YIËˆHÓÕÈØ^\Îˆ	ÕHXÚšXÚX[ˆÚ[ÛÛ™šYÝ\™HÙ\™\œÈH[™ˆžHØÝØ™\ˆMH[™›ÝšYHHš[˜[™\Ü	Ë—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠŠJŠˆ™]™\œÙ\ÈHÛÈÙ^HØÝ[Y[Ë\ÜÚYÛš[™È]˜Z[Xš[]HÈHÓÕÈ[™Ü\˜][Û˜[\ÚÜÈÈHÓK—ˆ
ˆ
ŠÊJŠˆ[›ÙXÙ\ÈH‘H
ÛÛ™šY[X[]JH[™H”H
ÛÛ[Y\˜ÚX[\™\œÚ\
K\œ™[]˜[›Üˆ™YÝ[][™ÈHXÚšXØ[Y]šXÜÈ[™H\ÝÙˆÜ\˜][Û˜[ÛÜšÈ\ØÜšX™Y—ˆ
ˆ
Š‘
JŠˆ›ÜÜÙ\ÈHSÕH
H›Û‹Xš[™[™È™[[Z[˜\žHY[[Ü˜[™[JK[œÝZ]X›H›ÜˆYš[š[™ÈÝš[™Ù[ÛÛ˜XÝX[\[YHY]šXÜËˆ‹ˆKˆŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÜœÜ˜]H]XÙ[\ˆÝÛœÈHÛ\Ý\ˆÙˆÙXˆÙ\™\œÈ\ÙY›ÜˆKXÛÛ[Y\˜ÙH˜[œØXÝ[ÛœÈ\Ý[X]Y]H˜[YHÙˆ	L
\ÜÙ]˜[YJKˆ[˜[\ÝÈ\Ý[X]H][ˆH]™[ÙˆH›ÛÙ[ˆH˜\Ù[Y[Ú\™HH]XÙ[\ˆ\ÈØØ]YHÙ\™\œÈÛÝ[ÝY™™\ˆÝXÝ\˜[[™\™Ø\™H[XYÙH\]X[ÈÌ	H
^ÜÝ\™H˜XÝÜŠKˆ\ÝÜšXØ[Û[X]H]H[™XØ]\È]HÙ\š[Ý\È›ÛÙØØÝ\œÈ[ˆ]\™XHÛ˜ÙH]™\žHLYX\œÈ
T“ÈHŒJKˆHÝ\Y\ˆ›ÜÜÙ\ÈHÛÛ][ÛˆÙˆØ]\YÚ\ÚXØ[˜\œšY\œÈ]H™XÝ\œš[™È[›X[ÛÜÝÙˆ	Nˆ‹ˆ]Y\Ý[ÛŽˆØ[Ý[]HHÓH[™HSH›Üˆ\ÈÛÜœÜ˜]HØÙ[˜\š[ËˆÚXÚÙˆH›ÛÝÚ[™È™\™\Ù[ÈHš[˜[˜ÚX[H‘TÕÙXÝ\š]HXÚ\Ú[ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÓHH	MLSHH	MKˆH˜\œšY\ˆÛÜÝÈ
	N
H[Ü™H[ˆHSKÛÈHšYÚØ[\ÈÈXØÙ\Hš\ÚÈÜˆ˜[œÙ™\ˆ]Ú][œÝ\˜[˜ÙKˆ‹ˆŠHÓHH	MLSHH	MKˆH˜\œšY\ˆ\Èš[˜[˜ÚX[HÛÜÚ[KÛÈHÛÛ›ÛÚÝ[™HZ]YØ]YžHÜ[™[™È	N\ˆYX\‹ˆ‹ˆÊHÓHH	ÍLSHH	ÍKˆHÛÜÝÙˆH˜\œšY\ˆ
	N
H\ÈÝÙ\ˆ[ˆHSH
	ÍK
KÛÈHÛÜœ™XÝXÚ\Ú[Ûˆ\ÈÈZ]YØ]HžH[œÝ[[™ÈHØ]\YÚ˜\œšY\œËˆ‹ˆ‘
HÓHH	MKSHH	KLˆHš\ÚÈ\È™YÛYÚX›Nˆ›ÈÛÝ[\›YX\Ý\™H\È™YYY[™HÛ\Ý\ˆØ[ˆÝ^HÚ\™H]\Ëˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÓHH	MLSHH	MKˆHÛÜÝÙˆH˜\œšY\ˆ
	N
H^ÙYYÈHSH
	MK
K\™Y›Ü™HHÛÜœ™XÝXÚ\Ú[Ûˆ\ÈÈXØÙ\H™\ÚYX[š\ÚÈÜˆ˜[œÙ™\ˆ]›ÝYÚHÚX\\ˆ[œÝ\˜[˜ÙH
K™Ëˆ	KÞYX\ŠKŠŠ——Šˆ
ŠØ[Ý[][ÛˆÝ\ÎŠŠ—ˆKˆ
Š”ÓH
Ú[™ÛHÜÜÈ^XÝ[˜ÞJJŠˆHUˆ
ˆQˆH	L
ˆŒÌH
Š‰ML
Šˆ
ÛÜÝÙˆHÚ[™ÛH›ÛÙ]™[
K—ˆ‹ˆ
ŠSH
[›X[^™YÜÜÈ^XÝ[˜ÞJJŠˆHÓH
ˆT“ÈH	ML
ˆŒHH
Š‰MK
Šˆ
]™\˜YÙH^XÝYÜÜÈÛˆ[ˆ[›X[˜\Ú\ÊK—Šˆ
Š\Ú[™\ÜÈ[˜[\Ú\È
YH[YÙ[˜ÙJNŠŠˆH[HÙˆ[XˆH^[H^XÝÈ\ÈÈÛÛ\\™HHÛÛ›Û	ÜÈ
Š˜[›X[ÛÜÝ
ŠˆÚ]H^XÝY[›X[ÜÜË[™[Ü™H™XÚ\Ù[HÚ]H
ŠSH™YXÝ[ÛŠŠˆHÛÛ›Û[]™\œÎˆ[ÝHÜ[™ÈÚš[šÈ[ˆ^ÜÝ\™KÛÈHX\™ÝXÚÈ\ÈH™[™Yš]ØZ[™Y›ÝHSH]Ù[‹ˆ
Š”™YÝ[]ÜžH]Y\ÊŠ‹
Š››Û‹Yš[˜[˜ÚX[[\XÝÊŠˆ[™HÜ™Ø[š^˜][Û‰ÜÈš\ÚÈ\]]HÚ]Ý]ÚYHH\š]Y]XÈ[™Ø[ˆÝ™\\›ˆ]ˆÜ[™[™È	N\ˆYX\ˆÈZ]YØ]H[ˆ^XÝY[›X[ÜÜÈÙˆ	MK™\™\Ù[ÈH™]ÜÜÈÙˆ	ËˆHÛÜœ™XÝš[˜[˜ÚX[XÚ\Ú[Ûˆ\ÈÈ
ŠXØÙ\H™\ÚYX[š\ÚÊŠˆ
ØÝ[Y[[™È]
HÜˆ
Š•˜[œÙ™\ˆ]
Šˆ›ÝYÚ›ÛÙ[œÝ\˜[˜ÙHÚ][ˆ[›X[™[Z][HÝÙ\ˆ[ˆ	MK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHšYÚ[X™\œËÜ›Û™ÈXÚ\Ú[ÛŽŠŠˆHÓH[™SHX]ÚHÛÜœ™XÝÛ™\Ë]HÛÛ˜Û\Ú[Ûˆ\È[™\YˆÜ[™[™È	N]™\žHYX\ˆÈ]›ÚY[ˆ]™\˜YÙH^XÝYÜÜÈÙˆ	MK›ÙXÙ\ÈH™]ÜÜÈÙˆ	ËHYX\ŽˆHÛÛ›ÛÛÜÝÈ[Ü™H[ˆH[XYÙH]™]™[Ëˆ]\ÈH[ÜÝ™XXÚ\›Ý\È\Ý˜XÝÜ‹™XØ]\ÙH]™]Ø\™È[ž[Û™HÚÈÝÜÈ\ÈÛÛÛˆ\ÈH\š]Y]XÈ\ÈÛ™HÚ]Ý]ÛÛ\\š[™ÈHÛÜÝYØZ[œÝHSK—ˆ
ˆ
ŠÊHÓHÛÛ\]YÛˆHÛÛ\[Y[ÙˆHQŽŠŠˆ	ÍL\È
ŠÌ	JŠˆÙˆ	L]\ÈH˜[YH]
ŠœÝ\š]™\ÊŠˆH]™[›ÝH˜[YHÜÝˆH^ÜÝ\™H˜XÝÜˆ^™\ÜÙ\ÈHÚ\™HÙˆ˜[YH
Š™\Ý›ÞYY
ŠŽˆÌ	H\™Kˆœ›ÛH\™HH\œ›Üˆ›ÜYØ]\Ë[™HSH[™›]YÈ	ÍKXZÙ\ÈH˜\œšY\ˆÛÚÈÛÜÚ[HÚ[ˆ]\È›Ý—ˆ
ˆ
Š‘
HT“È\YYÚXÙNŠŠˆ	MK\È›ÝHÓK]\ÈHÛÜœ™XÝ
ŠSJŠŽÈ[ž[Û™HÚÛÜÚ[™È\ÈÜ[Ûˆ\È\ÙYH[›X[^™Y˜]HÙˆØØÝ\œ™[˜ÙHÛ™H[YHÛÈX[žK\Z[™È]YØZ[ˆÈH™\Ý[ÈØZ[ˆ	KLˆ]\ÈHÛ\ÜÚXÈ\œ›ÜˆÙˆÛÛ™\Ú[™ÈHÛÈ]X[]Y\ÎˆHÓHÛÛ˜Ù\›œÈ
Š˜HÚ[™ÛH]™[
Š‹HSHÛÛ˜Ù\›œÈ
Š˜[ˆ]™\˜YÙHYX\ŠŠ‹——Šˆ
Š‘^[H˜\ŠŠˆY[[Üš^™HHÛÈ›Ü›][\È[ˆÙ\]Y[˜ÙH[™È›Ý[™\[Kˆ
Š”ÓHHUˆQŠŠˆ
Ú]HÜÙH[ˆHÚ[™ÛH]™[
HOˆ
ŠSHHÓHT“ÊŠˆ
Ú]HÜÙH[ˆ[ˆ]™\˜YÙHYX\ŠKˆ[ˆ\HHXÚ\Ú[Ûˆ[H[ˆ]ÈÛÜœ™XÝ›Ü›NˆÛÛ\\™HH
Š˜[›X[ÛÜÝÙˆHÛÛ›Û
ŠˆÚ]H
Šœ™YXÝ[Ûˆ[ˆSJŠˆ]ÛÛ›Û›ÙXÙ\Ë›ÝÚ]HSH[ˆHXœÛÛ]KˆHÛÛ›Û][™\È[ˆSHÙˆ	MKØ]™\È	ËLˆX›Ý™H]šYÝ\™H]Ù\È›Ý^H›Üˆ]Ù[‹]™[ˆÝYÚ]ÛÜÝÈ\ÜÈ[ˆHÚÛHSKˆ[ˆ\ÈØÙ[˜\š[ÈH˜\œšY\œÈÛÝ[Y™™XÝ]™[H™[[Ý™HH^ÜÝ\™KÛÈH™YXÝ[ÛˆÛÚ[˜ÚY\ÈÚ]HSH[™ÛÛ\\š[™È	NYØZ[œÝ	MK\ÈYÚ][X]KˆÚ\™HHÛÛ›ÛÙ\È›Ý^H›Üˆ]Ù[‹XØÙ\Hš\ÚÈ[™ØÝ[Y[]Üˆ˜[œÙ™\ˆ]Ú][œÝ\˜[˜ÙHÚÜÙH™[Z][H\È™[ÝÈH^XÝY™[™Yš]——ˆ
Š[™HØ\›š[™ÈÛÜ[Ü™H[ˆH›Ü›][NŠŠˆHØ[Ý[][Ûˆ\È[ˆ[™XØ][Û‹›ÝH™\™XÝˆH
Š›YØ[Ø›YØ][ÛŠŠ‹Hš\ÚÈÈ
Šœ[ÜIÜÈØY™]JŠˆÜˆ[ˆ[œ]X[YšXX›H™\]][Û˜[ÜÜÈX[™]HHÛÛ›Û]™[ˆÚ[ˆH[X™\œÈØ^HÝ\Ú\ÙKˆHSH\È›ÝHÜ[™[™ÈØ\ˆØ]ÚH\™XÝ[ÛˆÙˆHQŽˆYˆH^Ø^\ÈH\ÜÙ]\ÈÌ	H[XYÙYHQˆ\ÈŒÌ›ÝÌ——Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆYˆ™\Z\š[™ÈHXZÚ[™È›ÛÙˆÛÜÝÈ	L\ˆYX\ˆ[ˆXZ[[˜[˜ÙK]H^XÝY˜Z[ˆ[XYÙH\ÈÛ›H	K\ˆYX\‹œ›ÛHHš[˜[˜ÚX[Ý[™Ú[]\È™]\ˆÈÛ\˜]HHš\ÚÈÜˆš[™[œÝ\˜[˜ÙH›Üˆ	‹\ˆYX\ˆ˜]\ˆ[ˆ^H	L[ˆÛÛ[[Ý\ÈÛÜšËˆ‹ˆKˆÎˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ[ˆ^\›˜[]Y]Üˆš[™È]H\›XXÙ]]XØ[ÛÛ\[žH\È›È™YÚ\Ý\ˆÜˆ\Ý™\Ü›ÜˆH™XÛÝ™\žHÙˆ[ˆT”\XØ][ÛˆÜš]XØ[ÈÙÚ\ÝXÜËˆX[˜YÙ[Y[\ÚÜÈHÙXÝ\š]HX[HÈ\Ý[X]HHÝ™\˜[š[˜[˜ÚX[[\XÝÙˆHÜÜÚX›HÝ[ÝÜYÙHÙˆ]\XØ][ÛˆÈY[YžHHX^[][HÛ\˜X›HÝÛ[YH
U
Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙ™šXÚX[ØÝ[Y[\ÜÙ\ÜÛY[Üˆ›ØÙ\ÜÈ]\Ý™HÛÛœÝ[YÜˆÝ\YSSQQPUSHÈØZ[ˆ\È\Ú[™\ÜËZ[\XÝ[™›Ü›X][ÛÈ‹ˆÜ[ÛœÎˆÂˆJH’PH
\Ú[™\ÜÈ[\XÝ[˜[\Ú\ÊH‹ˆŠH”
\Ø\Ý\ˆ™XÛÝ™\žH[ŠH‹ˆÊHHÛÝY›ÝšY\‰ÜÈÓH‹ˆ‘
HÛÜœÜ˜]Hš\ÚÈ™YÚ\Ý\ˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH’PH
\Ú[™\ÜÈ[\XÝ[˜[\Ú\ÊJŠ‹——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆH’PH\ÈH[™[Y[[ÝYH\™›Ü›YY]H™YÚ[›š[™ÈÙˆ\Ú[™\ÜËXÛÛ[Z]H[›š[™ÈÈY[YžHHÜš]XØ[Þ\Ý[\Ë]X[YžHHš[˜[˜ÚX[[™Ü\˜][Û˜[[\XÝÙˆZ\ˆ[\œ\[ÛœÈ[™\ÝX›\ÚH•Ë”È[™UY]šXÜËˆ]\È^XÝHHÛÜœ™XÝÛÝ\˜ÙH›Üˆ]\›Z[š[™ÈH\Ú[™\ÜÈ[\XÝ—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆ\š[™ÈH˜Y[™ÈÙˆH’PKH\\Y[XYÈ\™H[\šY]ÙY[™]\È\ØÛÝ™\™Y]YˆHš[[™ÈÛÙØ\™HÝÜÈ›Üˆ[Ü™H[ˆÝ\œËHÛÛ\[žHÜÙ\È	L\ˆÝ\ˆ[ˆYØ[[˜[Y\Ëˆ\È˜[YHÙ]ÈH\XØ][Û‰ÜÈ•Ë—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠŠHH”
ŠˆÛÛZ[œÈHÝ\XžK\Ý\XÚšXØ[›ØÙY\™\È›ÜˆÙ\™\ˆ™XÛÝ™\žK]™\Ý[Y\È]Hš[Üš]H˜[Y\È[™U]™H[™XYH™Y[ˆYš[™Y[ˆH’PK—ˆ
ˆ
ŠÊHHÓJŠˆ™YÝ[]\ÈHÛÛ˜XÝX[\™›Ü›X[˜ÙH›ÛZ\ÙYžHHÝ\Y\‹]Ù\È›Ý^™\ÜÈHÛÛ\[žIÜÈ[\›˜[š[˜[˜ÚX[[\XÝ™\Ý[[™Èœ›ÛHHÝÛ[YK—ˆ
ˆ
Š‘
HHš\ÚÈ™YÚ\Ý\ŠŠˆ\ÝÈHY[YšYYš\ÚÜÈ[™Z\ˆÝÛ™\œÈ[ˆÙ[™\˜[]Ù\È›ÝÛÛZ[ˆH]Z[Y]X[]]]™H[™]X[]]]™H[˜[\Ú\ÈÙˆH[\Ü˜[[\XÝÈÛˆH[™]šYX[\Ú[™\ÜÈ›ØÙ\ÜÙ\È›ÝšYYžHH’PKˆ‹ˆKˆˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆHÜš]XØ[ÙXˆ\XØ][ÛˆÙˆ[ˆ[™\ÝY[˜[šÈ\ÈY™™XÝYžH[ˆXÝ]™H™\›ËY^H[™\˜Xš[]H][ÝÜÈ™[[ÝHÛÙH^XÝ][ÛˆÚ]Ý]]][XØ][Ûˆ
ÑJKˆHÙXÝ\š]HX[H™XÙZ]™\ÈH[Y\™Ù[˜ÞH]Ú™[X\ÙYžHH™[™Ü‹]HPH
]X[]H\ÜÝ\˜[˜ÙJH[š\›Û›Y[\ÈÙ™›[™HYHÈH\™Ø\™H˜Z[\™K™]™[[™ÈÝ[™\™\Ý[™ÈÛˆH\XØ][Û‰ÜÈÝ\ÝÛHT\Ëˆ‹ˆ]Y\Ý[ÛŽˆXØÛÜ™[™ÈÈÚ[™ÙHX[˜YÙ[Y[™\Ý˜XÝXÙ\ËÚ]\ÈH’T”ÕXÝ[ÛˆHÙXÝ\š]HX[˜YÙ\ˆ]\ÝZÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[[YYX][H[œÝ[H]Ú[ˆ›ÙXÝ[Û‹Ú[˜ÙHHÑHš\ÚÈ^ÙYYÈ[žHš\ÚÈÙˆ\XØ][ÛˆX[[˜Ý[Û‹ˆ‹ˆŠH™Y\ÙHÈ[œÝ[H]Ú[[HPH[š\›Û›Y[\È[H™\ÝÜ™Y[™HZÝ\ˆ]]ÛX]Y\ÝÈ\™HÛÛ\]Yˆ‹ˆÊHÝ\H›Ü›X[[Y\™Ù[˜ÞHÚ[™ÙH›ØÙY\™KÛÛ™XÝH˜\Y[\XÝ[˜[\Ú\ÈÚ]HÙ^HÝZÙZÛ\œÈ[™Yš[™HH˜XÚÛÝ][ˆ™Y›Ü™HH[œÝ[][Ûˆ[ˆ›ÙXÝ[Û‹ˆ‹ˆ‘
HÛÛ\][H\ÛÛ]HHÙXˆ\XØ][ÛˆžH\ØÛÛ›™XÝ[™È]œ›ÛHH[\›™]
]›ÚY[˜ÙJH[™ØZ]›ÜˆHPH[š\›Û›Y[È™H™\ÝÜ™Yˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÝ\H›Ü›X[[Y\™Ù[˜ÞHÚ[™ÙH›ØÙY\™KÛÛ™XÝH˜\Y[\XÝ[˜[\Ú\ÈÚ]HÙ^HÝZÙZÛ\œÈ[™Yš[™HH˜XÚÛÝ][ˆ™Y›Ü™HH[œÝ[][Ûˆ[ˆ›ÙXÝ[Û‹ŠŠ——Šˆ
Š•ÚH]	ÜÈH‘TÕŠŠˆ[ˆÛÛ\PIÜÈÚ[™ÙHX[˜YÙ[Y[›ÝØÛÛË˜XÙYÚ][ˆXÝ]™HÜš]XØ[™X]
ÝXÚ\ÈH™\›ËY^HÑJK[ÝHØ[››ÝØZ]›ÜˆHÛ™ÈÝ[™\™\Ý[™È[Y\È
[[™ÈÝ][œÝÙ\ˆÊK][ÝH[ÛÈØ[››ÝXÝ™XÚÛ\ÜÛHÚ]Ý]ÛÛ›Û
[[™ÈÝ][œÝÙ\ˆJKˆH
Š‘[Y\™Ù[˜ÞHÚ[™ÙJŠˆ›ØÙY\™H[ÝÜÈž\\ÜÚ[™ÈHÝ[™\™PH[š\›Û›Y[]Ý[X[™]\È[ˆX˜œ™]šX]Y[\XÝ[˜[\Ú\ÈÚ]HÙ^HÝZÙZÛ\œÈ[™HX[™]ÜžHÜ™X][ÛˆÙˆH
Š˜XÚÛÝ][ŠŠˆ
™XÛÝ™\žKÜ›Û˜XÚÈ[ŠHÈ]›ÚYØ]\Ý›ÜXÈÝÜYÙ\ÈÙˆH˜[œØXÝ[Û˜[Þ\Ý[H[ˆ›ÙXÝ[Û‹—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆ\™H\ÈHÜš]XØ[[™\˜Xš[]HÛˆ[ˆ\XÚHÙ\™\‹ˆ[ˆ[Y\™Ù[˜ÞHÚ[™ÙH\ÈXÛ\™Y]ŽŒSNÈHX[HYY]È›ÜˆLZ[]\ÈÈYÜ™YHÛˆH[˜ÛÛ\]Xš[]Hš\ÚÜËÜš]\ÈHÛÛ[X[™È[š[œÝ[H]ÚYˆ]™\ž][™Èœ™XZÜÈ
˜XÚÛÝ][ŠK[™[œÝ[ÈH]Ú—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠJJŠˆ[œÝ[[™ÈÚ]Ý][žH›Û˜XÚÈ[ˆÜˆ[\XÝ[˜[\Ú\È\È^™[Y[Hš\ÚÞH[™š[Û]\ÈHš[˜Ú\\ÈÙˆÚ[™ÙHÛÛ›Û—ˆ
ˆ
ŠŠJŠˆ™Y\Ú[™ÈÈ[œÝ[H]Ú^ÜÙ\ÈH˜[šÈÈ[ˆXÝ]™HØ]\Ý›ÜXÈÑH]XÚÈ›Üˆ^\Ëš[Û][™ÈHš[˜Ú\HÙˆ[Y[HZ]YØ][Û‹—ˆ
ˆ
Š‘
JŠˆÚ][™ÈÝÛˆH˜[œØXÝ[Û˜[ÙXˆ\XØ][Ûˆ
]›ÚY[˜ÙJHÛÝ[Ø]\ÙH[ˆ[[YYX]HÜ\˜][Û˜[ÝÜYÙH›ÜˆÝ\ÝÛY\œËÚ][[Y[œÙHXÛÛ›ÛZXÈ[XYÙH]›Ø˜X›H^ÙYYÈHØ[Ý[]Yš\ÚËˆ‹ˆKˆNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆH][[˜][Û˜[KXÛÛ[Y\˜ÙHÛÛ\[žH\ÈZYÜ˜][™ÈH]X˜\ÙHÛÛZ[š[™ÈÝ\ÝÛY\ˆ™XÛÜ™È
[˜ÛY[™ÈÙ[œÚ]]™H]HÙˆ]\›ÜX[ˆÚ]^™[œÈÝXš™XÝÈÑˆ[™Ü™Y]Ø\™]HÝXš™XÝÈÒKQÔÊHÈHX›XÈXTÈÛÝY[š\›Û›Y[ˆYHÈYÙ]ÛÛœÝ˜Z[È[™ÛYØXÞH[Ù[\ÈÜš][ˆ[ˆ›Û‹]\]X›H[™ÝXYÙ\Ë]\È›ÝÜÜÚX›HÈ\HÜ˜[[\ˆÛÛ[[‹[]™[[˜Üž\[ÛˆÛÛ›ÛÈÛˆHÛÝY›ÝšY\‰ÜÈÙ\™\œËˆ™XÙ[HHÛÛ\[žHÝY™™\™YHœ™XXÚYHÈÔS[š™XÝ[Ûˆ]^ÜÙYL\ÝÜšXØ[˜[œØXÝ[ÛœËˆ‹ˆ]Y\Ý[ÛŽˆÛÛœÚY\š[™ÈHXÚšXØ[[™XÛÛ›ÛZXÈÛÛœÝ˜Z[È\ØÜšX™YÚXÚÛXZ[ˆHXÝ[Ûˆ™\™\Ù[ÈHXœÛÛ]H’SÔ’UHÈZ]YØ]HH™\ÚYX[š\ÚÈÙˆHZYÜ˜][Ûˆ[™[œÝ\™HYØ[ÛÛ\X[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH\˜Ú\ÙHHÞX™\ˆ[œÝ\˜[˜ÙHÛXÞHÚ]H	KÙZ[[™ÈÈÛÛ\][H˜[œÙ™\ˆHš[˜[˜ÚX[š\ÚÈÙˆHÑˆ[™ÒKQÔÈ[˜[Y\Ëˆ‹ˆŠHÛÛ™šYÝ\™HH™Y[™[ÙXˆ\XØ][Ûˆš\™]Ø[
ÐQŠH[ˆœ›ÛÙˆHYØXÞHÙ\™\œÈÈ›ØÚÈÔS[š™XÝ[Ûˆ]XÚÜËˆ‹ˆÊHÛÛ™XÝH›Ü›X[]H›ÝXÝ[Ûˆ[\XÝ\ÜÙ\ÜÛY[
PJH[™ÚYÛˆH]H›ØÙ\ÜÚ[™ÈYÜ™Y[Y[
JHÚ]Ý[™\™ÛÛ˜XÝX[Û]\Ù\È
ÐÐÊHÚ]HÛÝY›ÝšY\‹ˆ‹ˆ‘
HÛÛ\][H™Y\ÚYÛˆH\˜Ú]XÝ\™HÙˆHYØXÞH[Ù[\ÈÈÝ\ÜÛÛ[[‹[]™[[˜Üž\[Û‹›ØÚÚ[™ÈHZYÜ˜][Ûˆ[™Yš[š][Kˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÛÛ™XÝH›Ü›X[]H›ÝXÝ[Ûˆ[\XÝ\ÜÙ\ÜÛY[
PJH[™ÚYÛˆH]H›ØÙ\ÜÚ[™ÈYÜ™Y[Y[
JHÚ]Ý[™\™ÛÛ˜XÝX[Û]\Ù\È
ÐÐÊHÚ]HÛÝY›ÝšY\‹ŠŠ——Šˆ
Š•ÚH]	ÜÈH‘TÕ
œ›ÛHHÛXZ[ˆH\œÜXÝ]™HHÛÝ™\›˜[˜ÙH	ˆÛÛ\X[˜ÙJNŠŠˆœ›ÛHH›ÙÜ˜[HX[˜YÙ[Y[Ý[™Ú[HXœÛÛ]Hš[Üš]H›ÜˆHZYÜ˜][ÛˆÙˆÙ[œÚ]]™H]\›ÜX[ˆ]H
ÑŠHÈHXTÈÛÝY\ÈÈ[š[HX[™]ÜžHYØ[™\]Z\™[Y[ËˆHPH
]H›ÝXÝ[Ûˆ[\XÝ\ÜÙ\ÜÛY[
H]˜[X]\ÈHš\ÚÈÈH]HÝXš™XÝÉÈšYÚËÚ[HHH
]H›ØÙ\ÜÚ[™ÈYÜ™Y[Y[
H\ÈHX[™]ÜžKYØ[Hš[™[™ÈYÜ™Y[Y[™]ÙY[ˆH]HÛÛ›Û\ˆ
HÛÛ\[žJH[™H]H›ØÙ\ÜÛÜˆ
HÛÝY›ÝšY\ŠH]Yš[™\ÈHÙXÝ\š]H™\ÜÛœÚXš[]Y\ËˆÚ]Ý]\ÙHØÝ[Y[ËHÛÛ\[žHÛÛ[Z]ÈH\™XÝÑˆYØ[š[Û][Ûˆ[š\ÚX›HžH\ÈŒZ[[Ûˆ]\›ÜÈÜˆ	HÙˆ™]™[YK™YØ\™\ÜÈÙˆHXÚšXØ[ÛÛ›ÛÈ[œÝ[Y—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆ[ˆ][X[ˆÛÛ\[žHXÚY\ÈÈ\ÙHX”ÜÝ
[ˆ[Y\šXØ[ˆØXTÊHÈÝÜ™HÝ\ÝÛY\ˆ]Kˆ™Y›Ü™H˜[œÙ™\œš[™ÈHÛÛXÝË]ÛÛ\]\ÈHPHÈX\Hš\ÚÜÈÙˆ[˜]]Üš^™YXØÙ\ÜÈ[™ÚYÛœÈHHÚ]X”ÜÝÈ[œÝ\™HH]H\È›ØÙ\ÜÙYXØÛÜ™[™ÈÈHÑ‹—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠJHÑˆ[˜[Y\ÊŠˆ\™HÙ[™\˜[H›ÝYØ[H[œÝ\˜X›H[ˆX[žHUH\š\ÙXÝ[ÛœË[™ÒKQÔÈ[\ÜÙ\È\™XÝÛÛ˜XÝX[[˜[Y\Ëˆ[œÝ\˜[˜ÙHZ]YØ]\È[˜Ú[\žHš[˜[˜ÚX[ÜÜÙ\Ë]Ù\È›Ýš^Hš[X\žHYØ[›Û‹XÛÛ\X[˜ÙK—ˆ
ˆ
ŠŠHHÐQŠŠˆ\È[ˆ^Ù[[XÚšXØ[ÛÛ›Û
ÛXZ[ˆËÍ
H[™\È™XÙ\ÜØ\žH›ÜˆÒKQÔË]Ù\È›ÝY™\ÜÈHYØ[š]˜XÞHÛÛ\X[˜ÙHÙˆ\™\\H]H›ØÙ\ÜÚ[™ÈÜˆHÛÝ™\›˜[˜ÙHÙˆHXTÈZYÜ˜][Û‹—ˆ
ˆ
Š‘
JŠˆ\ÈÜ[Ûˆ
Ý[]›ÚY[˜ÙH›ÝYÚ[™Yš[š]H›ØÚÚ[™ÊHYÛ›Ü™\ÈHÝš[™Ù[\Ú[™\ÜÈ[™YÙ]ÛÛœÝ˜Z[È\ØÜšX™Y[ˆHØÙ[˜\š[Ë›ØÚÚ[™ÈHÛÛ\[žIÜÈ]›Û][Û‹ˆ‹ˆKˆLˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[ÎˆHX[Ø\™HÜ™Ø[š^˜][Ûˆ™YÝ[]YžHTPH[[™ÈÈYÜ[ˆ[››Ý˜]]™HØXTÈÔ“HÙ\šXÙH›ÜˆHX[˜YÙ[Y[ÙˆÜš]XØ[]Y[Ëˆ\š[™ÈHYH[YÙ[˜ÙH\ÙKHØXTÈÝ\Y\ˆ™Y\Ù\ÈÈ[™Ý™\ˆH[ÛÜHÙˆ]ÈÓÐÈˆ\HRH]Y]™\ÜÚ][™È™X\ÛÛœÈÙˆ[™\ÝšX[ÛÛ™šY[X[]HX›Ý]]È›ÜšY]\žH[\›˜[\˜Ú]XÝ\™Kˆ][œÝXYÙ™™\œÈ[ˆXÝ]™HTÓÈÌHÙ\YšXØ]H[™[ˆ^XÝ]]™HÝ[[X\žHÙˆ]È™\šYšYYX›XÈ[™\˜Xš[]Y\ËˆHÝ\Y\ˆ\ÈÜš]XØ[›ÜˆHÜÜ][[™\™H\™H›È˜[Y[\›˜]]™\ÈÛˆHX\šÙ]][ˆ\]X[ÛÜÝˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ[ÛœÈ™\™\Ù[ÈH‘TÕÙXÝ\š]H[™ÛÛ\X[˜ÙHÛÛ\›ÛZ\ÙHÈ›ØÙYYÚ[H™\ÜXÝ[™ÈYH[YÙ[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJHXØÙ\HTÓÈÌHÙ\YšXØ]H\ÈÝY™šXÚY[]šY[˜ÙH[™^[\HÝ\Y\ˆœ›ÛHHÓÐÈˆ™\ÜÚ[˜ÙHTÓÈÌH\ÈH™XÛÙÛš^™Y[\›˜][Û˜[Ý[™\™Ù\YšYYžH[ˆXØÜ™Y]Y\™\Kˆ‹ˆŠH[X[™[ˆÛ‹\Ú]H\ÚXØ[]Y]ÙˆHÝ\Y\‰ÜÈ]XÙ[\œÈžHHÜÜ][	ÜÈÙXÝ\š]HX[K™Y\Ú[™ÈÈÚYÛˆ[žHYÜ™Y[Y[™Y›Ü™HH[œÜXÝ[Ûˆ\ÈÛÛ\]Y[™›Ü›X[HZ[]Yˆ‹ˆÊH]™HHÝ\Y\ˆÛÛ\]HHÝ[™\™^™Y]Y\Ý[Û›˜Z\™H
ÐRTHÜˆÒQÊKX\H[œÝÙ\œÈÈH™\]Z\™YTPHÛÛ›ÛÈ[™[\ÜÙH]Y]Û]\Ù\È[™œ™XXÚ[›ÝYšXØ][ÛˆÓ\È[ˆH\Ú[™\ÜÈ\ÜÛØÚX]HYÜ™Y[Y[
PJKˆ‹ˆ‘
HÚYÛˆHÝ[™\™YÜ™Y[Y[žH[œÙ\[™ÈHš[˜[˜ÚX[Ú]˜]Ø[[˜[H[ˆØ\ÙHÙˆH]Hœ™XXÚÚ]Ý]™\]Z\š[™È\\ˆÙ[‹XÙ\YšXØ][ÛœÈÜˆÜ\˜][Û˜[ÛÛ›ÛËˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH™\]Z\™HHÝ\Y\ˆÈÛÛ\]HH]Z[YÝ[™\™^™Y]Y\Ý[Û›˜Z\™HÝXÚ\ÈHÐRTH
ÛÛœÙ[œÝ\È\ÜÙ\ÜÛY[[š]X]]™H]Y\Ý[Û›˜Z\™JHÜˆHÒQËX\H[œÝÙ\œÈ\™XÝHÈH™\]Z\™YTPHÛÛ›ÛÈ[™[\ÜÙHYZØÈ]Y]Û]\Ù\È[™œ™XXÚ\™\Ü[™ÈÓ\ÈÚ][ˆH\Ú[™\ÜÈ\ÜÛØÚX]HYÜ™Y[Y[
PJKŠŠ——Šˆ
Š•ÚH]	ÜÈH‘TÕ
[˜[\Ú\È[™YH[YÙ[˜ÙJNŠŠˆÚ[ˆHÜš]XØ[Ý\Y\ˆØ[››ÝÜˆÚ[›Ý›ÝšYHHÓÐÈˆ\HRH™\ÜHÜ™Ø[š^˜][ÛˆØ[››ÝÚ[\H	Ø›[™HXØÙ\	ÈHš\ÚÈ
[[™ÈÝ]JK›Üˆ›ØÙYYÚ]Ý]ÚXÚÜÈ
[[™ÈÝ]
KˆHÛÛ\PH™\Ý˜XÝXÙHÛÛœÚ\ÝÈÙˆÛÛ™XÝ[™ÈHÛÛ\[œØ][™ÈYH[YÙ[˜ÙH[™\ÝYØ][ÛˆžH™\]Y\Ý[™ÈÝ[™\™^™Y\™\\H]Y\Ý[Û›˜Z\™\È
ÛÝYÙXÝ\š]H[X[˜ÙIÜÈÐRTHÜˆÚ\™Y\ÜÙ\ÜÛY[ÉÈÒQÊHÈ]˜[X]HH[™]šYX[ÛÛ›ÛËˆ\\›[Ü™KÚ[˜ÙH\È[›Û™\ÈYYXØ[]H
TPJK]\ÈYØ[HX[™]ÜžHÈÚYÛˆH
ŠPH
\Ú[™\ÜÈ\ÜÛØÚX]HYÜ™Y[Y[
JŠˆ]Yš[™\ÈHYØ[™\ÜÛœÚXš[]Y\È›Üˆ›ØÙ\ÜÚ[™ÈK[œšXÚYÚ]˜\Y]KXœ™XXÚ›ÝYšXØ][ÛˆÛ]\Ù\È[™\™Ù]Y]Y]Ë—Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆHš]˜]HÛ[šXÈØ[ÈÈ\ÙHHØXTÈ]›Ü›H›Üˆ[[YYXÚ[™KˆHÝ\Y\ˆÙ\È›Ý]™HHÓÐÈˆ]\ÈTÓÈÌHÙ\YšXØ][Û‹ˆHÛ[šXÈ\ÈHÝ\Y\ˆÛÛ\]HHÒQÈ]Y\Ý[Û›˜Z\™HÈX\H\ÚXØ[[™ÙÚXØ[ÙXÝ\š]HÛÛ›ÛÈ[™ÚYÛœÈHPHÈ[œÝ\™HH›ÝXÝ[ÛˆÙˆ]Y[]H[™\ˆTPK—Šˆ
Š•ÚHHÝ\œÈ\™H›ÝÛÜœ™XÝŠŠ—ˆ
ˆ
ŠJJŠˆ›[™HXØÙ\[™ÈTÓÈÌHÚ]Ý]X\[™ÈHÜXÚYšXÈÛÛ›ÛÈ›Üˆ›ÝXÝYYYXØ[]H
TPJH™\™\Ù[ÈÙ\š[Ý\È™YÛYÙ[˜ÙH
XÚÈÙˆYHØ\™KÑYH[YÙ[˜ÙJH[ˆHX[Ø\™HšY[—ˆ
ˆ
ŠŠJŠˆ[ˆÛ‹\Ú]H\ÚXØ[]Y]\È˜\™[HXØÙ\YžH\™ÙHX›XÈÛÝYÜˆ›ÜšY]\žHXTÈ›ÝšY\œÈ›Üˆ™X\ÛÛœÈÙˆÙÚXØ[[™\ÚXØ[ÙXÝ\š]HÙˆHÛË[ØØ][ÛˆÙˆÝ\ˆÝ\ÝÛY\œÉÈÙ\™\œËXZÚ[™È\ÈÜ[ÛˆXÚšXØ[H[™Ü\˜][Û˜[H[\˜XÝXØ[—ˆ
ˆ
Š‘
JŠˆHÚ]˜]Ø[Û]\ÙH›ÝXÝÈH˜\ÚXÈYØ[\ÜXÝÈY\ˆH˜XÝ]Ù\È›Ý[œÝ\™H[žH™]™[]™HÛÛ\X[˜ÙHÜˆ™\šYšXØ][ÛˆÙˆHÛÛ›ÛÈÛˆ]Y[]H[ˆ˜[œÚ][™]™\Ýˆ‹ˆKˆLNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ•ØžH\È\ÝÝ\YH™]È›Øˆ[™\š[™È\Èš\œÝ^K™XÙZ]™\ÈHÙ\šY\ÈÙˆØÝ[Y[ÈÈ™]šY]È[™ÚYÛ‹ˆ[[Û™È\ÙKHš[™ÈHØÝ[Y[]^XÚ]H›ÚXš]ÈH\ÙHÙˆ\ÈÛÜœÜ˜]H[XZ[Y™\ÜÈ›Üˆ\œÛÛ˜[Û›[™H\˜Ú\Ù\Ëˆ\ÈZÙ\È[HžHÝ\œš\ÙKÚ[˜ÙH[ˆ\È™]š[Ý\È›ØˆH™YÝ[\›H\ÙYHÛÜœÜ˜]H[XZ[›ÜˆÚ[Z[\ˆ\˜Ú\Ù\ËˆY\ˆÛÛYH™Y›XÝ[Û‹H™X[^™\È]\Ú[™ÈHÛÜšÈ[XZ[›Üˆ›Û‹XÛÜœÜ˜]HXÝ]š]Y\ÈÛÝ[[Z[Ù\š[Ý\ÈÙXÝ\š]Hš\ÚÜÈ›ÜˆHÜ™Ø[š^˜][Û‹ˆH\™Y›Ü™HXÚY\ÈÈÚYÛˆHØÝ[Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆØÝ[Y[\ÈØžH\ÝÚYÛ™YÈ‹ˆÜ[ÛœÎˆÂˆJHH\ÚXØ[ÙXÝ\š]HÝ[™\™‹ˆŠH[ˆÛ˜›Ø\™[™ËÓÙ™˜›Ø\™[™È›ØÙY\™H‹ˆÊH[ˆ[˜ÚY[™\ÜÛœÙHÛXÞH‹ˆ‘
H[ˆXØÙ\X›H\ÙHÛXÞH
UT
H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[ˆXØÙ\X›H\ÙHÛXÞH
UT
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆUT
XØÙ\X›H\ÙHÛXÞJH›Ü›X[HYš[™\ÈH[\Ë™\ÜÛœÚXš[]Y\È[™ÛÛœÝ˜Z[È][\ÞYY\È]\Ý™\ÜXÝ[ˆH\ÙHÙˆÛÜœÜ˜]HU™\ÛÝ\˜Ù\È
ÝXÚ\ÈÛÛ\]\œË™]ÛÜšË[\›™][™[XZ[
Kˆ›ÚXš][™ÈH\ÙHÙˆÛÜœÜ˜]H[XZ[›Üˆ\œÛÛ˜[\œÜÙ\È\ÈHÝ[™\™Û]\ÙHÛÛZ[™YÚ][ˆ[ˆUT—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH\ÚXØ[ÙXÝ\š]HÝ[™\™
ŠˆX[ÈÚ]\ÚXØ[˜\œšY\œËšY[ÈÝ\™Z[[˜ÙHÜˆZ[[™ÈXØÙ\ÜÈÛÛ›ÛË›ÝH\ÙHÙˆ[XZ[XØÛÝ[Ë—ˆ
ˆ
ŠŠH[ˆÛ˜›Ø\™[™ËÓÙ™˜›Ø\™[™È›ØÙY\™JŠˆ\ÈHÝ™\˜[›ÝÈÙˆÙ[ÛÛZ[™ÈÜˆ\ÛZ\ÜÚ[™ÈH[\ÞYYKˆ[ÝYÚHUT\ÈÚYÛ™Y
™\š[™ÊˆÛ˜›Ø\™[™ËHÜXÚYšXÈØÝ[Y[ÚYÛ™Y\ÈHUT—ˆ
ˆ
ŠÊH[ˆ[˜ÚY[™\ÜÛœÙHÛXÞJŠˆ\ØÜšX™\ÈH\Ù\È[™™\ÜÛœÚXš[]Y\È›ÜˆÛÛZ[š[™È[™\˜YXØ][™È[ˆXÝ]™HÙXÝ\š]Hœ™XXÚ›ÝHZ[H\ØYÙH[\È›Üˆ[\ÞYY\Ëˆ‹ˆKˆLŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ[˜[^™\È]È\ÝÜšXØ[Ý]\ÝXØ[]H[™]\›Z[™\È]\™H\ÈHÉHÜÜÚXš[]H]HÜš]XØ[\™Ø\™H˜Z[\™HØØÝ\œÈ[ˆHXZ[ˆ›ÙXÝ[ÛˆÙ\™\œÈ\š[™ÈHÛÝ\œÙHÙˆH™^YX\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È‘TÕ\ØÜšX™\ÈH]X[]]]™HYX\Ý\™H\ÙYÈ\ØÜšX™H\ÈÉHÜÜÚXš[]H˜\ÙYÛˆ\ÝÝ]\ÝXØ[]OÈ‹ˆÜ[ÛœÎˆÂˆJH^ÜÝ\™H˜XÝÜˆ‹ˆŠHÙ]™\š]H˜[šÚ[™È‹ˆÊHZÙ[ZÛÙ‹ˆ‘
H›Ø˜Xš[]H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H›Ø˜Xš[]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ›Ø˜Xš[]H\ÈH]X[]]]™HYX\Ý\™H^™\ÜÙY\ÈH\˜Ù[YÙH
K™ËˆÉJHÜˆ\ÈH˜[YH™]ÙY[ˆ[™KØ[Ý[]YÛˆ\ÝÜšXØ[]H[™™X[Ý]\ÝXØ[œ™\]Y[˜ÚY\ÈÈ]\›Z[™HHX][X]XØ[™XÚ\Ú[ÛˆÙˆ[ˆ]™[ØØÝ\œš[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ™\™\Ù[ÈH\˜Ù[YÙHÙˆÜÜÈÜˆ[XYÙH][ˆ\ÜÙ]ÝY™™\œÈYHÈHÙXÝ\š]H[˜ÚY[
K™ËˆYˆHÙ\™\ˆ\È›ÛÙYHQˆÛÝ[™HL	HÙˆ]È˜[YJK—ˆ
ˆ
ŠŠHHÙ]™\š]H˜[šÚ[™ÊŠˆ]˜[X]\ÈHÙ]™\š]HÙˆH[\XÝÚÝ[H]™[ØØÝ\‹]Ù\È›Ý^™\ÜÈHÝ]\ÝXØ[œ™\]Y[˜ÞHÙˆØØÝ\œ™[˜ÙK—ˆ
ˆ
ŠÊHZÙ[ZÛÙ
Šˆ\È\XØ[HH
œ]X[]]]™JˆYX\Ý\™H\ÙY[ˆÝXš™XÝ]™Hš\ÚÈ[˜[\Ú\ËÙ[ˆ^™\ÜÙYÚ]\ØÜš\]™H\›\ÈÝXÚ\È	ÚYÚ	Ë	ÛYY][IÈÜˆ	ÛÝÉË˜]\ˆ[ˆÚ]™XÚ\ÙH\ÝÜšXØ[\˜Ù[YÙH]Kˆ‹ˆKˆLÎˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HX[˜YÙ\ˆ\ÈÛÛ™XÝ[™ÈHš\ÚÈ\ÜÙ\ÜÛY[ÙˆH\™\\HÛÝYÙ\šXÙH›ÝšY\ˆÈÚXÚHÛÛ\[žH[[™ÈÈÝ]ÛÝ\˜ÙHHÝÜ˜YÙHÙˆÙ[œÚ]]™H]KˆHX[˜YÙ\ˆ™\]Y\ÝÈœ›ÛHHÝ\Y\ˆHZ[]\È[™]šY[˜ÙHÙˆH[\›˜[ÙXÝ\š]H]Y]È]ÛÛ™XÝYˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ™\™\Ù[ÈHš[X\žHØš™XÝ]™HÚ[ˆ™\]Y\Ý[™È[\›˜[]Y]]šY[˜ÙHœ›ÛHH\™\\HÝ\Y\È‹ˆÜ[ÛœÎˆÂˆJH™\šYšXØ][ÛˆÙˆÛÛ\X[˜ÙHÚ]HÝ\Y\‰ÜÈÝÛˆ[\›˜[ÙXÝ\š]HÝ[™\™È‹ˆŠH™]šY]ÈÙˆH™[™Ü‰ÜÈÛY[\Ý‹ˆÊH]\›Z[˜][ÛˆÙˆH™[™Ü‰ÜÈ›Ùš]X\™Ú[œÈ‹ˆ‘
H]˜[X][ÛˆÙˆH^\›˜[™X][™ØØ\HÈ™YXÙHÝ™\˜[[™\˜Xš[]Y\È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH™\šYšXØ][ÛˆÙˆÛÛ\X[˜ÙHÚ]HÝ\Y\‰ÜÈÝÛˆ[\›˜[ÙXÝ\š]HÝ[™\™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[\›˜[]Y]]šY[˜ÙHÙ\™\ÈÈ[[ÛœÝ˜]H]HÝ\Y\ˆXÝX[H™\ÜXÝÈ]ÈÝÛˆXÛ\™YÜ\˜][Û˜[ÛÛ›ÛÈ[™Ý[™\™Ë[œÝ\š[™ÈÛÛœÚ\Ý[˜ÞH[™Z[HY\™[˜ÙHÈH[\›˜[ÙXÝ\š]HÛXÚY\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHÛY[\Ý
ŠˆØ[ˆ™H\ÙY[›ÜˆÛÛ[Y\˜ÚX[Üˆ™\]][Û˜[™Y™\™[˜Ù\Ë]Ù\È›Ý›ÝšYH[žHXÚšXØ[›ÛÙˆÙˆHY™™XÝ]™[™\ÜÈÙˆHÙXÝ\š]HÛÛ›ÛË—ˆ
ˆ
ŠÊH›Ùš]X\™Ú[œÊŠˆ\™H\™[Hš[˜[˜ÚX[[™ÛÛ[Y\˜ÚX[Y]šXÜË›Ý™[]˜[›Üˆ]˜[X][™ÈHÝ\Y\‰ÜÈÞX™\œÙXÝ\š]HÜÝ\™K—ˆ
ˆ
Š‘
HH]˜[X][ÛˆÙˆ^\›˜[™X]ÊŠˆ\È[\Ü[›Üˆ[™\œÝ[™[™ÈHš\ÚÈÛÛ^][\›˜[]Y]ÈÜXÚYšXØ[H[˜[^™HHÝ\Y\‰ÜÈ[\›˜[ÛÛ›ÛË›ÝÙ[™\šXÈ^\›˜[™X]Ëˆ‹ˆKˆMˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHš[˜[˜ÚX[[œÝ]][ÛˆØ[ÈÈ[\[Y[[ˆY˜[˜ÙYš\ÚËX\ÜÙ\ÜÛY[Y]Ù]Ü\˜]\È[ˆ™X[[YH[™Ú]Ý][\œ\[ÛœËÛÛœÝ[H›ÝšY[™È[[Y]žH[™\]Y]HÈ[ÝÈHÜ™Ø[š^˜][ÛˆÈ[œÝ[H]XÝ[™™\ÜÛ™È[Y\™Ú[™È™X]ÈÜˆÛÛ™šYÝ\˜][Ûˆ[›ÛX[Y\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\›H‘TÕ\ØÜšX™\È\ÈÛÛ[[Ý\Ë[˜[ZXÈš\ÚËX\ÜÙ\ÜÛY[Y]ÙÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ[˜[\Ú\È‹ˆŠH[˜ÚY[™\ÜÛœÙH‹ˆÊH\š[ÙXÈ™]šY]È‹ˆ‘
HÛÛ[[Ý\È\ÜÙ\ÜÛY[‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÛÛ[[Ý\È\ÜÙ\ÜÛY[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÛÛ[[Ý\È\ÜÙ\ÜÛY[
ÜˆÛÛ[[Ý\Èš\ÚÈ]˜[X][ÛŠHÛÛœÝ[H[Ûš]ÜœË[ˆ™X[[YKHÛÛ\X[˜ÙKÛÛ™šYÝ\˜][ÛœÈ[™ÙXÝ\š]HÜÝ\™K[ÝÚ[™È[[YYX]H]XÝ[ÛœÈ[ˆYÚH[˜[ZXÈÛÛ^Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ[˜[\Ú\ÊŠˆ\ÈHÙ[™\šXÈXXÜ›ÜØÛÜXÈ\›H][˜ÛY\ÈHY[YšXØ][Ûˆ[™]˜[X][ÛˆÙˆš\ÚÜË]Ù\È›Ý[š[œÚXØ[H[\HH™X[][YK[š[\œ\YXÝ]š]K—ˆ
ˆ
ŠÊH\š[ÙXÈ™]šY]ÊŠˆØØÝ\œÈ]™YYš[™Y[\˜[È
K™Ëˆ[›X[ÜˆÙ[ZKX[›X[
H[™\ÈÝ]XË›Ý›ÝšY[™È™X[][YH]K—ˆ
ˆ
ŠŠH[˜ÚY[™\ÜÛœÙJŠˆ\ÈH\™[H™XXÝ]™HXÝ]š]H]šYÙÙ\œÈÛ›HY\ˆ[ˆ[˜ÚY[\È[™XYH™Y[ˆ]XÝYÈ]\È›ÝH™]™[]™KÙ]XÝ]™HY]ÙÙˆÛÛ[[Ý\Èš\ÚÈ\ÜÙ\ÜÛY[ˆ‹ˆKˆMNˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[ÎˆHÛÛ\[žHXÚY\ÈÈ[™ØYÙH[ˆ^\›˜[UÙ\šXÙH›ÝšY\ˆ›ÜˆH]™[ÜY[ÙˆH™]È[\›˜[]›Ü›KˆÈ]›ÚYYØ[[™Ü\˜][Û˜[Z\Ý[™\œÝ[™[™ÜËHÛÛ\[žH™YYÈH›Ü›X[ØÝ[Y[]ÜXÚYšY\È[ˆ]Z[H^XÝÙ\šXÙ\ÈÈ™H›ÝšYYH[]™\žHZ[\ÝÛ™\ËHÛÛ\][Ûˆ[Y[[™\È[™H\ÜÛØÚX]YÛÜÝÈ›ÜˆXXÚ\ÙHÙˆH›Ú™XÝˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆYÜ™Y[Y[‘TÕ\ØÜšX™\È\È\HÙˆ]Z[YÜ\˜][Û˜[ØÝ[Y[È‹ˆÜ[ÛœÎˆÂˆJHX\Ý\ˆÙ\šXÙ\ÈYÜ™Y[Y[
TÐJH‹ˆŠHÙ\šXÙH]™[YÜ™Y[Y[
ÓJH‹ˆÊHY[[Ü˜[™[HÙˆYÜ™Y[Y[
SÐJH‹ˆ‘
HÝ][Y[ÙˆÛÜšÈ
ÓÕÊH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÝ][Y[ÙˆÛÜšÈ
ÓÕÊJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÓÕÈ
Ý][Y[ÙˆÛÜšÊH\ÈH]Z[YÜ\˜][Û˜[ØÝ[Y[]Yš[™\ÈHÝ\Y\‰ÜÈ[]™\˜X›\ËH™XÚ\ÙHXY[™\ËHXÝ]š]Y\ÈÈ™H\™›Ü›YYH™\]Z\™[Y[È[™H\ÜÛØÚX]YÛÜÝÈ›ÜˆHÚ[™ÛHÜXÚYšXÈ›Ú™XÝ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[ˆTÐH
X\Ý\ˆÙ\šXÙ\ÈYÜ™Y[Y[
JŠˆ\ÝX›\Ú\ÈHÙ[™\˜[YØ[[™ÛÛ˜XÝX[\›\È]Ú[ÛÝ™\›ˆH]\™HÛÛ[Y\˜ÚX[™[][ÛœÚ\È™]ÙY[ˆH\Y\Ë]Ù\È›ÝÛÛZ[ˆHÜ\˜][Û˜[]Z[È[™ÜXÚYšXÈÛÜÝÈÙˆHÚ[™ÛHÜXÚYšXÈ›Ú™XÝ
ÚXÚ\™HYš[™Y[ˆHÝXœÙ\]Y[ÓÕÜÈ\ÜÛØÚX]YÚ]HTÐJK—ˆ
ˆ
ŠÊH[ˆSÐH
Y[[Ü˜[™[HÙˆYÜ™Y[Y[
JŠˆ\ØÜšX™\ÈHÙ[™\˜[ÛÛÜ\˜][Ûˆ[™ÛÛX›Ü˜][Ûˆ[\È™]ÙY[ˆ[]Y\Ë]Ù\È›Ý›ØÝ\ÈÛˆHÜXÚYšXÈÛÙØ\™KY]™[ÜY[[]™\˜X›\ËÜ\˜][Û˜[ÛÜÝÈ[™XY[™\Ë—ˆ
ˆ
ŠŠH[ˆÓH
Ù\šXÙH]™[YÜ™Y[Y[
JŠˆYš[™\ÈHÛÛ[[Ý\Ë\Ù\šXÙH\™›Ü›X[˜ÙHY]šXÜÈ
K™Ëˆ\[YKÝ\Ü™\ÜÛœÙH[Y\ÊHÛ˜ÙHHÞ\Ý[H\ÈXÝ]™K›ÝHZ[\ÝÛ™\È[™[]™\˜X›\ÈÙˆH[š]X[]™[ÜY[\ÙKˆ‹ˆKˆMŽˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH\ÚYÛˆÙˆH™]ÈÛÜœÜ˜]H]HÙ[\‹HÙXÝ\š]H\˜Ú]XÝXÚY\ÈÈ]šYHH[\™HÚ]H[ÈÛÛ˜Ù[šXÈ\™X\ÈÜˆ›Û™\È
K™Ëˆ^\›˜[X›XÈ\™XK™XÙ\[Û‹YZ[š\Ý˜]]™HÙ™šXÙ\Ë[™š[˜[HH›ÝXÝYÙ\™\ˆ›ÛÛJK\Z[™È›ÙÜ™\ÜÚ]™[H[Ü™H™\ÝšXÝ]™HXØÙ\ÜÈÛÛ›ÛÈ\ÈÛ™HY˜[˜Ù\ÈÝØ\™H[\›˜[\™XKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈHXZ[ˆ\œÜÙHÙˆ\È›Ûš[™È\ÚYÛˆÙˆH\ÚXØ[Y™[œÙ\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH™YXÙHH[\[Y[][ÛˆÛÜÝÈÙˆH\ÚXØ[ÙXÝ\š]HÞ\Ý[\È‹ˆŠHÚ[\YžHH\˜Ú]XÝ\˜[›ÛÜˆ[ˆ[™HXZ[[˜[˜ÙHÙˆHÚ]IÜÈ™[Z\Ù\È‹ˆÊH[˜Ü™X\ÙHHš\ÝX[[\XÝ[™Y\Ý]XÈ\X[ÙˆHÛÜœÜ˜]HØ[\\È‹ˆ‘
HÈX^[Z^™HHXØÙ\ÜÈÛÛ›ÛÈ[™›ÝXÝ[Ûˆ›ÜˆH[ÜÝÙXÝ\™H[™Üš]XØ[\™X\È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÈX^[Z^™HHXØÙ\ÜÈÛÛ›ÛÈ[™›ÝXÝ[Ûˆ›ÜˆH[ÜÝÙXÝ\™H[™Üš]XØ[\™X\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH	Þ›Ûš[™ÉÈÜˆ]š\Ú[Ûˆ[ÈÛÛ˜Ù[šXÈ\ÚXØ[\ÙXÝ\š]H›Û™\È
H	ÑY™[œÙKZ[‹Q\	ÈÛÛ˜Ù\
H[œÝ\™\È]HÛÛ\[žIÜÈ[ÜÝÜš]XØ[[™˜[XX›H™\ÛÝ\˜Ù\È
ÝXÚ\ÈHÙ\™\ˆ›ÛÛJH\™HÝ\œ›Ý[™YžH][\H\ÚXØ[[™ÙÚXØ[˜\œšY\œËX^[Z^š[™È]]Üš^˜][ÛˆÛÛ›Û[™XZÚ[™È[˜]]Üš^™Y[\Ú[Ûˆ^™[Y[HÛÛ\^—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH›Û™HÙYÛY[][ÛŠŠˆ\ÝX[H[˜Ü™X\Ù\ÈHÝ™\˜[\ÚXØ[\ÙXÝ\š]HÛÜÝÈÚ[˜ÙH]™\]Z\™\È][\Hš[ÛY]šXÈ™XY\œË[\›˜[XØÙ\ÜÈÛÛ›Û™\ÝX[\È
HÛÛ›Û›Ü›Y\›HØ[YH
›X[˜\
ŠH[™™Z[™›Ü˜ÙYØ[È\ˆ›Û™K—ˆ
ˆ
ŠÊHY\Ý]XÜÊŠˆ\™H\œ™[]˜[ÈHš[X\žHØš™XÝ]™\ÈÙˆÞX™\œÙXÝ\š]H[™\ÚXØ[\š\ÚÈZ]YØ][Û‹—ˆ
ˆ
ŠŠH›Ûš[™ÊŠˆXÝX[HXZÙ\ÈHZ[[™ÉÜÈ›ÛÜˆ[ˆ[Ü™HÛÛ\^›ÝÚ[\\‹ˆ‹ˆKˆMÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ’˜\ÛÛˆ[™™YYUÜXÚX[\ÝÈ]Ù[H[››Ý˜][ÛœÈË\™H\ÚÙYÚ][œÝ\š[™È]HÙXÝ\™H˜\Ù[[™HÙˆ[ÛÜœÜ˜]HÛÜšÜÝ][ÛœÈ™[XZ[œÈ[XÝÛÛœÚ\Ý[[™Ù\È›Ý[™\™ÛÈ[˜]]Üš^™Y[\˜][ÛœÈÜˆ]šX][ÛœÈÝ™\ˆ[YKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÚš\]Y\ÈÛÝ[‘TÕ[[HXÚY]™H\ÈÛØ[[ˆ[ˆ]]ÛX]YY™šXÚY[[™ØØ[X›HØ^OÈ‹ˆÜ[ÛœÎˆÂˆJH\ÙHHÚ[™ÝÜÈ\]HÙ\šXÙHÚ]Ý][žH™]™[]™H\Ý[™ÈÜˆ˜[Y][Ûˆ›ØÙ\ÜÈ‹ˆŠH™[H^Û\Ú]™[HÛˆ\š[ÙXÈ[]š\\ÈØØ[œÈÈ]XÝÚ[™Ù\ÈÈHÞ\Ý[HÛÛ™šYÝ\˜][Ûˆ‹ˆÊHX[X[HÚXÚÈXXÚÛÜšÜÝ][Ûˆ]H[™ÙˆXXÚ[ÛÈš[™]šX][ÛœÈœ›ÛHH˜\ÙHÛÛ™šYÝ\˜][Ûˆ‹ˆ‘
H[\[Y[]]ÛX][Ûˆ^X›ÛÚÜÈ
K™Ëˆ›ÝYÚ[œÚX›KÚYˆÜˆY˜[˜ÙYÜ›Ý\ÛXÞJHÈÛÛœÝ[H\H[™™\šYžHHÙ][™ÜÈ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[\[Y[]]ÛX][Ûˆ^X›ÛÚÜÈÈÛÛœÝ[H\H[™™\šYžHHÙ][™ÜÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH\ÙHÙˆ^X›ÛÚÜÈ[™[™œ˜\ÝXÝ\™H\ÈÛÙH
XPÊHÜˆÛÛ™šYÝ\˜][ÛˆX[˜YÙ[Y[ÛÛÈ
ÝXÚ\È[œÚX›K\]ÜˆYXØ]YÔÜÊH[ÝÜÈYš[š[™ÈH\Ú\™YÙXÝ\™HÝ]H
˜\Ù[[™JK\Z[™È][ˆ[ˆ]]ÛX]YØ^HÈÝ\Ø[™ÈÙˆÛÜšÜÝ][ÛœË[™[œÝ[H]XÝ[™ÈÜˆÛÜœ™XÝ[™È[žH]šX][ÛœÈ
šY
HžH™\ÝÜš[™ÈH]]Üš^™YÙ][™ÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÚ[™ÝÜÈ\]JŠˆ\È[™[Y[[›ÜˆÙXÝ\š]H]Ú\Ë]Ù\È›Ý[™H\Z[™ÈÜˆ[Ûš]Üš[™ÈHÛÛ\X[˜ÙHÙˆÛÛ\^ÛÛ™šYÝ\˜][ÛœÈÜˆØØ[ÛÜœÜ˜]HÛXÚY\È
K™ËˆTÐˆ\ØX›[™Ë\ÜÝÛÜ™[\ÊK—ˆ
ˆ
ŠÊHH[ÛHX[X[ÚXÚÊŠˆ\È^™[Y[H[™Y™šXÚY[›Û™HÈ[X[ˆ\œ›Ü‹[™X]™\ÈYÙH[YHÚ[™ÝÜÈ[ˆÚXÚHÞ\Ý[\ÈØ[ˆ™[XZ[ˆ[™\˜X›HÜˆ›Û‹XÛÛ\X[—ˆ
ˆ
ŠŠH˜Y][Û˜[[]š\\ÊŠˆ]XÝÈÛ›ÝÛˆX[XÚ[Ý\ÈÛÙØ\™H
X[Ø\™JK]Ù\È›ÝÚXÚÈHÛÛ\X[˜ÙHÜˆ]šX][ÛœÈÙˆYÚ][X]HÞ\Ý[HÛÛ™šYÝ\˜][ÛˆÙ][™ÜÈ
K™Ëˆ›Û\ˆ\›Z\ÜÚ[ÛœË\ØX›[™ÈÙˆ[œÙXÝ\™HÙ\šXÙ\ÊKˆ‹ˆKˆNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ‘^[Z[š[™ÈHYÚ\Û]]™H[™ØØ\HÙˆH[š]YÝ]\È™YØ\™[™Èš]˜XÞH[™H›ÝXÝ[ÛˆÙˆ\œÛÛ˜[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ]È™\™\Ù[ÈHÙ[ZÛ›ÝÛˆ^[\HÙˆH	ÚÜš^›Û[	È\œÛÛ˜[Y]H™YÝ[][Û‹™\žHÚ[Z[\ˆ[ˆ]Èœ›ØY\ÜXÝ[H\›ØXÚÈH]\›ÜX[ˆÑÈ‹ˆÜ[ÛœÎˆÂˆJHÒHÔÈ
^[Y[Ø\™[™\ÝžH]HÙXÝ\š]HÝ[™\™
H‹ˆŠH’TÓPH
™Y\˜[[™›Ü›X][ÛˆÙXÝ\š]HX[˜YÙ[Y[XÝ
H‹ˆÊHÐÔH
Ø[Y›Ü›šXHÛÛœÝ[Y\ˆš]˜XÞHXÝ
H‹ˆ‘
HÓH
Ü˜[[KSXXÚP›[^HXÝ
H‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÐÔH
Ø[Y›Ü›šXHÛÛœÝ[Y\ˆš]˜XÞHXÝ
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
ŠÐÔJŠˆ\ÈHØ[Y›Ü›šXHÝ]H]È]ÝX\˜[Y\Èœ›ØYš]˜XÞK\›ÝXÝ[ÛˆšYÚÈÈÛÛœÝ[Y\œËˆ\ÝZÙHHÑ‹]\ÈÛÛœÚY\™YH	ÚÜš^›Û[	È™YÝ[][Ûˆ™XØ]\ÙH]\Y\È[šY›Ü›[H™YØ\™\ÜÈÙˆH[™\ÝžHÙXÝÜˆ[ˆÚXÚHÛÛ\[žHÜ\˜]\È
›ÝšYYÙ\Z[ˆ™]™[YHÜˆ]K]›Û[YH™\]Z\™[Y[È\™HY]
K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÒHÔÊŠˆ\È›ÝHÝ]HÜˆ™Y\˜[]Ë]Hš]˜]HÙXÝ\š]HÝ[™\™YÜ™YY\ÛˆžHHXZ[ˆ^[Y[™]ÛÜšÜÈ›ÜˆH›ÝXÝ[ÛˆÙˆÜ™Y]Ø\™˜[œØXÝ[ÛœË—ˆ
ˆ
ŠŠH’TÓPJŠˆ\ÈHTÈ™Y\˜[]ÈY™\ÜÙY^Û\Ú]™[HÈ™Y\˜[ÛÝ™\››Y[YÙ[˜ÚY\È[™Z\ˆÛÛ˜XÝÜœË›ÝHÜš^›Û[™YÝ[][Ûˆ›Üˆš]˜]HÛÛœÝ[Y\œË—ˆ
ˆ
Š‘
HÓJŠˆ\ÈHÛ\ÜÚXÈ^[\HÙˆ	Ý™\XØ[	È™YÝ[][Û‹Ú[˜ÙH]\Y\ÈÛ›HÈHÜXÚYšXÈÙXÝÜŽˆHš[˜[˜ÚX[[™Ü™Y]Z[œÝ]][ÛˆÙXÝÜ‹ˆ‹ˆKˆNNˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ‘[Z[H\È\ÙˆHÛÜœÜ˜]HU\\Y[[™\È\™XÝ™\ÜÛœÚXš[]H›ÜˆÝ™\œÙYZ[™ÈHÙXÝ\™H˜[œÛZ\ÜÚ[ÛˆÙˆÛÛ™šY[X[]HÚ][ˆH™]ÛÜšË[œÝ\š[™È][Þ\Ý[\È[™]X˜\Ù\ÈšYÛÜ›Ý\ÛH™\ÜXÝH[˜Üž\[Ûˆ[™[YÜš]H›ÝØÛÛËˆÚH[ÛÈ[Ûš]ÜœÈ›Üˆ[žHXÚšXØ[[˜ÛÛœÚ\Ý[˜ÚY\È]ÛÝ[ÛÛ\›ÛZ\ÙH]H[YÜš]HÜˆš[Û]HÛÜœÜ˜]HÛXÚY\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ›ÛHÚ][ˆH]KYÛÝ™\›˜[˜ÙHœ˜[Y]ÛÜšÈÙ\È[Z[H[ÜÝZÙ[HÛÈ‹ˆÜ[ÛœÎˆÂˆJH]HÝÛ™\ˆ‹ˆŠH]HÛÛ›Û\ˆ‹ˆÊH]H›ØÙ\ÜÛÜˆ‹ˆ‘
H]HÝ\ÝÙX[ˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H]HÝ\ÝÙX[ŠŠ‹——Šˆ
Š•ÚH]	ÜÈH‘TÕ
Ð’ŽˆKŒJNŠŠˆH
Š‘]HÝ\ÝÙX[ŠŠˆ\È™\ÜÛœÚX›H›ÜˆHXÚšXØ[[™Ü\˜][Û˜[\ÜXÝÈÙˆ]HX[˜YÙ[Y[[˜ÛY[™ÈXÚšXØ[ÙXÝ\š]K[˜Üž\[Û‹˜XÚÝ\ËÙXÝ\™H˜[œÛZ\ÜÚ[Ûˆ[™ØY™YÝX\™[™ÈH[YÜš]HÙˆH]X˜\Ù\ÈXØÛÜ™[™ÈÈH]HÝÛ™\‰ÜÈ\™XÝ]™\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH]HÝÛ™\ŠŠˆ\ÈH\Ú[™\ÜÈX[˜YÙ\ˆÚÈ\ÈH[[X]H[™YØ[™\ÜÛœÚXš[]H›ÜˆH]NÈ^H\ÝX›\ÚH\Ú[™\ÜÈ™\]Z\™[Y[È[™Û\ÜÚYšXØ][ÛˆÛXÚY\Ë]È›Ý\™›Ü›HHZ[HXÚšXØ[™]ÛÜšËÙ]X˜\ÙH\ÚÜË—ˆ
ˆ
ŠŠHH]HÛÛ›Û\ŠŠˆ\ÈHYØ[[]HÜˆHÛÛ\[žH]Ù[ˆ]]\›Z[™\ÈH\œÜÙ\È[™YX[œÈÙˆ›ØÙ\ÜÚ[™È\œÛÛ˜[]K—ˆ
ˆ
ŠÊHH]H›ØÙ\ÜÛÜŠŠˆ\È[ˆ^\›˜[\™\\H[]H
K™ËˆHÛÝY›ÝšY\ŠH]›ØÙ\ÜÙ\È\œÛÛ˜[]HÛˆ™Z[ˆÙˆ[™XØÛÜ™[™ÈÈH[œÝXÝ[ÛœÈÙˆH]HÛÛ›Û\‹ˆ‹ˆKˆŒˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHš[˜[˜ÚX[][[˜][Û˜[\ÈHœ›ØYHØ]][Ý\Èš\ÚÈ\]]Kˆ[ˆ]È[\›˜[ÛÝ™\›˜[˜ÙH™YÝ[][ÛœËÝÙ]™\‹]Üš]\ÈÝÛˆÝÈ]XÚ]šX][Ûˆ]\È™\\™YÈ[ÝÈ[ˆ˜XÝXÙNˆ]XØÙ\ÈKXÛÛ[Y\˜ÙHœ˜]YÜÜÙ\ÈÙˆ\ÈL]\›ÜÈHYX\‹™X][™È[H\ÈH›Ü›X[ÛÜÝÙˆ˜Y[™ÈÛ›[™K[™\ÚÜÈX[˜YÙ[Y[ÈÝ^HÚ][ˆ]šYÝ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\›H‘TÕYš[™\È\È]™[ÙˆXØÙ\X›H]šX][ÛˆÜš][ˆÝÛˆžHHÜ™Ø[š^˜][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛœÙ\˜]]™H\›ØXÚ‹ˆŠHš\ÚÈ\]]H‹ˆÊH^ÜÝ\™H˜XÝÜˆ‹ˆ‘
Hš\ÚÈÛ\˜[˜ÙH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
Hš\ÚÈÛ\˜[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”š\ÚÈÛ\˜[˜ÙJŠˆYX\Ý\™\È
ŠšÝÈ]XÚ]šX][ÛŠŠˆœ›ÛH]ÈØš™XÝ]™\È[ˆÜ™Ø[š^˜][Ûˆ\ÈÚ[[™ÈÈ[ÝÈ[ˆ˜XÝXÙNˆ]]È[X™\œÈÛˆHš\ÚÈ\]]KÚXÚÝ^\ÈH]X[]]]™HÜšY[][Û‹ˆ[ˆHØÙ[˜\š[ÈHL]\›ÜÈHYX\ˆ\™H^XÝH]8 %HÚYÙˆHXØÙ\Y]šX][Û‹ˆÙY\]\Ý[˜Ýœ›ÛHH
Šœš\ÚÈ™\ÚÛ
Š‹H˜[YH™XÛÜ™Y[ˆHš\ÚÈ™YÚ\Ý\ˆX›Ý™HÚXÚH™\ÜÛœÙH™XÛÛY\ÈX[™]ÜžNˆÛ\˜[˜ÙHØ^\È
ŠšÝÈ]XÚ
Šˆ\ÈXØÙ\YH™\ÚÛØ^\È
ŠÚ[ŠŠˆ[ÝH]\ÝXÝ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛœÙ\˜]]™H\›ØXÚ
Šˆ\ÈHÙ[™\˜[Ý˜]YÚXÈÜšY[][Ûˆ
š\ÚËX]™\œÙJK›ÝH›Ü›X[]X[]]]™HY]šXË—ˆ
ˆ
ŠŠHš\ÚÈ\]]JŠˆ\ÈHÛÛ\[žIÜÈXXÜ›ÜØÛÜXÈÝ˜]YÚXÈ]]YH
K™Ëˆ	ÝÙHØ[È™H[››Ý˜]]™HXY\œÈžHXØÙ\[™È[Ù\˜]HXÚ›ÛÙÚXØ[š\ÚÜÉÊKÚ[HÛ\˜[˜ÙH˜[œÛ]\È\È\]]H[È™XÚ\ÙKYX\Ý\˜X›HÜ\˜][Û˜[[Z]Ë—ˆ
ˆ
ŠÊHH^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ[™XØ]\ÈH\˜Ù[YÙHÙˆÝ[X[[XYÙH][ˆ\ÜÙ]ÝY™™\œÈ[ˆHÚ[™ÛH[˜ÚY[È]Ù\È›Ý\ØÜšX™HH™Y]\›Z[™YXØÙ\X›H[Z]\ÝX›\ÚYžHÛÝ™\›˜[˜ÙKˆ‹ˆKˆŒNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ’[ˆHÛÛ\[žIÜÈš\ÚÈ™YÚ\Ý\‹H[žHœ›ÛÛ™ÙY[˜]˜Z[Xš[]HÙˆHÜ™\ˆX[˜YÙ[Y[Þ\Ý[Wˆ\ÈØ]]Ý]\ÈÈ™H\ÜÙ\ÜÙYˆ›ÜˆZYÚ[ÛËˆHUX[˜YÙ\ˆ\™ÝY\ÈHXÚ\Ú[Ûˆ™[Û™ÜÈÈH\Ú[™\ÜË™XØ]\ÙH]ÛÛ˜Ù\›œÈÜÝ™]™[YNÈHØ[\È\™XÝÜˆ™\Y\È]]\ÈHXÚšXØ[›Ø›[H[™\™Y›Ü™HU	ÜËˆ™Z]\ˆ\ÈH]]Üš]HÈXØÙ\Hš\ÚË[™YX[Ú[H›Ý[™È\[œËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈX[˜YÙ[Y[[[Y[\ÈZ\ÜÚ[™Ë[™ÚÈÚÝ[™H\Ú[YÈ‹ˆÜ[ÛœÎˆÂˆJHHÝÙ\ˆš\ÚÈ™\ÚÛ]]ÛX]XØ[HšYÙÙ\š[™ÈZ]YØ][Ûˆ‹ˆŠHHÙ^Hš\ÚÈ[™XØ]Üˆ
Ô’JKYX\Ý\š[™ÈÝÈH[žH™[™ÈÝ™\ˆ[YH‹ˆÊHHœ™\Ú]X[]]]™H[˜[\Ú\Ë^™\ÜÚ[™ÈHš\ÚÈ[ˆš[˜[˜ÚX[\›\È‹ˆ‘
HHš\ÚÈÝÛ™\ŽˆH\œÛÛˆÚ]H]]Üš]HÈXÚYH[™™HXØÛÝ[X›H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HHš\ÚÈÝÛ™\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]™\žH[žH[ˆHš\ÚÈ™YÚ\Ý\ˆ]\Ý]™H
Š›Û™H\œÛÛŠŠˆXØÛÝ[X›H›Üˆ][™HXYØÚÈ\ØÜšX™Y\ÈHÛ\ÜÚXÈÞ[\ÛHÙˆ]\œÛÛ‰ÜÈXœÙ[˜ÙNˆÛÈ[˜Ý[ÛœÈ˜]˜XÚÈ[™›ÜHXÚ\Ú[Ûˆ™Z]\ˆ\ÈHX[™]HÈZÙKˆH
Šœš\ÚÈÝÛ™\ŠŠˆÛÈ™YH[™ÜÈÙÙ]\‹[™[\™H™XÙ\ÜØ\žKˆH
Š˜]]Üš]JŠˆÈXÚYHH™X]Y[]\ËÈÚÛÜÙH™]ÙY[ˆ]›ÚY˜[œÙ™\‹Z]YØ]H[™XØÙ\[™È›Ü›X[HXØÙ\H™\ÚYX[š\ÚËˆH
Šœ™\ÛÝ\˜Ù\ÊŠˆÈØ\œžHHXÚ\Ú[ÛˆÝ]™XØ]\ÙHÛÛY[Û™HÚÈÛÛ›ÛÈ›ÈYÙ]Ø[ˆZ]YØ]H›Ý[™Ëˆ[™
Š˜XØÛÝ[Xš[]JŠˆ›ÜˆHÝ]ÛÛYKYX[š[™È™Z[™ÈH\œÛÛˆÚÈÚ[[œÝÙ\ˆYˆHš\ÚÈX]\šX[\Ù\Ëˆ\XØ[H\È\ÈH
Š˜\Ú[™\ÜÊŠˆ^XÝ]]™H˜]\ˆ[ˆHXÚšXØ[Û™K™XÚ\Ù[H™XØ]\ÙHH\›HÈ™HÙZYÚY\È\Ú[™\ÜÈ\›NÈU™[XZ[œÈHÝÛ™\ˆÙˆH
Š˜ÛÛ›Û
Š‹]\ËÙˆÚ]Ù]È[\[Y[Y›ÝÙˆHXÚ\Ú[Û‹ˆ]\ÈÛÜ›Ý[™È]H™YÚ\Ý\ˆÚÝ[XZÙHHXYØÚÈ[\ÜÜÚX›H[ˆHš\œÝXÙNˆ[ˆ[žHÚ]›ÈÝÛ™\ˆÚÝ[›Ý™HÜ[˜X›K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHHÝÙ\ˆš\ÚÈ™\ÚÛŠŠˆ\ÝX›\Ú\È
ŠÚ[ŠŠˆHš\ÚÈ]\Ý™H\ØØ[]YÈX[˜YÙ[Y[[™\™HH™\ÚÛ[™XYHÛÜšÙY™XØ]\ÙHH[žH\È[ˆH™YÚ\Ý\‹ˆ›È™\ÚÛXÚY\È[ˆH\œÛÛ‰ÜÈXÙK—ˆ
ˆ
ŠŠHÙ^Hš\ÚÈ[™XØ]ÜŽŠŠˆYX\Ý\™\È
ŠšÝÈ^ÜÝ\™H]›Û™\ÊŠˆÝ™\ˆ[YH[™\ÈH˜[XX›H[Ûš]Üš[™È[œÝ[Y[ˆ]Ø]Ú[™ÈHš\ÚÈ[Ü™HÛÜÙ[HÙ\È›Ý™X]]ˆY\ˆZYÚ[ÛÈÙHÛÝ[]™H[ˆXØÝ\˜]HÚ\ÙˆHXYØÚË—ˆ
ˆ
ŠÊHHœ™\Ú]X[]]]™H[˜[\Ú\ÎŠŠˆ›ÙXÙ\ÈH[X™\‹[™\Ý[X][™ÈH^XÝYÜÜÈÛÝ[[™YY[HXÚ\Ú[Û‹ˆ]HØÙ[˜\š[ÈÙ\È›ÝØ^H]H\ÈZ\ÜÚ[™Îˆ]Ø^\È
ŠHXÚ\Ú[Û‹[XZÙ\ŠŠˆ\ÈZ\ÜÚ[™Ë[™Û™H[Ü™H[˜[\Ú\ÈÛÝ[[ÛÈ[™\]ØZ][™È\ÜÙ\ÜÛY[——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆ][ˆš\ÚÈX[˜YÙ[Y[]™\žH[žH™YYÈ›Ý\ˆ]šX]\Ë[™]Y\Ý[ÛœÈ\ÚÈÚXÚ\ÈXœÙ[ˆH
Š™\ØÜš\[ÛŠŠˆÙˆHš\ÚË[ˆ
Š˜\ÜÙ\ÜÛY[
ŠˆÙˆZÙ[ZÛÙ[™[\XÝH
Š™X]Y[XÚ\Ú[ÛŠŠˆ[™[ˆ
Š›ÝÛ™\ŠŠˆÚÈ\ÈXØÛÝ[X›KˆÙY\\\ÛÈHÛÈ›Û\È[ÜÝÙ[ˆÛÛ™\ÙYˆH
Šœš\ÚÈÝÛ™\ŠŠˆXÚY\È[™\ÈXØÛÝ[X›H›ÜˆHš\ÚË\XØ[H[ˆH\Ú[™\ÜÈ0­ÈH
Š˜ÛÛ›ÛÝÛ™\ŠŠˆ[\[Y[È[™XZ[Z[œÈHÛÛ›Û\XØ[H[ˆHXÚšXØ[[˜Ý[Û‹ˆHÙ[™\˜[š[˜Ú\H\È]XØÛÝ[Xš[]HØ[ˆ™H[YØ]Y[ˆ^XÝ][Û‹™]™\ˆ[ˆÝ]ÛÛYKˆ‹ˆKˆŒŽˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[Îˆ’Ù[H[››Ý˜][ÛœÈÈ\ÈÙ[XÝ[™ÈH™]ÈÝ\Y\ˆ›ÜˆÛÝY\ÝÜ˜YÙHÛÛ][ÛœËˆ\È\ÙˆHÙ[XÝ[Ûˆ›ØÙ\ÜËHUX[˜YÙ\‹˜[X\š[Ë^[Z[™\ÈHÝ[X[Ý\Y\‰ÜÈ\Ýš[˜[˜ÚX[ÝXš[]KÝ\ÝÛY\ˆ™]šY]ÜÈ[™\ÝÜžHÙˆÞX™\œÙXÝ\š]H[˜ÚY[È[˜ÛÝ[\™Yˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ÜXÝÙˆHÝ\Y\‹\Ù[XÝ[Ûˆ›ØÙ\ÜÈ\È˜[X\š[ÈXZ[›HYÚYÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ\šXÙK[]™[YÜ™Y[Y[
ÓJH‹ˆŠH›Û‹Y\ØÛÜÝ\™HYÜ™Y[Y[
‘JH‹ˆÊHÝ\HÚZ[ˆ[˜[\Ú\È‹ˆ‘
HYH[YÙ[˜ÙH‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HYH[YÙ[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆYH[YÙ[˜ÙH[›Û™\ÈHÜ›ÝYÚ]˜[X][Ûˆ[™^[Z[˜][ÛˆÙˆHÝ[X[\™\\HÝ\Y\ˆ
[˜ÛY[™Èš[˜[˜Ù\Ë™\]][Û‹ÛÛ\X[˜ÙH[™ÙXÝ\š]HÜÝ\™JH™Y›Ü™HÚYÛš[™ÈHÛÛ˜XÝÈ[œÝ\™H]]YY]ÈH™\]Z\™YÝ[™\™È[™Ù\È›Ý[›ÙXÙH[˜XØÙ\X›Hš\ÚÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÙ\šXÙK[]™[YÜ™Y[Y[
ÓJJŠˆ\ÝX›\Ú\ÈHÛÛ[[Ý\È\™›Ü›X[˜ÙHY]šXÜÈ[™]˜Z[Xš[]HYÜ™YY\ÛˆÛ˜ÙHHÙ\šXÙH\È[™XYHXÝ]™K—ˆ
ˆ
ŠÊHÝ\HÚZ[ˆ[˜[\Ú\ÊŠˆ›ØÝ\Ù\ÈÛˆH][™[YÜš]HÙˆH\™Ø\™KÜÛÙØ\™HÛÛ\Û™[È[Û™ÈH[\™HÝ\HÚZ[‹›ÝÛˆHš[˜[˜ÚX[[™\ÝÜšXØ[X[ÙˆHÛÝYÝ\Y\ˆ]Ù[‹—ˆ
ˆ
ŠŠH›Û‹Y\ØÛÜÝ\™HYÜ™Y[Y[
‘JJŠˆ\ÈHYØ[YÜ™Y[Y[È›ÝXÝHÛÛ™šY[X[[™›Ü›X][ÛˆÚ\™Y›ÝHÜ›ÝYÚ]˜[X][Ûˆ[™ÛÛ›Û›ØÙY\™Kˆ‹ˆKˆŒÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ•Ú][ˆHœ˜[Y]ÛÜšÈÙˆÛÛ\X[˜ÙH[Ûš]Üš[™È[™HX[˜YÙ[Y[ÙˆYØ[™\ÜÛœÚXš[]Y\ÈÚ][ˆHÛÛ\[žKˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]^XÝHÙ\ÈHÛÛXš[™YÛÛ˜Ù\Ùˆ	ÙYH[YÙ[˜ÙIÈ[™	ÙYHØ\™IÈ™Y™\ˆÏÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ™XÝ[™È[\›˜[]Y]ÈÛˆH™YÝ[\ˆ˜\Ú\Ëˆ‹ˆŠH™]šY]Ú[™È\™\\H™[™ÜˆYÜ™Y[Y[Ëˆ‹ˆÊHZÚ[™ÈÝ\ÈÈYY]YØ[[™Ý\ˆ™\]Z\™[Y[Ëˆ‹ˆ‘
H]]ÛX]YÛÛ\X[˜ÙHÚXÚÜËˆ‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHZÚ[™ÈÝ\ÈÈYY]YØ[[™Ý\ˆ™\]Z\™[Y[ÊŠ‹——Šˆ
Š‘YH[YÙ[˜ÙHœËˆYHØ\™NˆHÜXÚX[\Ý[˜Ý[Ûˆ›Üˆ\ÜÚ[™ÈHÛÛ\PH^[NŠŠ—ˆ
ˆ
Š‘YH[YÙ[˜ÙH
S•‘TÕQÐUKÔSŠNŠŠˆ]\ÈH›Ü›X[›ØÙ\ÜÈÙˆ™\ÙX\˜Ú[˜[\Ú\ËÙ[‹X\ÜÙ\ÜÛY[[™[™\ÝYØ][Ûˆ]HÛÛ\[žH[™\ZÙ\È™Y›Ü™HXZÚ[™ÈHXÚ\Ú[ÛˆÜˆÈ\ÝX›\Ú]ÈÝÛˆÙXÝ\š]HÝZY[[™\Ëˆ]YX[œÈ™Ø]\š[™ÈH]šY[˜ÙH[™™\\š[™ÈHÜ›Ý[™‹ˆ
‘^[\\ÈÙˆYH[YÙ[˜ÙNŠˆÚ[™È˜XÚÙÜ›Ý[™ÚXÚÜÈÛˆ[\ÞYY\Ë^[Z[š[™ÈÛÝYÝ\Y\œÉÈÓÐÈˆ\HRH™\ÜÈ™Y›Ü™HÚYÛš[™ÈHÛÛ˜XÝÜš][™ÈÙXÝ\š]HÛXÚY\È
UT[˜ÚY[™\ÜÛœÙH[ŠK\™›Ü›Z[™Èš\ÚÈ\ÜÙ\ÜÛY[Ë—ˆ
ˆ
Š‘YHØ\™H
PÕÐTJNŠŠˆ]\ÈHÛÛ[[Ý\ËXÝ]™H[™šYÚ[[[\[Y[][ÛˆÙˆÜÙHXÚ\Ú[ÛœÈ[™ÛXÚY\ÈÈ]›ÚY™YÛYÙ[˜ÙH[™Z[š[Z^™H™X[[XYÙKˆ]YX[œÈ˜XÝ[™ÈÚ]ÛÛÙÙ[œÙH[™Ú[™ÈHšYÚ[™È^HžH^W‹ˆ
‘^[\\ÈÙˆYHØ\™NŠˆXÝ]™[H[œÝ[[™ÈH™[X\ÙYÙXÝ\š]H]Ú\Ë]š[™È[\ÞYY\ÈÚYÛˆ[™™\ÜXÝHUTXÝX[HÛÛ™šYÝ\š[™ÈHš\™]Ø[ÈXØÛÜ™[™ÈÈHÛXÞK›ÝXÝ[™ÈÙ\™\œÈ[ˆØÚÙY›ÛÛ\Ë——Šˆ
Š“[™[[ÛšXÈÈY[[ÜžH[H
[™Û\Ú
NŠŠ—ˆ
ˆ
Š‘YH[YÙ[˜ÙJŠˆH
‘È˜XÚÙÜ›Ý[™ÚXÚÊˆ
™]™[]™H[™\ÝYØ][Û‹Ü[›š[™ÊK—ˆ
ˆ
Š‘YHØ\™JŠˆH
‘ÈÛÜœ™XÝJˆÜˆ
‘ÈØ\™Jˆ
XÝÛÜœ™XÝH[™][]™[H\š[™ÈÜ\˜][ÛœÊK——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ›ÝÛÛ˜Ù\ÈÛÛXš[™Y\ØÜšX™H[ˆÜ™Ø[š^˜][Û‰ÜÈYØ[[™[Ü˜[™\ÜÛœÚXš[]Y\È[™Ø›YØ][ÛœÈÈ[[ÛœÝ˜]H™YÝ[]ÜžHÛÛ\X[˜ÙH
K™ËˆÑ‹TPKÒKQÔÊKˆÚÝÚ[™È]H[\ÈÙ\™HÜš][ˆ
YH[YÙ[˜ÙJH[™]^H\™HÛÛ˜Ü™][H\YY
YHØ\™JH›ÝXÝÈHÛÛ\[žH[™]È^XÝ]]™\Èœ›ÛHXØÝ\Ø][ÛœÈÙˆÜ›ÜÜÈ™YÛYÙ[˜ÙH[ˆØ\ÙHÙˆH]Hœ™XXÚ——Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛ™XÝ[™È[\›˜[]Y]ÊŠˆ\ÈHÜXÚYšXÈÛÛ›Û]™\šYšXØ][ÛˆXÝ]š]K›ÝHÝ™\˜[Yš[š][ÛˆÙˆHÝ]HÙˆ[YÙ[˜ÙKØØ\™H™\]Z\™YžH]Ë—ˆ
ˆ
ŠŠH™]šY]Ú[™ÈÝ\Y\ˆÛÛ˜XÝÊŠˆ\È\Ùˆ™[™ÜˆX[˜YÙ[Y[HÜXÚYšXÈÙXÝ\š]HÝX‹\›ØÙ\ÜÈ[™›ÝHÙ[™\˜[ÛÛ˜Ù\ÙˆÛÛ\X[˜ÙK—ˆ
ˆ
Š‘
H]]ÛX]YÛÛ\X[˜ÙHÚXÚÜÊŠˆ\™HXÚ›ÛÙÚXØ[ÛÛÈ\ÙYÈ˜XÚ[]]HÛÛ\X[˜ÙK]È›Ý^]\ÝHØ›YØ][ÛœÈÙˆ[YÙ[ÛÛ™XÝ›ÝšYY›ÜˆžHYØ[™\ÜÛœÚXš[]Y\Ëˆ‹ˆKˆˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ[œÈH[™]˜][Ûˆ\Ý[™ÈXÝ]š]HÈ]˜[X]H]È™\Ú\Ý[˜ÙHÈ^\›˜[[™[\›˜[]XÚÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆ[™]˜][Ûˆ\Ý›ÝšY\ÈH\Ý\ˆÚ]ÛÛYH\X[[™›Ü›X][ÛˆX›Ý]H\™Ù]Þ\Ý[H
ÝXÚ\È\˜Ú]XÝ\˜[]Z[ÈÜˆÝË[]™[Ü™Y[X[ÊKÚ]Ý]ÝÙ]™\ˆÜ˜[[™ÈHÛÛ\]HšY]ÈÙˆHÞ\Ý[IÜÈ[\›˜[YXÚ[š\Û\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[šÛ›ÝÛˆ[š\›Û›Y[
›XÚÈ›Þ
H‹ˆŠH\X[HÛ›ÝÛˆ[š\›Û›Y[
Ü™^H›Þ
H‹ˆÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
H‹ˆ‘
H›Ý[™\žH\Ý[™È‹ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\X[HÛ›ÝÛˆ[š\›Û›Y[
Ü™^H›Þ
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆH
Šœ\X[HÛ›ÝÛˆ[š\›Û›Y[
Šˆ\ÝH\Ý\ˆ\ÈÚ]™[ˆ[Z]Y[™›Ü›X][ÛŽˆ\XØ[H[ˆÜ™[˜\žH\Ù\‰ÜÈÜ™Y[X[ËÜˆ[ˆÝ][™H™]ÛÜšÈXYÜ˜[Kˆ]\È^XÝHÚ]HØÙ[˜\š[È\ØÜšX™\ËˆH›Ü›X]Ú[][]\ÈHÛÈ[ÜÝ™X[\ÝXÈ™X[]ÛÜ›Ø\Ù\ËH
Š›X[XÚ[Ý\È[œÚY\ŠŠˆ[™H
Š™^\›˜[]XÚÙ\ˆÚÈ\È[™XYHÝÛ[ˆ[ˆXØÛÝ[
Šˆ›ÝYÚ\Ú[™Ë[™ÛÛ˜Ù[˜]\ÈHÛÛ˜XÝY[YHÛˆÚ]H\š[Y]\ˆÙ\È›Ý›ÝXÝˆš]š[YÙH\ØØ[][Û‹]\˜[[Ý™[Y[[™H™\Ú[Y[˜ÙHÙˆ[\›˜[ÛÛ›ÛË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[šÛ›ÝÛˆ[š\›Û›Y[
›XÚÈ›Þ
NŠŠˆH\Ý\ˆ\ÈÚ]™[ˆ
Š››ÊŠˆ[™›Ü›X][Ûˆ[™]\Ý\ØÛÝ™\ˆ]™\ž][™È[Û™Kˆ\ÈÛÛ˜YXÝÈHØÙ[˜\š[ËÚXÚ^XÚ]HY[[ÛœÈ\˜Ú]XÝ\˜[]Z[È[™Ü™Y[X[È[™YÝ™\ˆ[ˆY˜[˜ÙK—ˆ
ˆ
ŠÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
NŠŠˆ[™ÈÝ™\ˆ
Š™]™\ž][™ÊŠˆ
ÛÝ\˜ÙHÛÙKØÝ[Y[][Û‹YZ[š\Ý˜]]™HXØÛÝ[ÊKˆ\È[ÛÈÛÛ˜YXÝÈHØÙ[˜\š[ËÚXÚ^™\ÜÛH[\ÈÝ]HÛÛ\]HšY]ÈÙˆH[\›˜[YXÚ[š\Û\Ë—ˆ
ˆ
Š‘
H›Ý[™\žH\Ý[™ÎŠŠˆ\ÈH
ŠœÛÙØ\™JŠˆ\Ý[™ÈXÚš\]YH]ÚXÚÜÈH›ÙÜ˜[IÜÈ™Z]š[Üˆ]H[Z]ÈÙˆH[ÝÙY[œ]˜[™Ù\Ëˆ]\È›ÝHØ]YÛÜžHÙˆ[™]˜][Ûˆ\Ý[™\ÈH\Ý˜XÝÜˆœ›ÛHHY™™\™[šY[[\™[K——Šˆ
Š‘^[H˜\ŠŠˆÛÛ\PH\È›ÜY›XÚËÝÚ]KÙÜ™^H›Þˆ[ˆHÖLMÌHØš™XÝ]™\È
ØšˆKJHH™YH›Ü›X]È\™HØ[Y
Š[šÛ›ÝÛˆ[š\›Û›Y[
Š‹
Šœ\X[HÛ›ÝÛˆ[š\›Û›Y[
Šˆ[™
ŠšÛ›ÝÛˆ[š\›Û›Y[
Š‹ˆX\›ˆHX\[™È[ˆ›Ý\™XÝ[ÛœË™XØ]\ÙHH]Y\Ý[ÛˆX^H\ÙHZ]\ˆX™[ˆ[šÛ›ÝÛˆH›XÚÈ›Þ
›È[™›Ü›X][ÛŠK\X[HÛ›ÝÛˆHÜ™^H›Þ
\X[[™›Ü›X][ÛŠKÛ›ÝÛˆHÚ]H›Þ
[[™›Ü›X][ÛŠKˆ‹ˆKˆNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHXÚ›ÛÙÞHÛÛ\[žHÛÛXÝÈ[™›ØÙ\ÜÙ\ÈÙ[œÚ]]™H]HÈÙ™™\ˆ\œÛÛ˜[^™YÙ\šXÙ\Ë[™]\ÝYš[™HHÛÝ™\›˜[˜ÙH[™ÛÛ\X[˜ÙH›Û\È™\]Z\™YžHÝ\œ™[š]˜XÞH™YÝ[][ÛœÈ
K™ËˆÑŠKˆ‹ˆ]Y\Ý[ÛŽˆ’[ˆHÛÛ^Ùˆ]Hš]˜XÞHÛÛ\X[˜ÙKÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈH›ÛHÙˆH]HÛÛ›Û\È‹ˆÜ[ÛœÎˆÂˆJHH^\›˜[]Y]Üˆ™\ÜÛœÚX›H›Üˆš]˜XÞHÛÛ\X[˜ÙH[™Y\™[˜ÙHÛÛ›ÛËˆ‹ˆŠHH\ÚXØ[[™]šYX[ÚÜÙH\œÛÛ˜[]H\È™Z[™È›ØÙ\ÜÙY[™[™Yˆ‹ˆÊHH[]HÜˆ\œÛÛˆ™\ÜÛœÚX›H›Üˆ]\›Z[š[™ÈH\œÜÙ\È[™YX[œÈÙˆ]H›ØÙ\ÜÚ[™Ëˆ‹ˆ‘
HHXÚšXØ[Ü™Ø[š^˜][Ûˆ\ÚÙYÚ]H\ÚXØ[ÝÜ˜YÙH[™™][[ÛˆÙˆH]Kˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHH[]HÜˆ\œÛÛˆ™\ÜÛœÚX›H›Üˆ]\›Z[š[™ÈH\œÜÙ\È[™YX[œÈÙˆ]H›ØÙ\ÜÚ[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘]HÛÛ›Û\ŠŠˆ\ÈH\H]XÚY\È›ÜˆÚ]™X\ÛÛˆ
\œÜÙJH[™[ˆÚ]Ø^H
YX[œÊHH\œÛÛ˜[]HÙˆ]HÝXš™XÝÈ\ÈÛÛXÝY[™›ØÙ\ÜÙY—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ\ØÜšX™\ÈH›ÛHÙˆ[ˆ^\›˜[]Y]ÜˆÜˆÛÛ\X[˜ÙHÙ™šXÙ\‹—ˆ
ˆ
ŠŠJŠˆ™Y™\œÈÈH
Š‘]HÝXš™XÝ
Š‹K™KˆH\ÚXØ[\œÛÛˆÚÈÝÛœÈH\œÛÛ˜[]K—ˆ
ˆ
Š‘
JŠˆÛÜœ™\ÜÛ™ÈXZ[›HÈH
Š‘]HÝ\ÝÙX[ŠŠˆÜˆH
Š‘]H›ØÙ\ÜÛÜŠŠˆ[YØ]YÈHXÚšXØ[\ÜXÝÈÙˆ\ÚXØ[ÝÜ˜YÙH[™ÙXÝ\š]Kˆ‚ˆKˆŽˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ›Ü›X[HYš[™\È]ÈY\˜\˜ÚY\ÈÙˆ™\ÜÛœÚXš[]H›Üˆ[YÛš[™ÈÙXÝ\š]H[œÈÚ]Ý™\˜[š[˜[˜ÚX[[™Ü\˜][Û˜[Øš™XÝ]™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚÈYš[™\È[ˆÜ™Ø[š^˜][Û‰ÜÈÝ˜]YÚXÈ\™XÝ[Ûˆ[™ÛXÚY\È[™ÛÈH[[X]HXÚ\Ú[Û‹[XZÚ[™È]]Üš]KÙ[ˆ™[Z[™ÈÛˆHÝ\ÜÙˆÜXÚX[^™YÜ›Ý\È›ÜˆÜš]XØ[[™›Ü›X][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞHÛÝ[˜Ú[È‹ˆŠHÜ\˜][Û˜[X[˜YÙ[Y[‹ˆÊHÝ˜]YÚXÈÛÛ[Z]Y\È‹ˆ‘
HÛÝ™\›˜[˜ÙH›Ø\™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÛÝ™\›˜[˜ÙH›Ø\™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘ÛÝ™\›˜[˜ÙH›Ø\™
Šˆ
Üˆ›Ø\™Ùˆ\™XÝÜœÊH\ÈHÝ\™[YHXÚ\Ú[Û‹[XZÚ[™È]]Üš]H[™Yš[™\ÈHÙ[™\˜[Ý˜]YÚXÈØš™XÝ]™\ËHš\ÚÈ\]]H[™YÚ[]™[ÛÜœÜ˜]HÛXÚY\ËXÝ[™È\ÈH[[X]HXÚ\Ú[Û‹[XZÙ\ˆ›ÜˆHÜ™Ø[š^˜][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛXÞHÛÝ[˜Ú[ÊŠˆX^H\ÜÚ\ÝÜˆ[™›Y[˜ÙHH]™[ÜY[Ùˆ[\›˜[ÛXÚY\Ë]È›ÝÛ[[X]HÛÝ™\›˜[˜ÙH]]Üš]K—ˆ
ˆ
ŠŠHÜ\˜][Û˜[X[˜YÙ[Y[
ŠˆX[ÈÚ]H^XÝ][Ûˆ[™Z[HX[˜YÙ[Y[Ùˆ\Ú[™\ÜÈ›ØÙ\ÜÙ\Ë›ÝÜ[]™[Ý˜]YÚXÈ›Ü›][][Û‹—ˆ
ˆ
ŠÊHÝ˜]YÚXÈÛÛ[Z]Y\ÊŠˆÝ\ÜH›Ø\™Ùˆ\™XÝÜœÈžH›ÝšY[™È]H[™[˜[\Ú\Ë]È›ÝÛ]]Û›Û[Ý\Èš[˜[XÚ\Ú[Û‹[XZÚ[™È]]Üš]Kˆ‚ˆKˆÎˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žIÜÈ›Ø\™Ùˆ\™XÝÜœÈ™\]Z\™\È^\›˜[Ý\Ü[™XÚšXØ[]˜[X][ÛœÈ[ˆÜ™\ˆÈXÚYHÛˆÛÛ\^X]\œÈ]™\]Z\™HH™\žHYÚ]™[Ùˆ›Ù™\ÜÚ[Û˜[\ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È[]Y\È\È™\ÜÛœÚX›H›Üˆ›ÝšY[™È]Z[Y[˜[\Ù\È[™™XÛÛ[Y[™][ÛœÈÈHÛÝ™\›˜[˜ÙH›Ø\™È[˜X›H[™›Ü›YYXÚ\Ú[ÛœË\XÝ[\›H[ˆ\™X\È]™\]Z\™HÜXÚX[^™YÛ›ÝÛYÙOÈ‹ˆÜ[ÛœÎˆÂˆJHX[˜YÙ[Y[Ü›Ý\È‹ˆŠH^XÝ]]™HX[\È‹ˆÊHÛÛ[Z]Y\È‹ˆ‘
HYš\ÛÜžHÛÝ[˜Ú[È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÛÛ[Z]Y\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠÛÛ[Z]Y\ÊŠ‹ÝXÚ\ÈH]Y]ÛÛ[Z]YHÜˆHÙXÝ\š]HÝY\š[™ÈÛÛ[Z]YK\™HÛÛ\ÜÙYÙˆÝXš™XÝ[X]\ˆ^\ÈÈ[˜[^™HÜXÚYšXÈ\ÜÝY\È[ˆ]Z[
K™Ëˆš[˜[˜ÚX[]Y]Ë™YÝ[]ÜžHÛÛ\X[˜ÙKÞX™\ˆš\ÚÜÊH[™›ÜÜÙHÛÛ˜Ü™]H™XÛÛ[Y[™][ÛœÈÈH›Ø\™Ùˆ\™XÝÜœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHX[˜YÙ[Y[Ü›Ý\ÊŠˆ[™
ŠŠH^XÝ]]™HX[\ÊŠˆ\™H›ØÝ\ÙYÛˆX[˜YÙ\šX[^XÝ][ÛˆÜˆHÜ™[˜\žH^XÝ]]™HXY\œÚ\ÙˆHÛÛ\[žK˜]\ˆ[ˆÛˆH]Z[Y[˜[\Ú\È]Ý\ÜÈÛÝ™\›˜[˜ÙH[Û™K—ˆ
ˆ
Š‘
HYš\ÛÜžHÛÝ[˜Ú[ÊŠˆÙ™™\ˆÙ[™\˜[YÚ[]™[^\›˜[Ü[š[ÛœË]È›ÝÛÛ™XÝHÝXÝ\™YY\Y]™\È[™[\›˜[ÛÛ›ÛÈ\XØ[Ùˆ›Ü›X[ÛÛ[Z]Y\Ëˆ‚ˆKˆŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žIÜÈÙ\™\ˆ\È[ˆ\Ý[X]YÚ[™ÛHÜÜÈ^XÝ[˜ÞH
ÓJHÙˆ	MKYHÈ[ˆÜ\˜][Û˜[˜Z[\™KˆH\Ý[X]Y[›X[˜]HÙˆØØÝ\œ™[˜ÙH
T“ÊH›Üˆ\È\HÙˆ˜Z[\™H\ÈŒH[Y\È\ˆYX\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈH\Ý[X]Y[›X[ÜÜÈ^XÝ[˜ÞH
SJH›Üˆ\Èš\ÚÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH	ML‹ˆŠH	KL‹ˆÊH	MK‹ˆ‘
H	ML‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH	KL
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝ
Ð’ŽˆKŒŠNŠŠˆHSH
[›X[^™YÜÜÈ^XÝ[˜ÞJH\ÈØ[Ý[]YžH][\Z[™ÈHÓH
Ú[™ÛHÜÜÈ^XÝ[˜ÞJHžHHT“È
[›X[^™Y˜]HÙˆØØÝ\œ™[˜ÙJKˆÚ][ˆÓHÙˆ	MK[™[ˆT“ÈÙˆŒKHSH\]X[È
Š‰KL
Šˆ
	MK
ˆŒHH	KL
Kˆ\È˜[YH™\™\Ù[ÈH\Ý[X]Y[›X[š[˜[˜ÚX[ÜÜÈHÜ™Ø[š^˜][Ûˆ^XÝÈÈ[˜Ý\ˆYHÈ\ÙHÜ\˜][Û˜[˜Z[\™\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH	ML
Šˆ\È[˜ÛÜœ™XÝ™XØ]\ÙH]™\Ý[Èœ›ÛHHX][X]XØ[\œ›Üˆ
K™ËˆZ\ÝZÙ[›H][\Z[™ÈžHŒJK—ˆ
ˆ
ŠÊH	MK
Šˆ\È[˜ÛÜœ™XÝ™XØ]\ÙH]™\™\Ù[ÈHÛÜÝÙˆHÚ[™ÛHÜÜÈ
ÓJK›ÝH[›X[^™YÜÜÈÙZYÚYÛˆHYX\›H˜\Ú\È
T“ÈHŒJK—ˆ
ˆ
Š‘
H	ML
Šˆ\È[˜ÛÜœ™XÝ™XØ]\ÙH]™\Ý[Èœ›ÛH[ˆ\œ›Û™[Ý\È][\XØ][Ûˆ
K™Ëˆ][\Z[™ÈžHL[œÝXYÙˆžHŒJK——Šˆ
Š‘›ØÝ\ÙYZ[šKQ^[\NŠŠˆYˆHÛÛ\[žH\ÈHÙ\™\ˆ]˜Z[ÈÛˆ]™\˜YÙHÛ˜ÙH]™\žHLYX\œÈ
T“ÈHŒJH[™XXÚ˜Z[\™HÛÜÝÈ	MK
ÓJKH[›™Y[›X[ÛÜÝ
SJH\È	KLˆ	KL\ÈH^XÝY[›X[ÜÜÈ
Š˜™Y›Ü™JŠˆHÛÛ›Û[™]\È›Ý[ˆ]]ÛX]XÈÜ[™[™ÈØ\ˆHÛÜœ™XÝÛÛ\\š\ÛÛˆ\È™]ÙY[ˆHÛÛ›Û	ÜÈ
Š˜[›X[^™YÛÜÝ
Šˆ[™H
ŠSH™YXÝ[ÛŠŠˆ][]™\œÎˆYˆ]œš[™ÜÈHSHœ›ÛH	KLÝÛˆÈ	Ì]]›ÚYÈ[ˆ^XÝY	KŒHYX\‹[™]ÈšXÙH]\Ý™HÙZYÚYYØZ[œÝ]™[™Yš]ˆ™YÝ[]ÜžH]Y\Ë›Û‹Yš[˜[˜ÚX[[\XÝÈ
™\]][Û‹\œÛÛ˜[ØY™]JH[™HÜ™Ø[š^˜][Û‰ÜÈš\ÚÈ\]]H[ˆ[\ˆHXÚ\Ú[Û‹[™X^H\ÝYžHÜ[™[™È[Ü™H[ˆH˜\™H\š]Y]XÈÝYÙÙ\ÝËˆ‚ˆKˆŽNˆÂˆÜXÎˆ\Ú[™\ÜÈÛÛ[Z]H	ˆ\Ø\Ý\ˆ™XÛÝ™\žH‹ˆØÙ[˜\š[Îˆ•ÈYX\Ý\™H™[XXš[]H[™[ˆXZ[[˜[˜ÙHÞXÛ\ÈÙˆUÞ\Ý[\ËÙXÝ\š]H[™Ú[™Y\š[™ÈX[\È[Ûš]Üˆ˜\š[Ý\È[YHY]šXÜÈ\ÜÛØÚX]YÚ]˜Z[\™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚY]šXÈYš[™\ÈH]™\˜YÙHÜ\˜][Û˜[\[YHÙˆHÞ\Ý[HÜˆ\™Ø\™HÛÛ\Û™[™]ÙY[ˆHØØÝ\œ™[˜ÙHÙˆÛÈÛÛœÙXÝ]]™H˜Z[\™\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHUˆ
YX[ˆ[YHÈ™\Z\ŠH‹ˆŠHÜ\˜][™È[YH‹ˆÊH˜Z[\™H˜]H‹ˆ‘
HU‘ˆ
YX[ˆ[YH™]ÙY[ˆ˜Z[\™\ÊH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HU‘ˆ
YX[ˆ[YH™]ÙY[ˆ˜Z[\™\ÊJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š“U‘ŠŠˆ™\™\Ù[ÈH\Ý[X]Y]™\˜YÙH\š[Ù\š[™ÈÚXÚH]šXÙH[˜Ý[ÛœÈÚ]Ý][\œ\[Ûˆ™Y›Ü™H™\Ù[[™ÈHY™XÝÜˆ˜Z[\™Kˆ]\ÈHÙ^H[™XØ]ÜˆÙˆ\™Ø\™H™[XXš[]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHUˆ
YX[ˆ[YHÈ™\Z\ŠJŠˆYX\Ý\™\ÈHÜYYÙˆ™\ÜÛœÙK[™XØ][™ÈH]™\˜YÙH[YH™YYYÈ™\Z\ˆ[™™\ÝÜ™H›Ü\ˆ[˜Ý[Ûš[™ÈÙˆHÛÛ\Û™[Y\ˆ]\Èœ›ÚÙ[‹—ˆ
ˆ
ŠŠHÜ\˜][™È[YJŠˆY\™[H[™XØ]\ÈHÝ[Ý\œÈ\š[™ÈÚXÚHXXÚ[™H\È™[XZ[™YÝÙ\™YÛ‹Ú]Ý]™[][™È]È˜Z[\™\Ë—ˆ
ˆ
ŠÊH˜Z[\™H˜]JŠˆ^™\ÜÙ\ÈHÝ]\ÝXØ[œ™\]Y[˜ÞHÚ]ÚXÚ˜Z[\™\ÈØØÝ\ˆ[ˆHÚ]™[ˆ[YH[\˜[›ÝH[YH[\˜[™]ÙY[ˆ[Kˆ‚ˆKˆÌˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][ÛˆYš[™\È\Ø\Ý\ˆ™XÛÝ™\žH\˜[Y]\œÈÈ[œÝ\™H]˜XÚÝ\ÛÜY\ÈÙˆ]ÈÜš]XØ[Þ\Ý[\È\™H\™›Ü›YYÚ]HÛÜœ™XÝ[YHœ™\]Y[˜ÞKˆ‹ˆ]Y\Ý[ÛŽˆ’[ˆ\Ø\Ý\ˆ™XÛÝ™\žH[›š[™È
”
KÚXÚ\›HYš[™\ÈHX^[][HÛ\˜X›H\š[ÙÙˆ[YH\š[™ÈÚXÚ]HÛÝ[™HÜÝYHÈHÙ\š[Ý\È[˜ÚY[™Y›Ü™H]\ÝXÝ]™[H[\XÝÈH\Ú[™\ÜÏÈ‹ˆÜ[ÛœÎˆÂˆJH”È
™XÛÝ™\žHÚ[Øš™XÝ]™JH‹ˆŠHÓH
Ù\šXÙH]™[YÜ™Y[Y[
H‹ˆÊH•È
™XÛÝ™\žH[YHØš™XÝ]™JH‹ˆ‘
HU‘ˆ
YX[ˆ[YH™]ÙY[ˆ˜Z[\™\ÊH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH”È
™XÛÝ™\žHÚ[Øš™XÝ]™JJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š””È
™XÛÝ™\žHÚ[Øš™XÝ]™JJŠˆ\ÝX›\Ú\ÈHX^[][HXØÙ\X›H[[Ý[Ùˆ]H
^™\ÜÙY[ˆ[YKK™ËˆÝ\œÈÜˆ^\ÊH]HÜ™Ø[š^˜][Ûˆ\ÈÚ[[™ÈÈÜÙH™Y›Ü™HÝY™™\š[™È\œ™\\˜X›H[XYÙKˆ]]\›Z[™\ÈÝÈœ™\]Y[HÈ\™›Ü›H˜XÚÝ\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÓJŠˆYš[™\ÈHÙ\šXÙH\™›Ü›X[˜ÙHY]šXÜÈYÜ™YY\ÛˆÚ]H›ÝšY\‹—ˆ
ˆ
ŠÊH•È
™XÛÝ™\žH[YHØš™XÝ]™JJŠˆ[™XØ]\ÈHX^[][H[YH[ÝÙYÈ™\ÝÜ™HH[\œ\YÙ\šXÙH[™XZÙH]Ü\˜][Û˜[YØZ[ˆ
X^[][HÝÛ[YJK—ˆ
ˆ
Š‘
HU‘ŠŠˆ™\™\Ù[ÈH]™\˜YÙHÜ\˜][Û˜[\[YHÙˆ\™Ø\™H™]ÙY[ˆÛÈÛÛœÙXÝ]]™H˜Z[\™\Ëˆ‚ˆKˆÌNˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ•H[\›˜[ÛÛ›ÛÛÛ[Z]YHÙˆH\™ÙH][[˜][Û˜[YY]È\š[ÙXØ[HÈ[˜[^™HHÙXÝ\š]HÜÝ\™K\™\\Hš\ÚÈX[˜YÙ[Y[[™YØ[ÛÛ\X[˜ÙHÙˆH[\™HÛÛ\[žKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈHš[X\žH›ÛHÙˆ[ˆ]Y]ÛÛ[Z]YH[ˆHÛÛ^ÙˆÞX™\œÙXÝ\š]OÈ‹ˆÜ[ÛœÎˆÂˆJH\™XÝHX[˜YÙHHÛÜœÜ˜]HUÜ\˜][Û˜[X[\ÈÈ™\ÛÛ™H]™\žHÚ[™ÛHÙXÝ\š]H[˜ÚY[ˆ‹ˆŠH[™ØYÙH[ˆÛÛ\^[œÝ\˜[˜ÙHÛXÞH™YÛÝX][ÛœÈÚ]ÞX™\ˆÛÝ™\˜YÙH›ÝšY\œËˆ‹ˆÊHÝ™\œÙYH[™›Ü›X][ÛˆÙXÝ\š]Hš\ÚÜÈ[™[œÝ\™H™YÝ[]ÜžH[™ÛÛ›ÛÛÛ\X[˜ÙKˆ‹ˆ‘
HX[˜YÙHH˜XÝXØ[^XÝ][Ûˆ[™\ÚXØ[[\[Y[][ÛˆÙˆÞX™\ˆY™[œÙHYX\Ý\™\Ëˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÝ™\œÙYH[™›Ü›X][ÛˆÙXÝ\š]Hš\ÚÜÈ[™[œÝ\™H™YÝ[]ÜžH[™ÛÛ›ÛÛÛ\X[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š]Y]ÛÛ[Z]YJŠˆ›ÝšY\È[™\[™[Ý˜]YÚXÈÝ™\œÚYÚÙˆÛÜœÜ˜]Hš\ÚÈX[˜YÙ[Y[[Ûš]Üš[™ÈHY™™XÝ]™[™\ÜÈÙˆ[\›˜[ÛÛ›ÛÈ[™[œÝ\š[™È]HÜ™Ø[š^˜][ÛˆÛÛ\Y\ÈÚ]Ý\œ™[™YÝ[][ÛœÈ[™YØ[™\]Z\™[Y[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ[™
Š‘
JŠˆ\™HÜ\˜][Û˜[™\ÜÛœÚXš[]Y\ÈÙˆHZ[HX[˜YÙ[Y[ÙˆU\\Y[ËHÒTÓÈ[™Þ\Ý[HYZ[š\Ý˜]ÜœË›ÝÙˆ[ˆ[™\[™[ÛÝ™\›˜[˜ÙHÛÛ›ÛÛÛ[Z]YK—ˆ
ˆ
ŠŠJŠˆ™YÛÝX][™ÈÞX™\ˆ[œÝ\˜[˜ÙHÛXÚY\È\ÈH\ÚÈ[YØ]YÈÜ\˜][Û˜[š\ÚÈX[˜YÙ[Y[ÜˆHš[˜[˜ÙKÜ›ØÝ\™[Y[Ù™šXÙKˆ‚ˆKˆÌŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ‘]šY\È[˜[^š[™ÈH™XÙ[š\ÚÈ™\Ü[™Ø]YÛÜš^™\ÈHš\ÚÜÈ˜\ÙYÛˆZ\ˆ›Ø˜Xš[]H
ZÙ[ZÛÙ
H[™Ý[X[[\XÝÚ]Ý]\ÜÚYÛš[™ÈÜXÚYšXÈš[˜[˜ÚX[˜[Y\Ëˆ\È\›ØXÚ[È\ÈX[Hš[Üš]^™HÚXÚš\ÚÜÈÈY™\ÜÈš\œÝ]Ù\È›ÝÙ™™\ˆ]Z[Y[Û™]\žH\Ý[X]\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚY]Ù\È]šY\Ú[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH™\ÚYX[š\ÚÈ[˜[\Ú\È‹ˆŠH]X[]]]™Hš\ÚÈ\ÜÙ\ÜÛY[‹ˆÊH]X[]]]™Hš\ÚÈ\ÜÙ\ÜÛY[‹ˆ‘
H™X]™XÝÜˆ[˜[\Ú\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH]X[]]]™Hš\ÚÈ\ÜÙ\ÜÛY[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]X[]]]™Hš\ÚÈ\ÜÙ\ÜÛY[Ü™\œÈ[™š[Üš]^™\Èš\ÚÜÈ˜\ÙYÛˆZ\ˆ›Ø˜Xš[]KÛZÙ[ZÛÙ[™\Ý[X]Y[\XÝ\Ú[™È\ØÜš\]™HØØ[\È
K™ËˆYÚYY][KÝÊHÚ]Ý][\š[™ÈÜXÚYšXÈš[˜[˜ÚX[Üˆ™XÚ\ÙH]X[]]]™H˜[Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH™\ÚYX[š\ÚÈ[˜[\Ú\ÊŠˆ]˜[X]\ÈHš\ÚÈ™[XZ[š[™ÈY\ˆH\XØ][ÛˆÙˆÙXÝ\š]HÛÛ›ÛË—ˆ
ˆ
ŠÊH]X[]]]™Hš\ÚÈ\ÜÙ\ÜÛY[
Šˆ™\]Z\™\È[\š[™È™XÚ\ÙH[Û™]\žH]H[™[Y\šXØ[Ø[Ý[][ÛœÈ
K™ËˆÓKT“ËSJH]\™H[\™[HXœÙ[[ˆHØÙ[˜\š[Ë—ˆ
ˆ
Š‘
H™X]™XÝÜˆ[˜[\Ú\ÊŠˆ›ØÝ\Ù\ÈÛˆHXÚšXØ[™XÝÜœÈ[™]È\ÙYžHH™X]ÈÝšZÙHHÞ\Ý[K›ÝÛˆHÙ[™\˜[š[Üš]^˜][ÛˆÙˆÜ™Ø[š^˜][Û˜[š\ÚÜËˆ‚ˆKˆÌÎˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHX[XÚ[Ý\È\Ù\ˆ[[™ÈÈØ]\ˆÙ[œÚ]]™H[™›Ü›X][ÛˆX›Ý]HÛÜœÜ˜]H[™œ˜\ÝXÝ\™HžH[\˜XÝ[™È\™XÝHÚ]]ÈÛÛ\]\ˆÞ\Ý[\ËÝÙ]™\ˆš\ÚÚ[™ÈšYÙÙ\š[™È[\›\ÈÜˆX]š[™Èš\ÚX›H˜XÙ\ÈÙˆZ\ˆ[\Ú[ÛˆXÝ]š]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È™Y™\œÈÈHY]ÙÛÙÞH[ˆÚXÚ[ˆ]XÚÙ\ˆ[\˜XÝÈ\™XÝHÚ]H\™Ù]Þ\Ý[\ÈÈØ]\ˆ[™›Ü›X][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHXÝ]™H™XÛÛ›˜Z\ÜØ[˜ÙH‹ˆŠHÔÒS•
Ü[‹TÛÝ\˜ÙH[[YÙ[˜ÙJH‹ˆÊH™]ÛÜšÈ[[Y\˜][Ûˆ‹ˆ‘
H\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHXÝ]™H™XÛÛ›˜Z\ÜØ[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆXÝ]™H™XÛÛ›˜Z\ÜØ[˜ÙH[›Û™\È\™XÝ[\˜XÝ[ÛˆÚ]HšXÝ[IÜÈÞ\Ý[\È
K™ËˆÜØØ[›š[™Ë˜[›™\ˆÜ˜X˜š[™Ë[™ÈÝÙY\ÊK[™]š]X›HX]š[™È˜XÙ\È[ˆÞ\Ý[HÙÜËš\™]Ø[ÈÜˆQËÒTË[™š\ÚÚ[™È[\[™ÈHY™[œÙHX[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÔÒS•
Ü[‹\ÛÝ\˜ÙH[[YÙ[˜ÙJJŠˆ\ÈH\ÜÚ]™HÛÛXÝ[ÛˆXÚš\]YH˜\ÙYÛˆX›XÛHXØÙ\ÜÚX›HÛÝ\˜Ù\È[™]X˜\Ù\ÈÛˆH[\›™]—ˆ
ˆ
ŠÊH™]ÛÜšÈ[[Y\˜][ÛŠŠˆ\ÈHÜXÚYšXÈXÝ]š]H]\È\ÙˆXÝ]™HØØ[›š[™Ë]HØÙ[˜\š[È\ÚÜÈ›ÜˆHÙ[™\˜[\›H][™XØ]\È\™XÝ[\˜XÝ[Ûˆ›Üˆ]HÛÛXÝ[Û‹—ˆ
ˆ
Š‘
H\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙJŠˆØ]\œÈ[™›Ü›X][ÛˆÚ]Ý]]™\ˆ[\˜XÝ[™ÈÚ]Üˆ\™XÝHÝXÚ[™ÈH\™Ù]	ÜÈ[™œ˜\ÝXÝ\™H
K™ËˆÛÛœÝ[[™ÈX›XÈ”È™XÛÜ™ÊK™YXÚ[™ÈÈ™\›ÈHš\ÚÈÙˆ[\[™ÈHšXÝ[Kˆ‚ˆKˆÍˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆH]\›ÜX[ˆÜ™Ø[š^˜][Ûˆ\È\][™È]È[™›Ü›X][ÛˆX[˜YÙ[Y[Þ\Ý[\ÈÈ[YÛˆ[HÝšXÝHÚ]H™YÝ[]ÜžH™\]Z\™[Y[ÈÙˆH]\›ÜX[ˆ[š[Û‰ÜÈÑˆ™YØ\™[™ÈH›ØÙ\ÜÚ[™ÈÙˆ\Ù\œÉÈ\œÛÛ˜[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[™[Y[[š[˜Ú\HÙ\ÈH]\›ÜX[ˆ[š[Û‰ÜÈÙ[™\˜[]H›ÝXÝ[Ûˆ™YÝ[][Ûˆ
ÑŠH\Û™YØ\™[™ÈHÛÛXÝ[Ûˆ[™›ØÙ\ÜÚ[™ÈÙˆ\œÛÛ˜[]OÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ[[Ý\È[Ûš]Üš[™È‹ˆŠH]H™][[Ûˆ‹ˆÊH]H[˜Üž\[Ûˆ‹ˆ‘
H[™›Ü›YYÛÛœÙ[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[™›Ü›YYÛÛœÙ[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÙˆH›Ý\ˆÜ[ÛœË
Šš[™›Ü›YYÛÛœÙ[
Šˆ\ÈHÛ›HÛ™H]ÛÛ˜Ù\›œÈH
Š›]Ù[™\ÜÊŠˆÙˆ›ØÙ\ÜÚ[™ËˆHÑˆ™\]Z\™\ÈH]HÝXš™XÝÈÛ›ÝÈÚÈ›ØÙ\ÜÙ\ÈZ\ˆ]K›ÜˆÚ]\œÜÙ\È[™›ÜˆÝÈÛ™Ë›ÝYÚH›ÝXÙH[ˆÛX\ˆ[™XØÙ\ÜÚX›H[™ÝXYÙK[™]ÛÛœÙ[Ú\™H]\ÈH˜\Ú\ÈÚÜÙ[‹™Hœ™Y[HÚ]™[‹ÜXÚYšXË[™›Ü›YY[™\ÈX\ÞHÈÚ]˜]È\È]Ø\ÈÈÚ]™KˆÛ™HÛ\šYšXØ][ÛˆÛÜš^[™ÈÝ˜ZYÚ]Ø^K™XØ]\ÙH]X]\œÈ›Ý[ˆH^[H[™[ˆ˜XÝXÙNˆÛÛœÙ[
Šš\È›ÝHÛ›H]Ù[˜\Ú\ÊŠ‹ˆ\XÛHˆ\ÝÈÚ^8 %ÛÛœÙ[\™›Ü›X[˜ÙHÙˆHÛÛ˜XÝYØ[Ø›YØ][Û‹š][[\™\ÝËX›XÈ\ÚËYÚ][X]H[\™\ÝÈ8 %[™[ˆHÜ™X]X[žHÛÜœÜ˜]H›ØÙ\ÜÚ[™ÈXÝ]š]Y\ÈH˜\Ú\È\ÈHÛÛ˜XÝÜˆHYØ[Ø›YØ][Û‹›ÝÛÛœÙ[ˆH]HÈ
Šš[™›Ü›JŠˆH]HÝXš™XÝžHÛÛ˜\Ý[Ø^\È\Y\ËÚ]]™\ˆ˜\Ú\È\ÈÚÜÙ[‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛ[[Ý\È[Ûš]Üš[™ÊŠˆ\È[ˆ\ÜÙ[X[Ü\˜][Û˜[ÙXÝ\š]H˜XÝXÙH]\È›ÝHYØ[[\ˆÙˆHÑˆÛˆHYÚ][XXÞHÙˆ]HÛÛXÝ[Û‹—ˆ
ˆ
ŠŠH]H™][[ÛŠŠˆÛÛ˜Ù\›œÈYš[š[™ÈH™][[Ûˆ\š[ÙÈÙˆÙÜÈÜˆ™XÛÜ™ËÚXÚ\ÈHXÚšXØ[\ÙˆÛÛ\X[˜ÙH]›ÝH[™[Y[[[˜X›[™Èš[˜Ú\K—ˆ
ˆ
ŠÊH]H[˜Üž\[ÛŠŠˆ\ÈHXÚšXØ[ÙXÝ\š]H™XÛÛ[Y[™][Ûˆ›Üˆ›ÝXÝ[Ûˆ
K™ËˆÙ]YÛž[Z^˜][ÛŠH]Ù\È›ÝÛÛœÝ]]HHYØ[˜\Ú\È›Üˆ]HXÜ]Z\Ú][Û‹ˆ‚ˆKˆÍNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHš\ÚÈX[˜YÙ\ˆ]\Ý\Ý[X]HÚ]HÚ]™[ˆš\ÚÈÚ[ÛÜÝHÛÛ\[žHÛˆ]™\˜YÙHÝ™\ˆHYX\‹ÛÈ]šYÝ\™HØ[ˆ[ˆ™HÛÛ\\™YÚ]HÛÜÝÙˆHÛÛ›Û]ÛÝ[™YXÙH]ˆ^H]™HH\ÜÙ]	ÜÈ˜[YKH\˜Ù[YÙHÙˆ˜[YHHÚ[™ÛH]™[ÛÝ[\Ý›ÞK[™[ˆYX\œÈÙˆ]™[\ÝÜžKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ]X[]Y\È\™H™YYYÈØ[Ý[]HSH
[›X[ÜÜÈ^XÝ[˜ÞJOÈ
ÚÛÜÙHÛÊH‹ˆÜ[ÛœÎˆÂˆJHÓH
Ú[™ÛHÜÜÈ^XÝ[˜ÞJKHÜÜÈ^XÝYœ›ÛHÛ™H]™[‹ˆŠHU‘ˆ
YX[ˆ[YH™]ÙY[ˆ˜Z[\™\ÊKH]™\˜YÙH[YH™]ÙY[ˆÛÈÛÛœÙXÝ]]™H˜Z[\™\È‹ˆÊHT“È
[›X[˜]HÙˆØØÝ\œ™[˜ÙJKÝÈX[žH[Y\ÈHYX\ˆH]™[\È^XÝY‹ˆ‘
H•È
™XÛÝ™\žH[YHØš™XÝ]™JKHX^[][HÛ\˜X›H\š[ÙÙˆ[˜]˜Z[Xš[]H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\œÈ\™H
ŠJJŠˆ[™
ŠÊJŠ‹——Šˆ
Š•ÚH^H\™HÛÜœ™XÝŠŠˆ]X[]]]™Hš\ÚÈ[˜[\Ú\È™\ÝÈÛˆHÚZ[ˆÙˆ™YH›Ü›][\Ë[™SH\È]Èš[˜[™\Ý[ˆ
Š”ÓHH\ÜÙ]˜[YH0åÈQŠŠ‹Ú\™HH
™^ÜÝ\™H˜XÝÜŠˆ\ÈH\˜Ù[YÙHÙˆ˜[YHHÚ[™ÛH]™[ÛÝ[\Ý›ÞKˆ
ŠSHHÓH0åÈT“ÊŠ‹Ú\™HH
˜[›X[˜]HÙˆØØÝ\œ™[˜ÙJˆ\ÈÝÈX[žH[Y\ÈHYX\ˆH]™[\È^XÝY[™X^H\™™XÝHÙ[™HHœ˜XÝ[ÛŽˆ[ˆ]™[^XÝYÛ˜ÙH]™\žH[ˆYX\œÈ\È[ˆT“ÈÙˆŒKˆHÛÛ˜Ü™]H^[\NˆH8 «ŒÙ\™\‹Hš\™H]ÛÝ[\Ý›ÞHL	HÙˆ]
QˆJH^XÝYÛ˜ÙH]™\žHÙ[KYš]™HYX\œÈ
T“ÈŒ
HÚ]™\ÈÓHH8 «L[™SHH8 «\ˆYX\‹ˆ[™\È\ÈÚ\™HH[X™\ˆ™XÛÛY\ÈHXÚ\Ú[ÛŽˆHÛÛ›ÛÛÜÝ[™È8 «KHYX\ˆ\ÈÛÜ]Û™HÛÜÝ[™È8 «K\È›Ý™XØ]\ÙH
Š››ÈÛÛ›ÛÚÝ[ÛÜÝ[Ü™H[ˆH^XÝYÜÜÈ]]›ÚYÊŠ‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHU‘ŽŠŠˆYX\Ý\™\È
Šš\™Ø\™H™[XXš[]JŠ‹H]™\˜YÙHÜ\˜][™È[YH™]ÙY[ˆÛÈ˜Z[\™\Ë[™Ù\™\ÈÈ[ˆXZ[[˜[˜ÙH[™™\XÙ[Y[ˆ]Ø[ˆ[\Ý[X]HHT“ÈÙˆH˜Z[\™K]]\È›ÝH\›H[ˆH›Ü›][K—ˆ
ˆ
Š‘
H•ÎŠŠˆ™[Û™ÜÈÈ
Š˜\Ú[™\ÜÈÛÛ[Z]JŠˆ[™Ý]\ÈÝÈ]ZXÚÛHHÙ\šXÙH]\Ý™H]˜Z[X›HYØZ[ˆY\ˆH\Ü\[Û‹ˆ]\ÈH™XÛÝ™\žHØš™XÝ]™K›Ý[ˆ[™Ü™YY[Ùˆ[›X[^XÝYÜÜË——Šˆ
Š‘^[H˜\ŠŠˆX\›ˆH›Ü›][\È[ˆHÜ™\ˆ^HÚZ[ˆÙÙ]\‹™XØ]\ÙH]Y\Ý[ÛœÈÙ[ˆ\ÚÈ›ÜˆH[\›YYX]HÝ\ˆ
Š”ÓHHUˆ0åÈQŠŠ‹[ˆ
ŠSHHÓH0åÈT“ÊŠ‹ˆØ]Ú›ÜˆÛÈ™XÝ\œš[™ÈZ\ÝZÙ\ÎˆT“È
Šš\È›ÝHÚÛH[X™\ŠŠ‹[™H˜\™H]™[]\Ý™H^™\ÜÙY\ÈHœ˜XÝ[ÛŽÈ[™HÛÛ[Z]HXÜ›Ûž[\Ë
Š”•È[™”ÊŠ‹™]™\ˆ[\ˆ\ÙHØ[Ý[][ÛœËˆ™[Y[X™\ˆš[˜[H]SH\ÈH[œÝ[Y[Ùˆ
Šœ]X[]]]™JŠˆ[˜[\Ú\ËÚXÚ^™\ÜÙ\Èš\ÚÈ[ˆ[Û™^KÚ[H
Šœ]X[]]]™JŠˆ[˜[\Ú\ÈXÙ\È]ÛˆHZÙ[ZÛÙX[™Z[\XÝX]š^Ú]›ÈšYÝ\™\Ëˆ‹ˆKˆÍŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ’[ˆHš[˜[˜ÚX[Ü™Ø[š^˜][Û‹HÛÝ™\›˜[˜ÙHX[H]\ÝÙ[XÝHÝXÝ\™Yš\ÚÈ[˜[\Ú\ÈY]Ù]\ÜÛØÚX]\È™XÚ\ÙH[Y\šXØ[˜[Y\Ë[Û™]\žHY]šXÜÈ[™ÛÜÝ[™XØ]ÜœÈÚ]H]XÝY›Ø˜Xš[]Y\È[™[\XÝËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈ[˜[\Ú\ÈY]Ù[›Û™\È\ÜÚYÛš[™È[Y\šXØ[˜[Y\È˜\ÙYÛˆš[˜[˜ÚX[]KÝXÚ\ÈÛÜÝÈÜˆÝ[X[ÜÜÙ\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH]X[]]]™Hš\ÚÈ[˜[\Ú\È‹ˆŠH]X[]]]™Hš\ÚÈ[˜[\Ú\È‹ˆÊH[›X[^™YÜÜÈ^XÝ[˜ÞH‹ˆ‘
Hš\ÚÈX]š^‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH]X[]]]™Hš\ÚÈ[˜[\Ú\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]X[]]]™Hš\ÚÈ[˜[\Ú\È\ÜÚYÛœÈ™XÚ\ÙH[Û™]\žH˜[Y\È[™ÛÛ˜Ü™]H[Y\šXØ[]HÈ[[[Y[ÈÙˆš\ÚË[˜X›[™ÈXØÝ\˜]HÛÜÝX™[™Yš][˜[\Ù\È
“ÒJHÙˆHÙXÝ\š]HÛÛ›ÛÈÈ™H[\[Y[Y—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH]X[]]]™Hš\ÚÈ[˜[\Ú\ÊŠˆ\È˜\ÙYÛˆÝXš™XÝ]™HYÛY[È[™^\Ü[š[ÛœÈ^™\ÜÙY›ÝYÚ\ØÜš\]™H[™]X[]]]™HØØ[\È
K™ËˆYÚYY][KÝÊK—ˆ
ˆ
ŠÊH[›X[^™YÜÜÈ^XÝ[˜ÞH
SJJŠˆ\ÈHÜXÚYšXÈØ[Ý[][Ûˆ[™XØ]Üˆ™\Ý[[™Èœ›ÛH]X[]]]™H[˜[\Ú\Ë›ÝH[\™H[˜[\Ú\ÈY]ÙÛÙÞK—ˆ
ˆ
Š‘
Hš\ÚÈX]š^
Šˆ\ÈHÜ˜\XØ[Y\ØÜš\]™HÛÛ\ÝX[H\ÙY[ˆ]X[]]]™H[˜[\Ú\ÈÈX\›Ø˜Xš[]H[™[\XÝˆ‚ˆKˆÍÎˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[Îˆ”š\Y\›Z[˜]\ÈHÛÛ˜XÝÚ]H™[™Üˆ]˜[ˆ]È]H[˜[]XÜÈÙ\šXÙH›Üˆš]™HYX\œËˆH™[™ÜˆÝ[ÛÈÛÜY\ÈÙˆÝ\ÝÛY\ˆ]H[ˆ]È˜XÚÝ\ËÛÛYHÙˆ]ÈXØÛÝ[È\™HÝ[XÝ]™H[ˆš\Y	ÜÈY[]H›ÝšY\‹[™ÛÈ\XØ][Ûˆ[YÜ˜][ÛœÈÝ[\ÙHTHÙ^\È\ÜÝYY[ˆ]È˜[YKˆHÛÛ˜XÝ^\™Y\ÝÙYZËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\™\\Hš\ÚÈX[˜YÙ[Y[XÝ]š]H]\Ý™HØ\œšYYÝ]›ÝÏÈ‹ˆÜ[ÛœÎˆÂˆJHYH[YÙ[˜ÙHÛˆH™[™Ü‹ÈØÝ[Y[]È\Ý™[XXš[]H‹ˆŠHHÙXÝ\š]H\ÜÙ\ÜÛY[]Y\Ý[Û›˜Z\™KÙ[ÈHÝ]ÛÚ[™È™[™Üˆ‹ˆÊH™[™ÜˆÙ™˜›Ø\™[™Ë™]›ÚÚ[™ÈXØÙ\ÜÈ[™™]\›š[™ÈÜˆ\Ý›ÞZ[™ÈH]H‹ˆ‘
HHXÚ]ÛÛ˜XÝ™[™]Ø[[™[™ÈÛÛ\][ÛˆÙˆHXÚšXØ[ZYÜ˜][Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH™[™ÜˆÙ™˜›Ø\™[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š“Ù™˜›Ø\™[™ÊŠˆ\ÈHÛÜÚ[™È\ÙHÙˆH™[™Üˆ™[][ÛœÚ\Y™XÞXÛK[™HÛ™H[ÜÝÙ[ˆY[‹YÛ™NˆHÛÛ˜XÝ[™Ë]HXØÙ\ÜÈ™[XZ[œËˆHØÙ[˜\š[È\ÝÈ™YH^ÜÝ\™\È]Ý]]™HHÚYÛ˜]\™K[™Ù™˜›Ø\™[™ÈÛÜÙ\È[HÛ™HžHÛ™KˆH
ŠœÝ[XXÝ]™HXØÛÝ[ÊŠˆ[ˆHY[]H›ÝšY\ˆ]\Ý™H\ØX›Y™XØ]\ÙHH™[™ÜˆXØÛÝ[™[Û™Ú[™ÈÈÛÛY[Û™HÚÈ›ÈÛ™Ù\ˆÛÜšÜÈ›Üˆ[ÝH\È›Ý[™È™Z[™]™Z]\ˆÛÜœÜ˜]H›ÜˆÛÛ˜XÝX[ÛÛ›ÛˆH
ŠTHÙ^\ÊŠˆ]\Ý™H™]›ÚÙY[™›Ý]Y[™H[YÜ˜][ÛœÈ™XZ[Ú][Ý\ˆÝÛˆÜ™Y[X[Îˆ^H\™HÜ™Y[X[È[ˆ]™\žHÙ[œÙK[™^H\ØØ\HÛÛ›ÛÈ\ÚYÛ™Y›Üˆ[ÜKˆH
Š™]H[ˆH™[™Ü‰ÜÈ˜XÚÝ\ÊŠˆ]\Ý™H™]\›™YÜˆ\Ý›ÞYY\ÈHÛÛ˜XÝ›ÝšY\ËÝ\ÜYžHH
Š˜Ù\YšXØ]HÙˆ\ÝXÝ[ÛŠŠ‹™XØ]\ÙHXØÛÝ[Xš[]HÝØ\™]HÝXš™XÝÈ[™H™YÝ[]ÜˆÝ^\ÈÚ]š\Y]™[ˆY\ˆH™[][ÛœÚ\[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHYH[YÙ[˜ÙNŠŠˆ\ÈH™\šYšXØ][Ûˆ\™›Ü›YY
Š˜™Y›Ü™JŠˆ[™ØYÚ[™ÈH™[™Ü‹È\ÝX›\Ú]ÈÛÛY]KÛÛ›ÛÈ[™ÛÛ\X[˜ÙKˆÚ[™È]›ÝËÚ]H™[][ÛœÚ\Ý™\‹™[[Ý™\È›ÝHÚ[™ÛHXØÙ\ÜË—ˆ
ˆ
ŠŠHÙXÝ\š]H]Y\Ý[Û›˜Z\™NŠŠˆ\ÈH
ŠœÙ[XÝ[Ûˆ[™Û™ÛÚ[™È[Ûš]Üš[™ÊŠˆ[œÝ[Y[\š[™ÈH™[][ÛœÚ\ˆ\ÚÚ[™È[ˆÝ]ÛÚ[™È™[™ÜˆÈš[Û™H[ˆ›ÙXÙ\ÈHØÝ[Y[›ÝH™]›ØØ][ÛˆÙˆ]ÈÜ™Y[X[Ë—ˆ
ˆ
Š‘
HXÚ]™[™]Ø[ŠŠˆ\ÈHÛÜœÝÚÜÝ]ˆ]^[™ÈH™[][ÛœÚ\Ú]Ý]Hœ™\Úš\ÚÈ\ÜÙ\ÜÛY[[™ÙY\È[]™H^XÝHH^ÜÝ\™\È]™YYÛÜÚ[™ËÚ]HYÙÜ˜]˜][™È˜XÝÜˆÙˆÚ[™ÈÛÈÚ]Ý]HÛÛœØÚ[Ý\ÈXÚ\Ú[Û‹——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆH™[™Üˆ™[][ÛœÚ\Y™XÞXÛH[ˆHÜ™\ˆÛÛ\PH™\Ù[È]ˆ
Š‘YH[YÙ[˜ÙH[™Ù[XÝ[ÛŠŠˆ™Y›Ü™HÚYÛš[™È0­È
ŠÛÛ˜XÝ
Š‹Ú]Ó\ËÙXÝ\š]HÛ]\Ù\È[™šYÚ]ËX]Y]0­È
Š“Û™ÛÚ[™È[Ûš]Üš[™ÊŠˆ\š[™ÈH™[][ÛœÚ\›ÝHÛ™K[Ù™ˆ\ÜÙ\ÜÛY[0­È
Š“Ù™˜›Ø\™[™ÊŠˆ]H[™Ú]XØÙ\ÜÈ™]›ØØ][Û‹]H™]\›ˆÜˆ\ÝXÝ[Ûˆ[™ÛÜÝ\™HÙˆ[YÜ˜][ÛœËˆH›Ü™ÛÝ[ˆ\ÙH\È[[ÜÝ[Ø^\ÈH\ÝÛ™K[™]\ÈHÛ™H]X]™\È˜[YÜ™Y[X[È[ˆH[™ÈÙˆ[ÜHÚ]›È™[XZ[š[™È™X\ÛÛˆÈÛ[Kˆ‹ˆKˆÎˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ][ÛˆY™[™\œËHš\ÚÈX[˜YÙ[Y[X[H\ÈÛÛ\]YHš\ÚÈ\ÜÙ\ÜÛY[›ØÙ\ÜÈ›ÜˆÛÜœÜ˜]H[™›Ü›X][ÛˆÞ\Ý[\Ëˆ^H›ÝÈ™\\™HÈÛÛ[][šXØ]HHš\ÚÈ[™›Ü›X][ÛˆÈ\Ú[™\ÜÈÝZÙZÛ\œÈ[™X[˜YÙ[Y[ÈÝ\Ü[™›Ü›YYÝ˜]YÚXÈXÚ\Ú[ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ÙHÙˆHš\ÚÈX[˜YÙ[Y[›ØÙ\ÜÈ\™H^HY™\ÜÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ™\Ü[™È‹ˆŠHš\ÚÈY[YšXØ][Ûˆ‹ˆÊHš\ÚÈ\ÜÙ\ÜÛY[‹ˆ‘
Hš\ÚÈ[˜[\Ú\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHš\ÚÈ™\Ü[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”š\ÚÈ™\Ü[™ÊŠˆÛÛœÚ\ÝÈÙˆH›Ü›X[^˜][Ûˆ[™ÝXÝ\™YÛÛ[][šXØ][ÛˆÙˆH™\Ý[ÈÙˆš\ÚÈ[˜[\Ú\È[™\ÜÙ\ÜÛY[ÈH™[]˜[ÝZÙZÛ\œÈ[™ÛÜœÜ˜]HXY\œÚ\[œÝ\š[™È]Ù^H[™›Ü›X][Ûˆ\È[™\œÝÛÙ[ˆÜ™\ˆÈXZÙH[™›Ü›YYXÚ\Ú[ÛœÈ[™\›Ý™HYÙ]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHš\ÚÈY[YšXØ][ÛŠŠˆ\ÈH™[[Z[˜\žH\ÙHÙˆ\ØÛÝ™\š[™È[™[™[ÜžZ[™ÈHÝ[X[™X]È[™[™\˜Xš[]Y\ÈÙˆH[š\›Û›Y[—ˆ
ˆ
ŠÊHš\ÚÈ\ÜÙ\ÜÛY[
Šˆ[˜ÛÛ\\ÜÙ\ÈH[\™H›ØÙ\ÜÈÙˆY[YšXØ][Û‹[˜[\Ú\È[™[š]X[]˜[X][Û‹›Ý\ÝHš[˜[ÛÛ[][šXØ][ÛˆÙˆH™\Ý[Ë—ˆ
ˆ
Š‘
Hš\ÚÈ[˜[\Ú\ÊŠˆ\ÈH[‹Y\^[Z[˜][ÛˆÈ\Ý[X]HH›Ø˜Xš[]H[™[\XÝÙˆH[™]šYX[š\ÚÜÈ\ØÛÝ™\™Yˆ‚ˆKˆÎNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•HY[X™\œÈÙˆXÛ\ÙIÜÈš\ÚÈX[˜YÙ[Y[X[K[ˆ]Ûš[™ÈX[Y˜XÝ\™\‹\™H\ØÝ\ÜÚ[™ÈHÜ™Ø[š^˜][Û‰ÜÈ\›ØXÚÈš\ÚÈX[˜YÙ[Y[ˆ^H\™H]˜[X][™ÈHÝ™\˜[]™[Ùˆš\ÚÈ^H\™HÚ[[™ÈÈXØÙ\ÈXÚY]™HH™\žHYÙÜ™\ÜÚ]™HÜ›ÝÝØš™XÝ]™\ÈÙ]žHHÑSËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\›HYš[™\ÈHÝ™\˜[]™[Ùˆš\ÚÈHÜ™Ø[š^˜][Ûˆ\ÈÚ[[™ÈÈXØÙ\È‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ\]]H‹ˆŠHš\ÚÈXØÙ\[˜ÙH‹ˆÊHš\ÚÈ]\œ™[˜ÙH‹ˆ‘
Hš\ÚÈÛ\˜[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHš\ÚÈ\]]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”š\ÚÈ\]]JŠˆ™Y™\œÈÈHXXÜ›ÜØÛÜXÈÝ˜]YÚXÈ]]YH[™HÝ™\˜[[[Ý[Ùˆš\ÚÈ][ˆÜ™Ø[š^˜][Ûˆ\ÈXÝ]™[HÚ[[™ÈÈÛ\˜]HÜˆ\ÜÝ[YH[ˆH\œÝZ]Ùˆ]ÈÛÛ[Y\˜ÚX[[™Ü›ÝÝØš™XÝ]™\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHš\ÚÈXØÙ\[˜ÙJŠˆ\ÈH›Ü›X[[™ÛÛœØÚ[Ý\ÈXÝ[ÛˆÙˆXÚY[™È›ÝÈZ]YØ]HHÜXÚYšXÈš\ÚËÚ[\HXÚÛ›ÝÛYÚ[™È]Ú]Ý][™\Ý[™È[ˆÛÝ[\›YX\Ý\™\Ë—ˆ
ˆ
ŠÊHš\ÚÈ]\œ™[˜ÙJŠˆZ[\ÈÈ\ØÛÝ\˜YÙH]XÚÙ\œÈžH[›ÙXÚ[™Èš\ÚX›HÞXÚÛÙÚXØ[ÜˆYØ[˜\œšY\œË—ˆ
ˆ
Š‘
Hš\ÚÈÛ\˜[˜ÙJŠˆ™\™\Ù[ÈH˜XÝXØ[˜[œÛ][ÛˆÙˆš\ÚÈ\]]H[ˆH›Ü›HÙˆ™XÚ\ÙH[Y\šXØ[™\ÚÛÈÛ\˜X›H›ÜˆÜ\˜][Û˜[Øš™XÝ]™\È
K™ËˆX^[][H[ÝÙY[^HÜˆ[™›Ü™\ÙY[ˆ^[œÙJKˆ‚ˆKˆˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ][Û•˜Z[š[™ËHš\ÚÈX[˜YÙ[Y[X[H\ÈÛÛ\]YHÜ›ÝYÚ\ÜÙ\ÜÛY[[™Y[YšYYÝ[X[™X]È[ˆ˜\š[Ý\È\\Y[ËˆÈ[œÝ\™HÛÛ[[Ý\È[Ûš]Üš[™È[™˜XÙXXš[]HÙˆ\ÙH™X]ÈÝ™\ˆ[YK^HØ[È[\[Y[HÙ[˜[^™YÛÛ]\ÝÈHš\ÚÜËZ\ˆ[\XÝ[™Z\ˆ™\ÜXÝ]™HÝÛ™\œËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[[Y[ÙˆHš\ÚÈX[˜YÙ[Y[›ØÙ\ÜÈÚÝ[HX[H[\[Y[È˜XÚÈš\ÚÜÈÝ™\ˆ[YOÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™\ÜÈ[\XÝ[˜[\Ú\È
’PJH‹ˆŠHš\ÚÈ™YÚ\Ý\ˆ‹ˆÊHš\ÚÈ\ÜÙ\ÜÛY[‹ˆ‘
Hš\ÚÈ™\Ü[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHš\ÚÈ™YÚ\Ý\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”š\ÚÈ™YÚ\Ý\ŠŠˆ\ÈH›Ü›X[]š[™È[™ÛÛ[[Ý\ÛH\]YØÝ[Y[Üˆ]X˜\ÙH]Ù\™\È\ÈHÙ[˜[^™Y™\ÜÚ]ÜžHÈ\Ý[Y[YšYYš\ÚÜËZ\ˆÝ[X[[\XÝ[›™Y™\ÜÛœÙ\Ë™\ÜXÝ]™HÝÛ™\œÈ
š\ÚÈÝÛ™\œÊH[™Ý\œ™[Z]YØ][ÛˆÝ]\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH\Ú[™\ÜÈ[\XÝ[˜[\Ú\È
’PJJŠˆÙ\™\ÈÈ[˜[^™HÜš]XØ[\Ú[™\ÜÈ›ØÙ\ÜÙ\ÈÈYš[™HH\Ø\Ý\ˆ™XÛÝ™\žH•ËÔ”ÈY]šXÜË›ÝÈ[Ûš]Üˆ[™]šYX[Ü\˜][Û˜[\Ú[™\ÜÈš\ÚÜÈÝ™\ˆ[YK—ˆ
ˆ
ŠÊHš\ÚÈ\ÜÙ\ÜÛY[
Šˆ\ÈHÚ[Z[‹][YHXÝ]š]HÙˆY[YšXØ][Ûˆ[™[˜[\Ú\Ë›ÝHÛÛ›ÜˆÛÛ[[Ý\È[Ûš]Üš[™È[™™XÛÜ™[™Ë—ˆ
ˆ
Š‘
Hš\ÚÈ™\Ü[™ÊŠˆ\ÈHXÝ]š]HÙˆ›Ü›X[™\Ü[™ÈÈÝZÙZÛ\œËˆ‚ˆKˆNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]HÙ™šXÙ\ˆ]Ù[H[››Ý˜][ÛœÈÈ\È™]šY]Ú[™È™XÙ[ÙXÝ\š]H[˜ÚY[ÈÈ]˜[X]HÝ[X[™X]ÈÚ][ˆHÜ™Ø[š^˜][Û‹ˆÛÈ[\ÝX[™Z]š[Üˆ]\›œÈ˜Z\ÙHÝ›Û™ÈÛÛ˜Ù\›œÈ™YØ\™[™ÈHÝ[X[[œÚY\ˆ™X]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÛÛXš[˜][ÛˆÙˆ™Z]š[ÜœÈ™\™\Ù[ÈH[ÜÝØš[Ý\ÈÚYÛˆÙˆHÜÜÚX›H[œÚY\ˆ™X]È‹ˆÜ[ÛœÎˆÂˆJH\œ™YÝ[\ˆXZ[[˜[˜ÙHÙˆÛÜœÜ˜]HÞ\Ý[\È[™XÝ]™HÝ\ÜÙˆÛXÚY\È‹ˆŠHœ™\]Y[[˜]]Üš^™YXØÙ\ÜÈ[™[\ÝX[]H˜[œÙ™\œÈ‹ˆÊH[™^XÝY[˜Ü™X\ÙH[ˆÛÜšÚ[™ÈÝ\œÈ[™\œ™YÝ[\ˆÞ\Ý[HXZ[[˜[˜ÙH‹ˆ‘
HXÝ]™HÝ\ÜÙˆÛXÚY\È[™[™^XÝY[˜Ü™X\ÙH[ˆÛÜšÚ[™ÈÝ\œÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHœ™\]Y[[˜]]Üš^™YXØÙ\ÜÈ[™[\ÝX[]H˜[œÙ™\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ™\X]Y[™œ™\]Y[][\ÈÈXØÙ\ÜÈš[\ÈÜˆ\™XÝÜšY\ÈÝ]ÚYHÛ™IÜÈ›Øˆ]Y\ËÛÛXš[™YÚ]H^š[˜][ÛˆÜˆ˜[œÙ™\ˆÙˆ\™ÙH›Û[Y\ÈÙˆ]HÈ[˜]]Üš^™Y^\›˜[\Ý[˜][ÛœÈ
\ÜXÚX[H][›ÛX[Ý\ÈÝ\œÊKÛÛœÝ]]HH[ÜÝÜš]XØ[[™Ú\˜XÝ\š\ÝXÈ™Z]š[Ü˜[[™XØ]ÜœÈÙˆ[ˆ[œÚY\ˆ™X]ÜˆHÛÛ\›ÛZ\ÙYXØÛÝ[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœËÚXÚ[ÛÛYH[ˆZ\œÎŠŠ—ˆ
ˆ
ŠJH\œ™YÝ[\ˆXZ[[˜[˜ÙH
ÈÝ\Ü›ÜˆÛXÚY\ÎŠŠˆ\œ™YÝ[\ˆXZ[[˜[˜ÙH\È[ˆ
Š›Ü™Ø[š\Ø][Û˜[
Šˆ›Ø›[H
]Ú\È\YYÚ]Ý]Y]Ù
K›ÝH˜XÙHÙˆX\ÙNÈXÝ]™[HÝ\Ü[™ÈÛXÚY\È\ËYˆ[ž][™ËHÜÚ]]™HÚYÛ˜[ˆ™Z]\ˆ[[Y[ÛÛ˜Ù\›œÈXØÙ\ÜÈÈ]K—ˆ
ˆ
ŠÊH[˜Ü™X\ÙYÛÜšÚ[™ÈÝ\œÈ
È\œ™YÝ[\ˆXZ[[˜[˜ÙNŠŠˆÝ™\[YHÛˆ]ÈÝÛˆØ^\È›Ý[™ÈH]X^HYX[ˆYXØ][Û‹H›Ú™XÝ[›š[™È]HÜˆ\œÛÛ˜[Ú\˜Ý[\Ý[˜Ù\Ëˆ]XÜ]Z\™\ÈYX[š[™È
Š›Û›H[Û™ÜÚYJŠˆ[›ÛX[Ý\ÈXØÙ\ÜË[™]\ÈÚ]\ÈZ\ÜÚ[™È\™K—ˆ
ˆ
Š‘
HÝ\Ü›ÜˆÛXÚY\È
È[˜Ü™X\ÙYÛÜšÚ[™ÈÝ\œÎŠŠˆ\ØÜšX™\È[ˆ[™ØYÙYÚ[[™È[\ÞYYKˆ™X][™È]ÛÛXš[˜][Ûˆ\È[ˆ[™XØ]ÜˆÛÝ[YX[ˆÝ\ÜXÝ[™ÈÚÙ]™\ˆÛÜšÜÈ\™\ÝH]ZXÚÙ\ÝØ^HÈ\Ý›ÞH\ÝÚ[H\ØÛÝ™\š[™È›Ý[™Ë——Šˆ
ŠH›ÝH]X]\œÈ\È]XÚ\ÈH[œÝÙ\ŽŠŠˆ]™[ˆHÛÜœ™XÝÛÛXš[˜][Ûˆ
Š™Ù\È›Ý›Ý™JŠˆÜ›Û™ÙÚ[™ËˆÝ][Ù‹\›ÛHXØÙ\ÜÈ[™[\ÝX[˜[œÙ™\œÈ\ÝYžH[ˆ
Šš[™\ÝYØ][ÛŠŠ‹ÛÛ™XÝY[™\ˆH›Ü\ˆ›ØÙY\™\È[™ØY™YÝX\™Îˆ]ÛÝ[™HHX[XÚ[Ý\È[œÚY\‹]\]X[HH
Š˜ÛÛ\›ÛZ\ÙYXØÛÝ[
Šˆ™Z[™È\ÙYžHÛÛY[Û™H[ÙKÜˆ[ˆ[\ÞYYHÚ]™[ˆHÜ›Û™È[œÝXÝ[ÛœËˆ[ˆ[™XØ]ÜˆÜ[œÈ[ˆ[œ]Z\žK]Ù\È›Ý[]™\ˆH™\™XÝˆ‚ˆKˆŽˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH\Ú[™\ÜÈ›ØÙ\ÜÈ[˜[\Ú\È
”JH›ØÝ\ÙYÛˆZ\ÜÚ[Ûˆ\ÜÙ[X[[˜Ý[ÛœËHÙXÝ\š]HX[H]\ÝY[YžHH[™]šYX[ÛÛ\Û™[ÈÙˆH›ØÙ\ÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ÙˆH”H›ÜˆZ\ÜÚ[Ûˆ\ÜÙ[X[[˜Ý[ÛœÈ›ÝšY\ÈH]Z[YÝ\XžK\Ý\\ØÜš\[ÛˆÙˆH›ØÙY\˜[\ÚÜÈ\™›Ü›YYÈ‹ˆÜ[ÛœÎˆÂˆJHÝ]]È‹ˆŠH›ØÙ\ÜÈ›ÝÈ‹ˆÊH\™Ø\™H‹ˆ‘
H[œ]È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH›ØÙ\ÜÈ›ÝÊŠ‹——Šˆ
Š“Z[™HXÜ›Ûž[H8 %]\ÈH\XØ]NŠŠˆ[ˆ\È]Y\Ý[Ûˆ
Š”JŠˆÝ[™È›Üˆ
\Ú[™\ÜÈ›ØÙ\ÜÈ[˜[\Ú\Ê‹H[˜[\Ú\È]œ™XZÜÈH\Ú[™\ÜÈ›ØÙ\ÜÈÝÛˆ[È]È[[Y[Ëˆ[Ù]Ú\™H[ˆÛXZ[ˆHHØ[YHXÜ›Ûž[HÝ[™È›ÜˆH
Š\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
Š‹HYÜ™Y[Y[™]ÙY[ˆÛÈÛÛ\[šY\È[\š[™ÈHÛÛX›Ü˜][Û‹ˆ^H\™H[\™[HY™™\™[[™ÜË[™ÛÛ^XÚY\ÈÚXÚÛ™H\ÈYX[ˆYˆH^[ÜÈX›Ý]
œ›ØÙ\ÜÙ\Ë\ÜÙ[X[[˜Ý[ÛœË[œ]È[™Ý]]Ê‹]\ÈH[˜[\Ú\ÎÈYˆ][ÜÈX›Ý]
œ\Y\Ë™\ÜÛœÚXš[]Y\ËÚ\š[™ÈÙˆ›Ùš]ÈÜˆš\ÚÜÊ‹]\ÈHYÜ™Y[Y[—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆH\Ú[™\ÜÈ›ØÙ\ÜÈ[˜[\Ú\ÈH›Ý\ˆ[[Y[È™Z[™ÈX\Y\™H
Šš[œ]ÊŠˆ
Ú]ÛÙ\È[ŠK
Šœ›ØÙ\ÜÈ›ÝÊŠˆ
HÙ\]Y[˜ÙHÙˆÝ\ÊK
Š›Ý]]ÊŠˆ
Ú]ÛÛY\ÈÝ]
H[™H
Šœ™\ÛÝ\˜Ù\ÊŠˆH›ØÙ\ÜÈÛÛœÝ[Y\Ë\™Ø\™H[˜ÛYYˆH]Y\Ý[Ûˆ\ÚÜÈ›ÜˆH
ŠœÝ\XžK\Ý\
Šˆ\ØÜš\[ÛˆÙˆH\ÚÜË[™]\ÈžHYš[š][ÛˆH›ØÙ\ÜÈ›ÝË—Šˆ
Š•Ú]]\È›Üˆ[ˆ˜XÝXÙNŠŠˆX\[™ÈH›ÝÈ\ÈH™\™\]Z\Ú]H›ÜˆH
Š’PJŠŽˆ[[[ÝHÛ›ÝÈÚXÚÝ\ÈXZÙH\[ˆ\ÜÙ[X[[˜Ý[Û‹[ÝHØ[››ÝØ^HÚXÚ[\œ\[ÛˆÝÜÈ]›ÜˆÙ]Ù[œÚX›H•È[™”È˜[Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÝ]]ÊŠˆ[™
Š‘
H[œ]ÊŠˆ™\™\Ù[™\ÜXÝ]™[HHš[˜[›ÙXÝËÙ]HÙ[™\˜]YÜˆH[š]X[™\]Z\™[Y[È™YYYÈÝ\H›ØÙ\ÜË]È›ÝÛÛœÝ]]HHÙ\]Y[X[Ü\˜][Û˜[ÝZYK—ˆ
ˆ
ŠÊH\™Ø\™JŠˆ™Y™\œÈÈH\ÚXØ[[™œ˜\ÝXÝ\™H\ÙY›ÝÈH›ØÙY\˜[˜\œ˜]]™HÙˆHXÝ]š]IÜÈÝ\Ëˆ‚ˆKˆÎˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆHÝ›Û™ÈÝÜ›H[\œ\ÈH[XÝšXØ[ÝÙ\ˆÙˆHÛÛ\[žIÜÈXZ[ˆ]HÙ[\‹ZÚ[™È\ÜÙ[X[Þ\Ý[\ÈÙ™›[™KˆÈ[œÝ\™HÜ\˜][Û˜[ÛÛ[Z]KHUX[H[š]X]\ÈH›ØÙY\™\ÈÈXÝ]˜]HH˜XÚÝ\Þ\Ý[\È][ˆ[\›˜]HÚ]H[™™\ÝÜ™HHÜš]XØ[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ÜXÝÙˆHÜ™Ø[š^˜][Û‰ÜÈ\Ø\Ý\ˆ™XÛÝ™\žHÛXÞH\È™Z[™È[\[Y[Y[ˆ\ÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ\ÜÙ\ÜÛY[‹ˆŠH™XÛÝ™\žH[™™\ÝÜ˜][Ûˆ›ØÙ\ÜÙ\È‹ˆÊH]H™Y[™[˜ÞH\Ý[™È‹ˆ‘
H\Ú[™\ÜÈÛÛ[Z]H[›š[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™XÛÝ™\žH[™™\ÝÜ˜][Ûˆ›ØÙ\ÜÙ\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ÈØÙ[˜\š[È[\Ý˜]\ÈH˜XÝXØ[XÝ]˜][ÛˆÙˆH™XÛÝ™\žH[™™\ÝÜ˜][Ûˆ›ØÙY\™\ËˆHUX[IÜÈXÝ[ÛœÈÈXÝ]˜]HH˜XÚÝ\Þ\Ý[\È]H[\›˜]HÚ]H[™™\ÝÜ™HHÜš]XØ[]H\™HZ[YY\™XÝH]™XXÝ]˜][™ÈÜ\˜][Û˜[Ù\šXÙ\È[™Z[š[Z^š[™ÈÝÛ[YHY\ˆH\Ü\[Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ\ÜÙ\ÜÛY[
Šˆ\ÈH™]™[]™H[˜[\Ú\ÈZ[YY]Y[YžZ[™È[™]˜[X][™Èš\ÚÜÈ™Y›Ü™H^H\[‹—ˆ
ˆ
ŠÊH]H™Y[™[˜ÞH\Ý[™ÊŠˆÛÛ˜Ù\›œÈH\š[ÙXÈ™\šYšXØ][ÛˆXÝ]š]Y\ÈÙˆ™\XØ][Ûˆ[™™Y[™[˜ÞHÞ\Ý[\Ë—ˆ
ˆ
Š‘
H\Ú[™\ÜÈÛÛ[Z]H[›š[™ÊŠˆ\ÈHÝ™\˜[Ý˜]YÚXÈ[›š[™È
ÙˆÚXÚ\Ø\Ý\ˆ™XÛÝ™\žH\ÈH\
K]HØÙ[˜\š[È\ØÜšX™\ÈHÜ\˜][Û˜[[™XÚšXØ[^XÝ][ÛˆÙˆ™\ÝÜš[™ÈHUÞ\Ý[\Ëˆ‚ˆKˆˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ›YXš\™XÚ›ÛÙÚY\È\È\™YH[™]˜][Ûˆ\Ý\‹ˆ\š[™ÈH\ÝÚHÚ[][\ÈXØÙ\ÜÈHÛÜœÜ˜]HZ[[™È\Ú[™ÈH˜ZÙH˜YÙH[™\™›Ü›Z[™ÈYÙÞX˜XÚÚ[™È
Z[[™È[ˆ]]Üš^™Y[\ÞYYJH]H[˜[˜ÙKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆ[™]˜][Ûˆ\Ý[™È\ÈÚH\™›Ü›Z[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\X[HÛ›ÝÛˆ[š\›Û›Y[‹ˆŠH[YÜ˜]Y‹ˆÊHÛ›ÝÛˆ[š\›Û›Y[‹ˆ‘
H\ÚXØ[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\ÚXØ[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ÚXØ[[™]˜][Ûˆ\Ý[™È]˜[X]\ÈHY™™XÝ]™[™\ÜÈÙˆ[ˆÜ™Ø[š^˜][Û‰ÜÈ\ÚXØ[ÙXÝ\š]HYX\Ý\™\ËÝXÚ\ÈXØÙ\ÜÈÛÛ›ÛÝ\™Z[[˜ÙH[™[Ûš]Üš[™ËžH][\[™ÈÈ\ÚXØ[HXØÙ\ÜÈ™\ÝšXÝY\™X\È›ÝYÚÛØÚX[[™Ú[™Y\š[™ÈÜˆ˜\œšY\ˆÚ\˜Ý[]™[[Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH\X[HÛ›ÝÛˆ[š\›Û›Y[
Šˆ
[ÛÈÛ›ÝÛˆ\ÈÜ˜^KX›Þ
H[™
ŠÊHÛ›ÝÛˆ[š\›Û›Y[
Šˆ
Ú]KX›Þ
H™Y™\ˆÈH]™[Ùˆ[™›Ü›X][Ûˆ›ÝšYY[ˆY˜[˜ÙHÈH\Ý\ˆX›Ý]H™]ÛÜšÜÈÜˆÙÚXØ[Þ\Ý[\Ë›ÝH\ÚXØ[ÛXZ[‹—ˆ
ˆ
ŠŠH[YÜ˜]Y
Šˆ™Y™\œÈÈHÛØ˜[\›ØXÚ]ÛÛXš[™\ÈY™™\™[\\ÈÙˆ\ÝÈ
\ÚXØ[ÙÚXØ[ÛØÚX[[™Ú[™Y\š[™ÊK]H\ØÜšX™YXÝ]š]H›ØÝ\Ù\ÈÜXÚYšXØ[HÛˆH\ÚXØ[ÛÛ\Û™[ˆ‚ˆKˆNˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™È\È]˜[X][™ÈHÛÛX›Ü˜][ÛˆÚ]H™]ÈUÙ\šXÙ\È›ÝšY\‹ˆÈ[œÝ\™HÛÛ\X[˜ÙH[™Y\™[˜ÙHÈ[™\ÝžHÝ[™\™Ë[Ûˆ˜Z[š[™ÈØ[ÈÈ^[Z[™H™\šYšXX›H]˜[X][ÛœÈÙˆH›ÝšY\‰ÜÈÙXÝ\š]HÛÛ›ÛÈ[™˜XÝXÙ\ËˆÜXÚYšXØ[KHÛÛ\[žHØ[ÈÈ[˜[^™HH[\›˜[\ÜÙ\ÜÛY[È]H›ÝšY\ˆ]Ù[ˆ\È\™›Ü›YYÛˆ]ÈÝÛˆÙXÝ\š]HYX\Ý\™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈÛÝ[›ÝšYH[Ûˆ˜Z[š[™ÈÚ]]Z[Y[™›Ü›X][ÛˆX›Ý]H[\›˜[\ÜÙ\ÜÛY[ÈÛÛ™XÝYžHH›ÝšY\È‹ˆÜ[ÛœÎˆÂˆJHÝ\ÝÛY\ˆ\Ý[[ÛšX[È‹ˆŠH™YÝ[]ÜžHÛÛ\X[˜ÙHÙ\YšXØ]\È‹ˆÊH^\›˜[[™]˜][Ûˆ\Ý™\ÜÈ‹ˆ‘
H]šY[˜ÙHÙˆ[\›˜[]Y]È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H]šY[˜ÙHÙˆ[\›˜[]Y]ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]šY[˜ÙHÙˆ[\›˜[]Y]È[[ÛœÝ˜]\ÈH›ÝšY\‰ÜÈ›ØXÝ]™H\›ØXÚ[ˆ[Ûš]Üš[™È[™[\›Ýš[™È]ÈÝÛˆÙXÝ\š]HÜÝ\™H›ÝYÚšYÛÜ›Ý\ÈÙ[‹X\ÜÙ\ÜÛY[ÈÙˆÛÛ›ÛË›ØÙ\ÜÙ\È[™[™\˜Xš[]Y\Ëˆ\ÈÙ™™\œÈHÝ\ÝÛY\ˆHÛX\ˆšY]ÈÙˆÝÈH›ÝšY\ˆX[˜YÙ\È]ÈÙXÝ\š]Hœ›ÛHÚ][‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÝ\ÝÛY\ˆ\Ý[[ÛšX[ÊŠˆ™Y›XÝHÛÛ[Y\˜ÚX[Ø]\Ù˜XÝ[ÛˆÙˆÝ\ÝÛY\œË]È›ÝÙ™™\ˆXÚšXØ[Y]šXÜÈÜˆ›Ü›X[™\šYšXØ][ÛˆÙˆÛÛ›ÛË—ˆ
ˆ
ŠŠH™YÝ[]ÜžHÛÛ\X[˜ÙHÙ\YšXØ]\ÊŠˆ]\Ý]H›ÝšY\ˆÛÛ\Y\ÈÚ]Ù\Z[ˆÝ[™\™È
K™ËˆTÓÈÌJH\ÈÙY[ˆžHH\™\K]È›ÝÚÝÈH]Z[ÙˆÛÛ[[Ý\È[\›˜[]Y]›ØÙ\ÜÙ\Ë—ˆ
ˆ
ŠÊH^\›˜[[™]˜][Ûˆ\Ý™\ÜÊŠˆ\™H\™›Ü›YYžH^\›˜[\Y\ÈÈš[™^Ú]X›H[™\˜Xš[]Y\È]HÚ]™[ˆ[ÛY[[™È›Ý™\™\Ù[H\š[ÙXÈÙ[‹X\ÜÙ\ÜÛY[ÙˆH›ÝšY\‰ÜÈ[\›˜[ÛÝ™\›˜[˜ÙKˆ‚ˆKˆŽˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHÛÝYÙ\šXÙH›ÝšY\ˆ\È™XÙ[H[™\™ÛÛ™H[ˆ[™\[™[]Y]ÈÛÛ™š\›H]ÈÛÛ\X[˜ÙHÚ][\›˜][Û˜[]HÙXÝ\š]HÝ[™\™ËˆHš[˜[™\Ü›ÝšYYžHH]Y]ÜœÈÛÛœÝ]]\È[ˆ]\Ý][ÛˆÙˆH›ÝšY\‰ÜÈÙXÝ\š]HYX\Ý\™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]Ù\È\È]\Ý][ÛˆYX[ˆ›ÜˆHÛÝYÙ\šXÙH›ÝšY\‰ÜÈÝ\ÝÛY\œÏÈ‹ˆÜ[ÛœÎˆÂˆJH]XÚÛ›ÝÛYÙ\È]H›ÝšY\‰ÜÈX\šÙ][™ÈÝ˜]YÚY\È\™HY™™XÝ]™Kˆ‹ˆŠH]›ÝšY\È\ÜÝ\˜[˜ÙHX›Ý]HÛÛ›ÛÈÚ][ˆH]Y]™\Ü	ÜÈØÛÜK\š[Ù[™Üš]\šXKˆ‹ˆÊH]ÝX\˜[Y\È]HÙXÝ\š]HÛÛ›ÛÈ\™H[\[™]˜X›H[™][]H\ÈÝÜ™Y[ˆ[ˆXœÛÛ][HÙXÝ\™HX[›™\‹ˆ‹ˆ‘
H]Ù\YšY\È]H›ÝšY\‰ÜÈÙ\šXÙ\È\™HH[ÜÝÛÛ™[šY[[™ÛÜÝYY™™XÝ]™HÛˆHX\šÙ]ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH]›ÝšY\È\ÜÝ\˜[˜ÙHX›Ý]HÛÛ›ÛÈÚ][ˆH]Y]™\Ü	ÜÈØÛÜK\š[Ù[™Üš]\šXJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆ
Š˜]\Ý][ÛŠŠˆ\ÈH›Ü›X[Ý][Y[[ˆÚXÚ[ˆ[™\[™[]Y]ÜˆÚ]™\È[ˆÜ[š[ÛˆÛˆÚ]^H
Š˜XÝX[H^[Z[™Y
Š‹ˆ]È˜[YHÈHÝ\ÝÛY\ˆ\È™X[]
Š˜›Ý[™YžH™YH[Z]ÊŠˆ]ÚÝ[[Ø^\È™H™XY™Y›Ü™H™[Z[™ÈÛˆ]—ˆ
ˆH
ŠœØÛÜJŠŽˆÚXÚÙ\šXÙ\ËÚ]\È[™Þ\Ý[\ÈH^[Z[˜][ÛˆÛÝ™\™YˆH›ÝšY\ˆX^HÙ\YžHÛ™HÙ\šXÙH[™H[™X]™HÝ\œÈÝ]—ˆ
ˆH
Šœ\š[Ù
ŠŽˆH
Š”ÓÐÈˆ\HRJŠˆ\ØÜšX™\ÈÝÈHÛÛ›ÛÈ
Š›Ü\˜]YÝ™\ˆ[ˆ[\˜[
Šˆ
Ù[™H[ÛËØ^JKÚ\™X\ÈH
Š•\HJŠˆØ\\™\ÈZ\ˆ\ÚYÛˆ]H
ŠœÚ[™ÛHÚ[[ˆ[YJŠ‹ˆ[ˆ
Š’TÓÈÌJŠˆÙ\YšXØ][ÛˆÛÝ™\œÈHX[˜YÙ[Y[Þ\Ý[H
TÓTÊHÚ][ˆ]ÈÙ\YšYYØÛÜK—ˆ
ˆH
Š˜Üš]\šXJŠˆ[™H
Š™^Ù\[ÛœÊŠŽˆÚXÚÝ[™\™H\ÜÙ\ÜÛY[YX\Ý\™YYØZ[œÝ[™Ú]š[™[™ÜÈH]Y]Üˆ™XÛÜ™YˆH^Ù\[ÛœÈ\™HH[ÜÝ[™›Ü›X]]™H\ÙˆH™\Ü[™H\[[ÜÝ›Ø›ÙH™XYË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHY™™XÝ]™[™\ÜÈÙˆX\šÙ][™ÈÝ˜]YÚY\ÎŠŠˆ›ÝHÝXš™XÝÙˆHÙXÝ\š]H]Y]ˆH]Y]Üˆ^[Z[™\ÈÛÛ›ÛÈ[™›ØÙ\ÜÙ\Ë›ÝH›ÝšY\‰ÜÈÛÛ[Y\˜ÚX[\™›Ü›X[˜ÙK—ˆ
ˆ
ŠÊH[\[™]˜X›HÛÛ›ÛÈ[™XœÛÛ][HÙXÝ\™H]NŠŠˆH[\ÜÜÚX›HXœÛÛ]Kˆ›È]Y]Ù\YšY\ÈHXœÙ[˜ÙHÙˆš\ÚÈÜˆÝX\˜[Y\È]›È[˜ÚY[Ú[ØØÝ\ŽÈ]]\ÝÈ]Ú][ˆHØÛÜH[™\š[Ù^[Z[™YHÛÛ›ÛÈÙ\™H\ÚYÛ™Y[™Ü\˜][™È\È\ØÜšX™Y—ˆ
ˆ
Š‘
HH[ÜÝÛÜÝYY™™XÝ]™HÙ\šXÙ\ÈÛˆHX\šÙ]ŠŠˆ
ŠœšXÙJŠˆ\È›Ý]\ÝYˆ[ˆ]\Ý][Ûˆ™Z]\ˆÛÛ\\™\È›ÝšY\œÈ›Üˆ\ÜÙ\ÈYÙ[Y[Ûˆ˜[YH›Üˆ[Û™^K——Šˆ
Š‘^[H˜\ŠŠˆÚ[™]™\ˆH]Y\Ý[Ûˆ[›Û™\È[ˆ]Y]™\ÜÛÚÈ›ÜˆH™YH›Ý[™\šY\ÈH
ŠœØÛÜK\š[ÙÜš]\šXJŠˆH[™\Ý\ÝÜ[ÛœÈ›ÛZ\Ú[™ÈXœÛÛ]HÜˆÝ[ÙXÝ\š]Nˆ[ˆHÙXÝ\š]H]Y\Ý[Û‹[ˆXœÛÛ]H\È™X\›H[Ø^\ÈH\Ý˜XÝÜ‹ˆ™[Y[X™\ˆÛÈH\Ý[˜Ý[ÛˆH^[H\ÚÜÈX›Ý][ÜÝÙ[Žˆ
Š”ÓÐÈˆ\HJŠˆHÛÛ›Û\ÚYÛˆ]HÚ[[ˆ[YHH
Š”ÓÐÈˆ\HRJŠˆHÜ\˜][™ÈY™™XÝ]™[™\ÜÈÝ™\ˆH\š[ÙÚXÚ\ÈHÛ™H]ÛÝ[È\È]šY[˜ÙH[ˆ™[™Üˆš\ÚÈX[˜YÙ[Y[ˆ‚ˆKˆÎˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý\ÈØ]\š[™ÈH]H™YYYÈÛÛ™XÝH]X[]]]™Hš\ÚÈ[˜[\Ú\ÈÛˆHÜš]XØ[ÛÜœÜ˜]HÙ\™\‹ˆ^H]\ÝY[YžHH\˜Ù[YÙHÙˆH\ÜÙ]	ÜÈ˜[YH]ÛÝ[™HÜÝ[ˆH]™[Ùˆ[ˆ[˜ÚY[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\›H™Y™\œÈÈH\˜Ù[YÙHÙˆ[ˆ\ÜÙ]	ÜÈ˜[YH]\È^XÝYÈ™HÜÝÚ[ˆHÜXÚYšXÈš\ÚÈ]™[ØØÝ\œÏÈ‹ˆÜ[ÛœÎˆÂˆJHQˆ
^ÜÝ\™H˜XÝÜŠH‹ˆŠH\ÜÙ][\XÝ‹ˆÊH[XYÙH›ÜÜ[Ûˆ‹ˆ‘
HÓH
Ú[™ÛHÜÜÈ^XÝ[˜ÞJH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHQˆ
^ÜÝ\™H˜XÝÜŠJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ™\™\Ù[ÈH\˜Ù[YÙHÜˆœ˜XÝ[ÛˆÙˆ[ˆ\ÜÙ]	ÜÈÝ[˜[YH]\È^XÝYÈ™HÜÝYHÈHÜXÚYšXÈÙXÝ\š]H[˜ÚY[
K™ËˆYˆH	LÙ\™\ˆÝY™™\œÈIH[XYÙKHQˆ\ÈŒJK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH\ÜÙ][\XÝ
Šˆ[™
ŠÊH[XYÙH›ÜÜ[ÛŠŠˆ\™HÙ[™\šXÈÜˆ[™›Ü›X[\ØÜš\]™H\›\Ë›ÝÝ[™\™\˜[Y]\œÈYš[™Y[ˆ]X[]]]™Hš\ÚÈ[˜[\Ú\Ë—ˆ
ˆ
Š‘
HÓH
Ú[™ÛHÜÜÈ^XÝ[˜ÞJJŠˆ^™\ÜÙ\ÈHXÝX[[Û™]\žHÜÜÈ›ÜˆHÚ[™ÛH]™[
Ø[Ý[]Y\È\ÜÙ]˜[YH
ˆ^ÜÝ\™H˜XÝÜŠK›ÝH\™H\˜Ù[YÙKˆ‚ˆKˆˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žHÙYZÜÈÈ˜[[˜ÙHš\ÚÈ[™™]\›‹XZÚ[™ÈY[[™\ÝY[È]]›ÚY[™È›Ý^Ù\ÜÚ]™[Hš\ÚÞH[š]X]]™\È[™Ý™\›HØ]][Ý\ÈÜˆÛÛœÙ\˜]]™HXÚ\Ú[ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆš\ÚÈ\]]HÙ\È\ÈÛÛ\[žH[[ÛœÝ˜]OÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚËP]™\œÙH‹ˆŠH™]]˜[‹ˆÊH^[œÚ[Û˜\žH‹ˆ‘
HÛÛœÙ\˜]]™H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™]]˜[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š›™]]˜[
ŠˆÜšY[][ÛˆZ[\È›ÜˆH˜[[˜ÙY\›ØXÚØ\™Y[HÙZYÚ[™ÈH\ÜÛØÚX]Yš\ÚÜÈ[™™[™Yš]ÈÚ]Ý]˜[[™È[È^Ù\ÜÚ]™HØ]][Ûˆ›ÜˆHYÚš\ÚÈÛ\˜[˜ÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚËP]™\œÙJŠˆ[™
Š‘
HÛÛœÙ\˜]]™JŠˆ[™ÈZ[š[Z^™Hš\ÚÈ][ÛÜÝËÙ[ˆÚ]š[™È\Ü›ÝÝÜÜ[š]Y\È[ˆÜ™\ˆÈ]›ÚY[™Ù\œË—ˆ
ˆ
ŠÊH^[œÚ[Û˜\žJŠˆXØÙ\ÈH™\žHYÚ[™YÙÜ™\ÜÚ]™H]™[Ùˆš\ÚÈ[ˆÜ™\ˆÈXÚY]™H˜\Y^[œÚ[Ûˆ[™Ü›ÝÝ˜]\Ëˆ‚ˆKˆNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHXZ›ÜˆÝ\ÝÛY\ˆ\ÚÜÈHÛÛ\[žH›Üˆ[™\[™[›ÛÙˆ]]ÈÙXÝ\š]HÛÛ›ÛÈ\™H›Ü\›H\ÚYÛ™Y[™Ù[Z[™[HÛÜšÈÝ™\ˆ[YKˆ]Ú[›ÝXØÙ\HÙ[‹X\ÜÙ\ÜÛY[š[Y[ˆžHH[\›˜[X[K›ÜˆHÛÛ\[žIÜÈ[\›˜[]Y]™\Üˆ]Ø[ÈHYÙ[Y[\ÜÝYYžHH]X[YšYY[™\[™[\™\H]]Ø[ˆÚÝÈÈ]ÈÝÛˆ]Y]ÜœËˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]]\ÝHÛÛ\[žHØZ[ˆÈØ]\ÙžH\È™\]Y\ÝÈ‹ˆÜ[ÛœÎˆÂˆJHH™]ÈÙ[‹X\ÜÙ\ÜÛY[š[Y[ˆÚ][Ü™H]Z[[™ÚYÛ™YžHHÒTÓÈ‹ˆŠH[ˆ[\›˜[]Y]™\Ü\›Ý™YžHHš\ÚÈÛÛ[Z]YH‹ˆÊHH\™\\H]\Ý][Û‹ÝXÚ\ÈHÓÐÈˆ\HRH™\Ü‹ˆ‘
HH[™]˜][Ûˆ\Ý™\Ü\™›Ü›YYžHH[‹ZÝ\ÙHÙXÝ\š]HX[H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHH\™\\H]\Ý][Û‹ÝXÚ\ÈHÓÐÈˆ\HRH™\Ü
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÝ\ÝÛY\‰ÜÈ™\]Y\ÝØ\œšY\ÈÛÈÛÛœÝ˜Z[Ë[™Û›HÛ™HÜ[ÛˆYY]È›Ýˆš\œÝ
Šš[™\[™[˜ÙJŠŽˆHYÙ[Y[]\ÝÛÛYHœ›ÛHH]X[YšYY\™\K›Ýœ›ÛHÚÙ]™\ˆÜ\˜]\ÈÜˆÝ™\œÙY\ÈHÛÛ›ÛËˆÙXÛÛ™
Š›Ü\˜][™ÈY™™XÝ]™[™\ÜÈÝ™\ˆ[YJŠŽˆÚÝÚ[™ÈHÛÛ›ÛÈ\™HÙ[\ÚYÛ™Y\È›Ý[›ÝYÚ]]\Ý™HÚÝÛˆ]^HÛÜšÙYXÜ›ÜÜÈH\š[Ùˆ]\È^XÝHHYš[š][ÛˆÙˆH
Š”ÓÐÈˆ\HRJŠˆ™\Ü\ÜÝYYžH[ˆ[™\[™[]Y]Üˆ]H[™Ùˆ[ˆØœÙ\˜][ÛˆÚ[™ÝÈ\XØ[H™]ÙY[ˆÚ^[™Ù[™H[ÛË\š[™ÈÚXÚH]Y]ÜˆØ]\œÈ]šY[˜ÙHÛˆÝÈHÛÛ›ÛÈXÝX[HÜ\˜]Yˆ]\È[ÛÈHØÝ[Y[HÝ\ÝÛY\ˆØ[ˆ[ˆ\›ˆ[™ÈZ\ˆÝÛˆ]Y]ÜœËÚXÚ\ÈÚH[ˆ
Š˜]\Ý][ÛŠŠˆÙˆ\ÈÚ[™\È™XÛÛYHHÛÛ[[ÛˆÝ\œ™[˜ÞHÙˆ™[™Üˆ\ÜÙ\ÜÛY[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÙ[‹X\ÜÙ\ÜÛY[ŠŠˆ\Èš[Y[ˆžHHÜ™Ø[š^˜][Ûˆ
Š˜X›Ý]]Ù[ŠŠ‹ˆ]\È™X[˜[YH\È[ˆ[\›˜[™\\˜][ÛˆÛÛ]Ù™™\œÈ›È[™\[™[˜ÙH][[™\È™XÚ\Ù[HÚ]HÝ\ÝÛY\ˆ[™XYH™Y\ÙY—ˆ
ˆ
ŠŠH[\›˜[]Y]ŠŠˆ\È[™\[™[
Š›ÙˆHÜ\˜][™È[™JŠˆ[™™\ÜÈÈH›Ø\™Üˆš\ÚÈÛÛ[Z]YKÚXÚXZÙ\È]˜\ˆ[Ü™H›Ø\Ý[ˆHÙ[‹X\ÜÙ\ÜÛY[ˆ]›Û™][\ÜÈ™[XZ[œÈH[˜Ý[Ûˆ
Šš[œÚYHHÜ™Ø[š^˜][ÛŠŠŽˆ]Ø]\ÙšY\È[\›˜[ÛÝ™\›˜[˜ÙK›ÝH™\]Y\Ý›Üˆ[ˆ^\›˜[YÙ[Y[—ˆ
ˆ
Š‘
H[\›˜[[™]˜][Ûˆ\ÝŠŠˆ™\šYšY\ÈHÞ\Ý[\ÉÈXÚšXØ[™\Ú\Ý[˜ÙHÈHÚ[][]Y]XÚË]HÚ[[ˆ[YKˆ]\ÈHY™™\™[[™Èœ›ÛHHYÙ[Y[ÛˆH
Š™\ÚYÛˆ[™Ü\˜][ÛˆÙˆHÛÛ›ÛÙ]
Š‹[™]\ÈÛÛ™XÝY[\›˜[KÛÈ[™\[™[˜ÙH\ÈÝ[Z\ÜÚ[™Ë——Šˆ
Š‘^[H˜\ŠŠˆÜ™\ˆH›Ü›\ÈÙˆ\ÜÝ\˜[˜ÙHžH
Šš[˜Ü™X\Ú[™È[™\[™[˜ÙJŠ‹ˆÙ[‹X\ÜÙ\ÜÛY[HÜ™Ø[š^˜][Ûˆ˜]\È]Ù[ˆ0­È[\›˜[]Y][™\[™[ÙˆH[™H][\›˜[ÈHÛÛ\[žH0­È
Š‘^\›˜[
Šˆ]Y]Üˆ]\Ý][Û‹ÛÛ™XÝYžHH]X[YšYY\™\H0­ÈÙ\YšXØ][Û‹ÝXÚ\ÈTÓÈÌK\ÜÝYYžH[ˆXØÜ™Y]Y›ÙKˆ™[Y[X™\ˆ[ÛÈHY™™\™[˜ÙH™]ÙY[ˆHÛÈÓÐÈˆ™\Ü\\Îˆ
Š•\HJŠˆÝÙÜ˜\ÈHÛÛ›ÛÉÈ
Š™\ÚYÛŠŠˆÛˆHÜXÚYšXÈ]K
Š•\HRJŠˆ™\šYšY\ÈZ\ˆ
Š›Ü\˜][™ÈY™™XÝ]™[™\ÜÊŠˆXÜ›ÜÜÈH\š[ÙˆÚ[ˆH]Y\Ý[ÛˆØ^\È›Ý™\ˆ[YWˆÜˆ˜XÜ›ÜÜÈH\š[Ù‹H[œÝÙ\ˆ\È\HRKˆ‹ˆKˆLˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ][Ûˆ˜Z[š[™ËHXÚ›ÛÙÞHÛÛ\[žKHÙXÝ\š]HX[H\ÈÛÛ™XÝ[™ÈH™]šY]ÈÙˆÙXÝ\š]HYX\Ý\™\ÈÈ[\›Ý™HH›ÝXÝ[ÛˆÙˆ]È\ÚXØ[˜XÚ[]Y\Ëˆ^HØ[ÈY[YžHH\ÜÙ[X[ÛÝ™\›˜[˜ÙHÛÛ\Û™[È[œÝ\™H]XØÙ\ÜÈÈZ[[™ÜÈ[™Ù[œÚ]]™H\™X\È\ÈY\]X][H™\ÝšXÝYˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ™\™\Ù[ÈH[™[Y[[[[Y[ÙˆÛÜœÜ˜]HÛÝ™\›˜[˜ÙH›ÜˆYš[š[™È[™\Z[™È\ÚXØ[XØÙ\ÜÈ™\ÝšXÝ[ÛœÈÈZ[[™ÜÈ[™›ÝXÝY\™X\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\ÚXØ[ÙXÝ\š]HÝ[™\™È‹ˆŠHUT
XØÙ\X›H\ÙHÛXÞJH‹ˆÊHÚ[™ÙHX[˜YÙ[Y[›ØÙY\™\È‹ˆ‘
H[™›Ü›X][ÛˆÙXÝ\š]HÛXÚY\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH\ÚXØ[ÙXÝ\š]HÝ[™\™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”\ÚXØ[ÙXÝ\š]HÝ[™\™ÊŠˆYš[™HH™\]Z\™[Y[È[™XÚšXØ[ÜXÚYšXØ][ÛœÈÛˆÝÈÈ›ÝXÝZ[[™ÜÈ[™Ù[œÚ]]™H\™X\Èœ›ÛH[˜]]Üš^™YXØÙ\ÜÈ
K™Ëˆ\ÙHÙˆ˜YÙ\Ë\›œÝ[\ËÛÜÙYXÚ\˜ÝZ]Ø[Y\˜\È[™ÙXÝ\š]HÝX\™ÊK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHUT
XØÙ\X›H\ÙHÛXÞJJŠˆYš[™\ÈH\›Z]Y[™›ÚXš]Y™Z]š[ÜœÈ[ˆ[\ÞYY\ÉÈ\ÙHÙˆÛÜœÜ˜]HU™\ÛÝ\˜Ù\Ë—ˆ
ˆ
ŠÊHÚ[™ÙHX[˜YÙ[Y[
ŠˆÛÝ™\›œÈHÛÛ›ÛY›ØÙY\™\È›ÜˆXZÚ[™È[ÙYšXØ][ÛœÈÈHU[™œ˜\ÝXÝ\™HÜˆÛÙØ\™K—ˆ
ˆ
Š‘
H[™›Ü›X][ÛˆÙXÝ\š]HÛXÚY\ÊŠˆ\™HXXÜ›Ë[]™[ÛXÚY\È]Y™\ÜÈ[™›Ü›X][ÛˆÙXÝ\š]H[ˆÙ[™\˜[
[˜ÛY[™ÈÙÚXØ[ÙXÝ\š]K[˜Üž\[Û‹]ËŠKÚ\™X\È\ÚXØ[Ý[™\™ÈÜXÚYšXØ[H\XÝ[]HH[\È›Üˆ\ÚXØ[XØÙ\ÜËˆ‚ˆKˆLNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ‘\š[™ÈHš]˜XÞHÛÛ\X[˜ÙH]Y][™\ˆ]\›ÜX[ˆ™YÝ[][ÛœÈ
ÑŠKHÛÛ\[žH]˜[X]\ÈH[™[Y[[šYÚÈÙˆ\Ù\œÈ
]HÝXš™XÝÊH™YØ\™[™ÈH›ØÙ\ÜÚ[™ÈÙˆZ\ˆ\œÛÛ˜[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]Ù\ÈHœšYÚÈ™H›Ü™ÛÝ[—ˆ™Y™\ˆÈ[ˆš]˜XÞHÛÛ\X[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJHHšYÚÙˆ]HÝXš™XÝÈÈ™\]Y\ÝH[][ÛˆÙˆZ\ˆ\œÛÛ˜[]H‹ˆŠHHšYÚÙˆ]HÛÛ›Û\œÈÈ[]H]H][žH[YH‹ˆÊHHšYÚÙˆ]H›ØÙ\ÜÛÜœÈÈXØÙ\ÜÈ\œÛÛ˜[]H‹ˆ‘
HHšYÚÙˆÜ™Ø[š^˜][ÛœÈÈ™]Z[ˆÜˆ[]H]H]Z\ˆ\ØÜ™][Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHHšYÚÙˆ]HÝXš™XÝÈÈ™\]Y\ÝH[][ÛˆÙˆZ\ˆ\œÛÛ˜[]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆš]˜XÞHÛÛ\X[˜ÙH
\È›ÝšYY›ÜˆžHHÑŠKH
ŠœšYÚÈ™H›Ü™ÛÝ[ŠŠˆÝX\˜[Y\È\ÚXØ[\œÛÛœÈHšYÚÈØZ[ˆœ›ÛHH]HÛÛ›Û\ˆH[][ÛˆÙˆZ\ˆ\œÛÛ˜[]HÚ]Ý][™YH[^K[ˆH™\Ù[˜ÙHÙˆÙ\Z[ˆÛÛ™][ÛœÈ
K™ËˆYˆH]H\È›ÈÛ™Ù\ˆ™XÙ\ÜØ\žH[ˆ™[][ÛˆÈH\œÜÙ\È›ÜˆÚXÚ]Ø\ÈÛÛXÝY
K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆÛÛ›Û\œÈØ[››ÝXÝ\˜š]˜\š[K]]\ÝÛÛ\HÚ]™XÚ\ÙHYØ[™][[Ûˆ[\Ë—ˆ
ˆ
ŠÊJŠˆ›ØÙ\ÜÛÜœÈ[™H]HÛ›HÛˆ™Z[ˆÙˆÛÛ›Û\œË[™XØÙ\ÜÈ\È›Ý[™ÈÈÈÚ]HšYÚÈ™H›Ü™ÛÝ[‹—ˆ
ˆ
Š‘
JŠˆÜ™Ø[š^˜][ÛœÈÈ›Ý]™H[ˆXœÛÛ]H\ØÜ™][Û˜\žHšYÚÙˆ™][[Û‹]]\Ý[YÛˆšYÛÜ›Ý\ÛHÚ]™YÝ[]ÜžH™\]Z\™[Y[È[™\Ù\œÉÈYÚ][X]H™\]Y\ÝËˆ‚ˆKˆLŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ\ÈÚ[[™ÈÈXØÙ\YÚ\ˆš\ÚÜÈÈ\œÝYH˜\YÜ›ÝÝ[™\È[™\Ý[™ÈX]š[H[ˆ[››Ý˜]]™HXÚ›ÛÙÚY\Ë\Ü]HÝ[X[ÙXÝ\š]H[™\˜Xš[]Y\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆš\ÚÈ\]]HÙ\È\ÈÜ™Ø[š^˜][ÛˆX[šY™\ÝÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛœÙ\˜]]™H‹ˆŠH^[œÚ[Û˜\žH‹ˆÊHØ]][Ý\È‹ˆ‘
H™]]˜[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH^[œÚ[Û˜\žJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆ^[œÚ[Û˜\žHÜšY[][Ûˆ\ÈÚ\˜XÝ\š^™YžHHÚ[[™Û™\ÜÈÈZÙHÛˆÚYÛšYšXØ[ÜˆX›Ý™KX]™\˜YÙHš\ÚÜÈ[ˆÜ™\ˆÈÙZ^™HÜÜ[š]Y\È›ÜˆÝ›Û™ÈÜ›ÝÝ[››Ý˜][Ûˆ[™ÛÛ\]]]™HY˜[YÙH[ˆHX\šÙ]—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛœÙ\˜]]™JŠˆ[™
ŠÊHØ]][Ý\ÊŠˆ[™ÈZ[š[Z^™Hš\ÚË™Y™\œš[™ÈÝXš[]H[™ÛÛ›Û—ˆ
ˆ
Š‘
H™]]˜[
ŠˆÙYZÜÈH[šY›Ü›H˜[[˜ÙH™]ÙY[ˆÛÜÝÈ[™™[™Yš]ÈÚ]Ý]X[š[™ÈÝØ\™HXÝ]™HXØÙ\[˜ÙHÙˆYÚ]™[ÈÙˆš\ÚËˆ‚ˆKˆLÎˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ‘[Ûˆ˜Z[š[™ÈÛÛ][ÛœÈ\È˜Y][Û˜[H›ØÝ\ÙYÛˆ›ÙXÝÈÚ]™YXÝX›H™]\›œÈ[™X\šÙ]ÈÚ]ÝX›H™YÝ[]ÜžH[š\›Û›Y[Ë™Y™\œš[™ÈÈ]›ÚY[œ™YXÝX›H[š]X]]™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ’ÝÈØ[ˆ\È[œÝ]][Û‰ÜÈš\ÚÈ\]]H‘TÕ™H\ØÜšX™YÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛœÙ\˜]]™H‹ˆŠH^[œÚ[Û˜\žH‹ˆÊH™]]˜[‹ˆ‘
Hš\ÚÈÛ\˜[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÛÛœÙ\˜]]™JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH\›ØXÚÙˆ›ØÝ\Ú[™ÈÛˆ™YXÝX›H™]\›œÈ[™ÝX›HX\šÙ]Ë^XÚ]H]›ÚY[™È[˜Ù\Z[ˆÜˆÜXÝ[]]™HÛÛ^Ë[™XØ]\ÈHÛÛœÙ\˜]]™Hš\ÚÈ\]]KÚXÚš[Üš]^™\ÈØ\][™\Ù\˜][Ûˆ[™ÝXš[]HÝ™\ˆYÙÜ™\ÜÚ]™HÜ›ÝÝ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH^[œÚ[Û˜\žJŠˆXØÙ\ÈÝ›Û™Èš\ÚÜÈ›ÜˆYÚ™]\›œË—ˆ
ˆ
ŠÊH™]]˜[
Šˆ[šY›Ü›[H˜[[˜Ù\Èš\ÚÈ]™\œÚ[Ûˆ[™š\ÚÈ\]]K—ˆ
ˆ
Š‘
Hš\ÚÈÛ\˜[˜ÙJŠˆ\ÈH™[]YÛÛ˜Ù\]^™\ÜÙ\ÈH]X[]]]™H™\ÚÛÜˆXØÙ\X›H]šX][Ûˆœ›ÛHØš™XÝ]™\Ë›ÝH]X[]]]™H\HÙˆš\ÚÈ\]]Kˆ‚ˆKˆMˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý\È[Ûš]Üš[™È\Ù\ˆXØÙ\ÜÈ]\›œÈÚ][ˆHÛÜœÜ˜]H™]ÛÜšÈÈ]XÝ™Z]š[Ü˜[[›ÛX[Y\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ]š]Y\ÈÛÝ[˜Z\ÙHHÔ‘PUTÕÛÛ˜Ù\›ˆ›ÜˆH[˜[\ÝÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ[\ÞYYHÚÈ\ÝX[HXØÙ\ÜÙ\ÈH™]ÛÜšÈœ›ÛHNŒSHÈNŒHÝ\ÈÛÛ›™XÝ[™Èœ™\]Y[H]ÎŒSKˆ‹ˆŠHH™XÙZ\Ùˆ[XZ[Èœ›ÛH[X[ˆ™\ÛÝ\˜Ù\È\ÚÚ[™È[\ÞYY\ÈÈš[Ý]›ØˆØ]\Ù˜XÝ[ÛˆÝ\™^\Ëˆ‹ˆÊH[ˆ[\ÞYYHZÚ[™ÈHÛ™Ù\ˆ[˜Úœ™XZÈ[ˆ\ÝX[ˆ‹ˆ‘
HH\ØÛÝ™\žHÙˆ[ˆ[šÛ›ÝÛˆTÐˆš]™HÛÛ›™XÝYÈH˜XÚÈÙˆ[ˆÙ™šXÙHÛÜšÜÝ][Û‹ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH[ˆ[\ÞYYHÚÈ\ÝX[HXØÙ\ÜÙ\ÈH™]ÛÜšÈœ›ÛHNŒSHÈNŒHÝ\ÈÛÛ›™XÝ[™Èœ™\]Y[H]ÎŒSKŠŠ——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÝY[ˆ[™™\X]Y]šX][Ûˆœ›ÛH›Ü›X[[YKX˜\ÙYXØÙ\ÜÈ]\›œÈ
ÙÚ[œÈÝ]ÚYHÝ[™\™ÛÜšÚ[™ÈÝ\œÊH™\™\Ù[ÈH\XØ[[™XØ]ÜˆÙˆH™Z]š[Ü˜[[›ÛX[Kˆ]Ø[ˆÚYÛ˜[ÛÛ\›ÛZ\ÙYÜ™Y[X[Ë[ˆ]XÚÈ[ˆ›ÙÜ™\ÜÈÜˆ[ˆ[œÚY\ˆ™X]—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ™XÙZ]š[™È[\›˜[Ý\™^\ÈšXH[XZ[\ÈH›Ü›X[ÛÜœÜ˜]HXÝ]š]K[›\ÜÈ\™H\™HÛX\ˆ\Ú[™È[™XØ]ÜœÈ›Ý\ØÜšX™Y[ˆHØÙ[˜\š[Ë—ˆ
ˆ
ŠÊJŠˆH›ÛÛ™ÙY[˜Úœ™XZÈ\ÈH\œÛÛ›™[X[˜YÙ[Y[\ÜÝYK›ÝHÞX™\œÙXÝ\š]HÜˆÞ\Ý[H]™[—ˆ
ˆ
Š‘
JŠˆ[ÝYÚH™\Ù[˜ÙHÙˆ[ˆ[šÛ›ÝÛˆTÐˆš]™H\ÈHš[Û][ÛˆÙˆ\ÚXØ[[™]šXÙHÙXÝ\š]HÛXÚY\ËH]Y\Ý[ÛˆÜXÚYšXØ[HÛÛ˜Ù\›œÈH[Ûš]Üš[™ÈÙˆÙÚXØ[
Š\Ù\ˆXØÙ\ÜÈ]\›œÊŠ‹›ÝH\ÚXØ[ÙXÝ\š]HÙˆ\™Ø\™HÜËˆ‚ˆKˆMNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ’[ˆHÛÛ^Ùˆ]HÛÝ™\›˜[˜ÙH[™ÛÛ\X[˜ÙHÚ]]Hš]˜XÞH™YÝ[][ÛœÈ
ÝXÚ\ÈHÑŠKHÛÛ›Û[™›ØÙ\ÜÚ[™È›Û\È\™HYš[™Y™\žHšYÛÜ›Ý\ÛKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ\ØÜšX™\ÈH›ÛHÙˆH]H›ØÙ\ÜÛÜˆ[ˆ]HÛÝ™\›˜[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH][™\[™[H]˜[X]\È[™X[˜YÙ\ÈHÛÛ\[žIÜÈ]K\ÙXÝ\š]H[™™YÝ[]ÜžKXÛÛ\X[˜ÙHš\ÚÜËˆ‹ˆŠH]›ØÙ\ÜÙ\È\œÛÛ˜[]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\ˆ[™\Y\ÈHYÜ™YYÙXÝ\š]HYX\Ý\™\Ëˆ‹ˆÊH]\ÝX›\Ú\ÈHÝ˜]YÚXÈ\™XÝ[Ûˆ[™ÛXÚY\È›ÜˆX[˜YÚ[™ÈH]HÙˆH[\™HÜ™Ø[š^˜][Û‹ˆ‹ˆ‘
H]\È\™XÝH™\ÜÛœÚX›H›ÜˆÛ\ÜÚYžZ[™È]H[™Yš[š[™ÈXØÙ\ÜÈ\›Z\ÜÚ[ÛœËˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH]›ØÙ\ÜÙ\È\œÛÛ˜[]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\ˆ[™[œÝ\™\ÈH[\[Y[][ÛˆÙˆÙXÝ\š]HYX\Ý\™\ËŠŠ——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘]H›ØÙ\ÜÛÜŠŠˆ\ÈH\ÚÈÙˆ›ØÙ\ÜÚ[™È[™[™[™È\œÛÛ˜[]HžHšYÛÜ›Ý\ÛH›ÛÝÚ[™ÈH[œÝXÝ[ÛœÈ›ÝšYYžHH
Š‘]HÛÛ›Û\ŠŠ‹[™]\Ý[ÛÈ[œÝ\™HHYÜ[ÛˆÙˆY\]X]HXÚšXØ[[™Ü™Ø[š^˜][Û˜[ÙXÝ\š]HYX\Ý\™\ÈÈ›ÝXÝHX[˜YÙY]K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]˜[X][™È[™X[˜YÚ[™Èš\ÚÜÈ\ÈH\XØ[[˜Ý[ÛˆÙˆÙXÝ\š]H[™ÛÛ\X[˜ÙHÛÛ[Z]Y\ÈÜˆÙˆHš\ÚÈX[˜YÙ\‹—ˆ
ˆ
ŠÊJŠˆ[™
Š‘
JŠˆYš[š[™ÈÝ˜]YÚXÈ\™XÝ[Û‹Û\ÜÚYžZ[™È]H[™\ÝX›\Ú[™ÈXØÙ\ÜÈ\›Z\ÜÚ[ÛœÈ\™H\™XÝ™\ÜÛœÚXš[]Y\ÈÙˆH
Š‘]HÝÛ™\ŠŠˆÜˆHÛÝ™\›˜[˜ÙHÛÛ[Z]YKˆ‚ˆKˆMŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\ÜÙ\ÜÙ\ÈHš\ÚÈÙˆHYØXÞH\Ú[™\ÜÈÞ\Ý[H]Ø[ˆ›ÈÛ™Ù\ˆ™H\]Yˆ™\XÚ[™È]ÛÜÝÈ[Ü™H[ˆHÚÛH›ØÙ\ÜÈ]Ù\™\È\ÈÛÜÈH™[™Üˆ›ÈÛ™Ù\ˆ^\ÝËÛÈ\™H\È›Ø›ÙHÈ\ÜÈ™\ÜÛœÚXš[]HÎÈ™]\š[™È]ÛÝ[[›ÙXÝ[Û‹ˆX[˜YÙ[Y[\™Y›Ü™HXÚY\ÈÈÙY\]]È\ÛÛ]H][ˆHYXØ]Y™]ÛÜšÈÙYÛY[™XXÚX›HÛ›H›ÝYÚH[Ûš]Ü™Y[\Ù\™\‹[™È[˜X›HÜXÚYšXÈ[Ûš]Üš[™ÈÙˆXØÙ\ÜÈÈ]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈ™X]Y[Ý˜]YÞH\ÈX[˜YÙ[Y[\YYÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ]›ÚY[˜ÙKÚ]š[™È\HXÝ]š]H]Ù[™\˜]\ÈHš\ÚÈ‹ˆŠHš\ÚÈ˜[œÙ™\‹ÚY[™ÈH\™[ˆÛÈH\™\H‹ˆÊHš\ÚÈZ]YØ][Û‹™YXÚ[™È]ÈZÙ[ZÛÙ[™[\XÝ‹ˆ‘
Hš\ÚÈXØÙ\[˜ÙKXÚÛ›ÝÛYÚ[™È]Ú]Ý]\\ˆXÝ[Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHš\ÚÈZ]YØ][ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š“Z]YØ][ÛŠŠˆYX[œÈÙY\[™ÈHXÝ]š]K[™Ú]]\ÙˆHš\ÚËÚ[H[›ÙXÚ[™ÈÛÛ›ÛÈ]ÝÙ\ˆ]È
Š›ZÙ[ZÛÙ
ŠˆÜˆ
Šš[\XÝ
Š‹ˆ]\È™XÚ\Ù[HÚ]Ø\ÈÛ™NˆH[™\˜X›HÞ\Ý[HÝ^\È[ˆÙ\šXÙK™XØ]\ÙH]\È™YYY]™]ÛÜšÈÙYÛY[][ÛˆÚ\œH™YXÙ\ÈÚÈØ[ˆ™XXÚ]H[Ûš]Ü™Y[\Ù\™\ˆXZÙ\ÈXØÙ\ÜÈ˜XÙXX›H[™ÛÛ›ÛY[™YXØ]Y[Ûš]Üš[™ÈÚÜ[œÈ]XÝ[Ûˆ[YHYˆÛÛY][™ÈÛÙ\ÈÜ›Û™Ëˆ›Û™HÙˆ\ÙHÛÛ›ÛÈ™[[Ý™\ÈHÞ\Ý[IÜÈ[™\˜Xš[]KÚXÚ™[XZ[œÎˆ^H™YXÙHH
Š›ZÙ[ZÛÙ
ŠˆÙˆ]™Z[™È™XXÚY[™H
Šš[\XÝ
ŠˆYˆ]\[™YˆÚ[ˆH[™\˜Xš[]HØ[››Ý™H™[[Ý™Y\È\ÈHÚ\H
Š˜ÛÛ\[œØ][™ÈÛÛ›ÛÊŠˆZÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ]›ÚY[˜ÙNŠŠˆYX[œÈ
Š™Ú]š[™È\HXÝ]š]JŠˆ]Ù[™\˜]\È]›Üˆ[œÝ[˜ÙHžH™]\š[™ÈHÞ\Ý[HÜˆX˜[™Ûš[™ÈH›ØÙ\ÜÈ]Ù\™\ËˆHØÙ[˜\š[È[\È]Ý]^XÚ]NˆÝÜ[™È]ÛÝ[[›ÙXÝ[Û‹ˆ]›ÚY[˜ÙH™\›Ù\ÈHš\ÚË]Û›H[Û™ÈÚ]H™[™Yš]—ˆ
ˆ
ŠŠHš\ÚÈ˜[œÙ™\ŽŠŠˆÚYÈH
Š™š[˜[˜ÚX[\™[ŠŠˆÈH\™\K\XØ[H›ÝYÚ[ˆ[œÝ\˜[˜ÙHÛXÞHÜˆHÛÛ˜XÝX[Û]\ÙHÚ]H™[™Ü‹ˆ\™HH™[™Üˆ›ÈÛ™Ù\ˆ^\ÝÈ[™›ÈÛÝ™\ˆØ\ÈZÙ[ˆÝ]ˆ™[Y[X™\ˆÛÈ]˜[œÙ™\ˆ[Ý™\ÈHÛÜÝ™]™\ˆ[[X]HXØÛÝ[Xš[]HÝØ\™[Ý\ˆÝÛˆÝ\ÝÛY\œÈ[™[Ý\ˆ™YÝ[]Ü‹—ˆ
ˆ
Š‘
Hš\ÚÈXØÙ\[˜ÙNŠŠˆYX[œÈXÚÛ›ÝÛYÚ[™È]
ŠÚ]Ý][›ÙXÚ[™È[žHY][Û˜[ÛÛ›Û
Š‹›ÝYÚH›Ü›X[ØÝ[Y[YXÚ\Ú[ÛˆžHÛÛY[Û™HÚ]H]]Üš]HÈXZÙH]ˆ]ÛÝ[]™H™Y[ˆHšYÚ[œÝÙ\ˆYˆX[˜YÙ[Y[YXÚYYÈX]™HHÞ\Ý[H\È]Ø\Îˆ]\™H™YHÛÛ›ÛÈÙ\™H][ˆXÙK——Šˆ
Š‘^[H˜\ŠŠˆ[H›Ý\ˆÝ˜]YÚY\È\\žH\ÚÚ[™ÈÚ]Ú[™Ù\ÈY\ˆHXÚ\Ú[Û×‹ˆ
Š]›ÚY
ŠˆHHXÝ]š]HÙX\Ù\È0­È
Š•˜[œÙ™\ŠŠˆHHXÝ]š]HÛÛ[Y\È[™HÛÜÝÙˆ\›H[Ý™\ÈÈÝ\œÈ0­È
Š“Z]YØ]JŠˆHHXÝ]š]HÛÛ[Y\ÈÚ]™]ÈÛÛ›ÛÈ0­È
ŠXØÙ\
ŠˆHHXÝ]š]HÛÛ[Y\È[˜Ú[™ÙYžHHÛÛœØÚ[Ý\Ë™XÛÜ™YXÚ\Ú[Û‹ˆÛÈÛ\šYšXØ][ÛœÈ]™XÝ\ˆ[ˆ^[H]Y\Ý[ÛœÎˆHš\ÚÈYY\ˆZ]YØ][Ûˆ\ÈØ[Y
Šœ™\ÚYX[š\ÚÊŠˆ[™]\Ý]Ù[ˆ™H›Ü›X[HXØÙ\YÈ[™XØÙ\[˜ÙH\ÈÛ›H˜[YÚ[ˆ
Š™ØÝ[Y[Y
ŠˆžHÛÛY[Û™HÚ]]]Üš]KÚ]H™]šY]È]KÝ\Ú\ÙH]\È›ÝXØÙ\[˜ÙH]™YÛYÙ[˜ÙKˆ‹ˆKˆMÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHÞ\Ý[HYZ[š\Ý˜]Üˆ]\ÝÙ[XÝHÞ[[Y]šXËZÙ^H[˜Üž\[ÛˆÝ[™\™È[œÝ\™HHÛÛ™šY[X[]H[™ÙXÝ\š]HÙˆ]H›Ý]™\Ý[™[ˆ˜[œÚ]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È[˜Üž\[ÛˆÝ[™\™È\È\ÙYš[X\š[HÈ›ÝXÝ]H]™\Ý[™[ˆ˜[œÚ]›ÝYÚÞ[[Y]šXËZÙ^H[˜Üž\[ÛÈ‹ˆÜ[ÛœÎˆÂˆJHQTÈ
Y˜[˜ÙY[˜Üž\[ÛˆÝ[™\™
H‹ˆŠHPPÈ
\ÚP˜\ÙYY\ÜØYÙH]][XØ][ÛˆÛÙJH‹ˆÊH”ÐH
š]™\ÝTÚ[Z\‹PY[X[ŠH‹ˆ‘
HÒH
ÙXÝ\™H\Ú[ÛÜš]JH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHQTÈ
Y˜[˜ÙY[˜Üž\[ÛˆÝ[™\™
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠQTÈ
Y˜[˜ÙY[˜Üž\[ÛˆÝ[™\™
JŠˆ\ÈHÝ[™\™Þ[[Y]šXÈ[˜Üž\[Ûˆ[ÛÜš]HÚY[HYÜYÛØ˜[HÈ[œÝ\™HHÛÛ™šY[X[]HÙˆ]H]™\Ý[™[ˆ˜[œÚ][šÜÈÈ]ÈYÚY™šXÚY[˜ÞH[™ÛÛ\]][Û˜[›Ø\Ý™\ÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHPPÊŠˆ\ÈH\ÚX˜\ÙYY]Ù›Üˆ™\šYžZ[™ÈH[YÜš]H[™]][XÚ]HÙˆY\ÜØYÙ\Ë›Ý›Üˆ[˜Üž\[™È[K—ˆ
ˆ
ŠÊH”ÐJŠˆ\È[ˆ\Þ[[Y]šXÈ
X[ZÙ^JH[ÛÜš]H\ÙYš[X\š[H›ÜˆHÙXÝ\™H^Ú[™ÙHÙˆÙ^\È[™›ÜˆYÚ][ÚYÛ˜]\™\Ë›Ý›ÜˆH[È[˜Üž\[ÛˆÙˆ]H]™\Ý—ˆ
ˆ
Š‘
HÒJŠˆ\ÈH˜[Z[HÙˆÛ™K]Ø^H\Ú[™È[˜Ý[ÛœÈ[[™Y^Û\Ú]™[HÈ[œÝ\™H]H[YÜš]H›ÝYÚHØ[Ý[][ÛˆÙˆYÚ][š[™Ù\œš[ËÚ]Ý][žH[˜Üž\[Û‹ÙXÜž\[Ûˆ[˜Ý[Û‹ˆ‚ˆKˆNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ]Ù[H[››Ý˜][ÛœÈË]šY\È™XÙ[H›ÝXÙYÛÛYH[\ÝX[]\›œÈ[ˆ\ÈX[IÜÈÛÜšÙ›ÝËˆ˜[X\š[ËH\ÝX[H[YÙ[[\ÞYYK\ÈÝY[›HÝ\YXØÙ\ÜÚ[™Èš[\È[œ™[]YÈ\È\\Y[[™Ø\ÈØ]YÚ\ØY[™È\™ÙH[[Ý[ÈÙˆ]HÈ[ˆ^\›˜[ÛÝYÙ\šXÙKˆ[œš\]YHZ\ÝZÙ[›HÛXÚÙYÛˆHÝ\ÜXÚ[Ý\È[XZ[[šË]™\ÜY][[YYX][KˆÝ\Ø[ˆ›ÝXÙY]\ˆÛÛ\]\ˆØ\È]XÚÛÝÙ\ˆ[ˆ\ÝX[]™[ˆÝYÚÚHY›ÝXYH[žHÚ[™Ù\ÈÜˆ\]\Ëˆ‹ˆ]Y\Ý[ÛŽˆ‘Ú]™[ˆ\ÙHÚ]X][ÛœËÚXÚÙˆH›ÛÝÚ[™È[\ÞYY\È\ÈX[šY™\ÝY[›ÛX[Ý\Ëš\ÚÞH[™[™^XÝY™Z]š[Üˆ]ÛÝ[[™XØ]HHÝ[X[ÙXÝ\š]H™X]È‹ˆÜ[ÛœÎˆÂˆJH˜[X\š[È‹ˆŠH]šY‹ˆÊH[œš\]YH‹ˆ‘
HÝ\Ø[ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH˜[X\š[ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ˜[X\š[È[[[Û˜[HÙX\˜ÚY›Üˆš[\È[œ™[]YÈ\È]Y\È[™XÝ]™[H^š[˜]Y\™ÙH›Û[Y\ÈÙˆ]HÈ[ˆ^\›˜[ÛÝYÚ]Ý][žH\Ú[™\ÜÈ\ÝYšXØ][Û‹ˆ\È™Z]š[Üˆ\È›Ýš\ÚÞH[™[\ÝX[ÛÛœÝ]][™ÈHÛ\ÜÚXÈ[œÚY\ˆ™X]ÜˆXØÛÝ[ÛÛ\›ÛZ\ÙHØÙ[˜\š[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH]šY
Šˆ\ÈHÝ\\š\ÛÜˆÚÈØœÙ\™\ÈH[›ÛX[Y\ËÚ]Ý]\™›Ü›Z[™È[žH[\›Ü\ˆXÝ[Û‹—ˆ
ˆ
ŠÊH[œš\]YJŠˆXYH[ˆ[š[[[Û˜[Z\ÝZÙH
ÛXÚÚ[™ÈÛˆH[šÊH]XÝYÛÜœ™XÝHžH™\Ü[™È][[YYX][K[[ÛœÝ˜][™ÈY\™[˜ÙHÈÛXÚY\È[™XœÙ[˜ÙHÙˆX[XÚ[Ý\È[[—ˆ
ˆ
Š‘
HÝ\Ø[ŠŠˆ^\šY[˜Ù\ÈXÚšXØ[ÛÝÙÝÛœÈ]ÛÝ[™\Ý[œ›ÛHX[Ø\™K]\È›Ý\œÛÛ˜[H\™›Ü›YY[žH[›ÛX[Ý\ÈÜˆš\ÚÞHXÝ[Û‹ˆ‚ˆKˆNNˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[ÎˆX™[\ÈÝYÙÙ\ÝY]\ÈÛÛ\[žH\™›Ü›HHÝ\HÚZ[ˆ[˜[\Ú\È›Üˆ[ÛÜœÜ˜]HÝ\Y\œËˆ\ÈXÝ]š]HÚ[™HÛÜÝH[™[YKXÛÛœÝ[Z[™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚH\È][\Ü[›ÜˆHÛÛ\[žHÈÛÛ™XÝHÝ\HÚZ[ˆ[˜[\Ú\È\Ü]HHÛÜÝÈ[™[YH™\]Z\™YÈ‹ˆÜ[ÛœÎˆÂˆJHÈ]\›Z[™HHÝ\Y\‰ÜÈÝ\ÝÛY\ˆØ]\Ù˜XÝ[Ûˆ˜][™ÜÈ[ˆÜ™\ˆÈÚÛÜÙHÛ›HH™\Ý\Ú[™\ÜÈ\™\œËˆ‹ˆŠHÈ]˜[X]HHÝ\Y\‰ÜÈš[˜[˜ÚX[ÝXš[]HÛÈ]HÝ\HÚZ[ˆÙ\È›Ýœ™XZÈÝÛˆYHÈH˜[šÜ\ÞHÜˆÛÜÝ\™Kˆ‹ˆÊHÈY[YžHÝ[X[ÙXÝ\š]Hš\ÚÜÈ\ÜÛØÚX]YÚ]HÝ\Y\‰ÜÈÝ\HÚZ[‹ˆ‹ˆ‘
HÈ]˜[X]HHÝ\Y\‰ÜÈÛÛ\X[˜ÙHÚ]YØ[™YÝ[][ÛœËÛÈ]HÛÛ[Z\ÜÚ[Ûš[™ÈÛÛ\[žH]Ù[ˆ™[XZ[œÈÛÛ\X[ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÈY[YžHÝ[X[ÙXÝ\š]Hš\ÚÜÈ\ÜÛØÚX]YÚ]HÝ\Y\‰ÜÈÝ\HÚZ[‹ŠŠ——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÝ\HÚZ[ˆ[˜[\Ú\ÈZ[\ÈÈY[YžHÙXÝ\š]H[™\˜Xš[]Y\ÈÜˆ™X]È[›ÙXÙYžH\™\Y\È
K™Ëˆ\™Ø\™H˜XÚÙÛÜœË[™™XÝYÛÙØ\™KÛÜˆÞX™\ˆYÚY[™HÙˆ\™\œÊH]ÛÝ[›ÜYØ]HÚ][ˆHÛÛ[Z\ÜÚ[Ûš[™ÈÜ™Ø[š^˜][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]˜[X]\ÈÛÛ[Y\˜ÚX[]X[]H]Ù™™\œÈ›È[™›Ü›X][ÛˆX›Ý]HÞX™\œÙXÝ\š]HÜÝ\™K—ˆ
ˆ
ŠŠJŠˆ[™
Š‘
JŠˆš[˜[˜ÚX[ÝXš[]H[™YØ[ÛÛ\X[˜ÙH\™H[\Ü[\ÜÙ\ÜÛY[ÈÙˆÙ[™\˜[ÛÜœÜ˜]HYH[YÙ[˜ÙK]È›ÝÛÝ™\ˆHXÚšXØ[š\ÚÜÈ[™ÙXÝ\š]H[™\˜Xš[]Y\È[›ÙXÙY[ÈHÝ\HÚZ[‹ˆ‚ˆKˆLˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ\™\È[ˆ^\›˜[Ý\Y\ˆÈX[˜YÙH]È]HÝÜ˜YÙH™YYËˆÈ[œÝ\™HÛÛ™šY[X[]H[™\ÝX›\ÚÛX\ˆ^XÝ][ÛœÈX›Ý]™\ÜÛœÚXš[]Y\Ë^HÚYÛˆHØÝ[Y[]\ØÜšX™\ÈHÙXÝ\š]HÛÛ›ÛË]˜Z[Xš[]H™\]Z\™[Y[È[™ÛÛ™šY[X[]HÛ]\Ù\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆYÜ™Y[Y[\È™\™\Ù[YžH\ÈØÝ[Y[È‹ˆÜ[ÛœÎˆÂˆJH\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
”JH‹ˆŠH]H\ÙHYÜ™Y[Y[
PJH‹ˆÊHÙ\šXÙH]™[YÜ™Y[Y[
ÓJH‹ˆ‘
HY[[Ü˜[™[HÙˆ[™\œÝ[™[™È
SÕJH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÙ\šXÙH]™[YÜ™Y[Y[
ÓJJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”Ù\šXÙH]™[YÜ™Y[Y[
ÓJJŠˆ\ÝX›\Ú\ÈHÙ\šXÙH^XÝ][ÛœÈ™]ÙY[ˆHÝ\ÝÛY\ˆ[™H\™\\HÙ\šXÙH›ÝšY\‹[˜ÛY[™È™XÚ\ÙHY]šXÜÈÛˆ\™›Ü›X[˜ÙH
ÝXÚ\ÈÙ\™\ˆ]˜Z[Xš[]KÝ\[YJK\XØX›HÙXÝ\š]HÝ[™\™È[™]HÛÛ™šY[X[]HØ›YØ][ÛœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH”JŠˆÛÝ™\›œÈH›Ùš]È[™YØ[™\ÜÛœÚXš[]Y\ÈÙˆHÛÛ[Y\˜ÚX[\™\œÚ\™]ÙY[ˆÛÈ[]Y\Ë—ˆ
ˆ
ŠŠHPJŠˆYš[™\ÈH\›Z]YÛÛ™][ÛœÈÙˆ\ÙH›ÜˆHÜXÚYšXÈ]\Ù]˜[œÙ™\œ™Y›Üˆ™\ÙX\˜ÚÜˆ[˜[\Ú\È\œÜÙ\ËÚ]Ý]ÛÝ™\š[™ÈHÙ[™\˜[]™[ÈÙˆ[™œ˜\ÝXÝ\™H›Ýš\Ú[Û‹—ˆ
ˆ
Š‘
HSÕJŠˆ\ÈH™[[Z[˜\žH[™›Û‹[YØ[KXš[™[™ÈÝ][Y[Ùˆ[[ˆ‚ˆKˆLNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHÛÛ\[žIÜÈ[\›˜[ÛÛ\X[˜ÙHX[H\š[ÙXØ[H˜YÈ]Z[Y™\ÜÈÛˆH]™[ÙˆY\™[˜ÙHÈÝ\œ™[™YÝ[][ÛœÈ[™ÛÜœÜ˜]HÛXÚY\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHš[X\žH\œÜÙHÙˆ[\›˜[ÛÛ\X[˜ÙH™\Ü[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÈ™\]Y\ÝY][Û˜[[™›Ü›X][Ûˆœ›ÛHHÛÝ™\››Y[YÙ[˜ÚY\È™\ÜÛœÚX›H›ÜˆÝ™\œÚYÚˆ‹ˆŠHÈ›ÝšYH\]\ÈÛˆHÛÛ\X[˜ÙHÝ]\ÈÈHÜ™Ø[š^˜][Û‰ÜÈX[˜YÙ[Y[ˆ‹ˆÊHÈÛÛ[][šXØ]HHÛÛ\X[˜ÙHÝ]\ÈÈH^\›˜[X›XËˆ‹ˆ‘
HÈ[[ÛœÝ˜]HÈ\™\\H[™^\›˜[]Y]ÜœÈ]HÛÛ\[žHÛÛ\Y\ÈÚ]]È[\›˜[›ØÙ\ÜÙ\Ëˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÈ›ÝšYH\]\ÈÛˆHÛÛ\X[˜ÙHÝ]\ÈÈHÜ™Ø[š^˜][Û‰ÜÈX[˜YÙ[Y[ŠŠ——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH[™[Y[[\œÜÙHÙˆ[\›˜[™\Ü[™È\ÈÈ[™›Ü›HX[˜YÙ[Y[X›Ý]HÜ™Ø[š^˜][Û‰ÜÈÝ\œ™[ÛÛ\X[˜ÙHÜÝ\™KYÚYÚ[™È][š\ÚÜÈÜˆØ\ÈÈ™H™[YYYY\ÈÝ\Ü[™È[ˆ[\›˜[[™[™›Ü›YYXÚ\Ú[Û‹[XZÚ[™È›ØÙ\ÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]Ù\È›ÝÙ\™HÈXZÙH™\]Y\ÝÈÈ^\›˜[ÛÛ\X[˜ÙHYÙ[˜ÚY\Ë—ˆ
ˆ
ŠÊJŠˆ[\›˜[™\Ü[™ÈžHYš[š][Ûˆ\È›Ý[[™Y›Üˆ^\›˜[X›XÈ\ØÛÜÝ\™K—ˆ
ˆ
Š‘
JŠˆ[[ÛœÝ˜][™ÈÛÛ\X[˜ÙHÈ\™\\H[™^\›˜[]Y]ÜœÈ\ÈHØš™XÝ]™HÙˆ
Š™^\›˜[ÛÛ\X[˜ÙH™\Ü[™ÊŠ‹›Ý[\›˜[™\Ü[™ÈÚXÚÙ\™\È›ÜˆÛÛ™šY[X[[\›˜[ÛÛ[][šXØ][ÛœËˆ‚ˆKˆLŽˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ[ˆ]Y]š[™È]HÛÛ\[žIÜÈ[™›Ü›X][ÛˆÙXÝ\š]HÛXÞHØ\È\›Ý™Yš]™HYX\œÈYÛÈ[™\È›Ý™Y[ˆÝXÚYÚ[˜ÙKˆ[ˆHYX[[YHHÛÛ\[žH\ÈYÜY™YHÛÝYÙ\šXÙ\Ë[Ý™Y[ˆ]ÈÝY™ˆÈ™[[ÝHÛÜšË[™Ü[™YHœ˜[˜Ú[ˆHÛÝ[žHÚ]Y™™\™[]H›ÝXÝ[Ûˆ]ËˆHÛXÞHY[[ÛœÈ›Û™HÙˆ\Ë[™Ù]™\˜[\\Y[È]™HÛ™ÈÚ[˜ÙHÛÝ[ÈHXš]ÙˆYÛ›Üš[™È]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[[Y[ÙˆY™™XÝ]™HÙXÝ\š]HÛÝ™\›˜[˜ÙHØ\ÈZ\ÜÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJH›Ü›X[\›Ý˜[ÙˆHÛXÞHžHX[˜YÙ[Y[‹ˆŠHH\Ý[˜Ý[Ûˆ™]ÙY[ˆÛXÚY\ËÝ[™\™È[™Ü\˜][™È›ØÙY\™\È‹ˆÊH[Ûš]Üš[™È[™\š[ÙXÈ™]š\Ú[ÛˆÙˆÛXÚY\È‹ˆ‘
HX›\Ú[™ÈHÛXÞHÈ[[\ÞYY\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[Ûš]Üš[™È[™\š[ÙXÈ™]š\Ú[ÛˆÙˆÛXÚY\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÛXÞH\È›ÝHØÝ[Y[[ÝHÜš]HÛ˜ÙNˆ]\ÈHÛÛ[Z]Y[]]\Ý™H
ŠšÙ\[YÛ™Y
ŠˆÚ]HÛÛ\[žH]Ú[™Ù\ËˆH^[HØš™XÝ]™\È\Ý
›[Ûš]Üš[™È[™™]š\Ú[ÛŠˆ™XÚ\Ù[H[[Û™ÈH[[Y[ÈÙˆY™™XÝ]™HÛÝ™\›˜[˜ÙK[™HØÙ[˜\š[ÈÚÝÜÈÚ]\[œÈÚ[ˆ]\ÈXœÙ[ˆ
Š“[Ûš]Üš[™ÊŠˆÚXÚÜÈ]HÛXÞH\ÈXÝX[H™Z[™È\YY[™YX\Ý\™\ÈY\™[˜ÙNÈ
Šœ™]š\Ú[ÛŠŠˆœš[™ÜÈ]˜XÚÈ[ˆ[™HÚ]™X[]K[™ÚÝ[\[ˆÛˆHš^YØÚY[H8 %›Ü›X[H
Š˜]X\ÝÛ˜ÙHHYX\ŠŠˆ8 %[™[ÛÈ]]™\žH
ŠšYÙÙ\š[™È]™[
ŠŽˆHXZ›ÜˆXÚ›ÛÙÞHÚ[™ÙKH™]ÛH\XØX›H™YÝ[][Û‹HÚYÛšYšXØ[[˜ÚY[H™[Ü™Ø[š^˜][Û‹ˆ\™H\™HÙ\™H™YHšYÙÙ\š[™È]™[Ë[YÛ›Ü™Yˆ›ÝHHÛÜœÝÛÛœÙ\]Y[˜ÙKÚXÚ\ÈÝ[\˜[™Y›Ü™H]\ÈXÚšXØ[ˆÚ[ˆHØÝ[Y[›ÈÛ™Ù\ˆ\ØÜšX™\ÈÝÈÛÜšÈ\ÈÛ™K[ÜHÝÜ›ÛÝÚ[™È]8 %[™]]Ú[^HÝÜZÚ[™ÈÙ\š[Ý\ÛH]™[ˆHÛXÚY\È]ÛÝ[XZÙHÙ[œÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHX[˜YÙ[Y[\›Ý˜[ŠŠˆHØÙ[˜\š[ÈØ^\ÈHÛXÞH
ŠØ\È\›Ý™Y
Šˆš]™HYX\œÈYÛËˆ\›Ý˜[\ÈH™\™\]Z\Ú]H]Ú]™\È]]]Üš]K[™]\[™YˆÚ]Ø\ÈZ\ÜÚ[™È\È]™\ž][™È]ÛÛY\ÈY\‹—ˆ
ˆ
ŠŠH\Ý[™ÝZ\Ú[™ÈÛXÚY\ËÝ[™\™È[™›ØÙY\™\ÎŠŠˆ\È\ÈHØÝ[Y[\žHY\˜\˜ÚH]Ù[Z[™[HX]\œÈ8 %H
ŠœÛXÞJŠˆÝ]\ÈH
Ú]
ˆ[™H
ÚJ‹H
ŠœÝ[™\™
Šˆš^\ÈYX\Ý\˜X›H™\]Z\™[Y[ËH
Šœ›ØÙY\™JŠˆ\ØÜšX™\ÈHÜ\˜][Û˜[Ý\È8 %]›Ý[™È[ˆHØÙ[˜\š[ÈÝYÙÙ\ÝÈH™YH]™[È\™HÛÛ™\ÙYˆH›Ø›[H\ÈHØÝ[Y[	ÜÈYÙK›Ý]ÈÝXÝ\™K—ˆ
ˆ
Š‘
HX›\Ú[™ÈÈ[\ÞYY\ÎŠŠˆ[ÛÈ[™\Ü[œØX›K™XØ]\ÙHHÛXÞH›Ø›ÙH\È™XYØ[››Ý™H[™›Ü˜ÙYˆ]H^Ù\È›ÝØ^H]Ý^YY[šÛ›ÝÛŽˆ]Ø^\È\\Y[È
ŠœÝÜY›ÛÝÚ[™È]
Š‹YX[š[™È^HÛ™]È][™›Ý[™]\ØÛÛ›™XÝYœ›ÛH™X[ÛÜšË——Šˆ
Š‘^[H˜\ŠŠˆÙY\H[Y™HÞXÛHÙˆHÛXÞH[ˆZ[™™XØ]\ÙH]Y\Ý[ÛœÈ\ÛÛ]HÛ™H\ÙH]H[YKˆ
Š‘˜Y[™ÊŠˆ8¡¤ˆX[˜YÙ[Y[
Š˜\›Ý˜[
Šˆ8¡¤ˆ
ŠœX›XØ][Ûˆ[™˜Z[š[™ÊŠˆ8¡¤ˆ
Š™[™›Ü˜Ù[Y[
ŠˆÚ]]ÈÛÛ›ÛÈ8¡¤ˆ
Š›[Ûš]Üš[™ÊŠˆÙˆY\™[˜ÙH8¡¤ˆ\š[ÙXÈ
Šœ™]š\Ú[ÛŠŠ‹\È™]š\Ú[Ûˆ]]™\žHšYÙÙ\š[™È]™[8¡¤ˆ
Šœ™]\™[Y[
ŠˆÚ[ˆ›ÈÛ™Ù\ˆ™YYYˆÚ[ˆHØÙ[˜\š[ÈÙ[ÈÛˆÝÈ]XÚ[YH\È\ÜÙY[™ÝÈ]XÚHÛÛ\[žH\ÈÚ[™ÙYHZ\ÜÚ[™È\ÙH\È[Ø^\È[Ûš]Üš[™È[™™]š\Ú[Û‹ˆ‹ˆKˆLÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHÜ™Y][œÝ]][Ûˆ[™H\™ÙHÜÜ][]\Ý\š[ÙXØ[HY\Z\ˆXÚ›ÛÙÚXØ[[™œ˜\ÝXÝ\™\ÈÈÛÛ\HÚ]HÝšXÝ[\È[\ÜÙYžHÛÝ™\››Y[›ÙY\ÈYXØ]YÈHÝ™\œÚYÚÙˆÜXÚYšXÈÙ[œÚ]]™HÙXÝÜœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È™Y™\œÈÈH[]Y\È]\ÝX›\Ú[™[\ÜÙHÙXÝ\š]HÝ[™\™Ë™YÝ[][ÛœÈ[™ÝZY[[™\È[ˆÜXÚYšXÈÙXÝÜœÈÝXÚ\Èš[˜[˜ÙH[™X[Ø\™OÈ‹ˆÜ[ÛœÎˆÂˆJH™YÝ[]ÜžHYÙ[˜ÚY\È‹ˆŠH]H›ÝXÝ[Ûˆ]]Üš]Y\È‹ˆÊH[[YÙ[˜ÙHYÙ[˜ÚY\È‹ˆ‘
H]È[™›Ü˜Ù[Y[YÙ[˜ÚY\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH™YÝ[]ÜžHYÙ[˜ÚY\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”™YÝ[]ÜžHYÙ[˜ÚY\ÊŠˆ
ÝXÚ\ÈHÑPÈ›Üˆš[˜[˜ÙHÜˆ˜\š[Ý\ÈZ[š\Ý\šX[›ÙY\È›ÜˆX[Ø\™JH]™HHYØ[]]Üš]HÈ\ÜÝYH[™[™›Ü˜ÙHX[™]ÜžH[\ËÝ[™\™È[™ÝZY[[™\È]Ü™Ø[š^˜][ÛœÈ[ˆÜXÚYšXÈÙXÝÜœÈ]\ÝY\™HÈ[ˆÜ™\ˆÈ[œÝ\™HÙXÝ\š]H[™ÛÛ\X[˜ÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH]H›ÝXÝ[Ûˆ]]Üš]Y\ÊŠˆ
ÝXÚ\ÈHš]˜XÞHÝX\˜[ÜŠH[™›Ü˜ÙHH\œÛÛ˜[]H]ÜÈÙˆ[Ú]^™[œË]È›Ýœ›ØYHYš[™HH][K\ÙXÝÜˆÜ\˜][Û˜[ÙXÝ\š]HÝ[™\™È›Üˆ[\™H[™\ÝšX[ÛXZ[œË—ˆ
ˆ
ŠÊH[[YÙ[˜ÙHYÙ[˜ÚY\ÊŠˆÛÛXÝ[™[˜[^™H˜][Û˜[ÙXÝ\š]H[™›Ü›X][Û‹]È›ÝYš[™H[™\ÝšX[™YÝ[][ÛœË—ˆ
ˆ
Š‘
H]È[™›Ü˜Ù[Y[YÙ[˜ÚY\ÊŠˆ[™\ÝYØ]HÜš[Y\È[™[™›Ü˜ÙHÜš[Z[˜[]ÜË]È›Ý\ÝX›\ÚHXÚšXØ[[™™]™[]™HÛÛ\X[˜ÙHÝ[™\™ÈÙˆX\šÙ]Ëˆ‚ˆKˆLˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHTËX˜\ÙY][[˜][Û˜[ÛÛ\[žHÙ™™\œÈ]ÈÛÝYÙ\šXÙ\ÈXÜ›ÜÜÈ˜\š[Ý\ÈÛÛ[™[ËˆHYØ[X[HØ\›œÈ]HÛÛ\[žH]\ÝÛÛ\HÚ]HÜXÚYšXÈ™\]Z\™[Y[È[\ÜÙYžHHÛÝ™\››Y[ÈÙˆH[™]šYX[˜][ÛœÈÚ\™HÝ\ÝÛY\œÈ™\ÚYH™YØ\™[™ÈHÛÛXÝ[Ûˆ[™™][[ÛˆÙˆ\œÛÛ˜[]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÛÛ˜Ù\ÈÙ\ÈHÚ]X][Ûˆ™Y™\ˆË[ˆÚXÚÜXÚYšXÈ]ÜÈ[™™YÝ[][ÛœÈ\ÝX›\ÚYžHHÛÝ[žIÜÈÛÝ™\››Y[]\›Z[™HÝÈH\œÛÛ˜[]HÙˆ]ÈÚ]^™[œÈ\ÈÛÛXÝY™]Z[™Y[™›ØÙ\ÜÙYÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛœÙ[X[˜YÙ[Y[‹ˆŠHÙ[™\˜[]H›ÝXÝ[Ûˆ™YÝ[][Ûˆ
ÑŠH‹ˆÊH]H[˜Üž\[Ûˆ‹ˆ‘
H˜][Û˜[YØ[[\XØ][ÛœÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H˜][Û˜[YØ[[\XØ][ÛœÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š“˜][Û˜[YØ[[\XØ][ÛœÊŠˆÛÛ\š\ÙHHÙ]Ùˆ]ÜÈ[™™YÝ[][ÛœÈ\ÜÝYY]HÝ]KÛ˜][Û˜[]™[]Ý][™HHX[™]ÜžH™\]Z\™[Y[È[™\š\ÙXÝ[Û˜[›Ý[™\šY\È›Üˆš]˜XÞH›ÝXÝ[Ûˆ[™]HÛÝ™\™ZYÛHÚ][ˆ]ÛÝ[žK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛœÙ[X[˜YÙ[Y[
Šˆ\ÈÛ›HHXÚšXØ[ØYZ[š\Ý˜]]™H›ØÙ\ÜÈ›Üˆ™XÛÜ™[™È\Ù\ˆ™Y™\™[˜Ù\Ë›ÝHÛÝ™\™ZYÛˆYÚ\Û]]™HÛÝ\˜ÙK—ˆ
ˆ
ŠŠHHÑŠŠˆ\ÈHÜXÚYšXÈ[™™\žH[\Ü[^[\HÙˆH]\›ÜX[ˆ[š[Ûˆ™YÝ[][Û‹]H]Y\Ý[Ûˆ\ØÜšX™\ÈHÙ[™\˜[ÛÛ˜Ù\ÙˆÛÝ™\››Y[]ÜÈ]H˜][Û˜[]™[
ÚXÚØ[ˆ[˜ÛYHHÐÔH[ˆHTËHÔ[ˆœ˜^š[]ËŠK—ˆ
ˆ
ŠÊH]H[˜Üž\[ÛŠŠˆ\ÈHXÚ›ÛÙÚXØ[›ÝXÝ[ÛˆYX\Ý\™K›ÝH™YÝ[]ÜžHÜˆYØ[œ˜[Y]ÛÜšËˆ‚ˆKˆLNˆÂˆÜXÎˆ’Y[]H	ˆXØÙ\ÜÈX[˜YÙ[Y[‹ˆØÙ[˜\š[ÎˆHYY][K\Ú^™Y[\œš\ÙHØ[ÈÈ™\ÝXÝ\™HHX[˜YÙ[Y[Ùˆ\›Z\ÜÚ[ÛœÈÛˆÚ\™Y›Û\œÈ[™ÛÜœÜ˜]H]X˜\Ù\Ëˆ[œÝXYÙˆX[X[HÛÛ™šYÝ\š[™ÈXØÙ\ÜÈ›ÜˆXXÚ[™]šYX[[\ÞYYKHÞ\Ý[HYZ[š\Ý˜]ÜˆXÚY\ÈÈÜ›Ý\\›Z\ÜÚ[ÛœÈ˜\ÙYÛˆ\\Y[]Y\È
K™Ëˆ	ÐYZ[š\Ý˜][Û‰Ë	Ñ]™[ÜY[	Ë	Ò[X[ˆ™\ÛÝ\˜Ù\ÉÊKˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈH[™[Y[[š[˜Ú\H[™\›Z[™È›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û
PÊH][È[\›Ý™HHY™™XÝ]™[™\ÜÈÙˆHÙXÝ\š]HÛXÞOÈ‹ˆÜ[ÛœÎˆÂˆJH\ÜÚYÛš[™È\›Z\ÜÚ[ÛœÈÈ›Øˆ[˜Ý[ÛœÈ
]Y\ÊH˜]\ˆ[ˆÈ[™]šYX[\Ù\œÈ‹ˆŠHÜ˜[[™È[\Ü˜\žH\›Z\ÜÚ[ÛœÈ]^\™H]]ÛX]XØ[HY\ˆH™\Ù]\š[Ù‹ˆÊH[ÝÚ[™È[\Ù\œÈXØÙ\ÜÈÈ[™\ÛÝ\˜Ù\Ë[›\ÜÈ\™H\È[ˆ^XÚ]›ÚXš][Ûˆ‹ˆ‘
HÙ][™È\Ù\ˆ\›Z\ÜÚ[ÛœÈ˜\ÙY^Û\Ú]™[HÛˆZ\ˆÙ[š[Üš]HÙˆÙ\šXÙH[ˆHÛÛ\[žH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH\ÜÚYÛš[™È\›Z\ÜÚ[ÛœÈÈ›Øˆ[˜Ý[ÛœÈ
]Y\ÊH˜]\ˆ[ˆÈ[™]šYX[\Ù\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ›ÛKX˜\ÙYXØÙ\ÜÈÛÛ›Û

Š”PÊŠŠH\È˜\ÙYÛˆHš[˜Ú\HÙˆ\ÜÛØÚX][™È\›Z\ÜÚ[ÛœÈÚ]ÜXÚYšXÈ›Ù™\ÜÚ[Û˜[›Ùš[\ÈÜˆÛÜœÜ˜]H›Û\È
K™ËˆXØÛÝ[[[™Ú[™Y\ŠH[™ÝXœÙ\]Y[H\ÜÚYÛš[™È\Ù\œÈÈÜÙH›Û\Ëˆ\ÈÜ™X]HÚ[\YšY\ÈXØÙ\ÜÈX[˜YÙ[Y[™YXÙ\È[X[ˆ\œ›ÜœÈ[™[œÝ\™\ÈÛÜœ™XÝ\XØ][ÛˆÙˆHš[˜Ú\HÙˆX\Ýš]š[YÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ[\Ü˜\žH^\˜][Ûˆ\È\Ùˆ\ÝR[‹U[YH
’U
HÜˆYZØÈÛÛ›ÛË]\È›ÝHÝXÝ\˜[›Ý[™][ÛˆÙˆPË—ˆ
ˆ
ŠÊJŠˆ™\™\Ù[ÈH	Ü\›Z\ÜÚ]™HžHY˜][	È\›ØXÚ]š[Û]\ÈH˜\ÚXÜÈÙˆ[Ù\›ˆÙXÝ\š]K—ˆ
ˆ
Š‘
JŠˆÙ[š[Üš]HÙˆÙ\šXÙHÙ\È›Ý™XÙ\ÜØ\š[HÛÜœ™\ÜÛ™ÈH™X[Ü\˜][Û˜[™YYÈ[™›Øˆ[˜Ý[ÛœÈÙˆ[ˆ[\ÞYYKˆ‚ˆKˆLŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ•HX[˜YÙ[Y[Ùˆ[ˆÜ™Ø[š^˜][ÛˆÛÛœÝ[H[Ûš]ÜœÈH™[™[ˆH\››Ý™\ˆ˜]HÙˆÜš]XØ[U[\ÞYY\È[™H[X™\ˆÙˆ\Ú[™È][\È›ØÚÙY[ÛK\Ú[™È[H\È™]™[]™HÚYÛ˜[ÈÈ[XÚ\]HHÜÜÚX›H[˜Ü™X\ÙH[ˆHš\ÚÈÙˆÞX™\ˆ[˜ÚY[Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È™Y™\œÈÈH[™[Y[[™YXÝ]™HY]šXÈ]Ü™Ø[š^˜][ÛœÈ[Ûš]ÜˆÈ™YXÝÝ[X[š\ÚÜÈ[™Z\ˆ[\XÝÛˆÜ\˜][ÛœÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ\˜[Y]\œÈ‹ˆŠHš\ÚÈY]šXÜÈ‹ˆÊHÙ^Hš\ÚÈ[™XØ]ÜœÈ
Ô’JH‹ˆ‘
Hš\ÚÈ™\ÚÛ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÙ^Hš\ÚÈ[™XØ]ÜœÈ
Ô’JJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š’Ù^Hš\ÚÈ[™XØ]ÜœÈ
Ô’JJŠˆ\™H™YXÝ]™HY]šXÜÈ
XY[™È[™XØ]ÜœÊH\ÙY\ÈX\›K]Ø\›š[™ÈÞ\Ý[\ÈÈÚYÛ˜[˜\šX][ÛœÈ[ˆ^ÜÝ\™HÈHš\ÚËˆ^H[˜X›HX[˜YÙ[Y[ÈZÙH›ØXÝ]™HZ]YØ][ÛˆXÝ[ÛœÈ™Y›Ü™HHš\ÚÈX]\šX[^™\È[È[ˆXÝX[[˜ÚY[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ\˜[Y]\œÊŠˆ\™HÝ]XÈ˜\šXX›\È\ÙY[ˆ›Ü›X[]˜[X][ÛˆØ[Ý[][ÛœË—ˆ
ˆ
ŠŠHš\ÚÈY]šXÜÊŠˆYX\Ý\™HÝ\œ™[^ÜÝ\™HÜˆÜÜÙ\Ë]È›Ý[š[œÚXØ[H]™HH™YXÝ]™HÜˆ™]™[]™HX\›K]Ø\›š[™È˜]\™K—ˆ
ˆ
Š‘
Hš\ÚÈ™\ÚÛ
Šˆ™\™\Ù[ÈHX^[][H]™[ÙˆÛ\˜X›Hš\ÚÈ]HÛÛ\[žH\ÈÚ[[™ÈÈXØÙ\
[šÙYÈš\ÚÈ\]]JK›ÝH™]™[]™H[Ûš]Üš[™ÈY]šXËˆ‚ˆKˆLÎˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ™Y›Ü™HÜ[š[™È™YÛÝX][ÛœÈÝ™\ˆHÜÜÚX›HXÜ]Z\Ú][Û‹ÛÈÛÛ\[šY\È]\Ý^Ú[™ÙH›Û‹\X›XÈXØÛÝ[ËÝ\ÝÛY\ˆ\ÝÈ[™XÚšXØ[›ÙXÝ]Z[Ëˆ™Z]\ˆ\ÈY]ÛÛ[Z]YÈÛÛ˜ÛY[™È[ž][™Ë[™H[ÜÈX^H˜Z[ˆHØÝ[Y[\È™YYYš[™[™È›Ý›ÝÈ\ØÛÜÙHÜˆÝ\Ú\ÙH\ÙHH[™›Ü›X][Ûˆ™XÙZ]™Y]™[ˆYˆHX[Ù\È›ÝÛÈZXYˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚYÜ™Y[Y[ÚÝ[™HÚYÛ™Y™Y›Ü™HH^Ú[™ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆÓKÙ][™ÈHÙ\šXÙH]™[È^XÝY\š[™È™YÛÝX][ÛœÈ‹ˆŠH[ˆ‘Kš[™[™È›Ý\Y\ÈÈÛÛ™šY[X[]HÝ™\ˆH[™›Ü›X][Ûˆ^Ú[™ÙY‹ˆÊH[ˆÓÕË\ØÜšXš[™ÈHXÝ]š]Y\Ë[Y[[™\È[™ÛÜÝÈÙˆH˜[œØXÝ[Ûˆ[ˆ]Z[‹ˆ‘
H[ˆSÕKXÛ\š[™ÈH\Y\ÉÈ[[[ÛˆÈÛÛÜ\˜]HÚ]Ý]š[™[™ÈØ›YØ][ÛœÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[ˆ‘H
›Û‹Q\ØÛÜÝ\™HYÜ™Y[Y[
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š˜ÛÛ™šY[X[]HYÜ™Y[Y[
Šˆ\ÈHØÝ[Y[›ÝXÝ[™È[™›Ü›X][Ûˆ
Š˜™Y›Ü™H[™[™\[™[HÙŠŠˆ[žHÝ\ˆYÜ™Y[Y[ˆ]Yš[™\ÈÚ]ÛÝ[È\ÈÛÛ™šY[X[›ÜˆÚ]\œÜÙ\È]X^H™H\ÙYÚÈX^HX\›ˆÙˆ][œÚYHXXÚÜ™Ø[š^˜][Û‹ÝÈÛ™ÈHØ›YØ][Ûˆ\ÝÈ[™Ú]]\Ý\[ˆÈH[™›Ü›X][ÛˆYˆ™YÛÝX][ÛœÈ˜Z[\XØ[H™]\›ˆÜˆ\ÝXÝ[Û‹ˆ]\È^XÝHÚ]HØÙ[˜\š[È™\]Z\™\Ë[™]ÈXÚ\Ú]™H™X]\™H\ÈH\ÝÛ™NˆHØ›YØ][Ûˆ
ŠœÝ\š]™\ÊŠˆH[™ÙˆH[ÜËÚXÚ\ÈHÚ[™XØ]\ÙH]\È™XÚ\Ù[HÚ[ˆHX[˜[È›ÝYÚ][™›Ü›X][Ûˆ™XÙZ]™Y™XÛÛY\È[™Ù\›Ý\È[ˆH[™ÈÙˆÛÛY[Û™HÚÈ™[XZ[œÈHÛÛ\]]Ü‹ˆ[ˆHØ\ÙH\ØÜšX™YHYÜ™Y[Y[Ú[™H
Š›]]X[
Š‹Ú[˜ÙH›Ý\Y\È\ØÛÜÙNÈH[š[]\˜[›Ü›H[ÛÈ^\ÝËÚ\™HÛ›HÛ™H\H^ÜÙ\È[™›Ü›X][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÓNŠŠˆÙ]ÈHYX\Ý\˜X›H
ŠœÙ\šXÙH]™[ÊŠˆH›ÝšY\ˆÛÛ[Z]ÈËÚ]Y]šXÜÈ[™[˜[Y\Ëˆ]™\Ý[Y\ÈHÙ\šXÙH[™XYH^\ÝÎˆ\™H\™H\È›ÈÙ\šXÙKÛ›H[ˆ^Ú[™ÙHÙˆ[™›Ü›X][Û‹—ˆ
ˆ
ŠÊHÓÕÎŠŠˆ\ØÜšX™\ÈH
Š˜XÝ]š]Y\Ë[Y[[™\È[™ÛÜÝÊŠˆÙˆYÜ™YYÛÜšË[™\XØ[HÜ\˜]\È[™\ˆHX\Ý\ˆYÜ™Y[Y[ˆ]ÛÈ™\Ý[Y\ÈHXÚ\Ú[ÛˆÈÈÛÛY][™È\È™Y[ˆXYKÚ\™X\È\™H^H\™H\ÜÙ\ÜÚ[™ÈÚ]\ˆË—ˆ
ˆ
Š‘
HSÕNŠŠˆXÛ\™\È[ˆ
Šš[[[ÛŠŠˆÈÛÛÜ\˜]H[™\È\XØ[H›Û‹Xš[™[™Ëˆ]X^HXØÛÛ\[žH\È\ÙK]]›ÝXÝÈ›Ý[™ÎˆHXÛ\™Y[[[ÛˆÝÜÈ›Ø›ÙH\Ú[™ÈHÝ\ÝÛY\ˆ\Ý^H]™H\Ý™XY——Šˆ
Š‘^[H˜\ŠŠˆX\›ˆÈ[YÜ™Y[Y[È\\žH
ŠÚ]^H\ÝX›\Ú
Š‹™XØ]\ÙH]Y\Ý[ÛœÈ\Ý[H[ÙÙ]\‹ˆ
Š“‘JŠˆHÛÛ™šY[X[]HÙˆ[™›Ü›X][Ûˆ^Ú[™ÙY0­È
Š“SÕJŠˆH[[[ÛˆÈÛÛÜ\˜]K›Û‹Xš[™[™È0­È
Š“SÐJŠˆH[Ü™H›Ü›X[[ˆ[ˆSÕKÚ]Yš[™YØ›YØ][ÛœÈ0­È
Š”ÓJŠˆHYX\Ý\˜X›HÙ\šXÙH]™[È[™[˜[Y\È0­È
Š“TÐJŠˆHX\Ý\ˆYÜ™Y[Y[Ù][™ÈHÙ[™\˜[\›\ÈÙˆ[ˆÛ™ÛÚ[™È™[][ÛœÚ\0­È
Š”ÓÕÈÜˆÛÜšÈÜ™\ŠŠˆHH[™]šYX[YXÙHÙˆÛÜšÈ[™\ˆHX\Ý\ˆYÜ™Y[Y[0­È
Š”JŠˆH\Ú[™\ÜÈ\™\œÚ\YÜ™Y[Y[Ú]›Ùš]Ú\š[™ËXXš[]Y\È[™^]Ý˜]YÚY\ËˆH˜XÝXØ[[NˆÚ[ˆHØÙ[˜\š[È\ÈX›Ý]
Šš[™›Ü›X][ÛˆÈ›ÝXÝ™Y›Ü™HXÚY[™ÊŠ‹H[œÝÙ\ˆ\È[Ø^\ÈH‘Kˆ‹ˆKˆLˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ‘›ÛÝÚ[™ÈH\ØÛÝ™\žHÙˆHÚY[H^Ú]YÜš]XØ[™\›ËY^H[™\˜Xš[]H[ˆHÛÜœÜ˜]HÙXˆÙ\™\ˆÛÙØ\™KHÒTÓÈ™\]Y\ÝÈ[ˆ[[YYX]H^˜[Ü™[˜\žHš\ÚÈ\ÜÙ\ÜÛY[È]\›Z[™HHÝ[X[[\XÝÙˆ[ˆ[[YYX]H]XÚÈ™Y›Ü™HH™^ØÚY[Y[›X[Ù\ÜÚ[Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È\ØÜšX™\ÈHš\ÚÈ\ÜÙ\ÜÛY[ÛÛ™XÝY\È™YYYÙ[ˆ[ˆ™\ÜÛœÙHÈ™]È[™[Y\™Ú[™È™X]ÈÜˆÚYÛšYšXØ[Ú[™Ù\ÈÚ][ˆHÜ™Ø[š^˜][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ[[Ý\È‹ˆŠHYØÈ‹ˆÊH™XÝ\œš[™È‹ˆ‘
HÛ™K][YH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHYØÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠYØÈ\ÜÙ\ÜÛY[ÊŠˆ\™H\™›Ü›YYÛˆ[ˆ^˜[Ü™[˜\žHÜˆ[\Ü˜\žH˜\Ú\È[ˆ™\ÜÛœÙHÈÜXÚYšXÈšYÙÙ\š[™È]™[È
ÝXÚ\È™]È[[YYX]H™X]Ë\ØÛÝ™\šY\ÈÙˆÜš]XØ[›]ÜÈÜˆXZ›ÜˆÝXÝ\˜[ÝXÚ›ÛÙÚXØ[Ú[™Ù\È[ˆHÜ™Ø[š^˜][ÛŠKÙ™™\š[™È›^Xš[]H[™™\ÜÛœÚ]™[™\ÜÈ[ˆš\ÚÈX[˜YÙ[Y[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÛÛ[[Ý\È\ÜÙ\ÜÛY[
Šˆ\È˜\ÙYÛˆ™X[][YH[Ûš]Üš[™È[™[[Y]žHÝ™X[\Ë›Ü›Z[™È\Ùˆ[ˆ[š[\œ\YÝ[™\™Ü\˜][™È›ØÙY\™K—ˆ
ˆ
ŠÊH™XÝ\œš[™È\ÜÙ\ÜÛY[ÊŠˆØØÝ\ˆ]™YÝ[\ˆ™\Ù][\˜[È
K™Ëˆ]™\žHÚ^[ÛÊH[™Ù\™HÈXZ[Z[ˆHÙXÝ\š]HÜÝ\™K]È›Ý\š\ÙHœ›ÛHH[[YYX]H™YYÈ™\ÜÛ™È[ˆ[™^XÝY[˜ÚY[—ˆ
ˆ
Š‘
HHÛ™K][YH\ÜÙ\ÜÛY[
Šˆ\ÝX[HšYÙÙ\œÈ]HÝ\ÙˆH›Ú™XÝÈØ\\™HHÚ[™ÛHÛ˜\ÚÝÙˆHÝ]HÙˆš\ÚÜË]\È›Ýš]™[ˆžHH™YYÈ™XXÝÈ™]È\™Ù[™X]Ëˆ‚ˆKˆLNˆÂˆÜXÎˆ\Ú[™\ÜÈÛÛ[Z]H	ˆ\Ø\Ý\ˆ™XÛÝ™\žH‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH˜Y[™ÈÙˆH\Ø\Ý\ˆ™XÛÝ™\žH[ˆ›ÜˆHKXÛÛ[Y\˜ÙH˜[œØXÝ[Û˜[]X˜\ÙKX[˜YÙ[Y[\ÝX›\Ú\È][ˆH]™[ÙˆH\Ø\Ý\‹HUÙ\šXÙ\È[™HÙXˆÜ[]\Ý™H™\ÝÜ™Y[™˜XÚÈÛ›[™HÚ][ˆ›È[Ü™H[ˆÝ\œÈÈ]›ÚY[œÝ\ÝZ[˜X›HÜÜÙ\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\ÈÜXÚYšXØ[H™\™\Ù[ÈH\ÝX›\ÚY[YH[Z]
\™Ù]\˜][ÛŠH›Üˆ™\ÝÜš[™ÈHÜ\˜Xš[]HÙˆUÙ\šXÙ\È[™\Ú[™\ÜÈ›ØÙ\ÜÙ\È›ÛÝÚ[™ÈH\ÝXÝ]™H]™[È‹ˆÜ[ÛœÎˆÂˆJH•È
™XÛÝ™\žH[YHØš™XÝ]™JH‹ˆŠH”È
™XÛÝ™\žHÚ[Øš™XÝ]™JH‹ˆÊHÔ
\Ú[™\ÜÈÛÛ[Z]H[ŠH‹ˆ‘
HUˆ
YX[ˆ[YHÈ™\Z\ŠH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH•È
™XÛÝ™\žH[YHØš™XÝ]™JJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”•È
™XÛÝ™\žH[YHØš™XÝ]™JJŠˆ\ÈHX^[][H[›™Y[YHÚ][ˆÚXÚ[ˆ[\œ\Y\XØ][Û‹Þ\Ý[HÜˆ\Ú[™\ÜÈ›ØÙ\ÜÈ]\Ý™H[H™\ÝÜ™Y[™Ü\˜][Û˜[YØZ[ˆY\ˆH\Ø\Ý\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHH”È
™XÛÝ™\žHÚ[Øš™XÝ]™JJŠˆ™Y™\œÈÈHX^[][HXØÙ\X›HYÙHÙˆH]H™XÛÝ™\˜X›Hœ›ÛHH˜XÚÝ\
K™KˆHX^[][H[[Ý[Ùˆ]K^™\ÜÙY[ˆ[YK]HÛÛ\[žH\ÈÚ[[™ÈÈÜÙJK—ˆ
ˆ
ŠÊHHÔ
Šˆ\ÈHÝ™\˜[\Ú[™\ÜÈÛÛ[Z]H[ˆ][˜ÛY\È][\HÝ˜]YÚY\È[™›ØÙ\ÜÙ\Ë›ÝHÚ[™ÛHÜXÚYšXÈ[YHY]šXË—ˆ
ˆ
Š‘
HHUˆ
YX[ˆ[YHÈ™\Z\ŠJŠˆ\ÈH]™\˜YÙH[YH™YYYÈ\ÚXØ[H™\Z\ˆH˜Z[Y\™Ø\™HÛÛ\Û™[Üˆš^HÛÙØ\™HYËÚ]Ý][˜ÛÛ\\ÜÚ[™ÈH™\ÝÜ˜][ÛˆÙˆH[\™H\Ú[™\ÜÈXÛÜÞ\Ý[Kˆ‚ˆKˆLLˆÂˆÜXÎˆ\Ú[™\ÜÈÛÛ[Z]H	ˆ\Ø\Ý\ˆ™XÛÝ™\žH‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][ÛˆØ[ÈÈ›Ü›X[HYš[™HHYÚ[]™[™\ÜÛœÚXš[]Y\È[™ÝZY[[™\ÈÈ[œÝ\™H]š][\Ú[™\ÜÈ[˜Ý[ÛœÈ™[XZ[ˆÜ\˜][Û˜[Üˆ\™H]ZXÚÛH™\Ý[YY[ˆH]™[Ùˆ˜]\˜[\Ø\Ý\œË›ÛÛ™ÙY›XÚÛÝ]ÈÜˆ[™[ZXÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÛÜœÜ˜]HÛXÞH\È\ÚYÛ™YÈ›ÝšYHHÝ˜]YÚXÈÝZY[[™\È›ÜˆX[˜YÚ[™È[™^XÝY[\œ\[ÛœÈ[ˆÜ™\ˆÈÙY\Üš]XØ[\Ú[™\ÜÈÜ\˜][ÛœÈXÝ]™OÈ‹ˆÜ[ÛœÎˆÂˆJH]H™][[ÛˆÛXÞH‹ˆŠH\Ú[™\ÜÈÛÛ[Z]HÛXÞH‹ˆÊH[˜ÚY[™\ÜÛœÙHÛXÞH‹ˆ‘
HXØÙ\X›H\ÙHÛXÞH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\Ú[™\ÜÈÛÛ[Z]HÛXÞJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š\Ú[™\ÜÈÛÛ[Z]HÛXÞJŠˆ\ÝX›\Ú\ÈHÙ[™\˜[Øš™XÝ]™\ËÛÝ™\›˜[˜ÙH[™Ý˜]YÚXÈÝZY[[™\È™YYYÈ[œÝ\™H]HÜ™Ø[š^˜][Û‰ÜÈš][[˜Ý[ÛœÈÛÛ[YHÈÜ\˜]HÜˆ\™H™\ÝÜ™Y›Û\H\š[™È[™Y\ˆH\™ÙK\ØØ[H[\œ\[Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH]H™][[ÛˆÛXÞJŠˆYš[™\ÈÝÈÛ™ÈÈ™]Z[ˆH˜\š[Ý\È\\ÈÙˆÛÜœÜ˜]H™XÛÜ™È›ÜˆYØ[Üˆ™YÝ[]ÜžH\œÜÙ\Ë—ˆ
ˆ
ŠÊHH[˜ÚY[™\ÜÛœÙHÛXÞJŠˆ›ØÝ\Ù\ÈÛˆH›ØÙY\™\È›ÜˆÛÛZ[š[™Ë[™\ÝYØ][™È[™™\ÛÛš[™ÈÜXÚYšXÈÞX™\ˆ]XÚÜÈÜˆÙXÝ\š]Hœ™XXÚ\ÈÙˆHXÚ›ÛÙÚXØ[˜]\™K—ˆ
ˆ
Š‘
HHXØÙ\X›H\ÙHÛXÞH
UT
JŠˆYš[™\ÈH[\ÈÙˆÛÛ™XÝ[™\›Z]Y\ÙHÙˆÛÜœÜ˜]H]šXÙ\È[™™]ÛÜšÈžH[\ÞYY\Ëˆ‚ˆKˆLLNˆÂˆÜXÎˆ”\œÛÛ›™[ÙXÝ\š]H	ˆÛ˜›Ø\™[™È‹ˆØÙ[˜\š[Îˆ•H[X[ˆ™\ÛÝ\˜Ù\È\\Y[[™HUÙXÝ\š]HX[HÛÛX›Ü˜]HÛˆYš[š[™ÈHÛ˜›Ø\™[™È›ÝÈ›Üˆ™]È[\ÞYY\ËˆHÛØ[\ÈÈ[œÝ\™HH˜\YÝ\ÙˆÛÜšÈXÝ]š]Y\ÈÚ]Ý]ÛÛ\›ÛZ\Ú[™ÈHÙXÝ\š]HÙˆÛÜœÜ˜]HÞ\Ý[\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ[ÛœÈÙ\È“ÕÛÛœÝ]]HHÛÜœ™XÝ[™\›ÜšX]H˜XÝXÙHžHHUÜˆˆ\\Y[ÈÈ[œÝ\™HÙXÝ\™HXØÙ\ÜÈ\š[™ÈHÛ˜›Ø\™[™ÈÙˆH™]È[\ÞYYOÈ‹ˆÜ[ÛœÎˆÂˆJH™\Ù[[™ÈHÜ™Ø[š^˜][Û‰ÜÈÙXÝ\š]H›ÝØÛÛÈ[™ÛXÚY\ÈÈH[\ÞYYH‹ˆŠH›ÝšY[™ÈH[\ÞYYHÚ]H\ÚXØ[ÛÙÚXØ[™\ÛÝ\˜Ù\È[™ÛÛÈ™YYYÈ\™›Ü›HZ\ˆ›Øˆ‹ˆÊH]]ÛX]XØ[H\ÜÚYÛš[™È[ÜÜÚX›Hš]š[YÙ\ÈÈH\Ù\ˆ›Üˆ[ˆ[š]X[šX[\š[Ù‹ˆ‘
HÙXÝ\™[H˜[œÛZ][™ÈH[š]X[XØÙ\ÜÈÜ™Y[X[ÈÈH[\ÞYYHÈ[ÝÈ[HXØÙ\ÜÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH]]ÛX]XØ[H\ÜÚYÛš[™È[ÜÜÚX›Hš]š[YÙ\ÈÈH\Ù\ˆ›Üˆ[ˆ[š]X[šX[\š[Ù
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[™\ØÜš[Z[˜][H\ÜÚYÛš[™È[]˜Z[X›H\›Z\ÜÚ[ÛœÈ
	Ø[ÜÜÚX›Hš]š[YÙ\ÉÊHÈH\Ù\‹]™[ˆ\Ý[\Ü˜\š[H›ÜˆHšX[\š[ÙÙ\š[Ý\ÛHš[Û]\ÈHÙXÝ\š]Hš[˜Ú\HÙˆX\Ýš]š[YÙH[™H™\›È\Ý\›ØXÚ™YY\ÜÛH^ÜÚ[™ÈHÛÛ\[žHÈ[›Ü›[Ý\ÈÙXÝ\š]Hš\ÚÜÈ[™[œÚY\ˆ™X]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÈ8 %ÚHHÝ\ˆ™YH\™HÛÝ[™˜XÝXÙ\ÎŠŠ—ˆ
ˆ
ŠJH™\Ù[[™ÈÙXÝ\š]H›ÝØÛÛÈ[™ÛXÚY\ÎŠŠˆ\È\ÈÚ[ˆH™]È›Ú[™\ˆX\›œÈÚ]\È\›Z]Y[™ÝÈÈ™\ÜÛÛY][™ÈÝ\ÜXÚ[Ý\ËˆÚ]Ý]][š]X[]Ø\™[™\ÜÈ]™\žHXÚšXØ[ÛÛ›Û\ÈY^ÜÙYÛˆH[X[ˆÚYKÚXÚ\ÈHÚYH\Ú[™È]XÚÜÈš\œÝ—ˆ
ˆ
ŠŠH›ÝšY[™ÈH™\ÛÝ\˜Ù\È[™ÛÛÈ™YYYÈÈH›ØŽŠŠˆ\È\È
Šœ›Ýš\Ú[Ûš[™ÊŠ‹[™HÙ^HÛÜ™\È
Š›™YYY
ŠŽˆÚ]H›ÛH™\]Z\™\Ë›È[Ü™H[™›È\ÜËˆ]\ÈX\Ýš]š[YÙH\YY]H[ÛY[HXØÛÝ[\ÈÜ™X]Y[™]\È[ÛÈÚ]\ØÛÝ\˜YÙ\È™XÛÝ\œÙHÈÚYÝÈU—ˆ
ˆ
Š‘
HÙXÝ\™[H˜[œÛZ][™ÈH[š]X[Ü™Y[X[ÎŠŠˆ[™[™ÈÝ™\ˆH\ÜÝÛÜ™Ûˆ[ˆ[œ›ÝXÝYÚ[›™[[™Ù\È]™\ž][™È]›ÛÝÜËˆÛÛÙ˜XÝXÙH\ÈHÚ[›™[Ù\\˜]Hœ›ÛHHÛ™HØ\œžZ[™ÈH\Ù\›˜[YKH
ŠœÚ[™ÛK]\ÙJŠˆÜ™Y[X[[™HX[™]ÜžHÚ[™ÙH]š\œÝÙÚ[‹——Šˆ
Š‘^[H˜\ŠŠˆH˜][[ˆÈ\È›ÝÜ˜[[™ÈXØÙ\ÜÈ]Ü˜[[™È]
ŠÚÛ\Ø[H[™[ˆY˜[˜ÙJŠ‹ˆHš[˜Ú\HÈ\H]Û˜›Ø\™[™È\È
Š›X\Ýš]š[YÙJŠ‹[™HÝ\ˆ[ˆÙˆHØ[YH\È^YY[ˆHÜÜÚ]H\ÙHH
Š›Ù™˜›Ø\™[™ÊŠŽˆ[[YYX]H™]›ØØ][ÛˆÙˆXØÙ\ÜË™XÛÝ™\žHÙˆ]šXÙ\ËXØÛÝ[\ØX›[Y[[™™X\ÜÚYÛ›Y[Ùˆ]KˆH›Ø˜][Ûˆ\š[ÙÙ\È›Ý\ÝYžH^˜Hš]š[YÙ\ÎÈYˆ[ž][™È]\ÝYšY\È™]Ù\‹ˆ‚ˆKˆLLŽˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH™[™Üˆ\ÜÙ\ÜÛY[›ØÙ\ÜËHÜÜÚXš[]H[Y\™Ù\È]HÚ]™[ˆ™[™ÜˆÛÝ[X\›ˆÛÛ[Z\ÜÚ[ÛœÈÛˆHØ[HÙˆÜXÚYšXÈ™XÛÛ[Y[™Y›ÙXÝËˆ\ÈÚ]X][Ûˆš\ÚÜÈ™YØ]]™[H[™›Y[˜Ú[™È]È[\\X[]H[™H™XÛÛ[Y[™][ÛœÈ›ÝšYYÈHÜ™Ø[š^˜][Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\\ÈÙˆÛÛ™›XÝÙˆ[\™\ÝØØÝ\œÈ[ˆ\ÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš[˜[˜ÚX[[\™\ÝÈ‹ˆŠHÛÛ\]]]™H™[][ÛœÚ\È‹ˆÊH[œÚY\ˆ[™›Ü›X][Ûˆ‹ˆ‘
H\œÛÛ˜[™[][ÛœÚ\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHš[˜[˜ÚX[[\™\ÝÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÛÛ™›XÝÙˆ[\™\Ý˜\ÙYÛˆ
Š™š[˜[˜ÚX[[\™\ÝÊŠˆX[šY™\ÝÈÚ[ˆH™[™Üˆ
Üˆ]˜[X]ÜŠH\ÈHÜÜ[š]HÈØZ[ˆH\™XÝÜˆ[™\™XÝXÛÛ›ÛZXÈØZ[ˆ
K™Ëˆ›ÝYÚÛÛ[Z\ÜÚ[ÛœÊHžH™XÛÛ[Y[™[™ÈÙ\Z[ˆ›ÙXÝÈÜˆÙ\šXÙ\ËÛÛ\›ÛZ\Ú[™È[\\X[]H[™[YÛ›Y[Ú]HÜ™Ø[š^˜][Û‰ÜÈ™X[™YYË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÛÛ\]]]™H™[][ÛœÚ\ÊŠˆ™Y™\ˆÈH™[™Ü‰ÜÈY\ÈÚ]Ý\ˆÛÛ\][™ÈÛÛ\[šY\È]ÛÝ[[™›Y[˜ÙH]ÈØš™XÝ]š]KÚ]Ý][\Z[™ÈH\™XÝš[˜[˜ÚX[ÛÛ[Z\ÜÚ[Û‹—ˆ
ˆ
ŠÊH[œÚY\ˆ[™›Ü›X][ÛŠŠˆ[›Û™\ÈH[\›Ü\ˆ\ÙHÙˆÛÛ™šY[X[Üˆ›ÜšY]\žH]H›ÜˆÛ™IÜÈÝÛˆY˜[YÙK—ˆ
ˆ
Š‘
H\œÛÛ˜[™[][ÛœÚ\ÊŠˆÛÛ˜Ù\›ˆ[™›Y[˜Ù\È\š]š[™Èœ›ÛH˜[Z[HÜˆœšY[™Ú\Y\ËÚXÚ[™›Y[˜ÙHXÚ\Ú[ÛœÈ]\™H›ÝÜXÚYšXØ[H˜\ÙYÛˆ\™XÝš[˜[˜ÚX[[˜Ù[]™\È[šÙYÈH™XÛÛ[Y[™Y›ÙXÝˆ‚ˆKˆLLÎˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ‘ÛØ™^ÛÜœÜ˜][Ûˆ[[™ÈÈÝ\HÛ™Ë]\›HÛÛ[Y\˜ÚX[™[][ÛœÚ\Ú][ˆ^\›˜[Ý\Y\ˆ›ÜˆH›Ýš\Ú[ÛˆÙˆUÙ\šXÙ\ËˆHÛÛ\[žIÜÈØš™XÝ]™H\ÈÈYš[™HHÙ[™\˜[\›\È[™ÛÛ™][ÛœÈ]Ú[\HÈ[]\™HÛÛ˜XÝÈ[™ÜXÚYšXÈYÜ™Y[Y[ÈÚ]HØ[YHÝ\Y\‹Ú]Ý]]š[™ÈÈ™[™YÛÝX]HH˜\ÚXÈYØ[Û]\Ù\ÈXXÚ[YKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆYÜ™Y[Y[\È™Y™\˜X›HÈYš[™HÈYY]\È™YYÈ‹ˆÜ[ÛœÎˆÂˆJHÓÕÈ
Ý][Y[ÙˆÛÜšÊH‹ˆŠHTÐH
X\Ý\ˆÙ\šXÙ\ÈYÜ™Y[Y[
H‹ˆÊHSÕH
Y[[Ü˜[™[HÙˆ[™\œÝ[™[™ÊH‹ˆ‘
HÓH
Ù\šXÙH]™[YÜ™Y[Y[
H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHTÐH
X\Ý\ˆÙ\šXÙ\ÈYÜ™Y[Y[
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆ
Š“TÐH
X\Ý\ˆÙ\šXÙ\ÈYÜ™Y[Y[
JŠˆ\ÈHœ˜[Y]ÛÜšÈÛÛ˜XÝ\ÚYÛ™YÜXÚYšXØ[HÈ\ÝX›\ÚHÙ[™\˜[\›\ËYØ[Û]\Ù\È[™˜\ÚXÈÛÛ™][ÛœÈ]Ú[ÛÝ™\›ˆ[]\™H˜[œØXÝ[ÛœÈ[™™[][ÛœÚ\È™]ÙY[ˆH\Y\Ëˆ\ÈÚ[\YšY\È[™ÜYYÈ\H˜]Ú[™È\Ùˆ]\™HÜXÚYšXÈÜ\˜][Û˜[YÜ™Y[Y[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHHÓÕÈ
Ý][Y[ÙˆÛÜšÊJŠˆ\ØÜšX™\È[ˆ]Z[HÜ\˜][Û˜[XÝ]š]Y\Ë[]™\˜X›\È[™[Y[[™\ÈÙˆHÚ[™ÛHÜXÚYšXÈ›Ú™XÝ—ˆ
ˆ
ŠÊHHSÕH
Y[[Ü˜[™[HÙˆ[™\œÝ[™[™ÊJŠˆ\ÈH™[[Z[˜\žHYÜ™Y[Y[\ÝX[H›Û‹Xš[™[™Ë]^™\ÜÙ\ÈH[[[ÛˆÈÛÛX›Ü˜]H]Ù\È›ÝXÝ\ÈHYš[š]]™HYØ[ÛÛ˜XÝ›Üˆ]\™H˜[œØXÝ[ÛœË—ˆ
ˆ
Š‘
HHÓH
Ù\šXÙH]™[YÜ™Y[Y[
JŠˆ^Û\Ú]™[HYš[™\ÈHXÚšXØ[\™›Ü›X[˜ÙHY]šXÜÈ[™^XÝY]˜Z[Xš[]H]™[È›ÜˆHÙ\šXÙKˆ‚ˆKˆLMˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHX[Ø\™K\ÙXÝÜˆÜ™Ø[š^˜][Ûˆ]\Ý›ÙXÙH\š[ÙXÈÛÛ\X[˜ÙH™\ÜÈ[[™Y›Üˆ^\›˜[™YÝ[]ÜžH›ÙY\È[™HX›XÈÙˆ]ÈÚ\™ZÛ\œÈ[ˆÜ™\ˆÈ[[ÛœÝ˜]H[YÛ›Y[Ú]Ý\œ™[]HÙXÝ\š]H™YÝ[][ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈHš[X\žHØš™XÝ]™HÙˆ^\›˜[ÛÛ\X[˜ÙH™\Ü[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÈ™\ÜÛÛ\X[˜ÙHÝ]\ÈÈHX›XÈ[™ÝZÙZÛ\œÈ‹ˆŠHÈÛÛ™XÝ[\›˜[]Y]È›ÜˆÛÛ\X[˜ÙH™\šYšXØ][Ûˆ\œÜÙ\È‹ˆÊHÈ™\]Y\Ý^XÚ]ÛÛœÙ[œ›ÛH]HÝXš™XÝÈ›ÜˆÛÛ\X[˜ÙH\œÜÙ\È‹ˆ‘
HÈÚ\™HÛÛ\X[˜ÙH[™›Ü›X][Ûˆ^Û\Ú]™[HÚ]HÜ™Ø[š^˜][Û‰ÜÈX[˜YÙ[Y[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÈ™\ÜÛÛ\X[˜ÙHÝ]\ÈÈHX›XÈ[™ÝZÙZÛ\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHXZ[ˆØš™XÝ]™HÙˆ
Š™^\›˜[ÛÛ\X[˜ÙH™\Ü[™ÊŠˆ\ÈÈ›ÝšYH^\›˜[˜[œÜ\™[˜ÞK[[ÛœÝ˜][™ÈHÛÛ\[žIÜÈÛÛ\X[˜ÙHÈ™YÝ[]ÜžH]]Üš]Y\ËÝ\ÝÛY\œË[™\ÝÜœÈ
ÝZÙZÛ\œÊH[™HÙ[™\˜[X›XÈ[ˆÜ™\ˆÈZ[\Ý[™[š[YØ[Ø›YØ][ÛœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÛÛ™XÝ[™È]Y]ÊŠˆ\È[ˆÜ\˜][Û˜[XÝ]š]HÈÛÛXÝ]K›ÝHš[˜[Øš™XÝ]™HÙˆH^\›˜[™\Ü]Ù[‹—ˆ
ˆ
ŠÊH™\]Y\Ý[™ÈÛÛœÙ[
Šˆ
ÛÛœÙ[ØXÚÛ›ÝÛYÙ[Y[
HÛÛ˜Ù\›œÈ\Ù\œÉÈ]H›ØÙ\ÜÚ[™È›ÝÜÈ
š]˜XÞJK›Ý[œÝ]][Û˜[ÛÛ\X[˜ÙH™\Ü[™Ë—ˆ
ˆ
Š‘
H^Û\Ú]™HÚ\š[™ÈÚ]X[˜YÙ[Y[
ŠˆÚ\˜XÝ\š^™\È[\›˜[™\Ü[™Ë›Ý^\›˜[ÛÛ\X[˜ÙH™\Ü[™Ëˆ‚ˆKˆLMNˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH[›š[™ÈÙˆHXZ›Üˆ\Ü˜YHÙˆHÛÜœÜ˜]H]X˜\ÙH[™œ˜\ÝXÝ\™KH™]ÛÜšÈX[H[\\Ú^™\ÈH[\Ü[˜ÙHÙˆ\™›Ü›Z[™ÈH™[[Z[˜\žH\Ý
šX[[ˆÜˆžH[ŠHÛˆH™YXÙYØØ[HÙˆH[ÜÝÚYÛšYšXØ[Ú[™Ù\È™Y›Ü™HZ\ˆYš[š]]™H[\[Y[][Ûˆ[ˆ›ÙXÝ[Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È˜XÝXÙ\ÈYÚYÚÈH[™[Y[[[\Ü[˜ÙHÙˆ™Y[\]™[H\Ý[™ÈHXZ[ˆÚ[™Ù\È™Y›Ü™HZ\ˆ[\XØ][ÛÈ‹ˆÜ[ÛœÎˆÂˆJH™]ÛÜšÈÙYÛY[][ÛˆÛXÞH‹ˆŠHÚ[™ÙHX[˜YÙ[Y[˜XÝXÙ\È‹ˆÊH[˜ÚY[™\ÜÛœÙH›ÝØÛÛ‹ˆ‘
H\Ú[™\ÜÈÛÛ[Z]H[›š[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÚ[™ÙHX[˜YÙ[Y[˜XÝXÙ\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠÚ[™ÙHX[˜YÙ[Y[˜XÝXÙ\ÊŠˆ[\ÜÙHšYÛÜ›Ý\ÈÛÛ›ÛÝ™\ˆÞ\Ý[HÚ[™Ù\Ëˆ\™›Ü›Z[™ÈH	ÝšX[[‰È[ˆ[ˆ\ÛÛ]YÜˆ›Û‹\›ÙXÝ[Ûˆ[š\›Û›Y[™Y›Ü™HH[›ÛÝ]\ÈH[™[Y[[Ú[™ÙHX[˜YÙ[Y[™\Ý˜XÝXÙHÈ]˜[X]HH[\XÝY[YžHYÜÈ[™[œÝ\™H]HØY™H™XÛÝ™\žH›ØÙY\™H
˜XÚÛÝ][ŠH^\ÝË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH™]ÛÜšÈÙYÛY[][ÛŠŠˆ\ÈHXÚšXØ[ÙXÝ\š]HÛÛ›ÛÈ[Z]H›ÜYØ][ÛˆÙˆ]XÚÜË]Ù\È›ÝÛÝ™\›ˆHÚ[™ÙHY™XÞXÛK—ˆ
ˆ
ŠÊHH[˜ÚY[™\ÜÛœÙH›ÝØÛÛ
Šˆ[\™[™\ÈY\ˆHœ™XXÚÜˆ\Ü\[Ûˆ\ÈØØÝ\œ™YÈÛÛZ[ˆ]—ˆ
ˆ
Š‘
H\Ú[™\ÜÈÛÛ[Z]H[›š[™È
Ô
JŠˆ›ØÝ\Ù\ÈÛˆÙY\[™È\Ú[™\ÜÈ[˜Ý[ÛœÈÜ\˜][Û˜[\š[™ÈH\Ø\Ý\‹›ÝÛˆHY]ÙXØ[X[˜YÙ[Y[ÙˆÜ™[˜\žH]Ú\ÈÜˆÛÙØ\™H\Ü˜Y\Ëˆ‚ˆKˆLMŽˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ‘›ÛÝÚ[™ÈHÙ\š[Ý\È]Hœ™XXÚØ]\ÙYžHH˜Z[\™HÈ[\[Y[HZ[š[][H[˜Üž\[Ûˆ™\]Z\™[Y[È›ÝšYY›ÜˆžHHÑˆ™YÝ[][Û‹HÝ\\š\ÛÜžH]]Üš]H[\ÜÙ\ÈÛˆ[ˆÜ™Ø[š^˜][ÛˆH^[Y[ÙˆH[Û™]\žH[˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\ÈYš[™\ÈH[Û™]\žH[˜[H[\ÜÙYYHÈ›Û‹XÛÛ\X[˜ÙHÚ]™YÝ[][ÛœÈÜˆHš[Û][ÛˆÙˆ[\ÈÜˆYÜ™Y[Y[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH™YH‹ˆŠHš[™H‹ˆÊHYXÝX›H‹ˆ‘
HØ[˜Ý[Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHš[™JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š™š[™JŠˆ\ÈHÜXÚYšXÈš[˜[˜ÚX[[˜[H\YYžHHÛÝ™\››Y[™YÝ[]ÜžH›ÙHÜˆÛÝ\È[š\Ú[ˆ[™œ˜XÝ[ÛˆÜˆ›Û‹XÛÛ\X[˜ÙHÚ]]ÜÈ[™™YÝ[][ÛœËˆ]\ÈH[š]]™H[™]\œ™[\œÜÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH™YJŠˆ\ÈH^[Y[ÜˆÚ\™ÙHYH›Üˆ[ˆ]]Üš^™YÙ\šXÙHÜˆXÙ[œÙK]Ù\È›Ý]™HH[š]]™H˜]\™K—ˆ
ˆ
ŠÊHHYXÝX›JŠˆ\ÈHÜ[ÛˆÙˆ[XYÙH]™[XZ[œÈH™\ÜÛœÚXš[]HÙˆH[œÝ\™Y[ˆ[ˆ[œÝ\˜[˜ÙHÛXÞHÛÛ˜XÝ—ˆ
ˆ
Š‘
HHØ[˜Ý[ÛŠŠˆ\ÈHœ›ØY\ˆ\›H][˜ÛY\ÈÛÛ[Y\˜ÚX[™\ÝšXÝ[ÛœËÜ\˜][Û˜[›ØÚÜÈÜˆÙ[™\šXÈÛÙ\˜Ú]™HYX\Ý\™\ËÚ\™X\ÈHÜXÚYšXÈ[Û™]\žH[˜[H\ÈØ[YH	Ùš[™IËˆ‚ˆKˆLMÎˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆHÛÙØ\™HÝ\ÙHØ[ÈÈYÜHÝXÝ\™YY]ÙÛÙÞH]]šY\ÈH[\™HÛÙØ\™H]™[ÜY[[™XZ[[˜[˜ÙHY™XÞXÛH[È\Ý[˜Ý\Ù\ËXÚ[™ÈHÝ›Û™È[\\Ú\ÈÛˆHÞ\Ý[X]XÈ[YÜ˜][ÛˆÙˆÙXÝ\š]HÛÛ›ÛÈ[ÈXXÚÙˆ\ÙHÝYÙ\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈY]ÙÛÙÚY\È]šY\ÈÛÙØ\™H]™[ÜY[[È\ØÜ™]H\Ù\ÈÚ[H[YÜ˜][™ÈÙXÝ\š]H›ÝYÚÝ]]È]È‹ˆÜ[ÛœÎˆÂˆJHØÜ[HY]ÙÛÙÞH‹ˆŠHÑÈ
ÛÙØ\™H]™[ÜY[Y™HÞXÛJH‹ˆÊHÒKÐÑ
ÛÛ[[Ý\È[YÜ˜][ÛˆÈÛÛ[[Ý\È[]™\žJH‹ˆ‘
HQ
˜\Y\XØ][Ûˆ]™[ÜY[
H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÑÈ
ÛÙØ\™H]™[ÜY[Y™HÞXÛJJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”ÑÈ
ÛÙØ\™H]™[ÜY[Y™HÞXÛJJŠˆ\ÈHY]ÙÛÙÚXØ[œ˜[Y]ÛÜšÈ]]šY\ÈÛÙØ\™H]™[ÜY[[ÈÛX\ˆÙ\]Y[X[\Ù\È
™\]Z\™[Y[Ë\ÚYÛ‹[\[Y[][Û‹\Ý[™Ë\Þ[Y[XZ[[˜[˜ÙJKˆÚ[ˆ[\[Y[YÚ]ÙXÝ\š]HÜš]\šXK]\ÈØ[YÙXÝ\™HÑËÚXÚ[œÝ\™\ÈÙXÝ\š]H]]™\žH\ÙHÙˆHY™XÞXÛK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHØÜ[JŠˆ\ÈHÜXÚYšXÈYÚ[Hœ˜[Y]ÛÜšÈÙ[\™YÛˆX[HÛÛX›Ü˜][Ûˆ[™]\˜]]™HÜš[ÞXÛ\Ë]Ù\È›Ý[ˆ]Ù[ˆ™\™\Ù[H[\™H›Ü›X[]™[ÜY[Y™XÞXÛK—ˆ
ˆ
ŠÊHÒKÐÑ
Šˆ\È[ˆ]]ÛX][Ûˆ˜XÝXÙH›ØÝ\ÙYÛˆHÛÛ[[Ý\È[YÜ˜][Ûˆ[™™[X\ÙHÙˆÛÙK›ÝHÙ[™\˜[Y]ÙÛÙÞH›Üˆ]šY[™È[È^XÝ]]™H\Ù\Ë—ˆ
ˆ
Š‘
HQ
Šˆ\ÈH˜\Y]™[ÜY[[Ù[˜\ÙYÛˆ˜\Ý›ÝÝ\[™ËÚXÚÙ[ˆ™YÛXÝÈÜˆ™YXÙ\È›Ü›X[[›š[™È[™ÙXÝ\š]H[ˆ˜]›ÜˆÙˆÜYYˆ‚ˆKˆLNˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[Îˆ•™[\È™Y[ˆ\ÜÚYÛ™YH\ÚÈÙˆ\š[ÙXØ[H[™ÛÛ[[Ý\ÛH™\šYžZ[™È]\ÈÛÛ\[žIÜÈ^\›˜[Ý\Y\œÈÛÛ\HÚ]HÙXÝ\š]H]™[ÈYÜ™YYÚ][ˆZ\ˆ™\ÜXÝ]™H[™XYK\ÚYÛ™YÛÛ[Y\˜ÚX[ÛÛ˜XÝËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ]š]Y\È‘TÕ\ØÜšX™\ÈH™]ÈÜ\˜][Û˜[]Y\È\ÜÚYÛ™YÈ™[È‹ˆÜ[ÛœÎˆÂˆJH™[™Üˆ\ÜÙ\ÜÛY[‹ˆŠH™[™Üˆ[Ûš]Üš[™È‹ˆÊHÛÛ\X[˜ÙH™\Ü[™È‹ˆ‘
H™[™ÜˆÙ[XÝ[Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™[™Üˆ[Ûš]Üš[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š•™[™Üˆ[Ûš]Üš[™ÊŠˆ\ÈHÛÛ[[Ý\ÈXÝ]š]HZ[YY]™YÝ[\›H]˜[X][™ÈH\™›Ü›X[˜ÙH[™ÙXÝ\š]HÜÝ\™HÙˆHÝ\Y\ˆ
˜Y\ŠˆHÛÛ˜XÝX[™[][ÛœÚ\\È™Y[ˆ\ÝX›\ÚYÈ[œÝ\™H]]ÛÛ[Y\ÈÈYY]HYÜ™YY™\]Z\™[Y[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH™[™Üˆ\ÜÙ\ÜÛY[
Šˆ\È\ÝX[HH[š]X[Üˆ\š[ÙXÈ›Ü›X[]Y]\™›Ü›YYÈ]˜[X]HHÝ\Y\ˆ™Y›Ü™HHÛÛ˜XÝÜˆ]™\Ù][\˜[È
K™Ëˆ[›X[JK›ÝHÛÛ[[Ý\ÈZ[H[Ûš]Üš[™Ë—ˆ
ˆ
ŠÊHÛÛ\X[˜ÙH™\Ü[™ÊŠˆÛÛ˜Ù\›œÈH˜Y[™ÈÙˆÛÛ\X[˜ÙH™\ÜÈ›Üˆ^\›˜[›ÙY\Ë—ˆ
ˆ
Š‘
H™[™ÜˆÙ[XÝ[ÛŠŠˆ\ÈH[š]X[›ØÙ\ÜÈÙˆÙ[XÝ[™È[™ÚÛÜÚ[™ÈHYX[Ý\Y\ˆ[[Û™È˜\š[Ý\ÈØ[™Y]\Ëˆ‚ˆKˆLNNˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ“™YYÉÈšYÙÙ\ˆ›Ø]ËHš\Ú[™ÈÙX\ˆÛÛ\[žK\È^[Z[š[™È]È]HÛÝ™\›˜[˜ÙHœ˜[Y]ÛÜšÈÈÛ\šYžHH›Û\È[™™\ÜÛœÚXš[]Y\ÈÙˆH\œÛÛ›™[\ÚÙYÚ]]HX[˜YÙ[Y[ˆ[[Û™ÈHÙ^HšYÝ\™\ÈY[YšYY\ÈH]HÝÛ™\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXØÝ\˜][H\ØÜšX™\ÈHš[X\žH™\ÜÛœÚXš[]HÙˆH]HÝÛ™\È‹ˆÜ[ÛœÎˆÂˆJHXZÙ\ÈXÚ\Ú[ÛœÈX›Ý]ÝÈ]H\È\ÙYXØÙ\ÜÙY[™›ÝXÝY‹ˆŠHX]\šX[HX[˜YÙ\ÈHÙÚXØ[XØÙ\ÜÈÛÛ›ÛÈ[™™]ÛÜšÈ]]Üš^˜][ÛœÈ‹ˆÊHXÚšXØ[H›ØÙ\ÜÙ\È[™X[š\[]\È]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\ˆ‹ˆ‘
H[œÝ\™\ÈHZ[HXÚšXØ[[YÜš]H[™ÛÛ™šY[X[]HÙˆHÝÜ™Y]H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHXZÙ\ÈXÚ\Ú[ÛœÈX›Ý]ÝÈ]H\È\ÙYXØÙ\ÜÙY[™›ÝXÝY
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘]HÝÛ™\ŠŠˆ\È[[X]H™\ÜÛœÚXš[]HÝ™\ˆH]K[˜ÛY[™ÈHÛ\ÜÚYšXØ][ÛˆÙˆ[™›Ü›X][Û‹HYš[š][ÛˆÙˆXØÙ\ÜÈÛXÚY\È[™H]\›Z[˜][ÛˆÙˆÚÈ\ÈHšYÚÈ\ÙH]]H[™›ÜˆÚ]\Ú[™\ÜÈ\œÜÙ\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHX]\šX[HX[˜YÚ[™ÈXØÙ\ÜÈÛÛ›ÛÊŠˆ[™
Š‘
H[œÝ\š[™ÈZ[HÛÛ™šY[X[]JŠˆ\™H\XØ[\ÚÜÈÙˆH
Š‘]HÝ\ÝÙX[ŠŠˆ
Üˆ]HÝ]Ø\™
KÚÈXÚšXØ[H[\[Y[ÈH\™XÝ]™\ÈXÚYYžHH]HÝÛ™\‹—ˆ
ˆ
ŠÊH›ØÙ\ÜÚ[™È]HÛˆ™Z[ˆÙˆHÛÛ›Û\ŠŠˆYš[™\ÈH›ÛHÙˆH
Š‘]H›ØÙ\ÜÛÜŠŠˆ[ˆHÛÛ^Ùˆš]˜XÞH™YÝ[][ÛœÈÝXÚ\ÈHÑ‹ˆ‚ˆKˆLŒˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\È˜Y[™È]ÈÙXÝ\š]HØÝ[Y[][ÛˆÙ]Ý\[™Èœ›ÛHHXZ[ˆÛXÞH
[™›Ü›X][ÛˆÙXÝ\š]HÛXÞJKÚ]H[[[ÛˆÙˆ\ÝX›\Ú[™ÈHÛÛY›Ý[™][Ûˆ›ÜˆH›ÝXÝ[ÛˆÙˆÛÜœÜ˜]H™\ÛÝ\˜Ù\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHš[X\žH\œÜÙHÙˆ[ˆ[™›Ü›X][ÛˆÙXÝ\š]HÛXÞOÈ‹ˆÜ[ÛœÎˆÂˆJHÈ^Z[ˆÚ][\ÞYY\ÈØ[ˆÈÚ][™›Ü›X][ÛˆY\ˆ^HX]™HHÛÛ\[žH‹ˆŠHÈYš[™HHÜXÚYšXÈ[\È›ÜˆHXØÙ\X›H\ÙHÙˆU™\ÛÝ\˜Ù\È‹ˆÊHÈ\ÝX›\ÚÝZY[[™\È[™š[˜Ú\\È›ÜˆØY™YÝX\™[™È]H‹ˆ‘
HÈÝ][™HHÜ\˜][Û˜[XÚšXØ[Ý\È›Üˆ[˜ÚY[™\ÜÛœÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÈ\ÝX›\ÚÝZY[[™\È[™š[˜Ú\\È›ÜˆØY™YÝX\™[™È]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH[™[Y[[\œÜÙHÙˆ[ˆ
Š’[™›Ü›X][ÛˆÙXÝ\š]HÛXÞJŠˆ\ÈÈYš[™H]HYÚ]™[HÝ˜]YÚXÈÙXÝ\š]HØš™XÝ]™\ËX[˜YÙ[Y[™\ÜÛœÚXš[]Y\È[™HØ\™[˜[š[˜Ú\\È›Üˆ›ÝXÝ[™ÈHÛÛ™šY[X[]K[YÜš]H[™]˜Z[Xš[]H
ÒPHšXY
HÙˆÛÜœÜ˜]H[™›Ü›X][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ˜[ÈÚ][ˆH^]ÛÛ˜XÝX[Û]\Ù\ÈÜˆÜÝY[\Þ[Y[‘K—ˆ
ˆ
ŠŠHYš[š[™ÈHXØÙ\X›H\ÙHÙˆU™\ÛÝ\˜Ù\ÊŠˆ\ÈHÜXÚYšXÈ\œÜÙHÙˆH
ŠXØÙ\X›H\ÙHÛXÞH
UT
JŠ‹—ˆ
ˆ
Š‘
HHÜ\˜][Û˜[XÚšXØ[Ý\È›Üˆ[˜ÚY[ÊŠˆ\™H\ØÜšX™Y[ˆH^X›ÛÚÜÈÜˆÝ[™\™Ü\˜][™È›ØÙY\™\È
ÓÔ
HÙˆ[˜ÚY[™\ÜÛœÙK›Ý[ˆHÙ[™\˜[ÛXÞKˆ‚ˆKˆLŒNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Û‰ÜÈÙXÝ\š]HX[H\ÈÛÛ™XÝ[™ÈHÝXÝ\™YXÝ]š]HÈ]XÝ[™Ø][ÙÈÝ[X[™X]ÈÝXÚ\ÈX[Ø\™KX[XÚ[Ý\È[\›˜[XÝÜœËZ\ØÛÛ™šYÝ\˜][ÛœÈÜˆ[˜Y\]X]HÛXÚY\Ë[ˆÜ™\ˆÈX\Hš\ÚÈ^ÜÝ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\›H‘TÕ\ØÜšX™\ÈHÞ\Ý[X]XÈ›ØÙ\ÜÈÙˆ]XÝ[™È[™ØÝ[Y[[™ÈHÝ[X[š\ÚÜÈ]ÛÝ[Y™™XÝHÜ™Ø[š^˜][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈY[YšXØ][Ûˆ‹ˆŠH[™\˜Xš[]H\ÜÙ\ÜÛY[‹ˆÊHÛXÞH™]šY]È‹ˆ‘
H™X][[YÙ[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHš\ÚÈY[YšXØ][ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”š\ÚÈY[YšXØ][ÛŠŠˆ\ÈHš\œÝ[™[Y[[\ÙHÙˆš\ÚÈX[˜YÙ[Y[Z[YY]\ØÛÝ™\š[™Ë™XÛÙÛš^š[™È[™›Ü›X[HØÝ[Y[[™È
[ˆHš\ÚÈ™YÚ\Ý\ŠH[H™X]È[™[™\˜Xš[]Y\È]ÛÝ[™YØ]]™[HY™™XÝHÜ™Ø[š^˜][Û‰ÜÈ\ÜÙ]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH[™\˜Xš[]H\ÜÙ\ÜÛY[
Šˆ\ÈHXÚšXØ[›ØÙ\ÜÈÈš[™ÜXÚYšXÈÙXÝ\š]HYÜÈ[ˆÛÛ\]\ˆÞ\Ý[\Ë]Ù\È›ÝÛÝ™\ˆ[Ü\˜][Û˜[ÜˆÛXÞHš\ÚÜË—ˆ
ˆ
ŠÊHÛXÞH™]šY]ÊŠˆ\ÈH\š[ÙXÈ™]šY]ÈÙˆÙXÝ\š]HÛXÚY\Ë—ˆ
ˆ
Š‘
H™X][[YÙ[˜ÙJŠˆ›ÝšY\È^\›˜[[™[˜[]XØ[]HÛˆ[Y\™Ú[™ÈÛØ˜[™X]ËÝ\Ü[™ÈY[YšXØ][Ûˆ]Ú]Ý]ÛÛœÝ]][™ÈHÜ™Ø[š^˜][Û‰ÜÈÛØ˜[[\›˜[š\ÚÈØ][ÙÚ[™È›ØÙ\ÜËˆ‚ˆKˆLŒŽˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHÙXÝ\š]H[˜[\Ý\ÈÛÛ™XÝ[™È[ˆ[‹Y\YH[YÙ[˜ÙH\ÙH\š[™ÈH›ØÙ\ÜÈÙˆÙ[XÝ[™ÈH™]È\™\\HÛÙØ\™HÙ\šXÙ\È›ÝšY\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHXZ[ˆ\œÜÙHÙˆ\™›Ü›Z[™ÈYH[YÙ[˜ÙH[ˆH™[™ÜˆÙ[XÝ[Ûˆ›ØÙ\ÜÏÈ‹ˆÜ[ÛœÎˆÂˆJHÈ[œÝ\™H]HÚÜÙ[ˆ™[™Üˆ\ÈH™\ÝÚÚXÙH[[Û™ÈH\ÝÙˆÜÜÚX›H™[™ÜœÈ‹ˆŠHÈ\ÜÙ\ÜÈH™[™Ü‰ÜÈXš[]HÈ›ÝšYHHÛÛÙÈÜˆÙ\šXÙ\ÈÚ[ˆ^H]™H›ÛZ\ÙY‹ˆÊHÈÛÛ\\™H][\H™[™ÜœÉÈÝ\Y\œÈÈ[œÝ\™H^H\™H[[YÙ[[ˆ[˜[^š[™ÈZ\ˆÝÛˆÝ\HÚZ[œÈ‹ˆ‘
HÈ[œÝ\™H]H™[™Ü‰ÜÈÙXÝ\š]H˜XÝXÙ\È[YÛˆÚ]HÜ™Ø[š^˜][Û‰ÜÈ™\]Z\™[Y[È[™Ý[™\™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÈ[œÝ\™H]H™[™Ü‰ÜÈÙXÝ\š]H˜XÝXÙ\È[YÛˆÚ]HÜ™Ø[š^˜][Û‰ÜÈ™\]Z\™[Y[È[™Ý[™\™ÊŠ‹——Šˆ
Š‘YH[YÙ[˜ÙH\YYÈ™[™Üˆš\ÚÈX[˜YÙ[Y[
\™T\Hš\ÚÈX[˜YÙ[Y[
NŠŠ—ˆ
ˆÛÛ™XÝ[™È
Š‘YH[YÙ[˜ÙJŠˆÛˆH\™\\H™[™Üˆ™Y›Ü™HÚYÛš[™È[ˆYÜ™Y[Y[YX[œÈØ\œžZ[™ÈÝ]H›Ü›X[ÙXÝ\š]H[™\ÝYØ][ÛˆÈ˜[Y]H]ÈÛZ[\ËˆHØš™XÝ]™H\È›ÝÈ\Ý›[™K]ÈØ]\ˆØš™XÝ]™H]šY[˜ÙH
K™ËˆÓÐÈˆ\HRH™\ÜËTÓÈÌHÙ\YšXØ]\ËÛÙH]Y]ËÐRTH]Y\Ý[Û›˜Z\™\ÊHÈ™\šYžH]]ÈÙXÝ\š]HÜÝ\™HYY]ÈH[\›˜[Ý[™\™ÈÙˆHXÜ]Z\š[™ÈÜ™Ø[š^˜][Û‹—ˆ
ˆ
Š•HÝXœÙ\]Y[YHØ\™NŠŠˆÛ˜ÙHHÛÛ˜XÝ\ÈÚYÛ™YHXÝ[ÛˆÙˆÛÛœÝ[H[Ûš]Üš[™ÈH™[™Ü‰ÜÈ\™›Ü›X[˜ÙK™]šY]Ú[™ÈXØÙ\ÜÈÙÜÈ[™ÚXÚÚ[™ÈÝXœÙ\]Y[[›X[™\ÜÈÈ[œÝ\™H\™H\È›ÈYÜ˜Y][ÛˆÙˆÙXÝ\š]H™\™\Ù[ÈH^\˜Ú\ÙHÙˆÛÛ[[Ý\È
Š‘YHØ\™JŠ‹——Šˆ
Š”Ý[[X\žHÙˆHY™™\™[˜Ù\ÈÈ™[Y[X™\ŽŠŠ—ˆ
ˆ
Š‘YH[YÙ[˜ÙH
[šËÒ[™\ÝYØ]KÔ[ŠNŠŠˆ]\ÈH[š]X[[™\ÝYØ]]™HY™›Ü™Y›Ü™HXÝ[™È
K™Ëˆ™\šYžZ[™ÈH™[™Ü‰ÜÈÙXÝ\š]HÜ™Y[X[ÊK—ˆ
ˆ
Š‘YHØ\™H
XÝÐ\KÑÊNŠŠˆ]\ÈHÜ\˜][Û˜[[™ÛÛ[[Ý\ÈY™›ÜÙˆ^XÝ][™ÈÛÛ›ÛÈ[™^\˜Ú\Ú[™ÈY[˜ÙH^HY\ˆ^HÈ]›ÚY™YÛYÙ[˜ÙH
K™Ëˆ[Ûš]Üš[™ÈH™[™Ü‹™]›ÚÚ[™ÈXØÙ\ÜÈ›Üˆ\›Z[˜]Y[\ÞYY\Ë[œÝ[[™È]Ú\ÊK——Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÚÛÜÚ[™ÈH™\Ý™[™Üˆ[[Û™ÈHØ[™Y]\ÎŠŠˆ\ØÜšX™\È
Š™[™ÜˆÙ[XÝ[ÛŠŠˆ[ˆHÛÛ[Y\˜ÚX[Ù[œÙKÛÛ\\š[™ÈÙ™™\œÈÛˆšXÙK™X]\™\È[™™Y™\™[˜Ù\ËˆÙXÝ\š]HYH[YÙ[˜ÙHX^H™YY]ÚÚXÙK]]È\œÜÙH\È›ÝÈ˜[šÈÝ\Y\œÎˆ]\ÈÈ™\šYžH]HÚÜÙ[ˆÛ™H\È
Š˜XØÙ\X›JŠˆœ›ÛHHš\ÚÈÝ[™Ú[—ˆ
ˆ
ŠŠH\ÜÙ\ÜÚ[™È[˜ÝX[]HÙˆ[]™\žNŠŠˆ\ÈHÚXÚÈÛˆ
Š›Ü\˜][Û˜[™[XXš[]JŠ‹ÚXÚ[ˆHÛÛ˜XÝ™XÛÛY\ÈÓHY]šXÜÈ[™[˜[Y\Ëˆ]ÛÛ˜Ù\›œÈÙ\šXÙH]X[]K›ÝH™[™Ü‰ÜÈÙXÝ\š]HÜÝ\™K—ˆ
ˆ
ŠÊHÛÛ\\š[™ÈH™[™ÜœÉÈÝÛˆÝ\Y\œÎŠŠˆ\ØÜšX™\È
ŠœÝ\HÚZ[ˆ[˜[\Ú\ÊŠ‹H™X[[™[\Ü[XÝ]š]H
›Ý\\\Hš\ÚÈ^\ÝÊH]Hœ›ØY\ˆ[™\Ý[˜ÝÛ™NˆYH[YÙ[˜ÙH›ØÝ\Ù\ÈÛˆH™[™Üˆ[ÝH\™HX›Ý]ÈÚYÛˆÚ]›ÝÛˆÛÛ\\š[™ÈÙ]™\˜[Ø[™Y]\ÉÈÝ\HÚZ[œË——Šˆ
Š‘^[H˜\ŠŠˆYHXXÚ\›HÈH
Š›[ÛY[
Šˆ]™[Û™ÜÈËˆ
Š‘YH[YÙ[˜ÙJŠˆH
˜™Y›Ü™JˆÚYÛš[™Ë[ÝH[™\ÝYØ]H[™Ø]\ˆ]šY[˜ÙH
ÓÐÈˆ\HRH™\ÜËTÓÈÌHÙ\YšXØ][ÛœË]Y\Ý[Û›˜Z\™\ÊHH
Š‘YHØ\™JŠˆH
˜Y\Ø\™Ê‹[ÝH^\˜Ú\ÙHY[˜ÙH^HžH^H[™[Ûš]ÜˆH™[™ÜˆH
Š”šYÚ]ËX]Y]Û]\ÙJŠˆHHÛÛ˜XÝX[Û]\ÙH]XZÙ\È]™\šYšXØ][Ûˆ[™›Ü˜ÙXX›H[ˆ]\™HÛÈH
Š”Ý\HÚZ[ˆ[˜[\Ú\ÊŠˆHÛÚÚ[™È™^[Û™H\™XÝÝ\Y\‹È]ÈÝÛˆÝ\Y\œËˆHÛÛ[[Ûˆ[™[[ÛšXÎˆ
Š™YH[YÙ[˜ÙHH[šÈ[™[™\ÝYØ]JŠ‹
Š™YHØ\™HHXÝ[™Ø]ÚÝ™\ŠŠ‹ˆ‚ˆKˆLŒÎˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ‘›Ü™[˜ÙH\ÈHÑSÈÙˆHÝXÝ\™YÛÛ\[žKˆÚH\ÈH[[X]H]]Üš]H[™Hš[˜[Ø^HÛˆ[Ý˜]YÚXÈ[™Ü\˜][Û˜[XÚ\Ú[ÛœÈXYHÚ][ˆHÜ™Ø[š^˜][Û‹[˜ÛY[™ÈXÚ\Ú[ÛœÈ™[]YÈ\Ú[™\ÜËUXØÛÝ[[™ËÙXÝ\š]H[™Ý\ˆÛÜœÜ˜]H]š\Ú[ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆÛÝ™\›˜[˜ÙHÚ\˜XÝ\š^™\ÈHÜ™Ø[š^˜][ÛˆYžH›Ü™[˜ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH›Ø\™ÛÝ™\›˜[˜ÙH‹ˆŠHÙ[˜[^™YÛÝ™\›˜[˜ÙH‹ˆÊHXÙ[˜[^™YÛÝ™\›˜[˜ÙH‹ˆ‘
HÛÛ[Z]YHÛÝ™\›˜[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÙ[˜[^™YÛÝ™\›˜[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
ŠÙ[˜[^™YÛÝ™\›˜[˜ÙJŠˆØØÝ\œÈÚ[ˆHXÚ\Ú[Û‹[XZÚ[™È]]Üš]H\ÈÛÛ˜Ù[˜]Y]HÜÙˆHÜ™Ø[š^˜][Ûˆ
K™Ëˆ[ˆH[™ÈÙˆHÑSÈÜˆHÛX[Ü[]™[X[˜YÙ[Y[Ü›Ý\
Kœ›ÛHÚXÚXÚ\Ú[ÛœÈÜ™XYÝÛØ\™Y\˜\˜ÚXØ[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH›Ø\™ÛÝ™\›˜[˜ÙJŠˆ™Y™\œÈÈHÝ˜]YÚXÈÛÛ›Û[™[Ûš]Üš[™ÈØ\œšYYÝ]žHH›Ø\™Ùˆ\™XÝÜœÈÝ™\ˆH[\™HÛÜœÜ˜]HÜ\˜][Û‹]Ù\È›Ý\ØÜšX™HH\™XÝÜ\˜][Û˜[ÛÛ˜Ù[˜][ÛˆÙˆXÚ\Ú[ÛœÈ[ˆHÚ[™ÛHšYÝ\™K—ˆ
ˆ
ŠÊHXÙ[˜[^™YÛÝ™\›˜[˜ÙJŠˆ\ÝšX]\ÈXÚ\Ú[Û‹[XZÚ[™ÈÝÙ\ˆ[[Û™È˜\š[Ý\È\Ú[™\ÜÈ[š]Ëœ˜[˜Ú\ÈÜˆ]]Û›Û[Ý\È\\Y[Ë—ˆ
ˆ
Š‘
HÛÛ[Z]YHÛÝ™\›˜[˜ÙJŠˆ™[Y\ÈÛˆÜ›ÜÜËY[˜Ý[Û˜[Ü›Ý\ÈÙˆÛÛXÝ]™HXÚ\Ú[Û‹[XZÚ[™È
K™ËˆÝY\š[™ÈÛÛ[Z]YJHÈ\›Ý™HÝ˜]YÚY\Ëˆ‚ˆKˆLˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ][Ûˆ˜Z[š[™ËHUX[H\ÈÛÜšÚ[™ÈÛˆ[\›Ýš[™È]È\Ú[™\ÜÈÛÛ[Z]H[ˆ
Ô
KˆÈÈ\Ë^H™YYÈØ[Ý[]H[™ØÝ[Y[H]™\˜YÙH[YH™\]Z\™YÈ™\Z\ˆHÞ\Ý[HÜˆ™\ÝÜ™H]È[˜Ý[Û˜[]H›ÛÝÚ[™È[ˆ[™^XÝY\Ü\[Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈY]šXÜÈÙ\ÈH[Ûˆ˜Z[š[™ÈX[H[[™È]\›Z[™OÈ‹ˆÜ[ÛœÎˆÂˆJHUˆ
YX[ˆ[YHÈ™\Z\ŠH‹ˆŠHU‘ˆ
YX[ˆ[YH™]ÙY[ˆ˜Z[\™\ÊH‹ˆÊH”È
™XÛÝ™\žHÚ[Øš™XÝ]™JH‹ˆ‘
H•È
™XÛÝ™\žH[YHØš™XÝ]™JH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHUˆ
YX[ˆ[YHÈ™\Z\ŠJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š“Uˆ
YX[ˆ[YHÈ™\Z\ŠJŠˆYX\Ý\™\ÈH]™\˜YÙH[YH™YYYÈ™\Z\ˆ[™™\ÝÜ™HHY™XÝ]™HÛÛ\Û™[ÜˆÞ\Ý[HY\ˆH˜Z[\™HÜˆÙ\šXÙH[\œ\[Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHU‘ŠŠˆYX\Ý\™\ÈH™[XXš[]HÙˆHÞ\Ý[KK™KˆH]™\˜YÙH[YH][\Ù\È™]ÙY[ˆÛÈÛÛœÙXÝ]]™H˜Z[\™\Ë—ˆ
ˆ
ŠÊHH”ÊŠˆYš[™\ÈHX^[][HÛ\˜X›H[[Ý[Ùˆ]H]Ø[ˆ™HÜÝ›ÛÝÚ[™È[ˆ[˜ÚY[
^™\ÜÙY[ˆ[YJK—ˆ
ˆ
Š‘
HH•ÊŠˆ\ÈHÝ˜]YÚXÈØš™XÝ]™HÙˆHX^[][H[YHÚ][ˆÚXÚ[ˆ[\œ\YÙ\šXÙH]\Ý™H™\ÝÜ™YÈ]›ÚY[˜XØÙ\X›HÛÛœÙ\]Y[˜Ù\ËÚ\™X\ÈHUˆYX\Ý\™\ÈHXÝX[]™\˜YÙH[YHÙˆXÚšXØ[™\Z\‹ˆ‚ˆKˆLNˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ•HUX[H]XœÝ˜XÝÚ[\XÚ]KHXÚ›ÛÙÞH˜Z[š[™ÈÛÛ\[žK\È™]šY]Ú[™È]ÈÜ™Ø[š^˜][Û˜[ÛXÚY\ÈÈ[\›Ý™HHÙXÝ\š]HÙˆ\Ù\ˆÜ™Y[X[ËˆZ\ˆÛØ[\ÈÈYš[™HÝšXÝ[™X[™]ÜžHÝZY[[™\È›ÜˆHÜ™X][Û‹ÛÛ\^]K[™Ý^\˜][Ûˆ[™›Ý][ÛˆÙˆ\ÜÝÛÜ™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÜXÚYšXÈÙXÝ\š]HÝ[™\™ÜˆØÝ[Y[ÚÝ[HX[HÛÛœÝ[[™[\[Y[›Üˆ\È\œÜÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[˜Üž\[ÛˆÝ[™\™‹ˆŠH\ÚXØ[ÙXÝ\š]HÝ[™\™‹ˆÊHXØÙ\ÜÈÛÛ›ÛÝ[™\™‹ˆ‘
H\ÜÝÛÜ™Ý[™\™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\ÜÝÛÜ™Ý[™\™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”\ÜÝÛÜ™Ý[™\™
Šˆ^XÚ]HYš[™\ÈHX[™]ÜžHXÚšXØ[[\È›ÜˆX[˜YÚ[™ÈH\ÜÝÛÜ™Y™XÞXÛHÚ][ˆHÜ™Ø[š^˜][Ûˆ
Z[š[][H[™Ý™\]Z\™YÜXÚX[Ú\˜XÝ\œË›Ý][Ûˆœ™\]Y[˜ÞH[™™]\ÙH›ÚXš][ÛŠK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[˜Üž\[ÛˆÝ[™\™ÊŠˆYš[™HH[ÛÜš]\È
K™ËˆQTËLMŠHÈ›ÝXÝ]H]™\ÝÜˆ[ˆ˜[œÚ]—ˆ
ˆ
ŠŠH\ÚXØ[ÙXÝ\š]HÝ[™\™ÊŠˆ›ÝXÝ[™ÚX›H\ÜÙ]È[™]HÙ[\ˆ\™X\Ë—ˆ
ˆ
ŠÊHXØÙ\ÜÈÛÛ›ÛÝ[™\™ÊŠˆYš[™HHÙ[™\˜[]]Üš^˜][Ûˆ
PËPPÊH[™]][XØ][Ûˆ[\È›ÜˆÙÚXØ[XØÙ\ÜË]È›Ý›ØÝ\ÈÜXÚYšXØ[HÛˆHÜ˜[[\ˆ]Z[ÈÙˆ\ÜÝÛÜ™ÛÛ\^]Kˆ‚ˆKˆLŽˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆH[š[ÜˆÙXÝ\š]H[˜[\Ý\ÚÜÈ›ÜˆÛ\šYšXØ][Ûˆ™YØ\™[™ÈH\ÙY[™\ÜÈ[™\œÜÙHÙˆH	Ü^X›ÛÚÉÈ[ˆHÛÛ^ÙˆHÛÛ\[žIÜÈÞX™\œÙXÝ\š]HÜ\˜][ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈH^X›ÛÚÈ[ˆHÞX™\œÙXÝ\š]HÛXZ[È‹ˆÜ[ÛœÎˆÂˆJHHØÝ[Y[][ÛˆÙˆ[ÞX™\˜]XÚÜÈ][ˆÜ™Ø[š^˜][Ûˆ\È˜XÙYÝ™\ˆHYX\œÈ‹ˆŠHH]KYš]™[ˆÝ[™\™Ü\˜][™È›ØÙY\™H
ÓÔ
H›Üˆ™\ÜÛ™[™ÈÈÜXÚYšXÈÞX™\™X]È‹ˆÊHH]Z[YX[X[ÝZYHÛˆ[œÝ[[™È[™Ù][™È\ÒQSHÞ\Ý[\È‹ˆ‘
H[ˆ\]ËY]H\Ý[™ÈÙˆ[[š[ÜˆÙXÝ\š]H[˜[\ÝÈ[™Z\ˆ\ÜÚYÛ™Y\ÚÜÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHH]KYš]™[ˆÝ[™\™Ü\˜][™È›ØÙY\™H
ÓÔ
H›Üˆ™\ÜÛ™[™ÈÈÜXÚYšXÈÞX™\™X]ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHÙXÝ\š]H
Šœ^X›ÛÚÊŠˆ
Üˆ[˜›ÛÚÊH\ÈH]Z[YÝ\XžK\Ý\›ØÙY\˜[ÝZYH][œÝXÝÈÓÐÈ[˜[\ÝÈÛˆÝÈÈ™\ÜÛ™È[™ÛÛZ[ˆHÜXÚYšXÈ\HÙˆ]XÚÈÜˆ™X]
K™Ëˆ\Ú[™ËX[Ø\™K˜[œÛÛ]Ø\™KÔS[š™XÝ[ÛŠK[œÝ\š[™ÈHÛÛœÚ\Ý[[™Ý[™\™^™Y™\ÜÛœÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH\ÝÜšXØ[ØÝ[Y[][ÛŠŠˆ\È[ˆ[˜ÚY[ÙË—ˆ
ˆ
ŠÊHHÒQSH[œÝ[][ÛˆÝZYJŠˆ\ÈHXÚšXØ[[œÝ[][Û‹ØÛÛ™šYÝ\˜][ÛˆX[X[—ˆ
ˆ
Š‘
HH\ÝÙˆ[˜[\ÝÊŠˆ[™\ÚÜÈ\ÈH™\ÛÝ\˜ÙH[ØØ][ÛˆX]š^ÜˆHÓÐÈX[HÜ™Ø[š^˜][Û˜[Ú\ˆ‚ˆKˆLÎˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ•ÛÈÛÛ[Y\˜ÚX[[]Y\ÈXÚYHÈ[\ˆ[ÈH\Ú[™\ÜÈ\™\œÚ\YÜ™Y[Y[
”JHÈÛÛX›Ü˜]HÛˆHÛÛ[[Ûˆ›Ú™XÝÚ]›Ùš]Ú\š[™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\ÜXÝÈ\È“Õ\XØ[HÛÝ™\›™YÚ][ˆH\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
”JOÈ‹ˆÜ[ÛœÎˆÂˆJH^]Ý˜]YÚY\Èœ›ÛHH\™\œÚ\‹ˆŠH™\ÜÛœÚXš[]Y\È›ÜˆÛÙØ\™H\]\È‹ˆÊHÝÛ™\œÚ\Ùˆ[[XÝX[›Ü\HÙˆH[]™\˜X›\È‹ˆ‘
H›Ùš]\Ú\š[™È[™ÜÜË\Ú\š[™È\œ˜[™Ù[Y[È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™\ÜÛœÚXš[]Y\È›ÜˆÛÙØ\™H\]\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”H
\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
JŠˆ\ÈHYØ[[™š[˜[˜ÚX[ÛÛ˜XÝ]ÛÝ™\›œÈH™[][ÛœÚ\™]ÙY[ˆ\Ú[™\ÜÈ\™\œÈ
›Ùš]ËÜÜÙ\Ë[™\ÝY[Ë[[XÝX[›Ü\H[™\ÜÛÛ][Ûˆ›ØÙY\™\ÊKˆÜ\˜][Û˜[[™XÚšXØ[\ÜXÝÈÝXÚ\È™\ÜÛœÚXš[]Y\È›ÜˆÛÙØ\™H\]\È\ÝX[H˜[Ú][ˆHXÚšXØ[Ý\ÜYÜ™Y[Y[ËÓ\ÈÜˆXZ[[˜[˜ÙHÛÛ˜XÝË›ÝÚ][ˆH”K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÈHÚHHÝ\ˆ™YHÈ™[Û™È[ˆH”NŠŠ—ˆ
ˆ
ŠJH^]Ý˜]YÚY\ÎŠŠˆ^HÙ]HÚ]\[œÈÈ\ÜÙ]Ë]KÝ\ÝÛY\œÈ[™ÛÙHYˆH\™\ˆX]™\ÈÜˆH\Y\È˜[Ý]ˆ]\ÈH\XØ[”HÛ]\ÙH[™]\Ý™H™YÛÝX]Y]HÝ\Ú[H™[][ÛœÈ\™HÛÛÙˆY\Ø\™È]\ÈÛÈ]K—ˆ
ˆ
ŠÊHÝÛ™\œÚ\Ùˆ[[XÝX[›Ü\H[ˆH[]™\˜X›\ÎŠŠˆ[ˆH\™\œÚ\ÛÛY][™È\ÈÜ™X]Y
Šš›Ú[JŠ‹ÛÈÝÛ™\œÚ\\ÈÈ™HÝ]Y[ˆY˜[˜ÙKˆ]\ÈH[ÜÝÛÛ\ÝYÛ]\ÙH[ˆH”H[™HÛ™H[ÜÝÙ[ˆ™YÛXÝY—ˆ
ˆ
Š‘
H›Ùš][™ÜÜÈÚ\š[™ÎŠŠˆ]\ÈHXÛÛ›ÛZXÈX\ÙˆHYÜ™Y[Y[H™\žH™X\ÛÛˆÛÈÛÛ\[šY\ÈÚYÛˆH”H˜]\ˆ[ˆÙ][™È›ÜˆHÝ\HÛÛ˜XÝ——Šˆ
Š‘^[H˜\ŠŠˆ[ˆH]Y\Ý[ÛˆÚ]
Š““Õ
ŠˆÜˆ
Š‘VÑT
Š‹š\œÝY[YžHH
Š˜ÛÛ[[Ûˆ[YJŠˆÙˆH™[XZ[š[™ÈÜ[ÛœÈH\™HH
ŠœY\ˆÛÜœÜ˜]H™[][ÛœÚ\
ŠˆH[™[ˆÛÚÈ›ÜˆHÙÛ™HÝ]ÚXÚ™[Û™ÜÈÈHY™™\™[[YKˆ™\ÜÛœÚXš[]Y\È›ÜˆÛÙØ\™H\]\È\™H
Š›Ü\˜][Û˜[
Šˆ[™]™H[ˆÓ\ËXZ[[˜[˜ÙHÛÛ˜XÝÈÜˆXÚšXØ[Ý\ÜYÜ™Y[Y[Ë]\Ë[ˆHØÝ[Y[ÈÙˆH
ŠœÝ\Y\‹XÝ\ÝÛY\ŠŠˆ™[][ÛœÚ\›ÝH\™\œÚ\ˆ‚ˆKˆLŽˆÂˆÜXÎˆ‘ÛÝ™\›˜[˜ÙK›Ø\™È	ˆÛÛ[Z]Y\È‹ˆØÙ[˜\š[Îˆ]XYÛH^Y\ËH]HX[˜YÙ[Y[ÛÛ\[žKH™\ÝXÝ\š[™ÈÙˆH]HÛÝ™\›˜[˜ÙHÛXÚY\È\È[™\Ø^KˆX™[\È\Ú[Y]HÝ\ÝÙX[ˆ›ÜˆHÛÜœÜ˜]H]X˜\ÙH[™œ˜\ÝXÝ\™Kˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]Ú[™HX™[	ÜÈš[X\žH™\ÜÛœÚXš[]H[ˆ\È›ÛH\È]HÝ\ÝÙX[È‹ˆÜ[ÛœÎˆÂˆJHÈ[œÝ\™HHÝ™\˜[[YÜš]H[™YØ[ÛÛ™šY[X[]HÙˆH]H‹ˆŠHÈ›ØÙ\ÜÈ[™X[š\[]H]HÛˆ\™XÝ[œÝXÝ[Ûˆœ›ÛHHÛÛ›Û\ˆ‹ˆÊHÈX[˜YÙH[™ÛÛ›ÛXÚšXØ[XØÙ\ÜÈÈH]H‹ˆ‘
HÈ›Ü›X[H\ÝX›\ÚHÝÛ™\œÚ\[™Û\ÜÚYšXØ][Ûˆ]™[ÙˆH]H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÈX[˜YÙH[™ÛÛ›ÛXÚšXØ[XØÙ\ÜÈÈH]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š‘]HÝ\ÝÙX[ŠŠˆ\ÈH›ÛH]
ŠXÚšXØ[HØ\œšY\ÈÝ]
ŠˆÚ]H]HÝÛ™\ˆ\ÈXÚYYˆÛÛ™šYÝ\š[™È\›Z\ÜÚ[ÛœË\Z[™È[˜Üž\[Û‹[›š[™È˜XÚÝ\[™™\ÝÜ™KØ]Ú[™ÈÝ™\ˆHXØÙ\ÜÈÛÛ›ÛËˆ^HÈ›ÝXÚYH
ÚÈÚÝ[
ˆ]™HXØÙ\ÜÈ8 %]\ÈH\Ú[™\ÜÈXÚ\Ú[ÛˆÙˆHÝÛ™\ˆ8 %]^H\™H[œÝÙ\˜X›H›ÜˆH˜XÝ]XÚšXØ[KÛ›HHšYÚ[ÜHË—Šˆ
ŠÝ\ÝÙX[ˆ[™Ý]Ø\™HÛ\šYšXØ][ÛŽŠŠˆHÖLMÌHØš™XÝ]™\È\Ý[HÙÙ]\ˆ

˜Ý\ÝÙX[‹ÜÝ]Ø\™
ŠH[™›ÜˆH^[H^H\™HÈ™H™X]Y\ÈHÚ[™ÛH›ÛKˆ[ˆÛÜœÜ˜]H˜XÝXÙKÝÙ]™\‹^HY™™\ŽˆH
Š˜Ý\ÝÙX[ŠŠˆØY™YÝX\™ÈH]HÛˆH
ŠXÚšXØ[
Šˆ[™H
ÝÜ˜YÙK˜XÚÝ\[˜Üž\[ÛŠKÚ[HH
ŠœÝ]Ø\™
ŠˆÛÚÜÈY\ˆ]È
Šœ]X[]H[™YX[š[™ÊŠˆ
Yš[š][ÛœËÛÜœ™XÝ™\ÜË›Ü\ˆ\ÙH[ˆ\Ú[™\ÜÈ›ØÙ\ÜÙ\ÊKˆÚ\™HH]Y\Ý[Ûˆ˜[Y\ÈÛ›HÛ™HÙˆHÛÈ\›\Ë]YX[œÈHÜ\˜][Û˜[™\ÜÛœÚXš[]H›ÜˆH]K—Šˆ
Š’ÝÈÈÙY\H›Ý\ˆ›Û\ÈÝ˜ZYÚŠŠˆH
Š‘]HÝÛ™\ŠŠˆXÚY\ËH
ŠÛÛ›Û\ŠŠˆ]\›Z[™\ÈH\œÜÙ\È[™YX[œÈÙˆ›ØÙ\ÜÚ[™È[™Ø\œšY\ÈHYØ[™\ÜÛœÚXš[]KH
Š”›ØÙ\ÜÛÜŠŠˆ›ØÙ\ÜÙ\ÈH]HÛˆHÛÛ›Û\‰ÜÈ™Z[ˆ[™Û›HÛˆZ\ˆ[œÝXÝ[ÛœËH
ŠÝ\ÝÙX[‹ÔÝ]Ø\™
ŠˆØY™YÝX\™È[™XZ[Z[œË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[œÝ\š[™È[YÜš]H[™ÛÛ™šY[X[]JŠˆ]HYØ[[™Ù[™\˜[ÛÝ™\›˜[˜ÙH]™[˜[È[™\ˆHÛÛ\X[˜ÙH™\ÜÛœÚXš[]Y\ÈÙˆHÛÛ\[žHÜˆH]HÝÛ™\‹—ˆ
ˆ
ŠŠH›ØÙ\ÜÚ[™È[™X[š\[][™È]JŠˆ\ÈHÜ\˜][Û˜[›ÛHÙˆH
Š‘]H›ØÙ\ÜÛÜŠŠ‹—ˆ
ˆ
Š‘
H›Ü›X[H\ÝX›\Ú[™ÈÝÛ™\œÚ\
Šˆ[™Û\ÜÚYšXØ][Ûˆ\ÈH^Û\Ú]™H™\›ÙØ]]™HÙˆH
Š‘]HÝÛ™\ŠŠ‹ˆ‚ˆKˆLŽNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ\™\È[ˆ^\›˜[ÞX™\œÙXÝ\š]K\ÜXÚX[^™YÛÛ\[žHÚ]HX[™]HÈÚ[][]HH™X[ÞX™\ˆ]XÚÈYØZ[œÝ]ÈÛÜœÜ˜]H™]ÛÜšËÚ]›Ü›X[]]Üš^˜][ÛˆÈY[YžH[™XÝ]™[H][\È^Ú]H\ØÛÝ™\™Y[™\˜Xš[]Y\È™Y›Ü™HX[XÚ[Ý\ÈXÝÜœÈØ[ˆÈÛËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÜXÚYšXÈÙXÝ\š]HXÝ]š]H‘TÕ\ØÜšX™\È\ÈØÙ[˜\š[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙXÝ\š]H]Ø\™[™\ÜÈ˜Z[š[™È‹ˆŠHÛÛ\X[˜ÙH]Y][™È‹ˆÊH[™]˜][Ûˆ\Ý[™È‹ˆ‘
H[™\˜Xš[]HØØ[›š[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[™]˜][Ûˆ\Ý[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š”[™]˜][Ûˆ\Ý[™È
[ˆ\Ý
JŠˆ\È[ˆ]]Üš^™YÚ[][][ÛˆÙˆH™X[ÞX™\ˆ]XÚÈZ[YY›ÝÛ›H]]XÝ[™È[™\˜Xš[]Y\È
\ÈHØØ[ˆÛÝ[
K]]XÝ]™[H][\[™ÈÈ^Ú][HÈ]\›Z[™HHY™™XÝ]™[™\ÜÈÙˆÙXÝ\š]HÛÛ›ÛÈ[™H™X[[\XÝÙˆHÝ[X[œ™XXÚ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH]Ø\™[™\ÜÈ˜Z[š[™ÊŠˆYXØ]\È[\ÞYY\ÈÛˆÛÛÙÙXÝ\š]H˜XÝXÙ\Ë—ˆ
ˆ
ŠŠHÛÛ\X[˜ÙH]Y][™ÊŠˆ™\šYšY\È›Ü›X[ÛÛ\X[˜ÙHÚ]™YÝ[]ÜžHÝ[™\™Ë—ˆ
ˆ
Š‘
H[™\˜Xš[]HØØ[›š[™ÊŠˆ\ÜÚ]™[H]XÝÈH™\Ù[˜ÙHÙˆÛ›ÝÛˆYÜÈ[ˆÞ\Ý[\ÈÚ]Ý]][\[™ÈÈ^Ú][HÜˆÚ[][]HÛÛ\^XÝ]™H]XÚÜËˆ‚ˆKˆLÌˆÂˆÜXÎˆÜž\ÙÜ˜\H	ˆÙ^HX[˜YÙ[Y[‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\È[\[Y[[™È[˜Üž\[ÛˆÝ[™\™ÈÈ›ÝXÝÙ[œÚ]]™H]KˆHÙXÝ\š]HX[H]\ÝYš[™H[™ØÝ[Y[H›Ü›X[Üž\ÙÜ˜\XÈÙ^HX[˜YÙ[Y[›ØÙY\™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ]š]Y\È\È“Õ\XØ[H\ÙˆHÝ[™\™Üž\ÙÜ˜\XÈÙ^HX[˜YÙ[Y[›ØÙY\™\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ[™\˜][Ûˆ[™ÙXÝ\™H\ÝšX][ÛˆÙˆÙ^\È‹ˆŠHÙXÝ\™HÝÜ˜YÙH[™\š[ÙXÈ›Ý][ÛˆÙˆÙ^\È‹ˆÊH™YÝ[\›H\][™ÈH\XØ][ÛˆÛÙØ\™HÈÝ\Ü™]È[˜Üž\[ÛˆY]ÙÈ‹ˆ‘
H›ØÙY\™\È›ÜˆH™]›ØØ][Ûˆ[™\ÝXÝ[ÛˆÙˆÛÛ\›ÛZ\ÙYÙ^\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH™YÝ[\›H\][™ÈH\XØ][ÛˆÛÙØ\™HÈÝ\Ü™]È[˜Üž\[ÛˆY]ÙÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š’Ù^HX[˜YÙ[Y[
Šˆ›ØÝ\Ù\È^Û\Ú]™[HÛˆH[\™HY™XÞXÛHÙˆÜž\ÙÜ˜\XÈÙ^\È
Ù[™\˜][Û‹\ÝšX][Û‹ÝÜ˜YÙK›Ý][Û‹™]›ØØ][Ûˆ[™\ÝXÝ[ÛŠKˆ\][™È\XØ][ÛˆÛÙØ\™HÈÝ\Ü™]ÈÜž\ÙÜ˜\XÈ›ÝØÛÛÈ\ÈHÙ[™\šXÈÛÙØ\™HXZ[[˜[˜ÙHÜˆ[™\˜Xš[]KÔ]ÚX[˜YÙ[Y[XÝ]š]K›ÝHÙ^HX[˜YÙ[Y[›ØÙY\™K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÈHH™YHY™XÞXÛHÝYÙ\ÈÙˆHÙ^NŠŠ—ˆ
ˆ
ŠJHÙ[™\˜][Ûˆ[™ÙXÝ\™H\ÝšX][ÛŽŠŠˆHÙ^H\È›Ü›ˆœ›ÛH[ˆY\]X]H[›ÜHÛÝ\˜ÙH[™]\Ý™XXÚÚÙ]™\ˆÚ[\ÙH]
ŠÚ]Ý]]™\ˆ˜]™[[™È[ˆHÛX\ŠŠ‹ˆ\È\È[ÛÈÚ\™HH^Ú[™ÙH›Ø›[H\š\Ù\ËÚXÚ\Þ[[Y]šXÈÜž\ÙÜ˜\H[™Ù^KY^Ú[™ÙH›ÝØÛÛÈÛÛ™K—ˆ
ˆ
ŠŠHÙXÝ\™HÝÜ˜YÙH[™\š[ÙXÈ›Ý][ÛŽŠŠˆHÙ^H]\Ý™HÙ\Ú\™H]Ø[››Ý™H^˜XÝY
ÓKK›ÝXÝYÙ^\ÝÜ™JH[™™\XÙY]Yš[™Y[\˜[Ë[Z][™ÈH›Û[YHÙˆ]H^ÜÙYÚÝ[]]™\ˆXZË—ˆ
ˆ
Š‘
H™]›ØØ][Ûˆ[™\ÝXÝ[ÛŽŠŠˆÚ[ˆHÙ^H\ÈÛÛ\›ÛZ\ÙYÜˆ›ÈÛ™Ù\ˆ™YYY]]\Ý™H
Šœ™]›ÚÙY
Šˆ
ÛÈ]Ý\œÈÛ›ÝÈ›ÝÈ\Ý]ˆÔ“[™ÐÔÔ[ˆHÙ\YšXØ]HÛÜ›
H[™[ˆ
Š™\Ý›ÞYY
Š‹YX[š[™È™[™\™Y[œ™XÛÝ™\˜X›K——Šˆ
Š‘^[H˜\ŠŠˆHÙ^IÜÈY™XÞXÛHÛÛY\ÈÝÛˆÈÚ^[ÛY[ÈH
Š™Ù[™\˜][Û‹\ÝšX][Û‹ÝÜ˜YÙK\ÙK›Ý][Û‹™]›ØØ][Ûˆ[™\ÝXÝ[ÛŠŠˆH[™›Û™HÙˆ[HÛÛ˜Ù\›œÈH\XØ][Û‰ÜÈÛÙKˆ\][™ÈÛÙØ\™HÈÝ\Ü™]È[ÛÜš]\È\È
Šœ]ÚX[˜YÙ[Y[
Šˆ
Øš™XÝ]™HŒJHÜˆÜž\ÙÜ˜\XÈYÚ[]NÈ]\ÈHX[H[™ÛÛY][Y\È™XÙ\ÜØ\žHXÝ]š]K]]\È›ÝHÙ^K[X[˜YÙ[Y[›ØÙY\™Kˆ[ˆH“Õ]Y\Ý[Û‹HÙÛ™HÝ]\È[[ÜÝ[Ø^\ÈHÜ[Ûˆ]Ú[™Ù\È
Š™\ØÚ\[™JŠ‹›ÝHÛ™H]ÛÚÜÈX\Ý[\Ü[ˆ‚ˆKˆLÌNˆÂˆÜXÎˆ\˜Ú]XÝ\™H[Ù[È	ˆÚ\™Y™\ÜÛœÚXš[]H‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\È[›š[™ÈÈZYÜ˜]HH˜]Ú[XYÙH›ØÙ\ÜÚ[™ÈÙ\šXÙHÈHÛÝYˆHX[HØ[ÈHÛÛ][Ûˆ[ˆÚXÚ]Ù\È›Ý]™HÈÛÜœžHX›Ý]]Ú[™ÈÜ\˜][™ÈÞ\Ý[\ËX[˜YÚ[™ÈZY]Ø\™K\][™ÈH\XØ][Ûˆ[[YK›ÜˆX[˜YÚ[™ÈHØØ[Xš[]HÙˆH[™œ˜\ÝXÝ\™HÚ[ˆHÛÜšÛØYÝY[›H˜\šY\Èœ›ÛH™\›ÈÈÝ\Ø[™ÈÙˆ[XYÙ\È›ØÙ\ÜÙY\ˆÙXÛÛ™ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÛÝYÙ\šXÙH[Ù[Ù™™\œÈH^XÝ][Ûˆ[š\›Û›Y[Ú]HX\Ý[™œ˜\ÝXÝ\™HX[˜YÙ[Y[™\ÜÛœÚXš[]H›ÜˆHÝ\ÝÛY\È‹ˆÜ[ÛœÎˆÂˆJH[™œ˜\ÝXÝ\™H\ÈHÙ\šXÙH
XXTÊH‹ˆŠH]›Ü›H\ÈHÙ\šXÙH
XTÊH‹ˆÊH[˜Ý[Ûˆ\ÈHÙ\šXÙH
˜XTÊHÈÙ\™\›\ÜÈ‹ˆ‘
HÛÙØ\™H\ÈHÙ\šXÙH
ØXTÊH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[˜Ý[Ûˆ\ÈHÙ\šXÙH
˜XTÊHÈÙ\™\›\ÜÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆH
Š‘˜XTÈ
[˜Ý[Ûˆ\ÈHÙ\šXÙHÈÙ\™\›\ÜÊJŠˆ[Ù[H[\™H[™œ˜\ÝXÝ\™H
[˜ÛY[™È\ÚXØ[Ù\™\œËÜ\˜][™ÈÞ\Ý[\ËZY]Ø\™K[[YH[™]]ÛX]XÈØØ[[™È]™[ˆÝÛˆÈ™\›ÊH\È[HX[˜YÙYžHHÛÝY›ÝšY\‹ˆHÝ\ÝÛY\ˆ\ÈÛ›H[™^Û\Ú]™[HH™\ÜÛœÚXš[]HÈ›ÝšYHH[˜Ý[Û‰ÜÈÛÝ\˜ÙHÛÙH[™ÛÛ™šYÝ\™HH™XÙ\ÜØ\žHšYÙÙ\œÈ[™PSH\›Z\ÜÚ[ÛœËˆÛÛ\\™YÈXTË[ˆ˜XTÈ]™[ˆÙ\™\ˆ[™ØØ[[™ÈX[˜YÙ[Y[\Ø\X\œËZ[š[Z^š[™ÈH\Ù\‰ÜÈ[™œ˜\ÝXÝ\™H™\ÜÛœÚXš[]H›Üˆ^XÝ][™ÈÝ\ÝÛHÛÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHXXTÊŠˆ™\]Z\™\ÈHÝ\ÝÛY\ˆÈX[˜YÙH[™]ÚHÜ\˜][™ÈÞ\Ý[H[™š\X[[™œ˜\ÝXÝ\™K—ˆ
ˆ
ŠŠHXTÊŠˆ™[Y]™\ÈHÝ\ÝÛY\ˆÙˆÔÈ]Ú[™Ë]Ý[™\]Z\™\ÈÛÛ™šYÝ\š[™ÈHÙ\™\ˆ[œÝ[˜ÙKÜ[[YH[š\›Û›Y[[™X[˜YÚ[™ÈHØØ[[™ÈÙˆ\XØ][Ûˆ[œÝ[˜Ù\È
K™ËˆZ[š[][H[X™\ˆÙˆÛÛZ[™\œËÚ[œÝ[˜Ù\ÊK—ˆ
ˆ
Š‘
HØXTÊŠˆ›ÝšY\ÈHÛÛ\]H™XYK]Ë]\ÙH\XØ][Ûˆ
K™Ëˆ[XZ[ÜˆÔ“JK]Ù\È›Ý[ÝÈHÝ\ÝÛY\ˆÈ^XÝ]HÝ\ÝÛHÛÙHÜˆÛÛ\][™È[˜Ý[ÛœÈÝXÚ\ÈÜÙH™YYYÈ›ØÙ\ÜÈÝ\ÝÛH˜]Ú[XYÙ\Ëˆ‚ˆKˆLÌŽˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆH[™]˜][Ûˆ\Ý\ˆ\È\Ý™Y[ˆ[™ØYÙY]HXÝ]š]HÚ[™ÝÈYÜ™YYÚ]HÝ\ÝÛY\ˆÛ›HÜ[œÈH›ÛÝÚ[™ÈÙYZËˆ[ˆHYX[[YH^HØ]\ˆ\È]XÚ\ÈÜÜÚX›HX›Ý]H\™Ù]œ›ÛHX›XÈÛXZ[ˆ™YÚ\ÝšY\ËÛ›[™H\˜Ú]™\È[™ÛØÚX[›Ùš[\ËÚ]Ý]Ù[™[™ÈHÚ[™ÛHXÚÙ]ÈHÝ\ÝÛY\‰ÜÈÞ\Ý[\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈH\ÙHÙˆH[™]˜][Ûˆ\Ý[ˆÚXÚ[™›Ü›X][Ûˆ\ÈØ]\™YÚ]Ý][\˜XÝ[™È\™XÝHÚ]H\™Ù]Þ\Ý[OÈ‹ˆÜ[ÛœÎˆÂˆJHXÝ]™H™XÛÛ›˜Z\ÜØ[˜ÙH‹ˆŠHY™[œÚ]™H‹ˆÊHÛ›ÝÛˆ[š\›Û›Y[‹ˆ‘
H\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙHÛÛœÚ\ÝÈÙˆØ]\š[™È[™›Ü›X][ÛˆX›Ý]H\™Ù]Ú]Ý][\˜XÝ[™È\™XÝHÚ]]ÈÞ\Ý[\ÈÜˆ™]ÛÜšÜËˆ\È\ÙH[›Û™\ÈØZ[š[™È]Hœ›ÛHX›XÛH]˜Z[X›HÛÝ\˜Ù\ËÝXÚ\ÈÒÒTÈ]X˜\Ù\ËÛØÚX[YYXH[™ÙXœÚ]\ËÚ]Ý][\[™ÈH\™Ù]ÈHÜÜÚX›H[[Z[™[]XÚË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHXÝ]™H™XÛÛ›˜Z\ÜØ[˜ÙJŠˆ[›Û™\È\™XÝ[\˜XÝ[ÛˆÚ]HÞ\Ý[H
K™ËˆÜØØ[›š[™ÊKÚXÚØ[ˆ™H]XÝYžHH\™Ù]—ˆ
ˆ
ŠŠHH\›H	ÙY™[œÚ]™IÊŠˆ\XØ[H™Y™\œÈÈ›YHX[HÝ˜]YÚY\È[™XÝ]š]Y\Ë›ØÝ\ÙYÛˆ›ÝXÝ[Ûˆ[™[Ûš]Üš[™Ë›ÝÛˆH[™]˜][Ûˆ\Ý[™È\ÙK—ˆ
ˆ
ŠÊHHÛ›ÝÛˆ[š\›Û›Y[
ŠˆÛÛ˜Ù\›œÈH]™[Ùˆš[ÜˆÛ›ÝÛYÙH›ÝšYYÈH\Ý\ˆ™YØ\™[™ÈH[™œ˜\ÝXÝ\™K›ÝH]HÛÛXÝ[ÛˆY]Ù[\ÞYYˆ‚ˆKˆLÌÎˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHÛÙØ\™HÝ\ÙHØ[ÈH\ÜÚYÛ™Y\Ý\ˆÈš[™]™[ˆH[ÜÝY[ˆ›]ÜÈ[ˆ]È˜[šÚ[™È\XØ][Ûˆ[™XÚY\ÈÈ[™Ý™\ˆ]™\ž][™È]\Îˆ\˜Ú]XÝ\™HXYÜ˜[\Ë\ÚYÛˆØÝ[Y[ËYZ[š\Ý˜]]™HÜ™Y[X[È[™HÛÛ\]HÛÝ\˜ÙHÛÙKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\\ÈÙˆ[™]˜][Ûˆ\Ý›ÝšY\ÈH\Ý\ˆÚ]ÛÛ\]HÛ›ÝÛYÙHÙˆH\™Ù][š\›Û›Y[[˜ÛY[™È\˜Ú]XÝ\™K\ÚYÛˆ[™ÛÝ\˜ÙHÛÙKÈY[YžHY[ˆ[™\˜Xš[]Y\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\ÜÚ]™H\ÜÙ\ÜÛY[‹ˆŠH\X[HÛ›ÝÛˆ[š\›Û›Y[
Ü™^H›Þ
H‹ˆÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
H‹ˆ‘
H[šÛ›ÝÛˆ[š\›Û›Y[
›XÚÈ›Þ
H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[ˆH
ŠšÛ›ÝÛˆ[š\›Û›Y[
Šˆ\ÝH\Ý\ˆ\ÈÚ]™[ˆ]™\ž][™È™YYY\œ›Ûˆ\˜Ú]XÝ\™K\ÚYÛˆØÝ[Y[][Û‹ÛÛ™šYÝ\˜][ÛœÈ[™
ŠœÛÝ\˜ÙHÛÙJŠ‹ˆ]\ÈHÛ›H›Ü›X]]š[™È
Š›ÙÚXÊŠˆ›]ÜÈ8 %H\›Z\ÜÚ[ÛˆÚXÚÈ]Ø[ˆÛ›H™Hž\\ÜÙYY\ˆ]][XØ][Û‹Ø^H8 %ÚXÚ›È^\›˜[ØØ[ˆÛÝ[™XXÚ™XØ]\ÙH^H\™H[š\ÚX›Hœ›ÛHH\š[Y]\‹ˆ]\ÈÚÜÙ[ˆÚ[ˆHÛØ[\ÈH
Š™\
ŠˆÙˆH[˜[\Ú\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH\X[HÛ›ÝÛˆ[š\›Û›Y[
Ü™^H›Þ
NŠŠˆH\Ý\ˆ\ÈÚ]™[ˆ
Šœ\X[
Šˆ[™›Ü›X][Û‹\ÝX[H[ˆÜ™[˜\žHXØÛÝ[ˆ]Ú[][]\ÈH[œÚY\ŽÈ]\È›ÝHÛÙH™]šY]Ë—ˆ
ˆ
Š‘
H[šÛ›ÝÛˆ[š\›Û›Y[
›XÚÈ›Þ
NŠŠˆH\Ý\ˆ\ÈÚ]™[ˆ
Š››Ý[™ÊŠˆ[™XÝÈ\È[ˆ^\›˜[]XÚÙ\‹ˆ]YX\Ý\™\ÈHY™[™\‰ÜÈ]XÝ[ÛˆØ\Xš[]K]]\ÈHÛÝÙ\Ý›Ü›X][™X]™\È[\›˜[[™\˜Xš[]Y\È[˜ÛÝ™\™Y—ˆ
ˆ
ŠJH\ÜÚ]™H\ÜÙ\ÜÛY[ŠŠˆ\È›ÝH]™[ÙˆÛ›ÝÛYÙH]H
ŠØ^HÙˆ[\˜XÝ[™ÊŠˆÚ]H\™Ù]ˆ]ØœÙ\™\È˜Y™šXÈ[™X›XÈÛÝ\˜Ù\ÈÚ]Ý]Ù[™[™ÈXÚÙ]Ëˆ]\ÈHX[™]ÜžHÚÚXÙHÛˆÜš]XØ[Þ\Ý[\È
PÔËÔÐÐQKYYXØ[]šXÙ\ÊHÚ\™H[ˆXÝ]™HØØ[ˆØ[ˆØ]\ÙH[ˆÝ]YÙK]]^Ú]È›Ý[™È[™™]™\ˆÙY\ÈHÛÙK——Šˆ
Š‘^[H˜\ŠŠˆÈ›ÝÛÛ™\ÙH
ŠšÝÈ]XÚÛ›ÝÛYÙJŠˆH\Ý\ˆ\ÈÚ]
ŠšÝÈ]XÚ^H[\˜XÝ
ŠˆÚ]H\™Ù]ˆ\ÙH\™HÛÈ[™\[™[^\ËˆÛ›ÝÛYÙHOˆ[šÛ›ÝÛˆÈ\X[HÛ›ÝÛˆÈÛ›ÝÛˆ[š\›Û›Y[
›Ü›Y\›H›XÚÈÈÜ™^HÈÚ]H›Þ
Kˆ[\˜XÝ[ÛˆOˆ
Šœ\ÜÚ]™JŠˆ™XÛÛ›˜Z\ÜØ[˜ÙH
ØœÙ\˜][ÛˆÛ›K™\›Èš\ÚÈÙˆ\Ü\[ÛŠH™\œÝ\È
Š˜XÝ]™JŠˆ
\™XÝØØ[›š[™È[™]Y\žZ[™ÊKˆHÛ›ÝÛ‹Y[š\›Û›Y[\ÝØ[ˆ\™™XÝHÙ[Ý\Ú]H\ÜÚ]™H\ÙKˆ‚ˆKˆLÍˆÂˆÜXÎˆ”ÛØÚX[[™Ú[™Y\š[™È‹ˆØÙ[˜\š[Îˆ]Ù[H[››Ý˜][ÛœÈËØ\ÚH™XÙZ]™\È[ˆ[™^XÝYØ[œ›ÛHÛÛY[Û™HÛZ[Z[™ÈÈ™[Û™ÈÈHU\\Y[ˆHØ[\ˆ\ÚÜÈ\ˆÈÛÛ™š\›H\ˆ\Ù\›˜[YH[™\ÜÝÛÜ™›ÜˆHÝ\ÜÙYÞ\Ý[H\]Kˆ[œÝ\™KØ\ÚH\Ú]]\È[™\ÚÜÈH[\›ØÝ]ÜˆÈ›ÝšYH[ˆY[YšXØ][ÛˆØÝ[Y[ÜˆHØ[˜XÚÈ[X™\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È\ØÜšX™\ÈHÛØÚX[[™Ú[™Y\š[™ÈXÚš\]YHÈÚXÚØ\ÚHØ\È^ÜÙYÈ‹ˆÜ[ÛœÎˆÂˆJH[™\˜Xš[]H\ÜÙ\ÜÛY[‹ˆŠHÛZ\Ú[™È‹ˆÊHš\Ú[™È‹ˆ‘
H\›Z[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHš\Ú[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆš\Ú[™È
›ÚXÙH\Ú[™ÊH\ÈH›Ü›HÙˆÛØÚX[[™Ú[™Y\š[™È[ˆÚXÚH]XÚÙ\ˆ\Ù\ÈHÛ™HÈ[™XÙH[ÜHÈ›ÝšYH\œÛÛ˜[[™›Ü›X][Û‹ÝXÚ\È\ÜÝÛÜ™ÈÜˆÜ™Y]Ø\™[X™\œËˆ[ˆØ\ÚIÜÈØ\ÙKHØ[\ˆ™][™[™ÈÈ™Hœ›ÛHHU\\Y[[™™\]Y\Ý[™È\Ù\›˜[YH[™\ÜÝÛÜ™žHÛ™H\ÈHÛ\ÜÚXÈ^[\HÙˆš\Ú[™Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÛZ\Ú[™ÊŠˆ™Y™\œÈÈ\Ú[™È]XÚÜÈÛÛ™XÝYšXHÓTÈ^Y\ÜØYÙ\Ë›ÝšXH›ÚXÙHØ[Ë—ˆ
ˆ
Š‘
H\›Z[™ÊŠˆ[›Û™\È™Y\™XÝ[™È\Ù\œÈœ›ÛHYÚ][X]HÙXœÚ]\ÈÈœ˜]Y[[Ú]\ËX[š\[][™ÈH”ÈÞ\Ý[HÜˆ^Ú][™Èœ›ÝÜÙ\ˆ[™\˜Xš[]Y\Ë—ˆ
ˆ
ŠJHH[™\˜Xš[]H\ÜÙ\ÜÛY[
Šˆ\ÈHY]ÙÈ]˜[X]HHÙXÝ\š]HÜÝ\™HÙˆHÞ\Ý[K›ÝHXÚš\]YH›ÜˆX[š\[][™È[ÜKˆ‚ˆKˆLÍNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ’Z\ˆ[™\™K[ˆÛ›[™HZ\™™\ÜÚ[™ÈÝ\Y\ÈÝÜ™K\ÈÛÛ™XÝYHÛÛ\]Hš\ÚÈ\ÜÙ\ÜÛY[[™Y[YšYYÝ[X[[™\˜Xš[]Y\È[ˆ]È™]ÛÜšÈ[™œ˜\ÝXÝ\™KˆHÛÛ\[žH™XÛÙÛš^™\È][›Ý\ˆÛØ˜[[™[ZXÈÛÝ[Ù\š[Ý\ÛH[XYÙHH\Ú[™\ÜÈ[™™\™\Ù[ÈHÛÛœÚY\˜X›Hš\ÚËˆY\ˆØ\™Y[[˜[\Ú\Ë^H]\›Z[™H]^HØ[››ÝÛÛ›ÛÚ]\ˆ[›Ý\ˆ[™[ZXÈÚ[ØØÝ\‹ˆ^H\™Y›Ü™HYÜYX\Ý\™\ÈÈ™YXÙHH\\ÈÙˆ[XYÙHH[™[ZXÈÛÝ[Ø]\ÙKÜ[™È]Ú[›Ý\[‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈX[˜YÙ[Y[Ý˜]YÞH\ÈHÛÛ\[žH[\ÞZ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHZ]YØ]H‹ˆŠH]›ÚY‹ˆÊHXØÙ\‹ˆ‘
H˜[œÙ™\ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHZ]YØ]JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆZ]YØ][™Èš\ÚÈYX[œÈ[\[Y[[™ÈYX\Ý\™\ÈÜˆÛÛ›ÛÈÈ™YXÙHHÝ[X[[\XÝÜˆ›Ø˜Xš[]H]Hš\ÚÈ]™[Ú[ØØÝ\‹ˆ[ˆHØÙ[˜\š[ËHÛÛ\[žHYÜÈÛÛ˜Ü™]HYX\Ý\™\ÈÈ™YXÙHH[XYÙHØ]\ÙYžHH[™[ZXË[[ÛœÝ˜][™ÈHZ]YØ][Ûˆ\›ØXÚ—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHXØÙ\[™ÈHš\ÚÊŠˆÛÝ[YX[ˆ]HÜ™Ø[š^˜][Ûˆ™XÛÙÛš^™\ÈHš\ÚÈÚ]Ý]ZÚ[™È[žHÜXÚYšXÈXÝ[ÛˆÈZ]YØ]H]Ú\™X\È[ˆHØÙ[˜\š[ÈÛÛ˜Ü™]HYX\Ý\™\È\™HYÜY—ˆ
ˆ
Š‘
H˜[œÙ™\œš[™ÈHš\ÚÊŠˆ[›Û™\ÈÚY[™ÈHš[˜[˜ÚX[\™[ˆÙˆÝ[X[ÜÜÙ\ÈÈ\™\Y\ËÝXÚ\È[ˆ[œÝ\˜[˜ÙHÛÛ\[žNÈ\™H\È›ÈY[[ÛˆÙˆ\È[ˆHØÙ[˜\š[Ë—ˆ
ˆ
ŠŠH]›ÚY[™ÈHš\ÚÊŠˆ[›Û™\ÈHÝ[[[Z[˜][ÛˆÙˆHš\ÚÈžHXœÝZ[š[™Èœ›ÛHHš\ÚÞHXÝ]š]NÈYˆHÛÛ\[žHÙ\™H]›ÚY[™ÈHš\ÚË]ÛÝ[›Ø˜X›HÛÜÙHH\Ú[™\ÜËÚ[˜ÙH]›ÚY[™È[\Y\È›Ý[™\ZÚ[™ÈHš\ÚÞHXÝ]š]H][ˆ‚ˆKˆLÍŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHX[Y˜XÝ\š[™È\XØ][Ûˆ[œÈÛˆ[ˆÜ\˜][™ÈÞ\Ý[H™\œÚ[Ûˆ]\È›ÈÛ™Ù\ˆÝ\ÜYˆH\XØ][Ûˆ™[™ÜˆÙ\È›ÝÙ\YžH]Ûˆ™]Ù\ˆ™\œÚ[ÛœÈ[™ZYÜ˜][ÛˆÚ[ZÙHÛÈYX\œËˆX[˜YÙ[Y[ÚYÛœÈHØÝ[Y[XÚÛ›ÝÛYÚ[™ÈHš\ÚË\ÜÚYÛš[™È]È[ˆÝÛ™\‹[\ÜÚ[™È™]ÛÜšÈÙYÛY[][Ûˆ[™[š[˜ÙY[Ûš]Üš[™È\ÈÛÛ\[œØ][™ÈÛÛ›ÛË[™Ù][™ÈH™]šY]È]™\žHÚ^[ÛËˆ[ˆHØ[YH\š[ÙHÚ[™ÛH™\ÙX\˜Ú\‰ÜÈ\Ü\È]]Üš^™Y[ˆÜš][™È›ÝÈ\HHTÐˆÜ›ØÚÚ[™ÈÛXÞK›ÜˆÛ™H^\š[Y[\Ý[™È™YH[ÛËˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\™HH]šX][ÛˆÜ˜[YÈHX[Y˜XÝ\š[™È\XØ][Ûˆ[™HÛ™HÜ˜[YÈH™\ÙX\˜Ú\‰ÜÈ\ÜØ[Y™\ÜXÝ]™[OÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ˜[œÙ™\ˆ›ÜˆHš\œÝÈš\ÚÈ]›ÚY[˜ÙH›ÜˆHÙXÛÛ™‹ˆŠH^[\[Ûˆ›ÜˆHš\œÝÈ^Ù\[Ûˆ›ÜˆHÙXÛÛ™‹ˆÊH^Ù\[Ûˆ›ÜˆHš\œÝÈ^[\[Ûˆ›ÜˆHÙXÛÛ™‹ˆ‘
Hš\ÚÈZ]YØ][Ûˆ›ÜˆHš\œÝÈš\ÚÈXØÙ\[˜ÙH›ÜˆHÙXÛÛ™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH^[\[Ûˆ›ÜˆHš\œÝÈ^Ù\[Ûˆ›ÜˆHÙXÛÛ™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ›ÝÚ]X][ÛœÈ\™H›Ü›\ÈÙˆ[X™\˜]H
Š˜XØÙ\[˜ÙJŠˆÙˆš\ÚË[™H^[HØš™XÝ]™\È[[H\\žH
Š™\˜][Ûˆ[™ØÛÜJŠ‹ˆ[ˆ
Š™^[\[ÛŠŠˆ\ÈH
Š›\Ý[™ËÝXÝ\˜[
ŠˆØZ]™\ŽˆHÞ\Ý[HØ[››Ý™HXYHÛÛ\X[[™Ú[›Ý™H›ÜˆHÛ™È[YKÛÈHØZ]™\ˆ™XÛÛY\ÈH\›X[™[\ÙˆHš\ÚÈ[™ØØ\H[[HØ]\ÙH\È™[[Ý™Yˆ]\È^XÝHHX[Y˜XÝ\š[™È\XØ][ÛŽˆÛÈYX\œÈÙˆZYÜ˜][Û‹›ÈÙ\YšYY™\œÚ[Ûˆ]˜Z[X›KÛÈHØZ]™\ˆÝ[™ÈÚ]ÛÛ\[œØ][™ÈÛÛ›ÛÈ[™\š[ÙXÈ™]šY]ÜËˆ[ˆ
Š™^Ù\[ÛŠŠ‹žHÛÛ˜\Ý\ÈH
Š›˜\œ›ÝË[\Ü˜\žJŠˆØZ]™\ˆÙˆH[H]Ý\Ú\ÙHÛÛ[Y\ÈÈ\NˆÛ™H\ÜÛ™H™\]Z\™[Y[™YH[ÛËHÜXÚYšXÈ™X\ÛÛ‹ˆÚ]HÛÈÚ\™H\ÈÚ]XZÙ\ÈXØÙ\[˜ÙHYÚ][X]H˜]\ˆ[ˆ™YÛYÙ[ˆ]\È[ˆÜš][™Ë
Š˜\›Ý™Y]H]™[Ú]H]]Üš]HÈØ\œžH]š\ÚÊŠ‹Ú]H˜[YY
Š›ÝÛ™\ŠŠ‹
Š˜ÛÛ\[œØ][™ÈÛÛ›ÛÊŠˆÚ\™HH[[™YÛÛ›ÛÈØ[››Ý\K[ˆ
Š™^\žH]JŠˆ[™HØÚY[Y
Šœ™]šY]ÊŠ‹ˆÚ]Ý]ÜÙK]\È›Ýš\ÚÈXØÙ\[˜ÙNˆ]\È[ˆ[™ØÝ[Y[YØ\—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH˜[œÙ™\ˆ[™]›ÚY[˜ÙNŠŠˆ
Š˜[œÙ™\ŠŠˆ[Ý™\ÈHš[˜[˜ÚX[\™[ˆÈH\™\K\XØ[H›ÝYÚ[œÝ\˜[˜ÙHÜˆHÛÛ˜XÝÛ]\ÙNÈ
Š˜]›ÚY[˜ÙJŠˆ™[[Ý™\ÈHš\ÚÈžH›Ü[™ÈHXÝ]š]H8 %\™KÝÚ]Ú[™ÈH\XØ][ÛˆÙ™ˆÜˆ›Ü˜šY[™ÈH^\š[Y[ˆ™Z]\ˆ\[œÈ[ˆHØÙ[˜\š[ÎˆHÜ™Ø[š^˜][ÛˆÙY\ÈHš\ÚÈÛˆ]ÈÝÛˆ›ÛÚÜË—ˆ
ˆ
ŠÊHHÛÈÝØ\YŠŠˆHZ\ÝZÙHÈ]›ÚY[™H\ØÜš[Z[˜]Üˆ\ÈÚ[™ÛNˆ\ÚÈÚ]\ˆHØZ]™\ˆ\È
ŠœÝXÝ\˜[[™›ÛÛ™ÙY
Šˆ
^[\[ÛŠHÜˆ
ŠœÜXÚYšXÈ[™[YKX›Ý[™
Šˆ
^Ù\[ÛŠKˆÛÈYX\œÈ[™HÚÛHÞ\Ý[HYØZ[œÝ™YH[ÛÈ[™Û™H\Ü—ˆ
ˆ
Š‘
HZ]YØ][Ûˆ[™XØÙ\[˜ÙNŠŠˆ
Š›Z]YØ][ÛŠŠˆ™YXÙ\ÈZÙ[ZÛÙÜˆ[\XÝžHY[™ÈÛÛ›ÛË[™]\ÈYH]ÙYÛY[][Ûˆ[™[Ûš]Üš[™È\™HZ]YØ][ÛœÈ8 %]^H\™HH
Š˜ÛÛ\[œØ][™ÈÛÛ›ÛÊŠˆXØÛÛ\[žZ[™ÈHØZ]™\‹›ÝHØZ]™\ˆ]Ù[‹ÚXÚ\ÈÚ]H]Y\Ý[Ûˆ\ÚÜÈ[ÝHÈ˜[YKˆ[™XØÙ\[˜ÙH[Û™HÙ\È›Ý[HÛÈ\\ˆ›Ý\™HXØÙ\[˜ÙK——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆH›Ý\ˆš\ÚÈ™\ÜÛœÙHÝ˜]YÚY\È[™ÝÈXXÚÚÝÜÈ\[ˆHØÙ[˜\š[Ëˆ
Š“Z]YØ]JŠˆHÛÛ›ÛÈ\™HYYÈ™YXÙHZÙ[ZÛÙÜˆ[\XÝ0­È
Š•˜[œÙ™\ŠŠˆH[œÝ\˜[˜ÙHÜˆHÛÛ˜XÝÛ]\ÙH[Ý™\ÈHÜÜÈ0­È
Š]›ÚY
ŠˆHHXÝ]š]HÝÜÈ0­È
ŠXØÙ\
ŠˆHHš\ÚÈ\ÈÙ\[™ZÙ\ÈH›Ü›HÙˆ[ˆ
Š™^[\[ÛŠŠˆ
\Ý[™ËÝXÝ\˜[ØZ]™\ŠHÜˆ[ˆ
Š™^Ù\[ÛŠŠˆ
ÜXÚYšXË[\Ü˜\žHØZ]™\ŠKˆYˆH]Y\Ý[ÛˆÙ[ÈÛˆ
ŠšÝÈÛ™ÊŠˆHØZ]™\ˆ\ÝÈ[™
ŠšÝÈœ›ØY
Šˆ]\Ë]\È\ÚÚ[™ÈÚXÚÙˆHÛËˆ‹ˆKˆLÍÎˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆY\ˆ[ˆ[˜ÚY[HÝ\\š\ÛÜžH]]Üš]H\ÚÜÈHÛÛ\[žHÈ[[ÛœÝ˜]HÚÈYÚ]ÛˆHÞ\Ý[\È[›Û™Y[™[ˆÚ]Ü™\‹[ˆÜ™\ˆÈ™\šYžH]]™\žH™YÝ[]ÜžHØ›YØ][ÛˆØ\ÈY]Ú[HH]™[Ø\È™Z[™È[™Yˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÙXÝ\š]H™X]\™\Ë[ˆ[YÜ˜[\Ùˆ[˜ÚY[™\ÜÛœÙK˜XÚÜÈXÝ]š]Y\È[™\È\ÙY\È]šY[˜ÙH\š[™È[˜ÚY[ÈÈ[[ÛœÝ˜]H][™YÝ[][ÛœÈ]™H™Y[ˆ™\ÜXÝYÈ‹ˆÜ[ÛœÎˆÂˆJH[˜ÚY[ÙÜÈ‹ˆŠH]™[[Ûš]Üš[™È‹ˆÊHÜ\˜][Û˜[\ÝÜžH‹ˆ‘
H]Y]˜Z[È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H]Y]˜Z[ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ]Y]˜Z[È\™H]Z[Y™XÛÜ™È]Ù\]Y[X[H˜XÚÈXÝ]š]Y\ÈÚ][ˆHÞ\Ý[K›ÝšY[™È[™[Y[[]HÈ]XÝ^[Z[™H[™[™\œÝ[™H˜]\™HÙˆÙXÝ\š]Hœ™XXÚ\È[™[[ÛœÝ˜]H™YÝ[]ÜžHÛÛ\X[˜ÙK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[˜ÚY[ÙÜÊŠˆ\™H™[]Y]\XØ[H™Y™\ˆÈ™XÛÜ™ÈÙˆ[™XYKZY[YšYY[˜ÚY[Ë˜]\ˆ[ˆHœ›ØY\ˆÜXÝ[HÙˆXÝ]š]Y\ÈÛÝ™\™YžH]Y]˜Z[Ë—ˆ
ˆ
ŠŠH]™[[Ûš]Üš[™ÊŠˆ\ÈH™X[][YH›ØÙ\ÜÈÙˆ˜XÚÚ[™ÈÞ\Ý[H]™[ËÚXÚX^H\ÙH]Y]˜Z[È]\È›ÝÞ[›Ûž[[Ý\ÈÚ]Z\ˆÛÛ\]H™XÛÜ™[™È[˜Ý[Û‹—ˆ
ˆ
ŠÊHÜ\˜][Û˜[\ÝÜžJŠˆ™Y™\œÈÈH™XÛÜ™[™ÈÙˆ[Ü\˜][ÛœÈÚ][ˆHÞ\Ý[K]XÚÜÈHÜXÚYšXÈÙXÝ\š]HÛÛ^[\XÚ][ˆ]Y]˜Z[Ëˆ‚ˆKˆLÎˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\ÜÙ\ÜÙ\ÈH\Ú[™\ÜÈÛÙØ\™H™[™Ü‹ˆH]Y\Ý[Û›˜Z\™HH™[™ÜˆÛÛ\]Y\È[\XØØX›H[™]ÈTÓÈÌHÙ\YšXØ][Ûˆ\È˜[Yˆ[ˆ[˜[\Ý›ÝXÙ\ËÝÙ]™\‹]H›ÙXÝ[X™YÈH^[Y[[Ù[H]™[ÜYžHHÛX[\™ÛÛ\[žKÚXÚ[ˆ\›ˆ\Ù\ÈHÜž\ÙÜ˜\XÈXœ˜\žHXZ[Z[™YžHHÚ[™ÛH›Û[Y\‹[™]™Z]\ˆ\È]™\ˆ™Y[ˆ\ÜÙ\ÜÙYˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\™\\Hš\ÚÈX[˜YÙ[Y[XÝ]š]HÚÝ[™HØ\œšYYÝ]È‹ˆÜ[ÛœÎˆÂˆJHÝ\HÚZ[ˆ[˜[\Ú\Ë\ÜÙ\ÜÚ[™ÈHÝ\Y\œÈ\Ý™X[HÙˆH\™XÝ™[™ÜˆÛÈ‹ˆŠHY\\ˆYH[YÙ[˜ÙHÛˆH\™XÝ™[™Üˆ[Û™K[˜ÛY[™È[ˆÛ‹\Ú]Hš\Ú]‹ˆÊHHÙ\šXÙH]™[YÜ™Y[Y[Ú]ÝšXÝ\ˆ[˜[Y\ÈYˆHÞ\Ý[H\È[˜]˜Z[X›H‹ˆ‘
HÛÛ[[Ý\È[Ûš]Üš[™ÈÙˆH\™XÝ™[™Ü‰ÜÈTÓÈÌHÙ\YšXØ][Û‹™\šYšYY[›X[H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÝ\HÚZ[ˆ[˜[\Ú\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ÜÙ\ÜÚ[™ÈH\™XÝ™[™Üˆ\È›Ý[›ÝYÚ™XØ]\ÙHHš\ÚÈ[ÝH[š\š]
Š™Ù\È›ÝÝÜÚ][JŠŽˆH›ÙXÝ[ÝH^HÛÛZ[œÈHÛÜšÈÙˆ]™\ž[Û™H\Ý™X[K[™XXÚÙˆ[H\È[ˆ[žHÚ[ˆHØÙ[˜\š[È[\Ý˜]\È\ÈÚ]H™YK[]™[ÚZ[ˆ[ˆÚXÚHY\\Ý]™[\È[ÛÈH[ÜÝœ˜YÚ[NˆHXœ˜\žHXZ[Z[™YžHÛ™H\œÛÛ‹Ú]›È™[X\ÙH›ØÙ\ÜÈ[™›ÈÝX\˜[YYÛÛ[Z]K[X™YY[ˆH^[Y[[Ù[H[X™YY[ˆH\Ú[™\ÜÈÞ\Ý[Kˆ
Š”Ý\HÚZ[ˆ[˜[\Ú\ÊŠˆ\ÈHXÝ]š]H]Û[XœÈ\ÙH]™[Îˆ]Y[YšY\È\Ý™X[HÝ\Y\œË\™\\HÛÙØ\™HÛÛ\Û™[È[™Z\ˆXZ[Z[™\œË[™\ÜÙ\ÜÙ\ÈXXÚÛ™IÜÈš\ÚÈ™[]]™HÈÚ]]ÝXÚ\ËˆHÛÛ˜Ü™]H[œÝ[Y[È\™HH
Š”Ð“ÓJŠˆ

œÛÙØ\™Hš[ÙˆX]\šX[ÊŠK\Ý[™È]™\žHÛÛ\Û™[ÙˆH›ÙXÝÛÛ˜XÝÛ]\Ù\ÈØ›YÚ[™ÈH™[™ÜˆÈ›ÝšYH][™È\ØÛÜÙHZ\ˆÝÛˆÝX˜ÛÛ˜XÝÜœË[™™\šYšXØ][ÛˆÙˆÜÙH\Y\ÉÈÛÛY]H[™ÛÛ[Z]KˆH\™XÝ™[™Ü‰ÜÈTÓÈÌHÙ\YšXØ]KÝÙ]™\ˆ˜[YÛÛ˜Ù\›œÈZ\ˆX[˜YÙ[Y[Þ\Ý[H[™Ø^\È›Ý[™ÈX›Ý]ÚÈY\È\\ˆ\Ý™X[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHY\\ˆYH[YÙ[˜ÙHÛˆH\™XÝ™[™ÜŽŠŠˆÛÚÜÈ\™\ˆ
Šš[ˆHÜ›Û™ÈXÙJŠ‹ˆH\™XÝ™[™Üˆ[™XYH\X\œÈÛÛY[™›Ý]™[ˆ[ˆÛ‹\Ú]Hš\Ú]ÛÝ[™]™X[Hš\ÚË™XØ]\ÙH]š\ÚÈÚ]È›Ý[ˆZ\ˆÙ™šXÙ\È][ˆH™\ÜÚ]ÜžHXZ[Z[™YžHHÝ˜[™Ù\‹—ˆ
ˆ
ŠÊHÓHÚ]ÝšXÝ\ˆ[˜[Y\ÎŠŠˆ\ÈH
Š˜ÛÛ˜XÝX[[™š[˜[˜ÚX[
Šˆ[œÝ[Y[ÛÛ\[œØ][™È›Üˆ[ˆÝ]YÙHY\ˆ]\[œËˆ]Ù\È›Ý™YXÙHHZÙ[ZÛÙÙˆHÛÛ\›ÛZ\ÙYXœ˜\žH[›ÙXÚ[™ÈX[XÚ[Ý\ÈÛÙK[™H[˜[HÙ\È›Ý™\Z\ˆH]Hœ™XXÚ—ˆ
ˆ
Š‘
H[Ûš]Üš[™ÈHÙ\YšXØ][ÛŽŠŠˆ\ÈÛÛÙÛ™ÛÚ[™Ë[[Ûš]Üš[™È˜XÝXÙK]]™\šYšY\È]H
Š™\™XÝ
Šˆ™[™ÜˆÝ^\ÈÛÛ\X[ˆ]ÛÝ™\œÈHØ[YH[™XYHÛ›ÝÛˆ[™X[H\š[Y]\‹X]š[™ÈÝ]™XÚ\Ù[HHÛÈ]™[È]Ú]™HØ]\ÙH›ÜˆÛÛ˜Ù\›‹——Šˆ
Š‘^[H˜\ŠŠˆ™[Y[X™\ˆ]\™\\Hš\ÚÈ\È
Šš[š\š]Y˜[œÚ]]™[JŠŽˆ[Ý\ˆÝ\Y\œÉÈÝ\Y\œÈ\™H[Ý\ˆÝ\Y\œÈÛË[™]\ÈÚHÝ\HÚZ[ˆ]XÚÜÈ\™HÛÈY™™XÝ]™KÚ[˜ÙH^HÝšZÙHÛ™HÙXZÈ[šÈÈ™XXÚX[žHÛÛY\™Ù]ËˆH[œÝ[Y[ÈÈÚ]H\™H[Ø^\ÈHØ[YNˆ
Š”Ð“ÓJŠ‹HÛÛ˜XÝX[]HÈ\ØÛÜÙHÝX˜ÛÛ˜XÝÜœË
ŠœšYÚÈ]Y]
Š‹ÛÙHÚYÛ˜]\™H™\šYšXØ][Ûˆ[™ÛÛ[Z]H\ÜÙ\ÜÛY[ÙˆÜš]XØ[ÛÛ\Û™[Ëˆ[™HÙ[™\˜[š[˜Ú\HÛÎˆXØÛÝ[Xš[]HÝØ\™[Ý\ˆÝÛˆÝ\ÝÛY\œÈ[™[Ý\ˆ™YÝ[]Üˆ
Š™Ù\È›Ý˜[œÙ™\ŠŠˆ[Û™ÈHÚZ[‹ˆ‹ˆKˆLÎNˆÂˆÜXÎˆ”\œÛÛ›™[ÙXÝ\š]H	ˆÛ˜›Ø\™[™È‹ˆØÙ[˜\š[Îˆ[ˆ]Y]š[™È]Ù]™\˜[›Ü›Y\ˆ[\ÞYY\È\™HÝ[X›HÈ]][XØ]HÈÛÜœÜ˜]HÞ\Ý[\È[ÛÈY\ˆZ\ˆ\ÝÛÜšÚ[™È^Kˆˆ[™U™]šY]ÈH^]›ØÙY\™HÙÙ]\ˆÈY[YžHHÝ\]™]™\ˆÙ]ÈØ\œšYYÝ]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È›ØÙY\™\È\È[™[Y[[\š[™ÈHÙ™˜›Ø\™[™È›ØÙ\ÜÈÈ[œÝ\™HHÙXÝ\š]HÙˆÜ™Ø[š^˜][Û˜[\ÜÙ]È[™]OÈ‹ˆÜ[ÛœÎˆÂˆJH›ÝšY[™È\\[™È[\ÞYY\ÈÚ]H\ÝÙˆ[[\›˜[Þ\Ý[\ÈÈ[˜ÛYH[ˆZ\ˆ™\Ý[YKˆ‹ˆŠH[ÝÚ[™ÈH\\[™È[\ÞYYHÈ]\›Z[™HÚXÚÛÜœÜ˜]H\ÜÙ]È^HÚ\ÚÈÙY\ˆ‹ˆÊH]š[™ÈH[\ÞYYH\ØÛÜYÙ™ˆHÛÛ\[žH™[Z\Ù\ÈžHHÙXÝ\š]HÝX\™ˆ‹ˆ‘
H\ØX›[™È\Ù\ˆXØÛÝ[Ëˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\ØX›[™È\Ù\ˆXØÛÝ[ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ØX›[™ÈH\Ù\ˆXØÛÝ[[™™[]Yš]š[YÙ\È[œÝ\™\È]\\[™È[\ÞYY\È›ÈÛ™Ù\ˆ]™HXØÙ\ÜÈÈÛÜœÜ˜]HÞ\Ý[\Ë[™]HÛÛ\[žHXZ[Z[œÈÛÛ›ÛÝ™\ˆH™XÙ\ÜØ\žHš[\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH[ÝÚ[™ÈH\\[™È[\ÞYYHÈXÚYHÚXÚÛÜœÜ˜]H\ÜÙ]ÈÈÙY\
ŠˆØ[ˆÜÙHHÚYÛšYšXØ[ÙXÝ\š]Hš\ÚÈ[™HÜÜÈÙˆ\ÜÙ]Ë—ˆ
ˆ
ŠÊH]š[™ÈH[\ÞYYH\ØÛÜYžHHÙXÝ\š]HÝX\™
ŠˆØ[ˆ™H\ÙY[[ˆÛÛYHØ\Ù\Ë]Ù\È›Ý™\™\Ù[H[™[Y[[\ÙˆHÙ™˜›Ø\™[™È›ØÙ\ÜÈœ›ÛHH]HÙXÝ\š]HÝ[™Ú[—ˆ
ˆ
ŠJH›ÝšY[™È\\[™È[\ÞYY\ÈÚ]H\ÝÙˆ[\›˜[Þ\Ý[\ÊŠˆÛÝ[ÛÛœÝ]]HHÙXÝ\š]Hš\ÚÈYˆ][™›Ü›X][Ûˆ[™Y\[ˆHÜ›Û™È[™ËˆÛÜœ™XÝÙ™˜›Ø\™[™È›ØÙY\™\Èš[Üš]^™HH›ÝXÝ[ÛˆÙˆ[\›˜[Þ\Ý[\È[™[™›Ü›X][Û‹ˆ‚ˆKˆMˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ’˜[X\š[Ë[ˆUÜXÚX[\Ý][Ûˆ˜Z[š[™Ë\È\ÚÙYÚ][œÝ\š[™È][\ÞYY\ÈÛÜšÚ[™Èœ›ÛHÛYHØ[ˆÙXÝ\™[HXØÙ\ÜÈHÛÜœÜ˜]H™]ÛÜšËˆH™XÛÛ[Y[™ÈH\ÙHÙˆ”œË][KY˜XÝÜˆ]][XØ][Ûˆ[™[˜Üž\YÛÛ[][šXØ][ÛœÈ›Üˆ[™[[ÝHÛÛ›™XÝ[ÛœËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆÛÜšÈ[š\›Û›Y[\È˜[X\š[ÈY™\ÜÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ[˜[^™Y‹ˆŠHÛÛX›Ü˜]]™H‹ˆÊH™[[ÝH‹ˆ‘
HXÙ[˜[^™Y‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH™[[ÝJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH™[[ÝHÛÜšÈ[š\›Û›Y[\ÈÛ™H[ˆÚXÚ[\ÞYY\ÈÛÜšÈœ›ÛH™[[ÝHØØ][ÛœË\ÝX[Hœ›ÛHÛYK™\]Z\š[™ÈÜXÚYšXÈÙXÝ\š]HYX\Ý\™\ÈÈ[œÝ\™HÙXÝ\™HXØÙ\ÜÈÈÛÜœÜ˜]H™\ÛÝ\˜Ù\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHHÛÛX›Ü˜]]™H[š\›Û›Y[
Šˆ\ÈÙ]\š[Üš]^š[™ÈÛÛX›Ü˜][Ûˆ[[Û™ÈX[\ËÙ[ˆÚ]Ü[ˆÜXÙ\È[™Ú\™Y›Ú™XÝ\™X\Ë]\È›Ý›ØÝ\ÙYÛˆHÙ[ÙÜ˜\XÈØØ][ÛˆÙˆHÛÜšÙ\œË—ˆ
ˆ
ŠJHHÙ[˜[^™YÛÜšÈ[š\›Û›Y[
Šˆ\ÈH˜Y][Û˜[ÛÛ™šYÝ\˜][Ûˆ[ˆÚXÚ[[\ÞYY\ÈÛÜšÈœ›ÛHHÚ[™ÛH\ÚXØ[ØØ][Û‹—ˆ
ˆ
Š‘
HHXÙ[˜[^™YÛÜšÈ[š\›Û›Y[
Šˆ\ÈHÞ\Ý[H[ˆÚXÚ˜\š[Ý\È\\Y[ÈÜˆX[\ÈÛÜšÈœ›ÛHÙ\\˜]H[™[™\[™[ØØ][ÛœË]›Ý™XÙ\ÜØ\š[Hœ›ÛHÛYKˆ‚ˆKˆMNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ’˜[X\š[ËHÞX™\œÙXÝ\š]HÜXÚX[\Ý]Ù[H[››Ý˜][ÛœÈËØ[ÈÈ]˜[X]HÝÈ[\ÞYY\È™XXÝÈÛØÚX[[™Ú[™Y\š[™È][\ËˆHÙ[™ÈÚ[][]Y[XZ[ÈÈ[[\ÞYY\ÈÈÙYHÚÈ™\ÜÛ™ÈÈ[Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È‘TÕ\ØÜšX™\È˜[X\š[ÉÜÈ[š]X]]™OÈ‹ˆÜ[ÛœÎˆÂˆJHÜX\ˆ\Ú[™È
]XÚÈZ[YY]Û™HÜXÚYšXÈ[™]šYX[
H‹ˆŠHÚ[[™È
]XÚÈZ[YY]HÜ^XÝ]]™JH‹ˆÊHš\Ú[™È
\Ú[™ÈØ\œšYYÝ]Ý™\ˆHÛ™JH‹ˆ‘
H\Ú[™ÈØ[\ZYÛˆ
[ÈÙ[™ÈHÜ›Ý\Ùˆ\Ù\œÊH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H\Ú[™ÈØ[\ZYÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH\Ú[™ÈØ[\ZYÛˆ\ÈHÝXÝ\™Y][\Ù[ˆ\ÙY\ÈH˜Z[š[™ÈÜˆ]˜[X][ÛˆÛÛÚ][ˆÜ™Ø[š^˜][ÛœËÈÚ[][]H™X[\Ú[™È™X]È[™YX\Ý\™HÝÈ[™]šYX[È™\ÜÛ™—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÜX\ˆ\Ú[™ÊŠˆ\ÈH\™Ù]Y\Ú[™È][\\™XÝY]ÜXÚYšXÈ[™]šYX[ÈÜˆÛÛ\[šY\Ëˆ[ˆ\ÈØ\ÙK˜[X\š[ÈÙ[H[XZ[È[[\ÞYY\Ë—ˆ
ˆ
ŠŠHÚ[[™ÊŠˆÛÛœÚ\ÝÈÙˆYÚ[]™[\Ú[™È]XÚÜÈ\™Ù][™ÈÙ[š[Üˆ^XÝ]]™\È[™Ý\ˆYÚ\›Ùš[H\™Ù]Ëˆ[ˆ\ÈØ\ÙK˜[X\š[ÈÙ[H[XZ[È[[\ÞYY\Ë—ˆ
ˆ
ŠÊHš\Ú[™È
›ÚXÙH\Ú[™ÊJŠˆ\È[ˆ]XÚÈ]ØØÝ\œÈšXHÛ™KÙ[ˆžH]XÚÙ\œÈÜÚ[™È\È\ÝY[]Y\Ëˆ[ˆ\ÈØ\ÙK˜[X\š[ÈÙ[[XZ[Ëˆ‚ˆKˆMŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ’[ˆ]È[\›˜[[\ÈHÛÛ\[žHÙ]ÈH˜[YH™^[Û™ÚXÚHš\ÚÈØ[ˆ›ÈÛ™Ù\ˆÚ[\H™H™XÛÜ™Y[™Ø]ÚY]šYÙÙ\œÈ[ˆØ›YØ][ÛˆÈXÝˆ™[ÝÈ]˜[YHHš\ÚÈ\ÈXØÙ\YÚ]›È\\ˆXÝ[Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È™Y™\œÈÈH™YYš[™Y]™[Ùˆš\ÚÈ][ˆÜ™Ø[š^˜][Ûˆ\ÈÚ[[™ÈÈXØÙ\™Y›Ü™HZÚ[™ÈXÝ[ÛÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ[Z]‹ˆŠHš\ÚÈ]™[‹ˆÊHš\ÚÈ™\ÚÛ‹ˆ‘
Hš\ÚÈÛ\˜[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHš\ÚÈ™\ÚÛ
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHš\ÚÈ™\ÚÛ\ÈHXØÙ\X›Hš\ÚÈ[Z]][ˆÜ™Ø[š^˜][Ûˆ\ÝX›\Ú\È[™ÚXÚÛ˜ÙH^ÙYYYšYÙÙ\œÈH™\ÜÛœÙHÈœš[™ÈHš\ÚÈ˜XÚÈÈ[ˆXØÙ\X›H]™[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ[Z]
Šˆ\È›ÝH\›HÛÛ[[Û›H\ÙYÚ][ˆš\ÚÈX[˜YÙ[Y[ÈYš[™HH™YYš[™Y]™[ÙˆXØÙ\X›Hš\ÚË—ˆ
ˆ
Š‘
Hš\ÚÈÛ\˜[˜ÙJŠˆ™Y™\œÈ[Ü™Hœ›ØYHÈHÚ[[™Û™\ÜÈÙˆ[ˆÜ™Ø[š^˜][ÛˆÜˆ[ˆ[™]šYX[ÈZÙHÛˆš\ÚË›ÝÈHÜXÚYšXÈ™YYš[™Y]™[]šYÙÙ\œÈ[ˆXÝ[Û‹—ˆ
ˆ
ŠŠHš\ÚÈ]™[
Šˆ™Y™\œÈÈHÙ]™\š]HÜˆYÚÛÝÈ˜[šÚ[™ÈÙˆHš\ÚË›ÝÈH™YYš[™Y]™[ÙˆXØÙ\[˜ÙKˆ‚ˆKˆMÎˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ”š]™\‹H›Ú™XÝX[˜YÙ\ˆ]HXÚ›ÛÙÞHÛÛ\[žK]\ÝÚ\ÛÙØ\™H]Ù\È›ÝYY]H™\]Z\™[Y[ÙˆH[\›˜[[˜Üž\[ÛˆÝ[™\™ˆH\™\\HXœ˜\žH›Ü˜Ù\ÈHÙXZÙ\ˆ[ÛÜš]H[ˆHÛ™HX[™]Y[™H™[™Üˆ\È[››Ý[˜ÙYÛÛ\X[˜ÙH[ˆZYÚ[ÛËˆ›ØÚÚ[™ÈH™[X\ÙHÛÝ[œ™XZÈHÛÛ˜XÝX[ÛÛ[Z]Y[ˆš]™\ˆØÝ[Y[ÈH]šX][Û‹H˜][Û˜[H[™HY][Û˜[ÛÛ›ÛÈYÜY\È]\›Ý™YžHHš\ÚÈÝÛ™\‹[™\ÜÚYÛœÈ]H™]šY]È]Kˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHš\ÚÈX[˜YÙ[Y[[œÝ[Y[š]™\ˆ\È\Ý\ÙYØ[YÈ‹ˆÜ[ÛœÎˆÂˆJHHš\ÚÈ˜[œÙ™\ˆÝØ\™H\™\\HXœ˜\žH™[™Üˆ‹ˆŠHH\Ú[™\ÜÈ[\XÝ[˜[\Ú\Ë]X[YžZ[™ÈHY™™XÝÙˆH]šX][Ûˆ‹ˆÊHHš\ÚÈ]›ÚY[˜ÙKÚ[˜ÙHH™[X\ÙH›ØÙYYÈÚ]^˜HÛÛ›ÛÈ‹ˆ‘
H[ˆ^Ù\[ÛˆÈH™\]Z\™[Y[Ú]›Ü›X[š\ÚÈXØÙ\[˜ÙH[™[ˆ^\žH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[ˆ^Ù\[ÛˆÈH™\]Z\™[Y[Ú]›Ü›X[š\ÚÈXØÙ\[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÚ[ˆHÙXÝ\š]H™\]Z\™[Y[Ø[››Ý™HY][™H]šX][Ûˆ\È[X™\˜]KHÛÜœ™XÝ[œÝ[Y[\È[ˆ
Š™^Ù\[ÛŠŠ‹]\ËH
Š™›Ü›X[\ÝYšYY\›Ý™Y[™[YKX›Ý[™
Šˆ\›ÙØ][Û‹ˆ]\È[ˆ^Ù\[Ûˆ[™›Ý[ˆ
Š™^[\[ÛŠŠˆ›Üˆ^XÝH]™X\ÛÛŽˆH\›ÙØ][ÛˆÛÝ™\œÈH˜\œ›ÝÈØ\ÙH[™Ø\œšY\È[ˆ^\žHYYÈH™[™Ü‰ÜÈ™[YYX][Û‹Ú\™X\È[ˆ^[\[Ûˆ\ÈH\Ý[™ËÝXÝ\˜[\›ÙØ][ÛˆÜ˜[YÈHÞ\Ý[H]Ø[››Ý™Hœ›ÝYÚ[ÈÛÛ\X[˜ÙH›ÜˆHÛ™È[YKˆ[›Ý\ˆ]šX]\È\X\ˆ[ˆHØÙ[˜\š[È[™›Û™H\ÈXÛÜ˜]]™KˆH]šX][Ûˆ\È
Š™ØÝ[Y[Y
Š‹ÛÈ]™XÛÛY\Èš\ÚX›H[ˆHš\ÚÈ™YÚ\Ý\ˆ[œÝXYÙˆ™[XZ[š[™ÈH˜XÝÛ›ÝÛˆÈ™YH[ÜKˆ]\È
Šš\ÝYšYY
Š‹Ú]HXÚšXØ[ÛÛœÝ˜Z[[™H™[™Ü‰ÜÈ™[YYX][Ûˆ]H][ˆÜš][™Ëˆ]\È
Š˜\›Ý™YžHHš\ÚÈÝÛ™\ŠŠ‹YX[š[™ÈÚÙ]™\ˆ\ÈH]]Üš]HÈØ\œžH]›ÝHX[H[ˆH\œžHÈÚ\ˆ[™]\È
Š[YKX›Ý[™
Š‹Ú]HØÚY[Y™]šY]Îˆ]\ÈÚ]ÝÜÈH[\Ü˜\žH\›ÙØ][Ûˆ™XÛÛZ[™Ë\È][[ÜÝ[Ø^\ÈÙ\ÈÚ]Ý][ˆ^\žKH\›X[™[Ý]HÙˆY™˜Z\œË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ˜[œÙ™\ŽŠŠˆÛÝ[ÚYH
Š™š[˜[˜ÚX[\™[ŠŠˆÙˆ\›HÈH\™\K\XØ[HšXHHÛXÞHÜˆÛÛ˜XÝÛ]\ÙKˆ›Ý[™ÈÙˆHÛÜØ\È\œ˜[™ÙY\™NˆH˜XÝ]HXÚšXØ[Ø]\ÙHY\È[ˆÛÛY[Û™H[ÙIÜÈXœ˜\žHÙ\È›Ý[Ý™Hš]™\‰ÜÈXØÛÝ[Xš[]HÝØ\™Z\ˆÝÛˆÝ\ÝÛY\œÈžH[ˆ[˜Ú—ˆ
ˆ
ŠŠH\Ú[™\ÜÈ[\XÝ[˜[\Ú\ÎŠŠˆ\ÈH[˜[\Ú\È\ÝX›\Ú[™ÈÝÈ]XÚH\Ü\[ÛˆÛÝ[\›H\Ú[™\ÜÈ›ØÙ\ÜÙ\Ëœ›ÛHÚXÚY]šXÜÈÝXÚ\È•È[™”È\š]™Kˆ]^\ÝÈÈ
Š›YX\Ý\™JŠˆ[ˆ[\XÝ›ÝÈ
Š˜]]Üš\ÙJŠˆH]šX][Ûˆœ›ÛHHÝ[™\™—ˆ
ˆ
ŠÊHš\ÚÈ]›ÚY[˜ÙNŠŠˆYX[œÈ
Š››ÝÚ[™ÊŠˆHš\ÚÞHXÝ]š]KÛÈ[ˆ\ÈØ\ÙH›ÝÚ\[™È[[HXœ˜\žH\Èš^Yˆ]\ÈHÜÜÚ]HÙˆÚ]Ø\ÈXÚYYˆH™[X\ÙHÛÙ\ÈZXY——Šˆ
Š‘^[H˜\ŠŠˆÙY\\\™YH\›\È^[H]Y\Ý[ÛœÈZÙHÈXÙHÚYHžHÚYKˆ
Š”š\ÚÈXØÙ\[˜ÙJŠˆHHÛÛœØÚ[Ý\ÈXÚ\Ú[ÛˆÈ]™HÚ]Hš\ÚËÚ]›ÈY][Û˜[ÛÛ›ÛÈ0­È
Š‘^Ù\[ÛˆÜˆ^[\[ÛŠŠˆHH›Ü›X[[YKX›Ý[™\›ÙØ][Ûˆœ›ÛHH™\]Z\™[Y[™\]Z\š[™È\›Ý˜[[™™]šY]È0­È
Š”™\ÚYX[š\ÚÊŠˆHÚ]™[XZ[œÈY\ˆÛÛ›ÛÈ\™H\YY[™ÚXÚ]\Ý]Ù[ˆ™H›Ü›X[HXØÙ\YˆHÚYÛ˜[\Ý[™ÝZ\Ú[™ÈHX[˜YÙY^Ù\[Ûˆœ›ÛHHZ[ˆš[Û][Ûˆ\È[Ø^\ÈHØ[YNˆ
Šœš\ÚÈÝÛ™\ˆ\›Ý˜[[™[ˆ^\žH]JŠ‹ˆÚ]Ý]ÜÙHÛÈ[[Y[È]\È›Ý[ˆ^Ù\[Û‹]\ÈHØÝ[Y[Yœ™XXÚÙˆÛXÞKˆ‹ˆKˆMˆÂˆÜXÎˆ•\™T\Hš\ÚÈ	ˆ\ÜÙ\ÜÛY[È‹ˆØÙ[˜\š[Îˆ™Y›Ü™HÚYÛš[™ÈÚ]HÛÛ\[žH]Ú[ÜÝHØÝ[Y[\˜Ú]™KHÙXÝ\š]HX[˜YÙ\ˆØ[ÈÈ^[Z[™H]ÈÛÛ›ÛËÙ\YšXØ][ÛœÈ[™Û›ÝÛˆÙXZÛ™\ÜÙ\ËÛÈ\ÈÈXÚYHÛˆ[ˆ[™›Ü›YY˜\Ú\ÈÚ]\ˆÈ[\Ý]Ú]ÛÜœÜ˜]H]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆ\ÜÙ\ÜÛY[ÚÝ[[ÝH\™›Ü›HÈ^[Z[™HHÙXÝ\š]HYX\Ý\™\È[™[™\˜Xš[]Y\ÈÙˆHÛÛ\[žH]›ÝšY\ÈÛÛÙÈÜˆÙ\šXÙ\ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÝ][Y[ÙˆÛÜšÈ‹ˆŠH™[™Üˆ[Ûš]Üš[™È‹ˆÊH™[™ÜˆÙ[XÝ[Ûˆ‹ˆ‘
H™[™Üˆ\ÜÙ\ÜÛY[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H™[™Üˆ\ÜÙ\ÜÛY[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH™[™Üˆ\ÜÙ\ÜÛY[[›Û™\È^[Z[š[™ÈHÙXÝ\š]HYX\Ý\™\È[™[™\˜Xš[]Y\ÈÙˆH™[™Ü‰ÜÈÞ\Ý[\È[™[™œ˜\ÝXÝ\™KÈ[œÝ\™H]^HYY]HÜ™Ø[š^˜][Û‰ÜÈÙXÝ\š]H™\]Z\™[Y[Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHHÝ][Y[ÙˆÛÜšÈ
ÓÕÊJŠˆYš[™\ÈH^XÝ][ÛœÈ™YØ\™[™ÈHÛÜšÈÈ™HÛÛ\]YžHH\™\K]›Ü›X[HÙ\È›Ý[˜ÛYH[ˆ\ÜÙ\ÜÛY[ÙˆH™[™Ü‰ÜÈÝÛˆ[™\˜Xš[]Y\È[™ÙXÝ\š]HYX\Ý\™\Ë—ˆ
ˆ
ŠÊH™[™ÜˆÙ[XÝ[ÛŠŠˆ\ÈH›ØÙ\ÜÈÙˆÚÛÜÚ[™ÈH™[™Üˆ˜\ÙYÛˆ˜\š[Ý\ÈÜš]\šXK]Ù\È›Ý›ØÝ\ÈÜXÚYšXØ[HÛˆ]˜[X][™ÈÙXÝ\š]HYX\Ý\™\È[™[™\˜Xš[]Y\Ë—ˆ
ˆ
ŠŠH™[™Üˆ[Ûš]Üš[™ÊŠˆ[›Û™\ÈHÛ™ÛÚ[™È]˜[X][Ûˆ[™Ý\\š\Ú[ÛˆÙˆH™[™Ü‰ÜÈ\™›Ü›X[˜ÙK[˜ÛY[™È]ÈÙXÝ\š]H˜XÝXÙ\Ë›ÝYÚÝ]H\˜][ÛˆÙˆHÛÛ[Y\˜ÚX[™[][ÛœÚ\]\È›ÝÜXÚYšXØ[H›ØÝ\ÙYÛˆH[š]X[\ÜÙ\ÜÛY[ÙˆÙXÝ\š]HYX\Ý\™\È[™[™\˜Xš[]Y\Ëˆ‚ˆKˆMNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ”Ý\Ø[‹[ˆ[\ÞYYH][Ûˆ˜Z[š[™Ë™XÙZ]™\È[ˆ[XZ[œ›ÛH[ˆ\\™[H˜[Z[X\ˆÙ[™\‹ˆH[XZ[\ÚÜÈ\ˆÈÛXÚÈÛˆH[šÈÈ™\Ù]\ˆ\ÜÝÛÜ™YHÈ	Ý[\ÝX[XÝ]š]IËˆÚHš[™È]Ý˜[™ÙHÚ[˜ÙHÚHY›Ý™\]Y\Ý[žH\ÜÝÛÜ™™\Ù]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈXÝ[ÛœÈÚÝ[Ý\Ø[ˆZÙOÈ‹ˆÜ[ÛœÎˆÂˆJH›ÜØ\™H[XZ[ÈÛÛXYÝY\ÈÈÚXÚÈÚ]\ˆ^H™XÙZ]™YHÚ[Z[\ˆÛ™Kˆ‹ˆŠH™\ÜH[XZ[ÈHU\\Y[ˆ‹ˆÊHÛXÚÈÛˆH[šÈÈ™\šYžH]È]][XÚ]Kˆ‹ˆ‘
HYÛ›Ü™H[™[]HH[XZ[ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH™\ÜH[XZ[ÈHU\\Y[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÝ\Ø[ˆ\ÈY[YšYYHÝ[X[™X][™›Û\H[\YH™[]˜[\œÛÛ›™[Ú][ˆ\ˆÜ™Ø[š^˜][Û‹ˆ[ÝYÚYÛ›Üš[™ÈH[XZ[X^H™]™[[[YYX]H\›K™\Ü[™È][ÈHÜ™Ø[š^˜][ÛˆY[YžH[™Y™\ÜÈÝ[X[ÙXÝ\š]H™X]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÚ\š[™ÈH[XZ[\\ŠŠˆØ[ˆ^ÜÙH[Ü™H[ÜHÈÝ[X[™X]Ë—ˆ
ˆ
ŠÊHÛXÚÚ[™ÈÛˆH[šÈÈ™\šYžH]È]][XÚ]JŠˆÛÝ[^ÜÙH\ˆÈX[Ø\™HÜˆ\Ú[™ÈÚ]\È[™\È›ÝH™XÛÛ[Y[™YXÝ[Û‹—ˆ
ˆ
Š‘
HYÛ›Üš[™È[™[][™ÈH[XZ[
Šˆ™]™[È[[YYX]H\›H]Ù\È›Ý[HÜ™Ø[š^˜][ÛˆY[YžH[™Y™\ÜÈHÝ[X[™X][›ZÙH™\Ü[™Ëˆ‚ˆKˆMŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÞX™\œÙXÝ\š]H^\Ø]YÛÜš^™\ÈHÜÜÚXš[]HÙˆH]Hœ™XXÚ\È	ÚYÚ	ÈYHÈ™XÙ[Ú[Z[\ˆ[˜ÚY[È[ˆHÙXÝÜ‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈ\ÜÙ\ÜÛY[\›H\ÈH^\\Ú[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHQˆ‹ˆŠHš\ÚÈ˜][™È‹ˆÊHÛÛ™šY[˜ÙH]™[‹ˆ‘
HZÙ[ZÛÙ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HZÙ[ZÛÙ
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆZÙ[ZÛÙ\È\ÙY[ˆ]X[]]]™Hš\ÚÈ[˜[\Ú\ÈÈÝXš™XÝ]™[H\ØÜšX™HÝÈ›Ø˜X›HHš\ÚÈ]™[\ËÙ[ˆ^™\ÜÙYÚ]\›\ÈÝXÚ\È	ÛÝÉË	ÛYY][IÈÜˆ	ÚYÚ	Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHHÛÛ™šY[˜ÙH]™[
ŠˆÛÝ[[™›Y[˜ÙHH\ÙHÙˆH\›H	ÚYÚ	È[ˆY™™\™[ÛÛ^Ë]Ù\È›ÝÜXÚYšXØ[H™Y™\ˆÈH]X[]]]™HYX\Ý\™HÙˆš\ÚÈ›Ø˜Xš[]K—ˆ
ˆ
ŠŠHHš\ÚÈ˜][™ÊŠˆ[˜ÛÜœÜ˜]\È›Ý›Ø˜Xš[]H[™[\XÝÈ›ÝšYH[ˆÝ™\˜[ØÛÜ™HÈHš\ÚË]\È›ÝH\›H\ÙYÈ^™\ÜÈÛÛ[HH›Ø˜Xš[]HÙˆØØÝ\œ™[˜ÙK—ˆ
ˆ
ŠJHH^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ\ÈHœ˜XÝ[ÛˆÙˆ[ˆ\ÜÙ]	ÜÈ˜[YH]š\ÚÈ[ˆH]™[ÙˆHÙXÝ\š]H[˜ÚY[ˆ‚ˆKˆMÎˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆHš[˜[˜ÚX[Ù\šXÙ\ÈÛÛ\[žH\È™\]Z\™YÈ™YÝ[\›HÝX›Z]ØÝ[Y[][Ûˆ[[ÛœÝ˜][™ÈY\™[˜ÙHÈ™YÝ[]ÜžHÙXÝ\š]HÝ[™\™Ëˆ\ÈØÝ[Y[][Ûˆ[˜ÛY\È]Y]™\Ý[Ëš\ÚÈ\ÜÙ\ÜÛY[È[™]šY[˜ÙHÙˆ]H›ÝXÝ[ÛˆYX\Ý\™\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\È\È›ØÙ\ÜÈØ[YÈ‹ˆÜ[ÛœÎˆÂˆJHÛÛ\X[˜ÙH™\Ü[™È‹ˆŠH[˜ÚY[™\ÜÛœÙH‹ˆÊHš\ÚÈX[˜YÙ[Y[‹ˆ‘
HÛÛ™šYÝ\˜][ÛˆX[˜YÙ[Y[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÛÛ\X[˜ÙH™\Ü[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÛÛ\X[˜ÙH™\Ü[™È[›Û™\ÈÝX›Z][™ÈØÝ[Y[][Ûˆ][[ÛœÝ˜]\È[ˆÜ™Ø[š^˜][Û‰ÜÈY\™[˜ÙHÈ™YÝ[]ÜžHÜˆ[™\ÝžHÝ[™\™Ëˆ\È›ØÙ\ÜÈ[œÝ\™\È]H™\]Z\™YÙXÝ\š]H˜XÝXÙ\È\™H›ÛÝÙY[™]HÜ™Ø[š^˜][Ûˆ™[XZ[œÈ[ˆÛÛÙÝ[™[™ÈÚ]™YÝ[]ÜžH›ÙY\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHš\ÚÈX[˜YÙ[Y[
Šˆ[˜ÛÛ\\ÜÙ\ÈH[\™H›ØÙ\ÜÈÙˆY[YžZ[™Ë[˜[^š[™È[™™X][™Èš\ÚÜË›Ý\ÝHØÝ[Y[\žHÝX›Z\ÜÚ[ÛˆÙˆÛÛ\X[˜ÙK—ˆ
ˆ
ŠŠH[˜ÚY[™\ÜÛœÙJŠˆÛÛ˜Ù\›œÈHX[˜YÙ[Y[ÙˆÙXÝ\š]H[˜ÚY[È]]™H[™XYHØØÝ\œ™Y—ˆ
ˆ
Š‘
HÛÛ™šYÝ\˜][ÛˆX[˜YÙ[Y[
ŠˆÛÛ˜Ù\›œÈHÛÛ›ÛÙˆÚ[™Ù\ÈÈUÞ\Ý[\Ë›ÝH™\Ü[™ÈÙˆ™YÝ[]ÜžHÛÛ\X[˜ÙKˆ‚ˆKˆMˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ’[ˆHÛÛ\[žIÜÈš\ÚÈ™YÚ\Ý\ˆXXÚ[žH\ÈÛÈÛÛ[[œÈÈš[[ŽˆÝÈZÙ[HH]™[\ÈÈØØÝ\‹[™ÝÈ]XÚÜ\˜][Û˜[š[˜[˜ÚX[[™™\]][Û˜[[XYÙH]ÛÝ[Ø]\ÙHYˆ]YˆHš\ÚÈX[˜YÙ\ˆ\ÈÙ][™ÈÛˆHÛÜœ™XÝ˜[YH›ÜˆHÙXÛÛ™ÛÛ[[‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\ÈHÝ[™\™\›H\ÙY[ˆš\ÚÈX[˜YÙ[Y[È\ØÜšX™HHY™™XÝÙˆHš\ÚÈ]™[Ûˆ[ˆÜ™Ø[š^˜][Û‹\XÝ[\›H[ˆ\›\ÈÙˆÜ\˜][Û˜[š[˜[˜ÚX[[™™\]][Û˜[[XYÙOÈ‹ˆÜ[ÛœÎˆÂˆJHQˆ‹ˆŠH[\XÝ‹ˆÊH[XYÙH›ÜÜ[Ûˆ‹ˆ‘
HT“È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[\XÝ
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[\XÝ™Y™\œÈÈHÛÛœÙ\]Y[˜Ù\È]Hš\ÚÈ]™[\ÈÛˆ[ˆÜ™Ø[š^˜][Û‹Y™™XÝ[™È˜\š[Ý\È\™X\ÈÝXÚ\ÈÜ\˜][ÛœËš[˜[˜ÙH[™™\]][Û‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊH	Ñ[XYÙH›ÜÜ[Û‰ÊŠˆÛÝ[™H\ÙY[™›Ü›X[HÈ\ØÜšX™HHÛÛ˜Ù\Ú[Z[\ˆÈHQ‹]\È›ÝHÝ[™\™\›H\ÙY[ˆš\ÚÈ\ÜÙ\ÜÛY[—ˆ
ˆ
ŠJHH^ÜÝ\™H˜XÝÜˆ
QŠJŠˆ\ÈHœ˜XÝ[ÛˆÙˆ[ˆ\ÜÙ]	ÜÈ˜[YH]š\ÚÈ[ˆH]™[ÙˆHÙXÝ\š]H[˜ÚY[—ˆ
ˆ
Š‘
HHT“ÊŠˆ]X[YšY\ÈH^XÝYœ™\]Y[˜ÞHÙˆHš\ÚÈØØÝ\œš[™ÈÝ™\ˆHÛ™K^YX\ˆ[YHÜ[‹ˆ‚ˆKˆMNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ”šXÛÈš[˜[˜ÚX[È\È[\[Y[YHÙXÝ\š]H]Ø\™[™\ÜÈ›ÙÜ˜[Kˆ[ˆH™XÙ[\ÜÛÛ‹[\ÞYY\ÈX\›™YX›Ý]Hš\ÚÜÈ\ÜÛØÚX]YÚ]X[XÚ[Ý\È[\ÞYY\È[™Ú[Z[\ˆ™X]Ëˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]\ÈHØš™XÝ]™HÙˆ\È\ÜÛÛÈ‹ˆÜ[ÛœÎˆÂˆJH\Ú[™È‹ˆŠH™\Ü[™È[™[Ûš]Üš[™È‹ˆÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][Ûˆ‹ˆ‘
H[œÚY\ˆ™X]‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
H[œÚY\ˆ™X]
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[œÚY\ˆ™X]]Ø\™[™\ÜÈ[›Û™\ÈYXØ][™È[\ÞYY\ÈX›Ý]Hš\ÚÜÈÜÙYžH[ÜH[œÚYHHÜ™Ø[š^˜][ÛˆÚÈÛÝ[[[[Û˜[HÜˆ[š[[[Û˜[H\›HHÛÛ\[žKˆ\È˜XÝXÙH[È[\ÞYY\ÈY[YžHÚYÛœÈÙˆÝ[X[X[XÚ[Ý\È™Z]š[ÜˆÚ][ˆZ\ˆÝÛˆ˜[šÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH\Ú[™ÈØ[\ZYÛœÊŠˆ\™H\ÚYÛ™YÈ\Ý[\ÞYY\ÉÈXš[]HÈ™XÛÙÛš^™H[™™\ÜÛ™È\Ú[™È][\Ë]È›Ý›ØÝ\ÈÜXÚYšXØ[HÛˆ[œÚY\ˆ™X]Ë—ˆ
ˆ
ŠÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][ÛŠŠˆÛÛ˜Ù\›œÈ™XÛÙÛš^š[™È[\ÝX[XÝ[ÛœÈ]X^H[™XØ]HÙXÝ\š]H™X]Ë]Ù\È›Ý›ØÝ\ÈÜXÚYšXØ[HÛˆYXØ][™È[\ÞYY\ÈX›Ý][œÚY\ˆ™X]Ë—ˆ
ˆ
ŠŠH™\Ü[™È[™[Ûš]Üš[™ÊŠˆ\™HÜXÚX[ÙXÝ\š]H]Ø\™[™\ÜÈ˜XÝXÙ\Ë]›ØÝ\ÈXZ[›HÛˆHÙ[™\˜[ÙXÝ\š]HÜÝ\™H[™[˜ÚY[]XÝ[Û‹›ÝÜXÚYšXØ[HÛˆ[œÚY\ˆ™X]ÈÝXÚ\ÈX[XÚ[Ý\È[\ÞYY\Ëˆ‚ˆKˆMLˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\ØÛÝ™\œÈ]Y™™\™[\\Y[È]™H[™\[™[HYÜYY™™\™[[ÛÜš]\È[™Ù^H[™ÝÈÈ›ÝXÝ]H^Ú[™ÙYÝ™\ˆH™]ÛÜšËˆX[˜YÙ[Y[Ø[ÈHÚ[™ÛKš[™[™ÈØÝ[Y[Ù][™ÈÝ]ÚXÚ[ÛÜš]\È[™›ÝØÛÛÈ\™H[ÝÙY[™ÚXÚ\™H›Ü˜šY[‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÝ[™\™Yš[™\ÈHY]ÙÈ[™›ÝØÛÛÈ\ÙYÈÛÛ›ÛH[ÛÜš]\È][™H]H[ˆ˜[œÚ]È‹ˆÜ[ÛœÎˆÂˆJH\ÚXØ[ÙXÝ\š]HÝ[™\™‹ˆŠH[˜Üž\[ÛˆÝ[™\™‹ˆÊHXØÙ\ÜÈÛÛ›ÛÝ[™\™‹ˆ‘
H\ÜÝÛÜ™Ý[™\™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH[˜Üž\[ÛˆÝ[™\™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH[˜Üž\[ÛˆÝ[™\™Yš[™\ÈHY]ÙÈ[™›ÝØÛÛÈ›Üˆ[˜Üž\[™ÈÙ[œÚ]]™H]H[ˆÜ™\ˆÈ›ÝXÝ]œ›ÛH[˜]]Üš^™YXØÙ\ÜËˆ[˜Üž\[Ûˆ˜[œÙ›Ü›\È]H[È[ˆ[œ™XYX›H›Ü›X]\Ú[™ÈÜž\ÙÜ˜\XÈ[ÛÜš]\ËXÚ\\˜X›HÛ›HÚ]H\›ÜšX]HÙ^Kˆ\ÙHÝ[™\™È\™H\ÙYÈ›ÝXÝ]H[ˆ˜[œÚ]—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHHXØÙ\ÜÈÛÛ›ÛÝ[™\™
ŠˆYš[™\ÈH[\È[™›ØÙY\™\È›ÜˆX[˜YÚ[™È\Ù\ˆXØÙ\ÜÈÈÞ\Ý[\Ë\XØ][ÛœÈ[™]K—ˆ
ˆ
Š‘
HH\ÜÝÛÜ™Ý[™\™
ŠˆÝ][™\ÈH™\]Z\™[Y[È[™™\Ý˜XÝXÙ\È›ÜˆÜ™X][™È[™X[˜YÚ[™È\ÜÝÛÜ™Ë—ˆ
ˆ
ŠJHH\ÚXØ[ÙXÝ\š]HÝ[™\™
ŠˆÝ][™\ÈHYX\Ý\™\ÈÈ›ÝXÝ\ÚXØ[\ÜÙ]Ë˜XÚ[]Y\È[™\]Z\Y[œ›ÛH[˜]]Üš^™YXØÙ\ÜËY[™[XYÙKˆ‚ˆKˆMLNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[Îˆ’Üš^›ÛˆÙXÝ\š]KHÞX™\œÙXÝ\š]H˜Z[š[™ÈÛÛ\[žK\ÈÝY™™\™YH]Hœ™XXÚYHÈH™[™Ü‰ÜÈ™YÛYÙ[˜ÙKˆ\Èœ™XXÚ™\Ý[Y[ˆHÚYÛšYšXØ[ÜÜÈÙˆÙ[œÚ]]™HÝ\ÝÛY\ˆ[™›Ü›X][Û‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆÛÛœÙ\]Y[˜ÙH\ÈÜš^›Ûˆ[ÜÝZÙ[HÈ˜XÙH[[YYX][OÈ‹ˆÜ[ÛœÎˆÂˆJH™\]][Û˜[[XYÙH‹ˆŠHØ[˜Ý[ÛœÈ‹ˆÊHÜÜÈÙˆXÙ[œÙH‹ˆ‘
Hš[™\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH™\]][Û˜[[XYÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ™\]][Û˜[[XYÙH™Y™\œÈÈHÝ[X[\›HÜˆ™YØ]]™H[\XÝÛˆÜš^›Û‰ÜÈ™\]][ÛˆYHÈH˜Z[\™HÈÛÛ\HÚ]]H›ÝXÝ[Ûˆ™YÝ[][ÛœËˆ›ÛÝÚ[™ÈHœ™XXÚÝ\ÝÛY\œÈZYÚ[šÈ]Üš^›ÛˆÙ\È›ÝÛ›ÝÈ[›ÝYÚX›Ý]ÞX™\œÙXÝ\š]HÈ›ÝXÝ]ÈÛY[È[™ÛÜˆ™]™[Hœ™XXÚ[XYÚ[™È]È™\]][Ûˆ[ˆHÞX™\œÙXÝ\š]H˜Z[š[™ÈÙXÝÜ‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHÜÜÈÙˆXÙ[œÙJŠˆÛÝ[™HHÛÛœÙ\]Y[˜ÙHÙˆ›Û‹XÛÛ\X[˜ÙH[ˆÙ\Z[ˆÙXÝÜœËˆÝÙ]™\‹[ˆ\ÈØÙ[˜\š[ËÜš^›ÛˆY›ÝÛÛ[Z]H™YÛYÙ[˜ÙH\™XÝKÛÈ]\È›ÝZÙ[HÈÜÙH[žHXÙ[œÙ\È]X^HÛ—ˆ
ˆ
ŠŠHØ[˜Ý[ÛœÊŠˆ\™H[ÛÈÝ[X[[˜[Y\È›Üˆ›Û‹XÛÛ\X[˜ÙK]\™H\XØ[H[Ü™HÙ]™\™H[™Ø[ˆ[˜ÛYHÜ\˜][Û˜[™\ÝšXÝ[ÛœÈÜˆ[Z]][ÛœËˆÝÙ]™\‹[ˆ\ÈØÙ[˜\š[ËÜš^›ÛˆY›ÝÛÛ[Z]H™YÛYÙ[˜ÙK—ˆ
ˆ
Š‘
Hš[™\ÊŠˆ\™H[˜[Y\È[\ÜÙYžH™YÝ[]ÜžH]]Üš]Y\È›Üˆ›Û‹XÛÛ\X[˜ÙHÚ]]H›ÝXÝ[Ûˆ™YÝ[][ÛœËˆÝÙ]™\‹[ˆ\ÈØÙ[˜\š[ËÜš^›ÛˆY›ÝÛÛ[Z]H™YÛYÙ[˜ÙKˆ‚ˆKˆMLŽˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ•H˜Z[š[™ÈX[˜YÙ\ˆØ[ÈÈYX\Ý\™K›ÝY\™[H\ØÜšX™KÝÈ^ÜÙYÝY™ˆ\™HÈÛØÚX[[™Ú[™Y\š[™Ëˆ^H\ÚYÛˆH™XÝ\œš[™ÈXÝ]š]H]™\›ÙXÙ\È™X[\ÝXÈXÙ\]™HY\ÜØYÙ\È[™™XÛÜ™ÈÚÈÛXÚÜËÚÈ™\ÜÈ[™ÚÈÙ\È›Ý[™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙXÝ\š]H]Ø\™[™\ÜÈ˜XÝXÙH[›Û™\ÈÛÛ™XÝ[™ÈÚ[][]Y[XZ[]XÚÜÈÈYXØ]H[\ÞYY\ÈÈ™XÛÙÛš^™H[™™\ÜÛ™È\Ú[™È][\ÏÈ‹ˆÜ[ÛœÎˆÂˆJH\Ù\ˆÝZY[˜ÙH[™˜Z[š[™È‹ˆŠH\Ú[™ÈØ[\ZYÛœÈ‹ˆÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][Ûˆ‹ˆ‘
H™\Ü[™È[™[Ûš]Üš[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠH\Ú[™ÈØ[\ZYÛœÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\ÈÙXÝ\š]H]Ø\™[™\ÜÈ˜XÝXÙH[›Û™\ÈÛÛ™XÝ[™ÈÚ[][]Y[XZ[]XÚÜËÙ[ˆØ[Y\Ú[™ÈÚ[][][ÛœËÈYXØ]H[\ÞYY\ÈÈ™XÛÙÛš^™H[™™\ÜÛ™È\Ú[™È][\Ëˆ[ˆ\ÙHÚ[][]Y]XÚÜË[\ÞYY\È™XÙZ]™H˜ZÙH\Ú[™È[XZ[È\ÚYÛ™YÈZ[ZXÈ™X[\Ú[™È][\ËˆHØš™XÝ]™H\ÈÈ\Ý[\ÞYY\ÉÈXš[]HÈY[YžH\Ú[™È[XZ[Ë]›ÚY˜[[™È›ÜˆHXÙ\[Ûˆ[™™\ÜÝ\ÜXÚ[Ý\ÈY\ÜØYÙ\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH\Ù\ˆÝZY[˜ÙH[™˜Z[š[™ÊŠˆ[ˆHÛÛ^ÙˆÙXÝ\š]H]Ø\™[™\ÜÈ™Y™\œÈÈH›ØÙ\ÜÈÙˆ›ÝšY[™È[\ÞYY\ÈÚ][™›Ü›X][Û‹ÛXÚY\È[™™\Ý˜XÝXÙ\È™[]YÈÞX™\œÙXÝ\š]K›ÝYÚÛXÞHX[X[Ë˜Z[š[™ÈÙ\ÜÚ[ÛœÈ[™Ú]X][Û˜[]Ø\™[™\ÜÈ^\˜Ú\Ù\Ë—ˆ
ˆ
ŠÊH[›ÛX[Ý\È™Z]š[Üˆ™XÛÙÛš][ÛŠŠˆ\ÈHÙXÝ\š]H]Ø\™[™\ÜÈ˜XÝXÙH›ØÝ\ÙYÛˆYXØ][™È[\ÞYY\ÈÈ™XÛÙÛš^™H[\ÝX[Üˆ[™^XÝY™Z]š[ÜœÈ]ÛÝ[[™XØ]HHÙXÝ\š]H™X]—ˆ
ˆ
Š‘
H™\Ü[™È[™[Ûš]Üš[™ÊŠˆ\™HÙ^H\ÜXÝÈÙˆÙXÝ\š]H]Ø\™[™\ÜÈ˜XÝXÙ\Ëˆ^H[›Û™H[˜ÛÝ\˜YÚ[™È[\ÞYY\ÈÈ™\ÜÝ\ÜXÚ[Ý\ÈXÝ]š]Y\ËÝ[X[ÙXÝ\š]H[˜ÚY[ÈÜˆ\Ú[™È][\Ëˆ[Ûš]Üš[™È\ÈØ\œšYYÝ]È]˜[X]HHY™™XÝ]™[™\ÜÈÙˆÙXÝ\š]H]Ø\™[™\ÜÈ[š]X]]™\È[™Y[YžHÝ[X[ÙXZÛ™\ÜÙ\ÈÜˆ\™X\È›Üˆ[\›Ý™[Y[ˆ‚ˆKˆMLÎˆÂˆÜXÎˆYÜ™Y[Y[È	ˆÛÛ˜XÝÈ‹ˆØÙ[˜\š[Îˆ•ÛÈÛÛ\[šY\ÈXÚYHÈÙ]\H™]ÈÛÛ[Y\˜ÚX[™[\™HÙÙ]\Žˆ^HÚ[ÛÛXÚ›ÛÙÞH[™Ø[\È™]ÛÜšÜËÜ][™\ÝY[[™™]™[YK[™Ú\™HÝÛ™\œÚ\ÙˆHÛÙØ\™H^H]™[Üˆ^H™YYHØÝ[Y[Yš[š[™ÈÝÈ›Ùš]È[™ÜÜÙ\È\™H]šYYXXÚ\IÜÈ™\ÜÛœÚXš[]Y\ËÝÛ™\œÚ\Ùˆ[[XÝX[›Ü\K[™ÝÈZ]\ˆÛ™HX^H^]H\œ˜[™Ù[Y[ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆYÜ™Y[Y[YY]È\ÙH™\]Z\™[Y[ÏÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆÓKÙ][™ÈÙ\šXÙH]™[È[™[˜[Y\È™]ÙY[ˆHÛÈÛÛ\[šY\È‹ˆŠHH”KÛÝ™\›š[™ÈHÛÛ[Y\˜ÚX[\™\œÚ\›Ùš]ËXXš[]Y\È[™^]‹ˆÊH[ˆ‘Kš[™[™ÈHÛÈÛÛ\[šY\ÈÈÛÛ™šY[X[]HÝ™\ˆ[™›Ü›X][Ûˆ^Ú[™ÙY‹ˆ‘
H[ˆSÕKXÛ\š[™ÈHÛÈÛÛ\[šY\ÉÈ[[[ÛˆÈÛÛÜ\˜]H[ˆ]\™H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHH”H
\Ú[™\ÜÈ\™\œÈYÜ™Y[Y[
JŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Š”JŠˆÛÝ™\›œÈH
Š˜ÛÛ[Y\˜ÚX[\™\œÚ\™]ÙY[ˆY\œÊŠ‹HÚ]X][Ûˆ[ˆÚXÚÛÈÜ™Ø[š^˜][ÛœÈ\™H›ÝÝ\Y\ˆ[™Ý\ÝÛY\ˆÈÛ™H[›Ý\ˆ][ˆH™[\™HÙÙ]\‹ˆ]\ÈHÛ›HØÝ[Y[ÛˆH\ÝY™\ÜÚ[™È[›Ý\ˆ[Y\ÈHØÙ[˜\š[È˜Z\Ù\ÎˆH
Š™]š\Ú[ÛˆÙˆ›Ùš]È[™ÜÜÙ\ÊŠ‹XXÚ\IÜÈ
Š›XXš[]Y\ÊŠˆ[™ÝÈ^H[œÝÙ\ˆÈ\™\Y\Ë
Š›ÝÛ™\œÚ\Ùˆ[[XÝX[›Ü\JŠˆÜ™X]Y›Ú[KÚXÚ\ÈH[ÜÝÛÛ\ÝY[™[ÜÝÙ[ˆ™YÛXÝYÛ]\ÙK[™
Š™^]Ý˜]YÚY\ÊŠ‹YX[š[™ÈÚ]\[œÈÈ\ÜÙ]Ë]KÝ\ÝÛY\œÈ[™ÛÙHYˆÛ™H\HØ[ÈÝ]ÜˆH\Y\È˜[Ý]ˆ]\ÝÚ[\Ù\™\È][[ÛŽˆ]Ø[ˆÛ›H™H™YÛÝX]YÙ[]HÝ\Ú[H™[][ÛœÈ\™HÛÛÙÚXÚ\ÈÚHH˜YH˜YY”H›ÙXÙ\È]YØ][ÛˆYX\œÈ]\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÓNŠŠˆ™\Ý[Y\ÈH
ŠœÝ\Y\‹XÝ\ÝÛY\ŠŠˆ™[][ÛœÚ\[ˆÚXÚÛ™H\H[]™\œÈHÙ\šXÙH[™HÝ\ˆ™XÙZ]™\È]YX\Ý\š[™È]È]X[]HÚ]Y]šXÜÈ[™[˜[Y\Ëˆ\™H\È›ÈÝ\Y\ˆ\™NˆHÛÈÛÛ\[šY\ÈÝ[™ÛˆHØ[YH›ÛÝ[™È[™Ú\™HH™[\™IÜÈš\ÚË—ˆ
ˆ
ŠÊH‘NŠŠˆ›ÝXÝÈH
Šš[™›Ü›X][Ûˆ^Ú[™ÙY
Šˆ[™ÚÝ[Ù\Z[›H™HÚYÛ™Y\XØ[HX\›Y\‹\š[™È™YÛÝX][ÛœËˆ]ÛÛ™šY[X[]H\ÈÛ›HÛ™HÙˆH™XÙ\ÜØ\žHÛ]\Ù\Îˆ[ˆ‘HØ^\È›Ý[™ÈX›Ý]ÚÈÛÛXÝÈÚ]ÜˆÚÈÝÛœÈHÛÙØ\™K—ˆ
ˆ
Š‘
HSÕNŠŠˆXÛ\™\È[ˆ
Šš[[[ÛŠŠˆÈÛÛÜ\˜]H[™\È\XØ[H›Û‹Xš[™[™Ëˆ]ÝZ]ÈH™[[Z[˜\žH\ÙK]\™HHXÚ\Ú[Ûˆ\È[™XYHXYH[™[™›Ü˜ÙXX›HØ›YØ][ÛœÈ\™H™YYY›ÝÝ][Y[ÈÙˆ[[——Šˆ
Š‘^[H˜\ŠŠˆ\Ý[™ÝZ\ÚYÜ™Y[Y[ÈžHH
Š\HÙˆ™[][ÛœÚ\
Šˆ^H™\Ý[YK\ÈÙ[\ÈžHZ\ˆÛÛ[ˆ
Š”Ý\Y\‹XÝ\ÝÛY\ŠŠˆ™[][ÛœÚ\ˆTÐH\ÈHX\Ý\ˆYÜ™Y[Y[ÓÕÈÜˆÛÜšÈÜ™\ˆ›ÜˆH[™]šYX[YXÙHÙˆÛÜšËÓH›ÜˆÙ\šXÙH]™[È0­È
Š”Y\ŠŠˆ™[][ÛœÚ\ˆ”H›ÜˆHÛÛ[Y\˜ÚX[\™\œÚ\SÕH[™SÐH›Üˆ[[[ÛœÈ[™™[[Z[˜\žH\œ˜[™Ù[Y[È0­È
ŠÝ][™ÈXÜ›ÜÜÈ›Ý
ŠŽˆH‘H›ÜˆÛÛ™šY[X[]KÚXÚXØÛÛ\[šY\È[HÝ\œËˆH˜XÝXØ[[NˆÚ[ˆHØÙ[˜\š[È˜[Y\È
Šœ›Ùš]Ú\š[™Ë›Ú[HÝÛ™Y[[XÝX[›Ü\HÜˆ^]Ý˜]YÚY\ÊŠ‹H[œÝÙ\ˆ\ÈH”Kˆ‹ˆKˆMMˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆÛÛ››Üˆ\È\ÝØZ[™YH›Û[Ý[ÛˆÈH›ÛHÙˆ]H›ØÙ\ÜÛÜ‹ˆ‹ˆ]Y\Ý[ÛŽˆ‘›ÜˆÚXÚ\ÚÈÚ[ÛÛ››Üˆ™HHÛÛH™\ÜÛœÚX›H\H[ˆ\È™]ÈÜÚ][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHÈX[˜YÙH[™ÛÛ›ÛXØÙ\ÜÈÈ]H‹ˆŠHÈ[œÝ\™H\ÚXØ[ÙXÝ\š]HÙˆ]HÝÜ˜YÙH]šXÙ\È‹ˆÊHÈ[˜[^™H]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\ˆ‹ˆ‘
HÈ\ÝX›\Ú]HÝÛ™\œÚ\[™ÛÛ›ÛÝ™\ˆXØÙ\ÜÈÈH]H‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÈ[˜[^™H]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\ŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHš[X\žH™\ÜÛœÚXš[]HÙˆH]H›ØÙ\ÜÛÜˆ\ÈÈ›ØÙ\ÜÈ[™X[š\[]H]HÛˆ™Z[ˆÙˆH]HÛÛ›Û\‹ˆH]H›ØÙ\ÜÛÜˆXÝÈ[™\ˆH\™XÝ[Ûˆ[™]]Üš]HÙˆH]HÛÛ›Û\ˆ[™\™›Ü›\ÈÜXÚYšXÈ]H›ØÙ\ÜÚ[™ÈXÝ]š]Y\ÈXØÛÜ™[™ÈÈ]È[œÝXÝ[ÛœË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠH[ÝYÚ[œÝ\š[™È\ÚXØ[ÙXÝ\š]H\È[\Ü[
Š‹]\È\XØ[HHÚ\™Y™\ÜÛœÚXš[]H™]ÙY[ˆH]HÛÛ›Û\ˆ[™H]H›ØÙ\ÜÛÜˆÈ›ÝXÝÝÜ˜YÙH]šXÙ\È[™]H\ÜÙ]ÎÈÝÙ]™\ˆ]\È›ÝH]H›ØÙ\ÜÛÜ‰ÜÈXZ[ˆ™\ÜÛœÚXš[]H[ˆHÛÛ^Ùˆ›ØÙ\ÜÚ[™ÈXÝ]š]Y\Ë—ˆ
ˆ
Š‘
H]HÝÛ™\œÚ\[™ÛÛ›Û
Šˆ\ÝX[H˜[[™\ˆHÛÛ\][˜ÙHÙˆH]HÛÛ›Û\‹ÚÈ\È™\ÜÛœÚX›H›Üˆ]\›Z[š[™ÈH\œÜÙH[™YX[œÈÙˆ]H›ØÙ\ÜÚ[™Ë—ˆ
ˆ
ŠJHXØÙ\ÜÈÛÛ›Û
Šˆ\È\ÝX[HHÚ\™Y™\ÜÛœÚXš[]H™]ÙY[ˆH]HÛÛ›Û\ˆ[™H]H›ØÙ\ÜÛÜ‹ˆ[ÝYÚH]H›ØÙ\ÜÛÜˆX^H[\[Y[XØÙ\ÜÈÛÛ›ÛÈ˜\ÙYÛˆH]HÛÛ›Û\‰ÜÈ™\]Z\™[Y[ËH[[X]H™\ÜÛœÚXš[]H›ÜˆXØÙ\ÜÈÛÛ›ÛY\ÈÚ]H]HÛÛ›Û\‹ˆ‚ˆKˆMMNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ‘\š[™È[ˆ]Ø\™[™\ÜÈÙ\ÜÚ[Û‹HÛÛ\[žIÜÈ[\ÞYY\È\ÚÈ›ÜˆH˜XÝXØ[[[YYX]HÜš]\š[ÛˆÈ\HÈ]™\žHÝ\ÜXÚ[Ý\ÈY\ÜØYÙH][™È[ˆZ\ˆ[˜›Þ™Y›Ü™HZÚ[™È[žHXÝ[Ûˆ][ˆ‹ˆ]Y\Ý[ÛŽˆ•È[\›Ý™HÙXÝ\š]H]Ø\™[™\ÜËÚXÚÙˆH›ÛÝÚ[™ÈÝ][Y[È‘TÕ\ØÜšX™\ÈÝÈ[\ÞYY\ÈZYÚ™XÛÙÛš^™HH\Ú[™È][\È‹ˆÜ[ÛœÎˆÂˆJHžHÜ[š[™ÈÛ›H[XZ[Èœ›ÛH\ÝYÙ[™\œÈ[™[ÜH^HÛ›ÝËˆ‹ˆŠHžHÛXÚÚ[™ÈÛˆ[šÜÈ[ˆÝ\ÜXÚ[Ý\È[XZ[ÈÈ™\šYžHZ\ˆ]][XÚ]H[™Y[YžHH]XÚÙ\‹ˆ‹ˆÊHžH™\šYžZ[™ÈHÙ[™\‰ÜÈ[XZ[Y™\ÜÈ[™ÛÚÚ[™È›ÜˆÚYÛœÈÙˆXÙ\[Û‹ˆ‹ˆ‘
HžH™\ÜÛ™[™È[[YYX][HÈ[žH[XZ[]™\]Y\ÝÈÙ[œÚ]]™H[™›Ü›X][Û‹ˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHžH™\šYžZ[™ÈHÙ[™\‰ÜÈ[XZ[Y™\ÜÈ[™ÛÚÚ[™È›ÜˆÚYÛœÈÙˆXÙ\[ÛŠŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[\ÞYY\ÈÚÝ[Ø\™Y[H^[Z[™HHÙ[™\‰ÜÈ[XZ[Y™\ÜÈ›Üˆ[žHÜ[[™È\œ›ÜœÈÜˆ[\ÝX[Ú\˜XÝ\œÈ]ÛÝ[[™XØ]HH\Ú[™È][\ˆ^HÚÝ[[ÛÈÛÚÈ›ÜˆÚYÛœÈÙˆXÙ\[Û‹ÝXÚ\È\™Ù[™\]Y\ÝÈ›Üˆ\œÛÛ˜[[™›Ü›X][Û‹Ù[™\šXÈÜ™Y][™ÜÈÜˆ[\ÝX[[XZ[ÛÛ[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÛXÚÚ[™ÈÛˆ[šÜÈ[ˆÝ\ÜXÚ[Ý\È[XZ[ÊŠˆ\Èš\ÚÞH[™Ø[ˆXYÈX[Ø\™H[™™XÝ[ÛœÈÜˆÝ\ˆÙXÝ\š]H›Ø›[\Ëˆ[œÝXYÙˆÛXÚÚ[™È\™XÝHÛˆ[šÜË[\ÞYY\ÈÚÝ[Ý™\ˆÝ™\ˆH[šÈÈÙYHHXÝX[T“[™™\šYžHÚ]\ˆ]X]Ú\ÈH[[™Y\Ý[˜][Û‹—ˆ
ˆ
ŠJHÜ[š[™ÈÛ›H[XZ[Èœ›ÛH\ÝYÙ[™\œÊŠˆ\È›ÝH™XÛÛ[Y[™Y˜XÝXÙH›Üˆ™XÛÙÛš^š[™È\Ú[™È][\Ëˆ\Ú[™È[XZ[ÈÙ[ˆ[\\œÛÛ˜]H\ÝYÙ[™\œËÛÈ›[™HÜ[š[™È[[XZ[Èœ›ÛHÛ›ÝÛˆÛÝ\˜Ù\ÈØ[ˆXYÈ˜[[™ÈšXÝ[HÈ\Ú[™È]XÚÜË—ˆ
ˆ
Š‘
H[\ÞYY\ÈÚÝ[™]™\ˆ™\ÜÛ™È[XZ[ÊŠˆ]™\]Y\ÝÙ[œÚ]]™H[™›Ü›X][ÛˆÚ]Ý]™\šYžZ[™ÈHYÚ][XXÞHÙˆH™\]Y\Ý›ÝYÚÝ\ˆYX[œËÝXÚ\ÈÛÛXÝ[™ÈHÙ[™\ˆ\™XÝH›ÝYÚHÛ›ÝÛˆ[™™[XX›HÛÛ[][šXØ][ÛˆÚ[›™[ˆ‚ˆKˆMMŽˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žIÜÈ›Ø\™›ÈÛ™Ù\ˆØ[ÈÙ\\˜]H\ÜÙ\ÜÛY[È›ÜˆH™]ÛÜšËH\XØ][ÛœÈ[™\ÚXØ[ÙXÝ\š]Nˆ]\ÚÜÈ›ÜˆHÚ[™ÛH[™ØYÙ[Y[]\ÝÈÝÈH™X[]XÚÙ\ˆÛÝ[ÛÛXš[™HH™YHÝ\™˜XÙ\ÈÈ™XXÚH]H^H\™HY\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÜ[ÛœÈ‘TÕ\ØÜšX™\ÈHš[X\žHØš™XÝ]™HÙˆ[ˆ[YÜ˜]Y[™]˜][Ûˆ\ÝÈ‹ˆÜ[ÛœÎˆÂˆJHÈ›ØÝ\ÈÛ›HÛˆ^\›˜[™]ÛÜšÈ[™\˜Xš[]Y\Ëˆ‹ˆŠHÈ]˜[X]HHÝXØÙ\ÜÈÙˆ[ˆÜ™Ø[š^˜][Û‰ÜÈÙXÝ\š]H˜Z[š[™Ëˆ‹ˆÊHÈ]˜[X]H^Û\Ú]™[HÛÙØ\™K[]™[[™\˜Xš[]Y\Ëˆ‹ˆ‘
HÈ]˜[X]H[™\˜Xš[]Y\ÈXÜ›ÜÜÈH\ÚXØ[ÛÙØ\™H[™™]ÛÜšÈ^Y\œËˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
Š‘
HÈ]˜[X]H[™\˜Xš[]Y\ÈXÜ›ÜÜÈH\ÚXØ[ÛÙØ\™H[™™]ÛÜšÈ^Y\œÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ[YÜ˜]Y\ÝÈ›ÝšYHHÛÛ\]H]˜[X][Û‹ÛÝ™\š[™ÈY™™\™[ÙXÝ\š]HÛXZ[œËœ›ÛH\ÚXØ[[™œ˜\ÝXÝ\™HÈÛÙØ\™H\XØ][ÛœÈ[™™]ÛÜšÈÛÛ™šYÝ\˜][ÛœË[œÝ\š[™ÈH][KY˜XÙ]Y\›ØXÚÈ\ØÛÝ™\š[™ÈÝ[X[[™\˜Xš[]Y\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊH]˜[X][™È^Û\Ú]™[HÛÙØ\™K[]™[[™\˜Xš[]Y\ÊŠˆYÚYÚÈÛ›HÛ™HÛXZ[‹™YÛXÝ[™ÈHÛÛ\]H˜]\™HÙˆ[YÜ˜]Y\ÝË—ˆ
ˆ
ŠJH›ØÝ\Ú[™ÈÛ›HÛˆ^\›˜[™]ÛÜšÈ[™\˜Xš[]Y\ÊŠˆ™\™\Ù[ÈH˜\œ›ÝÙ\ˆ\œÜXÝ]™KÚ[Z[\ˆÈ^\›˜[[™]˜][Ûˆ\ÝË—ˆ
ˆ
ŠŠH]˜[X][™ÈHÝXØÙ\ÜÈÙˆÙXÝ\š]H˜Z[š[™ÊŠˆ\È›ÝHÙ[˜[Øš™XÝ]™HÙˆ[YÜ˜]Y[™]˜][Ûˆ\ÝËˆ‚ˆKˆMMÎˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ•H›ÚœÛÛˆÜ›Ý\H›Ü™[œÚXÈX›Ü˜]ÜžK\È[\[Y[YHÛÛ\]HÙXÝ\š]H]Ø\™[™\ÜÈ›ÙÜ˜[HÈYXØ]H]È[\ÞYY\ÈÛˆÞX™\œÙXÝ\š]H™\Ý˜XÝXÙ\Ëˆ\È\Ùˆ\È›ÙÜ˜[K^H[›™Y[™Ü™X]YÚ[][]Y\Ú[™È[XZ[Ëˆ^H]™H›ÝÈ[\™YH^XÝ][Ûˆ\ÙHÙˆH›ÙÜ˜[Kˆ‹ˆ]Y\Ý[ÛŽˆ•Ú]Ú[H›ÚœÛÛˆÜ›Ý\È[ˆH^XÝ][Ûˆ\ÙOÈ‹ˆÜ[ÛœÎˆÂˆJH[˜[^™H]H[™™\Ý[Èœ›ÛH\Ú[™ÈØ[\ZYÛœÈ‹ˆŠHYXØ]H[\ÞYY\ÈX›Ý]™\Ý˜XÝXÙ\È›Üˆ]›ÚY[™È\Ú[™È‹ˆÊHÙ[™Ý]Ú[][]Y\Ú[™È[XZ[ÈÈ[\ÞYY\È‹ˆ‘
H]™[ÜÙXÝ\š]HÛXÚY\È[™[™›ÛÚÜÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÙ[™Ý]Ú[][]Y\Ú[™È[XZ[ÈÈ[\ÞYY\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ\š[™ÈH^XÝ][Ûˆ\ÙKH›ÚœÛÛˆÜ›Ý\	ÜÈÞX™\œÙXÝ\š]HX[HÚ[Ù[™HÚ[][]Y\Ú[™È[XZ[ÈÈ[\ÞYY\È\È\ÙˆZ\ˆ[›™Y\Ú[™ÈØ[\ZYÛœËˆ\È˜XÝXÙHZ[\ÈÈ˜Z\ÙH[\ÞYY\ÉÈ]Ø\™[™\ÜÈÙˆÝ[X[\Ú[™È][\È[™[[H™XÛÙÛš^™H[™™\ÜÛ™\›ÜšX][HÈÝXÚ™X]Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHYXØ][™È[\ÞYY\ÈÛˆ™\Ý˜XÝXÙ\ÈYØZ[œÝ\Ú[™ÊŠˆ\È[ˆ\ÜÙ[X[ÛÛ\Û™[ÙˆH]Ø\™[™\ÜÈ›ÙÜ˜[K]˜[ÈÚ][ˆH
Š\Ù\ˆÝZY[˜ÙH[™˜Z[š[™ÊŠˆ\ÙKÚXÚ[ˆHØÙ[˜\š[È\È[™XYH™Y[ˆØ\œšYYÝ]ˆ[ˆH^XÝ][Ûˆ\ÙKH›ØÝ\È\ÈÛˆ[\[Y[[™ÈH[›™YXÝ]š]Y\ËÝXÚ\È\Ú[™ÈØ[\ZYÛœË˜]\ˆ[ˆÛˆÜXÚYšXÈ˜Z[š[™ÈÜXÜË—ˆ
ˆ
ŠJHY\ˆ^XÝ][™ÈH\Ú[™ÈØ[\ZYÛœÊŠ‹HÞX™\œÙXÝ\š]HX[HÚ[[˜[^™HH]H[™™\Ý[ÈÈ]˜[X]HHY™™XÝ]™[™\ÜÈÙˆH›ÙÜ˜[Kˆ^HÚ[^[Z[™HÝÈ[\ÞYY\È™\ÜÛ™YÈHÚ[][]Y\Ú[™È[XZ[È[™\ÙH\È[™›Ü›X][ÛˆÈY[YžH\™X\È›Üˆ[\›Ý™[Y[[™\\ˆ˜Z[š[™Ë—ˆ
ˆ
Š‘
H]™[Ü[™ÈÙXÝ\š]HÛXÚY\È[™[™›ÛÚÜÊŠˆØ\È\ÙˆH™]š[Ý\È\ÙHÙˆHÙXÝ\š]H]Ø\™[™\ÜÈ›ÙÜ˜[Kˆ][›Û™YÜ™X][™ÈX]\šX[ÈÈYXØ]H[\ÞYY\ÈÛˆÙXÝ\š]HÛXÚY\È[™›ØÙY\™\Ëˆ‚ˆKˆMNˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ]˜]˜[Ø^š[™ËHš\ÚÈX[˜YÙ[Y[X[H\ÈÛÜšÚ[™ÈÈ]X[YžHHÝ[X[š[˜[˜ÚX[[\XÝÙˆÜXÚYšXÈš\ÚÜÈHÜ™Ø[š^˜][ÛˆZYÚ˜XÙKˆ^HÝ\YžHY[YžZ[™ÈHÙ^Hš\ÚÜËˆ^H[ˆ]\›Z[™HH^XÝYš[˜[˜ÚX[ÜÜÈÝ™\ˆH™^š]™HYX\œÈ›ÜˆXXÚÙˆHš\ÚÜËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[[Y[Ùˆš\ÚÈX[˜YÙ[Y[\™H^HY™\ÜÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHš\ÚÈ\ÜÙ\ÜÛY[‹ˆŠHš\ÚÈ[˜[\Ú\È‹ˆÊHš\ÚÈ™YÚ\Ý\ˆ‹ˆ‘
Hš\ÚÈY[YšXØ][Ûˆ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHš\ÚÈ[˜[\Ú\ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆš\ÚÈ[˜[\Ú\È\ÈHÜXÚX[\ÙˆHš\ÚÈX[˜YÙ[Y[›ØÙ\ÜÈ[ˆÚXÚHš[˜[˜ÚX[[\XÝÙˆÜXÚYšXÈš\ÚÜÈ\È]\›Z[™Y›ÝYÚ]X[]]]™H[™]X[]]]™HY]ÙËˆ][˜ÛY\ÈØ[Ý[][™ÈH^XÝYš[˜[˜ÚX[ÜÜÈ›ÜˆH\XÝ[\ˆš\ÚÈÝ™\ˆHÚ]™[ˆ\š[Ù—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHš\ÚÈ\ÜÙ\ÜÛY[
Šˆ[›Û™\È]˜[X][™È[™š[Üš]^š[™ÈHY[YšYYš\ÚÜÈ˜\ÙYÛˆZ\ˆÝ[X[[\XÝ[™›Ø˜Xš[]HÙˆØØÝ\œ™[˜ÙK—ˆ
ˆ
Š‘
Hš\ÚÈY[YšXØ][ÛŠŠˆ\ÈH[š]X[Ý\[ˆHš\ÚÈX[˜YÙ[Y[›ØÙ\ÜË[ˆÚXÚÝ[X[š\ÚÜÈ\™HY[YšYY[™ØÝ[Y[YÚ][ˆHÜ™Ø[š^˜][Û‰ÜÈ[š\›Û›Y[—ˆ
ˆ
ŠÊHHš\ÚÈ™YÚ\Ý\ŠŠˆ\ÈHÛÛ\]H™XÛÜ™Ùˆ[Y[YšYYš\ÚÜËÙÙ]\ˆÚ]Z\ˆÝ[X[[\XÝ[™Z]YØ][ÛˆÝ˜]YÚY\Ëˆ‚ˆKˆMNNˆÂˆÜXÎˆÛÛ\X[˜ÙKš]˜XÞKYH[YÙ[˜ÙH	ˆYHØ\™H‹ˆØÙ[˜\š[ÎˆH]\›ÜX[ˆÛÛ\[žHÙ[[™ÈÛ›[™H[™[™[™ÈØ\™^[Y[È\™XÝH™YYÈÈÛÜÝ]HØ›YØ][ÛœÈ]\HÈ]ˆH›Ø\™\ÚÜÈÈ\Ý[™ÝZ\ÚÚ]\È[\ÜÙYžH]ËÚ]Ý[\Èœ›ÛHHÛÛ˜XÝÚ]H^[Y[Ø\™™]ÛÜšÜË[™Ú]HÛÛ\[žHYÜÈ›Û[\š[HÈ[[ÛœÝ˜]HX]\š]HÈÝ\ÝÛY\œËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™ÈÛ\ÜÚYšXØ][ÛœÈ\ÈÛÜœ™XÝÈ‹ˆÜ[ÛœÎˆÂˆJHÑˆ\ÈHYØ[Ø›YØ][Û‹ÒHÔÈHÛÛ˜XÝX[Û™KTÓÈÌHH›Û[\žHÙ\YšXX›HÝ[™\™‹ˆŠHÑˆ[™ÒHÔÈ\™H›Ý]\›ÜX[ˆ]ÜËÚ[HTÓÈÌH\È[\ÜÙYžHH˜[šÚ[™È™YÝ[]Üˆ‹ˆÊHÒHÔÈ\ÈH^[Y[È]ËÑˆH›Û[\žHÝZY[[™KTÓÈÌHHÛÛ˜XÝX[Ø›YØ][Ûˆ‹ˆ‘
H[™YH\™H›Û[\žHÝ[™\™Îˆ^H™XÛÛYHX[™]ÜžHÛ›HÚ[ˆÚ]Y[ˆHÛÛ˜XÝ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÑˆ]ËÒHÔÈÛÛ˜XÝTÓÈÌH›Û[\žHÝ[™\™
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH™YH™Y™\™[˜Ù\È]™H
Š™Y™™\™[ÜšYÚ[œÈ[™[™›Ü˜Ù[Y[YXÚ[š\Û\ÊŠ‹[™ÛÛ™\Ú[™È[H\ÈÛ™HÙˆH[ÜÝœ™\]Y[\œ›ÜœËˆ
Š‘ÑŠŠˆ\ÈH
Š‘]\›ÜX[ˆ[š[Ûˆ™YÝ[][ÛŠŠ‹\™Y›Ü™H\™XÝH\XØX›H]ÎˆÚÙ]™\ˆœ™XXÚ\È][œÝÙ\œÈÈHX›XÈÝ\\š\ÛÜžH]]Üš]H[™˜XÙ\ÈYZ[š\Ý˜]]™Hš[™\È™XXÚ[™È	HÙˆÛÜ›ÚYH[›X[\››Ý™\‹ˆ
Š”ÒHÔÊŠˆ\È›ÈÛÝ[žIÜÈ]Îˆ]\ÈH
Š˜ÛÛ˜XÝX[Ý[™\™
Šˆ[\ÜÙYžHHØ\™™]ÛÜšÜÈÛˆ[ž[Û™HÚ\Ú[™ÈÈ[™H^[Y[]K[™HÛÛœÙ\]Y[˜Ù\ÈÙˆ›Û‹XÛÛ\X[˜ÙH\™HÛÛ˜XÝX[[˜[Y\ËÝšXÝ\ˆ]Y]È[™[ˆH^™[YKÜÚ[™ÈHXš[]HÈXØÙ\Ø\™ËÚXÚ›Üˆ[ˆKXÛÛ[Y\˜ÙH\Ú[™\ÜÈYX[œÈÛÜÚ[™Ëˆ
Š’TÓÈÌJŠˆ\ÈH
Š›Û[\žH[\›˜][Û˜[Ý[™\™
ŠŽˆ›Ø›ÙH\ÈØ›YÙYÈYÜ]]]\È
Š˜Ù\YšXX›JŠˆžH[ˆXØÜ™Y]Y›ÙK[™Ù\YšXØ][Ûˆ^\ÝÈ™XÚ\Ù[HÈ[[ÛœÝ˜]HÈÝ\ÝÛY\œÈ[™\™\œÈHX]\š]HÙˆÛ™IÜÈ[™›Ü›X][ÛˆÙXÝ\š]HX[˜YÙ[Y[Þ\Ý[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHÑˆ[™ÒHÔÈ›Ý]\›ÜX[ˆ]ÜÎŠŠˆ˜[ÙH›ÜˆÒHÔËÚXÚÛÛY\Èœ›ÛHHš]˜]HÛÛœÛÜ][HÙˆ^[Y[™]ÛÜšÜÈ[™\ÈÛØ˜[›Ý]\›ÜX[‹ˆ]\È[ÛÈ˜[ÙH[ˆ]ÈÙXÛÛ™[Žˆ›È˜[šÚ[™È™YÝ[]Üˆ[\ÜÙ\ÈTÓÈÌHÙ[™\˜[K—ˆ
ˆ
ŠÊHÒHÔÈH]ËÑˆH›Û[\žHÝZY[[™NŠŠˆ[™\È^XÝHHÛÈXZ[ˆ™Y™\™[˜Ù\ËˆÑˆ\È[ž][™È]›Û[\žK[™\È[ˆ˜XÝH[ÜÝš[™[™ÈÙˆH™YH›ÜˆH]\›ÜX[ˆÛÛ\[žK—ˆ
ˆ
Š‘
H[›Û[\žH[[Ú]Y[ˆHÛÛ˜XÝŠŠˆÛÈ›ÜˆÝ[™\™Ë›Ý›Üˆ]ËˆHYØ[Ø›YØ][Ûˆ\Y\ÈžHHY\™H˜XÝÙˆ˜[[™ÈÚ][ˆ]ÈØÛÜK™YØ\™\ÜÈÙˆ[žHÛÛ˜XÝ——Šˆ
Š‘^[H˜\ŠŠˆÛ\ÜÚYžH]™\žH™Y™\™[˜ÙHžHH
ŠœÛÝ\˜ÙHÙˆHØ›YØ][ÛŠŠ‹™XØ]\ÙH]]\›Z[™\ÈÚÈ[˜[\Ù\È[ÝH[™ÝËˆ
Š“]ÈÜˆ™YÝ[][ÛŠŠˆHÑ‹TPKÓÖÚ]X›XÈ]]Üš]Y\È[™YZ[š\Ý˜]]™HÜˆÜš[Z[˜[[˜[Y\È0­È
ŠÛÛ˜XÝX[Ø›YØ][ÛŠŠˆHÒHÔËÚ][˜[Y\È[™ÜÜÈÙˆHXš[]HÈÜ\˜]H0­È
Š•›Û[\žHÙ\YšXX›HÝ[™\™
ŠˆHTÓÈÌH0­È
Š•›Û[\žHœ˜[Y]ÛÜšÊŠˆHH’TÕÞX™\œÙXÝ\š]Hœ˜[Y]ÛÜšËÚXÚÙ™™\œÈH™Y™\™[˜ÙHÝXÝ\™H[™›ÝšY\È›ÈÙ\YšXØ][Û‹ˆ[™™[Y[X™\ˆH[H]ÛÈ›Üˆ[Ùˆ[Nˆ[ÝHØ[ˆÝ]ÛÝ\˜ÙHH^XÝ][ÛˆÙˆÛÛ›ÛË™]™\ˆ
Š˜XØÛÝ[Xš[]JŠˆ›ÜˆÛÛ\X[˜ÙKˆ‹ˆKˆMŒˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[Îˆ™Y›Ü™H][™ÈH™]ÈT”Þ\Ý[H[È›ÙXÝ[Û‹X[˜YÙ[Y[ÛÛ[Z\ÜÚ[ÛœÈHÛÛ\]H\ÜÙ\ÜÛY[ÙˆHÜ™Ø[š^˜][Û‰ÜÈš\ÚÜËÈ™HØ\œšYYÝ]Û˜ÙHÛ›H[™]]™XÚ\ÙH[ÛY[ÈÝÙÜ˜\H[\XÝÙˆH[›ÙXÝ[Ûˆ[™HX]\š]HÙˆH^\Ý[™ÈÛÛ›ÛËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆH›ÛÝÚ[™È\›\È™Y™\œÈÈHÛÛ\]Hš\ÚÈ\ÜÙ\ÜÛY[Ú][ˆ[ˆÜ™Ø[š^˜][Ûˆ]ØØÝ\œÈ]HÜXÚYšXÈ[ÛY[Ù[ˆÈ]˜[X]HH[\XÝÙˆ[\[Y[[™ÈH™]ÈÞ\Ý[HÜˆÈØZ[ˆ[ˆ[™\[™[šY]ÈÙˆÜ\˜][Û˜[X]\š]OÈ‹ˆÜ[ÛœÎˆÂˆJHÛ™K][YH‹ˆŠHYØÈ‹ˆÊHš\ÚÈY[YšXØ][Ûˆ‹ˆ‘
HÛÛ[[Ý\È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÛ™K][YJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÛ™K][YH\ÜÙ\ÜÛY[È\™H[‹Y\]˜[X][ÛœÈÛÛ™XÝY]HÜXÚYšXÈÚ[\ÚYÛ™YÈ\ÝX›\ÚH˜\Ù[[™HÜˆ]˜[X]HHÝ]HÙˆš\ÚÈ]HÚ]™[ˆ[ÛY[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠÊHš\ÚÈY[YšXØ][ÛŠŠˆ[›Û™\ÈH›ØÙ\ÜÈÙˆ™XÛÙÛš^š[™ÈÝ[X[š\ÚÜË]Ù\È›ÝÛÛ˜Ù\›ˆHÛÛ\]H\ÜÙ\ÜÛY[]H\XÝ[\ˆÚ[[ˆ[YK—ˆ
ˆ
ŠŠHYØÈš\ÚÈ\ÜÙ\ÜÛY[ÊŠˆ\™HÛÛ™XÝY\È™YYY[™\™H›Ý™XÙ\ÜØ\š[HÛÛ\]HÜˆ[›™YÈ]˜[X]HH[›ÙXÝ[ÛˆÙˆ™]ÈÞ\Ý[\ÈÜˆ›Üˆ[ˆ[™\[™[™]šY]Ë—ˆ
ˆ
Š‘
HÛÛ[[Ý\È\ÜÙ\ÜÛY[ÊŠˆ\™HÛ™ÛÚ[™È[™›ÝšYH™X[][YHš\ÚÈ[˜[\Ú\Ë[›ZÙHÛ™K][YH\ÜÙ\ÜÛY[ÈÚXÚ\™HÝ]XÈ[™ØØÝ\ˆÛ›HÛ˜ÙKˆ‚ˆKˆMŒNˆÂˆÜXÎˆ”ÛØÚX[[™Ú[™Y\š[™È‹ˆØÙ[˜\š[ÎˆZ\ÚH™XÙZ]™\È[ˆ[XZ[]\X\œÈÈÛÛYHœ›ÛH\ˆ˜[šË\ÚÚ[™È\ˆÈ™\šYžH\ˆXØÛÝ[[™›Ü›X][ÛˆžHÛXÚÚ[™ÈÛˆH[šËˆH[XZ[\Ù\È\™Ù[[™ÝXYÙKÝXÚ\È	ÐXØÛÝ[Ý\Ü[œÚ[Ûˆ[ˆ›ÙÜ™\ÜÈIË[™[š]\È\ˆÈ[\ˆÙ[œÚ]]™H]Kˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\HÙˆÛØÚX[[™Ú[™Y\š[™È]XÚÈ\ÈZ\ÚH›Ø˜X›H˜XÚ[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÜX\ˆ\Ú[™È‹ˆŠHÚ[[™È‹ˆÊH\Ú[™È‹ˆ‘
Hš\Ú[™È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH\Ú[™ÊŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆZ\ÚH\È›Ø˜X›H˜XÚ[™ÈH\Ú[™È]XÚËˆ\Ú[™È]XÚÜÈ\ÙHœ›ØY›Û‹\ÜXÚYšXÈY\ÜØYÙ\È[™™[HÛˆ\™Ù[˜ÞKÝXÚ\È	ÐXØÛÝ[Ý\Ü[œÚ[Ûˆ[ˆ›ÙÜ™\ÜÈIËÈX[š\[]H\Ù\œÈ[ÈÛXÚÚ[™ÈÛˆ[šÜÈ[™[\š[™ÈÙ[œÚ]]™H[™›Ü›X][Û‹ˆH]XÚÙ\‰ÜÈØš™XÝ]™H\ÈÈØ]\ˆ\œÛÛ˜[]HžHÜ™X][™ÈHÙ[œÙHÙˆ[šXË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH[›ZÙHÜX\ˆ\Ú[™ÊŠ‹ÚXÚ\™Ù]ÈÜXÚYšXÈ[™]šYX[Ë\Ú[™ÈÙ[™\˜[HØ\ÝÈHÚY\ˆ™]—ˆ
ˆ
ŠŠHÚ[[™ÊŠˆ›ØÝ\Ù\ÈÛˆYÚ\›Ùš[H\™Ù]Ë—ˆ
ˆ
Š‘
Hš\Ú[™ÊŠˆ[›Û™\ÈØØ[\È˜\ÙYÛˆ›ÚXÙHØ[Ëˆ‚ˆKˆMŒŽˆÂˆÜXÎˆ”š\ÚÈX[˜YÙ[Y[	ˆ[˜[\Ú\È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žHÙZYÚÈ][˜Ú[™È]ÈÝÛˆ^[Y[Ù\šXÙKˆ[˜[\Ú\È\Ý[X]\È]ÛÝ[™\]Z\™HÝÜš[™ÈØ\™[X™\œÈ\™XÝKÚ]HÒHÔÈÛÛ\X[˜ÙH\™[ˆ]›ÛÝÜË[™]Hœ™XXÚÛÝ[œš[™Èš[™\ËÜÜÈÙˆHXš[]HÈXØÙ\Ø\™È[™™\]][Û˜[[XYÙH]ÛÝ[™H\™È™XÛÝ™\ˆœ›ÛKˆH^XÝYX\™Ú[ˆÛˆHÙ\šXÙH\È[Ù\ÝˆX[˜YÙ[Y[XÚY\È›ÝÈ][˜Ú]][[™ÈÙY\™[Z[™ÈÛˆ[ˆ^\›˜[^[Y[›ÝšY\‹ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚš\ÚÈ™X]Y[Ý˜]YÞHØ\ÈYÜYÈ‹ˆÜ[ÛœÎˆÂˆJHZ]YØ][Û‹™XØ]\ÙHHÛÛ\[žH™YXÙ\ÈZÙ[ZÛÙ[™[\XÝÚ]Y][Û˜[ÛÛ›ÛÈ‹ˆŠHXØÙ\[˜ÙK™XØ]\ÙHHÛÛ\[žHXÚÛ›ÝÛYÙ\ÈHš\ÚÈ[™ÚÛÜÙ\ÈÈ]™HÚ]]‹ˆÊH]›ÚY[˜ÙK™XØ]\ÙHHÛÛ\[žHÚ]™\È\HXÝ]š]H]Ù[™\˜]\ÈHš\ÚÈ‹ˆ‘
H˜[œÙ™\‹™XØ]\ÙHHš[˜[˜ÚX[š\ÚÈ\ÜÙ\È[\™[HÈ[ˆ[œÝ\˜[˜ÙHÛXÞH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH]›ÚY[˜ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆ
Š]›ÚY[˜ÙJŠˆ\ÈHÛ›HÝ˜]YÞH]ZÙ\Èš\ÚÈÈ
Šž™\›ÊŠ‹[™]Ù\ÈÛÈHÛ›HØ^HÜÜÚX›NˆžH›Ý[™\ZÚ[™ÈHXÝ]š]H]Ù[™\˜]\È]ˆ]\È^XÝHHXÚ\Ú[Ûˆ\ØÜšX™Y[™]ÚÝ[™H›ÝY]\È\È›Ý[ZY]H]H™\Ý[ÙˆHÛÛ\\š\ÛÛŽˆH^XÝYX\™Ú[ˆ\È[Ù\ÝHÝ[X[^ÜÝ\™H\ÈYÚ[™[˜ÛY\È[XYÙH]ÛÝ[™H\™È™XÛÝ™\ˆœ›ÛKÛÈHXÝ]š]H\È›ÝÛÜHš\ÚËˆ\È\È[ÛÈHÜš]\š[ÛˆžHÚXÚ]›ÚY[˜ÙH\ÈYÙYšYÚÜˆÜ›Û™Îˆ]\ÈHšYÚÚÚXÙHÚ[ˆH™[™Yš]Ù\È›Ý\ÝYžHH^ÜÝ\™K[™HÛÜˆÛ™HÚ[ˆ]X˜[™ÛœÈH›Ùš]X›HXÝ]š]HÝ™\ˆHš\ÚÈ]ÛÝ[]™H™Y[ˆZ]YØ]Y]™X\ÛÛ˜X›HÛÜÝˆš[˜[K]\ÈÛÜØœÙ\š[™È]™[Z[™ÈÛˆ[ˆ^\›˜[›ÝšY\ˆ\È›ÝH˜[œÙ™\ˆÙˆH›ÜšY]\žHÙ\šXÙIÜÈš\ÚÎˆ]Ù\šXÙH›ÈÛ™Ù\ˆ^\ÝË[™Ú]™[XZ[œÈ\ÈHY™™\™[[™ÛX[\‹\™\\Hš\ÚË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHZ]YØ][ÛŽŠŠˆ™\Ý[Y\ÈHXÝ]š]H
Š˜ÛÛ[Y\ÊŠˆ[™]ÛÛ›ÛÈ\™H[›ÙXÙYÈ™YXÙH]ÈZÙ[ZÛÙÜˆ[\XÝˆ]ÛÝ[]™H™Y[ˆH[œÝÙ\ˆYX[˜YÙ[Y[XÚYYÈ][˜ÚHÙ\šXÙHÚ]ÚÙ[š^˜][Û‹ÙYÛY[][Ûˆ[™ÒHÔÈ]Y]Ëˆ\™HHXÝ]š]H™]™\ˆÝ\Ë—ˆ
ˆ
ŠŠHXØÙ\[˜ÙNŠŠˆ[ÛÈ™\Ý[Y\ÈHXÝ]š]H
Š˜ÛÛ[Y\ÊŠ‹ÛÛœØÚ[Ý\ÛH[™Ú]Ý]Y][Û˜[ÛÛ›ÛËˆ]\ÈHÜÜÚ]HÙˆÚ]\[™YˆXØÙ\[™ÈYX[œÈ]š[™ÈÚ]Hš\ÚË]›ÚY[™ÈYX[œÈ›Ý]š[™È]—ˆ
ˆ
Š‘
H˜[œÙ™\ŽŠŠˆÚYÈH
Š™š[˜[˜ÚX[\™[ŠŠˆÈH\™\K\XØ[HšXHHÛXÞHÜˆHÛÛ˜XÝÛ]\ÙKÚ[HHXÝ]š]HØ\œšY\ÈÛ‹ˆ›ÈÛÝ™\ˆ\ÈZÙ[ˆÝ][ˆHØÙ[˜\š[Ë[™X›Ý™H[›Èš\ÚÈ™[XZ[œÈÈ˜[œÙ™\‹——Šˆ
Š‘^[H˜\ŠŠˆ[H›Ý\ˆÝ˜]YÚY\È\\Ú]HÚ[™ÛH]Y\Ý[Û‹
™Ù\ÈHXÝ]š]HÛÛ[YOÊ‹ˆ
Š]›ÚY[˜ÙJŠˆH›ËHXÝ]š]HÙX\Ù\ÈÜˆ™]™\ˆÝ\Ë[™]\ÈHÛ›HÛ™H]™\›Ù\ÈHš\ÚÈ0­È
Š“Z]YØ][ÛŠŠˆHY\ËÚ]™]ÈÛÛ›ÛÈ™YXÚ[™ÈZÙ[ZÛÙÜˆ[\XÝ0­È
Š•˜[œÙ™\ŠŠˆHY\Ë[™HÛÜÝÙˆ\›H\ÜÙ\ÈÈÝ\œË]™]™\ˆ[[X]HXØÛÝ[Xš[]H0­È
ŠXØÙ\[˜ÙJŠˆHY\Ë[˜Ú[™ÙYžHH›Ü›X[ØÝ[Y[YXÚ\Ú[Û‹ˆ™[Y[X™\ˆš[˜[H]Y\ˆZ]YØ][Ûˆ[™˜[œÙ™\ˆH
Šœ™\ÚYX[š\ÚÊŠˆ[Ø^\È™[XZ[œËÚXÚ]\Ý]Ù[ˆ™H›Ü›X[HXØÙ\YžHÛÛY[Û™HÚ]H]]Üš]Kˆ‹ˆKˆMŒÎˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\ÈÛÛ[Z\ÜÚ[Û™YÛÈ[™]˜][Ûˆ\ÝÈÝ™\ˆH\ÝÛÈYX\œËˆÛˆ›ÝØØØ\Ú[ÛœÈHÝ\Y\ˆÛÝ[‹[™Hš[˜[™\Ü[]™\™YÙYZÜÈ]\‹\ÝYH›]ÜÈ^Ú]YˆH[‹ZÝ\ÙHÓÐÈ›ÝXÙY›Ý[™ÈZ]\ˆ[YKˆHÒTÓÈÙ\È›ÝØ[H\™™\ÜØ^Z[™ÈHØ[YH[™ÜÎˆ^H\ÚÈ›Üˆ[ˆ[™ØYÙ[Y[[ˆÚXÚH]XÚÚ[™ÈX[H[™HY™[™[™ÈX[HÛÜšÈ[ˆHØ[YH›ÛÛKÚ]H]XÚÙ\ˆ[››Ý[˜Ú[™ÈXXÚXÚš\]YH\È]\È^XÝ]Y[™HY™[™\ˆÚXÚÚ[™È]™HÚ]\ˆHÒQSHØ]Ú\È]š^[™ÈH[\ÈÛˆHÜÝˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[™]˜][Û‹]\Ý[™È[ÙH\ÈHÒTÓÈ\ØÜšXš[™ÏÈ‹ˆÜ[ÛœÎˆÂˆJHÙ™™[œÚ]™H
™YX[JH‹ˆŠHY™[œÚ]™H
›YHX[JH‹ˆÊH[YÜ˜]Y
\œHX[JH‹ˆ‘
H\ÚXØ[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[YÜ˜]Y
\œHX[JJŠ‹——Šˆ
Š•HÛÛ˜Ù\œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆH˜Y][Û˜[[™]˜][Ûˆ\Ý\È
Š˜Y™\œØ\šX[
ŠŽˆH]XÚÙ\ˆÛÜšÜÈÛÝ™\KHY™[™\ˆÛ›ÝÜÈ›Ý[™Ë[™HÝ]ÛÛYH\œš]™\È]H[™\ÈH™\Üˆ]\ÈH\ÙY[[Ù[›ÜˆYX\Ý\š[™Ë]HÛÝÈÛ™H›ÜˆX\›š[™Ë™XØ]\ÙHÙYZÜÈ\ÜÈ™]ÙY[ˆHXÚš\]YH\ÙY[™Hš^ˆH
Šš[YÜ˜]Y
Šˆ[ÙH™[[Ý™\È^XÝH]\Ý[˜ÙNˆHÛÈÜ]XYÈÛÛX›Ü˜]H[œÝXYÙˆ˜XÚ[™ÈÙ™‹—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[È˜[Y\È]™\žH\Ý[™ÝZ\Ú[™È˜Z]ˆHÛÈÜ]XYÈ
Šš[ˆHØ[YH›ÛÛJŠ‹HXÚš\]YH
Š˜[››Ý[˜ÙY\È]\È^XÝ]Y
Š‹H
Š›]™JŠˆ™\šYšXØ][ÛˆÙˆ]XÝ[Ûˆ[™H
Šš[[YYX]JŠˆš^[™ÈÙˆ[\Ëˆ]\È™XÚ\Ù[HÝÈH\œHX[HÛÜšÜË[™]Y™\ÜÙ\ÈH›Ø›[HHÒTÓÈÝ]YˆHÚÜÛÛZ[™ÈØ\È›Ý[ˆXœÙ[˜ÙHÙˆÛ›ÝÛˆ›]ÜÈ]H˜XÝ]HÓÐÈ]XÝY›Ý[™Ëˆ]™\žHXÚš\]YH][\Y[[YYX][H™XÛÛY\ÈH[HÜš][ˆÜˆÛÜœ™XÝYÛÈÚ]\È›ÙXÙY\È›ÝH\ÝÙˆ[™\˜Xš[]Y\È]H
Š›YX\Ý\˜X›H[\›Ý™[Y[[ˆ]XÝ[ÛˆØ\Xš[]JŠ‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÙ™™[œÚ]™H
™YX[JNŠŠˆ\È™XÚ\Ù[HÚ]HÛÛ\[žH\È[™XYHÛ™HÚXÙKÚ]HÝ]ÛÛYHHÒTÓÈYÙ\È[œÝY™šXÚY[ˆH™YX[HÜ\˜]\È
Š˜ÛÝ™\JŠˆ[™[]™\œÈH™\ÜY\ˆH˜XÝÈžHÛÛœÝXÝ[Ûˆ]XXÚ\ÈHY™[™\ˆ›Ý[™È\š[™ÈH[™ØYÙ[Y[—ˆ
ˆ
ŠŠHY™[œÚ]™H
›YHX[JNŠŠˆÛÜšÜÈÛˆHY™[™[™ÈÚYK]
Š˜[Û™JŠŽˆ]™]šY]ÜÈÒQSH[\ËQˆÛÝ™\˜YÙH[™\™[š[™ÈÚ]›Ø›ÙHXÝX[H]XÚÚ[™Ëˆ[ˆHØÙ[˜\š[È\È\™Y›Ü™HZ\ÜÚ[™Ë˜[Y[HH]XÚÙ\ˆ^XÝ][™ÈHXÚš\]Y\Ë—ˆ
ˆ
Š‘
H\ÚXØ[ŠŠˆ\ÝÈØÚÜË˜YÙ\ËZ[Ø][™È[™XØÙ\ÜÈÈ™[Z\Ù\ËˆHØÙ[˜\š[È˜[Y\È›È\ÚXØ[ÛÛ›Ûˆ]ÜXZÜÈÙˆHÒQSKÙˆXÚš\]Y\È[™Ùˆ]XÝ[Ûˆ[\Ë[ÙÚXØ[ÛÛ›ÛË——Šˆ
Š‘^[H˜\ŠŠˆØš™XÝ]™HKH\ØÜšX™\ÈH[™]˜][Ûˆ\Ý[Û™È
ŠÛÈ[™\[™[^\ÊŠ‹[™]Y\Ý[ÛœÈZ^[H[X™\˜][KˆH
Š›[ÙJŠˆØ^\ÈÚÈHX[H[\\œÛÛ˜]\Îˆ
›Ù™™[œÚ]™Jˆ]XÚÜË
™Y™[œÚ]™JˆY™[™È[™]XÝË
š[YÜ˜]Y
ˆXZÙ\È[HÛÛX›Ü˜]K
œ\ÚXØ[
ˆ\ÝÈ\ÚXØ[ÛÛ›ÛËˆH
Š™[š\›Û›Y[
ŠˆØ^\ÈÝÈ]XÚ[™›Ü›X][ÛˆH\Ý\ˆ™XÙZ]™\Îˆ
[šÛ›ÝÛŠˆ›Û™K
œ\X[HÛ›ÝÛŠˆÛÛYK
šÛ›ÝÛŠˆ[ˆHÛÈÚÚXÙ\È\™Hœ™YHÙˆXXÚÝ\Žˆ[ˆ[YÜ˜]Y\ÝØ[ˆ\™™XÝHÙ[[ˆ[ˆHÛ›ÝÛˆ[š\›Û›Y[ˆYˆHØÙ[˜\š[ÈY[[ÛœÈ
Šœ™Y[™›YHÛÛX›Ü˜][™ÊŠˆÜˆ™Yš[š[™È]XÝ[Ûˆ\š[™ÈH[™ØYÙ[Y[H[œÝÙ\ˆ\È[YÜ˜]YÈYˆ]Y[[ÛœÈ
Š˜˜YÙ\ËØÚÜÈÜˆ[\Ý\ˆ]š[™ÊŠ‹]\È\ÚXØ[ˆ‚ˆKˆMˆÂˆÜXÎˆ”ÙXÝ\š]HÛXÚY\È	ˆY™XÞXÛH‹ˆØÙ[˜\š[Îˆ•HÙXÝ\š]HX[˜YÙ\ˆ\ÈYZ[™È\HÛÛ\[žHØÝ[Y[][Ûˆ[™š[™È›Ý\ˆØÝ[Y[ÈX›Ý]™[[ÝHXØÙ\ÜËˆHš\œÝÛÈYÙ\ÈÚYÛ™YžHHÚYYˆ^XÝ]]™KÝ]\È][™[[ÝHXØÙ\ÜÈÈÛÛ\[žHÞ\Ý[\È]\Ý[ˆÝ™\ˆ[ˆ[˜Üž\YÚ[›™[ˆHÙXÛÛ™ZYÚYÙ\È™]š\ÙY]™\žHYX\ˆžHH[™œ˜\ÝXÝ\™HX[K\ÝX›\Ú\È]HÚ[›™[\È[ˆTÙXÈ”ˆÚ]RÑ]Œˆ[™QTËLM‹QÐÓK[™]ÒKLH˜\ÙYÝZ]\È\™H›Ü˜šY[‹ˆH\™Ú][X™\™YØÜ™Y[œÚÝËÚÝÜÈ[ˆ[\ÞYYHÝÈÈÛÛ™šYÝ\™HH”ˆÛY[ÛˆZ\ˆ\ÜÝ\žHÝ\ˆH›Ý\ÝYÙÙ\ÝÈ™Y™\œš[™ÈHÛYHÛÛ›™XÝ[ÛˆÝ™\ˆX›XÈÚKQšHÚ[ˆÛÜšÚ[™È]Ø^Hœ›ÛHHÙ™šXÙKˆ‹ˆ]Y\Ý[ÛŽˆ’ÝÈÚÝ[H›Ý\ˆØÝ[Y[È™HÛ\ÜÚYšYY[ˆHÜ™\ˆ\ØÜšX™YÈ‹ˆÜ[ÛœÎˆÂˆJHÛXÞKÝ[™\™›ØÙY\™KÝZY[[™H‹ˆŠHÝ[™\™ÛXÞKÝZY[[™K›ØÙY\™H‹ˆÊHÛXÞK›ØÙY\™KÝ[™\™ÝZY[[™H‹ˆ‘
HÝZY[[™KÝ[™\™›ØÙY\™KÛXÞH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHÛXÞKÝ[™\™›ØÙY\™KÝZY[[™JŠ‹——Šˆ
Š•HÜš]\š[Û‹œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆÈÛ\ÜÚYžHHÛÝ™\›˜[˜ÙHØÝ[Y[È›ÝÛÚÈ]H]HÛˆHÛÝ™\‹ÚXÚÙ[ˆY\Ëˆ[œÝÙ\ˆÛÈ]Y\Ý[ÛœÈ[œÝXYˆ
Š•ÚXÚ]Y\Ý[ÛˆÙ\ÈH^[œÝÙ\ÊŠˆ[™
Šš\È]X[™]ÜžHÜˆYš\ÛÜžOÊŠ—Šˆ
Š•ÚH]\ÈÛÜœ™XÝØÝ[Y[žHØÝ[Y[ŠŠ—ˆ
ˆ
Š‘š\œÝOˆÛXÞKŠŠˆ][œÝÙ\œÈH
Ú]
ˆ[™H
ÚJ‹]\ÈÚÜ]\ÈÚYÛ™YžHH
ŠÜÙˆHÜ™Ø[š^˜][ÛŠŠˆ[™]\ÈÛÜ™YÚ]Ý]˜[Z[™È[žHXÚ›ÛÙÞKˆ]XœÝ˜XÝ[Ûˆ\È^XÝHÚ]XZÙ\È]\˜X›Nˆ]Ú[Ý[ÛÚ[ˆH”ˆ\È™\XÙYžHÛÛY][™È[ÙK—ˆ
ˆ
Š”ÙXÛÛ™OˆÝ[™\™ŠŠˆ][œÝÙ\œÈH
Ú]Ú]
Žˆ]XÚÜÈ›ÝØÛÛ™\œÚ[Ûˆ[™[ÛÜš]\Ë[™]\È
Š˜\ÈX[™]ÜžH\ÊŠˆHÛXÞKˆÛÈÛY\ÈÚ]™H]]Ø^Nˆ]˜[Y\È
ŠœÜXÚYšXÈXÚ›ÛÙÚY\ÊŠˆ[™]\È
Šœ™]š\ÙY]™\žHYX\ŠŠ‹™XØ]\ÙH]]\Ý˜XÚÈÜž\ÙÜ˜\H˜]\ˆ[ˆÛÜœÜ˜]H[[—ˆ
ˆ
Š•\™Oˆ›ØÙY\™KŠŠˆ][œÝÙ\œÈH
šÝÊ‹Ý\žHÝ\Ú][X™\™YØÜ™Y[œÚÝËˆ]È\œÜÙH\ÈÈXZÙH^XÝ][Ûˆ
Šœ™\X]X›JŠˆžH[ž[Û™K[Ø^\È[ˆHØ[YHØ^K—ˆ
ˆ
Š‘›Ý\OˆÝZY[[™KŠŠˆH™\˜ˆÚ]™\È]]Ø^Nˆ]
ŠœÝYÙÙ\ÝÊŠ‹ˆ]\ÈÙ[œÚX›HYšXÙK][ˆ[\ÞYYHÛÛ›™XÝ[™Èœ›ÛHHØY™IÜÈÚKQšHÛÛ[Z]È›È\ØÚ\[˜\žHÙ™™[˜ÙK™XØ]\ÙHHÝZY[[™H\È
Š››Ýš[™[™ÊŠ‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆÝØ\ÈHš\œÝÛÈ[™H\ÝÛËˆHØÝ[Y[ÚYÛ™YžHHÚYYˆ^XÝ]]™H]˜[Y\È›ÈXÚ›ÛÙÞHØ[››Ý™HHÝ[™\™[™[X™\™YØÜ™Y[œÚÝÈØ[››Ý™HHÝZY[[™Nˆ^H\ØÜšX™H[ˆ^XÝ][Û‹›ÝH™XÛÛ[Y[™][Û‹—ˆ
ˆ
ŠÊJŠˆÝØ\ÈÝ[™\™[™›ØÙY\™KˆH\ÝÙˆ\›Z]Y[™›Ü˜šY[ˆ[ÛÜš]\È^Z[œÈ
ŠšÝÊŠˆÈÈ›Ý[™È][ˆ]š^\È
ŠÚXÚ
ŠˆXÚ›ÛÙÚY\È\™H[ÝÙYÚXÚ\ÈHYš[š][ÛˆÙˆHÝ[™\™—ˆ
ˆ
Š‘
JŠˆ[™\ÈHÚÛHY\˜\˜ÚK][™ÈHÛXÞH]H›ÝÛKˆHØÝ[Y[ÚYÛ™Y]HÜ[Ø^\ÈÚ]È
Š˜]HÜ
ŠŽˆ]\ÈHÛ™HHÝ\ˆ™YH\ØÙ[™œ›ÛH[™]\ÝÝ^HÛÛœÚ\Ý[Ú]——Šˆ
Š‘^[H˜\ŠŠˆY[[Üš^™HHY\˜\˜ÚH\ÈHÚZ[ˆÙˆ]Y\Ý[ÛœËˆ
Š”ÛXÞJŠˆH
Ú]
ˆ[™
ÚJ‹X[™]ÜžKÚYÛ™YžHX[˜YÙ[Y[˜[Y\È›ÈXÚ›ÛÙÞHH
Š”Ý[™\™
ŠˆH
Ú]Ú]
‹X[™]ÜžKXÚÜÈHXÚ›ÛÙÞH
Øš™XÝ]™HKŒH\ÝÈ›Ý\Žˆ\ÜÝÛÜ™XØÙ\ÜÈÛÛ›Û\ÚXØ[ÙXÝ\š]K[˜Üž\[ÛŠHH
Š”›ØÙY\™JŠˆH
šÝÊ‹X[™]ÜžKÝ\žHÝ\
Ú[™ÙHX[˜YÙ[Y[Û˜›Ø\™[™ËÛÙ™˜›Ø\™[™Ë^X›ÛÚÜÊHH
Š‘ÝZY[[™JŠˆH
šÝÈ]\È™\ÝÛ™J‹
Šœ™XÛÛ[Y[™Y
Š‹ˆHÛÛ[[Û™\Ý\œ›Üˆ\ÈØ[[™ÈHX[™]ÜžHXÚšXØ[[HH
œÛXÞJŽˆYˆHØÝ[Y[˜[Y\ÈHÜXÚYšXÈXÚ›ÛÙÞK]\ÈH
ŠœÝ[™\™
Š‹Ú]]™\ˆHÛÝ™\ˆØ^\Ëˆ‚ˆKˆMNˆÂˆÜXÎˆ”ÙXÝ\š]H]Ø\™[™\ÜÈ‹ˆØÙ[˜\š[Îˆ‘\š[™ÈH™]šY]ËHÙXÝ\š]HX[˜YÙ\ˆ\ØÛÝ™\œÈ][ˆ]XÚÙ\ˆ™\\™YHYÚHÛÛš[˜Ú[™È\Ú[™ÈØ[\ZYÛˆYØZ[œÝHš[˜[˜ÙH\\Y[ˆ™XÛÛœÝXÝ[™ÈÝË][Y\™Ù\È]]™\žHYXÙHÙˆ[™›Ü›X][Ûˆ\ÙYØ\ÈX›XÈ[™ZÙ[ˆÛ™H]H[YK\›[\ÜÎˆHÛÛ\[žIÜÈ›ØˆY™\È\ÝYH\Ú[™\ÜÈÞ\Ý[H[ˆ\ÙHÚ]]È^XÝ™\œÚ[Û‹[ˆ[\ÞYYHYÜÝYHÝÙÜ˜\ÙˆZ\ˆ\ÚÈÛˆÛØÚX[YYXHÚ]H˜YÙHYÚX›K[™Ý][Ù‹[Ù™šXÙH™\Y\È™]™X[YH˜[Y\Ë›Û\È[™™\Ü[™È[™HÙˆHš[˜[˜ÙHX[Kˆ›ÈÛÛ™šY[X[ØÝ[Y[]™\ˆYHÛÛ\[žKˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ\ØÚ\[™HÛÝ[]™H™YXÙY\È^ÜÝ\™OÈ‹ˆÜ[ÛœÎˆÂˆJH]HÛ\ÜÚYšXØ][Û‹\ÜÚYÛš[™ÈHÛÛ™šY[X[]H]™[È]™\žHØÝ[Y[‹ˆŠHÜ\˜][Û˜[ÙXÝ\š]H
ÔÑPÊK™YXÚ[™ÈHYÙÜ™YØX›HX›XÈ[™›Ü›X][Ûˆ‹ˆÊH]HÜÜÈ™]™[[Ûˆ

K›ØÚÚ[™ÈÙ[œÚ]]™H]Hœ›ÛHX]š[™ÈH\š[Y]\ˆ‹ˆ‘
H[ˆ‘Kš[™[™È[\ÞYY\ÈÈÛÛ™šY[X[]HžHÛÛ˜XÝ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHÜ\˜][Û˜[ÙXÝ\š]H
ÔÑPÊJŠ‹——Šˆ
Š•HÛÛ˜Ù\œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆÙH\™H\ÙYÈ›ÝXÝ[™ÈÚ]\È
Š˜Û\ÜÚYšYY
Š‹]\ËÙXÜ™]ËˆÔÑPÈÝ\Èœ›ÛHHY™™\™[[™\ÜÈØš[Ý\ÈØœÙ\˜][ÛŽˆ[ˆY™\œØ\žHØ[ˆ™XÛÛœÝXÝÚ]^H™YY
ŠÚ]Ý]ÝX[[™È[žHÙXÜ™]
Š‹Ú[\HžH
ŠœYXÚ[™ÈÙÙ]\ŠŠˆœ˜YÛY[È][™]šYX[H\™H›ÝÙXÜ™]][ˆH[™Ù\ˆY\È›Ý[ˆ[žHÚ[™ÛH][H][ˆH
Š˜YÙÜ™YØ][ÛŠŠ‹—Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[ÈØ^\ÈÛÈ^XÚ]HHH[™›Ü›X][ÛˆØ\È[X›XË[™]šYX[H\›[\ÜË[™›ÈÛÛ™šY[X[ØÝ[Y[YHÛÛ\[žKˆ]\È^XÝHHØ\ÙHÔÑPÈY™\ÜÙ\Ëˆ]È›ØÙ\ÜÈ
Y[YžHÜš]XØ[[™›Ü›X][Û‹[˜[^™H™X]È[™[™\˜Xš[]Y\Ë\ÜÙ\ÜÈHš\ÚË\HÛÝ[\›YX\Ý\™\ÊHÛÝ[]™H›Û\YH]Y\Ý[ÛˆÙˆÚ]H
ŠœX›XÈÚ[›™[ÊŠˆ™]™X[ˆ›ØˆY™\È˜[Z[™È›ÙXÝÈ[™™\œÚ[ÛœËÝÙÜ˜\ÈÚ]YÚX›H˜YÙ\È[™ØÜ™Y[œË]]Ë\™\Y\È^ÜÚ[™ÈHÜ™ÈÚ\ˆHÛÝ[\›YX\Ý\™\È\™H][™[™HÛ˜ÙHHšYÚ]Y\Ý[Ûˆ\È\ÚÙYˆY™\È\ØÜšXš[™ÈÚÚ[ÈÚ]Ý]˜[Z[™È™\œÚ[ÛœË[\ÈX›Ý]ÝÙÜ˜\È[ˆHÙ™šXÙK]]Ë\™\Y\ÈÚ[[™ÈÈHX[HXZ[›Þ˜]\ˆ[ˆH\œÛÛ‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJH]HÛ\ÜÚYšXØ][ÛŽŠŠˆ\ÜÚYÛœÈHÛÛ™šY[X[]H]™[È
Š™ØÝ[Y[ÊŠˆ[™ÛÝ™\›œÈÝÈ^H\™H[™Yˆ\™KÝYÚ›ÈØÝ[Y[Ø\ÈZ\Ú[™YˆH[™›Ü›X][ÛˆØ\È™]™\ˆÛ\ÜÚYšXX›K™XØ]\ÙHHÛÛ\[žH
ŠœX›\ÚY][X™\˜][JŠ‹ˆÛ\ÜÚYšXØ][Ûˆ\È›Ý[™ÈÈXÝÛ‹—ˆ
ˆ
ŠÊHŠŠˆ[\˜Ù\ÈÙ[œÚ]]™H]H][\[™ÈÈ
Š›X]™HH\š[Y]\ŠŠ‹žH[XZ[Ûˆ™[[Ý˜X›HYYXHÜˆÈHÛÝYˆ›Ý[™ÈY[\›Ü\›H[ˆ\ÈØÙ[˜\š[ÎˆH›ØˆY™\[™[ˆÝ][Ù‹[Ù™šXÙH™\H\™HYÚ][X]K[[™YÛÛ[][šXØ][ÛˆÚ[›™[È]\È›È™X\ÛÛˆÈ›ØÚË—ˆ
ˆ
Š‘
H‘NŠŠˆš[™È[ÜHÈÛÛ™šY[X[]H
Š˜žHÛÛ˜XÝ
Šˆ[™š]\ÈÚ[ˆÛÛY[Û™H\ØÛÜÙ\ÈÚ]^HÚÝ[]™HÙ\]ZY]ˆ›Ø›ÙHœ™XXÚY[ˆØ›YØ][Ûˆ\™Nˆ[ˆ[\ÞYYHÝÙÜ˜\[™ÈZ\ˆÝÛˆ\ÚÈ\È›Ý\ØÛÜÚ[™ÈHÙXÜ™][™HÛÛ˜XÝÛÝ[›Ý]™HÝÜY[K——Šˆ
Š‘^[H˜\ŠŠˆ[H›Ý\ˆ\\žH
ŠÚ]^HXÝÛŠŠ‹ˆ
Š“ÔÑPÊŠˆHÛˆ
ŠœX›XËYÙÜ™YØX›JŠˆ[™›Ü›X][Û‹™YXÚ[™ÈÚ]HÜ™Ø[š^˜][ÛˆX]™\ÈZ[™È\›Ý[™H
ŠÛ\ÜÚYšXØ][ÛŠŠˆHÛˆ
Š™ØÝ[Y[ÊŠ‹\ÜÚYÛš[™È]™[È[™[™[™È[\ÈH
Š‘
ŠˆHÛˆ
Š›Ý]›Ý[™˜Y™šXÊŠ‹›ØÚÚ[™ÈÚ]]\Ý›ÝX]™HH\š[Y]\ˆH
Š“‘JŠˆHÛˆ
Šœ[ÜJŠ‹Ü™X][™ÈHYØ[]HÙˆÛÛ™šY[X[]KˆÙYHÔÑPÈ\ÈH™]™\œÙHÙˆ
Š“ÔÒS•
ŠŽˆÔÒS•Ø]\œÈÚ]]™\ˆX›XÈX]\šX[^\ÝÈX›Ý]H\™Ù]ÔÑPÈ™YXÙ\ÈHX›XÈX]\šX[H\™Ù][ÝÜÈÈ^\ÝˆÚ[ˆHØÙ[˜\š[È[œÚ\ÝÈ]
Š››Ý[™ÈÛÛ™šY[X[Y
Š‹H[œÝÙ\ˆ\È[[ÜÝ[Ø^\ÈÔÑPËˆ‚ˆKˆMŽˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHÛÛ\[žH\ÈX›Ý]ÈÚYÛˆ[ˆ[™ØYÙ[Y[Ú][ˆ^\›˜[š\›H›Üˆ[ˆÙ™™[œÚ]™H[™]˜][Ûˆ\ÝYØZ[œÝ]È›ÙXÝ[ÛˆÞ\Ý[\ËˆHÙXÝ\š]HX[˜YÙ\ˆØ[ÈHÛÛ˜XÝX[ØÝ[Y[È]›ÚY›ÝHš\ÚÈÙˆ[ˆ[˜YÜ™YYÙ\šXÙHÝ]YÙH[™Hš\ÚÈÙˆH\Ý\œÈ™Z[™ÈYØ[H^ÜÙYˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚØÝ[Y[Ù\™\È\È\œÜÙK[™Ú]]\Ý]Ù]Ý]È‹ˆÜ[ÛœÎˆÂˆJHHÙ\šXÙH]™[YÜ™Y[Y[
ÓJKÙ][™ÈH™\Ü[]™\žHXY[™\È[™[˜[Y\È›Üˆ][™\ÜÈ‹ˆŠHH›Û‹Y\ØÛÜÝ\™HYÜ™Y[Y[
‘JKš[™[™ÈH\Ý\œÈ›ÝÈ\ØÛÜÙHÚ]^Hš[™\š[™ÈH[™ØYÙ[Y[‹ˆÊHH[\ÈÙˆ[™ØYÙ[Y[Ù][™ÈØÛÜK[YHÚ[™ÝË›ÚXš]YXÝ[ÛœÈ[™[ˆ\ØØ[][ÛˆÛÛXÝ‹ˆ‘
HHš[˜[™\ÜØÝ[Y[[™ÈY\ˆH˜XÝÚ]Ø\ÈÛ™H[™Ú]ÚXÚÛÛÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHH[\ÈÙˆ[™ØYÙ[Y[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH[\ÈÙˆ[™ØYÙ[Y[\™HHØÝ[Y[]\›œÈ[ˆ[\Ú[Ûˆ[È[ˆ
Š˜]]Üš^™Y
ŠˆXÝ]š]KˆÚ]Ý][HHØ[YHXÝ[ÛœÈÛÝ[™HÜš[Z[˜[Ù™™[˜Ù\Ë[™H^ÜÝ\™H[œÈ›ÝØ^\ÎˆH\Ý\ˆš\ÚÜÈ›ÜÙXÝ][Û‹HÛY[š\ÚÜÈ[ˆÝ]YÙH›Ø›ÙH[›™Y›Ü‹—Šˆ
Š•Ú]^H]\ÝÙ]Ý]Ú[žHÚ[ŠŠ—ˆ
ˆ
Š”ØÛÜJŠˆ8 %ÚXÚY™\ÜÙ\ËÚXÚÛXZ[œËÚXÚ\XØ][ÛœËˆ[™X›Ý™H[Ú]\È
Š›Ý]ÙŠŠˆØÛÜNˆ\™\\HÞ\Ý[\ËH›ÝšY\‰ÜÈÛÝYÙ\šXÙ\ËÛÚØ[ZÙHÛXZ[œÈ›ÝÝÛ™YžHHÛÛ\[žK—ˆ
ˆ
Š•[YHÚ[™ÝÊŠˆ8 %Ú[ˆÛÜšÈX^HZÙHXÙKˆÛˆ›ÙXÝ[ÛˆÞ\Ý[\È\È\ÈHÛ]\ÙH]›ÝXÝÈH\Ú[™\ÜÎˆ›È\Ý[™È\š[™Èš[˜[˜ÚX[ÛÜÙK›È›Ú\ÞHXÝ]š]H[ˆÛÜšÚ[™ÈÝ\œË—ˆ
ˆ
Š”›ÚXš]YXÝ[ÛœÊŠˆ8 %\XØ[H[šX[ÙˆÙ\šXÙK[ÙYžZ[™ÈÜˆ[][™È™X[]KÛØÚX[[™Ú[™Y\š[™ÈYØZ[œÝÝY™ˆ[›\ÜÈ^™\ÜÛHYÜ™YY^Ú]ÈÛ›ÝÛˆÈ\ÝXš[^™HHÞ\Ý[K—ˆ
ˆ
Š‘\ØØ[][ÛˆÛÛXÝ
Šˆ8 %H˜[YY\œÛÛˆ™XXÚX›H][žH[YK[ˆ›Ý\™XÝ[ÛœÎˆYˆH\Ý\ˆØ]\Ù\È[ˆÝ]YÙKÜˆYˆ^Hš[™HÛÛ\›ÛZ\ÙH
Š˜[™XYH[ˆ›ÙÜ™\ÜÊŠˆ[™]\ÝÝÜ[™™\Ü]—ˆ
ˆ
Š‘]H[™[™ÊŠˆ8 %Ú]\[œÈÈHÜ™Y[X[È[™]HÛÛXÝYˆÝÈ^H\™HÝÜ™Y›ÜˆÝÈÛ™Ë[™ÝÈ^H\™H\Ý›ÞYY]H[™ÙˆH[™ØYÙ[Y[—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHHÓJŠˆÛÝ™\›œÈH]X[]HÙˆHÙ\šXÙH[]™\žNˆXY[™\Ë]˜Z[Xš[]K[˜[Y\Ëˆ]]]Üš^™\È›ÈXÚšXØ[XÝ[Ûˆ[™›ÝXÝÈ›È›ÙXÝ[ÛˆÞ\Ý[K—ˆ
ˆ
ŠŠHH‘JŠˆ\È™XÙ\ÜØ\žH8 %H\Ý\ˆÚ[ÙYHÛÛ™šY[X[[™›Ü›X][Ûˆ[™H[™\˜Xš[]Y\È›Ý[™\™HÙ[œÚ]]™HX]\šX[8 %]]ÛÝ™\œÈ
Š˜ÛÛ™šY[X[]JŠ‹›Ý]]Üš^˜][ÛˆÜˆÜ\˜][Û˜[[Z]Ëˆ›ÝØÝ[Y[È\™HÚYÛ™YÈ™Z]\ˆ™\XÙ\ÈHÝ\‹—ˆ
ˆ
Š‘
HHš[˜[™\Ü
ŠˆØÝ[Y[È[™ÜÈY\ˆ^H\™HÛ™Kˆ›ÈÝXœÙ\]Y[ØÝ[Y[Ø[ˆ™]›ØXÝ]™[H]]Üš^™HÚ]\È[™XYH\[™Y—Šˆ
ŠH˜XÝXØ[›ÝNŠŠˆ
Šœ\ÚXØ[
Šˆ\ÝÈYH]\ˆÈ™H›ÙXÙYYˆH\Ý\ˆ\ÈÝÜYÙ[ˆØ[YH
™Ù]Ý]Ùˆ˜Z[]\Š‹Ø\œžZ[™ÈH\Ý\œÉÈ˜[Y\ËH]]Üš^™YØÛÜH[™HÛY[ÛÛXÝÈØ[›Üˆ™\šYšXØ][Û‹ˆ‚ˆKˆMÎˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[Îˆ]H˜[šËHXYÙˆ[\›˜[]Y]™\ÜËÛˆHÜ™Ø[š^˜][ÛˆÚ\ÈH\™XÝÜˆÙˆ[™›Ü›X][ÛˆÞ\Ý[\ËÚÈ\È[ÛÈHÝÛ™\ˆÙˆHUÛÛ›ÛÈ]]Y]\ÈYX[È™\šYžKˆ[ˆH]\ÝÞXÛK™YHš[™[™ÜÈÛˆš]š[YÙYXØÙ\ÜÈX[˜YÙ[Y[Ù\™HÝÛ™Ü˜YYœ›ÛHYÚÈYY][HY\ˆHÛÛ™\œØ][Ûˆ™]ÙY[ˆHÛË[™™]™\ˆ™XXÚYH›Ø\™ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÝXÝ\˜[ÛÝ™\›˜[˜ÙHY™XÝÙ\ÈHØÙ[˜\š[È\ØÜšX™K[™ÝÈ\È]ÛÜœ™XÝYÈ‹ˆÜ[ÛœÎˆÂˆJHXÚÈÙˆÙ\\˜][ÛˆÙˆ]Y\È™]ÙY[ˆÜÙHÚÈYZ[š\Ý\ˆHÞ\Ý[\È[™ÜÙHÚÈX[˜YÙHZ\ˆXØÙ\ÜÈ‹ˆŠHXœÙ[˜ÙHÙˆHš\ÚÈ™YÚ\Ý\‹ÚXÚÛÝ[]™HXYHHÝÛ™Ü˜Y[™ÈÙˆHš[™[™ÜÈ˜XÙXX›H‹ˆÊHÜÜÈÙˆ[\›˜[]Y][™\[™[˜ÙNˆH[˜Ý[Ûˆ]\Ý™\ÜÈH›Ø\™	ÜÈ]Y]ÛÛ[Z]YH‹ˆ‘
H[œÝY™šXÚY[˜Z[š[™ÈÙˆ[\›˜[]Y]ÜœÈÛˆš]š[YÙYXØÙ\ÜÈX[˜YÙ[Y[‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÜÜÈÙˆ[\›˜[]Y][™\[™[˜ÙJŠ‹——Šˆ
Š•Hš[˜Ú\Kœ›ÛHš\œÝš[˜Ú\\ÎŠŠˆ[ˆ]Y]\ÈÛÜ^XÝH\È]XÚ\È]È
Šš[™\[™[˜ÙJŠ‹ˆYˆH\œÛÛˆ]Y][™È™\ÜÈÈH\œÛÛˆ™Z[™È]Y]YHÜ[š[Ûˆ\ÈÛÛ\›ÛZ\ÙY]ÛÝ\˜ÙH8 %›Ý™XØ]\ÙH[ÜH\™H\ÚÛ™\Ý]™XØ]\ÙHHÝXÝ\™HXÙ\ÈH]Y]Üˆ[ˆHÜÚ][ÛˆÙˆ]š[™ÈÈÛÛ˜YXÝZ\ˆÝÛˆÝ\\š[Üˆ[ˆÜ™\ˆÈÈZ\ˆ›Ø‹ˆHØÙ[˜\š[ÈÚÝÜÈ™XÚ\Ù[HH™YXÝX›HÝ]ÛÛYNˆš[™[™ÜÈÝXÚ[™ÈHÝ\\š[Ü‰ÜÈ\™XHÛÙ[‹[™™]™\ˆ˜]™[\Ø\™—Šˆ
Š•HÛÜœ™XÝ[ÛŽŠŠˆH[\›˜[]Y][˜Ý[Ûˆ™\ÜÈÈH›Ø\™	ÜÈ
Š˜]Y]ÛÛ[Z]YJŠ‹XYH\Ùˆ\™XÝÜœÈÝ]ÚYHX[˜YÙ[Y[	ÜÈÚZ[ˆÙˆÛÛ[X[™ˆHÛÛ[Z]YH\›Ý™\ÈH]Y][‹™XÙZ]™\ÈH™\ÜËÚXÚÜÈ]š[™[™ÜÈ\™HÙ[Z[™[H
Š˜ÛÜÙY
Šˆ˜]\ˆ[ˆY\™[HXØÙ\Y[™\Ú[ÈÜˆ™[[Ý™\ÈHXYÙˆ]Y]ˆ[ˆYZ[š\Ý˜]]™H™\Ü[™È[™HÈX[˜YÙ[Y[X^H™[XZ[ˆ›Üˆ˜XÝXØ[X]\œÎÈH
Š™[˜Ý[Û˜[
Šˆ[™H]\Ý™HÈHÛÛ[Z]YK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHÙ\\˜][ÛˆÙˆ]Y\ÊŠˆ\ÈHÛÝ[™š[˜Ú\H[™X^HÙ[™Hœ™XXÚY[Ù]Ú\™K]]\È›ÝÚ]HØÙ[˜\š[È\ØÜšX™\ÎˆH›Ø›[H\È›ÝÚÈYZ[š\Ý\œÈXØÙ\ÜË]\ÈÚÈYÙ\ÈÜÙHÚÈË—ˆ
ˆ
ŠŠHHš\ÚÈ™YÚ\Ý\ŠŠˆÛÝ[]™HXYHHÝÛ™Ü˜YH˜XÙXX›KÚXÚ\È\ÙY[]ÛÝ[›Ý]™H™]™[Y]ÈØ]\ÙKˆ]\Y\ÈHØÝ[Y[][ÛˆYX\Ý\™HÈHÝXÝ\˜[›Ø›[K—ˆ
ˆ
Š‘
H]Y]Üˆ˜Z[š[™ÊŠˆ\È™\ÚYHHÚ[ˆHš[™[™ÜÈY™Y[ˆY[YšYYÛÜœ™XÝKˆ^HÙ\™HÝÛ™Ü˜YY
Š˜Y\Ø\™ÊŠ‹[™]\ÈH\ÜÝYK—Šˆ
Š’ÙY\\\ŠŠˆH
Š˜]Y]ÛÛ[Z]YJŠˆ™\šYšY\È]Ú]\ÈÛZ[YYX]Ú\ÈÚ]\[œË[™Ú]ÈÛˆH›Ø\™ˆH
ŠœÙXÝ\š]HÝY\š[™ÈÛÛ[Z]YJŠˆ[YÛœÈHÙXÝ\š]HÝ˜]YÞHÚ]\Ú[™\ÜÈ™YYË[™\ÈXYH\Ùˆ^XÝ]]™\Èœ›ÛH\Ú[™\ÜÈ[˜Ý[ÛœËˆÛÈ›ÙY\ÈÚ]Y™™\™[\œÜÙ\Ë[™H^[HÙ[ˆ]È[H[ˆHØ[YHÜ[Ûˆ\Ýˆ‚ˆKˆMŽˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆZXYÙˆHÝ\\š\ÛÜžH]]Üš]IÜÈ[›X[[œÜXÝ[Û‹YH[ˆ›Ý\ˆ[ÛËHÛÛ\X[˜ÙHÙ™šXÙ\ˆÙˆHš[˜[˜ÚX[[œÝ]][ÛˆØ[ÈÈY[YžH[ˆY˜[˜ÙH[žHØ\ÈYØZ[œÝX[™]ÜžH™\]Z\™[Y[ËÛÈ^HØ[ˆ™HÛÜœ™XÝY™Y›Ü™H^H[™\ÛˆH™XÛÜ™ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚXÝ]š]HYY]È\È™YY[™Ú]\È]ÈXÚÛ›ÝÛYÙY[Z]][ÛÈ‹ˆÜ[ÛœÎˆÂˆJHHÙ[‹X\ÜÙ\ÜÛY[YØZ[œÝH™\]Z\™[Y[Îˆ\ÙY[\È™\\˜][Û‹]XÚÚ[™È[™\[™[˜ÙH‹ˆŠH[ˆ^[Z[˜][ÛˆÛÛ™XÝYX\›HžHH]]Üš]KÚXÚÛÝ[Ú]™HH™X[Ý]ÛÛYH[ÛÈ[ˆY˜[˜ÙH‹ˆÊHH\™\\H]\Ý][Û‹ÚXÚ™\XÙ\ÈH[œÜXÝ[ÛˆžH[[ÛœÝ˜][™ÈÛÛ\X[˜ÙH[™XYH\ÝX›\ÚY‹ˆ‘
H[ˆ[šÛ›ÝÛ‹Y[š\›Û›Y[[™]˜][Ûˆ\ÝÚXÚ™\šYšY\È[ˆ˜XÝXÙH]HX[™]ÜžHÛÛ›ÛÈÛ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHHÙ[‹X\ÜÙ\ÜÛY[
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆÙ[‹X\ÜÙ\ÜÛY[^\ÝÈ›Üˆ^XÝH\È8 %š[™[™ÈØ\È
ŠÚ[H^H\™HÚX\
Š‹ˆHš[™[™È\ØÛÝ™\™Y[‹ZÝ\ÙH\Èš^Y]ZY]NÈHØ[YHš[™[™È\ØÛÝ™\™YžHHÝ\\š\ÛÜˆÛÙ\ÈÛˆH™XÛÜ™™\]Z\™\ÈH›Ü›X[[ˆÚ]XY[™\È[™[ˆH™YÝ[]YÙ][™ËØ[ˆXYÈš[™[™È™\]Z\™[Y[Ëˆ]\È[ˆžHÛÛ\\š[™ÈHXÝX[Ý]HYØZ[œÝ[ˆ^\›˜[™Y™\™[˜ÙH8 %H™\]Z\™[Y[ÈÙˆH™YÝ[][Û‹H™[˜ÚX\šËHœ˜[Y]ÛÜšÈÝXÚ\ÈH’TÕÔÑˆ8 %[™ØÝ[Y[[™È]™\žHØ\Ú][ˆÝÛ™\ˆ[™H]K—Šˆ
Š•H[Z]][Û‹ÚXÚH]Y\Ý[Ûˆ\ÚÜÈ›Üˆ^XÚ]NŠŠˆ]XÚÜÈ
Šš[™\[™[˜ÙJŠ‹ˆÚÙ]™\ˆ\ÜÙ\ÜÙ\ÈZ\ˆÝÛˆÛÜšÈ\È[ˆ[\™\ÝÝÙ]™\ˆ[š[[[Û˜[[ˆYÚ[™È][šY[K[™[™È›ÝÈÛÚÈÚ\™H^HÝ\ÜXÝ^HÛÝ[š[™ÛÛY][™Ëˆ]\ÈÚHÙ[‹X\ÜÙ\ÜÛY[Ù\È
Š››Ý™\XÙJŠˆ[\›˜[]Y]Üˆ\™\\H]\Ý][ÛŽˆ]
Šœ™\\™\ÊŠˆ›Üˆ[K—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ[ˆ^[Z[˜][Ûˆ\È™Z]\ˆ™\]Y\ÝY›Üˆœ›ÝYÚ›ÜØ\™ˆH]]Üš]HXÚY\ÈÚ[ˆÈÛÛ™XÝ][™Ú]Ú]ØÛÜKˆHÜ[Ûˆ\ØÜšX™\ÈÛÛY][™È]Ù\È›Ý^\Ý—ˆ
ˆ
ŠÊJŠˆH\™\\H]\Ý][Ûˆ\ÈÝ›Û™È]šY[˜ÙHÈÚÝÈ
Š™\š[™ÊŠˆH[œÜXÝ[Û‹]]Ù\È›Ý™\XÙH]ˆÝ\\š\ÛÜžHÝÙ\ˆ\È›Ý^]\ÝY™XØ]\ÙHHš]˜]H]Y]ÜˆØ]™HH˜]›Ý\˜X›HÜ[š[Û‹—ˆ
ˆ
Š‘
JŠˆH[™]˜][Ûˆ\ÝYX\Ý\™\ÈH
ŠXÚšXØ[
Šˆ™\Ú[Y[˜ÙHÙˆH˜\œ›ÝÈØÛÜKˆÛÛ\X[˜ÙHÚ]X[™]ÜžH™\]Z\™[Y[ÈÛÝ™\œÈ›ØÙ\ÜÙ\ËØÝ[Y[][Û‹›Û\È[™˜Z[š[™Ë›Û™HÙˆÚXÚHXÚšXØ[\Ý™\šYšY\Ë—Šˆ
Š•HY\ˆÈÙY\[ˆZ[™žH[˜Ü™X\Ú[™È[™\[™[˜ÙNŠŠˆ
ŠœÙ[‹X\ÜÙ\ÜÛY[
Šˆ
HÜ™Ø[š^˜][ÛˆÛˆ]Ù[ŠH8¡¤ˆ
Šš[\›˜[]Y]
Šˆ
H[˜Ý[Ûˆ[™\[™[ÙˆHÜ\˜][™È[™K][\›˜[
H8¡¤ˆ
Š\™\\H]Y]Üˆ]\Ý][ÛŠŠˆ
^\›˜[[™ØYÙYžHHÜ™Ø[š^˜][ÛŠH8¡¤ˆ
Š™^[Z[˜][ÛŠŠˆ
^\›˜[ÛˆH]]Üš]IÜÈ[š]X]]™KÚ]HÝÙ\ˆÈ™\]Z\™H[™ÈØ[˜Ý[ÛŠKˆ‚ˆKˆMŽNˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[Îˆ•H›Ø\™ÙˆHX[Y˜XÝ\š[™ÈÛÛ\[žHØ[ÈÈÛ›ÝÈÝÈÛ™È]ÛÝ[ZÙH™Y›Ü™H[ž[Û™H›ÝXÙY[ˆ]XÚÈ[ˆ›ÙÜ™\ÜËˆHÙXÝ\š]HX[H›ÜÜÙ\È›Ý\ˆXÝ]š]Y\Ë[XÚšXØ[HÛÝ[™ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚXÝ]š]H[œÝÙ\œÈH]Y\Ý[ÛˆH›Ø\™\ÚÙYÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ]][XØ]Y[™\˜Xš[]HØØ[ˆXÜ›ÜÜÈHÚÛH\š[Y]\‹™\X]YÙYZÛH‹ˆŠHHÛÛ\X[˜ÙH]Y]YØZ[œÝHÛÛ˜XÝX[™\]Z\™[Y[ÈÙˆHXZ[ˆÝ\ÝÛY\œÈ‹ˆÊH[ˆÙ™™[œÚ]™H[™]˜][Ûˆ\Ý[ˆÚ]Ý]›ÝYžZ[™ÈHY™[œÙHX[KYX\Ý\š[™È]XÝ[Ûˆ[Y\È‹ˆ‘
HHÙ[‹X\ÜÙ\ÜÛY[ÙˆHÛÛ›ÛÈYØZ[œÝH™Y™\™[˜ÙHÒTÈ™[˜ÚX\šÈ‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊH[ˆÙ™™[œÚ]™H[™]˜][Ûˆ\Ý[ˆÚ]Ý]›ÝYžZ[™ÈHY™[œÙHX[JŠ‹——Šˆ
Š•Ú]Ø\ÈXÝX[H\ÚÙYŠŠˆ›Ý
ÚXÚ[™\˜Xš[]Y\ÈÈÙH]™J‹]
ŠšÝÈÛ™È™Y›Ü™HÙH›ÝXÙJŠ‹ˆ]\ÈH]Y\Ý[ÛˆX›Ý]
Š™]XÝ[Ûˆ[™™\ÜÛœÙHØ\Xš[]JŠ‹›ÝX›Ý]]XÚÈÝ\™˜XÙKˆÛ›H[ˆXÝ]š]H]Ú[][]\ÈH™X[]XÚÈÚ[HHY™[™\œÈÛÜšÈ[˜]Ø\™HØ[ˆYX\Ý\™H]—Šˆ
Š•ÚHH\Ý]\Ý™H[ˆÚ]Ý]H›YHX[IÜÈÛ›ÝÛYÙNŠŠˆYˆHY™[™\œÈÛ›ÝË^H˜Z\ÙHZ\ˆ][[Û‹[™Ú]\ÈYX\Ý\™Y\È›ÈÛ™Ù\ˆÜ™[˜\žH]XÝ[Ûˆ[YH]]XÝ[Ûˆ[YHÛˆ[\ˆH™\Ý[[™È[X™\ˆÛÝ[™HÜ[Z\ÝXÈ[™\Ù[\ÜËˆHÛÛœÝ˜Z[\È]
Š›X[˜YÙ[Y[
Šˆ]\ÝÛ›ÝÈ[™]]Üš^™H][ˆÜš][™ËÚ]ØÛÜK[YHÚ[™ÝÈ[™[\ÈÙˆ[™ØYÙ[Y[Yš[™YˆH
œ™YX[JˆÜ\˜]\ÈÚ]Ý]HY™[™\œÉÈÛ›ÝÛYÙK™]™\ˆÚ]Ý]HÜ™Ø[š^˜][Û‰ÜË—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJHH[™\˜Xš[]HØØ[ŠŠˆ\ÝÈÛ›ÝÛˆÙXZÛ™\ÜÙ\Ëˆ]\È[™\Ü[œØX›K]]›ÙXÙ\È›È]™[›Üˆ[ž[Û™HÈ]XÝˆ][œÝÙ\œÈ
Ú\™H\™HÙH^ÜÙY
‹›Ý
™ÈÙH›ÝXÙJ‹—ˆ
ˆ
ŠŠHHÛÛ\X[˜ÙH]Y]
Šˆ™\šYšY\È]H™\]Z\™YÛÛ›ÛÈ^\Ý[™\™HØÝ[Y[Yˆ[ˆÜ™Ø[š^˜][ÛˆØ[ˆ™H[HÛÛ\X[[™Ý[ZÙHÙYZÜÈÈ›ÝXÙH[ˆ[\Ú[Û‹—ˆ
ˆ
Š‘
HÙ[‹X\ÜÙ\ÜÛY[YØZ[œÝH™[˜ÚX\šÊŠˆYX\Ý\™\ÈÛÛ™šYÝ\˜][ÛˆšYœ›ÛHHÝ[™\™ˆYØZ[Žˆ][È[ÝHÝÈHÞ\Ý[H\ÈÙ]\›ÝÚ]\[œÈÚ[ˆÛÛYX›ÙH]XÚÜË—Šˆ
Š•H›Ý\ˆ[Ù\È[ˆØš™XÝ]™HKKÈ™HÛ\\ŠŠˆ
Š›Ù™™[œÚ]™JŠˆ

œ™YX[J‹]XÚÜÊH0­È
Š™Y™[œÚ]™JŠˆ

˜›YHX[J‹]XÝÈ[™™\ÜÛ™ÊH0­È
Šš[YÜ˜]Y
Šˆ

œ\œHX[J‹HÛÈÛÜšÈÙÙ]\ˆ[ˆHÜ[‹\›š[™È]™\žHXÚš\]YH[ÈH]XÝ[ÛŠH0­È
Šœ\ÚXØ[
Šˆ
\ÝÈXØÙ\ÜÈÈZ[[™ÜÈ[™›ÛÛ\ÊKˆYˆHØÙ[˜\š[È\ÚÜÈ[ÝHÈ
Š›YX\Ý\™JŠˆ]XÝ[Û‹[ÝH™YYH[˜[››Ý[˜ÙYÙ™™[œÚ]™H\ÝÈYˆ]\ÚÜÈ[ÝHÈ
Šš[\›Ý™JŠˆ]]ZXÚÛKH[YÜ˜]YÛ™Kˆ‚ˆKˆMÌˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆH\Ý\ˆØÝ[Y[ÈHš\œÝ^IÜÈXÝ]š]HÛˆ[ˆ[™ØYÙ[Y[ˆ^H]Y\šYYHÛY[	ÜÈX›XÈÛXZ[ˆ™YÚ\ÝžKÛÛœÝ[YÙ\YšXØ]H˜[œÜ\™[˜ÞHÙÜÈÈ[[Y\˜]HÝX™ÛXZ[œËÜ[™YHÛÛ\[žIÜÈX›XÈÙXœÚ]H[™ÝÛ›ØYYÛÛYHˆØÝ[Y[ÈÈ^[Z[™HZ\ˆY]Y]K[™Ù[H]Y\žHÈHÛY[	ÜÈ]]Üš]]]™H”ÈÙ\™\ˆÈÚXÚÈHV™XÛÜ™Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÙˆ\ÙHXÝ]š]Y\È˜[Ý]ÚYH\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙK[™ÚOÈ‹ˆÜ[ÛœÎˆÂˆJH›Û™Nˆ[H[™›Ü›X][ÛˆØ]\™YØ\ÈX›XÛHXØÙ\ÜÚX›H‹ˆŠHHÙXœÚ]Hš\Ú][™H]Y\žHÈH]]Üš]]]™H”ÈÙ\™\‹™XØ]\ÙH›Ý™XXÚHÛY[Þ\Ý[H[™X]™H˜XÙ\ÈÛˆ]‹ˆÊHÛ›HH]Y\žHÈH]]Üš]]]™H”ÈÙ\™\‹™XØ]\ÙHHX›XÈÙXœÚ]H\ÈYX[È™Hš\Ú]YžH[ž[Û™H‹ˆ‘
HÛ›HHˆÝÛ›ØYË™XØ]\ÙH^[Z[š[™ÈY]Y]HÛÙ\È™^[Û™HØÝ[Y[	ÜÈ[[™Y\ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠJŠ‹——Šˆ
Š•H]šY[™È[™H\È›ÝÝÈÛÛ™šY[X[H[™›Ü›X][Ûˆ\Ë]\ÈÚÈ™XÙZ]™\ÈH™\]Y\ÝŠŠˆ™XÛÛ›˜Z\ÜØ[˜ÙH\È
Šœ\ÜÚ]™JŠˆ\ÈÛ™È\È[™›Ü›X][ÛˆÛÛY\Èœ›ÛH
Š\™\Y\ÊŠŽÈ]™XÛÛY\È
Š˜XÝ]™JŠˆH[œÝ[H™\]Y\Ý™XXÚ\ÈH\™Ù]Þ\Ý[K™YØ\™\ÜÈÙˆÚ]\ˆ]Þ\Ý[H\ÈX›XÈ[™H[™›Ü›X][Ûˆš]šX[—Šˆ
Š•H›Ý\ˆXÝ]š]Y\ËÛ™HžHÛ™NŠŠ—ˆ
ˆ
Š‘ÛXZ[ˆ™YÚ\ÝžJŠˆ

ÚÚ\ÊŠH8 %H[œÝÙ\ˆÛÛY\Èœ›ÛHH™YÚ\Ý˜\‹›Ýœ›ÛHHÛY[ˆ
Š”\ÜÚ]™JŠ‹—ˆ
ˆ
ŠÙ\YšXØ]H˜[œÜ\™[˜ÞHÙÜÊŠˆ8 %X›XÈ\™\\H\˜Ú]™\È™XÛÜ™[™È]™\žHÙ\YšXØ]H\ÜÝYYˆHÛY[\È›ÈYXH[ž[Û™H\ÈÛÛœÝ[[™È[Kˆ
Š”\ÜÚ]™JŠ‹[™Û™HÙˆH[ÜÝ›ÙXÝ]™HÛÝ\˜Ù\Ë™XØ]\ÙH]™]™X[È›Ü™ÛÝ[ˆÝX™ÛXZ[œÈ›Ø›ÙH]™\ˆY™\\ÙY—ˆ
ˆ
Š•š\Ú][™ÈHX›XÈÙXœÚ]H[™ÝÛ›ØY[™ÈHœÊŠˆ8 %]™\žH™\]Y\Ý[™È[ˆHÛY[	ÜÈ
ŠÙXˆÙ\™\ˆÙÊŠ‹Ú]TY™\ÜË[Y\Ý[\[™
\Ù\ˆYÙ[
‹ˆ
ŠXÝ]™JŠ‹ÝÙ]™\ˆ\›[\ÜËˆ^[Z[š[™ÈHš[\ÉÈY]Y]KžHÛÛ˜\Ý\[œÈØØ[H[™\È\ÜÚ]™Nˆ]Ø\ÈH
Š™ÝÛ›ØY
Šˆ]Ø\ÈXÝ]™K—ˆ
ˆ
Š”]Y\žHÈHÛY[	ÜÈ]]Üš]]]™H”ÈÙ\™\ŠŠˆ8 %HÙ\™\ˆ™[Û™ÜÈÈHÛY[[™H]Y\žH™XXÚ\ÈZ\ˆ[™œ˜\ÝXÝ\™KX]š[™ÈH˜XÙKˆ
ŠXÝ]™JŠ‹ˆÛÛœÝ[[™ÈHX›XÈ™\ÛÛ™\ˆÜˆH\ÜÚ]™KQ”È\˜Ú]™H[œÝXYÛÝ[]™HÝ^YYÚ][ˆH\ÜÚ]™H\š[Y]\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]ÛÛ™\Ù\È
œX›XÛHXØÙ\ÜÚX›JˆÚ]
œ\ÜÚ]™J‹ˆH[™›Ü›X][ÛˆX^H™H\ÈX›XÈ\È[ÝHZÙNˆYˆØZ[š[™È]YX[œÈÙ[™[™ÈHXÚÙ]ÈH\™Ù][ÝH\™HXÝ[™ÈXÝ]™[K—ˆ
ˆ
ŠÊJŠˆ]\Y\ÈHšYÚÜš]\š[ÛˆÛ›H[Ø^KˆHX›XÈÙXœÚ]H\ÈYX[È™Hš\Ú]Y]]Ý[™XÛÜ™ÈÚÈš\Ú]ÎˆYˆHÛY[\ÚÙY›ÜˆHÙ[Z[™[H[š\ÚX›Hš\œÝ\ÙK]™[ˆ]š\Ú]]\Ý™H]›ÚYYÜˆXYHœ›ÛH[™œ˜\ÝXÝ\™H›Ý˜XÙXX›HÈH\Ý\‹—ˆ
ˆ
Š‘
JŠˆ][™\ÈH\›\ÎˆY]Y]H[˜[\Ú\È\ÈHÛ›H[\™[HØØ[Ý\[™\™Y›Ü™HH[ÜÝ\ÜÚ]™HÙˆH›Ý\‹—Šˆ
Š•ÚHH\Ý[˜Ý[ÛˆX]\œÈ[ˆ˜XÝXÙNŠŠˆH\ÜÚ]™H\ÙH\ÈHÛ™H]Ø[››Ý›ÝÈH[™ØYÙ[Y[ˆœ›ÛHHš\œÝXÚÙ]Ù[H\™Ù]
Š›X^H›ÝXÙJŠ‹[™[ˆH\Ý][ÛÈYX[œÈÈYX\Ý\™H]XÝ[Û‹][ÛY[ÚÝ[™HÚÜÙ[‹›ÝÝ[X›Y[Ëˆ‚ˆKˆMÌNˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][Ûˆ\È[™\ÝYX]š[H[ˆ\š[Y]\ˆXÚšXØ[ÛÛ›ÛÈ]\È™]™\ˆ™\šYšYYÚ]\ˆ[ˆÝ]ÚY\ˆØ[ˆ\ÚXØ[H[\ˆ]ÈÙ™šXÙ\ËˆH›Ø\™]]Üš^™\È[ˆ\ÜÙ\ÜÛY[][˜ÛY\È][\[™ÈÈÙ]\Ý™XÙ\[Û‹È[\ˆH[›ÛÛK[™ÈÛÛ›™XÝH]šXÙHÈH[\›˜[™]ÛÜšËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[™]˜][Ûˆ\Ý[™È[ÙH\È™Y[ˆ]]Üš^™YÈ‹ˆÜ[ÛœÎˆÂˆJH[ˆ[šÛ›ÝÛ‹Y[š\›Û›Y[
›XÚÈ›Þ
H\Ý™XØ]\ÙHH\Ý\ˆÙ\È›ÝÛ›ÝÈHZ[[™È^[Ý]‹ˆŠHH\ÚXØ[\Ý™XØ]\ÙHHØÛÜHÙˆH\ÜÙ\ÜÛY[\ÈHXØÙ\ÜÈÛÛ›ÛÈÈH™[Z\Ù\È‹ˆÊH[ˆ[YÜ˜]Y
\œHX[JH\Ý™XØ]\ÙH][›Û™\È›ÝÙXÝ\š]HÝY™ˆ[™™XÙ\[ÛˆÝY™ˆ‹ˆ‘
HHY™[œÚ]™H
›YHX[JH\Ý™XØ]\ÙH]YX\Ý\™\ÈÝY™ˆ™XXÝ[ÛˆÈ[ˆÝ]ÚY\‰ÜÈ™\Ù[˜ÙH‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHH\ÚXØ[\Ý
Š‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆH
Šœ\ÚXØ[[™]˜][Ûˆ\Ý
Šˆ\™Ù]ÈH
Šœ\ÚXØ[ÙXÝ\š]HÛÛ›ÛÊŠˆ8 %™XÙ\[Û‹˜YÙ\Ë\›œÝ[\ËXØÙ\ÜÈÛÛ›Û™\ÝX[\ËØÚÜËšY[ÈÝ\™Z[[˜ÙKÝX\™È[™ÝY™ˆ™Z]š[Ü‹ˆH™YH]]Üš^™YXÝ[ÛœÈ
Ù][™È\Ý™XÙ\[Û‹[\š[™ÈH[›ÛÛKÛÛ›™XÝ[™ÈH]šXÙHÈH™]ÛÜšÊH\ØÜšX™H^XÝH]ØÛÜKˆÛÛ›™XÝ[™ÈH]šXÙH\ÈÚ\™HH\ÚXØ[\ÝÚÝÜÈ]È™X\ÛÛˆ›Üˆ^\Ý[™Îˆ][[ÛœÝ˜]\È]
ŠHš[™\Ý™]ÛÜšÈ\š[Y]\ˆY™[œÙHÛÝ[È›Üˆ›Ý[™ÈYˆH]XÚÙ\ˆØ[ÜÈ[ˆ™Z[™]
Š‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ]ÛÛ™\Ù\ÈÛÈ^\ÈÙˆÛ\ÜÚYšXØ][Û‹ˆ
•[šÛ›ÝÛŠ‹
œ\X[HÛ›ÝÛŠˆ[™
šÛ›ÝÛˆ[š\›Û›Y[
ˆ\ØÜšX™H
ŠšÝÈ]XÚ[™›Ü›X][ÛŠŠˆHÛY[[™ÈH\Ý\ŽÈ
œ\ÚXØ[
‹
›Ù™™[œÚ]™J‹
™Y™[œÚ]™Jˆ[™
š[YÜ˜]Y
ˆ\ØÜšX™H
ŠÚ]
Šˆ\È™Z[™È\ÝYˆH\ÚXØ[\ÝØ[ˆ™H[ˆ[ˆHÛ›ÝÛˆÜˆ[šÛ›ÝÛˆ[š\›Û›Y[ˆÛÈY™™\™[]Y\Ý[ÛœË—ˆ
ˆ
ŠÊHH[YÜ˜]Y\Ý
Šˆ\ÈHÛ™HÚ\™HH]XÚÚ[™È[™Y™[™[™ÈX[\ÈÛÜšÈ
ŠÙÙ]\ˆ[™[ˆHÜ[ŠŠ‹Ú\š[™ÈXÚš\]Y\È[™]XÝ[ÛœÈ[ˆ™X[[YKˆ›ÈÛÛX›Ü˜][Ûˆ™]ÙY[ˆX[\È\È\ØÜšX™Y\™K—ˆ
ˆ
Š‘
HHY™[œÚ]™H\Ý
Šˆ\ÈH
˜›YHX[Jˆ^\˜Ú\ÙKYX\Ý\™YÛˆHXš[]HÈ]XÝ[™™\ÜÛ™ˆ]ÝY™ˆX^H™XXÝÙ\È›Ý\›ˆH\ÝÚÜÙHÝXš™XÝ\È\ÚXØ[˜\œšY\œÈ[ÈHY™[œÚ]™HÛ™K—Šˆ
ŠH˜XÝXØ[ÛÛœÝ˜Z[ÛÜÛ›ÝÚ[™ÎŠŠˆH\ÚXØ[\Ý™\]Z\™\È\XÝ[\›HØ\™Y[Üš][ˆ]]Üš^˜][Ûˆ8 %Ù[ˆH]\ˆÈ™H›ÙXÙYYˆÝÜYÛÛY][Y\ÈØ[YH
™Ù]Ý]Ùˆ˜Z[]\Šˆ8 %™XØ]\ÙHHXÝ[ÛœÈ[›™YÛÝ[Ú]Ý]HX[™]K™HÜš[Z[˜[Ù™™[˜Ù\ËˆØÛÜKÚ]\ËÝ\œË\Ý\ˆ˜[Y\È[™HÚ[ÙˆÛÛXÝ]\Ý™HYÜ™YY™Y›Ü™Z[™[™HÛY[]\Ý]™HH]]Üš]HÈ]]Üš^™HXØÙ\ÜÈÈH™[Z\Ù\È[›Û™Yˆ‚ˆKˆMÌŽˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆHÜÜ][	ÜÈ[˜ÚY[™\ÜÛœÙH[ˆØ\ÈÜš][ˆÛÈYX\œÈYÛÈ[™\È™]™\ˆ™Y[ˆ\ÝYˆX[˜YÙ[Y[Ø[ÈÈ™\šYžHÚ]\ˆ›Û\È\™HÛX\‹Ú]\ˆÛ‹XØ[ÛÛXÝ]Z[È\™HÝ\œ™[[™Ú]\ˆÝY™ˆÛÝ[Û›ÝÈÚ[ˆÈXÛ\™H[ˆ[˜ÚY[8 %Ú]Ý]ÝXÚ[™ÈÛ[šXØ[Þ\Ý[\ÈÜˆÚ[][][™È[žH™X[]XÚËˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ›Ü›HÙˆ\ÜÙ\ÜÛY[YY]È\ÙHÛÛœÝ˜Z[ÏÈ‹ˆÜ[ÛœÎˆÂˆJHHY™[œÚ]™HX›]Ü^\˜Ú\ÙK[ˆÚXÚÝY™ˆ[È›ÝYÚHØÙ[˜\š[ÈÚ]Ý]XÝ[™ÈÛˆHÞ\Ý[\È‹ˆŠH[ˆ[šÛ›ÝÛ‹Y[š\›Û›Y[Ù™™[œÚ]™H[™]˜][Ûˆ\ÝÚ[[™Ú[™ÈHY™[œÙ\ÈÚ]Ý]›ÝXÙH‹ˆÊH[ˆ]][XØ]Y[™\˜Xš[]HØØ[ˆÙˆHÛ[šXØ[Þ\Ý[\ËÈ\ÝX›\ÚÚ\™H[ˆ]XÚÈÛÝ[Ý\‹ˆ‘
HHÛÛ\X[˜ÙH]Y]ÙˆH[˜ÚY[™\ÜÛœÙH[ˆYØZ[œÝHÙXÝÜ‰ÜÈ™YÝ[]ÜžH™\]Z\™[Y[È‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJHHY™[œÚ]™HX›]Ü^\˜Ú\ÙJŠ‹——Šˆ
Š•ÚH]	ÜÈÛÜœ™XÝŠŠˆHØÙ[˜\š[ÈÙ]È™YHÛÛœÝ˜Z[Ë[™Û›HÛ™HÙˆH›Ý\ˆ[œÝ[Y[ÈYY]È[H[ˆHZ[H\ÈÈ\Ý
Š™XÚ\Ú[ÛœË›Û\È[™ÛÛXÝ]Z[ÊŠˆ8 %H
Š™Y™[œÚ]™JŠˆÚYK›ÝXÚšXØ[™\Ú[Y[˜ÙNÈ
Š˜Û[šXØ[Þ\Ý[\ÊŠˆ]\Ý›Ý™HÝXÚYÚXÚ[\ÈÝ][žHXÝ]š]HÛˆ™X[Þ\Ý[\ÎÈ[™›È]XÚÈ\ÈÈ™HÚ[][]YˆHX›]Ü^\˜Ú\ÙHÙ\È™XÚ\Ù[H\ÎˆH[ÜHÚÈÛÝ[]™HÈ™\ÜÛ™Ú]\›Ý[™HX›KH˜XÚ[]]Üˆ™\Ù[ÈHØÙ[˜\š[È[ˆÝYÙ\Ë[™]XXÚÝYÙHH]Y\Ý[Ûˆ\È
ž[ÝKšYÚ›ÝËÚ]È[ÝHÈ[™ÚÈÈ[ÝHØ[
‹ˆ]ÛÜÝÈH™]ÈÝ\œËØ\œšY\È›ÈÜ\˜][Û˜[š\ÚË[™Ý\™˜XÙ\ÈÚ]›ÈXÚšXØ[\ÜÙ\ÜÛY[ÛÝ[š[™ˆH›ÛHÛÈ[ÜH›Ý™[Y]™H^HÛHÛ‹XØ[[X™\ˆÙˆÛÛY[Û™HÚÈ\È™]\™YH[˜ÚY[XÛ\˜][Ûˆ™\ÚÛ›Ø›ÙHØ[ˆØ^HÚ\™HÈš[™—Šˆ
Š•Ú\™H]Ú]È[[Û™È\ÜÙ\ÜÛY[[Ù\ÎŠŠˆ]\ÈHX\Ý[˜\Ú]™H[™ÙˆH
Š™Y™[œÚ]™JŠˆ

˜›YHX[JŠHÚYKˆ[Ýš[™È\[ˆ™X[\ÛH[ÝHš[™H
Š™[˜Ý[Û˜[Ú[][][ÛŠŠˆ
H›ØÙY\™H\ÈXÝX[H^XÝ]Y›Üˆ[œÝ[˜ÙHH™\ÝÜ™Hœ›ÛH˜XÚÝ\[ˆHÙ\\˜]H[š\›Û›Y[
H[™H
Š™[\ØØ[JŠˆ\Ý
Ûˆ™X[Þ\Ý[\ÊKÚXÚ[X[™È[ˆÜ\˜][Û˜[š\ÚÈHÜÜ][˜\™[HXØÙ\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠHH[˜[››Ý[˜ÙYÙ™™[œÚ]™H\Ý
ŠˆÛÝ[œ™XXÚÛÈÙˆH™YHÛÛœÝ˜Z[Îˆ]XÝÈÛˆHÞ\Ý[\È[™Ú[][]\ÈH™X[]XÚËˆ[ˆHX[Ø\™HÙ][™È]\È[ÛÈHÜ[ÛˆÚ]HYÚ\Ýš\ÚÈ›Ùš[K—ˆ
ˆ
ŠÊHH[™\˜Xš[]HØØ[ŠŠˆYX\Ý\™\ÈXÚšXØ[^ÜÝ\™K›ÝHXš[]HÈXÚYKˆÛˆÜÙˆ][ˆ]][XØ]YØØ[ˆYØZ[œÝš[ÛYYXØ[\]Z\Y[Ø[ˆ\ÝXš[^™H]ˆX[žHÛ[šXØ[]šXÙ\È™XXÝ˜YH]™[ˆÈÜ™[˜\žHØØ[›š[™È˜Y™šXË—ˆ
ˆ
Š‘
HHÛÛ\X[˜ÙH]Y]
Šˆ™\šYšY\È]H[ˆ
Š™^\ÝÊŠ‹\ÈÛÛ\]H[™YY]ÈH™\]Z\™[Y[Ëˆ\ÙY[]H›Ü›X[H\™™XÝ[ˆØ[ˆÝ[™H[ÛÜšØX›H[ˆ˜XÝXÙNˆH]Y]™XYÈHØÝ[Y[H^\˜Ú\ÙH\ÝÈH[ÜK—Šˆ
Š”™[Y[X™\ŽŠŠˆÚ[ˆHØÙ[˜\š[È\ÚÜÈ[ÝHÈ\Ý
Š˜H[ŠŠˆ˜]\ˆ[ˆ
Š˜HÞ\Ý[JŠ‹H[œÝÙ\ˆ\È[ˆ^\˜Ú\ÙKˆÚ[ˆ][ÛÈØ^\È^XÚ]H›ÝÈ\Ü\Ü\˜][ÛœÈ[™›ÝÈÝXÚHÞ\Ý[\Ë]\ÈH
ŠX›]Ü
Šˆ^\˜Ú\ÙKˆ‚ˆKˆMÌÎˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆH]™[ÜY[ÛÛ\[žH]\Ý]™HH˜[šÚ[™È\XØ][Ûˆ][™\È^[Y[[œÝXÝ[ÛœÈ\ÜÙ\ÜÙYˆHÛY[Ø[ÈH\Ý\ˆÈš[™\ÈX[žH›]ÜÈ\ÈÜÜÚX›H[ˆH]]Üš^˜][ÛˆÙÚXË[˜ÛY[™ÈÛÛ™][ÛœÈ]Û›H\š\ÙHÚ]\XÝ[\ˆÛÛXš[˜][ÛœÈÙˆ›Û\È[™[[Ý[ËÚ][ˆH[‹Y^HYÙ]ˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚ[™ØYÙ[Y[ÚÝ[H\Ý\ˆ™HÚ]™[È‹ˆÜ[ÛœÎˆÂˆJH[šÛ›ÝÛˆ[š\›Û›Y[
›XÚÈ›Þ
K™XØ]\ÙH]˜Z][H™\›ÙXÙ\È[ˆ^\›˜[]XÚÙ\‰ÜÈ\œÜXÝ]™H‹ˆŠH\X[HÛ›ÝÛˆ[š\›Û›Y[
Ü™^H›Þ
K™XØ]\ÙH]˜[[˜Ù\È™X[\ÛH[™\Ú]Ü™[˜\žK]\Ù\ˆÜ™Y[X[È‹ˆÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
KÚ]XØÙ\ÜÈÈÛÝ\˜ÙHÛÙK\˜Ú]XÝ\™H[™ÛÛ™šYÝ\˜][ÛœÈ‹ˆ‘
H^[™Y\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙK™XØ]\ÙH]ZY[ÈH[ÜÝ[™›Ü›X][ÛˆÚ]Ý]ÛÛœÝ[Z[™ÈYÙ]‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠÊHÛ›ÝÛˆ[š\›Û›Y[
Ú]H›Þ
JŠ‹——Šˆ
Š•HÙ[XÝ[ÛˆÜš]\š[Û‹œ›ÛHš\œÝš[˜Ú\\ÎŠŠˆH™YH[™ØYÙ[Y[È\™H›ÝÜ˜Y\ÈÙˆ]X[]K^H\™H
Š˜YK[Ù™œÈ™]ÙY[ˆ™X[\ÛH[™ÛÝ™\˜YÙJŠ‹ÚÜÙ[ˆXØÛÜ™[™ÈÈH]Y\Ý[Ûˆ[ÝHØ[[œÝÙ\™Y—ˆ
ˆ
Š•[šÛ›ÝÛˆ[š\›Û›Y[

˜›XÚÈ›Þ
ŠJŠˆ8 %H\Ý\ˆ™XÙZ]™\È›Ý[™ËˆX^[][H™X[\ÛKÚ[˜ÙH]™\›ÙXÙ\È[ˆÝ]ÚY\‰ÜÈÜÚ][Û‹]]XÚÙˆH[YH\ÈÜ[Ûˆ™XÛÛ›˜Z\ÜØ[˜ÙK[™Ú]]™\ˆ\È›Ý›Ý[™Ý^\È[™\šYšYY—ˆ
ˆ
Š”\X[HÛ›ÝÛˆ[š\›Û›Y[

™Ü™^H›Þ
ŠJŠˆ8 %H\Ý\ˆ™XÙZ]™\È[Z]Y[™›Ü›X][Û‹\XØ[HÜ™[˜\žK]\Ù\ˆÜ™Y[X[ÈÜˆHYÚ[]™[™]ÛÜšÈXYÜ˜[Kˆ]Ú[][]\ÈHÜÚ][ÛˆÙˆ[ˆ[\ÞYYHÜˆHÝ\ÝÛY\ˆÚ][ˆXØÛÝ[[™\ÈH[ÜÝÛÛ[[ÛˆÛÛ\›ÛZ\ÙK—ˆ
ˆ
Š’Û›ÝÛˆ[š\›Û›Y[

Ú]H›Þ
ŠJŠˆ8 %H\Ý\ˆ™XÙZ]™\È\˜Ú]XÝ\™KÛÛ™šYÝ\˜][ÛœÈ[™
ŠœÛÝ\˜ÙHÛÙJŠ‹ˆZ[š[][H™X[\ÛKX^[][HÛÝ™\˜YÙK—Šˆ
Š•ÚHHØÙ[˜\š[È›Ü˜Ù\ÈH\™ŠŠˆ]\ÚÜÈ›Üˆ
Š˜\ÈX[žH›]ÜÈ\ÈÜÜÚX›JŠˆ[ˆH
Š˜]]Üš^˜][ÛˆÙÚXÊŠ‹[˜ÛY[™ÈÛÛ™][ÛœÈ][Y\™ÙHÛ›HÚ]
Šœ\XÝ[\ˆÛÛXš[˜][ÛœÊŠˆÙˆ›Û\È[™[[Ý[Ë[Ú][ˆ
Š[ˆ^\ÊŠ‹ˆ[ˆ]]Üš^˜][Û‹[ÙÚXÈ›]È\È›Ý›Ý[™žH™Y[ˆ]\È›Ý[™žH
Šœ™XY[™ÈHÛÙJŠˆ]XÚY\ÈÚÈX^H[œÝXÝÚ]ˆ[™HÜXÙHÙˆ›ÛKX[[Ý[ÛÛXš[˜][ÛœÈ\È˜\ˆÛÈ\™ÙH›Üˆ›[™\Ý[™ÈÈÛÝ™\ˆ[ˆ[ˆ^\Ë—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆ™X[\ÛH\È›ÝHØš™XÝ]™H\™NˆHÛY[Ø[ÈÈ
Š™š[™H›]ÜÊŠ‹›ÝYX\Ý\™HÝÈ\™^H\™HÈš[™œ›ÛHÝ]ÚYK—ˆ
ˆ
ŠŠJŠˆ]\ÈHÙ[œÚX›HÚÚXÙH›Üˆ™\šYžZ[™È
Ú][ˆ]][XØ]Y\Ù\ˆØ[ˆÈÚ[ˆžZ[™ÈÈ^ÙYYZ\ˆš]š[YÙ\Ê‹]]Ù\È›Ý[ÝÈHÙÚXÈÈ™H[œÜXÝYˆHYÙHØ\Ù\ÈÛÝ[™[XZ[ˆ\™Ù[H[™^Ü™Y—ˆ
ˆ
Š‘
JŠˆ\ÜÚ]™H™XÛÛ›˜Z\ÜØ[˜ÙH\ÈH
Šœ\ÙJŠˆÙˆH\Ý›Ý[ˆ[™ØYÙ[Y[[™Ûˆ[ˆ\XØ][Ûˆ[™XYHÛ›ÝÛˆÈHÛY[]YÈ™^È›Ý[™Ë—Šˆ
ŠH˜XÝXØ[›ÝNŠŠˆHÛÈ\›ØXÚ\ÈÛÛ\[Y[XXÚÝ\‹ˆ
Š”Ý]XÊŠˆÛÙH[˜[\Ú\È
ÐTÕ
Hš[™ÈÚ]\Èš\ÚX›HžH™XY[™ÎÈ
Š™[˜[ZXÊŠˆ[˜[\Ú\ÈÙˆH[›š[™È\XØ][Ûˆ
TÕ
Hš[™ÈÚ][Y\™Ù\ÈÛ›HžH^XÝ][™È8 %ÚXÚ\ÈÚHHÛ›ÝÛ‹Y[š\›Û›Y[[™ØYÙ[Y[›Ü›X[H[˜ÛY\È›Ýˆ‚ˆKˆMÍˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[ÎˆH[™]˜][Ûˆ\Ý™\Ü\È[]™\™Y\ÈHÚ[™ÛHZYÚK\YÙHØÝ[Y[Ú]H[™\˜Xš[]Y\È\ÝY[ˆÕ”ÔÈØÛÜ™HÜ™\‹ØÜ™Y[œÚÝÈÙˆH›ÛÙœÈ[™HÛÛ[X[™È\ÙYˆ]š[™È™XÙZ]™Y]H›Ø\™[ØØ]\È›ÈYÙ][™\ÚÜÈHÒTÓÈÚ]\ˆHÚ]X][Ûˆ\ÈÙ\š[Ý\Ëˆ‹ˆ]Y\Ý[ÛŽˆ•ÚXÚÚÜÛÛZ[™ÈÙˆH™\Ü^Z[œÈ\ÈÝ]ÛÛYOÈ‹ˆÜ[ÛœÎˆÂˆJHHÜ™\š[™ÈžHÕ”ÔÈØÛÜ™KÚXÚÚÝ[™H™\XÙYžHHÜ™\ˆ[ˆÚXÚH[™\˜Xš[]Y\ÈÙ\™H›Ý[™‹ˆŠHHXœÙ[˜ÙHÙˆ[ˆ^XÝ]]™HÝ[[X\žH˜[œÛ][™ÈHXÚšXØ[š[™[™ÜÈ[È\Ú[™\ÜÈš\ÚÈ‹ˆÊHH™\Ù[˜ÙHÙˆØÜ™Y[œÚÝÈ[™ÛÛ[X[™ËÚXÚXZÙ\ÈHØÝ[Y[ÛÈÛ™ÈÈ™XY‹ˆ‘
HHXÚÈÙˆHÛÛ\\š\ÛÛˆÚ]™]š[Ý\ÈYX\œÉÈ™\ÜËÚXÚÛÝ[]™HÚÝÛˆH™[™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠŠHHXœÙ[˜ÙHÙˆ[ˆ^XÝ]]™HÝ[[X\žJŠ‹——Šˆ
Š•Hš[˜Ú\NŠŠˆH™\Ü\È
ŠÛÈ]YY[˜Ù\ÊŠˆÚ]ÛÈY™™\™[]Y\Ý[ÛœË[™Û™HØÝ[Y[Ø[››Ý[œÝÙ\ˆ›Ý[ˆHØ[YH[™ÝXYÙK—ˆ
ˆH
Š™^XÝ]]™HÝ[[X\žJŠˆ[œÝÙ\œÈ
šÝÈ^ÜÙY\™HÙKÚ]ÈÙHÝ[™ÈÜÙK[™Ú]ÛÝ[]ZÙHÈ™YXÙH]
‹ˆ]\È›Û‹]XÚšXØ[œ˜[YY[ˆ\›\ÈÙˆ\Ú[™\ÜÈ[\XÝ™YÝ[]ÜžHØ›YØ][ÛœÈ[™HÛÜÝÙˆXÝ[™Ë[™[œÈÈHYÙHÜˆÛËˆ]\ÈÚ][ÝÜÈH›Ø\™È
Š™XÚYJŠ‹—ˆ
ˆH
ŠXÚšXØ[›ÙJŠˆ[œÝÙ\œÈ
Ú]^XÝH]\ÝHš^[™ÝÊ‹ˆ]Ø\œšY\È™\›ÙXÝ[ÛˆÝ\ËØÜ™Y[œÚÝËÛÛ[X[™È[™™Y™\™[˜Ù\Ë[™\ÈZ[YY]ÚÙ]™\ˆÚ[ÝXÚHÞ\Ý[K—ˆHØÙ[˜\š[È\ØÜšX™\ÈH™\ÜÚ]Û›HÛ™H]YY[˜ÙKˆH›Ø\™[ØØ]Y›ÈYÙ]™XØ]\ÙH]™XÙZ]™Y›Ý[™ÈÈXÚYHÛŽˆH\ÝÜ™\™YžHXÚšXØ[ØÛÜ™HÙ\È›Ý[H\™XÝÜˆÚ]\›HHÛÛ\[žHÛÝ[ÝY™™\‹—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠJJŠˆÜ™\š[™ÈžHÙ]™\š]H\ÈšYÚ›ÜˆHXÚšXØ[]YY[˜ÙNÈÜ™\ˆÙˆ\ØÛÝ™\žHØ\œšY\È›È[™›Ü›X][Ûˆ][ˆ[™H›Ø›[H\È›ÝHÜ™\š[™Îˆ]\È]H^Y\ˆÜš][ˆ›ÜˆX[˜YÙ[Y[\ÈZ\ÜÚ[™È[\™[K—ˆ
ˆ
ŠÊJŠˆØÜ™Y[œÚÝÈ[™ÛÛ[X[™È\™HÚ]XZÙHHš[™[™È
Šœ™\›ÙXÚX›JŠˆ[™\™Y›Ü™HÜ™YX›Nˆ™[[Ýš[™È[HÛÝ[XZÙHH™\ÜÛÜœÙKˆ[™Ý\È›ÝHY™XÝÈHXœÙ[˜ÙHÙˆHØ^H[ˆ\Ë—ˆ
ˆ
Š‘
JŠˆH\ÝÜšXØ[ÛÛ\\š\ÛÛˆ\ÈHÙ[Z[™H[\›Ý™[Y[[™ÛÝ[[H›Ø\™]]\È[ˆ^˜Nˆ]™[ˆÚ]H™[™ÛˆÚÝËÚ]Ý]˜[œÛ][Ûˆ[È\Ú[™\ÜÈš\ÚÈH]Y\Ý[Ûˆ
š\È]Ù\š[Ý\ÏÊˆÛÝ[ÛÈ[˜[œÝÙ\™Y—Šˆ
Š•ÛÜ™[Y[X™\š[™È›ÜˆH^[NŠŠˆÚ[™]™\ˆHØÙ[˜\š[È˜[Y\ÈH™\Ü	ÜÈ
Šš[[™Y]YY[˜ÙJŠˆ8 %›Ø\™]ÞY\œËÞ\Ý[\ÈYZ[š\Ý˜]ÜœÈ8 %HÛÜœ™XÝ[œÝÙ\ˆÛÛ˜Ù\›œÈ
Š˜Y\[™ÈH[™ÝXYÙH[™H]™[Ùˆ]Z[
Š‹ˆHXÚšXØ[ÛÛ[Ù\È›ÝÚ[™ÙNˆHØ^H]\È™\Ù[YÙ\Ëˆ‚ˆKˆMÍNˆÂˆÜXÎˆ”ÙXÝ\š]H\ÜÙ\ÜÛY[È[™]˜][Ûˆ\Ý[™È‹ˆØÙ[˜\š[Îˆ[ˆÜ™Ø[š^˜][ÛˆØ\œšY\ÈÝ]H›Ü›X[™]šY]ÈÙˆXØÙ\ÜÈšYÚÈ]™\žH]X\\‹[ˆÚXÚXXÚ\Ú[™\ÜÈÝÛ™\ˆ™XÙZ]™\ÈH\ÝÙˆ[ÜHÚÈØ[ˆ™XXÚZ\ˆ]H[™]\ÝÛÛ™š\›HÜˆ™]›ÚÙH]™\žH[žKˆ[ˆ\˜[[H]›Ü›HÛÛ[[Ý\ÛHÚXÚÜÈ]ÛÝYÙ\™\ˆÛÛ™šYÝ\˜][ÛœÈ™[XZ[ˆÛÛ\X[Ú]H˜\Ù[[™K›YÙÚ[™È[žHšYÚ][ˆZ[]\Ëˆ‹ˆ]Y\Ý[ÛŽˆ’ÝÈ\™HHÛÈXÝ]š]Y\ÈÛ\ÜÚYšYY™\ÜXÝ]™[OÈ‹ˆÜ[ÛœÎˆÂˆJH\š[ÙXÈ™]šY]È›ÜˆHš\œÝÈÛÛ[[Ý\È\ÜÙ\ÜÛY[›ÜˆHÙXÛÛ™‹ˆŠHÛÛ[[Ý\È\ÜÙ\ÜÛY[›ÜˆHš\œÝÈ\š[ÙXÈ™]šY]È›ÜˆHÙXÛÛ™‹ˆÊH[\›˜[]Y]›ÜˆHš\œÝÈÙ[‹X\ÜÙ\ÜÛY[›ÜˆHÙXÛÛ™‹ˆ‘
H]\Ý][Ûˆ›ÜˆHš\œÝÈ^[Z[˜][Ûˆ›ÜˆHÙXÛÛ™‚ˆKˆ^[˜][ÛŽˆ•HÛÜœ™XÝ[œÝÙ\ˆ\È
ŠJH\š[ÙXÈ™]šY]È›ÜˆHš\œÝÈÛÛ[[Ý\È\ÜÙ\ÜÛY[›ÜˆHÙXÛÛ™
Š‹——Šˆ
Š•HÜš]\š[ÛˆÙ\\˜][™È[NŠŠˆ›Ý[\Ü[˜ÙK]
Š˜ØY[˜ÙJŠˆ[™ÛÛœÙ\]Y[KHÚ[™Ùˆ›Ø›[HXXÚØ]Ú\Ë—ˆ
ˆH
Šœ\š[ÙXÈ™]šY]ÊŠˆ\[œÈ]Ù][\˜[È[™[›Û™\È
Šš[X[ˆYÙ[Y[
Š‹ˆH]X\\›H™]šY]ÈÙˆXØÙ\ÜÈšYÚÈ8 %[ÛÈØ[Y
˜XØÙ\ÜÈ]\Ý][ÛŠˆÜˆ
˜XØÙ\ÜÈ™]šY]Êˆ8 %\ÈHØ[›ÛšXØ[^[\Nˆ›È]]ÛX][ÛˆØ[ˆÛ›ÝÈÚ]\ˆH\œÛÛˆÝ[™YYÈ]XØÙ\ÜË™XØ]\ÙHH[œÝÙ\ˆ\[™ÈÛˆÚ]]\œÛÛˆÙ\ÈÙ^Kˆ]\ÈHÛÛ›Û]^ÜÙ\È
œš]š[YÙHÜ™Y\
‹HÚ[[XØÝ[][][ÛˆÙˆ\›Z\ÜÚ[ÛœÈ›Ø›ÙH™]›ÚÙYY\ˆHÚ[™ÙHÙˆ›ÛK—ˆ
ˆ
ŠÛÛ[[Ý\È\ÜÙ\ÜÛY[
Šˆ\È]]ÛX]XÈ[™[š[\œ\Y[™]™\ÈÛˆÛÛ\\š[™È[ˆØœÙ\™YÝ]HÚ][ˆ^XÝYÛ™Kˆ]Ø]Ú\ÈÚ]Ú[™Ù\È˜\Ý[™YX\Ý\˜X›NˆÛÝYÛÛ™šYÝ\˜][ÛœËšYœ›ÛHH˜\Ù[[™KH\X\˜[˜ÙHÙˆ[œ[›™Y™\ÛÝ\˜Ù\Ë—Šˆ
Š•ÚH›Ý\™H™YYY[™\™H›Ý[\˜Ú[™ÙXX›NŠŠˆ]]ÛX][Ûˆ]XÝÈÚ][ˆZ[]\È]HXÚÙ]\È™XÛÛYHX›XË]Ú[™]™\ˆ™HX›HÈØ^H]H\œÛÛ‰ÜÈXØÙ\ÜÈÈH^\›ÛÞ\Ý[H\È›ÈÛ™Ù\ˆ\ÝYšYYžHZ\ˆ›ÛKˆ[X[ˆYÙ[Y[[œÝÙ\œÈ]]Y\Ý[Û‹]Ø[››Ý™H^\˜Ú\ÙYÛÛ[[Ý\ÛK—Šˆ
Š[˜[\Ú\ÈÙˆH\Ý˜XÝÜœÎŠŠ—ˆ
ˆ
ŠŠJŠˆ]ÝØ\ÈHÛÈYš[š][ÛœÎˆH\Ý˜XÝÜˆH^[H\Ù\È[ÜÝÙ[‹™XØ]\ÙH]™\]Z\™\È™XY[™ÈHØY[˜ÙH\ØÜšX™Y˜]\ˆ[ˆH˜[YHÙˆHXÝ]š]K—ˆ
ˆ
ŠÊJŠˆ™Z]\ˆ\È[ˆ[\›˜[]Y]ˆ\™H\È›È[™\[™[[˜Ý[ÛˆÛÛ™XÝ[™ÈH™]šY]È[™\ÜÝZ[™È›Ü›X[š[™[™ÜËˆHXØÙ\ÜÈ™]šY]È\ÈØ\œšYYÝ]žH\Ú[™\ÜÈÝÛ™\œÈÝ™\ˆ
ŠZ\ˆÝÛŠŠˆ]K—ˆ
ˆ
Š‘
JŠˆ]\Ý][Ûˆ™\Ý\ÜÙ\È[ˆ
Š™^\›˜[
Š‹[™\[™[]Y]ÜŽÈ[ˆ^[Z[˜][Ûˆ™\Ý\ÜÙ\ÈH
ŠœÝ\\š\ÛÜžH]]Üš]JŠ‹ˆ™Z]\ˆ\X\œÈ\™K—Šˆ
Š“Z[™H^XØ[[XšYÝZ]NŠŠˆ[ˆPSK
˜XØÙ\ÜÈ]\Ý][ÛŠˆYX[œÈH\š[ÙXÈÛÛ™š\›X][ÛˆÙˆšYÚÈžHHÝÛ™\‹ˆ]\ÈHY™™\™[\ÙHÙˆ
˜]\Ý][ÛŠˆœ›ÛHØš™XÝ]™HKKÚ\™H]\ÈH›Ü›X[Ü[š[ÛˆÙˆ[ˆ[™\[™[]Y]Ü‹ˆÛÛ^XÚY\ÎˆYˆH\™\\H]Y]Üˆ\X\œË]\ÈH]\ŽÈYˆ\Ú[™\ÜÈÝÛ™\œÈ\™HÛÛ™š\›Z[™ÈZ\ˆX[HY[X™\œÉÈXØÙ\ÜË]\ÈH›Ü›Y\‹ˆ‚ˆKˆKŸNÂ