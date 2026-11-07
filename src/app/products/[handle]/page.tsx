'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from 'lucide-react';
import { products } from '@/data/products';
import { shopProducts } from '@/data/shopProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';
import { FAQSection } from '@/components/home/FAQSection';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawHandle = (params?.handle as string) || '';
  const decodedHandle = decodeURIComponent(rawHandle).trim().toLowerCase();
  const slugifiedHandle = decodedHandle.replace(/[\s_]+/g, '-');

  // Find product across both product sources
  const allProducts = [...products, ...shopProducts];
  const product =
    allProducts.find((p) => {
      const pHandle = (p.handle || '').toLowerCase();
      const pSlug = pHandle.replace(/[\s_]+/g, '-');
      return (
        pHandle === rawHandle.toLowerCase() ||
        pHandle === decodedHandle ||
        pSlug === slugifiedHandle ||
        pSlug === slugifiedHandle.replace(/^buy-/, '') ||
        `buy-${pSlug}` === slugifiedHandle
      );
    }) ||
    allProducts.find((p) => {
      const pSlug = (p.handle || '').toLowerCase().replace(/[\s_]+/g, '-');
      const pName = (p.name || '').toLowerCase();
      return (
        pSlug.includes(slugifiedHandle) ||
        slugifiedHandle.includes(pSlug) ||
        pName.includes(decodedHandle) ||
        decodedHandle.includes(pName)
      );
    }) ||
    products[0];

  const isVozol =
    product.handle?.includes('vozol-star-40000') ||
    product.name?.toLowerCase().includes('vozol star');

  const isKiefKing =
    product.handle?.includes('kief-king-35000') ||
    product.name?.toLowerCase().includes('kief king');

  const isMyle =
    product.handle?.includes('myle-meta-max') ||
    product.name?.toLowerCase().includes('myle meta max');

  const { addToCart, setIsCartOpen } = useCart();

  // Dynamic gallery images
  const vozolGallery = [
    '/images/products/vozol-star-main.png',
    '/images/products/vozol-star-blueberry-ice.png',
    '/images/products/vozol-star-blueberry-watermelon.png',
    '/images/products/vozol-star-coolmint.png',
    '/images/products/vozol-star-mango-ice.png',
    '/images/products/vozol-star-peach-ice.png',
    '/images/products/vozol-star-strawberry-kiwi.png',
  ];

  const kiefKingGallery = [
    '/images/products/kief-king-main.png',
    '/images/products/kief-king-cola-lime-flv.png',
    '/images/products/kief-king-grape.png',
    '/images/products/kief-king-gum-mint.png',
    '/images/products/kief-king-lemon-lime.png',
    '/images/products/kief-king-strawberry.png',
    '/images/products/kief-king-watermelon.png',
  ];

  const myleGallery = [
    '/images/products/myle-meta-max-18000.png',
    '/images/products/myle-meta-max-frozen-mango.png',
    '/images/products/buy-myle-meta-max-18000-puff-50mg-disposable-vape-in-uae.png',
    '/images/products/buy-myle-meta-max-18000-puff-50mg-disposable-vape-in-uae-alt.png',
  ];

  const gallery = isVozol
    ? vozolGallery
    : isMyle
    ? myleGallery
    : isKiefKing
    ? kiefKingGallery
    : product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : kiefKingGallery;

  const [selectedImage, setSelectedImage] = useState<string>(gallery[0] || product.image);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Select Flavour');
  const [quantityType, setQuantityType] = useState<'1pc' | '5pc'>('1pc');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'shipping'>('description');
  const [isWaModalOpen, setIsWaModalOpen] = useState<boolean>(false);
  const [waCity, setWaCity] = useState<string>('Dubai');
  const [waAddress, setWaAddress] = useState<string>('');
  const [showStickyAtc, setShowStickyAtc] = useState<boolean>(false);
  const [showZoomModal, setShowZoomModal] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // When product changes, reset selected image to the first in gallery
  useEffect(() => {
    setSelectedImage(gallery[0] || product.image);
    setCurrentSlideIndex(0);
    setSelectedFlavor('Select Flavour');
  }, [product.id, isVozol]);

  // Pricing
  const unitPrice = quantityType === '1pc' ? product.price : product.price * 5 - 10;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  // Sticky Add-To-Cart trigger
  const buyRowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!buyRowRef.current) return;
      const rect = buyRowRef.current.getBoundingClientRect();
      setShowStickyAtc(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Flavor to image mapping
  const flavorImageMap: Record<string, string> = isVozol
    ? {
        'Blueberry Ice': '/images/products/vozol-star-blueberry-ice.png',
        'Blueberry Watermelon': '/images/products/vozol-star-blueberry-watermelon.png',
        'Cool Mint': '/images/products/vozol-star-coolmint.png',
        'Mango Ice': '/images/products/vozol-star-mango-ice.png',
        'Peach Ice': '/images/products/vozol-star-peach-ice.png',
        'Strawberry Kiwi': '/images/products/vozol-star-strawberry-kiwi.png',
      }
    : {
        'Cola Lime': '/images/products/kief-king-cola-lime-flv.png',
        'Grape': '/images/products/kief-king-grape.png',
        'Gum Mint': '/images/products/kief-king-gum-mint.png',
        'Lemon Lime': '/images/products/kief-king-lemon-lime.png',
        'Strawberry': '/images/products/kief-king-strawberry.png',
        'Watermelon': '/images/products/kief-king-watermelon.png',
      };

  const handleFlavorChange = (flavor: string) => {
    setSelectedFlavor(flavor);
    if (flavorImageMap[flavor]) {
      setSelectedImage(flavorImageMap[flavor]);
    }
  };

  const handlePrevThumb = () => {
    const nextIdx = currentSlideIndex > 0 ? currentSlideIndex - 1 : gallery.length - 1;
    setCurrentSlideIndex(nextIdx);
    setSelectedImage(gallery[nextIdx]);
  };

  const handleNextThumb = () => {
    const nextIdx = currentSlideIndex < gallery.length - 1 ? currentSlideIndex + 1 : 0;
    setCurrentSlideIndex(nextIdx);
    setSelectedImage(gallery[nextIdx]);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
      },
      quantity,
      `${selectedFlavor !== 'Select Flavour' ? selectedFlavor : 'Default'} (${quantityType === '1pc' ? '1Pc/1Device' : '5Pc/1Box'})`
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const executeWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello Vape Stall UAE!\nI would like to order:\n- Product: ${product.name}\n- Flavor: ${selectedFlavor}\n- Pack: ${quantityType === '1pc' ? '1Pc/1Device' : '5Pc/1Box'}\n- Quantity: ${quantity}\n- Total Price: Dhs. ${totalPrice}\n- Emirate: ${waCity}\n- Delivery Address: ${waAddress || 'Dubai'}\n\nPlease confirm availability and delivery time.`
    );
    window.open(`https://wa.me/971551688299?text=${message}`, '_blank');
    setIsWaModalOpen(false);
  };

  // Vozol Star 24 flavors
  const vozolFlavorsList: [string, string][] = [
    ['Blueberry Ice', 'Sweet blueberry with a blast of icy coolness.'],
    ['Bluerazz Ice', 'Sharp blue raspberry with a chill.'],
    ['Cool Mint', 'Fresh minty freshness, clean exhale.'],
    ['Grape Ice', 'A strong grape taste with a cool finish.'],
    ['Mango Ice', 'Tropical mango richness with a chilled undertone.'],
    ['Mango Peach', 'Tropical mango blended with juicy peach.'],
    ['Peach Ice', 'Smooth rounded peach with icy coolness.'],
    ['Strawberry Ice', 'Classic strawberry with a cool finish.'],
    ['Strawberry Kiwi', 'Sweet strawberry paired with tight kiwi.'],
    ['Strawberry Watermelon', 'Juicy strawberry, crunchy watermelon.'],
    ['Tobacco', 'Classic tobacco delivery, smooth.'],
    ['Watermelon Ice', 'Crisp watermelon with a blast of icy coolness.'],
    ['Blueberry Mint', 'Sweet blueberry with refreshing mint.'],
    ['Blueberry Watermelon', 'Juicy fruit combo with sweetness in harmony.'],
    ['Cherry Cola', 'Cola with a hint of cherry.'],
    ['Cherimoya Grapefruit Berries', 'Exotic fruit blend with a tangy berry finish.'],
    ['Melon Gum', 'Sweet melon candy-like chewiness.'],
    ['Melon Ice', 'Exotic melon with cool undertones.'],
    ['Sour Apple Ice', 'Tart apple with a cool exhale.'],
    ['Streamelon Peach', 'Melon and Peach combined for a smooth finish.'],
    ['Watermelon Bubblegum', 'Sweet bubblegum with a watermelon taste.'],
    ['Watermelon Grape Boysenberry', 'Boldly satisfying complex fruit trio.'],
    ['Watermelon Raspberry', 'Juicy watermelon and tart raspberry.'],
    ['Watermelon Sour Peach', 'Peach combined with a sweet and sour flavor of watermelon.'],
  ];

  // Vozol Star specs table
  const vozolSpecsTable: [string, string][] = [
    ['Puff Count', 'Up to 40,000 puffs'],
    ['Nicotine Strength', '20mg nicotine salt'],
    ['Battery Capacity', 'Built-in rechargeable 850mAh battery'],
    ['Charging System', 'USB Type-C fast charging'],
    ['Coil Type', 'Advanced Dual Mesh coil architecture'],
    ['Airflow', 'Variable draw resistance control system'],
    ['Vaping Style', 'MTL (Mouth to Lung) performance'],
    ['Display', 'LED smart screen tracking battery life and e-liquid indicators'],
    ['Activation', 'Simple draw-activated (inhale activation) mechanism'],
  ];

  // Kief King 17 flavors
  const kiefKingFlavorsList: [string, string][] = [
    ['Double Apple', 'Traditional red & green apple shisha flavor.'],
    ['Gum Mint', 'Sweet bubblegum freshness with cooling spearmint.'],
    ['Cola Lime', 'Fizzy cola uplifted by citrus lime.'],
    ['Mango', 'Tropical ripe mango with smooth inhale.'],
    ['Strawberry', 'Sweet single fruit strawberry like taste.'],
    ['Watermelon', 'The flavor of pure, ripe watermelon.'],
    ['Blueberry Raspberry', 'Tart blueberry and raspberry fusion.'],
    ['Strawberry Banana', 'Ripe strawberry like and creamy bananas'],
    ['Watermelon Strawberry', 'Crisp watermelon blended with sweet strawberry.'],
    ['Peach Ice', 'Juicy peach rounded off with menthol chill.'],
    ['Lemon Lime', 'Sharp citrus duo with refreshing burst.'],
    ['Love 66', 'Iconic shisha mix of watermelon, honeydew, passion fruit & mint.'],
    ['Lady Killer', 'Tropical mango and melon fusion with cooling finish.'],
    ['Dubai Pistachio', 'Creamy pistachio dessert profile.'],
    ['Lychee Ice', 'Exotic lychee sweetness with icy coolness.'],
    ['Hydro Energy', 'Bold energy drink flavor with tangy kick.'],
    ['Grape', 'Rich purple grape sweetness with bold clouds.'],
  ];

  // Kief King specs table
  const kiefKingSpecsTable: [string, string][] = [
    ['Puff Count', 'Up to 35,000 puffs'],
    ['Nicotine Strength', '3mg (0.3%)'],
    ['E‑Liquid Capacity', 'Prefilled reservoir'],
    ['Battery', '1100mAh internal rechargeable battery'],
    ['Charging System', 'USB Type-C fast charging'],
    ['Coil Type', 'Advanced Mesh coil technology'],
    ['Vaping Style', 'DTL (Direct to Lung) performance'],
    ['Design', 'Leak‑proof, compact, and highly portable architecture'],
    ['Activation', 'Simple draw-activated (inhale) mechanism'],
    ['Safety Features', 'Short-circuit protection, overcharge safeguards, and leak-proof engineering'],
  ];

  // Myle Meta Max 12 flavors
  const myleFlavorsList: [string, string][] = [
    ['Frozen Mango', 'Sweet tropical mango chilled with arctic ice.'],
    ['Blueberry Ice', 'Sweet wild blueberries rounded off with frosty menthol.'],
    ['Watermelon Ice', 'Crisp juicy watermelon infused with an icy breeze.'],
    ['Strawberry Kiwi', 'Sweet ripe strawberries blended with tangy kiwi.'],
    ['Double Mint', 'Intense cool spearmint and peppermint burst.'],
    ['Grape Ice', 'Lush dark concord grapes with cooling sensation.'],
    ['Miami Mint', 'Refreshing citrus mint inspired by Miami beaches.'],
    ['Sweet Peach', 'Sun-ripened juicy peach sweetness.'],
    ['Red Apple', 'Crisp and sweet freshly picked red apples.'],
    ['Pink Lemonade', 'Zesty lemons mixed with sweet summer berries.'],
    ['Sweet Tobacco', 'Rich earthy tobacco softened with subtle sweet notes.'],
    ['Cuban Tobacco', 'Robust authentic Cuban cigar blend with aromatic smoke.'],
  ];

  // Myle Meta Max specs table
  const myleSpecsTable: [string, string][] = [
    ['Puff Count', 'Up to 18,000 puffs'],
    ['Nicotine Strength', '50mg (5%) salt nicotine'],
    ['E‑Liquid Capacity', '18ml prefilled reservoir'],
    ['Battery Capacity', '850mAh internal rechargeable battery'],
    ['Charging System', 'USB Type-C fast charging'],
    ['Coil Type', 'Dual Mesh coil technology'],
    ['Display', 'Integrated LCD smart screen (Battery & E-Liquid)'],
    ['Airflow', 'Adjustable airflow control (MTL & DTL)'],
    ['Activation', 'Simple draw-activated (button-less) mechanism'],
    ['Safety Features', 'Anti-leak architecture, short-circuit protection, overcharge safeguards'],
  ];

  const currentFlavorsList: [string, string][] = isVozol
    ? vozolFlavorsList
    : isMyle
    ? myleFlavorsList
    : kiefKingFlavorsList;

  const currentSpecsTable: [string, string][] = isVozol
    ? vozolSpecsTable
    : isMyle
    ? myleSpecsTable
    : kiefKingSpecsTable;

  const relatedList = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-800 font-sans pb-24">
      
      {/* ========================================================
          1. BREADCRUMBS
         ======================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-5 pb-3">
        <nav className="text-[13px] text-slate-500" aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1.5">
            <li>
              <Link href="/" className="inline-flex items-center gap-1.5 hover:text-[#25406F] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="text-slate-400 font-light">&gt;</li>
            <li>
              <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="hover:text-[#25406F] transition-colors">
                All Disposable
              </Link>
            </li>
            <li className="text-slate-400 font-light">&gt;</li>
            <li className="text-[#1a2b49] font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* ========================================================
          2. MAIN PRODUCT SECTION (WHITE CARD CONTAINER)
         ======================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-2">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#e2e8f0]/90 shadow-[0_2px_16px_rgba(37,64,111,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
            
            {/* LEFT: MEDIA GALLERY */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Image Stage */}
              <div className="relative aspect-square w-full rounded-2xl bg-[#ffffff] flex items-center justify-center p-4 sm:p-6 overflow-hidden group">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Zoom button */}
                <button
                  type="button"
                  onClick={() => setShowZoomModal(true)}
                  aria-label="Zoom image"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#25406F] transition-all shadow-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail Carousel with Left/Right Arrows */}
              <div className="relative flex items-center gap-2 pt-2 px-1">
                <button
                  type="button"
                  onClick={handlePrevThumb}
                  aria-label="Previous image"
                  className="w-7 h-7 flex-shrink-0 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2.5 overflow-x-auto py-1 scrollbar-none flex-1 justify-center">
                  {gallery.map((img, idx) => {
                    const isActive = selectedImage === img;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedImage(img);
                          setCurrentSlideIndex(idx);
                        }}
                        className={`relative w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-lg bg-white border transition-all overflow-hidden p-1 ${
                          isActive
                            ? 'border-2 border-[#25406F] ring-1 ring-[#25406F]/20'
                            : 'border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-contain p-0.5"
                        />
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={handleNextThumb}
                  aria-label="Next image"
                  className="w-7 h-7 flex-shrink-0 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Vendor Eyebrow Badge */}
              <span className="inline-block bg-[#eef3f9] text-[#25406F] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                {product.brand?.toUpperCase() || 'VAPE STALL'}
              </span>

              {/* Title */}
              <h1 className="text-2xl sm:text-[28px] font-bold text-[#1a2b49] leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-[#f59e0b]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  {product.rating ? product.rating.toFixed(1) : '4.8'} ({product.reviewsCount || 57} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#334155] tracking-tight">
                  Dhs. {unitPrice.toFixed(2)}
                </span>
              </div>

              {/* Specification Box (Light blue with orange vertical bar) */}
              <div className="bg-[#f3f6fb] border-l-4 border-[#F5A623] rounded-r-xl p-4 sm:p-5 text-xs text-[#374151] leading-relaxed space-y-1.5 my-2">
                <p className="font-bold text-[#1a2b49] text-[13px] mb-2">
                  {isVozol
                    ? "Vozol Star 40000 Specification's:"
                    : isMyle
                    ? "Myle Meta Max 18000 Specification's:"
                    : isKiefKing
                    ? "Kief King 35000 Specification's:"
                    : `${product.brand || 'Product'} Specification's:`}
                </p>
                {isVozol ? (
                  <ul className="space-y-1 pl-1">
                    <li>• <strong className="font-bold text-[#1a2b49]">Puff Count:</strong> Up to 40,000 puffs</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Nicotine Strength:</strong> 20mg nicotine salt</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">E Liquid:</strong> Pre-filled E-Liquid</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Battery:</strong> Built-in rechargeable 850mAh battery</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Charging system:</strong> USB Type-C Fast charging</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Coil Type:</strong> Advanced Dual Mesh coil architecture</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Airflow:</strong> Variable draw resistance control system</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Vaping Style:</strong> MTL (Mouth to Lung) performance</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Display:</strong> LED smart screen tracking battery life and e-liquid</li>
                  </ul>
                ) : isMyle ? (
                  <ul className="space-y-1 pl-1">
                    <li>• <strong className="font-bold text-[#1a2b49]">Puff Count:</strong> Up to 18,000 puffs</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Nicotine Strength:</strong> 50mg (5%) salt nicotine</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">E Liquid:</strong> 18ml prefilled reservoir</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Battery:</strong> 850mAh rechargeable battery</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Charging system:</strong> USB Type-C fast charging</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Coil Type:</strong> Dual Mesh coil technology</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Display:</strong> LCD smart screen (Battery & E-Liquid)</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Vaping Style:</strong> MTL & DTL adjustable airflow</li>
                  </ul>
                ) : (
                  <ul className="space-y-1 pl-1">
                    <li>• <strong className="font-bold text-[#1a2b49]">Puff Count:</strong> {product.puffs || 'Up to 35,000 puffs'}</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Nicotine Strength:</strong> {product.nicotine || '3mg (0.3%)'}</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">E Liquid:</strong> Prefilled</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Battery:</strong> 1100mAh rechargeable battery</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Charging system:</strong> USB Type-C Fast charging</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Coil Type:</strong> Mesh coil</li>
                    <li>• <strong className="font-bold text-[#1a2b49]">Vaping Style:</strong> DTL(Direct to Lung)</li>
                  </ul>
                )}
              </div>

              {/* Flavor Selector */}
              <div className="space-y-1.5 pt-1">
                <label htmlFor="flavor-select" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  FLAVOUR
                </label>
                <div className="relative">
                  <select
                    id="flavor-select"
                    value={selectedFlavor}
                    onChange={(e) => handleFlavorChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-300 hover:border-[#F5A623] text-slate-700 text-sm rounded-full px-5 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition-colors cursor-pointer shadow-xs"
                  >
                    <option value="Select Flavour">Select Flavour</option>
                    {(product.flavors && product.flavors.length > 0 ? product.flavors : currentFlavorsList.map((f: [string, string]) => f[0]))
                      .filter((f: string) => f !== 'Select Flavour')
                      .map((flavor: string) => (
                        <option key={flavor} value={flavor}>
                          {flavor}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#F5A623]">
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* Quantity Type */}
              <div className="space-y-1.5 pt-1">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  QUANTITY TYPE
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantityType('1pc')}
                    className={`py-2 px-5 rounded-full text-xs font-bold transition-all ${
                      quantityType === '1pc'
                        ? 'border border-[#25406F] bg-[#f0f4fa] text-[#25406F]'
                        : 'border border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    1Pc/1Device
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantityType('5pc')}
                    className={`py-2 px-5 rounded-full text-xs font-bold transition-all ${
                      quantityType === '5pc'
                        ? 'border border-[#25406F] bg-[#f0f4fa] text-[#25406F]'
                        : 'border border-slate-300 bg-white text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    5Pc/1Box
                  </button>
                </div>
              </div>

              {/* Total Price Box */}
              <div className="bg-gradient-to-r from-[#f0f5ff] to-[#e8eef9] border border-[#bdd0f0] rounded-xl p-4 sm:p-5 flex items-center justify-between shadow-xs my-3">
                <div>
                  <span className="block text-xs font-bold text-[#25406F] uppercase tracking-wider">
                    TOTAL PRICE
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Qty × Unit Price
                  </span>
                </div>
                <span className="text-2xl font-black text-[#1a2f52]">
                  Dhs. {totalPrice}
                </span>
              </div>

              {/* Action Buttons Row */}
              <div ref={buyRowRef} className="flex flex-wrap items-center gap-2.5 pt-2">
                
                {/* Stepper */}
                <div className="flex items-center bg-white border border-slate-300 rounded-full h-11 px-2 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-slate-900 select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-7 h-full flex items-center justify-center text-slate-600 hover:text-black transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Buy Now Button (Warm Tan) */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="h-11 px-6 rounded-full bg-[#caa978] hover:bg-[#bd9964] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center"
                >
                  Buy Now
                </button>

                {/* Add to Cart Button (Slate Blue) */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-11 px-6 rounded-full bg-[#6c829d] hover:bg-[#5a6f88] text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors flex items-center justify-center"
                >
                  Add to cart
                </button>

                {/* Order on WhatsApp Button (Mint Green) */}
                <button
                  type="button"
                  onClick={() => setIsWaModalOpen(true)}
                  className="h-11 px-5 rounded-full bg-[#78d69a] hover:bg-[#68c68a] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order on WhatsApp</span>
                </button>
              </div>

              {/* Trust Badges Strip */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-slate-600" />
                  <span>Free Shipping above 350</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-slate-600" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                  <span>Easy Returns</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          3. USP 4-CARD SECTION
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#edf3fa] border border-[#c8d5ec] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <img
                src="/images/icons/delivery-van.svg"
                alt="Free Shipping"
                width="40"
                height="26"
                className="h-7 w-auto object-contain"
              />
            </div>
            <h3 className="text-[#25406F] font-bold text-base mb-1 font-serif">
              Free Shipping
            </h3>
            <p className="text-[#777] text-xs leading-relaxed">
              Terms &amp; Conditions applied for free shipping and delivery
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#edf3fa] border border-[#c8d5ec] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <img
                src="/images/icons/support.svg"
                alt="24x7 Support"
                width="38"
                height="38"
                className="h-8 w-auto object-contain"
              />
            </div>
            <h3 className="text-[#25406F] font-bold text-base mb-1 font-serif">
              24x7 Support
            </h3>
            <p className="text-[#777] text-xs leading-relaxed">
              Round-the-Clock Assistance, Anytime You Need It
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#edf3fa] border border-[#c8d5ec] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <img
                src="/images/icons/parcel-return.svg"
                alt="30 Days Return"
                width="36"
                height="36"
                className="h-8 w-auto object-contain"
              />
            </div>
            <h3 className="text-[#25406F] font-bold text-base mb-1 font-serif">
              30 Days Return
            </h3>
            <p className="text-[#777] text-xs leading-relaxed">
              Your Satisfaction is Our Priority: Return Any Product Within 30 Days
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#edf3fa] border border-[#c8d5ec] rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3">
              <img
                src="/images/icons/secure_payment.png"
                alt="Secure Payment"
                width="36"
                height="36"
                className="h-8 w-auto object-contain"
              />
            </div>
            <h3 className="text-[#25406F] font-bold text-base mb-1 font-serif">
              Secure Payment
            </h3>
            <p className="text-[#777] text-xs leading-relaxed">
              Seamless Shopping Backed by Safe and Secure Payment Options
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================
          4. TABBED SECTION (DESCRIPTION, SPECIFICATION, SHIPPING)
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8">
        
        {/* Tab Headers */}
        <div className="border-b border-[#e5e7eb] mb-8">
          <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-3.5 text-sm sm:text-base transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-[#e59b2d] text-[#1a2b49] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'
              } -mb-[2px]`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specification')}
              className={`pb-3.5 text-sm sm:text-base transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'specification'
                  ? 'border-[#e59b2d] text-[#1a2b49] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'
              } -mb-[2px]`}
            >
              Specification
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`pb-3.5 text-sm sm:text-base transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'border-[#e59b2d] text-[#1a2b49] font-bold'
                  : 'border-transparent text-slate-600 hover:text-slate-900 font-medium'
              } -mb-[2px]`}
            >
              Shipping and Delivery
            </button>
          </div>
        </div>

          {/* TAB 1: DESCRIPTION */}
          {activeTab === 'description' && (
            <div>
              {isVozol ? (
                /* VOZOL STAR 40000 DESCRIPTION */
                <div className="space-y-6 text-[#374151] text-sm leading-relaxed">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-center text-[#25406f]">
                    Buy Vozol Star 40000 puff 20mg nicotine vape in UAE – High Puff, Hassle Free, Everyday Companion
                  </h1>
                  <p>
                    The Vozol Star 40000 Puff Vape in Dubai is built to last longer and designed to enhance flavor with technology. Dual mesh coil heating and adjustable airflow give you a precise experience. The LED smart display shows important information. Plus, the USB-C rechargeable battery ensures convenience with every puff.
                  </p>
                  <p>
                    Buy Vozol Star 40000 puff 20mg nicotine vape in UAE at{' '}
                    <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                      Vape Stall
                    </Link>{' '}
                    with fast shipping cash on delivery and same day delivery across UAE and enjoy authentic performance without compromise.
                  </p>

                  <div className="pt-2">
                    <h2 className="vap-heading-highlight">
                      Product overview
                    </h2>
                    <p>
                      The Vozol Star 40k Puff Vape redefines disposable vaping by combining capacity, control and flavor clarity. It features a dual mesh coil system that enhances flavor, and an adjustable airflow so you can dial in each blend from tight MTL hits to wide open airy clouds.
                    </p>
                    <p className="mt-3">
                      Keep up to date with real‑time battery and e‑liquid levels on the LED smart screen and enjoy uninterrupted sessions with the 850mAh rechargeable battery and USB‑C fast charging. The Star 40K provides a reliable satisfaction that can last for weeks of use with 40,000 puffs and 20mg nicotine strength.
                    </p>
                    <p className="mt-3">
                      What makes it special is how its technology interacts with flavors. Airflow tweaks amplify the coolness of Cool Mint and Watermelon Ice and other cool blends; mesh coil heating adds richness to fruit-forward flavors like Mango Peach and Strawberry Watermelon; and bold flavors like Cherry Cola or Sour Apple Ice show how Vozol 40K lifts daring profiles with smooth, balanced vapor.
                    </p>
                    <p className="mt-3">
                      It’s a flavor-performance platform for the discerning Dubai vapers who want precision, versatility and a flavor journey that evolves with every puff.
                    </p>
                  </div>

                  {/* Available Flavors Section */}
                  <div className="pt-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#25406f] mb-4">
                      Available Flavours
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
                      {vozolFlavorsList.map(([name, desc]: [string, string]) => (
                        <div
                          key={name}
                          onClick={() => handleFlavorChange(name)}
                          className="bg-[#f8faff] border border-[#e2eaf5] hover:border-[#f5a623] hover:shadow-[0_6px_20px_rgba(245,166,35,0.15)] hover:bg-[#fffef8] rounded-xl p-3.5 flex items-start gap-2.5 transition-all duration-200 cursor-pointer shadow-xs group"
                        >
                          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#f5a623] to-[#d4870a] shadow-[0_0_0_3px_rgba(245,166,35,0.18)] mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform"></span>
                          <p className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                            <strong className="font-bold text-[#25406f]">{name}</strong> – {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features & Specifications Table */}
                  <div className="pt-6">
                    <h2 className="vap-heading-highlight">
                      Key Features &amp; Specifications
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#1d335d] text-white">
                            <th className="p-3.5 font-bold w-1/4 text-center">Feature</th>
                            <th className="p-3.5 font-bold w-3/4 text-center">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                          {vozolSpecsTable.map(([feat, det]) => (
                            <tr key={feat}>
                              <td className="p-3 text-center font-bold bg-slate-50">{feat}</td>
                              <td className="p-3 text-center font-semibold">{det}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Why Choose Section (Light-blue cards with dark blue checkmarks) */}
                  <div className="pt-6 space-y-3">
                    <h2 className="vap-heading-highlight">
                      Why choose Vozol Star 40000 Puff Vape
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm">
                      When choosing a vape, think beyond puffs. Focus on creating a reliable, flavorful, and tailored experience for each session. The Vozol Star 40K is designed to push the limits of endurance and pairs the precision of dual mesh coils with adjustable airflow control and intelligent LED monitoring to deliver a vape to fit your style. With smooth nicotine delivery to a bold flavor clarity, Vozol star is made to satisfy the demands of Dubai vapers who want both performance and ease of use.
                    </p>
                    
                    <div className="space-y-2.5 pt-2">
                      {[
                        'Smart LED Screen: Built-in LED screen displays real-time battery life and e-liquid levels. It is an easy but powerful method to keep your vaping experience in your hands.',
                        'Flavor clarity: Dual mesh coil technology brings out the depth and consistency of each flavor, from cooling mint to exotic fruit blends. The coil produces a steady vapor without dry hits, bringing out the richness in each flavor blend.',
                        'Smooth Nicotine Delivery: Star 40K has a smoothness and satisfaction level at 20mg nicotine strength. It is engineered to provide a uniform throat hit that feels natural and consistent throughout all 40,000 puffs.',
                        'Adjustable airflow: A built in airflow slider lets you dial in your draw. If you like a tight MTL draw or a looser, cloudier hit, the Star 40K can be instantly adjusted to your liking.',
                        'Trusted Reliability: This Vozol disposable vape is 100% ESMA compliant. It has leak-proof and safety features. It\'s made to meet UAE quality and performance standards.'
                      ].map((item, i) => (
                        <div key={i} className="bg-[#f0f5fb] border border-[#d4e1f4] hover:bg-[#e8f0fb] hover:border-[#25406f] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 transition-colors">
                          <div className="w-5 h-5 rounded-full bg-[#25406f] flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <p className="text-xs sm:text-sm text-[#374151] leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-slate-600 text-xs sm:text-sm pt-2">
                      Vape Stall online store has Vozol Star 40000 puff vape for sale in Dubai, UAE with fast shipping, cash on delivery and same day delivery options. Buy Vozol Star 40000 puff vape in Dubai online and get it delivered to your doorstep with ease.
                    </p>

                    {/* Extra Heading */}
                    <div className="pt-4 space-y-2">
                      <h2 className="vap-heading-highlight">
                        Buy Vozol Star 40000 Puff Vape in UAE
                      </h2>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        The Vozol Star 40000 Puff Vape features dual mesh coil heating, adjustable airflow, LED screen display, USB-C fast charging, and advanced safety features. It has 850mAh rechargeable battery, large prefilled reservoir and up to 40,000 puffs. That makes it a device for vapers who are seeking for customizable performance and long-lasting satisfaction.
                      </p>
                      <p className="text-slate-600 text-xs sm:text-sm">
                        Ready to elevate your sessions? Buy Vozol Star 40000 puff 20mg nicotine vape in UAE today with same day delivery, cash on delivery options and get the best price for Vozol Star 40K in AED. Order now from the Vape Stall, trusted vape shops in UAE and enjoy a premium disposable electronic cigarette with innovation, safety and flavor variety.
                      </p>
                    </div>

                  </div>
                </div>
              ) : isMyle ? (
                /* MYLE META MAX 18000 DESCRIPTION */
                <div className="space-y-6 text-[#374151] text-sm leading-relaxed">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-center text-[#25406f]">
                    Buy Myle Meta Max 18000 Puff 50mg Disposable Vape in UAE – Advanced Dual Mesh Smart Display Vape
                  </h1>
                  <p>
                    If you are searching for a high-performance disposable vape that combines advanced technology and generous puff capacity, the Myle Meta Max 18000 puffs disposable vape is designed to deliver top satisfaction. It features a sleek ergonomic body, dual mesh coil atomizer, 850mAh Type-C rechargeable battery, and up to 18,000 flavorful puffs. This modern device ensures consistent flavor delivery, dense vapor clouds, and a smooth throat hit with 50mg salt nicotine from first to last puff. The Myle Meta Max 18k stands out in the UAE vape market for its premium reliability and innovation.
                  </p>
                  <p>
                    You can Buy Myle Meta Max 18000 Puff 50mg Disposable Vape in UAE from{' '}
                    <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                      Vape Stall
                    </Link>
                    . We offer authentic devices, competitive prices, and fast same-day shipping across Dubai and all 7 Emirates. Whether you seek long-lasting convenience or intense fruit and mint flavors, the Myle Meta Max is the premier choice for adult vapers.
                  </p>

                  <div className="pt-2">
                    <h2 className="vap-heading-highlight">
                      Myle Meta Max 18000 – Product Overview
                    </h2>
                    <div className="space-y-4 text-slate-700 leading-relaxed text-xs sm:text-sm">
                      <p>
                        The Myle Meta Max 18000 disposable vape is engineered for vapers seeking maximum endurance, precision airflow control, and rich flavor clarity. Its pocket-friendly design makes it comfortable to carry anywhere across Dubai and the UAE. Equipped with dual mesh coil technology, it heats e-liquid evenly to produce full-bodied vapor and rich flavor reproduction without dry hits. Its 850mAh built-in battery fast charges via Type-C, while the large 18ml prefilled tank ensures weeks of uninterrupted vaping sessions with satisfying 50mg nicotine salt hits.
                      </p>
                      <p>
                        Stay in complete control of your vaping session with the integrated smart LCD display that accurately shows real-time battery life and remaining e-liquid levels. An adjustable airflow slider allows you to effortlessly transition between a restricted Mouth-to-Lung (MTL) draw and an airy Direct-to-Lung (DTL) experience according to your preference.
                      </p>
                      <p>
                        This high-capacity vape is built with multi-layered leak-proof architecture, short-circuit prevention, and overcharge protection to guarantee dependable operation. The Myle Meta Max 18000 fully complies with UAE ESMA standards for electronic cigarette products and provides peace of mind for quality-conscious consumers.
                      </p>
                    </div>
                  </div>

                  {/* Available Flavors Section */}
                  <div className="pt-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#25406f] mb-4">
                      Available Flavours
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
                      {myleFlavorsList.map(([name, desc]: [string, string]) => (
                        <div
                          key={name}
                          onClick={() => handleFlavorChange(name)}
                          className="bg-[#f8faff] border border-[#e2eaf5] hover:border-[#f5a623] hover:shadow-[0_6px_20px_rgba(245,166,35,0.15)] hover:bg-[#fffef8] rounded-xl p-3.5 flex items-start gap-2.5 transition-all duration-200 cursor-pointer shadow-xs group"
                        >
                          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#f5a623] to-[#d4870a] shadow-[0_0_0_3px_rgba(245,166,35,0.18)] mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform"></span>
                          <p className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                            <strong className="font-bold text-[#25406f]">{name}</strong> – {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features & Specifications Table */}
                  <div className="pt-6">
                    <h2 className="vap-heading-highlight">
                      Key Features &amp; Specifications
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#1d335d] text-white">
                            <th className="p-3.5 font-bold w-1/4 text-center">Feature</th>
                            <th className="p-3.5 font-bold w-3/4 text-center">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                          {myleSpecsTable.map(([feat, det]: [string, string]) => (
                            <tr key={feat}>
                              <td className="p-3 text-center font-bold bg-slate-50">{feat}</td>
                              <td className="p-3 text-center font-semibold">{det}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Why Choose Section */}
                  <div className="space-y-6 pt-6">
                    <div className="space-y-3">
                      <h2 className="vap-heading-highlight">
                        Why Choose Myle Meta Max 18000 Puff Vape?
                      </h2>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                        The Myle Meta Max 18000 combines cutting-edge vape engineering, smart LCD monitoring, and exceptional flavor craftsmanship. Designed for adult consumers demanding quality and longevity, it offers unmatched value in the UAE disposable vape landscape.
                      </p>
                      <div className="space-y-2 pt-1">
                        {[
                          'Mega 18,000 puff capacity for weeks of smooth, satisfying vaping.',
                          'Dual mesh coil system ensuring maximum flavor clarity and cloud density.',
                          'Real-time smart LCD screen monitoring battery life and e-liquid level.',
                          '850mAh rechargeable battery with rapid USB Type-C fast charging.',
                          'Adjustable airflow control to customize between tight MTL and loose DTL draws.',
                          '100% leak-proof build and ESMA compliant safety safeguards.',
                          'Available at Vape Stall with guaranteed authenticity and same-day Dubai delivery.'
                        ].map((item, i) => (
                          <div key={i} className="bg-[#f0f5fb] border border-[#d4e1f4] hover:bg-[#e8f0fb] hover:border-[#25406f] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 transition-colors">
                            <div className="w-5 h-5 rounded-full bg-[#25406f] flex items-center justify-center flex-shrink-0">
                              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                            <p className="text-xs sm:text-sm text-[#374151] leading-snug">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <h2 className="vap-heading-highlight">
                        Order Myle Meta Max 18000 Puff Disposable Vape in UAE
                      </h2>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                        Order your genuine Myle Meta Max 18000 Puff 50mg Disposable Vape today from{' '}
                        <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                          Vape Stall
                        </Link>
                        , the trusted online vape store in Dubai, UAE. We provide fast same-day delivery in Dubai, Sharjah, and Ajman, and rapid express delivery to Abu Dhabi, Al Ain, Fujairah, and Ras Al Khaimah.
                      </p>
                      <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                        Enjoy flexible payment options including Cash on Delivery (COD) and card payments, backed by our 100% authenticity guarantee and responsive customer support.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* KIEF KING / DEFAULT DESCRIPTION */
                <div className="space-y-6 text-[#374151] text-sm leading-relaxed">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-center text-[#25406f]">
                    {isKiefKing
                      ? 'Buy Kief King 35000 Puffs 3mg Disposable Vape in UAE – Ultra High Puff Mesh Coil Device'
                      : `Buy ${product.name} in UAE – Ultra High Puff Mesh Coil Device`}
                  </h1>
                  <p>
                    {isKiefKing
                      ? 'If you are searching for a disposable vape that combines advanced technology and high puff capacity, The Kief King 35000 puffs disposable vape is made to meet this need. It has a sleek body, mesh coil atomizer, Type-C rechargeable battery and extraordinary 35,000 puff count. This is a modern vape device and it ensures smooth flavor delivery, dense vapor clouds and a satisfying throat hit from first to last puff. This disposable vape stands out in the Dubai vape market as a high puff disposable vape. The Kief King 35k is built for convenience and performance.'
                      : (product.description ||
                        'If you are searching for a disposable vape that combines advanced technology and high puff capacity, this device is made to meet this need. It ensures smooth flavor delivery, dense vapor clouds and a satisfying throat hit from first to last puff.')}
                  </p>
                  <p>
                    {isKiefKing ? (
                      <>
                        You can Buy Kief King 35000 Puffs 3mg Disposable Vape in UAE from{' '}
                        <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                          Vape Stall
                        </Link>
                        . We offer low prices and fast shipping. Kief King vape can be a good choice if you are looking for a kief king high puff vape, a long lasting disposable vape, or just want to enjoy strong shisha flavors. It is also a popular kief king disposable vape uae option for adult users.
                      </>
                    ) : (
                      <>
                        You can Buy {product.name} in UAE from{' '}
                        <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                          Vape Stall
                        </Link>
                        . We offer low prices and fast shipping cash on delivery across UAE.
                      </>
                    )}
                  </p>

                  <div className="pt-2">
                    <h2 className="vap-heading-highlight">
                      {isKiefKing ? 'Kief King 35000 – Product Overview' : 'Product Overview'}
                    </h2>
                    {isKiefKing ? (
                      <div className="space-y-4 text-slate-700 leading-relaxed text-xs sm:text-sm">
                        <p>
                          The Kief King disposable vape is made for users who need modern convenience, flavor consistency, and longevity. Its compact vape design makes it easy to carry as a portable vape device. This device features advanced mesh coil technology to enhance vapor density and every puff delivers its full flavor. Its Type-C rechargeable battery supports extended use, on the other hand large prefilled e-liquid reservoir and high capacity e-liquid setup guarantee long sessions without flavor fade. With nicotine 3mg strength balances smooth throat hits and long vaping sessions. That makes it a strong smoking alternative for adult vape users. The inhale activated device system eliminates buttons and offers an easy natural draw. It works as a convenient prefilled vape device for everyday use.
                        </p>
                        <p>
                          This high puff capacity vape offers safety features like leak proof design, short circuit prevention, and overcharge safeguards ensure reliability across thousands of draws. Kief King 35000 complies with ESMA standards UAE for disposable electronic cigarette products and aligns with UAE vape regulations.
                        </p>
                        <p>
                          Kief King 35000 offers a variety of flavor experience designed for every kind of vaper. Whether you prefer classic Double Apple, Grape, fruity blends like Strawberry, Mango, and Blueberry Raspberry or exotic mixes such as Love 66 and Lady Killer, offers a wide flavor portfolio designed to satisfy diverse tastes. Combined with its mesh coil atomizer, every flavor profile is delivered with clarity, richness, and smooth exhale. This makes it a dependable vaping device in the growing vaping culture UAE.
                        </p>
                      </div>
                    ) : (
                      <p>
                        This premium disposable vape is made for users who need modern convenience, flavor consistency, and longevity. Its compact vape design makes it easy to carry as a portable vape device. This device features advanced mesh coil technology to enhance vapor density and every puff delivers its full flavor.
                      </p>
                    )}
                  </div>

                  {/* Available Flavors Section */}
                  <div className="pt-4">
                    <h3 className="text-base sm:text-lg font-bold text-[#25406f] mb-4">
                      Available Flavours
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
                      {currentFlavorsList.map(([name, desc]: [string, string]) => (
                        <div
                          key={name}
                          onClick={() => handleFlavorChange(name)}
                          className="bg-[#f8faff] border border-[#e2eaf5] hover:border-[#f5a623] hover:shadow-[0_6px_20px_rgba(245,166,35,0.15)] hover:bg-[#fffef8] rounded-xl p-3.5 flex items-start gap-2.5 transition-all duration-200 cursor-pointer shadow-xs group"
                        >
                          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#f5a623] to-[#d4870a] shadow-[0_0_0_3px_rgba(245,166,35,0.18)] mt-1.5 flex-shrink-0 group-hover:scale-110 transition-transform"></span>
                          <p className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                            <strong className="font-bold text-[#25406f]">{name}</strong> – {desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Features & Specifications Table */}
                  <div className="pt-6">
                    <h2 className="vap-heading-highlight">
                      Key Features &amp; Specifications
                    </h2>
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#1d335d] text-white">
                            <th className="p-3.5 font-bold w-1/4 text-center">Feature</th>
                            <th className="p-3.5 font-bold w-3/4 text-center">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white text-slate-800">
                          {currentSpecsTable.map(([feat, det]: [string, string]) => (
                            <tr key={feat}>
                              <td className="p-3 text-center font-bold bg-slate-50">{feat}</td>
                              <td className="p-3 text-center font-semibold">{det}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {isKiefKing && (
                    <div className="space-y-6 pt-6">
                      <div className="space-y-3">
                        <h2 className="vap-heading-highlight">
                          Why Choose Kief King 35000 Puff Vape?
                        </h2>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          The Kief King 35000 is built for vapers who want maximum longevity and bold flavor delivery in one device. This vape is positioned in the high puff capacity disposable vape category. It combines mesh coil technology, Type-C rechargeable convenience, and shisha-inspired blends to create a disposable vape that feels powerful yet easy to use. This disposable vape device fits users searching for a rechargeable disposable vape, mesh coil disposable vape, and type c rechargeable vape in one package.
                        </p>
                        <div className="space-y-2 pt-1">
                          {[
                            'Mega puff capacity: 35,000 puffs designed for uninterrupted, long-lasting sessions.',
                            'Mesh coil performance: Smooth vapor with clear, rich flavor notes.',
                            'Rechargeable convenience: type c charging ensures extended usability.',
                            'Bold shisha flavors: Inspired Shisha blends like Double Apple, Love 66, Lady Killer, and Dubai Pistachio.',
                            'Lifestyle fit: Designed for adult vapers who enjoy long sessions and cloud chasing.',
                            'Reliability: Leak-proof build and consistent performance across flavors with leak proof vape device protection.',
                            'Available at Vape Stall: Authentic devices, fast delivery in Dubai, and the best deal on Kief King 35000 in UAE from an online vape store UAE and trusted premium vape brand collection.'
                          ].map((item, i) => (
                            <div key={i} className="bg-[#f0f5fb] border border-[#d4e1f4] hover:bg-[#e8f0fb] hover:border-[#25406f] rounded-xl p-3.5 sm:p-4 flex items-center gap-3 transition-colors">
                              <div className="w-5 h-5 rounded-full bg-[#25406f] flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </div>
                              <p className="text-xs sm:text-sm text-[#374151] leading-snug">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <h2 className="vap-heading-highlight">
                          Order Kief King 35000 Puffs Disposable Vape in UAE
                        </h2>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          The Kief King 35000 puffs disposable vape dubai option is an elegant high puff capacity vape that brings together technology, flavor, and lifestyle. It stands out in the high puff disposable vape category with mesh coil atomizer, Type-C rechargeable battery, low nicotine and massive 35,000 puff count. Delivers smooth throat hits, bold shisha flavors and consistent vapor clouds for weeks of uninterrupted use. This vape is made with leak-proof design and modern portability. It is one of the most reliable long-lasting disposable vapes in Dubai.
                        </p>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          You can buy kief king vape online from{' '}
                          <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#25406F] font-semibold underline hover:text-[#1a2f52]">
                            Vape Stall
                          </Link>
                          , with fast service and vape delivery Dubai available across the UAE. Cash on Delivery is also available in Dubai, Palm Jumeirah, Sharjah, Abu Dhabi, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah with discount pricing, ensuring convenience and value wherever you are. This makes it a trusted Kief King UAE choice.
                        </p>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          Vape Stall provides guaranteed authenticity and kief king 35000 price dubai kept competitive. Seasonal discounts, market best prices and attractive deals are always available, including cheap kief king vape uae offers.
                        </p>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                          Ready to enjoy a 35,000 puff shisha-style vape from a trusted Dubai vape store? Explore and buy Kief King 35000 Puffs 3mg Disposable Vape in UAE from Vape Stall and take advantage of same-day delivery across Dubai and UAE, friendly customer support and real deals.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SPECIFICATION */}
          {activeTab === 'specification' && (
            <div className="bg-gradient-to-br from-[#f8faff] to-[#f0f5fd] border border-[#e2eaf5] border-l-4 border-l-[#f5a623] rounded-r-2xl rounded-l-none p-6 sm:p-8 shadow-[0_2px_14px_rgba(37,64,111,0.08)]">
              <h3 className="font-bold text-[#25406f] text-base pb-3 mb-5 border-b border-[#dce6f5] flex items-center gap-2">
                <span className="w-[3px] h-5 bg-gradient-to-b from-[#f5a623] to-[#b48648] rounded-xs inline-block"></span>
                {product.name.replace(/ in UAE/i, '')} Specification&apos;s:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
                {currentSpecsTable.map(([feat, det]: [string, string]) => (
                  <div
                    key={feat}
                    className="bg-white border border-[#e2eaf5] hover:border-[#f5a623] hover:shadow-[0_2px_8px_rgba(245,166,35,0.12)] rounded-lg p-3 sm:p-3.5 flex items-center gap-3 transition-all"
                  >
                    <span className="w-2 h-2 rounded-full bg-gradient-to-br from-[#f5a623] to-[#d4870a] shadow-[0_0_0_2px_rgba(245,166,35,0.2)] flex-shrink-0"></span>
                    <p className="text-xs sm:text-sm text-[#374151] leading-snug">
                      <strong className="font-bold text-[#25406f]">{feat}:</strong> {det}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SHIPPING AND DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="space-y-6 text-[#374151] text-sm leading-relaxed">
              <h2 className="vap-heading-highlight uppercase">
                SHOPPING &amp; DELIVERY POLICY
              </h2>

              <div className="space-y-3">
                <h3 className="font-bold text-[#25406f] text-base">
                  Delivery Terms (Dubai, Sharjah &amp; Ajman)
                </h3>
                <div className="space-y-2">
                  {[
                    'Enjoy same-day delivery, 7 days a week.',
                    'Delivery within Dubai: 3–4 hours.',
                    'Sharjah & Ajman: Same-day delivery (10:00 AM to 10:00 PM); delays may occur due to traffic.',
                    'Delivery hours: Monday to Sunday (10:00 AM – 11:00 PM). On Fridays, delivery starts from 2:00 PM.',
                    'Free delivery on orders above AED 350.',
                    'AED 25 delivery fee applies to orders below AED 350.',
                    'Orders placed after 11:30 PM will be delivered the following day.',
                    'We accept cash on delivery and card payments.',
                    'A minimum order of AED 80 is required.'
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f8faff] border border-[#e8eef7] hover:bg-[#eef4ff] hover:border-[#c8d9f0] rounded-xl p-3 sm:p-3.5 flex items-center gap-3 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#25406f] flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-[#374151] leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-[#25406f] text-base">
                  Delivery in Abu Dhabi, Al Ain, Fujairah &amp; Ras Al Khaimah
                </h3>
                <div className="space-y-2">
                  {[
                    'Estimated delivery time: up to 6 working days (Sunday closed).',
                    'Orders placed after 2:00 PM will be processed for next-day delivery.',
                    'Orders confirmed before 1:00 PM may be delivered the same day.',
                    'Cash on delivery only (card payment is not available in these locations).',
                    'Free delivery on orders above AED 350.'
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#f8faff] border border-[#e8eef7] hover:bg-[#eef4ff] hover:border-[#c8d9f0] rounded-xl p-3 sm:p-3.5 flex items-center gap-3 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#25406f] flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <p className="text-xs sm:text-sm text-[#374151] leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-[#25406f] text-base">
                  Local Pick-Up Option
                </h3>
                <div className="bg-[#f8faff] border border-[#e8eef7] rounded-xl p-3.5 sm:p-4 shadow-xs">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Available <strong>7 days a week (10:30 AM – 10:00 PM)</strong>. Both cash and card payments accepted. Our team will contact you with the exact pick-up location details after order confirmation.
                  </p>
                </div>
              </div>
            </div>
          )}
      </section>

      {/* ========================================================
          5. FAQ ACCORDION SECTION (FROM HOME PAGE)
         ======================================================== */}
      <FAQSection />

      {/* ========================================================
          6. RELATED PRODUCTS ("You may also like")
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 border-t border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a2b49]">
            You may also like
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {relatedList.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* ========================================================
          7. STICKY ADD TO CART (Appears on scroll)
         ======================================================== */}
      {showStickyAtc && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-in slide-in-from-bottom duration-300">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-lg bg-white border border-slate-200 p-0.5 flex-shrink-0">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#1a2b49] truncate max-w-xs sm:max-w-md">
                  {product.name}
                </p>
                <p className="text-xs font-bold text-slate-600">
                  Dhs. {unitPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-[#25406F] hover:bg-[#1a3055] text-white font-bold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider shadow-sm transition-colors"
              >
                Add to cart
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          8. WHATSAPP ORDER MODAL
         ======================================================== */}
      {isWaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 sm:p-7 shadow-2xl relative text-slate-800">
            
            <button
              type="button"
              onClick={() => setIsWaModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-black w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25d366]/15 text-[#25d366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-[#25d366]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#1a2b49]">Order on WhatsApp</h3>
                <p className="text-[11px] text-slate-500">Fast instant order confirmation</p>
              </div>
            </div>

            <div className="bg-[#f8fafc] p-3.5 rounded-xl border border-slate-200 text-xs space-y-1 mb-4">
              <p className="font-bold text-[#1a2b49] truncate">{product.name}</p>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Flavor: <strong className="text-slate-900">{selectedFlavor}</strong></span>
                <span>Qty: <strong className="text-slate-900">{quantity}</strong></span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px] pt-1 border-t border-slate-200">
                <span>Total Amount:</span>
                <span className="font-bold text-[#25406F] text-xs">Dhs. {totalPrice}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Delivery Emirate / City:
                </label>
                <select
                  value={waCity}
                  onChange={(e) => setWaCity(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#25406F]"
                >
                  <option value="Dubai">Dubai (3-4 Hours Delivery)</option>
                  <option value="Sharjah">Sharjah (Same Day)</option>
                  <option value="Ajman">Ajman (Same Day)</option>
                  <option value="Abu Dhabi">Abu Dhabi</option>
                  <option value="Al Ain">Al Ain</option>
                  <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                  <option value="Fujairah">Fujairah</option>
                  <option value="Umm Al Quwain">Umm Al Quwain</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Delivery Address:
                </label>
                <textarea
                  rows={2}
                  value={waAddress}
                  onChange={(e) => setWaAddress(e.target.value)}
                  placeholder="Building/Villa, street, area..."
                  className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl p-3 focus:outline-none focus:border-[#25406F] resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={executeWhatsAppOrder}
              className="w-full py-3.5 rounded-full bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Confirm on WhatsApp</span>
            </button>

          </div>
        </div>
      )}

      {/* ========================================================
          9. ZOOM LIGHTBOX MODAL
         ======================================================== */}
      {showZoomModal && (
        <div
          onClick={() => setShowZoomModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full h-full flex items-center justify-center bg-white rounded-2xl p-6">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
            <button
              type="button"
              onClick={() => setShowZoomModal(false)}
              className="absolute top-3 right-3 text-slate-600 hover:text-black w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
