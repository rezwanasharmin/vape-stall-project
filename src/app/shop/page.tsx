'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useParams, usePathname } from 'next/navigation';
import { shopProducts } from '@/data/shopProducts';
import { offerProducts } from '@/data/offerProducts';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { QuickViewModal } from '@/components/product/QuickViewModal';
import { CollectionSeoGuide } from '@/components/shop/CollectionSeoGuide';
import { OfferCollectionSeoGuide } from '@/components/shop/OfferCollectionSeoGuide';
import { CollectionSpotFake } from '@/components/shop/CollectionSpotFake';
import { CollectionFaq } from '@/components/shop/CollectionFaq';
import { CollectionAuth } from '@/components/shop/CollectionAuth';
import '@/app/vap-collection.css';

function ShopContent() {
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const slug = (params?.slug as string) || '';

  const initialCategory = searchParams.get('category');
  const initialBrand = searchParams.get('brand');
  const initialQuery = searchParams.get('q') || '';

  // Determine if this is the Offers Collection page (/collections/offer-vape-shop-dubai)
  const isOffersCollection = useMemo(() => {
    return (
      slug === 'offer-vape-shop-dubai' ||
      slug === 'offer' ||
      pathname === '/collections/offer-vape-shop-dubai' ||
      pathname?.startsWith('/collections/offer') ||
      initialQuery.toLowerCase() === 'offer'
    );
  }, [slug, pathname, initialQuery]);

  const baseProducts = useMemo(() => {
    return isOffersCollection ? offerProducts : shopProducts;
  }, [isOffersCollection]);

  const defaultMaxPrice = isOffersCollection ? '675.00' : '750.00';
  const defaultMaxPriceNum = isOffersCollection ? 675 : 750;

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Filter States
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>([]);
  const [priceFrom, setPriceFrom] = useState<string>('0');
  const [priceTo, setPriceTo] = useState<string>(defaultMaxPrice);
  const [appliedPriceRange, setAppliedPriceRange] = useState<[number, number]>([0, defaultMaxPriceNum]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedNicotines, setSelectedNicotines] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    initialBrand ? [initialBrand] : []
  );

  const [sortBy, setSortBy] = useState<string>('most-relevant');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync price bounds when collection changes
  useEffect(() => {
    setPriceTo(defaultMaxPrice);
    setAppliedPriceRange([0, defaultMaxPriceNum]);
    if (isOffersCollection) {
      setIsCategoryOpen(false);
    }
  }, [defaultMaxPrice, defaultMaxPriceNum, isOffersCollection]);

  // Accordion open/close states
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState<boolean>(true);
  const [isPriceOpen, setIsPriceOpen] = useState<boolean>(true);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(!isOffersCollection);
  const [isNicotineOpen, setIsNicotineOpen] = useState<boolean>(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState<boolean>(false);

  // Filter categories list matching vapstall.ae DevTools
  const categoriesList = [
    { label: 'Battery', count: 1 },
    { label: 'Disposable vape', count: 12 },
    { label: 'E-Liquid', count: 11 },
    { label: 'Hybrid Electronic Hookah', count: 1 },
    { label: 'Non-Rechargeable Disposable', count: 5 },
    { label: 'Non-Rechargeable disposable MTL Vape', count: 1 },
    { label: 'pod kit', count: 1 },
    { label: 'pod system vape kit', count: 4 },
    { label: 'Pre-filled closed pod', count: 1 },
    { label: 'Prefilled Pod Kit', count: 2 },
    { label: 'Rechargeable disposable (DTL) shisha vape', count: 6 },
    { label: 'Rechargeable disposable MTL Vape', count: 1 },
    { label: 'Rechargeable disposable vape', count: 41 },
    { label: 'Replacement Pod', count: 2 },
  ];

  const currentCategoriesList = useMemo(() => {
    if (isOffersCollection) {
      return [{ label: 'Disposable vape', count: 13 }];
    }
    return categoriesList;
  }, [isOffersCollection, categoriesList]);

  // Nicotine Strengths matching vapstall.ae
  const nicotineList = [
    { label: '20mg', count: 32 },
    { label: '30mg', count: 12 },
    { label: '50mg', count: 48 },
    { label: '2mg', count: 3 },
    { label: '3mg', count: 5 },
    { label: '5mg', count: 4 },
    { label: '6mg', count: 8 },
    { label: '0mg', count: 2 },
  ];

  const currentNicotineList = useMemo(() => {
    if (isOffersCollection) {
      return [
        { label: '50mg', count: 5 },
        { label: '20mg', count: 4 },
        { label: '6mg', count: 1 },
        { label: '3mg', count: 1 },
        { label: '2mg', count: 1 },
      ];
    }
    return nicotineList;
  }, [isOffersCollection, nicotineList]);

  // Top Selling Brands matching vapstall.ae
  const brandsList = [
    { label: 'Elf Bar', count: 18 },
    { label: 'Lost Mary', count: 14 },
    { label: 'VOZOL', count: 12 },
    { label: 'HQD', count: 9 },
    { label: 'Al Fakher', count: 15 },
    { label: 'Sultan Shisha', count: 6 },
    { label: 'Nasty', count: 8 },
    { label: 'Ignite', count: 7 },
    { label: 'Air Bar', count: 8 },
    { label: 'Waka', count: 5 },
    { label: 'Fummo', count: 4 },
    { label: 'Yuoto', count: 5 },
    { label: 'Myle', count: 6 },
  ];

  const currentBrandsList = useMemo(() => {
    if (isOffersCollection) {
      return [
        { label: 'Elf Bar', count: 2 },
        { label: 'Flonq', count: 2 },
        { label: 'Al Fakher', count: 1 },
        { label: 'VOZOL', count: 1 },
        { label: 'Kief King', count: 1 },
        { label: 'Myle', count: 1 },
        { label: 'Lost Mary', count: 1 },
        { label: 'Waka', count: 1 },
        { label: 'Nasty', count: 1 },
        { label: 'Sultan Shisha', count: 1 },
        { label: 'Humo Azul', count: 1 },
        { label: 'Ignite', count: 1 },
      ];
    }
    return brandsList;
  }, [isOffersCollection, brandsList]);

  const inStockCount = useMemo(
    () => baseProducts.filter((p) => p.inStock).length,
    [baseProducts]
  );
  const outOfStockCount = useMemo(
    () => baseProducts.filter((p) => !p.inStock).length,
    [baseProducts]
  );

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = parseFloat(priceFrom) || 0;
    const max = parseFloat(priceTo) || defaultMaxPriceNum;
    setAppliedPriceRange([min, max]);
    setCurrentPage(1);
  };

  const handleToggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const handleToggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const handleToggleNicotine = (nic: string) => {
    setSelectedNicotines((prev) =>
      prev.includes(nic) ? prev.filter((n) => n !== nic) : [...prev, nic]
    );
    setCurrentPage(1);
  };

  const handleToggleAvailability = (avail: string) => {
    setSelectedAvailabilities((prev) =>
      prev.includes(avail) ? prev.filter((a) => a !== avail) : [...prev, avail]
    );
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedAvailabilities([]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedNicotines([]);
    setPriceFrom('0');
    setPriceTo(defaultMaxPrice);
    setAppliedPriceRange([0, defaultMaxPriceNum]);
    setCurrentPage(1);
  };

  const activePillsCount =
    selectedAvailabilities.length +
    selectedCategories.length +
    selectedBrands.length +
    selectedNicotines.length +
    (appliedPriceRange[0] > 0 || appliedPriceRange[1] < defaultMaxPriceNum ? 1 : 0);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((p) => {
        // Availability
        if (selectedAvailabilities.length > 0) {
          if (selectedAvailabilities.includes('In stock') && !p.inStock) return false;
          if (selectedAvailabilities.includes('Out of stock') && p.inStock) return false;
        }

        // Price
        if (p.price < appliedPriceRange[0] || p.price > appliedPriceRange[1]) {
          return false;
        }

        // Category
        if (selectedCategories.length > 0) {
          const match = selectedCategories.some(
            (c) =>
              p.category.toLowerCase().includes(c.toLowerCase()) ||
              c.toLowerCase().includes(p.category.toLowerCase())
          );
          if (!match) return false;
        }

        // Brand
        if (selectedBrands.length > 0) {
          const match = selectedBrands.some(
            (b) =>
              p.brand.toLowerCase() === b.toLowerCase() ||
              p.name.toLowerCase().includes(b.toLowerCase())
          );
          if (!match) return false;
        }

        // Nicotine
        if (selectedNicotines.length > 0) {
          const match = selectedNicotines.some((n) =>
            p.nicotine ? p.nicotine.toLowerCase().includes(n.toLowerCase()) : false
          );
          if (!match) return false;
        }

        // Search query (only filter if on general search, not offer collection)
        if (initialQuery && !isOffersCollection) {
          const q = initialQuery.toLowerCase();
          if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'title-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'title-desc') return b.name.localeCompare(a.name);
        if (sortBy === 'best-selling') return b.reviewsCount - a.reviewsCount;
        return 0; // most-relevant (default order)
      });
  }, [
    baseProducts,
    selectedAvailabilities,
    appliedPriceRange,
    selectedCategories,
    selectedBrands,
    selectedNicotines,
    sortBy,
    initialQuery,
    isOffersCollection,
  ]);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1, product.flavors[0]);
    showToast(`Added ${product.name} to cart`);
  };

  const handleToggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast(`Removed from wishlist`);
    } else {
      addToWishlist(product);
      showToast(`Added to wishlist`);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const pageSize = isOffersCollection ? 24 : 12;
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;

  const pagedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      const gridEl = document.getElementById('VcolGrid-container');
      if (gridEl) {
        gridEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, '…', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '…', totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '…', currentPage, '…', totalPages];
  };

  return (
    <div className="bg-[#f4f7fc] min-h-screen text-[#25406f]">
      {/* ─── Breadcrumb Bar ─── */}
      <div className="vcol-breadcrumb-bar page-width max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <nav className="vcol-breadcrumb flex items-center gap-1.5 text-[13px] text-[#25406f]/60 font-medium" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[#25406f] transition-colors">
            Home
          </Link>
          <span className="vcol-breadcrumb__sep text-slate-400" aria-hidden="true">
            ›
          </span>
          <span className="vcol-breadcrumb__cur text-[#25406f] font-semibold" aria-current="page">
            {isOffersCollection ? 'Offer' : 'Vape Stall: Disposable Vape shop in UAE'}
          </span>
        </nav>
      </div>

      {/* ─── Main Two-Column Layout ─── */}
      <div className="vcol-body page-width max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── SIDEBAR FILTERS ─── */}
        <aside
          className={`vcol-sidebar ${isMobileDrawerOpen ? 'is-open' : ''}`}
          aria-label="Product filters"
        >
          {/* Sidebar Header */}
          <div className="vcol-sidebar__head flex items-center justify-between border-b border-[#25406f]/10 p-4 bg-white sticky top-0 z-10">
            <span className="vcol-sidebar__title text-[14px] font-bold text-[#25406f] uppercase tracking-wider">
              FILTERS
            </span>
            {activePillsCount > 0 && (
              <span className="vcol-sidebar__count bg-[#f78804] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {activePillsCount}
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsMobileDrawerOpen(false)}
              className="vcol-sidebar__close p-1.5 text-slate-500 hover:text-[#25406f] lg:hidden"
              aria-label="Close filters"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="3" x2="15" y2="15" />
                <line x1="15" y1="3" x2="3" y2="15" />
              </svg>
            </button>
          </div>

          {/* Filters Form */}
          <form className="vcol-filters-form py-2" onSubmit={(e) => e.preventDefault()}>
            
            {/* 1. Availability */}
            <details className="vcol-filter-group border-b border-[#25406f]/10" open={isAvailabilityOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setIsAvailabilityOpen(!isAvailabilityOpen);
                }}
                className="vcol-filter-heading flex items-center justify-between p-4 cursor-pointer select-none text-[13.5px] font-bold text-[#25406f]"
              >
                <span>Availability</span>
                <svg
                  className={`vcol-fg-chevron w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isAvailabilityOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </summary>
              {isAvailabilityOpen && (
                <div className="vcol-filter-body px-4 pb-4">
                  <ul className="vcol-check-list space-y-2">
                    <li className="vcol-check-item">
                      <label className="vcol-check-label flex items-center gap-2.5 text-[13.5px] text-[#25406f]/85 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedAvailabilities.includes('In stock')}
                          onChange={() => handleToggleAvailability('In stock')}
                          className="vcol-checkbox sr-only"
                        />
                        <span className={`vcol-checkbox-ui w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          selectedAvailabilities.includes('In stock')
                            ? 'bg-[#25406f] border-[#25406f] text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {selectedAvailabilities.includes('In stock') && (
                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                              <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                        <span className="vcol-check-text flex-1">In stock</span>
                        <span className="vcol-check-count text-[11.5px] text-slate-400">({inStockCount})</span>
                      </label>
                    </li>
                    <li className="vcol-check-item">
                      <label className="vcol-check-label flex items-center gap-2.5 text-[13.5px] text-[#25406f]/85 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedAvailabilities.includes('Out of stock')}
                          onChange={() => handleToggleAvailability('Out of stock')}
                          className="vcol-checkbox sr-only"
                        />
                        <span className={`vcol-checkbox-ui w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          selectedAvailabilities.includes('Out of stock')
                            ? 'bg-[#25406f] border-[#25406f] text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {selectedAvailabilities.includes('Out of stock') && (
                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                              <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                        <span className="vcol-check-text flex-1">Out of stock</span>
                        <span className="vcol-check-count text-[11.5px] text-slate-400">({outOfStockCount})</span>
                      </label>
                    </li>
                  </ul>
                </div>
              )}
            </details>

            {/* 2. Price */}
            <details className="vcol-filter-group border-b border-[#25406f]/10" open={isPriceOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setIsPriceOpen(!isPriceOpen);
                }}
                className="vcol-filter-heading flex items-center justify-between p-4 cursor-pointer select-none text-[13.5px] font-bold text-[#25406f]"
              >
                <span>Price</span>
                <svg
                  className={`vcol-fg-chevron w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isPriceOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </summary>
              {isPriceOpen && (
                <div className="vcol-filter-body px-4 pb-4">
                  <div className="vcol-price-range">
                    <div className="vcol-price-inputs flex items-center gap-2 mb-3">
                      <div className="vcol-price-field flex-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          FROM
                        </label>
                        <div className="vcol-price-input-wrap flex items-center border border-slate-300 rounded-md overflow-hidden bg-white focus-within:border-[#25406f]">
                          <span className="vcol-currency px-2 py-1.5 text-xs text-slate-400 border-r border-slate-200 bg-slate-50">
                            Dhs.
                          </span>
                          <input
                            type="number"
                            value={priceFrom}
                            onChange={(e) => setPriceFrom(e.target.value)}
                            className="vcol-price-input w-full px-2 py-1.5 text-xs text-[#25406f] font-semibold focus:outline-none"
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <span className="vcol-price-sep text-slate-400 pt-5 font-bold">—</span>

                      <div className="vcol-price-field flex-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          TO
                        </label>
                        <div className="vcol-price-input-wrap flex items-center border border-slate-300 rounded-md overflow-hidden bg-white focus-within:border-[#25406f]">
                          <span className="vcol-currency px-2 py-1.5 text-xs text-slate-400 border-r border-slate-200 bg-slate-50">
                            Dhs.
                          </span>
                          <input
                            type="number"
                            value={priceTo}
                            onChange={(e) => setPriceTo(e.target.value)}
                            className="vcol-price-input w-full px-2 py-1.5 text-xs text-[#25406f] font-semibold focus:outline-none"
                            placeholder={defaultMaxPrice}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleApplyPrice}
                      className="vcol-price-apply w-full bg-[#25406f] hover:bg-[#1a2e50] text-white text-[13px] font-bold py-2 rounded-lg transition-colors shadow-sm"
                    >
                      Apply Price
                    </button>
                  </div>
                </div>
              )}
            </details>

            {/* 3. Category */}
            <details className="vcol-filter-group border-b border-[#25406f]/10" open={isCategoryOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setIsCategoryOpen(!isCategoryOpen);
                }}
                className="vcol-filter-heading flex items-center justify-between p-4 cursor-pointer select-none text-[13.5px] font-bold text-[#25406f]"
              >
                <span>Category</span>
                <svg
                  className={`vcol-fg-chevron w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </summary>
              {isCategoryOpen && (
                <div className="vcol-filter-body px-4 pb-4 max-h-[300px] overflow-y-auto scrollbar-thin">
                  <ul className="vcol-check-list space-y-1">
                    {currentCategoriesList.map((item) => {
                      const isChecked = selectedCategories.includes(item.label);
                      return (
                        <li key={item.label} className="vcol-check-item">
                          <label className="vcol-check-label flex items-center gap-2.5 text-[13px] text-[#25406f]/85 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleCategory(item.label)}
                              className="vcol-checkbox sr-only"
                            />
                            <span className={`vcol-checkbox-ui w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#25406f] border-[#25406f] text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isChecked && (
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                                  <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                              )}
                            </span>
                            <span className="vcol-check-text flex-1 truncate">{item.label}</span>
                            <span className="vcol-check-count text-[11px] text-slate-400">({item.count})</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </details>

            {/* 4. Nicotine Strength */}
            <details className="vcol-filter-group border-b border-[#25406f]/10" open={isNicotineOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setIsNicotineOpen(!isNicotineOpen);
                }}
                className="vcol-filter-heading flex items-center justify-between p-4 cursor-pointer select-none text-[13.5px] font-bold text-[#25406f]"
              >
                <span>Nicotine Strength</span>
                <svg
                  className={`vcol-fg-chevron w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isNicotineOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </summary>
              {isNicotineOpen && (
                <div className="vcol-filter-body px-4 pb-4">
                  <ul className="vcol-check-list space-y-1">
                    {currentNicotineList.map((item) => {
                      const isChecked = selectedNicotines.includes(item.label);
                      return (
                        <li key={item.label} className="vcol-check-item">
                          <label className="vcol-check-label flex items-center gap-2.5 text-[13px] text-[#25406f]/85 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleNicotine(item.label)}
                              className="vcol-checkbox sr-only"
                            />
                            <span className={`vcol-checkbox-ui w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#25406f] border-[#25406f] text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isChecked && (
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                                  <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                              )}
                            </span>
                            <span className="vcol-check-text flex-1">{item.label}</span>
                            <span className="vcol-check-count text-[11px] text-slate-400">({item.count})</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </details>

            {/* 5. Top Selling Brands */}
            <details className="vcol-filter-group" open={isBrandsOpen}>
              <summary
                onClick={(e) => {
                  e.preventDefault();
                  setIsBrandsOpen(!isBrandsOpen);
                }}
                className="vcol-filter-heading flex items-center justify-between p-4 cursor-pointer select-none text-[13.5px] font-bold text-[#25406f]"
              >
                <span>Top Selling Brands</span>
                <svg
                  className={`vcol-fg-chevron w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isBrandsOpen ? 'rotate-180' : ''
                  }`}
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </summary>
              {isBrandsOpen && (
                <div className="vcol-filter-body px-4 pb-4 max-h-[300px] overflow-y-auto scrollbar-thin">
                  <ul className="vcol-check-list space-y-1">
                    {currentBrandsList.map((item) => {
                      const isChecked = selectedBrands.includes(item.label);
                      return (
                        <li key={item.label} className="vcol-check-item">
                          <label className="vcol-check-label flex items-center gap-2.5 text-[13px] text-[#25406f]/85 cursor-pointer hover:bg-slate-50 p-1.5 rounded-md transition-colors">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleBrand(item.label)}
                              className="vcol-checkbox sr-only"
                            />
                            <span className={`vcol-checkbox-ui w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-[#25406f] border-[#25406f] text-white'
                                : 'border-slate-300 bg-white'
                            }`}>
                              {isChecked && (
                                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 12 12">
                                  <polyline points="2 6 5 9 10 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                                </svg>
                              )}
                            </span>
                            <span className="vcol-check-text flex-1 truncate">{item.label}</span>
                            <span className="vcol-check-count text-[11px] text-slate-400">({item.count})</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </details>

            {/* Clear Filters Footer */}
            {activePillsCount > 0 && (
              <div className="vcol-filter-footer p-4 border-t border-[#25406f]/10">
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="vcol-clear-all-btn text-[13px] font-bold text-red-600 hover:text-red-700 flex items-center gap-1.5"
                >
                  ✕ Clear all filters
                </button>
              </div>
            )}
          </form>
        </aside>

        {/* ─── MAIN CONTENT AREA ─── */}
        <div className="vcol-main">
          
          {/* TOOLBAR */}
          <div className="vcol-toolbar flex items-center justify-between pb-4 border-b border-[#25406f]/10 mb-5">
            <div className="vcol-toolbar-left flex items-center gap-3">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="vcol-filter-toggle lg:hidden inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-300 bg-white text-[13.5px] font-bold text-[#25406f] hover:bg-slate-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="1.5" y1="4.5" x2="15.5" y2="4.5" />
                  <line x1="1.5" y1="8.5" x2="15.5" y2="8.5" />
                  <line x1="1.5" y1="12.5" x2="15.5" y2="12.5" />
                  <circle cx="5.5" cy="4.5" r="2" fill="currentColor" stroke="none" />
                  <circle cx="11.5" cy="8.5" r="2" fill="currentColor" stroke="none" />
                  <circle cx="6.5" cy="12.5" r="2" fill="currentColor" stroke="none" />
                </svg>
                <span>Filters</span>
                {activePillsCount > 0 && (
                  <span className="bg-[#f78804] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {activePillsCount}
                  </span>
                )}
              </button>

              {/* Product Count matching Screenshot 1 */}
              <p className="vcol-count text-[13.5px] text-[#25406f]/70 font-medium m-0">
                <strong className="text-[#25406f] font-bold">{filteredProducts.length}</strong> products
              </p>
            </div>

            {/* Sort by dropdown */}
            <div className="vcol-toolbar-right flex items-center gap-2.5">
              <label className="vcol-sort-label text-[13px] font-semibold text-[#25406f]/70 whitespace-nowrap">
                Sort by
              </label>
              <div className="vcol-sort-wrap relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="vcol-sort-select appearance-none bg-white border border-slate-300 rounded-lg px-3.5 py-1.5 pr-8 text-[13.5px] font-semibold text-[#25406f] focus:outline-none focus:border-[#25406f] cursor-pointer shadow-sm min-w-[160px]"
                >
                  <option value="most-relevant">Most relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title-asc">Alphabetically: A-Z</option>
                  <option value="title-desc">Alphabetically: Z-A</option>
                  <option value="best-selling">Best selling</option>
                </select>
                <svg
                  className="vcol-sort-chevron absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <polyline points="4 6 8 10 12 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Filter Pills (if any) */}
          {activePillsCount > 0 && (
            <div className="vcol-active-pills flex flex-wrap items-center gap-2 pb-4 mb-2">
              {selectedAvailabilities.map((avail) => (
                <button
                  key={avail}
                  type="button"
                  onClick={() => handleToggleAvailability(avail)}
                  className="vcol-pill inline-flex items-center gap-1.5 bg-[#25406f]/10 text-[#25406f] px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span>{avail}</span>
                  <span className="vcol-pill-x">×</span>
                </button>
              ))}
              {selectedCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleToggleCategory(cat)}
                  className="vcol-pill inline-flex items-center gap-1.5 bg-[#25406f]/10 text-[#25406f] px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span>{cat}</span>
                  <span className="vcol-pill-x">×</span>
                </button>
              ))}
              {selectedBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => handleToggleBrand(brand)}
                  className="vcol-pill inline-flex items-center gap-1.5 bg-[#25406f]/10 text-[#25406f] px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span>{brand}</span>
                  <span className="vcol-pill-x">×</span>
                </button>
              ))}
              {selectedNicotines.map((nic) => (
                <button
                  key={nic}
                  type="button"
                  onClick={() => handleToggleNicotine(nic)}
                  className="vcol-pill inline-flex items-center gap-1.5 bg-[#25406f]/10 text-[#25406f] px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span>{nic}</span>
                  <span className="vcol-pill-x">×</span>
                </button>
              ))}
              {(appliedPriceRange[0] > 0 || appliedPriceRange[1] < defaultMaxPriceNum) && (
                <button
                  type="button"
                  onClick={() => {
                    setPriceFrom('0');
                    setPriceTo(defaultMaxPrice);
                    setAppliedPriceRange([0, defaultMaxPriceNum]);
                  }}
                  className="vcol-pill inline-flex items-center gap-1.5 bg-[#25406f]/10 text-[#25406f] px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <span>Dhs. {appliedPriceRange[0]} — Dhs. {appliedPriceRange[1]}</span>
                  <span className="vcol-pill-x">×</span>
                </button>
              )}
              <button
                type="button"
                onClick={handleClearAll}
                className="vcol-clear-link text-xs font-bold text-red-600 hover:text-red-700 ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* PRODUCT GRID: 3 columns per row matching screenshots */}
          {filteredProducts.length === 0 ? (
            <div className="vcol-no-results py-16 text-center bg-white rounded-2xl border border-slate-200">
              <div className="vcol-no-results-icon text-5xl mb-3 text-slate-300">🔍</div>
              <h3 className="vcol-no-results-title text-xl font-bold text-[#25406f] mb-1">
                No products found
              </h3>
              <p className="vcol-no-results-hint text-sm text-slate-500">
                Try adjusting your filters or{' '}
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-[#f78804] font-bold hover:underline"
                >
                  clear all filters
                </button>
                .
              </p>
            </div>
          ) : (
            <div
              id="VcolGrid-container"
              className="vcol-grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5"
              style={{ '--vcol-cols': 3, '--vcol-cols-mobile': 2 } as React.CSSProperties}
            >
              {pagedProducts.map((product, idx) => {
                const wishlisted = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    className="vcol-card-wrap vcol-card-visible"
                    style={{ '--card-i': idx % 3 } as React.CSSProperties}
                  >
                    <div className="vap-common-card-block relative bg-white border border-[#e2e8f0] rounded-[18px] overflow-hidden p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-[#cbd5e1] group h-full">
                      
                      {/* Wishlist Heart Button (Top Left) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleToggleWishlist(product);
                        }}
                        className="vap-wishlist-btn absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm cursor-pointer"
                        aria-label="Add to wishlist"
                      >
                        <svg
                          className={`w-4 h-4 transition-colors ${
                            wishlisted ? 'fill-red-500 text-red-500' : 'fill-none stroke-current'
                          }`}
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>

                      {/* Vape Stall Logo Watermark (Top Right) */}
                      <div className="absolute top-3 right-3 z-10 w-7 h-7 opacity-25 pointer-events-none">
                        <Image
                          src="/images/header-logo.png"
                          alt="Watermark"
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      </div>

                      {/* Discount Badge (Top Right if on sale) */}
                      {product.badge && (
                        <span className="absolute top-3 right-3 z-20 bg-[#e11d48] text-white text-[10.5px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-sm">
                          {product.badge}
                        </span>
                      )}

                      {/* Arched Pedestal Image Stage with Quick View Bar on Hover */}
                      <div className="relative w-full aspect-square mb-3 flex items-center justify-center rounded-[14px] overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
                        
                        {/* Arched backdrop circle */}
                        <div className="absolute inset-2 rounded-full border border-slate-200/60 bg-gradient-to-b from-white to-slate-100/50 pointer-events-none" />
                        
                        {/* Pedestal golden ring */}
                        <div className="absolute bottom-1 w-[82%] h-4 rounded-full bg-gradient-to-r from-[#ca944d] via-[#fcd34d] to-[#ca944d] opacity-50 blur-[1px] pointer-events-none" />

                        {/* Primary Image */}
                        <div className="relative w-full h-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-105">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 325px"
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Secondary Image (Visible on Hover matching Screenshot 5) */}
                        <div className="absolute inset-0 w-full h-full transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:scale-105 pointer-events-none">
                          <Image
                            src={product.altImage || product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 325px"
                            className="object-contain p-2"
                          />
                        </div>

                        {/* Quick View Dark Overlay Pill (Hover State matching Screenshot 4 & 5) */}
                        <div className="absolute inset-x-0 bottom-0 py-2.5 bg-gradient-to-t from-slate-950/80 via-slate-900/50 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setQuickViewProduct(product);
                            }}
                            className="text-white text-[11px] font-extrabold tracking-widest uppercase bg-black/60 hover:bg-[#b48648] px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-200 shadow-md transform hover:scale-105 cursor-pointer"
                          >
                            QUICK VIEW
                          </button>
                        </div>
                      </div>

                      {/* Product Content Details */}
                      <div className="vap-product-text-content flex flex-col flex-1">
                        
                        {/* Title */}
                        <Link href={`/products/${product.handle}`} className="block">
                          <h3 className="vap-product-name text-[14px] sm:text-[15px] font-bold text-[#1e293b] hover:text-[#b48648] line-clamp-2 min-h-[42px] leading-snug transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Reviews & Star Rating */}
                        <div className="flex items-center gap-1.5 mt-2 mb-2.5">
                          <div className="flex items-center text-[#f59e0b]">
                            {[...Array(5)].map((_, starIdx) => (
                              <svg key={starIdx} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-[12px] text-gray-500 font-medium">
                            {product.reviewsCount} reviews
                          </span>
                        </div>

                        {/* Price & Action Row */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 mt-auto">
                          <div>
                            {product.comparePrice ? (
                              <div className="space-y-0.5">
                                <div className="flex items-baseline gap-2">
                                  <span className="text-[12px] text-[#e11d48] line-through font-semibold">
                                    {product.comparePriceFormatted}
                                  </span>
                                  <span className="text-[15px] sm:text-[16px] font-extrabold text-[#1e293b]">
                                    {product.priceFormatted}
                                  </span>
                                </div>
                                {product.savingsFormatted && (
                                  <span className="text-[11px] font-bold text-[#16a34a] block">
                                    {product.savingsFormatted}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-[15px] sm:text-[16px] font-extrabold text-[#1e293b]">
                                {product.priceFormatted}
                              </span>
                            )}
                          </div>

                          {/* Add to Cart button matching screenshot light blue / cart icon */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            className="w-9 h-9 rounded-full bg-[#eef4ff] hover:bg-[#25406f] text-[#25406f] hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm active:scale-90 cursor-pointer"
                            aria-label={`Add ${product.name} to cart`}
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="9" cy="21" r="1" />
                              <circle cx="20" cy="21" r="1" />
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ─── PAGINATION (Interactive 1:1 with vapstall.ae) ─── */}
          {totalPages > 1 && (
            <nav className="vcol-pagination flex items-center justify-center gap-2 pt-10 pb-4" aria-label="Collection pages">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className={`vcol-page-arrow inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-[13.5px] font-semibold bg-white transition-colors ${
                  currentPage === 1 ? 'vcol-page-arrow--disabled opacity-35 cursor-not-allowed' : 'hover:bg-[#25406f] hover:text-white cursor-pointer'
                }`}
                aria-label="Previous page"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="10 4 6 8 10 12" />
                </svg>
                <span>Prev</span>
              </button>

              <div className="vcol-page-nums flex items-center gap-1.5">
                {getPageNumbers().map((item, idx) => {
                  if (typeof item === 'string') {
                    return (
                      <span key={`ell-${idx}`} className="vcol-page-ellipsis px-1 text-slate-400 font-bold" aria-hidden="true">
                        …
                      </span>
                    );
                  }
                  const isActive = item === currentPage;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePageChange(item)}
                      className={`vcol-page-num w-9 h-9 flex items-center justify-center rounded-lg text-[13.5px] font-bold border transition-colors cursor-pointer ${
                        isActive
                          ? 'vcol-page-num--active bg-[#25406f] border-[#25406f] text-white shadow-sm'
                          : 'bg-white border-slate-300 text-[#25406f] hover:bg-slate-50'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                className={`vcol-page-arrow inline-flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-[13.5px] font-semibold bg-white transition-colors ${
                  currentPage === totalPages ? 'vcol-page-arrow--disabled opacity-35 cursor-not-allowed' : 'hover:bg-[#25406f] hover:text-white cursor-pointer'
                }`}
                aria-label="Next page"
              >
                <span>Next</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 4 10 8 6 12" />
                </svg>
              </button>
            </nav>
          )}

          {/* ─── COLLECTION GUIDE (Full 1:1 authentic content) ─── */}
          {isOffersCollection ? <OfferCollectionSeoGuide /> : <CollectionSeoGuide />}

        </div>

      </div>

      {/* ─── FULL-WIDTH SECTIONS 1:1 WITH VAPSTALL.AE ─── */}
      <CollectionSpotFake />
      <CollectionFaq />
      <CollectionAuth />

      {/* Mobile Drawer Overlay */}
      <div
        className={`vcol-overlay fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileDrawerOpen(false)}
      />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#162e50] text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#ffb347]/40 flex items-center gap-2 text-sm font-semibold animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f7fc] p-10 text-center font-bold text-[#25406f]">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
