import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Layers } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Central subtle gold ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/30 dark:border-gold-500/30 text-xs sm:text-sm font-medium text-amber-800 dark:text-gold-300 shadow-sm dark:shadow-gold-sm backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-amber-500 dark:bg-gold-400 animate-pulse-slow" />
          <span className="font-bold tracking-wide">JONANDA LLC</span>
          <span className="text-gray-400 dark:text-gray-500">•</span>
          <span className="text-gray-700 dark:text-gray-300 font-medium">United States Corporate Enterprise</span>
        </div>

        {/* Hero Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            Building Technology for the{' '}
            <span className="text-gradient-gold block sm:inline">
              Next Digital Economy
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 font-normal leading-relaxed">
            JONANDA LLC is a technology enterprise developing products and services across AI, Web3, cybersecurity, software engineering, and digital infrastructure.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            href="/ecosystem"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-gold-md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Our Ecosystem
          </Button>

          <Button
            href="/project-development"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Start a Project
          </Button>
        </div>

        {/* Technology Capabilities Snapshot Badges */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 flex items-center justify-center text-amber-600 dark:text-gold-400 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900 dark:text-white">Artificial Intelligence</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Intelligent Systems</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900 dark:text-white">Web3 & Blockchain</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Decentralized Protocols</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900 dark:text-white">Cybersecurity</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Threat Defense</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] shadow-sm dark:shadow-none backdrop-blur-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-gray-900 dark:text-white">Software & Cloud</div>
              <div className="text-[10px] text-gray-500 dark:text-gray-400">Digital Infrastructure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
