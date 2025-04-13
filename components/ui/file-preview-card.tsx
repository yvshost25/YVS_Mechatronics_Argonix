"use client";

import { motion } from "framer-motion";
import { 
  FileIcon, 
  FileText, 
  FileImage,
  FileSpreadsheet,
  FileCode,
  MoreVertical,
  EyeIcon,
  DownloadIcon,
  TrashIcon,
  Share2Icon
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface FilePreviewCardProps {
  file: {
    id: string;
    name: string;
    type: string; // pdf, image, text, code, spreadsheet, other
    size?: string;
    modifiedDate?: string;
    uploadedBy?: string;
    url?: string;
    thumbnailUrl?: string;
  };
  onView?: (fileId: string) => void;
  onDownload?: (fileId: string) => void;
  onDelete?: (fileId: string) => void;
  onShare?: (fileId: string) => void;
  className?: string;
}

export function FilePreviewCard({
  file,
  onView,
  onDownload,
  onDelete,
  onShare,
  className,
}: FilePreviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getFileIcon = () => {
    switch(file.type.toLowerCase()) {
      case 'image':
        return <FileImage className="h-8 w-8 text-blue-500" />;
      case 'text':
        return <FileText className="h-8 w-8 text-amber-500" />;
      case 'code':
        return <FileCode className="h-8 w-8 text-purple-500" />;
      case 'spreadsheet':
        return <FileSpreadsheet className="h-8 w-8 text-green-500" />;
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  // Get file extension
  const getFileExtension = (filename: string) => {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  };

  const extension = getFileExtension(file.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={className}
    >
      <Card className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm overflow-hidden group">
        {/* File preview area */}
        <div className="relative h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {file.thumbnailUrl ? (
            <img 
              src={file.thumbnailUrl} 
              alt={file.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-center p-4">
              {getFileIcon()}
              <span className="mt-2 block text-xs font-medium text-gray-900 dark:text-white uppercase">
                {extension}
              </span>
            </div>
          )}
          
          {/* Hover overlay with actions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="flex space-x-2">
              {onView && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-gray-900"
                  onClick={() => onView(file.id)}
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </Button>
              )}
              
              {onDownload && (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-gray-900"
                  onClick={() => onDownload(file.id)}
                >
                  <DownloadIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* File info and actions */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate" title={file.name}>
                {file.name}
              </h3>
              <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                {file.size && <span className="mr-2">{file.size}</span>}
                {file.modifiedDate && <span>Modified: {file.modifiedDate}</span>}
              </div>
              {file.uploadedBy && (
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Uploaded by: {file.uploadedBy}
                </div>
              )}
            </div>
            
            {/* More actions dropdown */}
            {(onDelete || onShare) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onView && (
                    <DropdownMenuItem onClick={() => onView(file.id)}>
                      <EyeIcon className="h-4 w-4 mr-2" /> View
                    </DropdownMenuItem>
                  )}
                  {onDownload && (
                    <DropdownMenuItem onClick={() => onDownload(file.id)}>
                      <DownloadIcon className="h-4 w-4 mr-2" /> Download
                    </DropdownMenuItem>
                  )}
                  {onShare && (
                    <DropdownMenuItem onClick={() => onShare(file.id)}>
                      <Share2Icon className="h-4 w-4 mr-2" /> Share
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      className="text-red-600 dark:text-red-400"
                      onClick={() => onDelete(file.id)}
                    >
                      <TrashIcon className="h-4 w-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
