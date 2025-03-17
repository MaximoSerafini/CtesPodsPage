import React, { createContext, useContext, useState } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, selectedFlavorIndex: number) => void;
  removeFromCart: (productId: number, selectedFlavorIndex: number) => void;
  updateQuantity: (productId: number, selectedFlavorIndex: number, quantity: number) => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, selectedFlavorIndex: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => 
        item.product.id === product.id && 
        item.selectedFlavorIndex === selectedFlavorIndex
      );
      
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentItems;
        }
        return currentItems.map(item =>
          item.product.id === product.id && item.selectedFlavorIndex === selectedFlavorIndex
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...currentItems, { product, quantity: 1, selectedFlavorIndex }];
    });
  };

  const removeFromCart = (productId: number, selectedFlavorIndex: number) => {
    setItems(currentItems => currentItems.filter(item => 
      !(item.product.id === productId && item.selectedFlavorIndex === selectedFlavorIndex)
    ));
  };

  const updateQuantity = (productId: number, selectedFlavorIndex: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId, selectedFlavorIndex);
      return;
    }
    
    setItems(currentItems => {
      const item = currentItems.find(item => 
        item.product.id === productId && 
        item.selectedFlavorIndex === selectedFlavorIndex
      );
      
      if (!item || quantity > item.product.stock) {
        return currentItems;
      }
      
      return currentItems.map(item =>
        item.product.id === productId && item.selectedFlavorIndex === selectedFlavorIndex
          ? { ...item, quantity }
          : item
      );
    });
  };

  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}