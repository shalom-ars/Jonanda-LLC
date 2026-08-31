import React from 'react';
import { Terminal, Shield, Compass, Building2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CorporateCard } from '../common/CorporateCard';
import { CORE_TENETS } from '../../data/companyData';

const iconMap = {
  Terminal: Terminal,
  Shield: Shield,
  Compass: Compass,
  Building2: Building2,
};

export const CoreValues: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-200/60 dark:border-white/[0.04] bg-slate-100/40 dark:bg-background-subtle/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-14">
        <SectionHeading
          badge="Guiding Principles"
          title="Architectural &"
          highlightedText="Engineering Standards"
          description="We guide every product development cycle through four non-negotiable institutional tenets."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_TENETS.map((tenet, idx) => {
            const IconComponent = iconMap[tenet.icon as keyof typeof iconMap] || Terminal;

            return (
              <CorporateCard key={idx} className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-amber-600 dark:text-gold-400">
                  <IconComponent className="w-5 h-5" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {tenet.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {tenet.description}
                </p>
              </CorporateCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
