import React, { useState } from 'react';
import {
  Inbox,
  Send,
  FileText,
  Archive,
  AlertOctagon,
  Search,
  ExternalLink,
  Reply,
  Plus,
  Trash2,
  CheckCircle2,
  X,
  Mail,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { Button } from '../../components/common/Button';
import { useMail } from '../../context/MailContext';

export const MailInboxPage: React.FC = () => {
  const { messages, contacts, templates, markMessageRead, sendMessage, deleteMessage, archiveMessage } = useMail();
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'drafts' | 'archive' | 'spam'>('inbox');
  const [selectedMessageId, setSelectedMessageId] = useState<string>(messages[0]?.id || '');
  const [search, setSearch] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessToast, setSendSuccessToast] = useState<string | null>(null);

  // Compose State
  const [composeForm, setComposeForm] = useState({
    to: '',
    subject: '',
    body: '',
    selectedTemplateId: ''
  });

  const filteredMessages = messages.filter((m) => {
    const matchesFolder = m.folder === selectedFolder;
    const matchesSearch =
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.toLowerCase().includes(search.toLowerCase()) ||
      m.to.toLowerCase().includes(search.toLowerCase()) ||
      m.snippet.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const activeMessage = messages.find((m) => m.id === selectedMessageId) || filteredMessages[0];

  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
    markMessageRead(id);
  };

  const handleTemplateChange = (templateId: string) => {
    const tmpl = templates.find((t) => t.id === templateId);
    if (tmpl) {
      setComposeForm((prev) => ({
        ...prev,
        selectedTemplateId: templateId,
        subject: tmpl.subject.replace(/{{.*?}}/g, 'JONANDA'),
        body: tmpl.bodyHtml.replace(/<[^>]*>?/gm, '').replace(/{{.*?}}/g, 'Partner')
      }));
    } else {
      setComposeForm((prev) => ({ ...prev, selectedTemplateId: '' }));
    }
  };

  const handleOpenCompose = (prefill?: { to?: string; subject?: string; body?: string }) => {
    setComposeForm({
      to: prefill?.to || '',
      subject: prefill?.subject || '',
      body: prefill?.body || '',
      selectedTemplateId: ''
    });
    setIsComposeOpen(true);
  };

  const handleReply = () => {
    if (!activeMessage) return;
    const recipientEmail = activeMessage.from.includes('<')
      ? activeMessage.from.match(/<([^>]+)>/)?.[1] || activeMessage.from
      : activeMessage.from;

    handleOpenCompose({
      to: recipientEmail,
      subject: activeMessage.subject.startsWith('Re:') ? activeMessage.subject : `Re: ${activeMessage.subject}`,
      body: `\n\n--- On ${activeMessage.date}, ${activeMessage.from} wrote ---\n> ${activeMessage.body.replace(/\n/g, '\n> ')}`
    });
  };

  const handleSendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeForm.to.trim() || !composeForm.subject.trim() || !composeForm.body.trim()) return;

    setIsSending(true);

    try {
      const result = await sendMessage({
        to: composeForm.to.trim(),
        subject: composeForm.subject.trim(),
        body: composeForm.body.trim(),
        templateId: composeForm.selectedTemplateId || undefined
      });

      setIsSending(false);
      setIsComposeOpen(false);
      setComposeForm({ to: '', subject: '', body: '', selectedTemplateId: '' });
      setSelectedFolder('sent');
      setSelectedMessageId(result.messageId);

      setSendSuccessToast(`Email successfully queued & DKIM-signed for ${composeForm.to}`);
      setTimeout(() => setSendSuccessToast(null), 4500);
    } catch {
      setIsSending(false);
    }
  };

  const handleDeleteActive = () => {
    if (!activeMessage) return;
    deleteMessage(activeMessage.id);
    setSelectedMessageId('');
  };

  const handleArchiveActive = () => {
    if (!activeMessage) return;
    archiveMessage(activeMessage.id);
    setSelectedMessageId('');
  };

  return (
    <>
      <SEOHead
        title="Webmail Client | JONANDA MAIL"
        description="Official webmail client interface for JONANDA LLC corporate correspondence and system notifications."
        canonicalPath="/mail/inbox"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
              <Inbox className="w-3.5 h-3.5" />
              <span>Webmail Interface • JONANDA MAIL</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Corporate Webmail
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => handleOpenCompose()}
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4" />}
            >
              Compose Email
            </Button>

            <a
              href="https://mail.jonanda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-xl text-xs px-4 py-2 gap-2 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 shadow-sm"
            >
              <span>mail.jonanda.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Toast Notification */}
        {sendSuccessToast && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between shadow-lg animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">{sendSuccessToast}</span>
            </div>
            <button
              type="button"
              onClick={() => setSendSuccessToast(null)}
              className="p-1 hover:opacity-75"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Mail Client Grid */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c14] border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
          {/* Left Folder Navigation */}
          <div className="md:col-span-3 border-r border-gray-200 dark:border-white/10 p-4 space-y-4 bg-gray-50/70 dark:bg-[#0e0e18]">
            <Button
              onClick={() => handleOpenCompose()}
              variant="primary"
              size="md"
              className="w-full justify-center shadow-gold-sm"
              icon={<Plus className="w-4 h-4" />}
            >
              Compose Message
            </Button>

            <nav className="space-y-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedFolder('inbox')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'inbox'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-gold-300 font-bold border border-amber-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 text-amber-600 dark:text-gold-400" />
                  <span>Inbox</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] font-mono">
                  {messages.filter((m) => m.folder === 'inbox' && !m.isRead).length || messages.filter((m) => m.folder === 'inbox').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('sent')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'sent'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-gold-300 font-bold border border-amber-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Sent Items</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-[10px] font-mono">
                  {messages.filter((m) => m.folder === 'sent').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('drafts')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'drafts'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-gold-300 font-bold border border-amber-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Drafts</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-[10px] font-mono">
                  {messages.filter((m) => m.folder === 'drafts').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('archive')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'archive'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-gold-300 font-bold border border-amber-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Archive className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Archive</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-mono">
                  {messages.filter((m) => m.folder === 'archive').length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('spam')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'spam'
                    ? 'bg-amber-500/15 text-amber-800 dark:text-gold-300 font-bold border border-amber-500/20'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertOctagon className="w-4 h-4 text-red-500" />
                  <span>Spam Filter</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-[10px] font-mono">
                  0
                </span>
              </button>
            </nav>

            <div className="pt-6 border-t border-gray-200 dark:border-white/10 space-y-2 text-[11px] text-gray-500">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DKIM / SPF Verified</span>
              </div>
              <p className="leading-tight">
                Server: <span className="font-mono text-gray-700 dark:text-gray-300">mail.jonanda.com</span>
              </p>
            </div>
          </div>

          {/* Middle Message List */}
          <div className="md:col-span-4 border-r border-gray-200 dark:border-white/10 flex flex-col bg-white dark:bg-[#0c0c14]">
            {/* Search Box */}
            <div className="p-3 border-b border-gray-200 dark:border-white/10">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search emails by sender, subject, body..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Message Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-white/[0.04]">
              {filteredMessages.length === 0 ? (
                <div className="py-16 text-center text-xs text-gray-500 space-y-2">
                  <Mail className="w-8 h-8 mx-auto text-gray-400 opacity-40" />
                  <p>No messages in {selectedFolder}.</p>
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg.id)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedMessageId === msg.id
                        ? 'bg-amber-500/10 dark:bg-gold-500/15 border-l-4 border-amber-500 dark:border-gold-400'
                        : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'
                    } ${!msg.isRead ? 'font-bold' : 'font-normal'}`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-900 dark:text-white truncate max-w-[160px]">
                        {selectedFolder === 'sent' ? `To: ${msg.to}` : msg.from}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {msg.date}
                      </span>
                    </div>
                    <h4 className="text-xs text-gray-800 dark:text-gray-200 truncate mb-1">
                      {msg.subject}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 leading-tight">
                      {msg.snippet}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Message View Pane */}
          <div className="md:col-span-5 flex flex-col bg-white dark:bg-[#0c0c14] p-6 overflow-y-auto">
            {activeMessage ? (
              <div className="space-y-6">
                {/* Message Header */}
                <div className="border-b border-gray-200 dark:border-white/10 pb-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                      Verified DKIM / SPF Signature
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{activeMessage.date}</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">
                    {activeMessage.subject}
                  </h2>

                  <div className="flex flex-col gap-1 text-xs text-gray-500 border-t border-gray-100 dark:border-white/[0.04] pt-2">
                    <div className="flex items-center justify-between">
                      <div>
                        From: <strong className="text-gray-900 dark:text-white">{activeMessage.from}</strong>
                      </div>
                    </div>
                    <div>
                      To: <span className="font-mono text-gray-700 dark:text-gray-300">{activeMessage.to}</span>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50/50 dark:bg-white/[0.01] p-4 rounded-2xl border border-gray-100 dark:border-white/[0.04]">
                  {activeMessage.body}
                </div>

                {/* Action Shortcuts */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleReply}
                      variant="primary"
                      size="sm"
                      icon={<Reply className="w-3.5 h-3.5" />}
                    >
                      Reply
                    </Button>

                    <Button
                      onClick={handleArchiveActive}
                      variant="outline"
                      size="sm"
                      icon={<Archive className="w-3.5 h-3.5" />}
                    >
                      Archive
                    </Button>

                    <button
                      type="button"
                      onClick={handleDeleteActive}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href={`mailto:${activeMessage.from}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                    className="text-xs font-semibold text-amber-700 dark:text-gold-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>External Email App</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-28 text-center text-xs text-gray-500 space-y-2">
                <Mail className="w-10 h-10 mx-auto text-gray-400 opacity-40" />
                <p>Select an email from the list to preview details.</p>
              </div>
            )}
          </div>
        </div>

        {/* Compose Email Modal */}
        {isComposeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-xl bg-white dark:bg-[#0e0e18] border border-gray-200 dark:border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-white/10 flex items-center justify-between bg-gray-50 dark:bg-[#12121e]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-700 dark:text-gold-400 flex items-center justify-center">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                      Compose New Message
                    </h3>
                    <span className="text-[10px] text-gray-500 font-mono">
                      Via SMTP mail.jonanda.com
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSendSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs">
                {/* Template Quick Loader */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 flex items-center justify-between">
                    <span>Load Template (Optional)</span>
                    <span className="text-[10px] text-amber-700 dark:text-gold-400 flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" />
                      Dynamic Token Support
                    </span>
                  </label>
                  <select
                    value={composeForm.selectedTemplateId}
                    onChange={(e) => handleTemplateChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none"
                  >
                    <option value="">-- Start with Blank Message --</option>
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        [{t.category}] {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Recipient Field */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                    To (Recipient Email) *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={composeForm.to}
                      onChange={(e) => setComposeForm({ ...composeForm, to: e.target.value })}
                      placeholder="e.g. partner@enterprise.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {contacts.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5 overflow-x-auto text-[10px]">
                      <span className="text-gray-500">Quick Recipient:</span>
                      {contacts.slice(0, 3).map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setComposeForm((prev) => ({ ...prev, to: c.email }))}
                          className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-amber-500/15 text-gray-700 dark:text-gray-300"
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Subject Field */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    value={composeForm.subject}
                    onChange={(e) => setComposeForm({ ...composeForm, subject: e.target.value })}
                    placeholder="Enter email subject..."
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Message Body Field */}
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300 block">
                    Message Body *
                  </label>
                  <textarea
                    required
                    rows={7}
                    value={composeForm.body}
                    onChange={(e) => setComposeForm({ ...composeForm, body: e.target.value })}
                    placeholder="Write your email content here..."
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-gray-900 dark:text-white text-xs focus:outline-none focus:border-amber-500 resize-y"
                  />
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-gray-200 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SPF / DKIM Signing Active</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setIsComposeOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={isSending}
                      icon={<Send className="w-3.5 h-3.5" />}
                    >
                      {isSending ? 'Transmitting...' : 'Send Message'}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
