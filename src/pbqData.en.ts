/**
 * English overlay for the performance-based scenarios.
 *
 * Italian (src/pbqData.ts) is the source of truth; this file carries only the
 * translated text, keyed by the same stable ids, so the two languages stay
 * structurally identical. tests/pbqData.test.ts checks that every scenario and
 * every step / prompt / option id has a translation here and nothing extra.
 */

export interface PbqOverride {
  evidenceTable?: import("./pbq").PbqEvidenceTable;
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
308: {
  title: "Quantitative risk chain: AV, EF, SLE and ALE",
  scenario: "Kestrelia estimates a risk using synthetic values. Before the control: asset value (AV) €800,000, exposure factor (EF) 25%, and annual rate of occurrence (ARO) 0.4. The proposed control costs €18,000 per year and is estimated to reduce EF to 10% and ARO to 0.1. Calculate SLE = AV × EF and ALE = SLE × ARO. Estimates are decision ranges to review, not certain forecasts. No direct risk to people is included in the monetary values.",
  prompt: "Match data, results and the justified decision. Some options are distractors.",
  evidenceTable: {
    caption: "Synthetic data for quantitative risk assessment",
    headers: ["Item", "Before the control", "After the proposed control"],
    rows: [
      ["AV", "€800,000", "€800,000"],
      ["EF", "25% = 0.25", "10% = 0.10"],
      ["ARO", "0.4 events/year", "0.1 events/year"],
      ["Annual control cost", "€0", "€18,000"],
    ],
  },
  prompts: {
    ef_before: "Conversion of the initial 25% EF",
    sle_before: "SLE before the control",
    ale_before: "ALE before the control",
    sle_after: "SLE after the control",
    ale_after: "Residual ALE after the control",
    benefit: "Expected annual ALE reduction, before control cost",
    net: "Expected annual benefit net of control cost",
    treatment: "Treatment and justified decision",
  },
  options: {
    ef_025: "0.25",
    sle_200k: "€200,000 per event",
    ale_80k: "€80,000 per year",
    sle_80k: "€80,000 per event",
    ale_8k: "€8,000 per year",
    benefit_72k: "€72,000 per year",
    net_54k: "€54,000 per year",
    mitigate_review: "Mitigate: expected benefit exceeds cost, but validate assumptions, residual risk, obligations and non-monetized impacts",
    ef_25: "25",
    ale_200k: "€200,000 per year",
    net_72k: "€72,000 net per year",
    auto_accept: "Accept automatically: economic comparison alone decides every risk",
  },
  explanation: "25% becomes 0.25. Before the control: SLE = €800,000 × 0.25 = €200,000 per event; ALE = €200,000 × 0.4/year = €80,000/year. After the control: SLE = €800,000 × 0.10 = €80,000 per event; residual ALE = €80,000 × 0.1/year = €8,000/year. The expected reduction is €80,000 − €8,000 = €72,000/year; subtracting €18,000/year gives an expected net benefit of €54,000/year. The control mitigates estimated frequency and impact; it does not eliminate risk. Cost-effectiveness supports the decision but does not replace legal or contractual obligations, risk tolerance, safety of people, or uncertainty analysis. AV, EF and ARO must be documented, validated and reviewed with scenarios or ranges.",
},
307: {
  "title": "BIA: choose the recovery plan",
  "scenario": "Kestrelia loses the primary site at 12:00. The BIA defines RTO as the maximum target time until the service is usable again and RPO as the maximum interval of data loss allowed. All times are on the same day. Tests include activation, restoration, dependencies and service verification; stated capacity is sufficient for the assigned service. Choose the plan with the lowest relative cost that meets both limits; costs are fictional units per service. Nominal frequency does not replace the actual recoverable point. Guide D3, objective 3.4; BIA and risk management, objective 5.2.",
  "prompt": "Match the three services to plans, then interpret limits and evidence. Some options are distractors.",
  "explanation": "Payments requires RTO 30 minutes and RPO 5 minutes: only A passes, with recovery in 20 minutes and loss of 3 minutes. Orders requires RTO 120 minutes and RPO 30 minutes: A and B pass, but B costs less, with 90 minutes and 15 minutes. Archive requires RTO 480 minutes and RPO 120 minutes: A, B and C pass; C costs less, with 360 minutes and 60 minutes. D loses only 1 minute but takes 600 minutes; E recovers in 10 minutes but loses 180 minutes. RTO concerns service recovery time, RPO the data point. Loss is 12:00 minus the last recoverable point, not the stated frequency. In plan A replication can propagate deletions: isolated versioned copies with retention and restore tests are a separate protection. Hot/warm/cold describe facilities, not guaranteed times: use supplied capacity and measurements, revalidated through periodic tests.",
  "evidenceTable": {
    "caption": "Measured recovery plans",
    "headers": [
      "Plan / cost",
      "Site and explicit capacity",
      "Frequency and last recoverable point",
      "Measured recovery duration"
    ],
    "rows": [
      [
        "A / 9",
        "Hot: application and dependencies active; full capacity",
        "Replication every minute; 11:57; separate isolated versioned copies",
        "20 minutes"
      ],
      [
        "B / 5",
        "Warm: hardware ready; data loading and startup included",
        "Backup every 15 minutes; 11:45",
        "90 minutes"
      ],
      [
        "C / 2",
        "Cold: space and network; hardware installation and recovery included",
        "Backup every 60 minutes; 11:00",
        "360 minutes"
      ],
      [
        "D / 1",
        "Cold: procurement and installation included",
        "Backup every minute; 11:59",
        "600 minutes"
      ],
      [
        "E / 3",
        "Hot: active service; full capacity",
        "Backup every 15 minutes, latest attempts failed; 09:00",
        "10 minutes"
      ]
    ]
  },
  "prompts": {
    "payments": "Payments: RTO 30 minutes, RPO 5 minutes.",
    "orders": "Orders: RTO 120 minutes, RPO 30 minutes.",
    "archive": "Archive: RTO 480 minutes, RPO 120 minutes.",
    "limits": "Which limit measures time and which measures data loss?",
    "point": "How many minutes of data does plan E lose?",
    "copies": "A deletion is propagated by replication A: which separate protection is needed?",
    "sites": "How should you verify that a site meets requirements?"
  },
  "options": {
    "a": "Plan A",
    "b": "Plan B",
    "c": "Plan C",
    "d": "Plan D",
    "e": "Plan E",
    "limits": "RTO: service recovery; RPO: allowed data loss",
    "loss": "180 minutes from the 09:00 point",
    "copies": "Isolated versioned copies, retention and restore tests",
    "capacity": "Measured capacity and duration, compared with RTO and RPO",
    "swapped": "RTO: data loss; RPO: recovery time",
    "frequency": "15 minutes because backups are frequent",
    "replica": "Replication is always an independent backup",
    "hot": "The hot label guarantees every requirement"
  }
},
503: {
  "title": "NAC posture and remediation access",
  "scenario": "Kestrelia uses a NAC policy inspired by Cisco ISE authorization profiles. User and device identities must be valid and authorized. Approved patches, active disk encryption and active current antimalware are mandatory, verified by a current successful posture report. An installed agent alone does not prove compliance. Policy: invalid identity = block corporate and remediation services; valid identity and all requirements verified = ordinary access only to role services; valid identity with a failed fixable requirement = restricted remediation network; valid identity with an incomplete or unavailable report = restricted provisioning and assessment access, never production. In both restricted networks an ACL permits only corporate DNS and DHCP, the NAC assessment/provisioning service, and corporate update or configuration servers needed for the case; general Internet access, production servers and other endpoints are denied. These exceptions are lab services, not a universal list. After a fix, a successful fresh assessment and a new authorization decision are required. Synthetic data; no known active incident. Guide D4, objectives 4.5 and 4.1; glossary: NAC, Agent, Agentless and Dissolvable Agent (activity 27). A persistent agent remains installed, a dissolvable agent is temporary; agentless describes an approach without a persistent agent, with product-dependent capabilities. Cisco ISE can use temporary scripts even in its method named agentless: the name guarantees neither all checks nor periodic reassessment.",
  "prompt": "Match devices A–E to the justified access profile; then assess reassessment, permitted services and the meaning of compliance. Some options are distractors.",
  "explanation": "A → ordinary role-scoped access: valid identity and a current report confirm every requirement, not unrestricted access. B → patch remediation: encryption and antimalware do not compensate for the failed patch requirement. C → encryption remediation: active antimalware does not replace disk encryption. D → block: revoked identity takes precedence even with a compliant posture report; no remediation access is granted. E → restricted provisioning/assessment: reportedly good settings but an incomplete agentless report mean unknown posture, not compliance. The absence of a persistent agent is not itself noncompliance: a supported agentless method with all required evidence could produce a valid report. For B, the patch installation message is insufficient: access stays restricted until a successful fresh assessment and new authorization. The remediation network permits only policy-defined services: corporate DNS/DHCP, NAC and required update/configuration servers; no production, communication with other endpoints or general Internet access. Compliance measures requirements at assessment time; it does not prove harmless activity: later alerts require investigation and reassessment according to policy. NAC quarantine restricts network access, while antimalware quarantine isolates a file. Distractors confuse antimalware presence with trust, incomplete reports with compliance, a reported fix with authorization and remediation with broad access.",
  "prompts": {
    "p_device_a": "A: valid identity; approved patches; active encryption; active current antimalware; persistent agent with a current successful report.",
    "p_device_b": "B: valid identity; mandatory patch missing; active encryption; active current antimalware; supported dissolvable agent with a current successful report.",
    "p_device_c": "C: valid identity; approved patches; encryption disabled; active current antimalware; persistent agent with a current successful report.",
    "p_device_d": "D: revoked device identity; approved patches; active encryption; active current antimalware; persistent agent with a current successful report.",
    "p_device_e": "E: valid identity; patches, encryption and antimalware reportedly compliant; agentless method configured, but mandatory checks unfinished and report incomplete.",
    "p_reassessment": "B: patch installation has finished, but there is no new posture report. When can it obtain ordinary access?",
    "p_network_scope": "A device with valid identity is in remediation. Which services can it reach under the stated policy?",
    "p_compliance_limits": "A passes assessment and receives role access. Does this prove that every later activity is harmless?"
  },
  "options": {
    "ordinary": "Ordinary access only to authorized role services: valid identity and all requirements verified.",
    "patch_remediation": "Restricted remediation to install the approved patch; production denied until new authorization.",
    "encryption_remediation": "Restricted remediation to enable and verify required encryption; antimalware alone is insufficient.",
    "block_identity": "Block corporate and remediation services: revoked identity, regardless of posture.",
    "unknown_posture": "Restricted provisioning and assessment access: unknown posture, no production access.",
    "fresh_authorization": "Remain restricted until a successful fresh assessment of all requirements and a new authorization decision.",
    "remediation_services": "Only corporate DNS/DHCP, NAC and required update/configuration servers; no general Internet, production or other endpoints.",
    "no_safety_guarantee": "No: compliance at assessment time, not a guarantee of harmless activity; continue monitoring and reassessment under policy.",
    "antimalware_trust": "Allow access to the entire network for any device with antimalware present.",
    "unknown_compliant": "Treat an incomplete report as compliant because it contains no failures.",
    "automatic_promotion": "Readmit automatically after the installation message without assessment or authorization.",
    "broad_remediation": "Allow general Internet, production and other endpoints to make the fix easier."
  },
  "evidenceTable": {
    "caption": "Device posture and identity for A–E",
    "headers": [
      "Device",
      "Identity",
      "Patches",
      "Encryption",
      "Antimalware",
      "Method / report"
    ],
    "rows": [
      [
        "A",
        "Valid",
        "Approved",
        "Active",
        "Active and current",
        "Persistent / current successful"
      ],
      [
        "B",
        "Valid",
        "Mandatory patch missing",
        "Active",
        "Active and current",
        "Dissolvable / current successful"
      ],
      [
        "C",
        "Valid",
        "Approved",
        "Disabled",
        "Active and current",
        "Persistent / current successful"
      ],
      [
        "D",
        "Revoked",
        "Approved",
        "Active",
        "Active and current",
        "Persistent / current successful"
      ],
      [
        "E",
        "Valid",
        "Reportedly compliant",
        "Reportedly active",
        "Reportedly compliant",
        "Agentless / incomplete"
      ]
    ]
  }
},
306: {
  "evidenceTable": {
  "caption": "Synthetic evidence for findings A–D",
  "headers": [
    "Finding / fictional CVE",
    "CVSS v3.1 Base",
    "Exposure",
    "Known exploitation",
    "Criticality",
    "Patch / evidence"
  ],
  "rows": [
    [
      "A / CVE-2099-1001",
      "8.1",
      "Internet",
      "Yes",
      "Critical",
      "Supported patch available; confirmed"
    ],
    [
      "B / CVE-2099-1002",
      "7.5",
      "Internal network",
      "No",
      "Critical",
      "Cannot upgrade; confirmed"
    ],
    [
      "C / CVE-2099-1003",
      "9.8",
      "Isolated lab",
      "No",
      "Noncritical",
      "Supported patch available; confirmed"
    ],
    [
      "D / CVE-2099-1004",
      "9.1",
      "Internal service",
      "No",
      "Noncritical",
      "Reported backport; banner only, unverified"
    ]
  ]
},
  "title": "Finding priorities and remediation verification",
  "scenario": "Kestrelia evaluates four findings with supplied CVSS v3.1 Base scores: do not calculate vectors or compare different versions. CVE-2099-1001, CVE-2099-1002, CVE-2099-1003 and CVE-2099-1004 are fictional identifiers, not real vulnerabilities or entries in the CISA KEV catalog. Known exploitation is also a supplied synthetic fact, not evidence of a local compromise. Internal policy: P1 = emergency for a confirmed vulnerability on a critical Internet-exposed asset with known exploitation; P2 = urgent compensating control for a critical asset reachable from the internal network, without a supported patch and without known exploitation; P3 = patch in the approved window for a noncritical asset in an isolated lab without known exploitation; V = validate a banner-only finding first. P1, P2 and P3 are priorities for this exercise, not CISA deadlines or a universal formula. Inventory and authenticated checks succeeded for confirmed findings. For finding D, the banner suggests a vulnerable version but the vendor reports a backported fix: verification is still incomplete. Verification actions are authorized and nondestructive. Guide D4, objective 4.3; related concepts: CVSS, credentialed scans and compensating controls.",
  "prompt": "Match each finding to its justified priority, then each follow-up observation to the required verification. Rows A–D provide CVE, severity, exposure, exploitation, criticality and patch status. Some options are distractors.",
  "prompts": {
    "p_finding_a": "A | CVE-2099-1001 | CVSS v3.1 Base 8.1 | critical Internet-exposed payroll portal | known exploitation: yes | confirmed vulnerability | supported patch available.",
    "p_finding_b": "B | CVE-2099-1002 | CVSS v3.1 Base 7.5 | critical console reachable from the internal network | known exploitation: no | confirmed vulnerability | no supported patch; upgrade not possible.",
    "p_finding_c": "C | CVE-2099-1003 | CVSS v3.1 Base 9.8 | noncritical server in the isolated lab | known exploitation: no | confirmed vulnerability | supported patch available.",
    "p_finding_d": "D | CVE-2099-1004 | CVSS v3.1 Base 9.1 | noncritical internal service | known exploitation: no | banner-only finding; vendor reports backport | patch reportedly installed, still unverified.",
    "p_patch_ticket": "A: the ticket says the patch was applied. No rescan or functional test has run yet. What verification is needed before closure?",
    "p_failed_scan": "C: the rescan shows no findings, but the output reports failed authenticated checks. Is the patch verified?",
    "p_compensation": "B: segmentation and allowlist installed. What evidence verifies compensation without pretending the vulnerability was removed?",
    "p_backport": "D: authenticated inventory and the vendor advisory now confirm the package is fixed through a backport; the plugin used only the old banner. What treatment is justified?"
  },
  "options": {
    "p1": "P1: immediate containment and approved patch; criticality, Internet exposure and known exploitation outweigh the score alone.",
    "p2": "P2: urgent compensation, monitoring and replacement plan; critical internal asset cannot be upgraded.",
    "p3": "P3: patch in the approved window; isolated noncritical lab, without known exploitation.",
    "validate": "V: validate with authenticated inventory, vendor advisory and plugin output; possible backport false positive.",
    "verify_patch": "Successful authenticated rescan with current plugins, fixed version running and functional tests; document effectiveness before closure.",
    "repeat_scan": "Restore authentication and repeat relevant checks: no findings with failed checks does not demonstrate a fix.",
    "verify_control": "Authorized tests of blocked and allowed paths, log evidence and residual-risk review; vulnerability remains present.",
    "record_false_positive": "Record a false positive with verified package, advisory, output and rationale; any exception is scoped and reviewable.",
    "score_only": "Handle C before A solely because 9.8 is greater than 8.1.",
    "ticket_closes": "Close A because the installation ticket is sufficient proof of remediation.",
    "hide_plugin": "Hide the plugin and declare the system fixed without further evidence.",
    "compensation_fixes": "Close B as fixed software because segmentation eliminates the vulnerability."
  },
  "explanation": "A → P1: Internet exposure, criticality and known exploitation make the portal urgent even though 8.1 is below 9.8. Contain exposure and apply the approved patch through change management; known exploitation does not automatically imply a local incident. B → P2: no patch is available; restrict paths to the console through segmentation and an allowlist, monitor, and assign an owner to residual risk and the replacement plan. Compensation reduces risk without fixing the software. C → P3: 9.8 indicates high technical severity but the noncritical asset is isolated and has no known exploitation; it still needs patching in the stated window. D → V: a banner proves neither vulnerability nor a false positive; compare package version, vendor advisory and plugin output using authenticated checks. Only after confirming the backport should the false positive be recorded with evidence. A patch ticket is insufficient: rescan with current plugins and successful credentials, check the actual version and run functional tests. A rescan with no findings but failed authentication is inconclusive. For B, verify that forbidden paths are blocked and required paths work; retain monitoring and residual-risk review. Hiding a plugin changes the report, not the vulnerability. No exploit against external systems is required."
},
403: {
  "title": "Email headers and DMARC alignment",
  "scenario": "Kestrelia’s email gateway analyzes six synthetic messages. From and DKIM header excerpts and the SMTP session MAIL FROM appear in each row; MAIL FROM is the envelope sender, not the display name or another From header. MAIL FROM is nonempty and each message has one From domain and one DKIM signature. SPF and DKIM have already been checked by the trusted gateway: use the stated results, not an Authentication-Results header supplied by the sender. There are no DNS or syntax errors, other signatures or local exceptions to infer. The policy shown in each row is the effective policy for the From domain. For relaxed cases, the already determined Organizational Domains are example.com and example.net: no DNS lookup is required. aspf=s/adkim=s require exact domain equality; r means relaxed alignment within the same Organizational Domain. DMARC passes if at least one of valid aligned SPF or valid aligned DKIM satisfies the requirement. Evaluate pass/fail first; consider the disposition requested by p and the receiver’s decision separately. example.com and example.net are documentation domains. Primary objective 4.5; related objective 2.2.",
  "prompt": "Match each A–F excerpt to its DMARC result and reason, then assess disposition and the limits of a pass. Some options are distractors.",
  "prompts": {
    "p_message_a": "A | From: alerts@example.com | MAIL FROM: bounce@mailer.example.net | SPF=pass | DKIM d=example.com, result=fail | p=reject; aspf=s; adkim=s",
    "p_message_b": "B | From: alerts@example.com | MAIL FROM: bounce@mailer.example.net | SPF=pass | DKIM d=example.com, result=pass | p=reject; aspf=s; adkim=s",
    "p_message_c": "C | From: alerts@example.com | MAIL FROM: bounce@example.com | SPF=fail | DKIM d=example.net, result=pass | p=reject; aspf=s; adkim=s",
    "p_message_d": "D | From: notice@news.example.com | MAIL FROM: bounce@mailer.example.com | SPF=pass | DKIM d=example.net, result=fail | p=quarantine; aspf=r; adkim=r",
    "p_message_e": "E | From: notice@news.example.com | MAIL FROM: bounce@mailer.example.com | SPF=pass | DKIM d=sign.example.com, result=pass | p=reject; aspf=s; adkim=s",
    "p_message_f": "F | From: notice@news.example.com | MAIL FROM: bounce@news.example.com | SPF=pass | DKIM d=example.net, result=fail | p=reject; aspf=s; adkim=s",
    "p_disposition": "For A, distinguish the DMARC result from the disposition requested by p=reject.",
    "p_limits": "For B, determine what DMARC=pass proves and what it does not guarantee about content and delivery."
  },
  "options": {
    "fail_spf_unaligned": "DMARC=fail: SPF is valid but unaligned; the aligned DKIM signature is not valid.",
    "pass_dkim": "DMARC=pass through valid DKIM exactly aligned with the From domain; SPF is unaligned.",
    "fail_dkim_unaligned": "DMARC=fail: DKIM is valid but unaligned; the MAIL FROM domain matches, but SPF fails.",
    "pass_relaxed_spf": "DMARC=pass through valid SPF and relaxed alignment: the domains share example.com as their Organizational Domain.",
    "fail_strict": "DMARC=fail: both checks are valid, but neither domain exactly matches news.example.com as required by strict alignment.",
    "pass_strict_spf": "DMARC=pass through valid SPF with the MAIL FROM domain identical to the From domain; DKIM fails.",
    "reject_request": "A remains DMARC=fail; p=reject requests rejection, but the final decision depends on the receiver’s local policy.",
    "pass_not_safety": "B validates authorized use of the From domain; it does not certify harmless content or guarantee delivery or exemption from spam filtering.",
    "spf_always_pass": "DMARC=pass whenever SPF=pass, regardless of the From domain.",
    "both_required": "DMARC=fail if either SPF or DKIM fails: both must be valid and aligned.",
    "related_is_strict": "Strict alignment accepts any subdomain sharing the same Organizational Domain.",
    "guaranteed_reject": "DMARC=fail with p=reject guarantees that every receiver rejects the message.",
    "guaranteed_safe": "DMARC=pass guarantees that the message is harmless and delivered."
  },
  "explanation": "A. SPF=pass authenticates mailer.example.net, unaligned with example.com; DKIM d=example.com matches but result=fail does not authenticate that identifier. Therefore DMARC=fail. B. DKIM d=example.com is valid and strictly aligned: that alone gives DMARC=pass even with valid but unaligned SPF. C. DKIM d=example.net is valid but unaligned; SPF=fail does not become valid because MAIL FROM matches From. Therefore DMARC=fail. D. news.example.com and mailer.example.com share the stated Organizational Domain example.com: SPF=pass meets relaxed alignment and DMARC=pass even with DKIM=fail. E. mailer.example.com and sign.example.com do not equal news.example.com: strict alignment fails for both even though both checks pass. Therefore DMARC=fail. F. MAIL FROM and From share the domain news.example.com and SPF=pass: DMARC=pass even with DKIM=fail. Disposition: p=reject for A requests rejection on DMARC failures; p=quarantine requests suspicious treatment and p=none requests no DMARC disposition. These preferences do not change pass/fail or guarantee every receiver’s action: local policy may accept a fail or filter a pass. Limits: B’s pass validates use of the From domain, not the sender’s personal identity or absence of malware. Distractors ignore alignment, incorrectly require both mechanisms, confuse relaxed and strict or guarantee rejection/delivery. SPF concerns the envelope sender domain in these cases; DKIM concerns the signature d= domain, not merely the visible name. Sources: RFC 9989 (DMARC, replaces RFC 7489), RFC 7208 (SPF) and RFC 6376 (DKIM), verified on 2026-10-08. Each match earns one diagnostic point; the study PBQ requires all 8 correct, without reproducing proprietary CompTIA scoring."
},
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
