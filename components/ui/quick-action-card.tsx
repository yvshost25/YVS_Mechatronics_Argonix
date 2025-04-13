"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorScheme: {
    light: string;
    medium: string;
    dark: string;
  };
  className?: string;
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  colorScheme,
  className,
}: QuickActionCardProps) {
  return (
    <Link href={href}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative group overflow-hidden rounded-xl border border-gray-300 dark:border-gray-600 p-6 shadow-sm transition-all duration-300",
          `hover:shadow-lg hover:shadow-${colorScheme.light}/10 hover:border-${colorScheme.medium}`,
          className
        )}
      >
        <div className="flex items-start gap-5">
          <div className={cn(
            "p-3 rounded-xl bg-gradient-to-br shadow-md",
            `from-${colorScheme.medium} to-${colorScheme.dark}`
          )}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          </div>
        </div>
        
        {/* Background hover effect */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br",
          `from-${colorScheme.light} to-${colorScheme.medium}`
        )} />
        
        {/* Animated border effect */}
        <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-in-out bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </motion.div>
    </Link>
  );
}
