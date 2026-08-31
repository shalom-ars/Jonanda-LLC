export type Role = 'Super Admin' | 'Organization Admin' | 'Member' | 'Viewer';

export type ProjectStatus = 'Live' | 'Active' | 'Coming Soon' | 'R&D';

export interface EcosystemProject {
  id: string;
  name: string;
  slug: string;
  category: string;
  status: ProjectStatus;
  domain?: string;
  hasLiveDomain: boolean;
  brandColor: string;
  description: string;
  emailIdentities: string[];
  mailboxesCount: number;
  campaignsCount: number;
  dnsConfigured: boolean;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: 'Free Trial' | 'Business' | 'Enterprise';
  status: 'active' | 'suspended';
  createdAt: string;
  allowedDomains: number;
  allowedMailboxes: number;
  allowedCampaigns: number;
}

export interface User {
  id: string;
  orgId: string;
  email: string;
  name: string;
  role: Role;
  status: 'active' | 'invited' | 'disabled';
  avatar?: string;
  is2faEnabled: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export type DnsRecordStatus = 'not_configured' | 'pending' | 'verified' | 'error';

export interface DnsRecord {
  type: 'TXT' | 'MX' | 'CNAME';
  host: string;
  value: string;
  priority?: number;
  status: DnsRecordStatus;
  errorDetail?: string;
}

export interface Domain {
  id: string;
  orgId: string;
  projectId: string;
  domainName: string;
  status: 'not_configured' | 'pending' | 'verified' | 'error';
  spfStatus: DnsRecordStatus;
  dkimStatus: DnsRecordStatus;
  dmarcStatus: DnsRecordStatus;
  mxStatus: DnsRecordStatus;
  dkimSelector: string;
  records: {
    spf: DnsRecord;
    dkim: DnsRecord;
    dmarc: DnsRecord;
    mx: DnsRecord;
  };
  verifiedAt?: string;
  lastCheckedAt: string;
}

export interface Mailbox {
  id: string;
  orgId: string;
  projectId: string;
  domainId: string;
  email: string;
  displayName: string;
  quotaBytes: number;
  usedBytes: number;
  status: 'active' | 'disabled' | 'suspended';
  sendingEnabled: boolean;
  assignedUsers: string[];
  forwardingAddress?: string;
  signature?: string;
  createdAt: string;
}

export interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export type EmailFolder = 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash' | 'archive';

export interface EmailMessage {
  id: string;
  threadId: string;
  orgId: string;
  projectId: string;
  mailboxId: string;
  from: { name: string; email: string };
  to: { name: string; email: string }[];
  cc?: { name: string; email: string }[];
  bcc?: { name: string; email: string }[];
  subject: string;
  snippet: string;
  bodyHtml: string;
  bodyText: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  isDraft: boolean;
  isSpam: boolean;
  isTrash: boolean;
  isArchive: boolean;
  folder: EmailFolder;
  labels: string[];
  attachments: EmailAttachment[];
  messageIdHeader: string;
  inReplyTo?: string;
}

export interface EmailThread {
  id: string;
  orgId: string;
  projectId: string;
  mailboxId: string;
  subject: string;
  snippet: string;
  lastMessageAt: string;
  messageCount: number;
  unreadCount: number;
  isStarred: boolean;
  isRead: boolean;
  folder: EmailFolder;
  labels: string[];
  participants: { name: string; email: string }[];
  messages: EmailMessage[];
}

export interface Contact {
  id: string;
  orgId: string;
  projectId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  tags: string[];
  groups: string[];
  status: 'subscribed' | 'unsubscribed' | 'bounced';
  engagementScore: number;
  lastEmailedAt?: string;
  createdAt: string;
}

export interface ContactGroup {
  id: string;
  orgId: string;
  name: string;
  description: string;
  contactCount: number;
  createdAt: string;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
  complaints: number;
}

export interface Campaign {
  id: string;
  orgId: string;
  projectId: string;
  mailboxId: string;
  name: string;
  subject: string;
  previewText: string;
  fromName: string;
  fromEmail: string;
  templateId?: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  scheduledAt?: string;
  sentAt?: string;
  targetAudience: {
    type: 'all' | 'groups' | 'tags' | 'segment';
    groupNames?: string[];
    tags?: string[];
  };
  totalRecipients: number;
  stats: CampaignStats;
  htmlContent: string;
  createdAt: string;
}

export type TemplateCategory = 'welcome' | 'newsletter' | 'announcement' | 'product_update' | 'security_alert' | 'transactional';

export interface TemplateBlock {
  id: string;
  type: 'heading' | 'text' | 'button' | 'image' | 'divider' | 'footer' | 'unsubscribe' | 'spacer' | 'social';
  content: {
    text?: string;
    level?: 'h1' | 'h2' | 'h3';
    url?: string;
    imageUrl?: string;
    altText?: string;
    buttonText?: string;
    buttonColor?: string;
    align?: 'left' | 'center' | 'right';
    height?: number;
  };
}

export interface EmailTemplate {
  id: string;
  orgId: string;
  projectId: string;
  name: string;
  category: TemplateCategory;
  subject: string;
  previewText?: string;
  htmlContent: string;
  jsonBlocks: TemplateBlock[];
  thumbnail?: string;
  updatedAt: string;
  isSystem?: boolean;
}

export interface AutomationStep {
  id: string;
  type: 'send_email' | 'delay' | 'condition' | 'add_tag' | 'remove_tag';
  title: string;
  config: {
    templateId?: string;
    subject?: string;
    delayHours?: number;
    tag?: string;
    conditionField?: string;
    conditionValue?: string;
  };
}

export interface Automation {
  id: string;
  orgId: string;
  projectId: string;
  name: string;
  description: string;
  triggerType: 'contact_added' | 'tag_added' | 'campaign_opened' | 'date_based' | 'security_alert';
  triggerLabel: string;
  steps: AutomationStep[];
  status: 'active' | 'paused' | 'draft';
  enrolledCount: number;
  completedCount: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  orgId: string;
  userId: string;
  userName: string;
  action: string;
  entityType: 'AUTH' | 'MAILBOX' | 'CAMPAIGN' | 'DOMAIN' | 'TEMPLATE' | 'CONTACT' | 'SECURITY' | 'ORGANIZATION';
  entityId: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface SuppressionEntry {
  id: string;
  orgId: string;
  email: string;
  reason: 'unsubscribe' | 'hard_bounce' | 'complaint' | 'manual';
  createdAt: string;
}

export interface SystemHealth {
  status: 'operational' | 'degraded' | 'maintenance';
  uptimePercentage: number;
  apiLatencyMs: number;
  smtpRelayStatus: 'connected' | 'idle' | 'warning';
  dnsResolverStatus: 'healthy' | 'slow';
  queuedJobs: number;
  activeWorkers: number;
  storageUsageMb: number;
}
