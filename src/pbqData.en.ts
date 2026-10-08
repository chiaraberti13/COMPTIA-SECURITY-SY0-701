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
305: {
  "title": "Enterprise Wi-Fi and 802.1X roles",
  "scenario": "Kestrelia uses enterprise Wi-Fi with 802.1X. Text topology: laptop software (supplicant) ↔ pass-through access point (authenticator), using EAPOL; access point ↔ RADIUS/EAP backend 10.30.0.10 (authentication server), using RADIUS. The backend terminates the EAP methods; the access point is not the EAP server in this case. Expected server identity: radius.kestrelia.test; the expected CA and name are provisioned in the managed profile. All data is synthetic. Profile A: client and server support EAP-TLS 1.3, individual certificates and protected private keys; mutual certificate authentication without an inner password is required. Profile B: client and backend allow only PEAP with inner EAP-MSCHAPv2, a user password and no client certificate or token. Profile C: backend supports non-EAP PAP inside the tunnel and clients support only EAP-TTLS for that profile; no client certificate. Profiles B/C are instructional interoperability cases, not a security ranking or advice to use legacy methods. Inner credentials are sent only after server validation. The server certificate is not a user factor. Primary objective 4.1; related objective 3.2.",
  "prompt": "Match components, profiles and decisions to the correct options. Use the stated support to distinguish methods; some options are distractors.",
  "prompts": {
    "p_supplicant": "Assign the supplicant role to the component requesting access and participating in the EAP method.",
    "p_authenticator": "Assign the authenticator role to the component controlling access and forwarding EAP to the backend.",
    "p_auth_server": "Assign the authentication server role to the component terminating the EAP method and checking credentials.",
    "p_eap_tls": "Choose the method for profile A: individual client certificate, proof of the private key and mutual certificate authentication, without an inner password.",
    "p_peap": "Choose the method for profile B: PEAP with inner EAP-MSCHAPv2, the only profile allowed by these clients and the backend; no client certificate.",
    "p_ttls": "Choose the method for profile C: non-EAP PAP authentication inside the TLS tunnel, supported only by the stated EAP-TTLS profile.",
    "p_server_validation": "Before sending credentials inside the B/C tunnel, decide how to validate the server and handle an unexpected certificate.",
    "p_radius": "Identify the role of RADIUS on the access point → backend link without confusing it with EAP-TLS/PEAP/EAP-TTLS.",
    "p_factors": "Count the staff factors in profile B: user password and server certificate, without a token or another user factor."
  },
  "options": {
    "client": "Supplicant: 802.1X software on the managed Kestrelia laptop.",
    "ap": "Authenticator: pass-through access point; controls access and forwards EAP through RADIUS.",
    "server": "Authentication server: RADIUS/EAP backend 10.30.0.10; terminates EAP and authenticates the client.",
    "eap_tls": "EAP-TLS: client and server certificates, with identity validation and proof of private keys.",
    "peap_mschap": "PEAP with inner EAP-MSCHAPv2: server authenticated by certificate, client by credentials inside the TLS tunnel.",
    "ttls_pap": "EAP-TTLS with inner non-EAP PAP: validated server certificate and client credentials sent only inside the TLS tunnel.",
    "validate_server": "Provisioned profile: expected CA and identity radius.kestrelia.test, checked chain and validity; reject unexpected servers without an interactive override.",
    "radius_transport": "RADIUS transports EAP and AAA information between access point and backend; the EAP method is a separate choice.",
    "one_factor": "One user factor: the password. The server certificate authenticates the server, not a second staff factor.",
    "swapped_roles": "Supplicant: RADIUS server; authenticator: laptop; authentication server: access point.",
    "radius_method": "RADIUS is the EAP method replacing EAP-TLS, PEAP and EAP-TTLS.",
    "accept_any": "Accept any server certificate: the presence of a TLS tunnel is enough to identify the server.",
    "two_factors": "Two user factors: staff password plus server certificate."
  },
  "explanation": "1. Supplicant: laptop software participates in EAP and presents credentials. 2. Authenticator: the access point controls access and forwards messages; in this case it does not terminate the EAP method. 3. Authentication server: the RADIUS/EAP backend checks credentials and returns the decision enforced by the access point. 4. A: EAP-TLS meets mutual certificate authentication and proof of private keys; RFC 9190 is the reference for TLS 1.3. 5. B: PEAP/EAP-MSCHAPv2 is determined by the allowed profile. PEAP can support other inner methods, including EAP-TLS: it does not always mean passwords. 6. C: EAP-TTLS can carry non-EAP PAP inside the tunnel; the stated support makes this the correct choice. TTLS does not always mean PAP and can also use inner EAP methods. 7. Validation: merely seeing a certificate is insufficient; check the chain, expected CA, validity and expected server identity, with a provisioned profile and without manually accepting unexpected servers. Also apply the implementation’s revocation policy and protect the client private key. 8. RADIUS: it is the AAA protocol between access point and backend, carrying EAP messages; EAPOL covers the client/access point link. RADIUS is not an EAP method and alone does not guarantee encryption of all traffic. 9. Factors: in B the password is one user factor; the server certificate authenticates another party and does not turn the password into MFA. Distractors swap roles, confuse RADIUS with EAP, omit validation or count a false second factor. 802.1X regulates access: alone it does not guarantee protection from jamming or every malicious AP. Sources: IEEE 802.1X, RFC 3748, RFC 9190, RFC 5281 and Microsoft PEAP, verified on 2026-10-08. Each match earns one diagnostic point; this study PBQ requires all 9 correct, without reproducing proprietary CompTIA scoring."
},
304: {
  "title": "VPN paths and protection across two sites",
  "scenario": "Kestrelia connects site A (network 10.10.0.0/24, public gateway A 203.0.113.10) and site B (network 10.20.0.0/24, public gateway B 198.51.100.20, server B 10.20.0.20). Text topology: remote laptop → Internet → gateway A → network A; network A → gateway A → Internet → gateway B → network B/server B. Synthetic data. The managed laptop has only the OpenVPN TLS remote access profile to A, with an individual client certificate, credentials and MFA through an already configured backend. The client must validate the VPN server certificate and identity. The intersite link requires IKEv2/IPsec ESP with encryption and integrity, gateway certificates and traffic selectors 10.10.0.0/24 ↔ 10.20.0.0/24. Internal hosts do not terminate IPsec; no additional IP-in-IP tunnels are planned. Server B offers HTTPS and terminates TLS on the server itself. Consider each link separately: the remote profile does not include forwarding to B. The VPN terminates at the gateway; do not assume cryptographic protection beyond that point or for traffic excluded by the selectors. Objective 3.2; related objectives 1.4 and 4.6.",
  "prompt": "Match requirements, links and protection boundaries to the correct solution. Use the stated profiles and premises; some options are distractors.",
  "prompts": {
    "p_remote": "Connect the staff laptop to gateway A using the available remote profile.",
    "p_sites": "Connect networks A and B through their gateways using the required intersite profile.",
    "p_mode": "Choose the ESP mode that carries the original packet between hosts on the two networks without terminating IPsec on those hosts.",
    "p_boundary": "Also protect gateway B → server B: the server is beyond VPN termination and offers HTTPS.",
    "p_remote_auth": "Authenticate both parties and apply the staff policy in the stated remote profile.",
    "p_peer_auth": "Mutually authenticate gateways A and B in the stated IKEv2 profile.",
    "p_scope": "Define which A/B flows the IPsec link covers and which access is authorized."
  },
  "options": {
    "remote_tls": "OpenVPN TLS: laptop → gateway A; VPN protection ends at gateway A.",
    "site_ipsec": "IPsec ESP with encryption and integrity, negotiated through IKEv2: gateway A ↔ gateway B.",
    "esp_tunnel": "Tunnel mode: inner IP packet protected by ESP and a new outer IP header carrying gateway addresses.",
    "beyond_gateway": "HTTPS with TLS between client and server B, validating the server certificate; retain segmentation and policy beyond the gateway.",
    "remote_auth": "Validate the VPN server certificate and identity; individual client certificate plus user credentials and MFA through the configured backend.",
    "ike_auth": "IKEv2 with gateway certificates: validate the peer chain and identity and verify proof of the private key; this is not staff authentication.",
    "selected_traffic": "IPsec policy and traffic selectors for 10.10.0.0/24 ↔ 10.20.0.0/24; routing and firewall rules for allowed access.",
    "transport": "ESP transport mode between gateways: automatically protects the entire original packet between the networks.",
    "all_segments": "The VPN automatically protects every segment after the gateway and every Internet destination.",
    "no_validation": "Do not validate the VPN server certificate because the tunnel is encrypted.",
    "remote_always_tls": "Every remote access connection always uses TLS: IPsec cannot connect a laptop to a gateway."
  },
  "explanation": "1. Remote: OpenVPN TLS connects the laptop to A because it is the available profile, not because every remote VPN uses TLS. IPsec can also provide remote access. 2. Intersite: IKEv2 negotiates and authenticates associations; ESP with encryption and integrity protects data between gateways A and B. 3. Mode: tunnel mode encapsulates the original packet, including its inner IP header, and adds an outer header for the gateways. With ESP the outer header is not encrypted. Transport mode protects the IP packet payload and does not by itself encapsulate the entire original packet: it is not interchangeable in this gateway-to-gateway topology for hosts behind the gateways without an additional tunnel. This is not a universal rule forbidding gateways from using transport mode when acting as hosts. 4. Boundary: after decapsulation the path to server B is not protected by that VPN; client/server HTTPS retains TLS up to the server but does not protect every other flow. Segmentation and authorization are still required. 5. Remote/authentication: server validation avoids trusting a false gateway; the profile requires staff client certificates, credentials and MFA, without counting the server certificate as a user factor. 6. IKEv2/authentication: certificates and proof of the private key authenticate gateway peers; they do not replace user identity. 7. Scope: selectors, policy, routing and firewalls delimit protected and allowed flows; a tunnel does not automatically authorize everything. Distractors confuse transport/tunnel, extend protection beyond gateways, omit server validation or incorrectly claim remote access always uses TLS. Sources: RFC 4301, RFC 7296 and Netgate OpenVPN Mode Configuration, verified on 2026-10-08. Each match earns one diagnostic point; this study PBQ requires all 7 correct, without reproducing proprietary CompTIA scoring."
},
  303: {
    "title": "Firewall rules and segmentation",
    "scenario": "Kestrelia uses a stateful pfSense firewall with Internet (WAN), a routed public screened subnet 203.0.113.0/24 (proxy 203.0.113.10), applications 10.0.20.0/24 (API 10.0.20.10) and management 10.0.30.0/24 (bastion 10.0.30.50; firewall 10.0.30.1). All data is synthetic. Each interface’s rules filter new connections entering that interface from top to bottom: the first match wins. No other floating, group or automatic rules authorize these flows; the state table is initially empty. Reply traffic for an allowed connection uses its state; a new reverse connection is not a reply. Anything unmatched is blocked by implicit deny. On the screened subnet the draft contains, in order: R0 PASS any source 203.0.113.0/24 to any destination 10.0.20.0/24, any protocol/port; R1 PASS proxy to API TCP/8443; R2 BLOCK screened subnet to applications. Listed ports are destination ports; source ports remain ephemeral. NAT is unnecessary in this routed topology. Primary objective 4.5; related objectives 2.5 and 3.2.",
    "prompt": "Match each requirement to the correct rule or decision. Use the stated premises and the most restrictive options; some options are distractors.",
    "explanation": "1. WAN/HTTPS: the rule allows only the proxy destination and TCP/443, not the entire screened subnet. 2. Proxy/API: the screened-subnet rule limits source, destination and TCP/8443. 3. Bastion/SSH: traffic originates on management, so the rule allows TCP/22 only from 10.0.30.50 to the two listed hosts. 4. Bastion/GUI: TCP/443 only from the bastion to the firewall management address preserves authorized administrative access. 5. R0: the broad PASS precedes R1 and R2; every flow matching R0 is already allowed. Removing R0 makes R1 effective before BLOCK R2; moving R2 further down does not fix the problem. 6. Reply: the proxy/API connection state permits the return traffic; a broad reverse rule would also authorize unwanted new connections. 7. API/bastion: a new TCP/22 connection is not a reply and hits implicit deny. Distractors open all ports between subnets, expose SSH to the Internet, retain the shadowing rule or confuse NAT with access control. NAT translates addresses: it does not replace a firewall policy. This is a routed topology; other deployments may use NAT and automatic rules, explicitly excluded by the premises. Verify allowed and denied flows, including management, before release. Sources: Netgate pfSense Rule Methodology and Firewall Fundamentals, verified on 2026-10-08. Each match earns one diagnostic point; this study PBQ passes only when all 7 are correct, without reproducing proprietary exam scoring.",
    "prompts": {
      "p_public_https": "Allow only HTTPS from the Internet to the published proxy.",
      "p_proxy_api": "Allow only the proxy to initiate connections to the API on TCP/8443.",
      "p_admin_ssh": "Allow only the bastion to administer the proxy and API over SSH.",
      "p_firewall_gui": "Allow only the bastion HTTPS access to the firewall GUI at 10.0.30.1.",
      "p_shadowed": "Correct R0/R1/R2: the draft must allow only proxy → API TCP/8443; R2 currently cannot block flows covered by R0.",
      "p_reply": "Handle the API → proxy reply to an already allowed TCP/8443 connection.",
      "p_unmatched": "Determine the outcome of a new API → bastion TCP/22 connection not covered by the allowed rules."
    },
    "options": {
      "wan_https": "WAN | any → 203.0.113.10 | TCP/443 | PASS",
      "dmz_api": "screened subnet | 203.0.113.10 → 10.0.20.10 | TCP/8443 | PASS",
      "mgmt_ssh": "management | 10.0.30.50 → {203.0.113.10, 10.0.20.10} | TCP/22 | PASS",
      "mgmt_gui": "management | 10.0.30.50 → 10.0.30.1 | TCP/443 | PASS",
      "remove_broad": "Remove overly broad R0; keep specific R1 before R2, which blocks other flows.",
      "state_reply": "Use the existing state; do not add a reverse rule allowing new connections.",
      "implicit_deny": "BLOCK by implicit deny: this is a new connection with no authorization.",
      "wide_dmz": "screened subnet | 203.0.113.0/24 → 10.0.20.0/24 | any protocol/port | PASS",
      "internet_admin": "WAN | any → {203.0.113.10, 10.0.20.10} | TCP/22 | PASS",
      "late_block": "Leave R0 and R1 unchanged; move R2 even further down.",
      "nat_only": "Configure only NAT without checking firewall rules."
    }
  },
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
