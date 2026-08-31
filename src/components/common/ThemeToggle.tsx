import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center gap-2 p-2 rounded-xl transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/50 ${
        isDark
          ? 'bg-surface/80 hover:bg-surface text-gray-300 hover:text-gold-300 border border-white/10 shadow-sm'
          : 'bg-white hover:bg-gray-100 text-gray-700 hover:text-amber-600 border border-gray-200 shadow-sm'
      } ${className}`}
      title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Sun
          className={`w-4 h-4 transition-all duration-300 text-gold-400 absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0 pointer-events-none'
          }`}
        />
        <Moon
          className={`w-4 h-4 transition-all duration-300 text-amber-600 absolute ${
            !isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0 pointer-events-none'
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-semibold">
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </span>
      )}
    </button>
  );
};
