import React, { useState } from 'react';
import { Users, Search, Plus, Sparkles, CheckCircle2, X, Send } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';
import { useMail } from '../../context/MailContext';

export const InfluencerDirectoryPage: React.FC = () => {
  const { influencerApplications, applyInfluencer } = usePartnersInfluencers();
  const { receiveInboundMessage } = useMail();

  const [search, setSearch] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('all');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [applyForm, setApplyForm] = useState<{
    creatorName: string;
    handle: string;
    email: string;
    platform: 'YouTube' | 'TikTok' | 'Instagram' | 'X (Twitter)' | 'LinkedIn';
    niche: string;
    followersCount: string;
  }>({
    creatorName: '',
    handle: '',
    email: '',
    platform: 'YouTube',
    niche: 'AI & Tech',
    followersCount: '25K+'
  });

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

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.creatorName.trim() || !applyForm.handle.trim() || !applyForm.email.trim()) return;

    applyInfluencer({
      creatorName: applyForm.creatorName.trim(),
      handle: applyForm.handle.trim(),
      email: applyForm.email.trim(),
      platform: applyForm.platform,
      niche: applyForm.niche,
      followersCount: applyForm.followersCount
    });

    receiveInboundMessage({
      fromName: applyForm.creatorName.trim(),
      fromEmail: applyForm.email.trim(),
      subject: `[Creator Application] ${applyForm.creatorName.trim()} (${applyForm.handle.trim()})`,
      body: `CREATOR: ${applyForm.creatorName.trim()}\nHANDLE: ${applyForm.handle.trim()}\nPLATFORM: ${applyForm.platform}\nAUDIENCE REACH: ${applyForm.followersCount}\nNICHE: ${applyForm.niche}\n\nSubmitted for JONANDA Creator Network roster.`,
      tags: ['Creator Application', applyForm.niche, applyForm.platform],
      sourceForm: 'Creator Directory Application'
    });

    setIsApplyModalOpen(false);
    setToastMessage('Application submitted! Your profile has been queued for review.');
    setTimeout(() => setToastMessage(null), 4000);
  };

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
            <Button
              onClick={() => setIsApplyModalOpen(true)}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              Apply as Creator
            </Button>
            <Button href="/influencers/applications" variant="outline" size="md">
              Intake Queue
            </Button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

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

        {/* Apply as Creator Modal */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Join JONANDA Creator Network
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applyForm.creatorName}
                    onChange={(e) => setApplyForm({ ...applyForm, creatorName: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Channel / Social Handle *</label>
                  <input
                    type="text"
                    required
                    value={applyForm.handle}
                    onChange={(e) => setApplyForm({ ...applyForm, handle: e.target.value })}
                    placeholder="@elena_ai_tech"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Contact Email *</label>
                  <input
                    type="email"
                    required
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    placeholder="creator@media.io"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 block">Primary Platform</label>
                    <select
                      value={applyForm.platform}
                      onChange={(e) => setApplyForm({ ...applyForm, platform: e.target.value as 'YouTube' | 'TikTok' | 'Instagram' | 'X (Twitter)' | 'LinkedIn' })}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                    >
                      <option value="YouTube">YouTube</option>
                      <option value="X (Twitter)">X (Twitter)</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Instagram">Instagram</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 block">Niche</label>
                    <select
                      value={applyForm.niche}
                      onChange={(e) => setApplyForm({ ...applyForm, niche: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                    >
                      <option value="AI & Tech">AI & Tech</option>
                      <option value="Web3 & Crypto">Web3 & Crypto</option>
                      <option value="Software Dev">Software Dev</option>
                      <option value="Enterprise Tech">Enterprise Tech</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsApplyModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" icon={<Send className="w-3.5 h-3.5" />}>
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
