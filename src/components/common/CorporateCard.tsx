import React from 'react';

export interface CorporateCardProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const CorporateCard: React.FC<CorporateCardProps> = ({
  id,
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`
        relative rounded-2xl bg-surface/90 dark:bg-surface/75 backdrop-blur-md p-6 sm:p-8
        border border-gray-200/80 dark:border-white/[0.08] shadow-sm dark:shadow-none transition-all duration-300 overflow-hidden
        ${hoverEffect ? 'hover:border-gold-500/40 hover:bg-white dark:hover:bg-surface/90 hover:shadow-lg dark:hover:shadow-card-hover hover:-translate-y-1' : ''}
        ${glow ? 'border-glow-gold' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Top subtle light accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 dark:via-white/10 to-transparent pointer-events-none" />
      {children}
    </div>
  );
};
