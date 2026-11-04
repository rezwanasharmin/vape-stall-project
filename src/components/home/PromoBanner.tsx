'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PromoBanner: React.FC = () => {
  return (
    <section className="offer-card-section bg-[#f3f6fb] py-16 sm:py-20 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-block">
          
          {/* Card 1: Vape Kits & Pod Systems */}
          <div
            className="offer-card"
            style={{
              background: 'linear-gradient(135deg, rgba(110, 189, 184, 1), rgba(110, 189, 184, 1) 98%)',
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
                  <span className="arrow-icon" aria-hidden="true">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
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
                  className="w-auto h-auto max-h-[310px] object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Card 2: Premium Vape Collection */}
          <div
            className="offer-card"
            style={{
              background: '#E0BEA5',
            }}
          >
            <div className="offer-card__deco" />
            
            <div className="text-block">
              <h3 className="lbl">Premium Vape Collection</h3>
              <p className="text">
                Discover top-tier vape devices crafted for performance, style, and an elevated vaping experience.
              </p>
              <div className="btn-container">
                <Link href="/shop" className="btn-shop">
                  <span>Shop Premium</span>
                  <span className="arrow-icon" aria-hidden="true">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.8}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>

            <div className="img-container">
              <div className="img-wrapper">
                <Image
                  src="/images/banners/offer-premium-logo.png"
                  alt="Premium Vape Collection"
                  width={600}
                  height={589}
                  className="w-auto h-auto max-h-[310px] object-contain drop-shadow-xl"
                  priority
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
