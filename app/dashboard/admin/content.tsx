"use client";

import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { 
  FileIcon, 
  FileText, 
  Users, 
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

export default function AdminContent() {
  const { data: session } = useSession();
  const user = session?.user;
  
  // Fetch data from existing Convex queries
  const cadFiles = useQuery(api.cad_files.GetAllCADFiles) || [];
  const employees = useQuery(api.employees.getEmployees) || [];
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];
  const invoices = useQuery(api.invoices.getInvoices) || [];
  
  // Calculate counts
  const isLoading = cadFiles === undefined || employees === undefined || 
                    portfolios === undefined || invoices === undefined;
  
  // Create stats dynamically based on query results
  const statCards = useMemo(() => [
    { 
      name: "Total CAD Files", 
      value: cadFiles === undefined ? "..." : cadFiles.length.toString(), 
      icon: FileIcon, 
      colorScheme: {
        gradient: "from-blue-500 to-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950/30"
      }
    },
    { 
      name: "Total Users", 
      value: employees === undefined ? "..." : employees.length.toString(), 
      icon: Users, 
      colorScheme: {
        gradient: "from-emerald-500 to-emerald-600",
        bg: "bg-emerald-50 dark:bg-emerald-950/30"
      }
    },
    { 
      name: "Total Portfolio", 
      value: portfolios === undefined ? "..." : portfolios.length.toString(), 
      icon: Briefcase, 
      colorScheme: {
        gradient: "from-purple-500 to-purple-600",
        bg: "bg-purple-50 dark:bg-purple-950/30"
      }
    },
    { 
      name: "Total Invoices", 
      value: invoices === undefined ? "..." : invoices.length.toString(), 
      icon: FileText, 
      colorScheme: {
        gradient: "from-amber-500 to-amber-600",
        bg: "bg-amber-50 dark:bg-amber-950/30"
      }
    },
  ], [cadFiles, employees, portfolios, invoices]);
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <WelcomeBanner username={user?.name || "Admin"} />
      
      {/* Stats cards */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard
            key={stat.name}
            title={stat.name}
            value={stat.value}
            icon={stat.icon}
            colorScheme={stat.colorScheme}
          />
        ))}
      </div>
    </div>
  );
}