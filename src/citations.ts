/**
 * Where each statement about a law or a standard can be checked (ROADMAP:
 * "Citazioni verificabili"). The sources of every objective are in
 * src/contentReview.ts; here a single concept that names a regulation, a
 * standard or a scoring system points to that document, and to the exact
 * article when the text states a specific rule (a deadline, a fine, a scope).
 *
 * The study view lists these under each concept, and docs/gap-analysis.md
 * writes their URLs, which the weekly external-link check verifies.
 * tests/citations.test.ts fails when a concept names a document it does not
 * cite, so a new normative statement cannot arrive without its source.
 * A locator is written only when it is certain: otherwise the citation points
 * to the document as a whole, never to a guessed article.
 */
import type { ConceptRef } from "./canonicalTerms";
import type { SourceId } from "./contentReview";

export interface Citation {
  source: SourceId;
  /** Article, section or paragraph, in each language. */
  locator?: { it: string; en: string };
}

/** How the study text names each cited document. */
export const MENTIONS: [SourceId, RegExp][] = [
  ["gdpr", /\bGDPR\b/],
  ["pciDss", /\bPCI[- ]DSS\b/],
  ["iso27001", /\b27001\b/],
  ["hipaa", /\bHIPAA\b/],
  ["soc2", /\bSOC ?2\b/],
  ["firstCvss", /\bCVSS\b/],
  ["nistCsf", /\bNIST CSF\b|\bCSF\b|Cybersecurity Framework/],
  ["owaspTop10", /\bOWASP\b/],
  ["mitreAttack", /ATT&CK/],
  ["nist800207", /SP ?800-207/],
  ["nist80056a", /SP ?800-56A/],
  ["nist80063b", /SP ?800-63B/],
  ["nist80061", /SP ?800-61/],
  ["nist80053", /SP ?800-53/],
  ["nist80037", /SP ?800-37/],
  ["nist80088", /SP ?800-88/],
  ["rfc8446", /RFC ?8446/],
];

export const CONCEPT_CITATIONS: Partial<Record<ConceptRef, Citation[]>> = {
  "1:GapAnalysis": [{ source: "pciDss" }, { source: "iso27001" }, { source: "hipaa" }, { source: "nistCsf" }],
  "1:ZeroTrustIntro": [{ source: "nist800207" }],
  "1:DirectiveControl": [{ source: "gdpr" }, { source: "pciDss" }],
  "1:ImpactAnalysis": [{ source: "gdpr" }, { source: "hipaa" }],
  "1:AsymmetricEncryption": [{ source: "nist80056a" }],
  "1:PasswordPoliciesAccount": [{ source: "nist80063b" }],
  "1:MFAImplementationsTokens": [{ source: "nist80063b" }],
  "2:CVSSVuln": [{ source: "firstCvss" }],
  "3:PaaSCloud": [{ source: "owaspTop10" }],
  "3:SaaSCloud": [{ source: "iso27001" }, { source: "soc2" }],
  "3:APIArchitecture": [{ source: "owaspTop10" }],
  "3:WAFFire": [{ source: "owaspTop10" }],
  "3:DataTypesConcept": [{ source: "gdpr" }, { source: "pciDss" }, { source: "hipaa" }],
  "3:TokenizationSec": [{ source: "pciDss" }],
  "3:DataMaskingSec": [{ source: "gdpr" }],
  "3:BackupEncryptionRes": [{ source: "gdpr" }, { source: "pciDss" }],
  "4:CISBenchmarkRes": [{ source: "pciDss" }, { source: "hipaa" }],
  "4:CVSS": [{ source: "firstCvss" }],
  "4:PatchAvailabilityConcept": [{ source: "firstCvss" }],
  "4:VulnerabilityAssessmentConcept": [{ source: "firstCvss" }],
  "4:PackageMonitoringRes": [{ source: "firstCvss" }],
  "4:VulnerabilityScannerRes": [{ source: "firstCvss" }],
  "4:SCAP": [{ source: "firstCvss" }],
  "4:PreparationPhase": [{ source: "gdpr", locator: { it: "art. 33 e art. 34", en: "Art. 33 and Art. 34" } }],
  "4:IncidentResponseGeneralConcept": [{ source: "nist80061" }],
  "4:ThreatHuntingIR": [{ source: "mitreAttack" }],
  "4:LegalHoldForensics": [{ source: "gdpr", locator: { it: "art. 17, par. 3, lett. e", en: "Art. 17(3)(e)" } }],
  "5:DataRolesGovernance": [{ source: "gdpr", locator: { it: "art. 24 e artt. 37–39", en: "Art. 24 and Arts. 37–39" } }],
  "5:RiskAppetite": [{ source: "pciDss" }],
  "5:OrganizationalImpactRes": [{ source: "gdpr" }],
  "5:Transfer": [{ source: "gdpr", locator: { it: "art. 33 e art. 83", en: "Art. 33 and Art. 83" } }],
  "5:RiskTransferConcept": [{ source: "gdpr", locator: { it: "art. 33 e art. 83", en: "Art. 33 and Art. 83" } }],
  "5:Compliance": [{ source: "gdpr" }, { source: "pciDss" }, { source: "hipaa" }],
  "5:DueDiligence": [{ source: "iso27001" }, { source: "soc2" }],
  "5:GDPRComplianceConcept": [{ source: "gdpr", locator: { it: "art. 3, par. 2, e art. 83, par. 5", en: "Art. 3(2) and Art. 83(5)" } }],
  "5:DataSovereigntyConcept": [{ source: "gdpr", locator: { it: "art. 3 e artt. 44–49", en: "Art. 3 and Arts. 44–49" } }],
  "5:NISTRes": [{ source: "nistCsf" }, { source: "nist80053" }, { source: "nist80037" }],
  "5:VendorAssessment": [{ source: "iso27001" }, { source: "soc2" }],
  "5:Questionnaires": [{ source: "soc2" }],
  "5:RightToAuditClause": [{ source: "gdpr" }, { source: "pciDss" }, { source: "iso27001" }, { source: "soc2" }],
  "5:VendorMonitoring": [{ source: "iso27001" }, { source: "soc2" }],
  "5:InternalAudit": [{ source: "iso27001" }],
  "5:ExternalAudit": [{ source: "iso27001" }, { source: "soc2" }],
  "5:RegulatoryAudit": [{ source: "gdpr", locator: { it: "art. 58 e art. 83, par. 5", en: "Art. 58 and Art. 83(5)" } }, { source: "hipaa" }],
  "5:ReportingRes": [{ source: "firstCvss" }],
  "5:AttestationConcept": [{ source: "iso27001" }, { source: "soc2" }],
  "5:SelfAssessmentConcept": [{ source: "nistCsf" }, { source: "iso27001" }],
  "5:MediaSanitizationRes": [{ source: "nist80088" }],
  "5:CertificateOfDestructionRes": [{ source: "nist80088" }],
  "5:DataRetentionRes": [{ source: "gdpr", locator: { it: "art. 17", en: "Art. 17" } }],
};
