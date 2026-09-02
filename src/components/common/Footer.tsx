import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-slate-100 dark:bg-[#07070c] border-t border-gray-200 dark:border-white/[0.08] py-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200 dark:border-white/[0.06]">
          {/* Brand Column */}
          <div className="flex items-center gap-3">
            <Link to="/" onClick={() => scrollTo('hero')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-gold-500/30 group-hover:border-gold-500/60 transition-colors shadow-gold-sm overflow-hidden p-1">
                <img
                  src="/brand/jonanda-mark-gold.png"
                  alt="JONANDA LLC Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-wider text-gray-900 dark:text-white">
                    JONANDA
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-500/15 text-amber-700 dark:text-gold-400 border border-gold-500/30">
                    LLC
                  </span>
                </div>
                <span className="text-[10px] tracking-widest text-gray-500 dark:text-gray-400 uppercase font-medium -mt-1">
                  Technology & Project Development
                </span>
              </div>
            </Link>
          </div>

          {/* Clean Navigation & Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              onClick={() => scrollTo('about')}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo('what-we-do')}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              What We Do
            </button>
            <button
              type="button"
              onClick={() => scrollTo('process')}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Process
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Contact
            </button>
            <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">
              Terms
            </Link>
            <Link to="/cookies" className="hover:text-black dark:hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0" />
            <span>&copy; {new Date().getFullYear()} JONANDA LLC. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-gold-400" />
            <span>United States Corporate Entity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
