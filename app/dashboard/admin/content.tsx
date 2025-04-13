"use client";

import { useSession } from "next-auth/react";
import { 
  FileIcon, 
  FileText, 
  Users, 
  Briefcase,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { WelcomeBanner } from "@/components/ui/welcome-banner";

// Sample stats data for display
const stats = [
  { 
    name: "Total CAD Files", 
    value: "124", 
    icon: FileIcon, 
    colorScheme: {
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30"
    }
  },
  { 
    name: "Total Users", 
    value: "12", 
    icon: Users, 
    colorScheme: {
      gradient: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-950/30"
    }
  },
  { 
    name: "Total Portfolio", 
    value: "36", 
    icon: Briefcase, 
    colorScheme: {
      gradient: "from-purple-500 to-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30"
    }
  },
  { 
    name: "Total Invoices", 
    value: "87", 
    icon: FileText, 
    colorScheme: {
      gradient: "from-amber-500 to-amber-600",
      bg: "bg-amber-50 dark:bg-amber-950/30"
    }
  },
];

export default function AdminContent() {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <WelcomeBanner username={user?.name || "Admin"} />
      
      {/* Stats cards */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
