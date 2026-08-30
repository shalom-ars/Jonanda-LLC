import React from 'react';

export interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
  titleAs?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightedText,
  description,
  align = 'center',
  className = '',
  titleAs = 'h2'
}) => {
  const HeadingTag = titleAs;

  return (
    <div
      className={`max-w-3xl ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-gold-300 border border-gold-500/20 mb-4 ${
            align === 'center' ? 'justify-center' : ''
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse-slow" />
          {badge}
        </div>
      )}

      <HeadingTag className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
        {title}{' '}
        {highlightedText && (
          <span className="text-gradient-gold block sm:inline">
            {highlightedText}
          </span>
        )}
      </HeadingTag>

      {description && (
        <p className="text-base sm:text-lg text-gray-400 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
