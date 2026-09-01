import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Plus,
  Search,
  Trash2,
  X,
  Download,
  Mail,
  Upload,
  CheckCircle2
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { useMail } from '../../context/MailContext';
import { EmailContact } from '../../types/mail';

export const MailContactsPage: React.FC = () => {
  const navigate = useNavigate();
  const { contacts, addContact, deleteContact } = useMail();
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    company: '',
    tags: 'Strategic Partner',
    lists: 'Corporate Partners'
  });

  const allTags = Array.from(new Set(contacts.flatMap((c) => c.tags || [])));

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(search.toLowerCase()));
    const matchesTag = selectedTag === 'all' || (c.tags && c.tags.includes(selectedTag));
    return matchesSearch && matchesTag;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name.trim() || !newContact.email.trim()) return;

    addContact({
      name: newContact.name.trim(),
      email: newContact.email.trim(),
      company: newContact.company.trim() || undefined,
      tags: newContact.tags.split(',').map((t) => t.trim()).filter(Boolean),
      lists: newContact.lists.split(',').map((l) => l.trim()).filter(Boolean),
      status: 'active',
      source: 'Manual Entry'
    });

    setNewContact({ name: '', email: '', company: '', tags: 'Strategic Partner', lists: 'Corporate Partners' });
    setIsAddModalOpen(false);
    setToastMessage('New audience contact added successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Tags', 'Lists', 'Status', 'Source', 'CreatedAt'];
    const rows = contacts.map((c) => [
      `"${c.name}"`,
      `"${c.email}"`,
      `"${c.company || ''}"`,
      `"${c.tags.join(';')}"`,
      `"${c.lists.join(';')}"`,
      `"${c.status}"`,
      `"${c.source}"`,
      `"${c.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jonanda_mail_contacts_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage('Audience contacts exported to CSV.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleImportSample = () => {
    addContact({
      name: 'Dr. Alexander Vance',
      email: 'a.vance@ai-governance.org',
      company: 'Global AI Institute',
      tags: ['AI Research', 'Governance', 'Enterprise'],
      lists: ['Corporate Partners', 'Research'],
      status: 'active',
      source: 'CSV Import'
    });
    setToastMessage('Sample audience contact imported successfully.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      <SEOHead
        title="Audience & Contacts | JONANDA MAIL"
        description="Manage partner rosters, influencer segments, and email suppression compliance."
        canonicalPath="/mail/contacts"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-xs font-semibold text-amber-700 dark:text-gold-300 border border-amber-500/30 mb-3">
              <Users className="w-3.5 h-3.5" />
              <span>Audience Management • JONANDA MAIL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Audience & Contact Ledger
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Centralized verified recipient registry linked with JONANDA FLOW automated pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              Export CSV
            </Button>

            <Button
              onClick={handleImportSample}
              variant="secondary"
              size="sm"
              icon={<Upload className="w-3.5 h-3.5" />}
            >
              Import Sample
            </Button>

            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
            >
              Add Contact
            </Button>
          </div>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{toastMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="p-1 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter Controls */}
        <div className="p-4 rounded-2xl bg-white dark:bg-surface/70 border border-gray-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or company..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-300 dark:border-white/10 text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="all">All Tags ({contacts.length})</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="rounded-3xl bg-white dark:bg-surface/60 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-white/[0.03] border-b border-gray-200 dark:border-white/10 text-gray-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-5">Contact</th>
                  <th className="py-3.5 px-5">Organization</th>
                  <th className="py-3.5 px-5">Tags & Lists</th>
                  <th className="py-3.5 px-5">Source</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-white/[0.04]">
                {filtered.map((contact: EmailContact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3.5 px-5">
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white block">
                          {contact.name}
                        </span>
                        <span className="font-mono text-gray-500 text-[11px]">
                          {contact.email}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-gray-700 dark:text-gray-300 font-medium">
                      {contact.company || '—'}
                    </td>

                    <td className="py-3.5 px-5">
                      <div className="flex flex-wrap gap-1">
                        {contact.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-gold-300 border border-amber-500/20 text-[10px] font-bold"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="py-3.5 px-5 text-gray-500 text-[11px]">
                      {contact.source}
                    </td>

                    <td className="py-3.5 px-5">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                          contact.status === 'active'
                            ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                            : 'bg-gray-100 text-gray-500 border-gray-300'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate('/mail/inbox')}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-500/10"
                          title="Open in Inbox"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteContact(contact.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                          title="Delete Contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Contact Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-md bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 dark:text-gold-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Add Audience Contact
                  </h3>
                </div>
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
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="e.g. Jordan Lee"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Company (Optional)</label>
                  <input
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                    placeholder="e.g. Apex AI Labs"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={newContact.tags}
                    onChange={(e) => setNewContact({ ...newContact, tags: e.target.value })}
                    placeholder="Partner, AI, VIP"
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsAddModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Contact
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
