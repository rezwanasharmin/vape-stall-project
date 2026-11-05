'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QuickViewModal, QuickViewProductData } from '@/components/product/QuickViewModal';

interface WellnessProduct extends QuickViewProductData {
  id: string;
  title: string;
  badge?: string;
  saleBadge?: string;
  price: string;
  oldPrice?: string;
  comparePrice?: string;
  img: string;
  galleryImages: string[];
  flavors: string[];
  quantityTypes: string[];
  link: string;
  numericPrice: number;
  isSoldOut?: boolean;
}

const leftProducts: WellnessProduct[] = [
  {
    id: 'well-1',
    name: 'Al Fakher crown bar ultra 25000 puff 5mg in UAE',
    title: 'Al Fakher crown bar ultra 25000 puff 5mg in UAE',
    badge: '10% OFF',
    saleBadge: '-10%',
    price: 'Dhs. 45.00',
    priceFormatted: 'Dhs. 45.00',
    oldPrice: 'Dhs. 50.00',
    comparePrice: 'Dhs. 50.00',
    img: '/images/products/wellness-alfakher-ultra-25k.png',
    galleryImages: [
      '/images/products/quickview/ultra-25k-main.png',
      '/images/products/quickview/ultra-25k-lemon-mint.png',
      '/images/products/quickview/ultra-25k-lush-ice.png',
      '/images/products/quickview/ultra-25k-mango-pineapple.png',
      '/images/products/quickview/ultra-25k-mint.png',
      '/images/products/quickview/ultra-25k-mixed-berry.png',
    ],
    flavors: [
      'HUBBA',
      'MIXED BERRY',
      'BLUEBERRY LEMONADE',
      'BLUE RAZZ LEMONADE',
    ],
    quantityTypes: ['1Pc/1Device', '10Pc/1Box'],
    link: '/products/buy-al-fakher-crown-bar-ultra-25000-puff-5mg-in-uae',
    numericPrice: 45,
    isSoldOut: true, // as in user screenshot media_1793853153591_5873506f.jpg
  },
  {
    id: 'well-2',
    name: 'Al Fakher Crown Bar E Hose X 60000 puff 6mg vape',
    title: 'Al Fakher Crown Bar E Hose X 60000 puff 6mg vape',
    badge: '8% OFF',
    saleBadge: '-8%',
    price: 'Dhs. 55.00',
    priceFormatted: 'Dhs. 55.00',
    oldPrice: 'Dhs. 60.00',
    comparePrice: 'Dhs. 60.00',
    img: '/images/products/wellness-alfakher-ehose-60k.png',
    galleryImages: [
      '/images/products/quickview/ehose-60k-main.png',
      '/images/products/quickview/ehose-60k-bluerazz.png',
      '/images/products/quickview/ehose-60k-cherry.png',
      '/images/products/quickview/ehose-60k-grape.png',
    ],
    flavors: [
      'Blue Razz Lemonade',
      'Cherry Fiesta',
      'Grape',
      'Lemon Mint',
      'Mango Pineapple',
      'Mixed Berry',
      'Peach ice',
      'Watermelon Cherry',
      'Berry Ice',
      'Cool Mango',
      'Grape Mint',
      'Gum Mint',
      'Space Dream',
      'Strawberry Cherry',
      'Strawberry Punch',
      'Watermelon Kiwi',
    ],
    quantityTypes: ['1Pc/1Device', '5pc/1Box'],
    link: '/products/buy-al-fakher-crown-bar-e-hose-x-60000-puff-6mg-vape',
    numericPrice: 55,
    isSoldOut: false,
  },
  {
    id: 'well-3',
    name: 'Elf bar Raya D3 25k Puffs Disposable Vape 50mg in UAE',
    title: 'Elf bar Raya D3 25k Puffs Disposable Vape 50mg in UAE',
    badge: '10% OFF',
    saleBadge: '-10%',
    price: 'Dhs. 45.00',
    priceFormatted: 'Dhs. 45.00',
    oldPrice: 'Dhs. 50.00',
    comparePrice: 'Dhs. 50.00',
    img: '/images/products/wellness-elfbar-raya-d3.png',
    galleryImages: [
      '/images/products/quickview/raya-d3-main.png',
      '/images/products/quickview/raya-d3-blueberry-ice.png',
      '/images/products/quickview/raya-d3-mint.png',
      '/images/products/quickview/raya-d3-mango-peach.png',
    ],
    flavors: [
      'Blueberry Ice',
      'Blueberry Raspberry',
      'Double Apple',
      'Grape Ice',
      'Kiwi Passionfruit Guava',
      'Mango',
      'Mango Peach',
      'Peach Berry',
      'Peach ice',
      'Watermelon Bubble Gum',
      'Watermelon Ice',
      'Alpine Mint',
      'Arabica Coffee',
      'Double Mango',
      'Grape Cherry',
      'Kiwi Pineapple',
      'Mango Peach Watermelon',
      'Strawberry Grape',
      'Watermelon Lemon',
    ],
    quantityTypes: ['1Pc/1Device', '10Pc/1Box'],
    link: '/products/buy-elf-bar-raya-d3-25000-puffs-disposable-vape-50mg-in-uae',
    numericPrice: 45,
    isSoldOut: false,
  },
];

