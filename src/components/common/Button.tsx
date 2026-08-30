import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'right'
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500/40 disabled:opacity-50 disabled:pointer-events-none select-none tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-2 gap-1.5 font-semibold",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold"
  };

  const variantStyles = {
    primary: "bg-gold-gradient text-gray-950 font-semibold shadow-gold-sm hover:shadow-gold-md hover:brightness-105 active:scale-[0.98]",
    secondary: "bg-surface/90 text-gray-200 border border-white/10 hover:bg-surface hover:border-gold-500/30 hover:text-white active:scale-[0.98]",
    outline: "bg-transparent text-gold-300 border border-gold-500/40 hover:bg-gold-500/10 hover:border-gold-400 active:scale-[0.98]",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 active:scale-[0.98]"
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      {isExternal && !icon && <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-70" />}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }
    return (
      <Link to={href} className={combinedClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};
