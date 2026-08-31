export interface PartnershipProgram {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  benefits: string[];
  idealFor: string[];
  iconName: 'Cloud' | 'Cpu' | 'ShieldCheck' | 'Briefcase' | 'HeartHandshake' | 'Network';
  badge: string;
}

export interface CollaborationPillar {
  title: string;
  description: string;
  highlight: string;
}

export const PARTNERSHIP_PROGRAMS: PartnershipProgram[] = [
  {
    id: 'tech-infrastructure',
    title: 'Technology & Cloud Infrastructure',
    category: 'Infrastructure & Edge',
    tagline: 'Global compute, resilient network distribution, and developer infrastructure',
    description: 'We collaborate with cloud providers, data centers, and developer infrastructure providers to deploy high-availability services and edge workflows.',
    benefits: [
      'Joint infrastructure integration & performance testing',
      'Optimized edge routing and low-latency distribution',
      'Co-engineering on specialized serverless & container workflows',
      'Mutual architectural benchmarking and security reviews'
    ],
    idealFor: ['Cloud Providers', 'Data Center Operators', 'API Infrastructure Providers', 'Edge Compute Platforms'],
    iconName: 'Cloud',
    badge: 'Infrastructure'
  },
  {
    id: 'ai-cognitive',
    title: 'AI & Cognitive Systems Partners',
    category: 'Applied Intelligence',
    tagline: 'Model integration, intelligent agents, and automated data pipelines',
    description: 'Collaborating with AI research organizations, model developers, and tool providers to build safe, deterministic autonomous workflows.',
    benefits: [
      'Early access to JONANDA AI pipeline frameworks',
      'Multi-modal and structured agent pipeline integration',
      'Shared benchmarking on model latency and accuracy',
      'Responsible AI safety and alignment standards'
    ],
    idealFor: ['AI Research Labs', 'Model Providers', 'Data Pipeline Vendors', 'Automation Integrators'],
    iconName: 'Cpu',
    badge: 'Artificial Intelligence'
  },
  {
    id: 'cybersecurity-defense',
    title: 'Defensive Cybersecurity & Security Research',
    category: 'Security & Assessment',
    tagline: 'Security diagnostics, vulnerability research, and threat mitigation',
    description: 'Partnering with authorized security researchers, vulnerability assessment teams, and defensive cyber platforms to harden software perimeters.',
    benefits: [
      'Integration with LOZULA Cybersecurity assessment modules',
      'Collaborative threat modeling and audit methodology development',
      'Authorized security testing and boundary validation',
      'Security advisory sharing and rapid vulnerability mitigation'
    ],
    idealFor: ['Security Auditors', 'Penetration Testing Firms', 'Threat Intelligence Teams', 'Compliance Consultants'],
    iconName: 'ShieldCheck',
    badge: 'Cybersecurity'
  },
  {
    id: 'web3-ecosystem',
    title: 'Web3, Blockchain & Protocols',
    category: 'Decentralized Ledgers',
    tagline: 'Smart contract protocols, wallet interfaces, and digital asset interoperability',
    description: 'Working alongside blockchain networks, liquidity frameworks, and Web3 developers to expand digital asset utility and decentralized applications.',
    benefits: [
      'Ecosystem integration with Jonanda Coin (JNDA)',
      'Cross-chain interoperability and token standard development',
      'Shared liquidity protocol verification',
      'Decentralized governance and smart contract security audits'
    ],
    idealFor: ['Layer 1 & Layer 2 Protocols', 'DeFi Protocols', 'Wallet Developers', 'Web3 Infrastructure Builders'],
    iconName: 'Network',
    badge: 'Web3 & Blockchain'
  },
  {
    id: 'enterprise-development',
    title: 'Enterprise & Strategic Solution Clients',
    category: 'Custom Engineering',
    tagline: 'Custom software, multi-tenant SaaS, and digital transformation initiatives',
    description: 'Partnering with growing startups, enterprise businesses, and institutional organizations on bespoke digital product development and long-term tech stewardship.',
    benefits: [
      'Dedicated engineering teams and architectural leadership',
      'Milestone-driven product roadmap and transparent delivery',
      'Zero-trust security baked into every software tier',
      'Post-launch scaling, infrastructure optimization, and evolution'
    ],
    idealFor: ['High-Growth Startups', 'Mid-to-Large Enterprises', 'SaaS Founders', 'Government & Non-Profit Entities'],
    iconName: 'Briefcase',
    badge: 'Enterprise Engineering'
  },
  {
    id: 'social-impact',
    title: 'Social Impact & Philanthropic Initiatives',
    category: 'Community & Empowerment',
    tagline: 'Technology-enabled transparency, community equity, and public welfare',
    description: 'Collaborating through the EqualShare Foundation on transparent resource distribution, educational initiatives, and global impact projects.',
    benefits: [
      'Transparent resource tracking and verifiable allocation tools',
      'Community empowerment workshops and technology training',
      'Collaborative non-profit initiatives and charity frameworks',
      'Global social impact reporting and metrics verification'
    ],
    idealFor: ['Philanthropic Organizations', 'Social Enterprises', 'Academic Institutions', 'Community Foundations'],
    iconName: 'HeartHandshake',
    badge: 'EqualShare Initiative'
  }
];

export const COLLABORATION_PILLARS: CollaborationPillar[] = [
  {
    title: 'Mutual Value & Long-Term Vision',
    description: 'We structure relationships around sustainable growth, transparent technical alignment, and lasting mutual value rather than short-term transactions.',
    highlight: 'Sustainable Alignment'
  },
  {
    title: 'Rigorous Technical Integrity',
    description: 'All partners undergo disciplined architectural, security, and operational reviews to maintain institutional quality standards across our ecosystem.',
    highlight: 'Zero Compromise on Quality'
  },
  {
    title: 'Direct Architectural Access',
    description: 'Partners collaborate directly with our core engineering leadership, ensuring rapid feedback loops, bespoke integrations, and clear communication.',
    highlight: 'Direct Engineering Access'
  }
];
