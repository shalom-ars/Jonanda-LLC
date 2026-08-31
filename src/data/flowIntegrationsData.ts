import { IntegrationApp } from '../types/flow';

export const SEED_INTEGRATIONS: IntegrationApp[] = [
  {
    id: 'jonanda_mail',
    name: 'JONANDA MAIL',
    category: 'ecosystem',
    description: 'Native email delivery platform with DKIM verification, inbox management, and campaign dispatch.',
    iconName: 'Mail',
    authType: 'smtp',
    isConnected: true,
    credentialId: 'cred_jnda_mail',
    featured: true,
    capabilities: ['Send Email', 'Send Campaign', 'Email Events', 'Bounce Suppression']
  },
  {
    id: 'lozula_security',
    name: 'LOZULA Cybersecurity',
    category: 'ecosystem',
    description: 'Automated vulnerability scanning, defensive code audits, and live threat telemetry alerts.',
    iconName: 'ShieldCheck',
    authType: 'api_key',
    isConnected: true,
    credentialId: 'cred_lozula',
    featured: true,
    capabilities: ['Threat Assessment', 'Security Audits', 'Vulnerability Alerts']
  },
  {
    id: 'jonanda_studio',
    name: 'JONANDA STUDIO',
    category: 'ecosystem',
    description: 'AI asset generation, media kit rendering, and creative workflow engine.',
    iconName: 'Sparkles',
    authType: 'api_key',
    isConnected: true,
    featured: true,
    capabilities: ['Asset Generation', 'Media Rendering', 'Creative Pipelines']
  },
  {
    id: 'jonanda_seo',
    name: 'JONANDA SEO',
    category: 'ecosystem',
    description: 'Search performance tracking, backlink audits, and technical keyword clustering.',
    iconName: 'Search',
    authType: 'api_key',
    isConnected: false,
    capabilities: ['Keyword Audits', 'SERP Tracking', 'Meta Optimization']
  },
  {
    id: 'google_gemini',
    name: 'Google Gemini AI',
    category: 'ai',
    description: 'Advanced reasoning, structured JSON extraction, and text generation models.',
    iconName: 'Zap',
    authType: 'api_key',
    isConnected: true,
    featured: true,
    capabilities: ['Text Generation', 'Summarization', 'Data Extraction', 'Decision Routing']
  },
  {
    id: 'openai',
    name: 'OpenAI (GPT-4o)',
    category: 'ai',
    description: 'Natural language understanding, embeddings, and conversation drafting.',
    iconName: 'Sparkles',
    authType: 'api_key',
    isConnected: false,
    capabilities: ['Text Generation', 'Code Analysis', 'Function Calling']
  },
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    category: 'ai',
    description: 'Complex document synthesis, research evaluation, and long-context processing.',
    iconName: 'Sparkles',
    authType: 'api_key',
    isConnected: false,
    capabilities: ['Document Analysis', 'Nuanced Copywriting', 'Safety Vetting']
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL Database',
    category: 'database',
    description: 'Direct query and data synchronization with enterprise Postgres clusters.',
    iconName: 'Database',
    authType: 'database',
    isConnected: false,
    capabilities: ['Query Execution', 'Insert / Upsert', 'Data Streaming']
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    description: 'Postgres database, auth webhooks, and realtime database event triggers.',
    iconName: 'Database',
    authType: 'api_key',
    isConnected: false,
    capabilities: ['Record Updates', 'Realtime Triggers', 'Storage Sync']
  },
  {
    id: 'webhook_custom',
    name: 'Custom Webhooks & HMAC',
    category: 'dev',
    description: 'Secure incoming & outgoing HTTP endpoints with secret signatures.',
    iconName: 'Globe',
    authType: 'webhook_secret',
    isConnected: true,
    capabilities: ['HMAC-SHA256 Signing', 'Immediate 200 Mode', 'Retry Policy']
  },
  {
    id: 'discord_slack',
    name: 'Team Alert Webhooks',
    category: 'communication',
    description: 'Instant notification dispatch to internal operations and executive channels.',
    iconName: 'Bell',
    authType: 'bearer_token',
    isConnected: false,
    capabilities: ['Executive Alerts', 'Incident Pagers', 'Daily Digest']
  },
  {
    id: 'stripe_billing',
    name: 'Payment & Billing Events',
    category: 'crm',
    description: 'Listen to subscription lifecycle events, invoices, and customer renewals.',
    iconName: 'Layers',
    authType: 'api_key',
    isConnected: false,
    capabilities: ['Subscription Events', 'Invoice Paid', 'Customer Upgrades']
  }
];
