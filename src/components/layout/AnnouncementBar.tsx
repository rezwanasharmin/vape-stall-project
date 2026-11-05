'use client';

import React from 'react';
import Link from 'next/link';
import { Phone } from 'lucide-react';

const announcements = [
  "UAE's Most Trusted Online Vape Store",
  "🔒 Secure Payment | COD Available",
  "🔥 Exclusive offer up to 10% OFF",
  "✅ 100% Authentic Products – Original Brands Guaranteed",
  "📦 Free Delivery on Orders Above AED 350",
  "⭐ 20,00000+ Happy Customers Across UAE"
];

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-[#0e1e35] via-[#1d3359] to-[#253f6d] text-white text-[11.5px] border-b border-[#874819]/50 shadow-sm z-50">
      {/* Top golden glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f88a07] to-transparent opacity-75" />

      <div className="flex items-stretch justify-between h-[34px]">
        {/* Left Ticker (Infinite Marquee) */}
        <div className="flex-1 overflow-hidden relative flex items-center">
          <div className="animate-ticker whitespace-nowrap flex items-center space-x-6 pl-4">
            {[...announcements, ...announcements, ...announcements].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-6">
                <span className="font-medium tracking-wide text-white/95 text-[11.5px]">
                  {item}
                </span>
                <span className="text-[#f88a07] text-[10px]">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Fixed Cognac Container (Exact match from screenshot) */}
        <div className="flex-shrink-0 flex items-stretch bg-gradient-to-r from-[#a05a20] via-[#874819] to-[#6b3812] border-l border-[#f88a07]/40 px-3 sm:px-5 relative">
          {/* Subtle sheen overlay */}
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          <div className="flex items-center space-x-3 sm:space-x-5 text-white/95 font-semibold text-[11px] sm:text-[11.5px] z-10">
            <a
              href="tel:+971551688299"
              className="flex items-center space-x-1.5 hover:text-white hover:bg-white/15 px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-[#ffc885]" />
              <span className="tracking-wide">+971 55 168 8299</span>
            </a>

            <span className="text-white/30 hidden sm:inline">|</span>

            <a
              href="#about-us"
              onClick={(e) => e.preventDefault()}
              className="hover:text-white hover:bg-white/15 px-2 py-1 rounded transition-colors hidden sm:inline whitespace-nowrap cursor-pointer"
            >
              About Us
            </a>

            <span className="text-white/30 hidden sm:inline">|</span>

            <Link
              href="/contact"
              className="hover:text-white hover:bg-white/15 px-2 py-1 rounded transition-colors hidden sm:inline whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#f88a07] to-transparent opacity-50" />
    </div>
  );
};
