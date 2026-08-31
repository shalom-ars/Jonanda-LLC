import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { EcosystemCard } from '../components/ecosystem/EcosystemCard';
import { COMING_SOON_PRODUCTS, EcosystemProduct } from '../data/ecosystemData';
import { Clock, ShieldCheck, ArrowRight, Bot, Search, Users, ShieldAlert } from 'lucide-react';

export const ComingSoonPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Coming Soon Technology Portfolio | JONANDA LLC"
        description="Explore upcoming products currently under active development at JONANDA LLC: Jonanda Studio (AI), Jonanda SEO, Jonanda Influencer, and Jonanda Security Toolkit."
        canonicalPath="/coming-soon"
        keywords="JONANDA Coming Soon, Jonanda Studio, Jonanda SEO, Jonanda Influencer, Jonanda Security Toolkit, upcoming AI platforms, JONANDA technology portfolio"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Product Roadmap"
          title="Upcoming Technology &"
          highlightedText="Software Solutions"
          description="Discover next-generation software platforms, intelligent AI agent workflows, automated SEO intelligence, and defensive security tooling currently being engineered by JONANDA LLC."
          titleAs="h1"
        />

        {/* Development Integrity Notice Banner */}
        <div className="rounded-2xl bg-surface/60 border border-purple-500/20 p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Clock className="w-4 h-4 text-purple-400" />
              <span>Development Lifecycle & Standards</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Under Active Engineering & Research
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              The products listed on this page represent proprietary software applications currently under structured internal development within <strong>JONANDA LLC</strong>. In alignment with our commitment to factual transparency, these solutions are in development and will be released following rigorous security, architectural, and quality audits.
            </p>
          </div>

          <Button href="/contact" variant="primary" size="sm" className="shrink-0 text-xs">
            Early Access Inquiries
          </Button>
        </div>

        {/* Coming Soon Projects Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Upcoming Products (4 Platforms)
              </h2>
            </div>
            <span className="text-xs text-purple-300 font-mono">
              In Active Development
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMING_SOON_PRODUCTS.map((product: EcosystemProduct) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Engineering Standards & Safeguards */}
        <section className="rounded-3xl bg-surface/70 border border-white/[0.08] p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Development Safeguards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built on Zero-Trust Security & Engineering Rigor
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Every upcoming platform within the JONANDA LLC portfolio is built according to enterprise architectural benchmarks:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-background/50 border border-white/[0.06] space-y-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Autonomous Intelligence</h3>
              <p className="text-xs text-gray-400">
                Deterministic agent execution with strict alignment and safety boundaries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-background/50 border border-white/[0.06] space-y-2">
              <Search className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Automated Diagnostics</h3>
              <p className="text-xs text-gray-400">
                High-throughput automated analysis for search indexing and performance health.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-background/50 border border-white/[0.06] space-y-2">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Collaboration Workflows</h3>
              <p className="text-xs text-gray-400">
                Structured milestone management and verified campaign telemetry.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-background/50 border border-white/[0.06] space-y-2">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Defensive Security Only</h3>
              <p className="text-xs text-gray-400">
                Authorized vulnerability testing with whitelist verification and strict audit trails.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Inquire About Early Access
            </Button>
            <Button href="/ecosystem" variant="secondary" size="md">
              View Current Live Platforms
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
