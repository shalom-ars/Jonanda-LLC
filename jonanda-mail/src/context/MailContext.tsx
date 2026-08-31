import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { EmailThread, EmailMessage, EmailFolder, Mailbox } from '../types';
import { StorageService } from '../services/storageService';
import { defaultEmailProvider, SendEmailPayload } from '../services/emailProvider';
import { useProject } from './ProjectContext';

export interface ComposeState {
  isOpen: boolean;
  mailboxId: string;
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  bodyHtml: string;
  inReplyTo?: string;
  threadId?: string;
  attachments: { id: string; name: string; size: number; type: string }[];
}

interface MailContextType {
  mailboxes: Mailbox[];
  currentMailboxId: string; // 'all' or mailbox id
  setCurrentMailboxId: (id: string) => void;
  currentFolder: EmailFolder;
  setCurrentFolder: (folder: EmailFolder) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  threads: EmailThread[];
  filteredThreads: EmailThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  activeThread: EmailThread | null;
  composeState: ComposeState;
  openCompose: (initialData?: Partial<ComposeState>) => void;
  closeCompose: () => void;
  updateCompose: (data: Partial<ComposeState>) => void;
  sendComposedEmail: () => Promise<boolean>;
  saveDraftEmail: () => Promise<void>;
  toggleStar: (threadId: string) => void;
  markThreadRead: (threadId: string, isRead: boolean) => void;
  moveThreadToFolder: (threadId: string, folder: EmailFolder) => void;
  deleteThread: (threadId: string) => void;
  replyToThread: (thread: EmailThread, replyAll?: boolean) => void;
  forwardThread: (thread: EmailThread) => void;
  refreshMail: () => void;
}

const defaultCompose: ComposeState = {
  isOpen: false,
  mailboxId: '',
  to: '',
  cc: '',
  bcc: '',
  subject: '',
  bodyHtml: '',
  attachments: []
};

const MailContext = createContext<MailContextType | undefined>(undefined);

