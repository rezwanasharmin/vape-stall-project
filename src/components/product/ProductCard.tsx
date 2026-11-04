'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Eye, Zap } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div
      className="group relative bg-dark-card border border-dark-border hover:border-brand-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.altImage) setImgSrc(product.altImage);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImgSrc(product.image);
      }}
    >
      <div>
        {/* Badges */}
        <div className="flex items-center justify-between mb-2 z-10 relative">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-brand-500/10 text-brand-400 border border-brand-500/30 px-2 py-0.5 rounded-full">
            {product.brand}
          </span>
          {product.puffs && (
            <span className="text-[10px] font-semibold text-gray-300 bg-slate-800/80 px-2 py-0.5 rounded-full flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>{product.puffs}</span>
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900/60 mb-4 p-4 flex items-center justify-center">
          <Link href={`/product/${product.handle}`} className="w-full h-full relative block">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              onError={() => {
                // Fallback to primary image if altImage has issue
                if (imgSrc !== product.image) setImgSrc(product.image);
              }}
            />
          </Link>

          {/* Quick View Button on Hover */}
          {onQuickView && (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-slate-950/90 hover:bg-brand-500 hover:text-slate-950 text-white text-xs font-semibold px-4 py-2 rounded-full border border-slate-700 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-1.5 shadow-lg whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center space-x-1.5">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-brand-400 transition-colors">
            <Link href={`/product/${product.handle}`}>{product.name}</Link>
          </h3>
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="pt-4 mt-2 border-t border-dark-border/60 flex items-center justify-between">
        <div>
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-bold text-brand-400">{product.priceFormatted}</span>
            {product.originalPriceFormatted && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPriceFormatted}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, 1)}
          className="bg-brand-500 hover:bg-brand-600 text-slate-950 p-2.5 rounded-xl transition-all shadow-md hover:shadow-brand-500/20 active:scale-95 flex items-center justify-center"
          title="Add to Cart"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

