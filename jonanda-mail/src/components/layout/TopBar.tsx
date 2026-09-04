import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useMail } from '../../context/MailContext';
import { ProjectSwitcher } from './ProjectSwitcher';
import {
  Search,
  PenSquare,
  ShieldCheck,
  Bell,
  LogOut,
  User as UserIcon,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Download,
  Laptop
} from 'lucide-react';
import { Button } from '../common/Button';
import { RoleBadge } from '../common/Badge';
import { Role } from '../../types';
import { Link } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const { openCompose, searchQuery, setSearchQuery } = useMail();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('JONANDA MAIL Installation Options:\n\n1. Web Desktop PWA: Click the Install icon in your browser address bar.\n2. Native Windows Desktop Client: Double-click "start-desktop-app.bat" in the project directory to launch as a standalone desktop app!');
    }
  };

  const roles: Role[] = ['Super Admin', 'Organization Admin', 'Member', 'Viewer'];

  return (
    <header className="h-16 bg-[#090e1a]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Project Switcher */}
      <div className="flex items-center gap-4">
        <ProjectSwitcher />
      </div>

      {/* Center section: Global Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search mail, subjects, senders, contacts, or campaigns..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
          />
        </div>
      </div>

      {/* Right section: Install App, Compose, Notifications, Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Install Desktop / PWA Button */}
        <Button
          onClick={handleInstallApp}
          variant="outline"
          size="sm"
          leftIcon={<Download className="w-3.5 h-3.5 text-cyan-400" />}
          className="border-slate-700 bg-slate-900/60 text-slate-200 hover:text-white text-xs"
        >
          <span className="hidden sm:inline">Install App</span>
        </Button>

        {/* Quick Compose Button */}
        <Button
          onClick={() => openCompose()}
          variant="primary"
          size="sm"
          leftIcon={<PenSquare className="w-4 h-4" />}
          className="shadow-md"
        >
          Compose
        </Button>

        {/* 2FA Protected Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>2FA Active</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors relative"
            title="System notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0c1322] border border-slate-700 rounded-xl shadow-2xl z-50 p-4 divide-y divide-slate-800">
              <div className="flex items-center justify-between pb-2 mb-2">
                <span className="text-xs font-semibold text-slate-300">System Telemetry & Alerts</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">All Relay Systems Operational</span>
              </div>
              <div className="py-2 space-y-2 text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="font-medium text-slate-200">DNS Verification Check Succeeded</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">SPF, DKIM, and DMARC confirmed for JONANDA.com</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="font-medium text-slate-200">Campaign Dispatch Completed</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">196 delivered with 0 complaints (99.0% deliverability)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Quick Switcher for RBAC Demo */}
        <div className="hidden xl:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
          <span className="text-[10px] uppercase font-bold text-slate-500 px-2">Role:</span>
          {roles.map(r => (
            <button
              key={r}
              onClick={() => switchRole(r)}
              className={`text-xs px-2 py-0.5 rounded transition-colors ${
                user?.role === r ? 'bg-brand-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r.replace('Organization ', 'Org ')}
            </button>
          ))}
        </div>

        {/* User Menu Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 p-1.5 pl-2 rounded-xl hover:bg-slate-800/60 border border-transparent hover:border-slate-700/60 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-medium text-slate-200 block truncate max-w-[120px]">{user?.name || 'Admin'}</span>
              <div className="text-[10px]">
                <RoleBadge role={user?.role || 'Super Admin'} />
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-60 bg-[#0c1322] border border-slate-700 rounded-xl shadow-2xl z-50 py-2 divide-y divide-slate-800">
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-white">{user?.name}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                <div className="mt-2">
                  <RoleBadge role={user?.role || 'Super Admin'} />
                </div>
              </div>
              <div className="p-2 space-y-1">
                <Link
                  to="/settings"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 rounded-lg"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Security & Account Settings</span>
                </Link>
                <Link
                  to="/docs"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 rounded-lg"
                >
                  <HelpCircle className="w-4 h-4 text-slate-400" />
                  <span>API Documentation</span>
                </Link>
                <Link
                  to="/status"
                  onClick={() => setShowUserMenu(false)}
                  className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 rounded-lg"
                >
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  <span>System Health Status</span>
                </Link>
              </div>
              <div className="p-2">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out of JONANDA MAIL</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
