import React, { useState } from 'react';
import { useMail } from '../../context/MailContext';
import {
  Reply,
  ReplyAll,
  Forward,
  Star,
  Archive,
  Trash2,
  Paperclip,
  Download,
  ShieldCheck,
  Send,
  User,
  MoreVertical
} from 'lucide-react';
import { Button } from '../common/Button';

export const ThreadView: React.FC = () => {
  const {
    activeThread,
    toggleStar,
    moveThreadToFolder,
    deleteThread,
    replyToThread,
    forwardThread,
    sendComposedEmail,
    openCompose
  } = useMail();

  const [quickReplyText, setQuickReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);

  if (!activeThread) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-slate-500 bg-[#070b14]">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-4 text-slate-600 border border-slate-800">
          <Reply className="w-8 h-8 rotate-180" />
        </div>
        <h3 className="text-base font-semibold text-slate-300 mb-1">No conversation selected</h3>
        <p className="text-xs text-slate-500 max-w-sm">
          Select an email thread from the inbox to inspect messages, view cryptographic verification signatures, and reply.
        </p>
      </div>
    );
  }

  const handleSendQuickReply = async () => {
    if (!quickReplyText.trim()) return;

    const lastMsg = activeThread.messages[activeThread.messages.length - 1];
    const replyRecipient = lastMsg ? lastMsg.from.email : activeThread.participants[0]?.email;

    setIsSendingReply(true);
    // Use openCompose or direct dispatch
    openCompose({
      mailboxId: activeThread.mailboxId,
      to: replyRecipient,
      subject: activeThread.subject.startsWith('Re:') ? activeThread.subject : `Re: ${activeThread.subject}`,
      threadId: activeThread.id,
      inReplyTo: lastMsg?.messageIdHeader,
      bodyHtml: `<p>${quickReplyText}</p><br/><blockquote>${lastMsg?.bodyHtml || ''}</blockquote>`
    });
    setQuickReplyText('');
    setIsSendingReply(false);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#060a14] h-full overflow-hidden">
      {/* Thread action header bar */}
      <div className="h-12 px-6 border-b border-slate-800/80 bg-[#090e1a] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleStar(activeThread.id)}
            className={`p-1.5 rounded-lg hover:bg-slate-800 transition-colors ${
              activeThread.isStarred ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
            title="Star thread"
          >
            <Star className={`w-4 h-4 ${activeThread.isStarred ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => moveThreadToFolder(activeThread.id, 'archive')}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title="Archive"
          >
            <Archive className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteThread(activeThread.id)}
            className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => replyToThread(activeThread)}
            variant="secondary"
            size="sm"
            leftIcon={<Reply className="w-3.5 h-3.5" />}
          >
            Reply
          </Button>
          <Button
            onClick={() => replyToThread(activeThread, true)}
            variant="secondary"
            size="sm"
            leftIcon={<ReplyAll className="w-3.5 h-3.5" />}
          >
            Reply All
          </Button>
          <Button
            onClick={() => forwardThread(activeThread)}
            variant="secondary"
            size="sm"
            leftIcon={<Forward className="w-3.5 h-3.5" />}
          >
            Forward
          </Button>
        </div>
      </div>

      {/* Conversation Thread Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Thread Subject Title */}
        <div className="border-b border-slate-800/80 pb-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {activeThread.subject}
            </h2>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-md text-xs font-mono shrink-0">
              <ShieldCheck className="w-4 h-4" />
              <span>SPF + DKIM + DMARC Verified</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {activeThread.labels.map(lbl => (
              <span
                key={lbl}
                className="px-2 py-0.5 text-xs rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium"
              >
                {lbl}
              </span>
            ))}
          </div>
        </div>

        {/* Message Chronological List */}
        <div className="space-y-4">
          {activeThread.messages.map((message, index) => (
            <div
              key={message.id}
              className="bg-[#0c1322] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4"
            >
              {/* Message Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                    {message.from.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">
                        {message.from.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        &lt;{message.from.email}&gt;
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      <span>To: {message.to.map(t => `${t.name} <${t.email}>`).join(', ')}</span>
                      {message.cc && message.cc.length > 0 && (
                        <span className="ml-2 text-slate-500">
                          Cc: {message.cc.map(c => c.email).join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-slate-400 shrink-0 font-mono">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>

              {/* Message Content */}
              <div className="pt-2 border-t border-slate-800/60 text-slate-200 text-sm leading-relaxed prose prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: message.bodyHtml || `<p>${message.bodyText}</p>` }}
                />
              </div>

              {/* Message Attachments */}
              {message.attachments.length > 0 && (
                <div className="pt-3 border-t border-slate-800/60 space-y-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Attachments ({message.attachments.length})
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {message.attachments.map(att => (
                      <div
                        key={att.id}
                        className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 hover:border-brand-500 transition-colors"
                      >
                        <Paperclip className="w-4 h-4 text-brand-400" />
                        <div>
                          <div className="font-semibold text-slate-100">{att.name}</div>
                          <div className="text-[10px] text-slate-500">
                            {(att.size / 1024).toFixed(0)} KB • {att.type.split('/')[1]?.toUpperCase() || 'FILE'}
                          </div>
                        </div>
                        <a
                          href="#download"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(`Downloading verified attachment: ${att.name}`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-brand-300 hover:bg-slate-800 rounded"
                          title="Download attachment"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Inline Reply Card */}
        <div className="bg-[#0c1322] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Quick Reply to Conversation</span>
            <span className="text-slate-500 font-mono text-[11px]">
              Active Mailbox: {activeThread.mailboxId}
            </span>
          </div>
          <textarea
            value={quickReplyText}
            onChange={e => setQuickReplyText(e.target.value)}
            placeholder="Type a quick reply to this thread..."
            className="w-full h-24 bg-slate-900/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none font-sans"
          />
          <div className="flex items-center justify-between pt-1">
            <Button
              onClick={() => replyToThread(activeThread)}
              variant="outline"
              size="sm"
            >
              Open Full Composer
            </Button>
            <Button
              onClick={handleSendQuickReply}
              variant="primary"
              size="sm"
              isLoading={isSendingReply}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Dispatch Reply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
