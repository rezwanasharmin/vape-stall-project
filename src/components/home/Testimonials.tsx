'use client';

import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const reviews = [
  {
    name: 'Ahmed Al-Mansouri',
    location: 'Dubai Marina, UAE',
    rating: 5,
    comment: 'Super fast delivery in Dubai! Ordered the Kief King 35000 and it arrived within 3 hours. 100% genuine product with authentic QR check.',
    device: 'Kief King 35000 Puffs'
  },
  {
    name: 'Tariq Hassan',
    location: 'Abu Dhabi, UAE',
    rating: 5,
    comment: 'Best vape prices in UAE. Cash on delivery was seamless and the flavors on the Vozol Star 40000 are unmatched. Highly recommended store.',
    device: 'Vozol Star 40000'
  },
  {
    name: 'Michael R.',
    location: 'Sharjah, UAE',
    rating: 5,
    comment: 'Customer support on WhatsApp was extremely helpful. Answered my questions within minutes and helped me pick the best Elf Bar pod kit.',
    device: 'Elf Bar JoinOne Ice'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-1.5 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-4 h-4 fill-brand-400" />
            <span>Customer Satisfaction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            20,000+ Happy Customers Across UAE
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Read what verified vape enthusiasts in Dubai, Abu Dhabi & Sharjah say about Vape Stall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-dark-card border border-dark-border p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-brand-500/30 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-dark-border/60 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center space-x-1">
                    <span>{rev.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-[11px] text-gray-400">{rev.location}</p>
                </div>
                <span className="text-[10px] text-brand-400 font-medium bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  {rev.device}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
