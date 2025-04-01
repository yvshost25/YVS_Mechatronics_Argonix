"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UploadIcon, EyeIcon, DownloadIcon } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import PdfModal from "../../_components/PdfModal";
import axios from "axios";

export default function CADFilesPage() {
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl);
  const user = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch uploaded files
  const uploadedFiles = useQuery(api.cad_files.GetAllCADFiles) || [];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Create form data for API submission
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", user?.user?.email || "unknown");

    try {
      // Generate the upload URL via a Convex mutation
      const postUrl = await generateUploadUrl();

      // Upload the file using axios with the correct content type
      const result = await axios.post(postUrl, file, {
        headers: { "Content-Type": file.type },
      });

      // Extract storageId from the response
      const storageId = result.data.storageId;
      formData.append("storageId", storageId);

      // Upload file metadata to your Next.js API route using axios
      const response = await axios.post(
        `/api/cad-files`,
        formData
      );

      if (response.status === 200) {
        toast("File uploaded successfully!");
      } else {
        toast("File upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast("File upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">CAD Files</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" disabled={isUploading} onClick={handleButtonClick}>
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
      </Card>

      {/* Uploaded Files Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
        {uploadedFiles.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2 text-left">File Name</th>
                <th className="border p-2 text-center">View</th>
                <th className="border p-2 text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map((file, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{file.name}</td>
                  <td className="border p-2 text-center">
                    <PdfModal
                      fileUrl={file.url}
                      triggerText={
                        <EyeIcon className="h-5 w-5 text-blue-500 cursor-pointer" />
                      }
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <a
                      href={file.url}
                      target="_blank"
                      download={file.name}
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
          <p className="text-gray-500">No files uploaded yet.</p>
        )}
      </Card>
    </div>
  );
}
