'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Trash2, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const FREE_SHIPPING_THRESHOLD = 350;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const progressPercent = Math.min(100, Math.max(0, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  // Lock body scroll and handle ESC key when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsCartOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isCartOpen, setIsCartOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-visibility duration-300 ${
        isCartOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Shopping Cart Drawer"
    >
      {/* Dark Dim Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ease-out ${
          isCartOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[440px] max-w-full bg-white text-slate-900 shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {cart.length === 0 ? (
          /* ═════════════════════════════════════════════════════════════════
             EMPTY CART STATE (Exact matching vapstall.ae screenshot)
             ═════════════════════════════════════════════════════════════════ */
          <div className="flex-1 flex flex-col justify-between h-full bg-white">
            
            {/* Top Right Close Button */}
            <div className="p-4 sm:p-5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-4 h-4"
                  viewBox="0 0 18 17"
                >
                  <path
                    fill="currentColor"
                    d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z"
                  />
                </svg>
              </button>
            </div>

            {/* Empty Center Message */}
            <div className="px-6 py-8 flex flex-col items-center justify-center text-center my-auto">
              <h2 className="text-[26px] sm:text-[28px] font-bold text-[#121212] tracking-tight mb-6">
                Your cart is empty
              </h2>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-to-r from-[#b48648] via-[#d4973a] to-[#f78804] hover:shadow-lg hover:shadow-[#f78804]/30 hover:-translate-y-0.5 active:translate-y-0 text-white font-bold text-[15px] px-9 py-3.5 rounded-full transition-all duration-200 shadow-md cursor-pointer"
              >
                Continue shopping
              </button>

              <p className="text-[15px] font-semibold text-[#121212] mt-9 mb-1.5">
                Have an account?
              </p>
              <p className="text-[14px] text-slate-500">
                <Link
                  href="/login"
                  onClick={() => setIsCartOpen(false)}
                  className="underline font-semibold text-slate-900 hover:text-[#d4973a] transition-colors"
                >
                  Log in
                </Link>{' '}
                to check out faster.
              </p>
            </div>

            {/* Bottom Dark Free Shipping Bar (Dhs. 350 Threshold) */}
            <div className="bg-[#1a1200] border-t border-[#f78804]/20 px-6 py-4 text-white">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[18px] animate-bounce" aria-hidden="true">🚚</span>
                <p className="text-[13px] text-white/80 font-medium">
                  Add <strong className="text-[#f78804] font-bold">Dhs. 350.00</strong> more for{' '}
                  <strong className="text-[#f78804] font-bold">FREE Shipping!</strong>
                </p>
              </div>

              {/* Progress Track */}
              <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner my-2">
                <div
                  className="h-full bg-gradient-to-r from-[#b48648] to-[#f78804] rounded-full transition-all duration-500"
                  style={{ width: '0%' }}
                />
              </div>

              {/* Milestones */}
              <div className="flex justify-between items-center text-[11px] font-semibold text-white/60 pt-0.5">
                <span>$0</span>
                <span className="text-[#f78804]">Dhs. 350</span>
              </div>
            </div>

          </div>
        ) : (
          /* ═════════════════════════════════════════════════════════════════
             ACTIVE CART WITH ITEMS (Matching exact vapstall.ae styling)
             ═════════════════════════════════════════════════════════════════ */
          <div className="flex-1 flex flex-col justify-between h-full bg-white">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-[18px] font-bold text-slate-900">
                Your cart ({totalItems})
              </h2>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="w-4 h-4"
                  viewBox="0 0 18 17"
                >
                  <path
                    fill="currentColor"
                    d="M.865 15.978a.5.5 0 0 0 .707.707l7.433-7.431 7.579 7.282a.501.501 0 0 0 .846-.37.5.5 0 0 0-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 1 0-.707-.708L8.991 7.853 1.413.573a.5.5 0 1 0-.693.72l7.563 7.268z"
                  />
                </svg>
              </button>
            </div>

            {/* Free Shipping Dynamic Progress Bar */}
            <div className="bg-[#1a1200] border-b border-[#f78804]/20 px-6 py-3.5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[17px]" aria-hidden="true">
                  {remainingForFreeShipping === 0 ? '🎉' : '🚚'}
                </span>
                <p className="text-[13px] text-white/90 font-medium">
                  {remainingForFreeShipping > 0 ? (
                    <>
                      Add <strong className="text-[#f78804] font-bold">Dhs. {remainingForFreeShipping.toFixed(2)}</strong> more for{' '}
                      <strong className="text-[#f78804] font-bold">FREE Shipping!</strong>
                    </>
                  ) : (
                    <strong className="text-[#10b981] font-bold">
                      You qualify for FREE Shipping across UAE!
                    </strong>
                  )}
                </p>
              </div>

              {/* Progress Track */}
              <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden shadow-inner my-1.5">
                <div
                  className="h-full bg-gradient-to-r from-[#b48648] to-[#f78804] rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(247,136,4,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Milestones */}
              <div className="flex justify-between items-center text-[11px] font-semibold text-white/60 pt-0.5">
                <span>$0</span>
                <span className={remainingForFreeShipping === 0 ? 'text-[#10b981] font-bold' : 'text-[#f78804]'}>
                  Dhs. 350
                </span>
              </div>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto px-6 divide-y divide-slate-100">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedFlavor}`}
                  className="py-4 flex gap-4 items-center"
                >
                  {/* Thumbnail */}
                  <div className="relative w-18 h-18 bg-[#f8fafc] rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 p-1">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-slate-900 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-[12px] text-slate-500 mt-0.5">
                      Flavor: <span className="text-slate-700 font-medium">{item.selectedFlavor}</span>
                    </p>
                    <p className="text-[14px] font-bold text-[#1a2f52] mt-1">
                      Dhs. {(item.product.price * item.quantity).toFixed(2)} AED
                    </p>

                    {/* Stepper + Remove */}
                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedFlavor)}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-[13px] font-bold text-slate-800 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedFlavor)}
                          className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedFlavor)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer / Subtotal & Checkout */}
            <div className="p-6 border-t border-slate-100 bg-white shadow-lg space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] uppercase tracking-wider font-semibold text-slate-500">
                  Estimated total
                </span>
                <span className="text-[22px] font-extrabold text-[#121212] tracking-tight">
                  Dhs. {totalPrice.toFixed(2)} AED
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                Taxes, discounts and shipping calculated at checkout. Cash on delivery available across UAE.
              </p>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-gradient-to-r from-[#b48648] via-[#d4973a] to-[#f78804] hover:shadow-xl hover:shadow-[#f78804]/30 hover:-translate-y-0.5 active:translate-y-0 text-white font-bold text-[15px] py-4 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
              >
                <span>Check out</span>
              </Link>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Secure & Encrypted Checkout</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
