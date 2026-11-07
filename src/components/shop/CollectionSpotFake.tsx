'use client';

import React from 'react';

export const CollectionSpotFake: React.FC = () => {
  return (
    <section className="vsf-section" aria-labelledby="vsf-main-title">
      {/* Decorative background */}
      <div className="vsf-bg-deco" aria-hidden="true">
        <span className="vsf-bg-text">AUTHENTIC</span>
        <div className="vsf-bg-orb vsf-bg-orb--a" />
        <div className="vsf-bg-orb vsf-bg-orb--b" />
      </div>

      <div className="vsf-inner page-width max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="vsf-header">
          <div className="vsf-eyebrow">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Stay Protected
          </div>

          <h2 className="vsf-title" id="vsf-main-title">
            How to Identify Genuine Disposable Vapes in UAE
          </h2>
          <p className="vsf-subtitle">
            Counterfeit disposable vapes are common in the market and can lead to low-grade materials,
            uneven nicotine delivery, unpleasant flavour, and battery problems. Use these checks
            before you order disposable vape UAE, especially if a listing looks unusually cheap.
          </p>
        </header>

        {/* Cards */}
        <div className="vsf-grid">
          <div className="vsf-card" style={{ '--card-i': 0 } as React.CSSProperties}>
            <div className="vsf-card__num-bg" aria-hidden="true">
              01
            </div>
            <div className="vsf-card__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="vsf-card__step">Step 01</p>
            <h3 className="vsf-card__title">Verify the Authenticity Code</h3>
            <p className="vsf-card__desc">
              Many major brands (including Elf Bar, Vozol, Myle Vape, and Al Fakher Crown Bar)
              include QR or serial verification on the packaging. Scan the QR code or verify the
              serial on the brand&apos;s official site. Shoppers also look for regulatory clarity through
              MoIAT references, especially when trying to avoid grey-market stock.
            </p>
          </div>

          <div className="vsf-card" style={{ '--card-i': 1 } as React.CSSProperties}>
            <div className="vsf-card__num-bg" aria-hidden="true">
              02
            </div>
            <div className="vsf-card__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <p className="vsf-card__step">Step 02</p>
            <h3 className="vsf-card__title">Check Build &amp; Packaging Quality</h3>
            <p className="vsf-card__desc">
              Genuine products usually have sharp printing, correct branding, sealed boxes, and clean
              device finishing. Red flags include spelling errors, faded colours, broken seals, or
              rough device edges.
            </p>
          </div>

          <div className="vsf-card" style={{ '--card-i': 2 } as React.CSSProperties}>
            <div className="vsf-card__num-bg" aria-hidden="true">
              03
            </div>
            <div className="vsf-card__icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                <line x1="7" y1="7" x2="7.01" y2="7" />
              </svg>
            </div>
            <p className="vsf-card__step">Step 03</p>
            <h3 className="vsf-card__title">Compare Market Pricing (AED)</h3>
            <p className="vsf-card__desc">
              Compare against normal market pricing and avoid unrealistic &quot;too good to be true&quot;
              offers. Always check the disposable vape price AED and make sure the disposable vape AED
              price matches the product type, puff count, and features. Be especially cautious if someone
              claims the disposable vape best price UAE with no authenticity proof.
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="vsf-trust">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          All products at Vape Stall are 100% verified authentic
        </div>
      </div>
    </section>
  );
};

