"use client";

import { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="min-h-screen">
        {children}
      </div>
    </Suspense>
  );
}
