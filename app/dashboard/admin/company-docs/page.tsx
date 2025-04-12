"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, EyeIcon, UploadIcon } from "lucide-react";
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
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Company Docs</h1>
        <div className="flex items-center space-x-4">
          <label htmlFor="company-docs-upload" className="cursor-pointer">
            <Button variant="outline" disabled={isUploading} onClick={handleFileSelect}>
              <UploadIcon className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Select Document"}
            </Button>
          </label>
          <input
            id="company-docs-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file && <span className="text-sm text-gray-600">{file.name}</span>}
        </div>
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="mt-4"
        >
          {isUploading ? "Uploading..." : "Upload Document"}
        </Button>
      </Card>

      {/* Uploaded Documents Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        {companyDocs.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">View & Download</th>
              </tr>
            </thead>
            <tbody>
              {companyDocs.map((doc) => (
                <tr key={doc._id}>
                  <td className="border p-2 text-center">{doc.name}</td>
                  <td className="border p-2 text-center flex gap-2 justify-center items-center">
                    <PdfModal
                      fileUrl={doc.url}
                      triggerText={
                        <EyeIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
                      }
                    />
                    <a
                      href={doc.url}
                      target="_blank"
                      download={doc.name}
                      className="flex justify-center"
                    >
                      <DownloadIcon className="h-5 w-5 text-green-500 cursor-pointer" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No documents uploaded yet.</p>
        )}
      </Card>
    </div>
  );
}
