"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  FileIcon, 
  FileText, 
  Briefcase, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft,
  User,
  Settings,
  Sun,
  Moon,
  Search,
  Bell,
  HelpCircle,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DashboardBackground } from "@/components/ui/dashboard-background";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  
  // Check for dark mode preference and set current path
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      setDarkMode(isDarkMode);
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      setCurrentPath(window.location.pathname);
    }
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
    
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    toast.success("Logging out...");
    signOut({ callbackUrl: '/auth/login' });
  };
  
  // Navigation items based on user role
  const getNavItems = () => {
    const isAdmin = user?.role === "admin";
    const basePath = isAdmin ? "/dashboard/admin" : "/dashboard/user";
    
    // Common items for both roles
    const commonItems = [
      { name: "Dashboard", href: basePath, icon: LayoutDashboard },
      { name: "CAD Files", href: `${basePath}/cad-files`, icon: FileIcon },
    ];
    
    // Admin-specific items
    const adminItems = [
      { name: "Invoices", href: `${basePath}/invoices`, icon: FileText },
      { name: "Company Docs", href: `${basePath}/company-docs`, icon: Briefcase },
      { name: "Employee Management", href: `${basePath}/employees`, icon: Users },
      { name: "Portfolio Management", href: `${basePath}/portfolio`, icon: Briefcase },
    ];
    
    // User-specific items
    const userItems = [
      { name: "Portfolio", href: `${basePath}/portfolio`, icon: Briefcase },
    ];
    
    return isAdmin ? [...commonItems, ...adminItems] : [...commonItems, ...userItems];
  };
  
  const navItems = getNavItems();
  
  // Enhanced animated variants for sidebar with improved spring physics
  const sidebarVariants = {
    open: {
      width: "280px",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 26,
        mass: 1.2, 
        restDelta: 0.001,
        restSpeed: 0.001
      }
    },
    closed: {
      width: "80px",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 26,
        mass: 1.2,
        restDelta: 0.001,
        restSpeed: 0.001
      }
    },
    mobileOpen: {
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 280, 
        damping: 24,
        mass: 1.1,
        restDelta: 0.001,
        restSpeed: 0.001
      }
    },
    mobileClosed: {
      x: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 280, 
        damping: 24,
        mass: 1.1,
        restDelta: 0.001,
        restSpeed: 0.001
      }
    }
  };
  
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900/95">
      {/* Background with subtle animated patterns */}
      <DashboardBackground />
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-gray-800/90 backdrop-blur-xl glass-blur border-r border-gray-200 dark:border-gray-700/50 shadow-lg lg:relative scrollbar-hidden sidebar-transition z-sidebar",
          "flex flex-col",
          { "w-[280px]": sidebarOpen && !mobileOpen, "w-20": !sidebarOpen && !mobileOpen }
        )}
        variants={sidebarVariants}
        animate={
          mobileOpen 
            ? "mobileOpen" 
            : !mobileOpen && window.innerWidth < 1024 
              ? "mobileClosed" 
              : sidebarOpen 
                ? "open" 
                : "closed"
        }
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700/50">
          <Link 
            href="/dashboard" 
            className={cn(
              "flex items-center",
              !sidebarOpen && "justify-center w-full"
            )}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">YVS</span>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
            </div>
            
            {sidebarOpen && (
              <div className="ml-3 flex flex-col">
                <span className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">YVS Mech</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">Admin Dashboard</span>
              </div>
            )}
          </Link>
          
          {/* Toggle sidebar button */}
          {sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:flex hidden items-center justify-center h-7 w-7 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/70 transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>
        
        {/* No search section as requested */}
        
        {/* Navigation */}
        <nav className={cn(
          "flex-1 overflow-y-auto py-4 scrollbar-hidden",
          sidebarOpen ? "px-3" : "px-2"
        )}>
          <div className={cn(
            "flex flex-col",
            !sidebarOpen && "items-center"
          )}>
            {sidebarOpen && (
              <div className="mb-2 px-3">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Main
                </p>
              </div>
            )}
            
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              
              return (
                <TooltipProvider key={item.name} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center my-1 px-3 py-2.5 rounded-xl transition-all duration-300 nav-link",
                          isActive 
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-400 font-medium shadow-sm" 
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                          !sidebarOpen && "justify-center p-2.5"
                        )}
                        onClick={() => setCurrentPath(item.href)}
                      >
                        <div className={cn(
                          "flex items-center justify-center",
                          isActive && !sidebarOpen && "bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg"
                        )}>
                          <Icon className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isActive 
                              ? "text-blue-600 dark:text-blue-400" 
                              : "text-gray-500 dark:text-gray-400"
                          )} />
                        </div>
                        
                        {sidebarOpen && (
                          <motion.span 
                            className="ml-3 sidebar-text"
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ 
                              duration: 0.4, 
                              ease: [0.22, 1, 0.36, 1],
                              delay: 0.05 
                            }}
                          >
                            {item.name}
                          </motion.span>
                        )}
                        
                        {sidebarOpen && isActive && (
                          <motion.div 
                            className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400 shadow-sm"
                            layoutId="activeIndicator"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </TooltipTrigger>
                    {!sidebarOpen && (
                      <TooltipContent side="right">
                        {item.name}
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            
            {/* Additional section for settings */}
            <div className={cn(
              "mt-6 mb-2", 
              sidebarOpen ? "px-3" : "w-full flex justify-center"
            )}>
              {sidebarOpen ? (
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  System
                </p>
              ) : (
                <div className="h-px w-10 bg-gray-200 dark:bg-gray-700/70"></div>
              )}
            </div>
            
            {/* Theme toggle button */}
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleDarkMode}
                    className={cn(
                      "flex items-center my-1 px-3 py-2.5 rounded-lg transition-colors",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                      !sidebarOpen && "justify-center p-2.5"
                    )}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5 text-amber-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-indigo-500" />
                    )}
                    
                    {sidebarOpen && (
                      <motion.span 
                        className="ml-3 sidebar-text"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.05 
                        }}
                      >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                      </motion.span>
                    )}
                  </button>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            
            {/* Settings Link */}
            {/* <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/settings"
                    className={cn(
                      "flex items-center my-1 px-3 py-2.5 rounded-lg transition-colors",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                      !sidebarOpen && "justify-center p-2.5"
                    )}
                  >
                    <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    {sidebarOpen && (
                      <motion.span 
                        className="ml-3 sidebar-text"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.05 
                        }}
                      >
                        Settings
                      </motion.span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">Settings</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}
            
            {/* Help Link */}
            {/* <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard/help"
                    className={cn(
                      "flex items-center my-1 px-3 py-2.5 rounded-lg transition-colors",
                      "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50",
                      !sidebarOpen && "justify-center p-2.5"
                    )}
                  >
                    <HelpCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    {sidebarOpen && (
                      <motion.span 
                        className="ml-3 sidebar-text"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.4, 
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.05 
                        }}
                      >
                        Help & Support
                      </motion.span>
                    )}
                  </Link>
                </TooltipTrigger>
                {!sidebarOpen && (
                  <TooltipContent side="right">Help & Support</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider> */}
          </div>
        </nav>
        
        {/* Bottom section with logout button only */}
        <div className={cn(
          "mt-auto p-4 border-t border-gray-200 dark:border-gray-700/50",
          !sidebarOpen && "flex justify-center"
        )}>
          {sidebarOpen ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-2 rounded-xl gap-2 hover:bg-red-50 text-red-500 dark:hover:bg-red-900/20 transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          ) : (
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Sign out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Sign out</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </motion.aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl glass-blur border-b border-gray-200 dark:border-gray-700/50 flex items-center px-4 lg:px-6 shadow-md z-header relative">
          <div className="flex items-center w-full">
            {/* Mobile menu button */}
            <button
              className="lg:hidden mr-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/70"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            
            {/* Desktop toggle sidebar button (only shows when sidebar is collapsed) */}
            {!sidebarOpen && (
              <button
                className="hidden lg:flex items-center justify-center mr-3 h-8 w-8 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/70"
                onClick={() => setSidebarOpen(true)}
                aria-label="Expand sidebar"
              >
                <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
            
            {/* Page title - dynamic based on current path */}
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
              {currentPath.includes('/admin') ? 'Admin Dashboard' : 
                currentPath.includes('/user') ? 'User Dashboard' : 
                currentPath.includes('/cad-files') ? 'CAD Files' :
                currentPath.includes('/invoices') ? 'Invoices' :
                currentPath.includes('/company-docs') ? 'Company Documents' :
                currentPath.includes('/employees') ? 'Employee Management' :
                currentPath.includes('/portfolio') ? 'Portfolio' : 'Dashboard'}
            </h1>
            
            {/* Right side header actions */}
            <div className="ml-auto flex items-center space-x-3">
              {/* Notifications button removed as requested */}
              
              {/* Profile dropdown button */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/70 p-1.5"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <Avatar className="h-7 w-7 border border-gray-200 dark:border-gray-700">
                    <AvatarImage 
                      src={user?.imageUrl || ''} 
                      alt={user?.name || 'User'} 
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 text-xs">
                      {(user?.name?.charAt(0) || 'U').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </button>
                
              {/* Profile dropdown with fixed positioning */}
              <AnimatePresence>
                {profileOpen && (
                  <>
                    {/* Backdrop to capture clicks outside the dropdown */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="fixed inset-0 z-dropdown-backdrop"
                      onClick={() => setProfileOpen(false)}
                    />
                    
                    {/* Dropdown menu */}
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                      className="fixed right-4 top-16 mt-1 w-64 origin-top-right rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black/5 dark:ring-white/10 focus:outline-none z-dropdown">
                      <div className="p-3 border-b border-gray-100 dark:border-gray-700/50">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 border border-gray-200 dark:border-gray-700">
                            <AvatarImage 
                              src={user?.imageUrl || ''} 
                              alt={user?.name || 'User'} 
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                              {(user?.name?.charAt(0) || 'U').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user?.name || 'User'}
                              </p>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                user?.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' 
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                              }`}>
                                {user?.role === 'admin' ? 'Admin' : 'User'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[180px]">
                              {user?.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-1">
                        {/* Profile and Settings links removed as requested */}
                      </div>
                      
                      <div className="border-t border-gray-100 dark:border-gray-700/50 p-1">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center w-full px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <LogOut className="h-4 w-4 mr-3 text-red-600 dark:text-red-400" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-content relative">
          <div className="h-full p-4 sm:p-8 mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
