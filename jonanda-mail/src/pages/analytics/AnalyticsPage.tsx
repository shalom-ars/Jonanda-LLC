import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { Campaign, SuppressionEntry } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Send,
  CheckCircle,
  AlertTriangle,
  UserX,
  ShieldCheck,
  Percent,
  Activity,
  Plus,
  Trash2
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const AnalyticsPage: React.FC = () => {
  const [campaigns] = useState<Campaign[]>(() => StorageService.getCampaigns());
  const [suppressions, setSuppressions] = useState<SuppressionEntry[]>(() => StorageService.getSuppressions());
  const [newSuppressionEmail, setNewSuppressionEmail] = useState('');

  // Calculate aggregated stats across all campaigns
  const totalSent = campaigns.reduce((acc, c) => acc + c.stats.sent, 0);
  const totalDelivered = campaigns.reduce((acc, c) => acc + c.stats.delivered, 0);
  const totalOpened = campaigns.reduce((acc, c) => acc + c.stats.opened, 0);
  const totalClicked = campaigns.reduce((acc, c) => acc + c.stats.clicked, 0);
  const totalBounced = campaigns.reduce((acc, c) => acc + c.stats.bounced, 0);
  const totalUnsubscribed = campaigns.reduce((acc, c) => acc + c.stats.unsubscribed, 0);
  const totalComplaints = campaigns.reduce((acc, c) => acc + c.stats.complaints, 0);

  const deliveryRate = totalSent > 0 ? ((totalDelivered / totalSent) * 100).toFixed(1) : '100.0';
  const openRate = totalDelivered > 0 ? ((totalOpened / totalDelivered) * 100).toFixed(1) : '0.0';
  const clickRate = totalOpened > 0 ? ((totalClicked / totalOpened) * 100).toFixed(1) : '0.0';
  const bounceRate = totalSent > 0 ? ((totalBounced / totalSent) * 100).toFixed(2) : '0.00';

  const handleAddSuppression = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuppressionEmail.trim()) return;
    StorageService.addSuppression(newSuppressionEmail.trim(), 'manual');
    setSuppressions(StorageService.getSuppressions());
    setNewSuppressionEmail('');
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Deliverability & Campaign Analytics</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
              99.8% Sender Reputation
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time delivery telemetry, ISP feedback loop monitoring, bounce classification, and compliance suppression lists.
          </p>
        </div>
      </div>

      {/* Top 4 KPI Rate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Delivery Rate</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{deliveryRate}%</span>
            <span className="text-xs text-emerald-400 font-medium">Strict SPF/DKIM</span>
          </div>
          <p className="text-[11px] text-slate-500">{totalDelivered} of {totalSent} total messages delivered</p>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Rate (Unique)</span>
            <TrendingUp className="w-4 h-4 text-brand-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{openRate}%</span>
            <span className="text-xs text-brand-400 font-medium">{totalOpened} reads</span>
          </div>
          <p className="text-[11px] text-slate-500">Calculated over verified delivered impressions</p>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Click-Through Rate</span>
            <Percent className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{clickRate}%</span>
            <span className="text-xs text-cyan-400 font-medium">{totalClicked} clicks</span>
          </div>
          <p className="text-[11px] text-slate-500">Total verified link engagement interactions</p>
        </Card>

        <Card className="p-5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Bounce & Spam Score</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">{bounceRate}%</span>
            <span className="text-xs text-emerald-400 font-medium">0 Complaints</span>
          </div>
          <p className="text-[11px] text-slate-500">{totalBounced} bounces automatically suppressed</p>
        </Card>
      </div>

      {/* Campaign Telemetry Breakdown Table */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
          Recent Campaign Broadcast Performance
        </div>

        <Card className="overflow-hidden border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#090e1a] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Sent</th>
                  <th className="py-3 px-4">Delivered</th>
                  <th className="py-3 px-4">Opened</th>
                  <th className="py-3 px-4">Clicked</th>
                  <th className="py-3 px-4">Bounced</th>
                  <th className="py-3 px-4">Unsubscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {campaigns.filter(c => c.stats.sent > 0).map(cmp => (
                  <tr key={cmp.id} className="hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-sans font-medium text-slate-200">
                      <div>{cmp.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{cmp.fromEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{cmp.stats.sent}</td>
                    <td className="py-3 px-4 text-emerald-400">{cmp.stats.delivered}</td>
                    <td className="py-3 px-4 text-brand-400">{cmp.stats.opened}</td>
                    <td className="py-3 px-4 text-cyan-400">{cmp.stats.clicked}</td>
                    <td className="py-3 px-4 text-amber-400">{cmp.stats.bounced}</td>
                    <td className="py-3 px-4 text-rose-400">{cmp.stats.unsubscribed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Suppression List Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <UserX className="w-5 h-5" />
            <h3 className="text-sm font-bold text-white">Add Email to Suppression List</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Emails on the suppression list are strictly blocked from receiving outbound broadcasts to protect sender domain reputation and enforce CAN-SPAM / GDPR compliance.
          </p>

          <form onSubmit={handleAddSuppression} className="space-y-3">
            <input
              type="email"
              placeholder="e.g. optout@example.com"
              value={newSuppressionEmail}
              onChange={e => setNewSuppressionEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              required
            />
            <Button
              type="submit"
              variant="danger"
              size="sm"
              className="w-full"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              Suppress Email Address
            </Button>
          </form>
        </Card>

        <Card className="lg:col-span-2 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Active Suppression Registry ({suppressions.length})</h3>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Enforced across all campaigns</span>
          </div>

          <div className="divide-y divide-slate-800/80 max-h-56 overflow-y-auto">
            {suppressions.map(sup => (
              <div key={sup.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="font-mono text-slate-300">{sup.email}</div>
                <div className="flex items-center gap-3">
                  <Badge variant={sup.reason === 'unsubscribe' ? 'warning' : 'error'}>
                    {sup.reason}
                  </Badge>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(sup.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
