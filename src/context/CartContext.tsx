'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, flavor?: string) => void;
  removeFromCart: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAgeVerified: boolean;
  verifyAge: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(true); // default true for SSR, check in useEffect

  // Load cart and age verification from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('vapstall_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const verified = localStorage.getItem('vapstall_age_verified');
      if (verified === 'true') {
        setIsAgeVerified(true);
      } else {
        setIsAgeVerified(false);
      }
    } catch (e) {
      console.error('Error loading from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vapstall_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }, [cart]);

  const verifyAge = () => {
    setIsAgeVerified(true);
    try {
      localStorage.setItem('vapstall_age_verified', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const addToCart = (product: Product, quantity = 1, flavor?: string) => {
    const selectedFlavor = flavor || (product.flavors && product.flavors[0]) || 'Standard';

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedFlavor === selectedFlavor
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, quantity, selectedFlavor }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, flavor?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        if (flavor) {
          return !(item.product.id === productId && item.selectedFlavor === flavor);
        }
        return item.product.id !== productId;
      })
    );
  };

  const updateQuantity = (productId: string, quantity: number, flavor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, flavor);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId && (!flavor || item.selectedFlavor === flavor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
        isCartOpen,
        setIsCartOpen,
        isAgeVerified,
        verifyAge,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

