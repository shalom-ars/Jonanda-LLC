import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Info } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Privacy Policy | JONANDA LLC"
        description="Official Privacy Policy of JONANDA LLC detailing data handling practices, security protocols, and visitor privacy protections."
        canonicalPath="/privacy"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 relative z-10">
        <SectionHeading
          badge="Legal & Compliance"
          title="Privacy"
          highlightedText="Policy"
          description="Last Updated: August 2026 • Official Corporate Document"
          align="left"
          titleAs="h1"
        />

        {/* Corporate Legal Notice Banner */}
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-start gap-3 text-xs text-gold-300">
          <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <p>
            <strong>Notice:</strong> This Privacy Policy outlines the general operational data practices of JONANDA LLC (United States). Formal legal provisions and localized regulatory disclosures remain subject to ongoing corporate and legal counsel confirmation.
          </p>
        </div>

        <CorporateCard className="space-y-8 text-sm text-gray-300 leading-relaxed p-8 sm:p-12 border-white/[0.08]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              JONANDA LLC ("we", "our", or "the Company") respects your privacy and is committed to protecting information collected through our official corporate website (<strong>llc.jonanda.com</strong>) and related enterprise communication channels.
            </p>
            <p>
              This policy explains how we collect, use, disclose, and safeguard your data when you visit our website or interact with our corporate offices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>
              We collect minimal information necessary to facilitate business operations and ensure the security of our digital infrastructure:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li><strong>Direct Corporate Communications:</strong> Information submitted voluntarily via our contact form (Name, work email, organization, subject, and message contents).</li>
              <li><strong>Technical & Network Telemetry:</strong> Anonymized server logs, browser type, operating system version, approximate geographic region (country/state level), and timestamp of request for security verification and DDoS mitigation.</li>
              <li><strong>Cookie Data:</strong> Strictly essential cookies required for website routing, session integrity, and security preferences.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How We Use Collected Information</h2>
            <p>
              Information collected by JONANDA LLC is utilized strictly for legitimate corporate purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Responding to business, partnership, and corporate inquiries.</li>
              <li>Maintaining operational security, preventing automated spam, and defending network infrastructure.</li>
              <li>Complying with applicable legal, regulatory, and corporate filing obligations in the United States.</li>
            </ul>
            <p className="text-xs text-gray-400 italic">
              *We do not sell, rent, or commercialize visitor or business contact information to third-party data brokers.*
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Ecosystem Product Boundaries</h2>
            <p>
              Please note that independent platforms within our ecosystem—such as <strong>Jonanda Coin (jonanda.com)</strong> and <strong>JONANDA MAIL (mail.jonanda.com)</strong>—maintain dedicated terms and privacy documentation applicable to their specific on-chain or platform-level software services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Data Security & Storage</h2>
            <p>
              We apply industry-standard defensive measures including TLS 1.3 cryptographic transit, edge security headers, and zero-trust internal access controls to safeguard all corporate communications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Contact & Data Subject Rights</h2>
            <p>
              If you have questions regarding this Privacy Policy or wish to exercise data access/rectification rights under GDPR, CCPA, or applicable laws, please contact our legal desk:
            </p>
            <div className="p-4 rounded-xl bg-background/50 border border-white/[0.06] text-xs font-mono text-gold-400">
              JONANDA LLC • Legal & Compliance Desk<br />
              Email: contact@jonanda.com<br />
              Corporate Website: https://llc.jonanda.com
            </div>
          </section>
        </CorporateCard>
      </div>
    </>
  );
};
