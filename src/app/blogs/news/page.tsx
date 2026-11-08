'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { insightArticles } from '@/data/insights';

export default function BlogListingPage() {
  return (
    <div className="bg-[#f4f7fc] min-h-screen py-10">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#25406f]">Home</Link>
          <span>/</span>
          <span className="text-[#25406f] font-semibold">News</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a2a4a] mb-3">
            Disposable Vape Insights
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Learn &amp; Choose the best authentic vapes in UAE
          </p>
        </div>

        {/* Grid of articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insightArticles.map((article) => (
            <Link
              key={article.id}
              href={article.href}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:border-[#25406f]/30 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold text-[#b48648] uppercase tracking-wider mb-1.5">
                  {article.author}
                </span>
                
                <h2 className="text-base font-bold text-[#1a2a4a] group-hover:text-[#25406f] transition-colors line-clamp-2 mb-2 leading-snug">
                  {article.title}
                </h2>

                <span className="text-xs text-slate-400 font-medium mb-3">
                  {article.date}
                </span>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#25406f] group-hover:text-[#b48648] transition-colors">
                  <span>Read more</span>
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
