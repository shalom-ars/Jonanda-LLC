import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'What We Do', id: 'what-we-do' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#08080b]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/60 py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group focus:outline-none rounded-lg shrink-0"
            aria-label="JONANDA LLC Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-surface border border-gold-500/30 group-hover:border-gold-500/60 transition-all duration-300 shadow-gold-sm overflow-hidden p-1">
              <img
                src="/brand/jonanda-mark-gold.png"
                alt="JONANDA LLC Emblem"
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-wider text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold-200 transition-colors">
                  JONANDA
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-gold-500/15 text-amber-700 dark:text-gold-400 border border-gold-500/30">
                  LLC
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-gray-500 dark:text-gray-400 uppercase font-medium -mt-1 hidden sm:block">
                Technology
              </span>
            </div>
          </Link>

          {/* Desktop Single-Page Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/95 dark:bg-[#12121a] px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 shadow-md">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Right Action Button & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-sm"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Theme Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/80 dark:bg-surface/80 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-amber-600 dark:text-gold-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-white dark:bg-[#0c0c14] border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 animate-fadeIn p-5 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => scrollTo(item.id)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-2 border-t border-gray-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm text-center shadow-md"
            >
              Start a Project / Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
