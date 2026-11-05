'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

interface WellnessProduct {
  id: string;
  title: string;
  badge?: string;
  price: string;
  oldPrice?: string;
  img: string;
  link: string;
  numericPrice: number;
}

const leftProducts: WellnessProduct[] = [
  {
    id: 'well-1',
    title: 'Al Fakher crown bar ultra 25000 puff 5mg in UAE',
    badge: '10% OFF',
    price: 'Dhs. 45.00',
    oldPrice: 'Dhs. 50.00',
    img: '/images/products/wellness-alfakher-ultra-25k.png',
    link: '/products/buy-al-fakher-crown-bar-ultra-25000-puff-5mg-in-uae',
    numericPrice: 45,
  },
  {
    id: 'well-2',
    title: 'Al Fakher Crown Bar E Hose X 60000 puff 6mg vape',
    price: 'Dhs. 55.00',
    img: '/images/products/wellness-alfakher-ehose-60k.png',
    link: '/products/buy-al-fakher-crown-bar-e-hose-x-60000-puff-6mg-vape',
    numericPrice: 55,
  },
  {
    id: 'well-3',
    title: 'Elf bar Raya D3 25k Puffs Disposable Vape 50mg in UAE',
    badge: '10% OFF',
    price: 'Dhs. 45.00',
    oldPrice: 'Dhs. 50.00',
    img: '/images/products/wellness-elfbar-raya-d3.png',
    link: '/products/buy-elf-bar-raya-d3-25000-puffs-disposable-vape-50mg-in-uae',
    numericPrice: 45,
  },
];

const rightProducts: WellnessProduct[] = [
  {
    id: 'well-4',
    title: 'Al Fakher 30mg Salt Nicotine E Liquid 30ml in UAE',
    badge: '22% OFF',
    price: 'Dhs. 35.00',
    oldPrice: 'Dhs. 45.00',
    img: '/images/products/wellness-alfakher-salt-nic.png',
    link: '/products/al-fakher-salt-nicotine-30mg-e-liquid',
    numericPrice: 35,
  },
  {
    id: 'well-5',
    title: 'Elf bar Ice King Pro 40k Puffs 50mg Disposable Vape in UAE',
    badge: '4% OFF',
    price: 'Dhs. 48.00',
    oldPrice: 'Dhs. 50.00',
    img: '/images/products/wellness-elfbar-ice-king.png',
    link: '/products/buy-elf-bar-ice-king-pro-40000-puffs-50mg-disposable-vape-in-uae',
    numericPrice: 48,
  },
  {
    id: 'well-6',
    title: 'Waka Blade 50000 puffs 50mg Nicotine Adjustable vape in UAE',
    badge: '9% OFF',
    price: 'Dhs. 50.00',
    oldPrice: 'Dhs. 55.00',
    img: '/images/products/wellness-waka-blade-50k.png',
    link: '/products/buy-waka-blade-50000-puffs-50mg-nicotine-adjustable-vape-in-uae',
    numericPrice: 50,
  },
];

export const WellnessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});
  const { addToCart } = useCart();

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
      { threshold: 0.08 }
    );

    observer.observe(el);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const handleAddProduct = (p: WellnessProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    addToCart(
      {
        id: p.id,
        name: p.title,
        handle: p.link.replace('/products/', ''),
        price: p.numericPrice,
        priceFormatted: p.price,
        rating: 5,
        reviewsCount: 45,
        image: p.img,
        category: 'Disposable Vape',
        brand: p.title.split(' ')[0],
        inStock: true,
        flavors: ['Default Flavor'],
        description: p.title,
      },
      1,
      'Default Flavor'
    );

    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1800);
  };

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
                  const isAdded = addedIds[p.id];
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
                        className={`add-btn wellness-atc ${isAdded ? 'is-added' : ''}`}
                        aria-label={`Add to cart: ${p.title}`}
                        onClick={(e) => handleAddProduct(p, e)}
                      >
                        <span className="watc-plus">+</span>
                        <span className="watc-check">✓</span>
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
                  const isAdded = addedIds[p.id];
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
                        className={`add-btn wellness-atc ${isAdded ? 'is-added' : ''}`}
                        aria-label={`Add to cart: ${p.title}`}
                        onClick={(e) => handleAddProduct(p, e)}
                      >
                        <span className="watc-plus">+</span>
                        <span className="watc-check">✓</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

