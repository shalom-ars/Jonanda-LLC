import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Info } from 'lucide-react';

export const TermsConditionsPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Terms & Conditions | JONANDA LLC"
        description="Official corporate terms and conditions governing the access and use of JONANDA LLC website and informational resources."
        canonicalPath="/terms"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 relative z-10">
        <SectionHeading
          badge="Legal & Compliance"
          title="Terms &"
          highlightedText="Conditions"
          description="Last Updated: August 2026 • Official Corporate Agreement"
          align="left"
          titleAs="h1"
        />

        {/* Corporate Legal Notice Banner */}
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-start gap-3 text-xs text-gold-300">
          <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <p>
            <strong>Notice:</strong> These Terms and Conditions constitute the standard corporate website terms of JONANDA LLC. Specific enterprise technology contracts, software license agreements, or service level agreements (SLAs) supersede these general terms.
          </p>
        </div>

        <CorporateCard className="space-y-8 text-sm text-gray-300 leading-relaxed p-8 sm:p-12 border-white/[0.08]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the official corporate website of JONANDA LLC (<strong>llc.jonanda.com</strong>), you agree to be bound by these Terms and Conditions and all applicable United States and international laws and regulations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Corporate Identity & No Financial Advice</h2>
            <p>
              JONANDA LLC is a technology development and digital infrastructure company. Information published on this website is provided solely for corporate, technical, and general informational purposes.
            </p>
            <p className="p-3 rounded-lg bg-surface border border-white/[0.06] text-xs text-gray-300">
              <strong>Important Disclaimer:</strong> Nothing on this website constitutes financial advice, investment advice, trading advice, or an offer or solicitation to buy, sell, or hold any financial instruments or digital assets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
            <p>
              All trademarks, logos, brand marks, software architecture diagrams, text, and visual assets displayed on this website are the proprietary property of JONANDA LLC or its respective ecosystem entities, protected under copyright and trademark laws.
            </p>
            <p>
              You may not copy, reproduce, distribute, or create derivative works from our content without prior written authorization from JONANDA LLC.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Acceptable Use Policy</h2>
            <p>When accessing our website or communication interfaces, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-gray-400">
              <li>Engage in automated scraping, denial-of-service attempts, or security perimeter penetration testing without written consent.</li>
              <li>Submit fraudulent, deceptive, or malicious communications through contact forms.</li>
              <li>Impersonate JONANDA LLC or claim unauthorized corporate affiliation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Ecosystem & Third-Party Links</h2>
            <p>
              This website links to external platforms within our technology network (such as <strong>jonanda.com</strong> and <strong>lozula.com</strong>). JONANDA LLC is not responsible for external services or third-party web content beyond the scope of this corporate domain.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. Corporate Contact</h2>
            <div className="p-4 rounded-xl bg-background/50 border border-white/[0.06] text-xs font-mono text-gold-400">
              JONANDA LLC • Corporate Inquiries<br />
              Email: contact@jonanda.com<br />
              Corporate Website: https://llc.jonanda.com
            </div>
          </section>
        </CorporateCard>
      </div>
    </>
  );
};
