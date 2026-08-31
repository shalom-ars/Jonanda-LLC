export type ProjectStatus = 'Live & Operational' | 'Active Platform' | 'Coming Soon' | 'Incubation & Research' | 'Ecosystem Initiative';
export type StatusColor = 'emerald' | 'amber' | 'purple' | 'blue' | 'gold';
export type ProjectTier = 'current' | 'coming-soon' | 'future';

export interface EcosystemProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  capabilities: string[];
  status: ProjectStatus;
  statusColor: StatusColor;
  tier: ProjectTier;
  iconName?: 'Sparkles' | 'Shield' | 'Bot' | 'Search' | 'Users' | 'ShieldAlert' | 'Cpu' | 'Layers' | 'Mail' | 'HeartHandshake';
  logoUrl?: string;
  logoType?: 'image' | 'svg' | 'icon';
  ctaText: string;
  ctaLink?: string;
  isExternal?: boolean;
  featured?: boolean;
  launchOrder: number;
}

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
  // --- CURRENT OFFICIAL ECOSYSTEM (LIVE / ACTIVE PLATFORMS) ---
  {
    id: 'jonanda-coin',
    name: 'Jonanda Coin (JNDA)',
    category: 'Web3 & AI Digital Asset Ecosystem',
    tagline: 'AI-integrated decentralized technology and digital asset infrastructure',
    description: 'Jonanda Coin (JNDA) represents a decentralized digital asset and utility ecosystem engineered with intelligent AI tool integrations, smart contract automation, and next-generation blockchain utility.',
    fullDescription: 'Operating as a dedicated Web3 project within the broader JONANDA LLC ecosystem, Jonanda Coin focuses on bridging artificial intelligence capabilities with decentralized ledgers, distributed liquidity frameworks, and community-driven utility architectures.',
    capabilities: [
      'Smart Contract Automation & Protocol Standards',
      'AI-Enhanced Web3 Tools & Analytics',
      'Decentralized Ecosystem Integration',
      'Secure Multi-Platform Digital Asset Infrastructure'
    ],
    status: 'Active Platform',
    statusColor: 'amber',
    tier: 'current',
    iconName: 'Sparkles',
    logoUrl: '/brand/jnda-coin.webp',
    logoType: 'image',
    ctaText: 'Explore JNDA',
    ctaLink: 'https://jonanda.com',
    isExternal: true,
    featured: true,
    launchOrder: 1
  },
  {
    id: 'lozula-cybersecurity',
    name: 'LOZULA Cybersecurity',
    category: 'Cybersecurity & Security Assessment',
    tagline: 'Comprehensive security technology and intelligence platform',
    description: 'LOZULA Cybersecurity delivers advanced security assessment frameworks, digital vulnerability analysis, threat modeling, and defensive cyber technology for modern software systems.',
    fullDescription: 'Engineered to protect mission-critical digital assets and infrastructure, LOZULA combines automated security diagnostics with rigorous verification methodologies to help organizations identify risks, harden cloud perimeters, and maintain robust operational posture.',
    capabilities: [
      'Automated Vulnerability & Perimeter Assessment',
      'Threat Intelligence & Risk Surface Modeling',
      'Codebase & Cloud Security Audit Frameworks',
      'Real-Time Defensive Infrastructure Verification'
    ],
    status: 'Live & Operational',
    statusColor: 'emerald',
    tier: 'current',
    iconName: 'Shield',
    logoUrl: '/brand/lozula-logo.svg',
    logoType: 'svg',
    ctaText: 'Explore LOZULA',
    ctaLink: 'https://lozula.com',
    isExternal: true,
    featured: true,
    launchOrder: 2
  },
  {
    id: 'jonanda-mail',
    name: 'JONANDA MAIL',
    category: 'Business Email & Communication',
    tagline: 'Centralized email, webmail, and communication infrastructure for the JONANDA ecosystem',
    description: 'The official centralized business email and multi-project communication platform engineered for JONANDA LLC and its ecosystem ventures.',
    fullDescription: 'JONANDA MAIL delivers multi-tenant business email, threaded webmail, verified domain DNS orchestration (SPF, DKIM, DMARC, MX), audience campaign automation, and deliverability analytics under a unified enterprise control plane.',
    capabilities: [
      'Multi-Project Business Email Identities',
      'Threaded Webmail & Secure Inbox Collaboration',
      'Automated DNS, SPF, DKIM & DMARC Orchestration',
      'Visual Campaign Delivery & Audience Messaging',
      'Zero-Trust Access Control & Multi-Tenant Security'
    ],
    status: 'Live & Operational',
    statusColor: 'emerald',
    tier: 'current',
    iconName: 'Mail',
    logoType: 'icon',
    ctaText: 'Launch JONANDA MAIL',
    ctaLink: 'https://mail.jonanda.com',
    isExternal: true,
    featured: true,
    launchOrder: 3
  },

  // --- COMING SOON PROJECT PORTFOLIO (UNDER ACTIVE DEVELOPMENT) ---
  {
    id: 'jonanda-studio',
    name: 'Jonanda Studio',
    category: 'AI & Technology',
    tagline: 'Next-generation AI workflows, intelligent automation, and agent infrastructure',
    description: 'A next-generation AI and software platform being developed within the JONANDA LLC technology ecosystem.',
    fullDescription: 'Jonanda Studio is an intelligent software and AI workspace engineered to orchestrate multi-step autonomous workflows, cognitive processing agents, and developer tooling within a unified, high-performance environment.',
    capabilities: [
      'AI-Powered Workflows',
      'Intelligent Automation',
      'Autonomous AI Agents',
      'Developer Productivity Tools',
      'Software Engineering Infrastructure'
    ],
    status: 'Coming Soon',
    statusColor: 'purple',
    tier: 'coming-soon',
    iconName: 'Bot',
    logoType: 'icon',
    ctaText: 'Coming Soon',
    isExternal: false,
    featured: true,
    launchOrder: 4
  },
  {
    id: 'jonanda-seo',
    name: 'Jonanda SEO',
    category: 'SEO & Digital Growth',
    tagline: 'Automated SEO intelligence, technical audits, and search visibility monitoring',
    description: 'An advanced SEO platform designed to analyze, optimize, monitor, and improve websites using automated SEO intelligence.',
    fullDescription: 'Jonanda SEO provides automated technical website audits, on-page optimization analysis, structured keyword tracking, and actionable search intelligence to enhance discoverability and indexing health across digital platforms.',
    capabilities: [
      'Technical SEO Analysis',
      'On-Page Optimization Audits',
      'Keyword Tracking & Research',
      'Search Visibility Monitoring',
      'Performance Recommendations'
    ],
    status: 'Coming Soon',
    statusColor: 'purple',
    tier: 'coming-soon',
    iconName: 'Search',
    logoType: 'icon',
    ctaText: 'Coming Soon',
    isExternal: false,
    featured: true,
    launchOrder: 5
  },
  {
    id: 'jonanda-influencer',
    name: 'Jonanda Influencer',
    category: 'Creator Economy & Marketing',
    tagline: 'Managed creator discovery, brand collaboration workflows, and campaign management',
    description: 'A managed creator and brand collaboration platform designed to connect businesses with relevant creators and manage campaigns from discovery through completion.',
    fullDescription: 'Jonanda Influencer simplifies the collaboration lifecycle for modern enterprises by providing structured discovery filters, standardized onboarding pipelines, campaign milestones, negotiation management, and unified performance telemetry.',
    capabilities: [
      'Creator Discovery & Matching',
      'Brand Onboarding Pipelines',
      'Campaign Lifecycle Management',
      'Contract & Negotiation Tracking',
      'Performance Telemetry'
    ],
    status: 'Coming Soon',
    statusColor: 'purple',
    tier: 'coming-soon',
    iconName: 'Users',
    logoType: 'icon',
    ctaText: 'Coming Soon',
    isExternal: false,
    featured: true,
    launchOrder: 6
  },
  {
    id: 'jonanda-security-toolkit',
    name: 'Jonanda Security Toolkit',
    category: 'Cybersecurity Technology',
    tagline: 'Authorized defensive security assessment and operations toolkit',
    description: 'An authorized defensive cybersecurity toolkit being developed for security assessment and security operations workflows.',
    fullDescription: 'Designed exclusively for authorized defensive diagnostics, the Jonanda Security Toolkit provides network asset scanning, DNS reconnaissance, API security validation, whitelist boundary controls, and audit reporting for security teams.',
    capabilities: [
      'Perimeter Security Scanning',
      'Port & Service Discovery',
      'DNS & Subdomain Mapping',
      'API Endpoint Validation',
      'Defensive Security Dashboard'
    ],
    status: 'Coming Soon',
    statusColor: 'purple',
    tier: 'coming-soon',
    iconName: 'ShieldAlert',
    logoType: 'icon',
    ctaText: 'Coming Soon',
    isExternal: false,
    featured: true,
    launchOrder: 7
  },

  // --- RESEARCH & FUTURE TECHNOLOGY / INITIATIVES ---
  {
    id: 'equalshare-foundation',
    name: 'EqualShare Foundation',
    category: 'Social Impact & Technology Initiative',
    tagline: 'Technology-enabled philanthropic and global impact initiative',
    description: 'A dedicated social-impact and transparent empowerment initiative developed to explore technology-enabled equity frameworks and community support.',
    fullDescription: 'The EqualShare Foundation operates as an ecosystem initiative supported by JONANDA LLC, focusing on leveraging transparent digital tools, verifiable allocation systems, and technology solutions to advance social good.',
    capabilities: [
      'Transparent Resource Distribution',
      'Community Empowerment Frameworks',
      'Verifiable Technology-Enabled Impact',
      'Global Social Initiative Coordination'
    ],
    status: 'Ecosystem Initiative',
    statusColor: 'gold',
    tier: 'future',
    iconName: 'HeartHandshake',
    logoType: 'icon',
    ctaText: 'Ecosystem Initiative',
    isExternal: false,
    featured: false,
    launchOrder: 8
  },
  {
    id: 'future-technology',
    name: 'Future Technology & Incubation',
    category: 'R&D and Emerging Platforms',
    tagline: 'Reserved for next-generation JONANDA LLC platforms and infrastructure',
    description: 'Dedicated incubation pipeline for upcoming proprietary software systems, enterprise AI workflow engines, and distributed digital infrastructure currently under active engineering and research.',
    fullDescription: 'JONANDA LLC maintains a structured research and development program focused on evaluating high-impact technological innovations. New products and services enter this incubation pipeline through disciplined architectural testing before public deployment.',
    capabilities: [
      'Enterprise Intelligent Agent Systems',
      'Autonomous Cloud Orchestration',
      'High-Throughput Distributed Microservices',
      'Next-Generation Edge Computing Frameworks'
    ],
    status: 'Incubation & Research',
    statusColor: 'blue',
    tier: 'future',
    iconName: 'Layers',
    logoType: 'icon',
    ctaText: 'View Technology Capabilities',
    ctaLink: '/technology',
    isExternal: false,
    featured: false,
    launchOrder: 9
  }
];

// Helper selectors
export const CURRENT_ECOSYSTEM_PRODUCTS = ECOSYSTEM_PRODUCTS.filter(p => p.tier === 'current');
export const COMING_SOON_PRODUCTS = ECOSYSTEM_PRODUCTS.filter(p => p.tier === 'coming-soon');
export const FUTURE_TECH_PRODUCTS = ECOSYSTEM_PRODUCTS.filter(p => p.tier === 'future');
