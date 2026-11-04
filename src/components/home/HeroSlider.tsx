'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  gradient: string;
  link: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: 'Exclusive Offer up to 10% OFF',
    title: 'Best Vape Deals Online',
    description: 'Get exclusive discounts on genuine vape products from trusted international brands at Vape Stall.',
    image: '/images/banners/hero-slide-deals.webp',
    alt: 'High Puff Disposable Vapes Deals with Digital Displays',
    gradient: 'linear-gradient(128deg, rgba(167, 58, 9, 1) 0%, rgba(100, 48, 14, 1) 40%, rgba(6, 78, 59, 1) 100%)',
    link: '/shop',
  },
  {
    id: 2,
    badge: 'Exclusive Offer up to 10% OFF',
    title: 'Find Your Perfect Vape Today',
    description: 'Browse trending vape flavors, high-puff disposables, and premium devices all in one place.',
    image: '/images/banners/hero-slide-hqd.webp',
    alt: 'HQD Glaze Plus and Cuvie Shisha Disposable Vapes',
    gradient: 'linear-gradient(135deg, rgba(37, 64, 111, 1) 0%, rgba(26, 47, 82, 1) 100%)',
    link: '/shop?category=Disposable+Vape',
  },
  {
    id: 3,
    badge: 'Exclusive Offer up to 10% OFF',
    title: 'Authentic Vapes, Fast UAE Delivery',
    description: 'Shop Elf Bar, Lost Mary, VOZOL, HQD, and more with trusted service and competitive prices.',
    image: '/images/banners/hero-slide-alfakher.webp',
    alt: 'Al Fakher Crown Bar E-Hose and Hookah Vapes in UAE',
    gradient: 'linear-gradient(135deg, rgba(26, 47, 82, 1) 0%, rgba(45, 80, 148, 1) 100%)',
    link: '/shop?brand=Al+Fakher',
  },
  {
    id: 4,
    badge: 'Exclusive Offer up to 10% OFF',
    title: 'Buy Authentic Vape in Dubai — Fast Delivery, Best Prices',
    description: 'Shop premium disposable vapes, pod systems, and starter kits from top brands. Delivered anywhere in Dubai & UAE.',
    image: '/images/banners/hero-slide-starter.webp',
    alt: 'Disposable Vape Pod Kits in UAE',
    gradient: 'linear-gradient(135deg, rgba(212, 71, 8, 1) 0%, rgba(139, 26, 0, 1) 100%)',
    link: '/shop',
  },
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    if (isHovered) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-roledescription="carousel"
      aria-label="Hero Promotions Slider"
    >
      {/* Slides Container */}
      <div className="relative min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
        {slides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
              style={{ background: slide.gradient }}
            >
              <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-16 w-full py-10 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Text Content */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
                    
                    {/* Orange Offer Badge */}
                    <div className="inline-block">
                      <span className="bg-[#e8740c] text-white text-[11px] sm:text-xs font-bold tracking-wide px-3.5 py-1 rounded-full shadow-sm">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] max-w-xl">
                      {slide.title}
                    </h1>

                    {/* Subtitle Description */}
                    <p className="text-xs sm:text-sm lg:text-base text-white/90 leading-relaxed max-w-lg font-normal">
                      {slide.description}
                    </p>

                    {/* Explore Button (Exact style from uploaded screenshots 4 & 5) */}
                    <div className="pt-2">
                      <Link
                        href={slide.link}
                        className="group inline-flex items-center space-x-3.5 bg-[#ba8a4c] hover:bg-white text-white hover:text-[#e8740c] px-6 py-2.5 sm:px-7 sm:py-3 rounded-full text-sm sm:text-base font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                      >
                        <span className="tracking-wide">Explore</span>
                        
                        {/* Circle with Arrow (transitions on hover) */}
                        <div className="w-8 h-8 rounded-full bg-[#7e5b2e] flex items-center justify-center text-white flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1 shadow-inner">
                          <span className="text-sm font-bold leading-none transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                            →
                          </span>
                        </div>
                      </Link>
                    </div>

                  </div>

                  {/* Right Image */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-64 sm:w-80 lg:w-[420px] aspect-square transition-transform duration-700 ease-out">
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
                        className="object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Prev Navigation Arrow Button (Left edge) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg active:scale-90"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Next Navigation Arrow Button (Right edge) */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-950/40 hover:bg-slate-950/70 border border-white/20 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow-lg active:scale-90"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === currentSlide
                ? 'w-7 h-2 bg-[#ffb347] shadow-sm'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
