import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { TECHNOLOGY_PILLARS, TechnologyPillar } from '../data/technologyData';
import { Cpu, Blocks, ShieldCheck, CodeXml, Server, CheckCircle2, ArrowRight, GitBranch } from 'lucide-react';

const iconMap = {
  Cpu: Cpu,
  Blocks: Blocks,
  ShieldCheck: ShieldCheck,
  CodeXml: CodeXml,
  Server: Server,
};

export const TechnologyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Technology & Engineering Capabilities | JONANDA LLC"
        description="Explore JONANDA LLC's core technology capabilities across Artificial Intelligence, Web3 & Blockchain, Cybersecurity, SaaS, and Digital Infrastructure."
        canonicalPath="/technology"
        keywords="JONANDA technology, JONANDA AI, JONANDA Web3, JONANDA cybersecurity, JONANDA software development, JONANDA digital infrastructure"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Technical Capabilities"
          title="Enterprise Architecture &"
          highlightedText="Engineering Disciplines"
          description="A comprehensive overview of JONANDA LLC's core technology areas, engineering methodologies, and architectural standards."
          titleAs="h1"
        />

        {/* 5 Core Technology Pillars */}
        <div className="space-y-12">
          {TECHNOLOGY_PILLARS.map((pillar: TechnologyPillar, idx: number) => {
            const IconComponent = iconMap[pillar.iconName as keyof typeof iconMap] || Cpu;

            return (
              <CorporateCard
                key={pillar.id}
                id={pillar.id}
                className="p-8 sm:p-10 space-y-8 border-white/[0.08]"
              >
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 pb-6 border-b border-white/[0.06]">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0 shadow-gold-sm">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-semibold text-gold-400 uppercase tracking-wider">
                        Domain Pillar 0{idx + 1}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {pillar.title}
                      </h2>
                    </div>
                  </div>

                  {/* Technical Stack Tags */}
                  <div className="flex flex-wrap gap-2 max-w-md lg:justify-end">
                    {pillar.technicalStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-white/10 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detailed Overview */}
                <p className="text-base text-gray-300 leading-relaxed max-w-4xl">
                  {pillar.detailedOverview}
                </p>

                {/* 4 Core Capabilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {pillar.coreCapabilities.map((cap, capIdx: number) => (
                    <div
                      key={capIdx}
                      className="p-4 rounded-xl bg-background/50 border border-white/[0.04] space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <h3 className="text-sm font-bold text-white">
                          {cap.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 pl-6 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CorporateCard>
            );
          })}
        </div>

        {/* Engineering Lifecycle Standards */}
        <section className="rounded-3xl bg-surface/70 border border-white/[0.08] p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Development Lifecycle</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Engineering Rigor & Quality Verification
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Every software module and infrastructure component engineered at JONANDA LLC passes through structured validation checkpoints before deployment to production environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-background/60 border border-white/[0.06] space-y-3">
              <span className="text-xs font-mono font-bold text-gold-400">STAGE 01</span>
              <h3 className="text-base font-bold text-white">Formal Architecture</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Specification design, data flow diagrams, threat surface modeling, and deterministic algorithmic planning.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-white/[0.06] space-y-3">
              <span className="text-xs font-mono font-bold text-gold-400">STAGE 02</span>
              <h3 className="text-base font-bold text-white">Security & Audit Review</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automated static analysis, smart contract verification, vulnerability scanning, and peer architectural reviews.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-background/60 border border-white/[0.06] space-y-3">
              <span className="text-xs font-mono font-bold text-gold-400">STAGE 03</span>
              <h3 className="text-base font-bold text-white">Edge CI/CD Deployment</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Automated integration pipelines, canary releases, edge network distribution, and real-time observability.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
              Discuss Technology Inquiries
            </Button>
            <Button href="/ecosystem" variant="secondary" size="md">
              View Product Ecosystem
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};
