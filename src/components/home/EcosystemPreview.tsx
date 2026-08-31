import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { EcosystemCard } from '../ecosystem/EcosystemCard';
import { CURRENT_ECOSYSTEM_PRODUCTS, COMING_SOON_PRODUCTS } from '../../data/ecosystemData';

export const EcosystemPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Heading */}
        <SectionHeading
          badge="Technology Ecosystem"
          title="Engineered for"
          highlightedText="Impact & Scalable Growth"
          description="JONANDA LLC is building a growing technology ecosystem across AI, Web3, cybersecurity, software, and digital infrastructure."
        />

        {/* --- PART 1: LIVE & ACTIVE PLATFORMS --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Live & Active Platforms
              </h3>
            </div>
            <span className="text-xs text-gray-400 font-mono">
              Operational Platforms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CURRENT_ECOSYSTEM_PRODUCTS.map((product) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* --- PART 2: COMING SOON PORTFOLIO --- */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                Coming Soon Portfolio
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">
              Upcoming Software & AI Tools
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_SOON_PRODUCTS.map((product) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
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
