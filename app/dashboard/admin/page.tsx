"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// This is just a redirect page
export default function AdminPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the main dashboard which will show the admin view
    router.push("/dashboard");
  }, [router]);
  
  return (
    <div className="flex h-full w-full items-center justify-center py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-300 dark:border-gray-600 shadow-xl"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-purple-200 dark:bg-purple-900/30 animate-ping opacity-30"></div>
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 dark:text-purple-400 relative z-10" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Loading admin dashboard...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">You'll be redirected shortly</p>
        </div>
      </motion.div>
    </div>
  );
}
