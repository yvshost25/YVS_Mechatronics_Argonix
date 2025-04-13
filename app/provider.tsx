"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Move usePathname inside the component
  const isDashboard = pathname.includes("/dashboard");
  const isAuth = pathname.includes("/auth");
  const isPublicPage = !isDashboard && !isAuth;

  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="light" storageKey="yvs-theme">
        <ConvexProvider client={convex}>
          <Toaster richColors position="top-right" />
          {/* Only show the public website Header on public routes */}
          {isPublicPage && <Header />}
          {children}
          {isPublicPage && <Footer />}
        </ConvexProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

export default Provider;