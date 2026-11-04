'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const FREE_SHIPPING_THRESHOLD = 350;
  const shippingFee = totalPrice >= FREE_SHIPPING_THRESHOLD || totalPrice === 0 ? 0 : 20;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'VAPE10') {
      const discount = totalPrice * 0.1;
      setAppliedDiscount(discount);
      setCouponMessage('Success: 10% discount applied!');
    } else {
      setCouponMessage('Invalid promo code. Try VAPE10');
      setAppliedDiscount(0);
    }
  };

  const finalTotal = Math.max(0, totalPrice - appliedDiscount + shippingFee);

  if (cart.length === 0) {
    return (
      <div className="py-24 bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mx-auto text-gray-500 mb-6">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your Cart is Currently Empty</h1>
          <p className="text-xs sm:text-sm text-gray-400 mb-8 leading-relaxed">
            Looks like you haven&apos;t added any vaping devices or pods to your shopping cart yet.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold px-8 py-3.5 rounded-full text-xs transition-colors shadow-lg"
          >
            <span>Start Shopping UAE Vapes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-8 tracking-tight">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFlavor}`}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900/60 border border-slate-800 rounded-2xl gap-4"
                >
                  <div className="flex items-center space-x-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white line-clamp-1">
                        <Link href={`/product/${item.product.handle}`} className="hover:text-brand-400">
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Flavor: <span className="text-gray-200 font-medium">{item.selectedFlavor}</span>
                      </p>
                      <p className="text-xs text-brand-400 font-bold mt-1">
                        {item.product.priceFormatted} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                    <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedFlavor)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-white">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedFlavor)}
                        className="p-1.5 text-gray-400 hover:text-white rounded-lg transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-white min-w-[80px] text-right">
                      AED {(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedFlavor)}
                      className="p-2 text-gray-400 hover:text-rose-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-dark-border flex items-center justify-between">
              <Link
                href="/shop"
                className="text-xs text-brand-400 hover:underline flex items-center space-x-1"
              >
                <span>&larr; Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-lg font-bold text-white pb-3 border-b border-dark-border">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">
                Have a Promo Code?
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. VAPE10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-slate-900 border border-dark-border rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs border border-slate-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-[11px] ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {couponMessage}
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-2.5 text-xs text-gray-300 pt-2 border-t border-dark-border/80">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-white">AED {totalPrice.toFixed(2)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount (10% OFF):</span>
                  <span>- AED {appliedDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping to UAE:</span>
                <span className="font-semibold text-white">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 uppercase font-bold">FREE</span>
                  ) : (
                    `AED ${shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-dark-border flex justify-between text-base font-extrabold text-white">
                <span>Estimated Total:</span>
                <span className="text-brand-400">AED {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-brand-500 hover:bg-brand-600 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-brand-500/20"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center space-x-2 text-[11px] text-gray-400 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cash on Delivery &bull; Safe &amp; Secure Checkout</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

