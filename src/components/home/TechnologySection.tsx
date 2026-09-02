import React from 'react';
import { Cpu, Globe, Lock, Workflow } from 'lucide-react';

export const TechnologySection: React.FC = () => {
  return (
    <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Technology
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We work across modern software, cloud, AI, cybersecurity, automation and Web3 technologies to build practical digital solutions.
          </p>
        </div>

        {/* Minimalist 4 Pillars Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#10101a] border border-gray-200 dark:border-white/[0.06] text-center space-y-2">
            <Cpu className="w-5 h-5 text-amber-600 dark:text-gold-400 mx-auto" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">AI & Cloud</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#10101a] border border-gray-200 dark:border-white/[0.06] text-center space-y-2">
            <Lock className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Cybersecurity</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#10101a] border border-gray-200 dark:border-white/[0.06] text-center space-y-2">
            <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Web3 Systems</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#10101a] border border-gray-200 dark:border-white/[0.06] text-center space-y-2">
            <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block">Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
