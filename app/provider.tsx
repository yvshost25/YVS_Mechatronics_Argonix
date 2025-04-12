"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Move usePathname inside the component
  const isDashboard = pathname.includes("/dashboard");

  return (
    <div>
      <ConvexProvider client={convex}>
        <Toaster />
        {children}
        {!isDashboard && <Footer />}
      </ConvexProvider>
    </div>
  );
}

export default Provider;