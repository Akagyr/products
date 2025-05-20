'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import Cookies from 'js-cookie';

type CartContextType = {
  cartItems: Product[];
  isLoading: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCart: () => Product[];
  clearCart: () => void;
};

const CART_IDS_COOKIE = 'cart_ids';
const COOKIE_EXPIRY_DAYS = 7;

const CartContext = createContext<CartContextType | undefined>(undefined);

async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  try {
    if (ids.length === 0) return [];

    const response = await fetch(`/api/cart?ids=${ids.join(',')}`);

    if (!response.ok) {
      throw new Error('Помилка завантаження товарів');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching cart products:', error);
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cartIds, setCartIds] = useState<string[]>([]);

  const saveCartIdsToCookie = (ids: string[]) => {
    if (ids.length > 0) {
      Cookies.set(CART_IDS_COOKIE, JSON.stringify(ids), {
        expires: COOKIE_EXPIRY_DAYS,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
    } else {
      Cookies.remove(CART_IDS_COOKIE);
    }
  };

  useEffect(() => {
    const loadCartFromCookies = async () => {
      setIsLoading(true);

      const savedCartIds = Cookies.get(CART_IDS_COOKIE);

      if (savedCartIds) {
        try {
          const ids = JSON.parse(savedCartIds) as string[];
          setCartIds(ids);

          if (ids.length > 0) {
            const products = await fetchProductsByIds(ids);
            setCartItems(products);

            products.forEach((product) => {
              localStorage.setItem(`product_${product.id}`, JSON.stringify(product));
            });
          }
        } catch (error) {
          console.error('Failed to parse cart IDs from cookies:', error);
          Cookies.remove(CART_IDS_COOKIE);
        }
      }

      setIsLoading(false);
    };

    loadCartFromCookies();
  }, []);

  useEffect(() => {
    saveCartIdsToCookie(cartIds);
  }, [cartIds]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems;
      }

      return [...prevItems, product];
    });

    setCartIds((prevIds) => {
      if (prevIds.includes(product.id)) {
        return prevIds;
      }
      return [...prevIds, product.id];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));

    setCartIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  const getCart = () => {
    return cartItems;
  };

  const clearCart = () => {
    setCartItems([]);
    setCartIds([]);
    Cookies.remove(CART_IDS_COOKIE);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        removeFromCart,
        getCartTotal,
        getCartCount,
        getCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
