'use client';

import React, { createContext, useContext, useState } from 'react';
import { Product } from '@/types';
import { QuickViewModal, QuickViewProductData } from '@/components/product/QuickViewModal';

interface QuickViewContextType {
  openQuickView: (product: Product | QuickViewProductData) => void;
  closeQuickView: () => void;
  quickViewProduct: (Product | QuickViewProductData) | null;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quickViewProduct, setQuickViewProduct] = useState<(Product | QuickViewProductData) | null>(null);

  const openQuickView = (product: Product | QuickViewProductData) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ openQuickView, closeQuickView, quickViewProduct }}>
      {children}
      <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
    </QuickViewContext.Provider>
  );
};

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  return context;
};
