'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface CategoryCard {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  isComingSoon?: boolean;
  image: string;
  alt: string;
  link: string;
}

const categoriesData: CategoryCard[] = [
  {
    id: 'vape-kits',
    number: '01',
    title: 'Vape Kits',
    subtitle: 'Discover premium pod systems & mods from top brands',
    tag: 'BEST SELLERS',
    tagColor: 'from-[#8c6530] to-[#5a3e1b]',
    isComingSoon: true,
    image: '/images/categories/cat-vape-kits.webp',
    alt: 'Collection of various vaping devices and accessories on dark background',
    link: '/shop?category=Pod+Systems',
  },
  {
    id: 'disposables',
    number: '02',
    title: 'Disposables',
    subtitle: 'Up to 10,000 puffs in sleek, compact designs',
    tag: 'NEW ARRIVALS',
    tagColor: 'from-[#6b3812] to-[#2b4c7e]',
    isComingSoon: false,
    image: '/images/categories/cat-disposables.webp',
    alt: 'Disposables vapes with Myle, Crown Bar, Sultan Shisha and Air Bar',
    link: '/shop?category=Disposable+Vape',
  },
  {
    id: 'e-liquids',
    number: '03',
    title: 'E-Liquids',
    subtitle: 'Hundreds of premium flavors to explore',
    tag: 'TOP RATED',
    tagColor: 'from-[#8c6530] to-[#5a3e1b]',
    isComingSoon: true,
    image: '/images/categories/cat-eliquids.webp',
    alt: 'Five bottles of different flavors of e-liquid on dark background',
    link: '/shop?category=E-Liquids',
  },
  {
    id: 'pod-system',
    number: '04',
    title: 'Pod System',
    subtitle: 'Compact, refillable pods for everyday vaping',
    tag: 'TRENDING',
    tagColor: 'from-[#8c6530] to-[#5a3e1b]',
    isComingSoon: true,
    image: '/images/categories/cat-pod-systems.webp',
    alt: 'Pod Salt Evolve battery and pod system',
    link: '/shop?category=Pod+Systems',
  },
];

