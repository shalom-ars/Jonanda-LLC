import { EcosystemProject, Domain, Mailbox, EmailThread, Contact, ContactGroup, Campaign, EmailTemplate, Automation, AuditLog, User, Organization, SystemHealth } from '../types';

export const INITIAL_ORGANIZATION: Organization = {
  id: 'org_jonanda_master',
  name: 'JONANDA Global Enterprise',
  slug: 'jonanda-global',
  plan: 'Enterprise',
  status: 'active',
  createdAt: '2026-01-15T00:00:00Z',
  allowedDomains: 25,
  allowedMailboxes: 100,
  allowedCampaigns: 500
};

export const INITIAL_USER: User = {
  id: 'usr_ar_admin',
  orgId: 'org_jonanda_master',
  email: 'admin@jonanda.com',
  name: 'Antigravity Executive Admin',
  role: 'Super Admin',
  status: 'active',
  is2faEnabled: true,
  createdAt: '2026-01-15T00:00:00Z',
  lastLoginAt: '2026-08-31T15:10:00Z'
};

export const ECOSYSTEM_PROJECTS: EcosystemProject[] = [
  {
    id: 'jonanda-llc',
    name: 'JONANDA LLC',
    slug: 'jonanda-llc',
    category: 'Parent Corporate Entity & Technology Holding',
    status: 'Live',
    domain: 'jonanda.com',
    hasLiveDomain: true,
    brandColor: '#0e8ee9',
    description: 'Corporate parent organization orchestrating AI research, digital assets, and high-performance software systems.',
    emailIdentities: ['contact@jonanda.com', 'support@jonanda.com', 'info@jonanda.com'],
    mailboxesCount: 3,
    campaignsCount: 4,
    dnsConfigured: true
  },
  {
    id: 'lozula-cybersecurity',
    name: 'LOZULA Cybersecurity',
    slug: 'lozula-cybersecurity',
    category: 'Defensive Cyber Technology & Assessment',
    status: 'Live',
    domain: 'lozula.com',
    hasLiveDomain: true,
    brandColor: '#10b981',
    description: 'Advanced defensive cybersecurity suite delivering continuous vulnerability diagnostics, perimeter hardening, and threat modeling.',
    emailIdentities: ['support@lozula.com', 'security@lozula.com', 'contact@lozula.com'],
    mailboxesCount: 3,
    campaignsCount: 2,
    dnsConfigured: true
  },
  {
    id: 'equalshare-foundation',
    name: 'EqualShare Foundation',
    slug: 'equalshare',
    category: 'Social Impact & Accessible Technology',
    status: 'Active',
    domain: 'equalshare.org',
    hasLiveDomain: true,
    brandColor: '#06b6d4',
    description: 'Initiative dedicated to digital equity, open educational access, and ethical technological empowerment.',
    emailIdentities: ['contact@equalshare.org', 'support@equalshare.org'],
    mailboxesCount: 2,
    campaignsCount: 1,
    dnsConfigured: true
  },
  {
    id: 'jonanda-coin',
    name: 'Jonanda Coin (JNDA)',
    slug: 'jonanda-coin',
    category: 'Web3 & AI Digital Asset Ecosystem',
    status: 'Active',
    hasLiveDomain: false,
    brandColor: '#f59e0b',
    description: 'Decentralized digital asset and smart contract utility ecosystem integrated with artificial intelligence architectures.',
    emailIdentities: ['Coming Soon (Domain in staging)'],
    mailboxesCount: 0,
    campaignsCount: 0,
    dnsConfigured: false
  },
  {
    id: 'jonanda-studio',
    name: 'Jonanda Studio',
    slug: 'jonanda-studio',
    category: 'AI & Intelligent Workflows',
    status: 'Coming Soon',
    hasLiveDomain: false,
    brandColor: '#8b5cf6',
    description: 'Next-generation AI workspace and multi-step agent orchestrator for modern developer pipelines.',
    emailIdentities: ['Coming Soon'],
    mailboxesCount: 0,
    campaignsCount: 0,
    dnsConfigured: false
  },
  {
    id: 'jonanda-seo',
    name: 'Jonanda SEO',
    slug: 'jonanda-seo',
    category: 'Automated SEO Intelligence',
    status: 'Coming Soon',
    hasLiveDomain: false,
    brandColor: '#6366f1',
    description: 'Automated technical website audits, on-page optimization, and organic search visibility telemetry platform.',
    emailIdentities: ['Coming Soon'],
    mailboxesCount: 0,
    campaignsCount: 0,
    dnsConfigured: false
  },
  {
    id: 'jonanda-influencer',
    name: 'Jonanda Influencer',
    slug: 'jonanda-influencer',
    category: 'Creator Economy & Campaign Management',
    status: 'Coming Soon',
    hasLiveDomain: false,
    brandColor: '#ec4899',
    description: 'Enterprise brand and creator collaboration platform with standardized discovery and campaign milestones.',
    emailIdentities: ['Coming Soon'],
    mailboxesCount: 0,
    campaignsCount: 0,
    dnsConfigured: false
  },
  {
    id: 'jonanda-security-toolkit',
    name: 'Jonanda Security Toolkit',
    slug: 'jonanda-security-toolkit',
    category: 'Defensive Security Diagnostics (R&D)',
    status: 'R&D',
    hasLiveDomain: false,
    brandColor: '#ef4444',
    description: 'Proprietary security diagnostics engine for authorized perimeter mapping, DNS reconnaissance, and vulnerability verification.',
    emailIdentities: ['Coming Soon'],
    mailboxesCount: 0,
    campaignsCount: 0,
    dnsConfigured: false
  }
];

