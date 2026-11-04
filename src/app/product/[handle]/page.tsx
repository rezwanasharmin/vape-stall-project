'use client';

import React, { useState } from 'react';
import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  MessageCircle,
  Zap,
} from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const handle = params.handle as string;

  const product = products.find((p) => p.handle === handle);

  const { addToCart, setIsCartOpen } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product?.flavors?.[0] || 'Blueberry Ice'
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
        <p className="text-gray-400 text-sm mb-6">The requested product could not be found in our UAE inventory.</p>
        <Link
          href="/shop"
          className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold px-6 py-3 rounded-full text-xs"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFlavor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedFlavor);
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Vape Stall UAE, I would like to order: ${product.name} (Flavor: ${selectedFlavor}, Quantity: ${quantity}) for AED ${(product.price * quantity).toFixed(2)}.`
  );
  const whatsappUrl = `https://wa.me/971551688299?text=${whatsappMessage}`;

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category))
    .slice(0, 4);

  return (
    <div className="py-10 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto">
          <Link href="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">Shop</Link>
          <span>/</span>
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-white">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-200 truncate">{product.name}</span>
        </nav>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-dark-card border border-dark-border p-6 sm:p-10 rounded-3xl shadow-xl mb-16">
          
          {/* Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full rounded-2xl bg-slate-900/80 border border-slate-800 p-8 flex items-center justify-center overflow-hidden">
              <Image
                src={selectedImage || product.image}
                alt={product.name}
                fill
                priority
                className="object-contain p-4"
              />
            </div>

            {/* Thumbnail switcher if alternate image exists */}
            {product.altImage && (
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedImage(product.image)}
                  className={`relative w-20 h-20 rounded-xl bg-slate-900 border p-2 overflow-hidden transition-all ${
                    (selectedImage === product.image || !selectedImage)
                      ? 'border-brand-500 shadow-md shadow-brand-500/20'
                      : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={product.image} alt="Primary preview" fill className="object-contain p-1" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedImage(product.altImage!)}
                  className={`relative w-20 h-20 rounded-xl bg-slate-900 border p-2 overflow-hidden transition-all ${
                    selectedImage === product.altImage
                      ? 'border-brand-500 shadow-md shadow-brand-500/20'
                      : 'border-slate-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={product.altImage} alt="Alternate preview" fill className="object-contain p-1" />
                </button>
              </div>
            )}
          </div>

          {/* Product Details & Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Brand & Puff Badges */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                {product.brand}
              </span>
              {product.puffs && (
                <span className="text-xs font-semibold text-gray-300 bg-slate-800 px-3 py-1 rounded-full flex items-center space-x-1 border border-slate-700">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{product.puffs}</span>
                </span>
              )}
              {product.nicotine && (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  {product.nicotine} Nicotine
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>

            {/* Star Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-gray-300">
                {product.rating} out of 5 ({product.reviewsCount} customer reviews)
              </span>
            </div>

            {/* Price Block */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-black text-brand-400">{product.priceFormatted}</span>
                {product.originalPriceFormatted && (
                  <span className="text-sm text-gray-500 line-through ml-3">
                    {product.originalPriceFormatted}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                In Stock &bull; UAE Ready
              </span>
            </div>

            {/* Flavor Selector */}
            {product.flavors && product.flavors.length > 0 && (
              <div>
                <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-2.5">
                  Available Flavors: <span className="text-brand-400 font-bold">{selectedFlavor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((fl) => (
                    <button
                      key={fl}
                      type="button"
                      onClick={() => setSelectedFlavor(fl)}
                      className={`text-xs px-3.5 py-2 rounded-xl border transition-all flex items-center space-x-1.5 ${
                        selectedFlavor === fl
                          ? 'bg-brand-500 text-slate-950 font-bold border-brand-500 shadow-md'
                          : 'bg-slate-900 text-gray-300 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {selectedFlavor === fl && <Check className="w-3.5 h-3.5" />}
                      <span>{fl}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Picker & Add / Buy Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-4">
                <span className="text-xs font-bold text-gray-400 uppercase">Quantity:</span>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-sm text-white">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl border border-slate-700 hover:border-brand-500 flex items-center justify-center space-x-2 text-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-400" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-brand-500 hover:bg-brand-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 text-sm transition-all shadow-lg shadow-brand-500/20"
                >
                  <span>Buy Now (Cash on Delivery)</span>
                </button>
              </div>

              {/* Order via WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-400" />
                <span>Quick Order via WhatsApp (+971 55 168 8299)</span>
              </a>
            </div>

            {/* Delivery Guarantees */}
            <div className="pt-4 border-t border-dark-border grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Same-day Dubai shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>100% Genuine product</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <span>Easy exchange policy</span>
              </div>
            </div>

          </div>

        </div>

        {/* Product Details & Specs Table */}
        <div className="bg-dark-card border border-dark-border p-6 sm:p-10 rounded-3xl shadow-xl mb-16 space-y-6">
          <h3 className="text-xl font-bold text-white border-l-4 border-brand-500 pl-3">
            Product Specifications & Details
          </h3>

          <p className="text-sm text-gray-300 leading-relaxed">
            {product.description}
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-gray-300 border-collapse">
              <tbody>
                <tr className="border-b border-dark-border/80">
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60 w-1/3">Brand</td>
                  <td className="py-3 px-4 text-white font-medium">{product.brand}</td>
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60">Category</td>
                  <td className="py-3 px-4 text-white">{product.category}</td>
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60">Puff Count</td>
                  <td className="py-3 px-4 text-white">{product.puffs || 'Up to 35,000 Puffs'}</td>
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60">Nicotine Strength</td>
                  <td className="py-3 px-4 text-white">{product.nicotine || '50mg (5%)'}</td>
                </tr>
                <tr className="border-b border-dark-border/80">
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60">Payment Options</td>
                  <td className="py-3 px-4 text-white">Cash on Delivery (COD) / Card on Delivery across UAE</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-gray-400 bg-slate-900/60">Authenticity</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Guaranteed genuine with official brand verification QR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Related Products You May Like
              </h3>
              <Link href="/shop" className="text-xs text-brand-400 hover:underline">
                View all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

