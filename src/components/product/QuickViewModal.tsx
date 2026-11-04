'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product?.flavors?.[0] || 'Blueberry Ice'
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity, selectedFlavor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-slate-900/80 p-8 flex items-center justify-center relative aspect-square md:aspect-auto">
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Info & Options */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
              {product.brand}
            </span>

            <h2 className="text-lg font-bold text-white leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-3">
              <span className="text-2xl font-black text-brand-400">{product.priceFormatted}</span>
              {product.originalPriceFormatted && (
                <span className="text-sm text-gray-500 line-through">
                  {product.originalPriceFormatted}
                </span>
              )}
            </div>

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div className="pt-2">
                <label className="text-xs font-semibold text-gray-300 block mb-2">
                  Select Flavor: <span className="text-brand-400 font-bold">{selectedFlavor}</span>
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  {product.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      type="button"
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center space-x-1 ${
                        selectedFlavor === flavor
                          ? 'bg-brand-500 text-slate-950 font-bold border-brand-500'
                          : 'bg-slate-900 text-gray-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {selectedFlavor === flavor && <Check className="w-3 h-3" />}
                      <span>{flavor}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="pt-6 border-t border-dark-border mt-4 space-y-3">
            <div className="flex items-center space-x-3">
              {/* Quantity Picker */}
              <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add Button */}
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>

            <Link
              href={`/product/${product.handle}`}
              onClick={onClose}
              className="block text-center text-xs text-gray-400 hover:text-brand-400 transition-colors"
            >
              View Full Product Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