export const INITIAL_DOMAINS: Domain[] = [
  {
    id: 'dom_jonanda',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    domainName: 'jonanda.com',
    status: 'verified',
    spfStatus: 'verified',
    dkimStatus: 'verified',
    dmarcStatus: 'verified',
    mxStatus: 'verified',
    dkimSelector: 'jonanda',
    records: {
      spf: {
        type: 'TXT',
        host: '@',
        value: 'v=spf1 include:_spf.mail.jonanda.com ~all',
        status: 'verified'
      },
      dkim: {
        type: 'TXT',
        host: 'jonanda._domainkey',
        value: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0a...',
        status: 'verified'
      },
      dmarc: {
        type: 'TXT',
        host: '_dmarc',
        value: 'v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@mail.jonanda.com',
        status: 'verified'
      },
      mx: {
        type: 'MX',
        host: '@',
        value: 'mail.jonanda.com',
        priority: 10,
        status: 'verified'
      }
    },
    verifiedAt: '2026-01-20T10:00:00Z',
    lastCheckedAt: '2026-08-31T14:00:00Z'
  },
  {
    id: 'dom_lozula',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    domainName: 'lozula.com',
    status: 'verified',
    spfStatus: 'verified',
    dkimStatus: 'verified',
    dmarcStatus: 'verified',
    mxStatus: 'verified',
    dkimSelector: 'lozula',
    records: {
      spf: {
        type: 'TXT',
        host: '@',
        value: 'v=spf1 include:_spf.mail.jonanda.com ~all',
        status: 'verified'
      },
      dkim: {
        type: 'TXT',
        host: 'lozula._domainkey',
        value: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1b...',
        status: 'verified'
      },
      dmarc: {
        type: 'TXT',
        host: '_dmarc',
        value: 'v=DMARC1; p=reject; pct=100; rua=mailto:dmarc-reports@mail.jonanda.com',
        status: 'verified'
      },
      mx: {
        type: 'MX',
        host: '@',
        value: 'mail.jonanda.com',
        priority: 10,
        status: 'verified'
      }
    },
    verifiedAt: '2026-02-01T12:00:00Z',
    lastCheckedAt: '2026-08-31T14:00:00Z'
  },
  {
    id: 'dom_equalshare',
    orgId: 'org_jonanda_master',
    projectId: 'equalshare-foundation',
    domainName: 'equalshare.org',
    status: 'verified',
    spfStatus: 'verified',
    dkimStatus: 'verified',
    dmarcStatus: 'verified',
    mxStatus: 'verified',
    dkimSelector: 'equalshare',
    records: {
      spf: {
        type: 'TXT',
        host: '@',
        value: 'v=spf1 include:_spf.mail.jonanda.com ~all',
        status: 'verified'
      },
      dkim: {
        type: 'TXT',
        host: 'equalshare._domainkey',
        value: 'v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2c...',
        status: 'verified'
      },
      dmarc: {
        type: 'TXT',
        host: '_dmarc',
        value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@mail.jonanda.com',
        status: 'verified'
      },
      mx: {
        type: 'MX',
        host: '@',
        value: 'mail.jonanda.com',
        priority: 10,
        status: 'verified'
      }
    },
    verifiedAt: '2026-03-10T16:00:00Z',
    lastCheckedAt: '2026-08-31T14:00:00Z'
  }
];

