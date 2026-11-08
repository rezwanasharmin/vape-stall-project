'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { products } from '@/data/products';

const disposableLinks = [
  { label: 'All Disposable', href: '/collections/buy-disposable-vape-uae' },
  { label: 'All 50mg disposable', href: '/shop?category=Disposable+Vape&nicotine=50mg' },
  { label: 'All 20mg disposable', href: '/shop?category=Disposable+Vape&nicotine=20mg' },
  { label: 'All 0mg disposable', href: '/shop?category=Disposable+Vape&nicotine=0mg' },
  { label: 'Myle', href: '/shop?brand=Myle' },
  { label: 'Elf bar', href: '/shop?brand=Elf+Bar' },
  { label: 'Al fakher', href: '/shop?brand=Al+Fakher' },
  { label: 'Pod Salt', href: '/shop?brand=Pod+Salt' },
  { label: 'Lost mary', href: '/shop?brand=Lost+Mary' },
  { label: 'Tugboat', href: '/shop?brand=Tugboat' },
  { label: 'Vozol', href: '/shop?brand=VOZOL' },
  { label: 'Waka', href: '/shop?brand=Waka' },
  { label: 'Nasty', href: '/shop?brand=Nasty' },
  { label: 'Juice Head', href: '/shop?brand=Juice+Head' },
  { label: 'HQD', href: '/shop?brand=HQD' },
  { label: 'Ignite', href: '/shop?brand=Ignite' },
  { label: 'Vapes Bars', href: '/shop?brand=Vapes+Bars' },
  { label: 'Fummo', href: '/shop?brand=Fummo' },
];

const disposableCards = [
  {
    title: 'All Disposable',
    href: '/collections/buy-disposable-vape-uae',
    image: '/images/menu/disposable-all.png',
  },
  {
    title: 'Elf bar',
    href: '/shop?brand=Elf+Bar',
    image: '/images/menu/disposable-elfbar.png',
  },
  {
    title: 'Al fakher',
    href: '/shop?brand=Al+Fakher',
    image: '/images/menu/disposable-alfakher.png',
  },
  {
    title: 'Pod Salt',
    href: '/shop?brand=Pod+Salt',
    image: '/images/menu/disposable-podsalt.png',
  },
  {
    title: 'Lost mary',
    href: '/shop?brand=Lost+Mary',
    image: '/images/menu/disposable-lostmary.png',
  },
  {
    title: 'Vozol',
    href: '/shop?brand=VOZOL',
    image: '/images/menu/disposable-vozol.png',
  },
  {
    title: 'Myle',
    href: '/shop?brand=Myle',
    image: '/images/menu/disposable-myle.png',
  },
  {
    title: 'Nasty',
    href: '/shop?brand=Nasty',
    image: '/images/menu/disposable-nasty.png',
  },
];

const shishaLinks = [
  { label: 'XTRA', href: '/shop?category=Shisha+%2F+Hookah&brand=XTRA' },
  { label: 'VOZOL', href: '/shop?category=Shisha+%2F+Hookah&brand=VOZOL' },
];

const shishaCards = [
  {
    title: 'XTRA',
    href: '/shop?category=Shisha+%2F+Hookah&brand=XTRA',
    image: '/images/menu/shisha-xtra.png',
  },
  {
    title: 'VOZOL',
    href: '/shop?category=Shisha+%2F+Hookah&brand=VOZOL',
    image: '/images/menu/shisha-vozol.png',
  },
];

const podsSystemLinks = [
  { label: 'Relx', href: '/shop?category=Pod+Systems&brand=Relx' },
  { label: 'Vaporesso', href: '/shop?category=Pod+Systems&brand=Vaporesso' },
  { label: 'OXVA', href: '/shop?category=Pod+Systems&brand=OXVA' },
];

const podsSystemCards = [
  {
    title: 'Relx',
    href: '/shop?category=Pod+Systems&brand=Relx',
    image: '/images/menu/podsystem-relx.png',
  },
  {
    title: 'Vaporesso',
    href: '/shop?category=Pod+Systems&brand=Vaporesso',
    image: '/images/menu/podsystem-vaporesso.png',
  },
  {
    title: 'OXVA',
    href: '/shop?category=Pod+Systems&brand=OXVA',
    image: '/images/menu/podsystem-oxva.png',
  },
];

