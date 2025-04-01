"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadIcon, Edit, Trash } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function EmployeesPage() {
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const { user } = useAuth();

  // Form state for employee data
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    imageUrl: "",
    storageId: ""
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convex mutations & queries
  const addEmployeeMutation = useMutation(api.employees.addEmployee);
  const updateEmployeeMutation = useMutation(api.employees.updateEmployee);
  const deleteEmployeeMutation = useMutation(api.employees.deleteEmployee);
  const employees = useQuery(api.employees.getEmployees) || [];

  // Image upload handler using Convex storage logic
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", user?.email || "unknown");

    try {
      const postUrl = await generateUploadUrl();


      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload to storage failed");
      }
      const resultJson = await uploadResponse.json();
      const storageId = resultJson.storageId;
      // Set the public image URL in the newEmployee state.
      setNewEmployee((prev) => ({ ...prev, storageId: storageId }));
      toast("Image uploaded successfully!");
    } catch (error) {
      console.error("Image upload error:", error);
      toast("Image upload failed!");
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Create new employee
  const handleCreate = async () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.role || !newEmployee.password || !newEmployee.storageId) {
      toast("Please fill in all fields");
      return;
    }
    setIsCreating(true);
    try {
      await addEmployeeMutation(newEmployee);
      toast("Employee created successfully!");
      setNewEmployee({ name: "", email: "", role: "", password: "", imageUrl: "", storageId: "" });
    } catch (error) {
      console.error("Employee create error:", error);
      toast("Failed to create employee");
    } finally {
      setIsCreating(false);
    }
  };

  // Update existing employee
  const handleUpdate = async () => {
    if (!editingEmployee) return;
    setIsCreating(true);
    try {
      // Pass the employee _id along with updated fields
      await updateEmployeeMutation({ ...newEmployee });
      toast("Employee updated successfully!");
      setEditingEmployee(null);
      setNewEmployee({ name: "", email: "", role: "", password: "", imageUrl: "", storageId: "" });
    } catch (error) {
      console.error("Employee update error:", error);
      toast("Failed to update employee");
    } finally {
      setIsCreating(false);
    }
  };

  // Delete employee
  const handleDelete = async (email: string) => {
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
      password: employee.password,
      imageUrl: employee.imageUrl || "",
      storageId: employee.storageId
    });
  };

  // Reset file input when clicking the image upload button
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Employee Form */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <Label>Name</Label>
            <Input
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Email</Label>
            <Input
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) =>
                setNewEmployee({ ...newEmployee, role: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Profile Image</Label>
            <Button variant="outline" onClick={handleFileInputClick} disabled={isUploading}>
              <UploadIcon className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload Image"}
            </Button>
            <Input type="file" onChange={handleImageUpload} ref={fileInputRef} className="hidden" />
          </div>
        </div>
        <div className="mt-4">
          {editingEmployee ? (
            <Button onClick={handleUpdate} disabled={isCreating}>
              {isCreating ? "Updating..." : "Update Employee"}
            </Button>
          ) : (
            <Button onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Employee"}
            </Button>
          )}
        </div>
      </Card>

      {/* Employees Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Employees</h2>
        {employees.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Image</th>
                <th className="border p-2">Edit</th>
                <th className="border p-2">Delete</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id}>
                  <td className="border p-2">{emp.name}</td>
                  <td className="border p-2">{emp.email}</td>
                  <td className="border p-2">{emp.role}</td>
                  <td className="border p-2">
                    {emp.imageUrl ? (
                      <img src={emp.imageUrl} alt={emp.name} className="h-10 w-10 object-cover" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    <Button size="sm" onClick={() => handleEdit(emp)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                  <td className="border p-2 text-center">
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(emp.email)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No employees found.</p>
        )}
      </Card>
    </div>
  );
}
