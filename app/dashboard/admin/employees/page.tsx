"use client";

import { useState, useRef } from "react";
import bcrypt from "bcryptjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  UploadIcon, 
  Edit, 
  Trash2, 
  UserIcon, 
  CheckIcon, 
  XIcon, 
  Plus,
  SearchIcon,
  FilterIcon,
  EyeIcon,
  EyeOffIcon,
  UserPlusIcon,
  MailIcon,
  KeyIcon,
  ShieldIcon
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function EmployeesPage() {
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const { user } = useAuth();

  // Form state for employee data
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    storageId: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convex mutations & queries
  const addEmployeeMutation = useMutation(api.employees.addEmployee);
  const updateEmployeeMutation = useMutation(api.employees.updateEmployee);
  const deleteEmployeeMutation = useMutation(api.employees.deleteEmployee);
  const employees = useQuery(api.employees.getEmployees) || [];

  // Filter employees based on search query and role filter
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = !searchQuery || 
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || !roleFilter || emp.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Image upload handler using Convex storage logic
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const postUrl = await generateUploadUrl();
      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });

      if (!uploadResponse.ok) throw new Error("Upload to storage failed");

      const resultJson = await uploadResponse.json();
      const storageId = resultJson.storageId;

      setNewEmployee((prev) => ({ ...prev, storageId }));
      toast("Profile image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast("Image upload failed!");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Cancel editing and reset form
  const cancelEdit = () => {
    setEditingEmployee(null);
    setNewEmployee({ name: "", email: "", role: "", password: "", storageId: "" });
    setShowPassword(false);
  };

  // Create new employee with password hashing
  const handleCreate = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.password) {
      toast("Please fill in all required fields");
      return;
    }

    setIsCreating(true);
    try {
      const hashedPassword = await bcrypt.hash(newEmployee.password, 10);
      await addEmployeeMutation({ 
        ...newEmployee, 
        password: hashedPassword,
        storageId: newEmployee.storageId || "" 
      });

      toast("Employee created successfully!");
      setNewEmployee({ name: "", email: "", role: "", password: "", storageId: "" });
      setShowPassword(false);
    } catch (error) {
      console.error("Employee create error:", error);
      toast("Failed to create employee");
    } finally {
      setIsCreating(false);
    }
  };

  // Update existing employee with password hashing
  const handleUpdate = async () => {
    if (!editingEmployee) return;
  
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role) {
      toast("Name, email and role are required");
      return;
    }
  
    setIsCreating(true);
    try {
      // Create update data with all required fields
      const updateData = {
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
        storageId: newEmployee.storageId,
        // Keep the existing password if no new one provided
        password: newEmployee.password 
          ? await bcrypt.hash(newEmployee.password, 10) 
          : editingEmployee.password // Use the existing hashed password
      };
  
      await updateEmployeeMutation(updateData);
  
      toast("Employee updated successfully!");
      setEditingEmployee(null);
      setNewEmployee({ name: "", email: "", role: "", password: "", storageId: "" });
      setShowPassword(false);
    } catch (error) {
      console.error("Employee update error:", error);
      toast("Failed to update employee");
    } finally {
      setIsCreating(false);
    }
  };
  
  // Delete employee
  const handleDelete = async (email: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    
    try {
      await deleteEmployeeMutation({ email });
      toast("Employee deleted successfully!");
    } catch (error) {
      console.error("Employee delete error:", error);
      toast("Failed to delete employee");
    }
  };

  // Pre-fill form for editing
  const handleEdit = (employee: any) => {
    setEditingEmployee(employee);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      password: "", // Reset password for security
      storageId: employee.storageId || ""
    });
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return 'destructive';
      case 'user': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      {/* Employee Form */}
      <Card className="p-6 shadow-lg border-0 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {editingEmployee ? "Edit Employee" : "Employee Management"}
          </h1>
          {editingEmployee && (
            <Button 
              variant="ghost" 
              size="sm"
              className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={cancelEdit}
            >
              Cancel Editing
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="employee-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                id="employee-name"
                value={newEmployee.name} 
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} 
                placeholder="John Doe"
                className="pl-10 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                id="employee-email"
                type="email"
                value={newEmployee.email} 
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} 
                placeholder="john.doe@example.com"
                className="pl-10 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                disabled={!!editingEmployee}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Select 
                value={newEmployee.role} 
                onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}
              >
                <SelectTrigger id="employee-role" className="pl-10 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="user">Standard User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {editingEmployee ? "New Password (leave empty to keep current)" : "Password"}
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyIcon className="h-4 w-4 text-gray-400" />
              </div>
              <Input 
                id="employee-password"
                type={showPassword ? "text" : "password"} 
                value={newEmployee.password} 
                onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })} 
                placeholder={editingEmployee ? "••••••••" : "Enter password"}
                className="pl-10 pr-10 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-400 hover:text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="employee-image" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Image
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer" onClick={handleFileInputClick}>
                {newEmployee.storageId ? (
                  <div className="text-blue-600 dark:text-blue-400 text-sm text-center">Image Selected</div>
                ) : (
                  <>
                    <UploadIcon className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400 text-center">Upload Image</span>
                  </>
                )}
              </div>
              <div className="flex items-center justify-center">
                <Avatar className="h-16 w-16 border-2 border-gray-200 dark:border-gray-700">
                  {newEmployee.storageId ? (
                    <AvatarImage src={`/api/employee-image/${newEmployee.storageId}`} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                      {newEmployee.name ? getInitials(newEmployee.name) : "?"}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
              <Input 
                type="file" 
                onChange={handleImageUpload} 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={editingEmployee ? handleUpdate : handleCreate}
          disabled={isCreating || !newEmployee.name || !newEmployee.email || !newEmployee.role || (!editingEmployee && !newEmployee.password)}
          className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
        >
          {isCreating ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editingEmployee ? "Updating..." : "Creating..."}
            </div>
          ) : (
            <>
              {editingEmployee ? (
                <>
                  <CheckIcon className="mr-2 h-4 w-4" />
                  Update Employee
                </>
              ) : (
                <>
                  <UserPlusIcon className="mr-2 h-4 w-4" />
                  Create Employee
                </>
              )}
            </>
          )}
        </Button>
      </Card>

      {/* Employees Table */}
      <Card className="shadow-lg border-0 rounded-xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Company Employees
            </h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm h-9 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px] h-9 text-sm border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500">
                  <div className="flex items-center">
                    <FilterIcon className="h-3.5 w-3.5 mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter by role" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="user">Standard Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {employees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredEmployees.map((emp, index) => (
                  <motion.tr 
                    key={emp._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          {emp.imageUrl || emp.storageId ? (
                            <AvatarImage src={emp.imageUrl || `/api/employee-image/${emp.storageId}`} alt={emp.name} />
                          ) : (
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                              {getInitials(emp.name)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{emp.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 md:hidden">{emp.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{emp.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadgeVariant(emp.role)} className="capitalize">
                        {emp.role === 'admin' ? 'Administrator' : emp.role === 'user' ? 'Standard User' : emp.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="w-4 h-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(emp)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(emp.email)}
                            className="text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-3 mb-4">
              <UserIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No employees yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Add your first employee using the form above.
            </p>
          </div>
        )}
        
        {filteredEmployees.length === 0 && employees.length > 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <SearchIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No matching employees</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setRoleFilter("");
              }}
              variant="outline"
              size="sm"
            >
              Clear filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
