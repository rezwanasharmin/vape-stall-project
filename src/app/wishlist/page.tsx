'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div className="min-h-[70vh] bg-[#f8fafc] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Wishlist Header ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div className="flex items-baseline gap-2.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1a2f52] tracking-tight">
              My Wishlist
            </h1>
            <span className="text-sm sm:text-base text-slate-500 font-medium">
              ({wishlistCount} {wishlistCount === 1 ? 'item' : 'items'})
            </span>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 border border-slate-300 hover:border-[#1a2f52] text-[#1a2f52] hover:bg-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm w-fit group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* ─── Wishlist Items Grid or Empty State ─── */}
        <div className="pt-8 pb-12">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center text-center py-16 sm:py-24">
              <div className="w-20 h-20 rounded-full bg-[#f1f4f9] flex items-center justify-center text-slate-400 mb-6 shadow-inner">
                <Heart className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1a2f52] mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
                Save items you love by clicking the heart icon on any product across our collection.
              </p>
              <Link
                href="/shop"
                className="bg-[#25406f] hover:bg-[#ffb347] hover:text-slate-950 text-white font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Start Shopping</span>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

