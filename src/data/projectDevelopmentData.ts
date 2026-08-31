export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  category: string;
  description: string;
  features: string[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface TechCategory {
  category: string;
  description: string;
  technologies: string[];
}

export interface ProjectTypeCard {
  title: string;
  subtitle: string;
  description: string;
  tag: string;
}

export interface ValuePillar {
  title: string;
  description: string;
  highlight: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

// 1. WHAT WE BUILD (12 Service Categories)
export const WHAT_WE_BUILD_SERVICES: ServiceItem[] = [
  {
    id: 'web-apps',
    icon: 'Globe',
    title: 'Websites & Web Applications',
    category: 'Full-Stack Web',
    description: 'Corporate websites, portals, dashboards, customer platforms, and complex web applications built for speed, accessibility, and high conversion.',
    features: ['Custom Corporate Websites', 'Interactive Portals & Dashboards', 'Single-Page & Progressive Web Apps', 'High-Performance Landing Experiences']
  },
  {
    id: 'mobile-apps',
    icon: 'Smartphone',
    title: 'Mobile Applications',
    category: 'Mobile Systems',
    description: 'Modern mobile experiences and cross-platform applications engineered for native responsiveness, fluid touch interactions, and offline capability.',
    features: ['Cross-Platform Mobile Apps', 'Responsive Touch Interfaces', 'Mobile API & Push Integrations', 'Native Feature Access & Caching']
  },
  {
    id: 'ai-applications',
    icon: 'Bot',
    title: 'AI Applications',
    category: 'Cognitive Computing',
    description: 'AI-powered applications, intelligent workflows, AI agents, automation systems, and AI-assisted products built with strict safety boundaries.',
    features: ['LLM & Cognitive Pipeline Integration', 'Deterministic AI Agent Workflows', 'Retrieval-Augmented Generation (RAG)', 'Intelligent Task Automation']
  },
  {
    id: 'saas-platforms',
    icon: 'Briefcase',
    title: 'SaaS Platforms',
    category: 'Cloud Software',
    description: 'Multi-tenant software platforms, subscription products, dashboards, administration systems, and scalable business software architectures.',
    features: ['Multi-Tenant Tenant Isolation', 'Subscription & Billing Lifecycle', 'Granular Role-Based Access Control', 'Usage Metrics & Admin Portals']
  },
  {
    id: 'cybersecurity-solutions',
    icon: 'Shield',
    title: 'Cybersecurity Solutions',
    category: 'Defensive Security',
    description: 'Security platforms, assessment systems, vulnerability management tools, defensive security workflows, and security dashboards.',
    features: ['Automated Vulnerability Diagnostics', 'Perimeter & Asset Discovery Checks', 'Scope & Whitelist Boundary Controls', 'Comprehensive Audit Logs & Dashboards']
  },
  {
    id: 'blockchain-web3',
    icon: 'Coins',
    title: 'Blockchain & Web3',
    category: 'Distributed Ledgers',
    description: 'Blockchain applications, Web3 platforms, smart-contract-related products, token ecosystems, and decentralized applications.',
    features: ['Secure Smart Contract Integration', 'Web3 Wallet & Protocol Connectors', 'Decentralized Data Verification', 'Digital Asset Infrastructure']
  },
  {
    id: 'seo-growth-tools',
    icon: 'Search',
    title: 'SEO & Digital Growth Tools',
    category: 'Search Intelligence',
    description: 'SEO platforms, website analysis tools, search optimization systems, reporting dashboards, and digital growth products.',
    features: ['Automated Technical SEO Audits', 'On-Page Content & Meta Analysis', 'Keyword & Visibility Monitoring', 'Actionable Performance Health Scoring']
  },
  {
    id: 'email-communication',
    icon: 'Mail',
    title: 'Communication & Email Systems',
    category: 'Messaging & Webmail',
    description: 'Business email platforms, communication systems, campaign management, notification systems, and messaging infrastructure.',
    features: ['Custom Business Email Architecture', 'Automated DNS (SPF, DKIM, DMARC)', 'Audience Campaign & Notification Queues', 'Secure Webmail & Threaded Inboxes']
  },
  {
    id: 'business-platforms',
    icon: 'BarChart3',
    title: 'Business Platforms & Dashboards',
    category: 'Operations Software',
    description: 'Admin systems, analytics dashboards, management portals, CRM-style systems, reporting tools, and operational software.',
    features: ['Custom Executive Dashboards', 'Workflow Automation Engines', 'Real-Time Operational Analytics', 'Data Visualization & Reporting']
  },
  {
    id: 'ecommerce',
    icon: 'ShoppingCart',
    title: 'E-commerce Platforms',
    category: 'Digital Commerce',
    description: 'Online stores, product platforms, payment flows, order management, and customer systems built for transaction integrity.',
    features: ['Custom Storefronts & Product Catalogs', 'Multi-Provider Payment Gateways', 'Order & Inventory Pipelines', 'Customer Checkout Optimization']
  },
  {
    id: 'apis-backends',
    icon: 'Network',
    title: 'APIs & Backend Systems',
    category: 'Service Layer',
    description: 'Custom APIs, backend services, databases, integrations, authentication systems, and scalable service architecture.',
    features: ['RESTful & Event-Driven APIs', 'Relational & Key-Value Databases', 'OAuth & Session Security Layers', 'High-Throughput Microservices']
  },
  {
    id: 'cloud-infrastructure',
    icon: 'Cloud',
    title: 'Cloud & Digital Infrastructure',
    category: 'Infrastructure',
    description: 'Cloud applications, deployment systems, distributed services, infrastructure architecture, and production environments.',
    features: ['Global Edge Deployment & CDN', 'Zero-Downtime CI/CD Pipelines', 'Serverless & Container Workloads', 'Multi-Region Health Monitoring']
  }
];

// 2. OUR DEVELOPMENT PROCESS (7 Steps)
export const DEVELOPMENT_PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Discovery & Requirements',
    description: 'We deeply analyze your concept, business model, end-users, success metrics, and technical constraints to establish a clear architectural baseline.',
    deliverables: ['Scope of Work', 'Technical Requirements Document', 'Architecture Baseline']
  },
  {
    stepNumber: '02',
    title: 'Product Planning & Architecture',
    description: 'We structure user journeys, database schemas, API specifications, technology stack selection, and a phased execution roadmap.',
    deliverables: ['Data Schemas & System Flowcharts', 'Technology Stack Plan', 'Milestone Schedule']
  },
  {
    stepNumber: '03',
    title: 'UX/UI Engineering & Prototyping',
    description: 'We craft high-fidelity responsive interfaces, component design systems, and intuitive interaction flows matching your brand identity.',
    deliverables: ['Component Design System', 'Interactive User Flows', 'Responsive UI Templates']
  },
  {
    stepNumber: '04',
    title: 'Production Development',
    description: 'Our engineering team writes clean, modular, and maintainable frontend, backend, database, and integration code following strict standards.',
    deliverables: ['Clean Modular Codebase', 'API Endpoints & Services', 'Database & Auth Layer']
  },
  {
    stepNumber: '05',
    title: 'Testing & Security Verification',
    description: 'Rigorous validation across functionality, mobile responsiveness, edge performance, input sanitization, and defensive security safeguards.',
    deliverables: ['Automated & Unit Tests', 'Security & Boundary Review', 'Performance & Cross-Browser Audit']
  },
  {
    stepNumber: '06',
    title: 'Production Deployment & DNS',
    description: 'Configuring edge CDN routing, secure HTTPS certificates, DNS records, automated monitoring, and resilient hosting environments.',
    deliverables: ['Live Production Deployment', 'Domain & DNS Configuration', 'Monitoring & Uptime Alerts']
  },
  {
    stepNumber: '07',
    title: 'Maintenance & Evolution',
    description: 'Continuous technical stewardship, performance tuning, security patches, and incremental feature development as your user base expands.',
    deliverables: ['Ongoing Code Optimization', 'Security Updates', 'Feature Scaling Support']
  }
];

