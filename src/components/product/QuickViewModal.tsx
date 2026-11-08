'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

export interface QuickViewProductData {
  id: string;
  name: string;
  title?: string;
  handle?: string;
  priceFormatted?: string;
  price?: string | number;
  originalPriceFormatted?: string;
  comparePriceFormatted?: string;
  comparePrice?: string | number;
  savingsFormatted?: string;
  badge?: string;
  saleBadge?: string;
  image?: string;
  img?: string;
  images?: string[];
  altImage?: string;
  galleryImages?: string[];
  flavors?: string[];
  quantityTypes?: string[];
  isOutOfStock?: boolean;
  isSoldOut?: boolean;
  inStock?: boolean;
  link?: string;
  numericPrice?: number;
  rating?: number;
  reviewsCount?: number;
  description?: string;
  category?: string;
  brand?: string;
}

interface QuickViewModalProps {
  product: QuickViewProductData | Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedQuantityType, setSelectedQuantityType] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  // Parse product attributes
  const p = product as any;
  const title = p ? (p.name || p.title || '') : '';
  const handle = p ? (p.handle || (p.link ? p.link.replace('/products/', '') : '')) : '';
  const link = p?.link || (handle ? `/products/${handle}` : '#');
  const isSoldOut = Boolean(p?.isOutOfStock || p?.isSoldOut || (p?.inStock === false));
  
  // Format price cleanly
  let rawPrice = p?.price;
  let priceStr = p?.priceFormatted;
  if (typeof rawPrice === 'number' && rawPrice > 0 && rawPrice < 1) {
    rawPrice = Math.round(rawPrice * 100);
    priceStr = `Dhs. ${rawPrice}.00`;
  }
  if (!priceStr) {
    if (typeof rawPrice === 'number') {
      priceStr = `Dhs. ${rawPrice.toFixed(2)}`;
    } else if (typeof rawPrice === 'string') {
      priceStr = rawPrice.startsWith('Dhs.') ? rawPrice : `Dhs. ${rawPrice}`;
    } else {
      priceStr = 'Dhs. 50.00';
    }
  }
  const currentPrice = priceStr;
    
  let comparePrice = p?.originalPriceFormatted || p?.comparePriceFormatted || 
    (typeof p?.comparePrice === 'string' ? p.comparePrice : '') || 
    (p?.oldPrice ? p.oldPrice : '');
  if (typeof comparePrice === 'number' && comparePrice > 0 && comparePrice < 1) {
    comparePrice = `Dhs. ${(comparePrice * 100).toFixed(2)}`;
  }
    
  const saleBadge = p?.badge || p?.saleBadge || '';

  // Extract images: include gallery, primary, and secondary/alt images
  const rawImages: string[] = [];
  if (p) {
    if (p.galleryImages && Array.isArray(p.galleryImages) && p.galleryImages.length > 0) {
      rawImages.push(...p.galleryImages);
    }
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      rawImages.push(...p.images);
    }
    if (p.image) rawImages.push(p.image);
    if (p.img) rawImages.push(p.img);
    if (p.altImage) rawImages.push(p.altImage);
  }
  const allImages = Array.from(new Set(rawImages.filter(Boolean)));
  if (allImages.length === 0) {
    allImages.push('/images/products/kief-king-main.png');
  }

  // Extract and clean flavors (filter out "Select Flavour" placeholder)
  const rawFlavors: string[] = p?.flavors && Array.isArray(p.flavors) && p.flavors.length > 0 
    ? p.flavors 
    : ['Banana Ice', 'Blueberry Ice', 'Double Apple', 'Watermelon Ice'];
  const validFlavors = rawFlavors.filter((f: string) => f && f.toLowerCase() !== 'select flavour');
  const flavors: string[] = validFlavors.length > 0 ? validFlavors : ['Banana Ice', 'Blueberry Ice'];

  // Extract quantity types (matching 1:1 with vapstall.ae: 1Pc/1Device, 5Pc/1Box)
  const quantityTypes: string[] = p?.quantityTypes && Array.isArray(p.quantityTypes) && p.quantityTypes.length > 0
    ? p.quantityTypes
    : ['1Pc/1Device', '5Pc/1Box'];

  // Initialize selections when product changes
  useEffect(() => {
    if (product) {
      setCurrentSlide(0);
      setSelectedFlavor(flavors[0]);
      setSelectedQuantityType(quantityTypes[0]);
      setIsAdded(false);

      // Trigger animation
      const raf = requestAnimationFrame(() => {
        setIsOpen(true);
        document.body.classList.add('vap-qv-open');
      });

      return () => {
        cancelAnimationFrame(raf);
      };
    } else {
      setIsOpen(false);
      document.body.classList.remove('vap-qv-open');
    }
  }, [product]);

  // Handle ESC and Arrow keys
  useEffect(() => {
    if (!product) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, currentSlide, allImages.length]);

  const handleClose = () => {
    setIsOpen(false);
    document.body.classList.remove('vap-qv-open');
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const prevSlide = () => {
    if (allImages.length <= 1) return;
    setCurrentSlide((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (allImages.length <= 1) return;
    setCurrentSlide((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleSelectFlavor = (flavor: string) => {
    setSelectedFlavor(flavor);
    // Attempt to match flavor keyword to image in gallery
    const keywords = flavor.toLowerCase().replace(/[^a-z0-9]/g, ' ').split(' ').filter(w => w.length > 3);
    if (keywords.length > 0) {
      const matchIdx = allImages.findIndex((img) => {
        const lower = img.toLowerCase();
        return keywords.some((kw) => lower.includes(kw));
      });
      if (matchIdx !== -1) {
        setCurrentSlide(matchIdx);
      }
    }
  };

  const handleAddToCart = () => {
    if (!product || isSoldOut) return;

    const numericPrice = p.numericPrice || 
      (typeof p.price === 'number' ? p.price : parseFloat(String(currentPrice).replace(/[^0-9.]/g, '')) || 50);

    addToCart(
      {
        id: product.id,
        name: title,
        handle: handle || 'product',
        price: numericPrice,
        priceFormatted: currentPrice,
        originalPriceFormatted: comparePrice || undefined,
        rating: p.rating || 5,
        reviewsCount: p.reviewsCount || 50,
        image: allImages[0] || '/images/products/kief-king-main.png',
        category: p.category || 'Disposable Vape',
        brand: p.brand || title.split(' ')[0],
        inStock: !isSoldOut,
        flavors: flavors,
        description: p.description || title,
      },
      1,
      selectedFlavor
    );

    setIsAdded(true);
    setTimeout(() => {
      handleClose();
    }, 900);
  };

  if (!product) return null;

  return (
    <div
      ref={overlayRef}
      className={`vap-qv-overlay is-active ${isOpen ? 'is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === overlayRef.current) {
          handleClose();
        }
      }}
    >
      <div className="vap-qv-modal" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="vap-qv-close"
          aria-label="Close"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="vap-qv-body">
          {/* Gallery Carousel (Circular Pedestal) */}
          <div className="vap-qv-gallery">
            {/* Vape Stall Logo Watermark (Top Right) */}
            <div className="vap-qv-watermark">
              <Image
                src="/images/banners/wellness-promo-logo.png"
                alt="Vape Stall"
                width={42}
                height={42}
                className="object-contain"
              />
            </div>

            {/* Slider track */}
            <div
              className="vap-qv-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {allImages.map((imgSrc, idx) => (
                <div key={idx} className="vap-qv-slide">
                  <Image
                    src={imgSrc}
                    alt={`${title} - view ${idx + 1}`}
                    width={460}
                    height={460}
                    className="object-contain drop-shadow-md"
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>

            {/* Arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="vap-qv-arrow vap-qv-arrow--prev"
                  aria-label="Previous image"
                  onClick={prevSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="vap-qv-arrow vap-qv-arrow--next"
                  aria-label="Next image"
                  onClick={nextSlide}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>

                {/* Dot Pagination */}
                <div className="vap-qv-dots">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`vap-qv-dot ${idx === currentSlide ? 'is-active' : ''}`}
                      aria-label={`Image ${idx + 1}`}
                      onClick={() => setCurrentSlide(idx)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Product Info */}
          <div className="vap-qv-info">
            {/* Title */}
            <h2 className="vap-qv-title">{title}</h2>

            {/* Price Wrap */}
            <div className="vap-qv-price-wrap">
              {comparePrice && (
                <span className="vap-qv-price--compare">{comparePrice}</span>
              )}
              <span className="vap-qv-price--current">{currentPrice}</span>
              {saleBadge && (
                <span className="vap-qv-badge-sale">
                  {saleBadge.startsWith('-') ? saleBadge : `-${saleBadge.replace(/[^0-9%]/g, '')}`}
                </span>
              )}
            </div>

            {/* Options */}
            <div className="vap-qv-options">
              {/* Flavor Selector */}
              {flavors.length > 0 && (
                <div className="vap-qv-option-group">
                  <p className="vap-qv-option-label">
                    FLAVOUR: <span className="vap-qv-option-selected">{selectedFlavor}</span>
                  </p>
                  <div className="vap-qv-option-values max-h-[170px] overflow-y-auto pr-1">
                    {flavors.map((flavor) => {
                      const isSelected = selectedFlavor === flavor;
                      return (
                        <button
                          key={flavor}
                          type="button"
                          className={`vap-qv-opt-btn ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => handleSelectFlavor(flavor)}
                        >
                          {flavor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Type Selector */}
              {quantityTypes.length > 0 && (
                <div className="vap-qv-option-group">
                  <p className="vap-qv-option-label">
                    QUANTITY TYPE: <span className="vap-qv-option-selected">{selectedQuantityType}</span>
                  </p>
                  <div className="vap-qv-option-values">
                    {quantityTypes.map((qty) => {
                      const isSelected = selectedQuantityType === qty;
                      return (
                        <button
                          key={qty}
                          type="button"
                          className={`vap-qv-opt-btn ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => setSelectedQuantityType(qty)}
                        >
                          {qty}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart / Sold out Button */}
            <button
              type="button"
              className="vap-qv-atc-btn"
              disabled={isSoldOut}
              onClick={handleAddToCart}
            >
              <span>
                {isSoldOut ? 'Sold out' : isAdded ? 'Added to cart ✓' : 'Add to cart'}
              </span>
            </button>

            {/* View Full Details Link */}
            <Link href={link} onClick={handleClose} className="vap-qv-view-link">
              View full details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
