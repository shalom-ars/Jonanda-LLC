import React from 'react';
import { ArrowRight, MessageSquare, Code2, Cpu, Shield, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Central subtle gold ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        {/* Brand Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs sm:text-sm font-semibold text-amber-800 dark:text-gold-300 shadow-sm backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-gold-400 animate-pulse" />
          <span className="tracking-wide uppercase">JONANDA LLC</span>
          <span className="text-gray-400 dark:text-gray-600">•</span>
          <span className="text-gray-700 dark:text-gray-300 font-normal">Technology & Project Development</span>
        </div>

        {/* Hero Main Heading */}
        <div className="space-y-5">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            Building Technology for the{' '}
            <span className="text-amber-600 dark:text-gold-300 block sm:inline">
              Next Digital Economy
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
            JONANDA LLC is a technology and project development company building digital products, software, AI solutions, cybersecurity technology, Web3 systems, and custom technology solutions.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white font-semibold text-sm sm:text-base border border-gray-200 dark:border-white/10 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-amber-600 dark:text-gold-400" />
            <span>Contact JONANDA LLC</span>
          </button>
        </div>

        {/* Capabilities Pill Badges */}
        <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-700 dark:text-gray-300">
            <Code2 className="w-4 h-4 text-amber-600 dark:text-gold-400" />
            <span>Software</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-700 dark:text-gray-300">
            <Cpu className="w-4 h-4 text-amber-600 dark:text-gold-400" />
            <span>AI & Automation</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-700 dark:text-gray-300">
            <Shield className="w-4 h-4 text-amber-600 dark:text-gold-400" />
            <span>Cybersecurity</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] text-xs font-semibold text-gray-700 dark:text-gray-300">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-gold-400" />
            <span>Web3</span>
          </div>
        </div>
      </div>
    </section>
  );
};
