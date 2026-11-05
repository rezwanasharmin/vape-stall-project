'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandsList } from '@/data/brands';

export const BrandsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 4 staggered gentle float animations
  const floatClasses = [
    'animate-brand-move-1',
    'animate-brand-move-2',
    'animate-brand-move-3',
    'animate-brand-move-4',
  ];

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

  return (
    <section
      ref={sectionRef}
      className={`vap-marken-section w-full bg-white border-t border-slate-100 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Container rendering div.vap-brand-container at exactly 1396px width matching DevTools */}
      <div className="page-width max-w-[1436px] mx-auto px-4 sm:px-5">
        
        {/* Title matching vapstall.ae */}
        <h2 className="vap-common-title text-[28px] sm:text-[32px] md:text-[34px] font-bold text-[#1a2f52] text-center mb-6 sm:mb-8 tracking-tight">
          Brands
        </h2>

        {/* 24 Brands Grid: 1396px x 494.8px matching exact DevTools inspection */}
        <div className="vap-brand-container">
          {brandsList.map((brand, index) => {
            const floatClass = floatClasses[index % floatClasses.length];

            return (
              <Link
                key={brand.id}
                href={brand.link}
                aria-label={`Shop ${brand.name} products`}
                className="vap-brand-item group relative select-none"
                style={{ '--i': index } as React.CSSProperties}
              >
                {/* Continuous gentle floating movement and hover zoom */}
                <div className={`flex items-center justify-center w-full h-full ${floatClass}`}>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={150}
                    height={147}
                    className="max-w-full h-auto object-contain select-none transition-transform duration-300 ease-in-out group-hover:scale-105"
                    priority={index < 8}
                  />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
