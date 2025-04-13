"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardBackgroundProps {
  className?: string;
}

export function DashboardBackground({ className }: DashboardBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* Background with subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 via-blue-50/10 to-indigo-50/10 dark:from-gray-950/30 dark:via-blue-950/10 dark:to-indigo-950/10" />
      
      {/* Animated blob decorations */}
      <motion.div
        className="absolute top-[20%] right-[10%] h-64 w-64 rounded-full bg-blue-300/10 dark:bg-blue-600/5 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 10, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-[10%] left-[5%] h-72 w-72 rounded-full bg-indigo-300/10 dark:bg-indigo-500/5 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      
      <motion.div
        className="absolute top-[40%] left-[20%] h-56 w-56 rounded-full bg-purple-300/10 dark:bg-purple-600/5 blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}
