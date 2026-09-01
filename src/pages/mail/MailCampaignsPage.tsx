import React, { useState } from 'react';
import {
  Send,
  Plus,
  CheckCircle2,
  X,
  Play
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useMail } from '../../context/MailContext';
import { EmailCampaign } from '../../types/mail';

export const MailCampaignsPage: React.FC = () => {
  const { campaigns, contacts, createCampaign, sendCampaign } = useMail();
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [dispatchingId, setDispatchingId] = useState<string | null>(null);
  const [dispatchProgress, setDispatchProgress] = useState(0);

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

  const handleDispatch = (campId: string) => {
    setDispatchingId(campId);
    setDispatchProgress(10);

    const interval = setInterval(() => {
      setDispatchProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            sendCampaign(campId);
            setDispatchingId(null);
            setDispatchProgress(0);
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
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
              <span>Broadcast Engine • JONANDA MAIL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Email Broadcast Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Automated high-throughput broadcast communications connected to verified audience lists.
            </p>
          </div>

          <Button
            onClick={() => setIsNewModalOpen(true)}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          >
            Create Broadcast
          </Button>
        </div>

        {/* Campaigns List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp: EmailCampaign) => {
            const isCurrentlyDispatching = dispatchingId === camp.id;

            return (
              <CorporateCard key={camp.id} className="p-6 space-y-5 flex flex-col justify-between border-gray-200 dark:border-white/[0.08]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                      List: {camp.targetList}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${
                        camp.status === 'sent'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {isCurrentlyDispatching ? 'Dispatching...' : camp.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                      {camp.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-medium">
                      Subject: <span className="text-gray-900 dark:text-gray-200">{camp.subject}</span>
                    </p>
                  </div>

                  {isCurrentlyDispatching ? (
                    <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                      <div className="flex justify-between text-xs font-bold text-purple-700 dark:text-purple-300">
                        <span>Transmitting to recipients...</span>
                        <span>{dispatchProgress}%</span>
                      </div>
                      <div className="w-full bg-purple-200 dark:bg-purple-950 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full transition-all duration-200"
                          style={{ width: `${dispatchProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : camp.status === 'sent' ? (
                    <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-center text-xs">
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold">Dispatched</span>
                        <strong className="text-gray-900 dark:text-white font-mono text-sm">{camp.sentCount}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold">Open Rate</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">{camp.openRate}%</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase font-bold">Click Rate</span>
                        <strong className="text-amber-600 dark:text-gold-400 font-mono text-sm">{camp.clickRate}%</strong>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#12121c] text-xs text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/[0.04]">
                      Draft ready for automated dispatch to active subscribers.
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-mono">
                    {camp.sentAt ? `Dispatched: ${camp.sentAt}` : 'Ready to Dispatch'}
                  </span>

                  {camp.status === 'draft' ? (
                    <Button
                      onClick={() => handleDispatch(camp.id)}
                      disabled={isCurrentlyDispatching}
                      variant="primary"
                      size="sm"
                      icon={<Play className="w-3.5 h-3.5" />}
                    >
                      {isCurrentlyDispatching ? 'Transmitting...' : 'Dispatch Campaign'}
                    </Button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Verified & Delivered</span>
                    </span>
                  )}
                </div>
              </CorporateCard>
            );
          })}
        </div>

        {/* New Campaign Modal */}
        {isNewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Create Broadcast Campaign
                  </h3>
                </div>
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
                    placeholder="e.g. Q4 Executive Strategy Briefing"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Email Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                    placeholder="e.g. JONANDA Strategic Partner Briefing"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Target Audience List</label>
                  <select
                    value={newCampaign.targetList}
                    onChange={(e) => setNewCampaign({ ...newCampaign, targetList: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  >
                    <option value="Corporate Partners">Corporate Partners ({contacts.filter(c => c.lists.includes('Corporate Partners')).length || 1})</option>
                    <option value="Influencer Roster">Influencer Roster ({contacts.filter(c => c.lists.includes('Influencer Roster')).length || 1})</option>
                    <option value="Enterprise Leads">Enterprise Leads</option>
                    <option value="Ecosystem Users">Ecosystem Users</option>
                  </select>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsNewModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Draft Campaign
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
