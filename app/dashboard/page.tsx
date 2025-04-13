"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  // Dynamically import admin or user dashboard content based on role
  const userRole = session?.user?.role || "user";
  
  // Use dynamic imports to load the appropriate dashboard content
  const AdminContent = dynamic(() => import('./admin/content'), { 
    loading: () => <DashboardLoader text="Loading admin dashboard..." /> 
  });
  
  const UserContent = dynamic(() => import('./user/content'), { 
    loading: () => <DashboardLoader text="Loading user dashboard..." /> 
  });
  
  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
    
    // Handle redirect if not authenticated
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);
  
  // Show loader while checking session or redirecting
  if (isLoading || status === "unauthenticated") {
    return <DashboardLoader text={status === "unauthenticated" ? "Redirecting to login..." : "Loading your dashboard..."} />;
  }
  
  return (
    <div>
      {userRole === "admin" ? <AdminContent /> : <UserContent />}
    </div>
  );
}

function DashboardLoader({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center justify-center py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center space-y-4 p-8 rounded-2xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-xl"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-indigo-200 dark:bg-indigo-900/30 animate-ping opacity-30"></div>
          <Loader2 className="h-12 w-12 animate-spin text-indigo-600 dark:text-indigo-400 relative z-10" />
        </div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">{text}</p>
      </motion.div>
    </div>
  );
}
