import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Users, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-12 lg:py-20 bg-dark-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            About Vape Stall UAE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            UAE&apos;s Most Trusted Online Vape Destination
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Providing authentic disposable vapes, pod systems, and accessories across Dubai and the entire United Arab Emirates.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-sm text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white border-l-4 border-brand-500 pl-3">
            Who We Are
          </h2>
          <p>
            Vape Stall is an authorized vape shop offering genuine disposable vapes, pod systems, vape kits, nicotine pouches, and accessories from top global brands like Elf Bar, Lost Mary, VOZOL, HQD, and Al Fakher. Located in All Warsan 1, Dubai, we serve thousands of adult vapers across the UAE with premier products and dedicated customer care.
          </p>
          <p>
            We take authenticity with absolute seriousness. Every single device sold on our platform comes with original anti-counterfeit QR codes and manufacturer seals, guaranteeing peace of mind and maximum safety for all our customers.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">100% Genuine Guarantee</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We source directly from official brand manufacturers. Scan the QR code on every packaging to verify authenticity instantly.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Rapid Same-Day Delivery</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Need your vape fast? We offer same-day delivery throughout Dubai and swift express shipping to Abu Dhabi, Sharjah, Ajman, and all Emirates.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Competitive UAE Pricing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We strive to offer the most competitive prices in AED with regular promotions, bundle discounts, and free shipping on orders over AED 350.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">20,000+ Satisfied Customers</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our 4.8+ customer rating across thousands of orders stands as a testament to our commitment to exceptional service and quality.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold px-8 py-3.5 rounded-full text-xs transition-all shadow-lg"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
