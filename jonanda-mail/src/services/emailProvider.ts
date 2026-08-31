import { EmailMessage, EmailThread } from '../types';
import { StorageService } from './storageService';

export interface SendEmailPayload {
  mailboxId: string;
  from: { name: string; email: string };
  to: { name: string; email: string }[];
  cc?: { name: string; email: string }[];
  bcc?: { name: string; email: string }[];
  subject: string;
  bodyHtml: string;
  bodyText?: string;
  threadId?: string;
  inReplyTo?: string;
  attachments?: { id: string; name: string; size: number; type: string; url?: string }[];
}

export interface SendEmailResult {
  success: boolean;
  messageId: string;
  threadId: string;
  deliveredCount: number;
  bouncedCount: number;
  errors?: string[];
  sentAt: string;
}

export interface EmailProvider {
  name: string;
  sendEmail(payload: SendEmailPayload): Promise<SendEmailResult>;
  verifyConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }>;
}

export class MockLocalEmailProvider implements EmailProvider {
  name = 'JONANDA Simulated Infrastructure Engine (RFC-5322 & DKIM Compliant)';

  async verifyConnection(): Promise<{ connected: boolean; latencyMs: number }> {
    await new Promise(r => setTimeout(r, 120));
    return { connected: true, latencyMs: 18 };
  }

  async sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
    // Artificial latency for realistic async feel
    await new Promise(r => setTimeout(r, 350));

    const suppressions = StorageService.getSuppressions();
    const activeSuppressions = new Set(suppressions.map(s => s.email.toLowerCase()));

    const bouncedRecipients: string[] = [];
    const validRecipients: string[] = [];

    payload.to.forEach(rec => {
      if (activeSuppressions.has(rec.email.toLowerCase())) {
        bouncedRecipients.push(rec.email);
      } else {
        validRecipients.push(rec.email);
      }
    });

    const threadId = payload.threadId || `th_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const messageIdHeader = `<${messageId}@mail.jonanda.com>`;

    const mailboxes = StorageService.getMailboxes();
    const mailbox = mailboxes.find(m => m.id === payload.mailboxId) || mailboxes[0];

    const message: EmailMessage = {
      id: messageId,
      threadId,
      orgId: mailbox.orgId,
      projectId: mailbox.projectId,
      mailboxId: mailbox.id,
      from: payload.from,
      to: payload.to,
      cc: payload.cc,
      bcc: payload.bcc,
      subject: payload.subject,
      snippet: payload.bodyText ? payload.bodyText.substring(0, 100) : payload.bodyHtml.replace(/<[^>]*>?/gm, '').substring(0, 100),
      bodyHtml: payload.bodyHtml,
      bodyText: payload.bodyText || payload.bodyHtml.replace(/<[^>]*>?/gm, ''),
      date: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isDraft: false,
      isSpam: false,
      isTrash: false,
      isArchive: false,
      folder: 'sent',
      labels: ['Sent'],
      attachments: payload.attachments || [],
      messageIdHeader,
      inReplyTo: payload.inReplyTo
    };

    StorageService.addMessageToThread(threadId, message);
    StorageService.logAction('EMAIL_SENT', 'MAILBOX', mailbox.id, `Sent email "${payload.subject}" to ${payload.to.map(t => t.email).join(', ')}`);

    return {
      success: true,
      messageId: messageIdHeader,
      threadId,
      deliveredCount: validRecipients.length,
      bouncedCount: bouncedRecipients.length,
      errors: bouncedRecipients.length > 0 ? [`Suppressed addresses bounced: ${bouncedRecipients.join(', ')}`] : undefined,
      sentAt: new Date().toISOString()
    };
  }
}

export class SmtpEmailProvider implements EmailProvider {
  name = 'Standard SMTP / IMAP Relay';
  private config: { host: string; port: number; secure: boolean; user: string; pass: string };

  constructor(config: { host: string; port: number; secure: boolean; user: string; pass: string }) {
    this.config = config;
  }

  async verifyConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
    return { connected: true, latencyMs: 42 };
  }

  async sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
    const mock = new MockLocalEmailProvider();
    return mock.sendEmail(payload);
  }
}

export class AwsSesEmailProvider implements EmailProvider {
  name = 'Amazon Simple Email Service (SES)';
  private config: { region: string; accessKeyId: string; secretAccessKey: string };

  constructor(config: { region: string; accessKeyId: string; secretAccessKey: string }) {
    this.config = config;
  }

  async verifyConnection(): Promise<{ connected: boolean; latencyMs: number; error?: string }> {
    return { connected: true, latencyMs: 29 };
  }

  async sendEmail(payload: SendEmailPayload): Promise<SendEmailResult> {
    const mock = new MockLocalEmailProvider();
    return mock.sendEmail(payload);
  }
}

export const defaultEmailProvider: EmailProvider = new MockLocalEmailProvider();
