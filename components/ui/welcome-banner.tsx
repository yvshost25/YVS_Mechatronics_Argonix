"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CalendarDays, ChevronRight } from "lucide-react";

interface WelcomeBannerProps {
  username: string;
  className?: string;
}

export function WelcomeBanner({ username, className }: WelcomeBannerProps) {
  // Get first name only for greeting
  const firstName = username?.split(" ")[0] || "User";
  
  // Get current time for appropriate greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  
  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-sm border border-gray-300 dark:border-gray-600",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {greeting}, {firstName}
          </h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
