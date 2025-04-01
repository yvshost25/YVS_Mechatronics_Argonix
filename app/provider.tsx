"use client"
import React from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Toaster } from 'sonner';

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

function Provider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <ConvexProvider client={convex}>
                <Toaster/>
                {children}
            </ConvexProvider>
        </div>
    )
}

export default Provider