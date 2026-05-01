"use client";

import dynamic from "next/dynamic";

const MenuApp = dynamic(() => import("@/components/MenuApp"), {
  ssr: false,
});

export default function GuestMenuPage() {
  return <MenuApp />;
}
