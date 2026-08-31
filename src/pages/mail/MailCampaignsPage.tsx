import React, { useState } from 'react';
import {
  Send,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useMail } from '../../context/MailContext';
import { EmailCampaign } from '../../types/mail';

export const MailCampaignsPage: React.FC = () => {
  const { campaigns, createCampaign, sendCampaign } = useMail();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [newCampaign, setNewCampaign] = useState({
    title: '',
    subject: '',
    targetList: 'Corporate Partners',
    status: 'draft' as const
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title.trim() || !newCampaign.subject.trim()) return;

    createCampaign(newCampaign);
    setNewCampaign({ title: '', subject: '', targetList: 'Corporate Partners', status: 'draft' });
    setIsNewModalOpen(false);
  };

  return (
    <>
      <SEOHead
        title="Broadcast Campaigns | JONANDA MAIL"
        description="Broadcast targeted email campaigns, partner updates, and creator briefings with verified delivery metrics."
        canonicalPath="/mail/campaigns"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-3">
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Email Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Targeted mass communication with high-integrity delivery analytics.
            </p>
          </div>

          <Button
            onClick={() => setIsNewModalOpen(true)}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          >
            Create Campaign
          </Button>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp: EmailCampaign) => (
            <CorporateCard key={camp.id} className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                    List: {camp.targetList}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      camp.status === 'sent'
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {camp.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Subject: {camp.subject}
                  </p>
                </div>

                {camp.status === 'sent' ? (
                  <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-center text-xs">
                    <div>
                      <span className="text-[10px] text-gray-500 block">Sent</span>
                      <strong className="text-gray-900 dark:text-white">{camp.sentCount}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Open Rate</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-mono">{camp.openRate}%</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-500 block">Click Rate</span>
                      <strong className="text-amber-600 dark:text-gold-400 font-mono">{camp.clickRate}%</strong>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] text-xs text-gray-500">
                    Campaign in draft mode. Ready for scheduled dispatch.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono">
                  {camp.sentAt ? `Dispatched: ${camp.sentAt}` : 'Not dispatched yet'}
                </span>

                {camp.status === 'draft' ? (
                  <Button onClick={() => sendCampaign(camp.id)} variant="primary" size="sm">
                    Dispatch Now
                  </Button>
                ) : (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Delivered</span>
                  </span>
                )}
              </div>
            </CorporateCard>
          ))}
        </div>

        {/* New Campaign Modal */}
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Create Broadcast Campaign
                </h3>
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.title}
                    onChange={(e) => setNewCampaign({ ...newCampaign, title: e.target.value })}
                    placeholder="e.g. Q3 Partner Briefing"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Email Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                    placeholder="e.g. Executive Partner Briefing & Roadmap"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Target Audience List</label>
                  <select
                    value={newCampaign.targetList}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetList: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  >
                    <option value="Corporate Partners">Corporate Partners</option>
                    <option value="Influencer Roster">Influencer Roster</option>
                    <option value="Ecosystem Users">Ecosystem Users</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsNewModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Create Campaign
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
