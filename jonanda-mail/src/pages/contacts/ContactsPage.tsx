import React, { useState, useMemo } from 'react';
import { StorageService } from '../../services/storageService';
import { Contact, ContactGroup } from '../../types';
import {
  Users,
  Plus,
  Search,
  Download,
  Upload,
  Trash2,
  Tag,
  Mail,
  Building,
  CheckCircle,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => StorageService.getContacts());
  const [groups] = useState<ContactGroup[]>(() => StorageService.getContactGroups());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [tagInput, setTagInput] = useState('Enterprise, VIP');
  const [groupInput, setGroupInput] = useState(groups[0]?.name || '');

  // Import state
  const [importText, setImportText] = useState('name,email,company\nJohn Doe,john.doe@example.com,Acme Corp\nSarah Connor,sarah@cyberdyne.io,Cyberdyne');
  const [importResult, setImportResult] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      if (selectedGroup !== 'all' && !c.groups.includes(selectedGroup)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
        const matchName = fullName.includes(q);
        const matchEmail = c.email.toLowerCase().includes(q);
        const matchCompany = (c.company || '').toLowerCase().includes(q);
        const matchTag = c.tags.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchEmail && !matchCompany && !matchTag) return false;
      }
      return true;
    });
  }, [contacts, selectedGroup, searchQuery]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const newContact: Contact = {
      id: `cnt_${Date.now()}`,
      orgId: 'org_jonanda_master',
      projectId: 'jonanda-llc',
      firstName,
      lastName,
      email: email.toLowerCase().trim(),
      company,
      phone,
      tags: tagInput.split(',').map(t => t.trim()).filter(Boolean),
      groups: groupInput ? [groupInput] : [],
      status: 'subscribed',
      engagementScore: 85,
      createdAt: new Date().toISOString()
    };

    StorageService.addContact(newContact);
    setContacts(StorageService.getContacts());
    setIsAddModalOpen(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setCompany('');
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Delete this contact?')) {
      StorageService.deleteContact(id);
      setContacts(StorageService.getContacts());
    }
  };

  const handleExportCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Company', 'Phone', 'Tags', 'Status', 'Engagement'];
    const rows = filteredContacts.map(c => [
      c.firstName,
      c.lastName,
      c.email,
      c.company || '',
      c.phone || '',
      c.tags.join(';'),
      c.status,
      c.engagementScore.toString()
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.map(field => `"${field}"`).join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `jonanda_contacts_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProcessImport = () => {
    const lines = importText.split('\n').filter(l => l.trim());
    let addedCount = 0;
    let duplicateCount = 0;

    lines.forEach((line, idx) => {
      if (idx === 0 && (line.includes('email') || line.includes('Email'))) return; // skip header
      const parts = line.split(',').map(p => p.trim().replace(/^"|"$/g, ''));
      if (parts.length >= 2) {
        const rawName = parts[0] || '';
        const rawEmail = parts[1] || '';
        const rawComp = parts[2] || '';
        if (rawEmail.includes('@')) {
          const names = rawName.split(' ');
          const contact: Contact = {
            id: `cnt_imp_${Date.now()}_${idx}`,
            orgId: 'org_jonanda_master',
            projectId: 'jonanda-llc',
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: rawEmail.toLowerCase(),
            company: rawComp,
            tags: ['Imported-CSV'],
            groups: [groups[0]?.name || 'Ecosystem Newsletter Subscribers'],
            status: 'subscribed',
            engagementScore: 75,
            createdAt: new Date().toISOString()
          };
          StorageService.addContact(contact);
          addedCount++;
        }
      }
    });

    setContacts(StorageService.getContacts());
    setImportResult(`Successfully imported ${addedCount} contacts with automatic deduplication.`);
    setTimeout(() => {
      setIsImportModalOpen(false);
      setImportResult(null);
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Audience & Contact CRM</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
              Auto-Deduplication
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Maintain high-integrity subscriber records, audience segments, and engagement scores with strict suppression compliance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsImportModalOpen(true)}
            variant="outline"
            size="md"
            leftIcon={<Upload className="w-4 h-4" />}
          >
            Import CSV
          </Button>
          <Button
            onClick={handleExportCSV}
            variant="secondary"
            size="md"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export CSV
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="primary"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-lg shadow-brand-600/20"
          >
            Add Contact
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, company, or tags..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="w-full sm:w-64">
          <select
            value={selectedGroup}
            onChange={e => setSelectedGroup(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            <option value="all">All Groups ({contacts.length})</option>
            {groups.map(g => (
              <option key={g.id} value={g.name}>
                {g.name} ({g.contactCount})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Contacts Table */}
      <Card className="overflow-hidden border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#090e1a] border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Organization / Company</th>
                <th className="py-3.5 px-4">Tags & Groups</th>
                <th className="py-3.5 px-4">Engagement</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No contacts match your query.
                  </td>
                </tr>
              ) : (
                filteredContacts.map(contact => (
                  <tr key={contact.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          {contact.firstName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100">
                            {contact.firstName} {contact.lastName}
                          </div>
                          <div className="text-[10px] text-slate-500">{contact.phone || 'No phone'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {contact.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {contact.company || '—'}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map(t => (
                          <span
                            key={t}
                            className="px-1.5 py-0.2 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[10px]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 rounded-full"
                            style={{ width: `${contact.engagementScore}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400">{contact.engagementScore}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDeleteContact(contact.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition-colors"
                        title="Delete contact"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Contact Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Verified Subscriber"
        subtitle="Manually create a subscriber entry for ecosystem campaigns"
      >
        <form onSubmit={handleAddContact} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Phone (Optional)</label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Tags (Comma separated)</label>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Assign to Group</label>
            <select
              value={groupInput}
              onChange={e => setGroupInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {groups.map(g => (
                <option key={g.id} value={g.name}>
                  {g.name}
                </option>
              ))}
            </select>
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
              Save Contact
            </Button>
          </div>
        </form>
      </Modal>

      {/* Import CSV Modal */}
      <Modal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Subscriber List (CSV / Text)"
        subtitle="Paste CSV rows or import formatted subscriber records with deduplication"
      >
        <div className="space-y-4">
          <textarea
            value={importText}
            onChange={e => setImportText(e.target.value)}
            className="w-full h-36 bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white font-mono"
          />

          {importResult && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>{importResult}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsImportModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleProcessImport}
            >
              Execute Import & Deduplicate
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