export const MailProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentProjectId } = useProject();
  const [mailboxes, setMailboxes] = useState<Mailbox[]>(() => StorageService.getMailboxes());
  const [currentMailboxId, setCurrentMailboxId] = useState<string>('all');
  const [currentFolder, setCurrentFolder] = useState<EmailFolder>('inbox');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [threads, setThreads] = useState<EmailThread[]>(() => StorageService.getThreads());
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [composeState, setComposeState] = useState<ComposeState>(defaultCompose);

  const refreshMail = () => {
    setMailboxes(StorageService.getMailboxes());
    setThreads(StorageService.getThreads());
  };

  // Filtered threads based on active Project, Mailbox, Folder, Search, and Tags
  const filteredThreads = useMemo(() => {
    return threads.filter(thread => {
      // Project filter
      if (currentProjectId !== 'all' && thread.projectId !== currentProjectId) {
        return false;
      }
      // Mailbox filter
      if (currentMailboxId !== 'all' && thread.mailboxId !== currentMailboxId) {
        return false;
      }
      // Folder filter
      if (thread.folder !== currentFolder) {
        return false;
      }
      // Tag filter
      if (selectedTag && !thread.labels.includes(selectedTag)) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSubject = thread.subject.toLowerCase().includes(q);
        const matchesSnippet = thread.snippet.toLowerCase().includes(q);
        const matchesParticipants = thread.participants.some(p => 
          p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
        );
        if (!matchesSubject && !matchesSnippet && !matchesParticipants) {
          return false;
        }
      }
      return true;
    });
  }, [threads, currentProjectId, currentMailboxId, currentFolder, selectedTag, searchQuery]);

  const activeThread = useMemo(() => {
    if (!activeThreadId) return null;
    return threads.find(t => t.id === activeThreadId) || null;
  }, [threads, activeThreadId]);

  const openCompose = (initialData?: Partial<ComposeState>) => {
    const defaultMbx = mailboxes[0]?.id || '';
    setComposeState({
      ...defaultCompose,
      mailboxId: defaultMbx,
      isOpen: true,
      ...initialData
    });
  };

  const closeCompose = () => {
    setComposeState(defaultCompose);
  };

  const updateCompose = (data: Partial<ComposeState>) => {
    setComposeState(prev => ({ ...prev, ...data }));
  };

  const sendComposedEmail = async (): Promise<boolean> => {
    const senderMbx = mailboxes.find(m => m.id === composeState.mailboxId) || mailboxes[0];
    if (!senderMbx || !composeState.to.trim() || !composeState.subject.trim()) {
      return false;
    }

    const parseEmails = (str: string) => {
      return str
        .split(',')
        .map(e => e.trim())
        .filter(Boolean)
        .map(e => ({ name: e.split('@')[0], email: e }));
    };

    const to = parseEmails(composeState.to);
    const cc = composeState.cc ? parseEmails(composeState.cc) : undefined;
    const bcc = composeState.bcc ? parseEmails(composeState.bcc) : undefined;

    const payload: SendEmailPayload = {
      mailboxId: senderMbx.id,
      from: { name: senderMbx.displayName, email: senderMbx.email },
      to,
      cc,
      bcc,
      subject: composeState.subject,
      bodyHtml: composeState.bodyHtml || `<p>${composeState.subject}</p>`,
      bodyText: composeState.bodyHtml ? composeState.bodyHtml.replace(/<[^>]*>?/gm, '') : composeState.subject,
      threadId: composeState.threadId,
      inReplyTo: composeState.inReplyTo,
      attachments: composeState.attachments
    };

    try {
      await defaultEmailProvider.sendEmail(payload);
      refreshMail();
      closeCompose();
      return true;
    } catch (e) {
      console.error('Failed to send message', e);
      return false;
    }
  };

  const saveDraftEmail = async () => {
    const senderMbx = mailboxes.find(m => m.id === composeState.mailboxId) || mailboxes[0];
    if (!senderMbx) return;

    const threadId = composeState.threadId || `th_draft_${Date.now()}`;
    const messageId = `msg_draft_${Date.now()}`;

    const message: EmailMessage = {
      id: messageId,
      threadId,
      orgId: senderMbx.orgId,
      projectId: senderMbx.projectId,
      mailboxId: senderMbx.id,
      from: { name: senderMbx.displayName, email: senderMbx.email },
      to: composeState.to ? [{ name: composeState.to, email: composeState.to }] : [],
      subject: composeState.subject || '(Draft without subject)',
      snippet: composeState.bodyHtml.replace(/<[^>]*>?/gm, '').substring(0, 80),
      bodyHtml: composeState.bodyHtml,
      bodyText: composeState.bodyHtml.replace(/<[^>]*>?/gm, ''),
      date: new Date().toISOString(),
      isRead: true,
      isStarred: false,
      isDraft: true,
      isSpam: false,
      isTrash: false,
      isArchive: false,
      folder: 'drafts',
      labels: ['Draft'],
      attachments: composeState.attachments,
      messageIdHeader: `<${messageId}@mail.jonanda.com>`
    };

    StorageService.addMessageToThread(threadId, message);
    refreshMail();
    closeCompose();
  };

  const toggleStar = (threadId: string) => {
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      const updated = { ...thread, isStarred: !thread.isStarred };
      StorageService.updateThread(updated);
      refreshMail();
    }
  };

  const markThreadRead = (threadId: string, isRead: boolean) => {
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      const updated = { 
        ...thread, 
        isRead, 
        unreadCount: isRead ? 0 : 1,
        messages: thread.messages.map(m => ({ ...m, isRead }))
      };
      StorageService.updateThread(updated);
      refreshMail();
    }
  };

  const moveThreadToFolder = (threadId: string, folder: EmailFolder) => {
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      const updated = { ...thread, folder };
      StorageService.updateThread(updated);
      refreshMail();
    }
  };

  const deleteThread = (threadId: string) => {
    const thread = threads.find(t => t.id === threadId);
    if (thread) {
      if (thread.folder === 'trash') {
        StorageService.deleteThread(threadId, true);
      } else {
        StorageService.deleteThread(threadId, false);
      }
      if (activeThreadId === threadId) {
        setActiveThreadId(null);
      }
      refreshMail();
    }
  };

  const replyToThread = (thread: EmailThread, replyAll: boolean = false) => {
    const lastMsg = thread.messages[thread.messages.length - 1];
    const replyRecipient = lastMsg ? lastMsg.from.email : thread.participants[0]?.email || '';
    const subject = thread.subject.startsWith('Re:') ? thread.subject : `Re: ${thread.subject}`;
    
    let ccStr = '';
    if (replyAll && lastMsg) {
      ccStr = lastMsg.to.map(t => t.email).filter(e => e !== thread.mailboxId).join(', ');
    }

    openCompose({
      mailboxId: thread.mailboxId,
      to: replyRecipient,
      cc: ccStr,
      subject,
      threadId: thread.id,
      inReplyTo: lastMsg?.messageIdHeader,
      bodyHtml: `<p></p><br/><br/><blockquote>On ${new Date(lastMsg?.date || '').toLocaleString()}, ${lastMsg?.from.name} wrote:<br/>${lastMsg?.bodyHtml || ''}</blockquote>`
    });
  };

  const forwardThread = (thread: EmailThread) => {
    const lastMsg = thread.messages[thread.messages.length - 1];
    const subject = thread.subject.startsWith('Fwd:') ? thread.subject : `Fwd: ${thread.subject}`;

    openCompose({
      mailboxId: thread.mailboxId,
      to: '',
      subject,
      bodyHtml: `<p></p><br/><br/><blockquote>---------- Forwarded message ---------<br/>From: ${lastMsg?.from.name} &lt;${lastMsg?.from.email}&gt;<br/>Date: ${new Date(lastMsg?.date || '').toLocaleString()}<br/>Subject: ${thread.subject}<br/>To: ${lastMsg?.to.map(t => t.email).join(', ')}<br/><br/>${lastMsg?.bodyHtml || ''}</blockquote>`
    });
  };

  return (
    <MailContext.Provider
      value={{
        mailboxes,
        currentMailboxId,
        setCurrentMailboxId,
        currentFolder,
        setCurrentFolder,
        selectedTag,
        setSelectedTag,
        searchQuery,
        setSearchQuery,
        threads,
        filteredThreads,
        activeThreadId,
        setActiveThreadId,
        activeThread,
        composeState,
        openCompose,
        closeCompose,
        updateCompose,
        sendComposedEmail,
        saveDraftEmail,
        toggleStar,
        markThreadRead,
        moveThreadToFolder,
        deleteThread,
        replyToThread,
        forwardThread,
        refreshMail
      }}
    >
      {children}
    </MailContext.Provider>
  );
};

export const useMail = () => {
  const ctx = useContext(MailContext);
  if (!ctx) throw new Error('useMail must be used within a MailProvider');
  return ctx;
};
