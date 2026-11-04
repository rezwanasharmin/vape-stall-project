'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandsList } from '@/data/brands';

export const BrandsSection: React.FC = () => {
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback: make visible if not triggered
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`vap-marken-section w-full bg-white ${isVisible ? 'is-visible' : ''}`}
    >
      {/* Container with max-w-[1240px] matching vapstall.ae page-width */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* Title matching vapstall.ae */}
        <h2 className="vap-common-title text-[28px] sm:text-[32px] md:text-[34px] font-bold text-[#1a2f52] text-center mb-6 sm:mb-8 tracking-tight">
          Brands
        </h2>

        {/* 24 Brands Grid with visible outer border and inner dividers */}
        <div className="vap-brand-container">
          {brandsList.map((brand, index) => (
            <Link
              key={brand.id}
              href={brand.link}
              aria-label={`Shop ${brand.name} products`}
              className="vap-brand-item group"
              style={{ '--i': index } as React.CSSProperties}
            >
              {/* Large brand logo filling the cell nicely */}
              <Image
                src={brand.image}
                alt={brand.name}
                width={150}
                height={147}
                className="max-h-[82px] sm:max-h-[88px] md:max-h-[96px] w-auto max-w-[90%] object-contain select-none transition-transform duration-300 ease-in-out group-hover:scale-106"
                priority={index < 8}
              />
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
