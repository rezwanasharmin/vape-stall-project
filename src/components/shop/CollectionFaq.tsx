'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What makes Vape Stall a trusted Disposable Vape shop in UAE?',
    a: 'Vape Stall focuses on verified, branded products and clear product info (puff count, nicotine strength, coil type, and flavour). If you’re trying to Shop from a reliable vape shop UAE, the goal is simple: genuine stock, secure packaging, and support before and after purchase.',
  },
  {
    q: 'What is a nicotine salt disposable?',
    a: 'A nicotine salt disposable uses nicotine salt e‑liquid, which many users feel is smoother and more satisfying at lower power compared to traditional freebase nicotine. It’s popular for people who want a comfortable daily vape with a smooth throat hit vape experience.',
  },
  {
    q: 'Do you sell 0mg nicotine disposable vape and 20mg nicotine salt vape options?',
    a: 'Yes, customers commonly request both 0mg nicotine disposable vape options (nicotine‑free) and standard strengths like 20mg nicotine salt vape (often searched as disposable vape 20mg uae). Always choose based on your nicotine tolerance and preference.',
  },
  {
    q: 'Are your devices inhale activated vape / draw activated vape uae types?',
    a: 'Most disposable devices are an inhale activated vape format (also searched as draw activated vape uae). That means there are no buttons, just inhale and the device activates automatically.',
  },
  {
    q: 'What’s the difference between a mesh coil disposable and a dual mesh coil vape?',
    a: 'A mesh coil disposable is designed to heat e‑liquid evenly for smoother flavour and more stable output. A dual mesh coil vape typically uses two mesh heating elements, which can boost flavour intensity and help maintain consistent vapor production, especially in higher-capacity devices.',
  },
  {
    q: 'How long does a disposable vape last in Dubai?',
    a: 'It depends on puff count and your usage. Light users may make a device last much longer, while heavy users will finish it faster. If you want fewer replacements, consider a high puff count vape or a rechargeable disposable vape uae option (rechargeable battery + prefilled e‑liquid).',
  },
  {
    q: 'What flavours are available (fruit, mint, tobacco, shisha-style)?',
    a: 'Many customers shop by flavour type such as fruit flavor vape Uae, mint flavor disposable vape, and tobacco flavor disposable uae. If you prefer hookah-inspired profiles, shisha-style lines are popular for shisha vape disposable uae and flavor disposable vape uae searches.',
  },
  {
    q: 'Do you offer Cash on Delivery UAE and fast shipping?',
    a: 'Yes, customers can request disposable vape cash on delivery uae (also written as disposable vape cash on delivery Uae) through Cash on Delivery UAE where available. We also support speed options like disposable vape same day delivery uae in selected areas and Next-Day Delivery UAE in many locations.',
  },
];

export const CollectionFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="vap-faq-section" aria-label="Frequently Asked Questions">
      <div className="page-width max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="vap-faq-header vap-animate-in">
          <span className="vap-faq-badge">Got Questions?</span>
          <h2 className="vap-faq-title">Frequently Asked Questions</h2>
          <p className="vap-faq-subtitle">Everything you need to know about our products and services.</p>
        </div>

        <div className="vap-faq-layout">
          {/* Decorative side panel */}
          <div className="vap-faq-side vap-animate-in">
            <div className="vap-faq-side-card">
              <div className="vap-faq-side-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
                  <text x="32" y="40" textAnchor="middle" fontSize="26" fill="currentColor">?</text>
                </svg>
              </div>
              <h3>Still have questions?</h3>
              <p>Can&apos;t find the answer you&apos;re looking for? Our support team is happy to help you.</p>

              <Link href="/pages/contact-us" className="vap-faq-cta">
                <span className="vap-faq-cta-text">Contact Support</span>
                <span className="vap-faq-cta-icon" aria-hidden="true">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>

              <div className="vap-faq-side-blobs">
                <span className="blob blob-1" />
                <span className="blob blob-2" />
              </div>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="vap-faq-accordion" id="vapFaqAccordion">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`vap-faq-item vap-animate-in ${isOpen ? 'is-open' : ''}`}
                  data-index={idx + 1}
                >
                  <button
                    className="vap-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(idx)}
                    type="button"
                  >
                    <span className="vap-faq-q-icon">
                      <span className="q-num">{idx + 1}</span>
                    </span>
                    <span className="vap-faq-q-text">{faq.q}</span>
                    <span className="vap-faq-chevron" aria-hidden="true">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  <div className="vap-faq-answer" role="region">
                    <div className="vap-faq-answer-inner">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

