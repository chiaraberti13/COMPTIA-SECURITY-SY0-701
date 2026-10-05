/**
 * English overlay for the performance-based scenarios.
 *
 * Italian (src/pbqData.ts) is the source of truth; this file carries only the
 * translated text, keyed by the same stable ids, so the two languages stay
 * structurally identical. tests/pbqData.test.ts checks that every scenario and
 * every step / prompt / option id has a translation here and nothing extra.
 */

export interface PbqOverride {
  title: string;
  scenario: string;
  prompt: string;
  explanation: string;
  /** stepId -> text (ordering scenarios). */
  steps?: Record<string, string>;
  /** promptId -> text (matching scenarios). */
  prompts?: Record<string, string>;
  /** optionId -> text (matching scenarios). */
  options?: Record<string, string>;
}

export const PBQ_EN: Record<number, PbqOverride> = {
  101: {
    title: "Lifecycle of a TLS certificate",
    scenario:
      "Kestrelia is publishing its customer portal at portale.example.com and needs a TLS certificate issued by a public CA.",
    prompt: "Put the certificate issuance and installation steps in order, first to last.",
    steps: {
      keypair: "Generate the key pair on the server, keeping the private key private.",
      csr: "Prepare the CSR with the domain name and the organization's details.",
      validate: "The CA verifies domain control and the requester's identity.",
      issue: "The CA signs and issues the certificate with its own private key.",
      install: "Install the certificate and the intermediate chain up to the root on the server.",
      renew: "Monitor expiry and plan renewal before the certificate expires.",
    },
    explanation:
      "The private key is created and stays on the server: it never leaves the machine, so it is generated first. The CSR carries the public key and the details; the CA validates the domain and identity before signing. Only after issuance is the certificate installed with its intermediate chain, otherwise clients cannot build trust up to the root. Monitoring expiry closes the loop: an expired certificate takes the service down.",
  },
  102: {
    title: "The change management process",
    scenario:
      "A Kestrelia administrator must update the perimeter firewall rules of a production service.",
    prompt: "Put the change management steps in the order an auditor would check them.",
    steps: {
      request: "Opens a change request describing the change and the reason for it.",
      impact: "Analyses impact and risk, with the backout (recovery) plan.",
      approve: "The Change Advisory Board approves the request.",
      test: "Tests the change in a staging environment.",
      implement: "Applies the change during the agreed maintenance window.",
      document: "Verifies the outcome, updates the documentation and closes the request.",
    },
    explanation:
      "Change management exists to make changes traceable and reversible. The formal request comes first; the impact analysis and the backout plan let the CAB approve with full knowledge. You test in staging before touching production, apply it in the agreed window, and close it only after verifying and documenting: without updated documentation the next review cannot know what changed.",
  },
  201: {
    title: "The incident response cycle (NIST SP 800-61)",
    scenario:
      "Kestrelia's SOC detects an internal host (10.0.5.23) talking to a command-and-control server.",
    prompt: "Put the incident response phases in order, following NIST SP 800-61.",
    steps: {
      prep: "Preparation: procedures, tools and contacts ready before an incident.",
      detect: "Detection and analysis: confirm the incident and establish its scope.",
      contain: "Containment: isolate the host to stop the spread.",
      eradicate: "Eradication: remove the malware and close the way in.",
      recover: "Recovery: restore the systems and verify they are clean.",
      lessons: "Lessons learned: after-action review and improved controls.",
    },
    explanation:
      "Preparation comes before the incident: tools and roles must already exist. Detection and analysis confirm it is a real incident and measure its scope; only then does containment make sense, because containing without knowing the scope leaves other compromised hosts out. Eradication and recovery follow containment, and lessons learned close the loop by feeding back into preparation.",
  },
  202: {
    title: "Order of volatility in forensic acquisition",
    scenario:
      "A Kestrelia laptop is still powered on and is seized as evidence. The analyst must acquire the data before shutting it down.",
    prompt: "Order the sources from most volatile to least volatile, as the order of volatility requires.",
    steps: {
      cpu: "CPU registers and cache.",
      ram: "RAM and the process table.",
      net: "Network state: active connections and the ARP table.",
      disk: "Temporary files and the contents of the disk.",
      logs: "Remote and monitoring logs on other systems.",
      archive: "Archival media and backups.",
    },
    explanation:
      "The order of volatility says to collect first what disappears first. CPU registers and cache last fractions of a second; RAM and network connections vanish at shutdown; disk, remote logs and backups persist. Acquiring the disk before RAM would destroy evidence that never comes back. Chain of custody accompanies every step.",
  },
  301: {
    title: "Social engineering techniques",
    scenario: "Kestrelia's awareness team collects four episodes reported by employees.",
    prompt: "Match each episode to the social engineering technique it describes.",
    prompts: {
      p_ceo: "An email pretending to come from the CEO asks for an urgent wire transfer.",
      p_sms: "A text message invites the recipient to call a number to «unlock» their account.",
      p_usb: "USB drives labeled «Payroll» are left in the parking lot.",
      p_call: "Someone phones pretending to be from IT to get a password dictated to them.",
    },
    options: {
      bec: "Business email compromise (CEO fraud)",
      smishing: "Smishing (phishing by SMS)",
      baiting: "Baiting (lure with physical media)",
      vishing: "Vishing (voice phishing)",
      watering: "Watering hole (compromised site)",
    },
    explanation:
      "CEO fraud exploits authority and urgency to obtain a transfer. Smishing arrives by SMS, vishing by phone: the channel changes, not the deception. Baiting uses a physical lure (the drive) that plays on curiosity. The watering hole, a distractor here, compromises a legitimate site the victim visits: no episode describes it.",
  },
  302: {
    title: "Risk response strategies",
    scenario: "Kestrelia's risk committee decides how to treat four identified risks.",
    prompt: "Match each decision to the matching risk response strategy.",
    prompts: {
      p_insurance: "Takes out a cyber insurance policy to cover the losses of a possible attack.",
      p_mfa: "Introduces multi-factor authentication to reduce the risk of credential theft.",
      p_drop: "Decommissions a legacy service that is no longer needed and too exposed.",
      p_accept: "Documents and accepts a low risk whose control would cost more than the possible damage.",
    },
    options: {
      transfer: "Transfer",
      mitigate: "Mitigation (reduction)",
      avoid: "Avoidance",
      accept: "Acceptance",
    },
    explanation:
      "Transfer moves the financial impact to a third party (the insurer) but does not remove the risk. Mitigation reduces likelihood or impact with a control, such as MFA. Avoidance removes the source of the risk by giving up the activity. Acceptance is a deliberate, documented choice when the control costs more than the expected damage.",
  },
  401: {
    title: "Clues in log excerpts",
    scenario: "During an investigation, Kestrelia's analyst isolates four log excerpts from different systems.",
    prompt: "Match each excerpt to the activity it signals.",
    prompts: {
      p_portscan: "From the same IP 203.0.113.45, SYN connections to ports 21, 22, 23, 25, 80, 443, 3389 within two seconds.",
      p_sqli: "In a web log: GET /search?q=1' OR '1'='1 followed by database 500 errors.",
      p_exfil: "An internal host sends 4.5 GB to 203.0.113.80 at 03:12, outside working hours.",
      p_brute: "180 failed login attempts on the same account in one minute, then a successful one.",
    },
    options: {
      scan: "Port scan (reconnaissance)",
      sqli: "SQL injection attempt",
      exfil: "Data exfiltration",
      brute: "Brute-force attack on credentials",
      patch: "Routine scheduled update",
    },
    explanation:
      "Many different ports contacted from the same IP within seconds is a scan. The string 1' OR '1'='1 with database errors is the signature of SQL injection. A large outbound transfer outside working hours to an external address is exfiltration. Many failed logins followed by a successful one indicate a brute-force attack that worked. The routine update is a distractor: no excerpt shows it.",
  },
  402: {
    title: "Authentication log analysis",
    scenario: "Kestrelia's analyst reviews four lines of the authentication log to decide which to investigate.",
    prompt: "Match each line to the correct conclusion.",
    prompts: {
      p_travel: "User `mrossi` logs in from Rome and, eight minutes later, from an IP on another continent.",
      p_spray: "The password «Primavera2026!» fails once against 300 different accounts, in sequence.",
      p_normal: "User `gbianchi` logs in from the usual corporate IP at 09:02 on a weekday.",
      p_disabled: "Repeated attempts on the disabled account of an employee who has left the company.",
    },
    options: {
      travel: "Impossible travel (compromised credentials)",
      spray: "Password spraying",
      normal: "Legitimate routine login",
      disabled: "Attempted use of a decommissioned account",
    },
    explanation:
      "Two successful logins too far apart for the time elapsed are «impossible travel»: it signals compromised credentials. One password tried against many accounts is password spraying, which evades the failed-attempt lockout. Logging in from the usual IP during office hours is routine. Attempts on a disabled account of a former employee must be investigated: someone is looking for a way in that was left open.",
  },
  501: {
    title: "Classifying security controls",
    scenario: "Kestrelia catalogs its controls by type, as objective 1.1 requires.",
    prompt: "Match each control to the type (by function) that best describes it.",
    prompts: {
      p_backup: "Backups that make it possible to restore data after a ransomware attack.",
      p_cam: "CCTV cameras that record people entering.",
      p_lock: "A lock that prevents access to the server room.",
      p_sign: "A «Video-monitored area» sign that discourages intruders.",
    },
    options: {
      preventive: "Preventive",
      detective: "Detective",
      corrective: "Corrective",
      deterrent: "Deterrent",
      compensating: "Compensating",
    },
    explanation:
      "The type describes the control's function. A backup is corrective: it restores after the event. The camera that records is detective: it detects and documents, it does not prevent. The lock is preventive: it blocks access. The sign is a deterrent: it discourages without physically preventing. The compensating control, a distractor here, replaces a planned control when that one is not feasible.",
  },
  502: {
    title: "Choosing the control to protect data",
    scenario: "Kestrelia must protect customer data in four different situations.",
    prompt: "Match each requirement to the most suitable control.",
    prompts: {
      p_rest: "Make the data on laptop disks unreadable if they are stolen.",
      p_transit: "Protect the data exchanged between the browser and the portal while it travels the network.",
      p_test: "Use realistic but not real data in the test environment.",
      p_leak: "Prevent confidential documents from being sent outside the company by email.",
    },
    options: {
      atrest: "Encryption of data at rest (disk)",
      tls: "Encryption in transit (TLS)",
      mask: "Data masking",
      dlp: "Data Loss Prevention (DLP)",
      hash: "Hashing",
    },
    explanation:
      "Encryption at rest protects the data on a stolen laptop's disk. Encryption in transit (TLS) protects data while it travels the network. Masking replaces real values with realistic but fictitious data in non-production environments. DLP inspects outbound data and blocks the sending of confidential documents. Hashing, a distractor here, is one-way and serves to verify integrity or store passwords, not to protect data that must stay readable.",
  },
};
