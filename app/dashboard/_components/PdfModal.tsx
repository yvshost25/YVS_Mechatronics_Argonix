"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

interface PdfModalProps {
  fileUrl: string;
  triggerText?: ReactNode;
}

const PdfModal: React.FC<PdfModalProps> = ({ fileUrl, triggerText = "View PDF" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button>{triggerText}</button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogTitle className="text-xl font-semibold">File Preview</DialogTitle>
        <iframe
          src={`${fileUrl}#toolbar=0`}
          height="500px"
          width="100%"
          className="border rounded-md"
        />
      </DialogContent>
    </Dialog>
  );
};

export default PdfModal;
