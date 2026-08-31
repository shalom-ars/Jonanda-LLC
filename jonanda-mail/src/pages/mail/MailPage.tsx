import React from 'react';
import { MailSidebar } from '../../components/mail/MailSidebar';
import { ThreadList } from '../../components/mail/ThreadList';
import { ThreadView } from '../../components/mail/ThreadView';

export const MailPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-[#070b14]">
      {/* 1st column: Mailbox & Folder sidebar */}
      <MailSidebar />

      {/* 2nd column: Thread list */}
      <div className="w-96 flex flex-col shrink-0 h-full">
        <ThreadList />
      </div>

      {/* 3rd column: Thread message viewer */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <ThreadView />
      </div>
    </div>
  );
};
