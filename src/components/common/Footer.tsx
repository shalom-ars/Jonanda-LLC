import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ShieldCheck, Cpu, Globe } from 'lucide-react';
import {
  FOOTER_ECOSYSTEM_LINKS,
  FOOTER_SERVICES_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LEGAL_LINKS
} from '../../data/navigationData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-background-subtle border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Corporate Summary Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface border border-gold-500/30 group-hover:border-gold-500/60 transition-colors shadow-gold-sm">
                <img
                  src="/brand/jonanda-llc-mark.svg"
                  alt="JONANDA LLC"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-wider text-white">
                  JONANDA
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gold-500/15 text-gold-400 border border-gold-500/30">
                  LLC
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Building technology for the next digital economy. JONANDA LLC develops proprietary software, AI systems, and custom digital platforms for global enterprises and startups.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-xs text-gray-400">
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>United States Technology Enterprise</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-gray-400">
              <span className="px-2 py-0.5 rounded bg-surface border border-white/5">Custom Software</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-white/5">AI Systems</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-white/5">Web3</span>
              <span className="px-2 py-0.5 rounded bg-surface border border-white/5">Cybersecurity</span>
            </div>
          </div>

          {/* Development & Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Solutions & Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_SERVICES_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Our Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_ECOSYSTEM_LINKS.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gold-200 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gold-300">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {FOOTER_LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 text-xs text-gray-400">
                Official Corporate HQ:<br />
                <span className="font-mono text-gold-400 text-xs">llc.jonanda.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
            <span>
              &copy; {new Date().getFullYear()} JONANDA LLC. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span>Corporate Entity • United States</span>
            <div className="flex items-center gap-1.5 text-gray-400">
              <Cpu className="w-3.5 h-3.5 text-gold-400" />
              <span>Next-Gen Digital Infrastructure</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
