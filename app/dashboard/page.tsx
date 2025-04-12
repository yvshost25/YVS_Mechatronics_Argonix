"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth"; // Import Zustand auth store
import { useRouter } from "next/navigation"; // Import router for redirection
import { Card } from "@/components/ui/card";
import CADFilesPage from "./admin/cad-files/page";
import InvoicesPage from "./admin/invoices/page";
import CompanyDocsPage from "./admin/company-docs/page";
import EmployeesPage from "./admin/employees/page";
import PortfolioPage from "./admin/portfolio/page";
import { Button } from "@/components/ui/button"; // Import button component
import { LoaderIcon } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("");

  // Define navigation items for both roles
  const adminNavItems = [
    { label: "CAD Files", component: <CADFilesPage /> },
    { label: "Invoices", component: <InvoicesPage /> },
    { label: "Company Docs", component: <CompanyDocsPage /> },
    { label: "Employee Management", component: <EmployeesPage /> },
    { label: "Portfolio Management", component: <PortfolioPage /> },
  ];

  const userNavItems = [
    { label: "CAD Files", component: <CADFilesPage /> },
    { label: "Portfolio", component: <PortfolioPage /> },
  ];

  // Determine nav items based on user role; if user is not yet defined, default to an empty array.
  const navItems = user?.role === "admin" ? adminNavItems : userNavItems;

  // Use an effect to initialize the selected tab if it hasn't been set
  useEffect(() => {
    if (!selectedTab && navItems.length > 0) {
      setSelectedTab(navItems[0].label);
    }
  }, [selectedTab, navItems]);

  // Handle Logout Function
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5">
        <LoaderIcon className="animate-spin" />
        <Button onClick={()=>router.replace("/auth/login")}>Login</Button>
      </div>
    );
  }

  // Find the current component to render based on selected tab
  const currentComponent = navItems.find((item) => item.label === selectedTab)?.component;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="md:w-64 p-6">
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => {
              const isActive = selectedTab === item.label;
              return (
                <li key={item.label}>
                  <button
                    onClick={() => setSelectedTab(item.label)}
                    className={`block w-full text-left px-4 py-2 rounded transition-colors ${
                      isActive
                        ? "bg-gray-300 dark:bg-gray-700 font-semibold"
                        : "hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="mt-8">
          <Button
            onClick={handleLogout}
            size={"sm"}
            className="w-full bg-red-500 hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Card className="p-6 shadow-lg">{currentComponent}</Card>
      </main>
    </div>
  );
}