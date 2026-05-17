"use client";

import React, { createContext, useContext, useState } from "react";

export interface CartItem {
  dishId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  categoryName?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (dishId: string) => void;
  updateQuantity: (dishId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Calculate totals
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToCart = (dish: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.dishId === dish._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.dishId === dish._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          dishId: dish._id,
          name: dish.name,
          price: dish.price,
          quantity: 1,
          image: dish.image,
          categoryName: dish.category?.name,
        },
      ];
    });
  };

  const removeFromCart = (dishId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.dishId !== dishId));
  };

  const updateQuantity = (dishId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.dishId === dishId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
