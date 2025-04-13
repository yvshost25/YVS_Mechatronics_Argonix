"use client"

import { useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  DownloadIcon, 
  EyeIcon, 
  UploadIcon, 
  FileIcon, 
  FileTextIcon, 
  CheckCircleIcon,
  FilterIcon,
  SearchIcon,
  ClockIcon,
  CalendarIcon,
  Plus,
  FileText
} from "lucide-react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { useAuth } from "@/lib/auth"
import PdfModal from "../../_components/PdfModal"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoiceType, setInvoiceType] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("")

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

  // Filter invoices based on search and filter
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = !searchQuery || 
      inv.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || !filterType || inv.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // Get unique invoice types for filter dropdown
  const uniqueTypes = Array.from(new Set(invoices.map(inv => inv.type)));

  const handleUpload = async () => {
    if (!file || !invoiceType) {
      toast("Please select a file and invoice type")
      return
    }

    setIsUploading(true)
    try {
      const postUrl = await generateUploadUrl()
      // Upload the file to the generated URL
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

      // Save invoice metadata in Convex
      await addInvoiceMutation({ 
        type: invoiceType, 
        storageId: storageId, 
        uploadedBy: user?.email ?? '' 
      })

      toast("Invoice uploaded successfully!")
      // Reset states
      setFile(null)
      setInvoiceType("")
      // Reset file input value
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

  // Generate appropriate badge color based on invoice type
  const getBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case 'standard': return 'default';
      case 'proforma': return 'secondary';
      case 'recurring': return 'outline';
      case 'credit': return 'destructive';
      case 'debit': return 'outline';
      case 'commercial': return 'secondary';
      case 'interim': return 'outline';
      case 'timesheet': return 'default';
      default: return 'outline';
    }
  };

  // Format creation date if available
  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-8">
      {/* Invoice Upload Card */}
      <Card className="p-6 shadow-lg border-0 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Invoice Management
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Invoice Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="invoice-type" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Invoice Type
            </Label>
            <Select value={invoiceType} onValueChange={setInvoiceType}>
              <SelectTrigger id="invoice-type" className="w-full border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder="Select Invoice Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard Invoice</SelectItem>
                <SelectItem value="proforma">Pro Forma Invoice</SelectItem>
                <SelectItem value="recurring">Recurring Invoice</SelectItem>
                <SelectItem value="credit">Credit Invoice (Credit Note)</SelectItem>
                <SelectItem value="debit">Debit Invoice (Debit Note)</SelectItem>
                <SelectItem value="commercial">Commercial Invoice</SelectItem>
                <SelectItem value="interim">Interim / Progress Invoice</SelectItem>
                <SelectItem value="timesheet">Timesheet Invoice</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Selection */}
          <div className="space-y-2">
            <Label htmlFor="invoice-file" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Invoice File
            </Label>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                disabled={isUploading} 
                onClick={handleButtonClick}
                className="w-full h-10 border-gray-200 dark:border-gray-700"
              >
                <UploadIcon className="mr-2 h-4 w-4" />
                {file ? "Change File" : "Select File"}
              </Button>
              <input
                id="invoice-upload"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
            {file && (
              <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                <FileIcon className="h-4 w-4 mr-1" />
                <span className="truncate max-w-xs">{file.name}</span>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Invoice
            </Label>
            <Button
              onClick={handleUpload}
              disabled={!file || !invoiceType || isUploading}
              className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </div>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Invoice
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Invoices Table Card */}
      <Card className="shadow-lg border-0 rounded-xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Uploaded Invoices
            </h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search invoices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 text-sm h-9 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[180px] h-9 text-sm border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500">
                  <div className="flex items-center">
                    <FilterIcon className="h-3.5 w-3.5 mr-2 text-gray-400" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {invoices.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Date Uploaded</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Uploaded By</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredInvoices.map((inv, index) => (
                  <motion.tr 
                    key={inv._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="flex-shrink-0 h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <Badge variant={getBadgeVariant(inv.type)} className="capitalize">
                            {inv.type}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="flex-shrink-0 h-4 w-4 mr-1.5" />
                        {formatDate(String(inv._creationTime))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                        {inv.uploadedBy || 'Unknown'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-3">
                        {inv.fileUrl ? (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div>
                                    <PdfModal 
                                      fileUrl={inv.fileUrl} 
                                      triggerText={
                                        <div className="inline-flex items-center justify-center h-8 w-8 p-0 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                          <EyeIcon className="h-4 w-4 text-blue-500" />
                                          <span className="sr-only">View</span>
                                        </div>
                                      } 
                                    />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Invoice</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a 
                                    href={inv.fileUrl} 
                                    target="_blank" 
                                    download={`${inv.type}_invoice`}
                                    className="inline-flex"
                                  >
                                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 border-gray-200 dark:border-gray-700">
                                      <DownloadIcon className="h-4 w-4 text-green-500" />
                                      <span className="sr-only">Download</span>
                                    </Button>
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Download Invoice</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500 dark:text-gray-400">No file</span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-3 mb-4">
              <FileTextIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No invoices uploaded yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Upload your first invoice using the form above.
            </p>
            <Button
              onClick={handleButtonClick}
              variant="outline"
              className="border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
            >
              <UploadIcon className="mr-2 h-4 w-4" />
              Select an invoice to upload
            </Button>
          </div>
        )}
        
        {filteredInvoices.length === 0 && invoices.length > 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3 mb-4">
              <SearchIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No matching invoices</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
              Try adjusting your search or filter criteria.
            </p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setFilterType("");
              }}
              variant="outline"
              size="sm"
            >
              Clear filters
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
