import { FlowNodeDefinition } from '../types/flow';

export const FLOW_NODE_DEFINITIONS: Record<string, FlowNodeDefinition> = {
  // ==========================================
  // 1. TRIGGER NODES
  // ==========================================
  trigger_schedule: {
    type: 'trigger_schedule',
    category: 'trigger',
    title: 'Schedule / Cron',
    subtitle: 'Runs periodically or at specific times',
    description: 'Triggers workflow execution at scheduled recurring intervals (every minute, hourly, daily, weekly, monthly, or custom cron expression).',
    iconName: 'Clock',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Trigger', type: 'output' }],
    defaultConfig: { interval: 'daily', time: '09:00', cron: '0 9 * * *', timezone: 'UTC' }
  },
  trigger_webhook: {
    type: 'trigger_webhook',
    category: 'trigger',
    title: 'Webhook Endpoint',
    subtitle: 'Receives external HTTP POST/GET payloads',
    description: 'Generates a unique incoming URL with cryptographic signature verification and secret token authentication.',
    iconName: 'Globe',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Received', type: 'output' }],
    defaultConfig: { method: 'POST', authType: 'secret_header', responseMode: 'immediate_200' }
  },
  trigger_manual: {
    type: 'trigger_manual',
    category: 'trigger',
    title: 'Manual On-Demand',
    subtitle: 'Fired by user click or API invocation',
    description: 'Allows manual test executions, button triggers, or ad-hoc batch processing runs.',
    iconName: 'Play',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Start', type: 'output' }],
    defaultConfig: { requireConfirmation: false }
  },
  trigger_email_event: {
    type: 'trigger_email_event',
    category: 'trigger',
    title: 'Email Event Trigger',
    subtitle: 'Email received, opened, clicked, or bounced',
    description: 'Fires in response to mail events from JONANDA MAIL delivery infrastructure.',
    iconName: 'Mail',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Event', type: 'output' }],
    defaultConfig: { eventType: 'email_opened', trackLinks: true }
  },
  trigger_partner_applied: {
    type: 'trigger_partner_applied',
    category: 'trigger',
    title: 'Partner Applied',
    subtitle: 'New corporate partnership form intake',
    description: 'Triggers when a company applies to the JONANDA Partner Network.',
    iconName: 'Handshake',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Application', type: 'output' }],
    defaultConfig: { track: 'all', autoValidate: true }
  },
  trigger_partner_approved: {
    type: 'trigger_partner_approved',
    category: 'trigger',
    title: 'Partner Approved',
    subtitle: 'Admin validates partner application',
    description: 'Triggers immediately when a partnership application transitions to approved status.',
    iconName: 'CheckCircle2',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Approved', type: 'output' }],
    defaultConfig: { tierFilter: 'all' }
  },
  trigger_influencer_applied: {
    type: 'trigger_influencer_applied',
    category: 'trigger',
    title: 'Creator Applied',
    subtitle: 'New influencer joins program',
    description: 'Fired when a content creator submits an application with their channel metrics.',
    iconName: 'Users',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Creator', type: 'output' }],
    defaultConfig: { minFollowers: 1000 }
  },
  trigger_campaign_accepted: {
    type: 'trigger_campaign_accepted',
    category: 'trigger',
    title: 'Campaign Accepted',
    subtitle: 'Creator accepts sponsorship invitation',
    description: 'Triggers when a creator accepts a brand brief invitation.',
    iconName: 'Briefcase',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Accepted', type: 'output' }],
    defaultConfig: {}
  },
  trigger_content_submitted: {
    type: 'trigger_content_submitted',
    category: 'trigger',
    title: 'Content Submitted',
    subtitle: 'Creator uploads draft review media',
    description: 'Triggers when sponsored content draft or final link is submitted for brand review.',
    iconName: 'FileText',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Submission', type: 'output' }],
    defaultConfig: { requireDraftCheck: true }
  },
  trigger_customer_event: {
    type: 'trigger_customer_event',
    category: 'trigger',
    title: 'Customer Lifecycle Event',
    subtitle: 'Signup, subscription, or payment',
    description: 'Triggers on customer registration, JONANDA ONE subscription change, or support event.',
    iconName: 'UserPlus',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Customer', type: 'output' }],
    defaultConfig: { event: 'signup' }
  },
  trigger_ecosystem_event: {
    type: 'trigger_ecosystem_event',
    category: 'trigger',
    title: 'JONANDA Ecosystem Event',
    subtitle: 'Product activated, LOZULA security alert',
    description: 'Triggers on events originating across JONANDA ONE, LOZULA, or JONANDA Studio products.',
    iconName: 'Layers',
    color: 'emerald',
    inputs: [],
    outputs: [{ id: 'out', label: 'Ecosystem', type: 'output' }],
    defaultConfig: { product: 'lozula', severity: 'medium' }
  },

  // ==========================================
  // 2. ACTION NODES
  // ==========================================
  action_send_email: {
    type: 'action_send_email',
    category: 'action',
    title: 'Send JONANDA Mail',
    subtitle: 'Dispatches templated email message',
    description: 'Sends a personalized email via JONANDA MAIL with DKIM verification, dynamic token interpolation, and open/click tracking.',
    iconName: 'Mail',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Sent', type: 'output' }],
    defaultConfig: {
      to: '{{email}}',
      subject: 'Update from JONANDA Ecosystem',
      bodyText: 'Hello {{first_name}},\n\nHere is your automated update.',
      templateId: ''
    }
  },
  action_send_campaign: {
    type: 'action_send_campaign',
    category: 'action',
    title: 'Broadcast Campaign',
    subtitle: 'Dispatches targeted batch to audience',
    description: 'Queues a multi-recipient batch campaign to an audience list with suppression list enforcement.',
    iconName: 'Send',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Queued', type: 'output' }],
    defaultConfig: { targetList: 'Corporate Partners', batchSize: 50 }
  },
  action_http_request: {
    type: 'action_http_request',
    category: 'action',
    title: 'HTTP / API Request',
    subtitle: 'Universal REST GET, POST, PUT, DELETE',
    description: 'Performs external REST API requests with headers, JSON payload, authentication credentials, timeout, and SSRF security protection.',
    iconName: 'Globe',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'out', label: 'Response (2xx)', type: 'output' },
      { id: 'error', label: 'Error (4xx/5xx)', type: 'output' }
    ],
    defaultConfig: {
      method: 'POST',
      url: 'https://api.example.com/v1/resource',
      headers: { 'Content-Type': 'application/json' },
      body: '{\n  "event": "automated_trigger"\n}',
      timeoutMs: 10000,
      maxRetries: 2
    }
  },
  action_add_tag: {
    type: 'action_add_tag',
    category: 'action',
    title: 'Add / Remove Tag',
    subtitle: 'Updates contact or partner tags',
    description: 'Modifies tags on a recipient in the centralized JONANDA Audience ledger.',
    iconName: 'Tag',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Tagged', type: 'output' }],
    defaultConfig: { operation: 'add', tag: 'Verified Partner' }
  },
  action_update_partner: {
    type: 'action_update_partner',
    category: 'action',
    title: 'Update Partner Record',
    subtitle: 'Modifies status, tier, or notes',
    description: 'Updates corporate partner metadata, verification status, and technical assigned track.',
    iconName: 'Handshake',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Updated', type: 'output' }],
    defaultConfig: { targetStatus: 'active', tier: 'Strategic' }
  },
  action_update_influencer: {
    type: 'action_update_influencer',
    category: 'action',
    title: 'Update Creator Record',
    subtitle: 'Approves or categorizes creator',
    description: 'Updates creator verification level, roster status, and assigned brand campaign invitations.',
    iconName: 'Users',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Updated', type: 'output' }],
    defaultConfig: { targetStatus: 'active', assignRoster: 'Web3 & AI Creators' }
  },
  action_wait_delay: {
    type: 'action_wait_delay',
    category: 'action',
    title: 'Wait / Delay',
    subtitle: 'Pauses execution for duration',
    description: 'Delays workflow execution for a specified amount of time (minutes, hours, or days) before proceeding.',
    iconName: 'Hourglass',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Resumed', type: 'output' }],
    defaultConfig: { duration: 2, unit: 'days' }
  },
  action_internal_alert: {
    type: 'action_internal_alert',
    category: 'action',
    title: 'Internal Alert Notification',
    subtitle: 'Notifies executive or ops team',
    description: 'Dispatches high-priority system alerts to operations via email, webhook, or team channel.',
    iconName: 'Bell',
    color: 'amber',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Dispatched', type: 'output' }],
    defaultConfig: { priority: 'high', channel: 'email', message: 'New workflow notification: {{title}}' }
  },

  // ==========================================
  // 3. LOGIC & ROUTING NODES
  // ==========================================
  logic_if_else: {
    type: 'logic_if_else',
    category: 'logic',
    title: 'IF / ELSE Condition',
    subtitle: 'Branches based on boolean evaluation',
    description: 'Evaluates dynamic expressions (e.g. {{status}} == "approved") and routes execution to YES (True) or NO (False) output paths.',
    iconName: 'GitBranch',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'true', label: 'TRUE (YES)', type: 'output' },
      { id: 'false', label: 'FALSE (NO)', type: 'output' }
    ],
    defaultConfig: { field: 'status', operator: 'equals', value: 'approved' }
  },
  logic_switch: {
    type: 'logic_switch',
    category: 'logic',
    title: 'Switch Router',
    subtitle: 'Multi-way conditional router',
    description: 'Routes execution through multiple branches based on matched values (e.g. Enterprise, Strategic, Standard).',
    iconName: 'GitFork',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'route_1', label: 'Case 1', type: 'output' },
      { id: 'route_2', label: 'Case 2', type: 'output' },
      { id: 'default', label: 'Default', type: 'output' }
    ],
    defaultConfig: { property: 'tier', case1: 'Enterprise', case2: 'Strategic' }
  },
  logic_filter: {
    type: 'logic_filter',
    category: 'logic',
    title: 'Data Filter',
    subtitle: 'Stops execution if conditions unmet',
    description: 'Filters incoming data payload. If conditions are met, continues downstream; otherwise terminates gracefully.',
    iconName: 'Filter',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'passed', label: 'Passed', type: 'output' }],
    defaultConfig: { field: 'followers', operator: 'greater_than', value: '5000' }
  },
  logic_loop: {
    type: 'logic_loop',
    category: 'logic',
    title: 'Loop / For Each',
    subtitle: 'Iterates over items in an array',
    description: 'Executes child nodes for each item in an array (e.g. iterate through a list of creator profiles or database records).',
    iconName: 'RotateCw',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'loop_item', label: 'Each Item', type: 'output' },
      { id: 'done', label: 'On Complete', type: 'output' }
    ],
    defaultConfig: { arrayField: 'items', maxIterations: 100 }
  },
  logic_terminate: {
    type: 'logic_terminate',
    category: 'logic',
    title: 'Stop / Terminate',
    subtitle: 'Ends workflow pipeline execution',
    description: 'Explicitly stops workflow execution and returns final status code and response payload.',
    iconName: 'StopCircle',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [],
    defaultConfig: { reason: 'Completed normally', status: 'completed' }
  },

  // ==========================================
  // 4. DATA TRANSFORMATION & CODE NODES
  // ==========================================
  data_transform: {
    type: 'data_transform',
    category: 'data',
    title: 'Transform Data',
    subtitle: 'Map, format, and structure JSON',
    description: 'Maps, parses, reformats, or merges payload properties using safe data mapping expressions.',
    iconName: 'Database',
    color: 'blue',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Result', type: 'output' }],
    defaultConfig: {
      mapping: '{\n  "fullName": "{{contactName}}",\n  "company": "{{companyName}}",\n  "processedAt": "{{now}}"\n}'
    }
  },
  data_set_variable: {
    type: 'data_set_variable',
    category: 'data',
    title: 'Set Variables',
    subtitle: 'Defines workflow memory variables',
    description: 'Sets or updates execution-scoped variables accessible across downstream nodes.',
    iconName: 'Variable',
    color: 'blue',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Out', type: 'output' }],
    defaultConfig: { variableName: 'portal_url', value: 'https://llc.jonanda.com/partners' }
  },
  code_sandbox_function: {
    type: 'code_sandbox_function',
    category: 'code',
    title: 'Code / Function (Sandboxed)',
    subtitle: 'Restricted safe JavaScript transform',
    description: 'Executes pure sandboxed data transformations without host OS or filesystem access.',
    iconName: 'Code',
    color: 'blue',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Out', type: 'output' }],
    defaultConfig: {
      code: '// Pure transform function\nreturn {\n  ...items,\n  computedScore: items.followers ? items.followers * 0.05 : 10\n};'
    }
  },

  // ==========================================
  // 5. AI ENGINE NODES
  // ==========================================
  ai_generate_text: {
    type: 'ai_generate_text',
    category: 'ai',
    title: 'AI Text Generator',
    subtitle: 'LLM content & summary generation',
    description: 'Generates summaries, personalized copy, rewrites, or structured JSON data using enterprise AI models.',
    iconName: 'Sparkles',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Output', type: 'output' }],
    defaultConfig: {
      prompt: 'Summarize this partner inquiry and evaluate fit: {{notes}}',
      model: 'gemini-pro',
      temperature: 0.3
    }
  },
  ai_email_personalizer: {
    type: 'ai_email_personalizer',
    category: 'ai',
    title: 'AI Email Personalizer',
    subtitle: 'Dynamic custom copy tailored to recipient',
    description: 'Generates custom introductory hooks and relevant talking points based on recipient profile data.',
    iconName: 'Sparkles',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Personalized', type: 'output' }],
    defaultConfig: {
      contextFields: ['creatorName', 'niche', 'followersCount'],
      tone: 'Professional & Collaborative'
    }
  },
  ai_decision_router: {
    type: 'ai_decision_router',
    category: 'ai',
    title: 'AI Decision Router',
    subtitle: 'Intelligent intent and sentiment routing',
    description: 'Classifies inbound text or inquiries and routes to the best-matched operational pathway.',
    iconName: 'Sparkles',
    color: 'purple',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'high_priority', label: 'High Priority', type: 'output' },
      { id: 'standard', label: 'Standard', type: 'output' }
    ],
    defaultConfig: { criteria: 'Classify partnership urgency and enterprise scale.' }
  },

  // ==========================================
  // 6. DATABASE NODES
  // ==========================================
  database_query: {
    type: 'database_query',
    category: 'database',
    title: 'Database Query / Execute',
    subtitle: 'PostgreSQL, MySQL, Supabase connector',
    description: 'Performs structured queries, inserts, updates, or selects against configured database credentials.',
    iconName: 'Database',
    color: 'blue',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Rows', type: 'output' }],
    defaultConfig: {
      operation: 'SELECT',
      query: 'SELECT * FROM partners WHERE status = $1',
      parameters: ['active']
    }
  },

  // ==========================================
  // 7. JONANDA PRODUCT INTEGRATIONS
  // ==========================================
  integration_lozula_security: {
    type: 'integration_lozula_security',
    category: 'integration',
    title: 'LOZULA Cybersecurity',
    subtitle: 'Vulnerability scan & defensive audits',
    description: 'Triggers security assessments, code audits, or retrieves threat telemetry from LOZULA platform.',
    iconName: 'ShieldCheck',
    color: 'emerald',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [
      { id: 'passed', label: 'Clean', type: 'output' },
      { id: 'alert', label: 'Threat Detected', type: 'output' }
    ],
    defaultConfig: { scanType: 'threat_assessment', targetDomain: '{{domain}}' }
  },
  integration_jonanda_seo: {
    type: 'integration_jonanda_seo',
    category: 'integration',
    title: 'JONANDA SEO Toolkit',
    subtitle: 'Keyword tracking & ranking audits',
    description: 'Automates keyword clustering, backlink verification, and periodic search ranking audits.',
    iconName: 'Search',
    color: 'blue',
    inputs: [{ id: 'in', label: 'In', type: 'input' }],
    outputs: [{ id: 'out', label: 'Audit Data', type: 'output' }],
    defaultConfig: { auditDepth: 'standard' }
  }
};
