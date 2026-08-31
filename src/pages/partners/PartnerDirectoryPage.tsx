import React, { useState } from 'react';
import { Search, ExternalLink, ShieldCheck, Building2, Zap } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';

export const PartnerDirectoryPage: React.FC = () => {
  const { partnerApplications } = usePartnersInfluencers();
  const [search, setSearch] = useState('');

  const activePartners = partnerApplications.filter((p) => p.status === 'active' || p.status === 'approved');

  const filtered = activePartners.filter(
    (p) =>
      p.companyName.toLowerCase().includes(search.toLowerCase()) ||
      p.track.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Verified Partner Directory | JONANDA Partners"
        description="Explore verified strategic, enterprise, and infrastructure technology partners of JONANDA LLC."
        canonicalPath="/partners/directory"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Ecosystem Partners</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Strategic Partner Directory
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active enterprise organizations collaborating across JONANDA software architectures.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/partners/applications" variant="outline" size="md">
              Intake Queue
            </Button>
            <Button href="/flow" variant="primary" size="md" icon={<Zap className="w-4 h-4" />}>
              Partner Automations
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company or technical track..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((partner) => (
            <CorporateCard key={partner.id} className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    {partner.tier} Partner
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {partner.companyName}
                  </h3>
                  <p className="text-xs text-amber-700 dark:text-gold-300 font-medium mt-0.5">
                    {partner.track}
                  </p>
                </div>

                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Active in JONANDA digital infrastructure and ecosystem integration.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono">Lead: {partner.contactName}</span>
                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 dark:text-gold-400 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </CorporateCard>
          ))}
        </div>
      </div>
    </>
  );
};
