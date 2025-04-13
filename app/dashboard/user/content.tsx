"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { WelcomeBanner } from "@/components/ui/welcome-banner";
import { 
  LayoutDashboard, 
  FileIcon, 
  UploadIcon, 
  Clock, 
  CheckCircle2, 
  Calendar,
  FileText,
  Folder,
  Activity
} from "lucide-react";

// Sample user stats
const userStats = [
  { name: "My CAD Files", value: "27", icon: FileIcon, color: "bg-blue-500" },
  { name: "Completed Projects", value: "8", icon: CheckCircle2, color: "bg-green-500" },
  { name: "Active Projects", value: "3", icon: Activity, color: "bg-amber-500" }
];

// Sample recent files
const recentFiles = [
  { id: 1, name: "Assembly_v2.0_final.cad", date: "Apr 10, 2025", size: "24.3 MB", type: "CAD File" },
  { id: 2, name: "Electric_schema_update.pdf", date: "Apr 9, 2025", size: "8.1 MB", type: "PDF" },
  { id: 3, name: "Motor_specifications.xlsx", date: "Apr 7, 2025", size: "1.2 MB", type: "Excel" },
  { id: 4, name: "Project_Timeline_Q2.pdf", date: "Apr 5, 2025", size: "3.5 MB", type: "PDF" },
];

// Sample upcoming tasks
const upcomingTasks = [
  { id: 1, title: "Project Review Meeting", date: "Apr 15, 2025", time: "10:00 AM" },
  { id: 2, title: "Submit Final CAD Designs", date: "Apr 18, 2025", time: "EOD" },
  { id: 3, title: "Training Session: New CAD Tools", date: "Apr 22, 2025", time: "2:00 PM" },
];

export default function UserContent() {
  const { data: session } = useSession();
  const user = session?.user;
  
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex justify-between items-center">
        <WelcomeBanner username={user?.name || "User"} className="flex-1" />
        <div className="ml-4">
          <Button asChild>
            <Link href="/dashboard/user/cad-files">
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload File
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        {userStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Main content */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent files section */}
        <Card className="lg:col-span-2 border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>Recent Files</CardTitle>
            <CardDescription>Your recently uploaded and accessed files</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">Name</th>
                    <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">Date</th>
                    <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">Size</th>
                    <th className="pb-3 text-left font-medium text-gray-500 dark:text-gray-400">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {recentFiles.map((file) => (
                    <tr key={file.id} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          <FileIcon className="mr-2 h-4 w-4 text-blue-500" />
                          {file.name}
                        </div>
                      </td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">{file.date}</td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">{file.size}</td>
                      <td className="py-3 text-gray-500 dark:text-gray-400">{file.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/dashboard/cad-files">
                  <Folder className="mr-2 h-4 w-4" />
                  View All Files
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming tasks section */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Schedule and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-2">
                    <Calendar className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      <span>{task.date}</span>
                      <span className="mx-1">•</span>
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      <span>{task.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                <FileText className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick access buttons */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center" asChild>
          <Link href="/dashboard/cad-files">
            <FileIcon className="h-6 w-6 mb-2" />
            <span>CAD Files</span>
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center" asChild>
          <Link href="/dashboard/portfolio">
            <Folder className="h-6 w-6 mb-2" />
            <span>Portfolio</span>
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center">
          <Activity className="h-6 w-6 mb-2" />
          <span>Analytics</span>
        </Button>
      </div>
    </div>
  );
}
