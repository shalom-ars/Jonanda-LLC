import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { Target, Compass, Eye, ShieldCheck, Layers, ArrowRight } from 'lucide-react';

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
          description="JONANDA LLC is a technology company working across emerging digital technologies and software to build high-performance systems for the next digital economy."
          titleAs="h1"
        />

        {/* Section 1: Who We Are */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              An International Technology Firm with Deep Engineering Focus
            </h2>
            <p className="text-base text-gray-300 leading-relaxed">
              JONANDA LLC is a United States technology enterprise focused on developing products, services, and software frameworks that solve foundational challenges in modern computation. We operate across artificial intelligence, decentralized blockchain ledgers, automated cybersecurity assessment, and high-availability digital infrastructure.
            </p>
            <p className="text-base text-gray-300 leading-relaxed">
              Our organization is structured to bridge advanced theoretical research with production-grade engineering, ensuring that every product within the JONANDA ecosystem meets high institutional standards for security, performance, and operational integrity.
            </p>
          </div>

          <div className="lg:col-span-5">
            <CorporateCard glow className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-gold-400" />
                <span>Foundational Principles</span>
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong>Factual Transparency:</strong> Uncompromising clarity regarding technical capabilities and ecosystem development.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong>Architectural Independence:</strong> Clear operational separation between corporate governance and individual product ecosystems.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-400 font-bold mt-0.5">•</span>
                  <span><strong>Zero-Trust Security:</strong> Continuous verification and rigorous defensive architecture embedded by default.</span>
                </li>
              </ul>
            </CorporateCard>
          </div>
        </section>

        {/* Section 2: Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CorporateCard className="space-y-5 p-8 sm:p-10">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shadow-gold-sm">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Vision</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              To establish an enduring, high-integrity technological foundation where artificial intelligence, decentralized protocols, and cybersecurity operate synchronously to empower the next global digital economy.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We envision a future where autonomous digital networks and enterprise applications communicate across resilient, transparent, and mathematically verified infrastructure.
            </p>
          </CorporateCard>

          <CorporateCard className="space-y-5 p-8 sm:p-10">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-gold-sm">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              To engineer mission-critical digital products, cybersecurity assessment platforms, and distributed software systems with rigorous engineering standards, zero-compromise security, and user-centric ergonomics.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              We execute our mission by maintaining multidisciplinary engineering teams committed to sustainable innovation, formal codebase auditing, and long-term architectural health.
            </p>
          </CorporateCard>
        </section>

        {/* Section 3: What We Build */}
        <section className="space-y-10">
          <SectionHeading
            badge="Engineering Spectrum"
            title="What We"
            highlightedText="Design and Build"
            description="Our engineering scope spans foundational computational layers to user-facing web and mobile applications."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CorporateCard className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Enterprise Software & SaaS</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Modern full-stack cloud applications, low-latency API layers, and responsive cross-platform web and mobile interfaces built with scalable modern tooling.
              </p>
            </CorporateCard>

            <CorporateCard className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Cybersecurity & Audit Platforms</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Automated security assessment tooling, perimeter threat detection, smart contract auditing frameworks, and vulnerability intelligence through LOZULA.
              </p>
            </CorporateCard>

            <CorporateCard className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Web3 & AI Integrations</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Decentralized protocol infrastructure, autonomous intelligence pipelines, and token utility platforms through dedicated projects like Jonanda Coin (JNDA).
              </p>
            </CorporateCard>
          </div>
        </section>

        {/* Section 4: Long-Term Approach */}
        <section className="rounded-3xl bg-surface/70 border border-white/[0.08] p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <span>Long-Term Strategy</span>
            </div>
            <h2 className="text-3xl font-bold text-white">Our Long-Term Approach</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              In an industry frequently driven by short-term speculation, JONANDA LLC maintains a disciplined, multi-year perspective. We prioritize foundational engineering, comprehensive documentation, security verification, and sustainable system utility.
            </p>
            <p className="text-base text-gray-300 leading-relaxed">
              Every system we deploy is architected for modular evolvability—ensuring our software remains resilient as artificial intelligence models advance and decentralized protocols mature.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/ecosystem" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Explore Ecosystem Products
            </Button>
            <Button href="/contact" variant="secondary" size="md">
              Contact Corporate Leadership
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
