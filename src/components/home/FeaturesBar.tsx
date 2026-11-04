'use client';

import React from 'react';
import { Truck, ShieldCheck, Wallet, Clock } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery in UAE',
    description: 'Same day in Dubai, rapid shipping across all 7 Emirates.'
  },
  {
    icon: ShieldCheck,
    title: '100% Authentic Products',
    description: 'Original brand verification with anti-counterfeit guarantee.'
  },
  {
    icon: Wallet,
    title: 'Cash on Delivery (COD)',
    description: 'Pay conveniently by cash or card upon delivery.'
  },
  {
    icon: Clock,
    title: 'Dedicated Customer Care',
    description: 'Direct WhatsApp and phone assistance 10 AM – 10 PM.'
  }
];

export const FeaturesBar: React.FC = () => {
  return (
    <section className="bg-slate-950 py-10 border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl bg-dark-card/50 border border-dark-border/60 hover:border-brand-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

