import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMail } from '../../context/MailContext';
import {
  LayoutDashboard,
  Mail,
  Send,
  FileText,
  Workflow,
  Users,
  BarChart3,
  Globe,
  Inbox,
  Boxes,
  Settings,
  ShieldAlert,
  Code2,
  Activity,
  ChevronRight,
  HardDrive
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const { filteredThreads } = useMail();

  const unreadInboxCount = filteredThreads.filter(t => t.folder === 'inbox' && !t.isRead).length;

  const isSuperAdmin = user?.role === 'Super Admin';
  const isOrgAdmin = user?.role === 'Organization Admin' || isSuperAdmin;

  const navItems = [
    { label: 'Ecosystem Overview', to: '/dashboard', icon: LayoutDashboard },
    { label: 'Webmail', to: '/mail', icon: Mail, badge: unreadInboxCount > 0 ? unreadInboxCount : undefined },
    { label: 'Email Campaigns', to: '/campaigns', icon: Send },
    { label: 'Template Builder', to: '/templates', icon: FileText },
    { label: 'Automations & Drip', to: '/automations', icon: Workflow },
    { label: 'Audience & Contacts', to: '/contacts', icon: Users },
    { label: 'Deliverability & Stats', to: '/analytics', icon: BarChart3 },
    { label: 'Domain & DNS Setup', to: '/domains', icon: Globe },
    { label: 'Mailbox Management', to: '/mailboxes', icon: Inbox },
    { label: 'Ecosystem Projects', to: '/projects', icon: Boxes },
    { label: 'Settings & Security', to: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#060a14] border-r border-slate-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 p-0.5 shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070b14] rounded-[10px] flex items-center justify-center">
                <Mail className="w-5 h-5 text-brand-400" />
              </div>
            </div>
            <div>
              <div className="font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                <span>JONANDA</span>
                <span className="text-brand-400">MAIL</span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide">Enterprise Email Platform</p>
            </div>
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Platform Navigation
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-brand-600/30 to-brand-600/10 text-brand-300 border border-brand-500/30 shadow-md shadow-brand-900/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-brand-500 text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Admin Section */}
          {isOrgAdmin && (
            <div className="pt-3">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500/80">
                Administration
              </div>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-amber-300 hover:bg-amber-500/10'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Super Admin Control</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              </NavLink>
            </div>
          )}

          {/* Docs & Status */}
          <div className="pt-3">
            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Developer & Infrastructure
            </div>
            <NavLink
              to="/docs"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive ? 'bg-brand-600/20 text-brand-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>docs.mail.jonanda.com</span>
            </NavLink>
            <NavLink
              to="/status"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive ? 'bg-brand-600/20 text-brand-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>status.mail.jonanda.com</span>
            </NavLink>
          </div>
        </nav>
      </div>

      {/* Storage Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-[#040810]">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <div className="flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-[11px] font-medium text-slate-300">Ecosystem Storage</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400">8.7 / 100 GB</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="w-[8.7%] h-full bg-gradient-to-r from-brand-500 to-cyan-400 rounded-full" />
        </div>
        <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
          <span>Enterprise Plan</span>
          <span className="text-emerald-400 font-mono">100% Verified</span>
        </div>
      </div>
    </aside>
  );
};
