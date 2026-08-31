import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmailContact, EmailTemplate, EmailCampaign, MailMessage } from '../types/mail';

interface MailContextType {
  contacts: EmailContact[];
  templates: EmailTemplate[];
  campaigns: EmailCampaign[];
  messages: MailMessage[];
  addContact: (contact: Omit<EmailContact, 'id' | 'createdAt'>) => EmailContact;
  updateContactStatus: (id: string, status: EmailContact['status']) => void;
  deleteContact: (id: string) => void;
  saveTemplate: (template: EmailTemplate) => void;
  deleteTemplate: (id: string) => void;
  createCampaign: (campaign: Omit<EmailCampaign, 'id' | 'sentCount' | 'openRate' | 'clickRate'>) => EmailCampaign;
  sendCampaign: (id: string) => Promise<void>;
  markMessageRead: (id: string) => void;
}

const MailContext = createContext<MailContextType | undefined>(undefined);

const SEED_CONTACTS: EmailContact[] = [
  {
    id: 'cnt_1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@nexuscyber.io',
    company: 'Nexus Cyber Systems',
    tags: ['Strategic Partner', 'Cybersecurity'],
    lists: ['Corporate Partners', 'Enterprise Leads'],
    status: 'active',
    source: 'Partner Form',
    createdAt: '2026-08-15',
    lastContactedAt: '2026-08-30'
  },
  {
    id: 'cnt_2',
    name: 'Marcus Vance',
    email: 'marcus@cryptovision.xyz',
    company: 'CryptoVision Media',
    tags: ['Creator', 'Web3', 'Tier 1'],
    lists: ['Influencer Roster'],
    status: 'active',
    source: 'Influencer Intake',
    createdAt: '2026-08-18',
    lastContactedAt: '2026-08-28'
  },
  {
    id: 'cnt_3',
    name: 'Elena Rostova',
    email: 'elena@quantumscale.ai',
    company: 'QuantumScale Labs',
    tags: ['AI Research', 'Strategic Partner'],
    lists: ['Corporate Partners'],
    status: 'active',
    source: 'Inquiry',
    createdAt: '2026-08-20'
  },
  {
    id: 'cnt_4',
    name: 'David Chen',
    email: 'david.chen@fintechpulse.com',
    company: 'Fintech Pulse Inc',
    tags: ['Customer', 'Jonanda SEO'],
    lists: ['Ecosystem Users'],
    status: 'active',
    source: 'Flow',
    createdAt: '2026-08-22'
  }
];

const SEED_TEMPLATES: EmailTemplate[] = [
  {
    id: 'partner-welcome-v1',
    name: 'Institutional Partner Welcome',
    category: 'Partner',
    subject: 'Welcome to JONANDA Partner Network | Official Confirmation',
    previewText: 'Official onboarding packet and access credentials.',
    bodyHtml: `
      <h2>Welcome to the JONANDA Technology Partner Network</h2>
      <p>Hello {{contactName}},</p>
      <p>We are delighted to confirm that <strong>{{companyName}}</strong> has been accepted into the JONANDA Strategic Partner Program.</p>
      <p>Your dedicated technical liaison will schedule your architectural orientation session shortly.</p>
      <p>Official HQ: <a href="https://llc.jonanda.com">llc.jonanda.com</a></p>
    `,
    variables: ['contactName', 'companyName', 'partner_portal'],
    updatedAt: '2026-08-31'
  },
  {
    id: 'influencer-welcome-v1',
    name: 'Creator Network Onboarding Kit',
    category: 'Influencer',
    subject: 'Welcome to JONANDA Creator Network | Media Kit & Brief',
    previewText: 'Brand assets, guidelines, and active campaign roster.',
    bodyHtml: `
      <h2>Welcome to the JONANDA Creator Network</h2>
      <p>Hi {{creatorName}},</p>
      <p>You are officially active in our campaign roster under the <strong>{{niche}}</strong> track.</p>
      <p>Access your media kit and review guidelines at <a href="https://llc.jonanda.com/influencers">llc.jonanda.com/influencers</a>.</p>
    `,
    variables: ['creatorName', 'handle', 'niche'],
    updatedAt: '2026-08-31'
  },
  {
    id: 'campaign-brief-v1',
    name: 'Campaign Brief & Guidelines',
    category: 'Campaign',
    subject: 'Campaign Brief & Deliverables: {{campaign_name}}',
    previewText: 'Deliverables timeline and creative requirements.',
    bodyHtml: `
      <h2>Campaign Brief: {{campaign_name}}</h2>
      <p>Hi {{creatorName}},</p>
      <p>Here are the creative guidelines and required deliverables for your upcoming sponsored segment.</p>
      <p>Deadline for draft submission: {{deadline}}.</p>
    `,
    variables: ['creatorName', 'campaign_name', 'deadline'],
    updatedAt: '2026-08-31'
  }
];

