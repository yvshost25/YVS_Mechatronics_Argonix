"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { 
  FileIcon, 
  Briefcase,
  Loader2
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { WelcomeBanner } from "@/components/ui/welcome-banner";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// Define the interface for dashboard stat
interface DashboardStat {
  name: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  colorScheme: {
    gradient: string;
    bg: string;
  };
}

export default function UserContent() {
  const { data: session } = useSession();
  const user = session?.user;
  
  // Fetch data from existing Convex queries
  const cadFiles = useQuery(api.cad_files.GetAllCADFiles) || [];
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];
  
  // Calculate counts
  const isLoading = cadFiles === undefined || portfolios === undefined;
  
  // Create stats dynamically based on query results
  const statCards = useMemo(() => [
    { 
      name: "My CAD Files", 
      value: isLoading ? "..." : cadFiles.length.toString(), 
      icon: FileIcon, 
      colorScheme: {
        gradient: "from-blue-500 to-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950/30"
      }
    },
    { 
      name: "My Portfolio", 
      value: isLoading ? "..." : portfolios.length.toString(), 
      icon: Briefcase, 
      colorScheme: {
        gradient: "from-purple-500 to-purple-600",
        bg: "bg-purple-50 dark:bg-purple-950/30"
      }
    },
  ], [cadFiles, portfolios, isLoading]);
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <WelcomeBanner username={user?.name || "User"} />
      
      {/* Stats cards */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
        {statCards.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            ) : stat.value}
            icon={stat.icon}
            colorScheme={stat.colorScheme}
          />
        ))}
      </div>
    </div>
  );
}