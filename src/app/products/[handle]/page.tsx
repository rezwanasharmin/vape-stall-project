'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Check,
  Plus,
  Minus,
  MessageCircle,
  Truck,
  RotateCcw,
  ShieldCheck,
  Headphones,
  Flame,
  ChevronDown,
  X,
  Share2,
  Heart,
  ZoomIn,
} from 'lucide-react';
import { products } from '@/data/products';
import { shopProducts } from '@/data/shopProducts';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';
import '@/app/vap-product.css';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const handle = params?.handle as string;

  // Find product across both product sources
  const allProducts = [...products, ...shopProducts];
  const product =
    allProducts.find((p) => p.handle === handle) ||
    allProducts.find(
      (p) =>
        p.handle === handle?.replace(/^buy-/, '') ||
        `buy-${p.handle}` === handle ||
        p.handle?.includes(handle || '')
    ) ||
    products[1]; // fallback to Kief King 35000

  const { addToCart, setIsCartOpen } = useCart();

  // Gallery images
  const gallery = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [
        product.image,
        product.altImage || product.image,
        '/images/products/kief-king-cola-lime-flv.png',
        '/images/products/kief-king-grape.png',
        '/images/products/kief-king-gum-mint.png',
        '/images/products/kief-king-lemon-lime.png',
        '/images/products/kief-king-strawberry.png',
      ].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<string>(gallery[0] || product.image);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Lady Killer');
  const [quantityType, setQuantityType] = useState<'1pc' | '5pc'>('1pc');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specification' | 'shipping'>('description');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isWaModalOpen, setIsWaModalOpen] = useState<boolean>(false);
  const [waCity, setWaCity] = useState<string>('Dubai');
  const [waAddress, setWaAddress] = useState<string>('');
  const [showStickyAtc, setShowStickyAtc] = useState<boolean>(false);
  const [showZoomModal, setShowZoomModal] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Pricing
  const unitPrice = quantityType === '1pc' ? product.price : 235.00;
  const totalPrice = (unitPrice * quantity).toFixed(2);

  // Countdown timer simulation
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 11, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sticky Add-To-Cart listener
  const atcRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (!atcRef.current) return;
      const rect = atcRef.current.getBoundingClientRect();
      setShowStickyAtc(rect.bottom < 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Flavor to image mapping
  const flavorImageMap: Record<string, string> = {
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

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        price: unitPrice,
      },
      quantity,
      `${selectedFlavor} (${quantityType === '1pc' ? '1 Pc / 1 Device' : '5 Pcs / 1 Box'})`
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const executeWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello Vape Stall UAE!\nI would like to order:\n- Product: ${product.name}\n- Flavor: ${selectedFlavor}\n- Pack: ${quantityType === '1pc' ? '1 Pc / 1 Device' : '5 Pcs / 1 Box'}\n- Quantity: ${quantity}\n- Total Price: Dhs. ${totalPrice}\n- Emirate/City: ${waCity}\n- Delivery Address: ${waAddress || 'Not specified'}\n\nPlease confirm availability and delivery time.`
    );
    window.open(`https://wa.me/971551688299?text=${message}`, '_blank');
    setIsWaModalOpen(false);
  };

  const relatedList = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="bg-[#0b1528] min-h-screen text-slate-100 font-sans pb-20">
      
      {/* ========================================================
          1. BREADCRUMBS
         ======================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 pt-5 pb-3">
        <nav className="vap-breadcrumb text-[13px] text-slate-400" aria-label="Breadcrumb">
          <ol className="vap-breadcrumb__list flex items-center flex-wrap gap-2">
            <li className="vap-breadcrumb__item">
              <Link href="/" className="vap-breadcrumb__link inline-flex items-center gap-1.5 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Home</span>
              </Link>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--separator opacity-40" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </li>
            <li className="vap-breadcrumb__item">
              <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="vap-breadcrumb__link hover:text-white transition-colors">
                All Disposable
              </Link>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--separator opacity-40" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </li>
            <li className="vap-breadcrumb__item vap-breadcrumb__item--current text-slate-200 font-medium truncate max-w-xs sm:max-w-md" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      {/* ========================================================
          2. MAIN PRODUCT SECTION (GALLERY + STICKY INFO)
         ======================================================== */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
            
            {/* Main Stage */}
            <div className="relative aspect-square w-full rounded-2xl bg-[#0f1f3a] border border-[#1d335d] flex items-center justify-center p-6 sm:p-10 shadow-2xl overflow-hidden group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
              
              {/* Badges on main stage */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-[#b48648] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                  Sale
                </span>
                <span className="bg-[#1d335d]/90 text-cyan-300 text-[11px] font-semibold tracking-wide px-2.5 py-0.5 rounded-md border border-cyan-500/30">
                  {product.puffs || '35000 Puffs'}
                </span>
              </div>

              {/* Zoom & Share triggers */}
              <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                <button
                  type="button"
                  onClick={() => setShowZoomModal(true)}
                  aria-label="Zoom image"
                  className="w-9 h-9 rounded-full bg-[#182a4d]/80 hover:bg-[#25406f] border border-[#2c477a] flex items-center justify-center text-slate-200 hover:text-white transition-all shadow-md backdrop-blur-sm"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share product"
                  className="w-9 h-9 rounded-full bg-[#182a4d]/80 hover:bg-[#25406f] border border-[#2c477a] flex items-center justify-center text-slate-200 hover:text-white transition-all shadow-md backdrop-blur-sm"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>
              </div>

              {/* In-stock indicator at bottom */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#0b1528]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-medium text-emerald-300">In Stock • Dubai Dispatch</span>
              </div>
            </div>

            {/* Thumbnail Slider */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none pt-1">
              {gallery.map((img, idx) => {
                const isActive = selectedImage === img;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-xl bg-[#0f1f3a] border transition-all overflow-hidden p-1.5 ${
                      isActive
                        ? 'border-[#b48648] ring-2 ring-[#b48648]/40 shadow-lg scale-105'
                        : 'border-[#1d335d] hover:border-slate-500 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                );
              })}
            </div>

          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Vendor & Title */}
            <div>
              <p className="text-[#b48648] text-xs font-bold uppercase tracking-widest mb-1.5">
                vape stall
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating Stars & Count */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-300">
                4.8 <span className="text-slate-400 font-normal">({product.reviewsCount || 57} reviews)</span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Authentic UAE ESMA
              </span>
            </div>

            {/* Price Box */}
            <div className="flex items-baseline gap-4 border-b border-[#1d335d] pb-5">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
                  Dhs. {unitPrice.toFixed(2)}
                </span>
                {quantityType === '5pc' && (
                  <span className="text-sm text-slate-400 line-through">
                    Dhs. 245.00
                  </span>
                )}
              </div>
              <span className="bg-[#b48648]/20 text-[#b48648] border border-[#b48648]/40 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Tax Included • Free COD
              </span>
            </div>

            {/* Countdown / Urgency Widget */}
            <div className="bg-gradient-to-r from-amber-500/10 via-[#182a4d] to-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Flame className="w-4 h-4 text-amber-400 animate-pulse flex-shrink-0" />
                <span>HURRY! SALE ENDS IN:</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono font-bold text-amber-400 bg-[#0b1528] px-3 py-1 rounded-md border border-amber-500/40 tracking-wider">
                <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
                <span>:</span>
                <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
                <span>:</span>
                <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
              </div>
            </div>

            {/* Stock Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="text-rose-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  Only 7 items left in stock - order soon!
                </span>
                <span className="text-slate-400 text-[11px]">85% Sold</span>
              </div>
              <div className="w-full bg-[#10203e] h-2 rounded-full overflow-hidden border border-[#1d335d]">
                <div className="bg-gradient-to-r from-[#b48648] to-rose-500 h-full w-[85%] rounded-full"></div>
              </div>
            </div>

            {/* Short Specifications List */}
            <div className="bg-[#0f1f3a]/80 border border-[#1d335d] rounded-2xl p-4 text-xs space-y-2">
              <p className="font-bold text-slate-100 text-[13px] border-b border-[#1d335d] pb-2">
                Kief King 35000 Specifications:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-slate-300 pt-1">
                <li><span className="text-slate-400">Puff Count:</span> <strong className="text-white">Up to 35,000 puffs</strong></li>
                <li><span className="text-slate-400">Nicotine Strength:</span> <strong className="text-white">3mg (0.3%)</strong></li>
                <li><span className="text-slate-400">E-Liquid:</span> <strong className="text-white">Prefilled Reservoir</strong></li>
                <li><span className="text-slate-400">Battery:</span> <strong className="text-white">1100mAh Rechargeable</strong></li>
                <li><span className="text-slate-400">Charging:</span> <strong className="text-white">USB Type-C Fast Charge</strong></li>
                <li><span className="text-slate-400">Coil Type:</span> <strong className="text-white">Advanced Mesh Coil</strong></li>
                <li className="sm:col-span-2"><span className="text-slate-400">Vaping Style:</span> <strong className="text-white">DTL (Direct to Lung)</strong></li>
              </ul>
            </div>

            {/* Flavor Picker Dropdown */}
            <div className="space-y-2">
              <label htmlFor="flavor-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Flavour: <span className="text-[#b48648] normal-case font-semibold">{selectedFlavor}</span>
              </label>
              <div className="relative">
                <select
                  id="flavor-select"
                  value={selectedFlavor}
                  onChange={(e) => handleFlavorChange(e.target.value)}
                  className="w-full appearance-none bg-[#0f1f3a] border border-[#25406f] hover:border-[#b48648] text-white text-sm rounded-xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-2 focus:ring-[#b48648] transition-colors cursor-pointer"
                >
                  <option value="" disabled>Select Flavour</option>
                  {(product.flavors || [
                    'Lady Killer',
                    'Love 66',
                    'Dubai Pistachio',
                    'Double Apple',
                    'Cola Lime',
                    'Gum Mint',
                    'Hydro Energy',
                    'Lychee Ice',
                    'Peach Ice',
                    'Watermelon Strawberry',
                    'Blueberry Raspberry',
                    'Strawberry Banana',
                    'Lemon Lime',
                    'Watermelon',
                    'Strawberry',
                    'Mango',
                    'Grape'
                  ]).filter((f) => f !== 'Select Flavour').map((flavor) => (
                    <option key={flavor} value={flavor} className="bg-[#0b1528] text-white py-2">
                      {flavor}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Quantity Type Radio Pills */}
            <div className="space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Quantity Type:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setQuantityType('1pc')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    quantityType === '1pc'
                      ? 'bg-[#182a4d] border-[#b48648] text-white ring-1 ring-[#b48648]'
                      : 'bg-[#0f1f3a] border-[#1d335d] text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
                >
                  <span>1Pc/1Device</span>
                  <span className="text-[11px] font-medium text-[#b48648]">Dhs. 49.00 / pc</span>
                </button>
                <button
                  type="button"
                  onClick={() => setQuantityType('5pc')}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    quantityType === '5pc'
                      ? 'bg-[#182a4d] border-[#b48648] text-white ring-1 ring-[#b48648]'
                      : 'bg-[#0f1f3a] border-[#1d335d] text-slate-400 hover:text-white hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>5Pc/1Box</span>
                    <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded font-bold">SAVE</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#b48648]">Dhs. 235.00 / box</span>
                </button>
              </div>
            </div>

            {/* Total Price Box */}
            <div className="vap-total-price flex items-center justify-between p-4 rounded-xl bg-[#0f1f3a] border border-[#1d335d]">
              <div className="vap-total-price__left flex flex-col">
                <span className="vap-total-price__label text-xs font-bold text-white uppercase tracking-wider">
                  Total Price
                </span>
                <span className="vap-total-price__sub text-[11px] text-slate-400">
                  {quantity} × Dhs. {unitPrice.toFixed(2)}
                </span>
              </div>
              <span className="vap-total-price__amount text-2xl font-black text-[#b48648]">
                Dhs. {totalPrice}
              </span>
            </div>

            {/* Buy Row: Quantity Stepper + Buy Now + Add to Cart + WhatsApp */}
            <div className="space-y-3 pt-2">
              
              {/* Top row: Stepper + Buy Now */}
              <div className="flex items-stretch gap-3">
                {/* Stepper */}
                <div className="flex items-center bg-[#0f1f3a] border border-[#1d335d] rounded-xl overflow-hidden h-12 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#182a4d] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#182a4d] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center"
                >
                  Buy Now
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                ref={atcRef}
                type="button"
                onClick={handleAddToCart}
                className="w-full h-12 rounded-xl bg-[#b48648] hover:bg-[#c9973d] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-[#b48648]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Add to cart</span>
              </button>

              {/* WhatsApp Order Button */}
              <button
                type="button"
                onClick={() => setIsWaModalOpen(true)}
                className="w-full h-12 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-[#25d366]/30 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25d366]" />
                <span>Order on WhatsApp</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#1d335d]/60">
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#0f1f3a]/50 p-2.5 rounded-lg border border-[#1d335d]/60">
                <Truck className="w-4 h-4 text-[#b48648] flex-shrink-0" />
                <span>Free Shipping &gt; 350</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#0f1f3a]/50 p-2.5 rounded-lg border border-[#1d335d]/60">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#0f1f3a]/50 p-2.5 rounded-lg border border-[#1d335d]/60">
                <RotateCcw className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-300 bg-[#0f1f3a]/50 p-2.5 rounded-lg border border-[#1d335d]/60">
                <Headphones className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>24/7 UAE Support</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          3. USP 4-COLUMN TRUST SECTION
         ======================================================== */}
      <section className="vab-usp-section py-12 border-t border-b border-[#1d335d]/60 bg-[#070e1c] my-8">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#0f1f3a] border border-[#1d335d] hover:border-[#b48648]/60 p-6 rounded-2xl text-center transition-all hover:-translate-y-1 shadow-lg">
              <div className="flex justify-center mb-3">
                <img
                  src="/images/icons/delivery-van.svg"
                  alt="Free Shipping"
                  width="44"
                  height="28"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <h3 className="text-[#ffffff] font-bold text-base mb-1.5 font-serif">
                Free Shipping
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Terms & Conditions applied for free shipping and delivery
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#0f1f3a] border border-[#1d335d] hover:border-[#b48648]/60 p-6 rounded-2xl text-center transition-all hover:-translate-y-1 shadow-lg">
              <div className="flex justify-center mb-3">
                <img
                  src="/images/icons/support.svg"
                  alt="24x7 Support"
                  width="40"
                  height="40"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <h3 className="text-[#ffffff] font-bold text-base mb-1.5 font-serif">
                24x7 Support
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Round-the-Clock Assistance, Anytime You Need It
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#0f1f3a] border border-[#1d335d] hover:border-[#b48648]/60 p-6 rounded-2xl text-center transition-all hover:-translate-y-1 shadow-lg">
              <div className="flex justify-center mb-3">
                <img
                  src="/images/icons/parcel-return.svg"
                  alt="30 Days Return"
                  width="40"
                  height="40"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <h3 className="text-[#ffffff] font-bold text-base mb-1.5 font-serif">
                30 Days Return
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Your Satisfaction is Our Priority: Return Any Product Within 30 Days
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#0f1f3a] border border-[#1d335d] hover:border-[#b48648]/60 p-6 rounded-2xl text-center transition-all hover:-translate-y-1 shadow-lg">
              <div className="flex justify-center mb-3">
                <img
                  src="/images/icons/secure_payment.png"
                  alt="Secure Payment"
                  width="40"
                  height="40"
                  className="h-8 w-auto object-contain"
                />
              </div>
              <h3 className="text-[#ffffff] font-bold text-base mb-1.5 font-serif">
                Secure Payment
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Seamless Shopping Backed by Safe and Secure Payment Options
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. TABBED DESCRIPTION / SPECIFICATION / SHIPPING
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8">
        <div className="bg-[#0f1f3a] border border-[#1d335d] rounded-3xl p-6 sm:p-10 shadow-xl">
          
          {/* Tab Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 border-b border-[#1d335d] pb-4 mb-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-3 px-4 text-sm sm:text-base font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-[#b48648] text-[#b48648]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('specification')}
              className={`pb-3 px-4 text-sm sm:text-base font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'specification'
                  ? 'border-[#b48648] text-[#b48648]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Specification
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={`pb-3 px-4 text-sm sm:text-base font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'shipping'
                  ? 'border-[#b48648] text-[#b48648]'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Shipping and Delivery
            </button>
          </div>

          {/* TAB 1: DESCRIPTION */}
          {activeTab === 'description' && (
            <div className="prose prose-invert max-w-none text-slate-300 space-y-6 text-sm leading-relaxed">
              <h2 className="text-xl sm:text-2xl font-bold text-center text-white">
                Buy Kief King 35000 Puffs 3mg Disposable Vape in UAE – Ultra High Puff Mesh Coil Device
              </h2>
              
              <p>
                If you are searching for a disposable vape that combines advanced technology and high puff capacity, The Kief King 35000 puffs disposable vape is made to meet this need. It has a sleek body, mesh coil atomizer, Type‑C rechargeable battery and extraordinary 35,000 puff count. This is a modern vape device and it ensures smooth flavor delivery, dense vapor clouds and a satisfying throat hit from first to last puff. This disposable vape stands out in the Dubai vape market as a high puff disposable vape. The Kief King 35k is built for convenience and performance.
              </p>

              <p>
                You can Buy Kief King 35000 Puffs 3mg Disposable Vape in UAE from{' '}
                <Link href="/collections/vape-stall-disposable-vape-shop-in-uae" className="text-[#b48648] font-bold underline hover:text-[#c9973d]">
                  Vape Stall
                </Link>
                . We offer low prices and fast shipping. Kief King vape can be a good choice if you are looking for a kief king high puff vape, a long lasting disposable vape, or just want to enjoy strong shisha flavors. It is also a popular kief king disposable vape uae option for adult users.
              </p>

              <div className="pt-4">
                <h3 className="text-lg font-bold text-white mb-2">Kief King 35000 – Product Overview</h3>
                <p>
                  The Kief King disposable vape is made for users who need modern convenience, flavor consistency, and longevity. Its compact vape design makes it easy to carry as a portable vape device. This device features advanced mesh coil technology to enhance vapor density and every puff delivers its full flavor. Its Type‑C rechargeable battery supports extended use, on the other hand large prefilled e‑liquid reservoir and high capacity e-liquid setup guarantee long sessions without flavor fade. With nicotine 3mg strength balances smooth throat hits and long vaping sessions.
                </p>
              </div>

              {/* Available Flavors List */}
              <div className="pt-4">
                <h3 className="text-lg font-bold text-white mb-3">Available Flavours</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {[
                    ['Double Apple', 'Traditional red & green apple shisha flavor.'],
                    ['Gum Mint', 'Sweet bubblegum freshness with cooling spearmint.'],
                    ['Cola Lime', 'Fizzy cola uplifted by citrus lime.'],
                    ['Mango', 'Tropical ripe mango with smooth inhale.'],
                    ['Strawberry', 'Sweet single fruit strawberry like taste.'],
                    ['Watermelon', 'The flavor of pure, ripe watermelon.'],
                    ['Blueberry Raspberry', 'Tart blueberry and raspberry fusion.'],
                    ['Strawberry Banana', 'Ripe strawberry like and creamy bananas.'],
                    ['Watermelon Strawberry', 'Crisp watermelon blended with sweet strawberry.'],
                    ['Peach Ice', 'Juicy peach rounded off with menthol chill.'],
                    ['Lemon Lime', 'Sharp citrus duo with refreshing burst.'],
                    ['Love 66', 'Iconic shisha mix of watermelon, honeydew, passion fruit & mint.'],
                    ['Lady Killer', 'Tropical mango and melon fusion with cooling finish.'],
                    ['Dubai Pistachio', 'Creamy pistachio dessert profile.'],
                    ['Lychee Ice', 'Exotic lychee sweetness with icy coolness.'],
                    ['Hydro Energy', 'Bold energy drink flavor with tangy kick.'],
                    ['Grape', 'Rich purple grape sweetness with bold clouds.'],
                  ].map(([name, desc]) => (
                    <div key={name} className="bg-[#0b1528] p-3 rounded-xl border border-[#1d335d]/70 flex flex-col">
                      <span className="font-bold text-[#b48648] text-xs mb-0.5">{name}</span>
                      <span className="text-[11px] text-slate-400">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features Table */}
              <div className="pt-6">
                <h3 className="text-lg font-bold text-white mb-4">Key Features &amp; Specifications</h3>
                <div className="overflow-x-auto rounded-2xl border border-[#1d335d]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#182a4d] text-white">
                        <th className="p-3.5 border-b border-[#1d335d] font-bold w-1/3">Feature</th>
                        <th className="p-3.5 border-b border-[#1d335d] font-bold w-2/3">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1d335d] bg-[#0b1528]">
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Puff Count</td>
                        <td className="p-3.5 text-white">Up to 35,000 puffs</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Nicotine Strength</td>
                        <td className="p-3.5 text-white font-bold">3mg (0.3%)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">E‑Liquid Capacity</td>
                        <td className="p-3.5 text-white">Prefilled reservoir</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Battery</td>
                        <td className="p-3.5 text-white">1100mAh internal rechargeable battery</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Charging System</td>
                        <td className="p-3.5 text-white">USB Type-C fast charging</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Coil Type</td>
                        <td className="p-3.5 text-white">Advanced Mesh coil technology</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Vaping Style</td>
                        <td className="p-3.5 text-white">DTL (Direct to Lung) performance</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Design</td>
                        <td className="p-3.5 text-white">Leak‑proof, compact, and highly portable architecture</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Activation</td>
                        <td className="p-3.5 text-white">Simple draw-activated (inhale) mechanism</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-semibold text-slate-300">Safety Features</td>
                        <td className="p-3.5 text-white">Short-circuit protection, overcharge safeguards, and leak-proof engineering</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Why Choose Section */}
              <div className="pt-6 space-y-3">
                <h3 className="text-lg font-bold text-white">Why Choose Kief King 35000 Puff Vape?</h3>
                <ul className="space-y-2 list-none pl-0">
                  {[
                    'Mega puff capacity: 35,000 puffs designed for uninterrupted, long‑lasting sessions.',
                    'Mesh coil performance: Smooth vapor with clear, rich flavor notes.',
                    'Rechargeable convenience: type c charging ensures extended usability.',
                    'Bold shisha flavors: Inspired Shisha blends like Double Apple, Love 66, Lady Killer, and Dubai Pistachio.',
                    'Lifestyle fit: Designed for adult vapers who enjoy long sessions and cloud chasing.',
                    'Reliability: Leak‑proof build and consistent performance across flavors with leak proof vape device protection.',
                    'Available at Vape Stall: Authentic devices, fast delivery in Dubai, and the best deal on Kief King 35000 in UAE.',
                  ].map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

          {/* TAB 2: SPECIFICATION */}
          {activeTab === 'specification' && (
            <div className="text-slate-300 space-y-4 text-sm max-w-2xl mx-auto py-4">
              <h3 className="text-lg font-bold text-white mb-4">Kief King 35000 Specifications:</h3>
              <div className="bg-[#0b1528] p-6 rounded-2xl border border-[#1d335d] space-y-3">
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">Puff Count</span>
                  <span className="font-bold text-white">Up to 35,000 puffs</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">Nicotine Strength</span>
                  <span className="font-bold text-white">3mg (0.3%)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">E-Liquid</span>
                  <span className="font-bold text-white">Prefilled Tank</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">Battery</span>
                  <span className="font-bold text-white">1100mAh Rechargeable</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">Charging System</span>
                  <span className="font-bold text-white">USB Type-C Fast Charging</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#1d335d]">
                  <span className="font-semibold text-slate-400">Coil Type</span>
                  <span className="font-bold text-white">Mesh Coil</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-semibold text-slate-400">Vaping Style</span>
                  <span className="font-bold text-white">DTL (Direct to Lung)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SHIPPING AND DELIVERY */}
          {activeTab === 'shipping' && (
            <div className="text-slate-300 space-y-6 text-sm max-w-3xl mx-auto py-4 leading-relaxed">
              <h2 className="text-xl font-bold text-white border-b border-[#1d335d] pb-3">
                SHOPPING &amp; DELIVERY POLICY
              </h2>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-[#b48648]">Delivery Terms (Dubai, Sharjah &amp; Ajman)</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Enjoy <strong>same-day delivery, 7 days a week</strong>.</li>
                  <li>Delivery within Dubai: <strong>3–4 hours</strong>.</li>
                  <li>Sharjah &amp; Ajman: <strong>Same-day delivery (10:00 AM to 10:00 PM)</strong>; delays may occur due to traffic.</li>
                  <li>Delivery hours: <strong>Monday to Sunday (10:00 AM – 11:00 PM)</strong>. On Fridays, delivery starts from <strong>2:00 PM</strong>.</li>
                  <li><strong>Free delivery</strong> on orders above AED 350.</li>
                  <li><strong>AED 25 delivery fee</strong> applies to orders below AED 350.</li>
                  <li>Orders placed <strong>after 11:30 PM</strong> will be delivered the following day.</li>
                  <li>We accept <strong>cash on delivery and card payments</strong>.</li>
                  <li>A <strong>minimum order of AED 80</strong> is required.</li>
                  <li>Delivery is available <strong>within the UAE only</strong> (no international shipping).</li>
                </ul>
              </div>

              <div className="space-y-2 pt-3">
                <h3 className="text-base font-bold text-[#b48648]">Delivery in Abu Dhabi, Al Ain, Fujairah &amp; Ras Al Khaimah</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-300">
                  <li>Estimated delivery time: <strong>up to 6 working days</strong> (Sunday closed).</li>
                  <li>Orders placed <strong>after 2:00 PM</strong> will be processed for next-day delivery.</li>
                  <li>Orders confirmed <strong>before 1:00 PM</strong> may be delivered the same day.</li>
                  <li>Orders placed <strong>after 2:00 PM on Saturday</strong> will be delivered on Monday.</li>
                  <li><strong>Cash on delivery only</strong> (card payment is not available in these locations).</li>
                  <li><strong>Free delivery</strong> on orders above AED 350.</li>
                </ul>
              </div>

              <div className="space-y-2 pt-3">
                <h3 className="text-base font-bold text-[#b48648]">Local Pick-Up Option</h3>
                <p>
                  Available <strong>7 days a week (10:30 AM – 10:00 PM)</strong>. Both cash and card payments accepted. Our team will contact you with the exact pick-up location details after order confirmation.
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================
          5. FAQ ACCORDION SECTION
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10" aria-label="Frequently Asked Questions">
        
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-[#25406f]/40 text-[#c89136] border border-[#b48648]/40 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Everything you need to know about this product.
          </p>
        </div>

        {/* Layout: Left Contact Card + Right Accordions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Side Card */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#1d335d] to-[#10203e] rounded-3xl p-8 text-center text-white border border-[#25406f] shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center mb-4 border border-white/20">
              <span className="text-2xl font-black text-amber-300">?</span>
            </div>
            <h3 className="text-lg font-bold mb-2">Still have questions?</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Can't find the answer you're looking for? Our support team is happy to help you right now.
            </p>
            <Link
              href="/pages/contact-us"
              className="inline-flex items-center gap-2 bg-[#b48648] hover:bg-[#c9973d] text-white px-6 py-3 rounded-full text-xs font-bold shadow-lg hover:shadow-[#b48648]/30 transition-all"
            >
              <span>Contact Support</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Right Accordion List */}
          <div className="lg:col-span-8 space-y-3">
            {[
              {
                id: 1,
                q: 'How long does the Kief King 35000 last?',
                a: 'For moderate users, the device can last several weeks to months, which makes it one of the most long lasting disposable vapes in UAE market and a top 35000 puff vape dubai choice.',
              },
              {
                id: 2,
                q: 'Is the Kief King 35000 rechargeable?',
                a: 'Yes. It’s a type c rechargeable vape with a powerful 1100mAh battery and quick charging. A full charge will give you longer uninterrupted sessions.',
              },
              {
                id: 3,
                q: 'What flavors does Kief King 35000 come in?',
                a: 'The most popular flavors are Double Apple, Blueberry Raspberry, Grape, Lady Killer, Love 66, Lychee Ice, Mango, Peach Ice, Strawberry and Watermelon.',
              },
              {
                id: 4,
                q: 'What makes Kief King different from other disposables?',
                a: 'It is a disposable vape with a mesh coil and advanced atomizer technology, producing thick vapor clouds and consistent flavor clarity for thousands of puffs.',
              },
              {
                id: 5,
                q: 'Where can I buy Kief King 35000 in Dubai?',
                a: 'You can buy kief king 35000 vape dubai from Vape Stall, either in-store or order online. We offer fast service, 24-hour vape delivery in Dubai, and reliable coverage throughout the UAE. With guaranteed authenticity, it is a trusted choice for Kief King Dubai buyers.',
              },
            ].map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-[#0f1f3a] border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'border-[#b48648] shadow-lg' : 'border-[#1d335d] hover:border-slate-500'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isOpen ? 'bg-[#b48648] text-white' : 'bg-[#182a4d] text-amber-400'
                      }`}>
                        {faq.id}
                      </span>
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-[#b48648] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-[#1d335d]/60 leading-relaxed bg-[#0b1528]/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </section>

      {/* ========================================================
          6. RELATED PRODUCTS ("You may also like")
         ======================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 py-10 border-t border-[#1d335d]/60">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[#b48648] text-xs font-bold uppercase tracking-wider block mb-1">
              Recommendations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              You May Also Like
            </h2>
          </div>
          <Link
            href="/collections/vape-stall-disposable-vape-shop-in-uae"
            className="text-xs font-bold text-[#b48648] hover:text-[#c9973d] flex items-center gap-1"
          >
            <span>View All</span>
            <span>&rarr;</span>
          </Link>
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
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0b1528]/95 backdrop-blur-md border-t border-[#1d335d] py-3 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
            
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-lg bg-[#0f1f3a] border border-[#1d335d] p-1 flex-shrink-0">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                  {product.name}
                </p>
                <p className="text-xs font-extrabold text-[#b48648]">
                  Dhs. {unitPrice.toFixed(2)}
                  <span className="text-[10px] text-slate-400 font-normal ml-2">({selectedFlavor})</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-[#b48648] hover:bg-[#c9973d] text-white font-bold text-xs px-5 py-2.5 rounded-xl uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Add to cart</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================
          8. WHATSAPP ORDER MODAL
         ======================================================== */}
      {isWaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0f1f3a] border border-[#25406f] w-full max-w-md rounded-3xl p-6 sm:p-7 shadow-2xl relative text-slate-200">
            
            <button
              type="button"
              onClick={() => setIsWaModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-[#182a4d] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#25d366]/20 text-[#25d366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 fill-[#25d366]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Order on WhatsApp</h3>
                <p className="text-[11px] text-slate-400">Fast instant order confirmation</p>
              </div>
            </div>

            <div className="bg-[#0b1528] p-3.5 rounded-xl border border-[#1d335d] text-xs space-y-1 mb-4">
              <p className="font-bold text-white truncate">{product.name}</p>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>Flavor: <strong className="text-white">{selectedFlavor}</strong></span>
                <span>Qty: <strong className="text-white">{quantity}</strong></span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-[#1d335d]">
                <span>Total Amount:</span>
                <span className="font-bold text-[#b48648] text-xs">Dhs. {totalPrice}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs mb-5">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Delivery Emirate / City:
                </label>
                <select
                  value={waCity}
                  onChange={(e) => setWaCity(e.target.value)}
                  className="w-full bg-[#0b1528] border border-[#1d335d] text-white rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#b48648]"
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
                <label className="block font-semibold text-slate-300 mb-1">
                  Delivery Address / Location:
                </label>
                <textarea
                  rows={2}
                  value={waAddress}
                  onChange={(e) => setWaAddress(e.target.value)}
                  placeholder="Building/Villa name, street, area..."
                  className="w-full bg-[#0b1528] border border-[#1d335d] text-white rounded-xl p-3 focus:outline-none focus:border-[#b48648] resize-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={executeWhatsAppOrder}
              className="w-full py-3.5 rounded-xl bg-[#25d366] hover:bg-[#20ba59] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={() => setShowZoomModal(false)}
              className="absolute top-4 right-4 text-white w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center border border-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
