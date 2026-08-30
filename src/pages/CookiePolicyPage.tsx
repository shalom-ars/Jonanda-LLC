import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Cookie, Info } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Cookie Policy | JONANDA LLC"
        description="Official Cookie Policy of JONANDA LLC explaining the use of essential and operational cookies on our corporate website."
        canonicalPath="/cookies"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12 relative z-10">
        <SectionHeading
          badge="Legal & Compliance"
          title="Cookie"
          highlightedText="Policy"
          description="Last Updated: August 2026 • Official Corporate Document"
          align="left"
          titleAs="h1"
        />

        {/* Corporate Legal Notice Banner */}
        <div className="p-4 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-start gap-3 text-xs text-gold-300">
          <Info className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
          <p>
            <strong>Notice:</strong> JONANDA LLC adheres to minimal-tracking principles. Our corporate website operates primarily with strictly necessary session and security cookies.
          </p>
        </div>

        <CorporateCard className="space-y-8 text-sm text-gray-300 leading-relaxed p-8 sm:p-12 border-white/[0.08]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-gold-400" />
              <span>1. What Are Cookies?</span>
            </h2>
            <p>
              Cookies are small text files placed on your device by web browsers when you access a website. They allow the site to remember your preferences and ensure reliable security and navigation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-background/50 border border-white/[0.06] space-y-1.5">
                <h3 className="text-sm font-bold text-white">Strictly Necessary & Security Cookies</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Required for core infrastructure operations, Cloudflare edge security verification, and DDoS mitigation. These cookies cannot be disabled as the website cannot function properly without them.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-background/50 border border-white/[0.06] space-y-1.5">
                <h3 className="text-sm font-bold text-white">Preference & Routing Cookies</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Used to remember user theme or language preferences and maintain single-page application navigation state across page transitions.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Third-Party Tracking & Advertising</h2>
            <p>
              The JONANDA LLC corporate website does <strong>not</strong> employ intrusive third-party behavioral advertising cookies, remarketing trackers, or cross-site data aggregators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Managing Your Cookie Preferences</h2>
            <p>
              You can control and modify your cookie settings through your browser preferences. Most modern browsers allow you to block cookies or delete existing cookie records at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Corporate Inquiries</h2>
            <div className="p-4 rounded-xl bg-background/50 border border-white/[0.06] text-xs font-mono text-gold-400">
              JONANDA LLC • Data Privacy Officer<br />
              Email: contact@jonanda.com<br />
              Corporate Website: https://llc.jonanda.com
            </div>
          </section>
        </CorporateCard>
      </div>
    </>
  );
};
