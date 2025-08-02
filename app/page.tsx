"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useFormData } from "@/contexts/form-data-context"
import { generatePDF } from "@/lib/pdf-generator"


export default function FormPage() {
  const { formData, updateFormData } = useFormData()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (formData.phone.replace(/\D/g, "").length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleViewPDF = () => {
    if (validateForm()) {
      router.push("/preview")
    }
  }

  const handleDownloadPDF = () => {
    if (validateForm()) {
      generatePDF(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Add Your details</h1>

        <div className="space-y-4 mb-8">
          {/* Name Field */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
              <img src="/user.svg" alt="Name" className="h-8 w-8 mr-3 flex-shrink-0" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">Name</div>
                <Input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                  className="border-0 p-0 text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 shadow-none h-auto"
                />
              </div>
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1 ml-4">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
              <img src="/mail.svg" alt="Email" className="h-8 w-8 mr-3 flex-shrink-0" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">Email</div>
                <Input
                  type="email"
                  placeholder="e.g. Johndoe@gmail.com"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  className="border-0 p-0 text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 shadow-none h-auto"
                />
              </div>
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1 ml-4">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
              <img src="/phone-call.svg" alt="Phone" className="h-8 w-8 mr-3 flex-shrink-0" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">Phone Number</div>
                <Input
                  type="tel"
                  placeholder="e.g. (220) 222 -20002"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className="border-0 p-0 text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 shadow-none h-auto"
                />
              </div>
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1 ml-4">{errors.phone}</p>}
          </div>

          {/* Position Field */}
          <div className="relative">
            <div className="flex items-center bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
              <img src="/position.svg" alt="Position" className="h-8 w-8 mr-3 flex-shrink-0" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">Position</div>
                <Input
                  type="text"
                  placeholder="e.g. Junior Front end Developer"
                  value={formData.position}
                  onChange={(e) => updateFormData("position", e.target.value)}
                  className="border-0 p-0 text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 shadow-none h-auto"
                />
              </div>
            </div>
          </div>

          {/* Description Field */}
          <div className="relative">
            <div className="flex items-start bg-white rounded-2xl border border-gray-200 px-4 py-3 shadow-sm">
              <img src="/Description.svg" alt="Description" className="h-8 w-8 mr-3 flex-shrink-0 mt-1" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
              <div className="flex-1">
                <div className="text-base font-semibold text-gray-900 mb-1">Description</div>
                <Textarea
                  placeholder="e.g. Work expriences"
                  rows={2}
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  className="border-0 p-0 text-sm text-gray-500 placeholder:text-gray-400 focus-visible:ring-0 shadow-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleViewPDF}
            className="flex-1 text-white py-4 rounded-xl text-base font-medium shadow-sm bg-gradient-to-r from-[#3D8F68] to-[#2E7A58] border-0"
          >
            View PDF
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="flex-1 text-white py-4 rounded-xl text-base font-medium flex items-center justify-center gap-2 shadow-sm bg-gradient-to-r from-[#3D8F68] to-[#2E7A58] border-0"
          >
            <img src="/Download.svg" alt="Download" className="h-8 w-8" style={{ filter: 'brightness(1.5) contrast(0.7)' }} />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
