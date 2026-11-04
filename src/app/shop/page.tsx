'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { products, brands, categories } from '@/data/products';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickViewModal } from '@/components/product/QuickViewModal';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const brandParam = searchParams.get('brand') || 'All';
  const queryParam = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedBrand, setSelectedBrand] = useState<string>(brandParam);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Search filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedBrand, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="py-10 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Shop All Vapes in UAE
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Browse our catalog of authentic disposable vapes, pod kits, and e-liquids with Cash on Delivery in UAE.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="bg-dark-card border border-dark-border p-4 rounded-2xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search inside shop */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search in shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-dark-border rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Pills - Scrollable */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-brand-500 text-slate-950 shadow-md'
                  : 'bg-slate-900 text-gray-300 hover:text-white border border-slate-800'
              }`}
            >
              All Categories
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSelectedCategory(c.title)}
                className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === c.title
                    ? 'bg-brand-500 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-gray-300 hover:text-white border border-slate-800'
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <span className="text-xs text-gray-400 flex items-center space-x-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-dark-border text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-brand-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Brands Quick Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-6 scrollbar-none text-xs">
          <span className="text-gray-400 font-semibold flex items-center space-x-1 pl-1">
            <Filter className="w-3 h-3 text-brand-400" />
            <span>Brands:</span>
          </span>
          <button
            type="button"
            onClick={() => setSelectedBrand('All')}
            className={`px-3 py-1 rounded-lg border transition-colors whitespace-nowrap ${
              selectedBrand === 'All'
                ? 'border-brand-500 text-brand-400 bg-brand-500/10 font-bold'
                : 'border-slate-800 text-gray-400 hover:text-white bg-slate-900'
            }`}
          >
            All Brands
          </button>
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBrand(b)}
              className={`px-3 py-1 rounded-lg border transition-colors whitespace-nowrap ${
                selectedBrand === b
                  ? 'border-brand-500 text-brand-400 bg-brand-500/10 font-bold'
                  : 'border-slate-800 text-gray-400 hover:text-white bg-slate-900'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Product Results */}
        {filteredProducts.length === 0 ? (
          <div className="bg-dark-card border border-dark-border rounded-2xl p-12 text-center my-8">
            <p className="text-gray-300 font-semibold text-base mb-2">No products matched your criteria</p>
            <p className="text-xs text-gray-400 mb-6">
              Try adjusting your category, brand, or search filters to find what you are looking for.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold text-xs px-6 py-2.5 rounded-full transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}

