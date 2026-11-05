'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div
      className="group relative bg-white border border-[#d9d9d9] hover:border-transparent rounded-[14px] sm:rounded-[18px] p-2 sm:p-3.5 pb-3 sm:pb-4 flex flex-col justify-between h-full w-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(37,64,111,0.16)] cursor-pointer"
      onClick={(e) => {
        // If clicking on a button or link, don't trigger wrapper link
        const target = e.target as HTMLElement;
        if (!target.closest('button') && !target.closest('a')) {
          window.location.href = `/product/${product.handle}`;
        }
      }}
    >
      {/* Top Left: Translucent Wishlist Heart Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label={`Wishlist ${product.name}`}
        className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/95 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center transition-all duration-200"
      >
        <Heart
          className={`w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Top Right: Animated Badge (e.g. 7% OFF | 1 Box on Card 4) */}
      {product.badge && (
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 animate-vap-badge pointer-events-none">
          <span className="bg-[#dc2626] text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image Area with Smooth Flip & Zoom Animation - Larger Aspect Ratio */}
      <div className="relative overflow-hidden rounded-[10px] sm:rounded-[12px] aspect-[1/1.08] w-full flex items-center justify-center bg-[#fafafa]">
        {/* Primary Image (No inner padding so pedestal and devices are big) */}
        <div className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain transition-all duration-500 group-hover:scale-106 group-hover:opacity-0"
            priority={false}
          />

          {/* Secondary / Flavor Splash Hover Image with smooth zoom and fade animation */}
          {product.altImage && (
            <Image
              src={product.altImage}
              alt={`${product.name} hover view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-106"
            />
          )}
        </div>

        {/* Quick View Bar (Slides up on hover) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#25406F]/90 via-[#25406F]/70 to-transparent pt-6 sm:pt-8 pb-2 sm:pb-3 px-2 sm:px-3 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 cursor-pointer"
        >
          <span className="text-white text-[11px] sm:text-[12px] font-bold tracking-widest uppercase drop-shadow-sm">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-2 sm:pt-3.5 pb-0.5 sm:pb-1 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[13px] sm:text-[16px] font-semibold text-[#000000] line-clamp-2 leading-[1.3] sm:leading-[1.38] min-h-[34px] sm:min-h-[44px] h-[34px] sm:h-[44px] group-hover:text-[#25406F] transition-colors">
          <Link href={`/product/${product.handle}`} onClick={(e) => e.stopPropagation()}>
            {product.name}
          </Link>
        </h3>

        {/* Stars and Review Count */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 mt-1 sm:mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className="w-3 h-3 sm:w-4 sm:h-4 fill-[#F59E0B] text-[#F59E0B]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] sm:text-[14px] text-gray-500 font-medium">
            {product.reviewsCount} reviews
          </span>
        </div>

        {/* Stock Status Badge Slot - uniform spacing */}
        <div className="min-h-[18px] sm:min-h-[26px] flex items-center mt-1 sm:mt-1.5">
          {product.isOutOfStock ? (
            <span className="bg-[#fee2e2] text-[#991b1b] text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md inline-block leading-tight">
              Out of stock
            </span>
          ) : null}
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-auto pt-2 sm:pt-3 flex items-center justify-between border-t border-slate-100 min-h-[42px] sm:min-h-[52px]">
          <div className="flex items-baseline flex-wrap gap-x-1.5 gap-y-0.5">
            {product.originalPriceFormatted && (
              <span className="text-[11px] sm:text-[14px] text-red-500 line-through decoration-red-500 font-medium">
                {product.originalPriceFormatted}
              </span>
            )}
            <span className="text-[13.5px] sm:text-[17px] font-bold text-[#1a2f52]">
              {product.priceFormatted}
            </span>
            {product.savingsFormatted && (
              <span className="text-[10px] sm:text-[12px] text-[#16a34a] font-semibold hidden xs:inline">
                {product.savingsFormatted}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-[#f1f5f9] hover:bg-[#25406F] text-[#25406F] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 flex-shrink-0"
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
          >
            <svg
              className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
