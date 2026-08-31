import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Key,
  Globe,
  Send,
  Inbox,
  ShieldCheck,
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const DocsPage: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(key);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">JONANDA MAIL Developer Documentation</h1>
          <span className="px-2.5 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
            api.mail.jonanda.com • v1.0
          </span>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Complete REST API specifications for automated email sending, domain DNS validation, subscriber management, and webhooks.
        </p>
      </div>

      {/* Auth overview */}
      <Card className="p-6 space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Key className="w-5 h-5 text-amber-400" />
          <span>Authentication</span>
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          All API requests must include your organization API key inside the <code className="text-brand-300 font-mono">Authorization</code> HTTP header:
        </p>
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between">
          <span>Authorization: Bearer jnd_live_xxxxxxxxxxxxxxxxxxxx</span>
          <button
            onClick={() => handleCopy('Authorization: Bearer jnd_live_xxxxxxxxxxxxxxxxxxxx', 'auth')}
            className="p-1 text-slate-500 hover:text-white"
          >
            {copiedSection === 'auth' ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-400" />
          <span>Core API Endpoints</span>
        </h2>

        {/* POST /v1/messages/send */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/30">
                POST
              </span>
              <span className="text-slate-200 font-semibold">https://api.mail.jonanda.com/v1/messages/send</span>
            </div>
            <Badge variant="info">Transactional & Broadcast</Badge>
          </div>

          <p className="text-xs text-slate-300">
            Dispatch an RFC-5322 compliant email signed with verified DKIM keys and SPF strict envelope.
          </p>

          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Sample Request Body (JSON)</span>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono overflow-x-auto">
{`{
  "mailbox_id": "mbx_jonanda_contact",
  "from": "contact@jonanda.com",
  "to": ["user@example.com"],
  "subject": "Platform Verification Token",
  "html": "<p>Your security token is: <strong>892019</strong></p>",
  "text": "Your security token is: 892019",
  "track_opens": true,
  "track_clicks": true
}`}
            </pre>
          </div>
        </Card>

        {/* GET /v1/domains/verify */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold border border-blue-500/30">
                GET
              </span>
              <span className="text-slate-200 font-semibold">https://api.mail.jonanda.com/v1/domains/:domain_id/verify</span>
            </div>
            <Badge variant="purple">DNS Telemetry</Badge>
          </div>

          <p className="text-xs text-slate-300">
            Inspect live DNS-over-HTTPS (DoH) verification status for SPF, DKIM, DMARC, and MX records.
          </p>
        </Card>
      </div>
    </div>
  );
};
