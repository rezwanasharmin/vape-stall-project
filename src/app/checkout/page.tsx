'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, CheckCircle2, ArrowRight, Truck, Phone, MessageCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const emirates = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
];

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    emirate: 'Dubai',
    cityArea: '',
    streetAddress: '',
    notes: '',
    paymentMethod: 'cod', // Cash on Delivery
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingFee = totalPrice >= 350 || totalPrice === 0 ? 0 : 20;
  const finalTotal = totalPrice + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.streetAddress) {
      alert('Please fill in your name, phone number, and address.');
      return;
    }

    // Generate random order ID
    const randomId = 'VS-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    const whatsappText = encodeURIComponent(
      `Hello Vape Stall UAE, I just placed Order #${orderNumber} for AED ${finalTotal.toFixed(2)} to ${formData.emirate} (${formData.fullName}, Phone: ${formData.phone}). Please confirm delivery!`
    );

    return (
      <div className="py-20 bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="max-w-xl w-full mx-4 bg-dark-card border border-dark-border rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Order Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-black text-white mt-4 mb-2">
            Thank You, {formData.fullName}!
          </h1>

          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            Your order <strong>#{orderNumber}</strong> has been successfully received. Our dispatch team in Dubai is preparing your package for fast UAE delivery.
          </p>

          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-left text-xs space-y-2 mb-8">
            <div className="flex justify-between">
              <span className="text-gray-400">Order ID:</span>
              <span className="font-mono font-bold text-white">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Delivery To:</span>
              <span className="text-white font-medium">{formData.cityArea}, {formData.emirate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Payment:</span>
              <span className="text-brand-400 font-bold">
                AED {finalTotal.toFixed(2)} (Cash on Delivery)
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/971551688299?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center justify-center space-x-2 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Confirm via WhatsApp</span>
            </a>

            <Link
              href="/"
              className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-xl text-xs flex items-center justify-center transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Checkout &amp; Delivery Details
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mb-8">
          Complete your UAE shipping details below. Cash on Delivery (COD) available for all Emirates.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Delivery Form */}
            <div className="lg:col-span-7 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2 pb-3 border-b border-dark-border">
                <Truck className="w-5 h-5 text-brand-400" />
                <span>Shipping Address in UAE</span>
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Salem Al-Ketbi"
                    className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="salem@example.com"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Emirate *
                    </label>
                    <select
                      name="emirate"
                      value={formData.emirate}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    >
                      {emirates.map((em) => (
                        <option key={em} value={em}>{em}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">
                      Area / Neighborhood *
                    </label>
                    <input
                      type="text"
                      required
                      name="cityArea"
                      value={formData.cityArea}
                      onChange={handleChange}
                      placeholder="e.g. Downtown Dubai, JLT, Al Barsha"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">
                    Street Address &amp; Villa/Apartment Number *
                  </label>
                  <input
                    type="text"
                    required
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    placeholder="Building name, Apartment 402, Street name"
                    className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">
                    Delivery Instructions / Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Call before arrival, leave with security, etc."
                    className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="pt-6 border-t border-dark-border space-y-3">
                <h3 className="text-sm font-bold text-white">Payment Method</h3>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center space-x-3 p-3.5 bg-slate-900 border border-brand-500/50 rounded-xl cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="accent-brand-500 w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white block">Cash on Delivery (COD)</span>
                      <span className="text-gray-400 text-[11px]">Pay with cash when your driver delivers your package.</span>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-3.5 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-slate-700">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="accent-brand-500 w-4 h-4"
                    />
                    <div>
                      <span className="font-bold text-white block">Card on Delivery</span>
                      <span className="text-gray-400 text-[11px]">Pay with Credit/Debit card via portable POS terminal on delivery.</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 className="text-base sm:text-lg font-bold text-white pb-3 border-b border-dark-border">
                Order Review ({cart.length} items)
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedFlavor}`} className="flex items-center justify-between text-xs py-1">
                    <div className="flex items-center space-x-2.5 min-w-0 flex-1">
                      <div className="relative w-10 h-10 bg-slate-800 rounded-md overflow-hidden flex-shrink-0">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-contain p-0.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white truncate">{item.product.name}</p>
                        <p className="text-[10px] text-gray-400">{item.selectedFlavor} &times; {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-white pl-3">
                      AED {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-dark-border text-xs text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-semibold">AED {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>UAE Delivery:</span>
                  <span className="text-white font-semibold">
                    {shippingFee === 0 ? <span className="text-emerald-400 uppercase font-bold">FREE</span> : `AED ${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-dark-border flex justify-between text-base font-extrabold text-white">
                  <span>Total Due on Delivery:</span>
                  <span className="text-brand-400">AED {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 text-slate-950 font-black py-4 px-6 rounded-2xl text-sm transition-all shadow-xl shadow-brand-500/20 flex items-center justify-center space-x-2"
              >
                <span>Confirm Order (Cash on Delivery)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-gray-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Guaranteed Authentic &bull; Official UAE Warranty</span>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}

