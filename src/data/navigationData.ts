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
    label: 'Flow ▾',
    children: [
      {
        label: 'JONANDA FLOW Hub',
        href: '/flow',
        description: 'Partner, creator & email visual automation engine',
        iconName: 'Zap',
        badge: 'ENGINE',
        badgeColor: 'gold'
      },
      {
        label: 'Workflow Automations',
        href: '/flow/workflows',
        description: 'Active partner, creator & customer pipelines',
        iconName: 'Layers'
      },
      {
        label: 'Visual Canvas Builder',
        href: '/flow/new',
        description: 'Drag-and-drop workflow canvas with live test runner',
        iconName: 'Sparkles',
        badge: 'BUILDER',
        badgeColor: 'amber'
      },
      {
        label: 'Blueprint Templates',
        href: '/flow/templates',
        description: 'Pre-built partner, creator & customer templates',
        iconName: 'FileText'
      },
      {
        label: 'Execution Telemetry',
        href: '/flow/logs',
        description: 'Step-by-step diagnostic logs and audit history',
        iconName: 'Activity'
      },
      {
        label: 'JONANDA MAIL Suite',
        href: '/mail',
        description: 'Corporate inbox, audience contacts & campaigns',
        iconName: 'Mail',
        badge: 'LIVE',
        badgeColor: 'emerald'
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
        description: 'Automated partner & influencer relationship systems',
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
        label: 'LOZULA Cybersecurity',
        href: 'https://lozula.com',
        description: 'Security & vulnerability assessment platform',
        iconName: 'Shield',
        badge: 'Live',
        badgeColor: 'emerald',
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
  { label: 'LOZULA Cybersecurity', href: 'https://lozula.com', isExternal: true },
  { label: 'Coming Soon Portfolio', href: '/coming-soon' },
  { label: 'Ecosystem Overview', href: '/ecosystem' },
];

export const FOOTER_SERVICES_LINKS: NavItem[] = [
  { label: 'Project Development', href: '/project-development' },
  { label: 'Visual Workflow Builder', href: '/flow/new' },
  { label: 'Workflow Automations', href: '/flow/workflows' },
  { label: 'Blueprint Templates', href: '/flow/templates' },
  { label: 'AI & SaaS Engineering', href: '/project-development#services' },
];

export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { label: 'About JONANDA LLC', href: '/about' },
  { label: 'Partnerships & Alliances', href: '/partners' },
  { label: 'Partner Intake Queue', href: '/partners/applications' },
  { label: 'Creator & Influencers', href: '/influencers/directory' },
  { label: 'Technology Architecture', href: '/technology' },
  { label: 'Corporate Governance', href: '/company' },
  { label: 'Contact & Inquiries', href: '/contact' },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];
