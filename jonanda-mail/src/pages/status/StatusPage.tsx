import React from 'react';
import { Activity, CheckCircle2, ShieldCheck, Server, Globe, Cpu } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const StatusPage: React.FC = () => {
  const components = [
    { name: 'SMTP Inbound Relay', status: 'Operational', uptime: '99.99%', latency: '14ms' },
    { name: 'DKIM & SPF Signing Cluster', status: 'Operational', uptime: '100.0%', latency: '8ms' },
    { name: 'Cloudflare Edge Webmail UI', status: 'Operational', uptime: '100.0%', latency: '12ms' },
    { name: 'REST API Service (api.mail.jonanda.com)', status: 'Operational', uptime: '99.98%', latency: '24ms' },
    { name: 'Automated DNS Resolver (DoH)', status: 'Operational', uptime: '99.99%', latency: '18ms' },
    { name: 'Campaign Delivery & Bounce Engine', status: 'Operational', uptime: '99.95%', latency: '32ms' }
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">JONANDA MAIL System Status</h1>
          <span className="px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
            status.mail.jonanda.com
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Live infrastructure operational metrics, uptime records, and service health indicators.
        </p>
      </div>

      {/* Main Status Banner */}
      <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">All Systems Fully Operational</h2>
            <p className="text-xs text-emerald-400 font-mono mt-0.5">90-Day Aggregate Uptime: 99.99%</p>
          </div>
        </div>
        <Badge variant="success">Nominal</Badge>
      </div>

      {/* Component breakdown */}
      <Card className="p-6 space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
          Infrastructure Component Health
        </h3>

        <div className="divide-y divide-slate-800/80">
          {components.map(c => (
            <div key={c.name} className="py-3.5 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-slate-100">{c.name}</div>
                <div className="text-[11px] text-slate-500 font-mono">Response Latency: {c.latency}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-slate-400">{c.uptime} uptime</span>
                <span className="flex items-center gap-1 text-emerald-400 font-medium font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
