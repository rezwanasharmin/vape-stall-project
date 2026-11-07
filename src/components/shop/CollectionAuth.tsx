'use client';

import React, { useEffect, useRef, useState } from 'react';

export const CollectionAuth: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();

            // Animate stats
            const targets = [2000000, 300, 30, 100];
            const startTime = performance.now();
            const duration = 1600;

            const tick = (now: number) => {
              const elapsed = Math.min((now - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - elapsed, 3);
              setCounts(targets.map((t) => Math.floor(ease * t)));
              if (elapsed < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="vap-auth-section" id="vapAuthSection">
      {/* Animated background particles */}
      <div className="vap-auth-particles" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className={`vap-auth-particle vap-auth-particle--${i + 1}`} />
        ))}
      </div>

      {/* Decorative glow orbs */}
      <div className="vap-auth-orb vap-auth-orb--1" aria-hidden="true" />
      <div className="vap-auth-orb vap-auth-orb--2" aria-hidden="true" />
      <div className="vap-auth-orb vap-auth-orb--3" aria-hidden="true" />

      <div className="page-width vap-auth-inner max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`vap-auth-header ${isInView ? 'vap-in' : ''}`}>
          <div className="vap-auth-badge-pill">
            <span className="vap-auth-badge-dot" />
            Official Status
          </div>
          <h2 className="vap-auth-headline">
            <span className="vap-auth-headline-line">Certified &amp; </span>
            <span className="vap-auth-headline-line vap-auth-headline-line--accent">Authorised Dealer</span>
          </h2>
          <p className="vap-auth-sub">
            Vape Stall distributes authentic vaping products and nicotine pouches throughout the UAE.
            We distribute authentic vaping products and nicotine pouches through a streamlined fulfillment process.
            Our current inventory includes disposable vapes, pod systems, and starter kits from manufacturers such
            as Elf Bar, Lost Mary, VOZOL, and Al Fakher, as well as Velo and Zyn nicotine pouches. We select products
            from manufacturers with established standards for quality and reliability. Our distribution network reaches
            across all seven Emirates, managing deliveries from Abu Dhabi to Fujairah. We use secure packaging for every
            order and provide a specific point of contact for logistics support. By verifying the authenticity of each
            item and offering competitive rates, we maintain a supply chain free of counterfeit goods. Whether you require
            a basic disposable unit or a refillable system, we offer a practical and dependable solution for vaping
            requirements in the UAE.
          </p>
        </div>

        {/* Central Seal */}
        <div className={`vap-auth-seal-wrap ${isInView ? 'vap-in' : ''}`}>
          <div className="vap-auth-seal">
            {/* Outer spinning ring */}
            <svg className="vap-auth-ring vap-auth-ring--outer" viewBox="0 0 260 260" aria-hidden="true">
              <circle cx="130" cy="130" r="122" fill="none" stroke="url(#ringGradOuter)" strokeWidth="2" strokeDasharray="8 5" />
            </svg>
            {/* Middle spinning ring */}
            <svg className="vap-auth-ring vap-auth-ring--mid" viewBox="0 0 220 220" aria-hidden="true">
              <defs>
                <linearGradient id="ringGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c9a84c" />
                  <stop offset="100%" stopColor="#f0d070" />
                </linearGradient>
                <linearGradient id="ringGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0d070" />
                  <stop offset="100%" stopColor="#c9a84c" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r="103" fill="none" stroke="url(#ringGradMid)" strokeWidth="1.5" strokeDasharray="4 8" />
            </svg>
            {/* Seal body */}
            <div className="vap-auth-seal-body">
              {/* Star burst decorative */}
              <svg className="vap-auth-starburst" viewBox="0 0 200 200" aria-hidden="true">
                <polygon
                  points="100,10 113,70 170,40 130,90 190,100 130,110 170,160 113,130 100,190 87,130 30,160 70,110 10,100 70,90 30,40 87,70"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="1.5"
                  opacity="0.35"
                />
              </svg>
              {/* Icon */}
              <div className="vap-auth-seal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <path d="M32 4L38.5 14H50L42 22L45.5 34L32 28L18.5 34L22 22L14 14H25.5L32 4Z" fill="#c9a84c" opacity="0.9" />
                  <path d="M22 36L26 46L32 42L38 46L42 36" stroke="#c9a84c" strokeWidth="2" strokeLinejoin="round" fill="none" />
                  <circle cx="32" cy="24" r="7" fill="#f0d070" opacity="0.95" />
                  <polyline points="28,24 31,27 36,21" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <div className="vap-auth-seal-text">
                <span className="vap-auth-seal-top">OFFICIAL</span>
                <span className="vap-auth-seal-main">AUTHORISED</span>
                <span className="vap-auth-seal-sub">DEALER</span>
                <span className="vap-auth-seal-year">EST. 2021</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="vap-auth-stats">
          <div className={`vap-auth-stat ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0s' }}>
            <div className="vap-auth-stat-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="vap-auth-stat-num">{counts[0].toLocaleString()}</div>
            <div className="vap-auth-stat-suffix">+</div>
            <div className="vap-auth-stat-label">Happy Customers</div>
          </div>

          <div className={`vap-auth-stat ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <div className="vap-auth-stat-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="vap-auth-stat-num">{counts[1]}</div>
            <div className="vap-auth-stat-suffix">+</div>
            <div className="vap-auth-stat-label">Brands Delivered</div>
          </div>

          <div className={`vap-auth-stat ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <div className="vap-auth-stat-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div className="vap-auth-stat-num">{counts[2]}</div>
            <div className="vap-auth-stat-suffix">+</div>
            <div className="vap-auth-stat-label">Top Brands</div>
          </div>

          <div className={`vap-auth-stat ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <div className="vap-auth-stat-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <div className="vap-auth-stat-num">{counts[3]}</div>
            <div className="vap-auth-stat-suffix">%</div>
            <div className="vap-auth-stat-label">Genuine Products</div>
          </div>
        </div>

        {/* Certificate Badges Row */}
        <div className="vap-auth-badges">
          <div className={`vap-auth-cert ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.08s' }}>
            <div className="vap-auth-cert-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 11 12 14 22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div className="vap-auth-cert-info">
              <strong>100% Authentic Products</strong>
              <span>Sourced directly from manufacturers</span>
            </div>
          </div>

          <div className={`vap-auth-cert ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.16s' }}>
            <div className="vap-auth-cert-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="vap-auth-cert-info">
              <strong>Fully Certified &amp; Licensed</strong>
              <span>Compliant with all regulations</span>
            </div>
          </div>

          <div className={`vap-auth-cert ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.24s' }}>
            <div className="vap-auth-cert-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <div className="vap-auth-cert-info">
              <strong>Official Brand Partnership</strong>
              <span>Directly partnered with global brands</span>
            </div>
          </div>

          <div className={`vap-auth-cert ${isInView ? 'vap-in' : ''}`} style={{ transitionDelay: '0.32s' }}>
            <div className="vap-auth-cert-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="vap-auth-cert-info">
              <strong>Secure &amp; Trusted Transactions</strong>
              <span>PCI-compliant encrypted payments</span>
            </div>
          </div>
        </div>

        {/* Brand authorisation marquee */}
        <div className="vap-auth-marquee-wrap">
          <span className="vap-auth-marquee-label">Authorised for:</span>
          <div className="vap-auth-marquee" aria-label="Authorised brands">
            <div className="vap-auth-marquee-track">
              <span>OXVA</span><span>UWELL</span><span>SMOK</span><span>GeekVape</span><span>Vaporesso</span>
              <span>VOOPOO</span><span>Lost Vape</span><span>Elf Bar</span><span>Al Fakher</span><span>HQD</span>
              <span>VOZOL</span><span>IGNITE</span><span>Xtra</span><span>Fummo</span><span>Silvaper</span>
              {/* duplicate for seamless loop */}
              <span>OXVA</span><span>UWELL</span><span>SMOK</span><span>GeekVape</span><span>Vaporesso</span>
              <span>VOOPOO</span><span>Lost Vape</span><span>Elf Bar</span><span>Al Fakher</span><span>HQD</span>
              <span>VOZOL</span><span>IGNITE</span><span>Xtra</span><span>Fummo</span><span>Silvaper</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

