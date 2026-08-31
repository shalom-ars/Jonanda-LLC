import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'none';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowColor = 'none',
  onClick
}) => {
  const glowStyles = {
    none: 'border-slate-800 bg-[#0d1424]/80 backdrop-blur-md',
    blue: 'border-brand-500/30 bg-[#0d1424]/80 hover:border-brand-500/50 shadow-lg shadow-brand-500/5',
    emerald: 'border-emerald-500/30 bg-[#0d1424]/80 hover:border-emerald-500/50 shadow-lg shadow-emerald-500/5',
    amber: 'border-amber-500/30 bg-[#0d1424]/80 hover:border-amber-500/50 shadow-lg shadow-amber-500/5',
    purple: 'border-purple-500/30 bg-[#0d1424]/80 hover:border-purple-500/50 shadow-lg shadow-purple-500/5'
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-xl border transition-all duration-200 ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
};
