'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PromoBanner: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPopupOpen]);

  return (
    <>
      <section
        ref={sectionRef}
        className={`offer-card-section bg-white w-full ${isVisible ? 'is-visible' : ''}`}
      >
        <div className="page-width">
          <div className="card-block">
            
            {/* Card 1: Vape Kits & Pod Systems */}
            <div
              className="offer-card"
              style={{
                background: 'linear-gradient(135deg, rgba(110, 189, 184, 1), rgba(110, 189, 184, 1) 98%)',
                color: '#ffffff',
              }}
            >
              <div className="offer-card__deco" />
              
              <div className="text-block">
                <h3 className="lbl">Vape Kits &amp; Pod Systems</h3>
                <p className="text">
                  Shop high-performance vape kits and pod systems designed for smooth flavor, long battery life, and everyday use.
                </p>
                <div className="btn-container">
                  <Link href="/shop" className="btn-shop">
                    <span>Shop Kits</span>
                    <span className="arrow-icon">→</span>
                  </Link>
                </div>
              </div>

              <div className="img-container">
                <div className="img-wrapper">
                  <Image
                    src="/images/banners/offer-vape-kits.png"
                    alt="Vape Kits & Pod Systems"
                    width={600}
                    height={600}
                    priority
                    style={{ height: 'auto' }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Premium Vape Collection */}
            <div
              className="offer-card"
              style={{
                background: '#E0BEA5',
                color: '#ffffff',
              }}
            >
              <div className="offer-card__deco" />
              
              <div className="text-block">
                <h3 className="lbl">Premium Vape Collection</h3>
                <p className="text">
                  Discover top-tier vape devices crafted for performance, style, and an elevated vaping experience.
                </p>
                <div className="btn-container">
                  <button
                    type="button"
                    onClick={() => setIsPopupOpen(true)}
                    className="btn-shop"
                    aria-label="Shop Premium collection coming soon"
                  >
                    <span>Shop Premium</span>
                    <span className="arrow-icon">→</span>
                  </button>
                </div>
              </div>

              <div className="img-container">
                <div className="img-wrapper">
                  <Image
                    src="/images/banners/offer-premium-logo.png"
                    alt="Premium Vape Collection"
                    width={600}
                    height={589}
                    priority
                    style={{ height: 'auto' }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Coming Soon Popup Modal (Exact from vapstall.ae) */}
      <div
        className={`vap-empty-popup-overlay ${isPopupOpen ? 'is-visible' : ''}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsPopupOpen(false);
        }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isPopupOpen}
      >
        <div className="vap-empty-popup">
          <div className="vap-empty-popup__header">
            <div className="vap-empty-popup__icon-wrap">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
          </div>

          <div className="vap-empty-popup__body">
            <button
              type="button"
              className="vap-empty-popup__close"
              aria-label="Close"
              onClick={() => setIsPopupOpen(false)}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <h3 className="vap-empty-popup__title">Coming Soon!</h3>

            <div className="vap-empty-popup__dots">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <p className="vap-empty-popup__msg">
              New arrivals are on the way.
              <br />
              Products will be available Soon.
            </p>

            <button
              type="button"
              className="vap-empty-popup__dismiss"
              onClick={() => setIsPopupOpen(false)}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