export const INITIAL_MAILBOXES: Mailbox[] = [
  {
    id: 'mbx_jonanda_contact',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    domainId: 'dom_jonanda',
    email: 'contact@jonanda.com',
    displayName: 'JONANDA Executive Office',
    quotaBytes: 10737418240, // 10 GB
    usedBytes: 1289748480,  // 1.2 GB
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    signature: '--\nJONANDA LLC Executive Office\nmail.jonanda.com',
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'mbx_jonanda_support',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    domainId: 'dom_jonanda',
    email: 'support@jonanda.com',
    displayName: 'JONANDA Platform Support',
    quotaBytes: 10737418240,
    usedBytes: 3221225472,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    signature: '--\nJONANDA Support Team\nsupport@jonanda.com',
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'mbx_jonanda_info',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    domainId: 'dom_jonanda',
    email: 'info@jonanda.com',
    displayName: 'JONANDA General Inquiries',
    quotaBytes: 5368709120,
    usedBytes: 429496729,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    createdAt: '2026-01-20T00:00:00Z'
  },
  {
    id: 'mbx_lozula_support',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    domainId: 'dom_lozula',
    email: 'support@lozula.com',
    displayName: 'LOZULA Security Support',
    quotaBytes: 10737418240,
    usedBytes: 2147483648,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    signature: '--\nLOZULA Cybersecurity Operations\nlozula.com',
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'mbx_lozula_security',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    domainId: 'dom_lozula',
    email: 'security@lozula.com',
    displayName: 'LOZULA Threat Intelligence Team',
    quotaBytes: 10737418240,
    usedBytes: 1073741824,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    signature: '--\nLOZULA Threat & Incident Response Desk',
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'mbx_lozula_contact',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    domainId: 'dom_lozula',
    email: 'contact@lozula.com',
    displayName: 'LOZULA Cybersecurity Inquiries',
    quotaBytes: 5368709120,
    usedBytes: 214748364,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    createdAt: '2026-02-01T00:00:00Z'
  },
  {
    id: 'mbx_equalshare_contact',
    orgId: 'org_jonanda_master',
    projectId: 'equalshare-foundation',
    domainId: 'dom_equalshare',
    email: 'contact@equalshare.org',
    displayName: 'EqualShare Outreach Office',
    quotaBytes: 5368709120,
    usedBytes: 858993459,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    signature: '--\nEqualShare Foundation\nequalshare.org',
    createdAt: '2026-03-10T00:00:00Z'
  },
  {
    id: 'mbx_equalshare_support',
    orgId: 'org_jonanda_master',
    projectId: 'equalshare-foundation',
    domainId: 'dom_equalshare',
    email: 'support@equalshare.org',
    displayName: 'EqualShare Community Assistance',
    quotaBytes: 5368709120,
    usedBytes: 322122547,
    status: 'active',
    sendingEnabled: true,
    assignedUsers: ['usr_ar_admin'],
    createdAt: '2026-03-10T00:00:00Z'
  }
];

