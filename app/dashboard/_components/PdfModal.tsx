"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DownloadIcon, 
  XIcon, 
  ZoomInIcon, 
  ZoomOutIcon, 
  RotateCwIcon, 
  RefreshCwIcon,
  MaximizeIcon,
  MinimizeIcon,
  PrinterIcon,
  ExpandIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PdfModalProps {
  fileUrl: string;
  triggerText?: ReactNode;
}

const PdfModal: React.FC<PdfModalProps> = ({ fileUrl, triggerText = "View PDF" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(1);
    setRotation(0);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handlePrint = () => {
    const printWindow = window.open(fileUrl, '_blank');
    if (printWindow) {
      printWindow.addEventListener('load', () => {
        printWindow.print();
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="inline-flex cursor-pointer">{triggerText}</div>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent 
            className={`p-0 overflow-hidden rounded-xl border-gray-200 dark:border-gray-700/70 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-xl ${
              isFullscreen ? "max-w-[95vw] h-[95vh] fixed inset-0 m-auto" : "max-w-5xl"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="p-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between"
            >
              <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Document Viewer
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
                  onClick={handleZoomIn}
                  title="Zoom In"
                >
                  <ZoomInIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
                  onClick={handleZoomOut}
                  title="Zoom Out"
                >
                  <ZoomOutIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" 
                  onClick={handleRotate}
                  title="Rotate"
                >
                  <RotateCwIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? (
                    <MinimizeIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <MaximizeIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={handlePrint}
                  title="Print"
                >
                  <PrinterIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </Button>
                <a
                  href={fileUrl}
                  target="_blank"
                  download
                  className="inline-flex"
                >
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400"
                    title="Download"
                  >
                    <DownloadIcon className="h-4 w-4" />
                  </Button>
                </a>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 dark:text-red-400 ml-2"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
            <div className={`${isFullscreen ? 'h-[calc(95vh-8rem)]' : 'max-h-[80vh]'} overflow-auto bg-gray-50 dark:bg-gray-900/60 p-4 flex items-center justify-center`}>
              <motion.div
                animate={{ scale: zoom, rotate: rotation }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="shadow-xl bg-white rounded-lg overflow-hidden">
                <iframe
                  src={`${fileUrl}#toolbar=0`}
                  height={isFullscreen ? "calc(95vh - 10rem)" : "600px"}
                  width={isFullscreen ? "calc(95vw - 2rem)" : "800px"}
                  className="border-0 rounded-lg bg-white"
                  title="PDF Document Viewer"
                  style={{ minWidth: "300px" }}
                />
              </motion.div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-900/60 border-t border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <span className="mr-1 font-medium">Zoom:</span> {Math.round(zoom * 100)}%
                </span>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetView}
                className="text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
              >
                <RefreshCwIcon className="h-3.5 w-3.5 mr-1.5" />
                Reset View
              </Button>
            </div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PdfModal;
