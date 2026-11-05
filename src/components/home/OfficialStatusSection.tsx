'use client';

import React, { useEffect, useRef, useState } from 'react';

const statsData = [
  { target: 2000000, suffix: '+', label: 'Happy Customers' },
  { target: 300, suffix: '+', label: 'Brands Delivered' },
  { target: 30, suffix: '+', label: 'Top Brands' },
  { target: 100, suffix: '%', label: 'Genuine Products' },
];

const certBadges = [
  {
    title: '100% Authentic Products',
    desc: 'Sourced directly from manufacturers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    title: 'Fully Certified & Licensed',
    desc: 'Compliant with all regulations',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Official Brand Partnership',
    desc: 'Directly partnered with global brands',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    title: 'Secure & Trusted Transactions',
    desc: 'PCI-compliant encrypted payments',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
];

const marqueeBrands = [
  'OXVA', 'UWELL', 'SMOK', 'GeekVape', 'Vaporesso',
  'VOOPOO', 'Lost Vape', 'Elf Bar', 'Al Fakher', 'HQD',
  'VOZOL', 'IGNITE', 'Xtra', 'Fummo', 'Silvaper'
];

export function OfficialStatusSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Add entrance class to header
          const header = section.querySelector('.vap-auth-header');
          if (header) header.classList.add('vap-in');

          // Add entrance class to seal
          const seal = section.querySelector('.vap-auth-seal-wrap');
          if (seal) seal.classList.add('vap-in');

          // Add entrance class to stats with staggered transition delay
          const statEls = section.querySelectorAll<HTMLElement>('.vap-auth-stat');
          statEls.forEach((el, i) => {
            el.style.transitionDelay = `${0.1 * i}s`;
            el.classList.add('vap-in');
          });

          // Add entrance class to cert badges with staggered transition delay
          const certEls = section.querySelectorAll<HTMLElement>('.vap-auth-cert');
          certEls.forEach((el, i) => {
            el.style.transitionDelay = `${0.08 * i}s`;
            el.classList.add('vap-in');
          });

          // Count-up animation for stats
          if (!hasAnimated) {
            setHasAnimated(true);
            const duration = 1600;
            const startTime = performance.now();

            const tick = (now: number) => {
              const t = Math.min((now - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
              setCounts(statsData.map((s) => Math.floor(ease * s.target)));

              if (t < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
          }

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div id="shopify-section-template--28099413770470__vap_authorization_section" className="shopify-section">
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

        <div className="page-width vap-auth-inner">
          {/* Header */}
          <div className="vap-auth-header">
            <div className="vap-auth-badge-pill">
              <span className="vap-auth-badge-dot" />
              Official Status
            </div>
            <h2 className="vap-auth-headline">
              <span className="vap-auth-headline-line">Certified &amp;</span>{' '}
              <span className="vap-auth-headline-line vap-auth-headline-line--accent">Authorised Dealer</span>
            </h2>
            <p className="vap-auth-sub">
              Welcome to Vape Stall, your trusted vape shop in UAE. We offer a wide selection of genuine vaping products for all kinds of users. You’ll find disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from top brands like Elf bar, Lost Mary, VOZOL, HQD, Al Fakher, and others. These brands are popular around the world for their uniform performance, great flavors, and reliability.
              <br /><br />
              As a growing vape shop in UAE, Vape Stall serves newcomers and and experienced vapers with convenience and confidence. Whether you need high puff disposable vapes, refillable pod devices, starter kits, or nicotine pouches like Velo and Zyn, our collection has been specially chosen to fulfill modern vaping demands.
              <br /><br />
              We serve clients in all seven Emirates in the UAE (Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah). You can count on us for fast delivery and friendly customer service.
              <br /><br />
              You can shop with us online or in the shop, making Vape Stall your one-stop vape shop in the UAE. We offer fair prices, real products, and focus on making sure you are happy with your purchase and our service.
              <br /><br />
              At Vape Stall, we want to be your top choice for vaping in UAE. We offer quality products, trusted brands, and a easy shopping experience made for today’s vapers. Try Vape Stall and see how easy it is to enjoy premium vaping products.
            </p>
          </div>

          {/* Central Seal */}
          <div className="vap-auth-seal-wrap">
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
            {statsData.map((stat, i) => (
              <div key={i} className="vap-auth-stat">
                <div className="vap-auth-stat-num" data-count={stat.target}>
                  {counts[i]}
                </div>
                <div className="vap-auth-stat-suffix">{stat.suffix}</div>
                <div className="vap-auth-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Certificate Badges Row */}
          <div className="vap-auth-badges">
            {certBadges.map((cert, i) => (
              <div key={i} className="vap-auth-cert">
                <div className="vap-auth-cert-icon" aria-hidden="true">
                  {cert.icon}
                </div>
                <div className="vap-auth-cert-info">
                  <strong>{cert.title}</strong>
                  <span>{cert.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Brand authorisation marquee */}
          <div className="vap-auth-marquee-wrap">
            <span className="vap-auth-marquee-label">Authorised for:</span>
            <div className="vap-auth-marquee" aria-label="Authorised brands">
              <div className="vap-auth-marquee-track">
                {marqueeBrands.map((brand, i) => (
                  <span key={`b1-${i}`}>{brand}</span>
                ))}
                {/* Duplicate for seamless infinite loop */}
                {marqueeBrands.map((brand, i) => (
                  <span key={`b2-${i}`}>{brand}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
