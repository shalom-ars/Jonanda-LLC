export interface NavDropdownItem {
  label: string;
  href: string;
  description?: string;
  iconName?: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'purple' | 'blue' | 'gold';
  isExternal?: boolean;
}

export interface MainNavItem {
  label: string;
  href?: string;
  children?: NavDropdownItem[];
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const MAIN_NAV_MENU: MainNavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Flow & Mail ▾',
    children: [
      {
        label: 'JONANDA FLOW Hub',
        href: '/flow',
        description: 'Visual automation platform & workflow engine',
        iconName: 'Zap',
        badge: 'ENGINE',
        badgeColor: 'gold'
      },
      {
        label: 'Visual Canvas Builder',
        href: '/flow/new',
        description: 'Drag-and-drop canvas with live test runner & minimap',
        iconName: 'Sparkles',
        badge: 'BUILDER',
        badgeColor: 'amber'
      },
      {
        label: 'Workflow Automations',
        href: '/flow/workflows',
        description: 'Active partner, creator, API & business pipelines',
        iconName: 'Layers'
      },
      {
        label: 'Blueprint Templates',
        href: '/flow/templates',
        description: 'Pre-built partner, creator, email & API blueprints',
        iconName: 'FileText'
      },
      {
        label: 'Integrations Catalog',
        href: '/flow/integrations',
        description: 'Connect AI, PostgreSQL, Webhooks & JONANDA tools',
        iconName: 'Globe',
        badge: 'APPS',
        badgeColor: 'blue'
      },
      {
        label: 'Credentials Vault',
        href: '/flow/credentials',
        description: 'Encrypted API keys, OAuth tokens & SMTP storage',
        iconName: 'ShieldCheck',
        badge: 'ENCRYPTED',
        badgeColor: 'emerald'
      },
      {
        label: 'JONANDA MAIL Suite',
        href: '/mail',
        description: 'Enterprise email suite & mail.jonanda.com hub',
        iconName: 'Mail',
        badge: 'LIVE',
        badgeColor: 'emerald'
      },
      {
        label: 'Webmail Inbox',
        href: '/mail/inbox',
        description: 'Centralized business webmail preview & folders',
        iconName: 'Mail'
      },
      {
        label: 'Audience & Contacts',
        href: '/mail/contacts',
        description: 'Segmented audience lists, tags & contact intake',
        iconName: 'Users'
      },
      {
        label: 'Broadcast Campaigns',
        href: '/mail/campaigns',
        description: 'Automated mass email campaigns & delivery stats',
        iconName: 'Activity',
        badge: 'CAMPAIGNS',
        badgeColor: 'purple'
      },
      {
        label: 'Email Templates',
        href: '/mail/templates',
        description: 'Dynamic layouts with personalized token helpers',
        iconName: 'FileText'
      },
      {
        label: 'Execution Telemetry',
        href: '/flow/logs',
        description: 'Step-by-step diagnostic logs & audit history',
        iconName: 'Activity'
      }
    ]
  },
  {
    label: 'Services',
    children: [
      {
        label: 'Project Development',
        href: '/project-development',
        description: 'Custom software, SaaS, AI & Web3 engineering',
        iconName: 'Code2',
        badge: 'Custom Build',
        badgeColor: 'gold'
      },
      {
        label: 'Workflow Automation',
        href: '/flow',
        description: 'Visual automation platform & connected services',
        iconName: 'Zap',
        badge: 'FLOW',
        badgeColor: 'amber'
      },
      {
        label: 'Technology Stack',
        href: '/technology',
        description: 'Our 5 core technology pillars & infrastructure',
        iconName: 'Cpu'
      }
    ]
  },
  {
    label: 'Ecosystem',
    children: [
      {
        label: 'Ecosystem Overview',
        href: '/ecosystem',
        description: 'Complete product portfolio architecture',
        iconName: 'Layers'
      },
      {
        label: 'JONANDA FLOW',
        href: '/flow',
        description: 'Visual automation engine & relationship pipelines',
        iconName: 'Zap',
        badge: 'Engine',
        badgeColor: 'gold'
      },
      {
        label: 'JONANDA MAIL',
        href: '/mail',
        description: 'Centralized business email & webmail platform',
        iconName: 'Mail',
        badge: 'Live',
        badgeColor: 'emerald'
      },
      {
        label: 'Jonanda Coin (JNDA)',
        href: 'https://jonanda.com',
        description: 'Web3 & AI digital asset ecosystem',
        iconName: 'Sparkles',
        badge: 'Active',
        badgeColor: 'amber',
        isExternal: true
      },
      {
        label: 'Coming Soon Portfolio',
        href: '/coming-soon',
        description: 'Jonanda Studio, SEO, Influencer & Security Toolkit',
        iconName: 'Clock',
        badge: 'Upcoming',
        badgeColor: 'purple'
      }
    ]
  },
  {
    label: 'Company',
    children: [
      {
        label: 'About JONANDA LLC',
        href: '/about',
        description: 'Vision, mission & corporate leadership',
        iconName: 'Building2'
      },
      {
        label: 'Partners & Alliances',
        href: '/partners',
        description: 'Technology, research & enterprise partners',
        iconName: 'Handshake',
        badge: 'Network',
        badgeColor: 'blue'
      },
      {
        label: 'Partner Applications',
        href: '/partners/applications',
        description: 'Review queue & onboarding pipeline',
        iconName: 'ShieldCheck'
      },
      {
        label: 'Creator & Influencers',
        href: '/influencers/directory',
        description: 'Vetted creator roster & sponsorship briefs',
        iconName: 'Users',
        badge: 'Creators',
        badgeColor: 'purple'
      },
      {
        label: 'Corporate Governance',
        href: '/company',
        description: 'Legal structure, entity records & roadmap',
        iconName: 'ShieldCheck'
      }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export const FOOTER_ECOSYSTEM_LINKS: NavItem[] = [
  { label: 'JONANDA FLOW Engine', href: '/flow' },
  { label: 'JONANDA MAIL Suite', href: '/mail' },
  { label: 'Jonanda Coin (JNDA)', href: 'https://jonanda.com', isExternal: true },
  { label: 'Coming Soon Portfolio', href: '/coming-soon' },
  { label: 'Ecosystem Overview', href: '/ecosystem' },
];

export const FOOTER_SERVICES_LINKS: NavItem[] = [
  { label: 'Project Development', href: '/project-development' },
  { label: 'Visual Workflow Builder', href: '/flow/new' },
  { label: 'JONANDA MAIL Suite', href: '/mail' },
  { label: 'Integrations Catalog', href: '/flow/integrations' },
  { label: 'Credentials Vault', href: '/flow/credentials' },
  { label: 'Workflow Automations', href: '/flow/workflows' },
];

export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { label: 'About JONANDA LLC', href: '/about' },
  { label: 'Partnerships & Alliances', href: '/partners' },
  { label: 'Partner Intake Queue', href: '/partners/applications' },
  { label: 'Creator & Influencers', href: '/influencers/directory' },
  { label: 'Platform Administration', href: '/admin/flow' },
  { label: 'Technology Architecture', href: '/technology' },
  { label: 'Corporate Governance', href: '/company' },
  { label: 'Contact & Inquiries', href: '/contact' },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];
