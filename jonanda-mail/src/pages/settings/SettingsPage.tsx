import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StorageService } from '../../services/storageService';
import {
  Settings,
  Shield,
  Key,
  CreditCard,
  User,
  CheckCircle,
  Copy,
  Plus,
  Trash2,
  Lock,
  QrCode
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'api' | 'billing'>('profile');

  // Security 2FA state
  const [is2faEnabled, setIs2faEnabled] = useState(user?.is2faEnabled ?? true);
  const [totpSecret] = useState('JONANDA-2FA-SEC-9948-K7L9');
  const [copiedKey, setCopiedKey] = useState(false);

  // API Keys state
  const [apiKeys, setApiKeys] = useState<{ id: string; name: string; key: string; created: string }[]>([
    { id: 'key_1', name: 'LOZULA Threat Automation Webhook', key: 'jnd_live_99f2b8478d103948572a', created: '2026-02-15' },
    { id: 'key_2', name: 'Corporate Dispatch Relay Key', key: 'jnd_live_44a8c91028374659102b', created: '2026-03-01' }
  ]);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleGenerateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    const newKey = {
      id: `key_${Date.now()}`,
      name: newKeyName,
      key: `jnd_live_${Math.random().toString(36).substr(2, 10)}${Math.random().toString(36).substr(2, 10)}`,
      created: new Date().toISOString().split('T')[0]
    };
    setApiKeys([newKey, ...apiKeys]);
    setNewKeyName('');
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Organization & Security Settings</h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage your executive profile, two-factor authentication credentials, programmatic API keys, and subscription tiers.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-medium">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'profile' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Account</span>
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'security' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>2FA & Security</span>
        </button>
        <button
          onClick={() => setActiveTab('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'api' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>API Access Keys</span>
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'billing' ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Subscription & Billing</span>
        </button>
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <Card className="p-6 space-y-6 max-w-2xl">
          <h3 className="text-base font-bold text-white">Administrator Profile</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Email Address</label>
              <input
                type="email"
                defaultValue={user?.email}
                disabled
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-400 font-mono cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Role Assigned</label>
              <input
                type="text"
                defaultValue={user?.role}
                disabled
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-amber-400 font-bold cursor-not-allowed"
              />
            </div>
            <div className="pt-2">
              <Button variant="primary" size="sm">Save Profile Changes</Button>
            </div>
          </div>
        </Card>
      )}

      {/* SECURITY 2FA TAB */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Shield className="w-5 h-5" />
                <h3 className="text-base font-bold text-white">Two-Factor Authentication (2FA)</h3>
              </div>
              <Badge variant={is2faEnabled ? 'success' : 'warning'}>
                {is2faEnabled ? 'Enforced' : 'Disabled'}
              </Badge>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              JONANDA MAIL enforces RFC-6238 TOTP two-factor authentication for all Super Admin and Organization Admin operations.
            </p>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <QrCode className="w-4 h-4 text-brand-400" />
                <span>Authenticator Secret Key</span>
              </div>
              <div className="flex items-center justify-between bg-[#080d18] p-2.5 rounded-lg border border-slate-800 font-mono">
                <span className="text-amber-400">{totpSecret}</span>
                <button
                  onClick={() => handleCopy(totpSecret)}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy secret"
                >
                  {copiedKey ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Compatible with Google Authenticator, Authy, 1Password, or hardware YubiKeys.
              </p>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white">Password & Session Policy</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Password updated securely.'); }} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">New Secure Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white" />
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" size="sm">Update Password</Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* API KEYS TAB */}
      {activeTab === 'api' && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Programmatic REST API Access</h3>
                <p className="text-xs text-slate-400">Use these keys to authenticate server-to-server requests to api.mail.jonanda.com</p>
              </div>
            </div>

            <form onSubmit={handleGenerateKey} className="flex gap-3 max-w-xl">
              <input
                type="text"
                placeholder="Key label, e.g. Production Dispatch Worker"
                value={newKeyName}
                onChange={e => setNewKeyName(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white"
                required
              />
              <Button type="submit" variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
                Generate Key
              </Button>
            </form>

            <div className="divide-y divide-slate-800/80 pt-2">
              {apiKeys.map(k => (
                <div key={k.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{k.name}</div>
                    <code className="text-[11px] text-brand-300 font-mono">{k.key}</code>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-500 font-mono">Created {k.created}</span>
                    <button onClick={() => handleDeleteKey(k.id)} className="p-1 text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* BILLING TIERS TAB */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white">Subscription Plans Architecture</h3>
            <p className="text-xs text-slate-400">Prepared subscription system ready for Stripe / merchant integration.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Trial */}
            <Card className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <Badge variant="default">Free / Trial</Badge>
                <div className="text-2xl font-bold text-white mt-2">$0 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400 mt-2">Evaluation tier for new ecosystem projects.</p>
                <ul className="text-xs text-slate-300 space-y-2 mt-4">
                  <li>• 1 Domain</li>
                  <li>• 2 Mailboxes</li>
                  <li>• 500 Emails / month</li>
                </ul>
              </div>
              <Button variant="outline" size="sm" className="w-full">Current Plan</Button>
            </Card>

            {/* Business */}
            <Card className="p-6 flex flex-col justify-between space-y-4 border-brand-500/40">
              <div>
                <Badge variant="info">Business</Badge>
                <div className="text-2xl font-bold text-white mt-2">$49 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <p className="text-xs text-slate-400 mt-2">For growing organizations and ventures.</p>
                <ul className="text-xs text-slate-300 space-y-2 mt-4">
                  <li>• 5 Verified Domains</li>
                  <li>• 20 Enterprise Mailboxes</li>
                  <li>• 50,000 Campaign Emails</li>
                  <li>• Custom DKIM / DMARC</li>
                </ul>
              </div>
              <Button variant="primary" size="sm" className="w-full">Select Business</Button>
            </Card>

            {/* Enterprise */}
            <Card className="p-6 flex flex-col justify-between space-y-4 border-gold-500/40 bg-amber-500/5">
              <div>
                <Badge variant="gold">Enterprise (Active)</Badge>
                <div className="text-2xl font-bold text-amber-400 mt-2">Custom <span className="text-xs text-slate-400 font-normal">SLA</span></div>
                <p className="text-xs text-slate-400 mt-2">Full platform sovereignty for JONANDA LLC.</p>
                <ul className="text-xs text-slate-300 space-y-2 mt-4">
                  <li>• Unlimited Domains & Mailboxes</li>
                  <li>• Dedicated IP Warmup Pools</li>
                  <li>• Real-Time DoH Verification</li>
                  <li>• 24/7 Threat Telemetry Monitoring</li>
                </ul>
              </div>
              <Button variant="gold" size="sm" className="w-full">Managed Sovereign Plan</Button>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
