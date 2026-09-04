import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { StorageService } from '../../services/storageService';
import { Mailbox, Domain } from '../../types';
import {
  Inbox,
  Plus,
  HardDrive,
  CheckCircle,
  XCircle,
  Trash2,
  Lock,
  Mail,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const MailboxesPage: React.FC = () => {
  const { projects, currentProjectId } = useProject();
  const [mailboxes, setMailboxes] = useState<Mailbox[]>(() => StorageService.getMailboxes());
  const [domains] = useState<Domain[]>(() => StorageService.getDomains());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New mailbox form
  const [newEmailPrefix, setNewEmailPrefix] = useState('');
  const [selectedDomainId, setSelectedDomainId] = useState(domains[0]?.id || '');
  const [displayName, setDisplayName] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 'jonanda-llc');
  const [quotaGb, setQuotaGb] = useState(10);
  const [sendingEnabled, setSendingEnabled] = useState(true);
  const [signature, setSignature] = useState('');

  const filteredMailboxes = currentProjectId === 'all'
    ? mailboxes
    : mailboxes.filter(m => m.projectId === currentProjectId);

  const handleAddMailbox = (e: React.FormEvent) => {
    e.preventDefault();
    const domainObj = domains.find(d => d.id === selectedDomainId);
    if (!domainObj || !newEmailPrefix.trim()) return;

    const fullEmail = `${newEmailPrefix.toLowerCase().trim()}@${domainObj.domainName}`;

    const newMailbox: Mailbox = {
      id: `mbx_${Date.now()}`,
      orgId: 'org_jonanda_master',
      projectId: selectedProjectId,
      domainId: domainObj.id,
      email: fullEmail,
      displayName: displayName || fullEmail,
      quotaBytes: quotaGb * 1024 * 1024 * 1024,
      usedBytes: 0,
      status: 'active',
      sendingEnabled,
      assignedUsers: ['usr_ar_admin'],
      signature,
      createdAt: new Date().toISOString()
    };

    StorageService.addMailbox(newMailbox);
    setMailboxes(StorageService.getMailboxes());
    setIsAddModalOpen(false);
    setNewEmailPrefix('');
    setDisplayName('');
  };

  const handleDeleteMailbox = (mailboxId: string) => {
    if (confirm('Are you sure you want to delete this mailbox? Stored emails will be removed.')) {
      StorageService.deleteMailbox(mailboxId);
      setMailboxes(StorageService.getMailboxes());
    }
  };

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1) return `${gb.toFixed(1)} GB`;
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(0)} MB`;
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Mailbox Management</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Provisioned & Active
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Create, assign, and manage enterprise mailboxes with quotas, role assignments, and sending permissions across JONANDA domains.
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-lg shadow-brand-600/20"
        >
          Create Mailbox
        </Button>
      </div>

      {/* Mailboxes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMailboxes.map(mbx => {
          const project = projects.find(p => p.id === mbx.projectId);
          const percentUsed = ((mbx.usedBytes / mbx.quotaBytes) * 100).toFixed(1);

          return (
            <Card key={mbx.id} className="p-5 flex flex-col justify-between space-y-4 hover:border-slate-700">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600/20 to-cyan-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">{mbx.displayName}</h3>
                      <p className="text-xs font-mono text-slate-400">{mbx.email}</p>
                    </div>
                  </div>
                  <Badge variant={mbx.status === 'active' ? 'success' : 'warning'}>
                    {mbx.status}
                  </Badge>
                </div>

                <div className="text-xs text-slate-400 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span>Ecosystem Project:</span>
                    <span className="text-slate-200 font-medium">{project?.name || 'JONANDA'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sending Policy:</span>
                    <span className="text-emerald-400 font-medium">
                      {mbx.sendingEnabled ? 'Enabled (DKIM & SPF Enforced)' : 'Restricted'}
                    </span>
                  </div>
                </div>

                {/* Storage usage bar */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <HardDrive className="w-3.5 h-3.5 text-brand-400" />
                      <span>Storage Quota</span>
                    </div>
                    <span className="font-mono text-slate-300">
                      {formatBytes(mbx.usedBytes)} / {formatBytes(mbx.quotaBytes)} ({percentUsed}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full"
                      style={{ width: `${Math.min(parseFloat(percentUsed), 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-500 text-[11px]">
                  Created {new Date(mbx.createdAt).toLocaleDateString()}
                </span>
                <button
                  onClick={() => handleDeleteMailbox(mbx.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                  title="Delete Mailbox"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Add Mailbox Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Provision New Mailbox"
        subtitle="Create an enterprise email identity bound to a verified domain"
      >
        <form onSubmit={handleAddMailbox} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Email Address Prefix & Domain
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="support, contact, info"
                value={newEmailPrefix}
                onChange={e => setNewEmailPrefix(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
                required
              />
              <span className="flex items-center text-slate-500 font-mono">@</span>
              <select
                value={selectedDomainId}
                onChange={e => setSelectedDomainId(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
              >
                {domains.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.domainName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. JONANDA Security Desk"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Ecosystem Project
            </label>
            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Storage Quota (GB)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={quotaGb}
              onChange={e => setQuotaGb(parseInt(e.target.value) || 10)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-500 font-mono"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Default Signature (Optional)
            </label>
            <textarea
              placeholder="--&#10;Support Team&#10;jonanda.com"
              value={signature}
              onChange={e => setSignature(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-500 h-20 resize-none font-mono"
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
              Provision Mailbox
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
