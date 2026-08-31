import React, { useState } from 'react';
import { useMail } from '../../context/MailContext';
import { EmailThread } from '../../types';
import {
  Star,
  Mail,
  MailOpen,
  Trash2,
  Archive,
  Paperclip,
  CheckSquare,
  Square,
  RefreshCw,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const ThreadList: React.FC = () => {
  const {
    filteredThreads,
    activeThreadId,
    setActiveThreadId,
    toggleStar,
    markThreadRead,
    moveThreadToFolder,
    deleteThread,
    refreshMail,
    currentFolder
  } = useMail();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredThreads.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredThreads.map(t => t.id));
    }
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteThread(id));
    setSelectedIds([]);
  };

  const handleBulkArchive = () => {
    selectedIds.forEach(id => moveThreadToFolder(id, 'archive'));
    setSelectedIds([]);
  };

  const handleBulkMarkRead = (isRead: boolean) => {
    selectedIds.forEach(id => markThreadRead(id, isRead));
    setSelectedIds([]);
  };

  const formatTimestamp = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-[#070b14] h-full border-r border-slate-800/80">
      {/* Top toolbar */}
      <div className="h-12 px-4 border-b border-slate-800/80 bg-[#090e1a] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={selectAll}
            className="text-slate-400 hover:text-white p-1 rounded"
            title="Select all"
          >
            {selectedIds.length > 0 && selectedIds.length === filteredThreads.length ? (
              <CheckSquare className="w-4 h-4 text-brand-400" />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </button>

          {selectedIds.length > 0 ? (
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-xs font-semibold text-brand-300">
                {selectedIds.length} selected
              </span>
              <div className="h-4 w-px bg-slate-800 mx-1" />
              <button
                onClick={() => handleBulkMarkRead(true)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Mark as read"
              >
                <MailOpen className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleBulkMarkRead(false)}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Mark as unread"
              >
                <Mail className="w-4 h-4" />
              </button>
              <button
                onClick={handleBulkArchive}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Archive"
              >
                <Archive className="w-4 h-4" />
              </button>
              <button
                onClick={handleBulkDelete}
                className="p-1 text-slate-400 hover:text-rose-400 rounded hover:bg-slate-800"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                {currentFolder}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                ({filteredThreads.length} {filteredThreads.length === 1 ? 'thread' : 'threads'})
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => refreshMail()}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            title="Refresh mailbox"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Threads list */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
        {filteredThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-500">
            <Mail className="w-12 h-12 stroke-[1.2] mb-3 text-slate-600" />
            <h4 className="text-sm font-medium text-slate-300 mb-1">No messages in {currentFolder}</h4>
            <p className="text-xs text-slate-500 max-w-xs">
              Conversations belonging to this mailbox and folder will appear here.
            </p>
          </div>
        ) : (
          filteredThreads.map(thread => {
            const isActive = activeThreadId === thread.id;
            const isSelected = selectedIds.includes(thread.id);
            const hasAttachments = thread.messages.some(m => m.attachments.length > 0);

            return (
              <div
                key={thread.id}
                onClick={() => {
                  setActiveThreadId(thread.id);
                  if (!thread.isRead) {
                    markThreadRead(thread.id, true);
                  }
                }}
                className={`flex items-start gap-3 p-3.5 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-brand-900/30 border-l-4 border-l-brand-500'
                    : !thread.isRead
                    ? 'bg-[#0b1220] hover:bg-[#0f172a]'
                    : 'bg-transparent hover:bg-slate-900/40'
                }`}
              >
                {/* Select Checkbox & Star */}
                <div className="flex items-center gap-2 pt-0.5" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={e => toggleSelect(thread.id, e)}
                    className="text-slate-500 hover:text-slate-300"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-3.5 h-3.5 text-brand-400" />
                    ) : (
                      <Square className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleStar(thread.id)}
                    className={`hover:scale-110 transition-transform ${
                      thread.isStarred ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${thread.isStarred ? 'fill-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Content preview */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`text-xs truncate ${
                          !thread.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'
                        }`}
                      >
                        {thread.participants.map(p => p.name || p.email).join(', ')}
                      </span>
                      {thread.messageCount > 1 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono font-bold">
                          {thread.messageCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-500">
                      {hasAttachments && <Paperclip className="w-3.5 h-3.5 text-slate-400" />}
                      <span className="font-mono">{formatTimestamp(thread.lastMessageAt)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs truncate ${
                        !thread.isRead ? 'font-semibold text-brand-300' : 'text-slate-300'
                      }`}
                    >
                      {thread.subject}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 truncate mt-0.5 leading-relaxed">
                    {thread.snippet}
                  </p>

                  {/* Labels / Tags */}
                  {thread.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {thread.labels.map(lbl => (
                        <span
                          key={lbl}
                          className="px-1.5 py-0.2 text-[10px] rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                        >
                          {lbl}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
