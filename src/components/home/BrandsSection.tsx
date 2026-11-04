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
    }, 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-20 bg-white border-t border-slate-100"
    >
      {/* Container matching ProductSection & NewArrivalsSection on both sides */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Title matching previous sections */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2f52] text-center mb-8 sm:mb-12 tracking-tight">
          Brands
        </h2>

        {/* 24 Brands Grid with 100% stable, persistent borders that never disappear */}
        <div className="vap-brand-container">
          {brandsList.map((brand, index) => (
            <Link
              key={brand.id}
              href={brand.link}
              aria-label={`Shop ${brand.name} products`}
              className="vap-brand-item group relative select-none"
            >
              {/* Inner wrapper for smooth hover zoom and staggered scale-in animation */}
              <div
                className={`flex items-center justify-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-108 ${
                  isVisible ? 'animate-brand-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.08 + index * 0.035}s` }}
              >
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={180}
                  height={120}
                  className="max-h-[82px] sm:max-h-[92px] md:max-h-[105px] w-auto max-w-[85%] object-contain"
                  priority={index < 8}
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
