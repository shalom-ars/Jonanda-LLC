import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const LegalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-brand-400 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to JONANDA MAIL</span>
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Compliance, Privacy & Anti-Spam Standards</h1>
          <p className="text-xs text-slate-400">Effective Date: August 2026 • JONANDA LLC</p>
        </div>

        <Card className="p-8 space-y-6 text-xs text-slate-300 leading-relaxed border-slate-800">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">1. Anti-Spam & Deliverability Policy</h2>
            <p>
              JONANDA MAIL strictly enforces zero-tolerance policies against unsolicited commercial email (UCE) and spam. All broadcast campaigns must have explicit subscriber consent, clear sender identities (SPF/DKIM verified), and an automated 1-click unsubscribe mechanism.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">2. Multi-Tenant Data Isolation & Security</h2>
            <p>
              Each organization and project workspace maintains complete cryptographic and relational isolation. No tenant can access another organization's mailboxes, contacts, campaigns, or DNS credentials.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-white">3. Suppression & Bounce Management</h2>
            <p>
              Addresses that register hard bounces, unsubscribe requests, or spam complaints are permanently added to the ecosystem suppression list to protect domain reputations and adhere to global email deliverability standards.
            </p>
          </section>
        </Card>
      </div>
    </div>
  );
};
