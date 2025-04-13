"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  colorScheme: {
    gradient: string;
    bg: string;
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  colorScheme,
  className,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="border border-gray-300 dark:border-gray-600 shadow-md overflow-hidden rounded-xl hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
        <CardContent className="p-0">
          <div className="flex flex-col">
            <div className={cn("p-6", colorScheme.bg)}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {title}
                  </p>
                  <h3 className="text-3xl font-bold mt-1 text-gray-900 dark:text-white">
                    {value}
                  </h3>
                </div>
                <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg", colorScheme.gradient)}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    className={cn("h-full rounded-full bg-gradient-to-r", colorScheme.gradient)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
