'use client';

import React from 'react';

const announcements = [
  "🏆 UAE's Most Trusted Online Vape Store",
  "🔒 Secure Payment | COD Available",
  "🔥 Exclusive offer up to 10% OFF",
  "✅ 100% Authentic Products – Original Brands Guaranteed",
  "📦 Free Delivery on Orders Above AED 350",
  "⭐ 20,00000+ Happy Customers Across UAE"
];

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-brand-500 text-slate-950 font-medium text-xs sm:text-sm py-2 overflow-hidden select-none border-b border-brand-400">
      <div className="animate-ticker whitespace-nowrap flex items-center space-x-8">
        {[...announcements, ...announcements].map((item, index) => (
          <div key={index} className="flex items-center space-x-8">
            <span className="font-semibold tracking-wide">{item}</span>
            <span className="text-slate-800 opacity-60">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
