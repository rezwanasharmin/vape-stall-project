'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ShieldAlert, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-dark-border text-gray-400 text-sm">
      {/* Age Warning Banner */}
      <div className="bg-amber-500/10 border-y border-amber-500/20 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs sm:text-sm text-amber-400 text-center font-medium">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>
            <strong>WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical. Only for adults aged 21 and above.
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="relative h-10 w-44">
              <Image
                src="/images/logo.png"
                alt="Vape Stall Dubai"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-xs leading-relaxed text-gray-400">
              Vape Stall is an authorized vape shop offering genuine disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from top brands like Elf Bar, Lost Mary, VOZOL, HQD, and Al Fakher. We provide fast delivery across all UAE Emirates, competitive prices, and reliable customer support for a smooth vaping experience.
            </p>
            <div className="flex items-center space-x-2 text-xs text-brand-400 font-medium">
              <span>✦ 100% Guaranteed Authentic</span>
              <span>✦ Same Day UAE Delivery</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-400 transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-brand-400 transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-brand-400 transition-colors">Checkout</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Shop Categories
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/shop?category=Disposable+Vape" className="hover:text-brand-400 transition-colors">
                  Disposable Vapes
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Pod+Systems" className="hover:text-brand-400 transition-colors">
                  Pod Systems & Kits
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Shisha+%2F+Hookah" className="hover:text-brand-400 transition-colors">
                  Shisha / Hookah Disposables
                </Link>
              </li>
              <li>
                <Link href="/shop?category=E-Liquids" className="hover:text-brand-400 transition-colors">
                  E-Liquids & Nicotine Salts
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=Elf+Bar" className="hover:text-brand-400 transition-colors">
                  Elf Bar Collection
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=VOZOL" className="hover:text-brand-400 transition-colors">
                  VOZOL Vape Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Customer Support
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>All Warsan 1, Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="tel:+971551688299" className="hover:text-brand-400 text-white font-medium">
                  +971 55 168 8299
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <a href="mailto:vapestallae@gmail.com" className="hover:text-brand-400 text-white">
                  vapestallae@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
                <span>Mon – Fri: 10:00 AM – 10:00 PM (GST)</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold mb-2">
                Accepted Payment Methods
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-300">
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">Cash on Delivery (COD)</span>
                <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">Card on Delivery</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Vape Stall (vapstall.ae). All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/about" className="hover:text-gray-300">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gray-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-gray-300">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
