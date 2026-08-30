export interface EcosystemProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  fullDescription?: string;
  capabilities: string[];
  status: 'Live & Operational' | 'Active Platform' | 'Incubation & Research';
  statusColor: 'emerald' | 'amber' | 'blue';
  logoUrl?: string;
  logoType?: 'image' | 'svg' | 'icon';
  ctaText: string;
  ctaLink: string;
  isExternal: boolean;
  featured?: boolean;
}

export const ECOSYSTEM_PRODUCTS: EcosystemProduct[] = [
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
    logoUrl: '/brand/jnda-coin.webp',
    logoType: 'image',
    ctaText: 'Explore JNDA',
    ctaLink: 'https://jonanda.com',
    isExternal: true,
    featured: true
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
    logoUrl: '/brand/lozula-logo.svg',
    logoType: 'svg',
    ctaText: 'Explore LOZULA',
    ctaLink: 'https://lozula.com',
    isExternal: true,
    featured: true
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
    ctaText: 'View Technology Capabilities',
    ctaLink: '/technology',
    isExternal: false,
    featured: false
  }
];
