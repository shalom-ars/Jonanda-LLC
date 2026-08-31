import React from 'react';
import { Handshake, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { usePartnersInfluencers } from '../../context/PartnersInfluencersContext';
import { PartnerApplication } from '../../types/flow';

export const PartnerApplicationsPage: React.FC = () => {
  const { partnerApplications, approvePartner, rejectPartner } = usePartnersInfluencers();

  return (
    <>
      <SEOHead
        title="Partner Applications Queue | JONANDA Partners"
        description="Review and process enterprise partnership applications with automated JONANDA FLOW onboarding sequence integration."
        canonicalPath="/partners/applications"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-3">
              <Handshake className="w-3.5 h-3.5" />
              <span>Partner Review Pipeline</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Partner Intake Queue
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Approving an application automatically triggers the <strong>Institutional Partner Onboarding Flow</strong>.
            </p>
          </div>

          <Button href="/partners/directory" variant="primary" size="md">
            View Partner Directory
          </Button>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {partnerApplications.map((app: PartnerApplication) => (
            <CorporateCard key={app.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {app.companyName}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      {app.tier} Tier
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        app.status === 'approved' || app.status === 'active'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : app.status === 'rejected'
                          ? 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <span>Contact: <strong className="text-gray-900 dark:text-white">{app.contactName}</strong></span>
                    <span>•</span>
                    <span className="font-mono">{app.email}</span>
                    <span>•</span>
                    <span>Track: <span className="text-amber-700 dark:text-gold-300 font-semibold">{app.track}</span></span>
                  </div>

                  {app.notes && (
                    <p className="text-xs text-gray-500 italic">
                      "{app.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-white/10">
                  {app.status === 'pending' ? (
                    <>
                      <Button
                        onClick={() => approvePartner(app.id)}
                        variant="primary"
                        size="sm"
                        icon={<CheckCircle2 className="w-4 h-4" />}
                      >
                        Approve & Trigger Flow
                      </Button>
                      <button
                        type="button"
                        onClick={() => rejectPartner(app.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300 hover:bg-red-500 hover:text-white text-xs font-bold transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-gray-500">
                      Processed on {app.appliedAt}
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