export const INITIAL_THREADS: EmailThread[] = [
  {
    id: 'th_01_security_audit',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    mailboxId: 'mbx_lozula_security',
    subject: 'Quarterly Infrastructure Perimeter Security Audit — Completed',
    snippet: 'All external endpoints and DNS records have passed the automated vulnerability and spoofing test...',
    lastMessageAt: '2026-08-31T14:32:00Z',
    messageCount: 2,
    unreadCount: 1,
    isStarred: true,
    isRead: false,
    folder: 'inbox',
    labels: ['Security', 'Audit', 'High Priority'],
    participants: [
      { name: 'Marcus Vance', email: 'm.vance@defense-partners.com' },
      { name: 'LOZULA Threat Intelligence Team', email: 'security@lozula.com' }
    ],
    messages: [
      {
        id: 'msg_01_01',
        threadId: 'th_01_security_audit',
        orgId: 'org_jonanda_master',
        projectId: 'lozula-cybersecurity',
        mailboxId: 'mbx_lozula_security',
        from: { name: 'Marcus Vance', email: 'm.vance@defense-partners.com' },
        to: [{ name: 'LOZULA Threat Intelligence Team', email: 'security@lozula.com' }],
        subject: 'Quarterly Infrastructure Perimeter Security Audit — Completed',
        snippet: 'Here is the summary of the quarterly assessment on lozula.com and mail infrastructure.',
        bodyHtml: `<p>Hello LOZULA Security Team,</p><p>We have completed the comprehensive DNS and perimeter diagnostic for <strong>lozula.com</strong> and connected email infrastructure.</p><p>Summary findings:</p><ul><li><strong>SPF:</strong> Strict pass (~all) configured correctly.</li><li><strong>DKIM:</strong> 2048-bit RSA key verified.</li><li><strong>DMARC:</strong> Enforcement set to reject (p=reject) with 100% compliance.</li><li><strong>TLS:</strong> Strict TLS 1.3 enforced on SMTP and web endpoints.</li></ul><p>Report is attached for your records.</p><p>Best regards,<br>Marcus Vance<br>Principal Security Auditor</p>`,
        bodyText: `Hello LOZULA Security Team,\nWe have completed the comprehensive DNS and perimeter diagnostic for lozula.com...`,
        date: '2026-08-31T11:15:00Z',
        isRead: true,
        isStarred: false,
        isDraft: false,
        isSpam: false,
        isTrash: false,
        isArchive: false,
        folder: 'inbox',
        labels: ['Security', 'Audit'],
        attachments: [
          { id: 'att_01', name: 'LOZULA_Q3_Security_Audit.pdf', size: 1843200, type: 'application/pdf' }
        ],
        messageIdHeader: '<sec-audit-20260831@defense-partners.com>'
      },
      {
        id: 'msg_01_02',
        threadId: 'th_01_security_audit',
        orgId: 'org_jonanda_master',
        projectId: 'lozula-cybersecurity',
        mailboxId: 'mbx_lozula_security',
        from: { name: 'LOZULA Threat Intelligence Team', email: 'security@lozula.com' },
        to: [{ name: 'Marcus Vance', email: 'm.vance@defense-partners.com' }],
        subject: 'Re: Quarterly Infrastructure Perimeter Security Audit — Completed',
        snippet: 'Thank you Marcus. The findings have been archived in our compliance registry.',
        bodyHtml: `<p>Thank you Marcus,</p><p>We have received and archived the Q3 diagnostic report in our compliance telemetry logs. All DNS authentication assertions remain locked under automated monitoring.</p><p>Regards,<br>LOZULA Threat Intelligence Desk</p>`,
        bodyText: `Thank you Marcus,\nWe have received and archived the Q3 diagnostic report...`,
        date: '2026-08-31T14:32:00Z',
        isRead: false,
        isStarred: true,
        isDraft: false,
        isSpam: false,
        isTrash: false,
        isArchive: false,
        folder: 'inbox',
        labels: ['Security', 'High Priority'],
        attachments: [],
        messageIdHeader: '<lozula-sec-reply-49281@mail.jonanda.com>',
        inReplyTo: '<sec-audit-20260831@defense-partners.com>'
      }
    ]
  },
  {
    id: 'th_02_enterprise_inquiry',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    mailboxId: 'mbx_jonanda_contact',
    subject: 'Enterprise Partnership Inquiry — AI Infrastructure Integration',
    snippet: 'We are looking to integrate the JONANDA ecosystem workflow agents into our sovereign cloud setup...',
    lastMessageAt: '2026-08-31T13:45:00Z',
    messageCount: 1,
    unreadCount: 1,
    isStarred: false,
    isRead: false,
    folder: 'inbox',
    labels: ['Business', 'Partnership'],
    participants: [
      { name: 'Elena Rostova', email: 'e.rostova@quantum-scale.tech' },
      { name: 'JONANDA Executive Office', email: 'contact@jonanda.com' }
    ],
    messages: [
      {
        id: 'msg_02_01',
        threadId: 'th_02_enterprise_inquiry',
        orgId: 'org_jonanda_master',
        projectId: 'jonanda-llc',
        mailboxId: 'mbx_jonanda_contact',
        from: { name: 'Elena Rostova', email: 'e.rostova@quantum-scale.tech' },
        to: [{ name: 'JONANDA Executive Office', email: 'contact@jonanda.com' }],
        subject: 'Enterprise Partnership Inquiry — AI Infrastructure Integration',
        snippet: 'We are interested in evaluating the JONANDA platform capabilities for our distributed developer teams.',
        bodyHtml: `<p>Dear JONANDA Leadership,</p><p>We have been closely tracking the advancements across the JONANDA technology portfolio, particularly your enterprise AI workflow pipelines and LOZULA cybersecurity verification standards.</p><p>We would like to schedule a confidential briefing to discuss API integration and enterprise pilot licensing.</p><p>Looking forward to your reply.</p><p>Sincerely,<br>Elena Rostova<br>VP of Strategic Infrastructure<br>QuantumScale Technologies</p>`,
        bodyText: `Dear JONANDA Leadership,\nWe have been closely tracking the advancements...`,
        date: '2026-08-31T13:45:00Z',
        isRead: false,
        isStarred: false,
        isDraft: false,
        isSpam: false,
        isTrash: false,
        isArchive: false,
        folder: 'inbox',
        labels: ['Business', 'Partnership'],
        attachments: [],
        messageIdHeader: '<qs-inq-9817@quantum-scale.tech>'
      }
    ]
  },
  {
    id: 'th_03_equalshare_grant',
    orgId: 'org_jonanda_master',
    projectId: 'equalshare-foundation',
    mailboxId: 'mbx_equalshare_contact',
    subject: 'Global Digital Access Grant Application Confirmation #2026-894',
    snippet: 'Your application for the 2026 Open Technology Education distribution has been received...',
    lastMessageAt: '2026-08-30T16:20:00Z',
    messageCount: 1,
    unreadCount: 0,
    isStarred: true,
    isRead: true,
    folder: 'inbox',
    labels: ['Grants', 'Community'],
    participants: [
      { name: 'UNESCO Digital Futures Desk', email: 'grants@unesco-techfutures.org' },
      { name: 'EqualShare Outreach Office', email: 'contact@equalshare.org' }
    ],
    messages: [
      {
        id: 'msg_03_01',
        threadId: 'th_03_equalshare_grant',
        orgId: 'org_jonanda_master',
        projectId: 'equalshare-foundation',
        mailboxId: 'mbx_equalshare_contact',
        from: { name: 'UNESCO Digital Futures Desk', email: 'grants@unesco-techfutures.org' },
        to: [{ name: 'EqualShare Outreach Office', email: 'contact@equalshare.org' }],
        subject: 'Global Digital Access Grant Application Confirmation #2026-894',
        snippet: 'Confirmation of receipt for EqualShare Foundation community tech distribution program.',
        bodyHtml: `<p>Dear EqualShare Foundation Directors,</p><p>We acknowledge receipt of your proposal under the Global Digital Access Initiative.</p><p>The evaluation committee is currently reviewing your project deliverables regarding open educational computing access.</p><p>Status updates will be communicated through this verified address.</p><p>Warm regards,<br>Secretariat for Digital Inclusion</p>`,
        bodyText: `Dear EqualShare Foundation Directors,\nWe acknowledge receipt of your proposal...`,
        date: '2026-08-30T16:20:00Z',
        isRead: true,
        isStarred: true,
        isDraft: false,
        isSpam: false,
        isTrash: false,
        isArchive: false,
        folder: 'inbox',
        labels: ['Grants', 'Community'],
        attachments: [],
        messageIdHeader: '<unesco-rec-89410@unesco-techfutures.org>'
      }
    ]
  }
];

