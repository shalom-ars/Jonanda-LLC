import React, { useState } from 'react';
import { StorageService } from '../../services/storageService';
import { EmailTemplate, TemplateBlock, TemplateCategory } from '../../types';
import {
  FileText,
  Plus,
  Monitor,
  Smartphone,
  Trash2,
  Save,
  Type,
  Heading,
  MousePointer,
  Minus,
  Info,
  ShieldCheck,
  Check,
  Edit2
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>(() => StorageService.getTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(templates[0] || null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Editing state
  const [editName, setEditName] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editCategory, setEditCategory] = useState<TemplateCategory>('welcome');
  const [editBlocks, setEditBlocks] = useState<TemplateBlock[]>([]);
  const [editHtml, setEditHtml] = useState('');

  const categories: { id: TemplateCategory; label: string }[] = [
    { id: 'welcome', label: 'Welcome & Onboarding' },
    { id: 'newsletter', label: 'Newsletter & Digest' },
    { id: 'announcement', label: 'Announcement' },
    { id: 'product_update', label: 'Product Updates' },
    { id: 'security_alert', label: 'Security Advisory' },
    { id: 'transactional', label: 'Transactional' },
  ];

  const handleOpenEditor = (tpl?: EmailTemplate) => {
    if (tpl) {
      setEditName(tpl.name);
      setEditSubject(tpl.subject);
      setEditCategory(tpl.category);
      setEditBlocks(tpl.jsonBlocks || []);
      setEditHtml(tpl.htmlContent);
    } else {
      setEditName('New Ecosystem Template');
      setEditSubject('Subject line preview...');
      setEditCategory('newsletter');
      setEditBlocks([
        { id: 'b_head', type: 'heading', content: { text: 'JONANDA Announcement', level: 'h1', align: 'center' } },
        { id: 'b_body', type: 'text', content: { text: 'Enter your custom message here. All templates automatically support responsive email clients and mobile rendering.' } },
        { id: 'b_btn', type: 'button', content: { buttonText: 'Explore Ecosystem', url: 'https://jonanda.com', buttonColor: '#0e8ee9' } },
        { id: 'b_div', type: 'divider', content: {} },
        { id: 'b_unsub', type: 'unsubscribe', content: {} }
      ]);
      setEditHtml('');
    }
    setIsEditModalOpen(true);
  };

  const handleAddBlock = (type: TemplateBlock['type']) => {
    const newBlock: TemplateBlock = {
      id: `b_${Date.now()}`,
      type,
      content: {
        text: type === 'heading' ? 'Heading Title' : type === 'text' ? 'Paragraph content...' : '',
        level: 'h2',
        buttonText: 'Action Button',
        url: 'https://mail.jonanda.com'
      }
    };
    setEditBlocks([...editBlocks, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setEditBlocks(editBlocks.filter(b => b.id !== id));
  };

  const handleSaveTemplate = () => {
    // Generate compiled HTML from blocks if needed
    const compiledHtml = editHtml || `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0c1322; color: #f1f5f9; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
      ${editBlocks.map(b => {
        if (b.type === 'heading') return `<h2 style="color:#ffffff; margin: 16px 0 8px 0;">${b.content.text}</h2>`;
        if (b.type === 'text') return `<p style="color:#cbd5e1; line-height: 1.6; margin: 8px 0;">${b.content.text}</p>`;
        if (b.type === 'button') return `<div style="text-align: center; margin: 24px 0;"><a href="${b.content.url}" style="background: ${b.content.buttonColor || '#0e8ee9'}; color: #fff; padding: 10px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">${b.content.buttonText}</a></div>`;
        if (b.type === 'divider') return `<hr style="border: 0; border-top: 1px solid #1e293b; margin: 24px 0;" />`;
        if (b.type === 'unsubscribe') return `<div style="text-align: center; color: #64748b; font-size: 11px;"><p>JONANDA LLC • <a href="{{unsubscribeUrl}}" style="color: #64748b;">Unsubscribe</a></p></div>`;
        return '';
      }).join('')}
    </div>`;

    const newTemplate: EmailTemplate = {
      id: selectedTemplate?.id && isEditModalOpen ? selectedTemplate.id : `tpl_${Date.now()}`,
      orgId: 'org_jonanda_master',
      projectId: 'jonanda-llc',
      name: editName,
      category: editCategory,
      subject: editSubject,
      htmlContent: compiledHtml,
      jsonBlocks: editBlocks,
      updatedAt: new Date().toISOString()
    };

    StorageService.saveTemplate(newTemplate);
    const updated = StorageService.getTemplates();
    setTemplates(updated);
    setSelectedTemplate(newTemplate);
    setIsEditModalOpen(false);
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm('Delete this template?')) {
      StorageService.deleteTemplate(id);
      const updated = StorageService.getTemplates();
      setTemplates(updated);
      setSelectedTemplate(updated[0] || null);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Email Template Builder</h1>
            <span className="px-2.5 py-0.5 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono">
              Responsive Multi-Device
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Build and manage reusable responsive email templates with built-in unsubscribe compliance, branding, and cross-client compatibility.
          </p>
        </div>

        <Button
          onClick={() => handleOpenEditor()}
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-lg shadow-brand-600/20"
        >
          Create Template
        </Button>
      </div>

      {/* Grid: Template Library & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Template Library */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 flex items-center justify-between">
            <span>Template Library ({templates.length})</span>
            <FileText className="w-3.5 h-3.5" />
          </div>

          {templates.map(tpl => {
            const isSelected = selectedTemplate?.id === tpl.id;
            return (
              <Card
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`p-4 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-500 bg-brand-900/20 shadow-md shadow-brand-500/10'
                    : 'hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Badge variant="purple" size="sm">
                      {tpl.category}
                    </Badge>
                    <h3 className="font-bold text-sm text-white mt-1.5">{tpl.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{tpl.subject}</p>
                  </div>
                  {tpl.isSystem && (
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700 font-mono">
                      Preset
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Live Responsive Preview & Controls */}
        {selectedTemplate ? (
          <div className="lg:col-span-2 space-y-4">
            <Card className="p-5 space-y-4">
              {/* Preview Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-base font-bold text-white">{selectedTemplate.name}</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Subject: {selectedTemplate.subject}</p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Desktop / Mobile Switcher */}
                  <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                        previewMode === 'desktop' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Desktop view"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Desktop</span>
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-1.5 rounded text-xs flex items-center gap-1 transition-colors ${
                        previewMode === 'mobile' ? 'bg-brand-600 text-white' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title="Mobile view"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mobile</span>
                    </button>
                  </div>

                  <Button
                    onClick={() => handleOpenEditor(selectedTemplate)}
                    variant="secondary"
                    size="sm"
                    leftIcon={<Edit2 className="w-3.5 h-3.5" />}
                  >
                    Edit
                  </Button>

                  {!selectedTemplate.isSystem && (
                    <Button
                      onClick={() => handleDeleteTemplate(selectedTemplate.id)}
                      variant="outline"
                      size="sm"
                      className="text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Rendered Email Canvas */}
              <div className="bg-[#050811] p-6 rounded-xl border border-slate-800 flex justify-center overflow-x-auto min-h-[420px]">
                <div
                  className={`transition-all duration-300 w-full ${
                    previewMode === 'mobile' ? 'max-w-[360px] shadow-2xl border border-slate-700 rounded-2xl p-2 bg-[#0c1322]' : 'max-w-2xl'
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: selectedTemplate.htmlContent }}
                    className="w-full text-slate-100"
                  />
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <Card className="lg:col-span-2 p-12 text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-3 text-slate-600" />
            <p>Select a template to view or customize.</p>
          </Card>
        )}
      </div>

      {/* Template Visual Block Editor Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        maxWidth="4xl"
        title="Visual Template Builder"
        subtitle="Configure structured email blocks with responsive typography and compliance tags"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Template Name</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select
                value={editCategory}
                onChange={e => setEditCategory(e.target.value as TemplateCategory)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Default Subject</label>
              <input
                type="text"
                value={editSubject}
                onChange={e => setEditSubject(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Add Block Palette */}
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
              Add Content Block:
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Heading className="w-3.5 h-3.5" />}
              onClick={() => handleAddBlock('heading')}
            >
              Heading
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Type className="w-3.5 h-3.5" />}
              onClick={() => handleAddBlock('text')}
            >
              Paragraph
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<MousePointer className="w-3.5 h-3.5" />}
              onClick={() => handleAddBlock('button')}
            >
              CTA Button
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Minus className="w-3.5 h-3.5" />}
              onClick={() => handleAddBlock('divider')}
            >
              Divider
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
              onClick={() => handleAddBlock('unsubscribe')}
            >
              Unsubscribe Footer
            </Button>
          </div>

          {/* Blocks Editor List */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {editBlocks.map((block, idx) => (
              <div
                key={block.id}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                      {block.type}
                    </span>
                    <span className="text-xs text-slate-500">Block #{idx + 1}</span>
                  </div>

                  {block.type === 'heading' && (
                    <input
                      type="text"
                      value={block.content.text || ''}
                      onChange={e => {
                        const updated = [...editBlocks];
                        updated[idx].content.text = e.target.value;
                        setEditBlocks(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                      placeholder="Heading text..."
                    />
                  )}

                  {block.type === 'text' && (
                    <textarea
                      value={block.content.text || ''}
                      onChange={e => {
                        const updated = [...editBlocks];
                        updated[idx].content.text = e.target.value;
                        setEditBlocks(updated);
                      }}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white h-16 resize-none"
                      placeholder="Paragraph text..."
                    />
                  )}

                  {block.type === 'button' && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={block.content.buttonText || ''}
                        onChange={e => {
                          const updated = [...editBlocks];
                          updated[idx].content.buttonText = e.target.value;
                          setEditBlocks(updated);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        placeholder="Button label..."
                      />
                      <input
                        type="text"
                        value={block.content.url || ''}
                        onChange={e => {
                          const updated = [...editBlocks];
                          updated[idx].content.url = e.target.value;
                          setEditBlocks(updated);
                        }}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-mono"
                        placeholder="https://..."
                      />
                    </div>
                  )}

                  {block.type === 'unsubscribe' && (
                    <p className="text-xs text-slate-400 italic">
                      Automated 1-click unsubscribe block inserted with company address footer.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveBlock(block.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              leftIcon={<Save className="w-4 h-4" />}
              onClick={handleSaveTemplate}
            >
              Save Template
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
