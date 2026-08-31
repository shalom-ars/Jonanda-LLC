import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../data/projectDevelopmentData';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div
            key={idx}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-surface/90 border-gold-500/30 shadow-gold-sm'
                : 'bg-surface/40 border-white/[0.06] hover:border-white/[0.15]'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none focus:ring-1 focus:ring-gold-500/40 rounded-2xl"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-bold text-white leading-snug">
                {item.question}
              </span>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? 'bg-gold-500/20 text-gold-300 rotate-180'
                    : 'bg-white/[0.05] text-gray-400'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/[0.04]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
