'use client';

import React from 'react';
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
  return (
    <section className="vab-usp-section bg-[#f1f4f9] pt-16 sm:pt-24 pb-20 sm:pb-24 border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Feature Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-[rgba(37,64,111,0.06)] hover:bg-[rgba(37,64,111,0.09)] border border-[#C8D5EC] hover:border-[#a0b8df] rounded-xl p-6 text-center transition-all duration-300 shadow-sm flex flex-col items-center justify-start"
            >
              {/* Centered Line Icon */}
              <div className="h-10 flex items-center justify-center mb-3">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[#25406F] text-[15px] sm:text-base font-bold mb-1.5 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[#64748b] text-xs leading-relaxed max-w-[240px] mx-auto font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