// 3. TECHNOLOGY WE WORK WITH
export const TECHNOLOGY_CATEGORIES: TechCategory[] = [
  {
    category: 'Frontend',
    description: 'Modern, accessible, high-performance user interfaces',
    technologies: ['React', 'TypeScript', 'Vite', 'Modern JavaScript (ESNext)', 'Tailwind CSS', 'Responsive Web Technologies']
  },
  {
    category: 'Backend',
    description: 'Robust server-side architectures and resilient persistence',
    technologies: ['Node.js', 'RESTful APIs', 'Server-Side Architectures', 'Relational Databases', 'Key-Value Stores', 'Event Handlers']
  },
  {
    category: 'Cloud & Edge',
    description: 'High-availability global distribution and edge compute',
    technologies: ['Cloudflare Workers & Pages', 'Cloudflare Static Assets', 'Edge Computing', 'Global CDN Distribution', 'DNS & HSTS Security']
  },
  {
    category: 'Artificial Intelligence',
    description: 'Intelligent automation pipelines and cognitive tools',
    technologies: ['Large Language Models (LLMs)', 'AI APIs & Structured Prompts', 'Autonomous AI Agents', 'Retrieval-Based Systems (RAG)', 'Workflow Automation']
  },
  {
    category: 'Web3 & Blockchain',
    description: 'Distributed ledgers and digital asset integration',
    technologies: ['Blockchain Networks', 'Smart Contract Integrations', 'Web3 Wallet Interfaces', 'Digital Asset Infrastructure', 'Token Standards']
  },
  {
    category: 'Security & Integrity',
    description: 'Defensive architecture and boundary verification',
    technologies: ['Defensive Security Assessment', 'Zero-Trust Architecture', 'OAuth & Secure Authentication', 'Role-Based Access Control (RBAC)', 'Audit Logging']
  }
];

