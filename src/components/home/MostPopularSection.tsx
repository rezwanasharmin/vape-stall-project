'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';

interface MostPopularSectionProps {
  products: Product[];
}

export const MostPopularSection: React.FC<MostPopularSectionProps> = ({ products }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="py-14 sm:py-20 bg-[#f3f6fb] border-t border-slate-100">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* Section Header (Exact design from vapstall.ae) */}
        <div className="text-center mb-10 sm:mb-12">
          {/* Eyebrow: — TRENDING NOW — */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="w-9 h-[1px] bg-[#F5A623] opacity-60" />
            <span className="text-[12px] font-bold tracking-[0.18em] uppercase text-[#F5A623]">
              Trending Now
            </span>
            <span className="w-9 h-[1px] bg-[#F5A623] opacity-60" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#25406F] tracking-tight mb-2.5">
            Most Popular
          </h2>

          {/* 3 Dots accent */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25406F] opacity-20" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#25406F] opacity-20" />
          </div>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-gray-500 font-normal max-w-lg mx-auto">
            What everyone is reaching for right now
          </p>
        </div>

        {/* 4 Cards Grid - Exact size and style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Section Footer: View All Button */}
        <div className="flex justify-center mt-12 sm:mt-14">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 bg-[#25406F] hover:bg-[#F5A623] text-white text-[14px] sm:text-[15px] font-semibold px-9 py-3.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(37,64,111,0.18)] hover:shadow-[0_6px_20px_rgba(245,166,35,0.32)] hover:-translate-y-0.5 active:scale-95"
          >
            <span>View All</span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
