import React from 'react';
import { Search, Compass, Layout, Code, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      description: 'Understand the idea and requirements.',
      icon: Search
    },
    {
      number: '02',
      title: 'Plan',
      description: 'Define scope, architecture and roadmap.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Design',
      description: 'Create the product experience and interface.',
      icon: Layout
    },
    {
      number: '04',
      title: 'Build',
      description: 'Develop, integrate and test the system.',
      icon: Code
    },
    {
      number: '05',
      title: 'Launch',
      description: 'Deploy and continue improving the product.',
      icon: Rocket
    }
  ];

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 bg-gray-50/50 dark:bg-white/[0.01] border-y border-gray-200 dark:border-white/[0.05]">
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            How We Build
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            A disciplined 5-stage development cycle ensuring transparency, precision, and reliable execution.
          </p>
        </div>

        {/* 5 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-3xl bg-white dark:bg-[#10101c] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-amber-500/40 dark:hover:border-gold-500/40 transition-all duration-300 space-y-4 group relative overflow-hidden"
              >
                {/* Number Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-amber-700 dark:text-gold-400 px-2.5 py-1 rounded-lg bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20">
                    {step.number}
                  </span>
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-gold-300 transition-colors" />
                </div>

                <div className="space-y-1.5 pt-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
