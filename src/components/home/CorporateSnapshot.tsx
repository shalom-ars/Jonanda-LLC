import React from 'react';
import { Building2, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { CorporateCard } from '../common/CorporateCard';
import { Button } from '../common/Button';
import { CORPORATE_DETAILS } from '../../data/companyData';

export const CorporateSnapshot: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeading
          badge="Corporate Profile"
          title="Corporate Structure &"
          highlightedText="Operational Governance"
          description="JONANDA LLC operates as an official United States corporate entity dedicated to engineering emerging digital technology platforms."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Committed to Security, Stability, and Engineering Excellence
            </h3>

            <p className="text-base text-gray-300 leading-relaxed">
              JONANDA LLC was established to provide an institutional and engineering foundation for innovative software products. We separate corporate management, security assurance, and individual ecosystem platforms to maintain strict organizational clarity and accountability.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Separation of Entities:</strong> JONANDA LLC maintains dedicated governance for distinct products including Jonanda Coin (JNDA) and LOZULA Cybersecurity.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-gold-500/15 flex items-center justify-center text-gold-400 shrink-0 mt-1">
                  <Building2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">United States Jurisdiction:</strong> Incorporated under United States law with structured international compliance and corporate standards.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button href="/company" variant="primary" size="md">
                View Corporate Information
              </Button>
              <Button href="/about" variant="secondary" size="md">
                About JONANDA LLC
              </Button>
            </div>
          </div>

          {/* Right Column: Corporate Information Card */}
          <div className="lg:col-span-5">
            <CorporateCard glow className="space-y-5 border-gold-500/20">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gold-500/15 flex items-center justify-center text-gold-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                      Corporate Information
                    </h4>
                    <span className="text-[11px] text-gold-400 font-medium">
                      Official Entity Record
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10">
                  United States
                </span>
              </div>

              <dl className="space-y-3 text-xs">
                {CORPORATE_DETAILS.map((item, idx) => (
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
                  variant="outline"
                  size="sm"
                  className="w-full text-xs justify-center"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Direct Corporate Inquiry
                </Button>
              </div>
            </CorporateCard>
          </div>
        </div>
      </div>
    </section>
  );
};