export const INITIAL_CONTACT_GROUPS: ContactGroup[] = [
  {
    id: 'grp_enterprise_clients',
    orgId: 'org_jonanda_master',
    name: 'Enterprise VIP Partners',
    description: 'Verified enterprise clients with active SLAs across JONANDA & LOZULA systems.',
    contactCount: 42,
    createdAt: '2026-01-25T00:00:00Z'
  },
  {
    id: 'grp_security_advisors',
    orgId: 'org_jonanda_master',
    name: 'Cybersecurity Threat Advisors',
    description: 'Security researchers, audit partners, and incident contact points.',
    contactCount: 28,
    createdAt: '2026-02-05T00:00:00Z'
  },
  {
    id: 'grp_ecosystem_subscribers',
    orgId: 'org_jonanda_master',
    name: 'Ecosystem Newsletter Subscribers',
    description: 'Opted-in community members receiving monthly ecosystem updates.',
    contactCount: 156,
    createdAt: '2026-02-12T00:00:00Z'
  },
  {
    id: 'grp_equalshare_partners',
    orgId: 'org_jonanda_master',
    name: 'EqualShare Impact Stakeholders',
    description: 'Non-profit and educational partners collaborating with EqualShare Foundation.',
    contactCount: 35,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'cnt_01',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'e.rostova@quantum-scale.tech',
    phone: '+1 (555) 392-1049',
    company: 'QuantumScale Technologies',
    tags: ['Enterprise', 'Lead', 'VIP'],
    groups: ['Enterprise VIP Partners'],
    status: 'subscribed',
    engagementScore: 94,
    lastEmailedAt: '2026-08-31T13:45:00Z',
    createdAt: '2026-02-10T00:00:00Z'
  },
  {
    id: 'cnt_02',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    firstName: 'Marcus',
    lastName: 'Vance',
    email: 'm.vance@defense-partners.com',
    phone: '+1 (555) 839-2041',
    company: 'Defense Partners International',
    tags: ['Auditor', 'Security', 'Advisory'],
    groups: ['Cybersecurity Threat Advisors'],
    status: 'subscribed',
    engagementScore: 98,
    lastEmailedAt: '2026-08-31T14:32:00Z',
    createdAt: '2026-02-15T00:00:00Z'
  },
  {
    id: 'cnt_03',
    orgId: 'org_jonanda_master',
    projectId: 'equalshare-foundation',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 's.jenkins@open-futures.ngo',
    phone: '+1 (555) 749-1102',
    company: 'Open Futures NGO',
    tags: ['Foundation', 'Education'],
    groups: ['EqualShare Impact Stakeholders'],
    status: 'subscribed',
    engagementScore: 82,
    lastEmailedAt: '2026-08-28T09:12:00Z',
    createdAt: '2026-03-05T00:00:00Z'
  },
  {
    id: 'cnt_04',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@apex-capital.io',
    company: 'Apex Digital Capital',
    tags: ['Investor', 'Web3'],
    groups: ['Enterprise VIP Partners', 'Ecosystem Newsletter Subscribers'],
    status: 'subscribed',
    engagementScore: 76,
    lastEmailedAt: '2026-08-25T11:00:00Z',
    createdAt: '2026-03-12T00:00:00Z'
  },
  {
    id: 'cnt_05',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    firstName: 'Amina',
    lastName: 'Diallo',
    email: 'a.diallo@shield-ops.eu',
    company: 'ShieldOps Europe',
    tags: ['Security', 'EU Partner'],
    groups: ['Cybersecurity Threat Advisors'],
    status: 'subscribed',
    engagementScore: 88,
    lastEmailedAt: '2026-08-20T15:40:00Z',
    createdAt: '2026-04-01T00:00:00Z'
  }
];

