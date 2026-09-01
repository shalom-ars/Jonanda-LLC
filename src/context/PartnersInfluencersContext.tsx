import React, { createContext, useContext, useState, useEffect } from 'react';
import { PartnerApplication, InfluencerApplication, BrandCampaign } from '../types/flow';
import { useFlow } from './FlowContext';

interface PartnersInfluencersContextType {
  partnerApplications: PartnerApplication[];
  influencerApplications: InfluencerApplication[];
  campaigns: BrandCampaign[];
  applyPartner: (appData: Omit<PartnerApplication, 'id' | 'appliedAt' | 'status'>) => PartnerApplication;
  approvePartner: (id: string) => Promise<void>;
  rejectPartner: (id: string) => Promise<void>;
  activatePartner: (id: string) => void;
  applyInfluencer: (appData: Omit<InfluencerApplication, 'id' | 'appliedAt' | 'status'>) => InfluencerApplication;
  approveInfluencer: (id: string) => Promise<void>;
  rejectInfluencer: (id: string) => Promise<void>;
  createCampaign: (campaign: Omit<BrandCampaign, 'id' | 'invitedCount' | 'acceptedCount' | 'submissionsCount'>) => BrandCampaign;
}

const PartnersInfluencersContext = createContext<PartnersInfluencersContextType | undefined>(undefined);

const SEED_PARTNER_APPLICATIONS: PartnerApplication[] = [
  {
    id: 'ptnr_app_1',
    companyName: 'Aegis Quantum Defense',
    contactName: 'Robert Vance',
    email: 'partnerships@aegisquantum.com',
    website: 'https://aegisquantum.com',
    track: 'Cybersecurity & Defensive Auditing',
    tier: 'Enterprise',
    status: 'pending',
    appliedAt: '2026-08-30',
    notes: 'Interested in LOZULA cybersecurity assessment pipeline integration.'
  },
  {
    id: 'ptnr_app_2',
    companyName: 'Starlight Cloud Network',
    contactName: 'Lisa Thorne',
    email: 'lisa.thorne@starlightcloud.io',
    website: 'https://starlightcloud.io',
    track: 'Infrastructure & Edge Cloud Hosting',
    tier: 'Strategic',
    status: 'pending',
    appliedAt: '2026-08-29'
  },
  {
    id: 'ptnr_app_3',
    companyName: 'Nexus Cyber Systems',
    contactName: 'Sarah Jenkins',
    email: 'partnerships@nexuscyber.io',
    website: 'https://nexuscyber.io',
    track: 'Infrastructure & Cloud Security',
    tier: 'Strategic',
    status: 'active',
    appliedAt: '2026-08-15'
  }
];

const SEED_INFLUENCER_APPLICATIONS: InfluencerApplication[] = [
  {
    id: 'inf_app_1',
    creatorName: 'Marcus Vance',
    handle: '@marcuscrypto_hq',
    platform: 'YouTube',
    followersCount: '185K',
    niche: 'Web3 & Crypto',
    email: 'marcus@cryptovision.xyz',
    status: 'active',
    appliedAt: '2026-08-20',
    rating: 5
  },
  {
    id: 'inf_app_2',
    creatorName: 'Devon Hayes (CodePulse)',
    handle: '@codepulse_dev',
    platform: 'X (Twitter)',
    followersCount: '92K',
    niche: 'Software Dev',
    email: 'devon@codepulse.tech',
    status: 'pending',
    appliedAt: '2026-08-30'
  },
  {
    id: 'inf_app_3',
    creatorName: 'Aria Sterling',
    handle: '@ariasterling_ai',
    platform: 'LinkedIn',
    followersCount: '48K',
    niche: 'AI & Tech',
    email: 'aria@sterlingai.com',
    status: 'pending',
    appliedAt: '2026-08-31'
  }
];

const SEED_BRAND_CAMPAIGNS: BrandCampaign[] = [
  {
    id: 'camp_1',
    title: 'JNDA Ecosystem Launch & AI Utility Showcase',
    brandName: 'JONANDA LLC',
    budget: '$35,000',
    status: 'active',
    invitedCount: 24,
    acceptedCount: 18,
    submissionsCount: 12,
    deadline: '2026-09-15',
    brief: 'Showcase Jonanda Coin (JNDA) smart contract security and real-world AI agent utility.'
  },
  {
    id: 'camp_2',
    title: 'LOZULA Cybersecurity Threat Assessment Brief',
    brandName: 'LOZULA Security',
    budget: '$20,000',
    status: 'active',
    invitedCount: 15,
    acceptedCount: 11,
    submissionsCount: 8,
    deadline: '2026-09-20',
    brief: 'Highlight automated enterprise code audits and threat surface monitoring.'
  }
];

