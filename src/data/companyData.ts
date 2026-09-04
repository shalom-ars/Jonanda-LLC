export interface CorporateInfoItem {
  label: string;
  value: string;
  isLink?: boolean;
  href?: string;
}

export const CORPORATE_DETAILS: CorporateInfoItem[] = [
  { label: 'Company Name', value: 'JONANDA LLC' },
  { label: 'Entity Type', value: 'Limited Liability Company (LLC)' },
  { label: 'Jurisdiction', value: 'United States' },
  { label: 'Primary Focus', value: 'AI, Web3, Cybersecurity, Software & Infrastructure' },
  { label: 'Corporate HQ Domain', value: 'llc.jonanda.com', isLink: true, href: 'https://llc.jonanda.com' },
  { label: 'Jonanda Coin Domain', value: 'jonanda.com', isLink: true, href: 'https://jonanda.com' },
  { label: 'Corporate Inquiries', value: 'contact@jonanda.com', isLink: true, href: 'mailto:contact@jonanda.com' },
];

export const CORE_TENETS = [
  {
    title: 'Engineering Rigor',
    description: 'We believe sustainable technology is built through formal design, modular architecture, and meticulous code quality rather than speculative shortcuts.',
    icon: 'Terminal'
  },
  {
    title: 'Security-First Mindset',
    description: 'Zero-trust standards and continuous security assessment are fundamental requirements embedded in every system we design and operate.',
    icon: 'Shield'
  },
  {
    title: 'Long-Term Vision',
    description: 'We construct digital infrastructure and software platforms designed for enduring utility, technological resilience, and multi-generational value.',
    icon: 'Compass'
  },
  {
    title: 'Institutional Trust',
    description: 'We operate with uncompromising transparency, strict data privacy standards, and factual integrity across all ecosystem products.',
    icon: 'Building2'
  }
];

export const COMPANY_MILESTONES = [
  {
    phase: 'Foundation & Strategy',
    title: 'Corporate Formation & Architectural Blueprint',
    description: 'Establishment of JONANDA LLC in the United States as a specialized technology enterprise focusing on emerging computational paradigms.'
  },
  {
    phase: 'Ecosystem Expansion',
    title: 'Launch of Specialized Platforms',
    description: 'Development and deployment of foundational digital platforms: software engineering, custom platforms, and Web3 utility.'
  },
  {
    phase: 'Infrastructure & Scaling',
    title: 'Enterprise Integration & Edge Architecture',
    description: 'Ongoing engineering of proprietary software engines, enterprise AI agent frameworks, and high-resilience digital infrastructure.'
  }
];
