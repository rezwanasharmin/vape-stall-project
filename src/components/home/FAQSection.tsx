'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FAQItem {
  number: number;
  question: string;
  answer: string;
}

const faqList: FAQItem[] = [
  {
    number: 1,
    question: 'What products does Vape Stall offer?',
    answer:
      'We offer a wide range of disposable vapes, pod systems, starter kits, and vape accessories from top global brands. Whether you’re a beginner or an experienced vaper, you’ll find the right device for your needs.',
  },
  {
    number: 2,
    question: 'Are your vape products authentic?',
    answer:
      'Yes, all products at Vape Stall are 100% authentic and sourced from trusted suppliers and authorized distributors. We do not sell fake or counterfeit vapes.',
  },
  {
    number: 3,
    question: 'Do you offer same-day delivery in Dubai?',
    answer:
      'Yes, we provide <strong>same-day delivery across Dubai</strong> for eligible orders. Delivery times may vary based on order time and location.',
  },
  {
    number: 4,
    question: 'What payment methods do you accept?',
    answer:
      'We accept <strong>cash on delivery (COD)</strong> and <strong>card payments</strong>, making your shopping experience convenient and flexible.',
  },
  {
    number: 5,
    question: 'Can I refill a disposable vape?',
    answer:
      'No, disposable vapes are <strong>pre-filled and non-refillable</strong>. Once finished, they should be safely disposed of and replaced with a new device.',
  },
  {
    number: 6,
    question: 'How do I choose the right vape as a beginner?',
    answer:
      "If you're new, we recommend starting with a <strong>pod system or disposable vape</strong>, as they are easy to use, require no setup, and provide a smooth nicotine experience.",
  },
  {
    number: 7,
    question: 'Do you have a physical store?',
    answer:
      'Yes, Vape Stall is expanding into <a href="https://maps.app.goo.gl/k8rbf6nAYFjNbHBc6" target="_blank" rel="noopener noreferrer"><strong>offline retail</strong></a>, allowing customers to experience products in-store alongside our online shopping platform.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="vap-faq-section"
      aria-label="Frequently Asked Questions"
    >
      <div className="page-width max-w-[1496px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`vap-faq-header ${isVisible ? 'vap-animate-in' : ''}`}>
          <span className="vap-faq-badge">Got Questions?</span>
          <h2 className="vap-faq-title">Frequently Asked Questions</h2>
          <p className="vap-faq-subtitle">
            Everything you need to know about our products and services.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="vap-faq-layout">
          
          {/* Decorative Side Panel */}
          <div className={`vap-faq-side ${isVisible ? 'vap-animate-in' : ''}`}>
            <div className="vap-faq-side-card">
              {/* Rotating Question Icon */}
              <div className="vap-faq-side-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                  />
                  <text
                    x="32"
                    y="40"
                    textAnchor="middle"
                    fontSize="26"
                    fill="currentColor"
                  >
                    ?
                  </text>
                </svg>
              </div>

              <h3>Still have questions?</h3>
              <p>
                Can&apos;t find the answer you&apos;re looking for? Our support team
                is happy to help you.
              </p>

              <Link href="/pages/contact-us" className="vap-faq-cta">
                <span className="vap-faq-cta-text">Contact Support</span>
                <span className="vap-faq-cta-icon" aria-hidden="true">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </Link>

              {/* Decorative blobs */}
              <div className="vap-faq-side-blobs">
                <span className="blob blob-1" />
                <span className="blob blob-2" />
              </div>
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="vap-faq-accordion" id="vapFaqAccordion">
            {faqList.map((item, idx) => {
              const isOpen = openIndex === item.number;
              const delay = isVisible ? `${idx * 0.06}s` : '0s';

              return (
                <div
                  key={item.number}
                  className={`vap-faq-item ${isOpen ? 'is-open' : ''} ${
                    isVisible ? 'vap-animate-in' : ''
                  }`}
                  data-index={item.number}
                  style={{ transitionDelay: delay }}
                >
                  <button
                    type="button"
                    className="vap-faq-question"
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(item.number)}
                  >
                    <span className="vap-faq-q-icon">
                      <span className="q-num">{item.number}</span>
                    </span>

                    <span className="vap-faq-q-text">{item.question}</span>

                    <span className="vap-faq-chevron" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="vap-faq-answer"
                    style={{
                      maxHeight: isOpen ? '600px' : '0px',
                    }}
                    role="region"
                  >
                    <div className="vap-faq-answer-inner">
                      <p
                        dangerouslySetInnerHTML={{ __html: item.answer }}
                      />
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

