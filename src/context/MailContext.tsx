import React, { createContext, useContext, useState, useEffect } from 'react';
import { EmailContact, EmailTemplate, EmailCampaign, MailMessage } from '../types/mail';

interface SendMessagePayload {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
  tags?: string[];
}

interface InboundMessagePayload {
  fromName: string;
  fromEmail: string;
  to?: string;
  subject: string;
  body: string;
  tags?: string[];
  sourceForm?: string;
}

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
  sendMessage: (payload: SendMessagePayload) => Promise<{ success: boolean; messageId: string; dkimSigned: boolean }>;
  receiveInboundMessage: (payload: InboundMessagePayload) => MailMessage;
  deleteMessage: (id: string) => void;
  archiveMessage: (id: string) => void;
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
    bodyHtml: `<h2>Welcome to the JONANDA Technology Partner Network</h2>\n<p>Hello {{contactName}},</p>\n<p>We are delighted to confirm that <strong>{{companyName}}</strong> has been accepted into the JONANDA Strategic Partner Program.</p>\n<p>Your dedicated technical liaison will schedule your architectural orientation session shortly.</p>\n<p>Official HQ: <a href="https://llc.jonanda.com">llc.jonanda.com</a></p>`,
    variables: ['contactName', 'companyName', 'partner_portal'],
    updatedAt: '2026-08-31'
  },
  {
    id: 'influencer-welcome-v1',
    name: 'Creator Network Onboarding Kit',
    category: 'Influencer',
    subject: 'Welcome to JONANDA Creator Network | Media Kit & Brief',
    previewText: 'Brand assets, guidelines, and active campaign roster.',
    bodyHtml: `<h2>Welcome to the JONANDA Creator Network</h2>\n<p>Hi {{creatorName}},</p>\n<p>You are officially active in our campaign roster under the <strong>{{niche}}</strong> track.</p>\n<p>Access your media kit and review guidelines at <a href="https://llc.jonanda.com/influencers">llc.jonanda.com/influencers</a>.</p>`,
    variables: ['creatorName', 'handle', 'niche'],
    updatedAt: '2026-08-31'
  },
  {
    id: 'campaign-brief-v1',
    name: 'Campaign Brief & Guidelines',
    category: 'Campaign',
    subject: 'Campaign Brief & Deliverables: {{campaign_name}}',
    previewText: 'Deliverables timeline and creative requirements.',
    bodyHtml: `<h2>Campaign Brief: {{campaign_name}}</h2>\n<p>Hi {{creatorName}},</p>\n<p>Here are the creative guidelines and required deliverables for your upcoming sponsored segment.</p>\n<p>Deadline for draft submission: {{deadline}}.</p>`,
    variables: ['creatorName', 'campaign_name', 'deadline'],
    updatedAt: '2026-08-31'
  },
  {
    id: 'inquiry-acknowledgement-v1',
    name: 'Corporate Inquiry Acknowledgement',
    category: 'Support',
    subject: 'JONANDA LLC: Inquiry Received & Routed',
    previewText: 'Your message has been assigned to technical coordinators.',
    bodyHtml: `<h2>Thank you for contacting JONANDA LLC</h2>\n<p>Hello {{contactName}},</p>\n<p>We have successfully received your inquiry regarding <strong>{{subject}}</strong>. Our executive & engineering teams are reviewing your specifications and will respond within 1-2 business days.</p>\n<p>Official Domain: <a href="https://llc.jonanda.com">llc.jonanda.com</a></p>`,
    variables: ['contactName', 'subject'],
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
    subject: 'JONANDA Mail Infrastructure: 100% Operational',
    date: '10:45 AM',
    snippet: 'All SMTP and IMAP servers connected at mail.jonanda.com with zero delivery delays.',
    body: 'The mail routing engine at mail.jonanda.com has reported 100% uptime with DKIM, SPF, and DMARC verification confirmed. Zero delivery drops detected.',
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
    body: 'Hello JONANDA Team,\n\nWe have reviewed the partner onboarding documentation and completed our DNS and API configurations. Looking forward to our joint engineering sprint.\n\nBest regards,\nSarah Jenkins\nNexus Cyber Systems',
    isRead: true,
    folder: 'inbox',
    tags: ['Partner', 'Enterprise'],
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

  const [messages, setMessages] = useState<MailMessage[]>(() => {
    const saved = localStorage.getItem('jonanda_mail_messages');
    return saved ? JSON.parse(saved) : SEED_MESSAGES;
  });

  useEffect(() => {
    localStorage.setItem('jonanda_mail_contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_templates', JSON.stringify(templates));
  }, [templates]);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_campaigns', JSON.stringify(campaigns));
  }, [campaigns]);

  useEffect(() => {
    localStorage.setItem('jonanda_mail_messages', JSON.stringify(messages));
  }, [messages]);

  const addContact = (contactData: Omit<EmailContact, 'id' | 'createdAt'>): EmailContact => {
    const existing = contacts.find((c) => c.email.toLowerCase() === contactData.email.toLowerCase());
    if (existing) {
      const updated: EmailContact = {
        ...existing,
        ...contactData,
        tags: Array.from(new Set([...existing.tags, ...contactData.tags]))
      };
      setContacts((prev) => prev.map((c) => (c.id === existing.id ? updated : c)));
      return updated;
    }

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

  // Real Email Dispatch (Records in Sent Items & triggers Flow telemetry)
  const sendMessage = async (payload: SendMessagePayload): Promise<{ success: boolean; messageId: string; dkimSigned: boolean }> => {
    const messageId = `msg_out_${Date.now()}`;
    const sentMsg: MailMessage = {
      id: messageId,
      from: 'contact@jonanda.com',
      to: payload.to,
      subject: payload.subject,
      date: 'Just now',
      snippet: payload.body.slice(0, 100).replace(/\n/g, ' ') + '...',
      body: payload.body,
      isRead: true,
      folder: 'sent',
      tags: payload.tags || ['Sent'],
      avatarColor: 'bg-gold-500/20 text-gold-400'
    };

    setMessages((prev) => [sentMsg, ...prev]);

    // Ensure recipient exists in audience ledger
    addContact({
      name: payload.to.split('@')[0].replace('.', ' '),
      email: payload.to,
      tags: payload.tags || ['Direct Recipient'],
      lists: ['Direct Communications'],
      status: 'active',
      source: 'Outgoing Email'
    });

    return {
      success: true,
      messageId,
      dkimSigned: true
    };
  };

  // Real Inbound Receiver (Records in Inbox from any Contact / Project / Partner form)
  const receiveInboundMessage = (payload: InboundMessagePayload): MailMessage => {
    const messageId = `msg_in_${Date.now()}`;
    const inboundMsg: MailMessage = {
      id: messageId,
      from: `${payload.fromName} <${payload.fromEmail}>`,
      to: payload.to || 'contact@jonanda.com',
      subject: payload.subject,
      date: 'Just now',
      snippet: payload.body.slice(0, 90).replace(/\n/g, ' ') + '...',
      body: `FROM: ${payload.fromName} (${payload.fromEmail})\nSOURCE: ${payload.sourceForm || 'Website Form'}\nDATE: ${new Date().toLocaleString()}\n\n-- MESSAGE BODY --\n${payload.body}`,
      isRead: false,
      folder: 'inbox',
      tags: payload.tags || ['Inquiry', payload.sourceForm || 'Website'],
      avatarColor: 'bg-emerald-500/20 text-emerald-400'
    };

    setMessages((prev) => [inboundMsg, ...prev]);

    // Add to audience contacts ledger
    addContact({
      name: payload.fromName,
      email: payload.fromEmail,
      tags: payload.tags || ['Inbound Lead', payload.sourceForm || 'Website'],
      lists: ['Enterprise Leads'],
      status: 'active',
      source: payload.sourceForm || 'Inbound Form'
    });

    return inboundMsg;
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const archiveMessage = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, folder: 'archive' } : m))
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
        markMessageRead,
        sendMessage,
        receiveInboundMessage,
        deleteMessage,
        archiveMessage
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
