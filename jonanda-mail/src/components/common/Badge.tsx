import React from 'react';
import { ProjectStatus, DnsRecordStatus, Role } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple' | 'gold' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  const variantStyles = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    error: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    gold: 'bg-gold-500/10 text-gold-400 border-gold-500/30',
    outline: 'bg-transparent text-slate-400 border-slate-700'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export const ProjectStatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  switch (status) {
    case 'Live':
      return <Badge variant="success">● Live & Operational</Badge>;
    case 'Active':
      return <Badge variant="info">● Active Platform</Badge>;
    case 'Coming Soon':
      return <Badge variant="purple">○ Coming Soon</Badge>;
    case 'R&D':
      return <Badge variant="warning">▲ R&D / Incubation</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const DnsStatusBadge: React.FC<{ status: DnsRecordStatus }> = ({ status }) => {
  switch (status) {
    case 'verified':
      return <Badge variant="success">Verified</Badge>;
    case 'pending':
      return <Badge variant="warning">Pending DNS</Badge>;
    case 'error':
      return <Badge variant="error">Config Error</Badge>;
    case 'not_configured':
      return <Badge variant="outline">Not Configured</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const RoleBadge: React.FC<{ role: Role }> = ({ role }) => {
  switch (role) {
    case 'Super Admin':
      return <Badge variant="gold">Super Admin</Badge>;
    case 'Organization Admin':
      return <Badge variant="purple">Org Admin</Badge>;
    case 'Member':
      return <Badge variant="info">Member</Badge>;
    case 'Viewer':
      return <Badge variant="default">Viewer</Badge>;
    default:
      return <Badge>{role}</Badge>;
  }
};
