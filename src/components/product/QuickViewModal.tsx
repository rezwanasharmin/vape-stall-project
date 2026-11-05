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
  comparePrice?: string;
  savingsFormatted?: string;
  badge?: string;
  saleBadge?: string;
  image?: string;
  img?: string;
  images?: string[];
  galleryImages?: string[];
  flavors?: string[];
  quantityTypes?: string[];
  isOutOfStock?: boolean;
  isSoldOut?: boolean;
  link?: string;
  numericPrice?: number;
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
  const title = p ? (p.title || p.name || '') : '';
  const handle = p ? (p.handle || (p.link ? p.link.replace('/products/', '') : '')) : '';
  const link = p?.link || (handle ? `/product/${handle}` : '#');
  const isSoldOut = Boolean(p?.isOutOfStock || p?.isSoldOut);
  
  const currentPrice = p?.priceFormatted || 
    (typeof p?.price === 'string' ? p.price : (p?.price ? `Dhs. ${p.price}.00` : ''));
    
  const comparePrice = p?.originalPriceFormatted || p?.comparePrice || '';
  const saleBadge = p?.saleBadge || p?.badge || '';

  // Extract images
  const allImages: string[] = [];
  if (p) {
    if (p.galleryImages && p.galleryImages.length > 0) {
      allImages.push(...p.galleryImages);
    } else if (p.images && p.images.length > 0) {
      allImages.push(...p.images);
    } else if (p.image) {
      allImages.push(p.image);
    } else if (p.img) {
      allImages.push(p.img);
    }
  }

  // Extract flavors
  const flavors: string[] = p?.flavors && p.flavors.length > 0 
    ? p.flavors 
    : ['Default Flavor'];

  // Extract quantity types
  const quantityTypes: string[] = p?.quantityTypes && p.quantityTypes.length > 0
    ? p.quantityTypes
    : ['1Pc/1Device'];

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

  const handleAddToCart = () => {
    if (!product || isSoldOut) return;

    const numericPrice = p.numericPrice || 
      (typeof p.price === 'number' ? p.price : parseFloat(String(currentPrice).replace(/[^0-9.]/g, '')) || 45);

    addToCart(
      {
        id: product.id,
        name: title,
        handle: handle || 'product',
        price: numericPrice,
        priceFormatted: currentPrice,
        rating: 5,
        reviewsCount: 45,
        image: allImages[0] || '/images/products/wellness-alfakher-ultra-25k.png',
        category: 'Disposable Vape',
        brand: title.split(' ')[0],
        inStock: true,
        flavors: [selectedFlavor],
        description: title,
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
          {/* Gallery Carousel */}
          <div className="vap-qv-gallery">
            {/* Vape Stall Logo Watermark */}
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
                    className="object-contain"
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
                    FLAVOR: <span className="vap-qv-option-selected">{selectedFlavor}</span>
                  </p>
                  <div className="vap-qv-option-values">
                    {flavors.map((flavor) => {
                      const isSelected = selectedFlavor === flavor;
                      return (
                        <button
                          key={flavor}
                          type="button"
                          className={`vap-qv-opt-btn ${isSelected ? 'is-selected' : ''}`}
                          onClick={() => setSelectedFlavor(flavor)}
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
