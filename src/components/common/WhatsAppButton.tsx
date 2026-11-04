'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '971551688299';
  const message = encodeURIComponent('Hello Vape Stall UAE, I would like to inquire about your vape products.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 sm:px-5 sm:py-3 rounded-full shadow-2xl flex items-center space-x-2 transition-all transform hover:scale-105 group border-2 border-emerald-400/30"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
      <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
        Chat with Us
      </span>
    </a>
  );
};

