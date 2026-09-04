import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { Target, Compass, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="About JONANDA LLC | Technology & Digital Infrastructure"
        description="Learn about JONANDA LLC: our vision, mission, engineering philosophy, and long-term approach to building technology for the next digital economy."
        canonicalPath="/about"
        keywords="About JONANDA LLC, JONANDA vision, JONANDA mission, JONANDA technology company, JONANDA engineering"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="About the Company"
          title="Architecting Next-Generation"
          highlightedText="Digital Technology"
          description="JONANDA LLC is a technology enterprise working across emerging digital technologies and software to build high-performance systems for the next digital economy."
          titleAs="h1"
        />

        {/* Section 1: Who We Are */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              An International Technology Firm with Deep Engineering Focus
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              JONANDA LLC is a United States technology enterprise focused on developing products, services, and software frameworks that solve foundational challenges in modern computation. We operate across artificial intelligence, decentralized blockchain ledgers, automated cybersecurity assessment, and high-availability digital infrastructure.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Our organization is structured to bridge advanced theoretical research with production-grade engineering, ensuring that every product within the JONANDA ecosystem meets high institutional standards for security, performance, and operational integrity.
            </p>
          </div>

          <div className="lg:col-span-5">
            <CorporateCard glow className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-gold-400" />
                <span>Foundational Principles</span>
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Factual Transparency:</strong> Uncompromising clarity regarding technical capabilities and ecosystem development.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Architectural Independence:</strong> Clear operational separation between corporate governance and individual product ecosystems.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong className="text-gray-900 dark:text-white">Zero-Trust Security:</strong> Defensive verification baked directly into core protocol layers from day zero.</span>
                </li>
              </ul>
            </CorporateCard>
          </div>
        </section>

        {/* Section 2: Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CorporateCard className="space-y-4 p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-amber-600 dark:text-gold-400">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Vision
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              To build durable, scalable, and decentralized digital infrastructure that empowers global enterprises, developers, and communities in an interconnected, intelligence-driven economy.
            </p>
          </CorporateCard>

          <CorporateCard className="space-y-4 p-8">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-amber-600 dark:text-gold-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              To engineer mission-critical software, artificial intelligence systems, and Web3 platforms governed with enterprise discipline, transparent architectures, and uncompromising security standards.
            </p>
          </CorporateCard>
        </section>

        {/* Section 3: Engineering Philosophy */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
              <Compass className="w-3.5 h-3.5" />
              <span>Engineering Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              How We Build for the Long Term
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Our development lifecycle is guided by institutional principles designed to withstand rapid market and technological cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CorporateCard className="space-y-3 p-6">
              <div className="text-amber-600 dark:text-gold-400 font-mono text-sm font-bold">01. Precision Architecture</div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Modular & Resilient</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We decouple components into autonomous services that fail independently, scale horizontally, and adapt seamlessly to high-throughput enterprise workloads.
              </p>
            </CorporateCard>

            <CorporateCard className="space-y-3 p-6">
              <div className="text-amber-600 dark:text-gold-400 font-mono text-sm font-bold">02. Defensive Security</div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Zero Trust by Default</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Security is never an afterthought. Every data flow, identity layer, and contract integration requires explicit authentication and continuous verification.
              </p>
            </CorporateCard>

            <CorporateCard className="space-y-3 p-6">
              <div className="text-amber-600 dark:text-gold-400 font-mono text-sm font-bold">03. Sustainable Evolution</div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Long-Term Utility</h4>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                We build products engineered for lasting utility rather than speculative spikes, prioritizing deterministic outcomes, code maintainability, and user trust.
              </p>
            </CorporateCard>
          </div>
        </section>

        {/* Bottom Navigation CTA */}
        <section className="rounded-3xl bg-slate-100 dark:bg-surface/50 border border-gray-200 dark:border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Explore the JONANDA Technology Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover our platforms—including Jonanda Coin (JNDA) and JONANDA MAIL—as well as our solutions in software, AI, and cybersecurity.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/ecosystem" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                View Product Ecosystem
              </Button>
              <Button href="/company" variant="secondary" size="md">
                Corporate Governance
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
