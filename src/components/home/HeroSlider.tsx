'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const HeroSlider: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-dark-card via-dark-bg to-dark-bg border-b border-dark-border py-12 lg:py-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Tag / Badge */}
            <div className="inline-flex items-center space-x-2 bg-brand-500/10 border border-brand-500/30 px-3.5 py-1.5 rounded-full text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UAE&apos;s #1 Trusted Online Vape Store</span>
            </div>

            {/* Main Title (Exact from vapstall.ae) */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
              Buy Authentic Vape in Dubai —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-amber-300 to-brand-500">
                Fast Delivery, Best Prices
              </span>
            </h1>

            {/* Subtitle description */}
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover a premium selection of 100% genuine disposable vapes, pod systems, vape kits, and accessories from world-renowned brands like Elf Bar, VOZOL, Al Fakher, and Lost Mary. Same-day delivery across Dubai and fast shipping to all UAE Emirates.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-brand-500/20 flex items-center justify-center space-x-2"
              >
                <span>Shop All Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shop?category=Disposable+Vape"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors border border-slate-700 flex items-center justify-center"
              >
                <span>Explore Disposables</span>
              </Link>
            </div>

            {/* Key trust bullets */}
            <div className="pt-4 border-t border-dark-border/80 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-300">Same-Day UAE Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span className="text-xs font-medium text-gray-300">100% Authentic Brands</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">💵</span>
                <span className="text-xs font-medium text-gray-300">Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual / Featured Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 sm:w-96 aspect-square rounded-3xl bg-gradient-to-tr from-brand-500/20 via-slate-800/60 to-slate-900 border border-brand-500/30 p-6 shadow-2xl flex flex-col justify-between overflow-hidden group">
              <div className="flex justify-between items-start z-10">
                <span className="bg-brand-500 text-slate-950 text-xs font-black uppercase px-3 py-1 rounded-full shadow">
                  Top Seller
                </span>
                <span className="text-xs text-amber-400 font-bold bg-slate-900/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                  35,000 Puffs
                </span>
              </div>

              {/* Product Hero Image */}
              <div className="relative w-full h-56 my-auto transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/products/buy-kief-king-35000-puffs-3mg-disposable-vape-in-uae.png"
                  alt="Kief King 35000 Puffs Vape UAE"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="z-10 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Featured In Dubai</p>
                    <p className="text-sm font-bold text-white">Kief King 35000 Puffs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-brand-400 font-bold">AED 49.00</p>
                    <p className="text-[10px] text-emerald-400">In Stock</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

