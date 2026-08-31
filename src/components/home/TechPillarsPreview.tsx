import React from 'react';
import { Cpu, Blocks, ShieldCheck, CodeXml, Server, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CorporateCard } from '../common/CorporateCard';
import { Button } from '../common/Button';
import { TECHNOLOGY_PILLARS } from '../../data/technologyData';

const iconMap = {
  Cpu: Cpu,
  Blocks: Blocks,
  ShieldCheck: ShieldCheck,
  CodeXml: CodeXml,
  Server: Server,
};

export const TechPillarsPreview: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-100/60 dark:bg-background-subtle/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-14">
        <SectionHeading
          badge="Core Competencies"
          title="Multidisciplinary"
          highlightedText="Technology Capabilities"
          description="From applied machine learning to decentralized protocols and zero-trust security perimeters, we design resilient technological frameworks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECHNOLOGY_PILLARS.map((pillar) => {
            const IconComponent = iconMap[pillar.iconName] || Cpu;

            return (
              <CorporateCard
                key={pillar.id}
                className="flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/25 flex items-center justify-center text-amber-600 dark:text-gold-400">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {pillar.shortDesc}
                  </p>

                  <div className="pt-2">
                    <ul className="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      {pillar.coreCapabilities.slice(0, 2).map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-600 dark:text-gold-400 font-bold">•</span>
                          <span>{cap.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-200 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">
                    {pillar.technicalStack.slice(0, 3).join(' • ')}
                  </span>
                  <Button
                    href="/technology"
                    variant="ghost"
                    size="sm"
                    className="text-amber-600 dark:text-gold-400 hover:text-amber-700 dark:hover:text-gold-300 p-0 hover:bg-transparent"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Details
                  </Button>
                </div>
              </CorporateCard>
            );
          })}
        </div>

        <div className="text-center pt-2">
          <Button
            href="/technology"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Detailed Technology Architecture
          </Button>
        </div>
      </div>
    </section>
  );
};
