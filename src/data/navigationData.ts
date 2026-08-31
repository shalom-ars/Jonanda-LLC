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
        label: 'Coming Soon Portfolio',
        href: '/coming-soon',
        description: 'Jonanda Studio, SEO, Influencer & Security Toolkit',
        iconName: 'Clock',
        badge: 'Upcoming',
        badgeColor: 'purple'
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
        label: 'Corporate Governance',
        href: '/company',
        description: 'Legal structure, entity records & roadmap',
        iconName: 'ShieldCheck'
      }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Project Development', href: '/project-development' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Coming Soon', href: '/coming-soon' },
  { label: 'Partners', href: '/partners' },
  { label: 'Technology', href: '/technology' },
  { label: 'Company', href: '/company' },
  { label: 'Contact', href: '/contact' },
];

export const FOOTER_ECOSYSTEM_LINKS: NavItem[] = [
  { label: 'Jonanda Coin (JNDA)', href: 'https://jonanda.com', isExternal: true },
  { label: 'LOZULA Cybersecurity', href: 'https://lozula.com', isExternal: true },
  { label: 'Coming Soon Portfolio', href: '/coming-soon' },
  { label: 'Ecosystem Overview', href: '/ecosystem' },
];

export const FOOTER_SERVICES_LINKS: NavItem[] = [
  { label: 'Project Development', href: '/project-development' },
  { label: 'Web & Mobile Applications', href: '/project-development#services' },
  { label: 'AI & SaaS Development', href: '/project-development#services' },
  { label: 'Web3 & Cybersecurity Tools', href: '/project-development#services' },
];

export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { label: 'About JONANDA LLC', href: '/about' },
  { label: 'Partnerships & Alliances', href: '/partners' },
  { label: 'Technology & Capabilities', href: '/technology' },
  { label: 'Corporate Information', href: '/company' },
  { label: 'Contact & Inquiries', href: '/contact' },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];