export const INITIAL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tpl_welcome_enterprise',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    name: 'Executive Welcome & Onboarding',
    category: 'welcome',
    subject: 'Welcome to JONANDA Ecosystem — Workspace Overview',
    previewText: 'Your centralized communication and technology workspace is ready.',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c1322; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #38a9f8; margin: 0; font-size: 24px; letter-spacing: 0.05em;">JONANDA MAIL</h1>
    <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Central Email & Communication Platform</p>
  </div>
  <h2 style="color: #ffffff; font-size: 18px;">Welcome to Your Ecosystem Workspace, {{firstName}}</h2>
  <p style="color: #cbd5e1; line-height: 1.6;">Your organization account has been provisioned with centralized business email, verified multi-project domains, and automated deliverability monitoring.</p>
  <div style="background: #111827; padding: 16px; border-radius: 8px; border-left: 4px solid #0e8ee9; margin: 20px 0;">
    <p style="margin: 0; color: #e2e8f0; font-weight: 600;">Key Capabilities Provisioned:</p>
    <ul style="margin: 8px 0 0 0; padding-left: 20px; color: #94a3b8; font-size: 14px;">
      <li>Isolated Mailboxes with SPF, DKIM & DMARC Enforcement</li>
      <li>Threaded Webmail & Multi-Project Switcher</li>
      <li>Audience Segmentation & Compliant Campaign Deliverability</li>
    </ul>
  </div>
  <div style="text-align: center; margin: 28px 0;">
    <a href="https://app.mail.jonanda.com" style="background: #0e8ee9; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">Access Your Mailbox</a>
  </div>
  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 28px 0;" />
  <div style="text-align: center; color: #64748b; font-size: 12px;">
    <p style="margin: 0;">JONANDA LLC • Technology & Communication Infrastructure</p>
    <p style="margin: 4px 0 0 0;"><a href="{{unsubscribeUrl}}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a> • <a href="https://mail.jonanda.com/privacy" style="color: #64748b;">Privacy Policy</a></p>
  </div>