export const CategoryGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pt-14 sm:pt-16 pb-12 sm:pb-16 bg-[#f1f4f9] text-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section (Exact match from screenshot 1) */}
        <div className={`vap-category-header text-center max-w-xl mx-auto mb-12 ${isVisible ? 'is-visible' : ''}`}>
          
          {/* Eyebrow */}
          <div className="flex items-center justify-center space-x-3 text-[#f78804] text-xs font-bold tracking-[0.2em] uppercase">
            <span className="w-8 h-[1px] bg-[#f78804]" />
            <span>FIND YOUR FAVORITES</span>
            <span className="w-8 h-[1px] bg-[#f78804]" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2f52] tracking-tight mt-3">
            Shop by Category
          </h2>

          {/* Ruler with Gold Gem */}
          <div className="flex items-center justify-center space-x-3 mt-3">
            <span className="w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#f78804]" />
            <span className="w-2.5 h-2.5 rotate-45 bg-[#f78804] shadow-sm" />
            <span className="w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#f78804]" />
          </div>

        </div>

        {/* 4 Cards Grid - Responsive Magazine Grid matching vapstall.ae */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {categoriesData.map((cat, index) => {
            const isFullWidthMobile = index === 0 || index === 3;

            return (
              <Link
                key={cat.id}
                href={cat.link}
                style={{ '--cc-delay': `${index * 0.14}s` } as React.CSSProperties}
                className={`vap-cc__card group relative rounded-[18px] sm:rounded-[22px] overflow-hidden ${
                  isFullWidthMobile ? 'col-span-2 sm:col-span-1 lg:col-span-1 aspect-[16/9] sm:aspect-[3/4.2]' : 'col-span-1 aspect-[3/4.2]'
                } p-4 sm:p-6 flex flex-col justify-between shadow-xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-700/60 hover:border-[#b48648] ${
                  isVisible ? 'is-visible' : ''
                }`}
              >
              
              {/* Background Image (Scales forward on hover) */}
              <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-95"
                />

                {/* Dark Gradient Overlay for perfect text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1626]/95 via-[#0d1626]/40 to-transparent" />
              </div>

              {/* Diagonal Shine Sweep on Hover */}
              <div className="absolute top-[-100%] left-[-110%] w-[55%] h-[300%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-[18deg] pointer-events-none z-30 transition-all duration-700 group-hover:left-[140%]" />

              {/* Floating Glowing Particle Balls (Active on hover, moving slowly up and down) */}
              <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {/* Ball 1 - Gold */}
                <span
                  className="vap-cc-particle w-[5px] h-[5px] bg-[#f78804]/80 shadow-[0_0_8px_#f78804]"
                  style={{ left: '15%', top: '25%', animationDelay: '0s' }}
                />
                {/* Ball 2 - Amber */}
                <span
                  className="vap-cc-particle w-[4px] h-[4px] bg-[#ba8a4c]/90 shadow-[0_0_6px_#ba8a4c]"
                  style={{ left: '28%', top: '65%', animationDelay: '0.4s' }}
                />
                {/* Ball 3 - Soft White */}
                <span
                  className="vap-cc-particle w-[6px] h-[6px] bg-white/70 shadow-[0_0_10px_white]"
                  style={{ left: '72%', top: '30%', animationDelay: '0.8s' }}
                />
                {/* Ball 4 - Gold */}
                <span
                  className="vap-cc-particle w-[3px] h-[3px] bg-[#f78804]/90"
                  style={{ left: '85%', top: '75%', animationDelay: '0.2s' }}
                />
                {/* Ball 5 - Amber */}
                <span
                  className="vap-cc-particle w-[5px] h-[5px] bg-[#ffb347]/80 shadow-[0_0_6px_#ffb347]"
                  style={{ left: '50%', top: '15%', animationDelay: '1.1s' }}
                />
                {/* Ball 6 - Soft White */}
                <span
                  className="vap-cc-particle w-[4px] h-[4px] bg-white/60"
                  style={{ left: '20%', top: '80%', animationDelay: '0.6s' }}
                />
                {/* Ball 7 - Amber */}
                <span
                  className="vap-cc-particle w-[6px] h-[6px] bg-[#ba8a4c]/80 shadow-[0_0_8px_#ba8a4c]"
                  style={{ left: '60%', top: '55%', animationDelay: '1.4s' }}
                />
                {/* Ball 8 - Gold */}
                <span
                  className="vap-cc-particle w-[3px] h-[3px] bg-[#f78804]/70"
                  style={{ left: '40%', top: '42%', animationDelay: '0.9s' }}
                />
              </div>

              {/* Top Row: Coming Soon Badge & Number Watermark */}
              <div className="relative z-10 flex items-center justify-between">
                {cat.isComingSoon ? (
                  <span className="bg-black/50 backdrop-blur-md border border-white/25 text-white/95 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    COMING SOON
                  </span>
                ) : (
                  <span />
                )}

                {/* Number Watermark (01, 02, 03, 04) */}
                <span className="font-mono text-xs font-bold text-[#ba8a4c]/70 group-hover:text-[#ffc885] transition-colors">
                  {cat.number}
                </span>
              </div>

              {/* Bottom Content: Tag + Title + Subtitle + Shop Now Button */}
              <div className="relative z-10 space-y-2.5">
                
                {/* Badge Tag (e.g. BEST SELLERS, NEW ARRIVALS, TOP RATED, TRENDING) */}
                <div className="inline-block">
                  <span className="bg-black/40 backdrop-blur-sm border border-[#ba8a4c]/40 text-[#ffc885] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                    {cat.tag}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-2xl font-black text-white group-hover:text-[#ffc885] transition-colors tracking-tight leading-snug">
                  {cat.title}
                </h3>

                {/* Subtitle */}
                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                  {cat.subtitle}
                </p>

                {/* Camel/Gold "Shop Now →" Button */}
                <div className="pt-2">
                  <span className="inline-flex items-center space-x-2 bg-[#ba8a4c] group-hover:bg-[#d97706] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all duration-300">
                    <span>Shop Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

              </div>

            </Link>
          );
        })}
        </div>

      </div>
    </section>
  );
};
