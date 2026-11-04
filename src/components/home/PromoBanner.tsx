'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Gift } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <section className="py-12 bg-slate-950 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-600/20 via-brand-500/10 to-slate-900 border border-brand-500/30 p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Text Content */}
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-500/20 border border-brand-500/40 px-3 py-1 rounded-full text-brand-400 text-xs font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>Limited Time UAE Exclusive</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Get Up to <span className="text-brand-400">10% OFF</span> + Free Delivery Above AED 350
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Order your favorite authentic disposable vapes, pod kits, and e-liquids now. Enjoy fast same-day shipping across Dubai and seamless Cash on Delivery across all 7 Emirates.
            </p>

            <div className="flex items-center justify-center md:justify-start space-x-2 pt-2">
              <span className="text-xs text-gray-400">Coupon Code:</span>
              <span className="bg-slate-900 border border-brand-500/40 text-brand-400 font-mono font-bold text-xs px-3 py-1 rounded-lg">
                VAPE10
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex-shrink-0">
            <Link
              href="/shop"
              className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-black px-8 py-4 rounded-2xl text-sm transition-all shadow-xl shadow-brand-500/20 flex items-center space-x-2"
            >
              <span>Shop Discount Deals</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

