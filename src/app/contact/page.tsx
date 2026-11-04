'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Order Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      alert('Please fill in your name and message.');
      return;
    }
    setSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/971551688299?text=${encodeURIComponent(
    `Hello Vape Stall, my name is ${formData.name || 'a customer'}. I have a query regarding ${formData.topic}.`
  )}`;

  return (
    <div className="py-12 lg:py-20 bg-dark-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3 mb-2 tracking-tight">
            Contact Vape Stall UAE
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Have questions about your order, product specifications, or wholesale? Reach out to our Dubai customer care team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-dark-card border border-dark-border rounded-3xl p-8 space-y-8 shadow-xl">
            <h2 className="text-xl font-bold text-white border-l-4 border-brand-500 pl-3">
              Store Information
            </h2>

            <div className="space-y-6 text-xs sm:text-sm text-gray-300">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Physical Address</h4>
                  <p className="text-gray-400">All Warsan 1, Dubai, United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Phone &amp; WhatsApp Support</h4>
                  <a href="tel:+971551688299" className="text-brand-400 font-semibold hover:underline block">
                    +971 55 168 8299
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Email Inquiries</h4>
                  <a href="mailto:vapestallae@gmail.com" className="text-brand-400 hover:underline block">
                    vapestallae@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-0.5">Working Hours</h4>
                  <p className="text-gray-400">Monday – Friday: 10:00 AM – 10:00 PM (GST)</p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-dark-border">
              <a
                href="https://wa.me/971551688299"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-6 rounded-2xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-dark-card border border-dark-border rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Our customer care representative will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', topic: 'Order Inquiry', message: '' });
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <h3 className="text-lg font-bold text-white pb-2 border-b border-dark-border">
                  Send Us a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tariq Khan"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 55 123 4567"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 font-semibold mb-1.5">Subject / Topic</label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                    >
                      <option value="Order Inquiry">Order Inquiry</option>
                      <option value="Product Question">Product Question</option>
                      <option value="Returns / Exchanges">Returns / Exchanges</option>
                      <option value="Wholesale Partnership">Wholesale Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1.5">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our customer support team assist you today?"
                    className="w-full bg-slate-900 border border-dark-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-brand-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
