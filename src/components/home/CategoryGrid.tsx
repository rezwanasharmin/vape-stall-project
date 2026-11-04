'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data/products';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-dark-bg border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-widest mb-2">
            <span>Explore Collections</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-1 bg-brand-500 mx-auto mt-3 rounded-full" />
          <p className="text-xs sm:text-sm text-gray-400 mt-3">
            Browse our curated categories of authentic vapes, pod kits, and e-liquids available across the UAE.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${encodeURIComponent(cat.title)}`}
              className="group relative rounded-2xl overflow-hidden bg-dark-card border border-dark-border hover:border-brand-500/60 transition-all duration-300 flex flex-col justify-end aspect-[4/5] p-6 shadow-lg"
            >
              {/* Category Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="relative z-10 space-y-2">
                <span className="text-[11px] font-bold tracking-wider text-brand-400 uppercase bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-brand-500/30 inline-block">
                  {cat.itemCount}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-400 transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-brand-500 group-hover:text-slate-950 text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

