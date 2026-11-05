'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const features = [
  {
    icon: '/images/icons/delivery-van.svg',
    alt: 'Free Delivery Van Icon',
    title: 'Free Shipping',
    description: 'Terms & Conditions applied for free shipping and delivery',
  },
  {
    icon: '/images/icons/support.svg',
    alt: '24x7 Support Gift Hand Icon',
    title: '24x7 Support',
    description: 'Round-the-Clock Assistance, Anytime You Need It',
  },
  {
    icon: '/images/icons/parcel-return.svg',
    alt: '1 Week Return Parcel Icon',
    title: '1 Week Return',
    description: 'Your Satisfaction is Our Priority: Return Any Product Within 1 week',
  },
  {
    icon: '/images/icons/secure_payment.png',
    alt: 'Secure Payment Credit Card Icon',
    title: 'Secure Payment',
    description: 'Seamless Shopping Backed by Safe andSecure Payment Options',
  },
];

export const FeaturesBar: React.FC = () => {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`vab-usp-section bg-[#f1f4f9] pt-16 sm:pt-24 pb-20 sm:pb-24 border-b border-slate-200 ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Feature Items Grid - 2x2 on mobile, 4 in row on desktop */}
        <div className="content-block grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              style={{ '--i': index } as React.CSSProperties}
              className="item group bg-[rgba(37,64,111,0.06)] hover:bg-[rgba(37,64,111,0.09)] border border-[#C8D5EC] hover:border-[#a0b8df] rounded-xl p-3.5 sm:p-6 text-center transition-all duration-300 shadow-sm flex flex-col items-center justify-start"
            >
              {/* Centered Line Icon */}
              <div className="icon h-8 sm:h-10 flex items-center justify-center mb-2 sm:mb-3">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="lbl text-[#25406F] text-[13.5px] sm:text-base font-bold mb-1 sm:mb-1.5 tracking-tight leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text text-[#64748b] text-[11px] sm:text-xs leading-relaxed max-w-[240px] mx-auto font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
