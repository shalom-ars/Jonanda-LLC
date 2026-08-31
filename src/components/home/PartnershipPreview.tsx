import React from 'react';
import { Handshake, ArrowRight, Cloud, Cpu, ShieldCheck, Network, Briefcase, HeartHandshake } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CorporateCard } from '../common/CorporateCard';
import { Button } from '../common/Button';
import { PARTNERSHIP_PROGRAMS } from '../../data/partnersData';

const iconMap = {
  Cloud,
  Cpu,
  ShieldCheck,
  Briefcase,
  HeartHandshake,
  Network
};

export const PartnershipPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 border-t border-gray-200/60 dark:border-white/[0.04] bg-slate-100/40 dark:bg-background-subtle/30 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Heading */}
        <SectionHeading
          badge="Strategic Alliances"
          title="Collaborative"
          highlightedText="Technology Partnerships"
          description="We partner with technology infrastructure providers, research laboratories, security analysts, and enterprise clients to co-develop scalable digital systems."
        />

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNERSHIP_PROGRAMS.slice(0, 6).map((prog) => {
            const IconComp = iconMap[prog.iconName] || Cloud;

            return (
              <CorporateCard
                key={prog.id}
                className="p-6 flex flex-col justify-between h-full border-gray-200/80 dark:border-white/[0.08] hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 text-amber-600 dark:text-gold-400 flex items-center justify-center shadow-sm dark:shadow-gold-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-gray-400">
                      {prog.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200/60 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[11px] text-amber-700 dark:text-gold-300 font-mono">
                    {prog.category}
                  </span>
                  <a
                    href="/partners#partner-inquiry"
                    className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </CorporateCard>
            );
          })}
        </div>

        {/* Bottom Partners CTA */}
        <div className="text-center pt-2">
          <Button
            href="/partners"
            variant="outline"
            size="md"
            icon={<Handshake className="w-4 h-4" />}
          >
            Explore All Partnership Programs & Apply
          </Button>
        </div>
      </div>
    </section>
  );
};
