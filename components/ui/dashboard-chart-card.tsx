"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  timeRanges?: string[];
  onTimeRangeChange?: (range: string) => void;
}

export function DashboardChartCard({
  title,
  subtitle,
  className,
  children,
  timeRanges = ["7D", "1M", "3M", "1Y", "All"],
  onTimeRangeChange,
}: ChartCardProps) {
  const [activeRange, setActiveRange] = useState(timeRanges[0]);

  const handleRangeClick = (range: string) => {
    setActiveRange(range);
    if (onTimeRangeChange) {
      onTimeRangeChange(range);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className={cn("border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <CardTitle className="text-xl font-semibold">{title}</CardTitle>
              {subtitle && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
            
            {timeRanges && (
              <div className="flex items-center rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                {timeRanges.map((range) => (
                  <Button
                    key={range}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRangeClick(range)}
                    className={cn(
                      "text-xs px-3 py-1 h-auto rounded-md",
                      activeRange === range
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    {range}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Chart content */}
          <div className="pt-2">
            {children ? (
              children
            ) : (
              <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Chart placeholder</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
