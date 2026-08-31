import { FlowNodeDefinition } from '../types/flow';

export const FLOW_NODE_DEFINITIONS: Record<string, FlowNodeDefinition> = {
  // ==========================================
  // TRIGGERS
  // ==========================================
  'trigger_partner_applied': {
    type: 'trigger_partner_applied',
    category: 'trigger',
    title: 'New Partner Application',
    subtitle: 'Fires when an enterprise applies to the partner network',
    iconName: 'Handshake',
    color: 'emerald',
    description: 'Triggers immediately upon submission of a corporate partnership brief.',
    defaultConfig: {
      track: 'all',
      autoValidate: true
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Payload', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_partner_approved': {
    type: 'trigger_partner_approved',
    category: 'trigger',
    title: 'Partner Approved',
    subtitle: 'Fires when partner application status changes to approved',
    iconName: 'CheckCircle2',
    color: 'emerald',
    description: 'Triggers when a partner application is officially verified.',
    defaultConfig: {
      minimumTier: 'Standard'
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Partner Data', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_influencer_applied': {
    type: 'trigger_influencer_applied',
    category: 'trigger',
    title: 'Influencer Application',
    subtitle: 'Fires when a creator or influencer registers',
    iconName: 'Users',
    color: 'purple',
    description: 'Captures creator application data, social handles, and niche.',
    defaultConfig: {
      platform: 'all',
      minFollowers: 5000
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Creator Data', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_influencer_approved': {
    type: 'trigger_influencer_approved',
    category: 'trigger',
    title: 'Influencer Approved',
    subtitle: 'Fires when a creator is approved for campaigns',
    iconName: 'Sparkles',
    color: 'purple',
    description: 'Triggers when an influencer is accepted into the active roster.',
    defaultConfig: {},
    inputs: [],
    outputs: [
      { id: 'out', label: 'Influencer Info', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_campaign_accepted': {
    type: 'trigger_campaign_accepted',
    category: 'trigger',
    title: 'Campaign Accepted',
    subtitle: 'Fires when an influencer accepts a campaign invite',
    iconName: 'Briefcase',
    color: 'blue',
    description: 'Triggers when an influencer accepts terms for a campaign brief.',
    defaultConfig: {
      campaignId: 'any'
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Campaign Data', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_content_submitted': {
    type: 'trigger_content_submitted',
    category: 'trigger',
    title: 'Content Submitted',
    subtitle: 'Fires when draft content is uploaded for review',
    iconName: 'FileText',
    color: 'amber',
    description: 'Triggers when draft media, post links, or copy are submitted.',
    defaultConfig: {
      requireMediaUrl: true
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Submission Data', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_customer_registered': {
    type: 'trigger_customer_registered',
    category: 'trigger',
    title: 'Customer Registered',
    subtitle: 'Fires on new user account or product signup',
    iconName: 'UserPlus',
    color: 'blue',
    description: 'Fires when a new user joins any JONANDA ecosystem product.',
    defaultConfig: {
      productSource: 'all'
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'User Data', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_webhook': {
    type: 'trigger_webhook',
    category: 'trigger',
    title: 'Incoming Webhook',
    subtitle: 'HTTP POST trigger with token signature verification',
    iconName: 'Globe',
    color: 'cyan',
    description: 'Listens for external payload events from custom APIs and systems.',
    defaultConfig: {
      endpointPath: '/webhook/v1/custom-event',
      secretToken: 'jnda_wh_sec_994812a',
      requireSignature: true
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Payload', type: 'output', dataType: 'object' }
    ]
  },
  'trigger_schedule': {
    type: 'trigger_schedule',
    category: 'trigger',
    title: 'Schedule / Cron',
    subtitle: 'Periodic timer trigger (Daily, Weekly, Hourly)',
    iconName: 'Clock',
    color: 'gold',
    description: 'Executes workflow on a recurring cadence or specific time.',
    defaultConfig: {
      cron: '0 9 * * 1', // Every Monday at 9:00 AM
      timezone: 'UTC'
    },
    inputs: [],
    outputs: [
      { id: 'out', label: 'Timestamp', type: 'output', dataType: 'string' }
    ]
  },
  'trigger_manual': {
    type: 'trigger_manual',
    category: 'trigger',
    title: 'Manual Trigger',
    subtitle: 'Triggered on-demand by administrator click',
    iconName: 'Play',
    color: 'gold',
    description: 'Runs workflow on-demand with custom test payload.',
    defaultConfig: {},
    inputs: [],
    outputs: [
      { id: 'out', label: 'Trigger Data', type: 'output', dataType: 'object' }
    ]
  },

  // ==========================================
  // ACTIONS
  // ==========================================
  'action_send_email': {
    type: 'action_send_email',
    category: 'action',
    title: 'Send JONANDA Mail',
    subtitle: 'Dispatches templated email via JONANDA Mail engine',
    iconName: 'Mail',
    color: 'gold',
    description: 'Sends personalized email with variables like {{first_name}} and {{company}}.',
    defaultConfig: {
      fromName: 'JONANDA LLC Relations',
      fromEmail: 'contact@jonanda.com',
      to: '{{email}}',
      subject: 'Welcome to JONANDA Ecosystem',
      templateId: 'partner-welcome-v1',
      bodyText: 'Hello {{first_name}},\n\nWelcome to JONANDA LLC. Your application has been processed.',
      trackOpens: true,
      trackClicks: true
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Sent Result', type: 'output', dataType: 'object' }
    ]
  },
  'action_add_tag': {
    type: 'action_add_tag',
    category: 'action',
    title: 'Add Contact Tag',
    subtitle: 'Assigns tags for audience segmentation',
    iconName: 'Tag',
    color: 'indigo',
    description: 'Labels contact in JONANDA MAIL with specific segment tag.',
    defaultConfig: {
      tag: 'Strategic Partner',
      list: 'Partners Network'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Updated Contact', type: 'output', dataType: 'object' }
    ]
  },
  'action_update_partner': {
    type: 'action_update_partner',
    category: 'action',
    title: 'Update Partner Status',
    subtitle: 'Modifies tier or status in Partner ledger',
    iconName: 'ShieldCheck',
    color: 'emerald',
    description: 'Updates partner record in database with new status or metadata.',
    defaultConfig: {
      targetStatus: 'active',
      tier: 'Strategic'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Partner Record', type: 'output', dataType: 'object' }
    ]
  },
  'action_update_influencer': {
    type: 'action_update_influencer',
    category: 'action',
    title: 'Update Influencer Status',
    subtitle: 'Modifies creator tier or campaign status',
    iconName: 'Sparkles',
    color: 'purple',
    description: 'Updates influencer record with approval rating and tags.',
    defaultConfig: {
      targetStatus: 'active',
      assignRoster: 'Web3 & AI Creators'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Influencer Record', type: 'output', dataType: 'object' }
    ]
  },
  'action_wait_delay': {
    type: 'action_wait_delay',
    category: 'action',
    title: 'Wait / Delay',
    subtitle: 'Pauses execution flow for specified duration',
    iconName: 'Hourglass',
    color: 'amber',
    description: 'Delays the next step (e.g. Wait 2 days before sending follow-up).',
    defaultConfig: {
      duration: 2,
      unit: 'days' // 'minutes' | 'hours' | 'days'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Continue', type: 'output', dataType: 'object' }
    ]
  },
  'action_http_webhook': {
    type: 'action_http_webhook',
    category: 'action',
    title: 'Outgoing HTTP Request',
    subtitle: 'Calls external REST API or webhook endpoint',
    iconName: 'ExternalLink',
    color: 'cyan',
    description: 'Dispatches payload to external CRM, Slack, Discord, or server.',
    defaultConfig: {
      method: 'POST',
      url: 'https://api.external.com/v1/notify',
      headers: '{\n  "Content-Type": "application/json"\n}',
      retryOnFailure: true,
      maxRetries: 3
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Response', type: 'output', dataType: 'object' }
    ]
  },
  'action_internal_alert': {
    type: 'action_internal_alert',
    category: 'action',
    title: 'Internal Team Alert',
    subtitle: 'Notifies executive or administrative team',
    iconName: 'Bell',
    color: 'rose',
    description: 'Sends notification to JONANDA operations dashboard or email.',
    defaultConfig: {
      priority: 'high',
      channel: 'email',
      message: 'New high-priority partner application received from {{company}}.'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Status', type: 'output', dataType: 'object' }
    ]
  },

  // ==========================================
  // LOGIC
  // ==========================================
  'logic_if_else': {
    type: 'logic_if_else',
    category: 'logic',
    title: 'If / Else Condition',
    subtitle: 'Branches workflow based on boolean rule',
    iconName: 'GitBranch',
    color: 'orange',
    description: 'Evaluates condition: True branches to True path, False to False path.',
    defaultConfig: {
      field: 'status',
      operator: 'equals', // 'equals' | 'not_equals' | 'contains' | 'greater_than'
      value: 'approved'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'true', label: 'YES / True', type: 'output', dataType: 'object' },
      { id: 'false', label: 'NO / False', type: 'output', dataType: 'object' }
    ]
  },
  'logic_filter': {
    type: 'logic_filter',
    category: 'logic',
    title: 'Filter Payload',
    subtitle: 'Stops workflow if criteria not met',
    iconName: 'Filter',
    color: 'orange',
    description: 'Filters incoming data; non-matching items terminate silently.',
    defaultConfig: {
      field: 'followers',
      operator: 'greater_than',
      value: '10000'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'passed', label: 'Passed', type: 'output', dataType: 'object' }
    ]
  },
  'logic_stop': {
    type: 'logic_stop',
    category: 'logic',
    title: 'Stop Workflow',
    subtitle: 'Terminates execution path with message',
    iconName: 'StopCircle',
    color: 'rose',
    description: 'Concludes execution path without error.',
    defaultConfig: {
      reason: 'Standard workflow termination'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: []
  },

  // ==========================================
  // DATA
  // ==========================================
  'data_get_contact': {
    type: 'data_get_contact',
    category: 'data',
    title: 'Get Contact Record',
    subtitle: 'Fetches contact details from JONANDA MAIL database',
    iconName: 'Database',
    color: 'blue',
    description: 'Retrieves full history, tags, and status by email address.',
    defaultConfig: {
      lookupField: 'email',
      lookupValue: '{{email}}'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Contact Data', type: 'output', dataType: 'object' }
    ]
  },
  'data_set_variable': {
    type: 'data_set_variable',
    category: 'data',
    title: 'Set Workflow Variable',
    subtitle: 'Stores variable for downstream nodes',
    iconName: 'Variable',
    color: 'blue',
    description: 'Creates reusable variable (e.g. {{campaign_portal_url}}).',
    defaultConfig: {
      key: 'portal_url',
      value: 'https://llc.jonanda.com/partners/directory'
    },
    inputs: [
      { id: 'in', label: 'Input', type: 'input', dataType: 'object' }
    ],
    outputs: [
      { id: 'out', label: 'Enriched Data', type: 'output', dataType: 'object' }
    ]
  }
};
