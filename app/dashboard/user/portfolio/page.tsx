"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon, Trash2, Edit, Plus, ImageIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import Image from "next/image";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function PortfolioPage() {
  const [newPortfolio, setNewPortfolio] = useState({
    _id:"",
    name: "",
    description: "",
    logo: null as File | null,
    logoStorageId: "",
    projectImage: null as File | null,
    imageStorageId: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Convex Queries & Mutations
  const addPortfolio = useMutation(api.portfolio.addPortfolio);
  const updatePortfolio = useMutation(api.portfolio.updatePortfolio); // Assuming you have this mutation
  const deletePortfolio = useMutation(api.portfolio.deletePortfolio); // Assuming you have this mutation
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const portfolios = useQuery(api.portfolio.getPortfolios) || [];

  // Function to trigger file input manually
  const handleFileSelect = (inputId: string) => {
    document.getElementById(inputId)?.click();
  };

  const resetForm = () => {
    setNewPortfolio({
      _id:"",
      name: "",
      description: "",
      logo: null,
      logoStorageId: "",
      projectImage: null,
      imageStorageId: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setNewPortfolio({
      _id:item?._id,
      name: item.name,
      description: item.description,
      logo: null,
      logoStorageId: item.logoStorageId || "",
      projectImage: null,
      imageStorageId: item.imageStorageId || "",
    });
    setIsEditing(true);
    setEditingId(item._id);
  };

  const handleDelete = async (_id: string) => {
    try {
      await deletePortfolio({ _id });
      toast("Portfolio deleted successfully!");
    } catch (error) {
      console.error("Portfolio deletion error:", error);
      toast("Failed to delete portfolio item");
    }
  };

  const handleCreate = async () => {
    if (!newPortfolio.name || !newPortfolio.description) {
      toast("Please fill in both the name and description");
      return;
    }
    setIsCreating(true);

    try {
      let logoStorageId = newPortfolio.logoStorageId;
      let imageStorageId = newPortfolio.imageStorageId;

      if (newPortfolio.logo) {
        const postUrl = await generateUploadUrl();
        const uploadResponse = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": newPortfolio.logo.type },
          body: newPortfolio.logo,
        });

        if (!uploadResponse.ok) {
          throw new Error("Logo upload failed");
        }

        const resultJson = await uploadResponse.json();
        logoStorageId = resultJson.storageId;
      }

      if (newPortfolio.projectImage) {
        const postUrl = await generateUploadUrl();
        const uploadResponse = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": newPortfolio.projectImage.type },
          body: newPortfolio.projectImage,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const resultJson = await uploadResponse.json();
        imageStorageId = resultJson.storageId;
      }

      // Save or update portfolio data in Convex
      if (isEditing && editingId) {
        await updatePortfolio({
          _id: editingId,
          name: newPortfolio.name,
          description: newPortfolio.description,
          storageId:logoStorageId,
          storageId1:imageStorageId,
        });
      } else {
        await addPortfolio({
          name: newPortfolio.name,
          description: newPortfolio.description,
          storageId:logoStorageId,
          storageId1:imageStorageId,
        });
      }

      toast(isEditing ? "Portfolio updated!" : "Portfolio item created!");
      resetForm();
    } catch (error) {
      console.error("Portfolio operation error:", error);
      toast(isEditing ? "Failed to update portfolio" : "Failed to create portfolio item");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Portfolio Creation Section */}
      <Card className="p-6 shadow-lg border-0 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {isEditing ? "Edit Portfolio Item" : "Portfolio Management"}
          </h1>
          {isEditing && (
            <Button 
              variant="ghost" 
              size="sm"
              className="ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={resetForm}
            >
              Cancel Editing
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">
                Portfolio Name
              </label>
              <Input
                id="portfolio-name"
                placeholder="Enter project or client name"
                value={newPortfolio.name}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, name: e.target.value })
                }
                className="border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">
                Description
              </label>
              <Textarea
                placeholder="Describe the portfolio item, technologies used, or outcomes achieved"
                value={newPortfolio.description}
                onChange={(e) =>
                  setNewPortfolio({ ...newPortfolio, description: e.target.value })
                }
                className="h-32 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-sm font-medium mb-1 block text-gray-700 dark:text-gray-300">
              Media
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Logo Upload */}
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                {newPortfolio.logo || newPortfolio.logoStorageId ? (
                  <>
                    <div className="relative w-full h-24 flex items-center justify-center">
                      {newPortfolio.logo ? (
                        <div className="text-green-600 font-medium">Logo Selected</div>
                      ) : (
                        <div className="text-blue-600 dark:text-blue-400">Logo Uploaded</div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleFileSelect("portfolio-logo")}
                    >
                      <Edit className="mr-2 h-3.5 w-3.5" />
                      Change Logo
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full h-full flex flex-col p-6"
                    onClick={() => handleFileSelect("portfolio-logo")}
                  >
                    <UploadIcon className="h-8 w-8 mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Upload Logo</span>
                    <span className="text-xs text-gray-400 mt-1">Brand or company logo</span>
                  </Button>
                )}
                <input
                  id="portfolio-logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      logo: e.target.files?.[0] || null,
                    })
                  }
                  className="hidden"
                />
              </div>

              {/* Additional Image Upload */}
              <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center space-y-2 bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
                {newPortfolio.projectImage || newPortfolio.imageStorageId ? (
                  <>
                    <div className="relative w-full h-24 flex items-center justify-center">
                      {newPortfolio.projectImage ? (
                        <div className="text-green-600 font-medium">Image Selected</div>
                      ) : (
                        <div className="text-blue-600 dark:text-blue-400">Image Uploaded</div>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleFileSelect("portfolio-image")}
                    >
                      <Edit className="mr-2 h-3.5 w-3.5" />
                      Change Image
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full h-full flex flex-col p-6"
                    onClick={() => handleFileSelect("portfolio-image")}
                  >
                    <ImageIcon className="h-8 w-8 mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Upload Image</span>
                    <span className="text-xs text-gray-400 mt-1">Project or product image</span>
                  </Button>
                )}
                <input
                  id="portfolio-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewPortfolio({
                      ...newPortfolio,
                      projectImage: e.target.files?.[0] || null,
                    })
                  }
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCreate}
          disabled={isCreating || !newPortfolio.name || !newPortfolio.description}
          className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
        >
          {isCreating ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isEditing ? "Updating..." : "Creating..."}
            </div>
          ) : (
            <>
              {isEditing ? "Update Portfolio" : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Portfolio
                </>
              )}
            </>
          )}
        </Button>
      </Card>

      {/* Display Portfolios */}
      <Card className="shadow-lg border-0 rounded-xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Portfolio Items
          </h2>
        </div>
        
        {portfolios.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Media</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {portfolios.map((item, index) => (
                  <motion.tr 
                    key={item._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 lg:hidden mt-1 line-clamp-1">
                            {item.description.substring(0, 60)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {item.logoUrl ? (
                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                  <Image
                                    src={item.logoUrl}
                                    alt={`${item.name} logo`}
                                    height={40}
                                    width={40}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                  <UploadIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Logo</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                            {item.logoUrl ? (
                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                  <Image
                                    src={item?.logoUrl}
                                    alt={`${item.name} image`}
                                    height={40}
                                    width={40}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="h-10 w-10 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                  <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Project Image</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
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
                          <DropdownMenuItem onClick={() => handleEdit(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(item?._id)}
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
              <ImageIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No portfolio items yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Add your first portfolio item to showcase your work and projects.
            </p>
            <Button
              onClick={() => document.getElementById("portfolio-name")?.focus()}
              variant="outline"
              className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create your first portfolio item
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}