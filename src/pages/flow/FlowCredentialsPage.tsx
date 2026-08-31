import React, { useState } from 'react';
import {
  Key,
  Plus,
  ShieldCheck,
  Search,
  CheckCircle2,
  Trash2,
  X,
  AlertCircle,
  EyeOff,
  RotateCw
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useFlow } from '../../context/FlowContext';
import { Credential, CredentialType } from '../../types/flow';

export const FlowCredentialsPage: React.FC = () => {
  const { credentials, addCredential, revokeCredential, deleteCredential, testCredential } = useFlow();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);

  const [newCred, setNewCred] = useState({
    name: '',
    type: 'api_key' as CredentialType,
    provider: 'Custom REST API',
    apiKey: ''
  });

  const filtered = credentials.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.provider.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || c.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleTest = async (id: string) => {
    setTestingId(id);
    await testCredential(id);
    setTestingId(null);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCred.name.trim()) return;

    addCredential({
      name: newCred.name.trim(),
      type: newCred.type,
      provider: newCred.provider.trim(),
      data: { apiKey: newCred.apiKey }
    });

    setNewCred({ name: '', type: 'api_key', provider: 'Custom REST API', apiKey: '' });
    setIsAddModalOpen(false);
  };

  return (
    <>
      <SEOHead
        title="Credentials Vault | JONANDA FLOW"
        description="Securely store and manage API keys, OAuth tokens, SMTP credentials, and database connectors for automated workflows."
        canonicalPath="/flow/credentials"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 mb-3">
              <Key className="w-3.5 h-3.5" />
              <span>Encrypted Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Integration Credentials
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Cryptographically secured auth tokens. Raw secret values are never exposed client-side.
            </p>
          </div>

          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          >
            Add Credential
          </Button>
        </div>

        {/* Security Advisory */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-800 dark:text-gold-300 flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0 mt-0.5" />
          <span>
            <strong>Zero-Knowledge Secrets Policy:</strong> Credentials used in HTTP requests, AI nodes, and databases are resolved server-side. They cannot be extracted from browser state or workflow export files.
          </span>
        </div>

        {/* Search & Filter */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search credentials..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="api_key">API Keys</option>
            <option value="smtp">SMTP / Mail</option>
            <option value="database">Database</option>
            <option value="oauth2">OAuth 2.0</option>
            <option value="bearer_token">Bearer Token</option>
            <option value="webhook_secret">Webhook Secret</option>
          </select>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cred: Credential) => (
            <CorporateCard key={cred.id} className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-gold-300 border border-amber-500/30">
                    {cred.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      cred.isValid
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        : 'bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30'
                    }`}
                  >
                    {cred.isValid ? 'Valid' : 'Revoked'}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {cred.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Provider: {cred.provider}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] text-xs font-mono flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                    {cred.maskedValue}
                  </span>
                  <EyeOff className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  disabled={testingId === cred.id}
                  onClick={() => handleTest(cred.id)}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-xs font-bold text-gray-700 dark:text-gray-200 flex items-center gap-1.5"
                >
                  {testingId === cred.id ? (
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                  <span>Test Key</span>
                </button>

                <div className="flex items-center gap-1">
                  {cred.isValid && (
                    <button
                      type="button"
                      onClick={() => revokeCredential(cred.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500"
                      title="Revoke Token"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteCredential(cred.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </CorporateCard>
          ))}
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Add New Integration Credential
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Credential Name *</label>
                  <input
                    type="text"
                    required
                    value={newCred.name}
                    onChange={(e) => setNewCred({ ...newCred, name: e.target.value })}
                    placeholder="e.g. OpenAI Production Key"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Credential Type</label>
                  <select
                    value={newCred.type}
                    onChange={(e) => setNewCred({ ...newCred, type: e.target.value as CredentialType })}
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  >
                    <option value="api_key">API Key / Token</option>
                    <option value="bearer_token">Bearer Token</option>
                    <option value="smtp">SMTP Credentials</option>
                    <option value="database">Database Connection</option>
                    <option value="webhook_secret">Webhook HMAC Secret</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Secret Token / Key *</label>
                  <input
                    type="password"
                    required
                    value={newCred.apiKey}
                    onChange={(e) => setNewCred({ ...newCred, apiKey: e.target.value })}
                    placeholder="••••••••••••••••••••••••"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsAddModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Store Credential
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
