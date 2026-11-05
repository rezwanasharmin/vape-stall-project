'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlistCount] = useState(1); // Exact count '1' shown in user's screenshot

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

  const navMenuItems = [
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
      href: '/shop?category=Disposable+Vape',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Disposable Vapes', href: '/shop?category=Disposable+Vape' },
        { label: 'Elf Bar Disposables', href: '/shop?brand=Elf+Bar' },
        { label: 'VOZOL High Puff Vapes', href: '/shop?brand=VOZOL' },
        { label: 'Lost Mary Disposables', href: '/shop?brand=Lost+Mary' },
        { label: 'Al Fakher Crown Bar', href: '/shop?brand=Al+Fakher' },
        { label: 'Waka Blade Series', href: '/shop?brand=Waka' },
      ],
    },
    {
      name: 'NICOTINE POUCHES',
      href: '/shop?category=Nicotine+Pouches',
    },
    {
      name: 'SHISHA/HOOKAH DISPOSABLE',
      href: '/shop?category=Shisha+%2F+Hookah',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Shisha Disposables', href: '/shop?category=Shisha+%2F+Hookah' },
        { label: 'Al Fakher Crown Bar E-Hose', href: '/shop?brand=Al+Fakher' },
        { label: 'Sultan Shisha 100K Puffs', href: '/shop?q=Sultan' },
      ],
    },
    {
      name: 'PODS SYSTEM',
      href: '/shop?category=Pod+Systems',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Pod Systems', href: '/shop?category=Pod+Systems' },
        { label: 'Prefilled Pod Kits', href: '/shop?q=Pod+Kit' },
        { label: 'Refillable Vape Kits', href: '/shop?category=Pod+Systems' },
      ],
    },
    {
      name: 'E-LIQUID',
      href: '/shop?category=E-Liquids',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All E-Liquids', href: '/shop?category=E-Liquids' },
        { label: 'Salt Nicotine (Nic Salts)', href: '/shop?category=E-Liquids' },
        { label: 'Freebase E-Juice', href: '/shop?category=E-Liquids' },
      ],
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
      href: '/shop?q=Offer',
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#162e50] shadow-md select-none">
      {/* ─── ROW 1: Logo + Inline Search + Icons ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px] gap-4">
          
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#ffb347] focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left: Mascot Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/header-logo.png"
                alt="Vape Stall Logo"
                width={64}
                height={64}
                priority
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
            </div>
          </Link>

          {/* Center: Long White Search Bar with Dark Blue Search Button */}
          <div className="flex-1 max-w-2xl mx-2 sm:mx-6 relative">
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
                  className="w-full h-[46px] bg-white text-slate-800 text-[14.5px] rounded-full pl-11 pr-14 placeholder-[#aabdd6] focus:outline-none shadow-sm"
                />

                {/* Left search icon */}
                <Search className="w-4 h-4 text-[#839cb8] absolute left-4 pointer-events-none stroke-[2]" />

                {/* Right submit pill button (dark blue gradient with search icon) */}
                <button
                  type="submit"
                  className="absolute right-1.5 top-1 bottom-1 w-11 bg-gradient-to-r from-[#2d4f88] to-[#1A2F52] hover:from-[#355ea0] hover:to-[#22396a] text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95"
                  aria-label="Submit Search"
                >
                  <Search className="w-4 h-4 text-white stroke-[2.2]" />
                </button>
              </div>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSearchResults && filteredSearch.length > 0 && (
              <div
                className="absolute left-0 right-0 top-13 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden text-slate-800"
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
                    <div className="relative w-10 h-10 rounded bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
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

          {/* Right Icons: Wishlist (with red '1' badge) + User + Cart */}
          <div className="flex items-center space-x-5 sm:space-x-7 text-white">
            
            {/* Wishlist Icon with Red Circle Badge '1' */}
            <Link
              href="/shop"
              className="relative hover:text-[#ffb347] transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6 stroke-[1.6]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#e11d48] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Icon */}
            <Link
              href="/about"
              className="hover:text-[#ffb347] transition-colors hidden sm:block"
              title="My Account"
              aria-label="Account"
            >
              <User className="w-6 h-6 stroke-[1.6]" />
            </Link>

            {/* Cart Icon */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-[#ffb347] transition-colors focus:outline-none"
              title="Cart"
              aria-label="Shopping Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="11 11 18 18"
                className="w-6 h-6 text-white hover:text-[#ffb347] transition-colors"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ffb347] text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* ─── ROW 2: Horizontal Menu Bar (Desktop) ─── */}
      <nav className="hidden lg:block border-t border-white/15">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-7 xl:space-x-8 h-11 text-[12px] xl:text-[12.5px] font-bold tracking-[0.06em] text-white">
            {navMenuItems.map((item) => (
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

                {/* Dropdown Menu on Hover */}
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
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#11243e] border-t border-white/15 px-4 pt-4 pb-6 space-y-3">
          <ul className="space-y-1 text-sm font-semibold text-white">
            {navMenuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-[#ffb347] transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
            <span>Help: +971 55 168 8299</span>
            <div className="flex space-x-3">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">About Us</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
