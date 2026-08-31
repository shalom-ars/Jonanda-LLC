import {
  EcosystemProject,
  Domain,
  Mailbox,
  EmailThread,
  EmailMessage,
  Contact,
  ContactGroup,
  Campaign,
  EmailTemplate,
  Automation,
  AuditLog,
  User,
  Organization,
  SystemHealth,
  SuppressionEntry,
  DnsRecordStatus
} from '../types';
import {
  INITIAL_ORGANIZATION,
  INITIAL_USER,
  ECOSYSTEM_PROJECTS,
  INITIAL_DOMAINS,
  INITIAL_MAILBOXES,
  INITIAL_THREADS,
  INITIAL_CONTACT_GROUPS,
  INITIAL_CONTACTS,
  INITIAL_TEMPLATES,
  INITIAL_CAMPAIGNS,
  INITIAL_AUTOMATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_SYSTEM_HEALTH
} from '../data/initialData';

const KEYS = {
  ORG: 'jonanda_mail_org',
  USER: 'jonanda_mail_user',
  PROJECTS: 'jonanda_mail_projects',
  DOMAINS: 'jonanda_mail_domains',
  MAILBOXES: 'jonanda_mail_mailboxes',
  THREADS: 'jonanda_mail_threads',
  CONTACTS: 'jonanda_mail_contacts',
  CONTACT_GROUPS: 'jonanda_mail_contact_groups',
  CAMPAIGNS: 'jonanda_mail_campaigns',
  TEMPLATES: 'jonanda_mail_templates',
  AUTOMATIONS: 'jonanda_mail_automations',
  AUDIT_LOGS: 'jonanda_mail_audit_logs',
  SUPPRESSIONS: 'jonanda_mail_suppressions',
  SYSTEM_HEALTH: 'jonanda_mail_system_health',
  AUTH_TOKEN: 'jonanda_mail_token',
};

