'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brandsList } from '@/data/brands';

export const BrandsSection: React.FC = () => {
  // Staggered float animations for organic gentle movement
  const floatClasses = [
    'animate-brand-float-1',
    'animate-brand-float-2',
    'animate-brand-float-3',
    'animate-brand-float-4',
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2f52] text-center mb-8 sm:mb-10 tracking-tight">
          Brands
        </h2>

        {/* 24 Brands Grid (8 Columns x 3 Rows on Desktop) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 bg-[#f4f8ff] border border-[#cfd7e5] rounded-[15px] overflow-hidden shadow-sm">
          {brandsList.map((brand, index) => {
            const floatClass = floatClasses[index % floatClasses.length];

            return (
              <Link
                key={brand.id}
                href={brand.link}
                aria-label={`Shop ${brand.name} vape products`}
                className="flex items-center justify-center p-3 sm:p-5 h-24 sm:h-28 bg-[#f4f8ff] hover:bg-white transition-all duration-300 shadow-[1px_0_0_0_rgba(37,64,111,0.18),0_1px_0_0_rgba(37,64,111,0.18)] group relative overflow-hidden"
              >
                {/* Gentle Floating Wrapper */}
                <div className={`flex items-center justify-center w-full h-full ${floatClass}`}>
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={130}
                    height={65}
                    className="max-h-11 sm:max-h-13 w-auto object-contain transition-transform duration-300 group-hover:scale-110 select-none"
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
