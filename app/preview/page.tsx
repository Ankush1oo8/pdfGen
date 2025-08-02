"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useFormData } from "@/contexts/form-data-context"
import { generatePDF } from "@/lib/pdf-generator"


export default function PreviewPage() {
  const { formData } = useFormData()
  const router = useRouter()

  const handleDownloadPDF = () => {
    generatePDF(formData)
  }

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={handleBack} className="p-0 bg-transparent border-none cursor-pointer">
            <img src="/chevron-left.svg" alt="Back" className="h-8 w-8 text-gray-600 hover:text-gray-800" />
          </button>
        </div>

        {/* PDF Preview Container */}
        <div className="bg-white border-2 border-gray-300 rounded-lg shadow-sm mb-6 mx-auto" style={{ width: '700px', height: '500px', padding: '48px' }}>
          <div className="space-y-6 text-left w-full h-full flex flex-col justify-start">
            {/* Name */}
            <div className="flex items-center gap-3 text-left w-full">
              <div className="w-36 text-base font-bold text-gray-900 flex-shrink-0 text-left">Name:</div>
              <div className="text-base text-gray-500 text-left">{formData.name}</div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-left w-full">
              <div className="w-36 text-base font-bold text-gray-900 flex-shrink-0 text-left">Email:</div>
              <div className="text-base text-gray-500 text-left">{formData.email}</div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3 text-left w-full">
              <div className="w-36 text-base font-bold text-gray-900 flex-shrink-0 text-left">Phone Number:</div>
              <div className="text-base text-gray-500 text-left">{formData.phone}</div>
            </div>

            {/* Position */}
            {formData.position && (
              <div className="flex items-center gap-3 text-left w-full">
                <div className="w-36 text-base font-bold text-gray-900 flex-shrink-0 text-left">Position:</div>
                <div className="text-base text-gray-500 text-left">{formData.position}</div>
              </div>
            )}

            {/* Description */}
            {formData.description && (
              <div className="flex items-center gap-3 text-left w-full">
                <div className="w-36 text-base font-bold text-gray-900 flex-shrink-0 text-left">Description:</div>
                <div className="text-base text-gray-500 leading-relaxed text-left">{formData.description}</div>
              </div>
            )}
          </div>
        </div>

        {/* Download Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 text-white py-4 rounded-xl text-base font-medium flex items-center justify-center gap-2 shadow-sm max-w-xs"
            style={{
              background: "linear-gradient(to right, #3D8F68, #2E7A58)",
            }}
          >
            <img src="/Download.svg" alt="Download" className="h-8 w-8" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
