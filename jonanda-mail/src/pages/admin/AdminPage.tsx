import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Building,
  Users,
  Globe,
  Inbox,
  Send,
  Activity,
  Server,
  Key,
  Lock,
  CheckCircle,
  AlertTriangle,
  Clock,
  Terminal,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge, RoleBadge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'orgs' | 'audit' | 'health'>('overview');
  const [auditLogs] = useState(() => StorageService.getAuditLogs());
  const [systemHealth] = useState(() => StorageService.getSystemHealth());
  const [organization] = useState(() => StorageService.getOrganization());
  const [domains] = useState(() => StorageService.getDomains());
  const [mailboxes] = useState(() => StorageService.getMailboxes());
  const [campaigns] = useState(() => StorageService.getCampaigns());

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Super Admin Platform Control Plane</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
              Root Level Access
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Global multi-tenant administration, system telemetry, audit trail logging, and tenant isolation policies.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'overview' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('orgs')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'orgs' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Organizations
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'audit' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Security Audit Logs
          </button>
          <button
            onClick={() => setActiveTab('health')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              activeTab === 'health' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Health
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Managed Tenants</span>
                <Building className="w-4 h-4 text-brand-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">1</div>
              <p className="text-[11px] text-emerald-400">JONANDA Global Enterprise</p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Active Domains</span>
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{domains.length}</div>
              <p className="text-[11px] text-slate-400">100% SPF/DKIM aligned</p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Provisioned Mailboxes</span>
                <Inbox className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{mailboxes.length}</div>
              <p className="text-[11px] text-slate-400">Across 3 live domain brands</p>
            </Card>

            <Card className="p-5 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider">Security Events</span>
                <ShieldAlert className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-extrabold text-white font-mono">{auditLogs.length}</div>
              <p className="text-[11px] text-emerald-400">0 anomalies detected</p>
            </Card>
          </div>

          {/* Infrastructure Health Card */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Infrastructure Status</h3>
              </div>
              <Badge variant="success">All Systems Nominal</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">SMTP / IMAP RELAY</span>
                <span className="text-emerald-400 font-bold">CONNECTED (18ms latency)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">DNS RESOLVER</span>
                <span className="text-emerald-400 font-bold">CLOUDFLARE DoH ACTIVE</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">STORAGE ENGINE</span>
                <span className="text-brand-300 font-bold">ENCRYPTED AT REST (AES-256)</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* ORGANIZATIONS TAB */}
      {activeTab === 'orgs' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Multi-Tenant Workspaces</h3>
            <Button variant="primary" size="sm">Create New Organization</Button>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{organization.name}</h4>
                <p className="text-xs text-slate-400 font-mono">ID: {organization.id} • Slug: {organization.slug}</p>
              </div>
              <Badge variant="gold">{organization.plan} Tier</Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800">
              <div>
                <span>Domains Quota:</span>
                <div className="font-mono text-slate-200">{domains.length} / {organization.allowedDomains}</div>
              </div>
              <div>
                <span>Mailboxes Quota:</span>
                <div className="font-mono text-slate-200">{mailboxes.length} / {organization.allowedMailboxes}</div>
              </div>
              <div>
                <span>Campaigns Limit:</span>
                <div className="font-mono text-slate-200">{campaigns.length} / {organization.allowedCampaigns}</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* AUDIT LOGS TAB */}
      {activeTab === 'audit' && (
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Immutable Security Audit Logs</h3>
            </div>
            <span className="text-xs text-slate-500 font-mono">Retaining last 100 authenticated actions</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#090e1a] text-slate-500 uppercase text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Details</th>
                  <th className="py-2.5 px-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/60">
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-amber-400">{log.action}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {log.entityType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 font-sans">{log.details}</td>
                    <td className="py-2.5 px-3 text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* HEALTH TAB */}
      {activeTab === 'health' && (
        <Card className="p-6 space-y-5">
          <h3 className="text-base font-bold text-white">System Diagnostics & Telemetry</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">PLATFORM UPTIME</span>
              <div className="text-xl font-bold text-emerald-400">{systemHealth.uptimePercentage}%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">API RESPONSE TIME</span>
              <div className="text-xl font-bold text-cyan-400">{systemHealth.apiLatencyMs} ms</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">ACTIVE BACKGROUND WORKERS</span>
              <div className="text-xl font-bold text-purple-400">{systemHealth.activeWorkers}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">QUEUED JOBS</span>
              <div className="text-xl font-bold text-slate-200">{systemHealth.queuedJobs}</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