export class StorageService {
  private static getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to write ${key} to storage`, e);
    }
  }

  // Organization & User
  static getOrganization(): Organization {
    return this.getItem(KEYS.ORG, INITIAL_ORGANIZATION);
  }

  static getUser(): User | null {
    return this.getItem(KEYS.USER, INITIAL_USER);
  }

  static setUser(user: User | null): void {
    if (user) {
      this.setItem(KEYS.USER, user);
    } else {
      localStorage.removeItem(KEYS.USER);
    }
  }

  static getAuthToken(): string | null {
    return localStorage.getItem(KEYS.AUTH_TOKEN);
  }

  static setAuthToken(token: string | null): void {
    if (token) {
      localStorage.setItem(KEYS.AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(KEYS.AUTH_TOKEN);
    }
  }

  // Projects
  static getProjects(): EcosystemProject[] {
    return this.getItem(KEYS.PROJECTS, ECOSYSTEM_PROJECTS);
  }

  static saveProjects(projects: EcosystemProject[]): void {
    this.setItem(KEYS.PROJECTS, projects);
  }

  static getProjectById(id: string): EcosystemProject | undefined {
    return this.getProjects().find(p => p.id === id);
  }

  // Domains
  static getDomains(): Domain[] {
    return this.getItem(KEYS.DOMAINS, INITIAL_DOMAINS);
  }

  static saveDomains(domains: Domain[]): void {
    this.setItem(KEYS.DOMAINS, domains);
  }

  static addDomain(domain: Domain): void {
    const domains = this.getDomains();
    domains.unshift(domain);
    this.saveDomains(domains);
    this.logAction('DOMAIN_CREATED', 'DOMAIN', domain.id, `Added domain ${domain.domainName}`);
  }

  static updateDomainStatus(domainId: string, status: 'not_configured' | 'pending' | 'verified' | 'error', recordsStatus?: { spf: DnsRecordStatus; dkim: DnsRecordStatus; dmarc: DnsRecordStatus; mx: DnsRecordStatus }): void {
    const domains = this.getDomains().map(d => {
      if (d.id === domainId) {
        return {
          ...d,
          status,
          spfStatus: recordsStatus?.spf ?? d.spfStatus,
          dkimStatus: recordsStatus?.dkim ?? d.dkimStatus,
          dmarcStatus: recordsStatus?.dmarc ?? d.dmarcStatus,
          mxStatus: recordsStatus?.mx ?? d.mxStatus,
          records: {
            spf: { ...d.records.spf, status: recordsStatus?.spf ?? d.records.spf.status },
            dkim: { ...d.records.dkim, status: recordsStatus?.dkim ?? d.records.dkim.status },
            dmarc: { ...d.records.dmarc, status: recordsStatus?.dmarc ?? d.records.dmarc.status },
            mx: { ...d.records.mx, status: recordsStatus?.mx ?? d.records.mx.status },
          },
          verifiedAt: status === 'verified' ? new Date().toISOString() : d.verifiedAt,
          lastCheckedAt: new Date().toISOString()
        };
      }
      return d;
    });
    this.saveDomains(domains);
    this.logAction('DOMAIN_VERIFIED', 'DOMAIN', domainId, `Verification status updated to ${status}`);
  }

  static deleteDomain(domainId: string): void {
    const domains = this.getDomains().filter(d => d.id !== domainId);
    this.saveDomains(domains);
    this.logAction('DOMAIN_DELETED', 'DOMAIN', domainId, `Removed domain from ecosystem`);
  }

  // Mailboxes
  static getMailboxes(): Mailbox[] {
    return this.getItem(KEYS.MAILBOXES, INITIAL_MAILBOXES);
  }

  static saveMailboxes(mailboxes: Mailbox[]): void {
    this.setItem(KEYS.MAILBOXES, mailboxes);
  }

  static addMailbox(mailbox: Mailbox): void {
    const mailboxes = this.getMailboxes();
    mailboxes.unshift(mailbox);
    this.saveMailboxes(mailboxes);
    this.logAction('MAILBOX_CREATED', 'MAILBOX', mailbox.id, `Created mailbox ${mailbox.email}`);
  }

  static deleteMailbox(mailboxId: string): void {
    const mailboxes = this.getMailboxes().filter(m => m.id !== mailboxId);
    this.saveMailboxes(mailboxes);
    this.logAction('MAILBOX_DELETED', 'MAILBOX', mailboxId, `Deleted mailbox`);
  }

  // Threads & Messages
  static getThreads(): EmailThread[] {
    return this.getItem(KEYS.THREADS, INITIAL_THREADS);
  }

  static saveThreads(threads: EmailThread[]): void {
    this.setItem(KEYS.THREADS, threads);
  }

  static getThreadById(id: string): EmailThread | undefined {
    return this.getThreads().find(t => t.id === id);
  }

  static updateThread(updatedThread: EmailThread): void {
    const threads = this.getThreads().map(t => t.id === updatedThread.id ? updatedThread : t);
    this.saveThreads(threads);
  }

  static addMessageToThread(threadId: string, message: EmailMessage): EmailThread {
    const threads = this.getThreads();
    let thread = threads.find(t => t.id === threadId);
    
    if (thread) {
      thread.messages.push(message);
      thread.snippet = message.snippet || message.subject;
      thread.lastMessageAt = message.date;
      thread.messageCount = thread.messages.length;
      if (!thread.participants.some(p => p.email === message.from.email)) {
        thread.participants.push(message.from);
      }
      this.saveThreads(threads);
    } else {
      thread = {
        id: threadId,
        orgId: message.orgId,
        projectId: message.projectId,
        mailboxId: message.mailboxId,
        subject: message.subject,
        snippet: message.snippet,
        lastMessageAt: message.date,
        messageCount: 1,
        unreadCount: 0,
        isStarred: false,
        isRead: true,
        folder: message.folder,
        labels: message.labels,
        participants: [message.from, ...message.to],
        messages: [message]
      };
      threads.unshift(thread);
      this.saveThreads(threads);
    }
    return thread;
  }

  static deleteThread(threadId: string, permanent: boolean = false): void {
    if (permanent) {
      const threads = this.getThreads().filter(t => t.id !== threadId);
      this.saveThreads(threads);
    } else {
      const threads = this.getThreads().map(t => {
        if (t.id === threadId) {
          return { ...t, folder: 'trash' as const };
        }
        return t;
      });
      this.saveThreads(threads);
    }
  }

  // Contacts & Groups
  static getContacts(): Contact[] {
    return this.getItem(KEYS.CONTACTS, INITIAL_CONTACTS);
  }

  static saveContacts(contacts: Contact[]): void {
    this.setItem(KEYS.CONTACTS, contacts);
  }

  static addContact(contact: Contact): void {
    const contacts = this.getContacts();
    // Deduplicate by email
    const existingIndex = contacts.findIndex(c => c.email.toLowerCase() === contact.email.toLowerCase());
    if (existingIndex >= 0) {
      contacts[existingIndex] = { ...contacts[existingIndex], ...contact };
    } else {
      contacts.unshift(contact);
    }
    this.saveContacts(contacts);
    this.logAction('CONTACT_SAVED', 'CONTACT', contact.id, `Saved contact ${contact.email}`);
  }

  static deleteContact(contactId: string): void {
    const contacts = this.getContacts().filter(c => c.id !== contactId);
    this.saveContacts(contacts);
  }

  static getContactGroups(): ContactGroup[] {
    return this.getItem(KEYS.CONTACT_GROUPS, INITIAL_CONTACT_GROUPS);
  }

  static saveContactGroups(groups: ContactGroup[]): void {
    this.setItem(KEYS.CONTACT_GROUPS, groups);
  }

  // Templates
  static getTemplates(): EmailTemplate[] {
    return this.getItem(KEYS.TEMPLATES, INITIAL_TEMPLATES);
  }

  static saveTemplates(templates: EmailTemplate[]): void {
    this.setItem(KEYS.TEMPLATES, templates);
  }

  static saveTemplate(template: EmailTemplate): void {
    const templates = this.getTemplates();
    const index = templates.findIndex(t => t.id === template.id);
    if (index >= 0) {
      templates[index] = template;
    } else {
      templates.unshift(template);
    }
    this.saveTemplates(templates);
    this.logAction('TEMPLATE_SAVED', 'TEMPLATE', template.id, `Saved template ${template.name}`);
  }

  static deleteTemplate(templateId: string): void {
    const templates = this.getTemplates().filter(t => t.id !== templateId);
    this.saveTemplates(templates);
  }

  // Campaigns
  static getCampaigns(): Campaign[] {
    return this.getItem(KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  }

  static saveCampaigns(campaigns: Campaign[]): void {
    this.setItem(KEYS.CAMPAIGNS, campaigns);
  }

  static saveCampaign(campaign: Campaign): void {
    const campaigns = this.getCampaigns();
    const index = campaigns.findIndex(c => c.id === campaign.id);
    if (index >= 0) {
      campaigns[index] = campaign;
    } else {
      campaigns.unshift(campaign);
    }
    this.saveCampaigns(campaigns);
    this.logAction('CAMPAIGN_SAVED', 'CAMPAIGN', campaign.id, `Saved campaign ${campaign.name}`);
  }

  // Automations
  static getAutomations(): Automation[] {
    return this.getItem(KEYS.AUTOMATIONS, INITIAL_AUTOMATIONS);
  }

  static saveAutomations(automations: Automation[]): void {
    this.setItem(KEYS.AUTOMATIONS, automations);
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    return this.getItem(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  static logAction(action: string, entityType: AuditLog['entityType'], entityId: string, details: string): void {
    const logs = this.getAuditLogs();
    const user = this.getUser();
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      orgId: user?.orgId || 'org_jonanda_master',
      userId: user?.id || 'usr_sys',
      userName: user?.name || 'System Operator',
      action,
      entityType,
      entityId,
      details,
      ipAddress: '198.51.100.24',
      timestamp: new Date().toISOString()
    };
    logs.unshift(newLog);
    this.setItem(KEYS.AUDIT_LOGS, logs.slice(0, 100)); // retain last 100 logs
  }

  // Suppression list
  static getSuppressions(): SuppressionEntry[] {
    return this.getItem(KEYS.SUPPRESSIONS, [
      { id: 'sup_1', orgId: 'org_jonanda_master', email: 'optout-test@example.com', reason: 'unsubscribe', createdAt: '2026-08-10T12:00:00Z' }
    ]);
  }

  static addSuppression(email: string, reason: SuppressionEntry['reason']): void {
    const list = this.getSuppressions();
    if (!list.some(s => s.email.toLowerCase() === email.toLowerCase())) {
      list.unshift({
        id: `sup_${Date.now()}`,
        orgId: 'org_jonanda_master',
        email: email.toLowerCase(),
        reason,
        createdAt: new Date().toISOString()
      });
      this.setItem(KEYS.SUPPRESSIONS, list);
    }
  }

  // System Health
  static getSystemHealth(): SystemHealth {
    return this.getItem(KEYS.SYSTEM_HEALTH, INITIAL_SYSTEM_HEALTH);
  }

  // Reset demo state
  static resetToDefaults(): void {
    Object.values(KEYS).forEach(key => localStorage.removeItem(key));
  }
}