// 4. PROJECTS WE CAN DEVELOP (16 Project Types)
export const PROJECT_TYPES_LIST: ProjectTypeCard[] = [
  {
    title: 'Startup MVP',
    subtitle: 'Rapid Proof of Concept',
    description: 'Turn a novel business idea into a production-ready minimum viable product built for early traction and investor evaluation.',
    tag: 'Startups'
  },
  {
    title: 'Business Website',
    subtitle: 'Corporate Digital Presence',
    description: 'Fast, search-optimized corporate websites and brand hubs with high-end typography and clear positioning.',
    tag: 'Corporate'
  },
  {
    title: 'Web Application',
    subtitle: 'Custom Browser Software',
    description: 'Dynamic, feature-rich web applications engineered for heavy usage, high concurrency, and seamless data updates.',
    tag: 'Web Software'
  },
  {
    title: 'Mobile Application',
    subtitle: 'Cross-Platform Experiences',
    description: 'Responsive mobile applications delivering unified experiences across iOS, Android, and mobile web browsers.',
    tag: 'Mobile'
  },
  {
    title: 'SaaS Platform',
    subtitle: 'Subscription Software',
    description: 'Complete multi-tenant software-as-a-service platforms with automated billing, user onboarding, and workspace isolation.',
    tag: 'SaaS'
  },
  {
    title: 'AI Product',
    subtitle: 'Cognitive Software Tools',
    description: 'Custom AI workspaces, intelligent assistant interfaces, automated content extractors, and cognitive tools.',
    tag: 'AI'
  },
  {
    title: 'Cybersecurity Platform',
    subtitle: 'Defensive Security Tools',
    description: 'Authorized asset discovery scanners, perimeter check tools, threat dashboards, and audit log analyzers.',
    tag: 'Security'
  },
  {
    title: 'Web3 Application',
    subtitle: 'Decentralized Interfaces',
    description: 'Decentralized finance portals, token dashboards, smart contract management consoles, and Web3 connectors.',
    tag: 'Web3'
  },
  {
    title: 'Internal Business Tool',
    subtitle: 'Operational Efficiency',
    description: 'Bespoke tools built to automate manual company processes, streamline employee workflows, and eliminate friction.',
    tag: 'Operations'
  },
  {
    title: 'Customer Portal',
    subtitle: 'Client Self-Service',
    description: 'Secure customer dashboards for ticket tracking, document access, account management, and self-service requests.',
    tag: 'Customer Experience'
  },
  {
    title: 'Admin Dashboard',
    subtitle: 'Data & System Control',
    description: 'Comprehensive administrative control centers with granular user permissions, analytics graphs, and moderation tools.',
    tag: 'Administration'
  },
  {
    title: 'E-commerce Platform',
    subtitle: 'Digital Commerce Engine',
    description: 'High-converting custom digital storefronts with secure payment processing, inventory tracking, and invoice delivery.',
    tag: 'Commerce'
  },
  {
    title: 'Automation System',
    subtitle: 'Hands-Free Workflows',
    description: 'Background workers, webhook dispatchers, scheduled cron jobs, and notification pipelines that run 24/7.',
    tag: 'Automation'
  },
  {
    title: 'API Platform',
    subtitle: 'Developer Services',
    description: 'Documented, rate-limited, and authenticated RESTful APIs built for high availability and third-party developer consumption.',
    tag: 'Backend'
  },
  {
    title: 'Data & Analytics Tool',
    subtitle: 'Actionable Intelligence',
    description: 'Custom metric collectors, real-time analytics aggregation boards, and reporting dashboards.',
    tag: 'Data'
  },
  {
    title: 'Custom Enterprise Software',
    subtitle: 'Tailored Enterprise Systems',
    description: 'Purpose-built software architectures tailored specifically to solve complex institutional and organizational challenges.',
    tag: 'Enterprise'
  }
];

