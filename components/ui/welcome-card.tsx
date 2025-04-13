"use client";

import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight, LayoutDashboard } from "lucide-react";

interface WelcomeCardProps {
  className?: string;
}

export function WelcomeCard({ className }: WelcomeCardProps) {
  const { data: session } = useSession();
  const user = session?.user;
  
  // Get first name only for greeting
  const firstName = user?.name?.split(" ")[0] || "User";
  
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
      transition={{ duration: 0.5 }}
      className={`rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 ${className}`}
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
        <div className="bg-white/70 dark:bg-gray-800/50 p-2 rounded-full shadow-sm">
          <LayoutDashboard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </motion.div>
  );
}