const rightProducts: WellnessProduct[] = [
  {
    id: 'well-4',
    name: 'Al Fakher 30mg Salt Nicotine E Liquid 30ml in UAE',
    title: 'Al Fakher 30mg Salt Nicotine E Liquid 30ml in UAE',
    badge: '22% OFF',
    saleBadge: '-22%',
    price: 'Dhs. 35.00',
    priceFormatted: 'Dhs. 35.00',
    oldPrice: 'Dhs. 45.00',
    comparePrice: 'Dhs. 45.00',
    img: '/images/products/wellness-alfakher-salt-nic.png',
    galleryImages: [
      '/images/products/quickview/salt-nic-main.png',
    ],
    flavors: [
      'Menthol',
      'Blue Razz Lemonade',
      'Blueberry Raspberry',
      'Lemon Mint',
      'Lush Ice',
      'Mango Pineapple',
      'Mixed Berries',
      'Peach ice',
      'Pineapple Ice',
      'Spearmint',
      'Blackcurrant Ice',
      'Blueberry Gum',
      'Cherry Fiesta',
      'Cherry Ice',
      'Cool Mango',
      'Grape Mint',
      'Gum Mint',
      'Lemon Lime',
      'Magic Love',
      'Strawberry Punch',
      'Two Apple',
      'Watermelon Lime',
    ],
    quantityTypes: ['1Pc/1Device'],
    link: '/products/al-fakher-salt-nicotine-30mg-e-liquid',
    numericPrice: 35,
    isSoldOut: false,
  },
  {
    id: 'well-5',
    name: 'Elf bar Ice King Pro 40k Puffs 50mg Disposable Vape in UAE',
    title: 'Elf bar Ice King Pro 40k Puffs 50mg Disposable Vape in UAE',
    badge: '4% OFF',
    saleBadge: '-4%',
    price: 'Dhs. 48.00',
    priceFormatted: 'Dhs. 48.00',
    oldPrice: 'Dhs. 50.00',
    comparePrice: 'Dhs. 50.00',
    img: '/images/products/wellness-elfbar-ice-king.png',
    galleryImages: [
      '/images/products/quickview/ice-king-main.png',
      '/images/products/quickview/ice-king-assam-tea.png',
      '/images/products/quickview/ice-king-cola-ice.png',
    ],
    flavors: [
      'Assam Tea',
      'Cola Ice',
      'Kiwi Passion Fruit Guava',
      'Rose Mojito',
      'Taro Ice Cream',
      'Watermelon Ice',
      'Blue Razz Ice',
      'Double Apple',
      'Mango Ice',
      'Strawberry Kiwi',
      'Peach Mango',
    ],
    quantityTypes: ['1Pc/1Device', '10Pc/1Box'],
    link: '/products/buy-elf-bar-ice-king-pro-40000-puffs-50mg-disposable-vape-in-uae',
    numericPrice: 48,
    isSoldOut: false,
  },
  {
    id: 'well-6',
    name: 'Waka Blade 50000 puffs 50mg Nicotine Adjustable vape in UAE',
    title: 'Waka Blade 50000 puffs 50mg Nicotine Adjustable vape in UAE',
    badge: '9% OFF',
    saleBadge: '-9%',
    price: 'Dhs. 50.00',
    priceFormatted: 'Dhs. 50.00',
    oldPrice: 'Dhs. 55.00',
    comparePrice: 'Dhs. 55.00',
    img: '/images/products/wellness-waka-blade-50k.png',
    galleryImages: [
      '/images/products/quickview/waka-blade-main.png',
      '/images/products/quickview/waka-blade-banana-ice.png',
      '/images/products/quickview/waka-blade-cranberry.png',
    ],
    flavors: [
      'Banana Ice',
      'Blue Razz Blackberry',
      'Blueberry Ice',
      'Cranberry Cherry',
      'Double Apple',
      'Dark Cherry',
      'Kiwi Passion Fruit Guava',
      'Mango Ice',
      'Mango Peach Watermelon',
      'Miami Mint',
      'Peach Ice',
      'Pineapple Passion Fruit',
      'Pistachios Delight',
      'Sakura Grape',
      'Strawberry Banana',
    ],
    quantityTypes: ['1Pc/1Device'],
    link: '/products/buy-waka-blade-50000-puffs-50mg-nicotine-adjustable-vape-in-uae',
    numericPrice: 50,
    isSoldOut: false,
  },
];

