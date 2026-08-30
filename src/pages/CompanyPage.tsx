import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { SectionHeading } from '../components/common/SectionHeading';
import { CorporateCard } from '../components/common/CorporateCard';
import { Button } from '../components/common/Button';
import { CORPORATE_DETAILS, CORE_TENETS, COMPANY_MILESTONES, CorporateInfoItem } from '../data/companyData';
import { Building2, ShieldCheck, Scale, Globe, ArrowRight, ExternalLink, FileText, CheckCircle2 } from 'lucide-react';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <Globe className="w-3.5 h-3.5" />
              <span>United States Corporate Entity</span>
            </div>

            <h2 className="text-3xl font-extrabold text-white leading-tight">
              A Structured Corporate Framework for Scalable Innovation
            </h2>

            <p className="text-base text-gray-300 leading-relaxed">
              JONANDA LLC is organized under the laws of the United States as a specialized technology enterprise. The company serves as the parent corporate entity providing executive leadership, strategic capital allocation, architectural oversight, and compliance frameworks for its technology products.
            </p>

            <p className="text-base text-gray-300 leading-relaxed">
              By maintaining formal separation between corporate operations and dedicated ecosystem platforms, JONANDA LLC protects intellectual property, enforces strict security standards, and facilitates long-term institutional trust with global stakeholders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface/80 border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                  <Scale className="w-4 h-4" />
                  <span>Compliance & Ethics</span>
                </div>
                <p className="text-xs text-gray-300">
                  Strict adherence to legal, regulatory, and data protection frameworks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface/80 border border-white/[0.06] space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Security First</span>
                </div>
                <p className="text-xs text-gray-300">
                  Zero-trust standards across all codebases, infrastructure, and endpoints.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Official Corporate Information Card */}
          <div className="lg:col-span-5">
            <CorporateCard glow className="space-y-6 border-gold-500/20">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/15 flex items-center justify-center text-gold-400 shadow-gold-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider">
                      Corporate Information
                    </h3>
                    <span className="text-xs text-gold-400 font-medium">
                      Official Entity Record
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  Active Entity
                </span>
              </div>

              <dl className="space-y-3.5 text-xs">
                {CORPORATE_DETAILS.map((item: CorporateInfoItem, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1.5 border-b border-white/[0.04] last:border-0"
                  >
                    <dt className="text-gray-400 font-medium">{item.label}</dt>
                    <dd className="font-mono text-gray-200 text-right">
                      {item.isLink ? (
                        <a
                          href={item.href}
                          target={item.href?.startsWith('http') ? '_blank' : undefined}
                          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-gold-400 hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
                        >
                          <span>{item.value}</span>
                          {item.href?.startsWith('http') && (
                            <ExternalLink className="w-3 h-3 opacity-60" />
                          )}
                        </a>
                      ) : (
                        <span className="font-semibold text-white">{item.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2">
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                  className="w-full text-xs justify-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Submit Corporate Inquiry
                </Button>
              </div>
            </CorporateCard>
          </div>
        </section>

        {/* Corporate Governance Tenets */}
        <section className="space-y-10">
          <SectionHeading
            badge="Institutional Trust"
            title="Governance & Operational"
            highlightedText="Integrity"
            description="Our corporate practices reflect a commitment to engineering discipline, data security, and long-term organizational health."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_TENETS.map((tenet, idx: number) => (
              <CorporateCard key={idx} className="space-y-3 p-6">
                <span className="text-xs font-mono font-bold text-gold-400">TENET 0{idx + 1}</span>
                <h3 className="text-lg font-bold text-white">{tenet.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {tenet.description}
                </p>
              </CorporateCard>
            ))}
          </div>
        </section>

        {/* Strategic Trajectory Milestones */}
        <section className="rounded-3xl bg-surface/60 border border-white/[0.08] p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-xs font-semibold text-gold-300 border border-gold-500/20">
              <FileText className="w-3.5 h-3.5" />
              <span>Development Trajectory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Strategic Evolution
            </h2>
            <p className="text-sm text-gray-300">
              A structured roadmap reflecting our continuous engineering milestones and technological expansion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {COMPANY_MILESTONES.map((milestone, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-background/50 border border-white/[0.06] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-gold-400 font-bold">
                    PHASE 0{idx + 1}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-white">{milestone.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
