'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandsList } from '@/data/brands';

export const BrandsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Staggered gentle float movements so adjacent logos move organically
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
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Fallback: make visible if not triggered
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 md:py-28 bg-white border-t border-slate-100"
    >
      {/* Container matching ProductSection & NewArrivalsSection on both sides */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Title with generous spacing */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2f52] text-center mb-10 sm:mb-14 tracking-tight">
          Brands
        </h2>

        {/* 24 Brands Grid with 100% stable, persistent borders */}
        <div className="vap-brand-container">
          {brandsList.map((brand, index) => {
            const floatClass = floatClasses[index % floatClasses.length];

            return (
              <Link
                key={brand.id}
                href={brand.link}
                aria-label={`Shop ${brand.name} products`}
                className="vap-brand-item group relative select-none h-36 sm:h-40 md:h-44 lg:h-[165px]"
              >
                {/* Entrance scale-in & hover zoom wrapper */}
                <div
                  className={`w-full h-full flex items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-108 ${
                    isVisible ? 'animate-brand-scale-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.05 + index * 0.03}s` }}
                >
                  {/* Continuous gentle floating moving animation */}
                  <div className={`w-full h-full flex items-center justify-center ${floatClass}`}>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={200}
                      height={140}
                      className="max-h-[92px] sm:max-h-[105px] md:max-h-[115px] lg:max-h-[125px] w-auto max-w-[88%] object-contain select-none"
                      priority={index < 8}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
