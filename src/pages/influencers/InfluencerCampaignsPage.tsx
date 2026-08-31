import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  X,
  Zap
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';
import { useFlow } from '../../context/FlowContext';
import { BrandCampaign } from '../../types/flow';

export const InfluencerCampaignsPage: React.FC = () => {
  const { campaigns, createCampaign } = usePartnersInfluencers();
  const { runWorkflowExecution } = useFlow();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    brandName: 'JONANDA LLC',
    budget: '$15,000',
    deadline: '2026-09-30',
    brief: 'Sponsored video review and technical walkthrough.',
    status: 'active' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title.trim()) return;

    createCampaign(newCampaign);
    setNewCampaign({
      title: '',
      brandName: 'JONANDA LLC',
      budget: '$15,000',
      deadline: '2026-09-30',
      brief: 'Sponsored video review and technical walkthrough.',
      status: 'active'
    });
    setIsModalOpen(false);
  };

  const handleTriggerInviteFlow = async (camp: BrandCampaign) => {
    await runWorkflowExecution('template_campaign_invitation', {
      campaign_name: camp.title,
      brand_name: camp.brandName,
      creatorName: 'Marcus Vance',
      email: 'marcus@cryptovision.xyz',
      deadline: camp.deadline
    });
  };

  return (
    <>
      <SEOHead
        title="Brand Campaigns & Creator Sponsorships | JONANDA Influencers"
        description="Launch creator briefs, monitor content submission reviews, and automate campaign workflows via JONANDA FLOW."
        canonicalPath="/influencers/campaigns"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Sponsorship Operations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Brand & Creator Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Active sponsorship initiatives coordinated across JONANDA FLOW and JONANDA Mail.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              New Campaign
            </Button>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp: BrandCampaign) => (
            <CorporateCard key={camp.id} className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    {camp.brandName}
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-gold-400">
                    Budget: {camp.budget}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    {camp.brief}
                  </p>
                </div>

                {/* Funnel Metrics */}
                <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-center text-xs">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Invited</span>
                    <strong className="text-gray-900 dark:text-white">{camp.invitedCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Accepted</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">{camp.acceptedCount}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Submissions</span>
                    <strong className="text-purple-600 dark:text-purple-400">{camp.submissionsCount}</strong>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-mono">
                  Deadline: {camp.deadline}
                </span>

                <Button
                  onClick={() => handleTriggerInviteFlow(camp)}
                  variant="primary"
                  size="sm"
                  className="text-xs"
                  icon={<Zap className="w-3.5 h-3.5" />}
                >
                  Trigger Invite Sequence
                </Button>
              </div>
            </CorporateCard>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Launch New Brand Campaign
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Campaign Name *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    placeholder="e.g. JONANDA Studio AI Showcase"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 block">Brand / Product</label>
                    <input
                      type="text"
                      value={newCampaign.brandName}
                      onChange={(e) => setNewCampaign({ ...newCampaign, brandName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-gray-700 dark:text-gray-300 block">Allocated Budget</label>
                    <input
                      type="text"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Brief & Creative Requirements</label>
                  <textarea
                    rows={3}
                    value={newCampaign.brief}
                    onChange={(e) => setNewCampaign({ ...newCampaign, brief: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Launch Campaign
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
