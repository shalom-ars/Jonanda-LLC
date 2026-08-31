import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProject } from '../../context/ProjectContext';
import { useMail } from '../../context/MailContext';
import { StorageService } from '../../services/storageService';
import {
  Mail,
  Send,
  Globe,
  Inbox,
  ShieldCheck,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { currentProject, projects } = useProject();
  const { filteredThreads, openCompose } = useMail();

  const domains = StorageService.getDomains();
  const mailboxes = StorageService.getMailboxes();
  const campaigns = StorageService.getCampaigns();
  const auditLogs = StorageService.getAuditLogs().slice(0, 5);

  const unreadCount = filteredThreads.filter(t => !t.isRead).length;
  const verifiedDomainsCount = domains.filter(d => d.status === 'verified').length;

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-900/40 via-indigo-900/30 to-[#070b14] border border-brand-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-400">
              Ecosystem Control Plane
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
              All Relay Nodes Live
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome, {user?.name || 'Executive Admin'}
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            {currentProject ? (
              <span>Managing <strong>{currentProject.name}</strong> communications, mailboxes, and deliverability policies.</span>
            ) : (
              <span>Orchestrating consolidated communications across all 8 JONANDA ventures from one sovereign dashboard.</span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => openCompose()}
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-lg shadow-brand-600/20"
          >
            Quick Compose
          </Button>
          <Link to="/mail">
            <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Webmail
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Unread Messages</span>
            <Mail className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{unreadCount}</div>
          <p className="text-[11px] text-slate-400">Across active mailboxes</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Verified Domains</span>
            <Globe className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{verifiedDomainsCount} / {domains.length}</div>
          <p className="text-[11px] text-slate-400">SPF, DKIM, DMARC, MX pass</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Enterprise Mailboxes</span>
            <Inbox className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{mailboxes.length}</div>
          <p className="text-[11px] text-slate-400">Active sending enabled</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Deliverability Health</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 font-mono">99.8%</div>
          <p className="text-[11px] text-slate-400">0 ISP complaints registered</p>
        </Card>
      </div>

      {/* Main Grid: Recent Conversations & Recent Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Webmail Conversations */}
        <Card className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-400" />
              <h3 className="text-base font-bold text-white">Recent Ecosystem Correspondence</h3>
            </div>
            <Link to="/mail" className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60">
            {filteredThreads.slice(0, 4).map(thread => (
              <Link
                key={thread.id}
                to="/mail"
                className="py-3 flex items-start justify-between gap-4 hover:bg-slate-900/40 p-2 rounded-xl transition-colors block"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${!thread.isRead ? 'text-white' : 'text-slate-300'}`}>
                      {thread.participants[0]?.name || thread.participants[0]?.email}
                    </span>
                    {!thread.isRead && (
                      <span className="w-2 h-2 rounded-full bg-brand-500" />
                    )}
                  </div>
                  <div className="text-xs text-slate-300 font-medium truncate">{thread.subject}</div>
                  <div className="text-[11px] text-slate-500 truncate">{thread.snippet}</div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono shrink-0">
                  {new Date(thread.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Right Col: Live Security & Activity Telemetry */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-bold text-white">Audit Telemetry</h3>
            </div>
            <Link to="/admin" className="text-xs text-amber-400 hover:text-amber-300 font-medium">
              Admin Logs
            </Link>
          </div>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-amber-400 text-[11px]">{log.action}</span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] line-clamp-2">{log.details}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
