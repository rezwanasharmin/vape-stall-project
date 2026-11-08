'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export interface BlogFAQItem {
  number: number;
  question: string;
  answer: string;
}

interface ArticleFaqProps {
  items: BlogFAQItem[];
}

export const ArticleFaq: React.FC<ArticleFaqProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="shopify-section py-12 md:py-16 bg-[#f4f7fc]/50 border-t border-slate-200">
      <section className="vap-faq-section max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8" aria-label="Frequently Asked Questions">
        
        {/* Header */}
        <div className="vap-faq-header text-center mb-12">
          <span className="inline-block bg-[#25406f]/10 text-[#25406f] border border-[#25406f]/20 px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a2a4a] mb-2 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our products and services.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          
          {/* Decorative Side Card */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-[#25406f] rounded-2xl p-7 text-white text-center relative overflow-hidden shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/15 rounded-full flex items-center justify-center">
                <svg className="w-9 h-9 text-white animate-pulse" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="32" y="42" textAnchor="middle" fontSize="28" fontWeight="bold" fill="currentColor">?</text>
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Can&apos;t find the answer you&apos;re looking for? Our support team is happy to help you.
              </p>
              <Link
                href="/pages/contact-us"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#b48648] hover:bg-[#976d33] transition-colors shadow-md w-full"
              >
                <span>Contact Support</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {items.map((item) => {
              const isOpen = openIndex === item.number;
              return (
                <div
                  key={item.number}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden shadow-sm ${
                    isOpen ? 'border-[#25406f] shadow-md ring-1 ring-[#25406f]/10' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.number)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-4 cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-3.5">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isOpen ? 'bg-[#25406f] text-white' : 'bg-slate-100 text-[#25406f]'
                      }`}>
                        {item.number}
                      </span>
                      <span className="font-bold text-[14px] sm:text-[15.5px] text-[#1a2a4a]">
                        {item.question}
                      </span>
                    </span>
                    <svg
                      className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#25406f]' : ''
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-[13.5px] sm:text-[14.5px] text-[#475569] leading-relaxed border-t border-slate-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </section>
    </div>
  );
};

