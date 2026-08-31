import { Workflow } from '../types/flow';

export const SEED_WORKFLOW_TEMPLATES: Workflow[] = [
  {
    id: 'template_partner_onboarding',
    name: 'Institutional Partner Onboarding',
    description: 'Automated application vetting, conditional welcome sequence, strategic resource provisioning, and 2-day follow-up.',
    category: 'partner',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA Corporate Engine',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 142,
    successRate: 99.2,
    variables: {
      partner_portal: 'https://llc.jonanda.com/partners/directory',
      support_email: 'partners@jonanda.com'
    },
    nodes: [
      {
        id: 'node_1',
        type: 'trigger_partner_applied',
        category: 'trigger',
        title: 'New Partner Application',
        position: { x: 80, y: 180 },
        config: { track: 'all', autoValidate: true },
        status: 'idle'
      },
      {
        id: 'node_2',
        type: 'action_internal_alert',
        category: 'action',
        title: 'Notify Executive Team',
        position: { x: 380, y: 180 },
        config: {
          priority: 'high',
          channel: 'email',
          message: 'New corporate partnership application received from {{company}}.'
        },
        status: 'idle'
      },
      {
        id: 'node_3',
        type: 'logic_if_else',
        category: 'logic',
        title: 'Review Status Approved?',
        position: { x: 680, y: 180 },
        config: { field: 'status', operator: 'equals', value: 'approved' },
        status: 'idle'
      },
      {
        id: 'node_4',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Partner Welcome',
        position: { x: 1000, y: 100 },
        config: {
          to: '{{email}}',
          subject: 'Welcome to JONANDA Partner Network | Official Confirmation',
          bodyText: 'Hello {{contactName}},\n\nWe are pleased to welcome {{companyName}} to the JONANDA Technology Partner Network.'
        },
        status: 'idle'
      },
      {
        id: 'node_5',
        type: 'action_add_tag',
        category: 'action',
        title: 'Tag as Strategic Partner',
        position: { x: 1300, y: 100 },
        config: { tag: 'Verified Partner', list: 'Corporate Partners' },
        status: 'idle'
      },
      {
        id: 'node_6',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Rejection Notice',
        position: { x: 1000, y: 320 },
        config: {
          to: '{{email}}',
          subject: 'Update on Your JONANDA Partnership Application',
          bodyText: 'Hello {{contactName}},\n\nThank you for your interest in JONANDA LLC. At this time, we are unable to proceed.'
        },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'e1_2', sourceNodeId: 'node_1', sourcePortId: 'out', targetNodeId: 'node_2', targetPortId: 'in' },
      { id: 'e2_3', sourceNodeId: 'node_2', sourcePortId: 'out', targetNodeId: 'node_3', targetPortId: 'in' },
      { id: 'e3_4', sourceNodeId: 'node_3', sourcePortId: 'true', targetNodeId: 'node_4', targetPortId: 'in', label: 'YES' },
      { id: 'e4_5', sourceNodeId: 'node_4', sourcePortId: 'out', targetNodeId: 'node_5', targetPortId: 'in' },
      { id: 'e3_6', sourceNodeId: 'node_3', sourcePortId: 'false', targetNodeId: 'node_6', targetPortId: 'in', label: 'NO' }
    ]
  },
  {
    id: 'template_influencer_onboarding',
    name: 'Creator & Influencer Application Pipeline',
    description: 'Vets new creator profiles, assigns community tags, and dispatches customized onboarding media kits.',
    category: 'influencer',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA Relations',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 89,
    successRate: 98.8,
    variables: {
      media_kit_url: 'https://llc.jonanda.com/brand-assets',
      creator_portal: 'https://llc.jonanda.com/influencers/campaigns'
    },
    nodes: [
      {
        id: 'inf_node_1',
        type: 'trigger_influencer_applied',
        category: 'trigger',
        title: 'Creator Application Submitted',
        position: { x: 80, y: 180 },
        config: { minFollowers: 5000 },
        status: 'idle'
      },
      {
        id: 'inf_node_2',
        type: 'logic_filter',
        category: 'logic',
        title: 'Filter Niche (Web3 / AI)',
        position: { x: 400, y: 180 },
        config: { field: 'niche', operator: 'contains', value: 'Web3' },
        status: 'idle'
      },
      {
        id: 'inf_node_3',
        type: 'action_update_influencer',
        category: 'action',
        title: 'Approve & Categorize',
        position: { x: 720, y: 180 },
        config: { targetStatus: 'active', assignRoster: 'Web3 & AI Creators' },
        status: 'idle'
      },
      {
        id: 'inf_node_4',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Creator Media Kit',
        position: { x: 1040, y: 180 },
        config: {
          to: '{{email}}',
          subject: 'Welcome to JONANDA Creator Network | Media Kit & Opportunities',
          bodyText: 'Hello {{creatorName}},\n\nWelcome to the JONANDA Creator Network. You have been enrolled in our tier 1 campaign roster.'
        },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'inf_e1_2', sourceNodeId: 'inf_node_1', sourcePortId: 'out', targetNodeId: 'inf_node_2', targetPortId: 'in' },
      { id: 'inf_e2_3', sourceNodeId: 'inf_node_2', sourcePortId: 'passed', targetNodeId: 'inf_node_3', targetPortId: 'in' },
      { id: 'inf_e3_4', sourceNodeId: 'inf_node_3', sourcePortId: 'out', targetNodeId: 'inf_node_4', targetPortId: 'in' }
    ]
  },
  {
    id: 'template_campaign_invitation',
    name: 'Brand Campaign Invitation & Follow-Up',
    description: 'Dispatches targeted campaign invitations, waits for creator acceptance, and triggers brief delivery.',
    category: 'influencer',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA Campaign Operations',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 64,
    successRate: 96.5,
    variables: {},
    nodes: [
      {
        id: 'cmp_1',
        type: 'trigger_campaign_accepted',
        category: 'trigger',
        title: 'Campaign Invitation Accepted',
        position: { x: 80, y: 160 },
        config: {},
        status: 'idle'
      },
      {
        id: 'cmp_2',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Detailed Brief & Deliverables',
        position: { x: 420, y: 160 },
        config: {
          to: '{{email}}',
          subject: 'Campaign Brief & Guidelines: {{campaign_name}}',
          bodyText: 'Hi {{creatorName}},\n\nHere is your official campaign brief for {{campaign_name}}.'
        },
        status: 'idle'
      },
      {
        id: 'cmp_3',
        type: 'action_wait_delay',
        category: 'action',
        title: 'Wait 3 Days for Draft',
        position: { x: 760, y: 160 },
        config: { duration: 3, unit: 'days' },
        status: 'idle'
      },
      {
        id: 'cmp_4',
        type: 'action_send_email',
        category: 'action',
        title: 'Draft Submission Reminder',
        position: { x: 1080, y: 160 },
        config: {
          to: '{{email}}',
          subject: 'Reminder: Draft Content Due for {{campaign_name}}',
          bodyText: 'Friendly check-in regarding your upcoming content draft deadline.'
        },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'cmp_e1_2', sourceNodeId: 'cmp_1', sourcePortId: 'out', targetNodeId: 'cmp_2', targetPortId: 'in' },
      { id: 'cmp_e2_3', sourceNodeId: 'cmp_2', sourcePortId: 'out', targetNodeId: 'cmp_3', targetPortId: 'in' },
      { id: 'cmp_e3_4', sourceNodeId: 'cmp_3', sourcePortId: 'out', targetNodeId: 'cmp_4', targetPortId: 'in' }
    ]
  },
  {
    id: 'template_content_submission_approval',
    name: 'Content Submission & Brand Review',
    description: 'Handles creator draft uploads, triggers brand review alerts, and conditionally approves or requests revisions.',
    category: 'brand',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA QA Systems',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 52,
    successRate: 98.1,
    variables: {},
    nodes: [
      {
        id: 'rev_1',
        type: 'trigger_content_submitted',
        category: 'trigger',
        title: 'Content Draft Uploaded',
        position: { x: 80, y: 180 },
        config: {},
        status: 'idle'
      },
      {
        id: 'rev_2',
        type: 'action_internal_alert',
        category: 'action',
        title: 'Alert Brand Manager',
        position: { x: 400, y: 180 },
        config: { message: 'New content draft ready for review from {{creatorName}}' },
        status: 'idle'
      },
      {
        id: 'rev_3',
        type: 'logic_if_else',
        category: 'logic',
        title: 'Brand Approval Given?',
        position: { x: 720, y: 180 },
        config: { field: 'approval_status', operator: 'equals', value: 'approved' },
        status: 'idle'
      },
      {
        id: 'rev_4',
        type: 'action_send_email',
        category: 'action',
        title: 'Approval & Publishing Go-Ahead',
        position: { x: 1040, y: 100 },
        config: { subject: 'Content Approved: Ready for Publication' },
        status: 'idle'
      },
      {
        id: 'rev_5',
        type: 'action_send_email',
        category: 'action',
        title: 'Revision Request Notes',
        position: { x: 1040, y: 300 },
        config: { subject: 'Action Required: Content Revision Feedback' },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'rev_e1_2', sourceNodeId: 'rev_1', sourcePortId: 'out', targetNodeId: 'rev_2', targetPortId: 'in' },
      { id: 'rev_e2_3', sourceNodeId: 'rev_2', sourcePortId: 'out', targetNodeId: 'rev_3', targetPortId: 'in' },
      { id: 'rev_e3_4', sourceNodeId: 'rev_3', sourcePortId: 'true', targetNodeId: 'rev_4', targetPortId: 'in', label: 'APPROVED' },
      { id: 'rev_e3_5', sourceNodeId: 'rev_3', sourcePortId: 'false', targetNodeId: 'rev_5', targetPortId: 'in', label: 'REVISION' }
    ]
  },
  {
    id: 'template_customer_welcome',
    name: 'Customer Ecosystem Welcome Sequence',
    description: 'Welcomes new digital product users, verifies consent, and provides guided platform orientation.',
    category: 'customer',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA User Experience',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 310,
    successRate: 99.7,
    variables: {},
    nodes: [
      {
        id: 'cust_1',
        type: 'trigger_customer_registered',
        category: 'trigger',
        title: 'New Account Created',
        position: { x: 80, y: 160 },
        config: {},
        status: 'idle'
      },
      {
        id: 'cust_2',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Welcome & Setup Guide',
        position: { x: 420, y: 160 },
        config: {
          to: '{{email}}',
          subject: 'Welcome to JONANDA | Getting Started with Your Account',
          bodyText: 'Hello {{name}},\n\nWelcome to JONANDA. Here are the first 3 steps to configure your digital portal.'
        },
        status: 'idle'
      },
      {
        id: 'cust_3',
        type: 'action_wait_delay',
        category: 'action',
        title: 'Wait 24 Hours',
        position: { x: 760, y: 160 },
        config: { duration: 1, unit: 'days' },
        status: 'idle'
      },
      {
        id: 'cust_4',
        type: 'action_send_email',
        category: 'action',
        title: 'Send Feature Deep-Dive',
        position: { x: 1080, y: 160 },
        config: {
          to: '{{email}}',
          subject: 'Discover Advanced Tools on JONANDA',
          bodyText: 'Explore high-throughput automation and analytics modules.'
        },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'cust_e1_2', sourceNodeId: 'cust_1', sourcePortId: 'out', targetNodeId: 'cust_2', targetPortId: 'in' },
      { id: 'cust_e2_3', sourceNodeId: 'cust_2', sourcePortId: 'out', targetNodeId: 'cust_3', targetPortId: 'in' },
      { id: 'cust_e3_4', sourceNodeId: 'cust_3', sourcePortId: 'out', targetNodeId: 'cust_4', targetPortId: 'in' }
    ]
  },
  {
    id: 'template_product_update',
    name: 'JONANDA Ecosystem Release Broadcast',
    description: 'Schedules and broadcasts quarterly technology enhancements to opted-in enterprise subscribers.',
    category: 'ecosystem',
    status: 'active',
    version: 1,
    isTemplate: true,
    author: 'JONANDA Engineering Broadcast',
    createdAt: '2026-08-31',
    updatedAt: '2026-08-31',
    executionCount: 18,
    successRate: 100,
    variables: {},
    nodes: [
      {
        id: 'eco_1',
        type: 'trigger_schedule',
        category: 'trigger',
        title: 'Quarterly Release Date',
        position: { x: 80, y: 160 },
        config: { cron: '0 12 1 3,6,9,12 *' },
        status: 'idle'
      },
      {
        id: 'eco_2',
        type: 'action_send_email',
        category: 'action',
        title: 'Dispatch Major Release Notes',
        position: { x: 440, y: 160 },
        config: {
          subject: 'JONANDA Architecture Update & Feature Releases',
          bodyText: 'Review the latest engineering advancements across AI, Web3, and infrastructure.'
        },
        status: 'idle'
      }
    ],
    edges: [
      { id: 'eco_e1_2', sourceNodeId: 'eco_1', sourcePortId: 'out', targetNodeId: 'eco_2', targetPortId: 'in' }
    ]
  }
];