// 5. WHY BUILD WITH JONANDA (6 Value Pillars)
export const WHY_BUILD_WITH_JONANDA: ValuePillar[] = [
  {
    title: 'Product Thinking',
    description: 'We focus on the actual problem, real users, operational workflows, and measurable business outcomes rather than just writing code.',
    highlight: 'Outcome-Driven Engineering'
  },
  {
    title: 'Modern Technology',
    description: 'We utilize production-tested, modern engineering stacks (React, TypeScript, Cloudflare Edge, Node.js) that offer superior performance and durability.',
    highlight: 'Modern & Durable Stacks'
  },
  {
    title: 'Security-Minded Development',
    description: 'Security and responsible engineering are baked in from Day 1—including strict input sanitization, least-privilege access, and defensive validations.',
    highlight: 'Defensive Architecture'
  },
  {
    title: 'Scalable Architecture',
    description: 'Every project is architected with clean modular boundaries, making future feature expansion and database scaling straightforward.',
    highlight: 'Modular & Future-Proof'
  },
  {
    title: 'End-to-End Development',
    description: 'From initial discovery and UI/UX design to backend development, security verification, and cloud deployment, we cover the full lifecycle.',
    highlight: 'Full Lifecycle Ownership'
  },
  {
    title: 'Long-Term Product Vision',
    description: 'Because JONANDA LLC builds its own proprietary ecosystem, we treat every client project with the same institutional care and long-term mindset.',
    highlight: 'Institutional Standard'
  }
];

// 6. FREQUENTLY ASKED QUESTIONS (8 FAQs)
export const PROJECT_DEVELOPMENT_FAQS: FAQItem[] = [
  {
    question: 'What types of projects can JONANDA LLC build?',
    answer: 'We design and develop websites, web applications, mobile applications, SaaS platforms, AI products, cybersecurity systems, Web3 applications, business tools, dashboards, APIs, and custom enterprise software solutions tailored to organizational requirements.'
  },
  {
    question: 'Can you build an MVP from an idea?',
    answer: 'Yes. A project can begin with a conceptual idea and progress systematically through discovery, product planning, UX/UI design, development, testing, and production deployment.'
  },
  {
    question: 'Can you work with an existing project or codebase?',
    answer: 'Yes. We can review, refactor, audit, and extend existing applications, repositories, or system architectures where technically appropriate.'
  },
  {
    question: 'Do you provide custom development or just ready-made templates?',
    answer: 'We provide fully custom development. Every solution is architected and coded around the specific requirements, user journeys, brand guidelines, and technical environment of your project.'
  },
  {
    question: 'Do you build AI products and intelligent agent workflows?',
    answer: 'Yes. JONANDA LLC develops AI-oriented applications, intelligent workflows, deterministic agent systems, and automated data processing pipelines with strict safety and privacy controls.'
  },
  {
    question: 'Do you build cybersecurity products and security tools?',
    answer: 'Yes. We build defensive cybersecurity tools, including authorized vulnerability assessment utilities, perimeter verification dashboards, audit log analyzers, and security reporting systems.'
  },
  {
    question: 'Do you build blockchain and Web3 projects?',
    answer: 'Yes. JONANDA LLC engineers Web3 and blockchain-oriented technology, including decentralized web applications, smart contract integrations, and digital asset ecosystem infrastructure.'
  },
  {
    question: 'How do I start a project with JONANDA LLC?',
    answer: 'You can submit a project inquiry using the form below or contact our corporate team at contact@jonanda.com with an overview of your concept, timeline, and requirements. Our engineering team will review and schedule an initial discovery discussion.'
  }
];
