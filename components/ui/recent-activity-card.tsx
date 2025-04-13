"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string | number;
  title: string;
  description?: string;
  timestamp: string;
  icon: LucideIcon;
  iconColor: string;
}

interface RecentActivityCardProps {
  title: string;
  viewAllLink?: string;
  activities: ActivityItem[];
  className?: string;
  onViewAll?: () => void;
}

export function RecentActivityCard({
  title,
  viewAllLink,
  activities,
  className,
  onViewAll,
}: RecentActivityCardProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Card className={cn("border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          {(viewAllLink || onViewAll) && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onViewAll}
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              View all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {activities.length > 0 ? (
            activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className={cn("p-2 rounded-full", `bg-${activity.iconColor}-100 dark:bg-${activity.iconColor}-900/30`)}>
                    <Icon className={cn("h-4 w-4", `text-${activity.iconColor}-600 dark:text-${activity.iconColor}-400`)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{activity.timestamp}</span>
                    </div>
                    {activity.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{activity.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  );
}
