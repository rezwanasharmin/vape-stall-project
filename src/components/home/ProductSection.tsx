'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';

interface ProductSectionProps {
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new'>('bestseller');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Divide products cleanly between tabs
  const bestSellers = products.slice(0, 8);
  const newArrivals = products.slice(8, 16);

  const displayList = activeTab === 'bestseller' ? bestSellers : newArrivals;

  return (
    <section className="py-16 sm:py-20 bg-dark-bg border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white text-center sm:text-left">
              Featured UAE Vapes
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center sm:text-left">
              Our most loved products, chosen by you in Dubai & Abu Dhabi
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center bg-dark-card border border-dark-border p-1.5 rounded-2xl shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('bestseller')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'bestseller'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Best Selling</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'new'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>New Arrivals</span>
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        {/* Bottom CTA to Shop */}
        <div className="mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-dark-card hover:bg-slate-800 text-white border border-dark-border hover:border-brand-500 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-lg"
          >
            <span>Explore All 150+ Products</span>
            <ArrowRight className="w-4 h-4 text-brand-400" />
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

