'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const PromoBanner: React.FC = () => {
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
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Safety fallback
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`offer-card-section ${isVisible ? 'is-visible' : ''}`}
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
                <Link href="/shop" className="btn-shop">
                  <span>Shop Premium</span>
                  <span className="arrow-icon">→</span>
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
                  priority
                  style={{ height: 'auto' }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
