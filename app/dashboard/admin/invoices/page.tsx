"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DownloadIcon, EyeIcon, UploadIcon } from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth"
import PdfModal from "../../_components/PdfModal"

export default function InvoicesPage() {
  const user = useAuth();
  const [invoiceType, setInvoiceType] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  // Convex mutations & queries:
  const addInvoiceMutation = useMutation(api.invoices.addInvoice)
  const invoices = useQuery(api.invoices.getInvoices) || []
  const generateUploadUrl = useMutation(api.cad_files.generateUploadUrl)

  // useRef for file input
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Function to trigger file input click
  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleUpload = async () => {
    if (!file || !invoiceType) {
      toast("Please select a file and invoice type")
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", invoiceType)

    try {
      const postUrl = await generateUploadUrl()
      // 2. Upload the file to the generated URL using a PUT request.
      const uploadResponse = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!uploadResponse.ok) {
        throw new Error("Upload to storage failed")
      }

      const resultJson = await uploadResponse.json();
      const storageId = resultJson.storageId;

      // 3. Save invoice metadata in Convex using addInvoice mutation.
      await addInvoiceMutation({ type: invoiceType, storageId: storageId, uploadedBy: user?.user?.email ?? '' })

      toast("Invoice uploaded successfully!")
      // Reset states.
      setFile(null)
      setInvoiceType("")
      // Reset file input value so the dialog opens again.
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      console.error("Invoice upload error:", error)
      toast("Invoice upload failed!")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">Invoices</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Invoice Type Dropdown */}
          <select
            value={invoiceType}
            onChange={(e) => setInvoiceType(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="">Select Invoice Type</option>
            <option value="standard">Standard Invoice</option>
            <option value="proforma">Pro Forma Invoice</option>
            <option value="recurring">Recurring Invoice</option>
            <option value="credit">Credit Invoice (Credit Note)</option>
            <option value="debit">Debit Invoice (Debit Note)</option>
            <option value="commercial">Commercial Invoice</option>
            <option value="interim">Interim / Progress Invoice</option>
            <option value="timesheet">Timesheet Invoice</option>
          </select>

          {/* File Upload Section */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" disabled={isUploading} onClick={handleButtonClick}>
              <UploadIcon className="mr-2 h-4 w-4" />
              {isUploading ? "Uploading..." : "Select File"}
            </Button>
            {file && <span className="text-sm text-gray-600">{file.name}</span>}
            <input
              id="invoice-upload"
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              ref={fileInputRef}
            />
          </div>
        </div>
        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!file || !invoiceType || isUploading}
          className="mt-4"
        >
          {isUploading ? "Uploading..." : "Upload Invoice"}
        </Button>
      </Card>

      {/* Invoices Table */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Invoices</h2>
        {invoices.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border p-2">Type</th>
                <th className="border p-2">View</th>
                <th className="border p-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv._id} className="border">
                  <td className="border p-2 text-center">{inv.type}</td>
                  <td className="border p-2 text-center">
                    {inv.fileUrl ? (
                      <PdfModal fileUrl={inv.fileUrl} triggerText={<EyeIcon className="h-5 w-5 text-blue-500 cursor-pointer" />} />
                    ) : (
                      "No File"
                    )}
                  </td>
                  <td className="border p-2 text-center">
                    {inv.fileUrl ? (
                      <a href={inv.fileUrl} target="_blank" download={inv.type} className="flex justify-center">
                        <DownloadIcon className="h-5 w-5 text-green-500 cursor-pointer" />
                      </a>
                    ) : (
                      "No File"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No invoices uploaded yet.</p>
        )}
      </Card>
    </div>
  )
}
