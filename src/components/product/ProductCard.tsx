'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div
      className="group relative bg-white border border-[#e2e8f0] hover:border-transparent rounded-[16px] p-2.5 sm:p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(37,64,111,0.14)] cursor-pointer"
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
          setIsWishlisted(!isWishlisted);
        }}
        aria-label={`Wishlist ${product.name}`}
        className="absolute top-3.5 left-3.5 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all duration-200"
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 hover:text-red-500'
          }`}
        />
      </button>

      {/* Top Right: Animated Badge (e.g. 7% OFF | 1 Box on Card 4) */}
      {product.badge && (
        <div className="absolute top-3.5 right-3.5 z-20 animate-vap-badge pointer-events-none">
          <span className="bg-[#dc2626] text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm whitespace-nowrap">
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image Area with Smooth Flip & Zoom Animation */}
      <div className="relative overflow-hidden rounded-xl aspect-square w-full flex items-center justify-center bg-[#fafafa]">
        {/* Primary Image */}
        <div className="w-full h-full relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 transition-all duration-500 group-hover:scale-105"
            priority={false}
          />

          {/* Secondary / Flavor Splash Hover Image */}
          {product.altImage && (
            <Image
              src={product.altImage}
              alt={`${product.name} hover view`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
            />
          )}
        </div>

        {/* Quick View Bar (Slides up on hover) */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (onQuickView) onQuickView(product);
          }}
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#25406F]/90 via-[#25406F]/70 to-transparent pt-6 pb-2.5 px-3 flex items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 cursor-pointer"
        >
          <span className="text-white text-[11px] font-bold tracking-widest uppercase drop-shadow-sm">
            Quick View
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[14px] sm:text-[15px] font-semibold text-[#1a2f52] line-clamp-2 leading-[1.35] min-h-[40px] group-hover:text-[#25406F] transition-colors">
          <Link href={`/product/${product.handle}`} onClick={(e) => e.stopPropagation()}>
            {product.name}
          </Link>
        </h3>

        {/* Stars and Review Count */}
        <div className="flex items-center space-x-1.5 mt-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[12px] sm:text-[13px] text-gray-500 font-medium">
            {product.reviewsCount} reviews
          </span>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-slate-100">
          <span className="text-[15px] sm:text-[16px] font-bold text-[#1a2f52]">
            {product.priceFormatted}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f1f5f9] hover:bg-[#25406F] text-[#25406F] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95"
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
          >
            <svg
              className="w-4 h-4"
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
