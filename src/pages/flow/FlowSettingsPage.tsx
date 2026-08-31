import React, { useState } from 'react';
import {
  Settings,
  UserPlus,
  Copy,
  Check
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { TeamMember, AuditLogEntry } from '../../types/flow';

const SEED_TEAM: TeamMember[] = [
  {
    id: 'usr_1',
    name: 'Shalom (Lead Architect)',
    email: 'contact@jonanda.com',
    role: 'Owner',
    status: 'active',
    joinedAt: '2026-01-10'
  },
  {
    id: 'usr_2',
    name: 'DevOps Engineer',
    email: 'ops@jonanda.com',
    role: 'Automation Manager',
    status: 'active',
    joinedAt: '2026-04-12'
  },
  {
    id: 'usr_3',
    name: 'Security Analyst',
    email: 'security@jonanda.com',
    role: 'Admin',
    status: 'active',
    joinedAt: '2026-06-18'
  }
];

export const FlowSettingsPage: React.FC = () => {
  const { auditLogs, usageQuota } = useFlow();
  const [activeTab, setActiveTab] = useState<'quotas' | 'team' | 'audit' | 'security'>('quotas');
  const [team] = useState<TeamMember[]>(SEED_TEAM);
  const [isCopied, setIsCopied] = useState(false);

  const webhookSecret = 'whsec_98fbc9281a9984e72b001928374a';

  const handleCopySecret = () => {
    navigator.clipboard.writeText(webhookSecret);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <SEOHead
        title="Settings & Governance | JONANDA FLOW"
        description="Configure RBAC team permissions, review audit logs, and monitor JONANDA ONE automation quotas."
        canonicalPath="/flow/settings"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 mb-3">
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Flow Settings & Access Control
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Enterprise RBAC policies, usage quotas, audit trails, and security parameters.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-white/10 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('quotas')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'quotas'
                ? 'border-amber-500 text-amber-700 dark:text-gold-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Quotas & Entitlements
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'team'
                ? 'border-amber-500 text-amber-700 dark:text-gold-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Team RBAC Roles
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'audit'
                ? 'border-amber-500 text-amber-700 dark:text-gold-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Audit Logs
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('security')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === 'security'
                ? 'border-amber-500 text-amber-700 dark:text-gold-400'
                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Webhook & Security Keys
          </button>
        </div>

        {/* 1. QUOTAS TAB */}
        {activeTab === 'quotas' && (
          <div className="space-y-6">
            <CorporateCard className="p-6">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Active Plan
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
                    {usageQuota.tier} Plan
                  </h3>
                </div>
                <Button href="/contact" variant="outline" size="sm">
                  Upgrade Enterprise Tier
                </Button>
              </div>

              {/* Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Active Workflows
                    </span>
                    <span className="font-mono text-gray-500">
                      {usageQuota.workflowsUsed} / {usageQuota.workflowsMax}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${(usageQuota.workflowsUsed / usageQuota.workflowsMax) * 100}%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Monthly Executions
                    </span>
                    <span className="font-mono text-gray-500">
                      {usageQuota.executionsThisMonth} / {usageQuota.executionsMonthlyMax}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{
                        width: `${
                          (usageQuota.executionsThisMonth / usageQuota.executionsMonthlyMax) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      Automated Emails Dispatched
                    </span>
                    <span className="font-mono text-gray-500">
                      {usageQuota.emailsAutomatedThisMonth} / {usageQuota.emailsMonthlyMax}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${
                          (usageQuota.emailsAutomatedThisMonth / usageQuota.emailsMonthlyMax) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      REST API & Webhook Invocations
                    </span>
                    <span className="font-mono text-gray-500">
                      {usageQuota.apiRequestsThisMonth} / {usageQuota.apiRequestsMonthlyMax}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: `${
                          (usageQuota.apiRequestsThisMonth / usageQuota.apiRequestsMonthlyMax) * 100
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </CorporateCard>
          </div>
        )}

        {/* 2. TEAM TAB */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Team Members & RBAC Roles
                </h3>
                <p className="text-xs text-gray-500">
                  Manage workflow creation, execution rights, and credential revocation access.
                </p>
              </div>
              <Button variant="primary" size="sm" icon={<UserPlus className="w-3.5 h-3.5" />}>
                Invite Member
              </Button>
            </div>

            <div className="rounded-3xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/10 text-gray-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-5">Name & Email</th>
                    <th className="py-3 px-5">Role</th>
                    <th className="py-3 px-5">Status</th>
                    <th className="py-3 px-5">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/[0.04]">
                  {team.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                      <td className="py-3.5 px-5">
                        <span className="font-bold text-gray-900 dark:text-white block">{m.name}</span>
                        <span className="font-mono text-gray-500 text-[11px]">{m.email}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold border border-amber-500/30 text-[10px]">
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="text-emerald-600 font-bold uppercase text-[10px]">
                          {m.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-gray-500 font-mono">
                        {m.joinedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. AUDIT LOG TAB */}
        {activeTab === 'audit' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Platform Security & Change Audit Trail
              </h3>
              <span className="text-xs font-mono text-gray-500">
                {auditLogs.length} logged events
              </span>
            </div>

            <div className="rounded-3xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/10 text-gray-500 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-5">Timestamp</th>
                    <th className="py-3 px-5">User</th>
                    <th className="py-3 px-5">Action</th>
                    <th className="py-3 px-5">Target Resource</th>
                    <th className="py-3 px-5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/[0.04]">
                  {auditLogs.map((entry: AuditLogEntry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                      <td className="py-3 px-5 font-mono text-gray-400 whitespace-nowrap">
                        {entry.timestamp}
                      </td>
                      <td className="py-3 px-5 font-semibold text-gray-800 dark:text-gray-200">
                        {entry.userName}
                      </td>
                      <td className="py-3 px-5">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 font-mono text-[10px]">
                          {entry.action}
                        </span>
                      </td>
                      <td className="py-3 px-5 font-bold text-gray-900 dark:text-white">
                        {entry.targetResource}
                      </td>
                      <td className="py-3 px-5 text-gray-500 text-[11px]">
                        {entry.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. SECURITY KEYS TAB */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <CorporateCard className="p-6 space-y-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Global Inbound Webhook Signing Key
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Use this secret key to sign incoming webhook requests sent to <code>https://api.jonanda.com/webhooks/:workflowId</code> with HMAC-SHA256 headers.
              </p>

              <div className="flex items-center gap-3">
                <div className="flex-1 p-2.5 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/10 font-mono text-xs text-gray-900 dark:text-white">
                  {webhookSecret}
                </div>
                <button
                  type="button"
                  onClick={handleCopySecret}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </CorporateCard>
          </div>
        )}
      </div>
    </>
  );
};
