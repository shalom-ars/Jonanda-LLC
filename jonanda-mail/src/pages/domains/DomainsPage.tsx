import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { StorageService } from '../../services/storageService';
import { DnsVerifier } from '../../services/dnsVerifier';
import { Domain, DnsRecord } from '../../types';
import {
  Globe,
  Plus,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  RefreshCw,
  Trash2,
  HelpCircle,
  Server,
  Lock,
  MailCheck
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge, DnsStatusBadge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const DomainsPage: React.FC = () => {
  const { projects, currentProjectId } = useProject();
  const [domains, setDomains] = useState<Domain[]>(() => StorageService.getDomains());
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(domains[0] || null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // New domain form
  const [newDomainName, setNewDomainName] = useState('');
  const [newProjectId, setNewProjectId] = useState(projects[0]?.id || 'jonanda-llc');
  const [newDkimSelector, setNewDkimSelector] = useState('jonanda');

  const filteredDomains = currentProjectId === 'all'
    ? domains
    : domains.filter(d => d.projectId === currentProjectId);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleVerifyDomain = async (domain: Domain) => {
    setIsVerifying(true);
    await DnsVerifier.verifyDomain(domain);
    const updated = StorageService.getDomains();
    setDomains(updated);
    if (selectedDomain?.id === domain.id) {
      setSelectedDomain(updated.find(d => d.id === domain.id) || null);
    }
    setIsVerifying(false);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomainName.trim()) return;

    const cleanDomain = newDomainName.toLowerCase().replace(/https?:\/\//, '').replace(/\/.*$/, '').trim();

    const newDomain: Domain = {
      id: `dom_${Date.now()}`,
      orgId: 'org_jonanda_master',
      projectId: newProjectId,
      domainName: cleanDomain,
      status: 'pending',
      spfStatus: 'pending',
      dkimStatus: 'pending',
      dmarcStatus: 'pending',
      mxStatus: 'pending',
      dkimSelector: newDkimSelector || 'jonanda',
      records: DnsVerifier.generateDefaultRecords(cleanDomain, newDkimSelector || 'jonanda'),
      lastCheckedAt: new Date().toISOString()
    };

    StorageService.addDomain(newDomain);
    const updated = StorageService.getDomains();
    setDomains(updated);
    setSelectedDomain(newDomain);
    setIsAddModalOpen(false);
    setNewDomainName('');
  };

  const handleDeleteDomain = (domainId: string) => {
    if (confirm('Are you sure you want to remove this domain configuration?')) {
      StorageService.deleteDomain(domainId);
      const updated = StorageService.getDomains();
      setDomains(updated);
      setSelectedDomain(updated[0] || null);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Domain & DNS Management</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/30">
              Cloudflare & RFC Compliant
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Configure, inspect, and cryptographically verify SPF, DKIM, DMARC, and MX DNS records for all JONANDA ecosystem email identities.
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-lg shadow-brand-600/20"
        >
          Add New Domain
        </Button>
      </div>

      {/* Domain List and Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Domain Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 flex items-center justify-between">
            <span>Configured Domains ({filteredDomains.length})</span>
            <Globe className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {filteredDomains.length === 0 ? (
            <Card className="p-6 text-center text-slate-500">
              <p className="text-xs">No domains configured for the selected project filter.</p>
            </Card>
          ) : (
            filteredDomains.map(domain => {
              const isSelected = selectedDomain?.id === domain.id;
              const project = projects.find(p => p.id === domain.projectId);

              return (
                <Card
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-900/20 shadow-md shadow-brand-500/10'
                      : 'hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-brand-400">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-white font-mono">{domain.domainName}</div>
                        <div className="text-[11px] text-slate-400">{project?.name || 'Ecosystem Domain'}</div>
                      </div>
                    </div>
                    <DnsStatusBadge status={domain.status} />
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Right Column: Selected Domain DNS Inspection & Verification */}
        {selectedDomain ? (
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-white font-mono">{selectedDomain.domainName}</h2>
                    <DnsStatusBadge status={selectedDomain.status} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Last DNS check: {new Date(selectedDomain.lastCheckedAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleVerifyDomain(selectedDomain)}
                    variant="emerald"
                    size="sm"
                    isLoading={isVerifying}
                    leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                  >
                    Verify DNS Records
                  </Button>
                  <Button
                    onClick={() => handleDeleteDomain(selectedDomain.id)}
                    variant="outline"
                    size="sm"
                    className="text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* DNS Records Table */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <Server className="w-4 h-4 text-brand-400" />
                    <span>Required DNS Records for Deliverability</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">Add these to your DNS registrar / Cloudflare dashboard</span>
                </div>

                <div className="space-y-3">
                  {/* SPF Record */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          TXT
                        </span>
                        <span className="text-xs font-semibold text-slate-200">SPF (Sender Policy Framework)</span>
                      </div>
                      <DnsStatusBadge status={selectedDomain.records.spf.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Host</span>
                        <code className="text-slate-300 font-mono">{selectedDomain.records.spf.host}</code>
                      </div>
                      <div className="md:col-span-3 flex items-center justify-between gap-2 bg-[#080d18] p-2 rounded-lg border border-slate-800">
                        <code className="text-slate-300 font-mono text-[11px] break-all">
                          {selectedDomain.records.spf.value}
                        </code>
                        <button
                          onClick={() => handleCopy(selectedDomain.records.spf.value, 'spf')}
                          className="p-1 text-slate-400 hover:text-white shrink-0"
                          title="Copy SPF record"
                        >
                          {copiedKey === 'spf' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* DKIM Record */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          TXT
                        </span>
                        <span className="text-xs font-semibold text-slate-200">DKIM (DomainKeys Identified Mail 2048-bit RSA)</span>
                      </div>
                      <DnsStatusBadge status={selectedDomain.records.dkim.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Host</span>
                        <code className="text-slate-300 font-mono">{selectedDomain.records.dkim.host}</code>
                      </div>
                      <div className="md:col-span-3 flex items-center justify-between gap-2 bg-[#080d18] p-2 rounded-lg border border-slate-800">
                        <code className="text-slate-300 font-mono text-[11px] break-all">
                          {selectedDomain.records.dkim.value}
                        </code>
                        <button
                          onClick={() => handleCopy(selectedDomain.records.dkim.value, 'dkim')}
                          className="p-1 text-slate-400 hover:text-white shrink-0"
                          title="Copy DKIM record"
                        >
                          {copiedKey === 'dkim' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* DMARC Record */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          TXT
                        </span>
                        <span className="text-xs font-semibold text-slate-200">DMARC (Domain-based Message Authentication)</span>
                      </div>
                      <DnsStatusBadge status={selectedDomain.records.dmarc.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Host</span>
                        <code className="text-slate-300 font-mono">{selectedDomain.records.dmarc.host}</code>
                      </div>
                      <div className="md:col-span-3 flex items-center justify-between gap-2 bg-[#080d18] p-2 rounded-lg border border-slate-800">
                        <code className="text-slate-300 font-mono text-[11px] break-all">
                          {selectedDomain.records.dmarc.value}
                        </code>
                        <button
                          onClick={() => handleCopy(selectedDomain.records.dmarc.value, 'dmarc')}
                          className="p-1 text-slate-400 hover:text-white shrink-0"
                          title="Copy DMARC record"
                        >
                          {copiedKey === 'dmarc' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MX Record */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold font-mono rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          MX
                        </span>
                        <span className="text-xs font-semibold text-slate-200">MX (Mail Exchange Relay)</span>
                      </div>
                      <DnsStatusBadge status={selectedDomain.records.mx.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-mono block">Host & Priority</span>
                        <code className="text-slate-300 font-mono">
                          {selectedDomain.records.mx.host} (Priority {selectedDomain.records.mx.priority})
                        </code>
                      </div>
                      <div className="md:col-span-3 flex items-center justify-between gap-2 bg-[#080d18] p-2 rounded-lg border border-slate-800">
                        <code className="text-slate-300 font-mono text-[11px] break-all">
                          {selectedDomain.records.mx.value}
                        </code>
                        <button
                          onClick={() => handleCopy(selectedDomain.records.mx.value, 'mx')}
                          className="p-1 text-slate-400 hover:text-white shrink-0"
                          title="Copy MX record"
                        >
                          {copiedKey === 'mx' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="lg:col-span-2 p-12 text-center text-slate-500">
            <Globe className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>Select a domain from the list to view and verify its DNS records.</p>
          </Card>
        )}
      </div>

      {/* Add Domain Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New Domain"
        subtitle="Add a domain to receive DNS records and begin mail authorization"
      >
        <form onSubmit={handleAddDomain} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Domain Name
            </label>
            <input
              type="text"
              placeholder="e.g. yourbrand.com"
              value={newDomainName}
              onChange={e => setNewDomainName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Associate with Ecosystem Project
            </label>
            <select
              value={newProjectId}
              onChange={e => setNewProjectId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.status})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              DKIM Selector
            </label>
            <input
              type="text"
              placeholder="jonanda"
              value={newDkimSelector}
              onChange={e => setNewDkimSelector(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Generate DNS Configuration
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
