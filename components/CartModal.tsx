"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartModal = () => {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          key="cart-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center p-0 sm:p-6 overflow-hidden"
        >
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />

          <motion.div
            key="cart-modal-container"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                  <ShoppingBag size={20} />
                </div>
                <h2 className="font-serif font-semibold text-2xl text-zinc-900">Your Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 bg-zinc-50 text-zinc-400 rounded-xl flex items-center justify-center hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-400">
                  <ShoppingBag size={48} className="mb-4 opacity-20" />
                  <p className="font-medium">Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.dishId} className="flex gap-4 items-center bg-zinc-50 p-3 rounded-2xl">
                    <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-zinc-100" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-zinc-900 truncate">{item.name}</h4>
                      <div className="text-sm font-bold text-blue-950 mt-1">₹{item.price}</div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-zinc-200 p-1">
                        <button onClick={() => updateQuantity(item.dishId, -1)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-100 text-zinc-600">
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center font-semibold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.dishId, 1)} className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-zinc-100 text-zinc-600">
                          <Plus size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.dishId)} className="text-red-400 hover:text-red-500 text-xs font-semibold flex items-center gap-1">
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-50 border-t border-zinc-100 rounded-b-[2.5rem] sm:rounded-b-[2.5rem] pb-8 sm:pb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif text-lg text-zinc-500">Total Estimate</span>
                  <span className="font-serif font-semibold text-2xl text-zinc-900">₹{cartTotal}</span>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={clearCart}
                    className="flex-1 py-4 rounded-2xl font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex-[2] py-4 rounded-2xl font-semibold text-white bg-zinc-900 hover:bg-blue-950 transition-colors shadow-lg"
                  >
                    Done Reviewing
                  </button>
                </div>
                <p className="text-center text-xs text-zinc-400 mt-4 font-medium uppercase tracking-wider">
                  Review only. Orders cannot be placed.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
