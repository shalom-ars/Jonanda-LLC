import React, { useState } from 'react';
import { FileText, Plus, Trash2, X } from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { CorporateCard } from '../../components/common/CorporateCard';
import { Button } from '../../components/common/Button';
import { useMail } from '../../context/MailContext';
import { EmailTemplate } from '../../types/mail';

export const MailTemplatesPage: React.FC = () => {
  const { templates, saveTemplate, deleteTemplate } = useMail();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeTemplate, setActiveTemplate] = useState<EmailTemplate>({
    id: '',
    name: '',
    category: 'Partner',
    subject: '',
    previewText: '',
    bodyHtml: '',
    variables: ['contactName', 'companyName'],
    updatedAt: '2026-08-31'
  });

  const filtered = templates.filter(
    (t) => selectedCategory === 'all' || t.category === selectedCategory
  );

  const handleEdit = (t: EmailTemplate) => {
    setActiveTemplate(t);
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setActiveTemplate({
      id: `tmpl_${Date.now()}`,
      name: '',
      category: 'Partner',
      subject: '',
      previewText: '',
      bodyHtml: '',
      variables: ['contactName', 'companyName'],
      updatedAt: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTemplate.name.trim() || !activeTemplate.subject.trim()) return;

    saveTemplate(activeTemplate);
    setIsModalOpen(false);
  };

  return (
    <>
      <SEOHead
        title="Email Templates Library | JONANDA MAIL"
        description="Design reusable dynamic email templates with variable substitution for partner and creator automations."
        canonicalPath="/mail/templates"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-500/30 mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Template Registry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
              Dynamic Email Templates
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Standardized corporate layouts reusable across JONANDA Flow automation pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {['all', 'Partner', 'Influencer', 'Campaign'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-amber-500/20 text-amber-700 dark:text-gold-300 border border-amber-500/40'
                      : 'bg-white dark:bg-surface/50 text-gray-500 border border-gray-200 dark:border-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <Button
              onClick={handleCreateNew}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              New Template
            </Button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t: EmailTemplate) => (
            <CorporateCard key={t.id} className="p-6 flex flex-col justify-between h-full space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    {t.category}
                  </span>
                  <span className="text-[10px] text-gray-500 font-mono">
                    Updated: {t.updatedAt}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {t.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-mono">
                    Subject: {t.subject}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#12121c] border border-gray-200 dark:border-white/[0.04] space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-gray-500 block uppercase">
                    Variables Supported:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {t.variables.map((v) => (
                      <span
                        key={v}
                        className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-gold-400 font-mono text-[10px]"
                      >
                        {`{{${v}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                <Button onClick={() => handleEdit(t)} variant="primary" size="sm" className="text-xs">
                  Edit Template
                </Button>

                <button
                  type="button"
                  onClick={() => deleteTemplate(t.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </CorporateCard>
          ))}
        </div>

        {/* Edit/Create Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-xl bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 pb-3">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {activeTemplate.id ? 'Edit Template' : 'New Template'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Template Name *</label>
                  <input
                    type="text"
                    required
                    value={activeTemplate.name}
                    onChange={(e) => setActiveTemplate({ ...activeTemplate, name: e.target.value })}
                    placeholder="e.g. Partner Verification Confirmation"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">Subject Line *</label>
                  <input
                    type="text"
                    required
                    value={activeTemplate.subject}
                    onChange={(e) => setActiveTemplate({ ...activeTemplate, subject: e.target.value })}
                    placeholder="e.g. Official Update on {{companyName}}"
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">HTML / Plaintext Body</label>
                  <textarea
                    rows={6}
                    value={activeTemplate.bodyHtml}
                    onChange={(e) => setActiveTemplate({ ...activeTemplate, bodyHtml: e.target.value })}
                    placeholder="<p>Hello {{contactName}},</p>..."
                    className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white font-mono"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button onClick={() => setIsModalOpen(false)} variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Template
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
