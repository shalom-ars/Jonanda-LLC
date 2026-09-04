export interface TechnologyPillar {
  id: string;
  title: string;
  shortDesc: string;
  detailedOverview: string;
  iconName: 'Cpu' | 'Blocks' | 'ShieldCheck' | 'CodeXml' | 'Server';
  coreCapabilities: {
    title: string;
    description: string;
  }[];
  technicalStack: string[];
}

export const TECHNOLOGY_PILLARS: TechnologyPillar[] = [
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    shortDesc: 'Intelligent automation, autonomous agent frameworks, and contextual data processing.',
    detailedOverview: 'We research and engineer AI-driven architectures designed to solve complex operational challenges. Our focus spans applied machine learning, large language model integrations, automated reasoning workflows, and custom cognitive processing pipelines built for enterprise resilience.',
    iconName: 'Cpu',
    coreCapabilities: [
      {
        title: 'Intelligent Agent Workflows',
        description: 'Autonomous multi-step execution frameworks that automate analytical and operational tasks.'
      },
      {
        title: 'Contextual Knowledge Pipelines',
        description: 'Retrieval-augmented architectures transforming proprietary datasets into high-fidelity actionable insights.'
      },
      {
        title: 'Model Evaluation & Alignment',
        description: 'Rigorous benchmarking and safety validation protocols ensuring deterministic and reliable AI behavior.'
      },
      {
        title: 'Applied Machine Learning',
        description: 'Predictive modeling and pattern recognition algorithms optimized for real-time edge and cloud execution.'
      }
    ],
    technicalStack: ['PyTorch', 'TensorFlow', 'Transformer Architectures', 'Vector Databases', 'LangChain', 'LlamaIndex', 'Python', 'FastAPI']
  },
  {
    id: 'web3-blockchain',
    title: 'Web3 & Blockchain',
    shortDesc: 'Decentralized protocols, secure smart contract infrastructure, and token utility engineering.',
    detailedOverview: 'Our decentralized systems development emphasizes mathematical correctness, state-machine integrity, and immutable transparency. We architect smart contracts, decentralized applications (dApps), and tokenized utility layers designed for seamless interoperability and audited security.',
    iconName: 'Blocks',
    coreCapabilities: [
      {
        title: 'Smart Contract Architecture',
        description: 'Modular, gas-optimized, and formally verified contract systems built to enterprise security standards.'
      },
      {
        title: 'Protocol Engineering',
        description: 'Consensus integration, cross-chain communication protocols, and decentralized liquidity infrastructure.'
      },
      {
        title: 'Token Economics & Utility',
        description: 'Sustainable mathematical modeling of on-chain utility, governance dynamics, and ecosystem participation.'
      },
      {
        title: 'Decentralized Application Frameworks',
        description: 'High-throughput Web3 interfaces delivering sub-second responsive interaction with distributed state.'
      }
    ],
    technicalStack: ['Solidity', 'EVM', 'Rust', 'Wagmi / Viem', 'Ethers.js', 'Hardhat', 'IPFS', 'The Graph']
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity',
    shortDesc: 'Vulnerability assessment, defensive threat modeling, and zero-trust security perimeters.',
    detailedOverview: 'Security is not an afterthought at JONANDA LLC—it is embedded into every architectural layer. Through proprietary defensive frameworks, we implement automated security assessments, continuous vulnerability monitoring, and zero-trust access control.',
    iconName: 'ShieldCheck',
    coreCapabilities: [
      {
        title: 'Automated Security Assessment',
        description: 'Continuous scanning and detection algorithms identifying configuration vulnerabilities across web and cloud surfaces.'
      },
      {
        title: 'Threat Modeling & Intelligence',
        description: 'Proactive surface analysis anticipating adversarial vectors before deployment.'
      },
      {
        title: 'Zero-Trust Architecture',
        description: 'Strict identity verification, cryptographic attestation, and granular access boundaries for all infrastructure.'
      },
      {
        title: 'Code Security Auditing',
        description: 'Static and dynamic analysis pipelines ensuring zero undisclosed vulnerabilities reach production environments.'
      }
    ],
    technicalStack: ['Zero-Trust Frameworks', 'OWASP Standards', 'Static Analysis (SAST/DAST)', 'TLS 1.3 / mTLS', 'Cryptography', 'Cloudflare Armor', 'Audit Pipelines']
  },
  {
    id: 'saas-software',
    title: 'SaaS & Software Development',
    shortDesc: 'Enterprise web systems, responsive mobile applications, and resilient cloud microservices.',
    detailedOverview: 'We design and construct modern full-stack software products built for extreme uptime, accessibility, and intuitive user ergonomics. From high-concurrency cloud backends to fluid cross-platform clients, our software development adheres to clean code standards and scalable design patterns.',
    iconName: 'CodeXml',
    coreCapabilities: [
      {
        title: 'Full-Stack Modern Web Engineering',
        description: 'Single-page and server-rendered web applications utilizing React, TypeScript, and modern styling frameworks.'
      },
      {
        title: 'High-Performance API Architecture',
        description: 'Low-latency REST and GraphQL gateways engineered with rate limiting, caching, and robust telemetry.'
      },
      {
        title: 'Cross-Platform Mobile Ecosystems',
        description: 'Responsive mobile platforms maintaining native performance and biometric security integration.'
      },
      {
        title: 'Continuous Delivery (CI/CD)',
        description: 'Automated build, test, and release pipelines ensuring zero-downtime rolling upgrades.'
      }
    ],
    technicalStack: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'PostgreSQL', 'Redis', 'Docker', 'GraphQL']
  },
  {
    id: 'digital-infrastructure',
    title: 'Digital Infrastructure',
    shortDesc: 'Global edge computing, distributed hosting networks, and high-availability cloud orchestration.',
    detailedOverview: 'Modern applications require resilient foundation layers. JONANDA LLC builds and leverages distributed edge networks, cloud container orchestration, and multi-region data persistence to ensure low latency and high availability across international markets.',
    iconName: 'Server',
    coreCapabilities: [
      {
        title: 'Edge Compute Networks',
        description: 'Sub-10ms response times by executing application logic geographically close to end users via global edge nodes.'
      },
      {
        title: 'Cloud Orchestration & Auto-Scaling',
        description: 'Elastic compute clusters dynamically adapting to demand surges with instant auto-healing.'
      },
      {
        title: 'Resilient Distributed Persistence',
        description: 'Fault-tolerant distributed database topologies with automated disaster recovery and replication.'
      },
      {
        title: 'Global Observability & Telemetry',
        description: 'Real-time metrics, tracing, and automated anomaly alerting spanning all ecosystem layers.'
      }
    ],
    technicalStack: ['Cloudflare Workers / Pages', 'AWS / GCP', 'Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Edge CDN', 'Global DNS']
  }
];
