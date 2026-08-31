export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Coming Soon', href: '/coming-soon' },
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

export const FOOTER_COMPANY_LINKS: NavItem[] = [
  { label: 'About JONANDA LLC', href: '/about' },
  { label: 'Technology & Capabilities', href: '/technology' },
  { label: 'Corporate Information', href: '/company' },
  { label: 'Contact & Inquiries', href: '/contact' },
];

export const FOOTER_LEGAL_LINKS: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];
