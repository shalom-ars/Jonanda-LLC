import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { ComposeModal } from '../mail/ComposeModal';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#070b14] text-slate-100 font-sans">
      {/* Left fixed navigation sidebar */}
      <Sidebar />

      {/* Main viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top header bar */}
        <TopBar />

        {/* Scrollable page body */}
        <main className="flex-1 overflow-y-auto bg-[#070b14]/50">
          <Outlet />
        </main>
      </div>

      {/* Global Compose Overlay Modal */}
      <ComposeModal />
    </div>
  );
};
