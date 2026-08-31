import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Code2,
  Cpu,
  Layers,
  Clock,
  Sparkles,
  Shield,
  Building2,
  ShieldCheck,
  Globe,
  Handshake,
  Mail,
  Zap,
  Activity,
  FileText,
  Users
} from 'lucide-react';
import { MAIN_NAV_MENU, MainNavItem, NavDropdownItem } from '../../data/navigationData';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Cpu,
  Layers,
  Clock,
  Sparkles,
  Shield,
  Building2,
  ShieldCheck,
  Globe,
  Handshake,
  Mail,
  Zap,
  Activity,
  FileText,
  Users
};

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileSubmenu = (label: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#08080b]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.08] shadow-lg shadow-black/5 dark:shadow-black/60 py-2.5 sm:py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/40 rounded-lg shrink-0"
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

          {/* ========================================================= */}
          {/* DESKTOP COMPACT NAVIGATION (WITH SOLID DROPDOWNS)         */}
          {/* ========================================================= */}
          <nav className="hidden md:flex items-center gap-1 bg-white/90 dark:bg-[#12121a] px-3 py-1.5 rounded-full border border-gray-200 dark:border-white/10 shadow-md">
            {MAIN_NAV_MENU.map((item: MainNavItem) => {
              const hasDropdown = Boolean(item.children && item.children.length > 0);
              const isOpen = activeDropdown === item.label;
              const isChildActive = item.children?.some(
                (child) => !child.isExternal && location.pathname === child.href
              );
              const isDirectActive = item.href && location.pathname === item.href;
              const isActive = isDirectActive || isChildActive;

              if (!hasDropdown && item.href) {
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-amber-700 dark:text-gold-300 bg-amber-500/10 dark:bg-white/10 shadow-sm border border-amber-500/20 dark:border-white/10 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 focus:outline-none ${
                      isActive || isOpen
                        ? 'text-amber-700 dark:text-gold-300 bg-amber-500/10 dark:bg-white/10 shadow-sm border border-amber-500/20 dark:border-white/10 font-bold'
                        : 'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-amber-600 dark:text-gold-300' : 'text-gray-400'
                      }`}
                    />
                  </button>

                  {/* Fully Opaque Solid Dropdown Menu (No background bleed-through) */}
                  {isOpen && item.children && (
                    <div className="absolute top-full left-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white dark:bg-[#0e0e16] border border-gray-200 dark:border-gold-500/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] p-3 space-y-1.5 z-[100] animate-fadeIn">
                      {item.children.map((child: NavDropdownItem) => {
                        const IconComp = child.iconName ? iconMap[child.iconName] || Globe : Globe;
                        const isSelected = !child.isExternal && location.pathname === child.href;

                        const content = (
                          <div
                            className={`flex items-start gap-3.5 p-3 rounded-xl transition-all duration-200 group/item ${
                              isSelected
                                ? 'bg-amber-500/10 dark:bg-gold-500/15 border border-amber-500/20 dark:border-gold-500/30'
                                : 'hover:bg-gray-100 dark:hover:bg-white/[0.07] border border-transparent'
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/30 flex items-center justify-center text-amber-600 dark:text-gold-400 shrink-0 mt-0.5 group-hover/item:border-gold-500/50 group-hover/item:text-amber-700 dark:group-hover/item:text-gold-300 transition-colors shadow-sm">
                              <IconComp className="w-4 h-4" />
                            </div>

                            <div className="flex-grow space-y-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-amber-700 dark:group-hover/item:text-gold-200 transition-colors leading-snug">
                                  {child.label}
                                </span>
                                {child.badge && (
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                                      child.badgeColor === 'emerald'
                                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                                        : child.badgeColor === 'amber'
                                        ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                                        : child.badgeColor === 'purple'
                                        ? 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30'
                                        : child.badgeColor === 'blue'
                                        ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                                        : 'bg-gold-500/15 text-amber-700 dark:text-gold-300 border border-gold-500/30'
                                    }`}
                                  >
                                    {child.badge}
                                  </span>
                                )}
                              </div>
                              {child.description && (
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {child.description}
                                </p>
                              )}
                            </div>

                            {child.isExternal && (
                              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/item:text-amber-600 dark:group-hover/item:text-gold-400 shrink-0 mt-1 opacity-70" />
                            )}
                          </div>
                        );

                        if (child.isExternal) {
                          return (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              {content}
                            </a>
                          );
                        }

                        return (
                          <Link key={child.label} to={child.href} className="block">
                            {content}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop Right Action CTA Buttons & Theme Toggle */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <ThemeToggle />
            <Button href="/contact" variant="primary" size="sm" className="text-xs px-4 py-2">
              Start a Project
            </Button>
          </div>

          {/* Mobile Menu Toggle Button & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
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
              className="p-2 rounded-lg bg-white/80 dark:bg-surface/80 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gold-500/40"
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

      {/* ========================================================= */}
      {/* MOBILE DRAWER MENU (WITH EXPANDABLE ACCORDIONS)           */}
      {/* ========================================================= */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[58px] bg-white dark:bg-[#0b0b12] border-b border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 animate-fadeIn max-h-[85vh] overflow-y-auto z-[100]">
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <nav className="flex flex-col space-y-1">
              {MAIN_NAV_MENU.map((item: MainNavItem) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(mobileExpanded[item.label]);

                if (!hasChildren && item.href) {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                        isActive
                          ? 'bg-amber-500/10 dark:bg-gold-500/10 text-amber-700 dark:text-gold-300 border border-amber-500/20 dark:border-gold-500/20 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  );
                }

                return (
                  <div key={item.label} className="rounded-xl overflow-hidden bg-gray-50 dark:bg-[#14141e] border border-gray-200 dark:border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => toggleMobileSubmenu(item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-gold-200 transition-colors"
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180 text-amber-600 dark:text-gold-400' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && item.children && (
                      <div className="px-3 pb-3 space-y-1 border-t border-gray-200 dark:border-white/[0.06] pt-2">
                        {item.children.map((child: NavDropdownItem) => {
                          const IconComp = child.iconName ? iconMap[child.iconName] || Globe : Globe;
                          const isChildActive = !child.isExternal && location.pathname === child.href;

                          const childContent = (
                            <div
                              className={`flex items-center gap-3 p-2.5 rounded-lg text-sm transition-colors ${
                                isChildActive
                                  ? 'bg-amber-500/15 dark:bg-gold-500/15 text-amber-700 dark:text-gold-300 font-bold'
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                              }`}
                            >
                              <IconComp className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0" />
                              <div className="flex-grow">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">{child.label}</span>
                                  {child.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase bg-gold-500/15 text-amber-700 dark:text-gold-300 border border-gold-500/30">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                {child.description && (
                                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-1 font-normal">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                              {child.isExternal && <ExternalLink className="w-3 h-3 opacity-50 shrink-0" />}
                            </div>
                          );

                          if (child.isExternal) {
                            return (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                {childContent}
                              </a>
                            );
                          }

                          return (
                            <Link key={child.label} to={child.href} className="block">
                              {childContent}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            <div className="pt-2 border-t border-gray-200 dark:border-white/10">
              <Button href="/contact" variant="primary" size="md" className="w-full justify-center">
                Start a Project / Contact Us
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
