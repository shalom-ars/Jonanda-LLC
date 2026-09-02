import React from 'react';
import { Code2, Cpu, Shield, Sparkles, Layers, Wrench } from 'lucide-react';

export const WhatWeDoSection: React.FC = () => {
  const capabilities = [
    {
      title: 'Software Development',
      description: 'Custom software, web applications, business systems and digital platforms.',
      icon: Code2,
      color: 'amber'
    },
    {
      title: 'AI & Automation',
      description: 'AI-powered applications, intelligent workflows and automation systems.',
      icon: Cpu,
      color: 'gold'
    },
    {
      title: 'Cybersecurity',
      description: 'Defensive security technology, security platforms and security-focused solutions.',
      icon: Shield,
      color: 'emerald'
    },
    {
      title: 'Web3 & Blockchain',
      description: 'Blockchain applications and Web3 technology solutions.',
      icon: Sparkles,
      color: 'purple'
    },
    {
      title: 'Digital Products',
      description: 'We design and develop technology products from concept to production.',
      icon: Layers,
      color: 'blue'
    },
    {
      title: 'Custom Projects',
      description: 'Technology solutions built around specific business and organizational requirements.',
      icon: Wrench,
      color: 'amber'
    }
  ];

  return (
    <section id="what-we-do" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            What We Do
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            JONANDA LLC develops high-performance technology systems, applications, and custom digital solutions for organizations and innovators.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#10101c] border border-gray-200 dark:border-white/[0.08] shadow-sm hover:border-amber-500/40 dark:hover:border-gold-500/40 transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 flex items-center justify-center text-amber-600 dark:text-gold-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.description}
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
