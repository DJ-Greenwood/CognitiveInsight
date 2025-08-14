
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
};

export const articles: Article[] = [
  {
    slug: 'ciaf-and-eu-ai-act',
    title: 'How CIAF Aligns with the EU AI Act',
    excerpt: 'A deep dive into the regulatory landscape and how the Cryptographically Integrated AI Framework (CIAF) provides a practical path to compliance.',
    content: `
<p>The EU AI Act represents a landmark in artificial intelligence regulation. Its risk-based approach requires organizations to demonstrate robust governance, transparency, and accountability. This is where the Cryptographically Integrated AI Framework (CIAF) becomes essential.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">Key Alignments:</h3>
<ul class="list-disc pl-6 space-y-2">
  <li><strong>High-Risk Pipelines:</strong> CIAF's Dataset Anchors and Model Anchor Keys (MAKs) provide the verifiable audit trails required for high-risk AI/ML pipelines under the Act.</li>
  <li><strong>Transparency Obligations:</strong> Uncertainty Receipts directly address the need for transparency, allowing practitioners to disclose model risk without exposing sensitive data.</li>
  <li><strong>Data Governance:</strong> The framework's emphasis on data provenance ensures compliance with the stringent data quality and governance requirements of the Act.</li>
</ul>
<p class="mt-4">By embedding cryptographic trust at each stage of the ML pipeline, CIAF moves beyond policy-based governance to a system of verifiable compliance, making it an indispensable tool for any organization navigating the complexities of the EU AI Act.</p>
`,
    author: 'Denzil J. Greenwood',
    date: 'August 15, 2024',
  },
  {
    slug: 'audit-receipts-future-of-governance',
    title: 'Why Audit Receipts Will Define AI Governance in the Next Decade',
    excerpt: 'Explore the concept of "Compliance Receipts" and why they are the key to building trust between AI/ML pipelines, regulators, and the public.',
    content: `
<p>In the coming years, AI governance will hinge on one critical element: verifiable proof. It won't be enough to say an AI/ML pipeline is fair or compliant; organizations will need to prove it. This is the challenge that Compliance Receipts, a core component of CIAF, are designed to solve.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">The Power of Receipts:</h3>
<ul class="list-disc pl-6 space-y-2">
  <li><strong>Immutable Records:</strong> Each receipt is a cryptographically sealed, tamper-evident record of a model's decision-making process, including its known limitations and uncertainties.</li>
  <li><strong>Privacy-Preserving Disclosure:</strong> They allow for the disclosure of risk and compliance information to auditors and regulators without exposing the underlying proprietary data or model architecture.</li>
  <li><strong>Building Public Trust:</strong> For the first time, there is a tangible, understandable mechanism for demonstrating accountability. This is the foundation upon which public trust in AI can be built.</li>
</ul>
<p class="mt-4">As regulatory pressures intensify, the ability to produce these receipts will separate the leaders in responsible AI from the laggards. They transform governance from a theoretical exercise into a practical, auditable reality.</p>
`,
    author: 'Denzil J. Greenwood',
    date: 'September 2, 2024',
  },
  {
    slug: 'zero-knowledge-ai',
    title: 'Zero-Knowledge AI: Privacy Without Compromise',
    excerpt: 'A look at how zero-knowledge principles, integrated within the CIAF, enable a new paradigm of AI that is both powerful and private.',
    content: `
<p>The tension between data-hungry AI models and the fundamental right to privacy has been a persistent challenge. Zero-knowledge proofs (ZKPs) and similar cryptographic principles offer a powerful solution, and they are at the heart of the CIAF's architecture.</p>
<h3 class="font-headline text-xl font-semibold mt-6 mb-2">How It Works:</h3>
<ul class="list-disc pl-6 space-y-2">
  <li><strong>Client-Side Control:</strong> CIAF is built on the principle that data should remain under the client's control. Cryptographic anchors and receipts are generated without raw data ever leaving its secure environment.</li>
  <li><strong>Verifiable Claims, Not Data:</strong> The framework allows a system to prove a claim (e.g., "this model was trained on a dataset with balanced representation") without revealing the dataset itself.</li>
  <li><strong>Regulator-Ready Audits:</strong> This enables a new form of audit where regulators can verify compliance against a set of rules without gaining access to sensitive commercial or personal information.</li>
</ul>
<p class="mt-4">Zero-knowledge AI is not a futuristic concept; it is a practical necessity for building a scalable and trustworthy AI ecosystem. CIAF provides the architectural blueprint to make it a reality today, ensuring that innovation does not come at the cost of privacy.</p>
`,
    author: 'Denzil J. Greenwood',
    date: 'September 21, 2024',
  },
];
