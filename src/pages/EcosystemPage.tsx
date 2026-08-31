import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { EcosystemCard } from '../components/ecosystem/EcosystemCard';
import {
  CURRENT_ECOSYSTEM_PRODUCTS,
  COMING_SOON_PRODUCTS,
  FUTURE_TECH_PRODUCTS,
  EcosystemProduct
} from '../data/ecosystemData';
import { Layers, ArrowRight, Clock, Compass } from 'lucide-react';

export const EcosystemPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Our Ecosystem | JONANDA LLC Technology Portfolio"
        description="Explore the JONANDA LLC product ecosystem: live platforms (Jonanda Coin JNDA, LOZULA Cybersecurity), upcoming projects (Jonanda Studio, Jonanda SEO, Jonanda Influencer, Jonanda Security Toolkit), and R&D incubation."
        canonicalPath="/ecosystem"
        keywords="JONANDA ecosystem, Jonanda Coin, JNDA, LOZULA Cybersecurity, Jonanda Studio, Jonanda SEO, Jonanda Influencer, Jonanda Security Toolkit, JONANDA LLC technology products"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Product Portfolio"
          title="The JONANDA LLC"
          highlightedText="Technology Ecosystem"
          description="A structured overview of JONANDA LLC's operational platforms, upcoming software solutions, and emerging research initiatives."
          titleAs="h1"
        />

        {/* Corporate vs Product Architecture Clarity Banner */}
        <div className="rounded-2xl bg-surface/60 border border-gold-500/20 p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300">
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Ecosystem Governance Architecture</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Clear Separation of Corporate Parent & Ecosystem Products
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              <strong>JONANDA LLC</strong> operates as the parent technology and engineering enterprise. Dedicated projects—such as <strong>Jonanda Coin (JNDA)</strong>, <strong>LOZULA Cybersecurity</strong>, and upcoming tools like <strong>Jonanda Studio</strong>—maintain focused operational domains and dedicated product platforms.
            </p>
          </div>

          <Button href="/company" variant="outline" size="sm" className="shrink-0 text-xs">
            Corporate Governance
          </Button>
        </div>

        {/* ========================================================= */}
        {/* SECTION 1: CURRENT OFFICIAL ECOSYSTEM (LIVE / ACTIVE)     */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/20 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live & Operational</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Current Ecosystem
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md text-left sm:text-right">
              Fully operational digital platforms serving Web3 asset utility and cybersecurity intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CURRENT_ECOSYSTEM_PRODUCTS.map((product: EcosystemProduct) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: COMING SOON PORTFOLIO                         */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold uppercase tracking-wider border border-purple-500/20 mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Under Active Development</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Coming Soon
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md text-left sm:text-right">
              Proprietary software applications, automated SEO intelligence, creator workflows, and defensive security tooling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMING_SOON_PRODUCTS.map((product: EcosystemProduct) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: RESEARCH & FUTURE TECHNOLOGY                  */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-white/[0.08] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider border border-blue-500/20 mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>R&D Pipeline</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Research & Future Technology
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md text-left sm:text-right">
              Structured research and incubation pipeline for next-generation computing infrastructure and intelligent frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {FUTURE_TECH_PRODUCTS.map((product: EcosystemProduct) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Bottom Collaboration CTA */}
        <section className="rounded-3xl bg-surface/50 border border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Interested in Technology Integration?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We collaborate with enterprise partners, technology providers, and researchers across artificial intelligence, decentralized ledgers, and cybersecurity architectures.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Corporate Team
              </Button>
              <Button href="/technology" variant="secondary" size="md">
                Review Technology Capabilities
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
