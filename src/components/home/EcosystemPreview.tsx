import React from 'react';
import { ArrowRight, Cpu, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CorporateCard } from '../common/CorporateCard';
import { Button } from '../common/Button';
import { ECOSYSTEM_PRODUCTS } from '../../data/ecosystemData';

export const EcosystemPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Heading */}
        <SectionHeading
          badge="Product Ecosystem"
          title="Engineered for"
          highlightedText="Impact and Resilience"
          description="JONANDA LLC builds specialized platforms across blockchain, security, and computational intelligence. Each entity operates with distinct domain focus and engineering rigor."
        />

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ECOSYSTEM_PRODUCTS.map((product) => {
            const isJNDA = product.id === 'jonanda-coin';
            const isLOZULA = product.id === 'lozula-cybersecurity';

            return (
              <CorporateCard
                key={product.id}
                className="flex flex-col justify-between h-full border-white/[0.08]"
              >
                <div className="space-y-6">
                  {/* Card Header: Icon & Category */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {isJNDA && (
                        <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center p-2 shadow-gold-sm">
                          <img
                            src="/brand/jnda-coin.webp"
                            alt="Jonanda Coin (JNDA)"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {isLOZULA && (
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center p-2">
                          <img
                            src="/brand/lozula-logo.svg"
                            alt="LOZULA Cybersecurity"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}

                      {!isJNDA && !isLOZULA && (
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                          <Cpu className="w-6 h-6" />
                        </div>
                      )}

                      <div>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
                          {product.category}
                        </span>
                        <h3 className="text-xl font-bold text-white leading-snug">
                          {product.name}
                        </h3>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
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

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Key Capabilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {product.capabilities.slice(0, 3).map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-gold-400 font-bold shrink-0 mt-0.5">•</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Button
                    href={product.ctaLink}
                    isExternal={product.isExternal}
                    variant={isJNDA ? 'primary' : 'secondary'}
                    size="md"
                    className="w-full justify-between"
                  >
                    <span>{product.ctaText}</span>
                    {product.isExternal ? (
                      <ExternalLink className="w-4 h-4 opacity-70" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CorporateCard>
            );
          })}
        </div>

        {/* Bottom Ecosystem CTA */}
        <div className="text-center pt-4">
          <Button
            href="/ecosystem"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Complete Ecosystem Architecture
          </Button>
        </div>
      </div>
    </section>
  );
};
