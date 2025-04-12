import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TypographyH3, TypographyP } from "@/components/ui/typography"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  className?: string
  iconClassName?: string
  contentClassName?: string
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
  iconClassName,
  contentClassName
}: FeatureCardProps) {
  return (
    <Card className={cn("h-full shadow-md border-2 border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600 group relative overflow-hidden", className)}>
      {/* Background gradient decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 dark:from-blue-900/5 dark:to-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
      
      <CardContent className={cn("p-6 relative", contentClassName)}>
        {icon && (
          <div className={cn("w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform duration-300 shadow-sm", iconClassName)}>
            <div className="flex items-center justify-center w-full h-full p-3">
              {/* Simple wrapper with fixed dimensions */}
              <div className="w-12 h-12 flex items-center justify-center">
                {icon}
              </div>
            </div>
          </div>
        )}
        <TypographyH3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{title}</TypographyH3>
        <TypographyP className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mt-0">{description}</TypographyP>
      </CardContent>
    </Card>
  )
}

interface FeatureCardWithBorderProps extends FeatureCardProps {
  borderColor?: string
}

export function FeatureCardWithBorder({
  title,
  description,
  icon,
  className,
  iconClassName,
  contentClassName,
  borderColor = "border-t-blue-600 dark:border-t-blue-500"
}: FeatureCardWithBorderProps) {
  return (
    <Card className={cn(`h-full shadow-md border border-slate-200 dark:border-slate-700 border-t-4 ${borderColor} transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]`, className)}>
      {/* Card background */}
      <div className="absolute inset-0 bg-white dark:bg-slate-800"></div>
      
      {/* Subtle hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 to-indigo-50/10 dark:from-blue-900/5 dark:to-indigo-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <CardContent className={cn("p-6 relative z-10", contentClassName)}>
        {icon && (
          <div className={cn("w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-4", iconClassName)}>
            <div className="w-10 h-10 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
        <TypographyH3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{title}</TypographyH3>
        <TypographyP className="text-base text-slate-700 dark:text-slate-300 leading-relaxed mt-0">{description}</TypographyP>
      </CardContent>
    </Card>
  )
}