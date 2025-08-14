const regulatoryMappings = [
  {
    regulation: 'HIPAA (Healthcare)',
    color: 'text-blue-600 dark:text-blue-400',
    requirement: 'Ensure integrity and confidentiality of patient data (45 CFR §164.312)',
    capability: 'Cryptographic proof capsules & selective proof generation ensure data integrity while avoiding exposure of PHI.'
  },
  {
    regulation: 'GDPR (EU)',
    color: 'text-green-600 dark:text-green-400',
    requirement: 'Article 5(1)(f) – Integrity & confidentiality',
    capability: 'Immutable, verifiable audit proofs without storing sensitive raw data.'
  },
  {
    regulation: 'SEC / FINRA (Finance)',
    color: 'text-purple-600 dark:text-purple-400',
    requirement: 'SEC Rule 17a-4 – Retention of records in non-rewriteable, non-erasable format',
    capability: 'Immutable proof storage architecture designed to meet non-rewriteable, non-erasable format requirements.'
  },
  {
    regulation: 'SOX (Sarbanes–Oxley)',
    color: 'text-indigo-600 dark:text-indigo-400',
    requirement: 'Section 404 – Internal controls for financial reporting',
    capability: 'Independent, cryptographically verifiable evidence for financial event logs.'
  },
  {
    regulation: 'CISA Cybersecurity Regulations',
    color: 'text-red-600 dark:text-red-400',
    requirement: 'Incident logging & response integrity',
    capability: 'Selective high-fidelity logging with independent verification for incident reports.'
  },
  {
    regulation: 'NIST AI RMF',
    color: 'text-orange-600 dark:text-orange-400',
    requirement: 'Govern – Transparency & accountability',
    capability: 'Explainable proof trails for AI model inferences without revealing sensitive internals.'
  },
  {
    regulation: 'EU AI Act',
    color: 'text-teal-600 dark:text-teal-400',
    requirement: 'High-risk AI – Record keeping & traceability',
    capability: 'Immutable, verifiable model decision records on demand.'
  },
  {
    regulation: 'ISO 27001',
    color: 'text-cyan-600 dark:text-cyan-400',
    requirement: 'A.12.4 – Event logging',
    capability: 'Configurable selective logging with verifiable proof records.'
  },
  {
    regulation: 'PCI-DSS',
    color: 'text-pink-600 dark:text-pink-400',
    requirement: '10.2 – Audit trails for all access to cardholder data',
    capability: 'Cryptographic audit capsules ensure verifiable logs without exposing PII.'
  }
];

export function RegulatoryAlignmentMap() {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold mb-6">
          Insight™ Regulatory Alignment Map
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          No proprietary methods disclosed — capability-based mapping showing how Insight™ addresses key regulatory requirements across industries.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                  Regulation / Standard
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                  Relevant Requirement
                </th>
                <th className="text-left py-4 px-6 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
                  Insight™ Capability That Addresses It
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {regulatoryMappings.map((mapping, index) => (
                <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <span className={`font-medium ${mapping.color}`}>{mapping.regulation}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                    {mapping.requirement}
                  </td>
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-200">
                    {mapping.capability}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          This mapping demonstrates conceptual alignment with regulatory requirements. Specific implementation details 
          and compliance validation processes are available through our professional services team.
        </p>
      </div>
    </div>
  );
}
