"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Info, UtensilsCrossed, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuProvider, useMenu } from "@/context/MenuContext";
import { DishCard } from "@/components/DishCard";
import { DishDetailModal } from "@/components/DishDetailModal";

function MenuContent() {
  const { categories, menuItems, loading } = useMenu();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showItemDetail, setShowItemDetail] = useState<any>(null);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category?._id === selectedCategory || item.category === selectedCategory || item.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = categories.filter(c => c.name !== "All").map(cat => ({
    category: cat,
    items: filteredItems.filter(item => item.category?._id === cat._id || item.category === cat._id)
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Premium Header/Search Section */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-2xl px-6 pt-10 pb-6 space-y-8 border-b border-zinc-100/50 shadow-sm animate-in slide-in-from-top duration-1000">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-zinc-900 rounded-[1.25rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-500 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
               <Image src="/logo.png" alt="Logo" width={36} height={36} priority className="relative z-10" style={{ width: 'auto', height: 'auto' }} />
            </div>
            <div>
              <h1 className="font-black text-2xl tracking-tighter leading-none text-zinc-900">Tasty<span className="text-emerald-500">Bytes</span></h1>
              <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-[0.3em] font-black opacity-60">Digital Experience</p>
            </div>
          </div>
          <button className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-all active:scale-95">
            <Info size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-emerald-500 transition-colors" size={24} />
          <input 
            type="text" 
            placeholder="Search your craving..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 bg-zinc-50 border-none rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:bg-white transition-all outline-none text-zinc-900 placeholder:text-zinc-300 font-bold text-lg shadow-inner"
          />
        </div>

        {/* Categories Slider */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              className={cn(
                "px-6 py-3 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all border-2",
                (selectedCategory === cat._id)
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-xl shadow-zinc-200" 
                  : "bg-white text-zinc-400 border-zinc-50 hover:bg-zinc-50 hover:border-zinc-100"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <main className="px-6 py-12 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="relative w-20 h-20 mb-8">
               <div className="absolute inset-0 border-4 border-emerald-50 border-t-emerald-500 rounded-full animate-spin" />
               <div className="absolute inset-4 border-4 border-zinc-50 border-b-zinc-900 rounded-full animate-spin-slow" />
            </div>
            <p className="text-zinc-400 text-sm font-black uppercase tracking-[0.3em] animate-pulse">Igniting the kitchen...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-32 px-8">
            <div className="w-32 h-32 bg-zinc-50 rounded-[3rem] flex items-center justify-center mx-auto mb-8 text-zinc-200 shadow-inner">
              <Search size={56} />
            </div>
            <h3 className="text-3xl font-black text-zinc-900 tracking-tighter mb-4 leading-none">NO FLAVORS FOUND</h3>
            <p className="text-zinc-400 font-medium max-w-xs mx-auto leading-relaxed">We couldn't find any dishes matching your search. Try broadening your horizon!</p>
            <button 
              onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              className="mt-10 bg-emerald-50 text-emerald-600 px-8 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-emerald-100 transition-all flex items-center gap-3 mx-auto active:scale-95"
            >
              Reset exploration <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-20">
            {selectedCategory === "All" ? (
              groupedItems.map((group) => (
                <div key={group.category._id} className="space-y-10 group/section">
                  <div className="flex items-center gap-6">
                    <h3 className="text-4xl font-black tracking-tighter text-zinc-900 group-hover/section:text-emerald-500 transition-colors uppercase leading-[0.8]">{group.category.name}</h3>
                    <div className="h-[2px] flex-1 bg-zinc-50 group-hover/section:bg-emerald-50 transition-colors"></div>
                    <span className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em] group-hover/section:text-emerald-300 transition-colors">{group.items.length} OPTIONS</span>
                  </div>
                  <div className="grid grid-cols-1 gap-8">
                    {group.items.map((item, idx) => (
                      <DishCard key={item._id} item={item} index={idx} onClick={() => setShowItemDetail(item)} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 gap-8 pt-6">
                {filteredItems.map((item, idx) => (
                  <DishCard key={item._id} item={item} index={idx} onClick={() => setShowItemDetail(item)} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Premium Footer */}
      <footer className="p-16 bg-zinc-950 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.05),transparent)] pointer-events-none" />
        <div className="flex flex-col items-center justify-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-lg border border-white/5 group">
            <UtensilsCrossed className="text-emerald-500 group-hover:rotate-45 transition-transform duration-700" size={32} />
          </div>
          <span className="font-black text-2xl text-white tracking-tighter">Tasty<span className="text-emerald-500">Bytes</span></span>
        </div>
        <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed relative z-10 italic">
          Experience the future of dining through our premium digital catalog. Freshness guaranteed.
        </p>
        <div className="pt-8 flex flex-col items-center justify-center gap-1 relative z-10">
            <div className="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.5em] mb-2">SERVICE HOURS</div>
            <div className="text-white font-black text-xl tracking-tighter">8:00 AM — 10:00 PM</div>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mt-4 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
        </div>
      </footer>

      <DishDetailModal 
        item={showItemDetail} 
        isOpen={!!showItemDetail} 
        onClose={() => setShowItemDetail(null)} 
      />
    </div>
  );
}

export default function MenuApp() {
  return (
    <MenuProvider>
      <MenuContent />
    </MenuProvider>
  );
}