export const WellnessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<WellnessProduct | null>(null);

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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`wellness-products ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="page-width max-w-[1496px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="wellness-grid">
          
          {/* Promo Card */}
          <div className="promo-card">
            <span className="promo-badge">Featured</span>

            <div className="promo-img-wrapper">
              <div className="promo-img-ring" />
              <Image
                src="/images/banners/wellness-promo-logo.png"
                alt="Your Vibe. Your Flavor."
                width={170}
                height={170}
                className="promo-img"
                priority
              />
            </div>

            <h3 className="promo-heading whitespace-nowrap">Your Vibe. Your Flavor.</h3>
            <p className="promo-text"></p>

            <Link href="/shop" className="explore-btn">
              <span>Explore</span>
              <span className="arrow-icon">→</span>
            </Link>
          </div>

          {/* Products (2 Columns of 3) */}
          <div className="products-wrapper">
            
            {/* Column 1 */}
            <div className="product-group">
              <div className="product-list">
                {leftProducts.map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="product-card"
                      onClick={() => (window.location.href = p.link)}
                    >
                      <Link
                        href={p.link}
                        className="product-card__img-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="img-wrap">
                          <Image
                            src={p.img}
                            alt={p.title}
                            width={76}
                            height={76}
                            className="object-contain"
                          />
                        </div>
                      </Link>

                      <div className="info">
                        {p.badge && <span className="sale-badge">{p.badge}</span>}
                        <h4>
                          <Link href={p.link} onClick={(e) => e.stopPropagation()}>
                            {p.title}
                          </Link>
                        </h4>
                        <div className="price">
                          <span className="new">{p.price}</span>
                          {p.oldPrice && <span className="old">{p.oldPrice}</span>}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="add-btn wellness-atc"
                        data-vap-qv-open={p.id}
                        aria-label={`Quick view: ${p.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setQuickViewProduct(p);
                        }}
                      >
                        <span className="watc-plus">+</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Column 2 */}
            <div className="product-group">
              <div className="product-list">
                {rightProducts.map((p) => {
                  return (
                    <div
                      key={p.id}
                      className="product-card"
                      onClick={() => (window.location.href = p.link)}
                    >
                      <Link
                        href={p.link}
                        className="product-card__img-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="img-wrap">
                          <Image
                            src={p.img}
                            alt={p.title}
                            width={76}
                            height={76}
                            className="object-contain"
                          />
                        </div>
                      </Link>

                      <div className="info">
                        {p.badge && <span className="sale-badge">{p.badge}</span>}
                        <h4>
                          <Link href={p.link} onClick={(e) => e.stopPropagation()}>
                            {p.title}
                          </Link>
                        </h4>
                        <div className="price">
                          <span className="new">{p.price}</span>
                          {p.oldPrice && <span className="old">{p.oldPrice}</span>}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="add-btn wellness-atc"
                        data-vap-qv-open={p.id}
                        aria-label={`Quick view: ${p.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          setQuickViewProduct(p);
                        }}
                      >
                        <span className="watc-plus">+</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