</div>`,
    jsonBlocks: [
      { id: 'b1', type: 'heading', content: { text: 'JONANDA MAIL', level: 'h1', align: 'center' } },
      { id: 'b2', type: 'text', content: { text: 'Central Email & Communication Platform' } },
      { id: 'b3', type: 'heading', content: { text: 'Welcome to Your Ecosystem Workspace, {{firstName}}', level: 'h2' } },
      { id: 'b4', type: 'text', content: { text: 'Your organization account has been provisioned with centralized business email, verified multi-project domains, and automated deliverability monitoring.' } },
      { id: 'b5', type: 'button', content: { buttonText: 'Access Your Mailbox', url: 'https://app.mail.jonanda.com', buttonColor: '#0e8ee9' } },
      { id: 'b6', type: 'divider', content: {} },
      { id: 'b7', type: 'unsubscribe', content: {} }
    ],
    updatedAt: '2026-08-30T10:00:00Z',
    isSystem: true
  },
  {
    id: 'tpl_security_advisory',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    name: 'LOZULA Threat & Security Advisory',
    category: 'security_alert',
    subject: 'SECURITY ADVISORY: Perimeter Verification & DNS Policy Notice',
    previewText: 'Crucial verification update regarding domain SPF/DKIM policy alignment.',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #050811; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #10b981;">
  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 24px;">
    <h1 style="color: #10b981; margin: 0; font-size: 20px; font-weight: 700;">LOZULA CYBERSECURITY</h1>
    <span style="background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 1px solid rgba(16, 185, 129, 0.3);">SECURITY ALERT</span>
  </div>
  <h2 style="color: #ffffff; font-size: 18px; margin-top: 0;">Automated Diagnostic Telemetry Update</h2>
  <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6;">This advisory confirms that automated defensive perimeter verification checks have been dispatched across your monitored digital assets.</p>
  <div style="background: #0d1624; border: 1px solid #1e293b; border-radius: 8px; padding: 16px; margin: 20px 0;">
    <p style="margin: 0 0 8px 0; color: #10b981; font-size: 13px; font-weight: bold;">AUTHENTICATION VERIFICATION STATUS</p>
    <div style="font-family: monospace; font-size: 12px; color: #94a3b8; line-height: 1.8;">
      <div>• SPF Record: PASS (Strict host restriction active)</div>
      <div>• DKIM 2048: VALID (Cryptographic signature verified)</div>
      <div>• DMARC: ENFORCED (p=reject strict alignment)</div>
    </div>
  </div>
  <p style="color: #94a3b8; font-size: 13px;">No defensive manual action is required at this time.</p>
  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />
  <div style="text-align: center; color: #64748b; font-size: 11px;">
    <p>LOZULA Cybersecurity Operations • Automated Security Dispatch</p>
    <p><a href="{{unsubscribeUrl}}" style="color: #64748b;">Manage Email Preferences</a></p>
  </div>
</div>`,
    jsonBlocks: [
      { id: 'b1', type: 'heading', content: { text: 'LOZULA CYBERSECURITY', level: 'h1' } },
      { id: 'b2', type: 'heading', content: { text: 'Security Advisory Notice', level: 'h2' } },
      { id: 'b3', type: 'text', content: { text: 'Automated defensive perimeter verification checks have passed successfully.' } },
      { id: 'b4', type: 'divider', content: {} },
      { id: 'b5', type: 'unsubscribe', content: {} }
    ],
    updatedAt: '2026-08-29T14:00:00Z',
    isSystem: true
  },
  {
    id: 'tpl_monthly_newsletter',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    name: 'Ecosystem Monthly Briefing',
    category: 'newsletter',
    subject: 'JONANDA Ecosystem Dispatch — August 2026 Tech & Product Briefing',
    previewText: 'Key milestones across JONANDA, LOZULA, and EqualShare technology pipelines.',
    htmlContent: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c1322; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
  <div style="text-align: center; margin-bottom: 24px;">
    <span style="color: #f59e0b; font-weight: 700; letter-spacing: 0.1em; font-size: 12px;">MONTHLY DISPATCH</span>
    <h1 style="color: #ffffff; margin: 6px 0 0 0; font-size: 24px;">JONANDA Technology Briefing</h1>
  </div>
  <p style="color: #cbd5e1; line-height: 1.6;">Welcome to the August 2026 ecosystem digest. Here is a summary of major product progressions and architectural milestones:</p>
  <div style="border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 16px;">
    <h3 style="color: #0e8ee9; margin: 0 0 8px 0;">1. JONANDA MAIL Platform Unveiled</h3>
    <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5;">Centralized communication infrastructure supporting all JONANDA brand identities with strict deliverability compliance.</p>
  </div>
  <div style="border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 16px;">
    <h3 style="color: #10b981; margin: 0 0 8px 0;">2. LOZULA Cybersecurity Diagnostic Framework</h3>
    <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5;">Automated vulnerability reconnaissance pipelines entering expanded testing.</p>
  </div>
  <div style="border-top: 1px solid #1e293b; padding-top: 16px; margin-top: 16px;">
    <h3 style="color: #06b6d4; margin: 0 0 8px 0;">3. EqualShare Digital Access Milestones</h3>
    <p style="color: #94a3b8; font-size: 14px; margin: 0; line-height: 1.5;">Empowerment initiatives expanding open technology materials globally.</p>
  </div>
  <div style="text-align: center; margin: 28px 0;">
    <a href="https://jonanda.com/ecosystem" style="background: #f59e0b; color: #000000; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: 700; display: inline-block;">Explore Full Ecosystem</a>
  </div>
  <hr style="border: 0; border-top: 1px solid #1e293b; margin: 28px 0;" />
  <div style="text-align: center; color: #64748b; font-size: 12px;">
    <p>You received this email because you subscribed to JONANDA Ecosystem updates.</p>
    <p><a href="{{unsubscribeUrl}}" style="color: #64748b; text-decoration: underline;">Unsubscribe</a></p>
  </div>
</div>`,
    jsonBlocks: [
      { id: 'b1', type: 'heading', content: { text: 'JONANDA Technology Briefing', level: 'h1', align: 'center' } },
      { id: 'b2', type: 'text', content: { text: 'Monthly updates across JONANDA ventures.' } },
      { id: 'b3', type: 'button', content: { buttonText: 'Explore Full Ecosystem', url: 'https://jonanda.com/ecosystem', buttonColor: '#f59e0b' } },
      { id: 'b4', type: 'unsubscribe', content: {} }
    ],
    updatedAt: '2026-08-28T16:00:00Z',
    isSystem: true
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'cmp_01_august_briefing',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    mailboxId: 'mbx_jonanda_info',
    name: 'August 2026 Ecosystem Overview Briefing',
    subject: 'JONANDA Ecosystem Dispatch — August 2026 Tech & Product Briefing',
    previewText: 'Key milestones across JONANDA, LOZULA, and EqualShare technology pipelines.',
    fromName: 'JONANDA Global',
    fromEmail: 'info@jonanda.com',
    templateId: 'tpl_monthly_newsletter',
    status: 'sent',
    scheduledAt: '2026-08-28T14:00:00Z',
    sentAt: '2026-08-28T14:00:12Z',
    targetAudience: {
      type: 'groups',
      groupNames: ['Ecosystem Newsletter Subscribers', 'Enterprise VIP Partners']
    },
    totalRecipients: 198,
    stats: {
      sent: 198,
      delivered: 196,
      opened: 142,
      clicked: 87,
      bounced: 2,
      unsubscribed: 1,
      complaints: 0
    },
    htmlContent: '',
    createdAt: '2026-08-27T10:00:00Z'
  },
  {
    id: 'cmp_02_lozula_advisory',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    mailboxId: 'mbx_lozula_security',
    name: 'LOZULA Q3 Security Diagnostic Release',
    subject: 'SECURITY ADVISORY: Perimeter Verification & DNS Policy Notice',
    previewText: 'Crucial verification update regarding domain SPF/DKIM policy alignment.',
    fromName: 'LOZULA Security Intelligence',
    fromEmail: 'security@lozula.com',
    templateId: 'tpl_security_advisory',
    status: 'sent',
    scheduledAt: '2026-08-29T16:00:00Z',
    sentAt: '2026-08-29T16:00:08Z',
    targetAudience: {
      type: 'groups',
      groupNames: ['Cybersecurity Threat Advisors']
    },
    totalRecipients: 28,
    stats: {
      sent: 28,
      delivered: 28,
      opened: 26,
      clicked: 22,
      bounced: 0,
      unsubscribed: 0,
      complaints: 0
    },
    htmlContent: '',
    createdAt: '2026-08-29T09:00:00Z'
  },
  {
    id: 'cmp_03_enterprise_onboarding_draft',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    mailboxId: 'mbx_jonanda_contact',
    name: 'Enterprise Early Access Pilot Invitation',
    subject: 'Exclusive Invitation: JONANDA MAIL & Studio Pilot Access',
    previewText: 'Experience the unified multi-tenant communication control plane.',
    fromName: 'JONANDA Executive Office',
    fromEmail: 'contact@jonanda.com',
    templateId: 'tpl_welcome_enterprise',
    status: 'draft',
    targetAudience: {
      type: 'groups',
      groupNames: ['Enterprise VIP Partners']
    },
    totalRecipients: 42,
    stats: {
      sent: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
      bounced: 0,
      unsubscribed: 0,
      complaints: 0
    },
    htmlContent: '',
    createdAt: '2026-08-31T09:30:00Z'
  }
];

export const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: 'auto_01_welcome_drip',
    orgId: 'org_jonanda_master',
    projectId: 'jonanda-llc',
    name: 'New Subscriber Welcome Sequence',
    description: 'Instantly sends executive welcome overview upon contact subscription, followed by ecosystem guide 48h later.',
    triggerType: 'contact_added',
    triggerLabel: 'When a contact is added or subscribes',
    steps: [
      {
        id: 'st_1',
        type: 'send_email',
        title: 'Send Executive Welcome Overview',
        config: { templateId: 'tpl_welcome_enterprise', subject: 'Welcome to JONANDA Ecosystem' }
      },
      {
        id: 'st_2',
        type: 'delay',
        title: 'Wait 48 Hours',
        config: { delayHours: 48 }
      },
      {
        id: 'st_3',
        type: 'send_email',
        title: 'Send Ecosystem Capabilities Guide',
        config: { templateId: 'tpl_monthly_newsletter', subject: 'Explore JONANDA Capabilities' }
      }
    ],
    status: 'active',
    enrolledCount: 156,
    completedCount: 142,
    createdAt: '2026-02-15T00:00:00Z'
  },
  {
    id: 'auto_02_security_event',
    orgId: 'org_jonanda_master',
    projectId: 'lozula-cybersecurity',
    name: 'Perimeter Alert Automated Dispatch',
    description: 'Dispatches high-priority security advisory to registered security points when an audit event triggers.',
    triggerType: 'security_alert',
    triggerLabel: 'When a high-priority diagnostic event is registered',
    steps: [
      {
        id: 'st_sec_1',
        type: 'send_email',
        title: 'Send LOZULA Threat Advisory',
        config: { templateId: 'tpl_security_advisory', subject: 'ALERT: LOZULA Security Advisory' }
      },
      {
        id: 'st_sec_2',
        type: 'add_tag',
        title: 'Tag Contact with "Alerted-Q3"',
        config: { tag: 'Alerted-Q3' }
      }
    ],
    status: 'active',
    enrolledCount: 28,
    completedCount: 28,
    createdAt: '2026-03-01T00:00:00Z'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    orgId: 'org_jonanda_master',
    userId: 'usr_ar_admin',
    userName: 'Antigravity Executive Admin',
    action: 'USER_LOGIN_2FA_SUCCESS',
    entityType: 'AUTH',
    entityId: 'usr_ar_admin',
    details: 'Super Admin successfully authenticated via 2FA TOTP verification from secure IP.',
    ipAddress: '198.51.100.24',
    timestamp: '2026-08-31T15:10:00Z'
  },
  {
    id: 'log_02',
    orgId: 'org_jonanda_master',
    userId: 'usr_ar_admin',
    userName: 'Antigravity Executive Admin',
    action: 'DOMAIN_DNS_VERIFIED',
    entityType: 'DOMAIN',
    entityId: 'dom_lozula',
    details: 'Automated DNS resolver verified SPF, DKIM (2048-bit), and DMARC records for lozula.com.',
    ipAddress: '198.51.100.24',
    timestamp: '2026-08-31T14:00:00Z'
  },
  {
    id: 'log_03',
    orgId: 'org_jonanda_master',
    userId: 'usr_ar_admin',
    userName: 'Antigravity Executive Admin',
    action: 'MAILBOX_CREATED',
    entityType: 'MAILBOX',
    entityId: 'mbx_lozula_security',
    details: 'Created mailbox security@lozula.com with 10GB storage quota and strict sending policy.',
    ipAddress: '198.51.100.24',
    timestamp: '2026-08-30T11:20:00Z'
  },
  {
    id: 'log_04',
    orgId: 'org_jonanda_master',
    userId: 'usr_ar_admin',
    userName: 'Antigravity Executive Admin',
    action: 'CAMPAIGN_DISPATCHED',
    entityType: 'CAMPAIGN',
    entityId: 'cmp_02_lozula_advisory',
    details: 'Dispatched campaign "LOZULA Q3 Security Diagnostic Release" to 28 verified recipients.',
    ipAddress: '198.51.100.24',
    timestamp: '2026-08-29T16:00:08Z'
  }
];

export const INITIAL_SYSTEM_HEALTH: SystemHealth = {
  status: 'operational',
  uptimePercentage: 99.99,
  apiLatencyMs: 24,
  smtpRelayStatus: 'connected',
  dnsResolverStatus: 'healthy',
  queuedJobs: 0,
  activeWorkers: 4,
  storageUsageMb: 8740
};
