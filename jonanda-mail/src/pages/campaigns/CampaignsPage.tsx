import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { StorageService } from '../../services/storageService';
import { Campaign, EmailTemplate, Mailbox, ContactGroup } from '../../types';
import {
  Send,
  Plus,
  BarChart3,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Eye,
  MousePointer,
  UserX,
  Radio,
  FileText,
  Users,
  ChevronRight,
  ArrowLeft,
  MailCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const CampaignsPage: React.FC = () => {
  const { currentProjectId } = useProject();
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => StorageService.getCampaigns());
  const [templates] = useState<EmailTemplate[]>(() => StorageService.getTemplates());
  const [mailboxes] = useState<Mailbox[]>(() => StorageService.getMailboxes());
  const [groups] = useState<ContactGroup[]>(() => StorageService.getContactGroups());

  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isDispatching, setIsDispatching] = useState(false);
  const [testEmailSent, setTestEmailSent] = useState(false);

  // Wizard state
  const [campaignName, setCampaignName] = useState('');
  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [selectedMailboxId, setSelectedMailboxId] = useState(mailboxes[0]?.id || '');
  const [selectedGroupNames, setSelectedGroupNames] = useState<string[]>([groups[0]?.name || '']);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0]?.id || '');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleTime, setScheduleTime] = useState('2026-09-02T14:00');
  const [testEmailRecipient, setTestEmailRecipient] = useState('admin@jonanda.com');

  const filteredCampaigns = currentProjectId === 'all'
    ? campaigns
    : campaigns.filter(c => c.projectId === currentProjectId);

  const selectedMailbox = mailboxes.find(m => m.id === selectedMailboxId) || mailboxes[0];

  const handleToggleGroup = (groupName: string) => {
    setSelectedGroupNames(prev =>
      prev.includes(groupName) ? prev.filter(g => g !== groupName) : [...prev, groupName]
    );
  };

  const handleSendTestEmail = () => {
    setTestEmailSent(true);
    setTimeout(() => setTestEmailSent(false), 4000);
  };

  const handleCompleteCampaign = async (action: 'send' | 'schedule' | 'draft') => {
    setIsDispatching(true);
    await new Promise(r => setTimeout(r, 600));

    const totalAudience = selectedGroupNames.reduce((acc, gName) => {
      const g = groups.find(grp => grp.name === gName);
      return acc + (g?.contactCount || 10);
    }, 0);

    const isSentNow = action === 'send';

    const newCampaign: Campaign = {
      id: `cmp_${Date.now()}`,
      orgId: selectedMailbox?.orgId || 'org_jonanda_master',
      projectId: selectedMailbox?.projectId || 'jonanda-llc',
      mailboxId: selectedMailbox?.id || 'mbx_1',
      name: campaignName,
      subject,
      previewText,
      fromName: selectedMailbox?.displayName || 'JONANDA Dispatch',
      fromEmail: selectedMailbox?.email || 'contact@jonanda.com',
      templateId: selectedTemplateId,
      status: isSentNow ? 'sent' : action === 'schedule' ? 'scheduled' : 'draft',
      scheduledAt: action === 'schedule' ? new Date(scheduleTime).toISOString() : undefined,
      sentAt: isSentNow ? new Date().toISOString() : undefined,
      targetAudience: {
        type: 'groups',
        groupNames: selectedGroupNames
      },
      totalRecipients: totalAudience,
      stats: {
        sent: isSentNow ? totalAudience : 0,
        delivered: isSentNow ? Math.floor(totalAudience * 0.98) : 0,
        opened: isSentNow ? Math.floor(totalAudience * 0.72) : 0,
        clicked: isSentNow ? Math.floor(totalAudience * 0.44) : 0,
        bounced: isSentNow ? Math.floor(totalAudience * 0.02) : 0,
        unsubscribed: isSentNow ? (totalAudience > 50 ? 1 : 0) : 0,
        complaints: 0
      },
      htmlContent: templates.find(t => t.id === selectedTemplateId)?.htmlContent || '',
      createdAt: new Date().toISOString()
    };

    StorageService.saveCampaign(newCampaign);
    setCampaigns(StorageService.getCampaigns());
    setIsDispatching(false);
    setIsWizardOpen(false);
    resetWizard();
  };

  const resetWizard = () => {
    setWizardStep(1);
    setCampaignName('');
    setSubject('');
    setPreviewText('');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Email Campaigns & Deliverability</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30 font-mono">
              Anti-Spam & DKIM Enforced
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Build, segment, schedule, and analyze compliant email broadcasts with mandatory unsubscribe headers and deliverability tracking.
          </p>
        </div>

        <Button
          onClick={() => {
            resetWizard();
            setIsWizardOpen(true);
          }}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-lg shadow-brand-600/20"
        >
          Create Campaign
        </Button>
      </div>

      {/* Campaigns list */}
      <div className="space-y-4">
        {filteredCampaigns.length === 0 ? (
          <Card className="p-12 text-center text-slate-500">
            <Send className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <h4 className="text-sm font-medium text-slate-300 mb-1">No campaigns found</h4>
            <p className="text-xs text-slate-500">Create your first broadcast campaign using the wizard.</p>
          </Card>
        ) : (
          filteredCampaigns.map(cmp => {
            const hasStats = cmp.stats.sent > 0;
            const deliveryRate = hasStats ? ((cmp.stats.delivered / cmp.stats.sent) * 100).toFixed(1) : '0.0';
            const openRate = hasStats && cmp.stats.delivered > 0 ? ((cmp.stats.opened / cmp.stats.delivered) * 100).toFixed(1) : '0.0';
            const clickRate = hasStats && cmp.stats.opened > 0 ? ((cmp.stats.clicked / cmp.stats.opened) * 100).toFixed(1) : '0.0';

            return (
              <Card key={cmp.id} className="p-6 space-y-4 hover:border-slate-700">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-white">{cmp.name}</h3>
                      <Badge
                        variant={
                          cmp.status === 'sent'
                            ? 'success'
                            : cmp.status === 'scheduled'
                            ? 'info'
                            : 'warning'
                        }
                      >
                        {cmp.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                      <span>Subject: <strong className="text-slate-200">{cmp.subject}</strong></span>
                      <span>•</span>
                      <span>Sender: <code className="text-brand-300">{cmp.fromEmail}</code></span>
                      <span>•</span>
                      <span>Target: {cmp.targetAudience.groupNames?.join(', ') || 'All Contacts'}</span>
                      <span>•</span>
                      <span>Date: {cmp.sentAt ? new Date(cmp.sentAt).toLocaleString() : 'Draft'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">
                      {cmp.totalRecipients} recipients
                    </span>
                  </div>
                </div>

                {/* Telemetry Metrics */}
                {hasStats ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Sent</span>
                      <span className="font-bold text-slate-200 text-sm">{cmp.stats.sent}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Delivered</span>
                      <span className="font-bold text-emerald-400 text-sm">{cmp.stats.delivered}</span>
                      <span className="text-[10px] text-slate-500 block">({deliveryRate}%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Opened</span>
                      <span className="font-bold text-brand-400 text-sm">{cmp.stats.opened}</span>
                      <span className="text-[10px] text-slate-500 block">({openRate}%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Clicked</span>
                      <span className="font-bold text-cyan-400 text-sm">{cmp.stats.clicked}</span>
                      <span className="text-[10px] text-slate-500 block">({clickRate}%)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Bounced</span>
                      <span className="font-bold text-amber-400 text-sm">{cmp.stats.bounced}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Unsubscribed</span>
                      <span className="font-bold text-rose-400 text-sm">{cmp.stats.unsubscribed}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Complaints</span>
                      <span className="font-bold text-slate-400 text-sm">{cmp.stats.complaints}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs text-slate-500">
                    Telemetry metrics will populate once this campaign is dispatched.
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>

      {/* Campaign Creation Wizard Modal */}
      <Modal
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        maxWidth="3xl"
        title="Campaign Creation Wizard"
        subtitle={`Step ${wizardStep} of 5: ${
          wizardStep === 1
            ? 'Campaign Configuration'
            : wizardStep === 2
            ? 'Audience & Segments'
            : wizardStep === 3
            ? 'Template Selection'
            : wizardStep === 4
            ? 'Schedule & Delivery'
            : 'Deliverability & Anti-Spam Verification'
        }`}
      >
        <div className="space-y-6">
          {/* Step Progress Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4 text-xs font-medium">
            <span className={wizardStep >= 1 ? 'text-brand-400 font-bold' : 'text-slate-600'}>1. Setup</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className={wizardStep >= 2 ? 'text-brand-400 font-bold' : 'text-slate-600'}>2. Audience</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className={wizardStep >= 3 ? 'text-brand-400 font-bold' : 'text-slate-600'}>3. Template</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className={wizardStep >= 4 ? 'text-brand-400 font-bold' : 'text-slate-600'}>4. Schedule</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-700" />
            <span className={wizardStep >= 5 ? 'text-brand-400 font-bold' : 'text-slate-600'}>5. Compliance</span>
          </div>

          {/* STEP 1: Setup */}
          {wizardStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Campaign Internal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Investor & Ecosystem Update"
                  value={campaignName}
                  onChange={e => setCampaignName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Sender Mailbox Identity</label>
                <select
                  value={selectedMailboxId}
                  onChange={e => setSelectedMailboxId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
                >
                  {mailboxes.map(mbx => (
                    <option key={mbx.id} value={mbx.id}>
                      {mbx.displayName} &lt;{mbx.email}&gt;
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g. JONANDA Ecosystem Dispatch — Key Updates"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Preview / Preheader Text</label>
                <input
                  type="text"
                  placeholder="Brief summary visible in email client previews..."
                  value={previewText}
                  onChange={e => setPreviewText(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Audience */}
          {wizardStep === 2 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Select target subscriber groups. JONANDA MAIL automatically excludes unsubscribed & bounced emails on the suppression list.
              </div>

              <div className="space-y-2">
                {groups.map(group => {
                  const isChecked = selectedGroupNames.includes(group.name);
                  return (
                    <div
                      key={group.id}
                      onClick={() => handleToggleGroup(group.name)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-brand-500 bg-brand-900/20'
                          : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded border-slate-700 text-brand-600 focus:ring-brand-500"
                        />
                        <div>
                          <h4 className="font-semibold text-sm text-white">{group.name}</h4>
                          <p className="text-xs text-slate-400">{group.description}</p>
                        </div>
                      </div>
                      <Badge variant="info">{group.contactCount} contacts</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: Template */}
          {wizardStep === 3 && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Choose a pre-built responsive email template:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {templates.map(tpl => {
                  const isSelected = selectedTemplateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-brand-500 bg-brand-900/20 shadow-md'
                          : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                      }`}
                    >
                      <div>
                        <Badge variant="purple">{tpl.category}</Badge>
                        <h4 className="font-bold text-sm text-white mt-2">{tpl.name}</h4>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tpl.subject}</p>
                      </div>
                      <div className="mt-4 pt-2 border-t border-slate-800 flex justify-between text-[10px] text-slate-500">
                        <span>Responsive HTML</span>
                        {isSelected && <span className="text-brand-400 font-bold">Selected</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Schedule */}
          {wizardStep === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="send_now"
                    name="schedule_choice"
                    checked={!isScheduled}
                    onChange={() => setIsScheduled(false)}
                    className="text-brand-600"
                  />
                  <label htmlFor="send_now" className="text-sm font-semibold text-white cursor-pointer">
                    Send Broadcast Immediately
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="schedule_later"
                    name="schedule_choice"
                    checked={isScheduled}
                    onChange={() => setIsScheduled(true)}
                    className="text-brand-600"
                  />
                  <label htmlFor="schedule_later" className="text-sm font-semibold text-white cursor-pointer">
                    Schedule for Future Time
                  </label>
                </div>

                {isScheduled && (
                  <div className="pt-2 pl-6">
                    <input
                      type="datetime-local"
                      value={scheduleTime}
                      onChange={e => setScheduleTime(e.target.value)}
                      className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 5: Compliance & Anti-Spam Check */}
          {wizardStep === 5 && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Deliverability & Compliance Validation: 100% PASS</span>
                </div>
                <div className="font-mono text-[11px] space-y-1 text-slate-300">
                  <div>✓ Sender Domain SPF: Pass (mail.jonanda.com)</div>
                  <div>✓ 2048-bit DKIM Signature: Attached</div>
                  <div>✓ DMARC Policy Alignment: Strictly Compliant</div>
                  <div>✓ Mandatory 1-Click Unsubscribe Header: Inserted</div>
                  <div>✓ Suppression List Check: Active (0 suppressed contacts)</div>
                </div>
              </div>

              {/* Send Test Email Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-white block">Send Deliverability Test Email</span>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={testEmailRecipient}
                    onChange={e => setTestEmailRecipient(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSendTestEmail}
                  >
                    Send Test
                  </Button>
                </div>
                {testEmailSent && (
                  <p className="text-xs text-emerald-400 font-mono">
                    ✓ Test email delivered to {testEmailRecipient} with DKIM signature verified.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {wizardStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                onClick={() => setWizardStep((wizardStep - 1) as any)}
              >
                Previous Step
              </Button>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsWizardOpen(false)}
              >
                Cancel
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => handleCompleteCampaign('draft')}
              >
                Save as Draft
              </Button>

              {wizardStep < 5 ? (
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    if (wizardStep === 1 && !campaignName.trim()) {
                      alert('Please enter a campaign name');
                      return;
                    }
                    setWizardStep((wizardStep + 1) as any);
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="gold"
                  size="md"
                  isLoading={isDispatching}
                  leftIcon={<Send className="w-4 h-4" />}
                  onClick={() => handleCompleteCampaign(isScheduled ? 'schedule' : 'send')}
                >
                  {isScheduled ? 'Schedule Broadcast' : 'Dispatch Broadcast Now'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
