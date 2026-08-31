import React from 'react';
import { useMail } from '../../context/MailContext';
import { useProject } from '../../context/ProjectContext';
import { EmailFolder } from '../../types';
import {
  Inbox,
  Send,
  FileEdit,
  AlertOctagon,
  Trash2,
  Archive,
  Star,
  Tag,
  Plus,
  Mail
} from 'lucide-react';
import { Button } from '../common/Button';

export const MailSidebar: React.FC = () => {
  const { currentProjectId } = useProject();
  const {
    mailboxes,
    currentMailboxId,
    setCurrentMailboxId,
    currentFolder,
    setCurrentFolder,
    selectedTag,
    setSelectedTag,
    threads,
    openCompose
  } = useMail();

  const relevantMailboxes = currentProjectId === 'all'
    ? mailboxes
    : mailboxes.filter(m => m.projectId === currentProjectId);

  const folders: { id: EmailFolder; label: string; icon: any }[] = [
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'sent', label: 'Sent Messages', icon: Send },
    { id: 'drafts', label: 'Drafts', icon: FileEdit },
    { id: 'archive', label: 'Archive', icon: Archive },
    { id: 'spam', label: 'Spam & Junk', icon: AlertOctagon },
    { id: 'trash', label: 'Trash', icon: Trash2 },
  ];

  const getUnreadCountForFolder = (f: EmailFolder) => {
    return threads.filter(t => {
      if (t.folder !== f) return false;
      if (currentMailboxId !== 'all' && t.mailboxId !== currentMailboxId) return false;
      return !t.isRead;
    }).length;
  };

  const allTags = Array.from(new Set(threads.flatMap(t => t.labels)));

  return (
    <div className="w-64 bg-[#080d18] border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0 h-full">
      <div className="space-y-4">
        {/* Compose Action */}
        <Button
          onClick={() => openCompose()}
          variant="primary"
          size="md"
          leftIcon={<Plus className="w-4 h-4" />}
          className="w-full shadow-lg shadow-brand-600/20"
        >
          New Email
        </Button>

        {/* Mailbox Selector */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block px-1">
            Active Mailbox
          </label>
          <select
            value={currentMailboxId}
            onChange={e => setCurrentMailboxId(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500 font-mono"
          >
            <option value="all">Consolidated (All Mailboxes)</option>
            {relevantMailboxes.map(mbx => (
              <option key={mbx.id} value={mbx.id}>
                {mbx.email}
              </option>
            ))}
          </select>
        </div>

        {/* Folder navigation */}
        <div className="space-y-1 pt-2">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1">
            Folders
          </div>
          {folders.map(f => {
            const Icon = f.icon;
            const count = getUnreadCountForFolder(f.id);
            const isActive = currentFolder === f.id && selectedTag === null;

            return (
              <button
                key={f.id}
                onClick={() => {
                  setCurrentFolder(f.id);
                  setSelectedTag(null);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{f.label}</span>
                </div>
                {count > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-500 text-white">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Labels & Tags */}
        {allTags.length > 0 && (
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-2 py-1 flex items-center justify-between">
              <span>Labels</span>
              <Tag className="w-3 h-3" />
            </div>
            {allTags.map(tag => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isSelected ? null : tag)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400" />
                    <span>{tag}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Mailbox status indicator */}
      <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 space-y-1">
        <div className="flex items-center justify-between font-semibold text-slate-300">
          <span>Relay Protocol</span>
          <span className="text-emerald-400 font-mono">TLS 1.3 / SPF</span>
        </div>
        <p className="text-[10px] text-slate-500">
          Encrypted end-to-end transport with automated SPF & DKIM signature verification.
        </p>
      </div>
    </div>
  );
};
