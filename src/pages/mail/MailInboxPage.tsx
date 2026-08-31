import React, { useState } from 'react';
import {
  Inbox,
  Send,
  FileText,
  Archive,
  AlertOctagon,
  Search,
  ExternalLink,
  Reply
} from 'lucide-react';
import { SEOHead } from '../../components/common/SEOHead';
import { useMail } from '../../context/MailContext';

export const MailInboxPage: React.FC = () => {
  const { messages, markMessageRead } = useMail();
  const [selectedFolder, setSelectedFolder] = useState<'inbox' | 'sent' | 'drafts' | 'archive' | 'spam'>('inbox');
  const [selectedMessageId, setSelectedMessageId] = useState<string>(messages[0]?.id || '');
  const [search, setSearch] = useState('');

  const filteredMessages = messages.filter((m) => {
    const matchesFolder = m.folder === selectedFolder;
    const matchesSearch =
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.toLowerCase().includes(search.toLowerCase()) ||
      m.snippet.toLowerCase().includes(search.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const activeMessage = messages.find((m) => m.id === selectedMessageId) || filteredMessages[0];

  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
    markMessageRead(id);
  };

  return (
    <>
      <SEOHead
        title="Webmail Client | JONANDA MAIL"
        description="Official webmail client interface for JONANDA LLC corporate correspondence and system notifications."
        canonicalPath="/mail/inbox"
      />

      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 mb-2">
              <Inbox className="w-3.5 h-3.5" />
              <span>Webmail Interface</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Corporate Inbox
            </h1>
          </div>

          <a
            href="https://mail.jonanda.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg text-xs px-4 py-2 gap-2 bg-gold-gradient text-gray-950 shadow-gold-sm hover:brightness-105"
          >
            <span>Open Dedicated Server (mail.jonanda.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mail Client Grid */}
        <div className="rounded-3xl bg-white dark:bg-[#0c0c14] border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
          {/* Left Folder Nav */}
          <div className="md:col-span-3 border-r border-gray-200 dark:border-white/10 p-4 space-y-4 bg-gray-50/50 dark:bg-[#0e0e18]">
            <a
              href="https://mail.jonanda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-gray-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Compose Message</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <nav className="space-y-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedFolder('inbox')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'inbox'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4" />
                  <span>Inbox</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-[10px] font-mono">
                  {messages.filter((m) => m.folder === 'inbox' && !m.isRead).length || messages.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('sent')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'sent'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-4 h-4" />
                  <span>Sent Items</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('drafts')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'drafts'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4" />
                  <span>Drafts</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('archive')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'archive'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Archive className="w-4 h-4" />
                  <span>Archive</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFolder('spam')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-colors ${
                  selectedFolder === 'spam'
                    ? 'bg-amber-500/15 text-amber-700 dark:text-gold-300 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertOctagon className="w-4 h-4" />
                  <span>Spam / Filtered</span>
                </div>
              </button>
            </nav>
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
                  placeholder="Search emails..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-gray-50 dark:bg-[#141420] border border-gray-300 dark:border-white/10 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Message Items List */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-white/[0.04]">
              {filteredMessages.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  Folder is empty.
                </div>
              ) : (
                filteredMessages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => handleSelectMessage(msg.id)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      selectedMessageId === msg.id
                        ? 'bg-amber-500/10 dark:bg-gold-500/10'
                        : 'hover:bg-gray-50 dark:hover:bg-white/[0.02]'
                    } ${!msg.isRead ? 'font-bold' : 'font-normal'}`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-900 dark:text-white truncate max-w-[140px]">
                        {msg.from}
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
          <div className="md:col-span-5 flex flex-col bg-white dark:bg-[#0c0c14] p-6">
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

                  <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
                    {activeMessage.subject}
                  </h2>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>
                      From: <strong className="text-gray-900 dark:text-white">{activeMessage.from}</strong>
                    </div>
                    <div>
                      To: <span className="font-mono">{activeMessage.to}</span>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {activeMessage.body}
                </div>

                {/* Action Shortcuts */}
                <div className="pt-6 border-t border-gray-200 dark:border-white/10 flex items-center gap-3">
                  <a
                    href="https://mail.jonanda.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5"
                  >
                    <Reply className="w-3.5 h-3.5" />
                    <span>Reply on mail.jonanda.com</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="py-24 text-center text-xs text-gray-500">
                Select an email from the list to view.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
