import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { EcosystemCard } from '../ecosystem/EcosystemCard';
import { CURRENT_ECOSYSTEM_PRODUCTS, COMING_SOON_PRODUCTS } from '../../data/ecosystemData';

export const EcosystemPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-200/60 dark:border-white/[0.04]">
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
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Live & Active Platforms
              </h3>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              Operational Platforms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CURRENT_ECOSYSTEM_PRODUCTS.map((product) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* --- PART 2: COMING SOON PORTFOLIO --- */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-white/[0.08] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Coming Soon Portfolio
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 uppercase tracking-wider">
                In Active Development
              </span>
            </div>
            <Button
              href="/coming-soon"
              variant="ghost"
              size="sm"
              className="text-xs text-purple-700 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-200 p-0 self-start sm:self-auto hover:bg-transparent"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              View Full Coming Soon Page
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMING_SOON_PRODUCTS.map((product) => (
              <EcosystemCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom Ecosystem CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/coming-soon"
            variant="primary"
            size="md"
            icon={<Clock className="w-4 h-4" />}
          >
            Explore Coming Soon Projects
          </Button>

          <Button
            href="/ecosystem"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Full Ecosystem Architecture
          </Button>
        </div>
      </div>
    </section>
  );
};
