"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadIcon, EyeIcon, DownloadIcon, FileIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import PdfModal from "../../_components/PdfModal";
import { cn } from "@/lib/utils";

export default function CADFilesPage() {
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const addCADFileEntryToDb = useMutation(api.cad_files.AddCADFileEntryToDb);
  const uploadedFiles = useQuery(api.cad_files.GetAllCADFiles) || [];
  const user = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      // Step 1: Generate the upload URL via Convex mutation
      const postUrl = await generateUploadUrl();

      // Step 2: Upload the file to the generated URL
      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      const resultJson = await uploadResponse.json();
      const storageId = resultJson.storageId;

      // Step 3: Store file metadata in Convex using AddCADFileEntryToDb mutation
      await addCADFileEntryToDb({
        storageId,
        fileName: file.name,
        uploadedBy: user?.user?.email || "unknown",
      });

      toast.success("File uploaded successfully!", {
        style: { background: "#22c55e", color: "white" },
        position: "top-center",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("File upload failed!", {
        style: { background: "#ef4444", color: "white" },
        position: "top-center",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Filter files based on search term
  const filteredFiles = uploadedFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header with Upload Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="dashboard-card shadow-sm p-6 rounded-xl border border-gray-300 dark:border-gray-600"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold gradient-heading">CAD Files</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Upload, view and manage your CAD files
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="search"
              placeholder="Search files..."
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              onClick={handleButtonClick}
              className="relative overflow-hidden group gradient-blue hover:shadow-lg hover:shadow-blue-500/20 text-white rounded-xl transition-all duration-300"
              disabled={isUploading}
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <UploadIcon className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
            <input
              id="file-upload"
              type="file"
              onChange={handleUpload}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
      </motion.div>

      {/* Files Grid View */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.1 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <Card className="p-5 h-full dashboard-card hover:translate-y-[-5px] transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/5 border-gray-300 dark:border-gray-600">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                      <FileIcon className="h-5 w-5" />
                    </div>
                    <div className="flex space-x-1">
                      <PdfModal
                        fileUrl={file.url}
                        triggerText={
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <EyeIcon className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                        }
                      />
                      <a
                        href={file.url}
                        target="_blank"
                        download={file.name}
                        className="inline-flex"
                      >
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                          <DownloadIcon className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1 truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Uploaded by: {file.uploadedBy?.split('@')[0] || 'Unknown'}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {new Date(file._creationTime).toLocaleDateString()}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        CAD File
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            variants={fadeInUp}
            className="col-span-full"
          >
            <Card className="p-12 dashboard-card flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <FileIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                {searchTerm ? "No matching files found" : "No files uploaded yet"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                {searchTerm 
                  ? `We couldn't find any files matching "${searchTerm}". Try a different search term or upload a new file.`
                  : "Get started by uploading your first CAD file using the button above."}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={handleButtonClick}
                  className="gradient-blue hover:shadow-lg hover:shadow-blue-500/20 text-white"
                  disabled={isUploading}
                >
                  <UploadIcon className="mr-2 h-4 w-4" />
                  Upload Your First File
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
