"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    // Complete splash screen after 2.5 seconds (gives time for fade animation)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#021d4f] transition-opacity duration-500",
        isFadingOut ? "opacity-0" : "opacity-100"
      )}
    >
      <div className="relative w-64 h-64 md:w-80 md:h-80 animate-in fade-in zoom-in duration-1000">
        <Image
          src="/logo-splash.jpeg"
          alt="The Bliss Palampur Splash"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="absolute bottom-16 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
