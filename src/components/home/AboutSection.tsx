import React from 'react';
import { Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50/50 dark:bg-white/[0.01] border-t border-gray-200 dark:border-white/[0.05]">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 text-xs font-semibold text-amber-800 dark:text-gold-300">
            <Building2 className="w-3.5 h-3.5" />
            <span>Corporate Overview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            About JONANDA LLC
          </h2>
        </div>

        {/* Narrative Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#10101c] border border-gray-200 dark:border-white/[0.08] shadow-sm space-y-6 text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            <strong className="text-gray-900 dark:text-white font-semibold">JONANDA LLC</strong> is a technology and project development enterprise focused on designing, building, and deploying digital solutions.
          </p>

          <p>
            We operate across software engineering, artificial intelligence, cybersecurity, Web3, and workflow automation. Our mission is to engineer reliable, high-performance technology systems that empower businesses, innovators, and organizations in the evolving digital economy.
          </p>

          <div className="pt-4 border-t border-gray-200 dark:border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0" />
              <span>United States Corporate Entity</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0" />
              <span>Full-Stack Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-gold-400 shrink-0" />
              <span>Structured Development</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
