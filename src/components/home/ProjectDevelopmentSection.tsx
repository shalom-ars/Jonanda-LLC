import React from 'react';
import { ArrowRight, Lightbulb } from 'lucide-react';

export const ProjectDevelopmentSection: React.FC = () => {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="project-development" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-b from-white to-gray-50 dark:from-[#121220] dark:to-[#0c0c16] border border-amber-500/30 dark:border-gold-500/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-amber-500/10 dark:bg-gold-500/15 blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 dark:bg-gold-500/10 border border-amber-500/20 dark:border-gold-500/20 text-xs font-semibold text-amber-800 dark:text-gold-300">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Project Development</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Have an Idea? We Can Build It.
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            JONANDA LLC works with businesses, startups, organizations and entrepreneurs to transform technology ideas into structured digital products and working solutions.
          </p>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg hover:shadow-amber-500/25"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
