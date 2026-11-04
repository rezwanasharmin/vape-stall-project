'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const AgeVerificationModal: React.FC = () => {
  const { isAgeVerified, verifyAge } = useCart();

  if (isAgeVerified) {
    return null;
  }

  const handleUnderAge = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-dark-card border border-dark-border rounded-2xl p-6 sm:p-8 text-center shadow-2xl">
        {/* Logo */}
        <div className="relative h-12 w-40 mx-auto mb-6">
          <Image
            src="/images/logo.png"
            alt="Vape Stall"
            fill
            className="object-contain"
          />
        </div>

        {/* Warning Icon & Title */}
        <div className="w-14 h-14 mx-auto rounded-full bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          Age Verification Required (21+)
        </h2>

        <p className="text-sm text-gray-300 leading-relaxed mb-6">
          You must be <strong>21 years of age or older</strong> to enter and purchase from Vape Stall. Under UAE regulations, vaping products are strictly restricted to legal adults.
        </p>

        <p className="text-xs text-amber-400 font-medium mb-6 bg-amber-500/10 py-2 px-3 rounded-lg border border-amber-500/20">
          Are you 21 years of age or older?
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={verifyAge}
            className="flex-1 bg-brand-500 hover:bg-brand-600 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-brand-500/20"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>I am 21 or Older</span>
          </button>

          <button
            type="button"
            onClick={handleUnderAge}
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-gray-300 font-medium py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-colors border border-slate-700"
          >
            <XCircle className="w-5 h-5" />
            <span>Exit / Under 21</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-500 mt-6">
          By clicking &apos;I am 21 or Older&apos;, you confirm that you meet the legal age requirements in the United Arab Emirates.
        </p>
      </div>
    </div>
  );
};

