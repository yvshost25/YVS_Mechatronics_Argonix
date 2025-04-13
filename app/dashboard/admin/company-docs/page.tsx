"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, EyeIcon, UploadIcon, FileText, FileIcon } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import PdfModal from "../../_components/PdfModal";
import { useAuth } from "@/lib/auth";

export default function CompanyDocsPage() {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Convex mutations & queries:
  const addCompanyDocMutation = useMutation(api.company_docs.addCompanyDoc);
  const companyDocs = useQuery(api.company_docs.getCompanyDocs) || [];
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);

  const handleFileSelect = () => {
    document.getElementById("company-docs-upload")?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      toast("Please select a file");
      return;
    }

    setIsUploading(true);

    try {
      // Generate upload URL from Convex
      const postUrl = await generateUploadUrl();

      // Upload the file to storage using a PUT request
      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("Upload to storage failed");
      }

      const resultJson = await uploadResponse.json();
      const storageId = resultJson.storageId;

      // Save document metadata in Convex
      await addCompanyDocMutation({ name: file.name, storageId: storageId, uploadedBy: user?.email ?? '' });

      toast("Document uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Document upload error:", error);
      toast("Document upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="p-6 shadow-sm border border-gray-300 dark:border-gray-600 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold gradient-heading">Company Documents</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {companyDocs.length} Documents
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/30 p-6 rounded-xl border border-dashed border-gray-300 dark:border-gray-600 mt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-center md:gap-4">
              <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4 md:mb-0">
                <FileText className="h-8 w-8" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-medium text-gray-900 dark:text-white text-lg">Upload Company Document</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mt-1">
                  Drag and drop or click to browse
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="company-docs-upload" className="cursor-pointer">
                <Button variant="outline" disabled={isUploading} onClick={handleFileSelect} className="w-full sm:w-auto">
                  <UploadIcon className="mr-2 h-4 w-4" />
                  {isUploading ? "Selecting..." : "Browse Files"}
                </Button>
              </label>
              <input
                id="company-docs-upload"
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
              />
              
              <Button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white w-full sm:w-auto"
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
          </div>
          
          {file && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mr-3">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ready to upload
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setFile(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Uploaded Documents Table */}
      <Card className="p-6 shadow-sm border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Uploaded Documents</h2>
        </div>
        
        {companyDocs.length > 0 ? (
          <div className="overflow-x-auto -mx-6">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th scope="col" className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Document Name
                      </th>
                      <th scope="col" className="px-6 py-3.5 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800/10 divide-y divide-gray-200 dark:divide-gray-700">
                    {companyDocs.map((doc, index) => (
                      <tr 
                        key={doc._id} 
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                          index % 2 === 0 ? 'bg-white dark:bg-transparent' : 'bg-gray-50/50 dark:bg-gray-800/5'
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                              {doc.name.endsWith('.pdf') ? (
                                <FileText className="h-5 w-5" />
                              ) : (
                                <FileIcon className="h-5 w-5" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Uploaded by: {doc.uploadedBy?.split('@')[0] || 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <PdfModal
                              fileUrl={doc.url}
                              triggerText={
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                  <EyeIcon className="h-4 w-4" />
                                </Button>
                              }
                            />
                            <a
                              href={doc.url}
                              target="_blank"
                              download={doc.name}
                              className="inline-flex"
                            >
                              <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                                <DownloadIcon className="h-4 w-4" />
                              </Button>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No documents yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              Upload company documents to share with your team. All documents are securely stored and accessible only to authorized personnel.
            </p>
            <Button onClick={handleFileSelect} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload Your First Document
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}
