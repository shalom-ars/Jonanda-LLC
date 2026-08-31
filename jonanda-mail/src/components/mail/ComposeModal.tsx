import React, { useState } from 'react';
import { useMail } from '../../context/MailContext';
import {
  X,
  Send,
  Paperclip,
  Trash2,
  Maximize2,
  Minimize2,
  ShieldCheck,
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Quote,
  Code,
  AlertCircle
} from 'lucide-react';
import { Button } from '../common/Button';

export const ComposeModal: React.FC = () => {
  const {
    mailboxes,
    composeState,
    closeCompose,
    updateCompose,
    sendComposedEmail,
    saveDraftEmail
  } = useMail();

  const [isMaximized, setIsMaximized] = useState(false);
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!composeState.isOpen) return null;

  const currentMailbox = mailboxes.find(m => m.id === composeState.mailboxId) || mailboxes[0];

  const handleSend = async () => {
    if (!composeState.to.trim()) {
      setErrorMessage('Please specify at least one recipient address.');
      return;
    }
    if (!composeState.subject.trim()) {
      setErrorMessage('Please provide an email subject line.');
      return;
    }

    setErrorMessage(null);
    setIsSending(true);
    const success = await sendComposedEmail();
    setIsSending(false);
    if (!success) {
      setErrorMessage('Failed to send email. Check delivery settings.');
    }
  };

  const handleAttachMockFile = () => {
    const mockFiles = [
      { id: `att_${Date.now()}_1`, name: 'JONANDA_Architecture_Overview.pdf', size: 1420000, type: 'application/pdf' },
      { id: `att_${Date.now()}_2`, name: 'LOZULA_Security_Telemetry.json', size: 45000, type: 'application/json' },
      { id: `att_${Date.now()}_3`, name: 'EqualShare_Grant_Proposal.docx', size: 680000, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    ];
    const picked = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    updateCompose({
      attachments: [...composeState.attachments, picked]
    });
  };

  const removeAttachment = (id: string) => {
    updateCompose({
      attachments: composeState.attachments.filter(a => a.id !== id)
    });
  };

  const appendFormatting = (tag: string) => {
    let newContent = composeState.bodyHtml;
    if (tag === 'b') newContent += ' <strong>bold text</strong> ';
    if (tag === 'i') newContent += ' <em>italic text</em> ';
    if (tag === 'code') newContent += ' <code>code snippet</code> ';
    if (tag === 'quote') newContent += ' <blockquote>Quoted text reference</blockquote> ';
    if (tag === 'ul') newContent += ' <ul><li>Bullet item 1</li><li>Bullet item 2</li></ul> ';
    if (tag === 'ol') newContent += ' <ol><li>Numbered item 1</li><li>Numbered item 2</li></ol> ';
    if (tag === 'link') newContent += ' <a href="https://jonanda.com" style="color:#0e8ee9">Link reference</a> ';
    updateCompose({ bodyHtml: newContent });
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-200 ${
        isMaximized
          ? 'inset-4 bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl flex flex-col'
          : 'bottom-4 right-6 w-full max-w-2xl bg-[#0c1322] border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[640px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-[#080d18] rounded-t-2xl">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-100">
            {composeState.subject ? composeState.subject : 'New Message'}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" />
            <span>DKIM Signed</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="p-1 hover:text-white rounded hover:bg-slate-800"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={closeCompose}
            className="p-1 hover:text-white rounded hover:bg-slate-800"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Error alert */}
      {errorMessage && (
        <div className="mx-4 mt-3 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Fields */}
      <div className="px-5 py-3 space-y-2.5 border-b border-slate-800/80 text-xs">
        {/* From Mailbox selector */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 w-12 text-right shrink-0">From:</span>
          <select
            value={composeState.mailboxId}
            onChange={e => updateCompose({ mailboxId: e.target.value })}
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          >
            {mailboxes.map(mbx => (
              <option key={mbx.id} value={mbx.id}>
                {mbx.displayName} &lt;{mbx.email}&gt;
              </option>
            ))}
          </select>
        </div>

        {/* To Field */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 w-12 text-right shrink-0">To:</span>
          <input
            type="text"
            placeholder="Recipients (comma separated)..."
            value={composeState.to}
            onChange={e => updateCompose({ to: e.target.value })}
            className="flex-1 bg-transparent border-b border-slate-800 px-2 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
          {!showCcBcc && (
            <button
              onClick={() => setShowCcBcc(true)}
              className="text-[11px] text-slate-400 hover:text-brand-400"
            >
              Cc / Bcc
            </button>
          )}
        </div>

        {/* CC & BCC */}
        {showCcBcc && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 w-12 text-right shrink-0">Cc:</span>
              <input
                type="text"
                placeholder="Carbon copy..."
                value={composeState.cc}
                onChange={e => updateCompose({ cc: e.target.value })}
                className="flex-1 bg-transparent border-b border-slate-800 px-2 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 w-12 text-right shrink-0">Bcc:</span>
              <input
                type="text"
                placeholder="Blind copy..."
                value={composeState.bcc}
                onChange={e => updateCompose({ bcc: e.target.value })}
                className="flex-1 bg-transparent border-b border-slate-800 px-2 py-1 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </>
        )}

        {/* Subject */}
        <div className="flex items-center gap-3">
          <span className="text-slate-400 w-12 text-right shrink-0">Subject:</span>
          <input
            type="text"
            placeholder="Email subject..."
            value={composeState.subject}
            onChange={e => updateCompose({ subject: e.target.value })}
            className="flex-1 bg-transparent border-b border-slate-800 px-2 py-1 text-slate-100 font-medium placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Rich Formatting Toolbar */}
      <div className="px-5 py-2 border-b border-slate-800/60 bg-[#090f1d] flex items-center gap-2 text-slate-400">
        <button
          onClick={() => appendFormatting('b')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Bold"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('i')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Italic"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('code')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Code block"
        >
          <Code className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('quote')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Quote"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('ul')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('ol')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Numbered list"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => appendFormatting('link')}
          className="p-1.5 hover:text-white rounded hover:bg-slate-800"
          title="Insert Link"
        >
          <Link2 className="w-3.5 h-3.5" />
        </button>
        <div className="h-4 w-px bg-slate-800 mx-1" />
        <button
          onClick={handleAttachMockFile}
          className="flex items-center gap-1 text-xs text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800"
          title="Attach files"
        >
          <Paperclip className="w-3.5 h-3.5" />
          <span>Attach File</span>
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-5 overflow-y-auto">
        <textarea
          value={composeState.bodyHtml}
          onChange={e => updateCompose({ bodyHtml: e.target.value })}
          placeholder="Compose your message here... Supports formatted HTML & plain text."
          className="w-full h-full min-h-[160px] bg-transparent text-sm text-slate-100 placeholder-slate-600 resize-none focus:outline-none font-sans leading-relaxed"
        />

        {/* Attachments chips */}
        {composeState.attachments.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2">
            {composeState.attachments.map(att => (
              <div
                key={att.id}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
              >
                <Paperclip className="w-3.5 h-3.5 text-brand-400" />
                <span className="font-medium">{att.name}</span>
                <span className="text-slate-500">({(att.size / 1024).toFixed(0)} KB)</span>
                <button
                  onClick={() => removeAttachment(att.id)}
                  className="text-slate-400 hover:text-rose-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer controls */}
      <div className="px-5 py-3.5 border-t border-slate-800 bg-[#080d18] rounded-b-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={handleSend}
            variant="primary"
            size="md"
            isLoading={isSending}
            leftIcon={<Send className="w-4 h-4" />}
          >
            Send Message
          </Button>
          <Button
            onClick={saveDraftEmail}
            variant="outline"
            size="md"
          >
            Save Draft
          </Button>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <div className="hidden sm:block text-[11px] text-slate-500 font-mono">
            SPF: pass • DKIM: 2048-bit • TLS 1.3
          </div>
          <button
            onClick={closeCompose}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg"
            title="Discard draft"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
