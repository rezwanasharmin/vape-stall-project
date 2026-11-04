'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, Phone, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const filteredSearch = searchQuery.trim()
    ? products
        .filter((p) =>
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

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop All', href: '/shop' },
    { name: 'Disposable Vape', href: '/shop?category=Disposable+Vape' },
    { name: 'Pod Systems', href: '/shop?category=Pod+Systems' },
    { name: 'Shisha/Hookah', href: '/shop?category=Shisha+%2F+Hookah' },
    { name: 'E-Liquid', href: '/shop?category=E-Liquids' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-dark-bg/95 backdrop-blur-md border-b border-dark-border">
      {/* Top Header: Logo, Search, Cart & Hotline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative h-10 w-36 sm:h-12 sm:w-44">
              <Image
                src="/images/logo.png"
                alt="Vape Stall Dubai UAE"
                fill
                priority
                className="object-contain"
                onError={(e) => {
                  // Fallback if image fails
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search disposable vapes, brands, pods..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-dark-card border border-dark-border text-white text-sm rounded-full pl-11 pr-4 py-2.5 focus:outline-none focus:border-brand-500 placeholder-gray-400 transition-colors"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </form>

            {/* Live Search Suggestions Dropdown */}
            {showSearchResults && filteredSearch.length > 0 && (
              <div 
                className="absolute left-0 right-0 top-12 bg-dark-card border border-dark-border rounded-xl shadow-2xl p-2 z-50 overflow-hidden"
                onMouseLeave={() => setShowSearchResults(false)}
              >
                <div className="text-xs font-semibold text-gray-400 px-3 py-1.5 uppercase">
                  Matching Products
                </div>
                {filteredSearch.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.handle}`}
                    onClick={() => setShowSearchResults(false)}
                    className="flex items-center space-x-3 p-2 hover:bg-slate-800/60 rounded-lg transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded bg-slate-900 flex-shrink-0 overflow-hidden border border-slate-700">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-brand-400 font-semibold">{item.priceFormatted}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Header: Hotline & Cart */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Phone support */}
            <a
              href="tel:+971551688299"
              className="hidden xl:flex items-center space-x-2 text-xs text-gray-300 hover:text-brand-400 transition-colors border-r border-dark-border pr-6"
            >
              <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Helpline</p>
                <p className="font-semibold text-white">+971 55 168 8299</p>
              </div>
            </a>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2.5 bg-dark-card hover:bg-slate-800 border border-dark-border px-4 py-2 rounded-full text-white transition-colors"
              aria-label="View shopping cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-brand-400" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-500 text-black text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                Cart
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Links - Desktop Bar */}
      <nav className="hidden lg:block bg-slate-950/80 border-t border-dark-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-8 h-12 text-sm font-medium text-gray-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-brand-400 transition-colors py-3 block tracking-wide"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="ml-auto flex items-center text-xs text-emerald-400 space-x-1.5 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Genuine UAE Stock</span>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-dark-card border-b border-dark-border px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-dark-border text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-brand-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-brand-400 hover:bg-slate-800 transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-dark-border flex items-center justify-between text-xs text-gray-300">
            <span>Call / WhatsApp Support:</span>
            <a href="tel:+971551688299" className="text-brand-400 font-semibold">
              +971 55 168 8299
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