const SEED_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'cmp_aug_release',
    title: 'Q3 Technology Architecture Release',
    subject: 'Announcing JONANDA FLOW & Next-Gen Automation Frameworks',
    targetList: 'Corporate Partners',
    status: 'sent',
    sentCount: 1420,
    openRate: 48.6,
    clickRate: 18.2,
    sentAt: '2026-08-30'
  },
  {
    id: 'cmp_creator_brief',
    title: 'Creator Program Tier-1 Invitations',
    subject: 'Exclusive Invitation: JONANDA Web3 & AI Influencer Brief',
    targetList: 'Influencer Roster',
    status: 'sent',
    sentCount: 380,
    openRate: 64.2,
    clickRate: 31.5,
    sentAt: '2026-08-28'
  }
];

const SEED_MESSAGES: MailMessage[] = [
  {
    id: 'msg_1',
    from: 'support@mail.jonanda.com',
    to: 'contact@jonanda.com',
    subject: 'JONANDA Mail Infrastructure Health: 100% Operational',
    date: '10:45 AM',
    snippet: 'All SMTP and IMAP servers connected at mail.jonanda.com with zero delivery delays.',
    body: 'The mail routing engine at mail.jonanda.com has reported 100% uptime with DKIM, SPF, and DMARC verification confirmed.',
    isRead: false,
    folder: 'inbox',
    tags: ['System', 'Mail'],
    avatarColor: 'bg-emerald-500/20 text-emerald-400'
  },
  {
    id: 'msg_2',
    from: 'partnerships@nexuscyber.io',
    to: 'contact@jonanda.com',
    subject: 'RE: Strategic Infrastructure Partnership Confirmation',
    date: 'Yesterday',
    snippet: 'Thank you for the welcome packet. We have completed the technical checklist.',
    body: 'Hello JONANDA Team,\n\nWe have reviewed the partner onboarding documentation and completed our DNS/API configuration.',
    isRead: true,
    folder: 'inbox',
    tags: ['Partner'],
    avatarColor: 'bg-gold-500/20 text-gold-400'
  }
];

export const MailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contacts, setContacts] = useState<EmailContact[]>(() => {
    const saved = localStorage.getItem('jonanda_mail_contacts');
    return saved ? JSON.parse(saved) : SEED_CONTACTS;
  });

  const [templates, setTemplates] = useState<EmailTemplate[]>(() => {
    const saved = localStorage.getItem('jonanda_mail_templates');
    return saved ? JSON.parse(saved) : SEED_TEMPLATES;
  });

  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(() => {
    const saved = localStorage.getItem('jonanda_mail_campaigns');
    return saved ? JSON.parse(saved) : SEED_CAMPAIGNS;
  });

  const [messages, setMessages] = useState<MailMessage[]>(SEED_MESSAGES);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  const addContact = (contactData: Omit<EmailContact, 'id' | 'createdAt'>): EmailContact => {
    const newContact: EmailContact = {
      ...contactData,
      id: `cnt_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setContacts((prev) => [newContact, ...prev]);
    return newContact;
  };

  const updateContactStatus = (id: string, status: EmailContact['status']) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const saveTemplate = (template: EmailTemplate) => {
    setTemplates((prev) => {
      const idx = prev.findIndex((t) => t.id === template.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...template, updatedAt: new Date().toISOString().split('T')[0] };
        return copy;
      }
      return [{ ...template, updatedAt: new Date().toISOString().split('T')[0] }, ...prev];
    });
  };

  const deleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  };

  const createCampaign = (
    data: Omit<EmailCampaign, 'id' | 'sentCount' | 'openRate' | 'clickRate'>
  ): EmailCampaign => {
    const newCamp: EmailCampaign = {
      ...data,
      id: `cmp_${Date.now()}`,
      sentCount: 0,
      openRate: 0,
      clickRate: 0
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    return newCamp;
  };

  const sendCampaign = async (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: 'sent',
              sentCount: contacts.filter((ct) => ct.status === 'active').length || 150,
              openRate: 52.4,
              clickRate: 22.8,
              sentAt: new Date().toISOString().split('T')[0]
            }
          : c
      )
    );
  };

  const markMessageRead = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isRead: true } : m))
    );
  };

  return (
    <MailContext.Provider
      value={{
        contacts,
        templates,
        campaigns,
        messages,
        addContact,
        updateContactStatus,
        deleteContact,
        saveTemplate,
        deleteTemplate,
        createCampaign,
        sendCampaign,
        markMessageRead
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error('useMail must be used within a MailProvider');
  }
  return context;
};