const eLiquidLinks = [
  { label: 'Nasty', href: '/shop?category=E-Liquids&brand=Nasty' },
  { label: 'Vozol', href: '/shop?category=E-Liquids&brand=VOZOL' },
];

const eLiquidCards = [
  {
    title: 'Nasty',
    href: '/shop?category=E-Liquids&brand=Nasty',
    image: '/images/menu/eliquid-nasty.png',
  },
  {
    title: 'Vozol',
    href: '/shop?category=E-Liquids&brand=VOZOL',
    image: '/images/menu/eliquid-vozol.png',
  },
];

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobileDisposableOpen, setIsMobileDisposableOpen] = useState(false);
  const [isMobileShishaOpen, setIsMobileShishaOpen] = useState(false);
  const [isMobilePodsSystemOpen, setIsMobilePodsSystemOpen] = useState(false);
  const [isMobileELiquidOpen, setIsMobileELiquidOpen] = useState(false);

  // Disposable Mega Menu state
  const [isDisposableOpen, setIsDisposableOpen] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Shisha Mega Menu state
  const [isShishaOpen, setIsShishaOpen] = useState(false);
  const shishaTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Pods System Mega Menu state
  const [isPodsSystemOpen, setIsPodsSystemOpen] = useState(false);
  const podsSystemTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // E-Liquid Mega Menu state
  const [isELiquidOpen, setIsELiquidOpen] = useState(false);
  const eLiquidTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close all mega menus on page change
  useEffect(() => {
    setIsDisposableOpen(false);
    setIsShishaOpen(false);
    setIsPodsSystemOpen(false);
    setIsELiquidOpen(false);
  }, [pathname]);

  const handleMouseEnterDisposable = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsShishaOpen(false);
    setIsPodsSystemOpen(false);
    setIsELiquidOpen(false);
    setIsDisposableOpen(true);
  };

  const handleMouseLeaveDisposable = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsDisposableOpen(false);
    }, 200);
  };

  const handleMouseEnterShisha = () => {
    if (shishaTimeoutRef.current) {
      clearTimeout(shishaTimeoutRef.current);
      shishaTimeoutRef.current = null;
    }
    setIsDisposableOpen(false);
    setIsPodsSystemOpen(false);
    setIsELiquidOpen(false);
    setIsShishaOpen(true);
  };

  const handleMouseLeaveShisha = () => {
    if (shishaTimeoutRef.current) {
      clearTimeout(shishaTimeoutRef.current);
    }
    shishaTimeoutRef.current = setTimeout(() => {
      setIsShishaOpen(false);
    }, 200);
  };

  const handleMouseEnterPodsSystem = () => {
    if (podsSystemTimeoutRef.current) {
      clearTimeout(podsSystemTimeoutRef.current);
      podsSystemTimeoutRef.current = null;
    }
    setIsDisposableOpen(false);
    setIsShishaOpen(false);
    setIsELiquidOpen(false);
    setIsPodsSystemOpen(true);
  };

  const handleMouseLeavePodsSystem = () => {
    if (podsSystemTimeoutRef.current) {
      clearTimeout(podsSystemTimeoutRef.current);
    }
    podsSystemTimeoutRef.current = setTimeout(() => {
      setIsPodsSystemOpen(false);
    }, 200);
  };

  const handleMouseEnterELiquid = () => {
    if (eLiquidTimeoutRef.current) {
      clearTimeout(eLiquidTimeoutRef.current);
      eLiquidTimeoutRef.current = null;
    }
    setIsDisposableOpen(false);
    setIsShishaOpen(false);
    setIsPodsSystemOpen(false);
    setIsELiquidOpen(true);
  };

  const handleMouseLeaveELiquid = () => {
    if (eLiquidTimeoutRef.current) {
      clearTimeout(eLiquidTimeoutRef.current);
    }
    eLiquidTimeoutRef.current = setTimeout(() => {
      setIsELiquidOpen(false);
    }, 200);
  };

  const handleScrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const handleScrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 20);
    }
  };

  const filteredSearch = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchResults(false);
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  interface NavMenuItem {
    name: string;
    href: string;
    active?: boolean;
    isMegaMenu?: boolean;
    hasDropdown?: boolean;
    dropdownItems?: { label: string; href: string }[];
  }

  const navMenuItems: NavMenuItem[] = [
    {
      name: 'HOME',
      href: '/',
      active: pathname === '/',
    },
    {
      name: 'SHOP',
      href: '/shop',
      active: pathname === '/shop' && !pathname.includes('category='),
    },
    {
      name: 'DISPOSABLE VAPE',
      href: '/collections/buy-disposable-vape-uae',
      isMegaMenu: true,
      active: pathname === '/collections/buy-disposable-vape-uae' || pathname?.includes('disposable'),
    },
    {
      name: 'NICOTINE POUCHES',
      href: '/shop?category=Nicotine+Pouches',
      active: pathname?.includes('Nicotine+Pouches'),
    },
    {
      name: 'SHISHA/HOOKAH DISPOSABLE',
      href: '/collections/relx-disposable-vape-shop-in-dubai',
      isMegaMenu: true,
      active: pathname === '/collections/relx-disposable-vape-shop-in-dubai' || pathname?.includes('Shisha') || pathname?.includes('relx'),
    },
    {
      name: 'PODS SYSTEM',
      href: '/shop?category=Pod+Systems',
      isMegaMenu: true,
      active: pathname?.includes('Pod+Systems') || pathname?.includes('pods'),
    },
    {
      name: 'E-LIQUID',
      href: '/shop?category=E-Liquids',
      isMegaMenu: true,
      active: pathname?.includes('E-Liquids') || pathname?.includes('e-liquid'),
    },
    {
      name: 'VAPE KIT',
      href: '/shop?category=Pod+Systems',
    },
    {
      name: 'BRANDS',
      href: '/shop',
    },
    {
      name: 'OFFERS',
      href: '/collections/offer-vape-shop-dubai',
      active: pathname === '/collections/offer-vape-shop-dubai' || pathname?.startsWith('/collections/offer'),
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#162e50] shadow-md select-none">
      {/* ─── ROW 1: Logo + Inline Search + Icons ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] sm:h-[84px] gap-3 sm:gap-6">
          
          {/* Mobile Hamburger Menu Icon */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 -ml-1 text-white hover:text-[#ffb347] transition-colors lg:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo (Left, matching vapstall.ae avatar logo) */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <div className="relative w-[48px] h-[48px] sm:w-[58px] sm:h-[58px]">
              <Image
                src="/images/header-logo.png"
                alt="Vape Stall - Best authentic disposable vape store in UAE"
                fill
                priority
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>

          {/* Centered Desktop Search Bar (Rounded pill with inside magnifying submit button) */}
          <div className="hidden md:flex flex-1 max-w-[580px] mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  className="w-full h-[46px] bg-white text-slate-800 text-[14px] rounded-full pl-11 pr-14 placeholder-[#839cb8] focus:outline-none shadow-sm transition-all border border-transparent focus:border-[#ffb347]"
                />
                {/* Search Magnifier Icon Inside Input (Left) */}
                <Search className="w-4 h-4 text-[#839cb8] absolute left-4 pointer-events-none stroke-[2]" />

                {/* Submit Search Button (Dark Blue Circle Inside Pill Right) */}
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 w-10 bg-gradient-to-r from-[#25406F] to-[#1A2F52] hover:from-[#1A2F52] hover:to-[#25406F] text-white rounded-full flex items-center justify-center shadow-sm transition-transform active:scale-95 cursor-pointer"
                  aria-label="Submit Search"
                >
                  <Search className="w-4 h-4 text-white stroke-[2.2]" />
                </button>
              </div>
            </form>

            {/* Desktop Search Suggestions Dropdown */}
            {showSearchResults && filteredSearch.length > 0 && (
              <div
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden text-slate-800"
                onMouseLeave={() => setShowSearchResults(false)}
              >
                <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                  Suggestions
                </div>
                {filteredSearch.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.handle}`}
                    onClick={() => setShowSearchResults(false)}
                    className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-xl transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
                      <p className="text-xs text-[#b45309] font-bold">{item.priceFormatted}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Icons: Search (mobile) + Wishlist + Account + Cart */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-white">
            
            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="flex items-center justify-center w-10 h-10 hover:text-[#ffb347] transition-colors md:hidden text-white"
              title="Search"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-white" />
            </button>
            
            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative flex items-center justify-center w-11 h-11 hover:text-[#ffb347] transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white hover:text-[#ffb347] transition-colors"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10 5.24 8.515 3.773a4.433 4.433 0 0 0-6.21 0 4.293 4.293 0 0 0 0 6.128L10 17.495l7.695-7.593a4.293 4.293 0 0 0 0-6.128 4.433 4.433 0 0 0-6.21 0zm.765-2.177c2.113-2.084 5.538-2.084 7.65 0a5.29 5.29 0 0 1 0 7.55l-7.695 7.593a1.03 1.03 0 0 1-1.44 0l-7.696-7.594a5.29 5.29 0 0 1 0-7.549C3.697.98 7.122.98 9.234 3.063l.766.755z"
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <a
              href="#account"
              onClick={(e) => e.preventDefault()}
              className="flex items-center justify-center w-11 h-11 hover:text-[#ffb347] transition-colors hidden sm:flex cursor-pointer"
              title="My Account"
              aria-label="Account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5 text-white hover:text-[#ffb347] transition-colors"
                viewBox="0 0 18 19"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M6 4.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8m5.58 12.15c1.12.82 1.83 2.24 1.91 4.85H1.51c.08-2.6.79-4.03 1.9-4.85C4.66 11.75 6.5 11.5 9 11.5s4.35.26 5.58 1.15M9 10.5c-2.5 0-4.65.24-6.17 1.35C1.27 12.98.5 14.93.5 18v.5h17V18c0-3.07-.77-5.02-2.33-6.15-1.52-1.1-3.67-1.35-6.17-1.35"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-11 h-11 hover:text-[#ffb347] transition-colors focus:outline-none cursor-pointer"
              title="Cart"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 40 40"
                className="w-[44px] h-[44px] text-white hover:text-[#ffb347] transition-colors"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-[#ffb347] text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Search Dropdown Bar */}
      {isMobileSearchOpen && (
        <div className="md:hidden bg-[#11243e] px-4 py-3 border-t border-white/10 relative z-50">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchQuery}
                autoFocus
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full h-[44px] bg-white text-slate-800 text-[14px] rounded-full pl-10 pr-12 placeholder-[#839cb8] focus:outline-none shadow-sm"
              />
              <Search className="w-4 h-4 text-[#839cb8] absolute left-3.5 pointer-events-none stroke-[2]" />
              <button
                type="submit"
                className="absolute right-1.5 top-1 bottom-1 w-9 bg-gradient-to-r from-[#2d4f88] to-[#1A2F52] text-white rounded-full flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                aria-label="Submit Search"
              >
                <Search className="w-3.5 h-3.5 text-white stroke-[2.2]" />
              </button>
            </div>
          </form>

          {/* Mobile Search Suggestions Dropdown */}
          {showSearchResults && filteredSearch.length > 0 && (
            <div
              className="mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 overflow-hidden text-slate-800"
              onMouseLeave={() => setShowSearchResults(false)}
            >
              <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                Suggestions
              </div>
              {filteredSearch.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.handle}`}
                  onClick={() => {
                    setShowSearchResults(false);
                    setIsMobileSearchOpen(false);
                  }}
                  className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="relative w-9 h-9 rounded bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-[#b45309] font-bold">{item.priceFormatted}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── ROW 2: Horizontal Menu Bar (Desktop) ─── */}
      <nav className="hidden lg:block border-t border-white/15 relative">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-7 xl:space-x-8 h-11 text-[12px] xl:text-[12.5px] font-bold tracking-[0.06em] text-white">
            {navMenuItems.map((item) => {
              if (item.name === 'DISPOSABLE VAPE') {
                return (
                  <li
                    key={item.name}
                    className="relative py-2.5"
                    onMouseEnter={handleMouseEnterDisposable}
                    onMouseLeave={handleMouseLeaveDisposable}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsDisposableOpen(false)}
                      className={`inline-flex items-center space-x-1.5 uppercase transition-colors hover:text-[#ffb347] ${
                        isDisposableOpen || item.active
                          ? 'border-b-2 border-white pb-0.5 text-white font-extrabold'
                          : 'text-white/95'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] ml-0.5 transition-transform duration-200">
                        {isDisposableOpen ? '▲' : '▼'}
                      </span>
                    </Link>
                  </li>
                );
              }

              if (item.name === 'SHISHA/HOOKAH DISPOSABLE') {
                return (
                  <li
                    key={item.name}
                    className="relative py-2.5"
                    onMouseEnter={handleMouseEnterShisha}
                    onMouseLeave={handleMouseLeaveShisha}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsShishaOpen(false)}
                      className={`inline-flex items-center space-x-1.5 uppercase transition-colors hover:text-[#ffb347] ${
                        isShishaOpen || item.active
                          ? 'border-b-2 border-white pb-0.5 text-white font-extrabold'
                          : 'text-white/95'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] ml-0.5 transition-transform duration-200">
                        {isShishaOpen ? '▲' : '▼'}
                      </span>
                    </Link>
                  </li>
                );
              }

              if (item.name === 'PODS SYSTEM') {
                return (
                  <li
                    key={item.name}
                    className="relative py-2.5"
                    onMouseEnter={handleMouseEnterPodsSystem}
                    onMouseLeave={handleMouseLeavePodsSystem}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsPodsSystemOpen(false)}
                      className={`inline-flex items-center space-x-1.5 uppercase transition-colors hover:text-[#ffb347] ${
                        isPodsSystemOpen || item.active
                          ? 'border-b-2 border-white pb-0.5 text-white font-extrabold'
                          : 'text-white/95'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] ml-0.5 transition-transform duration-200">
                        {isPodsSystemOpen ? '▲' : '▼'}
                      </span>
                    </Link>
                  </li>
                );
              }

              if (item.name === 'E-LIQUID') {
                return (
                  <li
                    key={item.name}
                    className="relative py-2.5"
                    onMouseEnter={handleMouseEnterELiquid}
                    onMouseLeave={handleMouseLeaveELiquid}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsELiquidOpen(false)}
                      className={`inline-flex items-center space-x-1.5 uppercase transition-colors hover:text-[#ffb347] ${
                        isELiquidOpen || item.active
                          ? 'border-b-2 border-white pb-0.5 text-white font-extrabold'
                          : 'text-white/95'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] ml-0.5 transition-transform duration-200">
                        {isELiquidOpen ? '▲' : '▼'}
                      </span>
                    </Link>
                  </li>
                );
              }

              return (
                <li key={item.name} className="relative group py-2.5">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center space-x-1 uppercase transition-colors hover:text-[#ffb347] ${
                      item.active
                        ? 'border-b-2 border-white pb-0.5 text-white font-extrabold'
                        : 'text-white/95'
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-3 h-3 text-white/80 group-hover:text-[#ffb347] transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Standard Dropdown Menu on Hover for other items */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block bg-[#162e50] border border-white/20 rounded-xl shadow-2xl py-2 min-w-[200px] z-50">
                      {item.dropdownItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-xs font-medium text-white/90 hover:text-[#ffb347] hover:bg-white/10 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ─── FULL-WIDTH MEGA MENU FOR DISPOSABLE VAPE (1:1 with vapstall.ae) ─── */}
        {isDisposableOpen && (
          <div
            className="vap-mm-dropdown"
            onMouseEnter={handleMouseEnterDisposable}
            onMouseLeave={handleMouseLeaveDisposable}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 flex gap-8 items-start">
              {/* Left Column: Category title + Vertical scrollable list */}
              <div className="w-[230px] flex-shrink-0 flex flex-col">
                <div className="pb-3 border-b border-white/20 mb-3">
                  <Link
                    href="/collections/buy-disposable-vape-uae"
                    onClick={() => setIsDisposableOpen(false)}
                    className="text-[17px] font-bold text-white hover:text-[#ffb347] transition-colors inline-block"
                  >
                    Disposable Vape
                  </Link>
                </div>

                <div className="vap-mm-scroll max-h-[310px] overflow-y-auto pr-3 space-y-1">
                  {disposableLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsDisposableOpen(false)}
                      className="block py-1.5 text-[14px] text-white/90 hover:text-[#ffb347] hover:translate-x-1 transition-all duration-150 font-normal"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Carousel / Horizontal Slider of Visual Cards */}
              <div className="flex-1 min-w-0 relative">
                <div
                  ref={carouselRef}
                  onScroll={handleCarouselScroll}
                  className="flex gap-4 overflow-x-auto scroll-smooth vap-mm-no-scrollbar py-1"
                >
                  {disposableCards.map((card) => (
                    <Link
                      key={card.title}
                      href={card.href}
                      onClick={() => setIsDisposableOpen(false)}
                      className="group/card flex-shrink-0 w-[175px] flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                    >
                      <div className="relative w-[175px] h-[208px] rounded-[16px] overflow-hidden bg-[#0d1a33] shadow-md border border-white/10 group-hover/card:border-white/30 transition-all">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="175px"
                          className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="mt-2.5 text-[15px] font-medium text-white group-hover/card:text-[#ffb347] transition-colors block text-left">
                        {card.title}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Right Scroll Arrow */}
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="absolute right-0 top-[104px] -translate-y-1/2 w-10 h-10 rounded-full bg-[#1b335a]/90 hover:bg-[#25406F] text-white shadow-xl flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 cursor-pointer z-10"
                  aria-label="Scroll right"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Left Scroll Arrow */}
                {canScrollLeft && (
                  <button
                    type="button"
                    onClick={handleScrollLeft}
                    className="absolute left-0 top-[104px] -translate-y-1/2 w-10 h-10 rounded-full bg-[#1b335a]/90 hover:bg-[#25406F] text-white shadow-xl flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110 cursor-pointer z-10"
                    aria-label="Scroll left"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── FULL-WIDTH MEGA MENU FOR SHISHA/HOOKAH DISPOSABLE (1:1 with vapstall.ae) ─── */}
        {isShishaOpen && (
          <div
            className="vap-mm-dropdown"
            onMouseEnter={handleMouseEnterShisha}
            onMouseLeave={handleMouseLeaveShisha}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 flex gap-8 items-start">
              {/* Left Column: Shisha/Hookah Disposable title + Sublinks */}
              <div className="w-[230px] flex-shrink-0 flex flex-col">
                <div className="pb-3 border-b border-white/20 mb-3">
                  <Link
                    href="/collections/relx-disposable-vape-shop-in-dubai"
                    onClick={() => setIsShishaOpen(false)}
                    className="text-[17px] font-bold text-white hover:text-[#ffb347] transition-colors inline-block"
                  >
                    Shisha/Hookah Disposable
                  </Link>
                </div>

                <div className="space-y-1">
                  {shishaLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsShishaOpen(false)}
                      className="block py-1.5 text-[14px] text-white/90 hover:text-[#ffb347] hover:translate-x-1 transition-all duration-150 font-normal uppercase"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Cards for XTRA and VOZOL */}
              <div className="flex-1 min-w-0 flex gap-4">
                {shishaCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    onClick={() => setIsShishaOpen(false)}
                    className="group/card flex-shrink-0 w-[175px] flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="relative w-[175px] h-[208px] rounded-[16px] overflow-hidden bg-[#0d1a33] shadow-md border border-white/10 group-hover/card:border-white/30 transition-all">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="175px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="mt-2.5 text-[15px] font-medium text-white group-hover/card:text-[#ffb347] transition-colors block text-left">
                      {card.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── FULL-WIDTH MEGA MENU FOR PODS SYSTEM (1:1 with vapstall.ae) ─── */}
        {isPodsSystemOpen && (
          <div
            className="vap-mm-dropdown"
            onMouseEnter={handleMouseEnterPodsSystem}
            onMouseLeave={handleMouseLeavePodsSystem}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 flex gap-8 items-start">
              {/* Left Column: Pods System title + Sublinks */}
              <div className="w-[230px] flex-shrink-0 flex flex-col">
                <div className="pb-3 border-b border-white/20 mb-3">
                  <Link
                    href="/shop?category=Pod+Systems"
                    onClick={() => setIsPodsSystemOpen(false)}
                    className="text-[17px] font-bold text-white hover:text-[#ffb347] transition-colors inline-block"
                  >
                    Pods System
                  </Link>
                </div>

                <div className="space-y-1">
                  {podsSystemLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsPodsSystemOpen(false)}
                      className="block py-1.5 text-[14px] text-white/90 hover:text-[#ffb347] hover:translate-x-1 transition-all duration-150 font-normal"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Cards for Relx, Vaporesso, OXVA */}
              <div className="flex-1 min-w-0 flex gap-4">
                {podsSystemCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    onClick={() => setIsPodsSystemOpen(false)}
                    className="group/card flex-shrink-0 w-[175px] flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="relative w-[175px] h-[208px] rounded-[16px] overflow-hidden bg-[#0d1a33] shadow-md border border-white/10 group-hover/card:border-white/30 transition-all">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="175px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="mt-2.5 text-[15px] font-medium text-white group-hover/card:text-[#ffb347] transition-colors block text-left">
                      {card.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── FULL-WIDTH MEGA MENU FOR E-LIQUID (1:1 with vapstall.ae) ─── */}
        {isELiquidOpen && (
          <div
            className="vap-mm-dropdown"
            onMouseEnter={handleMouseEnterELiquid}
            onMouseLeave={handleMouseLeaveELiquid}
          >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-8 py-8 flex gap-8 items-start">
              {/* Left Column: E-Liquid title + Sublinks */}
              <div className="w-[230px] flex-shrink-0 flex flex-col">
                <div className="pb-3 border-b border-white/20 mb-3">
                  <Link
                    href="/shop?category=E-Liquids"
                    onClick={() => setIsELiquidOpen(false)}
                    className="text-[17px] font-bold text-white hover:text-[#ffb347] transition-colors inline-block"
                  >
                    E-Liquid
                  </Link>
                </div>

                <div className="space-y-1">
                  {eLiquidLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsELiquidOpen(false)}
                      className="block py-1.5 text-[14px] text-white/90 hover:text-[#ffb347] hover:translate-x-1 transition-all duration-150 font-normal"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Column: Visual Cards for Nasty and Vozol */}
              <div className="flex-1 min-w-0 flex gap-4">
                {eLiquidCards.map((card) => (
                  <Link
                    key={card.title}
                    href={card.href}
                    onClick={() => setIsELiquidOpen(false)}
                    className="group/card flex-shrink-0 w-[175px] flex flex-col cursor-pointer transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="relative w-[175px] h-[208px] rounded-[16px] overflow-hidden bg-[#0d1a33] shadow-md border border-white/10 group-hover/card:border-white/30 transition-all">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="175px"
                        className="object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="mt-2.5 text-[15px] font-medium text-white group-hover/card:text-[#ffb347] transition-colors block text-left">
                      {card.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#11243e] border-t border-white/15 px-4 pt-4 pb-6 space-y-3 max-h-[calc(100vh-74px)] overflow-y-auto">
          <ul className="space-y-1 text-sm font-semibold text-white">
            {navMenuItems.map((item) => {
              if (item.name === 'DISPOSABLE VAPE') {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobileDisposableOpen(!isMobileDisposableOpen)}
                        className="p-2 text-white/80"
                        aria-label="Toggle Disposable Vape submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileDisposableOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isMobileDisposableOpen && (
                      <div className="pl-6 pt-1 space-y-1">
                        {disposableLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-white/80 hover:text-[#ffb347]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              if (item.name === 'SHISHA/HOOKAH DISPOSABLE') {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobileShishaOpen(!isMobileShishaOpen)}
                        className="p-2 text-white/80"
                        aria-label="Toggle Shisha Disposable submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileShishaOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isMobileShishaOpen && (
                      <div className="pl-6 pt-1 space-y-1">
                        {shishaLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-white/80 hover:text-[#ffb347]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              if (item.name === 'PODS SYSTEM') {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobilePodsSystemOpen(!isMobilePodsSystemOpen)}
                        className="p-2 text-white/80"
                        aria-label="Toggle Pods System submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobilePodsSystemOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isMobilePodsSystemOpen && (
                      <div className="pl-6 pt-1 space-y-1">
                        {podsSystemLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-white/80 hover:text-[#ffb347]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              if (item.name === 'E-LIQUID') {
                return (
                  <li key={item.name} className="border-b border-white/10 pb-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobileELiquidOpen(!isMobileELiquidOpen)}
                        className="p-2 text-white/80"
                        aria-label="Toggle E-Liquid submenu"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileELiquidOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                    {isMobileELiquidOpen && (
                      <div className="pl-6 pt-1 space-y-1">
                        {eLiquidLinks.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-white/80 hover:text-[#ffb347]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
            <span>Help: +971 55 168 8299</span>
            <div className="flex space-x-3">
              <Link href="/pages/contact-us" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
