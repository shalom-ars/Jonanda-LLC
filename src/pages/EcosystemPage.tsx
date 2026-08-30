import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { ECOSYSTEM_PRODUCTS, EcosystemProduct } from '../data/ecosystemData';
import { Cpu, ExternalLink, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';

export const EcosystemPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Our Ecosystem | JONANDA LLC Product Architecture"
        description="Explore the JONANDA LLC product ecosystem: Jonanda Coin (JNDA) Web3 project, LOZULA Cybersecurity assessment platform, and future technology incubation pipeline."
        canonicalPath="/ecosystem"
        keywords="JONANDA ecosystem, Jonanda Coin, JNDA, LOZULA Cybersecurity, JONANDA LLC products, Web3 ecosystem, cybersecurity platform"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Product Portfolio"
          title="The JONANDA LLC"
          highlightedText="Technology Ecosystem"
          description="Explore our independent product platforms and future technology initiatives. Each ecosystem entity is built with specialized focus and distinct domain architecture."
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
              <strong>JONANDA LLC</strong> operates as the parent technology and engineering company. Individual projects such as <strong>Jonanda Coin (JNDA)</strong> and <strong>LOZULA Cybersecurity</strong> represent specialized platforms within this ecosystem, maintaining their own focused operational domains and dedicated product platforms.
            </p>
          </div>

          <Button href="/company" variant="outline" size="sm" className="shrink-0 text-xs">
            Corporate Governance
          </Button>
        </div>

        {/* Ecosystem Product Deep Dives */}
        <div className="space-y-12">
          {ECOSYSTEM_PRODUCTS.map((product: EcosystemProduct) => {
            const isJNDA = product.id === 'jonanda-coin';
            const isLOZULA = product.id === 'lozula-cybersecurity';

            return (
              <CorporateCard
                key={product.id}
                className="p-8 sm:p-10 space-y-8 border-white/[0.08]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Product Branding & Overview */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-4">
                      {isJNDA && (
                        <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center p-2.5 shadow-gold-sm">
                          <img
                            src="/brand/jnda-coin.webp"
                            alt="Jonanda Coin (JNDA)"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {isLOZULA && (
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-2.5">
                          <img
                            src="/brand/lozula-logo.svg"
                            alt="LOZULA Cybersecurity"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {!isJNDA && !isLOZULA && (
                        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Cpu className="w-7 h-7" />
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                            {product.category}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              product.statusColor === 'amber'
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : product.statusColor === 'emerald'
                                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                            }`}
                          >
                            {product.status}
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {product.name}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-gray-300 leading-relaxed">
                      {product.fullDescription || product.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4">
                      <Button
                        href={product.ctaLink}
                        isExternal={product.isExternal}
                        variant={isJNDA ? 'primary' : 'secondary'}
                        size="md"
                        className="shadow-md"
                      >
                        <span>{product.ctaText}</span>
                        {product.isExternal && <ExternalLink className="w-4 h-4 ml-1.5 opacity-75" />}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column: Key Architectural Capabilities */}
                  <div className="lg:col-span-5 rounded-xl bg-background/50 border border-white/[0.06] p-6 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gold-300">
                      Platform Capabilities & Focus
                    </h3>
                    <ul className="space-y-3 text-sm text-gray-300">
                      {product.capabilities.map((cap: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CorporateCard>
            );
          })}
        </div>

        {/* Future Incubation Pipeline Note */}
        <section className="rounded-3xl bg-surface/50 border border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Interested in Ecosystem Integration?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              We collaborate with enterprise partners, researchers, and technology providers on protocol standards, security integrations, and infrastructure deployment.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Ecosystem Team
              </Button>
              <Button href="/technology" variant="secondary" size="md">
                Review Technology Stack
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