export const PartnersInfluencersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [partnerApplications, setPartnerApplications] = useState<PartnerApplication[]>(() => {
    const saved = localStorage.getItem('jonanda_partner_apps');
    return saved ? JSON.parse(saved) : SEED_PARTNER_APPLICATIONS;
  });

  const [influencerApplications, setInfluencerApplications] = useState<InfluencerApplication[]>(() => {
    const saved = localStorage.getItem('jonanda_influencer_apps');
    return saved ? JSON.parse(saved) : SEED_INFLUENCER_APPLICATIONS;
  });

  const [campaigns, setCampaigns] = useState<BrandCampaign[]>(() => {
    const saved = localStorage.getItem('jonanda_brand_campaigns');
    return saved ? JSON.parse(saved) : SEED_BRAND_CAMPAIGNS;
  });

  const { runWorkflowExecution } = useFlow();

  useEffect(() => {
    localStorage.setItem('jonanda_partner_apps', JSON.stringify(partnerApplications));
  }, [partnerApplications]);

  useEffect(() => {
    localStorage.setItem('jonanda_influencer_apps', JSON.stringify(influencerApplications));
  }, [influencerApplications]);

  useEffect(() => {
    localStorage.setItem('jonanda_brand_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const applyPartner = (appData: Omit<PartnerApplication, 'id' | 'appliedAt' | 'status'>): PartnerApplication => {
    const newApp: PartnerApplication = {
      ...appData,
      id: `ptnr_${Date.now()}`,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setPartnerApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const applyInfluencer = (appData: Omit<InfluencerApplication, 'id' | 'appliedAt' | 'status'>): InfluencerApplication => {
    const newApp: InfluencerApplication = {
      ...appData,
      id: `inf_${Date.now()}`,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0]
    };
    setInfluencerApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const approvePartner = async (id: string) => {
    const app = partnerApplications.find((p) => p.id === id);
    setPartnerApplications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );

    if (app) {
      // Trigger connected workflow execution
      await runWorkflowExecution('template_partner_onboarding', {
        id: app.id,
        companyName: app.companyName,
        contactName: app.contactName,
        email: app.email,
        track: app.track,
        status: 'approved'
      });
    }
  };

  const rejectPartner = async (id: string) => {
    const app = partnerApplications.find((p) => p.id === id);
    setPartnerApplications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );

    if (app) {
      await runWorkflowExecution('template_partner_onboarding', {
        id: app.id,
        companyName: app.companyName,
        contactName: app.contactName,
        email: app.email,
        track: app.track,
        status: 'rejected'
      });
    }
  };

  const activatePartner = (id: string) => {
    setPartnerApplications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'active' } : p))
    );
  };

  const approveInfluencer = async (id: string) => {
    const app = influencerApplications.find((i) => i.id === id);
    setInfluencerApplications((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'approved' } : i))
    );

    if (app) {
      await runWorkflowExecution('template_influencer_onboarding', {
        id: app.id,
        creatorName: app.creatorName,
        handle: app.handle,
        email: app.email,
        niche: app.niche,
        status: 'approved'
      });
    }
  };

  const rejectInfluencer = async (id: string) => {
    setInfluencerApplications((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'rejected' } : i))
    );
  };

  const createCampaign = (
    data: Omit<BrandCampaign, 'id' | 'invitedCount' | 'acceptedCount' | 'submissionsCount'>
  ): BrandCampaign => {
    const newCamp: BrandCampaign = {
      ...data,
      id: `camp_${Date.now()}`,
      invitedCount: 0,
      acceptedCount: 0,
      submissionsCount: 0
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    return newCamp;
  };

  return (
    <PartnersInfluencersContext.Provider
      value={{
        partnerApplications,
        influencerApplications,
        campaigns,
        applyPartner,
        approvePartner,
        rejectPartner,
        activatePartner,
        applyInfluencer,
        approveInfluencer,
        rejectInfluencer,
        createCampaign
      }}
    >
      {children}
    </PartnersInfluencersContext.Provider>
  );
};

export const usePartnersInfluencers = () => {
  const context = useContext(PartnersInfluencersContext);
  if (!context) {
    throw new Error('usePartnersInfluencers must be used within a PartnersInfluencersProvider');
  }
  return context;
};
