import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigationData';
import { Button } from './Button';

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-white/[0.08] shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-lg"
            aria-label="JONANDA LLC Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-surface border border-gold-500/30 group-hover:border-gold-500/60 transition-all duration-300 shadow-gold-sm">
              <img
                src="/brand/jonanda-llc-mark.svg"
                alt="JONANDA LLC Mark"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-wider text-white group-hover:text-gold-200 transition-colors">
                  JONANDA
                </span>
                <span className="text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  LLC
                </span>
              </div>
              <span className="text-[10px] tracking-widest text-gray-400 uppercase font-medium -mt-1 hidden sm:block">
                Technology
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-surface/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/[0.08]">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3.5 py-1.5 text-xs lg:text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-white bg-white/10 shadow-sm border border-white/10 font-semibold text-gold-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://jonanda.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-surface/80 hover:bg-surface text-gray-300 hover:text-gold-300 border border-white/10 hover:border-gold-500/30 transition-all duration-200 shadow-sm"
              title="Explore Jonanda Coin Web3 Ecosystem"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Explore JNDA</span>
              <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
            </a>

            <Button href="/contact" variant="primary" size="sm">
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              href="/contact"
              variant="primary"
              size="sm"
              className="text-xs px-2.5 py-1.5"
            >
              Contact
            </Button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-surface/80 border border-white/10 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/40"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gold-400" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-background/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 animate-fadeIn">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive
                        ? 'bg-gold-500/10 text-gold-300 border border-gold-500/20 font-semibold'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Ecosystem & Contact Links */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              <a
                href="https://jonanda.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-surface/90 border border-gold-500/20 text-sm font-semibold text-gold-300"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Jonanda Coin (JNDA)</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>

              <a
                href="https://lozula.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-surface/90 border border-emerald-500/20 text-sm font-semibold text-emerald-300"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>LOZULA Cybersecurity</span>
                </div>
                <ExternalLink className="w-4 h-4 opacity-70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
