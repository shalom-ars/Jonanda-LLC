import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { CORPORATE_DETAILS, CORE_TENETS, COMPANY_MILESTONES, CorporateInfoItem } from '../data/companyData';
import { Building2, ShieldCheck, Scale, Globe, ArrowRight, ExternalLink, FileText } from 'lucide-react';

export const CompanyPage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Company & Corporate Governance | JONANDA LLC"
        description="Official corporate overview, entity information, operational governance, and structural standards of JONANDA LLC, a United States technology enterprise."
        canonicalPath="/company"
        keywords="JONANDA LLC company, JONANDA corporate information, JONANDA United States company, JONANDA governance"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Page Hero Header */}
        <SectionHeading
          badge="Corporate Profile"
          title="Corporate Structure &"
          highlightedText="Institutional Standards"
          description="Official corporate records, governance philosophy, and institutional frameworks of JONANDA LLC."
          titleAs="h1"
        />

        {/* Corporate Information Card & Overview Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Entity Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
              <Globe className="w-3.5 h-3.5" />
              <span>United States Corporate Entity</span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              A Structured Corporate Framework for Scalable Innovation
            </h2>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              JONANDA LLC is organized under the laws of the United States as a specialized technology enterprise. The company serves as the parent corporate entity providing executive leadership, strategic capital allocation, architectural oversight, and compliance frameworks for its technology products.
            </p>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              By maintaining formal separation between corporate operations and dedicated ecosystem platforms, JONANDA LLC protects intellectual property, enforces strict security standards, and facilitates long-term institutional trust with global stakeholders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-surface/80 border border-gray-200 dark:border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-gold-400 text-xs font-bold uppercase">
                  <Scale className="w-4 h-4" />
                  <span>Compliance & Ethics</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Strict adherence to legal, regulatory, and data protection frameworks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-100 dark:bg-surface/80 border border-gray-200 dark:border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-amber-600 dark:text-gold-400 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security Oversight</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Independent architectural and codebase security auditing across all projects.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Entity Ledger Card */}
          <div className="lg:col-span-5">
            <CorporateCard glow className="space-y-5 border-amber-500/30 dark:border-gold-500/20">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center text-amber-600 dark:text-gold-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Corporate Information
                    </h3>
                    <span className="text-[11px] text-amber-700 dark:text-gold-400 font-medium">
                      Official Entity Record
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10">
                  United States
                </span>
              </div>

              <dl className="space-y-3 text-xs">
                {CORPORATE_DETAILS.map((item: CorporateInfoItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-b border-gray-200/60 dark:border-white/[0.04] last:border-0"
                  >
                    <dt className="text-gray-500 dark:text-gray-400 font-medium">{item.label}</dt>
                    <dd className="font-mono text-gray-900 dark:text-gray-200 text-right">
                      {item.isLink ? (
                        <a
                          href={item.href}
                          target={item.href?.startsWith('http') ? '_blank' : undefined}
                          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-amber-600 dark:text-gold-400 hover:text-amber-700 dark:hover:text-gold-300 inline-flex items-center gap-1 transition-colors font-semibold"
                        >
                          <span>{item.value}</span>
                          {item.href?.startsWith('http') && (
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          )}
                        </a>
                      ) : (
                        <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2">
                <Button
                  href="/contact"
                  variant="outline"
                  size="sm"
                  className="w-full text-xs justify-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Submit Official Inquiry
                </Button>
              </div>
            </CorporateCard>
          </div>
        </section>

        {/* Section 2: Structural Standards */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Governance Framework</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Institutional Governance Standards
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              JONANDA LLC applies structural checks across every phase of technology development and deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_TENETS.map((tenet, idx) => (
              <CorporateCard key={idx} className="p-6 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-amber-600 dark:text-gold-400 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">{tenet.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{tenet.description}</p>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* Section 3: Historical Milestones & Roadmap */}
        <section className="space-y-8">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 dark:border-gold-500/20">
              <FileText className="w-3.5 h-3.5" />
              <span>Corporate Milestones</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Strategic Growth & Milestones
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Key operational benchmarks achieved in the establishment and expansion of JONANDA LLC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {COMPANY_MILESTONES.map((milestone, idx) => (
              <CorporateCard key={idx} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-gold-400">
                    {milestone.phase}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-gold-500/15 text-amber-700 dark:text-gold-300 border border-gold-500/30">
                    Milestone 0{idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white">{milestone.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{milestone.description}</p>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-3xl bg-slate-100 dark:bg-surface/50 border border-gray-200 dark:border-white/[0.08] p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Corporate & Investor Inquiries
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              For official corporate communications, institutional partnerships, or technical compliance documentation, connect directly with our administrative team.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/contact" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Corporate Office
              </Button>
              <Button href="/ecosystem" variant="secondary" size="md">
                Review Technology Ecosystem
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
