'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 350;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-dark-card border-l border-dark-border text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 border-b border-dark-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-400" />
              <h2 className="text-lg font-bold">Shopping Cart ({cart.length})</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-slate-900/90 px-5 py-3 border-b border-dark-border text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-gray-300 mb-1.5">
                Add <strong className="text-brand-400">AED {remainingForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE UAE Delivery</strong>!
              </p>
            ) : (
              <p className="text-emerald-400 font-semibold mb-1.5 flex items-center space-x-1">
                <span>🎉 You qualify for FREE Delivery across UAE!</span>
              </p>
            )}
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-brand-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-gray-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Your cart is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mb-6">
                  Browse our authentic collection of disposable vapes and pod systems in UAE.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold px-6 py-2.5 rounded-full text-xs transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFlavor}`}
                  className="flex space-x-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80"
                >
                  <div className="relative w-16 h-16 bg-slate-800 rounded-lg overflow-hidden flex-shrink-0 border border-slate-700">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Flavor: <span className="text-gray-200">{item.selectedFlavor}</span>
                    </p>
                    <p className="text-xs font-bold text-brand-400 mt-1">
                      AED {(item.product.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1.5 bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedFlavor)}
                          className="p-1 hover:text-brand-400 rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedFlavor)}
                          className="p-1 hover:text-brand-400 rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedFlavor)}
                        className="text-gray-400 hover:text-rose-400 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-dark-border bg-slate-900/90 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Subtotal:</span>
                <span className="text-lg font-bold text-white">AED {totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-gray-400">
                Taxes and shipping calculated at checkout. Cash on delivery available across UAE.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-2.5 px-3 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-semibold text-gray-200 transition-colors"
                >
                  View Cart
                </Link>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center py-2.5 px-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-1"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

