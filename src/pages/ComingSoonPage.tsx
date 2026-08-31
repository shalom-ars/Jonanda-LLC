import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { EcosystemCard } from '../components/ecosystem/EcosystemCard';
import { COMING_SOON_PRODUCTS, EcosystemProduct } from '../data/ecosystemData';
import { Clock, ArrowRight } from 'lucide-react';

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
        <div className="rounded-2xl bg-purple-500/10 dark:bg-surface/60 border border-purple-500/30 p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>Development Lifecycle & Standards</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Under Active Engineering & Research
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              The products listed on this page represent proprietary software applications currently under structured internal development within <strong className="text-gray-900 dark:text-white">JONANDA LLC</strong>. In alignment with our commitment to factual transparency, these solutions are in development and will be released following rigorous security, architectural, and quality audits.
            </p>
          </div>

          <Button href="/contact" variant="primary" size="sm" className="shrink-0 text-xs">
            Early Access Inquiries
          </Button>
        </div>

        {/* Coming Soon Projects Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/[0.08] pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Products (4 Platforms)
              </h2>
            </div>
            <span className="text-xs text-purple-700 dark:text-purple-300 font-mono font-semibold">
              In Active Development
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COMING_SOON_PRODUCTS.map((product: EcosystemProduct) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Development Standards Pillars */}
        <div className="rounded-3xl bg-slate-100 dark:bg-surface/40 border border-gray-200 dark:border-white/[0.08] p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Our Development & Release Framework
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Every upcoming platform progresses through deterministic validation gates prior to commercial availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/[0.06] space-y-2">
              <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">Gate 01</div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">Architecture & AI Testing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Rigorous benchmarking of model accuracy, API latency, and data isolation architectures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/[0.06] space-y-2">
              <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">Gate 02</div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">Security & Code Auditing</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Static analysis, smart contract verification, and automated vulnerability penetration testing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/[0.06] space-y-2">
              <div className="text-xs font-mono font-bold text-purple-700 dark:text-purple-300">Gate 03</div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white">Private Beta Deployment</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Controlled enterprise pilot programs prior to public ecosystem rollout.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200 dark:border-white/[0.06]">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Want to participate in private beta testing or partner on development?
            </p>
            <Button href="/contact" variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Contact R&D Division
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
