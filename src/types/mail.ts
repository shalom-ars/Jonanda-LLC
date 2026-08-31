export interface EmailContact {
  id: string;
  email: string;
  name: string;
  company?: string;
  tags: string[];
  lists: string[];
  status: 'active' | 'unsubscribed' | 'bounced' | 'suppressed';
  source: 'Partner Form' | 'Influencer Intake' | 'Inquiry' | 'Manual' | 'Flow';
  createdAt: string;
  lastContactedAt?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: 'Partner' | 'Influencer' | 'Onboarding' | 'Campaign' | 'Security';
  subject: string;
  previewText?: string;
  bodyHtml: string;
  variables: string[];
  updatedAt: string;
}

export interface EmailCampaign {
  id: string;
  title: string;
  subject: string;
  targetList: string;
  status: 'draft' | 'scheduled' | 'sending' | 'sent';
  sentCount: number;
  openRate: number;
  clickRate: number;
  scheduledFor?: string;
  sentAt?: string;
}

export interface MailMessage {
  id: string;
  from: string;
  to: string;
  subject: string;
  date: string;
  snippet: string;
  body: string;
  isRead: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'archive' | 'spam';
  tags?: string[];
  avatarColor?: string;
}
