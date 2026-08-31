import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';
import { InfluencerApplication } from '../../types/flow';

export const InfluencerApplicationsPage: React.FC = () => {
  const { influencerApplications, approveInfluencer, rejectInfluencer } = usePartnersInfluencers();

  return (
    <>
      <SEOHead
        title="Creator Applications Queue | JONANDA Influencers"
        description="Review creator and influencer applications with automated onboarding kit dispatch via JONANDA FLOW."
        canonicalPath="/influencers/applications"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-500/30 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creator Program Intake</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Creator Applications
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Approving a creator triggers the <strong>Creator & Influencer Onboarding Flow</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button href="/influencers/directory" variant="outline" size="md">
              Creator Directory
            </Button>
            <Button href="/influencers/campaigns" variant="primary" size="md">
              Brand Campaigns
            </Button>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {influencerApplications.map((app: InfluencerApplication) => (
            <CorporateCard key={app.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {app.creatorName}
                    </h3>
                    <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                      {app.handle}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30">
                      {app.platform} ({app.followersCount})
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>Niche: <strong className="text-amber-700 dark:text-gold-300">{app.niche}</strong></span>
                    <span>•</span>
                    <span className="font-mono">{app.email}</span>
                    <span>•</span>
                    <span>Status: <strong className="uppercase font-bold">{app.status}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-white/10">
                  {app.status === 'pending' ? (
                    <>
                      <Button
                        onClick={() => approveInfluencer(app.id)}
                        variant="primary"
                        size="sm"
                        icon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Approve & Trigger Flow
                      </Button>
                      <button
                        type="button"
                        onClick={() => rejectInfluencer(app.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500 hover:text-white text-xs font-bold transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Active on Roster</span>
                    </span>
                  )}
                </div>
              </div>
            </CorporateCard>
          ))}
        </div>
      </div>
    </>
  );
};
