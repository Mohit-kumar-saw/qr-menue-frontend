"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartFloatingButton = () => {
  const { cartCount, cartTotal, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-[#021d4f] text-white p-4 rounded-3xl shadow-2xl flex items-center justify-between hover:bg-blue-950 transition-all active:scale-95"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag size={24} className="text-amber-500" />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm">
                  {cartCount}
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">View Cart</span>
                <span className="font-serif font-semibold">{cartCount} Items</span>
              </div>
            </div>
            <div className="font-serif font-bold text-lg text-amber-500">
              ₹{cartTotal}
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
