import React, { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';

export const InfluencerDirectoryPage: React.FC = () => {
  const { influencerApplications } = usePartnersInfluencers();
  const [search, setSearch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');

  const activeInfluencers = influencerApplications.filter(
    (i) => i.status === 'active' || i.status === 'approved'
  );

  const filtered = activeInfluencers.filter((i) => {
    const matchesSearch =
      i.creatorName.toLowerCase().includes(search.toLowerCase()) ||
      i.handle.toLowerCase().includes(search.toLowerCase());
    const matchesNiche = selectedNiche === 'all' || i.niche === selectedNiche;
    return matchesSearch && matchesNiche;
  });

  return (
    <>
      <SEOHead
        title="Creator & Influencer Directory | JONANDA Influencers"
        description="Browse vetted Web3, AI, and developer creators enrolled in the JONANDA campaign roster."
        canonicalPath="/influencers/directory"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Active Creator Roster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Influencer & Creator Roster
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Vetted content creators eligible for JONANDA brand sponsorships and briefs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/influencers/applications" variant="outline" size="md">
              Intake Applications
            </Button>
            <Button href="/influencers/campaigns" variant="primary" size="md">
              Launch Campaign
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creator name or handle..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">All Niches</option>
            <option value="Web3 & Crypto">Web3 & Crypto</option>
            <option value="AI & Tech">AI & Tech</option>
            <option value="Software Dev">Software Dev</option>
            <option value="Enterprise Tech">Enterprise Tech</option>
          </select>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((creator) => (
            <CorporateCard key={creator.id} className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    {creator.platform}
                  </span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {creator.followersCount} Reach
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {creator.creatorName}
                  </h3>
                  <p className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">
                    {creator.handle}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">
                    Niche Focus
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {creator.niche}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs">
                <span className="text-gray-500 font-mono">{creator.email}</span>
                <Button href="/influencers/campaigns" variant="outline" size="sm" className="text-xs">
                  Invite to Campaign
                </Button>
              </div>
            </CorporateCard>
          ))}
        </div>
      </div>
    </>
  );
};
